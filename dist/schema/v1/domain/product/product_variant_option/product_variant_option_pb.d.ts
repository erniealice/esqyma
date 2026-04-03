import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { ProductVariant } from "../product_variant/product_variant_pb";
import type { ProductOptionValue } from "../product_option_value/product_option_value_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_variant_option/product_variant_option.proto.
 */
export declare const file_domain_product_product_variant_option_product_variant_option: GenFile;
/**
 * @generated from message domain.product.v1.ProductVariantOption
 */
export type ProductVariantOption = Message<"domain.product.v1.ProductVariantOption"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string product_variant_id = 2;
     */
    productVariantId: string;
    /**
     * @generated from field: string product_option_value_id = 3;
     */
    productOptionValueId: string;
    /**
     * @generated from field: bool active = 4;
     */
    active: boolean;
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
     * @generated from field: domain.product.v1.ProductVariant product_variant = 9;
     */
    productVariant?: ProductVariant;
    /**
     * @generated from field: domain.product.v1.ProductOptionValue product_option_value = 10;
     */
    productOptionValue?: ProductOptionValue;
};
/**
 * Describes the message domain.product.v1.ProductVariantOption.
 * Use `create(ProductVariantOptionSchema)` to create a new message.
 */
export declare const ProductVariantOptionSchema: GenMessage<ProductVariantOption>;
/**
 * @generated from message domain.product.v1.CreateProductVariantOptionRequest
 */
export type CreateProductVariantOptionRequest = Message<"domain.product.v1.CreateProductVariantOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantOption data = 1;
     */
    data?: ProductVariantOption;
};
/**
 * Describes the message domain.product.v1.CreateProductVariantOptionRequest.
 * Use `create(CreateProductVariantOptionRequestSchema)` to create a new message.
 */
export declare const CreateProductVariantOptionRequestSchema: GenMessage<CreateProductVariantOptionRequest>;
/**
 * @generated from message domain.product.v1.CreateProductVariantOptionResponse
 */
export type CreateProductVariantOptionResponse = Message<"domain.product.v1.CreateProductVariantOptionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantOption data = 1;
     */
    data: ProductVariantOption[];
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
 * Describes the message domain.product.v1.CreateProductVariantOptionResponse.
 * Use `create(CreateProductVariantOptionResponseSchema)` to create a new message.
 */
export declare const CreateProductVariantOptionResponseSchema: GenMessage<CreateProductVariantOptionResponse>;
/**
 * @generated from message domain.product.v1.ReadProductVariantOptionRequest
 */
export type ReadProductVariantOptionRequest = Message<"domain.product.v1.ReadProductVariantOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantOption data = 1;
     */
    data?: ProductVariantOption;
};
/**
 * Describes the message domain.product.v1.ReadProductVariantOptionRequest.
 * Use `create(ReadProductVariantOptionRequestSchema)` to create a new message.
 */
export declare const ReadProductVariantOptionRequestSchema: GenMessage<ReadProductVariantOptionRequest>;
/**
 * @generated from message domain.product.v1.ReadProductVariantOptionResponse
 */
export type ReadProductVariantOptionResponse = Message<"domain.product.v1.ReadProductVariantOptionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantOption data = 1;
     */
    data: ProductVariantOption[];
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
 * Describes the message domain.product.v1.ReadProductVariantOptionResponse.
 * Use `create(ReadProductVariantOptionResponseSchema)` to create a new message.
 */
export declare const ReadProductVariantOptionResponseSchema: GenMessage<ReadProductVariantOptionResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductVariantOptionRequest
 */
export type UpdateProductVariantOptionRequest = Message<"domain.product.v1.UpdateProductVariantOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantOption data = 1;
     */
    data?: ProductVariantOption;
};
/**
 * Describes the message domain.product.v1.UpdateProductVariantOptionRequest.
 * Use `create(UpdateProductVariantOptionRequestSchema)` to create a new message.
 */
export declare const UpdateProductVariantOptionRequestSchema: GenMessage<UpdateProductVariantOptionRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductVariantOptionResponse
 */
export type UpdateProductVariantOptionResponse = Message<"domain.product.v1.UpdateProductVariantOptionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantOption data = 1;
     */
    data: ProductVariantOption[];
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
 * Describes the message domain.product.v1.UpdateProductVariantOptionResponse.
 * Use `create(UpdateProductVariantOptionResponseSchema)` to create a new message.
 */
export declare const UpdateProductVariantOptionResponseSchema: GenMessage<UpdateProductVariantOptionResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductVariantOptionRequest
 */
export type DeleteProductVariantOptionRequest = Message<"domain.product.v1.DeleteProductVariantOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantOption data = 1;
     */
    data?: ProductVariantOption;
};
/**
 * Describes the message domain.product.v1.DeleteProductVariantOptionRequest.
 * Use `create(DeleteProductVariantOptionRequestSchema)` to create a new message.
 */
export declare const DeleteProductVariantOptionRequestSchema: GenMessage<DeleteProductVariantOptionRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductVariantOptionResponse
 */
