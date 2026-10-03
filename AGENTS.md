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
- Organize tipos em `src/types/<dominio>/props.ts`, com nomes explícitos terminados em `Props`. Esses arquivos contêm somente imports e declarações de tipos, sem comentários ou JSDoc; regras de domínio ficam na documentação.
- Implemente primeiro o necessário para **INTRO — Informações iniciais**, a apresentação inicial sem numeração, com Lorena Ferette e Eduarda Fragoso. Expanda modelos apenas quando novos formatos da AU exigirem.

## Etapa atual

O primeiro modelo de domínio do MVP está em `src/types/`, conforme `docs/content-model.md`. Implemente somente o escopo autorizado em cada tarefa; modelos futuros e exemplos conceituais não autorizam transcrição, componentes ou exportação.
