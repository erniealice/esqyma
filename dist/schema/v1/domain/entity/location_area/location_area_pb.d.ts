import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/location_area/location_area.proto.
 */
export declare const file_domain_entity_location_area_location_area: GenFile;
/**
 * @generated from message domain.entity.v1.LocationArea
 */
export type LocationArea = Message<"domain.entity.v1.LocationArea"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
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
};
/**
 * Describes the message domain.entity.v1.LocationArea.
 * Use `create(LocationAreaSchema)` to create a new message.
 */
export declare const LocationAreaSchema: GenMessage<LocationArea>;
/**
 * @generated from message domain.entity.v1.CreateLocationAreaRequest
 */
export type CreateLocationAreaRequest = Message<"domain.entity.v1.CreateLocationAreaRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationArea data = 1;
     */
    data?: LocationArea;
};
/**
 * Describes the message domain.entity.v1.CreateLocationAreaRequest.
 * Use `create(CreateLocationAreaRequestSchema)` to create a new message.
 */
export declare const CreateLocationAreaRequestSchema: GenMessage<CreateLocationAreaRequest>;
/**
 * @generated from message domain.entity.v1.CreateLocationAreaResponse
 */
export type CreateLocationAreaResponse = Message<"domain.entity.v1.CreateLocationAreaResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationArea data = 1;
     */
    data: LocationArea[];
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
 * Describes the message domain.entity.v1.CreateLocationAreaResponse.
 * Use `create(CreateLocationAreaResponseSchema)` to create a new message.
 */
export declare const CreateLocationAreaResponseSchema: GenMessage<CreateLocationAreaResponse>;
/**
 * @generated from message domain.entity.v1.ReadLocationAreaRequest
 */
export type ReadLocationAreaRequest = Message<"domain.entity.v1.ReadLocationAreaRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationArea data = 1;
     */
    data?: LocationArea;
};
/**
 * Describes the message domain.entity.v1.ReadLocationAreaRequest.
 * Use `create(ReadLocationAreaRequestSchema)` to create a new message.
 */
export declare const ReadLocationAreaRequestSchema: GenMessage<ReadLocationAreaRequest>;
/**
 * @generated from message domain.entity.v1.ReadLocationAreaResponse
 */
export type ReadLocationAreaResponse = Message<"domain.entity.v1.ReadLocationAreaResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationArea data = 1;
     */
    data: LocationArea[];
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
 * Describes the message domain.entity.v1.ReadLocationAreaResponse.
 * Use `create(ReadLocationAreaResponseSchema)` to create a new message.
 */
export declare const ReadLocationAreaResponseSchema: GenMessage<ReadLocationAreaResponse>;
/**
 * @generated from message domain.entity.v1.UpdateLocationAreaRequest
 */
export type UpdateLocationAreaRequest = Message<"domain.entity.v1.UpdateLocationAreaRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationArea data = 1;
     */
    data?: LocationArea;
};
/**
 * Describes the message domain.entity.v1.UpdateLocationAreaRequest.
 * Use `create(UpdateLocationAreaRequestSchema)` to create a new message.
 */
export declare const UpdateLocationAreaRequestSchema: GenMessage<UpdateLocationAreaRequest>;
/**
 * @generated from message domain.entity.v1.UpdateLocationAreaResponse
 */
export type UpdateLocationAreaResponse = Message<"domain.entity.v1.UpdateLocationAreaResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationArea data = 1;
     */
    data: LocationArea[];
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
 * Describes the message domain.entity.v1.UpdateLocationAreaResponse.
 * Use `create(UpdateLocationAreaResponseSchema)` to create a new message.
 */
export declare const UpdateLocationAreaResponseSchema: GenMessage<UpdateLocationAreaResponse>;
/**
 * @generated from message domain.entity.v1.DeleteLocationAreaRequest
 */
export type DeleteLocationAreaRequest = Message<"domain.entity.v1.DeleteLocationAreaRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationArea data = 1;
     */
    data?: LocationArea;
};
/**
 * Describes the message domain.entity.v1.DeleteLocationAreaRequest.
 * Use `create(DeleteLocationAreaRequestSchema)` to create a new message.
 */
export declare const DeleteLocationAreaRequestSchema: GenMessage<DeleteLocationAreaRequest>;
/**
 * @generated from message domain.entity.v1.DeleteLocationAreaResponse
 */
export type DeleteLocationAreaResponse = Message<"domain.entity.v1.DeleteLocationAreaResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteLocationAreaResponse.
 * Use `create(DeleteLocationAreaResponseSchema)` to create a new message.
 */