export type DeleteProductVariantOptionResponse = Message<"domain.product.v1.DeleteProductVariantOptionResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductVariantOptionResponse.
 * Use `create(DeleteProductVariantOptionResponseSchema)` to create a new message.
 */
export declare const DeleteProductVariantOptionResponseSchema: GenMessage<DeleteProductVariantOptionResponse>;
/**
 * @generated from message domain.product.v1.ListProductVariantOptionsRequest
 */
export type ListProductVariantOptionsRequest = Message<"domain.product.v1.ListProductVariantOptionsRequest"> & {
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
 * Describes the message domain.product.v1.ListProductVariantOptionsRequest.
 * Use `create(ListProductVariantOptionsRequestSchema)` to create a new message.
 */
export declare const ListProductVariantOptionsRequestSchema: GenMessage<ListProductVariantOptionsRequest>;
/**
 * @generated from message domain.product.v1.ListProductVariantOptionsResponse
 */
export type ListProductVariantOptionsResponse = Message<"domain.product.v1.ListProductVariantOptionsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantOption data = 1;
     */
    data: ProductVariantOption[];
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
 * Describes the message domain.product.v1.ListProductVariantOptionsResponse.
 * Use `create(ListProductVariantOptionsResponseSchema)` to create a new message.
 */
export declare const ListProductVariantOptionsResponseSchema: GenMessage<ListProductVariantOptionsResponse>;
/**
 * @generated from message domain.product.v1.GetProductVariantOptionListPageDataRequest
 */
export type GetProductVariantOptionListPageDataRequest = Message<"domain.product.v1.GetProductVariantOptionListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductVariantOptionListPageDataRequest.
 * Use `create(GetProductVariantOptionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductVariantOptionListPageDataRequestSchema: GenMessage<GetProductVariantOptionListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductVariantOptionListPageDataResponse
 */
export type GetProductVariantOptionListPageDataResponse = Message<"domain.product.v1.GetProductVariantOptionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantOption product_variant_option_list = 1;
     */
    productVariantOptionList: ProductVariantOption[];
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
 * Describes the message domain.product.v1.GetProductVariantOptionListPageDataResponse.
 * Use `create(GetProductVariantOptionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductVariantOptionListPageDataResponseSchema: GenMessage<GetProductVariantOptionListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductVariantOptionItemPageDataRequest
 */
export type GetProductVariantOptionItemPageDataRequest = Message<"domain.product.v1.GetProductVariantOptionItemPageDataRequest"> & {
    /**
     * @generated from field: string product_variant_option_id = 1;
     */
    productVariantOptionId: string;
};
/**
 * Describes the message domain.product.v1.GetProductVariantOptionItemPageDataRequest.
 * Use `create(GetProductVariantOptionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductVariantOptionItemPageDataRequestSchema: GenMessage<GetProductVariantOptionItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductVariantOptionItemPageDataResponse
 */
export type GetProductVariantOptionItemPageDataResponse = Message<"domain.product.v1.GetProductVariantOptionItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantOption product_variant_option = 1;
     */
    productVariantOption?: ProductVariantOption;
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
 * Describes the message domain.product.v1.GetProductVariantOptionItemPageDataResponse.
 * Use `create(GetProductVariantOptionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductVariantOptionItemPageDataResponseSchema: GenMessage<GetProductVariantOptionItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductVariantOptionDomainService
 */
export declare const ProductVariantOptionDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.CreateProductVariantOption
     */
    createProductVariantOption: {
        methodKind: "unary";
        input: typeof CreateProductVariantOptionRequestSchema;
        output: typeof CreateProductVariantOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.ReadProductVariantOption
     */
    readProductVariantOption: {
        methodKind: "unary";
        input: typeof ReadProductVariantOptionRequestSchema;
        output: typeof ReadProductVariantOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.UpdateProductVariantOption
     */
    updateProductVariantOption: {
        methodKind: "unary";
        input: typeof UpdateProductVariantOptionRequestSchema;
        output: typeof UpdateProductVariantOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.DeleteProductVariantOption
     */
    deleteProductVariantOption: {
        methodKind: "unary";
        input: typeof DeleteProductVariantOptionRequestSchema;
        output: typeof DeleteProductVariantOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.ListProductVariantOptions
     */
    listProductVariantOptions: {
        methodKind: "unary";
        input: typeof ListProductVariantOptionsRequestSchema;
        output: typeof ListProductVariantOptionsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.GetProductVariantOptionListPageData
     */
    getProductVariantOptionListPageData: {
        methodKind: "unary";
        input: typeof GetProductVariantOptionListPageDataRequestSchema;
        output: typeof GetProductVariantOptionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantOptionDomainService.GetProductVariantOptionItemPageData
     */
    getProductVariantOptionItemPageData: {
        methodKind: "unary";
        input: typeof GetProductVariantOptionItemPageDataRequestSchema;
        output: typeof GetProductVariantOptionItemPageDataResponseSchema;
    };
}>;
