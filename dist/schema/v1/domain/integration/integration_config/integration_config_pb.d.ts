import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/integration/integration_config/integration_config.proto.
 */
export declare const file_domain_integration_integration_config_integration_config: GenFile;
/**
 * IntegrationConfig stores a workspace's connection to a third-party provider.
 * This is the internal business entity — NOT the external API contract.
 * Each record represents one connected provider for one workspace.
 *
 * @generated from message domain.integration.v1.IntegrationConfig
 */
export type IntegrationConfig = Message<"domain.integration.v1.IntegrationConfig"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Integration category (scheduler, fulfillment, payment, video)
     *
     * @generated from field: string integration_type = 3;
     */
    integrationType: string;
    /**
     * Provider identifier (calendly, lalamove, google_calendar, zoom)
     *
     * @generated from field: string provider_id = 4;
     */
    providerId: string;
    /**
     * Human-readable display name (e.g., "My Calendly Account")
     *
     * @generated from field: string display_name = 5;
     */
    displayName: string;
    /**
     * Whether this integration is currently enabled
     *
     * @generated from field: bool enabled = 6;
     */
    enabled: boolean;
    /**
     * Provider-specific configuration (API keys, OAuth tokens, defaults)
     * Stored as JSON — structure varies by provider
     *
     * @generated from field: google.protobuf.Struct config_data = 7;
     */
    configData?: JsonObject;
    /**
     * Webhook URL for receiving callbacks from this provider
     *
     * @generated from field: optional string webhook_url = 8;
     */
    webhookUrl?: string;
    /**
     * Webhook signing secret for verification
     *
     * @generated from field: optional string webhook_secret = 9;
     */
    webhookSecret?: string;
    /**
     * Health monitoring
     *
     * maps to IntegrationHealthStatus
     *
     * @generated from field: string health_status = 10;
     */
    healthStatus: string;
    /**
     * @generated from field: optional int64 last_health_check = 11;
     */
    lastHealthCheck?: bigint;
    /**
     * @generated from field: optional string health_message = 12;
     */
    healthMessage?: string;
    /**
     * Audit
     *
     * @generated from field: string created_by = 13;
     */
    createdBy: string;
    /**
     * @generated from field: optional int64 date_created = 14;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional int64 date_modified = 15;
     */
    dateModified?: bigint;
    /**
     * @generated from field: bool active = 16;
     */
    active: boolean;
};
/**
 * Describes the message domain.integration.v1.IntegrationConfig.
 * Use `create(IntegrationConfigSchema)` to create a new message.
 */
export declare const IntegrationConfigSchema: GenMessage<IntegrationConfig>;
/**
 * IntegrationType represents the category of integration
 *
 * @generated from enum domain.integration.v1.IntegrationType
 */
export declare enum IntegrationType {
    /**
     * @generated from enum value: INTEGRATION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Calendly, Google Calendar, Microsoft Calendar
     *
     * @generated from enum value: INTEGRATION_TYPE_SCHEDULER = 1;
     */
    SCHEDULER = 1,
    /**
     * Lalamove, GrabExpress
     *
     * @generated from enum value: INTEGRATION_TYPE_FULFILLMENT = 2;
     */
    FULFILLMENT = 2,
    /**
     * AsiaPay, Stripe (future)
     *
     * @generated from enum value: INTEGRATION_TYPE_PAYMENT = 3;
     */
    PAYMENT = 3,
    /**
     * Zoom, Google Meet (future)
     *
     * @generated from enum value: INTEGRATION_TYPE_VIDEO = 4;
     */
    VIDEO = 4
}
/**
 * Describes the enum domain.integration.v1.IntegrationType.
 */
export declare const IntegrationTypeSchema: GenEnum<IntegrationType>;
/**
 * IntegrationHealthStatus represents provider health
 *
 * @generated from enum domain.integration.v1.IntegrationHealthStatus
 */
export declare enum IntegrationHealthStatus {
    /**
     * @generated from enum value: INTEGRATION_HEALTH_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: INTEGRATION_HEALTH_STATUS_HEALTHY = 1;
     */
    HEALTHY = 1,
    /**
     * @generated from enum value: INTEGRATION_HEALTH_STATUS_UNHEALTHY = 2;
     */
    UNHEALTHY = 2,
    /**
     * @generated from enum value: INTEGRATION_HEALTH_STATUS_UNKNOWN = 3;
     */
    UNKNOWN = 3,
    /**
     * @generated from enum value: INTEGRATION_HEALTH_STATUS_NOT_CONFIGURED = 4;
     */
    NOT_CONFIGURED = 4
}
/**
 * Describes the enum domain.integration.v1.IntegrationHealthStatus.
 */
export declare const IntegrationHealthStatusSchema: GenEnum<IntegrationHealthStatus>;