export declare const DeleteLocationAreaResponseSchema: GenMessage<DeleteLocationAreaResponse>;
/**
 * @generated from message domain.entity.v1.ListLocationAreasRequest
 */
export type ListLocationAreasRequest = Message<"domain.entity.v1.ListLocationAreasRequest"> & {
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
 * Describes the message domain.entity.v1.ListLocationAreasRequest.
 * Use `create(ListLocationAreasRequestSchema)` to create a new message.
 */
export declare const ListLocationAreasRequestSchema: GenMessage<ListLocationAreasRequest>;
/**
 * @generated from message domain.entity.v1.ListLocationAreasResponse
 */
export type ListLocationAreasResponse = Message<"domain.entity.v1.ListLocationAreasResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationArea data = 1;
     */
    data: LocationArea[];
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
 * Describes the message domain.entity.v1.ListLocationAreasResponse.
 * Use `create(ListLocationAreasResponseSchema)` to create a new message.
 */
export declare const ListLocationAreasResponseSchema: GenMessage<ListLocationAreasResponse>;
/**
 * @generated from message domain.entity.v1.GetLocationAreaListPageDataRequest
 */
export type GetLocationAreaListPageDataRequest = Message<"domain.entity.v1.GetLocationAreaListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetLocationAreaListPageDataRequest.
 * Use `create(GetLocationAreaListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLocationAreaListPageDataRequestSchema: GenMessage<GetLocationAreaListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetLocationAreaListPageDataResponse
 */
export type GetLocationAreaListPageDataResponse = Message<"domain.entity.v1.GetLocationAreaListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationArea location_area_list = 1;
     */
    locationAreaList: LocationArea[];
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
 * Describes the message domain.entity.v1.GetLocationAreaListPageDataResponse.
 * Use `create(GetLocationAreaListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLocationAreaListPageDataResponseSchema: GenMessage<GetLocationAreaListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetLocationAreaItemPageDataRequest
 */
export type GetLocationAreaItemPageDataRequest = Message<"domain.entity.v1.GetLocationAreaItemPageDataRequest"> & {
    /**
     * @generated from field: string location_area_id = 1;
     */
    locationAreaId: string;
};
/**
 * Describes the message domain.entity.v1.GetLocationAreaItemPageDataRequest.
 * Use `create(GetLocationAreaItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLocationAreaItemPageDataRequestSchema: GenMessage<GetLocationAreaItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetLocationAreaItemPageDataResponse
 */
export type GetLocationAreaItemPageDataResponse = Message<"domain.entity.v1.GetLocationAreaItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.LocationArea location_area = 1;
     */
    locationArea?: LocationArea;
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
 * Describes the message domain.entity.v1.GetLocationAreaItemPageDataResponse.
 * Use `create(GetLocationAreaItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLocationAreaItemPageDataResponseSchema: GenMessage<GetLocationAreaItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.LocationAreaDomainService
 */
export declare const LocationAreaDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.CreateLocationArea
     */
    createLocationArea: {
        methodKind: "unary";
        input: typeof CreateLocationAreaRequestSchema;
        output: typeof CreateLocationAreaResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.ReadLocationArea
     */
    readLocationArea: {
        methodKind: "unary";
        input: typeof ReadLocationAreaRequestSchema;
        output: typeof ReadLocationAreaResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.UpdateLocationArea
     */
    updateLocationArea: {
        methodKind: "unary";
        input: typeof UpdateLocationAreaRequestSchema;
        output: typeof UpdateLocationAreaResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.DeleteLocationArea
     */
    deleteLocationArea: {
        methodKind: "unary";
        input: typeof DeleteLocationAreaRequestSchema;
        output: typeof DeleteLocationAreaResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.ListLocationAreas
     */
    listLocationAreas: {
        methodKind: "unary";
        input: typeof ListLocationAreasRequestSchema;
        output: typeof ListLocationAreasResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.GetLocationAreaListPageData
     */
    getLocationAreaListPageData: {
        methodKind: "unary";
        input: typeof GetLocationAreaListPageDataRequestSchema;
        output: typeof GetLocationAreaListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAreaDomainService.GetLocationAreaItemPageData
     */
    getLocationAreaItemPageData: {
        methodKind: "unary";
        input: typeof GetLocationAreaItemPageDataRequestSchema;
        output: typeof GetLocationAreaItemPageDataResponseSchema;
    };
}>;
