import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PurchaseOrder } from "../purchase_order/purchase_order_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/purchase_order_line_item/purchase_order_line_item.proto.
 */
export declare const file_domain_expenditure_purchase_order_line_item_purchase_order_line_item: GenFile;
/**
 * @generated from message domain.expenditure.v1.PurchaseOrderLineItem
 */
export type PurchaseOrderLineItem = Message<"domain.expenditure.v1.PurchaseOrderLineItem"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent PO
     *
     * @generated from field: optional domain.expenditure.v1.PurchaseOrder purchase_order = 2;
     */
    purchaseOrder?: PurchaseOrder;
    /**
     * @generated from field: string purchase_order_id = 3;
     */
    purchaseOrderId: string;
    /**
     * Product
     *
     * @generated from field: optional domain.product.v1.Product product = 4;
     */
    product?: Product;
    /**
     * @generated from field: optional string product_id = 5;
     */
    productId?: string;
    /**
     * Line details
     *
     * @generated from field: string description = 6;
     */
    description: string;
    /**
     * "goods", "service", "expense"
     *
     * @generated from field: string line_type = 7;
     */
    lineType: string;
    /**
     * @generated from field: double quantity_ordered = 8;
     */
    quantityOrdered: number;
    /**
     * Updated on goods receipt
     *
     * @generated from field: double quantity_received = 9;
     */
    quantityReceived: number;
    /**
     * Updated on invoice match
     *
     * @generated from field: double quantity_billed = 10;
     */
    quantityBilled: number;
    /**
     * @generated from field: double unit_price = 11;
     */
    unitPrice: number;
    /**
     * @generated from field: double total_price = 12;
     */
    totalPrice: number;
    /**
     * Receiving location
     *
     * @generated from field: optional string location_id = 13;
     */
    locationId?: string;
    /**
     * @generated from field: optional string inventory_item_id = 14;
     */
    inventoryItemId?: string;
    /**
     * Delivery
     *
     * @generated from field: optional int64 required_by_date = 15;
     */
    requiredByDate?: bigint;
    /**
     * @generated from field: optional string required_by_date_string = 16;
     */
    requiredByDateString?: string;
    /**
     * Notes
     *
     * @generated from field: optional string notes = 17;
     */
    notes?: string;
    /**
     * Display ordering
     *
     * @generated from field: int32 line_number = 18;
     */
    lineNumber: number;
    /**
     * Audit
     *
     * @generated from field: bool active = 19;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 20;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 21;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 22;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 23;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.expenditure.v1.PurchaseOrderLineItem.
 * Use `create(PurchaseOrderLineItemSchema)` to create a new message.
 */
export declare const PurchaseOrderLineItemSchema: GenMessage<PurchaseOrderLineItem>;
/**
 * @generated from message domain.expenditure.v1.CreatePurchaseOrderLineItemRequest
 */
export type CreatePurchaseOrderLineItemRequest = Message<"domain.expenditure.v1.CreatePurchaseOrderLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data?: PurchaseOrderLineItem;
};
/**
 * Describes the message domain.expenditure.v1.CreatePurchaseOrderLineItemRequest.
 * Use `create(CreatePurchaseOrderLineItemRequestSchema)` to create a new message.
 */
export declare const CreatePurchaseOrderLineItemRequestSchema: GenMessage<CreatePurchaseOrderLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.CreatePurchaseOrderLineItemResponse
 */
export type CreatePurchaseOrderLineItemResponse = Message<"domain.expenditure.v1.CreatePurchaseOrderLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data: PurchaseOrderLineItem[];
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
 * Describes the message domain.expenditure.v1.CreatePurchaseOrderLineItemResponse.
 * Use `create(CreatePurchaseOrderLineItemResponseSchema)` to create a new message.
 */
export declare const CreatePurchaseOrderLineItemResponseSchema: GenMessage<CreatePurchaseOrderLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadPurchaseOrderLineItemRequest
 */
export type ReadPurchaseOrderLineItemRequest = Message<"domain.expenditure.v1.ReadPurchaseOrderLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data?: PurchaseOrderLineItem;
};
/**
 * Describes the message domain.expenditure.v1.ReadPurchaseOrderLineItemRequest.
 * Use `create(ReadPurchaseOrderLineItemRequestSchema)` to create a new message.
 */
