import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/leave_request/leave_request.proto.
 */
export declare const file_domain_payroll_leave_request_leave_request: GenFile;
/**
 * LeaveRequest is the per-employee leave request workflow.
 *
 * @generated from message domain.payroll.v1.LeaveRequest
 */
export type LeaveRequest = Message<"domain.payroll.v1.LeaveRequest"> & {
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
     * @generated from field: string leave_type_id = 4;
     */
    leaveTypeId: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: string start_date = 5;
     */
    startDate: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: string end_date = 6;
     */
    endDate: string;
    /**
     * @generated from field: int32 days = 7;
     */
    days: number;
    /**
     * @generated from field: domain.payroll.v1.LeaveRequestStatus status = 8;
     */
    status: LeaveRequestStatus;
    /**
     * @generated from field: optional string approved_by_user_id = 9;
     */
    approvedByUserId?: string;
    /**
     * @generated from field: optional string reason = 10;
     */
    reason?: string;
    /**
     * ISO 8601 datetime
     *
     * @generated from field: optional string approved_on = 11;
     */
    approvedOn?: string;
    /**
     * Audit
     *
     * @generated from field: bool active = 12;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 13;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 14;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 15;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 16;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.payroll.v1.LeaveRequest.
 * Use `create(LeaveRequestSchema)` to create a new message.
 */
export declare const LeaveRequestSchema: GenMessage<LeaveRequest>;
/**
 * @generated from message domain.payroll.v1.CreateLeaveRequestRequest
 */
export type CreateLeaveRequestRequest = Message<"domain.payroll.v1.CreateLeaveRequestRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveRequest data = 1;
     */
    data?: LeaveRequest;
};
/**
 * Describes the message domain.payroll.v1.CreateLeaveRequestRequest.
 * Use `create(CreateLeaveRequestRequestSchema)` to create a new message.
 */
export declare const CreateLeaveRequestRequestSchema: GenMessage<CreateLeaveRequestRequest>;
/**
 * @generated from message domain.payroll.v1.CreateLeaveRequestResponse
 */
export type CreateLeaveRequestResponse = Message<"domain.payroll.v1.CreateLeaveRequestResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveRequest data = 1;
     */
    data: LeaveRequest[];
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
 * Describes the message domain.payroll.v1.CreateLeaveRequestResponse.
 * Use `create(CreateLeaveRequestResponseSchema)` to create a new message.
 */
export declare const CreateLeaveRequestResponseSchema: GenMessage<CreateLeaveRequestResponse>;
/**
 * @generated from message domain.payroll.v1.ReadLeaveRequestRequest
 */
export type ReadLeaveRequestRequest = Message<"domain.payroll.v1.ReadLeaveRequestRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveRequest data = 1;
     */
    data?: LeaveRequest;
};
/**
 * Describes the message domain.payroll.v1.ReadLeaveRequestRequest.
 * Use `create(ReadLeaveRequestRequestSchema)` to create a new message.
 */
export declare const ReadLeaveRequestRequestSchema: GenMessage<ReadLeaveRequestRequest>;
/**
 * @generated from message domain.payroll.v1.ReadLeaveRequestResponse
 */
export type ReadLeaveRequestResponse = Message<"domain.payroll.v1.ReadLeaveRequestResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveRequest data = 1;
     */
    data: LeaveRequest[];
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
 * Describes the message domain.payroll.v1.ReadLeaveRequestResponse.
 * Use `create(ReadLeaveRequestResponseSchema)` to create a new message.
 */
export declare const ReadLeaveRequestResponseSchema: GenMessage<ReadLeaveRequestResponse>;
/**
 * @generated from message domain.payroll.v1.UpdateLeaveRequestRequest
 */
export type UpdateLeaveRequestRequest = Message<"domain.payroll.v1.UpdateLeaveRequestRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveRequest data = 1;
     */
    data?: LeaveRequest;
};
/**
 * Describes the message domain.payroll.v1.UpdateLeaveRequestRequest.
 * Use `create(UpdateLeaveRequestRequestSchema)` to create a new message.
 */
export declare const UpdateLeaveRequestRequestSchema: GenMessage<UpdateLeaveRequestRequest>;
/**
 * @generated from message domain.payroll.v1.UpdateLeaveRequestResponse
 */
export type UpdateLeaveRequestResponse = Message<"domain.payroll.v1.UpdateLeaveRequestResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveRequest data = 1;
     */
    data: LeaveRequest[];
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
 * Describes the message domain.payroll.v1.UpdateLeaveRequestResponse.
 * Use `create(UpdateLeaveRequestResponseSchema)` to create a new message.
 */
export declare const UpdateLeaveRequestResponseSchema: GenMessage<UpdateLeaveRequestResponse>;
/**
 * @generated from message domain.payroll.v1.DeleteLeaveRequestRequest
 */
export type DeleteLeaveRequestRequest = Message<"domain.payroll.v1.DeleteLeaveRequestRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveRequest data = 1;
     */
    data?: LeaveRequest;
};
/**
 * Describes the message domain.payroll.v1.DeleteLeaveRequestRequest.
 * Use `create(DeleteLeaveRequestRequestSchema)` to create a new message.
 */
export declare const DeleteLeaveRequestRequestSchema: GenMessage<DeleteLeaveRequestRequest>;
/**
 * @generated from message domain.payroll.v1.DeleteLeaveRequestResponse
 */
