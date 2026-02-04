import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { PaymentProfile } from "../payment_profile/payment_profile_pb";
import type { PaymentMethod } from "../payment_method/payment_method_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/payment_profile_payment_method/payment_profile_payment_method.proto.
 */
export declare const file_domain_payment_payment_profile_payment_method_payment_profile_payment_method: GenFile;
/**
 * @generated from message domain.payment.v1.PaymentProfilePaymentMethod
 */
export type PaymentProfilePaymentMethod = Message<"domain.payment.v1.PaymentProfilePaymentMethod"> & {
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
     * @generated from field: optional domain.payment.v1.PaymentProfile payment_profile = 7;
     */
    paymentProfile?: PaymentProfile;
    /**
     * @generated from field: string payment_profile_id = 8;
     */
    paymentProfileId: string;
    /**
     * @generated from field: optional domain.payment.v1.PaymentMethod payment_method = 9;
     */
    paymentMethod?: PaymentMethod;
    /**
     * @generated from field: string payment_method_id = 10;
     */
    paymentMethodId: string;
    /**
     * @generated from field: bool primary = 11;
     */
    primary: boolean;
    /**
     * @generated from field: optional string notes = 12;
     */
    notes?: string;
    /**
     * @generated from field: optional int32 display_order = 13;
     */
    displayOrder?: number;
    /**
     * Generic identifier: card number, PayPal email, account ID, etc.
     *
     * @generated from field: string payment_identifier = 14;
     */
    paymentIdentifier: string;
    /**
     * "card", "paypal", "bank", "crypto", "other"
     *
     * @generated from field: string identifier_type = 15;
     */
    identifierType: string;
    /**
     * User-friendly nickname for this payment method
     *
     * @generated from field: optional string display_name = 16;
     */
    displayName?: string;
    /**
     * Whether the payment_identifier is masked/tokenized
     *
     * @generated from field: bool masked = 17;
     */
    masked: boolean;
};
/**
 * Describes the message domain.payment.v1.PaymentProfilePaymentMethod.
 * Use `create(PaymentProfilePaymentMethodSchema)` to create a new message.
 */
export declare const PaymentProfilePaymentMethodSchema: GenMessage<PaymentProfilePaymentMethod>;
/**
 * @generated from message domain.payment.v1.CreatePaymentProfilePaymentMethodRequest
 */
export type CreatePaymentProfilePaymentMethodRequest = Message<"domain.payment.v1.CreatePaymentProfilePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data?: PaymentProfilePaymentMethod;
};
/**
 * Describes the message domain.payment.v1.CreatePaymentProfilePaymentMethodRequest.
 * Use `create(CreatePaymentProfilePaymentMethodRequestSchema)` to create a new message.
 */
export declare const CreatePaymentProfilePaymentMethodRequestSchema: GenMessage<CreatePaymentProfilePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentProfilePaymentMethodResponse
 */
export type CreatePaymentProfilePaymentMethodResponse = Message<"domain.payment.v1.CreatePaymentProfilePaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data: PaymentProfilePaymentMethod[];
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
 * Describes the message domain.payment.v1.CreatePaymentProfilePaymentMethodResponse.
 * Use `create(CreatePaymentProfilePaymentMethodResponseSchema)` to create a new message.
 */
export declare const CreatePaymentProfilePaymentMethodResponseSchema: GenMessage<CreatePaymentProfilePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.ReadPaymentProfilePaymentMethodRequest
 */
export type ReadPaymentProfilePaymentMethodRequest = Message<"domain.payment.v1.ReadPaymentProfilePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data?: PaymentProfilePaymentMethod;
};
/**
 * Describes the message domain.payment.v1.ReadPaymentProfilePaymentMethodRequest.
 * Use `create(ReadPaymentProfilePaymentMethodRequestSchema)` to create a new message.
 */
export declare const ReadPaymentProfilePaymentMethodRequestSchema: GenMessage<ReadPaymentProfilePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.ReadPaymentProfilePaymentMethodResponse
 */
export type ReadPaymentProfilePaymentMethodResponse = Message<"domain.payment.v1.ReadPaymentProfilePaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data: PaymentProfilePaymentMethod[];
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
 * Describes the message domain.payment.v1.ReadPaymentProfilePaymentMethodResponse.
 * Use `create(ReadPaymentProfilePaymentMethodResponseSchema)` to create a new message.
 */
