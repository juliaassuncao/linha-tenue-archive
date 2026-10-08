import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

export const normalizeAssetBaseUrl = (value) => {
  if (!value) return undefined;

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('AO3_ASSET_BASE_URL deve ser uma URL HTTPS absoluta.');
  }
  if (
    url.protocol !== 'https:' || url.username || url.password ||
    url.search || url.hash
  ) {
    throw new Error('AO3_ASSET_BASE_URL deve usar HTTPS, sem credenciais, query ou fragmento.');
  }
  return `${url.href.replace(/\/+$/, '')}/`;
};

const escapeAttribute = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

export const prepareIntroHtml = (markup, assetBaseUrl) => {
  const content = markup
    .replace(/<link\b[^>]*\brel="preload"[^>]*>/gi, '')
    .replace(/<(\/?)(?:main|header|section|article)\b/gi, '<$1div')
    .replace(/\s(?:aria-[\w-]+|role)="[^"]*"/gi, '')
    .replace(/\sclass="([^"]*)"/g, (_, classes) => {
      const stableClasses = classes.split(/\s+/)
        .filter((name) => /^lt-[\w-]+$/.test(name));
      return stableClasses.length ? ` class="${stableClasses.join(' ')}"` : '';
    });

  return assetBaseUrl
    ? content.replace(/\b(src|href)="\/assets\//g, (_, attribute) =>
      `${attribute}="${escapeAttribute(assetBaseUrl)}`)
    : content;
};

export const validateIntroHtml = (html, assetBaseUrl) => {
  const forbidden = [
    [/<script\b/i, '<script>'],
    [/\sstyle\s*=/i, 'style inline'],
    [/javascript\s*:/i, 'javascript:'],
    [/\son[a-z]+\s*=/i, 'atributo de evento (onClick, onLoad etc.)'],
    [/<(?:html|head|body|style|link|main|header|section|article)\b/i, 'wrapper ou tag incompatível com o fragmento AO3'],
    [/\bid\s*=\s*["']workskin["']/i, '#workskin no fragmento'],
    [/\b(?:src|href)="(?:data|blob):/i, 'asset embutido'],
  ];
  for (const [pattern, label] of forbidden) {
    if (pattern.test(html)) throw new Error(`HTML AO3 inválido: ${label}.`);
  }
  if (!/class="lt-[^"]*"/.test(html)) {
    throw new Error('HTML AO3 inválido: classes lt-* ausentes.');
  }
  for (const [, classes] of html.matchAll(/\bclass="([^"]*)"/g)) {
    if (classes.split(/\s+/).some((name) => !/^lt-[\w-]+$/.test(name))) {
      throw new Error('HTML AO3 inválido: classe dependente de CSS Modules.');
    }
  }
  if (assetBaseUrl && /\b(?:src|href)="\/assets\//i.test(html)) {
    throw new Error('HTML AO3 inválido: restaram caminhos locais /assets/.');
  }
  for (const [image] of html.matchAll(/<img\b[^>]*>/gi)) {
    const source = image.match(/\bsrc="([^"]+)"/i)?.[1];
    if (!source || !/\balt="[^"]*"/i.test(image)) {
      throw new Error('HTML AO3 inválido: imagem sem src ou alt.');
    }
    if (assetBaseUrl ? !source.startsWith('https://') : !source.startsWith('/assets/')) {
      throw new Error('HTML AO3 inválido: URL de imagem inesperada.');
    }
  }
};

export const validateWorkskinCss = (css) => {
  const forbidden = [
    [/@media\b/i, '@media'],
    [/(?:^|[;{}])\s*(?:gap|row-gap|column-gap)\s*:/i, 'gap'],
    [/\bdisplay\s*:\s*(?:inline-)?grid\b/i, 'CSS Grid'],
    [/(?:^|[;{}])\s*grid[\w-]*\s*:/i, 'propriedade grid'],
    [/\bobject-fit\s*:/i, 'object-fit'],
    [/\bvar\s*\(/i, 'var()'],
    [/(?:^|[;{}])\s*--[\w-]+\s*:/, 'CSS custom property'],
    [/\burl\s*\(/i, 'url()'],
  ];
  for (const [pattern, label] of forbidden) {
    if (pattern.test(css)) throw new Error(`Work Skin inválida: ${label}.`);
  }
  const rules = [...css.matchAll(/([^{}]+)\{/g)];
  if (!rules.length) throw new Error('Work Skin inválida: CSS vazio.');
  for (const [, selectors] of rules) {
    if (selectors.split(',').some((selector) => !selector.trim().startsWith('#workskin '))) {
      throw new Error('Work Skin inválida: seletor fora de #workskin.');
    }
  }
};

const exportIntro = async () => {
  const assetBaseUrl = normalizeAssetBaseUrl(process.env.AO3_ASSET_BASE_URL);
  const server = await createServer({
    root: projectRoot,
    server: { middlewareMode: true, watch: null },
    appType: 'custom',
  });

  try {
    const { renderIntro } = await server.ssrLoadModule('/src/export/ao3/render-intro.tsx');
    const html = prepareIntroHtml(renderIntro(), assetBaseUrl);
    const css = compile(path.join(projectRoot, 'src/styles/workskin.scss'), {
      style: 'expanded',
    }).css;
    validateIntroHtml(html, assetBaseUrl);
    validateWorkskinCss(css);

    const previewCss = compile(path.join(projectRoot, 'src/styles/preview.scss')).css;
    const previewContent = assetBaseUrl ? html : html.replace(
      /\b(src|href)="\/assets\//g,
      '$1="../../public/assets/',
    );
    const preview = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Linha Tênue — Preview AO3</title>
  <style>${previewCss}\n${css}</style>
</head>
<body>
  <div id="workskin">${previewContent}</div>
</body>
</html>
`;
    const directory = path.join(projectRoot, 'dist/ao3');
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'intro.html'), `${html}\n`, 'utf8');
    await writeFile(path.join(directory, 'workskin.css'), `${css}\n`, 'utf8');
    await writeFile(path.join(directory, 'intro-preview.html'), preview, 'utf8');
    console.log('Export AO3 validado: dist/ao3/{intro.html,workskin.css,intro-preview.html}');
    if (!assetBaseUrl) {
      console.warn('Sem AO3_ASSET_BASE_URL: intro.html usa /assets/. Informe uma base HTTPS pública antes de colar no AO3. O preview pode ser aberto diretamente no navegador.');
    }
  } finally {
    await server.close();
  }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  exportIntro().catch((error) => {
    console.error(`Export AO3 falhou: ${error.message}`);
    process.exitCode = 1;
  });
}
