import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Workspace } from "../workspace/workspace_pb";
import type { RolePermission } from "../role_permission/role_permission_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/role/role.proto.
 */
export declare const file_domain_entity_role_role: GenFile;
/**
 * FK References: workspace_user_role.role_id, role_permission.role_id
 *
 * @generated from message domain.entity.v1.Role
 */
export type Role = Message<"domain.entity.v1.Role"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional string workspace_id = 2;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Workspace workspace = 3;
     */
    workspace?: Workspace;
    /**
     * @generated from field: string name = 4;
     */
    name: string;
    /**
     * @generated from field: string description = 5;
     */
    description: string;
    /**
     * @generated from field: string color = 6;
     */
    color: string;
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
    /**
     * @generated from field: repeated domain.entity.v1.RolePermission role_permissions = 12;
     */
    rolePermissions: RolePermission[];
};
/**
 * Describes the message domain.entity.v1.Role.
 * Use `create(RoleSchema)` to create a new message.
 */
export declare const RoleSchema: GenMessage<Role>;
/**
 * @generated from message domain.entity.v1.CreateRoleRequest
 */
export type CreateRoleRequest = Message<"domain.entity.v1.CreateRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Role data = 1;
     */
    data?: Role;
};
/**
 * Describes the message domain.entity.v1.CreateRoleRequest.
 * Use `create(CreateRoleRequestSchema)` to create a new message.
 */
export declare const CreateRoleRequestSchema: GenMessage<CreateRoleRequest>;
/**
 * @generated from message domain.entity.v1.CreateRoleResponse
 */
export type CreateRoleResponse = Message<"domain.entity.v1.CreateRoleResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Role data = 1;
     */
    data: Role[];
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
 * Describes the message domain.entity.v1.CreateRoleResponse.
 * Use `create(CreateRoleResponseSchema)` to create a new message.
 */
export declare const CreateRoleResponseSchema: GenMessage<CreateRoleResponse>;
/**
 * @generated from message domain.entity.v1.ReadRoleRequest
 */
export type ReadRoleRequest = Message<"domain.entity.v1.ReadRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Role data = 1;
     */
    data?: Role;
};
/**
 * Describes the message domain.entity.v1.ReadRoleRequest.
 * Use `create(ReadRoleRequestSchema)` to create a new message.
 */
export declare const ReadRoleRequestSchema: GenMessage<ReadRoleRequest>;
/**
 * @generated from message domain.entity.v1.ReadRoleResponse
 */
export type ReadRoleResponse = Message<"domain.entity.v1.ReadRoleResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Role data = 1;
     */
    data: Role[];
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
 * Describes the message domain.entity.v1.ReadRoleResponse.
 * Use `create(ReadRoleResponseSchema)` to create a new message.
 */
export declare const ReadRoleResponseSchema: GenMessage<ReadRoleResponse>;
/**
 * @generated from message domain.entity.v1.UpdateRoleRequest
 */
export type UpdateRoleRequest = Message<"domain.entity.v1.UpdateRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Role data = 1;
     */
    data?: Role;
};
/**
 * Describes the message domain.entity.v1.UpdateRoleRequest.
 * Use `create(UpdateRoleRequestSchema)` to create a new message.
 */
export declare const UpdateRoleRequestSchema: GenMessage<UpdateRoleRequest>;
/**
 * @generated from message domain.entity.v1.UpdateRoleResponse
 */
export type UpdateRoleResponse = Message<"domain.entity.v1.UpdateRoleResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Role data = 1;
     */
    data: Role[];
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
 * Describes the message domain.entity.v1.UpdateRoleResponse.
 * Use `create(UpdateRoleResponseSchema)` to create a new message.
 */
export declare const UpdateRoleResponseSchema: GenMessage<UpdateRoleResponse>;
/**
 * @generated from message domain.entity.v1.DeleteRoleRequest
 */
export type DeleteRoleRequest = Message<"domain.entity.v1.DeleteRoleRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Role data = 1;
     */
    data?: Role;
};
/**
 * Describes the message domain.entity.v1.DeleteRoleRequest.
 * Use `create(DeleteRoleRequestSchema)` to create a new message.
 */
