import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_attendee/event_attendee.proto.
 */
export declare const file_domain_event_event_attendee_event_attendee: GenFile;
/**
 * EventAttendee represents a participant in an event.
 * Evolves from EventClient with richer role/status model aligned to RFC 5545.
 * Supports both client attendees (client_id) and staff attendees (workspace_user_id).
 *
 * @generated from message domain.event.v1.EventAttendee
 */
export type EventAttendee = Message<"domain.event.v1.EventAttendee"> & {
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
     * Client FK (optional — for customer/external attendees)
     *
     * @generated from field: optional string client_id = 3;
     */
    clientId?: string;
    /**
     * Workspace user FK (optional — for staff/internal attendees)
     *
     * @generated from field: optional string workspace_user_id = 4;
     */
    workspaceUserId?: string;
    /**
     * Participation role
     *
     * @generated from field: domain.event.v1.AttendeeRole role = 5;
     */
    role: AttendeeRole;
    /**
     * Response status
     *
     * @generated from field: domain.event.v1.AttendeeStatus status = 6;
     */
    status: AttendeeStatus;
    /**
     * Whether this attendee is the event organizer
     *
     * @generated from field: bool is_organizer = 7;
     */
    isOrganizer: boolean;
    /**
     * Display name snapshot (for external attendees without client/user record)
     *
     * @generated from field: optional string display_name = 8;
     */
    displayName?: string;
    /**
     * Tenant scope
     *
     * @generated from field: string workspace_id = 9;
     */
    workspaceId: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 10;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 11;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 12;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 13;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 14;
     */
    active: boolean;
};
/**
 * Describes the message domain.event.v1.EventAttendee.
 * Use `create(EventAttendeeSchema)` to create a new message.
 */
export declare const EventAttendeeSchema: GenMessage<EventAttendee>;
/**
 * @generated from message domain.event.v1.CreateEventAttendeeRequest
 */
export type CreateEventAttendeeRequest = Message<"domain.event.v1.CreateEventAttendeeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttendee data = 1;
     */
    data?: EventAttendee;
};
/**
 * Describes the message domain.event.v1.CreateEventAttendeeRequest.
 * Use `create(CreateEventAttendeeRequestSchema)` to create a new message.
 */
export declare const CreateEventAttendeeRequestSchema: GenMessage<CreateEventAttendeeRequest>;
/**
 * @generated from message domain.event.v1.CreateEventAttendeeResponse
 */
export type CreateEventAttendeeResponse = Message<"domain.event.v1.CreateEventAttendeeResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttendee data = 1;
     */
    data: EventAttendee[];
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
 * Describes the message domain.event.v1.CreateEventAttendeeResponse.
 * Use `create(CreateEventAttendeeResponseSchema)` to create a new message.
 */
export declare const CreateEventAttendeeResponseSchema: GenMessage<CreateEventAttendeeResponse>;
/**
 * @generated from message domain.event.v1.ReadEventAttendeeRequest
 */
export type ReadEventAttendeeRequest = Message<"domain.event.v1.ReadEventAttendeeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttendee data = 1;
     */
    data?: EventAttendee;
};
/**
 * Describes the message domain.event.v1.ReadEventAttendeeRequest.
 * Use `create(ReadEventAttendeeRequestSchema)` to create a new message.
 */
export declare const ReadEventAttendeeRequestSchema: GenMessage<ReadEventAttendeeRequest>;
/**
 * @generated from message domain.event.v1.ReadEventAttendeeResponse
 */
export type ReadEventAttendeeResponse = Message<"domain.event.v1.ReadEventAttendeeResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttendee data = 1;
     */
    data: EventAttendee[];
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
 * Describes the message domain.event.v1.ReadEventAttendeeResponse.
 * Use `create(ReadEventAttendeeResponseSchema)` to create a new message.
 */
export declare const ReadEventAttendeeResponseSchema: GenMessage<ReadEventAttendeeResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventAttendeeRequest
 */
export type UpdateEventAttendeeRequest = Message<"domain.event.v1.UpdateEventAttendeeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttendee data = 1;
     */
    data?: EventAttendee;
};
/**
 * Describes the message domain.event.v1.UpdateEventAttendeeRequest.
 * Use `create(UpdateEventAttendeeRequestSchema)` to create a new message.
 */
