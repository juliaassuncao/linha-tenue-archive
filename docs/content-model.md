# Modelo de conteúdo

## Fonte de verdade e primeiro modelo do MVP

Os dados estruturados são a fonte de verdade da edição adaptada. Screenshots arquivados são a fonte histórica para transcrição e QA. Componentes React apresentam os dados sem embutir conteúdo específico da história em sua implementação.

O primeiro modelo preserva os seis conceitos comprovados pelo material introdutório: `CharacterProps`, `SocialAccountProps`, `ChatContentProps`, `ChatMessageProps`, `MediaAssetProps` e `IntroBlockProps`. Os contratos compartilhados ficam em `src/constants/props.ts`; `IntroBlockProps`, específico da composição da INTRO, fica em `src/templates/intro/props.ts`. `CharacterContentProps` agrega os dados de uma protagonista sem alterar esses contratos. Novos formatos só serão modelados quando houver evidência e necessidade. Os dados persistentes ficam em `src/constants/characters/` e a composição em `src/templates/intro/`; seus assets físicos permanecem em `public/assets/intro/`. O resolvedor de assets permanece futuro.

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

A convenção reserva `src/constants` para dados persistentes e compartilháveis da AU e seus contratos. Conteúdo relacionado a uma personagem fica agregado em um único `constants.ts` dela; constants podem conter objetos compostos e aninhados. `LorenaC` e `EduardaC` usam `satisfies CharacterContentProps`. `src/templates` reúne composições editoriais concretas: `SynopsisC` e `IntroC` compartilham o `constants.ts` da INTRO. `SynopsisC` contém título, texto e `media` com as chaves `lorena`, `contract`, `fakeKiss` e `eduarda`, cada uma contendo um MediaAsset; o objeto é verificado com `satisfies Record<string, MediaAssetProps>`. `IntroC` reúne o cabeçalho editorial em `header` (`title` e `subtitle`) e a sequência em `blocks`, verificada com `satisfies IntroBlockProps[]`. Os blocos referenciam essas constants, inclusive seus IDs, sem repetir os dados das entidades. Os arquivos de conteúdo têm exports nomeados, sem export default ou comentários; não há conteúdo ativo duplicado nas estruturas antigas.

Cada atualização futura ficará em `src/templates/updates/<numero>/`, preferencialmente com `index.tsx` para sua implementação React e `constants.ts` contendo todo o conteúdo específico: tweets, narração, conversas, mídia e ordem dos blocos. Props e estilos locais só quando necessários. Não espalhar uma mesma atualização por pastas globais de tweets, chats ou narrações. Não criar arquivos artificiais para rastrear pastas vazias.

Props específicas de componente ou template permanecem junto de seu contexto. `src/components` contém peças reutilizáveis de interface, organizadas futuramente por Atomic Design em `atoms`, `molecules` e `organisms`. Componentes seguem preferencialmente uma pasta com `index.tsx`, `props.ts` e `styles.module.scss`; `constants.ts` só quando houver conteúdo/configuração local necessária. A INTRO possui somente seus dados e contrato nesta etapa, sem arquivos visuais vazios. `src/types` não é catálogo global de domínio e poderá ser recriado somente para declarações realmente globais, como `global.d.ts`, quando necessário. Imports locais são relativos; imports para outras áreas do `src` usam `@/`, configurado no TypeScript e no Vite.

As constants usam propriedades sem aspas quando forem identificadores válidos, strings com aspas simples, ponto e vírgula, trailing commas em estruturas multilinha e indentação de 2 espaços. A configuração local `.prettierrc` registra essas regras. A formatação não altera textos da autora, nomes, bios, usernames, labels, contagens ou fontes.

`public/assets/intro/` contém a mídia usada pela edição adaptada, incluindo os quatro assets originais da sinopse obtidos posteriormente e os recortes históricos dos demais elementos. `source/archive/` é o arquivo histórico local não versionado. Não criar arquivos vazios para representar organização futura.

## IDs e referências

Use IDs estáveis em string, nunca derivados de índices de arrays. Contas apontam à personagem por `characterId`. Chats não possuem `characterId`; na INTRO, o contexto da squad vem de `LorenaC.squad` ou `EduardaC.squad`. Referências a mídia guardam IDs de `MediaAssetProps`, sem copiar caminhos ou URLs nas entidades consumidoras.

