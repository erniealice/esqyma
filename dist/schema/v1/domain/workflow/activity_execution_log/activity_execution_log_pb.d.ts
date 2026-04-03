import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/activity_execution_log/activity_execution_log.proto.
 */
export declare const file_domain_workflow_activity_execution_log_activity_execution_log: GenFile;
/**
 * ActivityExecutionLog records the execution details of a workflow activity
 *
 * @generated from message domain.workflow.v1.ActivityExecutionLog
 */
export type ActivityExecutionLog = Message<"domain.workflow.v1.ActivityExecutionLog"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workflow_id = 2;
     */
    workflowId: string;
    /**
     * @generated from field: string activity_id = 3;
     */
    activityId: string;
    /**
     * @generated from field: string activity_template_id = 4;
     */
    activityTemplateId: string;
    /**
     * "success", "failed", "in_progress"
     *
     * @generated from field: string status = 5;
     */
    status: string;
    /**
     * @generated from field: string start_time = 6;
     */
    startTime: string;
    /**
     * @generated from field: string end_time = 7;
     */
    endTime: string;
    /**
     * @generated from field: string input_snapshot_json = 8;
     */
    inputSnapshotJson: string;
    /**
     * @generated from field: string output_snapshot_json = 9;
     */
    outputSnapshotJson: string;
    /**
     * @generated from field: string error_message = 10;
     */
    errorMessage: string;
    /**
     * Standard audit fields
     *
     * @generated from field: string created_by = 11;
     */
    createdBy: string;
    /**
     * @generated from field: int64 date_created = 12;
     */
    dateCreated: bigint;
    /**
     * @generated from field: string date_created_string = 13;
     */
    dateCreatedString: string;
    /**
     * @generated from field: int64 date_modified = 14;
     */
    dateModified: bigint;
    /**
     * @generated from field: string date_modified_string = 15;
     */
    dateModifiedString: string;
    /**
     * @generated from field: bool active = 16;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 17;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.workflow.v1.ActivityExecutionLog.
 * Use `create(ActivityExecutionLogSchema)` to create a new message.
 */
export declare const ActivityExecutionLogSchema: GenMessage<ActivityExecutionLog>;
/**
 * CreateActivityExecutionLogRequest
 *
 * @generated from message domain.workflow.v1.CreateActivityExecutionLogRequest
 */
export type CreateActivityExecutionLogRequest = Message<"domain.workflow.v1.CreateActivityExecutionLogRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data?: ActivityExecutionLog;
};
/**
 * Describes the message domain.workflow.v1.CreateActivityExecutionLogRequest.
 * Use `create(CreateActivityExecutionLogRequestSchema)` to create a new message.
 */
export declare const CreateActivityExecutionLogRequestSchema: GenMessage<CreateActivityExecutionLogRequest>;
/**
 * @generated from message domain.workflow.v1.CreateActivityExecutionLogResponse
 */
export type CreateActivityExecutionLogResponse = Message<"domain.workflow.v1.CreateActivityExecutionLogResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data: ActivityExecutionLog[];
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
 * Describes the message domain.workflow.v1.CreateActivityExecutionLogResponse.
 * Use `create(CreateActivityExecutionLogResponseSchema)` to create a new message.
 */
export declare const CreateActivityExecutionLogResponseSchema: GenMessage<CreateActivityExecutionLogResponse>;
/**
 * ReadActivityExecutionLogRequest
 *
 * @generated from message domain.workflow.v1.ReadActivityExecutionLogRequest
 */
export type ReadActivityExecutionLogRequest = Message<"domain.workflow.v1.ReadActivityExecutionLogRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data?: ActivityExecutionLog;
};
/**
 * Describes the message domain.workflow.v1.ReadActivityExecutionLogRequest.
 * Use `create(ReadActivityExecutionLogRequestSchema)` to create a new message.
 */
export declare const ReadActivityExecutionLogRequestSchema: GenMessage<ReadActivityExecutionLogRequest>;
/**
 * @generated from message domain.workflow.v1.ReadActivityExecutionLogResponse
 */
