import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Invoice } from "../invoice/invoice_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/invoice_attribute/invoice_attribute.proto.
 */
export declare const file_domain_subscription_invoice_attribute_invoice_attribute: GenFile;
/**
 * @generated from message domain.subscription.v1.InvoiceAttribute
 */
export type InvoiceAttribute = Message<"domain.subscription.v1.InvoiceAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string invoice_id = 2;
     */
    invoiceId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.subscription.v1.Invoice invoice = 5;
     */
    invoice?: Invoice;
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
 * Describes the message domain.subscription.v1.InvoiceAttribute.
 * Use `create(InvoiceAttributeSchema)` to create a new message.
 */
export declare const InvoiceAttributeSchema: GenMessage<InvoiceAttribute>;
/**
 * @generated from message domain.subscription.v1.CreateInvoiceAttributeRequest
 */
export type CreateInvoiceAttributeRequest = Message<"domain.subscription.v1.CreateInvoiceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data?: InvoiceAttribute;
};
/**
 * Describes the message domain.subscription.v1.CreateInvoiceAttributeRequest.
 * Use `create(CreateInvoiceAttributeRequestSchema)` to create a new message.
 */
export declare const CreateInvoiceAttributeRequestSchema: GenMessage<CreateInvoiceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.CreateInvoiceAttributeResponse
 */
export type CreateInvoiceAttributeResponse = Message<"domain.subscription.v1.CreateInvoiceAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data: InvoiceAttribute[];
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
 * Describes the message domain.subscription.v1.CreateInvoiceAttributeResponse.
 * Use `create(CreateInvoiceAttributeResponseSchema)` to create a new message.
 */
export declare const CreateInvoiceAttributeResponseSchema: GenMessage<CreateInvoiceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ReadInvoiceAttributeRequest
 */
export type ReadInvoiceAttributeRequest = Message<"domain.subscription.v1.ReadInvoiceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data?: InvoiceAttribute;
};
/**
 * Describes the message domain.subscription.v1.ReadInvoiceAttributeRequest.
 * Use `create(ReadInvoiceAttributeRequestSchema)` to create a new message.
 */
export declare const ReadInvoiceAttributeRequestSchema: GenMessage<ReadInvoiceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.ReadInvoiceAttributeResponse
 */
export type ReadInvoiceAttributeResponse = Message<"domain.subscription.v1.ReadInvoiceAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data: InvoiceAttribute[];
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
 * Describes the message domain.subscription.v1.ReadInvoiceAttributeResponse.
 * Use `create(ReadInvoiceAttributeResponseSchema)` to create a new message.
 */
export declare const ReadInvoiceAttributeResponseSchema: GenMessage<ReadInvoiceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateInvoiceAttributeRequest
 */
export type UpdateInvoiceAttributeRequest = Message<"domain.subscription.v1.UpdateInvoiceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data?: InvoiceAttribute;
};
/**
 * Describes the message domain.subscription.v1.UpdateInvoiceAttributeRequest.
 * Use `create(UpdateInvoiceAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateInvoiceAttributeRequestSchema: GenMessage<UpdateInvoiceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateInvoiceAttributeResponse
 */
