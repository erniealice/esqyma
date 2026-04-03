import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/payroll_run/payroll_run.proto.
 */
export declare const file_domain_payroll_payroll_run_payroll_run: GenFile;
/**
 * PayrollRun is the header record for a payroll processing batch.
 * A single run covers one pay period for all employees.
 * Posting creates a PAYROLL JournalEntry that records gross pay, deductions, and net pay.
 *
 * @generated from message domain.payroll.v1.PayrollRun
 */
export type PayrollRun = Message<"domain.payroll.v1.PayrollRun"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string run_number = 2;
     */
    runNumber: string;
    /**
     * Pay period
     *
     * @generated from field: int64 pay_period_start = 3;
     */
    payPeriodStart: bigint;
    /**
     * @generated from field: optional string pay_period_start_string = 4;
     */
    payPeriodStartString?: string;
    /**
     * @generated from field: int64 pay_period_end = 5;
     */
    payPeriodEnd: bigint;
    /**
     * @generated from field: optional string pay_period_end_string = 6;
     */
    payPeriodEndString?: string;
    /**
     * Aggregated totals across all employee lines
     *
     * @generated from field: double total_gross = 7;
     */
    totalGross: number;
    /**
     * @generated from field: double total_deductions = 8;
     */
    totalDeductions: number;
    /**
     * @generated from field: double total_net = 9;
     */
    totalNet: number;
    /**
     * @generated from field: int32 employee_count = 10;
     */
    employeeCount: number;
    /**
     * @generated from field: domain.payroll.v1.PayrollRunStatus status = 11;
     */
    status: PayrollRunStatus;
    /**
     * Approval and posting audit
     *
     * FK to entity.User
     *
     * @generated from field: optional string approved_by = 12;
     */
    approvedBy?: string;
    /**
     * @generated from field: optional int64 posted_at = 13;
     */
    postedAt?: bigint;
    /**
     * @generated from field: optional string posted_at_string = 14;
     */
    postedAtString?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 15;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 16;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 17;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 18;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.payroll.v1.PayrollRun.
 * Use `create(PayrollRunSchema)` to create a new message.
 */
export declare const PayrollRunSchema: GenMessage<PayrollRun>;
/**
 * @generated from message domain.payroll.v1.CreatePayrollRunRequest
 */
export type CreatePayrollRunRequest = Message<"domain.payroll.v1.CreatePayrollRunRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRun data = 1;
     */
    data?: PayrollRun;
};
/**
 * Describes the message domain.payroll.v1.CreatePayrollRunRequest.
 * Use `create(CreatePayrollRunRequestSchema)` to create a new message.
 */
export declare const CreatePayrollRunRequestSchema: GenMessage<CreatePayrollRunRequest>;
/**
 * @generated from message domain.payroll.v1.CreatePayrollRunResponse
 */
export type CreatePayrollRunResponse = Message<"domain.payroll.v1.CreatePayrollRunResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRun data = 1;
     */
    data: PayrollRun[];
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
 * Describes the message domain.payroll.v1.CreatePayrollRunResponse.
 * Use `create(CreatePayrollRunResponseSchema)` to create a new message.
 */
export declare const CreatePayrollRunResponseSchema: GenMessage<CreatePayrollRunResponse>;
/**
 * @generated from message domain.payroll.v1.ReadPayrollRunRequest
 */
export type ReadPayrollRunRequest = Message<"domain.payroll.v1.ReadPayrollRunRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRun data = 1;
     */
    data?: PayrollRun;
};
/**
 * Describes the message domain.payroll.v1.ReadPayrollRunRequest.
 * Use `create(ReadPayrollRunRequestSchema)` to create a new message.
 */
export declare const ReadPayrollRunRequestSchema: GenMessage<ReadPayrollRunRequest>;
/**
 * @generated from message domain.payroll.v1.ReadPayrollRunResponse
 */
