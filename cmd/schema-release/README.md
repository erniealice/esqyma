# schema-release initializer

This command is the implementation behind `pnpm db:init`. It resolves a reviewed
`deploy/<client>/database/targets/<name>.json`, asserts the explicit Esqyma calendar release, and
validates every Copya bundle before it observes or changes a database.

Plan mode is the default and read-only. `--apply` may create only an absent database selected by a
`local` or `disposable` target with `allow_create=true`; it never drops, resets, restores, applies a
down migration, or edits Atlas rows directly.

After schema and required-bundle verification, every apply publishes a sanitized, uniquely named
receipt outside the repository and returns its URI and SHA-256 digest. Local/disposable runs default
to the operating system's private temporary directory; `DB_INIT_RECEIPT_DIR` selects a dedicated
absolute append-only location. Remote applies must provide that external location. Git promotion
records store only the resulting digest.
