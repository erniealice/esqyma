import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/permission/permission.proto.
 */
export declare const file_domain_entity_permission_permission: GenFile;
/**
 * @generated from message domain.entity.v1.Permission
 */
export type Permission = Message<"domain.entity.v1.Permission"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string user_id = 3;
     */
    userId: string;
    /**
     * @generated from field: string granted_by_user_id = 4;
     */
    grantedByUserId: string;
    /**
     * @generated from field: string permission_code = 5;
     */
    permissionCode: string;
    /**
     * @generated from field: domain.entity.v1.PermissionType permission_type = 6;
     */
    permissionType: PermissionType;
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
     * @generated from field: string name = 12;
     */
    name: string;
    /**
     * @generated from field: string description = 13;
     */
    description: string;
};
/**
 * Describes the message domain.entity.v1.Permission.
 * Use `create(PermissionSchema)` to create a new message.
 */
export declare const PermissionSchema: GenMessage<Permission>;
/**
 * @generated from message domain.entity.v1.CreatePermissionRequest
 */
export type CreatePermissionRequest = Message<"domain.entity.v1.CreatePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Permission data = 1;
     */
    data?: Permission;
};
/**
 * Describes the message domain.entity.v1.CreatePermissionRequest.
 * Use `create(CreatePermissionRequestSchema)` to create a new message.
 */
export declare const CreatePermissionRequestSchema: GenMessage<CreatePermissionRequest>;
/**
 * @generated from message domain.entity.v1.CreatePermissionResponse
 */
export type CreatePermissionResponse = Message<"domain.entity.v1.CreatePermissionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Permission data = 1;
     */
    data: Permission[];
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
 * Describes the message domain.entity.v1.CreatePermissionResponse.
 * Use `create(CreatePermissionResponseSchema)` to create a new message.
 */
export declare const CreatePermissionResponseSchema: GenMessage<CreatePermissionResponse>;
/**
 * @generated from message domain.entity.v1.ReadPermissionRequest
 */
export type ReadPermissionRequest = Message<"domain.entity.v1.ReadPermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Permission data = 1;
     */
    data?: Permission;
};
/**
 * Describes the message domain.entity.v1.ReadPermissionRequest.
 * Use `create(ReadPermissionRequestSchema)` to create a new message.
 */
export declare const ReadPermissionRequestSchema: GenMessage<ReadPermissionRequest>;
/**
 * @generated from message domain.entity.v1.ReadPermissionResponse
 */
export type ReadPermissionResponse = Message<"domain.entity.v1.ReadPermissionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Permission data = 1;
     */
    data: Permission[];
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
 * Describes the message domain.entity.v1.ReadPermissionResponse.
 * Use `create(ReadPermissionResponseSchema)` to create a new message.
 */
export declare const ReadPermissionResponseSchema: GenMessage<ReadPermissionResponse>;
/**
 * @generated from message domain.entity.v1.UpdatePermissionRequest
 */
export type UpdatePermissionRequest = Message<"domain.entity.v1.UpdatePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Permission data = 1;
     */
    data?: Permission;
};
/**
 * Describes the message domain.entity.v1.UpdatePermissionRequest.
 * Use `create(UpdatePermissionRequestSchema)` to create a new message.
 */
export declare const UpdatePermissionRequestSchema: GenMessage<UpdatePermissionRequest>;
/**
 * @generated from message domain.entity.v1.UpdatePermissionResponse
 */
export type UpdatePermissionResponse = Message<"domain.entity.v1.UpdatePermissionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Permission data = 1;
     */
    data: Permission[];
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
 * Describes the message domain.entity.v1.UpdatePermissionResponse.
 * Use `create(UpdatePermissionResponseSchema)` to create a new message.
 */
export declare const UpdatePermissionResponseSchema: GenMessage<UpdatePermissionResponse>;
/**
 * @generated from message domain.entity.v1.DeletePermissionRequest
 */
export type DeletePermissionRequest = Message<"domain.entity.v1.DeletePermissionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Permission data = 1;
     */
    data?: Permission;
};
/**
 * Describes the message domain.entity.v1.DeletePermissionRequest.
 * Use `create(DeletePermissionRequestSchema)` to create a new message.
 */
export declare const DeletePermissionRequestSchema: GenMessage<DeletePermissionRequest>;
/**
 * @generated from message domain.entity.v1.DeletePermissionResponse
 */
