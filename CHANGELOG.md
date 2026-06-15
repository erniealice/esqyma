# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0-alpha] - 2026-06-15

First published alpha of the schema package — protobuf definitions, generated Go
types, and Postgres migrations for the ichizen platform.

### Added
- Protobuf definitions across 25 proto domains with generated Go types under
  `pkg/schema/v1/` and JS/TS artifacts under `dist/`.
- Postgres migration set (`migrations/`) with `atlas.sum`.
- Security RPCs: `ResolvePrincipals`, `EnumerateBindings`, `LookupSessionPrincipal`.
- `ListWorkspacesForUsers` RPC on the workspace_user service.
- `work_request` and `work_request_type` protos, migration, and generated types.

[Unreleased]: https://github.com/erniealice/esqyma/compare/v0.1.0-alpha...HEAD
[0.1.0-alpha]: https://github.com/erniealice/esqyma/releases/tag/v0.1.0-alpha
