import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/reporting/client_statement/client_statement.proto.
 */
export declare const file_domain_ledger_reporting_client_statement_client_statement: GenFile;
/**
 * StatementEntry represents a single line item in a client statement (invoice or collection).
 *
 * @generated from message domain.ledger.v1.StatementEntry
 */
export type StatementEntry = Message<"domain.ledger.v1.StatementEntry"> & {
    /**
     * ISO 8601 YYYY-MM-DD (revenue_date or payment_date)
     *
     * @generated from field: string date = 1;
     */
    date: string;
    /**
     * "invoice" or "collection"
     *
     * @generated from field: string type = 2;
     */
    type: string;
    /**
     * revenue.reference_number or collection.reference_number
     *
     * @generated from field: string reference_number = 3;
     */
    referenceNumber: string;
    /**
     * revenue.name or collection.name
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * centavos — revenue.total_amount (0 for collections)
     *
     * @generated from field: int64 billed = 5;
     */
    billed: bigint;
    /**
     * centavos — collection.amount (0 for invoices)
     *
     * @generated from field: int64 received = 6;
     */
    received: bigint;
    /**
     * centavos — running balance (computed by window function)
     *
     * @generated from field: int64 balance = 7;
     */
    balance: bigint;
    /**
     * revenue.id or collection.id (for linking)
     *
     * @generated from field: string entity_id = 8;
     */
    entityId: string;
    /**
     * revenue.status or collection.status
     *
     * @generated from field: string status = 9;
     */
    status: string;
};
/**
 * Describes the message domain.ledger.v1.StatementEntry.
 * Use `create(StatementEntrySchema)` to create a new message.
 */
export declare const StatementEntrySchema: GenMessage<StatementEntry>;
/**
 * ClientStatementRequest defines parameters for generating a client statement.
 *
 * @generated from message domain.ledger.v1.ClientStatementRequest
 */
export type ClientStatementRequest = Message<"domain.ledger.v1.ClientStatementRequest"> & {
    /**
     * Required
     *
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 2;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 3;
     */
    endDate?: string;
    /**
     * Filter by currency
     *
     * @generated from field: optional string currency = 4;
     */
    currency?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.ledger.v1.ClientStatementRequest.
 * Use `create(ClientStatementRequestSchema)` to create a new message.
 */
export declare const ClientStatementRequestSchema: GenMessage<ClientStatementRequest>;
/**
 * ClientStatementSummary provides report-level totals for the client statement.
 *
 * @generated from message domain.ledger.v1.ClientStatementSummary
 */
export type ClientStatementSummary = Message<"domain.ledger.v1.ClientStatementSummary"> & {
    /**
     * centavos — SUM of all invoices
     *
     * @generated from field: int64 total_billed = 1;
     */
    totalBilled: bigint;
    /**
     * centavos — SUM of all collections
     *
     * @generated from field: int64 total_received = 2;
     */
    totalReceived: bigint;
    /**
     * centavos — total_billed - total_received
     *
     * @generated from field: int64 outstanding_balance = 3;
     */
    outstandingBalance: bigint;
    /**
     * @generated from field: int32 invoice_count = 4;
     */
    invoiceCount: number;
    /**
     * @generated from field: int32 collection_count = 5;
     */
    collectionCount: number;
    /**
     * @generated from field: string currency = 6;
     */
    currency: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 7;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 8;
     */
    endDate?: string;
    /**
     * @generated from field: string client_name = 9;
     */
    clientName: string;
};
/**
 * Describes the message domain.ledger.v1.ClientStatementSummary.
 * Use `create(ClientStatementSummarySchema)` to create a new message.
 */
export declare const ClientStatementSummarySchema: GenMessage<ClientStatementSummary>;
/**
 * ClientStatementResponse returns the generated client statement report.
 *
 * @generated from message domain.ledger.v1.ClientStatementResponse
 */
export type ClientStatementResponse = Message<"domain.ledger.v1.ClientStatementResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.StatementEntry entries = 1;
     */
    entries: StatementEntry[];
    /**
     * @generated from field: optional domain.ledger.v1.ClientStatementSummary summary = 2;
     */
    summary?: ClientStatementSummary;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 3;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.ledger.v1.ClientStatementResponse.
 * Use `create(ClientStatementResponseSchema)` to create a new message.
 */
export declare const ClientStatementResponseSchema: GenMessage<ClientStatementResponse>;
/**
 * LedgerClientStatementDomainService defines client statement reporting operations.
 *
 * @generated from service domain.ledger.v1.LedgerClientStatementDomainService
 */
export declare const LedgerClientStatementDomainService: GenService<{
    /**
     * @generated from rpc domain.ledger.v1.LedgerClientStatementDomainService.GetClientStatement
     */
    getClientStatement: {
        methodKind: "unary";
        input: typeof ClientStatementRequestSchema;
        output: typeof ClientStatementResponseSchema;
    };
}>;
