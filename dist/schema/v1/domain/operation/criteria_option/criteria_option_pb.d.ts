import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { OutcomeCriteria } from "../outcome_criteria/outcome_criteria_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/criteria_option/criteria_option.proto.
 */
export declare const file_domain_operation_criteria_option_criteria_option: GenFile;
/**
 * @generated from message domain.operation.v1.CriteriaOption
 */
export type CriteriaOption = Message<"domain.operation.v1.CriteriaOption"> & {
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
     * @generated from field: string option_key = 4;
     */
    optionKey: string;
    /**
     * @generated from field: string option_label = 5;
     */
    optionLabel: string;
    /**
     * @generated from field: int32 display_order = 6;
     */
    displayOrder: number;
    /**
     * @generated from field: optional int32 severity = 7;
     */
    severity?: number;
    /**
     * @generated from field: optional string maps_to_determination = 8;
     */
    mapsToDetermination?: string;
    /**
     * @generated from field: bool required = 9;
     */
    required: boolean;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 13;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 14;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.CriteriaOption.
 * Use `create(CriteriaOptionSchema)` to create a new message.
 */
export declare const CriteriaOptionSchema: GenMessage<CriteriaOption>;
/**
 * @generated from message domain.operation.v1.CreateCriteriaOptionRequest
 */
export type CreateCriteriaOptionRequest = Message<"domain.operation.v1.CreateCriteriaOptionRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaOption data = 1;
     */
    data?: CriteriaOption;
};
/**
 * Describes the message domain.operation.v1.CreateCriteriaOptionRequest.
 * Use `create(CreateCriteriaOptionRequestSchema)` to create a new message.
 */
export declare const CreateCriteriaOptionRequestSchema: GenMessage<CreateCriteriaOptionRequest>;
/**
 * @generated from message domain.operation.v1.CreateCriteriaOptionResponse
 */
export type CreateCriteriaOptionResponse = Message<"domain.operation.v1.CreateCriteriaOptionResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaOption data = 1;
     */
    data: CriteriaOption[];
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
 * Describes the message domain.operation.v1.CreateCriteriaOptionResponse.
 * Use `create(CreateCriteriaOptionResponseSchema)` to create a new message.
 */
export declare const CreateCriteriaOptionResponseSchema: GenMessage<CreateCriteriaOptionResponse>;
/**
 * @generated from message domain.operation.v1.ReadCriteriaOptionRequest
 */
export type ReadCriteriaOptionRequest = Message<"domain.operation.v1.ReadCriteriaOptionRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaOption data = 1;
     */
    data?: CriteriaOption;
};
/**
 * Describes the message domain.operation.v1.ReadCriteriaOptionRequest.
 * Use `create(ReadCriteriaOptionRequestSchema)` to create a new message.
 */
export declare const ReadCriteriaOptionRequestSchema: GenMessage<ReadCriteriaOptionRequest>;
/**
 * @generated from message domain.operation.v1.ReadCriteriaOptionResponse
 */
export type ReadCriteriaOptionResponse = Message<"domain.operation.v1.ReadCriteriaOptionResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaOption data = 1;
     */
    data: CriteriaOption[];
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
 * Describes the message domain.operation.v1.ReadCriteriaOptionResponse.
 * Use `create(ReadCriteriaOptionResponseSchema)` to create a new message.
 */
export declare const ReadCriteriaOptionResponseSchema: GenMessage<ReadCriteriaOptionResponse>;
/**
 * @generated from message domain.operation.v1.UpdateCriteriaOptionRequest
 */
export type UpdateCriteriaOptionRequest = Message<"domain.operation.v1.UpdateCriteriaOptionRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaOption data = 1;
     */
    data?: CriteriaOption;
};
/**
 * Describes the message domain.operation.v1.UpdateCriteriaOptionRequest.
 * Use `create(UpdateCriteriaOptionRequestSchema)` to create a new message.
 */
export declare const UpdateCriteriaOptionRequestSchema: GenMessage<UpdateCriteriaOptionRequest>;
/**
 * @generated from message domain.operation.v1.UpdateCriteriaOptionResponse
 */
