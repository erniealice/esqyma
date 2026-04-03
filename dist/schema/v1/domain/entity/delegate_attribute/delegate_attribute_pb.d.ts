import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Delegate } from "../delegate/delegate_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/delegate_attribute/delegate_attribute.proto.
 */
export declare const file_domain_entity_delegate_attribute_delegate_attribute: GenFile;
/**
 * @generated from message domain.entity.v1.DelegateAttribute
 */
export type DelegateAttribute = Message<"domain.entity.v1.DelegateAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string delegate_id = 2;
     */
    delegateId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.entity.v1.Delegate delegate = 5;
     */
    delegate?: Delegate;
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
 * Describes the message domain.entity.v1.DelegateAttribute.
 * Use `create(DelegateAttributeSchema)` to create a new message.
 */
export declare const DelegateAttributeSchema: GenMessage<DelegateAttribute>;
/**
 * @generated from message domain.entity.v1.CreateDelegateAttributeRequest
 */
export type CreateDelegateAttributeRequest = Message<"domain.entity.v1.CreateDelegateAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateAttribute data = 1;
     */
    data?: DelegateAttribute;
};
/**
 * Describes the message domain.entity.v1.CreateDelegateAttributeRequest.
 * Use `create(CreateDelegateAttributeRequestSchema)` to create a new message.
 */
export declare const CreateDelegateAttributeRequestSchema: GenMessage<CreateDelegateAttributeRequest>;
/**
 * @generated from message domain.entity.v1.CreateDelegateAttributeResponse
 */
export type CreateDelegateAttributeResponse = Message<"domain.entity.v1.CreateDelegateAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateAttribute data = 1;
     */
    data: DelegateAttribute[];
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
 * Describes the message domain.entity.v1.CreateDelegateAttributeResponse.
 * Use `create(CreateDelegateAttributeResponseSchema)` to create a new message.
 */
export declare const CreateDelegateAttributeResponseSchema: GenMessage<CreateDelegateAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ReadDelegateAttributeRequest
 */
export type ReadDelegateAttributeRequest = Message<"domain.entity.v1.ReadDelegateAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateAttribute data = 1;
     */
    data?: DelegateAttribute;
};
/**
 * Describes the message domain.entity.v1.ReadDelegateAttributeRequest.
 * Use `create(ReadDelegateAttributeRequestSchema)` to create a new message.
 */
export declare const ReadDelegateAttributeRequestSchema: GenMessage<ReadDelegateAttributeRequest>;
/**
 * @generated from message domain.entity.v1.ReadDelegateAttributeResponse
 */
export type ReadDelegateAttributeResponse = Message<"domain.entity.v1.ReadDelegateAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateAttribute data = 1;
     */
    data: DelegateAttribute[];
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
 * Describes the message domain.entity.v1.ReadDelegateAttributeResponse.
 * Use `create(ReadDelegateAttributeResponseSchema)` to create a new message.
 */
export declare const ReadDelegateAttributeResponseSchema: GenMessage<ReadDelegateAttributeResponse>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateAttributeRequest
 */
export type UpdateDelegateAttributeRequest = Message<"domain.entity.v1.UpdateDelegateAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateAttribute data = 1;
     */
    data?: DelegateAttribute;
};
/**
 * Describes the message domain.entity.v1.UpdateDelegateAttributeRequest.
 * Use `create(UpdateDelegateAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateDelegateAttributeRequestSchema: GenMessage<UpdateDelegateAttributeRequest>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateAttributeResponse
 */
