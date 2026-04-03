import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { ThresholdRole } from "../enums/enums_pb";
import type { OutcomeCriteria } from "../outcome_criteria/outcome_criteria_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/criteria_threshold/criteria_threshold.proto.
 */
export declare const file_domain_operation_criteria_threshold_criteria_threshold: GenFile;
/**
 * @generated from message domain.operation.v1.CriteriaThreshold
 */
export type CriteriaThreshold = Message<"domain.operation.v1.CriteriaThreshold"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string outcome_criteria_id = 2;
     */
    outcomeCriteriaId: string;
    /**
     * @generated from field: optional domain.operation.v1.OutcomeCriteria outcome_criteria = 3;
     */
    outcomeCriteria?: OutcomeCriteria;
    /**
     * @generated from field: domain.operation.v1.ThresholdRole threshold_role = 4;
     */
    thresholdRole: ThresholdRole;
    /**
     * @generated from field: double value = 5;
     */
    value: number;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.CriteriaThreshold.
 * Use `create(CriteriaThresholdSchema)` to create a new message.
 */
export declare const CriteriaThresholdSchema: GenMessage<CriteriaThreshold>;
/**
 * @generated from message domain.operation.v1.CreateCriteriaThresholdRequest
 */
export type CreateCriteriaThresholdRequest = Message<"domain.operation.v1.CreateCriteriaThresholdRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaThreshold data = 1;
     */
    data?: CriteriaThreshold;
};
/**
 * Describes the message domain.operation.v1.CreateCriteriaThresholdRequest.
 * Use `create(CreateCriteriaThresholdRequestSchema)` to create a new message.
 */
export declare const CreateCriteriaThresholdRequestSchema: GenMessage<CreateCriteriaThresholdRequest>;
/**
 * @generated from message domain.operation.v1.CreateCriteriaThresholdResponse
 */
export type CreateCriteriaThresholdResponse = Message<"domain.operation.v1.CreateCriteriaThresholdResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaThreshold data = 1;
     */
    data: CriteriaThreshold[];
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
 * Describes the message domain.operation.v1.CreateCriteriaThresholdResponse.
 * Use `create(CreateCriteriaThresholdResponseSchema)` to create a new message.
 */
export declare const CreateCriteriaThresholdResponseSchema: GenMessage<CreateCriteriaThresholdResponse>;
/**
 * @generated from message domain.operation.v1.ReadCriteriaThresholdRequest
 */
export type ReadCriteriaThresholdRequest = Message<"domain.operation.v1.ReadCriteriaThresholdRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaThreshold data = 1;
     */
    data?: CriteriaThreshold;
};
/**
 * Describes the message domain.operation.v1.ReadCriteriaThresholdRequest.
 * Use `create(ReadCriteriaThresholdRequestSchema)` to create a new message.
 */
export declare const ReadCriteriaThresholdRequestSchema: GenMessage<ReadCriteriaThresholdRequest>;
/**
 * @generated from message domain.operation.v1.ReadCriteriaThresholdResponse
 */
export type ReadCriteriaThresholdResponse = Message<"domain.operation.v1.ReadCriteriaThresholdResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaThreshold data = 1;
     */
    data: CriteriaThreshold[];
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
 * Describes the message domain.operation.v1.ReadCriteriaThresholdResponse.
 * Use `create(ReadCriteriaThresholdResponseSchema)` to create a new message.
 */
export declare const ReadCriteriaThresholdResponseSchema: GenMessage<ReadCriteriaThresholdResponse>;
/**
 * @generated from message domain.operation.v1.UpdateCriteriaThresholdRequest
 */
export type UpdateCriteriaThresholdRequest = Message<"domain.operation.v1.UpdateCriteriaThresholdRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaThreshold data = 1;
     */
    data?: CriteriaThreshold;
};
/**
 * Describes the message domain.operation.v1.UpdateCriteriaThresholdRequest.
 * Use `create(UpdateCriteriaThresholdRequestSchema)` to create a new message.
 */
export declare const UpdateCriteriaThresholdRequestSchema: GenMessage<UpdateCriteriaThresholdRequest>;
/**
 * @generated from message domain.operation.v1.UpdateCriteriaThresholdResponse
 */
