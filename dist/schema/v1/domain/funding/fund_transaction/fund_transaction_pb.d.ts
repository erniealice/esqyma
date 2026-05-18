import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/funding/fund_transaction/fund_transaction.proto.
 */
export declare const file_domain_funding_fund_transaction_fund_transaction: GenFile;
/**
 * FundTransaction — append-only event log for all money movements on a Fund.
 *
 * workspace_id is OPTIONAL here: fund-global events (OPENING_BALANCE,
 * LIMIT_INCREASE, LIMIT_DECREASE) have no workspace attribution; all
 * workspace-originated events (DRAW, SETTLEMENT, etc.) carry workspace_id.
 *
 * NEVER mutate existing rows. To correct an error, insert a *_REVERSAL row
 * with reverses_id pointing at the original, then insert a corrected row.
 *
 * Composite indexes beyond per-field declarations (enforced by migration):
 *   (idempotency_key)                                      UNIQUE
 *   (fund_id, status, posted_at)
 *   (allocation_id, status, posted_at) WHERE allocation_id IS NOT NULL
 *   (transfer_id)                      WHERE transfer_id IS NOT NULL
 *
 * A VIEW `fund_transaction_posted` (SELECT * WHERE status = 2) must be
 * created by the migration. All projection queries MUST target the view.
 *
 * @generated from message domain.funding.v1.FundTransaction
 */
export type FundTransaction = Message<"domain.funding.v1.FundTransaction"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 3;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 5;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * Parent Fund — always present
     *
     * @generated from field: string fund_id = 7;
     */
    fundId: string;
    /**
     * Allocation — present for workspace-attributed events; NULL for fund-global events
     *
     * @generated from field: optional string allocation_id = 8;
     */
    allocationId?: string;
    /**
     * Workspace — present when a specific workspace caused this event; NULL for fund-global events
     *
     * @generated from field: optional string workspace_id = 9;
     */
    workspaceId?: string;
    /**
     * Event classification + amount
     *
     * @generated from field: domain.funding.v1.FundTransactionKind kind = 10;
     */
    kind: FundTransactionKind;
    /**
     * centavos, source currency, ALWAYS POSITIVE — direction encoded in kind
     *
     * @generated from field: int64 amount = 11;
     */
    amount: bigint;
    /**
     * Timestamps
     *
     * when the event happened (operator-supplied or paired-entity date)
     *
     * @generated from field: int64 effective_at = 12;
     */
    effectiveAt: bigint;
    /**
     * when the row was inserted (server time)
     *
     * @generated from field: int64 posted_at = 13;
     */
    postedAt: bigint;
    /**
     * @generated from field: domain.funding.v1.FundTransactionStatus status = 14;
     */
    status: FundTransactionStatus;
    /**
     * Reversal chain — set for *_REVERSAL kinds; NULL otherwise
     *
     * @generated from field: optional string reverses_id = 15;
     */
    reversesId?: string;
    /**
     * Idempotency — UNIQUE; convention: "{caller_use_case}-{caller_entity_id}-{verb}"
     *
     * @generated from field: string idempotency_key = 16;
     */
    idempotencyKey: string;
    /**
     * FX snapshot — present when source currency differs from workspace functional currency
     *
     * @generated from field: optional double exchange_rate_snapshot = 17;
     */
    exchangeRateSnapshot?: number;
    /**
     * centavos in workspace functional currency
     *
     * @generated from field: optional int64 amount_functional_currency = 18;
     */
    amountFunctionalCurrency?: bigint;
    /**
     * ISO 4217, denormed for audit
     *
     * @generated from field: optional string functional_currency = 19;
     */
    functionalCurrency?: string;
    /**
     * Optional back-edges to the entity that spawned this event
     *
     * @generated from field: optional string expenditure_id = 20;
     */
    expenditureId?: string;
    /**
     * @generated from field: optional string disbursement_id = 21;
     */
    disbursementId?: string;
    /**
     * @generated from field: optional string collection_id = 22;
     */
    collectionId?: string;
    /**
     * groups TRANSFER_OUT + TRANSFER_IN; NOT a FK (no transfer entity)
     *
     * @generated from field: optional string transfer_id = 23;
     */
    transferId?: string;
    /**
     * GL traceability
     *
     * @generated from field: optional string journal_entry_id = 24;
     */
    journalEntryId?: string;
    /**
     * Narrative
     *
     * @generated from field: optional string description = 25;
     */
    description?: string;
    /**
     * merchant ref, check #, statement ref
     *
     * @generated from field: optional string reference_number = 26;
     */
    referenceNumber?: string;
    /**
     * Audit
     *
     * @generated from field: optional string created_by_user_id = 27;
     */
    createdByUserId?: string;
};
/**
 * Describes the message domain.funding.v1.FundTransaction.
 * Use `create(FundTransactionSchema)` to create a new message.
 */
