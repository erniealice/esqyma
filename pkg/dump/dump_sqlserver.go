package dump

import (
	"context"
	"fmt"
	"os/exec"
)

func init() {
	Register("sqlserver", &SQLServerDumper{})
}

// SQLServerDumper uses sqlcmd BACKUP DATABASE to produce a .bak dump file.
// Note: the output path must be accessible to the SQL Server process.
type SQLServerDumper struct{}

func (d *SQLServerDumper) Dump(ctx context.Context, config *DumpConfig) error {
	server := config.Host
	if config.Port != "" && config.Port != "1433" {
		server = config.Host + "," + config.Port
	}
	query := fmt.Sprintf(
		"BACKUP DATABASE [%s] TO DISK = N'%s' WITH FORMAT, INIT, COMPRESSION;",
		config.Database, config.Output,
	)
	args := []string{
		"-S", server,
		"-U", config.Username,
		"-P", config.Password,
		"-Q", query,
	}
	cmd := exec.CommandContext(ctx, "sqlcmd", args...)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("sqlcmd: %w\n%s", err, string(out))
	}
	return nil
}
