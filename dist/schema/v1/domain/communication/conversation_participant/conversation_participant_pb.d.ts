import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/communication/conversation_participant/conversation_participant.proto.
 */
export declare const file_domain_communication_conversation_participant_conversation_participant: GenFile;
/**
 * ConversationParticipant is the v2 seam (table shipped v1, queried v2) for team inboxes.
 *
 * @generated from message domain.communication.v1.ConversationParticipant
 */
export type ConversationParticipant = Message<"domain.communication.v1.ConversationParticipant"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string conversation_id = 7;
     */
    conversationId: string;
    /**
     * directive H — copied from parent at create
     *
     * @generated from field: string workspace_id = 8;
     */
    workspaceId: string;
    /**
     * NULL for a pure team label
     *
     * @generated from field: optional string user_id = 9;
     */
    userId?: string;
    /**
     * principal binding (codex H1) — for a named-staff participant
     *
     * @generated from field: optional string participant_principal_type = 10;
     */
    participantPrincipalType?: string;
    /**
     * @generated from field: optional string participant_principal_id = 11;
     */
    participantPrincipalId?: string;
    /**
     * proto ENUM (directive G — NOT string)
     *
     * @generated from field: domain.communication.v1.ConversationParticipantType participant_type = 12;
     */
    participantType: ConversationParticipantType;
    /**
     * "Finance team", "Compliance team" (v2)
     *
     * @generated from field: optional string team_label = 13;
     */
    teamLabel?: string;
};
/**
 * Describes the message domain.communication.v1.ConversationParticipant.
 * Use `create(ConversationParticipantSchema)` to create a new message.
 */
export declare const ConversationParticipantSchema: GenMessage<ConversationParticipant>;
/**
 * @generated from message domain.communication.v1.CreateConversationParticipantRequest
 */
export type CreateConversationParticipantRequest = Message<"domain.communication.v1.CreateConversationParticipantRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationParticipant data = 1;
     */
    data?: ConversationParticipant;
};
/**
 * Describes the message domain.communication.v1.CreateConversationParticipantRequest.
 * Use `create(CreateConversationParticipantRequestSchema)` to create a new message.
 */
export declare const CreateConversationParticipantRequestSchema: GenMessage<CreateConversationParticipantRequest>;
/**
 * @generated from message domain.communication.v1.CreateConversationParticipantResponse
 */
export type CreateConversationParticipantResponse = Message<"domain.communication.v1.CreateConversationParticipantResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationParticipant data = 1;
     */
    data: ConversationParticipant[];
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
 * Describes the message domain.communication.v1.CreateConversationParticipantResponse.
 * Use `create(CreateConversationParticipantResponseSchema)` to create a new message.
 */
export declare const CreateConversationParticipantResponseSchema: GenMessage<CreateConversationParticipantResponse>;
/**
 * @generated from message domain.communication.v1.ReadConversationParticipantRequest
 */
export type ReadConversationParticipantRequest = Message<"domain.communication.v1.ReadConversationParticipantRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationParticipant data = 1;
     */
    data?: ConversationParticipant;
};
/**
 * Describes the message domain.communication.v1.ReadConversationParticipantRequest.
 * Use `create(ReadConversationParticipantRequestSchema)` to create a new message.
 */
export declare const ReadConversationParticipantRequestSchema: GenMessage<ReadConversationParticipantRequest>;
/**
 * @generated from message domain.communication.v1.ReadConversationParticipantResponse
 */
export type ReadConversationParticipantResponse = Message<"domain.communication.v1.ReadConversationParticipantResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationParticipant data = 1;
     */
    data: ConversationParticipant[];
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
 * Describes the message domain.communication.v1.ReadConversationParticipantResponse.
 * Use `create(ReadConversationParticipantResponseSchema)` to create a new message.
 */
export declare const ReadConversationParticipantResponseSchema: GenMessage<ReadConversationParticipantResponse>;
/**
 * @generated from message domain.communication.v1.UpdateConversationParticipantRequest
 */
