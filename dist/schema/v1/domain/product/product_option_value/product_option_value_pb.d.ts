import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { ProductOption } from "../product_option/product_option_pb";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_option_value/product_option_value.proto.
 */
export declare const file_domain_product_product_option_value_product_option_value: GenFile;
/**
 * @generated from message domain.product.v1.ProductOptionValue
 */
export type ProductOptionValue = Message<"domain.product.v1.ProductOptionValue"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string product_option_id = 2;
     */
    productOptionId: string;
    /**
     * @generated from field: string label = 3;
     */
    label: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: int32 sort_order = 5;
     */
    sortOrder: number;
    /**
     * @generated from field: google.protobuf.Struct metadata = 6;
     */
    metadata?: JsonObject;
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
     * @generated from field: domain.product.v1.ProductOption product_option = 12;
     */
    productOption?: ProductOption;
};
/**
 * Describes the message domain.product.v1.ProductOptionValue.
 * Use `create(ProductOptionValueSchema)` to create a new message.
 */
export declare const ProductOptionValueSchema: GenMessage<ProductOptionValue>;
/**
 * @generated from message domain.product.v1.CreateProductOptionValueRequest
 */
export type CreateProductOptionValueRequest = Message<"domain.product.v1.CreateProductOptionValueRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOptionValue data = 1;
     */
    data?: ProductOptionValue;
};
/**
 * Describes the message domain.product.v1.CreateProductOptionValueRequest.
 * Use `create(CreateProductOptionValueRequestSchema)` to create a new message.
 */
export declare const CreateProductOptionValueRequestSchema: GenMessage<CreateProductOptionValueRequest>;
/**
 * @generated from message domain.product.v1.CreateProductOptionValueResponse
 */
export type CreateProductOptionValueResponse = Message<"domain.product.v1.CreateProductOptionValueResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOptionValue data = 1;
     */
    data: ProductOptionValue[];
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
 * Describes the message domain.product.v1.CreateProductOptionValueResponse.
 * Use `create(CreateProductOptionValueResponseSchema)` to create a new message.
 */
export declare const CreateProductOptionValueResponseSchema: GenMessage<CreateProductOptionValueResponse>;
/**
 * @generated from message domain.product.v1.ReadProductOptionValueRequest
 */
export type ReadProductOptionValueRequest = Message<"domain.product.v1.ReadProductOptionValueRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOptionValue data = 1;
     */
    data?: ProductOptionValue;
};
/**
 * Describes the message domain.product.v1.ReadProductOptionValueRequest.
 * Use `create(ReadProductOptionValueRequestSchema)` to create a new message.
 */
export declare const ReadProductOptionValueRequestSchema: GenMessage<ReadProductOptionValueRequest>;
/**
 * @generated from message domain.product.v1.ReadProductOptionValueResponse
 */
export type ReadProductOptionValueResponse = Message<"domain.product.v1.ReadProductOptionValueResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOptionValue data = 1;
     */
    data: ProductOptionValue[];
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
 * Describes the message domain.product.v1.ReadProductOptionValueResponse.
 * Use `create(ReadProductOptionValueResponseSchema)` to create a new message.
 */
export declare const ReadProductOptionValueResponseSchema: GenMessage<ReadProductOptionValueResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductOptionValueRequest
 */
export type UpdateProductOptionValueRequest = Message<"domain.product.v1.UpdateProductOptionValueRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOptionValue data = 1;
     */
    data?: ProductOptionValue;
};
/**
 * Describes the message domain.product.v1.UpdateProductOptionValueRequest.
 * Use `create(UpdateProductOptionValueRequestSchema)` to create a new message.
 */
export declare const UpdateProductOptionValueRequestSchema: GenMessage<UpdateProductOptionValueRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductOptionValueResponse
 */
export type UpdateProductOptionValueResponse = Message<"domain.product.v1.UpdateProductOptionValueResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOptionValue data = 1;
     */
    data: ProductOptionValue[];
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
 * Describes the message domain.product.v1.UpdateProductOptionValueResponse.
 * Use `create(UpdateProductOptionValueResponseSchema)` to create a new message.
 */
export declare const UpdateProductOptionValueResponseSchema: GenMessage<UpdateProductOptionValueResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductOptionValueRequest
 */
export type DeleteProductOptionValueRequest = Message<"domain.product.v1.DeleteProductOptionValueRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductOptionValue data = 1;
     */
    data?: ProductOptionValue;
};
/**
 * Describes the message domain.product.v1.DeleteProductOptionValueRequest.
 * Use `create(DeleteProductOptionValueRequestSchema)` to create a new message.
 */
export declare const DeleteProductOptionValueRequestSchema: GenMessage<DeleteProductOptionValueRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductOptionValueResponse
 */
