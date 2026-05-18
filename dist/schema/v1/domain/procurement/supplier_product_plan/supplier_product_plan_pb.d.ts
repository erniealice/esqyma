import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/procurement/supplier_product_plan/supplier_product_plan.proto.
 */
export declare const file_domain_procurement_supplier_product_plan_supplier_product_plan: GenFile;
/**
 * @generated from message domain.procurement.v1.SupplierProductPlan
 */
export type SupplierProductPlan = Message<"domain.procurement.v1.SupplierProductPlan"> & {
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
     * @generated from field: optional domain.product.v1.Product product = 9;
     */
    product?: Product;
    /**
     * @generated from field: string product_id = 10;
     */
    productId: string;
    /**
     * @generated from field: string supplier_plan_id = 11;
     */
    supplierPlanId: string;
    /**
     * Specific variant of product, iff parent product.variant_mode = "configurable".
     * Null when parent.variant_mode = "none". Model D: catalog-level specificity.
     *
     * @generated from field: optional string product_variant_id = 12;
     */
    productVariantId?: string;
};
/**
 * Describes the message domain.procurement.v1.SupplierProductPlan.
 * Use `create(SupplierProductPlanSchema)` to create a new message.
 */
export declare const SupplierProductPlanSchema: GenMessage<SupplierProductPlan>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierProductPlanRequest
 */
export type CreateSupplierProductPlanRequest = Message<"domain.procurement.v1.CreateSupplierProductPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data?: SupplierProductPlan;
};
/**
 * Describes the message domain.procurement.v1.CreateSupplierProductPlanRequest.
 * Use `create(CreateSupplierProductPlanRequestSchema)` to create a new message.
 */
export declare const CreateSupplierProductPlanRequestSchema: GenMessage<CreateSupplierProductPlanRequest>;
/**
 * @generated from message domain.procurement.v1.CreateSupplierProductPlanResponse
 */
export type CreateSupplierProductPlanResponse = Message<"domain.procurement.v1.CreateSupplierProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data: SupplierProductPlan[];
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
 * Describes the message domain.procurement.v1.CreateSupplierProductPlanResponse.
 * Use `create(CreateSupplierProductPlanResponseSchema)` to create a new message.
 */
export declare const CreateSupplierProductPlanResponseSchema: GenMessage<CreateSupplierProductPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierProductPlanRequest
 */
export type ReadSupplierProductPlanRequest = Message<"domain.procurement.v1.ReadSupplierProductPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data?: SupplierProductPlan;
};
/**
 * Describes the message domain.procurement.v1.ReadSupplierProductPlanRequest.
 * Use `create(ReadSupplierProductPlanRequestSchema)` to create a new message.
 */
export declare const ReadSupplierProductPlanRequestSchema: GenMessage<ReadSupplierProductPlanRequest>;
/**
 * @generated from message domain.procurement.v1.ReadSupplierProductPlanResponse
 */
export type ReadSupplierProductPlanResponse = Message<"domain.procurement.v1.ReadSupplierProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data: SupplierProductPlan[];
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
 * Describes the message domain.procurement.v1.ReadSupplierProductPlanResponse.
 * Use `create(ReadSupplierProductPlanResponseSchema)` to create a new message.
 */
export declare const ReadSupplierProductPlanResponseSchema: GenMessage<ReadSupplierProductPlanResponse>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierProductPlanRequest
 */
export type UpdateSupplierProductPlanRequest = Message<"domain.procurement.v1.UpdateSupplierProductPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data?: SupplierProductPlan;
};
/**
 * Describes the message domain.procurement.v1.UpdateSupplierProductPlanRequest.
 * Use `create(UpdateSupplierProductPlanRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierProductPlanRequestSchema: GenMessage<UpdateSupplierProductPlanRequest>;
/**
 * @generated from message domain.procurement.v1.UpdateSupplierProductPlanResponse
 */
