import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/procurement/supplier_plan/supplier_plan.proto.
 */
export declare const file_domain_procurement_supplier_plan_supplier_plan: GenFile;
/**
 * @generated from message domain.procurement.v1.SupplierPlan
 */
export type SupplierPlan = Message<"domain.procurement.v1.SupplierPlan"> & {
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
     * @generated from field: optional string description = 8;
     */
    description?: string;
    /**
     * Supplier FK — buying-side asymmetry (selling-side Plan has no client_id on the plan itself;
     * buying-side anchors the plan to a specific supplier).
     *
     * @generated from field: string supplier_id = 9;
     */
    supplierId: string;
    /**
     * @generated from field: optional string workspace_id = 10;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.procurement.v1.SupplierPlan.
 * Use `create(SupplierPlanSchema)` to create a new message.
 */
export declare const SupplierPlanSchema: GenMessage<SupplierPlan>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierPlanRequest
 */
export type CreateSupplierPlanRequest = Message<"domain.procurement.v1.CreateSupplierPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierPlan data = 1;
     */
    data?: SupplierPlan;
};
/**
 * Describes the message domain.procurement.v1.CreateSupplierPlanRequest.
 * Use `create(CreateSupplierPlanRequestSchema)` to create a new message.
 */
export declare const CreateSupplierPlanRequestSchema: GenMessage<CreateSupplierPlanRequest>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierPlanResponse
 */
export type CreateSupplierPlanResponse = Message<"domain.procurement.v1.CreateSupplierPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierPlan data = 1;
     */
    data: SupplierPlan[];
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
 * Describes the message domain.procurement.v1.CreateSupplierPlanResponse.
 * Use `create(CreateSupplierPlanResponseSchema)` to create a new message.
 */
export declare const CreateSupplierPlanResponseSchema: GenMessage<CreateSupplierPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierPlanRequest
 */
export type ReadSupplierPlanRequest = Message<"domain.procurement.v1.ReadSupplierPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierPlan data = 1;
     */
    data?: SupplierPlan;
};
/**
 * Describes the message domain.procurement.v1.ReadSupplierPlanRequest.
 * Use `create(ReadSupplierPlanRequestSchema)` to create a new message.
 */
export declare const ReadSupplierPlanRequestSchema: GenMessage<ReadSupplierPlanRequest>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierPlanResponse
 */
export type ReadSupplierPlanResponse = Message<"domain.procurement.v1.ReadSupplierPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierPlan data = 1;
     */
    data: SupplierPlan[];
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
 * Describes the message domain.procurement.v1.ReadSupplierPlanResponse.
 * Use `create(ReadSupplierPlanResponseSchema)` to create a new message.
 */
export declare const ReadSupplierPlanResponseSchema: GenMessage<ReadSupplierPlanResponse>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierPlanRequest
 */
export type UpdateSupplierPlanRequest = Message<"domain.procurement.v1.UpdateSupplierPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierPlan data = 1;
     */
    data?: SupplierPlan;
};
/**
 * Describes the message domain.procurement.v1.UpdateSupplierPlanRequest.
 * Use `create(UpdateSupplierPlanRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierPlanRequestSchema: GenMessage<UpdateSupplierPlanRequest>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierPlanResponse
 */
