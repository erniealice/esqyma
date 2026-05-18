import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tax/tax_treatment/tax_treatment.proto.
 */
export declare const file_domain_tax_tax_treatment_tax_treatment: GenFile;
/**
 * TaxTreatment — jurisdiction-agnostic taxability category for a product.
 * The same STANDARD code resolves to 12% in PH, 20% in UK, 19% in DE, etc.
 * Rows are seed-only (no operator CRUD in v1).
 *
 * @generated from message domain.tax.v1.TaxTreatment
 */
export type TaxTreatment = Message<"domain.tax.v1.TaxTreatment"> & {
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
     * Short unique code: STANDARD, REDUCED, ZERO_RATED, EXEMPT, OUT_OF_SCOPE
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
};
/**
 * Describes the message domain.tax.v1.TaxTreatment.
 * Use `create(TaxTreatmentSchema)` to create a new message.
 */
export declare const TaxTreatmentSchema: GenMessage<TaxTreatment>;
/**
 * @generated from message domain.tax.v1.ReadTaxTreatmentRequest
 */
export type ReadTaxTreatmentRequest = Message<"domain.tax.v1.ReadTaxTreatmentRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxTreatment data = 1;
     */
    data?: TaxTreatment;
};
/**
 * Describes the message domain.tax.v1.ReadTaxTreatmentRequest.
 * Use `create(ReadTaxTreatmentRequestSchema)` to create a new message.
 */
export declare const ReadTaxTreatmentRequestSchema: GenMessage<ReadTaxTreatmentRequest>;
/**
 * @generated from message domain.tax.v1.ReadTaxTreatmentResponse
 */
export type ReadTaxTreatmentResponse = Message<"domain.tax.v1.ReadTaxTreatmentResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxTreatment data = 1;
     */
    data: TaxTreatment[];
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
 * Describes the message domain.tax.v1.ReadTaxTreatmentResponse.
 * Use `create(ReadTaxTreatmentResponseSchema)` to create a new message.
 */
export declare const ReadTaxTreatmentResponseSchema: GenMessage<ReadTaxTreatmentResponse>;
/**
 * @generated from message domain.tax.v1.ListTaxTreatmentsRequest
 */
export type ListTaxTreatmentsRequest = Message<"domain.tax.v1.ListTaxTreatmentsRequest"> & {
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
 * Describes the message domain.tax.v1.ListTaxTreatmentsRequest.
 * Use `create(ListTaxTreatmentsRequestSchema)` to create a new message.
 */
export declare const ListTaxTreatmentsRequestSchema: GenMessage<ListTaxTreatmentsRequest>;
/**
 * @generated from message domain.tax.v1.ListTaxTreatmentsResponse
 */
export type ListTaxTreatmentsResponse = Message<"domain.tax.v1.ListTaxTreatmentsResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxTreatment data = 1;
     */
    data: TaxTreatment[];
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
 * Describes the message domain.tax.v1.ListTaxTreatmentsResponse.
 * Use `create(ListTaxTreatmentsResponseSchema)` to create a new message.
 */
export declare const ListTaxTreatmentsResponseSchema: GenMessage<ListTaxTreatmentsResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxTreatmentListPageDataRequest
 */
export type GetTaxTreatmentListPageDataRequest = Message<"domain.tax.v1.GetTaxTreatmentListPageDataRequest"> & {
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
 * Describes the message domain.tax.v1.GetTaxTreatmentListPageDataRequest.
 * Use `create(GetTaxTreatmentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxTreatmentListPageDataRequestSchema: GenMessage<GetTaxTreatmentListPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxTreatmentListPageDataResponse
 */
export type GetTaxTreatmentListPageDataResponse = Message<"domain.tax.v1.GetTaxTreatmentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxTreatment tax_treatment_list = 1;
     */
    taxTreatmentList: TaxTreatment[];
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
 * Describes the message domain.tax.v1.GetTaxTreatmentListPageDataResponse.
 * Use `create(GetTaxTreatmentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxTreatmentListPageDataResponseSchema: GenMessage<GetTaxTreatmentListPageDataResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxTreatmentItemPageDataRequest
 */
export type GetTaxTreatmentItemPageDataRequest = Message<"domain.tax.v1.GetTaxTreatmentItemPageDataRequest"> & {
    /**
     * @generated from field: string tax_treatment_id = 1;
     */
    taxTreatmentId: string;
};
/**
 * Describes the message domain.tax.v1.GetTaxTreatmentItemPageDataRequest.
 * Use `create(GetTaxTreatmentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxTreatmentItemPageDataRequestSchema: GenMessage<GetTaxTreatmentItemPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxTreatmentItemPageDataResponse
 */
export type GetTaxTreatmentItemPageDataResponse = Message<"domain.tax.v1.GetTaxTreatmentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tax.v1.TaxTreatment tax_treatment = 1;
     */
    taxTreatment?: TaxTreatment;
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
 * Describes the message domain.tax.v1.GetTaxTreatmentItemPageDataResponse.
 * Use `create(GetTaxTreatmentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxTreatmentItemPageDataResponseSchema: GenMessage<GetTaxTreatmentItemPageDataResponse>;
/**
 * @generated from service domain.tax.v1.TaxTreatmentDomainService
 */
export declare const TaxTreatmentDomainService: GenService<{
    /**
     * @generated from rpc domain.tax.v1.TaxTreatmentDomainService.ReadTaxTreatment
     */
    readTaxTreatment: {
        methodKind: "unary";
        input: typeof ReadTaxTreatmentRequestSchema;
        output: typeof ReadTaxTreatmentResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxTreatmentDomainService.ListTaxTreatments
     */
    listTaxTreatments: {
        methodKind: "unary";
        input: typeof ListTaxTreatmentsRequestSchema;
        output: typeof ListTaxTreatmentsResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxTreatmentDomainService.GetTaxTreatmentListPageData
     */
    getTaxTreatmentListPageData: {
        methodKind: "unary";
        input: typeof GetTaxTreatmentListPageDataRequestSchema;
        output: typeof GetTaxTreatmentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxTreatmentDomainService.GetTaxTreatmentItemPageData
     */
    getTaxTreatmentItemPageData: {
        methodKind: "unary";
        input: typeof GetTaxTreatmentItemPageDataRequestSchema;
        output: typeof GetTaxTreatmentItemPageDataResponseSchema;
    };
}>;
