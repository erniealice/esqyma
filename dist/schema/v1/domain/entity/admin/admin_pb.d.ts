import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { User } from "../user/user_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/admin/admin.proto.
 */
export declare const file_domain_entity_admin_admin: GenFile;
/**
 * @generated from message domain.entity.v1.Admin
 */
export type Admin = Message<"domain.entity.v1.Admin"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.entity.v1.User user = 2;
     */
    user?: User;
    /**
     * @generated from field: string user_id = 3;
     */
    userId: string;
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
};
/**
 * Describes the message domain.entity.v1.Admin.
 * Use `create(AdminSchema)` to create a new message.
 */
export declare const AdminSchema: GenMessage<Admin>;
/**
 * @generated from message domain.entity.v1.CreateAdminRequest
 */
export type CreateAdminRequest = Message<"domain.entity.v1.CreateAdminRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Admin data = 1;
     */
    data?: Admin;
};
/**
 * Describes the message domain.entity.v1.CreateAdminRequest.
 * Use `create(CreateAdminRequestSchema)` to create a new message.
 */
export declare const CreateAdminRequestSchema: GenMessage<CreateAdminRequest>;
/**
 * @generated from message domain.entity.v1.CreateAdminResponse
 */
export type CreateAdminResponse = Message<"domain.entity.v1.CreateAdminResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Admin data = 1;
     */
    data: Admin[];
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
 * Describes the message domain.entity.v1.CreateAdminResponse.
 * Use `create(CreateAdminResponseSchema)` to create a new message.
 */
export declare const CreateAdminResponseSchema: GenMessage<CreateAdminResponse>;
/**
 * @generated from message domain.entity.v1.ReadAdminRequest
 */
export type ReadAdminRequest = Message<"domain.entity.v1.ReadAdminRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Admin data = 1;
     */
    data?: Admin;
};
/**
 * Describes the message domain.entity.v1.ReadAdminRequest.
 * Use `create(ReadAdminRequestSchema)` to create a new message.
 */
export declare const ReadAdminRequestSchema: GenMessage<ReadAdminRequest>;
/**
 * @generated from message domain.entity.v1.ReadAdminResponse
 */
export type ReadAdminResponse = Message<"domain.entity.v1.ReadAdminResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Admin data = 1;
     */
    data: Admin[];
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
 * Describes the message domain.entity.v1.ReadAdminResponse.
 * Use `create(ReadAdminResponseSchema)` to create a new message.
 */
export declare const ReadAdminResponseSchema: GenMessage<ReadAdminResponse>;
/**
 * @generated from message domain.entity.v1.UpdateAdminRequest
 */
export type UpdateAdminRequest = Message<"domain.entity.v1.UpdateAdminRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Admin data = 1;
     */
    data?: Admin;
};
/**
 * Describes the message domain.entity.v1.UpdateAdminRequest.
 * Use `create(UpdateAdminRequestSchema)` to create a new message.
 */
export declare const UpdateAdminRequestSchema: GenMessage<UpdateAdminRequest>;
/**
 * @generated from message domain.entity.v1.UpdateAdminResponse
 */
export type UpdateAdminResponse = Message<"domain.entity.v1.UpdateAdminResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Admin data = 1;
     */
    data: Admin[];
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
 * Describes the message domain.entity.v1.UpdateAdminResponse.
 * Use `create(UpdateAdminResponseSchema)` to create a new message.
 */
export declare const UpdateAdminResponseSchema: GenMessage<UpdateAdminResponse>;
/**
 * @generated from message domain.entity.v1.DeleteAdminRequest
 */
export type DeleteAdminRequest = Message<"domain.entity.v1.DeleteAdminRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Admin data = 1;
     */
    data?: Admin;
};
/**
 * Describes the message domain.entity.v1.DeleteAdminRequest.
 * Use `create(DeleteAdminRequestSchema)` to create a new message.
 */
export declare const DeleteAdminRequestSchema: GenMessage<DeleteAdminRequest>;
/**
 * @generated from message domain.entity.v1.DeleteAdminResponse
 */
