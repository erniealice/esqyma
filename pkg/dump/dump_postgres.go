package dump

import (
	"context"
	"fmt"
	"os"
	"os/exec"
)

func init() {
	Register("postgres", &PostgresDumper{})
}

// PostgresDumper uses pg_dump to produce a plain-SQL dump file.
type PostgresDumper struct{}

func (d *PostgresDumper) Dump(ctx context.Context, config *DumpConfig) error {
	port := config.Port
	if port == "" {
		port = "5432"
	}
	args := []string{
		"-h", config.Host,
		"-p", port,
		"-U", config.Username,
		"-f", config.Output,
		"--no-password",
		config.Database,
	}
	cmd := exec.CommandContext(ctx, "pg_dump", args...)
	cmd.Env = append(os.Environ(), "PGPASSWORD="+config.Password)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("pg_dump: %w\n%s", err, string(out))
	}
	return nil
}
