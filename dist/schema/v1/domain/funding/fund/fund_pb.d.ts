import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/funding/fund/fund.proto.
 */
export declare const file_domain_funding_fund_fund: GenFile;
/**
 * Fund — cross-workspace global primitive.
 *
 * INTENTIONALLY has NO workspace_id. This is the 6th global table alongside
 * user / workspace / workspace_user / workspace_user_role / admin.
 * Every workspace read of a Fund row must be mediated by the fund/access guard
 * (funding/fund/access.go in espyna-golang) which checks for an active
 * FundAllocation before granting visibility.
 *
 * INTENTIONALLY has NO balance fields. Balances are computed projections over
 * FundTransaction rows (event-sourced). See architecture.md §3.3.
 *
 * Partial unique index (enforced by migration):
 *   (owner_party_type, owner_party_id, name) WHERE status != 'ARCHIVED'
 *
 * @generated from message domain.funding.v1.Fund
 */
export type Fund = Message<"domain.funding.v1.Fund"> & {
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
     * Identity
     *
     * "Personal Visa", "Acme Operating Account"
     *
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional string description = 8;
     */
    description?: string;
    /**
     * @generated from field: domain.funding.v1.FundKind kind = 9;
     */
    kind: FundKind;
    /**
     * Polymorphic owner — no FK constraint at DB level (by design).
     * owner_party_id references user.id, workspace.id, or admin.id depending on owner_party_type.
     *
     * @generated from field: domain.funding.v1.FundOwnerPartyType owner_party_type = 10;
     */
    ownerPartyType: FundOwnerPartyType;
    /**
     * @generated from field: string owner_party_id = 11;
     */
    ownerPartyId: string;
    /**
     * Currency + limit
     *
     * ISO 4217, authoritative source currency
     *
     * @generated from field: string currency = 12;
     */
    currency: string;
    /**
     * centavos in source currency; meaningful for CREDIT_* kinds
     *
     * @generated from field: int64 authorized_limit = 13;
     */
    authorizedLimit: bigint;
    /**
     * GL traceability — the CoA account this Fund backs
     *
     * @generated from field: optional string gl_account_id = 14;
     */
    glAccountId?: string;
    /**
     * Sharing flag — false: single-allocation expected; true: cross-workspace primitive
     *
     * @generated from field: bool shared = 15;
     */
    shared: boolean;
    /**
     * @generated from field: domain.funding.v1.FundStatus status = 16;
     */
    status: FundStatus;
    /**
     * Audit + provider linkage
     *
     * Plaid account_id, Stripe Issuing card id, etc.
     *
     * @generated from field: optional string external_ref = 17;
     */
    externalRef?: string;
    /**
     * @generated from field: optional string linked_by_user_id = 18;
     */
    linkedByUserId?: string;
    /**
     * ── Kind-specific fields (flat columns — see entities.md §5.1 for rationale) ──
     *
     * Shared across BANK_ACCOUNT / CREDIT_LINE / CREDIT_CARD / PREPAID_CARD:
     *
     * "BPI" | "Chase" | "Wise" | "Travel Card Co"
     *
     * @generated from field: optional string institution_name = 20;
     */
    institutionName?: string;
    /**
     * last 4 digits of card or account identifier
     *
     * @generated from field: optional string last_four = 21;
     */
    lastFour?: string;
    /**
     * BANK_ACCOUNT-specific:
     *
     * partial or full; full requires field-level encryption in v2
     *
     * @generated from field: optional string bank_account_number = 22;
     */
    bankAccountNumber?: string;
    /**
     * @generated from field: optional string bank_swift = 23;
     */
    bankSwift?: string;
    /**
     * @generated from field: optional string bank_iban = 24;
     */
    bankIban?: string;
    /**
     * @generated from field: optional string bank_branch = 25;
     */
    bankBranch?: string;
    /**
     * PETTY_CASH-specific:
     *
     * @generated from field: optional string petty_custodian_user_id = 26;
     */
    pettyCustodianUserId?: string;
    /**
     * centavos; the "replenish-to" target
     *
     * @generated from field: optional int64 petty_float_ceiling = 27;
     */
    pettyFloatCeiling?: bigint;
    /**
     * @generated from field: optional string petty_source_fund_id = 28;
     */
    pettySourceFundId?: string;
    /**
     * CREDIT_LINE / CREDIT_CARD-specific:
     *
     * for CREDIT_LINE
     *
     * @generated from field: optional string credit_agreement_reference = 29;
     */
    creditAgreementReference?: string;
    /**
     * 1-31; shared by both credit kinds
     *
     * @generated from field: optional int32 statement_close_day = 30;
     */
    statementCloseDay?: number;
    /**
     * CREDIT_CARD-specific:
     *
     * "Visa" | "Mastercard" | "Amex"
     *
     * @generated from field: optional string card_brand = 31;
     */
    cardBrand?: string;
    /**
     * 1-12
     *
     * @generated from field: optional int32 card_expiry_month = 32;
     */
    cardExpiryMonth?: number;
    /**
     * 4-digit
     *
     * @generated from field: optional int32 card_expiry_year = 33;
     */
    cardExpiryYear?: number;
    /**
     * MOBILE_MONEY-specific:
     *
     * "GCash" | "Maya" | "M-Pesa"
     *
     * @generated from field: optional string mobile_provider_name = 34;
     */
    mobileProviderName?: string;
    /**
     * "+63 9XX XXX 1234"
     *
     * @generated from field: optional string mobile_masked_phone = 35;
     */
    mobileMaskedPhone?: string;
};
/**
 * Describes the message domain.funding.v1.Fund.
 * Use `create(FundSchema)` to create a new message.
 */
