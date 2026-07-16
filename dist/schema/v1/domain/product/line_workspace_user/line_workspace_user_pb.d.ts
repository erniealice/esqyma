import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/line_workspace_user/line_workspace_user.proto.
 */
export declare const file_domain_product_line_workspace_user_line_workspace_user: GenFile;
/**
 * LineWorkspaceUser pins an operator (workspace_user) at a line node for
 * tier-2 group visibility (coordinator @ department node, adviser @ section
 * node). Shape mirrors client_workspace_user (workspace_id + is_owner); the
 * parent FK is line_id instead of client_id, plus the two servicing
 * discriminators (scope, role) the people-hierarchy model specified.
 *
 * @generated from message domain.product.v1.LineWorkspaceUser
 */
export type LineWorkspaceUser = Message<"domain.product.v1.LineWorkspaceUser"> & {
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
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * @generated from field: string line_id = 8;
     */
    lineId: string;
    /**
     * @generated from field: string workspace_user_id = 9;
     */
    workspaceUserId: string;
    /**
     * @generated from field: string scope = 10;
     */
    scope: string;
    /**
     * @generated from field: string role = 11;
     */
    role: string;
    /**
     * @generated from field: bool is_owner = 12;
     */
    isOwner: boolean;
};
/**
 * Describes the message domain.product.v1.LineWorkspaceUser.
 * Use `create(LineWorkspaceUserSchema)` to create a new message.
 */
export declare const LineWorkspaceUserSchema: GenMessage<LineWorkspaceUser>;
/**
 * @generated from message domain.product.v1.CreateLineWorkspaceUserRequest
 */
export type CreateLineWorkspaceUserRequest = Message<"domain.product.v1.CreateLineWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineWorkspaceUser data = 1;
     */
    data?: LineWorkspaceUser;
};
/**
 * Describes the message domain.product.v1.CreateLineWorkspaceUserRequest.
 * Use `create(CreateLineWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const CreateLineWorkspaceUserRequestSchema: GenMessage<CreateLineWorkspaceUserRequest>;
/**
 * @generated from message domain.product.v1.CreateLineWorkspaceUserResponse
 */
