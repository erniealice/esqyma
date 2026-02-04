import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Balance } from "../balance/balance_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/balance_attribute/balance_attribute.proto.
 */
export declare const file_domain_subscription_balance_attribute_balance_attribute: GenFile;
/**
 * @generated from message domain.subscription.v1.BalanceAttribute
 */
export type BalanceAttribute = Message<"domain.subscription.v1.BalanceAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string balance_id = 2;
     */
    balanceId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.subscription.v1.Balance balance = 5;
     */
    balance?: Balance;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.BalanceAttribute.
 * Use `create(BalanceAttributeSchema)` to create a new message.
 */
export declare const BalanceAttributeSchema: GenMessage<BalanceAttribute>;
/**
 * @generated from message domain.subscription.v1.CreateBalanceAttributeRequest
 */
export type CreateBalanceAttributeRequest = Message<"domain.subscription.v1.CreateBalanceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BalanceAttribute data = 1;
     */
    data?: BalanceAttribute;
};
/**
 * Describes the message domain.subscription.v1.CreateBalanceAttributeRequest.
 * Use `create(CreateBalanceAttributeRequestSchema)` to create a new message.
 */
export declare const CreateBalanceAttributeRequestSchema: GenMessage<CreateBalanceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.CreateBalanceAttributeResponse
 */
export type CreateBalanceAttributeResponse = Message<"domain.subscription.v1.CreateBalanceAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BalanceAttribute data = 1;
     */
    data: BalanceAttribute[];
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
 * Describes the message domain.subscription.v1.CreateBalanceAttributeResponse.
 * Use `create(CreateBalanceAttributeResponseSchema)` to create a new message.
 */
export declare const CreateBalanceAttributeResponseSchema: GenMessage<CreateBalanceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ReadBalanceAttributeRequest
 */
export type ReadBalanceAttributeRequest = Message<"domain.subscription.v1.ReadBalanceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BalanceAttribute data = 1;
     */
    data?: BalanceAttribute;
};
/**
 * Describes the message domain.subscription.v1.ReadBalanceAttributeRequest.
 * Use `create(ReadBalanceAttributeRequestSchema)` to create a new message.
 */
export declare const ReadBalanceAttributeRequestSchema: GenMessage<ReadBalanceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.ReadBalanceAttributeResponse
 */
export type ReadBalanceAttributeResponse = Message<"domain.subscription.v1.ReadBalanceAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BalanceAttribute data = 1;
     */
    data: BalanceAttribute[];
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
 * Describes the message domain.subscription.v1.ReadBalanceAttributeResponse.
 * Use `create(ReadBalanceAttributeResponseSchema)` to create a new message.
 */
export declare const ReadBalanceAttributeResponseSchema: GenMessage<ReadBalanceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateBalanceAttributeRequest
 */
export type UpdateBalanceAttributeRequest = Message<"domain.subscription.v1.UpdateBalanceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BalanceAttribute data = 1;
     */
    data?: BalanceAttribute;
};
/**
 * Describes the message domain.subscription.v1.UpdateBalanceAttributeRequest.
 * Use `create(UpdateBalanceAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateBalanceAttributeRequestSchema: GenMessage<UpdateBalanceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateBalanceAttributeResponse
 */
