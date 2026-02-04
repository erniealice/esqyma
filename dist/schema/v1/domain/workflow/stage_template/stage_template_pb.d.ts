import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/stage_template/stage_template.proto.
 */
export declare const file_domain_workflow_stage_template_stage_template: GenFile;
/**
 * StageTemplate represents a template for workflow stages
 *
 * @generated from message domain.workflow.v1.StageTemplate
 */
export type StageTemplate = Message<"domain.workflow.v1.StageTemplate"> & {
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
     * @generated from field: string workflow_template_id = 4;
     */
    workflowTemplateId: string;
    /**
     * @generated from field: string status = 5;
     */
    status: string;
    /**
     * @generated from field: string stage_type = 6;
     */
    stageType: string;
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
     * @generated from field: optional string created_by = 10;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 13;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 14;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 15;
     */
    active: boolean;
};
/**
 * Describes the message domain.workflow.v1.StageTemplate.
 * Use `create(StageTemplateSchema)` to create a new message.
 */
export declare const StageTemplateSchema: GenMessage<StageTemplate>;
/**
 * CreateStageTemplateRequest is the request message for creating a stage template
 *
 * @generated from message domain.workflow.v1.CreateStageTemplateRequest
 */
export type CreateStageTemplateRequest = Message<"domain.workflow.v1.CreateStageTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.StageTemplate data = 1;
     */
    data?: StageTemplate;
};
/**
 * Describes the message domain.workflow.v1.CreateStageTemplateRequest.
 * Use `create(CreateStageTemplateRequestSchema)` to create a new message.
 */
export declare const CreateStageTemplateRequestSchema: GenMessage<CreateStageTemplateRequest>;
/**
 * CreateStageTemplateResponse is the response message for creating a stage template
 *
 * @generated from message domain.workflow.v1.CreateStageTemplateResponse
 */
export type CreateStageTemplateResponse = Message<"domain.workflow.v1.CreateStageTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.StageTemplate data = 1;
     */
    data: StageTemplate[];
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
 * Describes the message domain.workflow.v1.CreateStageTemplateResponse.
 * Use `create(CreateStageTemplateResponseSchema)` to create a new message.
 */
export declare const CreateStageTemplateResponseSchema: GenMessage<CreateStageTemplateResponse>;
/**
 * ReadStageTemplateRequest is the request message for reading a stage template
 *
 * @generated from message domain.workflow.v1.ReadStageTemplateRequest
 */
export type ReadStageTemplateRequest = Message<"domain.workflow.v1.ReadStageTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.StageTemplate data = 1;
     */
    data?: StageTemplate;
};
/**
 * Describes the message domain.workflow.v1.ReadStageTemplateRequest.
 * Use `create(ReadStageTemplateRequestSchema)` to create a new message.
 */
export declare const ReadStageTemplateRequestSchema: GenMessage<ReadStageTemplateRequest>;
/**
 * ReadStageTemplateResponse is the response message for reading a stage template
 *
 * @generated from message domain.workflow.v1.ReadStageTemplateResponse
 */
export type ReadStageTemplateResponse = Message<"domain.workflow.v1.ReadStageTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.StageTemplate data = 1;
     */
    data: StageTemplate[];
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
 * Describes the message domain.workflow.v1.ReadStageTemplateResponse.
 * Use `create(ReadStageTemplateResponseSchema)` to create a new message.
 */
export declare const ReadStageTemplateResponseSchema: GenMessage<ReadStageTemplateResponse>;
/**
 * UpdateStageTemplateRequest is the request message for updating a stage template
 *
 * @generated from message domain.workflow.v1.UpdateStageTemplateRequest
 */
export type UpdateStageTemplateRequest = Message<"domain.workflow.v1.UpdateStageTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.StageTemplate data = 1;
     */
    data?: StageTemplate;
};
/**
 * Describes the message domain.workflow.v1.UpdateStageTemplateRequest.
 * Use `create(UpdateStageTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateStageTemplateRequestSchema: GenMessage<UpdateStageTemplateRequest>;
/**
 * UpdateStageTemplateResponse is the response message for updating a stage template
 *
 * @generated from message domain.workflow.v1.UpdateStageTemplateResponse
 */
