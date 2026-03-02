import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/depreciation/depreciation.proto.
 */
export declare const file_domain_asset_depreciation_depreciation: GenFile;
/**
 * @generated from message domain.asset.v1.DepreciationSchedule
 */
export type DepreciationSchedule = Message<"domain.asset.v1.DepreciationSchedule"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * Period tracking
     *
     * @generated from field: int32 period_number = 3;
     */
    periodNumber: number;
    /**
     * @generated from field: int32 fiscal_year = 4;
     */
    fiscalYear: number;
    /**
     * @generated from field: int32 fiscal_period = 5;
     */
    fiscalPeriod: number;
    /**
     * @generated from field: int64 period_start_date = 6;
     */
    periodStartDate: bigint;
    /**
     * @generated from field: string period_start_date_string = 7;
     */
    periodStartDateString: string;
    /**
     * @generated from field: int64 period_end_date = 8;
     */
    periodEndDate: bigint;
    /**
     * @generated from field: string period_end_date_string = 9;
     */
    periodEndDateString: string;
    /**
     * Value tracking
     *
     * @generated from field: double opening_book_value = 10;
     */
    openingBookValue: number;
    /**
     * @generated from field: double depreciation_amount = 11;
     */
    depreciationAmount: number;
    /**
     * @generated from field: double accumulated_depreciation = 12;
     */
    accumulatedDepreciation: number;
    /**
     * @generated from field: double closing_book_value = 13;
     */
    closingBookValue: number;
    /**
     * Units of production (optional)
     *
     * @generated from field: optional int64 units_produced = 14;
     */
    unitsProduced?: bigint;
    /**
     * GL posting
     *
     * @generated from field: bool is_posted = 15;
     */
    isPosted: boolean;
    /**
     * FK to ledger.Journal (future)
     *
     * @generated from field: optional string journal_entry_id = 16;
     */
    journalEntryId?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 17;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 18;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 19;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 20;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 21;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.DepreciationSchedule.
 * Use `create(DepreciationScheduleSchema)` to create a new message.
 */
export declare const DepreciationScheduleSchema: GenMessage<DepreciationSchedule>;
/**
 * @generated from message domain.asset.v1.CreateDepreciationScheduleRequest
 */
export type CreateDepreciationScheduleRequest = Message<"domain.asset.v1.CreateDepreciationScheduleRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationSchedule data = 1;
     */
    data?: DepreciationSchedule;
};
/**
 * Describes the message domain.asset.v1.CreateDepreciationScheduleRequest.
 * Use `create(CreateDepreciationScheduleRequestSchema)` to create a new message.
 */
export declare const CreateDepreciationScheduleRequestSchema: GenMessage<CreateDepreciationScheduleRequest>;
/**
 * @generated from message domain.asset.v1.CreateDepreciationScheduleResponse
 */
export type CreateDepreciationScheduleResponse = Message<"domain.asset.v1.CreateDepreciationScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationSchedule data = 1;
     */
    data: DepreciationSchedule[];
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
 * Describes the message domain.asset.v1.CreateDepreciationScheduleResponse.
 * Use `create(CreateDepreciationScheduleResponseSchema)` to create a new message.
 */
export declare const CreateDepreciationScheduleResponseSchema: GenMessage<CreateDepreciationScheduleResponse>;
/**
 * @generated from message domain.asset.v1.ReadDepreciationScheduleRequest
 */
export type ReadDepreciationScheduleRequest = Message<"domain.asset.v1.ReadDepreciationScheduleRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationSchedule data = 1;
     */
    data?: DepreciationSchedule;
};
/**
 * Describes the message domain.asset.v1.ReadDepreciationScheduleRequest.
 * Use `create(ReadDepreciationScheduleRequestSchema)` to create a new message.
 */
export declare const ReadDepreciationScheduleRequestSchema: GenMessage<ReadDepreciationScheduleRequest>;
/**
 * @generated from message domain.asset.v1.ReadDepreciationScheduleResponse
 */