export type DeleteLeaveRequestResponse = Message<"domain.payroll.v1.DeleteLeaveRequestResponse"> & {
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
 * Describes the message domain.payroll.v1.DeleteLeaveRequestResponse.
 * Use `create(DeleteLeaveRequestResponseSchema)` to create a new message.
 */
export declare const DeleteLeaveRequestResponseSchema: GenMessage<DeleteLeaveRequestResponse>;
/**
 * @generated from message domain.payroll.v1.ListLeaveRequestsRequest
 */
export type ListLeaveRequestsRequest = Message<"domain.payroll.v1.ListLeaveRequestsRequest"> & {
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
 * Describes the message domain.payroll.v1.ListLeaveRequestsRequest.
 * Use `create(ListLeaveRequestsRequestSchema)` to create a new message.
 */
export declare const ListLeaveRequestsRequestSchema: GenMessage<ListLeaveRequestsRequest>;
/**
 * @generated from message domain.payroll.v1.ListLeaveRequestsResponse
 */
export type ListLeaveRequestsResponse = Message<"domain.payroll.v1.ListLeaveRequestsResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveRequest data = 1;
     */
    data: LeaveRequest[];
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
 * Describes the message domain.payroll.v1.ListLeaveRequestsResponse.
 * Use `create(ListLeaveRequestsResponseSchema)` to create a new message.
 */
export declare const ListLeaveRequestsResponseSchema: GenMessage<ListLeaveRequestsResponse>;
/**
 * @generated from message domain.payroll.v1.GetLeaveRequestListPageDataRequest
 */
export type GetLeaveRequestListPageDataRequest = Message<"domain.payroll.v1.GetLeaveRequestListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetLeaveRequestListPageDataRequest.
 * Use `create(GetLeaveRequestListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLeaveRequestListPageDataRequestSchema: GenMessage<GetLeaveRequestListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetLeaveRequestListPageDataResponse
 */
export type GetLeaveRequestListPageDataResponse = Message<"domain.payroll.v1.GetLeaveRequestListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveRequest leave_request_list = 1;
     */
    leaveRequestList: LeaveRequest[];
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
 * Describes the message domain.payroll.v1.GetLeaveRequestListPageDataResponse.
 * Use `create(GetLeaveRequestListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLeaveRequestListPageDataResponseSchema: GenMessage<GetLeaveRequestListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetLeaveRequestItemPageDataRequest
 */
export type GetLeaveRequestItemPageDataRequest = Message<"domain.payroll.v1.GetLeaveRequestItemPageDataRequest"> & {
    /**
     * @generated from field: string leave_request_id = 1;
     */
    leaveRequestId: string;
};
/**
 * Describes the message domain.payroll.v1.GetLeaveRequestItemPageDataRequest.
 * Use `create(GetLeaveRequestItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLeaveRequestItemPageDataRequestSchema: GenMessage<GetLeaveRequestItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetLeaveRequestItemPageDataResponse
 */
export type GetLeaveRequestItemPageDataResponse = Message<"domain.payroll.v1.GetLeaveRequestItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.LeaveRequest leave_request = 1;
     */
    leaveRequest?: LeaveRequest;
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
 * Describes the message domain.payroll.v1.GetLeaveRequestItemPageDataResponse.
 * Use `create(GetLeaveRequestItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLeaveRequestItemPageDataResponseSchema: GenMessage<GetLeaveRequestItemPageDataResponse>;
/**
 * LeaveRequestStatus drives the approval state machine.
 *
 * @generated from enum domain.payroll.v1.LeaveRequestStatus
 */
export declare enum LeaveRequestStatus {
    /**
     * @generated from enum value: LEAVE_REQUEST_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: LEAVE_REQUEST_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: LEAVE_REQUEST_STATUS_SUBMITTED = 2;
     */
    SUBMITTED = 2,
    /**
     * @generated from enum value: LEAVE_REQUEST_STATUS_APPROVED = 3;
     */
    APPROVED = 3,
    /**
     * @generated from enum value: LEAVE_REQUEST_STATUS_REJECTED = 4;
     */
    REJECTED = 4,
    /**
     * @generated from enum value: LEAVE_REQUEST_STATUS_CANCELLED = 5;
     */
    CANCELLED = 5
}
/**
 * Describes the enum domain.payroll.v1.LeaveRequestStatus.
 */
export declare const LeaveRequestStatusSchema: GenEnum<LeaveRequestStatus>;
/**
 * @generated from service domain.payroll.v1.LeaveRequestDomainService
 */
export declare const LeaveRequestDomainService: GenService<{
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.CreateLeaveRequest
     */
    createLeaveRequest: {
        methodKind: "unary";
        input: typeof CreateLeaveRequestRequestSchema;
        output: typeof CreateLeaveRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.ReadLeaveRequest
     */
    readLeaveRequest: {
        methodKind: "unary";
        input: typeof ReadLeaveRequestRequestSchema;
        output: typeof ReadLeaveRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.UpdateLeaveRequest
     */
    updateLeaveRequest: {
        methodKind: "unary";
        input: typeof UpdateLeaveRequestRequestSchema;
        output: typeof UpdateLeaveRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.DeleteLeaveRequest
     */
    deleteLeaveRequest: {
        methodKind: "unary";
        input: typeof DeleteLeaveRequestRequestSchema;
        output: typeof DeleteLeaveRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.ListLeaveRequests
     */
    listLeaveRequests: {
        methodKind: "unary";
        input: typeof ListLeaveRequestsRequestSchema;
        output: typeof ListLeaveRequestsResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.GetLeaveRequestListPageData
     */
    getLeaveRequestListPageData: {
        methodKind: "unary";
        input: typeof GetLeaveRequestListPageDataRequestSchema;
        output: typeof GetLeaveRequestListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveRequestDomainService.GetLeaveRequestItemPageData
     */
    getLeaveRequestItemPageData: {
        methodKind: "unary";
        input: typeof GetLeaveRequestItemPageDataRequestSchema;
        output: typeof GetLeaveRequestItemPageDataResponseSchema;
    };
}>;
