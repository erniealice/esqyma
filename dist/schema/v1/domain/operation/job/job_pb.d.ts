import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Client } from "../../entity/client/client_pb";
import type { Location } from "../../entity/location/location_pb";
import type { ApprovalStatus, BillingRuleType, BillingStatus, CostFlowType, DemandType, FulfillmentType, JobStatus, OriginType, PostingStatus } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job/job.proto.
 */
export declare const file_domain_operation_job_job: GenFile;
/**
 * @generated from message domain.operation.v1.Job
 */
export type Job = Message<"domain.operation.v1.Job"> & {
    /**
     * Identity
     *
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional string job_template_id = 8;
     */
    jobTemplateId?: string;
    /**
     * Origin
     *
     * @generated from field: domain.operation.v1.OriginType origin_type = 10;
     */
    originType: OriginType;
    /**
     * @generated from field: optional string origin_id = 11;
     */
    originId?: string;
    /**
     * @generated from field: optional string client_id = 12;
     */
    clientId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Client client = 13;
     */
    client?: Client;
    /**
     * Target
     *
     * @generated from field: domain.operation.v1.DemandType demand_type = 14;
     */
    demandType: DemandType;
    /**
     * @generated from field: domain.operation.v1.FulfillmentType fulfillment_type = 15;
     */
    fulfillmentType: FulfillmentType;
    /**
     * @generated from field: domain.operation.v1.CostFlowType cost_flow_type = 16;
     */
    costFlowType: CostFlowType;
    /**
     * @generated from field: domain.operation.v1.BillingRuleType billing_rule_type = 17;
     */
    billingRuleType: BillingRuleType;
    /**
     * Lifecycle
     *
     * @generated from field: domain.operation.v1.JobStatus status = 18;
     */
    status: JobStatus;
    /**
     * @generated from field: domain.operation.v1.ApprovalStatus approval_status = 19;
     */
    approvalStatus: ApprovalStatus;
    /**
     * @generated from field: domain.operation.v1.PostingStatus posting_status = 20;
     */
    postingStatus: PostingStatus;
    /**
     * @generated from field: domain.operation.v1.BillingStatus billing_status = 21;
     */
    billingStatus: BillingStatus;
    /**
     * Location
     *
     * @generated from field: optional string location_id = 22;
     */
    locationId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 23;
     */
    location?: Location;
    /**
     * Audit
     *
     * @generated from field: optional string created_by = 24;
     */
    createdBy?: string;
    /**
     * Tenant isolation
     *
     * @generated from field: optional string workspace_id = 25;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.Job.
 * Use `create(JobSchema)` to create a new message.
 */
export declare const JobSchema: GenMessage<Job>;
/**
 * @generated from message domain.operation.v1.CreateJobRequest
 */
export type CreateJobRequest = Message<"domain.operation.v1.CreateJobRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Job data = 1;
     */
    data?: Job;
};
/**
 * Describes the message domain.operation.v1.CreateJobRequest.
 * Use `create(CreateJobRequestSchema)` to create a new message.
 */
export declare const CreateJobRequestSchema: GenMessage<CreateJobRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobResponse
 */
export type CreateJobResponse = Message<"domain.operation.v1.CreateJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job data = 1;
     */
    data: Job[];
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
 * Describes the message domain.operation.v1.CreateJobResponse.
 * Use `create(CreateJobResponseSchema)` to create a new message.
 */
export declare const CreateJobResponseSchema: GenMessage<CreateJobResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobRequest
 */
export type ReadJobRequest = Message<"domain.operation.v1.ReadJobRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Job data = 1;
     */
    data?: Job;
};
/**
 * Describes the message domain.operation.v1.ReadJobRequest.
 * Use `create(ReadJobRequestSchema)` to create a new message.
 */
export declare const ReadJobRequestSchema: GenMessage<ReadJobRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobResponse
 */
export type ReadJobResponse = Message<"domain.operation.v1.ReadJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job data = 1;
     */
    data: Job[];
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
 * Describes the message domain.operation.v1.ReadJobResponse.
 * Use `create(ReadJobResponseSchema)` to create a new message.
 */
export declare const ReadJobResponseSchema: GenMessage<ReadJobResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobRequest
 */
