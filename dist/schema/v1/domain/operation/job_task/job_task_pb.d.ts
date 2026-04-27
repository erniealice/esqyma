import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobPhase } from "../job_phase/job_phase_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_task/job_task.proto.
 */
export declare const file_domain_operation_job_task_job_task: GenFile;
/**
 * @generated from message domain.operation.v1.JobTask
 */
export type JobTask = Message<"domain.operation.v1.JobTask"> & {
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
     * @generated from field: string job_phase_id = 7;
     */
    jobPhaseId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobPhase job_phase = 8;
     */
    jobPhase?: JobPhase;
    /**
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * @generated from field: int32 step_order = 10;
     */
    stepOrder: number;
    /**
     * @generated from field: domain.operation.v1.TaskStatus status = 11;
     */
    status: TaskStatus;
    /**
     * @generated from field: bool is_ad_hoc = 12;
     */
    isAdHoc: boolean;
    /**
     * @generated from field: optional string assigned_to = 13;
     */
    assignedTo?: string;
    /**
     * @generated from field: optional string template_task_id = 14;
     */
    templateTaskId?: string;
    /**
     * @generated from field: optional string resource_id = 15;
     */
    resourceId?: string;
    /**
     * @generated from field: optional double planned_quantity = 16;
     */
    plannedQuantity?: number;
    /**
     * @generated from field: optional double completed_quantity = 17;
     */
    completedQuantity?: number;
    /**
     * @generated from field: optional double percent_complete = 18;
     */
    percentComplete?: number;
    /**
     * @generated from field: optional int64 actual_start = 19;
     */
    actualStart?: bigint;
    /**
     * @generated from field: optional string actual_start_string = 20;
     */
    actualStartString?: string;
    /**
     * @generated from field: optional int64 actual_end = 21;
     */
    actualEnd?: bigint;
    /**
     * @generated from field: optional string actual_end_string = 22;
     */
    actualEndString?: string;
    /**
     * @generated from field: repeated string predecessor_task_ids = 23;
     */
    predecessorTaskIds: string[];
    /**
     * @generated from field: optional bool allow_parallel = 24;
     */
    allowParallel?: boolean;
    /**
     * @generated from field: optional string workflow_step_id = 25;
     */
    workflowStepId?: string;
};
/**
 * Describes the message domain.operation.v1.JobTask.
 * Use `create(JobTaskSchema)` to create a new message.
 */
export declare const JobTaskSchema: GenMessage<JobTask>;
/**
 * @generated from message domain.operation.v1.CreateJobTaskRequest
 */
export type CreateJobTaskRequest = Message<"domain.operation.v1.CreateJobTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTask data = 1;
     */
    data?: JobTask;
};
/**
 * Describes the message domain.operation.v1.CreateJobTaskRequest.
 * Use `create(CreateJobTaskRequestSchema)` to create a new message.
 */
export declare const CreateJobTaskRequestSchema: GenMessage<CreateJobTaskRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobTaskResponse
 */
export type CreateJobTaskResponse = Message<"domain.operation.v1.CreateJobTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask data = 1;
     */
    data: JobTask[];
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
 * Describes the message domain.operation.v1.CreateJobTaskResponse.
 * Use `create(CreateJobTaskResponseSchema)` to create a new message.
 */
export declare const CreateJobTaskResponseSchema: GenMessage<CreateJobTaskResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobTaskRequest
 */
export type ReadJobTaskRequest = Message<"domain.operation.v1.ReadJobTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTask data = 1;
     */
    data?: JobTask;
};
/**
 * Describes the message domain.operation.v1.ReadJobTaskRequest.
 * Use `create(ReadJobTaskRequestSchema)` to create a new message.
 */
export declare const ReadJobTaskRequestSchema: GenMessage<ReadJobTaskRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobTaskResponse
 */
export type ReadJobTaskResponse = Message<"domain.operation.v1.ReadJobTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask data = 1;
     */
    data: JobTask[];
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
 * Describes the message domain.operation.v1.ReadJobTaskResponse.
 * Use `create(ReadJobTaskResponseSchema)` to create a new message.
 */
export declare const ReadJobTaskResponseSchema: GenMessage<ReadJobTaskResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobTaskRequest
 */
