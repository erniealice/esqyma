import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { JobTemplate } from "../job_template/job_template_pb";
import type { Plan } from "../../subscription/plan/plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/plan_job_template/plan_job_template.proto.
 */
export declare const file_domain_operation_plan_job_template_plan_job_template: GenFile;
/**
 * PlanJobTemplate is the explicit, ordered Plan composition association.
 * It replaces synthetic empty-root membership without flattening genuine
 * JobTemplateRelation dependency or onboarding edges.
 *
 * @generated from message domain.operation.v1.PlanJobTemplate
 */
export type PlanJobTemplate = Message<"domain.operation.v1.PlanJobTemplate"> & {
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
     * @generated from field: string plan_id = 7;
     */
    planId: string;
    /**
     * @generated from field: optional domain.subscription.v1.Plan plan = 8;
     */
    plan?: Plan;
    /**
     * @generated from field: string job_template_id = 9;
     */
    jobTemplateId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTemplate job_template = 10;
     */
    jobTemplate?: JobTemplate;
    /**
     * @generated from field: int32 sequence_order = 11;
     */
    sequenceOrder: number;
    /**
     * @generated from field: domain.operation.v1.PlanJobTemplateCompositionEntryPattern composition_entry_pattern = 12;
     */
    compositionEntryPattern: PlanJobTemplateCompositionEntryPattern;
    /**
     * @generated from field: string workspace_id = 13;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.operation.v1.PlanJobTemplate.
 * Use `create(PlanJobTemplateSchema)` to create a new message.
 */
export declare const PlanJobTemplateSchema: GenMessage<PlanJobTemplate>;
/**
 * @generated from message domain.operation.v1.CreatePlanJobTemplateRequest
 */
export type CreatePlanJobTemplateRequest = Message<"domain.operation.v1.CreatePlanJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PlanJobTemplate data = 1;
     */
    data?: PlanJobTemplate;
};
/**
 * Describes the message domain.operation.v1.CreatePlanJobTemplateRequest.
 * Use `create(CreatePlanJobTemplateRequestSchema)` to create a new message.
 */
export declare const CreatePlanJobTemplateRequestSchema: GenMessage<CreatePlanJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.CreatePlanJobTemplateResponse
 */
export type CreatePlanJobTemplateResponse = Message<"domain.operation.v1.CreatePlanJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PlanJobTemplate data = 1;
     */
    data: PlanJobTemplate[];
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
 * Describes the message domain.operation.v1.CreatePlanJobTemplateResponse.
 * Use `create(CreatePlanJobTemplateResponseSchema)` to create a new message.
 */
export declare const CreatePlanJobTemplateResponseSchema: GenMessage<CreatePlanJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ReadPlanJobTemplateRequest
 */
export type ReadPlanJobTemplateRequest = Message<"domain.operation.v1.ReadPlanJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PlanJobTemplate data = 1;
     */
    data?: PlanJobTemplate;
};
/**
 * Describes the message domain.operation.v1.ReadPlanJobTemplateRequest.
 * Use `create(ReadPlanJobTemplateRequestSchema)` to create a new message.
 */
export declare const ReadPlanJobTemplateRequestSchema: GenMessage<ReadPlanJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ReadPlanJobTemplateResponse
 */
export type ReadPlanJobTemplateResponse = Message<"domain.operation.v1.ReadPlanJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PlanJobTemplate data = 1;
     */
    data: PlanJobTemplate[];
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
 * Describes the message domain.operation.v1.ReadPlanJobTemplateResponse.
 * Use `create(ReadPlanJobTemplateResponseSchema)` to create a new message.
 */
export declare const ReadPlanJobTemplateResponseSchema: GenMessage<ReadPlanJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.UpdatePlanJobTemplateRequest
 */
export type UpdatePlanJobTemplateRequest = Message<"domain.operation.v1.UpdatePlanJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PlanJobTemplate data = 1;
     */
    data?: PlanJobTemplate;
};
/**
 * Describes the message domain.operation.v1.UpdatePlanJobTemplateRequest.
 * Use `create(UpdatePlanJobTemplateRequestSchema)` to create a new message.
 */
export declare const UpdatePlanJobTemplateRequestSchema: GenMessage<UpdatePlanJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.UpdatePlanJobTemplateResponse
 */
export type UpdatePlanJobTemplateResponse = Message<"domain.operation.v1.UpdatePlanJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PlanJobTemplate data = 1;
     */
    data: PlanJobTemplate[];
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
 * Describes the message domain.operation.v1.UpdatePlanJobTemplateResponse.
 * Use `create(UpdatePlanJobTemplateResponseSchema)` to create a new message.
 */
export declare const UpdatePlanJobTemplateResponseSchema: GenMessage<UpdatePlanJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.DeletePlanJobTemplateRequest
 */
export type DeletePlanJobTemplateRequest = Message<"domain.operation.v1.DeletePlanJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PlanJobTemplate data = 1;
     */
    data?: PlanJobTemplate;
};
/**
 * Describes the message domain.operation.v1.DeletePlanJobTemplateRequest.
 * Use `create(DeletePlanJobTemplateRequestSchema)` to create a new message.
 */
export declare const DeletePlanJobTemplateRequestSchema: GenMessage<DeletePlanJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.DeletePlanJobTemplateResponse
 */