export type DeletePermissionResponse = Message<"domain.entity.v1.DeletePermissionResponse"> & {
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
 * Describes the message domain.entity.v1.DeletePermissionResponse.
 * Use `create(DeletePermissionResponseSchema)` to create a new message.
 */
export declare const DeletePermissionResponseSchema: GenMessage<DeletePermissionResponse>;
/**
 * @generated from message domain.entity.v1.ListPermissionsRequest
 */
export type ListPermissionsRequest = Message<"domain.entity.v1.ListPermissionsRequest"> & {
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
 * Describes the message domain.entity.v1.ListPermissionsRequest.
 * Use `create(ListPermissionsRequestSchema)` to create a new message.
 */
export declare const ListPermissionsRequestSchema: GenMessage<ListPermissionsRequest>;
/**
 * @generated from message domain.entity.v1.ListPermissionsResponse
 */
export type ListPermissionsResponse = Message<"domain.entity.v1.ListPermissionsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Permission data = 1;
     */
    data: Permission[];
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
 * Describes the message domain.entity.v1.ListPermissionsResponse.
 * Use `create(ListPermissionsResponseSchema)` to create a new message.
 */
export declare const ListPermissionsResponseSchema: GenMessage<ListPermissionsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.entity.v1.GetPermissionListPageDataRequest
 */
export type GetPermissionListPageDataRequest = Message<"domain.entity.v1.GetPermissionListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetPermissionListPageDataRequest.
 * Use `create(GetPermissionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPermissionListPageDataRequestSchema: GenMessage<GetPermissionListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetPermissionListPageDataResponse
 */
export type GetPermissionListPageDataResponse = Message<"domain.entity.v1.GetPermissionListPageDataResponse"> & {
    /**
     * The permission data
     *
     * @generated from field: repeated domain.entity.v1.Permission permission_list = 1;
     */
    permissionList: Permission[];
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
 * Describes the message domain.entity.v1.GetPermissionListPageDataResponse.
 * Use `create(GetPermissionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPermissionListPageDataResponseSchema: GenMessage<GetPermissionListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetPermissionItemPageDataRequest
 */
export type GetPermissionItemPageDataRequest = Message<"domain.entity.v1.GetPermissionItemPageDataRequest"> & {
    /**
     * The permission ID to retrieve
     *
     * @generated from field: string permission_id = 1;
     */
    permissionId: string;
};
/**
 * Describes the message domain.entity.v1.GetPermissionItemPageDataRequest.
 * Use `create(GetPermissionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPermissionItemPageDataRequestSchema: GenMessage<GetPermissionItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetPermissionItemPageDataResponse
 */
export type GetPermissionItemPageDataResponse = Message<"domain.entity.v1.GetPermissionItemPageDataResponse"> & {
    /**
     * The permission data
     *
     * @generated from field: domain.entity.v1.Permission permission = 1;
     */
    permission?: Permission;
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
 * Describes the message domain.entity.v1.GetPermissionItemPageDataResponse.
 * Use `create(GetPermissionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPermissionItemPageDataResponseSchema: GenMessage<GetPermissionItemPageDataResponse>;
/**
 * @generated from enum domain.entity.v1.PermissionType
 */
export declare enum PermissionType {
    /**
     * @generated from enum value: PERMISSION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: PERMISSION_TYPE_ALLOW = 1;
     */
    ALLOW = 1,
    /**
     * @generated from enum value: PERMISSION_TYPE_DENY = 2;
     */
    DENY = 2
}
/**
 * Describes the enum domain.entity.v1.PermissionType.
 */
export declare const PermissionTypeSchema: GenEnum<PermissionType>;
/**
 * @generated from service domain.entity.v1.PermissionDomainService
 */
export declare const PermissionDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.CreatePermission
     */
    createPermission: {
        methodKind: "unary";
        input: typeof CreatePermissionRequestSchema;
        output: typeof CreatePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.ReadPermission
     */
    readPermission: {
        methodKind: "unary";
        input: typeof ReadPermissionRequestSchema;
        output: typeof ReadPermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.UpdatePermission
     */
    updatePermission: {
        methodKind: "unary";
        input: typeof UpdatePermissionRequestSchema;
        output: typeof UpdatePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.DeletePermission
     */
    deletePermission: {
        methodKind: "unary";
        input: typeof DeletePermissionRequestSchema;
        output: typeof DeletePermissionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.ListPermissions
     */
    listPermissions: {
        methodKind: "unary";
        input: typeof ListPermissionsRequestSchema;
        output: typeof ListPermissionsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.GetPermissionListPageData
     */
    getPermissionListPageData: {
        methodKind: "unary";
        input: typeof GetPermissionListPageDataRequestSchema;
        output: typeof GetPermissionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PermissionDomainService.GetPermissionItemPageData
     */
    getPermissionItemPageData: {
        methodKind: "unary";
        input: typeof GetPermissionItemPageDataRequestSchema;
        output: typeof GetPermissionItemPageDataResponseSchema;
    };
}>;
