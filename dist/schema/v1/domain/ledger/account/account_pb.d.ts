import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/account/account.proto.
 */
export declare const file_domain_ledger_account_account: GenFile;
/**
 * Account is the GL account entity. Supports 5-level hierarchy via adjacency list:
 * Element (enum) > Classification (enum) > Group (FK) > Account > Sub-Account (parent_id).
 * Flat queries remain efficient because element and classification are denormalized.
 *
 * @generated from message domain.ledger.v1.Account
 */
export type Account = Message<"domain.ledger.v1.Account"> & {
    /**
     * Core identity
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string code = 2;
     */
    code: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: optional string description = 4;
     */
    description?: string;
    /**
     * Hierarchy — Level 0 and 1 are fixed enums
     *
     * @generated from field: domain.ledger.v1.AccountElement element = 5;
     */
    element: AccountElement;
    /**
     * @generated from field: domain.ledger.v1.AccountClassification classification = 6;
     */
    classification: AccountClassification;
    /**
     * Hierarchy — Level 2: configurable account group
     *
     * @generated from field: optional string group_id = 7;
     */
    groupId?: string;
    /**
     * Hierarchy — Level 4: self-FK for sub-accounts (adjacency list, max 5 levels)
     *
     * @generated from field: optional string parent_id = 8;
     */
    parentId?: string;
    /**
     * Accounting behavior
     *
     * @generated from field: domain.ledger.v1.CashFlowActivity cash_flow_activity = 9;
     */
    cashFlowActivity: CashFlowActivity;
    /**
     * @generated from field: domain.ledger.v1.NormalBalance normal_balance = 10;
     */
    normalBalance: NormalBalance;
    /**
     * Protected from deletion
     *
     * @generated from field: bool is_system_account = 11;
     */
    isSystemAccount: boolean;
    /**
     * Reduces parent account balance
     *
     * @generated from field: bool is_contra = 12;
     */
    isContra: boolean;
    /**
     * Status and lifecycle
     *
     * @generated from field: domain.ledger.v1.AccountStatus status = 13;
     */
    status: AccountStatus;
    /**
     * @generated from field: optional string notes = 14;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 15;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 18;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 19;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.ledger.v1.Account.
 * Use `create(AccountSchema)` to create a new message.
 */
export declare const AccountSchema: GenMessage<Account>;
/**
 * @generated from message domain.ledger.v1.CreateAccountRequest
 */
export type CreateAccountRequest = Message<"domain.ledger.v1.CreateAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.Account data = 1;
     */
    data?: Account;
};
/**
 * Describes the message domain.ledger.v1.CreateAccountRequest.
 * Use `create(CreateAccountRequestSchema)` to create a new message.
 */
export declare const CreateAccountRequestSchema: GenMessage<CreateAccountRequest>;
/**
 * @generated from message domain.ledger.v1.CreateAccountResponse
 */
export type CreateAccountResponse = Message<"domain.ledger.v1.CreateAccountResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.Account data = 1;
     */
    data: Account[];
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
 * Describes the message domain.ledger.v1.CreateAccountResponse.
 * Use `create(CreateAccountResponseSchema)` to create a new message.
 */
export declare const CreateAccountResponseSchema: GenMessage<CreateAccountResponse>;
/**
 * @generated from message domain.ledger.v1.ReadAccountRequest
 */
export type ReadAccountRequest = Message<"domain.ledger.v1.ReadAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.Account data = 1;
     */
    data?: Account;
};
/**
 * Describes the message domain.ledger.v1.ReadAccountRequest.
 * Use `create(ReadAccountRequestSchema)` to create a new message.
 */
export declare const ReadAccountRequestSchema: GenMessage<ReadAccountRequest>;
/**
 * @generated from message domain.ledger.v1.ReadAccountResponse
 */
export type ReadAccountResponse = Message<"domain.ledger.v1.ReadAccountResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.Account data = 1;
     */
    data: Account[];
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
 * Describes the message domain.ledger.v1.ReadAccountResponse.
 * Use `create(ReadAccountResponseSchema)` to create a new message.
 */
export declare const ReadAccountResponseSchema: GenMessage<ReadAccountResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateAccountRequest
 */