export declare const ReadPaymentProfilePaymentMethodResponseSchema: GenMessage<ReadPaymentProfilePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentProfilePaymentMethodRequest
 */
export type UpdatePaymentProfilePaymentMethodRequest = Message<"domain.payment.v1.UpdatePaymentProfilePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data?: PaymentProfilePaymentMethod;
};
/**
 * Describes the message domain.payment.v1.UpdatePaymentProfilePaymentMethodRequest.
 * Use `create(UpdatePaymentProfilePaymentMethodRequestSchema)` to create a new message.
 */
export declare const UpdatePaymentProfilePaymentMethodRequestSchema: GenMessage<UpdatePaymentProfilePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentProfilePaymentMethodResponse
 */
export type UpdatePaymentProfilePaymentMethodResponse = Message<"domain.payment.v1.UpdatePaymentProfilePaymentMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data: PaymentProfilePaymentMethod[];
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
 * Describes the message domain.payment.v1.UpdatePaymentProfilePaymentMethodResponse.
 * Use `create(UpdatePaymentProfilePaymentMethodResponseSchema)` to create a new message.
 */
export declare const UpdatePaymentProfilePaymentMethodResponseSchema: GenMessage<UpdatePaymentProfilePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.DeletePaymentProfilePaymentMethodRequest
 */
export type DeletePaymentProfilePaymentMethodRequest = Message<"domain.payment.v1.DeletePaymentProfilePaymentMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data?: PaymentProfilePaymentMethod;
};
/**
 * Describes the message domain.payment.v1.DeletePaymentProfilePaymentMethodRequest.
 * Use `create(DeletePaymentProfilePaymentMethodRequestSchema)` to create a new message.
 */
export declare const DeletePaymentProfilePaymentMethodRequestSchema: GenMessage<DeletePaymentProfilePaymentMethodRequest>;
/**
 * @generated from message domain.payment.v1.DeletePaymentProfilePaymentMethodResponse
 */
