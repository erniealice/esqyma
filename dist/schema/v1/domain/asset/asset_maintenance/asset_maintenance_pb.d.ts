import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_maintenance/asset_maintenance.proto.
 */
export declare const file_domain_asset_asset_maintenance_asset_maintenance: GenFile;
/**
 * @generated from message domain.asset.v1.AssetMaintenance
 */
export type AssetMaintenance = Message<"domain.asset.v1.AssetMaintenance"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: domain.asset.v1.MaintenanceType maintenance_type = 3;
     */
    maintenanceType: MaintenanceType;
    /**
     * @generated from field: domain.asset.v1.MaintenancePriority priority = 4;
     */
    priority: MaintenancePriority;
    /**
     * @generated from field: domain.asset.v1.MaintenanceStatus status = 5;
     */
    status: MaintenanceStatus;
    /**
     * @generated from field: optional int64 scheduled_date = 6;
     */
    scheduledDate?: bigint;
    /**
     * @generated from field: optional string scheduled_date_string = 7;
     */
    scheduledDateString?: string;
    /**
     * @generated from field: optional int64 start_date = 8;
     */
    startDate?: bigint;
    /**
     * @generated from field: optional string start_date_string = 9;
     */
    startDateString?: string;
    /**
     * @generated from field: optional int64 completion_date = 10;
     */
    completionDate?: bigint;
    /**
     * @generated from field: optional string completion_date_string = 11;
     */
    completionDateString?: string;
    /**
     * @generated from field: optional string description = 12;
     */
    description?: string;
    /**
     * @generated from field: optional double cost = 13;
     */
    cost?: number;
    /**
     * @generated from field: bool is_capitalized = 14;
     */
    isCapitalized: boolean;
    /**
     * @generated from field: optional string performed_by = 15;
     */
    performedBy?: string;
    /**
     * FK to entity.Client
     *
     * @generated from field: optional string vendor_id = 16;
     */
    vendorId?: string;
    /**
     * @generated from field: optional string work_order_number = 17;
     */
    workOrderNumber?: string;
    /**
     * @generated from field: optional int64 next_maintenance_date = 18;
     */
    nextMaintenanceDate?: bigint;
    /**
     * @generated from field: optional string next_maintenance_date_string = 19;
     */
    nextMaintenanceDateString?: string;
    /**
     * @generated from field: optional int32 recurrence_interval_days = 20;
     */
    recurrenceIntervalDays?: number;
    /**
     * @generated from field: optional string notes = 21;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 22;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 23;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 24;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 25;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 26;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.AssetMaintenance.
 * Use `create(AssetMaintenanceSchema)` to create a new message.
 */
export declare const AssetMaintenanceSchema: GenMessage<AssetMaintenance>;
/**
 * @generated from message domain.asset.v1.CreateAssetMaintenanceRequest
 */
export type CreateAssetMaintenanceRequest = Message<"domain.asset.v1.CreateAssetMaintenanceRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetMaintenance data = 1;
     */
    data?: AssetMaintenance;
};
/**
 * Describes the message domain.asset.v1.CreateAssetMaintenanceRequest.
 * Use `create(CreateAssetMaintenanceRequestSchema)` to create a new message.
 */
export declare const CreateAssetMaintenanceRequestSchema: GenMessage<CreateAssetMaintenanceRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetMaintenanceResponse
 */
export type CreateAssetMaintenanceResponse = Message<"domain.asset.v1.CreateAssetMaintenanceResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetMaintenance data = 1;
     */
    data: AssetMaintenance[];
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
 * Describes the message domain.asset.v1.CreateAssetMaintenanceResponse.
 * Use `create(CreateAssetMaintenanceResponseSchema)` to create a new message.
 */
export declare const CreateAssetMaintenanceResponseSchema: GenMessage<CreateAssetMaintenanceResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetMaintenanceRequest
 */
export type ReadAssetMaintenanceRequest = Message<"domain.asset.v1.ReadAssetMaintenanceRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetMaintenance data = 1;
     */
    data?: AssetMaintenance;
};
/**
 * Describes the message domain.asset.v1.ReadAssetMaintenanceRequest.
 * Use `create(ReadAssetMaintenanceRequestSchema)` to create a new message.
 */
export declare const ReadAssetMaintenanceRequestSchema: GenMessage<ReadAssetMaintenanceRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetMaintenanceResponse
 */
export type ReadAssetMaintenanceResponse = Message<"domain.asset.v1.ReadAssetMaintenanceResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetMaintenance data = 1;
     */
    data: AssetMaintenance[];
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
 * Describes the message domain.asset.v1.ReadAssetMaintenanceResponse.
 * Use `create(ReadAssetMaintenanceResponseSchema)` to create a new message.
 */
export declare const ReadAssetMaintenanceResponseSchema: GenMessage<ReadAssetMaintenanceResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetMaintenanceRequest
 */
