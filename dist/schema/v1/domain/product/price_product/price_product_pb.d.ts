import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/price_product/price_product.proto.
 */
export declare const file_domain_product_price_product_price_product: GenFile;
/**
 * @generated from message domain.product.v1.PriceProduct
 */
export type PriceProduct = Message<"domain.product.v1.PriceProduct"> & {
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
     * @generated from field: optional domain.product.v1.Product product = 7;
     */
    product?: Product;
    /**
     * @generated from field: string product_id = 8;
     */
    productId: string;
    /**
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * @generated from field: optional string description = 10;
     */
    description?: string;
    /**
     * @generated from field: int64 amount = 11;
     */
    amount: bigint;
    /**
     * @generated from field: string currency = 12;
     */
    currency: string;
    /**
     * @generated from field: int64 date_start = 13;
     */
    dateStart: bigint;
    /**
     * @generated from field: string date_start_string = 14;
     */
    dateStartString: string;
    /**
     * @generated from field: optional int64 date_end = 15;
     */
    dateEnd?: bigint;
    /**
     * @generated from field: optional string date_end_string = 16;
     */
    dateEndString?: string;
    /**
     * @generated from field: optional string price_list_id = 17;
     */
    priceListId?: string;
};
/**
 * Describes the message domain.product.v1.PriceProduct.
 * Use `create(PriceProductSchema)` to create a new message.
 */
export declare const PriceProductSchema: GenMessage<PriceProduct>;
/**
 * @generated from message domain.product.v1.CreatePriceProductRequest
 */
export type CreatePriceProductRequest = Message<"domain.product.v1.CreatePriceProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceProduct data = 1;
     */
    data?: PriceProduct;
};
/**
 * Describes the message domain.product.v1.CreatePriceProductRequest.
 * Use `create(CreatePriceProductRequestSchema)` to create a new message.
 */
export declare const CreatePriceProductRequestSchema: GenMessage<CreatePriceProductRequest>;
/**
 * @generated from message domain.product.v1.CreatePriceProductResponse
 */
export type CreatePriceProductResponse = Message<"domain.product.v1.CreatePriceProductResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceProduct data = 1;
     */
    data: PriceProduct[];
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
 * Describes the message domain.product.v1.CreatePriceProductResponse.
 * Use `create(CreatePriceProductResponseSchema)` to create a new message.
 */
export declare const CreatePriceProductResponseSchema: GenMessage<CreatePriceProductResponse>;
/**
 * @generated from message domain.product.v1.ReadPriceProductRequest
 */
export type ReadPriceProductRequest = Message<"domain.product.v1.ReadPriceProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceProduct data = 1;
     */
    data?: PriceProduct;
};
/**
 * Describes the message domain.product.v1.ReadPriceProductRequest.
 * Use `create(ReadPriceProductRequestSchema)` to create a new message.
 */
export declare const ReadPriceProductRequestSchema: GenMessage<ReadPriceProductRequest>;
/**
 * @generated from message domain.product.v1.ReadPriceProductResponse
 */
export type ReadPriceProductResponse = Message<"domain.product.v1.ReadPriceProductResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceProduct data = 1;
     */
    data: PriceProduct[];
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
 * Describes the message domain.product.v1.ReadPriceProductResponse.
 * Use `create(ReadPriceProductResponseSchema)` to create a new message.
 */
export declare const ReadPriceProductResponseSchema: GenMessage<ReadPriceProductResponse>;
/**
 * @generated from message domain.product.v1.UpdatePriceProductRequest
 */
export type UpdatePriceProductRequest = Message<"domain.product.v1.UpdatePriceProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceProduct data = 1;
     */
    data?: PriceProduct;
};
/**
 * Describes the message domain.product.v1.UpdatePriceProductRequest.
 * Use `create(UpdatePriceProductRequestSchema)` to create a new message.
 */
export declare const UpdatePriceProductRequestSchema: GenMessage<UpdatePriceProductRequest>;
/**
 * @generated from message domain.product.v1.UpdatePriceProductResponse
 */
export type UpdatePriceProductResponse = Message<"domain.product.v1.UpdatePriceProductResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceProduct data = 1;
     */
    data: PriceProduct[];
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
 * Describes the message domain.product.v1.UpdatePriceProductResponse.
 * Use `create(UpdatePriceProductResponseSchema)` to create a new message.
 */
export declare const UpdatePriceProductResponseSchema: GenMessage<UpdatePriceProductResponse>;
/**
 * @generated from message domain.product.v1.DeletePriceProductRequest
 */
export type DeletePriceProductRequest = Message<"domain.product.v1.DeletePriceProductRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceProduct data = 1;
     */
    data?: PriceProduct;
};
/**
 * Describes the message domain.product.v1.DeletePriceProductRequest.
 * Use `create(DeletePriceProductRequestSchema)` to create a new message.
 */
