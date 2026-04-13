import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/security_deposit/security_deposit.proto.
 */
export declare const file_domain_treasury_security_deposit_security_deposit: GenFile;
/**
 * SecurityDeposit records deposits paid to or received from counter-parties.
 * Settlement events (refund, forfeiture, partial deductions) are child entities.
 *
 * @generated from message domain.treasury.v1.SecurityDeposit
 */
export type SecurityDeposit = Message<"domain.treasury.v1.SecurityDeposit"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: domain.treasury.v1.DepositDirection direction = 2;
     */
    direction: DepositDirection;
    /**
     * Landlord name (PAID) or tenant/customer name (RECEIVED)
     *
     * @generated from field: string counterparty_name = 3;
     */
    counterpartyName: string;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 4;
     */
    amount: bigint;
    /**
     * @generated from field: int64 deposit_date = 5;
     */
    depositDate: bigint;
    /**
     * @generated from field: optional string deposit_date_string = 6;
     */
    depositDateString?: string;
    /**
     * @generated from field: domain.treasury.v1.DepositStatus status = 7;
     */
    status: DepositStatus;
    /**
     * GL integration — FK to the Chart of Accounts
     *
     * @generated from field: optional string account_id = 8;
     */
    accountId?: string;
    /**
     * @generated from field: optional string notes = 9;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 13;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 14;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.treasury.v1.SecurityDeposit.
 * Use `create(SecurityDepositSchema)` to create a new message.
 */
export declare const SecurityDepositSchema: GenMessage<SecurityDeposit>;
/**
 * @generated from message domain.treasury.v1.CreateSecurityDepositRequest
 */
export type CreateSecurityDepositRequest = Message<"domain.treasury.v1.CreateSecurityDepositRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.SecurityDeposit data = 1;
     */
    data?: SecurityDeposit;
};
/**
 * Describes the message domain.treasury.v1.CreateSecurityDepositRequest.
 * Use `create(CreateSecurityDepositRequestSchema)` to create a new message.
 */
export declare const CreateSecurityDepositRequestSchema: GenMessage<CreateSecurityDepositRequest>;
/**
 * @generated from message domain.treasury.v1.CreateSecurityDepositResponse
 */
export type CreateSecurityDepositResponse = Message<"domain.treasury.v1.CreateSecurityDepositResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.SecurityDeposit data = 1;
     */
    data: SecurityDeposit[];
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
 * Describes the message domain.treasury.v1.CreateSecurityDepositResponse.
 * Use `create(CreateSecurityDepositResponseSchema)` to create a new message.
 */
export declare const CreateSecurityDepositResponseSchema: GenMessage<CreateSecurityDepositResponse>;
/**
 * @generated from message domain.treasury.v1.ReadSecurityDepositRequest
 */
export type ReadSecurityDepositRequest = Message<"domain.treasury.v1.ReadSecurityDepositRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.SecurityDeposit data = 1;
     */
    data?: SecurityDeposit;
};
/**
 * Describes the message domain.treasury.v1.ReadSecurityDepositRequest.
 * Use `create(ReadSecurityDepositRequestSchema)` to create a new message.
 */
export declare const ReadSecurityDepositRequestSchema: GenMessage<ReadSecurityDepositRequest>;
/**
 * @generated from message domain.treasury.v1.ReadSecurityDepositResponse
 */
export type ReadSecurityDepositResponse = Message<"domain.treasury.v1.ReadSecurityDepositResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.SecurityDeposit data = 1;
     */
    data: SecurityDeposit[];
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
 * Describes the message domain.treasury.v1.ReadSecurityDepositResponse.
 * Use `create(ReadSecurityDepositResponseSchema)` to create a new message.
 */
export declare const ReadSecurityDepositResponseSchema: GenMessage<ReadSecurityDepositResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateSecurityDepositRequest
 */