export type UpdateJobTaskRequest = Message<"domain.operation.v1.UpdateJobTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTask data = 1;
     */
    data?: JobTask;
};
/**
 * Describes the message domain.operation.v1.UpdateJobTaskRequest.
 * Use `create(UpdateJobTaskRequestSchema)` to create a new message.
 */
export declare const UpdateJobTaskRequestSchema: GenMessage<UpdateJobTaskRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobTaskResponse
 */
export type UpdateJobTaskResponse = Message<"domain.operation.v1.UpdateJobTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask data = 1;
     */
    data: JobTask[];
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
 * Describes the message domain.operation.v1.UpdateJobTaskResponse.
 * Use `create(UpdateJobTaskResponseSchema)` to create a new message.
 */
export declare const UpdateJobTaskResponseSchema: GenMessage<UpdateJobTaskResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobTaskRequest
 */
export type DeleteJobTaskRequest = Message<"domain.operation.v1.DeleteJobTaskRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTask data = 1;
     */
    data?: JobTask;
};
/**
 * Describes the message domain.operation.v1.DeleteJobTaskRequest.
 * Use `create(DeleteJobTaskRequestSchema)` to create a new message.
 */
export declare const DeleteJobTaskRequestSchema: GenMessage<DeleteJobTaskRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobTaskResponse
 */
export type DeleteJobTaskResponse = Message<"domain.operation.v1.DeleteJobTaskResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobTaskResponse.
 * Use `create(DeleteJobTaskResponseSchema)` to create a new message.
 */
export declare const DeleteJobTaskResponseSchema: GenMessage<DeleteJobTaskResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTasksRequest
 */
export type ListJobTasksRequest = Message<"domain.operation.v1.ListJobTasksRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobTasksRequest.
 * Use `create(ListJobTasksRequestSchema)` to create a new message.
 */
export declare const ListJobTasksRequestSchema: GenMessage<ListJobTasksRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTasksResponse
 */
export type ListJobTasksResponse = Message<"domain.operation.v1.ListJobTasksResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask data = 1;
     */
    data: JobTask[];
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
 * Describes the message domain.operation.v1.ListJobTasksResponse.
 * Use `create(ListJobTasksResponseSchema)` to create a new message.
 */
export declare const ListJobTasksResponseSchema: GenMessage<ListJobTasksResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTaskListPageDataRequest
 */
