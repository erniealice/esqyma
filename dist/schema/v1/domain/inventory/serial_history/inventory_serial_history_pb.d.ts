import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { InventoryItem } from "../inventory_item/inventory_item_pb";
import type { InventorySerial } from "../inventory_serial/inventory_serial_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/inventory/serial_history/inventory_serial_history.proto.
 */
export declare const file_domain_inventory_serial_history_inventory_serial_history: GenFile;
/**
 * InventorySerialHistory tracks all status transitions for serialized inventory items.
 * This is an immutable audit trail — records are never updated, only appended.
 *
 * @generated from message domain.inventory.v1.InventorySerialHistory
 */
export type InventorySerialHistory = Message<"domain.inventory.v1.InventorySerialHistory"> & {
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
     * The serial whose history this is
     *
     * @generated from field: optional domain.inventory.v1.InventorySerial serial = 4;
     */
    serial?: InventorySerial;
    /**
     * @generated from field: string inventory_serial_id = 5;
     */
    inventorySerialId: string;
    /**
     * The inventory item this serial belongs to
     *
     * @generated from field: optional domain.inventory.v1.InventoryItem inventory_item = 6;
     */
    inventoryItem?: InventoryItem;
    /**
     * @generated from field: string inventory_item_id = 7;
     */
    inventoryItemId: string;
    /**
     * Status transition: from_status -> to_status
     *
     * "available", "reserved", "sold", "damaged", etc.
     *
     * @generated from field: string from_status = 8;
     */
    fromStatus: string;
    /**
     * New status after transition
     *
     * @generated from field: string to_status = 9;
     */
    toStatus: string;
    /**
     * Context for the transition
     *
     * "sale", "manual", "return", "damage", etc.
     *
     * @generated from field: string reference_type = 10;
     */
    referenceType: string;
    /**
     * ID of the reference (e.g., revenue_id for sales)
     *
     * @generated from field: string reference_id = 11;
     */
    referenceId: string;
    /**
     * Optional notes
     *
     * @generated from field: string notes = 12;
     */
    notes: string;
    /**
     * Who made the change
     *
     * User ID who made this change
     *
     * @generated from field: string changed_by = 13;
     */
    changedBy: string;
    /**
     * Role of user who made this change
     *
     * @generated from field: string changed_by_role = 14;
     */
    changedByRole: string;
};
/**
 * Describes the message domain.inventory.v1.InventorySerialHistory.
 * Use `create(InventorySerialHistorySchema)` to create a new message.
 */
export declare const InventorySerialHistorySchema: GenMessage<InventorySerialHistory>;
/**
 * @generated from message domain.inventory.v1.CreateInventorySerialHistoryRequest
 */
export type CreateInventorySerialHistoryRequest = Message<"domain.inventory.v1.CreateInventorySerialHistoryRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerialHistory data = 1;
     */
    data?: InventorySerialHistory;
};
/**
 * Describes the message domain.inventory.v1.CreateInventorySerialHistoryRequest.
 * Use `create(CreateInventorySerialHistoryRequestSchema)` to create a new message.
 */
export declare const CreateInventorySerialHistoryRequestSchema: GenMessage<CreateInventorySerialHistoryRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventorySerialHistoryResponse
 */
export type CreateInventorySerialHistoryResponse = Message<"domain.inventory.v1.CreateInventorySerialHistoryResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerialHistory data = 1;
     */
    data: InventorySerialHistory[];
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
 * Describes the message domain.inventory.v1.CreateInventorySerialHistoryResponse.
 * Use `create(CreateInventorySerialHistoryResponseSchema)` to create a new message.
 */
export declare const CreateInventorySerialHistoryResponseSchema: GenMessage<CreateInventorySerialHistoryResponse>;
/**
 * @generated from message domain.inventory.v1.ReadInventorySerialHistoryRequest
 */
