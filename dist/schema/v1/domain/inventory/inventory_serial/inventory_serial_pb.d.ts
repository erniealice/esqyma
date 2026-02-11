import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { InventoryItem } from "../inventory_item/inventory_item_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/inventory/inventory_serial/inventory_serial.proto.
 */
export declare const file_domain_inventory_inventory_serial_inventory_serial: GenFile;
/**
 * @generated from message domain.inventory.v1.InventorySerial
 */
export type InventorySerial = Message<"domain.inventory.v1.InventorySerial"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string inventory_item_id = 2;
     */
    inventoryItemId: string;
    /**
     * @generated from field: string serial_number = 3;
     */
    serialNumber: string;
    /**
     * @generated from field: optional string imei = 4;
     */
    imei?: string;
    /**
     * @generated from field: string status = 5;
     */
    status: string;
    /**
     * @generated from field: optional string warranty_start = 6;
     */
    warrantyStart?: string;
    /**
     * @generated from field: optional string warranty_end = 7;
     */
    warrantyEnd?: string;
    /**
     * @generated from field: optional string purchase_order = 8;
     */
    purchaseOrder?: string;
    /**
     * @generated from field: optional string sold_reference = 9;
     */
    soldReference?: string;
    /**
     * @generated from field: optional string notes = 10;
     */
    notes?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
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
     * @generated from field: domain.inventory.v1.InventoryItem inventory_item = 16;
     */
    inventoryItem?: InventoryItem;
};
/**
 * Describes the message domain.inventory.v1.InventorySerial.
 * Use `create(InventorySerialSchema)` to create a new message.
 */
export declare const InventorySerialSchema: GenMessage<InventorySerial>;
/**
 * @generated from message domain.inventory.v1.CreateInventorySerialRequest
 */
export type CreateInventorySerialRequest = Message<"domain.inventory.v1.CreateInventorySerialRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerial data = 1;
     */
    data?: InventorySerial;
};
/**
 * Describes the message domain.inventory.v1.CreateInventorySerialRequest.
 * Use `create(CreateInventorySerialRequestSchema)` to create a new message.
 */
export declare const CreateInventorySerialRequestSchema: GenMessage<CreateInventorySerialRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventorySerialResponse
 */
export type CreateInventorySerialResponse = Message<"domain.inventory.v1.CreateInventorySerialResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerial data = 1;
     */
    data: InventorySerial[];
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
 * Describes the message domain.inventory.v1.CreateInventorySerialResponse.
 * Use `create(CreateInventorySerialResponseSchema)` to create a new message.
 */
export declare const CreateInventorySerialResponseSchema: GenMessage<CreateInventorySerialResponse>;
/**
 * @generated from message domain.inventory.v1.CreateInventorySerialBatchRequest
 */
export type CreateInventorySerialBatchRequest = Message<"domain.inventory.v1.CreateInventorySerialBatchRequest"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerial data = 1;
     */
    data: InventorySerial[];
};
/**
 * Describes the message domain.inventory.v1.CreateInventorySerialBatchRequest.
 * Use `create(CreateInventorySerialBatchRequestSchema)` to create a new message.
 */
export declare const CreateInventorySerialBatchRequestSchema: GenMessage<CreateInventorySerialBatchRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventorySerialBatchResponse
 */
export type CreateInventorySerialBatchResponse = Message<"domain.inventory.v1.CreateInventorySerialBatchResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerial data = 1;
     */
    data: InventorySerial[];
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
 * Describes the message domain.inventory.v1.CreateInventorySerialBatchResponse.
 * Use `create(CreateInventorySerialBatchResponseSchema)` to create a new message.
 */
export declare const CreateInventorySerialBatchResponseSchema: GenMessage<CreateInventorySerialBatchResponse>;
/**
 * @generated from message domain.inventory.v1.ReadInventorySerialRequest
 */
