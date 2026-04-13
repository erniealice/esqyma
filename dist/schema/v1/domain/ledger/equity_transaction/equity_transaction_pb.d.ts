import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/equity_transaction/equity_transaction.proto.
 */
export declare const file_domain_ledger_equity_transaction_equity_transaction: GenFile;
/**
 * EquityTransaction records a capital movement against an EquityAccount.
 * Each transaction auto-generates a double-entry JournalEntry via guided form.
 *
 * @generated from message domain.ledger.v1.EquityTransaction
 */
export type EquityTransaction = Message<"domain.ledger.v1.EquityTransaction"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent equity account
     *
     * @generated from field: string equity_account_id = 2;
     */
    equityAccountId: string;
    /**
     * @generated from field: domain.ledger.v1.EquityTransactionType transaction_type = 3;
     */
    transactionType: EquityTransactionType;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 4;
     */
    amount: bigint;
    /**
     * @generated from field: optional string description = 5;
     */
    description?: string;
    /**
     * Transaction date
     *
     * @generated from field: int64 transaction_date = 6;
     */
    transactionDate: bigint;
    /**
     * @generated from field: optional string transaction_date_string = 7;
     */
    transactionDateString?: string;
    /**
     * GL traceability — FK to the auto-generated JournalEntry
     *
     * @generated from field: optional string journal_entry_id = 8;
     */
    journalEntryId?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 9;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 10;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.ledger.v1.EquityTransaction.
 * Use `create(EquityTransactionSchema)` to create a new message.
 */
export declare const EquityTransactionSchema: GenMessage<EquityTransaction>;
/**
 * @generated from message domain.ledger.v1.CreateEquityTransactionRequest
 */
export type CreateEquityTransactionRequest = Message<"domain.ledger.v1.CreateEquityTransactionRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityTransaction data = 1;
     */
    data?: EquityTransaction;
};
/**
 * Describes the message domain.ledger.v1.CreateEquityTransactionRequest.
 * Use `create(CreateEquityTransactionRequestSchema)` to create a new message.
 */
export declare const CreateEquityTransactionRequestSchema: GenMessage<CreateEquityTransactionRequest>;
/**
 * @generated from message domain.ledger.v1.CreateEquityTransactionResponse
 */
export type CreateEquityTransactionResponse = Message<"domain.ledger.v1.CreateEquityTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityTransaction data = 1;
     */
    data: EquityTransaction[];
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
 * Describes the message domain.ledger.v1.CreateEquityTransactionResponse.
 * Use `create(CreateEquityTransactionResponseSchema)` to create a new message.
 */
export declare const CreateEquityTransactionResponseSchema: GenMessage<CreateEquityTransactionResponse>;
/**
 * @generated from message domain.ledger.v1.ReadEquityTransactionRequest
 */
export type ReadEquityTransactionRequest = Message<"domain.ledger.v1.ReadEquityTransactionRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityTransaction data = 1;
     */
    data?: EquityTransaction;
};
/**
 * Describes the message domain.ledger.v1.ReadEquityTransactionRequest.
 * Use `create(ReadEquityTransactionRequestSchema)` to create a new message.
 */
export declare const ReadEquityTransactionRequestSchema: GenMessage<ReadEquityTransactionRequest>;
/**
 * @generated from message domain.ledger.v1.ReadEquityTransactionResponse
 */
export type ReadEquityTransactionResponse = Message<"domain.ledger.v1.ReadEquityTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityTransaction data = 1;
     */
    data: EquityTransaction[];
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
 * Describes the message domain.ledger.v1.ReadEquityTransactionResponse.
 * Use `create(ReadEquityTransactionResponseSchema)` to create a new message.
 */
export declare const ReadEquityTransactionResponseSchema: GenMessage<ReadEquityTransactionResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateEquityTransactionRequest
 */
