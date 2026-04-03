import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Collection } from "../collection/collection_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/collection_attribute/collection_attribute.proto.
 */
export declare const file_domain_product_collection_attribute_collection_attribute: GenFile;
/**
 * @generated from message domain.product.v1.CollectionAttribute
 */
export type CollectionAttribute = Message<"domain.product.v1.CollectionAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string collection_id = 2;
     */
    collectionId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.product.v1.Collection collection = 5;
     */
    collection?: Collection;
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
 * Describes the message domain.product.v1.CollectionAttribute.
 * Use `create(CollectionAttributeSchema)` to create a new message.
 */
export declare const CollectionAttributeSchema: GenMessage<CollectionAttribute>;
/**
 * @generated from message domain.product.v1.CreateCollectionAttributeRequest
 */
export type CreateCollectionAttributeRequest = Message<"domain.product.v1.CreateCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.product.v1.CreateCollectionAttributeRequest.
 * Use `create(CreateCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const CreateCollectionAttributeRequestSchema: GenMessage<CreateCollectionAttributeRequest>;
/**
 * @generated from message domain.product.v1.CreateCollectionAttributeResponse
 */
export type CreateCollectionAttributeResponse = Message<"domain.product.v1.CreateCollectionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.product.v1.CreateCollectionAttributeResponse.
 * Use `create(CreateCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const CreateCollectionAttributeResponseSchema: GenMessage<CreateCollectionAttributeResponse>;
/**
 * @generated from message domain.product.v1.ReadCollectionAttributeRequest
 */
export type ReadCollectionAttributeRequest = Message<"domain.product.v1.ReadCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.product.v1.ReadCollectionAttributeRequest.
 * Use `create(ReadCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const ReadCollectionAttributeRequestSchema: GenMessage<ReadCollectionAttributeRequest>;
/**
 * @generated from message domain.product.v1.ReadCollectionAttributeResponse
 */
export type ReadCollectionAttributeResponse = Message<"domain.product.v1.ReadCollectionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.product.v1.ReadCollectionAttributeResponse.
 * Use `create(ReadCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const ReadCollectionAttributeResponseSchema: GenMessage<ReadCollectionAttributeResponse>;
/**
 * @generated from message domain.product.v1.UpdateCollectionAttributeRequest
 */
export type UpdateCollectionAttributeRequest = Message<"domain.product.v1.UpdateCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.product.v1.UpdateCollectionAttributeRequest.
 * Use `create(UpdateCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionAttributeRequestSchema: GenMessage<UpdateCollectionAttributeRequest>;
/**
 * @generated from message domain.product.v1.UpdateCollectionAttributeResponse
 */
export type UpdateCollectionAttributeResponse = Message<"domain.product.v1.UpdateCollectionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.product.v1.UpdateCollectionAttributeResponse.
 * Use `create(UpdateCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionAttributeResponseSchema: GenMessage<UpdateCollectionAttributeResponse>;
/**
 * @generated from message domain.product.v1.DeleteCollectionAttributeRequest
 */
export type DeleteCollectionAttributeRequest = Message<"domain.product.v1.DeleteCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.product.v1.DeleteCollectionAttributeRequest.
 * Use `create(DeleteCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionAttributeRequestSchema: GenMessage<DeleteCollectionAttributeRequest>;
/**
 * @generated from message domain.product.v1.DeleteCollectionAttributeResponse
 */
export type DeleteCollectionAttributeResponse = Message<"domain.product.v1.DeleteCollectionAttributeResponse"> & {
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
 * Describes the message domain.product.v1.DeleteCollectionAttributeResponse.
 * Use `create(DeleteCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionAttributeResponseSchema: GenMessage<DeleteCollectionAttributeResponse>;
/**
 * @generated from message domain.product.v1.ListCollectionAttributesRequest
 */
export type ListCollectionAttributesRequest = Message<"domain.product.v1.ListCollectionAttributesRequest"> & {
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
 * Describes the message domain.product.v1.ListCollectionAttributesRequest.
 * Use `create(ListCollectionAttributesRequestSchema)` to create a new message.
 */
export declare const ListCollectionAttributesRequestSchema: GenMessage<ListCollectionAttributesRequest>;
/**
 * @generated from message domain.product.v1.ListCollectionAttributesResponse
 */
export type ListCollectionAttributesResponse = Message<"domain.product.v1.ListCollectionAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.product.v1.ListCollectionAttributesResponse.
 * Use `create(ListCollectionAttributesResponseSchema)` to create a new message.
 */
export declare const ListCollectionAttributesResponseSchema: GenMessage<ListCollectionAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.product.v1.GetCollectionAttributeListPageDataRequest
 */
export type GetCollectionAttributeListPageDataRequest = Message<"domain.product.v1.GetCollectionAttributeListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetCollectionAttributeListPageDataRequest.
 * Use `create(GetCollectionAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionAttributeListPageDataRequestSchema: GenMessage<GetCollectionAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.product.v1.GetCollectionAttributeListPageDataResponse
 */
export type GetCollectionAttributeListPageDataResponse = Message<"domain.product.v1.GetCollectionAttributeListPageDataResponse"> & {
    /**
     * The collection attribute data
     *
     * @generated from field: repeated domain.product.v1.CollectionAttribute collection_attribute_list = 1;
     */
    collectionAttributeList: CollectionAttribute[];
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
 * Describes the message domain.product.v1.GetCollectionAttributeListPageDataResponse.
 * Use `create(GetCollectionAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionAttributeListPageDataResponseSchema: GenMessage<GetCollectionAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.product.v1.GetCollectionAttributeItemPageDataRequest
 */
export type GetCollectionAttributeItemPageDataRequest = Message<"domain.product.v1.GetCollectionAttributeItemPageDataRequest"> & {
    /**
     * The collection attribute ID to retrieve
     *
     * @generated from field: string collection_attribute_id = 1;
     */
    collectionAttributeId: string;
};
/**
 * Describes the message domain.product.v1.GetCollectionAttributeItemPageDataRequest.
 * Use `create(GetCollectionAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionAttributeItemPageDataRequestSchema: GenMessage<GetCollectionAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.product.v1.GetCollectionAttributeItemPageDataResponse
 */
export type GetCollectionAttributeItemPageDataResponse = Message<"domain.product.v1.GetCollectionAttributeItemPageDataResponse"> & {
    /**
     * The collection attribute data
     *
     * @generated from field: domain.product.v1.CollectionAttribute collection_attribute = 1;
     */
    collectionAttribute?: CollectionAttribute;
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
 * Describes the message domain.product.v1.GetCollectionAttributeItemPageDataResponse.
 * Use `create(GetCollectionAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionAttributeItemPageDataResponseSchema: GenMessage<GetCollectionAttributeItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.CollectionAttributeDomainService
 */
export declare const CollectionAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.CreateCollectionAttribute
     */
    createCollectionAttribute: {
        methodKind: "unary";
        input: typeof CreateCollectionAttributeRequestSchema;
        output: typeof CreateCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.ReadCollectionAttribute
     */
    readCollectionAttribute: {
        methodKind: "unary";
        input: typeof ReadCollectionAttributeRequestSchema;
        output: typeof ReadCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.UpdateCollectionAttribute
     */
    updateCollectionAttribute: {
        methodKind: "unary";
        input: typeof UpdateCollectionAttributeRequestSchema;
        output: typeof UpdateCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.DeleteCollectionAttribute
     */
    deleteCollectionAttribute: {
        methodKind: "unary";
        input: typeof DeleteCollectionAttributeRequestSchema;
        output: typeof DeleteCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.ListCollectionAttributes
     */
    listCollectionAttributes: {
        methodKind: "unary";
        input: typeof ListCollectionAttributesRequestSchema;
        output: typeof ListCollectionAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.GetCollectionAttributeListPageData
     */
    getCollectionAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionAttributeListPageDataRequestSchema;
        output: typeof GetCollectionAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.product.v1.CollectionAttributeDomainService.GetCollectionAttributeItemPageData
     */
    getCollectionAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionAttributeItemPageDataRequestSchema;
        output: typeof GetCollectionAttributeItemPageDataResponseSchema;
    };
}>;
