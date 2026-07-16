import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { ScaleKind, VersionStatus } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/score_scale/score_scale.proto.
 */
export declare const file_domain_operation_score_scale_score_scale: GenFile;
/**
 * @generated from message domain.operation.v1.ScoreScale
 */
export type ScoreScale = Message<"domain.operation.v1.ScoreScale"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string scale_group_id = 2;
     */
    scaleGroupId: string;
    /**
     * @generated from field: int32 version = 3;
     */
    version: number;
    /**
     * @generated from field: domain.operation.v1.VersionStatus version_status = 4;
     */
    versionStatus: VersionStatus;
    /**
     * @generated from field: string name = 5;
     */
    name: string;
    /**
     * @generated from field: domain.operation.v1.ScaleKind scale_kind = 6;
     */
    scaleKind: ScaleKind;
    /**
     * @generated from field: string input_unit = 7;
     */
    inputUnit: string;
    /**
     * @generated from field: optional double input_min = 8;
     */
    inputMin?: number;
    /**
     * @generated from field: optional double input_max = 9;
     */
    inputMax?: number;
    /**
     * @generated from field: string output_unit = 10;
     */
    outputUnit: string;
    /**
     * @generated from field: optional string workspace_id = 11;
     */
    workspaceId?: string;
    /**
     * @generated from field: bool active = 12;
     */
    active: boolean;
    /**
     * @generated from field: string created_by = 13;
     */
    createdBy: string;
    /**
     * @generated from field: optional int64 date_created = 14;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 15;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 16;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 17;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.ScoreScale.
 * Use `create(ScoreScaleSchema)` to create a new message.
 */
export declare const ScoreScaleSchema: GenMessage<ScoreScale>;
/**
 * @generated from message domain.operation.v1.CreateScoreScaleRequest
 */
export type CreateScoreScaleRequest = Message<"domain.operation.v1.CreateScoreScaleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScale data = 1;
     */
    data?: ScoreScale;
};
/**
 * Describes the message domain.operation.v1.CreateScoreScaleRequest.
 * Use `create(CreateScoreScaleRequestSchema)` to create a new message.
 */
export declare const CreateScoreScaleRequestSchema: GenMessage<CreateScoreScaleRequest>;
/**
 * @generated from message domain.operation.v1.CreateScoreScaleResponse
 */
export type CreateScoreScaleResponse = Message<"domain.operation.v1.CreateScoreScaleResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScale data = 1;
     */
    data: ScoreScale[];
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
 * Describes the message domain.operation.v1.CreateScoreScaleResponse.
 * Use `create(CreateScoreScaleResponseSchema)` to create a new message.
 */
export declare const CreateScoreScaleResponseSchema: GenMessage<CreateScoreScaleResponse>;
/**
 * @generated from message domain.operation.v1.ReadScoreScaleRequest
 */
export type ReadScoreScaleRequest = Message<"domain.operation.v1.ReadScoreScaleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScale data = 1;
     */
    data?: ScoreScale;
};
/**
 * Describes the message domain.operation.v1.ReadScoreScaleRequest.
 * Use `create(ReadScoreScaleRequestSchema)` to create a new message.
 */
export declare const ReadScoreScaleRequestSchema: GenMessage<ReadScoreScaleRequest>;
/**
 * @generated from message domain.operation.v1.ReadScoreScaleResponse
 */
export type ReadScoreScaleResponse = Message<"domain.operation.v1.ReadScoreScaleResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScale data = 1;
     */
    data: ScoreScale[];
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
 * Describes the message domain.operation.v1.ReadScoreScaleResponse.
 * Use `create(ReadScoreScaleResponseSchema)` to create a new message.
 */
export declare const ReadScoreScaleResponseSchema: GenMessage<ReadScoreScaleResponse>;
/**
 * @generated from message domain.operation.v1.UpdateScoreScaleRequest
 */
export type UpdateScoreScaleRequest = Message<"domain.operation.v1.UpdateScoreScaleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScale data = 1;
     */
    data?: ScoreScale;
};
/**
 * Describes the message domain.operation.v1.UpdateScoreScaleRequest.
 * Use `create(UpdateScoreScaleRequestSchema)` to create a new message.
 */
export declare const UpdateScoreScaleRequestSchema: GenMessage<UpdateScoreScaleRequest>;
/**
 * @generated from message domain.operation.v1.UpdateScoreScaleResponse
 */