export type UpdateEquityTransactionRequest = Message<"domain.ledger.v1.UpdateEquityTransactionRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityTransaction data = 1;
     */
    data?: EquityTransaction;
};
/**
 * Describes the message domain.ledger.v1.UpdateEquityTransactionRequest.
 * Use `create(UpdateEquityTransactionRequestSchema)` to create a new message.
 */
export declare const UpdateEquityTransactionRequestSchema: GenMessage<UpdateEquityTransactionRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateEquityTransactionResponse
 */
export type UpdateEquityTransactionResponse = Message<"domain.ledger.v1.UpdateEquityTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityTransaction data = 1;
     */
    data: EquityTransaction[];
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
 * Describes the message domain.ledger.v1.UpdateEquityTransactionResponse.
 * Use `create(UpdateEquityTransactionResponseSchema)` to create a new message.
 */
export declare const UpdateEquityTransactionResponseSchema: GenMessage<UpdateEquityTransactionResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteEquityTransactionRequest
 */
export type DeleteEquityTransactionRequest = Message<"domain.ledger.v1.DeleteEquityTransactionRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityTransaction data = 1;
     */
    data?: EquityTransaction;
};
/**
 * Describes the message domain.ledger.v1.DeleteEquityTransactionRequest.
 * Use `create(DeleteEquityTransactionRequestSchema)` to create a new message.
 */
export declare const DeleteEquityTransactionRequestSchema: GenMessage<DeleteEquityTransactionRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteEquityTransactionResponse
 */
export type DeleteEquityTransactionResponse = Message<"domain.ledger.v1.DeleteEquityTransactionResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteEquityTransactionResponse.
 * Use `create(DeleteEquityTransactionResponseSchema)` to create a new message.
 */
export declare const DeleteEquityTransactionResponseSchema: GenMessage<DeleteEquityTransactionResponse>;
/**
 * @generated from message domain.ledger.v1.ListEquityTransactionsRequest
 */
