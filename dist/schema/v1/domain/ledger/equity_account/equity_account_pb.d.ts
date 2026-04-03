import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/equity_account/equity_account.proto.
 */
export declare const file_domain_ledger_equity_account_equity_account: GenFile;
/**
 * EquityAccount is a capital account in the Funding > Equity app.
 * Each equity participant (owner, partner) has one or more capital accounts.
 * Linked to a GL account for double-entry integration.
 *
 * @generated from message domain.ledger.v1.EquityAccount
 */
export type EquityAccount = Message<"domain.ledger.v1.EquityAccount"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: domain.ledger.v1.EquityAccountType account_type = 3;
     */
    accountType: EquityAccountType;
    /**
     * Display name for the equity holder
     *
     * @generated from field: optional string owner_name = 4;
     */
    ownerName?: string;
    /**
     * GL account integration — FK to the Chart of Accounts
     *
     * @generated from field: string account_id = 5;
     */
    accountId: string;
    /**
     * Running balance (updated on each equity transaction)
     *
     * @generated from field: double balance = 6;
     */
    balance: number;
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
 * Describes the message domain.ledger.v1.EquityAccount.
 * Use `create(EquityAccountSchema)` to create a new message.
 */
export declare const EquityAccountSchema: GenMessage<EquityAccount>;
/**
 * @generated from message domain.ledger.v1.CreateEquityAccountRequest
 */
export type CreateEquityAccountRequest = Message<"domain.ledger.v1.CreateEquityAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityAccount data = 1;
     */
    data?: EquityAccount;
};
/**
 * Describes the message domain.ledger.v1.CreateEquityAccountRequest.
 * Use `create(CreateEquityAccountRequestSchema)` to create a new message.
 */
export declare const CreateEquityAccountRequestSchema: GenMessage<CreateEquityAccountRequest>;
/**
 * @generated from message domain.ledger.v1.CreateEquityAccountResponse
 */
export type CreateEquityAccountResponse = Message<"domain.ledger.v1.CreateEquityAccountResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityAccount data = 1;
     */
    data: EquityAccount[];
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
 * Describes the message domain.ledger.v1.CreateEquityAccountResponse.
 * Use `create(CreateEquityAccountResponseSchema)` to create a new message.
 */
export declare const CreateEquityAccountResponseSchema: GenMessage<CreateEquityAccountResponse>;
/**
 * @generated from message domain.ledger.v1.ReadEquityAccountRequest
 */
export type ReadEquityAccountRequest = Message<"domain.ledger.v1.ReadEquityAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityAccount data = 1;
     */
    data?: EquityAccount;
};
/**
 * Describes the message domain.ledger.v1.ReadEquityAccountRequest.
 * Use `create(ReadEquityAccountRequestSchema)` to create a new message.
 */
export declare const ReadEquityAccountRequestSchema: GenMessage<ReadEquityAccountRequest>;
/**
 * @generated from message domain.ledger.v1.ReadEquityAccountResponse
 */
export type ReadEquityAccountResponse = Message<"domain.ledger.v1.ReadEquityAccountResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityAccount data = 1;
     */
    data: EquityAccount[];
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
 * Describes the message domain.ledger.v1.ReadEquityAccountResponse.
 * Use `create(ReadEquityAccountResponseSchema)` to create a new message.
 */
export declare const ReadEquityAccountResponseSchema: GenMessage<ReadEquityAccountResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateEquityAccountRequest
 */
export type UpdateEquityAccountRequest = Message<"domain.ledger.v1.UpdateEquityAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityAccount data = 1;
     */
    data?: EquityAccount;
};
/**
 * Describes the message domain.ledger.v1.UpdateEquityAccountRequest.
 * Use `create(UpdateEquityAccountRequestSchema)` to create a new message.
 */
export declare const UpdateEquityAccountRequestSchema: GenMessage<UpdateEquityAccountRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateEquityAccountResponse
 */
export type UpdateEquityAccountResponse = Message<"domain.ledger.v1.UpdateEquityAccountResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityAccount data = 1;
     */
    data: EquityAccount[];
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
 * Describes the message domain.ledger.v1.UpdateEquityAccountResponse.
 * Use `create(UpdateEquityAccountResponseSchema)` to create a new message.
 */
export declare const UpdateEquityAccountResponseSchema: GenMessage<UpdateEquityAccountResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteEquityAccountRequest
 */
export type DeleteEquityAccountRequest = Message<"domain.ledger.v1.DeleteEquityAccountRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.EquityAccount data = 1;
     */
    data?: EquityAccount;
};
/**
 * Describes the message domain.ledger.v1.DeleteEquityAccountRequest.
 * Use `create(DeleteEquityAccountRequestSchema)` to create a new message.
 */
export declare const DeleteEquityAccountRequestSchema: GenMessage<DeleteEquityAccountRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteEquityAccountResponse
 */
export type DeleteEquityAccountResponse = Message<"domain.ledger.v1.DeleteEquityAccountResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteEquityAccountResponse.
 * Use `create(DeleteEquityAccountResponseSchema)` to create a new message.
 */
export declare const DeleteEquityAccountResponseSchema: GenMessage<DeleteEquityAccountResponse>;
/**
 * @generated from message domain.ledger.v1.ListEquityAccountsRequest
 */
