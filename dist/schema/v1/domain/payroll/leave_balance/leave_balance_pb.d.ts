import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/leave_balance/leave_balance.proto.
 */
export declare const file_domain_payroll_leave_balance_leave_balance: GenFile;
/**
 * LeaveBalance is the per-employee, per-leave-type, per-year accrual ledger.
 * Queried independently from LeaveRequest workflow.
 *
 * @generated from message domain.payroll.v1.LeaveBalance
 */
export type LeaveBalance = Message<"domain.payroll.v1.LeaveBalance"> & {
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
     * @generated from field: int32 year = 5;
     */
    year: number;
    /**
     * @generated from field: int32 accrued_days = 6;
     */
    accruedDays: number;
    /**
     * @generated from field: int32 used_days = 7;
     */
    usedDays: number;
    /**
     * @generated from field: int32 carryover_days = 8;
     */
    carryoverDays: number;
    /**
     * ISO 8601 date
     *
     * @generated from field: optional string last_accrued_on = 9;
     */
    lastAccruedOn?: string;
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
 * Describes the message domain.payroll.v1.LeaveBalance.
 * Use `create(LeaveBalanceSchema)` to create a new message.
 */
export declare const LeaveBalanceSchema: GenMessage<LeaveBalance>;
/**
 * @generated from message domain.payroll.v1.CreateLeaveBalanceRequest
 */
export type CreateLeaveBalanceRequest = Message<"domain.payroll.v1.CreateLeaveBalanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveBalance data = 1;
     */
    data?: LeaveBalance;
};
/**
 * Describes the message domain.payroll.v1.CreateLeaveBalanceRequest.
 * Use `create(CreateLeaveBalanceRequestSchema)` to create a new message.
 */
export declare const CreateLeaveBalanceRequestSchema: GenMessage<CreateLeaveBalanceRequest>;
/**
 * @generated from message domain.payroll.v1.CreateLeaveBalanceResponse
 */
export type CreateLeaveBalanceResponse = Message<"domain.payroll.v1.CreateLeaveBalanceResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveBalance data = 1;
     */
    data: LeaveBalance[];
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
 * Describes the message domain.payroll.v1.CreateLeaveBalanceResponse.
 * Use `create(CreateLeaveBalanceResponseSchema)` to create a new message.
 */
export declare const CreateLeaveBalanceResponseSchema: GenMessage<CreateLeaveBalanceResponse>;
/**
 * @generated from message domain.payroll.v1.ReadLeaveBalanceRequest
 */
export type ReadLeaveBalanceRequest = Message<"domain.payroll.v1.ReadLeaveBalanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveBalance data = 1;
     */
    data?: LeaveBalance;
};
/**
 * Describes the message domain.payroll.v1.ReadLeaveBalanceRequest.
 * Use `create(ReadLeaveBalanceRequestSchema)` to create a new message.
 */
export declare const ReadLeaveBalanceRequestSchema: GenMessage<ReadLeaveBalanceRequest>;
/**
 * @generated from message domain.payroll.v1.ReadLeaveBalanceResponse
 */
export type ReadLeaveBalanceResponse = Message<"domain.payroll.v1.ReadLeaveBalanceResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveBalance data = 1;
     */
    data: LeaveBalance[];
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
 * Describes the message domain.payroll.v1.ReadLeaveBalanceResponse.
 * Use `create(ReadLeaveBalanceResponseSchema)` to create a new message.
 */
export declare const ReadLeaveBalanceResponseSchema: GenMessage<ReadLeaveBalanceResponse>;
/**
 * @generated from message domain.payroll.v1.UpdateLeaveBalanceRequest
 */
export type UpdateLeaveBalanceRequest = Message<"domain.payroll.v1.UpdateLeaveBalanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveBalance data = 1;
     */
    data?: LeaveBalance;
};
/**
 * Describes the message domain.payroll.v1.UpdateLeaveBalanceRequest.
 * Use `create(UpdateLeaveBalanceRequestSchema)` to create a new message.
 */
export declare const UpdateLeaveBalanceRequestSchema: GenMessage<UpdateLeaveBalanceRequest>;
/**
 * @generated from message domain.payroll.v1.UpdateLeaveBalanceResponse
 */
export type UpdateLeaveBalanceResponse = Message<"domain.payroll.v1.UpdateLeaveBalanceResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveBalance data = 1;
     */
    data: LeaveBalance[];
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
 * Describes the message domain.payroll.v1.UpdateLeaveBalanceResponse.
 * Use `create(UpdateLeaveBalanceResponseSchema)` to create a new message.
 */
export declare const UpdateLeaveBalanceResponseSchema: GenMessage<UpdateLeaveBalanceResponse>;
/**
 * @generated from message domain.payroll.v1.DeleteLeaveBalanceRequest
 */
export type DeleteLeaveBalanceRequest = Message<"domain.payroll.v1.DeleteLeaveBalanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.LeaveBalance data = 1;
     */
    data?: LeaveBalance;
};
/**
 * Describes the message domain.payroll.v1.DeleteLeaveBalanceRequest.
 * Use `create(DeleteLeaveBalanceRequestSchema)` to create a new message.
 */
export declare const DeleteLeaveBalanceRequestSchema: GenMessage<DeleteLeaveBalanceRequest>;
/**
 * @generated from message domain.payroll.v1.DeleteLeaveBalanceResponse
 */
