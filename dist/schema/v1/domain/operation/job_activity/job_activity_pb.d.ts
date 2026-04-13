import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Job } from "../job/job_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_activity/job_activity.proto.
 */
export declare const file_domain_operation_job_activity_job_activity: GenFile;
/**
 * @generated from message domain.operation.v1.JobActivity
 */
export type JobActivity = Message<"domain.operation.v1.JobActivity"> & {
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
     * @generated from field: optional string job_task_id = 4;
     */
    jobTaskId?: string;
    /**
     * @generated from field: domain.operation.v1.EntryType entry_type = 5;
     */
    entryType: EntryType;
    /**
     * @generated from field: double quantity = 6;
     */
    quantity: number;
    /**
     * centavos
     *
     * @generated from field: int64 unit_cost = 7;
     */
    unitCost: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_cost = 8;
     */
    totalCost: bigint;
    /**
     * @generated from field: string currency = 9;
     */
    currency: string;
    /**
     * @generated from field: optional int64 entry_date = 10;
     */
    entryDate?: bigint;
    /**
     * @generated from field: optional string entry_date_string = 11;
     */
    entryDateString?: string;
    /**
     * @generated from field: optional string description = 12;
     */
    description?: string;
    /**
     * @generated from field: domain.operation.v1.BillableStatus billable_status = 13;
     */
    billableStatus: BillableStatus;
    /**
     * @generated from field: domain.operation.v1.ActivityApprovalStatus approval_status = 14;
     */
    approvalStatus: ActivityApprovalStatus;
    /**
     * @generated from field: domain.operation.v1.ActivityPostingStatus posting_status = 15;
     */
    postingStatus: ActivityPostingStatus;
    /**
     * @generated from field: optional string posted_by = 16;
     */
    postedBy?: string;
    /**
     * @generated from field: optional int64 date_posted = 17;
     */
    datePosted?: bigint;
    /**
     * @generated from field: optional string date_posted_string = 18;
     */
    datePostedString?: string;
    /**
     * @generated from field: optional string reversal_of_id = 19;
     */
    reversalOfId?: string;
    /**
     * @generated from field: optional string created_by = 20;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 21;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 22;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: bool active = 23;
     */
    active: boolean;
    /**
     * @generated from field: optional string workspace_id = 24;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.JobActivity.
 * Use `create(JobActivitySchema)` to create a new message.
 */
export declare const JobActivitySchema: GenMessage<JobActivity>;
/**
 * @generated from message domain.operation.v1.CreateJobActivityRequest
 */
export type CreateJobActivityRequest = Message<"domain.operation.v1.CreateJobActivityRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobActivity data = 1;
     */
    data?: JobActivity;
};
/**
 * Describes the message domain.operation.v1.CreateJobActivityRequest.
 * Use `create(CreateJobActivityRequestSchema)` to create a new message.
 */
export declare const CreateJobActivityRequestSchema: GenMessage<CreateJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobActivityResponse
 */
export type CreateJobActivityResponse = Message<"domain.operation.v1.CreateJobActivityResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity data = 1;
     */
    data: JobActivity[];
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
 * Describes the message domain.operation.v1.CreateJobActivityResponse.
 * Use `create(CreateJobActivityResponseSchema)` to create a new message.
 */
export declare const CreateJobActivityResponseSchema: GenMessage<CreateJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobActivityRequest
 */
export type ReadJobActivityRequest = Message<"domain.operation.v1.ReadJobActivityRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobActivity data = 1;
     */
    data?: JobActivity;
};
/**
 * Describes the message domain.operation.v1.ReadJobActivityRequest.
 * Use `create(ReadJobActivityRequestSchema)` to create a new message.
 */
export declare const ReadJobActivityRequestSchema: GenMessage<ReadJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobActivityResponse
 */
export type ReadJobActivityResponse = Message<"domain.operation.v1.ReadJobActivityResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity data = 1;
     */
    data: JobActivity[];
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
 * Describes the message domain.operation.v1.ReadJobActivityResponse.
 * Use `create(ReadJobActivityResponseSchema)` to create a new message.
 */
export declare const ReadJobActivityResponseSchema: GenMessage<ReadJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobActivityRequest
 */
