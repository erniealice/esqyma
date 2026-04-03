import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { ProductCollection } from "../product_collection/product_collection_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product/product.proto.
 */
export declare const file_domain_product_product_product: GenFile;
/**
 * FK References: revenue_line_item.product_id, price_product.product_id,
 * inventory_item.product_id, product_option.product_id,
 * product_variant.product_id, resource.product_id
 *
 * @generated from message domain.product.v1.Product
 */
export type Product = Message<"domain.product.v1.Product"> & {
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
     * @generated from field: double price = 9;
     */
    price: number;
    /**
     * @generated from field: string currency = 10;
     */
    currency: string;
    /**
     * @generated from field: repeated domain.product.v1.ProductCollection product_collections = 11;
     */
    productCollections: ProductCollection[];
    /**
     * "serialized", "non_serialized", "consumable"
     *
     * @generated from field: string item_type = 12;
     */
    itemType: string;
    /**
     * Determines how this product reaches the client. Defaults to 'physical' for backward compatibility.
     * Valid values: "physical", "service", "digital", "make_to_order"
     *
     * @generated from field: string fulfillment_method = 13;
     */
    fulfillmentMethod: string;
};
/**
 * Describes the message domain.product.v1.Product.
 * Use `create(ProductSchema)` to create a new message.
 */
export declare const ProductSchema: GenMessage<Product>;
/**
 * @generated from message domain.product.v1.CreateProductRequest
 */
export type CreateProductRequest = Message<"domain.product.v1.CreateProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.Product data = 1;
     */
    data?: Product;
};
/**
 * Describes the message domain.product.v1.CreateProductRequest.
 * Use `create(CreateProductRequestSchema)` to create a new message.
 */
export declare const CreateProductRequestSchema: GenMessage<CreateProductRequest>;
/**
 * @generated from message domain.product.v1.CreateProductResponse
 */
export type CreateProductResponse = Message<"domain.product.v1.CreateProductResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Product data = 1;
     */
    data: Product[];
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
 * Describes the message domain.product.v1.CreateProductResponse.
 * Use `create(CreateProductResponseSchema)` to create a new message.
 */
export declare const CreateProductResponseSchema: GenMessage<CreateProductResponse>;
/**
 * @generated from message domain.product.v1.ReadProductRequest
 */
export type ReadProductRequest = Message<"domain.product.v1.ReadProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.Product data = 1;
     */
    data?: Product;
};
/**
 * Describes the message domain.product.v1.ReadProductRequest.
 * Use `create(ReadProductRequestSchema)` to create a new message.
 */
export declare const ReadProductRequestSchema: GenMessage<ReadProductRequest>;
/**
 * @generated from message domain.product.v1.ReadProductResponse
 */
export type ReadProductResponse = Message<"domain.product.v1.ReadProductResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Product data = 1;
     */
    data: Product[];
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
 * Describes the message domain.product.v1.ReadProductResponse.
 * Use `create(ReadProductResponseSchema)` to create a new message.
 */
export declare const ReadProductResponseSchema: GenMessage<ReadProductResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductRequest
 */
export type UpdateProductRequest = Message<"domain.product.v1.UpdateProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.Product data = 1;
     */
    data?: Product;
};
/**
 * Describes the message domain.product.v1.UpdateProductRequest.
 * Use `create(UpdateProductRequestSchema)` to create a new message.
 */
export declare const UpdateProductRequestSchema: GenMessage<UpdateProductRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductResponse
 */
export type UpdateProductResponse = Message<"domain.product.v1.UpdateProductResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Product data = 1;
     */
    data: Product[];
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
 * Describes the message domain.product.v1.UpdateProductResponse.
 * Use `create(UpdateProductResponseSchema)` to create a new message.
 */
export declare const UpdateProductResponseSchema: GenMessage<UpdateProductResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductRequest
 */
export type DeleteProductRequest = Message<"domain.product.v1.DeleteProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.Product data = 1;
     */
    data?: Product;
};
/**
 * Describes the message domain.product.v1.DeleteProductRequest.
 * Use `create(DeleteProductRequestSchema)` to create a new message.
 */
