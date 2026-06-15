import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue_payment/revenue_payment.proto.
 */
export declare const file_domain_revenue_revenue_payment_revenue_payment: GenFile;
/**
 * RevenuePayment records an actual payment received against a Revenue (invoice).
 * Mirrors the loan_payment payment-against-a-parent shape.
 *
 * @generated from message domain.revenue.v1.RevenuePayment
 */
export type RevenuePayment = Message<"domain.revenue.v1.RevenuePayment"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent revenue (invoice)
     *
     * @generated from field: string revenue_id = 2;
     */
    revenueId: string;
    /**
     * Chosen collection method (optional — action.go tolerates empty; methodName falls back to id)
     *
     * @generated from field: optional string collection_method_id = 3;
     */
    collectionMethodId?: string;
    /**
     * centavos — maps to "amount" column; FIXES the amount_paid drop
     *
     * @generated from field: int64 amount = 4;
     */
    amount: bigint;
    /**
     * @generated from field: string currency = 5;
     */
    currency: string;
    /**
     * @generated from field: optional string reference_number = 6;
     */
    referenceNumber?: string;
    /**
     * @generated from field: optional string collection_type = 7;
     */
    collectionType?: string;
    /**
     * @generated from field: optional string status = 8;
     */
    status?: string;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
    /**
     * --- 5 fields needing the ADDITIVE migration (no column today) ---
     *
     * denormalized collection_method.name snapshot
     *
     * @generated from field: optional string payment_method = 10;
     */
    paymentMethod?: string;
    /**
     * @generated from field: optional string received_by = 11;
     */
    receivedBy?: string;
    /**
     * @generated from field: optional string received_role = 12;
     */
    receivedRole?: string;
    /**
     * @generated from field: optional string notes = 13;
     */
    notes?: string;
    /**
     * ISO 8601 (YYYY-MM-DD); read-only/phantom today, rewire adds the write
     *
     * @generated from field: optional string payment_date = 14;
     */
    paymentDate?: string;
    /**
     * --- audit (mirror loan_payment:45-46) ---
     *
     * @generated from field: optional int64 date_created = 15;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 16;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 17;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 18;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenuePayment.
 * Use `create(RevenuePaymentSchema)` to create a new message.
 */
export declare const RevenuePaymentSchema: GenMessage<RevenuePayment>;
/**
 * @generated from message domain.revenue.v1.CreateRevenuePaymentRequest
 */
export type CreateRevenuePaymentRequest = Message<"domain.revenue.v1.CreateRevenuePaymentRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenuePayment data = 1;
     */
    data?: RevenuePayment;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenuePaymentRequest.
 * Use `create(CreateRevenuePaymentRequestSchema)` to create a new message.
 */
export declare const CreateRevenuePaymentRequestSchema: GenMessage<CreateRevenuePaymentRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenuePaymentResponse
 */
export type CreateRevenuePaymentResponse = Message<"domain.revenue.v1.CreateRevenuePaymentResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenuePayment data = 1;
     */
    data: RevenuePayment[];
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
 * Describes the message domain.revenue.v1.CreateRevenuePaymentResponse.
 * Use `create(CreateRevenuePaymentResponseSchema)` to create a new message.
 */
export declare const CreateRevenuePaymentResponseSchema: GenMessage<CreateRevenuePaymentResponse>;
/**
 * @generated from message domain.revenue.v1.ReadRevenuePaymentRequest
 */
export type ReadRevenuePaymentRequest = Message<"domain.revenue.v1.ReadRevenuePaymentRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenuePayment data = 1;
     */
    data?: RevenuePayment;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenuePaymentRequest.
 * Use `create(ReadRevenuePaymentRequestSchema)` to create a new message.
 */
export declare const ReadRevenuePaymentRequestSchema: GenMessage<ReadRevenuePaymentRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenuePaymentResponse
 */
export type ReadRevenuePaymentResponse = Message<"domain.revenue.v1.ReadRevenuePaymentResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenuePayment data = 1;
     */
    data: RevenuePayment[];
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
 * Describes the message domain.revenue.v1.ReadRevenuePaymentResponse.
 * Use `create(ReadRevenuePaymentResponseSchema)` to create a new message.
 */
export declare const ReadRevenuePaymentResponseSchema: GenMessage<ReadRevenuePaymentResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenuePaymentRequest
 */
export type UpdateRevenuePaymentRequest = Message<"domain.revenue.v1.UpdateRevenuePaymentRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenuePayment data = 1;
     */
    data?: RevenuePayment;
};
/**
 * Describes the message domain.revenue.v1.UpdateRevenuePaymentRequest.
 * Use `create(UpdateRevenuePaymentRequestSchema)` to create a new message.
 */
export declare const UpdateRevenuePaymentRequestSchema: GenMessage<UpdateRevenuePaymentRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenuePaymentResponse
 */
export type UpdateRevenuePaymentResponse = Message<"domain.revenue.v1.UpdateRevenuePaymentResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenuePayment data = 1;
     */
    data: RevenuePayment[];
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
 * Describes the message domain.revenue.v1.UpdateRevenuePaymentResponse.
 * Use `create(UpdateRevenuePaymentResponseSchema)` to create a new message.
 */
export declare const UpdateRevenuePaymentResponseSchema: GenMessage<UpdateRevenuePaymentResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenuePaymentRequest
 */
