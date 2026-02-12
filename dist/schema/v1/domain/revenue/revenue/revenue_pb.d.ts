import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Client } from "../../entity/client/client_pb";
import type { Location } from "../../entity/location/location_pb";
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
     * @generated from field: optional int64 revenue_date = 10;
     */
    revenueDate?: bigint;
    /**
     * @generated from field: optional string revenue_date_string = 11;
     */
    revenueDateString?: string;
    /**
     * @generated from field: double total_amount = 12;
     */
    totalAmount: number;
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
}>;
