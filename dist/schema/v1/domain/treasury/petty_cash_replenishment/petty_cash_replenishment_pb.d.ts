import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/petty_cash_replenishment/petty_cash_replenishment.proto.
 */
export declare const file_domain_treasury_petty_cash_replenishment_petty_cash_replenishment: GenFile;
/**
 * PettyCashReplenishment records a fund replenishment event that covers one or more vouchers.
 * Posting this event creates a JournalEntry (source type: PETTY_CASH_REPLENISHMENT).
 *
 * @generated from message domain.treasury.v1.PettyCashReplenishment
 */
export type PettyCashReplenishment = Message<"domain.treasury.v1.PettyCashReplenishment"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent fund
     *
     * @generated from field: string fund_id = 2;
     */
    fundId: string;
    /**
     * @generated from field: string replenishment_number = 3;
     */
    replenishmentNumber: string;
    /**
     * Total cash returned to fund (sum of vouchers)
     *
     * @generated from field: double amount = 4;
     */
    amount: number;
    /**
     * @generated from field: int64 replenishment_date = 5;
     */
    replenishmentDate: bigint;
    /**
     * @generated from field: optional string replenishment_date_string = 6;
     */
    replenishmentDateString?: string;
    /**
     * Vouchers covered by this replenishment
     *
     * FK to petty_cash_voucher (repeated)
     *
     * @generated from field: repeated string voucher_ids = 7;
     */
    voucherIds: string[];
    /**
     * FK to entity.User
     *
     * @generated from field: optional string posted_by = 8;
     */
    postedBy?: string;
    /**
     * @generated from field: optional string notes = 9;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 10;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 11;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.treasury.v1.PettyCashReplenishment.
 * Use `create(PettyCashReplenishmentSchema)` to create a new message.
 */
export declare const PettyCashReplenishmentSchema: GenMessage<PettyCashReplenishment>;
/**
 * @generated from message domain.treasury.v1.CreatePettyCashReplenishmentRequest
 */
export type CreatePettyCashReplenishmentRequest = Message<"domain.treasury.v1.CreatePettyCashReplenishmentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data?: PettyCashReplenishment;
};
/**
 * Describes the message domain.treasury.v1.CreatePettyCashReplenishmentRequest.
 * Use `create(CreatePettyCashReplenishmentRequestSchema)` to create a new message.
 */
export declare const CreatePettyCashReplenishmentRequestSchema: GenMessage<CreatePettyCashReplenishmentRequest>;
/**
 * @generated from message domain.treasury.v1.CreatePettyCashReplenishmentResponse
 */
export type CreatePettyCashReplenishmentResponse = Message<"domain.treasury.v1.CreatePettyCashReplenishmentResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data: PettyCashReplenishment[];
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
 * Describes the message domain.treasury.v1.CreatePettyCashReplenishmentResponse.
 * Use `create(CreatePettyCashReplenishmentResponseSchema)` to create a new message.
 */
export declare const CreatePettyCashReplenishmentResponseSchema: GenMessage<CreatePettyCashReplenishmentResponse>;
/**
 * @generated from message domain.treasury.v1.ReadPettyCashReplenishmentRequest
 */
export type ReadPettyCashReplenishmentRequest = Message<"domain.treasury.v1.ReadPettyCashReplenishmentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data?: PettyCashReplenishment;
};
/**
 * Describes the message domain.treasury.v1.ReadPettyCashReplenishmentRequest.
 * Use `create(ReadPettyCashReplenishmentRequestSchema)` to create a new message.
 */
export declare const ReadPettyCashReplenishmentRequestSchema: GenMessage<ReadPettyCashReplenishmentRequest>;
/**
 * @generated from message domain.treasury.v1.ReadPettyCashReplenishmentResponse
 */
export type ReadPettyCashReplenishmentResponse = Message<"domain.treasury.v1.ReadPettyCashReplenishmentResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data: PettyCashReplenishment[];
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
 * Describes the message domain.treasury.v1.ReadPettyCashReplenishmentResponse.
 * Use `create(ReadPettyCashReplenishmentResponseSchema)` to create a new message.
 */
