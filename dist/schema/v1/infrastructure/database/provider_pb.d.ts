import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/database/provider.proto.
 */
export declare const file_infrastructure_database_provider: GenFile;
/**
 * DatabaseProviderConfig is the top-level config for database providers
 *
 * @generated from message infrastructure.database.v1.DatabaseProviderConfig
 */
export type DatabaseProviderConfig = Message<"infrastructure.database.v1.DatabaseProviderConfig"> & {
    /**
     * Which provider to use
     *
     * @generated from field: infrastructure.database.v1.DatabaseProvider provider = 1;
     */
    provider: DatabaseProvider;
    /**
     * Whether this provider is enabled
     *
     * @generated from field: bool enabled = 2;
     */
    enabled: boolean;
    /**
     * Provider-specific configuration (oneof ensures only one is set)
     *
     * @generated from oneof infrastructure.database.v1.DatabaseProviderConfig.config
     */
    config: {
        /**
         * @generated from field: infrastructure.database.v1.PostgreSQLConfig postgresql = 100;
         */
        value: PostgreSQLConfig;
        case: "postgresql";
    } | {
        /**
         * @generated from field: infrastructure.database.v1.FirestoreConfig firestore = 101;
         */
        value: FirestoreConfig;
        case: "firestore";
    } | {
        /**
         * @generated from field: infrastructure.database.v1.MongoDBConfig mongodb = 102;
         */
        value: MongoDBConfig;
        case: "mongodb";
    } | {
        /**
         * @generated from field: infrastructure.database.v1.MySQLConfig mysql = 103;
         */
        value: MySQLConfig;
        case: "mysql";
    } | {
        /**
         * @generated from field: infrastructure.database.v1.SQLiteConfig sqlite = 104;
         */
        value: SQLiteConfig;
        case: "sqlite";
    } | {
        /**
         * @generated from field: infrastructure.database.v1.MockConfig mock = 199;
         */
        value: MockConfig;
        case: "mock";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message infrastructure.database.v1.DatabaseProviderConfig.
 * Use `create(DatabaseProviderConfigSchema)` to create a new message.
 */
export declare const DatabaseProviderConfigSchema: GenMessage<DatabaseProviderConfig>;
/**
 * PostgreSQL-specific configuration
 *
 * @generated from message infrastructure.database.v1.PostgreSQLConfig
 */
export type PostgreSQLConfig = Message<"infrastructure.database.v1.PostgreSQLConfig"> & {
    /**
     * Database connection parameters
     *
     * Default: "localhost"
     *
     * @generated from field: string host = 1;
     */
    host: string;
    /**
     * Default: "5432"
     *
     * @generated from field: string port = 2;
     */
    port: string;
    /**
     * Required
     *
     * @generated from field: string database = 3;
     */
    database: string;
    /**
     * Required
     *
     * @generated from field: string username = 4;
     */
    username: string;
    /**
     * Required (can be empty for trust auth)
     *
     * @generated from field: string password = 5;
     */
    password: string;
    /**
     * SSL/TLS configuration
     *
     * disable, require, verify-ca, verify-full
     *
     * @generated from field: string ssl_mode = 6;
     */
    sslMode: string;
    /**
     * Path to SSL certificate
     *
     * @generated from field: string ssl_cert_path = 7;
     */
    sslCertPath: string;
    /**
     * Path to SSL key
     *
     * @generated from field: string ssl_key_path = 8;
     */
    sslKeyPath: string;
    /**
     * Path to root certificate
     *
     * @generated from field: string ssl_root_cert_path = 9;
     */
    sslRootCertPath: string;
    /**
     * Connection pool settings
     *
     * Default: 25
     *
     * @generated from field: int32 max_connections = 10;
     */
    maxConnections: number;
    /**
     * Default: 5
     *
     * @generated from field: int32 max_idle_connections = 11;
     */
    maxIdleConnections: number;
    /**
     * Default: 3600 (1 hour)
     *
     * @generated from field: int32 connection_max_lifetime_seconds = 12;
     */
    connectionMaxLifetimeSeconds: number;
    /**
     * Default: 600 (10 minutes)
     *
     * @generated from field: int32 connection_max_idle_time_seconds = 13;
     */
    connectionMaxIdleTimeSeconds: number;
    /**
     * Schema and migrations
     *
     * Path to migration files
     *
     * @generated from field: string migrations_path = 14;
     */
    migrationsPath: string;
    /**
     * Default: "public"
     *
     * @generated from field: string schema = 15;
     */
    schema: string;
    /**
     * Whether to run migrations on startup
     *
     * @generated from field: bool auto_migrate = 16;
     */
    autoMigrate: boolean;
    /**
     * Query configuration
     *
     * Default: 30
     *
     * @generated from field: int32 statement_timeout_seconds = 17;
     */
    statementTimeoutSeconds: number;
    /**
     * Default: "UTC"
     *
     * @generated from field: string timezone = 18;
     */
    timezone: string;
    /**
     * Logging and debugging
     *
     * Whether to log SQL queries
     *
     * @generated from field: bool log_queries = 19;
     */
    logQueries: boolean;
    /**
     * Whether to log slow queries
     *
     * @generated from field: bool log_slow_queries = 20;
     */
    logSlowQueries: boolean;
    /**
     * Threshold for slow query logging
     *
     * @generated from field: int32 slow_query_threshold_ms = 21;
     */
    slowQueryThresholdMs: number;
};
/**
 * Describes the message infrastructure.database.v1.PostgreSQLConfig.
 * Use `create(PostgreSQLConfigSchema)` to create a new message.
 */
export declare const PostgreSQLConfigSchema: GenMessage<PostgreSQLConfig>;
/**
 * Firestore-specific configuration
 *
 * @generated from message infrastructure.database.v1.FirestoreConfig
 */
export type FirestoreConfig = Message<"infrastructure.database.v1.FirestoreConfig"> & {
    /**
     * GCP project configuration
     *
     * Required: GCP project ID
     *
     * @generated from field: string project_id = 1;
     */
    projectId: string;
    /**
     * Default: "(default)"
     *
     * @generated from field: string database_id = 2;
     */
    databaseId: string;
    /**
     * Authentication
     *
     * Path to service account JSON
     *
     * @generated from field: string credentials_path = 3;
     */
    credentialsPath: string;
    /**
     * Whether to use service account from env
     *
     * @generated from field: bool use_service_account_json = 4;
     */
    useServiceAccountJson: boolean;
    /**
     * Emulator support (for local development)
     *
     * Whether to use Firestore emulator
     *
     * @generated from field: bool use_emulator = 5;
     */
    useEmulator: boolean;
    /**
     * Emulator host (e.g., "localhost:8080")
     *
     * @generated from field: string emulator_host = 6;
     */
    emulatorHost: string;
    /**
     * Performance tuning
     *
     * Maximum concurrent connections
     *
     * @generated from field: int32 max_pool_size = 7;
     */
    maxPoolSize: number;
    /**
     * Maximum idle connections
     *
     * @generated from field: int32 max_idle_connections = 8;
     */
    maxIdleConnections: number;
    /**
     * Timeouts
     *
     * Connection timeout
     *
     * @generated from field: int32 connection_timeout_seconds = 9;
     */
    connectionTimeoutSeconds: number;
    /**
     * Request timeout
     *
     * @generated from field: int32 request_timeout_seconds = 10;
     */
    requestTimeoutSeconds: number;
    /**
     * Logging
     *
     * Whether to log Firestore requests
     *
     * @generated from field: bool log_requests = 11;
     */
    logRequests: boolean;
};
/**
 * Describes the message infrastructure.database.v1.FirestoreConfig.
 * Use `create(FirestoreConfigSchema)` to create a new message.
 */
export declare const FirestoreConfigSchema: GenMessage<FirestoreConfig>;
/**
 * MongoDB-specific configuration
 *
 * @generated from message infrastructure.database.v1.MongoDBConfig
 */
export type MongoDBConfig = Message<"infrastructure.database.v1.MongoDBConfig"> & {
    /**
     * Connection
     *
     * Required: MongoDB connection string
     *
     * @generated from field: string connection_string = 1;
     */
    connectionString: string;
    /**
     * Required: Database name
     *
     * @generated from field: string database = 2;
     */
    database: string;
    /**
     * Connection pool
     *
     * Default: 100
     *
     * @generated from field: int32 max_pool_size = 3;
     */
    maxPoolSize: number;
    /**
     * Default: 10
     *
     * @generated from field: int32 min_pool_size = 4;
     */
    minPoolSize: number;
    /**
     * Timeouts
     *
     * Default: 30
     *
     * @generated from field: int32 connection_timeout_seconds = 5;
     */
    connectionTimeoutSeconds: number;
    /**
     * Default: 30
     *
     * @generated from field: int32 socket_timeout_seconds = 6;
     */
    socketTimeoutSeconds: number;
    /**
     * Default: 30
     *
     * @generated from field: int32 server_selection_timeout_seconds = 7;
     */
    serverSelectionTimeoutSeconds: number;
    /**
     * Read/Write concern
     *
     * primary, secondary, nearest, etc.
     *
     * @generated from field: string read_preference = 8;
     */
    readPreference: string;
    /**
     * majority, w1, w2, w3, etc.
     *
     * @generated from field: string write_concern = 9;
     */
    writeConcern: string;
    /**
     * Logging
     *
     * Whether to log MongoDB commands
     *
     * @generated from field: bool log_commands = 10;
     */
    logCommands: boolean;
};
/**
 * Describes the message infrastructure.database.v1.MongoDBConfig.
 * Use `create(MongoDBConfigSchema)` to create a new message.
 */
export declare const MongoDBConfigSchema: GenMessage<MongoDBConfig>;
/**
 * MySQL-specific configuration
 *
 * @generated from message infrastructure.database.v1.MySQLConfig
 */
export type MySQLConfig = Message<"infrastructure.database.v1.MySQLConfig"> & {
    /**
     * Database connection parameters
     *
     * Default: "localhost"
     *
     * @generated from field: string host = 1;
     */
    host: string;
    /**
     * Default: "3306"
     *
     * @generated from field: string port = 2;
     */
    port: string;
    /**
     * Required
     *
     * @generated from field: string database = 3;
     */
    database: string;
    /**
     * Required
     *
     * @generated from field: string username = 4;
     */
    username: string;
    /**
     * Required
     *
     * @generated from field: string password = 5;
     */
    password: string;
    /**
     * SSL/TLS configuration
     *
     * Whether to enable TLS
     *
     * @generated from field: bool enable_tls = 6;
     */
    enableTls: boolean;
    /**
     * Path to TLS certificate
     *
     * @generated from field: string tls_cert_path = 7;
     */
    tlsCertPath: string;
    /**
     * Path to TLS key
     *
     * @generated from field: string tls_key_path = 8;
     */
    tlsKeyPath: string;
    /**
     * Path to CA certificate
     *
     * @generated from field: string tls_ca_path = 9;
     */
    tlsCaPath: string;
    /**
     * Connection pool
     *
     * Default: 25
     *
     * @generated from field: int32 max_connections = 10;
     */
    maxConnections: number;
    /**
     * Default: 5
     *
     * @generated from field: int32 max_idle_connections = 11;
     */
    maxIdleConnections: number;
    /**
     * Default: 3600
     *
     * @generated from field: int32 connection_max_lifetime_seconds = 12;
     */
    connectionMaxLifetimeSeconds: number;
    /**
     * Query configuration
     *
     * Default: "utf8mb4"
     *
     * @generated from field: string charset = 13;
     */
    charset: string;
    /**
     * Default: "utf8mb4_unicode_ci"
     *
     * @generated from field: string collation = 14;
     */
    collation: string;
    /**
     * Default: "UTC"
     *
     * @generated from field: string timezone = 15;
     */
    timezone: string;
    /**
     * Logging
     *
     * Whether to log queries
     *
     * @generated from field: bool log_queries = 16;
     */
    logQueries: boolean;
};
/**
 * Describes the message infrastructure.database.v1.MySQLConfig.
 * Use `create(MySQLConfigSchema)` to create a new message.
 */
export declare const MySQLConfigSchema: GenMessage<MySQLConfig>;
/**
 * SQLite-specific configuration
 *
 * @generated from message infrastructure.database.v1.SQLiteConfig
 */
export type SQLiteConfig = Message<"infrastructure.database.v1.SQLiteConfig"> & {
    /**
     * File configuration
     *
     * Required: Path to SQLite database file
     *
     * @generated from field: string file_path = 1;
     */
    filePath: string;
    /**
     * Use in-memory database (for testing)
     *
     * @generated from field: bool in_memory = 2;
     */
    inMemory: boolean;
    /**
     * Performance tuning
     *
     * DELETE, TRUNCATE, PERSIST, MEMORY, WAL
     *
     * @generated from field: string journal_mode = 3;
     */
    journalMode: string;
    /**
     * OFF, NORMAL, FULL, EXTRA
     *
     * @generated from field: string synchronous = 4;
     */
    synchronous: string;
    /**
     * Cache size in KB (default: 2000)
     *
     * @generated from field: int32 cache_size_kb = 5;
     */
    cacheSizeKb: number;
    /**
     * Page size in bytes (default: 4096)
     *
     * @generated from field: int32 page_size_bytes = 6;
     */
    pageSizeBytes: number;
    /**
     * Connection pool (for SQLite, usually 1)
     *
     * Default: 1
     *
     * @generated from field: int32 max_open_connections = 7;
     */
    maxOpenConnections: number;
    /**
     * Pragmas
     *
     * Default: true
     *
     * @generated from field: bool enable_foreign_keys = 8;
     */
    enableForeignKeys: boolean;
    /**
     * Default: true
     *
     * @generated from field: bool enable_triggers = 9;
     */
    enableTriggers: boolean;
    /**
     * Migrations
     *
     * Path to migration files
     *
     * @generated from field: string migrations_path = 10;
     */
    migrationsPath: string;
    /**
     * Whether to run migrations on startup
     *
     * @generated from field: bool auto_migrate = 11;
     */
    autoMigrate: boolean;
    /**
     * Logging
     *
     * Whether to log queries
     *
     * @generated from field: bool log_queries = 12;
     */
    logQueries: boolean;
};
/**
 * Describes the message infrastructure.database.v1.SQLiteConfig.
 * Use `create(SQLiteConfigSchema)` to create a new message.
 */
export declare const SQLiteConfigSchema: GenMessage<SQLiteConfig>;
/**
 * Mock database configuration (for testing)
 *
 * @generated from message infrastructure.database.v1.MockConfig
 */
export type MockConfig = Message<"infrastructure.database.v1.MockConfig"> & {
    /**
     * Mock behavior
     *
     * Mock provider name
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * Whether to simulate random failures
     *
     * @generated from field: bool simulate_failures = 2;
     */
    simulateFailures: boolean;
    /**
     * Percentage of operations that fail (0-100)
     *
     * @generated from field: int32 failure_rate_percent = 3;
     */
    failureRatePercent: number;
    /**
     * Initial data
     *
     * Initial data to load
     *
     * @generated from field: map<string, string> initial_data = 4;
     */
    initialData: {
        [key: string]: string;
    };
    /**
     * Path to JSON file with initial data
     *
     * @generated from field: string initial_data_path = 5;
     */
    initialDataPath: string;
    /**
     * Performance simulation
     *
     * Simulated latency in milliseconds
     *
     * @generated from field: int32 latency_ms = 6;
     */
    latencyMs: number;
    /**
     * Variance in latency
     *
     * @generated from field: int32 latency_variance_ms = 7;
     */
    latencyVarianceMs: number;
    /**
     * Logging
     *
     * Whether to log operations
     *
     * @generated from field: bool log_operations = 8;
     */
    logOperations: boolean;
    /**
     * Verbose logging
     *
     * @generated from field: bool verbose = 9;
     */
    verbose: boolean;
};
/**
 * Describes the message infrastructure.database.v1.MockConfig.
 * Use `create(MockConfigSchema)` to create a new message.
 */
export declare const MockConfigSchema: GenMessage<MockConfig>;
/**
 * DatabaseProvider enum identifies database types
 *
 * @generated from enum infrastructure.database.v1.DatabaseProvider
 */
export declare enum DatabaseProvider {
    /**
     * @generated from enum value: DATABASE_PROVIDER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DATABASE_PROVIDER_POSTGRESQL = 1;
     */
    POSTGRESQL = 1,
    /**
     * @generated from enum value: DATABASE_PROVIDER_FIRESTORE = 2;
     */
    FIRESTORE = 2,
    /**
     * @generated from enum value: DATABASE_PROVIDER_MONGODB = 3;
     */
    MONGODB = 3,
    /**
     * @generated from enum value: DATABASE_PROVIDER_MYSQL = 4;
     */
    MYSQL = 4,
    /**
     * @generated from enum value: DATABASE_PROVIDER_SQLITE = 5;
     */
    SQLITE = 5,
    /**
     * @generated from enum value: DATABASE_PROVIDER_MOCK = 99;
     */
    MOCK = 99
}
/**
 * Describes the enum infrastructure.database.v1.DatabaseProvider.
 */
export declare const DatabaseProviderSchema: GenEnum<DatabaseProvider>;
