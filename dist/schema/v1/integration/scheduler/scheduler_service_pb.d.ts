import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { EventType, InviteeInfo, Schedule, ScheduleLocation, SchedulerCapability, SchedulerProviderHealthStatus, SchedulerProviderType, ScheduleStatus, TimeSlot } from "./scheduler_pb";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/scheduler/scheduler_service.proto.
 */
export declare const file_integration_scheduler_scheduler_service: GenFile;
/**
 * @generated from message integration.scheduler.v1.CreateScheduleRequest
 */
export type CreateScheduleRequest = Message<"integration.scheduler.v1.CreateScheduleRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.ScheduleCreateData data = 1;
     */
    data?: ScheduleCreateData;
};
/**
 * Describes the message integration.scheduler.v1.CreateScheduleRequest.
 * Use `create(CreateScheduleRequestSchema)` to create a new message.
 */
export declare const CreateScheduleRequestSchema: GenMessage<CreateScheduleRequest>;
/**
 * @generated from message integration.scheduler.v1.ScheduleCreateData
 */
export type ScheduleCreateData = Message<"integration.scheduler.v1.ScheduleCreateData"> & {
    /**
     * Provider to use (optional, uses default if not specified)
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Event type URI/ID (required)
     *
     * @generated from field: string event_type_id = 2;
     */
    eventTypeId: string;
    /**
     * Start date (format: YYYY-MM-DD)
     *
     * @generated from field: string start_date = 3;
     */
    startDate: string;
    /**
     * Start time (format: HH:mm, 24-hour)
     *
     * @generated from field: string start_time = 4;
     */
    startTime: string;
    /**
     * End date (optional, defaults to start_date)
     *
     * @generated from field: string end_date = 5;
     */
    endDate: string;
    /**
     * End time (optional, calculated from duration if not provided)
     *
     * @generated from field: string end_time = 6;
     */
    endTime: string;
    /**
     * Invitee information (required)
     *
     * @generated from field: integration.scheduler.v1.InviteeInfo invitee = 7;
     */
    invitee?: InviteeInfo;
    /**
     * Location preference (optional)
     *
     * @generated from field: integration.scheduler.v1.ScheduleLocation location = 8;
     */
    location?: ScheduleLocation;
    /**
     * Associated entity references (for linking to our domain)
     *
     * @generated from field: string client_id = 9;
     */
    clientId: string;
    /**
     * @generated from field: string subscription_id = 10;
     */
    subscriptionId: string;
    /**
     * @generated from field: string payment_id = 11;
     */
    paymentId: string;
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 12;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.scheduler.v1.ScheduleCreateData.
 * Use `create(ScheduleCreateDataSchema)` to create a new message.
 */
export declare const ScheduleCreateDataSchema: GenMessage<ScheduleCreateData>;
/**
 * @generated from message integration.scheduler.v1.CreateScheduleResponse
 */
export type CreateScheduleResponse = Message<"integration.scheduler.v1.CreateScheduleResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.Schedule data = 2;
     */
    data: Schedule[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.CreateScheduleResponse.
 * Use `create(CreateScheduleResponseSchema)` to create a new message.
 */
export declare const CreateScheduleResponseSchema: GenMessage<CreateScheduleResponse>;
/**
 * @generated from message integration.scheduler.v1.CancelScheduleRequest
 */
export type CancelScheduleRequest = Message<"integration.scheduler.v1.CancelScheduleRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.ScheduleCancelData data = 1;
     */
    data?: ScheduleCancelData;
};
/**
 * Describes the message integration.scheduler.v1.CancelScheduleRequest.
 * Use `create(CancelScheduleRequestSchema)` to create a new message.
 */
export declare const CancelScheduleRequestSchema: GenMessage<CancelScheduleRequest>;
/**
 * @generated from message integration.scheduler.v1.ScheduleCancelData
 */
export type ScheduleCancelData = Message<"integration.scheduler.v1.ScheduleCancelData"> & {
    /**
     * Provider to use
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Internal schedule ID
     *
     * @generated from field: string schedule_id = 2;
     */
    scheduleId: string;
    /**
     * Provider schedule reference (alternative to schedule_id)
     *
     * @generated from field: string provider_schedule_id = 3;
     */
    providerScheduleId: string;
    /**
     * Cancellation reason
     *
     * @generated from field: string reason = 4;
     */
    reason: string;
    /**
     * Whether to notify invitee about cancellation
     *
     * @generated from field: bool notify_invitee = 5;
     */
    notifyInvitee: boolean;
};
/**
 * Describes the message integration.scheduler.v1.ScheduleCancelData.
 * Use `create(ScheduleCancelDataSchema)` to create a new message.
 */
export declare const ScheduleCancelDataSchema: GenMessage<ScheduleCancelData>;
/**
 * @generated from message integration.scheduler.v1.CancelScheduleResponse
 */
export type CancelScheduleResponse = Message<"integration.scheduler.v1.CancelScheduleResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.ScheduleCancelResult data = 2;
     */
    data: ScheduleCancelResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.CancelScheduleResponse.
 * Use `create(CancelScheduleResponseSchema)` to create a new message.
 */
export declare const CancelScheduleResponseSchema: GenMessage<CancelScheduleResponse>;
/**
 * @generated from message integration.scheduler.v1.ScheduleCancelResult
 */
export type ScheduleCancelResult = Message<"integration.scheduler.v1.ScheduleCancelResult"> & {
    /**
     * Updated status (should be CANCELLED)
     *
     * @generated from field: integration.scheduler.v1.ScheduleStatus status = 1;
     */
    status: ScheduleStatus;
    /**
     * Success message
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message integration.scheduler.v1.ScheduleCancelResult.
 * Use `create(ScheduleCancelResultSchema)` to create a new message.
 */
export declare const ScheduleCancelResultSchema: GenMessage<ScheduleCancelResult>;
/**
 * @generated from message integration.scheduler.v1.GetScheduleRequest
 */
export type GetScheduleRequest = Message<"integration.scheduler.v1.GetScheduleRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.ScheduleLookup data = 1;
     */
    data?: ScheduleLookup;
};
/**
 * Describes the message integration.scheduler.v1.GetScheduleRequest.
 * Use `create(GetScheduleRequestSchema)` to create a new message.
 */
export declare const GetScheduleRequestSchema: GenMessage<GetScheduleRequest>;
/**
 * @generated from message integration.scheduler.v1.ScheduleLookup
 */
export type ScheduleLookup = Message<"integration.scheduler.v1.ScheduleLookup"> & {
    /**
     * Provider to use
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Internal schedule ID
     *
     * @generated from field: string schedule_id = 2;
     */
    scheduleId: string;
    /**
     * Provider schedule reference (alternative to schedule_id)
     *
     * @generated from field: string provider_schedule_id = 3;
     */
    providerScheduleId: string;
};
/**
 * Describes the message integration.scheduler.v1.ScheduleLookup.
 * Use `create(ScheduleLookupSchema)` to create a new message.
 */
export declare const ScheduleLookupSchema: GenMessage<ScheduleLookup>;
/**
 * @generated from message integration.scheduler.v1.GetScheduleResponse
 */
export type GetScheduleResponse = Message<"integration.scheduler.v1.GetScheduleResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.Schedule data = 2;
     */
    data: Schedule[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.GetScheduleResponse.
 * Use `create(GetScheduleResponseSchema)` to create a new message.
 */
export declare const GetScheduleResponseSchema: GenMessage<GetScheduleResponse>;
/**
 * @generated from message integration.scheduler.v1.ListSchedulesRequest
 */
export type ListSchedulesRequest = Message<"integration.scheduler.v1.ListSchedulesRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.ScheduleListFilter data = 1;
     */
    data?: ScheduleListFilter;
};
/**
 * Describes the message integration.scheduler.v1.ListSchedulesRequest.
 * Use `create(ListSchedulesRequestSchema)` to create a new message.
 */
export declare const ListSchedulesRequestSchema: GenMessage<ListSchedulesRequest>;
/**
 * @generated from message integration.scheduler.v1.ScheduleListFilter
 */
export type ScheduleListFilter = Message<"integration.scheduler.v1.ScheduleListFilter"> & {
    /**
     * Provider to use
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Filter by event type
     *
     * @generated from field: string event_type_id = 2;
     */
    eventTypeId: string;
    /**
     * Filter by status (active, cancelled, etc.)
     *
     * @generated from field: string status = 3;
     */
    status: string;
    /**
     * Filter by client ID
     *
     * @generated from field: string client_id = 4;
     */
    clientId: string;
    /**
     * Date range filter - start (format: YYYY-MM-DD)
     *
     * @generated from field: string from_date = 5;
     */
    fromDate: string;
    /**
     * Date range filter - end (format: YYYY-MM-DD)
     *
     * @generated from field: string to_date = 6;
     */
    toDate: string;
    /**
     * Pagination limit
     *
     * @generated from field: int32 limit = 7;
     */
    limit: number;
    /**
     * Pagination token
     *
     * @generated from field: string page_token = 8;
     */
    pageToken: string;
    /**
     * Filter by invitee email
     *
     * @generated from field: string invitee_email = 9;
     */
    inviteeEmail: string;
    /**
     * Sort order: "asc" or "desc"
     *
     * @generated from field: string sort_order = 10;
     */
    sortOrder: string;
};
/**
 * Describes the message integration.scheduler.v1.ScheduleListFilter.
 * Use `create(ScheduleListFilterSchema)` to create a new message.
 */
export declare const ScheduleListFilterSchema: GenMessage<ScheduleListFilter>;
/**
 * @generated from message integration.scheduler.v1.ListSchedulesResponse
 */
export type ListSchedulesResponse = Message<"integration.scheduler.v1.ListSchedulesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.Schedule data = 2;
     */
    data: Schedule[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: string next_page_token = 4;
     */
    nextPageToken: string;
    /**
     * @generated from field: int32 total_count = 5;
     */
    totalCount: number;
};
/**
 * Describes the message integration.scheduler.v1.ListSchedulesResponse.
 * Use `create(ListSchedulesResponseSchema)` to create a new message.
 */
export declare const ListSchedulesResponseSchema: GenMessage<ListSchedulesResponse>;
/**
 * @generated from message integration.scheduler.v1.CheckAvailabilityRequest
 */
export type CheckAvailabilityRequest = Message<"integration.scheduler.v1.CheckAvailabilityRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.AvailabilityCheckData data = 1;
     */
    data?: AvailabilityCheckData;
};
/**
 * Describes the message integration.scheduler.v1.CheckAvailabilityRequest.
 * Use `create(CheckAvailabilityRequestSchema)` to create a new message.
 */
