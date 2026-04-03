import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/fiscal_period/fiscal_period.proto.
 */
export declare const file_domain_ledger_fiscal_period_fiscal_period: GenFile;
/**
 * FiscalPeriod represents a discrete accounting period (typically one month).
 * Journal entries must be assigned to an open period at posting time.
 *
 * @generated from message domain.ledger.v1.FiscalPeriod
 */
export type FiscalPeriod = Message<"domain.ledger.v1.FiscalPeriod"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * e.g. "March 2026"
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * 1–12 (month number within the fiscal year)
     *
     * @generated from field: int32 period_number = 3;
     */
    periodNumber: number;
    /**
     * e.g. 2026
     *
     * @generated from field: int32 fiscal_year = 4;
     */
    fiscalYear: number;
    /**
     * Date range — unix timestamps
     *
     * @generated from field: int64 start_date = 5;
     */
    startDate: bigint;
    /**
     * @generated from field: int64 end_date = 6;
     */
    endDate: bigint;
    /**
     * @generated from field: optional string start_date_string = 7;
     */
    startDateString?: string;
    /**
     * @generated from field: optional string end_date_string = 8;
     */
    endDateString?: string;
    /**
     * Status
     *
     * @generated from field: domain.ledger.v1.FiscalPeriodStatus status = 9;
     */
    status: FiscalPeriodStatus;
    /**
     * Close audit
     *
     * FK to entity.User
     *
     * @generated from field: optional string closed_by = 10;
     */
    closedBy?: string;
    /**
     * @generated from field: optional int64 closed_at = 11;
     */
    closedAt?: bigint;
    /**
     * @generated from field: optional string closed_at_string = 12;
     */
    closedAtString?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 13;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 14;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 15;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 16;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 17;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.ledger.v1.FiscalPeriod.
 * Use `create(FiscalPeriodSchema)` to create a new message.
 */
export declare const FiscalPeriodSchema: GenMessage<FiscalPeriod>;
/**
 * @generated from message domain.ledger.v1.CreateFiscalPeriodRequest
 */
export type CreateFiscalPeriodRequest = Message<"domain.ledger.v1.CreateFiscalPeriodRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.FiscalPeriod data = 1;
     */
    data?: FiscalPeriod;
};
/**
 * Describes the message domain.ledger.v1.CreateFiscalPeriodRequest.
 * Use `create(CreateFiscalPeriodRequestSchema)` to create a new message.
 */
export declare const CreateFiscalPeriodRequestSchema: GenMessage<CreateFiscalPeriodRequest>;
/**
 * @generated from message domain.ledger.v1.CreateFiscalPeriodResponse
 */
export type CreateFiscalPeriodResponse = Message<"domain.ledger.v1.CreateFiscalPeriodResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.FiscalPeriod data = 1;
     */
    data: FiscalPeriod[];
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
 * Describes the message domain.ledger.v1.CreateFiscalPeriodResponse.
 * Use `create(CreateFiscalPeriodResponseSchema)` to create a new message.
 */
export declare const CreateFiscalPeriodResponseSchema: GenMessage<CreateFiscalPeriodResponse>;
/**
 * @generated from message domain.ledger.v1.ReadFiscalPeriodRequest
 */
export type ReadFiscalPeriodRequest = Message<"domain.ledger.v1.ReadFiscalPeriodRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.FiscalPeriod data = 1;
     */
    data?: FiscalPeriod;
};
/**
 * Describes the message domain.ledger.v1.ReadFiscalPeriodRequest.
 * Use `create(ReadFiscalPeriodRequestSchema)` to create a new message.
 */
export declare const ReadFiscalPeriodRequestSchema: GenMessage<ReadFiscalPeriodRequest>;
/**
 * @generated from message domain.ledger.v1.ReadFiscalPeriodResponse
 */
export type ReadFiscalPeriodResponse = Message<"domain.ledger.v1.ReadFiscalPeriodResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.FiscalPeriod data = 1;
     */
    data: FiscalPeriod[];
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
 * Describes the message domain.ledger.v1.ReadFiscalPeriodResponse.
 * Use `create(ReadFiscalPeriodResponseSchema)` to create a new message.
 */
export declare const ReadFiscalPeriodResponseSchema: GenMessage<ReadFiscalPeriodResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateFiscalPeriodRequest
 */
export type UpdateFiscalPeriodRequest = Message<"domain.ledger.v1.UpdateFiscalPeriodRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.FiscalPeriod data = 1;
     */
    data?: FiscalPeriod;
};
/**
 * Describes the message domain.ledger.v1.UpdateFiscalPeriodRequest.
 * Use `create(UpdateFiscalPeriodRequestSchema)` to create a new message.
 */
