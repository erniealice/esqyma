import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../domain/common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/reporting/statements/statements.proto.
 */
export declare const file_service_reporting_statements_statements: GenFile;
/**
 * StatementEntry represents a single line item in a client statement
 * (invoice or collection).
 *
 * @generated from message service.reporting.v1.StatementEntry
 */
export type StatementEntry = Message<"service.reporting.v1.StatementEntry"> & {
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
     * @generated from field: string reference_number = 3;
     */
    referenceNumber: string;
    /**
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
     * centavos — running balance
     *
     * @generated from field: int64 balance = 7;
     */
    balance: bigint;
    /**
     * revenue.id or collection.id
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
 * Describes the message service.reporting.v1.StatementEntry.
 * Use `create(StatementEntrySchema)` to create a new message.
 */
export declare const StatementEntrySchema: GenMessage<StatementEntry>;
/**
 * GetClientStatementRequest defines parameters for generating a client
 * statement.
 *
 * @generated from message service.reporting.v1.GetClientStatementRequest
 */
export type GetClientStatementRequest = Message<"service.reporting.v1.GetClientStatementRequest"> & {
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
 * Describes the message service.reporting.v1.GetClientStatementRequest.
 * Use `create(GetClientStatementRequestSchema)` to create a new message.
 */
export declare const GetClientStatementRequestSchema: GenMessage<GetClientStatementRequest>;
/**
 * ClientStatementSummary provides report-level totals for the client
 * statement.
 *
 * @generated from message service.reporting.v1.ClientStatementSummary
 */
export type ClientStatementSummary = Message<"service.reporting.v1.ClientStatementSummary"> & {
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
 * Describes the message service.reporting.v1.ClientStatementSummary.
 * Use `create(ClientStatementSummarySchema)` to create a new message.
 */
export declare const ClientStatementSummarySchema: GenMessage<ClientStatementSummary>;
/**
 * GetClientStatementResponse returns the generated client statement.
 *
 * @generated from message service.reporting.v1.GetClientStatementResponse
 */
export type GetClientStatementResponse = Message<"service.reporting.v1.GetClientStatementResponse"> & {
    /**
     * @generated from field: repeated service.reporting.v1.StatementEntry entries = 1;
     */
    entries: StatementEntry[];
    /**
     * @generated from field: optional service.reporting.v1.ClientStatementSummary summary = 2;
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
 * Describes the message service.reporting.v1.GetClientStatementResponse.
 * Use `create(GetClientStatementResponseSchema)` to create a new message.
 */
export declare const GetClientStatementResponseSchema: GenMessage<GetClientStatementResponse>;
/**
 * SupplierStatementEntry represents a single line item in a supplier
 * statement (bill or payment).
 *
 * @generated from message service.reporting.v1.SupplierStatementEntry
 */
export type SupplierStatementEntry = Message<"service.reporting.v1.SupplierStatementEntry"> & {
    /**
     * ISO 8601 YYYY-MM-DD (expenditure_date or payment_date)
     *
     * @generated from field: string date = 1;
     */
    date: string;
    /**
     * "bill" or "payment"
     *
     * @generated from field: string type = 2;
     */
    type: string;
    /**
     * @generated from field: string reference_number = 3;
     */
    referenceNumber: string;
    /**
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * centavos — expenditure.total_amount (0 for disbursements)
     *
     * @generated from field: int64 billed = 5;
     */
    billed: bigint;
    /**
     * centavos — disbursement.amount (0 for bills)
     *
     * @generated from field: int64 paid = 6;
     */
    paid: bigint;
    /**
     * centavos — running balance
     *
     * @generated from field: int64 balance = 7;
     */
    balance: bigint;
    /**
     * expenditure.id or disbursement.id
     *
     * @generated from field: string entity_id = 8;
     */
    entityId: string;
    /**
     * expenditure.status or disbursement.status
     *
     * @generated from field: string status = 9;
     */
    status: string;
};
/**
 * Describes the message service.reporting.v1.SupplierStatementEntry.
 * Use `create(SupplierStatementEntrySchema)` to create a new message.
 */
export declare const SupplierStatementEntrySchema: GenMessage<SupplierStatementEntry>;
/**
 * GetSupplierStatementRequest defines parameters for generating a supplier
 * statement.
 *
 * @generated from message service.reporting.v1.GetSupplierStatementRequest
 */
export type GetSupplierStatementRequest = Message<"service.reporting.v1.GetSupplierStatementRequest"> & {
    /**
     * Required
     *
     * @generated from field: string supplier_id = 1;
     */
    supplierId: string;
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
 * Describes the message service.reporting.v1.GetSupplierStatementRequest.
 * Use `create(GetSupplierStatementRequestSchema)` to create a new message.
 */
export declare const GetSupplierStatementRequestSchema: GenMessage<GetSupplierStatementRequest>;
/**
 * SupplierStatementSummary provides report-level totals for the supplier
 * statement.
 *
 * @generated from message service.reporting.v1.SupplierStatementSummary
 */
export type SupplierStatementSummary = Message<"service.reporting.v1.SupplierStatementSummary"> & {
    /**
     * centavos — SUM of all bills
     *
     * @generated from field: int64 total_billed = 1;
     */
    totalBilled: bigint;
    /**
     * centavos — SUM of all payments
     *
     * @generated from field: int64 total_paid = 2;
     */
    totalPaid: bigint;
    /**
     * centavos — total_billed - total_paid
     *
     * @generated from field: int64 outstanding_balance = 3;
     */
    outstandingBalance: bigint;
    /**
     * @generated from field: int32 bill_count = 4;
     */
    billCount: number;
    /**
     * @generated from field: int32 payment_count = 5;
     */
    paymentCount: number;
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
     * @generated from field: string supplier_name = 9;
     */
    supplierName: string;
};
/**
 * Describes the message service.reporting.v1.SupplierStatementSummary.
 * Use `create(SupplierStatementSummarySchema)` to create a new message.
 */
export declare const SupplierStatementSummarySchema: GenMessage<SupplierStatementSummary>;
/**
 * GetSupplierStatementResponse returns the generated supplier statement.
 *
 * @generated from message service.reporting.v1.GetSupplierStatementResponse
 */
export type GetSupplierStatementResponse = Message<"service.reporting.v1.GetSupplierStatementResponse"> & {
    /**
     * @generated from field: repeated service.reporting.v1.SupplierStatementEntry entries = 1;
     */
    entries: SupplierStatementEntry[];
    /**
     * @generated from field: optional service.reporting.v1.SupplierStatementSummary summary = 2;
     */
    summary?: SupplierStatementSummary;
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
 * Describes the message service.reporting.v1.GetSupplierStatementResponse.
 * Use `create(GetSupplierStatementResponseSchema)` to create a new message.
 */
export declare const GetSupplierStatementResponseSchema: GenMessage<GetSupplierStatementResponse>;
/**
 * BalanceRow represents one counterparty's outstanding balance.
 * Used by both ListClientBalances and ListSupplierBalances responses.
 *
 * @generated from message service.reporting.v1.BalanceRow
 */
export type BalanceRow = Message<"service.reporting.v1.BalanceRow"> & {
    /**
     * client.id or supplier.id
     *
     * @generated from field: string counterparty_id = 1;
     */
    counterpartyId: string;
    /**
     * Outstanding centavo balance
     *
     * @generated from field: int64 amount_centavos = 2;
     */
    amountCentavos: bigint;
};
/**
 * Describes the message service.reporting.v1.BalanceRow.
 * Use `create(BalanceRowSchema)` to create a new message.
 */
export declare const BalanceRowSchema: GenMessage<BalanceRow>;
/**
 * ListClientBalancesRequest defines parameters for the per-client
 * outstanding-balance lookup. The underlying adapter takes no parameters
 * — the empty request shape preserves room for future workspace/currency
 * filters without a breaking change.
 *
 * @generated from message service.reporting.v1.ListClientBalancesRequest
 */
export type ListClientBalancesRequest = Message<"service.reporting.v1.ListClientBalancesRequest"> & {};
/**
 * Describes the message service.reporting.v1.ListClientBalancesRequest.
 * Use `create(ListClientBalancesRequestSchema)` to create a new message.
 */
export declare const ListClientBalancesRequestSchema: GenMessage<ListClientBalancesRequest>;
/**
 * ListClientBalancesResponse returns one row per client with an
 * outstanding balance.
 *
 * @generated from message service.reporting.v1.ListClientBalancesResponse
 */
export type ListClientBalancesResponse = Message<"service.reporting.v1.ListClientBalancesResponse"> & {
    /**
     * @generated from field: repeated service.reporting.v1.BalanceRow balances = 1;
     */
    balances: BalanceRow[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message service.reporting.v1.ListClientBalancesResponse.
 * Use `create(ListClientBalancesResponseSchema)` to create a new message.
 */
export declare const ListClientBalancesResponseSchema: GenMessage<ListClientBalancesResponse>;
/**
 * ListSupplierBalancesRequest defines parameters for the per-supplier
 * outstanding-balance lookup. Empty for the same reason as
 * ListClientBalancesRequest.
 *
 * @generated from message service.reporting.v1.ListSupplierBalancesRequest
 */
export type ListSupplierBalancesRequest = Message<"service.reporting.v1.ListSupplierBalancesRequest"> & {};
/**
 * Describes the message service.reporting.v1.ListSupplierBalancesRequest.
 * Use `create(ListSupplierBalancesRequestSchema)` to create a new message.
 */
export declare const ListSupplierBalancesRequestSchema: GenMessage<ListSupplierBalancesRequest>;
/**
 * ListSupplierBalancesResponse returns one row per supplier with an
 * outstanding balance.
 *
 * @generated from message service.reporting.v1.ListSupplierBalancesResponse
 */
export type ListSupplierBalancesResponse = Message<"service.reporting.v1.ListSupplierBalancesResponse"> & {
    /**
     * @generated from field: repeated service.reporting.v1.BalanceRow balances = 1;
     */
    balances: BalanceRow[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message service.reporting.v1.ListSupplierBalancesResponse.
 * Use `create(ListSupplierBalancesResponseSchema)` to create a new message.
 */
export declare const ListSupplierBalancesResponseSchema: GenMessage<ListSupplierBalancesResponse>;
/**
 * StatementsService defines counterparty statement + balance reads.
 *
 * @generated from service service.reporting.v1.StatementsService
 */
export declare const StatementsService: GenService<{
    /**
     * @generated from rpc service.reporting.v1.StatementsService.GetClientStatement
     */
    getClientStatement: {
        methodKind: "unary";
        input: typeof GetClientStatementRequestSchema;
        output: typeof GetClientStatementResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.StatementsService.GetSupplierStatement
     */
    getSupplierStatement: {
        methodKind: "unary";
        input: typeof GetSupplierStatementRequestSchema;
        output: typeof GetSupplierStatementResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.StatementsService.ListClientBalances
     */
    listClientBalances: {
        methodKind: "unary";
        input: typeof ListClientBalancesRequestSchema;
        output: typeof ListClientBalancesResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.StatementsService.ListSupplierBalances
     */
    listSupplierBalances: {
        methodKind: "unary";
        input: typeof ListSupplierBalancesRequestSchema;
        output: typeof ListSupplierBalancesResponseSchema;
    };
}>;