export type UpdateInvoiceAttributeResponse = Message<"domain.subscription.v1.UpdateInvoiceAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data: InvoiceAttribute[];
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
 * Describes the message domain.subscription.v1.UpdateInvoiceAttributeResponse.
 * Use `create(UpdateInvoiceAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateInvoiceAttributeResponseSchema: GenMessage<UpdateInvoiceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteInvoiceAttributeRequest
 */
export type DeleteInvoiceAttributeRequest = Message<"domain.subscription.v1.DeleteInvoiceAttributeRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data?: InvoiceAttribute;
};
/**
 * Describes the message domain.subscription.v1.DeleteInvoiceAttributeRequest.
 * Use `create(DeleteInvoiceAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteInvoiceAttributeRequestSchema: GenMessage<DeleteInvoiceAttributeRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteInvoiceAttributeResponse
 */
export type DeleteInvoiceAttributeResponse = Message<"domain.subscription.v1.DeleteInvoiceAttributeResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteInvoiceAttributeResponse.
 * Use `create(DeleteInvoiceAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteInvoiceAttributeResponseSchema: GenMessage<DeleteInvoiceAttributeResponse>;
/**
 * @generated from message domain.subscription.v1.ListInvoiceAttributesRequest
 */
export type ListInvoiceAttributesRequest = Message<"domain.subscription.v1.ListInvoiceAttributesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListInvoiceAttributesRequest.
 * Use `create(ListInvoiceAttributesRequestSchema)` to create a new message.
 */
export declare const ListInvoiceAttributesRequestSchema: GenMessage<ListInvoiceAttributesRequest>;
/**
 * @generated from message domain.subscription.v1.ListInvoiceAttributesResponse
 */
export type ListInvoiceAttributesResponse = Message<"domain.subscription.v1.ListInvoiceAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.InvoiceAttribute data = 1;
     */
    data: InvoiceAttribute[];
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
 * Describes the message domain.subscription.v1.ListInvoiceAttributesResponse.
 * Use `create(ListInvoiceAttributesResponseSchema)` to create a new message.
 */
export declare const ListInvoiceAttributesResponseSchema: GenMessage<ListInvoiceAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.subscription.v1.GetInvoiceAttributeListPageDataRequest
 */
export type GetInvoiceAttributeListPageDataRequest = Message<"domain.subscription.v1.GetInvoiceAttributeListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetInvoiceAttributeListPageDataRequest.
 * Use `create(GetInvoiceAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInvoiceAttributeListPageDataRequestSchema: GenMessage<GetInvoiceAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.subscription.v1.GetInvoiceAttributeListPageDataResponse
 */
export type GetInvoiceAttributeListPageDataResponse = Message<"domain.subscription.v1.GetInvoiceAttributeListPageDataResponse"> & {
    /**
     * The invoice attribute data
     *
     * @generated from field: repeated domain.subscription.v1.InvoiceAttribute invoice_attribute_list = 1;
     */
    invoiceAttributeList: InvoiceAttribute[];
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
 * Describes the message domain.subscription.v1.GetInvoiceAttributeListPageDataResponse.
 * Use `create(GetInvoiceAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInvoiceAttributeListPageDataResponseSchema: GenMessage<GetInvoiceAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.subscription.v1.GetInvoiceAttributeItemPageDataRequest
 */
export type GetInvoiceAttributeItemPageDataRequest = Message<"domain.subscription.v1.GetInvoiceAttributeItemPageDataRequest"> & {
    /**
     * The invoice attribute ID to retrieve
     *
     * @generated from field: string invoice_attribute_id = 1;
     */
    invoiceAttributeId: string;
};
/**
 * Describes the message domain.subscription.v1.GetInvoiceAttributeItemPageDataRequest.
 * Use `create(GetInvoiceAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInvoiceAttributeItemPageDataRequestSchema: GenMessage<GetInvoiceAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.subscription.v1.GetInvoiceAttributeItemPageDataResponse
 */
export type GetInvoiceAttributeItemPageDataResponse = Message<"domain.subscription.v1.GetInvoiceAttributeItemPageDataResponse"> & {
    /**
     * The invoice attribute data
     *
     * @generated from field: domain.subscription.v1.InvoiceAttribute invoice_attribute = 1;
     */
    invoiceAttribute?: InvoiceAttribute;
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
 * Describes the message domain.subscription.v1.GetInvoiceAttributeItemPageDataResponse.
 * Use `create(GetInvoiceAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInvoiceAttributeItemPageDataResponseSchema: GenMessage<GetInvoiceAttributeItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.InvoiceAttributeDomainService
 */
export declare const InvoiceAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.CreateInvoiceAttribute
     */
    createInvoiceAttribute: {
        methodKind: "unary";
        input: typeof CreateInvoiceAttributeRequestSchema;
        output: typeof CreateInvoiceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.ReadInvoiceAttribute
     */
    readInvoiceAttribute: {
        methodKind: "unary";
        input: typeof ReadInvoiceAttributeRequestSchema;
        output: typeof ReadInvoiceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.UpdateInvoiceAttribute
     */
    updateInvoiceAttribute: {
        methodKind: "unary";
        input: typeof UpdateInvoiceAttributeRequestSchema;
        output: typeof UpdateInvoiceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.DeleteInvoiceAttribute
     */
    deleteInvoiceAttribute: {
        methodKind: "unary";
        input: typeof DeleteInvoiceAttributeRequestSchema;
        output: typeof DeleteInvoiceAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.ListInvoiceAttributes
     */
    listInvoiceAttributes: {
        methodKind: "unary";
        input: typeof ListInvoiceAttributesRequestSchema;
        output: typeof ListInvoiceAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.GetInvoiceAttributeListPageData
     */
    getInvoiceAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetInvoiceAttributeListPageDataRequestSchema;
        output: typeof GetInvoiceAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.InvoiceAttributeDomainService.GetInvoiceAttributeItemPageData
     */
    getInvoiceAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetInvoiceAttributeItemPageDataRequestSchema;
        output: typeof GetInvoiceAttributeItemPageDataResponseSchema;
    };
}>;
