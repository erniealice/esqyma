import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/activity/activity.proto.
 */
export declare const file_domain_workflow_activity_activity: GenFile;
/**
 * Activity represents a specific instance of a workflow activity
 *
 * @generated from message domain.workflow.v1.Activity
 */
export type Activity = Message<"domain.workflow.v1.Activity"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string stage_id = 2;
     */
    stageId: string;
    /**
     * @generated from field: string activity_template_id = 3;
     */
    activityTemplateId: string;
    /**
     * @generated from field: string name = 4;
     */
    name: string;
    /**
     * @generated from field: optional string description = 5;
     */
    description?: string;
    /**
     * @generated from field: string status = 6;
     */
    status: string;
    /**
     * @generated from field: string priority = 7;
     */
    priority: string;
    /**
     * @generated from field: optional string assigned_to = 8;
     */
    assignedTo?: string;
    /**
     * @generated from field: optional string completed_by = 9;
     */
    completedBy?: string;
    /**
     * @generated from field: optional int64 date_assigned = 10;
     */
    dateAssigned?: bigint;
    /**
     * @generated from field: optional string date_assigned_string = 11;
     */
    dateAssignedString?: string;
    /**
     * @generated from field: optional int64 date_started = 12;
     */
    dateStarted?: bigint;
    /**
     * @generated from field: optional string date_started_string = 13;
     */
    dateStartedString?: string;
    /**
     * @generated from field: optional int64 date_completed = 14;
     */
    dateCompleted?: bigint;
    /**
     * @generated from field: optional string date_completed_string = 15;
     */
    dateCompletedString?: string;
    /**
     * @generated from field: optional int64 date_due = 16;
     */
    dateDue?: bigint;
    /**
     * @generated from field: optional string date_due_string = 17;
     */
    dateDueString?: string;
    /**
     * @generated from field: optional string input_data_json = 18;
     */
    inputDataJson?: string;
    /**
     * @generated from field: optional string output_data_json = 19;
     */
    outputDataJson?: string;
    /**
     * @generated from field: optional string result_json = 20;
     */
    resultJson?: string;
    /**
     * @generated from field: optional string error_message = 21;
     */
    errorMessage?: string;
    /**
     * @generated from field: optional string approval_comments = 22;
     */
    approvalComments?: string;
    /**
     * @generated from field: optional string rejection_reason = 23;
     */
    rejectionReason?: string;
    /**
     * @generated from field: optional int32 estimated_duration_minutes = 24;
     */
    estimatedDurationMinutes?: number;
    /**
     * @generated from field: optional int32 actual_duration_minutes = 25;
     */
    actualDurationMinutes?: number;
    /**
     * @generated from field: optional string created_by = 26;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 27;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 28;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 29;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 30;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 31;
     */
    active: boolean;
    /**
     * @generated from field: optional int32 completion_percentage = 32;
     */
    completionPercentage?: number;
    /**
     * @generated from field: repeated string attachment_ids = 33;
     */
    attachmentIds: string[];
    /**
     * Activity position within its stage (from ActivityTemplate.order_index)
     *
     * @generated from field: optional int32 order_index = 34;
     */
    orderIndex?: number;
    /**
     * Parent stage position within workflow (from StageTemplate.order_index)
     *
     * @generated from field: optional int32 stage_order_index = 35;
     */
    stageOrderIndex?: number;
};
/**
 * Describes the message domain.workflow.v1.Activity.
 * Use `create(ActivitySchema)` to create a new message.
 */
export declare const ActivitySchema: GenMessage<Activity>;
/**
 * CreateActivityRequest is the request message for creating an activity
 *
 * @generated from message domain.workflow.v1.CreateActivityRequest
 */
export type CreateActivityRequest = Message<"domain.workflow.v1.CreateActivityRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Activity data = 1;
     */
    data?: Activity;
};
/**
 * Describes the message domain.workflow.v1.CreateActivityRequest.
 * Use `create(CreateActivityRequestSchema)` to create a new message.
 */
export declare const CreateActivityRequestSchema: GenMessage<CreateActivityRequest>;
/**
 * CreateActivityResponse is the response message for creating an activity
 *
 * @generated from message domain.workflow.v1.CreateActivityResponse
 */
