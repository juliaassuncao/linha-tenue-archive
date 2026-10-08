# Regras para o conteúdo destinado ao AO3

## Contrato de publicação

O AO3 recebe **HTML estático**, **CSS de uma Work Skin** e **imagens hospedadas externamente quando necessárias**. React é uma ferramenta local de autoria e geração; não faz parte do ambiente de execução da obra publicada.

O HTML exportado deve funcionar sem JavaScript. A leitura não pode depender de:

- React no cliente ou hidratação;
- eventos como `onClick`;
- estado de aplicação;
- scripts ou animações JavaScript;
- bibliotecas externas de componentes.

Ferramentas de navegação, inspeção e QA do preview não devem ser necessárias para ler a obra nem ser incluídas como interface local no conteúdo publicado.

## HTML semântico e leitura sem Work Skin

O conteúdo deve continuar semanticamente compreensível quando a leitora desativar a Work Skin. Preserve no HTML a ordem de leitura, as relações entre os conteúdos e as informações necessárias para interpretar cada bloco.

Nome e username de uma conta devem ser texto real, assim como narração e mensagens transcritas. Identificação de autores, remetentes e relações de resposta ou citação não deve depender apenas de cor, posicionamento, avatar ou decoração CSS.

Use estrutura semântica adequada ao conteúdo, com parágrafos, títulos e agrupamentos coerentes. A apresentação visual pode aproximar as interfaces da AU, mas não deve esconder informações essenciais em estilos ou transformar texto legível em imagem por conveniência.

### Semântica dos blocos e elementos visuais

`<section>` agrupa uma parte temática de uma página ou documento; `<article>` representa uma unidade relativamente autônoma que faz sentido por si mesma. Na implementação atual, `CharacterSection` usa `<section>` e `SocialProfile` usa `<article>`.

Elementos visuais que simulam controles da interface original, mas não executam uma ação real, não devem ser implementados como `<button>` ou `<a>`. Usar markup não interativo apropriado, preservando o visual sem criar falsa semântica ou interatividade. Links e botões ficam reservados a ações reais.

Imagens puramente decorativas ou redundantes devem usar `alt=""` quando a informação já estiver disponível em texto próximo. Imagens informativas devem possuir texto alternativo apropriado ao conteúdo, sem inventar informações ausentes na fonte.

## Work Skin e estilos locais

O CSS publicado deve conter somente estilos necessários ao conteúdo da obra. Mantenha separadas as duas finalidades descritas na [arquitetura](architecture.md):

- `workskin.scss`: origem conceitual dos estilos do conteúdo publicado, compilados em CSS para a Work Skin.
- `preview.scss`: estilos exclusivos das ferramentas e da interface local.

Não exporte SCSS como se fosse CSS pronto. Não deixe o HTML publicado depender dos estilos exclusivos do preview. Use CSS compatível com o destino AO3; os recursos concretos deverão ser verificados no destino quando forem implementados.

### Decisões de CSS para o conteúdo da obra

O preview React do conteúdo destinado futuramente ao AO3 deve manter um layout traduzível para Work Skin. Isso também se aplica aos CSS Modules de Intro, Synopsis, CharacterSection e SocialProfile; funcionar no navegador local não comprova compatibilidade no destino. O objetivo é aproximar o preview do comportamento possível no AO3, sem exigir um redesenho durante a exportação.

Priorizar responsividade natural com `width`, `max-width`, `height: auto`, `display`, `flex`, `flex-wrap`, `margin`, `padding` e `box-sizing`. Usar `position` e `z-index` quando necessários à composição, como nas sobreposições do perfil. Estas são decisões relevantes ao projeto, não uma lista completa de propriedades aceitas pelo AO3.

Neste projeto, não utilizar nesse conteúdo:

- `@media`;
- `gap`, `row-gap` ou `column-gap`;
- CSS Grid, incluindo `display: grid`, `grid-template-columns` e `grid-template-rows`;
- `object-fit`.