export declare const FundSchema: GenMessage<Fund>;
/**
 * @generated from message domain.funding.v1.CreateFundRequest
 */
export type CreateFundRequest = Message<"domain.funding.v1.CreateFundRequest"> & {
    /**
     * @generated from field: domain.funding.v1.Fund data = 1;
     */
    data?: Fund;
};
/**
 * Describes the message domain.funding.v1.CreateFundRequest.
 * Use `create(CreateFundRequestSchema)` to create a new message.
 */
export declare const CreateFundRequestSchema: GenMessage<CreateFundRequest>;
/**
 * @generated from message domain.funding.v1.CreateFundResponse
 */
export type CreateFundResponse = Message<"domain.funding.v1.CreateFundResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.Fund data = 1;
     */
    data: Fund[];
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
 * Describes the message domain.funding.v1.CreateFundResponse.
 * Use `create(CreateFundResponseSchema)` to create a new message.
 */
export declare const CreateFundResponseSchema: GenMessage<CreateFundResponse>;
/**
 * @generated from message domain.funding.v1.ReadFundRequest
 */
export type ReadFundRequest = Message<"domain.funding.v1.ReadFundRequest"> & {
    /**
     * @generated from field: domain.funding.v1.Fund data = 1;
     */
    data?: Fund;
};
/**
 * Describes the message domain.funding.v1.ReadFundRequest.
 * Use `create(ReadFundRequestSchema)` to create a new message.
 */
export declare const ReadFundRequestSchema: GenMessage<ReadFundRequest>;
/**
 * @generated from message domain.funding.v1.ReadFundResponse
 */
export type ReadFundResponse = Message<"domain.funding.v1.ReadFundResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.Fund data = 1;
     */
    data: Fund[];
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
 * Describes the message domain.funding.v1.ReadFundResponse.
 * Use `create(ReadFundResponseSchema)` to create a new message.
 */
export declare const ReadFundResponseSchema: GenMessage<ReadFundResponse>;
/**
 * @generated from message domain.funding.v1.UpdateFundRequest
 */
export type UpdateFundRequest = Message<"domain.funding.v1.UpdateFundRequest"> & {
    /**
     * @generated from field: domain.funding.v1.Fund data = 1;
     */
    data?: Fund;
};
/**
 * Describes the message domain.funding.v1.UpdateFundRequest.
 * Use `create(UpdateFundRequestSchema)` to create a new message.
 */
export declare const UpdateFundRequestSchema: GenMessage<UpdateFundRequest>;
/**
 * @generated from message domain.funding.v1.UpdateFundResponse
 */