export type UpdateStageTemplateResponse = Message<"domain.workflow.v1.UpdateStageTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.StageTemplate data = 1;
     */
    data: StageTemplate[];
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
 * Describes the message domain.workflow.v1.UpdateStageTemplateResponse.
 * Use `create(UpdateStageTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateStageTemplateResponseSchema: GenMessage<UpdateStageTemplateResponse>;
/**
 * DeleteStageTemplateRequest is the request message for deleting a stage template
 *
 * @generated from message domain.workflow.v1.DeleteStageTemplateRequest
 */
export type DeleteStageTemplateRequest = Message<"domain.workflow.v1.DeleteStageTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.StageTemplate data = 1;
     */
    data?: StageTemplate;
};
/**
 * Describes the message domain.workflow.v1.DeleteStageTemplateRequest.
 * Use `create(DeleteStageTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteStageTemplateRequestSchema: GenMessage<DeleteStageTemplateRequest>;
/**
 * DeleteStageTemplateResponse is the response message for deleting a stage template
 *
 * @generated from message domain.workflow.v1.DeleteStageTemplateResponse
 */
export type DeleteStageTemplateResponse = Message<"domain.workflow.v1.DeleteStageTemplateResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteStageTemplateResponse.
 * Use `create(DeleteStageTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteStageTemplateResponseSchema: GenMessage<DeleteStageTemplateResponse>;
/**
 * ListStageTemplatesRequest is the request message for listing stage templates
 *
 * @generated from message domain.workflow.v1.ListStageTemplatesRequest
 */
export type ListStageTemplatesRequest = Message<"domain.workflow.v1.ListStageTemplatesRequest"> & {
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
 * Describes the message domain.workflow.v1.ListStageTemplatesRequest.
 * Use `create(ListStageTemplatesRequestSchema)` to create a new message.
 */
export declare const ListStageTemplatesRequestSchema: GenMessage<ListStageTemplatesRequest>;
/**
 * ListStageTemplatesResponse is the response message for listing stage templates
 *
 * @generated from message domain.workflow.v1.ListStageTemplatesResponse
 */
export type ListStageTemplatesResponse = Message<"domain.workflow.v1.ListStageTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.StageTemplate data = 1;
     */
    data: StageTemplate[];
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
 * Describes the message domain.workflow.v1.ListStageTemplatesResponse.
 * Use `create(ListStageTemplatesResponseSchema)` to create a new message.
 */
export declare const ListStageTemplatesResponseSchema: GenMessage<ListStageTemplatesResponse>;
/**
 * GetStageTemplateListPageDataRequest is the request message for getting stage template list page data
 *
 * @generated from message domain.workflow.v1.GetStageTemplateListPageDataRequest
 */
export type GetStageTemplateListPageDataRequest = Message<"domain.workflow.v1.GetStageTemplateListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetStageTemplateListPageDataRequest.
 * Use `create(GetStageTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetStageTemplateListPageDataRequestSchema: GenMessage<GetStageTemplateListPageDataRequest>;
/**
 * GetStageTemplateListPageDataResponse is the response message for getting stage template list page data
 *
 * @generated from message domain.workflow.v1.GetStageTemplateListPageDataResponse
 */
export type GetStageTemplateListPageDataResponse = Message<"domain.workflow.v1.GetStageTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.StageTemplate stage_template_list = 1;
     */
    stageTemplateList: StageTemplate[];
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
 * Describes the message domain.workflow.v1.GetStageTemplateListPageDataResponse.
 * Use `create(GetStageTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetStageTemplateListPageDataResponseSchema: GenMessage<GetStageTemplateListPageDataResponse>;
/**
 * GetStageTemplateItemPageDataRequest is the request message for getting stage template item page data
 *
 * @generated from message domain.workflow.v1.GetStageTemplateItemPageDataRequest
 */
export type GetStageTemplateItemPageDataRequest = Message<"domain.workflow.v1.GetStageTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string stage_template_id = 1;
     */
    stageTemplateId: string;
};
/**
 * Describes the message domain.workflow.v1.GetStageTemplateItemPageDataRequest.
 * Use `create(GetStageTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetStageTemplateItemPageDataRequestSchema: GenMessage<GetStageTemplateItemPageDataRequest>;
/**
 * GetStageTemplateItemPageDataResponse is the response message for getting stage template item page data
 *
 * @generated from message domain.workflow.v1.GetStageTemplateItemPageDataResponse
 */
export type GetStageTemplateItemPageDataResponse = Message<"domain.workflow.v1.GetStageTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.StageTemplate stage_template = 1;
     */
    stageTemplate?: StageTemplate;
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
 * Describes the message domain.workflow.v1.GetStageTemplateItemPageDataResponse.
 * Use `create(GetStageTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetStageTemplateItemPageDataResponseSchema: GenMessage<GetStageTemplateItemPageDataResponse>;
/**
 * GetStageTemplatesByWorkflowTemplateRequest is the request message for getting stage templates by workflow template
 *
 * @generated from message domain.workflow.v1.GetStageTemplatesByWorkflowTemplateRequest
 */
export type GetStageTemplatesByWorkflowTemplateRequest = Message<"domain.workflow.v1.GetStageTemplatesByWorkflowTemplateRequest"> & {
    /**
     * @generated from field: string workflow_template_id = 1;
     */
    workflowTemplateId: string;
};
/**
 * Describes the message domain.workflow.v1.GetStageTemplatesByWorkflowTemplateRequest.
 * Use `create(GetStageTemplatesByWorkflowTemplateRequestSchema)` to create a new message.
 */
export declare const GetStageTemplatesByWorkflowTemplateRequestSchema: GenMessage<GetStageTemplatesByWorkflowTemplateRequest>;
/**
 * GetStageTemplatesByWorkflowTemplateResponse is the response message for getting stage templates by workflow template
 *
 * @generated from message domain.workflow.v1.GetStageTemplatesByWorkflowTemplateResponse
 */
export type GetStageTemplatesByWorkflowTemplateResponse = Message<"domain.workflow.v1.GetStageTemplatesByWorkflowTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.StageTemplate stage_templates = 1;
     */
    stageTemplates: StageTemplate[];
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
 * Describes the message domain.workflow.v1.GetStageTemplatesByWorkflowTemplateResponse.
 * Use `create(GetStageTemplatesByWorkflowTemplateResponseSchema)` to create a new message.
 */
export declare const GetStageTemplatesByWorkflowTemplateResponseSchema: GenMessage<GetStageTemplatesByWorkflowTemplateResponse>;
/**
 * StageTemplateDomainService defines the gRPC service for stage template operations
 *
 * @generated from service domain.workflow.v1.StageTemplateDomainService
 */
export declare const StageTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.CreateStageTemplate
     */
    createStageTemplate: {
        methodKind: "unary";
        input: typeof CreateStageTemplateRequestSchema;
        output: typeof CreateStageTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.ReadStageTemplate
     */
    readStageTemplate: {
        methodKind: "unary";
        input: typeof ReadStageTemplateRequestSchema;
        output: typeof ReadStageTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.UpdateStageTemplate
     */
    updateStageTemplate: {
        methodKind: "unary";
        input: typeof UpdateStageTemplateRequestSchema;
        output: typeof UpdateStageTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.DeleteStageTemplate
     */
    deleteStageTemplate: {
        methodKind: "unary";
        input: typeof DeleteStageTemplateRequestSchema;
        output: typeof DeleteStageTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.ListStageTemplates
     */
    listStageTemplates: {
        methodKind: "unary";
        input: typeof ListStageTemplatesRequestSchema;
        output: typeof ListStageTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.GetStageTemplateListPageData
     */
    getStageTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetStageTemplateListPageDataRequestSchema;
        output: typeof GetStageTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.GetStageTemplateItemPageData
     */
    getStageTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetStageTemplateItemPageDataRequestSchema;
        output: typeof GetStageTemplateItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageTemplateDomainService.GetStageTemplatesByWorkflowTemplate
     */
    getStageTemplatesByWorkflowTemplate: {
        methodKind: "unary";
        input: typeof GetStageTemplatesByWorkflowTemplateRequestSchema;
        output: typeof GetStageTemplatesByWorkflowTemplateResponseSchema;
    };
}>;
