import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { AggregationMethod } from "../enums/enums_pb";
import type { OutcomeCriteria } from "../outcome_criteria/outcome_criteria_pb";
import type { JobTemplateTask } from "../job_template_task/job_template_task_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/template_task_criteria/template_task_criteria.proto.
 */
export declare const file_domain_operation_template_task_criteria_template_task_criteria: GenFile;
/**
 * @generated from message domain.operation.v1.TemplateTaskCriteria
 */
export type TemplateTaskCriteria = Message<"domain.operation.v1.TemplateTaskCriteria"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string job_template_task_id = 2;
     */
    jobTemplateTaskId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTemplateTask job_template_task = 3;
     */
    jobTemplateTask?: JobTemplateTask;
    /**
     * @generated from field: string outcome_criteria_id = 4;
     */
    outcomeCriteriaId: string;
    /**
     * @generated from field: optional domain.operation.v1.OutcomeCriteria outcome_criteria = 5;
     */
    outcomeCriteria?: OutcomeCriteria;
    /**
     * @generated from field: int32 sequence_order = 6;
     */
    sequenceOrder: number;
    /**
     * @generated from field: optional bool required_override = 7;
     */
    requiredOverride?: boolean;
    /**
     * @generated from field: optional double weight_override = 8;
     */
    weightOverride?: number;
    /**
     * @generated from field: optional domain.operation.v1.AggregationMethod aggregation_method_override = 9;
     */
    aggregationMethodOverride?: AggregationMethod;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.operation.v1.TemplateTaskCriteria.
 * Use `create(TemplateTaskCriteriaSchema)` to create a new message.
 */
export declare const TemplateTaskCriteriaSchema: GenMessage<TemplateTaskCriteria>;
/**
 * @generated from message domain.operation.v1.CreateTemplateTaskCriteriaRequest
 */
export type CreateTemplateTaskCriteriaRequest = Message<"domain.operation.v1.CreateTemplateTaskCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data?: TemplateTaskCriteria;
};
/**
 * Describes the message domain.operation.v1.CreateTemplateTaskCriteriaRequest.
 * Use `create(CreateTemplateTaskCriteriaRequestSchema)` to create a new message.
 */
export declare const CreateTemplateTaskCriteriaRequestSchema: GenMessage<CreateTemplateTaskCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.CreateTemplateTaskCriteriaResponse
 */
export type CreateTemplateTaskCriteriaResponse = Message<"domain.operation.v1.CreateTemplateTaskCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.CreateTemplateTaskCriteriaResponse.
 * Use `create(CreateTemplateTaskCriteriaResponseSchema)` to create a new message.
 */
export declare const CreateTemplateTaskCriteriaResponseSchema: GenMessage<CreateTemplateTaskCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ReadTemplateTaskCriteriaRequest
 */
export type ReadTemplateTaskCriteriaRequest = Message<"domain.operation.v1.ReadTemplateTaskCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data?: TemplateTaskCriteria;
};
/**
 * Describes the message domain.operation.v1.ReadTemplateTaskCriteriaRequest.
 * Use `create(ReadTemplateTaskCriteriaRequestSchema)` to create a new message.
 */
export declare const ReadTemplateTaskCriteriaRequestSchema: GenMessage<ReadTemplateTaskCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.ReadTemplateTaskCriteriaResponse
 */
export type ReadTemplateTaskCriteriaResponse = Message<"domain.operation.v1.ReadTemplateTaskCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.ReadTemplateTaskCriteriaResponse.
 * Use `create(ReadTemplateTaskCriteriaResponseSchema)` to create a new message.
 */
export declare const ReadTemplateTaskCriteriaResponseSchema: GenMessage<ReadTemplateTaskCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.UpdateTemplateTaskCriteriaRequest
 */
export type UpdateTemplateTaskCriteriaRequest = Message<"domain.operation.v1.UpdateTemplateTaskCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data?: TemplateTaskCriteria;
};
/**
 * Describes the message domain.operation.v1.UpdateTemplateTaskCriteriaRequest.
 * Use `create(UpdateTemplateTaskCriteriaRequestSchema)` to create a new message.
 */
export declare const UpdateTemplateTaskCriteriaRequestSchema: GenMessage<UpdateTemplateTaskCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.UpdateTemplateTaskCriteriaResponse
 */
export type UpdateTemplateTaskCriteriaResponse = Message<"domain.operation.v1.UpdateTemplateTaskCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.UpdateTemplateTaskCriteriaResponse.
 * Use `create(UpdateTemplateTaskCriteriaResponseSchema)` to create a new message.
 */
export declare const UpdateTemplateTaskCriteriaResponseSchema: GenMessage<UpdateTemplateTaskCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.DeleteTemplateTaskCriteriaRequest
 */
