import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { OverallDetermination, ScoringMethod, SummaryType } from "../enums/enums_pb";
import type { Job } from "../job/job_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_outcome_summary/job_outcome_summary.proto.
 */
export declare const file_domain_operation_job_outcome_summary_job_outcome_summary: GenFile;
/**
 * @generated from message domain.operation.v1.JobOutcomeSummary
 */
export type JobOutcomeSummary = Message<"domain.operation.v1.JobOutcomeSummary"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string job_id = 2;
     */
    jobId: string;
    /**
     * @generated from field: optional domain.operation.v1.Job job = 3;
     */
    job?: Job;
    /**
     * @generated from field: domain.operation.v1.SummaryType summary_type = 4;
     */
    summaryType: SummaryType;
    /**
     * @generated from field: domain.operation.v1.OverallDetermination overall_determination = 5;
     */
    overallDetermination: OverallDetermination;
    /**
     * @generated from field: domain.operation.v1.ScoringMethod scoring_method = 6;
     */
    scoringMethod: ScoringMethod;
    /**
     * @generated from field: optional double summary_score = 7;
     */
    summaryScore?: number;
    /**
     * @generated from field: int32 total_criteria_count = 8;
     */
    totalCriteriaCount: number;
    /**
     * @generated from field: int32 pass_count = 9;
     */
    passCount: number;
    /**
     * @generated from field: int32 fail_count = 10;
     */
    failCount: number;
    /**
     * @generated from field: int32 conditional_count = 11;
     */
    conditionalCount: number;
    /**
     * @generated from field: int32 deferred_count = 12;
     */
    deferredCount: number;
    /**
     * @generated from field: int32 na_count = 13;
     */
    naCount: number;
    /**
     * @generated from field: optional string narrative = 14;
     */
    narrative?: string;
    /**
     * @generated from field: string issued_by = 15;
     */
    issuedBy: string;
    /**
     * @generated from field: optional int64 issued_date = 16;
     */
    issuedDate?: bigint;
    /**
     * @generated from field: optional string valid_until_date = 17;
     */
    validUntilDate?: string;
    /**
     * @generated from field: optional string supersedes_id = 18;
     */
    supersedesId?: string;
    /**
     * @generated from field: repeated string attachment_ids = 19;
     */
    attachmentIds: string[];
    /**
     * @generated from field: bool active = 20;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 21;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 22;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 23;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 24;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.JobOutcomeSummary.
 * Use `create(JobOutcomeSummarySchema)` to create a new message.
 */
export declare const JobOutcomeSummarySchema: GenMessage<JobOutcomeSummary>;
/**
 * @generated from message domain.operation.v1.CreateJobOutcomeSummaryRequest
 */
