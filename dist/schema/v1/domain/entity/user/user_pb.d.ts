import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/user/user.proto.
 */
export declare const file_domain_entity_user_user: GenFile;
/**
 * @generated from message domain.entity.v1.User
 */
export type User = Message<"domain.entity.v1.User"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string first_name = 2;
     */
    firstName: string;
    /**
     * @generated from field: string last_name = 3;
     */
    lastName: string;
    /**
     * @generated from field: string email_address = 4;
     */
    emailAddress: string;
    /**
     * @generated from field: string mobile_number = 10;
     */
    mobileNumber: string;
    /**
     * @generated from field: string password_hash = 11;
     */
    passwordHash: string;
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
 * Describes the message domain.entity.v1.User.
 * Use `create(UserSchema)` to create a new message.
 */
export declare const UserSchema: GenMessage<User>;
/**
 * @generated from message domain.entity.v1.CreateUserRequest
 */
export type CreateUserRequest = Message<"domain.entity.v1.CreateUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.User data = 1;
     */
    data?: User;
};
/**
 * Describes the message domain.entity.v1.CreateUserRequest.
 * Use `create(CreateUserRequestSchema)` to create a new message.
 */
export declare const CreateUserRequestSchema: GenMessage<CreateUserRequest>;
/**
 * @generated from message domain.entity.v1.CreateUserResponse
 */
export type CreateUserResponse = Message<"domain.entity.v1.CreateUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.User data = 1;
     */
    data: User[];
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
 * Describes the message domain.entity.v1.CreateUserResponse.
 * Use `create(CreateUserResponseSchema)` to create a new message.
 */
export declare const CreateUserResponseSchema: GenMessage<CreateUserResponse>;
/**
 * @generated from message domain.entity.v1.ReadUserRequest
 */
export type ReadUserRequest = Message<"domain.entity.v1.ReadUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.User data = 1;
     */
    data?: User;
};
/**
 * Describes the message domain.entity.v1.ReadUserRequest.
 * Use `create(ReadUserRequestSchema)` to create a new message.
 */
export declare const ReadUserRequestSchema: GenMessage<ReadUserRequest>;
/**
 * @generated from message domain.entity.v1.ReadUserResponse
 */
export type ReadUserResponse = Message<"domain.entity.v1.ReadUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.User data = 1;
     */
    data: User[];
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
 * Describes the message domain.entity.v1.ReadUserResponse.
 * Use `create(ReadUserResponseSchema)` to create a new message.
 */
export declare const ReadUserResponseSchema: GenMessage<ReadUserResponse>;
/**
 * @generated from message domain.entity.v1.UpdateUserRequest
 */
export type UpdateUserRequest = Message<"domain.entity.v1.UpdateUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.User data = 1;
     */
    data?: User;
};
/**
 * Describes the message domain.entity.v1.UpdateUserRequest.
 * Use `create(UpdateUserRequestSchema)` to create a new message.
 */
export declare const UpdateUserRequestSchema: GenMessage<UpdateUserRequest>;
/**
 * @generated from message domain.entity.v1.UpdateUserResponse
 */
export type UpdateUserResponse = Message<"domain.entity.v1.UpdateUserResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.User data = 1;
     */
    data: User[];
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
 * Describes the message domain.entity.v1.UpdateUserResponse.
 * Use `create(UpdateUserResponseSchema)` to create a new message.
 */
export declare const UpdateUserResponseSchema: GenMessage<UpdateUserResponse>;
/**
 * @generated from message domain.entity.v1.DeleteUserRequest
 */
export type DeleteUserRequest = Message<"domain.entity.v1.DeleteUserRequest"> & {
    /**
     * @generated from field: domain.entity.v1.User data = 1;
     */
    data?: User;
};
/**
 * Describes the message domain.entity.v1.DeleteUserRequest.
 * Use `create(DeleteUserRequestSchema)` to create a new message.
 */
export declare const DeleteUserRequestSchema: GenMessage<DeleteUserRequest>;
/**
 * @generated from message domain.entity.v1.DeleteUserResponse
 */
