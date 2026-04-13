import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Product } from "../../product/product/product_pb";
import type { PricePlan } from "../price_plan/price_plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/product_price_plan/product_price_plan.proto.
 */
export declare const file_domain_subscription_product_price_plan_product_price_plan: GenFile;
/**
 * @generated from message domain.subscription.v1.ProductPricePlan
 */
export type ProductPricePlan = Message<"domain.subscription.v1.ProductPricePlan"> & {
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
     * @generated from field: optional domain.subscription.v1.PricePlan price_plan = 7;
     */
    pricePlan?: PricePlan;
    /**
     * @generated from field: string price_plan_id = 8;
     */
    pricePlanId: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 9;
     */
    product?: Product;
    /**
     * @generated from field: string product_id = 10;
     */
    productId: string;
    /**
     * centavos
     *
     * @generated from field: int64 price = 11;
     */
    price: bigint;
    /**
     * @generated from field: string currency = 12;
     */
    currency: string;
};
/**
 * Describes the message domain.subscription.v1.ProductPricePlan.
 * Use `create(ProductPricePlanSchema)` to create a new message.
 */
export declare const ProductPricePlanSchema: GenMessage<ProductPricePlan>;
/**
 * @generated from message domain.subscription.v1.CreateProductPricePlanRequest
 */
export type CreateProductPricePlanRequest = Message<"domain.subscription.v1.CreateProductPricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.ProductPricePlan data = 1;
     */
    data?: ProductPricePlan;
};
/**
 * Describes the message domain.subscription.v1.CreateProductPricePlanRequest.
 * Use `create(CreateProductPricePlanRequestSchema)` to create a new message.
 */
export declare const CreateProductPricePlanRequestSchema: GenMessage<CreateProductPricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.CreateProductPricePlanResponse
 */
export type CreateProductPricePlanResponse = Message<"domain.subscription.v1.CreateProductPricePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.ProductPricePlan data = 1;
     */
    data: ProductPricePlan[];
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
 * Describes the message domain.subscription.v1.CreateProductPricePlanResponse.
 * Use `create(CreateProductPricePlanResponseSchema)` to create a new message.
 */
export declare const CreateProductPricePlanResponseSchema: GenMessage<CreateProductPricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.ReadProductPricePlanRequest
 */
export type ReadProductPricePlanRequest = Message<"domain.subscription.v1.ReadProductPricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.ProductPricePlan data = 1;
     */
    data?: ProductPricePlan;
};
/**
 * Describes the message domain.subscription.v1.ReadProductPricePlanRequest.
 * Use `create(ReadProductPricePlanRequestSchema)` to create a new message.
 */
export declare const ReadProductPricePlanRequestSchema: GenMessage<ReadProductPricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.ReadProductPricePlanResponse
 */
export type ReadProductPricePlanResponse = Message<"domain.subscription.v1.ReadProductPricePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.ProductPricePlan data = 1;
     */
    data: ProductPricePlan[];
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
 * Describes the message domain.subscription.v1.ReadProductPricePlanResponse.
 * Use `create(ReadProductPricePlanResponseSchema)` to create a new message.
 */
export declare const ReadProductPricePlanResponseSchema: GenMessage<ReadProductPricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateProductPricePlanRequest
 */
export type UpdateProductPricePlanRequest = Message<"domain.subscription.v1.UpdateProductPricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.ProductPricePlan data = 1;
     */
    data?: ProductPricePlan;
};
/**
 * Describes the message domain.subscription.v1.UpdateProductPricePlanRequest.
 * Use `create(UpdateProductPricePlanRequestSchema)` to create a new message.
 */
export declare const UpdateProductPricePlanRequestSchema: GenMessage<UpdateProductPricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateProductPricePlanResponse
 */
export type UpdateProductPricePlanResponse = Message<"domain.subscription.v1.UpdateProductPricePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.ProductPricePlan data = 1;
     */
    data: ProductPricePlan[];
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
 * Describes the message domain.subscription.v1.UpdateProductPricePlanResponse.
 * Use `create(UpdateProductPricePlanResponseSchema)` to create a new message.
 */
export declare const UpdateProductPricePlanResponseSchema: GenMessage<UpdateProductPricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteProductPricePlanRequest
 */
export type DeleteProductPricePlanRequest = Message<"domain.subscription.v1.DeleteProductPricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.ProductPricePlan data = 1;
     */
    data?: ProductPricePlan;
};
/**
 * Describes the message domain.subscription.v1.DeleteProductPricePlanRequest.
 * Use `create(DeleteProductPricePlanRequestSchema)` to create a new message.
 */
export declare const DeleteProductPricePlanRequestSchema: GenMessage<DeleteProductPricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteProductPricePlanResponse
 */