export type UpdateCriteriaThresholdResponse = Message<"domain.operation.v1.UpdateCriteriaThresholdResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaThreshold data = 1;
     */
    data: CriteriaThreshold[];
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
 * Describes the message domain.operation.v1.UpdateCriteriaThresholdResponse.
 * Use `create(UpdateCriteriaThresholdResponseSchema)` to create a new message.
 */
export declare const UpdateCriteriaThresholdResponseSchema: GenMessage<UpdateCriteriaThresholdResponse>;
/**
 * @generated from message domain.operation.v1.DeleteCriteriaThresholdRequest
 */
export type DeleteCriteriaThresholdRequest = Message<"domain.operation.v1.DeleteCriteriaThresholdRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaThreshold data = 1;
     */
    data?: CriteriaThreshold;
};
/**
 * Describes the message domain.operation.v1.DeleteCriteriaThresholdRequest.
 * Use `create(DeleteCriteriaThresholdRequestSchema)` to create a new message.
 */
export declare const DeleteCriteriaThresholdRequestSchema: GenMessage<DeleteCriteriaThresholdRequest>;
/**
 * @generated from message domain.operation.v1.DeleteCriteriaThresholdResponse
 */
export type DeleteCriteriaThresholdResponse = Message<"domain.operation.v1.DeleteCriteriaThresholdResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteCriteriaThresholdResponse.
 * Use `create(DeleteCriteriaThresholdResponseSchema)` to create a new message.
 */
export declare const DeleteCriteriaThresholdResponseSchema: GenMessage<DeleteCriteriaThresholdResponse>;
/**
 * @generated from message domain.operation.v1.ListCriteriaThresholdsRequest
 */
