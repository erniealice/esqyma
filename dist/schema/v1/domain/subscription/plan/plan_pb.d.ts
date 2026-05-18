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
     * NULL = master plan, appears on /app/services/packages/list.
     * SET  = client-scoped, hidden from master list.
     *
     * @generated from field: optional string client_id = 12;
     */
    clientId?: string;
    /**
     * Self-FK to the master Plan that this clone was derived from. NULL when
     * this row IS the master. SET when this row is a client-scoped clone created
     * by CustomizePlanForClient — points at the master plan that was cloned.
     *
     * Invariants enforced at use-case layer (CustomizePlanForClient):
     *   • Always exactly one level deep — cloning a clone flattens parent_id to
     *     the same master, never the intermediate clone. No grandchildren.
     *   • Immutable after insert — UpdatePlan ignores body input on this field.
     *   • Acyclicity — the use case rejects parent_id = self.
     *
     * Reports group master + all variants via:
     *   WHERE id = $masterID OR parent_id = $masterID
     *
     * @generated from field: optional string parent_id = 13;
     */
    parentId?: string;
    /**
     * Root JobTemplate for the operational workflow this engagement runs.
     * NULL = Plan has no operational tracking (advisory retainers, R1 retail
     * patterns); auto-spawn use case skips silently. SET = MaterializeJobsForSubscription
     * resolves this template to spawn the root Job. Multi-template Plans link
     * additional templates via JobTemplateRelation rows. See plan §2.1.
     *
     * @generated from field: optional string job_template_id = 14;
     */
    jobTemplateId?: string;
    /**
     * Number of cycle Job instances spawned per billing cycle. Default 1
     * (semantically — NULL is treated as 1). Examples:
     *   Pro Cleaning Biweekly (billed monthly) = 2
     *   Lawn Care Weekly      (billed monthly) = 4
     *   Pool Quarterly        (billed quarterly) = 1
     * Spawn semantics: cycle_index increments globally; period_start of each
     * sub-cycle = billing_cycle_start + (k-1) × (cycle_length / N) for k=1..N.
     * Validation: must be >= 1 when Plan.job_template_id is set. Reset to 1
     * when job_template_id is cleared. See
     * docs/plan/20260430-cyclic-subscription-jobs/plan.md §2.4.
     *
     * @generated from field: optional int32 visits_per_cycle = 15;
     */
    visitsPerCycle?: number;
    /**
     * Drift-recovered columns (DB had these; proto did not)
     *
     * Legacy migration shim — links to old price-list IDs
     *
     * @generated from field: optional string legacy_price_list_id = 16;
     */
    legacyPriceListId?: string;
    /**
     * @generated from field: optional string workspace_id = 17;
     */
    workspaceId?: string;
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
 * CustomizePlanForClientRequest carries the inputs to clone a master Plan +
 * PricePlan tree under a client's namespace.
 *
 * @generated from message domain.subscription.v1.CustomizePlanForClientRequest
 */
export type CustomizePlanForClientRequest = Message<"domain.subscription.v1.CustomizePlanForClientRequest"> & {
    /**
     * Plan to clone from
     *
     * @generated from field: string source_plan_id = 1;
     */
    sourcePlanId: string;
    /**
     * PricePlan to clone from
     *
     * @generated from field: string source_price_plan_id = 2;
     */
    sourcePricePlanId: string;
    /**
     * Target client_id stamped on every cloned row
     *
     * @generated from field: string client_id = 3;
     */
    clientId: string;
    /**
     * Optional: when set, repoint subscription.price_plan_id atomically
     *
     * @generated from field: optional string subscription_id = 4;
     */
    subscriptionId?: string;
    /**
     * Pre-built display name; falls back to "<Client> - Price Schedule" when empty
     *
     * @generated from field: optional string new_schedule_name = 5;
     */
    newScheduleName?: string;
};
/**
 * Describes the message domain.subscription.v1.CustomizePlanForClientRequest.
 * Use `create(CustomizePlanForClientRequestSchema)` to create a new message.
 */
export declare const CustomizePlanForClientRequestSchema: GenMessage<CustomizePlanForClientRequest>;
/**
 * CustomizePlanForClientResponse carries the resolved IDs produced by the
 * flow. reused = true iff a matching client PriceSchedule was found and
 * reused (no new schedule row was inserted). Full PricePlan/PriceSchedule
 * records are intentionally omitted (cross-package proto imports would
 * circle back through plan.proto); callers needing the full rows re-read by
 * ID. The full Plan row is included since it is local to this proto.
 *
 * @generated from message domain.subscription.v1.CustomizePlanForClientResponse
 */
export type CustomizePlanForClientResponse = Message<"domain.subscription.v1.CustomizePlanForClientResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: string new_plan_id = 3;
     */
    newPlanId: string;
    /**
     * @generated from field: string new_price_plan_id = 4;
     */
    newPricePlanId: string;
    /**
     * @generated from field: string new_price_schedule_id = 5;
     */
    newPriceScheduleId: string;
    /**
     * @generated from field: bool reused = 6;
     */
    reused: boolean;
    /**
     * @generated from field: optional domain.subscription.v1.Plan plan = 7;
     */
    plan?: Plan;
};
/**
 * Describes the message domain.subscription.v1.CustomizePlanForClientResponse.
 * Use `create(CustomizePlanForClientResponseSchema)` to create a new message.
 */
export declare const CustomizePlanForClientResponseSchema: GenMessage<CustomizePlanForClientResponse>;
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
