#!/bin/bash

echo "🚀 Iniciando Deploy..."

# 1. Atualizar Código
echo "📥 Baixando atualizações..."
git pull

# 2. Derrubar containers antigos
echo "🛑 Parando containers..."
docker-compose down

# 3. Forçar remoção de containers conflitantes (Garbage Collection)
echo "🧹 Limpando containers antigos..."
docker rm -f travel-backend travel-frontend 2>/dev/null

# 4. Subir nova versão
echo "🏗️ Construindo e subindo..."
docker-compose up -d --build

echo "✅ Deploy concluído!"
