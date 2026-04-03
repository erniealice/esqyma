import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Fulfillment } from "./fulfillment_pb";
import type { FulfillmentItem } from "./fulfillment_item_pb";
import type { FulfillmentStatusEvent } from "./fulfillment_status_event_pb";
import type { FulfillmentReturn } from "./fulfillment_return_pb";
import type { Error } from "../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../common/pagination_pb";
import type { FilterRequest } from "../common/filter_pb";
import type { SortRequest } from "../common/sort_pb";
import type { SearchRequest } from "../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/fulfillment/fulfillment_service.proto.
 */
export declare const file_domain_fulfillment_fulfillment_service: GenFile;
/**
 * Standard CRUD messages
 *
 * @generated from message domain.fulfillment.v1.CreateFulfillmentRequest
 */
export type CreateFulfillmentRequest = Message<"domain.fulfillment.v1.CreateFulfillmentRequest"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment data = 1;
     */
    data?: Fulfillment;
};
/**
 * Describes the message domain.fulfillment.v1.CreateFulfillmentRequest.
 * Use `create(CreateFulfillmentRequestSchema)` to create a new message.
 */
export declare const CreateFulfillmentRequestSchema: GenMessage<CreateFulfillmentRequest>;
/**
 * @generated from message domain.fulfillment.v1.CreateFulfillmentResponse
 */
export type CreateFulfillmentResponse = Message<"domain.fulfillment.v1.CreateFulfillmentResponse"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment data = 1;
     */
    data?: Fulfillment;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.CreateFulfillmentResponse.
 * Use `create(CreateFulfillmentResponseSchema)` to create a new message.
 */
export declare const CreateFulfillmentResponseSchema: GenMessage<CreateFulfillmentResponse>;
/**
 * @generated from message domain.fulfillment.v1.GetFulfillmentRequest
 */
export type GetFulfillmentRequest = Message<"domain.fulfillment.v1.GetFulfillmentRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.fulfillment.v1.GetFulfillmentRequest.
 * Use `create(GetFulfillmentRequestSchema)` to create a new message.
 */
export declare const GetFulfillmentRequestSchema: GenMessage<GetFulfillmentRequest>;
/**
 * @generated from message domain.fulfillment.v1.GetFulfillmentResponse
 */
export type GetFulfillmentResponse = Message<"domain.fulfillment.v1.GetFulfillmentResponse"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment data = 1;
     */
    data?: Fulfillment;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.GetFulfillmentResponse.
 * Use `create(GetFulfillmentResponseSchema)` to create a new message.
 */
export declare const GetFulfillmentResponseSchema: GenMessage<GetFulfillmentResponse>;
/**
 * @generated from message domain.fulfillment.v1.UpdateFulfillmentRequest
 */
export type UpdateFulfillmentRequest = Message<"domain.fulfillment.v1.UpdateFulfillmentRequest"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment data = 1;
     */
    data?: Fulfillment;
};
/**
 * Describes the message domain.fulfillment.v1.UpdateFulfillmentRequest.
 * Use `create(UpdateFulfillmentRequestSchema)` to create a new message.
 */
export declare const UpdateFulfillmentRequestSchema: GenMessage<UpdateFulfillmentRequest>;
/**
 * @generated from message domain.fulfillment.v1.UpdateFulfillmentResponse
 */
export type UpdateFulfillmentResponse = Message<"domain.fulfillment.v1.UpdateFulfillmentResponse"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment data = 1;
     */
    data?: Fulfillment;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.UpdateFulfillmentResponse.
 * Use `create(UpdateFulfillmentResponseSchema)` to create a new message.
 */
export declare const UpdateFulfillmentResponseSchema: GenMessage<UpdateFulfillmentResponse>;
/**
 * @generated from message domain.fulfillment.v1.DeleteFulfillmentRequest
 */
export type DeleteFulfillmentRequest = Message<"domain.fulfillment.v1.DeleteFulfillmentRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.fulfillment.v1.DeleteFulfillmentRequest.
 * Use `create(DeleteFulfillmentRequestSchema)` to create a new message.
 */
export declare const DeleteFulfillmentRequestSchema: GenMessage<DeleteFulfillmentRequest>;
/**
 * @generated from message domain.fulfillment.v1.DeleteFulfillmentResponse
 */
export type DeleteFulfillmentResponse = Message<"domain.fulfillment.v1.DeleteFulfillmentResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.DeleteFulfillmentResponse.
 * Use `create(DeleteFulfillmentResponseSchema)` to create a new message.
 */
export declare const DeleteFulfillmentResponseSchema: GenMessage<DeleteFulfillmentResponse>;
/**
 * List with filters
 *
 * @generated from message domain.fulfillment.v1.ListFulfillmentsRequest
 */
