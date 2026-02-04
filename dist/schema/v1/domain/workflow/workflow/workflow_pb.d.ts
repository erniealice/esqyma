import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/workflow/workflow.proto.
 */
export declare const file_domain_workflow_workflow_workflow: GenFile;
/**
 * Workflow represents a business workflow definition
 *
 * @generated from message domain.workflow.v1.Workflow
 */
export type Workflow = Message<"domain.workflow.v1.Workflow"> & {
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
     * @generated from field: string status = 4;
     */
    status: string;
    /**
     * @generated from field: optional string workspace_id = 5;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional string created_by = 6;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int32 version = 12;
     */
    version?: number;
    /**
     * @generated from field: optional string workflow_template_id = 13;
     */
    workflowTemplateId?: string;
    /**
     * @generated from field: optional string context_json = 14;
     */
    contextJson?: string;
    /**
     * @generated from field: optional int32 current_stage_index = 15;
     */
    currentStageIndex?: number;
};
/**
 * Describes the message domain.workflow.v1.Workflow.
 * Use `create(WorkflowSchema)` to create a new message.
 */
export declare const WorkflowSchema: GenMessage<Workflow>;
/**
 * CreateWorkflowRequest is the request message for creating a workflow
 *
 * @generated from message domain.workflow.v1.CreateWorkflowRequest
 */
export type CreateWorkflowRequest = Message<"domain.workflow.v1.CreateWorkflowRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Workflow data = 1;
     */
    data?: Workflow;
};
/**
 * Describes the message domain.workflow.v1.CreateWorkflowRequest.
 * Use `create(CreateWorkflowRequestSchema)` to create a new message.
 */
export declare const CreateWorkflowRequestSchema: GenMessage<CreateWorkflowRequest>;
/**
 * CreateWorkflowResponse is the response message for creating a workflow
 *
 * @generated from message domain.workflow.v1.CreateWorkflowResponse
 */
export type CreateWorkflowResponse = Message<"domain.workflow.v1.CreateWorkflowResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Workflow data = 1;
     */
    data: Workflow[];
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
 * Describes the message domain.workflow.v1.CreateWorkflowResponse.
 * Use `create(CreateWorkflowResponseSchema)` to create a new message.
 */
export declare const CreateWorkflowResponseSchema: GenMessage<CreateWorkflowResponse>;
/**
 * ReadWorkflowRequest is the request message for reading a workflow
 *
 * @generated from message domain.workflow.v1.ReadWorkflowRequest
 */
export type ReadWorkflowRequest = Message<"domain.workflow.v1.ReadWorkflowRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Workflow data = 1;
     */
    data?: Workflow;
};
/**
 * Describes the message domain.workflow.v1.ReadWorkflowRequest.
 * Use `create(ReadWorkflowRequestSchema)` to create a new message.
 */
export declare const ReadWorkflowRequestSchema: GenMessage<ReadWorkflowRequest>;
/**
 * ReadWorkflowResponse is the response message for reading a workflow
 *
 * @generated from message domain.workflow.v1.ReadWorkflowResponse
 */
export type ReadWorkflowResponse = Message<"domain.workflow.v1.ReadWorkflowResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Workflow data = 1;
     */
    data: Workflow[];
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
 * Describes the message domain.workflow.v1.ReadWorkflowResponse.
 * Use `create(ReadWorkflowResponseSchema)` to create a new message.
 */
export declare const ReadWorkflowResponseSchema: GenMessage<ReadWorkflowResponse>;
/**
 * UpdateWorkflowRequest is the request message for updating a workflow
 *
 * @generated from message domain.workflow.v1.UpdateWorkflowRequest
 */
export type UpdateWorkflowRequest = Message<"domain.workflow.v1.UpdateWorkflowRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Workflow data = 1;
     */
    data?: Workflow;
};
/**
 * Describes the message domain.workflow.v1.UpdateWorkflowRequest.
 * Use `create(UpdateWorkflowRequestSchema)` to create a new message.
 */
export declare const UpdateWorkflowRequestSchema: GenMessage<UpdateWorkflowRequest>;
/**
 * UpdateWorkflowResponse is the response message for updating a workflow
 *
 * @generated from message domain.workflow.v1.UpdateWorkflowResponse
 */
export type UpdateWorkflowResponse = Message<"domain.workflow.v1.UpdateWorkflowResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Workflow data = 1;
     */
    data: Workflow[];
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
 * Describes the message domain.workflow.v1.UpdateWorkflowResponse.
 * Use `create(UpdateWorkflowResponseSchema)` to create a new message.
 */
export declare const UpdateWorkflowResponseSchema: GenMessage<UpdateWorkflowResponse>;
/**
 * DeleteWorkflowRequest is the request message for deleting a workflow
 *
 * @generated from message domain.workflow.v1.DeleteWorkflowRequest
 */
export type DeleteWorkflowRequest = Message<"domain.workflow.v1.DeleteWorkflowRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Workflow data = 1;
     */
    data?: Workflow;
};
/**
 * Describes the message domain.workflow.v1.DeleteWorkflowRequest.
 * Use `create(DeleteWorkflowRequestSchema)` to create a new message.
 */
