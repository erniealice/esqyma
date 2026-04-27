import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_tag_assignment/event_tag_assignment.proto.
 */
export declare const file_domain_event_event_tag_assignment_event_tag_assignment: GenFile;
/**
 * EventTagAssignment is the many-to-many join between Event and EventTag.
 * `position` drives the primary-tag display rule:
 *   - position = 0 → primary tag; color paints the left stripe on
 *     week/day view chips and is the first dot in month view.
 *   - positions 1..N → secondary tags; render as additional dots.
 * Unique constraint on (event_id, event_tag_id) prevents duplicate
 * assignments of the same tag to the same event.
 *
 * @generated from message domain.event.v1.EventTagAssignment
 */
export type EventTagAssignment = Message<"domain.event.v1.EventTagAssignment"> & {
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
     * EventTag FK (required)
     *
     * @generated from field: string event_tag_id = 3;
     */
    eventTagId: string;
    /**
     * Display order (0 = primary tag, drives stripe color on chips).
     *
     * @generated from field: int32 position = 4;
     */
    position: number;
    /**
     * Tenant scope (denormalized for tenant-scoped queries and RLS).
     *
     * @generated from field: string workspace_id = 5;
     */
    workspaceId: string;
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
 * Describes the message domain.event.v1.EventTagAssignment.
 * Use `create(EventTagAssignmentSchema)` to create a new message.
 */
export declare const EventTagAssignmentSchema: GenMessage<EventTagAssignment>;
/**
 * @generated from message domain.event.v1.CreateEventTagAssignmentRequest
 */
export type CreateEventTagAssignmentRequest = Message<"domain.event.v1.CreateEventTagAssignmentRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTagAssignment data = 1;
     */
    data?: EventTagAssignment;
};
/**
 * Describes the message domain.event.v1.CreateEventTagAssignmentRequest.
 * Use `create(CreateEventTagAssignmentRequestSchema)` to create a new message.
 */
export declare const CreateEventTagAssignmentRequestSchema: GenMessage<CreateEventTagAssignmentRequest>;
/**
 * @generated from message domain.event.v1.CreateEventTagAssignmentResponse
 */
export type CreateEventTagAssignmentResponse = Message<"domain.event.v1.CreateEventTagAssignmentResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTagAssignment data = 1;
     */
    data: EventTagAssignment[];
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
 * Describes the message domain.event.v1.CreateEventTagAssignmentResponse.
 * Use `create(CreateEventTagAssignmentResponseSchema)` to create a new message.
 */
export declare const CreateEventTagAssignmentResponseSchema: GenMessage<CreateEventTagAssignmentResponse>;
/**
 * @generated from message domain.event.v1.ReadEventTagAssignmentRequest
 */
export type ReadEventTagAssignmentRequest = Message<"domain.event.v1.ReadEventTagAssignmentRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTagAssignment data = 1;
     */
    data?: EventTagAssignment;
};
/**
 * Describes the message domain.event.v1.ReadEventTagAssignmentRequest.
 * Use `create(ReadEventTagAssignmentRequestSchema)` to create a new message.
 */
export declare const ReadEventTagAssignmentRequestSchema: GenMessage<ReadEventTagAssignmentRequest>;
/**
 * @generated from message domain.event.v1.ReadEventTagAssignmentResponse
 */
export type ReadEventTagAssignmentResponse = Message<"domain.event.v1.ReadEventTagAssignmentResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTagAssignment data = 1;
     */
    data: EventTagAssignment[];
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
 * Describes the message domain.event.v1.ReadEventTagAssignmentResponse.
 * Use `create(ReadEventTagAssignmentResponseSchema)` to create a new message.
 */
export declare const ReadEventTagAssignmentResponseSchema: GenMessage<ReadEventTagAssignmentResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventTagAssignmentRequest
 */
export type DeleteEventTagAssignmentRequest = Message<"domain.event.v1.DeleteEventTagAssignmentRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventTagAssignment data = 1;
     */
    data?: EventTagAssignment;
};
/**
 * Describes the message domain.event.v1.DeleteEventTagAssignmentRequest.
 * Use `create(DeleteEventTagAssignmentRequestSchema)` to create a new message.
 */
export declare const DeleteEventTagAssignmentRequestSchema: GenMessage<DeleteEventTagAssignmentRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventTagAssignmentResponse
 */
export type DeleteEventTagAssignmentResponse = Message<"domain.event.v1.DeleteEventTagAssignmentResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventTagAssignmentResponse.
 * Use `create(DeleteEventTagAssignmentResponseSchema)` to create a new message.
 */
export declare const DeleteEventTagAssignmentResponseSchema: GenMessage<DeleteEventTagAssignmentResponse>;
/**
 * @generated from message domain.event.v1.ListEventTagAssignmentsRequest
 */
export type ListEventTagAssignmentsRequest = Message<"domain.event.v1.ListEventTagAssignmentsRequest"> & {
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
 * Describes the message domain.event.v1.ListEventTagAssignmentsRequest.
 * Use `create(ListEventTagAssignmentsRequestSchema)` to create a new message.
 */
export declare const ListEventTagAssignmentsRequestSchema: GenMessage<ListEventTagAssignmentsRequest>;
/**
 * @generated from message domain.event.v1.ListEventTagAssignmentsResponse
 */
export type ListEventTagAssignmentsResponse = Message<"domain.event.v1.ListEventTagAssignmentsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventTagAssignment data = 1;
     */
    data: EventTagAssignment[];
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
 * Describes the message domain.event.v1.ListEventTagAssignmentsResponse.
 * Use `create(ListEventTagAssignmentsResponseSchema)` to create a new message.
 */
export declare const ListEventTagAssignmentsResponseSchema: GenMessage<ListEventTagAssignmentsResponse>;
/**
 * @generated from service domain.event.v1.EventTagAssignmentDomainService
 */
export declare const EventTagAssignmentDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventTagAssignmentDomainService.CreateEventTagAssignment
     */
    createEventTagAssignment: {
        methodKind: "unary";
        input: typeof CreateEventTagAssignmentRequestSchema;
        output: typeof CreateEventTagAssignmentResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagAssignmentDomainService.ReadEventTagAssignment
     */
    readEventTagAssignment: {
        methodKind: "unary";
        input: typeof ReadEventTagAssignmentRequestSchema;
        output: typeof ReadEventTagAssignmentResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagAssignmentDomainService.DeleteEventTagAssignment
     */
    deleteEventTagAssignment: {
        methodKind: "unary";
        input: typeof DeleteEventTagAssignmentRequestSchema;
        output: typeof DeleteEventTagAssignmentResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventTagAssignmentDomainService.ListEventTagAssignments
     */
    listEventTagAssignments: {
        methodKind: "unary";
        input: typeof ListEventTagAssignmentsRequestSchema;
        output: typeof ListEventTagAssignmentsResponseSchema;
    };
}>;
