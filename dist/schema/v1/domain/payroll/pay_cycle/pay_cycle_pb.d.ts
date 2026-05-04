import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/pay_cycle/pay_cycle.proto.
 */
export declare const file_domain_payroll_pay_cycle_pay_cycle: GenFile;
/**
 * PayCycle represents one cutoff window within a payroll run. Semi-monthly produces
 * 2 cycles per run; weekly produces 4–5; monthly produces 1.
 *
 * PayCycle is distinct from PayrollRun: a run is the batch container, a cycle is the
 * per-period unit of calculation that anchors rate-table lookup via pay_date.
 *
 * @generated from message domain.payroll.v1.PayCycle
 */
export type PayCycle = Message<"domain.payroll.v1.PayCycle"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: optional string payroll_run_id = 3;
     */
    payrollRunId?: string;
    /**
     * Cycle window
     *
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string cutoff_start = 4;
     */
    cutoffStart: string;
    /**
     * ISO 8601 date
     *
     * @generated from field: string cutoff_end = 5;
     */
    cutoffEnd: string;
    /**
     * ISO 8601 date — anchor for rate-table lookup
     *
     * @generated from field: string pay_date = 6;
     */
    payDate: string;
    /**
     * "first" | "second" | "full"
     *
     * @generated from field: string half_index = 7;
     */
    halfIndex: string;
    /**
     * Lifecycle
     *
     * @generated from field: domain.payroll.v1.PayCycleStatus status = 8;
     */
    status: PayCycleStatus;
    /**
     * ordering within the run
     *
     * @generated from field: int32 sequence_no = 9;
     */
    sequenceNo: number;
    /**
     * Aggregates (filled at calculate time; recomputed on reopen)
     *
     * @generated from field: int64 total_gross = 10;
     */
    totalGross: bigint;
    /**
     * @generated from field: int64 total_deductions = 11;
     */
    totalDeductions: bigint;
    /**
     * @generated from field: int64 total_net = 12;
     */
    totalNet: bigint;
    /**
     * @generated from field: int32 employee_count = 13;
     */
    employeeCount: number;
    /**
     * Audit
     *
     * @generated from field: bool active = 14;
     */
    active: boolean;
    /**
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
 * Describes the message domain.payroll.v1.PayCycle.
 * Use `create(PayCycleSchema)` to create a new message.
 */
export declare const PayCycleSchema: GenMessage<PayCycle>;
/**
 * @generated from message domain.payroll.v1.CreatePayCycleRequest
 */
export type CreatePayCycleRequest = Message<"domain.payroll.v1.CreatePayCycleRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayCycle data = 1;
     */
    data?: PayCycle;
};
/**
 * Describes the message domain.payroll.v1.CreatePayCycleRequest.
 * Use `create(CreatePayCycleRequestSchema)` to create a new message.
 */
export declare const CreatePayCycleRequestSchema: GenMessage<CreatePayCycleRequest>;
/**
 * @generated from message domain.payroll.v1.CreatePayCycleResponse
 */
export type CreatePayCycleResponse = Message<"domain.payroll.v1.CreatePayCycleResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayCycle data = 1;
     */
    data: PayCycle[];
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
 * Describes the message domain.payroll.v1.CreatePayCycleResponse.
 * Use `create(CreatePayCycleResponseSchema)` to create a new message.
 */
export declare const CreatePayCycleResponseSchema: GenMessage<CreatePayCycleResponse>;
/**
 * @generated from message domain.payroll.v1.ReadPayCycleRequest
 */
export type ReadPayCycleRequest = Message<"domain.payroll.v1.ReadPayCycleRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayCycle data = 1;
     */
    data?: PayCycle;
};
/**
 * Describes the message domain.payroll.v1.ReadPayCycleRequest.
 * Use `create(ReadPayCycleRequestSchema)` to create a new message.
 */
export declare const ReadPayCycleRequestSchema: GenMessage<ReadPayCycleRequest>;
/**
 * @generated from message domain.payroll.v1.ReadPayCycleResponse
 */