export declare const UpdateFiscalPeriodRequestSchema: GenMessage<UpdateFiscalPeriodRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateFiscalPeriodResponse
 */
export type UpdateFiscalPeriodResponse = Message<"domain.ledger.v1.UpdateFiscalPeriodResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.FiscalPeriod data = 1;
     */
    data: FiscalPeriod[];
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
 * Describes the message domain.ledger.v1.UpdateFiscalPeriodResponse.
 * Use `create(UpdateFiscalPeriodResponseSchema)` to create a new message.
 */
export declare const UpdateFiscalPeriodResponseSchema: GenMessage<UpdateFiscalPeriodResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteFiscalPeriodRequest
 */
export type DeleteFiscalPeriodRequest = Message<"domain.ledger.v1.DeleteFiscalPeriodRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.FiscalPeriod data = 1;
     */
    data?: FiscalPeriod;
};
/**
 * Describes the message domain.ledger.v1.DeleteFiscalPeriodRequest.
 * Use `create(DeleteFiscalPeriodRequestSchema)` to create a new message.
 */
export declare const DeleteFiscalPeriodRequestSchema: GenMessage<DeleteFiscalPeriodRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteFiscalPeriodResponse
 */
export type DeleteFiscalPeriodResponse = Message<"domain.ledger.v1.DeleteFiscalPeriodResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteFiscalPeriodResponse.
 * Use `create(DeleteFiscalPeriodResponseSchema)` to create a new message.
 */
export declare const DeleteFiscalPeriodResponseSchema: GenMessage<DeleteFiscalPeriodResponse>;
/**
 * @generated from message domain.ledger.v1.ListFiscalPeriodsRequest
 */
