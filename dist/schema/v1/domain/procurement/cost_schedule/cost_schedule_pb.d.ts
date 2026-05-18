import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/procurement/cost_schedule/cost_schedule.proto.
 */
export declare const file_domain_procurement_cost_schedule_cost_schedule: GenFile;
/**
 * @generated from message domain.procurement.v1.CostSchedule
 */
export type CostSchedule = Message<"domain.procurement.v1.CostSchedule"> & {
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional string description = 8;
     */
    description?: string;
    /**
     * UTC timestamp; display TZ resolved per-request
     *
     * @generated from field: google.protobuf.Timestamp date_time_start = 9;
     */
    dateTimeStart?: Timestamp;
    /**
     * UTC timestamp; nil = open-ended
     *
     * @generated from field: optional google.protobuf.Timestamp date_time_end = 10;
     */
    dateTimeEnd?: Timestamp;
    /**
     * @generated from field: optional string location_id = 11;
     */
    locationId?: string;
    /**
     * @generated from field: optional string workspace_id = 12;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.procurement.v1.CostSchedule.
 * Use `create(CostScheduleSchema)` to create a new message.
 */
export declare const CostScheduleSchema: GenMessage<CostSchedule>;
/**
 * @generated from message domain.procurement.v1.CreateCostScheduleRequest
 */
export type CreateCostScheduleRequest = Message<"domain.procurement.v1.CreateCostScheduleRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostSchedule data = 1;
     */
    data?: CostSchedule;
};
/**
 * Describes the message domain.procurement.v1.CreateCostScheduleRequest.
 * Use `create(CreateCostScheduleRequestSchema)` to create a new message.
 */
export declare const CreateCostScheduleRequestSchema: GenMessage<CreateCostScheduleRequest>;
/**
 * @generated from message domain.procurement.v1.CreateCostScheduleResponse
 */
export type CreateCostScheduleResponse = Message<"domain.procurement.v1.CreateCostScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostSchedule data = 1;
     */
    data: CostSchedule[];
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
 * Describes the message domain.procurement.v1.CreateCostScheduleResponse.
 * Use `create(CreateCostScheduleResponseSchema)` to create a new message.
 */
export declare const CreateCostScheduleResponseSchema: GenMessage<CreateCostScheduleResponse>;
/**
 * @generated from message domain.procurement.v1.ReadCostScheduleRequest
 */
export type ReadCostScheduleRequest = Message<"domain.procurement.v1.ReadCostScheduleRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostSchedule data = 1;
     */
    data?: CostSchedule;
};
/**
 * Describes the message domain.procurement.v1.ReadCostScheduleRequest.
 * Use `create(ReadCostScheduleRequestSchema)` to create a new message.
 */
export declare const ReadCostScheduleRequestSchema: GenMessage<ReadCostScheduleRequest>;
/**
 * @generated from message domain.procurement.v1.ReadCostScheduleResponse
 */
export type ReadCostScheduleResponse = Message<"domain.procurement.v1.ReadCostScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostSchedule data = 1;
     */
    data: CostSchedule[];
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
 * Describes the message domain.procurement.v1.ReadCostScheduleResponse.
 * Use `create(ReadCostScheduleResponseSchema)` to create a new message.
 */
export declare const ReadCostScheduleResponseSchema: GenMessage<ReadCostScheduleResponse>;
/**
 * @generated from message domain.procurement.v1.UpdateCostScheduleRequest
 */
export type UpdateCostScheduleRequest = Message<"domain.procurement.v1.UpdateCostScheduleRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostSchedule data = 1;
     */
    data?: CostSchedule;
};
/**
 * Describes the message domain.procurement.v1.UpdateCostScheduleRequest.
 * Use `create(UpdateCostScheduleRequestSchema)` to create a new message.
 */
export declare const UpdateCostScheduleRequestSchema: GenMessage<UpdateCostScheduleRequest>;
/**
 * @generated from message domain.procurement.v1.UpdateCostScheduleResponse
 */