export type DeleteLeaveBalanceResponse = Message<"domain.payroll.v1.DeleteLeaveBalanceResponse"> & {
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
 * Describes the message domain.payroll.v1.DeleteLeaveBalanceResponse.
 * Use `create(DeleteLeaveBalanceResponseSchema)` to create a new message.
 */
export declare const DeleteLeaveBalanceResponseSchema: GenMessage<DeleteLeaveBalanceResponse>;
/**
 * @generated from message domain.payroll.v1.ListLeaveBalancesRequest
 */
export type ListLeaveBalancesRequest = Message<"domain.payroll.v1.ListLeaveBalancesRequest"> & {
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
 * Describes the message domain.payroll.v1.ListLeaveBalancesRequest.
 * Use `create(ListLeaveBalancesRequestSchema)` to create a new message.
 */
export declare const ListLeaveBalancesRequestSchema: GenMessage<ListLeaveBalancesRequest>;
/**
 * @generated from message domain.payroll.v1.ListLeaveBalancesResponse
 */
export type ListLeaveBalancesResponse = Message<"domain.payroll.v1.ListLeaveBalancesResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveBalance data = 1;
     */
    data: LeaveBalance[];
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
 * Describes the message domain.payroll.v1.ListLeaveBalancesResponse.
 * Use `create(ListLeaveBalancesResponseSchema)` to create a new message.
 */
export declare const ListLeaveBalancesResponseSchema: GenMessage<ListLeaveBalancesResponse>;
/**
 * @generated from message domain.payroll.v1.GetLeaveBalanceListPageDataRequest
 */
export type GetLeaveBalanceListPageDataRequest = Message<"domain.payroll.v1.GetLeaveBalanceListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetLeaveBalanceListPageDataRequest.
 * Use `create(GetLeaveBalanceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLeaveBalanceListPageDataRequestSchema: GenMessage<GetLeaveBalanceListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetLeaveBalanceListPageDataResponse
 */
export type GetLeaveBalanceListPageDataResponse = Message<"domain.payroll.v1.GetLeaveBalanceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.LeaveBalance leave_balance_list = 1;
     */
    leaveBalanceList: LeaveBalance[];
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
 * Describes the message domain.payroll.v1.GetLeaveBalanceListPageDataResponse.
 * Use `create(GetLeaveBalanceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLeaveBalanceListPageDataResponseSchema: GenMessage<GetLeaveBalanceListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetLeaveBalanceItemPageDataRequest
 */
export type GetLeaveBalanceItemPageDataRequest = Message<"domain.payroll.v1.GetLeaveBalanceItemPageDataRequest"> & {
    /**
     * @generated from field: string leave_balance_id = 1;
     */
    leaveBalanceId: string;
};
/**
 * Describes the message domain.payroll.v1.GetLeaveBalanceItemPageDataRequest.
 * Use `create(GetLeaveBalanceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLeaveBalanceItemPageDataRequestSchema: GenMessage<GetLeaveBalanceItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetLeaveBalanceItemPageDataResponse
 */
export type GetLeaveBalanceItemPageDataResponse = Message<"domain.payroll.v1.GetLeaveBalanceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.LeaveBalance leave_balance = 1;
     */
    leaveBalance?: LeaveBalance;
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
 * Describes the message domain.payroll.v1.GetLeaveBalanceItemPageDataResponse.
 * Use `create(GetLeaveBalanceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLeaveBalanceItemPageDataResponseSchema: GenMessage<GetLeaveBalanceItemPageDataResponse>;
/**
 * @generated from service domain.payroll.v1.LeaveBalanceDomainService
 */
export declare const LeaveBalanceDomainService: GenService<{
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.CreateLeaveBalance
     */
    createLeaveBalance: {
        methodKind: "unary";
        input: typeof CreateLeaveBalanceRequestSchema;
        output: typeof CreateLeaveBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.ReadLeaveBalance
     */
    readLeaveBalance: {
        methodKind: "unary";
        input: typeof ReadLeaveBalanceRequestSchema;
        output: typeof ReadLeaveBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.UpdateLeaveBalance
     */
    updateLeaveBalance: {
        methodKind: "unary";
        input: typeof UpdateLeaveBalanceRequestSchema;
        output: typeof UpdateLeaveBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.DeleteLeaveBalance
     */
    deleteLeaveBalance: {
        methodKind: "unary";
        input: typeof DeleteLeaveBalanceRequestSchema;
        output: typeof DeleteLeaveBalanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.ListLeaveBalances
     */
    listLeaveBalances: {
        methodKind: "unary";
        input: typeof ListLeaveBalancesRequestSchema;
        output: typeof ListLeaveBalancesResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.GetLeaveBalanceListPageData
     */
    getLeaveBalanceListPageData: {
        methodKind: "unary";
        input: typeof GetLeaveBalanceListPageDataRequestSchema;
        output: typeof GetLeaveBalanceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.LeaveBalanceDomainService.GetLeaveBalanceItemPageData
     */
    getLeaveBalanceItemPageData: {
        methodKind: "unary";
        input: typeof GetLeaveBalanceItemPageDataRequestSchema;
        output: typeof GetLeaveBalanceItemPageDataResponseSchema;
    };
}>;
