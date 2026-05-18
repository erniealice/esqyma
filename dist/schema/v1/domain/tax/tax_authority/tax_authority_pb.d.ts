import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tax/tax_authority/tax_authority.proto.
 */
export declare const file_domain_tax_tax_authority_tax_authority: GenFile;
/**
 * @generated from message domain.tax.v1.TaxAuthority
 */
export type TaxAuthority = Message<"domain.tax.v1.TaxAuthority"> & {
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
     * Short unique code used in rate lookups (e.g. "BIR", "HMRC", "IRS")
     *
     * @generated from field: string code = 7;
     */
    code: string;
    /**
     * @generated from field: string name = 8;
     */
    name: string;
    /**
     * ISO 3166-1 alpha-2 country code (e.g. "PH", "GB", "US")
     *
     * @generated from field: string country_code = 9;
     */
    countryCode: string;
    /**
     * Jurisdiction scope this authority governs (e.g. "PH-NATIONAL", "UK", "US-CA")
     *
     * @generated from field: string jurisdiction = 10;
     */
    jurisdiction: string;
};
/**
 * Describes the message domain.tax.v1.TaxAuthority.
 * Use `create(TaxAuthoritySchema)` to create a new message.
 */
export declare const TaxAuthoritySchema: GenMessage<TaxAuthority>;
/**
 * @generated from message domain.tax.v1.ReadTaxAuthorityRequest
 */
export type ReadTaxAuthorityRequest = Message<"domain.tax.v1.ReadTaxAuthorityRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxAuthority data = 1;
     */
    data?: TaxAuthority;
};
/**
 * Describes the message domain.tax.v1.ReadTaxAuthorityRequest.
 * Use `create(ReadTaxAuthorityRequestSchema)` to create a new message.
 */
export declare const ReadTaxAuthorityRequestSchema: GenMessage<ReadTaxAuthorityRequest>;
/**
 * @generated from message domain.tax.v1.ReadTaxAuthorityResponse
 */
export type ReadTaxAuthorityResponse = Message<"domain.tax.v1.ReadTaxAuthorityResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxAuthority data = 1;
     */
    data: TaxAuthority[];
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
 * Describes the message domain.tax.v1.ReadTaxAuthorityResponse.
 * Use `create(ReadTaxAuthorityResponseSchema)` to create a new message.
 */
export declare const ReadTaxAuthorityResponseSchema: GenMessage<ReadTaxAuthorityResponse>;
/**
 * @generated from message domain.tax.v1.ListTaxAuthoritiesRequest
 */
export type ListTaxAuthoritiesRequest = Message<"domain.tax.v1.ListTaxAuthoritiesRequest"> & {
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
 * Describes the message domain.tax.v1.ListTaxAuthoritiesRequest.
 * Use `create(ListTaxAuthoritiesRequestSchema)` to create a new message.
 */
export declare const ListTaxAuthoritiesRequestSchema: GenMessage<ListTaxAuthoritiesRequest>;
/**
 * @generated from message domain.tax.v1.ListTaxAuthoritiesResponse
 */
export type ListTaxAuthoritiesResponse = Message<"domain.tax.v1.ListTaxAuthoritiesResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxAuthority data = 1;
     */
    data: TaxAuthority[];
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
 * Describes the message domain.tax.v1.ListTaxAuthoritiesResponse.
 * Use `create(ListTaxAuthoritiesResponseSchema)` to create a new message.
 */
export declare const ListTaxAuthoritiesResponseSchema: GenMessage<ListTaxAuthoritiesResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxAuthorityListPageDataRequest
 */
export type GetTaxAuthorityListPageDataRequest = Message<"domain.tax.v1.GetTaxAuthorityListPageDataRequest"> & {
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
 * Describes the message domain.tax.v1.GetTaxAuthorityListPageDataRequest.
 * Use `create(GetTaxAuthorityListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxAuthorityListPageDataRequestSchema: GenMessage<GetTaxAuthorityListPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxAuthorityListPageDataResponse
 */
export type GetTaxAuthorityListPageDataResponse = Message<"domain.tax.v1.GetTaxAuthorityListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxAuthority tax_authority_list = 1;
     */
    taxAuthorityList: TaxAuthority[];
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
 * Describes the message domain.tax.v1.GetTaxAuthorityListPageDataResponse.
 * Use `create(GetTaxAuthorityListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxAuthorityListPageDataResponseSchema: GenMessage<GetTaxAuthorityListPageDataResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxAuthorityItemPageDataRequest
 */
export type GetTaxAuthorityItemPageDataRequest = Message<"domain.tax.v1.GetTaxAuthorityItemPageDataRequest"> & {
    /**
     * @generated from field: string tax_authority_id = 1;
     */
    taxAuthorityId: string;
};
/**
 * Describes the message domain.tax.v1.GetTaxAuthorityItemPageDataRequest.
 * Use `create(GetTaxAuthorityItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxAuthorityItemPageDataRequestSchema: GenMessage<GetTaxAuthorityItemPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxAuthorityItemPageDataResponse
 */
export type GetTaxAuthorityItemPageDataResponse = Message<"domain.tax.v1.GetTaxAuthorityItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tax.v1.TaxAuthority tax_authority = 1;
     */
    taxAuthority?: TaxAuthority;
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
 * Describes the message domain.tax.v1.GetTaxAuthorityItemPageDataResponse.
 * Use `create(GetTaxAuthorityItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxAuthorityItemPageDataResponseSchema: GenMessage<GetTaxAuthorityItemPageDataResponse>;
/**
 * @generated from service domain.tax.v1.TaxAuthorityDomainService
 */
export declare const TaxAuthorityDomainService: GenService<{
    /**
     * @generated from rpc domain.tax.v1.TaxAuthorityDomainService.ReadTaxAuthority
     */
    readTaxAuthority: {
        methodKind: "unary";
        input: typeof ReadTaxAuthorityRequestSchema;
        output: typeof ReadTaxAuthorityResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxAuthorityDomainService.ListTaxAuthorities
     */
    listTaxAuthorities: {
        methodKind: "unary";
        input: typeof ListTaxAuthoritiesRequestSchema;
        output: typeof ListTaxAuthoritiesResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxAuthorityDomainService.GetTaxAuthorityListPageData
     */
    getTaxAuthorityListPageData: {
        methodKind: "unary";
        input: typeof GetTaxAuthorityListPageDataRequestSchema;
        output: typeof GetTaxAuthorityListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxAuthorityDomainService.GetTaxAuthorityItemPageData
     */
    getTaxAuthorityItemPageData: {
        methodKind: "unary";
        input: typeof GetTaxAuthorityItemPageDataRequestSchema;
        output: typeof GetTaxAuthorityItemPageDataResponseSchema;
    };
}>;
