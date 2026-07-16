import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_category/job_category.proto.
 */
export declare const file_domain_operation_job_category_job_category: GenFile;
/**
 * JobCategory is a per-workspace, generic taxonomy node for job_templates
 * (and, denormalized, jobs). It is single-valued (a template is in exactly
 * one category) — the reference-entity shape (mirrors PlanGroup / Line), NOT
 * the N:M event_tag shape. Vertical vocabulary is lyngua-only; education seeds
 * the codes academic / subject_deportment / homeroom_deportment.
 *
 * @generated from message domain.operation.v1.JobCategory
 */
export type JobCategory = Message<"domain.operation.v1.JobCategory"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: optional string workspace_id = 8;
     */
    workspaceId?: string;
    /**
     * stable machine key (academic, …); the label pivot
     *
     * @generated from field: optional string code = 9;
     */
    code?: string;
    /**
     * tab / list order (NULLS LAST) — mirrors price_schedule.sort_order
     *
     * @generated from field: optional int32 sort_order = 10;
     */
    sortOrder?: number;
    /**
     * free-text lifecycle (parity w/ operator status-select); NOT an enum
     *
     * @generated from field: optional string status = 11;
     */
    status?: string;
};
/**
 * Describes the message domain.operation.v1.JobCategory.
 * Use `create(JobCategorySchema)` to create a new message.
 */
export declare const JobCategorySchema: GenMessage<JobCategory>;
/**
 * @generated from message domain.operation.v1.CreateJobCategoryRequest
 */
export type CreateJobCategoryRequest = Message<"domain.operation.v1.CreateJobCategoryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobCategory data = 1;
     */
    data?: JobCategory;
};
/**
 * Describes the message domain.operation.v1.CreateJobCategoryRequest.
 * Use `create(CreateJobCategoryRequestSchema)` to create a new message.
 */
export declare const CreateJobCategoryRequestSchema: GenMessage<CreateJobCategoryRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobCategoryResponse
 */
export type CreateJobCategoryResponse = Message<"domain.operation.v1.CreateJobCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobCategory data = 1;
     */
    data: JobCategory[];
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
 * Describes the message domain.operation.v1.CreateJobCategoryResponse.
 * Use `create(CreateJobCategoryResponseSchema)` to create a new message.
 */
export declare const CreateJobCategoryResponseSchema: GenMessage<CreateJobCategoryResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobCategoryRequest
 */
export type ReadJobCategoryRequest = Message<"domain.operation.v1.ReadJobCategoryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobCategory data = 1;
     */
    data?: JobCategory;
};
/**
 * Describes the message domain.operation.v1.ReadJobCategoryRequest.
 * Use `create(ReadJobCategoryRequestSchema)` to create a new message.
 */
export declare const ReadJobCategoryRequestSchema: GenMessage<ReadJobCategoryRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobCategoryResponse
 */
export type ReadJobCategoryResponse = Message<"domain.operation.v1.ReadJobCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobCategory data = 1;
     */
    data: JobCategory[];
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
 * Describes the message domain.operation.v1.ReadJobCategoryResponse.
 * Use `create(ReadJobCategoryResponseSchema)` to create a new message.
 */
export declare const ReadJobCategoryResponseSchema: GenMessage<ReadJobCategoryResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobCategoryRequest
 */
export type UpdateJobCategoryRequest = Message<"domain.operation.v1.UpdateJobCategoryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobCategory data = 1;
     */
    data?: JobCategory;
};
/**
 * Describes the message domain.operation.v1.UpdateJobCategoryRequest.
 * Use `create(UpdateJobCategoryRequestSchema)` to create a new message.
 */
export declare const UpdateJobCategoryRequestSchema: GenMessage<UpdateJobCategoryRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobCategoryResponse
 */
export type UpdateJobCategoryResponse = Message<"domain.operation.v1.UpdateJobCategoryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobCategory data = 1;
     */
    data: JobCategory[];
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
 * Describes the message domain.operation.v1.UpdateJobCategoryResponse.
 * Use `create(UpdateJobCategoryResponseSchema)` to create a new message.
 */
export declare const UpdateJobCategoryResponseSchema: GenMessage<UpdateJobCategoryResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobCategoryRequest
 */
export type DeleteJobCategoryRequest = Message<"domain.operation.v1.DeleteJobCategoryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobCategory data = 1;
     */
    data?: JobCategory;
};
/**
 * Describes the message domain.operation.v1.DeleteJobCategoryRequest.
 * Use `create(DeleteJobCategoryRequestSchema)` to create a new message.
 */
