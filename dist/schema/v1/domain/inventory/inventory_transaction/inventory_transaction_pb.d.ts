import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { InventoryItem } from "../inventory_item/inventory_item_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/inventory/inventory_transaction/inventory_transaction.proto.
 */
export declare const file_domain_inventory_inventory_transaction_inventory_transaction: GenFile;
/**
 * @generated from message domain.inventory.v1.InventoryTransaction
 */
export type InventoryTransaction = Message<"domain.inventory.v1.InventoryTransaction"> & {
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
     * @generated from field: optional domain.inventory.v1.InventoryItem inventory_item = 7;
     */
    inventoryItem?: InventoryItem;
    /**
     * @generated from field: string inventory_item_id = 8;
     */
    inventoryItemId: string;
    /**
     * @generated from field: string transaction_type = 9;
     */
    transactionType: string;
    /**
     * @generated from field: double quantity = 10;
     */
    quantity: number;
    /**
     * @generated from field: optional int64 transaction_date = 11;
     */
    transactionDate?: bigint;
    /**
     * @generated from field: optional string transaction_date_string = 12;
     */
    transactionDateString?: string;
    /**
     * @generated from field: optional string reference_type = 13;
     */
    referenceType?: string;
    /**
     * @generated from field: optional string reference_id = 14;
     */
    referenceId?: string;
    /**
     * @generated from field: optional string from_location_id = 15;
     */
    fromLocationId?: string;
    /**
     * @generated from field: optional string to_location_id = 16;
     */
    toLocationId?: string;
    /**
     * @generated from field: optional string notes = 17;
     */
    notes?: string;
    /**
     * @generated from field: string status = 18;
     */
    status: string;
};
/**
 * Describes the message domain.inventory.v1.InventoryTransaction.
 * Use `create(InventoryTransactionSchema)` to create a new message.
 */
export declare const InventoryTransactionSchema: GenMessage<InventoryTransaction>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryTransactionRequest
 */
export type CreateInventoryTransactionRequest = Message<"domain.inventory.v1.CreateInventoryTransactionRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryTransaction data = 1;
     */
    data?: InventoryTransaction;
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryTransactionRequest.
 * Use `create(CreateInventoryTransactionRequestSchema)` to create a new message.
 */
export declare const CreateInventoryTransactionRequestSchema: GenMessage<CreateInventoryTransactionRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryTransactionResponse
 */
export type CreateInventoryTransactionResponse = Message<"domain.inventory.v1.CreateInventoryTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryTransaction data = 1;
     */
    data: InventoryTransaction[];
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
 * Describes the message domain.inventory.v1.CreateInventoryTransactionResponse.
 * Use `create(CreateInventoryTransactionResponseSchema)` to create a new message.
 */
export declare const CreateInventoryTransactionResponseSchema: GenMessage<CreateInventoryTransactionResponse>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryTransactionRequest
 */
export type ReadInventoryTransactionRequest = Message<"domain.inventory.v1.ReadInventoryTransactionRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryTransaction data = 1;
     */
    data?: InventoryTransaction;
};
/**
 * Describes the message domain.inventory.v1.ReadInventoryTransactionRequest.
 * Use `create(ReadInventoryTransactionRequestSchema)` to create a new message.
 */
export declare const ReadInventoryTransactionRequestSchema: GenMessage<ReadInventoryTransactionRequest>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryTransactionResponse
 */
export type ReadInventoryTransactionResponse = Message<"domain.inventory.v1.ReadInventoryTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryTransaction data = 1;
     */
    data: InventoryTransaction[];
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
 * Describes the message domain.inventory.v1.ReadInventoryTransactionResponse.
 * Use `create(ReadInventoryTransactionResponseSchema)` to create a new message.
 */
export declare const ReadInventoryTransactionResponseSchema: GenMessage<ReadInventoryTransactionResponse>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryTransactionRequest
 */
export type UpdateInventoryTransactionRequest = Message<"domain.inventory.v1.UpdateInventoryTransactionRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryTransaction data = 1;
     */
    data?: InventoryTransaction;
};
/**
 * Describes the message domain.inventory.v1.UpdateInventoryTransactionRequest.
 * Use `create(UpdateInventoryTransactionRequestSchema)` to create a new message.
 */
export declare const UpdateInventoryTransactionRequestSchema: GenMessage<UpdateInventoryTransactionRequest>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryTransactionResponse
 */
export type UpdateInventoryTransactionResponse = Message<"domain.inventory.v1.UpdateInventoryTransactionResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryTransaction data = 1;
     */
    data: InventoryTransaction[];
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
 * Describes the message domain.inventory.v1.UpdateInventoryTransactionResponse.
 * Use `create(UpdateInventoryTransactionResponseSchema)` to create a new message.
 */
export declare const UpdateInventoryTransactionResponseSchema: GenMessage<UpdateInventoryTransactionResponse>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryTransactionRequest
 */
export type DeleteInventoryTransactionRequest = Message<"domain.inventory.v1.DeleteInventoryTransactionRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryTransaction data = 1;
     */
    data?: InventoryTransaction;
};
/**
 * Describes the message domain.inventory.v1.DeleteInventoryTransactionRequest.
 * Use `create(DeleteInventoryTransactionRequestSchema)` to create a new message.
 */
export declare const DeleteInventoryTransactionRequestSchema: GenMessage<DeleteInventoryTransactionRequest>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryTransactionResponse
 */