export declare const CheckAvailabilityRequestSchema: GenMessage<CheckAvailabilityRequest>;
/**
 * @generated from message integration.scheduler.v1.AvailabilityCheckData
 */
export type AvailabilityCheckData = Message<"integration.scheduler.v1.AvailabilityCheckData"> & {
    /**
     * Provider to use
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Event type to check availability for (required)
     *
     * @generated from field: string event_type_id = 2;
     */
    eventTypeId: string;
    /**
     * Start date (format: YYYY-MM-DD)
     *
     * @generated from field: string start_date = 3;
     */
    startDate: string;
    /**
     * Start time (format: HH:mm, 24-hour) - optional, defaults to day start
     *
     * @generated from field: string start_time = 4;
     */
    startTime: string;
    /**
     * End date (format: YYYY-MM-DD)
     *
     * @generated from field: string end_date = 5;
     */
    endDate: string;
    /**
     * End time (format: HH:mm, 24-hour) - optional, defaults to day end
     *
     * @generated from field: string end_time = 6;
     */
    endTime: string;
    /**
     * Timezone for the request (IANA format, e.g., "Asia/Singapore")
     *
     * @generated from field: string timezone = 7;
     */
    timezone: string;
};
/**
 * Describes the message integration.scheduler.v1.AvailabilityCheckData.
 * Use `create(AvailabilityCheckDataSchema)` to create a new message.
 */