export type UpdateAccountRequest = Message<"domain.ledger.v1.UpdateAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.Account data = 1;
     */
    data?: Account;
};
/**
 * Describes the message domain.ledger.v1.UpdateAccountRequest.
 * Use `create(UpdateAccountRequestSchema)` to create a new message.
 */
export declare const UpdateAccountRequestSchema: GenMessage<UpdateAccountRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateAccountResponse
 */
export type UpdateAccountResponse = Message<"domain.ledger.v1.UpdateAccountResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.Account data = 1;
     */
    data: Account[];
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
 * Describes the message domain.ledger.v1.UpdateAccountResponse.
 * Use `create(UpdateAccountResponseSchema)` to create a new message.
 */
export declare const UpdateAccountResponseSchema: GenMessage<UpdateAccountResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteAccountRequest
 */
export type DeleteAccountRequest = Message<"domain.ledger.v1.DeleteAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.Account data = 1;
     */
    data?: Account;
};
/**
 * Describes the message domain.ledger.v1.DeleteAccountRequest.
 * Use `create(DeleteAccountRequestSchema)` to create a new message.
 */
export declare const DeleteAccountRequestSchema: GenMessage<DeleteAccountRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteAccountResponse
 */
export type DeleteAccountResponse = Message<"domain.ledger.v1.DeleteAccountResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteAccountResponse.
 * Use `create(DeleteAccountResponseSchema)` to create a new message.
 */
export declare const DeleteAccountResponseSchema: GenMessage<DeleteAccountResponse>;
/**
 * @generated from message domain.ledger.v1.ListAccountsRequest
 */
