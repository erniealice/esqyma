import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/payment_term/payment_term.proto.
 */
export declare const file_domain_entity_payment_term_payment_term: GenFile;
/**
 * @generated from message domain.entity.v1.PaymentTerm
 */
export type PaymentTerm = Message<"domain.entity.v1.PaymentTerm"> & {
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
     * Display: "Net 30", "2/10 Net 30", "COD"
     *
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * Machine key: "net_30", "2_10_net_30", "cod"
     *
     * @generated from field: string code = 8;
     */
    code: string;
    /**
     * "due_on_receipt", "net", "cod", "proximate"
     *
     * @generated from field: string type = 9;
     */
    type: string;
    /**
     * Days until due (0 = immediate)
     *
     * @generated from field: int32 net_days = 10;
     */
    netDays: number;
    /**
     * Early payment window
     *
     * @generated from field: optional int32 discount_days = 11;
     */
    discountDays?: number;
    /**
     * Basis points (200 = 2.00%)
     *
     * @generated from field: optional int32 discount_percent_bps = 12;
     */
    discountPercentBps?: number;
    /**
     * "both", "supplier", "client"
     *
     * @generated from field: string entity_scope = 13;
     */
    entityScope: string;
    /**
     * Default for entity_scope
     *
     * @generated from field: bool is_default = 14;
     */
    isDefault: boolean;
    /**
     * @generated from field: optional string description = 15;
     */
    description?: string;
    /**
     * @generated from field: optional int32 display_order = 16;
     */
    displayOrder?: number;
    /**
     * Day-of-month for proximate due date (1-28)
     *
     * @generated from field: optional int32 proximate_day = 17;
     */
    proximateDay?: number;
};
/**
 * Describes the message domain.entity.v1.PaymentTerm.
 * Use `create(PaymentTermSchema)` to create a new message.
 */
export declare const PaymentTermSchema: GenMessage<PaymentTerm>;
/**
 * @generated from message domain.entity.v1.CreatePaymentTermRequest
 */
export type CreatePaymentTermRequest = Message<"domain.entity.v1.CreatePaymentTermRequest"> & {
    /**
     * @generated from field: domain.entity.v1.PaymentTerm data = 1;
     */
    data?: PaymentTerm;
};
/**
 * Describes the message domain.entity.v1.CreatePaymentTermRequest.
 * Use `create(CreatePaymentTermRequestSchema)` to create a new message.
 */
export declare const CreatePaymentTermRequestSchema: GenMessage<CreatePaymentTermRequest>;
/**
 * @generated from message domain.entity.v1.CreatePaymentTermResponse
 */
export type CreatePaymentTermResponse = Message<"domain.entity.v1.CreatePaymentTermResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.PaymentTerm data = 1;
     */
    data: PaymentTerm[];
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
 * Describes the message domain.entity.v1.CreatePaymentTermResponse.
 * Use `create(CreatePaymentTermResponseSchema)` to create a new message.
 */
export declare const CreatePaymentTermResponseSchema: GenMessage<CreatePaymentTermResponse>;
/**
 * @generated from message domain.entity.v1.ReadPaymentTermRequest
 */
export type ReadPaymentTermRequest = Message<"domain.entity.v1.ReadPaymentTermRequest"> & {
    /**
     * @generated from field: domain.entity.v1.PaymentTerm data = 1;
     */
    data?: PaymentTerm;
};
/**
 * Describes the message domain.entity.v1.ReadPaymentTermRequest.
 * Use `create(ReadPaymentTermRequestSchema)` to create a new message.
 */
export declare const ReadPaymentTermRequestSchema: GenMessage<ReadPaymentTermRequest>;
/**
 * @generated from message domain.entity.v1.ReadPaymentTermResponse
 */
export type ReadPaymentTermResponse = Message<"domain.entity.v1.ReadPaymentTermResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.PaymentTerm data = 1;
     */
    data: PaymentTerm[];
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
 * Describes the message domain.entity.v1.ReadPaymentTermResponse.
 * Use `create(ReadPaymentTermResponseSchema)` to create a new message.
 */
export declare const ReadPaymentTermResponseSchema: GenMessage<ReadPaymentTermResponse>;
/**
 * @generated from message domain.entity.v1.UpdatePaymentTermRequest
 */
export type UpdatePaymentTermRequest = Message<"domain.entity.v1.UpdatePaymentTermRequest"> & {
    /**
     * @generated from field: domain.entity.v1.PaymentTerm data = 1;
     */
    data?: PaymentTerm;
};
/**
 * Describes the message domain.entity.v1.UpdatePaymentTermRequest.
 * Use `create(UpdatePaymentTermRequestSchema)` to create a new message.
 */
export declare const UpdatePaymentTermRequestSchema: GenMessage<UpdatePaymentTermRequest>;
/**
 * @generated from message domain.entity.v1.UpdatePaymentTermResponse
 */
export type UpdatePaymentTermResponse = Message<"domain.entity.v1.UpdatePaymentTermResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.PaymentTerm data = 1;
     */
    data: PaymentTerm[];
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
 * Describes the message domain.entity.v1.UpdatePaymentTermResponse.
 * Use `create(UpdatePaymentTermResponseSchema)` to create a new message.
 */
export declare const UpdatePaymentTermResponseSchema: GenMessage<UpdatePaymentTermResponse>;
/**
 * @generated from message domain.entity.v1.DeletePaymentTermRequest
 */
