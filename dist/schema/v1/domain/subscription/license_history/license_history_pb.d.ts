import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { License, LicenseStatus } from "../license/license_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/license_history/license_history.proto.
 */
export declare const file_domain_subscription_license_history_license_history: GenFile;
/**
 * LicenseHistory tracks assignment changes over time (audit trail)
 *
 * @generated from message domain.subscription.v1.LicenseHistory
 */
export type LicenseHistory = Message<"domain.subscription.v1.LicenseHistory"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string license_id = 2;
     */
    licenseId: string;
    /**
     * @generated from field: optional domain.subscription.v1.License license = 3;
     */
    license?: License;
    /**
     * Action type
     *
     * @generated from field: domain.subscription.v1.LicenseHistoryAction action = 4;
     */
    action: LicenseHistoryAction;
    /**
     * Who was affected (current/new assignee)
     *
     * @generated from field: optional string assignee_id = 5;
     */
    assigneeId?: string;
    /**
     * @generated from field: optional string assignee_type = 6;
     */
    assigneeType?: string;
    /**
     * @generated from field: optional string assignee_name = 7;
     */
    assigneeName?: string;
    /**
     * For reassignments: who was previous assignee
     *
     * @generated from field: optional string previous_assignee_id = 8;
     */
    previousAssigneeId?: string;
    /**
     * @generated from field: optional string previous_assignee_type = 9;
     */
    previousAssigneeType?: string;
    /**
     * @generated from field: optional string previous_assignee_name = 10;
     */
    previousAssigneeName?: string;
    /**
     * Who performed the action
     *
     * @generated from field: string performed_by = 11;
     */
    performedBy: string;
    /**
     * Reason and notes
     *
     * @generated from field: optional string reason = 12;
     */
    reason?: string;
    /**
     * @generated from field: optional string notes = 13;
     */
    notes?: string;
    /**
     * Snapshot of license status at time of action
     *
     * @generated from field: domain.subscription.v1.LicenseStatus license_status_before = 14;
     */
    licenseStatusBefore: LicenseStatus;
    /**
     * @generated from field: domain.subscription.v1.LicenseStatus license_status_after = 15;
     */
    licenseStatusAfter: LicenseStatus;
    /**
     * Timestamps
     *
     * @generated from field: int64 date_created = 16;
     */
    dateCreated: bigint;
    /**
     * @generated from field: string date_created_string = 17;
     */
    dateCreatedString: string;
    /**
     * @generated from field: bool active = 18;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.LicenseHistory.
 * Use `create(LicenseHistorySchema)` to create a new message.
 */
export declare const LicenseHistorySchema: GenMessage<LicenseHistory>;
/**
 * @generated from message domain.subscription.v1.CreateLicenseHistoryRequest
 */
export type CreateLicenseHistoryRequest = Message<"domain.subscription.v1.CreateLicenseHistoryRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.LicenseHistory data = 1;
     */
    data?: LicenseHistory;
};
/**
 * Describes the message domain.subscription.v1.CreateLicenseHistoryRequest.
 * Use `create(CreateLicenseHistoryRequestSchema)` to create a new message.
 */
export declare const CreateLicenseHistoryRequestSchema: GenMessage<CreateLicenseHistoryRequest>;
/**
 * @generated from message domain.subscription.v1.CreateLicenseHistoryResponse
 */
export type CreateLicenseHistoryResponse = Message<"domain.subscription.v1.CreateLicenseHistoryResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.LicenseHistory data = 1;
     */
    data: LicenseHistory[];
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
 * Describes the message domain.subscription.v1.CreateLicenseHistoryResponse.
 * Use `create(CreateLicenseHistoryResponseSchema)` to create a new message.
 */
export declare const CreateLicenseHistoryResponseSchema: GenMessage<CreateLicenseHistoryResponse>;
/**
 * @generated from message domain.subscription.v1.ReadLicenseHistoryRequest
 */
export type ReadLicenseHistoryRequest = Message<"domain.subscription.v1.ReadLicenseHistoryRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.LicenseHistory data = 1;
     */
    data?: LicenseHistory;
};
/**
 * Describes the message domain.subscription.v1.ReadLicenseHistoryRequest.
 * Use `create(ReadLicenseHistoryRequestSchema)` to create a new message.
 */
export declare const ReadLicenseHistoryRequestSchema: GenMessage<ReadLicenseHistoryRequest>;
/**
 * @generated from message domain.subscription.v1.ReadLicenseHistoryResponse
 */
export type ReadLicenseHistoryResponse = Message<"domain.subscription.v1.ReadLicenseHistoryResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.LicenseHistory data = 1;
     */
    data: LicenseHistory[];
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
 * Describes the message domain.subscription.v1.ReadLicenseHistoryResponse.
 * Use `create(ReadLicenseHistoryResponseSchema)` to create a new message.
 */
export declare const ReadLicenseHistoryResponseSchema: GenMessage<ReadLicenseHistoryResponse>;
/**
 * @generated from message domain.subscription.v1.ListLicenseHistoryRequest
 */
