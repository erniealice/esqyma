package main

import (
	"strings"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestDataObservationsCannotBlessChangedEvidence(t *testing.T) {
	definitions := []schemareleases.DataOracle{{ID: "preserve", SQLSHA256: strings.Repeat("a", 64)}}
	baseline := []oracleObservation{{ID: "preserve", SQLSHA256: strings.Repeat("a", 64), Rows: 1, Fingerprint: strings.Repeat("b", 64)}}
	if err := verifyDataObservations(definitions, baseline, baseline); err != nil {
		t.Fatal(err)
	}
	for _, field := range []string{"id", "sql", "rows", "fingerprint", "coverage"} {
		t.Run(field, func(t *testing.T) {
			after := append([]oracleObservation(nil), baseline...)
			switch field {
			case "id":
				after[0].ID = "other"
			case "sql":
				after[0].SQLSHA256 = strings.Repeat("c", 64)
			case "rows":
				after[0].Rows++
			case "fingerprint":
				after[0].Fingerprint = strings.Repeat("d", 64)
			case "coverage":
				after = nil
			}
			if verifyDataObservations(definitions, baseline, after) == nil {
				t.Fatal("changed data evidence accepted")
			}
		})
	}
}
