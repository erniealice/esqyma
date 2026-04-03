import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/workspace/workspace.proto.
 */
export declare const file_domain_entity_workspace_workspace: GenFile;
/**
 * @generated from message domain.entity.v1.Workspace
 */
export type Workspace = Message<"domain.entity.v1.Workspace"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * @generated from field: bool private = 4;
     */
    private: boolean;
    /**
     * @generated from field: optional string workflow_template_id = 5;
     */
    workflowTemplateId?: string;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 7;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 8;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 9;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.Workspace.
 * Use `create(WorkspaceSchema)` to create a new message.
 */
export declare const WorkspaceSchema: GenMessage<Workspace>;
/**
 * @generated from message domain.entity.v1.CreateWorkspaceRequest
 */
export type CreateWorkspaceRequest = Message<"domain.entity.v1.CreateWorkspaceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Workspace data = 1;
     */
    data?: Workspace;
};
/**
 * Describes the message domain.entity.v1.CreateWorkspaceRequest.
 * Use `create(CreateWorkspaceRequestSchema)` to create a new message.
 */
export declare const CreateWorkspaceRequestSchema: GenMessage<CreateWorkspaceRequest>;
/**
 * @generated from message domain.entity.v1.CreateWorkspaceResponse
 */
export type CreateWorkspaceResponse = Message<"domain.entity.v1.CreateWorkspaceResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Workspace data = 1;
     */
    data: Workspace[];
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
 * Describes the message domain.entity.v1.CreateWorkspaceResponse.
 * Use `create(CreateWorkspaceResponseSchema)` to create a new message.
 */
export declare const CreateWorkspaceResponseSchema: GenMessage<CreateWorkspaceResponse>;
/**
 * @generated from message domain.entity.v1.ReadWorkspaceRequest
 */
export type ReadWorkspaceRequest = Message<"domain.entity.v1.ReadWorkspaceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Workspace data = 1;
     */
    data?: Workspace;
};
/**
 * Describes the message domain.entity.v1.ReadWorkspaceRequest.
 * Use `create(ReadWorkspaceRequestSchema)` to create a new message.
 */
export declare const ReadWorkspaceRequestSchema: GenMessage<ReadWorkspaceRequest>;
/**
 * @generated from message domain.entity.v1.ReadWorkspaceResponse
 */
export type ReadWorkspaceResponse = Message<"domain.entity.v1.ReadWorkspaceResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Workspace data = 1;
     */
    data: Workspace[];
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
 * Describes the message domain.entity.v1.ReadWorkspaceResponse.
 * Use `create(ReadWorkspaceResponseSchema)` to create a new message.
 */
export declare const ReadWorkspaceResponseSchema: GenMessage<ReadWorkspaceResponse>;
/**
 * @generated from message domain.entity.v1.UpdateWorkspaceRequest
 */
export type UpdateWorkspaceRequest = Message<"domain.entity.v1.UpdateWorkspaceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Workspace data = 1;
     */
    data?: Workspace;
};
/**
 * Describes the message domain.entity.v1.UpdateWorkspaceRequest.
 * Use `create(UpdateWorkspaceRequestSchema)` to create a new message.
 */
export declare const UpdateWorkspaceRequestSchema: GenMessage<UpdateWorkspaceRequest>;
/**
 * @generated from message domain.entity.v1.UpdateWorkspaceResponse
 */
export type UpdateWorkspaceResponse = Message<"domain.entity.v1.UpdateWorkspaceResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Workspace data = 1;
     */
    data: Workspace[];
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
 * Describes the message domain.entity.v1.UpdateWorkspaceResponse.
 * Use `create(UpdateWorkspaceResponseSchema)` to create a new message.
 */
export declare const UpdateWorkspaceResponseSchema: GenMessage<UpdateWorkspaceResponse>;
/**
 * @generated from message domain.entity.v1.DeleteWorkspaceRequest
 */
export type DeleteWorkspaceRequest = Message<"domain.entity.v1.DeleteWorkspaceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Workspace data = 1;
     */
    data?: Workspace;
};
/**
 * Describes the message domain.entity.v1.DeleteWorkspaceRequest.
 * Use `create(DeleteWorkspaceRequestSchema)` to create a new message.
 */
export declare const DeleteWorkspaceRequestSchema: GenMessage<DeleteWorkspaceRequest>;
/**
 * @generated from message domain.entity.v1.DeleteWorkspaceResponse
 */