export type ReadDepreciationScheduleResponse = Message<"domain.asset.v1.ReadDepreciationScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationSchedule data = 1;
     */
    data: DepreciationSchedule[];
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
 * Describes the message domain.asset.v1.ReadDepreciationScheduleResponse.
 * Use `create(ReadDepreciationScheduleResponseSchema)` to create a new message.
 */
export declare const ReadDepreciationScheduleResponseSchema: GenMessage<ReadDepreciationScheduleResponse>;
/**
 * @generated from message domain.asset.v1.UpdateDepreciationScheduleRequest
 */
export type UpdateDepreciationScheduleRequest = Message<"domain.asset.v1.UpdateDepreciationScheduleRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationSchedule data = 1;
     */
    data?: DepreciationSchedule;
};
/**
 * Describes the message domain.asset.v1.UpdateDepreciationScheduleRequest.
 * Use `create(UpdateDepreciationScheduleRequestSchema)` to create a new message.
 */
export declare const UpdateDepreciationScheduleRequestSchema: GenMessage<UpdateDepreciationScheduleRequest>;
/**
 * @generated from message domain.asset.v1.UpdateDepreciationScheduleResponse
 */
export type UpdateDepreciationScheduleResponse = Message<"domain.asset.v1.UpdateDepreciationScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationSchedule data = 1;
     */
    data: DepreciationSchedule[];
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
 * Describes the message domain.asset.v1.UpdateDepreciationScheduleResponse.
 * Use `create(UpdateDepreciationScheduleResponseSchema)` to create a new message.
 */
export declare const UpdateDepreciationScheduleResponseSchema: GenMessage<UpdateDepreciationScheduleResponse>;
/**
 * @generated from message domain.asset.v1.DeleteDepreciationScheduleRequest
 */
export type DeleteDepreciationScheduleRequest = Message<"domain.asset.v1.DeleteDepreciationScheduleRequest"> & {
    /**
     * @generated from field: domain.asset.v1.DepreciationSchedule data = 1;
     */
    data?: DepreciationSchedule;
};
/**
 * Describes the message domain.asset.v1.DeleteDepreciationScheduleRequest.
 * Use `create(DeleteDepreciationScheduleRequestSchema)` to create a new message.
 */
export declare const DeleteDepreciationScheduleRequestSchema: GenMessage<DeleteDepreciationScheduleRequest>;
/**
 * @generated from message domain.asset.v1.DeleteDepreciationScheduleResponse
 */
export type DeleteDepreciationScheduleResponse = Message<"domain.asset.v1.DeleteDepreciationScheduleResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteDepreciationScheduleResponse.
 * Use `create(DeleteDepreciationScheduleResponseSchema)` to create a new message.
 */
export declare const DeleteDepreciationScheduleResponseSchema: GenMessage<DeleteDepreciationScheduleResponse>;
/**
 * @generated from message domain.asset.v1.ListDepreciationSchedulesRequest
 */
