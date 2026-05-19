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
 * @generated from message domain.treasury.v1.DisbursementSupplierBillingEvent
 */
export type DisbursementSupplierBillingEvent = Message<"domain.treasury.v1.DisbursementSupplierBillingEvent"> & {
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
 * Describes the message domain.treasury.v1.DisbursementSupplierBillingEvent.
 * Use `create(DisbursementSupplierBillingEventSchema)` to create a new message.
 */
export declare const DisbursementSupplierBillingEventSchema: GenMessage<DisbursementSupplierBillingEvent>;
/**
 * @generated from message domain.treasury.v1.CreateDisbursementSupplierBillingEventRequest
 */
export type CreateDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.CreateDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data?: DisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.CreateDisbursementSupplierBillingEventRequest.
 * Use `create(CreateDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementSupplierBillingEventRequestSchema: GenMessage<CreateDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.CreateDisbursementSupplierBillingEventResponse
 */
export type CreateDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.CreateDisbursementSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data: DisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.CreateDisbursementSupplierBillingEventResponse.
 * Use `create(CreateDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementSupplierBillingEventResponseSchema: GenMessage<CreateDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ReadDisbursementSupplierBillingEventRequest
 */
export type ReadDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.ReadDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data?: DisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.ReadDisbursementSupplierBillingEventRequest.
 * Use `create(ReadDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementSupplierBillingEventRequestSchema: GenMessage<ReadDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.ReadDisbursementSupplierBillingEventResponse
 */
export type ReadDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.ReadDisbursementSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data: DisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.ReadDisbursementSupplierBillingEventResponse.
 * Use `create(ReadDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementSupplierBillingEventResponseSchema: GenMessage<ReadDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateDisbursementSupplierBillingEventRequest
 */
export type UpdateDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.UpdateDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data?: DisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.UpdateDisbursementSupplierBillingEventRequest.
 * Use `create(UpdateDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementSupplierBillingEventRequestSchema: GenMessage<UpdateDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateDisbursementSupplierBillingEventResponse
 */
export type UpdateDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.UpdateDisbursementSupplierBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data: DisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.UpdateDisbursementSupplierBillingEventResponse.
 * Use `create(UpdateDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementSupplierBillingEventResponseSchema: GenMessage<UpdateDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteDisbursementSupplierBillingEventRequest
 */
export type DeleteDisbursementSupplierBillingEventRequest = Message<"domain.treasury.v1.DeleteDisbursementSupplierBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data?: DisbursementSupplierBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.DeleteDisbursementSupplierBillingEventRequest.
 * Use `create(DeleteDisbursementSupplierBillingEventRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementSupplierBillingEventRequestSchema: GenMessage<DeleteDisbursementSupplierBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteDisbursementSupplierBillingEventResponse
 */
export type DeleteDisbursementSupplierBillingEventResponse = Message<"domain.treasury.v1.DeleteDisbursementSupplierBillingEventResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteDisbursementSupplierBillingEventResponse.
 * Use `create(DeleteDisbursementSupplierBillingEventResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementSupplierBillingEventResponseSchema: GenMessage<DeleteDisbursementSupplierBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ListDisbursementSupplierBillingEventsRequest
 */
export type ListDisbursementSupplierBillingEventsRequest = Message<"domain.treasury.v1.ListDisbursementSupplierBillingEventsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListDisbursementSupplierBillingEventsRequest.
 * Use `create(ListDisbursementSupplierBillingEventsRequestSchema)` to create a new message.
 */
export declare const ListDisbursementSupplierBillingEventsRequestSchema: GenMessage<ListDisbursementSupplierBillingEventsRequest>;
/**
 * @generated from message domain.treasury.v1.ListDisbursementSupplierBillingEventsResponse
 */
export type ListDisbursementSupplierBillingEventsResponse = Message<"domain.treasury.v1.ListDisbursementSupplierBillingEventsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSupplierBillingEvent data = 1;
     */
    data: DisbursementSupplierBillingEvent[];
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
 * Describes the message domain.treasury.v1.ListDisbursementSupplierBillingEventsResponse.
 * Use `create(ListDisbursementSupplierBillingEventsResponseSchema)` to create a new message.
 */
export declare const ListDisbursementSupplierBillingEventsResponseSchema: GenMessage<ListDisbursementSupplierBillingEventsResponse>;
/**
 * @generated from service domain.treasury.v1.DisbursementSupplierBillingEventDomainService
 */
export declare const DisbursementSupplierBillingEventDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.DisbursementSupplierBillingEventDomainService.CreateDisbursementSupplierBillingEvent
     */
    createDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof CreateDisbursementSupplierBillingEventRequestSchema;
        output: typeof CreateDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementSupplierBillingEventDomainService.ReadDisbursementSupplierBillingEvent
     */
    readDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof ReadDisbursementSupplierBillingEventRequestSchema;
        output: typeof ReadDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementSupplierBillingEventDomainService.UpdateDisbursementSupplierBillingEvent
     */
    updateDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof UpdateDisbursementSupplierBillingEventRequestSchema;
        output: typeof UpdateDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementSupplierBillingEventDomainService.DeleteDisbursementSupplierBillingEvent
     */
    deleteDisbursementSupplierBillingEvent: {
        methodKind: "unary";
        input: typeof DeleteDisbursementSupplierBillingEventRequestSchema;
        output: typeof DeleteDisbursementSupplierBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementSupplierBillingEventDomainService.ListDisbursementSupplierBillingEvents
     */
    listDisbursementSupplierBillingEvents: {
        methodKind: "unary";
        input: typeof ListDisbursementSupplierBillingEventsRequestSchema;
        output: typeof ListDisbursementSupplierBillingEventsResponseSchema;
    };
}>;
