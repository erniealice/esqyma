import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/funding/fund_allocation/fund_allocation.proto.
 */
export declare const file_domain_funding_fund_allocation_fund_allocation: GenFile;
/**
 * FundAllocation — workspace-scoped junction between a (global) Fund and a
 * specific workspace. This row is the cross-workspace boundary: it carries
 * workspace_id and FKs up across the boundary to Fund.
 *
 * INTENTIONALLY has NO balance fields. Outstanding is computed via
 * FundTransaction projection (SUM over fund_transaction rows for this
 * allocation_id). See architecture.md §3.3.
 *
 * Partial unique index (enforced by migration):
 *   (fund_id, workspace_id) WHERE status = 'ACTIVE'
 *   — one active allocation per (fund, workspace) pair.
 *
 * @generated from message domain.funding.v1.FundAllocation
 */
export type FundAllocation = Message<"domain.funding.v1.FundAllocation"> & {
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
     * Cross-boundary FK: fund lives in the global tier (no workspace_id).
     *
     * @generated from field: string fund_id = 7;
     */
    fundId: string;
    /**
     * Workspace that holds this allocation.
     *
     * @generated from field: string workspace_id = 8;
     */
    workspaceId: string;
    /**
     * Limit policy
     *
     * @generated from field: domain.funding.v1.FundAllocationMode mode = 9;
     */
    mode: FundAllocationMode;
    /**
     * centavos in source currency — a FACT, never mutated by transactions
     *
     * @generated from field: int64 allocated_limit = 10;
     */
    allocatedLimit: bigint;
    /**
     * GL pointers — per-allocation (each WS may have its own CoA structure)
     *
     * liability account absorbing draws
     *
     * @generated from field: optional string payable_account_id = 11;
     */
    payableAccountId?: string;
    /**
     * cash account pre-selected on Settle drawer
     *
     * @generated from field: optional string default_cash_account_id = 12;
     */
    defaultCashAccountId?: string;
    /**
     * @generated from field: domain.funding.v1.FundAllocationStatus status = 13;
     */
    status: FundAllocationStatus;
    /**
     * Audit — who granted this allocation
     *
     * @generated from field: optional string approved_by_user_id = 14;
     */
    approvedByUserId?: string;
};
/**
 * Describes the message domain.funding.v1.FundAllocation.
 * Use `create(FundAllocationSchema)` to create a new message.
 */
export declare const FundAllocationSchema: GenMessage<FundAllocation>;
/**
 * @generated from message domain.funding.v1.CreateFundAllocationRequest
 */
export type CreateFundAllocationRequest = Message<"domain.funding.v1.CreateFundAllocationRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundAllocation data = 1;
     */
    data?: FundAllocation;
};
/**
 * Describes the message domain.funding.v1.CreateFundAllocationRequest.
 * Use `create(CreateFundAllocationRequestSchema)` to create a new message.
 */
export declare const CreateFundAllocationRequestSchema: GenMessage<CreateFundAllocationRequest>;
/**
 * @generated from message domain.funding.v1.CreateFundAllocationResponse
 */
export type CreateFundAllocationResponse = Message<"domain.funding.v1.CreateFundAllocationResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundAllocation data = 1;
     */
    data: FundAllocation[];
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
 * Describes the message domain.funding.v1.CreateFundAllocationResponse.
 * Use `create(CreateFundAllocationResponseSchema)` to create a new message.
 */
export declare const CreateFundAllocationResponseSchema: GenMessage<CreateFundAllocationResponse>;
/**
 * @generated from message domain.funding.v1.ReadFundAllocationRequest
 */
export type ReadFundAllocationRequest = Message<"domain.funding.v1.ReadFundAllocationRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundAllocation data = 1;
     */
    data?: FundAllocation;
};
/**
 * Describes the message domain.funding.v1.ReadFundAllocationRequest.
 * Use `create(ReadFundAllocationRequestSchema)` to create a new message.
 */
export declare const ReadFundAllocationRequestSchema: GenMessage<ReadFundAllocationRequest>;
/**
 * @generated from message domain.funding.v1.ReadFundAllocationResponse
 */
export type ReadFundAllocationResponse = Message<"domain.funding.v1.ReadFundAllocationResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundAllocation data = 1;
     */
    data: FundAllocation[];
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
 * Describes the message domain.funding.v1.ReadFundAllocationResponse.
 * Use `create(ReadFundAllocationResponseSchema)` to create a new message.
 */
