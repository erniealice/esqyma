import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Location } from "../../entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/plan_location/plan_location.proto.
 */
export declare const file_domain_subscription_plan_location_plan_location: GenFile;
/**
 * @generated from message domain.subscription.v1.PlanLocation
 */
export type PlanLocation = Message<"domain.subscription.v1.PlanLocation"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string plan_id = 3;
     */
    planId: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 4;
     */
    location?: Location;
    /**
     * @generated from field: string location_id = 5;
     */
    locationId: string;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 7;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 8;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 9;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.PlanLocation.
 * Use `create(PlanLocationSchema)` to create a new message.
 */
export declare const PlanLocationSchema: GenMessage<PlanLocation>;
/**
 * @generated from message domain.subscription.v1.CreatePlanLocationRequest
 */
export type CreatePlanLocationRequest = Message<"domain.subscription.v1.CreatePlanLocationRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanLocation data = 1;
     */
    data?: PlanLocation;
};
/**
 * Describes the message domain.subscription.v1.CreatePlanLocationRequest.
 * Use `create(CreatePlanLocationRequestSchema)` to create a new message.
 */
export declare const CreatePlanLocationRequestSchema: GenMessage<CreatePlanLocationRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePlanLocationResponse
 */
export type CreatePlanLocationResponse = Message<"domain.subscription.v1.CreatePlanLocationResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanLocation data = 1;
     */
    data: PlanLocation[];
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
 * Describes the message domain.subscription.v1.CreatePlanLocationResponse.
 * Use `create(CreatePlanLocationResponseSchema)` to create a new message.
 */
export declare const CreatePlanLocationResponseSchema: GenMessage<CreatePlanLocationResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPlanLocationRequest
 */
export type ReadPlanLocationRequest = Message<"domain.subscription.v1.ReadPlanLocationRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanLocation data = 1;
     */
    data?: PlanLocation;
};
/**
 * Describes the message domain.subscription.v1.ReadPlanLocationRequest.
 * Use `create(ReadPlanLocationRequestSchema)` to create a new message.
 */
export declare const ReadPlanLocationRequestSchema: GenMessage<ReadPlanLocationRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPlanLocationResponse
 */
export type ReadPlanLocationResponse = Message<"domain.subscription.v1.ReadPlanLocationResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanLocation data = 1;
     */
    data: PlanLocation[];
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
 * Describes the message domain.subscription.v1.ReadPlanLocationResponse.
 * Use `create(ReadPlanLocationResponseSchema)` to create a new message.
 */
export declare const ReadPlanLocationResponseSchema: GenMessage<ReadPlanLocationResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanLocationRequest
 */
export type UpdatePlanLocationRequest = Message<"domain.subscription.v1.UpdatePlanLocationRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanLocation data = 1;
     */
    data?: PlanLocation;
};
/**
 * Describes the message domain.subscription.v1.UpdatePlanLocationRequest.
 * Use `create(UpdatePlanLocationRequestSchema)` to create a new message.
 */
export declare const UpdatePlanLocationRequestSchema: GenMessage<UpdatePlanLocationRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanLocationResponse
 */
export type UpdatePlanLocationResponse = Message<"domain.subscription.v1.UpdatePlanLocationResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanLocation data = 1;
     */
    data: PlanLocation[];
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
 * Describes the message domain.subscription.v1.UpdatePlanLocationResponse.
 * Use `create(UpdatePlanLocationResponseSchema)` to create a new message.
 */
export declare const UpdatePlanLocationResponseSchema: GenMessage<UpdatePlanLocationResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePlanLocationRequest
 */
export type DeletePlanLocationRequest = Message<"domain.subscription.v1.DeletePlanLocationRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanLocation data = 1;
     */
    data?: PlanLocation;
};
/**
 * Describes the message domain.subscription.v1.DeletePlanLocationRequest.
 * Use `create(DeletePlanLocationRequestSchema)` to create a new message.
 */
export declare const DeletePlanLocationRequestSchema: GenMessage<DeletePlanLocationRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePlanLocationResponse
 */
export type DeletePlanLocationResponse = Message<"domain.subscription.v1.DeletePlanLocationResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePlanLocationResponse.
 * Use `create(DeletePlanLocationResponseSchema)` to create a new message.
 */
export declare const DeletePlanLocationResponseSchema: GenMessage<DeletePlanLocationResponse>;
/**
 * @generated from message domain.subscription.v1.ListPlanLocationsRequest
 */
