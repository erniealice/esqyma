import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Job } from "../job/job_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_phase/job_phase.proto.
 */
export declare const file_domain_operation_job_phase_job_phase: GenFile;
/**
 * @generated from message domain.operation.v1.JobPhase
 */
export type JobPhase = Message<"domain.operation.v1.JobPhase"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 3;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 5;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string job_id = 7;
     */
    jobId: string;
    /**
     * @generated from field: optional domain.operation.v1.Job job = 8;
     */
    job?: Job;
    /**
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * @generated from field: int32 phase_order = 10;
     */
    phaseOrder: number;
    /**
     * @generated from field: domain.operation.v1.PhaseStatus status = 11;
     */
    status: PhaseStatus;
    /**
     * @generated from field: optional string template_phase_id = 12;
     */
    templatePhaseId?: string;
    /**
     * @generated from field: optional string resource_id = 13;
     */
    resourceId?: string;
    /**
     * @generated from field: optional int64 planned_start = 14;
     */
    plannedStart?: bigint;
    /**
     * @generated from field: optional string planned_start_string = 15;
     */
    plannedStartString?: string;
    /**
     * @generated from field: optional int64 planned_end = 16;
     */
    plannedEnd?: bigint;
    /**
     * @generated from field: optional string planned_end_string = 17;
     */
    plannedEndString?: string;
    /**
     * @generated from field: optional int64 actual_start = 18;
     */
    actualStart?: bigint;
    /**
     * @generated from field: optional string actual_start_string = 19;
     */
    actualStartString?: string;
    /**
     * @generated from field: optional int64 actual_end = 20;
     */
    actualEnd?: bigint;
    /**
     * @generated from field: optional string actual_end_string = 21;
     */
    actualEndString?: string;
    /**
     * @generated from field: optional int32 setup_minutes = 22;
     */
    setupMinutes?: number;
    /**
     * @generated from field: optional double run_minutes_per_unit = 23;
     */
    runMinutesPerUnit?: number;
    /**
     * @generated from field: optional string predecessor_phase_id = 24;
     */
    predecessorPhaseId?: string;
    /**
     * @generated from field: optional string scoring_scheme_id = 25;
     */
    scoringSchemeId?: string;
    /**
     * @generated from field: bool is_synthesized = 26;
     */
    isSynthesized: boolean;
    /**
     * --- Approval workflow (per-phase approval ladder) ---
     * Server-owned lifecycle. Generic create forces IN_PROGRESS/null audit and
     * generic update strips these fields (P2); dedicated transition RPCs own the
     * stamps. approval_status persists as the enum NAME (TEXT NOT NULL) with the
     * raw-SQL quoted default below and a DB CHECK over the four persisted tokens.
     * Each actor/time pair is null-or-nonnull together (DB CHECK, migration). The
     * *_string fields are display-only mirrors (db.ignore) of their epoch-ms int64
     * siblings and are never persisted.
     *
     * @generated from field: domain.operation.v1.PhaseApprovalStatus approval_status = 40;
     */
    approvalStatus: PhaseApprovalStatus;
    /**
     * @generated from field: optional string submitted_by = 41;
     */
    submittedBy?: string;
    /**
     * @generated from field: optional int64 submitted_at = 42;
     */
    submittedAt?: bigint;
    /**
     * @generated from field: optional string submitted_at_string = 43;
     */
    submittedAtString?: string;
    /**
     * @generated from field: optional string verified_by = 44;
     */
    verifiedBy?: string;
    /**
     * @generated from field: optional int64 verified_at = 45;
     */
    verifiedAt?: bigint;
    /**
     * @generated from field: optional string verified_at_string = 46;
     */
    verifiedAtString?: string;
    /**
     * @generated from field: optional string published_by = 47;
     */
    publishedBy?: string;
    /**
     * @generated from field: optional int64 published_at = 48;
     */
    publishedAt?: bigint;
    /**
     * @generated from field: optional string published_at_string = 49;
     */
    publishedAtString?: string;
    /**
     * @generated from field: optional string return_reason = 50;
     */
    returnReason?: string;
    /**
     * @generated from field: optional string returned_by = 51;
     */
    returnedBy?: string;
    /**
     * @generated from field: optional int64 returned_at = 52;
     */
    returnedAt?: bigint;
    /**
     * @generated from field: optional string returned_at_string = 53;
     */
    returnedAtString?: string;
};
/**
 * Describes the message domain.operation.v1.JobPhase.
 * Use `create(JobPhaseSchema)` to create a new message.
 */
