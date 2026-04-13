import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/payroll_remittance/payroll_remittance.proto.
 */
export declare const file_domain_payroll_payroll_remittance_payroll_remittance: GenFile;
/**
 * PayrollRemittance records the obligation to remit government contributions from a payroll run.
 * One remittance record per agency per payroll run.
 *
 * @generated from message domain.payroll.v1.PayrollRemittance
 */
export type PayrollRemittance = Message<"domain.payroll.v1.PayrollRemittance"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent payroll run
     *
     * @generated from field: string payroll_run_id = 2;
     */
    payrollRunId: string;
    /**
     * @generated from field: domain.payroll.v1.RemittanceType remittance_type = 3;
     */
    remittanceType: RemittanceType;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 4;
     */
    amount: bigint;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string due_date = 5;
     */
    dueDate: string;
    /**
     * @generated from field: domain.payroll.v1.RemittanceStatus status = 7;
     */
    status: RemittanceStatus;
    /**
     * @generated from field: optional int64 filed_at = 8;
     */
    filedAt?: bigint;
    /**
     * @generated from field: optional string filed_at_string = 9;
     */
    filedAtString?: string;
    /**
     * @generated from field: optional int64 paid_at = 10;
     */
    paidAt?: bigint;
    /**
     * @generated from field: optional string paid_at_string = 11;
     */
    paidAtString?: string;
    /**
     * Government filing reference (e.g. SBR number for SSS)
     *
     * @generated from field: optional string reference_number = 12;
     */
    referenceNumber?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 13;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 14;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.payroll.v1.PayrollRemittance.
 * Use `create(PayrollRemittanceSchema)` to create a new message.
 */
export declare const PayrollRemittanceSchema: GenMessage<PayrollRemittance>;
/**
 * @generated from message domain.payroll.v1.CreatePayrollRemittanceRequest
 */
export type CreatePayrollRemittanceRequest = Message<"domain.payroll.v1.CreatePayrollRemittanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRemittance data = 1;
     */
    data?: PayrollRemittance;
};
/**
 * Describes the message domain.payroll.v1.CreatePayrollRemittanceRequest.
 * Use `create(CreatePayrollRemittanceRequestSchema)` to create a new message.
 */
export declare const CreatePayrollRemittanceRequestSchema: GenMessage<CreatePayrollRemittanceRequest>;
/**
 * @generated from message domain.payroll.v1.CreatePayrollRemittanceResponse
 */
export type CreatePayrollRemittanceResponse = Message<"domain.payroll.v1.CreatePayrollRemittanceResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRemittance data = 1;
     */
    data: PayrollRemittance[];
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
 * Describes the message domain.payroll.v1.CreatePayrollRemittanceResponse.
 * Use `create(CreatePayrollRemittanceResponseSchema)` to create a new message.
 */
export declare const CreatePayrollRemittanceResponseSchema: GenMessage<CreatePayrollRemittanceResponse>;
/**
 * @generated from message domain.payroll.v1.ReadPayrollRemittanceRequest
 */
export type ReadPayrollRemittanceRequest = Message<"domain.payroll.v1.ReadPayrollRemittanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRemittance data = 1;
     */
    data?: PayrollRemittance;
};
/**
 * Describes the message domain.payroll.v1.ReadPayrollRemittanceRequest.
 * Use `create(ReadPayrollRemittanceRequestSchema)` to create a new message.
 */
export declare const ReadPayrollRemittanceRequestSchema: GenMessage<ReadPayrollRemittanceRequest>;
/**
 * @generated from message domain.payroll.v1.ReadPayrollRemittanceResponse
 */
export type ReadPayrollRemittanceResponse = Message<"domain.payroll.v1.ReadPayrollRemittanceResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRemittance data = 1;
     */
    data: PayrollRemittance[];
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
 * Describes the message domain.payroll.v1.ReadPayrollRemittanceResponse.
 * Use `create(ReadPayrollRemittanceResponseSchema)` to create a new message.
 */
export declare const ReadPayrollRemittanceResponseSchema: GenMessage<ReadPayrollRemittanceResponse>;
/**
 * @generated from message domain.payroll.v1.UpdatePayrollRemittanceRequest
 */
export type UpdatePayrollRemittanceRequest = Message<"domain.payroll.v1.UpdatePayrollRemittanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRemittance data = 1;
     */
    data?: PayrollRemittance;
};
/**
 * Describes the message domain.payroll.v1.UpdatePayrollRemittanceRequest.
 * Use `create(UpdatePayrollRemittanceRequestSchema)` to create a new message.
 */
