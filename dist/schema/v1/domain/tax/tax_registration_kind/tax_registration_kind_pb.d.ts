import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tax/tax_registration_kind/tax_registration_kind.proto.
 */
export declare const file_domain_tax_tax_registration_kind_tax_registration_kind: GenFile;
/**
 * TaxRegistrationKind is a lookup table describing the behavior of a
 * registration type in a given jurisdiction. Rows are seed-only (no operator
 * CRUD in v1). Adding a new jurisdiction = adding a CSV row.
 *
 * @generated from message domain.tax.v1.TaxRegistrationKind
 */
export type TaxRegistrationKind = Message<"domain.tax.v1.TaxRegistrationKind"> & {
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
     * Short unique code identifying this kind (e.g. "PH_VAT_REGISTERED", "PH_TWA")
     *
     * @generated from field: string code = 7;
     */
    code: string;
    /**
     * @generated from field: string name = 8;
     */
    name: string;
    /**
     * FK to tax_authority — which authority issues this registration
     *
     * @generated from field: string tax_authority_id = 9;
     */
    taxAuthorityId: string;
    /**
     * Jurisdiction scope this kind applies to (e.g. "PH-NATIONAL", "UK")
     *
     * @generated from field: string jurisdiction = 10;
     */
    jurisdiction: string;
    /**
     * Axis 1: which party role does this apply to?
     *
     * @generated from field: domain.tax.v1.TaxRegistrationKindPartyRole party_role = 11;
     */
    partyRole: TaxRegistrationKindPartyRole;
    /**
     * Axis 2: what compute behavior does this produce?
     *
     * @generated from field: domain.tax.v1.TaxRegistrationKindComputePath compute_path = 12;
     */
    computePath: TaxRegistrationKindComputePath;
    /**
     * Kind of tax rate to look up in tax_rate for the SURCHARGE pass.
     * NULL for WITHHOLDING/PERIODIC_ONLY/NONE kinds (rate comes from TaxClass).
     *
     * @generated from field: optional string default_rate_kind = 13;
     */
    defaultRateKind?: string;
    /**
     * Which party types can hold a registration of this kind.
     * Stored as TEXT[] in the DB. Drives the Kind dropdown filter.
     *
     * @generated from field: repeated domain.tax.v1.TaxRegistrationKindPartyType applicable_party_types = 14;
     */
    applicablePartyTypes: TaxRegistrationKindPartyType[];
    /**
     * @generated from field: optional string description = 15;
     */
    description?: string;
};
/**
 * Describes the message domain.tax.v1.TaxRegistrationKind.
 * Use `create(TaxRegistrationKindSchema)` to create a new message.
 */
export declare const TaxRegistrationKindSchema: GenMessage<TaxRegistrationKind>;
/**
 * @generated from message domain.tax.v1.ReadTaxRegistrationKindRequest
 */
export type ReadTaxRegistrationKindRequest = Message<"domain.tax.v1.ReadTaxRegistrationKindRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxRegistrationKind data = 1;
     */
    data?: TaxRegistrationKind;
};
/**
 * Describes the message domain.tax.v1.ReadTaxRegistrationKindRequest.
 * Use `create(ReadTaxRegistrationKindRequestSchema)` to create a new message.
 */
export declare const ReadTaxRegistrationKindRequestSchema: GenMessage<ReadTaxRegistrationKindRequest>;
/**
 * @generated from message domain.tax.v1.ReadTaxRegistrationKindResponse
 */
export type ReadTaxRegistrationKindResponse = Message<"domain.tax.v1.ReadTaxRegistrationKindResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistrationKind data = 1;
     */
    data: TaxRegistrationKind[];
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
 * Describes the message domain.tax.v1.ReadTaxRegistrationKindResponse.
 * Use `create(ReadTaxRegistrationKindResponseSchema)` to create a new message.
 */
export declare const ReadTaxRegistrationKindResponseSchema: GenMessage<ReadTaxRegistrationKindResponse>;
/**
 * @generated from message domain.tax.v1.ListTaxRegistrationKindsRequest
 */
