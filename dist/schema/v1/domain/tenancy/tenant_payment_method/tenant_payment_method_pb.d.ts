import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tenancy/tenant_payment_method/tenant_payment_method.proto.
 */
export declare const file_domain_tenancy_tenant_payment_method_tenant_payment_method: GenFile;
/**
 * TenantPaymentCardDetails holds PCI-safe tokenized card metadata.
 *
 * @generated from message domain.tenancy.v1.TenantPaymentCardDetails
 */
export type TenantPaymentCardDetails = Message<"domain.tenancy.v1.TenantPaymentCardDetails"> & {
    /**
     * "visa" | "mastercard" | "amex" | ...
     *
     * @generated from field: string card_brand = 1;
     */
    cardBrand: string;
    /**
     * @generated from field: string last_four = 2;
     */
    lastFour: string;
    /**
     * @generated from field: int32 expiry_month = 3;
     */
    expiryMonth: number;
    /**
     * @generated from field: int32 expiry_year = 4;
     */
    expiryYear: number;
};
/**
 * Describes the message domain.tenancy.v1.TenantPaymentCardDetails.
 * Use `create(TenantPaymentCardDetailsSchema)` to create a new message.
 */
export declare const TenantPaymentCardDetailsSchema: GenMessage<TenantPaymentCardDetails>;
/**
 * TenantPaymentBankAccountDetails holds bank account metadata (no account number stored).
 *
 * @generated from message domain.tenancy.v1.TenantPaymentBankAccountDetails
 */
export type TenantPaymentBankAccountDetails = Message<"domain.tenancy.v1.TenantPaymentBankAccountDetails"> & {
    /**
     * @generated from field: string bank_name = 1;
     */
    bankName: string;
    /**
     * @generated from field: string last_four = 2;
     */
    lastFour: string;
};
/**
 * Describes the message domain.tenancy.v1.TenantPaymentBankAccountDetails.
 * Use `create(TenantPaymentBankAccountDetailsSchema)` to create a new message.
 */
export declare const TenantPaymentBankAccountDetailsSchema: GenMessage<TenantPaymentBankAccountDetails>;
/**
 * TenantPaymentMethod represents a workspace's stored payment instrument for
 * Ichizen platform billing. At most one default method per workspace is enforced
 * by a partial unique index on (workspace_id) WHERE is_default = true.
 *
 * @generated from message domain.tenancy.v1.TenantPaymentMethod
 */
export type TenantPaymentMethod = Message<"domain.tenancy.v1.TenantPaymentMethod"> & {
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
     * "Visa ending 4242"
     *
     * @generated from field: string display_label = 8;
     */
    displayLabel: string;
    /**
     * @generated from oneof domain.tenancy.v1.TenantPaymentMethod.method_details
     */
    methodDetails: {
        /**
         * @generated from field: domain.tenancy.v1.TenantPaymentCardDetails card = 9;
         */
        value: TenantPaymentCardDetails;
        case: "card";
    } | {
        /**
         * @generated from field: domain.tenancy.v1.TenantPaymentBankAccountDetails bank_account = 10;
         */
        value: TenantPaymentBankAccountDetails;
        case: "bankAccount";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * "stripe" | "paypal" | "bank_transfer"
     *
     * @generated from field: optional string provider_name = 11;
     */
    providerName?: string;
    /**
     * PCI-safe token; never the PAN
     *
     * @generated from field: optional string provider_token = 12;
     */
    providerToken?: string;
    /**
     * @generated from field: bool is_default = 13;
     */
    isDefault: boolean;
};
/**
 * Describes the message domain.tenancy.v1.TenantPaymentMethod.
 * Use `create(TenantPaymentMethodSchema)` to create a new message.
 */
export declare const TenantPaymentMethodSchema: GenMessage<TenantPaymentMethod>;
/**
 * @generated from message domain.tenancy.v1.CreateTenantPaymentMethodRequest
 */
export type CreateTenantPaymentMethodRequest = Message<"domain.tenancy.v1.CreateTenantPaymentMethodRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data?: TenantPaymentMethod;
};
/**
 * Describes the message domain.tenancy.v1.CreateTenantPaymentMethodRequest.
 * Use `create(CreateTenantPaymentMethodRequestSchema)` to create a new message.
 */
export declare const CreateTenantPaymentMethodRequestSchema: GenMessage<CreateTenantPaymentMethodRequest>;
/**
 * @generated from message domain.tenancy.v1.CreateTenantPaymentMethodResponse
 */
export type CreateTenantPaymentMethodResponse = Message<"domain.tenancy.v1.CreateTenantPaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data: TenantPaymentMethod[];
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
 * Describes the message domain.tenancy.v1.CreateTenantPaymentMethodResponse.
 * Use `create(CreateTenantPaymentMethodResponseSchema)` to create a new message.
 */
