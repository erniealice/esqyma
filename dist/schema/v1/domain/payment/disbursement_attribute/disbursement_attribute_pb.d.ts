import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Disbursement } from "../disbursement/disbursement_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/disbursement_attribute/disbursement_attribute.proto.
 */
export declare const file_domain_payment_disbursement_attribute_disbursement_attribute: GenFile;
/**
 * @generated from message domain.payment.v1.DisbursementAttribute
 */
export type DisbursementAttribute = Message<"domain.payment.v1.DisbursementAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string disbursement_id = 2;
     */
    disbursementId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.payment.v1.Disbursement disbursement = 5;
     */
    disbursement?: Disbursement;
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
 * Describes the message domain.payment.v1.DisbursementAttribute.
 * Use `create(DisbursementAttributeSchema)` to create a new message.
 */
export declare const DisbursementAttributeSchema: GenMessage<DisbursementAttribute>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementAttributeRequest
 */
export type CreateDisbursementAttributeRequest = Message<"domain.payment.v1.CreateDisbursementAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementAttribute data = 1;
     */
    data?: DisbursementAttribute;
};
/**
 * Describes the message domain.payment.v1.CreateDisbursementAttributeRequest.
 * Use `create(CreateDisbursementAttributeRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementAttributeRequestSchema: GenMessage<CreateDisbursementAttributeRequest>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementAttributeResponse
 */
