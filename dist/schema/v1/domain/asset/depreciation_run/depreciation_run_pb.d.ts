import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/depreciation_run/depreciation_run.proto.
 */
export declare const file_domain_asset_depreciation_run_depreciation_run: GenFile;
/**
 * DepreciationRun is the parent record for a batch depreciation posting.
 * Every row carries workspace_id for multi-tenant isolation.
 *
 * @generated from message domain.asset.v1.DepreciationRun
 */
export type DepreciationRun = Message<"domain.asset.v1.DepreciationRun"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: domain.asset.v1.DepreciationRunScopeKind scope_kind = 3;
     */
    scopeKind: DepreciationRunScopeKind;
    /**
     * asset_id | category_id | policy_id (= category_id in v1) | NULL for WORKSPACE
     *
     * @generated from field: optional string scope_id = 4;
     */
    scopeId?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string as_of_date = 5;
     */
    asOfDate: string;
    /**
     * FK to entity.User
     *
     * @generated from field: string initiator_id = 6;
     */
    initiatorId: string;
    /**
     * @generated from field: optional int64 initiated_at = 7;
     */
    initiatedAt?: bigint;
    /**
     * @generated from field: optional int64 completed_at = 8;
     */
    completedAt?: bigint;
    /**
     * @generated from field: domain.asset.v1.DepreciationRunStatus status = 9;
     */
    status: DepreciationRunStatus;
    /**
     * @generated from field: int32 created_count = 10;
     */
    createdCount: number;
    /**
     * @generated from field: int32 skipped_count = 11;
     */
    skippedCount: number;
    /**
     * @generated from field: int32 errored_count = 12;
     */
    erroredCount: number;
    /**
     * @generated from field: optional string error_summary = 13;
     */
    errorSummary?: string;
    /**
     * @generated from field: optional string notes = 14;
     */
    notes?: string;
    /**
     * @generated from field: bool active = 15;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 created_at = 16;
     */
    createdAt?: bigint;
    /**
     * @generated from field: optional string created_at_string = 17;
     */
    createdAtString?: string;
    /**
     * @generated from field: optional int64 updated_at = 18;
     */
    updatedAt?: bigint;
    /**
     * @generated from field: optional string updated_at_string = 19;
     */
    updatedAtString?: string;
};
/**
 * Describes the message domain.asset.v1.DepreciationRun.
 * Use `create(DepreciationRunSchema)` to create a new message.
 */
export declare const DepreciationRunSchema: GenMessage<DepreciationRun>;
/**
 * @generated from message domain.asset.v1.CreateDepreciationRunRequest
 */
export type CreateDepreciationRunRequest = Message<"domain.asset.v1.CreateDepreciationRunRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationRun data = 1;
     */
    data?: DepreciationRun;
};
/**
 * Describes the message domain.asset.v1.CreateDepreciationRunRequest.
 * Use `create(CreateDepreciationRunRequestSchema)` to create a new message.
 */
export declare const CreateDepreciationRunRequestSchema: GenMessage<CreateDepreciationRunRequest>;
/**
 * @generated from message domain.asset.v1.CreateDepreciationRunResponse
 */
export type CreateDepreciationRunResponse = Message<"domain.asset.v1.CreateDepreciationRunResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationRun data = 1;
     */
    data: DepreciationRun[];
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
 * Describes the message domain.asset.v1.CreateDepreciationRunResponse.
 * Use `create(CreateDepreciationRunResponseSchema)` to create a new message.
 */
export declare const CreateDepreciationRunResponseSchema: GenMessage<CreateDepreciationRunResponse>;
/**
 * @generated from message domain.asset.v1.ReadDepreciationRunRequest
 */
export type ReadDepreciationRunRequest = Message<"domain.asset.v1.ReadDepreciationRunRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationRun data = 1;
     */
    data?: DepreciationRun;
};
/**
 * Describes the message domain.asset.v1.ReadDepreciationRunRequest.
 * Use `create(ReadDepreciationRunRequestSchema)` to create a new message.
 */
export declare const ReadDepreciationRunRequestSchema: GenMessage<ReadDepreciationRunRequest>;
/**
 * @generated from message domain.asset.v1.ReadDepreciationRunResponse
 */
export type ReadDepreciationRunResponse = Message<"domain.asset.v1.ReadDepreciationRunResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationRun data = 1;
     */
    data: DepreciationRun[];
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
 * Describes the message domain.asset.v1.ReadDepreciationRunResponse.
 * Use `create(ReadDepreciationRunResponseSchema)` to create a new message.
 */