export declare const AvailabilityCheckDataSchema: GenMessage<AvailabilityCheckData>;
/**
 * @generated from message integration.scheduler.v1.CheckAvailabilityResponse
 */
export type CheckAvailabilityResponse = Message<"integration.scheduler.v1.CheckAvailabilityResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.TimeSlot data = 2;
     */
    data: TimeSlot[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.CheckAvailabilityResponse.
 * Use `create(CheckAvailabilityResponseSchema)` to create a new message.
 */
export declare const CheckAvailabilityResponseSchema: GenMessage<CheckAvailabilityResponse>;
/**
 * @generated from message integration.scheduler.v1.ProcessSchedulerWebhookRequest
 */
export type ProcessSchedulerWebhookRequest = Message<"integration.scheduler.v1.ProcessSchedulerWebhookRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.SchedulerWebhookData data = 1;
     */
    data?: SchedulerWebhookData;
};
/**
 * Describes the message integration.scheduler.v1.ProcessSchedulerWebhookRequest.
 * Use `create(ProcessSchedulerWebhookRequestSchema)` to create a new message.
 */
export declare const ProcessSchedulerWebhookRequestSchema: GenMessage<ProcessSchedulerWebhookRequest>;
/**
 * @generated from message integration.scheduler.v1.SchedulerWebhookData
 */
