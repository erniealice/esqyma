import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Revenue } from "../revenue/revenue_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/revenue/revenue_line_item/revenue_line_item.proto.
 */
export declare const file_domain_revenue_revenue_line_item_revenue_line_item: GenFile;
/**
 * @generated from message domain.revenue.v1.RevenueLineItem
 */
export type RevenueLineItem = Message<"domain.revenue.v1.RevenueLineItem"> & {
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
     * @generated from field: optional domain.revenue.v1.Revenue revenue = 7;
     */
    revenue?: Revenue;
    /**
     * @generated from field: string revenue_id = 8;
     */
    revenueId: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 9;
     */
    product?: Product;
    /**
     * @generated from field: optional string product_id = 10;
     */
    productId?: string;
    /**
     * @generated from field: string description = 11;
     */
    description: string;
    /**
     * @generated from field: double quantity = 12;
     */
    quantity: number;
    /**
     * centavos
     *
     * @generated from field: int64 unit_price = 13;
     */
    unitPrice: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_price = 14;
     */
    totalPrice: bigint;
    /**
     * @generated from field: optional string notes = 16;
     */
    notes?: string;
    /**
     * "item" or "discount"
     *
     * @generated from field: string line_item_type = 17;
     */
    lineItemType: string;
    /**
     * FK to inventory_item table
     *
     * @generated from field: string inventory_item_id = 18;
     */
    inventoryItemId: string;
    /**
     * FK to inventory_serial table (for serialized items)
     *
     * @generated from field: string inventory_serial_id = 19;
     */
    inventorySerialId: string;
    /**
     * FK to price_list
     *
     * @generated from field: optional string price_list_id = 20;
     */
    priceListId?: string;
    /**
     * FK to product_variant
     *
     * @generated from field: optional string variant_id = 21;
     */
    variantId?: string;
    /**
     * display label ("256GB Black")
     *
     * @generated from field: optional string variant_label = 22;
     */
    variantLabel?: string;
    /**
     * FK to location (where stock was pulled)
     *
     * @generated from field: optional string location_id = 23;
     */
    locationId?: string;
    /**
     * centavos       // purchase cost for margin tracking
     *
     * @generated from field: optional int64 cost_price = 24;
     */
    costPrice?: bigint;
    /**
     * @generated from field: optional string product_price_plan_id = 25;
     */
    productPricePlanId?: string;
    /**
     * FK to price_product — tracks which price_product was used for one-time revenue line items
     *
     * @generated from field: optional string price_product_id = 26;
     */
    priceProductId?: string;
    /**
     * FK to job_activity — links line item to the activity that generated it
     *
     * @generated from field: optional string job_activity_id = 27;
     */
    jobActivityId?: string;
};
/**
 * Describes the message domain.revenue.v1.RevenueLineItem.
 * Use `create(RevenueLineItemSchema)` to create a new message.
 */
export declare const RevenueLineItemSchema: GenMessage<RevenueLineItem>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueLineItemRequest
 */
export type CreateRevenueLineItemRequest = Message<"domain.revenue.v1.CreateRevenueLineItemRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueLineItem data = 1;
     */
    data?: RevenueLineItem;
};
/**
 * Describes the message domain.revenue.v1.CreateRevenueLineItemRequest.
 * Use `create(CreateRevenueLineItemRequestSchema)` to create a new message.
 */
export declare const CreateRevenueLineItemRequestSchema: GenMessage<CreateRevenueLineItemRequest>;
/**
 * @generated from message domain.revenue.v1.CreateRevenueLineItemResponse
 */
export type CreateRevenueLineItemResponse = Message<"domain.revenue.v1.CreateRevenueLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueLineItem data = 1;
     */
    data: RevenueLineItem[];
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
 * Describes the message domain.revenue.v1.CreateRevenueLineItemResponse.
 * Use `create(CreateRevenueLineItemResponseSchema)` to create a new message.
 */
export declare const CreateRevenueLineItemResponseSchema: GenMessage<CreateRevenueLineItemResponse>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueLineItemRequest
 */
