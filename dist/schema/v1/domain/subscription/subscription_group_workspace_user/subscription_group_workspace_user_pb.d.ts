import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_group_workspace_user/subscription_group_workspace_user.proto.
 */
export declare const file_domain_subscription_subscription_group_workspace_user_subscription_group_workspace_user: GenFile;
/**
 * SubscriptionGroupWorkspaceUser pins an operator (workspace_user) at a
 * subscription_group (cohort) node for group-level servicing/visibility
 * (coordinator @ cohort, adviser @ cohort). Shape mirrors line_workspace_user
 * (workspace_id + is_owner); the parent FK is subscription_group_id instead of
 * line_id, plus the two servicing discriminators (scope, role) the
 * people-hierarchy model specified.
 *
 * @generated from message domain.subscription.v1.SubscriptionGroupWorkspaceUser
 */
export type SubscriptionGroupWorkspaceUser = Message<"domain.subscription.v1.SubscriptionGroupWorkspaceUser"> & {
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
     * @generated from field: string subscription_group_id = 8;
     */
    subscriptionGroupId: string;
    /**
     * @generated from field: string workspace_user_id = 9;
     */
    workspaceUserId: string;
    /**
     * @generated from field: string scope = 10;
     */
    scope: string;
    /**
     * @generated from field: string role = 11;
     */
    role: string;
    /**
     * @generated from field: bool is_owner = 12;
     */
    isOwner: boolean;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionGroupWorkspaceUser.
 * Use `create(SubscriptionGroupWorkspaceUserSchema)` to create a new message.
 */
export declare const SubscriptionGroupWorkspaceUserSchema: GenMessage<SubscriptionGroupWorkspaceUser>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupWorkspaceUserRequest
 */
export type CreateSubscriptionGroupWorkspaceUserRequest = Message<"domain.subscription.v1.CreateSubscriptionGroupWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data?: SubscriptionGroupWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupWorkspaceUserRequest.
 * Use `create(CreateSubscriptionGroupWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupWorkspaceUserRequestSchema: GenMessage<CreateSubscriptionGroupWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupWorkspaceUserResponse
 */
export type CreateSubscriptionGroupWorkspaceUserResponse = Message<"domain.subscription.v1.CreateSubscriptionGroupWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data: SubscriptionGroupWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupWorkspaceUserResponse.
 * Use `create(CreateSubscriptionGroupWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupWorkspaceUserResponseSchema: GenMessage<CreateSubscriptionGroupWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupWorkspaceUserRequest
 */
export type ReadSubscriptionGroupWorkspaceUserRequest = Message<"domain.subscription.v1.ReadSubscriptionGroupWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data?: SubscriptionGroupWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupWorkspaceUserRequest.
 * Use `create(ReadSubscriptionGroupWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupWorkspaceUserRequestSchema: GenMessage<ReadSubscriptionGroupWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupWorkspaceUserResponse
 */
export type ReadSubscriptionGroupWorkspaceUserResponse = Message<"domain.subscription.v1.ReadSubscriptionGroupWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data: SubscriptionGroupWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupWorkspaceUserResponse.
 * Use `create(ReadSubscriptionGroupWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupWorkspaceUserResponseSchema: GenMessage<ReadSubscriptionGroupWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupWorkspaceUserRequest
 */
export type UpdateSubscriptionGroupWorkspaceUserRequest = Message<"domain.subscription.v1.UpdateSubscriptionGroupWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data?: SubscriptionGroupWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupWorkspaceUserRequest.
 * Use `create(UpdateSubscriptionGroupWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupWorkspaceUserRequestSchema: GenMessage<UpdateSubscriptionGroupWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupWorkspaceUserResponse
 */
export type UpdateSubscriptionGroupWorkspaceUserResponse = Message<"domain.subscription.v1.UpdateSubscriptionGroupWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data: SubscriptionGroupWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupWorkspaceUserResponse.
 * Use `create(UpdateSubscriptionGroupWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupWorkspaceUserResponseSchema: GenMessage<UpdateSubscriptionGroupWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupWorkspaceUserRequest
 */
export type DeleteSubscriptionGroupWorkspaceUserRequest = Message<"domain.subscription.v1.DeleteSubscriptionGroupWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data?: SubscriptionGroupWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupWorkspaceUserRequest.
 * Use `create(DeleteSubscriptionGroupWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupWorkspaceUserRequestSchema: GenMessage<DeleteSubscriptionGroupWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupWorkspaceUserResponse
 */
export type DeleteSubscriptionGroupWorkspaceUserResponse = Message<"domain.subscription.v1.DeleteSubscriptionGroupWorkspaceUserResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupWorkspaceUserResponse.
 * Use `create(DeleteSubscriptionGroupWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupWorkspaceUserResponseSchema: GenMessage<DeleteSubscriptionGroupWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupWorkspaceUsersRequest
 */
export type ListSubscriptionGroupWorkspaceUsersRequest = Message<"domain.subscription.v1.ListSubscriptionGroupWorkspaceUsersRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupWorkspaceUsersRequest.
 * Use `create(ListSubscriptionGroupWorkspaceUsersRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupWorkspaceUsersRequestSchema: GenMessage<ListSubscriptionGroupWorkspaceUsersRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupWorkspaceUsersResponse
 */
export type ListSubscriptionGroupWorkspaceUsersResponse = Message<"domain.subscription.v1.ListSubscriptionGroupWorkspaceUsersResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupWorkspaceUser data = 1;
     */
    data: SubscriptionGroupWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupWorkspaceUsersResponse.
 * Use `create(ListSubscriptionGroupWorkspaceUsersResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupWorkspaceUsersResponseSchema: GenMessage<ListSubscriptionGroupWorkspaceUsersResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserListPageDataRequest
 */
export type GetSubscriptionGroupWorkspaceUserListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupWorkspaceUserListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserListPageDataRequest.
 * Use `create(GetSubscriptionGroupWorkspaceUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupWorkspaceUserListPageDataRequestSchema: GenMessage<GetSubscriptionGroupWorkspaceUserListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserListPageDataResponse
 */
export type GetSubscriptionGroupWorkspaceUserListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupWorkspaceUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupWorkspaceUser subscription_group_workspace_user_list = 1;
     */
    subscriptionGroupWorkspaceUserList: SubscriptionGroupWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserListPageDataResponse.
 * Use `create(GetSubscriptionGroupWorkspaceUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupWorkspaceUserListPageDataResponseSchema: GenMessage<GetSubscriptionGroupWorkspaceUserListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserItemPageDataRequest
 */
export type GetSubscriptionGroupWorkspaceUserItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupWorkspaceUserItemPageDataRequest"> & {
    /**
     * @generated from field: string subscription_group_workspace_user_id = 1;
     */
    subscriptionGroupWorkspaceUserId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserItemPageDataRequest.
 * Use `create(GetSubscriptionGroupWorkspaceUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupWorkspaceUserItemPageDataRequestSchema: GenMessage<GetSubscriptionGroupWorkspaceUserItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserItemPageDataResponse
 */
export type GetSubscriptionGroupWorkspaceUserItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupWorkspaceUserItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupWorkspaceUser subscription_group_workspace_user = 1;
     */
    subscriptionGroupWorkspaceUser?: SubscriptionGroupWorkspaceUser;
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupWorkspaceUserItemPageDataResponse.
 * Use `create(GetSubscriptionGroupWorkspaceUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupWorkspaceUserItemPageDataResponseSchema: GenMessage<GetSubscriptionGroupWorkspaceUserItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService
 */
export declare const SubscriptionGroupWorkspaceUserDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.CreateSubscriptionGroupWorkspaceUser
     */
    createSubscriptionGroupWorkspaceUser: {
        methodKind: "unary";
        input: typeof CreateSubscriptionGroupWorkspaceUserRequestSchema;
        output: typeof CreateSubscriptionGroupWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.ReadSubscriptionGroupWorkspaceUser
     */
    readSubscriptionGroupWorkspaceUser: {
        methodKind: "unary";
        input: typeof ReadSubscriptionGroupWorkspaceUserRequestSchema;
        output: typeof ReadSubscriptionGroupWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.UpdateSubscriptionGroupWorkspaceUser
     */
    updateSubscriptionGroupWorkspaceUser: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionGroupWorkspaceUserRequestSchema;
        output: typeof UpdateSubscriptionGroupWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.DeleteSubscriptionGroupWorkspaceUser
     */
    deleteSubscriptionGroupWorkspaceUser: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionGroupWorkspaceUserRequestSchema;
        output: typeof DeleteSubscriptionGroupWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.ListSubscriptionGroupWorkspaceUsers
     */
    listSubscriptionGroupWorkspaceUsers: {
        methodKind: "unary";
        input: typeof ListSubscriptionGroupWorkspaceUsersRequestSchema;
        output: typeof ListSubscriptionGroupWorkspaceUsersResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.GetSubscriptionGroupWorkspaceUserListPageData
     */
    getSubscriptionGroupWorkspaceUserListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupWorkspaceUserListPageDataRequestSchema;
        output: typeof GetSubscriptionGroupWorkspaceUserListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.SubscriptionGroupWorkspaceUserDomainService.GetSubscriptionGroupWorkspaceUserItemPageData
     */
    getSubscriptionGroupWorkspaceUserItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupWorkspaceUserItemPageDataRequestSchema;
        output: typeof GetSubscriptionGroupWorkspaceUserItemPageDataResponseSchema;
    };
}>;
