import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_resource/event_resource.proto.
 */
export declare const file_domain_event_event_resource_event_resource: GenFile;
/**
 * EventResource represents a resource (staff, room, equipment) assigned to an event.
 * Enables FHIR-style Schedule/Slot availability computation in cyta's availability engine.
 *
 * @generated from message domain.event.v1.EventResource
 */
export type EventResource = Message<"domain.event.v1.EventResource"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Event FK (required)
     *
     * @generated from field: string event_id = 2;
     */
    eventId: string;
    /**
     * Generic resource identifier (workspace_user.id, location.id, or equipment ID)
     *
     * @generated from field: string resource_id = 3;
     */
    resourceId: string;
    /**
     * What kind of resource this is
     *
     * @generated from field: domain.event.v1.ResourceType resource_type = 4;
     */
    resourceType: ResourceType;
    /**
     * Assignment status
     *
     * @generated from field: domain.event.v1.ResourceStatus status = 5;
     */
    status: ResourceStatus;
    /**
     * Snapshot of resource name at assignment time (denormalized for display)
     *
     * @generated from field: optional string name = 6;
     */
    name?: string;
    /**
     * Tenant scope
     *
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 10;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 11;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 12;
     */
    active: boolean;
};
/**
 * Describes the message domain.event.v1.EventResource.
 * Use `create(EventResourceSchema)` to create a new message.
 */
export declare const EventResourceSchema: GenMessage<EventResource>;
/**
 * @generated from message domain.event.v1.CreateEventResourceRequest
 */
export type CreateEventResourceRequest = Message<"domain.event.v1.CreateEventResourceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventResource data = 1;
     */
    data?: EventResource;
};
/**
 * Describes the message domain.event.v1.CreateEventResourceRequest.
 * Use `create(CreateEventResourceRequestSchema)` to create a new message.
 */
export declare const CreateEventResourceRequestSchema: GenMessage<CreateEventResourceRequest>;
/**
 * @generated from message domain.event.v1.CreateEventResourceResponse
 */
export type CreateEventResourceResponse = Message<"domain.event.v1.CreateEventResourceResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventResource data = 1;
     */
    data: EventResource[];
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
 * Describes the message domain.event.v1.CreateEventResourceResponse.
 * Use `create(CreateEventResourceResponseSchema)` to create a new message.
 */
export declare const CreateEventResourceResponseSchema: GenMessage<CreateEventResourceResponse>;
/**
 * @generated from message domain.event.v1.ReadEventResourceRequest
 */
export type ReadEventResourceRequest = Message<"domain.event.v1.ReadEventResourceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventResource data = 1;
     */
    data?: EventResource;
};
/**
 * Describes the message domain.event.v1.ReadEventResourceRequest.
 * Use `create(ReadEventResourceRequestSchema)` to create a new message.
 */
export declare const ReadEventResourceRequestSchema: GenMessage<ReadEventResourceRequest>;
/**
 * @generated from message domain.event.v1.ReadEventResourceResponse
 */
export type ReadEventResourceResponse = Message<"domain.event.v1.ReadEventResourceResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventResource data = 1;
     */
    data: EventResource[];
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
 * Describes the message domain.event.v1.ReadEventResourceResponse.
 * Use `create(ReadEventResourceResponseSchema)` to create a new message.
 */
export declare const ReadEventResourceResponseSchema: GenMessage<ReadEventResourceResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventResourceRequest
 */
export type UpdateEventResourceRequest = Message<"domain.event.v1.UpdateEventResourceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventResource data = 1;
     */
    data?: EventResource;
};
/**
 * Describes the message domain.event.v1.UpdateEventResourceRequest.
 * Use `create(UpdateEventResourceRequestSchema)` to create a new message.
 */
export declare const UpdateEventResourceRequestSchema: GenMessage<UpdateEventResourceRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventResourceResponse
 */
export type UpdateEventResourceResponse = Message<"domain.event.v1.UpdateEventResourceResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventResource data = 1;
     */
    data: EventResource[];
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
 * Describes the message domain.event.v1.UpdateEventResourceResponse.
 * Use `create(UpdateEventResourceResponseSchema)` to create a new message.
 */
export declare const UpdateEventResourceResponseSchema: GenMessage<UpdateEventResourceResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventResourceRequest
 */
export type DeleteEventResourceRequest = Message<"domain.event.v1.DeleteEventResourceRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventResource data = 1;
     */
    data?: EventResource;
};
/**
 * Describes the message domain.event.v1.DeleteEventResourceRequest.
 * Use `create(DeleteEventResourceRequestSchema)` to create a new message.
 */
export declare const DeleteEventResourceRequestSchema: GenMessage<DeleteEventResourceRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventResourceResponse
 */
export type DeleteEventResourceResponse = Message<"domain.event.v1.DeleteEventResourceResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventResourceResponse.
 * Use `create(DeleteEventResourceResponseSchema)` to create a new message.
 */
export declare const DeleteEventResourceResponseSchema: GenMessage<DeleteEventResourceResponse>;
/**
 * @generated from message domain.event.v1.ListEventResourcesRequest
 */
