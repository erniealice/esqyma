import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { DocumentTemplate } from "../../document/template/template_pb";
import type { VersionStatus } from "../enums/enums_pb";
import type { JobCategory } from "../job_category/job_category_pb";
import type { PriceSchedule } from "../../subscription/price_schedule/price_schedule_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_template_document_template/job_template_document_template.proto.
 */
export declare const file_domain_operation_job_template_document_template_job_template_document_template: GenFile;
/**
 * JobTemplateDocumentTemplate binds the job_template rendering surface (the
 * outcome-matrix "grade sheet") to a generic document.DocumentTemplate, scoped
 * by workspace + (optional) price_schedule + (optional) job_category, and
 * versioned. It carries the publication lifecycle and validity window that must
 * NOT live on the shared DocumentTemplate. The job_category axis exists because
 * sheet COLUMN SHAPE is uniform per category (verified 2026-07-20) and the
 * doctemplate engine bakes column shape into each artifact; a document_purpose
 * discriminator can be added additively when a second surface needs the same
 * lineage on one workspace+schedule+category.
 *
 * @generated from message domain.operation.v1.JobTemplateDocumentTemplate
 */
export type JobTemplateDocumentTemplate = Message<"domain.operation.v1.JobTemplateDocumentTemplate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Tenant boundary — never accepted from untrusted resolver input; sourced from
     * trusted context at resolve time.
     *
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * The immutable template artifact this binding version selects.
     *
     * @generated from field: string document_template_id = 3;
     */
    documentTemplateId: string;
    /**
     * hydrate-only (JOIN), never persisted
     *
     * @generated from field: optional domain.document.v1.DocumentTemplate document_template = 4;
     */
    documentTemplate?: DocumentTemplate;
    /**
     * NULL = workspace-wide fallback for this binding (AY axis).
     *
     * @generated from field: optional string price_schedule_id = 5;
     */
    priceScheduleId?: string;
    /**
     * hydrate-only (JOIN, status-agnostic), never persisted
     *
     * @generated from field: optional domain.subscription.v1.PriceSchedule price_schedule = 6;
     */
    priceSchedule?: PriceSchedule;
    /**
     * NULL = any-shape fallback for this binding (sheet-shape axis). The column
     * shape of the rendered sheet is uniform per job_category.
     *
     * @generated from field: optional string job_category_id = 7;
     */
    jobCategoryId?: string;
    /**
     * hydrate-only (JOIN), never persisted
     *
     * @generated from field: optional domain.operation.v1.JobCategory job_category = 8;
     */
    jobCategory?: JobCategory;
    /**
     * @generated from field: int32 version = 9;
     */
    version: number;
    /**
     * reuse operation enum (DRAFT/PUBLISHED/DEPRECATED)
     *
     * @generated from field: domain.operation.v1.VersionStatus version_status = 10;
     */
    versionStatus: VersionStatus;
    /**
     * Half-open [validity_start, validity_end), UTC. Absent start = valid from
     * beginning; absent end = open-ended.
     *
     * @generated from field: optional google.protobuf.Timestamp validity_start = 11;
     */
    validityStart?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp validity_end = 12;
     */
    validityEnd?: Timestamp;
    /**
     * @generated from field: optional string supersedes_binding_id = 13;
     */
    supersedesBindingId?: string;
    /**
     * @generated from field: bool active = 14;
     */
    active: boolean;
    /**
     * @generated from field: optional string created_by = 15;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 published_at = 16;
     */
    publishedAt?: bigint;
    /**
     * @generated from field: optional string published_at_string = 17;
     */
    publishedAtString?: string;
    /**
     * @generated from field: optional string published_by = 18;
     */
    publishedBy?: string;
    /**
     * @generated from field: optional int64 date_created = 19;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 20;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 21;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 22;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.JobTemplateDocumentTemplate.
 * Use `create(JobTemplateDocumentTemplateSchema)` to create a new message.
 */
export declare const JobTemplateDocumentTemplateSchema: GenMessage<JobTemplateDocumentTemplate>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateDocumentTemplateRequest
 */
