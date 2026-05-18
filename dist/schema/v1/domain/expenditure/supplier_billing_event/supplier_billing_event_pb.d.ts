import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/supplier_billing_event/supplier_billing_event.proto.
 */
export declare const file_domain_expenditure_supplier_billing_event_supplier_billing_event: GenFile;
/**
 * @generated from message domain.expenditure.v1.SupplierBillingEvent
 */
export type SupplierBillingEvent = Message<"domain.expenditure.v1.SupplierBillingEvent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string supplier_subscription_id = 10;
     */
    supplierSubscriptionId: string;
    /**
     * @generated from field: optional string supplier_contract_id = 11;
     */
    supplierContractId?: string;
    /**
     * Centavos in billing_currency
     *
     * @generated from field: int64 billable_amount = 20;
     */
    billableAmount: bigint;
    /**
     * @generated from field: string billing_currency = 21;
     */
    billingCurrency: string;
    /**
     * @generated from field: domain.expenditure.v1.SupplierBillingEventStatus status = 30;
     */
    status: SupplierBillingEventStatus;
    /**
     * @generated from field: domain.expenditure.v1.SupplierBillingEventTrigger trigger = 31;
     */
    trigger: SupplierBillingEventTrigger;
    /**
     * Back-edge — set when status flips to BILLED via RecognizeMilestoneAdvance.
     *
     * @generated from field: optional string expense_recognition_id = 40;
     */
    expenseRecognitionId?: string;
    /**
     * @generated from field: bool active = 90;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 91;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional int64 date_modified = 92;
     */
    dateModified?: bigint;
};
/**
 * Describes the message domain.expenditure.v1.SupplierBillingEvent.
 * Use `create(SupplierBillingEventSchema)` to create a new message.
 */
export declare const SupplierBillingEventSchema: GenMessage<SupplierBillingEvent>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierBillingEventRequest
 */
export type CreateSupplierBillingEventRequest = Message<"domain.expenditure.v1.CreateSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data?: SupplierBillingEvent;
};
/**
 * Describes the message domain.expenditure.v1.CreateSupplierBillingEventRequest.
 * Use `create(CreateSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const CreateSupplierBillingEventRequestSchema: GenMessage<CreateSupplierBillingEventRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierBillingEventResponse
 */
