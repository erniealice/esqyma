import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Expenditure } from "../expenditure/expenditure_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expenditure_attribute/expenditure_attribute.proto.
 */
export declare const file_domain_expenditure_expenditure_attribute_expenditure_attribute: GenFile;
/**
 * @generated from message domain.expenditure.v1.ExpenditureAttribute
 */
export type ExpenditureAttribute = Message<"domain.expenditure.v1.ExpenditureAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string expenditure_id = 2;
     */
    expenditureId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.expenditure.v1.Expenditure expenditure = 5;
     */
    expenditure?: Expenditure;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
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
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.expenditure.v1.ExpenditureAttribute.
 * Use `create(ExpenditureAttributeSchema)` to create a new message.
 */
export declare const ExpenditureAttributeSchema: GenMessage<ExpenditureAttribute>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureAttributeRequest
 */
export type CreateExpenditureAttributeRequest = Message<"domain.expenditure.v1.CreateExpenditureAttributeRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data?: ExpenditureAttribute;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenditureAttributeRequest.
 * Use `create(CreateExpenditureAttributeRequestSchema)` to create a new message.
 */
export declare const CreateExpenditureAttributeRequestSchema: GenMessage<CreateExpenditureAttributeRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureAttributeResponse
 */
export type CreateExpenditureAttributeResponse = Message<"domain.expenditure.v1.CreateExpenditureAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
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
 * Describes the message domain.expenditure.v1.CreateExpenditureAttributeResponse.
 * Use `create(CreateExpenditureAttributeResponseSchema)` to create a new message.
 */
export declare const CreateExpenditureAttributeResponseSchema: GenMessage<CreateExpenditureAttributeResponse>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureAttributeBatchRequest
 */
