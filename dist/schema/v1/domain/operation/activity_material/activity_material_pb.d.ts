import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobActivity } from "../job_activity/job_activity_pb";
import type { Product } from "../../product/product/product_pb";
import type { Location } from "../../entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/activity_material/activity_material.proto.
 */
export declare const file_domain_operation_activity_material_activity_material: GenFile;
/**
 * @generated from message domain.operation.v1.ActivityMaterial
 */
export type ActivityMaterial = Message<"domain.operation.v1.ActivityMaterial"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 2;
     */
    jobActivity?: JobActivity;
    /**
     * @generated from field: string product_id = 3;
     */
    productId: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 4;
     */
    product?: Product;
    /**
     * @generated from field: string unit_of_measure = 5;
     */
    unitOfMeasure: string;
    /**
     * @generated from field: optional string lot_number = 6;
     */
    lotNumber?: string;
    /**
     * @generated from field: optional string location_id = 7;
     */
    locationId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 8;
     */
    location?: Location;
};
/**
 * Describes the message domain.operation.v1.ActivityMaterial.
 * Use `create(ActivityMaterialSchema)` to create a new message.
 */
export declare const ActivityMaterialSchema: GenMessage<ActivityMaterial>;
/**
 * @generated from message domain.operation.v1.CreateActivityMaterialRequest
 */
export type CreateActivityMaterialRequest = Message<"domain.operation.v1.CreateActivityMaterialRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityMaterial data = 1;
     */
    data?: ActivityMaterial;
};
/**
 * Describes the message domain.operation.v1.CreateActivityMaterialRequest.
 * Use `create(CreateActivityMaterialRequestSchema)` to create a new message.
 */
export declare const CreateActivityMaterialRequestSchema: GenMessage<CreateActivityMaterialRequest>;
/**
 * @generated from message domain.operation.v1.CreateActivityMaterialResponse
 */
export type CreateActivityMaterialResponse = Message<"domain.operation.v1.CreateActivityMaterialResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityMaterial data = 1;
     */
    data: ActivityMaterial[];
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
 * Describes the message domain.operation.v1.CreateActivityMaterialResponse.
 * Use `create(CreateActivityMaterialResponseSchema)` to create a new message.
 */
export declare const CreateActivityMaterialResponseSchema: GenMessage<CreateActivityMaterialResponse>;
/**
 * @generated from message domain.operation.v1.ReadActivityMaterialRequest
 */
export type ReadActivityMaterialRequest = Message<"domain.operation.v1.ReadActivityMaterialRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityMaterial data = 1;
     */
    data?: ActivityMaterial;
};
/**
 * Describes the message domain.operation.v1.ReadActivityMaterialRequest.
 * Use `create(ReadActivityMaterialRequestSchema)` to create a new message.
 */
export declare const ReadActivityMaterialRequestSchema: GenMessage<ReadActivityMaterialRequest>;
/**
 * @generated from message domain.operation.v1.ReadActivityMaterialResponse
 */
export type ReadActivityMaterialResponse = Message<"domain.operation.v1.ReadActivityMaterialResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityMaterial data = 1;
     */
    data: ActivityMaterial[];
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
 * Describes the message domain.operation.v1.ReadActivityMaterialResponse.
 * Use `create(ReadActivityMaterialResponseSchema)` to create a new message.
 */
export declare const ReadActivityMaterialResponseSchema: GenMessage<ReadActivityMaterialResponse>;
/**
 * @generated from message domain.operation.v1.UpdateActivityMaterialRequest
 */
export type UpdateActivityMaterialRequest = Message<"domain.operation.v1.UpdateActivityMaterialRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityMaterial data = 1;
     */
    data?: ActivityMaterial;
};
/**
 * Describes the message domain.operation.v1.UpdateActivityMaterialRequest.
 * Use `create(UpdateActivityMaterialRequestSchema)` to create a new message.
 */
export declare const UpdateActivityMaterialRequestSchema: GenMessage<UpdateActivityMaterialRequest>;
/**
 * @generated from message domain.operation.v1.UpdateActivityMaterialResponse
 */
export type UpdateActivityMaterialResponse = Message<"domain.operation.v1.UpdateActivityMaterialResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityMaterial data = 1;
     */
    data: ActivityMaterial[];
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
 * Describes the message domain.operation.v1.UpdateActivityMaterialResponse.
 * Use `create(UpdateActivityMaterialResponseSchema)` to create a new message.
 */
export declare const UpdateActivityMaterialResponseSchema: GenMessage<UpdateActivityMaterialResponse>;
/**
 * @generated from message domain.operation.v1.DeleteActivityMaterialRequest
 */
export type DeleteActivityMaterialRequest = Message<"domain.operation.v1.DeleteActivityMaterialRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityMaterial data = 1;
     */
    data?: ActivityMaterial;
};
/**
 * Describes the message domain.operation.v1.DeleteActivityMaterialRequest.
 * Use `create(DeleteActivityMaterialRequestSchema)` to create a new message.
 */
