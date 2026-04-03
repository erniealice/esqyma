import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Any, Timestamp } from "@bufbuild/protobuf/wkt";
import type { DatasheetCapability, DatasheetProviderType } from "./datasheet_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/datasheet/provider.proto.
 */
export declare const file_integration_datasheet_provider: GenFile;
/**
 * DatasheetProviderConfig represents generic datasheet provider configuration
 * The hexagonal architecture adapters will handle provider-specific implementation details
 *
 * @generated from message integration.datasheet.v1.DatasheetProviderConfig
 */
export type DatasheetProviderConfig = Message<"integration.datasheet.v1.DatasheetProviderConfig"> & {
    /**
     * Unique provider identifier (e.g., "google-sheets", "excel-online", "airtable")
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type category
     *
     * @generated from field: integration.datasheet.v1.DatasheetProviderType provider_type = 2;
     */
    providerType: DatasheetProviderType;
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
     * @generated from field: repeated integration.datasheet.v1.DatasheetCapability capabilities = 5;
     */
    capabilities: DatasheetCapability[];
    /**
     * Authentication configuration
     *
     * @generated from oneof integration.datasheet.v1.DatasheetProviderConfig.auth
     */
    auth: {
        /**
         * @generated from field: integration.datasheet.v1.GoogleSheetsAuth google_sheets_auth = 10;
         */
        value: GoogleSheetsAuth;
        case: "googleSheetsAuth";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.OAuth2Auth oauth2_auth = 11;
         */
        value: OAuth2Auth;
        case: "oauth2Auth";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.ApiKeyAuth api_key_auth = 12;
         */
        value: ApiKeyAuth;
        case: "apiKeyAuth";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.AirtableAuth airtable_auth = 13;
         */
        value: AirtableAuth;
        case: "airtableAuth";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.CustomAuth custom_auth = 14;
         */
        value: CustomAuth;
        case: "customAuth";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * API endpoint (for providers with configurable endpoints)
     *
     * @generated from field: string api_endpoint = 20;
     */
    apiEndpoint: string;
    /**
     * Request timeout in seconds
     *
     * @generated from field: int32 timeout_seconds = 21;
     */
    timeoutSeconds: number;
    /**
     * Maximum retry attempts for failed requests
     *
     * @generated from field: int32 max_retries = 22;
     */
    maxRetries: number;
    /**
     * Retry backoff multiplier (in milliseconds)
     *
     * @generated from field: int32 retry_backoff_ms = 23;
     */
    retryBackoffMs: number;
    /**
     * Default spreadsheet ID (for operations that don't specify one)
     *
     * @generated from field: string default_spreadsheet_id = 24;
     */
    defaultSpreadsheetId: string;
    /**
     * Default sheet name
     *
     * @generated from field: string default_sheet_name = 25;
     */
    defaultSheetName: string;
    /**
     * Provider-specific settings as key-value pairs
     * Examples: "batch_size": "100", "include_formulas": "true"
     *
     * @generated from field: map<string, string> settings = 30;
     */
    settings: {
        [key: string]: string;
    };
    /**
     * Provider-specific complex configuration data
     * Use this for nested structures that don't fit in simple key-value pairs
     *
     * @generated from field: map<string, google.protobuf.Any> extended_config = 31;
     */
    extendedConfig: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.datasheet.v1.DatasheetProviderConfig.
 * Use `create(DatasheetProviderConfigSchema)` to create a new message.
 */
export declare const DatasheetProviderConfigSchema: GenMessage<DatasheetProviderConfig>;
/**
 * GoogleSheetsAuth represents Google Sheets API authentication
 *
 * @generated from message integration.datasheet.v1.GoogleSheetsAuth
 */
export type GoogleSheetsAuth = Message<"integration.datasheet.v1.GoogleSheetsAuth"> & {
    /**
     * Service account JSON key content (base64 encoded or JSON string)
     *
     * @generated from field: string service_account_key = 1;
     */
    serviceAccountKey: string;
    /**
     * Path to service account JSON key file (alternative to key content)
     *
     * @generated from field: string service_account_key_path = 2;
     */
    serviceAccountKeyPath: string;
    /**
     * Delegated email for domain-wide delegation
     *
     * @generated from field: string delegated_email = 3;
     */
    delegatedEmail: string;
    /**
     * OAuth2 scopes to request
     *
     * @generated from field: repeated string scopes = 4;
     */
    scopes: string[];
    /**
     * Google Cloud project ID
     *
     * @generated from field: string project_id = 5;
     */
    projectId: string;
    /**
     * API key (for public sheets, read-only access)
     *
     * @generated from field: string api_key = 6;
     */
    apiKey: string;
    /**
     * OAuth2 credentials (alternative to service account)
     *
     * @generated from field: integration.datasheet.v1.GoogleOAuth2Credentials oauth2_credentials = 7;
     */
    oauth2Credentials?: GoogleOAuth2Credentials;
};
/**
 * Describes the message integration.datasheet.v1.GoogleSheetsAuth.
 * Use `create(GoogleSheetsAuthSchema)` to create a new message.
 */
export declare const GoogleSheetsAuthSchema: GenMessage<GoogleSheetsAuth>;
/**
 * GoogleOAuth2Credentials represents OAuth2 credentials for Google Sheets
 *
 * @generated from message integration.datasheet.v1.GoogleOAuth2Credentials
 */
export type GoogleOAuth2Credentials = Message<"integration.datasheet.v1.GoogleOAuth2Credentials"> & {
    /**
     * OAuth2 access token
     *
     * @generated from field: string access_token = 1;
     */
    accessToken: string;
    /**
     * OAuth2 refresh token
     *
     * @generated from field: string refresh_token = 2;
     */
    refreshToken: string;
    /**
     * Client ID
     *
     * @generated from field: string client_id = 3;
     */
    clientId: string;
    /**
     * Client secret
     *
     * @generated from field: string client_secret = 4;
     */
    clientSecret: string;
    /**
     * Token expiry timestamp
     *
     * @generated from field: google.protobuf.Timestamp token_expiry = 5;
     */
    tokenExpiry?: Timestamp;
};
/**
 * Describes the message integration.datasheet.v1.GoogleOAuth2Credentials.
 * Use `create(GoogleOAuth2CredentialsSchema)` to create a new message.
 */
export declare const GoogleOAuth2CredentialsSchema: GenMessage<GoogleOAuth2Credentials>;
/**
 * OAuth2Auth represents generic OAuth 2.0 based authentication
 * Used for Microsoft Excel Online / Graph API and similar providers
 *
 * @generated from message integration.datasheet.v1.OAuth2Auth
 */
export type OAuth2Auth = Message<"integration.datasheet.v1.OAuth2Auth"> & {
    /**
     * OAuth 2.0 access token
     *
     * @generated from field: string access_token = 1;
     */
    accessToken: string;
    /**
     * OAuth 2.0 refresh token
     *
     * @generated from field: string refresh_token = 2;
     */
    refreshToken: string;
    /**
     * Client ID
     *
     * @generated from field: string client_id = 3;
     */
    clientId: string;
    /**
     * Client secret
     *
     * @generated from field: string client_secret = 4;
     */
    clientSecret: string;
    /**
     * Token endpoint for refreshing tokens
     *
     * @generated from field: string token_endpoint = 5;
     */
    tokenEndpoint: string;
    /**
     * Authorization endpoint (for initial OAuth flow)
     *
     * @generated from field: string authorization_endpoint = 6;
     */
    authorizationEndpoint: string;
    /**
     * Redirect URL for OAuth callback
     *
     * @generated from field: string redirect_url = 7;
     */
    redirectUrl: string;
    /**
     * Scopes requested/granted
     *
     * @generated from field: repeated string scopes = 8;
     */
    scopes: string[];
    /**
     * Tenant/domain identifier (e.g., for Azure AD)
     *
     * @generated from field: string tenant_id = 9;
     */
    tenantId: string;
    /**
     * Token expiry timestamp
     *
     * @generated from field: google.protobuf.Timestamp token_expiry = 10;
     */
    tokenExpiry?: Timestamp;
    /**
     * Resource URL (for Microsoft Graph API)
     *
     * @generated from field: string resource = 11;
     */
    resource: string;
    /**
     * Additional OAuth parameters
     *
     * @generated from field: map<string, string> additional_params = 20;
     */
    additionalParams: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.OAuth2Auth.
 * Use `create(OAuth2AuthSchema)` to create a new message.
 */
export declare const OAuth2AuthSchema: GenMessage<OAuth2Auth>;
/**
 * ApiKeyAuth represents API key based authentication
 *
 * @generated from message integration.datasheet.v1.ApiKeyAuth
 */
export type ApiKeyAuth = Message<"integration.datasheet.v1.ApiKeyAuth"> & {
    /**
     * API key for authentication
     *
     * @generated from field: string api_key = 1;
     */
    apiKey: string;
    /**
     * API endpoint/base URL
     *
     * @generated from field: string api_endpoint = 2;
     */
    apiEndpoint: string;
    /**
     * Header name for API key (e.g., "Authorization", "X-API-Key")
     *
     * @generated from field: string header_name = 3;
     */
    headerName: string;
    /**
     * Header value prefix (e.g., "Bearer ", "ApiKey ")
     *
     * @generated from field: string header_prefix = 4;
     */
    headerPrefix: string;
    /**
     * Additional headers to include
     *
     * @generated from field: map<string, string> additional_headers = 5;
     */
    additionalHeaders: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.ApiKeyAuth.
 * Use `create(ApiKeyAuthSchema)` to create a new message.
 */
export declare const ApiKeyAuthSchema: GenMessage<ApiKeyAuth>;
/**
 * AirtableAuth represents Airtable-specific authentication
 *
 * @generated from message integration.datasheet.v1.AirtableAuth
 */
export type AirtableAuth = Message<"integration.datasheet.v1.AirtableAuth"> & {
    /**
     * Airtable API key (legacy) or Personal Access Token
     *
     * @generated from field: string api_key = 1;
     */
    apiKey: string;
    /**
     * Airtable base ID
     *
     * @generated from field: string base_id = 2;
     */
    baseId: string;
    /**
     * OAuth2 access token (for OAuth apps)
     *
     * @generated from field: string access_token = 3;
     */
    accessToken: string;
    /**
     * OAuth2 refresh token
     *
     * @generated from field: string refresh_token = 4;
     */
    refreshToken: string;
    /**
     * Token expiry timestamp
     *
     * @generated from field: google.protobuf.Timestamp token_expiry = 5;
     */
    tokenExpiry?: Timestamp;
    /**
     * Scopes for OAuth access
     *
     * @generated from field: repeated string scopes = 6;
     */
    scopes: string[];
};
/**
 * Describes the message integration.datasheet.v1.AirtableAuth.
 * Use `create(AirtableAuthSchema)` to create a new message.
 */
export declare const AirtableAuthSchema: GenMessage<AirtableAuth>;
/**
 * CustomAuth represents custom authentication methods
 * Use this for providers with non-standard authentication
 *
 * @generated from message integration.datasheet.v1.CustomAuth
 */
export type CustomAuth = Message<"integration.datasheet.v1.CustomAuth"> & {
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
    /**
     * Complex credential data
     *
     * @generated from field: map<string, google.protobuf.Any> extended_credentials = 3;
     */
    extendedCredentials: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.datasheet.v1.CustomAuth.
 * Use `create(CustomAuthSchema)` to create a new message.
 */
export declare const CustomAuthSchema: GenMessage<CustomAuth>;
/**
 * ProviderHealthStatus represents the health status of a datasheet provider
 *
 * @generated from message integration.datasheet.v1.ProviderHealthStatus
 */
export type ProviderHealthStatus = Message<"integration.datasheet.v1.ProviderHealthStatus"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Whether the provider is healthy and operational
     *
     * @generated from field: bool is_healthy = 2;
     */
    isHealthy: boolean;
    /**
     * Health status message
     *
     * @generated from field: string status_message = 3;
     */
    statusMessage: string;
    /**
     * Last successful connection timestamp
     *
     * @generated from field: google.protobuf.Timestamp last_success = 4;
     */
    lastSuccess?: Timestamp;
    /**
     * Last failed connection timestamp
     *
     * @generated from field: google.protobuf.Timestamp last_failure = 5;
     */
    lastFailure?: Timestamp;
    /**
     * Failure count since last success
     *
     * @generated from field: int32 failure_count = 6;
     */
    failureCount: number;
    /**
     * Response time in milliseconds (for health check)
     *
     * @generated from field: int64 response_time_ms = 7;
     */
    responseTimeMs: bigint;
    /**
     * Current rate limit status
     *
     * @generated from field: integration.datasheet.v1.RateLimitStatus rate_limit_status = 8;
     */
    rateLimitStatus?: RateLimitStatus;
    /**
     * Additional health details
     *
     * @generated from field: map<string, string> details = 9;
     */
    details: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.ProviderHealthStatus.
 * Use `create(ProviderHealthStatusSchema)` to create a new message.
 */
export declare const ProviderHealthStatusSchema: GenMessage<ProviderHealthStatus>;
/**
 * RateLimitStatus represents current rate limit information
 *
 * @generated from message integration.datasheet.v1.RateLimitStatus
 */
export type RateLimitStatus = Message<"integration.datasheet.v1.RateLimitStatus"> & {
    /**
     * Remaining requests in current window
     *
     * @generated from field: int32 remaining_requests = 1;
     */
    remainingRequests: number;
    /**
     * Total requests allowed in window
     *
     * @generated from field: int32 limit = 2;
     */
    limit: number;
    /**
     * Window reset timestamp
     *
     * @generated from field: google.protobuf.Timestamp reset_at = 3;
     */
    resetAt?: Timestamp;
    /**
     * Current usage percentage
     *
     * @generated from field: double usage_percentage = 4;
     */
    usagePercentage: number;
};
/**
 * Describes the message integration.datasheet.v1.RateLimitStatus.
 * Use `create(RateLimitStatusSchema)` to create a new message.
 */
export declare const RateLimitStatusSchema: GenMessage<RateLimitStatus>;
/**
 * ConnectionTestResult represents the result of a connection test
 *
 * @generated from message integration.datasheet.v1.ConnectionTestResult
 */
export type ConnectionTestResult = Message<"integration.datasheet.v1.ConnectionTestResult"> & {
    /**
     * Whether the connection test succeeded
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Test result message
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Connection latency in milliseconds
     *
     * @generated from field: int64 latency_ms = 3;
     */
    latencyMs: bigint;
    /**
     * Test spreadsheet ID (if test spreadsheet was used)
     *
     * @generated from field: string test_spreadsheet_id = 4;
     */
    testSpreadsheetId: string;
    /**
     * Provider version/API version
     *
     * @generated from field: string provider_version = 5;
     */
    providerVersion: string;
    /**
     * Detected capabilities during test
     *
     * @generated from field: repeated integration.datasheet.v1.DatasheetCapability detected_capabilities = 6;
     */
    detectedCapabilities: DatasheetCapability[];
    /**
     * Test timestamp
     *
     * @generated from field: google.protobuf.Timestamp tested_at = 7;
     */
    testedAt?: Timestamp;
    /**
     * Error details if test failed
     *
     * @generated from field: string error_details = 8;
     */
    errorDetails: string;
};
/**
 * Describes the message integration.datasheet.v1.ConnectionTestResult.
 * Use `create(ConnectionTestResultSchema)` to create a new message.
 */
export declare const ConnectionTestResultSchema: GenMessage<ConnectionTestResult>;
/**
 * ProviderMetadata represents metadata about a datasheet provider
 *
 * @generated from message integration.datasheet.v1.ProviderMetadata
 */
export type ProviderMetadata = Message<"integration.datasheet.v1.ProviderMetadata"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.datasheet.v1.DatasheetProviderType provider_type = 2;
     */
    providerType: DatasheetProviderType;
    /**
     * Provider display name
     *
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * Provider description
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * Provider documentation URL
     *
     * @generated from field: string documentation_url = 5;
     */
    documentationUrl: string;
    /**
     * Provider icon URL
     *
     * @generated from field: string icon_url = 6;
     */
    iconUrl: string;
    /**
     * Supported authentication methods
     *
     * @generated from field: repeated string supported_auth_methods = 7;
     */
    supportedAuthMethods: string[];
    /**
     * Maximum file size supported (in bytes)
     *
     * @generated from field: int64 max_file_size = 8;
     */
    maxFileSize: bigint;
    /**
     * Maximum cells per spreadsheet
     *
     * @generated from field: int64 max_cells = 9;
     */
    maxCells: bigint;
    /**
     * Maximum sheets per spreadsheet
     *
     * @generated from field: int32 max_sheets = 10;
     */
    maxSheets: number;
    /**
     * Supported export formats
     *
     * @generated from field: repeated string export_formats = 11;
     */
    exportFormats: string[];
    /**
     * Provider-specific limitations
     *
     * @generated from field: map<string, string> limitations = 12;
     */
    limitations: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.ProviderMetadata.
 * Use `create(ProviderMetadataSchema)` to create a new message.
 */
export declare const ProviderMetadataSchema: GenMessage<ProviderMetadata>;
