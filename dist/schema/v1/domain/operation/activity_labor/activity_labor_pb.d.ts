import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobActivity } from "../job_activity/job_activity_pb";
import type { Staff } from "../../entity/staff/staff_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/activity_labor/activity_labor.proto.
 */
export declare const file_domain_operation_activity_labor_activity_labor: GenFile;
/**
 * @generated from message domain.operation.v1.ActivityLabor
 */
export type ActivityLabor = Message<"domain.operation.v1.ActivityLabor"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 2;
     */
    jobActivity?: JobActivity;
    /**
     * @generated from field: string staff_id = 3;
     */
    staffId: string;
    /**
     * @generated from field: optional domain.entity.v1.Staff staff = 4;
     */
    staff?: Staff;
    /**
     * @generated from field: double hours = 5;
     */
    hours: number;
    /**
     * @generated from field: domain.operation.v1.RateType rate_type = 6;
     */
    rateType: RateType;
    /**
     * @generated from field: optional int64 time_start = 7;
     */
    timeStart?: bigint;
    /**
     * @generated from field: optional string time_start_string = 8;
     */
    timeStartString?: string;
    /**
     * @generated from field: optional int64 time_end = 9;
     */
    timeEnd?: bigint;
    /**
     * @generated from field: optional string time_end_string = 10;
     */
    timeEndString?: string;
};
/**
 * Describes the message domain.operation.v1.ActivityLabor.
 * Use `create(ActivityLaborSchema)` to create a new message.
 */
export declare const ActivityLaborSchema: GenMessage<ActivityLabor>;
/**
 * @generated from message domain.operation.v1.CreateActivityLaborRequest
 */
export type CreateActivityLaborRequest = Message<"domain.operation.v1.CreateActivityLaborRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityLabor data = 1;
     */
    data?: ActivityLabor;
};
/**
 * Describes the message domain.operation.v1.CreateActivityLaborRequest.
 * Use `create(CreateActivityLaborRequestSchema)` to create a new message.
 */
export declare const CreateActivityLaborRequestSchema: GenMessage<CreateActivityLaborRequest>;
/**
 * @generated from message domain.operation.v1.CreateActivityLaborResponse
 */
export type CreateActivityLaborResponse = Message<"domain.operation.v1.CreateActivityLaborResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor data = 1;
     */
    data: ActivityLabor[];
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
 * Describes the message domain.operation.v1.CreateActivityLaborResponse.
 * Use `create(CreateActivityLaborResponseSchema)` to create a new message.
 */
export declare const CreateActivityLaborResponseSchema: GenMessage<CreateActivityLaborResponse>;
/**
 * @generated from message domain.operation.v1.ReadActivityLaborRequest
 */
export type ReadActivityLaborRequest = Message<"domain.operation.v1.ReadActivityLaborRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityLabor data = 1;
     */
    data?: ActivityLabor;
};
/**
 * Describes the message domain.operation.v1.ReadActivityLaborRequest.
 * Use `create(ReadActivityLaborRequestSchema)` to create a new message.
 */
export declare const ReadActivityLaborRequestSchema: GenMessage<ReadActivityLaborRequest>;
/**
 * @generated from message domain.operation.v1.ReadActivityLaborResponse
 */
export type ReadActivityLaborResponse = Message<"domain.operation.v1.ReadActivityLaborResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor data = 1;
     */
    data: ActivityLabor[];
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
 * Describes the message domain.operation.v1.ReadActivityLaborResponse.
 * Use `create(ReadActivityLaborResponseSchema)` to create a new message.
 */
export declare const ReadActivityLaborResponseSchema: GenMessage<ReadActivityLaborResponse>;
/**
 * @generated from message domain.operation.v1.UpdateActivityLaborRequest
 */
export type UpdateActivityLaborRequest = Message<"domain.operation.v1.UpdateActivityLaborRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityLabor data = 1;
     */
    data?: ActivityLabor;
};
/**
 * Describes the message domain.operation.v1.UpdateActivityLaborRequest.
 * Use `create(UpdateActivityLaborRequestSchema)` to create a new message.
 */
export declare const UpdateActivityLaborRequestSchema: GenMessage<UpdateActivityLaborRequest>;
/**
 * @generated from message domain.operation.v1.UpdateActivityLaborResponse
 */
