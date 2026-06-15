import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_workspace_user/subscription_workspace_user.proto.
 */
export declare const file_domain_subscription_subscription_workspace_user_subscription_workspace_user: GenFile;
/**
 * SubscriptionWorkspaceUser binds a workspace_user to a subscription (the
 * project servicing team). client_id is denormalized so the composite FK
 * (client_id, workspace_user_id) -> client_workspace_user can enforce the
 * fail-closed rule: project servicers must be a subset of the account team.
 * client_id therefore carries NO `references` annotation here — it is part of
 * the composite FK enforced in SQL, not a standalone FK.
 *
 * @generated from message domain.subscription.v1.SubscriptionWorkspaceUser
 */
export type SubscriptionWorkspaceUser = Message<"domain.subscription.v1.SubscriptionWorkspaceUser"> & {
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
     * @generated from field: string subscription_id = 8;
     */
    subscriptionId: string;
    /**
     * Denormalized — NO standalone FK; part of the composite FK enforced in SQL.
     *
     * @generated from field: string client_id = 9;
     */
    clientId: string;
    /**
     * @generated from field: string workspace_user_id = 10;
     */
    workspaceUserId: string;
    /**
     * @generated from field: bool is_owner = 11;
     */
    isOwner: boolean;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionWorkspaceUser.
 * Use `create(SubscriptionWorkspaceUserSchema)` to create a new message.
 */
export declare const SubscriptionWorkspaceUserSchema: GenMessage<SubscriptionWorkspaceUser>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionWorkspaceUserRequest
 */
export type CreateSubscriptionWorkspaceUserRequest = Message<"domain.subscription.v1.CreateSubscriptionWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data?: SubscriptionWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionWorkspaceUserRequest.
 * Use `create(CreateSubscriptionWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionWorkspaceUserRequestSchema: GenMessage<CreateSubscriptionWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionWorkspaceUserResponse
 */
export type CreateSubscriptionWorkspaceUserResponse = Message<"domain.subscription.v1.CreateSubscriptionWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data: SubscriptionWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionWorkspaceUserResponse.
 * Use `create(CreateSubscriptionWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionWorkspaceUserResponseSchema: GenMessage<CreateSubscriptionWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionWorkspaceUserRequest
 */
export type ReadSubscriptionWorkspaceUserRequest = Message<"domain.subscription.v1.ReadSubscriptionWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data?: SubscriptionWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionWorkspaceUserRequest.
 * Use `create(ReadSubscriptionWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionWorkspaceUserRequestSchema: GenMessage<ReadSubscriptionWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionWorkspaceUserResponse
 */
export type ReadSubscriptionWorkspaceUserResponse = Message<"domain.subscription.v1.ReadSubscriptionWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data: SubscriptionWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionWorkspaceUserResponse.
 * Use `create(ReadSubscriptionWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionWorkspaceUserResponseSchema: GenMessage<ReadSubscriptionWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionWorkspaceUserRequest
 */
export type UpdateSubscriptionWorkspaceUserRequest = Message<"domain.subscription.v1.UpdateSubscriptionWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data?: SubscriptionWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionWorkspaceUserRequest.
 * Use `create(UpdateSubscriptionWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionWorkspaceUserRequestSchema: GenMessage<UpdateSubscriptionWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionWorkspaceUserResponse
 */
export type UpdateSubscriptionWorkspaceUserResponse = Message<"domain.subscription.v1.UpdateSubscriptionWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data: SubscriptionWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionWorkspaceUserResponse.
 * Use `create(UpdateSubscriptionWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionWorkspaceUserResponseSchema: GenMessage<UpdateSubscriptionWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionWorkspaceUserRequest
 */
export type DeleteSubscriptionWorkspaceUserRequest = Message<"domain.subscription.v1.DeleteSubscriptionWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data?: SubscriptionWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionWorkspaceUserRequest.
 * Use `create(DeleteSubscriptionWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionWorkspaceUserRequestSchema: GenMessage<DeleteSubscriptionWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionWorkspaceUserResponse
 */
export type DeleteSubscriptionWorkspaceUserResponse = Message<"domain.subscription.v1.DeleteSubscriptionWorkspaceUserResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionWorkspaceUserResponse.
 * Use `create(DeleteSubscriptionWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionWorkspaceUserResponseSchema: GenMessage<DeleteSubscriptionWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionWorkspaceUsersRequest
 */
export type ListSubscriptionWorkspaceUsersRequest = Message<"domain.subscription.v1.ListSubscriptionWorkspaceUsersRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionWorkspaceUsersRequest.
 * Use `create(ListSubscriptionWorkspaceUsersRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionWorkspaceUsersRequestSchema: GenMessage<ListSubscriptionWorkspaceUsersRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionWorkspaceUsersResponse
 */
export type ListSubscriptionWorkspaceUsersResponse = Message<"domain.subscription.v1.ListSubscriptionWorkspaceUsersResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionWorkspaceUser data = 1;
     */
    data: SubscriptionWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionWorkspaceUsersResponse.
 * Use `create(ListSubscriptionWorkspaceUsersResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionWorkspaceUsersResponseSchema: GenMessage<ListSubscriptionWorkspaceUsersResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionWorkspaceUserListPageDataRequest
 */
export type GetSubscriptionWorkspaceUserListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionWorkspaceUserListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionWorkspaceUserListPageDataRequest.
 * Use `create(GetSubscriptionWorkspaceUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionWorkspaceUserListPageDataRequestSchema: GenMessage<GetSubscriptionWorkspaceUserListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionWorkspaceUserListPageDataResponse
 */
export type GetSubscriptionWorkspaceUserListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionWorkspaceUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionWorkspaceUser subscription_workspace_user_list = 1;
     */
    subscriptionWorkspaceUserList: SubscriptionWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.GetSubscriptionWorkspaceUserListPageDataResponse.
 * Use `create(GetSubscriptionWorkspaceUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionWorkspaceUserListPageDataResponseSchema: GenMessage<GetSubscriptionWorkspaceUserListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionWorkspaceUserItemPageDataRequest
 */
export type GetSubscriptionWorkspaceUserItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionWorkspaceUserItemPageDataRequest"> & {
    /**
     * @generated from field: string subscription_workspace_user_id = 1;
     */
    subscriptionWorkspaceUserId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionWorkspaceUserItemPageDataRequest.
 * Use `create(GetSubscriptionWorkspaceUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionWorkspaceUserItemPageDataRequestSchema: GenMessage<GetSubscriptionWorkspaceUserItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionWorkspaceUserItemPageDataResponse
 */
export type GetSubscriptionWorkspaceUserItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionWorkspaceUserItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionWorkspaceUser subscription_workspace_user = 1;
     */
    subscriptionWorkspaceUser?: SubscriptionWorkspaceUser;
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
 * Describes the message domain.subscription.v1.GetSubscriptionWorkspaceUserItemPageDataResponse.
 * Use `create(GetSubscriptionWorkspaceUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionWorkspaceUserItemPageDataResponseSchema: GenMessage<GetSubscriptionWorkspaceUserItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.SubscriptionWorkspaceUserDomainService
 */
export declare const SubscriptionWorkspaceUserDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.CreateSubscriptionWorkspaceUser
     */
    createSubscriptionWorkspaceUser: {
        methodKind: "unary";
        input: typeof CreateSubscriptionWorkspaceUserRequestSchema;
        output: typeof CreateSubscriptionWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.ReadSubscriptionWorkspaceUser
     */
    readSubscriptionWorkspaceUser: {
        methodKind: "unary";
        input: typeof ReadSubscriptionWorkspaceUserRequestSchema;
        output: typeof ReadSubscriptionWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.UpdateSubscriptionWorkspaceUser
     */
    updateSubscriptionWorkspaceUser: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionWorkspaceUserRequestSchema;
        output: typeof UpdateSubscriptionWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.DeleteSubscriptionWorkspaceUser
     */
    deleteSubscriptionWorkspaceUser: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionWorkspaceUserRequestSchema;
        output: typeof DeleteSubscriptionWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.ListSubscriptionWorkspaceUsers
     */
    listSubscriptionWorkspaceUsers: {
        methodKind: "unary";
        input: typeof ListSubscriptionWorkspaceUsersRequestSchema;
        output: typeof ListSubscriptionWorkspaceUsersResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.GetSubscriptionWorkspaceUserListPageData
     */
    getSubscriptionWorkspaceUserListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionWorkspaceUserListPageDataRequestSchema;
        output: typeof GetSubscriptionWorkspaceUserListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.SubscriptionWorkspaceUserDomainService.GetSubscriptionWorkspaceUserItemPageData
     */
    getSubscriptionWorkspaceUserItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionWorkspaceUserItemPageDataRequestSchema;
        output: typeof GetSubscriptionWorkspaceUserItemPageDataResponseSchema;
    };
}>;