export declare const CreateTenantPaymentMethodResponseSchema: GenMessage<CreateTenantPaymentMethodResponse>;
/**
 * @generated from message domain.tenancy.v1.ReadTenantPaymentMethodRequest
 */
export type ReadTenantPaymentMethodRequest = Message<"domain.tenancy.v1.ReadTenantPaymentMethodRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data?: TenantPaymentMethod;
};
/**
 * Describes the message domain.tenancy.v1.ReadTenantPaymentMethodRequest.
 * Use `create(ReadTenantPaymentMethodRequestSchema)` to create a new message.
 */
export declare const ReadTenantPaymentMethodRequestSchema: GenMessage<ReadTenantPaymentMethodRequest>;
/**
 * @generated from message domain.tenancy.v1.ReadTenantPaymentMethodResponse
 */
export type ReadTenantPaymentMethodResponse = Message<"domain.tenancy.v1.ReadTenantPaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data: TenantPaymentMethod[];
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
 * Describes the message domain.tenancy.v1.ReadTenantPaymentMethodResponse.
 * Use `create(ReadTenantPaymentMethodResponseSchema)` to create a new message.
 */
export declare const ReadTenantPaymentMethodResponseSchema: GenMessage<ReadTenantPaymentMethodResponse>;
/**
 * @generated from message domain.tenancy.v1.UpdateTenantPaymentMethodRequest
 */
export type UpdateTenantPaymentMethodRequest = Message<"domain.tenancy.v1.UpdateTenantPaymentMethodRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data?: TenantPaymentMethod;
};
/**
 * Describes the message domain.tenancy.v1.UpdateTenantPaymentMethodRequest.
 * Use `create(UpdateTenantPaymentMethodRequestSchema)` to create a new message.
 */
export declare const UpdateTenantPaymentMethodRequestSchema: GenMessage<UpdateTenantPaymentMethodRequest>;
/**
 * @generated from message domain.tenancy.v1.UpdateTenantPaymentMethodResponse
 */
export type UpdateTenantPaymentMethodResponse = Message<"domain.tenancy.v1.UpdateTenantPaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data: TenantPaymentMethod[];
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
 * Describes the message domain.tenancy.v1.UpdateTenantPaymentMethodResponse.
 * Use `create(UpdateTenantPaymentMethodResponseSchema)` to create a new message.
 */
export declare const UpdateTenantPaymentMethodResponseSchema: GenMessage<UpdateTenantPaymentMethodResponse>;
/**
 * @generated from message domain.tenancy.v1.DeleteTenantPaymentMethodRequest
 */