Essas referências são strings no primeiro modelo. TypeScript verifica a forma dos objetos, mas não comprova a existência dos IDs referenciados, a relatividade dos caminhos ou a correspondência entre arquivos históricos. Essas relações devem ser conferidas na futura autoria/QA; não há validação externa nesta etapa.

## Tipos do MVP

Os contratos compartilhados ficam em `src/constants/props.ts`; `IntroBlockProps` fica em `src/templates/intro/props.ts`, sem duplicação. Todos exportam nomes explícitos terminados em `Props`, nunca apenas `Props`. Arquivos de tipos/props contêm somente imports necessários, interfaces, type aliases e union types, sem comentários ou JSDoc.

| Tipo (compartilhado em `src/constants/props.ts`, salvo indicação) | Campos e responsabilidade |
| --- | --- |
| `CharacterProps` | `id`, `name`, `source`. Identidade principal sem duplicar dados das contas. |
| `SocialAccountProps` | `id`, `characterId`, `kind`, `displayName`, `username`, `bio`, `verified`, `following`, `followers`, `avatarMediaId`, `bannerMediaId`, `source`; opcionais `location` e `websiteLabel`. |
| `ChatContentProps` | `id`, `title`, `kind: 'group' \| 'direct'`, `messages: ChatMessageProps[]`, `source`; opcionais `headerAvatarMediaIds: string[]` e `backgroundMediaId`. Conteúdo genérico de chat, sem `characterId`. |
| `ChatMessageProps` | `id` local, `text`, `direction`; opcionais `senderName` e `avatarMediaId`. Existe dentro do chat, sem cadastro global independente. |
| `MediaAssetProps` | `id`, `relativePath`, `alt`, `source`. Mídia referenciada por ID e substituível sem alterar seus consumidores. |
| `IntroBlockProps` — `src/templates/intro/props.ts` | Union discriminada por `type`, com `id` e `source` em cada variante; organiza texto editorial e referências, sem duplicar entidades. |
| `CharacterContentProps` | `character: CharacterProps`, `accounts` com `public` e `private` (`SocialAccountProps`), `squad: ChatContentProps` e `media: Record<string, MediaAssetProps>`. Agrega o conjunto de dados de uma protagonista. |

### Personagens e contas

`kind` utiliza `'public' | 'private'`, sem enum. A condição privada/cadeado é derivada de `kind === 'private'`, sem campo booleano duplicado. `verified` é um boolean obrigatório que representa a presença ou ausência do selo de verificação no material.

`following` e `followers` são strings preservadas exatamente como exibidas, incluindo abreviações. `websiteLabel` é apenas o texto do perfil: não presumir protocolo, endereço real ou link funcional.

`avatarMediaId` e `bannerMediaId` guardam IDs de mídia. Capas tipográficas continuam sendo imagens; não reconstruir lettering complexo em HTML. Contas se associam à personagem por `characterId`, sem exigir listas duplicadas em `CharacterProps`. A squad permanece no agregado da protagonista, sem repetir essa associação no chat.

### Chats e squads da INTRO

`squad` é um contexto editorial da INTRO: a apresentação do grupo de cada protagonista. A propriedade permanece em `CharacterContentProps`, mas seu conteúdo utiliza o modelo genérico `ChatContentProps`, com mensagens `ChatMessageProps`, sem pressupor uma plataforma específica. Esses contratos serão reutilizados posteriormente pelas conversas dos updates. O componente visual futuro será `Chat`; não criar um componente `Squad` específico. A implementação visual de `Chat` e `ChatMessage` permanece fora desta refatoração.

`kind` identifica explicitamente um chat de grupo (`'group'`) ou direto (`'direct'`), sem inferência pelo conteúdo das mensagens. As squads de Lorena e Eduarda usam `'group'`. `Chat` determina a exibição do remetente por `kind === 'group'` e `direction === 'incoming'`; `ChatMessage` recebe essa decisão em `showSenderName` e só renderiza o nome quando `senderName` existe, fora do balão e imediatamente acima dele. Chats diretos e mensagens outgoing não exibem o nome nem reservam espaço para ele. Essa regra não remove `senderName` dos dados.

