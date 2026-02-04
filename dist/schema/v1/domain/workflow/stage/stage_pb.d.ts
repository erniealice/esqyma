import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/workflow/stage/stage.proto.
 */
export declare const file_domain_workflow_stage_stage: GenFile;
/**
 * Stage represents a specific instance of a workflow stage
 *
 * @generated from message domain.workflow.v1.Stage
 */
export type Stage = Message<"domain.workflow.v1.Stage"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workflow_id = 2;
     */
    workflowId: string;
    /**
     * @generated from field: string workflow_instance_id = 3;
     */
    workflowInstanceId: string;
    /**
     * @generated from field: string stage_template_id = 4;
     */
    stageTemplateId: string;
    /**
     * @generated from field: string name = 5;
     */
    name: string;
    /**
     * @generated from field: optional string description = 6;
     */
    description?: string;
    /**
     * @generated from field: string status = 7;
     */
    status: string;
    /**
     * @generated from field: string priority = 8;
     */
    priority: string;
    /**
     * @generated from field: optional string assigned_to = 9;
     */
    assignedTo?: string;
    /**
     * @generated from field: optional string completed_by = 10;
     */
    completedBy?: string;
    /**
     * @generated from field: optional int64 date_started = 11;
     */
    dateStarted?: bigint;
    /**
     * @generated from field: optional string date_started_string = 12;
     */
    dateStartedString?: string;
    /**
     * @generated from field: optional int64 date_completed = 13;
     */
    dateCompleted?: bigint;
    /**
     * @generated from field: optional string date_completed_string = 14;
     */
    dateCompletedString?: string;
    /**
     * @generated from field: optional int64 date_due = 15;
     */
    dateDue?: bigint;
    /**
     * @generated from field: optional string date_due_string = 16;
     */
    dateDueString?: string;
    /**
     * @generated from field: optional string result_json = 17;
     */
    resultJson?: string;
    /**
     * @generated from field: optional string error_message = 18;
     */
    errorMessage?: string;
    /**
     * @generated from field: optional string created_by = 19;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 20;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 21;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 22;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 23;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 24;
     */
    active: boolean;
    /**
     * @generated from field: optional int32 completion_percentage = 25;
     */
    completionPercentage?: number;
};
/**
 * Describes the message domain.workflow.v1.Stage.
 * Use `create(StageSchema)` to create a new message.
 */
export declare const StageSchema: GenMessage<Stage>;
/**
 * CreateStageRequest is the request message for creating a stage
 *
 * @generated from message domain.workflow.v1.CreateStageRequest
 */
export type CreateStageRequest = Message<"domain.workflow.v1.CreateStageRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Stage data = 1;
     */
    data?: Stage;
};
/**
 * Describes the message domain.workflow.v1.CreateStageRequest.
 * Use `create(CreateStageRequestSchema)` to create a new message.
 */
export declare const CreateStageRequestSchema: GenMessage<CreateStageRequest>;
/**
 * CreateStageResponse is the response message for creating a stage
 *
 * @generated from message domain.workflow.v1.CreateStageResponse
 */
export type CreateStageResponse = Message<"domain.workflow.v1.CreateStageResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Stage data = 1;
     */
    data: Stage[];
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
 * Describes the message domain.workflow.v1.CreateStageResponse.
 * Use `create(CreateStageResponseSchema)` to create a new message.
 */
export declare const CreateStageResponseSchema: GenMessage<CreateStageResponse>;
/**
 * ReadStageRequest is the request message for reading a stage
 *
 * @generated from message domain.workflow.v1.ReadStageRequest
 */
export type ReadStageRequest = Message<"domain.workflow.v1.ReadStageRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Stage data = 1;
     */
    data?: Stage;
};
/**
 * Describes the message domain.workflow.v1.ReadStageRequest.
 * Use `create(ReadStageRequestSchema)` to create a new message.
 */
export declare const ReadStageRequestSchema: GenMessage<ReadStageRequest>;
/**
 * ReadStageResponse is the response message for reading a stage
 *
 * @generated from message domain.workflow.v1.ReadStageResponse
 */
export type ReadStageResponse = Message<"domain.workflow.v1.ReadStageResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Stage data = 1;
     */
    data: Stage[];
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
 * Describes the message domain.workflow.v1.ReadStageResponse.
 * Use `create(ReadStageResponseSchema)` to create a new message.
 */
