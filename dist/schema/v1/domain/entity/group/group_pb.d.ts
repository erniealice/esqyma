import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/group/group.proto.
 */
export declare const file_domain_entity_group_group: GenFile;
/**
 * @generated from message domain.entity.v1.Group
 */
export type Group = Message<"domain.entity.v1.Group"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.Group.
 * Use `create(GroupSchema)` to create a new message.
 */
export declare const GroupSchema: GenMessage<Group>;
/**
 * @generated from message domain.entity.v1.CreateGroupRequest
 */
export type CreateGroupRequest = Message<"domain.entity.v1.CreateGroupRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Group data = 1;
     */
    data?: Group;
};
/**
 * Describes the message domain.entity.v1.CreateGroupRequest.
 * Use `create(CreateGroupRequestSchema)` to create a new message.
 */
export declare const CreateGroupRequestSchema: GenMessage<CreateGroupRequest>;
/**
 * @generated from message domain.entity.v1.CreateGroupResponse
 */
export type CreateGroupResponse = Message<"domain.entity.v1.CreateGroupResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Group data = 1;
     */
    data: Group[];
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
 * Describes the message domain.entity.v1.CreateGroupResponse.
 * Use `create(CreateGroupResponseSchema)` to create a new message.
 */
export declare const CreateGroupResponseSchema: GenMessage<CreateGroupResponse>;
/**
 * @generated from message domain.entity.v1.ReadGroupRequest
 */
export type ReadGroupRequest = Message<"domain.entity.v1.ReadGroupRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Group data = 1;
     */
    data?: Group;
};
/**
 * Describes the message domain.entity.v1.ReadGroupRequest.
 * Use `create(ReadGroupRequestSchema)` to create a new message.
 */
export declare const ReadGroupRequestSchema: GenMessage<ReadGroupRequest>;
/**
 * @generated from message domain.entity.v1.ReadGroupResponse
 */
export type ReadGroupResponse = Message<"domain.entity.v1.ReadGroupResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Group data = 1;
     */
    data: Group[];
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
 * Describes the message domain.entity.v1.ReadGroupResponse.
 * Use `create(ReadGroupResponseSchema)` to create a new message.
 */
export declare const ReadGroupResponseSchema: GenMessage<ReadGroupResponse>;
/**
 * @generated from message domain.entity.v1.UpdateGroupRequest
 */
export type UpdateGroupRequest = Message<"domain.entity.v1.UpdateGroupRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Group data = 1;
     */
    data?: Group;
};
/**
 * Describes the message domain.entity.v1.UpdateGroupRequest.
 * Use `create(UpdateGroupRequestSchema)` to create a new message.
 */
export declare const UpdateGroupRequestSchema: GenMessage<UpdateGroupRequest>;
/**
 * @generated from message domain.entity.v1.UpdateGroupResponse
 */
export type UpdateGroupResponse = Message<"domain.entity.v1.UpdateGroupResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Group data = 1;
     */
    data: Group[];
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
 * Describes the message domain.entity.v1.UpdateGroupResponse.
 * Use `create(UpdateGroupResponseSchema)` to create a new message.
 */
export declare const UpdateGroupResponseSchema: GenMessage<UpdateGroupResponse>;
/**
 * @generated from message domain.entity.v1.DeleteGroupRequest
 */
export type DeleteGroupRequest = Message<"domain.entity.v1.DeleteGroupRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Group data = 1;
     */
    data?: Group;
};
/**
 * Describes the message domain.entity.v1.DeleteGroupRequest.
 * Use `create(DeleteGroupRequestSchema)` to create a new message.
 */
export declare const DeleteGroupRequestSchema: GenMessage<DeleteGroupRequest>;
/**
 * @generated from message domain.entity.v1.DeleteGroupResponse
 */
export type DeleteGroupResponse = Message<"domain.entity.v1.DeleteGroupResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteGroupResponse.
 * Use `create(DeleteGroupResponseSchema)` to create a new message.
 */
export declare const DeleteGroupResponseSchema: GenMessage<DeleteGroupResponse>;
/**
 * @generated from message domain.entity.v1.ListGroupsRequest
 */
