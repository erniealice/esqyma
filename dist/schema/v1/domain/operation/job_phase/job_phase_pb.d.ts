import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Job } from "../job/job_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_phase/job_phase.proto.
 */
export declare const file_domain_operation_job_phase_job_phase: GenFile;
/**
 * @generated from message domain.operation.v1.JobPhase
 */
export type JobPhase = Message<"domain.operation.v1.JobPhase"> & {
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
     * @generated from field: string job_id = 7;
     */
    jobId: string;
    /**
     * @generated from field: optional domain.operation.v1.Job job = 8;
     */
    job?: Job;
    /**
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * @generated from field: int32 phase_order = 10;
     */
    phaseOrder: number;
    /**
     * @generated from field: domain.operation.v1.PhaseStatus status = 11;
     */
    status: PhaseStatus;
};
/**
 * Describes the message domain.operation.v1.JobPhase.
 * Use `create(JobPhaseSchema)` to create a new message.
 */
export declare const JobPhaseSchema: GenMessage<JobPhase>;
/**
 * @generated from message domain.operation.v1.CreateJobPhaseRequest
 */
export type CreateJobPhaseRequest = Message<"domain.operation.v1.CreateJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.CreateJobPhaseRequest.
 * Use `create(CreateJobPhaseRequestSchema)` to create a new message.
 */
export declare const CreateJobPhaseRequestSchema: GenMessage<CreateJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobPhaseResponse
 */
export type CreateJobPhaseResponse = Message<"domain.operation.v1.CreateJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.CreateJobPhaseResponse.
 * Use `create(CreateJobPhaseResponseSchema)` to create a new message.
 */
export declare const CreateJobPhaseResponseSchema: GenMessage<CreateJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobPhaseRequest
 */
export type ReadJobPhaseRequest = Message<"domain.operation.v1.ReadJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.ReadJobPhaseRequest.
 * Use `create(ReadJobPhaseRequestSchema)` to create a new message.
 */
export declare const ReadJobPhaseRequestSchema: GenMessage<ReadJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobPhaseResponse
 */
export type ReadJobPhaseResponse = Message<"domain.operation.v1.ReadJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.ReadJobPhaseResponse.
 * Use `create(ReadJobPhaseResponseSchema)` to create a new message.
 */
export declare const ReadJobPhaseResponseSchema: GenMessage<ReadJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobPhaseRequest
 */
export type UpdateJobPhaseRequest = Message<"domain.operation.v1.UpdateJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.UpdateJobPhaseRequest.
 * Use `create(UpdateJobPhaseRequestSchema)` to create a new message.
 */
export declare const UpdateJobPhaseRequestSchema: GenMessage<UpdateJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobPhaseResponse
 */
export type UpdateJobPhaseResponse = Message<"domain.operation.v1.UpdateJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.UpdateJobPhaseResponse.
 * Use `create(UpdateJobPhaseResponseSchema)` to create a new message.
 */
export declare const UpdateJobPhaseResponseSchema: GenMessage<UpdateJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobPhaseRequest
 */
export type DeleteJobPhaseRequest = Message<"domain.operation.v1.DeleteJobPhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobPhase data = 1;
     */
    data?: JobPhase;
};
/**
 * Describes the message domain.operation.v1.DeleteJobPhaseRequest.
 * Use `create(DeleteJobPhaseRequestSchema)` to create a new message.
 */
export declare const DeleteJobPhaseRequestSchema: GenMessage<DeleteJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobPhaseResponse
 */
export type DeleteJobPhaseResponse = Message<"domain.operation.v1.DeleteJobPhaseResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobPhaseResponse.
 * Use `create(DeleteJobPhaseResponseSchema)` to create a new message.
 */
export declare const DeleteJobPhaseResponseSchema: GenMessage<DeleteJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesRequest
 */
export type ListJobPhasesRequest = Message<"domain.operation.v1.ListJobPhasesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobPhasesRequest.
 * Use `create(ListJobPhasesRequestSchema)` to create a new message.
 */
export declare const ListJobPhasesRequestSchema: GenMessage<ListJobPhasesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesResponse
 */
export type ListJobPhasesResponse = Message<"domain.operation.v1.ListJobPhasesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase data = 1;
     */
    data: JobPhase[];
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
 * Describes the message domain.operation.v1.ListJobPhasesResponse.
 * Use `create(ListJobPhasesResponseSchema)` to create a new message.
 */
export declare const ListJobPhasesResponseSchema: GenMessage<ListJobPhasesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseListPageDataRequest
 */
