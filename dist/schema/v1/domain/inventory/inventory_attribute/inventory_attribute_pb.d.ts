import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { InventoryItem } from "../inventory_item/inventory_item_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/inventory/inventory_attribute/inventory_attribute.proto.
 */
export declare const file_domain_inventory_inventory_attribute_inventory_attribute: GenFile;
/**
 * @generated from message domain.inventory.v1.InventoryAttribute
 */
export type InventoryAttribute = Message<"domain.inventory.v1.InventoryAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string inventory_item_id = 2;
     */
    inventoryItemId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.inventory.v1.InventoryItem inventory_item = 5;
     */
    inventoryItem?: InventoryItem;
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
 * Describes the message domain.inventory.v1.InventoryAttribute.
 * Use `create(InventoryAttributeSchema)` to create a new message.
 */
export declare const InventoryAttributeSchema: GenMessage<InventoryAttribute>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryAttributeRequest
 */
export type CreateInventoryAttributeRequest = Message<"domain.inventory.v1.CreateInventoryAttributeRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryAttribute data = 1;
     */
    data?: InventoryAttribute;
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryAttributeRequest.
 * Use `create(CreateInventoryAttributeRequestSchema)` to create a new message.
 */
export declare const CreateInventoryAttributeRequestSchema: GenMessage<CreateInventoryAttributeRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryAttributeResponse
 */
export type CreateInventoryAttributeResponse = Message<"domain.inventory.v1.CreateInventoryAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
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
 * Describes the message domain.inventory.v1.CreateInventoryAttributeResponse.
 * Use `create(CreateInventoryAttributeResponseSchema)` to create a new message.
 */
export declare const CreateInventoryAttributeResponseSchema: GenMessage<CreateInventoryAttributeResponse>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryAttributeBatchRequest
 */
