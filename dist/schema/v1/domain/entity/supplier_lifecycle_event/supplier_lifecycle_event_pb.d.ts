import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier_lifecycle_event/supplier_lifecycle_event.proto.
 */
export declare const file_domain_entity_supplier_lifecycle_event_supplier_lifecycle_event: GenFile;
/**
 * SupplierLifecycleEvent is an append-only audit-log row for status changes on
 * a supplier counterparty. UI shows a reverse-chronological timeline.
 *
 * Q13 decision: single global enum-as-string for `kind`, with `category` field
 * for UI filters (employee | vendor | regulator).
 *
 * @generated from message domain.entity.v1.SupplierLifecycleEvent
 */
export type SupplierLifecycleEvent = Message<"domain.entity.v1.SupplierLifecycleEvent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string supplier_id = 3;
     */
    supplierId: string;
    /**
     * "HIRED" | "REGULARIZED" | "PROMOTED" | "TRANSFERRED" | "SUSPENDED" |
     * "TERMINATED" | "ONBOARDED" | "BLACKLISTED" | "REINSTATED" | "OFFBOARDED"
     *
     * @generated from field: string kind = 4;
     */
    kind: string;
    /**
     * "employee" | "vendor" | "regulator" — drives UI filter chips.
     *
     * @generated from field: string category = 5;
     */
    category: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: string event_date = 6;
     */
    eventDate: string;
    /**
     * FK — the contract this event created/closed (no DB constraint)
     *
     * @generated from field: optional string supplier_contract_id = 7;
     */
    supplierContractId?: string;
    /**
     * @generated from field: optional string actor_user_id = 8;
     */
    actorUserId?: string;
    /**
     * @generated from field: optional string reason = 9;
     */
    reason?: string;
    /**
     * JSON-encoded jsonb
     *
     * @generated from field: optional string metadata = 10;
     */
    metadata?: string;
    /**
     * Audit (creation only — append-only entity)
     *
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.entity.v1.SupplierLifecycleEvent.
 * Use `create(SupplierLifecycleEventSchema)` to create a new message.
 */
export declare const SupplierLifecycleEventSchema: GenMessage<SupplierLifecycleEvent>;
/**
 * @generated from message domain.entity.v1.CreateSupplierLifecycleEventRequest
 */
export type CreateSupplierLifecycleEventRequest = Message<"domain.entity.v1.CreateSupplierLifecycleEventRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierLifecycleEvent data = 1;
     */
    data?: SupplierLifecycleEvent;
};
/**
 * Describes the message domain.entity.v1.CreateSupplierLifecycleEventRequest.
 * Use `create(CreateSupplierLifecycleEventRequestSchema)` to create a new message.
 */
export declare const CreateSupplierLifecycleEventRequestSchema: GenMessage<CreateSupplierLifecycleEventRequest>;
/**
 * @generated from message domain.entity.v1.CreateSupplierLifecycleEventResponse
 */
export type CreateSupplierLifecycleEventResponse = Message<"domain.entity.v1.CreateSupplierLifecycleEventResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierLifecycleEvent data = 1;
     */
    data: SupplierLifecycleEvent[];
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
 * Describes the message domain.entity.v1.CreateSupplierLifecycleEventResponse.
 * Use `create(CreateSupplierLifecycleEventResponseSchema)` to create a new message.
 */
export declare const CreateSupplierLifecycleEventResponseSchema: GenMessage<CreateSupplierLifecycleEventResponse>;
/**
 * @generated from message domain.entity.v1.ReadSupplierLifecycleEventRequest
 */
export type ReadSupplierLifecycleEventRequest = Message<"domain.entity.v1.ReadSupplierLifecycleEventRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierLifecycleEvent data = 1;
     */
    data?: SupplierLifecycleEvent;
};
/**
 * Describes the message domain.entity.v1.ReadSupplierLifecycleEventRequest.
 * Use `create(ReadSupplierLifecycleEventRequestSchema)` to create a new message.
 */
export declare const ReadSupplierLifecycleEventRequestSchema: GenMessage<ReadSupplierLifecycleEventRequest>;
/**
 * @generated from message domain.entity.v1.ReadSupplierLifecycleEventResponse
 */
export type ReadSupplierLifecycleEventResponse = Message<"domain.entity.v1.ReadSupplierLifecycleEventResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierLifecycleEvent data = 1;
     */
    data: SupplierLifecycleEvent[];
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
 * Describes the message domain.entity.v1.ReadSupplierLifecycleEventResponse.
 * Use `create(ReadSupplierLifecycleEventResponseSchema)` to create a new message.
 */
export declare const ReadSupplierLifecycleEventResponseSchema: GenMessage<ReadSupplierLifecycleEventResponse>;
/**
 * @generated from message domain.entity.v1.ListSupplierLifecycleEventsRequest
 */
