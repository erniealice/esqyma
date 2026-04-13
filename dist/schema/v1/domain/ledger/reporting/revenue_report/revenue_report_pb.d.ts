import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/reporting/revenue_report/revenue_report.proto.
 */
export declare const file_domain_ledger_reporting_revenue_report_revenue_report: GenFile;
/**
 * RevenueReportRequest defines parameters for a two-axis pivot revenue report.
 *
 * @generated from message domain.ledger.v1.RevenueReportRequest
 */
export type RevenueReportRequest = Message<"domain.ledger.v1.RevenueReportRequest"> & {
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
 * Describes the message domain.ledger.v1.RevenueReportRequest.
 * Use `create(RevenueReportRequestSchema)` to create a new message.
 */
export declare const RevenueReportRequestSchema: GenMessage<RevenueReportRequest>;
/**
 * RevenueReportCell represents one cell in the pivot table.
 *
 * @generated from message domain.ledger.v1.RevenueReportCell
 */
export type RevenueReportCell = Message<"domain.ledger.v1.RevenueReportCell"> & {
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
 * Describes the message domain.ledger.v1.RevenueReportCell.
 * Use `create(RevenueReportCellSchema)` to create a new message.
 */
export declare const RevenueReportCellSchema: GenMessage<RevenueReportCell>;
/**
 * RevenueReportRow represents one row in the pivot table.
 *
 * @generated from message domain.ledger.v1.RevenueReportRow
 */
export type RevenueReportRow = Message<"domain.ledger.v1.RevenueReportRow"> & {
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
     * @generated from field: repeated domain.ledger.v1.RevenueReportCell cells = 3;
     */
    cells: RevenueReportCell[];
    /**
     * centavos — sum across all cells in this row
     *
     * @generated from field: int64 row_total = 4;
     */
    rowTotal: bigint;
    /**
     * Total transactions across all cells in this row
     *
     * @generated from field: int64 row_transaction_count = 5;
     */
    rowTransactionCount: bigint;
    /**
     * Total quantity across all cells in this row
     *
     * @generated from field: double row_total_quantity = 6;
     */
    rowTotalQuantity: number;
};
/**
 * Describes the message domain.ledger.v1.RevenueReportRow.
 * Use `create(RevenueReportRowSchema)` to create a new message.
 */
export declare const RevenueReportRowSchema: GenMessage<RevenueReportRow>;
/**
 * RevenueReportSummary provides report-level totals.
 *
 * @generated from message domain.ledger.v1.RevenueReportSummary
 */
export type RevenueReportSummary = Message<"domain.ledger.v1.RevenueReportSummary"> & {
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
     * @generated from field: repeated domain.ledger.v1.RevenueReportCell column_totals = 4;
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
 * Describes the message domain.ledger.v1.RevenueReportSummary.
 * Use `create(RevenueReportSummarySchema)` to create a new message.
 */
export declare const RevenueReportSummarySchema: GenMessage<RevenueReportSummary>;
/**
 * RevenueReportResponse returns the generated pivot revenue report.
 *
 * @generated from message domain.ledger.v1.RevenueReportResponse
 */
export type RevenueReportResponse = Message<"domain.ledger.v1.RevenueReportResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated domain.ledger.v1.RevenueReportRow rows = 2;
     */
    rows: RevenueReportRow[];
    /**
     * @generated from field: optional domain.ledger.v1.RevenueReportSummary summary = 3;
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
 * Describes the message domain.ledger.v1.RevenueReportResponse.
 * Use `create(RevenueReportResponseSchema)` to create a new message.
 */
export declare const RevenueReportResponseSchema: GenMessage<RevenueReportResponse>;
/**
 * LedgerRevenueReportDomainService defines revenue reporting operations.
 *
 * @generated from service domain.ledger.v1.LedgerRevenueReportDomainService
 */
export declare const LedgerRevenueReportDomainService: GenService<{
    /**
     * @generated from rpc domain.ledger.v1.LedgerRevenueReportDomainService.GetRevenueReport
     */
    getRevenueReport: {
        methodKind: "unary";
        input: typeof RevenueReportRequestSchema;
        output: typeof RevenueReportResponseSchema;
    };
}>;
