import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/workflow_template/workflow_template.proto.
 */
export declare const file_domain_workflow_workflow_template_workflow_template: GenFile;
/**
 * WorkflowTemplate represents a business workflow template definition
 *
 * @generated from message domain.workflow.v1.WorkflowTemplate
 */
export type WorkflowTemplate = Message<"domain.workflow.v1.WorkflowTemplate"> & {
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
     * @generated from field: optional string workspace_id = 4;
     */
    workspaceId?: string;
    /**
     * @generated from field: string status = 5;
     */
    status: string;
    /**
     * @generated from field: string business_type = 6;
     */
    businessType: string;
    /**
     * Runtime config (SLA, notifications, etc.)
     *
     * @generated from field: optional string configuration_json = 7;
     */
    configurationJson?: string;
    /**
     * @generated from field: optional int32 version = 8;
     */
    version?: number;
    /**
     * @generated from field: optional string created_by = 9;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 10;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 11;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 12;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 13;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 14;
     */
    active: boolean;
    /**
     * JSON schema for validating workflow start input
     *
     * @generated from field: optional string input_schema_json = 15;
     */
    inputSchemaJson?: string;
    /**
     * System template tracking fields (for seeder-managed templates)
     *
     * vya template identifier (e.g., "education:student_enrollment:v1")
     *
     * @generated from field: optional string system_id = 16;
     */
    systemId?: string;
    /**
     * true if created by seeder
     *
     * @generated from field: optional bool is_system = 17;
     */
    isSystem?: boolean;
};
/**
 * Describes the message domain.workflow.v1.WorkflowTemplate.
 * Use `create(WorkflowTemplateSchema)` to create a new message.
 */
export declare const WorkflowTemplateSchema: GenMessage<WorkflowTemplate>;
/**
 * CreateWorkflowTemplateRequest is the request message for creating a workflow template
 *
 * @generated from message domain.workflow.v1.CreateWorkflowTemplateRequest
 */
export type CreateWorkflowTemplateRequest = Message<"domain.workflow.v1.CreateWorkflowTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data?: WorkflowTemplate;
};
/**
 * Describes the message domain.workflow.v1.CreateWorkflowTemplateRequest.
 * Use `create(CreateWorkflowTemplateRequestSchema)` to create a new message.
 */
export declare const CreateWorkflowTemplateRequestSchema: GenMessage<CreateWorkflowTemplateRequest>;
/**
 * CreateWorkflowTemplateResponse is the response message for creating a workflow template
 *
 * @generated from message domain.workflow.v1.CreateWorkflowTemplateResponse
 */
export type CreateWorkflowTemplateResponse = Message<"domain.workflow.v1.CreateWorkflowTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data: WorkflowTemplate[];
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
 * Describes the message domain.workflow.v1.CreateWorkflowTemplateResponse.
 * Use `create(CreateWorkflowTemplateResponseSchema)` to create a new message.
 */
export declare const CreateWorkflowTemplateResponseSchema: GenMessage<CreateWorkflowTemplateResponse>;
/**
 * ReadWorkflowTemplateRequest is the request message for reading a workflow template
 *
 * @generated from message domain.workflow.v1.ReadWorkflowTemplateRequest
 */
export type ReadWorkflowTemplateRequest = Message<"domain.workflow.v1.ReadWorkflowTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data?: WorkflowTemplate;
};
/**
 * Describes the message domain.workflow.v1.ReadWorkflowTemplateRequest.
 * Use `create(ReadWorkflowTemplateRequestSchema)` to create a new message.
 */
export declare const ReadWorkflowTemplateRequestSchema: GenMessage<ReadWorkflowTemplateRequest>;
/**
 * ReadWorkflowTemplateResponse is the response message for reading a workflow template
 *
 * @generated from message domain.workflow.v1.ReadWorkflowTemplateResponse
 */