export declare const UpdatePayrollRemittanceRequestSchema: GenMessage<UpdatePayrollRemittanceRequest>;
/**
 * @generated from message domain.payroll.v1.UpdatePayrollRemittanceResponse
 */
export type UpdatePayrollRemittanceResponse = Message<"domain.payroll.v1.UpdatePayrollRemittanceResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRemittance data = 1;
     */
    data: PayrollRemittance[];
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
 * Describes the message domain.payroll.v1.UpdatePayrollRemittanceResponse.
 * Use `create(UpdatePayrollRemittanceResponseSchema)` to create a new message.
 */
export declare const UpdatePayrollRemittanceResponseSchema: GenMessage<UpdatePayrollRemittanceResponse>;
/**
 * @generated from message domain.payroll.v1.DeletePayrollRemittanceRequest
 */
export type DeletePayrollRemittanceRequest = Message<"domain.payroll.v1.DeletePayrollRemittanceRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.PayrollRemittance data = 1;
     */
    data?: PayrollRemittance;
};
/**
 * Describes the message domain.payroll.v1.DeletePayrollRemittanceRequest.
 * Use `create(DeletePayrollRemittanceRequestSchema)` to create a new message.
 */
export declare const DeletePayrollRemittanceRequestSchema: GenMessage<DeletePayrollRemittanceRequest>;
/**
 * @generated from message domain.payroll.v1.DeletePayrollRemittanceResponse
 */
