import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Client } from "../../entity/client/client_pb";
import type { Location } from "../../entity/location/location_pb";
import type { PaymentTerm } from "../../entity/payment_term/payment_term_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue/revenue.proto.
 */
export declare const file_domain_revenue_revenue_revenue: GenFile;
/**
 * @generated from message domain.revenue.v1.Revenue
 */
export type Revenue = Message<"domain.revenue.v1.Revenue"> & {
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
     * @generated from field: optional domain.entity.v1.Client client = 8;
     */
    client?: Client;
    /**
     * @generated from field: string client_id = 9;
     */
    clientId: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string revenue_date = 10;
     */
    revenueDate?: string;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 12;
     */
    totalAmount: bigint;
    /**
     * @generated from field: string currency = 13;
     */
    currency: string;
    /**
     * @generated from field: string status = 14;
     */
    status: string;
    /**
     * @generated from field: optional string reference_number = 15;
     */
    referenceNumber?: string;
    /**
     * @generated from field: optional string notes = 16;
     */
    notes?: string;
    /**
     * field 17 reserved for future use
     *
     * @generated from field: optional string revenue_category_id = 18;
     */
    revenueCategoryId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 19;
     */
    location?: Location;
    /**
     * @generated from field: string location_id = 20;
     */
    locationId: string;
    /**
     * Maya session reference
     *
     * @generated from field: optional string checkout_session_id = 21;
     */
    checkoutSessionId?: string;
    /**
     * "maya", "cash", etc.
     *
     * @generated from field: optional string payment_provider = 22;
     */
    paymentProvider?: string;
    /**
     * Client's delivery preference for physical goods: 'store_pickup' or 'home_delivery'. Not a fulfillment method — see Product.fulfillment_method.
     *
     * @generated from field: optional string fulfillment_type = 23;
     */
    fulfillmentType?: string;
    /**
     * JSON or flat address string
     *
     * @generated from field: optional string delivery_address = 24;
     */
    deliveryAddress?: string;
    /**
     * GL integration
     *
     * Target GL revenue account for this transaction
     *
     * @generated from field: optional string revenue_account_id = 25;
     */
    revenueAccountId?: string;
    /**
     * FK to journal_entry — set when ledger entry is posted
     *
     * @generated from field: optional string journal_entry_id = 26;
     */
    journalEntryId?: string;
    /**
     * Rollup of linked fulfillment records: 'pending', 'partial', 'fulfilled', 'failed'. Computed — do not set directly.
     *
     * @generated from field: optional string fulfillment_status = 27;
     */
    fulfillmentStatus?: string;
    /**
     * @generated from field: optional string payment_term_id = 28;
     */
    paymentTermId?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string due_date = 29;
     */
    dueDate?: string;
    /**
     * @generated from field: optional domain.entity.v1.PaymentTerm payment_term = 31;
     */
    paymentTerm?: PaymentTerm;
    /**
     * @generated from field: optional string subscription_id = 32;
     */
    subscriptionId?: string;
};
/**
 * Describes the message domain.revenue.v1.Revenue.
 * Use `create(RevenueSchema)` to create a new message.
 */
export declare const RevenueSchema: GenMessage<Revenue>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueRequest
 */
export type CreateRevenueRequest = Message<"domain.revenue.v1.CreateRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.Revenue data = 1;
     */
    data?: Revenue;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueRequest.
 * Use `create(CreateRevenueRequestSchema)` to create a new message.
 */
export declare const CreateRevenueRequestSchema: GenMessage<CreateRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueResponse
 */
export type CreateRevenueResponse = Message<"domain.revenue.v1.CreateRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.Revenue data = 1;
     */
    data: Revenue[];
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
 * Describes the message domain.revenue.v1.CreateRevenueResponse.
 * Use `create(CreateRevenueResponseSchema)` to create a new message.
 */
export declare const CreateRevenueResponseSchema: GenMessage<CreateRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueRequest
 */
export type ReadRevenueRequest = Message<"domain.revenue.v1.ReadRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.Revenue data = 1;
     */
    data?: Revenue;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenueRequest.
 * Use `create(ReadRevenueRequestSchema)` to create a new message.
 */
export declare const ReadRevenueRequestSchema: GenMessage<ReadRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueResponse
 */
export type ReadRevenueResponse = Message<"domain.revenue.v1.ReadRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.Revenue data = 1;
     */
    data: Revenue[];
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
 * Describes the message domain.revenue.v1.ReadRevenueResponse.
 * Use `create(ReadRevenueResponseSchema)` to create a new message.
 */
export declare const ReadRevenueResponseSchema: GenMessage<ReadRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueRequest
 */
export type UpdateRevenueRequest = Message<"domain.revenue.v1.UpdateRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.Revenue data = 1;
     */
    data?: Revenue;
};
/**
 * Describes the message domain.revenue.v1.UpdateRevenueRequest.
 * Use `create(UpdateRevenueRequestSchema)` to create a new message.
 */
export declare const UpdateRevenueRequestSchema: GenMessage<UpdateRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueResponse
 */
export type UpdateRevenueResponse = Message<"domain.revenue.v1.UpdateRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.Revenue data = 1;
     */
    data: Revenue[];
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
 * Describes the message domain.revenue.v1.UpdateRevenueResponse.
 * Use `create(UpdateRevenueResponseSchema)` to create a new message.
 */
export declare const UpdateRevenueResponseSchema: GenMessage<UpdateRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueRequest
 */
export type DeleteRevenueRequest = Message<"domain.revenue.v1.DeleteRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.Revenue data = 1;
     */
    data?: Revenue;
};
/**
 * Describes the message domain.revenue.v1.DeleteRevenueRequest.
 * Use `create(DeleteRevenueRequestSchema)` to create a new message.
 */
