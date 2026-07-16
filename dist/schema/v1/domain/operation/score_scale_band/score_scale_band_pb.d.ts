import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Determination } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/score_scale_band/score_scale_band.proto.
 */
export declare const file_domain_operation_score_scale_band_score_scale_band: GenFile;
/**
 * @generated from message domain.operation.v1.ScoreScaleBand
 */
export type ScoreScaleBand = Message<"domain.operation.v1.ScoreScaleBand"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional string workspace_id = 2;
     */
    workspaceId?: string;
    /**
     * @generated from field: bool active = 3;
     */
    active: boolean;
    /**
     * @generated from field: string score_scale_id = 4;
     */
    scoreScaleId: string;
    /**
     * @generated from field: int32 sequence_order = 5;
     */
    sequenceOrder: number;
    /**
     * @generated from field: optional double input_min = 6;
     */
    inputMin?: number;
    /**
     * @generated from field: optional double input_max = 7;
     */
    inputMax?: number;
    /**
     * @generated from field: optional string input_match = 8;
     */
    inputMatch?: string;
    /**
     * @generated from field: optional double output_value = 9;
     */
    outputValue?: number;
    /**
     * @generated from field: string output_label = 10;
     */
    outputLabel: string;
    /**
     * @generated from field: optional string band_role = 11;
     */
    bandRole?: string;
    /**
     * @generated from field: optional domain.operation.v1.Determination determination = 12;
     */
    determination?: Determination;
    /**
     * @generated from field: optional int64 date_created = 13;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 14;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 15;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 16;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.ScoreScaleBand.
 * Use `create(ScoreScaleBandSchema)` to create a new message.
 */
export declare const ScoreScaleBandSchema: GenMessage<ScoreScaleBand>;
/**
 * @generated from message domain.operation.v1.CreateScoreScaleBandRequest
 */
export type CreateScoreScaleBandRequest = Message<"domain.operation.v1.CreateScoreScaleBandRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScaleBand data = 1;
     */
    data?: ScoreScaleBand;
};
/**
 * Describes the message domain.operation.v1.CreateScoreScaleBandRequest.
 * Use `create(CreateScoreScaleBandRequestSchema)` to create a new message.
 */
export declare const CreateScoreScaleBandRequestSchema: GenMessage<CreateScoreScaleBandRequest>;
/**
 * @generated from message domain.operation.v1.CreateScoreScaleBandResponse
 */
export type CreateScoreScaleBandResponse = Message<"domain.operation.v1.CreateScoreScaleBandResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScaleBand data = 1;
     */
    data: ScoreScaleBand[];
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
 * Describes the message domain.operation.v1.CreateScoreScaleBandResponse.
 * Use `create(CreateScoreScaleBandResponseSchema)` to create a new message.
 */
export declare const CreateScoreScaleBandResponseSchema: GenMessage<CreateScoreScaleBandResponse>;
/**
 * @generated from message domain.operation.v1.ReadScoreScaleBandRequest
 */
export type ReadScoreScaleBandRequest = Message<"domain.operation.v1.ReadScoreScaleBandRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScaleBand data = 1;
     */
    data?: ScoreScaleBand;
};
/**
 * Describes the message domain.operation.v1.ReadScoreScaleBandRequest.
 * Use `create(ReadScoreScaleBandRequestSchema)` to create a new message.
 */
export declare const ReadScoreScaleBandRequestSchema: GenMessage<ReadScoreScaleBandRequest>;
/**
 * @generated from message domain.operation.v1.ReadScoreScaleBandResponse
 */
export type ReadScoreScaleBandResponse = Message<"domain.operation.v1.ReadScoreScaleBandResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScaleBand data = 1;
     */
    data: ScoreScaleBand[];
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
 * Describes the message domain.operation.v1.ReadScoreScaleBandResponse.
 * Use `create(ReadScoreScaleBandResponseSchema)` to create a new message.
 */
export declare const ReadScoreScaleBandResponseSchema: GenMessage<ReadScoreScaleBandResponse>;
/**
 * @generated from message domain.operation.v1.UpdateScoreScaleBandRequest
 */
export type UpdateScoreScaleBandRequest = Message<"domain.operation.v1.UpdateScoreScaleBandRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScaleBand data = 1;
     */
    data?: ScoreScaleBand;
};
/**
 * Describes the message domain.operation.v1.UpdateScoreScaleBandRequest.
 * Use `create(UpdateScoreScaleBandRequestSchema)` to create a new message.
 */
export declare const UpdateScoreScaleBandRequestSchema: GenMessage<UpdateScoreScaleBandRequest>;
/**
 * @generated from message domain.operation.v1.UpdateScoreScaleBandResponse
 */
export type UpdateScoreScaleBandResponse = Message<"domain.operation.v1.UpdateScoreScaleBandResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScaleBand data = 1;
     */
    data: ScoreScaleBand[];
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
 * Describes the message domain.operation.v1.UpdateScoreScaleBandResponse.
 * Use `create(UpdateScoreScaleBandResponseSchema)` to create a new message.
 */
export declare const UpdateScoreScaleBandResponseSchema: GenMessage<UpdateScoreScaleBandResponse>;
/**
 * @generated from message domain.operation.v1.DeleteScoreScaleBandRequest
 */
