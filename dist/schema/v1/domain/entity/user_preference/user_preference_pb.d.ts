import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/user_preference/user_preference.proto.
 */
export declare const file_domain_entity_user_preference_user_preference: GenFile;
/**
 * UserPreference stores per-user, per-workspace appearance, locale, and
 * notification preferences. One row per (user_id, workspace_id) pair enforced
 * by unique_together. Appearance fields mirror the theme-switcher.js localStorage
 * key names (lf-* prefix omitted here; resolved at read time by the view layer).
 *
 * @generated from message domain.entity.v1.UserPreference
 */
export type UserPreference = Message<"domain.entity.v1.UserPreference"> & {
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
     * @generated from field: string user_id = 7;
     */
    userId: string;
    /**
     * @generated from field: string workspace_id = 8;
     */
    workspaceId: string;
    /**
     * Appearance — mirrors theme-switcher.js localStorage keys
     *
     * "light" | "dark" | "corporate-steel" | ...
     *
     * @generated from field: optional string theme = 9;
     */
    theme?: string;
    /**
     * "compact" | "comfortable" | "spacious"
     *
     * @generated from field: optional string density = 10;
     */
    density?: string;
    /**
     * @generated from field: optional string font = 11;
     */
    font?: string;
    /**
     * @generated from field: optional string radius = 12;
     */
    radius?: string;
    /**
     * @generated from field: optional string border = 13;
     */
    border?: string;
    /**
     * Locale
     *
     * ISO 639-1 (e.g. "en")
     *
     * @generated from field: optional string language = 14;
     */
    language?: string;
    /**
     * ISO 3166-1 alpha-2 (e.g. "PH")
     *
     * @generated from field: optional string region = 15;
     */
    region?: string;
    /**
     * IANA tz name; fallback to workspace.timezone
     *
     * @generated from field: optional string timezone = 16;
     */
    timezone?: string;
    /**
     * Notifications
     *
     * @generated from field: optional bool notify_email_billing = 17;
     */
    notifyEmailBilling?: boolean;
    /**
     * @generated from field: optional bool notify_email_account = 18;
     */
    notifyEmailAccount?: boolean;
    /**
     * @generated from field: optional bool notify_inapp_mentions = 19;
     */
    notifyInappMentions?: boolean;
};
/**
 * Describes the message domain.entity.v1.UserPreference.
 * Use `create(UserPreferenceSchema)` to create a new message.
 */
export declare const UserPreferenceSchema: GenMessage<UserPreference>;
/**
 * @generated from message domain.entity.v1.CreateUserPreferenceRequest
 */
export type CreateUserPreferenceRequest = Message<"domain.entity.v1.CreateUserPreferenceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.UserPreference data = 1;
     */
    data?: UserPreference;
};
/**
 * Describes the message domain.entity.v1.CreateUserPreferenceRequest.
 * Use `create(CreateUserPreferenceRequestSchema)` to create a new message.
 */
export declare const CreateUserPreferenceRequestSchema: GenMessage<CreateUserPreferenceRequest>;
/**
 * @generated from message domain.entity.v1.CreateUserPreferenceResponse
 */
export type CreateUserPreferenceResponse = Message<"domain.entity.v1.CreateUserPreferenceResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.UserPreference data = 1;
     */
    data: UserPreference[];
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
 * Describes the message domain.entity.v1.CreateUserPreferenceResponse.
 * Use `create(CreateUserPreferenceResponseSchema)` to create a new message.
 */
export declare const CreateUserPreferenceResponseSchema: GenMessage<CreateUserPreferenceResponse>;
/**
 * @generated from message domain.entity.v1.ReadUserPreferenceRequest
 */
export type ReadUserPreferenceRequest = Message<"domain.entity.v1.ReadUserPreferenceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.UserPreference data = 1;
     */
    data?: UserPreference;
};
/**
 * Describes the message domain.entity.v1.ReadUserPreferenceRequest.
 * Use `create(ReadUserPreferenceRequestSchema)` to create a new message.
 */
export declare const ReadUserPreferenceRequestSchema: GenMessage<ReadUserPreferenceRequest>;
/**
 * @generated from message domain.entity.v1.ReadUserPreferenceResponse
 */
export type ReadUserPreferenceResponse = Message<"domain.entity.v1.ReadUserPreferenceResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.UserPreference data = 1;
     */
    data: UserPreference[];
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
 * Describes the message domain.entity.v1.ReadUserPreferenceResponse.
 * Use `create(ReadUserPreferenceResponseSchema)` to create a new message.
 */
export declare const ReadUserPreferenceResponseSchema: GenMessage<ReadUserPreferenceResponse>;
/**
 * @generated from message domain.entity.v1.UpdateUserPreferenceRequest
 */
export type UpdateUserPreferenceRequest = Message<"domain.entity.v1.UpdateUserPreferenceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.UserPreference data = 1;
     */
    data?: UserPreference;
};
/**
 * Describes the message domain.entity.v1.UpdateUserPreferenceRequest.
 * Use `create(UpdateUserPreferenceRequestSchema)` to create a new message.
 */
export declare const UpdateUserPreferenceRequestSchema: GenMessage<UpdateUserPreferenceRequest>;
/**
 * @generated from message domain.entity.v1.UpdateUserPreferenceResponse
 */
export type UpdateUserPreferenceResponse = Message<"domain.entity.v1.UpdateUserPreferenceResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.UserPreference data = 1;
     */
    data: UserPreference[];
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
 * Describes the message domain.entity.v1.UpdateUserPreferenceResponse.
 * Use `create(UpdateUserPreferenceResponseSchema)` to create a new message.
 */