export type ReadActivityExecutionLogResponse = Message<"domain.workflow.v1.ReadActivityExecutionLogResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data: ActivityExecutionLog[];
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
 * Describes the message domain.workflow.v1.ReadActivityExecutionLogResponse.
 * Use `create(ReadActivityExecutionLogResponseSchema)` to create a new message.
 */
export declare const ReadActivityExecutionLogResponseSchema: GenMessage<ReadActivityExecutionLogResponse>;
/**
 * UpdateActivityExecutionLogRequest
 *
 * @generated from message domain.workflow.v1.UpdateActivityExecutionLogRequest
 */
export type UpdateActivityExecutionLogRequest = Message<"domain.workflow.v1.UpdateActivityExecutionLogRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data?: ActivityExecutionLog;
};
/**
 * Describes the message domain.workflow.v1.UpdateActivityExecutionLogRequest.
 * Use `create(UpdateActivityExecutionLogRequestSchema)` to create a new message.
 */
export declare const UpdateActivityExecutionLogRequestSchema: GenMessage<UpdateActivityExecutionLogRequest>;
/**
 * @generated from message domain.workflow.v1.UpdateActivityExecutionLogResponse
 */
export type UpdateActivityExecutionLogResponse = Message<"domain.workflow.v1.UpdateActivityExecutionLogResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data: ActivityExecutionLog[];
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
 * Describes the message domain.workflow.v1.UpdateActivityExecutionLogResponse.
 * Use `create(UpdateActivityExecutionLogResponseSchema)` to create a new message.
 */
export declare const UpdateActivityExecutionLogResponseSchema: GenMessage<UpdateActivityExecutionLogResponse>;
/**
 * DeleteActivityExecutionLogRequest
 *
 * @generated from message domain.workflow.v1.DeleteActivityExecutionLogRequest
 */
export type DeleteActivityExecutionLogRequest = Message<"domain.workflow.v1.DeleteActivityExecutionLogRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data?: ActivityExecutionLog;
};
/**
 * Describes the message domain.workflow.v1.DeleteActivityExecutionLogRequest.
 * Use `create(DeleteActivityExecutionLogRequestSchema)` to create a new message.
 */
export declare const DeleteActivityExecutionLogRequestSchema: GenMessage<DeleteActivityExecutionLogRequest>;
/**
 * @generated from message domain.workflow.v1.DeleteActivityExecutionLogResponse
 */
export type DeleteActivityExecutionLogResponse = Message<"domain.workflow.v1.DeleteActivityExecutionLogResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteActivityExecutionLogResponse.
 * Use `create(DeleteActivityExecutionLogResponseSchema)` to create a new message.
 */
export declare const DeleteActivityExecutionLogResponseSchema: GenMessage<DeleteActivityExecutionLogResponse>;
/**
 * ListActivityExecutionLogsRequest
 *
 * @generated from message domain.workflow.v1.ListActivityExecutionLogsRequest
 */
