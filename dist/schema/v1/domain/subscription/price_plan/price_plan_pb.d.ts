import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Plan } from "../plan/plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/price_plan/price_plan.proto.
 */
export declare const file_domain_subscription_price_plan_price_plan: GenFile;
/**
 * @generated from message domain.subscription.v1.PricePlan
 */
export type PricePlan = Message<"domain.subscription.v1.PricePlan"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.subscription.v1.Plan plan = 2;
     */
    plan?: Plan;
    /**
     * @generated from field: string plan_id = 3;
     */
    planId: string;
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
     * centavos — charged to the client in billing_currency
     *
     * @generated from field: int64 billing_amount = 11;
     */
    billingAmount: bigint;
    /**
     * ISO 4217 currency code — what the client is billed in
     *
     * @generated from field: string billing_currency = 12;
     */
    billingCurrency: string;
    /**
     * DEPRECATED: migrate to billing_cycle_* and default_term_* — see docs/plan/20260421-pricing-unification/plan.md
     * Now optional: BILLING_KIND_ONE_TIME plans hide the cycle row in the UI, so the legacy
     * duration_value/unit dual-write input can be empty. Column NULL-ability follows the proto
     * (migration 20260425150000_price_plan_duration_value_nullable).
     *
     * @generated from field: optional int32 duration_value = 13;
     */
    durationValue?: number;
    /**
     * @generated from field: optional string duration_unit = 14;
     */
    durationUnit?: string;
    /**
     * Email template paths/URLs for dynamic email rendering
     *
     * Template for welcome/confirmation emails (first payment)
     *
     * @generated from field: optional string confirmation_template = 15;
     */
    confirmationTemplate?: string;
    /**
     * Template for receipt emails (recurring payments)
     *
     * @generated from field: optional string receipt_template = 16;
     */
    receiptTemplate?: string;
    /**
     * Parent schedule — owns location + date range for this plan.
     * Field 17 was previously location_id (removed 2026-04-17); use price_schedule_id instead.
     *
     * @generated from field: optional string price_schedule_id = 18;
     */
    priceScheduleId?: string;
    /**
     * @generated from field: domain.subscription.v1.BillingKind billing_kind = 19;
     */
    billingKind: BillingKind;
    /**
     * @generated from field: domain.subscription.v1.AmountBasis amount_basis = 20;
     */
    amountBasis: AmountBasis;
    /**
     * Billing cadence — only meaningful when billing_kind ∈ {RECURRING, CONTRACT with periodic billing}
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
     * Default catalog validity/term; null = open-ended. Subscription.date_end overrides per-instance.
     *
     * @generated from field: optional int32 default_term_value = 23;
     */
    defaultTermValue?: number;
    /**
     * @generated from field: optional string default_term_unit = 24;
     */
    defaultTermUnit?: string;
    /**
     * Denormalized mirror of plan.client_id. Cascade enforced at use-case layer.
     *
     * @generated from field: optional string client_id = 25;
     */
    clientId?: string;
};
/**
 * Describes the message domain.subscription.v1.PricePlan.
 * Use `create(PricePlanSchema)` to create a new message.
 */
export declare const PricePlanSchema: GenMessage<PricePlan>;
/**
 * @generated from message domain.subscription.v1.CreatePricePlanRequest
 */
export type CreatePricePlanRequest = Message<"domain.subscription.v1.CreatePricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PricePlan data = 1;
     */
    data?: PricePlan;
};
/**
 * Describes the message domain.subscription.v1.CreatePricePlanRequest.
 * Use `create(CreatePricePlanRequestSchema)` to create a new message.
 */
export declare const CreatePricePlanRequestSchema: GenMessage<CreatePricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePricePlanResponse
 */
export type CreatePricePlanResponse = Message<"domain.subscription.v1.CreatePricePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PricePlan data = 1;
     */
    data: PricePlan[];
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
 * Describes the message domain.subscription.v1.CreatePricePlanResponse.
 * Use `create(CreatePricePlanResponseSchema)` to create a new message.
 */
export declare const CreatePricePlanResponseSchema: GenMessage<CreatePricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPricePlanRequest
 */
