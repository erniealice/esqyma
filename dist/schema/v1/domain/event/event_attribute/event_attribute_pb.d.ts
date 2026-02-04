import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Event } from "../event/event_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_attribute/event_attribute.proto.
 */
export declare const file_domain_event_event_attribute_event_attribute: GenFile;
/**
 * @generated from message domain.event.v1.EventAttribute
 */
export type EventAttribute = Message<"domain.event.v1.EventAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string event_id = 2;
     */
    eventId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.event.v1.Event event = 5;
     */
    event?: Event;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.event.v1.EventAttribute.
 * Use `create(EventAttributeSchema)` to create a new message.
 */
export declare const EventAttributeSchema: GenMessage<EventAttribute>;
/**
 * @generated from message domain.event.v1.CreateEventAttributeRequest
 */
export type CreateEventAttributeRequest = Message<"domain.event.v1.CreateEventAttributeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttribute data = 1;
     */
    data?: EventAttribute;
};
/**
 * Describes the message domain.event.v1.CreateEventAttributeRequest.
 * Use `create(CreateEventAttributeRequestSchema)` to create a new message.
 */
export declare const CreateEventAttributeRequestSchema: GenMessage<CreateEventAttributeRequest>;
/**
 * @generated from message domain.event.v1.CreateEventAttributeResponse
 */
export type CreateEventAttributeResponse = Message<"domain.event.v1.CreateEventAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttribute data = 1;
     */
    data: EventAttribute[];
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
 * Describes the message domain.event.v1.CreateEventAttributeResponse.
 * Use `create(CreateEventAttributeResponseSchema)` to create a new message.
 */
export declare const CreateEventAttributeResponseSchema: GenMessage<CreateEventAttributeResponse>;
/**
 * @generated from message domain.event.v1.ReadEventAttributeRequest
 */
export type ReadEventAttributeRequest = Message<"domain.event.v1.ReadEventAttributeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttribute data = 1;
     */
    data?: EventAttribute;
};
/**
 * Describes the message domain.event.v1.ReadEventAttributeRequest.
 * Use `create(ReadEventAttributeRequestSchema)` to create a new message.
 */
export declare const ReadEventAttributeRequestSchema: GenMessage<ReadEventAttributeRequest>;
/**
 * @generated from message domain.event.v1.ReadEventAttributeResponse
 */
export type ReadEventAttributeResponse = Message<"domain.event.v1.ReadEventAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttribute data = 1;
     */
    data: EventAttribute[];
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
 * Describes the message domain.event.v1.ReadEventAttributeResponse.
 * Use `create(ReadEventAttributeResponseSchema)` to create a new message.
 */
export declare const ReadEventAttributeResponseSchema: GenMessage<ReadEventAttributeResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventAttributeRequest
 */
export type UpdateEventAttributeRequest = Message<"domain.event.v1.UpdateEventAttributeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttribute data = 1;
     */
    data?: EventAttribute;
};
/**
 * Describes the message domain.event.v1.UpdateEventAttributeRequest.
 * Use `create(UpdateEventAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateEventAttributeRequestSchema: GenMessage<UpdateEventAttributeRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventAttributeResponse
 */