export declare const FundTransactionSchema: GenMessage<FundTransaction>;
/**
 * @generated from message domain.funding.v1.CreateFundTransactionRequest
 */
export type CreateFundTransactionRequest = Message<"domain.funding.v1.CreateFundTransactionRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundTransaction data = 1;
     */
    data?: FundTransaction;
};
/**
 * Describes the message domain.funding.v1.CreateFundTransactionRequest.
 * Use `create(CreateFundTransactionRequestSchema)` to create a new message.
 */
export declare const CreateFundTransactionRequestSchema: GenMessage<CreateFundTransactionRequest>;
/**
 * @generated from message domain.funding.v1.CreateFundTransactionResponse
 */
export type CreateFundTransactionResponse = Message<"domain.funding.v1.CreateFundTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundTransaction data = 1;
     */
    data: FundTransaction[];
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
 * Describes the message domain.funding.v1.CreateFundTransactionResponse.
 * Use `create(CreateFundTransactionResponseSchema)` to create a new message.
 */
export declare const CreateFundTransactionResponseSchema: GenMessage<CreateFundTransactionResponse>;
/**
 * @generated from message domain.funding.v1.ReadFundTransactionRequest
 */
export type ReadFundTransactionRequest = Message<"domain.funding.v1.ReadFundTransactionRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundTransaction data = 1;
     */
    data?: FundTransaction;
};
/**
 * Describes the message domain.funding.v1.ReadFundTransactionRequest.
 * Use `create(ReadFundTransactionRequestSchema)` to create a new message.
 */
export declare const ReadFundTransactionRequestSchema: GenMessage<ReadFundTransactionRequest>;
/**
 * @generated from message domain.funding.v1.ReadFundTransactionResponse
 */
export type ReadFundTransactionResponse = Message<"domain.funding.v1.ReadFundTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundTransaction data = 1;
     */
    data: FundTransaction[];
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
 * Describes the message domain.funding.v1.ReadFundTransactionResponse.
 * Use `create(ReadFundTransactionResponseSchema)` to create a new message.
 */
export declare const ReadFundTransactionResponseSchema: GenMessage<ReadFundTransactionResponse>;
/**
 * @generated from message domain.funding.v1.UpdateFundTransactionRequest
 */
export type UpdateFundTransactionRequest = Message<"domain.funding.v1.UpdateFundTransactionRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundTransaction data = 1;
     */
    data?: FundTransaction;
};
/**
 * Describes the message domain.funding.v1.UpdateFundTransactionRequest.
 * Use `create(UpdateFundTransactionRequestSchema)` to create a new message.
 */
export declare const UpdateFundTransactionRequestSchema: GenMessage<UpdateFundTransactionRequest>;
/**
 * @generated from message domain.funding.v1.UpdateFundTransactionResponse
 */
export type UpdateFundTransactionResponse = Message<"domain.funding.v1.UpdateFundTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundTransaction data = 1;
     */
    data: FundTransaction[];
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
 * Describes the message domain.funding.v1.UpdateFundTransactionResponse.
 * Use `create(UpdateFundTransactionResponseSchema)` to create a new message.
 */
export declare const UpdateFundTransactionResponseSchema: GenMessage<UpdateFundTransactionResponse>;
/**
 * @generated from message domain.funding.v1.DeleteFundTransactionRequest
 */
export type DeleteFundTransactionRequest = Message<"domain.funding.v1.DeleteFundTransactionRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundTransaction data = 1;
     */
    data?: FundTransaction;
};
/**
 * Describes the message domain.funding.v1.DeleteFundTransactionRequest.
 * Use `create(DeleteFundTransactionRequestSchema)` to create a new message.
 */
