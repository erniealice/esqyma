package schemareleases

import "testing"

func TestDataOracleRequiresExactBoundedQuery(t *testing.T) {
	query := "SELECT id FROM public.example WHERE workspace_id=$1"
	original := DataOracle{ID: "example-preserved", SQL: query, SQLSHA256: SHA256([]byte(query)), Mode: "unchanged", MaxRows: 100, TimeoutSeconds: 5}
	if err := original.Validate(); err != nil {
		t.Fatal(err)
	}
	for _, name := range []string{"digest", "query", "workspace", "mode", "rows", "timeout", "identity"} {
		t.Run(name, func(t *testing.T) {
			o := original
			switch name {
			case "digest":
				o.SQLSHA256 = ""
			case "query":
				o.SQL = "DELETE FROM example WHERE workspace_id=$1"
				o.SQLSHA256 = SHA256([]byte(o.SQL))
			case "workspace":
				o.SQL = "SELECT id FROM example"
				o.SQLSHA256 = SHA256([]byte(o.SQL))
			case "mode":
				o.Mode = "ignore"
			case "rows":
				o.MaxRows = 10001
			case "timeout":
				o.TimeoutSeconds = 31
			case "identity":
				o.ID = ""
			}
			if o.Validate() == nil {
				t.Fatal("unbound oracle accepted")
			}
		})
	}
}
