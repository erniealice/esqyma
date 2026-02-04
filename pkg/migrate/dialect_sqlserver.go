package migrate

import "fmt"

func init() {
	RegisterDialect(&SQLServerDialect{})
}

// SQLServerDialect implements Dialect for SQL Server
type SQLServerDialect struct{}

func (d *SQLServerDialect) Name() string { return "sqlserver" }

func (d *SQLServerDialect) QuoteIdentifier(name string) string {
	return fmt.Sprintf("[%s]", name)
}

func (d *SQLServerDialect) CreateMigrationsTableSQL() string {
	return `
		IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'schema_migrations')
		BEGIN
			CREATE TABLE [schema_migrations] (
				[id] INT IDENTITY(1,1) PRIMARY KEY,
				[version] BIGINT NOT NULL UNIQUE,
				[name] NVARCHAR(255) NOT NULL,
				[batch] INT NOT NULL,
				[executed_at] DATETIME2 DEFAULT GETUTCDATE()
			);
			CREATE INDEX [idx_schema_migrations_batch] ON [schema_migrations] ([batch]);
		END
	`
}

func (d *SQLServerDialect) InsertMigrationSQL() string {
	return "INSERT INTO [schema_migrations] ([version], [name], [batch]) VALUES (@p1, @p2, @p3)"
}

func (d *SQLServerDialect) DeleteMigrationSQL() string {
	return "DELETE FROM [schema_migrations] WHERE [version] = @p1"
}

func (d *SQLServerDialect) GetAppliedMigrationsSQL() string {
	return "SELECT [id], [version], [name], [batch], [executed_at] FROM [schema_migrations] ORDER BY [version] ASC"
}

func (d *SQLServerDialect) GetLastBatchSQL() string {
	return "SELECT ISNULL(MAX([batch]), 0) FROM [schema_migrations]"
}

func (d *SQLServerDialect) GetMigrationsByBatchSQL() string {
	return "SELECT [id], [version], [name], [batch], [executed_at] FROM [schema_migrations] WHERE [batch] = @p1 ORDER BY [version] DESC"
}

func (d *SQLServerDialect) DriverName() string { return "sqlserver" }
