import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Staff } from "../staff/staff_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/staff_attribute/staff_attribute.proto.
 */
export declare const file_domain_entity_staff_attribute_staff_attribute: GenFile;
/**
 * @generated from message domain.entity.v1.StaffAttribute
 */
export type StaffAttribute = Message<"domain.entity.v1.StaffAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string staff_id = 2;
     */
    staffId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.entity.v1.Staff staff = 5;
     */
    staff?: Staff;
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
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.StaffAttribute.
 * Use `create(StaffAttributeSchema)` to create a new message.
 */
export declare const StaffAttributeSchema: GenMessage<StaffAttribute>;
/**
 * @generated from message domain.entity.v1.CreateStaffAttributeRequest
 */
export type CreateStaffAttributeRequest = Message<"domain.entity.v1.CreateStaffAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.StaffAttribute data = 1;
     */
    data?: StaffAttribute;
};
/**
 * Describes the message domain.entity.v1.CreateStaffAttributeRequest.
 * Use `create(CreateStaffAttributeRequestSchema)` to create a new message.
 */
export declare const CreateStaffAttributeRequestSchema: GenMessage<CreateStaffAttributeRequest>;
/**
 * @generated from message domain.entity.v1.CreateStaffAttributeResponse
 */
export type CreateStaffAttributeResponse = Message<"domain.entity.v1.CreateStaffAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.StaffAttribute data = 1;
     */
    data: StaffAttribute[];
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
 * Describes the message domain.entity.v1.CreateStaffAttributeResponse.
 * Use `create(CreateStaffAttributeResponseSchema)` to create a new message.
 */
export declare const CreateStaffAttributeResponseSchema: GenMessage<CreateStaffAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ReadStaffAttributeRequest
 */
export type ReadStaffAttributeRequest = Message<"domain.entity.v1.ReadStaffAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.StaffAttribute data = 1;
     */
    data?: StaffAttribute;
};
/**
 * Describes the message domain.entity.v1.ReadStaffAttributeRequest.
 * Use `create(ReadStaffAttributeRequestSchema)` to create a new message.
 */
export declare const ReadStaffAttributeRequestSchema: GenMessage<ReadStaffAttributeRequest>;
/**
 * @generated from message domain.entity.v1.ReadStaffAttributeResponse
 */
export type ReadStaffAttributeResponse = Message<"domain.entity.v1.ReadStaffAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.StaffAttribute data = 1;
     */
    data: StaffAttribute[];
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
 * Describes the message domain.entity.v1.ReadStaffAttributeResponse.
 * Use `create(ReadStaffAttributeResponseSchema)` to create a new message.
 */
export declare const ReadStaffAttributeResponseSchema: GenMessage<ReadStaffAttributeResponse>;
/**
 * @generated from message domain.entity.v1.UpdateStaffAttributeRequest
 */
export type UpdateStaffAttributeRequest = Message<"domain.entity.v1.UpdateStaffAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.StaffAttribute data = 1;
     */
    data?: StaffAttribute;
};
/**
 * Describes the message domain.entity.v1.UpdateStaffAttributeRequest.
 * Use `create(UpdateStaffAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateStaffAttributeRequestSchema: GenMessage<UpdateStaffAttributeRequest>;
/**
 * @generated from message domain.entity.v1.UpdateStaffAttributeResponse
 */
