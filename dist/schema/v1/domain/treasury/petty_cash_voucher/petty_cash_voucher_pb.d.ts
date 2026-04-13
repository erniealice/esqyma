import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/petty_cash_voucher/petty_cash_voucher.proto.
 */
export declare const file_domain_treasury_petty_cash_voucher_petty_cash_voucher: GenFile;
/**
 * PettyCashVoucher is an individual expense voucher issued against a PettyCashFund.
 * Multiple vouchers are grouped into a PettyCashReplenishment to restore the fund balance.
 *
 * @generated from message domain.treasury.v1.PettyCashVoucher
 */
export type PettyCashVoucher = Message<"domain.treasury.v1.PettyCashVoucher"> & {
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
     * @generated from field: string voucher_number = 3;
     */
    voucherNumber: string;
    /**
     * @generated from field: optional string payee = 4;
     */
    payee?: string;
    /**
     * @generated from field: string description = 5;
     */
    description: string;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 6;
     */
    totalAmount: bigint;
    /**
     * @generated from field: domain.treasury.v1.VoucherStatus status = 7;
     */
    status: VoucherStatus;
    /**
     * Approval
     *
     * FK to entity.User
     *
     * @generated from field: optional string approved_by = 8;
     */
    approvedBy?: string;
    /**
     * @generated from field: optional int64 approved_at = 9;
     */
    approvedAt?: bigint;
    /**
     * @generated from field: optional string approved_at_string = 10;
     */
    approvedAtString?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.treasury.v1.PettyCashVoucher.
 * Use `create(PettyCashVoucherSchema)` to create a new message.
 */
export declare const PettyCashVoucherSchema: GenMessage<PettyCashVoucher>;
/**
 * @generated from message domain.treasury.v1.CreatePettyCashVoucherRequest
 */
export type CreatePettyCashVoucherRequest = Message<"domain.treasury.v1.CreatePettyCashVoucherRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data?: PettyCashVoucher;
};
/**
 * Describes the message domain.treasury.v1.CreatePettyCashVoucherRequest.
 * Use `create(CreatePettyCashVoucherRequestSchema)` to create a new message.
 */
export declare const CreatePettyCashVoucherRequestSchema: GenMessage<CreatePettyCashVoucherRequest>;
/**
 * @generated from message domain.treasury.v1.CreatePettyCashVoucherResponse
 */
export type CreatePettyCashVoucherResponse = Message<"domain.treasury.v1.CreatePettyCashVoucherResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data: PettyCashVoucher[];
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
 * Describes the message domain.treasury.v1.CreatePettyCashVoucherResponse.
 * Use `create(CreatePettyCashVoucherResponseSchema)` to create a new message.
 */
export declare const CreatePettyCashVoucherResponseSchema: GenMessage<CreatePettyCashVoucherResponse>;
/**
 * @generated from message domain.treasury.v1.ReadPettyCashVoucherRequest
 */
export type ReadPettyCashVoucherRequest = Message<"domain.treasury.v1.ReadPettyCashVoucherRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data?: PettyCashVoucher;
};
/**
 * Describes the message domain.treasury.v1.ReadPettyCashVoucherRequest.
 * Use `create(ReadPettyCashVoucherRequestSchema)` to create a new message.
 */
export declare const ReadPettyCashVoucherRequestSchema: GenMessage<ReadPettyCashVoucherRequest>;
/**
 * @generated from message domain.treasury.v1.ReadPettyCashVoucherResponse
 */
export type ReadPettyCashVoucherResponse = Message<"domain.treasury.v1.ReadPettyCashVoucherResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data: PettyCashVoucher[];
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
 * Describes the message domain.treasury.v1.ReadPettyCashVoucherResponse.
 * Use `create(ReadPettyCashVoucherResponseSchema)` to create a new message.
 */
export declare const ReadPettyCashVoucherResponseSchema: GenMessage<ReadPettyCashVoucherResponse>;
/**
 * @generated from message domain.treasury.v1.UpdatePettyCashVoucherRequest
 */