export type DeletePaymentProfilePaymentMethodResponse = Message<"domain.payment.v1.DeletePaymentProfilePaymentMethodResponse"> & {
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
 * Describes the message domain.payment.v1.DeletePaymentProfilePaymentMethodResponse.
 * Use `create(DeletePaymentProfilePaymentMethodResponseSchema)` to create a new message.
 */
export declare const DeletePaymentProfilePaymentMethodResponseSchema: GenMessage<DeletePaymentProfilePaymentMethodResponse>;
/**
 * @generated from message domain.payment.v1.ListPaymentProfilePaymentMethodsRequest
 */
export type ListPaymentProfilePaymentMethodsRequest = Message<"domain.payment.v1.ListPaymentProfilePaymentMethodsRequest"> & {
    /**
     * @generated from field: optional string payment_profile_id = 1;
     */
    paymentProfileId?: string;
    /**
     * @generated from field: optional string payment_method_id = 2;
     */
    paymentMethodId?: string;
    /**
     * @generated from field: optional bool primary_only = 3;
     */
    primaryOnly?: boolean;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 5;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 6;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 7;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.payment.v1.ListPaymentProfilePaymentMethodsRequest.
 * Use `create(ListPaymentProfilePaymentMethodsRequestSchema)` to create a new message.
 */
export declare const ListPaymentProfilePaymentMethodsRequestSchema: GenMessage<ListPaymentProfilePaymentMethodsRequest>;
/**
 * @generated from message domain.payment.v1.ListPaymentProfilePaymentMethodsResponse
 */
export type ListPaymentProfilePaymentMethodsResponse = Message<"domain.payment.v1.ListPaymentProfilePaymentMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfilePaymentMethod data = 1;
     */
    data: PaymentProfilePaymentMethod[];
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
 * Describes the message domain.payment.v1.ListPaymentProfilePaymentMethodsResponse.
 * Use `create(ListPaymentProfilePaymentMethodsResponseSchema)` to create a new message.
 */
export declare const ListPaymentProfilePaymentMethodsResponseSchema: GenMessage<ListPaymentProfilePaymentMethodsResponse>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfilePaymentMethodListPageDataRequest
 */
export type GetPaymentProfilePaymentMethodListPageDataRequest = Message<"domain.payment.v1.GetPaymentProfilePaymentMethodListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetPaymentProfilePaymentMethodListPageDataRequest.
 * Use `create(GetPaymentProfilePaymentMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentProfilePaymentMethodListPageDataRequestSchema: GenMessage<GetPaymentProfilePaymentMethodListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfilePaymentMethodListPageDataResponse
 */
export type GetPaymentProfilePaymentMethodListPageDataResponse = Message<"domain.payment.v1.GetPaymentProfilePaymentMethodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfilePaymentMethod payment_profile_payment_method_list = 1;
     */
    paymentProfilePaymentMethodList: PaymentProfilePaymentMethod[];
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
 * Describes the message domain.payment.v1.GetPaymentProfilePaymentMethodListPageDataResponse.
 * Use `create(GetPaymentProfilePaymentMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentProfilePaymentMethodListPageDataResponseSchema: GenMessage<GetPaymentProfilePaymentMethodListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfilePaymentMethodItemPageDataRequest
 */
export type GetPaymentProfilePaymentMethodItemPageDataRequest = Message<"domain.payment.v1.GetPaymentProfilePaymentMethodItemPageDataRequest"> & {
    /**
     * @generated from field: string payment_profile_payment_method_id = 1;
     */
    paymentProfilePaymentMethodId: string;
};
/**
 * Describes the message domain.payment.v1.GetPaymentProfilePaymentMethodItemPageDataRequest.
 * Use `create(GetPaymentProfilePaymentMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentProfilePaymentMethodItemPageDataRequestSchema: GenMessage<GetPaymentProfilePaymentMethodItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfilePaymentMethodItemPageDataResponse
 */
export type GetPaymentProfilePaymentMethodItemPageDataResponse = Message<"domain.payment.v1.GetPaymentProfilePaymentMethodItemPageDataResponse"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfilePaymentMethod payment_profile_payment_method = 1;
     */
    paymentProfilePaymentMethod?: PaymentProfilePaymentMethod;
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
 * Describes the message domain.payment.v1.GetPaymentProfilePaymentMethodItemPageDataResponse.
 * Use `create(GetPaymentProfilePaymentMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentProfilePaymentMethodItemPageDataResponseSchema: GenMessage<GetPaymentProfilePaymentMethodItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.PaymentProfilePaymentMethodDomainService
 */
export declare const PaymentProfilePaymentMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.CreatePaymentProfilePaymentMethod
     */
    createPaymentProfilePaymentMethod: {
        methodKind: "unary";
        input: typeof CreatePaymentProfilePaymentMethodRequestSchema;
        output: typeof CreatePaymentProfilePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.ReadPaymentProfilePaymentMethod
     */
    readPaymentProfilePaymentMethod: {
        methodKind: "unary";
        input: typeof ReadPaymentProfilePaymentMethodRequestSchema;
        output: typeof ReadPaymentProfilePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.UpdatePaymentProfilePaymentMethod
     */
    updatePaymentProfilePaymentMethod: {
        methodKind: "unary";
        input: typeof UpdatePaymentProfilePaymentMethodRequestSchema;
        output: typeof UpdatePaymentProfilePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.DeletePaymentProfilePaymentMethod
     */
    deletePaymentProfilePaymentMethod: {
        methodKind: "unary";
        input: typeof DeletePaymentProfilePaymentMethodRequestSchema;
        output: typeof DeletePaymentProfilePaymentMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.ListPaymentProfilePaymentMethods
     */
    listPaymentProfilePaymentMethods: {
        methodKind: "unary";
        input: typeof ListPaymentProfilePaymentMethodsRequestSchema;
        output: typeof ListPaymentProfilePaymentMethodsResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.GetPaymentProfilePaymentMethodListPageData
     */
    getPaymentProfilePaymentMethodListPageData: {
        methodKind: "unary";
        input: typeof GetPaymentProfilePaymentMethodListPageDataRequestSchema;
        output: typeof GetPaymentProfilePaymentMethodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfilePaymentMethodDomainService.GetPaymentProfilePaymentMethodItemPageData
     */
    getPaymentProfilePaymentMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetPaymentProfilePaymentMethodItemPageDataRequestSchema;
        output: typeof GetPaymentProfilePaymentMethodItemPageDataResponseSchema;
    };
}>;