export declare const ReadFundAllocationResponseSchema: GenMessage<ReadFundAllocationResponse>;
/**
 * @generated from message domain.funding.v1.UpdateFundAllocationRequest
 */
export type UpdateFundAllocationRequest = Message<"domain.funding.v1.UpdateFundAllocationRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundAllocation data = 1;
     */
    data?: FundAllocation;
};
/**
 * Describes the message domain.funding.v1.UpdateFundAllocationRequest.
 * Use `create(UpdateFundAllocationRequestSchema)` to create a new message.
 */
export declare const UpdateFundAllocationRequestSchema: GenMessage<UpdateFundAllocationRequest>;
/**
 * @generated from message domain.funding.v1.UpdateFundAllocationResponse
 */
export type UpdateFundAllocationResponse = Message<"domain.funding.v1.UpdateFundAllocationResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundAllocation data = 1;
     */
    data: FundAllocation[];
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
 * Describes the message domain.funding.v1.UpdateFundAllocationResponse.
 * Use `create(UpdateFundAllocationResponseSchema)` to create a new message.
 */
export declare const UpdateFundAllocationResponseSchema: GenMessage<UpdateFundAllocationResponse>;
/**
 * @generated from message domain.funding.v1.DeleteFundAllocationRequest
 */
export type DeleteFundAllocationRequest = Message<"domain.funding.v1.DeleteFundAllocationRequest"> & {
    /**
     * @generated from field: domain.funding.v1.FundAllocation data = 1;
     */
    data?: FundAllocation;
};
/**
 * Describes the message domain.funding.v1.DeleteFundAllocationRequest.
 * Use `create(DeleteFundAllocationRequestSchema)` to create a new message.
 */
export declare const DeleteFundAllocationRequestSchema: GenMessage<DeleteFundAllocationRequest>;
/**
 * @generated from message domain.funding.v1.DeleteFundAllocationResponse
 */
