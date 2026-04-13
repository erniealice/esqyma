import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier/supplier_statement/supplier_statement.proto.
 */
export declare const file_domain_entity_supplier_supplier_statement_supplier_statement: GenFile;
/**
 * @generated from message domain.entity.v1.SupplierStatementRequest
 */
export type SupplierStatementRequest = Message<"domain.entity.v1.SupplierStatementRequest"> & {
    /**
     * required — which supplier
     *
     * @generated from field: string supplier_id = 1;
     */
    supplierId: string;
    /**
     * ISO 8601 — statement period start
     *
     * @generated from field: optional string start_date = 2;
     */
    startDate?: string;
    /**
     * ISO 8601 — statement period end
     *
     * @generated from field: optional string end_date = 3;
     */
    endDate?: string;
    /**
     * ISO 8601 — point-in-time balance (excludes transactions after this date)
     *
     * @generated from field: optional string as_of_date = 4;
     */
    asOfDate?: string;
    /**
     * @generated from field: optional string currency = 5;
     */
    currency?: string;
};
/**
 * Describes the message domain.entity.v1.SupplierStatementRequest.
 * Use `create(SupplierStatementRequestSchema)` to create a new message.
 */
export declare const SupplierStatementRequestSchema: GenMessage<SupplierStatementRequest>;
/**
 * @generated from message domain.entity.v1.SupplierStatementLine
 */
export type SupplierStatementLine = Message<"domain.entity.v1.SupplierStatementLine"> & {
    /**
     * ISO 8601
     *
     * @generated from field: string transaction_date = 1;
     */
    transactionDate: string;
    /**
     * "bill" or "payment"
     *
     * @generated from field: string transaction_type = 2;
     */
    transactionType: string;
    /**
     * reference_number
     *
     * @generated from field: string reference = 3;
     */
    reference: string;
    /**
     * name/description
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * centavos (>0 for bills, 0 for payments)
     *
     * @generated from field: int64 billed_amount = 5;
     */
    billedAmount: bigint;
    /**
     * centavos (>0 for payments, 0 for bills)
     *
     * @generated from field: int64 paid_amount = 6;
     */
    paidAmount: bigint;
    /**
     * centavos — cumulative outstanding
     *
     * @generated from field: int64 running_balance = 7;
     */
    runningBalance: bigint;
    /**
     * expenditure_id or disbursement_id
     *
     * @generated from field: optional string source_id = 8;
     */
    sourceId?: string;
    /**
     * always set — the linked expenditure
     *
     * @generated from field: optional string expenditure_id = 9;
     */
    expenditureId?: string;
};
/**
 * Describes the message domain.entity.v1.SupplierStatementLine.
 * Use `create(SupplierStatementLineSchema)` to create a new message.
 */
export declare const SupplierStatementLineSchema: GenMessage<SupplierStatementLine>;
/**
 * @generated from message domain.entity.v1.SupplierStatementSummary
 */
export type SupplierStatementSummary = Message<"domain.entity.v1.SupplierStatementSummary"> & {
    /**
     * centavos
     *
     * @generated from field: int64 total_billed = 1;
     */
    totalBilled: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_paid = 2;
     */
    totalPaid: bigint;
    /**
     * centavos (billed - paid)
     *
     * @generated from field: int64 outstanding_balance = 3;
     */
    outstandingBalance: bigint;
    /**
     * @generated from field: string supplier_name = 4;
     */
    supplierName: string;
    /**
     * @generated from field: optional string supplier_id = 5;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string start_date = 6;
     */
    startDate?: string;
    /**
     * @generated from field: optional string end_date = 7;
     */
    endDate?: string;
    /**
     * @generated from field: optional string as_of_date = 8;
     */
    asOfDate?: string;
    /**
     * @generated from field: string currency = 9;
     */
    currency: string;
    /**
     * @generated from field: int32 transaction_count = 10;
     */
    transactionCount: number;
};
/**
 * Describes the message domain.entity.v1.SupplierStatementSummary.
 * Use `create(SupplierStatementSummarySchema)` to create a new message.
 */
export declare const SupplierStatementSummarySchema: GenMessage<SupplierStatementSummary>;
/**
 * @generated from message domain.entity.v1.SupplierStatementResponse
 */
export type SupplierStatementResponse = Message<"domain.entity.v1.SupplierStatementResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierStatementLine lines = 1;
     */
    lines: SupplierStatementLine[];
    /**
     * @generated from field: optional domain.entity.v1.SupplierStatementSummary summary = 2;
     */
    summary?: SupplierStatementSummary;
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.SupplierStatementResponse.
 * Use `create(SupplierStatementResponseSchema)` to create a new message.
 */
export declare const SupplierStatementResponseSchema: GenMessage<SupplierStatementResponse>;
/**
 * @generated from service domain.entity.v1.SupplierStatementDomainService
 */
export declare const SupplierStatementDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierStatementDomainService.GetSupplierStatement
     */
    getSupplierStatement: {
        methodKind: "unary";
        input: typeof SupplierStatementRequestSchema;
        output: typeof SupplierStatementResponseSchema;
    };
}>;
