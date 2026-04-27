import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { PricePlan } from "../price_plan/price_plan_pb";
import type { Client } from "../../entity/client/client_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription/subscription.proto.
 */
export declare const file_domain_subscription_subscription_subscription: GenFile;
/**
 * @generated from message domain.subscription.v1.Subscription
 */
export type Subscription = Message<"domain.subscription.v1.Subscription"> & {
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional domain.subscription.v1.PricePlan price_plan = 8;
     */
    pricePlan?: PricePlan;
    /**
     * @generated from field: string price_plan_id = 9;
     */
    pricePlanId: string;
    /**
     * @generated from field: optional domain.entity.v1.Client client = 10;
     */
    client?: Client;
    /**
     * @generated from field: string client_id = 11;
     */
    clientId: string;
    /**
     * UTC timestamp; display TZ resolved per-request
     *
     * @generated from field: optional google.protobuf.Timestamp date_time_start = 12;
     */
    dateTimeStart?: Timestamp;
    /**
     * UTC timestamp; nil = open-ended
     *
     * @generated from field: optional google.protobuf.Timestamp date_time_end = 14;
     */
    dateTimeEnd?: Timestamp;
    /**
     * @generated from field: map<string, string> metadata = 16;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * License pool management
     *
     * Number of licenses purchased
     *
     * @generated from field: optional int32 quantity = 17;
     */
    quantity?: number;
    /**
     * Currently assigned (denormalized)
     *
     * @generated from field: optional int32 assigned_count = 18;
     */
    assignedCount?: number;
    /**
     * quantity - assigned (denormalized)
     *
     * @generated from field: optional int32 available_count = 19;
     */
    availableCount?: number;
    /**
     * License configuration
     *
     * Default for created licenses
     *
     * @generated from field: optional string default_license_type = 20;
     */
    defaultLicenseType?: string;
    /**
     * Auto-assign to purchaser
     *
     * @generated from field: optional bool auto_assign = 21;
     */
    autoAssign?: boolean;
    /**
     * 7-char alphanumeric engagement code (e.g. "A3K7PXR")
     *
     * @generated from field: optional string code = 22;
     */
    code?: string;
};
/**
 * Describes the message domain.subscription.v1.Subscription.
 * Use `create(SubscriptionSchema)` to create a new message.
 */
export declare const SubscriptionSchema: GenMessage<Subscription>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionRequest
 */
