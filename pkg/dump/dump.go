package dump

import (
	"context"
	"fmt"
)

// DumpConfig holds connection and output details for a database dump.
type DumpConfig struct {
	Host     string
	Port     string
	Database string
	Username string
	Password string
	Output   string // destination file path
}

// Dumper writes a full database dump to a file.
type Dumper interface {
	Dump(ctx context.Context, config *DumpConfig) error
}

var dumpers = map[string]Dumper{}

// Register registers a Dumper for a dialect name. Called from init().
func Register(dialect string, d Dumper) {
	dumpers[dialect] = d
}

// Get returns the registered Dumper for the given dialect.
func Get(dialect string) (Dumper, error) {
	d, ok := dumpers[dialect]
	if !ok {
		return nil, fmt.Errorf("no dumper registered for dialect %q (supported: postgres, mysql, sqlserver)", dialect)
	}
	return d, nil
}
