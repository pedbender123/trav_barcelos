# Travel Barcelos

Projeto de demonstração para agência de viagens.

## Visão Geral

Frontend em React (Vite) e Backend em Flask (Python).
O sistema é totalmente dockerizado e pronto para deploy.

## Portas de Configuração

- **Frontend**: 3000
- **Backend API**: 3001

*Nota: A porta 3001 foi liberada para evitar conflitos.*

## Como colocar em produção (Deploy)

Este projeto foi configurado para ser "Clone & Run".

### Pré-requisitos
- Docker e Docker Compose instalados.
- Porta 4001 e 4002 livres.

### Passos

1. Clone o repositório:
```bash
git clone <seu-repo-url>
cd trav_barcelos
```

2. Suba os containers:
```bash
docker-compose up -d --build
```

**Isso irá:**
- Construir o Frontend e o Backend.
- O Backend irá **automaticamente** criar e popular o banco de dados (`travel.db`) com dados de exemplo se ele não existir.
- O Nginx irá servir o frontend na porta 4001 e fazer proxy das requisições `/api` para o backend na porta 4002.

3. Acesse:
- http://localhost:3000 (ou IP da sua VPS:3000)

## Estrutura

- `/src`: Código do Frontend.
- `/backend`: Código Python/Flask.
- `docker-compose.yml`: Orquestração dos serviços.
- `nginx.conf`: Configuração do proxy reverso.

## Notas Importantes

- O banco de dados é recriado automaticamente se apagado (`seed.py` roda no início).
- O Frontend usa caminhos relativos na API (`/api/offers`), então funciona em qualquer domínio/IP.
