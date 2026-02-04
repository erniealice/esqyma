import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/payment_method/payment_method.proto.
 */
export declare const file_domain_payment_payment_method_payment_method: GenFile;
/**
 * @generated from message domain.payment.v1.PaymentMethod
 */
export type PaymentMethod = Message<"domain.payment.v1.PaymentMethod"> & {
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from oneof domain.payment.v1.PaymentMethod.method_details
     */
    methodDetails: {
        /**
         * @generated from field: domain.payment.v1.CardDetails card = 8;
         */
        value: CardDetails;
        case: "card";
    } | {
        /**
         * @generated from field: domain.payment.v1.BankAccountDetails bank_account = 9;
         */
        value: BankAccountDetails;
        case: "bankAccount";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * e.g., "Visa", "PayPal", "Chase Bank"
     *
     * @generated from field: optional string provider_name = 10;
     */
    providerName?: string;
};
/**
 * Describes the message domain.payment.v1.PaymentMethod.
 * Use `create(PaymentMethodSchema)` to create a new message.
 */
export declare const PaymentMethodSchema: GenMessage<PaymentMethod>;
/**
 * @generated from message domain.payment.v1.CardDetails
 */
export type CardDetails = Message<"domain.payment.v1.CardDetails"> & {
    /**
     * e.g., Visa, MasterCard
     *
     * @generated from field: string card_type = 1;
     */
    cardType: string;
    /**
     * @generated from field: string last_four_digits = 2;
     */
    lastFourDigits: string;
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
 * Describes the message domain.payment.v1.CardDetails.
 * Use `create(CardDetailsSchema)` to create a new message.
 */
export declare const CardDetailsSchema: GenMessage<CardDetails>;
/**
 * @generated from message domain.payment.v1.BankAccountDetails
 */
export type BankAccountDetails = Message<"domain.payment.v1.BankAccountDetails"> & {
    /**
     * @generated from field: string bank_name = 1;
     */
    bankName: string;
    /**
     * @generated from field: string last_four_digits = 2;
     */
    lastFourDigits: string;
};
/**
 * Describes the message domain.payment.v1.BankAccountDetails.
 * Use `create(BankAccountDetailsSchema)` to create a new message.
 */
export declare const BankAccountDetailsSchema: GenMessage<BankAccountDetails>;
/**
 * @generated from message domain.payment.v1.CreatePaymentMethodRequest
 */
export type CreatePaymentMethodRequest = Message<"domain.payment.v1.CreatePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentMethod data = 1;
     */
    data?: PaymentMethod;
};
/**
 * Describes the message domain.payment.v1.CreatePaymentMethodRequest.
 * Use `create(CreatePaymentMethodRequestSchema)` to create a new message.
 */
export declare const CreatePaymentMethodRequestSchema: GenMessage<CreatePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentMethodResponse
 */
export type CreatePaymentMethodResponse = Message<"domain.payment.v1.CreatePaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentMethod data = 1;
     */
    data: PaymentMethod[];
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
 * Describes the message domain.payment.v1.CreatePaymentMethodResponse.
 * Use `create(CreatePaymentMethodResponseSchema)` to create a new message.
 */
export declare const CreatePaymentMethodResponseSchema: GenMessage<CreatePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.ReadPaymentMethodRequest
 */
export type ReadPaymentMethodRequest = Message<"domain.payment.v1.ReadPaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentMethod data = 1;
     */
    data?: PaymentMethod;
};
/**
 * Describes the message domain.payment.v1.ReadPaymentMethodRequest.
 * Use `create(ReadPaymentMethodRequestSchema)` to create a new message.
 */
export declare const ReadPaymentMethodRequestSchema: GenMessage<ReadPaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.ReadPaymentMethodResponse
 */
export type ReadPaymentMethodResponse = Message<"domain.payment.v1.ReadPaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentMethod data = 1;
     */
    data: PaymentMethod[];
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
 * Describes the message domain.payment.v1.ReadPaymentMethodResponse.
 * Use `create(ReadPaymentMethodResponseSchema)` to create a new message.
 */
export declare const ReadPaymentMethodResponseSchema: GenMessage<ReadPaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentMethodRequest
 */
export type UpdatePaymentMethodRequest = Message<"domain.payment.v1.UpdatePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentMethod data = 1;
     */
    data?: PaymentMethod;
};
/**
 * Describes the message domain.payment.v1.UpdatePaymentMethodRequest.
 * Use `create(UpdatePaymentMethodRequestSchema)` to create a new message.
 */
export declare const UpdatePaymentMethodRequestSchema: GenMessage<UpdatePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentMethodResponse
 */
export type UpdatePaymentMethodResponse = Message<"domain.payment.v1.UpdatePaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentMethod data = 1;
     */
    data: PaymentMethod[];
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
 * Describes the message domain.payment.v1.UpdatePaymentMethodResponse.
 * Use `create(UpdatePaymentMethodResponseSchema)` to create a new message.
 */
export declare const UpdatePaymentMethodResponseSchema: GenMessage<UpdatePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.DeletePaymentMethodRequest
 */
export type DeletePaymentMethodRequest = Message<"domain.payment.v1.DeletePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentMethod data = 1;
     */
    data?: PaymentMethod;
};
/**
 * Describes the message domain.payment.v1.DeletePaymentMethodRequest.
 * Use `create(DeletePaymentMethodRequestSchema)` to create a new message.
 */
