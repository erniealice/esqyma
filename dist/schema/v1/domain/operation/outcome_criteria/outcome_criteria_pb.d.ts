import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { AggregationMethod, CriteriaScope, CriteriaType, DeterminationMode, PassRule, VersionStatus } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/outcome_criteria/outcome_criteria.proto.
 */
export declare const file_domain_operation_outcome_criteria_outcome_criteria: GenFile;
/**
 * @generated from message domain.operation.v1.OutcomeCriteria
 */
export type OutcomeCriteria = Message<"domain.operation.v1.OutcomeCriteria"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string criteria_group_id = 2;
     */
    criteriaGroupId: string;
    /**
     * @generated from field: int32 version = 3;
     */
    version: number;
    /**
     * @generated from field: domain.operation.v1.VersionStatus version_status = 4;
     */
    versionStatus: VersionStatus;
    /**
     * @generated from field: optional string supersedes_id = 5;
     */
    supersedesId?: string;
    /**
     * @generated from field: domain.operation.v1.CriteriaScope scope = 6;
     */
    scope: CriteriaScope;
    /**
     * @generated from field: optional string industry_code = 7;
     */
    industryCode?: string;
    /**
     * @generated from field: optional string workspace_id = 8;
     */
    workspaceId?: string;
    /**
     * @generated from field: optional string overrides_id = 9;
     */
    overridesId?: string;
    /**
     * @generated from field: string name = 10;
     */
    name: string;
    /**
     * @generated from field: optional string description = 11;
     */
    description?: string;
    /**
     * @generated from field: domain.operation.v1.CriteriaType criteria_type = 12;
     */
    criteriaType: CriteriaType;
    /**
     * @generated from field: optional string unit = 13;
     */
    unit?: string;
    /**
     * @generated from field: optional int32 decimal_places = 14;
     */
    decimalPlaces?: number;
    /**
     * @generated from field: optional int32 min_score = 15;
     */
    minScore?: number;
    /**
     * @generated from field: optional int32 max_score = 16;
     */
    maxScore?: number;
    /**
     * @generated from field: optional double score_increment = 17;
     */
    scoreIncrement?: number;
    /**
     * @generated from field: optional string pass_label = 18;
     */
    passLabel?: string;
    /**
     * @generated from field: optional string fail_label = 19;
     */
    failLabel?: string;
    /**
     * @generated from field: optional int32 max_text_length = 20;
     */
    maxTextLength?: number;
    /**
     * @generated from field: optional string text_prompt = 21;
     */
    textPrompt?: string;
    /**
     * @generated from field: optional domain.operation.v1.PassRule pass_rule = 22;
     */
    passRule?: PassRule;
    /**
     * @generated from field: optional int32 min_pass_count = 23;
     */
    minPassCount?: number;
    /**
     * @generated from field: domain.operation.v1.DeterminationMode determination_mode = 24;
     */
    determinationMode: DeterminationMode;
    /**
     * @generated from field: repeated string allowed_determinations = 25;
     */
    allowedDeterminations: string[];
    /**
     * @generated from field: domain.operation.v1.AggregationMethod aggregation_method = 26;
     */
    aggregationMethod: AggregationMethod;
    /**
     * @generated from field: optional double aggregation_pass_pct = 27;
     */
    aggregationPassPct?: number;
    /**
     * @generated from field: double weight = 28;
     */
    weight: number;
    /**
     * @generated from field: repeated string tags = 29;
     */
    tags: string[];
    /**
     * @generated from field: bool required = 30;
     */
    required: boolean;
    /**
     * @generated from field: bool active = 31;
     */
    active: boolean;
    /**
     * @generated from field: string created_by = 32;
     */
    createdBy: string;
    /**
     * @generated from field: optional int64 date_created = 33;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 34;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 35;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 36;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.OutcomeCriteria.
 * Use `create(OutcomeCriteriaSchema)` to create a new message.
 */
export declare const OutcomeCriteriaSchema: GenMessage<OutcomeCriteria>;
/**
 * @generated from message domain.operation.v1.CreateOutcomeCriteriaRequest
 */
export type CreateOutcomeCriteriaRequest = Message<"domain.operation.v1.CreateOutcomeCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.OutcomeCriteria data = 1;
     */
    data?: OutcomeCriteria;
};
/**
 * Describes the message domain.operation.v1.CreateOutcomeCriteriaRequest.
 * Use `create(CreateOutcomeCriteriaRequestSchema)` to create a new message.
 */
export declare const CreateOutcomeCriteriaRequestSchema: GenMessage<CreateOutcomeCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.CreateOutcomeCriteriaResponse
 */
