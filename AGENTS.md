# Linha Tênue — Archive Edition

Projeto de preservação e adaptação para AO3 da AU **Linha Tênue**, de **Leth Medveguillen**, originalmente publicada no Twitter/X. Screenshots arquivados são a fonte histórica; dados estruturados são a fonte de verdade da edição adaptada.

## Antes de trabalhar

Leia e respeite os documentos pertinentes antes de implementar mudanças relevantes:

- [Arquitetura](docs/architecture.md): pipeline, responsabilidades e separação das camadas.
- [Regras para AO3](docs/ao3-rules.md): HTML estático, Work Skin e acessibilidade.
- [Modelo de conteúdo](docs/content-model.md): personagens, contas, blocos, fontes e assets.
- [Guia de adaptação](docs/adaptation-guide.md): fidelidade editorial e conversão dos screenshots.

Não altere decisões arquiteturais silenciosamente. Se uma tarefa exigir contrariar uma regra documentada, sinalize o conflito antes de executar a mudança.

## Regras operacionais

- Mantenha conteúdo, apresentação, preview, exportação e estilos separados. Componentes genéricos recebem dados; não contêm texto específico da história.
- Use React, TypeScript, Vite e SCSS no ambiente de autoria. O AO3 recebe HTML estático, CSS de Work Skin e imagens externas quando necessárias; nunca depende de React ou JavaScript no cliente.
- Preserve o texto da autora. Não corrija ortografia, pontuação ou conteúdo silenciosamente; revisão editorial é uma atividade deliberada e separada.
- Garanta suporte a referências `source` nos blocos e use identificadores ou caminhos internos para assets, resolvidos conforme o destino.
- Preserve as atualizações originais como capítulos, com limites indicados pela autora. Pastas de screenshots em blocos de 100 não definem capítulos.
- Prefira componentes pequenos, tipos explícitos, HTML semântico, acessibilidade e soluções simples. Evite abstrações prematuras, dependências desnecessárias e duplicação de conteúdo.
- Mantenha contratos compartilhados das informações persistentes em `src/constants/props.ts`, próximos dos dados, com nomes explícitos terminados em `Props`. Props específicas de componente ou template ficam junto de seu contexto; `IntroBlockProps` pertence a `src/templates/intro/props.ts`. Arquivos de tipos/props contêm somente imports e declarações de tipos, sem comentários ou JSDoc; regras de domínio ficam na documentação. `src/types` não é catálogo global de domínio e poderá ser recriado somente para declarações realmente globais, como `global.d.ts`, quando necessário.
- Use `src/constants/...` somente para dados persistentes e compartilháveis da AU, com exports nomeados e contratos verificados por tipagem explícita ou `satisfies`, sem export default ou comentários. Dados relacionados a uma personagem ficam agregados em um único `src/constants/characters/<personagem>/constants.ts`; constants podem conter objetos compostos e aninhados. Assets adaptados ficam em `public/assets/...`; `source/archive` é o arquivo histórico local não versionado.
- Use `src/templates/...` para composições editoriais concretas. Sinopse e sequência da INTRO ficam juntas em `src/templates/intro/constants.ts`. Cada atualização futura fica em `src/templates/updates/<numero>/`, preferencialmente com `index.tsx` e `constants.ts`; todo o conteúdo específico da atualização, incluindo mídia e ordem dos blocos, pertence ao seu `constants.ts`. Props e estilos locais só quando necessários. Não espalhe uma atualização por pastas globais de tweets, chats ou narrações. Não crie placeholders para rastrear diretórios vazios.
- Use imports relativos para arquivos próximos e `@/` para outras áreas do `src`; o alias é configurado no TypeScript e no Vite. Evite caminhos relativos longos atravessando áreas.
- Em TypeScript/TSX, use aspas simples, propriedades sem aspas quando forem identificadores válidos, ponto e vírgula, trailing commas em estruturas multilinha e indentação de 2 espaços. A configuração local está em `.prettierrc`.
- `src/components` contém peças reutilizáveis de interface, organizadas futuramente por Atomic Design em `atoms`, `molecules` e `organisms`. Componentes seguem preferencialmente uma pasta com `index.tsx`, `props.ts` e `styles.module.scss`, criando somente os arquivos necessários; `constants.ts` somente quando houver conteúdo/configuração local necessária. `MediaPreview` permanece em `src/preview`, exclusivo do desenvolvimento local, sem integrar conteúdo AO3 ou Work Skin.
- Preserve os 21 WebP atuais da INTRO. Os quatro assets originais da sinopse permanecem separados; sua composição visual será reconstruída futuramente por HTML/CSS no template da INTRO. Para substituições futuras por originais, prefira manter ID, `relativePath` e proveniência histórica em `source`.
- Implemente primeiro o necessário para **INTRO — Informações iniciais**, a apresentação inicial sem numeração, com Lorena Ferette e Eduarda Fragoso. Expanda modelos apenas quando novos formatos da AU exigirem.

## Etapa atual

Os contratos compartilhados do MVP estão em `src/constants/props.ts` e o contrato da INTRO em `src/templates/intro/props.ts`, conforme `docs/content-model.md`. `LorenaC` e `EduardaC` agregam os dados persistentes das protagonistas. `SynopsisC` e `IntroC` ficam em `src/templates/intro/constants.ts`, reunindo a sinopse e a sequência editorial. A implementação visual da INTRO e das atualizações permanece futura. Implemente somente o escopo autorizado em cada tarefa; modelos futuros e exemplos conceituais não autorizam transcrição, componentes ou exportação.
