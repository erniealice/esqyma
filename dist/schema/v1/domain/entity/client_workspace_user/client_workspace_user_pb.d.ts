import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/client_workspace_user/client_workspace_user.proto.
 */
export declare const file_domain_entity_client_workspace_user_client_workspace_user: GenFile;
/**
 * ClientWorkspaceUser binds a workspace_user to a client account (the account
 * team). It is the composite-FK target that subscription_workspace_user
 * constrains against (project servicers must be a subset of the account team).
 *
 * @generated from message domain.entity.v1.ClientWorkspaceUser
 */
export type ClientWorkspaceUser = Message<"domain.entity.v1.ClientWorkspaceUser"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 3;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 5;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * @generated from field: string client_id = 8;
     */
    clientId: string;
    /**
     * @generated from field: string workspace_user_id = 9;
     */
    workspaceUserId: string;
    /**
     * @generated from field: bool is_owner = 10;
     */
    isOwner: boolean;
};
/**
 * Describes the message domain.entity.v1.ClientWorkspaceUser.
 * Use `create(ClientWorkspaceUserSchema)` to create a new message.
 */
export declare const ClientWorkspaceUserSchema: GenMessage<ClientWorkspaceUser>;
/**
 * @generated from message domain.entity.v1.CreateClientWorkspaceUserRequest
 */
