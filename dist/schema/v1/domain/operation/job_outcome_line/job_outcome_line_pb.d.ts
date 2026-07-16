import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { ReportingRole } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_outcome_line/job_outcome_line.proto.
 */
export declare const file_domain_operation_job_outcome_line_job_outcome_line: GenFile;
/**
 * @generated from message domain.operation.v1.JobOutcomeLine
 */
export type JobOutcomeLine = Message<"domain.operation.v1.JobOutcomeLine"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string job_outcome_summary_id = 2;
     */
    jobOutcomeSummaryId: string;
    /**
     * @generated from field: string label = 3;
     */
    label: string;
    /**
     * @generated from field: optional double weight_or_credits = 4;
     */
    weightOrCredits?: number;
    /**
     * @generated from field: optional double output_value = 5;
     */
    outputValue?: number;
    /**
     * @generated from field: optional string output_label = 6;
     */
    outputLabel?: string;
    /**
     * @generated from field: optional string score_scale_band_id = 7;
     */
    scoreScaleBandId?: string;
    /**
     * @generated from field: domain.operation.v1.ReportingRole reporting_role = 8;
     */
    reportingRole: ReportingRole;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 10;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 11;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 12;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 13;
     */
    dateModifiedString?: string;
    /**
     * R5 portal-leaf denormalization (2026-06-22): workspace_id + served-client_id
     * are stamped onto this read leaf so the student/guardian portal self-read is
     * single-table + fail-closed (no fail-open on a NULL job.client_id /
     * job.workspace_id join). client_id is optional: a non-client-served line
     * (e.g. a staff-evaluation transcript) leaves it NULL -> portal matches nothing.
     *
     * @generated from field: string workspace_id = 14;
     */
    workspaceId: string;
    /**
     * @generated from field: optional string client_id = 15;
     */
    clientId?: string;
};
/**
 * Describes the message domain.operation.v1.JobOutcomeLine.
 * Use `create(JobOutcomeLineSchema)` to create a new message.
 */
export declare const JobOutcomeLineSchema: GenMessage<JobOutcomeLine>;
/**
 * @generated from message domain.operation.v1.CreateJobOutcomeLineRequest
 */
export type CreateJobOutcomeLineRequest = Message<"domain.operation.v1.CreateJobOutcomeLineRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeLine data = 1;
     */
    data?: JobOutcomeLine;
};
/**
 * Describes the message domain.operation.v1.CreateJobOutcomeLineRequest.
 * Use `create(CreateJobOutcomeLineRequestSchema)` to create a new message.
 */
export declare const CreateJobOutcomeLineRequestSchema: GenMessage<CreateJobOutcomeLineRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobOutcomeLineResponse
 */
export type CreateJobOutcomeLineResponse = Message<"domain.operation.v1.CreateJobOutcomeLineResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeLine data = 1;
     */
    data: JobOutcomeLine[];
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
 * Describes the message domain.operation.v1.CreateJobOutcomeLineResponse.
 * Use `create(CreateJobOutcomeLineResponseSchema)` to create a new message.
 */
export declare const CreateJobOutcomeLineResponseSchema: GenMessage<CreateJobOutcomeLineResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobOutcomeLineRequest
 */
export type ReadJobOutcomeLineRequest = Message<"domain.operation.v1.ReadJobOutcomeLineRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeLine data = 1;
     */
    data?: JobOutcomeLine;
};
/**
 * Describes the message domain.operation.v1.ReadJobOutcomeLineRequest.
 * Use `create(ReadJobOutcomeLineRequestSchema)` to create a new message.
 */
export declare const ReadJobOutcomeLineRequestSchema: GenMessage<ReadJobOutcomeLineRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobOutcomeLineResponse
 */
export type ReadJobOutcomeLineResponse = Message<"domain.operation.v1.ReadJobOutcomeLineResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeLine data = 1;
     */
    data: JobOutcomeLine[];
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
 * Describes the message domain.operation.v1.ReadJobOutcomeLineResponse.
 * Use `create(ReadJobOutcomeLineResponseSchema)` to create a new message.
 */
export declare const ReadJobOutcomeLineResponseSchema: GenMessage<ReadJobOutcomeLineResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobOutcomeLineRequest
 */
export type UpdateJobOutcomeLineRequest = Message<"domain.operation.v1.UpdateJobOutcomeLineRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeLine data = 1;
     */
    data?: JobOutcomeLine;
};
/**
 * Describes the message domain.operation.v1.UpdateJobOutcomeLineRequest.
 * Use `create(UpdateJobOutcomeLineRequestSchema)` to create a new message.
 */
export declare const UpdateJobOutcomeLineRequestSchema: GenMessage<UpdateJobOutcomeLineRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobOutcomeLineResponse
 */
export type UpdateJobOutcomeLineResponse = Message<"domain.operation.v1.UpdateJobOutcomeLineResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeLine data = 1;
     */
    data: JobOutcomeLine[];
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
 * Describes the message domain.operation.v1.UpdateJobOutcomeLineResponse.
 * Use `create(UpdateJobOutcomeLineResponseSchema)` to create a new message.
 */
export declare const UpdateJobOutcomeLineResponseSchema: GenMessage<UpdateJobOutcomeLineResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobOutcomeLineRequest
 */
