import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/collection_billing_event/collection_billing_event.proto.
 */
export declare const file_domain_treasury_collection_billing_event_collection_billing_event: GenFile;
/**
 * Junction entity linking a MILESTONE advance TreasuryCollection to one or more
 * BillingEvent rows. tranche_amount records the portion of the advance assigned
 * to each milestone; SUM(tranche_amount) <= TreasuryCollection.amount enforced
 * in application layer (no DB constraint v1).
 *
 * @generated from message domain.treasury.v1.TreasuryCollectionBillingEvent
 */
export type TreasuryCollectionBillingEvent = Message<"domain.treasury.v1.TreasuryCollectionBillingEvent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string treasury_collection_id = 10;
     */
    treasuryCollectionId: string;
    /**
     * @generated from field: string billing_event_id = 11;
     */
    billingEventId: string;
    /**
     * Centavos; portion of the advance assigned to this milestone.
     *
     * @generated from field: int64 tranche_amount = 20;
     */
    trancheAmount: bigint;
    /**
     * Set when this junction is consumed by RecognizeMilestoneAdvance.
     *
     * @generated from field: optional string revenue_id = 30;
     */
    revenueId?: string;
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
 * Describes the message domain.treasury.v1.TreasuryCollectionBillingEvent.
 * Use `create(TreasuryCollectionBillingEventSchema)` to create a new message.
 */
export declare const TreasuryCollectionBillingEventSchema: GenMessage<TreasuryCollectionBillingEvent>;
/**
 * @generated from message domain.treasury.v1.CreateTreasuryCollectionBillingEventRequest
 */
export type CreateTreasuryCollectionBillingEventRequest = Message<"domain.treasury.v1.CreateTreasuryCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data?: TreasuryCollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.CreateTreasuryCollectionBillingEventRequest.
 * Use `create(CreateTreasuryCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const CreateTreasuryCollectionBillingEventRequestSchema: GenMessage<CreateTreasuryCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.CreateTreasuryCollectionBillingEventResponse
 */
export type CreateTreasuryCollectionBillingEventResponse = Message<"domain.treasury.v1.CreateTreasuryCollectionBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data: TreasuryCollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.CreateTreasuryCollectionBillingEventResponse.
 * Use `create(CreateTreasuryCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const CreateTreasuryCollectionBillingEventResponseSchema: GenMessage<CreateTreasuryCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ReadTreasuryCollectionBillingEventRequest
 */
export type ReadTreasuryCollectionBillingEventRequest = Message<"domain.treasury.v1.ReadTreasuryCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data?: TreasuryCollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.ReadTreasuryCollectionBillingEventRequest.
 * Use `create(ReadTreasuryCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const ReadTreasuryCollectionBillingEventRequestSchema: GenMessage<ReadTreasuryCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.ReadTreasuryCollectionBillingEventResponse
 */
export type ReadTreasuryCollectionBillingEventResponse = Message<"domain.treasury.v1.ReadTreasuryCollectionBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data: TreasuryCollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.ReadTreasuryCollectionBillingEventResponse.
 * Use `create(ReadTreasuryCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const ReadTreasuryCollectionBillingEventResponseSchema: GenMessage<ReadTreasuryCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateTreasuryCollectionBillingEventRequest
 */
export type UpdateTreasuryCollectionBillingEventRequest = Message<"domain.treasury.v1.UpdateTreasuryCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data?: TreasuryCollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.UpdateTreasuryCollectionBillingEventRequest.
 * Use `create(UpdateTreasuryCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const UpdateTreasuryCollectionBillingEventRequestSchema: GenMessage<UpdateTreasuryCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateTreasuryCollectionBillingEventResponse
 */
export type UpdateTreasuryCollectionBillingEventResponse = Message<"domain.treasury.v1.UpdateTreasuryCollectionBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data: TreasuryCollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.UpdateTreasuryCollectionBillingEventResponse.
 * Use `create(UpdateTreasuryCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const UpdateTreasuryCollectionBillingEventResponseSchema: GenMessage<UpdateTreasuryCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteTreasuryCollectionBillingEventRequest
 */
export type DeleteTreasuryCollectionBillingEventRequest = Message<"domain.treasury.v1.DeleteTreasuryCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data?: TreasuryCollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.DeleteTreasuryCollectionBillingEventRequest.
 * Use `create(DeleteTreasuryCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const DeleteTreasuryCollectionBillingEventRequestSchema: GenMessage<DeleteTreasuryCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteTreasuryCollectionBillingEventResponse
 */
export type DeleteTreasuryCollectionBillingEventResponse = Message<"domain.treasury.v1.DeleteTreasuryCollectionBillingEventResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteTreasuryCollectionBillingEventResponse.
 * Use `create(DeleteTreasuryCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const DeleteTreasuryCollectionBillingEventResponseSchema: GenMessage<DeleteTreasuryCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ListTreasuryCollectionBillingEventsRequest
 */
export type ListTreasuryCollectionBillingEventsRequest = Message<"domain.treasury.v1.ListTreasuryCollectionBillingEventsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListTreasuryCollectionBillingEventsRequest.
 * Use `create(ListTreasuryCollectionBillingEventsRequestSchema)` to create a new message.
 */
export declare const ListTreasuryCollectionBillingEventsRequestSchema: GenMessage<ListTreasuryCollectionBillingEventsRequest>;
/**
 * @generated from message domain.treasury.v1.ListTreasuryCollectionBillingEventsResponse
 */
export type ListTreasuryCollectionBillingEventsResponse = Message<"domain.treasury.v1.ListTreasuryCollectionBillingEventsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.TreasuryCollectionBillingEvent data = 1;
     */
    data: TreasuryCollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.ListTreasuryCollectionBillingEventsResponse.
 * Use `create(ListTreasuryCollectionBillingEventsResponseSchema)` to create a new message.
 */
export declare const ListTreasuryCollectionBillingEventsResponseSchema: GenMessage<ListTreasuryCollectionBillingEventsResponse>;
/**
 * @generated from service domain.treasury.v1.TreasuryCollectionBillingEventDomainService
 */
export declare const TreasuryCollectionBillingEventDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.TreasuryCollectionBillingEventDomainService.CreateTreasuryCollectionBillingEvent
     */
    createTreasuryCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof CreateTreasuryCollectionBillingEventRequestSchema;
        output: typeof CreateTreasuryCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryCollectionBillingEventDomainService.ReadTreasuryCollectionBillingEvent
     */
    readTreasuryCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof ReadTreasuryCollectionBillingEventRequestSchema;
        output: typeof ReadTreasuryCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryCollectionBillingEventDomainService.UpdateTreasuryCollectionBillingEvent
     */
    updateTreasuryCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof UpdateTreasuryCollectionBillingEventRequestSchema;
        output: typeof UpdateTreasuryCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryCollectionBillingEventDomainService.DeleteTreasuryCollectionBillingEvent
     */
    deleteTreasuryCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof DeleteTreasuryCollectionBillingEventRequestSchema;
        output: typeof DeleteTreasuryCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.TreasuryCollectionBillingEventDomainService.ListTreasuryCollectionBillingEvents
     */
    listTreasuryCollectionBillingEvents: {
        methodKind: "unary";
        input: typeof ListTreasuryCollectionBillingEventsRequestSchema;
        output: typeof ListTreasuryCollectionBillingEventsResponseSchema;
    };
}>;
