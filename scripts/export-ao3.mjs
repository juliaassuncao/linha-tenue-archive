import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = path.join(projectRoot, 'dist/ao3');

export const parseExportArgs = (args) => {
  if (!args.length) return { mode: 'all' };
  if (args.length === 1 && args[0] === '--intro') return { mode: 'intro' };
  if (args.length === 2 && args[0] === '--chapter' && /^[0-9]{3}$/.test(args[1])) {
    return { mode: 'chapter', chapterId: args[1] };
  }
  throw new Error('Argumentos inválidos. Use export:ao3, --intro ou --chapter 001 (três dígitos).');
};

export const selectExportTargets = (registry, selection) => {
  if (selection.mode === 'all') return registry;
  const targets = registry.filter((target) => selection.mode === 'intro'
    ? target.type === 'intro'
    : target.type === 'chapter' && target.id === selection.chapterId);
  if (!targets.length) {
    throw new Error(selection.mode === 'intro'
      ? 'Intro QA não registrada.'
      : `Capítulo ${selection.chapterId} não está registrado no registry AO3.`);
  }
  return targets;
};

export const requireProductionAssetBase = (targets, assetBaseUrl) => {
  if (!assetBaseUrl && targets.some((target) => target.type === 'chapter')) {
    throw new Error('AO3_ASSET_BASE_URL ausente para export de produção. Informe a base HTTPS pública dos assets.');
  }
};

const compileWorkskin = async (validateWorkskinCss) => {
  const css = compile(path.join(projectRoot, 'src/styles/workskin.scss'), {
    style: 'expanded',
  }).css;
  validateWorkskinCss(css);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'workskin.css'), `${css}\n`, 'utf8');
  return css;
};

const createPreview = (target, html, css, previewCss, assetBaseUrl) => {
  const assetPath = `${path.relative(
    path.dirname(path.join(outputDirectory, target.previewFilename)),
    path.join(projectRoot, 'public/assets'),
  ).replaceAll('\\', '/')}/`;
  const content = assetBaseUrl ? html : html.replace(
    /\b(src|href)="\/assets\//g,
    (_, attribute) => `${attribute}="${assetPath}`,
  );
  const title = target.type === 'intro'
    ? 'Linha Tênue — Preview AO3'
    : `AO3 — Chapter ${target.id}`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>${previewCss}\n${css}</style>
</head>
<body>
  <div id="workskin">${content}</div>
</body>
</html>
`;
};

const exportAo3 = async () => {
  const selection = parseExportArgs(process.argv.slice(2));
  const server = await createServer({
    root: projectRoot,
    server: { middlewareMode: true, watch: null },
    appType: 'custom',
  });

  try {
    const { Ao3Registry } = await server.ssrLoadModule('/src/export/ao3/registry.tsx');
    const targets = selectExportTargets(Ao3Registry, selection);
    const [
      { renderAo3Target },
      { normalizeAssetBaseUrl, prepareAo3Html },
      { validateAo3Html, validateWorkskinCss },
    ] = await Promise.all([
      server.ssrLoadModule('/src/export/ao3/index.tsx'),
      server.ssrLoadModule('/src/export/ao3/assets.ts'),
      server.ssrLoadModule('/src/export/ao3/validate.ts'),
    ]);
    const assetBaseUrl = normalizeAssetBaseUrl(process.env.AO3_ASSET_BASE_URL);
    requireProductionAssetBase(targets, assetBaseUrl);
    const css = await compileWorkskin(validateWorkskinCss);
    const previewCss = targets.some((target) => target.previewFilename)
      ? compile(path.join(projectRoot, 'src/styles/preview.scss')).css
      : '';
    const files = [];

    for (const target of targets) {
      const html = prepareAo3Html(renderAo3Target(target), assetBaseUrl);
      validateAo3Html(html, assetBaseUrl);
      files.push([target.filename, `${html}\n`]);
      if (target.previewFilename) {
        files.push([
          target.previewFilename,
          createPreview(target, html, css, previewCss, assetBaseUrl),
        ]);
      }
    }
    for (const [filename, content] of files) {
      const destination = path.join(outputDirectory, filename);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, content, 'utf8');
    }
    console.log(`${Ao3Registry.filter((target) => target.type === 'chapter').length} production chapters registered.`);
    console.log(`Export AO3 validado: dist/ao3/workskin.css${files.map(([filename]) => `, ${filename}`).join('')}`);
    if (!assetBaseUrl && targets.some((target) => target.type === 'intro')) {
      console.warn('Sem AO3_ASSET_BASE_URL: Intro QA usa /assets/. Informe uma base HTTPS pública antes de colar no AO3. O preview pode ser aberto diretamente no navegador.');
    }
  } finally {
    await server.close();
  }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  exportAo3().catch((error) => {
    console.error(`Export AO3 falhou: ${error.message}`);
    process.exitCode = 1;
  });
}
