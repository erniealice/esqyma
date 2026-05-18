import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/client_portal_grant/client_portal_grant.proto.
 */
export declare const file_domain_entity_client_portal_grant_client_portal_grant: GenFile;
/**
 * ClientPortalGrant anchors sessions for PRINCIPAL_TYPE_CLIENT.
 * A grant row means: user_id IS the client (identified by client_id) in workspace_id.
 * Unique constraint: (workspace_id, client_id, user_id) — one active grant per
 * (workspace, client, user) tuple; role change = revoke + re-grant.
 *
 * @generated from message domain.entity.v1.ClientPortalGrant
 */
export type ClientPortalGrant = Message<"domain.entity.v1.ClientPortalGrant"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string user_id = 3;
     */
    userId: string;
    /**
     * @generated from field: string client_id = 4;
     */
    clientId: string;
    /**
     * @generated from field: string role_id = 5;
     */
    roleId: string;
    /**
     * @generated from field: string granted_by_user_id = 6;
     */
    grantedByUserId: string;
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
 * Describes the message domain.entity.v1.ClientPortalGrant.
 * Use `create(ClientPortalGrantSchema)` to create a new message.
 */
export declare const ClientPortalGrantSchema: GenMessage<ClientPortalGrant>;
/**
 * @generated from message domain.entity.v1.CreateClientPortalGrantRequest
 */
export type CreateClientPortalGrantRequest = Message<"domain.entity.v1.CreateClientPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientPortalGrant data = 1;
     */
    data?: ClientPortalGrant;
};
/**
 * Describes the message domain.entity.v1.CreateClientPortalGrantRequest.
 * Use `create(CreateClientPortalGrantRequestSchema)` to create a new message.
 */
export declare const CreateClientPortalGrantRequestSchema: GenMessage<CreateClientPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.CreateClientPortalGrantResponse
 */
export type CreateClientPortalGrantResponse = Message<"domain.entity.v1.CreateClientPortalGrantResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientPortalGrant data = 1;
     */
    data: ClientPortalGrant[];
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
 * Describes the message domain.entity.v1.CreateClientPortalGrantResponse.
 * Use `create(CreateClientPortalGrantResponseSchema)` to create a new message.
 */
export declare const CreateClientPortalGrantResponseSchema: GenMessage<CreateClientPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.ReadClientPortalGrantRequest
 */
export type ReadClientPortalGrantRequest = Message<"domain.entity.v1.ReadClientPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientPortalGrant data = 1;
     */
    data?: ClientPortalGrant;
};
/**
 * Describes the message domain.entity.v1.ReadClientPortalGrantRequest.
 * Use `create(ReadClientPortalGrantRequestSchema)` to create a new message.
 */
export declare const ReadClientPortalGrantRequestSchema: GenMessage<ReadClientPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.ReadClientPortalGrantResponse
 */
export type ReadClientPortalGrantResponse = Message<"domain.entity.v1.ReadClientPortalGrantResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientPortalGrant data = 1;
     */
    data: ClientPortalGrant[];
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
 * Describes the message domain.entity.v1.ReadClientPortalGrantResponse.
 * Use `create(ReadClientPortalGrantResponseSchema)` to create a new message.
 */
export declare const ReadClientPortalGrantResponseSchema: GenMessage<ReadClientPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.UpdateClientPortalGrantRequest
 */
export type UpdateClientPortalGrantRequest = Message<"domain.entity.v1.UpdateClientPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientPortalGrant data = 1;
     */
    data?: ClientPortalGrant;
};
/**
 * Describes the message domain.entity.v1.UpdateClientPortalGrantRequest.
 * Use `create(UpdateClientPortalGrantRequestSchema)` to create a new message.
 */
export declare const UpdateClientPortalGrantRequestSchema: GenMessage<UpdateClientPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.UpdateClientPortalGrantResponse
 */
export type UpdateClientPortalGrantResponse = Message<"domain.entity.v1.UpdateClientPortalGrantResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientPortalGrant data = 1;
     */
    data: ClientPortalGrant[];
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
 * Describes the message domain.entity.v1.UpdateClientPortalGrantResponse.
 * Use `create(UpdateClientPortalGrantResponseSchema)` to create a new message.
 */
export declare const UpdateClientPortalGrantResponseSchema: GenMessage<UpdateClientPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.DeleteClientPortalGrantRequest
 */
export type DeleteClientPortalGrantRequest = Message<"domain.entity.v1.DeleteClientPortalGrantRequest"> & {
    /**
     * @generated from field: domain.entity.v1.ClientPortalGrant data = 1;
     */
    data?: ClientPortalGrant;
};
/**
 * Describes the message domain.entity.v1.DeleteClientPortalGrantRequest.
 * Use `create(DeleteClientPortalGrantRequestSchema)` to create a new message.
 */
export declare const DeleteClientPortalGrantRequestSchema: GenMessage<DeleteClientPortalGrantRequest>;
/**
 * @generated from message domain.entity.v1.DeleteClientPortalGrantResponse
 */
