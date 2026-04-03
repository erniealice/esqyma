import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { TaskOutcome } from "../task_outcome/task_outcome_pb";
import type { CriteriaOption } from "../criteria_option/criteria_option_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/task_outcome_check/task_outcome_check.proto.
 */
export declare const file_domain_operation_task_outcome_check_task_outcome_check: GenFile;
/**
 * @generated from message domain.operation.v1.TaskOutcomeCheck
 */
export type TaskOutcomeCheck = Message<"domain.operation.v1.TaskOutcomeCheck"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string task_outcome_id = 2;
     */
    taskOutcomeId: string;
    /**
     * @generated from field: optional domain.operation.v1.TaskOutcome task_outcome = 3;
     */
    taskOutcome?: TaskOutcome;
    /**
     * @generated from field: string criteria_option_id = 4;
     */
    criteriaOptionId: string;
    /**
     * @generated from field: optional domain.operation.v1.CriteriaOption criteria_option = 5;
     */
    criteriaOption?: CriteriaOption;
    /**
     * @generated from field: bool checked = 6;
     */
    checked: boolean;
    /**
     * @generated from field: optional string note = 7;
     */
    note?: string;
    /**
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.operation.v1.TaskOutcomeCheck.
 * Use `create(TaskOutcomeCheckSchema)` to create a new message.
 */
export declare const TaskOutcomeCheckSchema: GenMessage<TaskOutcomeCheck>;
/**
 * @generated from message domain.operation.v1.CreateTaskOutcomeCheckRequest
 */
export type CreateTaskOutcomeCheckRequest = Message<"domain.operation.v1.CreateTaskOutcomeCheckRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data?: TaskOutcomeCheck;
};
/**
 * Describes the message domain.operation.v1.CreateTaskOutcomeCheckRequest.
 * Use `create(CreateTaskOutcomeCheckRequestSchema)` to create a new message.
 */
export declare const CreateTaskOutcomeCheckRequestSchema: GenMessage<CreateTaskOutcomeCheckRequest>;
/**
 * @generated from message domain.operation.v1.CreateTaskOutcomeCheckResponse
 */
export type CreateTaskOutcomeCheckResponse = Message<"domain.operation.v1.CreateTaskOutcomeCheckResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data: TaskOutcomeCheck[];
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
 * Describes the message domain.operation.v1.CreateTaskOutcomeCheckResponse.
 * Use `create(CreateTaskOutcomeCheckResponseSchema)` to create a new message.
 */
export declare const CreateTaskOutcomeCheckResponseSchema: GenMessage<CreateTaskOutcomeCheckResponse>;
/**
 * @generated from message domain.operation.v1.ReadTaskOutcomeCheckRequest
 */
export type ReadTaskOutcomeCheckRequest = Message<"domain.operation.v1.ReadTaskOutcomeCheckRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data?: TaskOutcomeCheck;
};
/**
 * Describes the message domain.operation.v1.ReadTaskOutcomeCheckRequest.
 * Use `create(ReadTaskOutcomeCheckRequestSchema)` to create a new message.
 */
export declare const ReadTaskOutcomeCheckRequestSchema: GenMessage<ReadTaskOutcomeCheckRequest>;
/**
 * @generated from message domain.operation.v1.ReadTaskOutcomeCheckResponse
 */
export type ReadTaskOutcomeCheckResponse = Message<"domain.operation.v1.ReadTaskOutcomeCheckResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data: TaskOutcomeCheck[];
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
 * Describes the message domain.operation.v1.ReadTaskOutcomeCheckResponse.
 * Use `create(ReadTaskOutcomeCheckResponseSchema)` to create a new message.
 */
export declare const ReadTaskOutcomeCheckResponseSchema: GenMessage<ReadTaskOutcomeCheckResponse>;
/**
 * @generated from message domain.operation.v1.UpdateTaskOutcomeCheckRequest
 */
export type UpdateTaskOutcomeCheckRequest = Message<"domain.operation.v1.UpdateTaskOutcomeCheckRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data?: TaskOutcomeCheck;
};
/**
 * Describes the message domain.operation.v1.UpdateTaskOutcomeCheckRequest.
 * Use `create(UpdateTaskOutcomeCheckRequestSchema)` to create a new message.
 */
export declare const UpdateTaskOutcomeCheckRequestSchema: GenMessage<UpdateTaskOutcomeCheckRequest>;
/**
 * @generated from message domain.operation.v1.UpdateTaskOutcomeCheckResponse
 */