export type ListAccountsRequest = Message<"domain.ledger.v1.ListAccountsRequest"> & {
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
 * Describes the message domain.ledger.v1.ListAccountsRequest.
 * Use `create(ListAccountsRequestSchema)` to create a new message.
 */
export declare const ListAccountsRequestSchema: GenMessage<ListAccountsRequest>;
/**
 * @generated from message domain.ledger.v1.ListAccountsResponse
 */
export type ListAccountsResponse = Message<"domain.ledger.v1.ListAccountsResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.Account data = 1;
     */
    data: Account[];
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
 * Describes the message domain.ledger.v1.ListAccountsResponse.
 * Use `create(ListAccountsResponseSchema)` to create a new message.
 */
export declare const ListAccountsResponseSchema: GenMessage<ListAccountsResponse>;
/**
 * @generated from message domain.ledger.v1.GetAccountListPageDataRequest
 */
export type GetAccountListPageDataRequest = Message<"domain.ledger.v1.GetAccountListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetAccountListPageDataRequest.
 * Use `create(GetAccountListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountListPageDataRequestSchema: GenMessage<GetAccountListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountListPageDataResponse
 */
export type GetAccountListPageDataResponse = Message<"domain.ledger.v1.GetAccountListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.Account account_list = 1;
     */
    accountList: Account[];
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
 * Describes the message domain.ledger.v1.GetAccountListPageDataResponse.
 * Use `create(GetAccountListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountListPageDataResponseSchema: GenMessage<GetAccountListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetAccountItemPageDataRequest
 */
export type GetAccountItemPageDataRequest = Message<"domain.ledger.v1.GetAccountItemPageDataRequest"> & {
    /**
     * @generated from field: string account_id = 1;
     */
    accountId: string;
};
/**
 * Describes the message domain.ledger.v1.GetAccountItemPageDataRequest.
 * Use `create(GetAccountItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountItemPageDataRequestSchema: GenMessage<GetAccountItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountItemPageDataResponse
 */
export type GetAccountItemPageDataResponse = Message<"domain.ledger.v1.GetAccountItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.Account account = 1;
     */
    account?: Account;
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
 * Describes the message domain.ledger.v1.GetAccountItemPageDataResponse.
 * Use `create(GetAccountItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountItemPageDataResponseSchema: GenMessage<GetAccountItemPageDataResponse>;
/**
 * Tree view: returns all accounts grouped by element/classification for CoA display.
 * Uses WITH RECURSIVE CTE to resolve the adjacency list into a flat ordered list.
 *
 * @generated from message domain.ledger.v1.GetAccountTreePageDataRequest
 */
export type GetAccountTreePageDataRequest = Message<"domain.ledger.v1.GetAccountTreePageDataRequest"> & {
    /**
     * Filter by element (optional)
     *
     * @generated from field: optional domain.ledger.v1.AccountElement element = 1;
     */
    element?: AccountElement;
    /**
     * Filter by classification (optional)
     *
     * @generated from field: optional domain.ledger.v1.AccountClassification classification = 2;
     */
    classification?: AccountClassification;
    /**
     * Filter by group (optional)
     *
     * @generated from field: optional string group_id = 3;
     */
    groupId?: string;
};
/**
 * Describes the message domain.ledger.v1.GetAccountTreePageDataRequest.
 * Use `create(GetAccountTreePageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountTreePageDataRequestSchema: GenMessage<GetAccountTreePageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountTreePageDataResponse
 */
export type GetAccountTreePageDataResponse = Message<"domain.ledger.v1.GetAccountTreePageDataResponse"> & {
    /**
     * Ordered by code; parent always before children
     *
     * @generated from field: repeated domain.ledger.v1.Account account_list = 1;
     */
    accountList: Account[];
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
 * Describes the message domain.ledger.v1.GetAccountTreePageDataResponse.
 * Use `create(GetAccountTreePageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountTreePageDataResponseSchema: GenMessage<GetAccountTreePageDataResponse>;
/**
 * AccountElement represents the five IFRS Conceptual Framework elements.
 * These are fixed — not configurable by the user.
 *
 * @generated from enum domain.ledger.v1.AccountElement
 */
export declare enum AccountElement {
    /**
     * @generated from enum value: ACCOUNT_ELEMENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACCOUNT_ELEMENT_ASSET = 1;
     */
    ASSET = 1,
    /**
     * @generated from enum value: ACCOUNT_ELEMENT_LIABILITY = 2;
     */
    LIABILITY = 2,
    /**
     * @generated from enum value: ACCOUNT_ELEMENT_EQUITY = 3;
     */
    EQUITY = 3,
    /**
     * @generated from enum value: ACCOUNT_ELEMENT_REVENUE = 4;
     */
    REVENUE = 4,
    /**
     * @generated from enum value: ACCOUNT_ELEMENT_EXPENSE = 5;
     */
    EXPENSE = 5
}
/**
 * Describes the enum domain.ledger.v1.AccountElement.
 */
export declare const AccountElementSchema: GenEnum<AccountElement>;
/**
 * AccountClassification represents the IAS 1 presentation categories.
 * These are fixed enums — derived from the element but more specific.
 *
 * @generated from enum domain.ledger.v1.AccountClassification
 */
export declare enum AccountClassification {
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_CURRENT_ASSET = 1;
     */
    CURRENT_ASSET = 1,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_NON_CURRENT_ASSET = 2;
     */
    NON_CURRENT_ASSET = 2,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_CURRENT_LIABILITY = 3;
     */
    CURRENT_LIABILITY = 3,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_NON_CURRENT_LIABILITY = 4;
     */
    NON_CURRENT_LIABILITY = 4,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_EQUITY = 5;
     */
    EQUITY = 5,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_OPERATING_REVENUE = 6;
     */
    OPERATING_REVENUE = 6,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_OTHER_INCOME = 7;
     */
    OTHER_INCOME = 7,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_COST_OF_SALES = 8;
     */
    COST_OF_SALES = 8,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_OPERATING_EXPENSE = 9;
     */
    OPERATING_EXPENSE = 9,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_FINANCE_COST = 10;
     */
    FINANCE_COST = 10,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_INCOME_TAX = 11;
     */
    INCOME_TAX = 11,
    /**
     * @generated from enum value: ACCOUNT_CLASSIFICATION_OTHER_EXPENSE = 12;
     */
    OTHER_EXPENSE = 12
}
/**
 * Describes the enum domain.ledger.v1.AccountClassification.
 */
export declare const AccountClassificationSchema: GenEnum<AccountClassification>;
/**
 * AccountStatus represents the lifecycle state of an account.
 *
 * @generated from enum domain.ledger.v1.AccountStatus
 */
export declare enum AccountStatus {
    /**
     * @generated from enum value: ACCOUNT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACCOUNT_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * @generated from enum value: ACCOUNT_STATUS_INACTIVE = 2;
     */
    INACTIVE = 2,
    /**
     * @generated from enum value: ACCOUNT_STATUS_LOCKED = 3;
     */
    LOCKED = 3
}
/**
 * Describes the enum domain.ledger.v1.AccountStatus.
 */
export declare const AccountStatusSchema: GenEnum<AccountStatus>;
/**
 * CashFlowActivity tags an account for cash flow statement classification (IAS 7).
 * Cash accounts are tagged NONE — classification comes from the non-cash side.
 *
 * @generated from enum domain.ledger.v1.CashFlowActivity
 */
export declare enum CashFlowActivity {
    /**
     * @generated from enum value: CASH_FLOW_ACTIVITY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CASH_FLOW_ACTIVITY_OPERATING = 1;
     */
    OPERATING = 1,
    /**
     * @generated from enum value: CASH_FLOW_ACTIVITY_INVESTING = 2;
     */
    INVESTING = 2,
    /**
     * @generated from enum value: CASH_FLOW_ACTIVITY_FINANCING = 3;
     */
    FINANCING = 3,
    /**
     * @generated from enum value: CASH_FLOW_ACTIVITY_NONE = 4;
     */
    NONE = 4
}
/**
 * Describes the enum domain.ledger.v1.CashFlowActivity.
 */
export declare const CashFlowActivitySchema: GenEnum<CashFlowActivity>;
/**
 * NormalBalance defines the debit/credit behavior of an account.
 *
 * @generated from enum domain.ledger.v1.NormalBalance
 */
export declare enum NormalBalance {
    /**
     * @generated from enum value: NORMAL_BALANCE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: NORMAL_BALANCE_DEBIT = 1;
     */
    DEBIT = 1,
    /**
     * @generated from enum value: NORMAL_BALANCE_CREDIT = 2;
     */
    CREDIT = 2
}
/**
 * Describes the enum domain.ledger.v1.NormalBalance.
 */
export declare const NormalBalanceSchema: GenEnum<NormalBalance>;
/**
 * @generated from service domain.ledger.v1.AccountDomainService
 */
export declare const AccountDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.AccountDomainService.CreateAccount
     */
    createAccount: {
        methodKind: "unary";
        input: typeof CreateAccountRequestSchema;
        output: typeof CreateAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountDomainService.ReadAccount
     */
    readAccount: {
        methodKind: "unary";
        input: typeof ReadAccountRequestSchema;
        output: typeof ReadAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountDomainService.UpdateAccount
     */
    updateAccount: {
        methodKind: "unary";
        input: typeof UpdateAccountRequestSchema;
        output: typeof UpdateAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountDomainService.DeleteAccount
     */
    deleteAccount: {
        methodKind: "unary";
        input: typeof DeleteAccountRequestSchema;
        output: typeof DeleteAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountDomainService.ListAccounts
     */
    listAccounts: {
        methodKind: "unary";
        input: typeof ListAccountsRequestSchema;
        output: typeof ListAccountsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.AccountDomainService.GetAccountListPageData
     */
    getAccountListPageData: {
        methodKind: "unary";
        input: typeof GetAccountListPageDataRequestSchema;
        output: typeof GetAccountListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountDomainService.GetAccountItemPageData
     */
    getAccountItemPageData: {
        methodKind: "unary";
        input: typeof GetAccountItemPageDataRequestSchema;
        output: typeof GetAccountItemPageDataResponseSchema;
    };
    /**
     * Tree view — returns accounts as hierarchical structure for CoA display
     *
     * @generated from rpc domain.ledger.v1.AccountDomainService.GetAccountTreePageData
     */
    getAccountTreePageData: {
        methodKind: "unary";
        input: typeof GetAccountTreePageDataRequestSchema;
        output: typeof GetAccountTreePageDataResponseSchema;
    };
}>;
