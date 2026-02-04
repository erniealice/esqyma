import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/activity_template/activity_template.proto.
 */
export declare const file_domain_workflow_activity_template_activity_template: GenFile;
/**
 * ActivityTemplate represents a template for workflow activities
 *
 * @generated from message domain.workflow.v1.ActivityTemplate
 */
export type ActivityTemplate = Message<"domain.workflow.v1.ActivityTemplate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional string description = 3;
     */
    description?: string;
    /**
     * @generated from field: string stage_template_id = 4;
     */
    stageTemplateId: string;
    /**
     * @generated from field: string status = 5;
     */
    status: string;
    /**
     * @generated from field: string activity_type = 6;
     */
    activityType: string;
    /**
     * @generated from field: optional int32 order_index = 7;
     */
    orderIndex?: number;
    /**
     * @generated from field: optional bool is_required = 8;
     */
    isRequired?: boolean;
    /**
     * @generated from field: optional string condition_expression = 9;
     */
    conditionExpression?: string;
    /**
     * @generated from field: optional string assignee_type = 10;
     */
    assigneeType?: string;
    /**
     * @generated from field: optional string default_assignee_id = 11;
     */
    defaultAssigneeId?: string;
    /**
     * @generated from field: optional int32 estimated_duration_minutes = 12;
     */
    estimatedDurationMinutes?: number;
    /**
     * @generated from field: optional string configuration_json = 13;
     */
    configurationJson?: string;
    /**
     * @generated from field: optional string validation_rules_json = 14;
     */
    validationRulesJson?: string;
    /**
     * @generated from field: optional string created_by = 15;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 18;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 19;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 20;
     */
    active: boolean;
    /**
     * @generated from field: optional string input_schema_json = 21;
     */
    inputSchemaJson?: string;
    /**
     * @generated from field: optional string output_schema_json = 22;
     */
    outputSchemaJson?: string;
    /**
     * @generated from field: optional string use_case_code = 23;
     */
    useCaseCode?: string;
    /**
     * @generated from field: optional string rollback_use_case_code = 24;
     */
    rollbackUseCaseCode?: string;
};
/**
 * Describes the message domain.workflow.v1.ActivityTemplate.
 * Use `create(ActivityTemplateSchema)` to create a new message.
 */
export declare const ActivityTemplateSchema: GenMessage<ActivityTemplate>;
/**
 * CreateActivityTemplateRequest is the request message for creating an activity template
 *
 * @generated from message domain.workflow.v1.CreateActivityTemplateRequest
 */
export type CreateActivityTemplateRequest = Message<"domain.workflow.v1.CreateActivityTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityTemplate data = 1;
     */
    data?: ActivityTemplate;
};
/**
 * Describes the message domain.workflow.v1.CreateActivityTemplateRequest.
 * Use `create(CreateActivityTemplateRequestSchema)` to create a new message.
 */
export declare const CreateActivityTemplateRequestSchema: GenMessage<CreateActivityTemplateRequest>;
/**
 * CreateActivityTemplateResponse is the response message for creating an activity template
 *
 * @generated from message domain.workflow.v1.CreateActivityTemplateResponse
 */
export type CreateActivityTemplateResponse = Message<"domain.workflow.v1.CreateActivityTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityTemplate data = 1;
     */
    data: ActivityTemplate[];
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
 * Describes the message domain.workflow.v1.CreateActivityTemplateResponse.
 * Use `create(CreateActivityTemplateResponseSchema)` to create a new message.
 */
export declare const CreateActivityTemplateResponseSchema: GenMessage<CreateActivityTemplateResponse>;
/**
 * ReadActivityTemplateRequest is the request message for reading an activity template
 *
 * @generated from message domain.workflow.v1.ReadActivityTemplateRequest
 */
export type ReadActivityTemplateRequest = Message<"domain.workflow.v1.ReadActivityTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityTemplate data = 1;
     */
    data?: ActivityTemplate;
};
/**
 * Describes the message domain.workflow.v1.ReadActivityTemplateRequest.
 * Use `create(ReadActivityTemplateRequestSchema)` to create a new message.
 */
export declare const ReadActivityTemplateRequestSchema: GenMessage<ReadActivityTemplateRequest>;
/**
 * ReadActivityTemplateResponse is the response message for reading an activity template
 *
 * @generated from message domain.workflow.v1.ReadActivityTemplateResponse
 */
export type ReadActivityTemplateResponse = Message<"domain.workflow.v1.ReadActivityTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityTemplate data = 1;
     */
    data: ActivityTemplate[];
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
 * Describes the message domain.workflow.v1.ReadActivityTemplateResponse.
 * Use `create(ReadActivityTemplateResponseSchema)` to create a new message.
 */
