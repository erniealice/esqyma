import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier_portal_grant/supplier_portal_grant.proto.
 */
export declare const file_domain_entity_supplier_portal_grant_supplier_portal_grant: GenFile;
/**
 * SupplierPortalGrant anchors sessions for PRINCIPAL_TYPE_SUPPLIER.
 * Mirror of ClientPortalGrant — a grant row means: user_id IS the supplier
 * (identified by supplier_id) in workspace_id.
 * Unique constraint: (workspace_id, supplier_id, user_id) — one active grant per
 * (workspace, supplier, user) tuple; role change = revoke + re-grant.
 *
 * @generated from message domain.entity.v1.SupplierPortalGrant
 */
export type SupplierPortalGrant = Message<"domain.entity.v1.SupplierPortalGrant"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string user_id = 3;
     */
    userId: string;
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
 * Describes the message domain.entity.v1.SupplierPortalGrant.
 * Use `create(SupplierPortalGrantSchema)` to create a new message.
 */
export declare const SupplierPortalGrantSchema: GenMessage<SupplierPortalGrant>;
/**
 * @generated from message domain.entity.v1.CreateSupplierPortalGrantRequest
 */
export type CreateSupplierPortalGrantRequest = Message<"domain.entity.v1.CreateSupplierPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data?: SupplierPortalGrant;
};
/**
 * Describes the message domain.entity.v1.CreateSupplierPortalGrantRequest.
 * Use `create(CreateSupplierPortalGrantRequestSchema)` to create a new message.
 */
export declare const CreateSupplierPortalGrantRequestSchema: GenMessage<CreateSupplierPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.CreateSupplierPortalGrantResponse
 */
export type CreateSupplierPortalGrantResponse = Message<"domain.entity.v1.CreateSupplierPortalGrantResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data: SupplierPortalGrant[];
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
 * Describes the message domain.entity.v1.CreateSupplierPortalGrantResponse.
 * Use `create(CreateSupplierPortalGrantResponseSchema)` to create a new message.
 */
export declare const CreateSupplierPortalGrantResponseSchema: GenMessage<CreateSupplierPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.ReadSupplierPortalGrantRequest
 */
export type ReadSupplierPortalGrantRequest = Message<"domain.entity.v1.ReadSupplierPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data?: SupplierPortalGrant;
};
/**
 * Describes the message domain.entity.v1.ReadSupplierPortalGrantRequest.
 * Use `create(ReadSupplierPortalGrantRequestSchema)` to create a new message.
 */
export declare const ReadSupplierPortalGrantRequestSchema: GenMessage<ReadSupplierPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.ReadSupplierPortalGrantResponse
 */
export type ReadSupplierPortalGrantResponse = Message<"domain.entity.v1.ReadSupplierPortalGrantResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data: SupplierPortalGrant[];
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
 * Describes the message domain.entity.v1.ReadSupplierPortalGrantResponse.
 * Use `create(ReadSupplierPortalGrantResponseSchema)` to create a new message.
 */
export declare const ReadSupplierPortalGrantResponseSchema: GenMessage<ReadSupplierPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierPortalGrantRequest
 */
export type UpdateSupplierPortalGrantRequest = Message<"domain.entity.v1.UpdateSupplierPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data?: SupplierPortalGrant;
};
/**
 * Describes the message domain.entity.v1.UpdateSupplierPortalGrantRequest.
 * Use `create(UpdateSupplierPortalGrantRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierPortalGrantRequestSchema: GenMessage<UpdateSupplierPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierPortalGrantResponse
 */