export type UpdateSecurityDepositRequest = Message<"domain.treasury.v1.UpdateSecurityDepositRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.SecurityDeposit data = 1;
     */
    data?: SecurityDeposit;
};
/**
 * Describes the message domain.treasury.v1.UpdateSecurityDepositRequest.
 * Use `create(UpdateSecurityDepositRequestSchema)` to create a new message.
 */
export declare const UpdateSecurityDepositRequestSchema: GenMessage<UpdateSecurityDepositRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateSecurityDepositResponse
 */
export type UpdateSecurityDepositResponse = Message<"domain.treasury.v1.UpdateSecurityDepositResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.SecurityDeposit data = 1;
     */
    data: SecurityDeposit[];
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
 * Describes the message domain.treasury.v1.UpdateSecurityDepositResponse.
 * Use `create(UpdateSecurityDepositResponseSchema)` to create a new message.
 */
export declare const UpdateSecurityDepositResponseSchema: GenMessage<UpdateSecurityDepositResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteSecurityDepositRequest
 */
export type DeleteSecurityDepositRequest = Message<"domain.treasury.v1.DeleteSecurityDepositRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.SecurityDeposit data = 1;
     */
    data?: SecurityDeposit;
};
/**
 * Describes the message domain.treasury.v1.DeleteSecurityDepositRequest.
 * Use `create(DeleteSecurityDepositRequestSchema)` to create a new message.
 */
export declare const DeleteSecurityDepositRequestSchema: GenMessage<DeleteSecurityDepositRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteSecurityDepositResponse
 */
export type DeleteSecurityDepositResponse = Message<"domain.treasury.v1.DeleteSecurityDepositResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteSecurityDepositResponse.
 * Use `create(DeleteSecurityDepositResponseSchema)` to create a new message.
 */
export declare const DeleteSecurityDepositResponseSchema: GenMessage<DeleteSecurityDepositResponse>;
/**
 * @generated from message domain.treasury.v1.ListSecurityDepositsRequest
 */
export type ListSecurityDepositsRequest = Message<"domain.treasury.v1.ListSecurityDepositsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListSecurityDepositsRequest.
 * Use `create(ListSecurityDepositsRequestSchema)` to create a new message.
 */
export declare const ListSecurityDepositsRequestSchema: GenMessage<ListSecurityDepositsRequest>;
/**
 * @generated from message domain.treasury.v1.ListSecurityDepositsResponse
 */
export type ListSecurityDepositsResponse = Message<"domain.treasury.v1.ListSecurityDepositsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.SecurityDeposit data = 1;
     */
    data: SecurityDeposit[];
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
 * Describes the message domain.treasury.v1.ListSecurityDepositsResponse.
 * Use `create(ListSecurityDepositsResponseSchema)` to create a new message.
 */
export declare const ListSecurityDepositsResponseSchema: GenMessage<ListSecurityDepositsResponse>;
/**
 * @generated from message domain.treasury.v1.GetSecurityDepositListPageDataRequest
 */