export type UpdateAssetMaintenanceRequest = Message<"domain.asset.v1.UpdateAssetMaintenanceRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetMaintenance data = 1;
     */
    data?: AssetMaintenance;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetMaintenanceRequest.
 * Use `create(UpdateAssetMaintenanceRequestSchema)` to create a new message.
 */
export declare const UpdateAssetMaintenanceRequestSchema: GenMessage<UpdateAssetMaintenanceRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetMaintenanceResponse
 */
export type UpdateAssetMaintenanceResponse = Message<"domain.asset.v1.UpdateAssetMaintenanceResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetMaintenance data = 1;
     */
    data: AssetMaintenance[];
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
 * Describes the message domain.asset.v1.UpdateAssetMaintenanceResponse.
 * Use `create(UpdateAssetMaintenanceResponseSchema)` to create a new message.
 */
export declare const UpdateAssetMaintenanceResponseSchema: GenMessage<UpdateAssetMaintenanceResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetMaintenanceRequest
 */
export type DeleteAssetMaintenanceRequest = Message<"domain.asset.v1.DeleteAssetMaintenanceRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetMaintenance data = 1;
     */
    data?: AssetMaintenance;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetMaintenanceRequest.
 * Use `create(DeleteAssetMaintenanceRequestSchema)` to create a new message.
 */
export declare const DeleteAssetMaintenanceRequestSchema: GenMessage<DeleteAssetMaintenanceRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetMaintenanceResponse
 */
export type DeleteAssetMaintenanceResponse = Message<"domain.asset.v1.DeleteAssetMaintenanceResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetMaintenanceResponse.
 * Use `create(DeleteAssetMaintenanceResponseSchema)` to create a new message.
 */
export declare const DeleteAssetMaintenanceResponseSchema: GenMessage<DeleteAssetMaintenanceResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetMaintenancesRequest
 */