export type UpdateJobActivityRequest = Message<"domain.operation.v1.UpdateJobActivityRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobActivity data = 1;
     */
    data?: JobActivity;
};
/**
 * Describes the message domain.operation.v1.UpdateJobActivityRequest.
 * Use `create(UpdateJobActivityRequestSchema)` to create a new message.
 */
export declare const UpdateJobActivityRequestSchema: GenMessage<UpdateJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobActivityResponse
 */
export type UpdateJobActivityResponse = Message<"domain.operation.v1.UpdateJobActivityResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity data = 1;
     */
    data: JobActivity[];
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
 * Describes the message domain.operation.v1.UpdateJobActivityResponse.
 * Use `create(UpdateJobActivityResponseSchema)` to create a new message.
 */
export declare const UpdateJobActivityResponseSchema: GenMessage<UpdateJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobActivityRequest
 */
export type DeleteJobActivityRequest = Message<"domain.operation.v1.DeleteJobActivityRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobActivity data = 1;
     */
    data?: JobActivity;
};
/**
 * Describes the message domain.operation.v1.DeleteJobActivityRequest.
 * Use `create(DeleteJobActivityRequestSchema)` to create a new message.
 */
export declare const DeleteJobActivityRequestSchema: GenMessage<DeleteJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobActivityResponse
 */
export type DeleteJobActivityResponse = Message<"domain.operation.v1.DeleteJobActivityResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobActivityResponse.
 * Use `create(DeleteJobActivityResponseSchema)` to create a new message.
 */
export declare const DeleteJobActivityResponseSchema: GenMessage<DeleteJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.ListJobActivitiesRequest
 */
export type ListJobActivitiesRequest = Message<"domain.operation.v1.ListJobActivitiesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobActivitiesRequest.
 * Use `create(ListJobActivitiesRequestSchema)` to create a new message.
 */
export declare const ListJobActivitiesRequestSchema: GenMessage<ListJobActivitiesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobActivitiesResponse
 */
export type ListJobActivitiesResponse = Message<"domain.operation.v1.ListJobActivitiesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity data = 1;
     */
    data: JobActivity[];
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
 * Describes the message domain.operation.v1.ListJobActivitiesResponse.
 * Use `create(ListJobActivitiesResponseSchema)` to create a new message.
 */
export declare const ListJobActivitiesResponseSchema: GenMessage<ListJobActivitiesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobActivityListPageDataRequest
 */
