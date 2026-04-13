import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/reporting/collection_summary/collection_summary.proto.
 */
export declare const file_domain_treasury_reporting_collection_summary_collection_summary: GenFile;
/**
 * CollectionSummaryRequest defines parameters for a two-axis pivot collection summary report.
 *
 * @generated from message domain.treasury.v1.CollectionSummaryRequest
 */
export type CollectionSummaryRequest = Message<"domain.treasury.v1.CollectionSummaryRequest"> & {
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
     * Column axis: monthly/quarterly/yearly/client/client_category/location/location_area/collection_method
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
     * Filter by specific client
     *
     * @generated from field: optional string client_id = 5;
     */
    clientId?: string;
    /**
     * Filter by client category
     *
     * @generated from field: optional string client_category_id = 6;
     */
    clientCategoryId?: string;
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
     * Filter by collection method
     *
     * @generated from field: optional string collection_method_id = 9;
     */
    collectionMethodId?: string;
    /**
     * Filter by currency (default: all)
     *
     * @generated from field: optional string currency = 10;
     */
    currency?: string;
    /**
     * Filter by type: subscription/sale/refund/invoice/deposit/walk_in
     *
     * @generated from field: optional string collection_type = 11;
     */
    collectionType?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 12;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.treasury.v1.CollectionSummaryRequest.
 * Use `create(CollectionSummaryRequestSchema)` to create a new message.
 */
export declare const CollectionSummaryRequestSchema: GenMessage<CollectionSummaryRequest>;
/**
 * CollectionSummaryCell represents one cell in the pivot table.
 *
 * @generated from message domain.treasury.v1.CollectionSummaryCell
 */
export type CollectionSummaryCell = Message<"domain.treasury.v1.CollectionSummaryCell"> & {
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
     * centavos — sum of collections for this cell
     *
     * @generated from field: int64 total_collected = 3;
     */
    totalCollected: bigint;
    /**
     * Number of collection transactions
     *
     * @generated from field: int64 transaction_count = 4;
     */
    transactionCount: bigint;
};
/**
 * Describes the message domain.treasury.v1.CollectionSummaryCell.
 * Use `create(CollectionSummaryCellSchema)` to create a new message.
 */
export declare const CollectionSummaryCellSchema: GenMessage<CollectionSummaryCell>;
/**
 * CollectionSummaryRow represents one row in the pivot table.
 *
 * @generated from message domain.treasury.v1.CollectionSummaryRow
 */
export type CollectionSummaryRow = Message<"domain.treasury.v1.CollectionSummaryRow"> & {
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
     * @generated from field: repeated domain.treasury.v1.CollectionSummaryCell cells = 3;
     */
    cells: CollectionSummaryCell[];
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
};
/**
 * Describes the message domain.treasury.v1.CollectionSummaryRow.
 * Use `create(CollectionSummaryRowSchema)` to create a new message.
 */
export declare const CollectionSummaryRowSchema: GenMessage<CollectionSummaryRow>;
/**
 * CollectionSummarySummary provides report-level totals.
 *
 * @generated from message domain.treasury.v1.CollectionSummarySummary
 */
export type CollectionSummarySummary = Message<"domain.treasury.v1.CollectionSummarySummary"> & {
    /**
     * centavos — sum of all collections
     *
     * @generated from field: int64 grand_total = 1;
     */
    grandTotal: bigint;
    /**
     * Total number of collection transactions
     *
     * @generated from field: int64 total_transactions = 2;
     */
    totalTransactions: bigint;
    /**
     * Per-column totals across all rows
     *
     * @generated from field: repeated domain.treasury.v1.CollectionSummaryCell column_totals = 3;
     */
    columnTotals: CollectionSummaryCell[];
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 4;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 5;
     */
    endDate?: string;
    /**
     * Currency of all monetary values
     *
     * @generated from field: string currency = 6;
     */
    currency: string;
};
/**
 * Describes the message domain.treasury.v1.CollectionSummarySummary.
 * Use `create(CollectionSummarySummarySchema)` to create a new message.
 */
export declare const CollectionSummarySummarySchema: GenMessage<CollectionSummarySummary>;
/**
 * CollectionSummaryResponse returns the generated pivot collection summary report.
 *
 * @generated from message domain.treasury.v1.CollectionSummaryResponse
 */
export type CollectionSummaryResponse = Message<"domain.treasury.v1.CollectionSummaryResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated domain.treasury.v1.CollectionSummaryRow rows = 2;
     */
    rows: CollectionSummaryRow[];
    /**
     * @generated from field: optional domain.treasury.v1.CollectionSummarySummary summary = 3;
     */
    summary?: CollectionSummarySummary;
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
 * Describes the message domain.treasury.v1.CollectionSummaryResponse.
 * Use `create(CollectionSummaryResponseSchema)` to create a new message.
 */
export declare const CollectionSummaryResponseSchema: GenMessage<CollectionSummaryResponse>;
/**
 * TreasuryCollectionSummaryDomainService defines collection summary reporting operations.
 *
 * @generated from service domain.treasury.v1.TreasuryCollectionSummaryDomainService
 */
export declare const TreasuryCollectionSummaryDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.TreasuryCollectionSummaryDomainService.GetCollectionSummaryReport
     */
    getCollectionSummaryReport: {
        methodKind: "unary";
        input: typeof CollectionSummaryRequestSchema;
        output: typeof CollectionSummaryResponseSchema;
    };
}>;