export type CreateOutcomeCriteriaResponse = Message<"domain.operation.v1.CreateOutcomeCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria data = 1;
     */
    data: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.CreateOutcomeCriteriaResponse.
 * Use `create(CreateOutcomeCriteriaResponseSchema)` to create a new message.
 */
export declare const CreateOutcomeCriteriaResponseSchema: GenMessage<CreateOutcomeCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ReadOutcomeCriteriaRequest
 */
export type ReadOutcomeCriteriaRequest = Message<"domain.operation.v1.ReadOutcomeCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.OutcomeCriteria data = 1;
     */
    data?: OutcomeCriteria;
};
/**
 * Describes the message domain.operation.v1.ReadOutcomeCriteriaRequest.
 * Use `create(ReadOutcomeCriteriaRequestSchema)` to create a new message.
 */
export declare const ReadOutcomeCriteriaRequestSchema: GenMessage<ReadOutcomeCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.ReadOutcomeCriteriaResponse
 */
export type ReadOutcomeCriteriaResponse = Message<"domain.operation.v1.ReadOutcomeCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria data = 1;
     */
    data: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.ReadOutcomeCriteriaResponse.
 * Use `create(ReadOutcomeCriteriaResponseSchema)` to create a new message.
 */
export declare const ReadOutcomeCriteriaResponseSchema: GenMessage<ReadOutcomeCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.UpdateOutcomeCriteriaRequest
 */
export type UpdateOutcomeCriteriaRequest = Message<"domain.operation.v1.UpdateOutcomeCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.OutcomeCriteria data = 1;
     */
    data?: OutcomeCriteria;
};
/**
 * Describes the message domain.operation.v1.UpdateOutcomeCriteriaRequest.
 * Use `create(UpdateOutcomeCriteriaRequestSchema)` to create a new message.
 */
export declare const UpdateOutcomeCriteriaRequestSchema: GenMessage<UpdateOutcomeCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.UpdateOutcomeCriteriaResponse
 */
export type UpdateOutcomeCriteriaResponse = Message<"domain.operation.v1.UpdateOutcomeCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria data = 1;
     */
    data: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.UpdateOutcomeCriteriaResponse.
 * Use `create(UpdateOutcomeCriteriaResponseSchema)` to create a new message.
 */
export declare const UpdateOutcomeCriteriaResponseSchema: GenMessage<UpdateOutcomeCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.DeleteOutcomeCriteriaRequest
 */
export type DeleteOutcomeCriteriaRequest = Message<"domain.operation.v1.DeleteOutcomeCriteriaRequest"> & {
    /**
     * @generated from field: domain.operation.v1.OutcomeCriteria data = 1;
     */
    data?: OutcomeCriteria;
};
/**
 * Describes the message domain.operation.v1.DeleteOutcomeCriteriaRequest.
 * Use `create(DeleteOutcomeCriteriaRequestSchema)` to create a new message.
 */
export declare const DeleteOutcomeCriteriaRequestSchema: GenMessage<DeleteOutcomeCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.DeleteOutcomeCriteriaResponse
 */
export type DeleteOutcomeCriteriaResponse = Message<"domain.operation.v1.DeleteOutcomeCriteriaResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteOutcomeCriteriaResponse.
 * Use `create(DeleteOutcomeCriteriaResponseSchema)` to create a new message.
 */
export declare const DeleteOutcomeCriteriaResponseSchema: GenMessage<DeleteOutcomeCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ListOutcomeCriteriasRequest
 */
