# Modelo de conteúdo

## Fonte de verdade e escopo

Os dados estruturados são a fonte de verdade da edição adaptada. Screenshots arquivados são a fonte histórica usada na transcrição e na conferência; componentes React apresentam os dados sem armazenar o texto específico da história em sua implementação.

Este documento define conceitos e relações. Não fecha antecipadamente interfaces TypeScript, campos obrigatórios de todos os formatos ou uma lista exaustiva de tipos. Os modelos explícitos em `src/types/` devem evoluir conforme o MVP e os formatos reais da AU forem conhecidos.

## Personagens, contas e squads

`src/data/characters/` concentra dados reutilizáveis dos personagens e de suas contas. Uma personagem pode ter contas públicas e privadas; a atualização deve identificar tanto a personagem quanto a conta utilizada, evitando confundir suas identidades de apresentação.

Nome, username, avatar e demais informações reutilizáveis da conta devem ser definidos em um lugar e referenciados nas atualizações. Conceitualmente, podem existir arquivos como `lorena.ts` e `eduarda.ts`; a organização final será definida na implementação.

Squads devem permitir representar os agrupamentos apresentados no material introdutório e suas relações com os personagens. Não invente integrantes, contas, usernames ou metadados que ainda não tenham sido obtidos da fonte.

## Atualizações e capítulos

`src/data/updates/` guarda o conteúdo estruturado de cada atualização originalmente publicada pela autora no Twitter/X, mantendo a ordem narrativa de seus blocos.

Cada capítulo narrativo do AO3 corresponderá a uma atualização original. A autora indicará onde cada uma começa e termina; essa divisão deve ser preservada. Pastas de screenshots numeradas em blocos de 100 são organização do arquivo histórico e **não representam capítulos**.

Pode existir um capítulo inicial separado para introdução, personagens e contexto. O MVP **“00 — Informações iniciais”** ocupa esse papel e parte do material introdutório, inicialmente com Lorena Ferette e Eduarda Fragoso.

## Blocos de conteúdo

Um bloco representa uma unidade de conteúdo adaptado dentro de uma atualização. Ele deve permitir identificar o formato, guardar o conteúdo necessário à apresentação e referenciar sua fonte histórica.

Os formatos conhecidos incluem narração, tweets, replies, quote tweets, threads, perfis, chats, mensagens, mídia, divisores e interfaces de notícias ou fofoca. Esses conceitos não determinam ainda quais serão tipos independentes, blocos agrupados ou relações entre blocos.

Preserve a sequência e as relações relevantes, como uma resposta ao tweet correspondente ou uma citação ao conteúdo citado. A representação deve funcionar tanto no preview quanto na exportação estática, sem depender de estado da interface local.

## Rastreabilidade com `source`

Todo bloco adaptado deve poder guardar referências aos screenshots originais. Um bloco pode ser sustentado por mais de um screenshot. Exemplo conceitual, sem definir um contrato TypeScript completo:

```json
{
  "type": "tweet",
  "source": ["004.1.JPG", "004.2.JPG"]
}
```

`source` serve para QA, permite localizar rapidamente a fonte histórica e pode aparecer no preview/editor. Não precisa aparecer no AO3. Mantenha referências que permitam localizar a imagem no arquivo, distinguindo arquivos de mesmo nome se isso ocorrer.

Uma referência histórica não implica publicar o screenshot. A decisão sobre o que será imagem na edição está no [guia de adaptação](adaptation-guide.md).

## Assets e resolução por destino

Assets são recursos usados na apresentação, como avatares, fotos, ilustrações e wallpapers. Quando possível, os dados devem guardar identificadores ou caminhos internos, evitando repetir URLs externas completas em cada atualização.

A futura camada de resolução deve fornecer:

| Destino | Resultado da resolução |
| --- | --- |
| Preview local | Arquivo local. |
| Exportação para AO3 | URL externa pública. |

Assim, uma mudança de hospedagem poderá ser feita no mapeamento dos assets sem reescrever o conteúdo da história. Referências `source` apontam à evidência histórica; referências de assets apontam à mídia usada na apresentação. Não confunda essas funções.

Reutilize referências à mesma mídia para evitar duplicação desnecessária. A implementação do registro de assets, do resolvedor e de seus tipos permanece futura.

## Evolução orientada pelo MVP

Comece pelos dados necessários a personagens, contas públicas e privadas, squads, imagens e wallpapers do capítulo introdutório. Expanda o modelo apenas conforme surgirem novos formatos na AU.

Prefira relações claras, tipos explícitos e dados independentes da apresentação. Evite esquemas universais prematuros, cópias de informações reutilizáveis e campos destinados apenas a controles do preview. Decisões sobre transcrição e revisão do texto seguem o [guia de adaptação](adaptation-guide.md).
