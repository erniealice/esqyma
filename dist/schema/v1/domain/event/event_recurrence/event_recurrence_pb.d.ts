import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_recurrence/event_recurrence.proto.
 */
export declare const file_domain_event_event_recurrence_event_recurrence: GenFile;
/**
 * EventRecurrence defines a reusable recurrence pattern for events.
 * Stores both the canonical RRULE string and parsed fields for query convenience.
 *
 * @generated from message domain.event.v1.EventRecurrence
 */
export type EventRecurrence = Message<"domain.event.v1.EventRecurrence"> & {
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
     * Canonical RFC 5545 RRULE string (e.g., "FREQ=WEEKLY;BYDAY=MO,WE,FR;INTERVAL=1")
     * This is the source of truth — parsed fields below are denormalized for query convenience.
     *
     * @generated from field: string rrule_string = 4;
     */
    rruleString: string;
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
     * Tenant scope
     *
     * @generated from field: string workspace_id = 10;
     */
    workspaceId: string;
    /**
     * Parsed RRULE fields (denormalized for filtering/querying without parsing RRULE)
     *
     * @generated from field: domain.event.v1.RecurrenceFrequency freq = 11;
     */
    freq: RecurrenceFrequency;
    /**
     * @generated from field: int32 interval = 12;
     */
    interval: number;
    /**
     * @generated from field: optional int32 count = 13;
     */
    count?: number;
    /**
     * @generated from field: optional int64 until_utc = 14;
     */
    untilUtc?: bigint;
    /**
     * Comma-separated: "MO,WE,FR"
     *
     * @generated from field: optional string by_day = 15;
     */
    byDay?: string;
    /**
     * Comma-separated: "1,15"
     *
     * @generated from field: optional string by_month_day = 16;
     */
    byMonthDay?: string;
    /**
     * Comma-separated excluded dates (RFC 5545 EXDATE)
     *
     * @generated from field: optional string exdate_string = 17;
     */
    exdateString?: string;
};
/**
 * Describes the message domain.event.v1.EventRecurrence.
 * Use `create(EventRecurrenceSchema)` to create a new message.
 */
export declare const EventRecurrenceSchema: GenMessage<EventRecurrence>;
/**
 * @generated from message domain.event.v1.CreateEventRecurrenceRequest
 */
export type CreateEventRecurrenceRequest = Message<"domain.event.v1.CreateEventRecurrenceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventRecurrence data = 1;
     */
    data?: EventRecurrence;
};
/**
 * Describes the message domain.event.v1.CreateEventRecurrenceRequest.
 * Use `create(CreateEventRecurrenceRequestSchema)` to create a new message.
 */
export declare const CreateEventRecurrenceRequestSchema: GenMessage<CreateEventRecurrenceRequest>;
/**
 * @generated from message domain.event.v1.CreateEventRecurrenceResponse
 */
export type CreateEventRecurrenceResponse = Message<"domain.event.v1.CreateEventRecurrenceResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventRecurrence data = 1;
     */
    data: EventRecurrence[];
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
 * Describes the message domain.event.v1.CreateEventRecurrenceResponse.
 * Use `create(CreateEventRecurrenceResponseSchema)` to create a new message.
 */
export declare const CreateEventRecurrenceResponseSchema: GenMessage<CreateEventRecurrenceResponse>;
/**
 * @generated from message domain.event.v1.ReadEventRecurrenceRequest
 */
export type ReadEventRecurrenceRequest = Message<"domain.event.v1.ReadEventRecurrenceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventRecurrence data = 1;
     */
    data?: EventRecurrence;
};
/**
 * Describes the message domain.event.v1.ReadEventRecurrenceRequest.
 * Use `create(ReadEventRecurrenceRequestSchema)` to create a new message.
 */
export declare const ReadEventRecurrenceRequestSchema: GenMessage<ReadEventRecurrenceRequest>;
/**
 * @generated from message domain.event.v1.ReadEventRecurrenceResponse
 */
