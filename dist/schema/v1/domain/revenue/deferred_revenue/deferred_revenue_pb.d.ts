import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/deferred_revenue/deferred_revenue.proto.
 */
export declare const file_domain_revenue_deferred_revenue_deferred_revenue: GenFile;
/**
 * DeferredRevenue is a contract liability (IFRS 15) for consideration received before
 * performance obligations are satisfied.
 * Examples: advance booking payment, annual subscription collected upfront.
 * Each period a DEFERRED_REVENUE_RECOGNITION JournalEntry transfers liability to revenue.
 *
 * @generated from message domain.revenue.v1.DeferredRevenue
 */
export type DeferredRevenue = Message<"domain.revenue.v1.DeferredRevenue"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string description = 2;
     */
    description: string;
    /**
     * @generated from field: optional string customer_name = 3;
     */
    customerName?: string;
    /**
     * Amounts
     *
     * @generated from field: double total_amount = 4;
     */
    totalAmount: number;
    /**
     * Increases with each recognition entry
     *
     * @generated from field: double recognized_amount = 5;
     */
    recognizedAmount: number;
    /**
     * total - recognized
     *
     * @generated from field: double remaining_amount = 6;
     */
    remainingAmount: number;
    /**
     * Recognition schedule
     *
     * @generated from field: int64 start_date = 7;
     */
    startDate: bigint;
    /**
     * @generated from field: optional string start_date_string = 8;
     */
    startDateString?: string;
    /**
     * @generated from field: int64 end_date = 9;
     */
    endDate: bigint;
    /**
     * @generated from field: optional string end_date_string = 10;
     */
    endDateString?: string;
    /**
     * Derived from start/end, stored for convenience
     *
     * @generated from field: int32 recognition_months = 11;
     */
    recognitionMonths: number;
    /**
     * @generated from field: domain.revenue.v1.DeferredRevenueStatus status = 12;
     */
    status: DeferredRevenueStatus;
    /**
     * GL integration
     *
     * Deferred revenue liability account
     *
     * @generated from field: optional string liability_account_id = 13;
     */
    liabilityAccountId?: string;
    /**
     * Target revenue account on recognition
     *
     * @generated from field: optional string revenue_account_id = 14;
     */
    revenueAccountId?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 15;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 18;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 19;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.revenue.v1.DeferredRevenue.
 * Use `create(DeferredRevenueSchema)` to create a new message.
 */
export declare const DeferredRevenueSchema: GenMessage<DeferredRevenue>;
/**
 * @generated from message domain.revenue.v1.CreateDeferredRevenueRequest
 */
export type CreateDeferredRevenueRequest = Message<"domain.revenue.v1.CreateDeferredRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.DeferredRevenue data = 1;
     */
    data?: DeferredRevenue;
};
/**
 * Describes the message domain.revenue.v1.CreateDeferredRevenueRequest.
 * Use `create(CreateDeferredRevenueRequestSchema)` to create a new message.
 */
export declare const CreateDeferredRevenueRequestSchema: GenMessage<CreateDeferredRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.CreateDeferredRevenueResponse
 */
export type CreateDeferredRevenueResponse = Message<"domain.revenue.v1.CreateDeferredRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.DeferredRevenue data = 1;
     */
    data: DeferredRevenue[];
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
 * Describes the message domain.revenue.v1.CreateDeferredRevenueResponse.
 * Use `create(CreateDeferredRevenueResponseSchema)` to create a new message.
 */
export declare const CreateDeferredRevenueResponseSchema: GenMessage<CreateDeferredRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.ReadDeferredRevenueRequest
 */
export type ReadDeferredRevenueRequest = Message<"domain.revenue.v1.ReadDeferredRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.DeferredRevenue data = 1;
     */
    data?: DeferredRevenue;
};
/**
 * Describes the message domain.revenue.v1.ReadDeferredRevenueRequest.
 * Use `create(ReadDeferredRevenueRequestSchema)` to create a new message.
 */
export declare const ReadDeferredRevenueRequestSchema: GenMessage<ReadDeferredRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.ReadDeferredRevenueResponse
 */
