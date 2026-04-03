import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/collection_plan/collection_plan.proto.
 */
export declare const file_domain_product_collection_plan_collection_plan: GenFile;
/**
 * @generated from message domain.product.v1.CollectionPlan
 */
export type CollectionPlan = Message<"domain.product.v1.CollectionPlan"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string collection_id = 2;
     */
    collectionId: string;
    /**
     * @generated from field: string plan_id = 3;
     */
    planId: string;
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
};
/**
 * Describes the message domain.product.v1.CollectionPlan.
 * Use `create(CollectionPlanSchema)` to create a new message.
 */
export declare const CollectionPlanSchema: GenMessage<CollectionPlan>;
/**
 * @generated from message domain.product.v1.CreateCollectionPlanRequest
 */
export type CreateCollectionPlanRequest = Message<"domain.product.v1.CreateCollectionPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionPlan data = 1;
     */
    data?: CollectionPlan;
};
/**
 * Describes the message domain.product.v1.CreateCollectionPlanRequest.
 * Use `create(CreateCollectionPlanRequestSchema)` to create a new message.
 */
export declare const CreateCollectionPlanRequestSchema: GenMessage<CreateCollectionPlanRequest>;
/**
 * @generated from message domain.product.v1.CreateCollectionPlanResponse
 */
export type CreateCollectionPlanResponse = Message<"domain.product.v1.CreateCollectionPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionPlan data = 1;
     */
    data: CollectionPlan[];
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
 * Describes the message domain.product.v1.CreateCollectionPlanResponse.
 * Use `create(CreateCollectionPlanResponseSchema)` to create a new message.
 */
export declare const CreateCollectionPlanResponseSchema: GenMessage<CreateCollectionPlanResponse>;
/**
 * @generated from message domain.product.v1.ReadCollectionPlanRequest
 */
export type ReadCollectionPlanRequest = Message<"domain.product.v1.ReadCollectionPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionPlan data = 1;
     */
    data?: CollectionPlan;
};
/**
 * Describes the message domain.product.v1.ReadCollectionPlanRequest.
 * Use `create(ReadCollectionPlanRequestSchema)` to create a new message.
 */
export declare const ReadCollectionPlanRequestSchema: GenMessage<ReadCollectionPlanRequest>;
/**
 * @generated from message domain.product.v1.ReadCollectionPlanResponse
 */
export type ReadCollectionPlanResponse = Message<"domain.product.v1.ReadCollectionPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionPlan data = 1;
     */
    data: CollectionPlan[];
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
 * Describes the message domain.product.v1.ReadCollectionPlanResponse.
 * Use `create(ReadCollectionPlanResponseSchema)` to create a new message.
 */
export declare const ReadCollectionPlanResponseSchema: GenMessage<ReadCollectionPlanResponse>;
/**
 * @generated from message domain.product.v1.UpdateCollectionPlanRequest
 */
export type UpdateCollectionPlanRequest = Message<"domain.product.v1.UpdateCollectionPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionPlan data = 1;
     */
    data?: CollectionPlan;
};
/**
 * Describes the message domain.product.v1.UpdateCollectionPlanRequest.
 * Use `create(UpdateCollectionPlanRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionPlanRequestSchema: GenMessage<UpdateCollectionPlanRequest>;
/**
 * @generated from message domain.product.v1.UpdateCollectionPlanResponse
 */
