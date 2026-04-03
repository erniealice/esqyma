import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue_category/revenue_category.proto.
 */
export declare const file_domain_revenue_revenue_category_revenue_category: GenFile;
/**
 * @generated from message domain.revenue.v1.RevenueCategory
 */
export type RevenueCategory = Message<"domain.revenue.v1.RevenueCategory"> & {
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
     * @generated from field: string code = 8;
     */
    code: string;
    /**
     * @generated from field: optional string description = 9;
     */
    description?: string;
    /**
     * @generated from field: optional string parent_category_id = 10;
     */
    parentCategoryId?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueCategory.
 * Use `create(RevenueCategorySchema)` to create a new message.
 */
export declare const RevenueCategorySchema: GenMessage<RevenueCategory>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueCategoryRequest
 */
export type CreateRevenueCategoryRequest = Message<"domain.revenue.v1.CreateRevenueCategoryRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueCategory data = 1;
     */
    data?: RevenueCategory;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueCategoryRequest.
 * Use `create(CreateRevenueCategoryRequestSchema)` to create a new message.
 */
export declare const CreateRevenueCategoryRequestSchema: GenMessage<CreateRevenueCategoryRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueCategoryResponse
 */
export type CreateRevenueCategoryResponse = Message<"domain.revenue.v1.CreateRevenueCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueCategory data = 1;
     */
    data: RevenueCategory[];
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
 * Describes the message domain.revenue.v1.CreateRevenueCategoryResponse.
 * Use `create(CreateRevenueCategoryResponseSchema)` to create a new message.
 */
export declare const CreateRevenueCategoryResponseSchema: GenMessage<CreateRevenueCategoryResponse>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueCategoryRequest
 */
export type ReadRevenueCategoryRequest = Message<"domain.revenue.v1.ReadRevenueCategoryRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueCategory data = 1;
     */
    data?: RevenueCategory;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenueCategoryRequest.
 * Use `create(ReadRevenueCategoryRequestSchema)` to create a new message.
 */
export declare const ReadRevenueCategoryRequestSchema: GenMessage<ReadRevenueCategoryRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueCategoryResponse
 */
export type ReadRevenueCategoryResponse = Message<"domain.revenue.v1.ReadRevenueCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueCategory data = 1;
     */
    data: RevenueCategory[];
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
 * Describes the message domain.revenue.v1.ReadRevenueCategoryResponse.
 * Use `create(ReadRevenueCategoryResponseSchema)` to create a new message.
 */
export declare const ReadRevenueCategoryResponseSchema: GenMessage<ReadRevenueCategoryResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueCategoryRequest
 */
export type UpdateRevenueCategoryRequest = Message<"domain.revenue.v1.UpdateRevenueCategoryRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueCategory data = 1;
     */
    data?: RevenueCategory;
};
/**
 * Describes the message domain.revenue.v1.UpdateRevenueCategoryRequest.
 * Use `create(UpdateRevenueCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateRevenueCategoryRequestSchema: GenMessage<UpdateRevenueCategoryRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueCategoryResponse
 */
