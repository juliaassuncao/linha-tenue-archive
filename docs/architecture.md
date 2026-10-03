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
| TEMPLATES | Composições editoriais concretas, com conteúdo local e futura implementação React. | Referenciar dados compartilhados e peças reutilizáveis; manter cada composição em seu próprio contexto. |
| PREVIEW | Interface local de autoria, inspeção e QA. | Ferramentas locais não integram o HTML exportado. |
| EXPORT | Geração do conteúdo estático destinado ao AO3. | Não exigir runtime React ou JavaScript no destino. |
| STYLES | Aparência do conteúdo publicado e da interface local. | Manter os estilos de Work Skin separados dos estilos de preview. |

Um componente genérico de tweet deve receber os dados do tweet. A definição reutilizável do personagem e da conta fornece nome, username e avatar; cada atualização referencia esses dados em vez de repeti-los.

## Estrutura e responsabilidades

```text
docs/
src/
  components/
    atoms/
    molecules/
    organisms/
  constants/
    props.ts
    characters/
      lorena/constants.ts
      eduarda/constants.ts
  templates/
    intro/
      constants.ts
      props.ts
    updates/
  preview/
  styles/
scripts/
```

| Diretório | Responsabilidade |
| --- | --- |
| `docs/` | Decisões e regras do projeto. |
| `src/components/` | Peças reutilizáveis de interface, organizadas futuramente por Atomic Design em `atoms`, `molecules` e `organisms`. |
| `src/constants/` | Somente dados persistentes e compartilháveis da AU, reutilizáveis fora de uma composição específica. |
| `src/constants/props.ts` | Contratos compartilhados das informações persistentes, próximos dos dados. |
| `src/constants/characters/lorena/constants.ts` | `LorenaC`: personagem, contas, squad com participantes e mídias de Lorena. |
| `src/constants/characters/eduarda/constants.ts` | `EduardaC`: personagem, contas, squad com participantes e mídias de Eduarda. |
| `src/templates/` | Composições editoriais concretas da INTRO e das atualizações. |
| `src/templates/intro/constants.ts` | `SynopsisC`: título, texto e quatro mídias originais separadas; `IntroC`: cabeçalho em `header` e sequência editorial sem numeração em `blocks`, referenciando os dados existentes. |
| `src/templates/intro/props.ts` | `IntroBlockProps`: contrato específico dos blocos da INTRO. |
| `src/templates/updates/` | Destino futuro das atualizações originais, cada uma em sua pasta numerada; não implementado nesta etapa. |
| `public/assets/` | Mídia adaptada/publicável, incluindo os arquivos físicos da INTRO. |
| `source/archive/` | Screenshots históricos locais não versionados; não são assets da interface. |
| `src/preview/` | Interface exclusiva do ambiente local de desenvolvimento. |
| `src/styles/` | Estilos destinados ao AO3 e estilos exclusivos do preview, separados entre si. |
| `scripts/` | Exportadores, validadores e ferramentas do projeto. |

Os contratos compartilhados ficam em `src/constants/props.ts`, com exports explícitos: `CharacterProps`, `SocialAccountProps`, `SquadProps`, `SquadParticipantProps`, `MediaAssetProps` e `CharacterContentProps`. `IntroBlockProps` pertence a `src/templates/intro/props.ts`. Props específicas de componente ou template permanecem junto de seu contexto. Não exportar um tipo genérico chamado apenas `Props`. Os arquivos de tipos/props contêm somente imports necessários e declarações de tipos, sem comentários ou JSDoc; explicações permanecem nos documentos do projeto. `src/types` não é catálogo global de domínio; poderá ser recriado para declarações realmente globais, como `global.d.ts`, quando houver necessidade.

A organização separa responsabilidades gerais no primeiro nível e mantém dados e contratos próximos de seu contexto. Cada protagonista possui um único `constants.ts`, com personagem, contas, squad, participantes e mídia agregados em um objeto composto e aninhado, verificado com `satisfies CharacterContentProps`. A sinopse e a sequência editorial ficam juntas no `constants.ts` do template da INTRO. As constantes têm exports nomeados e contratos verificados por tipagem explícita ou `satisfies`, sem export default ou comentários. As antigas pastas `src/data` e `src/assets`, vazias e sem uso, foram removidas; mídia física continua em `public/assets`.