export type UpdateCriteriaOptionResponse = Message<"domain.operation.v1.UpdateCriteriaOptionResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaOption data = 1;
     */
    data: CriteriaOption[];
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
 * Describes the message domain.operation.v1.UpdateCriteriaOptionResponse.
 * Use `create(UpdateCriteriaOptionResponseSchema)` to create a new message.
 */
export declare const UpdateCriteriaOptionResponseSchema: GenMessage<UpdateCriteriaOptionResponse>;
/**
 * @generated from message domain.operation.v1.DeleteCriteriaOptionRequest
 */
export type DeleteCriteriaOptionRequest = Message<"domain.operation.v1.DeleteCriteriaOptionRequest"> & {
    /**
     * @generated from field: domain.operation.v1.CriteriaOption data = 1;
     */
    data?: CriteriaOption;
};
/**
 * Describes the message domain.operation.v1.DeleteCriteriaOptionRequest.
 * Use `create(DeleteCriteriaOptionRequestSchema)` to create a new message.
 */
export declare const DeleteCriteriaOptionRequestSchema: GenMessage<DeleteCriteriaOptionRequest>;
/**
 * @generated from message domain.operation.v1.DeleteCriteriaOptionResponse
 */
export type DeleteCriteriaOptionResponse = Message<"domain.operation.v1.DeleteCriteriaOptionResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteCriteriaOptionResponse.
 * Use `create(DeleteCriteriaOptionResponseSchema)` to create a new message.
 */
export declare const DeleteCriteriaOptionResponseSchema: GenMessage<DeleteCriteriaOptionResponse>;
/**
 * @generated from message domain.operation.v1.ListCriteriaOptionsRequest
 */