export type DeleteTenantPaymentMethodRequest = Message<"domain.tenancy.v1.DeleteTenantPaymentMethodRequest"> & {
    /**
     * @generated from field: domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data?: TenantPaymentMethod;
};
/**
 * Describes the message domain.tenancy.v1.DeleteTenantPaymentMethodRequest.
 * Use `create(DeleteTenantPaymentMethodRequestSchema)` to create a new message.
 */
export declare const DeleteTenantPaymentMethodRequestSchema: GenMessage<DeleteTenantPaymentMethodRequest>;
/**
 * @generated from message domain.tenancy.v1.DeleteTenantPaymentMethodResponse
 */
export type DeleteTenantPaymentMethodResponse = Message<"domain.tenancy.v1.DeleteTenantPaymentMethodResponse"> & {
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
 * Describes the message domain.tenancy.v1.DeleteTenantPaymentMethodResponse.
 * Use `create(DeleteTenantPaymentMethodResponseSchema)` to create a new message.
 */
export declare const DeleteTenantPaymentMethodResponseSchema: GenMessage<DeleteTenantPaymentMethodResponse>;
/**
 * @generated from message domain.tenancy.v1.ListTenantPaymentMethodsRequest
 */
export type ListTenantPaymentMethodsRequest = Message<"domain.tenancy.v1.ListTenantPaymentMethodsRequest"> & {
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
 * Describes the message domain.tenancy.v1.ListTenantPaymentMethodsRequest.
 * Use `create(ListTenantPaymentMethodsRequestSchema)` to create a new message.
 */
export declare const ListTenantPaymentMethodsRequestSchema: GenMessage<ListTenantPaymentMethodsRequest>;
/**
 * @generated from message domain.tenancy.v1.ListTenantPaymentMethodsResponse
 */
export type ListTenantPaymentMethodsResponse = Message<"domain.tenancy.v1.ListTenantPaymentMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantPaymentMethod data = 1;
     */
    data: TenantPaymentMethod[];
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
 * Describes the message domain.tenancy.v1.ListTenantPaymentMethodsResponse.
 * Use `create(ListTenantPaymentMethodsResponseSchema)` to create a new message.
 */
export declare const ListTenantPaymentMethodsResponseSchema: GenMessage<ListTenantPaymentMethodsResponse>;
/**
 * @generated from message domain.tenancy.v1.GetTenantPaymentMethodListPageDataRequest
 */
export type GetTenantPaymentMethodListPageDataRequest = Message<"domain.tenancy.v1.GetTenantPaymentMethodListPageDataRequest"> & {
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
 * Describes the message domain.tenancy.v1.GetTenantPaymentMethodListPageDataRequest.
 * Use `create(GetTenantPaymentMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTenantPaymentMethodListPageDataRequestSchema: GenMessage<GetTenantPaymentMethodListPageDataRequest>;
/**
 * @generated from message domain.tenancy.v1.GetTenantPaymentMethodListPageDataResponse
 */
export type GetTenantPaymentMethodListPageDataResponse = Message<"domain.tenancy.v1.GetTenantPaymentMethodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tenancy.v1.TenantPaymentMethod tenant_payment_method_list = 1;
     */
    tenantPaymentMethodList: TenantPaymentMethod[];
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
 * Describes the message domain.tenancy.v1.GetTenantPaymentMethodListPageDataResponse.
 * Use `create(GetTenantPaymentMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTenantPaymentMethodListPageDataResponseSchema: GenMessage<GetTenantPaymentMethodListPageDataResponse>;
/**
 * @generated from message domain.tenancy.v1.GetTenantPaymentMethodItemPageDataRequest
 */
export type GetTenantPaymentMethodItemPageDataRequest = Message<"domain.tenancy.v1.GetTenantPaymentMethodItemPageDataRequest"> & {
    /**
     * @generated from field: string tenant_payment_method_id = 1;
     */
    tenantPaymentMethodId: string;
};
/**
 * Describes the message domain.tenancy.v1.GetTenantPaymentMethodItemPageDataRequest.
 * Use `create(GetTenantPaymentMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTenantPaymentMethodItemPageDataRequestSchema: GenMessage<GetTenantPaymentMethodItemPageDataRequest>;
/**
 * @generated from message domain.tenancy.v1.GetTenantPaymentMethodItemPageDataResponse
 */
export type GetTenantPaymentMethodItemPageDataResponse = Message<"domain.tenancy.v1.GetTenantPaymentMethodItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tenancy.v1.TenantPaymentMethod tenant_payment_method = 1;
     */
    tenantPaymentMethod?: TenantPaymentMethod;
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
 * Describes the message domain.tenancy.v1.GetTenantPaymentMethodItemPageDataResponse.
 * Use `create(GetTenantPaymentMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTenantPaymentMethodItemPageDataResponseSchema: GenMessage<GetTenantPaymentMethodItemPageDataResponse>;
/**
 * @generated from service domain.tenancy.v1.TenantPaymentMethodDomainService
 */
export declare const TenantPaymentMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.CreateTenantPaymentMethod
     */
    createTenantPaymentMethod: {
        methodKind: "unary";
        input: typeof CreateTenantPaymentMethodRequestSchema;
        output: typeof CreateTenantPaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.ReadTenantPaymentMethod
     */
    readTenantPaymentMethod: {
        methodKind: "unary";
        input: typeof ReadTenantPaymentMethodRequestSchema;
        output: typeof ReadTenantPaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.UpdateTenantPaymentMethod
     */
    updateTenantPaymentMethod: {
        methodKind: "unary";
        input: typeof UpdateTenantPaymentMethodRequestSchema;
        output: typeof UpdateTenantPaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.DeleteTenantPaymentMethod
     */
    deleteTenantPaymentMethod: {
        methodKind: "unary";
        input: typeof DeleteTenantPaymentMethodRequestSchema;
        output: typeof DeleteTenantPaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.ListTenantPaymentMethods
     */
    listTenantPaymentMethods: {
        methodKind: "unary";
        input: typeof ListTenantPaymentMethodsRequestSchema;
        output: typeof ListTenantPaymentMethodsResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.GetTenantPaymentMethodListPageData
     */
    getTenantPaymentMethodListPageData: {
        methodKind: "unary";
        input: typeof GetTenantPaymentMethodListPageDataRequestSchema;
        output: typeof GetTenantPaymentMethodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tenancy.v1.TenantPaymentMethodDomainService.GetTenantPaymentMethodItemPageData
     */
    getTenantPaymentMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetTenantPaymentMethodItemPageDataRequestSchema;
        output: typeof GetTenantPaymentMethodItemPageDataResponseSchema;
    };
}>;
