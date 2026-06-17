# SQL: crear tablas

Archivo: `create_tables.sql` — contiene las sentencias `CREATE TABLE` para las tablas:

- `users`
- `exercises`
- `workouts`
- `workout_exercises`

Cómo usar (opciones):

1) Supabase SQL editor

- Abre Supabase → SQL Editor → New query.
- Copia y pega el contenido de `create_tables.sql` y ejecuta.

2) psql local / remoto

Configura variables de entorno `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` y ejecuta:

```bash
psql -f sql/create_tables.sql
```
