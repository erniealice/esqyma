import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Plan } from "../plan/plan_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/plan_attribute/plan_attribute.proto.
 */
export declare const file_domain_subscription_plan_attribute_plan_attribute: GenFile;
/**
 * @generated from message domain.subscription.v1.PlanAttribute
 */
export type PlanAttribute = Message<"domain.subscription.v1.PlanAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string plan_id = 2;
     */
    planId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.subscription.v1.Plan plan = 5;
     */
    plan?: Plan;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.PlanAttribute.
 * Use `create(PlanAttributeSchema)` to create a new message.
 */
export declare const PlanAttributeSchema: GenMessage<PlanAttribute>;
/**
 * @generated from message domain.subscription.v1.CreatePlanAttributeRequest
 */
export type CreatePlanAttributeRequest = Message<"domain.subscription.v1.CreatePlanAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanAttribute data = 1;
     */
    data?: PlanAttribute;
};
/**
 * Describes the message domain.subscription.v1.CreatePlanAttributeRequest.
 * Use `create(CreatePlanAttributeRequestSchema)` to create a new message.
 */
export declare const CreatePlanAttributeRequestSchema: GenMessage<CreatePlanAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePlanAttributeResponse
 */
export type CreatePlanAttributeResponse = Message<"domain.subscription.v1.CreatePlanAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanAttribute data = 1;
     */
    data: PlanAttribute[];
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
 * Describes the message domain.subscription.v1.CreatePlanAttributeResponse.
 * Use `create(CreatePlanAttributeResponseSchema)` to create a new message.
 */
export declare const CreatePlanAttributeResponseSchema: GenMessage<CreatePlanAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPlanAttributeRequest
 */
export type ReadPlanAttributeRequest = Message<"domain.subscription.v1.ReadPlanAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanAttribute data = 1;
     */
    data?: PlanAttribute;
};
/**
 * Describes the message domain.subscription.v1.ReadPlanAttributeRequest.
 * Use `create(ReadPlanAttributeRequestSchema)` to create a new message.
 */
export declare const ReadPlanAttributeRequestSchema: GenMessage<ReadPlanAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPlanAttributeResponse
 */
export type ReadPlanAttributeResponse = Message<"domain.subscription.v1.ReadPlanAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanAttribute data = 1;
     */
    data: PlanAttribute[];
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
 * Describes the message domain.subscription.v1.ReadPlanAttributeResponse.
 * Use `create(ReadPlanAttributeResponseSchema)` to create a new message.
 */
export declare const ReadPlanAttributeResponseSchema: GenMessage<ReadPlanAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanAttributeRequest
 */
export type UpdatePlanAttributeRequest = Message<"domain.subscription.v1.UpdatePlanAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanAttribute data = 1;
     */
    data?: PlanAttribute;
};
/**
 * Describes the message domain.subscription.v1.UpdatePlanAttributeRequest.
 * Use `create(UpdatePlanAttributeRequestSchema)` to create a new message.
 */
export declare const UpdatePlanAttributeRequestSchema: GenMessage<UpdatePlanAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanAttributeResponse
 */
export type UpdatePlanAttributeResponse = Message<"domain.subscription.v1.UpdatePlanAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanAttribute data = 1;
     */
    data: PlanAttribute[];
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
 * Describes the message domain.subscription.v1.UpdatePlanAttributeResponse.
 * Use `create(UpdatePlanAttributeResponseSchema)` to create a new message.
 */
export declare const UpdatePlanAttributeResponseSchema: GenMessage<UpdatePlanAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePlanAttributeRequest
 */
export type DeletePlanAttributeRequest = Message<"domain.subscription.v1.DeletePlanAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanAttribute data = 1;
     */
    data?: PlanAttribute;
};
/**
 * Describes the message domain.subscription.v1.DeletePlanAttributeRequest.
 * Use `create(DeletePlanAttributeRequestSchema)` to create a new message.
 */
export declare const DeletePlanAttributeRequestSchema: GenMessage<DeletePlanAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePlanAttributeResponse
 */
export type DeletePlanAttributeResponse = Message<"domain.subscription.v1.DeletePlanAttributeResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePlanAttributeResponse.
 * Use `create(DeletePlanAttributeResponseSchema)` to create a new message.
 */
export declare const DeletePlanAttributeResponseSchema: GenMessage<DeletePlanAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ListPlanAttributesRequest
 */