export type UpdateConversationParticipantRequest = Message<"domain.communication.v1.UpdateConversationParticipantRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationParticipant data = 1;
     */
    data?: ConversationParticipant;
};
/**
 * Describes the message domain.communication.v1.UpdateConversationParticipantRequest.
 * Use `create(UpdateConversationParticipantRequestSchema)` to create a new message.
 */
export declare const UpdateConversationParticipantRequestSchema: GenMessage<UpdateConversationParticipantRequest>;
/**
 * @generated from message domain.communication.v1.UpdateConversationParticipantResponse
 */
export type UpdateConversationParticipantResponse = Message<"domain.communication.v1.UpdateConversationParticipantResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationParticipant data = 1;
     */
    data: ConversationParticipant[];
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
 * Describes the message domain.communication.v1.UpdateConversationParticipantResponse.
 * Use `create(UpdateConversationParticipantResponseSchema)` to create a new message.
 */
export declare const UpdateConversationParticipantResponseSchema: GenMessage<UpdateConversationParticipantResponse>;
/**
 * @generated from message domain.communication.v1.DeleteConversationParticipantRequest
 */
export type DeleteConversationParticipantRequest = Message<"domain.communication.v1.DeleteConversationParticipantRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationParticipant data = 1;
     */
    data?: ConversationParticipant;
};
/**
 * Describes the message domain.communication.v1.DeleteConversationParticipantRequest.
 * Use `create(DeleteConversationParticipantRequestSchema)` to create a new message.
 */
export declare const DeleteConversationParticipantRequestSchema: GenMessage<DeleteConversationParticipantRequest>;
/**
 * @generated from message domain.communication.v1.DeleteConversationParticipantResponse
 */
