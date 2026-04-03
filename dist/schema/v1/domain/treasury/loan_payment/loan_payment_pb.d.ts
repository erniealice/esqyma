import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/loan_payment/loan_payment.proto.
 */
export declare const file_domain_treasury_loan_payment_loan_payment: GenFile;
/**
 * LoanPayment records an actual payment made against a Loan.
 * Distinct from LoanScheduleLine (which is the theoretical amortization schedule).
 * Posting a payment creates two JournalEntry records:
 *   1. LOAN_PAYMENT — principal + interest
 *   2. LOAN_FEE_AMORTIZATION — debt issuance cost amortization (PFRS 9)
 *
 * @generated from message domain.treasury.v1.LoanPayment
 */
export type LoanPayment = Message<"domain.treasury.v1.LoanPayment"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent loan
     *
     * @generated from field: string loan_id = 2;
     */
    loanId: string;
    /**
     * @generated from field: string payment_number = 3;
     */
    paymentNumber: string;
    /**
     * @generated from field: int64 payment_date = 4;
     */
    paymentDate: bigint;
    /**
     * @generated from field: optional string payment_date_string = 5;
     */
    paymentDateString?: string;
    /**
     * Payment breakdown
     *
     * @generated from field: double principal_amount = 6;
     */
    principalAmount: number;
    /**
     * @generated from field: double interest_amount = 7;
     */
    interestAmount: number;
    /**
     * Debt issuance cost (PFRS 9)
     *
     * @generated from field: double fee_amount = 8;
     */
    feeAmount: number;
    /**
     * @generated from field: double total_amount = 9;
     */
    totalAmount: number;
    /**
     * Running balance after this payment
     *
     * @generated from field: double remaining_balance = 10;
     */
    remainingBalance: number;
    /**
     * @generated from field: optional string notes = 11;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.treasury.v1.LoanPayment.
 * Use `create(LoanPaymentSchema)` to create a new message.
 */
export declare const LoanPaymentSchema: GenMessage<LoanPayment>;
/**
 * @generated from message domain.treasury.v1.CreateLoanPaymentRequest
 */
export type CreateLoanPaymentRequest = Message<"domain.treasury.v1.CreateLoanPaymentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.LoanPayment data = 1;
     */
    data?: LoanPayment;
};
/**
 * Describes the message domain.treasury.v1.CreateLoanPaymentRequest.
 * Use `create(CreateLoanPaymentRequestSchema)` to create a new message.
 */
export declare const CreateLoanPaymentRequestSchema: GenMessage<CreateLoanPaymentRequest>;
/**
 * @generated from message domain.treasury.v1.CreateLoanPaymentResponse
 */
export type CreateLoanPaymentResponse = Message<"domain.treasury.v1.CreateLoanPaymentResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment data = 1;
     */
    data: LoanPayment[];
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
 * Describes the message domain.treasury.v1.CreateLoanPaymentResponse.
 * Use `create(CreateLoanPaymentResponseSchema)` to create a new message.
 */
export declare const CreateLoanPaymentResponseSchema: GenMessage<CreateLoanPaymentResponse>;
/**
 * @generated from message domain.treasury.v1.ReadLoanPaymentRequest
 */
export type ReadLoanPaymentRequest = Message<"domain.treasury.v1.ReadLoanPaymentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.LoanPayment data = 1;
     */
    data?: LoanPayment;
};
/**
 * Describes the message domain.treasury.v1.ReadLoanPaymentRequest.
 * Use `create(ReadLoanPaymentRequestSchema)` to create a new message.
 */
export declare const ReadLoanPaymentRequestSchema: GenMessage<ReadLoanPaymentRequest>;
/**
 * @generated from message domain.treasury.v1.ReadLoanPaymentResponse
 */
export type ReadLoanPaymentResponse = Message<"domain.treasury.v1.ReadLoanPaymentResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment data = 1;
     */
    data: LoanPayment[];
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
 * Describes the message domain.treasury.v1.ReadLoanPaymentResponse.
 * Use `create(ReadLoanPaymentResponseSchema)` to create a new message.
 */
export declare const ReadLoanPaymentResponseSchema: GenMessage<ReadLoanPaymentResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateLoanPaymentRequest
 */
export type UpdateLoanPaymentRequest = Message<"domain.treasury.v1.UpdateLoanPaymentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.LoanPayment data = 1;
     */
    data?: LoanPayment;
};
/**
 * Describes the message domain.treasury.v1.UpdateLoanPaymentRequest.
 * Use `create(UpdateLoanPaymentRequestSchema)` to create a new message.
 */
export declare const UpdateLoanPaymentRequestSchema: GenMessage<UpdateLoanPaymentRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateLoanPaymentResponse
 */
export type UpdateLoanPaymentResponse = Message<"domain.treasury.v1.UpdateLoanPaymentResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment data = 1;
     */
    data: LoanPayment[];
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
 * Describes the message domain.treasury.v1.UpdateLoanPaymentResponse.
 * Use `create(UpdateLoanPaymentResponseSchema)` to create a new message.
 */
export declare const UpdateLoanPaymentResponseSchema: GenMessage<UpdateLoanPaymentResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteLoanPaymentRequest
 */