export type DeletePayrollRemittanceResponse = Message<"domain.payroll.v1.DeletePayrollRemittanceResponse"> & {
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
 * Describes the message domain.payroll.v1.DeletePayrollRemittanceResponse.
 * Use `create(DeletePayrollRemittanceResponseSchema)` to create a new message.
 */
export declare const DeletePayrollRemittanceResponseSchema: GenMessage<DeletePayrollRemittanceResponse>;
/**
 * @generated from message domain.payroll.v1.ListPayrollRemittancesRequest
 */
export type ListPayrollRemittancesRequest = Message<"domain.payroll.v1.ListPayrollRemittancesRequest"> & {
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
 * Describes the message domain.payroll.v1.ListPayrollRemittancesRequest.
 * Use `create(ListPayrollRemittancesRequestSchema)` to create a new message.
 */
export declare const ListPayrollRemittancesRequestSchema: GenMessage<ListPayrollRemittancesRequest>;
/**
 * @generated from message domain.payroll.v1.ListPayrollRemittancesResponse
 */
export type ListPayrollRemittancesResponse = Message<"domain.payroll.v1.ListPayrollRemittancesResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRemittance data = 1;
     */
    data: PayrollRemittance[];
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
 * Describes the message domain.payroll.v1.ListPayrollRemittancesResponse.
 * Use `create(ListPayrollRemittancesResponseSchema)` to create a new message.
 */
export declare const ListPayrollRemittancesResponseSchema: GenMessage<ListPayrollRemittancesResponse>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRemittanceListPageDataRequest
 */
export type GetPayrollRemittanceListPageDataRequest = Message<"domain.payroll.v1.GetPayrollRemittanceListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetPayrollRemittanceListPageDataRequest.
 * Use `create(GetPayrollRemittanceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPayrollRemittanceListPageDataRequestSchema: GenMessage<GetPayrollRemittanceListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRemittanceListPageDataResponse
 */
export type GetPayrollRemittanceListPageDataResponse = Message<"domain.payroll.v1.GetPayrollRemittanceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.PayrollRemittance payroll_remittance_list = 1;
     */
    payrollRemittanceList: PayrollRemittance[];
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
 * Describes the message domain.payroll.v1.GetPayrollRemittanceListPageDataResponse.
 * Use `create(GetPayrollRemittanceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPayrollRemittanceListPageDataResponseSchema: GenMessage<GetPayrollRemittanceListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRemittanceItemPageDataRequest
 */
export type GetPayrollRemittanceItemPageDataRequest = Message<"domain.payroll.v1.GetPayrollRemittanceItemPageDataRequest"> & {
    /**
     * @generated from field: string payroll_remittance_id = 1;
     */
    payrollRemittanceId: string;
};
/**
 * Describes the message domain.payroll.v1.GetPayrollRemittanceItemPageDataRequest.
 * Use `create(GetPayrollRemittanceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPayrollRemittanceItemPageDataRequestSchema: GenMessage<GetPayrollRemittanceItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetPayrollRemittanceItemPageDataResponse
 */
export type GetPayrollRemittanceItemPageDataResponse = Message<"domain.payroll.v1.GetPayrollRemittanceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.PayrollRemittance payroll_remittance = 1;
     */
    payrollRemittance?: PayrollRemittance;
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
 * Describes the message domain.payroll.v1.GetPayrollRemittanceItemPageDataResponse.
 * Use `create(GetPayrollRemittanceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPayrollRemittanceItemPageDataResponseSchema: GenMessage<GetPayrollRemittanceItemPageDataResponse>;
/**
 * RemittanceType identifies which government agency the remittance is for.
 * Philippine mandatory contributions: SSS, PhilHealth, Pag-IBIG, BIR withholding tax.
 *
 * @generated from enum domain.payroll.v1.RemittanceType
 */
export declare enum RemittanceType {
    /**
     * @generated from enum value: REMITTANCE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Social Security System
     *
     * @generated from enum value: REMITTANCE_TYPE_SSS = 1;
     */
    SSS = 1,
    /**
     * Philippine Health Insurance Corporation
     *
     * @generated from enum value: REMITTANCE_TYPE_PHILHEALTH = 2;
     */
    PHILHEALTH = 2,
    /**
     * Home Development Mutual Fund
     *
     * @generated from enum value: REMITTANCE_TYPE_PAGIBIG = 3;
     */
    PAGIBIG = 3,
    /**
     * Bureau of Internal Revenue — income tax withholding
     *
     * @generated from enum value: REMITTANCE_TYPE_BIR_WITHHOLDING = 4;
     */
    BIR_WITHHOLDING = 4
}
/**
 * Describes the enum domain.payroll.v1.RemittanceType.
 */
export declare const RemittanceTypeSchema: GenEnum<RemittanceType>;
/**
 * RemittanceStatus tracks the filing and payment lifecycle.
 *
 * @generated from enum domain.payroll.v1.RemittanceStatus
 */
export declare enum RemittanceStatus {
    /**
     * @generated from enum value: REMITTANCE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Not yet filed
     *
     * @generated from enum value: REMITTANCE_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * Form submitted but payment not yet confirmed
     *
     * @generated from enum value: REMITTANCE_STATUS_FILED = 2;
     */
    FILED = 2,
    /**
     * Payment confirmed
     *
     * @generated from enum value: REMITTANCE_STATUS_PAID = 3;
     */
    PAID = 3
}
/**
 * Describes the enum domain.payroll.v1.RemittanceStatus.
 */
export declare const RemittanceStatusSchema: GenEnum<RemittanceStatus>;
/**
 * @generated from service domain.payroll.v1.PayrollRemittanceDomainService
 */
export declare const PayrollRemittanceDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.CreatePayrollRemittance
     */
    createPayrollRemittance: {
        methodKind: "unary";
        input: typeof CreatePayrollRemittanceRequestSchema;
        output: typeof CreatePayrollRemittanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.ReadPayrollRemittance
     */
    readPayrollRemittance: {
        methodKind: "unary";
        input: typeof ReadPayrollRemittanceRequestSchema;
        output: typeof ReadPayrollRemittanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.UpdatePayrollRemittance
     */
    updatePayrollRemittance: {
        methodKind: "unary";
        input: typeof UpdatePayrollRemittanceRequestSchema;
        output: typeof UpdatePayrollRemittanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.DeletePayrollRemittance
     */
    deletePayrollRemittance: {
        methodKind: "unary";
        input: typeof DeletePayrollRemittanceRequestSchema;
        output: typeof DeletePayrollRemittanceResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.ListPayrollRemittances
     */
    listPayrollRemittances: {
        methodKind: "unary";
        input: typeof ListPayrollRemittancesRequestSchema;
        output: typeof ListPayrollRemittancesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.GetPayrollRemittanceListPageData
     */
    getPayrollRemittanceListPageData: {
        methodKind: "unary";
        input: typeof GetPayrollRemittanceListPageDataRequestSchema;
        output: typeof GetPayrollRemittanceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.PayrollRemittanceDomainService.GetPayrollRemittanceItemPageData
     */
    getPayrollRemittanceItemPageData: {
        methodKind: "unary";
        input: typeof GetPayrollRemittanceItemPageDataRequestSchema;
        output: typeof GetPayrollRemittanceItemPageDataResponseSchema;
    };
}>;
