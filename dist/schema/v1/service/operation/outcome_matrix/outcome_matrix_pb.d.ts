import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { OutcomeCriteria } from "../../../domain/operation/outcome_criteria/outcome_criteria_pb";
import type { PhaseApprovalStatus } from "../../../domain/operation/job_phase/job_phase_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/operation/outcome_matrix/outcome_matrix.proto.
 */
export declare const file_service_operation_outcome_matrix_outcome_matrix: GenFile;
/**
 * @generated from message service.operation.v1.GetOutcomeMatrixRequest
 */
export type GetOutcomeMatrixRequest = Message<"service.operation.v1.GetOutcomeMatrixRequest"> & {
    /**
     * REQUIRED — the page is one template (subject)
     *
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: service.operation.v1.OutcomeMatrixScope scope = 2;
     */
    scope: OutcomeMatrixScope;
    /**
     * Narrow rows to one delivery group's members. Field 3 unchanged (wire
     * compatible); RENAMED from section_id 2026-07-25 — "section" is education
     * vocabulary and belongs in lyngua, not in a generic contract. The display
     * slug stays /section/{group_id} via the education route overrides.
     *
     * @generated from field: optional string subscription_group_id = 3;
     */
    subscriptionGroupId?: string;
    /**
     * output_product_id — narrow rows to a product's jobs
     *
     * @generated from field: optional string product_id = 4;
     */
    productId?: string;
};
/**
 * Describes the message service.operation.v1.GetOutcomeMatrixRequest.
 * Use `create(GetOutcomeMatrixRequestSchema)` to create a new message.
 */
export declare const GetOutcomeMatrixRequestSchema: GenMessage<GetOutcomeMatrixRequest>;
/**
 * CriterionColumn is a LEAF column = one template_task_criteria row under a task.
 * It carries the composite cell-address key + the junction's ordering/required,
 * and EMBEDS the full outcome_criteria entity (the enforcement contract — type,
 * min/max, increment, labels, allowed values — lives on the entity, not a copy).
 *
 * @generated from message service.operation.v1.CriterionColumn
 */
export type CriterionColumn = Message<"service.operation.v1.CriterionColumn"> & {
    /**
     * "{job_template_task_id}:{outcome_criteria_id}" — the cell address
     *
     * @generated from field: string column_key = 1;
     */
    columnKey: string;
    /**
     * template_task_criteria.sequence_order
     *
     * @generated from field: int32 sequence_order = 2;
     */
    sequenceOrder: number;
    /**
     * template_task_criteria.required_override (effective)
     *
     * @generated from field: bool required = 3;
     */
    required: boolean;
    /**
     * @generated from field: domain.operation.v1.OutcomeCriteria criteria = 4;
     */
    criteria?: OutcomeCriteria;
};
/**
 * Describes the message service.operation.v1.CriterionColumn.
 * Use `create(CriterionColumnSchema)` to create a new message.
 */
export declare const CriterionColumnSchema: GenMessage<CriterionColumn>;
/**
 * TaskColumn is a thin grouping envelope for one job_template_task.
 *
 * @generated from message service.operation.v1.TaskColumn
 */
export type TaskColumn = Message<"service.operation.v1.TaskColumn"> & {
    /**
     * @generated from field: string job_template_task_id = 1;
     */
    jobTemplateTaskId: string;
    /**
     * task name (e.g. "Summative Assessment 1")
     *
     * @generated from field: string label = 2;
     */
    label: string;
    /**
     * @generated from field: int32 sequence_order = 3;
     */
    sequenceOrder: number;
    /**
     * @generated from field: repeated service.operation.v1.CriterionColumn criteria = 4;
     */
    criteria: CriterionColumn[];
};
/**
 * Describes the message service.operation.v1.TaskColumn.
 * Use `create(TaskColumnSchema)` to create a new message.
 */
export declare const TaskColumnSchema: GenMessage<TaskColumn>;
/**
 * PhaseColumn is a thin grouping envelope for one job_template_phase.
 *
 * @generated from message service.operation.v1.PhaseColumn
 */
