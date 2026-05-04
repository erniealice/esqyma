import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/billing_event/billing_event.proto.
 */
export declare const file_domain_subscription_billing_event_billing_event: GenFile;
/**
 * @generated from message domain.subscription.v1.BillingEvent
 */
export type BillingEvent = Message<"domain.subscription.v1.BillingEvent"> & {
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
     * Required parent — every BillingEvent belongs to a Subscription.
     *
     * @generated from field: string subscription_id = 7;
     */
    subscriptionId: string;
    /**
     * Operational links — all nullable to support no-Job retainer flows.
     *
     * @generated from field: optional string job_id = 8;
     */
    jobId?: string;
    /**
     * @generated from field: optional string job_phase_id = 9;
     */
    jobPhaseId?: string;
    /**
     * @generated from field: optional string job_template_phase_id = 10;
     */
    jobTemplatePhaseId?: string;
    /**
     * @generated from field: optional string product_price_plan_id = 11;
     */
    productPricePlanId?: string;
    /**
     * Money — resolved at materialization time from JobTemplatePhase weight rules.
     *
     * centavos
     *
     * @generated from field: int64 billable_amount = 12;
     */
    billableAmount: bigint;
    /**
     * ISO 4217
     *
     * @generated from field: string billing_currency = 13;
     */
    billingCurrency: string;
    /**
     * Lifecycle.
     *
     * @generated from field: domain.subscription.v1.BillingEventStatus status = 14;
     */
    status: BillingEventStatus;
    /**
     * @generated from field: domain.subscription.v1.BillingEventTrigger trigger = 15;
     */
    trigger: BillingEventTrigger;
    /**
     * Outcome.
     *
     * @generated from field: optional string revenue_id = 16;
     */
    revenueId?: string;
    /**
     * @generated from field: optional int64 triggered_at = 17;
     */
    triggeredAt?: bigint;
    /**
     * @generated from field: optional int64 billed_at = 18;
     */
    billedAt?: bigint;
    /**
     * @generated from field: optional string reason = 19;
     */
    reason?: string;
    /**
     * Partial-billing chain: when an operator bills less than billable_amount
     * and chooses leave_remainder_open=true, a child BillingEvent is spawned
     * with status=DEFERRED and parent_event_id pointing back to the parent.
     *
     * @generated from field: optional string parent_event_id = 20;
     */
    parentEventId?: string;
    /**
     * e.g. "M1 partial #2"
     *
     * @generated from field: optional string sequence_label = 21;
     */
    sequenceLabel?: string;
};
/**
 * Describes the message domain.subscription.v1.BillingEvent.
 * Use `create(BillingEventSchema)` to create a new message.
 */
export declare const BillingEventSchema: GenMessage<BillingEvent>;
/**
 * @generated from message domain.subscription.v1.CreateBillingEventRequest
 */
export type CreateBillingEventRequest = Message<"domain.subscription.v1.CreateBillingEventRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BillingEvent data = 1;
     */
    data?: BillingEvent;
};
/**
 * Describes the message domain.subscription.v1.CreateBillingEventRequest.
 * Use `create(CreateBillingEventRequestSchema)` to create a new message.
 */
export declare const CreateBillingEventRequestSchema: GenMessage<CreateBillingEventRequest>;
/**
 * @generated from message domain.subscription.v1.CreateBillingEventResponse
 */
export type CreateBillingEventResponse = Message<"domain.subscription.v1.CreateBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent data = 1;
     */
    data: BillingEvent[];
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
 * Describes the message domain.subscription.v1.CreateBillingEventResponse.
 * Use `create(CreateBillingEventResponseSchema)` to create a new message.
 */
export declare const CreateBillingEventResponseSchema: GenMessage<CreateBillingEventResponse>;
/**
 * @generated from message domain.subscription.v1.ReadBillingEventRequest
 */
