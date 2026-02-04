import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { EventClient } from "../event_client/event_client_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event/event.proto.
 */
export declare const file_domain_event_event_event: GenFile;
/**
 * @generated from message domain.event.v1.Event
 */
export type Event = Message<"domain.event.v1.Event"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional string description = 3;
     */
    description?: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: int64 start_date_time_utc = 9;
     */
    startDateTimeUtc: bigint;
    /**
     * @generated from field: int64 end_date_time_utc = 10;
     */
    endDateTimeUtc: bigint;
    /**
     * @generated from field: string timezone = 11;
     */
    timezone: string;
    /**
     * @generated from field: optional string start_date_time_utc_string = 12;
     */
    startDateTimeUtcString?: string;
    /**
     * @generated from field: optional string end_date_time_utc_string = 13;
     */
    endDateTimeUtcString?: string;
    /**
     * @generated from field: repeated domain.event.v1.EventClient event_clients = 14;
     */
    eventClients: EventClient[];
};
/**
 * Describes the message domain.event.v1.Event.
 * Use `create(EventSchema)` to create a new message.
 */
export declare const EventSchema: GenMessage<Event>;
/**
 * @generated from message domain.event.v1.CreateEventRequest
 */
export type CreateEventRequest = Message<"domain.event.v1.CreateEventRequest"> & {
    /**
     * @generated from field: domain.event.v1.Event data = 1;
     */
    data?: Event;
};
/**
 * Describes the message domain.event.v1.CreateEventRequest.
 * Use `create(CreateEventRequestSchema)` to create a new message.
 */
export declare const CreateEventRequestSchema: GenMessage<CreateEventRequest>;
/**
 * @generated from message domain.event.v1.CreateEventResponse
 */
export type CreateEventResponse = Message<"domain.event.v1.CreateEventResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.Event data = 1;
     */
    data: Event[];
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
 * Describes the message domain.event.v1.CreateEventResponse.
 * Use `create(CreateEventResponseSchema)` to create a new message.
 */
export declare const CreateEventResponseSchema: GenMessage<CreateEventResponse>;
/**
 * @generated from message domain.event.v1.ReadEventRequest
 */
export type ReadEventRequest = Message<"domain.event.v1.ReadEventRequest"> & {
    /**
     * @generated from field: domain.event.v1.Event data = 1;
     */
    data?: Event;
};
/**
 * Describes the message domain.event.v1.ReadEventRequest.
 * Use `create(ReadEventRequestSchema)` to create a new message.
 */
export declare const ReadEventRequestSchema: GenMessage<ReadEventRequest>;
/**
 * @generated from message domain.event.v1.ReadEventResponse
 */
export type ReadEventResponse = Message<"domain.event.v1.ReadEventResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.Event data = 1;
     */
    data: Event[];
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
 * Describes the message domain.event.v1.ReadEventResponse.
 * Use `create(ReadEventResponseSchema)` to create a new message.
 */
export declare const ReadEventResponseSchema: GenMessage<ReadEventResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventRequest
 */
export type UpdateEventRequest = Message<"domain.event.v1.UpdateEventRequest"> & {
    /**
     * @generated from field: domain.event.v1.Event data = 1;
     */
    data?: Event;
};
/**
 * Describes the message domain.event.v1.UpdateEventRequest.
 * Use `create(UpdateEventRequestSchema)` to create a new message.
 */
export declare const UpdateEventRequestSchema: GenMessage<UpdateEventRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventResponse
 */
export type UpdateEventResponse = Message<"domain.event.v1.UpdateEventResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.Event data = 1;
     */
    data: Event[];
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
 * Describes the message domain.event.v1.UpdateEventResponse.
 * Use `create(UpdateEventResponseSchema)` to create a new message.
 */
export declare const UpdateEventResponseSchema: GenMessage<UpdateEventResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventRequest
 */
export type DeleteEventRequest = Message<"domain.event.v1.DeleteEventRequest"> & {
    /**
     * @generated from field: domain.event.v1.Event data = 1;
     */
    data?: Event;
};
/**
 * Describes the message domain.event.v1.DeleteEventRequest.
 * Use `create(DeleteEventRequestSchema)` to create a new message.
 */
export declare const DeleteEventRequestSchema: GenMessage<DeleteEventRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventResponse
 */
export type DeleteEventResponse = Message<"domain.event.v1.DeleteEventResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventResponse.
 * Use `create(DeleteEventResponseSchema)` to create a new message.
 */
