import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { DeliveryLocation, FulfillmentCapability, FulfillmentProviderType, VehicleType } from "./fulfillment_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/fulfillment/provider.proto.
 */
export declare const file_integration_fulfillment_provider: GenFile;
/**
 * FulfillmentProviderConfig represents fulfillment provider configuration.
 * This defines how to connect to a specific provider (API keys, endpoints, defaults).
 *
 * @generated from message integration.fulfillment.v1.FulfillmentProviderConfig
 */
export type FulfillmentProviderConfig = Message<"integration.fulfillment.v1.FulfillmentProviderConfig"> & {
    /**
     * Unique provider identifier (e.g., "lalamove", "grabexpress")
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.fulfillment.v1.FulfillmentProviderType provider_type = 2;
     */
    providerType: FulfillmentProviderType;
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
     * @generated from field: repeated integration.fulfillment.v1.FulfillmentCapability capabilities = 5;
     */
    capabilities: FulfillmentCapability[];
    /**
     * Supported vehicle types
     *
     * @generated from field: repeated integration.fulfillment.v1.VehicleType supported_vehicles = 6;
     */
    supportedVehicles: VehicleType[];
    /**
     * API endpoint (production)
     *
     * @generated from field: string api_endpoint = 7;
     */
    apiEndpoint: string;
    /**
     * API endpoint (sandbox/test)
     *
     * @generated from field: string sandbox_endpoint = 8;
     */
    sandboxEndpoint: string;
    /**
     * Whether to use sandbox mode
     *
     * @generated from field: bool sandbox_mode = 9;
     */
    sandboxMode: boolean;
    /**
     * Authentication
     *
     * @generated from oneof integration.fulfillment.v1.FulfillmentProviderConfig.auth
     */
    auth: {
        /**
         * @generated from field: integration.fulfillment.v1.ApiKeyAuth api_key_auth = 20;
         */
        value: ApiKeyAuth;
        case: "apiKeyAuth";
    } | {
        /**
         * @generated from field: integration.fulfillment.v1.OAuth2Auth oauth2_auth = 21;
         */
        value: OAuth2Auth;
        case: "oauth2Auth";
    } | {
        /**
         * @generated from field: integration.fulfillment.v1.HmacAuth hmac_auth = 22;
         */
        value: HmacAuth;
        case: "hmacAuth";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * Webhook configuration
     *
     * @generated from field: integration.fulfillment.v1.WebhookConfig webhook_config = 30;
     */
    webhookConfig?: WebhookConfig;
    /**
     * Default pickup location (for this workspace)
     *
     * @generated from field: integration.fulfillment.v1.DeliveryLocation default_pickup = 31;
     */
    defaultPickup?: DeliveryLocation;
    /**
     * Default vehicle type
     *
     * @generated from field: integration.fulfillment.v1.VehicleType default_vehicle = 32;
     */
    defaultVehicle: VehicleType;
    /**
     * Service area (coverage zone)
     *
     * @generated from field: string service_area = 33;
     */
    serviceArea: string;
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
 * Describes the message integration.fulfillment.v1.FulfillmentProviderConfig.
 * Use `create(FulfillmentProviderConfigSchema)` to create a new message.
 */
export declare const FulfillmentProviderConfigSchema: GenMessage<FulfillmentProviderConfig>;
/**
 * ApiKeyAuth for Lalamove-style HMAC API key authentication
 *
 * @generated from message integration.fulfillment.v1.ApiKeyAuth
 */
export type ApiKeyAuth = Message<"integration.fulfillment.v1.ApiKeyAuth"> & {
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
 * Describes the message integration.fulfillment.v1.ApiKeyAuth.
 * Use `create(ApiKeyAuthSchema)` to create a new message.
 */
export declare const ApiKeyAuthSchema: GenMessage<ApiKeyAuth>;
/**
 * OAuth2Auth for OAuth-based providers
 *
 * @generated from message integration.fulfillment.v1.OAuth2Auth
 */
export type OAuth2Auth = Message<"integration.fulfillment.v1.OAuth2Auth"> & {
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
 * Describes the message integration.fulfillment.v1.OAuth2Auth.
 * Use `create(OAuth2AuthSchema)` to create a new message.
 */
export declare const OAuth2AuthSchema: GenMessage<OAuth2Auth>;
/**
 * HmacAuth for HMAC-based providers (Lalamove uses this)
 *
 * @generated from message integration.fulfillment.v1.HmacAuth
 */
export type HmacAuth = Message<"integration.fulfillment.v1.HmacAuth"> & {
    /**
     * @generated from field: string api_key = 1;
     */
    apiKey: string;
    /**
     * @generated from field: string api_secret = 2;
     */
    apiSecret: string;
    /**
     * e.g., "SHA256"
     *
     * @generated from field: string hmac_algorithm = 3;
     */
    hmacAlgorithm: string;
};
/**
 * Describes the message integration.fulfillment.v1.HmacAuth.
 * Use `create(HmacAuthSchema)` to create a new message.
 */
export declare const HmacAuthSchema: GenMessage<HmacAuth>;
/**
 * WebhookConfig for webhook settings
 *
 * @generated from message integration.fulfillment.v1.WebhookConfig
 */
export type WebhookConfig = Message<"integration.fulfillment.v1.WebhookConfig"> & {
    /**
     * @generated from field: string endpoint_path = 1;
     */
    endpointPath: string;
    /**
     * @generated from field: string signing_secret = 2;
     */
    signingSecret: string;
    /**
     * @generated from field: string verification_method = 3;
     */
    verificationMethod: string;
    /**
     * @generated from field: repeated string subscribed_events = 4;
     */
    subscribedEvents: string[];
};
/**
 * Describes the message integration.fulfillment.v1.WebhookConfig.
 * Use `create(WebhookConfigSchema)` to create a new message.
 */
export declare const WebhookConfigSchema: GenMessage<WebhookConfig>;
/**
 * ProviderHealthStatus for health monitoring
 *
 * @generated from message integration.fulfillment.v1.ProviderHealthStatus
 */
export type ProviderHealthStatus = Message<"integration.fulfillment.v1.ProviderHealthStatus"> & {
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
 * Describes the message integration.fulfillment.v1.ProviderHealthStatus.
 * Use `create(ProviderHealthStatusSchema)` to create a new message.
 */
export declare const ProviderHealthStatusSchema: GenMessage<ProviderHealthStatus>;