export type ListPlanAttributesRequest = Message<"domain.subscription.v1.ListPlanAttributesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPlanAttributesRequest.
 * Use `create(ListPlanAttributesRequestSchema)` to create a new message.
 */
export declare const ListPlanAttributesRequestSchema: GenMessage<ListPlanAttributesRequest>;
/**
 * @generated from message domain.subscription.v1.ListPlanAttributesResponse
 */
export type ListPlanAttributesResponse = Message<"domain.subscription.v1.ListPlanAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanAttribute data = 1;
     */
    data: PlanAttribute[];
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
 * Describes the message domain.subscription.v1.ListPlanAttributesResponse.
 * Use `create(ListPlanAttributesResponseSchema)` to create a new message.
 */
export declare const ListPlanAttributesResponseSchema: GenMessage<ListPlanAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetPlanAttributeListPageDataRequest
 */
export type GetPlanAttributeListPageDataRequest = Message<"domain.subscription.v1.GetPlanAttributeListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetPlanAttributeListPageDataRequest.
 * Use `create(GetPlanAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanAttributeListPageDataRequestSchema: GenMessage<GetPlanAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetPlanAttributeListPageDataResponse
 */
export type GetPlanAttributeListPageDataResponse = Message<"domain.subscription.v1.GetPlanAttributeListPageDataResponse"> & {
    /**
     * The plan attribute data
     *
     * @generated from field: repeated domain.subscription.v1.PlanAttribute plan_attribute_list = 1;
     */
    planAttributeList: PlanAttribute[];
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
 * Describes the message domain.subscription.v1.GetPlanAttributeListPageDataResponse.
 * Use `create(GetPlanAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanAttributeListPageDataResponseSchema: GenMessage<GetPlanAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetPlanAttributeItemPageDataRequest
 */
export type GetPlanAttributeItemPageDataRequest = Message<"domain.subscription.v1.GetPlanAttributeItemPageDataRequest"> & {
    /**
     * The plan attribute ID to retrieve
     *
     * @generated from field: string plan_attribute_id = 1;
     */
    planAttributeId: string;
};
/**
 * Describes the message domain.subscription.v1.GetPlanAttributeItemPageDataRequest.
 * Use `create(GetPlanAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPlanAttributeItemPageDataRequestSchema: GenMessage<GetPlanAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetPlanAttributeItemPageDataResponse
 */
export type GetPlanAttributeItemPageDataResponse = Message<"domain.subscription.v1.GetPlanAttributeItemPageDataResponse"> & {
    /**
     * The plan attribute data
     *
     * @generated from field: domain.subscription.v1.PlanAttribute plan_attribute = 1;
     */
    planAttribute?: PlanAttribute;
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
 * Describes the message domain.subscription.v1.GetPlanAttributeItemPageDataResponse.
 * Use `create(GetPlanAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPlanAttributeItemPageDataResponseSchema: GenMessage<GetPlanAttributeItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.PlanAttributeDomainService
 */
export declare const PlanAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.CreatePlanAttribute
     */
    createPlanAttribute: {
        methodKind: "unary";
        input: typeof CreatePlanAttributeRequestSchema;
        output: typeof CreatePlanAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.ReadPlanAttribute
     */
    readPlanAttribute: {
        methodKind: "unary";
        input: typeof ReadPlanAttributeRequestSchema;
        output: typeof ReadPlanAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.UpdatePlanAttribute
     */
    updatePlanAttribute: {
        methodKind: "unary";
        input: typeof UpdatePlanAttributeRequestSchema;
        output: typeof UpdatePlanAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.DeletePlanAttribute
     */
    deletePlanAttribute: {
        methodKind: "unary";
        input: typeof DeletePlanAttributeRequestSchema;
        output: typeof DeletePlanAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.ListPlanAttributes
     */
    listPlanAttributes: {
        methodKind: "unary";
        input: typeof ListPlanAttributesRequestSchema;
        output: typeof ListPlanAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.GetPlanAttributeListPageData
     */
    getPlanAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetPlanAttributeListPageDataRequestSchema;
        output: typeof GetPlanAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.PlanAttributeDomainService.GetPlanAttributeItemPageData
     */
    getPlanAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetPlanAttributeItemPageDataRequestSchema;
        output: typeof GetPlanAttributeItemPageDataResponseSchema;
    };
}>;