export type UpdateActivityLaborResponse = Message<"domain.operation.v1.UpdateActivityLaborResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor data = 1;
     */
    data: ActivityLabor[];
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
 * Describes the message domain.operation.v1.UpdateActivityLaborResponse.
 * Use `create(UpdateActivityLaborResponseSchema)` to create a new message.
 */
export declare const UpdateActivityLaborResponseSchema: GenMessage<UpdateActivityLaborResponse>;
/**
 * @generated from message domain.operation.v1.DeleteActivityLaborRequest
 */
export type DeleteActivityLaborRequest = Message<"domain.operation.v1.DeleteActivityLaborRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityLabor data = 1;
     */
    data?: ActivityLabor;
};
/**
 * Describes the message domain.operation.v1.DeleteActivityLaborRequest.
 * Use `create(DeleteActivityLaborRequestSchema)` to create a new message.
 */
export declare const DeleteActivityLaborRequestSchema: GenMessage<DeleteActivityLaborRequest>;
/**
 * @generated from message domain.operation.v1.DeleteActivityLaborResponse
 */
export type DeleteActivityLaborResponse = Message<"domain.operation.v1.DeleteActivityLaborResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteActivityLaborResponse.
 * Use `create(DeleteActivityLaborResponseSchema)` to create a new message.
 */
export declare const DeleteActivityLaborResponseSchema: GenMessage<DeleteActivityLaborResponse>;
/**
 * @generated from message domain.operation.v1.ListActivityLaborsRequest
 */
