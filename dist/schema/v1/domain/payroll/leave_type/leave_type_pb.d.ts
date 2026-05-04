import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/leave_type/leave_type.proto.
 */
export declare const file_domain_payroll_leave_type_leave_type: GenFile;
/**
 * LeaveType is a per-jurisdiction leave plan template (VL, SL, ML, PL, BL, SOLO_PARENT, MAGNA_CARTA, etc.).
 *
 * @generated from message domain.payroll.v1.LeaveType
 */
export type LeaveType = Message<"domain.payroll.v1.LeaveType"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional string workspace_id = 2;
     */
    workspaceId?: string;
    /**
     * @generated from field: string compliance_region = 3;
     */
    complianceRegion: string;
    /**
     * "VL" | "SL" | "ML" | "PL" | "BL" | "SOLO_PARENT" | "MAGNA_CARTA"
     *
     * @generated from field: string code = 4;
     */
    code: string;
    /**
     * @generated from field: string name = 5;
     */
    name: string;
    /**
     * @generated from field: bool paid = 6;
     */
    paid: boolean;
    /**
     * @generated from field: int32 accrual_days_per_year = 7;
     */
    accrualDaysPerYear: number;
    /**
     * @generated from field: int32 max_carryover_days = 8;
     */
    maxCarryoverDays: number;
    /**
     * "RA 11210" / "RA 8187"
     *
     * @generated from field: optional string source_citation = 9;
     */
    sourceCitation?: string;
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
 * Describes the message domain.payroll.v1.LeaveType.
 * Use `create(LeaveTypeSchema)` to create a new message.
 */
export declare const LeaveTypeSchema: GenMessage<LeaveType>;
/**
 * @generated from message domain.payroll.v1.CreateLeaveTypeRequest
 */
export type CreateLeaveTypeRequest = Message<"domain.payroll.v1.CreateLeaveTypeRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveType data = 1;
     */
    data?: LeaveType;
};
/**
 * Describes the message domain.payroll.v1.CreateLeaveTypeRequest.
 * Use `create(CreateLeaveTypeRequestSchema)` to create a new message.
 */
export declare const CreateLeaveTypeRequestSchema: GenMessage<CreateLeaveTypeRequest>;
/**
 * @generated from message domain.payroll.v1.CreateLeaveTypeResponse
 */
export type CreateLeaveTypeResponse = Message<"domain.payroll.v1.CreateLeaveTypeResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveType data = 1;
     */
    data: LeaveType[];
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
 * Describes the message domain.payroll.v1.CreateLeaveTypeResponse.
 * Use `create(CreateLeaveTypeResponseSchema)` to create a new message.
 */
export declare const CreateLeaveTypeResponseSchema: GenMessage<CreateLeaveTypeResponse>;
/**
 * @generated from message domain.payroll.v1.ReadLeaveTypeRequest
 */
export type ReadLeaveTypeRequest = Message<"domain.payroll.v1.ReadLeaveTypeRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveType data = 1;
     */
    data?: LeaveType;
};
/**
 * Describes the message domain.payroll.v1.ReadLeaveTypeRequest.
 * Use `create(ReadLeaveTypeRequestSchema)` to create a new message.
 */
export declare const ReadLeaveTypeRequestSchema: GenMessage<ReadLeaveTypeRequest>;
/**
 * @generated from message domain.payroll.v1.ReadLeaveTypeResponse
 */
export type ReadLeaveTypeResponse = Message<"domain.payroll.v1.ReadLeaveTypeResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveType data = 1;
     */
    data: LeaveType[];
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
 * Describes the message domain.payroll.v1.ReadLeaveTypeResponse.
 * Use `create(ReadLeaveTypeResponseSchema)` to create a new message.
 */
export declare const ReadLeaveTypeResponseSchema: GenMessage<ReadLeaveTypeResponse>;
/**
 * @generated from message domain.payroll.v1.UpdateLeaveTypeRequest
 */
export type UpdateLeaveTypeRequest = Message<"domain.payroll.v1.UpdateLeaveTypeRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveType data = 1;
     */
    data?: LeaveType;
};
/**
 * Describes the message domain.payroll.v1.UpdateLeaveTypeRequest.
 * Use `create(UpdateLeaveTypeRequestSchema)` to create a new message.
 */
export declare const UpdateLeaveTypeRequestSchema: GenMessage<UpdateLeaveTypeRequest>;
/**
 * @generated from message domain.payroll.v1.UpdateLeaveTypeResponse
 */
export type UpdateLeaveTypeResponse = Message<"domain.payroll.v1.UpdateLeaveTypeResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveType data = 1;
     */
    data: LeaveType[];
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
 * Describes the message domain.payroll.v1.UpdateLeaveTypeResponse.
 * Use `create(UpdateLeaveTypeResponseSchema)` to create a new message.
 */
export declare const UpdateLeaveTypeResponseSchema: GenMessage<UpdateLeaveTypeResponse>;
/**
 * @generated from message domain.payroll.v1.DeleteLeaveTypeRequest
 */
export type DeleteLeaveTypeRequest = Message<"domain.payroll.v1.DeleteLeaveTypeRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveType data = 1;
     */
    data?: LeaveType;
};
/**
 * Describes the message domain.payroll.v1.DeleteLeaveTypeRequest.
 * Use `create(DeleteLeaveTypeRequestSchema)` to create a new message.
 */