export declare const JobPhaseSchema: GenMessage<JobPhase>;
/**
 * @generated from message domain.operation.v1.CreateJobPhaseRequest
 */
export type CreateJobPhaseRequest = Message<"domain.operation.v1.CreateJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.CreateJobPhaseRequest.
 * Use `create(CreateJobPhaseRequestSchema)` to create a new message.
 */
export declare const CreateJobPhaseRequestSchema: GenMessage<CreateJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobPhaseResponse
 */
export type CreateJobPhaseResponse = Message<"domain.operation.v1.CreateJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.CreateJobPhaseResponse.
 * Use `create(CreateJobPhaseResponseSchema)` to create a new message.
 */
export declare const CreateJobPhaseResponseSchema: GenMessage<CreateJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobPhaseRequest
 */
export type ReadJobPhaseRequest = Message<"domain.operation.v1.ReadJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.ReadJobPhaseRequest.
 * Use `create(ReadJobPhaseRequestSchema)` to create a new message.
 */
export declare const ReadJobPhaseRequestSchema: GenMessage<ReadJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobPhaseResponse
 */
export type ReadJobPhaseResponse = Message<"domain.operation.v1.ReadJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.ReadJobPhaseResponse.
 * Use `create(ReadJobPhaseResponseSchema)` to create a new message.
 */
export declare const ReadJobPhaseResponseSchema: GenMessage<ReadJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobPhaseRequest
 */
export type UpdateJobPhaseRequest = Message<"domain.operation.v1.UpdateJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.UpdateJobPhaseRequest.
 * Use `create(UpdateJobPhaseRequestSchema)` to create a new message.
 */
export declare const UpdateJobPhaseRequestSchema: GenMessage<UpdateJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobPhaseResponse
 */
export type UpdateJobPhaseResponse = Message<"domain.operation.v1.UpdateJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.UpdateJobPhaseResponse.
 * Use `create(UpdateJobPhaseResponseSchema)` to create a new message.
 */
export declare const UpdateJobPhaseResponseSchema: GenMessage<UpdateJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobPhaseRequest
 */
export type DeleteJobPhaseRequest = Message<"domain.operation.v1.DeleteJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.DeleteJobPhaseRequest.
 * Use `create(DeleteJobPhaseRequestSchema)` to create a new message.
 */
export declare const DeleteJobPhaseRequestSchema: GenMessage<DeleteJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobPhaseResponse
 */
export type DeleteJobPhaseResponse = Message<"domain.operation.v1.DeleteJobPhaseResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobPhaseResponse.
 * Use `create(DeleteJobPhaseResponseSchema)` to create a new message.
 */
export declare const DeleteJobPhaseResponseSchema: GenMessage<DeleteJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesRequest
 */
export type ListJobPhasesRequest = Message<"domain.operation.v1.ListJobPhasesRequest"> & {
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
     * Narrow the listing to ONE delivery group. Strictly additive.
     *
     * ABSENT or EMPTY = no narrow = today's behaviour EXACTLY: the adapter emits
     * the byte-identical query it emits now, so every existing caller is
     * unaffected and the change is wire-compatible.
     *
     * WHEN SET the adapter narrows through subscription_group_member — `job` has
     * NO subscription_group_id column, so the only path from a phase to a group is
     * the existing predicate on (sgm.client_id = j.client_id,
     * sgm.subscription_id = j.origin_id, sgm.subscription_group_id, sgm.workspace_id,
     * sgm.active). Reuse that predicate verbatim; do not re-author the join.
     *
     * Mirrors Submit/Verify/Publish/ReturnJobPhaseApprovalRequest.subscription_group_id
     * (which decide which phases a sheet TRANSITIONS) — this one decides which a
     * sheet READS, so a reader can be evaluated at the same grain the transitions
     * already operate at.
     *
     * @generated from field: optional string subscription_group_id = 5;
     */
    subscriptionGroupId?: string;
};
/**
 * Describes the message domain.operation.v1.ListJobPhasesRequest.
 * Use `create(ListJobPhasesRequestSchema)` to create a new message.
 */
