import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/collection_schedule/collection_schedule.proto.
 */
export declare const file_domain_treasury_collection_schedule_collection_schedule: GenFile;
/**
 * @generated from message domain.treasury.v1.CollectionSchedule
 */
export type CollectionSchedule = Message<"domain.treasury.v1.CollectionSchedule"> & {
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
     * FK to revenue
     *
     * @generated from field: string revenue_id = 7;
     */
    revenueId: string;
    /**
     * Installment number (1, 2, 3...)
     *
     * @generated from field: int32 sequence = 8;
     */
    sequence: number;
    /**
     * Centavos
     *
     * @generated from field: int64 amount = 9;
     */
    amount: bigint;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string due_date = 10;
     */
    dueDate: string;
    /**
     * "pending", "paid", "partial", "overdue"
     *
     * @generated from field: string status = 12;
     */
    status: string;
    /**
     * Centavos collected so far
     *
     * @generated from field: optional int64 paid_amount = 13;
     */
    paidAmount?: bigint;
    /**
     * @generated from field: optional int64 paid_date = 14;
     */
    paidDate?: bigint;
    /**
     * FK to collection (when paid)
     *
     * @generated from field: optional string collection_id = 15;
     */
    collectionId?: string;
    /**
     * FK to payment_term
     *
     * @generated from field: optional string payment_term_id = 16;
     */
    paymentTermId?: string;
};
/**
 * Describes the message domain.treasury.v1.CollectionSchedule.
 * Use `create(CollectionScheduleSchema)` to create a new message.
 */
export declare const CollectionScheduleSchema: GenMessage<CollectionSchedule>;
/**
 * @generated from message domain.treasury.v1.CreateCollectionScheduleRequest
 */
export type CreateCollectionScheduleRequest = Message<"domain.treasury.v1.CreateCollectionScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionSchedule data = 1;
     */
    data?: CollectionSchedule;
};
/**
 * Describes the message domain.treasury.v1.CreateCollectionScheduleRequest.
 * Use `create(CreateCollectionScheduleRequestSchema)` to create a new message.
 */
export declare const CreateCollectionScheduleRequestSchema: GenMessage<CreateCollectionScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.CreateCollectionScheduleResponse
 */
export type CreateCollectionScheduleResponse = Message<"domain.treasury.v1.CreateCollectionScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionSchedule data = 1;
     */
    data: CollectionSchedule[];
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
 * Describes the message domain.treasury.v1.CreateCollectionScheduleResponse.
 * Use `create(CreateCollectionScheduleResponseSchema)` to create a new message.
 */
export declare const CreateCollectionScheduleResponseSchema: GenMessage<CreateCollectionScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.ReadCollectionScheduleRequest
 */
export type ReadCollectionScheduleRequest = Message<"domain.treasury.v1.ReadCollectionScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionSchedule data = 1;
     */
    data?: CollectionSchedule;
};
/**
 * Describes the message domain.treasury.v1.ReadCollectionScheduleRequest.
 * Use `create(ReadCollectionScheduleRequestSchema)` to create a new message.
 */
export declare const ReadCollectionScheduleRequestSchema: GenMessage<ReadCollectionScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.ReadCollectionScheduleResponse
 */
export type ReadCollectionScheduleResponse = Message<"domain.treasury.v1.ReadCollectionScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionSchedule data = 1;
     */
    data: CollectionSchedule[];
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
 * Describes the message domain.treasury.v1.ReadCollectionScheduleResponse.
 * Use `create(ReadCollectionScheduleResponseSchema)` to create a new message.
 */
export declare const ReadCollectionScheduleResponseSchema: GenMessage<ReadCollectionScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateCollectionScheduleRequest
 */
export type UpdateCollectionScheduleRequest = Message<"domain.treasury.v1.UpdateCollectionScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionSchedule data = 1;
     */
    data?: CollectionSchedule;
};
/**
 * Describes the message domain.treasury.v1.UpdateCollectionScheduleRequest.
 * Use `create(UpdateCollectionScheduleRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionScheduleRequestSchema: GenMessage<UpdateCollectionScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateCollectionScheduleResponse
 */