export declare const UpdateUserPreferenceResponseSchema: GenMessage<UpdateUserPreferenceResponse>;
/**
 * @generated from message domain.entity.v1.DeleteUserPreferenceRequest
 */
export type DeleteUserPreferenceRequest = Message<"domain.entity.v1.DeleteUserPreferenceRequest"> & {
    /**
     * @generated from field: domain.entity.v1.UserPreference data = 1;
     */
    data?: UserPreference;
};
/**
 * Describes the message domain.entity.v1.DeleteUserPreferenceRequest.
 * Use `create(DeleteUserPreferenceRequestSchema)` to create a new message.
 */
export declare const DeleteUserPreferenceRequestSchema: GenMessage<DeleteUserPreferenceRequest>;
/**
 * @generated from message domain.entity.v1.DeleteUserPreferenceResponse
 */
export type DeleteUserPreferenceResponse = Message<"domain.entity.v1.DeleteUserPreferenceResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteUserPreferenceResponse.
 * Use `create(DeleteUserPreferenceResponseSchema)` to create a new message.
 */
export declare const DeleteUserPreferenceResponseSchema: GenMessage<DeleteUserPreferenceResponse>;
/**
 * @generated from message domain.entity.v1.ListUserPreferencesRequest
 */
export type ListUserPreferencesRequest = Message<"domain.entity.v1.ListUserPreferencesRequest"> & {
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
 * Describes the message domain.entity.v1.ListUserPreferencesRequest.
 * Use `create(ListUserPreferencesRequestSchema)` to create a new message.
 */
export declare const ListUserPreferencesRequestSchema: GenMessage<ListUserPreferencesRequest>;
/**
 * @generated from message domain.entity.v1.ListUserPreferencesResponse
 */
export type ListUserPreferencesResponse = Message<"domain.entity.v1.ListUserPreferencesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.UserPreference data = 1;
     */
    data: UserPreference[];
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
 * Describes the message domain.entity.v1.ListUserPreferencesResponse.
 * Use `create(ListUserPreferencesResponseSchema)` to create a new message.
 */
export declare const ListUserPreferencesResponseSchema: GenMessage<ListUserPreferencesResponse>;
/**
 * @generated from message domain.entity.v1.GetUserPreferenceListPageDataRequest
 */
export type GetUserPreferenceListPageDataRequest = Message<"domain.entity.v1.GetUserPreferenceListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetUserPreferenceListPageDataRequest.
 * Use `create(GetUserPreferenceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetUserPreferenceListPageDataRequestSchema: GenMessage<GetUserPreferenceListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetUserPreferenceListPageDataResponse
 */
export type GetUserPreferenceListPageDataResponse = Message<"domain.entity.v1.GetUserPreferenceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.UserPreference user_preference_list = 1;
     */
    userPreferenceList: UserPreference[];
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
 * Describes the message domain.entity.v1.GetUserPreferenceListPageDataResponse.
 * Use `create(GetUserPreferenceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetUserPreferenceListPageDataResponseSchema: GenMessage<GetUserPreferenceListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetUserPreferenceItemPageDataRequest
 */
export type GetUserPreferenceItemPageDataRequest = Message<"domain.entity.v1.GetUserPreferenceItemPageDataRequest"> & {
    /**
     * @generated from field: string user_preference_id = 1;
     */
    userPreferenceId: string;
};
/**
 * Describes the message domain.entity.v1.GetUserPreferenceItemPageDataRequest.
 * Use `create(GetUserPreferenceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetUserPreferenceItemPageDataRequestSchema: GenMessage<GetUserPreferenceItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetUserPreferenceItemPageDataResponse
 */
export type GetUserPreferenceItemPageDataResponse = Message<"domain.entity.v1.GetUserPreferenceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.UserPreference user_preference = 1;
     */
    userPreference?: UserPreference;
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
 * Describes the message domain.entity.v1.GetUserPreferenceItemPageDataResponse.
 * Use `create(GetUserPreferenceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetUserPreferenceItemPageDataResponseSchema: GenMessage<GetUserPreferenceItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.UserPreferenceDomainService
 */
export declare const UserPreferenceDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.CreateUserPreference
     */
    createUserPreference: {
        methodKind: "unary";
        input: typeof CreateUserPreferenceRequestSchema;
        output: typeof CreateUserPreferenceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.ReadUserPreference
     */
    readUserPreference: {
        methodKind: "unary";
        input: typeof ReadUserPreferenceRequestSchema;
        output: typeof ReadUserPreferenceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.UpdateUserPreference
     */
    updateUserPreference: {
        methodKind: "unary";
        input: typeof UpdateUserPreferenceRequestSchema;
        output: typeof UpdateUserPreferenceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.DeleteUserPreference
     */
    deleteUserPreference: {
        methodKind: "unary";
        input: typeof DeleteUserPreferenceRequestSchema;
        output: typeof DeleteUserPreferenceResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.ListUserPreferences
     */
    listUserPreferences: {
        methodKind: "unary";
        input: typeof ListUserPreferencesRequestSchema;
        output: typeof ListUserPreferencesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.GetUserPreferenceListPageData
     */
    getUserPreferenceListPageData: {
        methodKind: "unary";
        input: typeof GetUserPreferenceListPageDataRequestSchema;
        output: typeof GetUserPreferenceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.UserPreferenceDomainService.GetUserPreferenceItemPageData
     */
    getUserPreferenceItemPageData: {
        methodKind: "unary";
        input: typeof GetUserPreferenceItemPageDataRequestSchema;
        output: typeof GetUserPreferenceItemPageDataResponseSchema;
    };
}>;