export type UpdateSupplierPortalGrantResponse = Message<"domain.entity.v1.UpdateSupplierPortalGrantResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data: SupplierPortalGrant[];
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
 * Describes the message domain.entity.v1.UpdateSupplierPortalGrantResponse.
 * Use `create(UpdateSupplierPortalGrantResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierPortalGrantResponseSchema: GenMessage<UpdateSupplierPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierPortalGrantRequest
 */
export type DeleteSupplierPortalGrantRequest = Message<"domain.entity.v1.DeleteSupplierPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data?: SupplierPortalGrant;
};
/**
 * Describes the message domain.entity.v1.DeleteSupplierPortalGrantRequest.
 * Use `create(DeleteSupplierPortalGrantRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierPortalGrantRequestSchema: GenMessage<DeleteSupplierPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierPortalGrantResponse
 */
export type DeleteSupplierPortalGrantResponse = Message<"domain.entity.v1.DeleteSupplierPortalGrantResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteSupplierPortalGrantResponse.
 * Use `create(DeleteSupplierPortalGrantResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierPortalGrantResponseSchema: GenMessage<DeleteSupplierPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.ListSupplierPortalGrantsRequest
 */
export type ListSupplierPortalGrantsRequest = Message<"domain.entity.v1.ListSupplierPortalGrantsRequest"> & {
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
 * Describes the message domain.entity.v1.ListSupplierPortalGrantsRequest.
 * Use `create(ListSupplierPortalGrantsRequestSchema)` to create a new message.
 */
export declare const ListSupplierPortalGrantsRequestSchema: GenMessage<ListSupplierPortalGrantsRequest>;
/**
 * @generated from message domain.entity.v1.ListSupplierPortalGrantsResponse
 */
export type ListSupplierPortalGrantsResponse = Message<"domain.entity.v1.ListSupplierPortalGrantsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierPortalGrant data = 1;
     */
    data: SupplierPortalGrant[];
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
 * Describes the message domain.entity.v1.ListSupplierPortalGrantsResponse.
 * Use `create(ListSupplierPortalGrantsResponseSchema)` to create a new message.
 */
export declare const ListSupplierPortalGrantsResponseSchema: GenMessage<ListSupplierPortalGrantsResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierPortalGrantListPageDataRequest
 */
export type GetSupplierPortalGrantListPageDataRequest = Message<"domain.entity.v1.GetSupplierPortalGrantListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetSupplierPortalGrantListPageDataRequest.
 * Use `create(GetSupplierPortalGrantListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierPortalGrantListPageDataRequestSchema: GenMessage<GetSupplierPortalGrantListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierPortalGrantListPageDataResponse
 */
export type GetSupplierPortalGrantListPageDataResponse = Message<"domain.entity.v1.GetSupplierPortalGrantListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierPortalGrant supplier_portal_grant_list = 1;
     */
    supplierPortalGrantList: SupplierPortalGrant[];
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
 * Describes the message domain.entity.v1.GetSupplierPortalGrantListPageDataResponse.
 * Use `create(GetSupplierPortalGrantListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierPortalGrantListPageDataResponseSchema: GenMessage<GetSupplierPortalGrantListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierPortalGrantItemPageDataRequest
 */
export type GetSupplierPortalGrantItemPageDataRequest = Message<"domain.entity.v1.GetSupplierPortalGrantItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_portal_grant_id = 1;
     */
    supplierPortalGrantId: string;
};
/**
 * Describes the message domain.entity.v1.GetSupplierPortalGrantItemPageDataRequest.
 * Use `create(GetSupplierPortalGrantItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierPortalGrantItemPageDataRequestSchema: GenMessage<GetSupplierPortalGrantItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierPortalGrantItemPageDataResponse
 */
export type GetSupplierPortalGrantItemPageDataResponse = Message<"domain.entity.v1.GetSupplierPortalGrantItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.SupplierPortalGrant supplier_portal_grant = 1;
     */
    supplierPortalGrant?: SupplierPortalGrant;
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
 * Describes the message domain.entity.v1.GetSupplierPortalGrantItemPageDataResponse.
 * Use `create(GetSupplierPortalGrantItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierPortalGrantItemPageDataResponseSchema: GenMessage<GetSupplierPortalGrantItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.SupplierPortalGrantDomainService
 */
export declare const SupplierPortalGrantDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.CreateSupplierPortalGrant
     */
    createSupplierPortalGrant: {
        methodKind: "unary";
        input: typeof CreateSupplierPortalGrantRequestSchema;
        output: typeof CreateSupplierPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.ReadSupplierPortalGrant
     */
    readSupplierPortalGrant: {
        methodKind: "unary";
        input: typeof ReadSupplierPortalGrantRequestSchema;
        output: typeof ReadSupplierPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.UpdateSupplierPortalGrant
     */
    updateSupplierPortalGrant: {
        methodKind: "unary";
        input: typeof UpdateSupplierPortalGrantRequestSchema;
        output: typeof UpdateSupplierPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.DeleteSupplierPortalGrant
     */
    deleteSupplierPortalGrant: {
        methodKind: "unary";
        input: typeof DeleteSupplierPortalGrantRequestSchema;
        output: typeof DeleteSupplierPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.ListSupplierPortalGrants
     */
    listSupplierPortalGrants: {
        methodKind: "unary";
        input: typeof ListSupplierPortalGrantsRequestSchema;
        output: typeof ListSupplierPortalGrantsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.GetSupplierPortalGrantListPageData
     */
    getSupplierPortalGrantListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierPortalGrantListPageDataRequestSchema;
        output: typeof GetSupplierPortalGrantListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierPortalGrantDomainService.GetSupplierPortalGrantItemPageData
     */
    getSupplierPortalGrantItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierPortalGrantItemPageDataRequestSchema;
        output: typeof GetSupplierPortalGrantItemPageDataResponseSchema;
    };
}>;
