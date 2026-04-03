import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { CriteriaType, Determination, DeterminationSource } from "../enums/enums_pb";
import type { OutcomeCriteria } from "../outcome_criteria/outcome_criteria_pb";
import type { JobTask } from "../job_task/job_task_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/task_outcome/task_outcome.proto.
 */
export declare const file_domain_operation_task_outcome_task_outcome: GenFile;
/**
 * @generated from message domain.operation.v1.TaskOutcome
 */
export type TaskOutcome = Message<"domain.operation.v1.TaskOutcome"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string job_task_id = 2;
     */
    jobTaskId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTask job_task = 3;
     */
    jobTask?: JobTask;
    /**
     * @generated from field: string criteria_version_id = 4;
     */
    criteriaVersionId: string;
    /**
     * @generated from field: optional domain.operation.v1.OutcomeCriteria criteria_version = 5;
     */
    criteriaVersion?: OutcomeCriteria;
    /**
     * @generated from field: domain.operation.v1.CriteriaType criteria_type = 6;
     */
    criteriaType: CriteriaType;
    /**
     * @generated from field: bool is_ad_hoc = 7;
     */
    isAdHoc: boolean;
    /**
     * @generated from field: optional double numeric_value = 8;
     */
    numericValue?: number;
    /**
     * @generated from field: optional string text_value = 9;
     */
    textValue?: string;
    /**
     * @generated from field: optional string categorical_value = 10;
     */
    categoricalValue?: string;
    /**
     * @generated from field: optional bool pass_fail_value = 11;
     */
    passFailValue?: boolean;
    /**
     * @generated from field: domain.operation.v1.Determination determination = 12;
     */
    determination: Determination;
    /**
     * @generated from field: domain.operation.v1.DeterminationSource determination_source = 13;
     */
    determinationSource: DeterminationSource;
    /**
     * @generated from field: optional string determination_note = 14;
     */
    determinationNote?: string;
    /**
     * @generated from field: optional domain.operation.v1.Determination auto_proposed_determination = 15;
     */
    autoProposedDetermination?: Determination;
    /**
     * @generated from field: string recorded_by = 16;
     */
    recordedBy: string;
    /**
     * @generated from field: optional int64 recorded_date = 17;
     */
    recordedDate?: bigint;
    /**
     * @generated from field: optional string recorded_by_name = 18;
     */
    recordedByName?: string;
    /**
     * @generated from field: optional string reviewed_by = 19;
     */
    reviewedBy?: string;
    /**
     * @generated from field: optional int64 reviewed_date = 20;
     */
    reviewedDate?: bigint;
    /**
     * @generated from field: repeated string attachment_ids = 21;
     */
    attachmentIds: string[];
    /**
     * @generated from field: optional string revision_of_id = 22;
     */
    revisionOfId?: string;
    /**
     * @generated from field: int32 revision_number = 23;
     */
    revisionNumber: number;
    /**
     * @generated from field: bool active = 24;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 25;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 26;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 27;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 28;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.TaskOutcome.
 * Use `create(TaskOutcomeSchema)` to create a new message.
 */
export declare const TaskOutcomeSchema: GenMessage<TaskOutcome>;
/**
 * @generated from message domain.operation.v1.CreateTaskOutcomeRequest
 */
export type CreateTaskOutcomeRequest = Message<"domain.operation.v1.CreateTaskOutcomeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcome data = 1;
     */
    data?: TaskOutcome;
};
/**
 * Describes the message domain.operation.v1.CreateTaskOutcomeRequest.
 * Use `create(CreateTaskOutcomeRequestSchema)` to create a new message.
 */
export declare const CreateTaskOutcomeRequestSchema: GenMessage<CreateTaskOutcomeRequest>;
/**
 * @generated from message domain.operation.v1.CreateTaskOutcomeResponse
 */
export type CreateTaskOutcomeResponse = Message<"domain.operation.v1.CreateTaskOutcomeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome data = 1;
     */
    data: TaskOutcome[];
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
 * Describes the message domain.operation.v1.CreateTaskOutcomeResponse.
 * Use `create(CreateTaskOutcomeResponseSchema)` to create a new message.
 */
