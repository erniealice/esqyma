import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Permission, PermissionType } from "../permission/permission_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/role_permission/role_permission.proto.
 */
export declare const file_domain_entity_role_permission_role_permission: GenFile;
/**
 * @generated from message domain.entity.v1.RolePermission
 */
export type RolePermission = Message<"domain.entity.v1.RolePermission"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string role_id = 2;
     */
    roleId: string;
    /**
     * @generated from field: string permission_id = 3;
     */
    permissionId: string;
    /**
     * @generated from field: optional domain.entity.v1.Permission permission = 4;
     */
    permission?: Permission;
    /**
     * @generated from field: domain.entity.v1.PermissionType permission_type = 5;
     */
    permissionType: PermissionType;
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
 * Describes the message domain.entity.v1.RolePermission.
 * Use `create(RolePermissionSchema)` to create a new message.
 */
export declare const RolePermissionSchema: GenMessage<RolePermission>;
/**
 * @generated from message domain.entity.v1.CreateRolePermissionRequest
 */
export type CreateRolePermissionRequest = Message<"domain.entity.v1.CreateRolePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.RolePermission data = 1;
     */
    data?: RolePermission;
};
/**
 * Describes the message domain.entity.v1.CreateRolePermissionRequest.
 * Use `create(CreateRolePermissionRequestSchema)` to create a new message.
 */
export declare const CreateRolePermissionRequestSchema: GenMessage<CreateRolePermissionRequest>;
/**
 * @generated from message domain.entity.v1.CreateRolePermissionResponse
 */
export type CreateRolePermissionResponse = Message<"domain.entity.v1.CreateRolePermissionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.RolePermission data = 1;
     */
    data: RolePermission[];
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
 * Describes the message domain.entity.v1.CreateRolePermissionResponse.
 * Use `create(CreateRolePermissionResponseSchema)` to create a new message.
 */
export declare const CreateRolePermissionResponseSchema: GenMessage<CreateRolePermissionResponse>;
/**
 * @generated from message domain.entity.v1.ReadRolePermissionRequest
 */
export type ReadRolePermissionRequest = Message<"domain.entity.v1.ReadRolePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.RolePermission data = 1;
     */
    data?: RolePermission;
};
/**
 * Describes the message domain.entity.v1.ReadRolePermissionRequest.
 * Use `create(ReadRolePermissionRequestSchema)` to create a new message.
 */
export declare const ReadRolePermissionRequestSchema: GenMessage<ReadRolePermissionRequest>;
/**
 * @generated from message domain.entity.v1.ReadRolePermissionResponse
 */
export type ReadRolePermissionResponse = Message<"domain.entity.v1.ReadRolePermissionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.RolePermission data = 1;
     */
    data: RolePermission[];
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
 * Describes the message domain.entity.v1.ReadRolePermissionResponse.
 * Use `create(ReadRolePermissionResponseSchema)` to create a new message.
 */
export declare const ReadRolePermissionResponseSchema: GenMessage<ReadRolePermissionResponse>;
/**
 * @generated from message domain.entity.v1.UpdateRolePermissionRequest
 */
export type UpdateRolePermissionRequest = Message<"domain.entity.v1.UpdateRolePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.RolePermission data = 1;
     */
    data?: RolePermission;
};
/**
 * Describes the message domain.entity.v1.UpdateRolePermissionRequest.
 * Use `create(UpdateRolePermissionRequestSchema)` to create a new message.
 */
export declare const UpdateRolePermissionRequestSchema: GenMessage<UpdateRolePermissionRequest>;
/**
 * @generated from message domain.entity.v1.UpdateRolePermissionResponse
 */
export type UpdateRolePermissionResponse = Message<"domain.entity.v1.UpdateRolePermissionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.RolePermission data = 1;
     */
    data: RolePermission[];
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
 * Describes the message domain.entity.v1.UpdateRolePermissionResponse.
 * Use `create(UpdateRolePermissionResponseSchema)` to create a new message.
 */
export declare const UpdateRolePermissionResponseSchema: GenMessage<UpdateRolePermissionResponse>;
/**
 * @generated from message domain.entity.v1.DeleteRolePermissionRequest
 */
export type DeleteRolePermissionRequest = Message<"domain.entity.v1.DeleteRolePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.RolePermission data = 1;
     */
    data?: RolePermission;
};
/**
 * Describes the message domain.entity.v1.DeleteRolePermissionRequest.
 * Use `create(DeleteRolePermissionRequestSchema)` to create a new message.
 */
export declare const DeleteRolePermissionRequestSchema: GenMessage<DeleteRolePermissionRequest>;
/**
 * @generated from message domain.entity.v1.DeleteRolePermissionResponse
 */
export type DeleteRolePermissionResponse = Message<"domain.entity.v1.DeleteRolePermissionResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteRolePermissionResponse.
 * Use `create(DeleteRolePermissionResponseSchema)` to create a new message.
 */