export type ListEquityAccountsRequest = Message<"domain.ledger.v1.ListEquityAccountsRequest"> & {
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
 * Describes the message domain.ledger.v1.ListEquityAccountsRequest.
 * Use `create(ListEquityAccountsRequestSchema)` to create a new message.
 */
export declare const ListEquityAccountsRequestSchema: GenMessage<ListEquityAccountsRequest>;
/**
 * @generated from message domain.ledger.v1.ListEquityAccountsResponse
 */
export type ListEquityAccountsResponse = Message<"domain.ledger.v1.ListEquityAccountsResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityAccount data = 1;
     */
    data: EquityAccount[];
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
 * Describes the message domain.ledger.v1.ListEquityAccountsResponse.
 * Use `create(ListEquityAccountsResponseSchema)` to create a new message.
 */
export declare const ListEquityAccountsResponseSchema: GenMessage<ListEquityAccountsResponse>;
/**
 * @generated from message domain.ledger.v1.GetEquityAccountListPageDataRequest
 */
export type GetEquityAccountListPageDataRequest = Message<"domain.ledger.v1.GetEquityAccountListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetEquityAccountListPageDataRequest.
 * Use `create(GetEquityAccountListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEquityAccountListPageDataRequestSchema: GenMessage<GetEquityAccountListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetEquityAccountListPageDataResponse
 */
export type GetEquityAccountListPageDataResponse = Message<"domain.ledger.v1.GetEquityAccountListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.EquityAccount equity_account_list = 1;
     */
    equityAccountList: EquityAccount[];
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
 * Describes the message domain.ledger.v1.GetEquityAccountListPageDataResponse.
 * Use `create(GetEquityAccountListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEquityAccountListPageDataResponseSchema: GenMessage<GetEquityAccountListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetEquityAccountItemPageDataRequest
 */
export type GetEquityAccountItemPageDataRequest = Message<"domain.ledger.v1.GetEquityAccountItemPageDataRequest"> & {
    /**
     * @generated from field: string equity_account_id = 1;
     */
    equityAccountId: string;
};
/**
 * Describes the message domain.ledger.v1.GetEquityAccountItemPageDataRequest.
 * Use `create(GetEquityAccountItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEquityAccountItemPageDataRequestSchema: GenMessage<GetEquityAccountItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetEquityAccountItemPageDataResponse
 */
export type GetEquityAccountItemPageDataResponse = Message<"domain.ledger.v1.GetEquityAccountItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.EquityAccount equity_account = 1;
     */
    equityAccount?: EquityAccount;
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
 * Describes the message domain.ledger.v1.GetEquityAccountItemPageDataResponse.
 * Use `create(GetEquityAccountItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEquityAccountItemPageDataResponseSchema: GenMessage<GetEquityAccountItemPageDataResponse>;
/**
 * EquityAccountType classifies the capital account's role in the equity section.
 *
 * @generated from enum domain.ledger.v1.EquityAccountType
 */
export declare enum EquityAccountType {
    /**
     * @generated from enum value: EQUITY_ACCOUNT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Initial and additional capital contributions
     *
     * @generated from enum value: EQUITY_ACCOUNT_TYPE_OWNERS_CAPITAL = 1;
     */
    OWNERS_CAPITAL = 1,
    /**
     * Withdrawals reducing equity
     *
     * @generated from enum value: EQUITY_ACCOUNT_TYPE_OWNERS_DRAW = 2;
     */
    OWNERS_DRAW = 2,
    /**
     * Accumulated profits/losses
     *
     * @generated from enum value: EQUITY_ACCOUNT_TYPE_RETAINED_EARNINGS = 3;
     */
    RETAINED_EARNINGS = 3,
    /**
     * Excess over par value (corporations)
     *
     * @generated from enum value: EQUITY_ACCOUNT_TYPE_ADDITIONAL_PAID_IN_CAPITAL = 4;
     */
    ADDITIONAL_PAID_IN_CAPITAL = 4
}
/**
 * Describes the enum domain.ledger.v1.EquityAccountType.
 */
export declare const EquityAccountTypeSchema: GenEnum<EquityAccountType>;
/**
 * @generated from service domain.ledger.v1.EquityAccountDomainService
 */
export declare const EquityAccountDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.CreateEquityAccount
     */
    createEquityAccount: {
        methodKind: "unary";
        input: typeof CreateEquityAccountRequestSchema;
        output: typeof CreateEquityAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.ReadEquityAccount
     */
    readEquityAccount: {
        methodKind: "unary";
        input: typeof ReadEquityAccountRequestSchema;
        output: typeof ReadEquityAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.UpdateEquityAccount
     */
    updateEquityAccount: {
        methodKind: "unary";
        input: typeof UpdateEquityAccountRequestSchema;
        output: typeof UpdateEquityAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.DeleteEquityAccount
     */
    deleteEquityAccount: {
        methodKind: "unary";
        input: typeof DeleteEquityAccountRequestSchema;
        output: typeof DeleteEquityAccountResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.ListEquityAccounts
     */
    listEquityAccounts: {
        methodKind: "unary";
        input: typeof ListEquityAccountsRequestSchema;
        output: typeof ListEquityAccountsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.GetEquityAccountListPageData
     */
    getEquityAccountListPageData: {
        methodKind: "unary";
        input: typeof GetEquityAccountListPageDataRequestSchema;
        output: typeof GetEquityAccountListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.EquityAccountDomainService.GetEquityAccountItemPageData
     */
    getEquityAccountItemPageData: {
        methodKind: "unary";
        input: typeof GetEquityAccountItemPageDataRequestSchema;
        output: typeof GetEquityAccountItemPageDataResponseSchema;
    };
}>;
