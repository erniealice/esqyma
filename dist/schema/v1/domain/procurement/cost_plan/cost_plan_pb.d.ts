import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SupplierPlan } from "../supplier_plan/supplier_plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/procurement/cost_plan/cost_plan.proto.
 */
export declare const file_domain_procurement_cost_plan_cost_plan: GenFile;
/**
 * @generated from message domain.procurement.v1.CostPlan
 */
export type CostPlan = Message<"domain.procurement.v1.CostPlan"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.procurement.v1.SupplierPlan supplier_plan = 2;
     */
    supplierPlan?: SupplierPlan;
    /**
     * @generated from field: string supplier_plan_id = 3;
     */
    supplierPlanId: string;
    /**
     * @generated from field: optional string name = 4;
     */
    name?: string;
    /**
     * @generated from field: optional string description = 5;
     */
    description?: string;
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
    /**
     * centavos — charged by the supplier in billing_currency
     *
     * @generated from field: int64 billing_amount = 11;
     */
    billingAmount: bigint;
    /**
     * ISO 4217 currency code
     *
     * @generated from field: string billing_currency = 12;
     */
    billingCurrency: string;
    /**
     * DEPRECATED dual-write fields (preserved for migration parity with price_plan).
     * Use billing_cycle_* and default_term_* instead.
     *
     * @generated from field: optional int32 duration_value = 13;
     */
    durationValue?: number;
    /**
     * @generated from field: optional string duration_unit = 14;
     */
    durationUnit?: string;
    /**
     * Email template paths/URLs (optional — procurement context, e.g. payment confirmation)
     *
     * @generated from field: optional string confirmation_template = 15;
     */
    confirmationTemplate?: string;
    /**
     * @generated from field: optional string receipt_template = 16;
     */
    receiptTemplate?: string;
    /**
     * Parent schedule — owns location + date range for this plan.
     *
     * @generated from field: optional string cost_schedule_id = 18;
     */
    costScheduleId?: string;
    /**
     * @generated from field: domain.procurement.v1.CostPlanBillingKind billing_kind = 19;
     */
    billingKind: CostPlanBillingKind;
    /**
     * @generated from field: domain.procurement.v1.CostPlanAmountBasis amount_basis = 20;
     */
    amountBasis: CostPlanAmountBasis;
    /**
     * Billing cadence — only meaningful when billing_kind ∈ {RECURRING, CONTRACT}
     *
     * @generated from field: optional int32 billing_cycle_value = 21;
     */
    billingCycleValue?: number;
    /**
     * "day" | "week" | "month" | "year"
     *
     * @generated from field: optional string billing_cycle_unit = 22;
     */
    billingCycleUnit?: string;
    /**
     * Default catalog validity/term; null = open-ended.
     *
     * @generated from field: optional int32 default_term_value = 23;
     */
    defaultTermValue?: number;
    /**
     * @generated from field: optional string default_term_unit = 24;
     */
    defaultTermUnit?: string;
    /**
     * Denormalized mirror of supplier_plan.supplier_id. Cascade enforced at use-case layer.
     *
     * @generated from field: optional string supplier_id = 25;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string workspace_id = 26;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.procurement.v1.CostPlan.
 * Use `create(CostPlanSchema)` to create a new message.
 */
export declare const CostPlanSchema: GenMessage<CostPlan>;
/**
 * @generated from message domain.procurement.v1.CreateCostPlanRequest
 */
export type CreateCostPlanRequest = Message<"domain.procurement.v1.CreateCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostPlan data = 1;
     */
    data?: CostPlan;
};
/**
 * Describes the message domain.procurement.v1.CreateCostPlanRequest.
 * Use `create(CreateCostPlanRequestSchema)` to create a new message.
 */
export declare const CreateCostPlanRequestSchema: GenMessage<CreateCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.CreateCostPlanResponse
 */
export type CreateCostPlanResponse = Message<"domain.procurement.v1.CreateCostPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostPlan data = 1;
     */
    data: CostPlan[];
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
 * Describes the message domain.procurement.v1.CreateCostPlanResponse.
 * Use `create(CreateCostPlanResponseSchema)` to create a new message.
 */
export declare const CreateCostPlanResponseSchema: GenMessage<CreateCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ReadCostPlanRequest
 */
export type ReadCostPlanRequest = Message<"domain.procurement.v1.ReadCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostPlan data = 1;
     */
    data?: CostPlan;
};
/**
 * Describes the message domain.procurement.v1.ReadCostPlanRequest.
 * Use `create(ReadCostPlanRequestSchema)` to create a new message.
 */
export declare const ReadCostPlanRequestSchema: GenMessage<ReadCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.ReadCostPlanResponse
 */
