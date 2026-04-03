import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/product_variant_image/product_variant_image.proto.
 */
export declare const file_domain_product_product_variant_image_product_variant_image: GenFile;
/**
 * @generated from message domain.product.v1.ProductVariantImage
 */
export type ProductVariantImage = Message<"domain.product.v1.ProductVariantImage"> & {
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
     * @generated from field: string product_variant_id = 7;
     */
    productVariantId: string;
    /**
     * @generated from field: string image_url = 8;
     */
    imageUrl: string;
    /**
     * @generated from field: optional string alt_text = 9;
     */
    altText?: string;
    /**
     * @generated from field: int32 sort_order = 10;
     */
    sortOrder: number;
    /**
     * @generated from field: bool is_primary = 11;
     */
    isPrimary: boolean;
};
/**
 * Describes the message domain.product.v1.ProductVariantImage.
 * Use `create(ProductVariantImageSchema)` to create a new message.
 */
export declare const ProductVariantImageSchema: GenMessage<ProductVariantImage>;
/**
 * @generated from message domain.product.v1.CreateProductVariantImageRequest
 */
export type CreateProductVariantImageRequest = Message<"domain.product.v1.CreateProductVariantImageRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantImage data = 1;
     */
    data?: ProductVariantImage;
};
/**
 * Describes the message domain.product.v1.CreateProductVariantImageRequest.
 * Use `create(CreateProductVariantImageRequestSchema)` to create a new message.
 */
export declare const CreateProductVariantImageRequestSchema: GenMessage<CreateProductVariantImageRequest>;
/**
 * @generated from message domain.product.v1.CreateProductVariantImageResponse
 */
export type CreateProductVariantImageResponse = Message<"domain.product.v1.CreateProductVariantImageResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantImage data = 1;
     */
    data: ProductVariantImage[];
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
 * Describes the message domain.product.v1.CreateProductVariantImageResponse.
 * Use `create(CreateProductVariantImageResponseSchema)` to create a new message.
 */
export declare const CreateProductVariantImageResponseSchema: GenMessage<CreateProductVariantImageResponse>;
/**
 * @generated from message domain.product.v1.ReadProductVariantImageRequest
 */
export type ReadProductVariantImageRequest = Message<"domain.product.v1.ReadProductVariantImageRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantImage data = 1;
     */
    data?: ProductVariantImage;
};
/**
 * Describes the message domain.product.v1.ReadProductVariantImageRequest.
 * Use `create(ReadProductVariantImageRequestSchema)` to create a new message.
 */
export declare const ReadProductVariantImageRequestSchema: GenMessage<ReadProductVariantImageRequest>;
/**
 * @generated from message domain.product.v1.ReadProductVariantImageResponse
 */
export type ReadProductVariantImageResponse = Message<"domain.product.v1.ReadProductVariantImageResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantImage data = 1;
     */
    data: ProductVariantImage[];
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
 * Describes the message domain.product.v1.ReadProductVariantImageResponse.
 * Use `create(ReadProductVariantImageResponseSchema)` to create a new message.
 */
export declare const ReadProductVariantImageResponseSchema: GenMessage<ReadProductVariantImageResponse>;
/**
 * @generated from message domain.product.v1.UpdateProductVariantImageRequest
 */
export type UpdateProductVariantImageRequest = Message<"domain.product.v1.UpdateProductVariantImageRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantImage data = 1;
     */
    data?: ProductVariantImage;
};
/**
 * Describes the message domain.product.v1.UpdateProductVariantImageRequest.
 * Use `create(UpdateProductVariantImageRequestSchema)` to create a new message.
 */
export declare const UpdateProductVariantImageRequestSchema: GenMessage<UpdateProductVariantImageRequest>;
/**
 * @generated from message domain.product.v1.UpdateProductVariantImageResponse
 */
export type UpdateProductVariantImageResponse = Message<"domain.product.v1.UpdateProductVariantImageResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantImage data = 1;
     */
    data: ProductVariantImage[];
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
 * Describes the message domain.product.v1.UpdateProductVariantImageResponse.
 * Use `create(UpdateProductVariantImageResponseSchema)` to create a new message.
 */
export declare const UpdateProductVariantImageResponseSchema: GenMessage<UpdateProductVariantImageResponse>;
/**
 * @generated from message domain.product.v1.DeleteProductVariantImageRequest
 */
export type DeleteProductVariantImageRequest = Message<"domain.product.v1.DeleteProductVariantImageRequest"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantImage data = 1;
     */
    data?: ProductVariantImage;
};
/**
 * Describes the message domain.product.v1.DeleteProductVariantImageRequest.
 * Use `create(DeleteProductVariantImageRequestSchema)` to create a new message.
 */
export declare const DeleteProductVariantImageRequestSchema: GenMessage<DeleteProductVariantImageRequest>;
/**
 * @generated from message domain.product.v1.DeleteProductVariantImageResponse
 */
