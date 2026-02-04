import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { User } from "../user/user_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/staff/staff.proto.
 */
export declare const file_domain_entity_staff_staff: GenFile;
/**
 * @generated from message domain.entity.v1.Staff
 */
export type Staff = Message<"domain.entity.v1.Staff"> & {
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
 * Describes the message domain.entity.v1.Staff.
 * Use `create(StaffSchema)` to create a new message.
 */
export declare const StaffSchema: GenMessage<Staff>;
/**
 * @generated from message domain.entity.v1.CreateStaffRequest
 */
export type CreateStaffRequest = Message<"domain.entity.v1.CreateStaffRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Staff data = 1;
     */
    data?: Staff;
};
/**
 * Describes the message domain.entity.v1.CreateStaffRequest.
 * Use `create(CreateStaffRequestSchema)` to create a new message.
 */
export declare const CreateStaffRequestSchema: GenMessage<CreateStaffRequest>;
/**
 * @generated from message domain.entity.v1.CreateStaffResponse
 */
export type CreateStaffResponse = Message<"domain.entity.v1.CreateStaffResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Staff data = 1;
     */
    data: Staff[];
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
 * Describes the message domain.entity.v1.CreateStaffResponse.
 * Use `create(CreateStaffResponseSchema)` to create a new message.
 */
export declare const CreateStaffResponseSchema: GenMessage<CreateStaffResponse>;
/**
 * @generated from message domain.entity.v1.ReadStaffRequest
 */
export type ReadStaffRequest = Message<"domain.entity.v1.ReadStaffRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Staff data = 1;
     */
    data?: Staff;
};
/**
 * Describes the message domain.entity.v1.ReadStaffRequest.
 * Use `create(ReadStaffRequestSchema)` to create a new message.
 */
export declare const ReadStaffRequestSchema: GenMessage<ReadStaffRequest>;
/**
 * @generated from message domain.entity.v1.ReadStaffResponse
 */
export type ReadStaffResponse = Message<"domain.entity.v1.ReadStaffResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Staff data = 1;
     */
    data: Staff[];
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
 * Describes the message domain.entity.v1.ReadStaffResponse.
 * Use `create(ReadStaffResponseSchema)` to create a new message.
 */
export declare const ReadStaffResponseSchema: GenMessage<ReadStaffResponse>;
/**
 * @generated from message domain.entity.v1.UpdateStaffRequest
 */
export type UpdateStaffRequest = Message<"domain.entity.v1.UpdateStaffRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Staff data = 1;
     */
    data?: Staff;
};
/**
 * Describes the message domain.entity.v1.UpdateStaffRequest.
 * Use `create(UpdateStaffRequestSchema)` to create a new message.
 */
export declare const UpdateStaffRequestSchema: GenMessage<UpdateStaffRequest>;
/**
 * @generated from message domain.entity.v1.UpdateStaffResponse
 */
export type UpdateStaffResponse = Message<"domain.entity.v1.UpdateStaffResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Staff data = 1;
     */
    data: Staff[];
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
 * Describes the message domain.entity.v1.UpdateStaffResponse.
 * Use `create(UpdateStaffResponseSchema)` to create a new message.
 */
export declare const UpdateStaffResponseSchema: GenMessage<UpdateStaffResponse>;
/**
 * @generated from message domain.entity.v1.DeleteStaffRequest
 */
export type DeleteStaffRequest = Message<"domain.entity.v1.DeleteStaffRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Staff data = 1;
     */
    data?: Staff;
};
/**
 * Describes the message domain.entity.v1.DeleteStaffRequest.
 * Use `create(DeleteStaffRequestSchema)` to create a new message.
 */
export declare const DeleteStaffRequestSchema: GenMessage<DeleteStaffRequest>;
/**
 * @generated from message domain.entity.v1.DeleteStaffResponse
 */
export type DeleteStaffResponse = Message<"domain.entity.v1.DeleteStaffResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteStaffResponse.
 * Use `create(DeleteStaffResponseSchema)` to create a new message.
 */