export type ReadCostPlanResponse = Message<"domain.procurement.v1.ReadCostPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostPlan data = 1;
     */
    data: CostPlan[];
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
 * Describes the message domain.procurement.v1.ReadCostPlanResponse.
 * Use `create(ReadCostPlanResponseSchema)` to create a new message.
 */
export declare const ReadCostPlanResponseSchema: GenMessage<ReadCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.UpdateCostPlanRequest
 */
export type UpdateCostPlanRequest = Message<"domain.procurement.v1.UpdateCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostPlan data = 1;
     */
    data?: CostPlan;
};
/**
 * Describes the message domain.procurement.v1.UpdateCostPlanRequest.
 * Use `create(UpdateCostPlanRequestSchema)` to create a new message.
 */
export declare const UpdateCostPlanRequestSchema: GenMessage<UpdateCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.UpdateCostPlanResponse
 */
export type UpdateCostPlanResponse = Message<"domain.procurement.v1.UpdateCostPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostPlan data = 1;
     */
    data: CostPlan[];
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
 * Describes the message domain.procurement.v1.UpdateCostPlanResponse.
 * Use `create(UpdateCostPlanResponseSchema)` to create a new message.
 */
export declare const UpdateCostPlanResponseSchema: GenMessage<UpdateCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.DeleteCostPlanRequest
 */
export type DeleteCostPlanRequest = Message<"domain.procurement.v1.DeleteCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostPlan data = 1;
     */
    data?: CostPlan;
};
/**
 * Describes the message domain.procurement.v1.DeleteCostPlanRequest.
 * Use `create(DeleteCostPlanRequestSchema)` to create a new message.
 */
export declare const DeleteCostPlanRequestSchema: GenMessage<DeleteCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.DeleteCostPlanResponse
 */