export type ReadPayCycleResponse = Message<"domain.payroll.v1.ReadPayCycleResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayCycle data = 1;
     */
    data: PayCycle[];
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
 * Describes the message domain.payroll.v1.ReadPayCycleResponse.
 * Use `create(ReadPayCycleResponseSchema)` to create a new message.
 */
export declare const ReadPayCycleResponseSchema: GenMessage<ReadPayCycleResponse>;
/**
 * @generated from message domain.payroll.v1.UpdatePayCycleRequest
 */
export type UpdatePayCycleRequest = Message<"domain.payroll.v1.UpdatePayCycleRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayCycle data = 1;
     */
    data?: PayCycle;
};
/**
 * Describes the message domain.payroll.v1.UpdatePayCycleRequest.
 * Use `create(UpdatePayCycleRequestSchema)` to create a new message.
 */
export declare const UpdatePayCycleRequestSchema: GenMessage<UpdatePayCycleRequest>;
/**
 * @generated from message domain.payroll.v1.UpdatePayCycleResponse
 */
export type UpdatePayCycleResponse = Message<"domain.payroll.v1.UpdatePayCycleResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayCycle data = 1;
     */
    data: PayCycle[];
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
 * Describes the message domain.payroll.v1.UpdatePayCycleResponse.
 * Use `create(UpdatePayCycleResponseSchema)` to create a new message.
 */
export declare const UpdatePayCycleResponseSchema: GenMessage<UpdatePayCycleResponse>;
/**
 * @generated from message domain.payroll.v1.DeletePayCycleRequest
 */
export type DeletePayCycleRequest = Message<"domain.payroll.v1.DeletePayCycleRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayCycle data = 1;
     */
    data?: PayCycle;
};
/**
 * Describes the message domain.payroll.v1.DeletePayCycleRequest.
 * Use `create(DeletePayCycleRequestSchema)` to create a new message.
 */
export declare const DeletePayCycleRequestSchema: GenMessage<DeletePayCycleRequest>;
/**
 * @generated from message domain.payroll.v1.DeletePayCycleResponse
 */
