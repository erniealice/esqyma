import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../subscription/subscription_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/invoice/invoice.proto.
 */
export declare const file_domain_subscription_invoice_invoice: GenFile;
/**
 * @generated from message domain.subscription.v1.Invoice
 */
export type Invoice = Message<"domain.subscription.v1.Invoice"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string invoice_number = 2;
     */
    invoiceNumber: string;
    /**
     * @generated from field: double amount = 3;
     */
    amount: number;
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
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: optional domain.subscription.v1.Subscription subscription = 9;
     */
    subscription?: Subscription;
    /**
     * @generated from field: string subscription_id = 10;
     */
    subscriptionId: string;
};
/**
 * Describes the message domain.subscription.v1.Invoice.
 * Use `create(InvoiceSchema)` to create a new message.
 */
export declare const InvoiceSchema: GenMessage<Invoice>;
/**
 * @generated from message domain.subscription.v1.CreateInvoiceRequest
 */
export type CreateInvoiceRequest = Message<"domain.subscription.v1.CreateInvoiceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Invoice data = 1;
     */
    data?: Invoice;
};
/**
 * Describes the message domain.subscription.v1.CreateInvoiceRequest.
 * Use `create(CreateInvoiceRequestSchema)` to create a new message.
 */
export declare const CreateInvoiceRequestSchema: GenMessage<CreateInvoiceRequest>;
/**
 * @generated from message domain.subscription.v1.CreateInvoiceResponse
 */
export type CreateInvoiceResponse = Message<"domain.subscription.v1.CreateInvoiceResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Invoice data = 1;
     */
    data: Invoice[];
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
 * Describes the message domain.subscription.v1.CreateInvoiceResponse.
 * Use `create(CreateInvoiceResponseSchema)` to create a new message.
 */
export declare const CreateInvoiceResponseSchema: GenMessage<CreateInvoiceResponse>;
/**
 * @generated from message domain.subscription.v1.ReadInvoiceRequest
 */
export type ReadInvoiceRequest = Message<"domain.subscription.v1.ReadInvoiceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Invoice data = 1;
     */
    data?: Invoice;
};
/**
 * Describes the message domain.subscription.v1.ReadInvoiceRequest.
 * Use `create(ReadInvoiceRequestSchema)` to create a new message.
 */
export declare const ReadInvoiceRequestSchema: GenMessage<ReadInvoiceRequest>;
/**
 * @generated from message domain.subscription.v1.ReadInvoiceResponse
 */
export type ReadInvoiceResponse = Message<"domain.subscription.v1.ReadInvoiceResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Invoice data = 1;
     */
    data: Invoice[];
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
 * Describes the message domain.subscription.v1.ReadInvoiceResponse.
 * Use `create(ReadInvoiceResponseSchema)` to create a new message.
 */
export declare const ReadInvoiceResponseSchema: GenMessage<ReadInvoiceResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateInvoiceRequest
 */
export type UpdateInvoiceRequest = Message<"domain.subscription.v1.UpdateInvoiceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Invoice data = 1;
     */
    data?: Invoice;
};
/**
 * Describes the message domain.subscription.v1.UpdateInvoiceRequest.
 * Use `create(UpdateInvoiceRequestSchema)` to create a new message.
 */
export declare const UpdateInvoiceRequestSchema: GenMessage<UpdateInvoiceRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateInvoiceResponse
 */
export type UpdateInvoiceResponse = Message<"domain.subscription.v1.UpdateInvoiceResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Invoice data = 1;
     */
    data: Invoice[];
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
 * Describes the message domain.subscription.v1.UpdateInvoiceResponse.
 * Use `create(UpdateInvoiceResponseSchema)` to create a new message.
 */
export declare const UpdateInvoiceResponseSchema: GenMessage<UpdateInvoiceResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteInvoiceRequest
 */
export type DeleteInvoiceRequest = Message<"domain.subscription.v1.DeleteInvoiceRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.Invoice data = 1;
     */
    data?: Invoice;
};
/**
 * Describes the message domain.subscription.v1.DeleteInvoiceRequest.
 * Use `create(DeleteInvoiceRequestSchema)` to create a new message.
 */
export declare const DeleteInvoiceRequestSchema: GenMessage<DeleteInvoiceRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteInvoiceResponse
 */
export type DeleteInvoiceResponse = Message<"domain.subscription.v1.DeleteInvoiceResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteInvoiceResponse.
 * Use `create(DeleteInvoiceResponseSchema)` to create a new message.
 */
