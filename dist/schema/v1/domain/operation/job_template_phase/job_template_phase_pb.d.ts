import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobTemplate } from "../job_template/job_template_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_template_phase/job_template_phase.proto.
 */
export declare const file_domain_operation_job_template_phase_job_template_phase: GenFile;
/**
 * @generated from message domain.operation.v1.JobTemplatePhase
 */
export type JobTemplatePhase = Message<"domain.operation.v1.JobTemplatePhase"> & {
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
     * @generated from field: string job_template_id = 7;
     */
    jobTemplateId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTemplate job_template = 8;
     */
    jobTemplate?: JobTemplate;
    /**
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * @generated from field: int32 phase_order = 10;
     */
    phaseOrder: number;
    /**
     * @generated from field: optional string resource_id = 11;
     */
    resourceId?: string;
    /**
     * @generated from field: optional int32 setup_minutes = 12;
     */
    setupMinutes?: number;
    /**
     * @generated from field: optional double run_minutes_per_unit = 13;
     */
    runMinutesPerUnit?: number;
    /**
     * @generated from field: optional int32 teardown_minutes = 14;
     */
    teardownMinutes?: number;
    /**
     * @generated from field: optional string predecessor_template_phase_id = 15;
     */
    predecessorTemplatePhaseId?: string;
};
/**
 * Describes the message domain.operation.v1.JobTemplatePhase.
 * Use `create(JobTemplatePhaseSchema)` to create a new message.
 */
export declare const JobTemplatePhaseSchema: GenMessage<JobTemplatePhase>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplatePhaseRequest
 */
export type CreateJobTemplatePhaseRequest = Message<"domain.operation.v1.CreateJobTemplatePhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplatePhase data = 1;
     */
    data?: JobTemplatePhase;
};
/**
 * Describes the message domain.operation.v1.CreateJobTemplatePhaseRequest.
 * Use `create(CreateJobTemplatePhaseRequestSchema)` to create a new message.
 */
export declare const CreateJobTemplatePhaseRequestSchema: GenMessage<CreateJobTemplatePhaseRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplatePhaseResponse
 */
export type CreateJobTemplatePhaseResponse = Message<"domain.operation.v1.CreateJobTemplatePhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplatePhase data = 1;
     */
    data: JobTemplatePhase[];
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
 * Describes the message domain.operation.v1.CreateJobTemplatePhaseResponse.
 * Use `create(CreateJobTemplatePhaseResponseSchema)` to create a new message.
 */
export declare const CreateJobTemplatePhaseResponseSchema: GenMessage<CreateJobTemplatePhaseResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplatePhaseRequest
 */
export type ReadJobTemplatePhaseRequest = Message<"domain.operation.v1.ReadJobTemplatePhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplatePhase data = 1;
     */
    data?: JobTemplatePhase;
};
/**
 * Describes the message domain.operation.v1.ReadJobTemplatePhaseRequest.
 * Use `create(ReadJobTemplatePhaseRequestSchema)` to create a new message.
 */
export declare const ReadJobTemplatePhaseRequestSchema: GenMessage<ReadJobTemplatePhaseRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplatePhaseResponse
 */
export type ReadJobTemplatePhaseResponse = Message<"domain.operation.v1.ReadJobTemplatePhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplatePhase data = 1;
     */
    data: JobTemplatePhase[];
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
 * Describes the message domain.operation.v1.ReadJobTemplatePhaseResponse.
 * Use `create(ReadJobTemplatePhaseResponseSchema)` to create a new message.
 */
export declare const ReadJobTemplatePhaseResponseSchema: GenMessage<ReadJobTemplatePhaseResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplatePhaseRequest
 */
export type UpdateJobTemplatePhaseRequest = Message<"domain.operation.v1.UpdateJobTemplatePhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplatePhase data = 1;
     */
    data?: JobTemplatePhase;
};
/**
 * Describes the message domain.operation.v1.UpdateJobTemplatePhaseRequest.
 * Use `create(UpdateJobTemplatePhaseRequestSchema)` to create a new message.
 */
export declare const UpdateJobTemplatePhaseRequestSchema: GenMessage<UpdateJobTemplatePhaseRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplatePhaseResponse
 */
export type UpdateJobTemplatePhaseResponse = Message<"domain.operation.v1.UpdateJobTemplatePhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplatePhase data = 1;
     */
    data: JobTemplatePhase[];
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
 * Describes the message domain.operation.v1.UpdateJobTemplatePhaseResponse.
 * Use `create(UpdateJobTemplatePhaseResponseSchema)` to create a new message.
 */
export declare const UpdateJobTemplatePhaseResponseSchema: GenMessage<UpdateJobTemplatePhaseResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplatePhaseRequest
 */
export type DeleteJobTemplatePhaseRequest = Message<"domain.operation.v1.DeleteJobTemplatePhaseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplatePhase data = 1;
     */
    data?: JobTemplatePhase;
};
/**
 * Describes the message domain.operation.v1.DeleteJobTemplatePhaseRequest.
 * Use `create(DeleteJobTemplatePhaseRequestSchema)` to create a new message.
 */
export declare const DeleteJobTemplatePhaseRequestSchema: GenMessage<DeleteJobTemplatePhaseRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplatePhaseResponse
 */
export type DeleteJobTemplatePhaseResponse = Message<"domain.operation.v1.DeleteJobTemplatePhaseResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobTemplatePhaseResponse.
 * Use `create(DeleteJobTemplatePhaseResponseSchema)` to create a new message.
 */
export declare const DeleteJobTemplatePhaseResponseSchema: GenMessage<DeleteJobTemplatePhaseResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplatePhasesRequest
 */