export declare const CreateTaskOutcomeResponseSchema: GenMessage<CreateTaskOutcomeResponse>;
/**
 * @generated from message domain.operation.v1.ReadTaskOutcomeRequest
 */
export type ReadTaskOutcomeRequest = Message<"domain.operation.v1.ReadTaskOutcomeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcome data = 1;
     */
    data?: TaskOutcome;
};
/**
 * Describes the message domain.operation.v1.ReadTaskOutcomeRequest.
 * Use `create(ReadTaskOutcomeRequestSchema)` to create a new message.
 */
export declare const ReadTaskOutcomeRequestSchema: GenMessage<ReadTaskOutcomeRequest>;
/**
 * @generated from message domain.operation.v1.ReadTaskOutcomeResponse
 */
export type ReadTaskOutcomeResponse = Message<"domain.operation.v1.ReadTaskOutcomeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome data = 1;
     */
    data: TaskOutcome[];
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
 * Describes the message domain.operation.v1.ReadTaskOutcomeResponse.
 * Use `create(ReadTaskOutcomeResponseSchema)` to create a new message.
 */
export declare const ReadTaskOutcomeResponseSchema: GenMessage<ReadTaskOutcomeResponse>;
/**
 * @generated from message domain.operation.v1.UpdateTaskOutcomeRequest
 */
export type UpdateTaskOutcomeRequest = Message<"domain.operation.v1.UpdateTaskOutcomeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcome data = 1;
     */
    data?: TaskOutcome;
};
/**
 * Describes the message domain.operation.v1.UpdateTaskOutcomeRequest.
 * Use `create(UpdateTaskOutcomeRequestSchema)` to create a new message.
 */
export declare const UpdateTaskOutcomeRequestSchema: GenMessage<UpdateTaskOutcomeRequest>;
/**
 * @generated from message domain.operation.v1.UpdateTaskOutcomeResponse
 */
export type UpdateTaskOutcomeResponse = Message<"domain.operation.v1.UpdateTaskOutcomeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome data = 1;
     */
    data: TaskOutcome[];
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
 * Describes the message domain.operation.v1.UpdateTaskOutcomeResponse.
 * Use `create(UpdateTaskOutcomeResponseSchema)` to create a new message.
 */
export declare const UpdateTaskOutcomeResponseSchema: GenMessage<UpdateTaskOutcomeResponse>;
/**
 * @generated from message domain.operation.v1.DeleteTaskOutcomeRequest
 */
export type DeleteTaskOutcomeRequest = Message<"domain.operation.v1.DeleteTaskOutcomeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcome data = 1;
     */
    data?: TaskOutcome;
};
/**
 * Describes the message domain.operation.v1.DeleteTaskOutcomeRequest.
 * Use `create(DeleteTaskOutcomeRequestSchema)` to create a new message.
 */
export declare const DeleteTaskOutcomeRequestSchema: GenMessage<DeleteTaskOutcomeRequest>;
/**
 * @generated from message domain.operation.v1.DeleteTaskOutcomeResponse
 */
export type DeleteTaskOutcomeResponse = Message<"domain.operation.v1.DeleteTaskOutcomeResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteTaskOutcomeResponse.
 * Use `create(DeleteTaskOutcomeResponseSchema)` to create a new message.
 */
export declare const DeleteTaskOutcomeResponseSchema: GenMessage<DeleteTaskOutcomeResponse>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesRequest
 */