export type DeleteLoanPaymentRequest = Message<"domain.treasury.v1.DeleteLoanPaymentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.LoanPayment data = 1;
     */
    data?: LoanPayment;
};
/**
 * Describes the message domain.treasury.v1.DeleteLoanPaymentRequest.
 * Use `create(DeleteLoanPaymentRequestSchema)` to create a new message.
 */
export declare const DeleteLoanPaymentRequestSchema: GenMessage<DeleteLoanPaymentRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteLoanPaymentResponse
 */
export type DeleteLoanPaymentResponse = Message<"domain.treasury.v1.DeleteLoanPaymentResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteLoanPaymentResponse.
 * Use `create(DeleteLoanPaymentResponseSchema)` to create a new message.
 */
export declare const DeleteLoanPaymentResponseSchema: GenMessage<DeleteLoanPaymentResponse>;
/**
 * @generated from message domain.treasury.v1.ListLoanPaymentsRequest
 */
export type ListLoanPaymentsRequest = Message<"domain.treasury.v1.ListLoanPaymentsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListLoanPaymentsRequest.
 * Use `create(ListLoanPaymentsRequestSchema)` to create a new message.
 */
export declare const ListLoanPaymentsRequestSchema: GenMessage<ListLoanPaymentsRequest>;
/**
 * @generated from message domain.treasury.v1.ListLoanPaymentsResponse
 */
export type ListLoanPaymentsResponse = Message<"domain.treasury.v1.ListLoanPaymentsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment data = 1;
     */
    data: LoanPayment[];
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
 * Describes the message domain.treasury.v1.ListLoanPaymentsResponse.
 * Use `create(ListLoanPaymentsResponseSchema)` to create a new message.
 */
export declare const ListLoanPaymentsResponseSchema: GenMessage<ListLoanPaymentsResponse>;
/**
 * @generated from message domain.treasury.v1.GetLoanPaymentListPageDataRequest
 */
export type GetLoanPaymentListPageDataRequest = Message<"domain.treasury.v1.GetLoanPaymentListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetLoanPaymentListPageDataRequest.
 * Use `create(GetLoanPaymentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLoanPaymentListPageDataRequestSchema: GenMessage<GetLoanPaymentListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetLoanPaymentListPageDataResponse
 */
export type GetLoanPaymentListPageDataResponse = Message<"domain.treasury.v1.GetLoanPaymentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.LoanPayment loan_payment_list = 1;
     */
    loanPaymentList: LoanPayment[];
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
 * Describes the message domain.treasury.v1.GetLoanPaymentListPageDataResponse.
 * Use `create(GetLoanPaymentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLoanPaymentListPageDataResponseSchema: GenMessage<GetLoanPaymentListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetLoanPaymentItemPageDataRequest
 */
export type GetLoanPaymentItemPageDataRequest = Message<"domain.treasury.v1.GetLoanPaymentItemPageDataRequest"> & {
    /**
     * @generated from field: string loan_payment_id = 1;
     */
    loanPaymentId: string;
};
/**
 * Describes the message domain.treasury.v1.GetLoanPaymentItemPageDataRequest.
 * Use `create(GetLoanPaymentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLoanPaymentItemPageDataRequestSchema: GenMessage<GetLoanPaymentItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetLoanPaymentItemPageDataResponse
 */
export type GetLoanPaymentItemPageDataResponse = Message<"domain.treasury.v1.GetLoanPaymentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.LoanPayment loan_payment = 1;
     */
    loanPayment?: LoanPayment;
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
 * Describes the message domain.treasury.v1.GetLoanPaymentItemPageDataResponse.
 * Use `create(GetLoanPaymentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLoanPaymentItemPageDataResponseSchema: GenMessage<GetLoanPaymentItemPageDataResponse>;
/**
 * @generated from service domain.treasury.v1.LoanPaymentDomainService
 */
export declare const LoanPaymentDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.CreateLoanPayment
     */
    createLoanPayment: {
        methodKind: "unary";
        input: typeof CreateLoanPaymentRequestSchema;
        output: typeof CreateLoanPaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.ReadLoanPayment
     */
    readLoanPayment: {
        methodKind: "unary";
        input: typeof ReadLoanPaymentRequestSchema;
        output: typeof ReadLoanPaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.UpdateLoanPayment
     */
    updateLoanPayment: {
        methodKind: "unary";
        input: typeof UpdateLoanPaymentRequestSchema;
        output: typeof UpdateLoanPaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.DeleteLoanPayment
     */
    deleteLoanPayment: {
        methodKind: "unary";
        input: typeof DeleteLoanPaymentRequestSchema;
        output: typeof DeleteLoanPaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.ListLoanPayments
     */
    listLoanPayments: {
        methodKind: "unary";
        input: typeof ListLoanPaymentsRequestSchema;
        output: typeof ListLoanPaymentsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.GetLoanPaymentListPageData
     */
    getLoanPaymentListPageData: {
        methodKind: "unary";
        input: typeof GetLoanPaymentListPageDataRequestSchema;
        output: typeof GetLoanPaymentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanPaymentDomainService.GetLoanPaymentItemPageData
     */
    getLoanPaymentItemPageData: {
        methodKind: "unary";
        input: typeof GetLoanPaymentItemPageDataRequestSchema;
        output: typeof GetLoanPaymentItemPageDataResponseSchema;
    };
}>;