export type ReadRevenueLineItemRequest = Message<"domain.revenue.v1.ReadRevenueLineItemRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueLineItem data = 1;
     */
    data?: RevenueLineItem;
};
/**
 * Describes the message domain.revenue.v1.ReadRevenueLineItemRequest.
 * Use `create(ReadRevenueLineItemRequestSchema)` to create a new message.
 */
export declare const ReadRevenueLineItemRequestSchema: GenMessage<ReadRevenueLineItemRequest>;
/**
 * @generated from message domain.revenue.v1.ReadRevenueLineItemResponse
 */
export type ReadRevenueLineItemResponse = Message<"domain.revenue.v1.ReadRevenueLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueLineItem data = 1;
     */
    data: RevenueLineItem[];
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
 * Describes the message domain.revenue.v1.ReadRevenueLineItemResponse.
 * Use `create(ReadRevenueLineItemResponseSchema)` to create a new message.
 */
export declare const ReadRevenueLineItemResponseSchema: GenMessage<ReadRevenueLineItemResponse>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueLineItemRequest
 */
export type UpdateRevenueLineItemRequest = Message<"domain.revenue.v1.UpdateRevenueLineItemRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueLineItem data = 1;
     */
    data?: RevenueLineItem;
};
/**
 * Describes the message domain.revenue.v1.UpdateRevenueLineItemRequest.
 * Use `create(UpdateRevenueLineItemRequestSchema)` to create a new message.
 */
export declare const UpdateRevenueLineItemRequestSchema: GenMessage<UpdateRevenueLineItemRequest>;
/**
 * @generated from message domain.revenue.v1.UpdateRevenueLineItemResponse
 */
export type UpdateRevenueLineItemResponse = Message<"domain.revenue.v1.UpdateRevenueLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueLineItem data = 1;
     */
    data: RevenueLineItem[];
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
 * Describes the message domain.revenue.v1.UpdateRevenueLineItemResponse.
 * Use `create(UpdateRevenueLineItemResponseSchema)` to create a new message.
 */
export declare const UpdateRevenueLineItemResponseSchema: GenMessage<UpdateRevenueLineItemResponse>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueLineItemRequest
 */
export type DeleteRevenueLineItemRequest = Message<"domain.revenue.v1.DeleteRevenueLineItemRequest"> & {
    /**
     * @generated from field: domain.revenue.v1.RevenueLineItem data = 1;
     */
    data?: RevenueLineItem;
};
/**
 * Describes the message domain.revenue.v1.DeleteRevenueLineItemRequest.
 * Use `create(DeleteRevenueLineItemRequestSchema)` to create a new message.
 */
export declare const DeleteRevenueLineItemRequestSchema: GenMessage<DeleteRevenueLineItemRequest>;
/**
 * @generated from message domain.revenue.v1.DeleteRevenueLineItemResponse
 */
