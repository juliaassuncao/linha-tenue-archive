# Modelo de conteúdo

## Fonte de verdade e primeiro modelo do MVP

Os dados estruturados são a fonte de verdade da edição adaptada. Screenshots arquivados são a fonte histórica para transcrição e QA. Componentes React apresentam os dados sem embutir conteúdo específico da história em sua implementação.

O primeiro modelo preserva os seis conceitos comprovados pelo material introdutório: `CharacterProps`, `SocialAccountProps`, `SquadProps`, `SquadParticipantProps`, `MediaAssetProps` e `IntroBlockProps`. Os contratos compartilhados ficam em `src/constants/props.ts`; `IntroBlockProps`, específico da composição da INTRO, fica em `src/templates/intro/props.ts`. `CharacterContentProps` agrega os dados de uma protagonista sem alterar esses contratos. Novos formatos só serão modelados quando houver evidência e necessidade. Os dados persistentes ficam em `src/constants/characters/` e a composição em `src/templates/intro/`; seus assets físicos permanecem em `public/assets/intro/`. O resolvedor de assets permanece futuro.

## INTRO, UPDATE e CHAPTER

- **INTRO:** front matter / apresentação inicial da obra. Não é capítulo numerado nem atualização narrativa. Sua sequência está em `src/templates/intro/constants.ts`.
- **UPDATE:** atualização histórica originalmente publicada pela autora. Sua composição futura ficará em `src/templates/updates/<numero>/`, com numeração a partir de 001, sem implementar esses arquivos nesta etapa.
- **CHAPTER:** representação/publicação de uma UPDATE no AO3, preservando os limites indicados pela autora.

A introdução não recebe número: não usar `intro-00.ts`, `chapter-00`, `update-00` ou equivalente. Pastas de screenshots em blocos de 100 não definem capítulos.

A ordem autoral confirmada da INTRO é 001 → 011: sinopse; abertura de Lorena; perfil público; perfil privado; squad; wallpaper; abertura de Eduarda; perfil público; perfil privado; squad; wallpaper.

## Organização dos dados

```text
src/
  constants/
    props.ts                     → contratos compartilhados dos dados persistentes
    characters/
      lorena/constants.ts        → LorenaC: character, accounts, squad e media
      eduarda/constants.ts       → EduardaC: character, accounts, squad e media
  templates/
    intro/
      constants.ts               → SynopsisC e IntroC: conteúdo e sequência da INTRO
      props.ts                   → IntroBlockProps: contrato local da composição
    updates/                     → uso futuro, sem arquivos nesta etapa
```

A convenção reserva `src/constants` para dados persistentes e compartilháveis da AU e seus contratos. Conteúdo relacionado a uma personagem fica agregado em um único `constants.ts` dela; constants podem conter objetos compostos e aninhados. `LorenaC` e `EduardaC` usam `satisfies CharacterContentProps`. `src/templates` reúne composições editoriais concretas: `SynopsisC` e `IntroC` compartilham o `constants.ts` da INTRO. `SynopsisC` contém título, texto e `media` com as chaves `lorena`, `contract`, `fakeKiss` e `eduarda`, cada uma contendo um MediaAsset; o objeto é verificado com `satisfies Record<string, MediaAssetProps>`. `IntroC` é tipada como `IntroBlockProps[]` e referencia essas constants, inclusive seus IDs, sem repetir os dados das entidades. Os arquivos de conteúdo têm exports nomeados, sem export default ou comentários; não há conteúdo ativo duplicado nas estruturas antigas.

Cada atualização futura ficará em `src/templates/updates/<numero>/`, preferencialmente com `index.tsx` para sua implementação React e `constants.ts` contendo todo o conteúdo específico: tweets, narração, conversas, mídia e ordem dos blocos. Props e estilos locais só quando necessários. Não espalhar uma mesma atualização por pastas globais de tweets, chats ou narrações. Não criar arquivos artificiais para rastrear pastas vazias.

Props específicas de componente ou template permanecem junto de seu contexto. `src/components` contém peças reutilizáveis de interface, organizadas futuramente por Atomic Design em `atoms`, `molecules` e `organisms`. Componentes seguem preferencialmente uma pasta com `index.tsx`, `props.ts` e `styles.module.scss`; `constants.ts` só quando houver conteúdo/configuração local necessária. A INTRO possui somente seus dados e contrato nesta etapa, sem arquivos visuais vazios. `src/types` não é catálogo global de domínio e poderá ser recriado somente para declarações realmente globais, como `global.d.ts`, quando necessário. Imports locais são relativos; imports para outras áreas do `src` usam `@/`, configurado no TypeScript e no Vite.

As constants usam propriedades sem aspas quando forem identificadores válidos, strings com aspas simples, ponto e vírgula, trailing commas em estruturas multilinha e indentação de 2 espaços. A configuração local `.prettierrc` registra essas regras. A formatação não altera textos da autora, nomes, bios, usernames, labels, contagens ou fontes.