export type ListEventResourcesRequest = Message<"domain.event.v1.ListEventResourcesRequest"> & {
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
 * Describes the message domain.event.v1.ListEventResourcesRequest.
 * Use `create(ListEventResourcesRequestSchema)` to create a new message.
 */
export declare const ListEventResourcesRequestSchema: GenMessage<ListEventResourcesRequest>;
/**
 * @generated from message domain.event.v1.ListEventResourcesResponse
 */
export type ListEventResourcesResponse = Message<"domain.event.v1.ListEventResourcesResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventResource data = 1;
     */
    data: EventResource[];
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
 * Describes the message domain.event.v1.ListEventResourcesResponse.
 * Use `create(ListEventResourcesResponseSchema)` to create a new message.
 */
export declare const ListEventResourcesResponseSchema: GenMessage<ListEventResourcesResponse>;
/**
 * @generated from message domain.event.v1.GetEventResourceListPageDataRequest
 */
export type GetEventResourceListPageDataRequest = Message<"domain.event.v1.GetEventResourceListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventResourceListPageDataRequest.
 * Use `create(GetEventResourceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventResourceListPageDataRequestSchema: GenMessage<GetEventResourceListPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventResourceListPageDataResponse
 */
export type GetEventResourceListPageDataResponse = Message<"domain.event.v1.GetEventResourceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventResource event_resource_list = 1;
     */
    eventResourceList: EventResource[];
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
 * Describes the message domain.event.v1.GetEventResourceListPageDataResponse.
 * Use `create(GetEventResourceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventResourceListPageDataResponseSchema: GenMessage<GetEventResourceListPageDataResponse>;
/**
 * @generated from message domain.event.v1.GetEventResourceItemPageDataRequest
 */
export type GetEventResourceItemPageDataRequest = Message<"domain.event.v1.GetEventResourceItemPageDataRequest"> & {
    /**
     * @generated from field: string event_resource_id = 1;
     */
    eventResourceId: string;
};
/**
 * Describes the message domain.event.v1.GetEventResourceItemPageDataRequest.
 * Use `create(GetEventResourceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventResourceItemPageDataRequestSchema: GenMessage<GetEventResourceItemPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventResourceItemPageDataResponse
 */
export type GetEventResourceItemPageDataResponse = Message<"domain.event.v1.GetEventResourceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.event.v1.EventResource event_resource = 1;
     */
    eventResource?: EventResource;
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
 * Describes the message domain.event.v1.GetEventResourceItemPageDataResponse.
 * Use `create(GetEventResourceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventResourceItemPageDataResponseSchema: GenMessage<GetEventResourceItemPageDataResponse>;
/**
 * ResourceType classifies what kind of resource is assigned to an event.
 *
 * @generated from enum domain.event.v1.ResourceType
 */
export declare enum ResourceType {
    /**
     * @generated from enum value: RESOURCE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Staff member (workspace_user)
     *
     * @generated from enum value: RESOURCE_TYPE_STAFF = 1;
     */
    STAFF = 1,
    /**
     * Physical room/location
     *
     * @generated from enum value: RESOURCE_TYPE_ROOM = 2;
     */
    ROOM = 2,
    /**
     * Equipment/tool
     *
     * @generated from enum value: RESOURCE_TYPE_EQUIPMENT = 3;
     */
    EQUIPMENT = 3
}
/**
 * Describes the enum domain.event.v1.ResourceType.
 */
export declare const ResourceTypeSchema: GenEnum<ResourceType>;
/**
 * ResourceStatus tracks the assignment lifecycle.
 *
 * @generated from enum domain.event.v1.ResourceStatus
 */
export declare enum ResourceStatus {
    /**
     * @generated from enum value: RESOURCE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Initially assigned
     *
     * @generated from enum value: RESOURCE_STATUS_ASSIGNED = 1;
     */
    ASSIGNED = 1,
    /**
     * Resource confirmed availability
     *
     * @generated from enum value: RESOURCE_STATUS_CONFIRMED = 2;
     */
    CONFIRMED = 2,
    /**
     * Unassigned / freed
     *
     * @generated from enum value: RESOURCE_STATUS_RELEASED = 3;
     */
    RELEASED = 3
}
/**
 * Describes the enum domain.event.v1.ResourceStatus.
 */
export declare const ResourceStatusSchema: GenEnum<ResourceStatus>;
/**
 * @generated from service domain.event.v1.EventResourceDomainService
 */
export declare const EventResourceDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.CreateEventResource
     */
    createEventResource: {
        methodKind: "unary";
        input: typeof CreateEventResourceRequestSchema;
        output: typeof CreateEventResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.ReadEventResource
     */
    readEventResource: {
        methodKind: "unary";
        input: typeof ReadEventResourceRequestSchema;
        output: typeof ReadEventResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.UpdateEventResource
     */
    updateEventResource: {
        methodKind: "unary";
        input: typeof UpdateEventResourceRequestSchema;
        output: typeof UpdateEventResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.DeleteEventResource
     */
    deleteEventResource: {
        methodKind: "unary";
        input: typeof DeleteEventResourceRequestSchema;
        output: typeof DeleteEventResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.ListEventResources
     */
    listEventResources: {
        methodKind: "unary";
        input: typeof ListEventResourcesRequestSchema;
        output: typeof ListEventResourcesResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.GetEventResourceListPageData
     */
    getEventResourceListPageData: {
        methodKind: "unary";
        input: typeof GetEventResourceListPageDataRequestSchema;
        output: typeof GetEventResourceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventResourceDomainService.GetEventResourceItemPageData
     */
    getEventResourceItemPageData: {
        methodKind: "unary";
        input: typeof GetEventResourceItemPageDataRequestSchema;
        output: typeof GetEventResourceItemPageDataResponseSchema;
    };
}>;