export type DeleteConversationParticipantResponse = Message<"domain.communication.v1.DeleteConversationParticipantResponse"> & {
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
 * Describes the message domain.communication.v1.DeleteConversationParticipantResponse.
 * Use `create(DeleteConversationParticipantResponseSchema)` to create a new message.
 */
export declare const DeleteConversationParticipantResponseSchema: GenMessage<DeleteConversationParticipantResponse>;
/**
 * @generated from message domain.communication.v1.ListConversationParticipantsRequest
 */
export type ListConversationParticipantsRequest = Message<"domain.communication.v1.ListConversationParticipantsRequest"> & {
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
 * Describes the message domain.communication.v1.ListConversationParticipantsRequest.
 * Use `create(ListConversationParticipantsRequestSchema)` to create a new message.
 */
export declare const ListConversationParticipantsRequestSchema: GenMessage<ListConversationParticipantsRequest>;
/**
 * @generated from message domain.communication.v1.ListConversationParticipantsResponse
 */
export type ListConversationParticipantsResponse = Message<"domain.communication.v1.ListConversationParticipantsResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationParticipant data = 1;
     */
    data: ConversationParticipant[];
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
 * Describes the message domain.communication.v1.ListConversationParticipantsResponse.
 * Use `create(ListConversationParticipantsResponseSchema)` to create a new message.
 */
export declare const ListConversationParticipantsResponseSchema: GenMessage<ListConversationParticipantsResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationParticipantListPageDataRequest
 */
export type GetConversationParticipantListPageDataRequest = Message<"domain.communication.v1.GetConversationParticipantListPageDataRequest"> & {
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
 * Describes the message domain.communication.v1.GetConversationParticipantListPageDataRequest.
 * Use `create(GetConversationParticipantListPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationParticipantListPageDataRequestSchema: GenMessage<GetConversationParticipantListPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationParticipantListPageDataResponse
 */
export type GetConversationParticipantListPageDataResponse = Message<"domain.communication.v1.GetConversationParticipantListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationParticipant conversation_participant_list = 1;
     */
    conversationParticipantList: ConversationParticipant[];
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
 * Describes the message domain.communication.v1.GetConversationParticipantListPageDataResponse.
 * Use `create(GetConversationParticipantListPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationParticipantListPageDataResponseSchema: GenMessage<GetConversationParticipantListPageDataResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationParticipantItemPageDataRequest
 */
export type GetConversationParticipantItemPageDataRequest = Message<"domain.communication.v1.GetConversationParticipantItemPageDataRequest"> & {
    /**
     * @generated from field: string conversation_participant_id = 1;
     */
    conversationParticipantId: string;
};
/**
 * Describes the message domain.communication.v1.GetConversationParticipantItemPageDataRequest.
 * Use `create(GetConversationParticipantItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationParticipantItemPageDataRequestSchema: GenMessage<GetConversationParticipantItemPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationParticipantItemPageDataResponse
 */
export type GetConversationParticipantItemPageDataResponse = Message<"domain.communication.v1.GetConversationParticipantItemPageDataResponse"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationParticipant conversation_participant = 1;
     */
    conversationParticipant?: ConversationParticipant;
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
 * Describes the message domain.communication.v1.GetConversationParticipantItemPageDataResponse.
 * Use `create(GetConversationParticipantItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationParticipantItemPageDataResponseSchema: GenMessage<GetConversationParticipantItemPageDataResponse>;
/**
 * ConversationParticipantType classifies a participant row
 * (proto ENUM — directive G — NOT string). v2 fan-out seam.
 *
 * @generated from enum domain.communication.v1.ConversationParticipantType
 */
export declare enum ConversationParticipantType {
    /**
     * @generated from enum value: CONVERSATION_PARTICIPANT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CONVERSATION_PARTICIPANT_TYPE_NAMED_STAFF = 1;
     */
    NAMED_STAFF = 1,
    /**
     * v2 fan-out
     *
     * @generated from enum value: CONVERSATION_PARTICIPANT_TYPE_TEAM_INBOX = 2;
     */
    TEAM_INBOX = 2
}
/**
 * Describes the enum domain.communication.v1.ConversationParticipantType.
 */
export declare const ConversationParticipantTypeSchema: GenEnum<ConversationParticipantType>;
/**
 * @generated from service domain.communication.v1.ConversationParticipantDomainService
 */
export declare const ConversationParticipantDomainService: GenService<{
    /**
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.CreateConversationParticipant
     */
    createConversationParticipant: {
        methodKind: "unary";
        input: typeof CreateConversationParticipantRequestSchema;
        output: typeof CreateConversationParticipantResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.ReadConversationParticipant
     */
    readConversationParticipant: {
        methodKind: "unary";
        input: typeof ReadConversationParticipantRequestSchema;
        output: typeof ReadConversationParticipantResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.UpdateConversationParticipant
     */
    updateConversationParticipant: {
        methodKind: "unary";
        input: typeof UpdateConversationParticipantRequestSchema;
        output: typeof UpdateConversationParticipantResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.DeleteConversationParticipant
     */
    deleteConversationParticipant: {
        methodKind: "unary";
        input: typeof DeleteConversationParticipantRequestSchema;
        output: typeof DeleteConversationParticipantResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.ListConversationParticipants
     */
    listConversationParticipants: {
        methodKind: "unary";
        input: typeof ListConversationParticipantsRequestSchema;
        output: typeof ListConversationParticipantsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.GetConversationParticipantListPageData
     */
    getConversationParticipantListPageData: {
        methodKind: "unary";
        input: typeof GetConversationParticipantListPageDataRequestSchema;
        output: typeof GetConversationParticipantListPageDataResponseSchema;
    };
    /**
     * Enhanced item view
     *
     * @generated from rpc domain.communication.v1.ConversationParticipantDomainService.GetConversationParticipantItemPageData
     */
    getConversationParticipantItemPageData: {
        methodKind: "unary";
        input: typeof GetConversationParticipantItemPageDataRequestSchema;
        output: typeof GetConversationParticipantItemPageDataResponseSchema;
    };
}>;
