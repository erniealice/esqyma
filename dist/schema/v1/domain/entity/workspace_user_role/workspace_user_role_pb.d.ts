import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Role } from "../role/role_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/workspace_user_role/workspace_user_role.proto.
 */
export declare const file_domain_entity_workspace_user_role_workspace_user_role: GenFile;
/**
 * @generated from message domain.entity.v1.WorkspaceUserRole
 */
export type WorkspaceUserRole = Message<"domain.entity.v1.WorkspaceUserRole"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_user_id = 2;
     */
    workspaceUserId: string;
    /**
     * Removed: optional WorkspaceUser workspace_user = 3; (circular dependency)
     *
     * @generated from field: string role_id = 4;
     */
    roleId: string;
    /**
     * @generated from field: optional domain.entity.v1.Role role = 5;
     */
    role?: Role;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 7;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 8;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 9;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.WorkspaceUserRole.
 * Use `create(WorkspaceUserRoleSchema)` to create a new message.
 */
export declare const WorkspaceUserRoleSchema: GenMessage<WorkspaceUserRole>;
/**
 * @generated from message domain.entity.v1.CreateWorkspaceUserRoleRequest
 */
export type CreateWorkspaceUserRoleRequest = Message<"domain.entity.v1.CreateWorkspaceUserRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data?: WorkspaceUserRole;
};
/**
 * Describes the message domain.entity.v1.CreateWorkspaceUserRoleRequest.
 * Use `create(CreateWorkspaceUserRoleRequestSchema)` to create a new message.
 */
export declare const CreateWorkspaceUserRoleRequestSchema: GenMessage<CreateWorkspaceUserRoleRequest>;
/**
 * @generated from message domain.entity.v1.CreateWorkspaceUserRoleResponse
 */
export type CreateWorkspaceUserRoleResponse = Message<"domain.entity.v1.CreateWorkspaceUserRoleResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data: WorkspaceUserRole[];
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
 * Describes the message domain.entity.v1.CreateWorkspaceUserRoleResponse.
 * Use `create(CreateWorkspaceUserRoleResponseSchema)` to create a new message.
 */
export declare const CreateWorkspaceUserRoleResponseSchema: GenMessage<CreateWorkspaceUserRoleResponse>;
/**
 * @generated from message domain.entity.v1.ReadWorkspaceUserRoleRequest
 */
export type ReadWorkspaceUserRoleRequest = Message<"domain.entity.v1.ReadWorkspaceUserRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data?: WorkspaceUserRole;
};
/**
 * Describes the message domain.entity.v1.ReadWorkspaceUserRoleRequest.
 * Use `create(ReadWorkspaceUserRoleRequestSchema)` to create a new message.
 */
export declare const ReadWorkspaceUserRoleRequestSchema: GenMessage<ReadWorkspaceUserRoleRequest>;
/**
 * @generated from message domain.entity.v1.ReadWorkspaceUserRoleResponse
 */
export type ReadWorkspaceUserRoleResponse = Message<"domain.entity.v1.ReadWorkspaceUserRoleResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data: WorkspaceUserRole[];
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
 * Describes the message domain.entity.v1.ReadWorkspaceUserRoleResponse.
 * Use `create(ReadWorkspaceUserRoleResponseSchema)` to create a new message.
 */
export declare const ReadWorkspaceUserRoleResponseSchema: GenMessage<ReadWorkspaceUserRoleResponse>;
/**
 * @generated from message domain.entity.v1.UpdateWorkspaceUserRoleRequest
 */
export type UpdateWorkspaceUserRoleRequest = Message<"domain.entity.v1.UpdateWorkspaceUserRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data?: WorkspaceUserRole;
};
/**
 * Describes the message domain.entity.v1.UpdateWorkspaceUserRoleRequest.
 * Use `create(UpdateWorkspaceUserRoleRequestSchema)` to create a new message.
 */
export declare const UpdateWorkspaceUserRoleRequestSchema: GenMessage<UpdateWorkspaceUserRoleRequest>;
/**
 * @generated from message domain.entity.v1.UpdateWorkspaceUserRoleResponse
 */
export type UpdateWorkspaceUserRoleResponse = Message<"domain.entity.v1.UpdateWorkspaceUserRoleResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data: WorkspaceUserRole[];
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
 * Describes the message domain.entity.v1.UpdateWorkspaceUserRoleResponse.
 * Use `create(UpdateWorkspaceUserRoleResponseSchema)` to create a new message.
 */
export declare const UpdateWorkspaceUserRoleResponseSchema: GenMessage<UpdateWorkspaceUserRoleResponse>;
/**
 * @generated from message domain.entity.v1.DeleteWorkspaceUserRoleRequest
 */
export type DeleteWorkspaceUserRoleRequest = Message<"domain.entity.v1.DeleteWorkspaceUserRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data?: WorkspaceUserRole;
};
/**
 * Describes the message domain.entity.v1.DeleteWorkspaceUserRoleRequest.
 * Use `create(DeleteWorkspaceUserRoleRequestSchema)` to create a new message.
 */
export declare const DeleteWorkspaceUserRoleRequestSchema: GenMessage<DeleteWorkspaceUserRoleRequest>;
/**
 * @generated from message domain.entity.v1.DeleteWorkspaceUserRoleResponse
 */
export type DeleteWorkspaceUserRoleResponse = Message<"domain.entity.v1.DeleteWorkspaceUserRoleResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteWorkspaceUserRoleResponse.
 * Use `create(DeleteWorkspaceUserRoleResponseSchema)` to create a new message.
 */
