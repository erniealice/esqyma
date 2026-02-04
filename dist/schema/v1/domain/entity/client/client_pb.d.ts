import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { User } from "../user/user_pb";
import type { ClientCategory } from "../client_category/client_category_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/client/client.proto.
 */
export declare const file_domain_entity_client_client: GenFile;
/**
 * @generated from message domain.entity.v1.Client
 */
export type Client = Message<"domain.entity.v1.Client"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.entity.v1.User user = 2;
     */
    user?: User;
    /**
     * @generated from field: string user_id = 3;
     */
    userId: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: string internal_id = 9;
     */
    internalId: string;
    /**
     * @generated from field: optional string category_id = 10;
     */
    categoryId?: string;
    /**
     * @generated from field: optional domain.entity.v1.ClientCategory category = 11;
     */
    category?: ClientCategory;
};
/**
 * Describes the message domain.entity.v1.Client.
 * Use `create(ClientSchema)` to create a new message.
 */
export declare const ClientSchema: GenMessage<Client>;
/**
 * @generated from message domain.entity.v1.CreateClientRequest
 */
export type CreateClientRequest = Message<"domain.entity.v1.CreateClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Client data = 1;
     */
    data?: Client;
};
/**
 * Describes the message domain.entity.v1.CreateClientRequest.
 * Use `create(CreateClientRequestSchema)` to create a new message.
 */
export declare const CreateClientRequestSchema: GenMessage<CreateClientRequest>;
/**
 * @generated from message domain.entity.v1.CreateClientResponse
 */
export type CreateClientResponse = Message<"domain.entity.v1.CreateClientResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Client data = 1;
     */
    data: Client[];
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
 * Describes the message domain.entity.v1.CreateClientResponse.
 * Use `create(CreateClientResponseSchema)` to create a new message.
 */
export declare const CreateClientResponseSchema: GenMessage<CreateClientResponse>;
/**
 * @generated from message domain.entity.v1.ReadClientRequest
 */
export type ReadClientRequest = Message<"domain.entity.v1.ReadClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Client data = 1;
     */
    data?: Client;
};
/**
 * Describes the message domain.entity.v1.ReadClientRequest.
 * Use `create(ReadClientRequestSchema)` to create a new message.
 */
export declare const ReadClientRequestSchema: GenMessage<ReadClientRequest>;
/**
 * @generated from message domain.entity.v1.ReadClientResponse
 */
export type ReadClientResponse = Message<"domain.entity.v1.ReadClientResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Client data = 1;
     */
    data: Client[];
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
 * Describes the message domain.entity.v1.ReadClientResponse.
 * Use `create(ReadClientResponseSchema)` to create a new message.
 */
export declare const ReadClientResponseSchema: GenMessage<ReadClientResponse>;
/**
 * @generated from message domain.entity.v1.UpdateClientRequest
 */
export type UpdateClientRequest = Message<"domain.entity.v1.UpdateClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Client data = 1;
     */
    data?: Client;
};
/**
 * Describes the message domain.entity.v1.UpdateClientRequest.
 * Use `create(UpdateClientRequestSchema)` to create a new message.
 */
export declare const UpdateClientRequestSchema: GenMessage<UpdateClientRequest>;
/**
 * @generated from message domain.entity.v1.UpdateClientResponse
 */
export type UpdateClientResponse = Message<"domain.entity.v1.UpdateClientResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Client data = 1;
     */
    data: Client[];
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
 * Describes the message domain.entity.v1.UpdateClientResponse.
 * Use `create(UpdateClientResponseSchema)` to create a new message.
 */
export declare const UpdateClientResponseSchema: GenMessage<UpdateClientResponse>;
/**
 * @generated from message domain.entity.v1.DeleteClientRequest
 */
export type DeleteClientRequest = Message<"domain.entity.v1.DeleteClientRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Client data = 1;
     */
    data?: Client;
};
/**
 * Describes the message domain.entity.v1.DeleteClientRequest.
 * Use `create(DeleteClientRequestSchema)` to create a new message.
 */
