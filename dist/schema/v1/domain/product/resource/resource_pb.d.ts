import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Product } from "../product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/resource/resource.proto.
 */
export declare const file_domain_product_resource_resource: GenFile;
/**
 * @generated from message domain.product.v1.Resource
 */
export type Resource = Message<"domain.product.v1.Resource"> & {
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
     * @generated from field: optional domain.product.v1.Product product = 9;
     */
    product?: Product;
    /**
     * @generated from field: string product_id = 10;
     */
    productId: string;
};
/**
 * Describes the message domain.product.v1.Resource.
 * Use `create(ResourceSchema)` to create a new message.
 */
export declare const ResourceSchema: GenMessage<Resource>;
/**
 * @generated from message domain.product.v1.CreateResourceRequest
 */
export type CreateResourceRequest = Message<"domain.product.v1.CreateResourceRequest"> & {
    /**
     * @generated from field: domain.product.v1.Resource data = 1;
     */
    data?: Resource;
};
/**
 * Describes the message domain.product.v1.CreateResourceRequest.
 * Use `create(CreateResourceRequestSchema)` to create a new message.
 */
export declare const CreateResourceRequestSchema: GenMessage<CreateResourceRequest>;
/**
 * @generated from message domain.product.v1.CreateResourceResponse
 */
export type CreateResourceResponse = Message<"domain.product.v1.CreateResourceResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Resource data = 1;
     */
    data: Resource[];
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
 * Describes the message domain.product.v1.CreateResourceResponse.
 * Use `create(CreateResourceResponseSchema)` to create a new message.
 */
export declare const CreateResourceResponseSchema: GenMessage<CreateResourceResponse>;
/**
 * @generated from message domain.product.v1.ReadResourceRequest
 */
export type ReadResourceRequest = Message<"domain.product.v1.ReadResourceRequest"> & {
    /**
     * @generated from field: domain.product.v1.Resource data = 1;
     */
    data?: Resource;
};
/**
 * Describes the message domain.product.v1.ReadResourceRequest.
 * Use `create(ReadResourceRequestSchema)` to create a new message.
 */
export declare const ReadResourceRequestSchema: GenMessage<ReadResourceRequest>;
/**
 * @generated from message domain.product.v1.ReadResourceResponse
 */
export type ReadResourceResponse = Message<"domain.product.v1.ReadResourceResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Resource data = 1;
     */
    data: Resource[];
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
 * Describes the message domain.product.v1.ReadResourceResponse.
 * Use `create(ReadResourceResponseSchema)` to create a new message.
 */
export declare const ReadResourceResponseSchema: GenMessage<ReadResourceResponse>;
/**
 * @generated from message domain.product.v1.UpdateResourceRequest
 */
export type UpdateResourceRequest = Message<"domain.product.v1.UpdateResourceRequest"> & {
    /**
     * @generated from field: domain.product.v1.Resource data = 1;
     */
    data?: Resource;
};
/**
 * Describes the message domain.product.v1.UpdateResourceRequest.
 * Use `create(UpdateResourceRequestSchema)` to create a new message.
 */
export declare const UpdateResourceRequestSchema: GenMessage<UpdateResourceRequest>;
/**
 * @generated from message domain.product.v1.UpdateResourceResponse
 */
export type UpdateResourceResponse = Message<"domain.product.v1.UpdateResourceResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Resource data = 1;
     */
    data: Resource[];
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
 * Describes the message domain.product.v1.UpdateResourceResponse.
 * Use `create(UpdateResourceResponseSchema)` to create a new message.
 */
export declare const UpdateResourceResponseSchema: GenMessage<UpdateResourceResponse>;
/**
 * @generated from message domain.product.v1.DeleteResourceRequest
 */
export type DeleteResourceRequest = Message<"domain.product.v1.DeleteResourceRequest"> & {
    /**
     * @generated from field: domain.product.v1.Resource data = 1;
     */
    data?: Resource;
};
/**
 * Describes the message domain.product.v1.DeleteResourceRequest.
 * Use `create(DeleteResourceRequestSchema)` to create a new message.
 */
