package schemareleases

import (
	"errors"
	"strings"
)

// DataOracle is reviewed SQL bound to a release. $1 is always the selected
// workspace ID. Results remain private; the operator publishes only digests and
// cardinalities. zero-rows queries return violations, not a scalar COUNT value.
type DataOracle struct {
	ID             string `json:"id"`
	SQL            string `json:"sql"`
	SQLSHA256      string `json:"sql_sha256"`
	Mode           string `json:"mode"`
	MaxRows        int    `json:"max_rows"`
	TimeoutSeconds int    `json:"timeout_seconds"`
}

func (o DataOracle) Validate() error {
	if !namePattern.MatchString(o.ID) || len(o.SQL) == 0 || len(o.SQL) > 16384 || o.SQLSHA256 != SHA256([]byte(o.SQL)) {
		return errors.New("data oracle requires an ID and exact bounded SQL checksum")
	}
	if o.Mode != "unchanged" && o.Mode != "zero-rows" {
		return errors.New("unsupported data oracle comparison")
	}
	if o.MaxRows < 1 || o.MaxRows > 10000 || o.TimeoutSeconds < 1 || o.TimeoutSeconds > 30 {
		return errors.New("data oracle exceeds row/time bounds")
	}
	query := strings.ToUpper(strings.TrimSpace(o.SQL))
	if (!strings.HasPrefix(query, "SELECT ") && !strings.HasPrefix(query, "WITH ")) || !strings.Contains(o.SQL, "$1") {
		return errors.New("data oracle must be a workspace-parameterized query")
	}
	return nil
}
