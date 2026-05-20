import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../domain/common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/reporting/domain_specific/domain_specific.proto.
 */
export declare const file_service_reporting_domain_specific_domain_specific: GenFile;
/**
 * GetRevenueReportRequest defines parameters for the two-axis pivot revenue
 * report.
 *
 * @generated from message service.reporting.v1.GetRevenueReportRequest
 */
export type GetRevenueReportRequest = Message<"service.reporting.v1.GetRevenueReportRequest"> & {
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period start
     *
     * @generated from field: optional string start_date = 1;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period end
     *
     * @generated from field: optional string end_date = 2;
     */
    endDate?: string;
    /**
     * Column axis: monthly/quarterly/yearly/product/product_line/location/location_area
     *
     * @generated from field: string primary_dimension = 3;
     */
    primaryDimension: string;
    /**
     * Row axis: same options
     *
     * @generated from field: string row_dimension = 4;
     */
    rowDimension: string;
    /**
     * Filter by specific product
     *
     * @generated from field: optional string product_id = 5;
     */
    productId?: string;
    /**
     * Filter by product line
     *
     * @generated from field: optional string collection_id = 6;
     */
    collectionId?: string;
    /**
     * Filter by specific location
     *
     * @generated from field: optional string location_id = 7;
     */
    locationId?: string;
    /**
     * Filter by location area
     *
     * @generated from field: optional string location_area_id = 8;
     */
    locationAreaId?: string;
    /**
     * Filter by revenue category
     *
     * @generated from field: optional string revenue_category_id = 9;
     */
    revenueCategoryId?: string;
    /**
     * Filter by currency (default: all)
     *
     * @generated from field: optional string currency = 10;
     */
    currency?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 11;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message service.reporting.v1.GetRevenueReportRequest.
 * Use `create(GetRevenueReportRequestSchema)` to create a new message.
 */
export declare const GetRevenueReportRequestSchema: GenMessage<GetRevenueReportRequest>;
/**
 * RevenueReportCell represents one cell in the pivot table.
 *
 * @generated from message service.reporting.v1.RevenueReportCell
 */
export type RevenueReportCell = Message<"service.reporting.v1.RevenueReportCell"> & {
    /**
     * Human-readable column label
     *
     * @generated from field: string column_key = 1;
     */
    columnKey: string;
    /**
     * Entity ID for the column dimension
     *
     * @generated from field: optional string column_id = 2;
     */
    columnId?: string;
    /**
     * centavos — sum of revenue for this cell
     *
     * @generated from field: int64 total_revenue = 3;
     */
    totalRevenue: bigint;
    /**
     * Number of revenue transactions
     *
     * @generated from field: int64 transaction_count = 4;
     */
    transactionCount: bigint;
    /**
     * Total units sold in this cell
     *
     * @generated from field: double total_quantity = 5;
     */
    totalQuantity: number;
};
/**
 * Describes the message service.reporting.v1.RevenueReportCell.
 * Use `create(RevenueReportCellSchema)` to create a new message.
 */
export declare const RevenueReportCellSchema: GenMessage<RevenueReportCell>;
/**
 * RevenueReportRow represents one row in the pivot table.
 *
 * @generated from message service.reporting.v1.RevenueReportRow
 */
export type RevenueReportRow = Message<"service.reporting.v1.RevenueReportRow"> & {
    /**
     * Human-readable row label
     *
     * @generated from field: string row_key = 1;
     */
    rowKey: string;
    /**
     * Entity ID for the row dimension
     *
     * @generated from field: optional string row_id = 2;
     */
    rowId?: string;
    /**
     * One cell per column
     *
     * @generated from field: repeated service.reporting.v1.RevenueReportCell cells = 3;
     */
    cells: RevenueReportCell[];
    /**
     * centavos — sum across all cells in this row
     *
     * @generated from field: int64 row_total = 4;
     */
    rowTotal: bigint;
    /**
     * Total transactions across all cells
     *
     * @generated from field: int64 row_transaction_count = 5;
     */
    rowTransactionCount: bigint;
    /**
     * Total quantity across all cells
     *
     * @generated from field: double row_total_quantity = 6;
     */
    rowTotalQuantity: number;
};
/**
 * Describes the message service.reporting.v1.RevenueReportRow.
 * Use `create(RevenueReportRowSchema)` to create a new message.
 */
export declare const RevenueReportRowSchema: GenMessage<RevenueReportRow>;
/**
 * RevenueReportSummary provides report-level totals.
 *
 * @generated from message service.reporting.v1.RevenueReportSummary
 */
export type RevenueReportSummary = Message<"service.reporting.v1.RevenueReportSummary"> & {
    /**
     * centavos — sum of all revenue
     *
     * @generated from field: int64 grand_total = 1;
     */
    grandTotal: bigint;
    /**
     * Total number of revenue transactions
     *
     * @generated from field: int64 total_transactions = 2;
     */
    totalTransactions: bigint;
    /**
     * Total units sold across all rows/columns
     *
     * @generated from field: double total_quantity = 3;
     */
    totalQuantity: number;
    /**
     * Per-column totals across all rows
     *
     * @generated from field: repeated service.reporting.v1.RevenueReportCell column_totals = 4;
     */
    columnTotals: RevenueReportCell[];
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 5;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 6;
     */
    endDate?: string;
    /**
     * Currency of all monetary values
     *
     * @generated from field: string currency = 7;
     */
    currency: string;
};
/**
 * Describes the message service.reporting.v1.RevenueReportSummary.
 * Use `create(RevenueReportSummarySchema)` to create a new message.
 */
export declare const RevenueReportSummarySchema: GenMessage<RevenueReportSummary>;
/**
 * GetRevenueReportResponse returns the generated pivot revenue report.
 *
 * @generated from message service.reporting.v1.GetRevenueReportResponse
 */
export type GetRevenueReportResponse = Message<"service.reporting.v1.GetRevenueReportResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated service.reporting.v1.RevenueReportRow rows = 2;
     */
    rows: RevenueReportRow[];
    /**
     * @generated from field: optional service.reporting.v1.RevenueReportSummary summary = 3;
     */
    summary?: RevenueReportSummary;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: bool success = 5;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 6;
     */
    error?: Error;
};
/**
 * Describes the message service.reporting.v1.GetRevenueReportResponse.
 * Use `create(GetRevenueReportResponseSchema)` to create a new message.
 */
