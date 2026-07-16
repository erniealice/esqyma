import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_plan_staff/product_plan_staff.proto.
 */
export declare const file_domain_product_product_plan_staff_product_plan_staff: GenFile;
/**
 * ProductPlanStaff is the ELIGIBILITY edge — the qualified-staff pool for a
 * subject-in-program (product_plan). role discriminates the pool membership
 * ("eligible" / "primary" / "assistant"; data-driven, not an enum). It
 * constrains the deliverer picker; it is NOT a subject manager / access grant
 * (that would be product_plan_workspace_user). The catalog is year-neutral —
 * the year lives in the engagement layer, so this row carries no period anchor.
 *
 * @generated from message domain.product.v1.ProductPlanStaff
 */
export type ProductPlanStaff = Message<"domain.product.v1.ProductPlanStaff"> & {
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
     * @generated from field: string product_plan_id = 8;
     */
    productPlanId: string;
    /**
     * @generated from field: string staff_id = 9;
     */
    staffId: string;
    /**
     * @generated from field: string role = 10;
     */
    role: string;
};
/**
 * Describes the message domain.product.v1.ProductPlanStaff.
 * Use `create(ProductPlanStaffSchema)` to create a new message.
 */
export declare const ProductPlanStaffSchema: GenMessage<ProductPlanStaff>;
/**
 * @generated from message domain.product.v1.CreateProductPlanStaffRequest
 */
export type CreateProductPlanStaffRequest = Message<"domain.product.v1.CreateProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlanStaff data = 1;
     */
    data?: ProductPlanStaff;
};
/**
 * Describes the message domain.product.v1.CreateProductPlanStaffRequest.
 * Use `create(CreateProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const CreateProductPlanStaffRequestSchema: GenMessage<CreateProductPlanStaffRequest>;
/**
 * @generated from message domain.product.v1.CreateProductPlanStaffResponse
 */
