import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tax/tax_class/tax_class.proto.
 */
export declare const file_domain_tax_tax_class_tax_class: GenFile;
/**
 * TaxClass — lookup table for withholding categories (and future output tax
 * classes). Each class points to a default rate kind and optionally requires a
 * specific counterparty role to fire (e.g. PH TWA buyer designation).
 * Rows are seed-only (no operator CRUD in v1).
 *
 * @generated from message domain.tax.v1.TaxClass
 */
export type TaxClass = Message<"domain.tax.v1.TaxClass"> & {
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
     * Short unique code (e.g. "PROFESSIONAL_CORPORATE", "RENTAL")
     *
     * @generated from field: string code = 7;
     */
    code: string;
    /**
     * @generated from field: string name = 8;
     */
    name: string;
    /**
     * @generated from field: optional string description = 9;
     */
    description?: string;
    /**
     * Direction of the tax line this class produces (WITHHOLDING in v1)
     *
     * @generated from field: domain.tax.v1.TaxClassDirection direction = 10;
     */
    direction: TaxClassDirection;
    /**
     * FK to tax_authority that governs this class
     *
     * @generated from field: string tax_authority_id = 11;
     */
    taxAuthorityId: string;
    /**
     * BIR/regulator ATC code (e.g. "WC011") — used in withholding certificate
     *
     * @generated from field: optional string regulator_code = 12;
     */
    regulatorCode?: string;
    /**
     * The kind of rate to look up in tax_rate for WITHHOLDING compute
     * (e.g. "WHT_PROFESSIONAL_CORPORATE")
     *
     * @generated from field: optional string default_rate_kind = 13;
     */
    defaultRateKind?: string;
    /**
     * When set, the WITHHOLDING pass only fires for lines where the client
     * has an ACTIVE registration with this party_role (e.g. BUYER for PH TWA).
     * NULL = no counterparty requirement.
     *
     * @generated from field: optional domain.tax.v1.TaxClassCounterpartyRole requires_counterparty_role = 14;
     */
    requiresCounterpartyRole?: TaxClassCounterpartyRole;
    /**
     * Jurisdiction scope (e.g. "PH-NATIONAL")
     *
     * @generated from field: optional string jurisdiction = 15;
     */
    jurisdiction?: string;
    /**
     * Optional: type of recipient/payment subject (e.g. "juridical", "individual")
     *
     * @generated from field: optional string recipient_type = 16;
     */
    recipientType?: string;
    /**
     * Threshold rules for rate switching (v2 / future)
     *
     * centavos
     *
     * @generated from field: optional int64 threshold_amount = 17;
     */
    thresholdAmount?: bigint;
    /**
     * "ANNUAL", "QUARTERLY"
     *
     * @generated from field: optional string threshold_period = 18;
     */
    thresholdPeriod?: string;
    /**
     * @generated from field: optional string rate_kind_above_threshold = 19;
     */
    rateKindAboveThreshold?: string;
};
/**
 * Describes the message domain.tax.v1.TaxClass.
 * Use `create(TaxClassSchema)` to create a new message.
 */
export declare const TaxClassSchema: GenMessage<TaxClass>;
/**
 * @generated from message domain.tax.v1.ReadTaxClassRequest
 */
export type ReadTaxClassRequest = Message<"domain.tax.v1.ReadTaxClassRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxClass data = 1;
     */
    data?: TaxClass;
};
/**
 * Describes the message domain.tax.v1.ReadTaxClassRequest.
 * Use `create(ReadTaxClassRequestSchema)` to create a new message.
 */
export declare const ReadTaxClassRequestSchema: GenMessage<ReadTaxClassRequest>;
/**
 * @generated from message domain.tax.v1.ReadTaxClassResponse
 */
export type ReadTaxClassResponse = Message<"domain.tax.v1.ReadTaxClassResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxClass data = 1;
     */
    data: TaxClass[];
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
 * Describes the message domain.tax.v1.ReadTaxClassResponse.
 * Use `create(ReadTaxClassResponseSchema)` to create a new message.
 */
export declare const ReadTaxClassResponseSchema: GenMessage<ReadTaxClassResponse>;
/**
 * @generated from message domain.tax.v1.ListTaxClassesRequest
 */