export type ReadEventRecurrenceResponse = Message<"domain.event.v1.ReadEventRecurrenceResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventRecurrence data = 1;
     */
    data: EventRecurrence[];
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
 * Describes the message domain.event.v1.ReadEventRecurrenceResponse.
 * Use `create(ReadEventRecurrenceResponseSchema)` to create a new message.
 */
export declare const ReadEventRecurrenceResponseSchema: GenMessage<ReadEventRecurrenceResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventRecurrenceRequest
 */
export type UpdateEventRecurrenceRequest = Message<"domain.event.v1.UpdateEventRecurrenceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventRecurrence data = 1;
     */
    data?: EventRecurrence;
};
/**
 * Describes the message domain.event.v1.UpdateEventRecurrenceRequest.
 * Use `create(UpdateEventRecurrenceRequestSchema)` to create a new message.
 */
export declare const UpdateEventRecurrenceRequestSchema: GenMessage<UpdateEventRecurrenceRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventRecurrenceResponse
 */
export type UpdateEventRecurrenceResponse = Message<"domain.event.v1.UpdateEventRecurrenceResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventRecurrence data = 1;
     */
    data: EventRecurrence[];
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
 * Describes the message domain.event.v1.UpdateEventRecurrenceResponse.
 * Use `create(UpdateEventRecurrenceResponseSchema)` to create a new message.
 */
export declare const UpdateEventRecurrenceResponseSchema: GenMessage<UpdateEventRecurrenceResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventRecurrenceRequest
 */
export type DeleteEventRecurrenceRequest = Message<"domain.event.v1.DeleteEventRecurrenceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventRecurrence data = 1;
     */
    data?: EventRecurrence;
};
/**
 * Describes the message domain.event.v1.DeleteEventRecurrenceRequest.
 * Use `create(DeleteEventRecurrenceRequestSchema)` to create a new message.
 */
export declare const DeleteEventRecurrenceRequestSchema: GenMessage<DeleteEventRecurrenceRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventRecurrenceResponse
 */
export type DeleteEventRecurrenceResponse = Message<"domain.event.v1.DeleteEventRecurrenceResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventRecurrenceResponse.
 * Use `create(DeleteEventRecurrenceResponseSchema)` to create a new message.
 */
export declare const DeleteEventRecurrenceResponseSchema: GenMessage<DeleteEventRecurrenceResponse>;
/**
 * @generated from message domain.event.v1.ListEventRecurrencesRequest
 */
