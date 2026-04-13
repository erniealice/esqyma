import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/reporting/receivables_aging/receivables_aging.proto.
 */
export declare const file_domain_ledger_reporting_receivables_aging_receivables_aging: GenFile;
/**
 * ReceivablesAgingRequest defines parameters for the receivables aging report.
 *
 * @generated from message domain.ledger.v1.ReceivablesAgingRequest
 */
export type ReceivablesAgingRequest = Message<"domain.ledger.v1.ReceivablesAgingRequest"> & {
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
 * Describes the message domain.ledger.v1.ReceivablesAgingRequest.
 * Use `create(ReceivablesAgingRequestSchema)` to create a new message.
 */
export declare const ReceivablesAgingRequestSchema: GenMessage<ReceivablesAgingRequest>;
/**
 * AgingBuckets represents amounts in each aging bucket (all values in centavos).
 *
 * @generated from message domain.ledger.v1.AgingBuckets
 */
export type AgingBuckets = Message<"domain.ledger.v1.AgingBuckets"> & {
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
 * Describes the message domain.ledger.v1.AgingBuckets.
 * Use `create(AgingBucketsSchema)` to create a new message.
 */
export declare const AgingBucketsSchema: GenMessage<AgingBuckets>;
/**
 * ReceivablesAgingRow represents one row in the aging report.
 *
 * @generated from message domain.ledger.v1.ReceivablesAgingRow
 */
export type ReceivablesAgingRow = Message<"domain.ledger.v1.ReceivablesAgingRow"> & {
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
     * @generated from field: domain.ledger.v1.AgingBuckets buckets = 3;
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
 * Describes the message domain.ledger.v1.ReceivablesAgingRow.
 * Use `create(ReceivablesAgingRowSchema)` to create a new message.
 */
export declare const ReceivablesAgingRowSchema: GenMessage<ReceivablesAgingRow>;
/**
 * ReceivablesAgingSummary provides report-level totals.
 *
 * @generated from message domain.ledger.v1.ReceivablesAgingSummary
 */
export type ReceivablesAgingSummary = Message<"domain.ledger.v1.ReceivablesAgingSummary"> & {
    /**
     * Grand total per aging bucket
     *
     * @generated from field: domain.ledger.v1.AgingBuckets buckets = 1;
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
 * Describes the message domain.ledger.v1.ReceivablesAgingSummary.
 * Use `create(ReceivablesAgingSummarySchema)` to create a new message.
 */
export declare const ReceivablesAgingSummarySchema: GenMessage<ReceivablesAgingSummary>;
/**
 * ReceivablesAgingResponse returns the generated receivables aging report.
 *
 * @generated from message domain.ledger.v1.ReceivablesAgingResponse
 */
export type ReceivablesAgingResponse = Message<"domain.ledger.v1.ReceivablesAgingResponse"> & {
    /**
     * ["Current", "1-30 Days", "31-60 Days", "61-90 Days", "Over 90 Days"]
     *
     * @generated from field: repeated string bucket_labels = 1;
     */
    bucketLabels: string[];
    /**
     * One row per row_dimension value
     *
     * @generated from field: repeated domain.ledger.v1.ReceivablesAgingRow rows = 2;
     */
    rows: ReceivablesAgingRow[];
    /**
     * @generated from field: optional domain.ledger.v1.ReceivablesAgingSummary summary = 3;
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
 * Describes the message domain.ledger.v1.ReceivablesAgingResponse.
 * Use `create(ReceivablesAgingResponseSchema)` to create a new message.
 */
export declare const ReceivablesAgingResponseSchema: GenMessage<ReceivablesAgingResponse>;
/**
 * LedgerReceivablesAgingDomainService defines receivables aging reporting operations.
 *
 * @generated from service domain.ledger.v1.LedgerReceivablesAgingDomainService
 */
export declare const LedgerReceivablesAgingDomainService: GenService<{
    /**
     * @generated from rpc domain.ledger.v1.LedgerReceivablesAgingDomainService.GetReceivablesAgingReport
     */
    getReceivablesAgingReport: {
        methodKind: "unary";
        input: typeof ReceivablesAgingRequestSchema;
        output: typeof ReceivablesAgingResponseSchema;
    };
}>;
