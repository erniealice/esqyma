import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/price_schedule_workspace_user/price_schedule_workspace_user.proto.
 */
export declare const file_domain_subscription_price_schedule_workspace_user_price_schedule_workspace_user: GenFile;
/**
 * PriceScheduleWorkspaceUser pins an operator (workspace_user) at a
 * price_schedule (period) node for period-level servicing/visibility. It is the
 * 5th member of the *_workspace_user access family (alongside
 * client_workspace_user, subscription_workspace_user,
 * subscription_group_workspace_user, line_workspace_user). Exact mirror of
 * subscription_group_workspace_user with the parent FK = price_schedule_id
 * instead of subscription_group_id.
 *
 * @generated from message domain.subscription.v1.PriceScheduleWorkspaceUser
 */
export type PriceScheduleWorkspaceUser = Message<"domain.subscription.v1.PriceScheduleWorkspaceUser"> & {
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
     * @generated from field: string price_schedule_id = 8;
     */
    priceScheduleId: string;
    /**
     * @generated from field: string workspace_user_id = 9;
     */
    workspaceUserId: string;
    /**
     * field reusing these names would silently absorb stale column values.
     *
     * unchanged — do NOT renumber
     *
     * @generated from field: bool is_owner = 12;
     */
    isOwner: boolean;
    /**
     * Generic servicing-capacity axis (replaces the removed discriminator's info content). NOT a vertical title.
     *   'primary' = servicer / lead-eligible;  'access' = view-only member.
     * Vertical titles render from lyngua on (node type, capacity, is_owner).
     *
     * @generated from field: string capacity = 13;
     */
    capacity: string;
};
/**
 * Describes the message domain.subscription.v1.PriceScheduleWorkspaceUser.
 * Use `create(PriceScheduleWorkspaceUserSchema)` to create a new message.
 */
export declare const PriceScheduleWorkspaceUserSchema: GenMessage<PriceScheduleWorkspaceUser>;
/**
 * @generated from message domain.subscription.v1.CreatePriceScheduleWorkspaceUserRequest
 */