export type ReadDeferredRevenueResponse = Message<"domain.revenue.v1.ReadDeferredRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.DeferredRevenue data = 1;
     */
    data: DeferredRevenue[];
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
 * Describes the message domain.revenue.v1.ReadDeferredRevenueResponse.
 * Use `create(ReadDeferredRevenueResponseSchema)` to create a new message.
 */
export declare const ReadDeferredRevenueResponseSchema: GenMessage<ReadDeferredRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateDeferredRevenueRequest
 */
export type UpdateDeferredRevenueRequest = Message<"domain.revenue.v1.UpdateDeferredRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.DeferredRevenue data = 1;
     */
    data?: DeferredRevenue;
};
/**
 * Describes the message domain.revenue.v1.UpdateDeferredRevenueRequest.
 * Use `create(UpdateDeferredRevenueRequestSchema)` to create a new message.
 */
export declare const UpdateDeferredRevenueRequestSchema: GenMessage<UpdateDeferredRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateDeferredRevenueResponse
 */
export type UpdateDeferredRevenueResponse = Message<"domain.revenue.v1.UpdateDeferredRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.DeferredRevenue data = 1;
     */
    data: DeferredRevenue[];
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
 * Describes the message domain.revenue.v1.UpdateDeferredRevenueResponse.
 * Use `create(UpdateDeferredRevenueResponseSchema)` to create a new message.
 */
export declare const UpdateDeferredRevenueResponseSchema: GenMessage<UpdateDeferredRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteDeferredRevenueRequest
 */
export type DeleteDeferredRevenueRequest = Message<"domain.revenue.v1.DeleteDeferredRevenueRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.DeferredRevenue data = 1;
     */
    data?: DeferredRevenue;
};
/**
 * Describes the message domain.revenue.v1.DeleteDeferredRevenueRequest.
 * Use `create(DeleteDeferredRevenueRequestSchema)` to create a new message.
 */
export declare const DeleteDeferredRevenueRequestSchema: GenMessage<DeleteDeferredRevenueRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteDeferredRevenueResponse
 */
export type DeleteDeferredRevenueResponse = Message<"domain.revenue.v1.DeleteDeferredRevenueResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteDeferredRevenueResponse.
 * Use `create(DeleteDeferredRevenueResponseSchema)` to create a new message.
 */
export declare const DeleteDeferredRevenueResponseSchema: GenMessage<DeleteDeferredRevenueResponse>;
/**
 * @generated from message domain.revenue.v1.ListDeferredRevenuesRequest
 */
