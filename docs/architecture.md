# Arquitetura

## Contexto e objetivo

**Linha Tênue — Archive Edition** preserva e adapta para AO3 a AU **Linha Tênue**, de **Leth Medveguillen**, originalmente publicada no Twitter/X. A fonte histórica são screenshots arquivados da publicação original.

A edição deve preservar a história caso o conteúdo original desapareça e melhorar a leitura em celular, tablet e desktop. Conteúdos textuais serão reconstruídos como HTML semântico e responsivo, preservando o texto e a linguagem visual da AU. Imagens serão usadas para mídia visual e para as exceções descritas no [guia de adaptação](adaptation-guide.md).

## Stack e fluxo de dados

A stack planejada é React, TypeScript, Vite e SCSS. React serve como ferramenta de autoria, sistema de componentes, preview local, ambiente de QA e meio de gerar HTML estático. Ele não será executado no AO3.

```text
screenshots originais
  → transcrição/adaptação
  → dados estruturados
  → componentes React
  → preview local
  → exportador
  → HTML estático + CSS de Work Skin
  → AO3
```

Esse fluxo representa o processo de autoria e validação. O exportador deve consumir o conteúdo estruturado e sua apresentação publicável; controles e estado da interface de preview não são conteúdo da obra.

Os dados estruturados são a fonte de verdade da edição adaptada. Os screenshots permanecem como evidência histórica para conferência. Detalhes dos dados estão no [modelo de conteúdo](content-model.md).

## Separação das camadas

| Camada | Responsabilidade | Limite |
| --- | --- | --- |
| CONTENT | Dados da história, personagens, contas, blocos e referências às fontes. | Não depender da interface de desenvolvimento. |
| PRESENTATION | Componentes React que apresentam os dados. | Não embutir conteúdo específico da história em componentes genéricos. |
| PREVIEW | Interface local de autoria, inspeção e QA. | Ferramentas locais não integram o HTML exportado. |
| EXPORT | Geração do conteúdo estático destinado ao AO3. | Não exigir runtime React ou JavaScript no destino. |
| STYLES | Aparência do conteúdo publicado e da interface local. | Manter os estilos de Work Skin separados dos estilos de preview. |

Um componente genérico de tweet deve receber os dados do tweet. A definição reutilizável do personagem e da conta fornece nome, username e avatar; cada atualização referencia esses dados em vez de repeti-los.

## Estrutura e responsabilidades

```text
docs/
src/
  components/
    character/
    twitter/
    whatsapp/
    story/
    news/
  data/
    characters/
    accounts/
    squads/
    media/
    intro/
    updates/
  preview/
  styles/
  types/
scripts/
```

| Diretório | Responsabilidade |
| --- | --- |
| `docs/` | Decisões e regras do projeto. |
| `src/components/character/` | Apresentação das informações dos personagens. |
| `src/components/twitter/` | Tweets, quote tweets, replies, threads, perfis e demais representações do Twitter/X. |
| `src/components/whatsapp/` | Chats e mensagens. |
| `src/components/story/` | Narração, divisores, mídia e elementos narrativos gerais. |
| `src/components/news/` | Portais de notícias, fofoca e interfaces editoriais da AU. |
| `src/data/characters/` | Identidades reutilizáveis dos personagens. |
| `src/data/accounts/` | Contas públicas e privadas associadas por ID. |
| `src/data/squads/` | Apresentações de grupos e participantes locais. |
| `src/data/media/` | Registro de assets internos. |
| `src/data/intro/` | INTRO: front matter / apresentação inicial sem numeração. |
| `src/data/updates/` | Conteúdo estruturado de cada atualização original. |
| `src/preview/` | Interface exclusiva do ambiente local de desenvolvimento. |
| `src/styles/` | Estilos destinados ao AO3 e estilos exclusivos do preview, separados entre si. |
| `src/types/` | Modelos TypeScript do domínio, definidos conforme os formatos forem conhecidos. |
| `scripts/` | Exportadores, validadores e ferramentas do projeto. |

Os tipos seguem a convenção `src/types/<dominio>/props.ts`, com exports explícitos: `CharacterProps`, `SocialAccountProps`, `SquadProps`, `SquadParticipantProps`, `MediaAssetProps` e `IntroBlockProps`. Dependências usam o caminho da pasta correspondente, como `../squad-participant/props`. Não exportar um tipo genérico chamado apenas `Props`. Os arquivos contêm somente imports necessários e declarações de tipos, sem comentários ou JSDoc; explicações permanecem nos documentos do projeto.

## Preview e exportação

Preview e exportação devem apresentar o mesmo conteúdo estruturado. O preview poderá mostrar ferramentas de inspeção e referências `source` para localizar screenshots. Esses recursos locais não precisam aparecer no AO3.

A separação conceitual dos estilos será:

```text
src/styles/workskin.scss  → somente estilos do conteúdo publicado
src/styles/preview.scss   → somente interface e ferramentas locais
```

Esses nomes descrevem arquivos futuros. O SCSS da Work Skin deverá gerar CSS para o destino. A publicação recebe somente HTML estático, CSS da Work Skin e imagens hospedadas externamente quando necessárias. Os critérios de saída estão nas [regras para AO3](ao3-rules.md).

Uma futura camada de resolução de assets deverá transformar identificadores ou caminhos internos em arquivos locais no preview e URLs externas públicas na exportação. Mudar a hospedagem não deve exigir reescrever os dados narrativos.

## MVP e evolução

O primeiro MVP é **INTRO — Informações iniciais**, uma apresentação inicial sem numeração, baseado no material introdutório da AU, com **Lorena Ferette** e **Eduarda Fragoso** como personagens iniciais.

Ele deve validar dados de personagens, contas públicas e privadas, apresentação de squads, imagens e wallpapers. Também deve comprovar layout responsivo, separação entre conteúdo e apresentação, preview local, Work Skin, exportação HTML e publicação no AO3. Esse pipeline deve ser provado antes da adaptação das atualizações narrativas.

Prefira soluções simples, componentes pequenos, tipos explícitos, reutilização, HTML semântico, acessibilidade e manutenção futura. Evite abstrações prematuras, bibliotecas desnecessárias, dependências visuais externas, duplicação e acoplamento entre dados e interface. Não considere suficiente uma solução que funcione apenas no preview React.

Implemente primeiro o necessário para o MVP. Novos modelos e componentes surgirão conforme formatos reais da história exigirem; o primeiro modelo do MVP está em `src/types/`; formatos futuros e a implementação do exportador não são antecipados.
