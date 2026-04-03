import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Group } from "../group/group_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/group_attribute/group_attribute.proto.
 */
export declare const file_domain_entity_group_attribute_group_attribute: GenFile;
/**
 * @generated from message domain.entity.v1.GroupAttribute
 */
export type GroupAttribute = Message<"domain.entity.v1.GroupAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string group_id = 2;
     */
    groupId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.entity.v1.Group group = 5;
     */
    group?: Group;
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
 * Describes the message domain.entity.v1.GroupAttribute.
 * Use `create(GroupAttributeSchema)` to create a new message.
 */
export declare const GroupAttributeSchema: GenMessage<GroupAttribute>;
/**
 * @generated from message domain.entity.v1.CreateGroupAttributeRequest
 */
export type CreateGroupAttributeRequest = Message<"domain.entity.v1.CreateGroupAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.GroupAttribute data = 1;
     */
    data?: GroupAttribute;
};
/**
 * Describes the message domain.entity.v1.CreateGroupAttributeRequest.
 * Use `create(CreateGroupAttributeRequestSchema)` to create a new message.
 */
export declare const CreateGroupAttributeRequestSchema: GenMessage<CreateGroupAttributeRequest>;
/**
 * @generated from message domain.entity.v1.CreateGroupAttributeResponse
 */
export type CreateGroupAttributeResponse = Message<"domain.entity.v1.CreateGroupAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.GroupAttribute data = 1;
     */
    data: GroupAttribute[];
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
 * Describes the message domain.entity.v1.CreateGroupAttributeResponse.
 * Use `create(CreateGroupAttributeResponseSchema)` to create a new message.
 */
export declare const CreateGroupAttributeResponseSchema: GenMessage<CreateGroupAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ReadGroupAttributeRequest
 */
export type ReadGroupAttributeRequest = Message<"domain.entity.v1.ReadGroupAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.GroupAttribute data = 1;
     */
    data?: GroupAttribute;
};
/**
 * Describes the message domain.entity.v1.ReadGroupAttributeRequest.
 * Use `create(ReadGroupAttributeRequestSchema)` to create a new message.
 */
export declare const ReadGroupAttributeRequestSchema: GenMessage<ReadGroupAttributeRequest>;
/**
 * @generated from message domain.entity.v1.ReadGroupAttributeResponse
 */
export type ReadGroupAttributeResponse = Message<"domain.entity.v1.ReadGroupAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.GroupAttribute data = 1;
     */
    data: GroupAttribute[];
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
 * Describes the message domain.entity.v1.ReadGroupAttributeResponse.
 * Use `create(ReadGroupAttributeResponseSchema)` to create a new message.
 */
export declare const ReadGroupAttributeResponseSchema: GenMessage<ReadGroupAttributeResponse>;
/**
 * @generated from message domain.entity.v1.UpdateGroupAttributeRequest
 */
export type UpdateGroupAttributeRequest = Message<"domain.entity.v1.UpdateGroupAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.GroupAttribute data = 1;
     */
    data?: GroupAttribute;
};
/**
 * Describes the message domain.entity.v1.UpdateGroupAttributeRequest.
 * Use `create(UpdateGroupAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateGroupAttributeRequestSchema: GenMessage<UpdateGroupAttributeRequest>;
/**
 * @generated from message domain.entity.v1.UpdateGroupAttributeResponse
 */