export declare const ListJobPhasesRequestSchema: GenMessage<ListJobPhasesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesResponse
 */
export type ListJobPhasesResponse = Message<"domain.operation.v1.ListJobPhasesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.ListJobPhasesResponse.
 * Use `create(ListJobPhasesResponseSchema)` to create a new message.
 */
export declare const ListJobPhasesResponseSchema: GenMessage<ListJobPhasesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseListPageDataRequest
 */
export type GetJobPhaseListPageDataRequest = Message<"domain.operation.v1.GetJobPhaseListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobPhaseListPageDataRequest.
 * Use `create(GetJobPhaseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobPhaseListPageDataRequestSchema: GenMessage<GetJobPhaseListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseListPageDataResponse
 */
export type GetJobPhaseListPageDataResponse = Message<"domain.operation.v1.GetJobPhaseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase job_phase_list = 1;
     */
    jobPhaseList: JobPhase[];
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
 * Describes the message domain.operation.v1.GetJobPhaseListPageDataResponse.
 * Use `create(GetJobPhaseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobPhaseListPageDataResponseSchema: GenMessage<GetJobPhaseListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseItemPageDataRequest
 */
export type GetJobPhaseItemPageDataRequest = Message<"domain.operation.v1.GetJobPhaseItemPageDataRequest"> & {
    /**
     * @generated from field: string job_phase_id = 1;
     */
    jobPhaseId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobPhaseItemPageDataRequest.
 * Use `create(GetJobPhaseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobPhaseItemPageDataRequestSchema: GenMessage<GetJobPhaseItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseItemPageDataResponse
 */
export type GetJobPhaseItemPageDataResponse = Message<"domain.operation.v1.GetJobPhaseItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobPhase job_phase = 1;
     */
    jobPhase?: JobPhase;
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
 * Describes the message domain.operation.v1.GetJobPhaseItemPageDataResponse.
 * Use `create(GetJobPhaseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobPhaseItemPageDataResponseSchema: GenMessage<GetJobPhaseItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesByJobRequest
 */
export type ListJobPhasesByJobRequest = Message<"domain.operation.v1.ListJobPhasesByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobPhasesByJobRequest.
 * Use `create(ListJobPhasesByJobRequestSchema)` to create a new message.
 */
export declare const ListJobPhasesByJobRequestSchema: GenMessage<ListJobPhasesByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesByJobResponse
 */
export type ListJobPhasesByJobResponse = Message<"domain.operation.v1.ListJobPhasesByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase job_phases = 1;
     */
    jobPhases: JobPhase[];
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
 * Describes the message domain.operation.v1.ListJobPhasesByJobResponse.
 * Use `create(ListJobPhasesByJobResponseSchema)` to create a new message.
 */
export declare const ListJobPhasesByJobResponseSchema: GenMessage<ListJobPhasesByJobResponse>;
/**
 * @generated from message domain.operation.v1.SubmitJobPhaseApprovalRequest
 */
export type SubmitJobPhaseApprovalRequest = Message<"domain.operation.v1.SubmitJobPhaseApprovalRequest"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string job_template_phase_id = 2;
     */
    jobTemplatePhaseId: string;
    /**
     * Narrow the transition to ONE delivery group. ABSENT = every group under the
     * template — the pre-20260725 behaviour, preserved exactly, so every existing
     * caller is unaffected and the change is wire-compatible.
     *
     * Mirrors GetOutcomeMatrixRequest.subscription_group_id: that field decides
     * which students a sheet DISPLAYS, this one decides which it UPDATES. Without
     * it the two disagree — a page showing one group's 29 students transitions all
     * 87 across the template's three groups.
     *
     * No schema change: approval_status lives on job_phase, one row per student
     * job, so the storage grain was always finer than this RPC's.
     *
     * @generated from field: optional string subscription_group_id = 3;
     */
    subscriptionGroupId?: string;
};
/**
 * Describes the message domain.operation.v1.SubmitJobPhaseApprovalRequest.
 * Use `create(SubmitJobPhaseApprovalRequestSchema)` to create a new message.
 */
export declare const SubmitJobPhaseApprovalRequestSchema: GenMessage<SubmitJobPhaseApprovalRequest>;
/**
 * @generated from message domain.operation.v1.SubmitJobPhaseApprovalResponse
 */
export type SubmitJobPhaseApprovalResponse = Message<"domain.operation.v1.SubmitJobPhaseApprovalResponse"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseApprovalStatus status = 1;
     */
    status: PhaseApprovalStatus;
    /**
     * @generated from field: int32 affected_count = 2;
     */
    affectedCount: number;
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
 * Describes the message domain.operation.v1.SubmitJobPhaseApprovalResponse.
 * Use `create(SubmitJobPhaseApprovalResponseSchema)` to create a new message.
 */
export declare const SubmitJobPhaseApprovalResponseSchema: GenMessage<SubmitJobPhaseApprovalResponse>;
/**
 * @generated from message domain.operation.v1.VerifyJobPhaseApprovalRequest
 */
export type VerifyJobPhaseApprovalRequest = Message<"domain.operation.v1.VerifyJobPhaseApprovalRequest"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string job_template_phase_id = 2;
     */
    jobTemplatePhaseId: string;
    /**
     * Narrow the transition to ONE delivery group. ABSENT = every group under the
     * template — the pre-20260725 behaviour, preserved exactly, so every existing
     * caller is unaffected and the change is wire-compatible.
     *
     * Mirrors GetOutcomeMatrixRequest.subscription_group_id: that field decides
     * which students a sheet DISPLAYS, this one decides which it UPDATES. Without
     * it the two disagree — a page showing one group's 29 students transitions all
     * 87 across the template's three groups.
     *
     * No schema change: approval_status lives on job_phase, one row per student
     * job, so the storage grain was always finer than this RPC's.
     *
     * @generated from field: optional string subscription_group_id = 3;
     */
    subscriptionGroupId?: string;
};
/**
 * Describes the message domain.operation.v1.VerifyJobPhaseApprovalRequest.
 * Use `create(VerifyJobPhaseApprovalRequestSchema)` to create a new message.
 */
export declare const VerifyJobPhaseApprovalRequestSchema: GenMessage<VerifyJobPhaseApprovalRequest>;
/**
 * @generated from message domain.operation.v1.VerifyJobPhaseApprovalResponse
 */
export type VerifyJobPhaseApprovalResponse = Message<"domain.operation.v1.VerifyJobPhaseApprovalResponse"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseApprovalStatus status = 1;
     */
    status: PhaseApprovalStatus;
    /**
     * @generated from field: int32 affected_count = 2;
     */
    affectedCount: number;
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
 * Describes the message domain.operation.v1.VerifyJobPhaseApprovalResponse.
 * Use `create(VerifyJobPhaseApprovalResponseSchema)` to create a new message.
 */
export declare const VerifyJobPhaseApprovalResponseSchema: GenMessage<VerifyJobPhaseApprovalResponse>;
/**
 * @generated from message domain.operation.v1.PublishJobPhaseApprovalRequest
 */
export type PublishJobPhaseApprovalRequest = Message<"domain.operation.v1.PublishJobPhaseApprovalRequest"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string job_template_phase_id = 2;
     */
    jobTemplatePhaseId: string;
    /**
     * Narrow the transition to ONE delivery group. ABSENT = every group under the
     * template — the pre-20260725 behaviour, preserved exactly, so every existing
     * caller is unaffected and the change is wire-compatible.
     *
     * Mirrors GetOutcomeMatrixRequest.subscription_group_id: that field decides
     * which students a sheet DISPLAYS, this one decides which it UPDATES. Without
     * it the two disagree — a page showing one group's 29 students transitions all
     * 87 across the template's three groups.
     *
     * No schema change: approval_status lives on job_phase, one row per student
     * job, so the storage grain was always finer than this RPC's.
     *
     * @generated from field: optional string subscription_group_id = 3;
     */
    subscriptionGroupId?: string;
};
/**
 * Describes the message domain.operation.v1.PublishJobPhaseApprovalRequest.
 * Use `create(PublishJobPhaseApprovalRequestSchema)` to create a new message.
 */