export declare const ReadDepreciationRunResponseSchema: GenMessage<ReadDepreciationRunResponse>;
/**
 * @generated from message domain.asset.v1.UpdateDepreciationRunRequest
 */
export type UpdateDepreciationRunRequest = Message<"domain.asset.v1.UpdateDepreciationRunRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationRun data = 1;
     */
    data?: DepreciationRun;
};
/**
 * Describes the message domain.asset.v1.UpdateDepreciationRunRequest.
 * Use `create(UpdateDepreciationRunRequestSchema)` to create a new message.
 */
export declare const UpdateDepreciationRunRequestSchema: GenMessage<UpdateDepreciationRunRequest>;
/**
 * @generated from message domain.asset.v1.UpdateDepreciationRunResponse
 */
export type UpdateDepreciationRunResponse = Message<"domain.asset.v1.UpdateDepreciationRunResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationRun data = 1;
     */
    data: DepreciationRun[];
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
 * Describes the message domain.asset.v1.UpdateDepreciationRunResponse.
 * Use `create(UpdateDepreciationRunResponseSchema)` to create a new message.
 */
export declare const UpdateDepreciationRunResponseSchema: GenMessage<UpdateDepreciationRunResponse>;
/**
 * @generated from message domain.asset.v1.DeleteDepreciationRunRequest
 */
export type DeleteDepreciationRunRequest = Message<"domain.asset.v1.DeleteDepreciationRunRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationRun data = 1;
     */
    data?: DepreciationRun;
};
/**
 * Describes the message domain.asset.v1.DeleteDepreciationRunRequest.
 * Use `create(DeleteDepreciationRunRequestSchema)` to create a new message.
 */
export declare const DeleteDepreciationRunRequestSchema: GenMessage<DeleteDepreciationRunRequest>;
/**
 * @generated from message domain.asset.v1.DeleteDepreciationRunResponse
 */
export type DeleteDepreciationRunResponse = Message<"domain.asset.v1.DeleteDepreciationRunResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteDepreciationRunResponse.
 * Use `create(DeleteDepreciationRunResponseSchema)` to create a new message.
 */
export declare const DeleteDepreciationRunResponseSchema: GenMessage<DeleteDepreciationRunResponse>;
/**
 * @generated from message domain.asset.v1.ListDepreciationRunsRequest
 */