export type UpdateStaffAttributeResponse = Message<"domain.entity.v1.UpdateStaffAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.StaffAttribute data = 1;
     */
    data: StaffAttribute[];
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
 * Describes the message domain.entity.v1.UpdateStaffAttributeResponse.
 * Use `create(UpdateStaffAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateStaffAttributeResponseSchema: GenMessage<UpdateStaffAttributeResponse>;
/**
 * @generated from message domain.entity.v1.DeleteStaffAttributeRequest
 */
export type DeleteStaffAttributeRequest = Message<"domain.entity.v1.DeleteStaffAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.StaffAttribute data = 1;
     */
    data?: StaffAttribute;
};
/**
 * Describes the message domain.entity.v1.DeleteStaffAttributeRequest.
 * Use `create(DeleteStaffAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteStaffAttributeRequestSchema: GenMessage<DeleteStaffAttributeRequest>;
/**
 * @generated from message domain.entity.v1.DeleteStaffAttributeResponse
 */
export type DeleteStaffAttributeResponse = Message<"domain.entity.v1.DeleteStaffAttributeResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteStaffAttributeResponse.
 * Use `create(DeleteStaffAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteStaffAttributeResponseSchema: GenMessage<DeleteStaffAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ListStaffAttributesRequest
 */
export type ListStaffAttributesRequest = Message<"domain.entity.v1.ListStaffAttributesRequest"> & {
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
 * Describes the message domain.entity.v1.ListStaffAttributesRequest.
 * Use `create(ListStaffAttributesRequestSchema)` to create a new message.
 */
export declare const ListStaffAttributesRequestSchema: GenMessage<ListStaffAttributesRequest>;
/**
 * @generated from message domain.entity.v1.ListStaffAttributesResponse
 */
export type ListStaffAttributesResponse = Message<"domain.entity.v1.ListStaffAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.StaffAttribute data = 1;
     */
    data: StaffAttribute[];
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
 * Describes the message domain.entity.v1.ListStaffAttributesResponse.
 * Use `create(ListStaffAttributesResponseSchema)` to create a new message.
 */
export declare const ListStaffAttributesResponseSchema: GenMessage<ListStaffAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.entity.v1.GetStaffAttributeListPageDataRequest
 */
export type GetStaffAttributeListPageDataRequest = Message<"domain.entity.v1.GetStaffAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.entity.v1.GetStaffAttributeListPageDataRequest.
 * Use `create(GetStaffAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetStaffAttributeListPageDataRequestSchema: GenMessage<GetStaffAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.entity.v1.GetStaffAttributeListPageDataResponse
 */
export type GetStaffAttributeListPageDataResponse = Message<"domain.entity.v1.GetStaffAttributeListPageDataResponse"> & {
    /**
     * The staff attribute data
     *
     * @generated from field: repeated domain.entity.v1.StaffAttribute staff_attribute_list = 1;
     */
    staffAttributeList: StaffAttribute[];
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
 * Describes the message domain.entity.v1.GetStaffAttributeListPageDataResponse.
 * Use `create(GetStaffAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetStaffAttributeListPageDataResponseSchema: GenMessage<GetStaffAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.entity.v1.GetStaffAttributeItemPageDataRequest
 */
export type GetStaffAttributeItemPageDataRequest = Message<"domain.entity.v1.GetStaffAttributeItemPageDataRequest"> & {
    /**
     * The staff attribute ID to retrieve
     *
     * @generated from field: string staff_attribute_id = 1;
     */
    staffAttributeId: string;
};
/**
 * Describes the message domain.entity.v1.GetStaffAttributeItemPageDataRequest.
 * Use `create(GetStaffAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetStaffAttributeItemPageDataRequestSchema: GenMessage<GetStaffAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.entity.v1.GetStaffAttributeItemPageDataResponse
 */
export type GetStaffAttributeItemPageDataResponse = Message<"domain.entity.v1.GetStaffAttributeItemPageDataResponse"> & {
    /**
     * The staff attribute data
     *
     * @generated from field: domain.entity.v1.StaffAttribute staff_attribute = 1;
     */
    staffAttribute?: StaffAttribute;
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
 * Describes the message domain.entity.v1.GetStaffAttributeItemPageDataResponse.
 * Use `create(GetStaffAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetStaffAttributeItemPageDataResponseSchema: GenMessage<GetStaffAttributeItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.StaffAttributeDomainService
 */
export declare const StaffAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.CreateStaffAttribute
     */
    createStaffAttribute: {
        methodKind: "unary";
        input: typeof CreateStaffAttributeRequestSchema;
        output: typeof CreateStaffAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.ReadStaffAttribute
     */
    readStaffAttribute: {
        methodKind: "unary";
        input: typeof ReadStaffAttributeRequestSchema;
        output: typeof ReadStaffAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.UpdateStaffAttribute
     */
    updateStaffAttribute: {
        methodKind: "unary";
        input: typeof UpdateStaffAttributeRequestSchema;
        output: typeof UpdateStaffAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.DeleteStaffAttribute
     */
    deleteStaffAttribute: {
        methodKind: "unary";
        input: typeof DeleteStaffAttributeRequestSchema;
        output: typeof DeleteStaffAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.ListStaffAttributes
     */
    listStaffAttributes: {
        methodKind: "unary";
        input: typeof ListStaffAttributesRequestSchema;
        output: typeof ListStaffAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.GetStaffAttributeListPageData
     */
    getStaffAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetStaffAttributeListPageDataRequestSchema;
        output: typeof GetStaffAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.entity.v1.StaffAttributeDomainService.GetStaffAttributeItemPageData
     */
    getStaffAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetStaffAttributeItemPageDataRequestSchema;
        output: typeof GetStaffAttributeItemPageDataResponseSchema;
    };
}>;
