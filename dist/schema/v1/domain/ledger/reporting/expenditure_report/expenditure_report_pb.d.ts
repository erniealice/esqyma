import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/reporting/expenditure_report/expenditure_report.proto.
 */
export declare const file_domain_ledger_reporting_expenditure_report_expenditure_report: GenFile;
/**
 * ExpenditureReportRequest defines parameters for a two-axis pivot expenditure report.
 *
 * @generated from message domain.ledger.v1.ExpenditureReportRequest
 */
export type ExpenditureReportRequest = Message<"domain.ledger.v1.ExpenditureReportRequest"> & {
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
 * Describes the message domain.ledger.v1.ExpenditureReportRequest.
 * Use `create(ExpenditureReportRequestSchema)` to create a new message.
 */
export declare const ExpenditureReportRequestSchema: GenMessage<ExpenditureReportRequest>;
/**
 * ExpenditureReportCell represents one cell in the pivot table.
 *
 * @generated from message domain.ledger.v1.ExpenditureReportCell
 */
export type ExpenditureReportCell = Message<"domain.ledger.v1.ExpenditureReportCell"> & {
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
 * Describes the message domain.ledger.v1.ExpenditureReportCell.
 * Use `create(ExpenditureReportCellSchema)` to create a new message.
 */
export declare const ExpenditureReportCellSchema: GenMessage<ExpenditureReportCell>;
/**
 * ExpenditureReportRow represents one row in the pivot table.
 *
 * @generated from message domain.ledger.v1.ExpenditureReportRow
 */
export type ExpenditureReportRow = Message<"domain.ledger.v1.ExpenditureReportRow"> & {
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
     * @generated from field: repeated domain.ledger.v1.ExpenditureReportCell cells = 3;
     */
    cells: ExpenditureReportCell[];
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
 * Describes the message domain.ledger.v1.ExpenditureReportRow.
 * Use `create(ExpenditureReportRowSchema)` to create a new message.
 */
export declare const ExpenditureReportRowSchema: GenMessage<ExpenditureReportRow>;
/**
 * ExpenditureReportSummary provides report-level totals.
 *
 * @generated from message domain.ledger.v1.ExpenditureReportSummary
 */
export type ExpenditureReportSummary = Message<"domain.ledger.v1.ExpenditureReportSummary"> & {
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
     * @generated from field: repeated domain.ledger.v1.ExpenditureReportCell column_totals = 4;
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
 * Describes the message domain.ledger.v1.ExpenditureReportSummary.
 * Use `create(ExpenditureReportSummarySchema)` to create a new message.
 */
export declare const ExpenditureReportSummarySchema: GenMessage<ExpenditureReportSummary>;
/**
 * ExpenditureReportResponse returns the generated pivot expenditure report.
 *
 * @generated from message domain.ledger.v1.ExpenditureReportResponse
 */
export type ExpenditureReportResponse = Message<"domain.ledger.v1.ExpenditureReportResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated domain.ledger.v1.ExpenditureReportRow rows = 2;
     */
    rows: ExpenditureReportRow[];
    /**
     * @generated from field: optional domain.ledger.v1.ExpenditureReportSummary summary = 3;
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
 * Describes the message domain.ledger.v1.ExpenditureReportResponse.
 * Use `create(ExpenditureReportResponseSchema)` to create a new message.
 */
export declare const ExpenditureReportResponseSchema: GenMessage<ExpenditureReportResponse>;
/**
 * LedgerExpenditureReportDomainService defines expenditure reporting operations.
 *
 * @generated from service domain.ledger.v1.LedgerExpenditureReportDomainService
 */
export declare const LedgerExpenditureReportDomainService: GenService<{
    /**
     * @generated from rpc domain.ledger.v1.LedgerExpenditureReportDomainService.GetExpenditureReport
     */
    getExpenditureReport: {
        methodKind: "unary";
        input: typeof ExpenditureReportRequestSchema;
        output: typeof ExpenditureReportResponseSchema;
    };
}>;
