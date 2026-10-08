export const normalizeAssetBaseUrl = (value?: string): string | undefined => {
  if (!value) return undefined;

  let url: URL;
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

const escapeAttribute = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

export const prepareAo3Html = (markup: string, assetBaseUrl?: string): string => {
  const content = markup
    .replace(/<link\b[^>]*\brel="preload"[^>]*>/gi, '')
    .replace(/<(\/?)(?:main|header|section|article)\b/gi, '<$1div')
    .replace(/\s(?:aria-[\w-]+|role)="[^"]*"/gi, '')
    .replace(/\sclass="([^"]*)"/g, (_, classes: string) => {
      const stableClasses = classes.split(/\s+/)
        .filter((name) => /^lt-[\w-]+$/.test(name));
      return stableClasses.length ? ` class="${stableClasses.join(' ')}"` : '';
    });

  return assetBaseUrl
    ? content.replace(/\b(src|href)="\/assets\//g, (_, attribute) =>
      `${attribute}="${escapeAttribute(assetBaseUrl)}`)
    : content;
};