export declare const ReadPettyCashReplenishmentResponseSchema: GenMessage<ReadPettyCashReplenishmentResponse>;
/**
 * @generated from message domain.treasury.v1.UpdatePettyCashReplenishmentRequest
 */
export type UpdatePettyCashReplenishmentRequest = Message<"domain.treasury.v1.UpdatePettyCashReplenishmentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data?: PettyCashReplenishment;
};
/**
 * Describes the message domain.treasury.v1.UpdatePettyCashReplenishmentRequest.
 * Use `create(UpdatePettyCashReplenishmentRequestSchema)` to create a new message.
 */
export declare const UpdatePettyCashReplenishmentRequestSchema: GenMessage<UpdatePettyCashReplenishmentRequest>;
/**
 * @generated from message domain.treasury.v1.UpdatePettyCashReplenishmentResponse
 */
export type UpdatePettyCashReplenishmentResponse = Message<"domain.treasury.v1.UpdatePettyCashReplenishmentResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data: PettyCashReplenishment[];
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
 * Describes the message domain.treasury.v1.UpdatePettyCashReplenishmentResponse.
 * Use `create(UpdatePettyCashReplenishmentResponseSchema)` to create a new message.
 */
export declare const UpdatePettyCashReplenishmentResponseSchema: GenMessage<UpdatePettyCashReplenishmentResponse>;
/**
 * @generated from message domain.treasury.v1.DeletePettyCashReplenishmentRequest
 */
export type DeletePettyCashReplenishmentRequest = Message<"domain.treasury.v1.DeletePettyCashReplenishmentRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data?: PettyCashReplenishment;
};
/**
 * Describes the message domain.treasury.v1.DeletePettyCashReplenishmentRequest.
 * Use `create(DeletePettyCashReplenishmentRequestSchema)` to create a new message.
 */
export declare const DeletePettyCashReplenishmentRequestSchema: GenMessage<DeletePettyCashReplenishmentRequest>;
/**
 * @generated from message domain.treasury.v1.DeletePettyCashReplenishmentResponse
 */
