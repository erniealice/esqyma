import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { AccountClassification, AccountElement } from "../account/account_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/account_group/account_group.proto.
 */
export declare const file_domain_ledger_account_group_account_group: GenFile;
/**
 * AccountGroup is a configurable Level 2 grouping for financial statement presentation.
 * Groups sit between the fixed IAS 1 classification (Level 1) and individual accounts (Level 3).
 * Examples: "Trade Receivables", "Property Plant and Equipment", "Accrued Liabilities".
 *
 * @generated from message domain.ledger.v1.AccountGroup
 */
export type AccountGroup = Message<"domain.ledger.v1.AccountGroup"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional string description = 3;
     */
    description?: string;
    /**
     * Hierarchy context — group belongs to a fixed element and classification
     *
     * @generated from field: domain.ledger.v1.AccountElement element = 4;
     */
    element: AccountElement;
    /**
     * @generated from field: domain.ledger.v1.AccountClassification classification = 5;
     */
    classification: AccountClassification;
    /**
     * Presentation order within its classification section on financial statements
     *
     * @generated from field: int32 display_order = 6;
     */
    displayOrder: number;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 10;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 11;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.ledger.v1.AccountGroup.
 * Use `create(AccountGroupSchema)` to create a new message.
 */
export declare const AccountGroupSchema: GenMessage<AccountGroup>;
/**
 * @generated from message domain.ledger.v1.CreateAccountGroupRequest
 */
export type CreateAccountGroupRequest = Message<"domain.ledger.v1.CreateAccountGroupRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountGroup data = 1;
     */
    data?: AccountGroup;
};
/**
 * Describes the message domain.ledger.v1.CreateAccountGroupRequest.
 * Use `create(CreateAccountGroupRequestSchema)` to create a new message.
 */
export declare const CreateAccountGroupRequestSchema: GenMessage<CreateAccountGroupRequest>;
/**
 * @generated from message domain.ledger.v1.CreateAccountGroupResponse
 */
export type CreateAccountGroupResponse = Message<"domain.ledger.v1.CreateAccountGroupResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountGroup data = 1;
     */
    data: AccountGroup[];
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
 * Describes the message domain.ledger.v1.CreateAccountGroupResponse.
 * Use `create(CreateAccountGroupResponseSchema)` to create a new message.
 */
export declare const CreateAccountGroupResponseSchema: GenMessage<CreateAccountGroupResponse>;
/**
 * @generated from message domain.ledger.v1.ReadAccountGroupRequest
 */
export type ReadAccountGroupRequest = Message<"domain.ledger.v1.ReadAccountGroupRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountGroup data = 1;
     */
    data?: AccountGroup;
};
/**
 * Describes the message domain.ledger.v1.ReadAccountGroupRequest.
 * Use `create(ReadAccountGroupRequestSchema)` to create a new message.
 */
export declare const ReadAccountGroupRequestSchema: GenMessage<ReadAccountGroupRequest>;
/**
 * @generated from message domain.ledger.v1.ReadAccountGroupResponse
 */
export type ReadAccountGroupResponse = Message<"domain.ledger.v1.ReadAccountGroupResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountGroup data = 1;
     */
    data: AccountGroup[];
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
 * Describes the message domain.ledger.v1.ReadAccountGroupResponse.
 * Use `create(ReadAccountGroupResponseSchema)` to create a new message.
 */
export declare const ReadAccountGroupResponseSchema: GenMessage<ReadAccountGroupResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateAccountGroupRequest
 */
export type UpdateAccountGroupRequest = Message<"domain.ledger.v1.UpdateAccountGroupRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountGroup data = 1;
     */
    data?: AccountGroup;
};
/**
 * Describes the message domain.ledger.v1.UpdateAccountGroupRequest.
 * Use `create(UpdateAccountGroupRequestSchema)` to create a new message.
 */
export declare const UpdateAccountGroupRequestSchema: GenMessage<UpdateAccountGroupRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateAccountGroupResponse
 */
export type UpdateAccountGroupResponse = Message<"domain.ledger.v1.UpdateAccountGroupResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountGroup data = 1;
     */
    data: AccountGroup[];
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
 * Describes the message domain.ledger.v1.UpdateAccountGroupResponse.
 * Use `create(UpdateAccountGroupResponseSchema)` to create a new message.
 */
export declare const UpdateAccountGroupResponseSchema: GenMessage<UpdateAccountGroupResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteAccountGroupRequest
 */
export type DeleteAccountGroupRequest = Message<"domain.ledger.v1.DeleteAccountGroupRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountGroup data = 1;
     */
    data?: AccountGroup;
};
/**
 * Describes the message domain.ledger.v1.DeleteAccountGroupRequest.
 * Use `create(DeleteAccountGroupRequestSchema)` to create a new message.
 */