export type DeletePlanJobTemplateResponse = Message<"domain.operation.v1.DeletePlanJobTemplateResponse"> & {
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
 * Describes the message domain.operation.v1.DeletePlanJobTemplateResponse.
 * Use `create(DeletePlanJobTemplateResponseSchema)` to create a new message.
 */
export declare const DeletePlanJobTemplateResponseSchema: GenMessage<DeletePlanJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ListPlanJobTemplatesRequest
 */
export type ListPlanJobTemplatesRequest = Message<"domain.operation.v1.ListPlanJobTemplatesRequest"> & {
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
 * Describes the message domain.operation.v1.ListPlanJobTemplatesRequest.
 * Use `create(ListPlanJobTemplatesRequestSchema)` to create a new message.
 */
export declare const ListPlanJobTemplatesRequestSchema: GenMessage<ListPlanJobTemplatesRequest>;
/**
 * @generated from message domain.operation.v1.ListPlanJobTemplatesResponse
 */
export type ListPlanJobTemplatesResponse = Message<"domain.operation.v1.ListPlanJobTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PlanJobTemplate data = 1;
     */
    data: PlanJobTemplate[];
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
 * Describes the message domain.operation.v1.ListPlanJobTemplatesResponse.
 * Use `create(ListPlanJobTemplatesResponseSchema)` to create a new message.
 */
export declare const ListPlanJobTemplatesResponseSchema: GenMessage<ListPlanJobTemplatesResponse>;
/**
 * @generated from message domain.operation.v1.ListPlanJobTemplatesByPlanRequest
 */
export type ListPlanJobTemplatesByPlanRequest = Message<"domain.operation.v1.ListPlanJobTemplatesByPlanRequest"> & {
    /**
     * @generated from field: string plan_id = 1;
     */
    planId: string;
};
/**
 * Describes the message domain.operation.v1.ListPlanJobTemplatesByPlanRequest.
 * Use `create(ListPlanJobTemplatesByPlanRequestSchema)` to create a new message.
 */
export declare const ListPlanJobTemplatesByPlanRequestSchema: GenMessage<ListPlanJobTemplatesByPlanRequest>;
/**
 * @generated from message domain.operation.v1.ListPlanJobTemplatesByPlanResponse
 */
export type ListPlanJobTemplatesByPlanResponse = Message<"domain.operation.v1.ListPlanJobTemplatesByPlanResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PlanJobTemplate plan_job_templates = 1;
     */
    planJobTemplates: PlanJobTemplate[];
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
 * Describes the message domain.operation.v1.ListPlanJobTemplatesByPlanResponse.
 * Use `create(ListPlanJobTemplatesByPlanResponseSchema)` to create a new message.
 */
export declare const ListPlanJobTemplatesByPlanResponseSchema: GenMessage<ListPlanJobTemplatesByPlanResponse>;
/**
 * PlanJobTemplateCompositionEntryPattern describes how one ordered Plan
 * composition entry materializes. Bundle entries are co-equal operational
 * Jobs. Standalone entries remain substantive roots whose real
 * JobTemplateRelation children keep their parent relationship.
 *
 * @generated from enum domain.operation.v1.PlanJobTemplateCompositionEntryPattern
 */
export declare enum PlanJobTemplateCompositionEntryPattern {
    /**
     * @generated from enum value: PLAN_JOB_TEMPLATE_COMPOSITION_ENTRY_PATTERN_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: PLAN_JOB_TEMPLATE_COMPOSITION_ENTRY_PATTERN_BUNDLE_ENTRY = 1;
     */
    BUNDLE_ENTRY = 1,
    /**
     * @generated from enum value: PLAN_JOB_TEMPLATE_COMPOSITION_ENTRY_PATTERN_STANDALONE_ENTRY = 2;
     */
    STANDALONE_ENTRY = 2
}
/**
 * Describes the enum domain.operation.v1.PlanJobTemplateCompositionEntryPattern.
 */
export declare const PlanJobTemplateCompositionEntryPatternSchema: GenEnum<PlanJobTemplateCompositionEntryPattern>;
/**
 * @generated from service domain.operation.v1.PlanJobTemplateDomainService
 */
export declare const PlanJobTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.PlanJobTemplateDomainService.CreatePlanJobTemplate
     */
    createPlanJobTemplate: {
        methodKind: "unary";
        input: typeof CreatePlanJobTemplateRequestSchema;
        output: typeof CreatePlanJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PlanJobTemplateDomainService.ReadPlanJobTemplate
     */
    readPlanJobTemplate: {
        methodKind: "unary";
        input: typeof ReadPlanJobTemplateRequestSchema;
        output: typeof ReadPlanJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PlanJobTemplateDomainService.UpdatePlanJobTemplate
     */
    updatePlanJobTemplate: {
        methodKind: "unary";
        input: typeof UpdatePlanJobTemplateRequestSchema;
        output: typeof UpdatePlanJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PlanJobTemplateDomainService.DeletePlanJobTemplate
     */
    deletePlanJobTemplate: {
        methodKind: "unary";
        input: typeof DeletePlanJobTemplateRequestSchema;
        output: typeof DeletePlanJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PlanJobTemplateDomainService.ListPlanJobTemplates
     */
    listPlanJobTemplates: {
        methodKind: "unary";
        input: typeof ListPlanJobTemplatesRequestSchema;
        output: typeof ListPlanJobTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PlanJobTemplateDomainService.ListPlanJobTemplatesByPlan
     */
    listPlanJobTemplatesByPlan: {
        methodKind: "unary";
        input: typeof ListPlanJobTemplatesByPlanRequestSchema;
        output: typeof ListPlanJobTemplatesByPlanResponseSchema;
    };
}>;