export type PhaseColumn = Message<"service.operation.v1.PhaseColumn"> & {
    /**
     * @generated from field: string job_template_phase_id = 1;
     */
    jobTemplatePhaseId: string;
    /**
     * phase name (e.g. "Semester 1")
     *
     * @generated from field: string label = 2;
     */
    label: string;
    /**
     * @generated from field: int32 sequence_order = 3;
     */
    sequenceOrder: number;
    /**
     * @generated from field: repeated service.operation.v1.TaskColumn tasks = 4;
     */
    tasks: TaskColumn[];
    /**
     * Stable machine key from job_template_phase.code (e.g. "s1"/"s2"); empty
     * when unset. Additive (Q8, 20260720 export drawer): lets the view/export key
     * the period axis on the phase CODE rather than the mutable display label —
     * the label is DB data that varies, the code is the reserved semester anchor.
     *
     * @generated from field: string code = 5;
     */
    code: string;
};
/**
 * Describes the message service.operation.v1.PhaseColumn.
 * Use `create(PhaseColumnSchema)` to create a new message.
 */
export declare const PhaseColumnSchema: GenMessage<PhaseColumn>;
/**
 * OutcomeCell is the one genuinely bespoke projection (like reporting's
 * AgingBuckets): a client's resolved outcome for a (template task, criterion).
 * job_task_id is the student's resolved instance ("" if the student has no
 * instance yet — cell not editable); outcome_id is "" until a score is recorded.
 * Value fields mirror task_outcome and are populated per the criterion's type.
 *
 * @generated from message service.operation.v1.OutcomeCell
 */
export type OutcomeCell = Message<"service.operation.v1.OutcomeCell"> & {
    /**
     * task_outcome.id — "" if not yet recorded
     *
     * @generated from field: string outcome_id = 1;
     */
    outcomeId: string;
    /**
     * student's job_task for the column's template task — "" if none
     *
     * @generated from field: string job_task_id = 2;
     */
    jobTaskId: string;
    /**
     * @generated from field: optional double numeric_value = 3;
     */
    numericValue?: number;
    /**
     * @generated from field: optional string text_value = 4;
     */
    textValue?: string;
    /**
     * @generated from field: optional string categorical_value = 5;
     */
    categoricalValue?: string;
    /**
     * @generated from field: optional bool pass_fail_value = 6;
     */
    passFailValue?: boolean;
    /**
     * owner staff_id
     *
     * @generated from field: string recorded_by = 7;
     */
    recordedBy: string;
    /**
     * acting principal may edit (recorded_by == acting staff, or own new instance)
     *
     * @generated from field: bool editable = 8;
     */
    editable: boolean;
    /**
     * Server-derived instance addressing for save-time recompute dedup (Q-GSE-5).
     * The record action recomputes each affected phase/job summary inline on save;
     * it must dedup the (job_phase, job) set from SERVER-derived data, never from
     * attacker-controlled POST keys. These two ids come straight from the same
     * resolved instance row that produced job_task_id (field 2) — "" when the
     * student has no materialised instance for the column yet (cell not editable).
     *
     * student's job_phase for the column's template phase — "" if none
     *
     * @generated from field: string job_phase_id = 9;
     */
    jobPhaseId: string;
    /**
     * student's job for this template (subject) — "" if none
     *
     * @generated from field: string job_id = 10;
     */
    jobId: string;
    /**
     * Grader's free-text determination narrative for this cell, mirrored verbatim
     * from task_outcome.determination_note (f14). "" when no narrative recorded.
     * Additive projection field (20260723 grade-narrative drawer): drives the grid
     * message-glyph filled/outline state and the read/write of the narrative drawer.
     * Type-agnostic (safe for every criteria_type; never conflated with the typed
     * value fields 3-6). NOTHING reads text_value (f4) for narratives post-cutover.
     *
     * @generated from field: optional string determination_note = 11;
     */
    determinationNote?: string;
};
/**
 * Describes the message service.operation.v1.OutcomeCell.
 * Use `create(OutcomeCellSchema)` to create a new message.
 */
export declare const OutcomeCellSchema: GenMessage<OutcomeCell>;
/**
 * @generated from message service.operation.v1.OutcomeRow
 */