export type UpdateDelegateAttributeResponse = Message<"domain.entity.v1.UpdateDelegateAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateAttribute data = 1;
     */
    data: DelegateAttribute[];
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
 * Describes the message domain.entity.v1.UpdateDelegateAttributeResponse.
 * Use `create(UpdateDelegateAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateDelegateAttributeResponseSchema: GenMessage<UpdateDelegateAttributeResponse>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateAttributeRequest
 */
export type DeleteDelegateAttributeRequest = Message<"domain.entity.v1.DeleteDelegateAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateAttribute data = 1;
     */
    data?: DelegateAttribute;
};
/**
 * Describes the message domain.entity.v1.DeleteDelegateAttributeRequest.
 * Use `create(DeleteDelegateAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteDelegateAttributeRequestSchema: GenMessage<DeleteDelegateAttributeRequest>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateAttributeResponse
 */
export type DeleteDelegateAttributeResponse = Message<"domain.entity.v1.DeleteDelegateAttributeResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteDelegateAttributeResponse.
 * Use `create(DeleteDelegateAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteDelegateAttributeResponseSchema: GenMessage<DeleteDelegateAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ListDelegateAttributesRequest
 */
export type ListDelegateAttributesRequest = Message<"domain.entity.v1.ListDelegateAttributesRequest"> & {
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
 * Describes the message domain.entity.v1.ListDelegateAttributesRequest.
 * Use `create(ListDelegateAttributesRequestSchema)` to create a new message.
 */
export declare const ListDelegateAttributesRequestSchema: GenMessage<ListDelegateAttributesRequest>;
/**
 * @generated from message domain.entity.v1.ListDelegateAttributesResponse
 */
export type ListDelegateAttributesResponse = Message<"domain.entity.v1.ListDelegateAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateAttribute data = 1;
     */
    data: DelegateAttribute[];
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
 * Describes the message domain.entity.v1.ListDelegateAttributesResponse.
 * Use `create(ListDelegateAttributesResponseSchema)` to create a new message.
 */
export declare const ListDelegateAttributesResponseSchema: GenMessage<ListDelegateAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.entity.v1.GetDelegateAttributeListPageDataRequest
 */
export type GetDelegateAttributeListPageDataRequest = Message<"domain.entity.v1.GetDelegateAttributeListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetDelegateAttributeListPageDataRequest.
 * Use `create(GetDelegateAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateAttributeListPageDataRequestSchema: GenMessage<GetDelegateAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetDelegateAttributeListPageDataResponse
 */
export type GetDelegateAttributeListPageDataResponse = Message<"domain.entity.v1.GetDelegateAttributeListPageDataResponse"> & {
    /**
     * The delegate attribute data
     *
     * @generated from field: repeated domain.entity.v1.DelegateAttribute delegate_attribute_list = 1;
     */
    delegateAttributeList: DelegateAttribute[];
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
 * Describes the message domain.entity.v1.GetDelegateAttributeListPageDataResponse.
 * Use `create(GetDelegateAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateAttributeListPageDataResponseSchema: GenMessage<GetDelegateAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetDelegateAttributeItemPageDataRequest
 */
export type GetDelegateAttributeItemPageDataRequest = Message<"domain.entity.v1.GetDelegateAttributeItemPageDataRequest"> & {
    /**
     * The delegate attribute ID to retrieve
     *
     * @generated from field: string delegate_attribute_id = 1;
     */
    delegateAttributeId: string;
};
/**
 * Describes the message domain.entity.v1.GetDelegateAttributeItemPageDataRequest.
 * Use `create(GetDelegateAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateAttributeItemPageDataRequestSchema: GenMessage<GetDelegateAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetDelegateAttributeItemPageDataResponse
 */
export type GetDelegateAttributeItemPageDataResponse = Message<"domain.entity.v1.GetDelegateAttributeItemPageDataResponse"> & {
    /**
     * The delegate attribute data
     *
     * @generated from field: domain.entity.v1.DelegateAttribute delegate_attribute = 1;
     */
    delegateAttribute?: DelegateAttribute;
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
 * Describes the message domain.entity.v1.GetDelegateAttributeItemPageDataResponse.
 * Use `create(GetDelegateAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateAttributeItemPageDataResponseSchema: GenMessage<GetDelegateAttributeItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.DelegateAttributeDomainService
 */
export declare const DelegateAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.CreateDelegateAttribute
     */
    createDelegateAttribute: {
        methodKind: "unary";
        input: typeof CreateDelegateAttributeRequestSchema;
        output: typeof CreateDelegateAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.ReadDelegateAttribute
     */
    readDelegateAttribute: {
        methodKind: "unary";
        input: typeof ReadDelegateAttributeRequestSchema;
        output: typeof ReadDelegateAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.UpdateDelegateAttribute
     */
    updateDelegateAttribute: {
        methodKind: "unary";
        input: typeof UpdateDelegateAttributeRequestSchema;
        output: typeof UpdateDelegateAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.DeleteDelegateAttribute
     */
    deleteDelegateAttribute: {
        methodKind: "unary";
        input: typeof DeleteDelegateAttributeRequestSchema;
        output: typeof DeleteDelegateAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.ListDelegateAttributes
     */
    listDelegateAttributes: {
        methodKind: "unary";
        input: typeof ListDelegateAttributesRequestSchema;
        output: typeof ListDelegateAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.GetDelegateAttributeListPageData
     */
    getDelegateAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetDelegateAttributeListPageDataRequestSchema;
        output: typeof GetDelegateAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.DelegateAttributeDomainService.GetDelegateAttributeItemPageData
     */
    getDelegateAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetDelegateAttributeItemPageDataRequestSchema;
        output: typeof GetDelegateAttributeItemPageDataResponseSchema;
    };
}>;