export type DeleteCostPlanResponse = Message<"domain.procurement.v1.DeleteCostPlanResponse"> & {
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
 * Describes the message domain.procurement.v1.DeleteCostPlanResponse.
 * Use `create(DeleteCostPlanResponseSchema)` to create a new message.
 */
export declare const DeleteCostPlanResponseSchema: GenMessage<DeleteCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ListCostPlansRequest
 */
export type ListCostPlansRequest = Message<"domain.procurement.v1.ListCostPlansRequest"> & {
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
 * Describes the message domain.procurement.v1.ListCostPlansRequest.
 * Use `create(ListCostPlansRequestSchema)` to create a new message.
 */
export declare const ListCostPlansRequestSchema: GenMessage<ListCostPlansRequest>;
/**
 * @generated from message domain.procurement.v1.ListCostPlansResponse
 */
export type ListCostPlansResponse = Message<"domain.procurement.v1.ListCostPlansResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostPlan data = 1;
     */
    data: CostPlan[];
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
 * Describes the message domain.procurement.v1.ListCostPlansResponse.
 * Use `create(ListCostPlansResponseSchema)` to create a new message.
 */
export declare const ListCostPlansResponseSchema: GenMessage<ListCostPlansResponse>;
/**
 * @generated from message domain.procurement.v1.GetCostPlanListPageDataRequest
 */
export type GetCostPlanListPageDataRequest = Message<"domain.procurement.v1.GetCostPlanListPageDataRequest"> & {
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
 * Describes the message domain.procurement.v1.GetCostPlanListPageDataRequest.
 * Use `create(GetCostPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCostPlanListPageDataRequestSchema: GenMessage<GetCostPlanListPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetCostPlanListPageDataResponse
 */
export type GetCostPlanListPageDataResponse = Message<"domain.procurement.v1.GetCostPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostPlan cost_plan_list = 1;
     */
    costPlanList: CostPlan[];
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
 * Describes the message domain.procurement.v1.GetCostPlanListPageDataResponse.
 * Use `create(GetCostPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCostPlanListPageDataResponseSchema: GenMessage<GetCostPlanListPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.GetCostPlanItemPageDataRequest
 */
export type GetCostPlanItemPageDataRequest = Message<"domain.procurement.v1.GetCostPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string cost_plan_id = 1;
     */
    costPlanId: string;
};
/**
 * Describes the message domain.procurement.v1.GetCostPlanItemPageDataRequest.
 * Use `create(GetCostPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCostPlanItemPageDataRequestSchema: GenMessage<GetCostPlanItemPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetCostPlanItemPageDataResponse
 */
export type GetCostPlanItemPageDataResponse = Message<"domain.procurement.v1.GetCostPlanItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.procurement.v1.CostPlan cost_plan = 1;
     */
    costPlan?: CostPlan;
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
 * Describes the message domain.procurement.v1.GetCostPlanItemPageDataResponse.
 * Use `create(GetCostPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCostPlanItemPageDataResponseSchema: GenMessage<GetCostPlanItemPageDataResponse>;
/**
 * Buying-side billing kind.
 * Intentional divergence from selling-side BillingKind: MILESTONE replaced with USAGE_BASED.
 * Selling-side: ONE_TIME / RECURRING / CONTRACT / MILESTONE / AD_HOC (job-gated).
 * Buying-side:  ONE_TIME / RECURRING / CONTRACT / USAGE_BASED / AD_HOC (metered/cloud).
 *
 * @generated from enum domain.procurement.v1.CostPlanBillingKind
 */
export declare enum CostPlanBillingKind {
    /**
     * @generated from enum value: COST_PLAN_BILLING_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * single charge, no ongoing cycles
     *
     * @generated from enum value: COST_PLAN_BILLING_KIND_ONE_TIME = 1;
     */
    ONE_TIME = 1,
    /**
     * open-ended cycling (cancel-anytime subscription)
     *
     * @generated from enum value: COST_PLAN_BILLING_KIND_RECURRING = 2;
     */
    RECURRING = 2,
    /**
     * fixed-term commitment (may have periodic billing within)
     *
     * @generated from enum value: COST_PLAN_BILLING_KIND_CONTRACT = 3;
     */
    CONTRACT = 3,
    /**
     * metered/cloud billing (replaces selling-side MILESTONE)
     *
     * @generated from enum value: COST_PLAN_BILLING_KIND_USAGE_BASED = 4;
     */
    USAGE_BASED = 4,
    /**
     * event-driven recurrence; operator-requested occurrences
     *
     * @generated from enum value: COST_PLAN_BILLING_KIND_AD_HOC = 5;
     */
    AD_HOC = 5
}
/**
 * Describes the enum domain.procurement.v1.CostPlanBillingKind.
 */
export declare const CostPlanBillingKindSchema: GenEnum<CostPlanBillingKind>;
/**
 * @generated from enum domain.procurement.v1.CostPlanAmountBasis
 */
export declare enum CostPlanAmountBasis {
    /**
     * @generated from enum value: COST_PLAN_AMOUNT_BASIS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * amount = per-cycle fee
     *
     * @generated from enum value: COST_PLAN_AMOUNT_BASIS_PER_CYCLE = 1;
     */
    PER_CYCLE = 1,
    /**
     * amount = one-shot total
     *
     * @generated from enum value: COST_PLAN_AMOUNT_BASIS_TOTAL_PACKAGE = 2;
     */
    TOTAL_PACKAGE = 2,
    /**
     * amount ignored; sum SupplierProductCostPlan prices
     *
     * @generated from enum value: COST_PLAN_AMOUNT_BASIS_DERIVED_FROM_LINES = 3;
     */
    DERIVED_FROM_LINES = 3,
    /**
     * per-event billing; currently only meaningful with USAGE_BASED
     *
     * @generated from enum value: COST_PLAN_AMOUNT_BASIS_PER_OCCURRENCE = 4;
     */
    PER_OCCURRENCE = 4
}
/**
 * Describes the enum domain.procurement.v1.CostPlanAmountBasis.
 */
export declare const CostPlanAmountBasisSchema: GenEnum<CostPlanAmountBasis>;
/**
 * @generated from service domain.procurement.v1.CostPlanDomainService
 */
export declare const CostPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.CreateCostPlan
     */
    createCostPlan: {
        methodKind: "unary";
        input: typeof CreateCostPlanRequestSchema;
        output: typeof CreateCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.ReadCostPlan
     */
    readCostPlan: {
        methodKind: "unary";
        input: typeof ReadCostPlanRequestSchema;
        output: typeof ReadCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.UpdateCostPlan
     */
    updateCostPlan: {
        methodKind: "unary";
        input: typeof UpdateCostPlanRequestSchema;
        output: typeof UpdateCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.DeleteCostPlan
     */
    deleteCostPlan: {
        methodKind: "unary";
        input: typeof DeleteCostPlanRequestSchema;
        output: typeof DeleteCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.ListCostPlans
     */
    listCostPlans: {
        methodKind: "unary";
        input: typeof ListCostPlansRequestSchema;
        output: typeof ListCostPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.GetCostPlanListPageData
     */
    getCostPlanListPageData: {
        methodKind: "unary";
        input: typeof GetCostPlanListPageDataRequestSchema;
        output: typeof GetCostPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostPlanDomainService.GetCostPlanItemPageData
     */
    getCostPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetCostPlanItemPageDataRequestSchema;
        output: typeof GetCostPlanItemPageDataResponseSchema;
    };
}>;