export type GetJobActivityListPageDataRequest = Message<"domain.operation.v1.GetJobActivityListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobActivityListPageDataRequest.
 * Use `create(GetJobActivityListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobActivityListPageDataRequestSchema: GenMessage<GetJobActivityListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobActivityListPageDataResponse
 */
export type GetJobActivityListPageDataResponse = Message<"domain.operation.v1.GetJobActivityListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity job_activity_list = 1;
     */
    jobActivityList: JobActivity[];
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
 * Describes the message domain.operation.v1.GetJobActivityListPageDataResponse.
 * Use `create(GetJobActivityListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobActivityListPageDataResponseSchema: GenMessage<GetJobActivityListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobActivityItemPageDataRequest
 */
export type GetJobActivityItemPageDataRequest = Message<"domain.operation.v1.GetJobActivityItemPageDataRequest"> & {
    /**
     * @generated from field: string job_activity_id = 1;
     */
    jobActivityId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobActivityItemPageDataRequest.
 * Use `create(GetJobActivityItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobActivityItemPageDataRequestSchema: GenMessage<GetJobActivityItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobActivityItemPageDataResponse
 */
export type GetJobActivityItemPageDataResponse = Message<"domain.operation.v1.GetJobActivityItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 1;
     */
    jobActivity?: JobActivity;
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
 * Describes the message domain.operation.v1.GetJobActivityItemPageDataResponse.
 * Use `create(GetJobActivityItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobActivityItemPageDataResponseSchema: GenMessage<GetJobActivityItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListJobActivitiesByJobRequest
 */
export type ListJobActivitiesByJobRequest = Message<"domain.operation.v1.ListJobActivitiesByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobActivitiesByJobRequest.
 * Use `create(ListJobActivitiesByJobRequestSchema)` to create a new message.
 */
export declare const ListJobActivitiesByJobRequestSchema: GenMessage<ListJobActivitiesByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListJobActivitiesByJobResponse
 */
export type ListJobActivitiesByJobResponse = Message<"domain.operation.v1.ListJobActivitiesByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobActivity job_activities = 1;
     */
    jobActivities: JobActivity[];
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
 * Describes the message domain.operation.v1.ListJobActivitiesByJobResponse.
 * Use `create(ListJobActivitiesByJobResponseSchema)` to create a new message.
 */
export declare const ListJobActivitiesByJobResponseSchema: GenMessage<ListJobActivitiesByJobResponse>;
/**
 * @generated from message domain.operation.v1.GetJobActivityRollupRequest
 */
export type GetJobActivityRollupRequest = Message<"domain.operation.v1.GetJobActivityRollupRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobActivityRollupRequest.
 * Use `create(GetJobActivityRollupRequestSchema)` to create a new message.
 */
export declare const GetJobActivityRollupRequestSchema: GenMessage<GetJobActivityRollupRequest>;
/**
 * @generated from message domain.operation.v1.CostByEntryType
 */
export type CostByEntryType = Message<"domain.operation.v1.CostByEntryType"> & {
    /**
     * @generated from field: domain.operation.v1.EntryType entry_type = 1;
     */
    entryType: EntryType;
    /**
     * centavos
     *
     * @generated from field: int64 total_cost = 2;
     */
    totalCost: bigint;
    /**
     * @generated from field: int32 count = 3;
     */
    count: number;
};
/**
 * Describes the message domain.operation.v1.CostByEntryType.
 * Use `create(CostByEntryTypeSchema)` to create a new message.
 */
export declare const CostByEntryTypeSchema: GenMessage<CostByEntryType>;
/**
 * @generated from message domain.operation.v1.GetJobActivityRollupResponse
 */
export type GetJobActivityRollupResponse = Message<"domain.operation.v1.GetJobActivityRollupResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CostByEntryType rollup = 1;
     */
    rollup: CostByEntryType[];
    /**
     * centavos
     *
     * @generated from field: int64 grand_total = 2;
     */
    grandTotal: bigint;
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.operation.v1.GetJobActivityRollupResponse.
 * Use `create(GetJobActivityRollupResponseSchema)` to create a new message.
 */
export declare const GetJobActivityRollupResponseSchema: GenMessage<GetJobActivityRollupResponse>;
/**
 * @generated from message domain.operation.v1.SubmitForApprovalRequest
 */
export type SubmitForApprovalRequest = Message<"domain.operation.v1.SubmitForApprovalRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
};
/**
 * Describes the message domain.operation.v1.SubmitForApprovalRequest.
 * Use `create(SubmitForApprovalRequestSchema)` to create a new message.
 */
export declare const SubmitForApprovalRequestSchema: GenMessage<SubmitForApprovalRequest>;
/**
 * @generated from message domain.operation.v1.SubmitForApprovalResponse
 */
export type SubmitForApprovalResponse = Message<"domain.operation.v1.SubmitForApprovalResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 1;
     */
    jobActivity?: JobActivity;
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
 * Describes the message domain.operation.v1.SubmitForApprovalResponse.
 * Use `create(SubmitForApprovalResponseSchema)` to create a new message.
 */
export declare const SubmitForApprovalResponseSchema: GenMessage<SubmitForApprovalResponse>;
/**
 * @generated from message domain.operation.v1.ApproveJobActivityRequest
 */
export type ApproveJobActivityRequest = Message<"domain.operation.v1.ApproveJobActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string approved_by = 2;
     */
    approvedBy: string;
};
/**
 * Describes the message domain.operation.v1.ApproveJobActivityRequest.
 * Use `create(ApproveJobActivityRequestSchema)` to create a new message.
 */
export declare const ApproveJobActivityRequestSchema: GenMessage<ApproveJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.ApproveJobActivityResponse
 */
export type ApproveJobActivityResponse = Message<"domain.operation.v1.ApproveJobActivityResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 1;
     */
    jobActivity?: JobActivity;
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
 * Describes the message domain.operation.v1.ApproveJobActivityResponse.
 * Use `create(ApproveJobActivityResponseSchema)` to create a new message.
 */
export declare const ApproveJobActivityResponseSchema: GenMessage<ApproveJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.RejectJobActivityRequest
 */
export type RejectJobActivityRequest = Message<"domain.operation.v1.RejectJobActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string rejected_by = 2;
     */
    rejectedBy: string;
    /**
     * @generated from field: string reason = 3;
     */
    reason: string;
};
/**
 * Describes the message domain.operation.v1.RejectJobActivityRequest.
 * Use `create(RejectJobActivityRequestSchema)` to create a new message.
 */
