import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue_run/revenue_run.proto.
 */
export declare const file_domain_revenue_revenue_run_revenue_run: GenFile;
/**
 * @generated from message domain.revenue.v1.RevenueRun
 */
export type RevenueRun = Message<"domain.revenue.v1.RevenueRun"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: optional string client_id = 3;
     */
    clientId?: string;
    /**
     * @generated from field: optional string subscription_id = 4;
     */
    subscriptionId?: string;
    /**
     * @generated from field: domain.revenue.v1.RevenueRunScopeKind scope_kind = 5;
     */
    scopeKind: RevenueRunScopeKind;
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
     * @generated from field: domain.revenue.v1.RevenueRunStatus status = 11;
     */
    status: RevenueRunStatus;
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
 * Describes the message domain.revenue.v1.RevenueRun.
 * Use `create(RevenueRunSchema)` to create a new message.
 */
export declare const RevenueRunSchema: GenMessage<RevenueRun>;
/**
 * @generated from message domain.revenue.v1.RevenueRunAttempt
 */
export type RevenueRunAttempt = Message<"domain.revenue.v1.RevenueRunAttempt"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string run_id = 2;
     */
    runId: string;
    /**
     * @generated from field: string subscription_id = 3;
     */
    subscriptionId: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_start = 4;
     */
    periodStart: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_end = 5;
     */
    periodEnd: string;
    /**
     * @generated from field: string period_marker = 6;
     */
    periodMarker: string;
    /**
     * @generated from field: domain.revenue.v1.RevenueRunAttemptOutcome outcome = 7;
     */
    outcome: RevenueRunAttemptOutcome;
    /**
     * @generated from field: optional string revenue_id = 8;
     */
    revenueId?: string;
    /**
     * @generated from field: optional string error_code = 9;
     */
    errorCode?: string;
    /**
     * @generated from field: optional string error_message = 10;
     */
    errorMessage?: string;
    /**
     * @generated from field: optional int64 attempted_at = 11;
     */
    attemptedAt?: bigint;
    /**
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
    /**
     * source_kind discriminates SUBSCRIPTION_CYCLE vs ADVANCE_COLLECTION origin.
     * UNSPECIFIED is treated as SUBSCRIPTION_CYCLE so pre-Plan-B rows still
     * satisfy schema invariants. Plan B Phase 5.
     *
     * @generated from field: domain.revenue.v1.RevenueRunSourceKind source_kind = 17;
     */
    sourceKind: RevenueRunSourceKind;
    /**
     * advance_collection_id is set when source_kind == ADVANCE_COLLECTION.
     *
     * @generated from field: optional string advance_collection_id = 18;
     */
    advanceCollectionId?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueRunAttempt.
 * Use `create(RevenueRunAttemptSchema)` to create a new message.
 */
export declare const RevenueRunAttemptSchema: GenMessage<RevenueRunAttempt>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueRunRequest
 */
export type CreateRevenueRunRequest = Message<"domain.revenue.v1.CreateRevenueRunRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRun data = 1;
     */
    data?: RevenueRun;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueRunRequest.
 * Use `create(CreateRevenueRunRequestSchema)` to create a new message.
 */
export declare const CreateRevenueRunRequestSchema: GenMessage<CreateRevenueRunRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueRunResponse
 */
export type CreateRevenueRunResponse = Message<"domain.revenue.v1.CreateRevenueRunResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRun data = 1;
     */
    data: RevenueRun[];
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
 * Describes the message domain.revenue.v1.CreateRevenueRunResponse.
 * Use `create(CreateRevenueRunResponseSchema)` to create a new message.
 */
export declare const CreateRevenueRunResponseSchema: GenMessage<CreateRevenueRunResponse>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueRunRequest
 */
export type ReadRevenueRunRequest = Message<"domain.revenue.v1.ReadRevenueRunRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRun data = 1;
     */
    data?: RevenueRun;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenueRunRequest.
 * Use `create(ReadRevenueRunRequestSchema)` to create a new message.
 */