export type CreateProductPlanStaffResponse = Message<"domain.product.v1.CreateProductPlanStaffResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlanStaff data = 1;
     */
    data: ProductPlanStaff[];
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
 * Describes the message domain.product.v1.CreateProductPlanStaffResponse.
 * Use `create(CreateProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const CreateProductPlanStaffResponseSchema: GenMessage<CreateProductPlanStaffResponse>;
/**
 * @generated from message domain.product.v1.ReadProductPlanStaffRequest
 */
export type ReadProductPlanStaffRequest = Message<"domain.product.v1.ReadProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlanStaff data = 1;
     */
    data?: ProductPlanStaff;
};
/**
 * Describes the message domain.product.v1.ReadProductPlanStaffRequest.
 * Use `create(ReadProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const ReadProductPlanStaffRequestSchema: GenMessage<ReadProductPlanStaffRequest>;
/**
 * @generated from message domain.product.v1.ReadProductPlanStaffResponse
 */
export type ReadProductPlanStaffResponse = Message<"domain.product.v1.ReadProductPlanStaffResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlanStaff data = 1;
     */
    data: ProductPlanStaff[];
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
 * Describes the message domain.product.v1.ReadProductPlanStaffResponse.
 * Use `create(ReadProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const ReadProductPlanStaffResponseSchema: GenMessage<ReadProductPlanStaffResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductPlanStaffRequest
 */
export type UpdateProductPlanStaffRequest = Message<"domain.product.v1.UpdateProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlanStaff data = 1;
     */
    data?: ProductPlanStaff;
};
/**
 * Describes the message domain.product.v1.UpdateProductPlanStaffRequest.
 * Use `create(UpdateProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const UpdateProductPlanStaffRequestSchema: GenMessage<UpdateProductPlanStaffRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductPlanStaffResponse
 */
export type UpdateProductPlanStaffResponse = Message<"domain.product.v1.UpdateProductPlanStaffResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlanStaff data = 1;
     */
    data: ProductPlanStaff[];
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
 * Describes the message domain.product.v1.UpdateProductPlanStaffResponse.
 * Use `create(UpdateProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const UpdateProductPlanStaffResponseSchema: GenMessage<UpdateProductPlanStaffResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductPlanStaffRequest
 */
export type DeleteProductPlanStaffRequest = Message<"domain.product.v1.DeleteProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlanStaff data = 1;
     */
    data?: ProductPlanStaff;
};
/**
 * Describes the message domain.product.v1.DeleteProductPlanStaffRequest.
 * Use `create(DeleteProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const DeleteProductPlanStaffRequestSchema: GenMessage<DeleteProductPlanStaffRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductPlanStaffResponse
 */
export type DeleteProductPlanStaffResponse = Message<"domain.product.v1.DeleteProductPlanStaffResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductPlanStaffResponse.
 * Use `create(DeleteProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const DeleteProductPlanStaffResponseSchema: GenMessage<DeleteProductPlanStaffResponse>;
/**
 * @generated from message domain.product.v1.ListProductPlanStaffsRequest
 */
export type ListProductPlanStaffsRequest = Message<"domain.product.v1.ListProductPlanStaffsRequest"> & {
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
 * Describes the message domain.product.v1.ListProductPlanStaffsRequest.
 * Use `create(ListProductPlanStaffsRequestSchema)` to create a new message.
 */
export declare const ListProductPlanStaffsRequestSchema: GenMessage<ListProductPlanStaffsRequest>;
/**
 * @generated from message domain.product.v1.ListProductPlanStaffsResponse
 */
export type ListProductPlanStaffsResponse = Message<"domain.product.v1.ListProductPlanStaffsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlanStaff data = 1;
     */
    data: ProductPlanStaff[];
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
 * Describes the message domain.product.v1.ListProductPlanStaffsResponse.
 * Use `create(ListProductPlanStaffsResponseSchema)` to create a new message.
 */
export declare const ListProductPlanStaffsResponseSchema: GenMessage<ListProductPlanStaffsResponse>;
/**
 * @generated from message domain.product.v1.GetProductPlanStaffListPageDataRequest
 */
export type GetProductPlanStaffListPageDataRequest = Message<"domain.product.v1.GetProductPlanStaffListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductPlanStaffListPageDataRequest.
 * Use `create(GetProductPlanStaffListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductPlanStaffListPageDataRequestSchema: GenMessage<GetProductPlanStaffListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductPlanStaffListPageDataResponse
 */
export type GetProductPlanStaffListPageDataResponse = Message<"domain.product.v1.GetProductPlanStaffListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlanStaff product_plan_staff_list = 1;
     */
    productPlanStaffList: ProductPlanStaff[];
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
 * Describes the message domain.product.v1.GetProductPlanStaffListPageDataResponse.
 * Use `create(GetProductPlanStaffListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductPlanStaffListPageDataResponseSchema: GenMessage<GetProductPlanStaffListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductPlanStaffItemPageDataRequest
 */
export type GetProductPlanStaffItemPageDataRequest = Message<"domain.product.v1.GetProductPlanStaffItemPageDataRequest"> & {
    /**
     * @generated from field: string product_plan_staff_id = 1;
     */
    productPlanStaffId: string;
};
/**
 * Describes the message domain.product.v1.GetProductPlanStaffItemPageDataRequest.
 * Use `create(GetProductPlanStaffItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductPlanStaffItemPageDataRequestSchema: GenMessage<GetProductPlanStaffItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductPlanStaffItemPageDataResponse
 */
export type GetProductPlanStaffItemPageDataResponse = Message<"domain.product.v1.GetProductPlanStaffItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlanStaff product_plan_staff = 1;
     */
    productPlanStaff?: ProductPlanStaff;
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
 * Describes the message domain.product.v1.GetProductPlanStaffItemPageDataResponse.
 * Use `create(GetProductPlanStaffItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductPlanStaffItemPageDataResponseSchema: GenMessage<GetProductPlanStaffItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductPlanStaffDomainService
 */
export declare const ProductPlanStaffDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.CreateProductPlanStaff
     */
    createProductPlanStaff: {
        methodKind: "unary";
        input: typeof CreateProductPlanStaffRequestSchema;
        output: typeof CreateProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.ReadProductPlanStaff
     */
    readProductPlanStaff: {
        methodKind: "unary";
        input: typeof ReadProductPlanStaffRequestSchema;
        output: typeof ReadProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.UpdateProductPlanStaff
     */
    updateProductPlanStaff: {
        methodKind: "unary";
        input: typeof UpdateProductPlanStaffRequestSchema;
        output: typeof UpdateProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.DeleteProductPlanStaff
     */
    deleteProductPlanStaff: {
        methodKind: "unary";
        input: typeof DeleteProductPlanStaffRequestSchema;
        output: typeof DeleteProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.ListProductPlanStaffs
     */
    listProductPlanStaffs: {
        methodKind: "unary";
        input: typeof ListProductPlanStaffsRequestSchema;
        output: typeof ListProductPlanStaffsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.GetProductPlanStaffListPageData
     */
    getProductPlanStaffListPageData: {
        methodKind: "unary";
        input: typeof GetProductPlanStaffListPageDataRequestSchema;
        output: typeof GetProductPlanStaffListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanStaffDomainService.GetProductPlanStaffItemPageData
     */
    getProductPlanStaffItemPageData: {
        methodKind: "unary";
        input: typeof GetProductPlanStaffItemPageDataRequestSchema;
        output: typeof GetProductPlanStaffItemPageDataResponseSchema;
    };
}>;
