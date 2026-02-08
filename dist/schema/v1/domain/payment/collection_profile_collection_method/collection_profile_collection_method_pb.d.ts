import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { CollectionProfile } from "../collection_profile/collection_profile_pb";
import type { CollectionMethod } from "../collection_method/collection_method_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/collection_profile_collection_method/collection_profile_collection_method.proto.
 */
export declare const file_domain_payment_collection_profile_collection_method_collection_profile_collection_method: GenFile;
/**
 * @generated from message domain.payment.v1.CollectionProfileCollectionMethod
 */
export type CollectionProfileCollectionMethod = Message<"domain.payment.v1.CollectionProfileCollectionMethod"> & {
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
     * @generated from field: optional domain.payment.v1.CollectionProfile collection_profile = 7;
     */
    collectionProfile?: CollectionProfile;
    /**
     * @generated from field: string collection_profile_id = 8;
     */
    collectionProfileId: string;
    /**
     * @generated from field: optional domain.payment.v1.CollectionMethod collection_method = 9;
     */
    collectionMethod?: CollectionMethod;
    /**
     * @generated from field: string collection_method_id = 10;
     */
    collectionMethodId: string;
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
     * @generated from field: string payment_identifier = 14;
     */
    paymentIdentifier: string;
    /**
     * @generated from field: string identifier_type = 15;
     */
    identifierType: string;
    /**
     * @generated from field: optional string display_name = 16;
     */
    displayName?: string;
    /**
     * @generated from field: bool masked = 17;
     */
    masked: boolean;
};
/**
 * Describes the message domain.payment.v1.CollectionProfileCollectionMethod.
 * Use `create(CollectionProfileCollectionMethodSchema)` to create a new message.
 */
export declare const CollectionProfileCollectionMethodSchema: GenMessage<CollectionProfileCollectionMethod>;
/**
 * @generated from message domain.payment.v1.CreateCollectionProfileCollectionMethodRequest
 */
export type CreateCollectionProfileCollectionMethodRequest = Message<"domain.payment.v1.CreateCollectionProfileCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data?: CollectionProfileCollectionMethod;
};
/**
 * Describes the message domain.payment.v1.CreateCollectionProfileCollectionMethodRequest.
 * Use `create(CreateCollectionProfileCollectionMethodRequestSchema)` to create a new message.
 */
export declare const CreateCollectionProfileCollectionMethodRequestSchema: GenMessage<CreateCollectionProfileCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.CreateCollectionProfileCollectionMethodResponse
 */
export type CreateCollectionProfileCollectionMethodResponse = Message<"domain.payment.v1.CreateCollectionProfileCollectionMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data: CollectionProfileCollectionMethod[];
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
 * Describes the message domain.payment.v1.CreateCollectionProfileCollectionMethodResponse.
 * Use `create(CreateCollectionProfileCollectionMethodResponseSchema)` to create a new message.
 */
export declare const CreateCollectionProfileCollectionMethodResponseSchema: GenMessage<CreateCollectionProfileCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.ReadCollectionProfileCollectionMethodRequest
 */
export type ReadCollectionProfileCollectionMethodRequest = Message<"domain.payment.v1.ReadCollectionProfileCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data?: CollectionProfileCollectionMethod;
};
/**
 * Describes the message domain.payment.v1.ReadCollectionProfileCollectionMethodRequest.
 * Use `create(ReadCollectionProfileCollectionMethodRequestSchema)` to create a new message.
 */
export declare const ReadCollectionProfileCollectionMethodRequestSchema: GenMessage<ReadCollectionProfileCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.ReadCollectionProfileCollectionMethodResponse
 */
export type ReadCollectionProfileCollectionMethodResponse = Message<"domain.payment.v1.ReadCollectionProfileCollectionMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data: CollectionProfileCollectionMethod[];
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
 * Describes the message domain.payment.v1.ReadCollectionProfileCollectionMethodResponse.
 * Use `create(ReadCollectionProfileCollectionMethodResponseSchema)` to create a new message.
 */
