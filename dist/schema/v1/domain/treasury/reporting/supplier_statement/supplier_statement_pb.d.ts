import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/reporting/supplier_statement/supplier_statement.proto.
 */
export declare const file_domain_treasury_reporting_supplier_statement_supplier_statement: GenFile;
/**
 * SupplierStatementEntry represents a single line item in a supplier statement (bill or payment).
 *
 * @generated from message domain.treasury.v1.SupplierStatementEntry
 */
export type SupplierStatementEntry = Message<"domain.treasury.v1.SupplierStatementEntry"> & {
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
     * expenditure.reference_number or disbursement.reference_number
     *
     * @generated from field: string reference_number = 3;
     */
    referenceNumber: string;
    /**
     * expenditure.name or disbursement.name
     *
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
     * centavos — running balance (computed by window function)
     *
     * @generated from field: int64 balance = 7;
     */
    balance: bigint;
    /**
     * expenditure.id or disbursement.id (for linking)
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
 * Describes the message domain.treasury.v1.SupplierStatementEntry.
 * Use `create(SupplierStatementEntrySchema)` to create a new message.
 */
export declare const SupplierStatementEntrySchema: GenMessage<SupplierStatementEntry>;
/**
 * SupplierStatementRequest defines parameters for generating a supplier statement.
 *
 * @generated from message domain.treasury.v1.SupplierStatementRequest
 */
export type SupplierStatementRequest = Message<"domain.treasury.v1.SupplierStatementRequest"> & {
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
 * Describes the message domain.treasury.v1.SupplierStatementRequest.
 * Use `create(SupplierStatementRequestSchema)` to create a new message.
 */
export declare const SupplierStatementRequestSchema: GenMessage<SupplierStatementRequest>;
/**
 * SupplierStatementSummary provides report-level totals for the supplier statement.
 *
 * @generated from message domain.treasury.v1.SupplierStatementSummary
 */
export type SupplierStatementSummary = Message<"domain.treasury.v1.SupplierStatementSummary"> & {
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
 * Describes the message domain.treasury.v1.SupplierStatementSummary.
 * Use `create(SupplierStatementSummarySchema)` to create a new message.
 */
export declare const SupplierStatementSummarySchema: GenMessage<SupplierStatementSummary>;
/**
 * SupplierStatementResponse returns the generated supplier statement report.
 *
 * @generated from message domain.treasury.v1.SupplierStatementResponse
 */
export type SupplierStatementResponse = Message<"domain.treasury.v1.SupplierStatementResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.SupplierStatementEntry entries = 1;
     */
    entries: SupplierStatementEntry[];
    /**
     * @generated from field: optional domain.treasury.v1.SupplierStatementSummary summary = 2;
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
 * Describes the message domain.treasury.v1.SupplierStatementResponse.
 * Use `create(SupplierStatementResponseSchema)` to create a new message.
 */
export declare const SupplierStatementResponseSchema: GenMessage<SupplierStatementResponse>;
/**
 * TreasurySupplierStatementDomainService defines supplier statement reporting operations.
 *
 * @generated from service domain.treasury.v1.TreasurySupplierStatementDomainService
 */
export declare const TreasurySupplierStatementDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.TreasurySupplierStatementDomainService.GetSupplierStatement
     */
    getSupplierStatement: {
        methodKind: "unary";
        input: typeof SupplierStatementRequestSchema;
        output: typeof SupplierStatementResponseSchema;
    };
}>;
