import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/loan/loan.proto.
 */
export declare const file_domain_treasury_loan_loan: GenFile;
/**
 * Loan is the header record for a financing arrangement.
 * The amortization schedule lives in LoanScheduleLine (child entity).
 * Actual payments are in LoanPayment (child entity).
 *
 * @generated from message domain.treasury.v1.Loan
 */
export type Loan = Message<"domain.treasury.v1.Loan"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string loan_number = 2;
     */
    loanNumber: string;
    /**
     * @generated from field: optional string description = 3;
     */
    description?: string;
    /**
     * @generated from field: domain.treasury.v1.LoanType loan_type = 4;
     */
    loanType: LoanType;
    /**
     * Counter-party name (bank, individual, etc.)
     *
     * @generated from field: string lender_name = 5;
     */
    lenderName: string;
    /**
     * Loan terms
     *
     * @generated from field: double principal_amount = 6;
     */
    principalAmount: number;
    /**
     * Annual rate as a percentage (e.g. 12.5 = 12.5%)
     *
     * @generated from field: double interest_rate = 7;
     */
    interestRate: number;
    /**
     * @generated from field: int32 term_months = 8;
     */
    termMonths: number;
    /**
     * Dates
     *
     * @generated from field: int64 start_date = 9;
     */
    startDate: bigint;
    /**
     * @generated from field: optional string start_date_string = 10;
     */
    startDateString?: string;
    /**
     * @generated from field: int64 maturity_date = 11;
     */
    maturityDate: bigint;
    /**
     * @generated from field: optional string maturity_date_string = 12;
     */
    maturityDateString?: string;
    /**
     * Status and running balance
     *
     * @generated from field: domain.treasury.v1.LoanStatus status = 13;
     */
    status: LoanStatus;
    /**
     * Updated on each payment
     *
     * @generated from field: double remaining_balance = 14;
     */
    remainingBalance: number;
    /**
     * GL integration — FK to the Chart of Accounts
     *
     * @generated from field: optional string account_id = 15;
     */
    accountId?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 16;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 17;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 18;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 19;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 20;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.treasury.v1.Loan.
 * Use `create(LoanSchema)` to create a new message.
 */
export declare const LoanSchema: GenMessage<Loan>;
/**
 * @generated from message domain.treasury.v1.CreateLoanRequest
 */
export type CreateLoanRequest = Message<"domain.treasury.v1.CreateLoanRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Loan data = 1;
     */
    data?: Loan;
};
/**
 * Describes the message domain.treasury.v1.CreateLoanRequest.
 * Use `create(CreateLoanRequestSchema)` to create a new message.
 */
export declare const CreateLoanRequestSchema: GenMessage<CreateLoanRequest>;
/**
 * @generated from message domain.treasury.v1.CreateLoanResponse
 */
export type CreateLoanResponse = Message<"domain.treasury.v1.CreateLoanResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Loan data = 1;
     */
    data: Loan[];
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
 * Describes the message domain.treasury.v1.CreateLoanResponse.
 * Use `create(CreateLoanResponseSchema)` to create a new message.
 */
export declare const CreateLoanResponseSchema: GenMessage<CreateLoanResponse>;
/**
 * @generated from message domain.treasury.v1.ReadLoanRequest
 */
export type ReadLoanRequest = Message<"domain.treasury.v1.ReadLoanRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Loan data = 1;
     */
    data?: Loan;
};
/**
 * Describes the message domain.treasury.v1.ReadLoanRequest.
 * Use `create(ReadLoanRequestSchema)` to create a new message.
 */
export declare const ReadLoanRequestSchema: GenMessage<ReadLoanRequest>;
/**
 * @generated from message domain.treasury.v1.ReadLoanResponse
 */
export type ReadLoanResponse = Message<"domain.treasury.v1.ReadLoanResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Loan data = 1;
     */
    data: Loan[];
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
 * Describes the message domain.treasury.v1.ReadLoanResponse.
 * Use `create(ReadLoanResponseSchema)` to create a new message.
 */
export declare const ReadLoanResponseSchema: GenMessage<ReadLoanResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateLoanRequest
 */
export type UpdateLoanRequest = Message<"domain.treasury.v1.UpdateLoanRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Loan data = 1;
     */
    data?: Loan;
};
/**
 * Describes the message domain.treasury.v1.UpdateLoanRequest.
 * Use `create(UpdateLoanRequestSchema)` to create a new message.
 */
export declare const UpdateLoanRequestSchema: GenMessage<UpdateLoanRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateLoanResponse
 */
export type UpdateLoanResponse = Message<"domain.treasury.v1.UpdateLoanResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Loan data = 1;
     */
    data: Loan[];
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
 * Describes the message domain.treasury.v1.UpdateLoanResponse.
 * Use `create(UpdateLoanResponseSchema)` to create a new message.
 */
export declare const UpdateLoanResponseSchema: GenMessage<UpdateLoanResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteLoanRequest
 */
export type DeleteLoanRequest = Message<"domain.treasury.v1.DeleteLoanRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Loan data = 1;
     */
    data?: Loan;
};
/**
 * Describes the message domain.treasury.v1.DeleteLoanRequest.
 * Use `create(DeleteLoanRequestSchema)` to create a new message.
 */
export declare const DeleteLoanRequestSchema: GenMessage<DeleteLoanRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteLoanResponse
 */
export type DeleteLoanResponse = Message<"domain.treasury.v1.DeleteLoanResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteLoanResponse.
 * Use `create(DeleteLoanResponseSchema)` to create a new message.
 */
