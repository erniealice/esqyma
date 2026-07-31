import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../domain/common/pagination_pb";
import type { PhaseApprovalStatus } from "../../../domain/operation/job_phase/job_phase_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/operation/job_template_summary/job_template_summary.proto.
 */
export declare const file_service_operation_job_template_summary_job_template_summary: GenFile;
/**
 * Deliverer is one staff-of-record on a template. A template can have MORE THAN
 * ONE deliverer when its jobs are delivered by several staff (e.g. a merged
 * deliverable whose phases are each delivered by a different staff — each holds
 * an active subscription_seat whose product_plan matches the template's umbrella
 * output product). Generic: no vertical nouns (education: a Section's two
 * rotation-strand Teachers).
 *
 * @generated from message service.operation.v1.Deliverer
 */
export type Deliverer = Message<"service.operation.v1.Deliverer"> & {
    /**
     * @generated from field: string staff_id = 1;
     */
    staffId: string;
    /**
     * @generated from field: string staff_name = 2;
     */
    staffName: string;
};
/**
 * Describes the message service.operation.v1.Deliverer.
 * Use `create(DelivererSchema)` to create a new message.
 */
export declare const DelivererSchema: GenMessage<Deliverer>;
/**
 * JobTemplateSummary is one aggregated delivery-summary row: one row per
 * job_template with >=1 resolver-scoped job for the requested status. Every id
 * is an opaque, generic entity id; every *_name is a display label the adapter
 * resolves server-side.
 *
 * @generated from message service.operation.v1.JobTemplateSummary
 */
export type JobTemplateSummary = Message<"service.operation.v1.JobTemplateSummary"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string job_template_name = 2;
     */
    jobTemplateName: string;
    /**
     * the delivery group (education: Section)
     *
     * @generated from field: string subscription_group_id = 3;
     */
    subscriptionGroupId: string;
    /**
     * @generated from field: string subscription_group_name = 4;
     */
    subscriptionGroupName: string;
    /**
     * DISTINCT resolver-scoped jobs on the template
     *
     * @generated from field: int32 job_count = 7;
     */
    jobCount: number;
    /**
     * the group's price schedule
     *
     * @generated from field: string price_schedule_id = 8;
     */
    priceScheduleId: string;
    /**
     * @generated from field: string price_schedule_name = 9;
     */
    priceScheduleName: string;
    /**
     * the template's deliverable product
     *
     * @generated from field: string output_product_id = 10;
     */
    outputProductId: string;
    /**
     * @generated from field: string output_product_name = 11;
     */
    outputProductName: string;
    /**
     * all staff of record (>=1), sort-stable
     *
     * @generated from field: repeated service.operation.v1.Deliverer deliverers = 12;
     */
    deliverers: Deliverer[];
    /**
     * job_category_id (field 13, R9 W-A1) — the template's CURRENT job_category FK
     * (job_template.job_category_id, proto field 32), the AUTHORITATIVE category
     * partition for the report-cards landing (plan 20260719-report-cards-landing
     * §3.0/§3.1). Nullable in the DB (a template may carry no category); the postgres
     * adapter scans it with sql.NullString → "" on NULL, and the view maps "" to the
     * single "Uncategorized" bucket. Declared as a plain string (NOT proto3 `optional`)
     * to match this message's sibling nullable fields — price_schedule_id / price_
     * schedule_name / output_product_id / output_product_name are all LEFT-join-nullable
     * and all scan sql.NullString → "" into plain strings — and the "NULL → empty
     * string" read-model contract (§3.1).
     *
     * @generated from field: string job_category_id = 13;
     */
    jobCategoryId: string;
    /**
     * --- Phase-approval preaggregate (R7 P4; fields 14–17 per the LOCKED tag
     * allocation in plan 20260718-phase-approval-workflow §4.5, recorded
     * identically in 20260719-report-cards-landing §3.5; fields 18–21 per the
     * AMENDED dual-grain contract of the same two sections + Q-R9-1). Derived
     * from the SAME resolver-scoped job set as the row (codex-tandem: STAFF and
     * admin see the chip over the same job scope as the row's counts).
     *
     * A "phase" below is one SHEET (job_template_phase instance); a sheet is
     * DATA-BEARING when >=1 active task_outcome exists under an active job_task
     * of its active job_phase rows. No-data sheets are EXCLUDED from every
     * count/denominator (the D3/Q-R9-1 contract). lowest_status is the
     * conservative LOWEST approval ladder rank across the data-bearing sheets'
     * job_phase rows; mixed_attention is true when any data-bearing sheet is
     * internally mixed (its rows sit at differing statuses — the derived
     * Attention overlay). With ZERO data-bearing sheets the counts are 0 and the
     * status is PHASE_APPROVAL_STATUS_UNSPECIFIED (render the neutral
     * not-started default; UNSPECIFIED is never persisted, plan §4.1).
     *
     * TEMPLATE-WIDE grain (14–17): over ALL scoped rows of the template — the
     * /courses list row chip ("n/m published" + lowest state, D3).
     *
     * data-bearing sheets whose every row is PUBLISHED
     *
     * @generated from field: int32 published_count = 14;
     */
    publishedCount: number;
    /**
     * data-bearing sheets (the denominator)
     *
     * @generated from field: int32 phase_count = 15;
     */
    phaseCount: number;
    /**
     * conservative lowest across data-bearing sheets
     *
     * @generated from field: domain.operation.v1.PhaseApprovalStatus lowest_status = 16;
     */
    lowestStatus: PhaseApprovalStatus;
    /**
     * any data-bearing sheet internally mixed
     *
     * @generated from field: bool mixed_attention = 17;
     */
    mixedAttention: boolean;
    /**
     * GROUP+TEMPLATE grain (18–21): the SAME quadruple restricted to THIS row's
     * (subscription_group, template) slice — the R9 Phase-B cell grain (Q-R9-1:
     * subject state = group_lowest_status; the landing derives its four-status
     * subject distribution per (group, category) cell by counting summary rows
     * per group_lowest_status). Computed EXPLICITLY alongside 14–17 so the
     * courses row keeps template-wide semantics while the landing cell reads
     * per-group state — one consumer's semantics never silently changes for the
     * other (codex-plan-review §7 wave 5).
     *
     * @generated from field: int32 group_published_count = 18;
     */
    groupPublishedCount: number;
    /**
     * @generated from field: int32 group_phase_count = 19;
     */
    groupPhaseCount: number;
    /**
     * @generated from field: domain.operation.v1.PhaseApprovalStatus group_lowest_status = 20;
     */
    groupLowestStatus: PhaseApprovalStatus;
    /**
     * @generated from field: bool group_mixed_attention = 21;
     */
    groupMixedAttention: boolean;
};
/**
 * Describes the message service.operation.v1.JobTemplateSummary.
 * Use `create(JobTemplateSummarySchema)` to create a new message.
 */
