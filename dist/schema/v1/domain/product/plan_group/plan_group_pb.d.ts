import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/plan_group/plan_group.proto.
 */
export declare const file_domain_product_plan_group_plan_group: GenFile;
/**
 * PlanGroup represents a generic group-of-plans taxonomy with stable cross-period
 * identity (e.g. "Junior High" groups Grade 7/8/9). It is the plan-axis analogue of Line.
 *
 * @generated from message domain.product.v1.PlanGroup
 */
export type PlanGroup = Message<"domain.product.v1.PlanGroup"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: optional string workspace_id = 8;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional string code = 9;
     */
    code?: string;
    /**
     * @generated from field: optional string parent_id = 10;
     */
    parentId?: string;
};
/**
 * Describes the message domain.product.v1.PlanGroup.
 * Use `create(PlanGroupSchema)` to create a new message.
 */
export declare const PlanGroupSchema: GenMessage<PlanGroup>;
/**
 * @generated from message domain.product.v1.CreatePlanGroupRequest
 */
export type CreatePlanGroupRequest = Message<"domain.product.v1.CreatePlanGroupRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroup data = 1;
     */
    data?: PlanGroup;
};
/**
 * Describes the message domain.product.v1.CreatePlanGroupRequest.
 * Use `create(CreatePlanGroupRequestSchema)` to create a new message.
 */
export declare const CreatePlanGroupRequestSchema: GenMessage<CreatePlanGroupRequest>;
/**
 * @generated from message domain.product.v1.CreatePlanGroupResponse
 */
export type CreatePlanGroupResponse = Message<"domain.product.v1.CreatePlanGroupResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroup data = 1;
     */
    data: PlanGroup[];
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
 * Describes the message domain.product.v1.CreatePlanGroupResponse.
 * Use `create(CreatePlanGroupResponseSchema)` to create a new message.
 */
export declare const CreatePlanGroupResponseSchema: GenMessage<CreatePlanGroupResponse>;
/**
 * @generated from message domain.product.v1.ReadPlanGroupRequest
 */
export type ReadPlanGroupRequest = Message<"domain.product.v1.ReadPlanGroupRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroup data = 1;
     */
    data?: PlanGroup;
};
/**
 * Describes the message domain.product.v1.ReadPlanGroupRequest.
 * Use `create(ReadPlanGroupRequestSchema)` to create a new message.
 */
export declare const ReadPlanGroupRequestSchema: GenMessage<ReadPlanGroupRequest>;
/**
 * @generated from message domain.product.v1.ReadPlanGroupResponse
 */
export type ReadPlanGroupResponse = Message<"domain.product.v1.ReadPlanGroupResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroup data = 1;
     */
    data: PlanGroup[];
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
 * Describes the message domain.product.v1.ReadPlanGroupResponse.
 * Use `create(ReadPlanGroupResponseSchema)` to create a new message.
 */
export declare const ReadPlanGroupResponseSchema: GenMessage<ReadPlanGroupResponse>;
/**
 * @generated from message domain.product.v1.UpdatePlanGroupRequest
 */
export type UpdatePlanGroupRequest = Message<"domain.product.v1.UpdatePlanGroupRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroup data = 1;
     */
    data?: PlanGroup;
};
/**
 * Describes the message domain.product.v1.UpdatePlanGroupRequest.
 * Use `create(UpdatePlanGroupRequestSchema)` to create a new message.
 */
export declare const UpdatePlanGroupRequestSchema: GenMessage<UpdatePlanGroupRequest>;
/**
 * @generated from message domain.product.v1.UpdatePlanGroupResponse
 */
export type UpdatePlanGroupResponse = Message<"domain.product.v1.UpdatePlanGroupResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroup data = 1;
     */
    data: PlanGroup[];
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
 * Describes the message domain.product.v1.UpdatePlanGroupResponse.
 * Use `create(UpdatePlanGroupResponseSchema)` to create a new message.
 */
export declare const UpdatePlanGroupResponseSchema: GenMessage<UpdatePlanGroupResponse>;
/**
 * @generated from message domain.product.v1.DeletePlanGroupRequest
 */
export type DeletePlanGroupRequest = Message<"domain.product.v1.DeletePlanGroupRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroup data = 1;
     */
    data?: PlanGroup;
};
/**
 * Describes the message domain.product.v1.DeletePlanGroupRequest.
 * Use `create(DeletePlanGroupRequestSchema)` to create a new message.
 */
export declare const DeletePlanGroupRequestSchema: GenMessage<DeletePlanGroupRequest>;
/**
 * @generated from message domain.product.v1.DeletePlanGroupResponse
 */
