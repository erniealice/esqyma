import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_group_product_plan_staff/subscription_group_product_plan_staff.proto.
 */
export declare const file_domain_subscription_subscription_group_product_plan_staff_subscription_group_product_plan_staff: GenFile;
/**
 * SubscriptionGroupProductPlanStaff is the CLASS EDGE — the per-section
 * deliverer of record: (subscription_group x product_plan x staff x role). It
 * is the scalable per-section sibling of the per-student subscription_seat, and
 * doubles as the grade-sheet scope (rows = members, cols = the subject's tasks x
 * criteria). Because subscription_group is year-scoped (via price_schedule_id),
 * the class edge is already per-year — the catalog is never duplicated.
 * Self-validates at the use-case layer: product_plan.plan_id ==
 * subscription_group.plan_id, with an active product_plan_staff eligibility.
 *
 * @generated from message domain.subscription.v1.SubscriptionGroupProductPlanStaff
 */
export type SubscriptionGroupProductPlanStaff = Message<"domain.subscription.v1.SubscriptionGroupProductPlanStaff"> & {
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
     * @generated from field: string staff_id = 10;
     */
    staffId: string;
    /**
     * @generated from field: string role = 11;
     */
    role: string;
    /**
     * v2 re-parenting (docs/plan/20260724-section-assignment-merged): the edge
     * becomes (class × eligibility [× phase]); legacy f8/f9/f10 stay populated
     * (dual-write) until the M7 retirement decision (D-8).
     *
     * @generated from field: optional string subscription_group_product_plan_id = 12;
     */
    subscriptionGroupProductPlanId?: string;
    /**
     * @generated from field: optional string product_plan_staff_id = 13;
     */
    productPlanStaffId?: string;
    /**
     * NULL = all phases (coverage rule plan.md §2.5)
     *
     * @generated from field: optional string job_template_phase_id = 14;
     */
    jobTemplatePhaseId?: string;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionGroupProductPlanStaff.
 * Use `create(SubscriptionGroupProductPlanStaffSchema)` to create a new message.
 */
export declare const SubscriptionGroupProductPlanStaffSchema: GenMessage<SubscriptionGroupProductPlanStaff>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupProductPlanStaffRequest
 */
export type CreateSubscriptionGroupProductPlanStaffRequest = Message<"domain.subscription.v1.CreateSubscriptionGroupProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data?: SubscriptionGroupProductPlanStaff;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupProductPlanStaffRequest.
 * Use `create(CreateSubscriptionGroupProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupProductPlanStaffRequestSchema: GenMessage<CreateSubscriptionGroupProductPlanStaffRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupProductPlanStaffResponse
 */
export type CreateSubscriptionGroupProductPlanStaffResponse = Message<"domain.subscription.v1.CreateSubscriptionGroupProductPlanStaffResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data: SubscriptionGroupProductPlanStaff[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupProductPlanStaffResponse.
 * Use `create(CreateSubscriptionGroupProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupProductPlanStaffResponseSchema: GenMessage<CreateSubscriptionGroupProductPlanStaffResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupProductPlanStaffRequest
 */
export type ReadSubscriptionGroupProductPlanStaffRequest = Message<"domain.subscription.v1.ReadSubscriptionGroupProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data?: SubscriptionGroupProductPlanStaff;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupProductPlanStaffRequest.
 * Use `create(ReadSubscriptionGroupProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupProductPlanStaffRequestSchema: GenMessage<ReadSubscriptionGroupProductPlanStaffRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupProductPlanStaffResponse
 */
export type ReadSubscriptionGroupProductPlanStaffResponse = Message<"domain.subscription.v1.ReadSubscriptionGroupProductPlanStaffResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data: SubscriptionGroupProductPlanStaff[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupProductPlanStaffResponse.
 * Use `create(ReadSubscriptionGroupProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupProductPlanStaffResponseSchema: GenMessage<ReadSubscriptionGroupProductPlanStaffResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupProductPlanStaffRequest
 */
export type UpdateSubscriptionGroupProductPlanStaffRequest = Message<"domain.subscription.v1.UpdateSubscriptionGroupProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data?: SubscriptionGroupProductPlanStaff;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupProductPlanStaffRequest.
 * Use `create(UpdateSubscriptionGroupProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupProductPlanStaffRequestSchema: GenMessage<UpdateSubscriptionGroupProductPlanStaffRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupProductPlanStaffResponse
 */
export type UpdateSubscriptionGroupProductPlanStaffResponse = Message<"domain.subscription.v1.UpdateSubscriptionGroupProductPlanStaffResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data: SubscriptionGroupProductPlanStaff[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupProductPlanStaffResponse.
 * Use `create(UpdateSubscriptionGroupProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupProductPlanStaffResponseSchema: GenMessage<UpdateSubscriptionGroupProductPlanStaffResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupProductPlanStaffRequest
 */
export type DeleteSubscriptionGroupProductPlanStaffRequest = Message<"domain.subscription.v1.DeleteSubscriptionGroupProductPlanStaffRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data?: SubscriptionGroupProductPlanStaff;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupProductPlanStaffRequest.
 * Use `create(DeleteSubscriptionGroupProductPlanStaffRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupProductPlanStaffRequestSchema: GenMessage<DeleteSubscriptionGroupProductPlanStaffRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupProductPlanStaffResponse
 */
export type DeleteSubscriptionGroupProductPlanStaffResponse = Message<"domain.subscription.v1.DeleteSubscriptionGroupProductPlanStaffResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupProductPlanStaffResponse.
 * Use `create(DeleteSubscriptionGroupProductPlanStaffResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupProductPlanStaffResponseSchema: GenMessage<DeleteSubscriptionGroupProductPlanStaffResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupProductPlanStaffsRequest
 */
export type ListSubscriptionGroupProductPlanStaffsRequest = Message<"domain.subscription.v1.ListSubscriptionGroupProductPlanStaffsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupProductPlanStaffsRequest.
 * Use `create(ListSubscriptionGroupProductPlanStaffsRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupProductPlanStaffsRequestSchema: GenMessage<ListSubscriptionGroupProductPlanStaffsRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupProductPlanStaffsResponse
 */
export type ListSubscriptionGroupProductPlanStaffsResponse = Message<"domain.subscription.v1.ListSubscriptionGroupProductPlanStaffsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlanStaff data = 1;
     */
    data: SubscriptionGroupProductPlanStaff[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupProductPlanStaffsResponse.
 * Use `create(ListSubscriptionGroupProductPlanStaffsResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupProductPlanStaffsResponseSchema: GenMessage<ListSubscriptionGroupProductPlanStaffsResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffListPageDataRequest
 */
export type GetSubscriptionGroupProductPlanStaffListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanStaffListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffListPageDataRequest.
 * Use `create(GetSubscriptionGroupProductPlanStaffListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanStaffListPageDataRequestSchema: GenMessage<GetSubscriptionGroupProductPlanStaffListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffListPageDataResponse
 */
export type GetSubscriptionGroupProductPlanStaffListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanStaffListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroupProductPlanStaff subscription_group_product_plan_staff_list = 1;
     */
    subscriptionGroupProductPlanStaffList: SubscriptionGroupProductPlanStaff[];
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffListPageDataResponse.
 * Use `create(GetSubscriptionGroupProductPlanStaffListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanStaffListPageDataResponseSchema: GenMessage<GetSubscriptionGroupProductPlanStaffListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffItemPageDataRequest
 */
export type GetSubscriptionGroupProductPlanStaffItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanStaffItemPageDataRequest"> & {
    /**
     * @generated from field: string subscription_group_product_plan_staff_id = 1;
     */
    subscriptionGroupProductPlanStaffId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffItemPageDataRequest.
 * Use `create(GetSubscriptionGroupProductPlanStaffItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanStaffItemPageDataRequestSchema: GenMessage<GetSubscriptionGroupProductPlanStaffItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffItemPageDataResponse
 */
export type GetSubscriptionGroupProductPlanStaffItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupProductPlanStaffItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroupProductPlanStaff subscription_group_product_plan_staff = 1;
     */
    subscriptionGroupProductPlanStaff?: SubscriptionGroupProductPlanStaff;
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
 * Describes the message domain.subscription.v1.GetSubscriptionGroupProductPlanStaffItemPageDataResponse.
 * Use `create(GetSubscriptionGroupProductPlanStaffItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupProductPlanStaffItemPageDataResponseSchema: GenMessage<GetSubscriptionGroupProductPlanStaffItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService
 */
export declare const SubscriptionGroupProductPlanStaffDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.CreateSubscriptionGroupProductPlanStaff
     */
    createSubscriptionGroupProductPlanStaff: {
        methodKind: "unary";
        input: typeof CreateSubscriptionGroupProductPlanStaffRequestSchema;
        output: typeof CreateSubscriptionGroupProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.ReadSubscriptionGroupProductPlanStaff
     */
    readSubscriptionGroupProductPlanStaff: {
        methodKind: "unary";
        input: typeof ReadSubscriptionGroupProductPlanStaffRequestSchema;
        output: typeof ReadSubscriptionGroupProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.UpdateSubscriptionGroupProductPlanStaff
     */
    updateSubscriptionGroupProductPlanStaff: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionGroupProductPlanStaffRequestSchema;
        output: typeof UpdateSubscriptionGroupProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.DeleteSubscriptionGroupProductPlanStaff
     */
    deleteSubscriptionGroupProductPlanStaff: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionGroupProductPlanStaffRequestSchema;
        output: typeof DeleteSubscriptionGroupProductPlanStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.ListSubscriptionGroupProductPlanStaffs
     */
    listSubscriptionGroupProductPlanStaffs: {
        methodKind: "unary";
        input: typeof ListSubscriptionGroupProductPlanStaffsRequestSchema;
        output: typeof ListSubscriptionGroupProductPlanStaffsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.GetSubscriptionGroupProductPlanStaffListPageData
     */
    getSubscriptionGroupProductPlanStaffListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupProductPlanStaffListPageDataRequestSchema;
        output: typeof GetSubscriptionGroupProductPlanStaffListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupProductPlanStaffDomainService.GetSubscriptionGroupProductPlanStaffItemPageData
     */
    getSubscriptionGroupProductPlanStaffItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupProductPlanStaffItemPageDataRequestSchema;
        output: typeof GetSubscriptionGroupProductPlanStaffItemPageDataResponseSchema;
    };
}>;
