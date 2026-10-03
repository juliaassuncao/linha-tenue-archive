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

Preferir fluxo normal do documento, HTML simples, `display: block`, `margin` para espaçamento, `padding`, `width` e `max-width`. Imagens usam `display: block`, `width: 100%`, `max-width: 100%` e `height: auto`, preservando sua proporção original. O container pai limita e centraliza a largura de leitura; não usar alturas fixas para enquadrar imagens. A versão atual também dispensa funções como `clamp` e unidades de viewport nos estilos do conteúdo, adotando valores simples em `em`, porcentagens e pixels. O [limpador de CSS do AO3](https://github.com/otwcode/otwarchive/blob/master/lib/css_cleaner.rb) valida tanto propriedades quanto seus valores.

A sinopse apresenta quatro imagens em coluna única em desktop, tablet e celular, sem breakpoints: Lorena → contrato → fake kiss → Eduarda. Não reconstruir a montagem 2×2. Cada imagem é um link HTML para o próprio asset, sem modal, lightbox, estado ou eventos JavaScript. No preview, `href` e `src` derivam de `/assets/${media.relativePath}`; a futura exportação deverá resolver ambos para a URL pública correspondente.

### Interações nativas de HTML

`details` e `summary` estão permitidos na [configuração atual do sanitizer do AO3](https://github.com/otwcode/otwarchive/blob/master/config/initializers/gem-plugin_config/sanitizer_config.rb) e poderão servir futuramente para abrir/fechar conteúdo sem JavaScript, quando houver necessidade real. Não são usados na sinopse: suas quatro imagens permanecem visíveis normalmente.

## Responsividade e acessibilidade

- Priorize leitura em celular, tablet e desktop, evitando layouts que exijam largura fixa para compreender o texto.
- Preserve sequência de leitura coerente mesmo sem a aparência de uma plataforma social.
- Garanta legibilidade, contraste e identificação textual das informações relevantes.
- Para mídia visual, forneça alternativa textual adequada ao papel da imagem, sem inventar conteúdo ausente na fonte.
- Dimensione imagens de modo que não impeçam a leitura em telas pequenas.

Fotos, ilustrações e wallpapers podem permanecer imagens. A decisão sobre screenshots completos e reconstrução textual pertence ao [guia de adaptação](adaptation-guide.md).

## Assets e referências históricas

Os dados devem referenciar assets por identificadores ou caminhos internos quando possível. A futura resolução para exportação fornecerá URLs externas públicas; caminhos locais de desenvolvimento não servem como endereço de mídia publicada.

O campo `source` mantém a ligação com os screenshots para QA e pode aparecer no preview/editor. Ele não precisa ser exibido no AO3. Referências históricas e assets usados na obra têm funções distintas, conforme o [modelo de conteúdo](content-model.md).

## Critérios de validação da publicação

Ao implementar o pipeline, conferir:

1. O HTML exportado permite ler todo o conteúdo sem JavaScript.
2. A leitura preserva nomes, usernames, texto e relações narrativas com a Work Skin desativada.
3. A Work Skin usa apenas estilos do conteúdo publicado e funciona no destino AO3.
4. Texto e mídia permanecem legíveis em celular, tablet e desktop.
5. Imagens necessárias usam URLs públicas e alternativas textuais apropriadas.
6. O capítulo mantém o conteúdo e a divisão da atualização original indicada pela autora.

O MVP **INTRO — Informações iniciais**, front matter sem numeração, deve validar a exportação e a publicação no AO3 antes da adaptação das atualizações narrativas. Estes são requisitos do projeto; esta etapa documental não implementa nem comprova o pipeline.
