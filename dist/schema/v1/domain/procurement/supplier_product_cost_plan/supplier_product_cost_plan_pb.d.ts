import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { CostPlan } from "../cost_plan/cost_plan_pb";
import type { SupplierProductPlan } from "../supplier_product_plan/supplier_product_plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/procurement/supplier_product_cost_plan/supplier_product_cost_plan.proto.
 */
export declare const file_domain_procurement_supplier_product_cost_plan_supplier_product_cost_plan: GenFile;
/**
 * @generated from message domain.procurement.v1.SupplierProductCostPlan
 */
export type SupplierProductCostPlan = Message<"domain.procurement.v1.SupplierProductCostPlan"> & {
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
     * @generated from field: optional domain.procurement.v1.CostPlan cost_plan = 7;
     */
    costPlan?: CostPlan;
    /**
     * @generated from field: string cost_plan_id = 8;
     */
    costPlanId: string;
    /**
     * Model D parity: catalog-line FK to SupplierProductPlan, not directly to product_id.
     * SupplierProductCostPlan prices a specific SupplierProductPlan row.
     * Variant identity lives on SupplierProductPlan; this row reads it via join.
     *
     * @generated from field: optional domain.procurement.v1.SupplierProductPlan supplier_product_plan = 9;
     */
    supplierProductPlan?: SupplierProductPlan;
    /**
     * @generated from field: string supplier_product_plan_id = 10;
     */
    supplierProductPlanId: string;
    /**
     * centavos — line price charged by the supplier in billing_currency
     *
     * @generated from field: int64 billing_amount = 11;
     */
    billingAmount: bigint;
    /**
     * ISO 4217 currency code — must match parent CostPlan.billing_currency
     *
     * @generated from field: string billing_currency = 12;
     */
    billingCurrency: string;
    /**
     * @generated from field: domain.procurement.v1.SupplierProductCostPlanBillingTreatment billing_treatment = 13;
     */
    billingTreatment: SupplierProductCostPlanBillingTreatment;
    /**
     * Per-line effective dates; optional — overrides parent CostSchedule dates when set
     *
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string date_start = 14;
     */
    dateStart?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string date_end = 15;
     */
    dateEnd?: string;
};
/**
 * Describes the message domain.procurement.v1.SupplierProductCostPlan.
 * Use `create(SupplierProductCostPlanSchema)` to create a new message.
 */
export declare const SupplierProductCostPlanSchema: GenMessage<SupplierProductCostPlan>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierProductCostPlanRequest
 */
export type CreateSupplierProductCostPlanRequest = Message<"domain.procurement.v1.CreateSupplierProductCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data?: SupplierProductCostPlan;
};
/**
 * Describes the message domain.procurement.v1.CreateSupplierProductCostPlanRequest.
 * Use `create(CreateSupplierProductCostPlanRequestSchema)` to create a new message.
 */
export declare const CreateSupplierProductCostPlanRequestSchema: GenMessage<CreateSupplierProductCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierProductCostPlanResponse
 */
export type CreateSupplierProductCostPlanResponse = Message<"domain.procurement.v1.CreateSupplierProductCostPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data: SupplierProductCostPlan[];
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
 * Describes the message domain.procurement.v1.CreateSupplierProductCostPlanResponse.
 * Use `create(CreateSupplierProductCostPlanResponseSchema)` to create a new message.
 */
export declare const CreateSupplierProductCostPlanResponseSchema: GenMessage<CreateSupplierProductCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierProductCostPlanRequest
 */
export type ReadSupplierProductCostPlanRequest = Message<"domain.procurement.v1.ReadSupplierProductCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data?: SupplierProductCostPlan;
};
/**
 * Describes the message domain.procurement.v1.ReadSupplierProductCostPlanRequest.
 * Use `create(ReadSupplierProductCostPlanRequestSchema)` to create a new message.
 */
export declare const ReadSupplierProductCostPlanRequestSchema: GenMessage<ReadSupplierProductCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierProductCostPlanResponse
 */
export type ReadSupplierProductCostPlanResponse = Message<"domain.procurement.v1.ReadSupplierProductCostPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data: SupplierProductCostPlan[];
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
 * Describes the message domain.procurement.v1.ReadSupplierProductCostPlanResponse.
 * Use `create(ReadSupplierProductCostPlanResponseSchema)` to create a new message.
 */