export declare const JobTemplateSummarySchema: GenMessage<JobTemplateSummary>;
/**
 * @generated from message service.operation.v1.ListJobTemplateSummariesRequest
 */
export type ListJobTemplateSummariesRequest = Message<"service.operation.v1.ListJobTemplateSummariesRequest"> & {
    /**
     * status is the job status token the job.status column stores (the full
     * JobStatus enum name, e.g. "JOB_STATUS_ACTIVE"); the adapter filters jobs
     * server-side by it. Empty = no status filter.
     *
     * @generated from field: string status = 1;
     */
    status: string;
    /**
     * subscription_group_id optionally narrows the summary to one delivery group.
     *
     * @generated from field: optional string subscription_group_id = 2;
     */
    subscriptionGroupId?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 3;
     */
    pagination?: PaginationRequest;
    /**
     * price_schedule_active (Q-GSE-7, additive, school-admin only). When present
     * and true, the adapter restricts the summary to templates whose group price
     * schedule is currently active (the AY-scoping predicate). ABSENT ⇒ no
     * schedule predicate (today's behaviour — all schedules).
     *
     * @generated from field: optional bool price_schedule_active = 4;
     */
    priceScheduleActive?: boolean;
};
/**
 * Describes the message service.operation.v1.ListJobTemplateSummariesRequest.
 * Use `create(ListJobTemplateSummariesRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateSummariesRequestSchema: GenMessage<ListJobTemplateSummariesRequest>;
/**
 * @generated from message service.operation.v1.ListJobTemplateSummariesResponse
 */
export type ListJobTemplateSummariesResponse = Message<"service.operation.v1.ListJobTemplateSummariesResponse"> & {
    /**
     * @generated from field: repeated service.operation.v1.JobTemplateSummary summaries = 1;
     */
    summaries: JobTemplateSummary[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 3;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message service.operation.v1.ListJobTemplateSummariesResponse.
 * Use `create(ListJobTemplateSummariesResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateSummariesResponseSchema: GenMessage<ListJobTemplateSummariesResponse>;
/**
 * @generated from service service.operation.v1.JobTemplateSummaryService
 */
export declare const JobTemplateSummaryService: GenService<{
    /**
     * @generated from rpc service.operation.v1.JobTemplateSummaryService.ListJobTemplateSummaries
     */
    listJobTemplateSummaries: {
        methodKind: "unary";
        input: typeof ListJobTemplateSummariesRequestSchema;
        output: typeof ListJobTemplateSummariesResponseSchema;
    };
}>;
