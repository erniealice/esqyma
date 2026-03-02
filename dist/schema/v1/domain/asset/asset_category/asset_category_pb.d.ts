import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_category/asset_category.proto.
 */
export declare const file_domain_asset_asset_category_asset_category: GenFile;
/**
 * @generated from message domain.asset.v1.AssetCategory
 */
export type AssetCategory = Message<"domain.asset.v1.AssetCategory"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string code = 2;
     */
    code: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: optional string description = 4;
     */
    description?: string;
    /**
     * @generated from field: optional string parent_category_id = 5;
     */
    parentCategoryId?: string;
    /**
     * Default depreciation settings for new assets in this category
     *
     * @generated from field: string default_depreciation_method = 6;
     */
    defaultDepreciationMethod: string;
    /**
     * @generated from field: int32 default_useful_life_months = 7;
     */
    defaultUsefulLifeMonths: number;
    /**
     * @generated from field: double default_salvage_value_percent = 8;
     */
    defaultSalvageValuePercent: number;
    /**
     * GL account mappings
     *
     * @generated from field: optional string asset_cost_account = 9;
     */
    assetCostAccount?: string;
    /**
     * @generated from field: optional string accumulated_depreciation_account = 10;
     */
    accumulatedDepreciationAccount?: string;
    /**
     * @generated from field: optional string depreciation_expense_account = 11;
     */
    depreciationExpenseAccount?: string;
    /**
     * @generated from field: optional string gain_on_disposal_account = 12;
     */
    gainOnDisposalAccount?: string;
    /**
     * @generated from field: optional string loss_on_disposal_account = 13;
     */
    lossOnDisposalAccount?: string;
    /**
     * @generated from field: optional string impairment_loss_account = 14;
     */
    impairmentLossAccount?: string;
    /**
     * @generated from field: optional string revaluation_surplus_account = 15;
     */
    revaluationSurplusAccount?: string;
    /**
     * Audit fields
     *
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
    /**
     * @generated from field: bool active = 20;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.AssetCategory.
 * Use `create(AssetCategorySchema)` to create a new message.
 */
export declare const AssetCategorySchema: GenMessage<AssetCategory>;
/**
 * @generated from message domain.asset.v1.CreateAssetCategoryRequest
 */
export type CreateAssetCategoryRequest = Message<"domain.asset.v1.CreateAssetCategoryRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetCategory data = 1;
     */
    data?: AssetCategory;
};
/**
 * Describes the message domain.asset.v1.CreateAssetCategoryRequest.
 * Use `create(CreateAssetCategoryRequestSchema)` to create a new message.
 */
export declare const CreateAssetCategoryRequestSchema: GenMessage<CreateAssetCategoryRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetCategoryResponse
 */
export type CreateAssetCategoryResponse = Message<"domain.asset.v1.CreateAssetCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetCategory data = 1;
     */
    data: AssetCategory[];
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
 * Describes the message domain.asset.v1.CreateAssetCategoryResponse.
 * Use `create(CreateAssetCategoryResponseSchema)` to create a new message.
 */
export declare const CreateAssetCategoryResponseSchema: GenMessage<CreateAssetCategoryResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetCategoryRequest
 */
export type ReadAssetCategoryRequest = Message<"domain.asset.v1.ReadAssetCategoryRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetCategory data = 1;
     */
    data?: AssetCategory;
};
/**
 * Describes the message domain.asset.v1.ReadAssetCategoryRequest.
 * Use `create(ReadAssetCategoryRequestSchema)` to create a new message.
 */
export declare const ReadAssetCategoryRequestSchema: GenMessage<ReadAssetCategoryRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetCategoryResponse
 */
export type ReadAssetCategoryResponse = Message<"domain.asset.v1.ReadAssetCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetCategory data = 1;
     */
    data: AssetCategory[];
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
 * Describes the message domain.asset.v1.ReadAssetCategoryResponse.
 * Use `create(ReadAssetCategoryResponseSchema)` to create a new message.
 */
export declare const ReadAssetCategoryResponseSchema: GenMessage<ReadAssetCategoryResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetCategoryRequest
 */