export type UpdateSupplierPlanResponse = Message<"domain.procurement.v1.UpdateSupplierPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierPlan data = 1;
     */
    data: SupplierPlan[];
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
 * Describes the message domain.procurement.v1.UpdateSupplierPlanResponse.
 * Use `create(UpdateSupplierPlanResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierPlanResponseSchema: GenMessage<UpdateSupplierPlanResponse>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierPlanRequest
 */
export type DeleteSupplierPlanRequest = Message<"domain.procurement.v1.DeleteSupplierPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierPlan data = 1;
     */
    data?: SupplierPlan;
};
/**
 * Describes the message domain.procurement.v1.DeleteSupplierPlanRequest.
 * Use `create(DeleteSupplierPlanRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierPlanRequestSchema: GenMessage<DeleteSupplierPlanRequest>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierPlanResponse
 */
export type DeleteSupplierPlanResponse = Message<"domain.procurement.v1.DeleteSupplierPlanResponse"> & {
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
 * Describes the message domain.procurement.v1.DeleteSupplierPlanResponse.
 * Use `create(DeleteSupplierPlanResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierPlanResponseSchema: GenMessage<DeleteSupplierPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ListSupplierPlansRequest
 */
export type ListSupplierPlansRequest = Message<"domain.procurement.v1.ListSupplierPlansRequest"> & {
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
 * Describes the message domain.procurement.v1.ListSupplierPlansRequest.
 * Use `create(ListSupplierPlansRequestSchema)` to create a new message.
 */
export declare const ListSupplierPlansRequestSchema: GenMessage<ListSupplierPlansRequest>;
/**
 * @generated from message domain.procurement.v1.ListSupplierPlansResponse
 */
export type ListSupplierPlansResponse = Message<"domain.procurement.v1.ListSupplierPlansResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierPlan data = 1;
     */
    data: SupplierPlan[];
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
 * Describes the message domain.procurement.v1.ListSupplierPlansResponse.
 * Use `create(ListSupplierPlansResponseSchema)` to create a new message.
 */
export declare const ListSupplierPlansResponseSchema: GenMessage<ListSupplierPlansResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierPlanListPageDataRequest
 */
export type GetSupplierPlanListPageDataRequest = Message<"domain.procurement.v1.GetSupplierPlanListPageDataRequest"> & {
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
 * Describes the message domain.procurement.v1.GetSupplierPlanListPageDataRequest.
 * Use `create(GetSupplierPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierPlanListPageDataRequestSchema: GenMessage<GetSupplierPlanListPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierPlanListPageDataResponse
 */
export type GetSupplierPlanListPageDataResponse = Message<"domain.procurement.v1.GetSupplierPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierPlan supplier_plan_list = 1;
     */
    supplierPlanList: SupplierPlan[];
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
 * Describes the message domain.procurement.v1.GetSupplierPlanListPageDataResponse.
 * Use `create(GetSupplierPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierPlanListPageDataResponseSchema: GenMessage<GetSupplierPlanListPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierPlanItemPageDataRequest
 */
export type GetSupplierPlanItemPageDataRequest = Message<"domain.procurement.v1.GetSupplierPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_plan_id = 1;
     */
    supplierPlanId: string;
};
/**
 * Describes the message domain.procurement.v1.GetSupplierPlanItemPageDataRequest.
 * Use `create(GetSupplierPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierPlanItemPageDataRequestSchema: GenMessage<GetSupplierPlanItemPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierPlanItemPageDataResponse
 */
export type GetSupplierPlanItemPageDataResponse = Message<"domain.procurement.v1.GetSupplierPlanItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.procurement.v1.SupplierPlan supplier_plan = 1;
     */
    supplierPlan?: SupplierPlan;
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
 * Describes the message domain.procurement.v1.GetSupplierPlanItemPageDataResponse.
 * Use `create(GetSupplierPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierPlanItemPageDataResponseSchema: GenMessage<GetSupplierPlanItemPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.SearchSupplierPlansByNameRequest
 */
export type SearchSupplierPlansByNameRequest = Message<"domain.procurement.v1.SearchSupplierPlansByNameRequest"> & {
    /**
     * @generated from field: string query = 1;
     */
    query: string;
    /**
     * @generated from field: optional int32 limit = 2;
     */
    limit?: number;
};
/**
 * Describes the message domain.procurement.v1.SearchSupplierPlansByNameRequest.
 * Use `create(SearchSupplierPlansByNameRequestSchema)` to create a new message.
 */
export declare const SearchSupplierPlansByNameRequestSchema: GenMessage<SearchSupplierPlansByNameRequest>;
/**
 * @generated from message domain.procurement.v1.SearchSupplierPlansByNameResponse
 */
export type SearchSupplierPlansByNameResponse = Message<"domain.procurement.v1.SearchSupplierPlansByNameResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SearchSupplierPlanResult results = 1;
     */
    results: SearchSupplierPlanResult[];
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
 * Describes the message domain.procurement.v1.SearchSupplierPlansByNameResponse.
 * Use `create(SearchSupplierPlansByNameResponseSchema)` to create a new message.
 */
export declare const SearchSupplierPlansByNameResponseSchema: GenMessage<SearchSupplierPlansByNameResponse>;
/**
 * @generated from message domain.procurement.v1.SearchSupplierPlanResult
 */
export type SearchSupplierPlanResult = Message<"domain.procurement.v1.SearchSupplierPlanResult"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string label = 2;
     */
    label: string;
};
/**
 * Describes the message domain.procurement.v1.SearchSupplierPlanResult.
 * Use `create(SearchSupplierPlanResultSchema)` to create a new message.
 */
export declare const SearchSupplierPlanResultSchema: GenMessage<SearchSupplierPlanResult>;
/**
 * @generated from service domain.procurement.v1.SupplierPlanDomainService
 */
export declare const SupplierPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.CreateSupplierPlan
     */
    createSupplierPlan: {
        methodKind: "unary";
        input: typeof CreateSupplierPlanRequestSchema;
        output: typeof CreateSupplierPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.ReadSupplierPlan
     */
    readSupplierPlan: {
        methodKind: "unary";
        input: typeof ReadSupplierPlanRequestSchema;
        output: typeof ReadSupplierPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.UpdateSupplierPlan
     */
    updateSupplierPlan: {
        methodKind: "unary";
        input: typeof UpdateSupplierPlanRequestSchema;
        output: typeof UpdateSupplierPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.DeleteSupplierPlan
     */
    deleteSupplierPlan: {
        methodKind: "unary";
        input: typeof DeleteSupplierPlanRequestSchema;
        output: typeof DeleteSupplierPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.ListSupplierPlans
     */
    listSupplierPlans: {
        methodKind: "unary";
        input: typeof ListSupplierPlansRequestSchema;
        output: typeof ListSupplierPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.GetSupplierPlanListPageData
     */
    getSupplierPlanListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierPlanListPageDataRequestSchema;
        output: typeof GetSupplierPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.GetSupplierPlanItemPageData
     */
    getSupplierPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierPlanItemPageDataRequestSchema;
        output: typeof GetSupplierPlanItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierPlanDomainService.SearchSupplierPlansByName
     */
    searchSupplierPlansByName: {
        methodKind: "unary";
        input: typeof SearchSupplierPlansByNameRequestSchema;
        output: typeof SearchSupplierPlansByNameResponseSchema;
    };
}>;