export declare const DeleteLoanResponseSchema: GenMessage<DeleteLoanResponse>;
/**
 * @generated from message domain.treasury.v1.ListLoansRequest
 */
export type ListLoansRequest = Message<"domain.treasury.v1.ListLoansRequest"> & {
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
 * Describes the message domain.treasury.v1.ListLoansRequest.
 * Use `create(ListLoansRequestSchema)` to create a new message.
 */
export declare const ListLoansRequestSchema: GenMessage<ListLoansRequest>;
/**
 * @generated from message domain.treasury.v1.ListLoansResponse
 */
export type ListLoansResponse = Message<"domain.treasury.v1.ListLoansResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Loan data = 1;
     */
    data: Loan[];
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
 * Describes the message domain.treasury.v1.ListLoansResponse.
 * Use `create(ListLoansResponseSchema)` to create a new message.
 */
export declare const ListLoansResponseSchema: GenMessage<ListLoansResponse>;
/**
 * @generated from message domain.treasury.v1.GetLoanListPageDataRequest
 */
export type GetLoanListPageDataRequest = Message<"domain.treasury.v1.GetLoanListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetLoanListPageDataRequest.
 * Use `create(GetLoanListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLoanListPageDataRequestSchema: GenMessage<GetLoanListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetLoanListPageDataResponse
 */
export type GetLoanListPageDataResponse = Message<"domain.treasury.v1.GetLoanListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Loan loan_list = 1;
     */
    loanList: Loan[];
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
 * Describes the message domain.treasury.v1.GetLoanListPageDataResponse.
 * Use `create(GetLoanListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLoanListPageDataResponseSchema: GenMessage<GetLoanListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetLoanItemPageDataRequest
 */
export type GetLoanItemPageDataRequest = Message<"domain.treasury.v1.GetLoanItemPageDataRequest"> & {
    /**
     * @generated from field: string loan_id = 1;
     */
    loanId: string;
};
/**
 * Describes the message domain.treasury.v1.GetLoanItemPageDataRequest.
 * Use `create(GetLoanItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLoanItemPageDataRequestSchema: GenMessage<GetLoanItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetLoanItemPageDataResponse
 */
export type GetLoanItemPageDataResponse = Message<"domain.treasury.v1.GetLoanItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.Loan loan = 1;
     */
    loan?: Loan;
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
 * Describes the message domain.treasury.v1.GetLoanItemPageDataResponse.
 * Use `create(GetLoanItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLoanItemPageDataResponseSchema: GenMessage<GetLoanItemPageDataResponse>;
/**
 * LoanType distinguishes whether the business is the borrower or the lender.
 *
 * @generated from enum domain.treasury.v1.LoanType
 */
export declare enum LoanType {
    /**
     * @generated from enum value: LOAN_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Business borrowed money (liability — e.g. bank loan)
     *
     * @generated from enum value: LOAN_TYPE_PAYABLE = 1;
     */
    PAYABLE = 1,
    /**
     * Business lent money (asset — e.g. employee advance)
     *
     * @generated from enum value: LOAN_TYPE_RECEIVABLE = 2;
     */
    RECEIVABLE = 2
}
/**
 * Describes the enum domain.treasury.v1.LoanType.
 */
export declare const LoanTypeSchema: GenEnum<LoanType>;
/**
 * LoanStatus represents the lifecycle state of the loan.
 *
 * @generated from enum domain.treasury.v1.LoanStatus
 */
export declare enum LoanStatus {
    /**
     * @generated from enum value: LOAN_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: LOAN_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: LOAN_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: LOAN_STATUS_COMPLETED = 3;
     */
    COMPLETED = 3,
    /**
     * @generated from enum value: LOAN_STATUS_DEFAULTED = 4;
     */
    DEFAULTED = 4
}
/**
 * Describes the enum domain.treasury.v1.LoanStatus.
 */
export declare const LoanStatusSchema: GenEnum<LoanStatus>;
/**
 * @generated from service domain.treasury.v1.LoanDomainService
 */
export declare const LoanDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.treasury.v1.LoanDomainService.CreateLoan
     */
    createLoan: {
        methodKind: "unary";
        input: typeof CreateLoanRequestSchema;
        output: typeof CreateLoanResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanDomainService.ReadLoan
     */
    readLoan: {
        methodKind: "unary";
        input: typeof ReadLoanRequestSchema;
        output: typeof ReadLoanResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanDomainService.UpdateLoan
     */
    updateLoan: {
        methodKind: "unary";
        input: typeof UpdateLoanRequestSchema;
        output: typeof UpdateLoanResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanDomainService.DeleteLoan
     */
    deleteLoan: {
        methodKind: "unary";
        input: typeof DeleteLoanRequestSchema;
        output: typeof DeleteLoanResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanDomainService.ListLoans
     */
    listLoans: {
        methodKind: "unary";
        input: typeof ListLoansRequestSchema;
        output: typeof ListLoansResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.treasury.v1.LoanDomainService.GetLoanListPageData
     */
    getLoanListPageData: {
        methodKind: "unary";
        input: typeof GetLoanListPageDataRequestSchema;
        output: typeof GetLoanListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.LoanDomainService.GetLoanItemPageData
     */
    getLoanItemPageData: {
        methodKind: "unary";
        input: typeof GetLoanItemPageDataRequestSchema;
        output: typeof GetLoanItemPageDataResponseSchema;
    };
}>;