Na Work Skin da INTRO, também não utilizar CSS custom properties ou `var()`. Usar valores finais explícitos e classes estáveis `lt-*`, sempre sob `#workskin`, sem depender das classes geradas pelos CSS Modules. Atributos `style` não integram o conteúdo exportado.

Preferir fluxo normal do documento, HTML simples, `display: block`, `margin` para espaçamento, `padding`, `width` e `max-width`. Imagens usam `display: block`, `width: 100%`, `max-width: 100%` e `height: auto`, preservando sua proporção original. O container pai limita e centraliza a largura de leitura; não usar alturas fixas para enquadrar imagens. A versão atual também dispensa funções como `clamp` e unidades de viewport nos estilos do conteúdo, adotando valores simples em `em`, porcentagens e pixels. O [limpador de CSS do AO3](https://github.com/otwcode/otwarchive/blob/master/lib/css_cleaner.rb) valida tanto propriedades quanto seus valores.

A sinopse aprovada apresenta quatro assets separados na ordem Lorena → contrato → fake kiss → Eduarda. O layout usa `flex-wrap`, com cada `details` fechado ocupando 50% da largura e aberto ocupando 100%. Cada imagem está no próprio `summary` e cresce sem renderizar outra cópia. O indicador de fechar aparece somente com o item aberto. Não há modal, lightbox, estado React ou eventos JavaScript.

### Interações nativas de HTML

`details` e `summary` estão permitidos na [configuração atual do sanitizer do AO3](https://github.com/otwcode/otwarchive/blob/master/config/initializers/gem-plugin_config/sanitizer_config.rb) e são usados na sinopse para abrir/fechar as imagens sem JavaScript.

Essa configuração não permite `main`, `header`, `section` ou `article` no conteúdo da obra. O React mantém esses elementos no site; o exportador converte somente esses contêineres para `div`, preservando conteúdo e classes. `h1`, `h2`, `h3`, `figure`, `details` e `summary` permanecem. Atributos `role` e `aria-*`, ausentes da lista permitida, são retirados somente da saída AO3; os textos alternativos continuam nas imagens. Isso não substitui uma validação no rascunho real do AO3.

## Responsividade e acessibilidade

- Priorize leitura em celular, tablet e desktop, evitando layouts que exijam largura fixa para compreender o texto.
- Preserve sequência de leitura coerente mesmo sem a aparência de uma plataforma social.
- Garanta legibilidade, contraste e identificação textual das informações relevantes.
- Para mídia visual, forneça alternativa textual adequada ao papel da imagem, sem inventar conteúdo ausente na fonte.
- Dimensione imagens de modo que não impeçam a leitura em telas pequenas.

Fotos, ilustrações e wallpapers podem permanecer imagens. A decisão sobre screenshots completos e reconstrução textual pertence ao [guia de adaptação](adaptation-guide.md).

## Assets e referências históricas

Os dados referenciam assets por identificadores ou caminhos internos. `resolveAssetUrl`, em `src/utils/resolve-asset-url.ts`, resolve os caminhos dos componentes para `/assets/...`. Ícones de UI também usam essa função. O exportador substitui o prefixo de `src` e `href` por `AO3_ASSET_BASE_URL`, sem alterar dados, arquivos físicos ou proveniência histórica. Caminhos locais de desenvolvimento não servem como endereço de mídia publicada.

O campo `source` mantém a ligação com os screenshots para QA e pode aparecer no preview/editor. Ele não precisa ser exibido no AO3. Referências históricas e assets usados na obra têm funções distintas, conforme o [modelo de conteúdo](content-model.md).

## Critérios de validação da publicação

Ao implementar o pipeline, conferir:

1. O HTML exportado permite ler todo o conteúdo sem JavaScript.
2. A leitura preserva nomes, usernames, texto e relações narrativas com a Work Skin desativada.
3. A Work Skin usa apenas estilos do conteúdo publicado e funciona no destino AO3.
4. Texto e mídia permanecem legíveis em celular, tablet e desktop.
5. Imagens necessárias usam URLs públicas e alternativas textuais apropriadas.
6. O capítulo mantém o conteúdo e a divisão da atualização original indicada pela autora.

## Spike de exportação da INTRO

```text
React local → renderToStaticMarkup → intro.html → Work Skin → AO3
```

`src/export/ao3/render-intro.tsx` renderiza a mesma `Intro` com `react-dom/server`. `scripts/export-ao3-intro.mjs` usa `createServer` e `ssrLoadModule` do Vite para carregar os imports TSX, aliases e SCSS Modules. React e Vite são ferramentas de autoria; não são enviados ao AO3.

Execute:

```sh
npm run export:ao3:intro
```

Para gerar URLs de publicação, defina uma base HTTPS pública que inclua o diretório dos assets. Exemplo em PowerShell, com domínio ilustrativo a substituir:

```powershell
$env:AO3_ASSET_BASE_URL = 'https://example.vercel.app/assets/'
npm run export:ao3:intro
```

A base não pode conter credenciais, query ou fragmento; as barras finais são normalizadas. Não há domínio padrão. A hospedagem dos arquivos e o teste real no AO3 são etapas externas ao comando.

O comando gera em `dist/ao3/`:

- `intro.html`: somente o fragmento da obra, para o editor HTML do AO3; sem documento externo, wrapper `#workskin`, scripts, estilos inline, preloads do React ou classes de CSS Modules.
- `workskin.css`: compilação Sass de `src/styles/workskin.scss`, para o campo CSS de uma Work Skin. Os estilos foram traduzidos explicitamente dos CSS Modules aprovados; não há importação automática deles. Margens de `details`, fontes dos headings e bordas de `h3` são explicitadas para neutralizar estilos padrão do AO3.
- `intro-preview.html`: documento local completo, com CSS da Work Skin, moldura de preview e wrapper `#workskin`; não é conteúdo para colar no AO3. Sem base externa, usa caminhos relativos a `public/assets` e pode ser aberto diretamente no navegador. Com base externa, usa as mesmas URLs HTTPS de `intro.html`.

Sem `AO3_ASSET_BASE_URL`, o fragmento mantém `/assets/` e o comando avisa que a base pública é necessária antes do teste real. `npm run build` recria `dist`; execute o export depois do build.

No Chat, o wallpaper é um `img` decorativo com `alt=""`, posicionado no topo da área de mensagens e recortado por `overflow`. As mensagens ficam em uma camada acima, mantendo padding, altura máxima e rolagem. Não há `background-image` nem `url()` na Work Skin. Nos assets atuais da INTRO, a imagem proporcional preenche a altura visível dos chats.

Os avatares do header são renderizados a partir de uma cópia invertida de `headerAvatarMediaIds` e apresentados com `flex-direction: row-reverse`. A ordem visual original permanece e o primeiro item é pintado por último, acima dos seguintes. Não há `z-index` inline, classes por personagem ou quantidade fixa de avatares. Sem CSS, os avatares decorativos do header seguem a ordem inversa do DOM; a sequência textual das mensagens permanece intacta.

O exportador rejeita scripts, estilos inline, atributos de eventos, `javascript:`, assets embutidos, tags incompatíveis com o fragmento, classes não estáveis e imagens sem `src`/`alt`. Com base externa, também rejeita caminhos locais restantes e URLs de imagem sem HTTPS. O CSS é validado contra `@media`, gap, Grid, `object-fit`, variáveis, `url()` e seletores fora de `#workskin`.

O pipeline local foi validado com lint, build, export, estrutura dos blocos, URLs absolutas e testes de rejeição. O preview foi conferido em 320, 390, 768 e 1440 pixels, incluindo expansão nativa, prioridade dos avatares, imagens e leitura sem Work Skin. Isso não executa o sanitizer remoto nem comprova a aceitação final da Work Skin no AO3.

Para encerrar o spike no destino: hospedar os assets, exportar com a base real, criar uma Work Skin com `workskin.css`, selecionar essa skin em um rascunho e colar `intro.html` no editor HTML. Conferir desktop/mobile, expansão, imagens, textos e leitura com a skin desativada antes de avançar às atualizações narrativas.
