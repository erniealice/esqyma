import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { TabularCapability, TabularProviderType } from "./tabular_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/tabular/provider.proto.
 */
export declare const file_integration_tabular_provider: GenFile;
/**
 * TabularProviderConfig represents the main configuration for a tabular data provider
 *
 * @generated from message integration.tabular.v1.TabularProviderConfig
 */
export type TabularProviderConfig = Message<"integration.tabular.v1.TabularProviderConfig"> & {
    /**
     * Unique provider identifier (e.g., "google-sheets", "csv-local", "excel-online")
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type category
     *
     * @generated from field: integration.tabular.v1.TabularProviderType provider_type = 2;
     */
    providerType: TabularProviderType;
    /**
     * Whether this provider is enabled
     *
     * @generated from field: bool enabled = 3;
     */
    enabled: boolean;
    /**
     * Display name for the provider
     *
     * @generated from field: string display_name = 4;
     */
    displayName: string;
    /**
     * Capabilities supported by this provider
     *
     * @generated from field: repeated integration.tabular.v1.TabularCapability capabilities = 5;
     */
    capabilities: TabularCapability[];
    /**
     * Authentication configuration
     *
     * @generated from oneof integration.tabular.v1.TabularProviderConfig.auth
     */
    auth: {
        /**
         * @generated from field: integration.tabular.v1.GoogleSheetsAuth google_sheets_auth = 10;
         */
        value: GoogleSheetsAuth;
        case: "googleSheetsAuth";
    } | {
        /**
         * @generated from field: integration.tabular.v1.OAuth2Auth oauth2_auth = 11;
         */
        value: OAuth2Auth;
        case: "oauth2Auth";
    } | {
        /**
         * @generated from field: integration.tabular.v1.ApiKeyAuth api_key_auth = 12;
         */
        value: ApiKeyAuth;
        case: "apiKeyAuth";
    } | {
        /**
         * @generated from field: integration.tabular.v1.ServiceAccountAuth service_account_auth = 13;
         */
        value: ServiceAccountAuth;
        case: "serviceAccountAuth";
    } | {
        /**
         * @generated from field: integration.tabular.v1.CsvAuth csv_auth = 14;
         */
        value: CsvAuth;
        case: "csvAuth";
    } | {
        /**
         * @generated from field: integration.tabular.v1.CustomAuth custom_auth = 15;
         */
        value: CustomAuth;
        case: "customAuth";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * Request timeout in seconds
     *
     * @generated from field: int32 timeout_seconds = 20;
     */
    timeoutSeconds: number;
    /**
     * Maximum retry attempts for failed requests
     *
     * @generated from field: int32 max_retries = 21;
     */
    maxRetries: number;
    /**
     * Provider-specific settings as key-value pairs
     *
     * @generated from field: map<string, string> settings = 30;
     */
    settings: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.tabular.v1.TabularProviderConfig.
 * Use `create(TabularProviderConfigSchema)` to create a new message.
 */
export declare const TabularProviderConfigSchema: GenMessage<TabularProviderConfig>;
/**
 * GoogleSheetsAuth represents Google Sheets API authentication
 *
 * @generated from message integration.tabular.v1.GoogleSheetsAuth
 */
export type GoogleSheetsAuth = Message<"integration.tabular.v1.GoogleSheetsAuth"> & {
    /**
     * Service account JSON key content or path to key file
     *
     * @generated from field: string service_account_key = 1;
     */
    serviceAccountKey: string;
    /**
     * Delegated email for domain-wide delegation
     *
     * @generated from field: string delegated_email = 2;
     */
    delegatedEmail: string;
    /**
     * OAuth2 scopes to request
     *
     * @generated from field: repeated string scopes = 3;
     */
    scopes: string[];
    /**
     * Google Cloud project ID
     *
     * @generated from field: string project_id = 4;
     */
    projectId: string;
    /**
     * Whether to use Google Secret Manager for credentials
     *
     * @generated from field: bool use_secret_manager = 5;
     */
    useSecretManager: boolean;
    /**
     * Path to secret in Secret Manager (e.g., "projects/my-project/secrets/my-secret/versions/latest")
     *
     * @generated from field: string secret_manager_path = 6;
     */
    secretManagerPath: string;
};
/**
 * Describes the message integration.tabular.v1.GoogleSheetsAuth.
 * Use `create(GoogleSheetsAuthSchema)` to create a new message.
 */
export declare const GoogleSheetsAuthSchema: GenMessage<GoogleSheetsAuth>;
/**
 * OAuth2Auth represents generic OAuth 2.0 based authentication
 *
 * @generated from message integration.tabular.v1.OAuth2Auth
 */
export type OAuth2Auth = Message<"integration.tabular.v1.OAuth2Auth"> & {
    /**
     * OAuth 2.0 client ID
     *
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * OAuth 2.0 client secret
     *
     * @generated from field: string client_secret = 2;
     */
    clientSecret: string;
    /**
     * OAuth 2.0 refresh token
     *
     * @generated from field: string refresh_token = 3;
     */
    refreshToken: string;
    /**
     * OAuth 2.0 access token
     *
     * @generated from field: string access_token = 4;
     */
    accessToken: string;
    /**
     * Token endpoint for refreshing tokens
     *
     * @generated from field: string token_url = 5;
     */
    tokenUrl: string;
    /**
     * Authorization endpoint for initial OAuth flow
     *
     * @generated from field: string auth_url = 6;
     */
    authUrl: string;
    /**
     * OAuth2 scopes to request
     *
     * @generated from field: repeated string scopes = 7;
     */
    scopes: string[];
};
/**
 * Describes the message integration.tabular.v1.OAuth2Auth.
 * Use `create(OAuth2AuthSchema)` to create a new message.
 */
export declare const OAuth2AuthSchema: GenMessage<OAuth2Auth>;
/**
 * ApiKeyAuth represents API key based authentication
 *
 * @generated from message integration.tabular.v1.ApiKeyAuth
 */
export type ApiKeyAuth = Message<"integration.tabular.v1.ApiKeyAuth"> & {
    /**
     * API key for authentication
     *
     * @generated from field: string api_key = 1;
     */
    apiKey: string;
    /**
     * Header name for API key (e.g., "Authorization", "X-API-Key")
     *
     * @generated from field: string header_name = 2;
     */
    headerName: string;
};
/**
 * Describes the message integration.tabular.v1.ApiKeyAuth.
 * Use `create(ApiKeyAuthSchema)` to create a new message.
 */
export declare const ApiKeyAuthSchema: GenMessage<ApiKeyAuth>;
/**
 * ServiceAccountAuth represents service account based authentication
 *
 * @generated from message integration.tabular.v1.ServiceAccountAuth
 */
export type ServiceAccountAuth = Message<"integration.tabular.v1.ServiceAccountAuth"> & {
    /**
     * Path to service account key file
     *
     * @generated from field: string key_file_path = 1;
     */
    keyFilePath: string;
    /**
     * Service account key JSON content (alternative to file path)
     *
     * @generated from field: string key_json = 2;
     */
    keyJson: string;
    /**
     * Project ID associated with the service account
     *
     * @generated from field: string project_id = 3;
     */
    projectId: string;
};
/**
 * Describes the message integration.tabular.v1.ServiceAccountAuth.
 * Use `create(ServiceAccountAuthSchema)` to create a new message.
 */
export declare const ServiceAccountAuthSchema: GenMessage<ServiceAccountAuth>;
/**
 * CsvAuth represents CSV/file-based data source authentication
 *
 * @generated from message integration.tabular.v1.CsvAuth
 */
export type CsvAuth = Message<"integration.tabular.v1.CsvAuth"> & {
    /**
     * Base path for CSV files
     *
     * @generated from field: string base_path = 1;
     */
    basePath: string;
    /**
     * Whether access is read-only
     *
     * @generated from field: bool read_only = 2;
     */
    readOnly: boolean;
};
/**
 * Describes the message integration.tabular.v1.CsvAuth.
 * Use `create(CsvAuthSchema)` to create a new message.
 */
export declare const CsvAuthSchema: GenMessage<CsvAuth>;
/**
 * CustomAuth represents custom authentication methods
 *
 * @generated from message integration.tabular.v1.CustomAuth
 */
export type CustomAuth = Message<"integration.tabular.v1.CustomAuth"> & {
    /**
     * Authentication type identifier
     *
     * @generated from field: string auth_type = 1;
     */
    authType: string;
    /**
     * Credentials as key-value pairs
     *
     * @generated from field: map<string, string> credentials = 2;
     */
    credentials: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.tabular.v1.CustomAuth.
 * Use `create(CustomAuthSchema)` to create a new message.
 */
export declare const CustomAuthSchema: GenMessage<CustomAuth>;
/**
 * TabularProviderHealthStatus represents the health status of a tabular provider
 *
 * @generated from message integration.tabular.v1.TabularProviderHealthStatus
 */
export type TabularProviderHealthStatus = Message<"integration.tabular.v1.TabularProviderHealthStatus"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.tabular.v1.TabularProviderType provider_type = 2;
     */
    providerType: TabularProviderType;
    /**
     * Whether the provider is healthy and operational
     *
     * @generated from field: bool is_healthy = 3;
     */
    isHealthy: boolean;
    /**
     * Last health check timestamp
     *
     * @generated from field: google.protobuf.Timestamp last_check = 4;
     */
    lastCheck?: Timestamp;
    /**
     * Error message if provider is unhealthy
     *
     * @generated from field: string error_message = 5;
     */
    errorMessage: string;
    /**
     * Response latency in milliseconds
     *
     * @generated from field: int64 latency_ms = 6;
     */
    latencyMs: bigint;
};
/**
 * Describes the message integration.tabular.v1.TabularProviderHealthStatus.
 * Use `create(TabularProviderHealthStatusSchema)` to create a new message.
 */
export declare const TabularProviderHealthStatusSchema: GenMessage<TabularProviderHealthStatus>;
/**
 * TabularRateLimits represents rate limiting information for a provider
 *
 * @generated from message integration.tabular.v1.TabularRateLimits
 */
export type TabularRateLimits = Message<"integration.tabular.v1.TabularRateLimits"> & {
    /**
     * Maximum requests allowed per minute
     *
     * @generated from field: int32 requests_per_minute = 1;
     */
    requestsPerMinute: number;
    /**
     * Maximum requests allowed per day
     *
     * @generated from field: int32 requests_per_day = 2;
     */
    requestsPerDay: number;
    /**
     * Remaining requests in current window
     *
     * @generated from field: int32 remaining_requests = 3;
     */
    remainingRequests: number;
    /**
     * Timestamp when rate limit resets
     *
     * @generated from field: google.protobuf.Timestamp reset_time = 4;
     */
    resetTime?: Timestamp;
};
/**
 * Describes the message integration.tabular.v1.TabularRateLimits.
 * Use `create(TabularRateLimitsSchema)` to create a new message.
 */
export declare const TabularRateLimitsSchema: GenMessage<TabularRateLimits>;