export type UpdateCostScheduleResponse = Message<"domain.procurement.v1.UpdateCostScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostSchedule data = 1;
     */
    data: CostSchedule[];
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
 * Describes the message domain.procurement.v1.UpdateCostScheduleResponse.
 * Use `create(UpdateCostScheduleResponseSchema)` to create a new message.
 */
export declare const UpdateCostScheduleResponseSchema: GenMessage<UpdateCostScheduleResponse>;
/**
 * @generated from message domain.procurement.v1.DeleteCostScheduleRequest
 */
export type DeleteCostScheduleRequest = Message<"domain.procurement.v1.DeleteCostScheduleRequest"> & {
    /**
     * @generated from field: domain.procurement.v1.CostSchedule data = 1;
     */
    data?: CostSchedule;
};
/**
 * Describes the message domain.procurement.v1.DeleteCostScheduleRequest.
 * Use `create(DeleteCostScheduleRequestSchema)` to create a new message.
 */
export declare const DeleteCostScheduleRequestSchema: GenMessage<DeleteCostScheduleRequest>;
/**
 * @generated from message domain.procurement.v1.DeleteCostScheduleResponse
 */
export type DeleteCostScheduleResponse = Message<"domain.procurement.v1.DeleteCostScheduleResponse"> & {
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
 * Describes the message domain.procurement.v1.DeleteCostScheduleResponse.
 * Use `create(DeleteCostScheduleResponseSchema)` to create a new message.
 */
export declare const DeleteCostScheduleResponseSchema: GenMessage<DeleteCostScheduleResponse>;
/**
 * @generated from message domain.procurement.v1.ListCostSchedulesRequest
 */
export type ListCostSchedulesRequest = Message<"domain.procurement.v1.ListCostSchedulesRequest"> & {
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
 * Describes the message domain.procurement.v1.ListCostSchedulesRequest.
 * Use `create(ListCostSchedulesRequestSchema)` to create a new message.
 */
export declare const ListCostSchedulesRequestSchema: GenMessage<ListCostSchedulesRequest>;
/**
 * @generated from message domain.procurement.v1.ListCostSchedulesResponse
 */
export type ListCostSchedulesResponse = Message<"domain.procurement.v1.ListCostSchedulesResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostSchedule data = 1;
     */
    data: CostSchedule[];
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
 * Describes the message domain.procurement.v1.ListCostSchedulesResponse.
 * Use `create(ListCostSchedulesResponseSchema)` to create a new message.
 */
export declare const ListCostSchedulesResponseSchema: GenMessage<ListCostSchedulesResponse>;
/**
 * @generated from message domain.procurement.v1.GetCostScheduleListPageDataRequest
 */
export type GetCostScheduleListPageDataRequest = Message<"domain.procurement.v1.GetCostScheduleListPageDataRequest"> & {
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
 * Describes the message domain.procurement.v1.GetCostScheduleListPageDataRequest.
 * Use `create(GetCostScheduleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCostScheduleListPageDataRequestSchema: GenMessage<GetCostScheduleListPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetCostScheduleListPageDataResponse
 */
export type GetCostScheduleListPageDataResponse = Message<"domain.procurement.v1.GetCostScheduleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.procurement.v1.CostSchedule cost_schedule_list = 1;
     */
    costScheduleList: CostSchedule[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.procurement.v1.GetCostScheduleListPageDataResponse.
 * Use `create(GetCostScheduleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCostScheduleListPageDataResponseSchema: GenMessage<GetCostScheduleListPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.GetCostScheduleItemPageDataRequest
 */
export type GetCostScheduleItemPageDataRequest = Message<"domain.procurement.v1.GetCostScheduleItemPageDataRequest"> & {
    /**
     * @generated from field: string cost_schedule_id = 1;
     */
    costScheduleId: string;
};
/**
 * Describes the message domain.procurement.v1.GetCostScheduleItemPageDataRequest.
 * Use `create(GetCostScheduleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCostScheduleItemPageDataRequestSchema: GenMessage<GetCostScheduleItemPageDataRequest>;
/**
 * @generated from message domain.procurement.v1.GetCostScheduleItemPageDataResponse
 */
export type GetCostScheduleItemPageDataResponse = Message<"domain.procurement.v1.GetCostScheduleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.procurement.v1.CostSchedule cost_schedule = 1;
     */
    costSchedule?: CostSchedule;
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
 * Describes the message domain.procurement.v1.GetCostScheduleItemPageDataResponse.
 * Use `create(GetCostScheduleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCostScheduleItemPageDataResponseSchema: GenMessage<GetCostScheduleItemPageDataResponse>;
/**
 * @generated from message domain.procurement.v1.FindApplicableCostScheduleRequest
 */
export type FindApplicableCostScheduleRequest = Message<"domain.procurement.v1.FindApplicableCostScheduleRequest"> & {
    /**
     * @generated from field: string location_id = 1;
     */
    locationId: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string date = 2;
     */
    date: string;
};
/**
 * Describes the message domain.procurement.v1.FindApplicableCostScheduleRequest.
 * Use `create(FindApplicableCostScheduleRequestSchema)` to create a new message.
 */
export declare const FindApplicableCostScheduleRequestSchema: GenMessage<FindApplicableCostScheduleRequest>;
/**
 * @generated from message domain.procurement.v1.FindApplicableCostScheduleResponse
 */
export type FindApplicableCostScheduleResponse = Message<"domain.procurement.v1.FindApplicableCostScheduleResponse"> & {
    /**
     * @generated from field: optional domain.procurement.v1.CostSchedule cost_schedule = 1;
     */
    costSchedule?: CostSchedule;
    /**
     * @generated from field: bool found = 2;
     */
    found: boolean;
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.procurement.v1.FindApplicableCostScheduleResponse.
 * Use `create(FindApplicableCostScheduleResponseSchema)` to create a new message.
 */
export declare const FindApplicableCostScheduleResponseSchema: GenMessage<FindApplicableCostScheduleResponse>;
/**
 * @generated from service domain.procurement.v1.CostScheduleDomainService
 */
export declare const CostScheduleDomainService: GenService<{
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.CreateCostSchedule
     */
    createCostSchedule: {
        methodKind: "unary";
        input: typeof CreateCostScheduleRequestSchema;
        output: typeof CreateCostScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.ReadCostSchedule
     */
    readCostSchedule: {
        methodKind: "unary";
        input: typeof ReadCostScheduleRequestSchema;
        output: typeof ReadCostScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.UpdateCostSchedule
     */
    updateCostSchedule: {
        methodKind: "unary";
        input: typeof UpdateCostScheduleRequestSchema;
        output: typeof UpdateCostScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.DeleteCostSchedule
     */
    deleteCostSchedule: {
        methodKind: "unary";
        input: typeof DeleteCostScheduleRequestSchema;
        output: typeof DeleteCostScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.ListCostSchedules
     */
    listCostSchedules: {
        methodKind: "unary";
        input: typeof ListCostSchedulesRequestSchema;
        output: typeof ListCostSchedulesResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.GetCostScheduleListPageData
     */
    getCostScheduleListPageData: {
        methodKind: "unary";
        input: typeof GetCostScheduleListPageDataRequestSchema;
        output: typeof GetCostScheduleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.GetCostScheduleItemPageData
     */
    getCostScheduleItemPageData: {
        methodKind: "unary";
        input: typeof GetCostScheduleItemPageDataRequestSchema;
        output: typeof GetCostScheduleItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.procurement.v1.CostScheduleDomainService.FindApplicableCostSchedule
     */
    findApplicableCostSchedule: {
        methodKind: "unary";
        input: typeof FindApplicableCostScheduleRequestSchema;
        output: typeof FindApplicableCostScheduleResponseSchema;
    };
}>;