export declare const GetRevenueReportResponseSchema: GenMessage<GetRevenueReportResponse>;
/**
 * GetExpenditureReportRequest defines parameters for the two-axis pivot
 * expenditure report.
 *
 * @generated from message service.reporting.v1.GetExpenditureReportRequest
 */
export type GetExpenditureReportRequest = Message<"service.reporting.v1.GetExpenditureReportRequest"> & {
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period start
     *
     * @generated from field: optional string start_date = 1;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period end
     *
     * @generated from field: optional string end_date = 2;
     */
    endDate?: string;
    /**
     * Column axis: monthly/quarterly/yearly/product/product_line/location/location_area
     *
     * @generated from field: string primary_dimension = 3;
     */
    primaryDimension: string;
    /**
     * Row axis: same options
     *
     * @generated from field: string row_dimension = 4;
     */
    rowDimension: string;
    /**
     * Filter by specific product
     *
     * @generated from field: optional string product_id = 5;
     */
    productId?: string;
    /**
     * Filter by product line
     *
     * @generated from field: optional string collection_id = 6;
     */
    collectionId?: string;
    /**
     * Filter by specific location
     *
     * @generated from field: optional string location_id = 7;
     */
    locationId?: string;
    /**
     * Filter by location area
     *
     * @generated from field: optional string location_area_id = 8;
     */
    locationAreaId?: string;
    /**
     * Filter by expenditure category
     *
     * @generated from field: optional string expenditure_category_id = 9;
     */
    expenditureCategoryId?: string;
    /**
     * Filter by currency (default: all)
     *
     * @generated from field: optional string currency = 10;
     */
    currency?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 11;
     */
    pagination?: PaginationRequest;
    /**
     * Filter by supplier
     *
     * @generated from field: optional string supplier_id = 12;
     */
    supplierId?: string;
    /**
     * Filter by type: "expense" or "purchase"
     *
     * @generated from field: optional string expenditure_type = 13;
     */
    expenditureType?: string;
};
/**
 * Describes the message service.reporting.v1.GetExpenditureReportRequest.
 * Use `create(GetExpenditureReportRequestSchema)` to create a new message.
 */