export declare const DeleteRolePermissionResponseSchema: GenMessage<DeleteRolePermissionResponse>;
/**
 * @generated from message domain.entity.v1.ListRolePermissionsRequest
 */
export type ListRolePermissionsRequest = Message<"domain.entity.v1.ListRolePermissionsRequest"> & {
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
 * Describes the message domain.entity.v1.ListRolePermissionsRequest.
 * Use `create(ListRolePermissionsRequestSchema)` to create a new message.
 */
export declare const ListRolePermissionsRequestSchema: GenMessage<ListRolePermissionsRequest>;
/**
 * @generated from message domain.entity.v1.ListRolePermissionsResponse
 */
export type ListRolePermissionsResponse = Message<"domain.entity.v1.ListRolePermissionsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.RolePermission data = 1;
     */
    data: RolePermission[];
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
 * Describes the message domain.entity.v1.ListRolePermissionsResponse.
 * Use `create(ListRolePermissionsResponseSchema)` to create a new message.
 */
export declare const ListRolePermissionsResponseSchema: GenMessage<ListRolePermissionsResponse>;
/**
 * NEW: Enhanced list request with pagination, filtering, sorting, search
 *
 * @generated from message domain.entity.v1.GetRolePermissionListPageDataRequest
 */
export type GetRolePermissionListPageDataRequest = Message<"domain.entity.v1.GetRolePermissionListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetRolePermissionListPageDataRequest.
 * Use `create(GetRolePermissionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRolePermissionListPageDataRequestSchema: GenMessage<GetRolePermissionListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetRolePermissionListPageDataResponse
 */
export type GetRolePermissionListPageDataResponse = Message<"domain.entity.v1.GetRolePermissionListPageDataResponse"> & {
    /**
     * The role permission data
     *
     * @generated from field: repeated domain.entity.v1.RolePermission role_permission_list = 1;
     */
    rolePermissionList: RolePermission[];
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
 * Describes the message domain.entity.v1.GetRolePermissionListPageDataResponse.
 * Use `create(GetRolePermissionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRolePermissionListPageDataResponseSchema: GenMessage<GetRolePermissionListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetRolePermissionItemPageDataRequest
 */
export type GetRolePermissionItemPageDataRequest = Message<"domain.entity.v1.GetRolePermissionItemPageDataRequest"> & {
    /**
     * The role permission ID to retrieve
     *
     * @generated from field: string role_permission_id = 1;
     */
    rolePermissionId: string;
};
/**
 * Describes the message domain.entity.v1.GetRolePermissionItemPageDataRequest.
 * Use `create(GetRolePermissionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRolePermissionItemPageDataRequestSchema: GenMessage<GetRolePermissionItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetRolePermissionItemPageDataResponse
 */
export type GetRolePermissionItemPageDataResponse = Message<"domain.entity.v1.GetRolePermissionItemPageDataResponse"> & {
    /**
     * The role permission data
     *
     * @generated from field: domain.entity.v1.RolePermission role_permission = 1;
     */
    rolePermission?: RolePermission;
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
 * Describes the message domain.entity.v1.GetRolePermissionItemPageDataResponse.
 * Use `create(GetRolePermissionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRolePermissionItemPageDataResponseSchema: GenMessage<GetRolePermissionItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.RolePermissionDomainService
 */
export declare const RolePermissionDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.CreateRolePermission
     */
    createRolePermission: {
        methodKind: "unary";
        input: typeof CreateRolePermissionRequestSchema;
        output: typeof CreateRolePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.ReadRolePermission
     */
    readRolePermission: {
        methodKind: "unary";
        input: typeof ReadRolePermissionRequestSchema;
        output: typeof ReadRolePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.UpdateRolePermission
     */
    updateRolePermission: {
        methodKind: "unary";
        input: typeof UpdateRolePermissionRequestSchema;
        output: typeof UpdateRolePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.DeleteRolePermission
     */
    deleteRolePermission: {
        methodKind: "unary";
        input: typeof DeleteRolePermissionRequestSchema;
        output: typeof DeleteRolePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.ListRolePermissions
     */
    listRolePermissions: {
        methodKind: "unary";
        input: typeof ListRolePermissionsRequestSchema;
        output: typeof ListRolePermissionsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.GetRolePermissionListPageData
     */
    getRolePermissionListPageData: {
        methodKind: "unary";
        input: typeof GetRolePermissionListPageDataRequestSchema;
        output: typeof GetRolePermissionListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.RolePermissionDomainService.GetRolePermissionItemPageData
     */
    getRolePermissionItemPageData: {
        methodKind: "unary";
        input: typeof GetRolePermissionItemPageDataRequestSchema;
        output: typeof GetRolePermissionItemPageDataResponseSchema;
    };
}>;