export declare const DeleteAccountGroupRequestSchema: GenMessage<DeleteAccountGroupRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteAccountGroupResponse
 */
export type DeleteAccountGroupResponse = Message<"domain.ledger.v1.DeleteAccountGroupResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteAccountGroupResponse.
 * Use `create(DeleteAccountGroupResponseSchema)` to create a new message.
 */
export declare const DeleteAccountGroupResponseSchema: GenMessage<DeleteAccountGroupResponse>;
/**
 * @generated from message domain.ledger.v1.ListAccountGroupsRequest
 */
export type ListAccountGroupsRequest = Message<"domain.ledger.v1.ListAccountGroupsRequest"> & {
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
 * Describes the message domain.ledger.v1.ListAccountGroupsRequest.
 * Use `create(ListAccountGroupsRequestSchema)` to create a new message.
 */
export declare const ListAccountGroupsRequestSchema: GenMessage<ListAccountGroupsRequest>;
/**
 * @generated from message domain.ledger.v1.ListAccountGroupsResponse
 */
export type ListAccountGroupsResponse = Message<"domain.ledger.v1.ListAccountGroupsResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountGroup data = 1;
     */
    data: AccountGroup[];
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
 * Describes the message domain.ledger.v1.ListAccountGroupsResponse.
 * Use `create(ListAccountGroupsResponseSchema)` to create a new message.
 */
export declare const ListAccountGroupsResponseSchema: GenMessage<ListAccountGroupsResponse>;
/**
 * @generated from message domain.ledger.v1.GetAccountGroupListPageDataRequest
 */
export type GetAccountGroupListPageDataRequest = Message<"domain.ledger.v1.GetAccountGroupListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetAccountGroupListPageDataRequest.
 * Use `create(GetAccountGroupListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountGroupListPageDataRequestSchema: GenMessage<GetAccountGroupListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountGroupListPageDataResponse
 */
export type GetAccountGroupListPageDataResponse = Message<"domain.ledger.v1.GetAccountGroupListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountGroup account_group_list = 1;
     */
    accountGroupList: AccountGroup[];
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
 * Describes the message domain.ledger.v1.GetAccountGroupListPageDataResponse.
 * Use `create(GetAccountGroupListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountGroupListPageDataResponseSchema: GenMessage<GetAccountGroupListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetAccountGroupItemPageDataRequest
 */
export type GetAccountGroupItemPageDataRequest = Message<"domain.ledger.v1.GetAccountGroupItemPageDataRequest"> & {
    /**
     * @generated from field: string account_group_id = 1;
     */
    accountGroupId: string;
};
/**
 * Describes the message domain.ledger.v1.GetAccountGroupItemPageDataRequest.
 * Use `create(GetAccountGroupItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountGroupItemPageDataRequestSchema: GenMessage<GetAccountGroupItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountGroupItemPageDataResponse
 */
export type GetAccountGroupItemPageDataResponse = Message<"domain.ledger.v1.GetAccountGroupItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.AccountGroup account_group = 1;
     */
    accountGroup?: AccountGroup;
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
 * Describes the message domain.ledger.v1.GetAccountGroupItemPageDataResponse.
 * Use `create(GetAccountGroupItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountGroupItemPageDataResponseSchema: GenMessage<GetAccountGroupItemPageDataResponse>;
/**
 * @generated from service domain.ledger.v1.AccountGroupDomainService
 */
export declare const AccountGroupDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.CreateAccountGroup
     */
    createAccountGroup: {
        methodKind: "unary";
        input: typeof CreateAccountGroupRequestSchema;
        output: typeof CreateAccountGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.ReadAccountGroup
     */
    readAccountGroup: {
        methodKind: "unary";
        input: typeof ReadAccountGroupRequestSchema;
        output: typeof ReadAccountGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.UpdateAccountGroup
     */
    updateAccountGroup: {
        methodKind: "unary";
        input: typeof UpdateAccountGroupRequestSchema;
        output: typeof UpdateAccountGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.DeleteAccountGroup
     */
    deleteAccountGroup: {
        methodKind: "unary";
        input: typeof DeleteAccountGroupRequestSchema;
        output: typeof DeleteAccountGroupResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.ListAccountGroups
     */
    listAccountGroups: {
        methodKind: "unary";
        input: typeof ListAccountGroupsRequestSchema;
        output: typeof ListAccountGroupsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.GetAccountGroupListPageData
     */
    getAccountGroupListPageData: {
        methodKind: "unary";
        input: typeof GetAccountGroupListPageDataRequestSchema;
        output: typeof GetAccountGroupListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountGroupDomainService.GetAccountGroupItemPageData
     */
    getAccountGroupItemPageData: {
        methodKind: "unary";
        input: typeof GetAccountGroupItemPageDataRequestSchema;
        output: typeof GetAccountGroupItemPageDataResponseSchema;
    };
}>;