export type UpdateGroupAttributeResponse = Message<"domain.entity.v1.UpdateGroupAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.GroupAttribute data = 1;
     */
    data: GroupAttribute[];
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
 * Describes the message domain.entity.v1.UpdateGroupAttributeResponse.
 * Use `create(UpdateGroupAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateGroupAttributeResponseSchema: GenMessage<UpdateGroupAttributeResponse>;
/**
 * @generated from message domain.entity.v1.DeleteGroupAttributeRequest
 */
export type DeleteGroupAttributeRequest = Message<"domain.entity.v1.DeleteGroupAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.GroupAttribute data = 1;
     */
    data?: GroupAttribute;
};
/**
 * Describes the message domain.entity.v1.DeleteGroupAttributeRequest.
 * Use `create(DeleteGroupAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteGroupAttributeRequestSchema: GenMessage<DeleteGroupAttributeRequest>;
/**
 * @generated from message domain.entity.v1.DeleteGroupAttributeResponse
 */
export type DeleteGroupAttributeResponse = Message<"domain.entity.v1.DeleteGroupAttributeResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteGroupAttributeResponse.
 * Use `create(DeleteGroupAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteGroupAttributeResponseSchema: GenMessage<DeleteGroupAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ListGroupAttributesRequest
 */
export type ListGroupAttributesRequest = Message<"domain.entity.v1.ListGroupAttributesRequest"> & {
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
 * Describes the message domain.entity.v1.ListGroupAttributesRequest.
 * Use `create(ListGroupAttributesRequestSchema)` to create a new message.
 */
export declare const ListGroupAttributesRequestSchema: GenMessage<ListGroupAttributesRequest>;
/**
 * @generated from message domain.entity.v1.ListGroupAttributesResponse
 */
export type ListGroupAttributesResponse = Message<"domain.entity.v1.ListGroupAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.GroupAttribute data = 1;
     */
    data: GroupAttribute[];
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
 * Describes the message domain.entity.v1.ListGroupAttributesResponse.
 * Use `create(ListGroupAttributesResponseSchema)` to create a new message.
 */
export declare const ListGroupAttributesResponseSchema: GenMessage<ListGroupAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.entity.v1.GetGroupAttributeListPageDataRequest
 */
export type GetGroupAttributeListPageDataRequest = Message<"domain.entity.v1.GetGroupAttributeListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetGroupAttributeListPageDataRequest.
 * Use `create(GetGroupAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetGroupAttributeListPageDataRequestSchema: GenMessage<GetGroupAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetGroupAttributeListPageDataResponse
 */
export type GetGroupAttributeListPageDataResponse = Message<"domain.entity.v1.GetGroupAttributeListPageDataResponse"> & {
    /**
     * The group attribute data
     *
     * @generated from field: repeated domain.entity.v1.GroupAttribute group_attribute_list = 1;
     */
    groupAttributeList: GroupAttribute[];
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
 * Describes the message domain.entity.v1.GetGroupAttributeListPageDataResponse.
 * Use `create(GetGroupAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetGroupAttributeListPageDataResponseSchema: GenMessage<GetGroupAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetGroupAttributeItemPageDataRequest
 */
export type GetGroupAttributeItemPageDataRequest = Message<"domain.entity.v1.GetGroupAttributeItemPageDataRequest"> & {
    /**
     * The group attribute ID to retrieve
     *
     * @generated from field: string group_attribute_id = 1;
     */
    groupAttributeId: string;
};
/**
 * Describes the message domain.entity.v1.GetGroupAttributeItemPageDataRequest.
 * Use `create(GetGroupAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetGroupAttributeItemPageDataRequestSchema: GenMessage<GetGroupAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetGroupAttributeItemPageDataResponse
 */
export type GetGroupAttributeItemPageDataResponse = Message<"domain.entity.v1.GetGroupAttributeItemPageDataResponse"> & {
    /**
     * The group attribute data
     *
     * @generated from field: domain.entity.v1.GroupAttribute group_attribute = 1;
     */
    groupAttribute?: GroupAttribute;
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
 * Describes the message domain.entity.v1.GetGroupAttributeItemPageDataResponse.
 * Use `create(GetGroupAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetGroupAttributeItemPageDataResponseSchema: GenMessage<GetGroupAttributeItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.GroupAttributeDomainService
 */
export declare const GroupAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.CreateGroupAttribute
     */
    createGroupAttribute: {
        methodKind: "unary";
        input: typeof CreateGroupAttributeRequestSchema;
        output: typeof CreateGroupAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.ReadGroupAttribute
     */
    readGroupAttribute: {
        methodKind: "unary";
        input: typeof ReadGroupAttributeRequestSchema;
        output: typeof ReadGroupAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.UpdateGroupAttribute
     */
    updateGroupAttribute: {
        methodKind: "unary";
        input: typeof UpdateGroupAttributeRequestSchema;
        output: typeof UpdateGroupAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.DeleteGroupAttribute
     */
    deleteGroupAttribute: {
        methodKind: "unary";
        input: typeof DeleteGroupAttributeRequestSchema;
        output: typeof DeleteGroupAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.ListGroupAttributes
     */
    listGroupAttributes: {
        methodKind: "unary";
        input: typeof ListGroupAttributesRequestSchema;
        output: typeof ListGroupAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.GetGroupAttributeListPageData
     */
    getGroupAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetGroupAttributeListPageDataRequestSchema;
        output: typeof GetGroupAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.GroupAttributeDomainService.GetGroupAttributeItemPageData
     */
    getGroupAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetGroupAttributeItemPageDataRequestSchema;
        output: typeof GetGroupAttributeItemPageDataResponseSchema;
    };
}>;