export type CreatePriceScheduleWorkspaceUserRequest = Message<"domain.subscription.v1.CreatePriceScheduleWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data?: PriceScheduleWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.CreatePriceScheduleWorkspaceUserRequest.
 * Use `create(CreatePriceScheduleWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const CreatePriceScheduleWorkspaceUserRequestSchema: GenMessage<CreatePriceScheduleWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePriceScheduleWorkspaceUserResponse
 */
export type CreatePriceScheduleWorkspaceUserResponse = Message<"domain.subscription.v1.CreatePriceScheduleWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data: PriceScheduleWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.CreatePriceScheduleWorkspaceUserResponse.
 * Use `create(CreatePriceScheduleWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const CreatePriceScheduleWorkspaceUserResponseSchema: GenMessage<CreatePriceScheduleWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPriceScheduleWorkspaceUserRequest
 */
export type ReadPriceScheduleWorkspaceUserRequest = Message<"domain.subscription.v1.ReadPriceScheduleWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data?: PriceScheduleWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.ReadPriceScheduleWorkspaceUserRequest.
 * Use `create(ReadPriceScheduleWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const ReadPriceScheduleWorkspaceUserRequestSchema: GenMessage<ReadPriceScheduleWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPriceScheduleWorkspaceUserResponse
 */
export type ReadPriceScheduleWorkspaceUserResponse = Message<"domain.subscription.v1.ReadPriceScheduleWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data: PriceScheduleWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.ReadPriceScheduleWorkspaceUserResponse.
 * Use `create(ReadPriceScheduleWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const ReadPriceScheduleWorkspaceUserResponseSchema: GenMessage<ReadPriceScheduleWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePriceScheduleWorkspaceUserRequest
 */
export type UpdatePriceScheduleWorkspaceUserRequest = Message<"domain.subscription.v1.UpdatePriceScheduleWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data?: PriceScheduleWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.UpdatePriceScheduleWorkspaceUserRequest.
 * Use `create(UpdatePriceScheduleWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const UpdatePriceScheduleWorkspaceUserRequestSchema: GenMessage<UpdatePriceScheduleWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePriceScheduleWorkspaceUserResponse
 */
export type UpdatePriceScheduleWorkspaceUserResponse = Message<"domain.subscription.v1.UpdatePriceScheduleWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data: PriceScheduleWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.UpdatePriceScheduleWorkspaceUserResponse.
 * Use `create(UpdatePriceScheduleWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const UpdatePriceScheduleWorkspaceUserResponseSchema: GenMessage<UpdatePriceScheduleWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePriceScheduleWorkspaceUserRequest
 */
export type DeletePriceScheduleWorkspaceUserRequest = Message<"domain.subscription.v1.DeletePriceScheduleWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data?: PriceScheduleWorkspaceUser;
};
/**
 * Describes the message domain.subscription.v1.DeletePriceScheduleWorkspaceUserRequest.
 * Use `create(DeletePriceScheduleWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const DeletePriceScheduleWorkspaceUserRequestSchema: GenMessage<DeletePriceScheduleWorkspaceUserRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePriceScheduleWorkspaceUserResponse
 */
export type DeletePriceScheduleWorkspaceUserResponse = Message<"domain.subscription.v1.DeletePriceScheduleWorkspaceUserResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePriceScheduleWorkspaceUserResponse.
 * Use `create(DeletePriceScheduleWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const DeletePriceScheduleWorkspaceUserResponseSchema: GenMessage<DeletePriceScheduleWorkspaceUserResponse>;
/**
 * @generated from message domain.subscription.v1.ListPriceScheduleWorkspaceUsersRequest
 */
export type ListPriceScheduleWorkspaceUsersRequest = Message<"domain.subscription.v1.ListPriceScheduleWorkspaceUsersRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPriceScheduleWorkspaceUsersRequest.
 * Use `create(ListPriceScheduleWorkspaceUsersRequestSchema)` to create a new message.
 */
export declare const ListPriceScheduleWorkspaceUsersRequestSchema: GenMessage<ListPriceScheduleWorkspaceUsersRequest>;
/**
 * @generated from message domain.subscription.v1.ListPriceScheduleWorkspaceUsersResponse
 */
export type ListPriceScheduleWorkspaceUsersResponse = Message<"domain.subscription.v1.ListPriceScheduleWorkspaceUsersResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceScheduleWorkspaceUser data = 1;
     */
    data: PriceScheduleWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.ListPriceScheduleWorkspaceUsersResponse.
 * Use `create(ListPriceScheduleWorkspaceUsersResponseSchema)` to create a new message.
 */
export declare const ListPriceScheduleWorkspaceUsersResponseSchema: GenMessage<ListPriceScheduleWorkspaceUsersResponse>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleWorkspaceUserListPageDataRequest
 */
export type GetPriceScheduleWorkspaceUserListPageDataRequest = Message<"domain.subscription.v1.GetPriceScheduleWorkspaceUserListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetPriceScheduleWorkspaceUserListPageDataRequest.
 * Use `create(GetPriceScheduleWorkspaceUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceScheduleWorkspaceUserListPageDataRequestSchema: GenMessage<GetPriceScheduleWorkspaceUserListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleWorkspaceUserListPageDataResponse
 */
export type GetPriceScheduleWorkspaceUserListPageDataResponse = Message<"domain.subscription.v1.GetPriceScheduleWorkspaceUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceScheduleWorkspaceUser price_schedule_workspace_user_list = 1;
     */
    priceScheduleWorkspaceUserList: PriceScheduleWorkspaceUser[];
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
 * Describes the message domain.subscription.v1.GetPriceScheduleWorkspaceUserListPageDataResponse.
 * Use `create(GetPriceScheduleWorkspaceUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceScheduleWorkspaceUserListPageDataResponseSchema: GenMessage<GetPriceScheduleWorkspaceUserListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleWorkspaceUserItemPageDataRequest
 */
export type GetPriceScheduleWorkspaceUserItemPageDataRequest = Message<"domain.subscription.v1.GetPriceScheduleWorkspaceUserItemPageDataRequest"> & {
    /**
     * @generated from field: string price_schedule_workspace_user_id = 1;
     */
    priceScheduleWorkspaceUserId: string;
};
/**
 * Describes the message domain.subscription.v1.GetPriceScheduleWorkspaceUserItemPageDataRequest.
 * Use `create(GetPriceScheduleWorkspaceUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceScheduleWorkspaceUserItemPageDataRequestSchema: GenMessage<GetPriceScheduleWorkspaceUserItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleWorkspaceUserItemPageDataResponse
 */
export type GetPriceScheduleWorkspaceUserItemPageDataResponse = Message<"domain.subscription.v1.GetPriceScheduleWorkspaceUserItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceScheduleWorkspaceUser price_schedule_workspace_user = 1;
     */
    priceScheduleWorkspaceUser?: PriceScheduleWorkspaceUser;
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
 * Describes the message domain.subscription.v1.GetPriceScheduleWorkspaceUserItemPageDataResponse.
 * Use `create(GetPriceScheduleWorkspaceUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceScheduleWorkspaceUserItemPageDataResponseSchema: GenMessage<GetPriceScheduleWorkspaceUserItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.PriceScheduleWorkspaceUserDomainService
 */
export declare const PriceScheduleWorkspaceUserDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.CreatePriceScheduleWorkspaceUser
     */
    createPriceScheduleWorkspaceUser: {
        methodKind: "unary";
        input: typeof CreatePriceScheduleWorkspaceUserRequestSchema;
        output: typeof CreatePriceScheduleWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.ReadPriceScheduleWorkspaceUser
     */
    readPriceScheduleWorkspaceUser: {
        methodKind: "unary";
        input: typeof ReadPriceScheduleWorkspaceUserRequestSchema;
        output: typeof ReadPriceScheduleWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.UpdatePriceScheduleWorkspaceUser
     */
    updatePriceScheduleWorkspaceUser: {
        methodKind: "unary";
        input: typeof UpdatePriceScheduleWorkspaceUserRequestSchema;
        output: typeof UpdatePriceScheduleWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.DeletePriceScheduleWorkspaceUser
     */
    deletePriceScheduleWorkspaceUser: {
        methodKind: "unary";
        input: typeof DeletePriceScheduleWorkspaceUserRequestSchema;
        output: typeof DeletePriceScheduleWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.ListPriceScheduleWorkspaceUsers
     */
    listPriceScheduleWorkspaceUsers: {
        methodKind: "unary";
        input: typeof ListPriceScheduleWorkspaceUsersRequestSchema;
        output: typeof ListPriceScheduleWorkspaceUsersResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.GetPriceScheduleWorkspaceUserListPageData
     */
    getPriceScheduleWorkspaceUserListPageData: {
        methodKind: "unary";
        input: typeof GetPriceScheduleWorkspaceUserListPageDataRequestSchema;
        output: typeof GetPriceScheduleWorkspaceUserListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleWorkspaceUserDomainService.GetPriceScheduleWorkspaceUserItemPageData
     */
    getPriceScheduleWorkspaceUserItemPageData: {
        methodKind: "unary";
        input: typeof GetPriceScheduleWorkspaceUserItemPageDataRequestSchema;
        output: typeof GetPriceScheduleWorkspaceUserItemPageDataResponseSchema;
    };
}>;