export type ReadPayrollRunResponse = Message<"domain.payroll.v1.ReadPayrollRunResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRun data = 1;
     */
    data: PayrollRun[];
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
 * Describes the message domain.payroll.v1.ReadPayrollRunResponse.
 * Use `create(ReadPayrollRunResponseSchema)` to create a new message.
 */
export declare const ReadPayrollRunResponseSchema: GenMessage<ReadPayrollRunResponse>;
/**
 * @generated from message domain.payroll.v1.UpdatePayrollRunRequest
 */
export type UpdatePayrollRunRequest = Message<"domain.payroll.v1.UpdatePayrollRunRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRun data = 1;
     */
    data?: PayrollRun;
};
/**
 * Describes the message domain.payroll.v1.UpdatePayrollRunRequest.
 * Use `create(UpdatePayrollRunRequestSchema)` to create a new message.
 */
export declare const UpdatePayrollRunRequestSchema: GenMessage<UpdatePayrollRunRequest>;
/**
 * @generated from message domain.payroll.v1.UpdatePayrollRunResponse
 */
export type UpdatePayrollRunResponse = Message<"domain.payroll.v1.UpdatePayrollRunResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRun data = 1;
     */
    data: PayrollRun[];
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
 * Describes the message domain.payroll.v1.UpdatePayrollRunResponse.
 * Use `create(UpdatePayrollRunResponseSchema)` to create a new message.
 */
export declare const UpdatePayrollRunResponseSchema: GenMessage<UpdatePayrollRunResponse>;
/**
 * @generated from message domain.payroll.v1.DeletePayrollRunRequest
 */
export type DeletePayrollRunRequest = Message<"domain.payroll.v1.DeletePayrollRunRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRun data = 1;
     */
    data?: PayrollRun;
};
/**
 * Describes the message domain.payroll.v1.DeletePayrollRunRequest.
 * Use `create(DeletePayrollRunRequestSchema)` to create a new message.
 */
export declare const DeletePayrollRunRequestSchema: GenMessage<DeletePayrollRunRequest>;
/**
 * @generated from message domain.payroll.v1.DeletePayrollRunResponse
 */