export type ReadInventorySerialRequest = Message<"domain.inventory.v1.ReadInventorySerialRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerial data = 1;
     */
    data?: InventorySerial;
};
/**
 * Describes the message domain.inventory.v1.ReadInventorySerialRequest.
 * Use `create(ReadInventorySerialRequestSchema)` to create a new message.
 */
export declare const ReadInventorySerialRequestSchema: GenMessage<ReadInventorySerialRequest>;
/**
 * @generated from message domain.inventory.v1.ReadInventorySerialResponse
 */
export type ReadInventorySerialResponse = Message<"domain.inventory.v1.ReadInventorySerialResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerial data = 1;
     */
    data: InventorySerial[];
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
 * Describes the message domain.inventory.v1.ReadInventorySerialResponse.
 * Use `create(ReadInventorySerialResponseSchema)` to create a new message.
 */
export declare const ReadInventorySerialResponseSchema: GenMessage<ReadInventorySerialResponse>;
/**
 * @generated from message domain.inventory.v1.UpdateInventorySerialRequest
 */
export type UpdateInventorySerialRequest = Message<"domain.inventory.v1.UpdateInventorySerialRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerial data = 1;
     */
    data?: InventorySerial;
};
/**
 * Describes the message domain.inventory.v1.UpdateInventorySerialRequest.
 * Use `create(UpdateInventorySerialRequestSchema)` to create a new message.
 */
export declare const UpdateInventorySerialRequestSchema: GenMessage<UpdateInventorySerialRequest>;
/**
 * @generated from message domain.inventory.v1.UpdateInventorySerialResponse
 */
export type UpdateInventorySerialResponse = Message<"domain.inventory.v1.UpdateInventorySerialResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerial data = 1;
     */
    data: InventorySerial[];
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
 * Describes the message domain.inventory.v1.UpdateInventorySerialResponse.
 * Use `create(UpdateInventorySerialResponseSchema)` to create a new message.
 */
export declare const UpdateInventorySerialResponseSchema: GenMessage<UpdateInventorySerialResponse>;
/**
 * @generated from message domain.inventory.v1.DeleteInventorySerialRequest
 */
export type DeleteInventorySerialRequest = Message<"domain.inventory.v1.DeleteInventorySerialRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerial data = 1;
     */
    data?: InventorySerial;
};
/**
 * Describes the message domain.inventory.v1.DeleteInventorySerialRequest.
 * Use `create(DeleteInventorySerialRequestSchema)` to create a new message.
 */
export declare const DeleteInventorySerialRequestSchema: GenMessage<DeleteInventorySerialRequest>;
/**
 * @generated from message domain.inventory.v1.DeleteInventorySerialResponse
 */
