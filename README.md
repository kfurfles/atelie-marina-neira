# Marina Cerâmicas

Site de venda e portfolio da ceramista Marina. Roda 100% em localhost via Docker Compose.

## Estrutura

```
site-ceramicas/
├── web/              Next.js 15 (App Router) - o site público
├── cms/              Strapi 5 + SQLite - painel para a Marina cadastrar peças
├── docker-compose.yml
├── start.sh          Sobe tudo com um comando
├── README.md         (este arquivo, para devs)
└── README-marina.md  (guia da Marina para cadastrar peças)
```

## Como subir

1. Instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/) e abra.
2. Na raiz do projeto:

   ```bash
   ./start.sh
   ```

3. Aguarde alguns minutos na primeira execução (Docker vai construir as imagens e instalar dependências).

Endereços:

- Site público: <http://localhost:3000>
- Admin do Strapi: <http://localhost:1337/admin>

Na primeira vez o Strapi vai pedir para criar o usuário administrador. Depois disso, siga o `README-marina.md` para cadastrar peças, categorias e textos.

## Parar

`Ctrl + C` no terminal onde o `start.sh` está rodando, ou `docker compose down` em outro terminal.

## Reset total (apagar banco e recomeçar)

```bash
docker compose down -v
rm -rf cms/database/*.db cms/.tmp cms/build
```

## Stack

- Next.js 15 (App Router) + Tailwind CSS
- Strapi 5 (headless CMS) + SQLite (arquivo local)
- Docker Compose orquestrando os dois

## Notas para dev

- Cada app (`web/`, `cms/`) é um projeto npm independente - sem monorepo tools.
- Placeholders de imagem usam `picsum.photos` quando o produto não tem foto no Strapi.
- Carrinho vive em `localStorage`. Não existe checkout - venda termina em `wa.me` com mensagem detalhada.
# atelie-marina-neira
