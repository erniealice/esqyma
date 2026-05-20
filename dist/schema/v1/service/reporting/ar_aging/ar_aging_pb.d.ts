import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../domain/common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/reporting/ar_aging/ar_aging.proto.
 */
export declare const file_service_reporting_ar_aging_ar_aging: GenFile;
/**
 * GetReceivablesAgingRequest defines parameters for the receivables aging report.
 *
 * @generated from message service.reporting.v1.GetReceivablesAgingRequest
 */
export type GetReceivablesAgingRequest = Message<"service.reporting.v1.GetReceivablesAgingRequest"> & {
    /**
     * ISO 8601 date (YYYY-MM-DD) — date to calculate aging from (default: today)
     *
     * @generated from field: optional string as_of_date = 1;
     */
    asOfDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — filter revenues created after
     *
     * @generated from field: optional string start_date = 2;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — filter revenues created before
     *
     * @generated from field: optional string end_date = 3;
     */
    endDate?: string;
    /**
     * Row axis: client/client_category/location/location_area
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
 * Describes the message service.reporting.v1.GetReceivablesAgingRequest.
 * Use `create(GetReceivablesAgingRequestSchema)` to create a new message.
 */
export declare const GetReceivablesAgingRequestSchema: GenMessage<GetReceivablesAgingRequest>;
/**
 * AgingBuckets represents amounts in each aging bucket (all values in centavos).
 *
 * @generated from message service.reporting.v1.AgingBuckets
 */
export type AgingBuckets = Message<"service.reporting.v1.AgingBuckets"> & {
    /**
     * Not yet due (0 days past due)
     *
     * @generated from field: int64 current = 1;
     */
    current: bigint;
    /**
     * 1-30 days past due
     *
     * @generated from field: int64 days_1_30 = 2;
     */
    days130: bigint;
    /**
     * 31-60 days past due
     *
     * @generated from field: int64 days_31_60 = 3;
     */
    days3160: bigint;
    /**
     * 61-90 days past due
     *
     * @generated from field: int64 days_61_90 = 4;
     */
    days6190: bigint;
    /**
     * Over 90 days past due
     *
     * @generated from field: int64 days_over_90 = 5;
     */
    daysOver90: bigint;
};
/**
 * Describes the message service.reporting.v1.AgingBuckets.
 * Use `create(AgingBucketsSchema)` to create a new message.
 */
export declare const AgingBucketsSchema: GenMessage<AgingBuckets>;
/**
 * ReceivablesAgingRow represents one row in the aging report.
 *
 * @generated from message service.reporting.v1.ReceivablesAgingRow
 */
export type ReceivablesAgingRow = Message<"service.reporting.v1.ReceivablesAgingRow"> & {
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
     * centavos — amounts in each aging bucket
     *
     * @generated from field: service.reporting.v1.AgingBuckets buckets = 3;
     */
    buckets?: AgingBuckets;
    /**
     * centavos — sum of all buckets
     *
     * @generated from field: int64 total_outstanding = 4;
     */
    totalOutstanding: bigint;
    /**
     * Number of outstanding invoices
     *
     * @generated from field: int32 invoice_count = 5;
     */
    invoiceCount: number;
};
/**
 * Describes the message service.reporting.v1.ReceivablesAgingRow.
 * Use `create(ReceivablesAgingRowSchema)` to create a new message.
 */
export declare const ReceivablesAgingRowSchema: GenMessage<ReceivablesAgingRow>;
/**
 * ReceivablesAgingSummary provides report-level totals.
 *
 * @generated from message service.reporting.v1.ReceivablesAgingSummary
 */
export type ReceivablesAgingSummary = Message<"service.reporting.v1.ReceivablesAgingSummary"> & {
    /**
     * Grand total per aging bucket
     *
     * @generated from field: service.reporting.v1.AgingBuckets buckets = 1;
     */
    buckets?: AgingBuckets;
    /**
     * centavos — sum of all outstanding
     *
     * @generated from field: int64 grand_total_outstanding = 2;
     */
    grandTotalOutstanding: bigint;
    /**
     * Total number of outstanding invoices
     *
     * @generated from field: int32 total_invoice_count = 3;
     */
    totalInvoiceCount: number;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string as_of_date = 4;
     */
    asOfDate?: string;
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
 * Describes the message service.reporting.v1.ReceivablesAgingSummary.
 * Use `create(ReceivablesAgingSummarySchema)` to create a new message.
 */
export declare const ReceivablesAgingSummarySchema: GenMessage<ReceivablesAgingSummary>;
/**
 * GetReceivablesAgingResponse returns the generated receivables aging report.
 *
 * @generated from message service.reporting.v1.GetReceivablesAgingResponse
 */
export type GetReceivablesAgingResponse = Message<"service.reporting.v1.GetReceivablesAgingResponse"> & {
    /**
     * ["Current", "1-30 Days", "31-60 Days", "61-90 Days", "Over 90 Days"]
     *
     * @generated from field: repeated string bucket_labels = 1;
     */
    bucketLabels: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated service.reporting.v1.ReceivablesAgingRow rows = 2;
     */
    rows: ReceivablesAgingRow[];
    /**
     * @generated from field: optional service.reporting.v1.ReceivablesAgingSummary summary = 3;
     */
    summary?: ReceivablesAgingSummary;
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
 * Describes the message service.reporting.v1.GetReceivablesAgingResponse.
 * Use `create(GetReceivablesAgingResponseSchema)` to create a new message.
 */
export declare const GetReceivablesAgingResponseSchema: GenMessage<GetReceivablesAgingResponse>;
/**
 * GetCollectionSummaryRequest defines parameters for a two-axis pivot collection summary report.
 *
 * @generated from message service.reporting.v1.GetCollectionSummaryRequest
 */
export type GetCollectionSummaryRequest = Message<"service.reporting.v1.GetCollectionSummaryRequest"> & {
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
 * Describes the message service.reporting.v1.GetCollectionSummaryRequest.
 * Use `create(GetCollectionSummaryRequestSchema)` to create a new message.
 */
export declare const GetCollectionSummaryRequestSchema: GenMessage<GetCollectionSummaryRequest>;
/**
 * CollectionSummaryCell represents one cell in the pivot table.
 *
 * @generated from message service.reporting.v1.CollectionSummaryCell
 */
export type CollectionSummaryCell = Message<"service.reporting.v1.CollectionSummaryCell"> & {
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
 * Describes the message service.reporting.v1.CollectionSummaryCell.
 * Use `create(CollectionSummaryCellSchema)` to create a new message.
 */
export declare const CollectionSummaryCellSchema: GenMessage<CollectionSummaryCell>;
/**
 * CollectionSummaryRow represents one row in the pivot table.
 *
 * @generated from message service.reporting.v1.CollectionSummaryRow
 */
export type CollectionSummaryRow = Message<"service.reporting.v1.CollectionSummaryRow"> & {
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
     * @generated from field: repeated service.reporting.v1.CollectionSummaryCell cells = 3;
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
 * Describes the message service.reporting.v1.CollectionSummaryRow.
 * Use `create(CollectionSummaryRowSchema)` to create a new message.
 */
export declare const CollectionSummaryRowSchema: GenMessage<CollectionSummaryRow>;
/**
 * CollectionSummarySummary provides report-level totals.
 *
 * @generated from message service.reporting.v1.CollectionSummarySummary
 */
export type CollectionSummarySummary = Message<"service.reporting.v1.CollectionSummarySummary"> & {
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
     * @generated from field: repeated service.reporting.v1.CollectionSummaryCell column_totals = 3;
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
 * Describes the message service.reporting.v1.CollectionSummarySummary.
 * Use `create(CollectionSummarySummarySchema)` to create a new message.
 */
export declare const CollectionSummarySummarySchema: GenMessage<CollectionSummarySummary>;
/**
 * GetCollectionSummaryResponse returns the generated pivot collection summary report.
 *
 * @generated from message service.reporting.v1.GetCollectionSummaryResponse
 */
export type GetCollectionSummaryResponse = Message<"service.reporting.v1.GetCollectionSummaryResponse"> & {
    /**
     * Ordered column headers
     *
     * @generated from field: repeated string column_keys = 1;
     */
    columnKeys: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated service.reporting.v1.CollectionSummaryRow rows = 2;
     */
    rows: CollectionSummaryRow[];
    /**
     * @generated from field: optional service.reporting.v1.CollectionSummarySummary summary = 3;
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
 * Describes the message service.reporting.v1.GetCollectionSummaryResponse.
 * Use `create(GetCollectionSummaryResponseSchema)` to create a new message.
 */
export declare const GetCollectionSummaryResponseSchema: GenMessage<GetCollectionSummaryResponse>;
/**
 * ARAgingService defines AR-side ledger reporting reads.
 *
 * @generated from service service.reporting.v1.ARAgingService
 */
export declare const ARAgingService: GenService<{
    /**
     * @generated from rpc service.reporting.v1.ARAgingService.GetReceivablesAgingReport
     */
    getReceivablesAgingReport: {
        methodKind: "unary";
        input: typeof GetReceivablesAgingRequestSchema;
        output: typeof GetReceivablesAgingResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.ARAgingService.GetCollectionSummaryReport
     */
    getCollectionSummaryReport: {
        methodKind: "unary";
        input: typeof GetCollectionSummaryRequestSchema;
        output: typeof GetCollectionSummaryResponseSchema;
    };
}>;
