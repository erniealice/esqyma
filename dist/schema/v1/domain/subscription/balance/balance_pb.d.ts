import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../subscription/subscription_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/balance/balance.proto.
 */
export declare const file_domain_subscription_balance_balance: GenFile;
/**
 * @generated from message domain.subscription.v1.Balance
 */
export type Balance = Message<"domain.subscription.v1.Balance"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: double amount = 2;
     */
    amount: number;
    /**
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: string client_id = 8;
     */
    clientId: string;
    /**
     * @generated from field: optional domain.subscription.v1.Subscription subscription = 9;
     */
    subscription?: Subscription;
    /**
     * @generated from field: string subscription_id = 10;
     */
    subscriptionId: string;
    /**
     * @generated from field: string currency = 11;
     */
    currency: string;
    /**
     * e.g., "credit", "debit", "pending"
     *
     * @generated from field: string balance_type = 12;
     */
    balanceType: string;
};
/**
 * Describes the message domain.subscription.v1.Balance.
 * Use `create(BalanceSchema)` to create a new message.
 */
export declare const BalanceSchema: GenMessage<Balance>;
/**
 * @generated from message domain.subscription.v1.CreateBalanceRequest
 */
export type CreateBalanceRequest = Message<"domain.subscription.v1.CreateBalanceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Balance data = 1;
     */
    data?: Balance;
};
/**
 * Describes the message domain.subscription.v1.CreateBalanceRequest.
 * Use `create(CreateBalanceRequestSchema)` to create a new message.
 */
export declare const CreateBalanceRequestSchema: GenMessage<CreateBalanceRequest>;
/**
 * @generated from message domain.subscription.v1.CreateBalanceResponse
 */
export type CreateBalanceResponse = Message<"domain.subscription.v1.CreateBalanceResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Balance data = 1;
     */
    data: Balance[];
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
 * Describes the message domain.subscription.v1.CreateBalanceResponse.
 * Use `create(CreateBalanceResponseSchema)` to create a new message.
 */
export declare const CreateBalanceResponseSchema: GenMessage<CreateBalanceResponse>;
/**
 * @generated from message domain.subscription.v1.ReadBalanceRequest
 */
export type ReadBalanceRequest = Message<"domain.subscription.v1.ReadBalanceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Balance data = 1;
     */
    data?: Balance;
};
/**
 * Describes the message domain.subscription.v1.ReadBalanceRequest.
 * Use `create(ReadBalanceRequestSchema)` to create a new message.
 */
export declare const ReadBalanceRequestSchema: GenMessage<ReadBalanceRequest>;
/**
 * @generated from message domain.subscription.v1.ReadBalanceResponse
 */
export type ReadBalanceResponse = Message<"domain.subscription.v1.ReadBalanceResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Balance data = 1;
     */
    data: Balance[];
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
 * Describes the message domain.subscription.v1.ReadBalanceResponse.
 * Use `create(ReadBalanceResponseSchema)` to create a new message.
 */
export declare const ReadBalanceResponseSchema: GenMessage<ReadBalanceResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateBalanceRequest
 */
export type UpdateBalanceRequest = Message<"domain.subscription.v1.UpdateBalanceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Balance data = 1;
     */
    data?: Balance;
};
/**
 * Describes the message domain.subscription.v1.UpdateBalanceRequest.
 * Use `create(UpdateBalanceRequestSchema)` to create a new message.
 */
export declare const UpdateBalanceRequestSchema: GenMessage<UpdateBalanceRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateBalanceResponse
 */
export type UpdateBalanceResponse = Message<"domain.subscription.v1.UpdateBalanceResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Balance data = 1;
     */
    data: Balance[];
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
 * Describes the message domain.subscription.v1.UpdateBalanceResponse.
 * Use `create(UpdateBalanceResponseSchema)` to create a new message.
 */
export declare const UpdateBalanceResponseSchema: GenMessage<UpdateBalanceResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteBalanceRequest
 */
export type DeleteBalanceRequest = Message<"domain.subscription.v1.DeleteBalanceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Balance data = 1;
     */
    data?: Balance;
};
/**
 * Describes the message domain.subscription.v1.DeleteBalanceRequest.
 * Use `create(DeleteBalanceRequestSchema)` to create a new message.
 */
export declare const DeleteBalanceRequestSchema: GenMessage<DeleteBalanceRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteBalanceResponse
 */
