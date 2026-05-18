import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expense_recognition_run/expense_recognition_run.proto.
 */
export declare const file_domain_expenditure_expense_recognition_run_expense_recognition_run: GenFile;
/**
 * @generated from message domain.expenditure.v1.ExpenseRecognitionRun
 */
export type ExpenseRecognitionRun = Message<"domain.expenditure.v1.ExpenseRecognitionRun"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: optional string supplier_id = 3;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string supplier_subscription_id = 4;
     */
    supplierSubscriptionId?: string;
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunScope scope = 5;
     */
    scope: ExpenseRecognitionRunScope;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string as_of_date = 6;
     */
    asOfDate: string;
    /**
     * @generated from field: int32 selection_count = 7;
     */
    selectionCount: number;
    /**
     * @generated from field: int32 created_count = 8;
     */
    createdCount: number;
    /**
     * @generated from field: int32 skipped_count = 9;
     */
    skippedCount: number;
    /**
     * @generated from field: int32 errored_count = 10;
     */
    erroredCount: number;
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunStatus status = 11;
     */
    status: ExpenseRecognitionRunStatus;
    /**
     * @generated from field: string initiated_by = 12;
     */
    initiatedBy: string;
    /**
     * @generated from field: optional int64 initiated_at = 13;
     */
    initiatedAt?: bigint;
    /**
     * @generated from field: optional int64 completed_at = 14;
     */
    completedAt?: bigint;
    /**
     * @generated from field: optional string notes = 15;
     */
    notes?: string;
    /**
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
 * Describes the message domain.expenditure.v1.ExpenseRecognitionRun.
 * Use `create(ExpenseRecognitionRunSchema)` to create a new message.
 */
export declare const ExpenseRecognitionRunSchema: GenMessage<ExpenseRecognitionRun>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionRunRequest
 */