export type DeleteClientPortalGrantResponse = Message<"domain.entity.v1.DeleteClientPortalGrantResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteClientPortalGrantResponse.
 * Use `create(DeleteClientPortalGrantResponseSchema)` to create a new message.
 */
export declare const DeleteClientPortalGrantResponseSchema: GenMessage<DeleteClientPortalGrantResponse>;
/**
 * @generated from message domain.entity.v1.ListClientPortalGrantsRequest
 */
export type ListClientPortalGrantsRequest = Message<"domain.entity.v1.ListClientPortalGrantsRequest"> & {
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
 * Describes the message domain.entity.v1.ListClientPortalGrantsRequest.
 * Use `create(ListClientPortalGrantsRequestSchema)` to create a new message.
 */
export declare const ListClientPortalGrantsRequestSchema: GenMessage<ListClientPortalGrantsRequest>;
/**
 * @generated from message domain.entity.v1.ListClientPortalGrantsResponse
 */
export type ListClientPortalGrantsResponse = Message<"domain.entity.v1.ListClientPortalGrantsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientPortalGrant data = 1;
     */
    data: ClientPortalGrant[];
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
 * Describes the message domain.entity.v1.ListClientPortalGrantsResponse.
 * Use `create(ListClientPortalGrantsResponseSchema)` to create a new message.
 */
export declare const ListClientPortalGrantsResponseSchema: GenMessage<ListClientPortalGrantsResponse>;
/**
 * @generated from message domain.entity.v1.GetClientPortalGrantListPageDataRequest
 */
export type GetClientPortalGrantListPageDataRequest = Message<"domain.entity.v1.GetClientPortalGrantListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetClientPortalGrantListPageDataRequest.
 * Use `create(GetClientPortalGrantListPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientPortalGrantListPageDataRequestSchema: GenMessage<GetClientPortalGrantListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientPortalGrantListPageDataResponse
 */
export type GetClientPortalGrantListPageDataResponse = Message<"domain.entity.v1.GetClientPortalGrantListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.ClientPortalGrant client_portal_grant_list = 1;
     */
    clientPortalGrantList: ClientPortalGrant[];
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
 * Describes the message domain.entity.v1.GetClientPortalGrantListPageDataResponse.
 * Use `create(GetClientPortalGrantListPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientPortalGrantListPageDataResponseSchema: GenMessage<GetClientPortalGrantListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetClientPortalGrantItemPageDataRequest
 */
export type GetClientPortalGrantItemPageDataRequest = Message<"domain.entity.v1.GetClientPortalGrantItemPageDataRequest"> & {
    /**
     * @generated from field: string client_portal_grant_id = 1;
     */
    clientPortalGrantId: string;
};
/**
 * Describes the message domain.entity.v1.GetClientPortalGrantItemPageDataRequest.
 * Use `create(GetClientPortalGrantItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetClientPortalGrantItemPageDataRequestSchema: GenMessage<GetClientPortalGrantItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetClientPortalGrantItemPageDataResponse
 */
export type GetClientPortalGrantItemPageDataResponse = Message<"domain.entity.v1.GetClientPortalGrantItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.ClientPortalGrant client_portal_grant = 1;
     */
    clientPortalGrant?: ClientPortalGrant;
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
 * Describes the message domain.entity.v1.GetClientPortalGrantItemPageDataResponse.
 * Use `create(GetClientPortalGrantItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetClientPortalGrantItemPageDataResponseSchema: GenMessage<GetClientPortalGrantItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.ClientPortalGrantDomainService
 */
export declare const ClientPortalGrantDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.CreateClientPortalGrant
     */
    createClientPortalGrant: {
        methodKind: "unary";
        input: typeof CreateClientPortalGrantRequestSchema;
        output: typeof CreateClientPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.ReadClientPortalGrant
     */
    readClientPortalGrant: {
        methodKind: "unary";
        input: typeof ReadClientPortalGrantRequestSchema;
        output: typeof ReadClientPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.UpdateClientPortalGrant
     */
    updateClientPortalGrant: {
        methodKind: "unary";
        input: typeof UpdateClientPortalGrantRequestSchema;
        output: typeof UpdateClientPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.DeleteClientPortalGrant
     */
    deleteClientPortalGrant: {
        methodKind: "unary";
        input: typeof DeleteClientPortalGrantRequestSchema;
        output: typeof DeleteClientPortalGrantResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.ListClientPortalGrants
     */
    listClientPortalGrants: {
        methodKind: "unary";
        input: typeof ListClientPortalGrantsRequestSchema;
        output: typeof ListClientPortalGrantsResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.GetClientPortalGrantListPageData
     */
    getClientPortalGrantListPageData: {
        methodKind: "unary";
        input: typeof GetClientPortalGrantListPageDataRequestSchema;
        output: typeof GetClientPortalGrantListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.ClientPortalGrantDomainService.GetClientPortalGrantItemPageData
     */
    getClientPortalGrantItemPageData: {
        methodKind: "unary";
        input: typeof GetClientPortalGrantItemPageDataRequestSchema;
        output: typeof GetClientPortalGrantItemPageDataResponseSchema;
    };
}>;
