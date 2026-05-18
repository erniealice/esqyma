import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Supplier } from "../supplier/supplier_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/delegate_supplier/delegate_supplier.proto.
 */
export declare const file_domain_entity_delegate_supplier_delegate_supplier: GenFile;
/**
 * DelegateSupplier anchors sessions for PRINCIPAL_TYPE_SUPPLIER_DELEGATE.
 * Mirror of DelegateClient — a Delegate user acts ON BEHALF OF a specific Supplier.
 * A single Delegate row may have both DelegateClient rows and DelegateSupplier rows.
 * workspace_id is denormalized from supplier.workspace_id for query efficiency.
 *
 * @generated from message domain.entity.v1.DelegateSupplier
 */
export type DelegateSupplier = Message<"domain.entity.v1.DelegateSupplier"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string delegate_id = 2;
     */
    delegateId: string;
    /**
     * @generated from field: optional domain.entity.v1.Supplier supplier = 3;
     */
    supplier?: Supplier;
    /**
     * @generated from field: string supplier_id = 4;
     */
    supplierId: string;
    /**
     * @generated from field: string role_id = 5;
     */
    roleId: string;
    /**
     * @generated from field: string granted_by_user_id = 6;
     */
    grantedByUserId: string;
    /**
     * @generated from field: optional string workspace_id = 7;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 10;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 11;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 12;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.DelegateSupplier.
 * Use `create(DelegateSupplierSchema)` to create a new message.
 */
export declare const DelegateSupplierSchema: GenMessage<DelegateSupplier>;
/**
 * @generated from message domain.entity.v1.CreateDelegateSupplierRequest
 */
export type CreateDelegateSupplierRequest = Message<"domain.entity.v1.CreateDelegateSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateSupplier data = 1;
     */
    data?: DelegateSupplier;
};
/**
 * Describes the message domain.entity.v1.CreateDelegateSupplierRequest.
 * Use `create(CreateDelegateSupplierRequestSchema)` to create a new message.
 */
export declare const CreateDelegateSupplierRequestSchema: GenMessage<CreateDelegateSupplierRequest>;
/**
 * @generated from message domain.entity.v1.CreateDelegateSupplierResponse
 */
export type CreateDelegateSupplierResponse = Message<"domain.entity.v1.CreateDelegateSupplierResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateSupplier data = 1;
     */
    data: DelegateSupplier[];
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
 * Describes the message domain.entity.v1.CreateDelegateSupplierResponse.
 * Use `create(CreateDelegateSupplierResponseSchema)` to create a new message.
 */
export declare const CreateDelegateSupplierResponseSchema: GenMessage<CreateDelegateSupplierResponse>;
/**
 * @generated from message domain.entity.v1.ReadDelegateSupplierRequest
 */
export type ReadDelegateSupplierRequest = Message<"domain.entity.v1.ReadDelegateSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateSupplier data = 1;
     */
    data?: DelegateSupplier;
};
/**
 * Describes the message domain.entity.v1.ReadDelegateSupplierRequest.
 * Use `create(ReadDelegateSupplierRequestSchema)` to create a new message.
 */
export declare const ReadDelegateSupplierRequestSchema: GenMessage<ReadDelegateSupplierRequest>;
/**
 * @generated from message domain.entity.v1.ReadDelegateSupplierResponse
 */
export type ReadDelegateSupplierResponse = Message<"domain.entity.v1.ReadDelegateSupplierResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateSupplier data = 1;
     */
    data: DelegateSupplier[];
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
 * Describes the message domain.entity.v1.ReadDelegateSupplierResponse.
 * Use `create(ReadDelegateSupplierResponseSchema)` to create a new message.
 */
export declare const ReadDelegateSupplierResponseSchema: GenMessage<ReadDelegateSupplierResponse>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateSupplierRequest
 */
export type UpdateDelegateSupplierRequest = Message<"domain.entity.v1.UpdateDelegateSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateSupplier data = 1;
     */
    data?: DelegateSupplier;
};
/**
 * Describes the message domain.entity.v1.UpdateDelegateSupplierRequest.
 * Use `create(UpdateDelegateSupplierRequestSchema)` to create a new message.
 */
export declare const UpdateDelegateSupplierRequestSchema: GenMessage<UpdateDelegateSupplierRequest>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateSupplierResponse
 */
export type UpdateDelegateSupplierResponse = Message<"domain.entity.v1.UpdateDelegateSupplierResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateSupplier data = 1;
     */
    data: DelegateSupplier[];
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
 * Describes the message domain.entity.v1.UpdateDelegateSupplierResponse.
 * Use `create(UpdateDelegateSupplierResponseSchema)` to create a new message.
 */
export declare const UpdateDelegateSupplierResponseSchema: GenMessage<UpdateDelegateSupplierResponse>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateSupplierRequest
 */
export type DeleteDelegateSupplierRequest = Message<"domain.entity.v1.DeleteDelegateSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateSupplier data = 1;
     */
    data?: DelegateSupplier;
};
/**
 * Describes the message domain.entity.v1.DeleteDelegateSupplierRequest.
 * Use `create(DeleteDelegateSupplierRequestSchema)` to create a new message.
 */
