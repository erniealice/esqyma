import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Category } from "../../common/category_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/client_category/client_category.proto.
 */
export declare const file_domain_entity_client_category_client_category: GenFile;
/**
 * ClientCategory represents a category for organizing clients.
 * It references the common Category entity for reusability.
 *
 * @generated from message domain.entity.v1.ClientCategory
 */
export type ClientCategory = Message<"domain.entity.v1.ClientCategory"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string client_id = 2;
     */
    clientId: string;
    /**
     * @generated from field: string category_id = 3;
     */
    categoryId: string;
    /**
     * @generated from field: domain.common.v1.Category category = 4;
     */
    category?: Category;
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
     * @generated from field: bool active = 9;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.ClientCategory.
 * Use `create(ClientCategorySchema)` to create a new message.
 */
export declare const ClientCategorySchema: GenMessage<ClientCategory>;
/**
 * @generated from message domain.entity.v1.CreateClientCategoryRequest
 */
export type CreateClientCategoryRequest = Message<"domain.entity.v1.CreateClientCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientCategory data = 1;
     */
    data?: ClientCategory;
};
/**
 * Describes the message domain.entity.v1.CreateClientCategoryRequest.
 * Use `create(CreateClientCategoryRequestSchema)` to create a new message.
 */
export declare const CreateClientCategoryRequestSchema: GenMessage<CreateClientCategoryRequest>;
/**
 * @generated from message domain.entity.v1.CreateClientCategoryResponse
 */
export type CreateClientCategoryResponse = Message<"domain.entity.v1.CreateClientCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientCategory data = 1;
     */
    data: ClientCategory[];
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
 * Describes the message domain.entity.v1.CreateClientCategoryResponse.
 * Use `create(CreateClientCategoryResponseSchema)` to create a new message.
 */
export declare const CreateClientCategoryResponseSchema: GenMessage<CreateClientCategoryResponse>;
/**
 * @generated from message domain.entity.v1.ReadClientCategoryRequest
 */
export type ReadClientCategoryRequest = Message<"domain.entity.v1.ReadClientCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientCategory data = 1;
     */
    data?: ClientCategory;
};
/**
 * Describes the message domain.entity.v1.ReadClientCategoryRequest.
 * Use `create(ReadClientCategoryRequestSchema)` to create a new message.
 */
export declare const ReadClientCategoryRequestSchema: GenMessage<ReadClientCategoryRequest>;
/**
 * @generated from message domain.entity.v1.ReadClientCategoryResponse
 */
export type ReadClientCategoryResponse = Message<"domain.entity.v1.ReadClientCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientCategory data = 1;
     */
    data: ClientCategory[];
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
 * Describes the message domain.entity.v1.ReadClientCategoryResponse.
 * Use `create(ReadClientCategoryResponseSchema)` to create a new message.
 */
export declare const ReadClientCategoryResponseSchema: GenMessage<ReadClientCategoryResponse>;
/**
 * @generated from message domain.entity.v1.UpdateClientCategoryRequest
 */
export type UpdateClientCategoryRequest = Message<"domain.entity.v1.UpdateClientCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientCategory data = 1;
     */
    data?: ClientCategory;
};
/**
 * Describes the message domain.entity.v1.UpdateClientCategoryRequest.
 * Use `create(UpdateClientCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateClientCategoryRequestSchema: GenMessage<UpdateClientCategoryRequest>;
/**
 * @generated from message domain.entity.v1.UpdateClientCategoryResponse
 */
