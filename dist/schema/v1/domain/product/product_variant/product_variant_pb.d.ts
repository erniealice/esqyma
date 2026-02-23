import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_variant/product_variant.proto.
 */
export declare const file_domain_product_product_variant_product_variant: GenFile;
/**
 * @generated from message domain.product.v1.ProductVariant
 */
export type ProductVariant = Message<"domain.product.v1.ProductVariant"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string product_id = 2;
     */
    productId: string;
    /**
     * @generated from field: string sku = 3;
     */
    sku: string;
    /**
     * @generated from field: double price_override = 4;
     */
    priceOverride: number;
    /**
     * @generated from field: bool active = 5;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: domain.product.v1.Product product = 11;
     */
    product?: Product;
};
/**
 * Describes the message domain.product.v1.ProductVariant.
 * Use `create(ProductVariantSchema)` to create a new message.
 */
export declare const ProductVariantSchema: GenMessage<ProductVariant>;
/**
 * @generated from message domain.product.v1.CreateProductVariantRequest
 */
export type CreateProductVariantRequest = Message<"domain.product.v1.CreateProductVariantRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariant data = 1;
     */
    data?: ProductVariant;
};
/**
 * Describes the message domain.product.v1.CreateProductVariantRequest.
 * Use `create(CreateProductVariantRequestSchema)` to create a new message.
 */
export declare const CreateProductVariantRequestSchema: GenMessage<CreateProductVariantRequest>;
/**
 * @generated from message domain.product.v1.CreateProductVariantResponse
 */
export type CreateProductVariantResponse = Message<"domain.product.v1.CreateProductVariantResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant data = 1;
     */
    data: ProductVariant[];
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
 * Describes the message domain.product.v1.CreateProductVariantResponse.
 * Use `create(CreateProductVariantResponseSchema)` to create a new message.
 */
export declare const CreateProductVariantResponseSchema: GenMessage<CreateProductVariantResponse>;
/**
 * @generated from message domain.product.v1.CreateProductVariantBatchRequest
 */
export type CreateProductVariantBatchRequest = Message<"domain.product.v1.CreateProductVariantBatchRequest"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant data = 1;
     */
    data: ProductVariant[];
};
/**
 * Describes the message domain.product.v1.CreateProductVariantBatchRequest.
 * Use `create(CreateProductVariantBatchRequestSchema)` to create a new message.
 */
export declare const CreateProductVariantBatchRequestSchema: GenMessage<CreateProductVariantBatchRequest>;
/**
 * @generated from message domain.product.v1.CreateProductVariantBatchResponse
 */
export type CreateProductVariantBatchResponse = Message<"domain.product.v1.CreateProductVariantBatchResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant data = 1;
     */
    data: ProductVariant[];
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
 * Describes the message domain.product.v1.CreateProductVariantBatchResponse.
 * Use `create(CreateProductVariantBatchResponseSchema)` to create a new message.
 */
export declare const CreateProductVariantBatchResponseSchema: GenMessage<CreateProductVariantBatchResponse>;
/**
 * @generated from message domain.product.v1.ReadProductVariantRequest
 */
export type ReadProductVariantRequest = Message<"domain.product.v1.ReadProductVariantRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariant data = 1;
     */
    data?: ProductVariant;
};
/**
 * Describes the message domain.product.v1.ReadProductVariantRequest.
 * Use `create(ReadProductVariantRequestSchema)` to create a new message.
 */
export declare const ReadProductVariantRequestSchema: GenMessage<ReadProductVariantRequest>;
/**
 * @generated from message domain.product.v1.ReadProductVariantResponse
 */
export type ReadProductVariantResponse = Message<"domain.product.v1.ReadProductVariantResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant data = 1;
     */
    data: ProductVariant[];
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
 * Describes the message domain.product.v1.ReadProductVariantResponse.
 * Use `create(ReadProductVariantResponseSchema)` to create a new message.
 */
export declare const ReadProductVariantResponseSchema: GenMessage<ReadProductVariantResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductVariantRequest
 */
export type UpdateProductVariantRequest = Message<"domain.product.v1.UpdateProductVariantRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariant data = 1;
     */
    data?: ProductVariant;
};
/**
 * Describes the message domain.product.v1.UpdateProductVariantRequest.
 * Use `create(UpdateProductVariantRequestSchema)` to create a new message.
 */
export declare const UpdateProductVariantRequestSchema: GenMessage<UpdateProductVariantRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductVariantResponse
 */
export type UpdateProductVariantResponse = Message<"domain.product.v1.UpdateProductVariantResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant data = 1;
     */
    data: ProductVariant[];
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
 * Describes the message domain.product.v1.UpdateProductVariantResponse.
 * Use `create(UpdateProductVariantResponseSchema)` to create a new message.
 */
export declare const UpdateProductVariantResponseSchema: GenMessage<UpdateProductVariantResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductVariantRequest
 */
