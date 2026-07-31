import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_group_product_plan/subscription_group_product_plan.proto.
 */
export declare const file_domain_subscription_subscription_group_product_plan_subscription_group_product_plan: GenFile;
/**
 * SubscriptionGroupProductPlan is THE CLASS — a per-section, per-offering
 * delivery instance: (subscription_group x product_plan), anchored to the
 * job_template that names its curriculum (and, through it, its phases). It
 * sits ABOVE the assignment edge (SubscriptionGroupProductPlanStaff), which
 * re-parents onto it as (class x eligibility [x phase]). A class row may
 * exist unstaffed — "no staff yet" is a legal state. Lives in the
 * subscription domain (a per-group delivery instance of a catalog line, not
 * a catalog concern) as the sibling of its staff edge. See
 * docs/plan/20260724-section-assignment-merged/plan.md §1.1/§1.1b.
 *
 * @generated from message domain.subscription.v1.SubscriptionGroupProductPlan
 */
export type SubscriptionGroupProductPlan = Message<"domain.subscription.v1.SubscriptionGroupProductPlan"> & {
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
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * @generated from field: string subscription_group_id = 8;
     */
    subscriptionGroupId: string;
    /**
     * @generated from field: string product_plan_id = 9;
     */
    productPlanId: string;
    /**
     * curriculum anchor
     *
     * @generated from field: string job_template_id = 10;
     */
    jobTemplateId: string;
    /**
     * UNSPECIFIED=0 · ACTIVE=1 · EXCLUDED=2
     *
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlanStatus status = 11;
     */
    status: SubscriptionGroupProductPlanStatus;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionGroupProductPlan.
 * Use `create(SubscriptionGroupProductPlanSchema)` to create a new message.
 */
export declare const SubscriptionGroupProductPlanSchema: GenMessage<SubscriptionGroupProductPlan>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupProductPlanRequest
 */
export type CreateSubscriptionGroupProductPlanRequest = Message<"domain.subscription.v1.CreateSubscriptionGroupProductPlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data?: SubscriptionGroupProductPlan;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupProductPlanRequest.
 * Use `create(CreateSubscriptionGroupProductPlanRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupProductPlanRequestSchema: GenMessage<CreateSubscriptionGroupProductPlanRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupProductPlanResponse
 */
export type CreateSubscriptionGroupProductPlanResponse = Message<"domain.subscription.v1.CreateSubscriptionGroupProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data: SubscriptionGroupProductPlan[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupProductPlanResponse.
 * Use `create(CreateSubscriptionGroupProductPlanResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupProductPlanResponseSchema: GenMessage<CreateSubscriptionGroupProductPlanResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupProductPlanRequest
 */
export type ReadSubscriptionGroupProductPlanRequest = Message<"domain.subscription.v1.ReadSubscriptionGroupProductPlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data?: SubscriptionGroupProductPlan;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupProductPlanRequest.
 * Use `create(ReadSubscriptionGroupProductPlanRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupProductPlanRequestSchema: GenMessage<ReadSubscriptionGroupProductPlanRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupProductPlanResponse
 */
export type ReadSubscriptionGroupProductPlanResponse = Message<"domain.subscription.v1.ReadSubscriptionGroupProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data: SubscriptionGroupProductPlan[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupProductPlanResponse.
 * Use `create(ReadSubscriptionGroupProductPlanResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupProductPlanResponseSchema: GenMessage<ReadSubscriptionGroupProductPlanResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupProductPlanRequest
 */
export type UpdateSubscriptionGroupProductPlanRequest = Message<"domain.subscription.v1.UpdateSubscriptionGroupProductPlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data?: SubscriptionGroupProductPlan;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupProductPlanRequest.
 * Use `create(UpdateSubscriptionGroupProductPlanRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupProductPlanRequestSchema: GenMessage<UpdateSubscriptionGroupProductPlanRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupProductPlanResponse
 */
export type UpdateSubscriptionGroupProductPlanResponse = Message<"domain.subscription.v1.UpdateSubscriptionGroupProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data: SubscriptionGroupProductPlan[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupProductPlanResponse.
 * Use `create(UpdateSubscriptionGroupProductPlanResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupProductPlanResponseSchema: GenMessage<UpdateSubscriptionGroupProductPlanResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupProductPlanRequest
 */
export type DeleteSubscriptionGroupProductPlanRequest = Message<"domain.subscription.v1.DeleteSubscriptionGroupProductPlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data?: SubscriptionGroupProductPlan;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupProductPlanRequest.
 * Use `create(DeleteSubscriptionGroupProductPlanRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupProductPlanRequestSchema: GenMessage<DeleteSubscriptionGroupProductPlanRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupProductPlanResponse
 */
export type DeleteSubscriptionGroupProductPlanResponse = Message<"domain.subscription.v1.DeleteSubscriptionGroupProductPlanResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupProductPlanResponse.
 * Use `create(DeleteSubscriptionGroupProductPlanResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupProductPlanResponseSchema: GenMessage<DeleteSubscriptionGroupProductPlanResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupProductPlansRequest
 */
export type ListSubscriptionGroupProductPlansRequest = Message<"domain.subscription.v1.ListSubscriptionGroupProductPlansRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupProductPlansRequest.
 * Use `create(ListSubscriptionGroupProductPlansRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupProductPlansRequestSchema: GenMessage<ListSubscriptionGroupProductPlansRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupProductPlansResponse
 */
export type ListSubscriptionGroupProductPlansResponse = Message<"domain.subscription.v1.ListSubscriptionGroupProductPlansResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlan data = 1;
     */
    data: SubscriptionGroupProductPlan[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupProductPlansResponse.
 * Use `create(ListSubscriptionGroupProductPlansResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupProductPlansResponseSchema: GenMessage<ListSubscriptionGroupProductPlansResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanListPageDataRequest
 */
export type GetSubscriptionGroupProductPlanListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanListPageDataRequest.
 * Use `create(GetSubscriptionGroupProductPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanListPageDataRequestSchema: GenMessage<GetSubscriptionGroupProductPlanListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanListPageDataResponse
 */
export type GetSubscriptionGroupProductPlanListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlan subscription_group_product_plan_list = 1;
     */
    subscriptionGroupProductPlanList: SubscriptionGroupProductPlan[];
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanListPageDataResponse.
 * Use `create(GetSubscriptionGroupProductPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanListPageDataResponseSchema: GenMessage<GetSubscriptionGroupProductPlanListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanItemPageDataRequest
 */
export type GetSubscriptionGroupProductPlanItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string subscription_group_product_plan_id = 1;
     */
    subscriptionGroupProductPlanId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanItemPageDataRequest.
 * Use `create(GetSubscriptionGroupProductPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanItemPageDataRequestSchema: GenMessage<GetSubscriptionGroupProductPlanItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanItemPageDataResponse
 */
export type GetSubscriptionGroupProductPlanItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlan subscription_group_product_plan = 1;
     */
    subscriptionGroupProductPlan?: SubscriptionGroupProductPlan;
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanItemPageDataResponse.
 * Use `create(GetSubscriptionGroupProductPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanItemPageDataResponseSchema: GenMessage<GetSubscriptionGroupProductPlanItemPageDataResponse>;
/**
 * Status of a SubscriptionGroupProductPlan row within its section's roster.
 *   UNSPECIFIED — zero value, never a written state.
 *   ACTIVE      — the offering is live on the section (default creation state).
 *   EXCLUDED    — soft-excluded from the roster surface (absorbs the legacy
 *                 I-4 exclude); guarded when the class has live courses or
 *                 live assignments (see plan.md §2).
 *
 * @generated from enum domain.subscription.v1.SubscriptionGroupProductPlanStatus
 */
export declare enum SubscriptionGroupProductPlanStatus {
    /**
     * @generated from enum value: SUBSCRIPTION_GROUP_PRODUCT_PLAN_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SUBSCRIPTION_GROUP_PRODUCT_PLAN_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * @generated from enum value: SUBSCRIPTION_GROUP_PRODUCT_PLAN_STATUS_EXCLUDED = 2;
     */
    EXCLUDED = 2
}
/**
 * Describes the enum domain.subscription.v1.SubscriptionGroupProductPlanStatus.
 */
export declare const SubscriptionGroupProductPlanStatusSchema: GenEnum<SubscriptionGroupProductPlanStatus>;
/**
 * @generated from service domain.subscription.v1.SubscriptionGroupProductPlanDomainService
 */
export declare const SubscriptionGroupProductPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.CreateSubscriptionGroupProductPlan
     */
    createSubscriptionGroupProductPlan: {
        methodKind: "unary";
        input: typeof CreateSubscriptionGroupProductPlanRequestSchema;
        output: typeof CreateSubscriptionGroupProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.ReadSubscriptionGroupProductPlan
     */
    readSubscriptionGroupProductPlan: {
        methodKind: "unary";
        input: typeof ReadSubscriptionGroupProductPlanRequestSchema;
        output: typeof ReadSubscriptionGroupProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.UpdateSubscriptionGroupProductPlan
     */
    updateSubscriptionGroupProductPlan: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionGroupProductPlanRequestSchema;
        output: typeof UpdateSubscriptionGroupProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.DeleteSubscriptionGroupProductPlan
     */
    deleteSubscriptionGroupProductPlan: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionGroupProductPlanRequestSchema;
        output: typeof DeleteSubscriptionGroupProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.ListSubscriptionGroupProductPlans
     */
    listSubscriptionGroupProductPlans: {
        methodKind: "unary";
        input: typeof ListSubscriptionGroupProductPlansRequestSchema;
        output: typeof ListSubscriptionGroupProductPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.GetSubscriptionGroupProductPlanListPageData
     */
    getSubscriptionGroupProductPlanListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupProductPlanListPageDataRequestSchema;
        output: typeof GetSubscriptionGroupProductPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanDomainService.GetSubscriptionGroupProductPlanItemPageData
     */
    getSubscriptionGroupProductPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupProductPlanItemPageDataRequestSchema;
        output: typeof GetSubscriptionGroupProductPlanItemPageDataResponseSchema;
    };
}>;