export type GetJobPhaseListPageDataRequest = Message<"domain.operation.v1.GetJobPhaseListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobPhaseListPageDataRequest.
 * Use `create(GetJobPhaseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobPhaseListPageDataRequestSchema: GenMessage<GetJobPhaseListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseListPageDataResponse
 */
export type GetJobPhaseListPageDataResponse = Message<"domain.operation.v1.GetJobPhaseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase job_phase_list = 1;
     */
    jobPhaseList: JobPhase[];
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
 * Describes the message domain.operation.v1.GetJobPhaseListPageDataResponse.
 * Use `create(GetJobPhaseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobPhaseListPageDataResponseSchema: GenMessage<GetJobPhaseListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseItemPageDataRequest
 */
export type GetJobPhaseItemPageDataRequest = Message<"domain.operation.v1.GetJobPhaseItemPageDataRequest"> & {
    /**
     * @generated from field: string job_phase_id = 1;
     */
    jobPhaseId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobPhaseItemPageDataRequest.
 * Use `create(GetJobPhaseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobPhaseItemPageDataRequestSchema: GenMessage<GetJobPhaseItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobPhaseItemPageDataResponse
 */
export type GetJobPhaseItemPageDataResponse = Message<"domain.operation.v1.GetJobPhaseItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobPhase job_phase = 1;
     */
    jobPhase?: JobPhase;
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
 * Describes the message domain.operation.v1.GetJobPhaseItemPageDataResponse.
 * Use `create(GetJobPhaseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobPhaseItemPageDataResponseSchema: GenMessage<GetJobPhaseItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesByJobRequest
 */
export type ListJobPhasesByJobRequest = Message<"domain.operation.v1.ListJobPhasesByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobPhasesByJobRequest.
 * Use `create(ListJobPhasesByJobRequestSchema)` to create a new message.
 */
export declare const ListJobPhasesByJobRequestSchema: GenMessage<ListJobPhasesByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListJobPhasesByJobResponse
 */
export type ListJobPhasesByJobResponse = Message<"domain.operation.v1.ListJobPhasesByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobPhase job_phases = 1;
     */
    jobPhases: JobPhase[];
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
 * Describes the message domain.operation.v1.ListJobPhasesByJobResponse.
 * Use `create(ListJobPhasesByJobResponseSchema)` to create a new message.
 */
export declare const ListJobPhasesByJobResponseSchema: GenMessage<ListJobPhasesByJobResponse>;
/**
 * @generated from enum domain.operation.v1.PhaseStatus
 */
export declare enum PhaseStatus {
    /**
     * @generated from enum value: PHASE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: PHASE_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: PHASE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: PHASE_STATUS_COMPLETED = 3;
     */
    COMPLETED = 3
}
/**
 * Describes the enum domain.operation.v1.PhaseStatus.
 */
export declare const PhaseStatusSchema: GenEnum<PhaseStatus>;
/**
 * @generated from service domain.operation.v1.JobPhaseDomainService
 */
export declare const JobPhaseDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.CreateJobPhase
     */
    createJobPhase: {
        methodKind: "unary";
        input: typeof CreateJobPhaseRequestSchema;
        output: typeof CreateJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ReadJobPhase
     */
    readJobPhase: {
        methodKind: "unary";
        input: typeof ReadJobPhaseRequestSchema;
        output: typeof ReadJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.UpdateJobPhase
     */
    updateJobPhase: {
        methodKind: "unary";
        input: typeof UpdateJobPhaseRequestSchema;
        output: typeof UpdateJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.DeleteJobPhase
     */
    deleteJobPhase: {
        methodKind: "unary";
        input: typeof DeleteJobPhaseRequestSchema;
        output: typeof DeleteJobPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ListJobPhases
     */
    listJobPhases: {
        methodKind: "unary";
        input: typeof ListJobPhasesRequestSchema;
        output: typeof ListJobPhasesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.GetJobPhaseListPageData
     */
    getJobPhaseListPageData: {
        methodKind: "unary";
        input: typeof GetJobPhaseListPageDataRequestSchema;
        output: typeof GetJobPhaseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.GetJobPhaseItemPageData
     */
    getJobPhaseItemPageData: {
        methodKind: "unary";
        input: typeof GetJobPhaseItemPageDataRequestSchema;
        output: typeof GetJobPhaseItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by job
     *
     * @generated from rpc domain.operation.v1.JobPhaseDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListJobPhasesByJobRequestSchema;
        output: typeof ListJobPhasesByJobResponseSchema;
    };
}>;
