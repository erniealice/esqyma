import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tenancy/tenant_invoice/tenant_invoice.proto.
 */
export declare const file_domain_tenancy_tenant_invoice_tenant_invoice: GenFile;
/**
 * TenantInvoice represents a billing invoice issued by Ichizen to a workspace
 * for their platform subscription. Linked to TenantSubscription for the billing
 * period it covers. Amounts in centavos.
 *
 * @generated from message domain.tenancy.v1.TenantInvoice
 */
export type TenantInvoice = Message<"domain.tenancy.v1.TenantInvoice"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 3;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 5;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * @generated from field: string tenant_subscription_id = 8;
     */
    tenantSubscriptionId: string;
    /**
     * human-facing invoice number
     *
     * @generated from field: string number = 9;
     */
    number: string;
    /**
     * @generated from field: domain.tenancy.v1.TenantInvoiceStatus status = 10;
     */
    status: TenantInvoiceStatus;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 11;
     */
    amount: bigint;
    /**
     * ISO 4217
     *
     * @generated from field: string currency = 12;
     */
    currency: string;
    /**
     * ISO 8601 datetime
     *
     * @generated from field: string issued_at = 13;
     */
    issuedAt: string;
    /**
     * @generated from field: optional string paid_at = 14;
     */
    paidAt?: string;
    /**
     * @generated from field: optional string due_at = 15;
     */
    dueAt?: string;
    /**
     * signed URL to PDF, cached
     *
     * @generated from field: optional string download_url = 16;
     */
    downloadUrl?: string;
    /**
     * Ichizen master billing ref
     *
     * @generated from field: optional string external_ref = 17;
     */
    externalRef?: string;
};
/**
 * Describes the message domain.tenancy.v1.TenantInvoice.
 * Use `create(TenantInvoiceSchema)` to create a new message.
 */
export declare const TenantInvoiceSchema: GenMessage<TenantInvoice>;
/**
 * @generated from message domain.tenancy.v1.CreateTenantInvoiceRequest
 */
export type CreateTenantInvoiceRequest = Message<"domain.tenancy.v1.CreateTenantInvoiceRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantInvoice data = 1;
     */
    data?: TenantInvoice;
};
/**
 * Describes the message domain.tenancy.v1.CreateTenantInvoiceRequest.
 * Use `create(CreateTenantInvoiceRequestSchema)` to create a new message.
 */
export declare const CreateTenantInvoiceRequestSchema: GenMessage<CreateTenantInvoiceRequest>;
/**
 * @generated from message domain.tenancy.v1.CreateTenantInvoiceResponse
 */
export type CreateTenantInvoiceResponse = Message<"domain.tenancy.v1.CreateTenantInvoiceResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantInvoice data = 1;
     */
    data: TenantInvoice[];
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
 * Describes the message domain.tenancy.v1.CreateTenantInvoiceResponse.
 * Use `create(CreateTenantInvoiceResponseSchema)` to create a new message.
 */
export declare const CreateTenantInvoiceResponseSchema: GenMessage<CreateTenantInvoiceResponse>;
/**
 * @generated from message domain.tenancy.v1.ReadTenantInvoiceRequest
 */
export type ReadTenantInvoiceRequest = Message<"domain.tenancy.v1.ReadTenantInvoiceRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantInvoice data = 1;
     */
    data?: TenantInvoice;
};
/**
 * Describes the message domain.tenancy.v1.ReadTenantInvoiceRequest.
 * Use `create(ReadTenantInvoiceRequestSchema)` to create a new message.
 */
export declare const ReadTenantInvoiceRequestSchema: GenMessage<ReadTenantInvoiceRequest>;
/**
 * @generated from message domain.tenancy.v1.ReadTenantInvoiceResponse
 */
export type ReadTenantInvoiceResponse = Message<"domain.tenancy.v1.ReadTenantInvoiceResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantInvoice data = 1;
     */
    data: TenantInvoice[];
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
 * Describes the message domain.tenancy.v1.ReadTenantInvoiceResponse.
 * Use `create(ReadTenantInvoiceResponseSchema)` to create a new message.
 */
export declare const ReadTenantInvoiceResponseSchema: GenMessage<ReadTenantInvoiceResponse>;
/**
 * @generated from message domain.tenancy.v1.UpdateTenantInvoiceRequest
 */