export declare const DeleteActivityMaterialRequestSchema: GenMessage<DeleteActivityMaterialRequest>;
/**
 * @generated from message domain.operation.v1.DeleteActivityMaterialResponse
 */
export type DeleteActivityMaterialResponse = Message<"domain.operation.v1.DeleteActivityMaterialResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteActivityMaterialResponse.
 * Use `create(DeleteActivityMaterialResponseSchema)` to create a new message.
 */
export declare const DeleteActivityMaterialResponseSchema: GenMessage<DeleteActivityMaterialResponse>;
/**
 * @generated from message domain.operation.v1.ListActivityMaterialsRequest
 */
export type ListActivityMaterialsRequest = Message<"domain.operation.v1.ListActivityMaterialsRequest"> & {
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
 * Describes the message domain.operation.v1.ListActivityMaterialsRequest.
 * Use `create(ListActivityMaterialsRequestSchema)` to create a new message.
 */
export declare const ListActivityMaterialsRequestSchema: GenMessage<ListActivityMaterialsRequest>;
/**
 * @generated from message domain.operation.v1.ListActivityMaterialsResponse
 */
export type ListActivityMaterialsResponse = Message<"domain.operation.v1.ListActivityMaterialsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityMaterial data = 1;
     */
    data: ActivityMaterial[];
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
 * Describes the message domain.operation.v1.ListActivityMaterialsResponse.
 * Use `create(ListActivityMaterialsResponseSchema)` to create a new message.
 */
export declare const ListActivityMaterialsResponseSchema: GenMessage<ListActivityMaterialsResponse>;
/**
 * @generated from message domain.operation.v1.GetActivityMaterialListPageDataRequest
 */
export type GetActivityMaterialListPageDataRequest = Message<"domain.operation.v1.GetActivityMaterialListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.operation.v1.GetActivityMaterialListPageDataRequest.
 * Use `create(GetActivityMaterialListPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityMaterialListPageDataRequestSchema: GenMessage<GetActivityMaterialListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetActivityMaterialListPageDataResponse
 */
export type GetActivityMaterialListPageDataResponse = Message<"domain.operation.v1.GetActivityMaterialListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityMaterial activity_material_list = 1;
     */
    activityMaterialList: ActivityMaterial[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.operation.v1.GetActivityMaterialListPageDataResponse.
 * Use `create(GetActivityMaterialListPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityMaterialListPageDataResponseSchema: GenMessage<GetActivityMaterialListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetActivityMaterialItemPageDataRequest
 */
export type GetActivityMaterialItemPageDataRequest = Message<"domain.operation.v1.GetActivityMaterialItemPageDataRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
};
/**
 * Describes the message domain.operation.v1.GetActivityMaterialItemPageDataRequest.
 * Use `create(GetActivityMaterialItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityMaterialItemPageDataRequestSchema: GenMessage<GetActivityMaterialItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetActivityMaterialItemPageDataResponse
 */
export type GetActivityMaterialItemPageDataResponse = Message<"domain.operation.v1.GetActivityMaterialItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ActivityMaterial activity_material = 1;
     */
    activityMaterial?: ActivityMaterial;
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
 * Describes the message domain.operation.v1.GetActivityMaterialItemPageDataResponse.
 * Use `create(GetActivityMaterialItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityMaterialItemPageDataResponseSchema: GenMessage<GetActivityMaterialItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ActivityMaterialDomainService
 */
export declare const ActivityMaterialDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.CreateActivityMaterial
     */
    createActivityMaterial: {
        methodKind: "unary";
        input: typeof CreateActivityMaterialRequestSchema;
        output: typeof CreateActivityMaterialResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.ReadActivityMaterial
     */
    readActivityMaterial: {
        methodKind: "unary";
        input: typeof ReadActivityMaterialRequestSchema;
        output: typeof ReadActivityMaterialResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.UpdateActivityMaterial
     */
    updateActivityMaterial: {
        methodKind: "unary";
        input: typeof UpdateActivityMaterialRequestSchema;
        output: typeof UpdateActivityMaterialResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.DeleteActivityMaterial
     */
    deleteActivityMaterial: {
        methodKind: "unary";
        input: typeof DeleteActivityMaterialRequestSchema;
        output: typeof DeleteActivityMaterialResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.ListActivityMaterials
     */
    listActivityMaterials: {
        methodKind: "unary";
        input: typeof ListActivityMaterialsRequestSchema;
        output: typeof ListActivityMaterialsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.GetActivityMaterialListPageData
     */
    getActivityMaterialListPageData: {
        methodKind: "unary";
        input: typeof GetActivityMaterialListPageDataRequestSchema;
        output: typeof GetActivityMaterialListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityMaterialDomainService.GetActivityMaterialItemPageData
     */
    getActivityMaterialItemPageData: {
        methodKind: "unary";
        input: typeof GetActivityMaterialItemPageDataRequestSchema;
        output: typeof GetActivityMaterialItemPageDataResponseSchema;
    };
}>;
