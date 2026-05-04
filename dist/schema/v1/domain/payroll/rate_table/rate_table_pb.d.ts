import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/rate_table/rate_table.proto.
 */
export declare const file_domain_payroll_rate_table_rate_table: GenFile;
/**
 * RateTable is a versioned, jurisdiction-keyed bracket/rate set used by
 * statutory deduction and tax calculators.
 *
 * Q11 decision: `kind` is a controlled-vocab string (not enum) because
 * jurisdictions vary too much: SSS_EMPLOYEE_SHARE, FICA_OASDI, KV_EMPLOYEE,
 * BIR_WITHHOLDING_SEMI_MONTHLY, etc. Linter checks the seed CSV.
 *
 * Lookup is always asOf=PayCycle.pay_date — never now() — so reposting
 * reproduces despite newer rows.
 *
 * @generated from message domain.payroll.v1.RateTable
 */
export type RateTable = Message<"domain.payroll.v1.RateTable"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Empty workspace_id = global default available to all workspaces in the region.
     *
     * @generated from field: optional string workspace_id = 2;
     */
    workspaceId?: string;
    /**
     * Routing
     *
     * "PH" | "US-CA" | ...
     *
     * @generated from field: string compliance_region = 3;
     */
    complianceRegion: string;
    /**
     * controlled vocab
     *
     * @generated from field: string kind = 4;
     */
    kind: string;
    /**
     * Effective dating
     *
     * ISO 8601 date
     *
     * @generated from field: string effective_from = 5;
     */
    effectiveFrom: string;
    /**
     * null = open-ended
     *
     * @generated from field: optional string effective_to = 6;
     */
    effectiveTo?: string;
    /**
     * human-readable e.g. "PH-SSS-2025-01"
     *
     * @generated from field: string version_label = 7;
     */
    versionLabel: string;
    /**
     * FK to a prior RateTable
     *
     * @generated from field: optional string supersedes_id = 8;
     */
    supersedesId?: string;
    /**
     * Provenance
     *
     * "RA 11199" / "TRAIN Law" / "RR 11-2018 Annex E"
     *
     * @generated from field: string source_citation = 9;
     */
    sourceCitation: string;
    /**
     * Lifecycle
     *
     * @generated from field: domain.payroll.v1.RateTableStatus status = 10;
     */
    status: RateTableStatus;
    /**
     * Audit
     *
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.payroll.v1.RateTable.
 * Use `create(RateTableSchema)` to create a new message.
 */
export declare const RateTableSchema: GenMessage<RateTable>;
/**
 * @generated from message domain.payroll.v1.CreateRateTableRequest
 */
export type CreateRateTableRequest = Message<"domain.payroll.v1.CreateRateTableRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateTable data = 1;
     */
    data?: RateTable;
};
/**
 * Describes the message domain.payroll.v1.CreateRateTableRequest.
 * Use `create(CreateRateTableRequestSchema)` to create a new message.
 */
export declare const CreateRateTableRequestSchema: GenMessage<CreateRateTableRequest>;
/**
 * @generated from message domain.payroll.v1.CreateRateTableResponse
 */
export type CreateRateTableResponse = Message<"domain.payroll.v1.CreateRateTableResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateTable data = 1;
     */
    data: RateTable[];
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
 * Describes the message domain.payroll.v1.CreateRateTableResponse.
 * Use `create(CreateRateTableResponseSchema)` to create a new message.
 */
export declare const CreateRateTableResponseSchema: GenMessage<CreateRateTableResponse>;
/**
 * @generated from message domain.payroll.v1.ReadRateTableRequest
 */
export type ReadRateTableRequest = Message<"domain.payroll.v1.ReadRateTableRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateTable data = 1;
     */
    data?: RateTable;
};
/**
 * Describes the message domain.payroll.v1.ReadRateTableRequest.
 * Use `create(ReadRateTableRequestSchema)` to create a new message.
 */
export declare const ReadRateTableRequestSchema: GenMessage<ReadRateTableRequest>;
/**
 * @generated from message domain.payroll.v1.ReadRateTableResponse
 */
export type ReadRateTableResponse = Message<"domain.payroll.v1.ReadRateTableResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateTable data = 1;
     */
    data: RateTable[];
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
 * Describes the message domain.payroll.v1.ReadRateTableResponse.
 * Use `create(ReadRateTableResponseSchema)` to create a new message.
 */
export declare const ReadRateTableResponseSchema: GenMessage<ReadRateTableResponse>;
/**
 * @generated from message domain.payroll.v1.UpdateRateTableRequest
 */
export type UpdateRateTableRequest = Message<"domain.payroll.v1.UpdateRateTableRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateTable data = 1;
     */
    data?: RateTable;
};
/**
 * Describes the message domain.payroll.v1.UpdateRateTableRequest.
 * Use `create(UpdateRateTableRequestSchema)` to create a new message.
 */
export declare const UpdateRateTableRequestSchema: GenMessage<UpdateRateTableRequest>;
/**
 * @generated from message domain.payroll.v1.UpdateRateTableResponse
 */
export type UpdateRateTableResponse = Message<"domain.payroll.v1.UpdateRateTableResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateTable data = 1;
     */
    data: RateTable[];
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
 * Describes the message domain.payroll.v1.UpdateRateTableResponse.
 * Use `create(UpdateRateTableResponseSchema)` to create a new message.
 */
export declare const UpdateRateTableResponseSchema: GenMessage<UpdateRateTableResponse>;
/**
 * @generated from message domain.payroll.v1.DeleteRateTableRequest
 */
