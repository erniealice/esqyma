import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { RenderProfile } from "../../../domain/operation/subscription_group_document_template/subscription_group_document_template_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/operation/subscription_group_outcome_export/subscription_group_outcome_export.proto.
 */
export declare const file_service_operation_subscription_group_outcome_export_subscription_group_outcome_export: GenFile;
/**
 * @generated from message service.operation.v1.GetSubscriptionGroupOutcomeExportRequest
 */
export type GetSubscriptionGroupOutcomeExportRequest = Message<"service.operation.v1.GetSubscriptionGroupOutcomeExportRequest"> & {
    /**
     * @generated from field: string subscription_group_id = 1;
     */
    subscriptionGroupId: string;
    /**
     * Optional while requesting options; required when outcome_selector is set.
     *
     * @generated from field: optional string job_category_id = 2;
     */
    jobCategoryId?: string;
    /**
     * @generated from oneof service.operation.v1.GetSubscriptionGroupOutcomeExportRequest.outcome_selector
     */
    outcomeSelector: {
        /**
         * @generated from field: string job_template_phase_code = 3;
         */
        value: string;
        case: "jobTemplatePhaseCode";
    } | {
        /**
         * @generated from field: bool final_outcome = 4;
         */
        value: boolean;
        case: "finalOutcome";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message service.operation.v1.GetSubscriptionGroupOutcomeExportRequest.
 * Use `create(GetSubscriptionGroupOutcomeExportRequestSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupOutcomeExportRequestSchema: GenMessage<GetSubscriptionGroupOutcomeExportRequest>;
/**
 * @generated from message service.operation.v1.SubscriptionGroupOutcomeExportContext
 */
export type SubscriptionGroupOutcomeExportContext = Message<"service.operation.v1.SubscriptionGroupOutcomeExportContext"> & {
    /**
     * @generated from field: string subscription_group_id = 1;
     */
    subscriptionGroupId: string;
    /**
     * @generated from field: string subscription_group_name = 2;
     */
    subscriptionGroupName: string;
    /**
     * @generated from field: optional string price_schedule_id = 3;
     */
    priceScheduleId?: string;
    /**
     * @generated from field: string price_schedule_name = 4;
     */
    priceScheduleName: string;
    /**
     * @generated from field: optional string plan_id = 5;
     */
    planId?: string;
    /**
     * @generated from field: string plan_name = 6;
     */
    planName: string;
    /**
     * @generated from field: bool historical = 7;
     */
    historical: boolean;
};
/**
 * Describes the message service.operation.v1.SubscriptionGroupOutcomeExportContext.
 * Use `create(SubscriptionGroupOutcomeExportContextSchema)` to create a new message.
 */
export declare const SubscriptionGroupOutcomeExportContextSchema: GenMessage<SubscriptionGroupOutcomeExportContext>;
/**
 * @generated from message service.operation.v1.JobTemplatePhaseOption
 */
export type JobTemplatePhaseOption = Message<"service.operation.v1.JobTemplatePhaseOption"> & {
    /**
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: int32 sequence_order = 3;
     */
    sequenceOrder: number;
    /**
     * True when eligible templates disagree about the identity/ordering of this
     * code. Fayna must not offer or export an ambiguous phase.
     *
     * @generated from field: bool ambiguous = 4;
     */
    ambiguous: boolean;
};
/**
 * Describes the message service.operation.v1.JobTemplatePhaseOption.
 * Use `create(JobTemplatePhaseOptionSchema)` to create a new message.
 */
export declare const JobTemplatePhaseOptionSchema: GenMessage<JobTemplatePhaseOption>;
/**
 * @generated from message service.operation.v1.JobCategoryOption
 */
export type JobCategoryOption = Message<"service.operation.v1.JobCategoryOption"> & {
    /**
     * @generated from field: string job_category_id = 1;
     */
    jobCategoryId: string;
    /**
     * @generated from field: string code = 2;
     */
    code: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: int32 sort_order = 4;
     */
    sortOrder: number;
    /**
     * @generated from field: repeated service.operation.v1.JobTemplatePhaseOption job_template_phases = 5;
     */
    jobTemplatePhases: JobTemplatePhaseOption[];
    /**
     * @generated from field: bool final_outcome_available = 6;
     */
    finalOutcomeAvailable: boolean;
};
/**
 * Describes the message service.operation.v1.JobCategoryOption.
 * Use `create(JobCategoryOptionSchema)` to create a new message.
 */
export declare const JobCategoryOptionSchema: GenMessage<JobCategoryOption>;
/**
 * @generated from message service.operation.v1.JobTemplateColumn
 */
export type JobTemplateColumn = Message<"service.operation.v1.JobTemplateColumn"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: string display_name = 2;
     */
    displayName: string;
};
/**
 * Describes the message service.operation.v1.JobTemplateColumn.
 * Use `create(JobTemplateColumnSchema)` to create a new message.
 */
export declare const JobTemplateColumnSchema: GenMessage<JobTemplateColumn>;
/**
 * @generated from message service.operation.v1.EnrollmentEvidence
 */
export type EnrollmentEvidence = Message<"service.operation.v1.EnrollmentEvidence"> & {
    /**
     * @generated from field: bool has_marks = 1;
     */
    hasMarks: boolean;
    /**
     * @generated from field: bool has_positive_mark = 2;
     */
    hasPositiveMark: boolean;
};
/**
 * Describes the message service.operation.v1.EnrollmentEvidence.
 * Use `create(EnrollmentEvidenceSchema)` to create a new message.
 */
export declare const EnrollmentEvidenceSchema: GenMessage<EnrollmentEvidence>;
/**
 * OutcomeCell is lossless. Consumers apply the shared label-first/score-fallback
 * and non-enrolled suppression rules; a stored numeric zero remains present.
 *
 * @generated from message service.operation.v1.SubscriptionGroupOutcomeCell
 */
export type SubscriptionGroupOutcomeCell = Message<"service.operation.v1.SubscriptionGroupOutcomeCell"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
    /**
     * @generated from field: bool job_present = 2;
     */
    jobPresent: boolean;
    /**
     * @generated from field: optional string scaled_label = 3;
     */
    scaledLabel?: string;
    /**
     * @generated from field: optional double scaled_score = 4;
     */
    scaledScore?: number;
    /**
     * @generated from field: service.operation.v1.EnrollmentEvidence enrollment_evidence = 5;
     */
    enrollmentEvidence?: EnrollmentEvidence;
};
/**
 * Describes the message service.operation.v1.SubscriptionGroupOutcomeCell.
 * Use `create(SubscriptionGroupOutcomeCellSchema)` to create a new message.
 */
export declare const SubscriptionGroupOutcomeCellSchema: GenMessage<SubscriptionGroupOutcomeCell>;
/**
 * @generated from message service.operation.v1.SubscriptionGroupOutcomeClientRow
 */
export type SubscriptionGroupOutcomeClientRow = Message<"service.operation.v1.SubscriptionGroupOutcomeClientRow"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * @generated from field: string client_name = 2;
     */
    clientName: string;
    /**
     * @generated from field: string client_first_name = 3;
     */
    clientFirstName: string;
    /**
     * @generated from field: string client_last_name = 4;
     */
    clientLastName: string;
    /**
     * @generated from field: repeated service.operation.v1.SubscriptionGroupOutcomeCell cells = 5;
     */
    cells: SubscriptionGroupOutcomeCell[];
};
/**
 * Describes the message service.operation.v1.SubscriptionGroupOutcomeClientRow.
 * Use `create(SubscriptionGroupOutcomeClientRowSchema)` to create a new message.
 */
export declare const SubscriptionGroupOutcomeClientRowSchema: GenMessage<SubscriptionGroupOutcomeClientRow>;
/**
 * @generated from message service.operation.v1.GetSubscriptionGroupOutcomeExportResponse
 */
export type GetSubscriptionGroupOutcomeExportResponse = Message<"service.operation.v1.GetSubscriptionGroupOutcomeExportResponse"> & {
    /**
     * @generated from field: service.operation.v1.SubscriptionGroupOutcomeExportContext context = 1;
     */
    context?: SubscriptionGroupOutcomeExportContext;
    /**
     * Always returned in options and selected-matrix modes. Each category owns
     * its own phase/final choices; no flat cross-category phase union exists.
     *
     * @generated from field: repeated service.operation.v1.JobCategoryOption job_categories = 2;
     */
    jobCategories: JobCategoryOption[];
    /**
     * Present only for a valid selected category + outcome selector.
     *
     * @generated from field: repeated service.operation.v1.JobTemplateColumn job_template_columns = 3;
     */
    jobTemplateColumns: JobTemplateColumn[];
    /**
     * @generated from field: repeated service.operation.v1.SubscriptionGroupOutcomeClientRow client_rows = 4;
     */
    clientRows: SubscriptionGroupOutcomeClientRow[];
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
 * Describes the message service.operation.v1.GetSubscriptionGroupOutcomeExportResponse.
 * Use `create(GetSubscriptionGroupOutcomeExportResponseSchema)` to create a new message.
 */
export declare const GetSubscriptionGroupOutcomeExportResponseSchema: GenMessage<GetSubscriptionGroupOutcomeExportResponse>;
/**
 * The following messages define an in-process report-render seam. They are not
 * methods on the generated gRPC service and are never registered as transport.
 * Expected group axes are optimistic coherence assertions only; the resolver
 * re-derives them from the authorized group before candidate lookup.
 *
 * @generated from message service.operation.v1.ResolveSubscriptionGroupOutcomeDocumentForRenderRequest
 */
export type ResolveSubscriptionGroupOutcomeDocumentForRenderRequest = Message<"service.operation.v1.ResolveSubscriptionGroupOutcomeDocumentForRenderRequest"> & {
    /**
     * @generated from field: string subscription_group_id = 1;
     */
    subscriptionGroupId: string;
    /**
     * @generated from field: string job_category_id = 2;
     */
    jobCategoryId: string;
    /**
     * @generated from field: domain.operation.v1.RenderProfile render_profile = 3;
     */
    renderProfile: RenderProfile;
    /**
     * @generated from field: optional string expected_plan_id = 4;
     */
    expectedPlanId?: string;
    /**
     * @generated from field: optional string expected_price_schedule_id = 5;
     */
    expectedPriceScheduleId?: string;
};
/**
 * Describes the message service.operation.v1.ResolveSubscriptionGroupOutcomeDocumentForRenderRequest.
 * Use `create(ResolveSubscriptionGroupOutcomeDocumentForRenderRequestSchema)` to create a new message.
 */
export declare const ResolveSubscriptionGroupOutcomeDocumentForRenderRequestSchema: GenMessage<ResolveSubscriptionGroupOutcomeDocumentForRenderRequest>;
/**
 * @generated from message service.operation.v1.ResolvedSubscriptionGroupOutcomeDocument
 */
export type ResolvedSubscriptionGroupOutcomeDocument = Message<"service.operation.v1.ResolvedSubscriptionGroupOutcomeDocument"> & {
    /**
     * @generated from field: string storage_container = 1;
     */
    storageContainer: string;
    /**
     * @generated from field: string storage_key = 2;
     */
    storageKey: string;
    /**
     * @generated from field: domain.operation.v1.RenderProfile render_profile = 3;
     */
    renderProfile: RenderProfile;
    /**
     * @generated from field: string job_category_id = 4;
     */
    jobCategoryId: string;
};
/**
 * Describes the message service.operation.v1.ResolvedSubscriptionGroupOutcomeDocument.
 * Use `create(ResolvedSubscriptionGroupOutcomeDocumentSchema)` to create a new message.
 */
export declare const ResolvedSubscriptionGroupOutcomeDocumentSchema: GenMessage<ResolvedSubscriptionGroupOutcomeDocument>;
/**
 * @generated from message service.operation.v1.ResolveSubscriptionGroupOutcomeDocumentForRenderResponse
 */
export type ResolveSubscriptionGroupOutcomeDocumentForRenderResponse = Message<"service.operation.v1.ResolveSubscriptionGroupOutcomeDocumentForRenderResponse"> & {
    /**
     * @generated from field: optional service.operation.v1.ResolvedSubscriptionGroupOutcomeDocument document = 1;
     */
    document?: ResolvedSubscriptionGroupOutcomeDocument;
    /**
     * @generated from field: bool found = 2;
     */
    found: boolean;
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
 * Describes the message service.operation.v1.ResolveSubscriptionGroupOutcomeDocumentForRenderResponse.
 * Use `create(ResolveSubscriptionGroupOutcomeDocumentForRenderResponseSchema)` to create a new message.
 */
export declare const ResolveSubscriptionGroupOutcomeDocumentForRenderResponseSchema: GenMessage<ResolveSubscriptionGroupOutcomeDocumentForRenderResponse>;
/**
 * SubscriptionGroupOutcomeExportService is the canonical, group-scoped
 * composite read for category/phase options and a selected one-period outcome
 * matrix. It deliberately has no workspace, principal, format, storage, or
 * client-attribute selector.
 *
 * @generated from service service.operation.v1.SubscriptionGroupOutcomeExportService
 */
export declare const SubscriptionGroupOutcomeExportService: GenService<{
    /**
     * @generated from rpc service.operation.v1.SubscriptionGroupOutcomeExportService.GetSubscriptionGroupOutcomeExport
     */
    getSubscriptionGroupOutcomeExport: {
        methodKind: "unary";
        input: typeof GetSubscriptionGroupOutcomeExportRequestSchema;
        output: typeof GetSubscriptionGroupOutcomeExportResponseSchema;
    };
}>;
