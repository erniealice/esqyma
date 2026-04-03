import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Revenue } from "../revenue/revenue_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue_attribute/revenue_attribute.proto.
 */
export declare const file_domain_revenue_revenue_attribute_revenue_attribute: GenFile;
/**
 * @generated from message domain.revenue.v1.RevenueAttribute
 */
export type RevenueAttribute = Message<"domain.revenue.v1.RevenueAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string revenue_id = 2;
     */
    revenueId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.revenue.v1.Revenue revenue = 5;
     */
    revenue?: Revenue;
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
 * Describes the message domain.revenue.v1.RevenueAttribute.
 * Use `create(RevenueAttributeSchema)` to create a new message.
 */
export declare const RevenueAttributeSchema: GenMessage<RevenueAttribute>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueAttributeRequest
 */
export type CreateRevenueAttributeRequest = Message<"domain.revenue.v1.CreateRevenueAttributeRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueAttribute data = 1;
     */
    data?: RevenueAttribute;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueAttributeRequest.
 * Use `create(CreateRevenueAttributeRequestSchema)` to create a new message.
 */
export declare const CreateRevenueAttributeRequestSchema: GenMessage<CreateRevenueAttributeRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueAttributeResponse
 */
export type CreateRevenueAttributeResponse = Message<"domain.revenue.v1.CreateRevenueAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
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
 * Describes the message domain.revenue.v1.CreateRevenueAttributeResponse.
 * Use `create(CreateRevenueAttributeResponseSchema)` to create a new message.
 */
export declare const CreateRevenueAttributeResponseSchema: GenMessage<CreateRevenueAttributeResponse>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueAttributeBatchRequest
 */