export declare const PublishJobPhaseApprovalRequestSchema: GenMessage<PublishJobPhaseApprovalRequest>;
/**
 * @generated from message domain.operation.v1.PublishJobPhaseApprovalResponse
 */
export type PublishJobPhaseApprovalResponse = Message<"domain.operation.v1.PublishJobPhaseApprovalResponse"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseApprovalStatus status = 1;
     */
    status: PhaseApprovalStatus;
    /**
     * @generated from field: int32 affected_count = 2;
     */
    affectedCount: number;
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
 * Describes the message domain.operation.v1.PublishJobPhaseApprovalResponse.
 * Use `create(PublishJobPhaseApprovalResponseSchema)` to create a new message.
 */
export declare const PublishJobPhaseApprovalResponseSchema: GenMessage<PublishJobPhaseApprovalResponse>;
/**
 * @generated from message domain.operation.v1.ReturnJobPhaseApprovalRequest
 */
export type ReturnJobPhaseApprovalRequest = Message<"domain.operation.v1.ReturnJobPhaseApprovalRequest"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string job_template_phase_id = 2;
     */
    jobTemplatePhaseId: string;
    /**
     * @generated from field: optional string reason = 3;
     */
    reason?: string;
    /**
     * Narrow the transition to ONE delivery group. ABSENT = every group under the
     * template — the pre-20260725 behaviour, preserved exactly, so every existing
     * caller is unaffected and the change is wire-compatible.
     *
     * Mirrors GetOutcomeMatrixRequest.subscription_group_id: that field decides
     * which students a sheet DISPLAYS, this one decides which it UPDATES. Without
     * it the two disagree — a page showing one group's 29 students transitions all
     * 87 across the template's three groups.
     *
     * No schema change: approval_status lives on job_phase, one row per student
     * job, so the storage grain was always finer than this RPC's.
     *
     * @generated from field: optional string subscription_group_id = 4;
     */
    subscriptionGroupId?: string;
};
/**
 * Describes the message domain.operation.v1.ReturnJobPhaseApprovalRequest.
 * Use `create(ReturnJobPhaseApprovalRequestSchema)` to create a new message.
 */
