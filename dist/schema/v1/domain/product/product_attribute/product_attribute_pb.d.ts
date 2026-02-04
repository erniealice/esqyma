import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../product/product_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_attribute/product_attribute.proto.
 */
export declare const file_domain_product_product_attribute_product_attribute: GenFile;
/**
 * @generated from message domain.product.v1.ProductAttribute
 */
export type ProductAttribute = Message<"domain.product.v1.ProductAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string product_id = 2;
     */
    productId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.product.v1.Product product = 5;
     */
    product?: Product;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
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
};
/**
 * Describes the message domain.product.v1.ProductAttribute.
 * Use `create(ProductAttributeSchema)` to create a new message.
 */
export declare const ProductAttributeSchema: GenMessage<ProductAttribute>;
/**
 * @generated from message domain.product.v1.CreateProductAttributeRequest
 */
export type CreateProductAttributeRequest = Message<"domain.product.v1.CreateProductAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductAttribute data = 1;
     */
    data?: ProductAttribute;
};
/**
 * Describes the message domain.product.v1.CreateProductAttributeRequest.
 * Use `create(CreateProductAttributeRequestSchema)` to create a new message.
 */
export declare const CreateProductAttributeRequestSchema: GenMessage<CreateProductAttributeRequest>;
/**
 * @generated from message domain.product.v1.CreateProductAttributeResponse
 */
export type CreateProductAttributeResponse = Message<"domain.product.v1.CreateProductAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductAttribute data = 1;
     */
    data: ProductAttribute[];
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
 * Describes the message domain.product.v1.CreateProductAttributeResponse.
 * Use `create(CreateProductAttributeResponseSchema)` to create a new message.
 */
export declare const CreateProductAttributeResponseSchema: GenMessage<CreateProductAttributeResponse>;
/**
 * @generated from message domain.product.v1.ReadProductAttributeRequest
 */
export type ReadProductAttributeRequest = Message<"domain.product.v1.ReadProductAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductAttribute data = 1;
     */
    data?: ProductAttribute;
};
/**
 * Describes the message domain.product.v1.ReadProductAttributeRequest.
 * Use `create(ReadProductAttributeRequestSchema)` to create a new message.
 */
export declare const ReadProductAttributeRequestSchema: GenMessage<ReadProductAttributeRequest>;
/**
 * @generated from message domain.product.v1.ReadProductAttributeResponse
 */
export type ReadProductAttributeResponse = Message<"domain.product.v1.ReadProductAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductAttribute data = 1;
     */
    data: ProductAttribute[];
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
 * Describes the message domain.product.v1.ReadProductAttributeResponse.
 * Use `create(ReadProductAttributeResponseSchema)` to create a new message.
 */
export declare const ReadProductAttributeResponseSchema: GenMessage<ReadProductAttributeResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductAttributeRequest
 */
export type UpdateProductAttributeRequest = Message<"domain.product.v1.UpdateProductAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductAttribute data = 1;
     */
    data?: ProductAttribute;
};
/**
 * Describes the message domain.product.v1.UpdateProductAttributeRequest.
 * Use `create(UpdateProductAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateProductAttributeRequestSchema: GenMessage<UpdateProductAttributeRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductAttributeResponse
 */