export type ReadInventorySerialHistoryRequest = Message<"domain.inventory.v1.ReadInventorySerialHistoryRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerialHistory data = 1;
     */
    data?: InventorySerialHistory;
};
/**
 * Describes the message domain.inventory.v1.ReadInventorySerialHistoryRequest.
 * Use `create(ReadInventorySerialHistoryRequestSchema)` to create a new message.
 */
export declare const ReadInventorySerialHistoryRequestSchema: GenMessage<ReadInventorySerialHistoryRequest>;
/**
 * @generated from message domain.inventory.v1.ReadInventorySerialHistoryResponse
 */
export type ReadInventorySerialHistoryResponse = Message<"domain.inventory.v1.ReadInventorySerialHistoryResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerialHistory data = 1;
     */
    data: InventorySerialHistory[];
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
 * Describes the message domain.inventory.v1.ReadInventorySerialHistoryResponse.
 * Use `create(ReadInventorySerialHistoryResponseSchema)` to create a new message.
 */
export declare const ReadInventorySerialHistoryResponseSchema: GenMessage<ReadInventorySerialHistoryResponse>;
/**
 * @generated from message domain.inventory.v1.DeleteInventorySerialHistoryRequest
 */
export type DeleteInventorySerialHistoryRequest = Message<"domain.inventory.v1.DeleteInventorySerialHistoryRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventorySerialHistory data = 1;
     */
    data?: InventorySerialHistory;
};
/**
 * Describes the message domain.inventory.v1.DeleteInventorySerialHistoryRequest.
 * Use `create(DeleteInventorySerialHistoryRequestSchema)` to create a new message.
 */
export declare const DeleteInventorySerialHistoryRequestSchema: GenMessage<DeleteInventorySerialHistoryRequest>;
/**
 * @generated from message domain.inventory.v1.DeleteInventorySerialHistoryResponse
 */