export type ListTaxRegistrationKindsRequest = Message<"domain.tax.v1.ListTaxRegistrationKindsRequest"> & {
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
 * Describes the message domain.tax.v1.ListTaxRegistrationKindsRequest.
 * Use `create(ListTaxRegistrationKindsRequestSchema)` to create a new message.
 */
export declare const ListTaxRegistrationKindsRequestSchema: GenMessage<ListTaxRegistrationKindsRequest>;
/**
 * @generated from message domain.tax.v1.ListTaxRegistrationKindsResponse
 */
export type ListTaxRegistrationKindsResponse = Message<"domain.tax.v1.ListTaxRegistrationKindsResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistrationKind data = 1;
     */
    data: TaxRegistrationKind[];
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
 * Describes the message domain.tax.v1.ListTaxRegistrationKindsResponse.
 * Use `create(ListTaxRegistrationKindsResponseSchema)` to create a new message.
 */
export declare const ListTaxRegistrationKindsResponseSchema: GenMessage<ListTaxRegistrationKindsResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationKindListPageDataRequest
 */
export type GetTaxRegistrationKindListPageDataRequest = Message<"domain.tax.v1.GetTaxRegistrationKindListPageDataRequest"> & {
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
 * Describes the message domain.tax.v1.GetTaxRegistrationKindListPageDataRequest.
 * Use `create(GetTaxRegistrationKindListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxRegistrationKindListPageDataRequestSchema: GenMessage<GetTaxRegistrationKindListPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationKindListPageDataResponse
 */
export type GetTaxRegistrationKindListPageDataResponse = Message<"domain.tax.v1.GetTaxRegistrationKindListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistrationKind tax_registration_kind_list = 1;
     */
    taxRegistrationKindList: TaxRegistrationKind[];
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
 * Describes the message domain.tax.v1.GetTaxRegistrationKindListPageDataResponse.
 * Use `create(GetTaxRegistrationKindListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxRegistrationKindListPageDataResponseSchema: GenMessage<GetTaxRegistrationKindListPageDataResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationKindItemPageDataRequest
 */
export type GetTaxRegistrationKindItemPageDataRequest = Message<"domain.tax.v1.GetTaxRegistrationKindItemPageDataRequest"> & {
    /**
     * @generated from field: string tax_registration_kind_id = 1;
     */
    taxRegistrationKindId: string;
};
/**
 * Describes the message domain.tax.v1.GetTaxRegistrationKindItemPageDataRequest.
 * Use `create(GetTaxRegistrationKindItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxRegistrationKindItemPageDataRequestSchema: GenMessage<GetTaxRegistrationKindItemPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationKindItemPageDataResponse
 */
export type GetTaxRegistrationKindItemPageDataResponse = Message<"domain.tax.v1.GetTaxRegistrationKindItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tax.v1.TaxRegistrationKind tax_registration_kind = 1;
     */
    taxRegistrationKind?: TaxRegistrationKind;
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
 * Describes the message domain.tax.v1.GetTaxRegistrationKindItemPageDataResponse.
 * Use `create(GetTaxRegistrationKindItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxRegistrationKindItemPageDataResponseSchema: GenMessage<GetTaxRegistrationKindItemPageDataResponse>;
/**
 * PartyRole describes whether this registration kind belongs to the seller
 * (workspace / supplier) or the buyer (client). Compute gates on this.
 *
 * @generated from enum domain.tax.v1.TaxRegistrationKindPartyRole
 */
export declare enum TaxRegistrationKindPartyRole {
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_ROLE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_ROLE_SELLER = 1;
     */
    SELLER = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_ROLE_BUYER = 2;
     */
    BUYER = 2
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationKindPartyRole.
 */
export declare const TaxRegistrationKindPartyRoleSchema: GenEnum<TaxRegistrationKindPartyRole>;
/**
 * ComputePath describes what happens at revenue-recognition time when a party
 * holds an ACTIVE registration of this kind.
 *   SURCHARGE      → adds a tax line on the invoice (increases cash_amount_expected)
 *   WITHHOLDING    → deducts a tax line (decreases cash_amount_expected)
 *   PERIODIC_ONLY  → filed on a periodic basis; does NOT produce a RevenueTaxLine
 *   NONE           → recorded for audit/status only; no compute effect
 *
 * @generated from enum domain.tax.v1.TaxRegistrationKindComputePath
 */
export declare enum TaxRegistrationKindComputePath {
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_COMPUTE_PATH_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_COMPUTE_PATH_SURCHARGE = 1;
     */
    SURCHARGE = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_COMPUTE_PATH_WITHHOLDING = 2;
     */
    WITHHOLDING = 2,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_COMPUTE_PATH_PERIODIC_ONLY = 3;
     */
    PERIODIC_ONLY = 3,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_COMPUTE_PATH_NONE = 4;
     */
    NONE = 4
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationKindComputePath.
 */
export declare const TaxRegistrationKindComputePathSchema: GenEnum<TaxRegistrationKindComputePath>;
/**
 * PartyType is the set of entity types a registration kind can be applied to.
 * Used to filter the Kind dropdown when creating a TaxRegistration.
 *
 * @generated from enum domain.tax.v1.TaxRegistrationKindPartyType
 */
export declare enum TaxRegistrationKindPartyType {
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_TYPE_CLIENT = 1;
     */
    CLIENT = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_TYPE_WORKSPACE = 2;
     */
    WORKSPACE = 2,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_TYPE_SUPPLIER = 3;
     */
    SUPPLIER = 3,
    /**
     * @generated from enum value: TAX_REGISTRATION_KIND_PARTY_TYPE_EMPLOYEE = 4;
     */
    EMPLOYEE = 4
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationKindPartyType.
 */
export declare const TaxRegistrationKindPartyTypeSchema: GenEnum<TaxRegistrationKindPartyType>;
/**
 * @generated from service domain.tax.v1.TaxRegistrationKindDomainService
 */
export declare const TaxRegistrationKindDomainService: GenService<{
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationKindDomainService.ReadTaxRegistrationKind
     */
    readTaxRegistrationKind: {
        methodKind: "unary";
        input: typeof ReadTaxRegistrationKindRequestSchema;
        output: typeof ReadTaxRegistrationKindResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationKindDomainService.ListTaxRegistrationKinds
     */
    listTaxRegistrationKinds: {
        methodKind: "unary";
        input: typeof ListTaxRegistrationKindsRequestSchema;
        output: typeof ListTaxRegistrationKindsResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationKindDomainService.GetTaxRegistrationKindListPageData
     */
    getTaxRegistrationKindListPageData: {
        methodKind: "unary";
        input: typeof GetTaxRegistrationKindListPageDataRequestSchema;
        output: typeof GetTaxRegistrationKindListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationKindDomainService.GetTaxRegistrationKindItemPageData
     */
    getTaxRegistrationKindItemPageData: {
        methodKind: "unary";
        input: typeof GetTaxRegistrationKindItemPageDataRequestSchema;
        output: typeof GetTaxRegistrationKindItemPageDataResponseSchema;
    };
}>;