export type DeleteRevenueLineItemResponse = Message<"domain.revenue.v1.DeleteRevenueLineItemResponse"> & {
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
 * Describes the message domain.revenue.v1.DeleteRevenueLineItemResponse.
 * Use `create(DeleteRevenueLineItemResponseSchema)` to create a new message.
 */
export declare const DeleteRevenueLineItemResponseSchema: GenMessage<DeleteRevenueLineItemResponse>;
/**
 * @generated from message domain.revenue.v1.ListRevenueLineItemsRequest
 */
export type ListRevenueLineItemsRequest = Message<"domain.revenue.v1.ListRevenueLineItemsRequest"> & {
    /**
     * @generated from field: optional string revenue_id = 1;
     */
    revenueId?: string;
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
 * Describes the message domain.revenue.v1.ListRevenueLineItemsRequest.
 * Use `create(ListRevenueLineItemsRequestSchema)` to create a new message.
 */
export declare const ListRevenueLineItemsRequestSchema: GenMessage<ListRevenueLineItemsRequest>;
/**
 * @generated from message domain.revenue.v1.ListRevenueLineItemsResponse
 */
export type ListRevenueLineItemsResponse = Message<"domain.revenue.v1.ListRevenueLineItemsResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueLineItem data = 1;
     */
    data: RevenueLineItem[];
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
 * Describes the message domain.revenue.v1.ListRevenueLineItemsResponse.
 * Use `create(ListRevenueLineItemsResponseSchema)` to create a new message.
 */
export declare const ListRevenueLineItemsResponseSchema: GenMessage<ListRevenueLineItemsResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueLineItemListPageDataRequest
 */
export type GetRevenueLineItemListPageDataRequest = Message<"domain.revenue.v1.GetRevenueLineItemListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueLineItemListPageDataRequest.
 * Use `create(GetRevenueLineItemListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueLineItemListPageDataRequestSchema: GenMessage<GetRevenueLineItemListPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueLineItemListPageDataResponse
 */
export type GetRevenueLineItemListPageDataResponse = Message<"domain.revenue.v1.GetRevenueLineItemListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueLineItem revenue_line_item_list = 1;
     */
    revenueLineItemList: RevenueLineItem[];
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
 * Describes the message domain.revenue.v1.GetRevenueLineItemListPageDataResponse.
 * Use `create(GetRevenueLineItemListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueLineItemListPageDataResponseSchema: GenMessage<GetRevenueLineItemListPageDataResponse>;
/**
 * @generated from message domain.revenue.v1.GetRevenueLineItemItemPageDataRequest
 */
export type GetRevenueLineItemItemPageDataRequest = Message<"domain.revenue.v1.GetRevenueLineItemItemPageDataRequest"> & {
    /**
     * @generated from field: string revenue_line_item_id = 1;
     */
    revenueLineItemId: string;
};
/**
 * Describes the message domain.revenue.v1.GetRevenueLineItemItemPageDataRequest.
 * Use `create(GetRevenueLineItemItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRevenueLineItemItemPageDataRequestSchema: GenMessage<GetRevenueLineItemItemPageDataRequest>;
/**
 * @generated from message domain.revenue.v1.GetRevenueLineItemItemPageDataResponse
 */
export type GetRevenueLineItemItemPageDataResponse = Message<"domain.revenue.v1.GetRevenueLineItemItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.revenue.v1.RevenueLineItem revenue_line_item = 1;
     */
    revenueLineItem?: RevenueLineItem;
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
 * Describes the message domain.revenue.v1.GetRevenueLineItemItemPageDataResponse.
 * Use `create(GetRevenueLineItemItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRevenueLineItemItemPageDataResponseSchema: GenMessage<GetRevenueLineItemItemPageDataResponse>;
/**
 * @generated from service domain.revenue.v1.RevenueLineItemDomainService
 */
export declare const RevenueLineItemDomainService: GenService<{
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.CreateRevenueLineItem
     */
    createRevenueLineItem: {
        methodKind: "unary";
        input: typeof CreateRevenueLineItemRequestSchema;
        output: typeof CreateRevenueLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.ReadRevenueLineItem
     */
    readRevenueLineItem: {
        methodKind: "unary";
        input: typeof ReadRevenueLineItemRequestSchema;
        output: typeof ReadRevenueLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.UpdateRevenueLineItem
     */
    updateRevenueLineItem: {
        methodKind: "unary";
        input: typeof UpdateRevenueLineItemRequestSchema;
        output: typeof UpdateRevenueLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.DeleteRevenueLineItem
     */
    deleteRevenueLineItem: {
        methodKind: "unary";
        input: typeof DeleteRevenueLineItemRequestSchema;
        output: typeof DeleteRevenueLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.ListRevenueLineItems
     */
    listRevenueLineItems: {
        methodKind: "unary";
        input: typeof ListRevenueLineItemsRequestSchema;
        output: typeof ListRevenueLineItemsResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.GetRevenueLineItemListPageData
     */
    getRevenueLineItemListPageData: {
        methodKind: "unary";
        input: typeof GetRevenueLineItemListPageDataRequestSchema;
        output: typeof GetRevenueLineItemListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.revenue.v1.RevenueLineItemDomainService.GetRevenueLineItemItemPageData
     */
    getRevenueLineItemItemPageData: {
        methodKind: "unary";
        input: typeof GetRevenueLineItemItemPageDataRequestSchema;
        output: typeof GetRevenueLineItemItemPageDataResponseSchema;
    };
}>;