export declare const DeleteEventResponseSchema: GenMessage<DeleteEventResponse>;
/**
 * @generated from message domain.event.v1.ListEventsRequest
 */
export type ListEventsRequest = Message<"domain.event.v1.ListEventsRequest"> & {
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
 * Describes the message domain.event.v1.ListEventsRequest.
 * Use `create(ListEventsRequestSchema)` to create a new message.
 */
export declare const ListEventsRequestSchema: GenMessage<ListEventsRequest>;
/**
 * @generated from message domain.event.v1.ListEventsResponse
 */
export type ListEventsResponse = Message<"domain.event.v1.ListEventsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.Event data = 1;
     */
    data: Event[];
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
 * Describes the message domain.event.v1.ListEventsResponse.
 * Use `create(ListEventsResponseSchema)` to create a new message.
 */
export declare const ListEventsResponseSchema: GenMessage<ListEventsResponse>;
/**
 * NEW: Enhanced list page data request with time-based filtering
 *
 * @generated from message domain.event.v1.GetEventListPageDataRequest
 */
export type GetEventListPageDataRequest = Message<"domain.event.v1.GetEventListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventListPageDataRequest.
 * Use `create(GetEventListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventListPageDataRequestSchema: GenMessage<GetEventListPageDataRequest>;
/**
 * NEW: Enhanced list page data response with time-based optimization
 *
 * @generated from message domain.event.v1.GetEventListPageDataResponse
 */
export type GetEventListPageDataResponse = Message<"domain.event.v1.GetEventListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.Event event_list = 1;
     */
    eventList: Event[];
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
 * Describes the message domain.event.v1.GetEventListPageDataResponse.
 * Use `create(GetEventListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventListPageDataResponseSchema: GenMessage<GetEventListPageDataResponse>;
/**
 * NEW: Enhanced item page data request
 *
 * @generated from message domain.event.v1.GetEventItemPageDataRequest
 */
export type GetEventItemPageDataRequest = Message<"domain.event.v1.GetEventItemPageDataRequest"> & {
    /**
     * @generated from field: string event_id = 1;
     */
    eventId: string;
};
/**
 * Describes the message domain.event.v1.GetEventItemPageDataRequest.
 * Use `create(GetEventItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventItemPageDataRequestSchema: GenMessage<GetEventItemPageDataRequest>;
/**
 * NEW: Enhanced item page data response with related scheduling data
 *
 * @generated from message domain.event.v1.GetEventItemPageDataResponse
 */
export type GetEventItemPageDataResponse = Message<"domain.event.v1.GetEventItemPageDataResponse"> & {
    /**
     * @generated from field: domain.event.v1.Event event = 1;
     */
    event?: Event;
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
 * Describes the message domain.event.v1.GetEventItemPageDataResponse.
 * Use `create(GetEventItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventItemPageDataResponseSchema: GenMessage<GetEventItemPageDataResponse>;
/**
 * @generated from service domain.event.v1.EventDomainService
 */
export declare const EventDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventDomainService.CreateEvent
     */
    createEvent: {
        methodKind: "unary";
        input: typeof CreateEventRequestSchema;
        output: typeof CreateEventResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventDomainService.ReadEvent
     */
    readEvent: {
        methodKind: "unary";
        input: typeof ReadEventRequestSchema;
        output: typeof ReadEventResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventDomainService.UpdateEvent
     */
    updateEvent: {
        methodKind: "unary";
        input: typeof UpdateEventRequestSchema;
        output: typeof UpdateEventResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventDomainService.DeleteEvent
     */
    deleteEvent: {
        methodKind: "unary";
        input: typeof DeleteEventRequestSchema;
        output: typeof DeleteEventResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventDomainService.ListEvents
     */
    listEvents: {
        methodKind: "unary";
        input: typeof ListEventsRequestSchema;
        output: typeof ListEventsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search - optimized for time-based queries
     *
     * @generated from rpc domain.event.v1.EventDomainService.GetEventListPageData
     */
    getEventListPageData: {
        methodKind: "unary";
        input: typeof GetEventListPageDataRequestSchema;
        output: typeof GetEventListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related scheduling data
     *
     * @generated from rpc domain.event.v1.EventDomainService.GetEventItemPageData
     */
    getEventItemPageData: {
        methodKind: "unary";
        input: typeof GetEventItemPageDataRequestSchema;
        output: typeof GetEventItemPageDataResponseSchema;
    };
}>;
