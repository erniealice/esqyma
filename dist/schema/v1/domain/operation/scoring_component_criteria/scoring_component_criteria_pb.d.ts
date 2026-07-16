import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/scoring_component_criteria/scoring_component_criteria.proto.
 */
export declare const file_domain_operation_scoring_component_criteria_scoring_component_criteria: GenFile;
/**
 * @generated from message domain.operation.v1.ScoringComponentCriteria
 */
export type ScoringComponentCriteria = Message<"domain.operation.v1.ScoringComponentCriteria"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string scoring_scheme_id = 2;
     */
    scoringSchemeId: string;
    /**
     * @generated from field: string scoring_component_id = 3;
     */
    scoringComponentId: string;
    /**
     * @generated from field: string outcome_criteria_id = 4;
     */
    outcomeCriteriaId: string;
    /**
     * @generated from field: optional int64 date_created = 5;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 6;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 7;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 8;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 10;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.operation.v1.ScoringComponentCriteria.
 * Use `create(ScoringComponentCriteriaSchema)` to create a new message.
 */
export declare const ScoringComponentCriteriaSchema: GenMessage<ScoringComponentCriteria>;
/**
 * @generated from message domain.operation.v1.CreateScoringComponentCriteriaRequest
 */
export type CreateScoringComponentCriteriaRequest = Message<"domain.operation.v1.CreateScoringComponentCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data?: ScoringComponentCriteria;
};
/**
 * Describes the message domain.operation.v1.CreateScoringComponentCriteriaRequest.
 * Use `create(CreateScoringComponentCriteriaRequestSchema)` to create a new message.
 */
export declare const CreateScoringComponentCriteriaRequestSchema: GenMessage<CreateScoringComponentCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.CreateScoringComponentCriteriaResponse
 */
export type CreateScoringComponentCriteriaResponse = Message<"domain.operation.v1.CreateScoringComponentCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data: ScoringComponentCriteria[];
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
 * Describes the message domain.operation.v1.CreateScoringComponentCriteriaResponse.
 * Use `create(CreateScoringComponentCriteriaResponseSchema)` to create a new message.
 */
export declare const CreateScoringComponentCriteriaResponseSchema: GenMessage<CreateScoringComponentCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ReadScoringComponentCriteriaRequest
 */
export type ReadScoringComponentCriteriaRequest = Message<"domain.operation.v1.ReadScoringComponentCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data?: ScoringComponentCriteria;
};
/**
 * Describes the message domain.operation.v1.ReadScoringComponentCriteriaRequest.
 * Use `create(ReadScoringComponentCriteriaRequestSchema)` to create a new message.
 */
export declare const ReadScoringComponentCriteriaRequestSchema: GenMessage<ReadScoringComponentCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.ReadScoringComponentCriteriaResponse
 */
export type ReadScoringComponentCriteriaResponse = Message<"domain.operation.v1.ReadScoringComponentCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data: ScoringComponentCriteria[];
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
 * Describes the message domain.operation.v1.ReadScoringComponentCriteriaResponse.
 * Use `create(ReadScoringComponentCriteriaResponseSchema)` to create a new message.
 */
export declare const ReadScoringComponentCriteriaResponseSchema: GenMessage<ReadScoringComponentCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.UpdateScoringComponentCriteriaRequest
 */
export type UpdateScoringComponentCriteriaRequest = Message<"domain.operation.v1.UpdateScoringComponentCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data?: ScoringComponentCriteria;
};
/**
 * Describes the message domain.operation.v1.UpdateScoringComponentCriteriaRequest.
 * Use `create(UpdateScoringComponentCriteriaRequestSchema)` to create a new message.
 */
export declare const UpdateScoringComponentCriteriaRequestSchema: GenMessage<UpdateScoringComponentCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.UpdateScoringComponentCriteriaResponse
 */
export type UpdateScoringComponentCriteriaResponse = Message<"domain.operation.v1.UpdateScoringComponentCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data: ScoringComponentCriteria[];
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
 * Describes the message domain.operation.v1.UpdateScoringComponentCriteriaResponse.
 * Use `create(UpdateScoringComponentCriteriaResponseSchema)` to create a new message.
 */
export declare const UpdateScoringComponentCriteriaResponseSchema: GenMessage<UpdateScoringComponentCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.DeleteScoringComponentCriteriaRequest
 */
export type DeleteScoringComponentCriteriaRequest = Message<"domain.operation.v1.DeleteScoringComponentCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data?: ScoringComponentCriteria;
};
/**
 * Describes the message domain.operation.v1.DeleteScoringComponentCriteriaRequest.
 * Use `create(DeleteScoringComponentCriteriaRequestSchema)` to create a new message.
 */
export declare const DeleteScoringComponentCriteriaRequestSchema: GenMessage<DeleteScoringComponentCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.DeleteScoringComponentCriteriaResponse
 */
export type DeleteScoringComponentCriteriaResponse = Message<"domain.operation.v1.DeleteScoringComponentCriteriaResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteScoringComponentCriteriaResponse.
 * Use `create(DeleteScoringComponentCriteriaResponseSchema)` to create a new message.
 */