export type ListEquityTransactionsRequest = Message<"domain.ledger.v1.ListEquityTransactionsRequest"> & {
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
 * Describes the message domain.ledger.v1.ListEquityTransactionsRequest.
 * Use `create(ListEquityTransactionsRequestSchema)` to create a new message.
 */
export declare const ListEquityTransactionsRequestSchema: GenMessage<ListEquityTransactionsRequest>;
/**
 * @generated from message domain.ledger.v1.ListEquityTransactionsResponse
 */
export type ListEquityTransactionsResponse = Message<"domain.ledger.v1.ListEquityTransactionsResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityTransaction data = 1;
     */
    data: EquityTransaction[];
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
 * Describes the message domain.ledger.v1.ListEquityTransactionsResponse.
 * Use `create(ListEquityTransactionsResponseSchema)` to create a new message.
 */
export declare const ListEquityTransactionsResponseSchema: GenMessage<ListEquityTransactionsResponse>;
/**
 * @generated from message domain.ledger.v1.GetEquityTransactionListPageDataRequest
 */
export type GetEquityTransactionListPageDataRequest = Message<"domain.ledger.v1.GetEquityTransactionListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.ledger.v1.GetEquityTransactionListPageDataRequest.
 * Use `create(GetEquityTransactionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEquityTransactionListPageDataRequestSchema: GenMessage<GetEquityTransactionListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetEquityTransactionListPageDataResponse
 */
export type GetEquityTransactionListPageDataResponse = Message<"domain.ledger.v1.GetEquityTransactionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityTransaction equity_transaction_list = 1;
     */
    equityTransactionList: EquityTransaction[];
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
 * Describes the message domain.ledger.v1.GetEquityTransactionListPageDataResponse.
 * Use `create(GetEquityTransactionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEquityTransactionListPageDataResponseSchema: GenMessage<GetEquityTransactionListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetEquityTransactionItemPageDataRequest
 */
export type GetEquityTransactionItemPageDataRequest = Message<"domain.ledger.v1.GetEquityTransactionItemPageDataRequest"> & {
    /**
     * @generated from field: string equity_transaction_id = 1;
     */
    equityTransactionId: string;
};
/**
 * Describes the message domain.ledger.v1.GetEquityTransactionItemPageDataRequest.
 * Use `create(GetEquityTransactionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEquityTransactionItemPageDataRequestSchema: GenMessage<GetEquityTransactionItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetEquityTransactionItemPageDataResponse
 */
export type GetEquityTransactionItemPageDataResponse = Message<"domain.ledger.v1.GetEquityTransactionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.EquityTransaction equity_transaction = 1;
     */
    equityTransaction?: EquityTransaction;
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
 * Describes the message domain.ledger.v1.GetEquityTransactionItemPageDataResponse.
 * Use `create(GetEquityTransactionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEquityTransactionItemPageDataResponseSchema: GenMessage<GetEquityTransactionItemPageDataResponse>;
/**
 * EquityTransactionType classifies the nature of the equity movement.
 *
 * @generated from enum domain.ledger.v1.EquityTransactionType
 */
export declare enum EquityTransactionType {
    /**
     * @generated from enum value: EQUITY_TRANSACTION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Owner adds capital (debit Cash, credit Capital)
     *
     * @generated from enum value: EQUITY_TRANSACTION_TYPE_CONTRIBUTION = 1;
     */
    CONTRIBUTION = 1,
    /**
     * Owner draws (debit Draw, credit Cash)
     *
     * @generated from enum value: EQUITY_TRANSACTION_TYPE_WITHDRAWAL = 2;
     */
    WITHDRAWAL = 2,
    /**
     * Profit distribution (debit Retained Earnings, credit Cash)
     *
     * @generated from enum value: EQUITY_TRANSACTION_TYPE_DISTRIBUTION = 3;
     */
    DISTRIBUTION = 3,
    /**
     * Between equity accounts (e.g. close Draw to Capital)
     *
     * @generated from enum value: EQUITY_TRANSACTION_TYPE_TRANSFER = 4;
     */
    TRANSFER = 4
}
/**
 * Describes the enum domain.ledger.v1.EquityTransactionType.
 */
export declare const EquityTransactionTypeSchema: GenEnum<EquityTransactionType>;
/**
 * @generated from service domain.ledger.v1.EquityTransactionDomainService
 */
export declare const EquityTransactionDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.CreateEquityTransaction
     */
    createEquityTransaction: {
        methodKind: "unary";
        input: typeof CreateEquityTransactionRequestSchema;
        output: typeof CreateEquityTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.ReadEquityTransaction
     */
    readEquityTransaction: {
        methodKind: "unary";
        input: typeof ReadEquityTransactionRequestSchema;
        output: typeof ReadEquityTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.UpdateEquityTransaction
     */
    updateEquityTransaction: {
        methodKind: "unary";
        input: typeof UpdateEquityTransactionRequestSchema;
        output: typeof UpdateEquityTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.DeleteEquityTransaction
     */
    deleteEquityTransaction: {
        methodKind: "unary";
        input: typeof DeleteEquityTransactionRequestSchema;
        output: typeof DeleteEquityTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.ListEquityTransactions
     */
    listEquityTransactions: {
        methodKind: "unary";
        input: typeof ListEquityTransactionsRequestSchema;
        output: typeof ListEquityTransactionsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.GetEquityTransactionListPageData
     */
    getEquityTransactionListPageData: {
        methodKind: "unary";
        input: typeof GetEquityTransactionListPageDataRequestSchema;
        output: typeof GetEquityTransactionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityTransactionDomainService.GetEquityTransactionItemPageData
     */
    getEquityTransactionItemPageData: {
        methodKind: "unary";
        input: typeof GetEquityTransactionItemPageDataRequestSchema;
        output: typeof GetEquityTransactionItemPageDataResponseSchema;
    };
}>;