export type ReadWorkflowTemplateResponse = Message<"domain.workflow.v1.ReadWorkflowTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data: WorkflowTemplate[];
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
 * Describes the message domain.workflow.v1.ReadWorkflowTemplateResponse.
 * Use `create(ReadWorkflowTemplateResponseSchema)` to create a new message.
 */
export declare const ReadWorkflowTemplateResponseSchema: GenMessage<ReadWorkflowTemplateResponse>;
/**
 * UpdateWorkflowTemplateRequest is the request message for updating a workflow template
 *
 * @generated from message domain.workflow.v1.UpdateWorkflowTemplateRequest
 */
export type UpdateWorkflowTemplateRequest = Message<"domain.workflow.v1.UpdateWorkflowTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data?: WorkflowTemplate;
};
/**
 * Describes the message domain.workflow.v1.UpdateWorkflowTemplateRequest.
 * Use `create(UpdateWorkflowTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateWorkflowTemplateRequestSchema: GenMessage<UpdateWorkflowTemplateRequest>;
/**
 * UpdateWorkflowTemplateResponse is the response message for updating a workflow template
 *
 * @generated from message domain.workflow.v1.UpdateWorkflowTemplateResponse
 */
export type UpdateWorkflowTemplateResponse = Message<"domain.workflow.v1.UpdateWorkflowTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data: WorkflowTemplate[];
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
 * Describes the message domain.workflow.v1.UpdateWorkflowTemplateResponse.
 * Use `create(UpdateWorkflowTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateWorkflowTemplateResponseSchema: GenMessage<UpdateWorkflowTemplateResponse>;
/**
 * DeleteWorkflowTemplateRequest is the request message for deleting a workflow template
 *
 * @generated from message domain.workflow.v1.DeleteWorkflowTemplateRequest
 */
export type DeleteWorkflowTemplateRequest = Message<"domain.workflow.v1.DeleteWorkflowTemplateRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data?: WorkflowTemplate;
};
/**
 * Describes the message domain.workflow.v1.DeleteWorkflowTemplateRequest.
 * Use `create(DeleteWorkflowTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteWorkflowTemplateRequestSchema: GenMessage<DeleteWorkflowTemplateRequest>;
/**
 * DeleteWorkflowTemplateResponse is the response message for deleting a workflow template
 *
 * @generated from message domain.workflow.v1.DeleteWorkflowTemplateResponse
 */
export type DeleteWorkflowTemplateResponse = Message<"domain.workflow.v1.DeleteWorkflowTemplateResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteWorkflowTemplateResponse.
 * Use `create(DeleteWorkflowTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteWorkflowTemplateResponseSchema: GenMessage<DeleteWorkflowTemplateResponse>;
/**
 * ListWorkflowTemplatesRequest is the request message for listing workflow templates
 *
 * @generated from message domain.workflow.v1.ListWorkflowTemplatesRequest
 */
export type ListWorkflowTemplatesRequest = Message<"domain.workflow.v1.ListWorkflowTemplatesRequest"> & {
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
 * Describes the message domain.workflow.v1.ListWorkflowTemplatesRequest.
 * Use `create(ListWorkflowTemplatesRequestSchema)` to create a new message.
 */
export declare const ListWorkflowTemplatesRequestSchema: GenMessage<ListWorkflowTemplatesRequest>;
/**
 * ListWorkflowTemplatesResponse is the response message for listing workflow templates
 *
 * @generated from message domain.workflow.v1.ListWorkflowTemplatesResponse
 */
export type ListWorkflowTemplatesResponse = Message<"domain.workflow.v1.ListWorkflowTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.WorkflowTemplate data = 1;
     */
    data: WorkflowTemplate[];
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
 * Describes the message domain.workflow.v1.ListWorkflowTemplatesResponse.
 * Use `create(ListWorkflowTemplatesResponseSchema)` to create a new message.
 */
export declare const ListWorkflowTemplatesResponseSchema: GenMessage<ListWorkflowTemplatesResponse>;
/**
 * GetWorkflowTemplateListPageDataRequest is the request message for getting workflow template list page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowTemplateListPageDataRequest
 */
export type GetWorkflowTemplateListPageDataRequest = Message<"domain.workflow.v1.GetWorkflowTemplateListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetWorkflowTemplateListPageDataRequest.
 * Use `create(GetWorkflowTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkflowTemplateListPageDataRequestSchema: GenMessage<GetWorkflowTemplateListPageDataRequest>;
/**
 * GetWorkflowTemplateListPageDataResponse is the response message for getting workflow template list page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowTemplateListPageDataResponse
 */
export type GetWorkflowTemplateListPageDataResponse = Message<"domain.workflow.v1.GetWorkflowTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.WorkflowTemplate workflow_template_list = 1;
     */
    workflowTemplateList: WorkflowTemplate[];
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
 * Describes the message domain.workflow.v1.GetWorkflowTemplateListPageDataResponse.
 * Use `create(GetWorkflowTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkflowTemplateListPageDataResponseSchema: GenMessage<GetWorkflowTemplateListPageDataResponse>;
/**
 * GetWorkflowTemplateItemPageDataRequest is the request message for getting workflow template item page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowTemplateItemPageDataRequest
 */
export type GetWorkflowTemplateItemPageDataRequest = Message<"domain.workflow.v1.GetWorkflowTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string workflow_template_id = 1;
     */
    workflowTemplateId: string;
};
/**
 * Describes the message domain.workflow.v1.GetWorkflowTemplateItemPageDataRequest.
 * Use `create(GetWorkflowTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkflowTemplateItemPageDataRequestSchema: GenMessage<GetWorkflowTemplateItemPageDataRequest>;
/**
 * GetWorkflowTemplateItemPageDataResponse is the response message for getting workflow template item page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowTemplateItemPageDataResponse
 */
export type GetWorkflowTemplateItemPageDataResponse = Message<"domain.workflow.v1.GetWorkflowTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.WorkflowTemplate workflow_template = 1;
     */
    workflowTemplate?: WorkflowTemplate;
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
 * Describes the message domain.workflow.v1.GetWorkflowTemplateItemPageDataResponse.
 * Use `create(GetWorkflowTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkflowTemplateItemPageDataResponseSchema: GenMessage<GetWorkflowTemplateItemPageDataResponse>;
/**
 * WorkflowTemplateDomainService defines the gRPC service for workflow template operations
 *
 * @generated from service domain.workflow.v1.WorkflowTemplateDomainService
 */
export declare const WorkflowTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.CreateWorkflowTemplate
     */
    createWorkflowTemplate: {
        methodKind: "unary";
        input: typeof CreateWorkflowTemplateRequestSchema;
        output: typeof CreateWorkflowTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.ReadWorkflowTemplate
     */
    readWorkflowTemplate: {
        methodKind: "unary";
        input: typeof ReadWorkflowTemplateRequestSchema;
        output: typeof ReadWorkflowTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.UpdateWorkflowTemplate
     */
    updateWorkflowTemplate: {
        methodKind: "unary";
        input: typeof UpdateWorkflowTemplateRequestSchema;
        output: typeof UpdateWorkflowTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.DeleteWorkflowTemplate
     */
    deleteWorkflowTemplate: {
        methodKind: "unary";
        input: typeof DeleteWorkflowTemplateRequestSchema;
        output: typeof DeleteWorkflowTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.ListWorkflowTemplates
     */
    listWorkflowTemplates: {
        methodKind: "unary";
        input: typeof ListWorkflowTemplatesRequestSchema;
        output: typeof ListWorkflowTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.GetWorkflowTemplateListPageData
     */
    getWorkflowTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetWorkflowTemplateListPageDataRequestSchema;
        output: typeof GetWorkflowTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowTemplateDomainService.GetWorkflowTemplateItemPageData
     */
    getWorkflowTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkflowTemplateItemPageDataRequestSchema;
        output: typeof GetWorkflowTemplateItemPageDataResponseSchema;
    };
}>;
