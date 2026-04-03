import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Category } from "../../common/category_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier_category/supplier_category.proto.
 */
export declare const file_domain_entity_supplier_category_supplier_category: GenFile;
/**
 * SupplierCategory represents a category for organizing suppliers.
 * It references the common Category entity for reusability.
 *
 * @generated from message domain.entity.v1.SupplierCategory
 */
export type SupplierCategory = Message<"domain.entity.v1.SupplierCategory"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string supplier_id = 2;
     */
    supplierId: string;
    /**
     * @generated from field: string category_id = 3;
     */
    categoryId: string;
    /**
     * @generated from field: domain.common.v1.Category category = 4;
     */
    category?: Category;
    /**
     * @generated from field: optional int64 date_created = 5;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 6;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 7;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 8;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.SupplierCategory.
 * Use `create(SupplierCategorySchema)` to create a new message.
 */
export declare const SupplierCategorySchema: GenMessage<SupplierCategory>;
/**
 * @generated from message domain.entity.v1.CreateSupplierCategoryRequest
 */
export type CreateSupplierCategoryRequest = Message<"domain.entity.v1.CreateSupplierCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierCategory data = 1;
     */
    data?: SupplierCategory;
};
/**
 * Describes the message domain.entity.v1.CreateSupplierCategoryRequest.
 * Use `create(CreateSupplierCategoryRequestSchema)` to create a new message.
 */
export declare const CreateSupplierCategoryRequestSchema: GenMessage<CreateSupplierCategoryRequest>;
/**
 * @generated from message domain.entity.v1.CreateSupplierCategoryResponse
 */
export type CreateSupplierCategoryResponse = Message<"domain.entity.v1.CreateSupplierCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierCategory data = 1;
     */
    data: SupplierCategory[];
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
 * Describes the message domain.entity.v1.CreateSupplierCategoryResponse.
 * Use `create(CreateSupplierCategoryResponseSchema)` to create a new message.
 */
export declare const CreateSupplierCategoryResponseSchema: GenMessage<CreateSupplierCategoryResponse>;
/**
 * @generated from message domain.entity.v1.ReadSupplierCategoryRequest
 */
export type ReadSupplierCategoryRequest = Message<"domain.entity.v1.ReadSupplierCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierCategory data = 1;
     */
    data?: SupplierCategory;
};
/**
 * Describes the message domain.entity.v1.ReadSupplierCategoryRequest.
 * Use `create(ReadSupplierCategoryRequestSchema)` to create a new message.
 */
export declare const ReadSupplierCategoryRequestSchema: GenMessage<ReadSupplierCategoryRequest>;
/**
 * @generated from message domain.entity.v1.ReadSupplierCategoryResponse
 */
export type ReadSupplierCategoryResponse = Message<"domain.entity.v1.ReadSupplierCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierCategory data = 1;
     */
    data: SupplierCategory[];
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
 * Describes the message domain.entity.v1.ReadSupplierCategoryResponse.
 * Use `create(ReadSupplierCategoryResponseSchema)` to create a new message.
 */
export declare const ReadSupplierCategoryResponseSchema: GenMessage<ReadSupplierCategoryResponse>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierCategoryRequest
 */
export type UpdateSupplierCategoryRequest = Message<"domain.entity.v1.UpdateSupplierCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierCategory data = 1;
     */
    data?: SupplierCategory;
};
/**
 * Describes the message domain.entity.v1.UpdateSupplierCategoryRequest.
 * Use `create(UpdateSupplierCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierCategoryRequestSchema: GenMessage<UpdateSupplierCategoryRequest>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierCategoryResponse
 */