export type UpdateTaskOutcomeCheckResponse = Message<"domain.operation.v1.UpdateTaskOutcomeCheckResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data: TaskOutcomeCheck[];
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
 * Describes the message domain.operation.v1.UpdateTaskOutcomeCheckResponse.
 * Use `create(UpdateTaskOutcomeCheckResponseSchema)` to create a new message.
 */
export declare const UpdateTaskOutcomeCheckResponseSchema: GenMessage<UpdateTaskOutcomeCheckResponse>;
/**
 * @generated from message domain.operation.v1.DeleteTaskOutcomeCheckRequest
 */
export type DeleteTaskOutcomeCheckRequest = Message<"domain.operation.v1.DeleteTaskOutcomeCheckRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data?: TaskOutcomeCheck;
};
/**
 * Describes the message domain.operation.v1.DeleteTaskOutcomeCheckRequest.
 * Use `create(DeleteTaskOutcomeCheckRequestSchema)` to create a new message.
 */
export declare const DeleteTaskOutcomeCheckRequestSchema: GenMessage<DeleteTaskOutcomeCheckRequest>;
/**
 * @generated from message domain.operation.v1.DeleteTaskOutcomeCheckResponse
 */
export type DeleteTaskOutcomeCheckResponse = Message<"domain.operation.v1.DeleteTaskOutcomeCheckResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteTaskOutcomeCheckResponse.
 * Use `create(DeleteTaskOutcomeCheckResponseSchema)` to create a new message.
 */
export declare const DeleteTaskOutcomeCheckResponseSchema: GenMessage<DeleteTaskOutcomeCheckResponse>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomeChecksRequest
 */
