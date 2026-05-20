import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Event } from "../../../domain/event/event/event_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/schedule/dashboard.proto.
 */
export declare const file_service_dashboard_schedule_dashboard: GenFile;
/**
 * ScheduleStats holds the four stat-card values for the schedule dashboard.
 * UtilizationPct is a placeholder proxy: it currently mirrors `this_week`
 * counts until a real capacity metric is wired (see the Go-side use case
 * doc comment for history).
 *
 * @generated from message service.dashboard.schedule.v1.ScheduleStats
 */
export type ScheduleStats = Message<"service.dashboard.schedule.v1.ScheduleStats"> & {
    /**
     * @generated from field: int64 today = 1;
     */
    today: bigint;
    /**
     * @generated from field: int64 this_week = 2;
     */
    thisWeek: bigint;
    /**
     * ByTag is the distinct count of tags in use this period.
     *
     * @generated from field: int64 by_tag = 3;
     */
    byTag: bigint;
    /**
     * UtilizationPct is a proxy until a real capacity metric exists.
     *
     * @generated from field: int64 utilization_pct = 4;
     */
    utilizationPct: bigint;
};
/**
 * Describes the message service.dashboard.schedule.v1.ScheduleStats.
 * Use `create(ScheduleStatsSchema)` to create a new message.
 */
export declare const ScheduleStatsSchema: GenMessage<ScheduleStats>;
/**
 * ScheduleTagSlice is one entry of the "events by tag" widget — the existing
 * Go shape returns map[string]int64 keyed by tag name; the proto uses a
 * repeated `*Slice` for proto3-map ordering stability across clients.
 *
 * @generated from message service.dashboard.schedule.v1.ScheduleTagSlice
 */
export type ScheduleTagSlice = Message<"service.dashboard.schedule.v1.ScheduleTagSlice"> & {
    /**
     * @generated from field: string tag = 1;
     */
    tag: string;
    /**
     * @generated from field: int64 count = 2;
     */
    count: bigint;
};
/**
 * Describes the message service.dashboard.schedule.v1.ScheduleTagSlice.
 * Use `create(ScheduleTagSliceSchema)` to create a new message.
 */
export declare const ScheduleTagSliceSchema: GenMessage<ScheduleTagSlice>;
/**
 * GetScheduleDashboardRequest is the input for the schedule dashboard
 * service-layer use case.
 *
 * @generated from message service.dashboard.schedule.v1.GetScheduleDashboardRequest
 */
export type GetScheduleDashboardRequest = Message<"service.dashboard.schedule.v1.GetScheduleDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * NowMillis is unix milliseconds used as the reference point for "today"
     * and "this week" computations, plus the 14-day trend window. Zero means
     * "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.schedule.v1.GetScheduleDashboardRequest.
 * Use `create(GetScheduleDashboardRequestSchema)` to create a new message.
 */
export declare const GetScheduleDashboardRequestSchema: GenMessage<GetScheduleDashboardRequest>;
/**
 * GetScheduleDashboardResponse is the projection the view layer reads.
 * All fields are populated unconditionally — when the underlying repo is
 * unavailable the response degrades to a zero-valued Stats envelope, empty
 * repeated fields, and the view renders empty state.
 *
 * @generated from message service.dashboard.schedule.v1.GetScheduleDashboardResponse
 */
export type GetScheduleDashboardResponse = Message<"service.dashboard.schedule.v1.GetScheduleDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.schedule.v1.ScheduleStats stats = 3;
     */
    stats?: ScheduleStats;
    /**
     * 14-day events-by-day trend, parallel label/value series (so the view
     * renders without proto-coupling on a TimeBucket message; Q-SDM-DASHBOARD-
     * SHARED-TYPES LOCKED — TimeBucket stays a Go-internal query-interface
     * type per dashboard package).
     *
     * @generated from field: repeated string by_day_labels = 4;
     */
    byDayLabels: string[];
    /**
     * @generated from field: repeated double by_day_values = 5;
     */
    byDayValues: number[];
    /**
     * ByTag carries the distinct tag → count mapping for the period. Kept as
     * an ordered repeated *Slice to make output stable for cross-language
     * clients; consumers convert to map[string]int64 as needed.
     *
     * @generated from field: repeated service.dashboard.schedule.v1.ScheduleTagSlice by_tag = 6;
     */
    byTag: ScheduleTagSlice[];
    /**
     * Upcoming is the next-N events by start_date_time_utc (limit applied
     * server-side; current implementation pulls 5).
     *
     * @generated from field: repeated domain.event.v1.Event upcoming = 7;
     */
    upcoming: Event[];
};
/**
 * Describes the message service.dashboard.schedule.v1.GetScheduleDashboardResponse.
 * Use `create(GetScheduleDashboardResponseSchema)` to create a new message.
 */
export declare const GetScheduleDashboardResponseSchema: GenMessage<GetScheduleDashboardResponse>;