export type CreateSubscriptionRequest = Message<"domain.subscription.v1.CreateSubscriptionRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Subscription data = 1;
     */
    data?: Subscription;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionRequest.
 * Use `create(CreateSubscriptionRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionRequestSchema: GenMessage<CreateSubscriptionRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionResponse
 */
export type CreateSubscriptionResponse = Message<"domain.subscription.v1.CreateSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Subscription data = 1;
     */
    data: Subscription[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionResponse.
 * Use `create(CreateSubscriptionResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionResponseSchema: GenMessage<CreateSubscriptionResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionRequest
 */
export type ReadSubscriptionRequest = Message<"domain.subscription.v1.ReadSubscriptionRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Subscription data = 1;
     */
    data?: Subscription;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionRequest.
 * Use `create(ReadSubscriptionRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionRequestSchema: GenMessage<ReadSubscriptionRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionResponse
 */
export type ReadSubscriptionResponse = Message<"domain.subscription.v1.ReadSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Subscription data = 1;
     */
    data: Subscription[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionResponse.
 * Use `create(ReadSubscriptionResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionResponseSchema: GenMessage<ReadSubscriptionResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionRequest
 */
export type UpdateSubscriptionRequest = Message<"domain.subscription.v1.UpdateSubscriptionRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Subscription data = 1;
     */
    data?: Subscription;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionRequest.
 * Use `create(UpdateSubscriptionRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionRequestSchema: GenMessage<UpdateSubscriptionRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionResponse
 */
export type UpdateSubscriptionResponse = Message<"domain.subscription.v1.UpdateSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Subscription data = 1;
     */
    data: Subscription[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionResponse.
 * Use `create(UpdateSubscriptionResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionResponseSchema: GenMessage<UpdateSubscriptionResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionRequest
 */
export type DeleteSubscriptionRequest = Message<"domain.subscription.v1.DeleteSubscriptionRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Subscription data = 1;
     */
    data?: Subscription;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionRequest.
 * Use `create(DeleteSubscriptionRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionRequestSchema: GenMessage<DeleteSubscriptionRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionResponse
 */
export type DeleteSubscriptionResponse = Message<"domain.subscription.v1.DeleteSubscriptionResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionResponse.
 * Use `create(DeleteSubscriptionResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionResponseSchema: GenMessage<DeleteSubscriptionResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionsRequest
 */
export type ListSubscriptionsRequest = Message<"domain.subscription.v1.ListSubscriptionsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionsRequest.
 * Use `create(ListSubscriptionsRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionsRequestSchema: GenMessage<ListSubscriptionsRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionsResponse
 */
export type ListSubscriptionsResponse = Message<"domain.subscription.v1.ListSubscriptionsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Subscription data = 1;
     */
    data: Subscription[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionsResponse.
 * Use `create(ListSubscriptionsResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionsResponseSchema: GenMessage<ListSubscriptionsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetSubscriptionListPageDataRequest
 */
export type GetSubscriptionListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionListPageDataRequest.
 * Use `create(GetSubscriptionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionListPageDataRequestSchema: GenMessage<GetSubscriptionListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetSubscriptionListPageDataResponse
 */
export type GetSubscriptionListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionListPageDataResponse"> & {
    /**
     * The subscription data
     *
     * @generated from field: repeated domain.subscription.v1.Subscription subscription_list = 1;
     */
    subscriptionList: Subscription[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionListPageDataResponse.
 * Use `create(GetSubscriptionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionListPageDataResponseSchema: GenMessage<GetSubscriptionListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetSubscriptionItemPageDataRequest
 */
export type GetSubscriptionItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionItemPageDataRequest"> & {
    /**
     * The subscription ID to retrieve
     *
     * @generated from field: string subscription_id = 1;
     */
    subscriptionId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionItemPageDataRequest.
 * Use `create(GetSubscriptionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionItemPageDataRequestSchema: GenMessage<GetSubscriptionItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetSubscriptionItemPageDataResponse
 */
export type GetSubscriptionItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionItemPageDataResponse"> & {
    /**
     * The subscription data
     *
     * @generated from field: domain.subscription.v1.Subscription subscription = 1;
     */
    subscription?: Subscription;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionItemPageDataResponse.
 * Use `create(GetSubscriptionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionItemPageDataResponseSchema: GenMessage<GetSubscriptionItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.SubscriptionDomainService
 */
export declare const SubscriptionDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.CreateSubscription
     */
    createSubscription: {
        methodKind: "unary";
        input: typeof CreateSubscriptionRequestSchema;
        output: typeof CreateSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.ReadSubscription
     */
    readSubscription: {
        methodKind: "unary";
        input: typeof ReadSubscriptionRequestSchema;
        output: typeof ReadSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.UpdateSubscription
     */
    updateSubscription: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionRequestSchema;
        output: typeof UpdateSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.DeleteSubscription
     */
    deleteSubscription: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionRequestSchema;
        output: typeof DeleteSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.ListSubscriptions
     */
    listSubscriptions: {
        methodKind: "unary";
        input: typeof ListSubscriptionsRequestSchema;
        output: typeof ListSubscriptionsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.GetSubscriptionListPageData
     */
    getSubscriptionListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionListPageDataRequestSchema;
        output: typeof GetSubscriptionListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.SubscriptionDomainService.GetSubscriptionItemPageData
     */
    getSubscriptionItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionItemPageDataRequestSchema;
        output: typeof GetSubscriptionItemPageDataResponseSchema;
    };
}>;
