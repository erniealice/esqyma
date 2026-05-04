import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expense_recognition/expense_recognition.proto.
 */
export declare const file_domain_expenditure_expense_recognition_expense_recognition: GenFile;
/**
 * ExpenseRecognition captures the period in which a cost is recognized,
 * independent of when the supplier bill (Expenditure) actually arrived.
 *
 * Why this is not just Expenditure with an extra status:
 *   - One Expenditure (bill) can fund multiple recognition periods (a
 *     $36k annual prepayment recognized $3k/month over 12 months).
 *   - One recognition period can aggregate multiple Expenditures
 *     (3 utility bills covering the same May period).
 *   - Reversals (a corrected May expense) need a separate row, not an
 *     Expenditure UPDATE — accounting auditability requires immutable
 *     recognition rows.
 *
 * Idempotency (HIGH-2 amendment): every row carries a stable source-tuple
 * `idempotency_key` of the form
 *   "{workspace_id}:{source_type}:{source_id}:{recognition_period}"
 * where source_type ∈ {RECURRENCE, EXPENDITURE, MANUAL, REVERSAL}.
 * A unique DB index on idempotency_key collapses duplicate writes
 * regardless of status. Reversal rows carry source_type=REVERSAL,
 * source_id=original_recognition_id so they get a distinct key.
 *
 * @generated from message domain.expenditure.v1.ExpenseRecognition
 */
export type ExpenseRecognition = Message<"domain.expenditure.v1.ExpenseRecognition"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Audit
     *
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: string internal_id = 8;
     */
    internalId: string;
    /**
     * Identity
     *
     * "AWS Hosting — May 2026"
     *
     * @generated from field: string name = 10;
     */
    name: string;
    /**
     * @generated from field: optional string description = 11;
     */
    description?: string;
    /**
     * What was recognized
     *
     * @generated from field: google.protobuf.Timestamp recognition_date = 20;
     */
    recognitionDate?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp period_start = 21;
     */
    periodStart?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp period_end = 22;
     */
    periodEnd?: Timestamp;
    /**
     * @generated from field: string currency = 23;
     */
    currency: string;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 24;
     */
    totalAmount: bigint;
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionStatus status = 25;
     */
    status: ExpenseRecognitionStatus;
    /**
     * Source links — at most one of {expenditure_id, supplier_contract_id} is
     * populated for a primary recognition. Reversal rows carry
     * reversal_of_recognition_id instead.
     *
     * @generated from field: optional string supplier_contract_id = 30;
     */
    supplierContractId?: string;
    /**
     * @generated from field: optional string expenditure_id = 31;
     */
    expenditureId?: string;
    /**
     * @generated from field: optional string deferred_expense_id = 32;
     */
    deferredExpenseId?: string;
    /**
     * @generated from field: optional string accrued_expense_id = 33;
     */
    accruedExpenseId?: string;
    /**
     * YYYY-MM-DD bucket; informational
     *
     * @generated from field: optional string cycle_date = 34;
     */
    cycleDate?: string;
    /**
     * Stable, status-independent idempotency key. Mandatory.
     * Format: "{workspace_id}:{source_type}:{source_id}:{recognition_period}"
     * Database has a UNIQUE INDEX on this column to enforce single-write.
     *
     * @generated from field: string idempotency_key = 35;
     */
    idempotencyKey: string;
    /**
     * Reversal — set on REVERSED rows that nullify a previously POSTED row.
     *
     * @generated from field: optional string reversal_of_recognition_id = 36;
     */
    reversalOfRecognitionId?: string;
    /**
     * GL
     *
     * @generated from field: optional string expense_account_id = 40;
     */
    expenseAccountId?: string;
    /**
     * @generated from field: optional string accrual_account_id = 41;
     */
    accrualAccountId?: string;
    /**
     * @generated from field: optional string journal_entry_id = 42;
     */
    journalEntryId?: string;
    /**
     * Costing dimensions
     *
     * @generated from field: optional string supplier_id = 50;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string location_id = 51;
     */
    locationId?: string;
    /**
     * @generated from field: optional string expenditure_category_id = 52;
     */
    expenditureCategoryId?: string;
    /**
     * @generated from field: optional string job_phase_id = 53;
     */
    jobPhaseId?: string;
    /**
     * Notes & metadata
     *
     * @generated from field: optional string notes = 90;
     */
    notes?: string;
    /**
     * @generated from field: map<string, string> metadata = 91;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.expenditure.v1.ExpenseRecognition.
 * Use `create(ExpenseRecognitionSchema)` to create a new message.
 */
