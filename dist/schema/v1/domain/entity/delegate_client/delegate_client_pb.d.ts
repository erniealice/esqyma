import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Client } from "../client/client_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/delegate_client/delegate_client.proto.
 */
export declare const file_domain_entity_delegate_client_delegate_client: GenFile;
/**
 * @generated from message domain.entity.v1.DelegateClient
 */
export type DelegateClient = Message<"domain.entity.v1.DelegateClient"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string delegate_id = 2;
     */
    delegateId: string;
    /**
     * @generated from field: optional domain.entity.v1.Client client = 3;
     */
    client?: Client;
    /**
     * @generated from field: string client_id = 4;
     */
    clientId: string;
    /**
     * @generated from field: optional int64 date_created = 5;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 6;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 7;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 8;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.DelegateClient.
 * Use `create(DelegateClientSchema)` to create a new message.
 */
export declare const DelegateClientSchema: GenMessage<DelegateClient>;
/**
 * @generated from message domain.entity.v1.CreateDelegateClientRequest
 */
export type CreateDelegateClientRequest = Message<"domain.entity.v1.CreateDelegateClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateClient data = 1;
     */
    data?: DelegateClient;
};
/**
 * Describes the message domain.entity.v1.CreateDelegateClientRequest.
 * Use `create(CreateDelegateClientRequestSchema)` to create a new message.
 */
export declare const CreateDelegateClientRequestSchema: GenMessage<CreateDelegateClientRequest>;
/**
 * @generated from message domain.entity.v1.CreateDelegateClientResponse
 */
export type CreateDelegateClientResponse = Message<"domain.entity.v1.CreateDelegateClientResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateClient data = 1;
     */
    data: DelegateClient[];
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
 * Describes the message domain.entity.v1.CreateDelegateClientResponse.
 * Use `create(CreateDelegateClientResponseSchema)` to create a new message.
 */
export declare const CreateDelegateClientResponseSchema: GenMessage<CreateDelegateClientResponse>;
/**
 * @generated from message domain.entity.v1.ReadDelegateClientRequest
 */
export type ReadDelegateClientRequest = Message<"domain.entity.v1.ReadDelegateClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateClient data = 1;
     */
    data?: DelegateClient;
};
/**
 * Describes the message domain.entity.v1.ReadDelegateClientRequest.
 * Use `create(ReadDelegateClientRequestSchema)` to create a new message.
 */
export declare const ReadDelegateClientRequestSchema: GenMessage<ReadDelegateClientRequest>;
/**
 * @generated from message domain.entity.v1.ReadDelegateClientResponse
 */
export type ReadDelegateClientResponse = Message<"domain.entity.v1.ReadDelegateClientResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateClient data = 1;
     */
    data: DelegateClient[];
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
 * Describes the message domain.entity.v1.ReadDelegateClientResponse.
 * Use `create(ReadDelegateClientResponseSchema)` to create a new message.
 */
export declare const ReadDelegateClientResponseSchema: GenMessage<ReadDelegateClientResponse>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateClientRequest
 */
export type UpdateDelegateClientRequest = Message<"domain.entity.v1.UpdateDelegateClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateClient data = 1;
     */
    data?: DelegateClient;
};
/**
 * Describes the message domain.entity.v1.UpdateDelegateClientRequest.
 * Use `create(UpdateDelegateClientRequestSchema)` to create a new message.
 */
export declare const UpdateDelegateClientRequestSchema: GenMessage<UpdateDelegateClientRequest>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateClientResponse
 */
export type UpdateDelegateClientResponse = Message<"domain.entity.v1.UpdateDelegateClientResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateClient data = 1;
     */
    data: DelegateClient[];
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
 * Describes the message domain.entity.v1.UpdateDelegateClientResponse.
 * Use `create(UpdateDelegateClientResponseSchema)` to create a new message.
 */
export declare const UpdateDelegateClientResponseSchema: GenMessage<UpdateDelegateClientResponse>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateClientRequest
 */
export type DeleteDelegateClientRequest = Message<"domain.entity.v1.DeleteDelegateClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.DelegateClient data = 1;
     */
    data?: DelegateClient;
};
/**
 * Describes the message domain.entity.v1.DeleteDelegateClientRequest.
 * Use `create(DeleteDelegateClientRequestSchema)` to create a new message.
 */
export declare const DeleteDelegateClientRequestSchema: GenMessage<DeleteDelegateClientRequest>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateClientResponse
 */
