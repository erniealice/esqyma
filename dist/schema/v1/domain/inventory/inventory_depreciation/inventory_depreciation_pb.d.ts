import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { InventoryItem } from "../inventory_item/inventory_item_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/inventory/inventory_depreciation/inventory_depreciation.proto.
 */
export declare const file_domain_inventory_inventory_depreciation_inventory_depreciation: GenFile;
/**
 * @generated from message domain.inventory.v1.InventoryDepreciation
 */
export type InventoryDepreciation = Message<"domain.inventory.v1.InventoryDepreciation"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string inventory_item_id = 2;
     */
    inventoryItemId: string;
    /**
     * @generated from field: string method = 3;
     */
    method: string;
    /**
     * centavos
     *
     * @generated from field: int64 cost_basis = 4;
     */
    costBasis: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 salvage_value = 5;
     */
    salvageValue: bigint;
    /**
     * @generated from field: int32 useful_life_months = 6;
     */
    usefulLifeMonths: number;
    /**
     * @generated from field: string start_date = 7;
     */
    startDate: string;
    /**
     * centavos
     *
     * @generated from field: int64 accumulated_depreciation = 8;
     */
    accumulatedDepreciation: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 book_value = 9;
     */
    bookValue: bigint;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 13;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 14;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: domain.inventory.v1.InventoryItem inventory_item = 15;
     */
    inventoryItem?: InventoryItem;
};
/**
 * Describes the message domain.inventory.v1.InventoryDepreciation.
 * Use `create(InventoryDepreciationSchema)` to create a new message.
 */
export declare const InventoryDepreciationSchema: GenMessage<InventoryDepreciation>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryDepreciationRequest
 */
export type CreateInventoryDepreciationRequest = Message<"domain.inventory.v1.CreateInventoryDepreciationRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data?: InventoryDepreciation;
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryDepreciationRequest.
 * Use `create(CreateInventoryDepreciationRequestSchema)` to create a new message.
 */
export declare const CreateInventoryDepreciationRequestSchema: GenMessage<CreateInventoryDepreciationRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryDepreciationResponse
 */
export type CreateInventoryDepreciationResponse = Message<"domain.inventory.v1.CreateInventoryDepreciationResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data: InventoryDepreciation[];
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
 * Describes the message domain.inventory.v1.CreateInventoryDepreciationResponse.
 * Use `create(CreateInventoryDepreciationResponseSchema)` to create a new message.
 */
export declare const CreateInventoryDepreciationResponseSchema: GenMessage<CreateInventoryDepreciationResponse>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryDepreciationBatchRequest
 */
export type CreateInventoryDepreciationBatchRequest = Message<"domain.inventory.v1.CreateInventoryDepreciationBatchRequest"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data: InventoryDepreciation[];
};
/**
 * Describes the message domain.inventory.v1.CreateInventoryDepreciationBatchRequest.
 * Use `create(CreateInventoryDepreciationBatchRequestSchema)` to create a new message.
 */
export declare const CreateInventoryDepreciationBatchRequestSchema: GenMessage<CreateInventoryDepreciationBatchRequest>;
/**
 * @generated from message domain.inventory.v1.CreateInventoryDepreciationBatchResponse
 */
export type CreateInventoryDepreciationBatchResponse = Message<"domain.inventory.v1.CreateInventoryDepreciationBatchResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data: InventoryDepreciation[];
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
 * Describes the message domain.inventory.v1.CreateInventoryDepreciationBatchResponse.
 * Use `create(CreateInventoryDepreciationBatchResponseSchema)` to create a new message.
 */
export declare const CreateInventoryDepreciationBatchResponseSchema: GenMessage<CreateInventoryDepreciationBatchResponse>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryDepreciationRequest
 */
export type ReadInventoryDepreciationRequest = Message<"domain.inventory.v1.ReadInventoryDepreciationRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data?: InventoryDepreciation;
};
/**
 * Describes the message domain.inventory.v1.ReadInventoryDepreciationRequest.
 * Use `create(ReadInventoryDepreciationRequestSchema)` to create a new message.
 */
