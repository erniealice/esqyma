import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobTemplatePhase } from "../job_template_phase/job_template_phase_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_template_task/job_template_task.proto.
 */
export declare const file_domain_operation_job_template_task_job_template_task: GenFile;
/**
 * @generated from message domain.operation.v1.JobTemplateTask
 */
export type JobTemplateTask = Message<"domain.operation.v1.JobTemplateTask"> & {
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
     * @generated from field: string job_template_phase_id = 7;
     */
    jobTemplatePhaseId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTemplatePhase job_template_phase = 8;
     */
    jobTemplatePhase?: JobTemplatePhase;
    /**
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * @generated from field: int32 step_order = 10;
     */
    stepOrder: number;
    /**
     * @generated from field: optional int32 estimated_duration_minutes = 11;
     */
    estimatedDurationMinutes?: number;
    /**
     * @generated from field: optional string resource_id = 12;
     */
    resourceId?: string;
    /**
     * @generated from field: optional string skill_required = 13;
     */
    skillRequired?: string;
    /**
     * @generated from field: optional double quantity_factor = 14;
     */
    quantityFactor?: number;
    /**
     * @generated from field: optional int32 standard_labor_minutes = 15;
     */
    standardLaborMinutes?: number;
    /**
     * @generated from field: optional int32 standard_machine_minutes = 16;
     */
    standardMachineMinutes?: number;
    /**
     * @generated from field: optional int32 setup_minutes = 17;
     */
    setupMinutes?: number;
    /**
     * @generated from field: optional double run_minutes_per_unit = 18;
     */
    runMinutesPerUnit?: number;
    /**
     * @generated from field: optional int32 teardown_minutes = 19;
     */
    teardownMinutes?: number;
    /**
     * @generated from field: optional string tool_required = 20;
     */
    toolRequired?: string;
    /**
     * @generated from field: optional string instruction_doc_id = 21;
     */
    instructionDocId?: string;
    /**
     * @generated from field: optional string workflow_step_id = 22;
     */
    workflowStepId?: string;
};
/**
 * Describes the message domain.operation.v1.JobTemplateTask.
 * Use `create(JobTemplateTaskSchema)` to create a new message.
 */
export declare const JobTemplateTaskSchema: GenMessage<JobTemplateTask>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateTaskRequest
 */
export type CreateJobTemplateTaskRequest = Message<"domain.operation.v1.CreateJobTemplateTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateTask data = 1;
     */
    data?: JobTemplateTask;
};
/**
 * Describes the message domain.operation.v1.CreateJobTemplateTaskRequest.
 * Use `create(CreateJobTemplateTaskRequestSchema)` to create a new message.
 */
export declare const CreateJobTemplateTaskRequestSchema: GenMessage<CreateJobTemplateTaskRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateTaskResponse
 */
export type CreateJobTemplateTaskResponse = Message<"domain.operation.v1.CreateJobTemplateTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateTask data = 1;
     */
    data: JobTemplateTask[];
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
 * Describes the message domain.operation.v1.CreateJobTemplateTaskResponse.
 * Use `create(CreateJobTemplateTaskResponseSchema)` to create a new message.
 */
export declare const CreateJobTemplateTaskResponseSchema: GenMessage<CreateJobTemplateTaskResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateTaskRequest
 */
export type ReadJobTemplateTaskRequest = Message<"domain.operation.v1.ReadJobTemplateTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateTask data = 1;
     */
    data?: JobTemplateTask;
};
/**
 * Describes the message domain.operation.v1.ReadJobTemplateTaskRequest.
 * Use `create(ReadJobTemplateTaskRequestSchema)` to create a new message.
 */
export declare const ReadJobTemplateTaskRequestSchema: GenMessage<ReadJobTemplateTaskRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateTaskResponse
 */
