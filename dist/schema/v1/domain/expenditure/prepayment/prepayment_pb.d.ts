import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/prepayment/prepayment.proto.
 */
export declare const file_domain_expenditure_prepayment_prepayment: GenFile;
/**
 * Prepayment records a prepaid expense (asset) that is amortized over time.
 * Examples: prepaid rent, prepaid insurance, advance staff training fees.
 * Each period generates a PREPAYMENT_AMORTIZATION JournalEntry via the amortization schedule.
 *
 * @generated from message domain.expenditure.v1.Prepayment
 */
export type Prepayment = Message<"domain.expenditure.v1.Prepayment"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string description = 2;
     */
    description: string;
    /**
     * @generated from field: optional string vendor_name = 3;
     */
    vendorName?: string;
    /**
     * Amounts
     *
     * @generated from field: double total_amount = 4;
     */
    totalAmount: number;
    /**
     * Decreases with each amortization entry
     *
     * @generated from field: double remaining_amount = 5;
     */
    remainingAmount: number;
    /**
     * Amortization schedule
     *
     * @generated from field: int64 start_date = 6;
     */
    startDate: bigint;
    /**
     * @generated from field: optional string start_date_string = 7;
     */
    startDateString?: string;
    /**
     * @generated from field: int64 end_date = 8;
     */
    endDate: bigint;
    /**
     * @generated from field: optional string end_date_string = 9;
     */
    endDateString?: string;
    /**
     * Derived from start/end, stored for convenience
     *
     * @generated from field: int32 amortization_months = 10;
     */
    amortizationMonths: number;
    /**
     * @generated from field: domain.expenditure.v1.PrepaymentStatus status = 11;
     */
    status: PrepaymentStatus;
    /**
     * GL integration
     *
     * Prepaid expense asset account
     *
     * @generated from field: optional string account_id = 12;
     */
    accountId?: string;
    /**
     * Target expense account for amortization
     *
     * @generated from field: optional string expense_account_id = 13;
     */
    expenseAccountId?: string;
    /**
     * Audit fields
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
 * Describes the message domain.expenditure.v1.Prepayment.
 * Use `create(PrepaymentSchema)` to create a new message.
 */
export declare const PrepaymentSchema: GenMessage<Prepayment>;
/**
 * @generated from message domain.expenditure.v1.CreatePrepaymentRequest
 */
export type CreatePrepaymentRequest = Message<"domain.expenditure.v1.CreatePrepaymentRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Prepayment data = 1;
     */
    data?: Prepayment;
};
/**
 * Describes the message domain.expenditure.v1.CreatePrepaymentRequest.
 * Use `create(CreatePrepaymentRequestSchema)` to create a new message.
 */
export declare const CreatePrepaymentRequestSchema: GenMessage<CreatePrepaymentRequest>;
/**
 * @generated from message domain.expenditure.v1.CreatePrepaymentResponse
 */
export type CreatePrepaymentResponse = Message<"domain.expenditure.v1.CreatePrepaymentResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Prepayment data = 1;
     */
    data: Prepayment[];
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
 * Describes the message domain.expenditure.v1.CreatePrepaymentResponse.
 * Use `create(CreatePrepaymentResponseSchema)` to create a new message.
 */
export declare const CreatePrepaymentResponseSchema: GenMessage<CreatePrepaymentResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadPrepaymentRequest
 */
export type ReadPrepaymentRequest = Message<"domain.expenditure.v1.ReadPrepaymentRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Prepayment data = 1;
     */
    data?: Prepayment;
};
/**
 * Describes the message domain.expenditure.v1.ReadPrepaymentRequest.
 * Use `create(ReadPrepaymentRequestSchema)` to create a new message.
 */
export declare const ReadPrepaymentRequestSchema: GenMessage<ReadPrepaymentRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadPrepaymentResponse
 */
export type ReadPrepaymentResponse = Message<"domain.expenditure.v1.ReadPrepaymentResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Prepayment data = 1;
     */
    data: Prepayment[];
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
 * Describes the message domain.expenditure.v1.ReadPrepaymentResponse.
 * Use `create(ReadPrepaymentResponseSchema)` to create a new message.
 */
export declare const ReadPrepaymentResponseSchema: GenMessage<ReadPrepaymentResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdatePrepaymentRequest
 */
export type UpdatePrepaymentRequest = Message<"domain.expenditure.v1.UpdatePrepaymentRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Prepayment data = 1;
     */
    data?: Prepayment;
};
/**
 * Describes the message domain.expenditure.v1.UpdatePrepaymentRequest.
 * Use `create(UpdatePrepaymentRequestSchema)` to create a new message.
 */
export declare const UpdatePrepaymentRequestSchema: GenMessage<UpdatePrepaymentRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdatePrepaymentResponse
 */
export type UpdatePrepaymentResponse = Message<"domain.expenditure.v1.UpdatePrepaymentResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Prepayment data = 1;
     */
    data: Prepayment[];
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
 * Describes the message domain.expenditure.v1.UpdatePrepaymentResponse.
 * Use `create(UpdatePrepaymentResponseSchema)` to create a new message.
 */
export declare const UpdatePrepaymentResponseSchema: GenMessage<UpdatePrepaymentResponse>;
/**
 * @generated from message domain.expenditure.v1.DeletePrepaymentRequest
 */
export type DeletePrepaymentRequest = Message<"domain.expenditure.v1.DeletePrepaymentRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Prepayment data = 1;
     */
    data?: Prepayment;
};
/**
 * Describes the message domain.expenditure.v1.DeletePrepaymentRequest.
 * Use `create(DeletePrepaymentRequestSchema)` to create a new message.
 */
