import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/communication/conversation_post/conversation_post.proto.
 */
export declare const file_domain_communication_conversation_post_conversation_post: GenFile;
/**
 * ConversationPost is the thread child (NEVER "Message" — protobuf reserved word).
 *
 * @generated from message domain.communication.v1.ConversationPost
 */
export type ConversationPost = Message<"domain.communication.v1.ConversationPost"> & {
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
     * @generated from field: string conversation_id = 7;
     */
    conversationId: string;
    /**
     * denorm — copied from parent at create (directive H); workspace-scoped post queries w/o join
     *
     * @generated from field: string workspace_id = 8;
     */
    workspaceId: string;
    /**
     * denorm from parent — IDOR belt-and-suspenders
     *
     * @generated from field: string client_id = 9;
     */
    clientId: string;
    /**
     * proto ENUM (Q-MSG-13 / directive G — NOT string)
     *
     * @generated from field: domain.communication.v1.SenderPrincipalType sender_principal_type = 10;
     */
    senderPrincipalType: SenderPrincipalType;
    /**
     * principal/grant binding id (Q-MSG-13 / codex H1 — beyond user_id)
     *
     * @generated from field: string sender_principal_id = 11;
     */
    senderPrincipalId: string;
    /**
     * @generated from field: string sender_user_id = 12;
     */
    senderUserId: string;
    /**
     * post text — rendered TEXT-ONLY, NEVER template.HTML/safeHTML (XSS invariant; redteam N)
     *
     * @generated from field: string body = 13;
     */
    body: string;
    /**
     * proto ENUM (Q-MSG-10 / directive G — NOT string): PORTAL (v1) | EMAIL (v2 seam)
     *
     * @generated from field: domain.communication.v1.ConversationSourceType source_type = 14;
     */
    sourceType: ConversationSourceType;
    /**
     * idempotency key (Q-MSG-7); REQUIRED non-empty for portal/composer posts
     *
     * @generated from field: optional string client_token = 15;
     */
    clientToken?: string;
    /**
     * Attachments via document.Attachment: module_key="conversation_post", foreign_key=<this.id> (Q-MSG-4)
     *
     * @generated from field: optional int64 sent_at = 16;
     */
    sentAt?: bigint;
};
/**
 * Describes the message domain.communication.v1.ConversationPost.
 * Use `create(ConversationPostSchema)` to create a new message.
 */
export declare const ConversationPostSchema: GenMessage<ConversationPost>;
/**
 * @generated from message domain.communication.v1.CreateConversationPostRequest
 */
export type CreateConversationPostRequest = Message<"domain.communication.v1.CreateConversationPostRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationPost data = 1;
     */
    data?: ConversationPost;
};
/**
 * Describes the message domain.communication.v1.CreateConversationPostRequest.
 * Use `create(CreateConversationPostRequestSchema)` to create a new message.
 */
export declare const CreateConversationPostRequestSchema: GenMessage<CreateConversationPostRequest>;
/**
 * @generated from message domain.communication.v1.CreateConversationPostResponse
 */
export type CreateConversationPostResponse = Message<"domain.communication.v1.CreateConversationPostResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationPost data = 1;
     */
    data: ConversationPost[];
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
 * Describes the message domain.communication.v1.CreateConversationPostResponse.
 * Use `create(CreateConversationPostResponseSchema)` to create a new message.
 */
export declare const CreateConversationPostResponseSchema: GenMessage<CreateConversationPostResponse>;
/**
 * @generated from message domain.communication.v1.ReadConversationPostRequest
 */
export type ReadConversationPostRequest = Message<"domain.communication.v1.ReadConversationPostRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationPost data = 1;
     */
    data?: ConversationPost;
};
/**
 * Describes the message domain.communication.v1.ReadConversationPostRequest.
 * Use `create(ReadConversationPostRequestSchema)` to create a new message.
 */
export declare const ReadConversationPostRequestSchema: GenMessage<ReadConversationPostRequest>;
/**
 * @generated from message domain.communication.v1.ReadConversationPostResponse
 */
export type ReadConversationPostResponse = Message<"domain.communication.v1.ReadConversationPostResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationPost data = 1;
     */
    data: ConversationPost[];
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
 * Describes the message domain.communication.v1.ReadConversationPostResponse.
 * Use `create(ReadConversationPostResponseSchema)` to create a new message.
 */