export type DeleteBalanceResponse = Message<"domain.subscription.v1.DeleteBalanceResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteBalanceResponse.
 * Use `create(DeleteBalanceResponseSchema)` to create a new message.
 */
export declare const DeleteBalanceResponseSchema: GenMessage<DeleteBalanceResponse>;
/**
 * @generated from message domain.subscription.v1.ListBalancesRequest
 */
export type ListBalancesRequest = Message<"domain.subscription.v1.ListBalancesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListBalancesRequest.
 * Use `create(ListBalancesRequestSchema)` to create a new message.
 */
export declare const ListBalancesRequestSchema: GenMessage<ListBalancesRequest>;
/**
 * @generated from message domain.subscription.v1.ListBalancesResponse
 */
export type ListBalancesResponse = Message<"domain.subscription.v1.ListBalancesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Balance data = 1;
     */
    data: Balance[];
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
 * Describes the message domain.subscription.v1.ListBalancesResponse.
 * Use `create(ListBalancesResponseSchema)` to create a new message.
 */
export declare const ListBalancesResponseSchema: GenMessage<ListBalancesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetBalanceListPageDataRequest
 */
export type GetBalanceListPageDataRequest = Message<"domain.subscription.v1.GetBalanceListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.subscription.v1.GetBalanceListPageDataRequest.
 * Use `create(GetBalanceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetBalanceListPageDataRequestSchema: GenMessage<GetBalanceListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetBalanceListPageDataResponse
 */
export type GetBalanceListPageDataResponse = Message<"domain.subscription.v1.GetBalanceListPageDataResponse"> & {
    /**
     * The balance data
     *
     * @generated from field: repeated domain.subscription.v1.Balance balance_list = 1;
     */
    balanceList: Balance[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.subscription.v1.GetBalanceListPageDataResponse.
 * Use `create(GetBalanceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetBalanceListPageDataResponseSchema: GenMessage<GetBalanceListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetBalanceItemPageDataRequest
 */
export type GetBalanceItemPageDataRequest = Message<"domain.subscription.v1.GetBalanceItemPageDataRequest"> & {
    /**
     * The balance ID to retrieve
     *
     * @generated from field: string balance_id = 1;
     */
    balanceId: string;
};
/**
 * Describes the message domain.subscription.v1.GetBalanceItemPageDataRequest.
 * Use `create(GetBalanceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetBalanceItemPageDataRequestSchema: GenMessage<GetBalanceItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetBalanceItemPageDataResponse
 */
export type GetBalanceItemPageDataResponse = Message<"domain.subscription.v1.GetBalanceItemPageDataResponse"> & {
    /**
     * The balance data
     *
     * @generated from field: domain.subscription.v1.Balance balance = 1;
     */
    balance?: Balance;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.subscription.v1.GetBalanceItemPageDataResponse.
 * Use `create(GetBalanceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetBalanceItemPageDataResponseSchema: GenMessage<GetBalanceItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.BalanceDomainService
 */
export declare const BalanceDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.BalanceDomainService.CreateBalance
     */
    createBalance: {
        methodKind: "unary";
        input: typeof CreateBalanceRequestSchema;
        output: typeof CreateBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceDomainService.ReadBalance
     */
    readBalance: {
        methodKind: "unary";
        input: typeof ReadBalanceRequestSchema;
        output: typeof ReadBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceDomainService.UpdateBalance
     */
    updateBalance: {
        methodKind: "unary";
        input: typeof UpdateBalanceRequestSchema;
        output: typeof UpdateBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceDomainService.DeleteBalance
     */
    deleteBalance: {
        methodKind: "unary";
        input: typeof DeleteBalanceRequestSchema;
        output: typeof DeleteBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceDomainService.ListBalances
     */
    listBalances: {
        methodKind: "unary";
        input: typeof ListBalancesRequestSchema;
        output: typeof ListBalancesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.BalanceDomainService.GetBalanceListPageData
     */
    getBalanceListPageData: {
        methodKind: "unary";
        input: typeof GetBalanceListPageDataRequestSchema;
        output: typeof GetBalanceListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.BalanceDomainService.GetBalanceItemPageData
     */
    getBalanceItemPageData: {
        methodKind: "unary";
        input: typeof GetBalanceItemPageDataRequestSchema;
        output: typeof GetBalanceItemPageDataResponseSchema;
    };
}>;