export type SchedulerWebhookData = Message<"integration.scheduler.v1.SchedulerWebhookData"> & {
    /**
     * Provider identifier (e.g., "calendly")
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Raw webhook payload as bytes
     *
     * @generated from field: bytes payload = 2;
     */
    payload: Uint8Array;
    /**
     * HTTP headers from the webhook request
     *
     * @generated from field: map<string, string> headers = 3;
     */
    headers: {
        [key: string]: string;
    };
    /**
     * Content type of the payload
     *
     * @generated from field: string content_type = 4;
     */
    contentType: string;
    /**
     * Signature for webhook verification
     *
     * @generated from field: string signature = 5;
     */
    signature: string;
    /**
     * URL query parameters
     *
     * @generated from field: map<string, string> query = 6;
     */
    query: {
        [key: string]: string;
    };
    /**
     * HTTP method (POST, GET, etc.)
     *
     * @generated from field: string method = 7;
     */
    method: string;
    /**
     * Full request URL
     *
     * @generated from field: string url = 8;
     */
    url: string;
};
/**
 * Describes the message integration.scheduler.v1.SchedulerWebhookData.
 * Use `create(SchedulerWebhookDataSchema)` to create a new message.
 */
export declare const SchedulerWebhookDataSchema: GenMessage<SchedulerWebhookData>;
/**
 * @generated from message integration.scheduler.v1.ProcessSchedulerWebhookResponse
 */
export type ProcessSchedulerWebhookResponse = Message<"integration.scheduler.v1.ProcessSchedulerWebhookResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.SchedulerWebhookResult data = 2;
     */
    data: SchedulerWebhookResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.ProcessSchedulerWebhookResponse.
 * Use `create(ProcessSchedulerWebhookResponseSchema)` to create a new message.
 */
export declare const ProcessSchedulerWebhookResponseSchema: GenMessage<ProcessSchedulerWebhookResponse>;
/**
 * @generated from message integration.scheduler.v1.SchedulerWebhookResult
 */
export type SchedulerWebhookResult = Message<"integration.scheduler.v1.SchedulerWebhookResult"> & {
    /**
     * Event type from webhook (e.g., "invitee.created", "invitee.canceled")
     *
     * @generated from field: string event_type = 1;
     */
    eventType: string;
    /**
     * Processed schedule (extracted from webhook)
     *
     * @generated from field: integration.scheduler.v1.Schedule schedule = 2;
     */
    schedule?: Schedule;
    /**
     * Action taken (created, cancelled, rescheduled, no_action, etc.)
     *
     * @generated from field: string action = 3;
     */
    action: string;
    /**
     * Whether this is a reschedule (old_invitee present)
     *
     * @generated from field: bool is_reschedule = 4;
     */
    isReschedule: boolean;
    /**
     * Old schedule ID (for reschedules)
     *
     * @generated from field: string old_schedule_id = 5;
     */
    oldScheduleId: string;
};
/**
 * Describes the message integration.scheduler.v1.SchedulerWebhookResult.
 * Use `create(SchedulerWebhookResultSchema)` to create a new message.
 */