export type DeletePlanGroupResponse = Message<"domain.product.v1.DeletePlanGroupResponse"> & {
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
 * Describes the message domain.product.v1.DeletePlanGroupResponse.
 * Use `create(DeletePlanGroupResponseSchema)` to create a new message.
 */
export declare const DeletePlanGroupResponseSchema: GenMessage<DeletePlanGroupResponse>;
/**
 * @generated from message domain.product.v1.ListPlanGroupsRequest
 */
export type ListPlanGroupsRequest = Message<"domain.product.v1.ListPlanGroupsRequest"> & {
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
 * Describes the message domain.product.v1.ListPlanGroupsRequest.
 * Use `create(ListPlanGroupsRequestSchema)` to create a new message.
 */
export declare const ListPlanGroupsRequestSchema: GenMessage<ListPlanGroupsRequest>;
/**
 * @generated from message domain.product.v1.ListPlanGroupsResponse
 */
export type ListPlanGroupsResponse = Message<"domain.product.v1.ListPlanGroupsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroup data = 1;
     */
    data: PlanGroup[];
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
 * Describes the message domain.product.v1.ListPlanGroupsResponse.
 * Use `create(ListPlanGroupsResponseSchema)` to create a new message.
 */
export declare const ListPlanGroupsResponseSchema: GenMessage<ListPlanGroupsResponse>;
/**
 * @generated from message domain.product.v1.GetPlanGroupListPageDataRequest
 */
export type GetPlanGroupListPageDataRequest = Message<"domain.product.v1.GetPlanGroupListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetPlanGroupListPageDataRequest.
 * Use `create(GetPlanGroupListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanGroupListPageDataRequestSchema: GenMessage<GetPlanGroupListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPlanGroupListPageDataResponse
 */
export type GetPlanGroupListPageDataResponse = Message<"domain.product.v1.GetPlanGroupListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroup plan_group_list = 1;
     */
    planGroupList: PlanGroup[];
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
 * Describes the message domain.product.v1.GetPlanGroupListPageDataResponse.
 * Use `create(GetPlanGroupListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanGroupListPageDataResponseSchema: GenMessage<GetPlanGroupListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetPlanGroupItemPageDataRequest
 */
export type GetPlanGroupItemPageDataRequest = Message<"domain.product.v1.GetPlanGroupItemPageDataRequest"> & {
    /**
     * @generated from field: string plan_group_id = 1;
     */
    planGroupId: string;
};
/**
 * Describes the message domain.product.v1.GetPlanGroupItemPageDataRequest.
 * Use `create(GetPlanGroupItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanGroupItemPageDataRequestSchema: GenMessage<GetPlanGroupItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPlanGroupItemPageDataResponse
 */
export type GetPlanGroupItemPageDataResponse = Message<"domain.product.v1.GetPlanGroupItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroup plan_group = 1;
     */
    planGroup?: PlanGroup;
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
 * Describes the message domain.product.v1.GetPlanGroupItemPageDataResponse.
 * Use `create(GetPlanGroupItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanGroupItemPageDataResponseSchema: GenMessage<GetPlanGroupItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.PlanGroupDomainService
 */
export declare const PlanGroupDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.CreatePlanGroup
     */
    createPlanGroup: {
        methodKind: "unary";
        input: typeof CreatePlanGroupRequestSchema;
        output: typeof CreatePlanGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.ReadPlanGroup
     */
    readPlanGroup: {
        methodKind: "unary";
        input: typeof ReadPlanGroupRequestSchema;
        output: typeof ReadPlanGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.UpdatePlanGroup
     */
    updatePlanGroup: {
        methodKind: "unary";
        input: typeof UpdatePlanGroupRequestSchema;
        output: typeof UpdatePlanGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.DeletePlanGroup
     */
    deletePlanGroup: {
        methodKind: "unary";
        input: typeof DeletePlanGroupRequestSchema;
        output: typeof DeletePlanGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.ListPlanGroups
     */
    listPlanGroups: {
        methodKind: "unary";
        input: typeof ListPlanGroupsRequestSchema;
        output: typeof ListPlanGroupsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.GetPlanGroupListPageData
     */
    getPlanGroupListPageData: {
        methodKind: "unary";
        input: typeof GetPlanGroupListPageDataRequestSchema;
        output: typeof GetPlanGroupListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupDomainService.GetPlanGroupItemPageData
     */
    getPlanGroupItemPageData: {
        methodKind: "unary";
        input: typeof GetPlanGroupItemPageDataRequestSchema;
        output: typeof GetPlanGroupItemPageDataResponseSchema;
    };
}>;
