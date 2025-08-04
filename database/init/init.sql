CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'replicator_pass';
SELECT pg_reload_conf();