export type DeleteDelegateClientResponse = Message<"domain.entity.v1.DeleteDelegateClientResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteDelegateClientResponse.
 * Use `create(DeleteDelegateClientResponseSchema)` to create a new message.
 */
export declare const DeleteDelegateClientResponseSchema: GenMessage<DeleteDelegateClientResponse>;
/**
 * @generated from message domain.entity.v1.ListDelegateClientsRequest
 */
export type ListDelegateClientsRequest = Message<"domain.entity.v1.ListDelegateClientsRequest"> & {
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
 * Describes the message domain.entity.v1.ListDelegateClientsRequest.
 * Use `create(ListDelegateClientsRequestSchema)` to create a new message.
 */
export declare const ListDelegateClientsRequestSchema: GenMessage<ListDelegateClientsRequest>;
/**
 * @generated from message domain.entity.v1.ListDelegateClientsResponse
 */
export type ListDelegateClientsResponse = Message<"domain.entity.v1.ListDelegateClientsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateClient data = 1;
     */
    data: DelegateClient[];
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
 * Describes the message domain.entity.v1.ListDelegateClientsResponse.
 * Use `create(ListDelegateClientsResponseSchema)` to create a new message.
 */
export declare const ListDelegateClientsResponseSchema: GenMessage<ListDelegateClientsResponse>;
/**
 * @generated from message domain.entity.v1.GetDelegateClientListPageDataRequest
 */
export type GetDelegateClientListPageDataRequest = Message<"domain.entity.v1.GetDelegateClientListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetDelegateClientListPageDataRequest.
 * Use `create(GetDelegateClientListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateClientListPageDataRequestSchema: GenMessage<GetDelegateClientListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetDelegateClientListPageDataResponse
 */
export type GetDelegateClientListPageDataResponse = Message<"domain.entity.v1.GetDelegateClientListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.DelegateClient delegate_client_list = 1;
     */
    delegateClientList: DelegateClient[];
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
 * Describes the message domain.entity.v1.GetDelegateClientListPageDataResponse.
 * Use `create(GetDelegateClientListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateClientListPageDataResponseSchema: GenMessage<GetDelegateClientListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetDelegateClientItemPageDataRequest
 */
export type GetDelegateClientItemPageDataRequest = Message<"domain.entity.v1.GetDelegateClientItemPageDataRequest"> & {
    /**
     * @generated from field: string delegate_client_id = 1;
     */
    delegateClientId: string;
};
/**
 * Describes the message domain.entity.v1.GetDelegateClientItemPageDataRequest.
 * Use `create(GetDelegateClientItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateClientItemPageDataRequestSchema: GenMessage<GetDelegateClientItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetDelegateClientItemPageDataResponse
 */
export type GetDelegateClientItemPageDataResponse = Message<"domain.entity.v1.GetDelegateClientItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.DelegateClient delegate_client = 1;
     */
    delegateClient?: DelegateClient;
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
 * Describes the message domain.entity.v1.GetDelegateClientItemPageDataResponse.
 * Use `create(GetDelegateClientItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateClientItemPageDataResponseSchema: GenMessage<GetDelegateClientItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.DelegateClientDomainService
 */
export declare const DelegateClientDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.CreateDelegateClient
     */
    createDelegateClient: {
        methodKind: "unary";
        input: typeof CreateDelegateClientRequestSchema;
        output: typeof CreateDelegateClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.ReadDelegateClient
     */
    readDelegateClient: {
        methodKind: "unary";
        input: typeof ReadDelegateClientRequestSchema;
        output: typeof ReadDelegateClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.UpdateDelegateClient
     */
    updateDelegateClient: {
        methodKind: "unary";
        input: typeof UpdateDelegateClientRequestSchema;
        output: typeof UpdateDelegateClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.DeleteDelegateClient
     */
    deleteDelegateClient: {
        methodKind: "unary";
        input: typeof DeleteDelegateClientRequestSchema;
        output: typeof DeleteDelegateClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.ListDelegateClients
     */
    listDelegateClients: {
        methodKind: "unary";
        input: typeof ListDelegateClientsRequestSchema;
        output: typeof ListDelegateClientsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.GetDelegateClientListPageData
     */
    getDelegateClientListPageData: {
        methodKind: "unary";
        input: typeof GetDelegateClientListPageDataRequestSchema;
        output: typeof GetDelegateClientListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateClientDomainService.GetDelegateClientItemPageData
     */
    getDelegateClientItemPageData: {
        methodKind: "unary";
        input: typeof GetDelegateClientItemPageDataRequestSchema;
        output: typeof GetDelegateClientItemPageDataResponseSchema;
    };
}>;