export type UpdateRevenueCategoryResponse = Message<"domain.revenue.v1.UpdateRevenueCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueCategory data = 1;
     */
    data: RevenueCategory[];
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
 * Describes the message domain.revenue.v1.UpdateRevenueCategoryResponse.
 * Use `create(UpdateRevenueCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateRevenueCategoryResponseSchema: GenMessage<UpdateRevenueCategoryResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueCategoryRequest
 */
export type DeleteRevenueCategoryRequest = Message<"domain.revenue.v1.DeleteRevenueCategoryRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueCategory data = 1;
     */
    data?: RevenueCategory;
};
/**
 * Describes the message domain.revenue.v1.DeleteRevenueCategoryRequest.
 * Use `create(DeleteRevenueCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteRevenueCategoryRequestSchema: GenMessage<DeleteRevenueCategoryRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueCategoryResponse
 */
export type DeleteRevenueCategoryResponse = Message<"domain.revenue.v1.DeleteRevenueCategoryResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteRevenueCategoryResponse.
 * Use `create(DeleteRevenueCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteRevenueCategoryResponseSchema: GenMessage<DeleteRevenueCategoryResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenueCategoriesRequest
 */
export type ListRevenueCategoriesRequest = Message<"domain.revenue.v1.ListRevenueCategoriesRequest"> & {
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
 * Describes the message domain.revenue.v1.ListRevenueCategoriesRequest.
 * Use `create(ListRevenueCategoriesRequestSchema)` to create a new message.
 */
export declare const ListRevenueCategoriesRequestSchema: GenMessage<ListRevenueCategoriesRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueCategoriesResponse
 */
export type ListRevenueCategoriesResponse = Message<"domain.revenue.v1.ListRevenueCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueCategory data = 1;
     */
    data: RevenueCategory[];
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
 * Describes the message domain.revenue.v1.ListRevenueCategoriesResponse.
 * Use `create(ListRevenueCategoriesResponseSchema)` to create a new message.
 */
export declare const ListRevenueCategoriesResponseSchema: GenMessage<ListRevenueCategoriesResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueCategoryListPageDataRequest
 */
export type GetRevenueCategoryListPageDataRequest = Message<"domain.revenue.v1.GetRevenueCategoryListPageDataRequest"> & {
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
 * Describes the message domain.revenue.v1.GetRevenueCategoryListPageDataRequest.
 * Use `create(GetRevenueCategoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueCategoryListPageDataRequestSchema: GenMessage<GetRevenueCategoryListPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueCategoryListPageDataResponse
 */
export type GetRevenueCategoryListPageDataResponse = Message<"domain.revenue.v1.GetRevenueCategoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueCategory revenue_category_list = 1;
     */
    revenueCategoryList: RevenueCategory[];
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
 * Describes the message domain.revenue.v1.GetRevenueCategoryListPageDataResponse.
 * Use `create(GetRevenueCategoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueCategoryListPageDataResponseSchema: GenMessage<GetRevenueCategoryListPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueCategoryItemPageDataRequest
 */
export type GetRevenueCategoryItemPageDataRequest = Message<"domain.revenue.v1.GetRevenueCategoryItemPageDataRequest"> & {
    /**
     * @generated from field: string revenue_category_id = 1;
     */
    revenueCategoryId: string;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueCategoryItemPageDataRequest.
 * Use `create(GetRevenueCategoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueCategoryItemPageDataRequestSchema: GenMessage<GetRevenueCategoryItemPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueCategoryItemPageDataResponse
 */
export type GetRevenueCategoryItemPageDataResponse = Message<"domain.revenue.v1.GetRevenueCategoryItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.revenue.v1.RevenueCategory revenue_category = 1;
     */
    revenueCategory?: RevenueCategory;
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
 * Describes the message domain.revenue.v1.GetRevenueCategoryItemPageDataResponse.
 * Use `create(GetRevenueCategoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueCategoryItemPageDataResponseSchema: GenMessage<GetRevenueCategoryItemPageDataResponse>;
/**
 * @generated from service domain.revenue.v1.RevenueCategoryDomainService
 */
export declare const RevenueCategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.CreateRevenueCategory
     */
    createRevenueCategory: {
        methodKind: "unary";
        input: typeof CreateRevenueCategoryRequestSchema;
        output: typeof CreateRevenueCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.ReadRevenueCategory
     */
    readRevenueCategory: {
        methodKind: "unary";
        input: typeof ReadRevenueCategoryRequestSchema;
        output: typeof ReadRevenueCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.UpdateRevenueCategory
     */
    updateRevenueCategory: {
        methodKind: "unary";
        input: typeof UpdateRevenueCategoryRequestSchema;
        output: typeof UpdateRevenueCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.DeleteRevenueCategory
     */
    deleteRevenueCategory: {
        methodKind: "unary";
        input: typeof DeleteRevenueCategoryRequestSchema;
        output: typeof DeleteRevenueCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.ListRevenueCategories
     */
    listRevenueCategories: {
        methodKind: "unary";
        input: typeof ListRevenueCategoriesRequestSchema;
        output: typeof ListRevenueCategoriesResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.GetRevenueCategoryListPageData
     */
    getRevenueCategoryListPageData: {
        methodKind: "unary";
        input: typeof GetRevenueCategoryListPageDataRequestSchema;
        output: typeof GetRevenueCategoryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueCategoryDomainService.GetRevenueCategoryItemPageData
     */
    getRevenueCategoryItemPageData: {
        methodKind: "unary";
        input: typeof GetRevenueCategoryItemPageDataRequestSchema;
        output: typeof GetRevenueCategoryItemPageDataResponseSchema;
    };
}>;
