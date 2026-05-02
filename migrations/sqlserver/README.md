# SQL Server migrations

Empty placeholder. To adopt sqlserver:

1. Install sqlserver locally (Docker is the only practical option on Apple
   Silicon: `mcr.microsoft.com/azure-sql-edge` or `mcr.microsoft.com/mssql/server`).
2. Add SQLSERVER_HOST/PORT/NAME/USER/PASSWORD keys to `apps/service-admin/.env`.
3. Bootstrap a baseline by translating the postgres baseline:
   - `sqlcmd -Q "CREATE DATABASE <main_db>"`  (also `atlas_dev`)
   - Hand-translate `migrations/postgres/<TS>_baseline.sql` to T-SQL syntax
     (TEXT→NVARCHAR(MAX), BOOLEAN→BIT, BIGINT→BIGINT, IDENTITY semantics, etc.)
   - Save as `migrations/sqlserver/<TS>_baseline.sql`.
4. `DIALECT=sqlserver pnpm db:hash`
5. `DIALECT=sqlserver pnpm db:apply`

Implement the sqlserver branch in `scripts/db-diff.sh` (sqlpackage Extract/Publish or sqlcmd) before generating new migrations.
