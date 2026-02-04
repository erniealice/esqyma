import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { PaymentCapability, PaymentProviderType } from "./payment_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/payment/provider.proto.
 */
export declare const file_integration_payment_provider: GenFile;
/**
 * PaymentProviderConfig represents payment provider configuration
 *
 * @generated from message integration.payment.v1.PaymentProviderConfig
 */
export type PaymentProviderConfig = Message<"integration.payment.v1.PaymentProviderConfig"> & {
    /**
     * Unique provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.payment.v1.PaymentProviderType provider_type = 2;
     */
    providerType: PaymentProviderType;
    /**
     * Whether provider is enabled
     *
     * @generated from field: bool enabled = 3;
     */
    enabled: boolean;
    /**
     * Display name
     *
     * @generated from field: string display_name = 4;
     */
    displayName: string;
    /**
     * Supported capabilities
     *
     * @generated from field: repeated integration.payment.v1.PaymentCapability capabilities = 5;
     */
    capabilities: PaymentCapability[];
    /**
     * Supported currencies
     *
     * @generated from field: repeated string supported_currencies = 6;
     */
    supportedCurrencies: string[];
    /**
     * Default currency
     *
     * @generated from field: string default_currency = 7;
     */
    defaultCurrency: string;
    /**
     * API endpoint (production)
     *
     * @generated from field: string api_endpoint = 8;
     */
    apiEndpoint: string;
    /**
     * API endpoint (sandbox/test)
     *
     * @generated from field: string sandbox_endpoint = 9;
     */
    sandboxEndpoint: string;
    /**
     * Whether to use sandbox mode
     *
     * @generated from field: bool sandbox_mode = 10;
     */
    sandboxMode: boolean;
    /**
     * Authentication configuration
     *
     * @generated from oneof integration.payment.v1.PaymentProviderConfig.auth
     */
    auth: {
        /**
         * @generated from field: integration.payment.v1.ApiKeyAuth api_key_auth = 20;
         */
        value: ApiKeyAuth;
        case: "apiKeyAuth";
    } | {
        /**
         * @generated from field: integration.payment.v1.AsiaPayAuth asiapay_auth = 21;
         */
        value: AsiaPayAuth;
        case: "asiapayAuth";
    } | {
        /**
         * @generated from field: integration.payment.v1.OAuth2Auth oauth2_auth = 22;
         */
        value: OAuth2Auth;
        case: "oauth2Auth";
    } | {
        /**
         * @generated from field: integration.payment.v1.CustomAuth custom_auth = 23;
         */
        value: CustomAuth;
        case: "customAuth";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * Webhook configuration
     *
     * @generated from field: integration.payment.v1.WebhookConfig webhook_config = 30;
     */
    webhookConfig?: WebhookConfig;
    /**
     * Redirect URL templates
     *
     * @generated from field: integration.payment.v1.RedirectUrls redirect_urls = 31;
     */
    redirectUrls?: RedirectUrls;
    /**
     * Request timeout in seconds
     *
     * @generated from field: int32 timeout_seconds = 40;
     */
    timeoutSeconds: number;
    /**
     * Max retry attempts
     *
     * @generated from field: int32 max_retries = 41;
     */
    maxRetries: number;
    /**
     * Provider-specific settings
     *
     * @generated from field: map<string, string> settings = 50;
     */
    settings: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.payment.v1.PaymentProviderConfig.
 * Use `create(PaymentProviderConfigSchema)` to create a new message.
 */
export declare const PaymentProviderConfigSchema: GenMessage<PaymentProviderConfig>;
/**
 * ApiKeyAuth for simple API key authentication
 *
 * @generated from message integration.payment.v1.ApiKeyAuth
 */
export type ApiKeyAuth = Message<"integration.payment.v1.ApiKeyAuth"> & {
    /**
     * @generated from field: string api_key = 1;
     */
    apiKey: string;
    /**
     * @generated from field: string api_secret = 2;
     */
    apiSecret: string;
};
/**
 * Describes the message integration.payment.v1.ApiKeyAuth.
 * Use `create(ApiKeyAuthSchema)` to create a new message.
 */
export declare const ApiKeyAuthSchema: GenMessage<ApiKeyAuth>;
/**
 * AsiaPayAuth for AsiaPay-specific authentication
 *
 * @generated from message integration.payment.v1.AsiaPayAuth
 */
export type AsiaPayAuth = Message<"integration.payment.v1.AsiaPayAuth"> & {
    /**
     * Merchant ID
     *
     * @generated from field: string merchant_id = 1;
     */
    merchantId: string;
    /**
     * Secure hash secret
     *
     * @generated from field: string secure_secret = 2;
     */
    secureSecret: string;
    /**
     * Currency code (numeric: 608=PHP, 344=HKD, 840=USD)
     *
     * @generated from field: string currency_code = 3;
     */
    currencyCode: string;
    /**
     * Payment type (N=Normal, H=Hold)
     *
     * @generated from field: string payment_type = 4;
     */
    paymentType: string;
    /**
     * Language (E=English)
     *
     * @generated from field: string language = 5;
     */
    language: string;
    /**
     * Payment method filter
     *
     * @generated from field: string payment_method = 6;
     */
    paymentMethod: string;
};
/**
 * Describes the message integration.payment.v1.AsiaPayAuth.
 * Use `create(AsiaPayAuthSchema)` to create a new message.
 */
export declare const AsiaPayAuthSchema: GenMessage<AsiaPayAuth>;
/**
 * OAuth2Auth for OAuth-based providers
 *
 * @generated from message integration.payment.v1.OAuth2Auth
 */
export type OAuth2Auth = Message<"integration.payment.v1.OAuth2Auth"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * @generated from field: string client_secret = 2;
     */
    clientSecret: string;
    /**
     * @generated from field: string access_token = 3;
     */
    accessToken: string;
    /**
     * @generated from field: string refresh_token = 4;
     */
    refreshToken: string;
    /**
     * @generated from field: string token_endpoint = 5;
     */
    tokenEndpoint: string;
    /**
     * @generated from field: repeated string scopes = 6;
     */
    scopes: string[];
};
/**
 * Describes the message integration.payment.v1.OAuth2Auth.
 * Use `create(OAuth2AuthSchema)` to create a new message.
 */
export declare const OAuth2AuthSchema: GenMessage<OAuth2Auth>;
/**
 * CustomAuth for non-standard authentication
 *
 * @generated from message integration.payment.v1.CustomAuth
 */
export type CustomAuth = Message<"integration.payment.v1.CustomAuth"> & {
    /**
     * @generated from field: string auth_type = 1;
     */
    authType: string;
    /**
     * @generated from field: map<string, string> credentials = 2;
     */
    credentials: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.payment.v1.CustomAuth.
 * Use `create(CustomAuthSchema)` to create a new message.
 */
export declare const CustomAuthSchema: GenMessage<CustomAuth>;
/**
 * WebhookConfig for webhook settings
 *
 * @generated from message integration.payment.v1.WebhookConfig
 */
export type WebhookConfig = Message<"integration.payment.v1.WebhookConfig"> & {
    /**
     * Webhook endpoint path
     *
     * @generated from field: string endpoint_path = 1;
     */
    endpointPath: string;
    /**
     * Secret for signature verification
     *
     * @generated from field: string signing_secret = 2;
     */
    signingSecret: string;
    /**
     * Verification method (hmac_sha256, etc.)
     *
     * @generated from field: string verification_method = 3;
     */
    verificationMethod: string;
    /**
     * Events to subscribe
     *
     * @generated from field: repeated string subscribed_events = 4;
     */
    subscribedEvents: string[];
};
/**
 * Describes the message integration.payment.v1.WebhookConfig.
 * Use `create(WebhookConfigSchema)` to create a new message.
 */
export declare const WebhookConfigSchema: GenMessage<WebhookConfig>;
/**
 * RedirectUrls for payment flow redirects
 *
 * @generated from message integration.payment.v1.RedirectUrls
 */
export type RedirectUrls = Message<"integration.payment.v1.RedirectUrls"> & {
    /**
     * Base URL for redirects
     *
     * @generated from field: string base_url = 1;
     */
    baseUrl: string;
    /**
     * Success page path
     *
     * @generated from field: string success_path = 2;
     */
    successPath: string;
    /**
     * Failure page path
     *
     * @generated from field: string failure_path = 3;
     */
    failurePath: string;
    /**
     * Cancel page path
     *
     * @generated from field: string cancel_path = 4;
     */
    cancelPath: string;
    /**
     * Webhook/datafeed path
     *
     * @generated from field: string webhook_path = 5;
     */
    webhookPath: string;
};
/**
 * Describes the message integration.payment.v1.RedirectUrls.
 * Use `create(RedirectUrlsSchema)` to create a new message.
 */
export declare const RedirectUrlsSchema: GenMessage<RedirectUrls>;
/**
 * ProviderHealthStatus for health monitoring
 *
 * @generated from message integration.payment.v1.ProviderHealthStatus
 */
export type ProviderHealthStatus = Message<"integration.payment.v1.ProviderHealthStatus"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: bool is_healthy = 2;
     */
    isHealthy: boolean;
    /**
     * @generated from field: string status_message = 3;
     */
    statusMessage: string;
    /**
     * @generated from field: int64 response_time_ms = 4;
     */
    responseTimeMs: bigint;
    /**
     * @generated from field: map<string, string> details = 5;
     */
    details: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.payment.v1.ProviderHealthStatus.
 * Use `create(ProviderHealthStatusSchema)` to create a new message.
 */
export declare const ProviderHealthStatusSchema: GenMessage<ProviderHealthStatus>;
