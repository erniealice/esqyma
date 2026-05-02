// Atlas config for the ichizen schema, multi-dialect.
//
// Connection settings load from apps/service-admin/.env via scripts/_load-env.sh.
// The script reads DIALECT (default: postgres), picks the matching env vars,
// and exports DB_URL + DB_DEV_URL for the env block below.
//
// Postgres is the only dialect wired into the .env today. The mysql and
// sqlserver blocks are scaffolded for future use — you'll need to install
// the corresponding server (or run via container), add MYSQL_* / SQLSERVER_*
// keys to apps/service-admin/.env, and bootstrap a baseline migration in
// migrations/{mysql,sqlserver}/ when you adopt a second dialect.
//
// Usage examples:
//   DIALECT=postgres pnpm db:apply       # default — same as `pnpm db:apply`
//   DIALECT=mysql    pnpm db:apply       # once mysql envs + baseline are set
//   DIALECT=sqlserver pnpm db:apply      # likewise

variable "url" {
  type    = string
  default = getenv("DB_URL")
}

variable "dev_url" {
  type    = string
  default = getenv("DB_DEV_URL")
}

env "postgres" {
  url = var.url
  dev = var.dev_url
  migration {
    dir = "file://migrations/postgres"
  }
}

env "mysql" {
  url = var.url
  dev = var.dev_url
  migration {
    dir = "file://migrations/mysql"
  }
}

env "sqlserver" {
  url = var.url
  dev = var.dev_url
  migration {
    dir = "file://migrations/sqlserver"
  }
}