export declare const ReadRevenueRunRequestSchema: GenMessage<ReadRevenueRunRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueRunResponse
 */
export type ReadRevenueRunResponse = Message<"domain.revenue.v1.ReadRevenueRunResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRun data = 1;
     */
    data: RevenueRun[];
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
 * Describes the message domain.revenue.v1.ReadRevenueRunResponse.
 * Use `create(ReadRevenueRunResponseSchema)` to create a new message.
 */
export declare const ReadRevenueRunResponseSchema: GenMessage<ReadRevenueRunResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueRunRequest
 */
export type UpdateRevenueRunRequest = Message<"domain.revenue.v1.UpdateRevenueRunRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRun data = 1;
     */
    data?: RevenueRun;
};
/**
 * Describes the message domain.revenue.v1.UpdateRevenueRunRequest.
 * Use `create(UpdateRevenueRunRequestSchema)` to create a new message.
 */
export declare const UpdateRevenueRunRequestSchema: GenMessage<UpdateRevenueRunRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueRunResponse
 */
export type UpdateRevenueRunResponse = Message<"domain.revenue.v1.UpdateRevenueRunResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRun data = 1;
     */
    data: RevenueRun[];
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
 * Describes the message domain.revenue.v1.UpdateRevenueRunResponse.
 * Use `create(UpdateRevenueRunResponseSchema)` to create a new message.
 */
export declare const UpdateRevenueRunResponseSchema: GenMessage<UpdateRevenueRunResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueRunRequest
 */
export type DeleteRevenueRunRequest = Message<"domain.revenue.v1.DeleteRevenueRunRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRun data = 1;
     */
    data?: RevenueRun;
};
/**
 * Describes the message domain.revenue.v1.DeleteRevenueRunRequest.
 * Use `create(DeleteRevenueRunRequestSchema)` to create a new message.
 */
export declare const DeleteRevenueRunRequestSchema: GenMessage<DeleteRevenueRunRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueRunResponse
 */
export type DeleteRevenueRunResponse = Message<"domain.revenue.v1.DeleteRevenueRunResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteRevenueRunResponse.
 * Use `create(DeleteRevenueRunResponseSchema)` to create a new message.
 */
export declare const DeleteRevenueRunResponseSchema: GenMessage<DeleteRevenueRunResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenueRunsRequest
 */
