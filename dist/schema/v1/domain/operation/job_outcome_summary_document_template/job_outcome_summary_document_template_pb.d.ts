import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { DocumentTemplate } from "../../document/template/template_pb";
import type { VersionStatus } from "../enums/enums_pb";
import type { PriceSchedule } from "../../subscription/price_schedule/price_schedule_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_outcome_summary_document_template/job_outcome_summary_document_template.proto.
 */
export declare const file_domain_operation_job_outcome_summary_document_template_job_outcome_summary_document_template: GenFile;
/**
 * JobOutcomeSummaryDocumentTemplate binds the job_outcome_summary outcome family
 * to a generic document.DocumentTemplate, scoped by workspace + (optional)
 * price_schedule, and versioned. It carries the publication lifecycle and
 * validity window that must NOT live on the shared DocumentTemplate. The binding
 * is implicitly the report-card binding (the only outcome family built today);
 * a document_purpose discriminator can be added additively when a second family
 * (certificate / transcript) needs the same lineage on one workspace+schedule.
 *
 * @generated from message domain.operation.v1.JobOutcomeSummaryDocumentTemplate
 */
export type JobOutcomeSummaryDocumentTemplate = Message<"domain.operation.v1.JobOutcomeSummaryDocumentTemplate"> & {
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
     * NULL = workspace-wide fallback for this binding.
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
     * @generated from field: int32 version = 7;
     */
    version: number;
    /**
     * reuse operation enum (DRAFT/PUBLISHED/DEPRECATED)
     *
     * @generated from field: domain.operation.v1.VersionStatus version_status = 8;
     */
    versionStatus: VersionStatus;
    /**
     * Half-open [validity_start, validity_end), UTC. Absent start = valid from
     * beginning; absent end = open-ended.
     *
     * @generated from field: optional google.protobuf.Timestamp validity_start = 9;
     */
    validityStart?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp validity_end = 10;
     */
    validityEnd?: Timestamp;
    /**
     * @generated from field: optional string supersedes_binding_id = 11;
     */
    supersedesBindingId?: string;
    /**
     * @generated from field: bool active = 12;
     */
    active: boolean;
    /**
     * @generated from field: optional string created_by = 13;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 published_at = 14;
     */
    publishedAt?: bigint;
    /**
     * @generated from field: optional string published_at_string = 15;
     */
    publishedAtString?: string;
    /**
     * @generated from field: optional string published_by = 16;
     */
    publishedBy?: string;
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
 * Describes the message domain.operation.v1.JobOutcomeSummaryDocumentTemplate.
 * Use `create(JobOutcomeSummaryDocumentTemplateSchema)` to create a new message.
 */
export declare const JobOutcomeSummaryDocumentTemplateSchema: GenMessage<JobOutcomeSummaryDocumentTemplate>;
/**
 * @generated from message domain.operation.v1.CreateJobOutcomeSummaryDocumentTemplateRequest
 */
export type CreateJobOutcomeSummaryDocumentTemplateRequest = Message<"domain.operation.v1.CreateJobOutcomeSummaryDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data?: JobOutcomeSummaryDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.CreateJobOutcomeSummaryDocumentTemplateRequest.
 * Use `create(CreateJobOutcomeSummaryDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const CreateJobOutcomeSummaryDocumentTemplateRequestSchema: GenMessage<CreateJobOutcomeSummaryDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobOutcomeSummaryDocumentTemplateResponse
 */
export type CreateJobOutcomeSummaryDocumentTemplateResponse = Message<"domain.operation.v1.CreateJobOutcomeSummaryDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data: JobOutcomeSummaryDocumentTemplate[];
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
 * Describes the message domain.operation.v1.CreateJobOutcomeSummaryDocumentTemplateResponse.
 * Use `create(CreateJobOutcomeSummaryDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const CreateJobOutcomeSummaryDocumentTemplateResponseSchema: GenMessage<CreateJobOutcomeSummaryDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobOutcomeSummaryDocumentTemplateRequest
 */
export type ReadJobOutcomeSummaryDocumentTemplateRequest = Message<"domain.operation.v1.ReadJobOutcomeSummaryDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data?: JobOutcomeSummaryDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.ReadJobOutcomeSummaryDocumentTemplateRequest.
 * Use `create(ReadJobOutcomeSummaryDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const ReadJobOutcomeSummaryDocumentTemplateRequestSchema: GenMessage<ReadJobOutcomeSummaryDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobOutcomeSummaryDocumentTemplateResponse
 */
export type ReadJobOutcomeSummaryDocumentTemplateResponse = Message<"domain.operation.v1.ReadJobOutcomeSummaryDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data: JobOutcomeSummaryDocumentTemplate[];
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
 * Describes the message domain.operation.v1.ReadJobOutcomeSummaryDocumentTemplateResponse.
 * Use `create(ReadJobOutcomeSummaryDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const ReadJobOutcomeSummaryDocumentTemplateResponseSchema: GenMessage<ReadJobOutcomeSummaryDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobOutcomeSummaryDocumentTemplateRequest
 */
export type UpdateJobOutcomeSummaryDocumentTemplateRequest = Message<"domain.operation.v1.UpdateJobOutcomeSummaryDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data?: JobOutcomeSummaryDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.UpdateJobOutcomeSummaryDocumentTemplateRequest.
 * Use `create(UpdateJobOutcomeSummaryDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateJobOutcomeSummaryDocumentTemplateRequestSchema: GenMessage<UpdateJobOutcomeSummaryDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobOutcomeSummaryDocumentTemplateResponse
 */
export type UpdateJobOutcomeSummaryDocumentTemplateResponse = Message<"domain.operation.v1.UpdateJobOutcomeSummaryDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data: JobOutcomeSummaryDocumentTemplate[];
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
 * Describes the message domain.operation.v1.UpdateJobOutcomeSummaryDocumentTemplateResponse.
 * Use `create(UpdateJobOutcomeSummaryDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateJobOutcomeSummaryDocumentTemplateResponseSchema: GenMessage<UpdateJobOutcomeSummaryDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobOutcomeSummaryDocumentTemplateRequest
 */
export type DeleteJobOutcomeSummaryDocumentTemplateRequest = Message<"domain.operation.v1.DeleteJobOutcomeSummaryDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data?: JobOutcomeSummaryDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.DeleteJobOutcomeSummaryDocumentTemplateRequest.
 * Use `create(DeleteJobOutcomeSummaryDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteJobOutcomeSummaryDocumentTemplateRequestSchema: GenMessage<DeleteJobOutcomeSummaryDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobOutcomeSummaryDocumentTemplateResponse
 */
export type DeleteJobOutcomeSummaryDocumentTemplateResponse = Message<"domain.operation.v1.DeleteJobOutcomeSummaryDocumentTemplateResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobOutcomeSummaryDocumentTemplateResponse.
 * Use `create(DeleteJobOutcomeSummaryDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteJobOutcomeSummaryDocumentTemplateResponseSchema: GenMessage<DeleteJobOutcomeSummaryDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ListJobOutcomeSummaryDocumentTemplatesRequest
 */
export type ListJobOutcomeSummaryDocumentTemplatesRequest = Message<"domain.operation.v1.ListJobOutcomeSummaryDocumentTemplatesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobOutcomeSummaryDocumentTemplatesRequest.
 * Use `create(ListJobOutcomeSummaryDocumentTemplatesRequestSchema)` to create a new message.
 */
export declare const ListJobOutcomeSummaryDocumentTemplatesRequestSchema: GenMessage<ListJobOutcomeSummaryDocumentTemplatesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobOutcomeSummaryDocumentTemplatesResponse
 */
export type ListJobOutcomeSummaryDocumentTemplatesResponse = Message<"domain.operation.v1.ListJobOutcomeSummaryDocumentTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data: JobOutcomeSummaryDocumentTemplate[];
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
 * Describes the message domain.operation.v1.ListJobOutcomeSummaryDocumentTemplatesResponse.
 * Use `create(ListJobOutcomeSummaryDocumentTemplatesResponseSchema)` to create a new message.
 */
export declare const ListJobOutcomeSummaryDocumentTemplatesResponseSchema: GenMessage<ListJobOutcomeSummaryDocumentTemplatesResponse>;
/**
 * @generated from message domain.operation.v1.FindApplicableJobOutcomeSummaryDocumentTemplateRequest
 */
export type FindApplicableJobOutcomeSummaryDocumentTemplateRequest = Message<"domain.operation.v1.FindApplicableJobOutcomeSummaryDocumentTemplateRequest"> & {
    /**
     * AY/term scope; empty = fallback only
     *
     * @generated from field: optional string price_schedule_id = 1;
     */
    priceScheduleId?: string;
    /**
     * absent = server UTC now
     *
     * @generated from field: optional google.protobuf.Timestamp as_of = 2;
     */
    asOf?: Timestamp;
};
/**
 * Describes the message domain.operation.v1.FindApplicableJobOutcomeSummaryDocumentTemplateRequest.
 * Use `create(FindApplicableJobOutcomeSummaryDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const FindApplicableJobOutcomeSummaryDocumentTemplateRequestSchema: GenMessage<FindApplicableJobOutcomeSummaryDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.FindApplicableJobOutcomeSummaryDocumentTemplateResponse
 */
export type FindApplicableJobOutcomeSummaryDocumentTemplateResponse = Message<"domain.operation.v1.FindApplicableJobOutcomeSummaryDocumentTemplateResponse"> & {
    /**
     * includes hydrated document_template + price_schedule
     *
     * @generated from field: optional domain.operation.v1.JobOutcomeSummaryDocumentTemplate binding = 1;
     */
    binding?: JobOutcomeSummaryDocumentTemplate;
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
 * Describes the message domain.operation.v1.FindApplicableJobOutcomeSummaryDocumentTemplateResponse.
 * Use `create(FindApplicableJobOutcomeSummaryDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const FindApplicableJobOutcomeSummaryDocumentTemplateResponseSchema: GenMessage<FindApplicableJobOutcomeSummaryDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.PublishJobOutcomeSummaryDocumentTemplateRequest
 */
export type PublishJobOutcomeSummaryDocumentTemplateRequest = Message<"domain.operation.v1.PublishJobOutcomeSummaryDocumentTemplateRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.operation.v1.PublishJobOutcomeSummaryDocumentTemplateRequest.
 * Use `create(PublishJobOutcomeSummaryDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const PublishJobOutcomeSummaryDocumentTemplateRequestSchema: GenMessage<PublishJobOutcomeSummaryDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.PublishJobOutcomeSummaryDocumentTemplateResponse
 */
export type PublishJobOutcomeSummaryDocumentTemplateResponse = Message<"domain.operation.v1.PublishJobOutcomeSummaryDocumentTemplateResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobOutcomeSummaryDocumentTemplate data = 1;
     */
    data?: JobOutcomeSummaryDocumentTemplate;
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
 * Describes the message domain.operation.v1.PublishJobOutcomeSummaryDocumentTemplateResponse.
 * Use `create(PublishJobOutcomeSummaryDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const PublishJobOutcomeSummaryDocumentTemplateResponseSchema: GenMessage<PublishJobOutcomeSummaryDocumentTemplateResponse>;
/**
 * @generated from service domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService
 */
export declare const JobOutcomeSummaryDocumentTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.CreateJobOutcomeSummaryDocumentTemplate
     */
    createJobOutcomeSummaryDocumentTemplate: {
        methodKind: "unary";
        input: typeof CreateJobOutcomeSummaryDocumentTemplateRequestSchema;
        output: typeof CreateJobOutcomeSummaryDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.ReadJobOutcomeSummaryDocumentTemplate
     */
    readJobOutcomeSummaryDocumentTemplate: {
        methodKind: "unary";
        input: typeof ReadJobOutcomeSummaryDocumentTemplateRequestSchema;
        output: typeof ReadJobOutcomeSummaryDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.UpdateJobOutcomeSummaryDocumentTemplate
     */
    updateJobOutcomeSummaryDocumentTemplate: {
        methodKind: "unary";
        input: typeof UpdateJobOutcomeSummaryDocumentTemplateRequestSchema;
        output: typeof UpdateJobOutcomeSummaryDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.DeleteJobOutcomeSummaryDocumentTemplate
     */
    deleteJobOutcomeSummaryDocumentTemplate: {
        methodKind: "unary";
        input: typeof DeleteJobOutcomeSummaryDocumentTemplateRequestSchema;
        output: typeof DeleteJobOutcomeSummaryDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.ListJobOutcomeSummaryDocumentTemplates
     */
    listJobOutcomeSummaryDocumentTemplates: {
        methodKind: "unary";
        input: typeof ListJobOutcomeSummaryDocumentTemplatesRequestSchema;
        output: typeof ListJobOutcomeSummaryDocumentTemplatesResponseSchema;
    };
    /**
     * Controlled publish transaction (NOT arbitrary CRUD update): flips this
     * binding to PUBLISHED and closes the prior published sibling's validity_end
     * in ONE transaction (publish-flips-sibling).
     *
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.PublishJobOutcomeSummaryDocumentTemplate
     */
    publishJobOutcomeSummaryDocumentTemplate: {
        methodKind: "unary";
        input: typeof PublishJobOutcomeSummaryDocumentTemplateRequestSchema;
        output: typeof PublishJobOutcomeSummaryDocumentTemplateResponseSchema;
    };
    /**
     * Resolver: the single applicable, published binding for
     * (price_schedule_id, as_of), workspace-scoped in SQL from trusted context.
     *
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDocumentTemplateDomainService.FindApplicableJobOutcomeSummaryDocumentTemplate
     */
    findApplicableJobOutcomeSummaryDocumentTemplate: {
        methodKind: "unary";
        input: typeof FindApplicableJobOutcomeSummaryDocumentTemplateRequestSchema;
        output: typeof FindApplicableJobOutcomeSummaryDocumentTemplateResponseSchema;
    };
}>;