`public/assets/intro/` contém a mídia usada pela edição adaptada, incluindo os quatro assets originais da sinopse obtidos posteriormente e os recortes históricos dos demais elementos. `source/archive/` é o arquivo histórico local não versionado. Não criar arquivos vazios para representar organização futura.

## IDs e referências

Use IDs estáveis em string, nunca derivados de índices de arrays. Contas e squads apontam à personagem por `characterId`. Referências a mídia guardam IDs de `MediaAssetProps`, sem copiar caminhos ou URLs nas entidades consumidoras.

Essas referências são strings no primeiro modelo. TypeScript verifica a forma dos objetos, mas não comprova a existência dos IDs referenciados, a relatividade dos caminhos ou a correspondência entre arquivos históricos. Essas relações devem ser conferidas na futura autoria/QA; não há validação externa nesta etapa.

## Tipos do MVP

Os contratos compartilhados ficam em `src/constants/props.ts`; `IntroBlockProps` fica em `src/templates/intro/props.ts`, sem duplicação. Todos exportam nomes explícitos terminados em `Props`, nunca apenas `Props`. Arquivos de tipos/props contêm somente imports necessários, interfaces, type aliases e union types, sem comentários ou JSDoc.

| Tipo (compartilhado em `src/constants/props.ts`, salvo indicação) | Campos e responsabilidade |
| --- | --- |
| `CharacterProps` | `id`, `name`, `source`. Identidade principal sem duplicar dados das contas. |
| `SocialAccountProps` | `id`, `characterId`, `kind`, `displayName`, `username`, `bio`, `verified`, `following`, `followers`, `avatarMediaId`, `bannerMediaId`, `source`; opcionais `location` e `websiteLabel`. |
| `SquadProps` | `id`, `name`, `characterId`, `participants`, `source`; `backgroundMediaId` opcional. Apresentação de grupo, sem associação a WhatsApp. |
| `SquadParticipantProps` | `id` local, `text`, `direction`; opcionais `label` e `avatarMediaId`. Existe dentro do squad, sem cadastro global independente. |
| `MediaAssetProps` | `id`, `relativePath`, `alt`, `source`. Mídia referenciada por ID e substituível sem alterar seus consumidores. |
| `IntroBlockProps` — `src/templates/intro/props.ts` | Union discriminada por `type`, com `id` e `source` em cada variante; organiza texto editorial e referências, sem duplicar entidades. |
| `CharacterContentProps` | `character: CharacterProps`, `accounts` com `public` e `private` (`SocialAccountProps`), `squad: SquadProps` e `media: Record<string, MediaAssetProps>`. Agrega o conjunto de dados de uma protagonista. |

### Personagens e contas

`kind` utiliza `'public' | 'private'`, sem enum. A condição privada/cadeado é derivada de `kind === 'private'`, sem campo booleano duplicado. `verified` é um boolean obrigatório que representa a presença ou ausência do selo de verificação no material.

`following` e `followers` são strings preservadas exatamente como exibidas, incluindo abreviações. `websiteLabel` é apenas o texto do perfil: não presumir protocolo, endereço real ou link funcional.

`avatarMediaId` e `bannerMediaId` guardam IDs de mídia. Capas tipográficas continuam sendo imagens; não reconstruir lettering complexo em HTML. Contas e squads se associam à personagem sem exigir listas duplicadas em `CharacterProps`.

### Squads e participantes

Squads são apresentações visuais específicas de grupo. Não são WhatsApp nem um modelo universal de chat.

Preserve somente o que estiver visível. Não complete nomes, sobrenomes, usernames, relações ou biografias. `label` guarda o rótulo de contato; `text` guarda o texto da apresentação/balão. Ambos são distintos. `label` e `avatarMediaId` podem faltar no balão enviado pela protagonista.

A ordem do array `participants` é a única fonte de verdade para a sequência editorial/visual. `direction` é obrigatório e usa `'incoming' | 'outgoing'`, sempre relativo à personagem de referência do squad; não inferir essa informação apenas pelo alinhamento. `backgroundMediaId` é uma referência opcional a mídia; não presume reutilização de um wallpaper apenas por semelhança.

### Mídia

A finalidade da mídia é determinada pelo contexto da referência: `avatarMediaId` indica avatar, `bannerMediaId` indica capa, `backgroundMediaId` indica fundo e o bloco `wallpaper` indica wallpaper. O registro não possui classificação de finalidade; o mesmo asset pode servir a múltiplos contextos quando a reutilização for confirmada. Os quatro assets originais da sinopse são mantidos separadamente: `synopsis-lorena`, `synopsis-contract`, `synopsis-fake-kiss` e `synopsis-eduarda`. A composição visual da montagem será reconstruída futuramente por HTML/CSS no template da INTRO, sem implementação nesta etapa.

