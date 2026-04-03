import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Workspace } from "../workspace/workspace_pb";
import type { User } from "../user/user_pb";
import type { WorkspaceUserRole } from "../workspace_user_role/workspace_user_role_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/workspace_user/workspace_user.proto.
 */
export declare const file_domain_entity_workspace_user_workspace_user: GenFile;
/**
 * @generated from message domain.entity.v1.WorkspaceUser
 */
export type WorkspaceUser = Message<"domain.entity.v1.WorkspaceUser"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.entity.v1.Workspace workspace = 2;
     */
    workspace?: Workspace;
    /**
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
    /**
     * @generated from field: optional domain.entity.v1.User user = 4;
     */
    user?: User;
    /**
     * @generated from field: string user_id = 5;
     */
    userId: string;
    /**
     * Junction table exposure: We expose WorkspaceUserRole instead of hiding it behind a simple
     * repeated Role field. This allows:
     * 1. Access to junction record IDs for deletion (DELETE /workspace-user-role/{id})
     * 2. Access to relationship metadata (date_created, active status on the junction)
     * 3. Consistent CRUD patterns across all entities
     * Frontend accesses role data via: workspaceUser.workspace_user_roles[0].role.name
     *
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole workspace_user_roles = 6;
     */
    workspaceUserRoles: WorkspaceUserRole[];
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
 * Describes the message domain.entity.v1.WorkspaceUser.
 * Use `create(WorkspaceUserSchema)` to create a new message.
 */
export declare const WorkspaceUserSchema: GenMessage<WorkspaceUser>;
/**
 * @generated from message domain.entity.v1.CreateWorkspaceUserRequest
 */