export declare const DeleteRoleRequestSchema: GenMessage<DeleteRoleRequest>;
/**
 * @generated from message domain.entity.v1.DeleteRoleResponse
 */
export type DeleteRoleResponse = Message<"domain.entity.v1.DeleteRoleResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteRoleResponse.
 * Use `create(DeleteRoleResponseSchema)` to create a new message.
 */
export declare const DeleteRoleResponseSchema: GenMessage<DeleteRoleResponse>;
/**
 * @generated from message domain.entity.v1.ListRolesRequest
 */
export type ListRolesRequest = Message<"domain.entity.v1.ListRolesRequest"> & {
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
 * Describes the message domain.entity.v1.ListRolesRequest.
 * Use `create(ListRolesRequestSchema)` to create a new message.
 */
export declare const ListRolesRequestSchema: GenMessage<ListRolesRequest>;
/**
 * @generated from message domain.entity.v1.ListRolesResponse
 */
export type ListRolesResponse = Message<"domain.entity.v1.ListRolesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Role data = 1;
     */
    data: Role[];
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
 * Describes the message domain.entity.v1.ListRolesResponse.
 * Use `create(ListRolesResponseSchema)` to create a new message.
 */
export declare const ListRolesResponseSchema: GenMessage<ListRolesResponse>;
/**
 * @generated from message domain.entity.v1.GetRoleListPageDataRequest
 */
export type GetRoleListPageDataRequest = Message<"domain.entity.v1.GetRoleListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetRoleListPageDataRequest.
 * Use `create(GetRoleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRoleListPageDataRequestSchema: GenMessage<GetRoleListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetRoleListPageDataResponse
 */
export type GetRoleListPageDataResponse = Message<"domain.entity.v1.GetRoleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Role role_list = 1;
     */
    roleList: Role[];
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
 * Describes the message domain.entity.v1.GetRoleListPageDataResponse.
 * Use `create(GetRoleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRoleListPageDataResponseSchema: GenMessage<GetRoleListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetRoleItemPageDataRequest
 */
export type GetRoleItemPageDataRequest = Message<"domain.entity.v1.GetRoleItemPageDataRequest"> & {
    /**
     * @generated from field: string role_id = 1;
     */
    roleId: string;
};
/**
 * Describes the message domain.entity.v1.GetRoleItemPageDataRequest.
 * Use `create(GetRoleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRoleItemPageDataRequestSchema: GenMessage<GetRoleItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetRoleItemPageDataResponse
 */
export type GetRoleItemPageDataResponse = Message<"domain.entity.v1.GetRoleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Role role = 1;
     */
    role?: Role;
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
 * Describes the message domain.entity.v1.GetRoleItemPageDataResponse.
 * Use `create(GetRoleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRoleItemPageDataResponseSchema: GenMessage<GetRoleItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.RoleDomainService
 */
export declare const RoleDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.CreateRole
     */
    createRole: {
        methodKind: "unary";
        input: typeof CreateRoleRequestSchema;
        output: typeof CreateRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.ReadRole
     */
    readRole: {
        methodKind: "unary";
        input: typeof ReadRoleRequestSchema;
        output: typeof ReadRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.UpdateRole
     */
    updateRole: {
        methodKind: "unary";
        input: typeof UpdateRoleRequestSchema;
        output: typeof UpdateRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.DeleteRole
     */
    deleteRole: {
        methodKind: "unary";
        input: typeof DeleteRoleRequestSchema;
        output: typeof DeleteRoleResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.ListRoles
     */
    listRoles: {
        methodKind: "unary";
        input: typeof ListRolesRequestSchema;
        output: typeof ListRolesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.GetRoleListPageData
     */
    getRoleListPageData: {
        methodKind: "unary";
        input: typeof GetRoleListPageDataRequestSchema;
        output: typeof GetRoleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RoleDomainService.GetRoleItemPageData
     */
    getRoleItemPageData: {
        methodKind: "unary";
        input: typeof GetRoleItemPageDataRequestSchema;
        output: typeof GetRoleItemPageDataResponseSchema;
    };
}>;
