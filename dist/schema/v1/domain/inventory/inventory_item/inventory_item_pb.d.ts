import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Product } from "../../product/product/product_pb";
import type { Location } from "../../entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/inventory/inventory_item/inventory_item.proto.
 */
export declare const file_domain_inventory_inventory_item_inventory_item: GenFile;
/**
 * @generated from message domain.inventory.v1.InventoryItem
 */
export type InventoryItem = Message<"domain.inventory.v1.InventoryItem"> & {
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
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 8;
     */
    product?: Product;
    /**
     * @generated from field: optional string product_id = 9;
     */
    productId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 10;
     */
    location?: Location;
    /**
     * @generated from field: optional string location_id = 11;
     */
    locationId?: string;
    /**
     * @generated from field: optional string sku = 12;
     */
    sku?: string;
    /**
     * @generated from field: double quantity_on_hand = 13;
     */
    quantityOnHand: number;
    /**
     * @generated from field: double quantity_reserved = 14;
     */
    quantityReserved: number;
    /**
     * @generated from field: double quantity_available = 15;
     */
    quantityAvailable: number;
    /**
     * @generated from field: optional double reorder_level = 16;
     */
    reorderLevel?: number;
    /**
     * @generated from field: string unit_of_measure = 17;
     */
    unitOfMeasure: string;
    /**
     * @generated from field: optional string notes = 18;
     */
    notes?: string;
};
/**
 * Describes the message domain.inventory.v1.InventoryItem.
 * Use `create(InventoryItemSchema)` to create a new message.
 */
export declare const InventoryItemSchema: GenMessage<InventoryItem>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryItemRequest
 */
export type CreateInventoryItemRequest = Message<"domain.inventory.v1.CreateInventoryItemRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryItem data = 1;
     */
    data?: InventoryItem;
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryItemRequest.
 * Use `create(CreateInventoryItemRequestSchema)` to create a new message.
 */
export declare const CreateInventoryItemRequestSchema: GenMessage<CreateInventoryItemRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryItemResponse
 */
export type CreateInventoryItemResponse = Message<"domain.inventory.v1.CreateInventoryItemResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryItem data = 1;
     */
    data: InventoryItem[];
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
 * Describes the message domain.inventory.v1.CreateInventoryItemResponse.
 * Use `create(CreateInventoryItemResponseSchema)` to create a new message.
 */
export declare const CreateInventoryItemResponseSchema: GenMessage<CreateInventoryItemResponse>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryItemRequest
 */
export type ReadInventoryItemRequest = Message<"domain.inventory.v1.ReadInventoryItemRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryItem data = 1;
     */
    data?: InventoryItem;
};
/**
 * Describes the message domain.inventory.v1.ReadInventoryItemRequest.
 * Use `create(ReadInventoryItemRequestSchema)` to create a new message.
 */
export declare const ReadInventoryItemRequestSchema: GenMessage<ReadInventoryItemRequest>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryItemResponse
 */
export type ReadInventoryItemResponse = Message<"domain.inventory.v1.ReadInventoryItemResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryItem data = 1;
     */
    data: InventoryItem[];
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
 * Describes the message domain.inventory.v1.ReadInventoryItemResponse.
 * Use `create(ReadInventoryItemResponseSchema)` to create a new message.
 */
export declare const ReadInventoryItemResponseSchema: GenMessage<ReadInventoryItemResponse>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryItemRequest
 */
export type UpdateInventoryItemRequest = Message<"domain.inventory.v1.UpdateInventoryItemRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryItem data = 1;
     */
    data?: InventoryItem;
};
/**
 * Describes the message domain.inventory.v1.UpdateInventoryItemRequest.
 * Use `create(UpdateInventoryItemRequestSchema)` to create a new message.
 */
export declare const UpdateInventoryItemRequestSchema: GenMessage<UpdateInventoryItemRequest>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryItemResponse
 */
export type UpdateInventoryItemResponse = Message<"domain.inventory.v1.UpdateInventoryItemResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryItem data = 1;
     */
    data: InventoryItem[];
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
 * Describes the message domain.inventory.v1.UpdateInventoryItemResponse.
 * Use `create(UpdateInventoryItemResponseSchema)` to create a new message.
 */
export declare const UpdateInventoryItemResponseSchema: GenMessage<UpdateInventoryItemResponse>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryItemRequest
 */
export type DeleteInventoryItemRequest = Message<"domain.inventory.v1.DeleteInventoryItemRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryItem data = 1;
     */
    data?: InventoryItem;
};
/**
 * Describes the message domain.inventory.v1.DeleteInventoryItemRequest.
 * Use `create(DeleteInventoryItemRequestSchema)` to create a new message.
 */
export declare const DeleteInventoryItemRequestSchema: GenMessage<DeleteInventoryItemRequest>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryItemResponse
 */
