import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
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
    /**
     * Performance Evaluation §E1 — the leased human = Identity. All ADDITIVE + optional
     * (entity/staff is a POPULATED live table; no NOT NULL here). Two orthogonal axes:
     *   * status (existing string) carries AVAILABILITY (available|assigned|bench|offboarded)
     *   * employment_type carries the EMPLOYMENT model (see EmploymentType enum) — never overloaded onto status
     *
     * multi-tenant scope
     *
     * @generated from field: optional string workspace_id = 9;
     */
    workspaceId?: string;
    /**
     * AVAILABILITY: available|assigned|bench|offboarded (active = status NOT IN {offboarded})
     *
     * @generated from field: optional string status = 10;
     */
    status?: string;
    /**
     * EMPLOYMENT model (string; values from EmploymentType): EMPLOYED|CONTRACTOR|EXTERNAL|PARTNER|RETAINED|SUBCONTRACTOR
     *
     * @generated from field: optional string employment_type = 11;
     */
    employmentType?: string;
    /**
     * display snapshot; canonical rank = ProductVariant/ProductOption
     *
     * @generated from field: optional string seniority = 12;
     */
    seniority?: string;
    /**
     * ISO 8601
     *
     * @generated from field: optional string employment_start = 13;
     */
    employmentStart?: string;
    /**
     * ISO 8601 (nil = active)
     *
     * @generated from field: optional string employment_end = 14;
     */
    employmentEnd?: string;
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
 * EmploymentType is the EMPLOYMENT model on entity/staff (Performance Evaluation §E2;
 * Q-EMPLOYMENT-TYPE-1). It is ORTHOGONAL to Staff.status (availability) and is never
 * overloaded onto status. The Staff.employment_type column stays `string` (existing-entity
 * convention, pairs with `active`); this enum is the canonical value vocabulary.
 *
 * @generated from enum domain.entity.v1.EmploymentType
 */
export declare enum EmploymentType {
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_EMPLOYED = 1;
     */
    EMPLOYED = 1,
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_CONTRACTOR = 2;
     */
    CONTRACTOR = 2,
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_EXTERNAL = 3;
     */
    EXTERNAL = 3,
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_PARTNER = 4;
     */
    PARTNER = 4,
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_RETAINED = 5;
     */
    RETAINED = 5,
    /**
     * @generated from enum value: EMPLOYMENT_TYPE_SUBCONTRACTOR = 6;
     */
    SUBCONTRACTOR = 6
}
/**
 * Describes the enum domain.entity.v1.EmploymentType.
 */
export declare const EmploymentTypeSchema: GenEnum<EmploymentType>;
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
