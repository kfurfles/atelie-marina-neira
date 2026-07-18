# Guia da Marina - como usar o painel

Este site tem duas partes:

- O **site público** (o que os clientes veem) - <http://localhost:3000>
- O **painel** (onde você cadastra peças e textos) - <http://localhost:1337/admin>

Você só precisa se preocupar com o painel.

## Primeiro acesso

1. Rode `./start.sh` na pasta do projeto (ou peça pra alguém abrir pra você).
2. Abra <http://localhost:1337/admin>.
3. Na primeira vez, ele pede pra criar seu usuário administrador (nome, email, senha). Guarde essa senha.
4. Depois disso, use o mesmo email e senha para entrar sempre.

## O que existe no painel

No menu lateral você verá:

- **Produtos** - suas peças (uma por peça).
- **Categorias** - os tipos (Chicrinhas, Incensários, Cinzeiros, etc).
- **Sobre** - a página "Sobre Marina" do site (foto e linha do tempo).
- **Config Site** - textos globais, número do WhatsApp, link do Instagram, frase filosofia.

## Antes de começar - cadastre nesta ordem

### 1. Config Site

Ir em **Content Manager → Single Types → Config Site**.

Preencha:

- **whatsapp_numero**: seu número no formato internacional, ex: `5511999999999` (sem `+`, sem espaços)
- **instagram_url**: link completo, ex: `https://instagram.com/marina.ceramicas`
- **frase_filosofia**: a frase que aparece por cima da foto no topo da home
- **hero_titulo** e **hero_subtitulo**: opcional, textos do topo
- **texto_selo_autografo**: explicação sobre o autógrafo discreto em cada peça
- **texto_cuidados_geral**: instruções gerais de cuidado com cerâmica (fallback quando a peça não tiver instrução própria)

Clique em **Save** e depois em **Publish**.

### 2. Sobre

Ir em **Content Manager → Single Types → Sobre**.

- **foto_marina**: envie uma foto sua (mãos na argila é o ideal)
- **timeline**: adicione entradas com `ano`, `titulo`, `descricao` - ex: `2018 / Faculdade / Começei o curso de artes...`

**Save → Publish**.

### 3. Categorias

Ir em **Content Manager → Collection Types → Categoria → Create new entry**.

Para cada tipo de peça (Chicrinhas, Incensários, etc):

- **nome**: nome da categoria
- **slug**: gerado automático - deixe assim
- **foto_capa**: imagem representando a categoria (foto de uma peça exemplo)
- **ordem**: número (0 primeiro, 10, 20...) que define a ordem no site
- **campos_customizacao**: aqui você adiciona campos extras que peças **desse tipo** aceitam. Ex: Incensário pode ter `Furos (número)` e `Aroma (texto)`. Chicrinha pode ter `Volume ml (número)`.

**Save → Publish**.

### 4. Produtos (peças)

Ir em **Content Manager → Collection Types → Produto → Create new entry**.

- **nome**: nome da peça (ex: "Cinzeiro Lua")
- **slug**: automático
- **categoria**: escolha a categoria da lista
- **descricao**: texto sobre a peça
- **frase_poetica**: uma frase curta, poética, sobre a peça (aparece na página)
- **preco**: valor inteiro em reais, sem centavos (ex: `180`)
- **fotos**: envie de 1 a 3 fotos
- **status**: `em_estoque`, `encomenda` ou `vendido`
- **prazo_encomenda_dias**: só preencha se status for `encomenda`
- **cuidados**: instruções específicas dessa peça (opcional - se vazio, usa o texto geral)
- **destaque**: marque como `true` para aparecer na home em "peças em destaque"

**Save → Publish**.

## Dicas

- Peça só aparece no site depois de **Publish**. Se você fizer Save mas não Publish, ela fica como rascunho.
- Para tirar uma peça do site sem apagar: **Unpublish**.
- Peça vendida: mude o status para `vendido`. Ela continua aparecendo, mas fica marcada como "Vendida" e o botão vira "Entrar em contato".
- Para trocar o número do WhatsApp: **Config Site** → edite `whatsapp_numero` → Save + Publish.

## Fluxo de venda

1. Cliente entra no site, escolhe peça, preenche personalização, clica "Comprar via WhatsApp" ou usa o carrinho.
2. Abre o WhatsApp com uma mensagem detalhada (peças, personalizações, links).
3. Você responde, combina detalhes, forma de pagamento, entrega - tudo por WhatsApp.

O site não processa pagamento. Ele só apresenta as peças e leva o cliente até você.