export declare const DeleteClientRequestSchema: GenMessage<DeleteClientRequest>;
/**
 * @generated from message domain.entity.v1.DeleteClientResponse
 */
export type DeleteClientResponse = Message<"domain.entity.v1.DeleteClientResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteClientResponse.
 * Use `create(DeleteClientResponseSchema)` to create a new message.
 */
export declare const DeleteClientResponseSchema: GenMessage<DeleteClientResponse>;
/**
 * @generated from message domain.entity.v1.ListClientsRequest
 */
export type ListClientsRequest = Message<"domain.entity.v1.ListClientsRequest"> & {
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
 * Describes the message domain.entity.v1.ListClientsRequest.
 * Use `create(ListClientsRequestSchema)` to create a new message.
 */
export declare const ListClientsRequestSchema: GenMessage<ListClientsRequest>;
/**
 * @generated from message domain.entity.v1.ListClientsResponse
 */
export type ListClientsResponse = Message<"domain.entity.v1.ListClientsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Client data = 1;
     */
    data: Client[];
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
 * Describes the message domain.entity.v1.ListClientsResponse.
 * Use `create(ListClientsResponseSchema)` to create a new message.
 */
export declare const ListClientsResponseSchema: GenMessage<ListClientsResponse>;
/**
 * @generated from message domain.entity.v1.GetClientListPageDataRequest
 */
export type GetClientListPageDataRequest = Message<"domain.entity.v1.GetClientListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetClientListPageDataRequest.
 * Use `create(GetClientListPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientListPageDataRequestSchema: GenMessage<GetClientListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientListPageDataResponse
 */
export type GetClientListPageDataResponse = Message<"domain.entity.v1.GetClientListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Client client_list = 1;
     */
    clientList: Client[];
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
 * Describes the message domain.entity.v1.GetClientListPageDataResponse.
 * Use `create(GetClientListPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientListPageDataResponseSchema: GenMessage<GetClientListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetClientItemPageDataRequest
 */
export type GetClientItemPageDataRequest = Message<"domain.entity.v1.GetClientItemPageDataRequest"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
};
/**
 * Describes the message domain.entity.v1.GetClientItemPageDataRequest.
 * Use `create(GetClientItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientItemPageDataRequestSchema: GenMessage<GetClientItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientItemPageDataResponse
 */
export type GetClientItemPageDataResponse = Message<"domain.entity.v1.GetClientItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Client client = 1;
     */
    client?: Client;
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
 * Describes the message domain.entity.v1.GetClientItemPageDataResponse.
 * Use `create(GetClientItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientItemPageDataResponseSchema: GenMessage<GetClientItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.ClientDomainService
 */
export declare const ClientDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.CreateClient
     */
    createClient: {
        methodKind: "unary";
        input: typeof CreateClientRequestSchema;
        output: typeof CreateClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.ReadClient
     */
    readClient: {
        methodKind: "unary";
        input: typeof ReadClientRequestSchema;
        output: typeof ReadClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.UpdateClient
     */
    updateClient: {
        methodKind: "unary";
        input: typeof UpdateClientRequestSchema;
        output: typeof UpdateClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.DeleteClient
     */
    deleteClient: {
        methodKind: "unary";
        input: typeof DeleteClientRequestSchema;
        output: typeof DeleteClientResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.ListClients
     */
    listClients: {
        methodKind: "unary";
        input: typeof ListClientsRequestSchema;
        output: typeof ListClientsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.GetClientListPageData
     */
    getClientListPageData: {
        methodKind: "unary";
        input: typeof GetClientListPageDataRequestSchema;
        output: typeof GetClientListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientDomainService.GetClientItemPageData
     */
    getClientItemPageData: {
        methodKind: "unary";
        input: typeof GetClientItemPageDataRequestSchema;
        output: typeof GetClientItemPageDataResponseSchema;
    };
}>;
