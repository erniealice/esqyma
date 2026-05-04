import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SupplierContract } from "../supplier_contract/supplier_contract_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/supplier_contract_price_schedule/supplier_contract_price_schedule.proto.
 */
export declare const file_domain_expenditure_supplier_contract_price_schedule_supplier_contract_price_schedule: GenFile;
/**
 * SupplierContractPriceSchedule is a date-windowed pricing layer scoped to a
 * single supplier contract. Multi-year escalations are modeled as multiple
 * schedule rows ("Year 1", "Year 2", ...).
 *
 * Window semantics: half-open `[date_time_start, date_time_end)` (start
 * inclusive, end exclusive). All values are normalized to UTC at the
 * use-case boundary; display layer renders in workspace timezone.
 *
 * DB-enforced invariants (postgres):
 *   - GIST exclusion constraint blocks overlapping windows within the same
 *     supplier_contract for any non-cancelled schedule (CRIT-1).
 *   - Partial unique index allows at most one open-ended (date_time_end IS
 *     NULL, status != CANCELLED) row per supplier_contract (CRIT-2).
 *   - Partial unique index allows at most one ACTIVE schedule per contract
 *     at a time.
 * MySQL / SQL Server enforcement is deferred (advisory-lock pattern,
 * documented in the adapter file when those dialects ship).
 *
 * @generated from message domain.expenditure.v1.SupplierContractPriceSchedule
 */
export type SupplierContractPriceSchedule = Message<"domain.expenditure.v1.SupplierContractPriceSchedule"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Audit
     *
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: string internal_id = 8;
     */
    internalId: string;
    /**
     * Parent contract
     *
     * @generated from field: string supplier_contract_id = 10;
     */
    supplierContractId: string;
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContract supplier_contract = 11;
     */
    supplierContract?: SupplierContract;
    /**
     * Identity
     *
     * "Year 1 (2026)", "Renewal terms 2027"
     *
     * @generated from field: string name = 20;
     */
    name: string;
    /**
     * @generated from field: optional string description = 21;
     */
    description?: string;
    /**
     * Validity window — UTC timestamps; half-open [start, end)
     *
     * @generated from field: google.protobuf.Timestamp date_time_start = 22;
     */
    dateTimeStart?: Timestamp;
    /**
     * nil = open-ended last bucket
     *
     * @generated from field: optional google.protobuf.Timestamp date_time_end = 23;
     */
    dateTimeEnd?: Timestamp;
    /**
     * Scoping
     *
     * @generated from field: optional string location_id = 24;
     */
    locationId?: string;
    /**
     * @generated from field: string currency = 25;
     */
    currency: string;
    /**
     * Lifecycle
     *
     * @generated from field: domain.expenditure.v1.SupplierContractPriceScheduleStatus status = 30;
     */
    status: SupplierContractPriceScheduleStatus;
    /**
     * 1, 2, 3 ... ordering within a contract
     *
     * @generated from field: int32 sequence_number = 31;
     */
    sequenceNumber: number;
    /**
     * Notes
     *
     * @generated from field: optional string notes = 50;
     */
    notes?: string;
    /**
     * @generated from field: map<string, string> metadata = 51;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.expenditure.v1.SupplierContractPriceSchedule.
 * Use `create(SupplierContractPriceScheduleSchema)` to create a new message.
 */
export declare const SupplierContractPriceScheduleSchema: GenMessage<SupplierContractPriceSchedule>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractPriceScheduleRequest
 */
export type CreateSupplierContractPriceScheduleRequest = Message<"domain.expenditure.v1.CreateSupplierContractPriceScheduleRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data?: SupplierContractPriceSchedule;
};
/**
 * Describes the message domain.expenditure.v1.CreateSupplierContractPriceScheduleRequest.
 * Use `create(CreateSupplierContractPriceScheduleRequestSchema)` to create a new message.
 */
export declare const CreateSupplierContractPriceScheduleRequestSchema: GenMessage<CreateSupplierContractPriceScheduleRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractPriceScheduleResponse
 */
export type CreateSupplierContractPriceScheduleResponse = Message<"domain.expenditure.v1.CreateSupplierContractPriceScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data: SupplierContractPriceSchedule[];
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
 * Describes the message domain.expenditure.v1.CreateSupplierContractPriceScheduleResponse.
 * Use `create(CreateSupplierContractPriceScheduleResponseSchema)` to create a new message.
 */
export declare const CreateSupplierContractPriceScheduleResponseSchema: GenMessage<CreateSupplierContractPriceScheduleResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractPriceScheduleRequest
 */