export declare const DeleteLeaveTypeRequestSchema: GenMessage<DeleteLeaveTypeRequest>;
/**
 * @generated from message domain.payroll.v1.DeleteLeaveTypeResponse
 */
export type DeleteLeaveTypeResponse = Message<"domain.payroll.v1.DeleteLeaveTypeResponse"> & {
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
 * Describes the message domain.payroll.v1.DeleteLeaveTypeResponse.
 * Use `create(DeleteLeaveTypeResponseSchema)` to create a new message.
 */
export declare const DeleteLeaveTypeResponseSchema: GenMessage<DeleteLeaveTypeResponse>;
/**
 * @generated from message domain.payroll.v1.ListLeaveTypesRequest
 */
export type ListLeaveTypesRequest = Message<"domain.payroll.v1.ListLeaveTypesRequest"> & {
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
 * Describes the message domain.payroll.v1.ListLeaveTypesRequest.
 * Use `create(ListLeaveTypesRequestSchema)` to create a new message.
 */
export declare const ListLeaveTypesRequestSchema: GenMessage<ListLeaveTypesRequest>;
/**
 * @generated from message domain.payroll.v1.ListLeaveTypesResponse
 */
export type ListLeaveTypesResponse = Message<"domain.payroll.v1.ListLeaveTypesResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveType data = 1;
     */
    data: LeaveType[];
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
 * Describes the message domain.payroll.v1.ListLeaveTypesResponse.
 * Use `create(ListLeaveTypesResponseSchema)` to create a new message.
 */
export declare const ListLeaveTypesResponseSchema: GenMessage<ListLeaveTypesResponse>;
/**
 * @generated from message domain.payroll.v1.GetLeaveTypeListPageDataRequest
 */
export type GetLeaveTypeListPageDataRequest = Message<"domain.payroll.v1.GetLeaveTypeListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetLeaveTypeListPageDataRequest.
 * Use `create(GetLeaveTypeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLeaveTypeListPageDataRequestSchema: GenMessage<GetLeaveTypeListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetLeaveTypeListPageDataResponse
 */
export type GetLeaveTypeListPageDataResponse = Message<"domain.payroll.v1.GetLeaveTypeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveType leave_type_list = 1;
     */
    leaveTypeList: LeaveType[];
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
 * Describes the message domain.payroll.v1.GetLeaveTypeListPageDataResponse.
 * Use `create(GetLeaveTypeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLeaveTypeListPageDataResponseSchema: GenMessage<GetLeaveTypeListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetLeaveTypeItemPageDataRequest
 */
export type GetLeaveTypeItemPageDataRequest = Message<"domain.payroll.v1.GetLeaveTypeItemPageDataRequest"> & {
    /**
     * @generated from field: string leave_type_id = 1;
     */
    leaveTypeId: string;
};
/**
 * Describes the message domain.payroll.v1.GetLeaveTypeItemPageDataRequest.
 * Use `create(GetLeaveTypeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLeaveTypeItemPageDataRequestSchema: GenMessage<GetLeaveTypeItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetLeaveTypeItemPageDataResponse
 */
export type GetLeaveTypeItemPageDataResponse = Message<"domain.payroll.v1.GetLeaveTypeItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.LeaveType leave_type = 1;
     */
    leaveType?: LeaveType;
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
 * Describes the message domain.payroll.v1.GetLeaveTypeItemPageDataResponse.
 * Use `create(GetLeaveTypeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLeaveTypeItemPageDataResponseSchema: GenMessage<GetLeaveTypeItemPageDataResponse>;
/**
 * @generated from service domain.payroll.v1.LeaveTypeDomainService
 */
export declare const LeaveTypeDomainService: GenService<{
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.CreateLeaveType
     */
    createLeaveType: {
        methodKind: "unary";
        input: typeof CreateLeaveTypeRequestSchema;
        output: typeof CreateLeaveTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.ReadLeaveType
     */
    readLeaveType: {
        methodKind: "unary";
        input: typeof ReadLeaveTypeRequestSchema;
        output: typeof ReadLeaveTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.UpdateLeaveType
     */
    updateLeaveType: {
        methodKind: "unary";
        input: typeof UpdateLeaveTypeRequestSchema;
        output: typeof UpdateLeaveTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.DeleteLeaveType
     */
    deleteLeaveType: {
        methodKind: "unary";
        input: typeof DeleteLeaveTypeRequestSchema;
        output: typeof DeleteLeaveTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.ListLeaveTypes
     */
    listLeaveTypes: {
        methodKind: "unary";
        input: typeof ListLeaveTypesRequestSchema;
        output: typeof ListLeaveTypesResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.GetLeaveTypeListPageData
     */
    getLeaveTypeListPageData: {
        methodKind: "unary";
        input: typeof GetLeaveTypeListPageDataRequestSchema;
        output: typeof GetLeaveTypeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveTypeDomainService.GetLeaveTypeItemPageData
     */
    getLeaveTypeItemPageData: {
        methodKind: "unary";
        input: typeof GetLeaveTypeItemPageDataRequestSchema;
        output: typeof GetLeaveTypeItemPageDataResponseSchema;
    };
}>;
