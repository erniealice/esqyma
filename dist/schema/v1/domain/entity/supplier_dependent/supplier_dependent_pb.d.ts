import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier_dependent/supplier_dependent.proto.
 */
export declare const file_domain_entity_supplier_dependent_supplier_dependent: GenFile;
/**
 * SupplierDependent is a kind-agnostic relation table for spouses, children,
 * guarantors, beneficial owners, etc. For Supplier(kind='employee') it carries
 * PH dependent metadata for PhilHealth and BIR 2305.
 *
 * @generated from message domain.entity.v1.SupplierDependent
 */
export type SupplierDependent = Message<"domain.entity.v1.SupplierDependent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string supplier_id = 3;
     */
    supplierId: string;
    /**
     * @generated from field: string full_name = 4;
     */
    fullName: string;
    /**
     * "SPOUSE" | "CHILD" | "PARENT" | "GUARANTOR" | "BENEFICIAL_OWNER"
     *
     * @generated from field: string relationship = 5;
     */
    relationship: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: optional string date_of_birth = 6;
     */
    dateOfBirth?: string;
    /**
     * Employee-specific (PH)
     *
     * @generated from field: bool philhealth_enrolled = 7;
     */
    philhealthEnrolled: boolean;
    /**
     * @generated from field: bool bir_dependent = 8;
     */
    birDependent: boolean;
    /**
     * JSON-encoded
     *
     * @generated from field: optional string metadata = 9;
     */
    metadata?: string;
    /**
     * Audit
     *
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 13;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 14;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.entity.v1.SupplierDependent.
 * Use `create(SupplierDependentSchema)` to create a new message.
 */
export declare const SupplierDependentSchema: GenMessage<SupplierDependent>;
/**
 * @generated from message domain.entity.v1.CreateSupplierDependentRequest
 */
export type CreateSupplierDependentRequest = Message<"domain.entity.v1.CreateSupplierDependentRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierDependent data = 1;
     */
    data?: SupplierDependent;
};
/**
 * Describes the message domain.entity.v1.CreateSupplierDependentRequest.
 * Use `create(CreateSupplierDependentRequestSchema)` to create a new message.
 */
export declare const CreateSupplierDependentRequestSchema: GenMessage<CreateSupplierDependentRequest>;
/**
 * @generated from message domain.entity.v1.CreateSupplierDependentResponse
 */
export type CreateSupplierDependentResponse = Message<"domain.entity.v1.CreateSupplierDependentResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierDependent data = 1;
     */
    data: SupplierDependent[];
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
 * Describes the message domain.entity.v1.CreateSupplierDependentResponse.
 * Use `create(CreateSupplierDependentResponseSchema)` to create a new message.
 */
export declare const CreateSupplierDependentResponseSchema: GenMessage<CreateSupplierDependentResponse>;
/**
 * @generated from message domain.entity.v1.ReadSupplierDependentRequest
 */
export type ReadSupplierDependentRequest = Message<"domain.entity.v1.ReadSupplierDependentRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierDependent data = 1;
     */
    data?: SupplierDependent;
};
/**
 * Describes the message domain.entity.v1.ReadSupplierDependentRequest.
 * Use `create(ReadSupplierDependentRequestSchema)` to create a new message.
 */
export declare const ReadSupplierDependentRequestSchema: GenMessage<ReadSupplierDependentRequest>;
/**
 * @generated from message domain.entity.v1.ReadSupplierDependentResponse
 */
export type ReadSupplierDependentResponse = Message<"domain.entity.v1.ReadSupplierDependentResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierDependent data = 1;
     */
    data: SupplierDependent[];
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
 * Describes the message domain.entity.v1.ReadSupplierDependentResponse.
 * Use `create(ReadSupplierDependentResponseSchema)` to create a new message.
 */
export declare const ReadSupplierDependentResponseSchema: GenMessage<ReadSupplierDependentResponse>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierDependentRequest
 */
export type UpdateSupplierDependentRequest = Message<"domain.entity.v1.UpdateSupplierDependentRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierDependent data = 1;
     */
    data?: SupplierDependent;
};
/**
 * Describes the message domain.entity.v1.UpdateSupplierDependentRequest.
 * Use `create(UpdateSupplierDependentRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierDependentRequestSchema: GenMessage<UpdateSupplierDependentRequest>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierDependentResponse
 */
