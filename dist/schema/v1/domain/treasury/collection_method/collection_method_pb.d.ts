import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/collection_method/collection_method.proto.
 */
export declare const file_domain_payment_collection_method_collection_method: GenFile;
/**
 * @generated from message domain.payment.v1.CollectionMethod
 */
export type CollectionMethod = Message<"domain.payment.v1.CollectionMethod"> & {
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
     * @generated from oneof domain.payment.v1.CollectionMethod.method_details
     */
    methodDetails: {
        /**
         * @generated from field: domain.payment.v1.CollectionCardDetails card = 8;
         */
        value: CollectionCardDetails;
        case: "card";
    } | {
        /**
         * @generated from field: domain.payment.v1.CollectionBankAccountDetails bank_account = 9;
         */
        value: CollectionBankAccountDetails;
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
 * Describes the message domain.payment.v1.CollectionMethod.
 * Use `create(CollectionMethodSchema)` to create a new message.
 */
export declare const CollectionMethodSchema: GenMessage<CollectionMethod>;
/**
 * @generated from message domain.payment.v1.CollectionCardDetails
 */
export type CollectionCardDetails = Message<"domain.payment.v1.CollectionCardDetails"> & {
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
 * Describes the message domain.payment.v1.CollectionCardDetails.
 * Use `create(CollectionCardDetailsSchema)` to create a new message.
 */
export declare const CollectionCardDetailsSchema: GenMessage<CollectionCardDetails>;
/**
 * @generated from message domain.payment.v1.CollectionBankAccountDetails
 */
export type CollectionBankAccountDetails = Message<"domain.payment.v1.CollectionBankAccountDetails"> & {
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
 * Describes the message domain.payment.v1.CollectionBankAccountDetails.
 * Use `create(CollectionBankAccountDetailsSchema)` to create a new message.
 */
export declare const CollectionBankAccountDetailsSchema: GenMessage<CollectionBankAccountDetails>;
/**
 * @generated from message domain.payment.v1.CreateCollectionMethodRequest
 */
export type CreateCollectionMethodRequest = Message<"domain.payment.v1.CreateCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionMethod data = 1;
     */
    data?: CollectionMethod;
};
/**
 * Describes the message domain.payment.v1.CreateCollectionMethodRequest.
 * Use `create(CreateCollectionMethodRequestSchema)` to create a new message.
 */
export declare const CreateCollectionMethodRequestSchema: GenMessage<CreateCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.CreateCollectionMethodResponse
 */
export type CreateCollectionMethodResponse = Message<"domain.payment.v1.CreateCollectionMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionMethod data = 1;
     */
    data: CollectionMethod[];
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
 * Describes the message domain.payment.v1.CreateCollectionMethodResponse.
 * Use `create(CreateCollectionMethodResponseSchema)` to create a new message.
 */
export declare const CreateCollectionMethodResponseSchema: GenMessage<CreateCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.ReadCollectionMethodRequest
 */
export type ReadCollectionMethodRequest = Message<"domain.payment.v1.ReadCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionMethod data = 1;
     */
    data?: CollectionMethod;
};
/**
 * Describes the message domain.payment.v1.ReadCollectionMethodRequest.
 * Use `create(ReadCollectionMethodRequestSchema)` to create a new message.
 */
export declare const ReadCollectionMethodRequestSchema: GenMessage<ReadCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.ReadCollectionMethodResponse
 */
export type ReadCollectionMethodResponse = Message<"domain.payment.v1.ReadCollectionMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionMethod data = 1;
     */
    data: CollectionMethod[];
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
 * Describes the message domain.payment.v1.ReadCollectionMethodResponse.
 * Use `create(ReadCollectionMethodResponseSchema)` to create a new message.
 */
export declare const ReadCollectionMethodResponseSchema: GenMessage<ReadCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionMethodRequest
 */
export type UpdateCollectionMethodRequest = Message<"domain.payment.v1.UpdateCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionMethod data = 1;
     */
    data?: CollectionMethod;
};
/**
 * Describes the message domain.payment.v1.UpdateCollectionMethodRequest.
 * Use `create(UpdateCollectionMethodRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionMethodRequestSchema: GenMessage<UpdateCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionMethodResponse
 */
export type UpdateCollectionMethodResponse = Message<"domain.payment.v1.UpdateCollectionMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionMethod data = 1;
     */
    data: CollectionMethod[];
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
 * Describes the message domain.payment.v1.UpdateCollectionMethodResponse.
 * Use `create(UpdateCollectionMethodResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionMethodResponseSchema: GenMessage<UpdateCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionMethodRequest
 */
export type DeleteCollectionMethodRequest = Message<"domain.payment.v1.DeleteCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionMethod data = 1;
     */
    data?: CollectionMethod;
};
/**
 * Describes the message domain.payment.v1.DeleteCollectionMethodRequest.
 * Use `create(DeleteCollectionMethodRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionMethodRequestSchema: GenMessage<DeleteCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionMethodResponse
 */
export type DeleteCollectionMethodResponse = Message<"domain.payment.v1.DeleteCollectionMethodResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteCollectionMethodResponse.
 * Use `create(DeleteCollectionMethodResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionMethodResponseSchema: GenMessage<DeleteCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.ListCollectionMethodsRequest
 */
export type ListCollectionMethodsRequest = Message<"domain.payment.v1.ListCollectionMethodsRequest"> & {
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
 * Describes the message domain.payment.v1.ListCollectionMethodsRequest.
 * Use `create(ListCollectionMethodsRequestSchema)` to create a new message.
 */
export declare const ListCollectionMethodsRequestSchema: GenMessage<ListCollectionMethodsRequest>;
/**
 * @generated from message domain.payment.v1.ListCollectionMethodsResponse
 */
export type ListCollectionMethodsResponse = Message<"domain.payment.v1.ListCollectionMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionMethod data = 1;
     */
    data: CollectionMethod[];
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
 * Describes the message domain.payment.v1.ListCollectionMethodsResponse.
 * Use `create(ListCollectionMethodsResponseSchema)` to create a new message.
 */
export declare const ListCollectionMethodsResponseSchema: GenMessage<ListCollectionMethodsResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionMethodListPageDataRequest
 */
export type GetCollectionMethodListPageDataRequest = Message<"domain.payment.v1.GetCollectionMethodListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetCollectionMethodListPageDataRequest.
 * Use `create(GetCollectionMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionMethodListPageDataRequestSchema: GenMessage<GetCollectionMethodListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionMethodListPageDataResponse
 */
export type GetCollectionMethodListPageDataResponse = Message<"domain.payment.v1.GetCollectionMethodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionMethod collection_method_list = 1;
     */
    collectionMethodList: CollectionMethod[];
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
 * Describes the message domain.payment.v1.GetCollectionMethodListPageDataResponse.
 * Use `create(GetCollectionMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionMethodListPageDataResponseSchema: GenMessage<GetCollectionMethodListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionMethodItemPageDataRequest
 */
export type GetCollectionMethodItemPageDataRequest = Message<"domain.payment.v1.GetCollectionMethodItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_method_id = 1;
     */
    collectionMethodId: string;
};
/**
 * Describes the message domain.payment.v1.GetCollectionMethodItemPageDataRequest.
 * Use `create(GetCollectionMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionMethodItemPageDataRequestSchema: GenMessage<GetCollectionMethodItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionMethodItemPageDataResponse
 */
export type GetCollectionMethodItemPageDataResponse = Message<"domain.payment.v1.GetCollectionMethodItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payment.v1.CollectionMethod collection_method = 1;
     */
    collectionMethod?: CollectionMethod;
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
 * Describes the message domain.payment.v1.GetCollectionMethodItemPageDataResponse.
 * Use `create(GetCollectionMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionMethodItemPageDataResponseSchema: GenMessage<GetCollectionMethodItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.CollectionMethodDomainService
 */
export declare const CollectionMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.CreateCollectionMethod
     */
    createCollectionMethod: {
        methodKind: "unary";
        input: typeof CreateCollectionMethodRequestSchema;
        output: typeof CreateCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.ReadCollectionMethod
     */
    readCollectionMethod: {
        methodKind: "unary";
        input: typeof ReadCollectionMethodRequestSchema;
        output: typeof ReadCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.UpdateCollectionMethod
     */
    updateCollectionMethod: {
        methodKind: "unary";
        input: typeof UpdateCollectionMethodRequestSchema;
        output: typeof UpdateCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.DeleteCollectionMethod
     */
    deleteCollectionMethod: {
        methodKind: "unary";
        input: typeof DeleteCollectionMethodRequestSchema;
        output: typeof DeleteCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.ListCollectionMethods
     */
    listCollectionMethods: {
        methodKind: "unary";
        input: typeof ListCollectionMethodsRequestSchema;
        output: typeof ListCollectionMethodsResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.GetCollectionMethodListPageData
     */
    getCollectionMethodListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionMethodListPageDataRequestSchema;
        output: typeof GetCollectionMethodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionMethodDomainService.GetCollectionMethodItemPageData
     */
    getCollectionMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionMethodItemPageDataRequestSchema;
        output: typeof GetCollectionMethodItemPageDataResponseSchema;
    };
}>;