export declare const DeleteFundTransactionRequestSchema: GenMessage<DeleteFundTransactionRequest>;
/**
 * @generated from message domain.funding.v1.DeleteFundTransactionResponse
 */
export type DeleteFundTransactionResponse = Message<"domain.funding.v1.DeleteFundTransactionResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.funding.v1.DeleteFundTransactionResponse.
 * Use `create(DeleteFundTransactionResponseSchema)` to create a new message.
 */
export declare const DeleteFundTransactionResponseSchema: GenMessage<DeleteFundTransactionResponse>;
/**
 * @generated from message domain.funding.v1.ListFundTransactionsRequest
 */
export type ListFundTransactionsRequest = Message<"domain.funding.v1.ListFundTransactionsRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 1;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 4;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.funding.v1.ListFundTransactionsRequest.
 * Use `create(ListFundTransactionsRequestSchema)` to create a new message.
 */
export declare const ListFundTransactionsRequestSchema: GenMessage<ListFundTransactionsRequest>;
/**
 * @generated from message domain.funding.v1.ListFundTransactionsResponse
 */
export type ListFundTransactionsResponse = Message<"domain.funding.v1.ListFundTransactionsResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundTransaction data = 1;
     */
    data: FundTransaction[];
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
 * Describes the message domain.funding.v1.ListFundTransactionsResponse.
 * Use `create(ListFundTransactionsResponseSchema)` to create a new message.
 */
export declare const ListFundTransactionsResponseSchema: GenMessage<ListFundTransactionsResponse>;
/**
 * @generated from message domain.funding.v1.GetFundTransactionListPageDataRequest
 */
