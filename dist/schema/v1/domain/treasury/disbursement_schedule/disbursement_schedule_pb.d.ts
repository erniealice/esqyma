import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/disbursement_schedule/disbursement_schedule.proto.
 */
export declare const file_domain_treasury_disbursement_schedule_disbursement_schedule: GenFile;
/**
 * @generated from message domain.treasury.v1.DisbursementSchedule
 */
export type DisbursementSchedule = Message<"domain.treasury.v1.DisbursementSchedule"> & {
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
     * FK to expenditure
     *
     * @generated from field: string expenditure_id = 7;
     */
    expenditureId: string;
    /**
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
     * @generated from field: optional int64 paid_amount = 13;
     */
    paidAmount?: bigint;
    /**
     * @generated from field: optional int64 paid_date = 14;
     */
    paidDate?: bigint;
    /**
     * FK to disbursement (when paid)
     *
     * @generated from field: optional string disbursement_id = 15;
     */
    disbursementId?: string;
    /**
     * @generated from field: optional string payment_term_id = 16;
     */
    paymentTermId?: string;
};
/**
 * Describes the message domain.treasury.v1.DisbursementSchedule.
 * Use `create(DisbursementScheduleSchema)` to create a new message.
 */
export declare const DisbursementScheduleSchema: GenMessage<DisbursementSchedule>;
/**
 * @generated from message domain.treasury.v1.CreateDisbursementScheduleRequest
 */
export type CreateDisbursementScheduleRequest = Message<"domain.treasury.v1.CreateDisbursementScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data?: DisbursementSchedule;
};
/**
 * Describes the message domain.treasury.v1.CreateDisbursementScheduleRequest.
 * Use `create(CreateDisbursementScheduleRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementScheduleRequestSchema: GenMessage<CreateDisbursementScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.CreateDisbursementScheduleResponse
 */
