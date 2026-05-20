import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/integration/dashboard.proto.
 */
export declare const file_service_dashboard_integration_dashboard: GenFile;
/**
 * IntegrationStats are the four stat-card values for the integration
 * dashboard.
 *
 * @generated from message service.dashboard.integration.v1.IntegrationStats
 */
export type IntegrationStats = Message<"service.dashboard.integration.v1.IntegrationStats"> & {
    /**
     * @generated from field: int64 total_integrations = 1;
     */
    totalIntegrations: bigint;
    /**
     * @generated from field: int64 active_integrations = 2;
     */
    activeIntegrations: bigint;
    /**
     * @generated from field: int64 errors_last_24h = 3;
     */
    errorsLast24h: bigint;
    /**
     * @generated from field: int64 disconnected = 4;
     */
    disconnected: bigint;
};
/**
 * Describes the message service.dashboard.integration.v1.IntegrationStats.
 * Use `create(IntegrationStatsSchema)` to create a new message.
 */
export declare const IntegrationStatsSchema: GenMessage<IntegrationStats>;
/**
 * IntegrationProviderRow is one row of the "By provider" table widget.
 *
 * @generated from message service.dashboard.integration.v1.IntegrationProviderRow
 */
export type IntegrationProviderRow = Message<"service.dashboard.integration.v1.IntegrationProviderRow"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Status is "active" | "error" | "disconnected" — view-side renders a
     * badge class derived from this value.
     *
     * @generated from field: string status = 3;
     */
    status: string;
    /**
     * LastSyncMillis is unix milliseconds for the last sync; the view layer
     * formats it human-readably ("2 minutes ago", "Yesterday").
     *
     * @generated from field: int64 last_sync_millis = 4;
     */
    lastSyncMillis: bigint;
    /**
     * @generated from field: int64 events_last_7d = 5;
     */
    eventsLast7d: bigint;
};
/**
 * Describes the message service.dashboard.integration.v1.IntegrationProviderRow.
 * Use `create(IntegrationProviderRowSchema)` to create a new message.
 */
export declare const IntegrationProviderRowSchema: GenMessage<IntegrationProviderRow>;
/**
 * IntegrationErrorEntry is a single recent-error row for the "Recent errors"
 * list widget.
 *
 * @generated from message service.dashboard.integration.v1.IntegrationErrorEntry
 */
export type IntegrationErrorEntry = Message<"service.dashboard.integration.v1.IntegrationErrorEntry"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string provider = 2;
     */
    provider: string;
    /**
     * @generated from field: string message = 3;
     */
    message: string;
    /**
     * OccurredAtMillis is unix milliseconds; the view layer renders it
     * human-readably.
     *
     * @generated from field: int64 occurred_at_millis = 4;
     */
    occurredAtMillis: bigint;
};
/**
 * Describes the message service.dashboard.integration.v1.IntegrationErrorEntry.
 * Use `create(IntegrationErrorEntrySchema)` to create a new message.
 */
export declare const IntegrationErrorEntrySchema: GenMessage<IntegrationErrorEntry>;
/**
 * GetIntegrationDashboardRequest is the input for the integration dashboard
 * service-layer use case.
 *
 * @generated from message service.dashboard.integration.v1.GetIntegrationDashboardRequest
 */
export type GetIntegrationDashboardRequest = Message<"service.dashboard.integration.v1.GetIntegrationDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * NowMillis is unix milliseconds used for the 24h-errors window and the
     * 7-day trend window. Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.integration.v1.GetIntegrationDashboardRequest.
 * Use `create(GetIntegrationDashboardRequestSchema)` to create a new message.
 */
export declare const GetIntegrationDashboardRequestSchema: GenMessage<GetIntegrationDashboardRequest>;
/**
 * GetIntegrationDashboardResponse is the projection the view layer reads.
 * All fields are populated unconditionally — when no provider stats hooks
 * are wired, the response degrades to a zero-valued Stats envelope, empty
 * repeated fields, and the view renders empty state.
 *
 * @generated from message service.dashboard.integration.v1.GetIntegrationDashboardResponse
 */
export type GetIntegrationDashboardResponse = Message<"service.dashboard.integration.v1.GetIntegrationDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.integration.v1.IntegrationStats stats = 3;
     */
    stats?: IntegrationStats;
    /**
     * 7-day sync events trend, parallel label/value series so the view
     * renders without proto-coupling on a TimeBucket message.
     *
     * @generated from field: repeated string trend_labels = 4;
     */
    trendLabels: string[];
    /**
     * @generated from field: repeated double trend_values = 5;
     */
    trendValues: number[];
    /**
     * @generated from field: repeated service.dashboard.integration.v1.IntegrationProviderRow providers = 6;
     */
    providers: IntegrationProviderRow[];
    /**
     * @generated from field: repeated service.dashboard.integration.v1.IntegrationErrorEntry recent_errors = 7;
     */
    recentErrors: IntegrationErrorEntry[];
};
/**
 * Describes the message service.dashboard.integration.v1.GetIntegrationDashboardResponse.
 * Use `create(GetIntegrationDashboardResponseSchema)` to create a new message.
 */
export declare const GetIntegrationDashboardResponseSchema: GenMessage<GetIntegrationDashboardResponse>;
