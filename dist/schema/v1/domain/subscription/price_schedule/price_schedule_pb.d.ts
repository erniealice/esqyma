import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/price_schedule/price_schedule.proto.
 */
export declare const file_domain_subscription_price_schedule_price_schedule: GenFile;
/**
 * @generated from message domain.subscription.v1.PriceSchedule
 */
export type PriceSchedule = Message<"domain.subscription.v1.PriceSchedule"> & {
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
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string date_start = 9;
     */
    dateStart: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string date_end = 10;
     */
    dateEnd?: string;
    /**
     * @generated from field: optional string location_id = 11;
     */
    locationId?: string;
};
/**
 * Describes the message domain.subscription.v1.PriceSchedule.
 * Use `create(PriceScheduleSchema)` to create a new message.
 */
export declare const PriceScheduleSchema: GenMessage<PriceSchedule>;
/**
 * @generated from message domain.subscription.v1.CreatePriceScheduleRequest
 */
export type CreatePriceScheduleRequest = Message<"domain.subscription.v1.CreatePriceScheduleRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceSchedule data = 1;
     */
    data?: PriceSchedule;
};
/**
 * Describes the message domain.subscription.v1.CreatePriceScheduleRequest.
 * Use `create(CreatePriceScheduleRequestSchema)` to create a new message.
 */
export declare const CreatePriceScheduleRequestSchema: GenMessage<CreatePriceScheduleRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePriceScheduleResponse
 */
export type CreatePriceScheduleResponse = Message<"domain.subscription.v1.CreatePriceScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceSchedule data = 1;
     */
    data: PriceSchedule[];
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
 * Describes the message domain.subscription.v1.CreatePriceScheduleResponse.
 * Use `create(CreatePriceScheduleResponseSchema)` to create a new message.
 */
export declare const CreatePriceScheduleResponseSchema: GenMessage<CreatePriceScheduleResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPriceScheduleRequest
 */
export type ReadPriceScheduleRequest = Message<"domain.subscription.v1.ReadPriceScheduleRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceSchedule data = 1;
     */
    data?: PriceSchedule;
};
/**
 * Describes the message domain.subscription.v1.ReadPriceScheduleRequest.
 * Use `create(ReadPriceScheduleRequestSchema)` to create a new message.
 */
export declare const ReadPriceScheduleRequestSchema: GenMessage<ReadPriceScheduleRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPriceScheduleResponse
 */
export type ReadPriceScheduleResponse = Message<"domain.subscription.v1.ReadPriceScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceSchedule data = 1;
     */
    data: PriceSchedule[];
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
 * Describes the message domain.subscription.v1.ReadPriceScheduleResponse.
 * Use `create(ReadPriceScheduleResponseSchema)` to create a new message.
 */
export declare const ReadPriceScheduleResponseSchema: GenMessage<ReadPriceScheduleResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePriceScheduleRequest
 */
export type UpdatePriceScheduleRequest = Message<"domain.subscription.v1.UpdatePriceScheduleRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceSchedule data = 1;
     */
    data?: PriceSchedule;
};
/**
 * Describes the message domain.subscription.v1.UpdatePriceScheduleRequest.
 * Use `create(UpdatePriceScheduleRequestSchema)` to create a new message.
 */
export declare const UpdatePriceScheduleRequestSchema: GenMessage<UpdatePriceScheduleRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePriceScheduleResponse
 */
export type UpdatePriceScheduleResponse = Message<"domain.subscription.v1.UpdatePriceScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceSchedule data = 1;
     */
    data: PriceSchedule[];
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
 * Describes the message domain.subscription.v1.UpdatePriceScheduleResponse.
 * Use `create(UpdatePriceScheduleResponseSchema)` to create a new message.
 */
export declare const UpdatePriceScheduleResponseSchema: GenMessage<UpdatePriceScheduleResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePriceScheduleRequest
 */
export type DeletePriceScheduleRequest = Message<"domain.subscription.v1.DeletePriceScheduleRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PriceSchedule data = 1;
     */
    data?: PriceSchedule;
};
/**
 * Describes the message domain.subscription.v1.DeletePriceScheduleRequest.
 * Use `create(DeletePriceScheduleRequestSchema)` to create a new message.
 */
export declare const DeletePriceScheduleRequestSchema: GenMessage<DeletePriceScheduleRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePriceScheduleResponse
 */
export type DeletePriceScheduleResponse = Message<"domain.subscription.v1.DeletePriceScheduleResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePriceScheduleResponse.
 * Use `create(DeletePriceScheduleResponseSchema)` to create a new message.
 */
export declare const DeletePriceScheduleResponseSchema: GenMessage<DeletePriceScheduleResponse>;
/**
 * @generated from message domain.subscription.v1.ListPriceSchedulesRequest
 */
export type ListPriceSchedulesRequest = Message<"domain.subscription.v1.ListPriceSchedulesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPriceSchedulesRequest.
 * Use `create(ListPriceSchedulesRequestSchema)` to create a new message.
 */
export declare const ListPriceSchedulesRequestSchema: GenMessage<ListPriceSchedulesRequest>;
/**
 * @generated from message domain.subscription.v1.ListPriceSchedulesResponse
 */