export type ReadBillingEventRequest = Message<"domain.subscription.v1.ReadBillingEventRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BillingEvent data = 1;
     */
    data?: BillingEvent;
};
/**
 * Describes the message domain.subscription.v1.ReadBillingEventRequest.
 * Use `create(ReadBillingEventRequestSchema)` to create a new message.
 */
export declare const ReadBillingEventRequestSchema: GenMessage<ReadBillingEventRequest>;
/**
 * @generated from message domain.subscription.v1.ReadBillingEventResponse
 */
export type ReadBillingEventResponse = Message<"domain.subscription.v1.ReadBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent data = 1;
     */
    data: BillingEvent[];
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
 * Describes the message domain.subscription.v1.ReadBillingEventResponse.
 * Use `create(ReadBillingEventResponseSchema)` to create a new message.
 */
export declare const ReadBillingEventResponseSchema: GenMessage<ReadBillingEventResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateBillingEventRequest
 */
export type UpdateBillingEventRequest = Message<"domain.subscription.v1.UpdateBillingEventRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BillingEvent data = 1;
     */
    data?: BillingEvent;
};
/**
 * Describes the message domain.subscription.v1.UpdateBillingEventRequest.
 * Use `create(UpdateBillingEventRequestSchema)` to create a new message.
 */
export declare const UpdateBillingEventRequestSchema: GenMessage<UpdateBillingEventRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateBillingEventResponse
 */
export type UpdateBillingEventResponse = Message<"domain.subscription.v1.UpdateBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent data = 1;
     */
    data: BillingEvent[];
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
 * Describes the message domain.subscription.v1.UpdateBillingEventResponse.
 * Use `create(UpdateBillingEventResponseSchema)` to create a new message.
 */
export declare const UpdateBillingEventResponseSchema: GenMessage<UpdateBillingEventResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteBillingEventRequest
 */
export type DeleteBillingEventRequest = Message<"domain.subscription.v1.DeleteBillingEventRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.BillingEvent data = 1;
     */
    data?: BillingEvent;
};
/**
 * Describes the message domain.subscription.v1.DeleteBillingEventRequest.
 * Use `create(DeleteBillingEventRequestSchema)` to create a new message.
 */
export declare const DeleteBillingEventRequestSchema: GenMessage<DeleteBillingEventRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteBillingEventResponse
 */
export type DeleteBillingEventResponse = Message<"domain.subscription.v1.DeleteBillingEventResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteBillingEventResponse.
 * Use `create(DeleteBillingEventResponseSchema)` to create a new message.
 */
export declare const DeleteBillingEventResponseSchema: GenMessage<DeleteBillingEventResponse>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsRequest
 */
export type ListBillingEventsRequest = Message<"domain.subscription.v1.ListBillingEventsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListBillingEventsRequest.
 * Use `create(ListBillingEventsRequestSchema)` to create a new message.
 */
export declare const ListBillingEventsRequestSchema: GenMessage<ListBillingEventsRequest>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsResponse
 */
export type ListBillingEventsResponse = Message<"domain.subscription.v1.ListBillingEventsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent data = 1;
     */
    data: BillingEvent[];
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
 * Describes the message domain.subscription.v1.ListBillingEventsResponse.
 * Use `create(ListBillingEventsResponseSchema)` to create a new message.
 */
export declare const ListBillingEventsResponseSchema: GenMessage<ListBillingEventsResponse>;
/**
 * @generated from message domain.subscription.v1.GetBillingEventListPageDataRequest
 */
export type GetBillingEventListPageDataRequest = Message<"domain.subscription.v1.GetBillingEventListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetBillingEventListPageDataRequest.
 * Use `create(GetBillingEventListPageDataRequestSchema)` to create a new message.
 */
export declare const GetBillingEventListPageDataRequestSchema: GenMessage<GetBillingEventListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetBillingEventListPageDataResponse
 */
