package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"sort"
	"strings"
	"time"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

type oracleObservation struct {
	ID          string `json:"id"`
	SQLSHA256   string `json:"sql_sha256"`
	Rows        int    `json:"rows"`
	Fingerprint string `json:"fingerprint"`
}

func observeDataOracles(ctx context.Context, db *sql.DB, definitions []schemareleases.DataOracle, workspaceID string) ([]oracleObservation, error) {
	var results []oracleObservation
	for _, definition := range definitions {
		result, err := observeDataOracle(ctx, db, definition, workspaceID)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}
	return results, nil
}

func observeDataOracle(ctx context.Context, db *sql.DB, definition schemareleases.DataOracle, workspaceID string) (oracleObservation, error) {
	if err := definition.Validate(); err != nil {
		return oracleObservation{}, err
	}
	if workspaceID == "" {
		return oracleObservation{}, errors.New("data oracle requires selected workspace")
	}
	ctx, cancel := context.WithTimeout(ctx, time.Duration(definition.TimeoutSeconds)*time.Second)
	defer cancel()
	tx, err := db.BeginTx(ctx, &sql.TxOptions{ReadOnly: true, Isolation: sql.LevelRepeatableRead})
	if err != nil {
		return oracleObservation{}, errors.New("start read-only data oracle failed")
	}
	defer tx.Rollback()
	// Server timeout covers a backend even if client cancellation is delayed.
	if _, err := tx.ExecContext(ctx, fmt.Sprintf("SET LOCAL statement_timeout = '%dms'", definition.TimeoutSeconds*1000)); err != nil {
		return oracleObservation{}, errors.New("set data oracle timeout failed")
	}
	rows, err := tx.QueryContext(ctx, definition.SQL, workspaceID)
	if err != nil {
		return oracleObservation{}, fmt.Errorf("data oracle %s query failed (details withheld)", definition.ID)
	}
	defer rows.Close()
	columns, err := rows.Columns()
	if err != nil {
		return oracleObservation{}, errors.New("read data oracle shape failed")
	}
	var fingerprints []string
	for rows.Next() {
		if len(fingerprints) >= definition.MaxRows {
			return oracleObservation{}, fmt.Errorf("data oracle %s exceeded row bound", definition.ID)
		}
		values := make([]any, len(columns))
		dest := make([]any, len(columns))
		for i := range values {
			dest[i] = &values[i]
		}
		if err := rows.Scan(dest...); err != nil {
			return oracleObservation{}, errors.New("scan data oracle failed (details withheld)")
		}
		raw, err := json.Marshal(values)
		if err != nil {
			return oracleObservation{}, errors.New("encode data oracle row failed (details withheld)")
		}
		fingerprints = append(fingerprints, sha256Hex(raw))
	}
	if err := rows.Err(); err != nil {
		return oracleObservation{}, fmt.Errorf("data oracle %s incomplete (details withheld)", definition.ID)
	}
	if definition.Mode == "zero-rows" && len(fingerprints) != 0 {
		return oracleObservation{}, fmt.Errorf("data oracle %s found invariant violations", definition.ID)
	}
	sort.Strings(fingerprints)
	shape, _ := json.Marshal(columns)
	digest := sha256Hex(append(append(shape, '\n'), []byte(strings.Join(fingerprints, "\n"))...))
	return oracleObservation{ID: definition.ID, SQLSHA256: definition.SQLSHA256, Rows: len(fingerprints), Fingerprint: digest}, nil
}

func verifyDataObservations(definitions []schemareleases.DataOracle, before, after []oracleObservation) error {
	if len(before) != len(definitions) || len(after) != len(definitions) {
		return errors.New("data oracle evidence coverage mismatch")
	}
	for i, definition := range definitions {
		if before[i].ID != definition.ID || after[i].ID != definition.ID || before[i].SQLSHA256 != definition.SQLSHA256 || after[i].SQLSHA256 != definition.SQLSHA256 || before[i] != after[i] {
			return fmt.Errorf("data oracle %s changed across the reviewed transition; preserve evidence and stop", definition.ID)
		}
	}
	return nil
}
