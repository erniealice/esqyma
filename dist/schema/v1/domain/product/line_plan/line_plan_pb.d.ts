import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/line_plan/line_plan.proto.
 */
export declare const file_domain_product_line_plan_line_plan: GenFile;
/**
 * @generated from message domain.product.v1.LinePlan
 */
export type LinePlan = Message<"domain.product.v1.LinePlan"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string line_id = 2;
     */
    lineId: string;
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
};
/**
 * Describes the message domain.product.v1.LinePlan.
 * Use `create(LinePlanSchema)` to create a new message.
 */
export declare const LinePlanSchema: GenMessage<LinePlan>;
/**
 * @generated from message domain.product.v1.CreateLinePlanRequest
 */
export type CreateLinePlanRequest = Message<"domain.product.v1.CreateLinePlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.LinePlan data = 1;
     */
    data?: LinePlan;
};
/**
 * Describes the message domain.product.v1.CreateLinePlanRequest.
 * Use `create(CreateLinePlanRequestSchema)` to create a new message.
 */
export declare const CreateLinePlanRequestSchema: GenMessage<CreateLinePlanRequest>;
/**
 * @generated from message domain.product.v1.CreateLinePlanResponse
 */
export type CreateLinePlanResponse = Message<"domain.product.v1.CreateLinePlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LinePlan data = 1;
     */
    data: LinePlan[];
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
 * Describes the message domain.product.v1.CreateLinePlanResponse.
 * Use `create(CreateLinePlanResponseSchema)` to create a new message.
 */
export declare const CreateLinePlanResponseSchema: GenMessage<CreateLinePlanResponse>;
/**
 * @generated from message domain.product.v1.ReadLinePlanRequest
 */
export type ReadLinePlanRequest = Message<"domain.product.v1.ReadLinePlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.LinePlan data = 1;
     */
    data?: LinePlan;
};
/**
 * Describes the message domain.product.v1.ReadLinePlanRequest.
 * Use `create(ReadLinePlanRequestSchema)` to create a new message.
 */
export declare const ReadLinePlanRequestSchema: GenMessage<ReadLinePlanRequest>;
/**
 * @generated from message domain.product.v1.ReadLinePlanResponse
 */
export type ReadLinePlanResponse = Message<"domain.product.v1.ReadLinePlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LinePlan data = 1;
     */
    data: LinePlan[];
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
 * Describes the message domain.product.v1.ReadLinePlanResponse.
 * Use `create(ReadLinePlanResponseSchema)` to create a new message.
 */
export declare const ReadLinePlanResponseSchema: GenMessage<ReadLinePlanResponse>;
/**
 * @generated from message domain.product.v1.UpdateLinePlanRequest
 */
export type UpdateLinePlanRequest = Message<"domain.product.v1.UpdateLinePlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.LinePlan data = 1;
     */
    data?: LinePlan;
};
/**
 * Describes the message domain.product.v1.UpdateLinePlanRequest.
 * Use `create(UpdateLinePlanRequestSchema)` to create a new message.
 */
export declare const UpdateLinePlanRequestSchema: GenMessage<UpdateLinePlanRequest>;
/**
 * @generated from message domain.product.v1.UpdateLinePlanResponse
 */
export type UpdateLinePlanResponse = Message<"domain.product.v1.UpdateLinePlanResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LinePlan data = 1;
     */
    data: LinePlan[];
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
 * Describes the message domain.product.v1.UpdateLinePlanResponse.
 * Use `create(UpdateLinePlanResponseSchema)` to create a new message.
 */
export declare const UpdateLinePlanResponseSchema: GenMessage<UpdateLinePlanResponse>;
/**
 * @generated from message domain.product.v1.DeleteLinePlanRequest
 */
export type DeleteLinePlanRequest = Message<"domain.product.v1.DeleteLinePlanRequest"> & {
    /**
     * @generated from field: domain.product.v1.LinePlan data = 1;
     */
    data?: LinePlan;
};
/**
 * Describes the message domain.product.v1.DeleteLinePlanRequest.
 * Use `create(DeleteLinePlanRequestSchema)` to create a new message.
 */
export declare const DeleteLinePlanRequestSchema: GenMessage<DeleteLinePlanRequest>;
/**
 * @generated from message domain.product.v1.DeleteLinePlanResponse
 */