export type CreateExpenseRecognitionRunRequest = Message<"domain.expenditure.v1.CreateExpenseRecognitionRunRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data?: ExpenseRecognitionRun;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionRunRequest.
 * Use `create(CreateExpenseRecognitionRunRequestSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionRunRequestSchema: GenMessage<CreateExpenseRecognitionRunRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionRunResponse
 */
export type CreateExpenseRecognitionRunResponse = Message<"domain.expenditure.v1.CreateExpenseRecognitionRunResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data: ExpenseRecognitionRun[];
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
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionRunResponse.
 * Use `create(CreateExpenseRecognitionRunResponseSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionRunResponseSchema: GenMessage<CreateExpenseRecognitionRunResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenseRecognitionRunRequest
 */
export type ReadExpenseRecognitionRunRequest = Message<"domain.expenditure.v1.ReadExpenseRecognitionRunRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data?: ExpenseRecognitionRun;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenseRecognitionRunRequest.
 * Use `create(ReadExpenseRecognitionRunRequestSchema)` to create a new message.
 */
export declare const ReadExpenseRecognitionRunRequestSchema: GenMessage<ReadExpenseRecognitionRunRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenseRecognitionRunResponse
 */
export type ReadExpenseRecognitionRunResponse = Message<"domain.expenditure.v1.ReadExpenseRecognitionRunResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data: ExpenseRecognitionRun[];
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
 * Describes the message domain.expenditure.v1.ReadExpenseRecognitionRunResponse.
 * Use `create(ReadExpenseRecognitionRunResponseSchema)` to create a new message.
 */
export declare const ReadExpenseRecognitionRunResponseSchema: GenMessage<ReadExpenseRecognitionRunResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenseRecognitionRunRequest
 */
export type UpdateExpenseRecognitionRunRequest = Message<"domain.expenditure.v1.UpdateExpenseRecognitionRunRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data?: ExpenseRecognitionRun;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenseRecognitionRunRequest.
 * Use `create(UpdateExpenseRecognitionRunRequestSchema)` to create a new message.
 */
export declare const UpdateExpenseRecognitionRunRequestSchema: GenMessage<UpdateExpenseRecognitionRunRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenseRecognitionRunResponse
 */
export type UpdateExpenseRecognitionRunResponse = Message<"domain.expenditure.v1.UpdateExpenseRecognitionRunResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data: ExpenseRecognitionRun[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenseRecognitionRunResponse.
 * Use `create(UpdateExpenseRecognitionRunResponseSchema)` to create a new message.
 */
export declare const UpdateExpenseRecognitionRunResponseSchema: GenMessage<UpdateExpenseRecognitionRunResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenseRecognitionRunRequest
 */
export type DeleteExpenseRecognitionRunRequest = Message<"domain.expenditure.v1.DeleteExpenseRecognitionRunRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data?: ExpenseRecognitionRun;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenseRecognitionRunRequest.
 * Use `create(DeleteExpenseRecognitionRunRequestSchema)` to create a new message.
 */
export declare const DeleteExpenseRecognitionRunRequestSchema: GenMessage<DeleteExpenseRecognitionRunRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenseRecognitionRunResponse
 */
export type DeleteExpenseRecognitionRunResponse = Message<"domain.expenditure.v1.DeleteExpenseRecognitionRunResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenseRecognitionRunResponse.
 * Use `create(DeleteExpenseRecognitionRunResponseSchema)` to create a new message.
 */
export declare const DeleteExpenseRecognitionRunResponseSchema: GenMessage<DeleteExpenseRecognitionRunResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionRunsRequest
 */
export type ListExpenseRecognitionRunsRequest = Message<"domain.expenditure.v1.ListExpenseRecognitionRunsRequest"> & {
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
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionRunsRequest.
 * Use `create(ListExpenseRecognitionRunsRequestSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionRunsRequestSchema: GenMessage<ListExpenseRecognitionRunsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionRunsResponse
 */
export type ListExpenseRecognitionRunsResponse = Message<"domain.expenditure.v1.ListExpenseRecognitionRunsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRun data = 1;
     */
    data: ExpenseRecognitionRun[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
};
/**
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionRunsResponse.
 * Use `create(ListExpenseRecognitionRunsResponseSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionRunsResponseSchema: GenMessage<ListExpenseRecognitionRunsResponse>;
/**
 * @generated from message domain.expenditure.v1.ExpenseRecognitionRunScopeMsg
 */
export type ExpenseRecognitionRunScopeMsg = Message<"domain.expenditure.v1.ExpenseRecognitionRunScopeMsg"> & {
    /**
     * @generated from field: optional string workspace_id = 1;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional string supplier_id = 2;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string supplier_subscription_id = 3;
     */
    supplierSubscriptionId?: string;
    /**
     * YYYY-MM-DD; defaults to today (workspace tz) when empty
     *
     * @generated from field: optional string as_of_date = 4;
     */
    asOfDate?: string;
};
/**
 * Describes the message domain.expenditure.v1.ExpenseRecognitionRunScopeMsg.
 * Use `create(ExpenseRecognitionRunScopeMsgSchema)` to create a new message.
 */
export declare const ExpenseRecognitionRunScopeMsgSchema: GenMessage<ExpenseRecognitionRunScopeMsg>;
/**
 * One candidate row — either a SupplierSubscription cycle or an advance
 * TreasuryDisbursement tranche due for amortization.
 *
 * @generated from message domain.expenditure.v1.ExpenseRecognitionRunCandidate
 */
export type ExpenseRecognitionRunCandidate = Message<"domain.expenditure.v1.ExpenseRecognitionRunCandidate"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunSourceKind source_kind = 1;
     */
    sourceKind: ExpenseRecognitionRunSourceKind;
    /**
     * @generated from field: optional string supplier_subscription_id = 2;
     */
    supplierSubscriptionId?: string;
    /**
     * @generated from field: optional string advance_disbursement_id = 3;
     */
    advanceDisbursementId?: string;
    /**
     * @generated from field: string supplier_id = 4;
     */
    supplierId: string;
    /**
     * @generated from field: string supplier_name = 5;
     */
    supplierName: string;
    /**
     * human-readable: "AWS Cloud Subscription" or "Office Insurance prepay"
     *
     * @generated from field: string source_label = 6;
     */
    sourceLabel: string;
    /**
     * @generated from field: string currency = 7;
     */
    currency: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_start = 8;
     */
    periodStart: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_end = 9;
     */
    periodEnd: string;
    /**
     * @generated from field: string period_label = 10;
     */
    periodLabel: string;
    /**
     * deterministic per-source idempotency anchor
     *
     * @generated from field: string period_marker = 11;
     */
    periodMarker: string;
    /**
     * @generated from field: int64 amount = 12;
     */
    amount: bigint;
    /**
     * @generated from field: bool eligible = 13;
     */
    eligible: boolean;
    /**
     * @generated from field: string blocker_reason = 14;
     */
    blockerReason: string;
    /**
     * Linked-advance suppression: when subscription cycle is suppressed by an
     * overlapping advance Disbursement, eligible=false + blocker_reason set +
     * suppressing_advance_disbursement_id populated for the explainer link.
     *
     * @generated from field: optional string suppressing_advance_disbursement_id = 15;
     */
    suppressingAdvanceDisbursementId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ExpenseRecognitionRunCandidate.
 * Use `create(ExpenseRecognitionRunCandidateSchema)` to create a new message.
 */
export declare const ExpenseRecognitionRunCandidateSchema: GenMessage<ExpenseRecognitionRunCandidate>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRunCandidatesRequest
 */
export type ListExpenseRunCandidatesRequest = Message<"domain.expenditure.v1.ListExpenseRunCandidatesRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunScopeMsg scope = 1;
     */
    scope?: ExpenseRecognitionRunScopeMsg;
    /**
     * @generated from field: optional string cursor = 2;
     */
    cursor?: string;
    /**
     * @generated from field: optional int32 limit = 3;
     */
    limit?: number;
};
/**
 * Describes the message domain.expenditure.v1.ListExpenseRunCandidatesRequest.
 * Use `create(ListExpenseRunCandidatesRequestSchema)` to create a new message.
 */
export declare const ListExpenseRunCandidatesRequestSchema: GenMessage<ListExpenseRunCandidatesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRunCandidatesResponse
 */
export type ListExpenseRunCandidatesResponse = Message<"domain.expenditure.v1.ListExpenseRunCandidatesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRunCandidate data = 1;
     */
    data: ExpenseRecognitionRunCandidate[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional string next_cursor = 4;
     */
    nextCursor?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListExpenseRunCandidatesResponse.
 * Use `create(ListExpenseRunCandidatesResponseSchema)` to create a new message.
 */
export declare const ListExpenseRunCandidatesResponseSchema: GenMessage<ListExpenseRunCandidatesResponse>;
/**
 * @generated from message domain.expenditure.v1.SelectedExpenseRunCandidate
 */
export type SelectedExpenseRunCandidate = Message<"domain.expenditure.v1.SelectedExpenseRunCandidate"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunSourceKind source_kind = 1;
     */
    sourceKind: ExpenseRecognitionRunSourceKind;
    /**
     * @generated from field: optional string supplier_subscription_id = 2;
     */
    supplierSubscriptionId?: string;
    /**
     * @generated from field: optional string advance_disbursement_id = 3;
     */
    advanceDisbursementId?: string;
    /**
     * @generated from field: string period_start = 4;
     */
    periodStart: string;
    /**
     * @generated from field: string period_end = 5;
     */
    periodEnd: string;
    /**
     * @generated from field: string period_marker = 6;
     */
    periodMarker: string;
};
/**
 * Describes the message domain.expenditure.v1.SelectedExpenseRunCandidate.
 * Use `create(SelectedExpenseRunCandidateSchema)` to create a new message.
 */
export declare const SelectedExpenseRunCandidateSchema: GenMessage<SelectedExpenseRunCandidate>;
/**
 * @generated from message domain.expenditure.v1.ExpenseRunSelections
 */
export type ExpenseRunSelections = Message<"domain.expenditure.v1.ExpenseRunSelections"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SelectedExpenseRunCandidate explicit_list = 1;
     */
    explicitList: SelectedExpenseRunCandidate[];
    /**
     * signed server snapshot — deferred per plan v1
     *
     * @generated from field: optional string filter_token = 2;
     */
    filterToken?: string;
};
/**
 * Describes the message domain.expenditure.v1.ExpenseRunSelections.
 * Use `create(ExpenseRunSelectionsSchema)` to create a new message.
 */
export declare const ExpenseRunSelectionsSchema: GenMessage<ExpenseRunSelections>;
/**
 * @generated from message domain.expenditure.v1.GenerateExpenseRunRequest
 */
export type GenerateExpenseRunRequest = Message<"domain.expenditure.v1.GenerateExpenseRunRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunScopeMsg scope = 1;
     */
    scope?: ExpenseRecognitionRunScopeMsg;
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRunSelections selections = 2;
     */
    selections?: ExpenseRunSelections;
};
/**
 * Describes the message domain.expenditure.v1.GenerateExpenseRunRequest.
 * Use `create(GenerateExpenseRunRequestSchema)` to create a new message.
 */
