package esqyma

import "embed"

//go:embed migrations/postgres migrations/mysql migrations/sqlserver
var MigrationsFS embed.FS