export type GetFundTransactionListPageDataRequest = Message<"domain.funding.v1.GetFundTransactionListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 1;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 4;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.funding.v1.GetFundTransactionListPageDataRequest.
 * Use `create(GetFundTransactionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetFundTransactionListPageDataRequestSchema: GenMessage<GetFundTransactionListPageDataRequest>;
/**
 * @generated from message domain.funding.v1.GetFundTransactionListPageDataResponse
 */
export type GetFundTransactionListPageDataResponse = Message<"domain.funding.v1.GetFundTransactionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundTransaction fund_transaction_list = 1;
     */
    fundTransactionList: FundTransaction[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
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
 * Describes the message domain.funding.v1.GetFundTransactionListPageDataResponse.
 * Use `create(GetFundTransactionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetFundTransactionListPageDataResponseSchema: GenMessage<GetFundTransactionListPageDataResponse>;
/**
 * @generated from message domain.funding.v1.GetFundTransactionItemPageDataRequest
 */
export type GetFundTransactionItemPageDataRequest = Message<"domain.funding.v1.GetFundTransactionItemPageDataRequest"> & {
    /**
     * @generated from field: string fund_transaction_id = 1;
     */
    fundTransactionId: string;
};
/**
 * Describes the message domain.funding.v1.GetFundTransactionItemPageDataRequest.
 * Use `create(GetFundTransactionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetFundTransactionItemPageDataRequestSchema: GenMessage<GetFundTransactionItemPageDataRequest>;
/**
 * @generated from message domain.funding.v1.GetFundTransactionItemPageDataResponse
 */
export type GetFundTransactionItemPageDataResponse = Message<"domain.funding.v1.GetFundTransactionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.funding.v1.FundTransaction fund_transaction = 1;
     */
    fundTransaction?: FundTransaction;
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
 * Describes the message domain.funding.v1.GetFundTransactionItemPageDataResponse.
 * Use `create(GetFundTransactionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetFundTransactionItemPageDataResponseSchema: GenMessage<GetFundTransactionItemPageDataResponse>;
/**
 * FundTransactionStatus — controls whether a row contributes to balance projections.
 * Only POSTED rows are summed by projection queries (via the fund_transaction_posted VIEW).
 *
 * @generated from enum domain.funding.v1.FundTransactionStatus
 */
export declare enum FundTransactionStatus {
    /**
     * @generated from enum value: FUND_TRANSACTION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * does NOT contribute to balance projections in v1
     *
     * @generated from enum value: FUND_TRANSACTION_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * the only status counted toward SUM projections
     *
     * @generated from enum value: FUND_TRANSACTION_STATUS_POSTED = 2;
     */
    POSTED = 2,
    /**
     * soft-delete; original row preserved for forensics
     *
     * @generated from enum value: FUND_TRANSACTION_STATUS_VOIDED = 3;
     */
    VOIDED = 3
}
/**
 * Describes the enum domain.funding.v1.FundTransactionStatus.
 */
export declare const FundTransactionStatusSchema: GenEnum<FundTransactionStatus>;
/**
 * FundTransactionKind — classifies each event in the append-only log.
 * Direction is encoded in the kind; `amount` is ALWAYS POSITIVE.
 *
 * @generated from enum domain.funding.v1.FundTransactionKind
 */
export declare enum FundTransactionKind {
    /**
     * @generated from enum value: FUND_TRANSACTION_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * initialization; sets starting position
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_OPENING_BALANCE = 1;
     */
    OPENING_BALANCE = 1,
    /**
     * deposit (asset) or repayment (credit)
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_CASH_IN = 2;
     */
    CASH_IN = 2,
    /**
     * withdrawal (asset) or untracked spend
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_CASH_OUT = 3;
     */
    CASH_OUT = 3,
    /**
     * charge against an allocation; paired with Expenditure
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_DRAW = 4;
     */
    DRAW = 4,
    /**
     * pay down outstanding draws; paired with Disbursement
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_SETTLEMENT = 5;
     */
    SETTLEMENT = 5,
    /**
     * unwind a DRAW; reverses_id → original row
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_DRAW_REVERSAL = 6;
     */
    DRAW_REVERSAL = 6,
    /**
     * unwind a SETTLEMENT; reverses_id → original row
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_SETTLEMENT_REVERSAL = 7;
     */
    SETTLEMENT_REVERSAL = 7,
    /**
     * audit event for authorized_limit change
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_LIMIT_INCREASE = 8;
     */
    LIMIT_INCREASE = 8,
    /**
     * audit event for authorized_limit change
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_LIMIT_DECREASE = 9;
     */
    LIMIT_DECREASE = 9,
    /**
     * owner shifts an allocation's allocated_limit; audit
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_ALLOCATION_ADJUSTMENT = 10;
     */
    ALLOCATION_ADJUSTMENT = 10,
    /**
     * source side of a fund-to-fund transfer
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_TRANSFER_OUT = 11;
     */
    TRANSFER_OUT = 11,
    /**
     * destination side; same transfer_id as OUT row
     *
     * @generated from enum value: FUND_TRANSACTION_KIND_TRANSFER_IN = 12;
     */
    TRANSFER_IN = 12
}
/**
 * Describes the enum domain.funding.v1.FundTransactionKind.
 */
export declare const FundTransactionKindSchema: GenEnum<FundTransactionKind>;
/**
 * @generated from service domain.funding.v1.FundTransactionDomainService
 */
export declare const FundTransactionDomainService: GenService<{
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.CreateFundTransaction
     */
    createFundTransaction: {
        methodKind: "unary";
        input: typeof CreateFundTransactionRequestSchema;
        output: typeof CreateFundTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.ReadFundTransaction
     */
    readFundTransaction: {
        methodKind: "unary";
        input: typeof ReadFundTransactionRequestSchema;
        output: typeof ReadFundTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.UpdateFundTransaction
     */
    updateFundTransaction: {
        methodKind: "unary";
        input: typeof UpdateFundTransactionRequestSchema;
        output: typeof UpdateFundTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.DeleteFundTransaction
     */
    deleteFundTransaction: {
        methodKind: "unary";
        input: typeof DeleteFundTransactionRequestSchema;
        output: typeof DeleteFundTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.ListFundTransactions
     */
    listFundTransactions: {
        methodKind: "unary";
        input: typeof ListFundTransactionsRequestSchema;
        output: typeof ListFundTransactionsResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.GetFundTransactionListPageData
     */
    getFundTransactionListPageData: {
        methodKind: "unary";
        input: typeof GetFundTransactionListPageDataRequestSchema;
        output: typeof GetFundTransactionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundTransactionDomainService.GetFundTransactionItemPageData
     */
    getFundTransactionItemPageData: {
        methodKind: "unary";
        input: typeof GetFundTransactionItemPageDataRequestSchema;
        output: typeof GetFundTransactionItemPageDataResponseSchema;
    };
}>;