export type GetSecurityDepositListPageDataRequest = Message<"domain.treasury.v1.GetSecurityDepositListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetSecurityDepositListPageDataRequest.
 * Use `create(GetSecurityDepositListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSecurityDepositListPageDataRequestSchema: GenMessage<GetSecurityDepositListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetSecurityDepositListPageDataResponse
 */
export type GetSecurityDepositListPageDataResponse = Message<"domain.treasury.v1.GetSecurityDepositListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.SecurityDeposit security_deposit_list = 1;
     */
    securityDepositList: SecurityDeposit[];
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
 * Describes the message domain.treasury.v1.GetSecurityDepositListPageDataResponse.
 * Use `create(GetSecurityDepositListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSecurityDepositListPageDataResponseSchema: GenMessage<GetSecurityDepositListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetSecurityDepositItemPageDataRequest
 */
export type GetSecurityDepositItemPageDataRequest = Message<"domain.treasury.v1.GetSecurityDepositItemPageDataRequest"> & {
    /**
     * @generated from field: string security_deposit_id = 1;
     */
    securityDepositId: string;
};
/**
 * Describes the message domain.treasury.v1.GetSecurityDepositItemPageDataRequest.
 * Use `create(GetSecurityDepositItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSecurityDepositItemPageDataRequestSchema: GenMessage<GetSecurityDepositItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetSecurityDepositItemPageDataResponse
 */
export type GetSecurityDepositItemPageDataResponse = Message<"domain.treasury.v1.GetSecurityDepositItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.SecurityDeposit security_deposit = 1;
     */
    securityDeposit?: SecurityDeposit;
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
 * Describes the message domain.treasury.v1.GetSecurityDepositItemPageDataResponse.
 * Use `create(GetSecurityDepositItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSecurityDepositItemPageDataResponseSchema: GenMessage<GetSecurityDepositItemPageDataResponse>;
/**
 * DepositDirection indicates whether the business paid a deposit or received one.
 *
 * @generated from enum domain.treasury.v1.DepositDirection
 */
export declare enum DepositDirection {
    /**
     * @generated from enum value: DEPOSIT_DIRECTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Asset — deposit paid to a landlord/vendor
     *
     * @generated from enum value: DEPOSIT_DIRECTION_PAID = 1;
     */
    PAID = 1,
    /**
     * Liability — deposit received from a customer/tenant
     *
     * @generated from enum value: DEPOSIT_DIRECTION_RECEIVED = 2;
     */
    RECEIVED = 2
}
/**
 * Describes the enum domain.treasury.v1.DepositDirection.
 */
export declare const DepositDirectionSchema: GenEnum<DepositDirection>;
/**
 * DepositStatus tracks the lifecycle of the deposit.
 *
 * @generated from enum domain.treasury.v1.DepositStatus
 */
export declare enum DepositStatus {
    /**
     * @generated from enum value: DEPOSIT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DEPOSIT_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * Returned (or fully applied)
     *
     * @generated from enum value: DEPOSIT_STATUS_SETTLED = 2;
     */
    SETTLED = 2,
    /**
     * Not returned (e.g. lease break penalty)
     *
     * @generated from enum value: DEPOSIT_STATUS_FORFEITED = 3;
     */
    FORFEITED = 3
}
/**
 * Describes the enum domain.treasury.v1.DepositStatus.
 */
export declare const DepositStatusSchema: GenEnum<DepositStatus>;
/**
 * @generated from service domain.treasury.v1.SecurityDepositDomainService
 */
export declare const SecurityDepositDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.CreateSecurityDeposit
     */
    createSecurityDeposit: {
        methodKind: "unary";
        input: typeof CreateSecurityDepositRequestSchema;
        output: typeof CreateSecurityDepositResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.ReadSecurityDeposit
     */
    readSecurityDeposit: {
        methodKind: "unary";
        input: typeof ReadSecurityDepositRequestSchema;
        output: typeof ReadSecurityDepositResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.UpdateSecurityDeposit
     */
    updateSecurityDeposit: {
        methodKind: "unary";
        input: typeof UpdateSecurityDepositRequestSchema;
        output: typeof UpdateSecurityDepositResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.DeleteSecurityDeposit
     */
    deleteSecurityDeposit: {
        methodKind: "unary";
        input: typeof DeleteSecurityDepositRequestSchema;
        output: typeof DeleteSecurityDepositResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.ListSecurityDeposits
     */
    listSecurityDeposits: {
        methodKind: "unary";
        input: typeof ListSecurityDepositsRequestSchema;
        output: typeof ListSecurityDepositsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.GetSecurityDepositListPageData
     */
    getSecurityDepositListPageData: {
        methodKind: "unary";
        input: typeof GetSecurityDepositListPageDataRequestSchema;
        output: typeof GetSecurityDepositListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.SecurityDepositDomainService.GetSecurityDepositItemPageData
     */
    getSecurityDepositItemPageData: {
        methodKind: "unary";
        input: typeof GetSecurityDepositItemPageDataRequestSchema;
        output: typeof GetSecurityDepositItemPageDataResponseSchema;
    };
}>;