export declare const DeleteResourceRequestSchema: GenMessage<DeleteResourceRequest>;
/**
 * @generated from message domain.product.v1.DeleteResourceResponse
 */
export type DeleteResourceResponse = Message<"domain.product.v1.DeleteResourceResponse"> & {
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
 * Describes the message domain.product.v1.DeleteResourceResponse.
 * Use `create(DeleteResourceResponseSchema)` to create a new message.
 */
export declare const DeleteResourceResponseSchema: GenMessage<DeleteResourceResponse>;
/**
 * @generated from message domain.product.v1.ListResourcesRequest
 */
export type ListResourcesRequest = Message<"domain.product.v1.ListResourcesRequest"> & {
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
 * Describes the message domain.product.v1.ListResourcesRequest.
 * Use `create(ListResourcesRequestSchema)` to create a new message.
 */
export declare const ListResourcesRequestSchema: GenMessage<ListResourcesRequest>;
/**
 * @generated from message domain.product.v1.ListResourcesResponse
 */
export type ListResourcesResponse = Message<"domain.product.v1.ListResourcesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Resource data = 1;
     */
    data: Resource[];
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
 * Describes the message domain.product.v1.ListResourcesResponse.
 * Use `create(ListResourcesResponseSchema)` to create a new message.
 */
export declare const ListResourcesResponseSchema: GenMessage<ListResourcesResponse>;
/**
 * @generated from message domain.product.v1.GetResourceListPageDataRequest
 */
export type GetResourceListPageDataRequest = Message<"domain.product.v1.GetResourceListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetResourceListPageDataRequest.
 * Use `create(GetResourceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetResourceListPageDataRequestSchema: GenMessage<GetResourceListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetResourceListPageDataResponse
 */
export type GetResourceListPageDataResponse = Message<"domain.product.v1.GetResourceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Resource resource_list = 1;
     */
    resourceList: Resource[];
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
 * Describes the message domain.product.v1.GetResourceListPageDataResponse.
 * Use `create(GetResourceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetResourceListPageDataResponseSchema: GenMessage<GetResourceListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetResourceItemPageDataRequest
 */
export type GetResourceItemPageDataRequest = Message<"domain.product.v1.GetResourceItemPageDataRequest"> & {
    /**
     * @generated from field: string resource_id = 1;
     */
    resourceId: string;
};
/**
 * Describes the message domain.product.v1.GetResourceItemPageDataRequest.
 * Use `create(GetResourceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetResourceItemPageDataRequestSchema: GenMessage<GetResourceItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetResourceItemPageDataResponse
 */
export type GetResourceItemPageDataResponse = Message<"domain.product.v1.GetResourceItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.Resource resource = 1;
     */
    resource?: Resource;
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
 * Describes the message domain.product.v1.GetResourceItemPageDataResponse.
 * Use `create(GetResourceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetResourceItemPageDataResponseSchema: GenMessage<GetResourceItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.ResourceDomainService
 */
export declare const ResourceDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.CreateResource
     */
    createResource: {
        methodKind: "unary";
        input: typeof CreateResourceRequestSchema;
        output: typeof CreateResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.ReadResource
     */
    readResource: {
        methodKind: "unary";
        input: typeof ReadResourceRequestSchema;
        output: typeof ReadResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.UpdateResource
     */
    updateResource: {
        methodKind: "unary";
        input: typeof UpdateResourceRequestSchema;
        output: typeof UpdateResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.DeleteResource
     */
    deleteResource: {
        methodKind: "unary";
        input: typeof DeleteResourceRequestSchema;
        output: typeof DeleteResourceResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.ListResources
     */
    listResources: {
        methodKind: "unary";
        input: typeof ListResourcesRequestSchema;
        output: typeof ListResourcesResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.GetResourceListPageData
     */
    getResourceListPageData: {
        methodKind: "unary";
        input: typeof GetResourceListPageDataRequestSchema;
        output: typeof GetResourceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.ResourceDomainService.GetResourceItemPageData
     */
    getResourceItemPageData: {
        methodKind: "unary";
        input: typeof GetResourceItemPageDataRequestSchema;
        output: typeof GetResourceItemPageDataResponseSchema;
    };
}>;
