import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { PlanLocation } from "../plan_location/plan_location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/plan/plan.proto.
 */
export declare const file_domain_subscription_plan_plan: GenFile;
/**
 * @generated from message domain.subscription.v1.Plan
 */
export type Plan = Message<"domain.subscription.v1.Plan"> & {
    /**
     * @generated from field: optional string id = 1;
     */
    id?: string;
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
     * @generated from field: repeated domain.subscription.v1.PlanLocation plan_locations = 9;
     */
    planLocations: PlanLocation[];
    /**
     * @generated from field: optional string thumbnail_url = 10;
     */
    thumbnailUrl?: string;
    /**
     * Suggested values: "schedule", "license", "content", "physical"
     *
     * @generated from field: optional string fulfillment_type = 11;
     */
    fulfillmentType?: string;
};
/**
 * Describes the message domain.subscription.v1.Plan.
 * Use `create(PlanSchema)` to create a new message.
 */
export declare const PlanSchema: GenMessage<Plan>;
/**
 * @generated from message domain.subscription.v1.CreatePlanRequest
 */
export type CreatePlanRequest = Message<"domain.subscription.v1.CreatePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Plan data = 1;
     */
    data?: Plan;
};
/**
 * Describes the message domain.subscription.v1.CreatePlanRequest.
 * Use `create(CreatePlanRequestSchema)` to create a new message.
 */
export declare const CreatePlanRequestSchema: GenMessage<CreatePlanRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePlanResponse
 */
export type CreatePlanResponse = Message<"domain.subscription.v1.CreatePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Plan data = 1;
     */
    data: Plan[];
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
 * Describes the message domain.subscription.v1.CreatePlanResponse.
 * Use `create(CreatePlanResponseSchema)` to create a new message.
 */
export declare const CreatePlanResponseSchema: GenMessage<CreatePlanResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPlanRequest
 */
export type ReadPlanRequest = Message<"domain.subscription.v1.ReadPlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Plan data = 1;
     */
    data?: Plan;
};
/**
 * Describes the message domain.subscription.v1.ReadPlanRequest.
 * Use `create(ReadPlanRequestSchema)` to create a new message.
 */
export declare const ReadPlanRequestSchema: GenMessage<ReadPlanRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPlanResponse
 */
export type ReadPlanResponse = Message<"domain.subscription.v1.ReadPlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Plan data = 1;
     */
    data: Plan[];
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
 * Describes the message domain.subscription.v1.ReadPlanResponse.
 * Use `create(ReadPlanResponseSchema)` to create a new message.
 */
export declare const ReadPlanResponseSchema: GenMessage<ReadPlanResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanRequest
 */
export type UpdatePlanRequest = Message<"domain.subscription.v1.UpdatePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Plan data = 1;
     */
    data?: Plan;
};
/**
 * Describes the message domain.subscription.v1.UpdatePlanRequest.
 * Use `create(UpdatePlanRequestSchema)` to create a new message.
 */
export declare const UpdatePlanRequestSchema: GenMessage<UpdatePlanRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanResponse
 */
export type UpdatePlanResponse = Message<"domain.subscription.v1.UpdatePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Plan data = 1;
     */
    data: Plan[];
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
 * Describes the message domain.subscription.v1.UpdatePlanResponse.
 * Use `create(UpdatePlanResponseSchema)` to create a new message.
 */
export declare const UpdatePlanResponseSchema: GenMessage<UpdatePlanResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePlanRequest
 */
export type DeletePlanRequest = Message<"domain.subscription.v1.DeletePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Plan data = 1;
     */
    data?: Plan;
};
/**
 * Describes the message domain.subscription.v1.DeletePlanRequest.
 * Use `create(DeletePlanRequestSchema)` to create a new message.
 */
export declare const DeletePlanRequestSchema: GenMessage<DeletePlanRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePlanResponse
 */
export type DeletePlanResponse = Message<"domain.subscription.v1.DeletePlanResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePlanResponse.
 * Use `create(DeletePlanResponseSchema)` to create a new message.
 */
export declare const DeletePlanResponseSchema: GenMessage<DeletePlanResponse>;
/**
 * @generated from message domain.subscription.v1.ListPlansRequest
 */
export type ListPlansRequest = Message<"domain.subscription.v1.ListPlansRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPlansRequest.
 * Use `create(ListPlansRequestSchema)` to create a new message.
 */
export declare const ListPlansRequestSchema: GenMessage<ListPlansRequest>;
/**
 * @generated from message domain.subscription.v1.ListPlansResponse
 */
export type ListPlansResponse = Message<"domain.subscription.v1.ListPlansResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Plan data = 1;
     */
    data: Plan[];
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
 * Describes the message domain.subscription.v1.ListPlansResponse.
 * Use `create(ListPlansResponseSchema)` to create a new message.
 */
