package migrate

import "fmt"

func init() {
	RegisterDialect(&PostgresDialect{})
}

// PostgresDialect implements Dialect for PostgreSQL
type PostgresDialect struct{}

func (d *PostgresDialect) Name() string { return "postgres" }

func (d *PostgresDialect) QuoteIdentifier(name string) string {
	return fmt.Sprintf(`"%s"`, name)
}

func (d *PostgresDialect) CreateMigrationsTableSQL() string {
	return `
		CREATE TABLE IF NOT EXISTS "schema_migrations" (
			"id" SERIAL PRIMARY KEY,
			"version" BIGINT NOT NULL UNIQUE,
			"name" TEXT NOT NULL,
			"batch" INTEGER NOT NULL,
			"executed_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		CREATE INDEX IF NOT EXISTS "idx_schema_migrations_batch"
			ON "schema_migrations" ("batch");
	`
}

func (d *PostgresDialect) InsertMigrationSQL() string {
	return `INSERT INTO "schema_migrations" ("version", "name", "batch") VALUES ($1, $2, $3)`
}

func (d *PostgresDialect) DeleteMigrationSQL() string {
	return `DELETE FROM "schema_migrations" WHERE "version" = $1`
}

func (d *PostgresDialect) GetAppliedMigrationsSQL() string {
	return `SELECT "id", "version", "name", "batch", "executed_at"
			FROM "schema_migrations" ORDER BY "version" ASC`
}

func (d *PostgresDialect) GetLastBatchSQL() string {
	return `SELECT COALESCE(MAX("batch"), 0) FROM "schema_migrations"`
}

func (d *PostgresDialect) GetMigrationsByBatchSQL() string {
	return `SELECT "id", "version", "name", "batch", "executed_at"
			FROM "schema_migrations" WHERE "batch" = $1 ORDER BY "version" DESC`
}

func (d *PostgresDialect) DriverName() string { return "pgx" }
