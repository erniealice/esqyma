import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { VersionStatus } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/reporting_checkpoint/reporting_checkpoint.proto.
 */
export declare const file_domain_operation_reporting_checkpoint_reporting_checkpoint: GenFile;
/**
 * @generated from message domain.operation.v1.ReportingCheckpoint
 */
export type ReportingCheckpoint = Message<"domain.operation.v1.ReportingCheckpoint"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string checkpoint_group_id = 2;
     */
    checkpointGroupId: string;
    /**
     * @generated from field: int32 version = 3;
     */
    version: number;
    /**
     * @generated from field: domain.operation.v1.VersionStatus version_status = 4;
     */
    versionStatus: VersionStatus;
    /**
     * @generated from field: optional string workspace_id = 5;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional string period_id = 6;
     */
    periodId?: string;
    /**
     * @generated from field: int32 sequence_order = 7;
     */
    sequenceOrder: number;
    /**
     * @generated from field: string role_code = 8;
     */
    roleCode: string;
    /**
     * @generated from field: string label = 9;
     */
    label: string;
    /**
     * @generated from field: bool is_terminal = 10;
     */
    isTerminal: boolean;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.ReportingCheckpoint.
 * Use `create(ReportingCheckpointSchema)` to create a new message.
 */
export declare const ReportingCheckpointSchema: GenMessage<ReportingCheckpoint>;
/**
 * @generated from message domain.operation.v1.CreateReportingCheckpointRequest
 */
export type CreateReportingCheckpointRequest = Message<"domain.operation.v1.CreateReportingCheckpointRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data?: ReportingCheckpoint;
};
/**
 * Describes the message domain.operation.v1.CreateReportingCheckpointRequest.
 * Use `create(CreateReportingCheckpointRequestSchema)` to create a new message.
 */
export declare const CreateReportingCheckpointRequestSchema: GenMessage<CreateReportingCheckpointRequest>;
/**
 * @generated from message domain.operation.v1.CreateReportingCheckpointResponse
 */
export type CreateReportingCheckpointResponse = Message<"domain.operation.v1.CreateReportingCheckpointResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data: ReportingCheckpoint[];
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
 * Describes the message domain.operation.v1.CreateReportingCheckpointResponse.
 * Use `create(CreateReportingCheckpointResponseSchema)` to create a new message.
 */
export declare const CreateReportingCheckpointResponseSchema: GenMessage<CreateReportingCheckpointResponse>;
/**
 * @generated from message domain.operation.v1.ReadReportingCheckpointRequest
 */
export type ReadReportingCheckpointRequest = Message<"domain.operation.v1.ReadReportingCheckpointRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data?: ReportingCheckpoint;
};
/**
 * Describes the message domain.operation.v1.ReadReportingCheckpointRequest.
 * Use `create(ReadReportingCheckpointRequestSchema)` to create a new message.
 */
export declare const ReadReportingCheckpointRequestSchema: GenMessage<ReadReportingCheckpointRequest>;
/**
 * @generated from message domain.operation.v1.ReadReportingCheckpointResponse
 */
export type ReadReportingCheckpointResponse = Message<"domain.operation.v1.ReadReportingCheckpointResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data: ReportingCheckpoint[];
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
 * Describes the message domain.operation.v1.ReadReportingCheckpointResponse.
 * Use `create(ReadReportingCheckpointResponseSchema)` to create a new message.
 */
export declare const ReadReportingCheckpointResponseSchema: GenMessage<ReadReportingCheckpointResponse>;
/**
 * @generated from message domain.operation.v1.UpdateReportingCheckpointRequest
 */
export type UpdateReportingCheckpointRequest = Message<"domain.operation.v1.UpdateReportingCheckpointRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data?: ReportingCheckpoint;
};
/**
 * Describes the message domain.operation.v1.UpdateReportingCheckpointRequest.
 * Use `create(UpdateReportingCheckpointRequestSchema)` to create a new message.
 */
export declare const UpdateReportingCheckpointRequestSchema: GenMessage<UpdateReportingCheckpointRequest>;
/**
 * @generated from message domain.operation.v1.UpdateReportingCheckpointResponse
 */
export type UpdateReportingCheckpointResponse = Message<"domain.operation.v1.UpdateReportingCheckpointResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data: ReportingCheckpoint[];
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
 * Describes the message domain.operation.v1.UpdateReportingCheckpointResponse.
 * Use `create(UpdateReportingCheckpointResponseSchema)` to create a new message.
 */
export declare const UpdateReportingCheckpointResponseSchema: GenMessage<UpdateReportingCheckpointResponse>;
/**
 * @generated from message domain.operation.v1.DeleteReportingCheckpointRequest
 */
export type DeleteReportingCheckpointRequest = Message<"domain.operation.v1.DeleteReportingCheckpointRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data?: ReportingCheckpoint;
};
/**
 * Describes the message domain.operation.v1.DeleteReportingCheckpointRequest.
 * Use `create(DeleteReportingCheckpointRequestSchema)` to create a new message.
 */
export declare const DeleteReportingCheckpointRequestSchema: GenMessage<DeleteReportingCheckpointRequest>;
/**
 * @generated from message domain.operation.v1.DeleteReportingCheckpointResponse
 */