export type DeletePettyCashReplenishmentResponse = Message<"domain.treasury.v1.DeletePettyCashReplenishmentResponse"> & {
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
 * Describes the message domain.treasury.v1.DeletePettyCashReplenishmentResponse.
 * Use `create(DeletePettyCashReplenishmentResponseSchema)` to create a new message.
 */
export declare const DeletePettyCashReplenishmentResponseSchema: GenMessage<DeletePettyCashReplenishmentResponse>;
/**
 * @generated from message domain.treasury.v1.ListPettyCashReplenishmentsRequest
 */
export type ListPettyCashReplenishmentsRequest = Message<"domain.treasury.v1.ListPettyCashReplenishmentsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListPettyCashReplenishmentsRequest.
 * Use `create(ListPettyCashReplenishmentsRequestSchema)` to create a new message.
 */
export declare const ListPettyCashReplenishmentsRequestSchema: GenMessage<ListPettyCashReplenishmentsRequest>;
/**
 * @generated from message domain.treasury.v1.ListPettyCashReplenishmentsResponse
 */
export type ListPettyCashReplenishmentsResponse = Message<"domain.treasury.v1.ListPettyCashReplenishmentsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashReplenishment data = 1;
     */
    data: PettyCashReplenishment[];
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
 * Describes the message domain.treasury.v1.ListPettyCashReplenishmentsResponse.
 * Use `create(ListPettyCashReplenishmentsResponseSchema)` to create a new message.
 */
export declare const ListPettyCashReplenishmentsResponseSchema: GenMessage<ListPettyCashReplenishmentsResponse>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashReplenishmentListPageDataRequest
 */
export type GetPettyCashReplenishmentListPageDataRequest = Message<"domain.treasury.v1.GetPettyCashReplenishmentListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetPettyCashReplenishmentListPageDataRequest.
 * Use `create(GetPettyCashReplenishmentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPettyCashReplenishmentListPageDataRequestSchema: GenMessage<GetPettyCashReplenishmentListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashReplenishmentListPageDataResponse
 */
export type GetPettyCashReplenishmentListPageDataResponse = Message<"domain.treasury.v1.GetPettyCashReplenishmentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashReplenishment petty_cash_replenishment_list = 1;
     */
    pettyCashReplenishmentList: PettyCashReplenishment[];
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
 * Describes the message domain.treasury.v1.GetPettyCashReplenishmentListPageDataResponse.
 * Use `create(GetPettyCashReplenishmentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPettyCashReplenishmentListPageDataResponseSchema: GenMessage<GetPettyCashReplenishmentListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashReplenishmentItemPageDataRequest
 */
export type GetPettyCashReplenishmentItemPageDataRequest = Message<"domain.treasury.v1.GetPettyCashReplenishmentItemPageDataRequest"> & {
    /**
     * @generated from field: string petty_cash_replenishment_id = 1;
     */
    pettyCashReplenishmentId: string;
};
/**
 * Describes the message domain.treasury.v1.GetPettyCashReplenishmentItemPageDataRequest.
 * Use `create(GetPettyCashReplenishmentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPettyCashReplenishmentItemPageDataRequestSchema: GenMessage<GetPettyCashReplenishmentItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashReplenishmentItemPageDataResponse
 */
export type GetPettyCashReplenishmentItemPageDataResponse = Message<"domain.treasury.v1.GetPettyCashReplenishmentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.PettyCashReplenishment petty_cash_replenishment = 1;
     */
    pettyCashReplenishment?: PettyCashReplenishment;
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
 * Describes the message domain.treasury.v1.GetPettyCashReplenishmentItemPageDataResponse.
 * Use `create(GetPettyCashReplenishmentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPettyCashReplenishmentItemPageDataResponseSchema: GenMessage<GetPettyCashReplenishmentItemPageDataResponse>;
/**
 * @generated from service domain.treasury.v1.PettyCashReplenishmentDomainService
 */
export declare const PettyCashReplenishmentDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.CreatePettyCashReplenishment
     */
    createPettyCashReplenishment: {
        methodKind: "unary";
        input: typeof CreatePettyCashReplenishmentRequestSchema;
        output: typeof CreatePettyCashReplenishmentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.ReadPettyCashReplenishment
     */
    readPettyCashReplenishment: {
        methodKind: "unary";
        input: typeof ReadPettyCashReplenishmentRequestSchema;
        output: typeof ReadPettyCashReplenishmentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.UpdatePettyCashReplenishment
     */
    updatePettyCashReplenishment: {
        methodKind: "unary";
        input: typeof UpdatePettyCashReplenishmentRequestSchema;
        output: typeof UpdatePettyCashReplenishmentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.DeletePettyCashReplenishment
     */
    deletePettyCashReplenishment: {
        methodKind: "unary";
        input: typeof DeletePettyCashReplenishmentRequestSchema;
        output: typeof DeletePettyCashReplenishmentResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.ListPettyCashReplenishments
     */
    listPettyCashReplenishments: {
        methodKind: "unary";
        input: typeof ListPettyCashReplenishmentsRequestSchema;
        output: typeof ListPettyCashReplenishmentsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.GetPettyCashReplenishmentListPageData
     */
    getPettyCashReplenishmentListPageData: {
        methodKind: "unary";
        input: typeof GetPettyCashReplenishmentListPageDataRequestSchema;
        output: typeof GetPettyCashReplenishmentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashReplenishmentDomainService.GetPettyCashReplenishmentItemPageData
     */
    getPettyCashReplenishmentItemPageData: {
        methodKind: "unary";
        input: typeof GetPettyCashReplenishmentItemPageDataRequestSchema;
        output: typeof GetPettyCashReplenishmentItemPageDataResponseSchema;
    };
}>;
