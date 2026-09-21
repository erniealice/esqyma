package main

import (
	"errors"
	"regexp"
	"strings"
)

var atlasDirective = regexp.MustCompile(`(?i)atlas\s*:`)

// The Copya receipt ledger predates the atomic-expand runner and is already
// part of the reviewed 2026.08.1 schema history. The .2 -> .3 education
// transition must replay that exact historical file before the agreement and
// rating-description migrations. Keep this exception immutable and narrow:
// new procedural/dollar-quoted migrations still require a separately reviewed
// execution policy and are rejected below.
var reviewedMigrationSQLDigests = map[string]string{
	"20260829000000_copya_bundle_receipt.sql": "fbb6d17d885a29df04090dfb5e2fdb4adc583ae9d641a9c82d5ac6acfc9a60bf",
}

func validateMigrationFileSQL(name, sql string) error {
	if expected, reviewed := reviewedMigrationSQLDigests[name]; reviewed {
		if sha256Hex([]byte(sql)) != expected {
			return errors.New("separately reviewed migration bytes changed; re-review is required")
		}
		return nil
	}
	return validateAtomicMigrationSQL(sql)
}

// This is a conservative token policy, not a PostgreSQL grammar validator.
// Atlas/PostgreSQL still validate syntax. Unclassified procedural/dollar-quoted
// bodies and escape strings stop for a separate reviewed execution protocol.
// In particular, a migration file cannot override the operator's transaction.
func validateAtomicMigrationSQL(sql string) error {
	tokens, err := migrationTokens(sql)
	if err != nil {
		return err
	}
	forbidden := map[string]bool{
		"DROP": true, "TRUNCATE": true, "COMMIT": true, "ROLLBACK": true,
		"ABORT": true, "BEGIN": true, "END": true, "START": true, "SAVEPOINT": true,
		"RELEASE": true, "PREPARE": true, "CONCURRENTLY": true,
	}
	protected := map[string]bool{"atlas_schema_revisions": true, "schema_migrations": true, "ichizen_deploy": true, "data_bundle_receipts": true}
	var statement []string
	check := func() error {
		if len(statement) == 0 {
			return nil
		}
		for index, word := range statement {
			if word != "DELETE" {
				continue
			}
			// DELETE is allowed only as the declarative foreign-key action
			// "ON DELETE NO ACTION". DML such as DELETE FROM remains refused.
			if index == 0 || statement[index-1] != "ON" || index+2 >= len(statement) ||
				statement[index+1] != "NO" || statement[index+2] != "ACTION" {
				return errors.New("destructive DELETE operation is forbidden in atomic expand migration")
			}
		}
		switch statement[0] {
		case "CREATE":
			if len(statement) < 2 {
				return errors.New("unclassified CREATE migration")
			}
			kind := statement[1]
			if kind == "UNIQUE" && len(statement) > 2 {
				kind = statement[2]
			}
			if kind != "TABLE" && kind != "INDEX" && kind != "TYPE" && kind != "DOMAIN" && kind != "SCHEMA" && kind != "SEQUENCE" {
				return errors.New("CREATE object requires a separate reviewed migration policy")
			}
			for _, word := range statement {
				if word == "SELECT" {
					return errors.New("CREATE AS query requires a data migration contract")
				}
			}
		case "ALTER":
			if len(statement) < 4 || (statement[1] != "TABLE" && statement[1] != "TYPE") {
				return errors.New("unclassified ALTER migration")
			}
			add := false
			validateIndex := -1
			for index, word := range statement {
				if word == "ADD" {
					add = true
				}
				if word == "VALIDATE" {
					if validateIndex >= 0 {
						return errors.New("unclassified constraint validation")
					}
					validateIndex = index
					continue
				}
				if word == "RENAME" || word == "ALTER" && index > 0 || word == "SET" || word == "RESET" || word == "OWNER" || word == "ATTACH" || word == "DETACH" || word == "DISABLE" || word == "ENABLE" || word == "INHERIT" {
					return errors.New("non-additive ALTER requires a contract migration policy")
				}
			}
			if validateIndex >= 0 {
				// A separately stated PostgreSQL VALIDATE CONSTRAINT only proves
				// existing rows against a constraint already enforced for new
				// writes. Accept its exact narrow grammar; mixed ADD/VALIDATE or
				// any extra clause remains unclassified.
				if statement[1] != "TABLE" || add || (validateIndex != 3 && validateIndex != 4) ||
					len(statement) != validateIndex+3 || statement[validateIndex+1] != "CONSTRAINT" {
					return errors.New("unclassified constraint validation")
				}
				return nil
			}
			if !add {
				return errors.New("ALTER requires an additive operation")
			}
		case "COMMENT":
		case "INSERT", "UPDATE":
			return errors.New("data migration requires a release-bound data oracle and retry contract")
		default:
			return errors.New("statement is outside the atomic expand migration policy")
		}
		return nil
	}
	for _, token := range tokens {
		if token == ";" {
			if err := check(); err != nil {
				return err
			}
			statement = nil
			continue
		}
		if forbidden[token] {
			return errors.New("destructive or transaction-control token is forbidden in atomic expand migration")
		}
		if protected[strings.ToLower(token)] {
			return errors.New("migration cannot address protected history/receipt objects")
		}
		statement = append(statement, token)
	}
	return check()
}

