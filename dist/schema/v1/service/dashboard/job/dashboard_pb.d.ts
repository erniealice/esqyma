import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Job } from "../../../domain/operation/job/job_pb";
import type { JobActivity } from "../../../domain/operation/job_activity/job_activity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/job/dashboard.proto.
 */
export declare const file_service_dashboard_job_dashboard: GenFile;
/**
 * JobStats are the four stat-card values shown at the top of the dashboard.
 * hours_this_week is a fractional value (already divided ÷100 from the
 * centi-hours integer representation the adapter returns).
 *
 * @generated from message service.dashboard.job.v1.JobStats
 */
export type JobStats = Message<"service.dashboard.job.v1.JobStats"> & {
    /**
     * @generated from field: int64 active_jobs = 1;
     */
    activeJobs: bigint;
    /**
     * @generated from field: int64 done_this_month = 2;
     */
    doneThisMonth: bigint;
    /**
     * @generated from field: int64 overdue_jobs = 3;
     */
    overdueJobs: bigint;
    /**
     * @generated from field: double hours_this_week = 4;
     */
    hoursThisWeek: number;
};
/**
 * Describes the message service.dashboard.job.v1.JobStats.
 * Use `create(JobStatsSchema)` to create a new message.
 */
export declare const JobStatsSchema: GenMessage<JobStats>;
/**
 * JobRiskRow is one row of the "completion risk" widget. CompletionPct is
 * 0..100. DateEndMillis is unix-milli; zero means "no planned end".
 *
 * @generated from message service.dashboard.job.v1.JobRiskRow
 */
export type JobRiskRow = Message<"service.dashboard.job.v1.JobRiskRow"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
    /**
     * @generated from field: string code = 2;
     */
    code: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: double completion_pct = 4;
     */
    completionPct: number;
    /**
     * @generated from field: int64 date_end_millis = 5;
     */
    dateEndMillis: bigint;
};
/**
 * Describes the message service.dashboard.job.v1.JobRiskRow.
 * Use `create(JobRiskRowSchema)` to create a new message.
 */
export declare const JobRiskRowSchema: GenMessage<JobRiskRow>;
/**
 * GetJobDashboardRequest is the request shape.
 *
 * @generated from message service.dashboard.job.v1.GetJobDashboardRequest
 */
export type GetJobDashboardRequest = Message<"service.dashboard.job.v1.GetJobDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for month/week boundary computations.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.job.v1.GetJobDashboardRequest.
 * Use `create(GetJobDashboardRequestSchema)` to create a new message.
 */
export declare const GetJobDashboardRequestSchema: GenMessage<GetJobDashboardRequest>;
/**
 * GetJobDashboardResponse is the projection the view layer reads.
 *
 * Parallel label/value series for the hours-per-week trend keep the proto
 * shape stable across language clients without committing to an ordered map
 * (Q-SDM-DASHBOARD-SHARED-TYPES — proto3 maps are unordered).
 *
 * @generated from message service.dashboard.job.v1.GetJobDashboardResponse
 */
export type GetJobDashboardResponse = Message<"service.dashboard.job.v1.GetJobDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.job.v1.JobStats stats = 3;
     */
    stats?: JobStats;
    /**
     * 8-week hours-per-week trend.
     *
     * @generated from field: repeated string trend_labels = 4;
     */
    trendLabels: string[];
    /**
     * hours (already ÷100)
     *
     * @generated from field: repeated double trend_values = 5;
     */
    trendValues: number[];
    /**
     * @generated from field: repeated domain.operation.v1.Job upcoming_deadlines = 6;
     */
    upcomingDeadlines: Job[];
    /**
     * @generated from field: repeated service.dashboard.job.v1.JobRiskRow risk_top_rows = 7;
     */
    riskTopRows: JobRiskRow[];
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity recent_activity = 8;
     */
    recentActivity: JobActivity[];
};
/**
 * Describes the message service.dashboard.job.v1.GetJobDashboardResponse.
 * Use `create(GetJobDashboardResponseSchema)` to create a new message.
 */
export declare const GetJobDashboardResponseSchema: GenMessage<GetJobDashboardResponse>;
