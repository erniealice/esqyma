import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/plan_group_plan/plan_group_plan.proto.
 */
export declare const file_domain_product_plan_group_plan_plan_group_plan: GenFile;
/**
 * @generated from message domain.product.v1.PlanGroupPlan
 */
export type PlanGroupPlan = Message<"domain.product.v1.PlanGroupPlan"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string plan_group_id = 2;
     */
    planGroupId: string;
    /**
     * @generated from field: string plan_id = 3;
     */
    planId: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 9;
     */
    workspaceId: string;
    /**
     * @generated from field: optional int32 sequence_order = 10;
     */
    sequenceOrder?: number;
};
/**
 * Describes the message domain.product.v1.PlanGroupPlan.
 * Use `create(PlanGroupPlanSchema)` to create a new message.
 */
export declare const PlanGroupPlanSchema: GenMessage<PlanGroupPlan>;
/**
 * @generated from message domain.product.v1.CreatePlanGroupPlanRequest
 */
export type CreatePlanGroupPlanRequest = Message<"domain.product.v1.CreatePlanGroupPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroupPlan data = 1;
     */
    data?: PlanGroupPlan;
};
/**
 * Describes the message domain.product.v1.CreatePlanGroupPlanRequest.
 * Use `create(CreatePlanGroupPlanRequestSchema)` to create a new message.
 */
export declare const CreatePlanGroupPlanRequestSchema: GenMessage<CreatePlanGroupPlanRequest>;
/**
 * @generated from message domain.product.v1.CreatePlanGroupPlanResponse
 */
export type CreatePlanGroupPlanResponse = Message<"domain.product.v1.CreatePlanGroupPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroupPlan data = 1;
     */
    data: PlanGroupPlan[];
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
 * Describes the message domain.product.v1.CreatePlanGroupPlanResponse.
 * Use `create(CreatePlanGroupPlanResponseSchema)` to create a new message.
 */
export declare const CreatePlanGroupPlanResponseSchema: GenMessage<CreatePlanGroupPlanResponse>;
/**
 * @generated from message domain.product.v1.ReadPlanGroupPlanRequest
 */
export type ReadPlanGroupPlanRequest = Message<"domain.product.v1.ReadPlanGroupPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroupPlan data = 1;
     */
    data?: PlanGroupPlan;
};
/**
 * Describes the message domain.product.v1.ReadPlanGroupPlanRequest.
 * Use `create(ReadPlanGroupPlanRequestSchema)` to create a new message.
 */
export declare const ReadPlanGroupPlanRequestSchema: GenMessage<ReadPlanGroupPlanRequest>;
/**
 * @generated from message domain.product.v1.ReadPlanGroupPlanResponse
 */
export type ReadPlanGroupPlanResponse = Message<"domain.product.v1.ReadPlanGroupPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroupPlan data = 1;
     */
    data: PlanGroupPlan[];
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
 * Describes the message domain.product.v1.ReadPlanGroupPlanResponse.
 * Use `create(ReadPlanGroupPlanResponseSchema)` to create a new message.
 */
export declare const ReadPlanGroupPlanResponseSchema: GenMessage<ReadPlanGroupPlanResponse>;
/**
 * @generated from message domain.product.v1.UpdatePlanGroupPlanRequest
 */
export type UpdatePlanGroupPlanRequest = Message<"domain.product.v1.UpdatePlanGroupPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroupPlan data = 1;
     */
    data?: PlanGroupPlan;
};
/**
 * Describes the message domain.product.v1.UpdatePlanGroupPlanRequest.
 * Use `create(UpdatePlanGroupPlanRequestSchema)` to create a new message.
 */
export declare const UpdatePlanGroupPlanRequestSchema: GenMessage<UpdatePlanGroupPlanRequest>;
/**
 * @generated from message domain.product.v1.UpdatePlanGroupPlanResponse
 */
export type UpdatePlanGroupPlanResponse = Message<"domain.product.v1.UpdatePlanGroupPlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroupPlan data = 1;
     */
    data: PlanGroupPlan[];
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
 * Describes the message domain.product.v1.UpdatePlanGroupPlanResponse.
 * Use `create(UpdatePlanGroupPlanResponseSchema)` to create a new message.
 */
export declare const UpdatePlanGroupPlanResponseSchema: GenMessage<UpdatePlanGroupPlanResponse>;
/**
 * @generated from message domain.product.v1.DeletePlanGroupPlanRequest
 */
export type DeletePlanGroupPlanRequest = Message<"domain.product.v1.DeletePlanGroupPlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroupPlan data = 1;
     */
    data?: PlanGroupPlan;
};
/**
 * Describes the message domain.product.v1.DeletePlanGroupPlanRequest.
 * Use `create(DeletePlanGroupPlanRequestSchema)` to create a new message.
 */
export declare const DeletePlanGroupPlanRequestSchema: GenMessage<DeletePlanGroupPlanRequest>;
/**
 * @generated from message domain.product.v1.DeletePlanGroupPlanResponse
 */