export declare const ReadActivityTemplateResponseSchema: GenMessage<ReadActivityTemplateResponse>;
/**
 * UpdateActivityTemplateRequest is the request message for updating an activity template
 *
 * @generated from message domain.workflow.v1.UpdateActivityTemplateRequest
 */
export type UpdateActivityTemplateRequest = Message<"domain.workflow.v1.UpdateActivityTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityTemplate data = 1;
     */
    data?: ActivityTemplate;
};
/**
 * Describes the message domain.workflow.v1.UpdateActivityTemplateRequest.
 * Use `create(UpdateActivityTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateActivityTemplateRequestSchema: GenMessage<UpdateActivityTemplateRequest>;
/**
 * UpdateActivityTemplateResponse is the response message for updating an activity template
 *
 * @generated from message domain.workflow.v1.UpdateActivityTemplateResponse
 */
export type UpdateActivityTemplateResponse = Message<"domain.workflow.v1.UpdateActivityTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityTemplate data = 1;
     */
    data: ActivityTemplate[];
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
 * Describes the message domain.workflow.v1.UpdateActivityTemplateResponse.
 * Use `create(UpdateActivityTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateActivityTemplateResponseSchema: GenMessage<UpdateActivityTemplateResponse>;
/**
 * DeleteActivityTemplateRequest is the request message for deleting an activity template
 *
 * @generated from message domain.workflow.v1.DeleteActivityTemplateRequest
 */
export type DeleteActivityTemplateRequest = Message<"domain.workflow.v1.DeleteActivityTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.ActivityTemplate data = 1;
     */
    data?: ActivityTemplate;
};
/**
 * Describes the message domain.workflow.v1.DeleteActivityTemplateRequest.
 * Use `create(DeleteActivityTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteActivityTemplateRequestSchema: GenMessage<DeleteActivityTemplateRequest>;
/**
 * DeleteActivityTemplateResponse is the response message for deleting an activity template
 *
 * @generated from message domain.workflow.v1.DeleteActivityTemplateResponse
 */
export type DeleteActivityTemplateResponse = Message<"domain.workflow.v1.DeleteActivityTemplateResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteActivityTemplateResponse.
 * Use `create(DeleteActivityTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteActivityTemplateResponseSchema: GenMessage<DeleteActivityTemplateResponse>;
/**
 * ListActivityTemplatesRequest is the request message for listing activity templates
 *
 * @generated from message domain.workflow.v1.ListActivityTemplatesRequest
 */
export type ListActivityTemplatesRequest = Message<"domain.workflow.v1.ListActivityTemplatesRequest"> & {
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
 * Describes the message domain.workflow.v1.ListActivityTemplatesRequest.
 * Use `create(ListActivityTemplatesRequestSchema)` to create a new message.
 */
export declare const ListActivityTemplatesRequestSchema: GenMessage<ListActivityTemplatesRequest>;
/**
 * ListActivityTemplatesResponse is the response message for listing activity templates
 *
 * @generated from message domain.workflow.v1.ListActivityTemplatesResponse
 */
export type ListActivityTemplatesResponse = Message<"domain.workflow.v1.ListActivityTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityTemplate data = 1;
     */
    data: ActivityTemplate[];
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
 * Describes the message domain.workflow.v1.ListActivityTemplatesResponse.
 * Use `create(ListActivityTemplatesResponseSchema)` to create a new message.
 */
export declare const ListActivityTemplatesResponseSchema: GenMessage<ListActivityTemplatesResponse>;
/**
 * GetActivityTemplateListPageDataRequest is the request message for getting activity template list page data
 *
 * @generated from message domain.workflow.v1.GetActivityTemplateListPageDataRequest
 */
export type GetActivityTemplateListPageDataRequest = Message<"domain.workflow.v1.GetActivityTemplateListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetActivityTemplateListPageDataRequest.
 * Use `create(GetActivityTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityTemplateListPageDataRequestSchema: GenMessage<GetActivityTemplateListPageDataRequest>;
/**
 * GetActivityTemplateListPageDataResponse is the response message for getting activity template list page data
 *
 * @generated from message domain.workflow.v1.GetActivityTemplateListPageDataResponse
 */
export type GetActivityTemplateListPageDataResponse = Message<"domain.workflow.v1.GetActivityTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityTemplate activity_template_list = 1;
     */
    activityTemplateList: ActivityTemplate[];
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
 * Describes the message domain.workflow.v1.GetActivityTemplateListPageDataResponse.
 * Use `create(GetActivityTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityTemplateListPageDataResponseSchema: GenMessage<GetActivityTemplateListPageDataResponse>;
/**
 * GetActivityTemplateItemPageDataRequest is the request message for getting activity template item page data
 *
 * @generated from message domain.workflow.v1.GetActivityTemplateItemPageDataRequest
 */
export type GetActivityTemplateItemPageDataRequest = Message<"domain.workflow.v1.GetActivityTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string activity_template_id = 1;
     */
    activityTemplateId: string;
};
/**
 * Describes the message domain.workflow.v1.GetActivityTemplateItemPageDataRequest.
 * Use `create(GetActivityTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityTemplateItemPageDataRequestSchema: GenMessage<GetActivityTemplateItemPageDataRequest>;
/**
 * GetActivityTemplateItemPageDataResponse is the response message for getting activity template item page data
 *
 * @generated from message domain.workflow.v1.GetActivityTemplateItemPageDataResponse
 */
export type GetActivityTemplateItemPageDataResponse = Message<"domain.workflow.v1.GetActivityTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.ActivityTemplate activity_template = 1;
     */
    activityTemplate?: ActivityTemplate;
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
 * Describes the message domain.workflow.v1.GetActivityTemplateItemPageDataResponse.
 * Use `create(GetActivityTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityTemplateItemPageDataResponseSchema: GenMessage<GetActivityTemplateItemPageDataResponse>;
/**
 * GetActivityTemplatesByStageTemplateRequest is the request message for getting activity templates by stage template
 *
 * @generated from message domain.workflow.v1.GetActivityTemplatesByStageTemplateRequest
 */
export type GetActivityTemplatesByStageTemplateRequest = Message<"domain.workflow.v1.GetActivityTemplatesByStageTemplateRequest"> & {
    /**
     * @generated from field: string stage_template_id = 1;
     */
    stageTemplateId: string;
};
/**
 * Describes the message domain.workflow.v1.GetActivityTemplatesByStageTemplateRequest.
 * Use `create(GetActivityTemplatesByStageTemplateRequestSchema)` to create a new message.
 */
export declare const GetActivityTemplatesByStageTemplateRequestSchema: GenMessage<GetActivityTemplatesByStageTemplateRequest>;
/**
 * GetActivityTemplatesByStageTemplateResponse is the response message for getting activity templates by stage template
 *
 * @generated from message domain.workflow.v1.GetActivityTemplatesByStageTemplateResponse
 */
export type GetActivityTemplatesByStageTemplateResponse = Message<"domain.workflow.v1.GetActivityTemplatesByStageTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.ActivityTemplate activity_templates = 1;
     */
    activityTemplates: ActivityTemplate[];
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
 * Describes the message domain.workflow.v1.GetActivityTemplatesByStageTemplateResponse.
 * Use `create(GetActivityTemplatesByStageTemplateResponseSchema)` to create a new message.
 */
export declare const GetActivityTemplatesByStageTemplateResponseSchema: GenMessage<GetActivityTemplatesByStageTemplateResponse>;
/**
 * ActivityTemplateDomainService defines the gRPC service for activity template operations
 *
 * @generated from service domain.workflow.v1.ActivityTemplateDomainService
 */
export declare const ActivityTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.CreateActivityTemplate
     */
    createActivityTemplate: {
        methodKind: "unary";
        input: typeof CreateActivityTemplateRequestSchema;
        output: typeof CreateActivityTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.ReadActivityTemplate
     */
    readActivityTemplate: {
        methodKind: "unary";
        input: typeof ReadActivityTemplateRequestSchema;
        output: typeof ReadActivityTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.UpdateActivityTemplate
     */
    updateActivityTemplate: {
        methodKind: "unary";
        input: typeof UpdateActivityTemplateRequestSchema;
        output: typeof UpdateActivityTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.DeleteActivityTemplate
     */
    deleteActivityTemplate: {
        methodKind: "unary";
        input: typeof DeleteActivityTemplateRequestSchema;
        output: typeof DeleteActivityTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.ListActivityTemplates
     */
    listActivityTemplates: {
        methodKind: "unary";
        input: typeof ListActivityTemplatesRequestSchema;
        output: typeof ListActivityTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.GetActivityTemplateListPageData
     */
    getActivityTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetActivityTemplateListPageDataRequestSchema;
        output: typeof GetActivityTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.GetActivityTemplateItemPageData
     */
    getActivityTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetActivityTemplateItemPageDataRequestSchema;
        output: typeof GetActivityTemplateItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.ActivityTemplateDomainService.GetActivityTemplatesByStageTemplate
     */
    getActivityTemplatesByStageTemplate: {
        methodKind: "unary";
        input: typeof GetActivityTemplatesByStageTemplateRequestSchema;
        output: typeof GetActivityTemplatesByStageTemplateResponseSchema;
    };
}>;