export declare const DeleteProductRequestSchema: GenMessage<DeleteProductRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductResponse
 */
export type DeleteProductResponse = Message<"domain.product.v1.DeleteProductResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductResponse.
 * Use `create(DeleteProductResponseSchema)` to create a new message.
 */
export declare const DeleteProductResponseSchema: GenMessage<DeleteProductResponse>;
/**
 * @generated from message domain.product.v1.ListProductsRequest
 */
export type ListProductsRequest = Message<"domain.product.v1.ListProductsRequest"> & {
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
 * Describes the message domain.product.v1.ListProductsRequest.
 * Use `create(ListProductsRequestSchema)` to create a new message.
 */
export declare const ListProductsRequestSchema: GenMessage<ListProductsRequest>;
/**
 * @generated from message domain.product.v1.ListProductsResponse
 */
export type ListProductsResponse = Message<"domain.product.v1.ListProductsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Product data = 1;
     */
    data: Product[];
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
 * Describes the message domain.product.v1.ListProductsResponse.
 * Use `create(ListProductsResponseSchema)` to create a new message.
 */
export declare const ListProductsResponseSchema: GenMessage<ListProductsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.product.v1.GetProductListPageDataRequest
 */
export type GetProductListPageDataRequest = Message<"domain.product.v1.GetProductListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.product.v1.GetProductListPageDataRequest.
 * Use `create(GetProductListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductListPageDataRequestSchema: GenMessage<GetProductListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.product.v1.GetProductListPageDataResponse
 */
export type GetProductListPageDataResponse = Message<"domain.product.v1.GetProductListPageDataResponse"> & {
    /**
     * The product data
     *
     * @generated from field: repeated domain.product.v1.Product product_list = 1;
     */
    productList: Product[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.product.v1.GetProductListPageDataResponse.
 * Use `create(GetProductListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductListPageDataResponseSchema: GenMessage<GetProductListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.product.v1.GetProductItemPageDataRequest
 */
export type GetProductItemPageDataRequest = Message<"domain.product.v1.GetProductItemPageDataRequest"> & {
    /**
     * The product ID to retrieve
     *
     * @generated from field: string product_id = 1;
     */
    productId: string;
};
/**
 * Describes the message domain.product.v1.GetProductItemPageDataRequest.
 * Use `create(GetProductItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductItemPageDataRequestSchema: GenMessage<GetProductItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.product.v1.GetProductItemPageDataResponse
 */
export type GetProductItemPageDataResponse = Message<"domain.product.v1.GetProductItemPageDataResponse"> & {
    /**
     * The product data
     *
     * @generated from field: domain.product.v1.Product product = 1;
     */
    product?: Product;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.product.v1.GetProductItemPageDataResponse.
 * Use `create(GetProductItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductItemPageDataResponseSchema: GenMessage<GetProductItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductDomainService
 */
export declare const ProductDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductDomainService.CreateProduct
     */
    createProduct: {
        methodKind: "unary";
        input: typeof CreateProductRequestSchema;
        output: typeof CreateProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductDomainService.ReadProduct
     */
    readProduct: {
        methodKind: "unary";
        input: typeof ReadProductRequestSchema;
        output: typeof ReadProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductDomainService.UpdateProduct
     */
    updateProduct: {
        methodKind: "unary";
        input: typeof UpdateProductRequestSchema;
        output: typeof UpdateProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductDomainService.DeleteProduct
     */
    deleteProduct: {
        methodKind: "unary";
        input: typeof DeleteProductRequestSchema;
        output: typeof DeleteProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductDomainService.ListProducts
     */
    listProducts: {
        methodKind: "unary";
        input: typeof ListProductsRequestSchema;
        output: typeof ListProductsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.product.v1.ProductDomainService.GetProductListPageData
     */
    getProductListPageData: {
        methodKind: "unary";
        input: typeof GetProductListPageDataRequestSchema;
        output: typeof GetProductListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.product.v1.ProductDomainService.GetProductItemPageData
     */
    getProductItemPageData: {
        methodKind: "unary";
        input: typeof GetProductItemPageDataRequestSchema;
        output: typeof GetProductItemPageDataResponseSchema;
    };
}>;