export type DeleteProductVariantImageResponse = Message<"domain.product.v1.DeleteProductVariantImageResponse"> & {
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
 * Describes the message domain.product.v1.DeleteProductVariantImageResponse.
 * Use `create(DeleteProductVariantImageResponseSchema)` to create a new message.
 */
export declare const DeleteProductVariantImageResponseSchema: GenMessage<DeleteProductVariantImageResponse>;
/**
 * @generated from message domain.product.v1.ListProductVariantImagesRequest
 */
export type ListProductVariantImagesRequest = Message<"domain.product.v1.ListProductVariantImagesRequest"> & {
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
 * Describes the message domain.product.v1.ListProductVariantImagesRequest.
 * Use `create(ListProductVariantImagesRequestSchema)` to create a new message.
 */
export declare const ListProductVariantImagesRequestSchema: GenMessage<ListProductVariantImagesRequest>;
/**
 * @generated from message domain.product.v1.ListProductVariantImagesResponse
 */
export type ListProductVariantImagesResponse = Message<"domain.product.v1.ListProductVariantImagesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantImage data = 1;
     */
    data: ProductVariantImage[];
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
 * Describes the message domain.product.v1.ListProductVariantImagesResponse.
 * Use `create(ListProductVariantImagesResponseSchema)` to create a new message.
 */
export declare const ListProductVariantImagesResponseSchema: GenMessage<ListProductVariantImagesResponse>;
/**
 * @generated from message domain.product.v1.GetProductVariantImageListPageDataRequest
 */
export type GetProductVariantImageListPageDataRequest = Message<"domain.product.v1.GetProductVariantImageListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetProductVariantImageListPageDataRequest.
 * Use `create(GetProductVariantImageListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductVariantImageListPageDataRequestSchema: GenMessage<GetProductVariantImageListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductVariantImageListPageDataResponse
 */
export type GetProductVariantImageListPageDataResponse = Message<"domain.product.v1.GetProductVariantImageListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.ProductVariantImage product_variant_image_list = 1;
     */
    productVariantImageList: ProductVariantImage[];
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
 * Describes the message domain.product.v1.GetProductVariantImageListPageDataResponse.
 * Use `create(GetProductVariantImageListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductVariantImageListPageDataResponseSchema: GenMessage<GetProductVariantImageListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetProductVariantImageItemPageDataRequest
 */
export type GetProductVariantImageItemPageDataRequest = Message<"domain.product.v1.GetProductVariantImageItemPageDataRequest"> & {
    /**
     * @generated from field: string product_variant_image_id = 1;
     */
    productVariantImageId: string;
};
/**
 * Describes the message domain.product.v1.GetProductVariantImageItemPageDataRequest.
 * Use `create(GetProductVariantImageItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProductVariantImageItemPageDataRequestSchema: GenMessage<GetProductVariantImageItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetProductVariantImageItemPageDataResponse
 */
export type GetProductVariantImageItemPageDataResponse = Message<"domain.product.v1.GetProductVariantImageItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.ProductVariantImage product_variant_image = 1;
     */
    productVariantImage?: ProductVariantImage;
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
 * Describes the message domain.product.v1.GetProductVariantImageItemPageDataResponse.
 * Use `create(GetProductVariantImageItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProductVariantImageItemPageDataResponseSchema: GenMessage<GetProductVariantImageItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ProductVariantImageDomainService
 */
export declare const ProductVariantImageDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.CreateProductVariantImage
     */
    createProductVariantImage: {
        methodKind: "unary";
        input: typeof CreateProductVariantImageRequestSchema;
        output: typeof CreateProductVariantImageResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.ReadProductVariantImage
     */
    readProductVariantImage: {
        methodKind: "unary";
        input: typeof ReadProductVariantImageRequestSchema;
        output: typeof ReadProductVariantImageResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.UpdateProductVariantImage
     */
    updateProductVariantImage: {
        methodKind: "unary";
        input: typeof UpdateProductVariantImageRequestSchema;
        output: typeof UpdateProductVariantImageResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.DeleteProductVariantImage
     */
    deleteProductVariantImage: {
        methodKind: "unary";
        input: typeof DeleteProductVariantImageRequestSchema;
        output: typeof DeleteProductVariantImageResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.ListProductVariantImages
     */
    listProductVariantImages: {
        methodKind: "unary";
        input: typeof ListProductVariantImagesRequestSchema;
        output: typeof ListProductVariantImagesResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.GetProductVariantImageListPageData
     */
    getProductVariantImageListPageData: {
        methodKind: "unary";
        input: typeof GetProductVariantImageListPageDataRequestSchema;
        output: typeof GetProductVariantImageListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ProductVariantImageDomainService.GetProductVariantImageItemPageData
     */
    getProductVariantImageItemPageData: {
        methodKind: "unary";
        input: typeof GetProductVariantImageItemPageDataRequestSchema;
        output: typeof GetProductVariantImageItemPageDataResponseSchema;
    };
}>;