export type DeleteInventorySerialResponse = Message<"domain.inventory.v1.DeleteInventorySerialResponse"> & {
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
 * Describes the message domain.inventory.v1.DeleteInventorySerialResponse.
 * Use `create(DeleteInventorySerialResponseSchema)` to create a new message.
 */
export declare const DeleteInventorySerialResponseSchema: GenMessage<DeleteInventorySerialResponse>;
/**
 * @generated from message domain.inventory.v1.ListInventorySerialsRequest
 */
export type ListInventorySerialsRequest = Message<"domain.inventory.v1.ListInventorySerialsRequest"> & {
    /**
     * @generated from field: optional string inventory_item_id = 1;
     */
    inventoryItemId?: string;
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
 * Describes the message domain.inventory.v1.ListInventorySerialsRequest.
 * Use `create(ListInventorySerialsRequestSchema)` to create a new message.
 */
export declare const ListInventorySerialsRequestSchema: GenMessage<ListInventorySerialsRequest>;
/**
 * @generated from message domain.inventory.v1.ListInventorySerialsResponse
 */
export type ListInventorySerialsResponse = Message<"domain.inventory.v1.ListInventorySerialsResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerial data = 1;
     */
    data: InventorySerial[];
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
 * Describes the message domain.inventory.v1.ListInventorySerialsResponse.
 * Use `create(ListInventorySerialsResponseSchema)` to create a new message.
 */
export declare const ListInventorySerialsResponseSchema: GenMessage<ListInventorySerialsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.inventory.v1.GetInventorySerialListPageDataRequest
 */
export type GetInventorySerialListPageDataRequest = Message<"domain.inventory.v1.GetInventorySerialListPageDataRequest"> & {
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
 * Describes the message domain.inventory.v1.GetInventorySerialListPageDataRequest.
 * Use `create(GetInventorySerialListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventorySerialListPageDataRequestSchema: GenMessage<GetInventorySerialListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.inventory.v1.GetInventorySerialListPageDataResponse
 */
export type GetInventorySerialListPageDataResponse = Message<"domain.inventory.v1.GetInventorySerialListPageDataResponse"> & {
    /**
     * The inventory serial data
     *
     * @generated from field: repeated domain.inventory.v1.InventorySerial inventory_serial_list = 1;
     */
    inventorySerialList: InventorySerial[];
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
 * Describes the message domain.inventory.v1.GetInventorySerialListPageDataResponse.
 * Use `create(GetInventorySerialListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventorySerialListPageDataResponseSchema: GenMessage<GetInventorySerialListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.inventory.v1.GetInventorySerialItemPageDataRequest
 */
export type GetInventorySerialItemPageDataRequest = Message<"domain.inventory.v1.GetInventorySerialItemPageDataRequest"> & {
    /**
     * The inventory serial ID to retrieve
     *
     * @generated from field: string inventory_serial_id = 1;
     */
    inventorySerialId: string;
};
/**
 * Describes the message domain.inventory.v1.GetInventorySerialItemPageDataRequest.
 * Use `create(GetInventorySerialItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventorySerialItemPageDataRequestSchema: GenMessage<GetInventorySerialItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.inventory.v1.GetInventorySerialItemPageDataResponse
 */
export type GetInventorySerialItemPageDataResponse = Message<"domain.inventory.v1.GetInventorySerialItemPageDataResponse"> & {
    /**
     * The inventory serial data
     *
     * @generated from field: domain.inventory.v1.InventorySerial inventory_serial = 1;
     */
    inventorySerial?: InventorySerial;
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
 * Describes the message domain.inventory.v1.GetInventorySerialItemPageDataResponse.
 * Use `create(GetInventorySerialItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventorySerialItemPageDataResponseSchema: GenMessage<GetInventorySerialItemPageDataResponse>;
/**
 * @generated from service domain.inventory.v1.InventorySerialDomainService
 */
export declare const InventorySerialDomainService: GenService<{
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.CreateInventorySerial
     */
    createInventorySerial: {
        methodKind: "unary";
        input: typeof CreateInventorySerialRequestSchema;
        output: typeof CreateInventorySerialResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.ReadInventorySerial
     */
    readInventorySerial: {
        methodKind: "unary";
        input: typeof ReadInventorySerialRequestSchema;
        output: typeof ReadInventorySerialResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.UpdateInventorySerial
     */
    updateInventorySerial: {
        methodKind: "unary";
        input: typeof UpdateInventorySerialRequestSchema;
        output: typeof UpdateInventorySerialResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.DeleteInventorySerial
     */
    deleteInventorySerial: {
        methodKind: "unary";
        input: typeof DeleteInventorySerialRequestSchema;
        output: typeof DeleteInventorySerialResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.ListInventorySerials
     */
    listInventorySerials: {
        methodKind: "unary";
        input: typeof ListInventorySerialsRequestSchema;
        output: typeof ListInventorySerialsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.GetInventorySerialListPageData
     */
    getInventorySerialListPageData: {
        methodKind: "unary";
        input: typeof GetInventorySerialListPageDataRequestSchema;
        output: typeof GetInventorySerialListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.inventory.v1.InventorySerialDomainService.GetInventorySerialItemPageData
     */
    getInventorySerialItemPageData: {
        methodKind: "unary";
        input: typeof GetInventorySerialItemPageDataRequestSchema;
        output: typeof GetInventorySerialItemPageDataResponseSchema;
    };
}>;