export declare const ReadCollectionProfileCollectionMethodResponseSchema: GenMessage<ReadCollectionProfileCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionProfileCollectionMethodRequest
 */
export type UpdateCollectionProfileCollectionMethodRequest = Message<"domain.payment.v1.UpdateCollectionProfileCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data?: CollectionProfileCollectionMethod;
};
/**
 * Describes the message domain.payment.v1.UpdateCollectionProfileCollectionMethodRequest.
 * Use `create(UpdateCollectionProfileCollectionMethodRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionProfileCollectionMethodRequestSchema: GenMessage<UpdateCollectionProfileCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionProfileCollectionMethodResponse
 */
export type UpdateCollectionProfileCollectionMethodResponse = Message<"domain.payment.v1.UpdateCollectionProfileCollectionMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data: CollectionProfileCollectionMethod[];
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
 * Describes the message domain.payment.v1.UpdateCollectionProfileCollectionMethodResponse.
 * Use `create(UpdateCollectionProfileCollectionMethodResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionProfileCollectionMethodResponseSchema: GenMessage<UpdateCollectionProfileCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionProfileCollectionMethodRequest
 */
export type DeleteCollectionProfileCollectionMethodRequest = Message<"domain.payment.v1.DeleteCollectionProfileCollectionMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data?: CollectionProfileCollectionMethod;
};
/**
 * Describes the message domain.payment.v1.DeleteCollectionProfileCollectionMethodRequest.
 * Use `create(DeleteCollectionProfileCollectionMethodRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionProfileCollectionMethodRequestSchema: GenMessage<DeleteCollectionProfileCollectionMethodRequest>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionProfileCollectionMethodResponse
 */
export type DeleteCollectionProfileCollectionMethodResponse = Message<"domain.payment.v1.DeleteCollectionProfileCollectionMethodResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteCollectionProfileCollectionMethodResponse.
 * Use `create(DeleteCollectionProfileCollectionMethodResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionProfileCollectionMethodResponseSchema: GenMessage<DeleteCollectionProfileCollectionMethodResponse>;
/**
 * @generated from message domain.payment.v1.ListCollectionProfileCollectionMethodsRequest
 */
export type ListCollectionProfileCollectionMethodsRequest = Message<"domain.payment.v1.ListCollectionProfileCollectionMethodsRequest"> & {
    /**
     * @generated from field: optional string collection_profile_id = 1;
     */
    collectionProfileId?: string;
    /**
     * @generated from field: optional string collection_method_id = 2;
     */
    collectionMethodId?: string;
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
 * Describes the message domain.payment.v1.ListCollectionProfileCollectionMethodsRequest.
 * Use `create(ListCollectionProfileCollectionMethodsRequestSchema)` to create a new message.
 */
export declare const ListCollectionProfileCollectionMethodsRequestSchema: GenMessage<ListCollectionProfileCollectionMethodsRequest>;
/**
 * @generated from message domain.payment.v1.ListCollectionProfileCollectionMethodsResponse
 */
export type ListCollectionProfileCollectionMethodsResponse = Message<"domain.payment.v1.ListCollectionProfileCollectionMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfileCollectionMethod data = 1;
     */
    data: CollectionProfileCollectionMethod[];
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
 * Describes the message domain.payment.v1.ListCollectionProfileCollectionMethodsResponse.
 * Use `create(ListCollectionProfileCollectionMethodsResponseSchema)` to create a new message.
 */
export declare const ListCollectionProfileCollectionMethodsResponseSchema: GenMessage<ListCollectionProfileCollectionMethodsResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileCollectionMethodListPageDataRequest
 */
export type GetCollectionProfileCollectionMethodListPageDataRequest = Message<"domain.payment.v1.GetCollectionProfileCollectionMethodListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetCollectionProfileCollectionMethodListPageDataRequest.
 * Use `create(GetCollectionProfileCollectionMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionProfileCollectionMethodListPageDataRequestSchema: GenMessage<GetCollectionProfileCollectionMethodListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileCollectionMethodListPageDataResponse
 */
export type GetCollectionProfileCollectionMethodListPageDataResponse = Message<"domain.payment.v1.GetCollectionProfileCollectionMethodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfileCollectionMethod collection_profile_collection_method_list = 1;
     */
    collectionProfileCollectionMethodList: CollectionProfileCollectionMethod[];
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
 * Describes the message domain.payment.v1.GetCollectionProfileCollectionMethodListPageDataResponse.
 * Use `create(GetCollectionProfileCollectionMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionProfileCollectionMethodListPageDataResponseSchema: GenMessage<GetCollectionProfileCollectionMethodListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileCollectionMethodItemPageDataRequest
 */
export type GetCollectionProfileCollectionMethodItemPageDataRequest = Message<"domain.payment.v1.GetCollectionProfileCollectionMethodItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_profile_collection_method_id = 1;
     */
    collectionProfileCollectionMethodId: string;
};
/**
 * Describes the message domain.payment.v1.GetCollectionProfileCollectionMethodItemPageDataRequest.
 * Use `create(GetCollectionProfileCollectionMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionProfileCollectionMethodItemPageDataRequestSchema: GenMessage<GetCollectionProfileCollectionMethodItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileCollectionMethodItemPageDataResponse
 */
export type GetCollectionProfileCollectionMethodItemPageDataResponse = Message<"domain.payment.v1.GetCollectionProfileCollectionMethodItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payment.v1.CollectionProfileCollectionMethod collection_profile_collection_method = 1;
     */
    collectionProfileCollectionMethod?: CollectionProfileCollectionMethod;
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
 * Describes the message domain.payment.v1.GetCollectionProfileCollectionMethodItemPageDataResponse.
 * Use `create(GetCollectionProfileCollectionMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionProfileCollectionMethodItemPageDataResponseSchema: GenMessage<GetCollectionProfileCollectionMethodItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.CollectionProfileCollectionMethodDomainService
 */
export declare const CollectionProfileCollectionMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.CreateCollectionProfileCollectionMethod
     */
    createCollectionProfileCollectionMethod: {
        methodKind: "unary";
        input: typeof CreateCollectionProfileCollectionMethodRequestSchema;
        output: typeof CreateCollectionProfileCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.ReadCollectionProfileCollectionMethod
     */
    readCollectionProfileCollectionMethod: {
        methodKind: "unary";
        input: typeof ReadCollectionProfileCollectionMethodRequestSchema;
        output: typeof ReadCollectionProfileCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.UpdateCollectionProfileCollectionMethod
     */
    updateCollectionProfileCollectionMethod: {
        methodKind: "unary";
        input: typeof UpdateCollectionProfileCollectionMethodRequestSchema;
        output: typeof UpdateCollectionProfileCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.DeleteCollectionProfileCollectionMethod
     */
    deleteCollectionProfileCollectionMethod: {
        methodKind: "unary";
        input: typeof DeleteCollectionProfileCollectionMethodRequestSchema;
        output: typeof DeleteCollectionProfileCollectionMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.ListCollectionProfileCollectionMethods
     */
    listCollectionProfileCollectionMethods: {
        methodKind: "unary";
        input: typeof ListCollectionProfileCollectionMethodsRequestSchema;
        output: typeof ListCollectionProfileCollectionMethodsResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.GetCollectionProfileCollectionMethodListPageData
     */
    getCollectionProfileCollectionMethodListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionProfileCollectionMethodListPageDataRequestSchema;
        output: typeof GetCollectionProfileCollectionMethodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileCollectionMethodDomainService.GetCollectionProfileCollectionMethodItemPageData
     */
    getCollectionProfileCollectionMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionProfileCollectionMethodItemPageDataRequestSchema;
        output: typeof GetCollectionProfileCollectionMethodItemPageDataResponseSchema;
    };
}>;