export type DeletePayrollRunResponse = Message<"domain.payroll.v1.DeletePayrollRunResponse"> & {
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
 * Describes the message domain.payroll.v1.DeletePayrollRunResponse.
 * Use `create(DeletePayrollRunResponseSchema)` to create a new message.
 */
export declare const DeletePayrollRunResponseSchema: GenMessage<DeletePayrollRunResponse>;
/**
 * @generated from message domain.payroll.v1.ListPayrollRunsRequest
 */
export type ListPayrollRunsRequest = Message<"domain.payroll.v1.ListPayrollRunsRequest"> & {
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
 * Describes the message domain.payroll.v1.ListPayrollRunsRequest.
 * Use `create(ListPayrollRunsRequestSchema)` to create a new message.
 */
export declare const ListPayrollRunsRequestSchema: GenMessage<ListPayrollRunsRequest>;
/**
 * @generated from message domain.payroll.v1.ListPayrollRunsResponse
 */
export type ListPayrollRunsResponse = Message<"domain.payroll.v1.ListPayrollRunsResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRun data = 1;
     */
    data: PayrollRun[];
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
 * Describes the message domain.payroll.v1.ListPayrollRunsResponse.
 * Use `create(ListPayrollRunsResponseSchema)` to create a new message.
 */
export declare const ListPayrollRunsResponseSchema: GenMessage<ListPayrollRunsResponse>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRunListPageDataRequest
 */
export type GetPayrollRunListPageDataRequest = Message<"domain.payroll.v1.GetPayrollRunListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetPayrollRunListPageDataRequest.
 * Use `create(GetPayrollRunListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPayrollRunListPageDataRequestSchema: GenMessage<GetPayrollRunListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRunListPageDataResponse
 */
export type GetPayrollRunListPageDataResponse = Message<"domain.payroll.v1.GetPayrollRunListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRun payroll_run_list = 1;
     */
    payrollRunList: PayrollRun[];
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
 * Describes the message domain.payroll.v1.GetPayrollRunListPageDataResponse.
 * Use `create(GetPayrollRunListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPayrollRunListPageDataResponseSchema: GenMessage<GetPayrollRunListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRunItemPageDataRequest
 */
export type GetPayrollRunItemPageDataRequest = Message<"domain.payroll.v1.GetPayrollRunItemPageDataRequest"> & {
    /**
     * @generated from field: string payroll_run_id = 1;
     */
    payrollRunId: string;
};
/**
 * Describes the message domain.payroll.v1.GetPayrollRunItemPageDataRequest.
 * Use `create(GetPayrollRunItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPayrollRunItemPageDataRequestSchema: GenMessage<GetPayrollRunItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRunItemPageDataResponse
 */
export type GetPayrollRunItemPageDataResponse = Message<"domain.payroll.v1.GetPayrollRunItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.PayrollRun payroll_run = 1;
     */
    payrollRun?: PayrollRun;
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
 * Describes the message domain.payroll.v1.GetPayrollRunItemPageDataResponse.
 * Use `create(GetPayrollRunItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPayrollRunItemPageDataResponseSchema: GenMessage<GetPayrollRunItemPageDataResponse>;
/**
 * PayrollRunStatus tracks the lifecycle of a payroll processing batch.
 *
 * @generated from enum domain.payroll.v1.PayrollRunStatus
 */
export declare enum PayrollRunStatus {
    /**
     * @generated from enum value: PAYROLL_RUN_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * In preparation — payslips not yet finalized
     *
     * @generated from enum value: PAYROLL_RUN_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * Amounts locked — pending approval
     *
     * @generated from enum value: PAYROLL_RUN_STATUS_CALCULATED = 2;
     */
    CALCULATED = 2,
    /**
     * Approved by CFO/Owner — ready for disbursement
     *
     * @generated from enum value: PAYROLL_RUN_STATUS_APPROVED = 3;
     */
    APPROVED = 3,
    /**
     * JournalEntry created; disbursement completed
     *
     * @generated from enum value: PAYROLL_RUN_STATUS_POSTED = 4;
     */
    POSTED = 4
}
/**
 * Describes the enum domain.payroll.v1.PayrollRunStatus.
 */
export declare const PayrollRunStatusSchema: GenEnum<PayrollRunStatus>;
/**
 * @generated from service domain.payroll.v1.PayrollRunDomainService
 */
export declare const PayrollRunDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.CreatePayrollRun
     */
    createPayrollRun: {
        methodKind: "unary";
        input: typeof CreatePayrollRunRequestSchema;
        output: typeof CreatePayrollRunResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.ReadPayrollRun
     */
    readPayrollRun: {
        methodKind: "unary";
        input: typeof ReadPayrollRunRequestSchema;
        output: typeof ReadPayrollRunResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.UpdatePayrollRun
     */
    updatePayrollRun: {
        methodKind: "unary";
        input: typeof UpdatePayrollRunRequestSchema;
        output: typeof UpdatePayrollRunResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.DeletePayrollRun
     */
    deletePayrollRun: {
        methodKind: "unary";
        input: typeof DeletePayrollRunRequestSchema;
        output: typeof DeletePayrollRunResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.ListPayrollRuns
     */
    listPayrollRuns: {
        methodKind: "unary";
        input: typeof ListPayrollRunsRequestSchema;
        output: typeof ListPayrollRunsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.GetPayrollRunListPageData
     */
    getPayrollRunListPageData: {
        methodKind: "unary";
        input: typeof GetPayrollRunListPageDataRequestSchema;
        output: typeof GetPayrollRunListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRunDomainService.GetPayrollRunItemPageData
     */
    getPayrollRunItemPageData: {
        methodKind: "unary";
        input: typeof GetPayrollRunItemPageDataRequestSchema;
        output: typeof GetPayrollRunItemPageDataResponseSchema;
    };
}>;