export type UpdateBalanceAttributeResponse = Message<"domain.subscription.v1.UpdateBalanceAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BalanceAttribute data = 1;
     */
    data: BalanceAttribute[];
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
 * Describes the message domain.subscription.v1.UpdateBalanceAttributeResponse.
 * Use `create(UpdateBalanceAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateBalanceAttributeResponseSchema: GenMessage<UpdateBalanceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteBalanceAttributeRequest
 */
export type DeleteBalanceAttributeRequest = Message<"domain.subscription.v1.DeleteBalanceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BalanceAttribute data = 1;
     */
    data?: BalanceAttribute;
};
/**
 * Describes the message domain.subscription.v1.DeleteBalanceAttributeRequest.
 * Use `create(DeleteBalanceAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteBalanceAttributeRequestSchema: GenMessage<DeleteBalanceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteBalanceAttributeResponse
 */
export type DeleteBalanceAttributeResponse = Message<"domain.subscription.v1.DeleteBalanceAttributeResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteBalanceAttributeResponse.
 * Use `create(DeleteBalanceAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteBalanceAttributeResponseSchema: GenMessage<DeleteBalanceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ListBalanceAttributesRequest
 */
export type ListBalanceAttributesRequest = Message<"domain.subscription.v1.ListBalanceAttributesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListBalanceAttributesRequest.
 * Use `create(ListBalanceAttributesRequestSchema)` to create a new message.
 */
export declare const ListBalanceAttributesRequestSchema: GenMessage<ListBalanceAttributesRequest>;
/**
 * @generated from message domain.subscription.v1.ListBalanceAttributesResponse
 */
export type ListBalanceAttributesResponse = Message<"domain.subscription.v1.ListBalanceAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BalanceAttribute data = 1;
     */
    data: BalanceAttribute[];
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
 * Describes the message domain.subscription.v1.ListBalanceAttributesResponse.
 * Use `create(ListBalanceAttributesResponseSchema)` to create a new message.
 */
export declare const ListBalanceAttributesResponseSchema: GenMessage<ListBalanceAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetBalanceAttributeListPageDataRequest
 */
export type GetBalanceAttributeListPageDataRequest = Message<"domain.subscription.v1.GetBalanceAttributeListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetBalanceAttributeListPageDataRequest.
 * Use `create(GetBalanceAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetBalanceAttributeListPageDataRequestSchema: GenMessage<GetBalanceAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetBalanceAttributeListPageDataResponse
 */
export type GetBalanceAttributeListPageDataResponse = Message<"domain.subscription.v1.GetBalanceAttributeListPageDataResponse"> & {
    /**
     * The balance attribute data
     *
     * @generated from field: repeated domain.subscription.v1.BalanceAttribute balance_attribute_list = 1;
     */
    balanceAttributeList: BalanceAttribute[];
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
 * Describes the message domain.subscription.v1.GetBalanceAttributeListPageDataResponse.
 * Use `create(GetBalanceAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetBalanceAttributeListPageDataResponseSchema: GenMessage<GetBalanceAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetBalanceAttributeItemPageDataRequest
 */
export type GetBalanceAttributeItemPageDataRequest = Message<"domain.subscription.v1.GetBalanceAttributeItemPageDataRequest"> & {
    /**
     * The balance attribute ID to retrieve
     *
     * @generated from field: string balance_attribute_id = 1;
     */
    balanceAttributeId: string;
};
/**
 * Describes the message domain.subscription.v1.GetBalanceAttributeItemPageDataRequest.
 * Use `create(GetBalanceAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetBalanceAttributeItemPageDataRequestSchema: GenMessage<GetBalanceAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetBalanceAttributeItemPageDataResponse
 */
export type GetBalanceAttributeItemPageDataResponse = Message<"domain.subscription.v1.GetBalanceAttributeItemPageDataResponse"> & {
    /**
     * The balance attribute data
     *
     * @generated from field: domain.subscription.v1.BalanceAttribute balance_attribute = 1;
     */
    balanceAttribute?: BalanceAttribute;
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
 * Describes the message domain.subscription.v1.GetBalanceAttributeItemPageDataResponse.
 * Use `create(GetBalanceAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetBalanceAttributeItemPageDataResponseSchema: GenMessage<GetBalanceAttributeItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.BalanceAttributeDomainService
 */
export declare const BalanceAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.CreateBalanceAttribute
     */
    createBalanceAttribute: {
        methodKind: "unary";
        input: typeof CreateBalanceAttributeRequestSchema;
        output: typeof CreateBalanceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.ReadBalanceAttribute
     */
    readBalanceAttribute: {
        methodKind: "unary";
        input: typeof ReadBalanceAttributeRequestSchema;
        output: typeof ReadBalanceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.UpdateBalanceAttribute
     */
    updateBalanceAttribute: {
        methodKind: "unary";
        input: typeof UpdateBalanceAttributeRequestSchema;
        output: typeof UpdateBalanceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.DeleteBalanceAttribute
     */
    deleteBalanceAttribute: {
        methodKind: "unary";
        input: typeof DeleteBalanceAttributeRequestSchema;
        output: typeof DeleteBalanceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.ListBalanceAttributes
     */
    listBalanceAttributes: {
        methodKind: "unary";
        input: typeof ListBalanceAttributesRequestSchema;
        output: typeof ListBalanceAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.GetBalanceAttributeListPageData
     */
    getBalanceAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetBalanceAttributeListPageDataRequestSchema;
        output: typeof GetBalanceAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.BalanceAttributeDomainService.GetBalanceAttributeItemPageData
     */
    getBalanceAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetBalanceAttributeItemPageDataRequestSchema;
        output: typeof GetBalanceAttributeItemPageDataResponseSchema;
    };
}>;
