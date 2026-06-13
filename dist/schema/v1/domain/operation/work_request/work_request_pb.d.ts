import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/work_request/work_request.proto.
 */
export declare const file_domain_operation_work_request_work_request: GenFile;
/**
 * @generated from message domain.operation.v1.WorkRequest
 */
export type WorkRequest = Message<"domain.operation.v1.WorkRequest"> & {
    /**
     * Identity
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Origin axis: client_id is OPTIONAL, DB-gated by origin (Q-REQ-ORIGIN).
     * CHECK ((client_id IS NULL) = (origin = 3)) in migration.
     *
     * @generated from field: optional string client_id = 3;
     */
    clientId?: string;
    /**
     * @generated from field: domain.operation.v1.WorkRequestOrigin origin = 23;
     */
    origin: WorkRequestOrigin;
    /**
     * Code + type
     *
     * "REQ-0104" per-workspace sequential (Q-REQ-CODE)
     *
     * @generated from field: string request_number = 4;
     */
    requestNumber: string;
    /**
     * @generated from field: string work_request_type_id = 5;
     */
    workRequestTypeId: string;
    /**
     * Lifecycle
     *
     * @generated from field: domain.operation.v1.WorkRequestStatus status = 6;
     */
    status: WorkRequestStatus;
    /**
     * Display (denormalized from payload at create)
     *
     * @generated from field: string title = 7;
     */
    title: string;
    /**
     * @generated from field: string description = 8;
     */
    description: string;
    /**
     * Payload (type-specific values, validated vs type.input_schema_json)
     *
     * @generated from field: string payload_json = 9;
     */
    payloadJson: string;
    /**
     * Person-specific seat (optional; CR-9 subscription_seat consumed, not re-authored)
     *
     * @generated from field: optional string subscription_seat_id = 10;
     */
    subscriptionSeatId?: string;
    /**
     * Principals
     *
     * @generated from field: string requested_by_user_id = 11;
     */
    requestedByUserId: string;
    /**
     * @generated from field: optional string assigned_to_workspace_user_id = 12;
     */
    assignedToWorkspaceUserId?: string;
    /**
     * Priority
     *
     * 0=normal, 1=high
     *
     * @generated from field: int32 priority = 13;
     */
    priority: number;
    /**
     * SLA (Q-REQ-SLA)
     *
     * snapshot from type.default_sla_hours at submit
     *
     * @generated from field: int64 sla_target_hours = 14;
     */
    slaTargetHours: bigint;
    /**
     * stored = date_submitted + sla_target_hours (unix millis)
     *
     * @generated from field: optional int64 sla_due_at = 15;
     */
    slaDueAt?: bigint;
    /**
     * idempotent stamp when first observed past-due & non-terminal
     *
     * @generated from field: optional int64 sla_breached_at = 16;
     */
    slaBreachedAt?: bigint;
    /**
     * Engine coupling (Q-REQ-ENGINE)
     *
     * @generated from field: optional string workflow_id = 17;
     */
    workflowId?: string;
    /**
     * @generated from field: optional string resolution_note = 18;
     */
    resolutionNote?: string;
    /**
     * Lifecycle timestamps
     *
     * @generated from field: optional int64 date_submitted = 19;
     */
    dateSubmitted?: bigint;
    /**
     * @generated from field: optional int64 date_resolved = 20;
     */
    dateResolved?: bigint;
    /**
     * Active flag (DB-coupled to status: active = status NOT IN (5,6,7))
     *
     * @generated from field: bool active = 21;
     */
    active: boolean;
    /**
     * Idempotency (Q-REQ-CODE / duplicate-submit guard)
     *
     * @generated from field: string submission_idempotency_key = 22;
     */
    submissionIdempotencyKey: string;
    /**
     * Downstream seam: FK to operation/job (nullable; set only when APPROVED -> costed fulfillment)
     *
     * @generated from field: optional string job_id = 24;
     */
    jobId?: string;
    /**
     * Project/engagement anchor (Q-SERVICING)
     *
     * @generated from field: optional string subscription_id = 25;
     */
    subscriptionId?: string;
    /**
     * Standard timestamps
     *
     * @generated from field: optional int64 date_created = 100;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 101;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 102;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 103;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.WorkRequest.
 * Use `create(WorkRequestSchema)` to create a new message.
 */
export declare const WorkRequestSchema: GenMessage<WorkRequest>;
/**
 * @generated from message domain.operation.v1.CreateWorkRequestRequest
 */
export type CreateWorkRequestRequest = Message<"domain.operation.v1.CreateWorkRequestRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequest data = 1;
     */
    data?: WorkRequest;
};
/**
 * Describes the message domain.operation.v1.CreateWorkRequestRequest.
 * Use `create(CreateWorkRequestRequestSchema)` to create a new message.
 */