export declare const ReadConversationPostResponseSchema: GenMessage<ReadConversationPostResponse>;
/**
 * @generated from message domain.communication.v1.UpdateConversationPostRequest
 */
export type UpdateConversationPostRequest = Message<"domain.communication.v1.UpdateConversationPostRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationPost data = 1;
     */
    data?: ConversationPost;
};
/**
 * Describes the message domain.communication.v1.UpdateConversationPostRequest.
 * Use `create(UpdateConversationPostRequestSchema)` to create a new message.
 */
export declare const UpdateConversationPostRequestSchema: GenMessage<UpdateConversationPostRequest>;
/**
 * @generated from message domain.communication.v1.UpdateConversationPostResponse
 */
export type UpdateConversationPostResponse = Message<"domain.communication.v1.UpdateConversationPostResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationPost data = 1;
     */
    data: ConversationPost[];
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
 * Describes the message domain.communication.v1.UpdateConversationPostResponse.
 * Use `create(UpdateConversationPostResponseSchema)` to create a new message.
 */
export declare const UpdateConversationPostResponseSchema: GenMessage<UpdateConversationPostResponse>;
/**
 * @generated from message domain.communication.v1.DeleteConversationPostRequest
 */
export type DeleteConversationPostRequest = Message<"domain.communication.v1.DeleteConversationPostRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationPost data = 1;
     */
    data?: ConversationPost;
};
/**
 * Describes the message domain.communication.v1.DeleteConversationPostRequest.
 * Use `create(DeleteConversationPostRequestSchema)` to create a new message.
 */
export declare const DeleteConversationPostRequestSchema: GenMessage<DeleteConversationPostRequest>;
/**
 * @generated from message domain.communication.v1.DeleteConversationPostResponse
 */
