import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Payment } from "../payment/payment_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/payment_attribute/payment_attribute.proto.
 */
export declare const file_domain_payment_payment_attribute_payment_attribute: GenFile;
/**
 * @generated from message domain.payment.v1.PaymentAttribute
 */
export type PaymentAttribute = Message<"domain.payment.v1.PaymentAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string payment_id = 2;
     */
    paymentId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.payment.v1.Payment payment = 5;
     */
    payment?: Payment;
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
 * Describes the message domain.payment.v1.PaymentAttribute.
 * Use `create(PaymentAttributeSchema)` to create a new message.
 */
export declare const PaymentAttributeSchema: GenMessage<PaymentAttribute>;
/**
 * @generated from message domain.payment.v1.CreatePaymentAttributeRequest
 */
export type CreatePaymentAttributeRequest = Message<"domain.payment.v1.CreatePaymentAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentAttribute data = 1;
     */
    data?: PaymentAttribute;
};
/**
 * Describes the message domain.payment.v1.CreatePaymentAttributeRequest.
 * Use `create(CreatePaymentAttributeRequestSchema)` to create a new message.
 */
export declare const CreatePaymentAttributeRequestSchema: GenMessage<CreatePaymentAttributeRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentAttributeResponse
 */
export type CreatePaymentAttributeResponse = Message<"domain.payment.v1.CreatePaymentAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
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
 * Describes the message domain.payment.v1.CreatePaymentAttributeResponse.
 * Use `create(CreatePaymentAttributeResponseSchema)` to create a new message.
 */
export declare const CreatePaymentAttributeResponseSchema: GenMessage<CreatePaymentAttributeResponse>;
/**
 * @generated from message domain.payment.v1.CreatePaymentAttributeBatchRequest
 */
export type CreatePaymentAttributeBatchRequest = Message<"domain.payment.v1.CreatePaymentAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
};
/**
 * Describes the message domain.payment.v1.CreatePaymentAttributeBatchRequest.
 * Use `create(CreatePaymentAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreatePaymentAttributeBatchRequestSchema: GenMessage<CreatePaymentAttributeBatchRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentAttributeBatchResponse
 */