export type OutcomeRow = Message<"service.operation.v1.OutcomeRow"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * display label (opaque id unless resolved)
     *
     * @generated from field: string client_label = 2;
     */
    clientLabel: string;
    /**
     * column_key → cell
     *
     * @generated from field: map<string, service.operation.v1.OutcomeCell> cells = 3;
     */
    cells: {
        [key: string]: OutcomeCell;
    };
};
/**
 * Describes the message service.operation.v1.OutcomeRow.
 * Use `create(OutcomeRowSchema)` to create a new message.
 */
export declare const OutcomeRowSchema: GenMessage<OutcomeRow>;
/**
 * PhaseApprovalRollup is the truthful, per-template-phase instance roll-up the
 * approval bar renders (codex-rereview.md fresh finding: "the matrix response
 * already carries enough data for a truthful approval bar" — REFUTED). It is
 * derived over the FULL sheet set S (every active job_phase in the workspace for
 * this template + template_phase), NOT the staff-visible row subset — a teacher
 * on scope=MINE still sees the whole sheet's true state, and the derived state
 * cannot be fabricated from the visible cells alone.
 *
 * `status` is the sole approval status when every member shares one, or the
 * LOWEST status on the ladder when they differ (`mixed` = true then). The four
 * derived overlay states (`not_started`, `mixed/attention`, `hard_frozen`) are
 * NOT enum members — they compose from these fields (not_started = status
 * IN_PROGRESS && !has_data; mixed = the flag; hard_frozen = the flag).
 *
 * @generated from message service.operation.v1.PhaseApprovalRollup
 */
export type PhaseApprovalRollup = Message<"service.operation.v1.PhaseApprovalRollup"> & {
    /**
     * @generated from field: string job_template_phase_id = 1;
     */
    jobTemplatePhaseId: string;
    /**
     * Sole status across the sheet, or the LOWEST ladder status when mixed.
     *
     * @generated from field: domain.operation.v1.PhaseApprovalStatus status = 2;
     */
    status: PhaseApprovalStatus;
    /**
     * the sheet's members are not all in one status
     *
     * @generated from field: bool mixed = 3;
     */
    mixed: boolean;
    /**
     * number of active job_phase rows in the full sheet S
     *
     * @generated from field: int32 target_count = 4;
     */
    targetCount: number;
    /**
     * any active outcome/data under the sheet
     *
     * @generated from field: bool has_data = 5;
     */
    hasData: boolean;
    /**
     * closed schedule OR active authoritative final (plan §4.4)
     *
     * @generated from field: bool hard_frozen = 6;
     */
    hardFrozen: boolean;
    /**
     * Blank required matrix leaves (task × criterion) across S — surfaced in the
     * D6 submit confirmation dialog. Same task×criterion seam the submit
     * transition stamps on its audit event; computed only when the sheet is
     * IN_PROGRESS (submit-eligible), otherwise 0.
     *
     * @generated from field: int32 blank_required_count = 7;
     */
    blankRequiredCount: number;
};
/**
 * Describes the message service.operation.v1.PhaseApprovalRollup.
 * Use `create(PhaseApprovalRollupSchema)` to create a new message.
 */
export declare const PhaseApprovalRollupSchema: GenMessage<PhaseApprovalRollup>;
/**
 * @generated from message service.operation.v1.GetPhaseApprovalGateRollupRequest
 */
export type GetPhaseApprovalGateRollupRequest = Message<"service.operation.v1.GetPhaseApprovalGateRollupRequest"> & {
    /**
     * REQUIRED — the route-validated delivery group. Empty is an ERROR (never
     * "no narrow"): the locked completion contract forbids a group-scoped read
     * from silently degenerating (codex §"Recommended completion contract" #5).
     *
     * @generated from field: string subscription_group_id = 1;
     */
    subscriptionGroupId: string;
    /**
     * REQUIRED, non-empty — the card's target job_template_phase ids (may span
     * several job_templates: a card draws one sheet per subject).
     *
     * @generated from field: repeated string job_template_phase_ids = 2;
     */
    jobTemplatePhaseIds: string[];
};
/**
 * Describes the message service.operation.v1.GetPhaseApprovalGateRollupRequest.
 * Use `create(GetPhaseApprovalGateRollupRequestSchema)` to create a new message.
 */