export type DeletePaymentTermRequest = Message<"domain.entity.v1.DeletePaymentTermRequest"> & {
    /**
     * @generated from field: domain.entity.v1.PaymentTerm data = 1;
     */
    data?: PaymentTerm;
};
/**
 * Describes the message domain.entity.v1.DeletePaymentTermRequest.
 * Use `create(DeletePaymentTermRequestSchema)` to create a new message.
 */
export declare const DeletePaymentTermRequestSchema: GenMessage<DeletePaymentTermRequest>;
/**
 * @generated from message domain.entity.v1.DeletePaymentTermResponse
 */
export type DeletePaymentTermResponse = Message<"domain.entity.v1.DeletePaymentTermResponse"> & {
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
 * Describes the message domain.entity.v1.DeletePaymentTermResponse.
 * Use `create(DeletePaymentTermResponseSchema)` to create a new message.
 */
export declare const DeletePaymentTermResponseSchema: GenMessage<DeletePaymentTermResponse>;
/**
 * @generated from message domain.entity.v1.ListPaymentTermsRequest
 */
export type ListPaymentTermsRequest = Message<"domain.entity.v1.ListPaymentTermsRequest"> & {
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
 * Describes the message domain.entity.v1.ListPaymentTermsRequest.
 * Use `create(ListPaymentTermsRequestSchema)` to create a new message.
 */
export declare const ListPaymentTermsRequestSchema: GenMessage<ListPaymentTermsRequest>;
/**
 * @generated from message domain.entity.v1.ListPaymentTermsResponse
 */
export type ListPaymentTermsResponse = Message<"domain.entity.v1.ListPaymentTermsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.PaymentTerm data = 1;
     */
    data: PaymentTerm[];
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
 * Describes the message domain.entity.v1.ListPaymentTermsResponse.
 * Use `create(ListPaymentTermsResponseSchema)` to create a new message.
 */
export declare const ListPaymentTermsResponseSchema: GenMessage<ListPaymentTermsResponse>;
/**
 * @generated from message domain.entity.v1.GetPaymentTermListPageDataRequest
 */
export type GetPaymentTermListPageDataRequest = Message<"domain.entity.v1.GetPaymentTermListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetPaymentTermListPageDataRequest.
 * Use `create(GetPaymentTermListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentTermListPageDataRequestSchema: GenMessage<GetPaymentTermListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetPaymentTermListPageDataResponse
 */
export type GetPaymentTermListPageDataResponse = Message<"domain.entity.v1.GetPaymentTermListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.PaymentTerm payment_term_list = 1;
     */
    paymentTermList: PaymentTerm[];
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
 * Describes the message domain.entity.v1.GetPaymentTermListPageDataResponse.
 * Use `create(GetPaymentTermListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentTermListPageDataResponseSchema: GenMessage<GetPaymentTermListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetPaymentTermItemPageDataRequest
 */
export type GetPaymentTermItemPageDataRequest = Message<"domain.entity.v1.GetPaymentTermItemPageDataRequest"> & {
    /**
     * @generated from field: string payment_term_id = 1;
     */
    paymentTermId: string;
};
/**
 * Describes the message domain.entity.v1.GetPaymentTermItemPageDataRequest.
 * Use `create(GetPaymentTermItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentTermItemPageDataRequestSchema: GenMessage<GetPaymentTermItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetPaymentTermItemPageDataResponse
 */
export type GetPaymentTermItemPageDataResponse = Message<"domain.entity.v1.GetPaymentTermItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.PaymentTerm payment_term = 1;
     */
    paymentTerm?: PaymentTerm;
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
 * Describes the message domain.entity.v1.GetPaymentTermItemPageDataResponse.
 * Use `create(GetPaymentTermItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentTermItemPageDataResponseSchema: GenMessage<GetPaymentTermItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.PaymentTermDomainService
 */
export declare const PaymentTermDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.CreatePaymentTerm
     */
    createPaymentTerm: {
        methodKind: "unary";
        input: typeof CreatePaymentTermRequestSchema;
        output: typeof CreatePaymentTermResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.ReadPaymentTerm
     */
    readPaymentTerm: {
        methodKind: "unary";
        input: typeof ReadPaymentTermRequestSchema;
        output: typeof ReadPaymentTermResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.UpdatePaymentTerm
     */
    updatePaymentTerm: {
        methodKind: "unary";
        input: typeof UpdatePaymentTermRequestSchema;
        output: typeof UpdatePaymentTermResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.DeletePaymentTerm
     */
    deletePaymentTerm: {
        methodKind: "unary";
        input: typeof DeletePaymentTermRequestSchema;
        output: typeof DeletePaymentTermResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.ListPaymentTerms
     */
    listPaymentTerms: {
        methodKind: "unary";
        input: typeof ListPaymentTermsRequestSchema;
        output: typeof ListPaymentTermsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.GetPaymentTermListPageData
     */
    getPaymentTermListPageData: {
        methodKind: "unary";
        input: typeof GetPaymentTermListPageDataRequestSchema;
        output: typeof GetPaymentTermListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.PaymentTermDomainService.GetPaymentTermItemPageData
     */
    getPaymentTermItemPageData: {
        methodKind: "unary";
        input: typeof GetPaymentTermItemPageDataRequestSchema;
        output: typeof GetPaymentTermItemPageDataResponseSchema;
    };
}>;