export declare const ReturnJobPhaseApprovalRequestSchema: GenMessage<ReturnJobPhaseApprovalRequest>;
/**
 * @generated from message domain.operation.v1.ReturnJobPhaseApprovalResponse
 */
export type ReturnJobPhaseApprovalResponse = Message<"domain.operation.v1.ReturnJobPhaseApprovalResponse"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseApprovalStatus status = 1;
     */
    status: PhaseApprovalStatus;
    /**
     * @generated from field: int32 affected_count = 2;
     */
    affectedCount: number;
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
 * Describes the message domain.operation.v1.ReturnJobPhaseApprovalResponse.
 * Use `create(ReturnJobPhaseApprovalResponseSchema)` to create a new message.
 */
export declare const ReturnJobPhaseApprovalResponseSchema: GenMessage<ReturnJobPhaseApprovalResponse>;
/**
 * @generated from enum domain.operation.v1.PhaseStatus
 */
export declare enum PhaseStatus {
    /**
     * @generated from enum value: PHASE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: PHASE_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: PHASE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: PHASE_STATUS_COMPLETED = 3;
     */
    COMPLETED = 3
}
/**
 * Describes the enum domain.operation.v1.PhaseStatus.
 */
export declare const PhaseStatusSchema: GenEnum<PhaseStatus>;
/**
 * PhaseApprovalStatus is the LOCAL per-phase approval ladder (plan
 * 20260718-phase-approval-workflow). It is orthogonal to PhaseStatus (field 11):
 * approval transitions never mutate PhaseStatus, trigger completion hooks, or
 * touch billing. The ladder is
 *   IN_PROGRESS --submit--> FOR_REVIEW --verify--> VERIFIED --publish--> PUBLISHED
 * with `return` normalizing any advanced/mixed sheet back to IN_PROGRESS.
 * UNSPECIFIED is never persisted; the DB stores the enum NAME (TEXT) with a
 * default of IN_PROGRESS and a CHECK over the four non-UNSPECIFIED tokens.
 *
 * @generated from enum domain.operation.v1.PhaseApprovalStatus
 */