export type UpdatePettyCashVoucherRequest = Message<"domain.treasury.v1.UpdatePettyCashVoucherRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data?: PettyCashVoucher;
};
/**
 * Describes the message domain.treasury.v1.UpdatePettyCashVoucherRequest.
 * Use `create(UpdatePettyCashVoucherRequestSchema)` to create a new message.
 */
export declare const UpdatePettyCashVoucherRequestSchema: GenMessage<UpdatePettyCashVoucherRequest>;
/**
 * @generated from message domain.treasury.v1.UpdatePettyCashVoucherResponse
 */
export type UpdatePettyCashVoucherResponse = Message<"domain.treasury.v1.UpdatePettyCashVoucherResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data: PettyCashVoucher[];
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
 * Describes the message domain.treasury.v1.UpdatePettyCashVoucherResponse.
 * Use `create(UpdatePettyCashVoucherResponseSchema)` to create a new message.
 */
export declare const UpdatePettyCashVoucherResponseSchema: GenMessage<UpdatePettyCashVoucherResponse>;
/**
 * @generated from message domain.treasury.v1.DeletePettyCashVoucherRequest
 */
export type DeletePettyCashVoucherRequest = Message<"domain.treasury.v1.DeletePettyCashVoucherRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data?: PettyCashVoucher;
};
/**
 * Describes the message domain.treasury.v1.DeletePettyCashVoucherRequest.
 * Use `create(DeletePettyCashVoucherRequestSchema)` to create a new message.
 */
export declare const DeletePettyCashVoucherRequestSchema: GenMessage<DeletePettyCashVoucherRequest>;
/**
 * @generated from message domain.treasury.v1.DeletePettyCashVoucherResponse
 */
