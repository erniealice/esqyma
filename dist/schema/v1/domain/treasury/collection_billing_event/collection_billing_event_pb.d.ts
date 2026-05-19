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
 * @generated from message domain.treasury.v1.CollectionBillingEvent
 */
export type CollectionBillingEvent = Message<"domain.treasury.v1.CollectionBillingEvent"> & {
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
 * Describes the message domain.treasury.v1.CollectionBillingEvent.
 * Use `create(CollectionBillingEventSchema)` to create a new message.
 */
export declare const CollectionBillingEventSchema: GenMessage<CollectionBillingEvent>;
/**
 * @generated from message domain.treasury.v1.CreateCollectionBillingEventRequest
 */
export type CreateCollectionBillingEventRequest = Message<"domain.treasury.v1.CreateCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data?: CollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.CreateCollectionBillingEventRequest.
 * Use `create(CreateCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const CreateCollectionBillingEventRequestSchema: GenMessage<CreateCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.CreateCollectionBillingEventResponse
 */
export type CreateCollectionBillingEventResponse = Message<"domain.treasury.v1.CreateCollectionBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data: CollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.CreateCollectionBillingEventResponse.
 * Use `create(CreateCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const CreateCollectionBillingEventResponseSchema: GenMessage<CreateCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ReadCollectionBillingEventRequest
 */
export type ReadCollectionBillingEventRequest = Message<"domain.treasury.v1.ReadCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data?: CollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.ReadCollectionBillingEventRequest.
 * Use `create(ReadCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const ReadCollectionBillingEventRequestSchema: GenMessage<ReadCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.ReadCollectionBillingEventResponse
 */
export type ReadCollectionBillingEventResponse = Message<"domain.treasury.v1.ReadCollectionBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data: CollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.ReadCollectionBillingEventResponse.
 * Use `create(ReadCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const ReadCollectionBillingEventResponseSchema: GenMessage<ReadCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateCollectionBillingEventRequest
 */
export type UpdateCollectionBillingEventRequest = Message<"domain.treasury.v1.UpdateCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data?: CollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.UpdateCollectionBillingEventRequest.
 * Use `create(UpdateCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionBillingEventRequestSchema: GenMessage<UpdateCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateCollectionBillingEventResponse
 */
export type UpdateCollectionBillingEventResponse = Message<"domain.treasury.v1.UpdateCollectionBillingEventResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data: CollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.UpdateCollectionBillingEventResponse.
 * Use `create(UpdateCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionBillingEventResponseSchema: GenMessage<UpdateCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteCollectionBillingEventRequest
 */
export type DeleteCollectionBillingEventRequest = Message<"domain.treasury.v1.DeleteCollectionBillingEventRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data?: CollectionBillingEvent;
};
/**
 * Describes the message domain.treasury.v1.DeleteCollectionBillingEventRequest.
 * Use `create(DeleteCollectionBillingEventRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionBillingEventRequestSchema: GenMessage<DeleteCollectionBillingEventRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteCollectionBillingEventResponse
 */
export type DeleteCollectionBillingEventResponse = Message<"domain.treasury.v1.DeleteCollectionBillingEventResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteCollectionBillingEventResponse.
 * Use `create(DeleteCollectionBillingEventResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionBillingEventResponseSchema: GenMessage<DeleteCollectionBillingEventResponse>;
/**
 * @generated from message domain.treasury.v1.ListCollectionBillingEventsRequest
 */
export type ListCollectionBillingEventsRequest = Message<"domain.treasury.v1.ListCollectionBillingEventsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListCollectionBillingEventsRequest.
 * Use `create(ListCollectionBillingEventsRequestSchema)` to create a new message.
 */
export declare const ListCollectionBillingEventsRequestSchema: GenMessage<ListCollectionBillingEventsRequest>;
/**
 * @generated from message domain.treasury.v1.ListCollectionBillingEventsResponse
 */
export type ListCollectionBillingEventsResponse = Message<"domain.treasury.v1.ListCollectionBillingEventsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionBillingEvent data = 1;
     */
    data: CollectionBillingEvent[];
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
 * Describes the message domain.treasury.v1.ListCollectionBillingEventsResponse.
 * Use `create(ListCollectionBillingEventsResponseSchema)` to create a new message.
 */
export declare const ListCollectionBillingEventsResponseSchema: GenMessage<ListCollectionBillingEventsResponse>;
/**
 * @generated from service domain.treasury.v1.CollectionBillingEventDomainService
 */
export declare const CollectionBillingEventDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.CollectionBillingEventDomainService.CreateCollectionBillingEvent
     */
    createCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof CreateCollectionBillingEventRequestSchema;
        output: typeof CreateCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionBillingEventDomainService.ReadCollectionBillingEvent
     */
    readCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof ReadCollectionBillingEventRequestSchema;
        output: typeof ReadCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionBillingEventDomainService.UpdateCollectionBillingEvent
     */
    updateCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof UpdateCollectionBillingEventRequestSchema;
        output: typeof UpdateCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionBillingEventDomainService.DeleteCollectionBillingEvent
     */
    deleteCollectionBillingEvent: {
        methodKind: "unary";
        input: typeof DeleteCollectionBillingEventRequestSchema;
        output: typeof DeleteCollectionBillingEventResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionBillingEventDomainService.ListCollectionBillingEvents
     */
    listCollectionBillingEvents: {
        methodKind: "unary";
        input: typeof ListCollectionBillingEventsRequestSchema;
        output: typeof ListCollectionBillingEventsResponseSchema;
    };
}>;
