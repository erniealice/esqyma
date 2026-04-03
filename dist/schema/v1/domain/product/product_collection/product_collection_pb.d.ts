import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_collection/product_collection.proto.
 */
export declare const file_domain_product_product_collection_product_collection: GenFile;
/**
 * @generated from message domain.product.v1.ProductCollection
 */
export type ProductCollection = Message<"domain.product.v1.ProductCollection"> & {
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
     * @generated from field: string collection_id = 8;
     */
    collectionId: string;
    /**
     * @generated from field: int32 sort_order = 9;
     */
    sortOrder: number;
};
/**
 * Describes the message domain.product.v1.ProductCollection.
 * Use `create(ProductCollectionSchema)` to create a new message.
 */
export declare const ProductCollectionSchema: GenMessage<ProductCollection>;
/**
 * @generated from message domain.product.v1.CreateProductCollectionRequest
 */
export type CreateProductCollectionRequest = Message<"domain.product.v1.CreateProductCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductCollection data = 1;
     */
    data?: ProductCollection;
};
/**
 * Describes the message domain.product.v1.CreateProductCollectionRequest.
 * Use `create(CreateProductCollectionRequestSchema)` to create a new message.
 */
export declare const CreateProductCollectionRequestSchema: GenMessage<CreateProductCollectionRequest>;
/**
 * @generated from message domain.product.v1.CreateProductCollectionResponse
 */
export type CreateProductCollectionResponse = Message<"domain.product.v1.CreateProductCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductCollection data = 1;
     */
    data: ProductCollection[];
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
 * Describes the message domain.product.v1.CreateProductCollectionResponse.
 * Use `create(CreateProductCollectionResponseSchema)` to create a new message.
 */
export declare const CreateProductCollectionResponseSchema: GenMessage<CreateProductCollectionResponse>;
/**
 * @generated from message domain.product.v1.ReadProductCollectionRequest
 */
export type ReadProductCollectionRequest = Message<"domain.product.v1.ReadProductCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductCollection data = 1;
     */
    data?: ProductCollection;
};
/**
 * Describes the message domain.product.v1.ReadProductCollectionRequest.
 * Use `create(ReadProductCollectionRequestSchema)` to create a new message.
 */
export declare const ReadProductCollectionRequestSchema: GenMessage<ReadProductCollectionRequest>;
/**
 * @generated from message domain.product.v1.ReadProductCollectionResponse
 */
export type ReadProductCollectionResponse = Message<"domain.product.v1.ReadProductCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductCollection data = 1;
     */
    data: ProductCollection[];
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
 * Describes the message domain.product.v1.ReadProductCollectionResponse.
 * Use `create(ReadProductCollectionResponseSchema)` to create a new message.
 */
export declare const ReadProductCollectionResponseSchema: GenMessage<ReadProductCollectionResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductCollectionRequest
 */
export type UpdateProductCollectionRequest = Message<"domain.product.v1.UpdateProductCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductCollection data = 1;
     */
    data?: ProductCollection;
};
/**
 * Describes the message domain.product.v1.UpdateProductCollectionRequest.
 * Use `create(UpdateProductCollectionRequestSchema)` to create a new message.
 */
export declare const UpdateProductCollectionRequestSchema: GenMessage<UpdateProductCollectionRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductCollectionResponse
 */
export type UpdateProductCollectionResponse = Message<"domain.product.v1.UpdateProductCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductCollection data = 1;
     */
    data: ProductCollection[];
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
 * Describes the message domain.product.v1.UpdateProductCollectionResponse.
 * Use `create(UpdateProductCollectionResponseSchema)` to create a new message.
 */
export declare const UpdateProductCollectionResponseSchema: GenMessage<UpdateProductCollectionResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductCollectionRequest
 */
export type DeleteProductCollectionRequest = Message<"domain.product.v1.DeleteProductCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductCollection data = 1;
     */
    data?: ProductCollection;
};
/**
 * Describes the message domain.product.v1.DeleteProductCollectionRequest.
 * Use `create(DeleteProductCollectionRequestSchema)` to create a new message.
 */
export declare const DeleteProductCollectionRequestSchema: GenMessage<DeleteProductCollectionRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductCollectionResponse
 */
export type DeleteProductCollectionResponse = Message<"domain.product.v1.DeleteProductCollectionResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductCollectionResponse.
 * Use `create(DeleteProductCollectionResponseSchema)` to create a new message.
 */