export type ReadPricePlanRequest = Message<"domain.subscription.v1.ReadPricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PricePlan data = 1;
     */
    data?: PricePlan;
};
/**
 * Describes the message domain.subscription.v1.ReadPricePlanRequest.
 * Use `create(ReadPricePlanRequestSchema)` to create a new message.
 */
export declare const ReadPricePlanRequestSchema: GenMessage<ReadPricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPricePlanResponse
 */
export type ReadPricePlanResponse = Message<"domain.subscription.v1.ReadPricePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PricePlan data = 1;
     */
    data: PricePlan[];
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
 * Describes the message domain.subscription.v1.ReadPricePlanResponse.
 * Use `create(ReadPricePlanResponseSchema)` to create a new message.
 */
export declare const ReadPricePlanResponseSchema: GenMessage<ReadPricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePricePlanRequest
 */
export type UpdatePricePlanRequest = Message<"domain.subscription.v1.UpdatePricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PricePlan data = 1;
     */
    data?: PricePlan;
};
/**
 * Describes the message domain.subscription.v1.UpdatePricePlanRequest.
 * Use `create(UpdatePricePlanRequestSchema)` to create a new message.
 */
export declare const UpdatePricePlanRequestSchema: GenMessage<UpdatePricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePricePlanResponse
 */
export type UpdatePricePlanResponse = Message<"domain.subscription.v1.UpdatePricePlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PricePlan data = 1;
     */
    data: PricePlan[];
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
 * Describes the message domain.subscription.v1.UpdatePricePlanResponse.
 * Use `create(UpdatePricePlanResponseSchema)` to create a new message.
 */
export declare const UpdatePricePlanResponseSchema: GenMessage<UpdatePricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePricePlanRequest
 */
export type DeletePricePlanRequest = Message<"domain.subscription.v1.DeletePricePlanRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PricePlan data = 1;
     */
    data?: PricePlan;
};
/**
 * Describes the message domain.subscription.v1.DeletePricePlanRequest.
 * Use `create(DeletePricePlanRequestSchema)` to create a new message.
 */
export declare const DeletePricePlanRequestSchema: GenMessage<DeletePricePlanRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePricePlanResponse
 */
export type DeletePricePlanResponse = Message<"domain.subscription.v1.DeletePricePlanResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePricePlanResponse.
 * Use `create(DeletePricePlanResponseSchema)` to create a new message.
 */
export declare const DeletePricePlanResponseSchema: GenMessage<DeletePricePlanResponse>;
/**
 * @generated from message domain.subscription.v1.ListPricePlansRequest
 */
export type ListPricePlansRequest = Message<"domain.subscription.v1.ListPricePlansRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPricePlansRequest.
 * Use `create(ListPricePlansRequestSchema)` to create a new message.
 */
export declare const ListPricePlansRequestSchema: GenMessage<ListPricePlansRequest>;
/**
 * @generated from message domain.subscription.v1.ListPricePlansResponse
 */
export type ListPricePlansResponse = Message<"domain.subscription.v1.ListPricePlansResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PricePlan data = 1;
     */
    data: PricePlan[];
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
 * Describes the message domain.subscription.v1.ListPricePlansResponse.
 * Use `create(ListPricePlansResponseSchema)` to create a new message.
 */
export declare const ListPricePlansResponseSchema: GenMessage<ListPricePlansResponse>;
/**
 * @generated from message domain.subscription.v1.GetPricePlanListPageDataRequest
 */