export declare const DeleteRevenueRequestSchema: GenMessage<DeleteRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueResponse
 */
export type DeleteRevenueResponse = Message<"domain.revenue.v1.DeleteRevenueResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteRevenueResponse.
 * Use `create(DeleteRevenueResponseSchema)` to create a new message.
 */
export declare const DeleteRevenueResponseSchema: GenMessage<DeleteRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenuesRequest
 */
export type ListRevenuesRequest = Message<"domain.revenue.v1.ListRevenuesRequest"> & {
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
 * Describes the message domain.revenue.v1.ListRevenuesRequest.
 * Use `create(ListRevenuesRequestSchema)` to create a new message.
 */
export declare const ListRevenuesRequestSchema: GenMessage<ListRevenuesRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenuesResponse
 */
export type ListRevenuesResponse = Message<"domain.revenue.v1.ListRevenuesResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.Revenue data = 1;
     */
    data: Revenue[];
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
 * Describes the message domain.revenue.v1.ListRevenuesResponse.
 * Use `create(ListRevenuesResponseSchema)` to create a new message.
 */
export declare const ListRevenuesResponseSchema: GenMessage<ListRevenuesResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueListPageDataRequest
 */
export type GetRevenueListPageDataRequest = Message<"domain.revenue.v1.GetRevenueListPageDataRequest"> & {
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
 * Describes the message domain.revenue.v1.GetRevenueListPageDataRequest.
 * Use `create(GetRevenueListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueListPageDataRequestSchema: GenMessage<GetRevenueListPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueListPageDataResponse
 */
export type GetRevenueListPageDataResponse = Message<"domain.revenue.v1.GetRevenueListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.Revenue revenue_list = 1;
     */
    revenueList: Revenue[];
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
 * Describes the message domain.revenue.v1.GetRevenueListPageDataResponse.
 * Use `create(GetRevenueListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueListPageDataResponseSchema: GenMessage<GetRevenueListPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueItemPageDataRequest
 */
export type GetRevenueItemPageDataRequest = Message<"domain.revenue.v1.GetRevenueItemPageDataRequest"> & {
    /**
     * @generated from field: string revenue_id = 1;
     */
    revenueId: string;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueItemPageDataRequest.
 * Use `create(GetRevenueItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueItemPageDataRequestSchema: GenMessage<GetRevenueItemPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueItemPageDataResponse
 */
export type GetRevenueItemPageDataResponse = Message<"domain.revenue.v1.GetRevenueItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.revenue.v1.Revenue revenue = 1;
     */
    revenue?: Revenue;
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
 * Describes the message domain.revenue.v1.GetRevenueItemPageDataResponse.
 * Use `create(GetRevenueItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueItemPageDataResponseSchema: GenMessage<GetRevenueItemPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueWithLineItemsRequest
 */
export type CreateRevenueWithLineItemsRequest = Message<"domain.revenue.v1.CreateRevenueWithLineItemsRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.Revenue data = 1;
     */
    data?: Revenue;
    /**
     * When set, the use case will resolve the subscription's price plan,
     * verify ProductPlan ⊂ ProductPricePlan coverage, and create line items
     * atomically alongside the Revenue. Empty = behaves like CreateRevenue.
     *
     * @generated from field: optional string subscription_id = 2;
     */
    subscriptionId?: string;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueWithLineItemsRequest.
 * Use `create(CreateRevenueWithLineItemsRequestSchema)` to create a new message.
 */
export declare const CreateRevenueWithLineItemsRequestSchema: GenMessage<CreateRevenueWithLineItemsRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueWithLineItemsResponse
 */
export type CreateRevenueWithLineItemsResponse = Message<"domain.revenue.v1.CreateRevenueWithLineItemsResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.Revenue data = 1;
     */
    data: Revenue[];
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
 * Describes the message domain.revenue.v1.CreateRevenueWithLineItemsResponse.
 * Use `create(CreateRevenueWithLineItemsResponseSchema)` to create a new message.
 */
export declare const CreateRevenueWithLineItemsResponseSchema: GenMessage<CreateRevenueWithLineItemsResponse>;
/**
 * @generated from service domain.revenue.v1.RevenueDomainService
 */
export declare const RevenueDomainService: GenService<{
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.CreateRevenue
     */
    createRevenue: {
        methodKind: "unary";
        input: typeof CreateRevenueRequestSchema;
        output: typeof CreateRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.ReadRevenue
     */
    readRevenue: {
        methodKind: "unary";
        input: typeof ReadRevenueRequestSchema;
        output: typeof ReadRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.UpdateRevenue
     */
    updateRevenue: {
        methodKind: "unary";
        input: typeof UpdateRevenueRequestSchema;
        output: typeof UpdateRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.DeleteRevenue
     */
    deleteRevenue: {
        methodKind: "unary";
        input: typeof DeleteRevenueRequestSchema;
        output: typeof DeleteRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.ListRevenues
     */
    listRevenues: {
        methodKind: "unary";
        input: typeof ListRevenuesRequestSchema;
        output: typeof ListRevenuesResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.GetRevenueListPageData
     */
    getRevenueListPageData: {
        methodKind: "unary";
        input: typeof GetRevenueListPageDataRequestSchema;
        output: typeof GetRevenueListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.GetRevenueItemPageData
     */
    getRevenueItemPageData: {
        methodKind: "unary";
        input: typeof GetRevenueItemPageDataRequestSchema;
        output: typeof GetRevenueItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueDomainService.CreateRevenueWithLineItems
     */
    createRevenueWithLineItems: {
        methodKind: "unary";
        input: typeof CreateRevenueWithLineItemsRequestSchema;
        output: typeof CreateRevenueWithLineItemsResponseSchema;
    };
}>;