export type DeleteScoreScaleBandRequest = Message<"domain.operation.v1.DeleteScoreScaleBandRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoreScaleBand data = 1;
     */
    data?: ScoreScaleBand;
};
/**
 * Describes the message domain.operation.v1.DeleteScoreScaleBandRequest.
 * Use `create(DeleteScoreScaleBandRequestSchema)` to create a new message.
 */
export declare const DeleteScoreScaleBandRequestSchema: GenMessage<DeleteScoreScaleBandRequest>;
/**
 * @generated from message domain.operation.v1.DeleteScoreScaleBandResponse
 */
export type DeleteScoreScaleBandResponse = Message<"domain.operation.v1.DeleteScoreScaleBandResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteScoreScaleBandResponse.
 * Use `create(DeleteScoreScaleBandResponseSchema)` to create a new message.
 */
export declare const DeleteScoreScaleBandResponseSchema: GenMessage<DeleteScoreScaleBandResponse>;
/**
 * @generated from message domain.operation.v1.ListScoreScaleBandsRequest
 */
export type ListScoreScaleBandsRequest = Message<"domain.operation.v1.ListScoreScaleBandsRequest"> & {
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
 * Describes the message domain.operation.v1.ListScoreScaleBandsRequest.
 * Use `create(ListScoreScaleBandsRequestSchema)` to create a new message.
 */
export declare const ListScoreScaleBandsRequestSchema: GenMessage<ListScoreScaleBandsRequest>;
/**
 * @generated from message domain.operation.v1.ListScoreScaleBandsResponse
 */
export type ListScoreScaleBandsResponse = Message<"domain.operation.v1.ListScoreScaleBandsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScaleBand data = 1;
     */
    data: ScoreScaleBand[];
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
 * Describes the message domain.operation.v1.ListScoreScaleBandsResponse.
 * Use `create(ListScoreScaleBandsResponseSchema)` to create a new message.
 */
export declare const ListScoreScaleBandsResponseSchema: GenMessage<ListScoreScaleBandsResponse>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleBandListPageDataRequest
 */
export type GetScoreScaleBandListPageDataRequest = Message<"domain.operation.v1.GetScoreScaleBandListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetScoreScaleBandListPageDataRequest.
 * Use `create(GetScoreScaleBandListPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoreScaleBandListPageDataRequestSchema: GenMessage<GetScoreScaleBandListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleBandListPageDataResponse
 */
export type GetScoreScaleBandListPageDataResponse = Message<"domain.operation.v1.GetScoreScaleBandListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoreScaleBand score_scale_band_list = 1;
     */
    scoreScaleBandList: ScoreScaleBand[];
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
 * Describes the message domain.operation.v1.GetScoreScaleBandListPageDataResponse.
 * Use `create(GetScoreScaleBandListPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoreScaleBandListPageDataResponseSchema: GenMessage<GetScoreScaleBandListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleBandItemPageDataRequest
 */
export type GetScoreScaleBandItemPageDataRequest = Message<"domain.operation.v1.GetScoreScaleBandItemPageDataRequest"> & {
    /**
     * @generated from field: string score_scale_band_id = 1;
     */
    scoreScaleBandId: string;
};
/**
 * Describes the message domain.operation.v1.GetScoreScaleBandItemPageDataRequest.
 * Use `create(GetScoreScaleBandItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoreScaleBandItemPageDataRequestSchema: GenMessage<GetScoreScaleBandItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoreScaleBandItemPageDataResponse
 */
export type GetScoreScaleBandItemPageDataResponse = Message<"domain.operation.v1.GetScoreScaleBandItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ScoreScaleBand score_scale_band = 1;
     */
    scoreScaleBand?: ScoreScaleBand;
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
 * Describes the message domain.operation.v1.GetScoreScaleBandItemPageDataResponse.
 * Use `create(GetScoreScaleBandItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoreScaleBandItemPageDataResponseSchema: GenMessage<GetScoreScaleBandItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ScoreScaleBandDomainService
 */
export declare const ScoreScaleBandDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.CreateScoreScaleBand
     */
    createScoreScaleBand: {
        methodKind: "unary";
        input: typeof CreateScoreScaleBandRequestSchema;
        output: typeof CreateScoreScaleBandResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.ReadScoreScaleBand
     */
    readScoreScaleBand: {
        methodKind: "unary";
        input: typeof ReadScoreScaleBandRequestSchema;
        output: typeof ReadScoreScaleBandResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.UpdateScoreScaleBand
     */
    updateScoreScaleBand: {
        methodKind: "unary";
        input: typeof UpdateScoreScaleBandRequestSchema;
        output: typeof UpdateScoreScaleBandResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.DeleteScoreScaleBand
     */
    deleteScoreScaleBand: {
        methodKind: "unary";
        input: typeof DeleteScoreScaleBandRequestSchema;
        output: typeof DeleteScoreScaleBandResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.ListScoreScaleBands
     */
    listScoreScaleBands: {
        methodKind: "unary";
        input: typeof ListScoreScaleBandsRequestSchema;
        output: typeof ListScoreScaleBandsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.GetScoreScaleBandListPageData
     */
    getScoreScaleBandListPageData: {
        methodKind: "unary";
        input: typeof GetScoreScaleBandListPageDataRequestSchema;
        output: typeof GetScoreScaleBandListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoreScaleBandDomainService.GetScoreScaleBandItemPageData
     */
    getScoreScaleBandItemPageData: {
        methodKind: "unary";
        input: typeof GetScoreScaleBandItemPageDataRequestSchema;
        output: typeof GetScoreScaleBandItemPageDataResponseSchema;
    };
}>;