export type DeleteRevenuePaymentRequest = Message<"domain.revenue.v1.DeleteRevenuePaymentRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenuePayment data = 1;
     */
    data?: RevenuePayment;
};
/**
 * Describes the message domain.revenue.v1.DeleteRevenuePaymentRequest.
 * Use `create(DeleteRevenuePaymentRequestSchema)` to create a new message.
 */
export declare const DeleteRevenuePaymentRequestSchema: GenMessage<DeleteRevenuePaymentRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenuePaymentResponse
 */
export type DeleteRevenuePaymentResponse = Message<"domain.revenue.v1.DeleteRevenuePaymentResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteRevenuePaymentResponse.
 * Use `create(DeleteRevenuePaymentResponseSchema)` to create a new message.
 */
export declare const DeleteRevenuePaymentResponseSchema: GenMessage<DeleteRevenuePaymentResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenuePaymentsRequest
 */
export type ListRevenuePaymentsRequest = Message<"domain.revenue.v1.ListRevenuePaymentsRequest"> & {
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
 * Describes the message domain.revenue.v1.ListRevenuePaymentsRequest.
 * Use `create(ListRevenuePaymentsRequestSchema)` to create a new message.
 */
export declare const ListRevenuePaymentsRequestSchema: GenMessage<ListRevenuePaymentsRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenuePaymentsResponse
 */
export type ListRevenuePaymentsResponse = Message<"domain.revenue.v1.ListRevenuePaymentsResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenuePayment data = 1;
     */
    data: RevenuePayment[];
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
 * Describes the message domain.revenue.v1.ListRevenuePaymentsResponse.
 * Use `create(ListRevenuePaymentsResponseSchema)` to create a new message.
 */
export declare const ListRevenuePaymentsResponseSchema: GenMessage<ListRevenuePaymentsResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenuePaymentListPageDataRequest
 */
export type GetRevenuePaymentListPageDataRequest = Message<"domain.revenue.v1.GetRevenuePaymentListPageDataRequest"> & {
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
 * Describes the message domain.revenue.v1.GetRevenuePaymentListPageDataRequest.
 * Use `create(GetRevenuePaymentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenuePaymentListPageDataRequestSchema: GenMessage<GetRevenuePaymentListPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenuePaymentListPageDataResponse
 */
export type GetRevenuePaymentListPageDataResponse = Message<"domain.revenue.v1.GetRevenuePaymentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenuePayment revenue_payment_list = 1;
     */
    revenuePaymentList: RevenuePayment[];
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
 * Describes the message domain.revenue.v1.GetRevenuePaymentListPageDataResponse.
 * Use `create(GetRevenuePaymentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenuePaymentListPageDataResponseSchema: GenMessage<GetRevenuePaymentListPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenuePaymentItemPageDataRequest
 */
export type GetRevenuePaymentItemPageDataRequest = Message<"domain.revenue.v1.GetRevenuePaymentItemPageDataRequest"> & {
    /**
     * @generated from field: string revenue_payment_id = 1;
     */
    revenuePaymentId: string;
};
/**
 * Describes the message domain.revenue.v1.GetRevenuePaymentItemPageDataRequest.
 * Use `create(GetRevenuePaymentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenuePaymentItemPageDataRequestSchema: GenMessage<GetRevenuePaymentItemPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenuePaymentItemPageDataResponse
 */
export type GetRevenuePaymentItemPageDataResponse = Message<"domain.revenue.v1.GetRevenuePaymentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.revenue.v1.RevenuePayment revenue_payment = 1;
     */
    revenuePayment?: RevenuePayment;
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
 * Describes the message domain.revenue.v1.GetRevenuePaymentItemPageDataResponse.
 * Use `create(GetRevenuePaymentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenuePaymentItemPageDataResponseSchema: GenMessage<GetRevenuePaymentItemPageDataResponse>;
/**
 * @generated from service domain.revenue.v1.RevenuePaymentDomainService
 */
export declare const RevenuePaymentDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.CreateRevenuePayment
     */
    createRevenuePayment: {
        methodKind: "unary";
        input: typeof CreateRevenuePaymentRequestSchema;
        output: typeof CreateRevenuePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.ReadRevenuePayment
     */
    readRevenuePayment: {
        methodKind: "unary";
        input: typeof ReadRevenuePaymentRequestSchema;
        output: typeof ReadRevenuePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.UpdateRevenuePayment
     */
    updateRevenuePayment: {
        methodKind: "unary";
        input: typeof UpdateRevenuePaymentRequestSchema;
        output: typeof UpdateRevenuePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.DeleteRevenuePayment
     */
    deleteRevenuePayment: {
        methodKind: "unary";
        input: typeof DeleteRevenuePaymentRequestSchema;
        output: typeof DeleteRevenuePaymentResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.ListRevenuePayments
     */
    listRevenuePayments: {
        methodKind: "unary";
        input: typeof ListRevenuePaymentsRequestSchema;
        output: typeof ListRevenuePaymentsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.GetRevenuePaymentListPageData
     */
    getRevenuePaymentListPageData: {
        methodKind: "unary";
        input: typeof GetRevenuePaymentListPageDataRequestSchema;
        output: typeof GetRevenuePaymentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenuePaymentDomainService.GetRevenuePaymentItemPageData
     */
    getRevenuePaymentItemPageData: {
        methodKind: "unary";
        input: typeof GetRevenuePaymentItemPageDataRequestSchema;
        output: typeof GetRevenuePaymentItemPageDataResponseSchema;
    };
}>;
