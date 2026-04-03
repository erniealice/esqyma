import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Client } from "../../entity/client/client_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_client/event_client.proto.
 */
export declare const file_domain_event_event_client_event_client: GenFile;
/**
 * @generated from message domain.event.v1.EventClient
 */
export type EventClient = Message<"domain.event.v1.EventClient"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string event_id = 3;
     */
    eventId: string;
    /**
     * @generated from field: optional domain.entity.v1.Client client = 4;
     */
    client?: Client;
    /**
     * @generated from field: string client_id = 5;
     */
    clientId: string;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 7;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 8;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 9;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
};
/**
 * Describes the message domain.event.v1.EventClient.
 * Use `create(EventClientSchema)` to create a new message.
 */
export declare const EventClientSchema: GenMessage<EventClient>;
/**
 * @generated from message domain.event.v1.CreateEventClientRequest
 */
export type CreateEventClientRequest = Message<"domain.event.v1.CreateEventClientRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventClient data = 1;
     */
    data?: EventClient;
};
/**
 * Describes the message domain.event.v1.CreateEventClientRequest.
 * Use `create(CreateEventClientRequestSchema)` to create a new message.
 */
export declare const CreateEventClientRequestSchema: GenMessage<CreateEventClientRequest>;
/**
 * @generated from message domain.event.v1.CreateEventClientResponse
 */
export type CreateEventClientResponse = Message<"domain.event.v1.CreateEventClientResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventClient data = 1;
     */
    data: EventClient[];
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
 * Describes the message domain.event.v1.CreateEventClientResponse.
 * Use `create(CreateEventClientResponseSchema)` to create a new message.
 */
export declare const CreateEventClientResponseSchema: GenMessage<CreateEventClientResponse>;
/**
 * @generated from message domain.event.v1.ReadEventClientRequest
 */
export type ReadEventClientRequest = Message<"domain.event.v1.ReadEventClientRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventClient data = 1;
     */
    data?: EventClient;
};
/**
 * Describes the message domain.event.v1.ReadEventClientRequest.
 * Use `create(ReadEventClientRequestSchema)` to create a new message.
 */
export declare const ReadEventClientRequestSchema: GenMessage<ReadEventClientRequest>;
/**
 * @generated from message domain.event.v1.ReadEventClientResponse
 */
export type ReadEventClientResponse = Message<"domain.event.v1.ReadEventClientResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventClient data = 1;
     */
    data: EventClient[];
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
 * Describes the message domain.event.v1.ReadEventClientResponse.
 * Use `create(ReadEventClientResponseSchema)` to create a new message.
 */
export declare const ReadEventClientResponseSchema: GenMessage<ReadEventClientResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventClientRequest
 */
export type UpdateEventClientRequest = Message<"domain.event.v1.UpdateEventClientRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventClient data = 1;
     */
    data?: EventClient;
};
/**
 * Describes the message domain.event.v1.UpdateEventClientRequest.
 * Use `create(UpdateEventClientRequestSchema)` to create a new message.
 */
export declare const UpdateEventClientRequestSchema: GenMessage<UpdateEventClientRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventClientResponse
 */
export type UpdateEventClientResponse = Message<"domain.event.v1.UpdateEventClientResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventClient data = 1;
     */
    data: EventClient[];
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
 * Describes the message domain.event.v1.UpdateEventClientResponse.
 * Use `create(UpdateEventClientResponseSchema)` to create a new message.
 */
export declare const UpdateEventClientResponseSchema: GenMessage<UpdateEventClientResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventClientRequest
 */
export type DeleteEventClientRequest = Message<"domain.event.v1.DeleteEventClientRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventClient data = 1;
     */
    data?: EventClient;
};
/**
 * Describes the message domain.event.v1.DeleteEventClientRequest.
 * Use `create(DeleteEventClientRequestSchema)` to create a new message.
 */
export declare const DeleteEventClientRequestSchema: GenMessage<DeleteEventClientRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventClientResponse
 */
export type DeleteEventClientResponse = Message<"domain.event.v1.DeleteEventClientResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventClientResponse.
 * Use `create(DeleteEventClientResponseSchema)` to create a new message.
 */