export type UpdateSupplierProductPlanResponse = Message<"domain.procurement.v1.UpdateSupplierProductPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data: SupplierProductPlan[];
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
 * Describes the message domain.procurement.v1.UpdateSupplierProductPlanResponse.
 * Use `create(UpdateSupplierProductPlanResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierProductPlanResponseSchema: GenMessage<UpdateSupplierProductPlanResponse>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierProductPlanRequest
 */
export type DeleteSupplierProductPlanRequest = Message<"domain.procurement.v1.DeleteSupplierProductPlanRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data?: SupplierProductPlan;
};
/**
 * Describes the message domain.procurement.v1.DeleteSupplierProductPlanRequest.
 * Use `create(DeleteSupplierProductPlanRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierProductPlanRequestSchema: GenMessage<DeleteSupplierProductPlanRequest>;
/**
 * @generated from message domain.procurement.v1.DeleteSupplierProductPlanResponse
 */
export type DeleteSupplierProductPlanResponse = Message<"domain.procurement.v1.DeleteSupplierProductPlanResponse"> & {
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
 * Describes the message domain.procurement.v1.DeleteSupplierProductPlanResponse.
 * Use `create(DeleteSupplierProductPlanResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierProductPlanResponseSchema: GenMessage<DeleteSupplierProductPlanResponse>;
/**
 * @generated from message domain.procurement.v1.ListSupplierProductPlansRequest
 */
export type ListSupplierProductPlansRequest = Message<"domain.procurement.v1.ListSupplierProductPlansRequest"> & {
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
 * Describes the message domain.procurement.v1.ListSupplierProductPlansRequest.
 * Use `create(ListSupplierProductPlansRequestSchema)` to create a new message.
 */
export declare const ListSupplierProductPlansRequestSchema: GenMessage<ListSupplierProductPlansRequest>;
/**
 * @generated from message domain.procurement.v1.ListSupplierProductPlansResponse
 */
export type ListSupplierProductPlansResponse = Message<"domain.procurement.v1.ListSupplierProductPlansResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductPlan data = 1;
     */
    data: SupplierProductPlan[];
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
 * Describes the message domain.procurement.v1.ListSupplierProductPlansResponse.
 * Use `create(ListSupplierProductPlansResponseSchema)` to create a new message.
 */
export declare const ListSupplierProductPlansResponseSchema: GenMessage<ListSupplierProductPlansResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductPlanListPageDataRequest
 */
export type GetSupplierProductPlanListPageDataRequest = Message<"domain.procurement.v1.GetSupplierProductPlanListPageDataRequest"> & {
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
 * Describes the message domain.procurement.v1.GetSupplierProductPlanListPageDataRequest.
 * Use `create(GetSupplierProductPlanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierProductPlanListPageDataRequestSchema: GenMessage<GetSupplierProductPlanListPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductPlanListPageDataResponse
 */
export type GetSupplierProductPlanListPageDataResponse = Message<"domain.procurement.v1.GetSupplierProductPlanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductPlan supplier_product_plan_list = 1;
     */
    supplierProductPlanList: SupplierProductPlan[];
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
 * Describes the message domain.procurement.v1.GetSupplierProductPlanListPageDataResponse.
 * Use `create(GetSupplierProductPlanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierProductPlanListPageDataResponseSchema: GenMessage<GetSupplierProductPlanListPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductPlanItemPageDataRequest
 */
export type GetSupplierProductPlanItemPageDataRequest = Message<"domain.procurement.v1.GetSupplierProductPlanItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_product_plan_id = 1;
     */
    supplierProductPlanId: string;
};
/**
 * Describes the message domain.procurement.v1.GetSupplierProductPlanItemPageDataRequest.
 * Use `create(GetSupplierProductPlanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierProductPlanItemPageDataRequestSchema: GenMessage<GetSupplierProductPlanItemPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetSupplierProductPlanItemPageDataResponse
 */
export type GetSupplierProductPlanItemPageDataResponse = Message<"domain.procurement.v1.GetSupplierProductPlanItemPageDataResponse"> & {
    /**
     * @generated from field: domain.procurement.v1.SupplierProductPlan supplier_product_plan = 1;
     */
    supplierProductPlan?: SupplierProductPlan;
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
 * Describes the message domain.procurement.v1.GetSupplierProductPlanItemPageDataResponse.
 * Use `create(GetSupplierProductPlanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierProductPlanItemPageDataResponseSchema: GenMessage<GetSupplierProductPlanItemPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.ListSupplierProductPlansBySupplierPlanRequest
 */
export type ListSupplierProductPlansBySupplierPlanRequest = Message<"domain.procurement.v1.ListSupplierProductPlansBySupplierPlanRequest"> & {
    /**
     * @generated from field: string supplier_plan_id = 1;
     */
    supplierPlanId: string;
};
/**
 * Describes the message domain.procurement.v1.ListSupplierProductPlansBySupplierPlanRequest.
 * Use `create(ListSupplierProductPlansBySupplierPlanRequestSchema)` to create a new message.
 */
export declare const ListSupplierProductPlansBySupplierPlanRequestSchema: GenMessage<ListSupplierProductPlansBySupplierPlanRequest>;
/**
 * @generated from message domain.procurement.v1.ListSupplierProductPlansBySupplierPlanResponse
 */
export type ListSupplierProductPlansBySupplierPlanResponse = Message<"domain.procurement.v1.ListSupplierProductPlansBySupplierPlanResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.SupplierProductPlan supplier_product_plans = 1;
     */
    supplierProductPlans: SupplierProductPlan[];
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
 * Describes the message domain.procurement.v1.ListSupplierProductPlansBySupplierPlanResponse.
 * Use `create(ListSupplierProductPlansBySupplierPlanResponseSchema)` to create a new message.
 */
export declare const ListSupplierProductPlansBySupplierPlanResponseSchema: GenMessage<ListSupplierProductPlansBySupplierPlanResponse>;
/**
 * @generated from service domain.procurement.v1.SupplierProductPlanDomainService
 */
export declare const SupplierProductPlanDomainService: GenService<{
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.CreateSupplierProductPlan
     */
    createSupplierProductPlan: {
        methodKind: "unary";
        input: typeof CreateSupplierProductPlanRequestSchema;
        output: typeof CreateSupplierProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.ReadSupplierProductPlan
     */
    readSupplierProductPlan: {
        methodKind: "unary";
        input: typeof ReadSupplierProductPlanRequestSchema;
        output: typeof ReadSupplierProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.UpdateSupplierProductPlan
     */
    updateSupplierProductPlan: {
        methodKind: "unary";
        input: typeof UpdateSupplierProductPlanRequestSchema;
        output: typeof UpdateSupplierProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.DeleteSupplierProductPlan
     */
    deleteSupplierProductPlan: {
        methodKind: "unary";
        input: typeof DeleteSupplierProductPlanRequestSchema;
        output: typeof DeleteSupplierProductPlanResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.ListSupplierProductPlans
     */
    listSupplierProductPlans: {
        methodKind: "unary";
        input: typeof ListSupplierProductPlansRequestSchema;
        output: typeof ListSupplierProductPlansResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.GetSupplierProductPlanListPageData
     */
    getSupplierProductPlanListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierProductPlanListPageDataRequestSchema;
        output: typeof GetSupplierProductPlanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.GetSupplierProductPlanItemPageData
     */
    getSupplierProductPlanItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierProductPlanItemPageDataRequestSchema;
        output: typeof GetSupplierProductPlanItemPageDataResponseSchema;
    };
    /**
     * Reverse index: product plans for a given supplier plan.
     *
     * @generated from rpc domain.procurement.v1.SupplierProductPlanDomainService.ListBySupplierPlan
     */
    listBySupplierPlan: {
        methodKind: "unary";
        input: typeof ListSupplierProductPlansBySupplierPlanRequestSchema;
        output: typeof ListSupplierProductPlansBySupplierPlanResponseSchema;
    };
}>;
