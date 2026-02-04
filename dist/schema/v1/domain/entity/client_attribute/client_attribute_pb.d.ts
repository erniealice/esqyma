import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Client } from "../client/client_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/client_attribute/client_attribute.proto.
 */
export declare const file_domain_entity_client_attribute_client_attribute: GenFile;
/**
 * @generated from message domain.entity.v1.ClientAttribute
 */
export type ClientAttribute = Message<"domain.entity.v1.ClientAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string client_id = 2;
     */
    clientId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.entity.v1.Client client = 5;
     */
    client?: Client;
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
 * Describes the message domain.entity.v1.ClientAttribute.
 * Use `create(ClientAttributeSchema)` to create a new message.
 */
export declare const ClientAttributeSchema: GenMessage<ClientAttribute>;
/**
 * @generated from message domain.entity.v1.CreateClientAttributeRequest
 */
export type CreateClientAttributeRequest = Message<"domain.entity.v1.CreateClientAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientAttribute data = 1;
     */
    data?: ClientAttribute;
};
/**
 * Describes the message domain.entity.v1.CreateClientAttributeRequest.
 * Use `create(CreateClientAttributeRequestSchema)` to create a new message.
 */
export declare const CreateClientAttributeRequestSchema: GenMessage<CreateClientAttributeRequest>;
/**
 * @generated from message domain.entity.v1.CreateClientAttributeResponse
 */
export type CreateClientAttributeResponse = Message<"domain.entity.v1.CreateClientAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientAttribute data = 1;
     */
    data: ClientAttribute[];
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
 * Describes the message domain.entity.v1.CreateClientAttributeResponse.
 * Use `create(CreateClientAttributeResponseSchema)` to create a new message.
 */
export declare const CreateClientAttributeResponseSchema: GenMessage<CreateClientAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ReadClientAttributeRequest
 */
export type ReadClientAttributeRequest = Message<"domain.entity.v1.ReadClientAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientAttribute data = 1;
     */
    data?: ClientAttribute;
};
/**
 * Describes the message domain.entity.v1.ReadClientAttributeRequest.
 * Use `create(ReadClientAttributeRequestSchema)` to create a new message.
 */
export declare const ReadClientAttributeRequestSchema: GenMessage<ReadClientAttributeRequest>;
/**
 * @generated from message domain.entity.v1.ReadClientAttributeResponse
 */
export type ReadClientAttributeResponse = Message<"domain.entity.v1.ReadClientAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientAttribute data = 1;
     */
    data: ClientAttribute[];
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
 * Describes the message domain.entity.v1.ReadClientAttributeResponse.
 * Use `create(ReadClientAttributeResponseSchema)` to create a new message.
 */
export declare const ReadClientAttributeResponseSchema: GenMessage<ReadClientAttributeResponse>;
/**
 * @generated from message domain.entity.v1.UpdateClientAttributeRequest
 */
export type UpdateClientAttributeRequest = Message<"domain.entity.v1.UpdateClientAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientAttribute data = 1;
     */
    data?: ClientAttribute;
};
/**
 * Describes the message domain.entity.v1.UpdateClientAttributeRequest.
 * Use `create(UpdateClientAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateClientAttributeRequestSchema: GenMessage<UpdateClientAttributeRequest>;
/**
 * @generated from message domain.entity.v1.UpdateClientAttributeResponse
 */