export type ListTaskOutcomesRequest = Message<"domain.operation.v1.ListTaskOutcomesRequest"> & {
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
 * Describes the message domain.operation.v1.ListTaskOutcomesRequest.
 * Use `create(ListTaskOutcomesRequestSchema)` to create a new message.
 */
export declare const ListTaskOutcomesRequestSchema: GenMessage<ListTaskOutcomesRequest>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesResponse
 */
export type ListTaskOutcomesResponse = Message<"domain.operation.v1.ListTaskOutcomesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome data = 1;
     */
    data: TaskOutcome[];
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
 * Describes the message domain.operation.v1.ListTaskOutcomesResponse.
 * Use `create(ListTaskOutcomesResponseSchema)` to create a new message.
 */
export declare const ListTaskOutcomesResponseSchema: GenMessage<ListTaskOutcomesResponse>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeListPageDataRequest
 */
export type GetTaskOutcomeListPageDataRequest = Message<"domain.operation.v1.GetTaskOutcomeListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetTaskOutcomeListPageDataRequest.
 * Use `create(GetTaskOutcomeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaskOutcomeListPageDataRequestSchema: GenMessage<GetTaskOutcomeListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeListPageDataResponse
 */
export type GetTaskOutcomeListPageDataResponse = Message<"domain.operation.v1.GetTaskOutcomeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome task_outcome_list = 1;
     */
    taskOutcomeList: TaskOutcome[];
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
 * Describes the message domain.operation.v1.GetTaskOutcomeListPageDataResponse.
 * Use `create(GetTaskOutcomeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaskOutcomeListPageDataResponseSchema: GenMessage<GetTaskOutcomeListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeItemPageDataRequest
 */
export type GetTaskOutcomeItemPageDataRequest = Message<"domain.operation.v1.GetTaskOutcomeItemPageDataRequest"> & {
    /**
     * @generated from field: string task_outcome_id = 1;
     */
    taskOutcomeId: string;
};
/**
 * Describes the message domain.operation.v1.GetTaskOutcomeItemPageDataRequest.
 * Use `create(GetTaskOutcomeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaskOutcomeItemPageDataRequestSchema: GenMessage<GetTaskOutcomeItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeItemPageDataResponse
 */
export type GetTaskOutcomeItemPageDataResponse = Message<"domain.operation.v1.GetTaskOutcomeItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.TaskOutcome task_outcome = 1;
     */
    taskOutcome?: TaskOutcome;
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
 * Describes the message domain.operation.v1.GetTaskOutcomeItemPageDataResponse.
 * Use `create(GetTaskOutcomeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaskOutcomeItemPageDataResponseSchema: GenMessage<GetTaskOutcomeItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesByJobTaskRequest
 */
export type ListTaskOutcomesByJobTaskRequest = Message<"domain.operation.v1.ListTaskOutcomesByJobTaskRequest"> & {
    /**
     * @generated from field: string job_task_id = 1;
     */
    jobTaskId: string;
};
/**
 * Describes the message domain.operation.v1.ListTaskOutcomesByJobTaskRequest.
 * Use `create(ListTaskOutcomesByJobTaskRequestSchema)` to create a new message.
 */
export declare const ListTaskOutcomesByJobTaskRequestSchema: GenMessage<ListTaskOutcomesByJobTaskRequest>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesByJobTaskResponse
 */
export type ListTaskOutcomesByJobTaskResponse = Message<"domain.operation.v1.ListTaskOutcomesByJobTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome task_outcomes = 1;
     */
    taskOutcomes: TaskOutcome[];
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
 * Describes the message domain.operation.v1.ListTaskOutcomesByJobTaskResponse.
 * Use `create(ListTaskOutcomesByJobTaskResponseSchema)` to create a new message.
 */
export declare const ListTaskOutcomesByJobTaskResponseSchema: GenMessage<ListTaskOutcomesByJobTaskResponse>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesByJobPhaseRequest
 */
export type ListTaskOutcomesByJobPhaseRequest = Message<"domain.operation.v1.ListTaskOutcomesByJobPhaseRequest"> & {
    /**
     * @generated from field: string job_phase_id = 1;
     */
    jobPhaseId: string;
};
/**
 * Describes the message domain.operation.v1.ListTaskOutcomesByJobPhaseRequest.
 * Use `create(ListTaskOutcomesByJobPhaseRequestSchema)` to create a new message.
 */
export declare const ListTaskOutcomesByJobPhaseRequestSchema: GenMessage<ListTaskOutcomesByJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesByJobPhaseResponse
 */
export type ListTaskOutcomesByJobPhaseResponse = Message<"domain.operation.v1.ListTaskOutcomesByJobPhaseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome task_outcomes = 1;
     */
    taskOutcomes: TaskOutcome[];
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
 * Describes the message domain.operation.v1.ListTaskOutcomesByJobPhaseResponse.
 * Use `create(ListTaskOutcomesByJobPhaseResponseSchema)` to create a new message.
 */
export declare const ListTaskOutcomesByJobPhaseResponseSchema: GenMessage<ListTaskOutcomesByJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesByJobRequest
 */
export type ListTaskOutcomesByJobRequest = Message<"domain.operation.v1.ListTaskOutcomesByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListTaskOutcomesByJobRequest.
 * Use `create(ListTaskOutcomesByJobRequestSchema)` to create a new message.
 */
export declare const ListTaskOutcomesByJobRequestSchema: GenMessage<ListTaskOutcomesByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomesByJobResponse
 */
export type ListTaskOutcomesByJobResponse = Message<"domain.operation.v1.ListTaskOutcomesByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcome task_outcomes = 1;
     */
    taskOutcomes: TaskOutcome[];
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
 * Describes the message domain.operation.v1.ListTaskOutcomesByJobResponse.
 * Use `create(ListTaskOutcomesByJobResponseSchema)` to create a new message.
 */
export declare const ListTaskOutcomesByJobResponseSchema: GenMessage<ListTaskOutcomesByJobResponse>;
/**
 * @generated from service domain.operation.v1.TaskOutcomeDomainService
 */
export declare const TaskOutcomeDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.CreateTaskOutcome
     */
    createTaskOutcome: {
        methodKind: "unary";
        input: typeof CreateTaskOutcomeRequestSchema;
        output: typeof CreateTaskOutcomeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.ReadTaskOutcome
     */
    readTaskOutcome: {
        methodKind: "unary";
        input: typeof ReadTaskOutcomeRequestSchema;
        output: typeof ReadTaskOutcomeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.UpdateTaskOutcome
     */
    updateTaskOutcome: {
        methodKind: "unary";
        input: typeof UpdateTaskOutcomeRequestSchema;
        output: typeof UpdateTaskOutcomeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.DeleteTaskOutcome
     */
    deleteTaskOutcome: {
        methodKind: "unary";
        input: typeof DeleteTaskOutcomeRequestSchema;
        output: typeof DeleteTaskOutcomeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.ListTaskOutcomes
     */
    listTaskOutcomes: {
        methodKind: "unary";
        input: typeof ListTaskOutcomesRequestSchema;
        output: typeof ListTaskOutcomesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.GetTaskOutcomeListPageData
     */
    getTaskOutcomeListPageData: {
        methodKind: "unary";
        input: typeof GetTaskOutcomeListPageDataRequestSchema;
        output: typeof GetTaskOutcomeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.GetTaskOutcomeItemPageData
     */
    getTaskOutcomeItemPageData: {
        methodKind: "unary";
        input: typeof GetTaskOutcomeItemPageDataRequestSchema;
        output: typeof GetTaskOutcomeItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by job task
     *
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.ListByJobTask
     */
    listByJobTask: {
        methodKind: "unary";
        input: typeof ListTaskOutcomesByJobTaskRequestSchema;
        output: typeof ListTaskOutcomesByJobTaskResponseSchema;
    };
    /**
     * Extra: filter by job phase (cross-table via job_task → job_phase)
     *
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.ListByJobPhase
     */
    listByJobPhase: {
        methodKind: "unary";
        input: typeof ListTaskOutcomesByJobPhaseRequestSchema;
        output: typeof ListTaskOutcomesByJobPhaseResponseSchema;
    };
    /**
     * Extra: filter by job (multi-join via job_task → job_phase → job)
     *
     * @generated from rpc domain.operation.v1.TaskOutcomeDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListTaskOutcomesByJobRequestSchema;
        output: typeof ListTaskOutcomesByJobResponseSchema;
    };
}>;
