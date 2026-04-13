import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_line/product_line.proto.
 */
export declare const file_domain_product_product_line_product_line: GenFile;
/**
 * ProductLine is the many-to-many link between products and lines.
 *
 * @generated from message domain.product.v1.ProductLine
 */
export type ProductLine = Message<"domain.product.v1.ProductLine"> & {
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
     * @generated from field: string product_id = 7;
     */
    productId: string;
    /**
     * @generated from field: string line_id = 8;
     */
    lineId: string;
    /**
     * @generated from field: int32 sort_order = 9;
     */
    sortOrder: number;
};
/**
 * Describes the message domain.product.v1.ProductLine.
 * Use `create(ProductLineSchema)` to create a new message.
 */
export declare const ProductLineSchema: GenMessage<ProductLine>;
/**
 * @generated from message domain.product.v1.CreateProductLineRequest
 */
export type CreateProductLineRequest = Message<"domain.product.v1.CreateProductLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductLine data = 1;
     */
    data?: ProductLine;
};
/**
 * Describes the message domain.product.v1.CreateProductLineRequest.
 * Use `create(CreateProductLineRequestSchema)` to create a new message.
 */
export declare const CreateProductLineRequestSchema: GenMessage<CreateProductLineRequest>;
/**
 * @generated from message domain.product.v1.CreateProductLineResponse
 */
export type CreateProductLineResponse = Message<"domain.product.v1.CreateProductLineResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductLine data = 1;
     */
    data: ProductLine[];
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
 * Describes the message domain.product.v1.CreateProductLineResponse.
 * Use `create(CreateProductLineResponseSchema)` to create a new message.
 */
export declare const CreateProductLineResponseSchema: GenMessage<CreateProductLineResponse>;
/**
 * @generated from message domain.product.v1.ReadProductLineRequest
 */
export type ReadProductLineRequest = Message<"domain.product.v1.ReadProductLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductLine data = 1;
     */
    data?: ProductLine;
};
/**
 * Describes the message domain.product.v1.ReadProductLineRequest.
 * Use `create(ReadProductLineRequestSchema)` to create a new message.
 */
export declare const ReadProductLineRequestSchema: GenMessage<ReadProductLineRequest>;
/**
 * @generated from message domain.product.v1.ReadProductLineResponse
 */
export type ReadProductLineResponse = Message<"domain.product.v1.ReadProductLineResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductLine data = 1;
     */
    data: ProductLine[];
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
 * Describes the message domain.product.v1.ReadProductLineResponse.
 * Use `create(ReadProductLineResponseSchema)` to create a new message.
 */
export declare const ReadProductLineResponseSchema: GenMessage<ReadProductLineResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductLineRequest
 */
export type UpdateProductLineRequest = Message<"domain.product.v1.UpdateProductLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductLine data = 1;
     */
    data?: ProductLine;
};
/**
 * Describes the message domain.product.v1.UpdateProductLineRequest.
 * Use `create(UpdateProductLineRequestSchema)` to create a new message.
 */
export declare const UpdateProductLineRequestSchema: GenMessage<UpdateProductLineRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductLineResponse
 */
export type UpdateProductLineResponse = Message<"domain.product.v1.UpdateProductLineResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductLine data = 1;
     */
    data: ProductLine[];
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
 * Describes the message domain.product.v1.UpdateProductLineResponse.
 * Use `create(UpdateProductLineResponseSchema)` to create a new message.
 */
export declare const UpdateProductLineResponseSchema: GenMessage<UpdateProductLineResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductLineRequest
 */
export type DeleteProductLineRequest = Message<"domain.product.v1.DeleteProductLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductLine data = 1;
     */
    data?: ProductLine;
};
/**
 * Describes the message domain.product.v1.DeleteProductLineRequest.
 * Use `create(DeleteProductLineRequestSchema)` to create a new message.
 */
export declare const DeleteProductLineRequestSchema: GenMessage<DeleteProductLineRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductLineResponse
 */
