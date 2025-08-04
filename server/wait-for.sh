#!/bin/sh

until npx prisma migrate deploy; do
  echo "Esperando a que la base de datos esté disponible..."
  sleep 2
done

npm run start