export type ListJobTemplatePhasesRequest = Message<"domain.operation.v1.ListJobTemplatePhasesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobTemplatePhasesRequest.
 * Use `create(ListJobTemplatePhasesRequestSchema)` to create a new message.
 */
export declare const ListJobTemplatePhasesRequestSchema: GenMessage<ListJobTemplatePhasesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplatePhasesResponse
 */
export type ListJobTemplatePhasesResponse = Message<"domain.operation.v1.ListJobTemplatePhasesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplatePhase data = 1;
     */
    data: JobTemplatePhase[];
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
 * Describes the message domain.operation.v1.ListJobTemplatePhasesResponse.
 * Use `create(ListJobTemplatePhasesResponseSchema)` to create a new message.
 */
export declare const ListJobTemplatePhasesResponseSchema: GenMessage<ListJobTemplatePhasesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplatePhaseListPageDataRequest
 */
export type GetJobTemplatePhaseListPageDataRequest = Message<"domain.operation.v1.GetJobTemplatePhaseListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobTemplatePhaseListPageDataRequest.
 * Use `create(GetJobTemplatePhaseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplatePhaseListPageDataRequestSchema: GenMessage<GetJobTemplatePhaseListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplatePhaseListPageDataResponse
 */
export type GetJobTemplatePhaseListPageDataResponse = Message<"domain.operation.v1.GetJobTemplatePhaseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplatePhase job_template_phase_list = 1;
     */
    jobTemplatePhaseList: JobTemplatePhase[];
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
 * Describes the message domain.operation.v1.GetJobTemplatePhaseListPageDataResponse.
 * Use `create(GetJobTemplatePhaseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplatePhaseListPageDataResponseSchema: GenMessage<GetJobTemplatePhaseListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplatePhaseItemPageDataRequest
 */
export type GetJobTemplatePhaseItemPageDataRequest = Message<"domain.operation.v1.GetJobTemplatePhaseItemPageDataRequest"> & {
    /**
     * @generated from field: string job_template_phase_id = 1;
     */
    jobTemplatePhaseId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobTemplatePhaseItemPageDataRequest.
 * Use `create(GetJobTemplatePhaseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplatePhaseItemPageDataRequestSchema: GenMessage<GetJobTemplatePhaseItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplatePhaseItemPageDataResponse
 */
export type GetJobTemplatePhaseItemPageDataResponse = Message<"domain.operation.v1.GetJobTemplatePhaseItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobTemplatePhase job_template_phase = 1;
     */
    jobTemplatePhase?: JobTemplatePhase;
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
 * Describes the message domain.operation.v1.GetJobTemplatePhaseItemPageDataResponse.
 * Use `create(GetJobTemplatePhaseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplatePhaseItemPageDataResponseSchema: GenMessage<GetJobTemplatePhaseItemPageDataResponse>;
/**
 * Extra RPC messages
 *
 * @generated from message domain.operation.v1.ListByJobTemplateRequest
 */
export type ListByJobTemplateRequest = Message<"domain.operation.v1.ListByJobTemplateRequest"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
};
/**
 * Describes the message domain.operation.v1.ListByJobTemplateRequest.
 * Use `create(ListByJobTemplateRequestSchema)` to create a new message.
 */
export declare const ListByJobTemplateRequestSchema: GenMessage<ListByJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ListByJobTemplateResponse
 */
export type ListByJobTemplateResponse = Message<"domain.operation.v1.ListByJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplatePhase job_template_phases = 1;
     */
    jobTemplatePhases: JobTemplatePhase[];
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
 * Describes the message domain.operation.v1.ListByJobTemplateResponse.
 * Use `create(ListByJobTemplateResponseSchema)` to create a new message.
 */
export declare const ListByJobTemplateResponseSchema: GenMessage<ListByJobTemplateResponse>;
/**
 * @generated from service domain.operation.v1.JobTemplatePhaseDomainService
 */
export declare const JobTemplatePhaseDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.CreateJobTemplatePhase
     */
    createJobTemplatePhase: {
        methodKind: "unary";
        input: typeof CreateJobTemplatePhaseRequestSchema;
        output: typeof CreateJobTemplatePhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.ReadJobTemplatePhase
     */
    readJobTemplatePhase: {
        methodKind: "unary";
        input: typeof ReadJobTemplatePhaseRequestSchema;
        output: typeof ReadJobTemplatePhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.UpdateJobTemplatePhase
     */
    updateJobTemplatePhase: {
        methodKind: "unary";
        input: typeof UpdateJobTemplatePhaseRequestSchema;
        output: typeof UpdateJobTemplatePhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.DeleteJobTemplatePhase
     */
    deleteJobTemplatePhase: {
        methodKind: "unary";
        input: typeof DeleteJobTemplatePhaseRequestSchema;
        output: typeof DeleteJobTemplatePhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.ListJobTemplatePhases
     */
    listJobTemplatePhases: {
        methodKind: "unary";
        input: typeof ListJobTemplatePhasesRequestSchema;
        output: typeof ListJobTemplatePhasesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.GetJobTemplatePhaseListPageData
     */
    getJobTemplatePhaseListPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplatePhaseListPageDataRequestSchema;
        output: typeof GetJobTemplatePhaseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.GetJobTemplatePhaseItemPageData
     */
    getJobTemplatePhaseItemPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplatePhaseItemPageDataRequestSchema;
        output: typeof GetJobTemplatePhaseItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by job template
     *
     * @generated from rpc domain.operation.v1.JobTemplatePhaseDomainService.ListByJobTemplate
     */
    listByJobTemplate: {
        methodKind: "unary";
        input: typeof ListByJobTemplateRequestSchema;
        output: typeof ListByJobTemplateResponseSchema;
    };
}>;
