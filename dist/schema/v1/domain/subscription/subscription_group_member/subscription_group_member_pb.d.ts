import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_group_member/subscription_group_member.proto.
 */
export declare const file_domain_subscription_subscription_group_member_subscription_group_member: GenFile;
/**
 * @generated from message domain.subscription.v1.SubscriptionGroupMember
 */
export type SubscriptionGroupMember = Message<"domain.subscription.v1.SubscriptionGroupMember"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string subscription_group_id = 2;
     */
    subscriptionGroupId: string;
    /**
     * @generated from field: string subscription_id = 3;
     */
    subscriptionId: string;
    /**
     * @generated from field: string client_id = 4;
     */
    clientId: string;
    /**
     * @generated from field: optional int64 date_created = 5;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 6;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 7;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 8;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 10;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionGroupMember.
 * Use `create(SubscriptionGroupMemberSchema)` to create a new message.
 */
export declare const SubscriptionGroupMemberSchema: GenMessage<SubscriptionGroupMember>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupMemberRequest
 */
export type CreateSubscriptionGroupMemberRequest = Message<"domain.subscription.v1.CreateSubscriptionGroupMemberRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data?: SubscriptionGroupMember;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupMemberRequest.
 * Use `create(CreateSubscriptionGroupMemberRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupMemberRequestSchema: GenMessage<CreateSubscriptionGroupMemberRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupMemberResponse
 */
export type CreateSubscriptionGroupMemberResponse = Message<"domain.subscription.v1.CreateSubscriptionGroupMemberResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data: SubscriptionGroupMember[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupMemberResponse.
 * Use `create(CreateSubscriptionGroupMemberResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupMemberResponseSchema: GenMessage<CreateSubscriptionGroupMemberResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupMemberRequest
 */
export type ReadSubscriptionGroupMemberRequest = Message<"domain.subscription.v1.ReadSubscriptionGroupMemberRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data?: SubscriptionGroupMember;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupMemberRequest.
 * Use `create(ReadSubscriptionGroupMemberRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupMemberRequestSchema: GenMessage<ReadSubscriptionGroupMemberRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupMemberResponse
 */
export type ReadSubscriptionGroupMemberResponse = Message<"domain.subscription.v1.ReadSubscriptionGroupMemberResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data: SubscriptionGroupMember[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupMemberResponse.
 * Use `create(ReadSubscriptionGroupMemberResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupMemberResponseSchema: GenMessage<ReadSubscriptionGroupMemberResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupMemberRequest
 */
export type UpdateSubscriptionGroupMemberRequest = Message<"domain.subscription.v1.UpdateSubscriptionGroupMemberRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data?: SubscriptionGroupMember;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupMemberRequest.
 * Use `create(UpdateSubscriptionGroupMemberRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupMemberRequestSchema: GenMessage<UpdateSubscriptionGroupMemberRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupMemberResponse
 */
export type UpdateSubscriptionGroupMemberResponse = Message<"domain.subscription.v1.UpdateSubscriptionGroupMemberResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data: SubscriptionGroupMember[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupMemberResponse.
 * Use `create(UpdateSubscriptionGroupMemberResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupMemberResponseSchema: GenMessage<UpdateSubscriptionGroupMemberResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupMemberRequest
 */
export type DeleteSubscriptionGroupMemberRequest = Message<"domain.subscription.v1.DeleteSubscriptionGroupMemberRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data?: SubscriptionGroupMember;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupMemberRequest.
 * Use `create(DeleteSubscriptionGroupMemberRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupMemberRequestSchema: GenMessage<DeleteSubscriptionGroupMemberRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupMemberResponse
 */
export type DeleteSubscriptionGroupMemberResponse = Message<"domain.subscription.v1.DeleteSubscriptionGroupMemberResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupMemberResponse.
 * Use `create(DeleteSubscriptionGroupMemberResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupMemberResponseSchema: GenMessage<DeleteSubscriptionGroupMemberResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupMembersRequest
 */
export type ListSubscriptionGroupMembersRequest = Message<"domain.subscription.v1.ListSubscriptionGroupMembersRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupMembersRequest.
 * Use `create(ListSubscriptionGroupMembersRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupMembersRequestSchema: GenMessage<ListSubscriptionGroupMembersRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupMembersResponse
 */
export type ListSubscriptionGroupMembersResponse = Message<"domain.subscription.v1.ListSubscriptionGroupMembersResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupMember data = 1;
     */
    data: SubscriptionGroupMember[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupMembersResponse.
 * Use `create(ListSubscriptionGroupMembersResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupMembersResponseSchema: GenMessage<ListSubscriptionGroupMembersResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupMemberListPageDataRequest
 */
export type GetSubscriptionGroupMemberListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupMemberListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupMemberListPageDataRequest.
 * Use `create(GetSubscriptionGroupMemberListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupMemberListPageDataRequestSchema: GenMessage<GetSubscriptionGroupMemberListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupMemberListPageDataResponse
 */
export type GetSubscriptionGroupMemberListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupMemberListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupMember subscription_group_member_list = 1;
     */
    subscriptionGroupMemberList: SubscriptionGroupMember[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupMemberListPageDataResponse.
 * Use `create(GetSubscriptionGroupMemberListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupMemberListPageDataResponseSchema: GenMessage<GetSubscriptionGroupMemberListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupMemberItemPageDataRequest
 */
export type GetSubscriptionGroupMemberItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupMemberItemPageDataRequest"> & {
    /**
     * @generated from field: string subscription_group_member_id = 1;
     */
    subscriptionGroupMemberId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupMemberItemPageDataRequest.
 * Use `create(GetSubscriptionGroupMemberItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupMemberItemPageDataRequestSchema: GenMessage<GetSubscriptionGroupMemberItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupMemberItemPageDataResponse
 */
export type GetSubscriptionGroupMemberItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupMemberItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupMember subscription_group_member = 1;
     */
    subscriptionGroupMember?: SubscriptionGroupMember;
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupMemberItemPageDataResponse.
 * Use `create(GetSubscriptionGroupMemberItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupMemberItemPageDataResponseSchema: GenMessage<GetSubscriptionGroupMemberItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.SubscriptionGroupMemberDomainService
 */
export declare const SubscriptionGroupMemberDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.CreateSubscriptionGroupMember
     */
    createSubscriptionGroupMember: {
        methodKind: "unary";
        input: typeof CreateSubscriptionGroupMemberRequestSchema;
        output: typeof CreateSubscriptionGroupMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.ReadSubscriptionGroupMember
     */
    readSubscriptionGroupMember: {
        methodKind: "unary";
        input: typeof ReadSubscriptionGroupMemberRequestSchema;
        output: typeof ReadSubscriptionGroupMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.UpdateSubscriptionGroupMember
     */
    updateSubscriptionGroupMember: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionGroupMemberRequestSchema;
        output: typeof UpdateSubscriptionGroupMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.DeleteSubscriptionGroupMember
     */
    deleteSubscriptionGroupMember: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionGroupMemberRequestSchema;
        output: typeof DeleteSubscriptionGroupMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.ListSubscriptionGroupMembers
     */
    listSubscriptionGroupMembers: {
        methodKind: "unary";
        input: typeof ListSubscriptionGroupMembersRequestSchema;
        output: typeof ListSubscriptionGroupMembersResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.GetSubscriptionGroupMemberListPageData
     */
    getSubscriptionGroupMemberListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupMemberListPageDataRequestSchema;
        output: typeof GetSubscriptionGroupMemberListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupMemberDomainService.GetSubscriptionGroupMemberItemPageData
     */
    getSubscriptionGroupMemberItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupMemberItemPageDataRequestSchema;
        output: typeof GetSubscriptionGroupMemberItemPageDataResponseSchema;
    };
}>;
