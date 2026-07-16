import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { PriceSchedule } from "../price_schedule/price_schedule_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/subscription_group/subscription_group.proto.
 */
export declare const file_domain_subscription_subscription_group_subscription_group: GenFile;
/**
 * SubscriptionGroup is a first-class per-period COHORT — a class roster, a
 * patient panel, or a project team. It anchors a set of subscription_group_member
 * rows to a single billing period via its price_schedule_id (the AY anchor) and
 * to a plan_id (the PROGRAM). Section identity = (plan_id x price_schedule_id).
 * Capacity is governed by capacity_mode (+ max_capacity when CAPPED).
 *
 * @generated from message domain.subscription.v1.SubscriptionGroup
 */
export type SubscriptionGroup = Message<"domain.subscription.v1.SubscriptionGroup"> & {
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
     * kind discriminates the cohort shape: "cohort" / "roster" / "panel" / "project_team".
     *
     * @generated from field: string kind = 8;
     */
    kind: string;
    /**
     * price_schedule_id is the period anchor (e.g. the academic-year price_schedule).
     *
     * @generated from field: optional string price_schedule_id = 9;
     */
    priceScheduleId?: string;
    /**
     * Workspace ownership — subscription groups are scoped per workspace.
     *
     * @generated from field: optional string workspace_id = 11;
     */
    workspaceId?: string;
    /**
     * plan_id is the PROGRAM the cohort realizes (NOT price_plan_id — billing
     * varies per member). Section identity = (plan_id x price_schedule_id).
     *
     * @generated from field: optional string plan_id = 12;
     */
    planId?: string;
    /**
     * capacity_mode governs enrollment capacity; max_capacity is read ONLY when
     * capacity_mode = CAPACITY_MODE_CAPPED. UNSPECIFIED is treated as UNLIMITED.
     *
     * @generated from field: domain.subscription.v1.CapacityMode capacity_mode = 13;
     */
    capacityMode: CapacityMode;
    /**
     * @generated from field: optional int32 max_capacity = 14;
     */
    maxCapacity?: number;
    /**
     * Nested related read-model object — populated by the list adapter via a
     * STATUS-AGNOSTIC join (a section may reference an archived AY). Not a column.
     *
     * @generated from field: optional domain.subscription.v1.PriceSchedule price_schedule = 15;
     */
    priceSchedule?: PriceSchedule;
};
/**
 * Describes the message domain.subscription.v1.SubscriptionGroup.
 * Use `create(SubscriptionGroupSchema)` to create a new message.
 */
export declare const SubscriptionGroupSchema: GenMessage<SubscriptionGroup>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupRequest
 */
export type CreateSubscriptionGroupRequest = Message<"domain.subscription.v1.CreateSubscriptionGroupRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data?: SubscriptionGroup;
};
/**
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupRequest.
 * Use `create(CreateSubscriptionGroupRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupRequestSchema: GenMessage<CreateSubscriptionGroupRequest>;
/**
 * @generated from message domain.subscription.v1.CreateSubscriptionGroupResponse
 */