export declare const RejectJobActivityRequestSchema: GenMessage<RejectJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.RejectJobActivityResponse
 */
export type RejectJobActivityResponse = Message<"domain.operation.v1.RejectJobActivityResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 1;
     */
    jobActivity?: JobActivity;
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
 * Describes the message domain.operation.v1.RejectJobActivityResponse.
 * Use `create(RejectJobActivityResponseSchema)` to create a new message.
 */
export declare const RejectJobActivityResponseSchema: GenMessage<RejectJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.PostJobActivityRequest
 */
export type PostJobActivityRequest = Message<"domain.operation.v1.PostJobActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string posted_by = 2;
     */
    postedBy: string;
};
/**
 * Describes the message domain.operation.v1.PostJobActivityRequest.
 * Use `create(PostJobActivityRequestSchema)` to create a new message.
 */
export declare const PostJobActivityRequestSchema: GenMessage<PostJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.PostJobActivityResponse
 */
export type PostJobActivityResponse = Message<"domain.operation.v1.PostJobActivityResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 1;
     */
    jobActivity?: JobActivity;
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
 * Describes the message domain.operation.v1.PostJobActivityResponse.
 * Use `create(PostJobActivityResponseSchema)` to create a new message.
 */
export declare const PostJobActivityResponseSchema: GenMessage<PostJobActivityResponse>;
/**
 * @generated from message domain.operation.v1.ReverseJobActivityRequest
 */
export type ReverseJobActivityRequest = Message<"domain.operation.v1.ReverseJobActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string reversed_by = 2;
     */
    reversedBy: string;
    /**
     * @generated from field: string reason = 3;
     */
    reason: string;
};
/**
 * Describes the message domain.operation.v1.ReverseJobActivityRequest.
 * Use `create(ReverseJobActivityRequestSchema)` to create a new message.
 */
export declare const ReverseJobActivityRequestSchema: GenMessage<ReverseJobActivityRequest>;
/**
 * @generated from message domain.operation.v1.ReverseJobActivityResponse
 */
export type ReverseJobActivityResponse = Message<"domain.operation.v1.ReverseJobActivityResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 1;
     */
    jobActivity?: JobActivity;
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
 * Describes the message domain.operation.v1.ReverseJobActivityResponse.
 * Use `create(ReverseJobActivityResponseSchema)` to create a new message.
 */
export declare const ReverseJobActivityResponseSchema: GenMessage<ReverseJobActivityResponse>;
/**
 * @generated from enum domain.operation.v1.EntryType
 */
export declare enum EntryType {
    /**
     * @generated from enum value: ENTRY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ENTRY_TYPE_LABOR = 1;
     */
    LABOR = 1,
    /**
     * @generated from enum value: ENTRY_TYPE_MATERIAL = 2;
     */
    MATERIAL = 2,
    /**
     * @generated from enum value: ENTRY_TYPE_EXPENSE = 3;
     */
    EXPENSE = 3
}
/**
 * Describes the enum domain.operation.v1.EntryType.
 */
export declare const EntryTypeSchema: GenEnum<EntryType>;
/**
 * @generated from enum domain.operation.v1.BillableStatus
 */
export declare enum BillableStatus {
    /**
     * @generated from enum value: BILLABLE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: BILLABLE_STATUS_BILLABLE = 1;
     */
    BILLABLE = 1,
    /**
     * @generated from enum value: BILLABLE_STATUS_NON_BILLABLE = 2;
     */
    NON_BILLABLE = 2,
    /**
     * @generated from enum value: BILLABLE_STATUS_INCLUDED = 3;
     */
    INCLUDED = 3,
    /**
     * @generated from enum value: BILLABLE_STATUS_WRITE_OFF = 4;
     */
    WRITE_OFF = 4
}
/**
 * Describes the enum domain.operation.v1.BillableStatus.
 */
export declare const BillableStatusSchema: GenEnum<BillableStatus>;
/**
 * @generated from enum domain.operation.v1.ActivityApprovalStatus
 */