export type UpdateCollectionPlanResponse = Message<"domain.product.v1.UpdateCollectionPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionPlan data = 1;
     */
    data: CollectionPlan[];
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
 * Describes the message domain.product.v1.UpdateCollectionPlanResponse.
 * Use `create(UpdateCollectionPlanResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionPlanResponseSchema: GenMessage<UpdateCollectionPlanResponse>;
/**
 * @generated from message domain.product.v1.DeleteCollectionPlanRequest
 */
export type DeleteCollectionPlanRequest = Message<"domain.product.v1.DeleteCollectionPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionPlan data = 1;
     */
    data?: CollectionPlan;
};
/**
 * Describes the message domain.product.v1.DeleteCollectionPlanRequest.
 * Use `create(DeleteCollectionPlanRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionPlanRequestSchema: GenMessage<DeleteCollectionPlanRequest>;
/**
 * @generated from message domain.product.v1.DeleteCollectionPlanResponse
 */
export type DeleteCollectionPlanResponse = Message<"domain.product.v1.DeleteCollectionPlanResponse"> & {
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
 * Describes the message domain.product.v1.DeleteCollectionPlanResponse.
 * Use `create(DeleteCollectionPlanResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionPlanResponseSchema: GenMessage<DeleteCollectionPlanResponse>;
/**
 * @generated from message domain.product.v1.ListCollectionPlansRequest
 */
export type ListCollectionPlansRequest = Message<"domain.product.v1.ListCollectionPlansRequest"> & {
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
 * Describes the message domain.product.v1.ListCollectionPlansRequest.
 * Use `create(ListCollectionPlansRequestSchema)` to create a new message.
 */
export declare const ListCollectionPlansRequestSchema: GenMessage<ListCollectionPlansRequest>;
/**
 * @generated from message domain.product.v1.ListCollectionPlansResponse
 */
export type ListCollectionPlansResponse = Message<"domain.product.v1.ListCollectionPlansResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionPlan data = 1;
     */
    data: CollectionPlan[];
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
 * Describes the message domain.product.v1.ListCollectionPlansResponse.
 * Use `create(ListCollectionPlansResponseSchema)` to create a new message.
 */
export declare const ListCollectionPlansResponseSchema: GenMessage<ListCollectionPlansResponse>;
/**
 * @generated from message domain.product.v1.GetCollectionPlanListPageDataRequest
 */
export type GetCollectionPlanListPageDataRequest = Message<"domain.product.v1.GetCollectionPlanListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetCollectionPlanListPageDataRequest.
 * Use `create(GetCollectionPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionPlanListPageDataRequestSchema: GenMessage<GetCollectionPlanListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetCollectionPlanListPageDataResponse
 */
export type GetCollectionPlanListPageDataResponse = Message<"domain.product.v1.GetCollectionPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionPlan collection_plan_list = 1;
     */
    collectionPlanList: CollectionPlan[];
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
 * Describes the message domain.product.v1.GetCollectionPlanListPageDataResponse.
 * Use `create(GetCollectionPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionPlanListPageDataResponseSchema: GenMessage<GetCollectionPlanListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetCollectionPlanItemPageDataRequest
 */
export type GetCollectionPlanItemPageDataRequest = Message<"domain.product.v1.GetCollectionPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_plan_id = 1;
     */
    collectionPlanId: string;
};
/**
 * Describes the message domain.product.v1.GetCollectionPlanItemPageDataRequest.
 * Use `create(GetCollectionPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionPlanItemPageDataRequestSchema: GenMessage<GetCollectionPlanItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetCollectionPlanItemPageDataResponse
 */
export type GetCollectionPlanItemPageDataResponse = Message<"domain.product.v1.GetCollectionPlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.CollectionPlan collection_plan = 1;
     */
    collectionPlan?: CollectionPlan;
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
 * Describes the message domain.product.v1.GetCollectionPlanItemPageDataResponse.
 * Use `create(GetCollectionPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionPlanItemPageDataResponseSchema: GenMessage<GetCollectionPlanItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.CollectionPlanDomainService
 */
export declare const CollectionPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.CreateCollectionPlan
     */
    createCollectionPlan: {
        methodKind: "unary";
        input: typeof CreateCollectionPlanRequestSchema;
        output: typeof CreateCollectionPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.ReadCollectionPlan
     */
    readCollectionPlan: {
        methodKind: "unary";
        input: typeof ReadCollectionPlanRequestSchema;
        output: typeof ReadCollectionPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.UpdateCollectionPlan
     */
    updateCollectionPlan: {
        methodKind: "unary";
        input: typeof UpdateCollectionPlanRequestSchema;
        output: typeof UpdateCollectionPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.DeleteCollectionPlan
     */
    deleteCollectionPlan: {
        methodKind: "unary";
        input: typeof DeleteCollectionPlanRequestSchema;
        output: typeof DeleteCollectionPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.ListCollectionPlans
     */
    listCollectionPlans: {
        methodKind: "unary";
        input: typeof ListCollectionPlansRequestSchema;
        output: typeof ListCollectionPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.GetCollectionPlanListPageData
     */
    getCollectionPlanListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionPlanListPageDataRequestSchema;
        output: typeof GetCollectionPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionPlanDomainService.GetCollectionPlanItemPageData
     */
    getCollectionPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionPlanItemPageDataRequestSchema;
        output: typeof GetCollectionPlanItemPageDataResponseSchema;
    };
}>;