export type ListPriceSchedulesResponse = Message<"domain.subscription.v1.ListPriceSchedulesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceSchedule data = 1;
     */
    data: PriceSchedule[];
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
 * Describes the message domain.subscription.v1.ListPriceSchedulesResponse.
 * Use `create(ListPriceSchedulesResponseSchema)` to create a new message.
 */
export declare const ListPriceSchedulesResponseSchema: GenMessage<ListPriceSchedulesResponse>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleListPageDataRequest
 */
export type GetPriceScheduleListPageDataRequest = Message<"domain.subscription.v1.GetPriceScheduleListPageDataRequest"> & {
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
 * Describes the message domain.subscription.v1.GetPriceScheduleListPageDataRequest.
 * Use `create(GetPriceScheduleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceScheduleListPageDataRequestSchema: GenMessage<GetPriceScheduleListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleListPageDataResponse
 */
export type GetPriceScheduleListPageDataResponse = Message<"domain.subscription.v1.GetPriceScheduleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PriceSchedule price_schedule_list = 1;
     */
    priceScheduleList: PriceSchedule[];
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
 * Describes the message domain.subscription.v1.GetPriceScheduleListPageDataResponse.
 * Use `create(GetPriceScheduleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceScheduleListPageDataResponseSchema: GenMessage<GetPriceScheduleListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleItemPageDataRequest
 */
export type GetPriceScheduleItemPageDataRequest = Message<"domain.subscription.v1.GetPriceScheduleItemPageDataRequest"> & {
    /**
     * @generated from field: string price_schedule_id = 1;
     */
    priceScheduleId: string;
};
/**
 * Describes the message domain.subscription.v1.GetPriceScheduleItemPageDataRequest.
 * Use `create(GetPriceScheduleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceScheduleItemPageDataRequestSchema: GenMessage<GetPriceScheduleItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetPriceScheduleItemPageDataResponse
 */
export type GetPriceScheduleItemPageDataResponse = Message<"domain.subscription.v1.GetPriceScheduleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.PriceSchedule price_schedule = 1;
     */
    priceSchedule?: PriceSchedule;
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
 * Describes the message domain.subscription.v1.GetPriceScheduleItemPageDataResponse.
 * Use `create(GetPriceScheduleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceScheduleItemPageDataResponseSchema: GenMessage<GetPriceScheduleItemPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.FindApplicablePriceScheduleRequest
 */
export type FindApplicablePriceScheduleRequest = Message<"domain.subscription.v1.FindApplicablePriceScheduleRequest"> & {
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
 * Describes the message domain.subscription.v1.FindApplicablePriceScheduleRequest.
 * Use `create(FindApplicablePriceScheduleRequestSchema)` to create a new message.
 */
export declare const FindApplicablePriceScheduleRequestSchema: GenMessage<FindApplicablePriceScheduleRequest>;
/**
 * @generated from message domain.subscription.v1.FindApplicablePriceScheduleResponse
 */
export type FindApplicablePriceScheduleResponse = Message<"domain.subscription.v1.FindApplicablePriceScheduleResponse"> & {
    /**
     * @generated from field: optional domain.subscription.v1.PriceSchedule price_schedule = 1;
     */
    priceSchedule?: PriceSchedule;
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
 * Describes the message domain.subscription.v1.FindApplicablePriceScheduleResponse.
 * Use `create(FindApplicablePriceScheduleResponseSchema)` to create a new message.
 */
export declare const FindApplicablePriceScheduleResponseSchema: GenMessage<FindApplicablePriceScheduleResponse>;
/**
 * @generated from service domain.subscription.v1.PriceScheduleDomainService
 */
export declare const PriceScheduleDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.CreatePriceSchedule
     */
    createPriceSchedule: {
        methodKind: "unary";
        input: typeof CreatePriceScheduleRequestSchema;
        output: typeof CreatePriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.ReadPriceSchedule
     */
    readPriceSchedule: {
        methodKind: "unary";
        input: typeof ReadPriceScheduleRequestSchema;
        output: typeof ReadPriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.UpdatePriceSchedule
     */
    updatePriceSchedule: {
        methodKind: "unary";
        input: typeof UpdatePriceScheduleRequestSchema;
        output: typeof UpdatePriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.DeletePriceSchedule
     */
    deletePriceSchedule: {
        methodKind: "unary";
        input: typeof DeletePriceScheduleRequestSchema;
        output: typeof DeletePriceScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.ListPriceSchedules
     */
    listPriceSchedules: {
        methodKind: "unary";
        input: typeof ListPriceSchedulesRequestSchema;
        output: typeof ListPriceSchedulesResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.GetPriceScheduleListPageData
     */
    getPriceScheduleListPageData: {
        methodKind: "unary";
        input: typeof GetPriceScheduleListPageDataRequestSchema;
        output: typeof GetPriceScheduleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.GetPriceScheduleItemPageData
     */
    getPriceScheduleItemPageData: {
        methodKind: "unary";
        input: typeof GetPriceScheduleItemPageDataRequestSchema;
        output: typeof GetPriceScheduleItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PriceScheduleDomainService.FindApplicablePriceSchedule
     */
    findApplicablePriceSchedule: {
        methodKind: "unary";
        input: typeof FindApplicablePriceScheduleRequestSchema;
        output: typeof FindApplicablePriceScheduleResponseSchema;
    };
}>;
