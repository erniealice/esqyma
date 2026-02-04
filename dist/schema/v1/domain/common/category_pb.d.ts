import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "./error_pb";
import type { FilterRequest } from "./filter_pb";
import type { PaginationRequest } from "./pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/category.proto.
 */
export declare const file_domain_common_category: GenFile;
/**
 * Category represents a common category entity that can be used across domains.
 * This provides a base structure for categorizing various entities like clients,
 * products, locations, etc. Domain-specific categories can reference this common
 * Category entity.
 *
 * @generated from message domain.common.v1.Category
 */
export type Category = Message<"domain.common.v1.Category"> & {
    /**
     * Unique identifier for the category
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Human-readable name of the category
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Detailed description of what this category represents
     *
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * Code/identifier for the category (useful for system references)
     *
     * @generated from field: string code = 4;
     */
    code: string;
    /**
     * Module or domain this category belongs to (e.g., "client", "product", "location")
     *
     * @generated from field: string module = 5;
     */
    module: string;
    /**
     * Parent category ID if this is a sub-category (optional)
     *
     * @generated from field: optional string parent_id = 6;
     */
    parentId?: string;
    /**
     * Creation timestamp as Unix epoch (milliseconds)
     *
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * Creation timestamp as human-readable string
     *
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * Last modification timestamp as Unix epoch (milliseconds)
     *
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * Last modification timestamp as human-readable string
     *
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * Whether the category is currently active
     *
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * Display order for sorting categories (optional)
     *
     * @generated from field: optional int32 display_order = 12;
     */
    displayOrder?: number;
};
/**
 * Describes the message domain.common.v1.Category.
 * Use `create(CategorySchema)` to create a new message.
 */
export declare const CategorySchema: GenMessage<Category>;
/**
 * CategoryCodeValue represents a category by its code and value.
 * Used for code-based category creation where the code is resolved to an ID internally.
 *
 * @generated from message domain.common.v1.CategoryCodeValue
 */
export type CategoryCodeValue = Message<"domain.common.v1.CategoryCodeValue"> & {
    /**
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     * @generated from field: string value = 2;
     */
    value: string;
};
/**
 * Describes the message domain.common.v1.CategoryCodeValue.
 * Use `create(CategoryCodeValueSchema)` to create a new message.
 */
export declare const CategoryCodeValueSchema: GenMessage<CategoryCodeValue>;
/**
 * @generated from message domain.common.v1.CreateCategoryRequest
 */
export type CreateCategoryRequest = Message<"domain.common.v1.CreateCategoryRequest"> & {
    /**
     * @generated from field: domain.common.v1.Category data = 1;
     */
    data?: Category;
};
/**
 * Describes the message domain.common.v1.CreateCategoryRequest.
 * Use `create(CreateCategoryRequestSchema)` to create a new message.
 */
export declare const CreateCategoryRequestSchema: GenMessage<CreateCategoryRequest>;
/**
 * @generated from message domain.common.v1.CreateCategoryResponse
 */
export type CreateCategoryResponse = Message<"domain.common.v1.CreateCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Category data = 1;
     */
    data: Category[];
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
 * Describes the message domain.common.v1.CreateCategoryResponse.
 * Use `create(CreateCategoryResponseSchema)` to create a new message.
 */
export declare const CreateCategoryResponseSchema: GenMessage<CreateCategoryResponse>;
/**
 * @generated from message domain.common.v1.ReadCategoryRequest
 */
export type ReadCategoryRequest = Message<"domain.common.v1.ReadCategoryRequest"> & {
    /**
     * @generated from field: domain.common.v1.Category data = 1;
     */
    data?: Category;
};
/**
 * Describes the message domain.common.v1.ReadCategoryRequest.
 * Use `create(ReadCategoryRequestSchema)` to create a new message.
 */
export declare const ReadCategoryRequestSchema: GenMessage<ReadCategoryRequest>;
/**
 * @generated from message domain.common.v1.ReadCategoryResponse
 */