export type GetBillingEventListPageDataResponse = Message<"domain.subscription.v1.GetBillingEventListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent billing_event_list = 1;
     */
    billingEventList: BillingEvent[];
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
 * Describes the message domain.subscription.v1.GetBillingEventListPageDataResponse.
 * Use `create(GetBillingEventListPageDataResponseSchema)` to create a new message.
 */
export declare const GetBillingEventListPageDataResponseSchema: GenMessage<GetBillingEventListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetBillingEventItemPageDataRequest
 */
export type GetBillingEventItemPageDataRequest = Message<"domain.subscription.v1.GetBillingEventItemPageDataRequest"> & {
    /**
     * @generated from field: string billing_event_id = 1;
     */
    billingEventId: string;
};
/**
 * Describes the message domain.subscription.v1.GetBillingEventItemPageDataRequest.
 * Use `create(GetBillingEventItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetBillingEventItemPageDataRequestSchema: GenMessage<GetBillingEventItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetBillingEventItemPageDataResponse
 */
export type GetBillingEventItemPageDataResponse = Message<"domain.subscription.v1.GetBillingEventItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.BillingEvent billing_event = 1;
     */
    billingEvent?: BillingEvent;
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
 * Describes the message domain.subscription.v1.GetBillingEventItemPageDataResponse.
 * Use `create(GetBillingEventItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetBillingEventItemPageDataResponseSchema: GenMessage<GetBillingEventItemPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsBySubscriptionRequest
 */
export type ListBillingEventsBySubscriptionRequest = Message<"domain.subscription.v1.ListBillingEventsBySubscriptionRequest"> & {
    /**
     * @generated from field: string subscription_id = 1;
     */
    subscriptionId: string;
};
/**
 * Describes the message domain.subscription.v1.ListBillingEventsBySubscriptionRequest.
 * Use `create(ListBillingEventsBySubscriptionRequestSchema)` to create a new message.
 */
export declare const ListBillingEventsBySubscriptionRequestSchema: GenMessage<ListBillingEventsBySubscriptionRequest>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsBySubscriptionResponse
 */
export type ListBillingEventsBySubscriptionResponse = Message<"domain.subscription.v1.ListBillingEventsBySubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent billing_events = 1;
     */
    billingEvents: BillingEvent[];
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
 * Describes the message domain.subscription.v1.ListBillingEventsBySubscriptionResponse.
 * Use `create(ListBillingEventsBySubscriptionResponseSchema)` to create a new message.
 */
export declare const ListBillingEventsBySubscriptionResponseSchema: GenMessage<ListBillingEventsBySubscriptionResponse>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsByJobPhaseRequest
 */
export type ListBillingEventsByJobPhaseRequest = Message<"domain.subscription.v1.ListBillingEventsByJobPhaseRequest"> & {
    /**
     * @generated from field: string job_phase_id = 1;
     */
    jobPhaseId: string;
};
/**
 * Describes the message domain.subscription.v1.ListBillingEventsByJobPhaseRequest.
 * Use `create(ListBillingEventsByJobPhaseRequestSchema)` to create a new message.
 */
export declare const ListBillingEventsByJobPhaseRequestSchema: GenMessage<ListBillingEventsByJobPhaseRequest>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsByJobPhaseResponse
 */
export type ListBillingEventsByJobPhaseResponse = Message<"domain.subscription.v1.ListBillingEventsByJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent billing_events = 1;
     */
    billingEvents: BillingEvent[];
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
 * Describes the message domain.subscription.v1.ListBillingEventsByJobPhaseResponse.
 * Use `create(ListBillingEventsByJobPhaseResponseSchema)` to create a new message.
 */
export declare const ListBillingEventsByJobPhaseResponseSchema: GenMessage<ListBillingEventsByJobPhaseResponse>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsByJobRequest
 */
export type ListBillingEventsByJobRequest = Message<"domain.subscription.v1.ListBillingEventsByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.subscription.v1.ListBillingEventsByJobRequest.
 * Use `create(ListBillingEventsByJobRequestSchema)` to create a new message.
 */
export declare const ListBillingEventsByJobRequestSchema: GenMessage<ListBillingEventsByJobRequest>;
/**
 * @generated from message domain.subscription.v1.ListBillingEventsByJobResponse
 */
export type ListBillingEventsByJobResponse = Message<"domain.subscription.v1.ListBillingEventsByJobResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.BillingEvent billing_events = 1;
     */
    billingEvents: BillingEvent[];
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
 * Describes the message domain.subscription.v1.ListBillingEventsByJobResponse.
 * Use `create(ListBillingEventsByJobResponseSchema)` to create a new message.
 */
export declare const ListBillingEventsByJobResponseSchema: GenMessage<ListBillingEventsByJobResponse>;
/**
 * @generated from message domain.subscription.v1.SetBillingEventStatusRequest
 */
export type SetBillingEventStatusRequest = Message<"domain.subscription.v1.SetBillingEventStatusRequest"> & {
    /**
     * @generated from field: string billing_event_id = 1;
     */
    billingEventId: string;
    /**
     * @generated from field: domain.subscription.v1.BillingEventStatus status = 2;
     */
    status: BillingEventStatus;
    /**
     * @generated from field: domain.subscription.v1.BillingEventTrigger trigger = 3;
     */
    trigger: BillingEventTrigger;
    /**
     * @generated from field: optional string reason = 4;
     */
    reason?: string;
};
/**
 * Describes the message domain.subscription.v1.SetBillingEventStatusRequest.
 * Use `create(SetBillingEventStatusRequestSchema)` to create a new message.
 */
export declare const SetBillingEventStatusRequestSchema: GenMessage<SetBillingEventStatusRequest>;
/**
 * @generated from message domain.subscription.v1.SetBillingEventStatusResponse
 */
export type SetBillingEventStatusResponse = Message<"domain.subscription.v1.SetBillingEventStatusResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.BillingEvent data = 1;
     */
    data?: BillingEvent;
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
 * Describes the message domain.subscription.v1.SetBillingEventStatusResponse.
 * Use `create(SetBillingEventStatusResponseSchema)` to create a new message.
 */
export declare const SetBillingEventStatusResponseSchema: GenMessage<SetBillingEventStatusResponse>;
/**
 * Status lifecycle for a BillingEvent.
 *   UNSPECIFIED — materialized at job/sub create, awaiting trigger.
 *   READY       — operator can recognize revenue against this event.
 *   BILLED      — Revenue created, revenue_id set.
 *   WAIVED      — operator decided not to bill (no Revenue ever created).
 *   DEFERRED    — child of a partial bill; reserves the remainder amount.
 *   CANCELLED   — milestone scope changed; event will not bill.
 *
 * @generated from enum domain.subscription.v1.BillingEventStatus
 */
export declare enum BillingEventStatus {
    /**
     * @generated from enum value: BILLING_EVENT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: BILLING_EVENT_STATUS_READY = 1;
     */
    READY = 1,
    /**
     * @generated from enum value: BILLING_EVENT_STATUS_BILLED = 2;
     */
    BILLED = 2,
    /**
     * @generated from enum value: BILLING_EVENT_STATUS_WAIVED = 3;
     */
    WAIVED = 3,
    /**
     * @generated from enum value: BILLING_EVENT_STATUS_DEFERRED = 4;
     */
    DEFERRED = 4,
    /**
     * @generated from enum value: BILLING_EVENT_STATUS_CANCELLED = 5;
     */
    CANCELLED = 5
}
/**
 * Describes the enum domain.subscription.v1.BillingEventStatus.
 */
export declare const BillingEventStatusSchema: GenEnum<BillingEventStatus>;
/**
 * What advanced this event from UNSPECIFIED to READY.
 *   PHASE_COMPLETED — JobPhase.status transitioned to COMPLETED (use-case hook).
 *   MANUAL_EARLY    — operator clicked Mark Ready before the phase completed.
 *   MANUAL_LATE     — operator marked it ready after phase completion (retro).
 *   DATE            — date trigger fired (v1: operator clicks; v2: cron sweep).
 *
 * @generated from enum domain.subscription.v1.BillingEventTrigger
 */
export declare enum BillingEventTrigger {
    /**
     * @generated from enum value: BILLING_EVENT_TRIGGER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: BILLING_EVENT_TRIGGER_PHASE_COMPLETED = 1;
     */
    PHASE_COMPLETED = 1,
    /**
     * @generated from enum value: BILLING_EVENT_TRIGGER_MANUAL_EARLY = 2;
     */
    MANUAL_EARLY = 2,
    /**
     * @generated from enum value: BILLING_EVENT_TRIGGER_MANUAL_LATE = 3;
     */
    MANUAL_LATE = 3,
    /**
     * @generated from enum value: BILLING_EVENT_TRIGGER_DATE = 4;
     */
    DATE = 4,
    /**
     * AD_HOC × PER_OCCURRENCE: visit Job's last phase transitioned to COMPLETED.
     * See docs/plan/20260501-ad-hoc-subscription-billing/plan.md §4.3 (codex CRIT-1).
     *
     * @generated from enum value: BILLING_EVENT_TRIGGER_VISIT_COMPLETED = 5;
     */
    VISIT_COMPLETED = 5
}
/**
 * Describes the enum domain.subscription.v1.BillingEventTrigger.
 */
export declare const BillingEventTriggerSchema: GenEnum<BillingEventTrigger>;
/**
 * @generated from service domain.subscription.v1.BillingEventDomainService
 */
export declare const BillingEventDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.CreateBillingEvent
     */
    createBillingEvent: {
        methodKind: "unary";
        input: typeof CreateBillingEventRequestSchema;
        output: typeof CreateBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.ReadBillingEvent
     */
    readBillingEvent: {
        methodKind: "unary";
        input: typeof ReadBillingEventRequestSchema;
        output: typeof ReadBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.UpdateBillingEvent
     */
    updateBillingEvent: {
        methodKind: "unary";
        input: typeof UpdateBillingEventRequestSchema;
        output: typeof UpdateBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.DeleteBillingEvent
     */
    deleteBillingEvent: {
        methodKind: "unary";
        input: typeof DeleteBillingEventRequestSchema;
        output: typeof DeleteBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.ListBillingEvents
     */
    listBillingEvents: {
        methodKind: "unary";
        input: typeof ListBillingEventsRequestSchema;
        output: typeof ListBillingEventsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.GetBillingEventListPageData
     */
    getBillingEventListPageData: {
        methodKind: "unary";
        input: typeof GetBillingEventListPageDataRequestSchema;
        output: typeof GetBillingEventListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.GetBillingEventItemPageData
     */
    getBillingEventItemPageData: {
        methodKind: "unary";
        input: typeof GetBillingEventItemPageDataRequestSchema;
        output: typeof GetBillingEventItemPageDataResponseSchema;
    };
    /**
     * Extras
     *
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.ListBySubscription
     */
    listBySubscription: {
        methodKind: "unary";
        input: typeof ListBillingEventsBySubscriptionRequestSchema;
        output: typeof ListBillingEventsBySubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.ListByJobPhase
     */
    listByJobPhase: {
        methodKind: "unary";
        input: typeof ListBillingEventsByJobPhaseRequestSchema;
        output: typeof ListBillingEventsByJobPhaseResponseSchema;
    };
    /**
     * AD_HOC × PER_OCCURRENCE events have job_phase_id = NULL — find them by job_id.
     * See docs/plan/20260501-ad-hoc-subscription-billing/plan.md §3.5 (codex MAJ-3).
     *
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListBillingEventsByJobRequestSchema;
        output: typeof ListBillingEventsByJobResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.BillingEventDomainService.SetStatus
     */
    setStatus: {
        methodKind: "unary";
        input: typeof SetBillingEventStatusRequestSchema;
        output: typeof SetBillingEventStatusResponseSchema;
    };
}>;
