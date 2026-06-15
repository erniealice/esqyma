import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { CriteriaType } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/evaluation_response/evaluation_response.proto.
 */
export declare const file_domain_operation_evaluation_response_evaluation_response: GenFile;
/**
 * =============================================================================
 * Performance Evaluation §E3 — evaluation_response (child of evaluation;
 * CASCADE on evaluation_id). One row per answered rubric dimension. The rubric
 * label/weight/version/TYPE are SNAPSHOTTED from the linked OutcomeCriteria at
 * submit (Q-EVAL-SNAPSHOT-1); the typed answer is a one-of pinned by the
 * snapshotted criteria_type (one-of CHECK at the DB layer).
 * =============================================================================
 *
 * @generated from message domain.operation.v1.EvaluationResponse
 */
export type EvaluationResponse = Message<"domain.operation.v1.EvaluationResponse"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string evaluation_id = 2;
     */
    evaluationId: string;
    /**
     * COPIED from the parent evaluation at create; adapter validates it equals the parent's.
     *
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
    /**
     * @generated from field: string outcome_criteria_id = 4;
     */
    outcomeCriteriaId: string;
    /**
     * Snapshot columns (copied from OutcomeCriteria at submit).
     *
     * version pin
     *
     * @generated from field: optional string criteria_version_id = 5;
     */
    criteriaVersionId?: string;
    /**
     * SNAPSHOT
     *
     * @generated from field: string criteria_label = 6;
     */
    criteriaLabel: string;
    /**
     * SNAPSHOT — score computed from this, NOT the live rubric
     *
     * @generated from field: optional double criteria_weight = 7;
     */
    criteriaWeight?: number;
    /**
     * SNAPSHOT — pins which answer column may be set (one-of CHECK)
     *
     * @generated from field: domain.operation.v1.CriteriaType criteria_type = 8;
     */
    criteriaType: CriteriaType;
    /**
     * Typed answer one-of (exactly one set, matching the snapshotted criteria_type).
     *
     * @generated from field: optional double numeric_value = 9;
     */
    numericValue?: number;
    /**
     * @generated from field: optional string text_value = 10;
     */
    textValue?: string;
    /**
     * @generated from field: optional string categorical_value = 11;
     */
    categoricalValue?: string;
    /**
     * @generated from field: optional bool pass_fail_value = 12;
     */
    passFailValue?: boolean;
    /**
     * @generated from field: optional string comment = 13;
     */
    comment?: string;
    /**
     * @generated from field: int32 sequence_order = 14;
     */
    sequenceOrder: number;
    /**
     * @generated from field: bool active = 15;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.operation.v1.EvaluationResponse.
 * Use `create(EvaluationResponseSchema)` to create a new message.
 */
export declare const EvaluationResponseSchema: GenMessage<EvaluationResponse>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationResponseRequest
 */
export type CreateEvaluationResponseRequest = Message<"domain.operation.v1.CreateEvaluationResponseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationResponse data = 1;
     */
    data?: EvaluationResponse;
};
/**
 * Describes the message domain.operation.v1.CreateEvaluationResponseRequest.
 * Use `create(CreateEvaluationResponseRequestSchema)` to create a new message.
 */
export declare const CreateEvaluationResponseRequestSchema: GenMessage<CreateEvaluationResponseRequest>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationResponseResponse
 */
export type CreateEvaluationResponseResponse = Message<"domain.operation.v1.CreateEvaluationResponseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationResponse data = 1;
     */
    data: EvaluationResponse[];
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
 * Describes the message domain.operation.v1.CreateEvaluationResponseResponse.
 * Use `create(CreateEvaluationResponseResponseSchema)` to create a new message.
 */
export declare const CreateEvaluationResponseResponseSchema: GenMessage<CreateEvaluationResponseResponse>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationResponseRequest
 */
export type ReadEvaluationResponseRequest = Message<"domain.operation.v1.ReadEvaluationResponseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationResponse data = 1;
     */
    data?: EvaluationResponse;
};
/**
 * Describes the message domain.operation.v1.ReadEvaluationResponseRequest.
 * Use `create(ReadEvaluationResponseRequestSchema)` to create a new message.
 */
export declare const ReadEvaluationResponseRequestSchema: GenMessage<ReadEvaluationResponseRequest>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationResponseResponse
 */
export type ReadEvaluationResponseResponse = Message<"domain.operation.v1.ReadEvaluationResponseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationResponse data = 1;
     */
    data: EvaluationResponse[];
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
 * Describes the message domain.operation.v1.ReadEvaluationResponseResponse.
 * Use `create(ReadEvaluationResponseResponseSchema)` to create a new message.
 */
export declare const ReadEvaluationResponseResponseSchema: GenMessage<ReadEvaluationResponseResponse>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationResponseRequest
 */
export type UpdateEvaluationResponseRequest = Message<"domain.operation.v1.UpdateEvaluationResponseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationResponse data = 1;
     */
    data?: EvaluationResponse;
};
/**
 * Describes the message domain.operation.v1.UpdateEvaluationResponseRequest.
 * Use `create(UpdateEvaluationResponseRequestSchema)` to create a new message.
 */
export declare const UpdateEvaluationResponseRequestSchema: GenMessage<UpdateEvaluationResponseRequest>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationResponseResponse
 */
export type UpdateEvaluationResponseResponse = Message<"domain.operation.v1.UpdateEvaluationResponseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationResponse data = 1;
     */
    data: EvaluationResponse[];
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
 * Describes the message domain.operation.v1.UpdateEvaluationResponseResponse.
 * Use `create(UpdateEvaluationResponseResponseSchema)` to create a new message.
 */