export type DeleteProductVariantRequest = Message<"domain.product.v1.DeleteProductVariantRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariant data = 1;
     */
    data?: ProductVariant;
};
/**
 * Describes the message domain.product.v1.DeleteProductVariantRequest.
 * Use `create(DeleteProductVariantRequestSchema)` to create a new message.
 */
export declare const DeleteProductVariantRequestSchema: GenMessage<DeleteProductVariantRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductVariantResponse
 */
export type DeleteProductVariantResponse = Message<"domain.product.v1.DeleteProductVariantResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductVariantResponse.
 * Use `create(DeleteProductVariantResponseSchema)` to create a new message.
 */
export declare const DeleteProductVariantResponseSchema: GenMessage<DeleteProductVariantResponse>;
/**
 * @generated from message domain.product.v1.ListProductVariantsRequest
 */
export type ListProductVariantsRequest = Message<"domain.product.v1.ListProductVariantsRequest"> & {
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
 * Describes the message domain.product.v1.ListProductVariantsRequest.
 * Use `create(ListProductVariantsRequestSchema)` to create a new message.
 */
export declare const ListProductVariantsRequestSchema: GenMessage<ListProductVariantsRequest>;
/**
 * @generated from message domain.product.v1.ListProductVariantsResponse
 */
export type ListProductVariantsResponse = Message<"domain.product.v1.ListProductVariantsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant data = 1;
     */
    data: ProductVariant[];
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
 * Describes the message domain.product.v1.ListProductVariantsResponse.
 * Use `create(ListProductVariantsResponseSchema)` to create a new message.
 */
export declare const ListProductVariantsResponseSchema: GenMessage<ListProductVariantsResponse>;
/**
 * @generated from message domain.product.v1.GetProductVariantListPageDataRequest
 */
export type GetProductVariantListPageDataRequest = Message<"domain.product.v1.GetProductVariantListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductVariantListPageDataRequest.
 * Use `create(GetProductVariantListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductVariantListPageDataRequestSchema: GenMessage<GetProductVariantListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductVariantListPageDataResponse
 */
export type GetProductVariantListPageDataResponse = Message<"domain.product.v1.GetProductVariantListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariant product_variant_list = 1;
     */
    productVariantList: ProductVariant[];
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
 * Describes the message domain.product.v1.GetProductVariantListPageDataResponse.
 * Use `create(GetProductVariantListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductVariantListPageDataResponseSchema: GenMessage<GetProductVariantListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductVariantItemPageDataRequest
 */
export type GetProductVariantItemPageDataRequest = Message<"domain.product.v1.GetProductVariantItemPageDataRequest"> & {
    /**
     * @generated from field: string product_variant_id = 1;
     */
    productVariantId: string;
};
/**
 * Describes the message domain.product.v1.GetProductVariantItemPageDataRequest.
 * Use `create(GetProductVariantItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductVariantItemPageDataRequestSchema: GenMessage<GetProductVariantItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductVariantItemPageDataResponse
 */
export type GetProductVariantItemPageDataResponse = Message<"domain.product.v1.GetProductVariantItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariant product_variant = 1;
     */
    productVariant?: ProductVariant;
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
 * Describes the message domain.product.v1.GetProductVariantItemPageDataResponse.
 * Use `create(GetProductVariantItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductVariantItemPageDataResponseSchema: GenMessage<GetProductVariantItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductVariantDomainService
 */
export declare const ProductVariantDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.CreateProductVariant
     */
    createProductVariant: {
        methodKind: "unary";
        input: typeof CreateProductVariantRequestSchema;
        output: typeof CreateProductVariantResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.ReadProductVariant
     */
    readProductVariant: {
        methodKind: "unary";
        input: typeof ReadProductVariantRequestSchema;
        output: typeof ReadProductVariantResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.UpdateProductVariant
     */
    updateProductVariant: {
        methodKind: "unary";
        input: typeof UpdateProductVariantRequestSchema;
        output: typeof UpdateProductVariantResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.DeleteProductVariant
     */
    deleteProductVariant: {
        methodKind: "unary";
        input: typeof DeleteProductVariantRequestSchema;
        output: typeof DeleteProductVariantResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.ListProductVariants
     */
    listProductVariants: {
        methodKind: "unary";
        input: typeof ListProductVariantsRequestSchema;
        output: typeof ListProductVariantsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.GetProductVariantListPageData
     */
    getProductVariantListPageData: {
        methodKind: "unary";
        input: typeof GetProductVariantListPageDataRequestSchema;
        output: typeof GetProductVariantListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantDomainService.GetProductVariantItemPageData
     */
    getProductVariantItemPageData: {
        methodKind: "unary";
        input: typeof GetProductVariantItemPageDataRequestSchema;
        output: typeof GetProductVariantItemPageDataResponseSchema;
    };
}>;