export type CreateActivityResponse = Message<"domain.workflow.v1.CreateActivityResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Activity data = 1;
     */
    data: Activity[];
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
 * Describes the message domain.workflow.v1.CreateActivityResponse.
 * Use `create(CreateActivityResponseSchema)` to create a new message.
 */
export declare const CreateActivityResponseSchema: GenMessage<CreateActivityResponse>;
/**
 * ReadActivityRequest is the request message for reading an activity
 *
 * @generated from message domain.workflow.v1.ReadActivityRequest
 */
export type ReadActivityRequest = Message<"domain.workflow.v1.ReadActivityRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Activity data = 1;
     */
    data?: Activity;
};
/**
 * Describes the message domain.workflow.v1.ReadActivityRequest.
 * Use `create(ReadActivityRequestSchema)` to create a new message.
 */
export declare const ReadActivityRequestSchema: GenMessage<ReadActivityRequest>;
/**
 * ReadActivityResponse is the response message for reading an activity
 *
 * @generated from message domain.workflow.v1.ReadActivityResponse
 */
export type ReadActivityResponse = Message<"domain.workflow.v1.ReadActivityResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Activity data = 1;
     */
    data: Activity[];
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
 * Describes the message domain.workflow.v1.ReadActivityResponse.
 * Use `create(ReadActivityResponseSchema)` to create a new message.
 */
export declare const ReadActivityResponseSchema: GenMessage<ReadActivityResponse>;
/**
 * UpdateActivityRequest is the request message for updating an activity
 *
 * @generated from message domain.workflow.v1.UpdateActivityRequest
 */
export type UpdateActivityRequest = Message<"domain.workflow.v1.UpdateActivityRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Activity data = 1;
     */
    data?: Activity;
};
/**
 * Describes the message domain.workflow.v1.UpdateActivityRequest.
 * Use `create(UpdateActivityRequestSchema)` to create a new message.
 */
export declare const UpdateActivityRequestSchema: GenMessage<UpdateActivityRequest>;
/**
 * UpdateActivityResponse is the response message for updating an activity
 *
 * @generated from message domain.workflow.v1.UpdateActivityResponse
 */
export type UpdateActivityResponse = Message<"domain.workflow.v1.UpdateActivityResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Activity data = 1;
     */
    data: Activity[];
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
 * Describes the message domain.workflow.v1.UpdateActivityResponse.
 * Use `create(UpdateActivityResponseSchema)` to create a new message.
 */
export declare const UpdateActivityResponseSchema: GenMessage<UpdateActivityResponse>;
/**
 * DeleteActivityRequest is the request message for deleting an activity
 *
 * @generated from message domain.workflow.v1.DeleteActivityRequest
 */
export type DeleteActivityRequest = Message<"domain.workflow.v1.DeleteActivityRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Activity data = 1;
     */
    data?: Activity;
};
/**
 * Describes the message domain.workflow.v1.DeleteActivityRequest.
 * Use `create(DeleteActivityRequestSchema)` to create a new message.
 */
export declare const DeleteActivityRequestSchema: GenMessage<DeleteActivityRequest>;
/**
 * DeleteActivityResponse is the response message for deleting an activity
 *
 * @generated from message domain.workflow.v1.DeleteActivityResponse
 */
export type DeleteActivityResponse = Message<"domain.workflow.v1.DeleteActivityResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteActivityResponse.
 * Use `create(DeleteActivityResponseSchema)` to create a new message.
 */
export declare const DeleteActivityResponseSchema: GenMessage<DeleteActivityResponse>;
/**
 * ListActivitiesRequest is the request message for listing activities
 *
 * @generated from message domain.workflow.v1.ListActivitiesRequest
 */