export type ListCriteriaThresholdsRequest = Message<"domain.operation.v1.ListCriteriaThresholdsRequest"> & {
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
 * Describes the message domain.operation.v1.ListCriteriaThresholdsRequest.
 * Use `create(ListCriteriaThresholdsRequestSchema)` to create a new message.
 */
export declare const ListCriteriaThresholdsRequestSchema: GenMessage<ListCriteriaThresholdsRequest>;
/**
 * @generated from message domain.operation.v1.ListCriteriaThresholdsResponse
 */
export type ListCriteriaThresholdsResponse = Message<"domain.operation.v1.ListCriteriaThresholdsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaThreshold data = 1;
     */
    data: CriteriaThreshold[];
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
 * Describes the message domain.operation.v1.ListCriteriaThresholdsResponse.
 * Use `create(ListCriteriaThresholdsResponseSchema)` to create a new message.
 */
export declare const ListCriteriaThresholdsResponseSchema: GenMessage<ListCriteriaThresholdsResponse>;
/**
 * @generated from message domain.operation.v1.GetCriteriaThresholdListPageDataRequest
 */
export type GetCriteriaThresholdListPageDataRequest = Message<"domain.operation.v1.GetCriteriaThresholdListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetCriteriaThresholdListPageDataRequest.
 * Use `create(GetCriteriaThresholdListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCriteriaThresholdListPageDataRequestSchema: GenMessage<GetCriteriaThresholdListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetCriteriaThresholdListPageDataResponse
 */
export type GetCriteriaThresholdListPageDataResponse = Message<"domain.operation.v1.GetCriteriaThresholdListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaThreshold criteria_threshold_list = 1;
     */
    criteriaThresholdList: CriteriaThreshold[];
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
 * Describes the message domain.operation.v1.GetCriteriaThresholdListPageDataResponse.
 * Use `create(GetCriteriaThresholdListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCriteriaThresholdListPageDataResponseSchema: GenMessage<GetCriteriaThresholdListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetCriteriaThresholdItemPageDataRequest
 */
export type GetCriteriaThresholdItemPageDataRequest = Message<"domain.operation.v1.GetCriteriaThresholdItemPageDataRequest"> & {
    /**
     * @generated from field: string criteria_threshold_id = 1;
     */
    criteriaThresholdId: string;
};
/**
 * Describes the message domain.operation.v1.GetCriteriaThresholdItemPageDataRequest.
 * Use `create(GetCriteriaThresholdItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCriteriaThresholdItemPageDataRequestSchema: GenMessage<GetCriteriaThresholdItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetCriteriaThresholdItemPageDataResponse
 */
export type GetCriteriaThresholdItemPageDataResponse = Message<"domain.operation.v1.GetCriteriaThresholdItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.CriteriaThreshold criteria_threshold = 1;
     */
    criteriaThreshold?: CriteriaThreshold;
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
 * Describes the message domain.operation.v1.GetCriteriaThresholdItemPageDataResponse.
 * Use `create(GetCriteriaThresholdItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCriteriaThresholdItemPageDataResponseSchema: GenMessage<GetCriteriaThresholdItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListCriteriaThresholdsByCriteriaRequest
 */
export type ListCriteriaThresholdsByCriteriaRequest = Message<"domain.operation.v1.ListCriteriaThresholdsByCriteriaRequest"> & {
    /**
     * @generated from field: string outcome_criteria_id = 1;
     */
    outcomeCriteriaId: string;
};
/**
 * Describes the message domain.operation.v1.ListCriteriaThresholdsByCriteriaRequest.
 * Use `create(ListCriteriaThresholdsByCriteriaRequestSchema)` to create a new message.
 */
export declare const ListCriteriaThresholdsByCriteriaRequestSchema: GenMessage<ListCriteriaThresholdsByCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.ListCriteriaThresholdsByCriteriaResponse
 */
export type ListCriteriaThresholdsByCriteriaResponse = Message<"domain.operation.v1.ListCriteriaThresholdsByCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaThreshold criteria_thresholds = 1;
     */
    criteriaThresholds: CriteriaThreshold[];
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
 * Describes the message domain.operation.v1.ListCriteriaThresholdsByCriteriaResponse.
 * Use `create(ListCriteriaThresholdsByCriteriaResponseSchema)` to create a new message.
 */
export declare const ListCriteriaThresholdsByCriteriaResponseSchema: GenMessage<ListCriteriaThresholdsByCriteriaResponse>;
/**
 * @generated from service domain.operation.v1.CriteriaThresholdDomainService
 */
export declare const CriteriaThresholdDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.CreateCriteriaThreshold
     */
    createCriteriaThreshold: {
        methodKind: "unary";
        input: typeof CreateCriteriaThresholdRequestSchema;
        output: typeof CreateCriteriaThresholdResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.ReadCriteriaThreshold
     */
    readCriteriaThreshold: {
        methodKind: "unary";
        input: typeof ReadCriteriaThresholdRequestSchema;
        output: typeof ReadCriteriaThresholdResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.UpdateCriteriaThreshold
     */
    updateCriteriaThreshold: {
        methodKind: "unary";
        input: typeof UpdateCriteriaThresholdRequestSchema;
        output: typeof UpdateCriteriaThresholdResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.DeleteCriteriaThreshold
     */
    deleteCriteriaThreshold: {
        methodKind: "unary";
        input: typeof DeleteCriteriaThresholdRequestSchema;
        output: typeof DeleteCriteriaThresholdResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.ListCriteriaThresholds
     */
    listCriteriaThresholds: {
        methodKind: "unary";
        input: typeof ListCriteriaThresholdsRequestSchema;
        output: typeof ListCriteriaThresholdsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.GetCriteriaThresholdListPageData
     */
    getCriteriaThresholdListPageData: {
        methodKind: "unary";
        input: typeof GetCriteriaThresholdListPageDataRequestSchema;
        output: typeof GetCriteriaThresholdListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.GetCriteriaThresholdItemPageData
     */
    getCriteriaThresholdItemPageData: {
        methodKind: "unary";
        input: typeof GetCriteriaThresholdItemPageDataRequestSchema;
        output: typeof GetCriteriaThresholdItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by criteria
     *
     * @generated from rpc domain.operation.v1.CriteriaThresholdDomainService.ListByCriteria
     */
    listByCriteria: {
        methodKind: "unary";
        input: typeof ListCriteriaThresholdsByCriteriaRequestSchema;
        output: typeof ListCriteriaThresholdsByCriteriaResponseSchema;
    };
}>;