export type DeleteLinePlanResponse = Message<"domain.product.v1.DeleteLinePlanResponse"> & {
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
 * Describes the message domain.product.v1.DeleteLinePlanResponse.
 * Use `create(DeleteLinePlanResponseSchema)` to create a new message.
 */
export declare const DeleteLinePlanResponseSchema: GenMessage<DeleteLinePlanResponse>;
/**
 * @generated from message domain.product.v1.ListLinePlansRequest
 */
export type ListLinePlansRequest = Message<"domain.product.v1.ListLinePlansRequest"> & {
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
 * Describes the message domain.product.v1.ListLinePlansRequest.
 * Use `create(ListLinePlansRequestSchema)` to create a new message.
 */
export declare const ListLinePlansRequestSchema: GenMessage<ListLinePlansRequest>;
/**
 * @generated from message domain.product.v1.ListLinePlansResponse
 */
export type ListLinePlansResponse = Message<"domain.product.v1.ListLinePlansResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LinePlan data = 1;
     */
    data: LinePlan[];
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
 * Describes the message domain.product.v1.ListLinePlansResponse.
 * Use `create(ListLinePlansResponseSchema)` to create a new message.
 */
export declare const ListLinePlansResponseSchema: GenMessage<ListLinePlansResponse>;
/**
 * @generated from message domain.product.v1.GetLinePlanListPageDataRequest
 */
export type GetLinePlanListPageDataRequest = Message<"domain.product.v1.GetLinePlanListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetLinePlanListPageDataRequest.
 * Use `create(GetLinePlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLinePlanListPageDataRequestSchema: GenMessage<GetLinePlanListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetLinePlanListPageDataResponse
 */
export type GetLinePlanListPageDataResponse = Message<"domain.product.v1.GetLinePlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LinePlan line_plan_list = 1;
     */
    linePlanList: LinePlan[];
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
 * Describes the message domain.product.v1.GetLinePlanListPageDataResponse.
 * Use `create(GetLinePlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLinePlanListPageDataResponseSchema: GenMessage<GetLinePlanListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetLinePlanItemPageDataRequest
 */
export type GetLinePlanItemPageDataRequest = Message<"domain.product.v1.GetLinePlanItemPageDataRequest"> & {
    /**
     * @generated from field: string line_plan_id = 1;
     */
    linePlanId: string;
};
/**
 * Describes the message domain.product.v1.GetLinePlanItemPageDataRequest.
 * Use `create(GetLinePlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLinePlanItemPageDataRequestSchema: GenMessage<GetLinePlanItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetLinePlanItemPageDataResponse
 */
export type GetLinePlanItemPageDataResponse = Message<"domain.product.v1.GetLinePlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.LinePlan line_plan = 1;
     */
    linePlan?: LinePlan;
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
 * Describes the message domain.product.v1.GetLinePlanItemPageDataResponse.
 * Use `create(GetLinePlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLinePlanItemPageDataResponseSchema: GenMessage<GetLinePlanItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.LinePlanDomainService
 */
export declare const LinePlanDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.CreateLinePlan
     */
    createLinePlan: {
        methodKind: "unary";
        input: typeof CreateLinePlanRequestSchema;
        output: typeof CreateLinePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.ReadLinePlan
     */
    readLinePlan: {
        methodKind: "unary";
        input: typeof ReadLinePlanRequestSchema;
        output: typeof ReadLinePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.UpdateLinePlan
     */
    updateLinePlan: {
        methodKind: "unary";
        input: typeof UpdateLinePlanRequestSchema;
        output: typeof UpdateLinePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.DeleteLinePlan
     */
    deleteLinePlan: {
        methodKind: "unary";
        input: typeof DeleteLinePlanRequestSchema;
        output: typeof DeleteLinePlanResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.ListLinePlans
     */
    listLinePlans: {
        methodKind: "unary";
        input: typeof ListLinePlansRequestSchema;
        output: typeof ListLinePlansResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.GetLinePlanListPageData
     */
    getLinePlanListPageData: {
        methodKind: "unary";
        input: typeof GetLinePlanListPageDataRequestSchema;
        output: typeof GetLinePlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LinePlanDomainService.GetLinePlanItemPageData
     */
    getLinePlanItemPageData: {
        methodKind: "unary";
        input: typeof GetLinePlanItemPageDataRequestSchema;
        output: typeof GetLinePlanItemPageDataResponseSchema;
    };
}>;