export type UpdateCollectionScheduleResponse = Message<"domain.treasury.v1.UpdateCollectionScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionSchedule data = 1;
     */
    data: CollectionSchedule[];
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
 * Describes the message domain.treasury.v1.UpdateCollectionScheduleResponse.
 * Use `create(UpdateCollectionScheduleResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionScheduleResponseSchema: GenMessage<UpdateCollectionScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteCollectionScheduleRequest
 */
export type DeleteCollectionScheduleRequest = Message<"domain.treasury.v1.DeleteCollectionScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.CollectionSchedule data = 1;
     */
    data?: CollectionSchedule;
};
/**
 * Describes the message domain.treasury.v1.DeleteCollectionScheduleRequest.
 * Use `create(DeleteCollectionScheduleRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionScheduleRequestSchema: GenMessage<DeleteCollectionScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteCollectionScheduleResponse
 */
export type DeleteCollectionScheduleResponse = Message<"domain.treasury.v1.DeleteCollectionScheduleResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteCollectionScheduleResponse.
 * Use `create(DeleteCollectionScheduleResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionScheduleResponseSchema: GenMessage<DeleteCollectionScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.ListCollectionSchedulesRequest
 */
export type ListCollectionSchedulesRequest = Message<"domain.treasury.v1.ListCollectionSchedulesRequest"> & {
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
 * Describes the message domain.treasury.v1.ListCollectionSchedulesRequest.
 * Use `create(ListCollectionSchedulesRequestSchema)` to create a new message.
 */
export declare const ListCollectionSchedulesRequestSchema: GenMessage<ListCollectionSchedulesRequest>;
/**
 * @generated from message domain.treasury.v1.ListCollectionSchedulesResponse
 */
export type ListCollectionSchedulesResponse = Message<"domain.treasury.v1.ListCollectionSchedulesResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionSchedule data = 1;
     */
    data: CollectionSchedule[];
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
 * Describes the message domain.treasury.v1.ListCollectionSchedulesResponse.
 * Use `create(ListCollectionSchedulesResponseSchema)` to create a new message.
 */
export declare const ListCollectionSchedulesResponseSchema: GenMessage<ListCollectionSchedulesResponse>;
/**
 * @generated from message domain.treasury.v1.GetCollectionScheduleListPageDataRequest
 */
export type GetCollectionScheduleListPageDataRequest = Message<"domain.treasury.v1.GetCollectionScheduleListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetCollectionScheduleListPageDataRequest.
 * Use `create(GetCollectionScheduleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionScheduleListPageDataRequestSchema: GenMessage<GetCollectionScheduleListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetCollectionScheduleListPageDataResponse
 */
export type GetCollectionScheduleListPageDataResponse = Message<"domain.treasury.v1.GetCollectionScheduleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.CollectionSchedule collection_schedule_list = 1;
     */
    collectionScheduleList: CollectionSchedule[];
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
 * Describes the message domain.treasury.v1.GetCollectionScheduleListPageDataResponse.
 * Use `create(GetCollectionScheduleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionScheduleListPageDataResponseSchema: GenMessage<GetCollectionScheduleListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetCollectionScheduleItemPageDataRequest
 */
export type GetCollectionScheduleItemPageDataRequest = Message<"domain.treasury.v1.GetCollectionScheduleItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_schedule_id = 1;
     */
    collectionScheduleId: string;
};
/**
 * Describes the message domain.treasury.v1.GetCollectionScheduleItemPageDataRequest.
 * Use `create(GetCollectionScheduleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionScheduleItemPageDataRequestSchema: GenMessage<GetCollectionScheduleItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetCollectionScheduleItemPageDataResponse
 */
export type GetCollectionScheduleItemPageDataResponse = Message<"domain.treasury.v1.GetCollectionScheduleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.CollectionSchedule collection_schedule = 1;
     */
    collectionSchedule?: CollectionSchedule;
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
 * Describes the message domain.treasury.v1.GetCollectionScheduleItemPageDataResponse.
 * Use `create(GetCollectionScheduleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionScheduleItemPageDataResponseSchema: GenMessage<GetCollectionScheduleItemPageDataResponse>;
/**
 * @generated from service domain.treasury.v1.CollectionScheduleDomainService
 */
export declare const CollectionScheduleDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.CreateCollectionSchedule
     */
    createCollectionSchedule: {
        methodKind: "unary";
        input: typeof CreateCollectionScheduleRequestSchema;
        output: typeof CreateCollectionScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.ReadCollectionSchedule
     */
    readCollectionSchedule: {
        methodKind: "unary";
        input: typeof ReadCollectionScheduleRequestSchema;
        output: typeof ReadCollectionScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.UpdateCollectionSchedule
     */
    updateCollectionSchedule: {
        methodKind: "unary";
        input: typeof UpdateCollectionScheduleRequestSchema;
        output: typeof UpdateCollectionScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.DeleteCollectionSchedule
     */
    deleteCollectionSchedule: {
        methodKind: "unary";
        input: typeof DeleteCollectionScheduleRequestSchema;
        output: typeof DeleteCollectionScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.ListCollectionSchedules
     */
    listCollectionSchedules: {
        methodKind: "unary";
        input: typeof ListCollectionSchedulesRequestSchema;
        output: typeof ListCollectionSchedulesResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.GetCollectionScheduleListPageData
     */
    getCollectionScheduleListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionScheduleListPageDataRequestSchema;
        output: typeof GetCollectionScheduleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionScheduleDomainService.GetCollectionScheduleItemPageData
     */
    getCollectionScheduleItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionScheduleItemPageDataRequestSchema;
        output: typeof GetCollectionScheduleItemPageDataResponseSchema;
    };
}>;