export declare const DeleteEventClientResponseSchema: GenMessage<DeleteEventClientResponse>;
/**
 * @generated from message domain.event.v1.ListEventClientsRequest
 */
export type ListEventClientsRequest = Message<"domain.event.v1.ListEventClientsRequest"> & {
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
 * Describes the message domain.event.v1.ListEventClientsRequest.
 * Use `create(ListEventClientsRequestSchema)` to create a new message.
 */
export declare const ListEventClientsRequestSchema: GenMessage<ListEventClientsRequest>;
/**
 * @generated from message domain.event.v1.ListEventClientsResponse
 */
export type ListEventClientsResponse = Message<"domain.event.v1.ListEventClientsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventClient data = 1;
     */
    data: EventClient[];
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
 * Describes the message domain.event.v1.ListEventClientsResponse.
 * Use `create(ListEventClientsResponseSchema)` to create a new message.
 */
export declare const ListEventClientsResponseSchema: GenMessage<ListEventClientsResponse>;
/**
 * @generated from message domain.event.v1.GetEventClientListPageDataRequest
 */
export type GetEventClientListPageDataRequest = Message<"domain.event.v1.GetEventClientListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventClientListPageDataRequest.
 * Use `create(GetEventClientListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventClientListPageDataRequestSchema: GenMessage<GetEventClientListPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventClientListPageDataResponse
 */
export type GetEventClientListPageDataResponse = Message<"domain.event.v1.GetEventClientListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventClient event_client_list = 1;
     */
    eventClientList: EventClient[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.event.v1.GetEventClientListPageDataResponse.
 * Use `create(GetEventClientListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventClientListPageDataResponseSchema: GenMessage<GetEventClientListPageDataResponse>;
/**
 * @generated from message domain.event.v1.GetEventClientItemPageDataRequest
 */
export type GetEventClientItemPageDataRequest = Message<"domain.event.v1.GetEventClientItemPageDataRequest"> & {
    /**
     * @generated from field: string event_client_id = 1;
     */
    eventClientId: string;
};
/**
 * Describes the message domain.event.v1.GetEventClientItemPageDataRequest.
 * Use `create(GetEventClientItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventClientItemPageDataRequestSchema: GenMessage<GetEventClientItemPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventClientItemPageDataResponse
 */
export type GetEventClientItemPageDataResponse = Message<"domain.event.v1.GetEventClientItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.event.v1.EventClient event_client = 1;
     */
    eventClient?: EventClient;
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
 * Describes the message domain.event.v1.GetEventClientItemPageDataResponse.
 * Use `create(GetEventClientItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventClientItemPageDataResponseSchema: GenMessage<GetEventClientItemPageDataResponse>;
/**
 * @generated from service domain.event.v1.EventClientDomainService
 */
export declare const EventClientDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.CreateEventClient
     */
    createEventClient: {
        methodKind: "unary";
        input: typeof CreateEventClientRequestSchema;
        output: typeof CreateEventClientResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.ReadEventClient
     */
    readEventClient: {
        methodKind: "unary";
        input: typeof ReadEventClientRequestSchema;
        output: typeof ReadEventClientResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.UpdateEventClient
     */
    updateEventClient: {
        methodKind: "unary";
        input: typeof UpdateEventClientRequestSchema;
        output: typeof UpdateEventClientResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.DeleteEventClient
     */
    deleteEventClient: {
        methodKind: "unary";
        input: typeof DeleteEventClientRequestSchema;
        output: typeof DeleteEventClientResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.ListEventClients
     */
    listEventClients: {
        methodKind: "unary";
        input: typeof ListEventClientsRequestSchema;
        output: typeof ListEventClientsResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.GetEventClientListPageData
     */
    getEventClientListPageData: {
        methodKind: "unary";
        input: typeof GetEventClientListPageDataRequestSchema;
        output: typeof GetEventClientListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventClientDomainService.GetEventClientItemPageData
     */
    getEventClientItemPageData: {
        methodKind: "unary";
        input: typeof GetEventClientItemPageDataRequestSchema;
        output: typeof GetEventClientItemPageDataResponseSchema;
    };
}>;
