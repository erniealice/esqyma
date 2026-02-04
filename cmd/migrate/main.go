package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/erniealice/esqyma/pkg/migrate"

	// Database drivers
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib"
	_ "github.com/microsoft/go-mssqldb"
)

var (
	dialect       = flag.String("dialect", "", "Database dialect: postgres, mysql, sqlserver")
	databaseURL   = flag.String("database-url", "", "Database connection string")
	migrationsDir = flag.String("migrations-dir", "migrations", "Migrations directory")
)

func main() {
	flag.Parse()

	args := flag.Args()
	if len(args) == 0 {
		printUsage()
		os.Exit(1)
	}

	command := args[0]

	switch command {
	case "make":
		if len(args) < 2 {
			fmt.Fprintln(os.Stderr, "Error: migration name required")
			fmt.Fprintln(os.Stderr, "Usage: migrate make <name>")
			os.Exit(1)
		}
		runMake(args[1])

	case "up":
		runUp()

	case "down":
		runDown()

	case "status":
		runStatus()

	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n", command)
		printUsage()
		os.Exit(1)
	}
}

func printUsage() {
	fmt.Println("Usage: migrate [flags] <command> [args]")
	fmt.Println()
	fmt.Println("Commands:")
	fmt.Println("  make <name>  Create new migration files for all dialects")
	fmt.Println("  up           Run all pending migrations")
	fmt.Println("  down         Rollback the last batch of migrations")
	fmt.Println("  status       Show migration status")
	fmt.Println()
	fmt.Println("Flags:")
	flag.PrintDefaults()
	fmt.Println()
	fmt.Println("Environment variables:")
	fmt.Println("  MIGRATE_DIALECT    Database dialect (default: postgres)")
	fmt.Println("  DATABASE_URL       Database connection string")
	fmt.Println("  MIGRATIONS_DIR     Migrations directory (default: migrations)")
}

func getConfig() *migrate.Config {
	config := migrate.DefaultConfig()

	// Override with flags if provided
	if *dialect != "" {
		config.Dialect = *dialect
	}
	if *databaseURL != "" {
		config.DatabaseURL = *databaseURL
	}
	if *migrationsDir != "" {
		config.MigrationsDir = *migrationsDir
	}

	return config
}

func runMake(name string) {
	// Sanitize name: replace spaces with underscores, lowercase
	name = strings.ToLower(strings.ReplaceAll(name, " ", "_"))

	dialects := []string{"postgres", "mysql", "sqlserver"}

	dir := *migrationsDir
	if dir == "" {
		dir = "migrations"
	}

	if err := migrate.MakeMigration(name, dir, dialects); err != nil {
		fmt.Fprintf(os.Stderr, "Error creating migration: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("\nMigration files created successfully!")
	fmt.Println("Edit the .up.sql and .down.sql files for each dialect.")
}

func runUp() {
	config := getConfig()

	if config.DatabaseURL == "" {
		fmt.Fprintln(os.Stderr, "Error: database URL required")
		fmt.Fprintln(os.Stderr, "Set DATABASE_URL environment variable or use -database-url flag")
		os.Exit(1)
	}

	m, err := migrate.NewMigrator(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
	defer m.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
	defer cancel()

	if err := m.Up(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "Error running migrations: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("\nMigrations completed successfully!")
}

func runDown() {
	config := getConfig()

	if config.DatabaseURL == "" {
		fmt.Fprintln(os.Stderr, "Error: database URL required")
		fmt.Fprintln(os.Stderr, "Set DATABASE_URL environment variable or use -database-url flag")
		os.Exit(1)
	}

	m, err := migrate.NewMigrator(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
	defer m.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
	defer cancel()

	if err := m.Down(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "Error rolling back migrations: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("\nRollback completed successfully!")
}

func runStatus() {
	config := getConfig()

	if config.DatabaseURL == "" {
		fmt.Fprintln(os.Stderr, "Error: database URL required")
		fmt.Fprintln(os.Stderr, "Set DATABASE_URL environment variable or use -database-url flag")
		os.Exit(1)
	}

	m, err := migrate.NewMigrator(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
	defer m.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	statuses, err := m.Status(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error getting migration status: %v\n", err)
		os.Exit(1)
	}

	if len(statuses) == 0 {
		fmt.Println("No migrations found")
		return
	}

	fmt.Printf("%-20s %-40s %-10s %-8s %s\n", "VERSION", "NAME", "STATUS", "BATCH", "RAN AT")
	fmt.Println(strings.Repeat("-", 100))

	for _, s := range statuses {
		status := "Pending"
		batch := ""
		ranAt := ""

		if s.Applied {
			status = "Applied"
			batch = fmt.Sprintf("%d", *s.Batch)
			ranAt = s.AppliedAt.Format("2006-01-02 15:04:05")
		}

		fmt.Printf("%-20d %-40s %-10s %-8s %s\n",
			s.Migration.Version,
			s.Migration.Name,
			status,
			batch,
			ranAt)
	}
}