export type CreateSubscriptionGroupResponse = Message<"domain.subscription.v1.CreateSubscriptionGroupResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data: SubscriptionGroup[];
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
 * Describes the message domain.subscription.v1.CreateSubscriptionGroupResponse.
 * Use `create(CreateSubscriptionGroupResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupResponseSchema: GenMessage<CreateSubscriptionGroupResponse>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupRequest
 */
export type ReadSubscriptionGroupRequest = Message<"domain.subscription.v1.ReadSubscriptionGroupRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data?: SubscriptionGroup;
};
/**
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupRequest.
 * Use `create(ReadSubscriptionGroupRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupRequestSchema: GenMessage<ReadSubscriptionGroupRequest>;
/**
 * @generated from message domain.subscription.v1.ReadSubscriptionGroupResponse
 */
export type ReadSubscriptionGroupResponse = Message<"domain.subscription.v1.ReadSubscriptionGroupResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data: SubscriptionGroup[];
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
 * Describes the message domain.subscription.v1.ReadSubscriptionGroupResponse.
 * Use `create(ReadSubscriptionGroupResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupResponseSchema: GenMessage<ReadSubscriptionGroupResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupRequest
 */
export type UpdateSubscriptionGroupRequest = Message<"domain.subscription.v1.UpdateSubscriptionGroupRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data?: SubscriptionGroup;
};
/**
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupRequest.
 * Use `create(UpdateSubscriptionGroupRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupRequestSchema: GenMessage<UpdateSubscriptionGroupRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateSubscriptionGroupResponse
 */
export type UpdateSubscriptionGroupResponse = Message<"domain.subscription.v1.UpdateSubscriptionGroupResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data: SubscriptionGroup[];
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
 * Describes the message domain.subscription.v1.UpdateSubscriptionGroupResponse.
 * Use `create(UpdateSubscriptionGroupResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupResponseSchema: GenMessage<UpdateSubscriptionGroupResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupRequest
 */
export type DeleteSubscriptionGroupRequest = Message<"domain.subscription.v1.DeleteSubscriptionGroupRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data?: SubscriptionGroup;
};
/**
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupRequest.
 * Use `create(DeleteSubscriptionGroupRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupRequestSchema: GenMessage<DeleteSubscriptionGroupRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteSubscriptionGroupResponse
 */
export type DeleteSubscriptionGroupResponse = Message<"domain.subscription.v1.DeleteSubscriptionGroupResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteSubscriptionGroupResponse.
 * Use `create(DeleteSubscriptionGroupResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupResponseSchema: GenMessage<DeleteSubscriptionGroupResponse>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupsRequest
 */
export type ListSubscriptionGroupsRequest = Message<"domain.subscription.v1.ListSubscriptionGroupsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupsRequest.
 * Use `create(ListSubscriptionGroupsRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupsRequestSchema: GenMessage<ListSubscriptionGroupsRequest>;
/**
 * @generated from message domain.subscription.v1.ListSubscriptionGroupsResponse
 */
export type ListSubscriptionGroupsResponse = Message<"domain.subscription.v1.ListSubscriptionGroupsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroup data = 1;
     */
    data: SubscriptionGroup[];
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
 * Describes the message domain.subscription.v1.ListSubscriptionGroupsResponse.
 * Use `create(ListSubscriptionGroupsResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupsResponseSchema: GenMessage<ListSubscriptionGroupsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetSubscriptionGroupListPageDataRequest
 */
export type GetSubscriptionGroupListPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupListPageDataRequest.
 * Use `create(GetSubscriptionGroupListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupListPageDataRequestSchema: GenMessage<GetSubscriptionGroupListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetSubscriptionGroupListPageDataResponse
 */
export type GetSubscriptionGroupListPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupListPageDataResponse"> & {
    /**
     * The subscription group data
     *
     * @generated from field: repeated domain.subscription.v1.SubscriptionGroup subscription_group_list = 1;
     */
    subscriptionGroupList: SubscriptionGroup[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupListPageDataResponse.
 * Use `create(GetSubscriptionGroupListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupListPageDataResponseSchema: GenMessage<GetSubscriptionGroupListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetSubscriptionGroupItemPageDataRequest
 */
export type GetSubscriptionGroupItemPageDataRequest = Message<"domain.subscription.v1.GetSubscriptionGroupItemPageDataRequest"> & {
    /**
     * The subscription group ID to retrieve
     *
     * @generated from field: string subscription_group_id = 1;
     */
    subscriptionGroupId: string;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupItemPageDataRequest.
 * Use `create(GetSubscriptionGroupItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupItemPageDataRequestSchema: GenMessage<GetSubscriptionGroupItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetSubscriptionGroupItemPageDataResponse
 */
export type GetSubscriptionGroupItemPageDataResponse = Message<"domain.subscription.v1.GetSubscriptionGroupItemPageDataResponse"> & {
    /**
     * The subscription group data
     *
     * @generated from field: domain.subscription.v1.SubscriptionGroup subscription_group = 1;
     */
    subscriptionGroup?: SubscriptionGroup;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.subscription.v1.GetSubscriptionGroupItemPageDataResponse.
 * Use `create(GetSubscriptionGroupItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupItemPageDataResponseSchema: GenMessage<GetSubscriptionGroupItemPageDataResponse>;
/**
 * CapacityMode is the explicit enrollment-capacity discriminator for a cohort.
 * It supersedes the prior magic-int encoding (-1=unlimited / 0=closed /
 * >0=soft-cap). UNSPECIFIED(0) is treated as UNLIMITED (the documented default);
 * max_capacity is read ONLY when the mode is CAPPED.
 *
 * @generated from enum domain.subscription.v1.CapacityMode
 */
export declare enum CapacityMode {
    /**
     * @generated from enum value: CAPACITY_MODE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CAPACITY_MODE_UNLIMITED = 1;
     */
    UNLIMITED = 1,
    /**
     * @generated from enum value: CAPACITY_MODE_CLOSED = 2;
     */
    CLOSED = 2,
    /**
     * @generated from enum value: CAPACITY_MODE_CAPPED = 3;
     */
    CAPPED = 3
}
/**
 * Describes the enum domain.subscription.v1.CapacityMode.
 */
export declare const CapacityModeSchema: GenEnum<CapacityMode>;
/**
 * @generated from service domain.subscription.v1.SubscriptionGroupDomainService
 */
export declare const SubscriptionGroupDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.CreateSubscriptionGroup
     */
    createSubscriptionGroup: {
        methodKind: "unary";
        input: typeof CreateSubscriptionGroupRequestSchema;
        output: typeof CreateSubscriptionGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.ReadSubscriptionGroup
     */
    readSubscriptionGroup: {
        methodKind: "unary";
        input: typeof ReadSubscriptionGroupRequestSchema;
        output: typeof ReadSubscriptionGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.UpdateSubscriptionGroup
     */
    updateSubscriptionGroup: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionGroupRequestSchema;
        output: typeof UpdateSubscriptionGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.DeleteSubscriptionGroup
     */
    deleteSubscriptionGroup: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionGroupRequestSchema;
        output: typeof DeleteSubscriptionGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.ListSubscriptionGroups
     */
    listSubscriptionGroups: {
        methodKind: "unary";
        input: typeof ListSubscriptionGroupsRequestSchema;
        output: typeof ListSubscriptionGroupsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.GetSubscriptionGroupListPageData
     */
    getSubscriptionGroupListPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupListPageDataRequestSchema;
        output: typeof GetSubscriptionGroupListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.SubscriptionGroupDomainService.GetSubscriptionGroupItemPageData
     */
    getSubscriptionGroupItemPageData: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupItemPageDataRequestSchema;
        output: typeof GetSubscriptionGroupItemPageDataResponseSchema;
    };
}>;
