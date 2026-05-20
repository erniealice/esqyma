import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { LoanPayment } from "../../../domain/treasury/loan_payment/loan_payment_pb";
import type { Collection } from "../../../domain/treasury/collection/collection_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/treasury/dashboard.proto.
 */
export declare const file_service_dashboard_treasury_dashboard: GenFile;
/**
 * LoanStats holds the six stat-card values for the loan dashboard. Centavos.
 *
 * @generated from message service.dashboard.treasury.v1.LoanStats
 */
export type LoanStats = Message<"service.dashboard.treasury.v1.LoanStats"> & {
    /**
     * @generated from field: int64 total_outstanding = 1;
     */
    totalOutstanding: bigint;
    /**
     * @generated from field: int64 interest_ytd = 2;
     */
    interestYtd: bigint;
    /**
     * payments_due30 — sum (in centavos) of remaining balance for loans
     * maturing in 30d.
     *
     * @generated from field: int64 payments_due30 = 3;
     */
    paymentsDue30: bigint;
    /**
     * @generated from field: int64 defaulted_count = 4;
     */
    defaultedCount: bigint;
    /**
     * @generated from field: int64 active_count = 5;
     */
    activeCount: bigint;
    /**
     * @generated from field: int64 completed_count = 6;
     */
    completedCount: bigint;
};
/**
 * Describes the message service.dashboard.treasury.v1.LoanStats.
 * Use `create(LoanStatsSchema)` to create a new message.
 */
export declare const LoanStatsSchema: GenMessage<LoanStats>;
/**
 * LoanSlice mirrors the loan row shape for dashboard widgets.
 *
 * @generated from message service.dashboard.treasury.v1.LoanSlice
 */
export type LoanSlice = Message<"service.dashboard.treasury.v1.LoanSlice"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string loan_number = 2;
     */
    loanNumber: string;
    /**
     * @generated from field: string lender_name = 3;
     */
    lenderName: string;
    /**
     * centavos
     *
     * @generated from field: int64 remaining_balance = 4;
     */
    remainingBalance: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 principal_amount = 5;
     */
    principalAmount: bigint;
    /**
     * @generated from field: string status = 6;
     */
    status: string;
};
/**
 * Describes the message service.dashboard.treasury.v1.LoanSlice.
 * Use `create(LoanSliceSchema)` to create a new message.
 */
export declare const LoanSliceSchema: GenMessage<LoanSlice>;
/**
 * GetLoanDashboardRequest is the request shape.
 *
 * @generated from message service.dashboard.treasury.v1.GetLoanDashboardRequest
 */
export type GetLoanDashboardRequest = Message<"service.dashboard.treasury.v1.GetLoanDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for YTD and trend calculations.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.treasury.v1.GetLoanDashboardRequest.
 * Use `create(GetLoanDashboardRequestSchema)` to create a new message.
 */
export declare const GetLoanDashboardRequestSchema: GenMessage<GetLoanDashboardRequest>;
/**
 * GetLoanDashboardResponse is the projection the view layer reads.
 *
 * @generated from message service.dashboard.treasury.v1.GetLoanDashboardResponse
 */
export type GetLoanDashboardResponse = Message<"service.dashboard.treasury.v1.GetLoanDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.treasury.v1.LoanStats stats = 3;
     */
    stats?: LoanStats;
    /**
     * @generated from field: repeated string trend_labels = 4;
     */
    trendLabels: string[];
    /**
     * @generated from field: repeated double trend_values = 5;
     */
    trendValues: number[];
    /**
     * @generated from field: repeated service.dashboard.treasury.v1.LoanSlice top_loans = 6;
     */
    topLoans: LoanSlice[];
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment recent_payments = 7;
     */
    recentPayments: LoanPayment[];
};
/**
 * Describes the message service.dashboard.treasury.v1.GetLoanDashboardResponse.
 * Use `create(GetLoanDashboardResponseSchema)` to create a new message.
 */
export declare const GetLoanDashboardResponseSchema: GenMessage<GetLoanDashboardResponse>;
/**
 * CashStats holds the four stat-card values for the cash dashboard. Centavos.
 *
 * @generated from message service.dashboard.treasury.v1.CashStats
 */
export type CashStats = Message<"service.dashboard.treasury.v1.CashStats"> & {
    /**
     * @generated from field: int64 pending = 1;
     */
    pending: bigint;
    /**
     * @generated from field: int64 overdue = 2;
     */
    overdue: bigint;
    /**
     * @generated from field: int64 collected_today = 3;
     */
    collectedToday: bigint;
    /**
     * @generated from field: int64 collected_this_week = 4;
     */
    collectedThisWeek: bigint;
};
/**
 * Describes the message service.dashboard.treasury.v1.CashStats.
 * Use `create(CashStatsSchema)` to create a new message.
 */
export declare const CashStatsSchema: GenMessage<CashStats>;
/**
 * GetCashDashboardRequest is the request shape.
 *
 * @generated from message service.dashboard.treasury.v1.GetCashDashboardRequest
 */
export type GetCashDashboardRequest = Message<"service.dashboard.treasury.v1.GetCashDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for daily/weekly bucket computations.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.treasury.v1.GetCashDashboardRequest.
 * Use `create(GetCashDashboardRequestSchema)` to create a new message.
 */
export declare const GetCashDashboardRequestSchema: GenMessage<GetCashDashboardRequest>;
/**
 * GetCashDashboardResponse is the projection the view layer reads.
 *
 * Parallel label/value series for daily and mode breakdowns keep the proto
 * shape stable across language clients without committing to an ordered map
 * (Q-SDM-DASHBOARD-SHARED-TYPES — proto3 maps are unordered).
 *
 * @generated from message service.dashboard.treasury.v1.GetCashDashboardResponse
 */
export type GetCashDashboardResponse = Message<"service.dashboard.treasury.v1.GetCashDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.treasury.v1.CashStats stats = 3;
     */
    stats?: CashStats;
    /**
     * Daily series (last 30 days) for chart-line.
     *
     * @generated from field: repeated string daily_labels = 4;
     */
    dailyLabels: string[];
    /**
     * centavos
     *
     * @generated from field: repeated double daily_values = 5;
     */
    dailyValues: number[];
    /**
     * Payment-mode mix (this week) for chart-pie.
     *
     * @generated from field: repeated string mode_labels = 6;
     */
    modeLabels: string[];
    /**
     * centavos
     *
     * @generated from field: repeated double mode_values = 7;
     */
    modeValues: number[];
    /**
     * Recent collections.
     *
     * @generated from field: repeated domain.treasury.v1.Collection recent = 8;
     */
    recent: Collection[];
};
/**
 * Describes the message service.dashboard.treasury.v1.GetCashDashboardResponse.
 * Use `create(GetCashDashboardResponseSchema)` to create a new message.
 */
export declare const GetCashDashboardResponseSchema: GenMessage<GetCashDashboardResponse>;
