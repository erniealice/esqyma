import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tenancy/tenant_subscription/tenant_subscription.proto.
 */
export declare const file_domain_tenancy_tenant_subscription_tenant_subscription: GenFile;
/**
 * @generated from message domain.tenancy.v1.TenantSubscription
 */
export type TenantSubscription = Message<"domain.tenancy.v1.TenantSubscription"> & {
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
     * "starter" | "professional" | "scale" — opaque, set by Ichizen
     *
     * @generated from field: string plan_code = 8;
     */
    planCode: string;
    /**
     * denormed for UI
     *
     * @generated from field: string plan_display_name = 9;
     */
    planDisplayName: string;
    /**
     * @generated from field: domain.tenancy.v1.TenantSubscriptionStatus status = 10;
     */
    status: TenantSubscriptionStatus;
    /**
     * "monthly" | "annual"
     *
     * @generated from field: string billing_cycle = 11;
     */
    billingCycle: string;
    /**
     * centavos
     *
     * @generated from field: int64 cycle_amount = 12;
     */
    cycleAmount: bigint;
    /**
     * ISO 4217
     *
     * @generated from field: string currency = 13;
     */
    currency: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: string period_start = 14;
     */
    periodStart: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: string period_end = 15;
     */
    periodEnd: string;
    /**
     * ISO 8601 date — null when not in trial
     *
     * @generated from field: optional string trial_end = 16;
     */
    trialEnd?: string;
    /**
     * @generated from field: optional string cancelled_at = 17;
     */
    cancelledAt?: string;
    /**
     * @generated from field: optional string default_payment_method_id = 18;
     */
    defaultPaymentMethodId?: string;
    /**
     * Ichizen master billing system ref
     *
     * @generated from field: optional string external_ref = 19;
     */
    externalRef?: string;
};
/**
 * Describes the message domain.tenancy.v1.TenantSubscription.
 * Use `create(TenantSubscriptionSchema)` to create a new message.
 */
export declare const TenantSubscriptionSchema: GenMessage<TenantSubscription>;
/**
 * @generated from message domain.tenancy.v1.CreateTenantSubscriptionRequest
 */
export type CreateTenantSubscriptionRequest = Message<"domain.tenancy.v1.CreateTenantSubscriptionRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantSubscription data = 1;
     */
    data?: TenantSubscription;
};
/**
 * Describes the message domain.tenancy.v1.CreateTenantSubscriptionRequest.
 * Use `create(CreateTenantSubscriptionRequestSchema)` to create a new message.
 */
export declare const CreateTenantSubscriptionRequestSchema: GenMessage<CreateTenantSubscriptionRequest>;
/**
 * @generated from message domain.tenancy.v1.CreateTenantSubscriptionResponse
 */
export type CreateTenantSubscriptionResponse = Message<"domain.tenancy.v1.CreateTenantSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantSubscription data = 1;
     */
    data: TenantSubscription[];
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
 * Describes the message domain.tenancy.v1.CreateTenantSubscriptionResponse.
 * Use `create(CreateTenantSubscriptionResponseSchema)` to create a new message.
 */
export declare const CreateTenantSubscriptionResponseSchema: GenMessage<CreateTenantSubscriptionResponse>;
/**
 * @generated from message domain.tenancy.v1.ReadTenantSubscriptionRequest
 */
export type ReadTenantSubscriptionRequest = Message<"domain.tenancy.v1.ReadTenantSubscriptionRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantSubscription data = 1;
     */
    data?: TenantSubscription;
};
/**
 * Describes the message domain.tenancy.v1.ReadTenantSubscriptionRequest.
 * Use `create(ReadTenantSubscriptionRequestSchema)` to create a new message.
 */
export declare const ReadTenantSubscriptionRequestSchema: GenMessage<ReadTenantSubscriptionRequest>;
/**
 * @generated from message domain.tenancy.v1.ReadTenantSubscriptionResponse
 */
export type ReadTenantSubscriptionResponse = Message<"domain.tenancy.v1.ReadTenantSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantSubscription data = 1;
     */
    data: TenantSubscription[];
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
 * Describes the message domain.tenancy.v1.ReadTenantSubscriptionResponse.
 * Use `create(ReadTenantSubscriptionResponseSchema)` to create a new message.
 */
export declare const ReadTenantSubscriptionResponseSchema: GenMessage<ReadTenantSubscriptionResponse>;
/**
 * @generated from message domain.tenancy.v1.UpdateTenantSubscriptionRequest
 */