export type DeletePlanGroupPlanResponse = Message<"domain.product.v1.DeletePlanGroupPlanResponse"> & {
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
 * Describes the message domain.product.v1.DeletePlanGroupPlanResponse.
 * Use `create(DeletePlanGroupPlanResponseSchema)` to create a new message.
 */
export declare const DeletePlanGroupPlanResponseSchema: GenMessage<DeletePlanGroupPlanResponse>;
/**
 * @generated from message domain.product.v1.ListPlanGroupPlansRequest
 */
export type ListPlanGroupPlansRequest = Message<"domain.product.v1.ListPlanGroupPlansRequest"> & {
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
 * Describes the message domain.product.v1.ListPlanGroupPlansRequest.
 * Use `create(ListPlanGroupPlansRequestSchema)` to create a new message.
 */
export declare const ListPlanGroupPlansRequestSchema: GenMessage<ListPlanGroupPlansRequest>;
/**
 * @generated from message domain.product.v1.ListPlanGroupPlansResponse
 */
export type ListPlanGroupPlansResponse = Message<"domain.product.v1.ListPlanGroupPlansResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroupPlan data = 1;
     */
    data: PlanGroupPlan[];
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
 * Describes the message domain.product.v1.ListPlanGroupPlansResponse.
 * Use `create(ListPlanGroupPlansResponseSchema)` to create a new message.
 */
export declare const ListPlanGroupPlansResponseSchema: GenMessage<ListPlanGroupPlansResponse>;
/**
 * @generated from message domain.product.v1.GetPlanGroupPlanListPageDataRequest
 */
export type GetPlanGroupPlanListPageDataRequest = Message<"domain.product.v1.GetPlanGroupPlanListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetPlanGroupPlanListPageDataRequest.
 * Use `create(GetPlanGroupPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanGroupPlanListPageDataRequestSchema: GenMessage<GetPlanGroupPlanListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPlanGroupPlanListPageDataResponse
 */
export type GetPlanGroupPlanListPageDataResponse = Message<"domain.product.v1.GetPlanGroupPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PlanGroupPlan plan_group_plan_list = 1;
     */
    planGroupPlanList: PlanGroupPlan[];
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
 * Describes the message domain.product.v1.GetPlanGroupPlanListPageDataResponse.
 * Use `create(GetPlanGroupPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanGroupPlanListPageDataResponseSchema: GenMessage<GetPlanGroupPlanListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetPlanGroupPlanItemPageDataRequest
 */
export type GetPlanGroupPlanItemPageDataRequest = Message<"domain.product.v1.GetPlanGroupPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string plan_group_plan_id = 1;
     */
    planGroupPlanId: string;
};
/**
 * Describes the message domain.product.v1.GetPlanGroupPlanItemPageDataRequest.
 * Use `create(GetPlanGroupPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanGroupPlanItemPageDataRequestSchema: GenMessage<GetPlanGroupPlanItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPlanGroupPlanItemPageDataResponse
 */
export type GetPlanGroupPlanItemPageDataResponse = Message<"domain.product.v1.GetPlanGroupPlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.PlanGroupPlan plan_group_plan = 1;
     */
    planGroupPlan?: PlanGroupPlan;
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
 * Describes the message domain.product.v1.GetPlanGroupPlanItemPageDataResponse.
 * Use `create(GetPlanGroupPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanGroupPlanItemPageDataResponseSchema: GenMessage<GetPlanGroupPlanItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.PlanGroupPlanDomainService
 */
export declare const PlanGroupPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.CreatePlanGroupPlan
     */
    createPlanGroupPlan: {
        methodKind: "unary";
        input: typeof CreatePlanGroupPlanRequestSchema;
        output: typeof CreatePlanGroupPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.ReadPlanGroupPlan
     */
    readPlanGroupPlan: {
        methodKind: "unary";
        input: typeof ReadPlanGroupPlanRequestSchema;
        output: typeof ReadPlanGroupPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.UpdatePlanGroupPlan
     */
    updatePlanGroupPlan: {
        methodKind: "unary";
        input: typeof UpdatePlanGroupPlanRequestSchema;
        output: typeof UpdatePlanGroupPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.DeletePlanGroupPlan
     */
    deletePlanGroupPlan: {
        methodKind: "unary";
        input: typeof DeletePlanGroupPlanRequestSchema;
        output: typeof DeletePlanGroupPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.ListPlanGroupPlans
     */
    listPlanGroupPlans: {
        methodKind: "unary";
        input: typeof ListPlanGroupPlansRequestSchema;
        output: typeof ListPlanGroupPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.GetPlanGroupPlanListPageData
     */
    getPlanGroupPlanListPageData: {
        methodKind: "unary";
        input: typeof GetPlanGroupPlanListPageDataRequestSchema;
        output: typeof GetPlanGroupPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PlanGroupPlanDomainService.GetPlanGroupPlanItemPageData
     */
    getPlanGroupPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetPlanGroupPlanItemPageDataRequestSchema;
        output: typeof GetPlanGroupPlanItemPageDataResponseSchema;
    };
}>;
