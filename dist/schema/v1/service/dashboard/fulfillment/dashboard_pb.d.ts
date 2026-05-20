import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Fulfillment } from "../../../domain/fulfillment/fulfillment_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/fulfillment/dashboard.proto.
 */
export declare const file_service_dashboard_fulfillment_dashboard: GenFile;
/**
 * FulfillmentStats are the stat-card values shown at the top of the
 * dashboard. avg_fulfill_days is a fractional value (trailing 30 days).
 *
 * @generated from message service.dashboard.fulfillment.v1.FulfillmentStats
 */
export type FulfillmentStats = Message<"service.dashboard.fulfillment.v1.FulfillmentStats"> & {
    /**
     * @generated from field: int64 pending = 1;
     */
    pending: bigint;
    /**
     * @generated from field: int64 in_transit = 2;
     */
    inTransit: bigint;
    /**
     * @generated from field: int64 delivered_today = 3;
     */
    deliveredToday: bigint;
    /**
     * @generated from field: int64 exceptions = 4;
     */
    exceptions: bigint;
    /**
     * @generated from field: double avg_fulfill_days = 5;
     */
    avgFulfillDays: number;
};
/**
 * Describes the message service.dashboard.fulfillment.v1.FulfillmentStats.
 * Use `create(FulfillmentStatsSchema)` to create a new message.
 */
export declare const FulfillmentStatsSchema: GenMessage<FulfillmentStats>;
/**
 * GetFulfillmentDashboardRequest is the request shape.
 *
 * @generated from message service.dashboard.fulfillment.v1.GetFulfillmentDashboardRequest
 */
export type GetFulfillmentDashboardRequest = Message<"service.dashboard.fulfillment.v1.GetFulfillmentDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for "delivered today" and 30-day
     * trend windows. Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.fulfillment.v1.GetFulfillmentDashboardRequest.
 * Use `create(GetFulfillmentDashboardRequestSchema)` to create a new message.
 */
export declare const GetFulfillmentDashboardRequestSchema: GenMessage<GetFulfillmentDashboardRequest>;
/**
 * GetFulfillmentDashboardResponse is the projection the view layer reads.
 *
 * Parallel label/value series for the status-mix donut and 30-day daily-
 * delivered trend keep the proto shape stable across language clients
 * without committing to an ordered map (Q-SDM-DASHBOARD-SHARED-TYPES —
 * proto3 maps are unordered).
 *
 * @generated from message service.dashboard.fulfillment.v1.GetFulfillmentDashboardResponse
 */
export type GetFulfillmentDashboardResponse = Message<"service.dashboard.fulfillment.v1.GetFulfillmentDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.fulfillment.v1.FulfillmentStats stats = 3;
     */
    stats?: FulfillmentStats;
    /**
     * Status-mix donut: parallel slices in canonical status order.
     *
     * @generated from field: repeated string status_mix_labels = 4;
     */
    statusMixLabels: string[];
    /**
     * counts per status
     *
     * @generated from field: repeated double status_mix_values = 5;
     */
    statusMixValues: number[];
    /**
     * 30-day daily-delivered chart-line.
     *
     * @generated from field: repeated string trend_labels = 6;
     */
    trendLabels: string[];
    /**
     * @generated from field: repeated double trend_values = 7;
     */
    trendValues: number[];
    /**
     * Recent exceptions (top 5).
     *
     * @generated from field: repeated domain.fulfillment.v1.Fulfillment recent_exceptions = 8;
     */
    recentExceptions: Fulfillment[];
};
/**
 * Describes the message service.dashboard.fulfillment.v1.GetFulfillmentDashboardResponse.
 * Use `create(GetFulfillmentDashboardResponseSchema)` to create a new message.
 */
export declare const GetFulfillmentDashboardResponseSchema: GenMessage<GetFulfillmentDashboardResponse>;