export type DeleteProductOptionValueResponse = Message<"domain.product.v1.DeleteProductOptionValueResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductOptionValueResponse.
 * Use `create(DeleteProductOptionValueResponseSchema)` to create a new message.
 */
export declare const DeleteProductOptionValueResponseSchema: GenMessage<DeleteProductOptionValueResponse>;
/**
 * @generated from message domain.product.v1.ListProductOptionValuesRequest
 */
export type ListProductOptionValuesRequest = Message<"domain.product.v1.ListProductOptionValuesRequest"> & {
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
 * Describes the message domain.product.v1.ListProductOptionValuesRequest.
 * Use `create(ListProductOptionValuesRequestSchema)` to create a new message.
 */
export declare const ListProductOptionValuesRequestSchema: GenMessage<ListProductOptionValuesRequest>;
/**
 * @generated from message domain.product.v1.ListProductOptionValuesResponse
 */
export type ListProductOptionValuesResponse = Message<"domain.product.v1.ListProductOptionValuesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOptionValue data = 1;
     */
    data: ProductOptionValue[];
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
 * Describes the message domain.product.v1.ListProductOptionValuesResponse.
 * Use `create(ListProductOptionValuesResponseSchema)` to create a new message.
 */
export declare const ListProductOptionValuesResponseSchema: GenMessage<ListProductOptionValuesResponse>;
/**
 * @generated from message domain.product.v1.GetProductOptionValueListPageDataRequest
 */
export type GetProductOptionValueListPageDataRequest = Message<"domain.product.v1.GetProductOptionValueListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductOptionValueListPageDataRequest.
 * Use `create(GetProductOptionValueListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductOptionValueListPageDataRequestSchema: GenMessage<GetProductOptionValueListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductOptionValueListPageDataResponse
 */
export type GetProductOptionValueListPageDataResponse = Message<"domain.product.v1.GetProductOptionValueListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductOptionValue product_option_value_list = 1;
     */
    productOptionValueList: ProductOptionValue[];
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
 * Describes the message domain.product.v1.GetProductOptionValueListPageDataResponse.
 * Use `create(GetProductOptionValueListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductOptionValueListPageDataResponseSchema: GenMessage<GetProductOptionValueListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductOptionValueItemPageDataRequest
 */
export type GetProductOptionValueItemPageDataRequest = Message<"domain.product.v1.GetProductOptionValueItemPageDataRequest"> & {
    /**
     * @generated from field: string product_option_value_id = 1;
     */
    productOptionValueId: string;
};
/**
 * Describes the message domain.product.v1.GetProductOptionValueItemPageDataRequest.
 * Use `create(GetProductOptionValueItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductOptionValueItemPageDataRequestSchema: GenMessage<GetProductOptionValueItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductOptionValueItemPageDataResponse
 */
export type GetProductOptionValueItemPageDataResponse = Message<"domain.product.v1.GetProductOptionValueItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductOptionValue product_option_value = 1;
     */
    productOptionValue?: ProductOptionValue;
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
 * Describes the message domain.product.v1.GetProductOptionValueItemPageDataResponse.
 * Use `create(GetProductOptionValueItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductOptionValueItemPageDataResponseSchema: GenMessage<GetProductOptionValueItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductOptionValueDomainService
 */
export declare const ProductOptionValueDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.CreateProductOptionValue
     */
    createProductOptionValue: {
        methodKind: "unary";
        input: typeof CreateProductOptionValueRequestSchema;
        output: typeof CreateProductOptionValueResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.ReadProductOptionValue
     */
    readProductOptionValue: {
        methodKind: "unary";
        input: typeof ReadProductOptionValueRequestSchema;
        output: typeof ReadProductOptionValueResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.UpdateProductOptionValue
     */
    updateProductOptionValue: {
        methodKind: "unary";
        input: typeof UpdateProductOptionValueRequestSchema;
        output: typeof UpdateProductOptionValueResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.DeleteProductOptionValue
     */
    deleteProductOptionValue: {
        methodKind: "unary";
        input: typeof DeleteProductOptionValueRequestSchema;
        output: typeof DeleteProductOptionValueResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.ListProductOptionValues
     */
    listProductOptionValues: {
        methodKind: "unary";
        input: typeof ListProductOptionValuesRequestSchema;
        output: typeof ListProductOptionValuesResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.GetProductOptionValueListPageData
     */
    getProductOptionValueListPageData: {
        methodKind: "unary";
        input: typeof GetProductOptionValueListPageDataRequestSchema;
        output: typeof GetProductOptionValueListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductOptionValueDomainService.GetProductOptionValueItemPageData
     */
    getProductOptionValueItemPageData: {
        methodKind: "unary";
        input: typeof GetProductOptionValueItemPageDataRequestSchema;
        output: typeof GetProductOptionValueItemPageDataResponseSchema;
    };
}>;