export type ListTaxClassesRequest = Message<"domain.tax.v1.ListTaxClassesRequest"> & {
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
 * Describes the message domain.tax.v1.ListTaxClassesRequest.
 * Use `create(ListTaxClassesRequestSchema)` to create a new message.
 */
export declare const ListTaxClassesRequestSchema: GenMessage<ListTaxClassesRequest>;
/**
 * @generated from message domain.tax.v1.ListTaxClassesResponse
 */
export type ListTaxClassesResponse = Message<"domain.tax.v1.ListTaxClassesResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxClass data = 1;
     */
    data: TaxClass[];
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
 * Describes the message domain.tax.v1.ListTaxClassesResponse.
 * Use `create(ListTaxClassesResponseSchema)` to create a new message.
 */
export declare const ListTaxClassesResponseSchema: GenMessage<ListTaxClassesResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxClassListPageDataRequest
 */
export type GetTaxClassListPageDataRequest = Message<"domain.tax.v1.GetTaxClassListPageDataRequest"> & {
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
 * Describes the message domain.tax.v1.GetTaxClassListPageDataRequest.
 * Use `create(GetTaxClassListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxClassListPageDataRequestSchema: GenMessage<GetTaxClassListPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxClassListPageDataResponse
 */
export type GetTaxClassListPageDataResponse = Message<"domain.tax.v1.GetTaxClassListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxClass tax_class_list = 1;
     */
    taxClassList: TaxClass[];
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
 * Describes the message domain.tax.v1.GetTaxClassListPageDataResponse.
 * Use `create(GetTaxClassListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxClassListPageDataResponseSchema: GenMessage<GetTaxClassListPageDataResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxClassItemPageDataRequest
 */
export type GetTaxClassItemPageDataRequest = Message<"domain.tax.v1.GetTaxClassItemPageDataRequest"> & {
    /**
     * @generated from field: string tax_class_id = 1;
     */
    taxClassId: string;
};
/**
 * Describes the message domain.tax.v1.GetTaxClassItemPageDataRequest.
 * Use `create(GetTaxClassItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxClassItemPageDataRequestSchema: GenMessage<GetTaxClassItemPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxClassItemPageDataResponse
 */
export type GetTaxClassItemPageDataResponse = Message<"domain.tax.v1.GetTaxClassItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tax.v1.TaxClass tax_class = 1;
     */
    taxClass?: TaxClass;
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
 * Describes the message domain.tax.v1.GetTaxClassItemPageDataResponse.
 * Use `create(GetTaxClassItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxClassItemPageDataResponseSchema: GenMessage<GetTaxClassItemPageDataResponse>;
/**
 * TaxClassDirection — what kind of tax line this class produces.
 * v1 ships WITHHOLDING only; OUTPUT/EXCISE/SALES_TAX/DST/GST reserved for v2.
 *
 * @generated from enum domain.tax.v1.TaxClassDirection
 */
export declare enum TaxClassDirection {
    /**
     * @generated from enum value: TAX_CLASS_DIRECTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_CLASS_DIRECTION_WITHHOLDING = 1;
     */
    WITHHOLDING = 1,
    /**
     * v2
     *
     * @generated from enum value: TAX_CLASS_DIRECTION_OUTPUT = 2;
     */
    OUTPUT = 2,
    /**
     * v2
     *
     * @generated from enum value: TAX_CLASS_DIRECTION_EXCISE = 3;
     */
    EXCISE = 3,
    /**
     * v2
     *
     * @generated from enum value: TAX_CLASS_DIRECTION_SALES_TAX = 4;
     */
    SALES_TAX = 4,
    /**
     * v2
     *
     * @generated from enum value: TAX_CLASS_DIRECTION_DST = 5;
     */
    DST = 5,
    /**
     * v2
     *
     * @generated from enum value: TAX_CLASS_DIRECTION_GST = 6;
     */
    GST = 6
}
/**
 * Describes the enum domain.tax.v1.TaxClassDirection.
 */
export declare const TaxClassDirectionSchema: GenEnum<TaxClassDirection>;
/**
 * TaxClassCounterpartyRole — when set on a class, the WITHHOLDING pass only
 * fires if the client (buyer) has an ACTIVE registration with this party_role.
 *
 * @generated from enum domain.tax.v1.TaxClassCounterpartyRole
 */
export declare enum TaxClassCounterpartyRole {
    /**
     * @generated from enum value: TAX_CLASS_COUNTERPARTY_ROLE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_CLASS_COUNTERPARTY_ROLE_BUYER = 1;
     */
    BUYER = 1,
    /**
     * @generated from enum value: TAX_CLASS_COUNTERPARTY_ROLE_SELLER = 2;
     */
    SELLER = 2
}
/**
 * Describes the enum domain.tax.v1.TaxClassCounterpartyRole.
 */
export declare const TaxClassCounterpartyRoleSchema: GenEnum<TaxClassCounterpartyRole>;
/**
 * @generated from service domain.tax.v1.TaxClassDomainService
 */
export declare const TaxClassDomainService: GenService<{
    /**
     * @generated from rpc domain.tax.v1.TaxClassDomainService.ReadTaxClass
     */
    readTaxClass: {
        methodKind: "unary";
        input: typeof ReadTaxClassRequestSchema;
        output: typeof ReadTaxClassResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxClassDomainService.ListTaxClasses
     */
    listTaxClasses: {
        methodKind: "unary";
        input: typeof ListTaxClassesRequestSchema;
        output: typeof ListTaxClassesResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxClassDomainService.GetTaxClassListPageData
     */
    getTaxClassListPageData: {
        methodKind: "unary";
        input: typeof GetTaxClassListPageDataRequestSchema;
        output: typeof GetTaxClassListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxClassDomainService.GetTaxClassItemPageData
     */
    getTaxClassItemPageData: {
        methodKind: "unary";
        input: typeof GetTaxClassItemPageDataRequestSchema;
        output: typeof GetTaxClassItemPageDataResponseSchema;
    };
}>;