export type ListCriteriaOptionsRequest = Message<"domain.operation.v1.ListCriteriaOptionsRequest"> & {
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
 * Describes the message domain.operation.v1.ListCriteriaOptionsRequest.
 * Use `create(ListCriteriaOptionsRequestSchema)` to create a new message.
 */
export declare const ListCriteriaOptionsRequestSchema: GenMessage<ListCriteriaOptionsRequest>;
/**
 * @generated from message domain.operation.v1.ListCriteriaOptionsResponse
 */
export type ListCriteriaOptionsResponse = Message<"domain.operation.v1.ListCriteriaOptionsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaOption data = 1;
     */
    data: CriteriaOption[];
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
 * Describes the message domain.operation.v1.ListCriteriaOptionsResponse.
 * Use `create(ListCriteriaOptionsResponseSchema)` to create a new message.
 */
export declare const ListCriteriaOptionsResponseSchema: GenMessage<ListCriteriaOptionsResponse>;
/**
 * @generated from message domain.operation.v1.GetCriteriaOptionListPageDataRequest
 */
export type GetCriteriaOptionListPageDataRequest = Message<"domain.operation.v1.GetCriteriaOptionListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetCriteriaOptionListPageDataRequest.
 * Use `create(GetCriteriaOptionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCriteriaOptionListPageDataRequestSchema: GenMessage<GetCriteriaOptionListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetCriteriaOptionListPageDataResponse
 */
export type GetCriteriaOptionListPageDataResponse = Message<"domain.operation.v1.GetCriteriaOptionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaOption criteria_option_list = 1;
     */
    criteriaOptionList: CriteriaOption[];
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
 * Describes the message domain.operation.v1.GetCriteriaOptionListPageDataResponse.
 * Use `create(GetCriteriaOptionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCriteriaOptionListPageDataResponseSchema: GenMessage<GetCriteriaOptionListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetCriteriaOptionItemPageDataRequest
 */
export type GetCriteriaOptionItemPageDataRequest = Message<"domain.operation.v1.GetCriteriaOptionItemPageDataRequest"> & {
    /**
     * @generated from field: string criteria_option_id = 1;
     */
    criteriaOptionId: string;
};
/**
 * Describes the message domain.operation.v1.GetCriteriaOptionItemPageDataRequest.
 * Use `create(GetCriteriaOptionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCriteriaOptionItemPageDataRequestSchema: GenMessage<GetCriteriaOptionItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetCriteriaOptionItemPageDataResponse
 */
export type GetCriteriaOptionItemPageDataResponse = Message<"domain.operation.v1.GetCriteriaOptionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.CriteriaOption criteria_option = 1;
     */
    criteriaOption?: CriteriaOption;
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
 * Describes the message domain.operation.v1.GetCriteriaOptionItemPageDataResponse.
 * Use `create(GetCriteriaOptionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCriteriaOptionItemPageDataResponseSchema: GenMessage<GetCriteriaOptionItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListCriteriaOptionsByCriteriaRequest
 */
export type ListCriteriaOptionsByCriteriaRequest = Message<"domain.operation.v1.ListCriteriaOptionsByCriteriaRequest"> & {
    /**
     * @generated from field: string outcome_criteria_id = 1;
     */
    outcomeCriteriaId: string;
};
/**
 * Describes the message domain.operation.v1.ListCriteriaOptionsByCriteriaRequest.
 * Use `create(ListCriteriaOptionsByCriteriaRequestSchema)` to create a new message.
 */
export declare const ListCriteriaOptionsByCriteriaRequestSchema: GenMessage<ListCriteriaOptionsByCriteriaRequest>;
/**
 * @generated from message domain.operation.v1.ListCriteriaOptionsByCriteriaResponse
 */
export type ListCriteriaOptionsByCriteriaResponse = Message<"domain.operation.v1.ListCriteriaOptionsByCriteriaResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.CriteriaOption criteria_options = 1;
     */
    criteriaOptions: CriteriaOption[];
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
 * Describes the message domain.operation.v1.ListCriteriaOptionsByCriteriaResponse.
 * Use `create(ListCriteriaOptionsByCriteriaResponseSchema)` to create a new message.
 */
export declare const ListCriteriaOptionsByCriteriaResponseSchema: GenMessage<ListCriteriaOptionsByCriteriaResponse>;
/**
 * @generated from service domain.operation.v1.CriteriaOptionDomainService
 */
export declare const CriteriaOptionDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.CreateCriteriaOption
     */
    createCriteriaOption: {
        methodKind: "unary";
        input: typeof CreateCriteriaOptionRequestSchema;
        output: typeof CreateCriteriaOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.ReadCriteriaOption
     */
    readCriteriaOption: {
        methodKind: "unary";
        input: typeof ReadCriteriaOptionRequestSchema;
        output: typeof ReadCriteriaOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.UpdateCriteriaOption
     */
    updateCriteriaOption: {
        methodKind: "unary";
        input: typeof UpdateCriteriaOptionRequestSchema;
        output: typeof UpdateCriteriaOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.DeleteCriteriaOption
     */
    deleteCriteriaOption: {
        methodKind: "unary";
        input: typeof DeleteCriteriaOptionRequestSchema;
        output: typeof DeleteCriteriaOptionResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.ListCriteriaOptions
     */
    listCriteriaOptions: {
        methodKind: "unary";
        input: typeof ListCriteriaOptionsRequestSchema;
        output: typeof ListCriteriaOptionsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.GetCriteriaOptionListPageData
     */
    getCriteriaOptionListPageData: {
        methodKind: "unary";
        input: typeof GetCriteriaOptionListPageDataRequestSchema;
        output: typeof GetCriteriaOptionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.GetCriteriaOptionItemPageData
     */
    getCriteriaOptionItemPageData: {
        methodKind: "unary";
        input: typeof GetCriteriaOptionItemPageDataRequestSchema;
        output: typeof GetCriteriaOptionItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by criteria
     *
     * @generated from rpc domain.operation.v1.CriteriaOptionDomainService.ListByCriteria
     */
    listByCriteria: {
        methodKind: "unary";
        input: typeof ListCriteriaOptionsByCriteriaRequestSchema;
        output: typeof ListCriteriaOptionsByCriteriaResponseSchema;
    };
}>;