export type ListRevenueRunsRequest = Message<"domain.revenue.v1.ListRevenueRunsRequest"> & {
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
 * Describes the message domain.revenue.v1.ListRevenueRunsRequest.
 * Use `create(ListRevenueRunsRequestSchema)` to create a new message.
 */
export declare const ListRevenueRunsRequestSchema: GenMessage<ListRevenueRunsRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueRunsResponse
 */
export type ListRevenueRunsResponse = Message<"domain.revenue.v1.ListRevenueRunsResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRun data = 1;
     */
    data: RevenueRun[];
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
 * Describes the message domain.revenue.v1.ListRevenueRunsResponse.
 * Use `create(ListRevenueRunsResponseSchema)` to create a new message.
 */
export declare const ListRevenueRunsResponseSchema: GenMessage<ListRevenueRunsResponse>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueRunAttemptRequest
 */
export type CreateRevenueRunAttemptRequest = Message<"domain.revenue.v1.CreateRevenueRunAttemptRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRunAttempt data = 1;
     */
    data?: RevenueRunAttempt;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueRunAttemptRequest.
 * Use `create(CreateRevenueRunAttemptRequestSchema)` to create a new message.
 */
export declare const CreateRevenueRunAttemptRequestSchema: GenMessage<CreateRevenueRunAttemptRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueRunAttemptResponse
 */
export type CreateRevenueRunAttemptResponse = Message<"domain.revenue.v1.CreateRevenueRunAttemptResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRunAttempt data = 1;
     */
    data: RevenueRunAttempt[];
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
 * Describes the message domain.revenue.v1.CreateRevenueRunAttemptResponse.
 * Use `create(CreateRevenueRunAttemptResponseSchema)` to create a new message.
 */
export declare const CreateRevenueRunAttemptResponseSchema: GenMessage<CreateRevenueRunAttemptResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenueRunAttemptsRequest
 */
export type ListRevenueRunAttemptsRequest = Message<"domain.revenue.v1.ListRevenueRunAttemptsRequest"> & {
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
 * Describes the message domain.revenue.v1.ListRevenueRunAttemptsRequest.
 * Use `create(ListRevenueRunAttemptsRequestSchema)` to create a new message.
 */
export declare const ListRevenueRunAttemptsRequestSchema: GenMessage<ListRevenueRunAttemptsRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueRunAttemptsResponse
 */
export type ListRevenueRunAttemptsResponse = Message<"domain.revenue.v1.ListRevenueRunAttemptsResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRunAttempt data = 1;
     */
    data: RevenueRunAttempt[];
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
 * Describes the message domain.revenue.v1.ListRevenueRunAttemptsResponse.
 * Use `create(ListRevenueRunAttemptsResponseSchema)` to create a new message.
 */
export declare const ListRevenueRunAttemptsResponseSchema: GenMessage<ListRevenueRunAttemptsResponse>;
/**
 * RevenueRunScope describes the filter for a candidate list or generate call.
 * Empty fields mean "no filter for that dimension". Shared by
 * ListRevenueRunCandidates and GenerateRevenueRun.
 *
 * @generated from message domain.revenue.v1.RevenueRunScope
 */
export type RevenueRunScope = Message<"domain.revenue.v1.RevenueRunScope"> & {
    /**
     * @generated from field: optional string workspace_id = 1;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional string client_id = 2;
     */
    clientId?: string;
    /**
     * @generated from field: optional string subscription_id = 3;
     */
    subscriptionId?: string;
    /**
     * YYYY-MM-DD; defaults to today (in workspace tz) when empty
     *
     * @generated from field: optional string as_of_date = 4;
     */
    asOfDate?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueRunScope.
 * Use `create(RevenueRunScopeSchema)` to create a new message.
 */
export declare const RevenueRunScopeSchema: GenMessage<RevenueRunScope>;
/**
 * RevenueRunCandidate represents one billed period for one subscription that
 * has not yet been invoiced (or that has a blocker preventing invoicing).
 *
 * As of Plan B Phase 5 (2026-05-17), a candidate may also represent the
 * next-due tranche of an advance Collection (source_kind=ADVANCE_COLLECTION).
 * When that's the case, subscription_id/subscription_name are empty and
 * advance_collection_id is populated instead.
 *
 * @generated from message domain.revenue.v1.RevenueRunCandidate
 */
export type RevenueRunCandidate = Message<"domain.revenue.v1.RevenueRunCandidate"> & {
    /**
     * @generated from field: string subscription_id = 1;
     */
    subscriptionId: string;
    /**
     * @generated from field: string subscription_name = 2;
     */
    subscriptionName: string;
    /**
     * @generated from field: string client_id = 3;
     */
    clientId: string;
    /**
     * @generated from field: string client_name = 4;
     */
    clientName: string;
    /**
     * @generated from field: string plan_name = 5;
     */
    planName: string;
    /**
     * @generated from field: string billing_cycle_label = 6;
     */
    billingCycleLabel: string;
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
     * @generated from field: string period_marker = 11;
     */
    periodMarker: string;
    /**
     * @generated from field: int64 amount = 12;
     */
    amount: bigint;
    /**
     * @generated from field: int32 line_item_count = 13;
     */
    lineItemCount: number;
    /**
     * @generated from field: bool eligible = 14;
     */
    eligible: boolean;
    /**
     * @generated from field: string blocker_reason = 15;
     */
    blockerReason: string;
    /**
     * source_kind discriminates the origin of this candidate row.
     * UNSPECIFIED is treated as SUBSCRIPTION_CYCLE by view code.
     *
     * @generated from field: domain.revenue.v1.RevenueRunSourceKind source_kind = 16;
     */
    sourceKind: RevenueRunSourceKind;
    /**
     * advance_collection_id is set when source_kind == ADVANCE_COLLECTION.
     *
     * @generated from field: optional string advance_collection_id = 17;
     */
    advanceCollectionId?: string;
    /**
     * suppressing_advance_collection_id is set when source_kind ==
     * SUBSCRIPTION_CYCLE AND a TIME_BASED advance Collection overlaps this
     * period for the same client. The cycle candidate is rendered as a greyed
     * info-only row pointing at the advance.
     *
     * @generated from field: optional string suppressing_advance_collection_id = 18;
     */
    suppressingAdvanceCollectionId?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueRunCandidate.
 * Use `create(RevenueRunCandidateSchema)` to create a new message.
 */
export declare const RevenueRunCandidateSchema: GenMessage<RevenueRunCandidate>;
/**
 * @generated from message domain.revenue.v1.ListRevenueRunCandidatesRequest
 */
export type ListRevenueRunCandidatesRequest = Message<"domain.revenue.v1.ListRevenueRunCandidatesRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRunScope scope = 1;
     */
    scope?: RevenueRunScope;
    /**
     * @generated from field: optional string cursor = 2;
     */
    cursor?: string;
    /**
     * @generated from field: optional int32 limit = 3;
     */
    limit?: number;
    /**
     * include_advance_collections opts-in to advance-Collection candidate
     * emission (Plan B Phase 5a). Default false → existing surfaces continue to
     * see subscription-only candidates. Surface commits flip this to true.
     *
     * @generated from field: optional bool include_advance_collections = 4;
     */
    includeAdvanceCollections?: boolean;
};
/**
 * Describes the message domain.revenue.v1.ListRevenueRunCandidatesRequest.
 * Use `create(ListRevenueRunCandidatesRequestSchema)` to create a new message.
 */
export declare const ListRevenueRunCandidatesRequestSchema: GenMessage<ListRevenueRunCandidatesRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueRunCandidatesResponse
 */
export type ListRevenueRunCandidatesResponse = Message<"domain.revenue.v1.ListRevenueRunCandidatesResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRunCandidate data = 1;
     */
    data: RevenueRunCandidate[];
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
 * Describes the message domain.revenue.v1.ListRevenueRunCandidatesResponse.
 * Use `create(ListRevenueRunCandidatesResponseSchema)` to create a new message.
 */
export declare const ListRevenueRunCandidatesResponseSchema: GenMessage<ListRevenueRunCandidatesResponse>;
/**
 * SelectedRevenueRunCandidate is one operator-confirmed selection to invoice.
 *
 * As of Plan B Phase 5, the selection may target an advance Collection
 * (source_kind=ADVANCE_COLLECTION). When that's the case, subscription_id is
 * empty and advance_collection_id is populated. Default UNSPECIFIED is
 * treated as SUBSCRIPTION_CYCLE by GenerateRevenueRun for back-compat.
 *
 * @generated from message domain.revenue.v1.SelectedRevenueRunCandidate
 */
export type SelectedRevenueRunCandidate = Message<"domain.revenue.v1.SelectedRevenueRunCandidate"> & {
    /**
     * @generated from field: string subscription_id = 1;
     */
    subscriptionId: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_start = 2;
     */
    periodStart: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string period_end = 3;
     */
    periodEnd: string;
    /**
     * canonical idempotency anchor
     *
     * @generated from field: string period_marker = 4;
     */
    periodMarker: string;
    /**
     * source_kind discriminates the dispatcher branch in generate_revenue_run.
     *
     * @generated from field: domain.revenue.v1.RevenueRunSourceKind source_kind = 5;
     */
    sourceKind: RevenueRunSourceKind;
    /**
     * advance_collection_id is set when source_kind == ADVANCE_COLLECTION.
     *
     * @generated from field: optional string advance_collection_id = 6;
     */
    advanceCollectionId?: string;
};
/**
 * Describes the message domain.revenue.v1.SelectedRevenueRunCandidate.
 * Use `create(SelectedRevenueRunCandidateSchema)` to create a new message.
 */
export declare const SelectedRevenueRunCandidateSchema: GenMessage<SelectedRevenueRunCandidate>;
/**
 * RevenueRunSelections carries either an explicit list or a filter token.
 * Exactly one of explicit_list or filter_token should be set.
 *
 * @generated from message domain.revenue.v1.RevenueRunSelections
 */
export type RevenueRunSelections = Message<"domain.revenue.v1.RevenueRunSelections"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.SelectedRevenueRunCandidate explicit_list = 1;
     */
    explicitList: SelectedRevenueRunCandidate[];
    /**
     * signed server snapshot; deferred per v1 progress.md D9
     *
     * @generated from field: optional string filter_token = 2;
     */
    filterToken?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueRunSelections.
 * Use `create(RevenueRunSelectionsSchema)` to create a new message.
 */
export declare const RevenueRunSelectionsSchema: GenMessage<RevenueRunSelections>;
/**
 * @generated from message domain.revenue.v1.GenerateRevenueRunRequest
 */
export type GenerateRevenueRunRequest = Message<"domain.revenue.v1.GenerateRevenueRunRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueRunScope scope = 1;
     */
    scope?: RevenueRunScope;
    /**
     * @generated from field: domain.revenue.v1.RevenueRunSelections selections = 2;
     */
    selections?: RevenueRunSelections;
};
/**
 * Describes the message domain.revenue.v1.GenerateRevenueRunRequest.
 * Use `create(GenerateRevenueRunRequestSchema)` to create a new message.
 */
export declare const GenerateRevenueRunRequestSchema: GenMessage<GenerateRevenueRunRequest>;
/**
 * @generated from message domain.revenue.v1.GenerateRevenueRunResponse
 */
export type GenerateRevenueRunResponse = Message<"domain.revenue.v1.GenerateRevenueRunResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.revenue.v1.RevenueRun run = 3;
     */
    run?: RevenueRun;
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueRunAttempt attempts = 4;
     */
    attempts: RevenueRunAttempt[];
};
/**
 * Describes the message domain.revenue.v1.GenerateRevenueRunResponse.
 * Use `create(GenerateRevenueRunResponseSchema)` to create a new message.
 */
export declare const GenerateRevenueRunResponseSchema: GenMessage<GenerateRevenueRunResponse>;
/**
 * @generated from enum domain.revenue.v1.RevenueRunScopeKind
 */
export declare enum RevenueRunScopeKind {
    /**
     * @generated from enum value: REVENUE_RUN_SCOPE_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: REVENUE_RUN_SCOPE_KIND_SUBSCRIPTION = 1;
     */
    SUBSCRIPTION = 1,
    /**
     * @generated from enum value: REVENUE_RUN_SCOPE_KIND_CLIENT = 2;
     */
    CLIENT = 2,
    /**
     * @generated from enum value: REVENUE_RUN_SCOPE_KIND_WORKSPACE = 3;
     */
    WORKSPACE = 3
}
/**
 * Describes the enum domain.revenue.v1.RevenueRunScopeKind.
 */
export declare const RevenueRunScopeKindSchema: GenEnum<RevenueRunScopeKind>;
/**
 * @generated from enum domain.revenue.v1.RevenueRunStatus
 */
export declare enum RevenueRunStatus {
    /**
     * @generated from enum value: REVENUE_RUN_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: REVENUE_RUN_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: REVENUE_RUN_STATUS_COMPLETE = 2;
     */
    COMPLETE = 2,
    /**
     * @generated from enum value: REVENUE_RUN_STATUS_FAILED = 3;
     */
    FAILED = 3
}
/**
 * Describes the enum domain.revenue.v1.RevenueRunStatus.
 */
export declare const RevenueRunStatusSchema: GenEnum<RevenueRunStatus>;
/**
 * @generated from enum domain.revenue.v1.RevenueRunAttemptOutcome
 */
export declare enum RevenueRunAttemptOutcome {
    /**
     * @generated from enum value: REVENUE_RUN_ATTEMPT_OUTCOME_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: REVENUE_RUN_ATTEMPT_OUTCOME_CREATED = 1;
     */
    CREATED = 1,
    /**
     * @generated from enum value: REVENUE_RUN_ATTEMPT_OUTCOME_SKIPPED = 2;
     */
    SKIPPED = 2,
    /**
     * @generated from enum value: REVENUE_RUN_ATTEMPT_OUTCOME_ERRORED = 3;
     */
    ERRORED = 3
}
/**
 * Describes the enum domain.revenue.v1.RevenueRunAttemptOutcome.
 */
export declare const RevenueRunAttemptOutcomeSchema: GenEnum<RevenueRunAttemptOutcome>;
/**
 * RevenueRunSourceKind discriminates the source row from which a candidate /
 * attempt was emitted. UNSPECIFIED is treated as SUBSCRIPTION_CYCLE for
 * backward compatibility with pre-Plan-B run rows.
 *
 * Added 2026-05-17 by Plan B Phase 5 (advance-cash-events / Revenue Run).
 *
 * @generated from enum domain.revenue.v1.RevenueRunSourceKind
 */
export declare enum RevenueRunSourceKind {
    /**
     * @generated from enum value: REVENUE_RUN_SOURCE_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: REVENUE_RUN_SOURCE_KIND_SUBSCRIPTION_CYCLE = 1;
     */
    SUBSCRIPTION_CYCLE = 1,
    /**
     * @generated from enum value: REVENUE_RUN_SOURCE_KIND_ADVANCE_COLLECTION = 2;
     */
    ADVANCE_COLLECTION = 2
}
/**
 * Describes the enum domain.revenue.v1.RevenueRunSourceKind.
 */
export declare const RevenueRunSourceKindSchema: GenEnum<RevenueRunSourceKind>;
/**
 * @generated from service domain.revenue.v1.RevenueRunDomainService
 */
export declare const RevenueRunDomainService: GenService<{
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.CreateRevenueRun
     */
    createRevenueRun: {
        methodKind: "unary";
        input: typeof CreateRevenueRunRequestSchema;
        output: typeof CreateRevenueRunResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.ReadRevenueRun
     */
    readRevenueRun: {
        methodKind: "unary";
        input: typeof ReadRevenueRunRequestSchema;
        output: typeof ReadRevenueRunResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.UpdateRevenueRun
     */
    updateRevenueRun: {
        methodKind: "unary";
        input: typeof UpdateRevenueRunRequestSchema;
        output: typeof UpdateRevenueRunResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.DeleteRevenueRun
     */
    deleteRevenueRun: {
        methodKind: "unary";
        input: typeof DeleteRevenueRunRequestSchema;
        output: typeof DeleteRevenueRunResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.ListRevenueRuns
     */
    listRevenueRuns: {
        methodKind: "unary";
        input: typeof ListRevenueRunsRequestSchema;
        output: typeof ListRevenueRunsResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.CreateRevenueRunAttempt
     */
    createRevenueRunAttempt: {
        methodKind: "unary";
        input: typeof CreateRevenueRunAttemptRequestSchema;
        output: typeof CreateRevenueRunAttemptResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueRunDomainService.ListRevenueRunAttempts
     */
    listRevenueRunAttempts: {
        methodKind: "unary";
        input: typeof ListRevenueRunAttemptsRequestSchema;
        output: typeof ListRevenueRunAttemptsResponseSchema;
    };
}>;