export declare const GenerateExpenseRunRequestSchema: GenMessage<GenerateExpenseRunRequest>;
/**
 * @generated from message domain.expenditure.v1.GenerateExpenseRunResponse
 */
export type GenerateExpenseRunResponse = Message<"domain.expenditure.v1.GenerateExpenseRunResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognitionRun run = 3;
     */
    run?: ExpenseRecognitionRun;
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRunAttempt attempts = 4;
     */
    attempts: ExpenseRecognitionRunAttempt[];
};
/**
 * Describes the message domain.expenditure.v1.GenerateExpenseRunResponse.
 * Use `create(GenerateExpenseRunResponseSchema)` to create a new message.
 */
export declare const GenerateExpenseRunResponseSchema: GenMessage<GenerateExpenseRunResponse>;
/**
 * @generated from message domain.expenditure.v1.ExpenseRecognitionRunAttempt
 */
export type ExpenseRecognitionRunAttempt = Message<"domain.expenditure.v1.ExpenseRecognitionRunAttempt"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string run_id = 2;
     */
    runId: string;
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunSourceKind source_kind = 3;
     */
    sourceKind: ExpenseRecognitionRunSourceKind;
    /**
     * @generated from field: optional string supplier_subscription_id = 4;
     */
    supplierSubscriptionId?: string;
    /**
     * @generated from field: optional string advance_disbursement_id = 5;
     */
    advanceDisbursementId?: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_start = 6;
     */
    periodStart: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_end = 7;
     */
    periodEnd: string;
    /**
     * @generated from field: string period_marker = 8;
     */
    periodMarker: string;
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunAttemptOutcome outcome = 9;
     */
    outcome: ExpenseRecognitionRunAttemptOutcome;
    /**
     * @generated from field: optional string expense_recognition_id = 10;
     */
    expenseRecognitionId?: string;
    /**
     * @generated from field: optional string expenditure_id = 11;
     */
    expenditureId?: string;
    /**
     * @generated from field: optional string error_code = 12;
     */
    errorCode?: string;
    /**
     * @generated from field: optional string error_message = 13;
     */
    errorMessage?: string;
    /**
     * @generated from field: optional int64 attempted_at = 14;
     */
    attemptedAt?: bigint;
    /**
     * @generated from field: bool active = 15;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 18;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 19;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.expenditure.v1.ExpenseRecognitionRunAttempt.
 * Use `create(ExpenseRecognitionRunAttemptSchema)` to create a new message.
 */