export type ListDepreciationSchedulesRequest = Message<"domain.asset.v1.ListDepreciationSchedulesRequest"> & {
    /**
     * @generated from field: optional string asset_id = 1;
     */
    assetId?: string;
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
 * Describes the message domain.asset.v1.ListDepreciationSchedulesRequest.
 * Use `create(ListDepreciationSchedulesRequestSchema)` to create a new message.
 */
export declare const ListDepreciationSchedulesRequestSchema: GenMessage<ListDepreciationSchedulesRequest>;
/**
 * @generated from message domain.asset.v1.ListDepreciationSchedulesResponse
 */
export type ListDepreciationSchedulesResponse = Message<"domain.asset.v1.ListDepreciationSchedulesResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationSchedule data = 1;
     */
    data: DepreciationSchedule[];
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
 * Describes the message domain.asset.v1.ListDepreciationSchedulesResponse.
 * Use `create(ListDepreciationSchedulesResponseSchema)` to create a new message.
 */
export declare const ListDepreciationSchedulesResponseSchema: GenMessage<ListDepreciationSchedulesResponse>;
/**
 * @generated from message domain.asset.v1.GetDepreciationScheduleListPageDataRequest
 */
export type GetDepreciationScheduleListPageDataRequest = Message<"domain.asset.v1.GetDepreciationScheduleListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetDepreciationScheduleListPageDataRequest.
 * Use `create(GetDepreciationScheduleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDepreciationScheduleListPageDataRequestSchema: GenMessage<GetDepreciationScheduleListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetDepreciationScheduleListPageDataResponse
 */
export type GetDepreciationScheduleListPageDataResponse = Message<"domain.asset.v1.GetDepreciationScheduleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.DepreciationSchedule depreciation_schedule_list = 1;
     */
    depreciationScheduleList: DepreciationSchedule[];
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
 * Describes the message domain.asset.v1.GetDepreciationScheduleListPageDataResponse.
 * Use `create(GetDepreciationScheduleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDepreciationScheduleListPageDataResponseSchema: GenMessage<GetDepreciationScheduleListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetDepreciationScheduleItemPageDataRequest
 */
export type GetDepreciationScheduleItemPageDataRequest = Message<"domain.asset.v1.GetDepreciationScheduleItemPageDataRequest"> & {
    /**
     * @generated from field: string depreciation_schedule_id = 1;
     */
    depreciationScheduleId: string;
};
/**
 * Describes the message domain.asset.v1.GetDepreciationScheduleItemPageDataRequest.
 * Use `create(GetDepreciationScheduleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDepreciationScheduleItemPageDataRequestSchema: GenMessage<GetDepreciationScheduleItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetDepreciationScheduleItemPageDataResponse
 */
export type GetDepreciationScheduleItemPageDataResponse = Message<"domain.asset.v1.GetDepreciationScheduleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.DepreciationSchedule depreciation_schedule = 1;
     */
    depreciationSchedule?: DepreciationSchedule;
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
 * Describes the message domain.asset.v1.GetDepreciationScheduleItemPageDataResponse.
 * Use `create(GetDepreciationScheduleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDepreciationScheduleItemPageDataResponseSchema: GenMessage<GetDepreciationScheduleItemPageDataResponse>;
/**
 * @generated from service domain.asset.v1.DepreciationDomainService
 */
export declare const DepreciationDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.DepreciationDomainService.CreateDepreciationSchedule
     */
    createDepreciationSchedule: {
        methodKind: "unary";
        input: typeof CreateDepreciationScheduleRequestSchema;
        output: typeof CreateDepreciationScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationDomainService.ReadDepreciationSchedule
     */
    readDepreciationSchedule: {
        methodKind: "unary";
        input: typeof ReadDepreciationScheduleRequestSchema;
        output: typeof ReadDepreciationScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationDomainService.UpdateDepreciationSchedule
     */
    updateDepreciationSchedule: {
        methodKind: "unary";
        input: typeof UpdateDepreciationScheduleRequestSchema;
        output: typeof UpdateDepreciationScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationDomainService.DeleteDepreciationSchedule
     */
    deleteDepreciationSchedule: {
        methodKind: "unary";
        input: typeof DeleteDepreciationScheduleRequestSchema;
        output: typeof DeleteDepreciationScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationDomainService.ListDepreciationSchedules
     */
    listDepreciationSchedules: {
        methodKind: "unary";
        input: typeof ListDepreciationSchedulesRequestSchema;
        output: typeof ListDepreciationSchedulesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.DepreciationDomainService.GetDepreciationScheduleListPageData
     */
    getDepreciationScheduleListPageData: {
        methodKind: "unary";
        input: typeof GetDepreciationScheduleListPageDataRequestSchema;
        output: typeof GetDepreciationScheduleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.DepreciationDomainService.GetDepreciationScheduleItemPageData
     */
    getDepreciationScheduleItemPageData: {
        methodKind: "unary";
        input: typeof GetDepreciationScheduleItemPageDataRequestSchema;
        output: typeof GetDepreciationScheduleItemPageDataResponseSchema;
    };
}>;
