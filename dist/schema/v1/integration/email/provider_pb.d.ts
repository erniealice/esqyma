import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Any, Timestamp } from "@bufbuild/protobuf/wkt";
import type { EmailCapability, EmailProviderType } from "./email_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/email/provider.proto.
 */
export declare const file_integration_email_provider: GenFile;
/**
 * EmailProviderConfig represents generic email provider configuration
 * The hexagonal architecture adapters will handle provider-specific implementation details
 *
 * @generated from message integration.email.v1.EmailProviderConfig
 */
export type EmailProviderConfig = Message<"integration.email.v1.EmailProviderConfig"> & {
    /**
     * Unique provider identifier (e.g., "sendgrid", "gmail", "office365", "custom-smtp")
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type category
     *
     * @generated from field: integration.email.v1.EmailProviderType provider_type = 2;
     */
    providerType: EmailProviderType;
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
     * @generated from field: repeated integration.email.v1.EmailCapability capabilities = 5;
     */
    capabilities: EmailCapability[];
    /**
     * Default from address
     *
     * @generated from field: string default_from_address = 6;
     */
    defaultFromAddress: string;
    /**
     * Default from name
     *
     * @generated from field: string default_from_name = 7;
     */
    defaultFromName: string;
    /**
     * Default reply-to address
     *
     * @generated from field: string default_reply_to = 8;
     */
    defaultReplyTo: string;
    /**
     * Authentication configuration
     *
     * @generated from oneof integration.email.v1.EmailProviderConfig.auth
     */
    auth: {
        /**
         * @generated from field: integration.email.v1.ApiKeyAuth api_key_auth = 10;
         */
        value: ApiKeyAuth;
        case: "apiKeyAuth";
    } | {
        /**
         * @generated from field: integration.email.v1.OAuth2Auth oauth2_auth = 11;
         */
        value: OAuth2Auth;
        case: "oauth2Auth";
    } | {
        /**
         * @generated from field: integration.email.v1.SmtpAuth smtp_auth = 12;
         */
        value: SmtpAuth;
        case: "smtpAuth";
    } | {
        /**
         * @generated from field: integration.email.v1.CustomAuth custom_auth = 13;
         */
        value: CustomAuth;
        case: "customAuth";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * API endpoint (for API-based providers)
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
     * Provider-specific settings as key-value pairs
     * Examples: "enable_tracking": "true", "ip_pool": "marketing", "sandbox": "false"
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
 * Describes the message integration.email.v1.EmailProviderConfig.
 * Use `create(EmailProviderConfigSchema)` to create a new message.
 */
export declare const EmailProviderConfigSchema: GenMessage<EmailProviderConfig>;
/**
 * ApiKeyAuth represents API key based authentication
 *
 * @generated from message integration.email.v1.ApiKeyAuth
 */
export type ApiKeyAuth = Message<"integration.email.v1.ApiKeyAuth"> & {
    /**
     * API key for authentication
     *
     * @generated from field: string api_key = 1;
     */
    apiKey: string;
    /**
     * Optional: Key name/identifier (if provider uses named keys)
     *
     * @generated from field: string key_name = 2;
     */
    keyName: string;
    /**
     * Optional: Key in header or query parameter
     *
     * @generated from field: integration.email.v1.AuthLocation location = 3;
     */
    location: AuthLocation;
    /**
     * Header name or query parameter name (e.g., "Authorization", "X-API-Key")
     *
     * @generated from field: string parameter_name = 4;
     */
    parameterName: string;
    /**
     * Optional prefix (e.g., "Bearer ", "ApiKey ")
     *
     * @generated from field: string prefix = 5;
     */
    prefix: string;
};
/**
 * Describes the message integration.email.v1.ApiKeyAuth.
 * Use `create(ApiKeyAuthSchema)` to create a new message.
 */
export declare const ApiKeyAuthSchema: GenMessage<ApiKeyAuth>;
/**
 * OAuth2Auth represents OAuth 2.0 based authentication
 *
 * @generated from message integration.email.v1.OAuth2Auth
 */
export type OAuth2Auth = Message<"integration.email.v1.OAuth2Auth"> & {
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
     * Tenant/domain identifier (e.g., for Azure AD, Google Workspace)
     *
     * @generated from field: string tenant_id = 9;
     */
    tenantId: string;
    /**
     * Delegated user email (for domain-wide delegation scenarios)
     *
     * @generated from field: string delegated_email = 10;
     */
    delegatedEmail: string;
    /**
     * Service account key (for service account authentication)
     *
     * @generated from field: string service_account_key = 11;
     */
    serviceAccountKey: string;
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
 * Describes the message integration.email.v1.OAuth2Auth.
 * Use `create(OAuth2AuthSchema)` to create a new message.
 */
export declare const OAuth2AuthSchema: GenMessage<OAuth2Auth>;
/**
 * SmtpAuth represents SMTP authentication
 *
 * @generated from message integration.email.v1.SmtpAuth
 */
export type SmtpAuth = Message<"integration.email.v1.SmtpAuth"> & {
    /**
     * SMTP server host
     *
     * @generated from field: string host = 1;
     */
    host: string;
    /**
     * SMTP server port (typically 25, 587, or 465)
     *
     * @generated from field: int32 port = 2;
     */
    port: number;
    /**
     * Username for authentication
     *
     * @generated from field: string username = 3;
     */
    username: string;
    /**
     * Password for authentication
     *
     * @generated from field: string password = 4;
     */
    password: string;
    /**
     * Whether to use TLS
     *
     * @generated from field: bool use_tls = 5;
     */
    useTls: boolean;
    /**
     * Whether to use STARTTLS
     *
     * @generated from field: bool use_starttls = 6;
     */
    useStarttls: boolean;
    /**
     * Skip certificate verification (for testing only)
     *
     * @generated from field: bool skip_verify = 7;
     */
    skipVerify: boolean;
    /**
     * From email address
     *
     * @generated from field: string from_email = 8;
     */
    fromEmail: string;
    /**
     * From name
     *
     * @generated from field: string from_name = 9;
     */
    fromName: string;
};
/**
 * Describes the message integration.email.v1.SmtpAuth.
 * Use `create(SmtpAuthSchema)` to create a new message.
 */
export declare const SmtpAuthSchema: GenMessage<SmtpAuth>;
/**
 * CustomAuth represents custom authentication methods
 * Use this for providers with non-standard authentication
 *
 * @generated from message integration.email.v1.CustomAuth
 */
export type CustomAuth = Message<"integration.email.v1.CustomAuth"> & {
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
 * Describes the message integration.email.v1.CustomAuth.
 * Use `create(CustomAuthSchema)` to create a new message.
 */
export declare const CustomAuthSchema: GenMessage<CustomAuth>;
/**
 * ProviderHealthStatus represents the health status of a provider
 *
 * @generated from message integration.email.v1.ProviderHealthStatus
 */
export type ProviderHealthStatus = Message<"integration.email.v1.ProviderHealthStatus"> & {
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
     * Additional health details
     *
     * @generated from field: map<string, string> details = 7;
     */
    details: {
        [key: string]: string;
    };
    /**
     * Response time in milliseconds (for health check)
     *
     * @generated from field: int64 response_time_ms = 8;
     */
    responseTimeMs: bigint;
};
/**
 * Describes the message integration.email.v1.ProviderHealthStatus.
 * Use `create(ProviderHealthStatusSchema)` to create a new message.
 */
export declare const ProviderHealthStatusSchema: GenMessage<ProviderHealthStatus>;
/**
 * AuthLocation specifies where to place authentication credentials
 *
 * @generated from enum integration.email.v1.AuthLocation
 */
export declare enum AuthLocation {
    /**
     * @generated from enum value: AUTH_LOCATION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * In HTTP header
     *
     * @generated from enum value: AUTH_LOCATION_HEADER = 1;
     */
    HEADER = 1,
    /**
     * In query parameter
     *
     * @generated from enum value: AUTH_LOCATION_QUERY = 2;
     */
    QUERY = 2,
    /**
     * In request body
     *
     * @generated from enum value: AUTH_LOCATION_BODY = 3;
     */
    BODY = 3
}
/**
 * Describes the enum integration.email.v1.AuthLocation.
 */
export declare const AuthLocationSchema: GenEnum<AuthLocation>;
