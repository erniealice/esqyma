import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../subscription/subscription_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_attribute/subscription_attribute.proto.
 */
export declare const file_domain_subscription_subscription_attribute_subscription_attribute: GenFile;
/**
 * @generated from message domain.subscription.v1.SubscriptionAttribute
 */
export type SubscriptionAttribute = Message<"domain.subscription.v1.SubscriptionAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string subscription_id = 2;
     */
    subscriptionId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.subscription.v1.Subscription subscription = 5;
     */
    subscription?: Subscription;
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
 * Describes the message domain.subscription.v1.SubscriptionAttribute.
 * Use `create(SubscriptionAttributeSchema)` to create a new message.
 */
export declare const SubscriptionAttributeSchema: GenMessage<SubscriptionAttribute>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionAttributeRequest
 */
export type CreateSubscriptionAttributeRequest = Message<"domain.subscription.v1.CreateSubscriptionAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data?: SubscriptionAttribute;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionAttributeRequest.
 * Use `create(CreateSubscriptionAttributeRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionAttributeRequestSchema: GenMessage<CreateSubscriptionAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionAttributeResponse
 */
export type CreateSubscriptionAttributeResponse = Message<"domain.subscription.v1.CreateSubscriptionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionAttributeResponse.
 * Use `create(CreateSubscriptionAttributeResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionAttributeResponseSchema: GenMessage<CreateSubscriptionAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionAttributeBatchRequest
 */
export type CreateSubscriptionAttributeBatchRequest = Message<"domain.subscription.v1.CreateSubscriptionAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionAttributeBatchRequest.
 * Use `create(CreateSubscriptionAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionAttributeBatchRequestSchema: GenMessage<CreateSubscriptionAttributeBatchRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionAttributeBatchResponse
 */
export type CreateSubscriptionAttributeBatchResponse = Message<"domain.subscription.v1.CreateSubscriptionAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionAttributeBatchResponse.
 * Use `create(CreateSubscriptionAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionAttributeBatchResponseSchema: GenMessage<CreateSubscriptionAttributeBatchResponse>;
/**
 * CreateSubscriptionAttributesByCode creates subscription attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.subscription.v1.SubscriptionAttributesByCodeData
 */
export type SubscriptionAttributesByCodeData = Message<"domain.subscription.v1.SubscriptionAttributesByCodeData"> & {
    /**
     * @generated from field: string subscription_id = 1;
     */
    subscriptionId: string;
    /**
     * {"attribute_code": "value", ...}
     *
     * @generated from field: map<string, string> attributes_map = 2;
     */
    attributesMap: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.subscription.v1.SubscriptionAttributesByCodeData.
 * Use `create(SubscriptionAttributesByCodeDataSchema)` to create a new message.
 */
export declare const SubscriptionAttributesByCodeDataSchema: GenMessage<SubscriptionAttributesByCodeData>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionAttributesByCodeRequest
 */
export type CreateSubscriptionAttributesByCodeRequest = Message<"domain.subscription.v1.CreateSubscriptionAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionAttributesByCodeData data = 1;
     */
    data?: SubscriptionAttributesByCodeData;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionAttributesByCodeRequest.
 * Use `create(CreateSubscriptionAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionAttributesByCodeRequestSchema: GenMessage<CreateSubscriptionAttributesByCodeRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionAttributesByCodeResponse
 */
export type CreateSubscriptionAttributesByCodeResponse = Message<"domain.subscription.v1.CreateSubscriptionAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionAttributesByCodeResponse.
 * Use `create(CreateSubscriptionAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionAttributesByCodeResponseSchema: GenMessage<CreateSubscriptionAttributesByCodeResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionAttributeRequest
 */
export type ReadSubscriptionAttributeRequest = Message<"domain.subscription.v1.ReadSubscriptionAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data?: SubscriptionAttribute;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionAttributeRequest.
 * Use `create(ReadSubscriptionAttributeRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionAttributeRequestSchema: GenMessage<ReadSubscriptionAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionAttributeResponse
 */
export type ReadSubscriptionAttributeResponse = Message<"domain.subscription.v1.ReadSubscriptionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionAttributeResponse.
 * Use `create(ReadSubscriptionAttributeResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionAttributeResponseSchema: GenMessage<ReadSubscriptionAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionAttributeRequest
 */
export type UpdateSubscriptionAttributeRequest = Message<"domain.subscription.v1.UpdateSubscriptionAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data?: SubscriptionAttribute;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionAttributeRequest.
 * Use `create(UpdateSubscriptionAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionAttributeRequestSchema: GenMessage<UpdateSubscriptionAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionAttributeResponse
 */
export type UpdateSubscriptionAttributeResponse = Message<"domain.subscription.v1.UpdateSubscriptionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionAttributeResponse.
 * Use `create(UpdateSubscriptionAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionAttributeResponseSchema: GenMessage<UpdateSubscriptionAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionAttributeRequest
 */
export type DeleteSubscriptionAttributeRequest = Message<"domain.subscription.v1.DeleteSubscriptionAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data?: SubscriptionAttribute;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionAttributeRequest.
 * Use `create(DeleteSubscriptionAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionAttributeRequestSchema: GenMessage<DeleteSubscriptionAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionAttributeResponse
 */
export type DeleteSubscriptionAttributeResponse = Message<"domain.subscription.v1.DeleteSubscriptionAttributeResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionAttributeResponse.
 * Use `create(DeleteSubscriptionAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionAttributeResponseSchema: GenMessage<DeleteSubscriptionAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionAttributesRequest
 */
export type ListSubscriptionAttributesRequest = Message<"domain.subscription.v1.ListSubscriptionAttributesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionAttributesRequest.
 * Use `create(ListSubscriptionAttributesRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionAttributesRequestSchema: GenMessage<ListSubscriptionAttributesRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionAttributesResponse
 */
export type ListSubscriptionAttributesResponse = Message<"domain.subscription.v1.ListSubscriptionAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute data = 1;
     */
    data: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionAttributesResponse.
 * Use `create(ListSubscriptionAttributesResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionAttributesResponseSchema: GenMessage<ListSubscriptionAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetSubscriptionAttributeListPageDataRequest
 */
export type GetSubscriptionAttributeListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionAttributeListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionAttributeListPageDataRequest.
 * Use `create(GetSubscriptionAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionAttributeListPageDataRequestSchema: GenMessage<GetSubscriptionAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetSubscriptionAttributeListPageDataResponse
 */
export type GetSubscriptionAttributeListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionAttributeListPageDataResponse"> & {
    /**
     * The subscription attribute data
     *
     * @generated from field: repeated domain.subscription.v1.SubscriptionAttribute subscription_attribute_list = 1;
     */
    subscriptionAttributeList: SubscriptionAttribute[];
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
 * Describes the message domain.subscription.v1.GetSubscriptionAttributeListPageDataResponse.
 * Use `create(GetSubscriptionAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionAttributeListPageDataResponseSchema: GenMessage<GetSubscriptionAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetSubscriptionAttributeItemPageDataRequest
 */
export type GetSubscriptionAttributeItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionAttributeItemPageDataRequest"> & {
    /**
     * The subscription attribute ID to retrieve
     *
     * @generated from field: string subscription_attribute_id = 1;
     */
    subscriptionAttributeId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionAttributeItemPageDataRequest.
 * Use `create(GetSubscriptionAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionAttributeItemPageDataRequestSchema: GenMessage<GetSubscriptionAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetSubscriptionAttributeItemPageDataResponse
 */
export type GetSubscriptionAttributeItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionAttributeItemPageDataResponse"> & {
    /**
     * The subscription attribute data
     *
     * @generated from field: domain.subscription.v1.SubscriptionAttribute subscription_attribute = 1;
     */
    subscriptionAttribute?: SubscriptionAttribute;
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
 * Describes the message domain.subscription.v1.GetSubscriptionAttributeItemPageDataResponse.
 * Use `create(GetSubscriptionAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionAttributeItemPageDataResponseSchema: GenMessage<GetSubscriptionAttributeItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.SubscriptionAttributeDomainService
 */
export declare const SubscriptionAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.CreateSubscriptionAttribute
     */
    createSubscriptionAttribute: {
        methodKind: "unary";
        input: typeof CreateSubscriptionAttributeRequestSchema;
        output: typeof CreateSubscriptionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.ReadSubscriptionAttribute
     */
    readSubscriptionAttribute: {
        methodKind: "unary";
        input: typeof ReadSubscriptionAttributeRequestSchema;
        output: typeof ReadSubscriptionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.UpdateSubscriptionAttribute
     */
    updateSubscriptionAttribute: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionAttributeRequestSchema;
        output: typeof UpdateSubscriptionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.DeleteSubscriptionAttribute
     */
    deleteSubscriptionAttribute: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionAttributeRequestSchema;
        output: typeof DeleteSubscriptionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.ListSubscriptionAttributes
     */
    listSubscriptionAttributes: {
        methodKind: "unary";
        input: typeof ListSubscriptionAttributesRequestSchema;
        output: typeof ListSubscriptionAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.GetSubscriptionAttributeListPageData
     */
    getSubscriptionAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionAttributeListPageDataRequestSchema;
        output: typeof GetSubscriptionAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.SubscriptionAttributeDomainService.GetSubscriptionAttributeItemPageData
     */
    getSubscriptionAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionAttributeItemPageDataRequestSchema;
        output: typeof GetSubscriptionAttributeItemPageDataResponseSchema;
    };
}>;