export type CreateJobOutcomeSummaryRequest = Message<"domain.operation.v1.CreateJobOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data?: JobOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.CreateJobOutcomeSummaryRequest.
 * Use `create(CreateJobOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const CreateJobOutcomeSummaryRequestSchema: GenMessage<CreateJobOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobOutcomeSummaryResponse
 */
export type CreateJobOutcomeSummaryResponse = Message<"domain.operation.v1.CreateJobOutcomeSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data: JobOutcomeSummary[];
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
 * Describes the message domain.operation.v1.CreateJobOutcomeSummaryResponse.
 * Use `create(CreateJobOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const CreateJobOutcomeSummaryResponseSchema: GenMessage<CreateJobOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobOutcomeSummaryRequest
 */
export type ReadJobOutcomeSummaryRequest = Message<"domain.operation.v1.ReadJobOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data?: JobOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.ReadJobOutcomeSummaryRequest.
 * Use `create(ReadJobOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const ReadJobOutcomeSummaryRequestSchema: GenMessage<ReadJobOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobOutcomeSummaryResponse
 */
export type ReadJobOutcomeSummaryResponse = Message<"domain.operation.v1.ReadJobOutcomeSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data: JobOutcomeSummary[];
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
 * Describes the message domain.operation.v1.ReadJobOutcomeSummaryResponse.
 * Use `create(ReadJobOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const ReadJobOutcomeSummaryResponseSchema: GenMessage<ReadJobOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobOutcomeSummaryRequest
 */
export type UpdateJobOutcomeSummaryRequest = Message<"domain.operation.v1.UpdateJobOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data?: JobOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.UpdateJobOutcomeSummaryRequest.
 * Use `create(UpdateJobOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const UpdateJobOutcomeSummaryRequestSchema: GenMessage<UpdateJobOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobOutcomeSummaryResponse
 */
export type UpdateJobOutcomeSummaryResponse = Message<"domain.operation.v1.UpdateJobOutcomeSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data: JobOutcomeSummary[];
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
 * Describes the message domain.operation.v1.UpdateJobOutcomeSummaryResponse.
 * Use `create(UpdateJobOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const UpdateJobOutcomeSummaryResponseSchema: GenMessage<UpdateJobOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobOutcomeSummaryRequest
 */
export type DeleteJobOutcomeSummaryRequest = Message<"domain.operation.v1.DeleteJobOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data?: JobOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.DeleteJobOutcomeSummaryRequest.
 * Use `create(DeleteJobOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const DeleteJobOutcomeSummaryRequestSchema: GenMessage<DeleteJobOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobOutcomeSummaryResponse
 */
export type DeleteJobOutcomeSummaryResponse = Message<"domain.operation.v1.DeleteJobOutcomeSummaryResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobOutcomeSummaryResponse.
 * Use `create(DeleteJobOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const DeleteJobOutcomeSummaryResponseSchema: GenMessage<DeleteJobOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.ListJobOutcomeSummarysRequest
 */
export type ListJobOutcomeSummarysRequest = Message<"domain.operation.v1.ListJobOutcomeSummarysRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobOutcomeSummarysRequest.
 * Use `create(ListJobOutcomeSummarysRequestSchema)` to create a new message.
 */
export declare const ListJobOutcomeSummarysRequestSchema: GenMessage<ListJobOutcomeSummarysRequest>;
/**
 * @generated from message domain.operation.v1.ListJobOutcomeSummarysResponse
 */
export type ListJobOutcomeSummarysResponse = Message<"domain.operation.v1.ListJobOutcomeSummarysResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummary data = 1;
     */
    data: JobOutcomeSummary[];
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
 * Describes the message domain.operation.v1.ListJobOutcomeSummarysResponse.
 * Use `create(ListJobOutcomeSummarysResponseSchema)` to create a new message.
 */
export declare const ListJobOutcomeSummarysResponseSchema: GenMessage<ListJobOutcomeSummarysResponse>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeSummaryListPageDataRequest
 */
export type GetJobOutcomeSummaryListPageDataRequest = Message<"domain.operation.v1.GetJobOutcomeSummaryListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobOutcomeSummaryListPageDataRequest.
 * Use `create(GetJobOutcomeSummaryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobOutcomeSummaryListPageDataRequestSchema: GenMessage<GetJobOutcomeSummaryListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeSummaryListPageDataResponse
 */
export type GetJobOutcomeSummaryListPageDataResponse = Message<"domain.operation.v1.GetJobOutcomeSummaryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobOutcomeSummary job_outcome_summary_list = 1;
     */
    jobOutcomeSummaryList: JobOutcomeSummary[];
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
 * Describes the message domain.operation.v1.GetJobOutcomeSummaryListPageDataResponse.
 * Use `create(GetJobOutcomeSummaryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobOutcomeSummaryListPageDataResponseSchema: GenMessage<GetJobOutcomeSummaryListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeSummaryItemPageDataRequest
 */
export type GetJobOutcomeSummaryItemPageDataRequest = Message<"domain.operation.v1.GetJobOutcomeSummaryItemPageDataRequest"> & {
    /**
     * @generated from field: string job_outcome_summary_id = 1;
     */
    jobOutcomeSummaryId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobOutcomeSummaryItemPageDataRequest.
 * Use `create(GetJobOutcomeSummaryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobOutcomeSummaryItemPageDataRequestSchema: GenMessage<GetJobOutcomeSummaryItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeSummaryItemPageDataResponse
 */
export type GetJobOutcomeSummaryItemPageDataResponse = Message<"domain.operation.v1.GetJobOutcomeSummaryItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobOutcomeSummary job_outcome_summary = 1;
     */
    jobOutcomeSummary?: JobOutcomeSummary;
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
 * Describes the message domain.operation.v1.GetJobOutcomeSummaryItemPageDataResponse.
 * Use `create(GetJobOutcomeSummaryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobOutcomeSummaryItemPageDataResponseSchema: GenMessage<GetJobOutcomeSummaryItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeSummaryByJobRequest
 */
export type GetJobOutcomeSummaryByJobRequest = Message<"domain.operation.v1.GetJobOutcomeSummaryByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobOutcomeSummaryByJobRequest.
 * Use `create(GetJobOutcomeSummaryByJobRequestSchema)` to create a new message.
 */
export declare const GetJobOutcomeSummaryByJobRequestSchema: GenMessage<GetJobOutcomeSummaryByJobRequest>;
/**
 * @generated from message domain.operation.v1.GetJobOutcomeSummaryByJobResponse
 */
export type GetJobOutcomeSummaryByJobResponse = Message<"domain.operation.v1.GetJobOutcomeSummaryByJobResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobOutcomeSummary job_outcome_summary = 1;
     */
    jobOutcomeSummary?: JobOutcomeSummary;
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
 * Describes the message domain.operation.v1.GetJobOutcomeSummaryByJobResponse.
 * Use `create(GetJobOutcomeSummaryByJobResponseSchema)` to create a new message.
 */
export declare const GetJobOutcomeSummaryByJobResponseSchema: GenMessage<GetJobOutcomeSummaryByJobResponse>;
/**
 * @generated from service domain.operation.v1.JobOutcomeSummaryDomainService
 */
export declare const JobOutcomeSummaryDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.CreateJobOutcomeSummary
     */
    createJobOutcomeSummary: {
        methodKind: "unary";
        input: typeof CreateJobOutcomeSummaryRequestSchema;
        output: typeof CreateJobOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.ReadJobOutcomeSummary
     */
    readJobOutcomeSummary: {
        methodKind: "unary";
        input: typeof ReadJobOutcomeSummaryRequestSchema;
        output: typeof ReadJobOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.UpdateJobOutcomeSummary
     */
    updateJobOutcomeSummary: {
        methodKind: "unary";
        input: typeof UpdateJobOutcomeSummaryRequestSchema;
        output: typeof UpdateJobOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.DeleteJobOutcomeSummary
     */
    deleteJobOutcomeSummary: {
        methodKind: "unary";
        input: typeof DeleteJobOutcomeSummaryRequestSchema;
        output: typeof DeleteJobOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.ListJobOutcomeSummarys
     */
    listJobOutcomeSummarys: {
        methodKind: "unary";
        input: typeof ListJobOutcomeSummarysRequestSchema;
        output: typeof ListJobOutcomeSummarysResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.GetJobOutcomeSummaryListPageData
     */
    getJobOutcomeSummaryListPageData: {
        methodKind: "unary";
        input: typeof GetJobOutcomeSummaryListPageDataRequestSchema;
        output: typeof GetJobOutcomeSummaryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.GetJobOutcomeSummaryItemPageData
     */
    getJobOutcomeSummaryItemPageData: {
        methodKind: "unary";
        input: typeof GetJobOutcomeSummaryItemPageDataRequestSchema;
        output: typeof GetJobOutcomeSummaryItemPageDataResponseSchema;
    };
    /**
     * Extra: get latest summary for a job
     *
     * @generated from rpc domain.operation.v1.JobOutcomeSummaryDomainService.GetByJob
     */
    getByJob: {
        methodKind: "unary";
        input: typeof GetJobOutcomeSummaryByJobRequestSchema;
        output: typeof GetJobOutcomeSummaryByJobResponseSchema;
    };
}>;