export declare const SchedulerWebhookResultSchema: GenMessage<SchedulerWebhookResult>;
/**
 * @generated from message integration.scheduler.v1.ListEventTypesRequest
 */
export type ListEventTypesRequest = Message<"integration.scheduler.v1.ListEventTypesRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.EventTypeListFilter data = 1;
     */
    data?: EventTypeListFilter;
};
/**
 * Describes the message integration.scheduler.v1.ListEventTypesRequest.
 * Use `create(ListEventTypesRequestSchema)` to create a new message.
 */
export declare const ListEventTypesRequestSchema: GenMessage<ListEventTypesRequest>;
/**
 * @generated from message integration.scheduler.v1.EventTypeListFilter
 */
export type EventTypeListFilter = Message<"integration.scheduler.v1.EventTypeListFilter"> & {
    /**
     * Provider to use
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Only return active event types
     *
     * @generated from field: bool active_only = 2;
     */
    activeOnly: boolean;
    /**
     * Filter by user URI (for multi-user organizations)
     *
     * @generated from field: string user_uri = 3;
     */
    userUri: string;
};
/**
 * Describes the message integration.scheduler.v1.EventTypeListFilter.
 * Use `create(EventTypeListFilterSchema)` to create a new message.
 */
export declare const EventTypeListFilterSchema: GenMessage<EventTypeListFilter>;
/**
 * @generated from message integration.scheduler.v1.ListEventTypesResponse
 */
export type ListEventTypesResponse = Message<"integration.scheduler.v1.ListEventTypesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.EventType data = 2;
     */
    data: EventType[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.ListEventTypesResponse.
 * Use `create(ListEventTypesResponseSchema)` to create a new message.
 */
export declare const ListEventTypesResponseSchema: GenMessage<ListEventTypesResponse>;
/**
 * @generated from message integration.scheduler.v1.GetEventTypeRequest
 */
export type GetEventTypeRequest = Message<"integration.scheduler.v1.GetEventTypeRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.EventTypeLookup data = 1;
     */
    data?: EventTypeLookup;
};
/**
 * Describes the message integration.scheduler.v1.GetEventTypeRequest.
 * Use `create(GetEventTypeRequestSchema)` to create a new message.
 */
export declare const GetEventTypeRequestSchema: GenMessage<GetEventTypeRequest>;
/**
 * @generated from message integration.scheduler.v1.EventTypeLookup
 */
export type EventTypeLookup = Message<"integration.scheduler.v1.EventTypeLookup"> & {
    /**
     * Provider to use
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Event type URI/ID
     *
     * @generated from field: string event_type_id = 2;
     */
    eventTypeId: string;
};
/**
 * Describes the message integration.scheduler.v1.EventTypeLookup.
 * Use `create(EventTypeLookupSchema)` to create a new message.
 */
export declare const EventTypeLookupSchema: GenMessage<EventTypeLookup>;
/**
 * @generated from message integration.scheduler.v1.GetEventTypeResponse
 */
export type GetEventTypeResponse = Message<"integration.scheduler.v1.GetEventTypeResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.EventType data = 2;
     */
    data: EventType[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.GetEventTypeResponse.
 * Use `create(GetEventTypeResponseSchema)` to create a new message.
 */
export declare const GetEventTypeResponseSchema: GenMessage<GetEventTypeResponse>;
/**
 * @generated from message integration.scheduler.v1.CheckSchedulerHealthRequest
 */
export type CheckSchedulerHealthRequest = Message<"integration.scheduler.v1.CheckSchedulerHealthRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.SchedulerHealthCheckData data = 1;
     */
    data?: SchedulerHealthCheckData;
};
/**
 * Describes the message integration.scheduler.v1.CheckSchedulerHealthRequest.
 * Use `create(CheckSchedulerHealthRequestSchema)` to create a new message.
 */