export type DeleteTemplateTaskCriteriaRequest = Message<"domain.operation.v1.DeleteTemplateTaskCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data?: TemplateTaskCriteria;
};
/**
 * Describes the message domain.operation.v1.DeleteTemplateTaskCriteriaRequest.
 * Use `create(DeleteTemplateTaskCriteriaRequestSchema)` to create a new message.
 */
export declare const DeleteTemplateTaskCriteriaRequestSchema: GenMessage<DeleteTemplateTaskCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.DeleteTemplateTaskCriteriaResponse
 */
export type DeleteTemplateTaskCriteriaResponse = Message<"domain.operation.v1.DeleteTemplateTaskCriteriaResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteTemplateTaskCriteriaResponse.
 * Use `create(DeleteTemplateTaskCriteriaResponseSchema)` to create a new message.
 */
export declare const DeleteTemplateTaskCriteriaResponseSchema: GenMessage<DeleteTemplateTaskCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ListTemplateTaskCriteriasRequest
 */
export type ListTemplateTaskCriteriasRequest = Message<"domain.operation.v1.ListTemplateTaskCriteriasRequest"> & {
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
 * Describes the message domain.operation.v1.ListTemplateTaskCriteriasRequest.
 * Use `create(ListTemplateTaskCriteriasRequestSchema)` to create a new message.
 */
export declare const ListTemplateTaskCriteriasRequestSchema: GenMessage<ListTemplateTaskCriteriasRequest>;
/**
 * @generated from message domain.operation.v1.ListTemplateTaskCriteriasResponse
 */
export type ListTemplateTaskCriteriasResponse = Message<"domain.operation.v1.ListTemplateTaskCriteriasResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria data = 1;
     */
    data: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.ListTemplateTaskCriteriasResponse.
 * Use `create(ListTemplateTaskCriteriasResponseSchema)` to create a new message.
 */
export declare const ListTemplateTaskCriteriasResponseSchema: GenMessage<ListTemplateTaskCriteriasResponse>;
/**
 * @generated from message domain.operation.v1.GetTemplateTaskCriteriaListPageDataRequest
 */
export type GetTemplateTaskCriteriaListPageDataRequest = Message<"domain.operation.v1.GetTemplateTaskCriteriaListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetTemplateTaskCriteriaListPageDataRequest.
 * Use `create(GetTemplateTaskCriteriaListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTemplateTaskCriteriaListPageDataRequestSchema: GenMessage<GetTemplateTaskCriteriaListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetTemplateTaskCriteriaListPageDataResponse
 */
export type GetTemplateTaskCriteriaListPageDataResponse = Message<"domain.operation.v1.GetTemplateTaskCriteriaListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria template_task_criteria_list = 1;
     */
    templateTaskCriteriaList: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.GetTemplateTaskCriteriaListPageDataResponse.
 * Use `create(GetTemplateTaskCriteriaListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTemplateTaskCriteriaListPageDataResponseSchema: GenMessage<GetTemplateTaskCriteriaListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetTemplateTaskCriteriaItemPageDataRequest
 */
export type GetTemplateTaskCriteriaItemPageDataRequest = Message<"domain.operation.v1.GetTemplateTaskCriteriaItemPageDataRequest"> & {
    /**
     * @generated from field: string template_task_criteria_id = 1;
     */
    templateTaskCriteriaId: string;
};
/**
 * Describes the message domain.operation.v1.GetTemplateTaskCriteriaItemPageDataRequest.
 * Use `create(GetTemplateTaskCriteriaItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTemplateTaskCriteriaItemPageDataRequestSchema: GenMessage<GetTemplateTaskCriteriaItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetTemplateTaskCriteriaItemPageDataResponse
 */
export type GetTemplateTaskCriteriaItemPageDataResponse = Message<"domain.operation.v1.GetTemplateTaskCriteriaItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.TemplateTaskCriteria template_task_criteria = 1;
     */
    templateTaskCriteria?: TemplateTaskCriteria;
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
 * Describes the message domain.operation.v1.GetTemplateTaskCriteriaItemPageDataResponse.
 * Use `create(GetTemplateTaskCriteriaItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTemplateTaskCriteriaItemPageDataResponseSchema: GenMessage<GetTemplateTaskCriteriaItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListTemplateTaskCriteriasByTemplateTaskRequest
 */
export type ListTemplateTaskCriteriasByTemplateTaskRequest = Message<"domain.operation.v1.ListTemplateTaskCriteriasByTemplateTaskRequest"> & {
    /**
     * @generated from field: string job_template_task_id = 1;
     */
    jobTemplateTaskId: string;
};
/**
 * Describes the message domain.operation.v1.ListTemplateTaskCriteriasByTemplateTaskRequest.
 * Use `create(ListTemplateTaskCriteriasByTemplateTaskRequestSchema)` to create a new message.
 */
export declare const ListTemplateTaskCriteriasByTemplateTaskRequestSchema: GenMessage<ListTemplateTaskCriteriasByTemplateTaskRequest>;
/**
 * @generated from message domain.operation.v1.ListTemplateTaskCriteriasByTemplateTaskResponse
 */
export type ListTemplateTaskCriteriasByTemplateTaskResponse = Message<"domain.operation.v1.ListTemplateTaskCriteriasByTemplateTaskResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria template_task_criterias = 1;
     */
    templateTaskCriterias: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.ListTemplateTaskCriteriasByTemplateTaskResponse.
 * Use `create(ListTemplateTaskCriteriasByTemplateTaskResponseSchema)` to create a new message.
 */
export declare const ListTemplateTaskCriteriasByTemplateTaskResponseSchema: GenMessage<ListTemplateTaskCriteriasByTemplateTaskResponse>;
/**
 * @generated from message domain.operation.v1.ListTemplateTaskCriteriasByCriteriaRequest
 */
export type ListTemplateTaskCriteriasByCriteriaRequest = Message<"domain.operation.v1.ListTemplateTaskCriteriasByCriteriaRequest"> & {
    /**
     * @generated from field: string outcome_criteria_id = 1;
     */
    outcomeCriteriaId: string;
};
/**
 * Describes the message domain.operation.v1.ListTemplateTaskCriteriasByCriteriaRequest.
 * Use `create(ListTemplateTaskCriteriasByCriteriaRequestSchema)` to create a new message.
 */
export declare const ListTemplateTaskCriteriasByCriteriaRequestSchema: GenMessage<ListTemplateTaskCriteriasByCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.ListTemplateTaskCriteriasByCriteriaResponse
 */
export type ListTemplateTaskCriteriasByCriteriaResponse = Message<"domain.operation.v1.ListTemplateTaskCriteriasByCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.TemplateTaskCriteria template_task_criterias = 1;
     */
    templateTaskCriterias: TemplateTaskCriteria[];
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
 * Describes the message domain.operation.v1.ListTemplateTaskCriteriasByCriteriaResponse.
 * Use `create(ListTemplateTaskCriteriasByCriteriaResponseSchema)` to create a new message.
 */
export declare const ListTemplateTaskCriteriasByCriteriaResponseSchema: GenMessage<ListTemplateTaskCriteriasByCriteriaResponse>;
/**
 * @generated from service domain.operation.v1.TemplateTaskCriteriaDomainService
 */
export declare const TemplateTaskCriteriaDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.CreateTemplateTaskCriteria
     */
    createTemplateTaskCriteria: {
        methodKind: "unary";
        input: typeof CreateTemplateTaskCriteriaRequestSchema;
        output: typeof CreateTemplateTaskCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.ReadTemplateTaskCriteria
     */
    readTemplateTaskCriteria: {
        methodKind: "unary";
        input: typeof ReadTemplateTaskCriteriaRequestSchema;
        output: typeof ReadTemplateTaskCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.UpdateTemplateTaskCriteria
     */
    updateTemplateTaskCriteria: {
        methodKind: "unary";
        input: typeof UpdateTemplateTaskCriteriaRequestSchema;
        output: typeof UpdateTemplateTaskCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.DeleteTemplateTaskCriteria
     */
    deleteTemplateTaskCriteria: {
        methodKind: "unary";
        input: typeof DeleteTemplateTaskCriteriaRequestSchema;
        output: typeof DeleteTemplateTaskCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.ListTemplateTaskCriterias
     */
    listTemplateTaskCriterias: {
        methodKind: "unary";
        input: typeof ListTemplateTaskCriteriasRequestSchema;
        output: typeof ListTemplateTaskCriteriasResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.GetTemplateTaskCriteriaListPageData
     */
    getTemplateTaskCriteriaListPageData: {
        methodKind: "unary";
        input: typeof GetTemplateTaskCriteriaListPageDataRequestSchema;
        output: typeof GetTemplateTaskCriteriaListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.GetTemplateTaskCriteriaItemPageData
     */
    getTemplateTaskCriteriaItemPageData: {
        methodKind: "unary";
        input: typeof GetTemplateTaskCriteriaItemPageDataRequestSchema;
        output: typeof GetTemplateTaskCriteriaItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by template task
     *
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.ListByTemplateTask
     */
    listByTemplateTask: {
        methodKind: "unary";
        input: typeof ListTemplateTaskCriteriasByTemplateTaskRequestSchema;
        output: typeof ListTemplateTaskCriteriasByTemplateTaskResponseSchema;
    };
    /**
     * Extra: filter by criteria
     *
     * @generated from rpc domain.operation.v1.TemplateTaskCriteriaDomainService.ListByCriteria
     */
    listByCriteria: {
        methodKind: "unary";
        input: typeof ListTemplateTaskCriteriasByCriteriaRequestSchema;
        output: typeof ListTemplateTaskCriteriasByCriteriaResponseSchema;
    };
}>;