export declare const DeleteWorkspaceUserRoleResponseSchema: GenMessage<DeleteWorkspaceUserRoleResponse>;
/**
 * @generated from message domain.entity.v1.ListWorkspaceUserRolesRequest
 */
export type ListWorkspaceUserRolesRequest = Message<"domain.entity.v1.ListWorkspaceUserRolesRequest"> & {
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
 * Describes the message domain.entity.v1.ListWorkspaceUserRolesRequest.
 * Use `create(ListWorkspaceUserRolesRequestSchema)` to create a new message.
 */
export declare const ListWorkspaceUserRolesRequestSchema: GenMessage<ListWorkspaceUserRolesRequest>;
/**
 * @generated from message domain.entity.v1.ListWorkspaceUserRolesResponse
 */
export type ListWorkspaceUserRolesResponse = Message<"domain.entity.v1.ListWorkspaceUserRolesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole data = 1;
     */
    data: WorkspaceUserRole[];
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
 * Describes the message domain.entity.v1.ListWorkspaceUserRolesResponse.
 * Use `create(ListWorkspaceUserRolesResponseSchema)` to create a new message.
 */
export declare const ListWorkspaceUserRolesResponseSchema: GenMessage<ListWorkspaceUserRolesResponse>;
/**
 * Enhanced list request
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserRoleListPageDataRequest
 */
export type GetWorkspaceUserRoleListPageDataRequest = Message<"domain.entity.v1.GetWorkspaceUserRoleListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetWorkspaceUserRoleListPageDataRequest.
 * Use `create(GetWorkspaceUserRoleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkspaceUserRoleListPageDataRequestSchema: GenMessage<GetWorkspaceUserRoleListPageDataRequest>;
/**
 * Enhanced list response
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserRoleListPageDataResponse
 */
export type GetWorkspaceUserRoleListPageDataResponse = Message<"domain.entity.v1.GetWorkspaceUserRoleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole workspace_user_role_list = 1;
     */
    workspaceUserRoleList: WorkspaceUserRole[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.entity.v1.GetWorkspaceUserRoleListPageDataResponse.
 * Use `create(GetWorkspaceUserRoleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkspaceUserRoleListPageDataResponseSchema: GenMessage<GetWorkspaceUserRoleListPageDataResponse>;
/**
 * Item request
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserRoleItemPageDataRequest
 */
export type GetWorkspaceUserRoleItemPageDataRequest = Message<"domain.entity.v1.GetWorkspaceUserRoleItemPageDataRequest"> & {
    /**
     * @generated from field: string workspace_user_role_id = 1;
     */
    workspaceUserRoleId: string;
};
/**
 * Describes the message domain.entity.v1.GetWorkspaceUserRoleItemPageDataRequest.
 * Use `create(GetWorkspaceUserRoleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkspaceUserRoleItemPageDataRequestSchema: GenMessage<GetWorkspaceUserRoleItemPageDataRequest>;
/**
 * Item response
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserRoleItemPageDataResponse
 */
export type GetWorkspaceUserRoleItemPageDataResponse = Message<"domain.entity.v1.GetWorkspaceUserRoleItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUserRole workspace_user_role = 1;
     */
    workspaceUserRole?: WorkspaceUserRole;
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
 * Describes the message domain.entity.v1.GetWorkspaceUserRoleItemPageDataResponse.
 * Use `create(GetWorkspaceUserRoleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkspaceUserRoleItemPageDataResponseSchema: GenMessage<GetWorkspaceUserRoleItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.WorkspaceUserRoleDomainService
 */
export declare const WorkspaceUserRoleDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.CreateWorkspaceUserRole
     */
    createWorkspaceUserRole: {
        methodKind: "unary";
        input: typeof CreateWorkspaceUserRoleRequestSchema;
        output: typeof CreateWorkspaceUserRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.ReadWorkspaceUserRole
     */
    readWorkspaceUserRole: {
        methodKind: "unary";
        input: typeof ReadWorkspaceUserRoleRequestSchema;
        output: typeof ReadWorkspaceUserRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.UpdateWorkspaceUserRole
     */
    updateWorkspaceUserRole: {
        methodKind: "unary";
        input: typeof UpdateWorkspaceUserRoleRequestSchema;
        output: typeof UpdateWorkspaceUserRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.DeleteWorkspaceUserRole
     */
    deleteWorkspaceUserRole: {
        methodKind: "unary";
        input: typeof DeleteWorkspaceUserRoleRequestSchema;
        output: typeof DeleteWorkspaceUserRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.ListWorkspaceUserRoles
     */
    listWorkspaceUserRoles: {
        methodKind: "unary";
        input: typeof ListWorkspaceUserRolesRequestSchema;
        output: typeof ListWorkspaceUserRolesResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.GetWorkspaceUserRoleListPageData
     */
    getWorkspaceUserRoleListPageData: {
        methodKind: "unary";
        input: typeof GetWorkspaceUserRoleListPageDataRequestSchema;
        output: typeof GetWorkspaceUserRoleListPageDataResponseSchema;
    };
    /**
     * Enhanced item view
     *
     * @generated from rpc domain.entity.v1.WorkspaceUserRoleDomainService.GetWorkspaceUserRoleItemPageData
     */
    getWorkspaceUserRoleItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkspaceUserRoleItemPageDataRequestSchema;
        output: typeof GetWorkspaceUserRoleItemPageDataResponseSchema;
    };
}>;