export type UpdateEventAttributeResponse = Message<"domain.event.v1.UpdateEventAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttribute data = 1;
     */
    data: EventAttribute[];
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
 * Describes the message domain.event.v1.UpdateEventAttributeResponse.
 * Use `create(UpdateEventAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateEventAttributeResponseSchema: GenMessage<UpdateEventAttributeResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventAttributeRequest
 */
export type DeleteEventAttributeRequest = Message<"domain.event.v1.DeleteEventAttributeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttribute data = 1;
     */
    data?: EventAttribute;
};
/**
 * Describes the message domain.event.v1.DeleteEventAttributeRequest.
 * Use `create(DeleteEventAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteEventAttributeRequestSchema: GenMessage<DeleteEventAttributeRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventAttributeResponse
 */
export type DeleteEventAttributeResponse = Message<"domain.event.v1.DeleteEventAttributeResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventAttributeResponse.
 * Use `create(DeleteEventAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteEventAttributeResponseSchema: GenMessage<DeleteEventAttributeResponse>;
/**
 * @generated from message domain.event.v1.ListEventAttributesRequest
 */
export type ListEventAttributesRequest = Message<"domain.event.v1.ListEventAttributesRequest"> & {
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
 * Describes the message domain.event.v1.ListEventAttributesRequest.
 * Use `create(ListEventAttributesRequestSchema)` to create a new message.
 */
export declare const ListEventAttributesRequestSchema: GenMessage<ListEventAttributesRequest>;
/**
 * @generated from message domain.event.v1.ListEventAttributesResponse
 */
export type ListEventAttributesResponse = Message<"domain.event.v1.ListEventAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttribute data = 1;
     */
    data: EventAttribute[];
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
 * Describes the message domain.event.v1.ListEventAttributesResponse.
 * Use `create(ListEventAttributesResponseSchema)` to create a new message.
 */
export declare const ListEventAttributesResponseSchema: GenMessage<ListEventAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.event.v1.GetEventAttributeListPageDataRequest
 */
export type GetEventAttributeListPageDataRequest = Message<"domain.event.v1.GetEventAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.event.v1.GetEventAttributeListPageDataRequest.
 * Use `create(GetEventAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventAttributeListPageDataRequestSchema: GenMessage<GetEventAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.event.v1.GetEventAttributeListPageDataResponse
 */
export type GetEventAttributeListPageDataResponse = Message<"domain.event.v1.GetEventAttributeListPageDataResponse"> & {
    /**
     * The event attribute data
     *
     * @generated from field: repeated domain.event.v1.EventAttribute event_attribute_list = 1;
     */
    eventAttributeList: EventAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.event.v1.GetEventAttributeListPageDataResponse.
 * Use `create(GetEventAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventAttributeListPageDataResponseSchema: GenMessage<GetEventAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.event.v1.GetEventAttributeItemPageDataRequest
 */
export type GetEventAttributeItemPageDataRequest = Message<"domain.event.v1.GetEventAttributeItemPageDataRequest"> & {
    /**
     * The event attribute ID to retrieve
     *
     * @generated from field: string event_attribute_id = 1;
     */
    eventAttributeId: string;
};
/**
 * Describes the message domain.event.v1.GetEventAttributeItemPageDataRequest.
 * Use `create(GetEventAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventAttributeItemPageDataRequestSchema: GenMessage<GetEventAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.event.v1.GetEventAttributeItemPageDataResponse
 */
export type GetEventAttributeItemPageDataResponse = Message<"domain.event.v1.GetEventAttributeItemPageDataResponse"> & {
    /**
     * The event attribute data
     *
     * @generated from field: domain.event.v1.EventAttribute event_attribute = 1;
     */
    eventAttribute?: EventAttribute;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.event.v1.GetEventAttributeItemPageDataResponse.
 * Use `create(GetEventAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventAttributeItemPageDataResponseSchema: GenMessage<GetEventAttributeItemPageDataResponse>;
/**
 * @generated from service domain.event.v1.EventAttributeDomainService
 */
export declare const EventAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventAttributeDomainService.CreateEventAttribute
     */
    createEventAttribute: {
        methodKind: "unary";
        input: typeof CreateEventAttributeRequestSchema;
        output: typeof CreateEventAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttributeDomainService.ReadEventAttribute
     */
    readEventAttribute: {
        methodKind: "unary";
        input: typeof ReadEventAttributeRequestSchema;
        output: typeof ReadEventAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttributeDomainService.UpdateEventAttribute
     */
    updateEventAttribute: {
        methodKind: "unary";
        input: typeof UpdateEventAttributeRequestSchema;
        output: typeof UpdateEventAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttributeDomainService.DeleteEventAttribute
     */
    deleteEventAttribute: {
        methodKind: "unary";
        input: typeof DeleteEventAttributeRequestSchema;
        output: typeof DeleteEventAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttributeDomainService.ListEventAttributes
     */
    listEventAttributes: {
        methodKind: "unary";
        input: typeof ListEventAttributesRequestSchema;
        output: typeof ListEventAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.event.v1.EventAttributeDomainService.GetEventAttributeListPageData
     */
    getEventAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetEventAttributeListPageDataRequestSchema;
        output: typeof GetEventAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.event.v1.EventAttributeDomainService.GetEventAttributeItemPageData
     */
    getEventAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetEventAttributeItemPageDataRequestSchema;
        output: typeof GetEventAttributeItemPageDataResponseSchema;
    };
}>;