export type ListFulfillmentsRequest = Message<"domain.fulfillment.v1.ListFulfillmentsRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filter = 2;
     */
    filter?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.fulfillment.v1.ListFulfillmentsRequest.
 * Use `create(ListFulfillmentsRequestSchema)` to create a new message.
 */
export declare const ListFulfillmentsRequestSchema: GenMessage<ListFulfillmentsRequest>;
/**
 * @generated from message domain.fulfillment.v1.ListFulfillmentsResponse
 */
export type ListFulfillmentsResponse = Message<"domain.fulfillment.v1.ListFulfillmentsResponse"> & {
    /**
     * @generated from field: repeated domain.fulfillment.v1.Fulfillment data = 1;
     */
    data: Fulfillment[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.ListFulfillmentsResponse.
 * Use `create(ListFulfillmentsResponseSchema)` to create a new message.
 */
export declare const ListFulfillmentsResponseSchema: GenMessage<ListFulfillmentsResponse>;
/**
 * Page data (enriched for views)
 *
 * @generated from message domain.fulfillment.v1.GetFulfillmentListPageDataRequest
 */
export type GetFulfillmentListPageDataRequest = Message<"domain.fulfillment.v1.GetFulfillmentListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filter = 2;
     */
    filter?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.fulfillment.v1.GetFulfillmentListPageDataRequest.
 * Use `create(GetFulfillmentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetFulfillmentListPageDataRequestSchema: GenMessage<GetFulfillmentListPageDataRequest>;
/**
 * @generated from message domain.fulfillment.v1.GetFulfillmentListPageDataResponse
 */
export type GetFulfillmentListPageDataResponse = Message<"domain.fulfillment.v1.GetFulfillmentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.fulfillment.v1.FulfillmentListRow rows = 1;
     */
    rows: FulfillmentListRow[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.GetFulfillmentListPageDataResponse.
 * Use `create(GetFulfillmentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetFulfillmentListPageDataResponseSchema: GenMessage<GetFulfillmentListPageDataResponse>;
/**
 * @generated from message domain.fulfillment.v1.FulfillmentListRow
 */
export type FulfillmentListRow = Message<"domain.fulfillment.v1.FulfillmentListRow"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment fulfillment = 1;
     */
    fulfillment?: Fulfillment;
    /**
     * @generated from field: string supplier_name = 2;
     */
    supplierName: string;
    /**
     * @generated from field: int32 item_count = 3;
     */
    itemCount: number;
    /**
     * @generated from field: int32 status_event_count = 4;
     */
    statusEventCount: number;
};
/**
 * Describes the message domain.fulfillment.v1.FulfillmentListRow.
 * Use `create(FulfillmentListRowSchema)` to create a new message.
 */
export declare const FulfillmentListRowSchema: GenMessage<FulfillmentListRow>;
/**
 * Item page data
 *
 * @generated from message domain.fulfillment.v1.GetFulfillmentItemPageDataRequest
 */
export type GetFulfillmentItemPageDataRequest = Message<"domain.fulfillment.v1.GetFulfillmentItemPageDataRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.fulfillment.v1.GetFulfillmentItemPageDataRequest.
 * Use `create(GetFulfillmentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetFulfillmentItemPageDataRequestSchema: GenMessage<GetFulfillmentItemPageDataRequest>;
/**
 * @generated from message domain.fulfillment.v1.GetFulfillmentItemPageDataResponse
 */
export type GetFulfillmentItemPageDataResponse = Message<"domain.fulfillment.v1.GetFulfillmentItemPageDataResponse"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment fulfillment = 1;
     */
    fulfillment?: Fulfillment;
    /**
     * @generated from field: repeated domain.fulfillment.v1.FulfillmentItem items = 2;
     */
    items: FulfillmentItem[];
    /**
     * @generated from field: repeated domain.fulfillment.v1.FulfillmentStatusEvent status_events = 3;
     */
    statusEvents: FulfillmentStatusEvent[];
    /**
     * @generated from field: repeated domain.fulfillment.v1.FulfillmentReturn returns = 4;
     */
    returns: FulfillmentReturn[];
    /**
     * @generated from field: string supplier_name = 5;
     */
    supplierName: string;
    /**
     * @generated from field: string revenue_reference = 6;
     */
    revenueReference: string;
    /**
     * resolved by use case, not state machine import
     *
     * @generated from field: repeated string allowed_events = 7;
     */
    allowedEvents: string[];
    /**
     * @generated from field: domain.common.v1.Error error = 8;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.GetFulfillmentItemPageDataResponse.
 * Use `create(GetFulfillmentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetFulfillmentItemPageDataResponseSchema: GenMessage<GetFulfillmentItemPageDataResponse>;
/**
 * Status transition
 *
 * @generated from message domain.fulfillment.v1.TransitionStatusRequest
 */
export type TransitionStatusRequest = Message<"domain.fulfillment.v1.TransitionStatusRequest"> & {
    /**
     * @generated from field: string fulfillment_id = 1;
     */
    fulfillmentId: string;
    /**
     * "mark_ready", "dispatch", "deliver", etc.
     *
     * @generated from field: string event = 2;
     */
    event: string;
    /**
     * @generated from field: string triggered_by_id = 3;
     */
    triggeredById: string;
    /**
     * @generated from field: string reason = 4;
     */
    reason: string;
    /**
     * @generated from field: string provider_status = 5;
     */
    providerStatus: string;
    /**
     * @generated from field: string provider_reference = 6;
     */
    providerReference: string;
};
/**
 * Describes the message domain.fulfillment.v1.TransitionStatusRequest.
 * Use `create(TransitionStatusRequestSchema)` to create a new message.
 */
export declare const TransitionStatusRequestSchema: GenMessage<TransitionStatusRequest>;
/**
 * @generated from message domain.fulfillment.v1.TransitionStatusResponse
 */
export type TransitionStatusResponse = Message<"domain.fulfillment.v1.TransitionStatusResponse"> & {
    /**
     * @generated from field: domain.fulfillment.v1.Fulfillment data = 1;
     */
    data?: Fulfillment;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.TransitionStatusResponse.
 * Use `create(TransitionStatusResponseSchema)` to create a new message.
 */
export declare const TransitionStatusResponseSchema: GenMessage<TransitionStatusResponse>;
/**
 * Status events list
 *
 * @generated from message domain.fulfillment.v1.ListStatusEventsRequest
 */
export type ListStatusEventsRequest = Message<"domain.fulfillment.v1.ListStatusEventsRequest"> & {
    /**
     * @generated from field: string fulfillment_id = 1;
     */
    fulfillmentId: string;
};
/**
 * Describes the message domain.fulfillment.v1.ListStatusEventsRequest.
 * Use `create(ListStatusEventsRequestSchema)` to create a new message.
 */
export declare const ListStatusEventsRequestSchema: GenMessage<ListStatusEventsRequest>;
/**
 * @generated from message domain.fulfillment.v1.ListStatusEventsResponse
 */
export type ListStatusEventsResponse = Message<"domain.fulfillment.v1.ListStatusEventsResponse"> & {
    /**
     * @generated from field: repeated domain.fulfillment.v1.FulfillmentStatusEvent events = 1;
     */
    events: FulfillmentStatusEvent[];
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.fulfillment.v1.ListStatusEventsResponse.
 * Use `create(ListStatusEventsResponseSchema)` to create a new message.
 */
export declare const ListStatusEventsResponseSchema: GenMessage<ListStatusEventsResponse>;
/**
 * @generated from service domain.fulfillment.v1.FulfillmentDomainService
 */
export declare const FulfillmentDomainService: GenService<{
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.CreateFulfillment
     */
    createFulfillment: {
        methodKind: "unary";
        input: typeof CreateFulfillmentRequestSchema;
        output: typeof CreateFulfillmentResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.GetFulfillment
     */
    getFulfillment: {
        methodKind: "unary";
        input: typeof GetFulfillmentRequestSchema;
        output: typeof GetFulfillmentResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.UpdateFulfillment
     */
    updateFulfillment: {
        methodKind: "unary";
        input: typeof UpdateFulfillmentRequestSchema;
        output: typeof UpdateFulfillmentResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.DeleteFulfillment
     */
    deleteFulfillment: {
        methodKind: "unary";
        input: typeof DeleteFulfillmentRequestSchema;
        output: typeof DeleteFulfillmentResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.ListFulfillments
     */
    listFulfillments: {
        methodKind: "unary";
        input: typeof ListFulfillmentsRequestSchema;
        output: typeof ListFulfillmentsResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.GetFulfillmentListPageData
     */
    getFulfillmentListPageData: {
        methodKind: "unary";
        input: typeof GetFulfillmentListPageDataRequestSchema;
        output: typeof GetFulfillmentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.GetFulfillmentItemPageData
     */
    getFulfillmentItemPageData: {
        methodKind: "unary";
        input: typeof GetFulfillmentItemPageDataRequestSchema;
        output: typeof GetFulfillmentItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.TransitionStatus
     */
    transitionStatus: {
        methodKind: "unary";
        input: typeof TransitionStatusRequestSchema;
        output: typeof TransitionStatusResponseSchema;
    };
    /**
     * @generated from rpc domain.fulfillment.v1.FulfillmentDomainService.ListStatusEvents
     */
    listStatusEvents: {
        methodKind: "unary";
        input: typeof ListStatusEventsRequestSchema;
        output: typeof ListStatusEventsResponseSchema;
    };
}>;