export declare const ReadInventoryDepreciationRequestSchema: GenMessage<ReadInventoryDepreciationRequest>;
/**
 * @generated from message domain.inventory.v1.ReadInventoryDepreciationResponse
 */
export type ReadInventoryDepreciationResponse = Message<"domain.inventory.v1.ReadInventoryDepreciationResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data: InventoryDepreciation[];
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
 * Describes the message domain.inventory.v1.ReadInventoryDepreciationResponse.
 * Use `create(ReadInventoryDepreciationResponseSchema)` to create a new message.
 */
export declare const ReadInventoryDepreciationResponseSchema: GenMessage<ReadInventoryDepreciationResponse>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryDepreciationRequest
 */
export type UpdateInventoryDepreciationRequest = Message<"domain.inventory.v1.UpdateInventoryDepreciationRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data?: InventoryDepreciation;
};
/**
 * Describes the message domain.inventory.v1.UpdateInventoryDepreciationRequest.
 * Use `create(UpdateInventoryDepreciationRequestSchema)` to create a new message.
 */
export declare const UpdateInventoryDepreciationRequestSchema: GenMessage<UpdateInventoryDepreciationRequest>;
/**
 * @generated from message domain.inventory.v1.UpdateInventoryDepreciationResponse
 */
export type UpdateInventoryDepreciationResponse = Message<"domain.inventory.v1.UpdateInventoryDepreciationResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data: InventoryDepreciation[];
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
 * Describes the message domain.inventory.v1.UpdateInventoryDepreciationResponse.
 * Use `create(UpdateInventoryDepreciationResponseSchema)` to create a new message.
 */
export declare const UpdateInventoryDepreciationResponseSchema: GenMessage<UpdateInventoryDepreciationResponse>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryDepreciationRequest
 */