export declare const DeleteScoringComponentCriteriaResponseSchema: GenMessage<DeleteScoringComponentCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ListScoringComponentCriteriasRequest
 */
export type ListScoringComponentCriteriasRequest = Message<"domain.operation.v1.ListScoringComponentCriteriasRequest"> & {
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
 * Describes the message domain.operation.v1.ListScoringComponentCriteriasRequest.
 * Use `create(ListScoringComponentCriteriasRequestSchema)` to create a new message.
 */
export declare const ListScoringComponentCriteriasRequestSchema: GenMessage<ListScoringComponentCriteriasRequest>;
/**
 * @generated from message domain.operation.v1.ListScoringComponentCriteriasResponse
 */
export type ListScoringComponentCriteriasResponse = Message<"domain.operation.v1.ListScoringComponentCriteriasResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponentCriteria data = 1;
     */
    data: ScoringComponentCriteria[];
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
 * Describes the message domain.operation.v1.ListScoringComponentCriteriasResponse.
 * Use `create(ListScoringComponentCriteriasResponseSchema)` to create a new message.
 */
export declare const ListScoringComponentCriteriasResponseSchema: GenMessage<ListScoringComponentCriteriasResponse>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentCriteriaListPageDataRequest
 */
export type GetScoringComponentCriteriaListPageDataRequest = Message<"domain.operation.v1.GetScoringComponentCriteriaListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetScoringComponentCriteriaListPageDataRequest.
 * Use `create(GetScoringComponentCriteriaListPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoringComponentCriteriaListPageDataRequestSchema: GenMessage<GetScoringComponentCriteriaListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentCriteriaListPageDataResponse
 */
export type GetScoringComponentCriteriaListPageDataResponse = Message<"domain.operation.v1.GetScoringComponentCriteriaListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponentCriteria scoring_component_criteria_list = 1;
     */
    scoringComponentCriteriaList: ScoringComponentCriteria[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.operation.v1.GetScoringComponentCriteriaListPageDataResponse.
 * Use `create(GetScoringComponentCriteriaListPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoringComponentCriteriaListPageDataResponseSchema: GenMessage<GetScoringComponentCriteriaListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentCriteriaItemPageDataRequest
 */
export type GetScoringComponentCriteriaItemPageDataRequest = Message<"domain.operation.v1.GetScoringComponentCriteriaItemPageDataRequest"> & {
    /**
     * @generated from field: string scoring_component_criteria_id = 1;
     */
    scoringComponentCriteriaId: string;
};
/**
 * Describes the message domain.operation.v1.GetScoringComponentCriteriaItemPageDataRequest.
 * Use `create(GetScoringComponentCriteriaItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoringComponentCriteriaItemPageDataRequestSchema: GenMessage<GetScoringComponentCriteriaItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentCriteriaItemPageDataResponse
 */
export type GetScoringComponentCriteriaItemPageDataResponse = Message<"domain.operation.v1.GetScoringComponentCriteriaItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponentCriteria scoring_component_criteria = 1;
     */
    scoringComponentCriteria?: ScoringComponentCriteria;
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
 * Describes the message domain.operation.v1.GetScoringComponentCriteriaItemPageDataResponse.
 * Use `create(GetScoringComponentCriteriaItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoringComponentCriteriaItemPageDataResponseSchema: GenMessage<GetScoringComponentCriteriaItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ScoringComponentCriteriaDomainService
 */
export declare const ScoringComponentCriteriaDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.CreateScoringComponentCriteria
     */
    createScoringComponentCriteria: {
        methodKind: "unary";
        input: typeof CreateScoringComponentCriteriaRequestSchema;
        output: typeof CreateScoringComponentCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.ReadScoringComponentCriteria
     */
    readScoringComponentCriteria: {
        methodKind: "unary";
        input: typeof ReadScoringComponentCriteriaRequestSchema;
        output: typeof ReadScoringComponentCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.UpdateScoringComponentCriteria
     */
    updateScoringComponentCriteria: {
        methodKind: "unary";
        input: typeof UpdateScoringComponentCriteriaRequestSchema;
        output: typeof UpdateScoringComponentCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.DeleteScoringComponentCriteria
     */
    deleteScoringComponentCriteria: {
        methodKind: "unary";
        input: typeof DeleteScoringComponentCriteriaRequestSchema;
        output: typeof DeleteScoringComponentCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.ListScoringComponentCriterias
     */
    listScoringComponentCriterias: {
        methodKind: "unary";
        input: typeof ListScoringComponentCriteriasRequestSchema;
        output: typeof ListScoringComponentCriteriasResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.GetScoringComponentCriteriaListPageData
     */
    getScoringComponentCriteriaListPageData: {
        methodKind: "unary";
        input: typeof GetScoringComponentCriteriaListPageDataRequestSchema;
        output: typeof GetScoringComponentCriteriaListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentCriteriaDomainService.GetScoringComponentCriteriaItemPageData
     */
    getScoringComponentCriteriaItemPageData: {
        methodKind: "unary";
        input: typeof GetScoringComponentCriteriaItemPageDataRequestSchema;
        output: typeof GetScoringComponentCriteriaItemPageDataResponseSchema;
    };
}>;