export declare const CreateWorkRequestRequestSchema: GenMessage<CreateWorkRequestRequest>;
/**
 * @generated from message domain.operation.v1.CreateWorkRequestResponse
 */
export type CreateWorkRequestResponse = Message<"domain.operation.v1.CreateWorkRequestResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequest data = 1;
     */
    data: WorkRequest[];
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
 * Describes the message domain.operation.v1.CreateWorkRequestResponse.
 * Use `create(CreateWorkRequestResponseSchema)` to create a new message.
 */
export declare const CreateWorkRequestResponseSchema: GenMessage<CreateWorkRequestResponse>;
/**
 * @generated from message domain.operation.v1.ReadWorkRequestRequest
 */
export type ReadWorkRequestRequest = Message<"domain.operation.v1.ReadWorkRequestRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequest data = 1;
     */
    data?: WorkRequest;
};
/**
 * Describes the message domain.operation.v1.ReadWorkRequestRequest.
 * Use `create(ReadWorkRequestRequestSchema)` to create a new message.
 */
export declare const ReadWorkRequestRequestSchema: GenMessage<ReadWorkRequestRequest>;
/**
 * @generated from message domain.operation.v1.ReadWorkRequestResponse
 */
export type ReadWorkRequestResponse = Message<"domain.operation.v1.ReadWorkRequestResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequest data = 1;
     */
    data: WorkRequest[];
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
 * Describes the message domain.operation.v1.ReadWorkRequestResponse.
 * Use `create(ReadWorkRequestResponseSchema)` to create a new message.
 */
export declare const ReadWorkRequestResponseSchema: GenMessage<ReadWorkRequestResponse>;
/**
 * @generated from message domain.operation.v1.UpdateWorkRequestRequest
 */
export type UpdateWorkRequestRequest = Message<"domain.operation.v1.UpdateWorkRequestRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequest data = 1;
     */
    data?: WorkRequest;
};
/**
 * Describes the message domain.operation.v1.UpdateWorkRequestRequest.
 * Use `create(UpdateWorkRequestRequestSchema)` to create a new message.
 */
export declare const UpdateWorkRequestRequestSchema: GenMessage<UpdateWorkRequestRequest>;
/**
 * @generated from message domain.operation.v1.UpdateWorkRequestResponse
 */
export type UpdateWorkRequestResponse = Message<"domain.operation.v1.UpdateWorkRequestResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequest data = 1;
     */
    data: WorkRequest[];
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
 * Describes the message domain.operation.v1.UpdateWorkRequestResponse.
 * Use `create(UpdateWorkRequestResponseSchema)` to create a new message.
 */
export declare const UpdateWorkRequestResponseSchema: GenMessage<UpdateWorkRequestResponse>;
/**
 * @generated from message domain.operation.v1.DeleteWorkRequestRequest
 */
export type DeleteWorkRequestRequest = Message<"domain.operation.v1.DeleteWorkRequestRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequest data = 1;
     */
    data?: WorkRequest;
};
/**
 * Describes the message domain.operation.v1.DeleteWorkRequestRequest.
 * Use `create(DeleteWorkRequestRequestSchema)` to create a new message.
 */
export declare const DeleteWorkRequestRequestSchema: GenMessage<DeleteWorkRequestRequest>;
/**
 * @generated from message domain.operation.v1.DeleteWorkRequestResponse
 */
export type DeleteWorkRequestResponse = Message<"domain.operation.v1.DeleteWorkRequestResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteWorkRequestResponse.
 * Use `create(DeleteWorkRequestResponseSchema)` to create a new message.
 */