export declare const GetPhaseApprovalGateRollupRequestSchema: GenMessage<GetPhaseApprovalGateRollupRequest>;
/**
 * PhaseApprovalGateRollup is one (template_phase × group) sheet's gate input,
 * derived over the ACTIVE group-narrowed sheet with the exact shared transition
 * predicate (espyna groupNarrowPredicate — NOT the looser matrix-cells
 * predicate), applied in SQL before aggregation, no LIMIT/OFFSET.
 *
 * @generated from message service.operation.v1.PhaseApprovalGateRollup
 */
export type PhaseApprovalGateRollup = Message<"service.operation.v1.PhaseApprovalGateRollup"> & {
    /**
     * @generated from field: string job_template_phase_id = 1;
     */
    jobTemplatePhaseId: string;
    /**
     * Exact echo of the group id the narrow was applied with. A consumer MUST
     * reject any row whose echo differs from the id it requested.
     *
     * @generated from field: string applied_subscription_group_id = 2;
     */
    appliedSubscriptionGroupId: string;
    /**
     * Active member phases in the group sheet. 0 rows ⇒ the phase is omitted
     * from the response entirely; a consumer requiring coverage treats that as
     * unprovable (its own card is a proven member, so a correct narrow can
     * never return an empty sheet for a phase the card draws from).
     *
     * @generated from field: int32 target_count = 3;
     */
    targetCount: number;
    /**
     * BOOL_OR over the sheet of "workflow entered": approval_status beyond
     * IN_PROGRESS/UNSPECIFIED OR any of the four audit stamps present
     * (submitted_by / verified_by / published_by / returned_by — job_phase
     * fields 41/44/47/51). NEW derived bit — PhaseApprovalRollup lacks it and
     * the never-workflowed carve-out requires it (h2-synthesis agreement #5).
     *
     * @generated from field: bool any_workflow_entered = 4;
     */
    anyWorkflowEntered: boolean;
    /**
     * BOOL_AND over the sheet of approval_status = PUBLISHED.
     *
     * @generated from field: bool all_published = 5;
     */
    allPublished: boolean;
    /**
     * Any active task_outcome under any active job_task of any sheet member.
     *
     * @generated from field: bool has_data = 6;
     */
    hasData: boolean;
};
/**
 * Describes the message service.operation.v1.PhaseApprovalGateRollup.
 * Use `create(PhaseApprovalGateRollupSchema)` to create a new message.
 */
export declare const PhaseApprovalGateRollupSchema: GenMessage<PhaseApprovalGateRollup>;
/**
 * @generated from message service.operation.v1.GetPhaseApprovalGateRollupResponse
 */
export type GetPhaseApprovalGateRollupResponse = Message<"service.operation.v1.GetPhaseApprovalGateRollupResponse"> & {
    /**
     * @generated from field: repeated service.operation.v1.PhaseApprovalGateRollup rollups = 1;
     */
    rollups: PhaseApprovalGateRollup[];
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
 * Describes the message service.operation.v1.GetPhaseApprovalGateRollupResponse.
 * Use `create(GetPhaseApprovalGateRollupResponseSchema)` to create a new message.
 */
export declare const GetPhaseApprovalGateRollupResponseSchema: GenMessage<GetPhaseApprovalGateRollupResponse>;
/**
 * @generated from message service.operation.v1.GetOutcomeMatrixResponse
 */
export type GetOutcomeMatrixResponse = Message<"service.operation.v1.GetOutcomeMatrixResponse"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string job_template_name = 2;
     */
    jobTemplateName: string;
    /**
     * the column tree
     *
     * @generated from field: repeated service.operation.v1.PhaseColumn phases = 3;
     */
    phases: PhaseColumn[];
    /**
     * the client rows
     *
     * @generated from field: repeated service.operation.v1.OutcomeRow rows = 4;
     */
    rows: OutcomeRow[];
    /**
     * @generated from field: bool success = 5;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 6;
     */
    error?: Error;
    /**
     * Per-template-phase approval roll-up, one entry per phase column, derived
     * over the full sheet set S (P3). Empty on mock/non-postgres builds.
     *
     * @generated from field: repeated service.operation.v1.PhaseApprovalRollup approval_rollups = 7;
     */
    approvalRollups: PhaseApprovalRollup[];
};
/**
 * Describes the message service.operation.v1.GetOutcomeMatrixResponse.
 * Use `create(GetOutcomeMatrixResponseSchema)` to create a new message.
 */
