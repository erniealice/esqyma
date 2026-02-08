import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Collection } from "../collection/collection_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/collection_attribute/collection_attribute.proto.
 */
export declare const file_domain_payment_collection_attribute_collection_attribute: GenFile;
/**
 * @generated from message domain.payment.v1.CollectionAttribute
 */
export type CollectionAttribute = Message<"domain.payment.v1.CollectionAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string collection_id = 2;
     */
    collectionId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.payment.v1.Collection collection = 5;
     */
    collection?: Collection;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.payment.v1.CollectionAttribute.
 * Use `create(CollectionAttributeSchema)` to create a new message.
 */
export declare const CollectionAttributeSchema: GenMessage<CollectionAttribute>;
/**
 * @generated from message domain.payment.v1.CreateCollectionAttributeRequest
 */
export type CreateCollectionAttributeRequest = Message<"domain.payment.v1.CreateCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.payment.v1.CreateCollectionAttributeRequest.
 * Use `create(CreateCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const CreateCollectionAttributeRequestSchema: GenMessage<CreateCollectionAttributeRequest>;
/**
 * @generated from message domain.payment.v1.CreateCollectionAttributeResponse
 */
export type CreateCollectionAttributeResponse = Message<"domain.payment.v1.CreateCollectionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.CreateCollectionAttributeResponse.
 * Use `create(CreateCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const CreateCollectionAttributeResponseSchema: GenMessage<CreateCollectionAttributeResponse>;
/**
 * @generated from message domain.payment.v1.CreateCollectionAttributeBatchRequest
 */
export type CreateCollectionAttributeBatchRequest = Message<"domain.payment.v1.CreateCollectionAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
};
/**
 * Describes the message domain.payment.v1.CreateCollectionAttributeBatchRequest.
 * Use `create(CreateCollectionAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateCollectionAttributeBatchRequestSchema: GenMessage<CreateCollectionAttributeBatchRequest>;
/**
 * @generated from message domain.payment.v1.CreateCollectionAttributeBatchResponse
 */
