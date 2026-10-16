# React + TypeScript + Vite

## Linha Tênue — identidade e nota editorial

Os oito assets de branding fornecidos ficam em `public/branding/`, servidos em
`/branding/`. `og-image.png` é a imagem de compartilhamento do site. Favicon,
Open Graph e Twitter/X Card são configurados em `index.html` e não integram o AO3.
Ainda não há URL estável de produção nem `VITE_SITE_URL`: a imagem usa um caminho
local à origem. Ao definir o domínio definitivo, atualizar `og:image` e
`twitter:image` para URLs absolutas e adicionar canonical.

A Intro compartilha a nota editorial entre site e AO3, com textos centralizados
em `src/templates/intro/constants.tsx` e apresentação em `archive-info/`.
`showTestNotice` é `false` no site. A CLI AO3 ativa o aviso temporário por padrão,
tanto na Intro de QA quanto no capítulo 001 (Intro + Update001).
Para exportar sem o aviso na futura conta da Leth, use `--production`:

```sh
npm run export:ao3:intro -- --production
npm run export:ao3 -- --chapter 001 --production
```

No PowerShell, use `npm.cmd` no lugar de `npm` para preservar os argumentos
após `--` ao executar com o wrapper `npm.ps1` deste ambiente.

O fluxo mantém `AO3_ASSET_BASE_URL` obrigatório para capítulos. Configure a base
HTTPS pública dos assets antes de executar `npm run export:ao3` ou exportar 001.
Execute a exportação depois de `npm run build`, que recria `dist`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