export type CreateClientWorkspaceUserRequest = Message<"domain.entity.v1.CreateClientWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data?: ClientWorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.CreateClientWorkspaceUserRequest.
 * Use `create(CreateClientWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const CreateClientWorkspaceUserRequestSchema: GenMessage<CreateClientWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.CreateClientWorkspaceUserResponse
 */
export type CreateClientWorkspaceUserResponse = Message<"domain.entity.v1.CreateClientWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data: ClientWorkspaceUser[];
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
 * Describes the message domain.entity.v1.CreateClientWorkspaceUserResponse.
 * Use `create(CreateClientWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const CreateClientWorkspaceUserResponseSchema: GenMessage<CreateClientWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.ReadClientWorkspaceUserRequest
 */
export type ReadClientWorkspaceUserRequest = Message<"domain.entity.v1.ReadClientWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data?: ClientWorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.ReadClientWorkspaceUserRequest.
 * Use `create(ReadClientWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const ReadClientWorkspaceUserRequestSchema: GenMessage<ReadClientWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.ReadClientWorkspaceUserResponse
 */
export type ReadClientWorkspaceUserResponse = Message<"domain.entity.v1.ReadClientWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data: ClientWorkspaceUser[];
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
 * Describes the message domain.entity.v1.ReadClientWorkspaceUserResponse.
 * Use `create(ReadClientWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const ReadClientWorkspaceUserResponseSchema: GenMessage<ReadClientWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.UpdateClientWorkspaceUserRequest
 */
export type UpdateClientWorkspaceUserRequest = Message<"domain.entity.v1.UpdateClientWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data?: ClientWorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.UpdateClientWorkspaceUserRequest.
 * Use `create(UpdateClientWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const UpdateClientWorkspaceUserRequestSchema: GenMessage<UpdateClientWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.UpdateClientWorkspaceUserResponse
 */
export type UpdateClientWorkspaceUserResponse = Message<"domain.entity.v1.UpdateClientWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data: ClientWorkspaceUser[];
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
 * Describes the message domain.entity.v1.UpdateClientWorkspaceUserResponse.
 * Use `create(UpdateClientWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const UpdateClientWorkspaceUserResponseSchema: GenMessage<UpdateClientWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.DeleteClientWorkspaceUserRequest
 */
export type DeleteClientWorkspaceUserRequest = Message<"domain.entity.v1.DeleteClientWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data?: ClientWorkspaceUser;
};
/**
 * Describes the message domain.entity.v1.DeleteClientWorkspaceUserRequest.
 * Use `create(DeleteClientWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const DeleteClientWorkspaceUserRequestSchema: GenMessage<DeleteClientWorkspaceUserRequest>;
/**
 * @generated from message domain.entity.v1.DeleteClientWorkspaceUserResponse
 */
export type DeleteClientWorkspaceUserResponse = Message<"domain.entity.v1.DeleteClientWorkspaceUserResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteClientWorkspaceUserResponse.
 * Use `create(DeleteClientWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const DeleteClientWorkspaceUserResponseSchema: GenMessage<DeleteClientWorkspaceUserResponse>;
/**
 * @generated from message domain.entity.v1.ListClientWorkspaceUsersRequest
 */
export type ListClientWorkspaceUsersRequest = Message<"domain.entity.v1.ListClientWorkspaceUsersRequest"> & {
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
 * Describes the message domain.entity.v1.ListClientWorkspaceUsersRequest.
 * Use `create(ListClientWorkspaceUsersRequestSchema)` to create a new message.
 */
export declare const ListClientWorkspaceUsersRequestSchema: GenMessage<ListClientWorkspaceUsersRequest>;
/**
 * @generated from message domain.entity.v1.ListClientWorkspaceUsersResponse
 */
export type ListClientWorkspaceUsersResponse = Message<"domain.entity.v1.ListClientWorkspaceUsersResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientWorkspaceUser data = 1;
     */
    data: ClientWorkspaceUser[];
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
 * Describes the message domain.entity.v1.ListClientWorkspaceUsersResponse.
 * Use `create(ListClientWorkspaceUsersResponseSchema)` to create a new message.
 */
export declare const ListClientWorkspaceUsersResponseSchema: GenMessage<ListClientWorkspaceUsersResponse>;
/**
 * @generated from message domain.entity.v1.GetClientWorkspaceUserListPageDataRequest
 */
export type GetClientWorkspaceUserListPageDataRequest = Message<"domain.entity.v1.GetClientWorkspaceUserListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetClientWorkspaceUserListPageDataRequest.
 * Use `create(GetClientWorkspaceUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientWorkspaceUserListPageDataRequestSchema: GenMessage<GetClientWorkspaceUserListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientWorkspaceUserListPageDataResponse
 */
export type GetClientWorkspaceUserListPageDataResponse = Message<"domain.entity.v1.GetClientWorkspaceUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientWorkspaceUser client_workspace_user_list = 1;
     */
    clientWorkspaceUserList: ClientWorkspaceUser[];
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
 * Describes the message domain.entity.v1.GetClientWorkspaceUserListPageDataResponse.
 * Use `create(GetClientWorkspaceUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientWorkspaceUserListPageDataResponseSchema: GenMessage<GetClientWorkspaceUserListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetClientWorkspaceUserItemPageDataRequest
 */
export type GetClientWorkspaceUserItemPageDataRequest = Message<"domain.entity.v1.GetClientWorkspaceUserItemPageDataRequest"> & {
    /**
     * @generated from field: string client_workspace_user_id = 1;
     */
    clientWorkspaceUserId: string;
};
/**
 * Describes the message domain.entity.v1.GetClientWorkspaceUserItemPageDataRequest.
 * Use `create(GetClientWorkspaceUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientWorkspaceUserItemPageDataRequestSchema: GenMessage<GetClientWorkspaceUserItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientWorkspaceUserItemPageDataResponse
 */
export type GetClientWorkspaceUserItemPageDataResponse = Message<"domain.entity.v1.GetClientWorkspaceUserItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.ClientWorkspaceUser client_workspace_user = 1;
     */
    clientWorkspaceUser?: ClientWorkspaceUser;
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
 * Describes the message domain.entity.v1.GetClientWorkspaceUserItemPageDataResponse.
 * Use `create(GetClientWorkspaceUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientWorkspaceUserItemPageDataResponseSchema: GenMessage<GetClientWorkspaceUserItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.ClientWorkspaceUserDomainService
 */
export declare const ClientWorkspaceUserDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.CreateClientWorkspaceUser
     */
    createClientWorkspaceUser: {
        methodKind: "unary";
        input: typeof CreateClientWorkspaceUserRequestSchema;
        output: typeof CreateClientWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.ReadClientWorkspaceUser
     */
    readClientWorkspaceUser: {
        methodKind: "unary";
        input: typeof ReadClientWorkspaceUserRequestSchema;
        output: typeof ReadClientWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.UpdateClientWorkspaceUser
     */
    updateClientWorkspaceUser: {
        methodKind: "unary";
        input: typeof UpdateClientWorkspaceUserRequestSchema;
        output: typeof UpdateClientWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.DeleteClientWorkspaceUser
     */
    deleteClientWorkspaceUser: {
        methodKind: "unary";
        input: typeof DeleteClientWorkspaceUserRequestSchema;
        output: typeof DeleteClientWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.ListClientWorkspaceUsers
     */
    listClientWorkspaceUsers: {
        methodKind: "unary";
        input: typeof ListClientWorkspaceUsersRequestSchema;
        output: typeof ListClientWorkspaceUsersResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.GetClientWorkspaceUserListPageData
     */
    getClientWorkspaceUserListPageData: {
        methodKind: "unary";
        input: typeof GetClientWorkspaceUserListPageDataRequestSchema;
        output: typeof GetClientWorkspaceUserListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.ClientWorkspaceUserDomainService.GetClientWorkspaceUserItemPageData
     */
    getClientWorkspaceUserItemPageData: {
        methodKind: "unary";
        input: typeof GetClientWorkspaceUserItemPageDataRequestSchema;
        output: typeof GetClientWorkspaceUserItemPageDataResponseSchema;
    };
}>;