export type UpdateScoreScaleResponse = Message<"domain.operation.v1.UpdateScoreScaleResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScale data = 1;
     */
    data: ScoreScale[];
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
 * Describes the message domain.operation.v1.UpdateScoreScaleResponse.
 * Use `create(UpdateScoreScaleResponseSchema)` to create a new message.
 */
export declare const UpdateScoreScaleResponseSchema: GenMessage<UpdateScoreScaleResponse>;
/**
 * @generated from message domain.operation.v1.DeleteScoreScaleRequest
 */
export type DeleteScoreScaleRequest = Message<"domain.operation.v1.DeleteScoreScaleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScale data = 1;
     */
    data?: ScoreScale;
};
/**
 * Describes the message domain.operation.v1.DeleteScoreScaleRequest.
 * Use `create(DeleteScoreScaleRequestSchema)` to create a new message.
 */
export declare const DeleteScoreScaleRequestSchema: GenMessage<DeleteScoreScaleRequest>;
/**
 * @generated from message domain.operation.v1.DeleteScoreScaleResponse
 */
export type DeleteScoreScaleResponse = Message<"domain.operation.v1.DeleteScoreScaleResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteScoreScaleResponse.
 * Use `create(DeleteScoreScaleResponseSchema)` to create a new message.
 */
export declare const DeleteScoreScaleResponseSchema: GenMessage<DeleteScoreScaleResponse>;
/**
 * @generated from message domain.operation.v1.ListScoreScalesRequest
 */
