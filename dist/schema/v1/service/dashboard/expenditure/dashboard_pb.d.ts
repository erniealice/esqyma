import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Expenditure } from "../../../domain/expenditure/expenditure/expenditure_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/expenditure/dashboard.proto.
 */
export declare const file_service_dashboard_expenditure_dashboard: GenFile;
/**
 * ExpenditureStats are the stat-card values shared across both purchase and
 * expense surfaces. The view layer picks which fields to surface based on
 * Kind. Monetary values are centavos.
 *
 * @generated from message service.dashboard.expenditure.v1.ExpenditureStats
 */
export type ExpenditureStats = Message<"service.dashboard.expenditure.v1.ExpenditureStats"> & {
    /**
     * open_count — pending_approval + draft + approved (count, not centavos).
     *
     * @generated from field: int64 open_count = 1;
     */
    openCount: bigint;
    /**
     * awaiting_count — approved (count). For purchase surface this is
     * "Awaiting Receipt"; for expense surface this is the "Approved" tile.
     *
     * @generated from field: int64 awaiting_count = 2;
     */
    awaitingCount: bigint;
    /**
     * total_mtd — sum of total_amount for current month (centavos).
     *
     * @generated from field: int64 total_mtd = 3;
     */
    totalMtd: bigint;
    /**
     * reimbursable_mtd — populated only for expense surface (centavos).
     *
     * @generated from field: int64 reimbursable_mtd = 4;
     */
    reimbursableMtd: bigint;
    /**
     * top_supplier_name — name of the supplier with the highest total spend.
     *
     * @generated from field: string top_supplier_name = 5;
     */
    topSupplierName: string;
    /**
     * top_supplier_total — centavos.
     *
     * @generated from field: int64 top_supplier_total = 6;
     */
    topSupplierTotal: bigint;
    /**
     * category_count — distinct categories used in the period (expense surface).
     *
     * @generated from field: int64 category_count = 7;
     */
    categoryCount: bigint;
};
/**
 * Describes the message service.dashboard.expenditure.v1.ExpenditureStats.
 * Use `create(ExpenditureStatsSchema)` to create a new message.
 */
export declare const ExpenditureStatsSchema: GenMessage<ExpenditureStats>;
/**
 * TopSupplierRow is one row of the "top suppliers by spend" widget. Centavos.
 *
 * @generated from message service.dashboard.expenditure.v1.TopSupplierRow
 */
export type TopSupplierRow = Message<"service.dashboard.expenditure.v1.TopSupplierRow"> & {
    /**
     * @generated from field: string supplier_id = 1;
     */
    supplierId: string;
    /**
     * @generated from field: string supplier_name = 2;
     */
    supplierName: string;
    /**
     * @generated from field: int64 total = 3;
     */
    total: bigint;
};
/**
 * Describes the message service.dashboard.expenditure.v1.TopSupplierRow.
 * Use `create(TopSupplierRowSchema)` to create a new message.
 */
export declare const TopSupplierRowSchema: GenMessage<TopSupplierRow>;
/**
 * GetExpenditureDashboardRequest is the request shape. Carries the Kind
 * discriminator so one use case serves both purchase and expense surfaces.
 *
 * @generated from message service.dashboard.expenditure.v1.GetExpenditureDashboardRequest
 */
export type GetExpenditureDashboardRequest = Message<"service.dashboard.expenditure.v1.GetExpenditureDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * kind — "purchase" | "expense". Empty defaults to "purchase".
     *
     * @generated from field: string kind = 2;
     */
    kind: string;
    /**
     * now_millis — unix milliseconds used for month-bucket and MTD windows.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 3;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.expenditure.v1.GetExpenditureDashboardRequest.
 * Use `create(GetExpenditureDashboardRequestSchema)` to create a new message.
 */
export declare const GetExpenditureDashboardRequestSchema: GenMessage<GetExpenditureDashboardRequest>;
/**
 * GetExpenditureDashboardResponse is the projection the view layer reads.
 *
 * Parallel label/value series for the month trend and category breakdown keep
 * the proto shape stable across language clients without committing to an
 * ordered map (Q-SDM-DASHBOARD-SHARED-TYPES — proto3 maps are unordered).
 *
 * @generated from message service.dashboard.expenditure.v1.GetExpenditureDashboardResponse
 */
export type GetExpenditureDashboardResponse = Message<"service.dashboard.expenditure.v1.GetExpenditureDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.expenditure.v1.ExpenditureStats stats = 3;
     */
    stats?: ExpenditureStats;
    /**
     * Spend per month (12 months) for chart-bar.
     *
     * @generated from field: repeated string month_labels = 4;
     */
    monthLabels: string[];
    /**
     * centavos
     *
     * @generated from field: repeated double month_values = 5;
     */
    monthValues: number[];
    /**
     * @generated from field: repeated service.dashboard.expenditure.v1.TopSupplierRow top_suppliers = 6;
     */
    topSuppliers: TopSupplierRow[];
    /**
     * @generated from field: repeated domain.expenditure.v1.Expenditure recent = 7;
     */
    recent: Expenditure[];
    /**
     * Category breakdown (current month) — populated for both surfaces; the
     * purchase view ignores the field.
     *
     * @generated from field: repeated string category_labels = 8;
     */
    categoryLabels: string[];
    /**
     * centavos
     *
     * @generated from field: repeated double category_values = 9;
     */
    categoryValues: number[];
};
/**
 * Describes the message service.dashboard.expenditure.v1.GetExpenditureDashboardResponse.
 * Use `create(GetExpenditureDashboardResponseSchema)` to create a new message.
 */
export declare const GetExpenditureDashboardResponseSchema: GenMessage<GetExpenditureDashboardResponse>;
