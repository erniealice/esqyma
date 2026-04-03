import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../domain/common/error_pb";
import type { Workflow } from "../../domain/workflow/workflow/workflow_pb";
import type { Stage } from "../../domain/workflow/stage/stage_pb";
import type { Activity } from "../../domain/workflow/activity/activity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file orchestration/engine/engine.proto.
 */
export declare const file_orchestration_engine_engine: GenFile;
/**
 * StartWorkflowRequest
 *
 * @generated from message orchestration.engine.v1.StartWorkflowRequest
 */
export type StartWorkflowRequest = Message<"orchestration.engine.v1.StartWorkflowRequest"> & {
    /**
     * @generated from field: string workflow_template_id = 1;
     */
    workflowTemplateId: string;
    /**
     * Initial data for the workflow
     *
     * @generated from field: string input_json = 2;
     */
    inputJson: string;
    /**
     * @generated from field: optional string workspace_id = 3;
     */
    workspaceId?: string;
};
/**
 * Describes the message orchestration.engine.v1.StartWorkflowRequest.
 * Use `create(StartWorkflowRequestSchema)` to create a new message.
 */
export declare const StartWorkflowRequestSchema: GenMessage<StartWorkflowRequest>;
/**
 * @generated from message orchestration.engine.v1.StartWorkflowResponse
 */
export type StartWorkflowResponse = Message<"orchestration.engine.v1.StartWorkflowResponse"> & {
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
 * Describes the message orchestration.engine.v1.StartWorkflowResponse.
 * Use `create(StartWorkflowResponseSchema)` to create a new message.
 */
export declare const StartWorkflowResponseSchema: GenMessage<StartWorkflowResponse>;
/**
 * ExecuteActivityRequest
 *
 * @generated from message orchestration.engine.v1.ExecuteActivityRequest
 */
export type ExecuteActivityRequest = Message<"orchestration.engine.v1.ExecuteActivityRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: string workflow_id = 2;
     */
    workflowId: string;
};
/**
 * Describes the message orchestration.engine.v1.ExecuteActivityRequest.
 * Use `create(ExecuteActivityRequestSchema)` to create a new message.
 */
export declare const ExecuteActivityRequestSchema: GenMessage<ExecuteActivityRequest>;
/**
 * @generated from message orchestration.engine.v1.ExecuteActivityResponse
 */
export type ExecuteActivityResponse = Message<"orchestration.engine.v1.ExecuteActivityResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: string output_json = 3;
     */
    outputJson: string;
};
/**
 * Describes the message orchestration.engine.v1.ExecuteActivityResponse.
 * Use `create(ExecuteActivityResponseSchema)` to create a new message.
 */
export declare const ExecuteActivityResponseSchema: GenMessage<ExecuteActivityResponse>;
/**
 * AdvanceWorkflowRequest
 *
 * @generated from message orchestration.engine.v1.AdvanceWorkflowRequest
 */
export type AdvanceWorkflowRequest = Message<"orchestration.engine.v1.AdvanceWorkflowRequest"> & {
    /**
     * @generated from field: string workflow_id = 1;
     */
    workflowId: string;
};
/**
 * Describes the message orchestration.engine.v1.AdvanceWorkflowRequest.
 * Use `create(AdvanceWorkflowRequestSchema)` to create a new message.
 */
export declare const AdvanceWorkflowRequestSchema: GenMessage<AdvanceWorkflowRequest>;
/**
 * @generated from message orchestration.engine.v1.AdvanceWorkflowResponse
 */
export type AdvanceWorkflowResponse = Message<"orchestration.engine.v1.AdvanceWorkflowResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: string next_stage_id = 3;
     */
    nextStageId: string;
    /**
     * @generated from field: bool workflow_completed = 4;
     */
    workflowCompleted: boolean;
};
/**
 * Describes the message orchestration.engine.v1.AdvanceWorkflowResponse.
 * Use `create(AdvanceWorkflowResponseSchema)` to create a new message.
 */
export declare const AdvanceWorkflowResponseSchema: GenMessage<AdvanceWorkflowResponse>;
/**
 * GetWorkflowStatusRequest retrieves current workflow state including pending activities
 *
 * @generated from message orchestration.engine.v1.GetWorkflowStatusRequest
 */
export type GetWorkflowStatusRequest = Message<"orchestration.engine.v1.GetWorkflowStatusRequest"> & {
    /**
     * @generated from field: string workflow_id = 1;
     */
    workflowId: string;
};
/**
 * Describes the message orchestration.engine.v1.GetWorkflowStatusRequest.
 * Use `create(GetWorkflowStatusRequestSchema)` to create a new message.
 */
export declare const GetWorkflowStatusRequestSchema: GenMessage<GetWorkflowStatusRequest>;
/**
 * @generated from message orchestration.engine.v1.GetWorkflowStatusResponse
 */
export type GetWorkflowStatusResponse = Message<"orchestration.engine.v1.GetWorkflowStatusResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.workflow.v1.Workflow workflow = 3;
     */
    workflow?: Workflow;
    /**
     * @generated from field: optional domain.workflow.v1.Stage current_stage = 4;
     */
    currentStage?: Stage;
    /**
     * @generated from field: repeated domain.workflow.v1.Activity activities = 5;
     */
    activities: Activity[];
    /**
     * ID of activity awaiting human input
     *
     * @generated from field: optional string pending_activity_id = 6;
     */
    pendingActivityId?: string;
};
/**
 * Describes the message orchestration.engine.v1.GetWorkflowStatusResponse.
 * Use `create(GetWorkflowStatusResponseSchema)` to create a new message.
 */
