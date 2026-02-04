import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Location } from "../location/location_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/location_attribute/location_attribute.proto.
 */
export declare const file_domain_entity_location_attribute_location_attribute: GenFile;
/**
 * @generated from message domain.entity.v1.LocationAttribute
 */
export type LocationAttribute = Message<"domain.entity.v1.LocationAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string location_id = 2;
     */
    locationId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.entity.v1.Location location = 5;
     */
    location?: Location;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.entity.v1.LocationAttribute.
 * Use `create(LocationAttributeSchema)` to create a new message.
 */
export declare const LocationAttributeSchema: GenMessage<LocationAttribute>;
/**
 * @generated from message domain.entity.v1.CreateLocationAttributeRequest
 */
export type CreateLocationAttributeRequest = Message<"domain.entity.v1.CreateLocationAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationAttribute data = 1;
     */
    data?: LocationAttribute;
};
/**
 * Describes the message domain.entity.v1.CreateLocationAttributeRequest.
 * Use `create(CreateLocationAttributeRequestSchema)` to create a new message.
 */
export declare const CreateLocationAttributeRequestSchema: GenMessage<CreateLocationAttributeRequest>;
/**
 * @generated from message domain.entity.v1.CreateLocationAttributeResponse
 */
export type CreateLocationAttributeResponse = Message<"domain.entity.v1.CreateLocationAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationAttribute data = 1;
     */
    data: LocationAttribute[];
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
 * Describes the message domain.entity.v1.CreateLocationAttributeResponse.
 * Use `create(CreateLocationAttributeResponseSchema)` to create a new message.
 */
export declare const CreateLocationAttributeResponseSchema: GenMessage<CreateLocationAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ReadLocationAttributeRequest
 */
export type ReadLocationAttributeRequest = Message<"domain.entity.v1.ReadLocationAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationAttribute data = 1;
     */
    data?: LocationAttribute;
};
/**
 * Describes the message domain.entity.v1.ReadLocationAttributeRequest.
 * Use `create(ReadLocationAttributeRequestSchema)` to create a new message.
 */
export declare const ReadLocationAttributeRequestSchema: GenMessage<ReadLocationAttributeRequest>;
/**
 * @generated from message domain.entity.v1.ReadLocationAttributeResponse
 */
export type ReadLocationAttributeResponse = Message<"domain.entity.v1.ReadLocationAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationAttribute data = 1;
     */
    data: LocationAttribute[];
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
 * Describes the message domain.entity.v1.ReadLocationAttributeResponse.
 * Use `create(ReadLocationAttributeResponseSchema)` to create a new message.
 */
export declare const ReadLocationAttributeResponseSchema: GenMessage<ReadLocationAttributeResponse>;
/**
 * @generated from message domain.entity.v1.UpdateLocationAttributeRequest
 */
export type UpdateLocationAttributeRequest = Message<"domain.entity.v1.UpdateLocationAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationAttribute data = 1;
     */
    data?: LocationAttribute;
};
/**
 * Describes the message domain.entity.v1.UpdateLocationAttributeRequest.
 * Use `create(UpdateLocationAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateLocationAttributeRequestSchema: GenMessage<UpdateLocationAttributeRequest>;
/**
 * @generated from message domain.entity.v1.UpdateLocationAttributeResponse
 */