export type CreateExpenditureAttributeBatchRequest = Message<"domain.expenditure.v1.CreateExpenditureAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenditureAttributeBatchRequest.
 * Use `create(CreateExpenditureAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateExpenditureAttributeBatchRequestSchema: GenMessage<CreateExpenditureAttributeBatchRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureAttributeBatchResponse
 */
export type CreateExpenditureAttributeBatchResponse = Message<"domain.expenditure.v1.CreateExpenditureAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
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
 * Describes the message domain.expenditure.v1.CreateExpenditureAttributeBatchResponse.
 * Use `create(CreateExpenditureAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateExpenditureAttributeBatchResponseSchema: GenMessage<CreateExpenditureAttributeBatchResponse>;
/**
 * CreateExpenditureAttributesByCode creates expenditure attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.expenditure.v1.ExpenditureAttributesByCodeData
 */
export type ExpenditureAttributesByCodeData = Message<"domain.expenditure.v1.ExpenditureAttributesByCodeData"> & {
    /**
     * @generated from field: string expenditure_id = 1;
     */
    expenditureId: string;
    /**
     * {"attribute_code": "value", ...}
     *
     * @generated from field: map<string, string> attributes_map = 2;
     */
    attributesMap: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.expenditure.v1.ExpenditureAttributesByCodeData.
 * Use `create(ExpenditureAttributesByCodeDataSchema)` to create a new message.
 */
export declare const ExpenditureAttributesByCodeDataSchema: GenMessage<ExpenditureAttributesByCodeData>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureAttributesByCodeRequest
 */
export type CreateExpenditureAttributesByCodeRequest = Message<"domain.expenditure.v1.CreateExpenditureAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureAttributesByCodeData data = 1;
     */
    data?: ExpenditureAttributesByCodeData;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenditureAttributesByCodeRequest.
 * Use `create(CreateExpenditureAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateExpenditureAttributesByCodeRequestSchema: GenMessage<CreateExpenditureAttributesByCodeRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureAttributesByCodeResponse
 */
export type CreateExpenditureAttributesByCodeResponse = Message<"domain.expenditure.v1.CreateExpenditureAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
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
 * Describes the message domain.expenditure.v1.CreateExpenditureAttributesByCodeResponse.
 * Use `create(CreateExpenditureAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateExpenditureAttributesByCodeResponseSchema: GenMessage<CreateExpenditureAttributesByCodeResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureAttributeRequest
 */
export type ReadExpenditureAttributeRequest = Message<"domain.expenditure.v1.ReadExpenditureAttributeRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data?: ExpenditureAttribute;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenditureAttributeRequest.
 * Use `create(ReadExpenditureAttributeRequestSchema)` to create a new message.
 */
export declare const ReadExpenditureAttributeRequestSchema: GenMessage<ReadExpenditureAttributeRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureAttributeResponse
 */
export type ReadExpenditureAttributeResponse = Message<"domain.expenditure.v1.ReadExpenditureAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
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
 * Describes the message domain.expenditure.v1.ReadExpenditureAttributeResponse.
 * Use `create(ReadExpenditureAttributeResponseSchema)` to create a new message.
 */
export declare const ReadExpenditureAttributeResponseSchema: GenMessage<ReadExpenditureAttributeResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureAttributeRequest
 */
export type UpdateExpenditureAttributeRequest = Message<"domain.expenditure.v1.UpdateExpenditureAttributeRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data?: ExpenditureAttribute;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenditureAttributeRequest.
 * Use `create(UpdateExpenditureAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateExpenditureAttributeRequestSchema: GenMessage<UpdateExpenditureAttributeRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureAttributeResponse
 */
export type UpdateExpenditureAttributeResponse = Message<"domain.expenditure.v1.UpdateExpenditureAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenditureAttributeResponse.
 * Use `create(UpdateExpenditureAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateExpenditureAttributeResponseSchema: GenMessage<UpdateExpenditureAttributeResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureAttributeRequest
 */
export type DeleteExpenditureAttributeRequest = Message<"domain.expenditure.v1.DeleteExpenditureAttributeRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data?: ExpenditureAttribute;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenditureAttributeRequest.
 * Use `create(DeleteExpenditureAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteExpenditureAttributeRequestSchema: GenMessage<DeleteExpenditureAttributeRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureAttributeResponse
 */
export type DeleteExpenditureAttributeResponse = Message<"domain.expenditure.v1.DeleteExpenditureAttributeResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenditureAttributeResponse.
 * Use `create(DeleteExpenditureAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteExpenditureAttributeResponseSchema: GenMessage<DeleteExpenditureAttributeResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenditureAttributesRequest
 */
export type ListExpenditureAttributesRequest = Message<"domain.expenditure.v1.ListExpenditureAttributesRequest"> & {
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
 * Describes the message domain.expenditure.v1.ListExpenditureAttributesRequest.
 * Use `create(ListExpenditureAttributesRequestSchema)` to create a new message.
 */
export declare const ListExpenditureAttributesRequestSchema: GenMessage<ListExpenditureAttributesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenditureAttributesResponse
 */
export type ListExpenditureAttributesResponse = Message<"domain.expenditure.v1.ListExpenditureAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute data = 1;
     */
    data: ExpenditureAttribute[];
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
 * Describes the message domain.expenditure.v1.ListExpenditureAttributesResponse.
 * Use `create(ListExpenditureAttributesResponseSchema)` to create a new message.
 */
export declare const ListExpenditureAttributesResponseSchema: GenMessage<ListExpenditureAttributesResponse>;
/**
 * Enhanced list request with core features
 *
 * @generated from message domain.expenditure.v1.GetExpenditureAttributeListPageDataRequest
 */
export type GetExpenditureAttributeListPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureAttributeListPageDataRequest.
 * Use `create(GetExpenditureAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureAttributeListPageDataRequestSchema: GenMessage<GetExpenditureAttributeListPageDataRequest>;
/**
 * Enhanced list response with metadata
 *
 * @generated from message domain.expenditure.v1.GetExpenditureAttributeListPageDataResponse
 */
export type GetExpenditureAttributeListPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureAttributeListPageDataResponse"> & {
    /**
     * The expenditure attribute data
     *
     * @generated from field: repeated domain.expenditure.v1.ExpenditureAttribute expenditure_attribute_list = 1;
     */
    expenditureAttributeList: ExpenditureAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureAttributeListPageDataResponse.
 * Use `create(GetExpenditureAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureAttributeListPageDataResponseSchema: GenMessage<GetExpenditureAttributeListPageDataResponse>;
/**
 * Simple item request
 *
 * @generated from message domain.expenditure.v1.GetExpenditureAttributeItemPageDataRequest
 */
export type GetExpenditureAttributeItemPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureAttributeItemPageDataRequest"> & {
    /**
     * The expenditure attribute ID to retrieve
     *
     * @generated from field: string expenditure_attribute_id = 1;
     */
    expenditureAttributeId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureAttributeItemPageDataRequest.
 * Use `create(GetExpenditureAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureAttributeItemPageDataRequestSchema: GenMessage<GetExpenditureAttributeItemPageDataRequest>;
/**
 * Simple item response
 *
 * @generated from message domain.expenditure.v1.GetExpenditureAttributeItemPageDataResponse
 */
export type GetExpenditureAttributeItemPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureAttributeItemPageDataResponse"> & {
    /**
     * The expenditure attribute data
     *
     * @generated from field: optional domain.expenditure.v1.ExpenditureAttribute expenditure_attribute = 1;
     */
    expenditureAttribute?: ExpenditureAttribute;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureAttributeItemPageDataResponse.
 * Use `create(GetExpenditureAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureAttributeItemPageDataResponseSchema: GenMessage<GetExpenditureAttributeItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.ExpenditureAttributeDomainService
 */
export declare const ExpenditureAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.CreateExpenditureAttribute
     */
    createExpenditureAttribute: {
        methodKind: "unary";
        input: typeof CreateExpenditureAttributeRequestSchema;
        output: typeof CreateExpenditureAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.ReadExpenditureAttribute
     */
    readExpenditureAttribute: {
        methodKind: "unary";
        input: typeof ReadExpenditureAttributeRequestSchema;
        output: typeof ReadExpenditureAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.UpdateExpenditureAttribute
     */
    updateExpenditureAttribute: {
        methodKind: "unary";
        input: typeof UpdateExpenditureAttributeRequestSchema;
        output: typeof UpdateExpenditureAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.DeleteExpenditureAttribute
     */
    deleteExpenditureAttribute: {
        methodKind: "unary";
        input: typeof DeleteExpenditureAttributeRequestSchema;
        output: typeof DeleteExpenditureAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.ListExpenditureAttributes
     */
    listExpenditureAttributes: {
        methodKind: "unary";
        input: typeof ListExpenditureAttributesRequestSchema;
        output: typeof ListExpenditureAttributesResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.GetExpenditureAttributeListPageData
     */
    getExpenditureAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureAttributeListPageDataRequestSchema;
        output: typeof GetExpenditureAttributeListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.expenditure.v1.ExpenditureAttributeDomainService.GetExpenditureAttributeItemPageData
     */
    getExpenditureAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureAttributeItemPageDataRequestSchema;
        output: typeof GetExpenditureAttributeItemPageDataResponseSchema;
    };
}>;