export declare const GetExpenditureReportRequestSchema: GenMessage<GetExpenditureReportRequest>;
/**
 * ExpenditureReportCell represents one cell in the pivot table.
 *
 * @generated from message service.reporting.v1.ExpenditureReportCell
 */
export type ExpenditureReportCell = Message<"service.reporting.v1.ExpenditureReportCell"> & {
    /**
     * Human-readable column label
     *
     * @generated from field: string column_key = 1;
     */
    columnKey: string;
    /**
     * Entity ID for the column dimension
     *
     * @generated from field: optional string column_id = 2;
     */
    columnId?: string;
    /**
     * centavos — sum of expenditures for this cell
     *
     * @generated from field: int64 total_expenditure = 3;
     */
    totalExpenditure: bigint;
    /**
     * Number of expenditure transactions
     *
     * @generated from field: int64 transaction_count = 4;
     */
    transactionCount: bigint;
    /**
     * Total units in this cell
     *
     * @generated from field: double total_quantity = 5;
     */
    totalQuantity: number;
};
/**
 * Describes the message service.reporting.v1.ExpenditureReportCell.
 * Use `create(ExpenditureReportCellSchema)` to create a new message.
 */
export declare const ExpenditureReportCellSchema: GenMessage<ExpenditureReportCell>;
/**
 * ExpenditureReportRow represents one row in the pivot table.
 *
 * @generated from message service.reporting.v1.ExpenditureReportRow
 */
export type ExpenditureReportRow = Message<"service.reporting.v1.ExpenditureReportRow"> & {
    /**
     * Human-readable row label
     *
     * @generated from field: string row_key = 1;
     */
    rowKey: string;
    /**
     * Entity ID for the row dimension
     *
     * @generated from field: optional string row_id = 2;
     */
    rowId?: string;
    /**
     * One cell per column
     *
     * @generated from field: repeated service.reporting.v1.ExpenditureReportCell cells = 3;
     */
    cells: ExpenditureReportCell[];
    /**
     * centavos — sum across all cells in this row
     *
     * @generated from field: int64 row_total = 4;
     */
    rowTotal: bigint;
    /**
     * Total transactions across all cells
     *
     * @generated from field: int64 row_transaction_count = 5;
     */
    rowTransactionCount: bigint;
    /**
     * Total quantity across all cells
     *
     * @generated from field: double row_total_quantity = 6;
     */
    rowTotalQuantity: number;
};
/**
 * Describes the message service.reporting.v1.ExpenditureReportRow.
 * Use `create(ExpenditureReportRowSchema)` to create a new message.
 */
export declare const ExpenditureReportRowSchema: GenMessage<ExpenditureReportRow>;
/**
 * ExpenditureReportSummary provides report-level totals.
 *
 * @generated from message service.reporting.v1.ExpenditureReportSummary
 */
export type ExpenditureReportSummary = Message<"service.reporting.v1.ExpenditureReportSummary"> & {
    /**
     * centavos — sum of all expenditures
     *
     * @generated from field: int64 grand_total = 1;
     */
    grandTotal: bigint;
    /**
     * Total number of expenditure transactions
     *
     * @generated from field: int64 total_transactions = 2;
     */
    totalTransactions: bigint;
    /**
     * Total units across all rows/columns
     *
     * @generated from field: double total_quantity = 3;
     */
    totalQuantity: number;
    /**
     * Per-column totals across all rows
     *
     * @generated from field: repeated service.reporting.v1.ExpenditureReportCell column_totals = 4;
     */
    columnTotals: ExpenditureReportCell[];
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 5;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 6;
     */
    endDate?: string;
    /**
     * Currency of all monetary values
     *
     * @generated from field: string currency = 7;
     */
    currency: string;
};
/**
 * Describes the message service.reporting.v1.ExpenditureReportSummary.
 * Use `create(ExpenditureReportSummarySchema)` to create a new message.
 */
export declare const ExpenditureReportSummarySchema: GenMessage<ExpenditureReportSummary>;
/**
 * GetExpenditureReportResponse returns the generated pivot expenditure
 * report.
 *
 * @generated from message service.reporting.v1.GetExpenditureReportResponse
 */
