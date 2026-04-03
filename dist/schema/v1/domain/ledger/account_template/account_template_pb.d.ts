import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Account } from "../account/account_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/account_template/account_template.proto.
 */
export declare const file_domain_ledger_account_template_account_template: GenFile;
/**
 * AccountTemplate bundles a pre-configured Chart of Accounts for a specific industry.
 * Applied via a one-time setup wizard to seed the Account table.
 *
 * @generated from message domain.ledger.v1.AccountTemplate
 */
export type AccountTemplate = Message<"domain.ledger.v1.AccountTemplate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * e.g. "Philippine Service Business (Salon/Spa)"
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional string description = 3;
     */
    description?: string;
    /**
     * e.g. "service", "retail", "restaurant", "construction"
     *
     * @generated from field: string industry_type = 4;
     */
    industryType: string;
    /**
     * Pre-configured accounts included in this template (embedded for read; stored as seed data)
     *
     * @generated from field: repeated domain.ledger.v1.Account accounts = 5;
     */
    accounts: Account[];
    /**
     * Audit fields
     *
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.ledger.v1.AccountTemplate.
 * Use `create(AccountTemplateSchema)` to create a new message.
 */
export declare const AccountTemplateSchema: GenMessage<AccountTemplate>;
/**
 * @generated from message domain.ledger.v1.CreateAccountTemplateRequest
 */
export type CreateAccountTemplateRequest = Message<"domain.ledger.v1.CreateAccountTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountTemplate data = 1;
     */
    data?: AccountTemplate;
};
/**
 * Describes the message domain.ledger.v1.CreateAccountTemplateRequest.
 * Use `create(CreateAccountTemplateRequestSchema)` to create a new message.
 */
export declare const CreateAccountTemplateRequestSchema: GenMessage<CreateAccountTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.CreateAccountTemplateResponse
 */
export type CreateAccountTemplateResponse = Message<"domain.ledger.v1.CreateAccountTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountTemplate data = 1;
     */
    data: AccountTemplate[];
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
 * Describes the message domain.ledger.v1.CreateAccountTemplateResponse.
 * Use `create(CreateAccountTemplateResponseSchema)` to create a new message.
 */
export declare const CreateAccountTemplateResponseSchema: GenMessage<CreateAccountTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.ReadAccountTemplateRequest
 */
export type ReadAccountTemplateRequest = Message<"domain.ledger.v1.ReadAccountTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountTemplate data = 1;
     */
    data?: AccountTemplate;
};
/**
 * Describes the message domain.ledger.v1.ReadAccountTemplateRequest.
 * Use `create(ReadAccountTemplateRequestSchema)` to create a new message.
 */
export declare const ReadAccountTemplateRequestSchema: GenMessage<ReadAccountTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.ReadAccountTemplateResponse
 */
export type ReadAccountTemplateResponse = Message<"domain.ledger.v1.ReadAccountTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountTemplate data = 1;
     */
    data: AccountTemplate[];
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
 * Describes the message domain.ledger.v1.ReadAccountTemplateResponse.
 * Use `create(ReadAccountTemplateResponseSchema)` to create a new message.
 */
export declare const ReadAccountTemplateResponseSchema: GenMessage<ReadAccountTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateAccountTemplateRequest
 */
export type UpdateAccountTemplateRequest = Message<"domain.ledger.v1.UpdateAccountTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountTemplate data = 1;
     */
    data?: AccountTemplate;
};
/**
 * Describes the message domain.ledger.v1.UpdateAccountTemplateRequest.
 * Use `create(UpdateAccountTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateAccountTemplateRequestSchema: GenMessage<UpdateAccountTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateAccountTemplateResponse
 */
