import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_plan/product_plan.proto.
 */
export declare const file_domain_product_product_plan_product_plan: GenFile;
/**
 * @generated from message domain.product.v1.ProductPlan
 */
export type ProductPlan = Message<"domain.product.v1.ProductPlan"> & {
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
     * @generated from field: optional string description = 8;
     */
    description?: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 11;
     */
    product?: Product;
    /**
     * @generated from field: string product_id = 12;
     */
    productId: string;
    /**
     * @generated from field: string plan_id = 13;
     */
    planId: string;
    /**
     * @generated from field: optional string job_template_id = 14;
     */
    jobTemplateId?: string;
    /**
     * Specific variant of product, iff parent product.variant_mode = "configurable".
     * Null when parent.variant_mode = "none". Model D: catalog-level specificity.
     * ProductPricePlan does NOT carry variant_id — it joins through product_plan_id to
     * inherit this row's variant. Binary invariant enforced at use-case layer.
     *
     * @generated from field: optional string product_variant_id = 15;
     */
    productVariantId?: string;
};
/**
 * Describes the message domain.product.v1.ProductPlan.
 * Use `create(ProductPlanSchema)` to create a new message.
 */
export declare const ProductPlanSchema: GenMessage<ProductPlan>;
/**
 * @generated from message domain.product.v1.CreateProductPlanRequest
 */
export type CreateProductPlanRequest = Message<"domain.product.v1.CreateProductPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlan data = 1;
     */
    data?: ProductPlan;
};
/**
 * Describes the message domain.product.v1.CreateProductPlanRequest.
 * Use `create(CreateProductPlanRequestSchema)` to create a new message.
 */
export declare const CreateProductPlanRequestSchema: GenMessage<CreateProductPlanRequest>;
/**
 * @generated from message domain.product.v1.CreateProductPlanResponse
 */
export type CreateProductPlanResponse = Message<"domain.product.v1.CreateProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlan data = 1;
     */
    data: ProductPlan[];
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
 * Describes the message domain.product.v1.CreateProductPlanResponse.
 * Use `create(CreateProductPlanResponseSchema)` to create a new message.
 */
export declare const CreateProductPlanResponseSchema: GenMessage<CreateProductPlanResponse>;
/**
 * @generated from message domain.product.v1.ReadProductPlanRequest
 */
export type ReadProductPlanRequest = Message<"domain.product.v1.ReadProductPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlan data = 1;
     */
    data?: ProductPlan;
};
/**
 * Describes the message domain.product.v1.ReadProductPlanRequest.
 * Use `create(ReadProductPlanRequestSchema)` to create a new message.
 */
export declare const ReadProductPlanRequestSchema: GenMessage<ReadProductPlanRequest>;
/**
 * @generated from message domain.product.v1.ReadProductPlanResponse
 */
export type ReadProductPlanResponse = Message<"domain.product.v1.ReadProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlan data = 1;
     */
    data: ProductPlan[];
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
 * Describes the message domain.product.v1.ReadProductPlanResponse.
 * Use `create(ReadProductPlanResponseSchema)` to create a new message.
 */
export declare const ReadProductPlanResponseSchema: GenMessage<ReadProductPlanResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductPlanRequest
 */
export type UpdateProductPlanRequest = Message<"domain.product.v1.UpdateProductPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlan data = 1;
     */
    data?: ProductPlan;
};
/**
 * Describes the message domain.product.v1.UpdateProductPlanRequest.
 * Use `create(UpdateProductPlanRequestSchema)` to create a new message.
 */
export declare const UpdateProductPlanRequestSchema: GenMessage<UpdateProductPlanRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductPlanResponse
 */
export type UpdateProductPlanResponse = Message<"domain.product.v1.UpdateProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlan data = 1;
     */
    data: ProductPlan[];
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
 * Describes the message domain.product.v1.UpdateProductPlanResponse.
 * Use `create(UpdateProductPlanResponseSchema)` to create a new message.
 */
export declare const UpdateProductPlanResponseSchema: GenMessage<UpdateProductPlanResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductPlanRequest
 */
export type DeleteProductPlanRequest = Message<"domain.product.v1.DeleteProductPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlan data = 1;
     */
    data?: ProductPlan;
};
/**
 * Describes the message domain.product.v1.DeleteProductPlanRequest.
 * Use `create(DeleteProductPlanRequestSchema)` to create a new message.
 */
export declare const DeleteProductPlanRequestSchema: GenMessage<DeleteProductPlanRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductPlanResponse
 */
export type DeleteProductPlanResponse = Message<"domain.product.v1.DeleteProductPlanResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductPlanResponse.
 * Use `create(DeleteProductPlanResponseSchema)` to create a new message.
 */
export declare const DeleteProductPlanResponseSchema: GenMessage<DeleteProductPlanResponse>;
/**
 * @generated from message domain.product.v1.ListProductPlansRequest
 */
