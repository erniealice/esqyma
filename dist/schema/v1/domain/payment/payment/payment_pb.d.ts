import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Subscription } from "../../subscription/subscription/subscription_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/payment/payment.proto.
 */
export declare const file_domain_payment_payment_payment: GenFile;
/**
 * @generated from message domain.payment.v1.Payment
 */
export type Payment = Message<"domain.payment.v1.Payment"> & {
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
     * @generated from field: optional domain.subscription.v1.Subscription subscription = 8;
     */
    subscription?: Subscription;
    /**
     * @generated from field: string subscription_id = 9;
     */
    subscriptionId: string;
    /**
     * @generated from field: double amount = 10;
     */
    amount: number;
    /**
     * @generated from field: string status = 11;
     */
    status: string;
};
/**
 * Describes the message domain.payment.v1.Payment.
 * Use `create(PaymentSchema)` to create a new message.
 */
export declare const PaymentSchema: GenMessage<Payment>;
/**
 * @generated from message domain.payment.v1.CreatePaymentRequest
 */
export type CreatePaymentRequest = Message<"domain.payment.v1.CreatePaymentRequest"> & {
    /**
     * @generated from field: domain.payment.v1.Payment data = 1;
     */
    data?: Payment;
};
/**
 * Describes the message domain.payment.v1.CreatePaymentRequest.
 * Use `create(CreatePaymentRequestSchema)` to create a new message.
 */
export declare const CreatePaymentRequestSchema: GenMessage<CreatePaymentRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentResponse
 */
export type CreatePaymentResponse = Message<"domain.payment.v1.CreatePaymentResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.Payment data = 1;
     */
    data: Payment[];
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
 * Describes the message domain.payment.v1.CreatePaymentResponse.
 * Use `create(CreatePaymentResponseSchema)` to create a new message.
 */
export declare const CreatePaymentResponseSchema: GenMessage<CreatePaymentResponse>;
/**
 * @generated from message domain.payment.v1.ReadPaymentRequest
 */
export type ReadPaymentRequest = Message<"domain.payment.v1.ReadPaymentRequest"> & {
    /**
     * @generated from field: domain.payment.v1.Payment data = 1;
     */
    data?: Payment;
};
/**
 * Describes the message domain.payment.v1.ReadPaymentRequest.
 * Use `create(ReadPaymentRequestSchema)` to create a new message.
 */
export declare const ReadPaymentRequestSchema: GenMessage<ReadPaymentRequest>;
/**
 * @generated from message domain.payment.v1.ReadPaymentResponse
 */
export type ReadPaymentResponse = Message<"domain.payment.v1.ReadPaymentResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.Payment data = 1;
     */
    data: Payment[];
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
 * Describes the message domain.payment.v1.ReadPaymentResponse.
 * Use `create(ReadPaymentResponseSchema)` to create a new message.
 */
export declare const ReadPaymentResponseSchema: GenMessage<ReadPaymentResponse>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentRequest
 */
export type UpdatePaymentRequest = Message<"domain.payment.v1.UpdatePaymentRequest"> & {
    /**
     * @generated from field: domain.payment.v1.Payment data = 1;
     */
    data?: Payment;
};
/**
 * Describes the message domain.payment.v1.UpdatePaymentRequest.
 * Use `create(UpdatePaymentRequestSchema)` to create a new message.
 */
export declare const UpdatePaymentRequestSchema: GenMessage<UpdatePaymentRequest>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentResponse
 */
export type UpdatePaymentResponse = Message<"domain.payment.v1.UpdatePaymentResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.Payment data = 1;
     */
    data: Payment[];
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
 * Describes the message domain.payment.v1.UpdatePaymentResponse.
 * Use `create(UpdatePaymentResponseSchema)` to create a new message.
 */
export declare const UpdatePaymentResponseSchema: GenMessage<UpdatePaymentResponse>;
/**
 * @generated from message domain.payment.v1.DeletePaymentRequest
 */
export type DeletePaymentRequest = Message<"domain.payment.v1.DeletePaymentRequest"> & {
    /**
     * @generated from field: domain.payment.v1.Payment data = 1;
     */
    data?: Payment;
};
/**
 * Describes the message domain.payment.v1.DeletePaymentRequest.
 * Use `create(DeletePaymentRequestSchema)` to create a new message.
 */