export type DeleteInventoryTransactionResponse = Message<"domain.inventory.v1.DeleteInventoryTransactionResponse"> & {
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
 * Describes the message domain.inventory.v1.DeleteInventoryTransactionResponse.
 * Use `create(DeleteInventoryTransactionResponseSchema)` to create a new message.
 */
export declare const DeleteInventoryTransactionResponseSchema: GenMessage<DeleteInventoryTransactionResponse>;
/**
 * @generated from message domain.inventory.v1.ListInventoryTransactionsRequest
 */
export type ListInventoryTransactionsRequest = Message<"domain.inventory.v1.ListInventoryTransactionsRequest"> & {
    /**
     * @generated from field: optional string inventory_item_id = 1;
     */
    inventoryItemId?: string;
    /**
     * @generated from field: optional string transaction_type = 2;
     */
    transactionType?: string;
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
 * Describes the message domain.inventory.v1.ListInventoryTransactionsRequest.
 * Use `create(ListInventoryTransactionsRequestSchema)` to create a new message.
 */
export declare const ListInventoryTransactionsRequestSchema: GenMessage<ListInventoryTransactionsRequest>;
/**
 * @generated from message domain.inventory.v1.ListInventoryTransactionsResponse
 */
export type ListInventoryTransactionsResponse = Message<"domain.inventory.v1.ListInventoryTransactionsResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryTransaction data = 1;
     */
    data: InventoryTransaction[];
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
 * Describes the message domain.inventory.v1.ListInventoryTransactionsResponse.
 * Use `create(ListInventoryTransactionsResponseSchema)` to create a new message.
 */
export declare const ListInventoryTransactionsResponseSchema: GenMessage<ListInventoryTransactionsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.inventory.v1.GetInventoryTransactionListPageDataRequest
 */
export type GetInventoryTransactionListPageDataRequest = Message<"domain.inventory.v1.GetInventoryTransactionListPageDataRequest"> & {
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
 * Describes the message domain.inventory.v1.GetInventoryTransactionListPageDataRequest.
 * Use `create(GetInventoryTransactionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryTransactionListPageDataRequestSchema: GenMessage<GetInventoryTransactionListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.inventory.v1.GetInventoryTransactionListPageDataResponse
 */
export type GetInventoryTransactionListPageDataResponse = Message<"domain.inventory.v1.GetInventoryTransactionListPageDataResponse"> & {
    /**
     * The inventory transaction data
     *
     * @generated from field: repeated domain.inventory.v1.InventoryTransaction inventory_transaction_list = 1;
     */
    inventoryTransactionList: InventoryTransaction[];
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
 * Describes the message domain.inventory.v1.GetInventoryTransactionListPageDataResponse.
 * Use `create(GetInventoryTransactionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryTransactionListPageDataResponseSchema: GenMessage<GetInventoryTransactionListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.inventory.v1.GetInventoryTransactionItemPageDataRequest
 */
export type GetInventoryTransactionItemPageDataRequest = Message<"domain.inventory.v1.GetInventoryTransactionItemPageDataRequest"> & {
    /**
     * The inventory transaction ID to retrieve
     *
     * @generated from field: string inventory_transaction_id = 1;
     */
    inventoryTransactionId: string;
};
/**
 * Describes the message domain.inventory.v1.GetInventoryTransactionItemPageDataRequest.
 * Use `create(GetInventoryTransactionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryTransactionItemPageDataRequestSchema: GenMessage<GetInventoryTransactionItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.inventory.v1.GetInventoryTransactionItemPageDataResponse
 */
export type GetInventoryTransactionItemPageDataResponse = Message<"domain.inventory.v1.GetInventoryTransactionItemPageDataResponse"> & {
    /**
     * The inventory transaction data
     *
     * @generated from field: domain.inventory.v1.InventoryTransaction inventory_transaction = 1;
     */
    inventoryTransaction?: InventoryTransaction;
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
 * Describes the message domain.inventory.v1.GetInventoryTransactionItemPageDataResponse.
 * Use `create(GetInventoryTransactionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryTransactionItemPageDataResponseSchema: GenMessage<GetInventoryTransactionItemPageDataResponse>;
/**
 * @generated from service domain.inventory.v1.InventoryTransactionDomainService
 */
export declare const InventoryTransactionDomainService: GenService<{
    /**
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.CreateInventoryTransaction
     */
    createInventoryTransaction: {
        methodKind: "unary";
        input: typeof CreateInventoryTransactionRequestSchema;
        output: typeof CreateInventoryTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.ReadInventoryTransaction
     */
    readInventoryTransaction: {
        methodKind: "unary";
        input: typeof ReadInventoryTransactionRequestSchema;
        output: typeof ReadInventoryTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.UpdateInventoryTransaction
     */
    updateInventoryTransaction: {
        methodKind: "unary";
        input: typeof UpdateInventoryTransactionRequestSchema;
        output: typeof UpdateInventoryTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.DeleteInventoryTransaction
     */
    deleteInventoryTransaction: {
        methodKind: "unary";
        input: typeof DeleteInventoryTransactionRequestSchema;
        output: typeof DeleteInventoryTransactionResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.ListInventoryTransactions
     */
    listInventoryTransactions: {
        methodKind: "unary";
        input: typeof ListInventoryTransactionsRequestSchema;
        output: typeof ListInventoryTransactionsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.GetInventoryTransactionListPageData
     */
    getInventoryTransactionListPageData: {
        methodKind: "unary";
        input: typeof GetInventoryTransactionListPageDataRequestSchema;
        output: typeof GetInventoryTransactionListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.inventory.v1.InventoryTransactionDomainService.GetInventoryTransactionItemPageData
     */
    getInventoryTransactionItemPageData: {
        methodKind: "unary";
        input: typeof GetInventoryTransactionItemPageDataRequestSchema;
        output: typeof GetInventoryTransactionItemPageDataResponseSchema;
    };
}>;