export declare const ReadStageResponseSchema: GenMessage<ReadStageResponse>;
/**
 * UpdateStageRequest is the request message for updating a stage
 *
 * @generated from message domain.workflow.v1.UpdateStageRequest
 */
export type UpdateStageRequest = Message<"domain.workflow.v1.UpdateStageRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Stage data = 1;
     */
    data?: Stage;
};
/**
 * Describes the message domain.workflow.v1.UpdateStageRequest.
 * Use `create(UpdateStageRequestSchema)` to create a new message.
 */
export declare const UpdateStageRequestSchema: GenMessage<UpdateStageRequest>;
/**
 * UpdateStageResponse is the response message for updating a stage
 *
 * @generated from message domain.workflow.v1.UpdateStageResponse
 */
export type UpdateStageResponse = Message<"domain.workflow.v1.UpdateStageResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Stage data = 1;
     */
    data: Stage[];
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
 * Describes the message domain.workflow.v1.UpdateStageResponse.
 * Use `create(UpdateStageResponseSchema)` to create a new message.
 */
export declare const UpdateStageResponseSchema: GenMessage<UpdateStageResponse>;
/**
 * DeleteStageRequest is the request message for deleting a stage
 *
 * @generated from message domain.workflow.v1.DeleteStageRequest
 */
export type DeleteStageRequest = Message<"domain.workflow.v1.DeleteStageRequest"> & {
    /**
     * @generated from field: domain.workflow.v1.Stage data = 1;
     */
    data?: Stage;
};
/**
 * Describes the message domain.workflow.v1.DeleteStageRequest.
 * Use `create(DeleteStageRequestSchema)` to create a new message.
 */
export declare const DeleteStageRequestSchema: GenMessage<DeleteStageRequest>;
/**
 * DeleteStageResponse is the response message for deleting a stage
 *
 * @generated from message domain.workflow.v1.DeleteStageResponse
 */