export declare const UpdateEventAttendeeRequestSchema: GenMessage<UpdateEventAttendeeRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventAttendeeResponse
 */
export type UpdateEventAttendeeResponse = Message<"domain.event.v1.UpdateEventAttendeeResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttendee data = 1;
     */
    data: EventAttendee[];
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
 * Describes the message domain.event.v1.UpdateEventAttendeeResponse.
 * Use `create(UpdateEventAttendeeResponseSchema)` to create a new message.
 */
export declare const UpdateEventAttendeeResponseSchema: GenMessage<UpdateEventAttendeeResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventAttendeeRequest
 */
export type DeleteEventAttendeeRequest = Message<"domain.event.v1.DeleteEventAttendeeRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventAttendee data = 1;
     */
    data?: EventAttendee;
};
/**
 * Describes the message domain.event.v1.DeleteEventAttendeeRequest.
 * Use `create(DeleteEventAttendeeRequestSchema)` to create a new message.
 */
export declare const DeleteEventAttendeeRequestSchema: GenMessage<DeleteEventAttendeeRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventAttendeeResponse
 */
export type DeleteEventAttendeeResponse = Message<"domain.event.v1.DeleteEventAttendeeResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventAttendeeResponse.
 * Use `create(DeleteEventAttendeeResponseSchema)` to create a new message.
 */
export declare const DeleteEventAttendeeResponseSchema: GenMessage<DeleteEventAttendeeResponse>;
/**
 * @generated from message domain.event.v1.ListEventAttendeesRequest
 */
