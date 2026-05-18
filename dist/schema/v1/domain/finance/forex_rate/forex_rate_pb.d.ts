import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/finance/forex_rate/forex_rate.proto.
 */
export declare const file_domain_finance_forex_rate_forex_rate: GenFile;
/**
 * ForexRate — operator-typed forex rate auto-growing table.
 * Rates are quoted as: functional_units per 1 unit of billing_currency.
 * e.g. rate_micro_units=56500000 = "56.500000 PHP per 1 USD"
 * Computation: functional_centavos = billing_centavos * rate_micro_units / 1_000_000
 *
 * Immutable per row. New versions SUPERSEDE old.
 * Partial unique index on (workspace_id, from_currency, to_currency) WHERE status='ACTIVE'
 * prevents two simultaneously ACTIVE rates for the same currency pair per workspace.
 *
 * @generated from message domain.finance.v1.ForexRate
 */
export type ForexRate = Message<"domain.finance.v1.ForexRate"> & {
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
     * Currency pair — from_currency is the billing currency, to_currency is the functional currency
     *
     * ISO 4217 (e.g. "USD")
     *
     * @generated from field: string from_currency = 8;
     */
    fromCurrency: string;
    /**
     * ISO 4217 — must match workspace.functional_currency
     *
     * @generated from field: string to_currency = 9;
     */
    toCurrency: string;
    /**
     * Rate as micro-units: rate_micro_units / 1_000_000 = exact rate.
     * e.g. 56_500_000 = 56.500000 (functional units per 1 billing unit)
     *
     * @generated from field: int64 rate_micro_units = 10;
     */
    rateMicroUnits: bigint;
    /**
     * How the rate was sourced
     *
     * @generated from field: domain.finance.v1.ForexRateSource source = 11;
     */
    source: ForexRateSource;
    /**
     * When sourced from BSP (v2), the reference date of the published rate
     *
     * ISO 8601 date
     *
     * @generated from field: optional string source_reference_date = 12;
     */
    sourceReferenceDate?: string;
    /**
     * Optional: operator who entered the rate (for audit trail)
     *
     * @generated from field: optional string created_by_user_id = 13;
     */
    createdByUserId?: string;
    /**
     * Lifecycle status
     *
     * @generated from field: domain.finance.v1.ForexRateStatus status = 14;
     */
    status: ForexRateStatus;
    /**
     * asOf window — effective_from <= asOf AND (effective_to IS NULL OR effective_to > asOf)
     *
     * ISO 8601 date
     *
     * @generated from field: string effective_from = 15;
     */
    effectiveFrom: string;
    /**
     * ISO 8601 date — NULL for open-ended ACTIVE rows
     *
     * @generated from field: optional string effective_to = 16;
     */
    effectiveTo?: string;
    /**
     * Self-FK for supersession chain. NULL on the first version.
     *
     * @generated from field: optional string supersedes_id = 17;
     */
    supersedesId?: string;
    /**
     * @generated from field: optional string notes = 18;
     */
    notes?: string;
};
/**
 * Describes the message domain.finance.v1.ForexRate.
 * Use `create(ForexRateSchema)` to create a new message.
 */
export declare const ForexRateSchema: GenMessage<ForexRate>;
/**
 * @generated from message domain.finance.v1.ReadForexRateRequest
 */
export type ReadForexRateRequest = Message<"domain.finance.v1.ReadForexRateRequest"> & {
    /**
     * @generated from field: domain.finance.v1.ForexRate data = 1;
     */
    data?: ForexRate;
};
/**
 * Describes the message domain.finance.v1.ReadForexRateRequest.
 * Use `create(ReadForexRateRequestSchema)` to create a new message.
 */
export declare const ReadForexRateRequestSchema: GenMessage<ReadForexRateRequest>;
/**
 * @generated from message domain.finance.v1.ReadForexRateResponse
 */
