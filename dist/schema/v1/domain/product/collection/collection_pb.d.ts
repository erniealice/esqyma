import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { CollectionPlan } from "../collection_plan/collection_plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/collection/collection.proto.
 */
export declare const file_domain_product_collection_collection: GenFile;
/**
 * @generated from message domain.product.v1.Collection
 */
export type Collection = Message<"domain.product.v1.Collection"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: repeated domain.product.v1.CollectionPlan collection_plans = 9;
     */
    collectionPlans: CollectionPlan[];
};
/**
 * Describes the message domain.product.v1.Collection.
 * Use `create(CollectionSchema)` to create a new message.
 */
export declare const CollectionSchema: GenMessage<Collection>;
/**
 * @generated from message domain.product.v1.CreateCollectionRequest
 */
export type CreateCollectionRequest = Message<"domain.product.v1.CreateCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.product.v1.CreateCollectionRequest.
 * Use `create(CreateCollectionRequestSchema)` to create a new message.
 */
export declare const CreateCollectionRequestSchema: GenMessage<CreateCollectionRequest>;
/**
 * @generated from message domain.product.v1.CreateCollectionResponse
 */
export type CreateCollectionResponse = Message<"domain.product.v1.CreateCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.product.v1.CreateCollectionResponse.
 * Use `create(CreateCollectionResponseSchema)` to create a new message.
 */
export declare const CreateCollectionResponseSchema: GenMessage<CreateCollectionResponse>;
/**
 * @generated from message domain.product.v1.ReadCollectionRequest
 */
export type ReadCollectionRequest = Message<"domain.product.v1.ReadCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.product.v1.ReadCollectionRequest.
 * Use `create(ReadCollectionRequestSchema)` to create a new message.
 */
export declare const ReadCollectionRequestSchema: GenMessage<ReadCollectionRequest>;
/**
 * @generated from message domain.product.v1.ReadCollectionResponse
 */
export type ReadCollectionResponse = Message<"domain.product.v1.ReadCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.product.v1.ReadCollectionResponse.
 * Use `create(ReadCollectionResponseSchema)` to create a new message.
 */
export declare const ReadCollectionResponseSchema: GenMessage<ReadCollectionResponse>;
/**
 * @generated from message domain.product.v1.UpdateCollectionRequest
 */