export type DeleteProductPricePlanResponse = Message<"domain.subscription.v1.DeleteProductPricePlanResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteProductPricePlanResponse.
 * Use `create(DeleteProductPricePlanResponseSchema)` to create a new message.
 */
export declare const DeleteProductPricePlanResponseSchema: GenMessage<DeleteProductPricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.ListProductPricePlansRequest
 */
export type ListProductPricePlansRequest = Message<"domain.subscription.v1.ListProductPricePlansRequest"> & {
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
 * Describes the message domain.subscription.v1.ListProductPricePlansRequest.
 * Use `create(ListProductPricePlansRequestSchema)` to create a new message.
 */
export declare const ListProductPricePlansRequestSchema: GenMessage<ListProductPricePlansRequest>;
/**
 * @generated from message domain.subscription.v1.ListProductPricePlansResponse
 */
export type ListProductPricePlansResponse = Message<"domain.subscription.v1.ListProductPricePlansResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.ProductPricePlan data = 1;
     */
    data: ProductPricePlan[];
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
 * Describes the message domain.subscription.v1.ListProductPricePlansResponse.
 * Use `create(ListProductPricePlansResponseSchema)` to create a new message.
 */
export declare const ListProductPricePlansResponseSchema: GenMessage<ListProductPricePlansResponse>;
/**
 * @generated from message domain.subscription.v1.GetProductPricePlanListPageDataRequest
 */
export type GetProductPricePlanListPageDataRequest = Message<"domain.subscription.v1.GetProductPricePlanListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetProductPricePlanListPageDataRequest.
 * Use `create(GetProductPricePlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductPricePlanListPageDataRequestSchema: GenMessage<GetProductPricePlanListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetProductPricePlanListPageDataResponse
 */
export type GetProductPricePlanListPageDataResponse = Message<"domain.subscription.v1.GetProductPricePlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.ProductPricePlan product_price_plan_list = 1;
     */
    productPricePlanList: ProductPricePlan[];
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
 * Describes the message domain.subscription.v1.GetProductPricePlanListPageDataResponse.
 * Use `create(GetProductPricePlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductPricePlanListPageDataResponseSchema: GenMessage<GetProductPricePlanListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetProductPricePlanItemPageDataRequest
 */
export type GetProductPricePlanItemPageDataRequest = Message<"domain.subscription.v1.GetProductPricePlanItemPageDataRequest"> & {
    /**
     * @generated from field: string product_price_plan_id = 1;
     */
    productPricePlanId: string;
};
/**
 * Describes the message domain.subscription.v1.GetProductPricePlanItemPageDataRequest.
 * Use `create(GetProductPricePlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductPricePlanItemPageDataRequestSchema: GenMessage<GetProductPricePlanItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetProductPricePlanItemPageDataResponse
 */
export type GetProductPricePlanItemPageDataResponse = Message<"domain.subscription.v1.GetProductPricePlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.ProductPricePlan product_price_plan = 1;
     */
    productPricePlan?: ProductPricePlan;
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
 * Describes the message domain.subscription.v1.GetProductPricePlanItemPageDataResponse.
 * Use `create(GetProductPricePlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductPricePlanItemPageDataResponseSchema: GenMessage<GetProductPricePlanItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.ProductPricePlanDomainService
 */
export declare const ProductPricePlanDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.CreateProductPricePlan
     */
    createProductPricePlan: {
        methodKind: "unary";
        input: typeof CreateProductPricePlanRequestSchema;
        output: typeof CreateProductPricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.ReadProductPricePlan
     */
    readProductPricePlan: {
        methodKind: "unary";
        input: typeof ReadProductPricePlanRequestSchema;
        output: typeof ReadProductPricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.UpdateProductPricePlan
     */
    updateProductPricePlan: {
        methodKind: "unary";
        input: typeof UpdateProductPricePlanRequestSchema;
        output: typeof UpdateProductPricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.DeleteProductPricePlan
     */
    deleteProductPricePlan: {
        methodKind: "unary";
        input: typeof DeleteProductPricePlanRequestSchema;
        output: typeof DeleteProductPricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.ListProductPricePlans
     */
    listProductPricePlans: {
        methodKind: "unary";
        input: typeof ListProductPricePlansRequestSchema;
        output: typeof ListProductPricePlansResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.GetProductPricePlanListPageData
     */
    getProductPricePlanListPageData: {
        methodKind: "unary";
        input: typeof GetProductPricePlanListPageDataRequestSchema;
        output: typeof GetProductPricePlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.ProductPricePlanDomainService.GetProductPricePlanItemPageData
     */
    getProductPricePlanItemPageData: {
        methodKind: "unary";
        input: typeof GetProductPricePlanItemPageDataRequestSchema;
        output: typeof GetProductPricePlanItemPageDataResponseSchema;
    };
}>;
