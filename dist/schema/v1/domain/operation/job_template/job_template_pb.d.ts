import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { BillingRuleType, CostFlowType, FulfillmentType } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_template/job_template.proto.
 */
export declare const file_domain_operation_job_template_job_template: GenFile;
/**
 * @generated from message domain.operation.v1.JobTemplate
 */
export type JobTemplate = Message<"domain.operation.v1.JobTemplate"> & {
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional string description = 8;
     */
    description?: string;
    /**
     * @generated from field: optional domain.operation.v1.FulfillmentType default_fulfillment_type = 9;
     */
    defaultFulfillmentType?: FulfillmentType;
    /**
     * @generated from field: optional domain.operation.v1.CostFlowType default_cost_flow_type = 10;
     */
    defaultCostFlowType?: CostFlowType;
    /**
     * @generated from field: optional domain.operation.v1.BillingRuleType default_billing_rule_type = 11;
     */
    defaultBillingRuleType?: BillingRuleType;
    /**
     * @generated from field: optional string workspace_id = 12;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.JobTemplate.
 * Use `create(JobTemplateSchema)` to create a new message.
 */
export declare const JobTemplateSchema: GenMessage<JobTemplate>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateRequest
 */
export type CreateJobTemplateRequest = Message<"domain.operation.v1.CreateJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplate data = 1;
     */
    data?: JobTemplate;
};
/**
 * Describes the message domain.operation.v1.CreateJobTemplateRequest.
 * Use `create(CreateJobTemplateRequestSchema)` to create a new message.
 */
export declare const CreateJobTemplateRequestSchema: GenMessage<CreateJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateResponse
 */
export type CreateJobTemplateResponse = Message<"domain.operation.v1.CreateJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplate data = 1;
     */
    data: JobTemplate[];
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
 * Describes the message domain.operation.v1.CreateJobTemplateResponse.
 * Use `create(CreateJobTemplateResponseSchema)` to create a new message.
 */
export declare const CreateJobTemplateResponseSchema: GenMessage<CreateJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateRequest
 */
export type ReadJobTemplateRequest = Message<"domain.operation.v1.ReadJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplate data = 1;
     */
    data?: JobTemplate;
};
/**
 * Describes the message domain.operation.v1.ReadJobTemplateRequest.
 * Use `create(ReadJobTemplateRequestSchema)` to create a new message.
 */
export declare const ReadJobTemplateRequestSchema: GenMessage<ReadJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateResponse
 */
export type ReadJobTemplateResponse = Message<"domain.operation.v1.ReadJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplate data = 1;
     */
    data: JobTemplate[];
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
 * Describes the message domain.operation.v1.ReadJobTemplateResponse.
 * Use `create(ReadJobTemplateResponseSchema)` to create a new message.
 */
export declare const ReadJobTemplateResponseSchema: GenMessage<ReadJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateRequest
 */
export type UpdateJobTemplateRequest = Message<"domain.operation.v1.UpdateJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplate data = 1;
     */
    data?: JobTemplate;
};
/**
 * Describes the message domain.operation.v1.UpdateJobTemplateRequest.
 * Use `create(UpdateJobTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateJobTemplateRequestSchema: GenMessage<UpdateJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateResponse
 */
export type UpdateJobTemplateResponse = Message<"domain.operation.v1.UpdateJobTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplate data = 1;
     */
    data: JobTemplate[];
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
 * Describes the message domain.operation.v1.UpdateJobTemplateResponse.
 * Use `create(UpdateJobTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateJobTemplateResponseSchema: GenMessage<UpdateJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateRequest
 */
export type DeleteJobTemplateRequest = Message<"domain.operation.v1.DeleteJobTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplate data = 1;
     */
    data?: JobTemplate;
};
/**
 * Describes the message domain.operation.v1.DeleteJobTemplateRequest.
 * Use `create(DeleteJobTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteJobTemplateRequestSchema: GenMessage<DeleteJobTemplateRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateResponse
 */
export type DeleteJobTemplateResponse = Message<"domain.operation.v1.DeleteJobTemplateResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobTemplateResponse.
 * Use `create(DeleteJobTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteJobTemplateResponseSchema: GenMessage<DeleteJobTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplatesRequest
 */
export type ListJobTemplatesRequest = Message<"domain.operation.v1.ListJobTemplatesRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobTemplatesRequest.
 * Use `create(ListJobTemplatesRequestSchema)` to create a new message.
 */
export declare const ListJobTemplatesRequestSchema: GenMessage<ListJobTemplatesRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplatesResponse
 */
export type ListJobTemplatesResponse = Message<"domain.operation.v1.ListJobTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplate data = 1;
     */
    data: JobTemplate[];
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
 * Describes the message domain.operation.v1.ListJobTemplatesResponse.
 * Use `create(ListJobTemplatesResponseSchema)` to create a new message.
 */
export declare const ListJobTemplatesResponseSchema: GenMessage<ListJobTemplatesResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateListPageDataRequest
 */
export type GetJobTemplateListPageDataRequest = Message<"domain.operation.v1.GetJobTemplateListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobTemplateListPageDataRequest.
 * Use `create(GetJobTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplateListPageDataRequestSchema: GenMessage<GetJobTemplateListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateListPageDataResponse
 */
export type GetJobTemplateListPageDataResponse = Message<"domain.operation.v1.GetJobTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplate job_template_list = 1;
     */
    jobTemplateList: JobTemplate[];
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
 * Describes the message domain.operation.v1.GetJobTemplateListPageDataResponse.
 * Use `create(GetJobTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplateListPageDataResponseSchema: GenMessage<GetJobTemplateListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateItemPageDataRequest
 */
export type GetJobTemplateItemPageDataRequest = Message<"domain.operation.v1.GetJobTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string job_template_id = 1;
     */
    jobTemplateId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobTemplateItemPageDataRequest.
 * Use `create(GetJobTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplateItemPageDataRequestSchema: GenMessage<GetJobTemplateItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateItemPageDataResponse
 */
export type GetJobTemplateItemPageDataResponse = Message<"domain.operation.v1.GetJobTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobTemplate job_template = 1;
     */
    jobTemplate?: JobTemplate;
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
 * Describes the message domain.operation.v1.GetJobTemplateItemPageDataResponse.
 * Use `create(GetJobTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplateItemPageDataResponseSchema: GenMessage<GetJobTemplateItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.JobTemplateDomainService
 */
export declare const JobTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.CreateJobTemplate
     */
    createJobTemplate: {
        methodKind: "unary";
        input: typeof CreateJobTemplateRequestSchema;
        output: typeof CreateJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.ReadJobTemplate
     */
    readJobTemplate: {
        methodKind: "unary";
        input: typeof ReadJobTemplateRequestSchema;
        output: typeof ReadJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.UpdateJobTemplate
     */
    updateJobTemplate: {
        methodKind: "unary";
        input: typeof UpdateJobTemplateRequestSchema;
        output: typeof UpdateJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.DeleteJobTemplate
     */
    deleteJobTemplate: {
        methodKind: "unary";
        input: typeof DeleteJobTemplateRequestSchema;
        output: typeof DeleteJobTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.ListJobTemplates
     */
    listJobTemplates: {
        methodKind: "unary";
        input: typeof ListJobTemplatesRequestSchema;
        output: typeof ListJobTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.GetJobTemplateListPageData
     */
    getJobTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplateListPageDataRequestSchema;
        output: typeof GetJobTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateDomainService.GetJobTemplateItemPageData
     */
    getJobTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplateItemPageDataRequestSchema;
        output: typeof GetJobTemplateItemPageDataResponseSchema;
    };
}>;