export declare const GetOutcomeMatrixResponseSchema: GenMessage<GetOutcomeMatrixResponse>;
/**
 * @generated from message service.operation.v1.GetOutcomeSummaryRosterRequest
 */
export type GetOutcomeSummaryRosterRequest = Message<"service.operation.v1.GetOutcomeSummaryRosterRequest"> & {
    /**
     * REQUIRED — the page is one template (subject)
     *
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: service.operation.v1.OutcomeMatrixScope scope = 2;
     */
    scope: OutcomeMatrixScope;
};
/**
 * Describes the message service.operation.v1.GetOutcomeSummaryRosterRequest.
 * Use `create(GetOutcomeSummaryRosterRequestSchema)` to create a new message.
 */
export declare const GetOutcomeSummaryRosterRequestSchema: GenMessage<GetOutcomeSummaryRosterRequest>;
/**
 * OutcomeSummaryPhaseEntry is one roster member's stored composite pair for one
 * phase. Both values come from the SAME latest active phase_outcome_summary row
 * and are read verbatim:
 *   * summary_score  — the raw composite the scoring scheme combined (pre-transmutation)
 *   * scaled_label   — the transmuted output of that composite (post-transmutation)
 * One row, one upsert, so the pair can never be mutually inconsistent.
 *
 * @generated from message service.operation.v1.OutcomeSummaryPhaseEntry
 */
export type OutcomeSummaryPhaseEntry = Message<"service.operation.v1.OutcomeSummaryPhaseEntry"> & {
    /**
     * @generated from field: string job_template_phase_id = 1;
     */
    jobTemplatePhaseId: string;
    /**
     * job_template_phase.code (e.g. "s1"/"s2"); "" when unset
     *
     * @generated from field: string code = 2;
     */
    code: string;
    /**
     * phase name (e.g. "Semester 1")
     *
     * @generated from field: string label = 3;
     */
    label: string;
    /**
     * job_template_phase.phase_order
     *
     * @generated from field: int32 sequence_order = 4;
     */
    sequenceOrder: number;
    /**
     * stored transmuted composite; "" when none
     *
     * @generated from field: string scaled_label = 5;
     */
    scaledLabel: string;
    /**
     * Stored phase_outcome_summary.summary_score, verbatim; UNSET when the row has
     * none. Presence-tracked on purpose (docs/plan/20260729-criteria-total-rating-rules,
     * Option A / D4): a stored 0 is a real composite and must stay distinguishable
     * from "not computed" — the adapter scans sql.NullFloat64 and must never COALESCE.
     *
     * @generated from field: optional double summary_score = 6;
     */
    summaryScore?: number;
};
/**
 * Describes the message service.operation.v1.OutcomeSummaryPhaseEntry.
 * Use `create(OutcomeSummaryPhaseEntrySchema)` to create a new message.
 */
export declare const OutcomeSummaryPhaseEntrySchema: GenMessage<OutcomeSummaryPhaseEntry>;
/**
 * OutcomeSummaryRosterRow is one student's per-period composites plus the stored
 * year-final (job_outcome_summary.scaled_label + is_authoritative), all verbatim.
 *
 * @generated from message service.operation.v1.OutcomeSummaryRosterRow
 */
export type OutcomeSummaryRosterRow = Message<"service.operation.v1.OutcomeSummaryRosterRow"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * opaque id unless the view resolves a display name (matrix parity)
     *
     * @generated from field: string client_label = 2;
     */
    clientLabel: string;
    /**
     * per-phase composites, sequence order
     *
     * @generated from field: repeated service.operation.v1.OutcomeSummaryPhaseEntry phases = 3;
     */
    phases: OutcomeSummaryPhaseEntry[];
    /**
     * job_outcome_summary.scaled_label, verbatim; "" when none
     *
     * @generated from field: string year_final_label = 4;
     */
    yearFinalLabel: string;
    /**
     * job_outcome_summary.is_authoritative passthrough
     *
     * @generated from field: bool year_final_is_authoritative = 5;
     */
    yearFinalIsAuthoritative: boolean;
};
/**
 * Describes the message service.operation.v1.OutcomeSummaryRosterRow.
 * Use `create(OutcomeSummaryRosterRowSchema)` to create a new message.
 */