export declare const DeleteWorkRequestResponseSchema: GenMessage<DeleteWorkRequestResponse>;
/**
 * @generated from message domain.operation.v1.ListWorkRequestsRequest
 */
export type ListWorkRequestsRequest = Message<"domain.operation.v1.ListWorkRequestsRequest"> & {
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
 * Describes the message domain.operation.v1.ListWorkRequestsRequest.
 * Use `create(ListWorkRequestsRequestSchema)` to create a new message.
 */
export declare const ListWorkRequestsRequestSchema: GenMessage<ListWorkRequestsRequest>;
/**
 * @generated from message domain.operation.v1.ListWorkRequestsResponse
 */
export type ListWorkRequestsResponse = Message<"domain.operation.v1.ListWorkRequestsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequest data = 1;
     */
    data: WorkRequest[];
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
 * Describes the message domain.operation.v1.ListWorkRequestsResponse.
 * Use `create(ListWorkRequestsResponseSchema)` to create a new message.
 */
export declare const ListWorkRequestsResponseSchema: GenMessage<ListWorkRequestsResponse>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestListPageDataRequest
 */
export type GetWorkRequestListPageDataRequest = Message<"domain.operation.v1.GetWorkRequestListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetWorkRequestListPageDataRequest.
 * Use `create(GetWorkRequestListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkRequestListPageDataRequestSchema: GenMessage<GetWorkRequestListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestListPageDataResponse
 */
export type GetWorkRequestListPageDataResponse = Message<"domain.operation.v1.GetWorkRequestListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequest work_request_list = 1;
     */
    workRequestList: WorkRequest[];
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
 * Describes the message domain.operation.v1.GetWorkRequestListPageDataResponse.
 * Use `create(GetWorkRequestListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkRequestListPageDataResponseSchema: GenMessage<GetWorkRequestListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestItemPageDataRequest
 */
export type GetWorkRequestItemPageDataRequest = Message<"domain.operation.v1.GetWorkRequestItemPageDataRequest"> & {
    /**
     * @generated from field: string work_request_id = 1;
     */
    workRequestId: string;
};
/**
 * Describes the message domain.operation.v1.GetWorkRequestItemPageDataRequest.
 * Use `create(GetWorkRequestItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkRequestItemPageDataRequestSchema: GenMessage<GetWorkRequestItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestItemPageDataResponse
 */
export type GetWorkRequestItemPageDataResponse = Message<"domain.operation.v1.GetWorkRequestItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.WorkRequest work_request = 1;
     */
    workRequest?: WorkRequest;
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
 * Describes the message domain.operation.v1.GetWorkRequestItemPageDataResponse.
 * Use `create(GetWorkRequestItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkRequestItemPageDataResponseSchema: GenMessage<GetWorkRequestItemPageDataResponse>;
/**
 * WorkRequestOrigin — the origin axis discriminator (Q-REQ-ORIGIN).
 * origin, NOT client_id, is the discriminator.
 *
 * @generated from enum domain.operation.v1.WorkRequestOrigin
 */
export declare enum WorkRequestOrigin {
    /**
     * @generated from enum value: WORK_REQUEST_ORIGIN_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * a client raised it (portal) -- client-visible
     *
     * @generated from enum value: WORK_REQUEST_ORIGIN_CLIENT_ORIGINATED = 1;
     */
    CLIENT_ORIGINATED = 1,
    /**
     * staff-initiated work ABOUT a client's seat -- NOT client-visible
     *
     * @generated from enum value: WORK_REQUEST_ORIGIN_CLIENT_RELATED_INTERNAL = 2;
     */
    CLIENT_RELATED_INTERNAL = 2,
    /**
     * pure internal work -- no client at all
     *
     * @generated from enum value: WORK_REQUEST_ORIGIN_INTERNAL = 3;
     */
    INTERNAL = 3
}
/**
 * Describes the enum domain.operation.v1.WorkRequestOrigin.
 */
export declare const WorkRequestOriginSchema: GenEnum<WorkRequestOrigin>;
/**
 * WorkRequestStatus — typed negative-case lifecycle (Q-REQ-STATUS).
 * TERMINAL set = {DECLINED=5, COMPLETED=6, CANCELLED=7}. Everything else,
 * including APPROVED=4 and the 4 negative states 8-11, is NON-terminal
 * (active=true). DB coupling: active = status NOT IN (5,6,7).
 *
 * @generated from enum domain.operation.v1.WorkRequestStatus
 */
export declare enum WorkRequestStatus {
    /**
     * @generated from enum value: WORK_REQUEST_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * draft, not yet submitted
     *
     * @generated from enum value: WORK_REQUEST_STATUS_NEW = 1;
     */
    NEW = 1,
    /**
     * @generated from enum value: WORK_REQUEST_STATUS_SUBMITTED = 2;
     */
    SUBMITTED = 2,
    /**
     * @generated from enum value: WORK_REQUEST_STATUS_IN_REVIEW = 3;
     */
    IN_REVIEW = 3,
    /**
     * decision: yes; downstream action pending -- NON-TERMINAL
     *
     * @generated from enum value: WORK_REQUEST_STATUS_APPROVED = 4;
     */
    APPROVED = 4,
    /**
     * TERMINAL
     *
     * @generated from enum value: WORK_REQUEST_STATUS_DECLINED = 5;
     */
    DECLINED = 5,
    /**
     * TERMINAL (downstream action done)
     *
     * @generated from enum value: WORK_REQUEST_STATUS_COMPLETED = 6;
     */
    COMPLETED = 6,
    /**
     * TERMINAL (requester withdrew)
     *
     * @generated from enum value: WORK_REQUEST_STATUS_CANCELLED = 7;
     */
    CANCELLED = 7,
    /**
     * sent back to requester for more info -- NON-TERMINAL
     *
     * @generated from enum value: WORK_REQUEST_STATUS_RETURNED_FOR_INFO = 8;
     */
    RETURNED_FOR_INFO = 8,
    /**
     * blocked/paused -- NON-TERMINAL
     *
     * @generated from enum value: WORK_REQUEST_STATUS_ON_HOLD = 9;
     */
    ON_HOLD = 9,
    /**
     * raised to higher authority -- NON-TERMINAL
     *
     * @generated from enum value: WORK_REQUEST_STATUS_ESCALATED = 10;
     */
    ESCALATED = 10,
    /**
     * a decision awaits an override authority -- NON-TERMINAL
     *
     * @generated from enum value: WORK_REQUEST_STATUS_PENDING_OVERRIDE = 11;
     */
    PENDING_OVERRIDE = 11
}
/**
 * Describes the enum domain.operation.v1.WorkRequestStatus.
 */
export declare const WorkRequestStatusSchema: GenEnum<WorkRequestStatus>;
/**
 * @generated from service domain.operation.v1.WorkRequestDomainService
 */
export declare const WorkRequestDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.CreateWorkRequest
     */
    createWorkRequest: {
        methodKind: "unary";
        input: typeof CreateWorkRequestRequestSchema;
        output: typeof CreateWorkRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.ReadWorkRequest
     */
    readWorkRequest: {
        methodKind: "unary";
        input: typeof ReadWorkRequestRequestSchema;
        output: typeof ReadWorkRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.UpdateWorkRequest
     */
    updateWorkRequest: {
        methodKind: "unary";
        input: typeof UpdateWorkRequestRequestSchema;
        output: typeof UpdateWorkRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.DeleteWorkRequest
     */
    deleteWorkRequest: {
        methodKind: "unary";
        input: typeof DeleteWorkRequestRequestSchema;
        output: typeof DeleteWorkRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.ListWorkRequests
     */
    listWorkRequests: {
        methodKind: "unary";
        input: typeof ListWorkRequestsRequestSchema;
        output: typeof ListWorkRequestsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.GetWorkRequestListPageData
     */
    getWorkRequestListPageData: {
        methodKind: "unary";
        input: typeof GetWorkRequestListPageDataRequestSchema;
        output: typeof GetWorkRequestListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestDomainService.GetWorkRequestItemPageData
     */
    getWorkRequestItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkRequestItemPageDataRequestSchema;
        output: typeof GetWorkRequestItemPageDataResponseSchema;
    };
}>;