export declare const ListPlansResponseSchema: GenMessage<ListPlansResponse>;
/**
 * NEW: Enhanced list page data request with pagination, filtering, sorting, search
 *
 * @generated from message domain.subscription.v1.GetPlanListPageDataRequest
 */
export type GetPlanListPageDataRequest = Message<"domain.subscription.v1.GetPlanListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetPlanListPageDataRequest.
 * Use `create(GetPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanListPageDataRequestSchema: GenMessage<GetPlanListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPlanListPageDataResponse
 */
export type GetPlanListPageDataResponse = Message<"domain.subscription.v1.GetPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Plan plan_list = 1;
     */
    planList: Plan[];
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
 * Describes the message domain.subscription.v1.GetPlanListPageDataResponse.
 * Use `create(GetPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanListPageDataResponseSchema: GenMessage<GetPlanListPageDataResponse>;
/**
 * NEW: Enhanced item page data request
 *
 * @generated from message domain.subscription.v1.GetPlanItemPageDataRequest
 */
export type GetPlanItemPageDataRequest = Message<"domain.subscription.v1.GetPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string plan_id = 1;
     */
    planId: string;
};
/**
 * Describes the message domain.subscription.v1.GetPlanItemPageDataRequest.
 * Use `create(GetPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanItemPageDataRequestSchema: GenMessage<GetPlanItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPlanItemPageDataResponse
 */
export type GetPlanItemPageDataResponse = Message<"domain.subscription.v1.GetPlanItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.Plan plan = 1;
     */
    plan?: Plan;
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
 * Describes the message domain.subscription.v1.GetPlanItemPageDataResponse.
 * Use `create(GetPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanItemPageDataResponseSchema: GenMessage<GetPlanItemPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.SearchPlansByNameRequest
 */
export type SearchPlansByNameRequest = Message<"domain.subscription.v1.SearchPlansByNameRequest"> & {
    /**
     * @generated from field: string query = 1;
     */
    query: string;
    /**
     * @generated from field: optional int32 limit = 2;
     */
    limit?: number;
};
/**
 * Describes the message domain.subscription.v1.SearchPlansByNameRequest.
 * Use `create(SearchPlansByNameRequestSchema)` to create a new message.
 */
export declare const SearchPlansByNameRequestSchema: GenMessage<SearchPlansByNameRequest>;
/**
 * @generated from message domain.subscription.v1.SearchPlansByNameResponse
 */
export type SearchPlansByNameResponse = Message<"domain.subscription.v1.SearchPlansByNameResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SearchPlanResult results = 1;
     */
    results: SearchPlanResult[];
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
 * Describes the message domain.subscription.v1.SearchPlansByNameResponse.
 * Use `create(SearchPlansByNameResponseSchema)` to create a new message.
 */
export declare const SearchPlansByNameResponseSchema: GenMessage<SearchPlansByNameResponse>;
/**
 * @generated from message domain.subscription.v1.SearchPlanResult
 */
export type SearchPlanResult = Message<"domain.subscription.v1.SearchPlanResult"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string label = 2;
     */
    label: string;
};
/**
 * Describes the message domain.subscription.v1.SearchPlanResult.
 * Use `create(SearchPlanResultSchema)` to create a new message.
 */
export declare const SearchPlanResultSchema: GenMessage<SearchPlanResult>;
/**
 * @generated from service domain.subscription.v1.PlanDomainService
 */
export declare const PlanDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PlanDomainService.CreatePlan
     */
    createPlan: {
        methodKind: "unary";
        input: typeof CreatePlanRequestSchema;
        output: typeof CreatePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanDomainService.ReadPlan
     */
    readPlan: {
        methodKind: "unary";
        input: typeof ReadPlanRequestSchema;
        output: typeof ReadPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanDomainService.UpdatePlan
     */
    updatePlan: {
        methodKind: "unary";
        input: typeof UpdatePlanRequestSchema;
        output: typeof UpdatePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanDomainService.DeletePlan
     */
    deletePlan: {
        methodKind: "unary";
        input: typeof DeletePlanRequestSchema;
        output: typeof DeletePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanDomainService.ListPlans
     */
    listPlans: {
        methodKind: "unary";
        input: typeof ListPlansRequestSchema;
        output: typeof ListPlansResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.PlanDomainService.GetPlanListPageData
     */
    getPlanListPageData: {
        methodKind: "unary";
        input: typeof GetPlanListPageDataRequestSchema;
        output: typeof GetPlanListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.PlanDomainService.GetPlanItemPageData
     */
    getPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetPlanItemPageDataRequestSchema;
        output: typeof GetPlanItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanDomainService.SearchPlansByName
     */
    searchPlansByName: {
        methodKind: "unary";
        input: typeof SearchPlansByNameRequestSchema;
        output: typeof SearchPlansByNameResponseSchema;
    };
}>;
