import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_option/product_option.proto.
 */
export declare const file_domain_product_product_option_product_option: GenFile;
/**
 * @generated from message domain.product.v1.ProductOption
 */
export type ProductOption = Message<"domain.product.v1.ProductOption"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string product_id = 2;
     */
    productId: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: string code = 4;
     */
    code: string;
    /**
     * @generated from field: string data_type = 5;
     */
    dataType: string;
    /**
     * @generated from field: int32 sort_order = 6;
     */
    sortOrder: number;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 10;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 11;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: domain.product.v1.Product product = 12;
     */
    product?: Product;
    /**
     * @generated from field: optional double min_value = 13;
     */
    minValue?: number;
    /**
     * @generated from field: optional double max_value = 14;
     */
    maxValue?: number;
    /**
     * @generated from field: bool required = 15;
     */
    required: boolean;
};
/**
 * Describes the message domain.product.v1.ProductOption.
 * Use `create(ProductOptionSchema)` to create a new message.
 */
export declare const ProductOptionSchema: GenMessage<ProductOption>;
/**
 * @generated from message domain.product.v1.CreateProductOptionRequest
 */
export type CreateProductOptionRequest = Message<"domain.product.v1.CreateProductOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOption data = 1;
     */
    data?: ProductOption;
};
/**
 * Describes the message domain.product.v1.CreateProductOptionRequest.
 * Use `create(CreateProductOptionRequestSchema)` to create a new message.
 */
export declare const CreateProductOptionRequestSchema: GenMessage<CreateProductOptionRequest>;
/**
 * @generated from message domain.product.v1.CreateProductOptionResponse
 */
export type CreateProductOptionResponse = Message<"domain.product.v1.CreateProductOptionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOption data = 1;
     */
    data: ProductOption[];
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
 * Describes the message domain.product.v1.CreateProductOptionResponse.
 * Use `create(CreateProductOptionResponseSchema)` to create a new message.
 */
export declare const CreateProductOptionResponseSchema: GenMessage<CreateProductOptionResponse>;
/**
 * @generated from message domain.product.v1.ReadProductOptionRequest
 */
export type ReadProductOptionRequest = Message<"domain.product.v1.ReadProductOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOption data = 1;
     */
    data?: ProductOption;
};
/**
 * Describes the message domain.product.v1.ReadProductOptionRequest.
 * Use `create(ReadProductOptionRequestSchema)` to create a new message.
 */
export declare const ReadProductOptionRequestSchema: GenMessage<ReadProductOptionRequest>;
/**
 * @generated from message domain.product.v1.ReadProductOptionResponse
 */
export type ReadProductOptionResponse = Message<"domain.product.v1.ReadProductOptionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOption data = 1;
     */
    data: ProductOption[];
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
 * Describes the message domain.product.v1.ReadProductOptionResponse.
 * Use `create(ReadProductOptionResponseSchema)` to create a new message.
 */
export declare const ReadProductOptionResponseSchema: GenMessage<ReadProductOptionResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductOptionRequest
 */
export type UpdateProductOptionRequest = Message<"domain.product.v1.UpdateProductOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOption data = 1;
     */
    data?: ProductOption;
};
/**
 * Describes the message domain.product.v1.UpdateProductOptionRequest.
 * Use `create(UpdateProductOptionRequestSchema)` to create a new message.
 */
export declare const UpdateProductOptionRequestSchema: GenMessage<UpdateProductOptionRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductOptionResponse
 */
export type UpdateProductOptionResponse = Message<"domain.product.v1.UpdateProductOptionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOption data = 1;
     */
    data: ProductOption[];
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
 * Describes the message domain.product.v1.UpdateProductOptionResponse.
 * Use `create(UpdateProductOptionResponseSchema)` to create a new message.
 */
export declare const UpdateProductOptionResponseSchema: GenMessage<UpdateProductOptionResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductOptionRequest
 */
export type DeleteProductOptionRequest = Message<"domain.product.v1.DeleteProductOptionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOption data = 1;
     */
    data?: ProductOption;
};
/**
 * Describes the message domain.product.v1.DeleteProductOptionRequest.
 * Use `create(DeleteProductOptionRequestSchema)` to create a new message.
 */
export declare const DeleteProductOptionRequestSchema: GenMessage<DeleteProductOptionRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductOptionResponse
 */