export declare const ExpenseRecognitionRunAttemptSchema: GenMessage<ExpenseRecognitionRunAttempt>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionRunAttemptRequest
 */
export type CreateExpenseRecognitionRunAttemptRequest = Message<"domain.expenditure.v1.CreateExpenseRecognitionRunAttemptRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionRunAttempt data = 1;
     */
    data?: ExpenseRecognitionRunAttempt;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionRunAttemptRequest.
 * Use `create(CreateExpenseRecognitionRunAttemptRequestSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionRunAttemptRequestSchema: GenMessage<CreateExpenseRecognitionRunAttemptRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionRunAttemptResponse
 */
export type CreateExpenseRecognitionRunAttemptResponse = Message<"domain.expenditure.v1.CreateExpenseRecognitionRunAttemptResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRunAttempt data = 1;
     */
    data: ExpenseRecognitionRunAttempt[];
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
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionRunAttemptResponse.
 * Use `create(CreateExpenseRecognitionRunAttemptResponseSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionRunAttemptResponseSchema: GenMessage<CreateExpenseRecognitionRunAttemptResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionRunAttemptsRequest
 */
export type ListExpenseRecognitionRunAttemptsRequest = Message<"domain.expenditure.v1.ListExpenseRecognitionRunAttemptsRequest"> & {
    /**
     * @generated from field: string run_id = 1;
     */
    runId: string;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
};
/**
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionRunAttemptsRequest.
 * Use `create(ListExpenseRecognitionRunAttemptsRequestSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionRunAttemptsRequestSchema: GenMessage<ListExpenseRecognitionRunAttemptsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionRunAttemptsResponse
 */
export type ListExpenseRecognitionRunAttemptsResponse = Message<"domain.expenditure.v1.ListExpenseRecognitionRunAttemptsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionRunAttempt data = 1;
     */
    data: ExpenseRecognitionRunAttempt[];
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
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionRunAttemptsResponse.
 * Use `create(ListExpenseRecognitionRunAttemptsResponseSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionRunAttemptsResponseSchema: GenMessage<ListExpenseRecognitionRunAttemptsResponse>;
/**
 * @generated from enum domain.expenditure.v1.ExpenseRecognitionRunScope
 */
export declare enum ExpenseRecognitionRunScope {
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SCOPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Surface A
     *
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SCOPE_SUPPLIER = 1;
     */
    SUPPLIER = 1,
    /**
     * Surface C
     *
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SCOPE_SUBSCRIPTION = 2;
     */
    SUBSCRIPTION = 2,
    /**
     * Surface B (queue)
     *
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SCOPE_WORKSPACE = 3;
     */
    WORKSPACE = 3
}
/**
 * Describes the enum domain.expenditure.v1.ExpenseRecognitionRunScope.
 */
export declare const ExpenseRecognitionRunScopeSchema: GenEnum<ExpenseRecognitionRunScope>;
/**
 * @generated from enum domain.expenditure.v1.ExpenseRecognitionRunStatus
 */
export declare enum ExpenseRecognitionRunStatus {
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_STATUS_COMPLETE = 2;
     */
    COMPLETE = 2,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_STATUS_FAILED = 3;
     */
    FAILED = 3
}
/**
 * Describes the enum domain.expenditure.v1.ExpenseRecognitionRunStatus.
 */
export declare const ExpenseRecognitionRunStatusSchema: GenEnum<ExpenseRecognitionRunStatus>;
/**
 * @generated from enum domain.expenditure.v1.ExpenseRecognitionRunAttemptOutcome
 */
export declare enum ExpenseRecognitionRunAttemptOutcome {
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_ATTEMPT_OUTCOME_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_ATTEMPT_OUTCOME_CREATED = 1;
     */
    CREATED = 1,
    /**
     * period_marker / idempotency collision
     *
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_ATTEMPT_OUTCOME_SKIPPED = 2;
     */
    SKIPPED = 2,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_ATTEMPT_OUTCOME_ERRORED = 3;
     */
    ERRORED = 3
}
/**
 * Describes the enum domain.expenditure.v1.ExpenseRecognitionRunAttemptOutcome.
 */
export declare const ExpenseRecognitionRunAttemptOutcomeSchema: GenEnum<ExpenseRecognitionRunAttemptOutcome>;
/**
 * Discriminates per-attempt origin. Subscription path emits Expenditure +
 * ExpenseRecognition (+ Line); advance-disbursement path emits ExpenseRecognition
 * only (composes Plan B's AmortizeAdvanceDisbursement use case).
 *
 * @generated from enum domain.expenditure.v1.ExpenseRecognitionRunSourceKind
 */
export declare enum ExpenseRecognitionRunSourceKind {
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SOURCE_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SOURCE_KIND_SUBSCRIPTION_CYCLE = 1;
     */
    SUBSCRIPTION_CYCLE = 1,
    /**
     * @generated from enum value: EXPENSE_RECOGNITION_RUN_SOURCE_KIND_ADVANCE_DISBURSEMENT = 2;
     */
    ADVANCE_DISBURSEMENT = 2
}
/**
 * Describes the enum domain.expenditure.v1.ExpenseRecognitionRunSourceKind.
 */
export declare const ExpenseRecognitionRunSourceKindSchema: GenEnum<ExpenseRecognitionRunSourceKind>;
/**
 * @generated from service domain.expenditure.v1.ExpenseRecognitionRunDomainService
 */
export declare const ExpenseRecognitionRunDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.CreateExpenseRecognitionRun
     */
    createExpenseRecognitionRun: {
        methodKind: "unary";
        input: typeof CreateExpenseRecognitionRunRequestSchema;
        output: typeof CreateExpenseRecognitionRunResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.ReadExpenseRecognitionRun
     */
    readExpenseRecognitionRun: {
        methodKind: "unary";
        input: typeof ReadExpenseRecognitionRunRequestSchema;
        output: typeof ReadExpenseRecognitionRunResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.UpdateExpenseRecognitionRun
     */
    updateExpenseRecognitionRun: {
        methodKind: "unary";
        input: typeof UpdateExpenseRecognitionRunRequestSchema;
        output: typeof UpdateExpenseRecognitionRunResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.DeleteExpenseRecognitionRun
     */
    deleteExpenseRecognitionRun: {
        methodKind: "unary";
        input: typeof DeleteExpenseRecognitionRunRequestSchema;
        output: typeof DeleteExpenseRecognitionRunResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.ListExpenseRecognitionRuns
     */
    listExpenseRecognitionRuns: {
        methodKind: "unary";
        input: typeof ListExpenseRecognitionRunsRequestSchema;
        output: typeof ListExpenseRecognitionRunsResponseSchema;
    };
    /**
     * Attempt RPCs — mirror selling-side RevenueRunDomainService.
     *
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.CreateExpenseRecognitionRunAttempt
     */
    createExpenseRecognitionRunAttempt: {
        methodKind: "unary";
        input: typeof CreateExpenseRecognitionRunAttemptRequestSchema;
        output: typeof CreateExpenseRecognitionRunAttemptResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionRunDomainService.ListExpenseRecognitionRunAttempts
     */
    listExpenseRecognitionRunAttempts: {
        methodKind: "unary";
        input: typeof ListExpenseRecognitionRunAttemptsRequestSchema;
        output: typeof ListExpenseRecognitionRunAttemptsResponseSchema;
    };
}>;