export type ReadJobTemplateTaskResponse = Message<"domain.operation.v1.ReadJobTemplateTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateTask data = 1;
     */
    data: JobTemplateTask[];
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
 * Describes the message domain.operation.v1.ReadJobTemplateTaskResponse.
 * Use `create(ReadJobTemplateTaskResponseSchema)` to create a new message.
 */
export declare const ReadJobTemplateTaskResponseSchema: GenMessage<ReadJobTemplateTaskResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateTaskRequest
 */
export type UpdateJobTemplateTaskRequest = Message<"domain.operation.v1.UpdateJobTemplateTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateTask data = 1;
     */
    data?: JobTemplateTask;
};
/**
 * Describes the message domain.operation.v1.UpdateJobTemplateTaskRequest.
 * Use `create(UpdateJobTemplateTaskRequestSchema)` to create a new message.
 */
export declare const UpdateJobTemplateTaskRequestSchema: GenMessage<UpdateJobTemplateTaskRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateTaskResponse
 */
export type UpdateJobTemplateTaskResponse = Message<"domain.operation.v1.UpdateJobTemplateTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateTask data = 1;
     */
    data: JobTemplateTask[];
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
 * Describes the message domain.operation.v1.UpdateJobTemplateTaskResponse.
 * Use `create(UpdateJobTemplateTaskResponseSchema)` to create a new message.
 */
export declare const UpdateJobTemplateTaskResponseSchema: GenMessage<UpdateJobTemplateTaskResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateTaskRequest
 */
export type DeleteJobTemplateTaskRequest = Message<"domain.operation.v1.DeleteJobTemplateTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateTask data = 1;
     */
    data?: JobTemplateTask;
};
/**
 * Describes the message domain.operation.v1.DeleteJobTemplateTaskRequest.
 * Use `create(DeleteJobTemplateTaskRequestSchema)` to create a new message.
 */
export declare const DeleteJobTemplateTaskRequestSchema: GenMessage<DeleteJobTemplateTaskRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateTaskResponse
 */
export type DeleteJobTemplateTaskResponse = Message<"domain.operation.v1.DeleteJobTemplateTaskResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobTemplateTaskResponse.
 * Use `create(DeleteJobTemplateTaskResponseSchema)` to create a new message.
 */
export declare const DeleteJobTemplateTaskResponseSchema: GenMessage<DeleteJobTemplateTaskResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateTasksRequest
 */
