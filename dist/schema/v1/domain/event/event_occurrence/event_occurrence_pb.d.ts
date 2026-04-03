import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_occurrence/event_occurrence.proto.
 */
export declare const file_domain_event_event_occurrence_event_occurrence: GenFile;
/**
 * EventOccurrence is a pre-computed materialized row for calendar UI performance.
 * Populated by cyta's recurrence expander background job, NOT by user CRUD.
 * One-time events get exactly one occurrence row; recurring events get one per expansion.
 *
 * Calendar queries use: SELECT * FROM event_occurrence
 *   WHERE workspace_id = ? AND start_date_time_utc >= ? AND end_date_time_utc <= ?
 *
 * Exception handling:
 *   - "Edit this occurrence" → new Event with parent_event_id → update occurrence row (is_exception=true, exception_event_id=new)
 *   - "Cancel this occurrence" → mark is_cancelled=true
 *   - "Cancel all future" → add UNTIL to RRULE → delete future occurrence rows
 *
 * @generated from message domain.event.v1.EventOccurrence
 */
export type EventOccurrence = Message<"domain.event.v1.EventOccurrence"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent event FK (required)
     *
     * @generated from field: string event_id = 2;
     */
    eventId: string;
    /**
     * Occurrence time window (UTC timestamps for fast range queries)
     *
     * @generated from field: int64 start_date_time_utc = 3;
     */
    startDateTimeUtc: bigint;
    /**
     * @generated from field: int64 end_date_time_utc = 4;
     */
    endDateTimeUtc: bigint;
    /**
     * Whether this occurrence has been individually modified (exception to recurrence pattern)
     *
     * @generated from field: bool is_exception = 5;
     */
    isException: boolean;
    /**
     * Whether this occurrence has been individually cancelled
     *
     * @generated from field: bool is_cancelled = 6;
     */
    isCancelled: boolean;
    /**
     * If is_exception=true, points to the override Event that replaces this occurrence
     *
     * @generated from field: optional string exception_event_id = 7;
     */
    exceptionEventId?: string;
    /**
     * Tenant scope — indexed together with start_date_time_utc for calendar range queries
     *
     * @generated from field: string workspace_id = 8;
     */
    workspaceId: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 9;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 10;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 11;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 12;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 13;
     */
    active: boolean;
};
/**
 * Describes the message domain.event.v1.EventOccurrence.
 * Use `create(EventOccurrenceSchema)` to create a new message.
 */
export declare const EventOccurrenceSchema: GenMessage<EventOccurrence>;
/**
 * @generated from message domain.event.v1.ListEventOccurrencesRequest
 */
export type ListEventOccurrencesRequest = Message<"domain.event.v1.ListEventOccurrencesRequest"> & {
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
 * Describes the message domain.event.v1.ListEventOccurrencesRequest.
 * Use `create(ListEventOccurrencesRequestSchema)` to create a new message.
 */
export declare const ListEventOccurrencesRequestSchema: GenMessage<ListEventOccurrencesRequest>;
/**
 * @generated from message domain.event.v1.ListEventOccurrencesResponse
 */
export type ListEventOccurrencesResponse = Message<"domain.event.v1.ListEventOccurrencesResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventOccurrence data = 1;
     */
    data: EventOccurrence[];
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
 * Describes the message domain.event.v1.ListEventOccurrencesResponse.
 * Use `create(ListEventOccurrencesResponseSchema)` to create a new message.
 */
export declare const ListEventOccurrencesResponseSchema: GenMessage<ListEventOccurrencesResponse>;
/**
 * @generated from message domain.event.v1.GetEventOccurrenceListPageDataRequest
 */
export type GetEventOccurrenceListPageDataRequest = Message<"domain.event.v1.GetEventOccurrenceListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventOccurrenceListPageDataRequest.
 * Use `create(GetEventOccurrenceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventOccurrenceListPageDataRequestSchema: GenMessage<GetEventOccurrenceListPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventOccurrenceListPageDataResponse
 */
export type GetEventOccurrenceListPageDataResponse = Message<"domain.event.v1.GetEventOccurrenceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventOccurrence event_occurrence_list = 1;
     */
    eventOccurrenceList: EventOccurrence[];
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
 * Describes the message domain.event.v1.GetEventOccurrenceListPageDataResponse.
 * Use `create(GetEventOccurrenceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventOccurrenceListPageDataResponseSchema: GenMessage<GetEventOccurrenceListPageDataResponse>;
/**
 * @generated from message domain.event.v1.GetEventOccurrenceItemPageDataRequest
 */
export type GetEventOccurrenceItemPageDataRequest = Message<"domain.event.v1.GetEventOccurrenceItemPageDataRequest"> & {
    /**
     * @generated from field: string event_occurrence_id = 1;
     */
    eventOccurrenceId: string;
};
/**
 * Describes the message domain.event.v1.GetEventOccurrenceItemPageDataRequest.
 * Use `create(GetEventOccurrenceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventOccurrenceItemPageDataRequestSchema: GenMessage<GetEventOccurrenceItemPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventOccurrenceItemPageDataResponse
 */
export type GetEventOccurrenceItemPageDataResponse = Message<"domain.event.v1.GetEventOccurrenceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.event.v1.EventOccurrence event_occurrence = 1;
     */
    eventOccurrence?: EventOccurrence;
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
 * Describes the message domain.event.v1.GetEventOccurrenceItemPageDataResponse.
 * Use `create(GetEventOccurrenceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventOccurrenceItemPageDataResponseSchema: GenMessage<GetEventOccurrenceItemPageDataResponse>;
/**
 * EventOccurrence is read-only from the API perspective.
 * No Create/Update/Delete — populated by background recurrence expansion job.
 *
 * @generated from service domain.event.v1.EventOccurrenceDomainService
 */
export declare const EventOccurrenceDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventOccurrenceDomainService.ListEventOccurrences
     */
    listEventOccurrences: {
        methodKind: "unary";
        input: typeof ListEventOccurrencesRequestSchema;
        output: typeof ListEventOccurrencesResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventOccurrenceDomainService.GetEventOccurrenceListPageData
     */
    getEventOccurrenceListPageData: {
        methodKind: "unary";
        input: typeof GetEventOccurrenceListPageDataRequestSchema;
        output: typeof GetEventOccurrenceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventOccurrenceDomainService.GetEventOccurrenceItemPageData
     */
    getEventOccurrenceItemPageData: {
        methodKind: "unary";
        input: typeof GetEventOccurrenceItemPageDataRequestSchema;
        output: typeof GetEventOccurrenceItemPageDataResponseSchema;
    };
}>;