export type UpdateSupplierDependentResponse = Message<"domain.entity.v1.UpdateSupplierDependentResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierDependent data = 1;
     */
    data: SupplierDependent[];
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
 * Describes the message domain.entity.v1.UpdateSupplierDependentResponse.
 * Use `create(UpdateSupplierDependentResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierDependentResponseSchema: GenMessage<UpdateSupplierDependentResponse>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierDependentRequest
 */
export type DeleteSupplierDependentRequest = Message<"domain.entity.v1.DeleteSupplierDependentRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierDependent data = 1;
     */
    data?: SupplierDependent;
};
/**
 * Describes the message domain.entity.v1.DeleteSupplierDependentRequest.
 * Use `create(DeleteSupplierDependentRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierDependentRequestSchema: GenMessage<DeleteSupplierDependentRequest>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierDependentResponse
 */
export type DeleteSupplierDependentResponse = Message<"domain.entity.v1.DeleteSupplierDependentResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteSupplierDependentResponse.
 * Use `create(DeleteSupplierDependentResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierDependentResponseSchema: GenMessage<DeleteSupplierDependentResponse>;
/**
 * @generated from message domain.entity.v1.ListSupplierDependentsRequest
 */
export type ListSupplierDependentsRequest = Message<"domain.entity.v1.ListSupplierDependentsRequest"> & {
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
 * Describes the message domain.entity.v1.ListSupplierDependentsRequest.
 * Use `create(ListSupplierDependentsRequestSchema)` to create a new message.
 */
export declare const ListSupplierDependentsRequestSchema: GenMessage<ListSupplierDependentsRequest>;
/**
 * @generated from message domain.entity.v1.ListSupplierDependentsResponse
 */
export type ListSupplierDependentsResponse = Message<"domain.entity.v1.ListSupplierDependentsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierDependent data = 1;
     */
    data: SupplierDependent[];
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
 * Describes the message domain.entity.v1.ListSupplierDependentsResponse.
 * Use `create(ListSupplierDependentsResponseSchema)` to create a new message.
 */
export declare const ListSupplierDependentsResponseSchema: GenMessage<ListSupplierDependentsResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierDependentListPageDataRequest
 */
export type GetSupplierDependentListPageDataRequest = Message<"domain.entity.v1.GetSupplierDependentListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetSupplierDependentListPageDataRequest.
 * Use `create(GetSupplierDependentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierDependentListPageDataRequestSchema: GenMessage<GetSupplierDependentListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierDependentListPageDataResponse
 */
export type GetSupplierDependentListPageDataResponse = Message<"domain.entity.v1.GetSupplierDependentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierDependent supplier_dependent_list = 1;
     */
    supplierDependentList: SupplierDependent[];
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
 * Describes the message domain.entity.v1.GetSupplierDependentListPageDataResponse.
 * Use `create(GetSupplierDependentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierDependentListPageDataResponseSchema: GenMessage<GetSupplierDependentListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierDependentItemPageDataRequest
 */
export type GetSupplierDependentItemPageDataRequest = Message<"domain.entity.v1.GetSupplierDependentItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_dependent_id = 1;
     */
    supplierDependentId: string;
};
/**
 * Describes the message domain.entity.v1.GetSupplierDependentItemPageDataRequest.
 * Use `create(GetSupplierDependentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierDependentItemPageDataRequestSchema: GenMessage<GetSupplierDependentItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierDependentItemPageDataResponse
 */
export type GetSupplierDependentItemPageDataResponse = Message<"domain.entity.v1.GetSupplierDependentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.SupplierDependent supplier_dependent = 1;
     */
    supplierDependent?: SupplierDependent;
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
 * Describes the message domain.entity.v1.GetSupplierDependentItemPageDataResponse.
 * Use `create(GetSupplierDependentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierDependentItemPageDataResponseSchema: GenMessage<GetSupplierDependentItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.SupplierDependentDomainService
 */
export declare const SupplierDependentDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.CreateSupplierDependent
     */
    createSupplierDependent: {
        methodKind: "unary";
        input: typeof CreateSupplierDependentRequestSchema;
        output: typeof CreateSupplierDependentResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.ReadSupplierDependent
     */
    readSupplierDependent: {
        methodKind: "unary";
        input: typeof ReadSupplierDependentRequestSchema;
        output: typeof ReadSupplierDependentResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.UpdateSupplierDependent
     */
    updateSupplierDependent: {
        methodKind: "unary";
        input: typeof UpdateSupplierDependentRequestSchema;
        output: typeof UpdateSupplierDependentResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.DeleteSupplierDependent
     */
    deleteSupplierDependent: {
        methodKind: "unary";
        input: typeof DeleteSupplierDependentRequestSchema;
        output: typeof DeleteSupplierDependentResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.ListSupplierDependents
     */
    listSupplierDependents: {
        methodKind: "unary";
        input: typeof ListSupplierDependentsRequestSchema;
        output: typeof ListSupplierDependentsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.GetSupplierDependentListPageData
     */
    getSupplierDependentListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierDependentListPageDataRequestSchema;
        output: typeof GetSupplierDependentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDependentDomainService.GetSupplierDependentItemPageData
     */
    getSupplierDependentItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierDependentItemPageDataRequestSchema;
        output: typeof GetSupplierDependentItemPageDataResponseSchema;
    };
}>;
