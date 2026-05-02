# MySQL migrations

Empty placeholder. To adopt mysql:

1. Install mysql server (`brew install mysql && brew services start mysql`).
2. Add MYSQL_HOST/PORT/NAME/USER/PASSWORD keys to `apps/service-admin/.env`.
3. Bootstrap a baseline by translating the postgres baseline:
   - `mysqladmin create <main_db>`  (also `atlas_dev`, `atlas_target_<pid>` is auto-managed)
   - Hand-translate `migrations/postgres/<TS>_baseline.sql` to mysql syntax
     (TEXT→TEXT, BOOLEAN→BOOLEAN, BIGINT→BIGINT, ON DELETE RESTRICT, etc.)
   - Save as `migrations/mysql/<TS>_baseline.sql`.
4. `DIALECT=mysql pnpm db:hash`
5. `DIALECT=mysql pnpm db:apply`  (stamps the baseline as already-applied if the live DB has matching tables)

Implement the mysql branch in `scripts/db-diff.sh` (mysqldump | mysql piping) before generating new migrations via `pnpm db:diff:mysql`.