func migrationTokens(s string) ([]string, error) {
	var tokens []string
	for i := 0; i < len(s); {
		c := s[i]
		if c == '-' && i+1 < len(s) && s[i+1] == '-' {
			start := i
			i += 2
			for i < len(s) && s[i] != '\n' {
				i++
			}
			if atlasDirective.MatchString(s[start:i]) {
				return nil, errors.New("Atlas file directives cannot override reviewed operator policy")
			}
			continue
		}
		if c == '/' && i+1 < len(s) && s[i+1] == '*' {
			start := i
			i += 2
			depth := 1
			for i < len(s) && depth > 0 {
				if i+1 < len(s) && s[i:i+2] == "/*" {
					depth++
					i += 2
				} else if i+1 < len(s) && s[i:i+2] == "*/" {
					depth--
					i += 2
				} else {
					i++
				}
			}
			if depth != 0 {
				return nil, errors.New("unterminated migration comment")
			}
			if atlasDirective.MatchString(s[start:i]) {
				return nil, errors.New("Atlas file directives cannot override reviewed operator policy")
			}
			continue
		}
		if c == '\'' || c == '"' {
			quote := c
			i++
			var value strings.Builder
			closed := false
			for i < len(s) {
				if s[i] == '\\' {
					return nil, errors.New("escape syntax requires a separately reviewed SQL policy")
				}
				if s[i] == quote {
					if i+1 < len(s) && s[i+1] == quote {
						value.WriteByte(quote)
						i += 2
						continue
					}
					i++
					closed = true
					break
				}
				value.WriteByte(s[i])
				i++
			}
			if !closed {
				return nil, errors.New("unterminated migration quote")
			}
			if quote == '"' {
				tokens = append(tokens, value.String())
			} else {
				tokens = append(tokens, "<literal>")
			}
			continue
		}
		if c == '$' {
			return nil, errors.New("dollar-quoted or parameterized migration requires a separate SQL policy")
		}
		if c == ';' {
			tokens = append(tokens, ";")
			i++
			continue
		}
		if c == '_' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' {
			start := i
			i++
			for i < len(s) && (s[i] == '_' || s[i] >= 'a' && s[i] <= 'z' || s[i] >= 'A' && s[i] <= 'Z' || s[i] >= '0' && s[i] <= '9') {
				i++
			}
			tokens = append(tokens, strings.ToUpper(s[start:i]))
			continue
		}
		i++
	}
	return tokens, nil
}