export type UpdateCollectionRequest = Message<"domain.product.v1.UpdateCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.product.v1.UpdateCollectionRequest.
 * Use `create(UpdateCollectionRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionRequestSchema: GenMessage<UpdateCollectionRequest>;
/**
 * @generated from message domain.product.v1.UpdateCollectionResponse
 */
export type UpdateCollectionResponse = Message<"domain.product.v1.UpdateCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.product.v1.UpdateCollectionResponse.
 * Use `create(UpdateCollectionResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionResponseSchema: GenMessage<UpdateCollectionResponse>;
/**
 * @generated from message domain.product.v1.DeleteCollectionRequest
 */
export type DeleteCollectionRequest = Message<"domain.product.v1.DeleteCollectionRequest"> & {
    /**
     * @generated from field: domain.product.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.product.v1.DeleteCollectionRequest.
 * Use `create(DeleteCollectionRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionRequestSchema: GenMessage<DeleteCollectionRequest>;
/**
 * @generated from message domain.product.v1.DeleteCollectionResponse
 */
export type DeleteCollectionResponse = Message<"domain.product.v1.DeleteCollectionResponse"> & {
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
 * Describes the message domain.product.v1.DeleteCollectionResponse.
 * Use `create(DeleteCollectionResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionResponseSchema: GenMessage<DeleteCollectionResponse>;
/**
 * @generated from message domain.product.v1.ListCollectionsRequest
 */
export type ListCollectionsRequest = Message<"domain.product.v1.ListCollectionsRequest"> & {
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
 * Describes the message domain.product.v1.ListCollectionsRequest.
 * Use `create(ListCollectionsRequestSchema)` to create a new message.
 */
export declare const ListCollectionsRequestSchema: GenMessage<ListCollectionsRequest>;
/**
 * @generated from message domain.product.v1.ListCollectionsResponse
 */
export type ListCollectionsResponse = Message<"domain.product.v1.ListCollectionsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.product.v1.ListCollectionsResponse.
 * Use `create(ListCollectionsResponseSchema)` to create a new message.
 */
export declare const ListCollectionsResponseSchema: GenMessage<ListCollectionsResponse>;
/**
 * @generated from message domain.product.v1.GetCollectionParentRequest
 */
export type GetCollectionParentRequest = Message<"domain.product.v1.GetCollectionParentRequest"> & {
    /**
     * @generated from field: string collection_id = 1;
     */
    collectionId: string;
};
/**
 * Describes the message domain.product.v1.GetCollectionParentRequest.
 * Use `create(GetCollectionParentRequestSchema)` to create a new message.
 */
export declare const GetCollectionParentRequestSchema: GenMessage<GetCollectionParentRequest>;
/**
 * @generated from message domain.product.v1.GetCollectionParentResponse
 */
export type GetCollectionParentResponse = Message<"domain.product.v1.GetCollectionParentResponse"> & {
    /**
     * @generated from field: domain.product.v1.Collection data = 1;
     */
    data?: Collection;
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
 * Describes the message domain.product.v1.GetCollectionParentResponse.
 * Use `create(GetCollectionParentResponseSchema)` to create a new message.
 */
export declare const GetCollectionParentResponseSchema: GenMessage<GetCollectionParentResponse>;
/**
 * @generated from message domain.product.v1.GetRootCollectionsRequest
 */
export type GetRootCollectionsRequest = Message<"domain.product.v1.GetRootCollectionsRequest"> & {};
/**
 * Describes the message domain.product.v1.GetRootCollectionsRequest.
 * Use `create(GetRootCollectionsRequestSchema)` to create a new message.
 */
export declare const GetRootCollectionsRequestSchema: GenMessage<GetRootCollectionsRequest>;
/**
 * @generated from message domain.product.v1.GetRootCollectionsResponse
 */
export type GetRootCollectionsResponse = Message<"domain.product.v1.GetRootCollectionsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.product.v1.GetRootCollectionsResponse.
 * Use `create(GetRootCollectionsResponseSchema)` to create a new message.
 */
export declare const GetRootCollectionsResponseSchema: GenMessage<GetRootCollectionsResponse>;
/**
 * @generated from message domain.product.v1.GetCollectionListPageDataRequest
 */
export type GetCollectionListPageDataRequest = Message<"domain.product.v1.GetCollectionListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetCollectionListPageDataRequest.
 * Use `create(GetCollectionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionListPageDataRequestSchema: GenMessage<GetCollectionListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetCollectionListPageDataResponse
 */
export type GetCollectionListPageDataResponse = Message<"domain.product.v1.GetCollectionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Collection collection_list = 1;
     */
    collectionList: Collection[];
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
 * Describes the message domain.product.v1.GetCollectionListPageDataResponse.
 * Use `create(GetCollectionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionListPageDataResponseSchema: GenMessage<GetCollectionListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetCollectionItemPageDataRequest
 */
export type GetCollectionItemPageDataRequest = Message<"domain.product.v1.GetCollectionItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_id = 1;
     */
    collectionId: string;
};
/**
 * Describes the message domain.product.v1.GetCollectionItemPageDataRequest.
 * Use `create(GetCollectionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionItemPageDataRequestSchema: GenMessage<GetCollectionItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetCollectionItemPageDataResponse
 */
export type GetCollectionItemPageDataResponse = Message<"domain.product.v1.GetCollectionItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.Collection collection = 1;
     */
    collection?: Collection;
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
 * Describes the message domain.product.v1.GetCollectionItemPageDataResponse.
 * Use `create(GetCollectionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionItemPageDataResponseSchema: GenMessage<GetCollectionItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.CollectionDomainService
 */
export declare const CollectionDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.CreateCollection
     */
    createCollection: {
        methodKind: "unary";
        input: typeof CreateCollectionRequestSchema;
        output: typeof CreateCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.ReadCollection
     */
    readCollection: {
        methodKind: "unary";
        input: typeof ReadCollectionRequestSchema;
        output: typeof ReadCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.UpdateCollection
     */
    updateCollection: {
        methodKind: "unary";
        input: typeof UpdateCollectionRequestSchema;
        output: typeof UpdateCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.DeleteCollection
     */
    deleteCollection: {
        methodKind: "unary";
        input: typeof DeleteCollectionRequestSchema;
        output: typeof DeleteCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.ListCollections
     */
    listCollections: {
        methodKind: "unary";
        input: typeof ListCollectionsRequestSchema;
        output: typeof ListCollectionsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.GetCollectionParent
     */
    getCollectionParent: {
        methodKind: "unary";
        input: typeof GetCollectionParentRequestSchema;
        output: typeof GetCollectionParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.GetRootCollections
     */
    getRootCollections: {
        methodKind: "unary";
        input: typeof GetRootCollectionsRequestSchema;
        output: typeof GetRootCollectionsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.GetCollectionListPageData
     */
    getCollectionListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionListPageDataRequestSchema;
        output: typeof GetCollectionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionDomainService.GetCollectionItemPageData
     */
    getCollectionItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionItemPageDataRequestSchema;
        output: typeof GetCollectionItemPageDataResponseSchema;
    };
}>;