export type UpdateAccountTemplateResponse = Message<"domain.ledger.v1.UpdateAccountTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountTemplate data = 1;
     */
    data: AccountTemplate[];
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
 * Describes the message domain.ledger.v1.UpdateAccountTemplateResponse.
 * Use `create(UpdateAccountTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateAccountTemplateResponseSchema: GenMessage<UpdateAccountTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteAccountTemplateRequest
 */
export type DeleteAccountTemplateRequest = Message<"domain.ledger.v1.DeleteAccountTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.AccountTemplate data = 1;
     */
    data?: AccountTemplate;
};
/**
 * Describes the message domain.ledger.v1.DeleteAccountTemplateRequest.
 * Use `create(DeleteAccountTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteAccountTemplateRequestSchema: GenMessage<DeleteAccountTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteAccountTemplateResponse
 */
export type DeleteAccountTemplateResponse = Message<"domain.ledger.v1.DeleteAccountTemplateResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteAccountTemplateResponse.
 * Use `create(DeleteAccountTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteAccountTemplateResponseSchema: GenMessage<DeleteAccountTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.ListAccountTemplatesRequest
 */
export type ListAccountTemplatesRequest = Message<"domain.ledger.v1.ListAccountTemplatesRequest"> & {
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
 * Describes the message domain.ledger.v1.ListAccountTemplatesRequest.
 * Use `create(ListAccountTemplatesRequestSchema)` to create a new message.
 */
export declare const ListAccountTemplatesRequestSchema: GenMessage<ListAccountTemplatesRequest>;
/**
 * @generated from message domain.ledger.v1.ListAccountTemplatesResponse
 */
export type ListAccountTemplatesResponse = Message<"domain.ledger.v1.ListAccountTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountTemplate data = 1;
     */
    data: AccountTemplate[];
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
 * Describes the message domain.ledger.v1.ListAccountTemplatesResponse.
 * Use `create(ListAccountTemplatesResponseSchema)` to create a new message.
 */
export declare const ListAccountTemplatesResponseSchema: GenMessage<ListAccountTemplatesResponse>;
/**
 * @generated from message domain.ledger.v1.GetAccountTemplateListPageDataRequest
 */
export type GetAccountTemplateListPageDataRequest = Message<"domain.ledger.v1.GetAccountTemplateListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetAccountTemplateListPageDataRequest.
 * Use `create(GetAccountTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountTemplateListPageDataRequestSchema: GenMessage<GetAccountTemplateListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountTemplateListPageDataResponse
 */
export type GetAccountTemplateListPageDataResponse = Message<"domain.ledger.v1.GetAccountTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.AccountTemplate account_template_list = 1;
     */
    accountTemplateList: AccountTemplate[];
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
 * Describes the message domain.ledger.v1.GetAccountTemplateListPageDataResponse.
 * Use `create(GetAccountTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountTemplateListPageDataResponseSchema: GenMessage<GetAccountTemplateListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetAccountTemplateItemPageDataRequest
 */
export type GetAccountTemplateItemPageDataRequest = Message<"domain.ledger.v1.GetAccountTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string account_template_id = 1;
     */
    accountTemplateId: string;
};
/**
 * Describes the message domain.ledger.v1.GetAccountTemplateItemPageDataRequest.
 * Use `create(GetAccountTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccountTemplateItemPageDataRequestSchema: GenMessage<GetAccountTemplateItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetAccountTemplateItemPageDataResponse
 */
export type GetAccountTemplateItemPageDataResponse = Message<"domain.ledger.v1.GetAccountTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.AccountTemplate account_template = 1;
     */
    accountTemplate?: AccountTemplate;
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
 * Describes the message domain.ledger.v1.GetAccountTemplateItemPageDataResponse.
 * Use `create(GetAccountTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccountTemplateItemPageDataResponseSchema: GenMessage<GetAccountTemplateItemPageDataResponse>;
/**
 * @generated from service domain.ledger.v1.AccountTemplateDomainService
 */
export declare const AccountTemplateDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.CreateAccountTemplate
     */
    createAccountTemplate: {
        methodKind: "unary";
        input: typeof CreateAccountTemplateRequestSchema;
        output: typeof CreateAccountTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.ReadAccountTemplate
     */
    readAccountTemplate: {
        methodKind: "unary";
        input: typeof ReadAccountTemplateRequestSchema;
        output: typeof ReadAccountTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.UpdateAccountTemplate
     */
    updateAccountTemplate: {
        methodKind: "unary";
        input: typeof UpdateAccountTemplateRequestSchema;
        output: typeof UpdateAccountTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.DeleteAccountTemplate
     */
    deleteAccountTemplate: {
        methodKind: "unary";
        input: typeof DeleteAccountTemplateRequestSchema;
        output: typeof DeleteAccountTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.ListAccountTemplates
     */
    listAccountTemplates: {
        methodKind: "unary";
        input: typeof ListAccountTemplatesRequestSchema;
        output: typeof ListAccountTemplatesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.GetAccountTemplateListPageData
     */
    getAccountTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetAccountTemplateListPageDataRequestSchema;
        output: typeof GetAccountTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.AccountTemplateDomainService.GetAccountTemplateItemPageData
     */
    getAccountTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetAccountTemplateItemPageDataRequestSchema;
        output: typeof GetAccountTemplateItemPageDataResponseSchema;
    };
}>;
