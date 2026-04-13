import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/reporting/disbursement_report/disbursement_report.proto.
 */
export declare const file_domain_treasury_reporting_disbursement_report_disbursement_report: GenFile;
/**
 * DisbursementReportRequest defines parameters for a two-axis pivot disbursement report.
 *
 * @generated from message domain.treasury.v1.DisbursementReportRequest
 */
export type DisbursementReportRequest = Message<"domain.treasury.v1.DisbursementReportRequest"> & {
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
 * Describes the message domain.treasury.v1.DisbursementReportRequest.
 * Use `create(DisbursementReportRequestSchema)` to create a new message.
 */
export declare const DisbursementReportRequestSchema: GenMessage<DisbursementReportRequest>;
/**
 * DisbursementReportCell represents one cell in the pivot table.
 *
 * @generated from message domain.treasury.v1.DisbursementReportCell
 */
export type DisbursementReportCell = Message<"domain.treasury.v1.DisbursementReportCell"> & {
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
 * Describes the message domain.treasury.v1.DisbursementReportCell.
 * Use `create(DisbursementReportCellSchema)` to create a new message.
 */
export declare const DisbursementReportCellSchema: GenMessage<DisbursementReportCell>;
/**
 * DisbursementReportRow represents one row in the pivot table.
 *
 * @generated from message domain.treasury.v1.DisbursementReportRow
 */
export type DisbursementReportRow = Message<"domain.treasury.v1.DisbursementReportRow"> & {
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
     * @generated from field: repeated domain.treasury.v1.DisbursementReportCell cells = 3;
     */
    cells: DisbursementReportCell[];
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
 * Describes the message domain.treasury.v1.DisbursementReportRow.
 * Use `create(DisbursementReportRowSchema)` to create a new message.
 */
export declare const DisbursementReportRowSchema: GenMessage<DisbursementReportRow>;
/**
 * DisbursementReportSummary provides report-level totals.
 *
 * @generated from message domain.treasury.v1.DisbursementReportSummary
 */
export type DisbursementReportSummary = Message<"domain.treasury.v1.DisbursementReportSummary"> & {
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
     * @generated from field: repeated domain.treasury.v1.DisbursementReportCell column_totals = 4;
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
 * Describes the message domain.treasury.v1.DisbursementReportSummary.
 * Use `create(DisbursementReportSummarySchema)` to create a new message.
 */
export declare const DisbursementReportSummarySchema: GenMessage<DisbursementReportSummary>;
/**
 * DisbursementReportResponse returns the generated pivot disbursement report.
 *
 * @generated from message domain.treasury.v1.DisbursementReportResponse
 */
export type DisbursementReportResponse = Message<"domain.treasury.v1.DisbursementReportResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated domain.treasury.v1.DisbursementReportRow rows = 2;
     */
    rows: DisbursementReportRow[];
    /**
     * @generated from field: optional domain.treasury.v1.DisbursementReportSummary summary = 3;
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
 * Describes the message domain.treasury.v1.DisbursementReportResponse.
 * Use `create(DisbursementReportResponseSchema)` to create a new message.
 */
export declare const DisbursementReportResponseSchema: GenMessage<DisbursementReportResponse>;
/**
 * TreasuryDisbursementReportDomainService defines disbursement reporting operations.
 *
 * @generated from service domain.treasury.v1.TreasuryDisbursementReportDomainService
 */
export declare const TreasuryDisbursementReportDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.TreasuryDisbursementReportDomainService.GetDisbursementReport
     */
    getDisbursementReport: {
        methodKind: "unary";
        input: typeof DisbursementReportRequestSchema;
        output: typeof DisbursementReportResponseSchema;
    };
}>;
