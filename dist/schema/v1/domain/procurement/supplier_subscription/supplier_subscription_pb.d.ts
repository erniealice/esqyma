import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { CostPlan } from "../cost_plan/cost_plan_pb";
import type { Supplier } from "../../entity/supplier/supplier_pb";
import type { ProcurementRequest } from "../../expenditure/procurement_request/procurement_request_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/procurement/supplier_subscription/supplier_subscription.proto.
 */
export declare const file_domain_procurement_supplier_subscription_supplier_subscription: GenFile;
/**
 * @generated from message domain.procurement.v1.SupplierSubscription
 */
export type SupplierSubscription = Message<"domain.procurement.v1.SupplierSubscription"> & {
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * Cost plan FK (mirrors price_plan / price_plan_id on selling-side Subscription)
     *
     * @generated from field: optional domain.procurement.v1.CostPlan cost_plan = 8;
     */
    costPlan?: CostPlan;
    /**
     * @generated from field: string cost_plan_id = 9;
     */
    costPlanId: string;
    /**
     * Supplier FK (mirrors client / client_id on selling-side Subscription)
     *
     * @generated from field: optional domain.entity.v1.Supplier supplier = 10;
     */
    supplier?: Supplier;
    /**
     * @generated from field: string supplier_id = 11;
     */
    supplierId: string;
    /**
     * UTC timestamp; display TZ resolved per-request
     *
     * @generated from field: optional google.protobuf.Timestamp date_time_start = 12;
     */
    dateTimeStart?: Timestamp;
    /**
     * UTC timestamp; nil = open-ended
     *
     * @generated from field: optional google.protobuf.Timestamp date_time_end = 14;
     */
    dateTimeEnd?: Timestamp;
    /**
     * @generated from field: map<string, string> metadata = 16;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * 7-char alphanumeric engagement code (parity with selling-side Subscription.code)
     *
     * @generated from field: optional string code = 22;
     */
    code?: string;
    /**
     * Workspace ownership — supplier subscriptions are scoped per workspace.
     *
     * @generated from field: optional string workspace_id = 24;
     */
    workspaceId?: string;
    /**
     * Back-link to the ProcurementRequest that spawned this subscription (set at approval time).
     *
     * @generated from field: optional string procurement_request_id = 27;
     */
    procurementRequestId?: string;
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequest procurement_request = 28;
     */
    procurementRequest?: ProcurementRequest;
    /**
     * Location scope — mirrors PriceSchedule.location_id on selling side.
     *
     * @generated from field: optional string location_id = 30;
     */
    locationId?: string;
    /**
     * Operator-driven auto-renew flag. When date_time_end passes and auto_renew=true,
     * an operator-clicked "Renew" extends date_time_end by default_term_value × default_term_unit
     * from cost_plan. Nothing happens automatically in v1 (cron deferred to D2).
     *
     * @generated from field: bool auto_renew = 32;
     */
    autoRenew: boolean;
    /**
     * FK back-edge — Wave 4 self-domain plan (2026-05-17).
     * Snapshot of the disbursement profile that remits this supplier subscription.
     * Stored as string (no DB FK constraint) to survive profile edits — see architecture.md §3.5.
     *
     * @generated from field: optional string disbursement_profile_id_snapshot = 33;
     */
    disbursementProfileIdSnapshot?: string;
};
/**
 * Describes the message domain.procurement.v1.SupplierSubscription.
 * Use `create(SupplierSubscriptionSchema)` to create a new message.
 */
export declare const SupplierSubscriptionSchema: GenMessage<SupplierSubscription>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierSubscriptionRequest
 */
export type CreateSupplierSubscriptionRequest = Message<"domain.procurement.v1.CreateSupplierSubscriptionRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierSubscription data = 1;
     */
    data?: SupplierSubscription;
};
/**
 * Describes the message domain.procurement.v1.CreateSupplierSubscriptionRequest.
 * Use `create(CreateSupplierSubscriptionRequestSchema)` to create a new message.
 */
export declare const CreateSupplierSubscriptionRequestSchema: GenMessage<CreateSupplierSubscriptionRequest>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierSubscriptionResponse
 */