export type DeleteWorkspaceResponse = Message<"domain.entity.v1.DeleteWorkspaceResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteWorkspaceResponse.
 * Use `create(DeleteWorkspaceResponseSchema)` to create a new message.
 */
export declare const DeleteWorkspaceResponseSchema: GenMessage<DeleteWorkspaceResponse>;
/**
 * @generated from message domain.entity.v1.ListWorkspacesRequest
 */
export type ListWorkspacesRequest = Message<"domain.entity.v1.ListWorkspacesRequest"> & {
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
 * Describes the message domain.entity.v1.ListWorkspacesRequest.
 * Use `create(ListWorkspacesRequestSchema)` to create a new message.
 */
export declare const ListWorkspacesRequestSchema: GenMessage<ListWorkspacesRequest>;
/**
 * @generated from message domain.entity.v1.ListWorkspacesResponse
 */
export type ListWorkspacesResponse = Message<"domain.entity.v1.ListWorkspacesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Workspace data = 1;
     */
    data: Workspace[];
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
 * Describes the message domain.entity.v1.ListWorkspacesResponse.
 * Use `create(ListWorkspacesResponseSchema)` to create a new message.
 */
export declare const ListWorkspacesResponseSchema: GenMessage<ListWorkspacesResponse>;
/**
 * @generated from message domain.entity.v1.GetWorkspaceListPageDataRequest
 */
export type GetWorkspaceListPageDataRequest = Message<"domain.entity.v1.GetWorkspaceListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetWorkspaceListPageDataRequest.
 * Use `create(GetWorkspaceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkspaceListPageDataRequestSchema: GenMessage<GetWorkspaceListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetWorkspaceListPageDataResponse
 */
export type GetWorkspaceListPageDataResponse = Message<"domain.entity.v1.GetWorkspaceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Workspace workspace_list = 1;
     */
    workspaceList: Workspace[];
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
 * Describes the message domain.entity.v1.GetWorkspaceListPageDataResponse.
 * Use `create(GetWorkspaceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkspaceListPageDataResponseSchema: GenMessage<GetWorkspaceListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetWorkspaceItemPageDataRequest
 */
export type GetWorkspaceItemPageDataRequest = Message<"domain.entity.v1.GetWorkspaceItemPageDataRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.entity.v1.GetWorkspaceItemPageDataRequest.
 * Use `create(GetWorkspaceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkspaceItemPageDataRequestSchema: GenMessage<GetWorkspaceItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetWorkspaceItemPageDataResponse
 */
export type GetWorkspaceItemPageDataResponse = Message<"domain.entity.v1.GetWorkspaceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Workspace workspace = 1;
     */
    workspace?: Workspace;
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
 * Describes the message domain.entity.v1.GetWorkspaceItemPageDataResponse.
 * Use `create(GetWorkspaceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkspaceItemPageDataResponseSchema: GenMessage<GetWorkspaceItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.WorkspaceDomainService
 */
export declare const WorkspaceDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.CreateWorkspace
     */
    createWorkspace: {
        methodKind: "unary";
        input: typeof CreateWorkspaceRequestSchema;
        output: typeof CreateWorkspaceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.ReadWorkspace
     */
    readWorkspace: {
        methodKind: "unary";
        input: typeof ReadWorkspaceRequestSchema;
        output: typeof ReadWorkspaceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.UpdateWorkspace
     */
    updateWorkspace: {
        methodKind: "unary";
        input: typeof UpdateWorkspaceRequestSchema;
        output: typeof UpdateWorkspaceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.DeleteWorkspace
     */
    deleteWorkspace: {
        methodKind: "unary";
        input: typeof DeleteWorkspaceRequestSchema;
        output: typeof DeleteWorkspaceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.ListWorkspaces
     */
    listWorkspaces: {
        methodKind: "unary";
        input: typeof ListWorkspacesRequestSchema;
        output: typeof ListWorkspacesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.GetWorkspaceListPageData
     */
    getWorkspaceListPageData: {
        methodKind: "unary";
        input: typeof GetWorkspaceListPageDataRequestSchema;
        output: typeof GetWorkspaceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.WorkspaceDomainService.GetWorkspaceItemPageData
     */
    getWorkspaceItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkspaceItemPageDataRequestSchema;
        output: typeof GetWorkspaceItemPageDataResponseSchema;
    };
}>;
