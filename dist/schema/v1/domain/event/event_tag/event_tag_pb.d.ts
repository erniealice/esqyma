import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_tag/event_tag.proto.
 */
export declare const file_domain_event_event_tag_event_tag: GenFile;
/**
 * EventTag is a per-workspace label applied to events. Modelled on
 * Outlook Categories — a master list of {name, color} pairs that can
 * be multi-assigned to any event via event_tag_assignment.
 * The color palette is seeded from theme tokens (see
 * packages/copya/seeds/common/event_tag.csv); users can rename tags
 * and change their colors but the defaults align to --app-color-* /
 * --accent-* CSS variables.
 *
 * @generated from message domain.event.v1.EventTag
 */
export type EventTag = Message<"domain.event.v1.EventTag"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Tenant scope
     *
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Display name (e.g. "Red", "Client Meeting", "Personal")
     *
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * Optional long-form description
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * Color as a CSS hex string (e.g. "#dc2626"). Seeded from theme
     * tokens; override free-form per workspace.
     *
     * @generated from field: string color = 5;
     */
    color: string;
    /**
     * Audit fields
     *
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
 * Describes the message domain.event.v1.EventTag.
 * Use `create(EventTagSchema)` to create a new message.
 */
export declare const EventTagSchema: GenMessage<EventTag>;
/**
 * @generated from message domain.event.v1.CreateEventTagRequest
 */
export type CreateEventTagRequest = Message<"domain.event.v1.CreateEventTagRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTag data = 1;
     */
    data?: EventTag;
};
/**
 * Describes the message domain.event.v1.CreateEventTagRequest.
 * Use `create(CreateEventTagRequestSchema)` to create a new message.
 */
export declare const CreateEventTagRequestSchema: GenMessage<CreateEventTagRequest>;
/**
 * @generated from message domain.event.v1.CreateEventTagResponse
 */
export type CreateEventTagResponse = Message<"domain.event.v1.CreateEventTagResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTag data = 1;
     */
    data: EventTag[];
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
 * Describes the message domain.event.v1.CreateEventTagResponse.
 * Use `create(CreateEventTagResponseSchema)` to create a new message.
 */
export declare const CreateEventTagResponseSchema: GenMessage<CreateEventTagResponse>;
/**
 * @generated from message domain.event.v1.ReadEventTagRequest
 */
export type ReadEventTagRequest = Message<"domain.event.v1.ReadEventTagRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTag data = 1;
     */
    data?: EventTag;
};
/**
 * Describes the message domain.event.v1.ReadEventTagRequest.
 * Use `create(ReadEventTagRequestSchema)` to create a new message.
 */
export declare const ReadEventTagRequestSchema: GenMessage<ReadEventTagRequest>;
/**
 * @generated from message domain.event.v1.ReadEventTagResponse
 */
export type ReadEventTagResponse = Message<"domain.event.v1.ReadEventTagResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTag data = 1;
     */
    data: EventTag[];
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
 * Describes the message domain.event.v1.ReadEventTagResponse.
 * Use `create(ReadEventTagResponseSchema)` to create a new message.
 */
export declare const ReadEventTagResponseSchema: GenMessage<ReadEventTagResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventTagRequest
 */
export type UpdateEventTagRequest = Message<"domain.event.v1.UpdateEventTagRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTag data = 1;
     */
    data?: EventTag;
};
/**
 * Describes the message domain.event.v1.UpdateEventTagRequest.
 * Use `create(UpdateEventTagRequestSchema)` to create a new message.
 */
export declare const UpdateEventTagRequestSchema: GenMessage<UpdateEventTagRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventTagResponse
 */
export type UpdateEventTagResponse = Message<"domain.event.v1.UpdateEventTagResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTag data = 1;
     */
    data: EventTag[];
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
 * Describes the message domain.event.v1.UpdateEventTagResponse.
 * Use `create(UpdateEventTagResponseSchema)` to create a new message.
 */
export declare const UpdateEventTagResponseSchema: GenMessage<UpdateEventTagResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventTagRequest
 */
export type DeleteEventTagRequest = Message<"domain.event.v1.DeleteEventTagRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTag data = 1;
     */
    data?: EventTag;
};
/**
 * Describes the message domain.event.v1.DeleteEventTagRequest.
 * Use `create(DeleteEventTagRequestSchema)` to create a new message.
 */
export declare const DeleteEventTagRequestSchema: GenMessage<DeleteEventTagRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventTagResponse
 */