export declare const ReadPurchaseOrderLineItemRequestSchema: GenMessage<ReadPurchaseOrderLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadPurchaseOrderLineItemResponse
 */
export type ReadPurchaseOrderLineItemResponse = Message<"domain.expenditure.v1.ReadPurchaseOrderLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data: PurchaseOrderLineItem[];
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
 * Describes the message domain.expenditure.v1.ReadPurchaseOrderLineItemResponse.
 * Use `create(ReadPurchaseOrderLineItemResponseSchema)` to create a new message.
 */
export declare const ReadPurchaseOrderLineItemResponseSchema: GenMessage<ReadPurchaseOrderLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdatePurchaseOrderLineItemRequest
 */
export type UpdatePurchaseOrderLineItemRequest = Message<"domain.expenditure.v1.UpdatePurchaseOrderLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data?: PurchaseOrderLineItem;
};
/**
 * Describes the message domain.expenditure.v1.UpdatePurchaseOrderLineItemRequest.
 * Use `create(UpdatePurchaseOrderLineItemRequestSchema)` to create a new message.
 */
export declare const UpdatePurchaseOrderLineItemRequestSchema: GenMessage<UpdatePurchaseOrderLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdatePurchaseOrderLineItemResponse
 */
export type UpdatePurchaseOrderLineItemResponse = Message<"domain.expenditure.v1.UpdatePurchaseOrderLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data: PurchaseOrderLineItem[];
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
 * Describes the message domain.expenditure.v1.UpdatePurchaseOrderLineItemResponse.
 * Use `create(UpdatePurchaseOrderLineItemResponseSchema)` to create a new message.
 */
export declare const UpdatePurchaseOrderLineItemResponseSchema: GenMessage<UpdatePurchaseOrderLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.DeletePurchaseOrderLineItemRequest
 */
export type DeletePurchaseOrderLineItemRequest = Message<"domain.expenditure.v1.DeletePurchaseOrderLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data?: PurchaseOrderLineItem;
};
/**
 * Describes the message domain.expenditure.v1.DeletePurchaseOrderLineItemRequest.
 * Use `create(DeletePurchaseOrderLineItemRequestSchema)` to create a new message.
 */
export declare const DeletePurchaseOrderLineItemRequestSchema: GenMessage<DeletePurchaseOrderLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.DeletePurchaseOrderLineItemResponse
 */
export type DeletePurchaseOrderLineItemResponse = Message<"domain.expenditure.v1.DeletePurchaseOrderLineItemResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeletePurchaseOrderLineItemResponse.
 * Use `create(DeletePurchaseOrderLineItemResponseSchema)` to create a new message.
 */
export declare const DeletePurchaseOrderLineItemResponseSchema: GenMessage<DeletePurchaseOrderLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.ListPurchaseOrderLineItemsRequest
 */