export type UpdateClientAttributeResponse = Message<"domain.entity.v1.UpdateClientAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientAttribute data = 1;
     */
    data: ClientAttribute[];
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
 * Describes the message domain.entity.v1.UpdateClientAttributeResponse.
 * Use `create(UpdateClientAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateClientAttributeResponseSchema: GenMessage<UpdateClientAttributeResponse>;
/**
 * @generated from message domain.entity.v1.DeleteClientAttributeRequest
 */
export type DeleteClientAttributeRequest = Message<"domain.entity.v1.DeleteClientAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientAttribute data = 1;
     */
    data?: ClientAttribute;
};
/**
 * Describes the message domain.entity.v1.DeleteClientAttributeRequest.
 * Use `create(DeleteClientAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteClientAttributeRequestSchema: GenMessage<DeleteClientAttributeRequest>;
/**
 * @generated from message domain.entity.v1.DeleteClientAttributeResponse
 */
export type DeleteClientAttributeResponse = Message<"domain.entity.v1.DeleteClientAttributeResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteClientAttributeResponse.
 * Use `create(DeleteClientAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteClientAttributeResponseSchema: GenMessage<DeleteClientAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ListClientAttributesRequest
 */
export type ListClientAttributesRequest = Message<"domain.entity.v1.ListClientAttributesRequest"> & {
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
 * Describes the message domain.entity.v1.ListClientAttributesRequest.
 * Use `create(ListClientAttributesRequestSchema)` to create a new message.
 */
export declare const ListClientAttributesRequestSchema: GenMessage<ListClientAttributesRequest>;
/**
 * @generated from message domain.entity.v1.ListClientAttributesResponse
 */
export type ListClientAttributesResponse = Message<"domain.entity.v1.ListClientAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientAttribute data = 1;
     */
    data: ClientAttribute[];
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
 * Describes the message domain.entity.v1.ListClientAttributesResponse.
 * Use `create(ListClientAttributesResponseSchema)` to create a new message.
 */
export declare const ListClientAttributesResponseSchema: GenMessage<ListClientAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.entity.v1.GetClientAttributeListPageDataRequest
 */
export type GetClientAttributeListPageDataRequest = Message<"domain.entity.v1.GetClientAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetClientAttributeListPageDataRequest.
 * Use `create(GetClientAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientAttributeListPageDataRequestSchema: GenMessage<GetClientAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetClientAttributeListPageDataResponse
 */
export type GetClientAttributeListPageDataResponse = Message<"domain.entity.v1.GetClientAttributeListPageDataResponse"> & {
    /**
     * The client attribute data
     *
     * @generated from field: repeated domain.entity.v1.ClientAttribute client_attribute_list = 1;
     */
    clientAttributeList: ClientAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.entity.v1.GetClientAttributeListPageDataResponse.
 * Use `create(GetClientAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientAttributeListPageDataResponseSchema: GenMessage<GetClientAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetClientAttributeItemPageDataRequest
 */
export type GetClientAttributeItemPageDataRequest = Message<"domain.entity.v1.GetClientAttributeItemPageDataRequest"> & {
    /**
     * The client attribute ID to retrieve
     *
     * @generated from field: string client_attribute_id = 1;
     */
    clientAttributeId: string;
};
/**
 * Describes the message domain.entity.v1.GetClientAttributeItemPageDataRequest.
 * Use `create(GetClientAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientAttributeItemPageDataRequestSchema: GenMessage<GetClientAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetClientAttributeItemPageDataResponse
 */
export type GetClientAttributeItemPageDataResponse = Message<"domain.entity.v1.GetClientAttributeItemPageDataResponse"> & {
    /**
     * The client attribute data
     *
     * @generated from field: domain.entity.v1.ClientAttribute client_attribute = 1;
     */
    clientAttribute?: ClientAttribute;
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
 * Describes the message domain.entity.v1.GetClientAttributeItemPageDataResponse.
 * Use `create(GetClientAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientAttributeItemPageDataResponseSchema: GenMessage<GetClientAttributeItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.ClientAttributeDomainService
 */
export declare const ClientAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.CreateClientAttribute
     */
    createClientAttribute: {
        methodKind: "unary";
        input: typeof CreateClientAttributeRequestSchema;
        output: typeof CreateClientAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.ReadClientAttribute
     */
    readClientAttribute: {
        methodKind: "unary";
        input: typeof ReadClientAttributeRequestSchema;
        output: typeof ReadClientAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.UpdateClientAttribute
     */
    updateClientAttribute: {
        methodKind: "unary";
        input: typeof UpdateClientAttributeRequestSchema;
        output: typeof UpdateClientAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.DeleteClientAttribute
     */
    deleteClientAttribute: {
        methodKind: "unary";
        input: typeof DeleteClientAttributeRequestSchema;
        output: typeof DeleteClientAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.ListClientAttributes
     */
    listClientAttributes: {
        methodKind: "unary";
        input: typeof ListClientAttributesRequestSchema;
        output: typeof ListClientAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.GetClientAttributeListPageData
     */
    getClientAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetClientAttributeListPageDataRequestSchema;
        output: typeof GetClientAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.ClientAttributeDomainService.GetClientAttributeItemPageData
     */
    getClientAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetClientAttributeItemPageDataRequestSchema;
        output: typeof GetClientAttributeItemPageDataResponseSchema;
    };
}>;