export type GetExpenditureReportResponse = Message<"service.reporting.v1.GetExpenditureReportResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated service.reporting.v1.ExpenditureReportRow rows = 2;
     */
    rows: ExpenditureReportRow[];
    /**
     * @generated from field: optional service.reporting.v1.ExpenditureReportSummary summary = 3;
     */
    summary?: ExpenditureReportSummary;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: bool success = 5;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 6;
     */
    error?: Error;
};
/**
 * Describes the message service.reporting.v1.GetExpenditureReportResponse.
 * Use `create(GetExpenditureReportResponseSchema)` to create a new message.
 */
export declare const GetExpenditureReportResponseSchema: GenMessage<GetExpenditureReportResponse>;
/**
 * GetDisbursementReportRequest defines parameters for the two-axis pivot
 * disbursement report.
 *
 * @generated from message service.reporting.v1.GetDisbursementReportRequest
 */
export type GetDisbursementReportRequest = Message<"service.reporting.v1.GetDisbursementReportRequest"> & {
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period start
     *
     * @generated from field: optional string start_date = 1;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period end
     *
     * @generated from field: optional string end_date = 2;
     */
    endDate?: string;
    /**
     * Column axis: monthly/quarterly/yearly/supplier/location/location_area
     *
     * @generated from field: string primary_dimension = 3;
     */
    primaryDimension: string;
    /**
     * Row axis: same options
     *
     * @generated from field: string row_dimension = 4;
     */
    rowDimension: string;
    /**
     * Filter by specific supplier
     *
     * @generated from field: optional string supplier_id = 5;
     */
    supplierId?: string;
    /**
     * Filter by supplier category
     *
     * @generated from field: optional string supplier_category_id = 6;
     */
    supplierCategoryId?: string;
    /**
     * Filter by specific location
     *
     * @generated from field: optional string location_id = 7;
     */
    locationId?: string;
    /**
     * Filter by location area
     *
     * @generated from field: optional string location_area_id = 8;
     */
    locationAreaId?: string;
    /**
     * Filter by expenditure category
     *
     * @generated from field: optional string expenditure_category_id = 9;
     */
    expenditureCategoryId?: string;
    /**
     * Filter by currency (default: all)
     *
     * @generated from field: optional string currency = 10;
     */
    currency?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 11;
     */
    pagination?: PaginationRequest;
    /**
     * "purchase", "expense"
     *
     * @generated from field: optional string disbursement_type = 12;
     */
    disbursementType?: string;
    /**
     * FK to disbursement_method
     *
     * @generated from field: optional string disbursement_method_id = 13;
     */
    disbursementMethodId?: string;
    /**
     * Filter by specific expenditure
     *
     * @generated from field: optional string expenditure_id = 14;
     */
    expenditureId?: string;
};
/**
 * Describes the message service.reporting.v1.GetDisbursementReportRequest.
 * Use `create(GetDisbursementReportRequestSchema)` to create a new message.
 */
export declare const GetDisbursementReportRequestSchema: GenMessage<GetDisbursementReportRequest>;
/**
 * DisbursementReportCell represents one cell in the pivot table.
 *
 * @generated from message service.reporting.v1.DisbursementReportCell
 */
export type DisbursementReportCell = Message<"service.reporting.v1.DisbursementReportCell"> & {
    /**
     * Human-readable column label
     *
     * @generated from field: string column_key = 1;
     */
    columnKey: string;
    /**
     * Entity ID for the column dimension
     *
     * @generated from field: optional string column_id = 2;
     */
    columnId?: string;
    /**
     * centavos — sum of disbursements for this cell
     *
     * @generated from field: int64 total_disbursement = 3;
     */
    totalDisbursement: bigint;
    /**
     * Number of disbursement transactions
     *
     * @generated from field: int64 transaction_count = 4;
     */
    transactionCount: bigint;
    /**
     * Total units in this cell
     *
     * @generated from field: double total_quantity = 5;
     */
    totalQuantity: number;
};
/**
 * Describes the message service.reporting.v1.DisbursementReportCell.
 * Use `create(DisbursementReportCellSchema)` to create a new message.
 */
export declare const DisbursementReportCellSchema: GenMessage<DisbursementReportCell>;
/**
 * DisbursementReportRow represents one row in the pivot table.
 *
 * @generated from message service.reporting.v1.DisbursementReportRow
 */