export type UpdateSupplierCategoryResponse = Message<"domain.entity.v1.UpdateSupplierCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierCategory data = 1;
     */
    data: SupplierCategory[];
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
 * Describes the message domain.entity.v1.UpdateSupplierCategoryResponse.
 * Use `create(UpdateSupplierCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierCategoryResponseSchema: GenMessage<UpdateSupplierCategoryResponse>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierCategoryRequest
 */
export type DeleteSupplierCategoryRequest = Message<"domain.entity.v1.DeleteSupplierCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierCategory data = 1;
     */
    data?: SupplierCategory;
};
/**
 * Describes the message domain.entity.v1.DeleteSupplierCategoryRequest.
 * Use `create(DeleteSupplierCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierCategoryRequestSchema: GenMessage<DeleteSupplierCategoryRequest>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierCategoryResponse
 */
export type DeleteSupplierCategoryResponse = Message<"domain.entity.v1.DeleteSupplierCategoryResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteSupplierCategoryResponse.
 * Use `create(DeleteSupplierCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierCategoryResponseSchema: GenMessage<DeleteSupplierCategoryResponse>;
/**
 * @generated from message domain.entity.v1.ListSupplierCategoriesRequest
 */
export type ListSupplierCategoriesRequest = Message<"domain.entity.v1.ListSupplierCategoriesRequest"> & {
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
 * Describes the message domain.entity.v1.ListSupplierCategoriesRequest.
 * Use `create(ListSupplierCategoriesRequestSchema)` to create a new message.
 */
export declare const ListSupplierCategoriesRequestSchema: GenMessage<ListSupplierCategoriesRequest>;
/**
 * @generated from message domain.entity.v1.ListSupplierCategoriesResponse
 */
export type ListSupplierCategoriesResponse = Message<"domain.entity.v1.ListSupplierCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierCategory data = 1;
     */
    data: SupplierCategory[];
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
 * Describes the message domain.entity.v1.ListSupplierCategoriesResponse.
 * Use `create(ListSupplierCategoriesResponseSchema)` to create a new message.
 */
export declare const ListSupplierCategoriesResponseSchema: GenMessage<ListSupplierCategoriesResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierCategoryListPageDataRequest
 */
export type GetSupplierCategoryListPageDataRequest = Message<"domain.entity.v1.GetSupplierCategoryListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
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
 * Describes the message domain.entity.v1.GetSupplierCategoryListPageDataRequest.
 * Use `create(GetSupplierCategoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierCategoryListPageDataRequestSchema: GenMessage<GetSupplierCategoryListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierCategoryListPageDataResponse
 */
export type GetSupplierCategoryListPageDataResponse = Message<"domain.entity.v1.GetSupplierCategoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierCategory supplier_category_list = 1;
     */
    supplierCategoryList: SupplierCategory[];
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
 * Describes the message domain.entity.v1.GetSupplierCategoryListPageDataResponse.
 * Use `create(GetSupplierCategoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierCategoryListPageDataResponseSchema: GenMessage<GetSupplierCategoryListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierCategoryItemPageDataRequest
 */
export type GetSupplierCategoryItemPageDataRequest = Message<"domain.entity.v1.GetSupplierCategoryItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_category_id = 1;
     */
    supplierCategoryId: string;
};
/**
 * Describes the message domain.entity.v1.GetSupplierCategoryItemPageDataRequest.
 * Use `create(GetSupplierCategoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierCategoryItemPageDataRequestSchema: GenMessage<GetSupplierCategoryItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierCategoryItemPageDataResponse
 */
export type GetSupplierCategoryItemPageDataResponse = Message<"domain.entity.v1.GetSupplierCategoryItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierCategory supplier_category = 1;
     */
    supplierCategory?: SupplierCategory;
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
 * Describes the message domain.entity.v1.GetSupplierCategoryItemPageDataResponse.
 * Use `create(GetSupplierCategoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierCategoryItemPageDataResponseSchema: GenMessage<GetSupplierCategoryItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.SupplierCategoryDomainService
 */
export declare const SupplierCategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.CreateSupplierCategory
     */
    createSupplierCategory: {
        methodKind: "unary";
        input: typeof CreateSupplierCategoryRequestSchema;
        output: typeof CreateSupplierCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.ReadSupplierCategory
     */
    readSupplierCategory: {
        methodKind: "unary";
        input: typeof ReadSupplierCategoryRequestSchema;
        output: typeof ReadSupplierCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.UpdateSupplierCategory
     */
    updateSupplierCategory: {
        methodKind: "unary";
        input: typeof UpdateSupplierCategoryRequestSchema;
        output: typeof UpdateSupplierCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.DeleteSupplierCategory
     */
    deleteSupplierCategory: {
        methodKind: "unary";
        input: typeof DeleteSupplierCategoryRequestSchema;
        output: typeof DeleteSupplierCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.ListSupplierCategories
     */
    listSupplierCategories: {
        methodKind: "unary";
        input: typeof ListSupplierCategoriesRequestSchema;
        output: typeof ListSupplierCategoriesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.GetSupplierCategoryListPageData
     */
    getSupplierCategoryListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierCategoryListPageDataRequestSchema;
        output: typeof GetSupplierCategoryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierCategoryDomainService.GetSupplierCategoryItemPageData
     */
    getSupplierCategoryItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierCategoryItemPageDataRequestSchema;
        output: typeof GetSupplierCategoryItemPageDataResponseSchema;
    };
}>;