export type ListActivityExecutionLogsRequest = Message<"domain.workflow.v1.ListActivityExecutionLogsRequest"> & {
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
 * Describes the message domain.workflow.v1.ListActivityExecutionLogsRequest.
 * Use `create(ListActivityExecutionLogsRequestSchema)` to create a new message.
 */
export declare const ListActivityExecutionLogsRequestSchema: GenMessage<ListActivityExecutionLogsRequest>;
/**
 * @generated from message domain.workflow.v1.ListActivityExecutionLogsResponse
 */
export type ListActivityExecutionLogsResponse = Message<"domain.workflow.v1.ListActivityExecutionLogsResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityExecutionLog data = 1;
     */
    data: ActivityExecutionLog[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional string next_page_token = 4;
     */
    nextPageToken?: string;
};
/**
 * Describes the message domain.workflow.v1.ListActivityExecutionLogsResponse.
 * Use `create(ListActivityExecutionLogsResponseSchema)` to create a new message.
 */
export declare const ListActivityExecutionLogsResponseSchema: GenMessage<ListActivityExecutionLogsResponse>;
/**
 * GetActivityExecutionLogListPageDataRequest
 *
 * @generated from message domain.workflow.v1.GetActivityExecutionLogListPageDataRequest
 */
export type GetActivityExecutionLogListPageDataRequest = Message<"domain.workflow.v1.GetActivityExecutionLogListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetActivityExecutionLogListPageDataRequest.
 * Use `create(GetActivityExecutionLogListPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityExecutionLogListPageDataRequestSchema: GenMessage<GetActivityExecutionLogListPageDataRequest>;
/**
 * @generated from message domain.workflow.v1.GetActivityExecutionLogListPageDataResponse
 */
export type GetActivityExecutionLogListPageDataResponse = Message<"domain.workflow.v1.GetActivityExecutionLogListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityExecutionLog activity_execution_log_list = 1;
     */
    activityExecutionLogList: ActivityExecutionLog[];
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
 * Describes the message domain.workflow.v1.GetActivityExecutionLogListPageDataResponse.
 * Use `create(GetActivityExecutionLogListPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityExecutionLogListPageDataResponseSchema: GenMessage<GetActivityExecutionLogListPageDataResponse>;
/**
 * GetActivityExecutionLogItemPageDataRequest
 *
 * @generated from message domain.workflow.v1.GetActivityExecutionLogItemPageDataRequest
 */
export type GetActivityExecutionLogItemPageDataRequest = Message<"domain.workflow.v1.GetActivityExecutionLogItemPageDataRequest"> & {
    /**
     * @generated from field: string activity_execution_log_id = 1;
     */
    activityExecutionLogId: string;
};
/**
 * Describes the message domain.workflow.v1.GetActivityExecutionLogItemPageDataRequest.
 * Use `create(GetActivityExecutionLogItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityExecutionLogItemPageDataRequestSchema: GenMessage<GetActivityExecutionLogItemPageDataRequest>;
/**
 * @generated from message domain.workflow.v1.GetActivityExecutionLogItemPageDataResponse
 */
export type GetActivityExecutionLogItemPageDataResponse = Message<"domain.workflow.v1.GetActivityExecutionLogItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.ActivityExecutionLog activity_execution_log = 1;
     */
    activityExecutionLog?: ActivityExecutionLog;
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
 * Describes the message domain.workflow.v1.GetActivityExecutionLogItemPageDataResponse.
 * Use `create(GetActivityExecutionLogItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityExecutionLogItemPageDataResponseSchema: GenMessage<GetActivityExecutionLogItemPageDataResponse>;
/**
 * Service Definition
 *
 * @generated from service domain.workflow.v1.ActivityExecutionLogDomainService
 */
export declare const ActivityExecutionLogDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.CreateActivityExecutionLog
     */
    createActivityExecutionLog: {
        methodKind: "unary";
        input: typeof CreateActivityExecutionLogRequestSchema;
        output: typeof CreateActivityExecutionLogResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.ReadActivityExecutionLog
     */
    readActivityExecutionLog: {
        methodKind: "unary";
        input: typeof ReadActivityExecutionLogRequestSchema;
        output: typeof ReadActivityExecutionLogResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.UpdateActivityExecutionLog
     */
    updateActivityExecutionLog: {
        methodKind: "unary";
        input: typeof UpdateActivityExecutionLogRequestSchema;
        output: typeof UpdateActivityExecutionLogResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.DeleteActivityExecutionLog
     */
    deleteActivityExecutionLog: {
        methodKind: "unary";
        input: typeof DeleteActivityExecutionLogRequestSchema;
        output: typeof DeleteActivityExecutionLogResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.ListActivityExecutionLogs
     */
    listActivityExecutionLogs: {
        methodKind: "unary";
        input: typeof ListActivityExecutionLogsRequestSchema;
        output: typeof ListActivityExecutionLogsResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.GetActivityExecutionLogListPageData
     */
    getActivityExecutionLogListPageData: {
        methodKind: "unary";
        input: typeof GetActivityExecutionLogListPageDataRequestSchema;
        output: typeof GetActivityExecutionLogListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityExecutionLogDomainService.GetActivityExecutionLogItemPageData
     */
    getActivityExecutionLogItemPageData: {
        methodKind: "unary";
        input: typeof GetActivityExecutionLogItemPageDataRequestSchema;
        output: typeof GetActivityExecutionLogItemPageDataResponseSchema;
    };
}>;