export type ListGroupsRequest = Message<"domain.entity.v1.ListGroupsRequest"> & {
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
 * Describes the message domain.entity.v1.ListGroupsRequest.
 * Use `create(ListGroupsRequestSchema)` to create a new message.
 */
export declare const ListGroupsRequestSchema: GenMessage<ListGroupsRequest>;
/**
 * @generated from message domain.entity.v1.ListGroupsResponse
 */
export type ListGroupsResponse = Message<"domain.entity.v1.ListGroupsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Group data = 1;
     */
    data: Group[];
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
 * Describes the message domain.entity.v1.ListGroupsResponse.
 * Use `create(ListGroupsResponseSchema)` to create a new message.
 */
export declare const ListGroupsResponseSchema: GenMessage<ListGroupsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.entity.v1.GetGroupListPageDataRequest
 */
export type GetGroupListPageDataRequest = Message<"domain.entity.v1.GetGroupListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetGroupListPageDataRequest.
 * Use `create(GetGroupListPageDataRequestSchema)` to create a new message.
 */
export declare const GetGroupListPageDataRequestSchema: GenMessage<GetGroupListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetGroupListPageDataResponse
 */
export type GetGroupListPageDataResponse = Message<"domain.entity.v1.GetGroupListPageDataResponse"> & {
    /**
     * The group data
     *
     * @generated from field: repeated domain.entity.v1.Group group_list = 1;
     */
    groupList: Group[];
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
 * Describes the message domain.entity.v1.GetGroupListPageDataResponse.
 * Use `create(GetGroupListPageDataResponseSchema)` to create a new message.
 */
export declare const GetGroupListPageDataResponseSchema: GenMessage<GetGroupListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetGroupItemPageDataRequest
 */
export type GetGroupItemPageDataRequest = Message<"domain.entity.v1.GetGroupItemPageDataRequest"> & {
    /**
     * The group ID to retrieve
     *
     * @generated from field: string group_id = 1;
     */
    groupId: string;
};
/**
 * Describes the message domain.entity.v1.GetGroupItemPageDataRequest.
 * Use `create(GetGroupItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetGroupItemPageDataRequestSchema: GenMessage<GetGroupItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetGroupItemPageDataResponse
 */
export type GetGroupItemPageDataResponse = Message<"domain.entity.v1.GetGroupItemPageDataResponse"> & {
    /**
     * The group data
     *
     * @generated from field: domain.entity.v1.Group group = 1;
     */
    group?: Group;
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
 * Describes the message domain.entity.v1.GetGroupItemPageDataResponse.
 * Use `create(GetGroupItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetGroupItemPageDataResponseSchema: GenMessage<GetGroupItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.GroupDomainService
 */
export declare const GroupDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.GroupDomainService.CreateGroup
     */
    createGroup: {
        methodKind: "unary";
        input: typeof CreateGroupRequestSchema;
        output: typeof CreateGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupDomainService.ReadGroup
     */
    readGroup: {
        methodKind: "unary";
        input: typeof ReadGroupRequestSchema;
        output: typeof ReadGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupDomainService.UpdateGroup
     */
    updateGroup: {
        methodKind: "unary";
        input: typeof UpdateGroupRequestSchema;
        output: typeof UpdateGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupDomainService.DeleteGroup
     */
    deleteGroup: {
        methodKind: "unary";
        input: typeof DeleteGroupRequestSchema;
        output: typeof DeleteGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.GroupDomainService.ListGroups
     */
    listGroups: {
        methodKind: "unary";
        input: typeof ListGroupsRequestSchema;
        output: typeof ListGroupsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.GroupDomainService.GetGroupListPageData
     */
    getGroupListPageData: {
        methodKind: "unary";
        input: typeof GetGroupListPageDataRequestSchema;
        output: typeof GetGroupListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.GroupDomainService.GetGroupItemPageData
     */
    getGroupItemPageData: {
        methodKind: "unary";
        input: typeof GetGroupItemPageDataRequestSchema;
        output: typeof GetGroupItemPageDataResponseSchema;
    };
}>;