export type DeleteInventoryItemResponse = Message<"domain.inventory.v1.DeleteInventoryItemResponse"> & {
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
 * Describes the message domain.inventory.v1.DeleteInventoryItemResponse.
 * Use `create(DeleteInventoryItemResponseSchema)` to create a new message.
 */
export declare const DeleteInventoryItemResponseSchema: GenMessage<DeleteInventoryItemResponse>;
/**
 * @generated from message domain.inventory.v1.ListInventoryItemsRequest
 */
export type ListInventoryItemsRequest = Message<"domain.inventory.v1.ListInventoryItemsRequest"> & {
    /**
     * @generated from field: optional string location_id = 1;
     */
    locationId?: string;
    /**
     * @generated from field: optional string product_id = 2;
     */
    productId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 3;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 4;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 5;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 6;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.inventory.v1.ListInventoryItemsRequest.
 * Use `create(ListInventoryItemsRequestSchema)` to create a new message.
 */
export declare const ListInventoryItemsRequestSchema: GenMessage<ListInventoryItemsRequest>;
/**
 * @generated from message domain.inventory.v1.ListInventoryItemsResponse
 */
export type ListInventoryItemsResponse = Message<"domain.inventory.v1.ListInventoryItemsResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryItem data = 1;
     */
    data: InventoryItem[];
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
 * Describes the message domain.inventory.v1.ListInventoryItemsResponse.
 * Use `create(ListInventoryItemsResponseSchema)` to create a new message.
 */
export declare const ListInventoryItemsResponseSchema: GenMessage<ListInventoryItemsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.inventory.v1.GetInventoryItemListPageDataRequest
 */
export type GetInventoryItemListPageDataRequest = Message<"domain.inventory.v1.GetInventoryItemListPageDataRequest"> & {
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
 * Describes the message domain.inventory.v1.GetInventoryItemListPageDataRequest.
 * Use `create(GetInventoryItemListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryItemListPageDataRequestSchema: GenMessage<GetInventoryItemListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.inventory.v1.GetInventoryItemListPageDataResponse
 */
export type GetInventoryItemListPageDataResponse = Message<"domain.inventory.v1.GetInventoryItemListPageDataResponse"> & {
    /**
     * The inventory item data
     *
     * @generated from field: repeated domain.inventory.v1.InventoryItem inventory_item_list = 1;
     */
    inventoryItemList: InventoryItem[];
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
 * Describes the message domain.inventory.v1.GetInventoryItemListPageDataResponse.
 * Use `create(GetInventoryItemListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryItemListPageDataResponseSchema: GenMessage<GetInventoryItemListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.inventory.v1.GetInventoryItemItemPageDataRequest
 */
export type GetInventoryItemItemPageDataRequest = Message<"domain.inventory.v1.GetInventoryItemItemPageDataRequest"> & {
    /**
     * The inventory item ID to retrieve
     *
     * @generated from field: string inventory_item_id = 1;
     */
    inventoryItemId: string;
};
/**
 * Describes the message domain.inventory.v1.GetInventoryItemItemPageDataRequest.
 * Use `create(GetInventoryItemItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryItemItemPageDataRequestSchema: GenMessage<GetInventoryItemItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.inventory.v1.GetInventoryItemItemPageDataResponse
 */
export type GetInventoryItemItemPageDataResponse = Message<"domain.inventory.v1.GetInventoryItemItemPageDataResponse"> & {
    /**
     * The inventory item data
     *
     * @generated from field: domain.inventory.v1.InventoryItem inventory_item = 1;
     */
    inventoryItem?: InventoryItem;
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
 * Describes the message domain.inventory.v1.GetInventoryItemItemPageDataResponse.
 * Use `create(GetInventoryItemItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryItemItemPageDataResponseSchema: GenMessage<GetInventoryItemItemPageDataResponse>;
/**
 * @generated from service domain.inventory.v1.InventoryItemDomainService
 */
export declare const InventoryItemDomainService: GenService<{
    /**
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.CreateInventoryItem
     */
    createInventoryItem: {
        methodKind: "unary";
        input: typeof CreateInventoryItemRequestSchema;
        output: typeof CreateInventoryItemResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.ReadInventoryItem
     */
    readInventoryItem: {
        methodKind: "unary";
        input: typeof ReadInventoryItemRequestSchema;
        output: typeof ReadInventoryItemResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.UpdateInventoryItem
     */
    updateInventoryItem: {
        methodKind: "unary";
        input: typeof UpdateInventoryItemRequestSchema;
        output: typeof UpdateInventoryItemResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.DeleteInventoryItem
     */
    deleteInventoryItem: {
        methodKind: "unary";
        input: typeof DeleteInventoryItemRequestSchema;
        output: typeof DeleteInventoryItemResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.ListInventoryItems
     */
    listInventoryItems: {
        methodKind: "unary";
        input: typeof ListInventoryItemsRequestSchema;
        output: typeof ListInventoryItemsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.GetInventoryItemListPageData
     */
    getInventoryItemListPageData: {
        methodKind: "unary";
        input: typeof GetInventoryItemListPageDataRequestSchema;
        output: typeof GetInventoryItemListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.inventory.v1.InventoryItemDomainService.GetInventoryItemItemPageData
     */
    getInventoryItemItemPageData: {
        methodKind: "unary";
        input: typeof GetInventoryItemItemPageDataRequestSchema;
        output: typeof GetInventoryItemItemPageDataResponseSchema;
    };
}>;
