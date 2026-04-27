import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/location/location.proto.
 */
export declare const file_domain_entity_location_location: GenFile;
/**
 * FK References: revenue.location_id, expenditure.location_id,
 * inventory_item.location_id, price_list.location_id,
 * plan_location.location_id, location_attribute.location_id
 *
 * @generated from message domain.entity.v1.Location
 */
export type Location = Message<"domain.entity.v1.Location"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string address = 3;
     */
    address: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: optional string description = 9;
     */
    description?: string;
    /**
     * IANA timezone e.g. "Asia/Manila"
     *
     * @generated from field: optional string timezone = 10;
     */
    timezone?: string;
    /**
     * FK to location_area — Location belongs to at most one LocationArea
     * (LocationArea is a group of Locations, not the other way around).
     *
     * @generated from field: optional string location_area_id = 11;
     */
    locationAreaId?: string;
    /**
     * @generated from field: optional string workspace_id = 12;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.entity.v1.Location.
 * Use `create(LocationSchema)` to create a new message.
 */
export declare const LocationSchema: GenMessage<Location>;
/**
 * @generated from message domain.entity.v1.CreateLocationRequest
 */
export type CreateLocationRequest = Message<"domain.entity.v1.CreateLocationRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Location data = 1;
     */
    data?: Location;
};
/**
 * Describes the message domain.entity.v1.CreateLocationRequest.
 * Use `create(CreateLocationRequestSchema)` to create a new message.
 */
export declare const CreateLocationRequestSchema: GenMessage<CreateLocationRequest>;
/**
 * @generated from message domain.entity.v1.CreateLocationResponse
 */
export type CreateLocationResponse = Message<"domain.entity.v1.CreateLocationResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Location data = 1;
     */
    data: Location[];
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
 * Describes the message domain.entity.v1.CreateLocationResponse.
 * Use `create(CreateLocationResponseSchema)` to create a new message.
 */
export declare const CreateLocationResponseSchema: GenMessage<CreateLocationResponse>;
/**
 * @generated from message domain.entity.v1.ReadLocationRequest
 */
export type ReadLocationRequest = Message<"domain.entity.v1.ReadLocationRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Location data = 1;
     */
    data?: Location;
};
/**
 * Describes the message domain.entity.v1.ReadLocationRequest.
 * Use `create(ReadLocationRequestSchema)` to create a new message.
 */
export declare const ReadLocationRequestSchema: GenMessage<ReadLocationRequest>;
/**
 * @generated from message domain.entity.v1.ReadLocationResponse
 */
export type ReadLocationResponse = Message<"domain.entity.v1.ReadLocationResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Location data = 1;
     */
    data: Location[];
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
 * Describes the message domain.entity.v1.ReadLocationResponse.
 * Use `create(ReadLocationResponseSchema)` to create a new message.
 */
export declare const ReadLocationResponseSchema: GenMessage<ReadLocationResponse>;
/**
 * @generated from message domain.entity.v1.UpdateLocationRequest
 */
export type UpdateLocationRequest = Message<"domain.entity.v1.UpdateLocationRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Location data = 1;
     */
    data?: Location;
};
/**
 * Describes the message domain.entity.v1.UpdateLocationRequest.
 * Use `create(UpdateLocationRequestSchema)` to create a new message.
 */
export declare const UpdateLocationRequestSchema: GenMessage<UpdateLocationRequest>;
/**
 * @generated from message domain.entity.v1.UpdateLocationResponse
 */
export type UpdateLocationResponse = Message<"domain.entity.v1.UpdateLocationResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Location data = 1;
     */
    data: Location[];
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
 * Describes the message domain.entity.v1.UpdateLocationResponse.
 * Use `create(UpdateLocationResponseSchema)` to create a new message.
 */
export declare const UpdateLocationResponseSchema: GenMessage<UpdateLocationResponse>;
/**
 * @generated from message domain.entity.v1.DeleteLocationRequest
 */
export type DeleteLocationRequest = Message<"domain.entity.v1.DeleteLocationRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Location data = 1;
     */
    data?: Location;
};
/**
 * Describes the message domain.entity.v1.DeleteLocationRequest.
 * Use `create(DeleteLocationRequestSchema)` to create a new message.
 */
export declare const DeleteLocationRequestSchema: GenMessage<DeleteLocationRequest>;
/**
 * @generated from message domain.entity.v1.DeleteLocationResponse
 */