export type CreateCollectionAttributeBatchResponse = Message<"domain.payment.v1.CreateCollectionAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.CreateCollectionAttributeBatchResponse.
 * Use `create(CreateCollectionAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateCollectionAttributeBatchResponseSchema: GenMessage<CreateCollectionAttributeBatchResponse>;
/**
 * CreateCollectionAttributesByCode creates collection attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.payment.v1.CollectionAttributesByCodeData
 */
export type CollectionAttributesByCodeData = Message<"domain.payment.v1.CollectionAttributesByCodeData"> & {
    /**
     * @generated from field: string collection_id = 1;
     */
    collectionId: string;
    /**
     * {"attribute_code": "value", ...}
     *
     * @generated from field: map<string, string> attributes_map = 2;
     */
    attributesMap: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.payment.v1.CollectionAttributesByCodeData.
 * Use `create(CollectionAttributesByCodeDataSchema)` to create a new message.
 */
export declare const CollectionAttributesByCodeDataSchema: GenMessage<CollectionAttributesByCodeData>;
/**
 * @generated from message domain.payment.v1.CreateCollectionAttributesByCodeRequest
 */
export type CreateCollectionAttributesByCodeRequest = Message<"domain.payment.v1.CreateCollectionAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionAttributesByCodeData data = 1;
     */
    data?: CollectionAttributesByCodeData;
};
/**
 * Describes the message domain.payment.v1.CreateCollectionAttributesByCodeRequest.
 * Use `create(CreateCollectionAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateCollectionAttributesByCodeRequestSchema: GenMessage<CreateCollectionAttributesByCodeRequest>;
/**
 * @generated from message domain.payment.v1.CreateCollectionAttributesByCodeResponse
 */
export type CreateCollectionAttributesByCodeResponse = Message<"domain.payment.v1.CreateCollectionAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.CreateCollectionAttributesByCodeResponse.
 * Use `create(CreateCollectionAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateCollectionAttributesByCodeResponseSchema: GenMessage<CreateCollectionAttributesByCodeResponse>;
/**
 * @generated from message domain.payment.v1.ReadCollectionAttributeRequest
 */
export type ReadCollectionAttributeRequest = Message<"domain.payment.v1.ReadCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.payment.v1.ReadCollectionAttributeRequest.
 * Use `create(ReadCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const ReadCollectionAttributeRequestSchema: GenMessage<ReadCollectionAttributeRequest>;
/**
 * @generated from message domain.payment.v1.ReadCollectionAttributeResponse
 */
export type ReadCollectionAttributeResponse = Message<"domain.payment.v1.ReadCollectionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.ReadCollectionAttributeResponse.
 * Use `create(ReadCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const ReadCollectionAttributeResponseSchema: GenMessage<ReadCollectionAttributeResponse>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionAttributeRequest
 */
export type UpdateCollectionAttributeRequest = Message<"domain.payment.v1.UpdateCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.payment.v1.UpdateCollectionAttributeRequest.
 * Use `create(UpdateCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionAttributeRequestSchema: GenMessage<UpdateCollectionAttributeRequest>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionAttributeResponse
 */
export type UpdateCollectionAttributeResponse = Message<"domain.payment.v1.UpdateCollectionAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.UpdateCollectionAttributeResponse.
 * Use `create(UpdateCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionAttributeResponseSchema: GenMessage<UpdateCollectionAttributeResponse>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionAttributeRequest
 */
export type DeleteCollectionAttributeRequest = Message<"domain.payment.v1.DeleteCollectionAttributeRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionAttribute data = 1;
     */
    data?: CollectionAttribute;
};
/**
 * Describes the message domain.payment.v1.DeleteCollectionAttributeRequest.
 * Use `create(DeleteCollectionAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionAttributeRequestSchema: GenMessage<DeleteCollectionAttributeRequest>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionAttributeResponse
 */
export type DeleteCollectionAttributeResponse = Message<"domain.payment.v1.DeleteCollectionAttributeResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteCollectionAttributeResponse.
 * Use `create(DeleteCollectionAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionAttributeResponseSchema: GenMessage<DeleteCollectionAttributeResponse>;
/**
 * @generated from message domain.payment.v1.ListCollectionAttributesRequest
 */
export type ListCollectionAttributesRequest = Message<"domain.payment.v1.ListCollectionAttributesRequest"> & {
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
 * Describes the message domain.payment.v1.ListCollectionAttributesRequest.
 * Use `create(ListCollectionAttributesRequestSchema)` to create a new message.
 */
export declare const ListCollectionAttributesRequestSchema: GenMessage<ListCollectionAttributesRequest>;
/**
 * @generated from message domain.payment.v1.ListCollectionAttributesResponse
 */
export type ListCollectionAttributesResponse = Message<"domain.payment.v1.ListCollectionAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute data = 1;
     */
    data: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.ListCollectionAttributesResponse.
 * Use `create(ListCollectionAttributesResponseSchema)` to create a new message.
 */
export declare const ListCollectionAttributesResponseSchema: GenMessage<ListCollectionAttributesResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionAttributeListPageDataRequest
 */
export type GetCollectionAttributeListPageDataRequest = Message<"domain.payment.v1.GetCollectionAttributeListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetCollectionAttributeListPageDataRequest.
 * Use `create(GetCollectionAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionAttributeListPageDataRequestSchema: GenMessage<GetCollectionAttributeListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionAttributeListPageDataResponse
 */
export type GetCollectionAttributeListPageDataResponse = Message<"domain.payment.v1.GetCollectionAttributeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionAttribute collection_attribute_list = 1;
     */
    collectionAttributeList: CollectionAttribute[];
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
 * Describes the message domain.payment.v1.GetCollectionAttributeListPageDataResponse.
 * Use `create(GetCollectionAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionAttributeListPageDataResponseSchema: GenMessage<GetCollectionAttributeListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionAttributeItemPageDataRequest
 */
export type GetCollectionAttributeItemPageDataRequest = Message<"domain.payment.v1.GetCollectionAttributeItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_attribute_id = 1;
     */
    collectionAttributeId: string;
};
/**
 * Describes the message domain.payment.v1.GetCollectionAttributeItemPageDataRequest.
 * Use `create(GetCollectionAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionAttributeItemPageDataRequestSchema: GenMessage<GetCollectionAttributeItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionAttributeItemPageDataResponse
 */
export type GetCollectionAttributeItemPageDataResponse = Message<"domain.payment.v1.GetCollectionAttributeItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payment.v1.CollectionAttribute collection_attribute = 1;
     */
    collectionAttribute?: CollectionAttribute;
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
 * Describes the message domain.payment.v1.GetCollectionAttributeItemPageDataResponse.
 * Use `create(GetCollectionAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionAttributeItemPageDataResponseSchema: GenMessage<GetCollectionAttributeItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.CollectionAttributeDomainService
 */
export declare const CollectionAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.CreateCollectionAttribute
     */
    createCollectionAttribute: {
        methodKind: "unary";
        input: typeof CreateCollectionAttributeRequestSchema;
        output: typeof CreateCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.ReadCollectionAttribute
     */
    readCollectionAttribute: {
        methodKind: "unary";
        input: typeof ReadCollectionAttributeRequestSchema;
        output: typeof ReadCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.UpdateCollectionAttribute
     */
    updateCollectionAttribute: {
        methodKind: "unary";
        input: typeof UpdateCollectionAttributeRequestSchema;
        output: typeof UpdateCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.DeleteCollectionAttribute
     */
    deleteCollectionAttribute: {
        methodKind: "unary";
        input: typeof DeleteCollectionAttributeRequestSchema;
        output: typeof DeleteCollectionAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.ListCollectionAttributes
     */
    listCollectionAttributes: {
        methodKind: "unary";
        input: typeof ListCollectionAttributesRequestSchema;
        output: typeof ListCollectionAttributesResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.GetCollectionAttributeListPageData
     */
    getCollectionAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionAttributeListPageDataRequestSchema;
        output: typeof GetCollectionAttributeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionAttributeDomainService.GetCollectionAttributeItemPageData
     */
    getCollectionAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionAttributeItemPageDataRequestSchema;
        output: typeof GetCollectionAttributeItemPageDataResponseSchema;
    };
}>;
