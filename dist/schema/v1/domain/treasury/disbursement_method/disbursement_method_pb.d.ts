import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/disbursement_method/disbursement_method.proto.
 */
export declare const file_domain_payment_disbursement_method_disbursement_method: GenFile;
/**
 * @generated from message domain.payment.v1.DisbursementMethod
 */
export type DisbursementMethod = Message<"domain.payment.v1.DisbursementMethod"> & {
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
     * @generated from oneof domain.payment.v1.DisbursementMethod.method_details
     */
    methodDetails: {
        /**
         * @generated from field: domain.payment.v1.DisbursementCardDetails card = 8;
         */
        value: DisbursementCardDetails;
        case: "card";
    } | {
        /**
         * @generated from field: domain.payment.v1.DisbursementBankAccountDetails bank_account = 9;
         */
        value: DisbursementBankAccountDetails;
        case: "bankAccount";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * @generated from field: optional string provider_name = 10;
     */
    providerName?: string;
};
/**
 * Describes the message domain.payment.v1.DisbursementMethod.
 * Use `create(DisbursementMethodSchema)` to create a new message.
 */
export declare const DisbursementMethodSchema: GenMessage<DisbursementMethod>;
/**
 * @generated from message domain.payment.v1.DisbursementCardDetails
 */
export type DisbursementCardDetails = Message<"domain.payment.v1.DisbursementCardDetails"> & {
    /**
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
 * Describes the message domain.payment.v1.DisbursementCardDetails.
 * Use `create(DisbursementCardDetailsSchema)` to create a new message.
 */
export declare const DisbursementCardDetailsSchema: GenMessage<DisbursementCardDetails>;
/**
 * @generated from message domain.payment.v1.DisbursementBankAccountDetails
 */
export type DisbursementBankAccountDetails = Message<"domain.payment.v1.DisbursementBankAccountDetails"> & {
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
 * Describes the message domain.payment.v1.DisbursementBankAccountDetails.
 * Use `create(DisbursementBankAccountDetailsSchema)` to create a new message.
 */
export declare const DisbursementBankAccountDetailsSchema: GenMessage<DisbursementBankAccountDetails>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementMethodRequest
 */
export type CreateDisbursementMethodRequest = Message<"domain.payment.v1.CreateDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementMethod data = 1;
     */
    data?: DisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.CreateDisbursementMethodRequest.
 * Use `create(CreateDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementMethodRequestSchema: GenMessage<CreateDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementMethodResponse
 */
export type CreateDisbursementMethodResponse = Message<"domain.payment.v1.CreateDisbursementMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementMethod data = 1;
     */
    data: DisbursementMethod[];
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
 * Describes the message domain.payment.v1.CreateDisbursementMethodResponse.
 * Use `create(CreateDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementMethodResponseSchema: GenMessage<CreateDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementMethodRequest
 */
export type ReadDisbursementMethodRequest = Message<"domain.payment.v1.ReadDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementMethod data = 1;
     */
    data?: DisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.ReadDisbursementMethodRequest.
 * Use `create(ReadDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementMethodRequestSchema: GenMessage<ReadDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementMethodResponse
 */
export type ReadDisbursementMethodResponse = Message<"domain.payment.v1.ReadDisbursementMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementMethod data = 1;
     */
    data: DisbursementMethod[];
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
 * Describes the message domain.payment.v1.ReadDisbursementMethodResponse.
 * Use `create(ReadDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementMethodResponseSchema: GenMessage<ReadDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementMethodRequest
 */
export type UpdateDisbursementMethodRequest = Message<"domain.payment.v1.UpdateDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementMethod data = 1;
     */
    data?: DisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.UpdateDisbursementMethodRequest.
 * Use `create(UpdateDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementMethodRequestSchema: GenMessage<UpdateDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementMethodResponse
 */
export type UpdateDisbursementMethodResponse = Message<"domain.payment.v1.UpdateDisbursementMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementMethod data = 1;
     */
    data: DisbursementMethod[];
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
 * Describes the message domain.payment.v1.UpdateDisbursementMethodResponse.
 * Use `create(UpdateDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementMethodResponseSchema: GenMessage<UpdateDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementMethodRequest
 */
export type DeleteDisbursementMethodRequest = Message<"domain.payment.v1.DeleteDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementMethod data = 1;
     */
    data?: DisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.DeleteDisbursementMethodRequest.
 * Use `create(DeleteDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementMethodRequestSchema: GenMessage<DeleteDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementMethodResponse
 */
export type DeleteDisbursementMethodResponse = Message<"domain.payment.v1.DeleteDisbursementMethodResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteDisbursementMethodResponse.
 * Use `create(DeleteDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementMethodResponseSchema: GenMessage<DeleteDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.ListDisbursementMethodsRequest
 */
export type ListDisbursementMethodsRequest = Message<"domain.payment.v1.ListDisbursementMethodsRequest"> & {
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
 * Describes the message domain.payment.v1.ListDisbursementMethodsRequest.
 * Use `create(ListDisbursementMethodsRequestSchema)` to create a new message.
 */
export declare const ListDisbursementMethodsRequestSchema: GenMessage<ListDisbursementMethodsRequest>;
/**
 * @generated from message domain.payment.v1.ListDisbursementMethodsResponse
 */
export type ListDisbursementMethodsResponse = Message<"domain.payment.v1.ListDisbursementMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementMethod data = 1;
     */
    data: DisbursementMethod[];
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
 * Describes the message domain.payment.v1.ListDisbursementMethodsResponse.
 * Use `create(ListDisbursementMethodsResponseSchema)` to create a new message.
 */
export declare const ListDisbursementMethodsResponseSchema: GenMessage<ListDisbursementMethodsResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementMethodListPageDataRequest
 */
export type GetDisbursementMethodListPageDataRequest = Message<"domain.payment.v1.GetDisbursementMethodListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetDisbursementMethodListPageDataRequest.
 * Use `create(GetDisbursementMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementMethodListPageDataRequestSchema: GenMessage<GetDisbursementMethodListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementMethodListPageDataResponse
 */
export type GetDisbursementMethodListPageDataResponse = Message<"domain.payment.v1.GetDisbursementMethodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementMethod disbursement_method_list = 1;
     */
    disbursementMethodList: DisbursementMethod[];
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
 * Describes the message domain.payment.v1.GetDisbursementMethodListPageDataResponse.
 * Use `create(GetDisbursementMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementMethodListPageDataResponseSchema: GenMessage<GetDisbursementMethodListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementMethodItemPageDataRequest
 */
export type GetDisbursementMethodItemPageDataRequest = Message<"domain.payment.v1.GetDisbursementMethodItemPageDataRequest"> & {
    /**
     * @generated from field: string disbursement_method_id = 1;
     */
    disbursementMethodId: string;
};
/**
 * Describes the message domain.payment.v1.GetDisbursementMethodItemPageDataRequest.
 * Use `create(GetDisbursementMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementMethodItemPageDataRequestSchema: GenMessage<GetDisbursementMethodItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementMethodItemPageDataResponse
 */
export type GetDisbursementMethodItemPageDataResponse = Message<"domain.payment.v1.GetDisbursementMethodItemPageDataResponse"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementMethod disbursement_method = 1;
     */
    disbursementMethod?: DisbursementMethod;
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
 * Describes the message domain.payment.v1.GetDisbursementMethodItemPageDataResponse.
 * Use `create(GetDisbursementMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementMethodItemPageDataResponseSchema: GenMessage<GetDisbursementMethodItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.DisbursementMethodDomainService
 */
export declare const DisbursementMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.CreateDisbursementMethod
     */
    createDisbursementMethod: {
        methodKind: "unary";
        input: typeof CreateDisbursementMethodRequestSchema;
        output: typeof CreateDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.ReadDisbursementMethod
     */
    readDisbursementMethod: {
        methodKind: "unary";
        input: typeof ReadDisbursementMethodRequestSchema;
        output: typeof ReadDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.UpdateDisbursementMethod
     */
    updateDisbursementMethod: {
        methodKind: "unary";
        input: typeof UpdateDisbursementMethodRequestSchema;
        output: typeof UpdateDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.DeleteDisbursementMethod
     */
    deleteDisbursementMethod: {
        methodKind: "unary";
        input: typeof DeleteDisbursementMethodRequestSchema;
        output: typeof DeleteDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.ListDisbursementMethods
     */
    listDisbursementMethods: {
        methodKind: "unary";
        input: typeof ListDisbursementMethodsRequestSchema;
        output: typeof ListDisbursementMethodsResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.GetDisbursementMethodListPageData
     */
    getDisbursementMethodListPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementMethodListPageDataRequestSchema;
        output: typeof GetDisbursementMethodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementMethodDomainService.GetDisbursementMethodItemPageData
     */
    getDisbursementMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementMethodItemPageDataRequestSchema;
        output: typeof GetDisbursementMethodItemPageDataResponseSchema;
    };
}>;
