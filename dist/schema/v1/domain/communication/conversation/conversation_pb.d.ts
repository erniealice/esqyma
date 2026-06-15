import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/communication/conversation/conversation.proto.
 */
export declare const file_domain_communication_conversation_conversation: GenFile;
/**
 * Conversation is the thread header / ticket aggregate for the communication domain.
 *
 * @generated from message domain.communication.v1.Conversation
 */
export type Conversation = Message<"domain.communication.v1.Conversation"> & {
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
     * ^ DENORMALIZED for the IDOR gate; stamped from session.acting_as_client_id at create; NEVER from form (Q-MSG-5)
     * ^ workspace_id + client_id are the IDOR anchors -> NOT NULL from CREATE TABLE + CHECK(<> '') (directive F)
     *
     * @generated from field: string subject = 9;
     */
    subject: string;
    /**
     * proto ENUM (Q-MSG-6 / directive G — NOT string)
     *
     * @generated from field: domain.communication.v1.ConversationStatus status = 10;
     */
    status: ConversationStatus;
    /**
     * Q-MSG-11
     *
     * @generated from field: optional string assigned_to_user_id = 11;
     */
    assignedToUserId?: string;
    /**
     * "request" | "invoice" | ... ALLOWLIST CHECK (Q-MSG-14)
     *
     * @generated from field: optional string reference_entity_type = 12;
     */
    referenceEntityType?: string;
    /**
     * soft ref v1; hard FK when Plan-1 lands
     *
     * @generated from field: optional string reference_entity_id = 13;
     */
    referenceEntityId?: string;
    /**
     * @generated from field: string created_by_user_id = 14;
     */
    createdByUserId: string;
    /**
     * denorm: drives inbox sort + "2h" timestamps
     *
     * @generated from field: optional int64 last_post_at = 15;
     */
    lastPostAt?: bigint;
    /**
     * nullable; forward-compat for response-SLA (v2)
     *
     * @generated from field: optional int64 sla_due_at = 16;
     */
    slaDueAt?: bigint;
};
/**
 * Describes the message domain.communication.v1.Conversation.
 * Use `create(ConversationSchema)` to create a new message.
 */
export declare const ConversationSchema: GenMessage<Conversation>;
/**
 * @generated from message domain.communication.v1.CreateConversationRequest
 */
export type CreateConversationRequest = Message<"domain.communication.v1.CreateConversationRequest"> & {
    /**
     * @generated from field: domain.communication.v1.Conversation data = 1;
     */
    data?: Conversation;
};
/**
 * Describes the message domain.communication.v1.CreateConversationRequest.
 * Use `create(CreateConversationRequestSchema)` to create a new message.
 */
export declare const CreateConversationRequestSchema: GenMessage<CreateConversationRequest>;
/**
 * @generated from message domain.communication.v1.CreateConversationResponse
 */
export type CreateConversationResponse = Message<"domain.communication.v1.CreateConversationResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.Conversation data = 1;
     */
    data: Conversation[];
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
 * Describes the message domain.communication.v1.CreateConversationResponse.
 * Use `create(CreateConversationResponseSchema)` to create a new message.
 */
export declare const CreateConversationResponseSchema: GenMessage<CreateConversationResponse>;
/**
 * @generated from message domain.communication.v1.ReadConversationRequest
 */
export type ReadConversationRequest = Message<"domain.communication.v1.ReadConversationRequest"> & {
    /**
     * @generated from field: domain.communication.v1.Conversation data = 1;
     */
    data?: Conversation;
};
/**
 * Describes the message domain.communication.v1.ReadConversationRequest.
 * Use `create(ReadConversationRequestSchema)` to create a new message.
 */
export declare const ReadConversationRequestSchema: GenMessage<ReadConversationRequest>;
/**
 * @generated from message domain.communication.v1.ReadConversationResponse
 */
export type ReadConversationResponse = Message<"domain.communication.v1.ReadConversationResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.Conversation data = 1;
     */
    data: Conversation[];
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
 * Describes the message domain.communication.v1.ReadConversationResponse.
 * Use `create(ReadConversationResponseSchema)` to create a new message.
 */
export declare const ReadConversationResponseSchema: GenMessage<ReadConversationResponse>;
/**
 * @generated from message domain.communication.v1.UpdateConversationRequest
 */
export type UpdateConversationRequest = Message<"domain.communication.v1.UpdateConversationRequest"> & {
    /**
     * @generated from field: domain.communication.v1.Conversation data = 1;
     */
    data?: Conversation;
};
/**
 * Describes the message domain.communication.v1.UpdateConversationRequest.
 * Use `create(UpdateConversationRequestSchema)` to create a new message.
 */
export declare const UpdateConversationRequestSchema: GenMessage<UpdateConversationRequest>;
/**
 * @generated from message domain.communication.v1.UpdateConversationResponse
 */
export type UpdateConversationResponse = Message<"domain.communication.v1.UpdateConversationResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.Conversation data = 1;
     */
    data: Conversation[];
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
 * Describes the message domain.communication.v1.UpdateConversationResponse.
 * Use `create(UpdateConversationResponseSchema)` to create a new message.
 */
export declare const UpdateConversationResponseSchema: GenMessage<UpdateConversationResponse>;
/**
 * @generated from message domain.communication.v1.DeleteConversationRequest
 */
export type DeleteConversationRequest = Message<"domain.communication.v1.DeleteConversationRequest"> & {
    /**
     * @generated from field: domain.communication.v1.Conversation data = 1;
     */
    data?: Conversation;
};
/**
 * Describes the message domain.communication.v1.DeleteConversationRequest.
 * Use `create(DeleteConversationRequestSchema)` to create a new message.
 */
export declare const DeleteConversationRequestSchema: GenMessage<DeleteConversationRequest>;
/**
 * @generated from message domain.communication.v1.DeleteConversationResponse
 */