export type UpdateJobRequest = Message<"domain.operation.v1.UpdateJobRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Job data = 1;
     */
    data?: Job;
};
/**
 * Describes the message domain.operation.v1.UpdateJobRequest.
 * Use `create(UpdateJobRequestSchema)` to create a new message.
 */
export declare const UpdateJobRequestSchema: GenMessage<UpdateJobRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobResponse
 */
export type UpdateJobResponse = Message<"domain.operation.v1.UpdateJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job data = 1;
     */
    data: Job[];
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
 * Describes the message domain.operation.v1.UpdateJobResponse.
 * Use `create(UpdateJobResponseSchema)` to create a new message.
 */
export declare const UpdateJobResponseSchema: GenMessage<UpdateJobResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobRequest
 */
export type DeleteJobRequest = Message<"domain.operation.v1.DeleteJobRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Job data = 1;
     */
    data?: Job;
};
/**
 * Describes the message domain.operation.v1.DeleteJobRequest.
 * Use `create(DeleteJobRequestSchema)` to create a new message.
 */
export declare const DeleteJobRequestSchema: GenMessage<DeleteJobRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobResponse
 */
export type DeleteJobResponse = Message<"domain.operation.v1.DeleteJobResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobResponse.
 * Use `create(DeleteJobResponseSchema)` to create a new message.
 */
export declare const DeleteJobResponseSchema: GenMessage<DeleteJobResponse>;
/**
 * @generated from message domain.operation.v1.ListJobsRequest
 */
export type ListJobsRequest = Message<"domain.operation.v1.ListJobsRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobsRequest.
 * Use `create(ListJobsRequestSchema)` to create a new message.
 */
export declare const ListJobsRequestSchema: GenMessage<ListJobsRequest>;
/**
 * @generated from message domain.operation.v1.ListJobsResponse
 */
export type ListJobsResponse = Message<"domain.operation.v1.ListJobsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job data = 1;
     */
    data: Job[];
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
 * Describes the message domain.operation.v1.ListJobsResponse.
 * Use `create(ListJobsResponseSchema)` to create a new message.
 */
export declare const ListJobsResponseSchema: GenMessage<ListJobsResponse>;
/**
 * @generated from message domain.operation.v1.GetJobListPageDataRequest
 */
