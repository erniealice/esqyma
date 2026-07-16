import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { RoundingMode, ScoringMethod, VersionStatus } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/scoring_scheme/scoring_scheme.proto.
 */
export declare const file_domain_operation_scoring_scheme_scoring_scheme: GenFile;
/**
 * @generated from message domain.operation.v1.ScoringScheme
 */
export type ScoringScheme = Message<"domain.operation.v1.ScoringScheme"> & {
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
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: string scheme_group_id = 8;
     */
    schemeGroupId: string;
    /**
     * @generated from field: int32 version = 9;
     */
    version: number;
    /**
     * @generated from field: domain.operation.v1.VersionStatus version_status = 10;
     */
    versionStatus: VersionStatus;
    /**
     * @generated from field: string name = 11;
     */
    name: string;
    /**
     * @generated from field: domain.operation.v1.ScoringMethod composite_method = 12;
     */
    compositeMethod: ScoringMethod;
    /**
     * @generated from field: optional string score_scale_id = 13;
     */
    scoreScaleId?: string;
    /**
     * @generated from field: bool weights_must_sum_to_one = 14;
     */
    weightsMustSumToOne: boolean;
    /**
     * @generated from field: optional domain.operation.v1.RoundingMode rounding_mode = 15;
     */
    roundingMode?: RoundingMode;
};
/**
 * Describes the message domain.operation.v1.ScoringScheme.
 * Use `create(ScoringSchemeSchema)` to create a new message.
 */
export declare const ScoringSchemeSchema: GenMessage<ScoringScheme>;
/**
 * @generated from message domain.operation.v1.CreateScoringSchemeRequest
 */
export type CreateScoringSchemeRequest = Message<"domain.operation.v1.CreateScoringSchemeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringScheme data = 1;
     */
    data?: ScoringScheme;
};
/**
 * Describes the message domain.operation.v1.CreateScoringSchemeRequest.
 * Use `create(CreateScoringSchemeRequestSchema)` to create a new message.
 */
export declare const CreateScoringSchemeRequestSchema: GenMessage<CreateScoringSchemeRequest>;
/**
 * @generated from message domain.operation.v1.CreateScoringSchemeResponse
 */
export type CreateScoringSchemeResponse = Message<"domain.operation.v1.CreateScoringSchemeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringScheme data = 1;
     */
    data: ScoringScheme[];
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
 * Describes the message domain.operation.v1.CreateScoringSchemeResponse.
 * Use `create(CreateScoringSchemeResponseSchema)` to create a new message.
 */
export declare const CreateScoringSchemeResponseSchema: GenMessage<CreateScoringSchemeResponse>;
/**
 * @generated from message domain.operation.v1.ReadScoringSchemeRequest
 */
export type ReadScoringSchemeRequest = Message<"domain.operation.v1.ReadScoringSchemeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringScheme data = 1;
     */
    data?: ScoringScheme;
};
/**
 * Describes the message domain.operation.v1.ReadScoringSchemeRequest.
 * Use `create(ReadScoringSchemeRequestSchema)` to create a new message.
 */
export declare const ReadScoringSchemeRequestSchema: GenMessage<ReadScoringSchemeRequest>;
/**
 * @generated from message domain.operation.v1.ReadScoringSchemeResponse
 */
export type ReadScoringSchemeResponse = Message<"domain.operation.v1.ReadScoringSchemeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringScheme data = 1;
     */
    data: ScoringScheme[];
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
 * Describes the message domain.operation.v1.ReadScoringSchemeResponse.
 * Use `create(ReadScoringSchemeResponseSchema)` to create a new message.
 */
export declare const ReadScoringSchemeResponseSchema: GenMessage<ReadScoringSchemeResponse>;
/**
 * @generated from message domain.operation.v1.UpdateScoringSchemeRequest
 */
export type UpdateScoringSchemeRequest = Message<"domain.operation.v1.UpdateScoringSchemeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringScheme data = 1;
     */
    data?: ScoringScheme;
};
/**
 * Describes the message domain.operation.v1.UpdateScoringSchemeRequest.
 * Use `create(UpdateScoringSchemeRequestSchema)` to create a new message.
 */
export declare const UpdateScoringSchemeRequestSchema: GenMessage<UpdateScoringSchemeRequest>;
/**
 * @generated from message domain.operation.v1.UpdateScoringSchemeResponse
 */
export type UpdateScoringSchemeResponse = Message<"domain.operation.v1.UpdateScoringSchemeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringScheme data = 1;
     */
    data: ScoringScheme[];
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
 * Describes the message domain.operation.v1.UpdateScoringSchemeResponse.
 * Use `create(UpdateScoringSchemeResponseSchema)` to create a new message.
 */
export declare const UpdateScoringSchemeResponseSchema: GenMessage<UpdateScoringSchemeResponse>;
/**
 * @generated from message domain.operation.v1.DeleteScoringSchemeRequest
 */
export type DeleteScoringSchemeRequest = Message<"domain.operation.v1.DeleteScoringSchemeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringScheme data = 1;
     */
    data?: ScoringScheme;
};
/**
 * Describes the message domain.operation.v1.DeleteScoringSchemeRequest.
 * Use `create(DeleteScoringSchemeRequestSchema)` to create a new message.
 */