export declare const DeletePrepaymentRequestSchema: GenMessage<DeletePrepaymentRequest>;
/**
 * @generated from message domain.expenditure.v1.DeletePrepaymentResponse
 */
export type DeletePrepaymentResponse = Message<"domain.expenditure.v1.DeletePrepaymentResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeletePrepaymentResponse.
 * Use `create(DeletePrepaymentResponseSchema)` to create a new message.
 */
export declare const DeletePrepaymentResponseSchema: GenMessage<DeletePrepaymentResponse>;
/**
 * @generated from message domain.expenditure.v1.ListPrepaymentsRequest
 */
export type ListPrepaymentsRequest = Message<"domain.expenditure.v1.ListPrepaymentsRequest"> & {
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
 * Describes the message domain.expenditure.v1.ListPrepaymentsRequest.
 * Use `create(ListPrepaymentsRequestSchema)` to create a new message.
 */
export declare const ListPrepaymentsRequestSchema: GenMessage<ListPrepaymentsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListPrepaymentsResponse
 */
export type ListPrepaymentsResponse = Message<"domain.expenditure.v1.ListPrepaymentsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Prepayment data = 1;
     */
    data: Prepayment[];
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
 * Describes the message domain.expenditure.v1.ListPrepaymentsResponse.
 * Use `create(ListPrepaymentsResponseSchema)` to create a new message.
 */
export declare const ListPrepaymentsResponseSchema: GenMessage<ListPrepaymentsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetPrepaymentListPageDataRequest
 */
export type GetPrepaymentListPageDataRequest = Message<"domain.expenditure.v1.GetPrepaymentListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetPrepaymentListPageDataRequest.
 * Use `create(GetPrepaymentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPrepaymentListPageDataRequestSchema: GenMessage<GetPrepaymentListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetPrepaymentListPageDataResponse
 */
export type GetPrepaymentListPageDataResponse = Message<"domain.expenditure.v1.GetPrepaymentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Prepayment prepayment_list = 1;
     */
    prepaymentList: Prepayment[];
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
 * Describes the message domain.expenditure.v1.GetPrepaymentListPageDataResponse.
 * Use `create(GetPrepaymentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPrepaymentListPageDataResponseSchema: GenMessage<GetPrepaymentListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetPrepaymentItemPageDataRequest
 */
export type GetPrepaymentItemPageDataRequest = Message<"domain.expenditure.v1.GetPrepaymentItemPageDataRequest"> & {
    /**
     * @generated from field: string prepayment_id = 1;
     */
    prepaymentId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetPrepaymentItemPageDataRequest.
 * Use `create(GetPrepaymentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPrepaymentItemPageDataRequestSchema: GenMessage<GetPrepaymentItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetPrepaymentItemPageDataResponse
 */
export type GetPrepaymentItemPageDataResponse = Message<"domain.expenditure.v1.GetPrepaymentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.Prepayment prepayment = 1;
     */
    prepayment?: Prepayment;
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
 * Describes the message domain.expenditure.v1.GetPrepaymentItemPageDataResponse.
 * Use `create(GetPrepaymentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPrepaymentItemPageDataResponseSchema: GenMessage<GetPrepaymentItemPageDataResponse>;
/**
 * PrepaymentStatus tracks the amortization lifecycle of a prepaid expense.
 *
 * @generated from enum domain.expenditure.v1.PrepaymentStatus
 */
export declare enum PrepaymentStatus {
    /**
     * @generated from enum value: PREPAYMENT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Amortization in progress
     *
     * @generated from enum value: PREPAYMENT_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * Remaining amount is zero
     *
     * @generated from enum value: PREPAYMENT_STATUS_FULLY_AMORTIZED = 2;
     */
    FULLY_AMORTIZED = 2,
    /**
     * Cancelled before full amortization
     *
     * @generated from enum value: PREPAYMENT_STATUS_CANCELLED = 3;
     */
    CANCELLED = 3
}
/**
 * Describes the enum domain.expenditure.v1.PrepaymentStatus.
 */
export declare const PrepaymentStatusSchema: GenEnum<PrepaymentStatus>;
/**
 * @generated from service domain.expenditure.v1.PrepaymentDomainService
 */
export declare const PrepaymentDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.CreatePrepayment
     */
    createPrepayment: {
        methodKind: "unary";
        input: typeof CreatePrepaymentRequestSchema;
        output: typeof CreatePrepaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.ReadPrepayment
     */
    readPrepayment: {
        methodKind: "unary";
        input: typeof ReadPrepaymentRequestSchema;
        output: typeof ReadPrepaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.UpdatePrepayment
     */
    updatePrepayment: {
        methodKind: "unary";
        input: typeof UpdatePrepaymentRequestSchema;
        output: typeof UpdatePrepaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.DeletePrepayment
     */
    deletePrepayment: {
        methodKind: "unary";
        input: typeof DeletePrepaymentRequestSchema;
        output: typeof DeletePrepaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.ListPrepayments
     */
    listPrepayments: {
        methodKind: "unary";
        input: typeof ListPrepaymentsRequestSchema;
        output: typeof ListPrepaymentsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.GetPrepaymentListPageData
     */
    getPrepaymentListPageData: {
        methodKind: "unary";
        input: typeof GetPrepaymentListPageDataRequestSchema;
        output: typeof GetPrepaymentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PrepaymentDomainService.GetPrepaymentItemPageData
     */
    getPrepaymentItemPageData: {
        methodKind: "unary";
        input: typeof GetPrepaymentItemPageDataRequestSchema;
        output: typeof GetPrepaymentItemPageDataResponseSchema;
    };
}>;