export declare const DeleteWorkflowRequestSchema: GenMessage<DeleteWorkflowRequest>;
/**
 * DeleteWorkflowResponse is the response message for deleting a workflow
 *
 * @generated from message domain.workflow.v1.DeleteWorkflowResponse
 */
export type DeleteWorkflowResponse = Message<"domain.workflow.v1.DeleteWorkflowResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteWorkflowResponse.
 * Use `create(DeleteWorkflowResponseSchema)` to create a new message.
 */
export declare const DeleteWorkflowResponseSchema: GenMessage<DeleteWorkflowResponse>;
/**
 * ListWorkflowsRequest is the request message for listing workflows
 *
 * @generated from message domain.workflow.v1.ListWorkflowsRequest
 */
export type ListWorkflowsRequest = Message<"domain.workflow.v1.ListWorkflowsRequest"> & {
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
 * Describes the message domain.workflow.v1.ListWorkflowsRequest.
 * Use `create(ListWorkflowsRequestSchema)` to create a new message.
 */
export declare const ListWorkflowsRequestSchema: GenMessage<ListWorkflowsRequest>;
/**
 * ListWorkflowsResponse is the response message for listing workflows
 *
 * @generated from message domain.workflow.v1.ListWorkflowsResponse
 */
export type ListWorkflowsResponse = Message<"domain.workflow.v1.ListWorkflowsResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Workflow data = 1;
     */
    data: Workflow[];
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
 * Describes the message domain.workflow.v1.ListWorkflowsResponse.
 * Use `create(ListWorkflowsResponseSchema)` to create a new message.
 */
export declare const ListWorkflowsResponseSchema: GenMessage<ListWorkflowsResponse>;
/**
 * GetWorkflowListPageDataRequest is the request message for getting workflow list page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowListPageDataRequest
 */
export type GetWorkflowListPageDataRequest = Message<"domain.workflow.v1.GetWorkflowListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetWorkflowListPageDataRequest.
 * Use `create(GetWorkflowListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkflowListPageDataRequestSchema: GenMessage<GetWorkflowListPageDataRequest>;
/**
 * GetWorkflowListPageDataResponse is the response message for getting workflow list page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowListPageDataResponse
 */
export type GetWorkflowListPageDataResponse = Message<"domain.workflow.v1.GetWorkflowListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Workflow workflow_list = 1;
     */
    workflowList: Workflow[];
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
 * Describes the message domain.workflow.v1.GetWorkflowListPageDataResponse.
 * Use `create(GetWorkflowListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkflowListPageDataResponseSchema: GenMessage<GetWorkflowListPageDataResponse>;
/**
 * GetWorkflowItemPageDataRequest is the request message for getting workflow item page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowItemPageDataRequest
 */
export type GetWorkflowItemPageDataRequest = Message<"domain.workflow.v1.GetWorkflowItemPageDataRequest"> & {
    /**
     * @generated from field: string workflow_id = 1;
     */
    workflowId: string;
};
/**
 * Describes the message domain.workflow.v1.GetWorkflowItemPageDataRequest.
 * Use `create(GetWorkflowItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkflowItemPageDataRequestSchema: GenMessage<GetWorkflowItemPageDataRequest>;
/**
 * GetWorkflowItemPageDataResponse is the response message for getting workflow item page data
 *
 * @generated from message domain.workflow.v1.GetWorkflowItemPageDataResponse
 */
export type GetWorkflowItemPageDataResponse = Message<"domain.workflow.v1.GetWorkflowItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Workflow workflow = 1;
     */
    workflow?: Workflow;
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
 * Describes the message domain.workflow.v1.GetWorkflowItemPageDataResponse.
 * Use `create(GetWorkflowItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkflowItemPageDataResponseSchema: GenMessage<GetWorkflowItemPageDataResponse>;
/**
 * WorkflowDomainService defines the gRPC service for workflow operations
 *
 * @generated from service domain.workflow.v1.WorkflowDomainService
 */
export declare const WorkflowDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.CreateWorkflow
     */
    createWorkflow: {
        methodKind: "unary";
        input: typeof CreateWorkflowRequestSchema;
        output: typeof CreateWorkflowResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.ReadWorkflow
     */
    readWorkflow: {
        methodKind: "unary";
        input: typeof ReadWorkflowRequestSchema;
        output: typeof ReadWorkflowResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.UpdateWorkflow
     */
    updateWorkflow: {
        methodKind: "unary";
        input: typeof UpdateWorkflowRequestSchema;
        output: typeof UpdateWorkflowResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.DeleteWorkflow
     */
    deleteWorkflow: {
        methodKind: "unary";
        input: typeof DeleteWorkflowRequestSchema;
        output: typeof DeleteWorkflowResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.ListWorkflows
     */
    listWorkflows: {
        methodKind: "unary";
        input: typeof ListWorkflowsRequestSchema;
        output: typeof ListWorkflowsResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.GetWorkflowListPageData
     */
    getWorkflowListPageData: {
        methodKind: "unary";
        input: typeof GetWorkflowListPageDataRequestSchema;
        output: typeof GetWorkflowListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.WorkflowDomainService.GetWorkflowItemPageData
     */
    getWorkflowItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkflowItemPageDataRequestSchema;
        output: typeof GetWorkflowItemPageDataResponseSchema;
    };
}>;