export declare enum PhaseApprovalStatus {
    /**
     * @generated from enum value: PHASE_APPROVAL_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: PHASE_APPROVAL_STATUS_IN_PROGRESS = 1;
     */
    IN_PROGRESS = 1,
    /**
     * @generated from enum value: PHASE_APPROVAL_STATUS_FOR_REVIEW = 2;
     */
    FOR_REVIEW = 2,
    /**
     * @generated from enum value: PHASE_APPROVAL_STATUS_VERIFIED = 3;
     */
    VERIFIED = 3,
    /**
     * @generated from enum value: PHASE_APPROVAL_STATUS_PUBLISHED = 4;
     */
    PUBLISHED = 4
}
/**
 * Describes the enum domain.operation.v1.PhaseApprovalStatus.
 */
export declare const PhaseApprovalStatusSchema: GenEnum<PhaseApprovalStatus>;
/**
 * @generated from service domain.operation.v1.JobPhaseDomainService
 */
export declare const JobPhaseDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.CreateJobPhase
     */
    createJobPhase: {
        methodKind: "unary";
        input: typeof CreateJobPhaseRequestSchema;
        output: typeof CreateJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ReadJobPhase
     */
    readJobPhase: {
        methodKind: "unary";
        input: typeof ReadJobPhaseRequestSchema;
        output: typeof ReadJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.UpdateJobPhase
     */
    updateJobPhase: {
        methodKind: "unary";
        input: typeof UpdateJobPhaseRequestSchema;
        output: typeof UpdateJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.DeleteJobPhase
     */
    deleteJobPhase: {
        methodKind: "unary";
        input: typeof DeleteJobPhaseRequestSchema;
        output: typeof DeleteJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ListJobPhases
     */
    listJobPhases: {
        methodKind: "unary";
        input: typeof ListJobPhasesRequestSchema;
        output: typeof ListJobPhasesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.GetJobPhaseListPageData
     */
    getJobPhaseListPageData: {
        methodKind: "unary";
        input: typeof GetJobPhaseListPageDataRequestSchema;
        output: typeof GetJobPhaseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.GetJobPhaseItemPageData
     */
    getJobPhaseItemPageData: {
        methodKind: "unary";
        input: typeof GetJobPhaseItemPageDataRequestSchema;
        output: typeof GetJobPhaseItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by job
     *
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListJobPhasesByJobRequestSchema;
        output: typeof ListJobPhasesByJobResponseSchema;
    };
    /**
     * --- Approval transitions (per-phase approval ladder) ---
     * Sheet-grain bulk transitions over one (job_template_id, job_template_phase_id).
     * Requests carry ONLY the sheet identity; actor + workspace resolve from trusted
     * context and are never request-supplied. Responses report the resulting target
     * status and the exact affected phase count. Use cases land in P2.
     *
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.SubmitJobPhaseApproval
     */
    submitJobPhaseApproval: {
        methodKind: "unary";
        input: typeof SubmitJobPhaseApprovalRequestSchema;
        output: typeof SubmitJobPhaseApprovalResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.VerifyJobPhaseApproval
     */
    verifyJobPhaseApproval: {
        methodKind: "unary";
        input: typeof VerifyJobPhaseApprovalRequestSchema;
        output: typeof VerifyJobPhaseApprovalResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.PublishJobPhaseApproval
     */
    publishJobPhaseApproval: {
        methodKind: "unary";
        input: typeof PublishJobPhaseApprovalRequestSchema;
        output: typeof PublishJobPhaseApprovalResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ReturnJobPhaseApproval
     */
    returnJobPhaseApproval: {
        methodKind: "unary";
        input: typeof ReturnJobPhaseApprovalRequestSchema;
        output: typeof ReturnJobPhaseApprovalResponseSchema;
    };
}>;
