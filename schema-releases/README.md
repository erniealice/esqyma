# Schema releases

This directory is the immutable, code-owned history of promoted database schema releases.

Each `postgres/YYYY.MM.N/` directory contains a reviewed `manifest.json` and the exact
`bootstrap.sql` for a proven-empty target. The manifest pins the Atlas tool, migration head,
`atlas.sum`, tracker state, bootstrap checksum, normalized dump fingerprint, runtime catalog
fingerprint, and accepted Copya seed contract.

The Go package embeds these artifacts so initializers and applications verify the same bytes.
Database state is derived from the embedded release plus Atlas/catalog observations; no database
schema-release history table is created.

Use `pnpm db:init -- --target <client>/<target> --schema-release postgres/YYYY.MM.N` from
`packages/esqyma`. Plan mode is the default; writes require `--apply`.