export type DeleteFundAllocationResponse = Message<"domain.funding.v1.DeleteFundAllocationResponse"> & {
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
 * Describes the message domain.funding.v1.DeleteFundAllocationResponse.
 * Use `create(DeleteFundAllocationResponseSchema)` to create a new message.
 */
export declare const DeleteFundAllocationResponseSchema: GenMessage<DeleteFundAllocationResponse>;
/**
 * @generated from message domain.funding.v1.ListFundAllocationsRequest
 */
export type ListFundAllocationsRequest = Message<"domain.funding.v1.ListFundAllocationsRequest"> & {
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
 * Describes the message domain.funding.v1.ListFundAllocationsRequest.
 * Use `create(ListFundAllocationsRequestSchema)` to create a new message.
 */
export declare const ListFundAllocationsRequestSchema: GenMessage<ListFundAllocationsRequest>;
/**
 * @generated from message domain.funding.v1.ListFundAllocationsResponse
 */
export type ListFundAllocationsResponse = Message<"domain.funding.v1.ListFundAllocationsResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundAllocation data = 1;
     */
    data: FundAllocation[];
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
 * Describes the message domain.funding.v1.ListFundAllocationsResponse.
 * Use `create(ListFundAllocationsResponseSchema)` to create a new message.
 */
export declare const ListFundAllocationsResponseSchema: GenMessage<ListFundAllocationsResponse>;
/**
 * @generated from message domain.funding.v1.GetFundAllocationListPageDataRequest
 */
export type GetFundAllocationListPageDataRequest = Message<"domain.funding.v1.GetFundAllocationListPageDataRequest"> & {
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
 * Describes the message domain.funding.v1.GetFundAllocationListPageDataRequest.
 * Use `create(GetFundAllocationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetFundAllocationListPageDataRequestSchema: GenMessage<GetFundAllocationListPageDataRequest>;
/**
 * @generated from message domain.funding.v1.GetFundAllocationListPageDataResponse
 */
export type GetFundAllocationListPageDataResponse = Message<"domain.funding.v1.GetFundAllocationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.funding.v1.FundAllocation fund_allocation_list = 1;
     */
    fundAllocationList: FundAllocation[];
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
 * Describes the message domain.funding.v1.GetFundAllocationListPageDataResponse.
 * Use `create(GetFundAllocationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetFundAllocationListPageDataResponseSchema: GenMessage<GetFundAllocationListPageDataResponse>;
/**
 * @generated from message domain.funding.v1.GetFundAllocationItemPageDataRequest
 */
export type GetFundAllocationItemPageDataRequest = Message<"domain.funding.v1.GetFundAllocationItemPageDataRequest"> & {
    /**
     * @generated from field: string fund_allocation_id = 1;
     */
    fundAllocationId: string;
};
/**
 * Describes the message domain.funding.v1.GetFundAllocationItemPageDataRequest.
 * Use `create(GetFundAllocationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetFundAllocationItemPageDataRequestSchema: GenMessage<GetFundAllocationItemPageDataRequest>;
/**
 * @generated from message domain.funding.v1.GetFundAllocationItemPageDataResponse
 */
export type GetFundAllocationItemPageDataResponse = Message<"domain.funding.v1.GetFundAllocationItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.funding.v1.FundAllocation fund_allocation = 1;
     */
    fundAllocation?: FundAllocation;
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
 * Describes the message domain.funding.v1.GetFundAllocationItemPageDataResponse.
 * Use `create(GetFundAllocationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetFundAllocationItemPageDataResponseSchema: GenMessage<GetFundAllocationItemPageDataResponse>;
/**
 * FundAllocationStatus — lifecycle of a workspace's allocation against a Fund.
 *
 * @generated from enum domain.funding.v1.FundAllocationStatus
 */
export declare enum FundAllocationStatus {
    /**
     * @generated from enum value: FUND_ALLOCATION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FUND_ALLOCATION_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * @generated from enum value: FUND_ALLOCATION_STATUS_SUSPENDED = 2;
     */
    SUSPENDED = 2,
    /**
     * @generated from enum value: FUND_ALLOCATION_STATUS_CLOSED = 3;
     */
    CLOSED = 3
}
/**
 * Describes the enum domain.funding.v1.FundAllocationStatus.
 */
export declare const FundAllocationStatusSchema: GenEnum<FundAllocationStatus>;
/**
 * FundAllocationMode — governs how limit enforcement behaves at draw time.
 *
 * @generated from enum domain.funding.v1.FundAllocationMode
 */
export declare enum FundAllocationMode {
    /**
     * @generated from enum value: FUND_ALLOCATION_MODE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * v1 default — draw blocked when limit exceeded
     *
     * @generated from enum value: FUND_ALLOCATION_MODE_HARD_LIMIT = 1;
     */
    HARD_LIMIT = 1,
    /**
     * v2 — warn + log; allow overdraft up to fund headroom
     *
     * @generated from enum value: FUND_ALLOCATION_MODE_SOFT_LIMIT = 2;
     */
    SOFT_LIMIT = 2
}
/**
 * Describes the enum domain.funding.v1.FundAllocationMode.
 */
export declare const FundAllocationModeSchema: GenEnum<FundAllocationMode>;
/**
 * @generated from service domain.funding.v1.FundAllocationDomainService
 */
export declare const FundAllocationDomainService: GenService<{
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.CreateFundAllocation
     */
    createFundAllocation: {
        methodKind: "unary";
        input: typeof CreateFundAllocationRequestSchema;
        output: typeof CreateFundAllocationResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.ReadFundAllocation
     */
    readFundAllocation: {
        methodKind: "unary";
        input: typeof ReadFundAllocationRequestSchema;
        output: typeof ReadFundAllocationResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.UpdateFundAllocation
     */
    updateFundAllocation: {
        methodKind: "unary";
        input: typeof UpdateFundAllocationRequestSchema;
        output: typeof UpdateFundAllocationResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.DeleteFundAllocation
     */
    deleteFundAllocation: {
        methodKind: "unary";
        input: typeof DeleteFundAllocationRequestSchema;
        output: typeof DeleteFundAllocationResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.ListFundAllocations
     */
    listFundAllocations: {
        methodKind: "unary";
        input: typeof ListFundAllocationsRequestSchema;
        output: typeof ListFundAllocationsResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.GetFundAllocationListPageData
     */
    getFundAllocationListPageData: {
        methodKind: "unary";
        input: typeof GetFundAllocationListPageDataRequestSchema;
        output: typeof GetFundAllocationListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.funding.v1.FundAllocationDomainService.GetFundAllocationItemPageData
     */
    getFundAllocationItemPageData: {
        methodKind: "unary";
        input: typeof GetFundAllocationItemPageDataRequestSchema;
        output: typeof GetFundAllocationItemPageDataResponseSchema;
    };
}>;