export type ListLicenseHistoryRequest = Message<"domain.subscription.v1.ListLicenseHistoryRequest"> & {
    /**
     * Filter by license ID
     *
     * @generated from field: optional string license_id = 1;
     */
    licenseId?: string;
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
 * Describes the message domain.subscription.v1.ListLicenseHistoryRequest.
 * Use `create(ListLicenseHistoryRequestSchema)` to create a new message.
 */
export declare const ListLicenseHistoryRequestSchema: GenMessage<ListLicenseHistoryRequest>;
/**
 * @generated from message domain.subscription.v1.ListLicenseHistoryResponse
 */
export type ListLicenseHistoryResponse = Message<"domain.subscription.v1.ListLicenseHistoryResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.LicenseHistory data = 1;
     */
    data: LicenseHistory[];
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
 * Describes the message domain.subscription.v1.ListLicenseHistoryResponse.
 * Use `create(ListLicenseHistoryResponseSchema)` to create a new message.
 */
export declare const ListLicenseHistoryResponseSchema: GenMessage<ListLicenseHistoryResponse>;
/**
 * @generated from message domain.subscription.v1.GetLicenseHistoryListPageDataRequest
 */
export type GetLicenseHistoryListPageDataRequest = Message<"domain.subscription.v1.GetLicenseHistoryListPageDataRequest"> & {
    /**
     * Filter by license ID
     *
     * @generated from field: optional string license_id = 1;
     */
    licenseId?: string;
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 2;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 5;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.subscription.v1.GetLicenseHistoryListPageDataRequest.
 * Use `create(GetLicenseHistoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLicenseHistoryListPageDataRequestSchema: GenMessage<GetLicenseHistoryListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetLicenseHistoryListPageDataResponse
 */
export type GetLicenseHistoryListPageDataResponse = Message<"domain.subscription.v1.GetLicenseHistoryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.LicenseHistory license_history_list = 1;
     */
    licenseHistoryList: LicenseHistory[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.subscription.v1.GetLicenseHistoryListPageDataResponse.
 * Use `create(GetLicenseHistoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLicenseHistoryListPageDataResponseSchema: GenMessage<GetLicenseHistoryListPageDataResponse>;
/**
 * LicenseHistoryAction defines what happened to a license
 *
 * @generated from enum domain.subscription.v1.LicenseHistoryAction
 */
export declare enum LicenseHistoryAction {
    /**
     * @generated from enum value: LICENSE_HISTORY_ACTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * License created (with or without assignment)
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_CREATED = 1;
     */
    CREATED = 1,
    /**
     * Assigned to someone (from unassigned)
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_ASSIGNED = 2;
     */
    ASSIGNED = 2,
    /**
     * Assignment removed (back to unassigned)
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_REVOKED = 3;
     */
    REVOKED = 3,
    /**
     * Transferred to different assignee
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_REASSIGNED = 4;
     */
    REASSIGNED = 4,
    /**
     * Temporarily disabled
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_SUSPENDED = 5;
     */
    SUSPENDED = 5,
    /**
     * Re-enabled after suspension
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_REACTIVATED = 6;
     */
    REACTIVATED = 6,
    /**
     * Validity ended
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_EXPIRED = 7;
     */
    EXPIRED = 7,
    /**
     * Soft deleted
     *
     * @generated from enum value: LICENSE_HISTORY_ACTION_DELETED = 8;
     */
    DELETED = 8
}
/**
 * Describes the enum domain.subscription.v1.LicenseHistoryAction.
 */
export declare const LicenseHistoryActionSchema: GenEnum<LicenseHistoryAction>;
/**
 * @generated from service domain.subscription.v1.LicenseHistoryDomainService
 */
export declare const LicenseHistoryDomainService: GenService<{
    /**
     * Create (internal - called by license operations)
     *
     * @generated from rpc domain.subscription.v1.LicenseHistoryDomainService.CreateLicenseHistory
     */
    createLicenseHistory: {
        methodKind: "unary";
        input: typeof CreateLicenseHistoryRequestSchema;
        output: typeof CreateLicenseHistoryResponseSchema;
    };
    /**
     * Read operations
     *
     * @generated from rpc domain.subscription.v1.LicenseHistoryDomainService.ReadLicenseHistory
     */
    readLicenseHistory: {
        methodKind: "unary";
        input: typeof ReadLicenseHistoryRequestSchema;
        output: typeof ReadLicenseHistoryResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseHistoryDomainService.ListLicenseHistory
     */
    listLicenseHistory: {
        methodKind: "unary";
        input: typeof ListLicenseHistoryRequestSchema;
        output: typeof ListLicenseHistoryResponseSchema;
    };
    /**
     * Page data
     *
     * @generated from rpc domain.subscription.v1.LicenseHistoryDomainService.GetLicenseHistoryListPageData
     */
    getLicenseHistoryListPageData: {
        methodKind: "unary";
        input: typeof GetLicenseHistoryListPageDataRequestSchema;
        output: typeof GetLicenseHistoryListPageDataResponseSchema;
    };
}>;