export type ListDepreciationRunsRequest = Message<"domain.asset.v1.ListDepreciationRunsRequest"> & {
    /**
     * @generated from field: optional string workspace_id = 1;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 2;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.asset.v1.ListDepreciationRunsRequest.
 * Use `create(ListDepreciationRunsRequestSchema)` to create a new message.
 */
export declare const ListDepreciationRunsRequestSchema: GenMessage<ListDepreciationRunsRequest>;
/**
 * @generated from message domain.asset.v1.ListDepreciationRunsResponse
 */
export type ListDepreciationRunsResponse = Message<"domain.asset.v1.ListDepreciationRunsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationRun data = 1;
     */
    data: DepreciationRun[];
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
 * Describes the message domain.asset.v1.ListDepreciationRunsResponse.
 * Use `create(ListDepreciationRunsResponseSchema)` to create a new message.
 */
export declare const ListDepreciationRunsResponseSchema: GenMessage<ListDepreciationRunsResponse>;
/**
 * ListDepreciationCandidatesRequest — dry-run engine; computes eligible periods
 * per asset from depreciation_start_date → as_of_date. No writes.
 *
 * @generated from message domain.asset.v1.ListDepreciationCandidatesRequest
 */
export type ListDepreciationCandidatesRequest = Message<"domain.asset.v1.ListDepreciationCandidatesRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * @generated from field: domain.asset.v1.DepreciationRunScopeKind scope_kind = 2;
     */
    scopeKind: DepreciationRunScopeKind;
    /**
     * @generated from field: optional string scope_id = 3;
     */
    scopeId?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string as_of_date = 4;
     */
    asOfDate: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.asset.v1.ListDepreciationCandidatesRequest.
 * Use `create(ListDepreciationCandidatesRequestSchema)` to create a new message.
 */
export declare const ListDepreciationCandidatesRequestSchema: GenMessage<ListDepreciationCandidatesRequest>;
/**
 * @generated from message domain.asset.v1.ListDepreciationCandidatesResponse
 */
export type ListDepreciationCandidatesResponse = Message<"domain.asset.v1.ListDepreciationCandidatesResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationCandidate data = 1;
     */
    data: DepreciationCandidate[];
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
 * Describes the message domain.asset.v1.ListDepreciationCandidatesResponse.
 * Use `create(ListDepreciationCandidatesResponseSchema)` to create a new message.
 */
export declare const ListDepreciationCandidatesResponseSchema: GenMessage<ListDepreciationCandidatesResponse>;
/**
 * DepreciationCandidate is the per-asset result of the dry-run engine.
 *
 * @generated from message domain.asset.v1.DepreciationCandidate
 */
export type DepreciationCandidate = Message<"domain.asset.v1.DepreciationCandidate"> & {
    /**
     * @generated from field: string asset_id = 1;
     */
    assetId: string;
    /**
     * @generated from field: string asset_name = 2;
     */
    assetName: string;
    /**
     * @generated from field: string currency = 3;
     */
    currency: string;
    /**
     * centavos
     *
     * @generated from field: int64 current_book_value = 4;
     */
    currentBookValue: bigint;
    /**
     * centavos — after all pending periods
     *
     * @generated from field: int64 projected_book_value = 5;
     */
    projectedBookValue: bigint;
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationCandidatePeriod periods = 6;
     */
    periods: DepreciationCandidatePeriod[];
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationCandidateBlocker blockers = 7;
     */
    blockers: DepreciationCandidateBlocker[];
};
/**
 * Describes the message domain.asset.v1.DepreciationCandidate.
 * Use `create(DepreciationCandidateSchema)` to create a new message.
 */
export declare const DepreciationCandidateSchema: GenMessage<DepreciationCandidate>;
/**
 * DepreciationCandidatePeriod is one eligible period for a candidate asset.
 *
 * @generated from message domain.asset.v1.DepreciationCandidatePeriod
 */
export type DepreciationCandidatePeriod = Message<"domain.asset.v1.DepreciationCandidatePeriod"> & {
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string period_start_date = 1;
     */
    periodStartDate: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string period_end_date = 2;
     */
    periodEndDate: string;
    /**
     * centavos — depreciation for this period
     *
     * @generated from field: int64 amount = 3;
     */
    amount: bigint;
    /**
     * centavos — accumulated after this period
     *
     * @generated from field: int64 running_accumulated = 4;
     */
    runningAccumulated: bigint;
    /**
     * centavos — book value after this period
     *
     * @generated from field: int64 running_book_value = 5;
     */
    runningBookValue: bigint;
};
/**
 * Describes the message domain.asset.v1.DepreciationCandidatePeriod.
 * Use `create(DepreciationCandidatePeriodSchema)` to create a new message.
 */
export declare const DepreciationCandidatePeriodSchema: GenMessage<DepreciationCandidatePeriod>;
/**
 * DepreciationCandidateBlocker describes why an asset cannot be depreciated.
 *
 * @generated from message domain.asset.v1.DepreciationCandidateBlocker
 */
export type DepreciationCandidateBlocker = Message<"domain.asset.v1.DepreciationCandidateBlocker"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationCandidateBlocker.Kind kind = 1;
     */
    kind: DepreciationCandidateBlocker_Kind;
    /**
     * @generated from field: string label = 2;
     */
    label: string;
};
/**
 * Describes the message domain.asset.v1.DepreciationCandidateBlocker.
 * Use `create(DepreciationCandidateBlockerSchema)` to create a new message.
 */
export declare const DepreciationCandidateBlockerSchema: GenMessage<DepreciationCandidateBlocker>;
/**
 * @generated from enum domain.asset.v1.DepreciationCandidateBlocker.Kind
 */
export declare enum DepreciationCandidateBlocker_Kind {
    /**
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_UNSPECIFIED = 0;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_UNSPECIFIED = 0,
    /**
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_NO_START_DATE = 1;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_NO_START_DATE = 1,
    /**
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_NOT_IN_SERVICE = 2;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_NOT_IN_SERVICE = 2,
    /**
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_FULLY_DEPRECIATED = 3;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_FULLY_DEPRECIATED = 3,
    /**
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_MISSING_METHOD = 4;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_MISSING_METHOD = 4,
    /**
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_ZERO_USEFUL_LIFE = 5;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_ZERO_USEFUL_LIFE = 5,
    /**
     * Units-of-production assets require units_produced input per period.
     * See docs/plan/20260601-uop-depreciation/ for the blocked roadmap item.
     *
     * @generated from enum value: DEPRECIATION_CANDIDATE_BLOCKER_KIND_UNITS_REQUIRED = 6;
     */
    DEPRECIATION_CANDIDATE_BLOCKER_KIND_UNITS_REQUIRED = 6
}
/**
 * Describes the enum domain.asset.v1.DepreciationCandidateBlocker.Kind.
 */