export type GetJobListPageDataRequest = Message<"domain.operation.v1.GetJobListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobListPageDataRequest.
 * Use `create(GetJobListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobListPageDataRequestSchema: GenMessage<GetJobListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobListPageDataResponse
 */
export type GetJobListPageDataResponse = Message<"domain.operation.v1.GetJobListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job job_list = 1;
     */
    jobList: Job[];
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
 * Describes the message domain.operation.v1.GetJobListPageDataResponse.
 * Use `create(GetJobListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobListPageDataResponseSchema: GenMessage<GetJobListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobItemPageDataRequest
 */
export type GetJobItemPageDataRequest = Message<"domain.operation.v1.GetJobItemPageDataRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobItemPageDataRequest.
 * Use `create(GetJobItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobItemPageDataRequestSchema: GenMessage<GetJobItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobItemPageDataResponse
 */
export type GetJobItemPageDataResponse = Message<"domain.operation.v1.GetJobItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.Job job = 1;
     */
    job?: Job;
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
 * Describes the message domain.operation.v1.GetJobItemPageDataResponse.
 * Use `create(GetJobItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobItemPageDataResponseSchema: GenMessage<GetJobItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobsByClientRequest
 */
export type GetJobsByClientRequest = Message<"domain.operation.v1.GetJobsByClientRequest"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobsByClientRequest.
 * Use `create(GetJobsByClientRequestSchema)` to create a new message.
 */
export declare const GetJobsByClientRequestSchema: GenMessage<GetJobsByClientRequest>;
/**
 * @generated from message domain.operation.v1.GetJobsByClientResponse
 */
export type GetJobsByClientResponse = Message<"domain.operation.v1.GetJobsByClientResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job jobs = 1;
     */
    jobs: Job[];
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
 * Describes the message domain.operation.v1.GetJobsByClientResponse.
 * Use `create(GetJobsByClientResponseSchema)` to create a new message.
 */
export declare const GetJobsByClientResponseSchema: GenMessage<GetJobsByClientResponse>;
/**
 * @generated from message domain.operation.v1.GetJobsByOriginRequest
 */
export type GetJobsByOriginRequest = Message<"domain.operation.v1.GetJobsByOriginRequest"> & {
    /**
     * @generated from field: domain.operation.v1.OriginType origin_type = 1;
     */
    originType: OriginType;
    /**
     * @generated from field: string origin_id = 2;
     */
    originId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobsByOriginRequest.
 * Use `create(GetJobsByOriginRequestSchema)` to create a new message.
 */
export declare const GetJobsByOriginRequestSchema: GenMessage<GetJobsByOriginRequest>;
/**
 * @generated from message domain.operation.v1.GetJobsByOriginResponse
 */
export type GetJobsByOriginResponse = Message<"domain.operation.v1.GetJobsByOriginResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Job jobs = 1;
     */
    jobs: Job[];
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
 * Describes the message domain.operation.v1.GetJobsByOriginResponse.
 * Use `create(GetJobsByOriginResponseSchema)` to create a new message.
 */
export declare const GetJobsByOriginResponseSchema: GenMessage<GetJobsByOriginResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobStatusRequest
 */
export type UpdateJobStatusRequest = Message<"domain.operation.v1.UpdateJobStatusRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
    /**
     * @generated from field: domain.operation.v1.JobStatus status = 2;
     */
    status: JobStatus;
};
/**
 * Describes the message domain.operation.v1.UpdateJobStatusRequest.
 * Use `create(UpdateJobStatusRequestSchema)` to create a new message.
 */
export declare const UpdateJobStatusRequestSchema: GenMessage<UpdateJobStatusRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobStatusResponse
 */
export type UpdateJobStatusResponse = Message<"domain.operation.v1.UpdateJobStatusResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.Job job = 1;
     */
    job?: Job;
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
 * Describes the message domain.operation.v1.UpdateJobStatusResponse.
 * Use `create(UpdateJobStatusResponseSchema)` to create a new message.
 */
export declare const UpdateJobStatusResponseSchema: GenMessage<UpdateJobStatusResponse>;
/**
 * @generated from service domain.operation.v1.JobDomainService
 */
export declare const JobDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.CreateJob
     */
    createJob: {
        methodKind: "unary";
        input: typeof CreateJobRequestSchema;
        output: typeof CreateJobResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.ReadJob
     */
    readJob: {
        methodKind: "unary";
        input: typeof ReadJobRequestSchema;
        output: typeof ReadJobResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.UpdateJob
     */
    updateJob: {
        methodKind: "unary";
        input: typeof UpdateJobRequestSchema;
        output: typeof UpdateJobResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.DeleteJob
     */
    deleteJob: {
        methodKind: "unary";
        input: typeof DeleteJobRequestSchema;
        output: typeof DeleteJobResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.ListJobs
     */
    listJobs: {
        methodKind: "unary";
        input: typeof ListJobsRequestSchema;
        output: typeof ListJobsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.GetJobListPageData
     */
    getJobListPageData: {
        methodKind: "unary";
        input: typeof GetJobListPageDataRequestSchema;
        output: typeof GetJobListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.GetJobItemPageData
     */
    getJobItemPageData: {
        methodKind: "unary";
        input: typeof GetJobItemPageDataRequestSchema;
        output: typeof GetJobItemPageDataResponseSchema;
    };
    /**
     * Extra RPCs
     *
     * @generated from rpc domain.operation.v1.JobDomainService.GetJobsByClient
     */
    getJobsByClient: {
        methodKind: "unary";
        input: typeof GetJobsByClientRequestSchema;
        output: typeof GetJobsByClientResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.GetJobsByOrigin
     */
    getJobsByOrigin: {
        methodKind: "unary";
        input: typeof GetJobsByOriginRequestSchema;
        output: typeof GetJobsByOriginResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobDomainService.UpdateJobStatus
     */
    updateJobStatus: {
        methodKind: "unary";
        input: typeof UpdateJobStatusRequestSchema;
        output: typeof UpdateJobStatusResponseSchema;
    };
}>;
