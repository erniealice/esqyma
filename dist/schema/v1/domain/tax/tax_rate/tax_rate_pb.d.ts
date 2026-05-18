import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tax/tax_rate/tax_rate.proto.
 */
export declare const file_domain_tax_tax_rate_tax_rate: GenFile;
/**
 * TaxRate — immutable-per-row rate table. Edits create new rows via
 * supersession; old rows are stamped SUPERSEDED with an effective_to.
 * Lookup: WHERE status IN ('ACTIVE','SUPERSEDED') AND effective_from <= $asOf
 *           AND (effective_to IS NULL OR effective_to > $asOf)
 *         ORDER BY effective_from DESC
 *
 * @generated from message domain.tax.v1.TaxRate
 */
export type TaxRate = Message<"domain.tax.v1.TaxRate"> & {
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
     * Optional: scoped rate overrides a global rate when workspace_id matches.
     * NULL = global fallback rate (applies to all workspaces in this jurisdiction).
     *
     * @generated from field: optional string workspace_id = 7;
     */
    workspaceId?: string;
    /**
     * Jurisdiction this rate applies to (e.g. "PH-NATIONAL", "UK", "US-CA")
     *
     * @generated from field: string jurisdiction = 8;
     */
    jurisdiction: string;
    /**
     * Short code of the issuing authority (e.g. "BIR", "HMRC") — denorm for lookup
     *
     * @generated from field: string authority_code = 9;
     */
    authorityCode: string;
    /**
     * Regulator filing code (e.g. BIR ATC "VT010", "WC011") — audit / reporting
     *
     * @generated from field: optional string regulator_code = 10;
     */
    regulatorCode?: string;
    /**
     * BIR form code (e.g. "2550M") — reserved for future filing automation
     *
     * @generated from field: optional string filing_form_code = 11;
     */
    filingFormCode?: string;
    /**
     * Rate kind used to join registration kind → rate.
     * e.g. "VAT_STANDARD", "WHT_PROFESSIONAL_CORPORATE"
     *
     * @generated from field: string kind = 12;
     */
    kind: string;
    /**
     * Treatment this rate applies to. NULL = any treatment of the given kind.
     * Use STANDARD / REDUCED / ZERO_RATED to differentiate rates within a kind.
     *
     * @generated from field: optional string treatment_code = 13;
     */
    treatmentCode?: string;
    /**
     * SURCHARGE adds to invoice; WITHHOLDING deducts from cash expected
     *
     * @generated from field: domain.tax.v1.TaxRateDirection direction = 14;
     */
    direction: TaxRateDirection;
    /**
     * Rate in basis points (100 bp = 1%). e.g. 1200 = 12.00%, 0 = 0% (ZERO_RATED)
     * Stored as int32 — max 10000 bp (100%). No floats.
     *
     * @generated from field: int32 rate_basis_points = 15;
     */
    rateBasisPoints: number;
    /**
     * asOf window — effective_from <= asOf AND (effective_to IS NULL OR effective_to > asOf)
     *
     * ISO 8601 date
     *
     * @generated from field: string effective_from = 16;
     */
    effectiveFrom: string;
    /**
     * ISO 8601 date — NULL for open-ended ACTIVE rows
     *
     * @generated from field: optional string effective_to = 17;
     */
    effectiveTo?: string;
    /**
     * Lifecycle status
     *
     * @generated from field: domain.tax.v1.TaxRateStatus status = 18;
     */
    status: TaxRateStatus;
    /**
     * Self-FK for supersession chain. NULL on the first version of a rate.
     *
     * @generated from field: optional string supersedes_id = 19;
     */
    supersedesId?: string;
    /**
     * Audit fields
     *
     * e.g. "TRAIN Law RA 10963"
     *
     * @generated from field: optional string source_citation = 20;
     */
    sourceCitation?: string;
    /**
     * e.g. "TRAIN Act 2018 rate"
     *
     * @generated from field: optional string version_label = 21;
     */
    versionLabel?: string;
};
/**
 * Describes the message domain.tax.v1.TaxRate.
 * Use `create(TaxRateSchema)` to create a new message.
 */
export declare const TaxRateSchema: GenMessage<TaxRate>;
/**
 * @generated from message domain.tax.v1.ReadTaxRateRequest
 */
export type ReadTaxRateRequest = Message<"domain.tax.v1.ReadTaxRateRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxRate data = 1;
     */
    data?: TaxRate;
};
/**
 * Describes the message domain.tax.v1.ReadTaxRateRequest.
 * Use `create(ReadTaxRateRequestSchema)` to create a new message.
 */
export declare const ReadTaxRateRequestSchema: GenMessage<ReadTaxRateRequest>;
/**
 * @generated from message domain.tax.v1.ReadTaxRateResponse
 */
export type ReadTaxRateResponse = Message<"domain.tax.v1.ReadTaxRateResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRate data = 1;
     */
    data: TaxRate[];
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
 * Describes the message domain.tax.v1.ReadTaxRateResponse.
 * Use `create(ReadTaxRateResponseSchema)` to create a new message.
 */
export declare const ReadTaxRateResponseSchema: GenMessage<ReadTaxRateResponse>;
/**
 * @generated from message domain.tax.v1.ListTaxRatesRequest
 */