export type ListActivityLaborsRequest = Message<"domain.operation.v1.ListActivityLaborsRequest"> & {
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
 * Describes the message domain.operation.v1.ListActivityLaborsRequest.
 * Use `create(ListActivityLaborsRequestSchema)` to create a new message.
 */
export declare const ListActivityLaborsRequestSchema: GenMessage<ListActivityLaborsRequest>;
/**
 * @generated from message domain.operation.v1.ListActivityLaborsResponse
 */
export type ListActivityLaborsResponse = Message<"domain.operation.v1.ListActivityLaborsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor data = 1;
     */
    data: ActivityLabor[];
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
 * Describes the message domain.operation.v1.ListActivityLaborsResponse.
 * Use `create(ListActivityLaborsResponseSchema)` to create a new message.
 */
export declare const ListActivityLaborsResponseSchema: GenMessage<ListActivityLaborsResponse>;
/**
 * @generated from message domain.operation.v1.GetActivityLaborListPageDataRequest
 */
export type GetActivityLaborListPageDataRequest = Message<"domain.operation.v1.GetActivityLaborListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetActivityLaborListPageDataRequest.
 * Use `create(GetActivityLaborListPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityLaborListPageDataRequestSchema: GenMessage<GetActivityLaborListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetActivityLaborListPageDataResponse
 */
export type GetActivityLaborListPageDataResponse = Message<"domain.operation.v1.GetActivityLaborListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor activity_labor_list = 1;
     */
    activityLaborList: ActivityLabor[];
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
 * Describes the message domain.operation.v1.GetActivityLaborListPageDataResponse.
 * Use `create(GetActivityLaborListPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityLaborListPageDataResponseSchema: GenMessage<GetActivityLaborListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetActivityLaborItemPageDataRequest
 */
export type GetActivityLaborItemPageDataRequest = Message<"domain.operation.v1.GetActivityLaborItemPageDataRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
};
/**
 * Describes the message domain.operation.v1.GetActivityLaborItemPageDataRequest.
 * Use `create(GetActivityLaborItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityLaborItemPageDataRequestSchema: GenMessage<GetActivityLaborItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetActivityLaborItemPageDataResponse
 */
export type GetActivityLaborItemPageDataResponse = Message<"domain.operation.v1.GetActivityLaborItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ActivityLabor activity_labor = 1;
     */
    activityLabor?: ActivityLabor;
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
 * Describes the message domain.operation.v1.GetActivityLaborItemPageDataResponse.
 * Use `create(GetActivityLaborItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityLaborItemPageDataResponseSchema: GenMessage<GetActivityLaborItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListActivityLaborsByStaffRequest
 */
export type ListActivityLaborsByStaffRequest = Message<"domain.operation.v1.ListActivityLaborsByStaffRequest"> & {
    /**
     * @generated from field: string staff_id = 1;
     */
    staffId: string;
};
/**
 * Describes the message domain.operation.v1.ListActivityLaborsByStaffRequest.
 * Use `create(ListActivityLaborsByStaffRequestSchema)` to create a new message.
 */
export declare const ListActivityLaborsByStaffRequestSchema: GenMessage<ListActivityLaborsByStaffRequest>;
/**
 * @generated from message domain.operation.v1.ListActivityLaborsByStaffResponse
 */
export type ListActivityLaborsByStaffResponse = Message<"domain.operation.v1.ListActivityLaborsByStaffResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor activity_labors = 1;
     */
    activityLabors: ActivityLabor[];
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
 * Describes the message domain.operation.v1.ListActivityLaborsByStaffResponse.
 * Use `create(ListActivityLaborsByStaffResponseSchema)` to create a new message.
 */
export declare const ListActivityLaborsByStaffResponseSchema: GenMessage<ListActivityLaborsByStaffResponse>;
/**
 * @generated from message domain.operation.v1.ListActivityLaborsByJobRequest
 */
export type ListActivityLaborsByJobRequest = Message<"domain.operation.v1.ListActivityLaborsByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListActivityLaborsByJobRequest.
 * Use `create(ListActivityLaborsByJobRequestSchema)` to create a new message.
 */
export declare const ListActivityLaborsByJobRequestSchema: GenMessage<ListActivityLaborsByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListActivityLaborsByJobResponse
 */
export type ListActivityLaborsByJobResponse = Message<"domain.operation.v1.ListActivityLaborsByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityLabor activity_labors = 1;
     */
    activityLabors: ActivityLabor[];
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
 * Describes the message domain.operation.v1.ListActivityLaborsByJobResponse.
 * Use `create(ListActivityLaborsByJobResponseSchema)` to create a new message.
 */
export declare const ListActivityLaborsByJobResponseSchema: GenMessage<ListActivityLaborsByJobResponse>;
/**
 * @generated from enum domain.operation.v1.RateType
 */
export declare enum RateType {
    /**
     * @generated from enum value: RATE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: RATE_TYPE_STANDARD = 1;
     */
    STANDARD = 1,
    /**
     * @generated from enum value: RATE_TYPE_OVERTIME = 2;
     */
    OVERTIME = 2,
    /**
     * @generated from enum value: RATE_TYPE_PREMIUM = 3;
     */
    PREMIUM = 3
}
/**
 * Describes the enum domain.operation.v1.RateType.
 */
export declare const RateTypeSchema: GenEnum<RateType>;
/**
 * @generated from service domain.operation.v1.ActivityLaborDomainService
 */
export declare const ActivityLaborDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.CreateActivityLabor
     */
    createActivityLabor: {
        methodKind: "unary";
        input: typeof CreateActivityLaborRequestSchema;
        output: typeof CreateActivityLaborResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.ReadActivityLabor
     */
    readActivityLabor: {
        methodKind: "unary";
        input: typeof ReadActivityLaborRequestSchema;
        output: typeof ReadActivityLaborResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.UpdateActivityLabor
     */
    updateActivityLabor: {
        methodKind: "unary";
        input: typeof UpdateActivityLaborRequestSchema;
        output: typeof UpdateActivityLaborResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.DeleteActivityLabor
     */
    deleteActivityLabor: {
        methodKind: "unary";
        input: typeof DeleteActivityLaborRequestSchema;
        output: typeof DeleteActivityLaborResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.ListActivityLabors
     */
    listActivityLabors: {
        methodKind: "unary";
        input: typeof ListActivityLaborsRequestSchema;
        output: typeof ListActivityLaborsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.GetActivityLaborListPageData
     */
    getActivityLaborListPageData: {
        methodKind: "unary";
        input: typeof GetActivityLaborListPageDataRequestSchema;
        output: typeof GetActivityLaborListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.GetActivityLaborItemPageData
     */
    getActivityLaborItemPageData: {
        methodKind: "unary";
        input: typeof GetActivityLaborItemPageDataRequestSchema;
        output: typeof GetActivityLaborItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by staff and by job
     *
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.ListByStaff
     */
    listByStaff: {
        methodKind: "unary";
        input: typeof ListActivityLaborsByStaffRequestSchema;
        output: typeof ListActivityLaborsByStaffResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityLaborDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListActivityLaborsByJobRequestSchema;
        output: typeof ListActivityLaborsByJobResponseSchema;
    };
}>;