export declare const DeletePaymentRequestSchema: GenMessage<DeletePaymentRequest>;
/**
 * @generated from message domain.payment.v1.DeletePaymentResponse
 */
export type DeletePaymentResponse = Message<"domain.payment.v1.DeletePaymentResponse"> & {
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
 * Describes the message domain.payment.v1.DeletePaymentResponse.
 * Use `create(DeletePaymentResponseSchema)` to create a new message.
 */
export declare const DeletePaymentResponseSchema: GenMessage<DeletePaymentResponse>;
/**
 * @generated from message domain.payment.v1.ListPaymentsRequest
 */
export type ListPaymentsRequest = Message<"domain.payment.v1.ListPaymentsRequest"> & {
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
 * Describes the message domain.payment.v1.ListPaymentsRequest.
 * Use `create(ListPaymentsRequestSchema)` to create a new message.
 */
export declare const ListPaymentsRequestSchema: GenMessage<ListPaymentsRequest>;
/**
 * @generated from message domain.payment.v1.ListPaymentsResponse
 */
export type ListPaymentsResponse = Message<"domain.payment.v1.ListPaymentsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.Payment data = 1;
     */
    data: Payment[];
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
 * Describes the message domain.payment.v1.ListPaymentsResponse.
 * Use `create(ListPaymentsResponseSchema)` to create a new message.
 */
export declare const ListPaymentsResponseSchema: GenMessage<ListPaymentsResponse>;
/**
 * @generated from message domain.payment.v1.GetPaymentListPageDataRequest
 */
export type GetPaymentListPageDataRequest = Message<"domain.payment.v1.GetPaymentListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetPaymentListPageDataRequest.
 * Use `create(GetPaymentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentListPageDataRequestSchema: GenMessage<GetPaymentListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetPaymentListPageDataResponse
 */
export type GetPaymentListPageDataResponse = Message<"domain.payment.v1.GetPaymentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.Payment payment_list = 1;
     */
    paymentList: Payment[];
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
 * Describes the message domain.payment.v1.GetPaymentListPageDataResponse.
 * Use `create(GetPaymentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentListPageDataResponseSchema: GenMessage<GetPaymentListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetPaymentItemPageDataRequest
 */
export type GetPaymentItemPageDataRequest = Message<"domain.payment.v1.GetPaymentItemPageDataRequest"> & {
    /**
     * @generated from field: string payment_id = 1;
     */
    paymentId: string;
};
/**
 * Describes the message domain.payment.v1.GetPaymentItemPageDataRequest.
 * Use `create(GetPaymentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentItemPageDataRequestSchema: GenMessage<GetPaymentItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetPaymentItemPageDataResponse
 */
export type GetPaymentItemPageDataResponse = Message<"domain.payment.v1.GetPaymentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payment.v1.Payment payment = 1;
     */
    payment?: Payment;
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
 * Describes the message domain.payment.v1.GetPaymentItemPageDataResponse.
 * Use `create(GetPaymentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentItemPageDataResponseSchema: GenMessage<GetPaymentItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.PaymentDomainService
 */
export declare const PaymentDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.CreatePayment
     */
    createPayment: {
        methodKind: "unary";
        input: typeof CreatePaymentRequestSchema;
        output: typeof CreatePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.ReadPayment
     */
    readPayment: {
        methodKind: "unary";
        input: typeof ReadPaymentRequestSchema;
        output: typeof ReadPaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.UpdatePayment
     */
    updatePayment: {
        methodKind: "unary";
        input: typeof UpdatePaymentRequestSchema;
        output: typeof UpdatePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.DeletePayment
     */
    deletePayment: {
        methodKind: "unary";
        input: typeof DeletePaymentRequestSchema;
        output: typeof DeletePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.ListPayments
     */
    listPayments: {
        methodKind: "unary";
        input: typeof ListPaymentsRequestSchema;
        output: typeof ListPaymentsResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.GetPaymentListPageData
     */
    getPaymentListPageData: {
        methodKind: "unary";
        input: typeof GetPaymentListPageDataRequestSchema;
        output: typeof GetPaymentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentDomainService.GetPaymentItemPageData
     */
    getPaymentItemPageData: {
        methodKind: "unary";
        input: typeof GetPaymentItemPageDataRequestSchema;
        output: typeof GetPaymentItemPageDataResponseSchema;
    };
}>;