export type DeleteProductOptionResponse = Message<"domain.product.v1.DeleteProductOptionResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductOptionResponse.
 * Use `create(DeleteProductOptionResponseSchema)` to create a new message.
 */
export declare const DeleteProductOptionResponseSchema: GenMessage<DeleteProductOptionResponse>;
/**
 * @generated from message domain.product.v1.ListProductOptionsRequest
 */
export type ListProductOptionsRequest = Message<"domain.product.v1.ListProductOptionsRequest"> & {
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
 * Describes the message domain.product.v1.ListProductOptionsRequest.
 * Use `create(ListProductOptionsRequestSchema)` to create a new message.
 */
export declare const ListProductOptionsRequestSchema: GenMessage<ListProductOptionsRequest>;
/**
 * @generated from message domain.product.v1.ListProductOptionsResponse
 */
export type ListProductOptionsResponse = Message<"domain.product.v1.ListProductOptionsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOption data = 1;
     */
    data: ProductOption[];
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
 * Describes the message domain.product.v1.ListProductOptionsResponse.
 * Use `create(ListProductOptionsResponseSchema)` to create a new message.
 */
export declare const ListProductOptionsResponseSchema: GenMessage<ListProductOptionsResponse>;
/**
 * @generated from message domain.product.v1.GetProductOptionListPageDataRequest
 */
export type GetProductOptionListPageDataRequest = Message<"domain.product.v1.GetProductOptionListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductOptionListPageDataRequest.
 * Use `create(GetProductOptionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductOptionListPageDataRequestSchema: GenMessage<GetProductOptionListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductOptionListPageDataResponse
 */
export type GetProductOptionListPageDataResponse = Message<"domain.product.v1.GetProductOptionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOption product_option_list = 1;
     */
    productOptionList: ProductOption[];
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
 * Describes the message domain.product.v1.GetProductOptionListPageDataResponse.
 * Use `create(GetProductOptionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductOptionListPageDataResponseSchema: GenMessage<GetProductOptionListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductOptionItemPageDataRequest
 */
export type GetProductOptionItemPageDataRequest = Message<"domain.product.v1.GetProductOptionItemPageDataRequest"> & {
    /**
     * @generated from field: string product_option_id = 1;
     */
    productOptionId: string;
};
/**
 * Describes the message domain.product.v1.GetProductOptionItemPageDataRequest.
 * Use `create(GetProductOptionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductOptionItemPageDataRequestSchema: GenMessage<GetProductOptionItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductOptionItemPageDataResponse
 */
export type GetProductOptionItemPageDataResponse = Message<"domain.product.v1.GetProductOptionItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductOption product_option = 1;
     */
    productOption?: ProductOption;
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
 * Describes the message domain.product.v1.GetProductOptionItemPageDataResponse.
 * Use `create(GetProductOptionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductOptionItemPageDataResponseSchema: GenMessage<GetProductOptionItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductOptionDomainService
 */
export declare const ProductOptionDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.CreateProductOption
     */
    createProductOption: {
        methodKind: "unary";
        input: typeof CreateProductOptionRequestSchema;
        output: typeof CreateProductOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.ReadProductOption
     */
    readProductOption: {
        methodKind: "unary";
        input: typeof ReadProductOptionRequestSchema;
        output: typeof ReadProductOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.UpdateProductOption
     */
    updateProductOption: {
        methodKind: "unary";
        input: typeof UpdateProductOptionRequestSchema;
        output: typeof UpdateProductOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.DeleteProductOption
     */
    deleteProductOption: {
        methodKind: "unary";
        input: typeof DeleteProductOptionRequestSchema;
        output: typeof DeleteProductOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.ListProductOptions
     */
    listProductOptions: {
        methodKind: "unary";
        input: typeof ListProductOptionsRequestSchema;
        output: typeof ListProductOptionsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.GetProductOptionListPageData
     */
    getProductOptionListPageData: {
        methodKind: "unary";
        input: typeof GetProductOptionListPageDataRequestSchema;
        output: typeof GetProductOptionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionDomainService.GetProductOptionItemPageData
     */
    getProductOptionItemPageData: {
        methodKind: "unary";
        input: typeof GetProductOptionItemPageDataRequestSchema;
        output: typeof GetProductOptionItemPageDataResponseSchema;
    };
}>;
