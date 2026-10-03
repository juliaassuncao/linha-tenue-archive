# Guia de adaptação

## Finalidade e fidelidade

A edição AO3 de **Linha Tênue**, de **Leth Medveguillen**, parte de screenshots arquivados da publicação original no Twitter/X. O objetivo é preservar a história, o conteúdo e sua linguagem visual, reconstruindo o texto em uma forma legível e responsiva.

Preserve fielmente o texto da autora. Não corrija ortografia, pontuação ou conteúdo silenciosamente. A adaptação técnica muda a forma de apresentação; qualquer revisão editorial deve ser deliberada, identificada e tratada separadamente.

Se um trecho estiver ilegível ou ambíguo, não complete por suposição. Registre a dúvida com referência à fonte para conferência antes de tratar a transcrição como definitiva.

## O que reconstruir e o que preservar como imagem

| Conteúdo original | Tratamento na edição adaptada |
| --- | --- |
| Narração corrida | Texto HTML real, mantendo texto e sequência. |
| Tweets textuais | Reconstrução com HTML/CSS. |
| Replies | Reconstrução com HTML/CSS, preservando a relação de resposta. |
| Quote tweets | Reconstrução com HTML/CSS, preservando o conteúdo citado e sua relação com o tweet. |
| WhatsApp, chats e mensagens | Reconstrução com HTML/CSS, mantendo remetentes, sequência e contexto. |
| Perfis relevantes | Podem ser reconstruídos com HTML/CSS. |
| Portais de notícias ou fofoca | Podem ser reconstruídos quando isso melhorar a leitura. |
| Fotos, ilustrações, wallpapers e mídia visual real | Permanecem imagens. |
| Screenshots completos | Permanecem imagens somente quando a composição visual for inseparável do conteúdo. |

Um screenshot que mistura interface textual e mídia pode dar origem a texto reconstruído e à mídia correspondente. Evite publicar desnecessariamente tanto o screenshot completo quanto a mesma mídia extraída. Preservar o screenshot como fonte histórica não exige usá-lo como imagem na obra.

Ao escolher a exceção de manter um screenshot completo, registre o motivo para permitir conferência. Priorize responsividade e legibilidade sem apagar elementos visuais necessários à compreensão.

## Processo de adaptação e conferência

1. Localize os screenshots e identifique a sequência original do material.
2. Confirme os limites da atualização indicados pela autora; não use as pastas numeradas em blocos de 100 como divisão de capítulos.
3. Transcreva o texto fielmente e separe unidades de conteúdo conforme o formato presente na fonte.
4. Referencie personagens e contas reutilizáveis, distinguindo a conta pública ou privada utilizada.
5. Registre as referências `source` dos blocos e identifique a mídia que permanecerá como asset.
6. Estruture o conteúdo na ordem original, preservando relações de resposta, citação e conversa.
7. Compare os dados e sua apresentação com os screenshots, conferindo texto, atribuição, sequência, mídia e contexto.
8. Valide legibilidade no preview e na exportação, incluindo leitura sem Work Skin e sem JavaScript, conforme as [regras para AO3](ao3-rules.md).

Esse processo orienta as etapas futuras de implementação e adaptação. Não pressupõe que o preview ou o exportador já existam.

## Rastreabilidade e mídia

Cada bloco deve poder guardar sua origem em `source`, incluindo múltiplos screenshots quando necessário. Essa informação serve ao QA e à localização da fonte, pode aparecer no preview/editor e não precisa ser exibida no AO3.

Use identificadores ou caminhos internos para assets quando possível. A resolução futura fornecerá arquivos locais ao preview e URLs públicas ao exportador. O [modelo de conteúdo](content-model.md) detalha a diferença entre fonte histórica e mídia da apresentação.

## Preservação da divisão original

Cada capítulo narrativo no AO3 corresponde a uma atualização originalmente publicada pela autora, com início e fim indicados por ela. Preserve essa divisão e a ordem interna do conteúdo.

A INTRO reúne informações introdutórias, personagens e contexto como front matter / apresentação inicial, sem número e sem ser capítulo narrativo. O primeiro MVP será **INTRO — Informações iniciais**, baseado no material introdutório, com Lorena Ferette e Eduarda Fragoso. Sua ordem autoral confirmada é 001 → 011. Ele deve provar o pipeline descrito na [arquitetura](architecture.md) antes da adaptação das atualizações narrativas.