export type ListDeferredRevenuesRequest = Message<"domain.revenue.v1.ListDeferredRevenuesRequest"> & {
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
 * Describes the message domain.revenue.v1.ListDeferredRevenuesRequest.
 * Use `create(ListDeferredRevenuesRequestSchema)` to create a new message.
 */
export declare const ListDeferredRevenuesRequestSchema: GenMessage<ListDeferredRevenuesRequest>;
/**
 * @generated from message domain.revenue.v1.ListDeferredRevenuesResponse
 */
export type ListDeferredRevenuesResponse = Message<"domain.revenue.v1.ListDeferredRevenuesResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.DeferredRevenue data = 1;
     */
    data: DeferredRevenue[];
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
 * Describes the message domain.revenue.v1.ListDeferredRevenuesResponse.
 * Use `create(ListDeferredRevenuesResponseSchema)` to create a new message.
 */
export declare const ListDeferredRevenuesResponseSchema: GenMessage<ListDeferredRevenuesResponse>;
/**
 * @generated from message domain.revenue.v1.GetDeferredRevenueListPageDataRequest
 */
export type GetDeferredRevenueListPageDataRequest = Message<"domain.revenue.v1.GetDeferredRevenueListPageDataRequest"> & {
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
 * Describes the message domain.revenue.v1.GetDeferredRevenueListPageDataRequest.
 * Use `create(GetDeferredRevenueListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDeferredRevenueListPageDataRequestSchema: GenMessage<GetDeferredRevenueListPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetDeferredRevenueListPageDataResponse
 */
export type GetDeferredRevenueListPageDataResponse = Message<"domain.revenue.v1.GetDeferredRevenueListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.DeferredRevenue deferred_revenue_list = 1;
     */
    deferredRevenueList: DeferredRevenue[];
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
 * Describes the message domain.revenue.v1.GetDeferredRevenueListPageDataResponse.
 * Use `create(GetDeferredRevenueListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDeferredRevenueListPageDataResponseSchema: GenMessage<GetDeferredRevenueListPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.GetDeferredRevenueItemPageDataRequest
 */
export type GetDeferredRevenueItemPageDataRequest = Message<"domain.revenue.v1.GetDeferredRevenueItemPageDataRequest"> & {
    /**
     * @generated from field: string deferred_revenue_id = 1;
     */
    deferredRevenueId: string;
};
/**
 * Describes the message domain.revenue.v1.GetDeferredRevenueItemPageDataRequest.
 * Use `create(GetDeferredRevenueItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDeferredRevenueItemPageDataRequestSchema: GenMessage<GetDeferredRevenueItemPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetDeferredRevenueItemPageDataResponse
 */
export type GetDeferredRevenueItemPageDataResponse = Message<"domain.revenue.v1.GetDeferredRevenueItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.revenue.v1.DeferredRevenue deferred_revenue = 1;
     */
    deferredRevenue?: DeferredRevenue;
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
 * Describes the message domain.revenue.v1.GetDeferredRevenueItemPageDataResponse.
 * Use `create(GetDeferredRevenueItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDeferredRevenueItemPageDataResponseSchema: GenMessage<GetDeferredRevenueItemPageDataResponse>;
/**
 * DeferredRevenueStatus tracks the recognition lifecycle of a contract liability.
 *
 * @generated from enum domain.revenue.v1.DeferredRevenueStatus
 */
export declare enum DeferredRevenueStatus {
    /**
     * @generated from enum value: DEFERRED_REVENUE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Recognition in progress
     *
     * @generated from enum value: DEFERRED_REVENUE_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * All revenue has been recognized
     *
     * @generated from enum value: DEFERRED_REVENUE_STATUS_FULLY_RECOGNIZED = 2;
     */
    FULLY_RECOGNIZED = 2,
    /**
     * Cancelled; any unrecognized amount is reversed
     *
     * @generated from enum value: DEFERRED_REVENUE_STATUS_CANCELLED = 3;
     */
    CANCELLED = 3
}
/**
 * Describes the enum domain.revenue.v1.DeferredRevenueStatus.
 */
export declare const DeferredRevenueStatusSchema: GenEnum<DeferredRevenueStatus>;
/**
 * @generated from service domain.revenue.v1.DeferredRevenueDomainService
 */
export declare const DeferredRevenueDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.CreateDeferredRevenue
     */
    createDeferredRevenue: {
        methodKind: "unary";
        input: typeof CreateDeferredRevenueRequestSchema;
        output: typeof CreateDeferredRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.ReadDeferredRevenue
     */
    readDeferredRevenue: {
        methodKind: "unary";
        input: typeof ReadDeferredRevenueRequestSchema;
        output: typeof ReadDeferredRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.UpdateDeferredRevenue
     */
    updateDeferredRevenue: {
        methodKind: "unary";
        input: typeof UpdateDeferredRevenueRequestSchema;
        output: typeof UpdateDeferredRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.DeleteDeferredRevenue
     */
    deleteDeferredRevenue: {
        methodKind: "unary";
        input: typeof DeleteDeferredRevenueRequestSchema;
        output: typeof DeleteDeferredRevenueResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.ListDeferredRevenues
     */
    listDeferredRevenues: {
        methodKind: "unary";
        input: typeof ListDeferredRevenuesRequestSchema;
        output: typeof ListDeferredRevenuesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.GetDeferredRevenueListPageData
     */
    getDeferredRevenueListPageData: {
        methodKind: "unary";
        input: typeof GetDeferredRevenueListPageDataRequestSchema;
        output: typeof GetDeferredRevenueListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.DeferredRevenueDomainService.GetDeferredRevenueItemPageData
     */
    getDeferredRevenueItemPageData: {
        methodKind: "unary";
        input: typeof GetDeferredRevenueItemPageDataRequestSchema;
        output: typeof GetDeferredRevenueItemPageDataResponseSchema;
    };
}>;