export type ListTaxRatesRequest = Message<"domain.tax.v1.ListTaxRatesRequest"> & {
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
 * Describes the message domain.tax.v1.ListTaxRatesRequest.
 * Use `create(ListTaxRatesRequestSchema)` to create a new message.
 */
export declare const ListTaxRatesRequestSchema: GenMessage<ListTaxRatesRequest>;
/**
 * @generated from message domain.tax.v1.ListTaxRatesResponse
 */
export type ListTaxRatesResponse = Message<"domain.tax.v1.ListTaxRatesResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRate data = 1;
     */
    data: TaxRate[];
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
 * Describes the message domain.tax.v1.ListTaxRatesResponse.
 * Use `create(ListTaxRatesResponseSchema)` to create a new message.
 */
export declare const ListTaxRatesResponseSchema: GenMessage<ListTaxRatesResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxRateListPageDataRequest
 */
export type GetTaxRateListPageDataRequest = Message<"domain.tax.v1.GetTaxRateListPageDataRequest"> & {
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
 * Describes the message domain.tax.v1.GetTaxRateListPageDataRequest.
 * Use `create(GetTaxRateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxRateListPageDataRequestSchema: GenMessage<GetTaxRateListPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxRateListPageDataResponse
 */
export type GetTaxRateListPageDataResponse = Message<"domain.tax.v1.GetTaxRateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRate tax_rate_list = 1;
     */
    taxRateList: TaxRate[];
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
 * Describes the message domain.tax.v1.GetTaxRateListPageDataResponse.
 * Use `create(GetTaxRateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxRateListPageDataResponseSchema: GenMessage<GetTaxRateListPageDataResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxRateItemPageDataRequest
 */
export type GetTaxRateItemPageDataRequest = Message<"domain.tax.v1.GetTaxRateItemPageDataRequest"> & {
    /**
     * @generated from field: string tax_rate_id = 1;
     */
    taxRateId: string;
};
/**
 * Describes the message domain.tax.v1.GetTaxRateItemPageDataRequest.
 * Use `create(GetTaxRateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxRateItemPageDataRequestSchema: GenMessage<GetTaxRateItemPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxRateItemPageDataResponse
 */
export type GetTaxRateItemPageDataResponse = Message<"domain.tax.v1.GetTaxRateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tax.v1.TaxRate tax_rate = 1;
     */
    taxRate?: TaxRate;
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
 * Describes the message domain.tax.v1.GetTaxRateItemPageDataResponse.
 * Use `create(GetTaxRateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxRateItemPageDataResponseSchema: GenMessage<GetTaxRateItemPageDataResponse>;
/**
 * TaxRateDirection — which compute pass uses this rate.
 * SURCHARGE: adds to cash_amount_expected (VAT, GST, sales tax)
 * WITHHOLDING: deducts from cash_amount_expected (WHT)
 *
 * @generated from enum domain.tax.v1.TaxRateDirection
 */
export declare enum TaxRateDirection {
    /**
     * @generated from enum value: TAX_RATE_DIRECTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_RATE_DIRECTION_SURCHARGE = 1;
     */
    SURCHARGE = 1,
    /**
     * @generated from enum value: TAX_RATE_DIRECTION_WITHHOLDING = 2;
     */
    WITHHOLDING = 2
}
/**
 * Describes the enum domain.tax.v1.TaxRateDirection.
 */
export declare const TaxRateDirectionSchema: GenEnum<TaxRateDirection>;
/**
 * TaxRateStatus — lifecycle of a single immutable rate row.
 * New versions SUPERSEDE old via self-FK (supersedes_id + effective_to).
 *
 * @generated from enum domain.tax.v1.TaxRateStatus
 */
export declare enum TaxRateStatus {
    /**
     * @generated from enum value: TAX_RATE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_RATE_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: TAX_RATE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: TAX_RATE_STATUS_SUPERSEDED = 3;
     */
    SUPERSEDED = 3,
    /**
     * @generated from enum value: TAX_RATE_STATUS_VOIDED = 4;
     */
    VOIDED = 4
}
/**
 * Describes the enum domain.tax.v1.TaxRateStatus.
 */
export declare const TaxRateStatusSchema: GenEnum<TaxRateStatus>;
/**
 * @generated from service domain.tax.v1.TaxRateDomainService
 */
export declare const TaxRateDomainService: GenService<{
    /**
     * @generated from rpc domain.tax.v1.TaxRateDomainService.ReadTaxRate
     */
    readTaxRate: {
        methodKind: "unary";
        input: typeof ReadTaxRateRequestSchema;
        output: typeof ReadTaxRateResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRateDomainService.ListTaxRates
     */
    listTaxRates: {
        methodKind: "unary";
        input: typeof ListTaxRatesRequestSchema;
        output: typeof ListTaxRatesResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRateDomainService.GetTaxRateListPageData
     */
    getTaxRateListPageData: {
        methodKind: "unary";
        input: typeof GetTaxRateListPageDataRequestSchema;
        output: typeof GetTaxRateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRateDomainService.GetTaxRateItemPageData
     */
    getTaxRateItemPageData: {
        methodKind: "unary";
        input: typeof GetTaxRateItemPageDataRequestSchema;
        output: typeof GetTaxRateItemPageDataResponseSchema;
    };
}>;