export type ReadSupplierContractPriceScheduleRequest = Message<"domain.expenditure.v1.ReadSupplierContractPriceScheduleRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data?: SupplierContractPriceSchedule;
};
/**
 * Describes the message domain.expenditure.v1.ReadSupplierContractPriceScheduleRequest.
 * Use `create(ReadSupplierContractPriceScheduleRequestSchema)` to create a new message.
 */
export declare const ReadSupplierContractPriceScheduleRequestSchema: GenMessage<ReadSupplierContractPriceScheduleRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractPriceScheduleResponse
 */
export type ReadSupplierContractPriceScheduleResponse = Message<"domain.expenditure.v1.ReadSupplierContractPriceScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data: SupplierContractPriceSchedule[];
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
 * Describes the message domain.expenditure.v1.ReadSupplierContractPriceScheduleResponse.
 * Use `create(ReadSupplierContractPriceScheduleResponseSchema)` to create a new message.
 */
export declare const ReadSupplierContractPriceScheduleResponseSchema: GenMessage<ReadSupplierContractPriceScheduleResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractPriceScheduleRequest
 */
export type UpdateSupplierContractPriceScheduleRequest = Message<"domain.expenditure.v1.UpdateSupplierContractPriceScheduleRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data?: SupplierContractPriceSchedule;
};
/**
 * Describes the message domain.expenditure.v1.UpdateSupplierContractPriceScheduleRequest.
 * Use `create(UpdateSupplierContractPriceScheduleRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierContractPriceScheduleRequestSchema: GenMessage<UpdateSupplierContractPriceScheduleRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractPriceScheduleResponse
 */