export declare enum ActivityApprovalStatus {
    /**
     * @generated from enum value: ACTIVITY_APPROVAL_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACTIVITY_APPROVAL_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: ACTIVITY_APPROVAL_STATUS_SUBMITTED = 2;
     */
    SUBMITTED = 2,
    /**
     * @generated from enum value: ACTIVITY_APPROVAL_STATUS_APPROVED = 3;
     */
    APPROVED = 3,
    /**
     * @generated from enum value: ACTIVITY_APPROVAL_STATUS_REJECTED = 4;
     */
    REJECTED = 4
}
/**
 * Describes the enum domain.operation.v1.ActivityApprovalStatus.
 */
export declare const ActivityApprovalStatusSchema: GenEnum<ActivityApprovalStatus>;
/**
 * @generated from enum domain.operation.v1.ActivityPostingStatus
 */
export declare enum ActivityPostingStatus {
    /**
     * @generated from enum value: ACTIVITY_POSTING_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACTIVITY_POSTING_STATUS_UNPOSTED = 1;
     */
    UNPOSTED = 1,
    /**
     * @generated from enum value: ACTIVITY_POSTING_STATUS_POSTED = 2;
     */
    POSTED = 2,
    /**
     * @generated from enum value: ACTIVITY_POSTING_STATUS_REVERSED = 3;
     */
    REVERSED = 3
}
/**
 * Describes the enum domain.operation.v1.ActivityPostingStatus.
 */
export declare const ActivityPostingStatusSchema: GenEnum<ActivityPostingStatus>;
/**
 * @generated from service domain.operation.v1.JobActivityDomainService
 */
export declare const JobActivityDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.CreateJobActivity
     */
    createJobActivity: {
        methodKind: "unary";
        input: typeof CreateJobActivityRequestSchema;
        output: typeof CreateJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.ReadJobActivity
     */
    readJobActivity: {
        methodKind: "unary";
        input: typeof ReadJobActivityRequestSchema;
        output: typeof ReadJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.UpdateJobActivity
     */
    updateJobActivity: {
        methodKind: "unary";
        input: typeof UpdateJobActivityRequestSchema;
        output: typeof UpdateJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.DeleteJobActivity
     */
    deleteJobActivity: {
        methodKind: "unary";
        input: typeof DeleteJobActivityRequestSchema;
        output: typeof DeleteJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.ListJobActivities
     */
    listJobActivities: {
        methodKind: "unary";
        input: typeof ListJobActivitiesRequestSchema;
        output: typeof ListJobActivitiesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.GetJobActivityListPageData
     */
    getJobActivityListPageData: {
        methodKind: "unary";
        input: typeof GetJobActivityListPageDataRequestSchema;
        output: typeof GetJobActivityListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.GetJobActivityItemPageData
     */
    getJobActivityItemPageData: {
        methodKind: "unary";
        input: typeof GetJobActivityItemPageDataRequestSchema;
        output: typeof GetJobActivityItemPageDataResponseSchema;
    };
    /**
     * Extra RPCs
     *
     * @generated from rpc domain.operation.v1.JobActivityDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListJobActivitiesByJobRequestSchema;
        output: typeof ListJobActivitiesByJobResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.GetJobActivityRollup
     */
    getJobActivityRollup: {
        methodKind: "unary";
        input: typeof GetJobActivityRollupRequestSchema;
        output: typeof GetJobActivityRollupResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.SubmitForApproval
     */
    submitForApproval: {
        methodKind: "unary";
        input: typeof SubmitForApprovalRequestSchema;
        output: typeof SubmitForApprovalResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.ApproveActivity
     */
    approveActivity: {
        methodKind: "unary";
        input: typeof ApproveJobActivityRequestSchema;
        output: typeof ApproveJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.RejectActivity
     */
    rejectActivity: {
        methodKind: "unary";
        input: typeof RejectJobActivityRequestSchema;
        output: typeof RejectJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.PostActivity
     */
    postActivity: {
        methodKind: "unary";
        input: typeof PostJobActivityRequestSchema;
        output: typeof PostJobActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobActivityDomainService.ReverseActivity
     */
    reverseActivity: {
        methodKind: "unary";
        input: typeof ReverseJobActivityRequestSchema;
        output: typeof ReverseJobActivityResponseSchema;
    };
}>;
