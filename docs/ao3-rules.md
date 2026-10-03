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

## Work Skin e estilos locais

O CSS publicado deve conter somente estilos necessários ao conteúdo da obra. Mantenha separadas as duas finalidades descritas na [arquitetura](architecture.md):

- `workskin.scss`: origem conceitual dos estilos do conteúdo publicado, compilados em CSS para a Work Skin.
- `preview.scss`: estilos exclusivos das ferramentas e da interface local.

Não exporte SCSS como se fosse CSS pronto. Não deixe o HTML publicado depender dos estilos exclusivos do preview. Use CSS compatível com o destino AO3; os recursos concretos deverão ser verificados no destino quando forem implementados.

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

O MVP **“00 — Informações iniciais”** deve validar a exportação e a publicação no AO3 antes da adaptação das atualizações narrativas. Estes são requisitos do projeto; esta etapa documental não implementa nem comprova o pipeline.