export type UpdateLocationAttributeResponse = Message<"domain.entity.v1.UpdateLocationAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationAttribute data = 1;
     */
    data: LocationAttribute[];
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
 * Describes the message domain.entity.v1.UpdateLocationAttributeResponse.
 * Use `create(UpdateLocationAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateLocationAttributeResponseSchema: GenMessage<UpdateLocationAttributeResponse>;
/**
 * @generated from message domain.entity.v1.DeleteLocationAttributeRequest
 */
export type DeleteLocationAttributeRequest = Message<"domain.entity.v1.DeleteLocationAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.LocationAttribute data = 1;
     */
    data?: LocationAttribute;
};
/**
 * Describes the message domain.entity.v1.DeleteLocationAttributeRequest.
 * Use `create(DeleteLocationAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteLocationAttributeRequestSchema: GenMessage<DeleteLocationAttributeRequest>;
/**
 * @generated from message domain.entity.v1.DeleteLocationAttributeResponse
 */
export type DeleteLocationAttributeResponse = Message<"domain.entity.v1.DeleteLocationAttributeResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteLocationAttributeResponse.
 * Use `create(DeleteLocationAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteLocationAttributeResponseSchema: GenMessage<DeleteLocationAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ListLocationAttributesRequest
 */
export type ListLocationAttributesRequest = Message<"domain.entity.v1.ListLocationAttributesRequest"> & {
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
 * Describes the message domain.entity.v1.ListLocationAttributesRequest.
 * Use `create(ListLocationAttributesRequestSchema)` to create a new message.
 */
export declare const ListLocationAttributesRequestSchema: GenMessage<ListLocationAttributesRequest>;
/**
 * @generated from message domain.entity.v1.ListLocationAttributesResponse
 */
export type ListLocationAttributesResponse = Message<"domain.entity.v1.ListLocationAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationAttribute data = 1;
     */
    data: LocationAttribute[];
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
 * Describes the message domain.entity.v1.ListLocationAttributesResponse.
 * Use `create(ListLocationAttributesResponseSchema)` to create a new message.
 */
export declare const ListLocationAttributesResponseSchema: GenMessage<ListLocationAttributesResponse>;
/**
 * Enhanced list request
 *
 * @generated from message domain.entity.v1.GetLocationAttributeListPageDataRequest
 */
export type GetLocationAttributeListPageDataRequest = Message<"domain.entity.v1.GetLocationAttributeListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetLocationAttributeListPageDataRequest.
 * Use `create(GetLocationAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLocationAttributeListPageDataRequestSchema: GenMessage<GetLocationAttributeListPageDataRequest>;
/**
 * Enhanced list response
 *
 * @generated from message domain.entity.v1.GetLocationAttributeListPageDataResponse
 */
export type GetLocationAttributeListPageDataResponse = Message<"domain.entity.v1.GetLocationAttributeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.LocationAttribute location_attribute_list = 1;
     */
    locationAttributeList: LocationAttribute[];
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
 * Describes the message domain.entity.v1.GetLocationAttributeListPageDataResponse.
 * Use `create(GetLocationAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLocationAttributeListPageDataResponseSchema: GenMessage<GetLocationAttributeListPageDataResponse>;
/**
 * Item request
 *
 * @generated from message domain.entity.v1.GetLocationAttributeItemPageDataRequest
 */
export type GetLocationAttributeItemPageDataRequest = Message<"domain.entity.v1.GetLocationAttributeItemPageDataRequest"> & {
    /**
     * @generated from field: string location_attribute_id = 1;
     */
    locationAttributeId: string;
};
/**
 * Describes the message domain.entity.v1.GetLocationAttributeItemPageDataRequest.
 * Use `create(GetLocationAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLocationAttributeItemPageDataRequestSchema: GenMessage<GetLocationAttributeItemPageDataRequest>;
/**
 * Item response
 *
 * @generated from message domain.entity.v1.GetLocationAttributeItemPageDataResponse
 */
export type GetLocationAttributeItemPageDataResponse = Message<"domain.entity.v1.GetLocationAttributeItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.LocationAttribute location_attribute = 1;
     */
    locationAttribute?: LocationAttribute;
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
 * Describes the message domain.entity.v1.GetLocationAttributeItemPageDataResponse.
 * Use `create(GetLocationAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLocationAttributeItemPageDataResponseSchema: GenMessage<GetLocationAttributeItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.LocationAttributeDomainService
 */
export declare const LocationAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.CreateLocationAttribute
     */
    createLocationAttribute: {
        methodKind: "unary";
        input: typeof CreateLocationAttributeRequestSchema;
        output: typeof CreateLocationAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.ReadLocationAttribute
     */
    readLocationAttribute: {
        methodKind: "unary";
        input: typeof ReadLocationAttributeRequestSchema;
        output: typeof ReadLocationAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.UpdateLocationAttribute
     */
    updateLocationAttribute: {
        methodKind: "unary";
        input: typeof UpdateLocationAttributeRequestSchema;
        output: typeof UpdateLocationAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.DeleteLocationAttribute
     */
    deleteLocationAttribute: {
        methodKind: "unary";
        input: typeof DeleteLocationAttributeRequestSchema;
        output: typeof DeleteLocationAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.ListLocationAttributes
     */
    listLocationAttributes: {
        methodKind: "unary";
        input: typeof ListLocationAttributesRequestSchema;
        output: typeof ListLocationAttributesResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.GetLocationAttributeListPageData
     */
    getLocationAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetLocationAttributeListPageDataRequestSchema;
        output: typeof GetLocationAttributeListPageDataResponseSchema;
    };
    /**
     * Enhanced item view
     *
     * @generated from rpc domain.entity.v1.LocationAttributeDomainService.GetLocationAttributeItemPageData
     */
    getLocationAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetLocationAttributeItemPageDataRequestSchema;
        output: typeof GetLocationAttributeItemPageDataResponseSchema;
    };
}>;