Uma atualização futura segue preferencialmente `src/templates/updates/001/`, com `index.tsx` para a implementação React e `constants.ts` para todo o conteúdo específico daquela atualização: tweets, narração, conversas, mídia e ordem dos blocos. `props.ts` e `styles.module.scss` só quando houver necessidade real. Não espalhar uma atualização por pastas globais de tweets, chats ou narrações. A pasta de updates permanece vazia nesta etapa; a INTRO possui somente `constants.ts` e `props.ts`, sem implementação visual ou arquivos artificiais para rastrear diretórios vazios.

`relativePath` é relativo a `public/assets/`, sem o prefixo `/assets/`. `source` continua relativo a `source/` e aponta à proveniência histórica. Os assets físicos não substituem essa referência.

As quatro imagens originais da sinopse permanecem em assets separados, na ordem Lorena → contrato → fake kiss → Eduarda, exibidas em coluna única com links individuais. A decisão atual não reconstrói a montagem 2×2: o preview React do conteúdo segue fluxo normal, margens e dimensões simples, conforme as [restrições de CSS para AO3](ao3-rules.md), para permitir a futura tradução para Work Skin sem redesenhar o layout.

## Convenções de código e componentes

Componentes e arquivos `index.tsx` são responsáveis por composição e apresentação. Todo texto exibido ao leitor deve vir do `constants.ts` correspondente ao seu contexto, evitando strings editoriais hardcoded em JSX. Textos específicos da INTRO ficam em `src/templates/intro/constants.ts`; textos de uma atualização ficam em seu próprio `src/templates/updates/<numero>/constants.ts`, sem mover conteúdo local para constants globais. Labels de interface e títulos temporários de testes visuais também seguem essa convenção: os da Synopsis ficam em `src/templates/intro/synopsis/constants.ts`, inclusive para alternativas comentadas. Componentes reutilizáveis recebem o conteúdo por props.

Todo texto que represente prosa ou narração, incluindo a sinopse, deve usar `text-align: justify` na classe específica desse conteúdo. Não aplicar essa regra globalmente a todos os elementos `<p>`. Títulos, labels, bios, mensagens e textos de interface mantêm o alinhamento definido pelo componente e não seguem automaticamente a regra de justificação.

Em arquivos TypeScript/TSX, use aspas simples, ponto e vírgula ao final de statements, trailing commas em objetos, arrays e argumentos multilinha quando aplicável, e indentação de 2 espaços. Propriedades de objetos não levam aspas quando forem identificadores JavaScript válidos. `.prettierrc` registra o padrão local; não exige instalação de dependências nesta etapa. Aplicar formatação somente ao escopo da tarefa, preservando integralmente os textos transcritos.

Use imports relativos (`./` e `../`) para arquivos próximos e `@/` para outras áreas do `src`, evitando caminhos relativos longos. O alias `@/* → src/*` é configurado em `tsconfig.app.json` para TypeScript e em `vite.config.ts` para Vite.

Componentes React seguem preferencialmente:

```text
nome-do-componente/
  index.tsx
  props.ts
  styles.module.scss
```

`props.ts` exporta props com nome explícito, usa `import type` para tipos e não contém comentários ou JSDoc. Use `constants.ts` somente quando houver conteúdo/configuração local necessária, ou `constants.tsx` somente quando contiverem JSX. Não criar arquivos vazios para cumprir a estrutura; cada arquivo deve ser necessário.

## Preview e exportação

Preview e exportação devem apresentar o mesmo conteúdo estruturado. O preview poderá mostrar ferramentas de inspeção e referências `source` para localizar screenshots. Esses recursos locais não precisam aparecer no AO3.

`src/preview/components/media-preview/` contém a ferramenta temporária `MediaPreview`, com `index.tsx`, `props.ts` e `styles.module.scss`. Recebe `media: MediaAssetProps`, tenta carregar `/assets/${media.relativePath}` e, em caso de erro, mostra um placeholder evidente com ID, arquivo esperado em `public/assets/` e primeira fonte histórica disponível. A troca de ID ou caminho inicia uma nova tentativa de carregamento.

O componente usa estado React e `onError` exclusivamente no preview local. Não cria imagens, altera dados, troca caminhos nem substitui silenciosamente a mídia por outra. Seus controles e estilos não pertencem à Work Skin ou ao HTML exportável para AO3. O componente ainda não está integrado ao App.

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

Implemente primeiro o necessário para o MVP. Novos modelos e componentes surgirão conforme formatos reais da história exigirem; contratos compartilhados estão em `src/constants/props.ts` e o contrato da INTRO em `src/templates/intro/props.ts`; formatos futuros e a implementação do exportador não são antecipados.