export declare const DepreciationCandidateBlocker_KindSchema: GenEnum<DepreciationCandidateBlocker_Kind>;
/**
 * GenerateDepreciationRunRequest — initiates a batch posting run.
 * Idempotent: period_marker unique index on asset_transaction prevents double-posting.
 *
 * @generated from message domain.asset.v1.GenerateDepreciationRunRequest
 */
export type GenerateDepreciationRunRequest = Message<"domain.asset.v1.GenerateDepreciationRunRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * @generated from field: domain.asset.v1.DepreciationRunScopeKind scope_kind = 2;
     */
    scopeKind: DepreciationRunScopeKind;
    /**
     * @generated from field: optional string scope_id = 3;
     */
    scopeId?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string as_of_date = 4;
     */
    asOfDate: string;
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationRunSelection selections = 5;
     */
    selections: DepreciationRunSelection[];
};
/**
 * Describes the message domain.asset.v1.GenerateDepreciationRunRequest.
 * Use `create(GenerateDepreciationRunRequestSchema)` to create a new message.
 */
export declare const GenerateDepreciationRunRequestSchema: GenMessage<GenerateDepreciationRunRequest>;
/**
 * DepreciationRunSelection identifies the periods to post for one asset.
 *
 * @generated from message domain.asset.v1.DepreciationRunSelection
 */
export type DepreciationRunSelection = Message<"domain.asset.v1.DepreciationRunSelection"> & {
    /**
     * @generated from field: string asset_id = 1;
     */
    assetId: string;
    /**
     * each maps to one DepreciationSchedule row
     *
     * @generated from field: repeated string period_start_dates = 2;
     */
    periodStartDates: string[];
};
/**
 * Describes the message domain.asset.v1.DepreciationRunSelection.
 * Use `create(DepreciationRunSelectionSchema)` to create a new message.
 */
export declare const DepreciationRunSelectionSchema: GenMessage<DepreciationRunSelection>;
/**
 * GenerateDepreciationRunResponse is returned after the batch run completes (or fails).
 *
 * @generated from message domain.asset.v1.GenerateDepreciationRunResponse
 */
export type GenerateDepreciationRunResponse = Message<"domain.asset.v1.GenerateDepreciationRunResponse"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationRun run = 1;
     */
    run?: DepreciationRun;
    /**
     * @generated from field: int32 created_count = 2;
     */
    createdCount: number;
    /**
     * @generated from field: int32 skipped_count = 3;
     */
    skippedCount: number;
    /**
     * @generated from field: int32 errored_count = 4;
     */
    erroredCount: number;
    /**
     * @generated from field: bool success = 5;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 6;
     */
    error?: Error;
};
/**
 * Describes the message domain.asset.v1.GenerateDepreciationRunResponse.
 * Use `create(GenerateDepreciationRunResponseSchema)` to create a new message.
 */
export declare const GenerateDepreciationRunResponseSchema: GenMessage<GenerateDepreciationRunResponse>;
/**
 * ListDepreciationRunEntriesRequest lists DepreciationSchedule rows by run_id.
 * Used by the Surface D run-detail page entries tab.
 *
 * @generated from message domain.asset.v1.ListDepreciationRunEntriesRequest
 */