export type UpdateSupplierContractPriceScheduleResponse = Message<"domain.expenditure.v1.UpdateSupplierContractPriceScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data: SupplierContractPriceSchedule[];
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
 * Describes the message domain.expenditure.v1.UpdateSupplierContractPriceScheduleResponse.
 * Use `create(UpdateSupplierContractPriceScheduleResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierContractPriceScheduleResponseSchema: GenMessage<UpdateSupplierContractPriceScheduleResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractPriceScheduleRequest
 */
export type DeleteSupplierContractPriceScheduleRequest = Message<"domain.expenditure.v1.DeleteSupplierContractPriceScheduleRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data?: SupplierContractPriceSchedule;
};
/**
 * Describes the message domain.expenditure.v1.DeleteSupplierContractPriceScheduleRequest.
 * Use `create(DeleteSupplierContractPriceScheduleRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierContractPriceScheduleRequestSchema: GenMessage<DeleteSupplierContractPriceScheduleRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractPriceScheduleResponse
 */
export type DeleteSupplierContractPriceScheduleResponse = Message<"domain.expenditure.v1.DeleteSupplierContractPriceScheduleResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteSupplierContractPriceScheduleResponse.
 * Use `create(DeleteSupplierContractPriceScheduleResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierContractPriceScheduleResponseSchema: GenMessage<DeleteSupplierContractPriceScheduleResponse>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractPriceSchedulesRequest
 */
export type ListSupplierContractPriceSchedulesRequest = Message<"domain.expenditure.v1.ListSupplierContractPriceSchedulesRequest"> & {
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
    /**
     * @generated from field: optional string supplier_contract_id = 5;
     */
    supplierContractId?: string;
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractPriceScheduleStatus status = 6;
     */
    status?: SupplierContractPriceScheduleStatus;
    /**
     * @generated from field: optional string workspace_id = 7;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListSupplierContractPriceSchedulesRequest.
 * Use `create(ListSupplierContractPriceSchedulesRequestSchema)` to create a new message.
 */
export declare const ListSupplierContractPriceSchedulesRequestSchema: GenMessage<ListSupplierContractPriceSchedulesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractPriceSchedulesResponse
 */
export type ListSupplierContractPriceSchedulesResponse = Message<"domain.expenditure.v1.ListSupplierContractPriceSchedulesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data: SupplierContractPriceSchedule[];
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
 * Describes the message domain.expenditure.v1.ListSupplierContractPriceSchedulesResponse.
 * Use `create(ListSupplierContractPriceSchedulesResponseSchema)` to create a new message.
 */
export declare const ListSupplierContractPriceSchedulesResponseSchema: GenMessage<ListSupplierContractPriceSchedulesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleListPageDataRequest
 */
export type GetSupplierContractPriceScheduleListPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleListPageDataRequest.
 * Use `create(GetSupplierContractPriceScheduleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleListPageDataRequestSchema: GenMessage<GetSupplierContractPriceScheduleListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleListPageDataResponse
 */
export type GetSupplierContractPriceScheduleListPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceSchedule supplier_contract_price_schedule_list = 1;
     */
    supplierContractPriceScheduleList: SupplierContractPriceSchedule[];
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
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleListPageDataResponse.
 * Use `create(GetSupplierContractPriceScheduleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleListPageDataResponseSchema: GenMessage<GetSupplierContractPriceScheduleListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleItemPageDataRequest
 */
export type GetSupplierContractPriceScheduleItemPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_contract_price_schedule_id = 1;
     */
    supplierContractPriceScheduleId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleItemPageDataRequest.
 * Use `create(GetSupplierContractPriceScheduleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleItemPageDataRequestSchema: GenMessage<GetSupplierContractPriceScheduleItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleItemPageDataResponse
 */
export type GetSupplierContractPriceScheduleItemPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractPriceSchedule supplier_contract_price_schedule = 1;
     */
    supplierContractPriceSchedule?: SupplierContractPriceSchedule;
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
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleItemPageDataResponse.
 * Use `create(GetSupplierContractPriceScheduleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleItemPageDataResponseSchema: GenMessage<GetSupplierContractPriceScheduleItemPageDataResponse>;
/**
 * ActivateSupplierContractPriceSchedule flips status SCHEDULED→ACTIVE. The
 * use case auto-supersedes any existing ACTIVE schedule for the same
 * supplier_contract (single-write boundary; partial unique index enforces).
 *
 * @generated from message domain.expenditure.v1.ActivateSupplierContractPriceScheduleRequest
 */
export type ActivateSupplierContractPriceScheduleRequest = Message<"domain.expenditure.v1.ActivateSupplierContractPriceScheduleRequest"> & {
    /**
     * @generated from field: string supplier_contract_price_schedule_id = 1;
     */
    supplierContractPriceScheduleId: string;
    /**
     * @generated from field: string activated_by = 2;
     */
    activatedBy: string;
};
/**
 * Describes the message domain.expenditure.v1.ActivateSupplierContractPriceScheduleRequest.
 * Use `create(ActivateSupplierContractPriceScheduleRequestSchema)` to create a new message.
 */
export declare const ActivateSupplierContractPriceScheduleRequestSchema: GenMessage<ActivateSupplierContractPriceScheduleRequest>;
/**
 * @generated from message domain.expenditure.v1.ActivateSupplierContractPriceScheduleResponse
 */
export type ActivateSupplierContractPriceScheduleResponse = Message<"domain.expenditure.v1.ActivateSupplierContractPriceScheduleResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data?: SupplierContractPriceSchedule;
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
 * Describes the message domain.expenditure.v1.ActivateSupplierContractPriceScheduleResponse.
 * Use `create(ActivateSupplierContractPriceScheduleResponseSchema)` to create a new message.
 */
export declare const ActivateSupplierContractPriceScheduleResponseSchema: GenMessage<ActivateSupplierContractPriceScheduleResponse>;
/**
 * SupersedeSupplierContractPriceSchedule flips ACTIVE→SUPERSEDED on
 * date_time_end arrival or operator request.
 *
 * @generated from message domain.expenditure.v1.SupersedeSupplierContractPriceScheduleRequest
 */
export type SupersedeSupplierContractPriceScheduleRequest = Message<"domain.expenditure.v1.SupersedeSupplierContractPriceScheduleRequest"> & {
    /**
     * @generated from field: string supplier_contract_price_schedule_id = 1;
     */
    supplierContractPriceScheduleId: string;
    /**
     * @generated from field: optional string reason = 2;
     */
    reason?: string;
};
/**
 * Describes the message domain.expenditure.v1.SupersedeSupplierContractPriceScheduleRequest.
 * Use `create(SupersedeSupplierContractPriceScheduleRequestSchema)` to create a new message.
 */
export declare const SupersedeSupplierContractPriceScheduleRequestSchema: GenMessage<SupersedeSupplierContractPriceScheduleRequest>;
/**
 * @generated from message domain.expenditure.v1.SupersedeSupplierContractPriceScheduleResponse
 */
export type SupersedeSupplierContractPriceScheduleResponse = Message<"domain.expenditure.v1.SupersedeSupplierContractPriceScheduleResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractPriceSchedule data = 1;
     */
    data?: SupplierContractPriceSchedule;
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
 * Describes the message domain.expenditure.v1.SupersedeSupplierContractPriceScheduleResponse.
 * Use `create(SupersedeSupplierContractPriceScheduleResponseSchema)` to create a new message.
 */
export declare const SupersedeSupplierContractPriceScheduleResponseSchema: GenMessage<SupersedeSupplierContractPriceScheduleResponse>;
/**
 * SupplierContractPriceScheduleStatus drives the date-windowed price
 * schedule lifecycle. Mirrors the sales-side PriceSchedule lifecycle but
 * is scoped to a single supplier contract (suppliers don't share catalogs).
 *
 * @generated from enum domain.expenditure.v1.SupplierContractPriceScheduleStatus
 */
export declare enum SupplierContractPriceScheduleStatus {
    /**
     * @generated from enum value: SUPPLIER_CONTRACT_PRICE_SCHEDULE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * future window, not yet in effect
     *
     * @generated from enum value: SUPPLIER_CONTRACT_PRICE_SCHEDULE_STATUS_SCHEDULED = 1;
     */
    SCHEDULED = 1,
    /**
     * currently in effect
     *
     * @generated from enum value: SUPPLIER_CONTRACT_PRICE_SCHEDULE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * past window, contract still active
     *
     * @generated from enum value: SUPPLIER_CONTRACT_PRICE_SCHEDULE_STATUS_SUPERSEDED = 3;
     */
    SUPERSEDED = 3,
    /**
     * never went into effect
     *
     * @generated from enum value: SUPPLIER_CONTRACT_PRICE_SCHEDULE_STATUS_CANCELLED = 4;
     */
    CANCELLED = 4
}
/**
 * Describes the enum domain.expenditure.v1.SupplierContractPriceScheduleStatus.
 */
export declare const SupplierContractPriceScheduleStatusSchema: GenEnum<SupplierContractPriceScheduleStatus>;
/**
 * @generated from service domain.expenditure.v1.SupplierContractPriceScheduleDomainService
 */
export declare const SupplierContractPriceScheduleDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.CreateSupplierContractPriceSchedule
     */
    createSupplierContractPriceSchedule: {
        methodKind: "unary";
        input: typeof CreateSupplierContractPriceScheduleRequestSchema;
        output: typeof CreateSupplierContractPriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.ReadSupplierContractPriceSchedule
     */
    readSupplierContractPriceSchedule: {
        methodKind: "unary";
        input: typeof ReadSupplierContractPriceScheduleRequestSchema;
        output: typeof ReadSupplierContractPriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.UpdateSupplierContractPriceSchedule
     */
    updateSupplierContractPriceSchedule: {
        methodKind: "unary";
        input: typeof UpdateSupplierContractPriceScheduleRequestSchema;
        output: typeof UpdateSupplierContractPriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.DeleteSupplierContractPriceSchedule
     */
    deleteSupplierContractPriceSchedule: {
        methodKind: "unary";
        input: typeof DeleteSupplierContractPriceScheduleRequestSchema;
        output: typeof DeleteSupplierContractPriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.ListSupplierContractPriceSchedules
     */
    listSupplierContractPriceSchedules: {
        methodKind: "unary";
        input: typeof ListSupplierContractPriceSchedulesRequestSchema;
        output: typeof ListSupplierContractPriceSchedulesResponseSchema;
    };
    /**
     * Page data for UI views
     *
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.GetSupplierContractPriceScheduleListPageData
     */
    getSupplierContractPriceScheduleListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractPriceScheduleListPageDataRequestSchema;
        output: typeof GetSupplierContractPriceScheduleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.GetSupplierContractPriceScheduleItemPageData
     */
    getSupplierContractPriceScheduleItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractPriceScheduleItemPageDataRequestSchema;
        output: typeof GetSupplierContractPriceScheduleItemPageDataResponseSchema;
    };
    /**
     * Workflow actions
     *
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.ActivateSupplierContractPriceSchedule
     */
    activateSupplierContractPriceSchedule: {
        methodKind: "unary";
        input: typeof ActivateSupplierContractPriceScheduleRequestSchema;
        output: typeof ActivateSupplierContractPriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleDomainService.SupersedeSupplierContractPriceSchedule
     */
    supersedeSupplierContractPriceSchedule: {
        methodKind: "unary";
        input: typeof SupersedeSupplierContractPriceScheduleRequestSchema;
        output: typeof SupersedeSupplierContractPriceScheduleResponseSchema;
    };
}>;