export declare const CheckSchedulerHealthRequestSchema: GenMessage<CheckSchedulerHealthRequest>;
/**
 * @generated from message integration.scheduler.v1.SchedulerHealthCheckData
 */
export type SchedulerHealthCheckData = Message<"integration.scheduler.v1.SchedulerHealthCheckData"> & {
    /**
     * Provider to check
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Perform deep health check (e.g., verify API connectivity)
     *
     * @generated from field: bool deep_check = 2;
     */
    deepCheck: boolean;
};
/**
 * Describes the message integration.scheduler.v1.SchedulerHealthCheckData.
 * Use `create(SchedulerHealthCheckDataSchema)` to create a new message.
 */
export declare const SchedulerHealthCheckDataSchema: GenMessage<SchedulerHealthCheckData>;
/**
 * @generated from message integration.scheduler.v1.CheckSchedulerHealthResponse
 */
export type CheckSchedulerHealthResponse = Message<"integration.scheduler.v1.CheckSchedulerHealthResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.SchedulerHealthStatus data = 2;
     */
    data: SchedulerHealthStatus[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.CheckSchedulerHealthResponse.
 * Use `create(CheckSchedulerHealthResponseSchema)` to create a new message.
 */
export declare const CheckSchedulerHealthResponseSchema: GenMessage<CheckSchedulerHealthResponse>;
/**
 * @generated from message integration.scheduler.v1.SchedulerHealthStatus
 */
export type SchedulerHealthStatus = Message<"integration.scheduler.v1.SchedulerHealthStatus"> & {
    /**
     * Whether the provider is healthy
     *
     * @generated from field: bool is_healthy = 1;
     */
    isHealthy: boolean;
    /**
     * Detailed health status
     *
     * @generated from field: integration.scheduler.v1.SchedulerProviderHealthStatus health_status = 2;
     */
    healthStatus?: SchedulerProviderHealthStatus;
};
/**
 * Describes the message integration.scheduler.v1.SchedulerHealthStatus.
 * Use `create(SchedulerHealthStatusSchema)` to create a new message.
 */
export declare const SchedulerHealthStatusSchema: GenMessage<SchedulerHealthStatus>;
/**
 * @generated from message integration.scheduler.v1.GetSchedulerCapabilitiesRequest
 */
export type GetSchedulerCapabilitiesRequest = Message<"integration.scheduler.v1.GetSchedulerCapabilitiesRequest"> & {
    /**
     * @generated from field: integration.scheduler.v1.SchedulerProviderLookup data = 1;
     */
    data?: SchedulerProviderLookup;
};
/**
 * Describes the message integration.scheduler.v1.GetSchedulerCapabilitiesRequest.
 * Use `create(GetSchedulerCapabilitiesRequestSchema)` to create a new message.
 */
export declare const GetSchedulerCapabilitiesRequestSchema: GenMessage<GetSchedulerCapabilitiesRequest>;
/**
 * @generated from message integration.scheduler.v1.SchedulerProviderLookup
 */
export type SchedulerProviderLookup = Message<"integration.scheduler.v1.SchedulerProviderLookup"> & {
    /**
     * Provider to query
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
};
/**
 * Describes the message integration.scheduler.v1.SchedulerProviderLookup.
 * Use `create(SchedulerProviderLookupSchema)` to create a new message.
 */
export declare const SchedulerProviderLookupSchema: GenMessage<SchedulerProviderLookup>;
/**
 * @generated from message integration.scheduler.v1.GetSchedulerCapabilitiesResponse
 */
export type GetSchedulerCapabilitiesResponse = Message<"integration.scheduler.v1.GetSchedulerCapabilitiesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.scheduler.v1.SchedulerProviderCapabilities data = 2;
     */
    data: SchedulerProviderCapabilities[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.scheduler.v1.GetSchedulerCapabilitiesResponse.
 * Use `create(GetSchedulerCapabilitiesResponseSchema)` to create a new message.
 */
export declare const GetSchedulerCapabilitiesResponseSchema: GenMessage<GetSchedulerCapabilitiesResponse>;
/**
 * @generated from message integration.scheduler.v1.SchedulerProviderCapabilities
 */
export type SchedulerProviderCapabilities = Message<"integration.scheduler.v1.SchedulerProviderCapabilities"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.scheduler.v1.SchedulerProviderType provider_type = 2;
     */
    providerType: SchedulerProviderType;
    /**
     * List of supported capabilities
     *
     * @generated from field: repeated integration.scheduler.v1.SchedulerCapability capabilities = 3;
     */
    capabilities: SchedulerCapability[];
    /**
     * Provider-specific limits (e.g., max_days_ahead, max_events_per_request)
     *
     * @generated from field: map<string, string> limits = 4;
     */
    limits: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.scheduler.v1.SchedulerProviderCapabilities.
 * Use `create(SchedulerProviderCapabilitiesSchema)` to create a new message.
 */
export declare const SchedulerProviderCapabilitiesSchema: GenMessage<SchedulerProviderCapabilities>;
/**
 * SchedulerIntegrationService provides unified scheduler operations
 * This service abstracts scheduling providers like Calendly, Google Calendar, etc.
 *
 * @generated from service integration.scheduler.v1.SchedulerIntegrationService
 */
export declare const SchedulerIntegrationService: GenService<{
    /**
     * Create a scheduled event (book an appointment)
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.CreateSchedule
     */
    createSchedule: {
        methodKind: "unary";
        input: typeof CreateScheduleRequestSchema;
        output: typeof CreateScheduleResponseSchema;
    };
    /**
     * Cancel a scheduled event
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.CancelSchedule
     */
    cancelSchedule: {
        methodKind: "unary";
        input: typeof CancelScheduleRequestSchema;
        output: typeof CancelScheduleResponseSchema;
    };
    /**
     * Get schedule details by ID
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.GetSchedule
     */
    getSchedule: {
        methodKind: "unary";
        input: typeof GetScheduleRequestSchema;
        output: typeof GetScheduleResponseSchema;
    };
    /**
     * List schedules with filtering
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.ListSchedules
     */
    listSchedules: {
        methodKind: "unary";
        input: typeof ListSchedulesRequestSchema;
        output: typeof ListSchedulesResponseSchema;
    };
    /**
     * Check available time slots for booking
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.CheckAvailability
     */
    checkAvailability: {
        methodKind: "unary";
        input: typeof CheckAvailabilityRequestSchema;
        output: typeof CheckAvailabilityResponseSchema;
    };
    /**
     * Process incoming webhook from scheduler provider
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.ProcessWebhook
     */
    processWebhook: {
        methodKind: "unary";
        input: typeof ProcessSchedulerWebhookRequestSchema;
        output: typeof ProcessSchedulerWebhookResponseSchema;
    };
    /**
     * List available event types
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.ListEventTypes
     */
    listEventTypes: {
        methodKind: "unary";
        input: typeof ListEventTypesRequestSchema;
        output: typeof ListEventTypesResponseSchema;
    };
    /**
     * Get event type details
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.GetEventType
     */
    getEventType: {
        methodKind: "unary";
        input: typeof GetEventTypeRequestSchema;
        output: typeof GetEventTypeResponseSchema;
    };
    /**
     * Check provider health
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.CheckHealth
     */
    checkHealth: {
        methodKind: "unary";
        input: typeof CheckSchedulerHealthRequestSchema;
        output: typeof CheckSchedulerHealthResponseSchema;
    };
    /**
     * Get provider capabilities
     *
     * @generated from rpc integration.scheduler.v1.SchedulerIntegrationService.GetCapabilities
     */
    getCapabilities: {
        methodKind: "unary";
        input: typeof GetSchedulerCapabilitiesRequestSchema;
        output: typeof GetSchedulerCapabilitiesResponseSchema;
    };
}>;