export type UpdateAssetCategoryRequest = Message<"domain.asset.v1.UpdateAssetCategoryRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetCategory data = 1;
     */
    data?: AssetCategory;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetCategoryRequest.
 * Use `create(UpdateAssetCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateAssetCategoryRequestSchema: GenMessage<UpdateAssetCategoryRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetCategoryResponse
 */
export type UpdateAssetCategoryResponse = Message<"domain.asset.v1.UpdateAssetCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetCategory data = 1;
     */
    data: AssetCategory[];
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
 * Describes the message domain.asset.v1.UpdateAssetCategoryResponse.
 * Use `create(UpdateAssetCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateAssetCategoryResponseSchema: GenMessage<UpdateAssetCategoryResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetCategoryRequest
 */
export type DeleteAssetCategoryRequest = Message<"domain.asset.v1.DeleteAssetCategoryRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetCategory data = 1;
     */
    data?: AssetCategory;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetCategoryRequest.
 * Use `create(DeleteAssetCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteAssetCategoryRequestSchema: GenMessage<DeleteAssetCategoryRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetCategoryResponse
 */
export type DeleteAssetCategoryResponse = Message<"domain.asset.v1.DeleteAssetCategoryResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetCategoryResponse.
 * Use `create(DeleteAssetCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteAssetCategoryResponseSchema: GenMessage<DeleteAssetCategoryResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetCategoriesRequest
 */
export type ListAssetCategoriesRequest = Message<"domain.asset.v1.ListAssetCategoriesRequest"> & {
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
 * Describes the message domain.asset.v1.ListAssetCategoriesRequest.
 * Use `create(ListAssetCategoriesRequestSchema)` to create a new message.
 */
export declare const ListAssetCategoriesRequestSchema: GenMessage<ListAssetCategoriesRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetCategoriesResponse
 */
export type ListAssetCategoriesResponse = Message<"domain.asset.v1.ListAssetCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetCategory data = 1;
     */
    data: AssetCategory[];
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
 * Describes the message domain.asset.v1.ListAssetCategoriesResponse.
 * Use `create(ListAssetCategoriesResponseSchema)` to create a new message.
 */
export declare const ListAssetCategoriesResponseSchema: GenMessage<ListAssetCategoriesResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetCategoryListPageDataRequest
 */
export type GetAssetCategoryListPageDataRequest = Message<"domain.asset.v1.GetAssetCategoryListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetCategoryListPageDataRequest.
 * Use `create(GetAssetCategoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetCategoryListPageDataRequestSchema: GenMessage<GetAssetCategoryListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetCategoryListPageDataResponse
 */
export type GetAssetCategoryListPageDataResponse = Message<"domain.asset.v1.GetAssetCategoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetCategory asset_category_list = 1;
     */
    assetCategoryList: AssetCategory[];
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
 * Describes the message domain.asset.v1.GetAssetCategoryListPageDataResponse.
 * Use `create(GetAssetCategoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetCategoryListPageDataResponseSchema: GenMessage<GetAssetCategoryListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetCategoryItemPageDataRequest
 */
export type GetAssetCategoryItemPageDataRequest = Message<"domain.asset.v1.GetAssetCategoryItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_category_id = 1;
     */
    assetCategoryId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetCategoryItemPageDataRequest.
 * Use `create(GetAssetCategoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetCategoryItemPageDataRequestSchema: GenMessage<GetAssetCategoryItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetCategoryItemPageDataResponse
 */
export type GetAssetCategoryItemPageDataResponse = Message<"domain.asset.v1.GetAssetCategoryItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetCategory asset_category = 1;
     */
    assetCategory?: AssetCategory;
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
 * Describes the message domain.asset.v1.GetAssetCategoryItemPageDataResponse.
 * Use `create(GetAssetCategoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetCategoryItemPageDataResponseSchema: GenMessage<GetAssetCategoryItemPageDataResponse>;
/**
 * @generated from service domain.asset.v1.AssetCategoryDomainService
 */
export declare const AssetCategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.CreateAssetCategory
     */
    createAssetCategory: {
        methodKind: "unary";
        input: typeof CreateAssetCategoryRequestSchema;
        output: typeof CreateAssetCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.ReadAssetCategory
     */
    readAssetCategory: {
        methodKind: "unary";
        input: typeof ReadAssetCategoryRequestSchema;
        output: typeof ReadAssetCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.UpdateAssetCategory
     */
    updateAssetCategory: {
        methodKind: "unary";
        input: typeof UpdateAssetCategoryRequestSchema;
        output: typeof UpdateAssetCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.DeleteAssetCategory
     */
    deleteAssetCategory: {
        methodKind: "unary";
        input: typeof DeleteAssetCategoryRequestSchema;
        output: typeof DeleteAssetCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.ListAssetCategories
     */
    listAssetCategories: {
        methodKind: "unary";
        input: typeof ListAssetCategoriesRequestSchema;
        output: typeof ListAssetCategoriesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.GetAssetCategoryListPageData
     */
    getAssetCategoryListPageData: {
        methodKind: "unary";
        input: typeof GetAssetCategoryListPageDataRequestSchema;
        output: typeof GetAssetCategoryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetCategoryDomainService.GetAssetCategoryItemPageData
     */
    getAssetCategoryItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetCategoryItemPageDataRequestSchema;
        output: typeof GetAssetCategoryItemPageDataResponseSchema;
    };
}>;
