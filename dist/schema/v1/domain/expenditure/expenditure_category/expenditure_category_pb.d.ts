import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expenditure_category/expenditure_category.proto.
 */
export declare const file_domain_expenditure_expenditure_category_expenditure_category: GenFile;
/**
 * @generated from message domain.expenditure.v1.ExpenditureCategory
 */
export type ExpenditureCategory = Message<"domain.expenditure.v1.ExpenditureCategory"> & {
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
 * Describes the message domain.expenditure.v1.ExpenditureCategory.
 * Use `create(ExpenditureCategorySchema)` to create a new message.
 */
export declare const ExpenditureCategorySchema: GenMessage<ExpenditureCategory>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureCategoryRequest
 */
export type CreateExpenditureCategoryRequest = Message<"domain.expenditure.v1.CreateExpenditureCategoryRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data?: ExpenditureCategory;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenditureCategoryRequest.
 * Use `create(CreateExpenditureCategoryRequestSchema)` to create a new message.
 */
export declare const CreateExpenditureCategoryRequestSchema: GenMessage<CreateExpenditureCategoryRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureCategoryResponse
 */
export type CreateExpenditureCategoryResponse = Message<"domain.expenditure.v1.CreateExpenditureCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data: ExpenditureCategory[];
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
 * Describes the message domain.expenditure.v1.CreateExpenditureCategoryResponse.
 * Use `create(CreateExpenditureCategoryResponseSchema)` to create a new message.
 */
export declare const CreateExpenditureCategoryResponseSchema: GenMessage<CreateExpenditureCategoryResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureCategoryRequest
 */
export type ReadExpenditureCategoryRequest = Message<"domain.expenditure.v1.ReadExpenditureCategoryRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data?: ExpenditureCategory;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenditureCategoryRequest.
 * Use `create(ReadExpenditureCategoryRequestSchema)` to create a new message.
 */
export declare const ReadExpenditureCategoryRequestSchema: GenMessage<ReadExpenditureCategoryRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureCategoryResponse
 */
export type ReadExpenditureCategoryResponse = Message<"domain.expenditure.v1.ReadExpenditureCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data: ExpenditureCategory[];
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
 * Describes the message domain.expenditure.v1.ReadExpenditureCategoryResponse.
 * Use `create(ReadExpenditureCategoryResponseSchema)` to create a new message.
 */
export declare const ReadExpenditureCategoryResponseSchema: GenMessage<ReadExpenditureCategoryResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureCategoryRequest
 */
export type UpdateExpenditureCategoryRequest = Message<"domain.expenditure.v1.UpdateExpenditureCategoryRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data?: ExpenditureCategory;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenditureCategoryRequest.
 * Use `create(UpdateExpenditureCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateExpenditureCategoryRequestSchema: GenMessage<UpdateExpenditureCategoryRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureCategoryResponse
 */
export type UpdateExpenditureCategoryResponse = Message<"domain.expenditure.v1.UpdateExpenditureCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data: ExpenditureCategory[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenditureCategoryResponse.
 * Use `create(UpdateExpenditureCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateExpenditureCategoryResponseSchema: GenMessage<UpdateExpenditureCategoryResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureCategoryRequest
 */
export type DeleteExpenditureCategoryRequest = Message<"domain.expenditure.v1.DeleteExpenditureCategoryRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data?: ExpenditureCategory;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenditureCategoryRequest.
 * Use `create(DeleteExpenditureCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteExpenditureCategoryRequestSchema: GenMessage<DeleteExpenditureCategoryRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureCategoryResponse
 */
export type DeleteExpenditureCategoryResponse = Message<"domain.expenditure.v1.DeleteExpenditureCategoryResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenditureCategoryResponse.
 * Use `create(DeleteExpenditureCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteExpenditureCategoryResponseSchema: GenMessage<DeleteExpenditureCategoryResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenditureCategoriesRequest
 */
export type ListExpenditureCategoriesRequest = Message<"domain.expenditure.v1.ListExpenditureCategoriesRequest"> & {
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
 * Describes the message domain.expenditure.v1.ListExpenditureCategoriesRequest.
 * Use `create(ListExpenditureCategoriesRequestSchema)` to create a new message.
 */
export declare const ListExpenditureCategoriesRequestSchema: GenMessage<ListExpenditureCategoriesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenditureCategoriesResponse
 */
export type ListExpenditureCategoriesResponse = Message<"domain.expenditure.v1.ListExpenditureCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureCategory data = 1;
     */
    data: ExpenditureCategory[];
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
 * Describes the message domain.expenditure.v1.ListExpenditureCategoriesResponse.
 * Use `create(ListExpenditureCategoriesResponseSchema)` to create a new message.
 */
export declare const ListExpenditureCategoriesResponseSchema: GenMessage<ListExpenditureCategoriesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureCategoryListPageDataRequest
 */
export type GetExpenditureCategoryListPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureCategoryListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetExpenditureCategoryListPageDataRequest.
 * Use `create(GetExpenditureCategoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureCategoryListPageDataRequestSchema: GenMessage<GetExpenditureCategoryListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureCategoryListPageDataResponse
 */
export type GetExpenditureCategoryListPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureCategoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureCategory expenditure_category_list = 1;
     */
    expenditureCategoryList: ExpenditureCategory[];
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
 * Describes the message domain.expenditure.v1.GetExpenditureCategoryListPageDataResponse.
 * Use `create(GetExpenditureCategoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureCategoryListPageDataResponseSchema: GenMessage<GetExpenditureCategoryListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureCategoryItemPageDataRequest
 */
export type GetExpenditureCategoryItemPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureCategoryItemPageDataRequest"> & {
    /**
     * @generated from field: string expenditure_category_id = 1;
     */
    expenditureCategoryId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureCategoryItemPageDataRequest.
 * Use `create(GetExpenditureCategoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureCategoryItemPageDataRequestSchema: GenMessage<GetExpenditureCategoryItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureCategoryItemPageDataResponse
 */
export type GetExpenditureCategoryItemPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureCategoryItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenditureCategory expenditure_category = 1;
     */
    expenditureCategory?: ExpenditureCategory;
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
 * Describes the message domain.expenditure.v1.GetExpenditureCategoryItemPageDataResponse.
 * Use `create(GetExpenditureCategoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureCategoryItemPageDataResponseSchema: GenMessage<GetExpenditureCategoryItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.ExpenditureCategoryDomainService
 */
export declare const ExpenditureCategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.CreateExpenditureCategory
     */
    createExpenditureCategory: {
        methodKind: "unary";
        input: typeof CreateExpenditureCategoryRequestSchema;
        output: typeof CreateExpenditureCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.ReadExpenditureCategory
     */
    readExpenditureCategory: {
        methodKind: "unary";
        input: typeof ReadExpenditureCategoryRequestSchema;
        output: typeof ReadExpenditureCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.UpdateExpenditureCategory
     */
    updateExpenditureCategory: {
        methodKind: "unary";
        input: typeof UpdateExpenditureCategoryRequestSchema;
        output: typeof UpdateExpenditureCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.DeleteExpenditureCategory
     */
    deleteExpenditureCategory: {
        methodKind: "unary";
        input: typeof DeleteExpenditureCategoryRequestSchema;
        output: typeof DeleteExpenditureCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.ListExpenditureCategories
     */
    listExpenditureCategories: {
        methodKind: "unary";
        input: typeof ListExpenditureCategoriesRequestSchema;
        output: typeof ListExpenditureCategoriesResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.GetExpenditureCategoryListPageData
     */
    getExpenditureCategoryListPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureCategoryListPageDataRequestSchema;
        output: typeof GetExpenditureCategoryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureCategoryDomainService.GetExpenditureCategoryItemPageData
     */
    getExpenditureCategoryItemPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureCategoryItemPageDataRequestSchema;
        output: typeof GetExpenditureCategoryItemPageDataResponseSchema;
    };
}>;