export declare const ExpenseRecognitionSchema: GenMessage<ExpenseRecognition>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionRequest
 */
export type CreateExpenseRecognitionRequest = Message<"domain.expenditure.v1.CreateExpenseRecognitionRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionRequest.
 * Use `create(CreateExpenseRecognitionRequestSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionRequestSchema: GenMessage<CreateExpenseRecognitionRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionResponse
 */
export type CreateExpenseRecognitionResponse = Message<"domain.expenditure.v1.CreateExpenseRecognitionResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data: ExpenseRecognition[];
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
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionResponse.
 * Use `create(CreateExpenseRecognitionResponseSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionResponseSchema: GenMessage<CreateExpenseRecognitionResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenseRecognitionRequest
 */
export type ReadExpenseRecognitionRequest = Message<"domain.expenditure.v1.ReadExpenseRecognitionRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenseRecognitionRequest.
 * Use `create(ReadExpenseRecognitionRequestSchema)` to create a new message.
 */
export declare const ReadExpenseRecognitionRequestSchema: GenMessage<ReadExpenseRecognitionRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenseRecognitionResponse
 */
export type ReadExpenseRecognitionResponse = Message<"domain.expenditure.v1.ReadExpenseRecognitionResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data: ExpenseRecognition[];
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
 * Describes the message domain.expenditure.v1.ReadExpenseRecognitionResponse.
 * Use `create(ReadExpenseRecognitionResponseSchema)` to create a new message.
 */
export declare const ReadExpenseRecognitionResponseSchema: GenMessage<ReadExpenseRecognitionResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenseRecognitionRequest
 */
export type UpdateExpenseRecognitionRequest = Message<"domain.expenditure.v1.UpdateExpenseRecognitionRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenseRecognitionRequest.
 * Use `create(UpdateExpenseRecognitionRequestSchema)` to create a new message.
 */
export declare const UpdateExpenseRecognitionRequestSchema: GenMessage<UpdateExpenseRecognitionRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenseRecognitionResponse
 */
export type UpdateExpenseRecognitionResponse = Message<"domain.expenditure.v1.UpdateExpenseRecognitionResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data: ExpenseRecognition[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenseRecognitionResponse.
 * Use `create(UpdateExpenseRecognitionResponseSchema)` to create a new message.
 */
export declare const UpdateExpenseRecognitionResponseSchema: GenMessage<UpdateExpenseRecognitionResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenseRecognitionRequest
 */
export type DeleteExpenseRecognitionRequest = Message<"domain.expenditure.v1.DeleteExpenseRecognitionRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenseRecognitionRequest.
 * Use `create(DeleteExpenseRecognitionRequestSchema)` to create a new message.
 */
export declare const DeleteExpenseRecognitionRequestSchema: GenMessage<DeleteExpenseRecognitionRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenseRecognitionResponse
 */
export type DeleteExpenseRecognitionResponse = Message<"domain.expenditure.v1.DeleteExpenseRecognitionResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenseRecognitionResponse.
 * Use `create(DeleteExpenseRecognitionResponseSchema)` to create a new message.
 */
export declare const DeleteExpenseRecognitionResponseSchema: GenMessage<DeleteExpenseRecognitionResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionsRequest
 */
export type ListExpenseRecognitionsRequest = Message<"domain.expenditure.v1.ListExpenseRecognitionsRequest"> & {
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
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognitionStatus status = 5;
     */
    status?: ExpenseRecognitionStatus;
    /**
     * @generated from field: optional string supplier_contract_id = 6;
     */
    supplierContractId?: string;
    /**
     * @generated from field: optional string expenditure_id = 7;
     */
    expenditureId?: string;
    /**
     * @generated from field: optional string workspace_id = 8;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionsRequest.
 * Use `create(ListExpenseRecognitionsRequestSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionsRequestSchema: GenMessage<ListExpenseRecognitionsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionsResponse
 */
export type ListExpenseRecognitionsResponse = Message<"domain.expenditure.v1.ListExpenseRecognitionsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data: ExpenseRecognition[];
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
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionsResponse.
 * Use `create(ListExpenseRecognitionsResponseSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionsResponseSchema: GenMessage<ListExpenseRecognitionsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionListPageDataRequest
 */
export type GetExpenseRecognitionListPageDataRequest = Message<"domain.expenditure.v1.GetExpenseRecognitionListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionListPageDataRequest.
 * Use `create(GetExpenseRecognitionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionListPageDataRequestSchema: GenMessage<GetExpenseRecognitionListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionListPageDataResponse
 */
export type GetExpenseRecognitionListPageDataResponse = Message<"domain.expenditure.v1.GetExpenseRecognitionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognition expense_recognition_list = 1;
     */
    expenseRecognitionList: ExpenseRecognition[];
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
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionListPageDataResponse.
 * Use `create(GetExpenseRecognitionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionListPageDataResponseSchema: GenMessage<GetExpenseRecognitionListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionItemPageDataRequest
 */
export type GetExpenseRecognitionItemPageDataRequest = Message<"domain.expenditure.v1.GetExpenseRecognitionItemPageDataRequest"> & {
    /**
     * @generated from field: string expense_recognition_id = 1;
     */
    expenseRecognitionId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionItemPageDataRequest.
 * Use `create(GetExpenseRecognitionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionItemPageDataRequestSchema: GenMessage<GetExpenseRecognitionItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionItemPageDataResponse
 */
export type GetExpenseRecognitionItemPageDataResponse = Message<"domain.expenditure.v1.GetExpenseRecognitionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognition expense_recognition = 1;
     */
    expenseRecognition?: ExpenseRecognition;
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
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionItemPageDataResponse.
 * Use `create(GetExpenseRecognitionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionItemPageDataResponseSchema: GenMessage<GetExpenseRecognitionItemPageDataResponse>;
/**
 * RecognizeFromExpenditure — POSTED Expenditure → ExpenseRecognition row(s).
 * 1:1 simple case; 1:N for multi-period via DeferredExpense (Prepayment).
 *
 * @generated from message domain.expenditure.v1.RecognizeFromExpenditureRequest
 */
export type RecognizeFromExpenditureRequest = Message<"domain.expenditure.v1.RecognizeFromExpenditureRequest"> & {
    /**
     * @generated from field: string expenditure_id = 1;
     */
    expenditureId: string;
    /**
     * YYYY-MM (or YYYY-MM-DD)
     *
     * @generated from field: optional string recognition_period = 2;
     */
    recognitionPeriod?: string;
    /**
     * overrides default derivation
     *
     * @generated from field: optional string idempotency_key = 3;
     */
    idempotencyKey?: string;
};
/**
 * Describes the message domain.expenditure.v1.RecognizeFromExpenditureRequest.
 * Use `create(RecognizeFromExpenditureRequestSchema)` to create a new message.
 */
export declare const RecognizeFromExpenditureRequestSchema: GenMessage<RecognizeFromExpenditureRequest>;
/**
 * @generated from message domain.expenditure.v1.RecognizeFromExpenditureResponse
 */
export type RecognizeFromExpenditureResponse = Message<"domain.expenditure.v1.RecognizeFromExpenditureResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
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
 * Describes the message domain.expenditure.v1.RecognizeFromExpenditureResponse.
 * Use `create(RecognizeFromExpenditureResponseSchema)` to create a new message.
 */
export declare const RecognizeFromExpenditureResponseSchema: GenMessage<RecognizeFromExpenditureResponse>;
/**
 * RecognizeFromContract — recurrence companion path. Idempotent on
 * (workspace_id, RECURRENCE, supplier_contract_id, cycle_date).
 *
 * @generated from message domain.expenditure.v1.RecognizeFromContractRequest
 */
export type RecognizeFromContractRequest = Message<"domain.expenditure.v1.RecognizeFromContractRequest"> & {
    /**
     * @generated from field: string supplier_contract_id = 1;
     */
    supplierContractId: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string cycle_date = 2;
     */
    cycleDate: string;
    /**
     * centavos; resolved from schedule if omitted
     *
     * @generated from field: optional int64 amount = 3;
     */
    amount?: bigint;
    /**
     * @generated from field: optional string idempotency_key = 4;
     */
    idempotencyKey?: string;
};
/**
 * Describes the message domain.expenditure.v1.RecognizeFromContractRequest.
 * Use `create(RecognizeFromContractRequestSchema)` to create a new message.
 */
export declare const RecognizeFromContractRequestSchema: GenMessage<RecognizeFromContractRequest>;
/**
 * @generated from message domain.expenditure.v1.RecognizeFromContractResponse
 */
export type RecognizeFromContractResponse = Message<"domain.expenditure.v1.RecognizeFromContractResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
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
 * Describes the message domain.expenditure.v1.RecognizeFromContractResponse.
 * Use `create(RecognizeFromContractResponseSchema)` to create a new message.
 */
export declare const RecognizeFromContractResponseSchema: GenMessage<RecognizeFromContractResponse>;
/**
 * Reverse — creates a REVERSED recognition row that nullifies an earlier
 * POSTED row. Use case sets reversal_of_recognition_id and a distinct
 * idempotency_key (source_type=REVERSAL, source_id=original_recognition_id).
 *
 * @generated from message domain.expenditure.v1.ReverseExpenseRecognitionRequest
 */
export type ReverseExpenseRecognitionRequest = Message<"domain.expenditure.v1.ReverseExpenseRecognitionRequest"> & {
    /**
     * @generated from field: string expense_recognition_id = 1;
     */
    expenseRecognitionId: string;
    /**
     * @generated from field: optional string reason = 2;
     */
    reason?: string;
};
/**
 * Describes the message domain.expenditure.v1.ReverseExpenseRecognitionRequest.
 * Use `create(ReverseExpenseRecognitionRequestSchema)` to create a new message.
 */
export declare const ReverseExpenseRecognitionRequestSchema: GenMessage<ReverseExpenseRecognitionRequest>;
/**
 * @generated from message domain.expenditure.v1.ReverseExpenseRecognitionResponse
 */
export type ReverseExpenseRecognitionResponse = Message<"domain.expenditure.v1.ReverseExpenseRecognitionResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognition data = 1;
     */
    data?: ExpenseRecognition;
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
 * Describes the message domain.expenditure.v1.ReverseExpenseRecognitionResponse.
 * Use `create(ReverseExpenseRecognitionResponseSchema)` to create a new message.
 */
export declare const ReverseExpenseRecognitionResponseSchema: GenMessage<ReverseExpenseRecognitionResponse>;
/**
 * GetUnrecognizedExpenditures — for the AP review queue. Returns
 * Expenditure rows with status=POSTED that have no linked
 * ExpenseRecognition (or only DRAFT recognitions).
 *
 * @generated from message domain.expenditure.v1.GetUnrecognizedExpendituresRequest
 */
export type GetUnrecognizedExpendituresRequest = Message<"domain.expenditure.v1.GetUnrecognizedExpendituresRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional string workspace_id = 3;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.GetUnrecognizedExpendituresRequest.
 * Use `create(GetUnrecognizedExpendituresRequestSchema)` to create a new message.
 */
export declare const GetUnrecognizedExpendituresRequestSchema: GenMessage<GetUnrecognizedExpendituresRequest>;
/**
 * @generated from message domain.expenditure.v1.GetUnrecognizedExpendituresResponse
 */
export type GetUnrecognizedExpendituresResponse = Message<"domain.expenditure.v1.GetUnrecognizedExpendituresResponse"> & {
    /**
     * @generated from field: repeated string expenditure_ids = 1;
     */
    expenditureIds: string[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.expenditure.v1.GetUnrecognizedExpendituresResponse.
 * Use `create(GetUnrecognizedExpendituresResponseSchema)` to create a new message.
 */
export declare const GetUnrecognizedExpendituresResponseSchema: GenMessage<GetUnrecognizedExpendituresResponse>;
/**
 * ExpenseRecognitionStatus drives the accrual-basis recognition lifecycle.
 * Mirrors the sales-side Revenue lifecycle (DRAFT → POSTED → REVERSED).
 *
 * @generated from enum domain.expenditure.v1.ExpenseRecognitionStatus
 */
export declare enum ExpenseRecognitionStatus {
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_STATUS_POSTED = 2;
     */
    POSTED = 2,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_STATUS_REVERSED = 3;
     */
    REVERSED = 3
}
/**
 * Describes the enum domain.expenditure.v1.ExpenseRecognitionStatus.
 */
export declare const ExpenseRecognitionStatusSchema: GenEnum<ExpenseRecognitionStatus>;
/**
 * @generated from service domain.expenditure.v1.ExpenseRecognitionDomainService
 */
export declare const ExpenseRecognitionDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.CreateExpenseRecognition
     */
    createExpenseRecognition: {
        methodKind: "unary";
        input: typeof CreateExpenseRecognitionRequestSchema;
        output: typeof CreateExpenseRecognitionResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.ReadExpenseRecognition
     */
    readExpenseRecognition: {
        methodKind: "unary";
        input: typeof ReadExpenseRecognitionRequestSchema;
        output: typeof ReadExpenseRecognitionResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.UpdateExpenseRecognition
     */
    updateExpenseRecognition: {
        methodKind: "unary";
        input: typeof UpdateExpenseRecognitionRequestSchema;
        output: typeof UpdateExpenseRecognitionResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.DeleteExpenseRecognition
     */
    deleteExpenseRecognition: {
        methodKind: "unary";
        input: typeof DeleteExpenseRecognitionRequestSchema;
        output: typeof DeleteExpenseRecognitionResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.ListExpenseRecognitions
     */
    listExpenseRecognitions: {
        methodKind: "unary";
        input: typeof ListExpenseRecognitionsRequestSchema;
        output: typeof ListExpenseRecognitionsResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.GetExpenseRecognitionListPageData
     */
    getExpenseRecognitionListPageData: {
        methodKind: "unary";
        input: typeof GetExpenseRecognitionListPageDataRequestSchema;
        output: typeof GetExpenseRecognitionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.GetExpenseRecognitionItemPageData
     */
    getExpenseRecognitionItemPageData: {
        methodKind: "unary";
        input: typeof GetExpenseRecognitionItemPageDataRequestSchema;
        output: typeof GetExpenseRecognitionItemPageDataResponseSchema;
    };
    /**
     * Workflow actions
     *
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.RecognizeFromExpenditure
     */
    recognizeFromExpenditure: {
        methodKind: "unary";
        input: typeof RecognizeFromExpenditureRequestSchema;
        output: typeof RecognizeFromExpenditureResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.RecognizeFromContract
     */
    recognizeFromContract: {
        methodKind: "unary";
        input: typeof RecognizeFromContractRequestSchema;
        output: typeof RecognizeFromContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.Reverse
     */
    reverse: {
        methodKind: "unary";
        input: typeof ReverseExpenseRecognitionRequestSchema;
        output: typeof ReverseExpenseRecognitionResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionDomainService.GetUnrecognizedExpenditures
     */
    getUnrecognizedExpenditures: {
        methodKind: "unary";
        input: typeof GetUnrecognizedExpendituresRequestSchema;
        output: typeof GetUnrecognizedExpendituresResponseSchema;
    };
}>;
