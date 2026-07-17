import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { OutcomeCriteria } from "../../../domain/operation/outcome_criteria/outcome_criteria_pb";
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
     * subscription_group_id — narrow rows to a section's members
     *
     * @generated from field: optional string section_id = 3;
     */
    sectionId?: string;
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
};
/**
 * Describes the message service.operation.v1.GetOutcomeMatrixResponse.
 * Use `create(GetOutcomeMatrixResponseSchema)` to create a new message.
 */
export declare const GetOutcomeMatrixResponseSchema: GenMessage<GetOutcomeMatrixResponse>;
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
}>;