export declare const GetWorkflowStatusResponseSchema: GenMessage<GetWorkflowStatusResponse>;
/**
 * ContinueWorkflowRequest submits human input to continue a paused workflow
 *
 * @generated from message orchestration.engine.v1.ContinueWorkflowRequest
 */
export type ContinueWorkflowRequest = Message<"orchestration.engine.v1.ContinueWorkflowRequest"> & {
    /**
     * @generated from field: string workflow_id = 1;
     */
    workflowId: string;
    /**
     * The pending human activity to continue
     *
     * @generated from field: string activity_id = 2;
     */
    activityId: string;
    /**
     * Human-provided input data
     *
     * @generated from field: string input_json = 3;
     */
    inputJson: string;
};
/**
 * Describes the message orchestration.engine.v1.ContinueWorkflowRequest.
 * Use `create(ContinueWorkflowRequestSchema)` to create a new message.
 */
export declare const ContinueWorkflowRequestSchema: GenMessage<ContinueWorkflowRequest>;
/**
 * @generated from message orchestration.engine.v1.ContinueWorkflowResponse
 */
export type ContinueWorkflowResponse = Message<"orchestration.engine.v1.ContinueWorkflowResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: optional string output_json = 3;
     */
    outputJson?: string;
    /**
     * True if workflow moved to next stage
     *
     * @generated from field: bool workflow_advanced = 4;
     */
    workflowAdvanced: boolean;
    /**
     * Next pending activity if any
     *
     * @generated from field: optional string next_pending_activity_id = 5;
     */
    nextPendingActivityId?: string;
};
/**
 * Describes the message orchestration.engine.v1.ContinueWorkflowResponse.
 * Use `create(ContinueWorkflowResponseSchema)` to create a new message.
 */
export declare const ContinueWorkflowResponseSchema: GenMessage<ContinueWorkflowResponse>;
/**
 * RunToCompletion - Executes a workflow from start to finish in a single call
 * Loops through all automated activities until completion or error
 *
 * @generated from message orchestration.engine.v1.RunToCompletionRequest
 */
export type RunToCompletionRequest = Message<"orchestration.engine.v1.RunToCompletionRequest"> & {
    /**
     * Template ID from database
     *
     * @generated from field: string workflow_template_id = 1;
     */
    workflowTemplateId: string;
    /**
     * Initial workflow context as JSON
     *
     * @generated from field: string input_json = 2;
     */
    inputJson: string;
    /**
     * Optional workspace context
     *
     * @generated from field: optional string workspace_id = 3;
     */
    workspaceId?: string;
    /**
     * Safety limit (default 100)
     *
     * @generated from field: optional int32 max_iterations = 4;
     */
    maxIterations?: number;
};
/**
 * Describes the message orchestration.engine.v1.RunToCompletionRequest.
 * Use `create(RunToCompletionRequestSchema)` to create a new message.
 */
export declare const RunToCompletionRequestSchema: GenMessage<RunToCompletionRequest>;
/**
 * @generated from message orchestration.engine.v1.RunToCompletionResponse
 */
export type RunToCompletionResponse = Message<"orchestration.engine.v1.RunToCompletionResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * Final workflow state
     *
     * @generated from field: optional domain.workflow.v1.Workflow workflow = 3;
     */
    workflow?: Workflow;
    /**
     * Final workflow context as JSON
     *
     * @generated from field: string output_json = 4;
     */
    outputJson: string;
};
/**
 * Describes the message orchestration.engine.v1.RunToCompletionResponse.
 * Use `create(RunToCompletionResponseSchema)` to create a new message.
 */
export declare const RunToCompletionResponseSchema: GenMessage<RunToCompletionResponse>;
/**
 * WorkflowEngineService defines the gRPC service for workflow engine operations
 *
 * @generated from service orchestration.engine.v1.WorkflowEngineService
 */
export declare const WorkflowEngineService: GenService<{
    /**
     * @generated from rpc orchestration.engine.v1.WorkflowEngineService.StartWorkflowFromTemplate
     */
    startWorkflowFromTemplate: {
        methodKind: "unary";
        input: typeof StartWorkflowRequestSchema;
        output: typeof StartWorkflowResponseSchema;
    };
    /**
     * @generated from rpc orchestration.engine.v1.WorkflowEngineService.ExecuteActivity
     */
    executeActivity: {
        methodKind: "unary";
        input: typeof ExecuteActivityRequestSchema;
        output: typeof ExecuteActivityResponseSchema;
    };
    /**
     * @generated from rpc orchestration.engine.v1.WorkflowEngineService.AdvanceWorkflow
     */
    advanceWorkflow: {
        methodKind: "unary";
        input: typeof AdvanceWorkflowRequestSchema;
        output: typeof AdvanceWorkflowResponseSchema;
    };
    /**
     * @generated from rpc orchestration.engine.v1.WorkflowEngineService.GetWorkflowStatus
     */
    getWorkflowStatus: {
        methodKind: "unary";
        input: typeof GetWorkflowStatusRequestSchema;
        output: typeof GetWorkflowStatusResponseSchema;
    };
    /**
     * @generated from rpc orchestration.engine.v1.WorkflowEngineService.ContinueWorkflow
     */
    continueWorkflow: {
        methodKind: "unary";
        input: typeof ContinueWorkflowRequestSchema;
        output: typeof ContinueWorkflowResponseSchema;
    };
    /**
     * @generated from rpc orchestration.engine.v1.WorkflowEngineService.RunToCompletion
     */
    runToCompletion: {
        methodKind: "unary";
        input: typeof RunToCompletionRequestSchema;
        output: typeof RunToCompletionResponseSchema;
    };
}>;