export type ReadCategoryResponse = Message<"domain.common.v1.ReadCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Category data = 1;
     */
    data: Category[];
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
 * Describes the message domain.common.v1.ReadCategoryResponse.
 * Use `create(ReadCategoryResponseSchema)` to create a new message.
 */
export declare const ReadCategoryResponseSchema: GenMessage<ReadCategoryResponse>;
/**
 * @generated from message domain.common.v1.UpdateCategoryRequest
 */
export type UpdateCategoryRequest = Message<"domain.common.v1.UpdateCategoryRequest"> & {
    /**
     * @generated from field: domain.common.v1.Category data = 1;
     */
    data?: Category;
};
/**
 * Describes the message domain.common.v1.UpdateCategoryRequest.
 * Use `create(UpdateCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateCategoryRequestSchema: GenMessage<UpdateCategoryRequest>;
/**
 * @generated from message domain.common.v1.UpdateCategoryResponse
 */
export type UpdateCategoryResponse = Message<"domain.common.v1.UpdateCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Category data = 1;
     */
    data: Category[];
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
 * Describes the message domain.common.v1.UpdateCategoryResponse.
 * Use `create(UpdateCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateCategoryResponseSchema: GenMessage<UpdateCategoryResponse>;
/**
 * @generated from message domain.common.v1.DeleteCategoryRequest
 */
export type DeleteCategoryRequest = Message<"domain.common.v1.DeleteCategoryRequest"> & {
    /**
     * @generated from field: domain.common.v1.Category data = 1;
     */
    data?: Category;
};
/**
 * Describes the message domain.common.v1.DeleteCategoryRequest.
 * Use `create(DeleteCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteCategoryRequestSchema: GenMessage<DeleteCategoryRequest>;
/**
 * @generated from message domain.common.v1.DeleteCategoryResponse
 */
export type DeleteCategoryResponse = Message<"domain.common.v1.DeleteCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Category data = 1;
     */
    data: Category[];
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
 * Describes the message domain.common.v1.DeleteCategoryResponse.
 * Use `create(DeleteCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteCategoryResponseSchema: GenMessage<DeleteCategoryResponse>;
/**
 * @generated from message domain.common.v1.ListCategoriesRequest
 */
export type ListCategoriesRequest = Message<"domain.common.v1.ListCategoriesRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 1;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 2;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.common.v1.ListCategoriesRequest.
 * Use `create(ListCategoriesRequestSchema)` to create a new message.
 */
export declare const ListCategoriesRequestSchema: GenMessage<ListCategoriesRequest>;
/**
 * @generated from message domain.common.v1.ListCategoriesResponse
 */
export type ListCategoriesResponse = Message<"domain.common.v1.ListCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Category data = 1;
     */
    data: Category[];
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
 * Describes the message domain.common.v1.ListCategoriesResponse.
 * Use `create(ListCategoriesResponseSchema)` to create a new message.
 */
export declare const ListCategoriesResponseSchema: GenMessage<ListCategoriesResponse>;
/**
 * CategoryDomainService provides CRUD operations for the common Category entity.
 *
 * @generated from service domain.common.v1.CategoryDomainService
 */
export declare const CategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.common.v1.CategoryDomainService.CreateCategory
     */
    createCategory: {
        methodKind: "unary";
        input: typeof CreateCategoryRequestSchema;
        output: typeof CreateCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.CategoryDomainService.ReadCategory
     */
    readCategory: {
        methodKind: "unary";
        input: typeof ReadCategoryRequestSchema;
        output: typeof ReadCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.CategoryDomainService.UpdateCategory
     */
    updateCategory: {
        methodKind: "unary";
        input: typeof UpdateCategoryRequestSchema;
        output: typeof UpdateCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.CategoryDomainService.DeleteCategory
     */
    deleteCategory: {
        methodKind: "unary";
        input: typeof DeleteCategoryRequestSchema;
        output: typeof DeleteCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.CategoryDomainService.ListCategories
     */
    listCategories: {
        methodKind: "unary";
        input: typeof ListCategoriesRequestSchema;
        output: typeof ListCategoriesResponseSchema;
    };
}>;
