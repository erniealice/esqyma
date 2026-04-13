import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/petty_cash_fund/petty_cash_fund.proto.
 */
export declare const file_domain_treasury_petty_cash_fund_petty_cash_fund: GenFile;
/**
 * PettyCashFund is the imprest fund header.
 * The authorized_amount is the float ceiling; current_balance decreases as vouchers are issued
 * and is replenished back to authorized_amount on each replenishment event.
 *
 * @generated from message domain.treasury.v1.PettyCashFund
 */
export type PettyCashFund = Message<"domain.treasury.v1.PettyCashFund"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * e.g. "Front Desk Petty Cash"
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Fund limits
     *
     * centavos                     // Maximum float
     *
     * @generated from field: int64 authorized_amount = 3;
     */
    authorizedAmount: bigint;
    /**
     * centavos  // Running balance
     *
     * @generated from field: int64 current_balance = 4;
     */
    currentBalance: bigint;
    /**
     * Custodian and location
     *
     * FK to entity.User
     *
     * @generated from field: optional string custodian_id = 5;
     */
    custodianId?: string;
    /**
     * @generated from field: optional string location_id = 6;
     */
    locationId?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 10;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 11;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.treasury.v1.PettyCashFund.
 * Use `create(PettyCashFundSchema)` to create a new message.
 */
export declare const PettyCashFundSchema: GenMessage<PettyCashFund>;
/**
 * @generated from message domain.treasury.v1.CreatePettyCashFundRequest
 */
export type CreatePettyCashFundRequest = Message<"domain.treasury.v1.CreatePettyCashFundRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashFund data = 1;
     */
    data?: PettyCashFund;
};
/**
 * Describes the message domain.treasury.v1.CreatePettyCashFundRequest.
 * Use `create(CreatePettyCashFundRequestSchema)` to create a new message.
 */
export declare const CreatePettyCashFundRequestSchema: GenMessage<CreatePettyCashFundRequest>;
/**
 * @generated from message domain.treasury.v1.CreatePettyCashFundResponse
 */
export type CreatePettyCashFundResponse = Message<"domain.treasury.v1.CreatePettyCashFundResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashFund data = 1;
     */
    data: PettyCashFund[];
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
 * Describes the message domain.treasury.v1.CreatePettyCashFundResponse.
 * Use `create(CreatePettyCashFundResponseSchema)` to create a new message.
 */
export declare const CreatePettyCashFundResponseSchema: GenMessage<CreatePettyCashFundResponse>;
/**
 * @generated from message domain.treasury.v1.ReadPettyCashFundRequest
 */
export type ReadPettyCashFundRequest = Message<"domain.treasury.v1.ReadPettyCashFundRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashFund data = 1;
     */
    data?: PettyCashFund;
};
/**
 * Describes the message domain.treasury.v1.ReadPettyCashFundRequest.
 * Use `create(ReadPettyCashFundRequestSchema)` to create a new message.
 */
export declare const ReadPettyCashFundRequestSchema: GenMessage<ReadPettyCashFundRequest>;
/**
 * @generated from message domain.treasury.v1.ReadPettyCashFundResponse
 */
export type ReadPettyCashFundResponse = Message<"domain.treasury.v1.ReadPettyCashFundResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashFund data = 1;
     */
    data: PettyCashFund[];
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
 * Describes the message domain.treasury.v1.ReadPettyCashFundResponse.
 * Use `create(ReadPettyCashFundResponseSchema)` to create a new message.
 */
export declare const ReadPettyCashFundResponseSchema: GenMessage<ReadPettyCashFundResponse>;
/**
 * @generated from message domain.treasury.v1.UpdatePettyCashFundRequest
 */
export type UpdatePettyCashFundRequest = Message<"domain.treasury.v1.UpdatePettyCashFundRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashFund data = 1;
     */
    data?: PettyCashFund;
};
/**
 * Describes the message domain.treasury.v1.UpdatePettyCashFundRequest.
 * Use `create(UpdatePettyCashFundRequestSchema)` to create a new message.
 */
export declare const UpdatePettyCashFundRequestSchema: GenMessage<UpdatePettyCashFundRequest>;
/**
 * @generated from message domain.treasury.v1.UpdatePettyCashFundResponse
 */
export type UpdatePettyCashFundResponse = Message<"domain.treasury.v1.UpdatePettyCashFundResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashFund data = 1;
     */
    data: PettyCashFund[];
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
 * Describes the message domain.treasury.v1.UpdatePettyCashFundResponse.
 * Use `create(UpdatePettyCashFundResponseSchema)` to create a new message.
 */
export declare const UpdatePettyCashFundResponseSchema: GenMessage<UpdatePettyCashFundResponse>;
/**
 * @generated from message domain.treasury.v1.DeletePettyCashFundRequest
 */
export type DeletePettyCashFundRequest = Message<"domain.treasury.v1.DeletePettyCashFundRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.PettyCashFund data = 1;
     */
    data?: PettyCashFund;
};
/**
 * Describes the message domain.treasury.v1.DeletePettyCashFundRequest.
 * Use `create(DeletePettyCashFundRequestSchema)` to create a new message.
 */