export type ListActivitiesRequest = Message<"domain.workflow.v1.ListActivitiesRequest"> & {
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
 * Describes the message domain.workflow.v1.ListActivitiesRequest.
 * Use `create(ListActivitiesRequestSchema)` to create a new message.
 */
export declare const ListActivitiesRequestSchema: GenMessage<ListActivitiesRequest>;
/**
 * ListActivitiesResponse is the response message for listing activities
 *
 * @generated from message domain.workflow.v1.ListActivitiesResponse
 */
export type ListActivitiesResponse = Message<"domain.workflow.v1.ListActivitiesResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Activity data = 1;
     */
    data: Activity[];
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
 * Describes the message domain.workflow.v1.ListActivitiesResponse.
 * Use `create(ListActivitiesResponseSchema)` to create a new message.
 */
export declare const ListActivitiesResponseSchema: GenMessage<ListActivitiesResponse>;
/**
 * GetActivityListPageDataRequest is the request message for getting activity list page data
 *
 * @generated from message domain.workflow.v1.GetActivityListPageDataRequest
 */
export type GetActivityListPageDataRequest = Message<"domain.workflow.v1.GetActivityListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetActivityListPageDataRequest.
 * Use `create(GetActivityListPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityListPageDataRequestSchema: GenMessage<GetActivityListPageDataRequest>;
/**
 * GetActivityListPageDataResponse is the response message for getting activity list page data
 *
 * @generated from message domain.workflow.v1.GetActivityListPageDataResponse
 */
export type GetActivityListPageDataResponse = Message<"domain.workflow.v1.GetActivityListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Activity activity_list = 1;
     */
    activityList: Activity[];
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
 * Describes the message domain.workflow.v1.GetActivityListPageDataResponse.
 * Use `create(GetActivityListPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityListPageDataResponseSchema: GenMessage<GetActivityListPageDataResponse>;
/**
 * GetActivityItemPageDataRequest is the request message for getting activity item page data
 *
 * @generated from message domain.workflow.v1.GetActivityItemPageDataRequest
 */
export type GetActivityItemPageDataRequest = Message<"domain.workflow.v1.GetActivityItemPageDataRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
};
/**
 * Describes the message domain.workflow.v1.GetActivityItemPageDataRequest.
 * Use `create(GetActivityItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityItemPageDataRequestSchema: GenMessage<GetActivityItemPageDataRequest>;
/**
 * GetActivityItemPageDataResponse is the response message for getting activity item page data
 *
 * @generated from message domain.workflow.v1.GetActivityItemPageDataResponse
 */
export type GetActivityItemPageDataResponse = Message<"domain.workflow.v1.GetActivityItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.GetActivityItemPageDataResponse.
 * Use `create(GetActivityItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityItemPageDataResponseSchema: GenMessage<GetActivityItemPageDataResponse>;
/**
 * GetActivitiesByStageRequest is the request message for getting activities by stage
 *
 * @generated from message domain.workflow.v1.GetActivitiesByStageRequest
 */
export type GetActivitiesByStageRequest = Message<"domain.workflow.v1.GetActivitiesByStageRequest"> & {
    /**
     * @generated from field: string stage_id = 1;
     */
    stageId: string;
};
/**
 * Describes the message domain.workflow.v1.GetActivitiesByStageRequest.
 * Use `create(GetActivitiesByStageRequestSchema)` to create a new message.
 */
export declare const GetActivitiesByStageRequestSchema: GenMessage<GetActivitiesByStageRequest>;
/**
 * GetActivitiesByStageResponse is the response message for getting activities by stage
 *
 * @generated from message domain.workflow.v1.GetActivitiesByStageResponse
 */
export type GetActivitiesByStageResponse = Message<"domain.workflow.v1.GetActivitiesByStageResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Activity activities = 1;
     */
    activities: Activity[];
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
 * Describes the message domain.workflow.v1.GetActivitiesByStageResponse.
 * Use `create(GetActivitiesByStageResponseSchema)` to create a new message.
 */
export declare const GetActivitiesByStageResponseSchema: GenMessage<GetActivitiesByStageResponse>;
/**
 * AssignActivityRequest is the request message for assigning an activity
 *
 * @generated from message domain.workflow.v1.AssignActivityRequest
 */
export type AssignActivityRequest = Message<"domain.workflow.v1.AssignActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string assigned_to = 2;
     */
    assignedTo: string;
    /**
     * @generated from field: optional string assigned_by = 3;
     */
    assignedBy?: string;
};
/**
 * Describes the message domain.workflow.v1.AssignActivityRequest.
 * Use `create(AssignActivityRequestSchema)` to create a new message.
 */
export declare const AssignActivityRequestSchema: GenMessage<AssignActivityRequest>;
/**
 * AssignActivityResponse is the response message for assigning an activity
 *
 * @generated from message domain.workflow.v1.AssignActivityResponse
 */
export type AssignActivityResponse = Message<"domain.workflow.v1.AssignActivityResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.AssignActivityResponse.
 * Use `create(AssignActivityResponseSchema)` to create a new message.
 */
export declare const AssignActivityResponseSchema: GenMessage<AssignActivityResponse>;
/**
 * StartActivityRequest is the request message for starting an activity
 *
 * @generated from message domain.workflow.v1.StartActivityRequest
 */
export type StartActivityRequest = Message<"domain.workflow.v1.StartActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: optional string started_by = 2;
     */
    startedBy?: string;
};
/**
 * Describes the message domain.workflow.v1.StartActivityRequest.
 * Use `create(StartActivityRequestSchema)` to create a new message.
 */
export declare const StartActivityRequestSchema: GenMessage<StartActivityRequest>;
/**
 * StartActivityResponse is the response message for starting an activity
 *
 * @generated from message domain.workflow.v1.StartActivityResponse
 */
export type StartActivityResponse = Message<"domain.workflow.v1.StartActivityResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.StartActivityResponse.
 * Use `create(StartActivityResponseSchema)` to create a new message.
 */
export declare const StartActivityResponseSchema: GenMessage<StartActivityResponse>;
/**
 * CompleteActivityRequest is the request message for completing an activity
 *
 * @generated from message domain.workflow.v1.CompleteActivityRequest
 */
export type CompleteActivityRequest = Message<"domain.workflow.v1.CompleteActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: optional string completed_by = 2;
     */
    completedBy?: string;
    /**
     * @generated from field: optional string output_data_json = 3;
     */
    outputDataJson?: string;
    /**
     * @generated from field: optional string result_json = 4;
     */
    resultJson?: string;
};
/**
 * Describes the message domain.workflow.v1.CompleteActivityRequest.
 * Use `create(CompleteActivityRequestSchema)` to create a new message.
 */
export declare const CompleteActivityRequestSchema: GenMessage<CompleteActivityRequest>;
/**
 * CompleteActivityResponse is the response message for completing an activity
 *
 * @generated from message domain.workflow.v1.CompleteActivityResponse
 */
export type CompleteActivityResponse = Message<"domain.workflow.v1.CompleteActivityResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.CompleteActivityResponse.
 * Use `create(CompleteActivityResponseSchema)` to create a new message.
 */
export declare const CompleteActivityResponseSchema: GenMessage<CompleteActivityResponse>;
/**
 * CancelActivityRequest is the request message for cancelling an activity
 *
 * @generated from message domain.workflow.v1.CancelActivityRequest
 */
export type CancelActivityRequest = Message<"domain.workflow.v1.CancelActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: optional string cancelled_by = 2;
     */
    cancelledBy?: string;
    /**
     * @generated from field: optional string cancellation_reason = 3;
     */
    cancellationReason?: string;
};
/**
 * Describes the message domain.workflow.v1.CancelActivityRequest.
 * Use `create(CancelActivityRequestSchema)` to create a new message.
 */
export declare const CancelActivityRequestSchema: GenMessage<CancelActivityRequest>;
/**
 * CancelActivityResponse is the response message for cancelling an activity
 *
 * @generated from message domain.workflow.v1.CancelActivityResponse
 */
export type CancelActivityResponse = Message<"domain.workflow.v1.CancelActivityResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.CancelActivityResponse.
 * Use `create(CancelActivityResponseSchema)` to create a new message.
 */
export declare const CancelActivityResponseSchema: GenMessage<CancelActivityResponse>;
/**
 * ApproveActivityRequest is the request message for approving an activity
 *
 * @generated from message domain.workflow.v1.ApproveActivityRequest
 */
export type ApproveActivityRequest = Message<"domain.workflow.v1.ApproveActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string approved_by = 2;
     */
    approvedBy: string;
    /**
     * @generated from field: optional string approval_comments = 3;
     */
    approvalComments?: string;
};
/**
 * Describes the message domain.workflow.v1.ApproveActivityRequest.
 * Use `create(ApproveActivityRequestSchema)` to create a new message.
 */
export declare const ApproveActivityRequestSchema: GenMessage<ApproveActivityRequest>;
/**
 * ApproveActivityResponse is the response message for approving an activity
 *
 * @generated from message domain.workflow.v1.ApproveActivityResponse
 */
export type ApproveActivityResponse = Message<"domain.workflow.v1.ApproveActivityResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.ApproveActivityResponse.
 * Use `create(ApproveActivityResponseSchema)` to create a new message.
 */
export declare const ApproveActivityResponseSchema: GenMessage<ApproveActivityResponse>;
/**
 * RejectActivityRequest is the request message for rejecting an activity
 *
 * @generated from message domain.workflow.v1.RejectActivityRequest
 */
export type RejectActivityRequest = Message<"domain.workflow.v1.RejectActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string rejected_by = 2;
     */
    rejectedBy: string;
    /**
     * @generated from field: string rejection_reason = 3;
     */
    rejectionReason: string;
    /**
     * @generated from field: optional string rejection_comments = 4;
     */
    rejectionComments?: string;
};
/**
 * Describes the message domain.workflow.v1.RejectActivityRequest.
 * Use `create(RejectActivityRequestSchema)` to create a new message.
 */
export declare const RejectActivityRequestSchema: GenMessage<RejectActivityRequest>;
/**
 * RejectActivityResponse is the response message for rejecting an activity
 *
 * @generated from message domain.workflow.v1.RejectActivityResponse
 */
export type RejectActivityResponse = Message<"domain.workflow.v1.RejectActivityResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Activity activity = 1;
     */
    activity?: Activity;
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
 * Describes the message domain.workflow.v1.RejectActivityResponse.
 * Use `create(RejectActivityResponseSchema)` to create a new message.
 */
export declare const RejectActivityResponseSchema: GenMessage<RejectActivityResponse>;
/**
 * ActivityDomainService defines the gRPC service for activity operations
 *
 * @generated from service domain.workflow.v1.ActivityDomainService
 */
export declare const ActivityDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.CreateActivity
     */
    createActivity: {
        methodKind: "unary";
        input: typeof CreateActivityRequestSchema;
        output: typeof CreateActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.ReadActivity
     */
    readActivity: {
        methodKind: "unary";
        input: typeof ReadActivityRequestSchema;
        output: typeof ReadActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.UpdateActivity
     */
    updateActivity: {
        methodKind: "unary";
        input: typeof UpdateActivityRequestSchema;
        output: typeof UpdateActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.DeleteActivity
     */
    deleteActivity: {
        methodKind: "unary";
        input: typeof DeleteActivityRequestSchema;
        output: typeof DeleteActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.ListActivities
     */
    listActivities: {
        methodKind: "unary";
        input: typeof ListActivitiesRequestSchema;
        output: typeof ListActivitiesResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.GetActivityListPageData
     */
    getActivityListPageData: {
        methodKind: "unary";
        input: typeof GetActivityListPageDataRequestSchema;
        output: typeof GetActivityListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.GetActivityItemPageData
     */
    getActivityItemPageData: {
        methodKind: "unary";
        input: typeof GetActivityItemPageDataRequestSchema;
        output: typeof GetActivityItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.GetActivitiesByStage
     */
    getActivitiesByStage: {
        methodKind: "unary";
        input: typeof GetActivitiesByStageRequestSchema;
        output: typeof GetActivitiesByStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.AssignActivity
     */
    assignActivity: {
        methodKind: "unary";
        input: typeof AssignActivityRequestSchema;
        output: typeof AssignActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.StartActivity
     */
    startActivity: {
        methodKind: "unary";
        input: typeof StartActivityRequestSchema;
        output: typeof StartActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.CompleteActivity
     */
    completeActivity: {
        methodKind: "unary";
        input: typeof CompleteActivityRequestSchema;
        output: typeof CompleteActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.CancelActivity
     */
    cancelActivity: {
        methodKind: "unary";
        input: typeof CancelActivityRequestSchema;
        output: typeof CancelActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.ApproveActivity
     */
    approveActivity: {
        methodKind: "unary";
        input: typeof ApproveActivityRequestSchema;
        output: typeof ApproveActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityDomainService.RejectActivity
     */
    rejectActivity: {
        methodKind: "unary";
        input: typeof RejectActivityRequestSchema;
        output: typeof RejectActivityResponseSchema;
    };
}>;