export type ListJobTemplateTasksRequest = Message<"domain.operation.v1.ListJobTemplateTasksRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobTemplateTasksRequest.
 * Use `create(ListJobTemplateTasksRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateTasksRequestSchema: GenMessage<ListJobTemplateTasksRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateTasksResponse
 */
export type ListJobTemplateTasksResponse = Message<"domain.operation.v1.ListJobTemplateTasksResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateTask data = 1;
     */
    data: JobTemplateTask[];
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
 * Describes the message domain.operation.v1.ListJobTemplateTasksResponse.
 * Use `create(ListJobTemplateTasksResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateTasksResponseSchema: GenMessage<ListJobTemplateTasksResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateTaskListPageDataRequest
 */
export type GetJobTemplateTaskListPageDataRequest = Message<"domain.operation.v1.GetJobTemplateTaskListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobTemplateTaskListPageDataRequest.
 * Use `create(GetJobTemplateTaskListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplateTaskListPageDataRequestSchema: GenMessage<GetJobTemplateTaskListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateTaskListPageDataResponse
 */
export type GetJobTemplateTaskListPageDataResponse = Message<"domain.operation.v1.GetJobTemplateTaskListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateTask job_template_task_list = 1;
     */
    jobTemplateTaskList: JobTemplateTask[];
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
 * Describes the message domain.operation.v1.GetJobTemplateTaskListPageDataResponse.
 * Use `create(GetJobTemplateTaskListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplateTaskListPageDataResponseSchema: GenMessage<GetJobTemplateTaskListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateTaskItemPageDataRequest
 */
export type GetJobTemplateTaskItemPageDataRequest = Message<"domain.operation.v1.GetJobTemplateTaskItemPageDataRequest"> & {
    /**
     * @generated from field: string job_template_task_id = 1;
     */
    jobTemplateTaskId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobTemplateTaskItemPageDataRequest.
 * Use `create(GetJobTemplateTaskItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplateTaskItemPageDataRequestSchema: GenMessage<GetJobTemplateTaskItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateTaskItemPageDataResponse
 */
export type GetJobTemplateTaskItemPageDataResponse = Message<"domain.operation.v1.GetJobTemplateTaskItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobTemplateTask job_template_task = 1;
     */
    jobTemplateTask?: JobTemplateTask;
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
 * Describes the message domain.operation.v1.GetJobTemplateTaskItemPageDataResponse.
 * Use `create(GetJobTemplateTaskItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplateTaskItemPageDataResponseSchema: GenMessage<GetJobTemplateTaskItemPageDataResponse>;
/**
 * Extra RPC messages
 *
 * @generated from message domain.operation.v1.ListJobTemplateTasksByPhaseRequest
 */
export type ListJobTemplateTasksByPhaseRequest = Message<"domain.operation.v1.ListJobTemplateTasksByPhaseRequest"> & {
    /**
     * @generated from field: string job_template_phase_id = 1;
     */
    jobTemplatePhaseId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobTemplateTasksByPhaseRequest.
 * Use `create(ListJobTemplateTasksByPhaseRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateTasksByPhaseRequestSchema: GenMessage<ListJobTemplateTasksByPhaseRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateTasksByPhaseResponse
 */
export type ListJobTemplateTasksByPhaseResponse = Message<"domain.operation.v1.ListJobTemplateTasksByPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateTask job_template_tasks = 1;
     */
    jobTemplateTasks: JobTemplateTask[];
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
 * Describes the message domain.operation.v1.ListJobTemplateTasksByPhaseResponse.
 * Use `create(ListJobTemplateTasksByPhaseResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateTasksByPhaseResponseSchema: GenMessage<ListJobTemplateTasksByPhaseResponse>;
/**
 * @generated from service domain.operation.v1.JobTemplateTaskDomainService
 */
export declare const JobTemplateTaskDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.CreateJobTemplateTask
     */
    createJobTemplateTask: {
        methodKind: "unary";
        input: typeof CreateJobTemplateTaskRequestSchema;
        output: typeof CreateJobTemplateTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.ReadJobTemplateTask
     */
    readJobTemplateTask: {
        methodKind: "unary";
        input: typeof ReadJobTemplateTaskRequestSchema;
        output: typeof ReadJobTemplateTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.UpdateJobTemplateTask
     */
    updateJobTemplateTask: {
        methodKind: "unary";
        input: typeof UpdateJobTemplateTaskRequestSchema;
        output: typeof UpdateJobTemplateTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.DeleteJobTemplateTask
     */
    deleteJobTemplateTask: {
        methodKind: "unary";
        input: typeof DeleteJobTemplateTaskRequestSchema;
        output: typeof DeleteJobTemplateTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.ListJobTemplateTasks
     */
    listJobTemplateTasks: {
        methodKind: "unary";
        input: typeof ListJobTemplateTasksRequestSchema;
        output: typeof ListJobTemplateTasksResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.GetJobTemplateTaskListPageData
     */
    getJobTemplateTaskListPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplateTaskListPageDataRequestSchema;
        output: typeof GetJobTemplateTaskListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.GetJobTemplateTaskItemPageData
     */
    getJobTemplateTaskItemPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplateTaskItemPageDataRequestSchema;
        output: typeof GetJobTemplateTaskItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by phase
     *
     * @generated from rpc domain.operation.v1.JobTemplateTaskDomainService.ListByPhase
     */
    listByPhase: {
        methodKind: "unary";
        input: typeof ListJobTemplateTasksByPhaseRequestSchema;
        output: typeof ListJobTemplateTasksByPhaseResponseSchema;
    };
}>;