export type DeleteLocationResponse = Message<"domain.entity.v1.DeleteLocationResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteLocationResponse.
 * Use `create(DeleteLocationResponseSchema)` to create a new message.
 */
export declare const DeleteLocationResponseSchema: GenMessage<DeleteLocationResponse>;
/**
 * @generated from message domain.entity.v1.ListLocationsRequest
 */
export type ListLocationsRequest = Message<"domain.entity.v1.ListLocationsRequest"> & {
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
 * Describes the message domain.entity.v1.ListLocationsRequest.
 * Use `create(ListLocationsRequestSchema)` to create a new message.
 */
export declare const ListLocationsRequestSchema: GenMessage<ListLocationsRequest>;
/**
 * @generated from message domain.entity.v1.ListLocationsResponse
 */
export type ListLocationsResponse = Message<"domain.entity.v1.ListLocationsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Location data = 1;
     */
    data: Location[];
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
 * Describes the message domain.entity.v1.ListLocationsResponse.
 * Use `create(ListLocationsResponseSchema)` to create a new message.
 */
export declare const ListLocationsResponseSchema: GenMessage<ListLocationsResponse>;
/**
 * NEW: Enhanced list request with search, filtering, sorting, pagination
 *
 * @generated from message domain.entity.v1.GetLocationListPageDataRequest
 */
export type GetLocationListPageDataRequest = Message<"domain.entity.v1.GetLocationListPageDataRequest"> & {
    /**
     * Pagination parameters
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter parameters
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort parameters
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search parameters
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetLocationListPageDataRequest.
 * Use `create(GetLocationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLocationListPageDataRequestSchema: GenMessage<GetLocationListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetLocationListPageDataResponse
 */
export type GetLocationListPageDataResponse = Message<"domain.entity.v1.GetLocationListPageDataResponse"> & {
    /**
     * The location data
     *
     * @generated from field: repeated domain.entity.v1.Location location_list = 1;
     */
    locationList: Location[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.GetLocationListPageDataResponse.
 * Use `create(GetLocationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLocationListPageDataResponseSchema: GenMessage<GetLocationListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetLocationItemPageDataRequest
 */
export type GetLocationItemPageDataRequest = Message<"domain.entity.v1.GetLocationItemPageDataRequest"> & {
    /**
     * The location ID to retrieve
     *
     * @generated from field: string location_id = 1;
     */
    locationId: string;
};
/**
 * Describes the message domain.entity.v1.GetLocationItemPageDataRequest.
 * Use `create(GetLocationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLocationItemPageDataRequestSchema: GenMessage<GetLocationItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetLocationItemPageDataResponse
 */
export type GetLocationItemPageDataResponse = Message<"domain.entity.v1.GetLocationItemPageDataResponse"> & {
    /**
     * The location data
     *
     * @generated from field: domain.entity.v1.Location location = 1;
     */
    location?: Location;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.GetLocationItemPageDataResponse.
 * Use `create(GetLocationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLocationItemPageDataResponseSchema: GenMessage<GetLocationItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.LocationDomainService
 */
export declare const LocationDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.LocationDomainService.CreateLocation
     */
    createLocation: {
        methodKind: "unary";
        input: typeof CreateLocationRequestSchema;
        output: typeof CreateLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationDomainService.ReadLocation
     */
    readLocation: {
        methodKind: "unary";
        input: typeof ReadLocationRequestSchema;
        output: typeof ReadLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationDomainService.UpdateLocation
     */
    updateLocation: {
        methodKind: "unary";
        input: typeof UpdateLocationRequestSchema;
        output: typeof UpdateLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationDomainService.DeleteLocation
     */
    deleteLocation: {
        methodKind: "unary";
        input: typeof DeleteLocationRequestSchema;
        output: typeof DeleteLocationResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationDomainService.ListLocations
     */
    listLocations: {
        methodKind: "unary";
        input: typeof ListLocationsRequestSchema;
        output: typeof ListLocationsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.LocationDomainService.GetLocationListPageData
     */
    getLocationListPageData: {
        methodKind: "unary";
        input: typeof GetLocationListPageDataRequestSchema;
        output: typeof GetLocationListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.LocationDomainService.GetLocationItemPageData
     */
    getLocationItemPageData: {
        methodKind: "unary";
        input: typeof GetLocationItemPageDataRequestSchema;
        output: typeof GetLocationItemPageDataResponseSchema;
    };
}>;
