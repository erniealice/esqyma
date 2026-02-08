# Timestamp Handling Across Database Backends

## Design Decision

The proto schema defines two timestamp fields per entity:

```protobuf
optional int64 date_created = 4;
optional string date_created_string = 5;
```

- `date_created` (int64) -- Unix timestamp, used for sorting, filtering, and cross-platform consistency
- `date_created_string` (string) -- RFC3339 display format, consumed by presentation layers

The string field is **computed by the adapter layer**, not stored as a physical column -- except in Firestore, where both are persisted. This keeps the database schema clean while the proto contract stays stable across backends.

The Go `BaseModel` reflects this:

```go
type BaseModel struct {
    DateCreated        time.Time `db:"date_created"`
    DateCreatedString  string    `firestore:"date_created_string"`
    DateModified       time.Time `db:"date_modified"`
    DateModifiedString string    `firestore:"date_modified_string"`
}
```

`DateCreatedString` has no `db` tag -- PostgreSQL, MySQL, and SQL Server never read or write it as a column.

## PostgreSQL

**Column type:** `TIMESTAMPTZ`

```sql
"date_created" TIMESTAMPTZ NULL,
"date_modified" TIMESTAMPTZ NULL,
```

- `lib/pq` returns `time.Time` natively from `TIMESTAMPTZ` columns
- Adapter converts on read: `dateCreated.Unix()` for proto int64, `dateCreated.Format(time.RFC3339)` for proto string
- Insertion: `time.Now().UTC()` stored directly

```go
client := &clientpb.Client{
    DateCreated:        dateCreated.Unix(),
    DateCreatedString:  dateCreated.Format(time.RFC3339),
    DateModified:       dateModified.Unix(),
    DateModifiedString: dateModified.Format(time.RFC3339),
}
```

Benefits of `TIMESTAMPTZ`:
- Native `ORDER BY`, range queries, `date_trunc()` without casting
- Stores UTC internally regardless of client session timezone
- No 2038 limitation

## MySQL

**Column type:** `BIGINT`

```sql
`date_created` BIGINT NULL,
`date_modified` BIGINT NULL,
```

The MySQL migration stores Unix timestamps as `BIGINT`, not native datetime types. This sidesteps:
- `DATETIME` timezone-unawareness (would require explicit UTC discipline)
- `TIMESTAMP` 2038 limitation
- `parseTime=true` DSN requirement for `time.Time` scanning

The adapter reads `int64` directly and converts to `time.Time` in Go for string formatting:

```go
t := time.Unix(dateCreatedInt64, 0).UTC()
proto.DateCreated = dateCreatedInt64
proto.DateCreatedString = t.Format(time.RFC3339)
```

Trade-off: `BIGINT` loses native MySQL date functions (`DATE_FORMAT`, `DATE_ADD`) at the query level. Use Go-side formatting instead.

## SQL Server

**Column type:** `BIGINT`

```sql
[date_created] BIGINT NULL,
[date_modified] BIGINT NULL,
```

Same pattern as MySQL -- Unix timestamps stored as `BIGINT`. The `go-mssqldb` driver reads these as `int64`. Adapter conversion is identical.

If migrating to native types, `DATETIMEOFFSET` is the timezone-aware option and `DATETIME2` works for UTC-only storage.

## Firestore

**Stored fields:** both `date_created` (int64) AND `date_created_string` (string)

```go
data["date_created"] = now.UnixMilli()
data["date_created_string"] = now.Format("2006-01-02T15:04:05.000Z")
data["date_modified"] = now.UnixMilli()
data["date_modified_string"] = now.Format("2006-01-02T15:04:05.000Z")
```

Key differences from SQL backends:
- Both fields are physical document fields (Firestore has no computed columns or SQL formatting)
- Uses `UnixMilli()` (milliseconds) not `Unix()` (seconds) -- matches JavaScript `Date.now()` convention
- String format uses explicit millisecond layout, not `time.RFC3339`
- On update, `date_created_string` is preserved from the original document:

```go
if dateCreatedString, exists := originalData["date_created_string"]; exists {
    data["date_created_string"] = dateCreatedString
}
```

Firestore `Timestamp` type exists but is not used -- `int64` keeps cross-platform proto compatibility.

## Adapter Contract

All adapters must populate both proto fields (`date_created` int64 AND `date_created_string` string). The source differs by backend:

| Backend    | date_created source | date_created_string source |
|------------|--------------------|-----------------------------|
| PostgreSQL | `TIMESTAMPTZ` -> `.Unix()` | `TIMESTAMPTZ` -> `.Format(RFC3339)` |
| MySQL      | `BIGINT` read directly | `BIGINT` -> `time.Unix()` -> `.Format(RFC3339)` |
| SQL Server | `BIGINT` read directly | `BIGINT` -> `time.Unix()` -> `.Format(RFC3339)` |
| Firestore  | `int64` field read directly | `string` field read directly |

The proto message consumer never needs to know which backend is used. Both fields are always present.

## Common Gotchas

- **Always store UTC.** Convert to local timezone only at the presentation layer.
- **PostgreSQL `TIMESTAMPTZ`** stores UTC internally regardless of client timezone setting. This is correct behavior, not a bug.
- **MySQL/SQL Server `BIGINT`** means you lose native date query functions. Filter by integer range instead: `WHERE date_created BETWEEN $start AND $end`.
- **Firestore uses milliseconds** (`UnixMilli`), SQL backends use seconds (`Unix`). Mismatching these produces timestamps 1000x off.
- **Firestore string format** uses `"2006-01-02T15:04:05.000Z"` (explicit millis), not `time.RFC3339` (`"2006-01-02T15:04:05Z07:00"`). These parse identically but generate slightly different output.
- **BaseModel `SetCreateProperties`** sets both `time.Time` and string fields in Go. For PostgreSQL, only `time.Time` hits the database; the string is for Firestore/proto mapping.
- **Migrating PostgreSQL from BIGINT to TIMESTAMPTZ:** `ALTER COLUMN ... TYPE TIMESTAMPTZ USING TO_TIMESTAMP(column_name)`.