export type ListOutcomeCriteriasRequest = Message<"domain.operation.v1.ListOutcomeCriteriasRequest"> & {
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
 * Describes the message domain.operation.v1.ListOutcomeCriteriasRequest.
 * Use `create(ListOutcomeCriteriasRequestSchema)` to create a new message.
 */
export declare const ListOutcomeCriteriasRequestSchema: GenMessage<ListOutcomeCriteriasRequest>;
/**
 * @generated from message domain.operation.v1.ListOutcomeCriteriasResponse
 */
export type ListOutcomeCriteriasResponse = Message<"domain.operation.v1.ListOutcomeCriteriasResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria data = 1;
     */
    data: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.ListOutcomeCriteriasResponse.
 * Use `create(ListOutcomeCriteriasResponseSchema)` to create a new message.
 */
export declare const ListOutcomeCriteriasResponseSchema: GenMessage<ListOutcomeCriteriasResponse>;
/**
 * @generated from message domain.operation.v1.GetOutcomeCriteriaListPageDataRequest
 */
export type GetOutcomeCriteriaListPageDataRequest = Message<"domain.operation.v1.GetOutcomeCriteriaListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetOutcomeCriteriaListPageDataRequest.
 * Use `create(GetOutcomeCriteriaListPageDataRequestSchema)` to create a new message.
 */
export declare const GetOutcomeCriteriaListPageDataRequestSchema: GenMessage<GetOutcomeCriteriaListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetOutcomeCriteriaListPageDataResponse
 */
export type GetOutcomeCriteriaListPageDataResponse = Message<"domain.operation.v1.GetOutcomeCriteriaListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria outcome_criteria_list = 1;
     */
    outcomeCriteriaList: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.GetOutcomeCriteriaListPageDataResponse.
 * Use `create(GetOutcomeCriteriaListPageDataResponseSchema)` to create a new message.
 */
export declare const GetOutcomeCriteriaListPageDataResponseSchema: GenMessage<GetOutcomeCriteriaListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetOutcomeCriteriaItemPageDataRequest
 */
export type GetOutcomeCriteriaItemPageDataRequest = Message<"domain.operation.v1.GetOutcomeCriteriaItemPageDataRequest"> & {
    /**
     * @generated from field: string outcome_criteria_id = 1;
     */
    outcomeCriteriaId: string;
};
/**
 * Describes the message domain.operation.v1.GetOutcomeCriteriaItemPageDataRequest.
 * Use `create(GetOutcomeCriteriaItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetOutcomeCriteriaItemPageDataRequestSchema: GenMessage<GetOutcomeCriteriaItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetOutcomeCriteriaItemPageDataResponse
 */
export type GetOutcomeCriteriaItemPageDataResponse = Message<"domain.operation.v1.GetOutcomeCriteriaItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.OutcomeCriteria outcome_criteria = 1;
     */
    outcomeCriteria?: OutcomeCriteria;
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
 * Describes the message domain.operation.v1.GetOutcomeCriteriaItemPageDataResponse.
 * Use `create(GetOutcomeCriteriaItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetOutcomeCriteriaItemPageDataResponseSchema: GenMessage<GetOutcomeCriteriaItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListOutcomeCriteriasByGroupRequest
 */
export type ListOutcomeCriteriasByGroupRequest = Message<"domain.operation.v1.ListOutcomeCriteriasByGroupRequest"> & {
    /**
     * @generated from field: string criteria_group_id = 1;
     */
    criteriaGroupId: string;
};
/**
 * Describes the message domain.operation.v1.ListOutcomeCriteriasByGroupRequest.
 * Use `create(ListOutcomeCriteriasByGroupRequestSchema)` to create a new message.
 */
export declare const ListOutcomeCriteriasByGroupRequestSchema: GenMessage<ListOutcomeCriteriasByGroupRequest>;
/**
 * @generated from message domain.operation.v1.ListOutcomeCriteriasByGroupResponse
 */
export type ListOutcomeCriteriasByGroupResponse = Message<"domain.operation.v1.ListOutcomeCriteriasByGroupResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria outcome_criterias = 1;
     */
    outcomeCriterias: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.ListOutcomeCriteriasByGroupResponse.
 * Use `create(ListOutcomeCriteriasByGroupResponseSchema)` to create a new message.
 */
export declare const ListOutcomeCriteriasByGroupResponseSchema: GenMessage<ListOutcomeCriteriasByGroupResponse>;
/**
 * @generated from message domain.operation.v1.GetCurrentPublishedOutcomeCriteriaRequest
 */
export type GetCurrentPublishedOutcomeCriteriaRequest = Message<"domain.operation.v1.GetCurrentPublishedOutcomeCriteriaRequest"> & {
    /**
     * @generated from field: string criteria_group_id = 1;
     */
    criteriaGroupId: string;
};
/**
 * Describes the message domain.operation.v1.GetCurrentPublishedOutcomeCriteriaRequest.
 * Use `create(GetCurrentPublishedOutcomeCriteriaRequestSchema)` to create a new message.
 */
export declare const GetCurrentPublishedOutcomeCriteriaRequestSchema: GenMessage<GetCurrentPublishedOutcomeCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.GetCurrentPublishedOutcomeCriteriaResponse
 */
export type GetCurrentPublishedOutcomeCriteriaResponse = Message<"domain.operation.v1.GetCurrentPublishedOutcomeCriteriaResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.OutcomeCriteria outcome_criteria = 1;
     */
    outcomeCriteria?: OutcomeCriteria;
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
 * Describes the message domain.operation.v1.GetCurrentPublishedOutcomeCriteriaResponse.
 * Use `create(GetCurrentPublishedOutcomeCriteriaResponseSchema)` to create a new message.
 */
export declare const GetCurrentPublishedOutcomeCriteriaResponseSchema: GenMessage<GetCurrentPublishedOutcomeCriteriaResponse>;
/**
 * @generated from message domain.operation.v1.ListOutcomeCriteriasByScopeRequest
 */
export type ListOutcomeCriteriasByScopeRequest = Message<"domain.operation.v1.ListOutcomeCriteriasByScopeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaScope scope = 1;
     */
    scope: CriteriaScope;
    /**
     * @generated from field: optional string industry_code = 2;
     */
    industryCode?: string;
    /**
     * @generated from field: optional string workspace_id = 3;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.ListOutcomeCriteriasByScopeRequest.
 * Use `create(ListOutcomeCriteriasByScopeRequestSchema)` to create a new message.
 */
export declare const ListOutcomeCriteriasByScopeRequestSchema: GenMessage<ListOutcomeCriteriasByScopeRequest>;
/**
 * @generated from message domain.operation.v1.ListOutcomeCriteriasByScopeResponse
 */
export type ListOutcomeCriteriasByScopeResponse = Message<"domain.operation.v1.ListOutcomeCriteriasByScopeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.OutcomeCriteria outcome_criterias = 1;
     */
    outcomeCriterias: OutcomeCriteria[];
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
 * Describes the message domain.operation.v1.ListOutcomeCriteriasByScopeResponse.
 * Use `create(ListOutcomeCriteriasByScopeResponseSchema)` to create a new message.
 */
export declare const ListOutcomeCriteriasByScopeResponseSchema: GenMessage<ListOutcomeCriteriasByScopeResponse>;
/**
 * @generated from service domain.operation.v1.OutcomeCriteriaDomainService
 */
export declare const OutcomeCriteriaDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.CreateOutcomeCriteria
     */
    createOutcomeCriteria: {
        methodKind: "unary";
        input: typeof CreateOutcomeCriteriaRequestSchema;
        output: typeof CreateOutcomeCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.ReadOutcomeCriteria
     */
    readOutcomeCriteria: {
        methodKind: "unary";
        input: typeof ReadOutcomeCriteriaRequestSchema;
        output: typeof ReadOutcomeCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.UpdateOutcomeCriteria
     */
    updateOutcomeCriteria: {
        methodKind: "unary";
        input: typeof UpdateOutcomeCriteriaRequestSchema;
        output: typeof UpdateOutcomeCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.DeleteOutcomeCriteria
     */
    deleteOutcomeCriteria: {
        methodKind: "unary";
        input: typeof DeleteOutcomeCriteriaRequestSchema;
        output: typeof DeleteOutcomeCriteriaResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.ListOutcomeCriterias
     */
    listOutcomeCriterias: {
        methodKind: "unary";
        input: typeof ListOutcomeCriteriasRequestSchema;
        output: typeof ListOutcomeCriteriasResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.GetOutcomeCriteriaListPageData
     */
    getOutcomeCriteriaListPageData: {
        methodKind: "unary";
        input: typeof GetOutcomeCriteriaListPageDataRequestSchema;
        output: typeof GetOutcomeCriteriaListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.GetOutcomeCriteriaItemPageData
     */
    getOutcomeCriteriaItemPageData: {
        methodKind: "unary";
        input: typeof GetOutcomeCriteriaItemPageDataRequestSchema;
        output: typeof GetOutcomeCriteriaItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by group
     *
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.ListByGroup
     */
    listByGroup: {
        methodKind: "unary";
        input: typeof ListOutcomeCriteriasByGroupRequestSchema;
        output: typeof ListOutcomeCriteriasByGroupResponseSchema;
    };
    /**
     * Extra: get current published version for a group
     *
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.GetCurrentPublished
     */
    getCurrentPublished: {
        methodKind: "unary";
        input: typeof GetCurrentPublishedOutcomeCriteriaRequestSchema;
        output: typeof GetCurrentPublishedOutcomeCriteriaResponseSchema;
    };
    /**
     * Extra: filter by scope
     *
     * @generated from rpc domain.operation.v1.OutcomeCriteriaDomainService.ListByScope
     */
    listByScope: {
        methodKind: "unary";
        input: typeof ListOutcomeCriteriasByScopeRequestSchema;
        output: typeof ListOutcomeCriteriasByScopeResponseSchema;
    };
}>;
