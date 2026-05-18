import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { LoanPayment } from "../loan_payment/loan_payment_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/dashboard/dashboard.proto.
 */
export declare const file_domain_treasury_dashboard_dashboard: GenFile;
/**
 * LoanStats holds the six stat-card values for the dashboard. Centavos.
 *
 * @generated from message domain.treasury.dashboard.v1.LoanStats
 */
export type LoanStats = Message<"domain.treasury.dashboard.v1.LoanStats"> & {
    /**
     * @generated from field: int64 total_outstanding = 1;
     */
    totalOutstanding: bigint;
    /**
     * @generated from field: int64 interest_ytd = 2;
     */
    interestYtd: bigint;
    /**
     * payments_due30 — sum (in centavos) of remaining balance for loans maturing in 30d
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
 * Describes the message domain.treasury.dashboard.v1.LoanStats.
 * Use `create(LoanStatsSchema)` to create a new message.
 */
export declare const LoanStatsSchema: GenMessage<LoanStats>;
/**
 * LoanSlice mirrors the loan row shape for dashboard widgets.
 *
 * @generated from message domain.treasury.dashboard.v1.LoanSlice
 */
export type LoanSlice = Message<"domain.treasury.dashboard.v1.LoanSlice"> & {
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
 * Describes the message domain.treasury.dashboard.v1.LoanSlice.
 * Use `create(LoanSliceSchema)` to create a new message.
 */
export declare const LoanSliceSchema: GenMessage<LoanSlice>;
/**
 * GetLoanDashboardRequest is the request shape.
 *
 * @generated from message domain.treasury.dashboard.v1.GetLoanDashboardRequest
 */
export type GetLoanDashboardRequest = Message<"domain.treasury.dashboard.v1.GetLoanDashboardRequest"> & {
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
 * Describes the message domain.treasury.dashboard.v1.GetLoanDashboardRequest.
 * Use `create(GetLoanDashboardRequestSchema)` to create a new message.
 */
export declare const GetLoanDashboardRequestSchema: GenMessage<GetLoanDashboardRequest>;
/**
 * GetLoanDashboardResponse is the projection the view layer reads.
 *
 * @generated from message domain.treasury.dashboard.v1.GetLoanDashboardResponse
 */
export type GetLoanDashboardResponse = Message<"domain.treasury.dashboard.v1.GetLoanDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: domain.treasury.dashboard.v1.LoanStats stats = 3;
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
     * @generated from field: repeated domain.treasury.dashboard.v1.LoanSlice top_loans = 6;
     */
    topLoans: LoanSlice[];
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment recent_payments = 7;
     */
    recentPayments: LoanPayment[];
};
/**
 * Describes the message domain.treasury.dashboard.v1.GetLoanDashboardResponse.
 * Use `create(GetLoanDashboardResponseSchema)` to create a new message.
 */
export declare const GetLoanDashboardResponseSchema: GenMessage<GetLoanDashboardResponse>;