export declare const DeleteStaffResponseSchema: GenMessage<DeleteStaffResponse>;
/**
 * @generated from message domain.entity.v1.ListStaffsRequest
 */
export type ListStaffsRequest = Message<"domain.entity.v1.ListStaffsRequest"> & {
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
 * Describes the message domain.entity.v1.ListStaffsRequest.
 * Use `create(ListStaffsRequestSchema)` to create a new message.
 */
export declare const ListStaffsRequestSchema: GenMessage<ListStaffsRequest>;
/**
 * @generated from message domain.entity.v1.ListStaffsResponse
 */
export type ListStaffsResponse = Message<"domain.entity.v1.ListStaffsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Staff data = 1;
     */
    data: Staff[];
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
 * Describes the message domain.entity.v1.ListStaffsResponse.
 * Use `create(ListStaffsResponseSchema)` to create a new message.
 */
export declare const ListStaffsResponseSchema: GenMessage<ListStaffsResponse>;
/**
 * @generated from message domain.entity.v1.GetStaffListPageDataRequest
 */
export type GetStaffListPageDataRequest = Message<"domain.entity.v1.GetStaffListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetStaffListPageDataRequest.
 * Use `create(GetStaffListPageDataRequestSchema)` to create a new message.
 */
export declare const GetStaffListPageDataRequestSchema: GenMessage<GetStaffListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetStaffListPageDataResponse
 */
export type GetStaffListPageDataResponse = Message<"domain.entity.v1.GetStaffListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Staff staff_list = 1;
     */
    staffList: Staff[];
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
 * Describes the message domain.entity.v1.GetStaffListPageDataResponse.
 * Use `create(GetStaffListPageDataResponseSchema)` to create a new message.
 */
export declare const GetStaffListPageDataResponseSchema: GenMessage<GetStaffListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetStaffItemPageDataRequest
 */
export type GetStaffItemPageDataRequest = Message<"domain.entity.v1.GetStaffItemPageDataRequest"> & {
    /**
     * @generated from field: string staff_id = 1;
     */
    staffId: string;
};
/**
 * Describes the message domain.entity.v1.GetStaffItemPageDataRequest.
 * Use `create(GetStaffItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetStaffItemPageDataRequestSchema: GenMessage<GetStaffItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetStaffItemPageDataResponse
 */
export type GetStaffItemPageDataResponse = Message<"domain.entity.v1.GetStaffItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Staff staff = 1;
     */
    staff?: Staff;
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
 * Describes the message domain.entity.v1.GetStaffItemPageDataResponse.
 * Use `create(GetStaffItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetStaffItemPageDataResponseSchema: GenMessage<GetStaffItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.StaffDomainService
 */
export declare const StaffDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.CreateStaff
     */
    createStaff: {
        methodKind: "unary";
        input: typeof CreateStaffRequestSchema;
        output: typeof CreateStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.ReadStaff
     */
    readStaff: {
        methodKind: "unary";
        input: typeof ReadStaffRequestSchema;
        output: typeof ReadStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.UpdateStaff
     */
    updateStaff: {
        methodKind: "unary";
        input: typeof UpdateStaffRequestSchema;
        output: typeof UpdateStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.DeleteStaff
     */
    deleteStaff: {
        methodKind: "unary";
        input: typeof DeleteStaffRequestSchema;
        output: typeof DeleteStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.ListStaffs
     */
    listStaffs: {
        methodKind: "unary";
        input: typeof ListStaffsRequestSchema;
        output: typeof ListStaffsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.GetStaffListPageData
     */
    getStaffListPageData: {
        methodKind: "unary";
        input: typeof GetStaffListPageDataRequestSchema;
        output: typeof GetStaffListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffDomainService.GetStaffItemPageData
     */
    getStaffItemPageData: {
        methodKind: "unary";
        input: typeof GetStaffItemPageDataRequestSchema;
        output: typeof GetStaffItemPageDataResponseSchema;
    };
}>;