export type ListEventRecurrencesRequest = Message<"domain.event.v1.ListEventRecurrencesRequest"> & {
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
 * Describes the message domain.event.v1.ListEventRecurrencesRequest.
 * Use `create(ListEventRecurrencesRequestSchema)` to create a new message.
 */
export declare const ListEventRecurrencesRequestSchema: GenMessage<ListEventRecurrencesRequest>;
/**
 * @generated from message domain.event.v1.ListEventRecurrencesResponse
 */
export type ListEventRecurrencesResponse = Message<"domain.event.v1.ListEventRecurrencesResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventRecurrence data = 1;
     */
    data: EventRecurrence[];
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
 * Describes the message domain.event.v1.ListEventRecurrencesResponse.
 * Use `create(ListEventRecurrencesResponseSchema)` to create a new message.
 */
export declare const ListEventRecurrencesResponseSchema: GenMessage<ListEventRecurrencesResponse>;
/**
 * @generated from message domain.event.v1.GetEventRecurrenceListPageDataRequest
 */
export type GetEventRecurrenceListPageDataRequest = Message<"domain.event.v1.GetEventRecurrenceListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventRecurrenceListPageDataRequest.
 * Use `create(GetEventRecurrenceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventRecurrenceListPageDataRequestSchema: GenMessage<GetEventRecurrenceListPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventRecurrenceListPageDataResponse
 */
export type GetEventRecurrenceListPageDataResponse = Message<"domain.event.v1.GetEventRecurrenceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventRecurrence event_recurrence_list = 1;
     */
    eventRecurrenceList: EventRecurrence[];
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
 * Describes the message domain.event.v1.GetEventRecurrenceListPageDataResponse.
 * Use `create(GetEventRecurrenceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventRecurrenceListPageDataResponseSchema: GenMessage<GetEventRecurrenceListPageDataResponse>;
/**
 * @generated from message domain.event.v1.GetEventRecurrenceItemPageDataRequest
 */
export type GetEventRecurrenceItemPageDataRequest = Message<"domain.event.v1.GetEventRecurrenceItemPageDataRequest"> & {
    /**
     * @generated from field: string event_recurrence_id = 1;
     */
    eventRecurrenceId: string;
};
/**
 * Describes the message domain.event.v1.GetEventRecurrenceItemPageDataRequest.
 * Use `create(GetEventRecurrenceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventRecurrenceItemPageDataRequestSchema: GenMessage<GetEventRecurrenceItemPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventRecurrenceItemPageDataResponse
 */
export type GetEventRecurrenceItemPageDataResponse = Message<"domain.event.v1.GetEventRecurrenceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.event.v1.EventRecurrence event_recurrence = 1;
     */
    eventRecurrence?: EventRecurrence;
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
 * Describes the message domain.event.v1.GetEventRecurrenceItemPageDataResponse.
 * Use `create(GetEventRecurrenceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventRecurrenceItemPageDataResponseSchema: GenMessage<GetEventRecurrenceItemPageDataResponse>;
/**
 * RecurrenceFrequency represents the base frequency for RFC 5545 RRULE expansion.
 *
 * @generated from enum domain.event.v1.RecurrenceFrequency
 */
export declare enum RecurrenceFrequency {
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_DAILY = 1;
     */
    DAILY = 1,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_WEEKLY = 2;
     */
    WEEKLY = 2,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_MONTHLY = 3;
     */
    MONTHLY = 3,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_YEARLY = 4;
     */
    YEARLY = 4
}
/**
 * Describes the enum domain.event.v1.RecurrenceFrequency.
 */
export declare const RecurrenceFrequencySchema: GenEnum<RecurrenceFrequency>;
/**
 * @generated from service domain.event.v1.EventRecurrenceDomainService
 */
export declare const EventRecurrenceDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.CreateEventRecurrence
     */
    createEventRecurrence: {
        methodKind: "unary";
        input: typeof CreateEventRecurrenceRequestSchema;
        output: typeof CreateEventRecurrenceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.ReadEventRecurrence
     */
    readEventRecurrence: {
        methodKind: "unary";
        input: typeof ReadEventRecurrenceRequestSchema;
        output: typeof ReadEventRecurrenceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.UpdateEventRecurrence
     */
    updateEventRecurrence: {
        methodKind: "unary";
        input: typeof UpdateEventRecurrenceRequestSchema;
        output: typeof UpdateEventRecurrenceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.DeleteEventRecurrence
     */
    deleteEventRecurrence: {
        methodKind: "unary";
        input: typeof DeleteEventRecurrenceRequestSchema;
        output: typeof DeleteEventRecurrenceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.ListEventRecurrences
     */
    listEventRecurrences: {
        methodKind: "unary";
        input: typeof ListEventRecurrencesRequestSchema;
        output: typeof ListEventRecurrencesResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.GetEventRecurrenceListPageData
     */
    getEventRecurrenceListPageData: {
        methodKind: "unary";
        input: typeof GetEventRecurrenceListPageDataRequestSchema;
        output: typeof GetEventRecurrenceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventRecurrenceDomainService.GetEventRecurrenceItemPageData
     */
    getEventRecurrenceItemPageData: {
        methodKind: "unary";
        input: typeof GetEventRecurrenceItemPageDataRequestSchema;
        output: typeof GetEventRecurrenceItemPageDataResponseSchema;
    };
}>;