export type CreateJobTemplateDocumentTemplateRequest = Message<"domain.operation.v1.CreateJobTemplateDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data?: JobTemplateDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.CreateJobTemplateDocumentTemplateRequest.
 * Use `create(CreateJobTemplateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const CreateJobTemplateDocumentTemplateRequestSchema: GenMessage<CreateJobTemplateDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateDocumentTemplateResponse
 */
export type CreateJobTemplateDocumentTemplateResponse = Message<"domain.operation.v1.CreateJobTemplateDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data: JobTemplateDocumentTemplate[];
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
 * Describes the message domain.operation.v1.CreateJobTemplateDocumentTemplateResponse.
 * Use `create(CreateJobTemplateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const CreateJobTemplateDocumentTemplateResponseSchema: GenMessage<CreateJobTemplateDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateDocumentTemplateRequest
 */
export type ReadJobTemplateDocumentTemplateRequest = Message<"domain.operation.v1.ReadJobTemplateDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data?: JobTemplateDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.ReadJobTemplateDocumentTemplateRequest.
 * Use `create(ReadJobTemplateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const ReadJobTemplateDocumentTemplateRequestSchema: GenMessage<ReadJobTemplateDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateDocumentTemplateResponse
 */
export type ReadJobTemplateDocumentTemplateResponse = Message<"domain.operation.v1.ReadJobTemplateDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data: JobTemplateDocumentTemplate[];
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
 * Describes the message domain.operation.v1.ReadJobTemplateDocumentTemplateResponse.
 * Use `create(ReadJobTemplateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const ReadJobTemplateDocumentTemplateResponseSchema: GenMessage<ReadJobTemplateDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateDocumentTemplateRequest
 */
export type UpdateJobTemplateDocumentTemplateRequest = Message<"domain.operation.v1.UpdateJobTemplateDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data?: JobTemplateDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.UpdateJobTemplateDocumentTemplateRequest.
 * Use `create(UpdateJobTemplateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateJobTemplateDocumentTemplateRequestSchema: GenMessage<UpdateJobTemplateDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateDocumentTemplateResponse
 */
export type UpdateJobTemplateDocumentTemplateResponse = Message<"domain.operation.v1.UpdateJobTemplateDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data: JobTemplateDocumentTemplate[];
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
 * Describes the message domain.operation.v1.UpdateJobTemplateDocumentTemplateResponse.
 * Use `create(UpdateJobTemplateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateJobTemplateDocumentTemplateResponseSchema: GenMessage<UpdateJobTemplateDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateDocumentTemplateRequest
 */
export type DeleteJobTemplateDocumentTemplateRequest = Message<"domain.operation.v1.DeleteJobTemplateDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data?: JobTemplateDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.DeleteJobTemplateDocumentTemplateRequest.
 * Use `create(DeleteJobTemplateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteJobTemplateDocumentTemplateRequestSchema: GenMessage<DeleteJobTemplateDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateDocumentTemplateResponse
 */
export type DeleteJobTemplateDocumentTemplateResponse = Message<"domain.operation.v1.DeleteJobTemplateDocumentTemplateResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobTemplateDocumentTemplateResponse.
 * Use `create(DeleteJobTemplateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteJobTemplateDocumentTemplateResponseSchema: GenMessage<DeleteJobTemplateDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateDocumentTemplatesRequest
 */
export type ListJobTemplateDocumentTemplatesRequest = Message<"domain.operation.v1.ListJobTemplateDocumentTemplatesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobTemplateDocumentTemplatesRequest.
 * Use `create(ListJobTemplateDocumentTemplatesRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateDocumentTemplatesRequestSchema: GenMessage<ListJobTemplateDocumentTemplatesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateDocumentTemplatesResponse
 */
export type ListJobTemplateDocumentTemplatesResponse = Message<"domain.operation.v1.ListJobTemplateDocumentTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data: JobTemplateDocumentTemplate[];
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
 * Describes the message domain.operation.v1.ListJobTemplateDocumentTemplatesResponse.
 * Use `create(ListJobTemplateDocumentTemplatesResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateDocumentTemplatesResponseSchema: GenMessage<ListJobTemplateDocumentTemplatesResponse>;
/**
 * @generated from message domain.operation.v1.FindApplicableJobTemplateDocumentTemplateRequest
 */
export type FindApplicableJobTemplateDocumentTemplateRequest = Message<"domain.operation.v1.FindApplicableJobTemplateDocumentTemplateRequest"> & {
    /**
     * AY/term scope; empty = fallback only
     *
     * @generated from field: optional string price_schedule_id = 1;
     */
    priceScheduleId?: string;
    /**
     * sheet-shape scope; empty = any-shape fallback only
     *
     * @generated from field: optional string job_category_id = 2;
     */
    jobCategoryId?: string;
    /**
     * absent = server UTC now
     *
     * @generated from field: optional google.protobuf.Timestamp as_of = 3;
     */
    asOf?: Timestamp;
    /**
     * document_purpose — defense-in-depth family filter on the joined
     * document_template (dt.document_purpose = 'outcome_matrix'): the caller pins
     * the family it wants so a mis-purposed binding can never resolve. Empty = no
     * filter (any purpose). Belt-and-suspenders alongside the settings-list purpose
     * filter, so the sheet resolver can never surface a report-card template.
     *
     * NOTE: no workspace_id — sourced from trusted context in the adapter.
     *
     * @generated from field: optional string document_purpose = 4;
     */
    documentPurpose?: string;
};
/**
 * Describes the message domain.operation.v1.FindApplicableJobTemplateDocumentTemplateRequest.
 * Use `create(FindApplicableJobTemplateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const FindApplicableJobTemplateDocumentTemplateRequestSchema: GenMessage<FindApplicableJobTemplateDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.FindApplicableJobTemplateDocumentTemplateResponse
 */
export type FindApplicableJobTemplateDocumentTemplateResponse = Message<"domain.operation.v1.FindApplicableJobTemplateDocumentTemplateResponse"> & {
    /**
     * includes hydrated document_template + price_schedule + job_category
     *
     * @generated from field: optional domain.operation.v1.JobTemplateDocumentTemplate binding = 1;
     */
    binding?: JobTemplateDocumentTemplate;
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
 * Describes the message domain.operation.v1.FindApplicableJobTemplateDocumentTemplateResponse.
 * Use `create(FindApplicableJobTemplateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const FindApplicableJobTemplateDocumentTemplateResponseSchema: GenMessage<FindApplicableJobTemplateDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.PublishJobTemplateDocumentTemplateRequest
 */
export type PublishJobTemplateDocumentTemplateRequest = Message<"domain.operation.v1.PublishJobTemplateDocumentTemplateRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.operation.v1.PublishJobTemplateDocumentTemplateRequest.
 * Use `create(PublishJobTemplateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const PublishJobTemplateDocumentTemplateRequestSchema: GenMessage<PublishJobTemplateDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.PublishJobTemplateDocumentTemplateResponse
 */
export type PublishJobTemplateDocumentTemplateResponse = Message<"domain.operation.v1.PublishJobTemplateDocumentTemplateResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobTemplateDocumentTemplate data = 1;
     */
    data?: JobTemplateDocumentTemplate;
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
 * Describes the message domain.operation.v1.PublishJobTemplateDocumentTemplateResponse.
 * Use `create(PublishJobTemplateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const PublishJobTemplateDocumentTemplateResponseSchema: GenMessage<PublishJobTemplateDocumentTemplateResponse>;
/**
 * @generated from service domain.operation.v1.JobTemplateDocumentTemplateDomainService
 */
export declare const JobTemplateDocumentTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.CreateJobTemplateDocumentTemplate
     */
    createJobTemplateDocumentTemplate: {
        methodKind: "unary";
        input: typeof CreateJobTemplateDocumentTemplateRequestSchema;
        output: typeof CreateJobTemplateDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.ReadJobTemplateDocumentTemplate
     */
    readJobTemplateDocumentTemplate: {
        methodKind: "unary";
        input: typeof ReadJobTemplateDocumentTemplateRequestSchema;
        output: typeof ReadJobTemplateDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.UpdateJobTemplateDocumentTemplate
     */
    updateJobTemplateDocumentTemplate: {
        methodKind: "unary";
        input: typeof UpdateJobTemplateDocumentTemplateRequestSchema;
        output: typeof UpdateJobTemplateDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.DeleteJobTemplateDocumentTemplate
     */
    deleteJobTemplateDocumentTemplate: {
        methodKind: "unary";
        input: typeof DeleteJobTemplateDocumentTemplateRequestSchema;
        output: typeof DeleteJobTemplateDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.ListJobTemplateDocumentTemplates
     */
    listJobTemplateDocumentTemplates: {
        methodKind: "unary";
        input: typeof ListJobTemplateDocumentTemplatesRequestSchema;
        output: typeof ListJobTemplateDocumentTemplatesResponseSchema;
    };
    /**
     * Controlled publish transaction (NOT arbitrary CRUD update): flips this
     * binding to PUBLISHED and closes the prior published sibling's validity_end
     * in ONE transaction (publish-flips-sibling).
     *
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.PublishJobTemplateDocumentTemplate
     */
    publishJobTemplateDocumentTemplate: {
        methodKind: "unary";
        input: typeof PublishJobTemplateDocumentTemplateRequestSchema;
        output: typeof PublishJobTemplateDocumentTemplateResponseSchema;
    };
    /**
     * Resolver: the single applicable, published binding for
     * (job_category_id, price_schedule_id, as_of), workspace-scoped in SQL from
     * trusted context, most-specific-wins across the category + schedule axes.
     *
     * @generated from rpc domain.operation.v1.JobTemplateDocumentTemplateDomainService.FindApplicableJobTemplateDocumentTemplate
     */
    findApplicableJobTemplateDocumentTemplate: {
        methodKind: "unary";
        input: typeof FindApplicableJobTemplateDocumentTemplateRequestSchema;
        output: typeof FindApplicableJobTemplateDocumentTemplateResponseSchema;
    };
}>;