export type DeleteConversationPostResponse = Message<"domain.communication.v1.DeleteConversationPostResponse"> & {
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
 * Describes the message domain.communication.v1.DeleteConversationPostResponse.
 * Use `create(DeleteConversationPostResponseSchema)` to create a new message.
 */
export declare const DeleteConversationPostResponseSchema: GenMessage<DeleteConversationPostResponse>;
/**
 * @generated from message domain.communication.v1.ListConversationPostsRequest
 */
export type ListConversationPostsRequest = Message<"domain.communication.v1.ListConversationPostsRequest"> & {
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
 * Describes the message domain.communication.v1.ListConversationPostsRequest.
 * Use `create(ListConversationPostsRequestSchema)` to create a new message.
 */
export declare const ListConversationPostsRequestSchema: GenMessage<ListConversationPostsRequest>;
/**
 * @generated from message domain.communication.v1.ListConversationPostsResponse
 */
export type ListConversationPostsResponse = Message<"domain.communication.v1.ListConversationPostsResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationPost data = 1;
     */
    data: ConversationPost[];
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
 * Describes the message domain.communication.v1.ListConversationPostsResponse.
 * Use `create(ListConversationPostsResponseSchema)` to create a new message.
 */
export declare const ListConversationPostsResponseSchema: GenMessage<ListConversationPostsResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationPostListPageDataRequest
 */
export type GetConversationPostListPageDataRequest = Message<"domain.communication.v1.GetConversationPostListPageDataRequest"> & {
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
 * Describes the message domain.communication.v1.GetConversationPostListPageDataRequest.
 * Use `create(GetConversationPostListPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationPostListPageDataRequestSchema: GenMessage<GetConversationPostListPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationPostListPageDataResponse
 */
export type GetConversationPostListPageDataResponse = Message<"domain.communication.v1.GetConversationPostListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationPost conversation_post_list = 1;
     */
    conversationPostList: ConversationPost[];
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
 * Describes the message domain.communication.v1.GetConversationPostListPageDataResponse.
 * Use `create(GetConversationPostListPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationPostListPageDataResponseSchema: GenMessage<GetConversationPostListPageDataResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationPostItemPageDataRequest
 */
export type GetConversationPostItemPageDataRequest = Message<"domain.communication.v1.GetConversationPostItemPageDataRequest"> & {
    /**
     * @generated from field: string conversation_post_id = 1;
     */
    conversationPostId: string;
};
/**
 * Describes the message domain.communication.v1.GetConversationPostItemPageDataRequest.
 * Use `create(GetConversationPostItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationPostItemPageDataRequestSchema: GenMessage<GetConversationPostItemPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationPostItemPageDataResponse
 */
export type GetConversationPostItemPageDataResponse = Message<"domain.communication.v1.GetConversationPostItemPageDataResponse"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationPost conversation_post = 1;
     */
    conversationPost?: ConversationPost;
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
 * Describes the message domain.communication.v1.GetConversationPostItemPageDataResponse.
 * Use `create(GetConversationPostItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationPostItemPageDataResponseSchema: GenMessage<GetConversationPostItemPageDataResponse>;
/**
 * SenderPrincipalType identifies the principal class that authored a post
 * (proto ENUM — Q-MSG-13 / directive G — NOT string). DB pins via
 * CHECK (sender_principal_type IN ('client','staff')).
 *
 * @generated from enum domain.communication.v1.SenderPrincipalType
 */
export declare enum SenderPrincipalType {
    /**
     * @generated from enum value: SENDER_PRINCIPAL_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SENDER_PRINCIPAL_TYPE_CLIENT = 1;
     */
    CLIENT = 1,
    /**
     * @generated from enum value: SENDER_PRINCIPAL_TYPE_STAFF = 2;
     */
    STAFF = 2
}
/**
 * Describes the enum domain.communication.v1.SenderPrincipalType.
 */
export declare const SenderPrincipalTypeSchema: GenEnum<SenderPrincipalType>;
/**
 * ConversationSourceType identifies the ingress channel of a post
 * (proto ENUM — Q-MSG-10 / directive G — NOT string). DB pins via
 * CHECK (source_type IN ('portal','email')).
 *
 * @generated from enum domain.communication.v1.ConversationSourceType
 */
export declare enum ConversationSourceType {
    /**
     * @generated from enum value: CONVERSATION_SOURCE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * v1
     *
     * @generated from enum value: CONVERSATION_SOURCE_TYPE_PORTAL = 1;
     */
    PORTAL = 1,
    /**
     * v2 seam — inbound email reply (Q-MSG-10)
     *
     * @generated from enum value: CONVERSATION_SOURCE_TYPE_EMAIL = 2;
     */
    EMAIL = 2
}
/**
 * Describes the enum domain.communication.v1.ConversationSourceType.
 */
export declare const ConversationSourceTypeSchema: GenEnum<ConversationSourceType>;
/**
 * @generated from service domain.communication.v1.ConversationPostDomainService
 */
export declare const ConversationPostDomainService: GenService<{
    /**
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.CreateConversationPost
     */
    createConversationPost: {
        methodKind: "unary";
        input: typeof CreateConversationPostRequestSchema;
        output: typeof CreateConversationPostResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.ReadConversationPost
     */
    readConversationPost: {
        methodKind: "unary";
        input: typeof ReadConversationPostRequestSchema;
        output: typeof ReadConversationPostResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.UpdateConversationPost
     */
    updateConversationPost: {
        methodKind: "unary";
        input: typeof UpdateConversationPostRequestSchema;
        output: typeof UpdateConversationPostResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.DeleteConversationPost
     */
    deleteConversationPost: {
        methodKind: "unary";
        input: typeof DeleteConversationPostRequestSchema;
        output: typeof DeleteConversationPostResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.ListConversationPosts
     */
    listConversationPosts: {
        methodKind: "unary";
        input: typeof ListConversationPostsRequestSchema;
        output: typeof ListConversationPostsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.GetConversationPostListPageData
     */
    getConversationPostListPageData: {
        methodKind: "unary";
        input: typeof GetConversationPostListPageDataRequestSchema;
        output: typeof GetConversationPostListPageDataResponseSchema;
    };
    /**
     * Enhanced item view
     *
     * @generated from rpc domain.communication.v1.ConversationPostDomainService.GetConversationPostItemPageData
     */
    getConversationPostItemPageData: {
        methodKind: "unary";
        input: typeof GetConversationPostItemPageDataRequestSchema;
        output: typeof GetConversationPostItemPageDataResponseSchema;
    };
}>;