export type DeleteProductLineResponse = Message<"domain.product.v1.DeleteProductLineResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductLineResponse.
 * Use `create(DeleteProductLineResponseSchema)` to create a new message.
 */
export declare const DeleteProductLineResponseSchema: GenMessage<DeleteProductLineResponse>;
/**
 * @generated from message domain.product.v1.ListProductLinesRequest
 */
export type ListProductLinesRequest = Message<"domain.product.v1.ListProductLinesRequest"> & {
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
 * Describes the message domain.product.v1.ListProductLinesRequest.
 * Use `create(ListProductLinesRequestSchema)` to create a new message.
 */
export declare const ListProductLinesRequestSchema: GenMessage<ListProductLinesRequest>;
/**
 * @generated from message domain.product.v1.ListProductLinesResponse
 */
export type ListProductLinesResponse = Message<"domain.product.v1.ListProductLinesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductLine data = 1;
     */
    data: ProductLine[];
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
 * Describes the message domain.product.v1.ListProductLinesResponse.
 * Use `create(ListProductLinesResponseSchema)` to create a new message.
 */
export declare const ListProductLinesResponseSchema: GenMessage<ListProductLinesResponse>;
/**
 * @generated from message domain.product.v1.GetProductLineListPageDataRequest
 */
export type GetProductLineListPageDataRequest = Message<"domain.product.v1.GetProductLineListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductLineListPageDataRequest.
 * Use `create(GetProductLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductLineListPageDataRequestSchema: GenMessage<GetProductLineListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductLineListPageDataResponse
 */
export type GetProductLineListPageDataResponse = Message<"domain.product.v1.GetProductLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductLine product_line_list = 1;
     */
    productLineList: ProductLine[];
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
 * Describes the message domain.product.v1.GetProductLineListPageDataResponse.
 * Use `create(GetProductLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductLineListPageDataResponseSchema: GenMessage<GetProductLineListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductLineItemPageDataRequest
 */
export type GetProductLineItemPageDataRequest = Message<"domain.product.v1.GetProductLineItemPageDataRequest"> & {
    /**
     * @generated from field: string product_line_id = 1;
     */
    productLineId: string;
};
/**
 * Describes the message domain.product.v1.GetProductLineItemPageDataRequest.
 * Use `create(GetProductLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductLineItemPageDataRequestSchema: GenMessage<GetProductLineItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductLineItemPageDataResponse
 */
export type GetProductLineItemPageDataResponse = Message<"domain.product.v1.GetProductLineItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductLine product_line = 1;
     */
    productLine?: ProductLine;
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
 * Describes the message domain.product.v1.GetProductLineItemPageDataResponse.
 * Use `create(GetProductLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductLineItemPageDataResponseSchema: GenMessage<GetProductLineItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductLineDomainService
 */
export declare const ProductLineDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.CreateProductLine
     */
    createProductLine: {
        methodKind: "unary";
        input: typeof CreateProductLineRequestSchema;
        output: typeof CreateProductLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.ReadProductLine
     */
    readProductLine: {
        methodKind: "unary";
        input: typeof ReadProductLineRequestSchema;
        output: typeof ReadProductLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.UpdateProductLine
     */
    updateProductLine: {
        methodKind: "unary";
        input: typeof UpdateProductLineRequestSchema;
        output: typeof UpdateProductLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.DeleteProductLine
     */
    deleteProductLine: {
        methodKind: "unary";
        input: typeof DeleteProductLineRequestSchema;
        output: typeof DeleteProductLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.ListProductLines
     */
    listProductLines: {
        methodKind: "unary";
        input: typeof ListProductLinesRequestSchema;
        output: typeof ListProductLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.GetProductLineListPageData
     */
    getProductLineListPageData: {
        methodKind: "unary";
        input: typeof GetProductLineListPageDataRequestSchema;
        output: typeof GetProductLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductLineDomainService.GetProductLineItemPageData
     */
    getProductLineItemPageData: {
        methodKind: "unary";
        input: typeof GetProductLineItemPageDataRequestSchema;
        output: typeof GetProductLineItemPageDataResponseSchema;
    };
}>;