export type DeleteRateTableRequest = Message<"domain.payroll.v1.DeleteRateTableRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateTable data = 1;
     */
    data?: RateTable;
};
/**
 * Describes the message domain.payroll.v1.DeleteRateTableRequest.
 * Use `create(DeleteRateTableRequestSchema)` to create a new message.
 */
export declare const DeleteRateTableRequestSchema: GenMessage<DeleteRateTableRequest>;
/**
 * @generated from message domain.payroll.v1.DeleteRateTableResponse
 */
export type DeleteRateTableResponse = Message<"domain.payroll.v1.DeleteRateTableResponse"> & {
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
 * Describes the message domain.payroll.v1.DeleteRateTableResponse.
 * Use `create(DeleteRateTableResponseSchema)` to create a new message.
 */
export declare const DeleteRateTableResponseSchema: GenMessage<DeleteRateTableResponse>;
/**
 * @generated from message domain.payroll.v1.ListRateTablesRequest
 */
export type ListRateTablesRequest = Message<"domain.payroll.v1.ListRateTablesRequest"> & {
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
 * Describes the message domain.payroll.v1.ListRateTablesRequest.
 * Use `create(ListRateTablesRequestSchema)` to create a new message.
 */
export declare const ListRateTablesRequestSchema: GenMessage<ListRateTablesRequest>;
/**
 * @generated from message domain.payroll.v1.ListRateTablesResponse
 */
export type ListRateTablesResponse = Message<"domain.payroll.v1.ListRateTablesResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateTable data = 1;
     */
    data: RateTable[];
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
 * Describes the message domain.payroll.v1.ListRateTablesResponse.
 * Use `create(ListRateTablesResponseSchema)` to create a new message.
 */
export declare const ListRateTablesResponseSchema: GenMessage<ListRateTablesResponse>;
/**
 * @generated from message domain.payroll.v1.GetRateTableListPageDataRequest
 */
export type GetRateTableListPageDataRequest = Message<"domain.payroll.v1.GetRateTableListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetRateTableListPageDataRequest.
 * Use `create(GetRateTableListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRateTableListPageDataRequestSchema: GenMessage<GetRateTableListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetRateTableListPageDataResponse
 */
export type GetRateTableListPageDataResponse = Message<"domain.payroll.v1.GetRateTableListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateTable rate_table_list = 1;
     */
    rateTableList: RateTable[];
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
 * Describes the message domain.payroll.v1.GetRateTableListPageDataResponse.
 * Use `create(GetRateTableListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRateTableListPageDataResponseSchema: GenMessage<GetRateTableListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetRateTableItemPageDataRequest
 */
export type GetRateTableItemPageDataRequest = Message<"domain.payroll.v1.GetRateTableItemPageDataRequest"> & {
    /**
     * @generated from field: string rate_table_id = 1;
     */
    rateTableId: string;
};
/**
 * Describes the message domain.payroll.v1.GetRateTableItemPageDataRequest.
 * Use `create(GetRateTableItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRateTableItemPageDataRequestSchema: GenMessage<GetRateTableItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetRateTableItemPageDataResponse
 */
export type GetRateTableItemPageDataResponse = Message<"domain.payroll.v1.GetRateTableItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.RateTable rate_table = 1;
     */
    rateTable?: RateTable;
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
 * Describes the message domain.payroll.v1.GetRateTableItemPageDataResponse.
 * Use `create(GetRateTableItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRateTableItemPageDataResponseSchema: GenMessage<GetRateTableItemPageDataResponse>;
/**
 * RateTableStatus drives versioning and supersession.
 *
 * @generated from enum domain.payroll.v1.RateTableStatus
 */
export declare enum RateTableStatus {
    /**
     * @generated from enum value: RATE_TABLE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: RATE_TABLE_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: RATE_TABLE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: RATE_TABLE_STATUS_SUPERSEDED = 3;
     */
    SUPERSEDED = 3,
    /**
     * @generated from enum value: RATE_TABLE_STATUS_VOIDED = 4;
     */
    VOIDED = 4
}
/**
 * Describes the enum domain.payroll.v1.RateTableStatus.
 */
export declare const RateTableStatusSchema: GenEnum<RateTableStatus>;
/**
 * @generated from service domain.payroll.v1.RateTableDomainService
 */
export declare const RateTableDomainService: GenService<{
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.CreateRateTable
     */
    createRateTable: {
        methodKind: "unary";
        input: typeof CreateRateTableRequestSchema;
        output: typeof CreateRateTableResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.ReadRateTable
     */
    readRateTable: {
        methodKind: "unary";
        input: typeof ReadRateTableRequestSchema;
        output: typeof ReadRateTableResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.UpdateRateTable
     */
    updateRateTable: {
        methodKind: "unary";
        input: typeof UpdateRateTableRequestSchema;
        output: typeof UpdateRateTableResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.DeleteRateTable
     */
    deleteRateTable: {
        methodKind: "unary";
        input: typeof DeleteRateTableRequestSchema;
        output: typeof DeleteRateTableResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.ListRateTables
     */
    listRateTables: {
        methodKind: "unary";
        input: typeof ListRateTablesRequestSchema;
        output: typeof ListRateTablesResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.GetRateTableListPageData
     */
    getRateTableListPageData: {
        methodKind: "unary";
        input: typeof GetRateTableListPageDataRequestSchema;
        output: typeof GetRateTableListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateTableDomainService.GetRateTableItemPageData
     */
    getRateTableItemPageData: {
        methodKind: "unary";
        input: typeof GetRateTableItemPageDataRequestSchema;
        output: typeof GetRateTableItemPageDataResponseSchema;
    };
}>;