export declare const UpdateEvaluationResponseResponseSchema: GenMessage<UpdateEvaluationResponseResponse>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationResponseRequest
 */
export type DeleteEvaluationResponseRequest = Message<"domain.operation.v1.DeleteEvaluationResponseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationResponse data = 1;
     */
    data?: EvaluationResponse;
};
/**
 * Describes the message domain.operation.v1.DeleteEvaluationResponseRequest.
 * Use `create(DeleteEvaluationResponseRequestSchema)` to create a new message.
 */
export declare const DeleteEvaluationResponseRequestSchema: GenMessage<DeleteEvaluationResponseRequest>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationResponseResponse
 */
export type DeleteEvaluationResponseResponse = Message<"domain.operation.v1.DeleteEvaluationResponseResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteEvaluationResponseResponse.
 * Use `create(DeleteEvaluationResponseResponseSchema)` to create a new message.
 */
export declare const DeleteEvaluationResponseResponseSchema: GenMessage<DeleteEvaluationResponseResponse>;
/**
 * @generated from message domain.operation.v1.ListEvaluationResponsesRequest
 */
export type ListEvaluationResponsesRequest = Message<"domain.operation.v1.ListEvaluationResponsesRequest"> & {
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
 * Describes the message domain.operation.v1.ListEvaluationResponsesRequest.
 * Use `create(ListEvaluationResponsesRequestSchema)` to create a new message.
 */
export declare const ListEvaluationResponsesRequestSchema: GenMessage<ListEvaluationResponsesRequest>;
/**
 * @generated from message domain.operation.v1.ListEvaluationResponsesResponse
 */
export type ListEvaluationResponsesResponse = Message<"domain.operation.v1.ListEvaluationResponsesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationResponse data = 1;
     */
    data: EvaluationResponse[];
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
 * Describes the message domain.operation.v1.ListEvaluationResponsesResponse.
 * Use `create(ListEvaluationResponsesResponseSchema)` to create a new message.
 */
export declare const ListEvaluationResponsesResponseSchema: GenMessage<ListEvaluationResponsesResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationResponseListPageDataRequest
 */
export type GetEvaluationResponseListPageDataRequest = Message<"domain.operation.v1.GetEvaluationResponseListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetEvaluationResponseListPageDataRequest.
 * Use `create(GetEvaluationResponseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationResponseListPageDataRequestSchema: GenMessage<GetEvaluationResponseListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationResponseListPageDataResponse
 */
export type GetEvaluationResponseListPageDataResponse = Message<"domain.operation.v1.GetEvaluationResponseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationResponse evaluation_response_list = 1;
     */
    evaluationResponseList: EvaluationResponse[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.operation.v1.GetEvaluationResponseListPageDataResponse.
 * Use `create(GetEvaluationResponseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationResponseListPageDataResponseSchema: GenMessage<GetEvaluationResponseListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationResponseItemPageDataRequest
 */
export type GetEvaluationResponseItemPageDataRequest = Message<"domain.operation.v1.GetEvaluationResponseItemPageDataRequest"> & {
    /**
     * @generated from field: string evaluation_response_id = 1;
     */
    evaluationResponseId: string;
};
/**
 * Describes the message domain.operation.v1.GetEvaluationResponseItemPageDataRequest.
 * Use `create(GetEvaluationResponseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationResponseItemPageDataRequestSchema: GenMessage<GetEvaluationResponseItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationResponseItemPageDataResponse
 */
export type GetEvaluationResponseItemPageDataResponse = Message<"domain.operation.v1.GetEvaluationResponseItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationResponse evaluation_response = 1;
     */
    evaluationResponse?: EvaluationResponse;
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
 * Describes the message domain.operation.v1.GetEvaluationResponseItemPageDataResponse.
 * Use `create(GetEvaluationResponseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationResponseItemPageDataResponseSchema: GenMessage<GetEvaluationResponseItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.EvaluationResponseDomainService
 */
export declare const EvaluationResponseDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.CreateEvaluationResponse
     */
    createEvaluationResponse: {
        methodKind: "unary";
        input: typeof CreateEvaluationResponseRequestSchema;
        output: typeof CreateEvaluationResponseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.ReadEvaluationResponse
     */
    readEvaluationResponse: {
        methodKind: "unary";
        input: typeof ReadEvaluationResponseRequestSchema;
        output: typeof ReadEvaluationResponseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.UpdateEvaluationResponse
     */
    updateEvaluationResponse: {
        methodKind: "unary";
        input: typeof UpdateEvaluationResponseRequestSchema;
        output: typeof UpdateEvaluationResponseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.DeleteEvaluationResponse
     */
    deleteEvaluationResponse: {
        methodKind: "unary";
        input: typeof DeleteEvaluationResponseRequestSchema;
        output: typeof DeleteEvaluationResponseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.ListEvaluationResponses
     */
    listEvaluationResponses: {
        methodKind: "unary";
        input: typeof ListEvaluationResponsesRequestSchema;
        output: typeof ListEvaluationResponsesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.GetEvaluationResponseListPageData
     */
    getEvaluationResponseListPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationResponseListPageDataRequestSchema;
        output: typeof GetEvaluationResponseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationResponseDomainService.GetEvaluationResponseItemPageData
     */
    getEvaluationResponseItemPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationResponseItemPageDataRequestSchema;
        output: typeof GetEvaluationResponseItemPageDataResponseSchema;
    };
}>;