export type UpdateProductAttributeResponse = Message<"domain.product.v1.UpdateProductAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductAttribute data = 1;
     */
    data: ProductAttribute[];
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
 * Describes the message domain.product.v1.UpdateProductAttributeResponse.
 * Use `create(UpdateProductAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateProductAttributeResponseSchema: GenMessage<UpdateProductAttributeResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductAttributeRequest
 */
export type DeleteProductAttributeRequest = Message<"domain.product.v1.DeleteProductAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductAttribute data = 1;
     */
    data?: ProductAttribute;
};
/**
 * Describes the message domain.product.v1.DeleteProductAttributeRequest.
 * Use `create(DeleteProductAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteProductAttributeRequestSchema: GenMessage<DeleteProductAttributeRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductAttributeResponse
 */
export type DeleteProductAttributeResponse = Message<"domain.product.v1.DeleteProductAttributeResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductAttributeResponse.
 * Use `create(DeleteProductAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteProductAttributeResponseSchema: GenMessage<DeleteProductAttributeResponse>;
/**
 * @generated from message domain.product.v1.ListProductAttributesRequest
 */
export type ListProductAttributesRequest = Message<"domain.product.v1.ListProductAttributesRequest"> & {
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
 * Describes the message domain.product.v1.ListProductAttributesRequest.
 * Use `create(ListProductAttributesRequestSchema)` to create a new message.
 */
export declare const ListProductAttributesRequestSchema: GenMessage<ListProductAttributesRequest>;
/**
 * @generated from message domain.product.v1.ListProductAttributesResponse
 */
export type ListProductAttributesResponse = Message<"domain.product.v1.ListProductAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductAttribute data = 1;
     */
    data: ProductAttribute[];
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
 * Describes the message domain.product.v1.ListProductAttributesResponse.
 * Use `create(ListProductAttributesResponseSchema)` to create a new message.
 */
export declare const ListProductAttributesResponseSchema: GenMessage<ListProductAttributesResponse>;
/**
 * @generated from message domain.product.v1.GetProductAttributeListPageDataRequest
 */
export type GetProductAttributeListPageDataRequest = Message<"domain.product.v1.GetProductAttributeListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductAttributeListPageDataRequest.
 * Use `create(GetProductAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductAttributeListPageDataRequestSchema: GenMessage<GetProductAttributeListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductAttributeListPageDataResponse
 */
export type GetProductAttributeListPageDataResponse = Message<"domain.product.v1.GetProductAttributeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductAttribute product_attribute_list = 1;
     */
    productAttributeList: ProductAttribute[];
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
 * Describes the message domain.product.v1.GetProductAttributeListPageDataResponse.
 * Use `create(GetProductAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductAttributeListPageDataResponseSchema: GenMessage<GetProductAttributeListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductAttributeItemPageDataRequest
 */
export type GetProductAttributeItemPageDataRequest = Message<"domain.product.v1.GetProductAttributeItemPageDataRequest"> & {
    /**
     * @generated from field: string product_attribute_id = 1;
     */
    productAttributeId: string;
};
/**
 * Describes the message domain.product.v1.GetProductAttributeItemPageDataRequest.
 * Use `create(GetProductAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductAttributeItemPageDataRequestSchema: GenMessage<GetProductAttributeItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductAttributeItemPageDataResponse
 */
export type GetProductAttributeItemPageDataResponse = Message<"domain.product.v1.GetProductAttributeItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductAttribute product_attribute = 1;
     */
    productAttribute?: ProductAttribute;
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
 * Describes the message domain.product.v1.GetProductAttributeItemPageDataResponse.
 * Use `create(GetProductAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductAttributeItemPageDataResponseSchema: GenMessage<GetProductAttributeItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductAttributeDomainService
 */
export declare const ProductAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.CreateProductAttribute
     */
    createProductAttribute: {
        methodKind: "unary";
        input: typeof CreateProductAttributeRequestSchema;
        output: typeof CreateProductAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.ReadProductAttribute
     */
    readProductAttribute: {
        methodKind: "unary";
        input: typeof ReadProductAttributeRequestSchema;
        output: typeof ReadProductAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.UpdateProductAttribute
     */
    updateProductAttribute: {
        methodKind: "unary";
        input: typeof UpdateProductAttributeRequestSchema;
        output: typeof UpdateProductAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.DeleteProductAttribute
     */
    deleteProductAttribute: {
        methodKind: "unary";
        input: typeof DeleteProductAttributeRequestSchema;
        output: typeof DeleteProductAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.ListProductAttributes
     */
    listProductAttributes: {
        methodKind: "unary";
        input: typeof ListProductAttributesRequestSchema;
        output: typeof ListProductAttributesResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.GetProductAttributeListPageData
     */
    getProductAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetProductAttributeListPageDataRequestSchema;
        output: typeof GetProductAttributeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductAttributeDomainService.GetProductAttributeItemPageData
     */
    getProductAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetProductAttributeItemPageDataRequestSchema;
        output: typeof GetProductAttributeItemPageDataResponseSchema;
    };
}>;