export type CreateRevenueAttributeBatchRequest = Message<"domain.revenue.v1.CreateRevenueAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueAttributeBatchRequest.
 * Use `create(CreateRevenueAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateRevenueAttributeBatchRequestSchema: GenMessage<CreateRevenueAttributeBatchRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueAttributeBatchResponse
 */
export type CreateRevenueAttributeBatchResponse = Message<"domain.revenue.v1.CreateRevenueAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
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
 * Describes the message domain.revenue.v1.CreateRevenueAttributeBatchResponse.
 * Use `create(CreateRevenueAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateRevenueAttributeBatchResponseSchema: GenMessage<CreateRevenueAttributeBatchResponse>;
/**
 * CreateRevenueAttributesByCode creates revenue attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.revenue.v1.RevenueAttributesByCodeData
 */
export type RevenueAttributesByCodeData = Message<"domain.revenue.v1.RevenueAttributesByCodeData"> & {
    /**
     * @generated from field: string revenue_id = 1;
     */
    revenueId: string;
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
 * Describes the message domain.revenue.v1.RevenueAttributesByCodeData.
 * Use `create(RevenueAttributesByCodeDataSchema)` to create a new message.
 */
export declare const RevenueAttributesByCodeDataSchema: GenMessage<RevenueAttributesByCodeData>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueAttributesByCodeRequest
 */
export type CreateRevenueAttributesByCodeRequest = Message<"domain.revenue.v1.CreateRevenueAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueAttributesByCodeData data = 1;
     */
    data?: RevenueAttributesByCodeData;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueAttributesByCodeRequest.
 * Use `create(CreateRevenueAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateRevenueAttributesByCodeRequestSchema: GenMessage<CreateRevenueAttributesByCodeRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueAttributesByCodeResponse
 */
export type CreateRevenueAttributesByCodeResponse = Message<"domain.revenue.v1.CreateRevenueAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
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
 * Describes the message domain.revenue.v1.CreateRevenueAttributesByCodeResponse.
 * Use `create(CreateRevenueAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateRevenueAttributesByCodeResponseSchema: GenMessage<CreateRevenueAttributesByCodeResponse>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueAttributeRequest
 */
export type ReadRevenueAttributeRequest = Message<"domain.revenue.v1.ReadRevenueAttributeRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueAttribute data = 1;
     */
    data?: RevenueAttribute;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenueAttributeRequest.
 * Use `create(ReadRevenueAttributeRequestSchema)` to create a new message.
 */
export declare const ReadRevenueAttributeRequestSchema: GenMessage<ReadRevenueAttributeRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueAttributeResponse
 */
export type ReadRevenueAttributeResponse = Message<"domain.revenue.v1.ReadRevenueAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
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
 * Describes the message domain.revenue.v1.ReadRevenueAttributeResponse.
 * Use `create(ReadRevenueAttributeResponseSchema)` to create a new message.
 */
export declare const ReadRevenueAttributeResponseSchema: GenMessage<ReadRevenueAttributeResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueAttributeRequest
 */
export type UpdateRevenueAttributeRequest = Message<"domain.revenue.v1.UpdateRevenueAttributeRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueAttribute data = 1;
     */
    data?: RevenueAttribute;
};
/**
 * Describes the message domain.revenue.v1.UpdateRevenueAttributeRequest.
 * Use `create(UpdateRevenueAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateRevenueAttributeRequestSchema: GenMessage<UpdateRevenueAttributeRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueAttributeResponse
 */
export type UpdateRevenueAttributeResponse = Message<"domain.revenue.v1.UpdateRevenueAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
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
 * Describes the message domain.revenue.v1.UpdateRevenueAttributeResponse.
 * Use `create(UpdateRevenueAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateRevenueAttributeResponseSchema: GenMessage<UpdateRevenueAttributeResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueAttributeRequest
 */
export type DeleteRevenueAttributeRequest = Message<"domain.revenue.v1.DeleteRevenueAttributeRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueAttribute data = 1;
     */
    data?: RevenueAttribute;
};
/**
 * Describes the message domain.revenue.v1.DeleteRevenueAttributeRequest.
 * Use `create(DeleteRevenueAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteRevenueAttributeRequestSchema: GenMessage<DeleteRevenueAttributeRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueAttributeResponse
 */
export type DeleteRevenueAttributeResponse = Message<"domain.revenue.v1.DeleteRevenueAttributeResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteRevenueAttributeResponse.
 * Use `create(DeleteRevenueAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteRevenueAttributeResponseSchema: GenMessage<DeleteRevenueAttributeResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenueAttributesRequest
 */
export type ListRevenueAttributesRequest = Message<"domain.revenue.v1.ListRevenueAttributesRequest"> & {
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
 * Describes the message domain.revenue.v1.ListRevenueAttributesRequest.
 * Use `create(ListRevenueAttributesRequestSchema)` to create a new message.
 */
export declare const ListRevenueAttributesRequestSchema: GenMessage<ListRevenueAttributesRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueAttributesResponse
 */
export type ListRevenueAttributesResponse = Message<"domain.revenue.v1.ListRevenueAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute data = 1;
     */
    data: RevenueAttribute[];
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
 * Describes the message domain.revenue.v1.ListRevenueAttributesResponse.
 * Use `create(ListRevenueAttributesResponseSchema)` to create a new message.
 */
export declare const ListRevenueAttributesResponseSchema: GenMessage<ListRevenueAttributesResponse>;
/**
 * Enhanced list request with core features
 *
 * @generated from message domain.revenue.v1.GetRevenueAttributeListPageDataRequest
 */
export type GetRevenueAttributeListPageDataRequest = Message<"domain.revenue.v1.GetRevenueAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueAttributeListPageDataRequest.
 * Use `create(GetRevenueAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueAttributeListPageDataRequestSchema: GenMessage<GetRevenueAttributeListPageDataRequest>;
/**
 * Enhanced list response with metadata
 *
 * @generated from message domain.revenue.v1.GetRevenueAttributeListPageDataResponse
 */
export type GetRevenueAttributeListPageDataResponse = Message<"domain.revenue.v1.GetRevenueAttributeListPageDataResponse"> & {
    /**
     * The revenue attribute data
     *
     * @generated from field: repeated domain.revenue.v1.RevenueAttribute revenue_attribute_list = 1;
     */
    revenueAttributeList: RevenueAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.revenue.v1.GetRevenueAttributeListPageDataResponse.
 * Use `create(GetRevenueAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueAttributeListPageDataResponseSchema: GenMessage<GetRevenueAttributeListPageDataResponse>;
/**
 * Simple item request
 *
 * @generated from message domain.revenue.v1.GetRevenueAttributeItemPageDataRequest
 */
export type GetRevenueAttributeItemPageDataRequest = Message<"domain.revenue.v1.GetRevenueAttributeItemPageDataRequest"> & {
    /**
     * The revenue attribute ID to retrieve
     *
     * @generated from field: string revenue_attribute_id = 1;
     */
    revenueAttributeId: string;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueAttributeItemPageDataRequest.
 * Use `create(GetRevenueAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueAttributeItemPageDataRequestSchema: GenMessage<GetRevenueAttributeItemPageDataRequest>;
/**
 * Simple item response
 *
 * @generated from message domain.revenue.v1.GetRevenueAttributeItemPageDataResponse
 */
export type GetRevenueAttributeItemPageDataResponse = Message<"domain.revenue.v1.GetRevenueAttributeItemPageDataResponse"> & {
    /**
     * The revenue attribute data
     *
     * @generated from field: optional domain.revenue.v1.RevenueAttribute revenue_attribute = 1;
     */
    revenueAttribute?: RevenueAttribute;
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
 * Describes the message domain.revenue.v1.GetRevenueAttributeItemPageDataResponse.
 * Use `create(GetRevenueAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueAttributeItemPageDataResponseSchema: GenMessage<GetRevenueAttributeItemPageDataResponse>;
/**
 * @generated from service domain.revenue.v1.RevenueAttributeDomainService
 */
export declare const RevenueAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.CreateRevenueAttribute
     */
    createRevenueAttribute: {
        methodKind: "unary";
        input: typeof CreateRevenueAttributeRequestSchema;
        output: typeof CreateRevenueAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.ReadRevenueAttribute
     */
    readRevenueAttribute: {
        methodKind: "unary";
        input: typeof ReadRevenueAttributeRequestSchema;
        output: typeof ReadRevenueAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.UpdateRevenueAttribute
     */
    updateRevenueAttribute: {
        methodKind: "unary";
        input: typeof UpdateRevenueAttributeRequestSchema;
        output: typeof UpdateRevenueAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.DeleteRevenueAttribute
     */
    deleteRevenueAttribute: {
        methodKind: "unary";
        input: typeof DeleteRevenueAttributeRequestSchema;
        output: typeof DeleteRevenueAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.ListRevenueAttributes
     */
    listRevenueAttributes: {
        methodKind: "unary";
        input: typeof ListRevenueAttributesRequestSchema;
        output: typeof ListRevenueAttributesResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.GetRevenueAttributeListPageData
     */
    getRevenueAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetRevenueAttributeListPageDataRequestSchema;
        output: typeof GetRevenueAttributeListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.revenue.v1.RevenueAttributeDomainService.GetRevenueAttributeItemPageData
     */
    getRevenueAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetRevenueAttributeItemPageDataRequestSchema;
        output: typeof GetRevenueAttributeItemPageDataResponseSchema;
    };
}>;