export type UpdateTenantSubscriptionRequest = Message<"domain.tenancy.v1.UpdateTenantSubscriptionRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantSubscription data = 1;
     */
    data?: TenantSubscription;
};
/**
 * Describes the message domain.tenancy.v1.UpdateTenantSubscriptionRequest.
 * Use `create(UpdateTenantSubscriptionRequestSchema)` to create a new message.
 */
export declare const UpdateTenantSubscriptionRequestSchema: GenMessage<UpdateTenantSubscriptionRequest>;
/**
 * @generated from message domain.tenancy.v1.UpdateTenantSubscriptionResponse
 */
export type UpdateTenantSubscriptionResponse = Message<"domain.tenancy.v1.UpdateTenantSubscriptionResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantSubscription data = 1;
     */
    data: TenantSubscription[];
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
 * Describes the message domain.tenancy.v1.UpdateTenantSubscriptionResponse.
 * Use `create(UpdateTenantSubscriptionResponseSchema)` to create a new message.
 */
export declare const UpdateTenantSubscriptionResponseSchema: GenMessage<UpdateTenantSubscriptionResponse>;
/**
 * @generated from message domain.tenancy.v1.DeleteTenantSubscriptionRequest
 */
export type DeleteTenantSubscriptionRequest = Message<"domain.tenancy.v1.DeleteTenantSubscriptionRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantSubscription data = 1;
     */
    data?: TenantSubscription;
};
/**
 * Describes the message domain.tenancy.v1.DeleteTenantSubscriptionRequest.
 * Use `create(DeleteTenantSubscriptionRequestSchema)` to create a new message.
 */
export declare const DeleteTenantSubscriptionRequestSchema: GenMessage<DeleteTenantSubscriptionRequest>;
/**
 * @generated from message domain.tenancy.v1.DeleteTenantSubscriptionResponse
 */
