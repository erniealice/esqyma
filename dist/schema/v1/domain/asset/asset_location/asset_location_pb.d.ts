import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Location } from "../../entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_location/asset_location.proto.
 */
export declare const file_domain_asset_asset_location_asset_location: GenFile;
/**
 * @generated from message domain.asset.v1.AssetLocation
 */
export type AssetLocation = Message<"domain.asset.v1.AssetLocation"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: string location_id = 3;
     */
    locationId: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 4;
     */
    location?: Location;
    /**
     * @generated from field: bool is_primary = 5;
     */
    isPrimary: boolean;
    /**
     * @generated from field: domain.asset.v1.AssetAssignmentType assignment_type = 6;
     */
    assignmentType: AssetAssignmentType;
    /**
     * @generated from field: optional int64 date_assigned = 7;
     */
    dateAssigned?: bigint;
    /**
     * @generated from field: optional string date_assigned_string = 8;
     */
    dateAssignedString?: string;
    /**
     * @generated from field: optional int64 date_unassigned = 9;
     */
    dateUnassigned?: bigint;
    /**
     * @generated from field: optional string date_unassigned_string = 10;
     */
    dateUnassignedString?: string;
    /**
     * @generated from field: optional string notes = 11;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 16;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.AssetLocation.
 * Use `create(AssetLocationSchema)` to create a new message.
 */
export declare const AssetLocationSchema: GenMessage<AssetLocation>;
/**
 * @generated from message domain.asset.v1.CreateAssetLocationRequest
 */
export type CreateAssetLocationRequest = Message<"domain.asset.v1.CreateAssetLocationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetLocation data = 1;
     */
    data?: AssetLocation;
};
/**
 * Describes the message domain.asset.v1.CreateAssetLocationRequest.
 * Use `create(CreateAssetLocationRequestSchema)` to create a new message.
 */
export declare const CreateAssetLocationRequestSchema: GenMessage<CreateAssetLocationRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetLocationResponse
 */
export type CreateAssetLocationResponse = Message<"domain.asset.v1.CreateAssetLocationResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetLocation data = 1;
     */
    data: AssetLocation[];
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
 * Describes the message domain.asset.v1.CreateAssetLocationResponse.
 * Use `create(CreateAssetLocationResponseSchema)` to create a new message.
 */
export declare const CreateAssetLocationResponseSchema: GenMessage<CreateAssetLocationResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetLocationRequest
 */
export type ReadAssetLocationRequest = Message<"domain.asset.v1.ReadAssetLocationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetLocation data = 1;
     */
    data?: AssetLocation;
};
/**
 * Describes the message domain.asset.v1.ReadAssetLocationRequest.
 * Use `create(ReadAssetLocationRequestSchema)` to create a new message.
 */
export declare const ReadAssetLocationRequestSchema: GenMessage<ReadAssetLocationRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetLocationResponse
 */
export type ReadAssetLocationResponse = Message<"domain.asset.v1.ReadAssetLocationResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetLocation data = 1;
     */
    data: AssetLocation[];
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
 * Describes the message domain.asset.v1.ReadAssetLocationResponse.
 * Use `create(ReadAssetLocationResponseSchema)` to create a new message.
 */
export declare const ReadAssetLocationResponseSchema: GenMessage<ReadAssetLocationResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetLocationRequest
 */
export type UpdateAssetLocationRequest = Message<"domain.asset.v1.UpdateAssetLocationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetLocation data = 1;
     */
    data?: AssetLocation;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetLocationRequest.
 * Use `create(UpdateAssetLocationRequestSchema)` to create a new message.
 */
export declare const UpdateAssetLocationRequestSchema: GenMessage<UpdateAssetLocationRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetLocationResponse
 */
export type UpdateAssetLocationResponse = Message<"domain.asset.v1.UpdateAssetLocationResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetLocation data = 1;
     */
    data: AssetLocation[];
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
 * Describes the message domain.asset.v1.UpdateAssetLocationResponse.
 * Use `create(UpdateAssetLocationResponseSchema)` to create a new message.
 */
export declare const UpdateAssetLocationResponseSchema: GenMessage<UpdateAssetLocationResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetLocationRequest
 */
export type DeleteAssetLocationRequest = Message<"domain.asset.v1.DeleteAssetLocationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetLocation data = 1;
     */
    data?: AssetLocation;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetLocationRequest.
 * Use `create(DeleteAssetLocationRequestSchema)` to create a new message.
 */
export declare const DeleteAssetLocationRequestSchema: GenMessage<DeleteAssetLocationRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetLocationResponse
 */
export type DeleteAssetLocationResponse = Message<"domain.asset.v1.DeleteAssetLocationResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetLocationResponse.
 * Use `create(DeleteAssetLocationResponseSchema)` to create a new message.
 */
export declare const DeleteAssetLocationResponseSchema: GenMessage<DeleteAssetLocationResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetLocationsRequest
 */