export type ListPurchaseOrderLineItemsRequest = Message<"domain.expenditure.v1.ListPurchaseOrderLineItemsRequest"> & {
    /**
     * @generated from field: optional string purchase_order_id = 1;
     */
    purchaseOrderId?: string;
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
 * Describes the message domain.expenditure.v1.ListPurchaseOrderLineItemsRequest.
 * Use `create(ListPurchaseOrderLineItemsRequestSchema)` to create a new message.
 */
export declare const ListPurchaseOrderLineItemsRequestSchema: GenMessage<ListPurchaseOrderLineItemsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListPurchaseOrderLineItemsResponse
 */
export type ListPurchaseOrderLineItemsResponse = Message<"domain.expenditure.v1.ListPurchaseOrderLineItemsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrderLineItem data = 1;
     */
    data: PurchaseOrderLineItem[];
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
 * Describes the message domain.expenditure.v1.ListPurchaseOrderLineItemsResponse.
 * Use `create(ListPurchaseOrderLineItemsResponseSchema)` to create a new message.
 */
export declare const ListPurchaseOrderLineItemsResponseSchema: GenMessage<ListPurchaseOrderLineItemsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderLineItemListPageDataRequest
 */
export type GetPurchaseOrderLineItemListPageDataRequest = Message<"domain.expenditure.v1.GetPurchaseOrderLineItemListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetPurchaseOrderLineItemListPageDataRequest.
 * Use `create(GetPurchaseOrderLineItemListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPurchaseOrderLineItemListPageDataRequestSchema: GenMessage<GetPurchaseOrderLineItemListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderLineItemListPageDataResponse
 */
export type GetPurchaseOrderLineItemListPageDataResponse = Message<"domain.expenditure.v1.GetPurchaseOrderLineItemListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrderLineItem purchase_order_line_item_list = 1;
     */
    purchaseOrderLineItemList: PurchaseOrderLineItem[];
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
 * Describes the message domain.expenditure.v1.GetPurchaseOrderLineItemListPageDataResponse.
 * Use `create(GetPurchaseOrderLineItemListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPurchaseOrderLineItemListPageDataResponseSchema: GenMessage<GetPurchaseOrderLineItemListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderLineItemItemPageDataRequest
 */
export type GetPurchaseOrderLineItemItemPageDataRequest = Message<"domain.expenditure.v1.GetPurchaseOrderLineItemItemPageDataRequest"> & {
    /**
     * @generated from field: string purchase_order_line_item_id = 1;
     */
    purchaseOrderLineItemId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetPurchaseOrderLineItemItemPageDataRequest.
 * Use `create(GetPurchaseOrderLineItemItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPurchaseOrderLineItemItemPageDataRequestSchema: GenMessage<GetPurchaseOrderLineItemItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderLineItemItemPageDataResponse
 */
export type GetPurchaseOrderLineItemItemPageDataResponse = Message<"domain.expenditure.v1.GetPurchaseOrderLineItemItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.PurchaseOrderLineItem purchase_order_line_item = 1;
     */
    purchaseOrderLineItem?: PurchaseOrderLineItem;
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
 * Describes the message domain.expenditure.v1.GetPurchaseOrderLineItemItemPageDataResponse.
 * Use `create(GetPurchaseOrderLineItemItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPurchaseOrderLineItemItemPageDataResponseSchema: GenMessage<GetPurchaseOrderLineItemItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.PurchaseOrderLineItemDomainService
 */
export declare const PurchaseOrderLineItemDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.CreatePurchaseOrderLineItem
     */
    createPurchaseOrderLineItem: {
        methodKind: "unary";
        input: typeof CreatePurchaseOrderLineItemRequestSchema;
        output: typeof CreatePurchaseOrderLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.ReadPurchaseOrderLineItem
     */
    readPurchaseOrderLineItem: {
        methodKind: "unary";
        input: typeof ReadPurchaseOrderLineItemRequestSchema;
        output: typeof ReadPurchaseOrderLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.UpdatePurchaseOrderLineItem
     */
    updatePurchaseOrderLineItem: {
        methodKind: "unary";
        input: typeof UpdatePurchaseOrderLineItemRequestSchema;
        output: typeof UpdatePurchaseOrderLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.DeletePurchaseOrderLineItem
     */
    deletePurchaseOrderLineItem: {
        methodKind: "unary";
        input: typeof DeletePurchaseOrderLineItemRequestSchema;
        output: typeof DeletePurchaseOrderLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.ListPurchaseOrderLineItems
     */
    listPurchaseOrderLineItems: {
        methodKind: "unary";
        input: typeof ListPurchaseOrderLineItemsRequestSchema;
        output: typeof ListPurchaseOrderLineItemsResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.GetPurchaseOrderLineItemListPageData
     */
    getPurchaseOrderLineItemListPageData: {
        methodKind: "unary";
        input: typeof GetPurchaseOrderLineItemListPageDataRequestSchema;
        output: typeof GetPurchaseOrderLineItemListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderLineItemDomainService.GetPurchaseOrderLineItemItemPageData
     */
    getPurchaseOrderLineItemItemPageData: {
        methodKind: "unary";
        input: typeof GetPurchaseOrderLineItemItemPageDataRequestSchema;
        output: typeof GetPurchaseOrderLineItemItemPageDataResponseSchema;
    };
}>;
