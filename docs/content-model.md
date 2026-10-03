# Modelo de conteúdo

## Fonte de verdade e primeiro modelo do MVP

Os dados estruturados são a fonte de verdade da edição adaptada. Screenshots arquivados são a fonte histórica para transcrição e QA. Componentes React apresentam os dados sem embutir conteúdo específico da história em sua implementação.

O primeiro modelo está definido em `src/types/` e cobre somente os seis conceitos comprovados pelo material introdutório: `CharacterProps`, `SocialAccountProps`, `SquadProps`, `SquadParticipantProps`, `MediaAssetProps` e `IntroBlockProps`. Novos formatos só serão modelados quando houver evidência e necessidade. Ainda não há transcrição de dados reais, cadastro de mídia ou resolvedor de assets.

## INTRO, UPDATE e CHAPTER

- **INTRO:** front matter / apresentação inicial da obra. Não é capítulo numerado nem atualização narrativa. Seu arquivo futuro será `src/data/intro/intro.ts`.
- **UPDATE:** atualização histórica originalmente publicada pela autora. Os arquivos futuros começam em `src/data/updates/001.ts`, depois `002.ts` e assim por diante.
- **CHAPTER:** representação/publicação de uma UPDATE no AO3, preservando os limites indicados pela autora.

A introdução não recebe número: não usar `intro-00.ts`, `chapter-00`, `update-00` ou equivalente. Pastas de screenshots em blocos de 100 não definem capítulos.

A ordem autoral confirmada da INTRO é 001 → 011: sinopse; abertura de Lorena; perfil público; perfil privado; squad; wallpaper; abertura de Eduarda; perfil público; perfil privado; squad; wallpaper.

## Organização dos dados

```text
src/data/
  characters/   → identidades principais
  accounts/     → contas sociais separadas das personagens
  squads/       → apresentações de grupos
  media/        → registro de assets
  intro/        → apresentação inicial sem numeração
  updates/      → atualizações narrativas numeradas a partir de 001
```

Arquivos como `lorena.ts`, `eduarda.ts`, `lorena-public.ts`, `lorena-private.ts`, `eduarda-public.ts`, `eduarda-private.ts`, `lorena-squad.ts` e `eduarda-squad.ts` serão preenchidos em tarefa posterior. Não criar arquivos vazios apenas para reproduzir essa estrutura futura.

## IDs e referências

Use IDs estáveis em string, nunca derivados de índices de arrays. Contas e squads apontam à personagem por `characterId`. Referências a mídia guardam IDs de `MediaAssetProps`, sem copiar caminhos ou URLs nas entidades consumidoras.

Essas referências são strings no primeiro modelo. TypeScript verifica a forma dos objetos, mas não comprova a existência dos IDs referenciados, a relatividade dos caminhos ou a correspondência entre arquivos históricos. Essas relações devem ser conferidas na futura autoria/QA; não há validação externa nesta etapa.

## Tipos do MVP

Os arquivos seguem `src/types/<dominio>/props.ts` e exportam nomes explícitos terminados em `Props`, nunca apenas `Props`. Contêm somente imports necessários, interfaces, type aliases e union types, sem comentários ou JSDoc. Dependências usam o caminho da pasta do domínio, como `../squad-participant/props`.

| Tipo e arquivo em `src/types/` | Campos e responsabilidade |
| --- | --- |
| `CharacterProps` — `character/props.ts` | `id`, `name`, `source`. Identidade principal sem duplicar dados das contas. |
| `SocialAccountProps` — `social-account/props.ts` | `id`, `characterId`, `kind`, `displayName`, `username`, `bio`, `verified`, `following`, `followers`, `avatarMediaId`, `bannerMediaId`, `source`; opcionais `location` e `websiteLabel`. |
| `SquadProps` — `squad/props.ts` | `id`, `name`, `characterId`, `participants`, `source`; `backgroundMediaId` opcional. Apresentação de grupo, sem associação a WhatsApp. |
| `SquadParticipantProps` — `squad-participant/props.ts` | `id` local, `text`, `direction`; opcionais `label` e `avatarMediaId`. Existe dentro do squad, sem cadastro global independente. |
| `MediaAssetProps` — `media-asset/props.ts` | `id`, `relativePath`, `alt`, `source`. Mídia referenciada por ID e substituível sem alterar seus consumidores. |
| `IntroBlockProps` — `intro-block/props.ts` | Union discriminada por `type`, com `id` e `source` em cada variante; organiza texto editorial e referências, sem duplicar entidades. |

### Personagens e contas

`kind` utiliza `'public' | 'private'`, sem enum. A condição privada/cadeado é derivada de `kind === 'private'`, sem campo booleano duplicado. `verified` é um boolean obrigatório que representa a presença ou ausência do selo de verificação no material.

`following` e `followers` são strings preservadas exatamente como exibidas, incluindo abreviações. `websiteLabel` é apenas o texto do perfil: não presumir protocolo, endereço real ou link funcional.

`avatarMediaId` e `bannerMediaId` guardam IDs de mídia. Capas tipográficas continuam sendo imagens; não reconstruir lettering complexo em HTML. Contas e squads se associam à personagem sem exigir listas duplicadas em `CharacterProps`.

### Squads e participantes

Squads são apresentações visuais específicas de grupo. Não são WhatsApp nem um modelo universal de chat.

Preserve somente o que estiver visível. Não complete nomes, sobrenomes, usernames, relações ou biografias. `label` guarda o rótulo de contato; `text` guarda o texto da apresentação/balão. Ambos são distintos. `label` e `avatarMediaId` podem faltar no balão enviado pela protagonista.

A ordem do array `participants` é a única fonte de verdade para a sequência editorial/visual. `direction` é obrigatório e usa `'incoming' | 'outgoing'`, sempre relativo à personagem de referência do squad; não inferir essa informação apenas pelo alinhamento. `backgroundMediaId` é uma referência opcional a mídia; não presume reutilização de um wallpaper apenas por semelhança.

### Mídia

A finalidade da mídia é determinada pelo contexto da referência: `avatarMediaId` indica avatar, `bannerMediaId` indica capa, `backgroundMediaId` indica fundo e o bloco `wallpaper` indica wallpaper. O registro não possui classificação de finalidade; o mesmo asset pode servir a múltiplos contextos quando a reutilização for confirmada. A montagem da sinopse é inicialmente um único asset.

`relativePath` é um caminho relativo interno de asset, como `characters/eduarda/wallpaper.webp`. Não é URL pública, caminho absoluto do computador ou endereço específico de hospedagem. Nunca armazenar URL pública hardcoded no conteúdo de domínio. A futura resolução transformará `relativePath` em caminho local/public para o preview e URL pública externa para a exportação AO3.

Uma mídia derivada de screenshot poderá ser substituída por um original fornecido pela autora mantendo seu ID e atualizando o registro do asset. Mudanças de hospedagem pertencem à futura resolução e não exigem reescrever a história. Reutilização de assets só ocorre quando confirmada.

### Blocos da INTRO

As variantes são exclusivamente:

- `synopsis`: `title`, `text` e `mediaId` da montagem única.
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
