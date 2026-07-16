import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../domain/common/pagination_pb";
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
