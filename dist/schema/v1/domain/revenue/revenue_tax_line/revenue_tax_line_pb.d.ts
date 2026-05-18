import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue_tax_line/revenue_tax_line.proto.
 */
export declare const file_domain_revenue_revenue_tax_line_revenue_tax_line: GenFile;
/**
 * RevenueTaxLine — system-generated tax computation output for a Revenue.
 * One RevenueTaxLine per (direction, tax_rate) combination per Revenue.
 * Idempotency: on recompute, DELETE WHERE revenue_id then re-INSERT all.
 *
 * ON DELETE CASCADE from revenue — deleting a Revenue removes its tax lines.
 *
 * @generated from message domain.revenue.v1.RevenueTaxLine
 */
export type RevenueTaxLine = Message<"domain.revenue.v1.RevenueTaxLine"> & {
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
     * Parent revenue — indexed; ON DELETE CASCADE in schema
     *
     * @generated from field: string revenue_id = 8;
     */
    revenueId: string;
    /**
     * FK to the tax_rate row that produced this line (NULL if rate was ad-hoc / override)
     *
     * @generated from field: optional string tax_rate_id = 9;
     */
    taxRateId?: string;
    /**
     * Audit FK — the TaxRegistration row active at asOf that triggered this pass.
     * Immutable snapshot: even if the registration is later CANCELLED or VOIDED,
     * this FK still resolves for auditor queries.
     *
     * @generated from field: string source_registration_id_snapshot = 10;
     */
    sourceRegistrationIdSnapshot: string;
    /**
     * Denormed snapshots from tax_rate at compute time (for display + audit without joins)
     *
     * @generated from field: string authority_code_snapshot = 11;
     */
    authorityCodeSnapshot: string;
    /**
     * @generated from field: optional string regulator_code_snapshot = 12;
     */
    regulatorCodeSnapshot?: string;
    /**
     * @generated from field: optional string filing_form_code_snapshot = 13;
     */
    filingFormCodeSnapshot?: string;
    /**
     * @generated from field: string tax_kind_snapshot = 14;
     */
    taxKindSnapshot: string;
    /**
     * SURCHARGE or WITHHOLDING
     *
     * @generated from field: domain.revenue.v1.RevenueTaxLineDirection direction = 15;
     */
    direction: RevenueTaxLineDirection;
    /**
     * Base amount on which the rate was applied (centavos, functional currency)
     *
     * @generated from field: int64 taxable_base = 16;
     */
    taxableBase: bigint;
    /**
     * Computed tax amount (centavos, functional currency)
     * 0 for ZERO_RATED surcharge lines (audit trail still written)
     *
     * @generated from field: int64 tax_amount = 17;
     */
    taxAmount: bigint;
    /**
     * Rate in basis points as used at compute time (snapshot from tax_rate)
     *
     * @generated from field: int32 rate_basis_points_snapshot = 18;
     */
    rateBasisPointsSnapshot: number;
    /**
     * IDs of the RevenueLineItem rows that contributed to this tax line.
     * Stored as TEXT[] in PostgreSQL. Maps back to line-level detail.
     *
     * @generated from field: repeated string applied_to_line_item_ids = 19;
     */
    appliedToLineItemIds: string[];
    /**
     * Timestamp when this tax line was computed (ISO 8601 or unix millis)
     *
     * @generated from field: optional string computed_at = 20;
     */
    computedAt?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueTaxLine.
 * Use `create(RevenueTaxLineSchema)` to create a new message.
 */
export declare const RevenueTaxLineSchema: GenMessage<RevenueTaxLine>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueTaxLineRequest
 */
export type ReadRevenueTaxLineRequest = Message<"domain.revenue.v1.ReadRevenueTaxLineRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueTaxLine data = 1;
     */
    data?: RevenueTaxLine;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenueTaxLineRequest.
 * Use `create(ReadRevenueTaxLineRequestSchema)` to create a new message.
 */
export declare const ReadRevenueTaxLineRequestSchema: GenMessage<ReadRevenueTaxLineRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueTaxLineResponse
 */
export type ReadRevenueTaxLineResponse = Message<"domain.revenue.v1.ReadRevenueTaxLineResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueTaxLine data = 1;
     */
    data: RevenueTaxLine[];
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
 * Describes the message domain.revenue.v1.ReadRevenueTaxLineResponse.
 * Use `create(ReadRevenueTaxLineResponseSchema)` to create a new message.
 */
export declare const ReadRevenueTaxLineResponseSchema: GenMessage<ReadRevenueTaxLineResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenueTaxLinesRequest
 */
export type ListRevenueTaxLinesRequest = Message<"domain.revenue.v1.ListRevenueTaxLinesRequest"> & {
    /**
     * @generated from field: optional string revenue_id = 1;
     */
    revenueId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 2;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.revenue.v1.ListRevenueTaxLinesRequest.
 * Use `create(ListRevenueTaxLinesRequestSchema)` to create a new message.
 */
export declare const ListRevenueTaxLinesRequestSchema: GenMessage<ListRevenueTaxLinesRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueTaxLinesResponse
 */
export type ListRevenueTaxLinesResponse = Message<"domain.revenue.v1.ListRevenueTaxLinesResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueTaxLine data = 1;
     */
    data: RevenueTaxLine[];
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
 * Describes the message domain.revenue.v1.ListRevenueTaxLinesResponse.
 * Use `create(ListRevenueTaxLinesResponseSchema)` to create a new message.
 */
export declare const ListRevenueTaxLinesResponseSchema: GenMessage<ListRevenueTaxLinesResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueTaxLineListPageDataRequest
 */
export type GetRevenueTaxLineListPageDataRequest = Message<"domain.revenue.v1.GetRevenueTaxLineListPageDataRequest"> & {
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
 * Describes the message domain.revenue.v1.GetRevenueTaxLineListPageDataRequest.
 * Use `create(GetRevenueTaxLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueTaxLineListPageDataRequestSchema: GenMessage<GetRevenueTaxLineListPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueTaxLineListPageDataResponse
 */
export type GetRevenueTaxLineListPageDataResponse = Message<"domain.revenue.v1.GetRevenueTaxLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueTaxLine revenue_tax_line_list = 1;
     */
    revenueTaxLineList: RevenueTaxLine[];
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
 * Describes the message domain.revenue.v1.GetRevenueTaxLineListPageDataResponse.
 * Use `create(GetRevenueTaxLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueTaxLineListPageDataResponseSchema: GenMessage<GetRevenueTaxLineListPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueTaxLineItemPageDataRequest
 */
export type GetRevenueTaxLineItemPageDataRequest = Message<"domain.revenue.v1.GetRevenueTaxLineItemPageDataRequest"> & {
    /**
     * @generated from field: string revenue_tax_line_id = 1;
     */
    revenueTaxLineId: string;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueTaxLineItemPageDataRequest.
 * Use `create(GetRevenueTaxLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueTaxLineItemPageDataRequestSchema: GenMessage<GetRevenueTaxLineItemPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueTaxLineItemPageDataResponse
 */
export type GetRevenueTaxLineItemPageDataResponse = Message<"domain.revenue.v1.GetRevenueTaxLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.revenue.v1.RevenueTaxLine revenue_tax_line = 1;
     */
    revenueTaxLine?: RevenueTaxLine;
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
 * Describes the message domain.revenue.v1.GetRevenueTaxLineItemPageDataResponse.
 * Use `create(GetRevenueTaxLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueTaxLineItemPageDataResponseSchema: GenMessage<GetRevenueTaxLineItemPageDataResponse>;
/**
 * RevenueTaxLineDirection — which compute pass wrote this line.
 *
 * @generated from enum domain.revenue.v1.RevenueTaxLineDirection
 */
export declare enum RevenueTaxLineDirection {
    /**
     * @generated from enum value: REVENUE_TAX_LINE_DIRECTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: REVENUE_TAX_LINE_DIRECTION_SURCHARGE = 1;
     */
    SURCHARGE = 1,
    /**
     * @generated from enum value: REVENUE_TAX_LINE_DIRECTION_WITHHOLDING = 2;
     */
    WITHHOLDING = 2
}
/**
 * Describes the enum domain.revenue.v1.RevenueTaxLineDirection.
 */
export declare const RevenueTaxLineDirectionSchema: GenEnum<RevenueTaxLineDirection>;
/**
 * @generated from service domain.revenue.v1.RevenueTaxLineDomainService
 */
export declare const RevenueTaxLineDomainService: GenService<{
    /**
     * @generated from rpc domain.revenue.v1.RevenueTaxLineDomainService.ReadRevenueTaxLine
     */
    readRevenueTaxLine: {
        methodKind: "unary";
        input: typeof ReadRevenueTaxLineRequestSchema;
        output: typeof ReadRevenueTaxLineResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueTaxLineDomainService.ListRevenueTaxLines
     */
    listRevenueTaxLines: {
        methodKind: "unary";
        input: typeof ListRevenueTaxLinesRequestSchema;
        output: typeof ListRevenueTaxLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueTaxLineDomainService.GetRevenueTaxLineListPageData
     */
    getRevenueTaxLineListPageData: {
        methodKind: "unary";
        input: typeof GetRevenueTaxLineListPageDataRequestSchema;
        output: typeof GetRevenueTaxLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueTaxLineDomainService.GetRevenueTaxLineItemPageData
     */
    getRevenueTaxLineItemPageData: {
        methodKind: "unary";
        input: typeof GetRevenueTaxLineItemPageDataRequestSchema;
        output: typeof GetRevenueTaxLineItemPageDataResponseSchema;
    };
}>;
