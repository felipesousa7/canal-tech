#!/bin/sh

echo "🚀 Iniciando processo de inicialização do backend..."

# Gerar cliente Prisma
echo "📦 Gerando cliente Prisma..."
npx prisma generate
echo "✅ Cliente Prisma gerado com sucesso!"

# Executar migrações
echo "🔄 Executando migrações..."
npx prisma migrate deploy
echo "✅ Migrações aplicadas com sucesso!"

# Executar seed apenas se não houver dados
echo "🌱 Verificando se precisa executar seed..."
if [ ! -f /tmp/seed_executed ]; then
    echo "🌱 Executando seed pela primeira vez..."
    npx ts-node prisma/seed.ts
    if [ $? -eq 0 ]; then
        echo "✅ Seed executado com sucesso!"
        touch /tmp/seed_executed
    else
        echo "⚠️ Erro ao executar seed, mas continuando..."
    fi
else
    echo "✅ Seed já foi executado anteriormente. Pulando..."
fi

# Iniciar aplicação
echo "🚀 Iniciando aplicação..."
npm start 