export type CreateSupplierSubscriptionResponse = Message<"domain.procurement.v1.CreateSupplierSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierSubscription data = 1;
     */
    data: SupplierSubscription[];
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
 * Describes the message domain.procurement.v1.CreateSupplierSubscriptionResponse.
 * Use `create(CreateSupplierSubscriptionResponseSchema)` to create a new message.
 */
export declare const CreateSupplierSubscriptionResponseSchema: GenMessage<CreateSupplierSubscriptionResponse>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierSubscriptionRequest
 */
export type ReadSupplierSubscriptionRequest = Message<"domain.procurement.v1.ReadSupplierSubscriptionRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierSubscription data = 1;
     */
    data?: SupplierSubscription;
};
/**
 * Describes the message domain.procurement.v1.ReadSupplierSubscriptionRequest.
 * Use `create(ReadSupplierSubscriptionRequestSchema)` to create a new message.
 */
export declare const ReadSupplierSubscriptionRequestSchema: GenMessage<ReadSupplierSubscriptionRequest>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierSubscriptionResponse
 */
export type ReadSupplierSubscriptionResponse = Message<"domain.procurement.v1.ReadSupplierSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierSubscription data = 1;
     */
    data: SupplierSubscription[];
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
 * Describes the message domain.procurement.v1.ReadSupplierSubscriptionResponse.
 * Use `create(ReadSupplierSubscriptionResponseSchema)` to create a new message.
 */
export declare const ReadSupplierSubscriptionResponseSchema: GenMessage<ReadSupplierSubscriptionResponse>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierSubscriptionRequest
 */
export type UpdateSupplierSubscriptionRequest = Message<"domain.procurement.v1.UpdateSupplierSubscriptionRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierSubscription data = 1;
     */
    data?: SupplierSubscription;
};
/**
 * Describes the message domain.procurement.v1.UpdateSupplierSubscriptionRequest.
 * Use `create(UpdateSupplierSubscriptionRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierSubscriptionRequestSchema: GenMessage<UpdateSupplierSubscriptionRequest>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierSubscriptionResponse
 */