export type DeleteConversationResponse = Message<"domain.communication.v1.DeleteConversationResponse"> & {
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
 * Describes the message domain.communication.v1.DeleteConversationResponse.
 * Use `create(DeleteConversationResponseSchema)` to create a new message.
 */
export declare const DeleteConversationResponseSchema: GenMessage<DeleteConversationResponse>;
/**
 * @generated from message domain.communication.v1.ListConversationsRequest
 */
export type ListConversationsRequest = Message<"domain.communication.v1.ListConversationsRequest"> & {
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
 * Describes the message domain.communication.v1.ListConversationsRequest.
 * Use `create(ListConversationsRequestSchema)` to create a new message.
 */
export declare const ListConversationsRequestSchema: GenMessage<ListConversationsRequest>;
/**
 * @generated from message domain.communication.v1.ListConversationsResponse
 */
export type ListConversationsResponse = Message<"domain.communication.v1.ListConversationsResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.Conversation data = 1;
     */
    data: Conversation[];
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
 * Describes the message domain.communication.v1.ListConversationsResponse.
 * Use `create(ListConversationsResponseSchema)` to create a new message.
 */
export declare const ListConversationsResponseSchema: GenMessage<ListConversationsResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationListPageDataRequest
 */
export type GetConversationListPageDataRequest = Message<"domain.communication.v1.GetConversationListPageDataRequest"> & {
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
 * Describes the message domain.communication.v1.GetConversationListPageDataRequest.
 * Use `create(GetConversationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationListPageDataRequestSchema: GenMessage<GetConversationListPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationListPageDataResponse
 */
export type GetConversationListPageDataResponse = Message<"domain.communication.v1.GetConversationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.Conversation conversation_list = 1;
     */
    conversationList: Conversation[];
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
 * Describes the message domain.communication.v1.GetConversationListPageDataResponse.
 * Use `create(GetConversationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationListPageDataResponseSchema: GenMessage<GetConversationListPageDataResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationItemPageDataRequest
 */
export type GetConversationItemPageDataRequest = Message<"domain.communication.v1.GetConversationItemPageDataRequest"> & {
    /**
     * @generated from field: string conversation_id = 1;
     */
    conversationId: string;
};
/**
 * Describes the message domain.communication.v1.GetConversationItemPageDataRequest.
 * Use `create(GetConversationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationItemPageDataRequestSchema: GenMessage<GetConversationItemPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationItemPageDataResponse
 */
export type GetConversationItemPageDataResponse = Message<"domain.communication.v1.GetConversationItemPageDataResponse"> & {
    /**
     * @generated from field: domain.communication.v1.Conversation conversation = 1;
     */
    conversation?: Conversation;
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
 * Describes the message domain.communication.v1.GetConversationItemPageDataResponse.
 * Use `create(GetConversationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationItemPageDataResponseSchema: GenMessage<GetConversationItemPageDataResponse>;
/**
 * ConversationStatus represents the lifecycle state of a conversation / ticket.
 * Re-openable: CLOSED -> OPEN allowed (Q-MSG-6). The DB pins this domain via a
 * CHECK constraint (status IN ('open','in_progress','resolved','closed')).
 *
 * @generated from enum domain.communication.v1.ConversationStatus
 */
export declare enum ConversationStatus {
    /**
     * @generated from enum value: CONVERSATION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CONVERSATION_STATUS_OPEN = 1;
     */
    OPEN = 1,
    /**
     * @generated from enum value: CONVERSATION_STATUS_IN_PROGRESS = 2;
     */
    IN_PROGRESS = 2,
    /**
     * @generated from enum value: CONVERSATION_STATUS_RESOLVED = 3;
     */
    RESOLVED = 3,
    /**
     * re-openable: CLOSED -> OPEN allowed (Q-MSG-6)
     *
     * @generated from enum value: CONVERSATION_STATUS_CLOSED = 4;
     */
    CLOSED = 4
}
/**
 * Describes the enum domain.communication.v1.ConversationStatus.
 */
export declare const ConversationStatusSchema: GenEnum<ConversationStatus>;
/**
 * @generated from service domain.communication.v1.ConversationDomainService
 */
export declare const ConversationDomainService: GenService<{
    /**
     * @generated from rpc domain.communication.v1.ConversationDomainService.CreateConversation
     */
    createConversation: {
        methodKind: "unary";
        input: typeof CreateConversationRequestSchema;
        output: typeof CreateConversationResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationDomainService.ReadConversation
     */
    readConversation: {
        methodKind: "unary";
        input: typeof ReadConversationRequestSchema;
        output: typeof ReadConversationResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationDomainService.UpdateConversation
     */
    updateConversation: {
        methodKind: "unary";
        input: typeof UpdateConversationRequestSchema;
        output: typeof UpdateConversationResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationDomainService.DeleteConversation
     */
    deleteConversation: {
        methodKind: "unary";
        input: typeof DeleteConversationRequestSchema;
        output: typeof DeleteConversationResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationDomainService.ListConversations
     */
    listConversations: {
        methodKind: "unary";
        input: typeof ListConversationsRequestSchema;
        output: typeof ListConversationsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.communication.v1.ConversationDomainService.GetConversationListPageData
     */
    getConversationListPageData: {
        methodKind: "unary";
        input: typeof GetConversationListPageDataRequestSchema;
        output: typeof GetConversationListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related thread data
     *
     * @generated from rpc domain.communication.v1.ConversationDomainService.GetConversationItemPageData
     */
    getConversationItemPageData: {
        methodKind: "unary";
        input: typeof GetConversationItemPageDataRequestSchema;
        output: typeof GetConversationItemPageDataResponseSchema;
    };
}>;