export type GetJobTaskListPageDataRequest = Message<"domain.operation.v1.GetJobTaskListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobTaskListPageDataRequest.
 * Use `create(GetJobTaskListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTaskListPageDataRequestSchema: GenMessage<GetJobTaskListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTaskListPageDataResponse
 */
export type GetJobTaskListPageDataResponse = Message<"domain.operation.v1.GetJobTaskListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask job_task_list = 1;
     */
    jobTaskList: JobTask[];
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
 * Describes the message domain.operation.v1.GetJobTaskListPageDataResponse.
 * Use `create(GetJobTaskListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTaskListPageDataResponseSchema: GenMessage<GetJobTaskListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTaskItemPageDataRequest
 */
export type GetJobTaskItemPageDataRequest = Message<"domain.operation.v1.GetJobTaskItemPageDataRequest"> & {
    /**
     * @generated from field: string job_task_id = 1;
     */
    jobTaskId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobTaskItemPageDataRequest.
 * Use `create(GetJobTaskItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTaskItemPageDataRequestSchema: GenMessage<GetJobTaskItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTaskItemPageDataResponse
 */
export type GetJobTaskItemPageDataResponse = Message<"domain.operation.v1.GetJobTaskItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobTask job_task = 1;
     */
    jobTask?: JobTask;
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
 * Describes the message domain.operation.v1.GetJobTaskItemPageDataResponse.
 * Use `create(GetJobTaskItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTaskItemPageDataResponseSchema: GenMessage<GetJobTaskItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTasksByPhaseRequest
 */
export type ListJobTasksByPhaseRequest = Message<"domain.operation.v1.ListJobTasksByPhaseRequest"> & {
    /**
     * @generated from field: string job_phase_id = 1;
     */
    jobPhaseId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobTasksByPhaseRequest.
 * Use `create(ListJobTasksByPhaseRequestSchema)` to create a new message.
 */
export declare const ListJobTasksByPhaseRequestSchema: GenMessage<ListJobTasksByPhaseRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTasksByPhaseResponse
 */
export type ListJobTasksByPhaseResponse = Message<"domain.operation.v1.ListJobTasksByPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask job_tasks = 1;
     */
    jobTasks: JobTask[];
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
 * Describes the message domain.operation.v1.ListJobTasksByPhaseResponse.
 * Use `create(ListJobTasksByPhaseResponseSchema)` to create a new message.
 */
export declare const ListJobTasksByPhaseResponseSchema: GenMessage<ListJobTasksByPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTasksByAssigneeRequest
 */
export type ListJobTasksByAssigneeRequest = Message<"domain.operation.v1.ListJobTasksByAssigneeRequest"> & {
    /**
     * @generated from field: string assigned_to = 1;
     */
    assignedTo: string;
};
/**
 * Describes the message domain.operation.v1.ListJobTasksByAssigneeRequest.
 * Use `create(ListJobTasksByAssigneeRequestSchema)` to create a new message.
 */
export declare const ListJobTasksByAssigneeRequestSchema: GenMessage<ListJobTasksByAssigneeRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTasksByAssigneeResponse
 */
export type ListJobTasksByAssigneeResponse = Message<"domain.operation.v1.ListJobTasksByAssigneeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTask job_tasks = 1;
     */
    jobTasks: JobTask[];
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
 * Describes the message domain.operation.v1.ListJobTasksByAssigneeResponse.
 * Use `create(ListJobTasksByAssigneeResponseSchema)` to create a new message.
 */
export declare const ListJobTasksByAssigneeResponseSchema: GenMessage<ListJobTasksByAssigneeResponse>;
/**
 * @generated from enum domain.operation.v1.TaskStatus
 */
export declare enum TaskStatus {
    /**
     * @generated from enum value: TASK_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TASK_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: TASK_STATUS_IN_PROGRESS = 2;
     */
    IN_PROGRESS = 2,
    /**
     * @generated from enum value: TASK_STATUS_COMPLETED = 3;
     */
    COMPLETED = 3,
    /**
     * @generated from enum value: TASK_STATUS_SKIPPED = 4;
     */
    SKIPPED = 4,
    /**
     * NEW
     *
     * @generated from enum value: TASK_STATUS_HOLD = 5;
     */
    HOLD = 5,
    /**
     * NEW
     *
     * @generated from enum value: TASK_STATUS_REWORK = 6;
     */
    REWORK = 6
}
/**
 * Describes the enum domain.operation.v1.TaskStatus.
 */
export declare const TaskStatusSchema: GenEnum<TaskStatus>;
/**
 * @generated from service domain.operation.v1.JobTaskDomainService
 */
export declare const JobTaskDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.CreateJobTask
     */
    createJobTask: {
        methodKind: "unary";
        input: typeof CreateJobTaskRequestSchema;
        output: typeof CreateJobTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.ReadJobTask
     */
    readJobTask: {
        methodKind: "unary";
        input: typeof ReadJobTaskRequestSchema;
        output: typeof ReadJobTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.UpdateJobTask
     */
    updateJobTask: {
        methodKind: "unary";
        input: typeof UpdateJobTaskRequestSchema;
        output: typeof UpdateJobTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.DeleteJobTask
     */
    deleteJobTask: {
        methodKind: "unary";
        input: typeof DeleteJobTaskRequestSchema;
        output: typeof DeleteJobTaskResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.ListJobTasks
     */
    listJobTasks: {
        methodKind: "unary";
        input: typeof ListJobTasksRequestSchema;
        output: typeof ListJobTasksResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.GetJobTaskListPageData
     */
    getJobTaskListPageData: {
        methodKind: "unary";
        input: typeof GetJobTaskListPageDataRequestSchema;
        output: typeof GetJobTaskListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.GetJobTaskItemPageData
     */
    getJobTaskItemPageData: {
        methodKind: "unary";
        input: typeof GetJobTaskItemPageDataRequestSchema;
        output: typeof GetJobTaskItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by phase and by assignee
     *
     * @generated from rpc domain.operation.v1.JobTaskDomainService.ListByPhase
     */
    listByPhase: {
        methodKind: "unary";
        input: typeof ListJobTasksByPhaseRequestSchema;
        output: typeof ListJobTasksByPhaseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTaskDomainService.ListByAssignee
     */
    listByAssignee: {
        methodKind: "unary";
        input: typeof ListJobTasksByAssigneeRequestSchema;
        output: typeof ListJobTasksByAssigneeResponseSchema;
    };
}>;