export type CreateSupplierBillingEventResponse = Message<"domain.expenditure.v1.CreateSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data: SupplierBillingEvent[];
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
 * Describes the message domain.expenditure.v1.CreateSupplierBillingEventResponse.
 * Use `create(CreateSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const CreateSupplierBillingEventResponseSchema: GenMessage<CreateSupplierBillingEventResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierBillingEventRequest
 */
export type ReadSupplierBillingEventRequest = Message<"domain.expenditure.v1.ReadSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data?: SupplierBillingEvent;
};
/**
 * Describes the message domain.expenditure.v1.ReadSupplierBillingEventRequest.
 * Use `create(ReadSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const ReadSupplierBillingEventRequestSchema: GenMessage<ReadSupplierBillingEventRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierBillingEventResponse
 */
export type ReadSupplierBillingEventResponse = Message<"domain.expenditure.v1.ReadSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data: SupplierBillingEvent[];
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
 * Describes the message domain.expenditure.v1.ReadSupplierBillingEventResponse.
 * Use `create(ReadSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const ReadSupplierBillingEventResponseSchema: GenMessage<ReadSupplierBillingEventResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierBillingEventRequest
 */
export type UpdateSupplierBillingEventRequest = Message<"domain.expenditure.v1.UpdateSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data?: SupplierBillingEvent;
};
/**
 * Describes the message domain.expenditure.v1.UpdateSupplierBillingEventRequest.
 * Use `create(UpdateSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierBillingEventRequestSchema: GenMessage<UpdateSupplierBillingEventRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierBillingEventResponse
 */
export type UpdateSupplierBillingEventResponse = Message<"domain.expenditure.v1.UpdateSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data: SupplierBillingEvent[];
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
 * Describes the message domain.expenditure.v1.UpdateSupplierBillingEventResponse.
 * Use `create(UpdateSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierBillingEventResponseSchema: GenMessage<UpdateSupplierBillingEventResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierBillingEventRequest
 */
export type DeleteSupplierBillingEventRequest = Message<"domain.expenditure.v1.DeleteSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data?: SupplierBillingEvent;
};
/**
 * Describes the message domain.expenditure.v1.DeleteSupplierBillingEventRequest.
 * Use `create(DeleteSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierBillingEventRequestSchema: GenMessage<DeleteSupplierBillingEventRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierBillingEventResponse
 */
export type DeleteSupplierBillingEventResponse = Message<"domain.expenditure.v1.DeleteSupplierBillingEventResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteSupplierBillingEventResponse.
 * Use `create(DeleteSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierBillingEventResponseSchema: GenMessage<DeleteSupplierBillingEventResponse>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierBillingEventsRequest
 */
export type ListSupplierBillingEventsRequest = Message<"domain.expenditure.v1.ListSupplierBillingEventsRequest"> & {
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
 * Describes the message domain.expenditure.v1.ListSupplierBillingEventsRequest.
 * Use `create(ListSupplierBillingEventsRequestSchema)` to create a new message.
 */
export declare const ListSupplierBillingEventsRequestSchema: GenMessage<ListSupplierBillingEventsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierBillingEventsResponse
 */
export type ListSupplierBillingEventsResponse = Message<"domain.expenditure.v1.ListSupplierBillingEventsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierBillingEvent data = 1;
     */
    data: SupplierBillingEvent[];
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
 * Describes the message domain.expenditure.v1.ListSupplierBillingEventsResponse.
 * Use `create(ListSupplierBillingEventsResponseSchema)` to create a new message.
 */
export declare const ListSupplierBillingEventsResponseSchema: GenMessage<ListSupplierBillingEventsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierBillingEventListPageDataRequest
 */
export type GetSupplierBillingEventListPageDataRequest = Message<"domain.expenditure.v1.GetSupplierBillingEventListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetSupplierBillingEventListPageDataRequest.
 * Use `create(GetSupplierBillingEventListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierBillingEventListPageDataRequestSchema: GenMessage<GetSupplierBillingEventListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierBillingEventListPageDataResponse
 */
export type GetSupplierBillingEventListPageDataResponse = Message<"domain.expenditure.v1.GetSupplierBillingEventListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierBillingEvent supplier_billing_event_list = 1;
     */
    supplierBillingEventList: SupplierBillingEvent[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.expenditure.v1.GetSupplierBillingEventListPageDataResponse.
 * Use `create(GetSupplierBillingEventListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierBillingEventListPageDataResponseSchema: GenMessage<GetSupplierBillingEventListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierBillingEventItemPageDataRequest
 */
export type GetSupplierBillingEventItemPageDataRequest = Message<"domain.expenditure.v1.GetSupplierBillingEventItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_billing_event_id = 1;
     */
    supplierBillingEventId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetSupplierBillingEventItemPageDataRequest.
 * Use `create(GetSupplierBillingEventItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierBillingEventItemPageDataRequestSchema: GenMessage<GetSupplierBillingEventItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierBillingEventItemPageDataResponse
 */
export type GetSupplierBillingEventItemPageDataResponse = Message<"domain.expenditure.v1.GetSupplierBillingEventItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierBillingEvent supplier_billing_event = 1;
     */
    supplierBillingEvent?: SupplierBillingEvent;
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
 * Describes the message domain.expenditure.v1.GetSupplierBillingEventItemPageDataResponse.
 * Use `create(GetSupplierBillingEventItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierBillingEventItemPageDataResponseSchema: GenMessage<GetSupplierBillingEventItemPageDataResponse>;
/**
 * Buying-side mirror of selling-side BillingEvent
 * (domain/subscription/billing_event/billing_event.proto). Anchors MILESTONE advance
 * recognition on the buying side — Expense Run / RecognizeMilestoneAdvance use cases
 * consume SupplierBillingEvent rows once they flip to BILLED.
 *
 * v1 scope: no DEFERRED status (no partial-bill remainder reserved); no PHASE_COMPLETED
 * trigger (Job/JobPhase wiring deferred). v2 lifts both restrictions.
 *
 * @generated from enum domain.expenditure.v1.SupplierBillingEventStatus
 */
export declare enum SupplierBillingEventStatus {
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_STATUS_READY = 1;
     */
    READY = 1,
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_STATUS_BILLED = 2;
     */
    BILLED = 2,
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_STATUS_WAIVED = 3;
     */
    WAIVED = 3,
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_STATUS_CANCELLED = 4;
     */
    CANCELLED = 4
}
/**
 * Describes the enum domain.expenditure.v1.SupplierBillingEventStatus.
 */
export declare const SupplierBillingEventStatusSchema: GenEnum<SupplierBillingEventStatus>;
/**
 * @generated from enum domain.expenditure.v1.SupplierBillingEventTrigger
 */
export declare enum SupplierBillingEventTrigger {
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_TRIGGER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_TRIGGER_MANUAL_EARLY = 1;
     */
    MANUAL_EARLY = 1,
    /**
     * @generated from enum value: SUPPLIER_BILLING_EVENT_TRIGGER_MANUAL_LATE = 2;
     */
    MANUAL_LATE = 2
}
/**
 * Describes the enum domain.expenditure.v1.SupplierBillingEventTrigger.
 */
export declare const SupplierBillingEventTriggerSchema: GenEnum<SupplierBillingEventTrigger>;
/**
 * @generated from service domain.expenditure.v1.SupplierBillingEventDomainService
 */
export declare const SupplierBillingEventDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.CreateSupplierBillingEvent
     */
    createSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof CreateSupplierBillingEventRequestSchema;
        output: typeof CreateSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.ReadSupplierBillingEvent
     */
    readSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof ReadSupplierBillingEventRequestSchema;
        output: typeof ReadSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.UpdateSupplierBillingEvent
     */
    updateSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof UpdateSupplierBillingEventRequestSchema;
        output: typeof UpdateSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.DeleteSupplierBillingEvent
     */
    deleteSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof DeleteSupplierBillingEventRequestSchema;
        output: typeof DeleteSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.ListSupplierBillingEvents
     */
    listSupplierBillingEvents: {
        methodKind: "unary";
        input: typeof ListSupplierBillingEventsRequestSchema;
        output: typeof ListSupplierBillingEventsResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.GetSupplierBillingEventListPageData
     */
    getSupplierBillingEventListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierBillingEventListPageDataRequestSchema;
        output: typeof GetSupplierBillingEventListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierBillingEventDomainService.GetSupplierBillingEventItemPageData
     */
    getSupplierBillingEventItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierBillingEventItemPageDataRequestSchema;
        output: typeof GetSupplierBillingEventItemPageDataResponseSchema;
    };
}>;