export declare const DeleteInvoiceResponseSchema: GenMessage<DeleteInvoiceResponse>;
/**
 * @generated from message domain.subscription.v1.ListInvoicesRequest
 */
export type ListInvoicesRequest = Message<"domain.subscription.v1.ListInvoicesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListInvoicesRequest.
 * Use `create(ListInvoicesRequestSchema)` to create a new message.
 */
export declare const ListInvoicesRequestSchema: GenMessage<ListInvoicesRequest>;
/**
 * @generated from message domain.subscription.v1.ListInvoicesResponse
 */
export type ListInvoicesResponse = Message<"domain.subscription.v1.ListInvoicesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Invoice data = 1;
     */
    data: Invoice[];
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
 * Describes the message domain.subscription.v1.ListInvoicesResponse.
 * Use `create(ListInvoicesResponseSchema)` to create a new message.
 */
export declare const ListInvoicesResponseSchema: GenMessage<ListInvoicesResponse>;
/**
 * NEW: Enhanced list page data request with pagination, filtering, sorting, search
 *
 * @generated from message domain.subscription.v1.GetInvoiceListPageDataRequest
 */
export type GetInvoiceListPageDataRequest = Message<"domain.subscription.v1.GetInvoiceListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetInvoiceListPageDataRequest.
 * Use `create(GetInvoiceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInvoiceListPageDataRequestSchema: GenMessage<GetInvoiceListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetInvoiceListPageDataResponse
 */
export type GetInvoiceListPageDataResponse = Message<"domain.subscription.v1.GetInvoiceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.Invoice invoice_list = 1;
     */
    invoiceList: Invoice[];
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
 * Describes the message domain.subscription.v1.GetInvoiceListPageDataResponse.
 * Use `create(GetInvoiceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInvoiceListPageDataResponseSchema: GenMessage<GetInvoiceListPageDataResponse>;
/**
 * NEW: Enhanced item page data request
 *
 * @generated from message domain.subscription.v1.GetInvoiceItemPageDataRequest
 */
export type GetInvoiceItemPageDataRequest = Message<"domain.subscription.v1.GetInvoiceItemPageDataRequest"> & {
    /**
     * @generated from field: string invoice_id = 1;
     */
    invoiceId: string;
};
/**
 * Describes the message domain.subscription.v1.GetInvoiceItemPageDataRequest.
 * Use `create(GetInvoiceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInvoiceItemPageDataRequestSchema: GenMessage<GetInvoiceItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetInvoiceItemPageDataResponse
 */
export type GetInvoiceItemPageDataResponse = Message<"domain.subscription.v1.GetInvoiceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.Invoice invoice = 1;
     */
    invoice?: Invoice;
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
 * Describes the message domain.subscription.v1.GetInvoiceItemPageDataResponse.
 * Use `create(GetInvoiceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInvoiceItemPageDataResponseSchema: GenMessage<GetInvoiceItemPageDataResponse>;
/**
 * @generated from service domain.subscription.v1.InvoiceDomainService
 */
export declare const InvoiceDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.CreateInvoice
     */
    createInvoice: {
        methodKind: "unary";
        input: typeof CreateInvoiceRequestSchema;
        output: typeof CreateInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.ReadInvoice
     */
    readInvoice: {
        methodKind: "unary";
        input: typeof ReadInvoiceRequestSchema;
        output: typeof ReadInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.UpdateInvoice
     */
    updateInvoice: {
        methodKind: "unary";
        input: typeof UpdateInvoiceRequestSchema;
        output: typeof UpdateInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.DeleteInvoice
     */
    deleteInvoice: {
        methodKind: "unary";
        input: typeof DeleteInvoiceRequestSchema;
        output: typeof DeleteInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.ListInvoices
     */
    listInvoices: {
        methodKind: "unary";
        input: typeof ListInvoicesRequestSchema;
        output: typeof ListInvoicesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.GetInvoiceListPageData
     */
    getInvoiceListPageData: {
        methodKind: "unary";
        input: typeof GetInvoiceListPageDataRequestSchema;
        output: typeof GetInvoiceListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.subscription.v1.InvoiceDomainService.GetInvoiceItemPageData
     */
    getInvoiceItemPageData: {
        methodKind: "unary";
        input: typeof GetInvoiceItemPageDataRequestSchema;
        output: typeof GetInvoiceItemPageDataResponseSchema;
    };
}>;