export type DeleteReportingCheckpointResponse = Message<"domain.operation.v1.DeleteReportingCheckpointResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteReportingCheckpointResponse.
 * Use `create(DeleteReportingCheckpointResponseSchema)` to create a new message.
 */
export declare const DeleteReportingCheckpointResponseSchema: GenMessage<DeleteReportingCheckpointResponse>;
/**
 * @generated from message domain.operation.v1.ListReportingCheckpointsRequest
 */
export type ListReportingCheckpointsRequest = Message<"domain.operation.v1.ListReportingCheckpointsRequest"> & {
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
 * Describes the message domain.operation.v1.ListReportingCheckpointsRequest.
 * Use `create(ListReportingCheckpointsRequestSchema)` to create a new message.
 */
export declare const ListReportingCheckpointsRequestSchema: GenMessage<ListReportingCheckpointsRequest>;
/**
 * @generated from message domain.operation.v1.ListReportingCheckpointsResponse
 */
export type ListReportingCheckpointsResponse = Message<"domain.operation.v1.ListReportingCheckpointsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ReportingCheckpoint data = 1;
     */
    data: ReportingCheckpoint[];
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
 * Describes the message domain.operation.v1.ListReportingCheckpointsResponse.
 * Use `create(ListReportingCheckpointsResponseSchema)` to create a new message.
 */
export declare const ListReportingCheckpointsResponseSchema: GenMessage<ListReportingCheckpointsResponse>;
/**
 * @generated from message domain.operation.v1.GetReportingCheckpointListPageDataRequest
 */
export type GetReportingCheckpointListPageDataRequest = Message<"domain.operation.v1.GetReportingCheckpointListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetReportingCheckpointListPageDataRequest.
 * Use `create(GetReportingCheckpointListPageDataRequestSchema)` to create a new message.
 */
export declare const GetReportingCheckpointListPageDataRequestSchema: GenMessage<GetReportingCheckpointListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetReportingCheckpointListPageDataResponse
 */
export type GetReportingCheckpointListPageDataResponse = Message<"domain.operation.v1.GetReportingCheckpointListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ReportingCheckpoint reporting_checkpoint_list = 1;
     */
    reportingCheckpointList: ReportingCheckpoint[];
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
 * Describes the message domain.operation.v1.GetReportingCheckpointListPageDataResponse.
 * Use `create(GetReportingCheckpointListPageDataResponseSchema)` to create a new message.
 */
export declare const GetReportingCheckpointListPageDataResponseSchema: GenMessage<GetReportingCheckpointListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetReportingCheckpointItemPageDataRequest
 */
export type GetReportingCheckpointItemPageDataRequest = Message<"domain.operation.v1.GetReportingCheckpointItemPageDataRequest"> & {
    /**
     * @generated from field: string reporting_checkpoint_id = 1;
     */
    reportingCheckpointId: string;
};
/**
 * Describes the message domain.operation.v1.GetReportingCheckpointItemPageDataRequest.
 * Use `create(GetReportingCheckpointItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetReportingCheckpointItemPageDataRequestSchema: GenMessage<GetReportingCheckpointItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetReportingCheckpointItemPageDataResponse
 */
export type GetReportingCheckpointItemPageDataResponse = Message<"domain.operation.v1.GetReportingCheckpointItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ReportingCheckpoint reporting_checkpoint = 1;
     */
    reportingCheckpoint?: ReportingCheckpoint;
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
 * Describes the message domain.operation.v1.GetReportingCheckpointItemPageDataResponse.
 * Use `create(GetReportingCheckpointItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetReportingCheckpointItemPageDataResponseSchema: GenMessage<GetReportingCheckpointItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ReportingCheckpointDomainService
 */
export declare const ReportingCheckpointDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.CreateReportingCheckpoint
     */
    createReportingCheckpoint: {
        methodKind: "unary";
        input: typeof CreateReportingCheckpointRequestSchema;
        output: typeof CreateReportingCheckpointResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.ReadReportingCheckpoint
     */
    readReportingCheckpoint: {
        methodKind: "unary";
        input: typeof ReadReportingCheckpointRequestSchema;
        output: typeof ReadReportingCheckpointResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.UpdateReportingCheckpoint
     */
    updateReportingCheckpoint: {
        methodKind: "unary";
        input: typeof UpdateReportingCheckpointRequestSchema;
        output: typeof UpdateReportingCheckpointResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.DeleteReportingCheckpoint
     */
    deleteReportingCheckpoint: {
        methodKind: "unary";
        input: typeof DeleteReportingCheckpointRequestSchema;
        output: typeof DeleteReportingCheckpointResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.ListReportingCheckpoints
     */
    listReportingCheckpoints: {
        methodKind: "unary";
        input: typeof ListReportingCheckpointsRequestSchema;
        output: typeof ListReportingCheckpointsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.GetReportingCheckpointListPageData
     */
    getReportingCheckpointListPageData: {
        methodKind: "unary";
        input: typeof GetReportingCheckpointListPageDataRequestSchema;
        output: typeof GetReportingCheckpointListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ReportingCheckpointDomainService.GetReportingCheckpointItemPageData
     */
    getReportingCheckpointItemPageData: {
        methodKind: "unary";
        input: typeof GetReportingCheckpointItemPageDataRequestSchema;
        output: typeof GetReportingCheckpointItemPageDataResponseSchema;
    };
}>;