export type DeleteInventoryDepreciationRequest = Message<"domain.inventory.v1.DeleteInventoryDepreciationRequest"> & {
    /**
     * @generated from field: domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data?: InventoryDepreciation;
};
/**
 * Describes the message domain.inventory.v1.DeleteInventoryDepreciationRequest.
 * Use `create(DeleteInventoryDepreciationRequestSchema)` to create a new message.
 */
export declare const DeleteInventoryDepreciationRequestSchema: GenMessage<DeleteInventoryDepreciationRequest>;
/**
 * @generated from message domain.inventory.v1.DeleteInventoryDepreciationResponse
 */
export type DeleteInventoryDepreciationResponse = Message<"domain.inventory.v1.DeleteInventoryDepreciationResponse"> & {
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
 * Describes the message domain.inventory.v1.DeleteInventoryDepreciationResponse.
 * Use `create(DeleteInventoryDepreciationResponseSchema)` to create a new message.
 */
export declare const DeleteInventoryDepreciationResponseSchema: GenMessage<DeleteInventoryDepreciationResponse>;
/**
 * @generated from message domain.inventory.v1.ListInventoryDepreciationsRequest
 */
export type ListInventoryDepreciationsRequest = Message<"domain.inventory.v1.ListInventoryDepreciationsRequest"> & {
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
 * Describes the message domain.inventory.v1.ListInventoryDepreciationsRequest.
 * Use `create(ListInventoryDepreciationsRequestSchema)` to create a new message.
 */
export declare const ListInventoryDepreciationsRequestSchema: GenMessage<ListInventoryDepreciationsRequest>;
/**
 * @generated from message domain.inventory.v1.ListInventoryDepreciationsResponse
 */
export type ListInventoryDepreciationsResponse = Message<"domain.inventory.v1.ListInventoryDepreciationsResponse"> & {
    /**
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation data = 1;
     */
    data: InventoryDepreciation[];
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
 * Describes the message domain.inventory.v1.ListInventoryDepreciationsResponse.
 * Use `create(ListInventoryDepreciationsResponseSchema)` to create a new message.
 */
export declare const ListInventoryDepreciationsResponseSchema: GenMessage<ListInventoryDepreciationsResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.inventory.v1.GetInventoryDepreciationListPageDataRequest
 */
export type GetInventoryDepreciationListPageDataRequest = Message<"domain.inventory.v1.GetInventoryDepreciationListPageDataRequest"> & {
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
 * Describes the message domain.inventory.v1.GetInventoryDepreciationListPageDataRequest.
 * Use `create(GetInventoryDepreciationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryDepreciationListPageDataRequestSchema: GenMessage<GetInventoryDepreciationListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.inventory.v1.GetInventoryDepreciationListPageDataResponse
 */
export type GetInventoryDepreciationListPageDataResponse = Message<"domain.inventory.v1.GetInventoryDepreciationListPageDataResponse"> & {
    /**
     * The inventory depreciation data
     *
     * @generated from field: repeated domain.inventory.v1.InventoryDepreciation inventory_depreciation_list = 1;
     */
    inventoryDepreciationList: InventoryDepreciation[];
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
 * Describes the message domain.inventory.v1.GetInventoryDepreciationListPageDataResponse.
 * Use `create(GetInventoryDepreciationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryDepreciationListPageDataResponseSchema: GenMessage<GetInventoryDepreciationListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.inventory.v1.GetInventoryDepreciationItemPageDataRequest
 */
export type GetInventoryDepreciationItemPageDataRequest = Message<"domain.inventory.v1.GetInventoryDepreciationItemPageDataRequest"> & {
    /**
     * The inventory depreciation ID to retrieve
     *
     * @generated from field: string inventory_depreciation_id = 1;
     */
    inventoryDepreciationId: string;
};
/**
 * Describes the message domain.inventory.v1.GetInventoryDepreciationItemPageDataRequest.
 * Use `create(GetInventoryDepreciationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryDepreciationItemPageDataRequestSchema: GenMessage<GetInventoryDepreciationItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.inventory.v1.GetInventoryDepreciationItemPageDataResponse
 */
export type GetInventoryDepreciationItemPageDataResponse = Message<"domain.inventory.v1.GetInventoryDepreciationItemPageDataResponse"> & {
    /**
     * The inventory depreciation data
     *
     * @generated from field: domain.inventory.v1.InventoryDepreciation inventory_depreciation = 1;
     */
    inventoryDepreciation?: InventoryDepreciation;
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
 * Describes the message domain.inventory.v1.GetInventoryDepreciationItemPageDataResponse.
 * Use `create(GetInventoryDepreciationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryDepreciationItemPageDataResponseSchema: GenMessage<GetInventoryDepreciationItemPageDataResponse>;
/**
 * @generated from service domain.inventory.v1.InventoryDepreciationDomainService
 */
export declare const InventoryDepreciationDomainService: GenService<{
    /**
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.CreateInventoryDepreciation
     */
    createInventoryDepreciation: {
        methodKind: "unary";
        input: typeof CreateInventoryDepreciationRequestSchema;
        output: typeof CreateInventoryDepreciationResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.ReadInventoryDepreciation
     */
    readInventoryDepreciation: {
        methodKind: "unary";
        input: typeof ReadInventoryDepreciationRequestSchema;
        output: typeof ReadInventoryDepreciationResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.UpdateInventoryDepreciation
     */
    updateInventoryDepreciation: {
        methodKind: "unary";
        input: typeof UpdateInventoryDepreciationRequestSchema;
        output: typeof UpdateInventoryDepreciationResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.DeleteInventoryDepreciation
     */
    deleteInventoryDepreciation: {
        methodKind: "unary";
        input: typeof DeleteInventoryDepreciationRequestSchema;
        output: typeof DeleteInventoryDepreciationResponseSchema;
    };
    /**
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.ListInventoryDepreciations
     */
    listInventoryDepreciations: {
        methodKind: "unary";
        input: typeof ListInventoryDepreciationsRequestSchema;
        output: typeof ListInventoryDepreciationsResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.GetInventoryDepreciationListPageData
     */
    getInventoryDepreciationListPageData: {
        methodKind: "unary";
        input: typeof GetInventoryDepreciationListPageDataRequestSchema;
        output: typeof GetInventoryDepreciationListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.inventory.v1.InventoryDepreciationDomainService.GetInventoryDepreciationItemPageData
     */
    getInventoryDepreciationItemPageData: {
        methodKind: "unary";
        input: typeof GetInventoryDepreciationItemPageDataRequestSchema;
        output: typeof GetInventoryDepreciationItemPageDataResponseSchema;
    };
}>;