export type CreateWorkspaceUserRequest = Message<"domain.entity.v1.CreateWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUser data = 1;
     */
    data?: WorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.CreateWorkspaceUserRequest.
 * Use `create(CreateWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const CreateWorkspaceUserRequestSchema: GenMessage<CreateWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.CreateWorkspaceUserResponse
 */
export type CreateWorkspaceUserResponse = Message<"domain.entity.v1.CreateWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUser data = 1;
     */
    data: WorkspaceUser[];
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
 * Describes the message domain.entity.v1.CreateWorkspaceUserResponse.
 * Use `create(CreateWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const CreateWorkspaceUserResponseSchema: GenMessage<CreateWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.ReadWorkspaceUserRequest
 */
export type ReadWorkspaceUserRequest = Message<"domain.entity.v1.ReadWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUser data = 1;
     */
    data?: WorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.ReadWorkspaceUserRequest.
 * Use `create(ReadWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const ReadWorkspaceUserRequestSchema: GenMessage<ReadWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.ReadWorkspaceUserResponse
 */
export type ReadWorkspaceUserResponse = Message<"domain.entity.v1.ReadWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUser data = 1;
     */
    data: WorkspaceUser[];
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
 * Describes the message domain.entity.v1.ReadWorkspaceUserResponse.
 * Use `create(ReadWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const ReadWorkspaceUserResponseSchema: GenMessage<ReadWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.UpdateWorkspaceUserRequest
 */
export type UpdateWorkspaceUserRequest = Message<"domain.entity.v1.UpdateWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUser data = 1;
     */
    data?: WorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.UpdateWorkspaceUserRequest.
 * Use `create(UpdateWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const UpdateWorkspaceUserRequestSchema: GenMessage<UpdateWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.UpdateWorkspaceUserResponse
 */
export type UpdateWorkspaceUserResponse = Message<"domain.entity.v1.UpdateWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUser data = 1;
     */
    data: WorkspaceUser[];
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
 * Describes the message domain.entity.v1.UpdateWorkspaceUserResponse.
 * Use `create(UpdateWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const UpdateWorkspaceUserResponseSchema: GenMessage<UpdateWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.DeleteWorkspaceUserRequest
 */
export type DeleteWorkspaceUserRequest = Message<"domain.entity.v1.DeleteWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUser data = 1;
     */
    data?: WorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.DeleteWorkspaceUserRequest.
 * Use `create(DeleteWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const DeleteWorkspaceUserRequestSchema: GenMessage<DeleteWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.DeleteWorkspaceUserResponse
 */
export type DeleteWorkspaceUserResponse = Message<"domain.entity.v1.DeleteWorkspaceUserResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteWorkspaceUserResponse.
 * Use `create(DeleteWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const DeleteWorkspaceUserResponseSchema: GenMessage<DeleteWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.ListWorkspaceUsersRequest
 */
export type ListWorkspaceUsersRequest = Message<"domain.entity.v1.ListWorkspaceUsersRequest"> & {
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
 * Describes the message domain.entity.v1.ListWorkspaceUsersRequest.
 * Use `create(ListWorkspaceUsersRequestSchema)` to create a new message.
 */
export declare const ListWorkspaceUsersRequestSchema: GenMessage<ListWorkspaceUsersRequest>;
/**
 * @generated from message domain.entity.v1.ListWorkspaceUsersResponse
 */
export type ListWorkspaceUsersResponse = Message<"domain.entity.v1.ListWorkspaceUsersResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUser data = 1;
     */
    data: WorkspaceUser[];
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
 * Describes the message domain.entity.v1.ListWorkspaceUsersResponse.
 * Use `create(ListWorkspaceUsersResponseSchema)` to create a new message.
 */
export declare const ListWorkspaceUsersResponseSchema: GenMessage<ListWorkspaceUsersResponse>;
/**
 * Enhanced list request
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserListPageDataRequest
 */
export type GetWorkspaceUserListPageDataRequest = Message<"domain.entity.v1.GetWorkspaceUserListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetWorkspaceUserListPageDataRequest.
 * Use `create(GetWorkspaceUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkspaceUserListPageDataRequestSchema: GenMessage<GetWorkspaceUserListPageDataRequest>;
/**
 * Enhanced list response
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserListPageDataResponse
 */
export type GetWorkspaceUserListPageDataResponse = Message<"domain.entity.v1.GetWorkspaceUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUser workspace_user_list = 1;
     */
    workspaceUserList: WorkspaceUser[];
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
 * Describes the message domain.entity.v1.GetWorkspaceUserListPageDataResponse.
 * Use `create(GetWorkspaceUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkspaceUserListPageDataResponseSchema: GenMessage<GetWorkspaceUserListPageDataResponse>;
/**
 * Item request
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserItemPageDataRequest
 */
export type GetWorkspaceUserItemPageDataRequest = Message<"domain.entity.v1.GetWorkspaceUserItemPageDataRequest"> & {
    /**
     * @generated from field: string workspace_user_id = 1;
     */
    workspaceUserId: string;
};
/**
 * Describes the message domain.entity.v1.GetWorkspaceUserItemPageDataRequest.
 * Use `create(GetWorkspaceUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkspaceUserItemPageDataRequestSchema: GenMessage<GetWorkspaceUserItemPageDataRequest>;
/**
 * Item response
 *
 * @generated from message domain.entity.v1.GetWorkspaceUserItemPageDataResponse
 */
export type GetWorkspaceUserItemPageDataResponse = Message<"domain.entity.v1.GetWorkspaceUserItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.WorkspaceUser workspace_user = 1;
     */
    workspaceUser?: WorkspaceUser;
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
 * Describes the message domain.entity.v1.GetWorkspaceUserItemPageDataResponse.
 * Use `create(GetWorkspaceUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkspaceUserItemPageDataResponseSchema: GenMessage<GetWorkspaceUserItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.WorkspaceUserDomainService
 */
export declare const WorkspaceUserDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.CreateWorkspaceUser
     */
    createWorkspaceUser: {
        methodKind: "unary";
        input: typeof CreateWorkspaceUserRequestSchema;
        output: typeof CreateWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.ReadWorkspaceUser
     */
    readWorkspaceUser: {
        methodKind: "unary";
        input: typeof ReadWorkspaceUserRequestSchema;
        output: typeof ReadWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.UpdateWorkspaceUser
     */
    updateWorkspaceUser: {
        methodKind: "unary";
        input: typeof UpdateWorkspaceUserRequestSchema;
        output: typeof UpdateWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.DeleteWorkspaceUser
     */
    deleteWorkspaceUser: {
        methodKind: "unary";
        input: typeof DeleteWorkspaceUserRequestSchema;
        output: typeof DeleteWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.ListWorkspaceUsers
     */
    listWorkspaceUsers: {
        methodKind: "unary";
        input: typeof ListWorkspaceUsersRequestSchema;
        output: typeof ListWorkspaceUsersResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.GetWorkspaceUserListPageData
     */
    getWorkspaceUserListPageData: {
        methodKind: "unary";
        input: typeof GetWorkspaceUserListPageDataRequestSchema;
        output: typeof GetWorkspaceUserListPageDataResponseSchema;
    };
    /**
     * Enhanced item view
     *
     * @generated from rpc domain.entity.v1.WorkspaceUserDomainService.GetWorkspaceUserItemPageData
     */
    getWorkspaceUserItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkspaceUserItemPageDataRequestSchema;
        output: typeof GetWorkspaceUserItemPageDataResponseSchema;
    };
}>;
