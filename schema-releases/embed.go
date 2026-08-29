// Package schemareleases owns immutable, embedded Esqyma database releases.
package schemareleases

import "embed"

// FS contains the strict manifest schema and every promoted Postgres release.
//
//go:embed schema-release.schema.json postgres/*/manifest.json postgres/*/bootstrap.sql
var FS embed.FS