export type UpdateSupplierSubscriptionResponse = Message<"domain.procurement.v1.UpdateSupplierSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierSubscription data = 1;
     */
    data: SupplierSubscription[];
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
 * Describes the message domain.procurement.v1.UpdateSupplierSubscriptionResponse.
 * Use `create(UpdateSupplierSubscriptionResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierSubscriptionResponseSchema: GenMessage<UpdateSupplierSubscriptionResponse>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierSubscriptionRequest
 */
export type DeleteSupplierSubscriptionRequest = Message<"domain.procurement.v1.DeleteSupplierSubscriptionRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierSubscription data = 1;
     */
    data?: SupplierSubscription;
};
/**
 * Describes the message domain.procurement.v1.DeleteSupplierSubscriptionRequest.
 * Use `create(DeleteSupplierSubscriptionRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierSubscriptionRequestSchema: GenMessage<DeleteSupplierSubscriptionRequest>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierSubscriptionResponse
 */
export type DeleteSupplierSubscriptionResponse = Message<"domain.procurement.v1.DeleteSupplierSubscriptionResponse"> & {
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
 * Describes the message domain.procurement.v1.DeleteSupplierSubscriptionResponse.
 * Use `create(DeleteSupplierSubscriptionResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierSubscriptionResponseSchema: GenMessage<DeleteSupplierSubscriptionResponse>;
/**
 * @generated from message domain.procurement.v1.ListSupplierSubscriptionsRequest
 */
export type ListSupplierSubscriptionsRequest = Message<"domain.procurement.v1.ListSupplierSubscriptionsRequest"> & {
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
 * Describes the message domain.procurement.v1.ListSupplierSubscriptionsRequest.
 * Use `create(ListSupplierSubscriptionsRequestSchema)` to create a new message.
 */
export declare const ListSupplierSubscriptionsRequestSchema: GenMessage<ListSupplierSubscriptionsRequest>;
/**
 * @generated from message domain.procurement.v1.ListSupplierSubscriptionsResponse
 */
export type ListSupplierSubscriptionsResponse = Message<"domain.procurement.v1.ListSupplierSubscriptionsResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierSubscription data = 1;
     */
    data: SupplierSubscription[];
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
 * Describes the message domain.procurement.v1.ListSupplierSubscriptionsResponse.
 * Use `create(ListSupplierSubscriptionsResponseSchema)` to create a new message.
 */
export declare const ListSupplierSubscriptionsResponseSchema: GenMessage<ListSupplierSubscriptionsResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierSubscriptionListPageDataRequest
 */
export type GetSupplierSubscriptionListPageDataRequest = Message<"domain.procurement.v1.GetSupplierSubscriptionListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.procurement.v1.GetSupplierSubscriptionListPageDataRequest.
 * Use `create(GetSupplierSubscriptionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierSubscriptionListPageDataRequestSchema: GenMessage<GetSupplierSubscriptionListPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierSubscriptionListPageDataResponse
 */
export type GetSupplierSubscriptionListPageDataResponse = Message<"domain.procurement.v1.GetSupplierSubscriptionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierSubscription supplier_subscription_list = 1;
     */
    supplierSubscriptionList: SupplierSubscription[];
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
 * Describes the message domain.procurement.v1.GetSupplierSubscriptionListPageDataResponse.
 * Use `create(GetSupplierSubscriptionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierSubscriptionListPageDataResponseSchema: GenMessage<GetSupplierSubscriptionListPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierSubscriptionItemPageDataRequest
 */
export type GetSupplierSubscriptionItemPageDataRequest = Message<"domain.procurement.v1.GetSupplierSubscriptionItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_subscription_id = 1;
     */
    supplierSubscriptionId: string;
};
/**
 * Describes the message domain.procurement.v1.GetSupplierSubscriptionItemPageDataRequest.
 * Use `create(GetSupplierSubscriptionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierSubscriptionItemPageDataRequestSchema: GenMessage<GetSupplierSubscriptionItemPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierSubscriptionItemPageDataResponse
 */
export type GetSupplierSubscriptionItemPageDataResponse = Message<"domain.procurement.v1.GetSupplierSubscriptionItemPageDataResponse"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierSubscription supplier_subscription = 1;
     */
    supplierSubscription?: SupplierSubscription;
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
 * Describes the message domain.procurement.v1.GetSupplierSubscriptionItemPageDataResponse.
 * Use `create(GetSupplierSubscriptionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierSubscriptionItemPageDataResponseSchema: GenMessage<GetSupplierSubscriptionItemPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.CountActiveBySupplierIdsRequest
 */
export type CountActiveBySupplierIdsRequest = Message<"domain.procurement.v1.CountActiveBySupplierIdsRequest"> & {
    /**
     * empty = count all suppliers in the workspace
     *
     * @generated from field: repeated string supplier_ids = 1;
     */
    supplierIds: string[];
};
/**
 * Describes the message domain.procurement.v1.CountActiveBySupplierIdsRequest.
 * Use `create(CountActiveBySupplierIdsRequestSchema)` to create a new message.
 */
export declare const CountActiveBySupplierIdsRequestSchema: GenMessage<CountActiveBySupplierIdsRequest>;
/**
 * @generated from message domain.procurement.v1.CountActiveBySupplierIdsResponse
 */
export type CountActiveBySupplierIdsResponse = Message<"domain.procurement.v1.CountActiveBySupplierIdsResponse"> & {
    /**
     * Keys are supplier IDs; values are counts of active subscriptions for each.
     * Suppliers with zero active subscriptions are omitted (caller defaults to 0).
     *
     * @generated from field: map<string, int32> counts = 1;
     */
    counts: {
        [key: string]: number;
    };
};
/**
 * Describes the message domain.procurement.v1.CountActiveBySupplierIdsResponse.
 * Use `create(CountActiveBySupplierIdsResponseSchema)` to create a new message.
 */
export declare const CountActiveBySupplierIdsResponseSchema: GenMessage<CountActiveBySupplierIdsResponse>;
/**
 * @generated from message domain.procurement.v1.ListSupplierSubscriptionsByCostPlanRequest
 */
export type ListSupplierSubscriptionsByCostPlanRequest = Message<"domain.procurement.v1.ListSupplierSubscriptionsByCostPlanRequest"> & {
    /**
     * @generated from field: string cost_plan_id = 1;
     */
    costPlanId: string;
    /**
     * When true (default), only active subscriptions are returned.
     *
     * @generated from field: optional bool active_only = 2;
     */
    activeOnly?: boolean;
    /**
     * Optional pagination — omit for "all rows" (typical use case: a tab
     * listing engagements for one plan).
     *
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 3;
     */
    pagination?: PaginationRequest;
    /**
     * Optional sort — defaults to subscription name ascending when omitted.
     *
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
};
/**
 * Describes the message domain.procurement.v1.ListSupplierSubscriptionsByCostPlanRequest.
 * Use `create(ListSupplierSubscriptionsByCostPlanRequestSchema)` to create a new message.
 */
export declare const ListSupplierSubscriptionsByCostPlanRequestSchema: GenMessage<ListSupplierSubscriptionsByCostPlanRequest>;
/**
 * @generated from message domain.procurement.v1.ListSupplierSubscriptionsByCostPlanResponse
 */
export type ListSupplierSubscriptionsByCostPlanResponse = Message<"domain.procurement.v1.ListSupplierSubscriptionsByCostPlanResponse"> & {
    /**
     * Subscriptions hydrated with Supplier, CostPlan, and CostPlan.SupplierPlan
     * so the view layer can render Supplier name and Plan name without N+1 lookups.
     *
     * @generated from field: repeated domain.procurement.v1.SupplierSubscription supplier_subscription_list = 1;
     */
    supplierSubscriptionList: SupplierSubscription[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.procurement.v1.ListSupplierSubscriptionsByCostPlanResponse.
 * Use `create(ListSupplierSubscriptionsByCostPlanResponseSchema)` to create a new message.
 */
export declare const ListSupplierSubscriptionsByCostPlanResponseSchema: GenMessage<ListSupplierSubscriptionsByCostPlanResponse>;
/**
 * @generated from service domain.procurement.v1.SupplierSubscriptionDomainService
 */
export declare const SupplierSubscriptionDomainService: GenService<{
    /**
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.CreateSupplierSubscription
     */
    createSupplierSubscription: {
        methodKind: "unary";
        input: typeof CreateSupplierSubscriptionRequestSchema;
        output: typeof CreateSupplierSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.ReadSupplierSubscription
     */
    readSupplierSubscription: {
        methodKind: "unary";
        input: typeof ReadSupplierSubscriptionRequestSchema;
        output: typeof ReadSupplierSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.UpdateSupplierSubscription
     */
    updateSupplierSubscription: {
        methodKind: "unary";
        input: typeof UpdateSupplierSubscriptionRequestSchema;
        output: typeof UpdateSupplierSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.DeleteSupplierSubscription
     */
    deleteSupplierSubscription: {
        methodKind: "unary";
        input: typeof DeleteSupplierSubscriptionRequestSchema;
        output: typeof DeleteSupplierSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.ListSupplierSubscriptions
     */
    listSupplierSubscriptions: {
        methodKind: "unary";
        input: typeof ListSupplierSubscriptionsRequestSchema;
        output: typeof ListSupplierSubscriptionsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.GetSupplierSubscriptionListPageData
     */
    getSupplierSubscriptionListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierSubscriptionListPageDataRequestSchema;
        output: typeof GetSupplierSubscriptionListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.GetSupplierSubscriptionItemPageData
     */
    getSupplierSubscriptionItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierSubscriptionItemPageDataRequestSchema;
        output: typeof GetSupplierSubscriptionItemPageDataResponseSchema;
    };
    /**
     * Count active subscriptions for each of the given supplier IDs.
     * Mirrors CountActiveByClientIds on selling-side SubscriptionDomainService.
     *
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.CountActiveBySupplierIds
     */
    countActiveBySupplierIds: {
        methodKind: "unary";
        input: typeof CountActiveBySupplierIdsRequestSchema;
        output: typeof CountActiveBySupplierIdsResponseSchema;
    };
    /**
     * Reverse index: subscriptions referencing a given cost plan.
     * Mirrors ListSubscriptionsByPricePlan on selling side.
     *
     * @generated from rpc domain.procurement.v1.SupplierSubscriptionDomainService.ListSupplierSubscriptionsByCostPlan
     */
    listSupplierSubscriptionsByCostPlan: {
        methodKind: "unary";
        input: typeof ListSupplierSubscriptionsByCostPlanRequestSchema;
        output: typeof ListSupplierSubscriptionsByCostPlanResponseSchema;
    };
}>;