export declare const DeletePriceProductRequestSchema: GenMessage<DeletePriceProductRequest>;
/**
 * @generated from message domain.product.v1.DeletePriceProductResponse
 */
export type DeletePriceProductResponse = Message<"domain.product.v1.DeletePriceProductResponse"> & {
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
 * Describes the message domain.product.v1.DeletePriceProductResponse.
 * Use `create(DeletePriceProductResponseSchema)` to create a new message.
 */
export declare const DeletePriceProductResponseSchema: GenMessage<DeletePriceProductResponse>;
/**
 * @generated from message domain.product.v1.ListPriceProductsRequest
 */
export type ListPriceProductsRequest = Message<"domain.product.v1.ListPriceProductsRequest"> & {
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
 * Describes the message domain.product.v1.ListPriceProductsRequest.
 * Use `create(ListPriceProductsRequestSchema)` to create a new message.
 */
export declare const ListPriceProductsRequestSchema: GenMessage<ListPriceProductsRequest>;
/**
 * @generated from message domain.product.v1.ListPriceProductsResponse
 */
export type ListPriceProductsResponse = Message<"domain.product.v1.ListPriceProductsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceProduct data = 1;
     */
    data: PriceProduct[];
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
 * Describes the message domain.product.v1.ListPriceProductsResponse.
 * Use `create(ListPriceProductsResponseSchema)` to create a new message.
 */
export declare const ListPriceProductsResponseSchema: GenMessage<ListPriceProductsResponse>;
/**
 * @generated from message domain.product.v1.GetPriceProductListPageDataRequest
 */
export type GetPriceProductListPageDataRequest = Message<"domain.product.v1.GetPriceProductListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetPriceProductListPageDataRequest.
 * Use `create(GetPriceProductListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceProductListPageDataRequestSchema: GenMessage<GetPriceProductListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPriceProductListPageDataResponse
 */
export type GetPriceProductListPageDataResponse = Message<"domain.product.v1.GetPriceProductListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceProduct price_product_list = 1;
     */
    priceProductList: PriceProduct[];
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
 * Describes the message domain.product.v1.GetPriceProductListPageDataResponse.
 * Use `create(GetPriceProductListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceProductListPageDataResponseSchema: GenMessage<GetPriceProductListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetPriceProductItemPageDataRequest
 */
export type GetPriceProductItemPageDataRequest = Message<"domain.product.v1.GetPriceProductItemPageDataRequest"> & {
    /**
     * @generated from field: string price_product_id = 1;
     */
    priceProductId: string;
};
/**
 * Describes the message domain.product.v1.GetPriceProductItemPageDataRequest.
 * Use `create(GetPriceProductItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceProductItemPageDataRequestSchema: GenMessage<GetPriceProductItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPriceProductItemPageDataResponse
 */
export type GetPriceProductItemPageDataResponse = Message<"domain.product.v1.GetPriceProductItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.PriceProduct price_product = 1;
     */
    priceProduct?: PriceProduct;
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
 * Describes the message domain.product.v1.GetPriceProductItemPageDataResponse.
 * Use `create(GetPriceProductItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceProductItemPageDataResponseSchema: GenMessage<GetPriceProductItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.PriceProductDomainService
 */
export declare const PriceProductDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.CreatePriceProduct
     */
    createPriceProduct: {
        methodKind: "unary";
        input: typeof CreatePriceProductRequestSchema;
        output: typeof CreatePriceProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.ReadPriceProduct
     */
    readPriceProduct: {
        methodKind: "unary";
        input: typeof ReadPriceProductRequestSchema;
        output: typeof ReadPriceProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.UpdatePriceProduct
     */
    updatePriceProduct: {
        methodKind: "unary";
        input: typeof UpdatePriceProductRequestSchema;
        output: typeof UpdatePriceProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.DeletePriceProduct
     */
    deletePriceProduct: {
        methodKind: "unary";
        input: typeof DeletePriceProductRequestSchema;
        output: typeof DeletePriceProductResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.ListPriceProducts
     */
    listPriceProducts: {
        methodKind: "unary";
        input: typeof ListPriceProductsRequestSchema;
        output: typeof ListPriceProductsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.GetPriceProductListPageData
     */
    getPriceProductListPageData: {
        methodKind: "unary";
        input: typeof GetPriceProductListPageDataRequestSchema;
        output: typeof GetPriceProductListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceProductDomainService.GetPriceProductItemPageData
     */
    getPriceProductItemPageData: {
        methodKind: "unary";
        input: typeof GetPriceProductItemPageDataRequestSchema;
        output: typeof GetPriceProductItemPageDataResponseSchema;
    };
}>;