export type DeleteStageResponse = Message<"domain.workflow.v1.DeleteStageResponse"> & {
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
 * Describes the message domain.workflow.v1.DeleteStageResponse.
 * Use `create(DeleteStageResponseSchema)` to create a new message.
 */
export declare const DeleteStageResponseSchema: GenMessage<DeleteStageResponse>;
/**
 * ListStagesRequest is the request message for listing stages
 *
 * @generated from message domain.workflow.v1.ListStagesRequest
 */
export type ListStagesRequest = Message<"domain.workflow.v1.ListStagesRequest"> & {
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
 * Describes the message domain.workflow.v1.ListStagesRequest.
 * Use `create(ListStagesRequestSchema)` to create a new message.
 */
export declare const ListStagesRequestSchema: GenMessage<ListStagesRequest>;
/**
 * ListStagesResponse is the response message for listing stages
 *
 * @generated from message domain.workflow.v1.ListStagesResponse
 */
export type ListStagesResponse = Message<"domain.workflow.v1.ListStagesResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Stage data = 1;
     */
    data: Stage[];
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
 * Describes the message domain.workflow.v1.ListStagesResponse.
 * Use `create(ListStagesResponseSchema)` to create a new message.
 */
export declare const ListStagesResponseSchema: GenMessage<ListStagesResponse>;
/**
 * GetStageListPageDataRequest is the request message for getting stage list page data
 *
 * @generated from message domain.workflow.v1.GetStageListPageDataRequest
 */
export type GetStageListPageDataRequest = Message<"domain.workflow.v1.GetStageListPageDataRequest"> & {
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
 * Describes the message domain.workflow.v1.GetStageListPageDataRequest.
 * Use `create(GetStageListPageDataRequestSchema)` to create a new message.
 */
export declare const GetStageListPageDataRequestSchema: GenMessage<GetStageListPageDataRequest>;
/**
 * GetStageListPageDataResponse is the response message for getting stage list page data
 *
 * @generated from message domain.workflow.v1.GetStageListPageDataResponse
 */
export type GetStageListPageDataResponse = Message<"domain.workflow.v1.GetStageListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Stage stage_list = 1;
     */
    stageList: Stage[];
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
 * Describes the message domain.workflow.v1.GetStageListPageDataResponse.
 * Use `create(GetStageListPageDataResponseSchema)` to create a new message.
 */
export declare const GetStageListPageDataResponseSchema: GenMessage<GetStageListPageDataResponse>;
/**
 * GetStageItemPageDataRequest is the request message for getting stage item page data
 *
 * @generated from message domain.workflow.v1.GetStageItemPageDataRequest
 */
export type GetStageItemPageDataRequest = Message<"domain.workflow.v1.GetStageItemPageDataRequest"> & {
    /**
     * @generated from field: string stage_id = 1;
     */
    stageId: string;
};
/**
 * Describes the message domain.workflow.v1.GetStageItemPageDataRequest.
 * Use `create(GetStageItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetStageItemPageDataRequestSchema: GenMessage<GetStageItemPageDataRequest>;
/**
 * GetStageItemPageDataResponse is the response message for getting stage item page data
 *
 * @generated from message domain.workflow.v1.GetStageItemPageDataResponse
 */
export type GetStageItemPageDataResponse = Message<"domain.workflow.v1.GetStageItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Stage stage = 1;
     */
    stage?: Stage;
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
 * Describes the message domain.workflow.v1.GetStageItemPageDataResponse.
 * Use `create(GetStageItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetStageItemPageDataResponseSchema: GenMessage<GetStageItemPageDataResponse>;
/**
 * GetStagesByWorkflowInstanceRequest is the request message for getting stages by workflow instance
 *
 * @generated from message domain.workflow.v1.GetStagesByWorkflowInstanceRequest
 */
export type GetStagesByWorkflowInstanceRequest = Message<"domain.workflow.v1.GetStagesByWorkflowInstanceRequest"> & {
    /**
     * @generated from field: string workflow_instance_id = 1;
     */
    workflowInstanceId: string;
};
/**
 * Describes the message domain.workflow.v1.GetStagesByWorkflowInstanceRequest.
 * Use `create(GetStagesByWorkflowInstanceRequestSchema)` to create a new message.
 */
export declare const GetStagesByWorkflowInstanceRequestSchema: GenMessage<GetStagesByWorkflowInstanceRequest>;
/**
 * GetStagesByWorkflowInstanceResponse is the response message for getting stages by workflow instance
 *
 * @generated from message domain.workflow.v1.GetStagesByWorkflowInstanceResponse
 */
export type GetStagesByWorkflowInstanceResponse = Message<"domain.workflow.v1.GetStagesByWorkflowInstanceResponse"> & {
    /**
     * @generated from field: repeated domain.workflow.v1.Stage stages = 1;
     */
    stages: Stage[];
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
 * Describes the message domain.workflow.v1.GetStagesByWorkflowInstanceResponse.
 * Use `create(GetStagesByWorkflowInstanceResponseSchema)` to create a new message.
 */
export declare const GetStagesByWorkflowInstanceResponseSchema: GenMessage<GetStagesByWorkflowInstanceResponse>;
/**
 * StartStageRequest is the request message for starting a stage
 *
 * @generated from message domain.workflow.v1.StartStageRequest
 */
export type StartStageRequest = Message<"domain.workflow.v1.StartStageRequest"> & {
    /**
     * @generated from field: string stage_id = 1;
     */
    stageId: string;
    /**
     * @generated from field: optional string started_by = 2;
     */
    startedBy?: string;
};
/**
 * Describes the message domain.workflow.v1.StartStageRequest.
 * Use `create(StartStageRequestSchema)` to create a new message.
 */
export declare const StartStageRequestSchema: GenMessage<StartStageRequest>;
/**
 * StartStageResponse is the response message for starting a stage
 *
 * @generated from message domain.workflow.v1.StartStageResponse
 */
export type StartStageResponse = Message<"domain.workflow.v1.StartStageResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Stage stage = 1;
     */
    stage?: Stage;
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
 * Describes the message domain.workflow.v1.StartStageResponse.
 * Use `create(StartStageResponseSchema)` to create a new message.
 */
export declare const StartStageResponseSchema: GenMessage<StartStageResponse>;
/**
 * CompleteStageRequest is the request message for completing a stage
 *
 * @generated from message domain.workflow.v1.CompleteStageRequest
 */
export type CompleteStageRequest = Message<"domain.workflow.v1.CompleteStageRequest"> & {
    /**
     * @generated from field: string stage_id = 1;
     */
    stageId: string;
    /**
     * @generated from field: optional string completed_by = 2;
     */
    completedBy?: string;
    /**
     * @generated from field: optional string result_json = 3;
     */
    resultJson?: string;
};
/**
 * Describes the message domain.workflow.v1.CompleteStageRequest.
 * Use `create(CompleteStageRequestSchema)` to create a new message.
 */
export declare const CompleteStageRequestSchema: GenMessage<CompleteStageRequest>;
/**
 * CompleteStageResponse is the response message for completing a stage
 *
 * @generated from message domain.workflow.v1.CompleteStageResponse
 */
export type CompleteStageResponse = Message<"domain.workflow.v1.CompleteStageResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Stage stage = 1;
     */
    stage?: Stage;
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
 * Describes the message domain.workflow.v1.CompleteStageResponse.
 * Use `create(CompleteStageResponseSchema)` to create a new message.
 */
export declare const CompleteStageResponseSchema: GenMessage<CompleteStageResponse>;
/**
 * CancelStageRequest is the request message for cancelling a stage
 *
 * @generated from message domain.workflow.v1.CancelStageRequest
 */
export type CancelStageRequest = Message<"domain.workflow.v1.CancelStageRequest"> & {
    /**
     * @generated from field: string stage_id = 1;
     */
    stageId: string;
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
 * Describes the message domain.workflow.v1.CancelStageRequest.
 * Use `create(CancelStageRequestSchema)` to create a new message.
 */
export declare const CancelStageRequestSchema: GenMessage<CancelStageRequest>;
/**
 * CancelStageResponse is the response message for cancelling a stage
 *
 * @generated from message domain.workflow.v1.CancelStageResponse
 */
export type CancelStageResponse = Message<"domain.workflow.v1.CancelStageResponse"> & {
    /**
     * @generated from field: optional domain.workflow.v1.Stage stage = 1;
     */
    stage?: Stage;
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
 * Describes the message domain.workflow.v1.CancelStageResponse.
 * Use `create(CancelStageResponseSchema)` to create a new message.
 */
export declare const CancelStageResponseSchema: GenMessage<CancelStageResponse>;
/**
 * StageDomainService defines the gRPC service for stage operations
 *
 * @generated from service domain.workflow.v1.StageDomainService
 */
export declare const StageDomainService: GenService<{
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.CreateStage
     */
    createStage: {
        methodKind: "unary";
        input: typeof CreateStageRequestSchema;
        output: typeof CreateStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.ReadStage
     */
    readStage: {
        methodKind: "unary";
        input: typeof ReadStageRequestSchema;
        output: typeof ReadStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.UpdateStage
     */
    updateStage: {
        methodKind: "unary";
        input: typeof UpdateStageRequestSchema;
        output: typeof UpdateStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.DeleteStage
     */
    deleteStage: {
        methodKind: "unary";
        input: typeof DeleteStageRequestSchema;
        output: typeof DeleteStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.ListStages
     */
    listStages: {
        methodKind: "unary";
        input: typeof ListStagesRequestSchema;
        output: typeof ListStagesResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.GetStageListPageData
     */
    getStageListPageData: {
        methodKind: "unary";
        input: typeof GetStageListPageDataRequestSchema;
        output: typeof GetStageListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.GetStageItemPageData
     */
    getStageItemPageData: {
        methodKind: "unary";
        input: typeof GetStageItemPageDataRequestSchema;
        output: typeof GetStageItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.GetStagesByWorkflowInstance
     */
    getStagesByWorkflowInstance: {
        methodKind: "unary";
        input: typeof GetStagesByWorkflowInstanceRequestSchema;
        output: typeof GetStagesByWorkflowInstanceResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.StartStage
     */
    startStage: {
        methodKind: "unary";
        input: typeof StartStageRequestSchema;
        output: typeof StartStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.CompleteStage
     */
    completeStage: {
        methodKind: "unary";
        input: typeof CompleteStageRequestSchema;
        output: typeof CompleteStageResponseSchema;
    };
    /**
     * @generated from rpc domain.workflow.v1.StageDomainService.CancelStage
     */
    cancelStage: {
        methodKind: "unary";
        input: typeof CancelStageRequestSchema;
        output: typeof CancelStageResponseSchema;
    };
}>;