export type ListTaskOutcomeChecksRequest = Message<"domain.operation.v1.ListTaskOutcomeChecksRequest"> & {
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
 * Describes the message domain.operation.v1.ListTaskOutcomeChecksRequest.
 * Use `create(ListTaskOutcomeChecksRequestSchema)` to create a new message.
 */
export declare const ListTaskOutcomeChecksRequestSchema: GenMessage<ListTaskOutcomeChecksRequest>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomeChecksResponse
 */
export type ListTaskOutcomeChecksResponse = Message<"domain.operation.v1.ListTaskOutcomeChecksResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcomeCheck data = 1;
     */
    data: TaskOutcomeCheck[];
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
 * Describes the message domain.operation.v1.ListTaskOutcomeChecksResponse.
 * Use `create(ListTaskOutcomeChecksResponseSchema)` to create a new message.
 */
export declare const ListTaskOutcomeChecksResponseSchema: GenMessage<ListTaskOutcomeChecksResponse>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeCheckListPageDataRequest
 */
export type GetTaskOutcomeCheckListPageDataRequest = Message<"domain.operation.v1.GetTaskOutcomeCheckListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetTaskOutcomeCheckListPageDataRequest.
 * Use `create(GetTaskOutcomeCheckListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaskOutcomeCheckListPageDataRequestSchema: GenMessage<GetTaskOutcomeCheckListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeCheckListPageDataResponse
 */
export type GetTaskOutcomeCheckListPageDataResponse = Message<"domain.operation.v1.GetTaskOutcomeCheckListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcomeCheck task_outcome_check_list = 1;
     */
    taskOutcomeCheckList: TaskOutcomeCheck[];
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
 * Describes the message domain.operation.v1.GetTaskOutcomeCheckListPageDataResponse.
 * Use `create(GetTaskOutcomeCheckListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaskOutcomeCheckListPageDataResponseSchema: GenMessage<GetTaskOutcomeCheckListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeCheckItemPageDataRequest
 */
export type GetTaskOutcomeCheckItemPageDataRequest = Message<"domain.operation.v1.GetTaskOutcomeCheckItemPageDataRequest"> & {
    /**
     * @generated from field: string task_outcome_check_id = 1;
     */
    taskOutcomeCheckId: string;
};
/**
 * Describes the message domain.operation.v1.GetTaskOutcomeCheckItemPageDataRequest.
 * Use `create(GetTaskOutcomeCheckItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaskOutcomeCheckItemPageDataRequestSchema: GenMessage<GetTaskOutcomeCheckItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetTaskOutcomeCheckItemPageDataResponse
 */
export type GetTaskOutcomeCheckItemPageDataResponse = Message<"domain.operation.v1.GetTaskOutcomeCheckItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.TaskOutcomeCheck task_outcome_check = 1;
     */
    taskOutcomeCheck?: TaskOutcomeCheck;
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
 * Describes the message domain.operation.v1.GetTaskOutcomeCheckItemPageDataResponse.
 * Use `create(GetTaskOutcomeCheckItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaskOutcomeCheckItemPageDataResponseSchema: GenMessage<GetTaskOutcomeCheckItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomeChecksByTaskOutcomeRequest
 */
export type ListTaskOutcomeChecksByTaskOutcomeRequest = Message<"domain.operation.v1.ListTaskOutcomeChecksByTaskOutcomeRequest"> & {
    /**
     * @generated from field: string task_outcome_id = 1;
     */
    taskOutcomeId: string;
};
/**
 * Describes the message domain.operation.v1.ListTaskOutcomeChecksByTaskOutcomeRequest.
 * Use `create(ListTaskOutcomeChecksByTaskOutcomeRequestSchema)` to create a new message.
 */
export declare const ListTaskOutcomeChecksByTaskOutcomeRequestSchema: GenMessage<ListTaskOutcomeChecksByTaskOutcomeRequest>;
/**
 * @generated from message domain.operation.v1.ListTaskOutcomeChecksByTaskOutcomeResponse
 */
export type ListTaskOutcomeChecksByTaskOutcomeResponse = Message<"domain.operation.v1.ListTaskOutcomeChecksByTaskOutcomeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TaskOutcomeCheck task_outcome_checks = 1;
     */
    taskOutcomeChecks: TaskOutcomeCheck[];
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
 * Describes the message domain.operation.v1.ListTaskOutcomeChecksByTaskOutcomeResponse.
 * Use `create(ListTaskOutcomeChecksByTaskOutcomeResponseSchema)` to create a new message.
 */
export declare const ListTaskOutcomeChecksByTaskOutcomeResponseSchema: GenMessage<ListTaskOutcomeChecksByTaskOutcomeResponse>;
/**
 * @generated from service domain.operation.v1.TaskOutcomeCheckDomainService
 */
export declare const TaskOutcomeCheckDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.CreateTaskOutcomeCheck
     */
    createTaskOutcomeCheck: {
        methodKind: "unary";
        input: typeof CreateTaskOutcomeCheckRequestSchema;
        output: typeof CreateTaskOutcomeCheckResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.ReadTaskOutcomeCheck
     */
    readTaskOutcomeCheck: {
        methodKind: "unary";
        input: typeof ReadTaskOutcomeCheckRequestSchema;
        output: typeof ReadTaskOutcomeCheckResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.UpdateTaskOutcomeCheck
     */
    updateTaskOutcomeCheck: {
        methodKind: "unary";
        input: typeof UpdateTaskOutcomeCheckRequestSchema;
        output: typeof UpdateTaskOutcomeCheckResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.DeleteTaskOutcomeCheck
     */
    deleteTaskOutcomeCheck: {
        methodKind: "unary";
        input: typeof DeleteTaskOutcomeCheckRequestSchema;
        output: typeof DeleteTaskOutcomeCheckResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.ListTaskOutcomeChecks
     */
    listTaskOutcomeChecks: {
        methodKind: "unary";
        input: typeof ListTaskOutcomeChecksRequestSchema;
        output: typeof ListTaskOutcomeChecksResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.GetTaskOutcomeCheckListPageData
     */
    getTaskOutcomeCheckListPageData: {
        methodKind: "unary";
        input: typeof GetTaskOutcomeCheckListPageDataRequestSchema;
        output: typeof GetTaskOutcomeCheckListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.GetTaskOutcomeCheckItemPageData
     */
    getTaskOutcomeCheckItemPageData: {
        methodKind: "unary";
        input: typeof GetTaskOutcomeCheckItemPageDataRequestSchema;
        output: typeof GetTaskOutcomeCheckItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by task outcome
     *
     * @generated from rpc domain.operation.v1.TaskOutcomeCheckDomainService.ListByTaskOutcome
     */
    listByTaskOutcome: {
        methodKind: "unary";
        input: typeof ListTaskOutcomeChecksByTaskOutcomeRequestSchema;
        output: typeof ListTaskOutcomeChecksByTaskOutcomeResponseSchema;
    };
}>;