Preserve somente o que estiver visível. Não complete nomes, sobrenomes, usernames, relações ou biografias. `senderName` guarda o nome/rótulo de contato do remetente; `text` guarda o texto da apresentação/balão. Ambos são distintos. `senderName` e `avatarMediaId` podem faltar no balão enviado pela protagonista.

A ordem do array `messages` é a única fonte de verdade para a sequência editorial/visual. `direction` é obrigatório e usa `'incoming' | 'outgoing'`, relativo ao contexto de referência do chat (na INTRO, a protagonista cuja squad está sendo apresentada); não inferir essa informação apenas pelo alinhamento. `avatarMediaId` nas mensagens e `backgroundMediaId` no chat são referências a assets por ID, sem duplicar `MediaAssetProps`, `relativePath`, `alt` ou `source`. O fundo é opcional no contrato genérico. Nos chats de cada protagonista, incluindo o squad, usar o wallpaper normal da respectiva personagem: `lorena-wallpaper` ou `eduarda-wallpaper`. Não existe wallpaper especial de squad.

`headerAvatarMediaIds` representa, em ordem visual, os avatares exibidos no cabeçalho daquele chat naquele momento da narrativa. É uma configuração própria do header, sem inferência por `messages`, `senderName`, `avatarMediaId` das mensagens, `kind` ou quantidade de participantes. Um chat direto pode ter um avatar; um grupo pode ter vários. A lista não representa necessariamente todas as pessoas que já enviaram mensagens: se alguém sair de um grupo, um update posterior pode configurar outros avatares, mesmo mantendo mensagens históricas dessa pessoa. Não sincronizar automaticamente `messages` e `headerAvatarMediaIds`.

O componente `Chat` resolve os IDs em `mediaById`, com registros `MediaAssetProps`, e usa os caminhos e textos alternativos existentes. Sem configuração, com lista vazia ou com todos os IDs ausentes no catálogo recebido, o header continua renderizando sem avatares. IDs não resolvidos são ignorados, preservando a ordem dos demais.

Na INTRO, os IDs cadastrados permitem apresentar léo → viviane → maggye no header da Lorena e gerluce → paulinho → isabela no da Eduarda, na ordem da fonte. Os avatares das próprias protagonistas presentes no header original ainda não têm registros correspondentes em `media`; não substituir por avatares de perfis nem inventar novos assets.

### Mídia

A finalidade da mídia é determinada pelo contexto da referência: `avatarMediaId` indica avatar, `bannerMediaId` indica capa, `backgroundMediaId` indica fundo e o bloco `wallpaper` indica wallpaper. O registro não possui classificação de finalidade; o mesmo asset pode servir a múltiplos contextos quando a reutilização for confirmada. Os quatro assets originais da sinopse são mantidos separadamente: `synopsis-lorena`, `synopsis-contract`, `synopsis-fake-kiss` e `synopsis-eduarda`. Sua apresentação atual é uma coluna única com links individuais, mantendo essa ordem em todos os tamanhos de tela; não reconstruir a montagem 2×2, conforme as [regras para AO3](ao3-rules.md).

`relativePath` é relativo a `public/assets/`, como `intro/eduarda/wallpaper.webp`, sem incluir `/assets/`. Não é URL pública, caminho absoluto do computador ou endereço específico de hospedagem. Nunca armazenar URL pública hardcoded no conteúdo de domínio. A futura resolução transformará `relativePath` em caminho local/public para o preview e URL pública externa para a exportação AO3.

Uma mídia derivada de screenshot poderá ser substituída por um original fornecido pela autora mantendo seu ID e atualizando o registro do asset. Mudanças de hospedagem pertencem à futura resolução e não exigem reescrever a história. Reutilização de assets só ocorre quando confirmada.