export type ListFiscalPeriodsRequest = Message<"domain.ledger.v1.ListFiscalPeriodsRequest"> & {
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
 * Describes the message domain.ledger.v1.ListFiscalPeriodsRequest.
 * Use `create(ListFiscalPeriodsRequestSchema)` to create a new message.
 */
export declare const ListFiscalPeriodsRequestSchema: GenMessage<ListFiscalPeriodsRequest>;
/**
 * @generated from message domain.ledger.v1.ListFiscalPeriodsResponse
 */
export type ListFiscalPeriodsResponse = Message<"domain.ledger.v1.ListFiscalPeriodsResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.FiscalPeriod data = 1;
     */
    data: FiscalPeriod[];
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
 * Describes the message domain.ledger.v1.ListFiscalPeriodsResponse.
 * Use `create(ListFiscalPeriodsResponseSchema)` to create a new message.
 */
export declare const ListFiscalPeriodsResponseSchema: GenMessage<ListFiscalPeriodsResponse>;
/**
 * @generated from message domain.ledger.v1.GetFiscalPeriodListPageDataRequest
 */
export type GetFiscalPeriodListPageDataRequest = Message<"domain.ledger.v1.GetFiscalPeriodListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetFiscalPeriodListPageDataRequest.
 * Use `create(GetFiscalPeriodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetFiscalPeriodListPageDataRequestSchema: GenMessage<GetFiscalPeriodListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetFiscalPeriodListPageDataResponse
 */
export type GetFiscalPeriodListPageDataResponse = Message<"domain.ledger.v1.GetFiscalPeriodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.FiscalPeriod fiscal_period_list = 1;
     */
    fiscalPeriodList: FiscalPeriod[];
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
 * Describes the message domain.ledger.v1.GetFiscalPeriodListPageDataResponse.
 * Use `create(GetFiscalPeriodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetFiscalPeriodListPageDataResponseSchema: GenMessage<GetFiscalPeriodListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetFiscalPeriodItemPageDataRequest
 */
export type GetFiscalPeriodItemPageDataRequest = Message<"domain.ledger.v1.GetFiscalPeriodItemPageDataRequest"> & {
    /**
     * @generated from field: string fiscal_period_id = 1;
     */
    fiscalPeriodId: string;
};
/**
 * Describes the message domain.ledger.v1.GetFiscalPeriodItemPageDataRequest.
 * Use `create(GetFiscalPeriodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetFiscalPeriodItemPageDataRequestSchema: GenMessage<GetFiscalPeriodItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetFiscalPeriodItemPageDataResponse
 */
export type GetFiscalPeriodItemPageDataResponse = Message<"domain.ledger.v1.GetFiscalPeriodItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.FiscalPeriod fiscal_period = 1;
     */
    fiscalPeriod?: FiscalPeriod;
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
 * Describes the message domain.ledger.v1.GetFiscalPeriodItemPageDataResponse.
 * Use `create(GetFiscalPeriodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetFiscalPeriodItemPageDataResponseSchema: GenMessage<GetFiscalPeriodItemPageDataResponse>;
/**
 * Lifecycle: Close a fiscal period (transitions OPEN -> CLOSED, prevents further posting)
 *
 * @generated from message domain.ledger.v1.CloseFiscalPeriodRequest
 */
export type CloseFiscalPeriodRequest = Message<"domain.ledger.v1.CloseFiscalPeriodRequest"> & {
    /**
     * @generated from field: string fiscal_period_id = 1;
     */
    fiscalPeriodId: string;
    /**
     * FK to entity.User
     *
     * @generated from field: string closed_by = 2;
     */
    closedBy: string;
};
/**
 * Describes the message domain.ledger.v1.CloseFiscalPeriodRequest.
 * Use `create(CloseFiscalPeriodRequestSchema)` to create a new message.
 */
export declare const CloseFiscalPeriodRequestSchema: GenMessage<CloseFiscalPeriodRequest>;
/**
 * @generated from message domain.ledger.v1.CloseFiscalPeriodResponse
 */
export type CloseFiscalPeriodResponse = Message<"domain.ledger.v1.CloseFiscalPeriodResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.FiscalPeriod data = 1;
     */
    data: FiscalPeriod[];
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
 * Describes the message domain.ledger.v1.CloseFiscalPeriodResponse.
 * Use `create(CloseFiscalPeriodResponseSchema)` to create a new message.
 */
export declare const CloseFiscalPeriodResponseSchema: GenMessage<CloseFiscalPeriodResponse>;
/**
 * FiscalPeriodStatus controls whether journal entries can be posted to this period.
 *
 * @generated from enum domain.ledger.v1.FiscalPeriodStatus
 */
export declare enum FiscalPeriodStatus {
    /**
     * @generated from enum value: FISCAL_PERIOD_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Posting allowed
     *
     * @generated from enum value: FISCAL_PERIOD_STATUS_OPEN = 1;
     */
    OPEN = 1,
    /**
     * Posting blocked; financial statements can be generated
     *
     * @generated from enum value: FISCAL_PERIOD_STATUS_CLOSED = 2;
     */
    CLOSED = 2,
    /**
     * Immutable; typically after audit sign-off
     *
     * @generated from enum value: FISCAL_PERIOD_STATUS_LOCKED = 3;
     */
    LOCKED = 3
}
/**
 * Describes the enum domain.ledger.v1.FiscalPeriodStatus.
 */
export declare const FiscalPeriodStatusSchema: GenEnum<FiscalPeriodStatus>;
/**
 * @generated from service domain.ledger.v1.FiscalPeriodDomainService
 */
export declare const FiscalPeriodDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.CreateFiscalPeriod
     */
    createFiscalPeriod: {
        methodKind: "unary";
        input: typeof CreateFiscalPeriodRequestSchema;
        output: typeof CreateFiscalPeriodResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.ReadFiscalPeriod
     */
    readFiscalPeriod: {
        methodKind: "unary";
        input: typeof ReadFiscalPeriodRequestSchema;
        output: typeof ReadFiscalPeriodResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.UpdateFiscalPeriod
     */
    updateFiscalPeriod: {
        methodKind: "unary";
        input: typeof UpdateFiscalPeriodRequestSchema;
        output: typeof UpdateFiscalPeriodResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.DeleteFiscalPeriod
     */
    deleteFiscalPeriod: {
        methodKind: "unary";
        input: typeof DeleteFiscalPeriodRequestSchema;
        output: typeof DeleteFiscalPeriodResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.ListFiscalPeriods
     */
    listFiscalPeriods: {
        methodKind: "unary";
        input: typeof ListFiscalPeriodsRequestSchema;
        output: typeof ListFiscalPeriodsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.GetFiscalPeriodListPageData
     */
    getFiscalPeriodListPageData: {
        methodKind: "unary";
        input: typeof GetFiscalPeriodListPageDataRequestSchema;
        output: typeof GetFiscalPeriodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.GetFiscalPeriodItemPageData
     */
    getFiscalPeriodItemPageData: {
        methodKind: "unary";
        input: typeof GetFiscalPeriodItemPageDataRequestSchema;
        output: typeof GetFiscalPeriodItemPageDataResponseSchema;
    };
    /**
     * Lifecycle: Close an open period (validates all JEs are posted, no pending drafts)
     *
     * @generated from rpc domain.ledger.v1.FiscalPeriodDomainService.CloseFiscalPeriod
     */
    closeFiscalPeriod: {
        methodKind: "unary";
        input: typeof CloseFiscalPeriodRequestSchema;
        output: typeof CloseFiscalPeriodResponseSchema;
    };
}>;