export type DisbursementReportRow = Message<"service.reporting.v1.DisbursementReportRow"> & {
    /**
     * Human-readable row label
     *
     * @generated from field: string row_key = 1;
     */
    rowKey: string;
    /**
     * Entity ID for the row dimension
     *
     * @generated from field: optional string row_id = 2;
     */
    rowId?: string;
    /**
     * One cell per column
     *
     * @generated from field: repeated service.reporting.v1.DisbursementReportCell cells = 3;
     */
    cells: DisbursementReportCell[];
    /**
     * centavos — sum across all cells in this row
     *
     * @generated from field: int64 row_total = 4;
     */
    rowTotal: bigint;
    /**
     * Total transactions across all cells
     *
     * @generated from field: int64 row_transaction_count = 5;
     */
    rowTransactionCount: bigint;
    /**
     * Total quantity across all cells
     *
     * @generated from field: double row_total_quantity = 6;
     */
    rowTotalQuantity: number;
};
/**
 * Describes the message service.reporting.v1.DisbursementReportRow.
 * Use `create(DisbursementReportRowSchema)` to create a new message.
 */
export declare const DisbursementReportRowSchema: GenMessage<DisbursementReportRow>;
/**
 * DisbursementReportSummary provides report-level totals.
 *
 * @generated from message service.reporting.v1.DisbursementReportSummary
 */
export type DisbursementReportSummary = Message<"service.reporting.v1.DisbursementReportSummary"> & {
    /**
     * centavos — sum of all disbursements
     *
     * @generated from field: int64 grand_total = 1;
     */
    grandTotal: bigint;
    /**
     * Total number of disbursement transactions
     *
     * @generated from field: int64 total_transactions = 2;
     */
    totalTransactions: bigint;
    /**
     * Total units across all rows/columns
     *
     * @generated from field: double total_quantity = 3;
     */
    totalQuantity: number;
    /**
     * Per-column totals across all rows
     *
     * @generated from field: repeated service.reporting.v1.DisbursementReportCell column_totals = 4;
     */
    columnTotals: DisbursementReportCell[];
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 5;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 6;
     */
    endDate?: string;
    /**
     * Currency of all monetary values
     *
     * @generated from field: string currency = 7;
     */
    currency: string;
};
/**
 * Describes the message service.reporting.v1.DisbursementReportSummary.
 * Use `create(DisbursementReportSummarySchema)` to create a new message.
 */
export declare const DisbursementReportSummarySchema: GenMessage<DisbursementReportSummary>;
/**
 * GetDisbursementReportResponse returns the generated pivot disbursement
 * report.
 *
 * @generated from message service.reporting.v1.GetDisbursementReportResponse
 */
export type GetDisbursementReportResponse = Message<"service.reporting.v1.GetDisbursementReportResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated service.reporting.v1.DisbursementReportRow rows = 2;
     */
    rows: DisbursementReportRow[];
    /**
     * @generated from field: optional service.reporting.v1.DisbursementReportSummary summary = 3;
     */
    summary?: DisbursementReportSummary;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: bool success = 5;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 6;
     */
    error?: Error;
};
/**
 * Describes the message service.reporting.v1.GetDisbursementReportResponse.
 * Use `create(GetDisbursementReportResponseSchema)` to create a new message.
 */
export declare const GetDisbursementReportResponseSchema: GenMessage<GetDisbursementReportResponse>;
/**
 * DomainSpecificReportingService defines per-domain pivot reports.
 *
 * `ListRevenue` and `ListExpenses` stay Go-only (see package comment for
 * rationale); the proto service therefore only carries the 3 typed pivot
 * reports.
 *
 * @generated from service service.reporting.v1.DomainSpecificReportingService
 */
export declare const DomainSpecificReportingService: GenService<{
    /**
     * @generated from rpc service.reporting.v1.DomainSpecificReportingService.GetRevenueReport
     */
    getRevenueReport: {
        methodKind: "unary";
        input: typeof GetRevenueReportRequestSchema;
        output: typeof GetRevenueReportResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.DomainSpecificReportingService.GetExpenditureReport
     */
    getExpenditureReport: {
        methodKind: "unary";
        input: typeof GetExpenditureReportRequestSchema;
        output: typeof GetExpenditureReportResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.DomainSpecificReportingService.GetDisbursementReport
     */
    getDisbursementReport: {
        methodKind: "unary";
        input: typeof GetDisbursementReportRequestSchema;
        output: typeof GetDisbursementReportResponseSchema;
    };
}>;