export type DeleteUserResponse = Message<"domain.entity.v1.DeleteUserResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteUserResponse.
 * Use `create(DeleteUserResponseSchema)` to create a new message.
 */
export declare const DeleteUserResponseSchema: GenMessage<DeleteUserResponse>;
/**
 * @generated from message domain.entity.v1.ListUsersRequest
 */
export type ListUsersRequest = Message<"domain.entity.v1.ListUsersRequest"> & {
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
 * Describes the message domain.entity.v1.ListUsersRequest.
 * Use `create(ListUsersRequestSchema)` to create a new message.
 */
export declare const ListUsersRequestSchema: GenMessage<ListUsersRequest>;
/**
 * @generated from message domain.entity.v1.ListUsersResponse
 */
export type ListUsersResponse = Message<"domain.entity.v1.ListUsersResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.User data = 1;
     */
    data: User[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional string next_page_token = 4;
     */
    nextPageToken?: string;
};
/**
 * Describes the message domain.entity.v1.ListUsersResponse.
 * Use `create(ListUsersResponseSchema)` to create a new message.
 */
export declare const ListUsersResponseSchema: GenMessage<ListUsersResponse>;
/**
 * @generated from message domain.entity.v1.GetUserListPageDataRequest
 */
export type GetUserListPageDataRequest = Message<"domain.entity.v1.GetUserListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetUserListPageDataRequest.
 * Use `create(GetUserListPageDataRequestSchema)` to create a new message.
 */
export declare const GetUserListPageDataRequestSchema: GenMessage<GetUserListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetUserListPageDataResponse
 */
export type GetUserListPageDataResponse = Message<"domain.entity.v1.GetUserListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.User user_list = 1;
     */
    userList: User[];
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
 * Describes the message domain.entity.v1.GetUserListPageDataResponse.
 * Use `create(GetUserListPageDataResponseSchema)` to create a new message.
 */
export declare const GetUserListPageDataResponseSchema: GenMessage<GetUserListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetUserItemPageDataRequest
 */
export type GetUserItemPageDataRequest = Message<"domain.entity.v1.GetUserItemPageDataRequest"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
};
/**
 * Describes the message domain.entity.v1.GetUserItemPageDataRequest.
 * Use `create(GetUserItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetUserItemPageDataRequestSchema: GenMessage<GetUserItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetUserItemPageDataResponse
 */
export type GetUserItemPageDataResponse = Message<"domain.entity.v1.GetUserItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.User user = 1;
     */
    user?: User;
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
 * Describes the message domain.entity.v1.GetUserItemPageDataResponse.
 * Use `create(GetUserItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetUserItemPageDataResponseSchema: GenMessage<GetUserItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.UserDomainService
 */
export declare const UserDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.CreateUser
     */
    createUser: {
        methodKind: "unary";
        input: typeof CreateUserRequestSchema;
        output: typeof CreateUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.ReadUser
     */
    readUser: {
        methodKind: "unary";
        input: typeof ReadUserRequestSchema;
        output: typeof ReadUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.UpdateUser
     */
    updateUser: {
        methodKind: "unary";
        input: typeof UpdateUserRequestSchema;
        output: typeof UpdateUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.DeleteUser
     */
    deleteUser: {
        methodKind: "unary";
        input: typeof DeleteUserRequestSchema;
        output: typeof DeleteUserResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.ListUsers
     */
    listUsers: {
        methodKind: "unary";
        input: typeof ListUsersRequestSchema;
        output: typeof ListUsersResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.GetUserListPageData
     */
    getUserListPageData: {
        methodKind: "unary";
        input: typeof GetUserListPageDataRequestSchema;
        output: typeof GetUserListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserDomainService.GetUserItemPageData
     */
    getUserItemPageData: {
        methodKind: "unary";
        input: typeof GetUserItemPageDataRequestSchema;
        output: typeof GetUserItemPageDataResponseSchema;
    };
}>;