export type DeletePayCycleResponse = Message<"domain.payroll.v1.DeletePayCycleResponse"> & {
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
 * Describes the message domain.payroll.v1.DeletePayCycleResponse.
 * Use `create(DeletePayCycleResponseSchema)` to create a new message.
 */
export declare const DeletePayCycleResponseSchema: GenMessage<DeletePayCycleResponse>;
/**
 * @generated from message domain.payroll.v1.ListPayCyclesRequest
 */
export type ListPayCyclesRequest = Message<"domain.payroll.v1.ListPayCyclesRequest"> & {
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
 * Describes the message domain.payroll.v1.ListPayCyclesRequest.
 * Use `create(ListPayCyclesRequestSchema)` to create a new message.
 */
export declare const ListPayCyclesRequestSchema: GenMessage<ListPayCyclesRequest>;
/**
 * @generated from message domain.payroll.v1.ListPayCyclesResponse
 */
export type ListPayCyclesResponse = Message<"domain.payroll.v1.ListPayCyclesResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayCycle data = 1;
     */
    data: PayCycle[];
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
 * Describes the message domain.payroll.v1.ListPayCyclesResponse.
 * Use `create(ListPayCyclesResponseSchema)` to create a new message.
 */
export declare const ListPayCyclesResponseSchema: GenMessage<ListPayCyclesResponse>;
/**
 * @generated from message domain.payroll.v1.GetPayCycleListPageDataRequest
 */
export type GetPayCycleListPageDataRequest = Message<"domain.payroll.v1.GetPayCycleListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetPayCycleListPageDataRequest.
 * Use `create(GetPayCycleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPayCycleListPageDataRequestSchema: GenMessage<GetPayCycleListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetPayCycleListPageDataResponse
 */
export type GetPayCycleListPageDataResponse = Message<"domain.payroll.v1.GetPayCycleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayCycle pay_cycle_list = 1;
     */
    payCycleList: PayCycle[];
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
 * Describes the message domain.payroll.v1.GetPayCycleListPageDataResponse.
 * Use `create(GetPayCycleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPayCycleListPageDataResponseSchema: GenMessage<GetPayCycleListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetPayCycleItemPageDataRequest
 */
export type GetPayCycleItemPageDataRequest = Message<"domain.payroll.v1.GetPayCycleItemPageDataRequest"> & {
    /**
     * @generated from field: string pay_cycle_id = 1;
     */
    payCycleId: string;
};
/**
 * Describes the message domain.payroll.v1.GetPayCycleItemPageDataRequest.
 * Use `create(GetPayCycleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPayCycleItemPageDataRequestSchema: GenMessage<GetPayCycleItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetPayCycleItemPageDataResponse
 */
export type GetPayCycleItemPageDataResponse = Message<"domain.payroll.v1.GetPayCycleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.PayCycle pay_cycle = 1;
     */
    payCycle?: PayCycle;
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
 * Describes the message domain.payroll.v1.GetPayCycleItemPageDataResponse.
 * Use `create(GetPayCycleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPayCycleItemPageDataResponseSchema: GenMessage<GetPayCycleItemPageDataResponse>;
/**
 * PayCycleStatus is the lifecycle of one cycle of a payroll run.
 *
 * @generated from enum domain.payroll.v1.PayCycleStatus
 */
export declare enum PayCycleStatus {
    /**
     * @generated from enum value: PAY_CYCLE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * not yet calculated
     *
     * @generated from enum value: PAY_CYCLE_STATUS_OPEN = 1;
     */
    OPEN = 1,
    /**
     * calculator in flight
     *
     * @generated from enum value: PAY_CYCLE_STATUS_CALCULATING = 2;
     */
    CALCULATING = 2,
    /**
     * amounts locked, pending approval
     *
     * @generated from enum value: PAY_CYCLE_STATUS_CALCULATED = 3;
     */
    CALCULATED = 3,
    /**
     * approved, ready to post
     *
     * @generated from enum value: PAY_CYCLE_STATUS_APPROVED = 4;
     */
    APPROVED = 4,
    /**
     * disbursement + journal written; immutable
     *
     * @generated from enum value: PAY_CYCLE_STATUS_POSTED = 5;
     */
    POSTED = 5,
    /**
     * admin reversed; recalculation pending
     *
     * @generated from enum value: PAY_CYCLE_STATUS_REOPENED = 6;
     */
    REOPENED = 6
}
/**
 * Describes the enum domain.payroll.v1.PayCycleStatus.
 */
export declare const PayCycleStatusSchema: GenEnum<PayCycleStatus>;
/**
 * @generated from service domain.payroll.v1.PayCycleDomainService
 */
export declare const PayCycleDomainService: GenService<{
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.CreatePayCycle
     */
    createPayCycle: {
        methodKind: "unary";
        input: typeof CreatePayCycleRequestSchema;
        output: typeof CreatePayCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.ReadPayCycle
     */
    readPayCycle: {
        methodKind: "unary";
        input: typeof ReadPayCycleRequestSchema;
        output: typeof ReadPayCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.UpdatePayCycle
     */
    updatePayCycle: {
        methodKind: "unary";
        input: typeof UpdatePayCycleRequestSchema;
        output: typeof UpdatePayCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.DeletePayCycle
     */
    deletePayCycle: {
        methodKind: "unary";
        input: typeof DeletePayCycleRequestSchema;
        output: typeof DeletePayCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.ListPayCycles
     */
    listPayCycles: {
        methodKind: "unary";
        input: typeof ListPayCyclesRequestSchema;
        output: typeof ListPayCyclesResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.GetPayCycleListPageData
     */
    getPayCycleListPageData: {
        methodKind: "unary";
        input: typeof GetPayCycleListPageDataRequestSchema;
        output: typeof GetPayCycleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayCycleDomainService.GetPayCycleItemPageData
     */
    getPayCycleItemPageData: {
        methodKind: "unary";
        input: typeof GetPayCycleItemPageDataRequestSchema;
        output: typeof GetPayCycleItemPageDataResponseSchema;
    };
}>;
