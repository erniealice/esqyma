import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_transaction/asset_transaction.proto.
 */
export declare const file_domain_asset_asset_transaction_asset_transaction: GenFile;
/**
 * @generated from message domain.asset.v1.AssetTransaction
 */
export type AssetTransaction = Message<"domain.asset.v1.AssetTransaction"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: domain.asset.v1.AssetTransactionType transaction_type = 3;
     */
    transactionType: AssetTransactionType;
    /**
     * @generated from field: int64 transaction_date = 4;
     */
    transactionDate: bigint;
    /**
     * @generated from field: string transaction_date_string = 5;
     */
    transactionDateString: string;
    /**
     * @generated from field: double amount = 6;
     */
    amount: number;
    /**
     * @generated from field: optional string description = 7;
     */
    description?: string;
    /**
     * @generated from field: optional string reference_number = 8;
     */
    referenceNumber?: string;
    /**
     * FK to entity.Location (for transfers)
     *
     * @generated from field: optional string from_location_id = 9;
     */
    fromLocationId?: string;
    /**
     * FK to entity.Location (for transfers)
     *
     * @generated from field: optional string to_location_id = 10;
     */
    toLocationId?: string;
    /**
     * FK to ledger.Journal (future)
     *
     * @generated from field: optional string journal_entry_id = 11;
     */
    journalEntryId?: string;
    /**
     * FK to entity.User
     *
     * @generated from field: optional string performed_by = 12;
     */
    performedBy?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 13;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 14;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 15;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 16;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 17;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.AssetTransaction.
 * Use `create(AssetTransactionSchema)` to create a new message.
 */
export declare const AssetTransactionSchema: GenMessage<AssetTransaction>;
/**
 * @generated from message domain.asset.v1.CreateAssetTransactionRequest
 */
export type CreateAssetTransactionRequest = Message<"domain.asset.v1.CreateAssetTransactionRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetTransaction data = 1;
     */
    data?: AssetTransaction;
};
/**
 * Describes the message domain.asset.v1.CreateAssetTransactionRequest.
 * Use `create(CreateAssetTransactionRequestSchema)` to create a new message.
 */
export declare const CreateAssetTransactionRequestSchema: GenMessage<CreateAssetTransactionRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetTransactionResponse
 */
export type CreateAssetTransactionResponse = Message<"domain.asset.v1.CreateAssetTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetTransaction data = 1;
     */
    data: AssetTransaction[];
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
 * Describes the message domain.asset.v1.CreateAssetTransactionResponse.
 * Use `create(CreateAssetTransactionResponseSchema)` to create a new message.
 */
export declare const CreateAssetTransactionResponseSchema: GenMessage<CreateAssetTransactionResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetTransactionRequest
 */
export type ReadAssetTransactionRequest = Message<"domain.asset.v1.ReadAssetTransactionRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetTransaction data = 1;
     */
    data?: AssetTransaction;
};
/**
 * Describes the message domain.asset.v1.ReadAssetTransactionRequest.
 * Use `create(ReadAssetTransactionRequestSchema)` to create a new message.
 */
export declare const ReadAssetTransactionRequestSchema: GenMessage<ReadAssetTransactionRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetTransactionResponse
 */
export type ReadAssetTransactionResponse = Message<"domain.asset.v1.ReadAssetTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetTransaction data = 1;
     */
    data: AssetTransaction[];
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
 * Describes the message domain.asset.v1.ReadAssetTransactionResponse.
 * Use `create(ReadAssetTransactionResponseSchema)` to create a new message.
 */
export declare const ReadAssetTransactionResponseSchema: GenMessage<ReadAssetTransactionResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetTransactionsRequest
 */