export type CreatePaymentAttributeBatchResponse = Message<"domain.payment.v1.CreatePaymentAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
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
 * Describes the message domain.payment.v1.CreatePaymentAttributeBatchResponse.
 * Use `create(CreatePaymentAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreatePaymentAttributeBatchResponseSchema: GenMessage<CreatePaymentAttributeBatchResponse>;
/**
 * CreatePaymentAttributesByCode creates payment attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.payment.v1.PaymentAttributesByCodeData
 */
export type PaymentAttributesByCodeData = Message<"domain.payment.v1.PaymentAttributesByCodeData"> & {
    /**
     * @generated from field: string payment_id = 1;
     */
    paymentId: string;
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
 * Describes the message domain.payment.v1.PaymentAttributesByCodeData.
 * Use `create(PaymentAttributesByCodeDataSchema)` to create a new message.
 */
export declare const PaymentAttributesByCodeDataSchema: GenMessage<PaymentAttributesByCodeData>;
/**
 * @generated from message domain.payment.v1.CreatePaymentAttributesByCodeRequest
 */
export type CreatePaymentAttributesByCodeRequest = Message<"domain.payment.v1.CreatePaymentAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentAttributesByCodeData data = 1;
     */
    data?: PaymentAttributesByCodeData;
};
/**
 * Describes the message domain.payment.v1.CreatePaymentAttributesByCodeRequest.
 * Use `create(CreatePaymentAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreatePaymentAttributesByCodeRequestSchema: GenMessage<CreatePaymentAttributesByCodeRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentAttributesByCodeResponse
 */
export type CreatePaymentAttributesByCodeResponse = Message<"domain.payment.v1.CreatePaymentAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
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
 * Describes the message domain.payment.v1.CreatePaymentAttributesByCodeResponse.
 * Use `create(CreatePaymentAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreatePaymentAttributesByCodeResponseSchema: GenMessage<CreatePaymentAttributesByCodeResponse>;
/**
 * @generated from message domain.payment.v1.ReadPaymentAttributeRequest
 */
export type ReadPaymentAttributeRequest = Message<"domain.payment.v1.ReadPaymentAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentAttribute data = 1;
     */
    data?: PaymentAttribute;
};
/**
 * Describes the message domain.payment.v1.ReadPaymentAttributeRequest.
 * Use `create(ReadPaymentAttributeRequestSchema)` to create a new message.
 */
export declare const ReadPaymentAttributeRequestSchema: GenMessage<ReadPaymentAttributeRequest>;
/**
 * @generated from message domain.payment.v1.ReadPaymentAttributeResponse
 */
export type ReadPaymentAttributeResponse = Message<"domain.payment.v1.ReadPaymentAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
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
 * Describes the message domain.payment.v1.ReadPaymentAttributeResponse.
 * Use `create(ReadPaymentAttributeResponseSchema)` to create a new message.
 */
export declare const ReadPaymentAttributeResponseSchema: GenMessage<ReadPaymentAttributeResponse>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentAttributeRequest
 */
export type UpdatePaymentAttributeRequest = Message<"domain.payment.v1.UpdatePaymentAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentAttribute data = 1;
     */
    data?: PaymentAttribute;
};
/**
 * Describes the message domain.payment.v1.UpdatePaymentAttributeRequest.
 * Use `create(UpdatePaymentAttributeRequestSchema)` to create a new message.
 */
export declare const UpdatePaymentAttributeRequestSchema: GenMessage<UpdatePaymentAttributeRequest>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentAttributeResponse
 */
export type UpdatePaymentAttributeResponse = Message<"domain.payment.v1.UpdatePaymentAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
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
 * Describes the message domain.payment.v1.UpdatePaymentAttributeResponse.
 * Use `create(UpdatePaymentAttributeResponseSchema)` to create a new message.
 */
export declare const UpdatePaymentAttributeResponseSchema: GenMessage<UpdatePaymentAttributeResponse>;
/**
 * @generated from message domain.payment.v1.DeletePaymentAttributeRequest
 */
export type DeletePaymentAttributeRequest = Message<"domain.payment.v1.DeletePaymentAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentAttribute data = 1;
     */
    data?: PaymentAttribute;
};
/**
 * Describes the message domain.payment.v1.DeletePaymentAttributeRequest.
 * Use `create(DeletePaymentAttributeRequestSchema)` to create a new message.
 */
export declare const DeletePaymentAttributeRequestSchema: GenMessage<DeletePaymentAttributeRequest>;
/**
 * @generated from message domain.payment.v1.DeletePaymentAttributeResponse
 */
export type DeletePaymentAttributeResponse = Message<"domain.payment.v1.DeletePaymentAttributeResponse"> & {
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
 * Describes the message domain.payment.v1.DeletePaymentAttributeResponse.
 * Use `create(DeletePaymentAttributeResponseSchema)` to create a new message.
 */
export declare const DeletePaymentAttributeResponseSchema: GenMessage<DeletePaymentAttributeResponse>;
/**
 * @generated from message domain.payment.v1.ListPaymentAttributesRequest
 */
export type ListPaymentAttributesRequest = Message<"domain.payment.v1.ListPaymentAttributesRequest"> & {
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
 * Describes the message domain.payment.v1.ListPaymentAttributesRequest.
 * Use `create(ListPaymentAttributesRequestSchema)` to create a new message.
 */
export declare const ListPaymentAttributesRequestSchema: GenMessage<ListPaymentAttributesRequest>;
/**
 * @generated from message domain.payment.v1.ListPaymentAttributesResponse
 */
export type ListPaymentAttributesResponse = Message<"domain.payment.v1.ListPaymentAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentAttribute data = 1;
     */
    data: PaymentAttribute[];
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
 * Describes the message domain.payment.v1.ListPaymentAttributesResponse.
 * Use `create(ListPaymentAttributesResponseSchema)` to create a new message.
 */
export declare const ListPaymentAttributesResponseSchema: GenMessage<ListPaymentAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.payment.v1.GetPaymentAttributeListPageDataRequest
 */
export type GetPaymentAttributeListPageDataRequest = Message<"domain.payment.v1.GetPaymentAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.payment.v1.GetPaymentAttributeListPageDataRequest.
 * Use `create(GetPaymentAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentAttributeListPageDataRequestSchema: GenMessage<GetPaymentAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.payment.v1.GetPaymentAttributeListPageDataResponse
 */
export type GetPaymentAttributeListPageDataResponse = Message<"domain.payment.v1.GetPaymentAttributeListPageDataResponse"> & {
    /**
     * The payment attribute data
     *
     * @generated from field: repeated domain.payment.v1.PaymentAttribute payment_attribute_list = 1;
     */
    paymentAttributeList: PaymentAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.payment.v1.GetPaymentAttributeListPageDataResponse.
 * Use `create(GetPaymentAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentAttributeListPageDataResponseSchema: GenMessage<GetPaymentAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.payment.v1.GetPaymentAttributeItemPageDataRequest
 */
export type GetPaymentAttributeItemPageDataRequest = Message<"domain.payment.v1.GetPaymentAttributeItemPageDataRequest"> & {
    /**
     * The payment attribute ID to retrieve
     *
     * @generated from field: string payment_attribute_id = 1;
     */
    paymentAttributeId: string;
};
/**
 * Describes the message domain.payment.v1.GetPaymentAttributeItemPageDataRequest.
 * Use `create(GetPaymentAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentAttributeItemPageDataRequestSchema: GenMessage<GetPaymentAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.payment.v1.GetPaymentAttributeItemPageDataResponse
 */
export type GetPaymentAttributeItemPageDataResponse = Message<"domain.payment.v1.GetPaymentAttributeItemPageDataResponse"> & {
    /**
     * The payment attribute data
     *
     * @generated from field: domain.payment.v1.PaymentAttribute payment_attribute = 1;
     */
    paymentAttribute?: PaymentAttribute;
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
 * Describes the message domain.payment.v1.GetPaymentAttributeItemPageDataResponse.
 * Use `create(GetPaymentAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentAttributeItemPageDataResponseSchema: GenMessage<GetPaymentAttributeItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.PaymentAttributeDomainService
 */
export declare const PaymentAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.CreatePaymentAttribute
     */
    createPaymentAttribute: {
        methodKind: "unary";
        input: typeof CreatePaymentAttributeRequestSchema;
        output: typeof CreatePaymentAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.ReadPaymentAttribute
     */
    readPaymentAttribute: {
        methodKind: "unary";
        input: typeof ReadPaymentAttributeRequestSchema;
        output: typeof ReadPaymentAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.UpdatePaymentAttribute
     */
    updatePaymentAttribute: {
        methodKind: "unary";
        input: typeof UpdatePaymentAttributeRequestSchema;
        output: typeof UpdatePaymentAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.DeletePaymentAttribute
     */
    deletePaymentAttribute: {
        methodKind: "unary";
        input: typeof DeletePaymentAttributeRequestSchema;
        output: typeof DeletePaymentAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.ListPaymentAttributes
     */
    listPaymentAttributes: {
        methodKind: "unary";
        input: typeof ListPaymentAttributesRequestSchema;
        output: typeof ListPaymentAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.GetPaymentAttributeListPageData
     */
    getPaymentAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetPaymentAttributeListPageDataRequestSchema;
        output: typeof GetPaymentAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.payment.v1.PaymentAttributeDomainService.GetPaymentAttributeItemPageData
     */
    getPaymentAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetPaymentAttributeItemPageDataRequestSchema;
        output: typeof GetPaymentAttributeItemPageDataResponseSchema;
    };
}>;