export type DeleteEventTagResponse = Message<"domain.event.v1.DeleteEventTagResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventTagResponse.
 * Use `create(DeleteEventTagResponseSchema)` to create a new message.
 */
export declare const DeleteEventTagResponseSchema: GenMessage<DeleteEventTagResponse>;
/**
 * @generated from message domain.event.v1.ListEventTagsRequest
 */
export type ListEventTagsRequest = Message<"domain.event.v1.ListEventTagsRequest"> & {
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
 * Describes the message domain.event.v1.ListEventTagsRequest.
 * Use `create(ListEventTagsRequestSchema)` to create a new message.
 */
export declare const ListEventTagsRequestSchema: GenMessage<ListEventTagsRequest>;
/**
 * @generated from message domain.event.v1.ListEventTagsResponse
 */
export type ListEventTagsResponse = Message<"domain.event.v1.ListEventTagsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTag data = 1;
     */
    data: EventTag[];
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
 * Describes the message domain.event.v1.ListEventTagsResponse.
 * Use `create(ListEventTagsResponseSchema)` to create a new message.
 */
export declare const ListEventTagsResponseSchema: GenMessage<ListEventTagsResponse>;
/**
 * @generated from message domain.event.v1.GetEventTagListPageDataRequest
 */
export type GetEventTagListPageDataRequest = Message<"domain.event.v1.GetEventTagListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventTagListPageDataRequest.
 * Use `create(GetEventTagListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventTagListPageDataRequestSchema: GenMessage<GetEventTagListPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventTagListPageDataResponse
 */
export type GetEventTagListPageDataResponse = Message<"domain.event.v1.GetEventTagListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTag event_tag_list = 1;
     */
    eventTagList: EventTag[];
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
 * Describes the message domain.event.v1.GetEventTagListPageDataResponse.
 * Use `create(GetEventTagListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventTagListPageDataResponseSchema: GenMessage<GetEventTagListPageDataResponse>;
/**
 * @generated from message domain.event.v1.GetEventTagItemPageDataRequest
 */
export type GetEventTagItemPageDataRequest = Message<"domain.event.v1.GetEventTagItemPageDataRequest"> & {
    /**
     * @generated from field: string event_tag_id = 1;
     */
    eventTagId: string;
};
/**
 * Describes the message domain.event.v1.GetEventTagItemPageDataRequest.
 * Use `create(GetEventTagItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventTagItemPageDataRequestSchema: GenMessage<GetEventTagItemPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventTagItemPageDataResponse
 */
export type GetEventTagItemPageDataResponse = Message<"domain.event.v1.GetEventTagItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.event.v1.EventTag event_tag = 1;
     */
    eventTag?: EventTag;
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
 * Describes the message domain.event.v1.GetEventTagItemPageDataResponse.
 * Use `create(GetEventTagItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventTagItemPageDataResponseSchema: GenMessage<GetEventTagItemPageDataResponse>;
/**
 * @generated from service domain.event.v1.EventTagDomainService
 */
export declare const EventTagDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.CreateEventTag
     */
    createEventTag: {
        methodKind: "unary";
        input: typeof CreateEventTagRequestSchema;
        output: typeof CreateEventTagResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.ReadEventTag
     */
    readEventTag: {
        methodKind: "unary";
        input: typeof ReadEventTagRequestSchema;
        output: typeof ReadEventTagResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.UpdateEventTag
     */
    updateEventTag: {
        methodKind: "unary";
        input: typeof UpdateEventTagRequestSchema;
        output: typeof UpdateEventTagResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.DeleteEventTag
     */
    deleteEventTag: {
        methodKind: "unary";
        input: typeof DeleteEventTagRequestSchema;
        output: typeof DeleteEventTagResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.ListEventTags
     */
    listEventTags: {
        methodKind: "unary";
        input: typeof ListEventTagsRequestSchema;
        output: typeof ListEventTagsResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.GetEventTagListPageData
     */
    getEventTagListPageData: {
        methodKind: "unary";
        input: typeof GetEventTagListPageDataRequestSchema;
        output: typeof GetEventTagListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagDomainService.GetEventTagItemPageData
     */
    getEventTagItemPageData: {
        methodKind: "unary";
        input: typeof GetEventTagItemPageDataRequestSchema;
        output: typeof GetEventTagItemPageDataResponseSchema;
    };
}>;