export type ListPlanLocationsRequest = Message<"domain.subscription.v1.ListPlanLocationsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPlanLocationsRequest.
 * Use `create(ListPlanLocationsRequestSchema)` to create a new message.
 */
export declare const ListPlanLocationsRequestSchema: GenMessage<ListPlanLocationsRequest>;
/**
 * @generated from message domain.subscription.v1.ListPlanLocationsResponse
 */
export type ListPlanLocationsResponse = Message<"domain.subscription.v1.ListPlanLocationsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanLocation data = 1;
     */
    data: PlanLocation[];
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
 * Describes the message domain.subscription.v1.ListPlanLocationsResponse.
 * Use `create(ListPlanLocationsResponseSchema)` to create a new message.
 */
export declare const ListPlanLocationsResponseSchema: GenMessage<ListPlanLocationsResponse>;
/**
 * NEW: Enhanced list page data request with pagination, filtering, sorting, search
 *
 * @generated from message domain.subscription.v1.GetPlanLocationListPageDataRequest
 */
export type GetPlanLocationListPageDataRequest = Message<"domain.subscription.v1.GetPlanLocationListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetPlanLocationListPageDataRequest.
 * Use `create(GetPlanLocationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanLocationListPageDataRequestSchema: GenMessage<GetPlanLocationListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPlanLocationListPageDataResponse
 */
export type GetPlanLocationListPageDataResponse = Message<"domain.subscription.v1.GetPlanLocationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanLocation plan_location_list = 1;
     */
    planLocationList: PlanLocation[];
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
 * Describes the message domain.subscription.v1.GetPlanLocationListPageDataResponse.
 * Use `create(GetPlanLocationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanLocationListPageDataResponseSchema: GenMessage<GetPlanLocationListPageDataResponse>;
/**
 * NEW: Enhanced item page data request
 *
 * @generated from message domain.subscription.v1.GetPlanLocationItemPageDataRequest
 */
export type GetPlanLocationItemPageDataRequest = Message<"domain.subscription.v1.GetPlanLocationItemPageDataRequest"> & {
    /**
     * @generated from field: string plan_location_id = 1;
     */
    planLocationId: string;
};
/**
 * Describes the message domain.subscription.v1.GetPlanLocationItemPageDataRequest.
 * Use `create(GetPlanLocationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanLocationItemPageDataRequestSchema: GenMessage<GetPlanLocationItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPlanLocationItemPageDataResponse
 */
export type GetPlanLocationItemPageDataResponse = Message<"domain.subscription.v1.GetPlanLocationItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.PlanLocation plan_location = 1;
     */
    planLocation?: PlanLocation;
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
 * Describes the message domain.subscription.v1.GetPlanLocationItemPageDataResponse.
 * Use `create(GetPlanLocationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanLocationItemPageDataResponseSchema: GenMessage<GetPlanLocationItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.PlanLocationDomainService
 */
export declare const PlanLocationDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.CreatePlanLocation
     */
    createPlanLocation: {
        methodKind: "unary";
        input: typeof CreatePlanLocationRequestSchema;
        output: typeof CreatePlanLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.ReadPlanLocation
     */
    readPlanLocation: {
        methodKind: "unary";
        input: typeof ReadPlanLocationRequestSchema;
        output: typeof ReadPlanLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.UpdatePlanLocation
     */
    updatePlanLocation: {
        methodKind: "unary";
        input: typeof UpdatePlanLocationRequestSchema;
        output: typeof UpdatePlanLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.DeletePlanLocation
     */
    deletePlanLocation: {
        methodKind: "unary";
        input: typeof DeletePlanLocationRequestSchema;
        output: typeof DeletePlanLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.ListPlanLocations
     */
    listPlanLocations: {
        methodKind: "unary";
        input: typeof ListPlanLocationsRequestSchema;
        output: typeof ListPlanLocationsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.GetPlanLocationListPageData
     */
    getPlanLocationListPageData: {
        methodKind: "unary";
        input: typeof GetPlanLocationListPageDataRequestSchema;
        output: typeof GetPlanLocationListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.PlanLocationDomainService.GetPlanLocationItemPageData
     */
    getPlanLocationItemPageData: {
        methodKind: "unary";
        input: typeof GetPlanLocationItemPageDataRequestSchema;
        output: typeof GetPlanLocationItemPageDataResponseSchema;
    };
}>;