export type DeleteAdminResponse = Message<"domain.entity.v1.DeleteAdminResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteAdminResponse.
 * Use `create(DeleteAdminResponseSchema)` to create a new message.
 */
export declare const DeleteAdminResponseSchema: GenMessage<DeleteAdminResponse>;
/**
 * @generated from message domain.entity.v1.ListAdminsRequest
 */
export type ListAdminsRequest = Message<"domain.entity.v1.ListAdminsRequest"> & {
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
 * Describes the message domain.entity.v1.ListAdminsRequest.
 * Use `create(ListAdminsRequestSchema)` to create a new message.
 */
export declare const ListAdminsRequestSchema: GenMessage<ListAdminsRequest>;
/**
 * @generated from message domain.entity.v1.ListAdminsResponse
 */
export type ListAdminsResponse = Message<"domain.entity.v1.ListAdminsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Admin data = 1;
     */
    data: Admin[];
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
 * Describes the message domain.entity.v1.ListAdminsResponse.
 * Use `create(ListAdminsResponseSchema)` to create a new message.
 */
export declare const ListAdminsResponseSchema: GenMessage<ListAdminsResponse>;
/**
 * @generated from message domain.entity.v1.GetAdminListPageDataRequest
 */
export type GetAdminListPageDataRequest = Message<"domain.entity.v1.GetAdminListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetAdminListPageDataRequest.
 * Use `create(GetAdminListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAdminListPageDataRequestSchema: GenMessage<GetAdminListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetAdminListPageDataResponse
 */
export type GetAdminListPageDataResponse = Message<"domain.entity.v1.GetAdminListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Admin admin_list = 1;
     */
    adminList: Admin[];
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
 * Describes the message domain.entity.v1.GetAdminListPageDataResponse.
 * Use `create(GetAdminListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAdminListPageDataResponseSchema: GenMessage<GetAdminListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetAdminItemPageDataRequest
 */
export type GetAdminItemPageDataRequest = Message<"domain.entity.v1.GetAdminItemPageDataRequest"> & {
    /**
     * @generated from field: string admin_id = 1;
     */
    adminId: string;
};
/**
 * Describes the message domain.entity.v1.GetAdminItemPageDataRequest.
 * Use `create(GetAdminItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAdminItemPageDataRequestSchema: GenMessage<GetAdminItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetAdminItemPageDataResponse
 */
export type GetAdminItemPageDataResponse = Message<"domain.entity.v1.GetAdminItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Admin admin = 1;
     */
    admin?: Admin;
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
 * Describes the message domain.entity.v1.GetAdminItemPageDataResponse.
 * Use `create(GetAdminItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAdminItemPageDataResponseSchema: GenMessage<GetAdminItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.AdminDomainService
 */
export declare const AdminDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.CreateAdmin
     */
    createAdmin: {
        methodKind: "unary";
        input: typeof CreateAdminRequestSchema;
        output: typeof CreateAdminResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.ReadAdmin
     */
    readAdmin: {
        methodKind: "unary";
        input: typeof ReadAdminRequestSchema;
        output: typeof ReadAdminResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.UpdateAdmin
     */
    updateAdmin: {
        methodKind: "unary";
        input: typeof UpdateAdminRequestSchema;
        output: typeof UpdateAdminResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.DeleteAdmin
     */
    deleteAdmin: {
        methodKind: "unary";
        input: typeof DeleteAdminRequestSchema;
        output: typeof DeleteAdminResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.ListAdmins
     */
    listAdmins: {
        methodKind: "unary";
        input: typeof ListAdminsRequestSchema;
        output: typeof ListAdminsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.GetAdminListPageData
     */
    getAdminListPageData: {
        methodKind: "unary";
        input: typeof GetAdminListPageDataRequestSchema;
        output: typeof GetAdminListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.AdminDomainService.GetAdminItemPageData
     */
    getAdminItemPageData: {
        methodKind: "unary";
        input: typeof GetAdminItemPageDataRequestSchema;
        output: typeof GetAdminItemPageDataResponseSchema;
    };
}>;