export type GetPricePlanListPageDataRequest = Message<"domain.subscription.v1.GetPricePlanListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetPricePlanListPageDataRequest.
 * Use `create(GetPricePlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPricePlanListPageDataRequestSchema: GenMessage<GetPricePlanListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPricePlanListPageDataResponse
 */
export type GetPricePlanListPageDataResponse = Message<"domain.subscription.v1.GetPricePlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PricePlan price_plan_list = 1;
     */
    pricePlanList: PricePlan[];
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
 * Describes the message domain.subscription.v1.GetPricePlanListPageDataResponse.
 * Use `create(GetPricePlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPricePlanListPageDataResponseSchema: GenMessage<GetPricePlanListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetPricePlanItemPageDataRequest
 */
export type GetPricePlanItemPageDataRequest = Message<"domain.subscription.v1.GetPricePlanItemPageDataRequest"> & {
    /**
     * @generated from field: string price_plan_id = 1;
     */
    pricePlanId: string;
};
/**
 * Describes the message domain.subscription.v1.GetPricePlanItemPageDataRequest.
 * Use `create(GetPricePlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPricePlanItemPageDataRequestSchema: GenMessage<GetPricePlanItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPricePlanItemPageDataResponse
 */
export type GetPricePlanItemPageDataResponse = Message<"domain.subscription.v1.GetPricePlanItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.PricePlan price_plan = 1;
     */
    pricePlan?: PricePlan;
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
 * Describes the message domain.subscription.v1.GetPricePlanItemPageDataResponse.
 * Use `create(GetPricePlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPricePlanItemPageDataResponseSchema: GenMessage<GetPricePlanItemPageDataResponse>;
/**
 * @generated from enum domain.subscription.v1.BillingKind
 */
export declare enum BillingKind {
    /**
     * @generated from enum value: BILLING_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * single charge, no ongoing cycles
     *
     * @generated from enum value: BILLING_KIND_ONE_TIME = 1;
     */
    ONE_TIME = 1,
    /**
     * open-ended cycling (cancel-anytime subscription)
     *
     * @generated from enum value: BILLING_KIND_RECURRING = 2;
     */
    RECURRING = 2,
    /**
     * fixed-term commitment (may have periodic billing within)
     *
     * @generated from enum value: BILLING_KIND_CONTRACT = 3;
     */
    CONTRACT = 3
}
/**
 * Describes the enum domain.subscription.v1.BillingKind.
 */
export declare const BillingKindSchema: GenEnum<BillingKind>;
/**
 * @generated from enum domain.subscription.v1.AmountBasis
 */
export declare enum AmountBasis {
    /**
     * @generated from enum value: AMOUNT_BASIS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * amount = per-cycle fee
     *
     * @generated from enum value: AMOUNT_BASIS_PER_CYCLE = 1;
     */
    PER_CYCLE = 1,
    /**
     * amount = one-shot total
     *
     * @generated from enum value: AMOUNT_BASIS_TOTAL_PACKAGE = 2;
     */
    TOTAL_PACKAGE = 2,
    /**
     * amount ignored; sum ProductPricePlan prices
     *
     * @generated from enum value: AMOUNT_BASIS_DERIVED_FROM_LINES = 3;
     */
    DERIVED_FROM_LINES = 3
}
/**
 * Describes the enum domain.subscription.v1.AmountBasis.
 */
export declare const AmountBasisSchema: GenEnum<AmountBasis>;
/**
 * @generated from service domain.subscription.v1.PricePlanDomainService
 */
export declare const PricePlanDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.CreatePricePlan
     */
    createPricePlan: {
        methodKind: "unary";
        input: typeof CreatePricePlanRequestSchema;
        output: typeof CreatePricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.ReadPricePlan
     */
    readPricePlan: {
        methodKind: "unary";
        input: typeof ReadPricePlanRequestSchema;
        output: typeof ReadPricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.UpdatePricePlan
     */
    updatePricePlan: {
        methodKind: "unary";
        input: typeof UpdatePricePlanRequestSchema;
        output: typeof UpdatePricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.DeletePricePlan
     */
    deletePricePlan: {
        methodKind: "unary";
        input: typeof DeletePricePlanRequestSchema;
        output: typeof DeletePricePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.ListPricePlans
     */
    listPricePlans: {
        methodKind: "unary";
        input: typeof ListPricePlansRequestSchema;
        output: typeof ListPricePlansResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.GetPricePlanListPageData
     */
    getPricePlanListPageData: {
        methodKind: "unary";
        input: typeof GetPricePlanListPageDataRequestSchema;
        output: typeof GetPricePlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PricePlanDomainService.GetPricePlanItemPageData
     */
    getPricePlanItemPageData: {
        methodKind: "unary";
        input: typeof GetPricePlanItemPageDataRequestSchema;
        output: typeof GetPricePlanItemPageDataResponseSchema;
    };
}>;
