package migrate

import "fmt"

func init() {
	RegisterDialect(&MySQLDialect{})
}

// MySQLDialect implements Dialect for MySQL
type MySQLDialect struct{}

func (d *MySQLDialect) Name() string { return "mysql" }

func (d *MySQLDialect) QuoteIdentifier(name string) string {
	return fmt.Sprintf("`%s`", name)
}

func (d *MySQLDialect) CreateMigrationsTableSQL() string {
	return "CREATE TABLE IF NOT EXISTS `schema_migrations` (" +
		"`id` INT AUTO_INCREMENT PRIMARY KEY, " +
		"`version` BIGINT NOT NULL UNIQUE, " +
		"`name` VARCHAR(255) NOT NULL, " +
		"`batch` INT NOT NULL, " +
		"`executed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
		"INDEX `idx_schema_migrations_batch` (`batch`)" +
		");"
}

func (d *MySQLDialect) InsertMigrationSQL() string {
	return "INSERT INTO `schema_migrations` (`version`, `name`, `batch`) VALUES (?, ?, ?)"
}

func (d *MySQLDialect) DeleteMigrationSQL() string {
	return "DELETE FROM `schema_migrations` WHERE `version` = ?"
}

func (d *MySQLDialect) GetAppliedMigrationsSQL() string {
	return "SELECT `id`, `version`, `name`, `batch`, `executed_at` FROM `schema_migrations` ORDER BY `version` ASC"
}

func (d *MySQLDialect) GetLastBatchSQL() string {
	return "SELECT COALESCE(MAX(`batch`), 0) FROM `schema_migrations`"
}

func (d *MySQLDialect) GetMigrationsByBatchSQL() string {
	return "SELECT `id`, `version`, `name`, `batch`, `executed_at` FROM `schema_migrations` WHERE `batch` = ? ORDER BY `version` DESC"
}

func (d *MySQLDialect) DriverName() string { return "mysql" }