export type CreateDisbursementScheduleResponse = Message<"domain.treasury.v1.CreateDisbursementScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data: DisbursementSchedule[];
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
 * Describes the message domain.treasury.v1.CreateDisbursementScheduleResponse.
 * Use `create(CreateDisbursementScheduleResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementScheduleResponseSchema: GenMessage<CreateDisbursementScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.ReadDisbursementScheduleRequest
 */
export type ReadDisbursementScheduleRequest = Message<"domain.treasury.v1.ReadDisbursementScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data?: DisbursementSchedule;
};
/**
 * Describes the message domain.treasury.v1.ReadDisbursementScheduleRequest.
 * Use `create(ReadDisbursementScheduleRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementScheduleRequestSchema: GenMessage<ReadDisbursementScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.ReadDisbursementScheduleResponse
 */
export type ReadDisbursementScheduleResponse = Message<"domain.treasury.v1.ReadDisbursementScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data: DisbursementSchedule[];
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
 * Describes the message domain.treasury.v1.ReadDisbursementScheduleResponse.
 * Use `create(ReadDisbursementScheduleResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementScheduleResponseSchema: GenMessage<ReadDisbursementScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateDisbursementScheduleRequest
 */
export type UpdateDisbursementScheduleRequest = Message<"domain.treasury.v1.UpdateDisbursementScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data?: DisbursementSchedule;
};
/**
 * Describes the message domain.treasury.v1.UpdateDisbursementScheduleRequest.
 * Use `create(UpdateDisbursementScheduleRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementScheduleRequestSchema: GenMessage<UpdateDisbursementScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateDisbursementScheduleResponse
 */
export type UpdateDisbursementScheduleResponse = Message<"domain.treasury.v1.UpdateDisbursementScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data: DisbursementSchedule[];
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
 * Describes the message domain.treasury.v1.UpdateDisbursementScheduleResponse.
 * Use `create(UpdateDisbursementScheduleResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementScheduleResponseSchema: GenMessage<UpdateDisbursementScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteDisbursementScheduleRequest
 */
export type DeleteDisbursementScheduleRequest = Message<"domain.treasury.v1.DeleteDisbursementScheduleRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data?: DisbursementSchedule;
};
/**
 * Describes the message domain.treasury.v1.DeleteDisbursementScheduleRequest.
 * Use `create(DeleteDisbursementScheduleRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementScheduleRequestSchema: GenMessage<DeleteDisbursementScheduleRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteDisbursementScheduleResponse
 */
export type DeleteDisbursementScheduleResponse = Message<"domain.treasury.v1.DeleteDisbursementScheduleResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteDisbursementScheduleResponse.
 * Use `create(DeleteDisbursementScheduleResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementScheduleResponseSchema: GenMessage<DeleteDisbursementScheduleResponse>;
/**
 * @generated from message domain.treasury.v1.ListDisbursementSchedulesRequest
 */
export type ListDisbursementSchedulesRequest = Message<"domain.treasury.v1.ListDisbursementSchedulesRequest"> & {
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
 * Describes the message domain.treasury.v1.ListDisbursementSchedulesRequest.
 * Use `create(ListDisbursementSchedulesRequestSchema)` to create a new message.
 */
export declare const ListDisbursementSchedulesRequestSchema: GenMessage<ListDisbursementSchedulesRequest>;
/**
 * @generated from message domain.treasury.v1.ListDisbursementSchedulesResponse
 */
export type ListDisbursementSchedulesResponse = Message<"domain.treasury.v1.ListDisbursementSchedulesResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSchedule data = 1;
     */
    data: DisbursementSchedule[];
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
 * Describes the message domain.treasury.v1.ListDisbursementSchedulesResponse.
 * Use `create(ListDisbursementSchedulesResponseSchema)` to create a new message.
 */
export declare const ListDisbursementSchedulesResponseSchema: GenMessage<ListDisbursementSchedulesResponse>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementScheduleListPageDataRequest
 */
export type GetDisbursementScheduleListPageDataRequest = Message<"domain.treasury.v1.GetDisbursementScheduleListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetDisbursementScheduleListPageDataRequest.
 * Use `create(GetDisbursementScheduleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementScheduleListPageDataRequestSchema: GenMessage<GetDisbursementScheduleListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementScheduleListPageDataResponse
 */
export type GetDisbursementScheduleListPageDataResponse = Message<"domain.treasury.v1.GetDisbursementScheduleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.DisbursementSchedule disbursement_schedule_list = 1;
     */
    disbursementScheduleList: DisbursementSchedule[];
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
 * Describes the message domain.treasury.v1.GetDisbursementScheduleListPageDataResponse.
 * Use `create(GetDisbursementScheduleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementScheduleListPageDataResponseSchema: GenMessage<GetDisbursementScheduleListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementScheduleItemPageDataRequest
 */
export type GetDisbursementScheduleItemPageDataRequest = Message<"domain.treasury.v1.GetDisbursementScheduleItemPageDataRequest"> & {
    /**
     * @generated from field: string disbursement_schedule_id = 1;
     */
    disbursementScheduleId: string;
};
/**
 * Describes the message domain.treasury.v1.GetDisbursementScheduleItemPageDataRequest.
 * Use `create(GetDisbursementScheduleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementScheduleItemPageDataRequestSchema: GenMessage<GetDisbursementScheduleItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementScheduleItemPageDataResponse
 */
export type GetDisbursementScheduleItemPageDataResponse = Message<"domain.treasury.v1.GetDisbursementScheduleItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.DisbursementSchedule disbursement_schedule = 1;
     */
    disbursementSchedule?: DisbursementSchedule;
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
 * Describes the message domain.treasury.v1.GetDisbursementScheduleItemPageDataResponse.
 * Use `create(GetDisbursementScheduleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementScheduleItemPageDataResponseSchema: GenMessage<GetDisbursementScheduleItemPageDataResponse>;
/**
 * @generated from service domain.treasury.v1.DisbursementScheduleDomainService
 */
export declare const DisbursementScheduleDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.CreateDisbursementSchedule
     */
    createDisbursementSchedule: {
        methodKind: "unary";
        input: typeof CreateDisbursementScheduleRequestSchema;
        output: typeof CreateDisbursementScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.ReadDisbursementSchedule
     */
    readDisbursementSchedule: {
        methodKind: "unary";
        input: typeof ReadDisbursementScheduleRequestSchema;
        output: typeof ReadDisbursementScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.UpdateDisbursementSchedule
     */
    updateDisbursementSchedule: {
        methodKind: "unary";
        input: typeof UpdateDisbursementScheduleRequestSchema;
        output: typeof UpdateDisbursementScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.DeleteDisbursementSchedule
     */
    deleteDisbursementSchedule: {
        methodKind: "unary";
        input: typeof DeleteDisbursementScheduleRequestSchema;
        output: typeof DeleteDisbursementScheduleResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.ListDisbursementSchedules
     */
    listDisbursementSchedules: {
        methodKind: "unary";
        input: typeof ListDisbursementSchedulesRequestSchema;
        output: typeof ListDisbursementSchedulesResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.GetDisbursementScheduleListPageData
     */
    getDisbursementScheduleListPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementScheduleListPageDataRequestSchema;
        output: typeof GetDisbursementScheduleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementScheduleDomainService.GetDisbursementScheduleItemPageData
     */
    getDisbursementScheduleItemPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementScheduleItemPageDataRequestSchema;
        output: typeof GetDisbursementScheduleItemPageDataResponseSchema;
    };
}>;