export type ListAssetTransactionsRequest = Message<"domain.asset.v1.ListAssetTransactionsRequest"> & {
    /**
     * @generated from field: optional string asset_id = 1;
     */
    assetId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 2;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.asset.v1.ListAssetTransactionsRequest.
 * Use `create(ListAssetTransactionsRequestSchema)` to create a new message.
 */
export declare const ListAssetTransactionsRequestSchema: GenMessage<ListAssetTransactionsRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetTransactionsResponse
 */
export type ListAssetTransactionsResponse = Message<"domain.asset.v1.ListAssetTransactionsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetTransaction data = 1;
     */
    data: AssetTransaction[];
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
 * Describes the message domain.asset.v1.ListAssetTransactionsResponse.
 * Use `create(ListAssetTransactionsResponseSchema)` to create a new message.
 */
export declare const ListAssetTransactionsResponseSchema: GenMessage<ListAssetTransactionsResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetTransactionListPageDataRequest
 */
export type GetAssetTransactionListPageDataRequest = Message<"domain.asset.v1.GetAssetTransactionListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetTransactionListPageDataRequest.
 * Use `create(GetAssetTransactionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetTransactionListPageDataRequestSchema: GenMessage<GetAssetTransactionListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetTransactionListPageDataResponse
 */
export type GetAssetTransactionListPageDataResponse = Message<"domain.asset.v1.GetAssetTransactionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetTransaction asset_transaction_list = 1;
     */
    assetTransactionList: AssetTransaction[];
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
 * Describes the message domain.asset.v1.GetAssetTransactionListPageDataResponse.
 * Use `create(GetAssetTransactionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetTransactionListPageDataResponseSchema: GenMessage<GetAssetTransactionListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetTransactionItemPageDataRequest
 */
export type GetAssetTransactionItemPageDataRequest = Message<"domain.asset.v1.GetAssetTransactionItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_transaction_id = 1;
     */
    assetTransactionId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetTransactionItemPageDataRequest.
 * Use `create(GetAssetTransactionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetTransactionItemPageDataRequestSchema: GenMessage<GetAssetTransactionItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetTransactionItemPageDataResponse
 */
export type GetAssetTransactionItemPageDataResponse = Message<"domain.asset.v1.GetAssetTransactionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetTransaction asset_transaction = 1;
     */
    assetTransaction?: AssetTransaction;
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
 * Describes the message domain.asset.v1.GetAssetTransactionItemPageDataResponse.
 * Use `create(GetAssetTransactionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetTransactionItemPageDataResponseSchema: GenMessage<GetAssetTransactionItemPageDataResponse>;
/**
 * AssetTransactionType enumerates all lifecycle events for an asset.
 *
 * @generated from enum domain.asset.v1.AssetTransactionType
 */
export declare enum AssetTransactionType {
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_ACQUISITION = 1;
     */
    ACQUISITION = 1,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_ADDITION = 2;
     */
    ADDITION = 2,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_DEPRECIATION = 3;
     */
    DEPRECIATION = 3,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_REVALUATION_UP = 4;
     */
    REVALUATION_UP = 4,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_REVALUATION_DOWN = 5;
     */
    REVALUATION_DOWN = 5,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_IMPAIRMENT = 6;
     */
    IMPAIRMENT = 6,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_IMPAIRMENT_REVERSAL = 7;
     */
    IMPAIRMENT_REVERSAL = 7,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_TRANSFER = 8;
     */
    TRANSFER = 8,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_ADJUSTMENT = 9;
     */
    ADJUSTMENT = 9,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_DISPOSAL_SALE = 10;
     */
    DISPOSAL_SALE = 10,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_DISPOSAL_SCRAP = 11;
     */
    DISPOSAL_SCRAP = 11,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_DISPOSAL_DONATION = 12;
     */
    DISPOSAL_DONATION = 12,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_DISPOSAL_TRADE_IN = 13;
     */
    DISPOSAL_TRADE_IN = 13,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_RETIREMENT = 14;
     */
    RETIREMENT = 14,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_REINSTATEMENT = 15;
     */
    REINSTATEMENT = 15,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_MAINTENANCE = 16;
     */
    MAINTENANCE = 16,
    /**
     * @generated from enum value: ASSET_TRANSACTION_TYPE_WRITE_OFF = 17;
     */
    WRITE_OFF = 17
}
/**
 * Describes the enum domain.asset.v1.AssetTransactionType.
 */
export declare const AssetTransactionTypeSchema: GenEnum<AssetTransactionType>;
/**
 * AssetTransactionDomainService — append-only audit trail.
 * NO Update or Delete RPCs — transactions are immutable.
 *
 * @generated from service domain.asset.v1.AssetTransactionDomainService
 */
export declare const AssetTransactionDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetTransactionDomainService.CreateAssetTransaction
     */
    createAssetTransaction: {
        methodKind: "unary";
        input: typeof CreateAssetTransactionRequestSchema;
        output: typeof CreateAssetTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetTransactionDomainService.ReadAssetTransaction
     */
    readAssetTransaction: {
        methodKind: "unary";
        input: typeof ReadAssetTransactionRequestSchema;
        output: typeof ReadAssetTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetTransactionDomainService.ListAssetTransactions
     */
    listAssetTransactions: {
        methodKind: "unary";
        input: typeof ListAssetTransactionsRequestSchema;
        output: typeof ListAssetTransactionsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetTransactionDomainService.GetAssetTransactionListPageData
     */
    getAssetTransactionListPageData: {
        methodKind: "unary";
        input: typeof GetAssetTransactionListPageDataRequestSchema;
        output: typeof GetAssetTransactionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetTransactionDomainService.GetAssetTransactionItemPageData
     */
    getAssetTransactionItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetTransactionItemPageDataRequestSchema;
        output: typeof GetAssetTransactionItemPageDataResponseSchema;
    };
}>;
