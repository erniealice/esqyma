import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_seat/subscription_seat.proto.
 */
export declare const file_domain_subscription_subscription_seat_subscription_seat: GenFile;
/**
 * SubscriptionSeat is one billable/serviced headcount position on a subscription.
 *
 * @generated from message domain.subscription.v1.SubscriptionSeat
 */
export type SubscriptionSeat = Message<"domain.subscription.v1.SubscriptionSeat"> & {
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
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * @generated from field: string subscription_id = 8;
     */
    subscriptionId: string;
    /**
     * CR-1: the person on the seat is entity/staff, NOT product/resource.
     *
     * @generated from field: string staff_id = 9;
     */
    staffId: string;
    /**
     * Denormalized IDOR anchor (stamped, never from form).
     *
     * @generated from field: string client_id = 10;
     */
    clientId: string;
    /**
     * KEPT billing anchor.
     *
     * @generated from field: string product_plan_id = 11;
     */
    productPlanId: string;
    /**
     * @generated from field: optional string product_variant_id = 12;
     */
    productVariantId?: string;
    /**
     * centavos (int64 money convention)
     *
     * @generated from field: optional int64 contracted_amount = 13;
     */
    contractedAmount?: bigint;
    /**
     * @generated from field: optional string contracted_currency = 14;
     */
    contractedCurrency?: string;
    /**
     * @generated from field: optional string role_title = 15;
     */
    roleTitle?: string;
    /**
     * @generated from field: optional string seniority = 16;
     */
    seniority?: string;
    /**
     * @generated from field: optional int64 date_start = 17;
     */
    dateStart?: bigint;
    /**
     * @generated from field: optional int64 date_end = 18;
     */
    dateEnd?: bigint;
    /**
     * proto ENUM (NOT string); DB CHECK-pinned
     *
     * @generated from field: domain.subscription.v1.SubscriptionSeatStatus status = 19;
     */
    status: SubscriptionSeatStatus;
    /**
     * @generated from field: optional int32 review_cadence_value = 20;
     */
    reviewCadenceValue?: number;
    /**
     * @generated from field: optional string review_cadence_unit = 21;
     */
    reviewCadenceUnit?: string;
    /**
     * @generated from field: optional string position = 22;
     */
    position?: string;
    /**
     * Self-reference: the seat this one supersedes (SR-2 replacement chain).
     *
     * @generated from field: optional string replaces_id = 23;
     */
    replacesId?: string;
    /**
     * Soft-ref only: work_request table does not exist yet — NO FK annotation.
     *
     * @generated from field: optional string work_request_id = 24;
     */
    workRequestId?: string;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionSeat.
 * Use `create(SubscriptionSeatSchema)` to create a new message.
 */
export declare const SubscriptionSeatSchema: GenMessage<SubscriptionSeat>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionSeatRequest
 */
export type CreateSubscriptionSeatRequest = Message<"domain.subscription.v1.CreateSubscriptionSeatRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data?: SubscriptionSeat;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionSeatRequest.
 * Use `create(CreateSubscriptionSeatRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionSeatRequestSchema: GenMessage<CreateSubscriptionSeatRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionSeatResponse
 */
export type CreateSubscriptionSeatResponse = Message<"domain.subscription.v1.CreateSubscriptionSeatResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data: SubscriptionSeat[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionSeatResponse.
 * Use `create(CreateSubscriptionSeatResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionSeatResponseSchema: GenMessage<CreateSubscriptionSeatResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionSeatRequest
 */
export type ReadSubscriptionSeatRequest = Message<"domain.subscription.v1.ReadSubscriptionSeatRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data?: SubscriptionSeat;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionSeatRequest.
 * Use `create(ReadSubscriptionSeatRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionSeatRequestSchema: GenMessage<ReadSubscriptionSeatRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionSeatResponse
 */
export type ReadSubscriptionSeatResponse = Message<"domain.subscription.v1.ReadSubscriptionSeatResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data: SubscriptionSeat[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionSeatResponse.
 * Use `create(ReadSubscriptionSeatResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionSeatResponseSchema: GenMessage<ReadSubscriptionSeatResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionSeatRequest
 */
export type UpdateSubscriptionSeatRequest = Message<"domain.subscription.v1.UpdateSubscriptionSeatRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data?: SubscriptionSeat;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionSeatRequest.
 * Use `create(UpdateSubscriptionSeatRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionSeatRequestSchema: GenMessage<UpdateSubscriptionSeatRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionSeatResponse
 */
export type UpdateSubscriptionSeatResponse = Message<"domain.subscription.v1.UpdateSubscriptionSeatResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data: SubscriptionSeat[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionSeatResponse.
 * Use `create(UpdateSubscriptionSeatResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionSeatResponseSchema: GenMessage<UpdateSubscriptionSeatResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionSeatRequest
 */
export type DeleteSubscriptionSeatRequest = Message<"domain.subscription.v1.DeleteSubscriptionSeatRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data?: SubscriptionSeat;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionSeatRequest.
 * Use `create(DeleteSubscriptionSeatRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionSeatRequestSchema: GenMessage<DeleteSubscriptionSeatRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionSeatResponse
 */
export type DeleteSubscriptionSeatResponse = Message<"domain.subscription.v1.DeleteSubscriptionSeatResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionSeatResponse.
 * Use `create(DeleteSubscriptionSeatResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionSeatResponseSchema: GenMessage<DeleteSubscriptionSeatResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionSeatsRequest
 */
export type ListSubscriptionSeatsRequest = Message<"domain.subscription.v1.ListSubscriptionSeatsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionSeatsRequest.
 * Use `create(ListSubscriptionSeatsRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionSeatsRequestSchema: GenMessage<ListSubscriptionSeatsRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionSeatsResponse
 */
export type ListSubscriptionSeatsResponse = Message<"domain.subscription.v1.ListSubscriptionSeatsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionSeat data = 1;
     */
    data: SubscriptionSeat[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionSeatsResponse.
 * Use `create(ListSubscriptionSeatsResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionSeatsResponseSchema: GenMessage<ListSubscriptionSeatsResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionSeatListPageDataRequest
 */
export type GetSubscriptionSeatListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionSeatListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionSeatListPageDataRequest.
 * Use `create(GetSubscriptionSeatListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionSeatListPageDataRequestSchema: GenMessage<GetSubscriptionSeatListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionSeatListPageDataResponse
 */
export type GetSubscriptionSeatListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionSeatListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionSeat subscription_seat_list = 1;
     */
    subscriptionSeatList: SubscriptionSeat[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.subscription.v1.GetSubscriptionSeatListPageDataResponse.
 * Use `create(GetSubscriptionSeatListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionSeatListPageDataResponseSchema: GenMessage<GetSubscriptionSeatListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionSeatItemPageDataRequest
 */
export type GetSubscriptionSeatItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionSeatItemPageDataRequest"> & {
    /**
     * @generated from field: string subscription_seat_id = 1;
     */
    subscriptionSeatId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionSeatItemPageDataRequest.
 * Use `create(GetSubscriptionSeatItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionSeatItemPageDataRequestSchema: GenMessage<GetSubscriptionSeatItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionSeatItemPageDataResponse
 */
export type GetSubscriptionSeatItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionSeatItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionSeat subscription_seat = 1;
     */
    subscriptionSeat?: SubscriptionSeat;
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
 * Describes the message domain.subscription.v1.GetSubscriptionSeatItemPageDataResponse.
 * Use `create(GetSubscriptionSeatItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionSeatItemPageDataResponseSchema: GenMessage<GetSubscriptionSeatItemPageDataResponse>;
/**
 * SubscriptionSeatStatus is the lifecycle of a single headcount seat against a
 * subscription. The DB pins this domain via a CHECK constraint
 * (status IN ('proposed','active','replaced','ended')); UNSPECIFIED is excluded.
 *
 * @generated from enum domain.subscription.v1.SubscriptionSeatStatus
 */
export declare enum SubscriptionSeatStatus {
    /**
     * @generated from enum value: SUBSCRIPTION_SEAT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SUBSCRIPTION_SEAT_STATUS_PROPOSED = 1;
     */
    PROPOSED = 1,
    /**
     * @generated from enum value: SUBSCRIPTION_SEAT_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: SUBSCRIPTION_SEAT_STATUS_REPLACED = 3;
     */
    REPLACED = 3,
    /**
     * @generated from enum value: SUBSCRIPTION_SEAT_STATUS_ENDED = 4;
     */
    ENDED = 4
}
/**
 * Describes the enum domain.subscription.v1.SubscriptionSeatStatus.
 */
export declare const SubscriptionSeatStatusSchema: GenEnum<SubscriptionSeatStatus>;
/**
 * @generated from service domain.subscription.v1.SubscriptionSeatDomainService
 */
export declare const SubscriptionSeatDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.CreateSubscriptionSeat
     */
    createSubscriptionSeat: {
        methodKind: "unary";
        input: typeof CreateSubscriptionSeatRequestSchema;
        output: typeof CreateSubscriptionSeatResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.ReadSubscriptionSeat
     */
    readSubscriptionSeat: {
        methodKind: "unary";
        input: typeof ReadSubscriptionSeatRequestSchema;
        output: typeof ReadSubscriptionSeatResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.UpdateSubscriptionSeat
     */
    updateSubscriptionSeat: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionSeatRequestSchema;
        output: typeof UpdateSubscriptionSeatResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.DeleteSubscriptionSeat
     */
    deleteSubscriptionSeat: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionSeatRequestSchema;
        output: typeof DeleteSubscriptionSeatResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.ListSubscriptionSeats
     */
    listSubscriptionSeats: {
        methodKind: "unary";
        input: typeof ListSubscriptionSeatsRequestSchema;
        output: typeof ListSubscriptionSeatsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.GetSubscriptionSeatListPageData
     */
    getSubscriptionSeatListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionSeatListPageDataRequestSchema;
        output: typeof GetSubscriptionSeatListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.SubscriptionSeatDomainService.GetSubscriptionSeatItemPageData
     */
    getSubscriptionSeatItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionSeatItemPageDataRequestSchema;
        output: typeof GetSubscriptionSeatItemPageDataResponseSchema;
    };
}>;