export type ReadForexRateResponse = Message<"domain.finance.v1.ReadForexRateResponse"> & {
    /**
     * @generated from field: repeated domain.finance.v1.ForexRate data = 1;
     */
    data: ForexRate[];
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
 * Describes the message domain.finance.v1.ReadForexRateResponse.
 * Use `create(ReadForexRateResponseSchema)` to create a new message.
 */
export declare const ReadForexRateResponseSchema: GenMessage<ReadForexRateResponse>;
/**
 * @generated from message domain.finance.v1.ListForexRatesRequest
 */
export type ListForexRatesRequest = Message<"domain.finance.v1.ListForexRatesRequest"> & {
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
 * Describes the message domain.finance.v1.ListForexRatesRequest.
 * Use `create(ListForexRatesRequestSchema)` to create a new message.
 */
export declare const ListForexRatesRequestSchema: GenMessage<ListForexRatesRequest>;
/**
 * @generated from message domain.finance.v1.ListForexRatesResponse
 */
export type ListForexRatesResponse = Message<"domain.finance.v1.ListForexRatesResponse"> & {
    /**
     * @generated from field: repeated domain.finance.v1.ForexRate data = 1;
     */
    data: ForexRate[];
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
 * Describes the message domain.finance.v1.ListForexRatesResponse.
 * Use `create(ListForexRatesResponseSchema)` to create a new message.
 */
export declare const ListForexRatesResponseSchema: GenMessage<ListForexRatesResponse>;
/**
 * @generated from message domain.finance.v1.GetForexRateListPageDataRequest
 */
export type GetForexRateListPageDataRequest = Message<"domain.finance.v1.GetForexRateListPageDataRequest"> & {
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
 * Describes the message domain.finance.v1.GetForexRateListPageDataRequest.
 * Use `create(GetForexRateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetForexRateListPageDataRequestSchema: GenMessage<GetForexRateListPageDataRequest>;
/**
 * @generated from message domain.finance.v1.GetForexRateListPageDataResponse
 */
export type GetForexRateListPageDataResponse = Message<"domain.finance.v1.GetForexRateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.finance.v1.ForexRate forex_rate_list = 1;
     */
    forexRateList: ForexRate[];
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
 * Describes the message domain.finance.v1.GetForexRateListPageDataResponse.
 * Use `create(GetForexRateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetForexRateListPageDataResponseSchema: GenMessage<GetForexRateListPageDataResponse>;
/**
 * @generated from message domain.finance.v1.GetForexRateItemPageDataRequest
 */
export type GetForexRateItemPageDataRequest = Message<"domain.finance.v1.GetForexRateItemPageDataRequest"> & {
    /**
     * @generated from field: string forex_rate_id = 1;
     */
    forexRateId: string;
};
/**
 * Describes the message domain.finance.v1.GetForexRateItemPageDataRequest.
 * Use `create(GetForexRateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetForexRateItemPageDataRequestSchema: GenMessage<GetForexRateItemPageDataRequest>;
/**
 * @generated from message domain.finance.v1.GetForexRateItemPageDataResponse
 */
export type GetForexRateItemPageDataResponse = Message<"domain.finance.v1.GetForexRateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.finance.v1.ForexRate forex_rate = 1;
     */
    forexRate?: ForexRate;
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
 * Describes the message domain.finance.v1.GetForexRateItemPageDataResponse.
 * Use `create(GetForexRateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetForexRateItemPageDataResponseSchema: GenMessage<GetForexRateItemPageDataResponse>;
/**
 * ForexRateStatus — lifecycle of a forex rate row.
 * New versions SUPERSEDE old via self-FK (supersedes_id + effective_to).
 *
 * @generated from enum domain.finance.v1.ForexRateStatus
 */
export declare enum ForexRateStatus {
    /**
     * @generated from enum value: FOREX_RATE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FOREX_RATE_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: FOREX_RATE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: FOREX_RATE_STATUS_SUPERSEDED = 3;
     */
    SUPERSEDED = 3,
    /**
     * @generated from enum value: FOREX_RATE_STATUS_VOIDED = 4;
     */
    VOIDED = 4
}
/**
 * Describes the enum domain.finance.v1.ForexRateStatus.
 */
export declare const ForexRateStatusSchema: GenEnum<ForexRateStatus>;
/**
 * ForexRateSource — how the rate was obtained.
 *
 * @generated from enum domain.finance.v1.ForexRateSource
 */
export declare enum ForexRateSource {
    /**
     * @generated from enum value: FOREX_RATE_SOURCE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Manually typed by the operator
     *
     * @generated from enum value: FOREX_RATE_SOURCE_OPERATOR = 1;
     */
    OPERATOR = 1,
    /**
     * Auto-imported from BSP (v2)
     *
     * @generated from enum value: FOREX_RATE_SOURCE_BSP_REF = 2;
     */
    BSP_REF = 2
}
/**
 * Describes the enum domain.finance.v1.ForexRateSource.
 */
export declare const ForexRateSourceSchema: GenEnum<ForexRateSource>;
/**
 * @generated from service domain.finance.v1.ForexRateDomainService
 */
export declare const ForexRateDomainService: GenService<{
    /**
     * @generated from rpc domain.finance.v1.ForexRateDomainService.ReadForexRate
     */
    readForexRate: {
        methodKind: "unary";
        input: typeof ReadForexRateRequestSchema;
        output: typeof ReadForexRateResponseSchema;
    };
    /**
     * @generated from rpc domain.finance.v1.ForexRateDomainService.ListForexRates
     */
    listForexRates: {
        methodKind: "unary";
        input: typeof ListForexRatesRequestSchema;
        output: typeof ListForexRatesResponseSchema;
    };
    /**
     * @generated from rpc domain.finance.v1.ForexRateDomainService.GetForexRateListPageData
     */
    getForexRateListPageData: {
        methodKind: "unary";
        input: typeof GetForexRateListPageDataRequestSchema;
        output: typeof GetForexRateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.finance.v1.ForexRateDomainService.GetForexRateItemPageData
     */
    getForexRateItemPageData: {
        methodKind: "unary";
        input: typeof GetForexRateItemPageDataRequestSchema;
        output: typeof GetForexRateItemPageDataResponseSchema;
    };
}>;
