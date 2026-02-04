import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_settings/event_settings.proto.
 */
export declare const file_domain_event_event_settings_event_settings: GenFile;
/**
 * Defines the settings for an event, including its schedule and recurrence.
 *
 * @generated from message domain.event.v1.EventSettings
 */
export type EventSettings = Message<"domain.event.v1.EventSettings"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 3;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 5;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string event_id = 7;
     */
    eventId: string;
    /**
     * Start date and time in UTC timestamp
     *
     * @generated from field: int64 start_date_time_utc = 8;
     */
    startDateTimeUtc: bigint;
    /**
     * End date and time in UTC timestamp
     *
     * @generated from field: int64 end_date_time_utc = 9;
     */
    endDateTimeUtc: bigint;
    /**
     * Timezone in IANA format (e.g., "America/New_York")
     *
     * @generated from field: string timezone = 10;
     */
    timezone: string;
    /**
     * Reference to external recurrence configuration
     *
     * @generated from field: string event_recurrence_id = 11;
     */
    eventRecurrenceId: string;
};
/**
 * Describes the message domain.event.v1.EventSettings.
 * Use `create(EventSettingsSchema)` to create a new message.
 */
export declare const EventSettingsSchema: GenMessage<EventSettings>;
/**
 * @generated from message domain.event.v1.CreateEventSettingsRequest
 */
export type CreateEventSettingsRequest = Message<"domain.event.v1.CreateEventSettingsRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventSettings data = 1;
     */
    data?: EventSettings;
};
/**
 * Describes the message domain.event.v1.CreateEventSettingsRequest.
 * Use `create(CreateEventSettingsRequestSchema)` to create a new message.
 */
export declare const CreateEventSettingsRequestSchema: GenMessage<CreateEventSettingsRequest>;
/**
 * @generated from message domain.event.v1.CreateEventSettingsResponse
 */
export type CreateEventSettingsResponse = Message<"domain.event.v1.CreateEventSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventSettings data = 1;
     */
    data: EventSettings[];
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
 * Describes the message domain.event.v1.CreateEventSettingsResponse.
 * Use `create(CreateEventSettingsResponseSchema)` to create a new message.
 */
export declare const CreateEventSettingsResponseSchema: GenMessage<CreateEventSettingsResponse>;
/**
 * @generated from message domain.event.v1.ReadEventSettingsRequest
 */
export type ReadEventSettingsRequest = Message<"domain.event.v1.ReadEventSettingsRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventSettings data = 1;
     */
    data?: EventSettings;
};
/**
 * Describes the message domain.event.v1.ReadEventSettingsRequest.
 * Use `create(ReadEventSettingsRequestSchema)` to create a new message.
 */
export declare const ReadEventSettingsRequestSchema: GenMessage<ReadEventSettingsRequest>;
/**
 * @generated from message domain.event.v1.ReadEventSettingsResponse
 */
export type ReadEventSettingsResponse = Message<"domain.event.v1.ReadEventSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventSettings data = 1;
     */
    data: EventSettings[];
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
 * Describes the message domain.event.v1.ReadEventSettingsResponse.
 * Use `create(ReadEventSettingsResponseSchema)` to create a new message.
 */
export declare const ReadEventSettingsResponseSchema: GenMessage<ReadEventSettingsResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventSettingsRequest
 */
export type UpdateEventSettingsRequest = Message<"domain.event.v1.UpdateEventSettingsRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventSettings data = 1;
     */
    data?: EventSettings;
};
/**
 * Describes the message domain.event.v1.UpdateEventSettingsRequest.
 * Use `create(UpdateEventSettingsRequestSchema)` to create a new message.
 */
export declare const UpdateEventSettingsRequestSchema: GenMessage<UpdateEventSettingsRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventSettingsResponse
 */
export type UpdateEventSettingsResponse = Message<"domain.event.v1.UpdateEventSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventSettings data = 1;
     */
    data: EventSettings[];
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
 * Describes the message domain.event.v1.UpdateEventSettingsResponse.
 * Use `create(UpdateEventSettingsResponseSchema)` to create a new message.
 */
export declare const UpdateEventSettingsResponseSchema: GenMessage<UpdateEventSettingsResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventSettingsRequest
 */
export type DeleteEventSettingsRequest = Message<"domain.event.v1.DeleteEventSettingsRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventSettings data = 1;
     */
    data?: EventSettings;
};
/**
 * Describes the message domain.event.v1.DeleteEventSettingsRequest.
 * Use `create(DeleteEventSettingsRequestSchema)` to create a new message.
 */
export declare const DeleteEventSettingsRequestSchema: GenMessage<DeleteEventSettingsRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventSettingsResponse
 */
export type DeleteEventSettingsResponse = Message<"domain.event.v1.DeleteEventSettingsResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventSettingsResponse.
 * Use `create(DeleteEventSettingsResponseSchema)` to create a new message.
 */
export declare const DeleteEventSettingsResponseSchema: GenMessage<DeleteEventSettingsResponse>;
/**
 * @generated from message domain.event.v1.ListEventSettingsRequest
 */
export type ListEventSettingsRequest = Message<"domain.event.v1.ListEventSettingsRequest"> & {
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
 * Describes the message domain.event.v1.ListEventSettingsRequest.
 * Use `create(ListEventSettingsRequestSchema)` to create a new message.
 */
export declare const ListEventSettingsRequestSchema: GenMessage<ListEventSettingsRequest>;
/**
 * @generated from message domain.event.v1.ListEventSettingsResponse
 */
export type ListEventSettingsResponse = Message<"domain.event.v1.ListEventSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventSettings data = 1;
     */
    data: EventSettings[];
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
 * Describes the message domain.event.v1.ListEventSettingsResponse.
 * Use `create(ListEventSettingsResponseSchema)` to create a new message.
 */
export declare const ListEventSettingsResponseSchema: GenMessage<ListEventSettingsResponse>;
/**
 * @generated from service domain.event.v1.EventSettingsDomainService
 */
export declare const EventSettingsDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventSettingsDomainService.CreateEventSettings
     */
    createEventSettings: {
        methodKind: "unary";
        input: typeof CreateEventSettingsRequestSchema;
        output: typeof CreateEventSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventSettingsDomainService.ReadEventSettings
     */
    readEventSettings: {
        methodKind: "unary";
        input: typeof ReadEventSettingsRequestSchema;
        output: typeof ReadEventSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventSettingsDomainService.UpdateEventSettings
     */
    updateEventSettings: {
        methodKind: "unary";
        input: typeof UpdateEventSettingsRequestSchema;
        output: typeof UpdateEventSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventSettingsDomainService.DeleteEventSettings
     */
    deleteEventSettings: {
        methodKind: "unary";
        input: typeof DeleteEventSettingsRequestSchema;
        output: typeof DeleteEventSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventSettingsDomainService.ListEventSettings
     */
    listEventSettings: {
        methodKind: "unary";
        input: typeof ListEventSettingsRequestSchema;
        output: typeof ListEventSettingsResponseSchema;
    };
}>;