export type ListScoreScalesRequest = Message<"domain.operation.v1.ListScoreScalesRequest"> & {
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
 * Describes the message domain.operation.v1.ListScoreScalesRequest.
 * Use `create(ListScoreScalesRequestSchema)` to create a new message.
 */
export declare const ListScoreScalesRequestSchema: GenMessage<ListScoreScalesRequest>;
/**
 * @generated from message domain.operation.v1.ListScoreScalesResponse
 */
export type ListScoreScalesResponse = Message<"domain.operation.v1.ListScoreScalesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScale data = 1;
     */
    data: ScoreScale[];
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
 * Describes the message domain.operation.v1.ListScoreScalesResponse.
 * Use `create(ListScoreScalesResponseSchema)` to create a new message.
 */
export declare const ListScoreScalesResponseSchema: GenMessage<ListScoreScalesResponse>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleListPageDataRequest
 */
export type GetScoreScaleListPageDataRequest = Message<"domain.operation.v1.GetScoreScaleListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetScoreScaleListPageDataRequest.
 * Use `create(GetScoreScaleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoreScaleListPageDataRequestSchema: GenMessage<GetScoreScaleListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleListPageDataResponse
 */
export type GetScoreScaleListPageDataResponse = Message<"domain.operation.v1.GetScoreScaleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScale score_scale_list = 1;
     */
    scoreScaleList: ScoreScale[];
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
 * Describes the message domain.operation.v1.GetScoreScaleListPageDataResponse.
 * Use `create(GetScoreScaleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoreScaleListPageDataResponseSchema: GenMessage<GetScoreScaleListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleItemPageDataRequest
 */
export type GetScoreScaleItemPageDataRequest = Message<"domain.operation.v1.GetScoreScaleItemPageDataRequest"> & {
    /**
     * @generated from field: string score_scale_id = 1;
     */
    scoreScaleId: string;
};
/**
 * Describes the message domain.operation.v1.GetScoreScaleItemPageDataRequest.
 * Use `create(GetScoreScaleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoreScaleItemPageDataRequestSchema: GenMessage<GetScoreScaleItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleItemPageDataResponse
 */
export type GetScoreScaleItemPageDataResponse = Message<"domain.operation.v1.GetScoreScaleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ScoreScale score_scale = 1;
     */
    scoreScale?: ScoreScale;
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
 * Describes the message domain.operation.v1.GetScoreScaleItemPageDataResponse.
 * Use `create(GetScoreScaleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoreScaleItemPageDataResponseSchema: GenMessage<GetScoreScaleItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListScoreScalesByGroupRequest
 */
export type ListScoreScalesByGroupRequest = Message<"domain.operation.v1.ListScoreScalesByGroupRequest"> & {
    /**
     * @generated from field: string scale_group_id = 1;
     */
    scaleGroupId: string;
};
/**
 * Describes the message domain.operation.v1.ListScoreScalesByGroupRequest.
 * Use `create(ListScoreScalesByGroupRequestSchema)` to create a new message.
 */
export declare const ListScoreScalesByGroupRequestSchema: GenMessage<ListScoreScalesByGroupRequest>;
/**
 * @generated from message domain.operation.v1.ListScoreScalesByGroupResponse
 */
export type ListScoreScalesByGroupResponse = Message<"domain.operation.v1.ListScoreScalesByGroupResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScale score_scales = 1;
     */
    scoreScales: ScoreScale[];
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
 * Describes the message domain.operation.v1.ListScoreScalesByGroupResponse.
 * Use `create(ListScoreScalesByGroupResponseSchema)` to create a new message.
 */
export declare const ListScoreScalesByGroupResponseSchema: GenMessage<ListScoreScalesByGroupResponse>;
/**
 * @generated from message domain.operation.v1.GetCurrentPublishedScoreScaleRequest
 */
export type GetCurrentPublishedScoreScaleRequest = Message<"domain.operation.v1.GetCurrentPublishedScoreScaleRequest"> & {
    /**
     * @generated from field: string scale_group_id = 1;
     */
    scaleGroupId: string;
};
/**
 * Describes the message domain.operation.v1.GetCurrentPublishedScoreScaleRequest.
 * Use `create(GetCurrentPublishedScoreScaleRequestSchema)` to create a new message.
 */
export declare const GetCurrentPublishedScoreScaleRequestSchema: GenMessage<GetCurrentPublishedScoreScaleRequest>;
/**
 * @generated from message domain.operation.v1.GetCurrentPublishedScoreScaleResponse
 */
export type GetCurrentPublishedScoreScaleResponse = Message<"domain.operation.v1.GetCurrentPublishedScoreScaleResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ScoreScale score_scale = 1;
     */
    scoreScale?: ScoreScale;
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
 * Describes the message domain.operation.v1.GetCurrentPublishedScoreScaleResponse.
 * Use `create(GetCurrentPublishedScoreScaleResponseSchema)` to create a new message.
 */
export declare const GetCurrentPublishedScoreScaleResponseSchema: GenMessage<GetCurrentPublishedScoreScaleResponse>;
/**
 * @generated from service domain.operation.v1.ScoreScaleDomainService
 */
export declare const ScoreScaleDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.CreateScoreScale
     */
    createScoreScale: {
        methodKind: "unary";
        input: typeof CreateScoreScaleRequestSchema;
        output: typeof CreateScoreScaleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.ReadScoreScale
     */
    readScoreScale: {
        methodKind: "unary";
        input: typeof ReadScoreScaleRequestSchema;
        output: typeof ReadScoreScaleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.UpdateScoreScale
     */
    updateScoreScale: {
        methodKind: "unary";
        input: typeof UpdateScoreScaleRequestSchema;
        output: typeof UpdateScoreScaleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.DeleteScoreScale
     */
    deleteScoreScale: {
        methodKind: "unary";
        input: typeof DeleteScoreScaleRequestSchema;
        output: typeof DeleteScoreScaleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.ListScoreScales
     */
    listScoreScales: {
        methodKind: "unary";
        input: typeof ListScoreScalesRequestSchema;
        output: typeof ListScoreScalesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.GetScoreScaleListPageData
     */
    getScoreScaleListPageData: {
        methodKind: "unary";
        input: typeof GetScoreScaleListPageDataRequestSchema;
        output: typeof GetScoreScaleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.GetScoreScaleItemPageData
     */
    getScoreScaleItemPageData: {
        methodKind: "unary";
        input: typeof GetScoreScaleItemPageDataRequestSchema;
        output: typeof GetScoreScaleItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by group
     *
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.ListByGroup
     */
    listByGroup: {
        methodKind: "unary";
        input: typeof ListScoreScalesByGroupRequestSchema;
        output: typeof ListScoreScalesByGroupResponseSchema;
    };
    /**
     * Extra: get current published version for a group
     *
     * @generated from rpc domain.operation.v1.ScoreScaleDomainService.GetCurrentPublished
     */
    getCurrentPublished: {
        methodKind: "unary";
        input: typeof GetCurrentPublishedScoreScaleRequestSchema;
        output: typeof GetCurrentPublishedScoreScaleResponseSchema;
    };
}>;