export type DeleteJobOutcomeLineRequest = Message<"domain.operation.v1.DeleteJobOutcomeLineRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeLine data = 1;
     */
    data?: JobOutcomeLine;
};
/**
 * Describes the message domain.operation.v1.DeleteJobOutcomeLineRequest.
 * Use `create(DeleteJobOutcomeLineRequestSchema)` to create a new message.
 */
export declare const DeleteJobOutcomeLineRequestSchema: GenMessage<DeleteJobOutcomeLineRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobOutcomeLineResponse
 */
export type DeleteJobOutcomeLineResponse = Message<"domain.operation.v1.DeleteJobOutcomeLineResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobOutcomeLineResponse.
 * Use `create(DeleteJobOutcomeLineResponseSchema)` to create a new message.
 */
export declare const DeleteJobOutcomeLineResponseSchema: GenMessage<DeleteJobOutcomeLineResponse>;
/**
 * @generated from message domain.operation.v1.ListJobOutcomeLinesRequest
 */
export type ListJobOutcomeLinesRequest = Message<"domain.operation.v1.ListJobOutcomeLinesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobOutcomeLinesRequest.
 * Use `create(ListJobOutcomeLinesRequestSchema)` to create a new message.
 */
export declare const ListJobOutcomeLinesRequestSchema: GenMessage<ListJobOutcomeLinesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobOutcomeLinesResponse
 */
export type ListJobOutcomeLinesResponse = Message<"domain.operation.v1.ListJobOutcomeLinesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeLine data = 1;
     */
    data: JobOutcomeLine[];
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
 * Describes the message domain.operation.v1.ListJobOutcomeLinesResponse.
 * Use `create(ListJobOutcomeLinesResponseSchema)` to create a new message.
 */
export declare const ListJobOutcomeLinesResponseSchema: GenMessage<ListJobOutcomeLinesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeLineListPageDataRequest
 */
export type GetJobOutcomeLineListPageDataRequest = Message<"domain.operation.v1.GetJobOutcomeLineListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobOutcomeLineListPageDataRequest.
 * Use `create(GetJobOutcomeLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobOutcomeLineListPageDataRequestSchema: GenMessage<GetJobOutcomeLineListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeLineListPageDataResponse
 */
export type GetJobOutcomeLineListPageDataResponse = Message<"domain.operation.v1.GetJobOutcomeLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeLine job_outcome_line_list = 1;
     */
    jobOutcomeLineList: JobOutcomeLine[];
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
 * Describes the message domain.operation.v1.GetJobOutcomeLineListPageDataResponse.
 * Use `create(GetJobOutcomeLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobOutcomeLineListPageDataResponseSchema: GenMessage<GetJobOutcomeLineListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeLineItemPageDataRequest
 */
export type GetJobOutcomeLineItemPageDataRequest = Message<"domain.operation.v1.GetJobOutcomeLineItemPageDataRequest"> & {
    /**
     * @generated from field: string job_outcome_line_id = 1;
     */
    jobOutcomeLineId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobOutcomeLineItemPageDataRequest.
 * Use `create(GetJobOutcomeLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobOutcomeLineItemPageDataRequestSchema: GenMessage<GetJobOutcomeLineItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeLineItemPageDataResponse
 */
export type GetJobOutcomeLineItemPageDataResponse = Message<"domain.operation.v1.GetJobOutcomeLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobOutcomeLine job_outcome_line = 1;
     */
    jobOutcomeLine?: JobOutcomeLine;
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
 * Describes the message domain.operation.v1.GetJobOutcomeLineItemPageDataResponse.
 * Use `create(GetJobOutcomeLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobOutcomeLineItemPageDataResponseSchema: GenMessage<GetJobOutcomeLineItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.JobOutcomeLineDomainService
 */
export declare const JobOutcomeLineDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.CreateJobOutcomeLine
     */
    createJobOutcomeLine: {
        methodKind: "unary";
        input: typeof CreateJobOutcomeLineRequestSchema;
        output: typeof CreateJobOutcomeLineResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.ReadJobOutcomeLine
     */
    readJobOutcomeLine: {
        methodKind: "unary";
        input: typeof ReadJobOutcomeLineRequestSchema;
        output: typeof ReadJobOutcomeLineResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.UpdateJobOutcomeLine
     */
    updateJobOutcomeLine: {
        methodKind: "unary";
        input: typeof UpdateJobOutcomeLineRequestSchema;
        output: typeof UpdateJobOutcomeLineResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.DeleteJobOutcomeLine
     */
    deleteJobOutcomeLine: {
        methodKind: "unary";
        input: typeof DeleteJobOutcomeLineRequestSchema;
        output: typeof DeleteJobOutcomeLineResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.ListJobOutcomeLines
     */
    listJobOutcomeLines: {
        methodKind: "unary";
        input: typeof ListJobOutcomeLinesRequestSchema;
        output: typeof ListJobOutcomeLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.GetJobOutcomeLineListPageData
     */
    getJobOutcomeLineListPageData: {
        methodKind: "unary";
        input: typeof GetJobOutcomeLineListPageDataRequestSchema;
        output: typeof GetJobOutcomeLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeLineDomainService.GetJobOutcomeLineItemPageData
     */
    getJobOutcomeLineItemPageData: {
        methodKind: "unary";
        input: typeof GetJobOutcomeLineItemPageDataRequestSchema;
        output: typeof GetJobOutcomeLineItemPageDataResponseSchema;
    };
}>;