export type UpdateClientCategoryResponse = Message<"domain.entity.v1.UpdateClientCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientCategory data = 1;
     */
    data: ClientCategory[];
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
 * Describes the message domain.entity.v1.UpdateClientCategoryResponse.
 * Use `create(UpdateClientCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateClientCategoryResponseSchema: GenMessage<UpdateClientCategoryResponse>;
/**
 * @generated from message domain.entity.v1.DeleteClientCategoryRequest
 */
export type DeleteClientCategoryRequest = Message<"domain.entity.v1.DeleteClientCategoryRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientCategory data = 1;
     */
    data?: ClientCategory;
};
/**
 * Describes the message domain.entity.v1.DeleteClientCategoryRequest.
 * Use `create(DeleteClientCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteClientCategoryRequestSchema: GenMessage<DeleteClientCategoryRequest>;
/**
 * @generated from message domain.entity.v1.DeleteClientCategoryResponse
 */
export type DeleteClientCategoryResponse = Message<"domain.entity.v1.DeleteClientCategoryResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteClientCategoryResponse.
 * Use `create(DeleteClientCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteClientCategoryResponseSchema: GenMessage<DeleteClientCategoryResponse>;
/**
 * @generated from message domain.entity.v1.ListClientCategoriesRequest
 */
export type ListClientCategoriesRequest = Message<"domain.entity.v1.ListClientCategoriesRequest"> & {
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
 * Describes the message domain.entity.v1.ListClientCategoriesRequest.
 * Use `create(ListClientCategoriesRequestSchema)` to create a new message.
 */
export declare const ListClientCategoriesRequestSchema: GenMessage<ListClientCategoriesRequest>;
/**
 * @generated from message domain.entity.v1.ListClientCategoriesResponse
 */
export type ListClientCategoriesResponse = Message<"domain.entity.v1.ListClientCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientCategory data = 1;
     */
    data: ClientCategory[];
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
 * Describes the message domain.entity.v1.ListClientCategoriesResponse.
 * Use `create(ListClientCategoriesResponseSchema)` to create a new message.
 */
export declare const ListClientCategoriesResponseSchema: GenMessage<ListClientCategoriesResponse>;
/**
 * @generated from message domain.entity.v1.GetClientCategoryListPageDataRequest
 */
export type GetClientCategoryListPageDataRequest = Message<"domain.entity.v1.GetClientCategoryListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetClientCategoryListPageDataRequest.
 * Use `create(GetClientCategoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientCategoryListPageDataRequestSchema: GenMessage<GetClientCategoryListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientCategoryListPageDataResponse
 */
export type GetClientCategoryListPageDataResponse = Message<"domain.entity.v1.GetClientCategoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientCategory client_category_list = 1;
     */
    clientCategoryList: ClientCategory[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.GetClientCategoryListPageDataResponse.
 * Use `create(GetClientCategoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientCategoryListPageDataResponseSchema: GenMessage<GetClientCategoryListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetClientCategoryItemPageDataRequest
 */
export type GetClientCategoryItemPageDataRequest = Message<"domain.entity.v1.GetClientCategoryItemPageDataRequest"> & {
    /**
     * @generated from field: string client_category_id = 1;
     */
    clientCategoryId: string;
};
/**
 * Describes the message domain.entity.v1.GetClientCategoryItemPageDataRequest.
 * Use `create(GetClientCategoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientCategoryItemPageDataRequestSchema: GenMessage<GetClientCategoryItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientCategoryItemPageDataResponse
 */
export type GetClientCategoryItemPageDataResponse = Message<"domain.entity.v1.GetClientCategoryItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.ClientCategory client_category = 1;
     */
    clientCategory?: ClientCategory;
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
 * Describes the message domain.entity.v1.GetClientCategoryItemPageDataResponse.
 * Use `create(GetClientCategoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientCategoryItemPageDataResponseSchema: GenMessage<GetClientCategoryItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.ClientCategoryDomainService
 */
export declare const ClientCategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.CreateClientCategory
     */
    createClientCategory: {
        methodKind: "unary";
        input: typeof CreateClientCategoryRequestSchema;
        output: typeof CreateClientCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.ReadClientCategory
     */
    readClientCategory: {
        methodKind: "unary";
        input: typeof ReadClientCategoryRequestSchema;
        output: typeof ReadClientCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.UpdateClientCategory
     */
    updateClientCategory: {
        methodKind: "unary";
        input: typeof UpdateClientCategoryRequestSchema;
        output: typeof UpdateClientCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.DeleteClientCategory
     */
    deleteClientCategory: {
        methodKind: "unary";
        input: typeof DeleteClientCategoryRequestSchema;
        output: typeof DeleteClientCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.ListClientCategories
     */
    listClientCategories: {
        methodKind: "unary";
        input: typeof ListClientCategoriesRequestSchema;
        output: typeof ListClientCategoriesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.GetClientCategoryListPageData
     */
    getClientCategoryListPageData: {
        methodKind: "unary";
        input: typeof GetClientCategoryListPageDataRequestSchema;
        output: typeof GetClientCategoryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientCategoryDomainService.GetClientCategoryItemPageData
     */
    getClientCategoryItemPageData: {
        methodKind: "unary";
        input: typeof GetClientCategoryItemPageDataRequestSchema;
        output: typeof GetClientCategoryItemPageDataResponseSchema;
    };
}>;