export declare const DeleteScoringSchemeRequestSchema: GenMessage<DeleteScoringSchemeRequest>;
/**
 * @generated from message domain.operation.v1.DeleteScoringSchemeResponse
 */
export type DeleteScoringSchemeResponse = Message<"domain.operation.v1.DeleteScoringSchemeResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteScoringSchemeResponse.
 * Use `create(DeleteScoringSchemeResponseSchema)` to create a new message.
 */
export declare const DeleteScoringSchemeResponseSchema: GenMessage<DeleteScoringSchemeResponse>;
/**
 * @generated from message domain.operation.v1.ListScoringSchemesRequest
 */
export type ListScoringSchemesRequest = Message<"domain.operation.v1.ListScoringSchemesRequest"> & {
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
 * Describes the message domain.operation.v1.ListScoringSchemesRequest.
 * Use `create(ListScoringSchemesRequestSchema)` to create a new message.
 */
export declare const ListScoringSchemesRequestSchema: GenMessage<ListScoringSchemesRequest>;
/**
 * @generated from message domain.operation.v1.ListScoringSchemesResponse
 */
export type ListScoringSchemesResponse = Message<"domain.operation.v1.ListScoringSchemesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringScheme data = 1;
     */
    data: ScoringScheme[];
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
 * Describes the message domain.operation.v1.ListScoringSchemesResponse.
 * Use `create(ListScoringSchemesResponseSchema)` to create a new message.
 */
export declare const ListScoringSchemesResponseSchema: GenMessage<ListScoringSchemesResponse>;
/**
 * @generated from message domain.operation.v1.GetScoringSchemeListPageDataRequest
 */
export type GetScoringSchemeListPageDataRequest = Message<"domain.operation.v1.GetScoringSchemeListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetScoringSchemeListPageDataRequest.
 * Use `create(GetScoringSchemeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoringSchemeListPageDataRequestSchema: GenMessage<GetScoringSchemeListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoringSchemeListPageDataResponse
 */
export type GetScoringSchemeListPageDataResponse = Message<"domain.operation.v1.GetScoringSchemeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringScheme scoring_scheme_list = 1;
     */
    scoringSchemeList: ScoringScheme[];
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
 * Describes the message domain.operation.v1.GetScoringSchemeListPageDataResponse.
 * Use `create(GetScoringSchemeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoringSchemeListPageDataResponseSchema: GenMessage<GetScoringSchemeListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetScoringSchemeItemPageDataRequest
 */
export type GetScoringSchemeItemPageDataRequest = Message<"domain.operation.v1.GetScoringSchemeItemPageDataRequest"> & {
    /**
     * @generated from field: string scoring_scheme_id = 1;
     */
    scoringSchemeId: string;
};
/**
 * Describes the message domain.operation.v1.GetScoringSchemeItemPageDataRequest.
 * Use `create(GetScoringSchemeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoringSchemeItemPageDataRequestSchema: GenMessage<GetScoringSchemeItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoringSchemeItemPageDataResponse
 */
export type GetScoringSchemeItemPageDataResponse = Message<"domain.operation.v1.GetScoringSchemeItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ScoringScheme scoring_scheme = 1;
     */
    scoringScheme?: ScoringScheme;
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
 * Describes the message domain.operation.v1.GetScoringSchemeItemPageDataResponse.
 * Use `create(GetScoringSchemeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoringSchemeItemPageDataResponseSchema: GenMessage<GetScoringSchemeItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ScoringSchemeDomainService
 */
export declare const ScoringSchemeDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.CreateScoringScheme
     */
    createScoringScheme: {
        methodKind: "unary";
        input: typeof CreateScoringSchemeRequestSchema;
        output: typeof CreateScoringSchemeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.ReadScoringScheme
     */
    readScoringScheme: {
        methodKind: "unary";
        input: typeof ReadScoringSchemeRequestSchema;
        output: typeof ReadScoringSchemeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.UpdateScoringScheme
     */
    updateScoringScheme: {
        methodKind: "unary";
        input: typeof UpdateScoringSchemeRequestSchema;
        output: typeof UpdateScoringSchemeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.DeleteScoringScheme
     */
    deleteScoringScheme: {
        methodKind: "unary";
        input: typeof DeleteScoringSchemeRequestSchema;
        output: typeof DeleteScoringSchemeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.ListScoringSchemes
     */
    listScoringSchemes: {
        methodKind: "unary";
        input: typeof ListScoringSchemesRequestSchema;
        output: typeof ListScoringSchemesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.GetScoringSchemeListPageData
     */
    getScoringSchemeListPageData: {
        methodKind: "unary";
        input: typeof GetScoringSchemeListPageDataRequestSchema;
        output: typeof GetScoringSchemeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringSchemeDomainService.GetScoringSchemeItemPageData
     */
    getScoringSchemeItemPageData: {
        methodKind: "unary";
        input: typeof GetScoringSchemeItemPageDataRequestSchema;
        output: typeof GetScoringSchemeItemPageDataResponseSchema;
    };
}>;