export type ListEventAttendeesRequest = Message<"domain.event.v1.ListEventAttendeesRequest"> & {
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
 * Describes the message domain.event.v1.ListEventAttendeesRequest.
 * Use `create(ListEventAttendeesRequestSchema)` to create a new message.
 */
export declare const ListEventAttendeesRequestSchema: GenMessage<ListEventAttendeesRequest>;
/**
 * @generated from message domain.event.v1.ListEventAttendeesResponse
 */
export type ListEventAttendeesResponse = Message<"domain.event.v1.ListEventAttendeesResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttendee data = 1;
     */
    data: EventAttendee[];
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
 * Describes the message domain.event.v1.ListEventAttendeesResponse.
 * Use `create(ListEventAttendeesResponseSchema)` to create a new message.
 */
export declare const ListEventAttendeesResponseSchema: GenMessage<ListEventAttendeesResponse>;
/**
 * @generated from message domain.event.v1.GetEventAttendeeListPageDataRequest
 */
export type GetEventAttendeeListPageDataRequest = Message<"domain.event.v1.GetEventAttendeeListPageDataRequest"> & {
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
 * Describes the message domain.event.v1.GetEventAttendeeListPageDataRequest.
 * Use `create(GetEventAttendeeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventAttendeeListPageDataRequestSchema: GenMessage<GetEventAttendeeListPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventAttendeeListPageDataResponse
 */
export type GetEventAttendeeListPageDataResponse = Message<"domain.event.v1.GetEventAttendeeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventAttendee event_attendee_list = 1;
     */
    eventAttendeeList: EventAttendee[];
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
 * Describes the message domain.event.v1.GetEventAttendeeListPageDataResponse.
 * Use `create(GetEventAttendeeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventAttendeeListPageDataResponseSchema: GenMessage<GetEventAttendeeListPageDataResponse>;
/**
 * @generated from message domain.event.v1.GetEventAttendeeItemPageDataRequest
 */
export type GetEventAttendeeItemPageDataRequest = Message<"domain.event.v1.GetEventAttendeeItemPageDataRequest"> & {
    /**
     * @generated from field: string event_attendee_id = 1;
     */
    eventAttendeeId: string;
};
/**
 * Describes the message domain.event.v1.GetEventAttendeeItemPageDataRequest.
 * Use `create(GetEventAttendeeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEventAttendeeItemPageDataRequestSchema: GenMessage<GetEventAttendeeItemPageDataRequest>;
/**
 * @generated from message domain.event.v1.GetEventAttendeeItemPageDataResponse
 */
export type GetEventAttendeeItemPageDataResponse = Message<"domain.event.v1.GetEventAttendeeItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.event.v1.EventAttendee event_attendee = 1;
     */
    eventAttendee?: EventAttendee;
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
 * Describes the message domain.event.v1.GetEventAttendeeItemPageDataResponse.
 * Use `create(GetEventAttendeeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEventAttendeeItemPageDataResponseSchema: GenMessage<GetEventAttendeeItemPageDataResponse>;
/**
 * AttendeeRole defines the participation role (RFC 5545 ROLE alignment).
 *
 * @generated from enum domain.event.v1.AttendeeRole
 */
export declare enum AttendeeRole {
    /**
     * @generated from enum value: ATTENDEE_ROLE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * REQ-PARTICIPANT
     *
     * @generated from enum value: ATTENDEE_ROLE_REQUIRED = 1;
     */
    REQUIRED = 1,
    /**
     * OPT-PARTICIPANT
     *
     * @generated from enum value: ATTENDEE_ROLE_OPTIONAL = 2;
     */
    OPTIONAL = 2,
    /**
     * CHAIR (meeting organizer/leader)
     *
     * @generated from enum value: ATTENDEE_ROLE_CHAIR = 3;
     */
    CHAIR = 3,
    /**
     * NON-PARTICIPANT (informational)
     *
     * @generated from enum value: ATTENDEE_ROLE_RESOURCE = 4;
     */
    RESOURCE = 4
}
/**
 * Describes the enum domain.event.v1.AttendeeRole.
 */
export declare const AttendeeRoleSchema: GenEnum<AttendeeRole>;
/**
 * AttendeeStatus defines the response status (RFC 5545 PARTSTAT alignment).
 *
 * @generated from enum domain.event.v1.AttendeeStatus
 */
export declare enum AttendeeStatus {
    /**
     * @generated from enum value: ATTENDEE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * No response yet
     *
     * @generated from enum value: ATTENDEE_STATUS_NEEDS_ACTION = 1;
     */
    NEEDS_ACTION = 1,
    /**
     * Confirmed attendance
     *
     * @generated from enum value: ATTENDEE_STATUS_ACCEPTED = 2;
     */
    ACCEPTED = 2,
    /**
     * Declined
     *
     * @generated from enum value: ATTENDEE_STATUS_DECLINED = 3;
     */
    DECLINED = 3,
    /**
     * Tentatively accepted
     *
     * @generated from enum value: ATTENDEE_STATUS_TENTATIVE = 4;
     */
    TENTATIVE = 4
}
/**
 * Describes the enum domain.event.v1.AttendeeStatus.
 */
export declare const AttendeeStatusSchema: GenEnum<AttendeeStatus>;
/**
 * @generated from service domain.event.v1.EventAttendeeDomainService
 */
export declare const EventAttendeeDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.CreateEventAttendee
     */
    createEventAttendee: {
        methodKind: "unary";
        input: typeof CreateEventAttendeeRequestSchema;
        output: typeof CreateEventAttendeeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.ReadEventAttendee
     */
    readEventAttendee: {
        methodKind: "unary";
        input: typeof ReadEventAttendeeRequestSchema;
        output: typeof ReadEventAttendeeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.UpdateEventAttendee
     */
    updateEventAttendee: {
        methodKind: "unary";
        input: typeof UpdateEventAttendeeRequestSchema;
        output: typeof UpdateEventAttendeeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.DeleteEventAttendee
     */
    deleteEventAttendee: {
        methodKind: "unary";
        input: typeof DeleteEventAttendeeRequestSchema;
        output: typeof DeleteEventAttendeeResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.ListEventAttendees
     */
    listEventAttendees: {
        methodKind: "unary";
        input: typeof ListEventAttendeesRequestSchema;
        output: typeof ListEventAttendeesResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.GetEventAttendeeListPageData
     */
    getEventAttendeeListPageData: {
        methodKind: "unary";
        input: typeof GetEventAttendeeListPageDataRequestSchema;
        output: typeof GetEventAttendeeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventAttendeeDomainService.GetEventAttendeeItemPageData
     */
    getEventAttendeeItemPageData: {
        methodKind: "unary";
        input: typeof GetEventAttendeeItemPageDataRequestSchema;
        output: typeof GetEventAttendeeItemPageDataResponseSchema;
    };
}>;