export type CreateInventoryAttributeBatchRequest = Message<"domain.inventory.v1.CreateInventoryAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryAttributeBatchRequest.
 * Use `create(CreateInventoryAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateInventoryAttributeBatchRequestSchema: GenMessage<CreateInventoryAttributeBatchRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryAttributeBatchResponse
 */
export type CreateInventoryAttributeBatchResponse = Message<"domain.inventory.v1.CreateInventoryAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
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
 * Describes the message domain.inventory.v1.CreateInventoryAttributeBatchResponse.
 * Use `create(CreateInventoryAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateInventoryAttributeBatchResponseSchema: GenMessage<CreateInventoryAttributeBatchResponse>;
/**
 * CreateInventoryAttributesByCode creates inventory attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.inventory.v1.InventoryAttributesByCodeData
 */
export type InventoryAttributesByCodeData = Message<"domain.inventory.v1.InventoryAttributesByCodeData"> & {
    /**
     * @generated from field: string inventory_item_id = 1;
     */
    inventoryItemId: string;
    /**
     * {"attribute_code": "value", ...}
     *
     * @generated from field: map<string, string> attributes_map = 2;
     */
    attributesMap: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.inventory.v1.InventoryAttributesByCodeData.
 * Use `create(InventoryAttributesByCodeDataSchema)` to create a new message.
 */
export declare const InventoryAttributesByCodeDataSchema: GenMessage<InventoryAttributesByCodeData>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryAttributesByCodeRequest
 */
export type CreateInventoryAttributesByCodeRequest = Message<"domain.inventory.v1.CreateInventoryAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryAttributesByCodeData data = 1;
     */
    data?: InventoryAttributesByCodeData;
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryAttributesByCodeRequest.
 * Use `create(CreateInventoryAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateInventoryAttributesByCodeRequestSchema: GenMessage<CreateInventoryAttributesByCodeRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryAttributesByCodeResponse
 */
export type CreateInventoryAttributesByCodeResponse = Message<"domain.inventory.v1.CreateInventoryAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
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
 * Describes the message domain.inventory.v1.CreateInventoryAttributesByCodeResponse.
 * Use `create(CreateInventoryAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateInventoryAttributesByCodeResponseSchema: GenMessage<CreateInventoryAttributesByCodeResponse>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryAttributeRequest
 */
export type ReadInventoryAttributeRequest = Message<"domain.inventory.v1.ReadInventoryAttributeRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryAttribute data = 1;
     */
    data?: InventoryAttribute;
};
/**
 * Describes the message domain.inventory.v1.ReadInventoryAttributeRequest.
 * Use `create(ReadInventoryAttributeRequestSchema)` to create a new message.
 */
export declare const ReadInventoryAttributeRequestSchema: GenMessage<ReadInventoryAttributeRequest>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryAttributeResponse
 */
export type ReadInventoryAttributeResponse = Message<"domain.inventory.v1.ReadInventoryAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
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
 * Describes the message domain.inventory.v1.ReadInventoryAttributeResponse.
 * Use `create(ReadInventoryAttributeResponseSchema)` to create a new message.
 */
export declare const ReadInventoryAttributeResponseSchema: GenMessage<ReadInventoryAttributeResponse>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryAttributeRequest
 */
export type UpdateInventoryAttributeRequest = Message<"domain.inventory.v1.UpdateInventoryAttributeRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryAttribute data = 1;
     */
    data?: InventoryAttribute;
};
/**
 * Describes the message domain.inventory.v1.UpdateInventoryAttributeRequest.
 * Use `create(UpdateInventoryAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateInventoryAttributeRequestSchema: GenMessage<UpdateInventoryAttributeRequest>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryAttributeResponse
 */
export type UpdateInventoryAttributeResponse = Message<"domain.inventory.v1.UpdateInventoryAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
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
 * Describes the message domain.inventory.v1.UpdateInventoryAttributeResponse.
 * Use `create(UpdateInventoryAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateInventoryAttributeResponseSchema: GenMessage<UpdateInventoryAttributeResponse>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryAttributeRequest
 */
export type DeleteInventoryAttributeRequest = Message<"domain.inventory.v1.DeleteInventoryAttributeRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryAttribute data = 1;
     */
    data?: InventoryAttribute;
};
/**
 * Describes the message domain.inventory.v1.DeleteInventoryAttributeRequest.
 * Use `create(DeleteInventoryAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteInventoryAttributeRequestSchema: GenMessage<DeleteInventoryAttributeRequest>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryAttributeResponse
 */
export type DeleteInventoryAttributeResponse = Message<"domain.inventory.v1.DeleteInventoryAttributeResponse"> & {
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
 * Describes the message domain.inventory.v1.DeleteInventoryAttributeResponse.
 * Use `create(DeleteInventoryAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteInventoryAttributeResponseSchema: GenMessage<DeleteInventoryAttributeResponse>;
/**
 * @generated from message domain.inventory.v1.ListInventoryAttributesRequest
 */
export type ListInventoryAttributesRequest = Message<"domain.inventory.v1.ListInventoryAttributesRequest"> & {
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
 * Describes the message domain.inventory.v1.ListInventoryAttributesRequest.
 * Use `create(ListInventoryAttributesRequestSchema)` to create a new message.
 */
export declare const ListInventoryAttributesRequestSchema: GenMessage<ListInventoryAttributesRequest>;
/**
 * @generated from message domain.inventory.v1.ListInventoryAttributesResponse
 */
export type ListInventoryAttributesResponse = Message<"domain.inventory.v1.ListInventoryAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute data = 1;
     */
    data: InventoryAttribute[];
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
 * Describes the message domain.inventory.v1.ListInventoryAttributesResponse.
 * Use `create(ListInventoryAttributesResponseSchema)` to create a new message.
 */
export declare const ListInventoryAttributesResponseSchema: GenMessage<ListInventoryAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.inventory.v1.GetInventoryAttributeListPageDataRequest
 */
export type GetInventoryAttributeListPageDataRequest = Message<"domain.inventory.v1.GetInventoryAttributeListPageDataRequest"> & {
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
 * Describes the message domain.inventory.v1.GetInventoryAttributeListPageDataRequest.
 * Use `create(GetInventoryAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryAttributeListPageDataRequestSchema: GenMessage<GetInventoryAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.inventory.v1.GetInventoryAttributeListPageDataResponse
 */
export type GetInventoryAttributeListPageDataResponse = Message<"domain.inventory.v1.GetInventoryAttributeListPageDataResponse"> & {
    /**
     * The inventory attribute data
     *
     * @generated from field: repeated domain.inventory.v1.InventoryAttribute inventory_attribute_list = 1;
     */
    inventoryAttributeList: InventoryAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.inventory.v1.GetInventoryAttributeListPageDataResponse.
 * Use `create(GetInventoryAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryAttributeListPageDataResponseSchema: GenMessage<GetInventoryAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.inventory.v1.GetInventoryAttributeItemPageDataRequest
 */
export type GetInventoryAttributeItemPageDataRequest = Message<"domain.inventory.v1.GetInventoryAttributeItemPageDataRequest"> & {
    /**
     * The inventory attribute ID to retrieve
     *
     * @generated from field: string inventory_attribute_id = 1;
     */
    inventoryAttributeId: string;
};
/**
 * Describes the message domain.inventory.v1.GetInventoryAttributeItemPageDataRequest.
 * Use `create(GetInventoryAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryAttributeItemPageDataRequestSchema: GenMessage<GetInventoryAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.inventory.v1.GetInventoryAttributeItemPageDataResponse
 */
export type GetInventoryAttributeItemPageDataResponse = Message<"domain.inventory.v1.GetInventoryAttributeItemPageDataResponse"> & {
    /**
     * The inventory attribute data
     *
     * @generated from field: domain.inventory.v1.InventoryAttribute inventory_attribute = 1;
     */
    inventoryAttribute?: InventoryAttribute;
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
 * Describes the message domain.inventory.v1.GetInventoryAttributeItemPageDataResponse.
 * Use `create(GetInventoryAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryAttributeItemPageDataResponseSchema: GenMessage<GetInventoryAttributeItemPageDataResponse>;
/**
 * @generated from service domain.inventory.v1.InventoryAttributeDomainService
 */
export declare const InventoryAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.CreateInventoryAttribute
     */
    createInventoryAttribute: {
        methodKind: "unary";
        input: typeof CreateInventoryAttributeRequestSchema;
        output: typeof CreateInventoryAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.ReadInventoryAttribute
     */
    readInventoryAttribute: {
        methodKind: "unary";
        input: typeof ReadInventoryAttributeRequestSchema;
        output: typeof ReadInventoryAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.UpdateInventoryAttribute
     */
    updateInventoryAttribute: {
        methodKind: "unary";
        input: typeof UpdateInventoryAttributeRequestSchema;
        output: typeof UpdateInventoryAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.DeleteInventoryAttribute
     */
    deleteInventoryAttribute: {
        methodKind: "unary";
        input: typeof DeleteInventoryAttributeRequestSchema;
        output: typeof DeleteInventoryAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.ListInventoryAttributes
     */
    listInventoryAttributes: {
        methodKind: "unary";
        input: typeof ListInventoryAttributesRequestSchema;
        output: typeof ListInventoryAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.GetInventoryAttributeListPageData
     */
    getInventoryAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetInventoryAttributeListPageDataRequestSchema;
        output: typeof GetInventoryAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.inventory.v1.InventoryAttributeDomainService.GetInventoryAttributeItemPageData
     */
    getInventoryAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetInventoryAttributeItemPageDataRequestSchema;
        output: typeof GetInventoryAttributeItemPageDataResponseSchema;
    };
}>;
