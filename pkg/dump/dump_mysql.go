package dump

import (
	"context"
	"fmt"
	"os"
	"os/exec"
)

func init() {
	Register("mysql", &MySQLDumper{})
}

// MySQLDumper uses mysqldump to produce a plain-SQL dump file.
type MySQLDumper struct{}

func (d *MySQLDumper) Dump(ctx context.Context, config *DumpConfig) error {
	port := config.Port
	if port == "" {
		port = "3306"
	}
	args := []string{
		"-h", config.Host,
		"-P", port,
		"-u", config.Username,
		"--result-file=" + config.Output,
		config.Database,
	}
	cmd := exec.CommandContext(ctx, "mysqldump", args...)
	cmd.Env = append(os.Environ(), "MYSQL_PWD="+config.Password)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("mysqldump: %w\n%s", err, string(out))
	}
	return nil
}