export type DeletePettyCashVoucherResponse = Message<"domain.treasury.v1.DeletePettyCashVoucherResponse"> & {
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
 * Describes the message domain.treasury.v1.DeletePettyCashVoucherResponse.
 * Use `create(DeletePettyCashVoucherResponseSchema)` to create a new message.
 */
export declare const DeletePettyCashVoucherResponseSchema: GenMessage<DeletePettyCashVoucherResponse>;
/**
 * @generated from message domain.treasury.v1.ListPettyCashVouchersRequest
 */
export type ListPettyCashVouchersRequest = Message<"domain.treasury.v1.ListPettyCashVouchersRequest"> & {
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
 * Describes the message domain.treasury.v1.ListPettyCashVouchersRequest.
 * Use `create(ListPettyCashVouchersRequestSchema)` to create a new message.
 */
export declare const ListPettyCashVouchersRequestSchema: GenMessage<ListPettyCashVouchersRequest>;
/**
 * @generated from message domain.treasury.v1.ListPettyCashVouchersResponse
 */
export type ListPettyCashVouchersResponse = Message<"domain.treasury.v1.ListPettyCashVouchersResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashVoucher data = 1;
     */
    data: PettyCashVoucher[];
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
 * Describes the message domain.treasury.v1.ListPettyCashVouchersResponse.
 * Use `create(ListPettyCashVouchersResponseSchema)` to create a new message.
 */
export declare const ListPettyCashVouchersResponseSchema: GenMessage<ListPettyCashVouchersResponse>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashVoucherListPageDataRequest
 */
export type GetPettyCashVoucherListPageDataRequest = Message<"domain.treasury.v1.GetPettyCashVoucherListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetPettyCashVoucherListPageDataRequest.
 * Use `create(GetPettyCashVoucherListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPettyCashVoucherListPageDataRequestSchema: GenMessage<GetPettyCashVoucherListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashVoucherListPageDataResponse
 */
export type GetPettyCashVoucherListPageDataResponse = Message<"domain.treasury.v1.GetPettyCashVoucherListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashVoucher petty_cash_voucher_list = 1;
     */
    pettyCashVoucherList: PettyCashVoucher[];
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
 * Describes the message domain.treasury.v1.GetPettyCashVoucherListPageDataResponse.
 * Use `create(GetPettyCashVoucherListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPettyCashVoucherListPageDataResponseSchema: GenMessage<GetPettyCashVoucherListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashVoucherItemPageDataRequest
 */
export type GetPettyCashVoucherItemPageDataRequest = Message<"domain.treasury.v1.GetPettyCashVoucherItemPageDataRequest"> & {
    /**
     * @generated from field: string petty_cash_voucher_id = 1;
     */
    pettyCashVoucherId: string;
};
/**
 * Describes the message domain.treasury.v1.GetPettyCashVoucherItemPageDataRequest.
 * Use `create(GetPettyCashVoucherItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPettyCashVoucherItemPageDataRequestSchema: GenMessage<GetPettyCashVoucherItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashVoucherItemPageDataResponse
 */
export type GetPettyCashVoucherItemPageDataResponse = Message<"domain.treasury.v1.GetPettyCashVoucherItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.PettyCashVoucher petty_cash_voucher = 1;
     */
    pettyCashVoucher?: PettyCashVoucher;
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
 * Describes the message domain.treasury.v1.GetPettyCashVoucherItemPageDataResponse.
 * Use `create(GetPettyCashVoucherItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPettyCashVoucherItemPageDataResponseSchema: GenMessage<GetPettyCashVoucherItemPageDataResponse>;
/**
 * VoucherStatus tracks the approval and replenishment lifecycle of a petty cash voucher.
 *
 * @generated from enum domain.treasury.v1.VoucherStatus
 */
export declare enum VoucherStatus {
    /**
     * @generated from enum value: VOUCHER_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: VOUCHER_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: VOUCHER_STATUS_APPROVED = 2;
     */
    APPROVED = 2,
    /**
     * @generated from enum value: VOUCHER_STATUS_REPLENISHED = 3;
     */
    REPLENISHED = 3
}
/**
 * Describes the enum domain.treasury.v1.VoucherStatus.
 */
export declare const VoucherStatusSchema: GenEnum<VoucherStatus>;
/**
 * @generated from service domain.treasury.v1.PettyCashVoucherDomainService
 */
export declare const PettyCashVoucherDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.CreatePettyCashVoucher
     */
    createPettyCashVoucher: {
        methodKind: "unary";
        input: typeof CreatePettyCashVoucherRequestSchema;
        output: typeof CreatePettyCashVoucherResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.ReadPettyCashVoucher
     */
    readPettyCashVoucher: {
        methodKind: "unary";
        input: typeof ReadPettyCashVoucherRequestSchema;
        output: typeof ReadPettyCashVoucherResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.UpdatePettyCashVoucher
     */
    updatePettyCashVoucher: {
        methodKind: "unary";
        input: typeof UpdatePettyCashVoucherRequestSchema;
        output: typeof UpdatePettyCashVoucherResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.DeletePettyCashVoucher
     */
    deletePettyCashVoucher: {
        methodKind: "unary";
        input: typeof DeletePettyCashVoucherRequestSchema;
        output: typeof DeletePettyCashVoucherResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.ListPettyCashVouchers
     */
    listPettyCashVouchers: {
        methodKind: "unary";
        input: typeof ListPettyCashVouchersRequestSchema;
        output: typeof ListPettyCashVouchersResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.GetPettyCashVoucherListPageData
     */
    getPettyCashVoucherListPageData: {
        methodKind: "unary";
        input: typeof GetPettyCashVoucherListPageDataRequestSchema;
        output: typeof GetPettyCashVoucherListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashVoucherDomainService.GetPettyCashVoucherItemPageData
     */
    getPettyCashVoucherItemPageData: {
        methodKind: "unary";
        input: typeof GetPettyCashVoucherItemPageDataRequestSchema;
        output: typeof GetPettyCashVoucherItemPageDataResponseSchema;
    };
}>;