export declare const DeletePaymentMethodRequestSchema: GenMessage<DeletePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.DeletePaymentMethodResponse
 */
export type DeletePaymentMethodResponse = Message<"domain.payment.v1.DeletePaymentMethodResponse"> & {
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
 * Describes the message domain.payment.v1.DeletePaymentMethodResponse.
 * Use `create(DeletePaymentMethodResponseSchema)` to create a new message.
 */
export declare const DeletePaymentMethodResponseSchema: GenMessage<DeletePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.ListPaymentMethodsRequest
 */
export type ListPaymentMethodsRequest = Message<"domain.payment.v1.ListPaymentMethodsRequest"> & {
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
 * Describes the message domain.payment.v1.ListPaymentMethodsRequest.
 * Use `create(ListPaymentMethodsRequestSchema)` to create a new message.
 */
export declare const ListPaymentMethodsRequestSchema: GenMessage<ListPaymentMethodsRequest>;
/**
 * @generated from message domain.payment.v1.ListPaymentMethodsResponse
 */
export type ListPaymentMethodsResponse = Message<"domain.payment.v1.ListPaymentMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentMethod data = 1;
     */
    data: PaymentMethod[];
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
 * Describes the message domain.payment.v1.ListPaymentMethodsResponse.
 * Use `create(ListPaymentMethodsResponseSchema)` to create a new message.
 */
export declare const ListPaymentMethodsResponseSchema: GenMessage<ListPaymentMethodsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.payment.v1.GetPaymentMethodListPageDataRequest
 */
export type GetPaymentMethodListPageDataRequest = Message<"domain.payment.v1.GetPaymentMethodListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetPaymentMethodListPageDataRequest.
 * Use `create(GetPaymentMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentMethodListPageDataRequestSchema: GenMessage<GetPaymentMethodListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.payment.v1.GetPaymentMethodListPageDataResponse
 */
export type GetPaymentMethodListPageDataResponse = Message<"domain.payment.v1.GetPaymentMethodListPageDataResponse"> & {
    /**
     * The payment method data
     *
     * @generated from field: repeated domain.payment.v1.PaymentMethod payment_method_list = 1;
     */
    paymentMethodList: PaymentMethod[];
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
 * Describes the message domain.payment.v1.GetPaymentMethodListPageDataResponse.
 * Use `create(GetPaymentMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentMethodListPageDataResponseSchema: GenMessage<GetPaymentMethodListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.payment.v1.GetPaymentMethodItemPageDataRequest
 */
export type GetPaymentMethodItemPageDataRequest = Message<"domain.payment.v1.GetPaymentMethodItemPageDataRequest"> & {
    /**
     * The payment method ID to retrieve
     *
     * @generated from field: string payment_method_id = 1;
     */
    paymentMethodId: string;
};
/**
 * Describes the message domain.payment.v1.GetPaymentMethodItemPageDataRequest.
 * Use `create(GetPaymentMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentMethodItemPageDataRequestSchema: GenMessage<GetPaymentMethodItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.payment.v1.GetPaymentMethodItemPageDataResponse
 */
export type GetPaymentMethodItemPageDataResponse = Message<"domain.payment.v1.GetPaymentMethodItemPageDataResponse"> & {
    /**
     * The payment method data
     *
     * @generated from field: domain.payment.v1.PaymentMethod payment_method = 1;
     */
    paymentMethod?: PaymentMethod;
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
 * Describes the message domain.payment.v1.GetPaymentMethodItemPageDataResponse.
 * Use `create(GetPaymentMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentMethodItemPageDataResponseSchema: GenMessage<GetPaymentMethodItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.PaymentMethodDomainService
 */
export declare const PaymentMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.CreatePaymentMethod
     */
    createPaymentMethod: {
        methodKind: "unary";
        input: typeof CreatePaymentMethodRequestSchema;
        output: typeof CreatePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.ReadPaymentMethod
     */
    readPaymentMethod: {
        methodKind: "unary";
        input: typeof ReadPaymentMethodRequestSchema;
        output: typeof ReadPaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.UpdatePaymentMethod
     */
    updatePaymentMethod: {
        methodKind: "unary";
        input: typeof UpdatePaymentMethodRequestSchema;
        output: typeof UpdatePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.DeletePaymentMethod
     */
    deletePaymentMethod: {
        methodKind: "unary";
        input: typeof DeletePaymentMethodRequestSchema;
        output: typeof DeletePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.ListPaymentMethods
     */
    listPaymentMethods: {
        methodKind: "unary";
        input: typeof ListPaymentMethodsRequestSchema;
        output: typeof ListPaymentMethodsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.GetPaymentMethodListPageData
     */
    getPaymentMethodListPageData: {
        methodKind: "unary";
        input: typeof GetPaymentMethodListPageDataRequestSchema;
        output: typeof GetPaymentMethodListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.payment.v1.PaymentMethodDomainService.GetPaymentMethodItemPageData
     */
    getPaymentMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetPaymentMethodItemPageDataRequestSchema;
        output: typeof GetPaymentMethodItemPageDataResponseSchema;
    };
}>;