export type DeleteTenantSubscriptionResponse = Message<"domain.tenancy.v1.DeleteTenantSubscriptionResponse"> & {
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
 * Describes the message domain.tenancy.v1.DeleteTenantSubscriptionResponse.
 * Use `create(DeleteTenantSubscriptionResponseSchema)` to create a new message.
 */
export declare const DeleteTenantSubscriptionResponseSchema: GenMessage<DeleteTenantSubscriptionResponse>;
/**
 * @generated from message domain.tenancy.v1.ListTenantSubscriptionsRequest
 */
export type ListTenantSubscriptionsRequest = Message<"domain.tenancy.v1.ListTenantSubscriptionsRequest"> & {
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
 * Describes the message domain.tenancy.v1.ListTenantSubscriptionsRequest.
 * Use `create(ListTenantSubscriptionsRequestSchema)` to create a new message.
 */
export declare const ListTenantSubscriptionsRequestSchema: GenMessage<ListTenantSubscriptionsRequest>;
/**
 * @generated from message domain.tenancy.v1.ListTenantSubscriptionsResponse
 */
export type ListTenantSubscriptionsResponse = Message<"domain.tenancy.v1.ListTenantSubscriptionsResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantSubscription data = 1;
     */
    data: TenantSubscription[];
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
 * Describes the message domain.tenancy.v1.ListTenantSubscriptionsResponse.
 * Use `create(ListTenantSubscriptionsResponseSchema)` to create a new message.
 */
export declare const ListTenantSubscriptionsResponseSchema: GenMessage<ListTenantSubscriptionsResponse>;
/**
 * @generated from message domain.tenancy.v1.GetTenantSubscriptionListPageDataRequest
 */
export type GetTenantSubscriptionListPageDataRequest = Message<"domain.tenancy.v1.GetTenantSubscriptionListPageDataRequest"> & {
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
 * Describes the message domain.tenancy.v1.GetTenantSubscriptionListPageDataRequest.
 * Use `create(GetTenantSubscriptionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTenantSubscriptionListPageDataRequestSchema: GenMessage<GetTenantSubscriptionListPageDataRequest>;
/**
 * @generated from message domain.tenancy.v1.GetTenantSubscriptionListPageDataResponse
 */
export type GetTenantSubscriptionListPageDataResponse = Message<"domain.tenancy.v1.GetTenantSubscriptionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantSubscription tenant_subscription_list = 1;
     */
    tenantSubscriptionList: TenantSubscription[];
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
 * Describes the message domain.tenancy.v1.GetTenantSubscriptionListPageDataResponse.
 * Use `create(GetTenantSubscriptionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTenantSubscriptionListPageDataResponseSchema: GenMessage<GetTenantSubscriptionListPageDataResponse>;
/**
 * @generated from message domain.tenancy.v1.GetTenantSubscriptionItemPageDataRequest
 */
export type GetTenantSubscriptionItemPageDataRequest = Message<"domain.tenancy.v1.GetTenantSubscriptionItemPageDataRequest"> & {
    /**
     * @generated from field: string tenant_subscription_id = 1;
     */
    tenantSubscriptionId: string;
};
/**
 * Describes the message domain.tenancy.v1.GetTenantSubscriptionItemPageDataRequest.
 * Use `create(GetTenantSubscriptionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTenantSubscriptionItemPageDataRequestSchema: GenMessage<GetTenantSubscriptionItemPageDataRequest>;
/**
 * @generated from message domain.tenancy.v1.GetTenantSubscriptionItemPageDataResponse
 */
export type GetTenantSubscriptionItemPageDataResponse = Message<"domain.tenancy.v1.GetTenantSubscriptionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tenancy.v1.TenantSubscription tenant_subscription = 1;
     */
    tenantSubscription?: TenantSubscription;
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
 * Describes the message domain.tenancy.v1.GetTenantSubscriptionItemPageDataResponse.
 * Use `create(GetTenantSubscriptionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTenantSubscriptionItemPageDataResponseSchema: GenMessage<GetTenantSubscriptionItemPageDataResponse>;
/**
 * TenantSubscriptionStatus represents the billing lifecycle of a workspace's
 * Ichizen platform subscription. One active subscription per workspace enforced
 * by a partial unique index on (workspace_id) WHERE status IN (TRIAL, ACTIVE,
 * PAST_DUE, SUSPENDED).
 *
 * @generated from enum domain.tenancy.v1.TenantSubscriptionStatus
 */
export declare enum TenantSubscriptionStatus {
    /**
     * @generated from enum value: TENANT_SUBSCRIPTION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TENANT_SUBSCRIPTION_STATUS_TRIAL = 1;
     */
    TRIAL = 1,
    /**
     * @generated from enum value: TENANT_SUBSCRIPTION_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: TENANT_SUBSCRIPTION_STATUS_PAST_DUE = 3;
     */
    PAST_DUE = 3,
    /**
     * @generated from enum value: TENANT_SUBSCRIPTION_STATUS_SUSPENDED = 4;
     */
    SUSPENDED = 4,
    /**
     * @generated from enum value: TENANT_SUBSCRIPTION_STATUS_CANCELLED = 5;
     */
    CANCELLED = 5
}
/**
 * Describes the enum domain.tenancy.v1.TenantSubscriptionStatus.
 */
export declare const TenantSubscriptionStatusSchema: GenEnum<TenantSubscriptionStatus>;
/**
 * @generated from service domain.tenancy.v1.TenantSubscriptionDomainService
 */
export declare const TenantSubscriptionDomainService: GenService<{
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.CreateTenantSubscription
     */
    createTenantSubscription: {
        methodKind: "unary";
        input: typeof CreateTenantSubscriptionRequestSchema;
        output: typeof CreateTenantSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.ReadTenantSubscription
     */
    readTenantSubscription: {
        methodKind: "unary";
        input: typeof ReadTenantSubscriptionRequestSchema;
        output: typeof ReadTenantSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.UpdateTenantSubscription
     */
    updateTenantSubscription: {
        methodKind: "unary";
        input: typeof UpdateTenantSubscriptionRequestSchema;
        output: typeof UpdateTenantSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.DeleteTenantSubscription
     */
    deleteTenantSubscription: {
        methodKind: "unary";
        input: typeof DeleteTenantSubscriptionRequestSchema;
        output: typeof DeleteTenantSubscriptionResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.ListTenantSubscriptions
     */
    listTenantSubscriptions: {
        methodKind: "unary";
        input: typeof ListTenantSubscriptionsRequestSchema;
        output: typeof ListTenantSubscriptionsResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.GetTenantSubscriptionListPageData
     */
    getTenantSubscriptionListPageData: {
        methodKind: "unary";
        input: typeof GetTenantSubscriptionListPageDataRequestSchema;
        output: typeof GetTenantSubscriptionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantSubscriptionDomainService.GetTenantSubscriptionItemPageData
     */
    getTenantSubscriptionItemPageData: {
        methodKind: "unary";
        input: typeof GetTenantSubscriptionItemPageDataRequestSchema;
        output: typeof GetTenantSubscriptionItemPageDataResponseSchema;
    };
}>;