export declare const DeleteProductCollectionResponseSchema: GenMessage<DeleteProductCollectionResponse>;
/**
 * @generated from message domain.product.v1.ListProductCollectionsRequest
 */
export type ListProductCollectionsRequest = Message<"domain.product.v1.ListProductCollectionsRequest"> & {
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
 * Describes the message domain.product.v1.ListProductCollectionsRequest.
 * Use `create(ListProductCollectionsRequestSchema)` to create a new message.
 */
export declare const ListProductCollectionsRequestSchema: GenMessage<ListProductCollectionsRequest>;
/**
 * @generated from message domain.product.v1.ListProductCollectionsResponse
 */
export type ListProductCollectionsResponse = Message<"domain.product.v1.ListProductCollectionsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductCollection data = 1;
     */
    data: ProductCollection[];
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
 * Describes the message domain.product.v1.ListProductCollectionsResponse.
 * Use `create(ListProductCollectionsResponseSchema)` to create a new message.
 */
export declare const ListProductCollectionsResponseSchema: GenMessage<ListProductCollectionsResponse>;
/**
 * @generated from message domain.product.v1.GetProductCollectionListPageDataRequest
 */
export type GetProductCollectionListPageDataRequest = Message<"domain.product.v1.GetProductCollectionListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductCollectionListPageDataRequest.
 * Use `create(GetProductCollectionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductCollectionListPageDataRequestSchema: GenMessage<GetProductCollectionListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductCollectionListPageDataResponse
 */
export type GetProductCollectionListPageDataResponse = Message<"domain.product.v1.GetProductCollectionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductCollection product_collection_list = 1;
     */
    productCollectionList: ProductCollection[];
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
 * Describes the message domain.product.v1.GetProductCollectionListPageDataResponse.
 * Use `create(GetProductCollectionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductCollectionListPageDataResponseSchema: GenMessage<GetProductCollectionListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductCollectionItemPageDataRequest
 */
export type GetProductCollectionItemPageDataRequest = Message<"domain.product.v1.GetProductCollectionItemPageDataRequest"> & {
    /**
     * @generated from field: string product_collection_id = 1;
     */
    productCollectionId: string;
};
/**
 * Describes the message domain.product.v1.GetProductCollectionItemPageDataRequest.
 * Use `create(GetProductCollectionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductCollectionItemPageDataRequestSchema: GenMessage<GetProductCollectionItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductCollectionItemPageDataResponse
 */
export type GetProductCollectionItemPageDataResponse = Message<"domain.product.v1.GetProductCollectionItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductCollection product_collection = 1;
     */
    productCollection?: ProductCollection;
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
 * Describes the message domain.product.v1.GetProductCollectionItemPageDataResponse.
 * Use `create(GetProductCollectionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductCollectionItemPageDataResponseSchema: GenMessage<GetProductCollectionItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductCollectionDomainService
 */
export declare const ProductCollectionDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.CreateProductCollection
     */
    createProductCollection: {
        methodKind: "unary";
        input: typeof CreateProductCollectionRequestSchema;
        output: typeof CreateProductCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.ReadProductCollection
     */
    readProductCollection: {
        methodKind: "unary";
        input: typeof ReadProductCollectionRequestSchema;
        output: typeof ReadProductCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.UpdateProductCollection
     */
    updateProductCollection: {
        methodKind: "unary";
        input: typeof UpdateProductCollectionRequestSchema;
        output: typeof UpdateProductCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.DeleteProductCollection
     */
    deleteProductCollection: {
        methodKind: "unary";
        input: typeof DeleteProductCollectionRequestSchema;
        output: typeof DeleteProductCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.ListProductCollections
     */
    listProductCollections: {
        methodKind: "unary";
        input: typeof ListProductCollectionsRequestSchema;
        output: typeof ListProductCollectionsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.GetProductCollectionListPageData
     */
    getProductCollectionListPageData: {
        methodKind: "unary";
        input: typeof GetProductCollectionListPageDataRequestSchema;
        output: typeof GetProductCollectionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductCollectionDomainService.GetProductCollectionItemPageData
     */
    getProductCollectionItemPageData: {
        methodKind: "unary";
        input: typeof GetProductCollectionItemPageDataRequestSchema;
        output: typeof GetProductCollectionItemPageDataResponseSchema;
    };
}>;