export declare const DeleteDelegateSupplierRequestSchema: GenMessage<DeleteDelegateSupplierRequest>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateSupplierResponse
 */
export type DeleteDelegateSupplierResponse = Message<"domain.entity.v1.DeleteDelegateSupplierResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteDelegateSupplierResponse.
 * Use `create(DeleteDelegateSupplierResponseSchema)` to create a new message.
 */
export declare const DeleteDelegateSupplierResponseSchema: GenMessage<DeleteDelegateSupplierResponse>;
/**
 * @generated from message domain.entity.v1.ListDelegateSuppliersRequest
 */
export type ListDelegateSuppliersRequest = Message<"domain.entity.v1.ListDelegateSuppliersRequest"> & {
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
 * Describes the message domain.entity.v1.ListDelegateSuppliersRequest.
 * Use `create(ListDelegateSuppliersRequestSchema)` to create a new message.
 */
export declare const ListDelegateSuppliersRequestSchema: GenMessage<ListDelegateSuppliersRequest>;
/**
 * @generated from message domain.entity.v1.ListDelegateSuppliersResponse
 */
export type ListDelegateSuppliersResponse = Message<"domain.entity.v1.ListDelegateSuppliersResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateSupplier data = 1;
     */
    data: DelegateSupplier[];
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
 * Describes the message domain.entity.v1.ListDelegateSuppliersResponse.
 * Use `create(ListDelegateSuppliersResponseSchema)` to create a new message.
 */
export declare const ListDelegateSuppliersResponseSchema: GenMessage<ListDelegateSuppliersResponse>;
/**
 * @generated from message domain.entity.v1.GetDelegateSupplierListPageDataRequest
 */
export type GetDelegateSupplierListPageDataRequest = Message<"domain.entity.v1.GetDelegateSupplierListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetDelegateSupplierListPageDataRequest.
 * Use `create(GetDelegateSupplierListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateSupplierListPageDataRequestSchema: GenMessage<GetDelegateSupplierListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetDelegateSupplierListPageDataResponse
 */
export type GetDelegateSupplierListPageDataResponse = Message<"domain.entity.v1.GetDelegateSupplierListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateSupplier delegate_supplier_list = 1;
     */
    delegateSupplierList: DelegateSupplier[];
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
 * Describes the message domain.entity.v1.GetDelegateSupplierListPageDataResponse.
 * Use `create(GetDelegateSupplierListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateSupplierListPageDataResponseSchema: GenMessage<GetDelegateSupplierListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetDelegateSupplierItemPageDataRequest
 */
export type GetDelegateSupplierItemPageDataRequest = Message<"domain.entity.v1.GetDelegateSupplierItemPageDataRequest"> & {
    /**
     * @generated from field: string delegate_supplier_id = 1;
     */
    delegateSupplierId: string;
};
/**
 * Describes the message domain.entity.v1.GetDelegateSupplierItemPageDataRequest.
 * Use `create(GetDelegateSupplierItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateSupplierItemPageDataRequestSchema: GenMessage<GetDelegateSupplierItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetDelegateSupplierItemPageDataResponse
 */
export type GetDelegateSupplierItemPageDataResponse = Message<"domain.entity.v1.GetDelegateSupplierItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.DelegateSupplier delegate_supplier = 1;
     */
    delegateSupplier?: DelegateSupplier;
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
 * Describes the message domain.entity.v1.GetDelegateSupplierItemPageDataResponse.
 * Use `create(GetDelegateSupplierItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateSupplierItemPageDataResponseSchema: GenMessage<GetDelegateSupplierItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.DelegateSupplierDomainService
 */
export declare const DelegateSupplierDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.CreateDelegateSupplier
     */
    createDelegateSupplier: {
        methodKind: "unary";
        input: typeof CreateDelegateSupplierRequestSchema;
        output: typeof CreateDelegateSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.ReadDelegateSupplier
     */
    readDelegateSupplier: {
        methodKind: "unary";
        input: typeof ReadDelegateSupplierRequestSchema;
        output: typeof ReadDelegateSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.UpdateDelegateSupplier
     */
    updateDelegateSupplier: {
        methodKind: "unary";
        input: typeof UpdateDelegateSupplierRequestSchema;
        output: typeof UpdateDelegateSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.DeleteDelegateSupplier
     */
    deleteDelegateSupplier: {
        methodKind: "unary";
        input: typeof DeleteDelegateSupplierRequestSchema;
        output: typeof DeleteDelegateSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.ListDelegateSuppliers
     */
    listDelegateSuppliers: {
        methodKind: "unary";
        input: typeof ListDelegateSuppliersRequestSchema;
        output: typeof ListDelegateSuppliersResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.GetDelegateSupplierListPageData
     */
    getDelegateSupplierListPageData: {
        methodKind: "unary";
        input: typeof GetDelegateSupplierListPageDataRequestSchema;
        output: typeof GetDelegateSupplierListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateSupplierDomainService.GetDelegateSupplierItemPageData
     */
    getDelegateSupplierItemPageData: {
        methodKind: "unary";
        input: typeof GetDelegateSupplierItemPageDataRequestSchema;
        output: typeof GetDelegateSupplierItemPageDataResponseSchema;
    };
}>;