export type ListProductPlansRequest = Message<"domain.product.v1.ListProductPlansRequest"> & {
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
 * Describes the message domain.product.v1.ListProductPlansRequest.
 * Use `create(ListProductPlansRequestSchema)` to create a new message.
 */
export declare const ListProductPlansRequestSchema: GenMessage<ListProductPlansRequest>;
/**
 * @generated from message domain.product.v1.ListProductPlansResponse
 */
export type ListProductPlansResponse = Message<"domain.product.v1.ListProductPlansResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlan data = 1;
     */
    data: ProductPlan[];
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
 * Describes the message domain.product.v1.ListProductPlansResponse.
 * Use `create(ListProductPlansResponseSchema)` to create a new message.
 */
export declare const ListProductPlansResponseSchema: GenMessage<ListProductPlansResponse>;
/**
 * @generated from message domain.product.v1.GetProductPlanListPageDataRequest
 */
export type GetProductPlanListPageDataRequest = Message<"domain.product.v1.GetProductPlanListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductPlanListPageDataRequest.
 * Use `create(GetProductPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductPlanListPageDataRequestSchema: GenMessage<GetProductPlanListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductPlanListPageDataResponse
 */
export type GetProductPlanListPageDataResponse = Message<"domain.product.v1.GetProductPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlan product_plan_list = 1;
     */
    productPlanList: ProductPlan[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.product.v1.GetProductPlanListPageDataResponse.
 * Use `create(GetProductPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductPlanListPageDataResponseSchema: GenMessage<GetProductPlanListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductPlanItemPageDataRequest
 */
export type GetProductPlanItemPageDataRequest = Message<"domain.product.v1.GetProductPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string product_plan_id = 1;
     */
    productPlanId: string;
};
/**
 * Describes the message domain.product.v1.GetProductPlanItemPageDataRequest.
 * Use `create(GetProductPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductPlanItemPageDataRequestSchema: GenMessage<GetProductPlanItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductPlanItemPageDataResponse
 */
export type GetProductPlanItemPageDataResponse = Message<"domain.product.v1.GetProductPlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductPlan product_plan = 1;
     */
    productPlan?: ProductPlan;
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
 * Describes the message domain.product.v1.GetProductPlanItemPageDataResponse.
 * Use `create(GetProductPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductPlanItemPageDataResponseSchema: GenMessage<GetProductPlanItemPageDataResponse>;
/**
 * Extra RPC messages
 *
 * @generated from message domain.product.v1.ListProductPlansByPlanRequest
 */
export type ListProductPlansByPlanRequest = Message<"domain.product.v1.ListProductPlansByPlanRequest"> & {
    /**
     * @generated from field: string plan_id = 1;
     */
    planId: string;
};
/**
 * Describes the message domain.product.v1.ListProductPlansByPlanRequest.
 * Use `create(ListProductPlansByPlanRequestSchema)` to create a new message.
 */
export declare const ListProductPlansByPlanRequestSchema: GenMessage<ListProductPlansByPlanRequest>;
/**
 * @generated from message domain.product.v1.ListProductPlansByPlanResponse
 */
export type ListProductPlansByPlanResponse = Message<"domain.product.v1.ListProductPlansByPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductPlan product_plans = 1;
     */
    productPlans: ProductPlan[];
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
 * Describes the message domain.product.v1.ListProductPlansByPlanResponse.
 * Use `create(ListProductPlansByPlanResponseSchema)` to create a new message.
 */
export declare const ListProductPlansByPlanResponseSchema: GenMessage<ListProductPlansByPlanResponse>;
/**
 * @generated from service domain.product.v1.ProductPlanDomainService
 */
export declare const ProductPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.CreateProductPlan
     */
    createProductPlan: {
        methodKind: "unary";
        input: typeof CreateProductPlanRequestSchema;
        output: typeof CreateProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.ReadProductPlan
     */
    readProductPlan: {
        methodKind: "unary";
        input: typeof ReadProductPlanRequestSchema;
        output: typeof ReadProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.UpdateProductPlan
     */
    updateProductPlan: {
        methodKind: "unary";
        input: typeof UpdateProductPlanRequestSchema;
        output: typeof UpdateProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.DeleteProductPlan
     */
    deleteProductPlan: {
        methodKind: "unary";
        input: typeof DeleteProductPlanRequestSchema;
        output: typeof DeleteProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.ListProductPlans
     */
    listProductPlans: {
        methodKind: "unary";
        input: typeof ListProductPlansRequestSchema;
        output: typeof ListProductPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.GetProductPlanListPageData
     */
    getProductPlanListPageData: {
        methodKind: "unary";
        input: typeof GetProductPlanListPageDataRequestSchema;
        output: typeof GetProductPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductPlanDomainService.GetProductPlanItemPageData
     */
    getProductPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetProductPlanItemPageDataRequestSchema;
        output: typeof GetProductPlanItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by plan
     *
     * @generated from rpc domain.product.v1.ProductPlanDomainService.ListByPlan
     */
    listByPlan: {
        methodKind: "unary";
        input: typeof ListProductPlansByPlanRequestSchema;
        output: typeof ListProductPlansByPlanResponseSchema;
    };
}>;