export declare const OutcomeSummaryRosterRowSchema: GenMessage<OutcomeSummaryRosterRow>;
/**
 * @generated from message service.operation.v1.GetOutcomeSummaryRosterResponse
 */
export type GetOutcomeSummaryRosterResponse = Message<"service.operation.v1.GetOutcomeSummaryRosterResponse"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: repeated service.operation.v1.OutcomeSummaryRosterRow rows = 2;
     */
    rows: OutcomeSummaryRosterRow[];
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
 * Describes the message service.operation.v1.GetOutcomeSummaryRosterResponse.
 * Use `create(GetOutcomeSummaryRosterResponseSchema)` to create a new message.
 */
export declare const GetOutcomeSummaryRosterResponseSchema: GenMessage<GetOutcomeSummaryRosterResponse>;
/**
 * OutcomeMatrixScope selects the row set. UNSPECIFIED is fail-closed → MINE.
 *
 * @generated from enum service.operation.v1.OutcomeMatrixScope
 */
export declare enum OutcomeMatrixScope {
    /**
     * fail-closed → treated as MINE
     *
     * @generated from enum value: OUTCOME_MATRIX_SCOPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * only clients/outcomes the acting principal is linked to / recorded
     *
     * @generated from enum value: OUTCOME_MATRIX_SCOPE_MINE = 1;
     */
    MINE = 1,
    /**
     * all clients under the template (permission-gated; else downgraded to MINE)
     *
     * @generated from enum value: OUTCOME_MATRIX_SCOPE_ALL = 2;
     */
    ALL = 2
}
/**
 * Describes the enum service.operation.v1.OutcomeMatrixScope.
 */
export declare const OutcomeMatrixScopeSchema: GenEnum<OutcomeMatrixScope>;
/**
 * @generated from service service.operation.v1.OutcomeMatrixService
 */
export declare const OutcomeMatrixService: GenService<{
    /**
     * @generated from rpc service.operation.v1.OutcomeMatrixService.GetOutcomeMatrix
     */
    getOutcomeMatrix: {
        methodKind: "unary";
        input: typeof GetOutcomeMatrixRequestSchema;
        output: typeof GetOutcomeMatrixResponseSchema;
    };
    /**
     * GetOutcomeSummaryRoster is the roster-scoped composite read (20260720
     * export drawer P2): one row per student under a job_template, carrying each
     * phase's stored composite (phase_outcome_summary.scaled_label) and the
     * stored year-final (job_outcome_summary.scaled_label + is_authoritative).
     * Stored values are read VERBATIM — never recomputed (D8). Serves the CSV
     * "Final" export today and the composite PDF builder later (P5).
     *
     * @generated from rpc service.operation.v1.OutcomeMatrixService.GetOutcomeSummaryRoster
     */
    getOutcomeSummaryRoster: {
        methodKind: "unary";
        input: typeof GetOutcomeSummaryRosterRequestSchema;
        output: typeof GetOutcomeSummaryRosterResponseSchema;
    };
    /**
     * GetPhaseApprovalGateRollup is the report-card render gate's group-grain
     * input read (docs/plan/20260729-report-card-render-gate-group-grain).
     * Response is per requested template phase and carries INPUTS, not a verdict —
     * gate policy stays in the consuming view layer. The applied group id is
     * echoed EXACTLY so a caller can prove the narrow was applied to the group it
     * asked for; providers that cannot prove application must error, never
     * return an unnarrowed aggregate.
     *
     * @generated from rpc service.operation.v1.OutcomeMatrixService.GetPhaseApprovalGateRollup
     */
    getPhaseApprovalGateRollup: {
        methodKind: "unary";
        input: typeof GetPhaseApprovalGateRollupRequestSchema;
        output: typeof GetPhaseApprovalGateRollupResponseSchema;
    };
}>;