export type ListDepreciationRunEntriesRequest = Message<"domain.asset.v1.ListDepreciationRunEntriesRequest"> & {
    /**
     * @generated from field: string run_id = 1;
     */
    runId: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 2;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.asset.v1.ListDepreciationRunEntriesRequest.
 * Use `create(ListDepreciationRunEntriesRequestSchema)` to create a new message.
 */
export declare const ListDepreciationRunEntriesRequestSchema: GenMessage<ListDepreciationRunEntriesRequest>;
/**
 * DepreciationRunScopeKind determines which assets are included in a run.
 *
 * @generated from enum domain.asset.v1.DepreciationRunScopeKind
 */
export declare enum DepreciationRunScopeKind {
    /**
     * @generated from enum value: DEPRECIATION_RUN_SCOPE_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Surface A — single asset
     *
     * @generated from enum value: DEPRECIATION_RUN_SCOPE_KIND_ASSET = 1;
     */
    ASSET = 1,
    /**
     * Surface C — all assets in category
     *
     * @generated from enum value: DEPRECIATION_RUN_SCOPE_KIND_CATEGORY = 2;
     */
    CATEGORY = 2,
    /**
     * Surface F — all assets under policy (= category in v1)
     *
     * @generated from enum value: DEPRECIATION_RUN_SCOPE_KIND_POLICY = 3;
     */
    POLICY = 3,
    /**
     * Surface B — all in-service assets workspace-wide
     *
     * @generated from enum value: DEPRECIATION_RUN_SCOPE_KIND_WORKSPACE = 4;
     */
    WORKSPACE = 4
}
/**
 * Describes the enum domain.asset.v1.DepreciationRunScopeKind.
 */
export declare const DepreciationRunScopeKindSchema: GenEnum<DepreciationRunScopeKind>;
/**
 * DepreciationRunStatus tracks the lifecycle of a batch depreciation run.
 *
 * @generated from enum domain.asset.v1.DepreciationRunStatus
 */
export declare enum DepreciationRunStatus {
    /**
     * @generated from enum value: DEPRECIATION_RUN_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DEPRECIATION_RUN_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: DEPRECIATION_RUN_STATUS_COMPLETE = 2;
     */
    COMPLETE = 2,
    /**
     * @generated from enum value: DEPRECIATION_RUN_STATUS_FAILED = 3;
     */
    FAILED = 3
}
/**
 * Describes the enum domain.asset.v1.DepreciationRunStatus.
 */
export declare const DepreciationRunStatusSchema: GenEnum<DepreciationRunStatus>;
/**
 * DepreciationRunOutcome is the per-entry result for a single asset+period pair.
 * Used on DepreciationSchedule.outcome and DepreciationRunSelection responses.
 * NOTE: append-only. Do not call Update/Delete on posted DepreciationSchedule rows —
 * corrections must be made via offsetting transactions.
 *
 * @generated from enum domain.asset.v1.DepreciationRunOutcome
 */
export declare enum DepreciationRunOutcome {
    /**
     * @generated from enum value: DEPRECIATION_RUN_OUTCOME_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Transaction + schedule row posted successfully
     *
     * @generated from enum value: DEPRECIATION_RUN_OUTCOME_CREATED = 1;
     */
    CREATED = 1,
    /**
     * period_marker already exists (idempotent re-run)
     *
     * @generated from enum value: DEPRECIATION_RUN_OUTCOME_SKIPPED = 2;
     */
    SKIPPED = 2,
    /**
     * Unexpected error — see error_message
     *
     * @generated from enum value: DEPRECIATION_RUN_OUTCOME_ERRORED = 3;
     */
    ERRORED = 3
}
/**
 * Describes the enum domain.asset.v1.DepreciationRunOutcome.
 */
export declare const DepreciationRunOutcomeSchema: GenEnum<DepreciationRunOutcome>;
/**
 * @generated from service domain.asset.v1.DepreciationRunDomainService
 */
export declare const DepreciationRunDomainService: GenService<{
    /**
     * Standard CRUD for audit/history access
     *
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.CreateDepreciationRun
     */
    createDepreciationRun: {
        methodKind: "unary";
        input: typeof CreateDepreciationRunRequestSchema;
        output: typeof CreateDepreciationRunResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.ReadDepreciationRun
     */
    readDepreciationRun: {
        methodKind: "unary";
        input: typeof ReadDepreciationRunRequestSchema;
        output: typeof ReadDepreciationRunResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.UpdateDepreciationRun
     */
    updateDepreciationRun: {
        methodKind: "unary";
        input: typeof UpdateDepreciationRunRequestSchema;
        output: typeof UpdateDepreciationRunResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.DeleteDepreciationRun
     */
    deleteDepreciationRun: {
        methodKind: "unary";
        input: typeof DeleteDepreciationRunRequestSchema;
        output: typeof DeleteDepreciationRunResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.ListDepreciationRuns
     */
    listDepreciationRuns: {
        methodKind: "unary";
        input: typeof ListDepreciationRunsRequestSchema;
        output: typeof ListDepreciationRunsResponseSchema;
    };
    /**
     * Engine — read-only dry run, no DB writes
     *
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.ListDepreciationCandidates
     */
    listDepreciationCandidates: {
        methodKind: "unary";
        input: typeof ListDepreciationCandidatesRequestSchema;
        output: typeof ListDepreciationCandidatesResponseSchema;
    };
    /**
     * Engine — batch write; idempotent per (asset_id, period_marker) unique index
     *
     * @generated from rpc domain.asset.v1.DepreciationRunDomainService.GenerateDepreciationRun
     */
    generateDepreciationRun: {
        methodKind: "unary";
        input: typeof GenerateDepreciationRunRequestSchema;
        output: typeof GenerateDepreciationRunResponseSchema;
    };
}>;