Os 21 WebP atuais incluem quatro assets originais da sinopse e 17 assets dos demais elementos, mantidos como fallback para eventuais originais futuros da Leth. Para substituições futuras, preferir substituir somente o arquivo físico existente, mantendo o mesmo filename, `relativePath` e ID. Contas, squads e blocos não precisam mudar. Os quatro assets da sinopse e seu bloco mantêm `archive/Info Linha Tênue - Leth Medveguillen/001. Sinopse.PNG` em `source`, documentando sua utilização na publicação histórica. `relativePath` aponta ao asset físico atual, enquanto `source` preserva a proveniência histórica mesmo quando um recorte é substituído por um original.

Para arquivos ausentes no futuro, `MediaPreview` apresenta um placeholder explícito de desenvolvimento sem modificar o catálogo ou criar imagem substituta. Ele permanece em `src/preview/components/media-preview/`, separado do domínio, da Work Skin e da exportação AO3; o resolvedor definitivo continua fora desta etapa.

O catálogo físico da INTRO possui 21 assets WebP: quatro imagens originais da sinopse, oito mídias de perfis, seis avatares de squads, dois wallpapers completos e um recorte de fundo do squad de Lorena. Os arquivos da sinopse são `intro/synopsis/lorena.webp`, `intro/synopsis/contract.webp`, `intro/synopsis/fake-kiss.webp` e `intro/synopsis/eduarda.webp`, relativos a `public/assets/`. Os squads e os demais chats usam o mesmo wallpaper da respectiva personagem: `lorena-wallpaper` para Lorena e `eduarda-wallpaper` para Eduarda. O recorte de fundo do squad de Lorena não é usado pela apresentação; não há registro `squadBackground` no catálogo de dados.

Os wallpapers preservam a composição e proporção das mídias standalone. Os avatares usam recortes quadrados internos aos retratos circulares para excluir interface. As capas usam regiões sem controles ou retratos sobrepostos, com perda de enquadramento nas áreas indisponíveis; não há reconstrução de pixels ocultos, upscale, filtros ou preenchimento generativo. Nenhum asset é um screenshot completo de interface.

### Blocos da INTRO

As variantes são exclusivamente:

- `synopsis`: `title`, `text` e `mediaIds: string[]` das quatro imagens, na ordem Lorena → contrato → fake kiss → Eduarda, referenciando `SynopsisC.media.lorena.id`, `SynopsisC.media.contract.id`, `SynopsisC.media.fakeKiss.id` e `SynopsisC.media.eduarda.id`. Somente essa variante utiliza um array de IDs de mídia.
- `character-opening`: `characterId` e `text` de abertura.
- `profile`: `accountId`, sem repetir dados do perfil.
- `squad`: `squadId`, sem repetir mensagens.
- `wallpaper`: `characterId` e `mediaId`, para os wallpapers apresentados por personagem. Não existe bloco genérico de mídia nesta etapa.

A ordem do array de blocos define a sequência editorial. IDs de blocos permanecem estáveis independentemente de sua posição. Os contratos genéricos de chat estão definidos para o conteúdo atual das squads; não cadastrar conversas dos updates nem modelar agora tweets narrativos, notícias ou outros formatos ausentes deste material.

## Rastreabilidade com `source`

Personagens, contas, chats (incluindo squads), mídia e blocos guardam `source: string[]`. Mensagens usam a fonte do chat que as contém. Os caminhos são relativos a `source/`, por exemplo:

```text
archive/Info Linha Tênue - Leth Medveguillen/003. Info Lorena.JPG
```

Não usar caminhos absolutos do computador. Múltiplas referências permitem registrar conteúdo derivado de mais de um screenshot. `source` serve para QA, comparação histórica e rastreabilidade editorial, podendo aparecer no preview, sem precisar aparecer no HTML final.

Uma referência histórica não obriga a publicar o screenshot. Referências de assets identificam mídia da apresentação; referências `source` identificam a evidência histórica.

## Decisões de apresentação confirmadas

Os cabeçalhos repetidos da autora não serão reconstruídos por bloco. A atribuição da obra/autora será tratada editorialmente em outro momento. Controles funcionais, como `Edit profile`, retorno, menus e ícones sem significado narrativo, serão omitidos. Verificação e privacidade permanecem representáveis por serem semanticamente relevantes.

Fidelidade textual e critérios de imagem seguem o [guia de adaptação](adaptation-guide.md). O destino estático segue as [regras para AO3](ao3-rules.md).