export type CreateLineWorkspaceUserResponse = Message<"domain.product.v1.CreateLineWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineWorkspaceUser data = 1;
     */
    data: LineWorkspaceUser[];
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
 * Describes the message domain.product.v1.CreateLineWorkspaceUserResponse.
 * Use `create(CreateLineWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const CreateLineWorkspaceUserResponseSchema: GenMessage<CreateLineWorkspaceUserResponse>;
/**
 * @generated from message domain.product.v1.ReadLineWorkspaceUserRequest
 */
export type ReadLineWorkspaceUserRequest = Message<"domain.product.v1.ReadLineWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineWorkspaceUser data = 1;
     */
    data?: LineWorkspaceUser;
};
/**
 * Describes the message domain.product.v1.ReadLineWorkspaceUserRequest.
 * Use `create(ReadLineWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const ReadLineWorkspaceUserRequestSchema: GenMessage<ReadLineWorkspaceUserRequest>;
/**
 * @generated from message domain.product.v1.ReadLineWorkspaceUserResponse
 */
export type ReadLineWorkspaceUserResponse = Message<"domain.product.v1.ReadLineWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineWorkspaceUser data = 1;
     */
    data: LineWorkspaceUser[];
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
 * Describes the message domain.product.v1.ReadLineWorkspaceUserResponse.
 * Use `create(ReadLineWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const ReadLineWorkspaceUserResponseSchema: GenMessage<ReadLineWorkspaceUserResponse>;
/**
 * @generated from message domain.product.v1.UpdateLineWorkspaceUserRequest
 */
export type UpdateLineWorkspaceUserRequest = Message<"domain.product.v1.UpdateLineWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineWorkspaceUser data = 1;
     */
    data?: LineWorkspaceUser;
};
/**
 * Describes the message domain.product.v1.UpdateLineWorkspaceUserRequest.
 * Use `create(UpdateLineWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const UpdateLineWorkspaceUserRequestSchema: GenMessage<UpdateLineWorkspaceUserRequest>;
/**
 * @generated from message domain.product.v1.UpdateLineWorkspaceUserResponse
 */
export type UpdateLineWorkspaceUserResponse = Message<"domain.product.v1.UpdateLineWorkspaceUserResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineWorkspaceUser data = 1;
     */
    data: LineWorkspaceUser[];
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
 * Describes the message domain.product.v1.UpdateLineWorkspaceUserResponse.
 * Use `create(UpdateLineWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const UpdateLineWorkspaceUserResponseSchema: GenMessage<UpdateLineWorkspaceUserResponse>;
/**
 * @generated from message domain.product.v1.DeleteLineWorkspaceUserRequest
 */
export type DeleteLineWorkspaceUserRequest = Message<"domain.product.v1.DeleteLineWorkspaceUserRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineWorkspaceUser data = 1;
     */
    data?: LineWorkspaceUser;
};
/**
 * Describes the message domain.product.v1.DeleteLineWorkspaceUserRequest.
 * Use `create(DeleteLineWorkspaceUserRequestSchema)` to create a new message.
 */
export declare const DeleteLineWorkspaceUserRequestSchema: GenMessage<DeleteLineWorkspaceUserRequest>;
/**
 * @generated from message domain.product.v1.DeleteLineWorkspaceUserResponse
 */
export type DeleteLineWorkspaceUserResponse = Message<"domain.product.v1.DeleteLineWorkspaceUserResponse"> & {
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
 * Describes the message domain.product.v1.DeleteLineWorkspaceUserResponse.
 * Use `create(DeleteLineWorkspaceUserResponseSchema)` to create a new message.
 */
export declare const DeleteLineWorkspaceUserResponseSchema: GenMessage<DeleteLineWorkspaceUserResponse>;
/**
 * @generated from message domain.product.v1.ListLineWorkspaceUsersRequest
 */
export type ListLineWorkspaceUsersRequest = Message<"domain.product.v1.ListLineWorkspaceUsersRequest"> & {
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
 * Describes the message domain.product.v1.ListLineWorkspaceUsersRequest.
 * Use `create(ListLineWorkspaceUsersRequestSchema)` to create a new message.
 */
export declare const ListLineWorkspaceUsersRequestSchema: GenMessage<ListLineWorkspaceUsersRequest>;
/**
 * @generated from message domain.product.v1.ListLineWorkspaceUsersResponse
 */
export type ListLineWorkspaceUsersResponse = Message<"domain.product.v1.ListLineWorkspaceUsersResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineWorkspaceUser data = 1;
     */
    data: LineWorkspaceUser[];
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
 * Describes the message domain.product.v1.ListLineWorkspaceUsersResponse.
 * Use `create(ListLineWorkspaceUsersResponseSchema)` to create a new message.
 */
export declare const ListLineWorkspaceUsersResponseSchema: GenMessage<ListLineWorkspaceUsersResponse>;
/**
 * @generated from message domain.product.v1.GetLineWorkspaceUserListPageDataRequest
 */
export type GetLineWorkspaceUserListPageDataRequest = Message<"domain.product.v1.GetLineWorkspaceUserListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetLineWorkspaceUserListPageDataRequest.
 * Use `create(GetLineWorkspaceUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLineWorkspaceUserListPageDataRequestSchema: GenMessage<GetLineWorkspaceUserListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetLineWorkspaceUserListPageDataResponse
 */
export type GetLineWorkspaceUserListPageDataResponse = Message<"domain.product.v1.GetLineWorkspaceUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineWorkspaceUser line_workspace_user_list = 1;
     */
    lineWorkspaceUserList: LineWorkspaceUser[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.product.v1.GetLineWorkspaceUserListPageDataResponse.
 * Use `create(GetLineWorkspaceUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLineWorkspaceUserListPageDataResponseSchema: GenMessage<GetLineWorkspaceUserListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetLineWorkspaceUserItemPageDataRequest
 */
export type GetLineWorkspaceUserItemPageDataRequest = Message<"domain.product.v1.GetLineWorkspaceUserItemPageDataRequest"> & {
    /**
     * @generated from field: string line_workspace_user_id = 1;
     */
    lineWorkspaceUserId: string;
};
/**
 * Describes the message domain.product.v1.GetLineWorkspaceUserItemPageDataRequest.
 * Use `create(GetLineWorkspaceUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLineWorkspaceUserItemPageDataRequestSchema: GenMessage<GetLineWorkspaceUserItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetLineWorkspaceUserItemPageDataResponse
 */
export type GetLineWorkspaceUserItemPageDataResponse = Message<"domain.product.v1.GetLineWorkspaceUserItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.LineWorkspaceUser line_workspace_user = 1;
     */
    lineWorkspaceUser?: LineWorkspaceUser;
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
 * Describes the message domain.product.v1.GetLineWorkspaceUserItemPageDataResponse.
 * Use `create(GetLineWorkspaceUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLineWorkspaceUserItemPageDataResponseSchema: GenMessage<GetLineWorkspaceUserItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.LineWorkspaceUserDomainService
 */
export declare const LineWorkspaceUserDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.CreateLineWorkspaceUser
     */
    createLineWorkspaceUser: {
        methodKind: "unary";
        input: typeof CreateLineWorkspaceUserRequestSchema;
        output: typeof CreateLineWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.ReadLineWorkspaceUser
     */
    readLineWorkspaceUser: {
        methodKind: "unary";
        input: typeof ReadLineWorkspaceUserRequestSchema;
        output: typeof ReadLineWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.UpdateLineWorkspaceUser
     */
    updateLineWorkspaceUser: {
        methodKind: "unary";
        input: typeof UpdateLineWorkspaceUserRequestSchema;
        output: typeof UpdateLineWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.DeleteLineWorkspaceUser
     */
    deleteLineWorkspaceUser: {
        methodKind: "unary";
        input: typeof DeleteLineWorkspaceUserRequestSchema;
        output: typeof DeleteLineWorkspaceUserResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.ListLineWorkspaceUsers
     */
    listLineWorkspaceUsers: {
        methodKind: "unary";
        input: typeof ListLineWorkspaceUsersRequestSchema;
        output: typeof ListLineWorkspaceUsersResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.GetLineWorkspaceUserListPageData
     */
    getLineWorkspaceUserListPageData: {
        methodKind: "unary";
        input: typeof GetLineWorkspaceUserListPageDataRequestSchema;
        output: typeof GetLineWorkspaceUserListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.product.v1.LineWorkspaceUserDomainService.GetLineWorkspaceUserItemPageData
     */
    getLineWorkspaceUserItemPageData: {
        methodKind: "unary";
        input: typeof GetLineWorkspaceUserItemPageDataRequestSchema;
        output: typeof GetLineWorkspaceUserItemPageDataResponseSchema;
    };
}>;