export type ListAssetMaintenancesRequest = Message<"domain.asset.v1.ListAssetMaintenancesRequest"> & {
    /**
     * @generated from field: optional string asset_id = 1;
     */
    assetId?: string;
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
 * Describes the message domain.asset.v1.ListAssetMaintenancesRequest.
 * Use `create(ListAssetMaintenancesRequestSchema)` to create a new message.
 */
export declare const ListAssetMaintenancesRequestSchema: GenMessage<ListAssetMaintenancesRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetMaintenancesResponse
 */
export type ListAssetMaintenancesResponse = Message<"domain.asset.v1.ListAssetMaintenancesResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetMaintenance data = 1;
     */
    data: AssetMaintenance[];
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
 * Describes the message domain.asset.v1.ListAssetMaintenancesResponse.
 * Use `create(ListAssetMaintenancesResponseSchema)` to create a new message.
 */
export declare const ListAssetMaintenancesResponseSchema: GenMessage<ListAssetMaintenancesResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetMaintenanceListPageDataRequest
 */
export type GetAssetMaintenanceListPageDataRequest = Message<"domain.asset.v1.GetAssetMaintenanceListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetMaintenanceListPageDataRequest.
 * Use `create(GetAssetMaintenanceListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetMaintenanceListPageDataRequestSchema: GenMessage<GetAssetMaintenanceListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetMaintenanceListPageDataResponse
 */
export type GetAssetMaintenanceListPageDataResponse = Message<"domain.asset.v1.GetAssetMaintenanceListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetMaintenance asset_maintenance_list = 1;
     */
    assetMaintenanceList: AssetMaintenance[];
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
 * Describes the message domain.asset.v1.GetAssetMaintenanceListPageDataResponse.
 * Use `create(GetAssetMaintenanceListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetMaintenanceListPageDataResponseSchema: GenMessage<GetAssetMaintenanceListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetMaintenanceItemPageDataRequest
 */
export type GetAssetMaintenanceItemPageDataRequest = Message<"domain.asset.v1.GetAssetMaintenanceItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_maintenance_id = 1;
     */
    assetMaintenanceId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetMaintenanceItemPageDataRequest.
 * Use `create(GetAssetMaintenanceItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetMaintenanceItemPageDataRequestSchema: GenMessage<GetAssetMaintenanceItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetMaintenanceItemPageDataResponse
 */
export type GetAssetMaintenanceItemPageDataResponse = Message<"domain.asset.v1.GetAssetMaintenanceItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetMaintenance asset_maintenance = 1;
     */
    assetMaintenance?: AssetMaintenance;
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
 * Describes the message domain.asset.v1.GetAssetMaintenanceItemPageDataResponse.
 * Use `create(GetAssetMaintenanceItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetMaintenanceItemPageDataResponseSchema: GenMessage<GetAssetMaintenanceItemPageDataResponse>;
/**
 * MaintenanceType categorizes the kind of maintenance work.
 *
 * @generated from enum domain.asset.v1.MaintenanceType
 */
export declare enum MaintenanceType {
    /**
     * @generated from enum value: MAINTENANCE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: MAINTENANCE_TYPE_PREVENTIVE = 1;
     */
    PREVENTIVE = 1,
    /**
     * @generated from enum value: MAINTENANCE_TYPE_CORRECTIVE = 2;
     */
    CORRECTIVE = 2,
    /**
     * @generated from enum value: MAINTENANCE_TYPE_INSPECTION = 3;
     */
    INSPECTION = 3,
    /**
     * @generated from enum value: MAINTENANCE_TYPE_CALIBRATION = 4;
     */
    CALIBRATION = 4,
    /**
     * @generated from enum value: MAINTENANCE_TYPE_OVERHAUL = 5;
     */
    OVERHAUL = 5
}
/**
 * Describes the enum domain.asset.v1.MaintenanceType.
 */
export declare const MaintenanceTypeSchema: GenEnum<MaintenanceType>;
/**
 * MaintenanceStatus tracks the progress of a maintenance event.
 *
 * @generated from enum domain.asset.v1.MaintenanceStatus
 */
export declare enum MaintenanceStatus {
    /**
     * @generated from enum value: MAINTENANCE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: MAINTENANCE_STATUS_SCHEDULED = 1;
     */
    SCHEDULED = 1,
    /**
     * @generated from enum value: MAINTENANCE_STATUS_IN_PROGRESS = 2;
     */
    IN_PROGRESS = 2,
    /**
     * @generated from enum value: MAINTENANCE_STATUS_COMPLETED = 3;
     */
    COMPLETED = 3,
    /**
     * @generated from enum value: MAINTENANCE_STATUS_CANCELLED = 4;
     */
    CANCELLED = 4,
    /**
     * @generated from enum value: MAINTENANCE_STATUS_OVERDUE = 5;
     */
    OVERDUE = 5
}
/**
 * Describes the enum domain.asset.v1.MaintenanceStatus.
 */
export declare const MaintenanceStatusSchema: GenEnum<MaintenanceStatus>;
/**
 * MaintenancePriority indicates urgency of the maintenance work.
 *
 * @generated from enum domain.asset.v1.MaintenancePriority
 */
export declare enum MaintenancePriority {
    /**
     * @generated from enum value: MAINTENANCE_PRIORITY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: MAINTENANCE_PRIORITY_LOW = 1;
     */
    LOW = 1,
    /**
     * @generated from enum value: MAINTENANCE_PRIORITY_MEDIUM = 2;
     */
    MEDIUM = 2,
    /**
     * @generated from enum value: MAINTENANCE_PRIORITY_HIGH = 3;
     */
    HIGH = 3,
    /**
     * @generated from enum value: MAINTENANCE_PRIORITY_CRITICAL = 4;
     */
    CRITICAL = 4
}
/**
 * Describes the enum domain.asset.v1.MaintenancePriority.
 */
export declare const MaintenancePrioritySchema: GenEnum<MaintenancePriority>;
/**
 * @generated from service domain.asset.v1.AssetMaintenanceDomainService
 */
export declare const AssetMaintenanceDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.CreateAssetMaintenance
     */
    createAssetMaintenance: {
        methodKind: "unary";
        input: typeof CreateAssetMaintenanceRequestSchema;
        output: typeof CreateAssetMaintenanceResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.ReadAssetMaintenance
     */
    readAssetMaintenance: {
        methodKind: "unary";
        input: typeof ReadAssetMaintenanceRequestSchema;
        output: typeof ReadAssetMaintenanceResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.UpdateAssetMaintenance
     */
    updateAssetMaintenance: {
        methodKind: "unary";
        input: typeof UpdateAssetMaintenanceRequestSchema;
        output: typeof UpdateAssetMaintenanceResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.DeleteAssetMaintenance
     */
    deleteAssetMaintenance: {
        methodKind: "unary";
        input: typeof DeleteAssetMaintenanceRequestSchema;
        output: typeof DeleteAssetMaintenanceResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.ListAssetMaintenances
     */
    listAssetMaintenances: {
        methodKind: "unary";
        input: typeof ListAssetMaintenancesRequestSchema;
        output: typeof ListAssetMaintenancesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.GetAssetMaintenanceListPageData
     */
    getAssetMaintenanceListPageData: {
        methodKind: "unary";
        input: typeof GetAssetMaintenanceListPageDataRequestSchema;
        output: typeof GetAssetMaintenanceListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetMaintenanceDomainService.GetAssetMaintenanceItemPageData
     */
    getAssetMaintenanceItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetMaintenanceItemPageDataRequestSchema;
        output: typeof GetAssetMaintenanceItemPageDataResponseSchema;
    };
}>;