export type UpdateFundResponse = Message<"domain.funding.v1.UpdateFundResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.Fund data = 1;
     */
    data: Fund[];
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
 * Describes the message domain.funding.v1.UpdateFundResponse.
 * Use `create(UpdateFundResponseSchema)` to create a new message.
 */
export declare const UpdateFundResponseSchema: GenMessage<UpdateFundResponse>;
/**
 * @generated from message domain.funding.v1.DeleteFundRequest
 */
export type DeleteFundRequest = Message<"domain.funding.v1.DeleteFundRequest"> & {
    /**
     * @generated from field: domain.funding.v1.Fund data = 1;
     */
    data?: Fund;
};
/**
 * Describes the message domain.funding.v1.DeleteFundRequest.
 * Use `create(DeleteFundRequestSchema)` to create a new message.
 */
export declare const DeleteFundRequestSchema: GenMessage<DeleteFundRequest>;
/**
 * @generated from message domain.funding.v1.DeleteFundResponse
 */
export type DeleteFundResponse = Message<"domain.funding.v1.DeleteFundResponse"> & {
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
 * Describes the message domain.funding.v1.DeleteFundResponse.
 * Use `create(DeleteFundResponseSchema)` to create a new message.
 */
export declare const DeleteFundResponseSchema: GenMessage<DeleteFundResponse>;
/**
 * @generated from message domain.funding.v1.ListFundsRequest
 */
export type ListFundsRequest = Message<"domain.funding.v1.ListFundsRequest"> & {
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
 * Describes the message domain.funding.v1.ListFundsRequest.
 * Use `create(ListFundsRequestSchema)` to create a new message.
 */
export declare const ListFundsRequestSchema: GenMessage<ListFundsRequest>;
/**
 * @generated from message domain.funding.v1.ListFundsResponse
 */
export type ListFundsResponse = Message<"domain.funding.v1.ListFundsResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.Fund data = 1;
     */
    data: Fund[];
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
 * Describes the message domain.funding.v1.ListFundsResponse.
 * Use `create(ListFundsResponseSchema)` to create a new message.
 */
export declare const ListFundsResponseSchema: GenMessage<ListFundsResponse>;
/**
 * @generated from message domain.funding.v1.GetFundListPageDataRequest
 */
export type GetFundListPageDataRequest = Message<"domain.funding.v1.GetFundListPageDataRequest"> & {
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
 * Describes the message domain.funding.v1.GetFundListPageDataRequest.
 * Use `create(GetFundListPageDataRequestSchema)` to create a new message.
 */
export declare const GetFundListPageDataRequestSchema: GenMessage<GetFundListPageDataRequest>;
/**
 * @generated from message domain.funding.v1.GetFundListPageDataResponse
 */
export type GetFundListPageDataResponse = Message<"domain.funding.v1.GetFundListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.Fund fund_list = 1;
     */
    fundList: Fund[];
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
 * Describes the message domain.funding.v1.GetFundListPageDataResponse.
 * Use `create(GetFundListPageDataResponseSchema)` to create a new message.
 */
export declare const GetFundListPageDataResponseSchema: GenMessage<GetFundListPageDataResponse>;
/**
 * @generated from message domain.funding.v1.GetFundItemPageDataRequest
 */
export type GetFundItemPageDataRequest = Message<"domain.funding.v1.GetFundItemPageDataRequest"> & {
    /**
     * @generated from field: string fund_id = 1;
     */
    fundId: string;
};
/**
 * Describes the message domain.funding.v1.GetFundItemPageDataRequest.
 * Use `create(GetFundItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetFundItemPageDataRequestSchema: GenMessage<GetFundItemPageDataRequest>;
/**
 * @generated from message domain.funding.v1.GetFundItemPageDataResponse
 */
export type GetFundItemPageDataResponse = Message<"domain.funding.v1.GetFundItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.funding.v1.Fund fund = 1;
     */
    fund?: Fund;
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
 * Describes the message domain.funding.v1.GetFundItemPageDataResponse.
 * Use `create(GetFundItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetFundItemPageDataResponseSchema: GenMessage<GetFundItemPageDataResponse>;
/**
 * FundStatus — lifecycle of a Fund row.
 *
 * @generated from enum domain.funding.v1.FundStatus
 */
export declare enum FundStatus {
    /**
     * @generated from enum value: FUND_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FUND_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: FUND_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: FUND_STATUS_SUSPENDED = 3;
     */
    SUSPENDED = 3,
    /**
     * @generated from enum value: FUND_STATUS_ARCHIVED = 4;
     */
    ARCHIVED = 4
}
/**
 * Describes the enum domain.funding.v1.FundStatus.
 */
export declare const FundStatusSchema: GenEnum<FundStatus>;
/**
 * FundKind — the physical or financial instrument type.
 *
 * @generated from enum domain.funding.v1.FundKind
 */
export declare enum FundKind {
    /**
     * @generated from enum value: FUND_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FUND_KIND_CASH_ON_HAND = 1;
     */
    CASH_ON_HAND = 1,
    /**
     * @generated from enum value: FUND_KIND_BANK_ACCOUNT = 2;
     */
    BANK_ACCOUNT = 2,
    /**
     * @generated from enum value: FUND_KIND_PETTY_CASH = 3;
     */
    PETTY_CASH = 3,
    /**
     * @generated from enum value: FUND_KIND_CREDIT_LINE = 4;
     */
    CREDIT_LINE = 4,
    /**
     * @generated from enum value: FUND_KIND_CREDIT_CARD = 5;
     */
    CREDIT_CARD = 5,
    /**
     * @generated from enum value: FUND_KIND_PREPAID_CARD = 6;
     */
    PREPAID_CARD = 6,
    /**
     * GCash / Maya / M-Pesa-style wallet
     *
     * @generated from enum value: FUND_KIND_MOBILE_MONEY = 7;
     */
    MOBILE_MONEY = 7
}
/**
 * Describes the enum domain.funding.v1.FundKind.
 */
export declare const FundKindSchema: GenEnum<FundKind>;
/**
 * FundOwnerPartyType — polymorphic owner of a Fund.
 * A USER owns a personal card; a WORKSPACE owns a corporate card; ADMIN owns a
 * platform service-account-style source.
 *
 * @generated from enum domain.funding.v1.FundOwnerPartyType
 */
export declare enum FundOwnerPartyType {
    /**
     * @generated from enum value: FUND_OWNER_PARTY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FUND_OWNER_PARTY_TYPE_USER = 1;
     */
    USER = 1,
    /**
     * @generated from enum value: FUND_OWNER_PARTY_TYPE_WORKSPACE = 2;
     */
    WORKSPACE = 2,
    /**
     * @generated from enum value: FUND_OWNER_PARTY_TYPE_ADMIN = 3;
     */
    ADMIN = 3
}
/**
 * Describes the enum domain.funding.v1.FundOwnerPartyType.
 */
export declare const FundOwnerPartyTypeSchema: GenEnum<FundOwnerPartyType>;
/**
 * @generated from service domain.funding.v1.FundDomainService
 */
export declare const FundDomainService: GenService<{
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.CreateFund
     */
    createFund: {
        methodKind: "unary";
        input: typeof CreateFundRequestSchema;
        output: typeof CreateFundResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.ReadFund
     */
    readFund: {
        methodKind: "unary";
        input: typeof ReadFundRequestSchema;
        output: typeof ReadFundResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.UpdateFund
     */
    updateFund: {
        methodKind: "unary";
        input: typeof UpdateFundRequestSchema;
        output: typeof UpdateFundResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.DeleteFund
     */
    deleteFund: {
        methodKind: "unary";
        input: typeof DeleteFundRequestSchema;
        output: typeof DeleteFundResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.ListFunds
     */
    listFunds: {
        methodKind: "unary";
        input: typeof ListFundsRequestSchema;
        output: typeof ListFundsResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.GetFundListPageData
     */
    getFundListPageData: {
        methodKind: "unary";
        input: typeof GetFundListPageDataRequestSchema;
        output: typeof GetFundListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundDomainService.GetFundItemPageData
     */
    getFundItemPageData: {
        methodKind: "unary";
        input: typeof GetFundItemPageDataRequestSchema;
        output: typeof GetFundItemPageDataResponseSchema;
    };
}>;
