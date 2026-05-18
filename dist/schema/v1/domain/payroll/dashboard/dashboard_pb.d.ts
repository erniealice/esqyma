import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PayrollRun } from "../payroll_run/payroll_run_pb";
import type { PayrollRemittance } from "../payroll_remittance/payroll_remittance_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/dashboard/dashboard.proto.
 */
export declare const file_domain_payroll_dashboard_dashboard: GenFile;
/**
 * PayrollStats are the four dashboard stats for payroll.
 *
 * @generated from message domain.payroll.dashboard.v1.PayrollStats
 */
export type PayrollStats = Message<"domain.payroll.dashboard.v1.PayrollStats"> & {
    /**
     * current_run_status: "draft" | "calculated" | "approved" | "posted" | "" (no run)
     *
     * @generated from field: string current_run_status = 1;
     */
    currentRunStatus: string;
    /**
     * @generated from field: int32 employees_in_current = 2;
     */
    employeesInCurrent: number;
    /**
     * centavos
     *
     * @generated from field: int64 total_gross_mtd = 3;
     */
    totalGrossMtd: bigint;
    /**
     * @generated from field: int64 remittances_due30_cnt = 4;
     */
    remittancesDue30Cnt: bigint;
};
/**
 * Describes the message domain.payroll.dashboard.v1.PayrollStats.
 * Use `create(PayrollStatsSchema)` to create a new message.
 */
export declare const PayrollStatsSchema: GenMessage<PayrollStats>;
/**
 * GetPayrollDashboardRequest is the request shape.
 *
 * @generated from message domain.payroll.dashboard.v1.GetPayrollDashboardRequest
 */
export type GetPayrollDashboardRequest = Message<"domain.payroll.dashboard.v1.GetPayrollDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for MTD and 12-month trend calculations.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message domain.payroll.dashboard.v1.GetPayrollDashboardRequest.
 * Use `create(GetPayrollDashboardRequestSchema)` to create a new message.
 */
export declare const GetPayrollDashboardRequestSchema: GenMessage<GetPayrollDashboardRequest>;
/**
 * GetPayrollDashboardResponse is the view-layer projection.
 *
 * @generated from message domain.payroll.dashboard.v1.GetPayrollDashboardResponse
 */
export type GetPayrollDashboardResponse = Message<"domain.payroll.dashboard.v1.GetPayrollDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: domain.payroll.dashboard.v1.PayrollStats stats = 3;
     */
    stats?: PayrollStats;
    /**
     * @generated from field: optional domain.payroll.v1.PayrollRun latest_run = 4;
     */
    latestRun?: PayrollRun;
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRun recent_runs = 5;
     */
    recentRuns: PayrollRun[];
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRemittance upcoming_deadlines = 6;
     */
    upcomingDeadlines: PayrollRemittance[];
    /**
     * @generated from field: repeated string gross_trend_labels = 7;
     */
    grossTrendLabels: string[];
    /**
     * @generated from field: repeated double gross_trend_values = 8;
     */
    grossTrendValues: number[];
};
/**
 * Describes the message domain.payroll.dashboard.v1.GetPayrollDashboardResponse.
 * Use `create(GetPayrollDashboardResponseSchema)` to create a new message.
 */
export declare const GetPayrollDashboardResponseSchema: GenMessage<GetPayrollDashboardResponse>;