export type DeleteInventorySerialHistoryResponse = Message<"domain.inventory.v1.DeleteInventorySerialHistoryResponse"> & {
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
 * Describes the message domain.inventory.v1.DeleteInventorySerialHistoryResponse.
 * Use `create(DeleteInventorySerialHistoryResponseSchema)` to create a new message.
 */
export declare const DeleteInventorySerialHistoryResponseSchema: GenMessage<DeleteInventorySerialHistoryResponse>;
/**
 * @generated from message domain.inventory.v1.ListInventorySerialHistoryRequest
 */
export type ListInventorySerialHistoryRequest = Message<"domain.inventory.v1.ListInventorySerialHistoryRequest"> & {
    /**
     * @generated from field: optional string inventory_serial_id = 1;
     */
    inventorySerialId?: string;
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
 * Describes the message domain.inventory.v1.ListInventorySerialHistoryRequest.
 * Use `create(ListInventorySerialHistoryRequestSchema)` to create a new message.
 */
export declare const ListInventorySerialHistoryRequestSchema: GenMessage<ListInventorySerialHistoryRequest>;
/**
 * @generated from message domain.inventory.v1.ListInventorySerialHistoryResponse
 */
export type ListInventorySerialHistoryResponse = Message<"domain.inventory.v1.ListInventorySerialHistoryResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventorySerialHistory data = 1;
     */
    data: InventorySerialHistory[];
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
 * Describes the message domain.inventory.v1.ListInventorySerialHistoryResponse.
 * Use `create(ListInventorySerialHistoryResponseSchema)` to create a new message.
 */
export declare const ListInventorySerialHistoryResponseSchema: GenMessage<ListInventorySerialHistoryResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.inventory.v1.GetInventorySerialHistoryListPageDataRequest
 */
export type GetInventorySerialHistoryListPageDataRequest = Message<"domain.inventory.v1.GetInventorySerialHistoryListPageDataRequest"> & {
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
 * Describes the message domain.inventory.v1.GetInventorySerialHistoryListPageDataRequest.
 * Use `create(GetInventorySerialHistoryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventorySerialHistoryListPageDataRequestSchema: GenMessage<GetInventorySerialHistoryListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.inventory.v1.GetInventorySerialHistoryListPageDataResponse
 */
export type GetInventorySerialHistoryListPageDataResponse = Message<"domain.inventory.v1.GetInventorySerialHistoryListPageDataResponse"> & {
    /**
     * The inventory serial history data
     *
     * @generated from field: repeated domain.inventory.v1.InventorySerialHistory inventory_serial_history_list = 1;
     */
    inventorySerialHistoryList: InventorySerialHistory[];
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
 * Describes the message domain.inventory.v1.GetInventorySerialHistoryListPageDataResponse.
 * Use `create(GetInventorySerialHistoryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventorySerialHistoryListPageDataResponseSchema: GenMessage<GetInventorySerialHistoryListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.inventory.v1.GetInventorySerialHistoryItemPageDataRequest
 */
export type GetInventorySerialHistoryItemPageDataRequest = Message<"domain.inventory.v1.GetInventorySerialHistoryItemPageDataRequest"> & {
    /**
     * The inventory serial history ID to retrieve
     *
     * @generated from field: string inventory_serial_history_id = 1;
     */
    inventorySerialHistoryId: string;
};
/**
 * Describes the message domain.inventory.v1.GetInventorySerialHistoryItemPageDataRequest.
 * Use `create(GetInventorySerialHistoryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventorySerialHistoryItemPageDataRequestSchema: GenMessage<GetInventorySerialHistoryItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.inventory.v1.GetInventorySerialHistoryItemPageDataResponse
 */
export type GetInventorySerialHistoryItemPageDataResponse = Message<"domain.inventory.v1.GetInventorySerialHistoryItemPageDataResponse"> & {
    /**
     * The inventory serial history data
     *
     * @generated from field: domain.inventory.v1.InventorySerialHistory inventory_serial_history = 1;
     */
    inventorySerialHistory?: InventorySerialHistory;
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
 * Describes the message domain.inventory.v1.GetInventorySerialHistoryItemPageDataResponse.
 * Use `create(GetInventorySerialHistoryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventorySerialHistoryItemPageDataResponseSchema: GenMessage<GetInventorySerialHistoryItemPageDataResponse>;
/**
 * @generated from service domain.inventory.v1.InventorySerialHistoryDomainService
 */
export declare const InventorySerialHistoryDomainService: GenService<{
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialHistoryDomainService.CreateInventorySerialHistory
     */
    createInventorySerialHistory: {
        methodKind: "unary";
        input: typeof CreateInventorySerialHistoryRequestSchema;
        output: typeof CreateInventorySerialHistoryResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialHistoryDomainService.ReadInventorySerialHistory
     */
    readInventorySerialHistory: {
        methodKind: "unary";
        input: typeof ReadInventorySerialHistoryRequestSchema;
        output: typeof ReadInventorySerialHistoryResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialHistoryDomainService.DeleteInventorySerialHistory
     */
    deleteInventorySerialHistory: {
        methodKind: "unary";
        input: typeof DeleteInventorySerialHistoryRequestSchema;
        output: typeof DeleteInventorySerialHistoryResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventorySerialHistoryDomainService.ListInventorySerialHistory
     */
    listInventorySerialHistory: {
        methodKind: "unary";
        input: typeof ListInventorySerialHistoryRequestSchema;
        output: typeof ListInventorySerialHistoryResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.inventory.v1.InventorySerialHistoryDomainService.GetInventorySerialHistoryListPageData
     */
    getInventorySerialHistoryListPageData: {
        methodKind: "unary";
        input: typeof GetInventorySerialHistoryListPageDataRequestSchema;
        output: typeof GetInventorySerialHistoryListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.inventory.v1.InventorySerialHistoryDomainService.GetInventorySerialHistoryItemPageData
     */
    getInventorySerialHistoryItemPageData: {
        methodKind: "unary";
        input: typeof GetInventorySerialHistoryItemPageDataRequestSchema;
        output: typeof GetInventorySerialHistoryItemPageDataResponseSchema;
    };
}>;