export type ListSupplierLifecycleEventsRequest = Message<"domain.entity.v1.ListSupplierLifecycleEventsRequest"> & {
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
 * Describes the message domain.entity.v1.ListSupplierLifecycleEventsRequest.
 * Use `create(ListSupplierLifecycleEventsRequestSchema)` to create a new message.
 */
export declare const ListSupplierLifecycleEventsRequestSchema: GenMessage<ListSupplierLifecycleEventsRequest>;
/**
 * @generated from message domain.entity.v1.ListSupplierLifecycleEventsResponse
 */
export type ListSupplierLifecycleEventsResponse = Message<"domain.entity.v1.ListSupplierLifecycleEventsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierLifecycleEvent data = 1;
     */
    data: SupplierLifecycleEvent[];
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
 * Describes the message domain.entity.v1.ListSupplierLifecycleEventsResponse.
 * Use `create(ListSupplierLifecycleEventsResponseSchema)` to create a new message.
 */
export declare const ListSupplierLifecycleEventsResponseSchema: GenMessage<ListSupplierLifecycleEventsResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierLifecycleEventListPageDataRequest
 */
export type GetSupplierLifecycleEventListPageDataRequest = Message<"domain.entity.v1.GetSupplierLifecycleEventListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetSupplierLifecycleEventListPageDataRequest.
 * Use `create(GetSupplierLifecycleEventListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierLifecycleEventListPageDataRequestSchema: GenMessage<GetSupplierLifecycleEventListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierLifecycleEventListPageDataResponse
 */
export type GetSupplierLifecycleEventListPageDataResponse = Message<"domain.entity.v1.GetSupplierLifecycleEventListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierLifecycleEvent supplier_lifecycle_event_list = 1;
     */
    supplierLifecycleEventList: SupplierLifecycleEvent[];
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
 * Describes the message domain.entity.v1.GetSupplierLifecycleEventListPageDataResponse.
 * Use `create(GetSupplierLifecycleEventListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierLifecycleEventListPageDataResponseSchema: GenMessage<GetSupplierLifecycleEventListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierLifecycleEventItemPageDataRequest
 */
export type GetSupplierLifecycleEventItemPageDataRequest = Message<"domain.entity.v1.GetSupplierLifecycleEventItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_lifecycle_event_id = 1;
     */
    supplierLifecycleEventId: string;
};
/**
 * Describes the message domain.entity.v1.GetSupplierLifecycleEventItemPageDataRequest.
 * Use `create(GetSupplierLifecycleEventItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierLifecycleEventItemPageDataRequestSchema: GenMessage<GetSupplierLifecycleEventItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierLifecycleEventItemPageDataResponse
 */
export type GetSupplierLifecycleEventItemPageDataResponse = Message<"domain.entity.v1.GetSupplierLifecycleEventItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.SupplierLifecycleEvent supplier_lifecycle_event = 1;
     */
    supplierLifecycleEvent?: SupplierLifecycleEvent;
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
 * Describes the message domain.entity.v1.GetSupplierLifecycleEventItemPageDataResponse.
 * Use `create(GetSupplierLifecycleEventItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierLifecycleEventItemPageDataResponseSchema: GenMessage<GetSupplierLifecycleEventItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.SupplierLifecycleEventDomainService
 */
export declare const SupplierLifecycleEventDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierLifecycleEventDomainService.CreateSupplierLifecycleEvent
     */
    createSupplierLifecycleEvent: {
        methodKind: "unary";
        input: typeof CreateSupplierLifecycleEventRequestSchema;
        output: typeof CreateSupplierLifecycleEventResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierLifecycleEventDomainService.ReadSupplierLifecycleEvent
     */
    readSupplierLifecycleEvent: {
        methodKind: "unary";
        input: typeof ReadSupplierLifecycleEventRequestSchema;
        output: typeof ReadSupplierLifecycleEventResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierLifecycleEventDomainService.ListSupplierLifecycleEvents
     */
    listSupplierLifecycleEvents: {
        methodKind: "unary";
        input: typeof ListSupplierLifecycleEventsRequestSchema;
        output: typeof ListSupplierLifecycleEventsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierLifecycleEventDomainService.GetSupplierLifecycleEventListPageData
     */
    getSupplierLifecycleEventListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierLifecycleEventListPageDataRequestSchema;
        output: typeof GetSupplierLifecycleEventListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierLifecycleEventDomainService.GetSupplierLifecycleEventItemPageData
     */
    getSupplierLifecycleEventItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierLifecycleEventItemPageDataRequestSchema;
        output: typeof GetSupplierLifecycleEventItemPageDataResponseSchema;
    };
}>;