export type UpdateTenantInvoiceRequest = Message<"domain.tenancy.v1.UpdateTenantInvoiceRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantInvoice data = 1;
     */
    data?: TenantInvoice;
};
/**
 * Describes the message domain.tenancy.v1.UpdateTenantInvoiceRequest.
 * Use `create(UpdateTenantInvoiceRequestSchema)` to create a new message.
 */
export declare const UpdateTenantInvoiceRequestSchema: GenMessage<UpdateTenantInvoiceRequest>;
/**
 * @generated from message domain.tenancy.v1.UpdateTenantInvoiceResponse
 */
export type UpdateTenantInvoiceResponse = Message<"domain.tenancy.v1.UpdateTenantInvoiceResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantInvoice data = 1;
     */
    data: TenantInvoice[];
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
 * Describes the message domain.tenancy.v1.UpdateTenantInvoiceResponse.
 * Use `create(UpdateTenantInvoiceResponseSchema)` to create a new message.
 */
export declare const UpdateTenantInvoiceResponseSchema: GenMessage<UpdateTenantInvoiceResponse>;
/**
 * @generated from message domain.tenancy.v1.DeleteTenantInvoiceRequest
 */
export type DeleteTenantInvoiceRequest = Message<"domain.tenancy.v1.DeleteTenantInvoiceRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantInvoice data = 1;
     */
    data?: TenantInvoice;
};
/**
 * Describes the message domain.tenancy.v1.DeleteTenantInvoiceRequest.
 * Use `create(DeleteTenantInvoiceRequestSchema)` to create a new message.
 */
export declare const DeleteTenantInvoiceRequestSchema: GenMessage<DeleteTenantInvoiceRequest>;
/**
 * @generated from message domain.tenancy.v1.DeleteTenantInvoiceResponse
 */