export type CreateDisbursementAttributeResponse = Message<"domain.payment.v1.CreateDisbursementAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.CreateDisbursementAttributeResponse.
 * Use `create(CreateDisbursementAttributeResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementAttributeResponseSchema: GenMessage<CreateDisbursementAttributeResponse>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementAttributeBatchRequest
 */
export type CreateDisbursementAttributeBatchRequest = Message<"domain.payment.v1.CreateDisbursementAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
};
/**
 * Describes the message domain.payment.v1.CreateDisbursementAttributeBatchRequest.
 * Use `create(CreateDisbursementAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementAttributeBatchRequestSchema: GenMessage<CreateDisbursementAttributeBatchRequest>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementAttributeBatchResponse
 */
export type CreateDisbursementAttributeBatchResponse = Message<"domain.payment.v1.CreateDisbursementAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.CreateDisbursementAttributeBatchResponse.
 * Use `create(CreateDisbursementAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementAttributeBatchResponseSchema: GenMessage<CreateDisbursementAttributeBatchResponse>;
/**
 * CreateDisbursementAttributesByCode creates disbursement attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.payment.v1.DisbursementAttributesByCodeData
 */
export type DisbursementAttributesByCodeData = Message<"domain.payment.v1.DisbursementAttributesByCodeData"> & {
    /**
     * @generated from field: string disbursement_id = 1;
     */
    disbursementId: string;
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
 * Describes the message domain.payment.v1.DisbursementAttributesByCodeData.
 * Use `create(DisbursementAttributesByCodeDataSchema)` to create a new message.
 */
export declare const DisbursementAttributesByCodeDataSchema: GenMessage<DisbursementAttributesByCodeData>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementAttributesByCodeRequest
 */
export type CreateDisbursementAttributesByCodeRequest = Message<"domain.payment.v1.CreateDisbursementAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementAttributesByCodeData data = 1;
     */
    data?: DisbursementAttributesByCodeData;
};
/**
 * Describes the message domain.payment.v1.CreateDisbursementAttributesByCodeRequest.
 * Use `create(CreateDisbursementAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementAttributesByCodeRequestSchema: GenMessage<CreateDisbursementAttributesByCodeRequest>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementAttributesByCodeResponse
 */
export type CreateDisbursementAttributesByCodeResponse = Message<"domain.payment.v1.CreateDisbursementAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.CreateDisbursementAttributesByCodeResponse.
 * Use `create(CreateDisbursementAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementAttributesByCodeResponseSchema: GenMessage<CreateDisbursementAttributesByCodeResponse>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementAttributeRequest
 */
export type ReadDisbursementAttributeRequest = Message<"domain.payment.v1.ReadDisbursementAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementAttribute data = 1;
     */
    data?: DisbursementAttribute;
};
/**
 * Describes the message domain.payment.v1.ReadDisbursementAttributeRequest.
 * Use `create(ReadDisbursementAttributeRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementAttributeRequestSchema: GenMessage<ReadDisbursementAttributeRequest>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementAttributeResponse
 */
export type ReadDisbursementAttributeResponse = Message<"domain.payment.v1.ReadDisbursementAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.ReadDisbursementAttributeResponse.
 * Use `create(ReadDisbursementAttributeResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementAttributeResponseSchema: GenMessage<ReadDisbursementAttributeResponse>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementAttributeRequest
 */
export type UpdateDisbursementAttributeRequest = Message<"domain.payment.v1.UpdateDisbursementAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementAttribute data = 1;
     */
    data?: DisbursementAttribute;
};
/**
 * Describes the message domain.payment.v1.UpdateDisbursementAttributeRequest.
 * Use `create(UpdateDisbursementAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementAttributeRequestSchema: GenMessage<UpdateDisbursementAttributeRequest>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementAttributeResponse
 */
export type UpdateDisbursementAttributeResponse = Message<"domain.payment.v1.UpdateDisbursementAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.UpdateDisbursementAttributeResponse.
 * Use `create(UpdateDisbursementAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementAttributeResponseSchema: GenMessage<UpdateDisbursementAttributeResponse>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementAttributeRequest
 */
export type DeleteDisbursementAttributeRequest = Message<"domain.payment.v1.DeleteDisbursementAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementAttribute data = 1;
     */
    data?: DisbursementAttribute;
};
/**
 * Describes the message domain.payment.v1.DeleteDisbursementAttributeRequest.
 * Use `create(DeleteDisbursementAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementAttributeRequestSchema: GenMessage<DeleteDisbursementAttributeRequest>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementAttributeResponse
 */
export type DeleteDisbursementAttributeResponse = Message<"domain.payment.v1.DeleteDisbursementAttributeResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteDisbursementAttributeResponse.
 * Use `create(DeleteDisbursementAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementAttributeResponseSchema: GenMessage<DeleteDisbursementAttributeResponse>;
/**
 * @generated from message domain.payment.v1.ListDisbursementAttributesRequest
 */
export type ListDisbursementAttributesRequest = Message<"domain.payment.v1.ListDisbursementAttributesRequest"> & {
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
 * Describes the message domain.payment.v1.ListDisbursementAttributesRequest.
 * Use `create(ListDisbursementAttributesRequestSchema)` to create a new message.
 */
export declare const ListDisbursementAttributesRequestSchema: GenMessage<ListDisbursementAttributesRequest>;
/**
 * @generated from message domain.payment.v1.ListDisbursementAttributesResponse
 */
export type ListDisbursementAttributesResponse = Message<"domain.payment.v1.ListDisbursementAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute data = 1;
     */
    data: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.ListDisbursementAttributesResponse.
 * Use `create(ListDisbursementAttributesResponseSchema)` to create a new message.
 */
export declare const ListDisbursementAttributesResponseSchema: GenMessage<ListDisbursementAttributesResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementAttributeListPageDataRequest
 */
export type GetDisbursementAttributeListPageDataRequest = Message<"domain.payment.v1.GetDisbursementAttributeListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.payment.v1.GetDisbursementAttributeListPageDataRequest.
 * Use `create(GetDisbursementAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementAttributeListPageDataRequestSchema: GenMessage<GetDisbursementAttributeListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementAttributeListPageDataResponse
 */
export type GetDisbursementAttributeListPageDataResponse = Message<"domain.payment.v1.GetDisbursementAttributeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementAttribute disbursement_attribute_list = 1;
     */
    disbursementAttributeList: DisbursementAttribute[];
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
 * Describes the message domain.payment.v1.GetDisbursementAttributeListPageDataResponse.
 * Use `create(GetDisbursementAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementAttributeListPageDataResponseSchema: GenMessage<GetDisbursementAttributeListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementAttributeItemPageDataRequest
 */
export type GetDisbursementAttributeItemPageDataRequest = Message<"domain.payment.v1.GetDisbursementAttributeItemPageDataRequest"> & {
    /**
     * @generated from field: string disbursement_attribute_id = 1;
     */
    disbursementAttributeId: string;
};
/**
 * Describes the message domain.payment.v1.GetDisbursementAttributeItemPageDataRequest.
 * Use `create(GetDisbursementAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementAttributeItemPageDataRequestSchema: GenMessage<GetDisbursementAttributeItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementAttributeItemPageDataResponse
 */
export type GetDisbursementAttributeItemPageDataResponse = Message<"domain.payment.v1.GetDisbursementAttributeItemPageDataResponse"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementAttribute disbursement_attribute = 1;
     */
    disbursementAttribute?: DisbursementAttribute;
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
 * Describes the message domain.payment.v1.GetDisbursementAttributeItemPageDataResponse.
 * Use `create(GetDisbursementAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementAttributeItemPageDataResponseSchema: GenMessage<GetDisbursementAttributeItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.DisbursementAttributeDomainService
 */
export declare const DisbursementAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.CreateDisbursementAttribute
     */
    createDisbursementAttribute: {
        methodKind: "unary";
        input: typeof CreateDisbursementAttributeRequestSchema;
        output: typeof CreateDisbursementAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.ReadDisbursementAttribute
     */
    readDisbursementAttribute: {
        methodKind: "unary";
        input: typeof ReadDisbursementAttributeRequestSchema;
        output: typeof ReadDisbursementAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.UpdateDisbursementAttribute
     */
    updateDisbursementAttribute: {
        methodKind: "unary";
        input: typeof UpdateDisbursementAttributeRequestSchema;
        output: typeof UpdateDisbursementAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.DeleteDisbursementAttribute
     */
    deleteDisbursementAttribute: {
        methodKind: "unary";
        input: typeof DeleteDisbursementAttributeRequestSchema;
        output: typeof DeleteDisbursementAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.ListDisbursementAttributes
     */
    listDisbursementAttributes: {
        methodKind: "unary";
        input: typeof ListDisbursementAttributesRequestSchema;
        output: typeof ListDisbursementAttributesResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.GetDisbursementAttributeListPageData
     */
    getDisbursementAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementAttributeListPageDataRequestSchema;
        output: typeof GetDisbursementAttributeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementAttributeDomainService.GetDisbursementAttributeItemPageData
     */
    getDisbursementAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementAttributeItemPageDataRequestSchema;
        output: typeof GetDisbursementAttributeItemPageDataResponseSchema;
    };
}>;