export type ListAssetLocationsRequest = Message<"domain.asset.v1.ListAssetLocationsRequest"> & {
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
 * Describes the message domain.asset.v1.ListAssetLocationsRequest.
 * Use `create(ListAssetLocationsRequestSchema)` to create a new message.
 */
export declare const ListAssetLocationsRequestSchema: GenMessage<ListAssetLocationsRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetLocationsResponse
 */
export type ListAssetLocationsResponse = Message<"domain.asset.v1.ListAssetLocationsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetLocation data = 1;
     */
    data: AssetLocation[];
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
 * Describes the message domain.asset.v1.ListAssetLocationsResponse.
 * Use `create(ListAssetLocationsResponseSchema)` to create a new message.
 */
export declare const ListAssetLocationsResponseSchema: GenMessage<ListAssetLocationsResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetLocationListPageDataRequest
 */
export type GetAssetLocationListPageDataRequest = Message<"domain.asset.v1.GetAssetLocationListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetLocationListPageDataRequest.
 * Use `create(GetAssetLocationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetLocationListPageDataRequestSchema: GenMessage<GetAssetLocationListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetLocationListPageDataResponse
 */
export type GetAssetLocationListPageDataResponse = Message<"domain.asset.v1.GetAssetLocationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetLocation asset_location_list = 1;
     */
    assetLocationList: AssetLocation[];
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
 * Describes the message domain.asset.v1.GetAssetLocationListPageDataResponse.
 * Use `create(GetAssetLocationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetLocationListPageDataResponseSchema: GenMessage<GetAssetLocationListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetLocationItemPageDataRequest
 */
export type GetAssetLocationItemPageDataRequest = Message<"domain.asset.v1.GetAssetLocationItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_location_id = 1;
     */
    assetLocationId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetLocationItemPageDataRequest.
 * Use `create(GetAssetLocationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetLocationItemPageDataRequestSchema: GenMessage<GetAssetLocationItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetLocationItemPageDataResponse
 */
export type GetAssetLocationItemPageDataResponse = Message<"domain.asset.v1.GetAssetLocationItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetLocation asset_location = 1;
     */
    assetLocation?: AssetLocation;
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
 * Describes the message domain.asset.v1.GetAssetLocationItemPageDataResponse.
 * Use `create(GetAssetLocationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetLocationItemPageDataResponseSchema: GenMessage<GetAssetLocationItemPageDataResponse>;
/**
 * AssetAssignmentType describes how an asset relates to a location.
 *
 * @generated from enum domain.asset.v1.AssetAssignmentType
 */
export declare enum AssetAssignmentType {
    /**
     * @generated from enum value: ASSET_ASSIGNMENT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Asset belongs to this location (home base)
     *
     * @generated from enum value: ASSET_ASSIGNMENT_TYPE_PERMANENT = 1;
     */
    PERMANENT = 1,
    /**
     * Asset is shared across locations (bookable)
     *
     * @generated from enum value: ASSET_ASSIGNMENT_TYPE_SHARED = 2;
     */
    SHARED = 2,
    /**
     * Temporarily assigned (e.g., loaned, on rotation)
     *
     * @generated from enum value: ASSET_ASSIGNMENT_TYPE_TEMPORARY = 3;
     */
    TEMPORARY = 3,
    /**
     * Asset travels between locations (e.g., mobile van)
     *
     * @generated from enum value: ASSET_ASSIGNMENT_TYPE_MOBILE = 4;
     */
    MOBILE = 4
}
/**
 * Describes the enum domain.asset.v1.AssetAssignmentType.
 */
export declare const AssetAssignmentTypeSchema: GenEnum<AssetAssignmentType>;
/**
 * @generated from service domain.asset.v1.AssetLocationDomainService
 */
export declare const AssetLocationDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.CreateAssetLocation
     */
    createAssetLocation: {
        methodKind: "unary";
        input: typeof CreateAssetLocationRequestSchema;
        output: typeof CreateAssetLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.ReadAssetLocation
     */
    readAssetLocation: {
        methodKind: "unary";
        input: typeof ReadAssetLocationRequestSchema;
        output: typeof ReadAssetLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.UpdateAssetLocation
     */
    updateAssetLocation: {
        methodKind: "unary";
        input: typeof UpdateAssetLocationRequestSchema;
        output: typeof UpdateAssetLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.DeleteAssetLocation
     */
    deleteAssetLocation: {
        methodKind: "unary";
        input: typeof DeleteAssetLocationRequestSchema;
        output: typeof DeleteAssetLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.ListAssetLocations
     */
    listAssetLocations: {
        methodKind: "unary";
        input: typeof ListAssetLocationsRequestSchema;
        output: typeof ListAssetLocationsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.GetAssetLocationListPageData
     */
    getAssetLocationListPageData: {
        methodKind: "unary";
        input: typeof GetAssetLocationListPageDataRequestSchema;
        output: typeof GetAssetLocationListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetLocationDomainService.GetAssetLocationItemPageData
     */
    getAssetLocationItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetLocationItemPageDataRequestSchema;
        output: typeof GetAssetLocationItemPageDataResponseSchema;
    };
}>;