export type DeleteTenantInvoiceResponse = Message<"domain.tenancy.v1.DeleteTenantInvoiceResponse"> & {
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
 * Describes the message domain.tenancy.v1.DeleteTenantInvoiceResponse.
 * Use `create(DeleteTenantInvoiceResponseSchema)` to create a new message.
 */
export declare const DeleteTenantInvoiceResponseSchema: GenMessage<DeleteTenantInvoiceResponse>;
/**
 * @generated from message domain.tenancy.v1.ListTenantInvoicesRequest
 */
export type ListTenantInvoicesRequest = Message<"domain.tenancy.v1.ListTenantInvoicesRequest"> & {
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
 * Describes the message domain.tenancy.v1.ListTenantInvoicesRequest.
 * Use `create(ListTenantInvoicesRequestSchema)` to create a new message.
 */
export declare const ListTenantInvoicesRequestSchema: GenMessage<ListTenantInvoicesRequest>;
/**
 * @generated from message domain.tenancy.v1.ListTenantInvoicesResponse
 */
export type ListTenantInvoicesResponse = Message<"domain.tenancy.v1.ListTenantInvoicesResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantInvoice data = 1;
     */
    data: TenantInvoice[];
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
 * Describes the message domain.tenancy.v1.ListTenantInvoicesResponse.
 * Use `create(ListTenantInvoicesResponseSchema)` to create a new message.
 */
export declare const ListTenantInvoicesResponseSchema: GenMessage<ListTenantInvoicesResponse>;
/**
 * @generated from message domain.tenancy.v1.GetTenantInvoiceListPageDataRequest
 */
export type GetTenantInvoiceListPageDataRequest = Message<"domain.tenancy.v1.GetTenantInvoiceListPageDataRequest"> & {
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
 * Describes the message domain.tenancy.v1.GetTenantInvoiceListPageDataRequest.
 * Use `create(GetTenantInvoiceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTenantInvoiceListPageDataRequestSchema: GenMessage<GetTenantInvoiceListPageDataRequest>;
/**
 * @generated from message domain.tenancy.v1.GetTenantInvoiceListPageDataResponse
 */
export type GetTenantInvoiceListPageDataResponse = Message<"domain.tenancy.v1.GetTenantInvoiceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantInvoice tenant_invoice_list = 1;
     */
    tenantInvoiceList: TenantInvoice[];
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
 * Describes the message domain.tenancy.v1.GetTenantInvoiceListPageDataResponse.
 * Use `create(GetTenantInvoiceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTenantInvoiceListPageDataResponseSchema: GenMessage<GetTenantInvoiceListPageDataResponse>;
/**
 * @generated from message domain.tenancy.v1.GetTenantInvoiceItemPageDataRequest
 */
export type GetTenantInvoiceItemPageDataRequest = Message<"domain.tenancy.v1.GetTenantInvoiceItemPageDataRequest"> & {
    /**
     * @generated from field: string tenant_invoice_id = 1;
     */
    tenantInvoiceId: string;
};
/**
 * Describes the message domain.tenancy.v1.GetTenantInvoiceItemPageDataRequest.
 * Use `create(GetTenantInvoiceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTenantInvoiceItemPageDataRequestSchema: GenMessage<GetTenantInvoiceItemPageDataRequest>;
/**
 * @generated from message domain.tenancy.v1.GetTenantInvoiceItemPageDataResponse
 */
export type GetTenantInvoiceItemPageDataResponse = Message<"domain.tenancy.v1.GetTenantInvoiceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tenancy.v1.TenantInvoice tenant_invoice = 1;
     */
    tenantInvoice?: TenantInvoice;
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
 * Describes the message domain.tenancy.v1.GetTenantInvoiceItemPageDataResponse.
 * Use `create(GetTenantInvoiceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTenantInvoiceItemPageDataResponseSchema: GenMessage<GetTenantInvoiceItemPageDataResponse>;
/**
 * TenantInvoiceStatus tracks the billing lifecycle of a platform invoice.
 *
 * @generated from enum domain.tenancy.v1.TenantInvoiceStatus
 */
export declare enum TenantInvoiceStatus {
    /**
     * @generated from enum value: TENANT_INVOICE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TENANT_INVOICE_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: TENANT_INVOICE_STATUS_ISSUED = 2;
     */
    ISSUED = 2,
    /**
     * @generated from enum value: TENANT_INVOICE_STATUS_PAID = 3;
     */
    PAID = 3,
    /**
     * @generated from enum value: TENANT_INVOICE_STATUS_FAILED = 4;
     */
    FAILED = 4,
    /**
     * @generated from enum value: TENANT_INVOICE_STATUS_VOIDED = 5;
     */
    VOIDED = 5
}
/**
 * Describes the enum domain.tenancy.v1.TenantInvoiceStatus.
 */
export declare const TenantInvoiceStatusSchema: GenEnum<TenantInvoiceStatus>;
/**
 * @generated from service domain.tenancy.v1.TenantInvoiceDomainService
 */
export declare const TenantInvoiceDomainService: GenService<{
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.CreateTenantInvoice
     */
    createTenantInvoice: {
        methodKind: "unary";
        input: typeof CreateTenantInvoiceRequestSchema;
        output: typeof CreateTenantInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.ReadTenantInvoice
     */
    readTenantInvoice: {
        methodKind: "unary";
        input: typeof ReadTenantInvoiceRequestSchema;
        output: typeof ReadTenantInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.UpdateTenantInvoice
     */
    updateTenantInvoice: {
        methodKind: "unary";
        input: typeof UpdateTenantInvoiceRequestSchema;
        output: typeof UpdateTenantInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.DeleteTenantInvoice
     */
    deleteTenantInvoice: {
        methodKind: "unary";
        input: typeof DeleteTenantInvoiceRequestSchema;
        output: typeof DeleteTenantInvoiceResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.ListTenantInvoices
     */
    listTenantInvoices: {
        methodKind: "unary";
        input: typeof ListTenantInvoicesRequestSchema;
        output: typeof ListTenantInvoicesResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.GetTenantInvoiceListPageData
     */
    getTenantInvoiceListPageData: {
        methodKind: "unary";
        input: typeof GetTenantInvoiceListPageDataRequestSchema;
        output: typeof GetTenantInvoiceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantInvoiceDomainService.GetTenantInvoiceItemPageData
     */
    getTenantInvoiceItemPageData: {
        methodKind: "unary";
        input: typeof GetTenantInvoiceItemPageDataRequestSchema;
        output: typeof GetTenantInvoiceItemPageDataResponseSchema;
    };
}>;