export declare const DeletePettyCashFundRequestSchema: GenMessage<DeletePettyCashFundRequest>;
/**
 * @generated from message domain.treasury.v1.DeletePettyCashFundResponse
 */
export type DeletePettyCashFundResponse = Message<"domain.treasury.v1.DeletePettyCashFundResponse"> & {
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
 * Describes the message domain.treasury.v1.DeletePettyCashFundResponse.
 * Use `create(DeletePettyCashFundResponseSchema)` to create a new message.
 */
export declare const DeletePettyCashFundResponseSchema: GenMessage<DeletePettyCashFundResponse>;
/**
 * @generated from message domain.treasury.v1.ListPettyCashFundsRequest
 */
export type ListPettyCashFundsRequest = Message<"domain.treasury.v1.ListPettyCashFundsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListPettyCashFundsRequest.
 * Use `create(ListPettyCashFundsRequestSchema)` to create a new message.
 */
export declare const ListPettyCashFundsRequestSchema: GenMessage<ListPettyCashFundsRequest>;
/**
 * @generated from message domain.treasury.v1.ListPettyCashFundsResponse
 */
export type ListPettyCashFundsResponse = Message<"domain.treasury.v1.ListPettyCashFundsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashFund data = 1;
     */
    data: PettyCashFund[];
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
 * Describes the message domain.treasury.v1.ListPettyCashFundsResponse.
 * Use `create(ListPettyCashFundsResponseSchema)` to create a new message.
 */
export declare const ListPettyCashFundsResponseSchema: GenMessage<ListPettyCashFundsResponse>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashFundListPageDataRequest
 */
export type GetPettyCashFundListPageDataRequest = Message<"domain.treasury.v1.GetPettyCashFundListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetPettyCashFundListPageDataRequest.
 * Use `create(GetPettyCashFundListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPettyCashFundListPageDataRequestSchema: GenMessage<GetPettyCashFundListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashFundListPageDataResponse
 */
export type GetPettyCashFundListPageDataResponse = Message<"domain.treasury.v1.GetPettyCashFundListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.PettyCashFund petty_cash_fund_list = 1;
     */
    pettyCashFundList: PettyCashFund[];
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
 * Describes the message domain.treasury.v1.GetPettyCashFundListPageDataResponse.
 * Use `create(GetPettyCashFundListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPettyCashFundListPageDataResponseSchema: GenMessage<GetPettyCashFundListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashFundItemPageDataRequest
 */
export type GetPettyCashFundItemPageDataRequest = Message<"domain.treasury.v1.GetPettyCashFundItemPageDataRequest"> & {
    /**
     * @generated from field: string petty_cash_fund_id = 1;
     */
    pettyCashFundId: string;
};
/**
 * Describes the message domain.treasury.v1.GetPettyCashFundItemPageDataRequest.
 * Use `create(GetPettyCashFundItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPettyCashFundItemPageDataRequestSchema: GenMessage<GetPettyCashFundItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetPettyCashFundItemPageDataResponse
 */
export type GetPettyCashFundItemPageDataResponse = Message<"domain.treasury.v1.GetPettyCashFundItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.PettyCashFund petty_cash_fund = 1;
     */
    pettyCashFund?: PettyCashFund;
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
 * Describes the message domain.treasury.v1.GetPettyCashFundItemPageDataResponse.
 * Use `create(GetPettyCashFundItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPettyCashFundItemPageDataResponseSchema: GenMessage<GetPettyCashFundItemPageDataResponse>;
/**
 * @generated from service domain.treasury.v1.PettyCashFundDomainService
 */
export declare const PettyCashFundDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.CreatePettyCashFund
     */
    createPettyCashFund: {
        methodKind: "unary";
        input: typeof CreatePettyCashFundRequestSchema;
        output: typeof CreatePettyCashFundResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.ReadPettyCashFund
     */
    readPettyCashFund: {
        methodKind: "unary";
        input: typeof ReadPettyCashFundRequestSchema;
        output: typeof ReadPettyCashFundResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.UpdatePettyCashFund
     */
    updatePettyCashFund: {
        methodKind: "unary";
        input: typeof UpdatePettyCashFundRequestSchema;
        output: typeof UpdatePettyCashFundResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.DeletePettyCashFund
     */
    deletePettyCashFund: {
        methodKind: "unary";
        input: typeof DeletePettyCashFundRequestSchema;
        output: typeof DeletePettyCashFundResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.ListPettyCashFunds
     */
    listPettyCashFunds: {
        methodKind: "unary";
        input: typeof ListPettyCashFundsRequestSchema;
        output: typeof ListPettyCashFundsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.GetPettyCashFundListPageData
     */
    getPettyCashFundListPageData: {
        methodKind: "unary";
        input: typeof GetPettyCashFundListPageDataRequestSchema;
        output: typeof GetPettyCashFundListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.PettyCashFundDomainService.GetPettyCashFundItemPageData
     */
    getPettyCashFundItemPageData: {
        methodKind: "unary";
        input: typeof GetPettyCashFundItemPageDataRequestSchema;
        output: typeof GetPettyCashFundItemPageDataResponseSchema;
    };
}>;
