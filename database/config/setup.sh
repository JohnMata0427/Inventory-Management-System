#!/bin/bash

set -e

echo "[slave] Esperando a master_db..."
until pg_isready -h master_db -U master_user; do
  sleep 2
done

echo "[slave] Limpiando carpeta de datos..."
rm -rf /var/lib/postgresql/data/*

echo "[slave] Clonando datos desde el master..."
PGPASSWORD=master_password pg_basebackup -h master_db -D /var/lib/postgresql/data -U master_user -Fp -Xs -P -R

echo "[slave] Configurando conexión al master..."
echo "primary_conninfo = 'host=master_db port=5432 user=master_user password=master_password'" >> /var/lib/postgresql/data/postgresql.conf

echo "[slave] Arrancando PostgreSQL como esclavo..."
chown -R postgres:postgres /var/lib/postgresql/data
exec docker-entrypoint.sh postgres