`relativePath` é relativo a `public/assets/`, como `intro/eduarda/wallpaper.webp`, sem incluir `/assets/`. Não é URL pública, caminho absoluto do computador ou endereço específico de hospedagem. Nunca armazenar URL pública hardcoded no conteúdo de domínio. A futura resolução transformará `relativePath` em caminho local/public para o preview e URL pública externa para a exportação AO3.

Uma mídia derivada de screenshot poderá ser substituída por um original fornecido pela autora mantendo seu ID e atualizando o registro do asset. Mudanças de hospedagem pertencem à futura resolução e não exigem reescrever a história. Reutilização de assets só ocorre quando confirmada.

Os 21 WebP atuais incluem quatro assets originais da sinopse e 17 assets dos demais elementos, mantidos como fallback para eventuais originais futuros da Leth. Para substituições futuras, preferir substituir somente o arquivo físico existente, mantendo o mesmo filename, `relativePath` e ID. Contas, squads e blocos não precisam mudar. Os quatro assets da sinopse e seu bloco mantêm `archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG` em `source`, documentando sua utilização na publicação histórica. `relativePath` aponta ao asset físico atual, enquanto `source` preserva a proveniência histórica mesmo quando um recorte é substituído por um original.

Para arquivos ausentes no futuro, `MediaPreview` apresenta um placeholder explícito de desenvolvimento sem modificar o catálogo ou criar imagem substituta. Ele permanece em `src/preview/components/media-preview/`, separado do domínio, da Work Skin e da exportação AO3; o resolvedor definitivo continua fora desta etapa.

O catálogo físico da INTRO possui 21 assets WebP: quatro imagens originais da sinopse, oito mídias de perfis, seis avatares de squads, dois wallpapers completos e um recorte de fundo do squad de Lorena. Os arquivos da sinopse são `intro/synopsis/lorena.webp`, `intro/synopsis/contract.webp`, `intro/synopsis/fake-kiss.webp` e `intro/synopsis/eduarda.webp`, relativos a `public/assets/`. O squad de Eduarda reutiliza `eduarda-wallpaper`: as cortinas e os detalhes da fotografia correspondem ao fundo observado. O fundo de Lorena permanece separado porque o squad não mostra a frase do wallpaper; o asset é um recorte dos pixels históricos visíveis, sem substituir o wallpaper real por uma cor CSS.

Os wallpapers preservam a composição e proporção das mídias standalone. Os avatares usam recortes quadrados internos aos retratos circulares para excluir interface. As capas usam regiões sem controles ou retratos sobrepostos, com perda de enquadramento nas áreas indisponíveis; não há reconstrução de pixels ocultos, upscale, filtros ou preenchimento generativo. Nenhum asset é um screenshot completo de interface.

### Blocos da INTRO

As variantes são exclusivamente:

- `synopsis`: `title`, `text` e `mediaIds: string[]` das quatro imagens, na ordem Lorena → contrato → fake kiss → Eduarda, referenciando `SynopsisC.media.lorena.id`, `SynopsisC.media.contract.id`, `SynopsisC.media.fakeKiss.id` e `SynopsisC.media.eduarda.id`. Somente essa variante utiliza um array de IDs de mídia.
- `character-opening`: `characterId` e `text` de abertura.
- `profile`: `accountId`, sem repetir dados do perfil.
- `squad`: `squadId`, sem repetir participantes.
- `wallpaper`: `characterId` e `mediaId`, para os wallpapers apresentados por personagem. Não existe bloco genérico de mídia nesta etapa.

A ordem do array de blocos define a sequência editorial. IDs de blocos permanecem estáveis independentemente de sua posição. Não modelar agora tweets narrativos, notícias, chats ou outros formatos ausentes deste material.

## Rastreabilidade com `source`

Personagens, contas, squads, mídia e blocos guardam `source: string[]`. Participantes usam a fonte do squad que os contém. Os caminhos são relativos a `source/`, por exemplo:

```text
archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG
```

Não usar caminhos absolutos do computador. Múltiplas referências permitem registrar conteúdo derivado de mais de um screenshot. `source` serve para QA, comparação histórica e rastreabilidade editorial, podendo aparecer no preview, sem precisar aparecer no HTML final.

Uma referência histórica não obriga a publicar o screenshot. Referências de assets identificam mídia da apresentação; referências `source` identificam a evidência histórica.

## Decisões de apresentação confirmadas

Os cabeçalhos repetidos da autora não serão reconstruídos por bloco. A atribuição da obra/autora será tratada editorialmente em outro momento. Controles funcionais, como `Edit profile`, retorno, menus e ícones sem significado narrativo, serão omitidos. Verificação e privacidade permanecem representáveis por serem semanticamente relevantes.

Fidelidade textual e critérios de imagem seguem o [guia de adaptação](adaptation-guide.md). O destino estático segue as [regras para AO3](ao3-rules.md).
