export const validateAo3Html = (html: string, assetBaseUrl?: string): void => {
  const forbidden: [RegExp, string][] = [
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

export const validateWorkskinCss = (css: string): void => {
  const forbidden: [RegExp, string][] = [
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
