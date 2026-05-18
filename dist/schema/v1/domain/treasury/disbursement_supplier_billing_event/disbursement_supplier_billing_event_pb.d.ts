import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/disbursement_supplier_billing_event/disbursement_supplier_billing_event.proto.
 */
export declare const file_domain_treasury_disbursement_supplier_billing_event_disbursement_supplier_billing_event: GenFile;
/**
 * Junction entity linking a MILESTONE advance TreasuryDisbursement to one or more
 * SupplierBillingEvent rows (buying-side mirror of TreasuryCollectionBillingEvent).
 *
 * @generated from message domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent
 */
export type TreasuryDisbursementSupplierBillingEvent = Message<"domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string treasury_disbursement_id = 10;
     */
    treasuryDisbursementId: string;
    /**
     * @generated from field: string supplier_billing_event_id = 11;
     */
    supplierBillingEventId: string;
    /**
     * Centavos; portion of the advance assigned to this milestone.
     *
     * @generated from field: int64 tranche_amount = 20;
     */
    trancheAmount: bigint;
    /**
     * Set when this junction is consumed by RecognizeMilestoneAdvance.
     *
     * @generated from field: optional string expense_recognition_id = 30;
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
 * Describes the message domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent.
 * Use `create(TreasuryDisbursementSupplierBillingEventSchema)` to create a new message.
 */
export declare const TreasuryDisbursementSupplierBillingEventSchema: GenMessage<TreasuryDisbursementSupplierBillingEvent>;
/**
 * @generated from message domain.treasury.v1.CreateTreasuryDisbursementSupplierBillingEventRequest
 */
export type CreateTreasuryDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.CreateTreasuryDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data?: TreasuryDisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.CreateTreasuryDisbursementSupplierBillingEventRequest.
 * Use `create(CreateTreasuryDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const CreateTreasuryDisbursementSupplierBillingEventRequestSchema: GenMessage<CreateTreasuryDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.CreateTreasuryDisbursementSupplierBillingEventResponse
 */
export type CreateTreasuryDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.CreateTreasuryDisbursementSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data: TreasuryDisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.CreateTreasuryDisbursementSupplierBillingEventResponse.
 * Use `create(CreateTreasuryDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const CreateTreasuryDisbursementSupplierBillingEventResponseSchema: GenMessage<CreateTreasuryDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ReadTreasuryDisbursementSupplierBillingEventRequest
 */
export type ReadTreasuryDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.ReadTreasuryDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data?: TreasuryDisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.ReadTreasuryDisbursementSupplierBillingEventRequest.
 * Use `create(ReadTreasuryDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const ReadTreasuryDisbursementSupplierBillingEventRequestSchema: GenMessage<ReadTreasuryDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.ReadTreasuryDisbursementSupplierBillingEventResponse
 */
export type ReadTreasuryDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.ReadTreasuryDisbursementSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data: TreasuryDisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.ReadTreasuryDisbursementSupplierBillingEventResponse.
 * Use `create(ReadTreasuryDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const ReadTreasuryDisbursementSupplierBillingEventResponseSchema: GenMessage<ReadTreasuryDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateTreasuryDisbursementSupplierBillingEventRequest
 */
export type UpdateTreasuryDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.UpdateTreasuryDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data?: TreasuryDisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.UpdateTreasuryDisbursementSupplierBillingEventRequest.
 * Use `create(UpdateTreasuryDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const UpdateTreasuryDisbursementSupplierBillingEventRequestSchema: GenMessage<UpdateTreasuryDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateTreasuryDisbursementSupplierBillingEventResponse
 */
export type UpdateTreasuryDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.UpdateTreasuryDisbursementSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data: TreasuryDisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.UpdateTreasuryDisbursementSupplierBillingEventResponse.
 * Use `create(UpdateTreasuryDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const UpdateTreasuryDisbursementSupplierBillingEventResponseSchema: GenMessage<UpdateTreasuryDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteTreasuryDisbursementSupplierBillingEventRequest
 */
export type DeleteTreasuryDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.DeleteTreasuryDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data?: TreasuryDisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.DeleteTreasuryDisbursementSupplierBillingEventRequest.
 * Use `create(DeleteTreasuryDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const DeleteTreasuryDisbursementSupplierBillingEventRequestSchema: GenMessage<DeleteTreasuryDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteTreasuryDisbursementSupplierBillingEventResponse
 */
export type DeleteTreasuryDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.DeleteTreasuryDisbursementSupplierBillingEventResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteTreasuryDisbursementSupplierBillingEventResponse.
 * Use `create(DeleteTreasuryDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const DeleteTreasuryDisbursementSupplierBillingEventResponseSchema: GenMessage<DeleteTreasuryDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ListTreasuryDisbursementSupplierBillingEventsRequest
 */
export type ListTreasuryDisbursementSupplierBillingEventsRequest = Message<"domain.treasury.v1.ListTreasuryDisbursementSupplierBillingEventsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListTreasuryDisbursementSupplierBillingEventsRequest.
 * Use `create(ListTreasuryDisbursementSupplierBillingEventsRequestSchema)` to create a new message.
 */
export declare const ListTreasuryDisbursementSupplierBillingEventsRequestSchema: GenMessage<ListTreasuryDisbursementSupplierBillingEventsRequest>;
/**
 * @generated from message domain.treasury.v1.ListTreasuryDisbursementSupplierBillingEventsResponse
 */
export type ListTreasuryDisbursementSupplierBillingEventsResponse = Message<"domain.treasury.v1.ListTreasuryDisbursementSupplierBillingEventsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryDisbursementSupplierBillingEvent data = 1;
     */
    data: TreasuryDisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.ListTreasuryDisbursementSupplierBillingEventsResponse.
 * Use `create(ListTreasuryDisbursementSupplierBillingEventsResponseSchema)` to create a new message.
 */
export declare const ListTreasuryDisbursementSupplierBillingEventsResponseSchema: GenMessage<ListTreasuryDisbursementSupplierBillingEventsResponse>;
/**
 * @generated from service domain.treasury.v1.TreasuryDisbursementSupplierBillingEventDomainService
 */
export declare const TreasuryDisbursementSupplierBillingEventDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.TreasuryDisbursementSupplierBillingEventDomainService.CreateTreasuryDisbursementSupplierBillingEvent
     */
    createTreasuryDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof CreateTreasuryDisbursementSupplierBillingEventRequestSchema;
        output: typeof CreateTreasuryDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryDisbursementSupplierBillingEventDomainService.ReadTreasuryDisbursementSupplierBillingEvent
     */
    readTreasuryDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof ReadTreasuryDisbursementSupplierBillingEventRequestSchema;
        output: typeof ReadTreasuryDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryDisbursementSupplierBillingEventDomainService.UpdateTreasuryDisbursementSupplierBillingEvent
     */
    updateTreasuryDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof UpdateTreasuryDisbursementSupplierBillingEventRequestSchema;
        output: typeof UpdateTreasuryDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryDisbursementSupplierBillingEventDomainService.DeleteTreasuryDisbursementSupplierBillingEvent
     */
    deleteTreasuryDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof DeleteTreasuryDisbursementSupplierBillingEventRequestSchema;
        output: typeof DeleteTreasuryDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryDisbursementSupplierBillingEventDomainService.ListTreasuryDisbursementSupplierBillingEvents
     */
    listTreasuryDisbursementSupplierBillingEvents: {
        methodKind: "unary";
        input: typeof ListTreasuryDisbursementSupplierBillingEventsRequestSchema;
        output: typeof ListTreasuryDisbursementSupplierBillingEventsResponseSchema;
    };
}>;