export declare const ReadSupplierProductCostPlanResponseSchema: GenMessage<ReadSupplierProductCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierProductCostPlanRequest
 */
export type UpdateSupplierProductCostPlanRequest = Message<"domain.procurement.v1.UpdateSupplierProductCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data?: SupplierProductCostPlan;
};
/**
 * Describes the message domain.procurement.v1.UpdateSupplierProductCostPlanRequest.
 * Use `create(UpdateSupplierProductCostPlanRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierProductCostPlanRequestSchema: GenMessage<UpdateSupplierProductCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierProductCostPlanResponse
 */
export type UpdateSupplierProductCostPlanResponse = Message<"domain.procurement.v1.UpdateSupplierProductCostPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data: SupplierProductCostPlan[];
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
 * Describes the message domain.procurement.v1.UpdateSupplierProductCostPlanResponse.
 * Use `create(UpdateSupplierProductCostPlanResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierProductCostPlanResponseSchema: GenMessage<UpdateSupplierProductCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierProductCostPlanRequest
 */
export type DeleteSupplierProductCostPlanRequest = Message<"domain.procurement.v1.DeleteSupplierProductCostPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data?: SupplierProductCostPlan;
};
/**
 * Describes the message domain.procurement.v1.DeleteSupplierProductCostPlanRequest.
 * Use `create(DeleteSupplierProductCostPlanRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierProductCostPlanRequestSchema: GenMessage<DeleteSupplierProductCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierProductCostPlanResponse
 */
export type DeleteSupplierProductCostPlanResponse = Message<"domain.procurement.v1.DeleteSupplierProductCostPlanResponse"> & {
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
 * Describes the message domain.procurement.v1.DeleteSupplierProductCostPlanResponse.
 * Use `create(DeleteSupplierProductCostPlanResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierProductCostPlanResponseSchema: GenMessage<DeleteSupplierProductCostPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ListSupplierProductCostPlansRequest
 */
export type ListSupplierProductCostPlansRequest = Message<"domain.procurement.v1.ListSupplierProductCostPlansRequest"> & {
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
 * Describes the message domain.procurement.v1.ListSupplierProductCostPlansRequest.
 * Use `create(ListSupplierProductCostPlansRequestSchema)` to create a new message.
 */
export declare const ListSupplierProductCostPlansRequestSchema: GenMessage<ListSupplierProductCostPlansRequest>;
/**
 * @generated from message domain.procurement.v1.ListSupplierProductCostPlansResponse
 */
export type ListSupplierProductCostPlansResponse = Message<"domain.procurement.v1.ListSupplierProductCostPlansResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductCostPlan data = 1;
     */
    data: SupplierProductCostPlan[];
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
 * Describes the message domain.procurement.v1.ListSupplierProductCostPlansResponse.
 * Use `create(ListSupplierProductCostPlansResponseSchema)` to create a new message.
 */
export declare const ListSupplierProductCostPlansResponseSchema: GenMessage<ListSupplierProductCostPlansResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductCostPlanListPageDataRequest
 */
export type GetSupplierProductCostPlanListPageDataRequest = Message<"domain.procurement.v1.GetSupplierProductCostPlanListPageDataRequest"> & {
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
 * Describes the message domain.procurement.v1.GetSupplierProductCostPlanListPageDataRequest.
 * Use `create(GetSupplierProductCostPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierProductCostPlanListPageDataRequestSchema: GenMessage<GetSupplierProductCostPlanListPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductCostPlanListPageDataResponse
 */
export type GetSupplierProductCostPlanListPageDataResponse = Message<"domain.procurement.v1.GetSupplierProductCostPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductCostPlan supplier_product_cost_plan_list = 1;
     */
    supplierProductCostPlanList: SupplierProductCostPlan[];
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
 * Describes the message domain.procurement.v1.GetSupplierProductCostPlanListPageDataResponse.
 * Use `create(GetSupplierProductCostPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierProductCostPlanListPageDataResponseSchema: GenMessage<GetSupplierProductCostPlanListPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductCostPlanItemPageDataRequest
 */
export type GetSupplierProductCostPlanItemPageDataRequest = Message<"domain.procurement.v1.GetSupplierProductCostPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_product_cost_plan_id = 1;
     */
    supplierProductCostPlanId: string;
};
/**
 * Describes the message domain.procurement.v1.GetSupplierProductCostPlanItemPageDataRequest.
 * Use `create(GetSupplierProductCostPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierProductCostPlanItemPageDataRequestSchema: GenMessage<GetSupplierProductCostPlanItemPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductCostPlanItemPageDataResponse
 */
export type GetSupplierProductCostPlanItemPageDataResponse = Message<"domain.procurement.v1.GetSupplierProductCostPlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductCostPlan supplier_product_cost_plan = 1;
     */
    supplierProductCostPlan?: SupplierProductCostPlan;
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
 * Describes the message domain.procurement.v1.GetSupplierProductCostPlanItemPageDataResponse.
 * Use `create(GetSupplierProductCostPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierProductCostPlanItemPageDataResponseSchema: GenMessage<GetSupplierProductCostPlanItemPageDataResponse>;
/**
 * Buying-side billing treatment on a per-product-line basis.
 * MINIMUM_COMMITMENT is buying-side specific — per-line minimums on USAGE_BASED plans.
 *
 * @generated from enum domain.procurement.v1.SupplierProductCostPlanBillingTreatment
 */
export declare enum SupplierProductCostPlanBillingTreatment {
    /**
     * @generated from enum value: SUPPLIER_PRODUCT_COST_PLAN_BILLING_TREATMENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * charge every cycle
     *
     * @generated from enum value: SUPPLIER_PRODUCT_COST_PLAN_BILLING_TREATMENT_RECURRING = 1;
     */
    RECURRING = 1,
    /**
     * charge once on first expenditure of this subscription
     *
     * @generated from enum value: SUPPLIER_PRODUCT_COST_PLAN_BILLING_TREATMENT_ONE_TIME_INITIAL = 2;
     */
    ONE_TIME_INITIAL = 2,
    /**
     * metered/consumed
     *
     * @generated from enum value: SUPPLIER_PRODUCT_COST_PLAN_BILLING_TREATMENT_USAGE_BASED = 3;
     */
    USAGE_BASED = 3,
    /**
     * per-line minimum commitment; USAGE_BASED floor
     *
     * @generated from enum value: SUPPLIER_PRODUCT_COST_PLAN_BILLING_TREATMENT_MINIMUM_COMMITMENT = 4;
     */
    MINIMUM_COMMITMENT = 4
}
/**
 * Describes the enum domain.procurement.v1.SupplierProductCostPlanBillingTreatment.
 */
export declare const SupplierProductCostPlanBillingTreatmentSchema: GenEnum<SupplierProductCostPlanBillingTreatment>;
/**
 * @generated from service domain.procurement.v1.SupplierProductCostPlanDomainService
 */
export declare const SupplierProductCostPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.CreateSupplierProductCostPlan
     */
    createSupplierProductCostPlan: {
        methodKind: "unary";
        input: typeof CreateSupplierProductCostPlanRequestSchema;
        output: typeof CreateSupplierProductCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.ReadSupplierProductCostPlan
     */
    readSupplierProductCostPlan: {
        methodKind: "unary";
        input: typeof ReadSupplierProductCostPlanRequestSchema;
        output: typeof ReadSupplierProductCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.UpdateSupplierProductCostPlan
     */
    updateSupplierProductCostPlan: {
        methodKind: "unary";
        input: typeof UpdateSupplierProductCostPlanRequestSchema;
        output: typeof UpdateSupplierProductCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.DeleteSupplierProductCostPlan
     */
    deleteSupplierProductCostPlan: {
        methodKind: "unary";
        input: typeof DeleteSupplierProductCostPlanRequestSchema;
        output: typeof DeleteSupplierProductCostPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.ListSupplierProductCostPlans
     */
    listSupplierProductCostPlans: {
        methodKind: "unary";
        input: typeof ListSupplierProductCostPlansRequestSchema;
        output: typeof ListSupplierProductCostPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.GetSupplierProductCostPlanListPageData
     */
    getSupplierProductCostPlanListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierProductCostPlanListPageDataRequestSchema;
        output: typeof GetSupplierProductCostPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductCostPlanDomainService.GetSupplierProductCostPlanItemPageData
     */
    getSupplierProductCostPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierProductCostPlanItemPageDataRequestSchema;
        output: typeof GetSupplierProductCostPlanItemPageDataResponseSchema;
    };
}>;