export declare const DeleteJobCategoryRequestSchema: GenMessage<DeleteJobCategoryRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobCategoryResponse
 */
export type DeleteJobCategoryResponse = Message<"domain.operation.v1.DeleteJobCategoryResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobCategoryResponse.
 * Use `create(DeleteJobCategoryResponseSchema)` to create a new message.
 */
export declare const DeleteJobCategoryResponseSchema: GenMessage<DeleteJobCategoryResponse>;
/**
 * @generated from message domain.operation.v1.ListJobCategoriesRequest
 */
export type ListJobCategoriesRequest = Message<"domain.operation.v1.ListJobCategoriesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobCategoriesRequest.
 * Use `create(ListJobCategoriesRequestSchema)` to create a new message.
 */
export declare const ListJobCategoriesRequestSchema: GenMessage<ListJobCategoriesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobCategoriesResponse
 */
export type ListJobCategoriesResponse = Message<"domain.operation.v1.ListJobCategoriesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobCategory data = 1;
     */
    data: JobCategory[];
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
 * Describes the message domain.operation.v1.ListJobCategoriesResponse.
 * Use `create(ListJobCategoriesResponseSchema)` to create a new message.
 */
export declare const ListJobCategoriesResponseSchema: GenMessage<ListJobCategoriesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobCategoryListPageDataRequest
 */
export type GetJobCategoryListPageDataRequest = Message<"domain.operation.v1.GetJobCategoryListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobCategoryListPageDataRequest.
 * Use `create(GetJobCategoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobCategoryListPageDataRequestSchema: GenMessage<GetJobCategoryListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobCategoryListPageDataResponse
 */
export type GetJobCategoryListPageDataResponse = Message<"domain.operation.v1.GetJobCategoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobCategory job_category_list = 1;
     */
    jobCategoryList: JobCategory[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.operation.v1.GetJobCategoryListPageDataResponse.
 * Use `create(GetJobCategoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobCategoryListPageDataResponseSchema: GenMessage<GetJobCategoryListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobCategoryItemPageDataRequest
 */
export type GetJobCategoryItemPageDataRequest = Message<"domain.operation.v1.GetJobCategoryItemPageDataRequest"> & {
    /**
     * @generated from field: string job_category_id = 1;
     */
    jobCategoryId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobCategoryItemPageDataRequest.
 * Use `create(GetJobCategoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobCategoryItemPageDataRequestSchema: GenMessage<GetJobCategoryItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobCategoryItemPageDataResponse
 */
export type GetJobCategoryItemPageDataResponse = Message<"domain.operation.v1.GetJobCategoryItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.JobCategory job_category = 1;
     */
    jobCategory?: JobCategory;
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
 * Describes the message domain.operation.v1.GetJobCategoryItemPageDataResponse.
 * Use `create(GetJobCategoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobCategoryItemPageDataResponseSchema: GenMessage<GetJobCategoryItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.JobCategoryDomainService
 */
export declare const JobCategoryDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.CreateJobCategory
     */
    createJobCategory: {
        methodKind: "unary";
        input: typeof CreateJobCategoryRequestSchema;
        output: typeof CreateJobCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.ReadJobCategory
     */
    readJobCategory: {
        methodKind: "unary";
        input: typeof ReadJobCategoryRequestSchema;
        output: typeof ReadJobCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.UpdateJobCategory
     */
    updateJobCategory: {
        methodKind: "unary";
        input: typeof UpdateJobCategoryRequestSchema;
        output: typeof UpdateJobCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.DeleteJobCategory
     */
    deleteJobCategory: {
        methodKind: "unary";
        input: typeof DeleteJobCategoryRequestSchema;
        output: typeof DeleteJobCategoryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.ListJobCategories
     */
    listJobCategories: {
        methodKind: "unary";
        input: typeof ListJobCategoriesRequestSchema;
        output: typeof ListJobCategoriesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.GetJobCategoryListPageData
     */
    getJobCategoryListPageData: {
        methodKind: "unary";
        input: typeof GetJobCategoryListPageDataRequestSchema;
        output: typeof GetJobCategoryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobCategoryDomainService.GetJobCategoryItemPageData
     */
    getJobCategoryItemPageData: {
        methodKind: "unary";
        input: typeof GetJobCategoryItemPageDataRequestSchema;
        output: typeof GetJobCategoryItemPageDataResponseSchema;
    };
}>;
