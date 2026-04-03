import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Expenditure } from "../expenditure/expenditure_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expenditure_line_item/expenditure_line_item.proto.
 */
export declare const file_domain_expenditure_expenditure_line_item_expenditure_line_item: GenFile;
/**
 * @generated from message domain.expenditure.v1.ExpenditureLineItem
 */
export type ExpenditureLineItem = Message<"domain.expenditure.v1.ExpenditureLineItem"> & {
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
     * @generated from field: optional domain.expenditure.v1.Expenditure expenditure = 7;
     */
    expenditure?: Expenditure;
    /**
     * @generated from field: string expenditure_id = 8;
     */
    expenditureId: string;
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
     * @generated from field: double unit_price = 13;
     */
    unitPrice: number;
    /**
     * @generated from field: double total_price = 14;
     */
    totalPrice: number;
    /**
     * @generated from field: optional string notes = 16;
     */
    notes?: string;
    /**
     * "item", "tax", "shipping", "discount"
     *
     * @generated from field: string line_item_type = 17;
     */
    lineItemType: string;
    /**
     * FK to inventory_item (for purchase items going into stock)
     *
     * @generated from field: optional string inventory_item_id = 18;
     */
    inventoryItemId?: string;
    /**
     * FK to location (where received)
     *
     * @generated from field: optional string location_id = 19;
     */
    locationId?: string;
    /**
     * FK to PO line for line-level 3-way match
     *
     * @generated from field: optional string purchase_order_line_item_id = 20;
     */
    purchaseOrderLineItemId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ExpenditureLineItem.
 * Use `create(ExpenditureLineItemSchema)` to create a new message.
 */
export declare const ExpenditureLineItemSchema: GenMessage<ExpenditureLineItem>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureLineItemRequest
 */
export type CreateExpenditureLineItemRequest = Message<"domain.expenditure.v1.CreateExpenditureLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data?: ExpenditureLineItem;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenditureLineItemRequest.
 * Use `create(CreateExpenditureLineItemRequestSchema)` to create a new message.
 */
export declare const CreateExpenditureLineItemRequestSchema: GenMessage<CreateExpenditureLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureLineItemResponse
 */
export type CreateExpenditureLineItemResponse = Message<"domain.expenditure.v1.CreateExpenditureLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data: ExpenditureLineItem[];
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
 * Describes the message domain.expenditure.v1.CreateExpenditureLineItemResponse.
 * Use `create(CreateExpenditureLineItemResponseSchema)` to create a new message.
 */
export declare const CreateExpenditureLineItemResponseSchema: GenMessage<CreateExpenditureLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureLineItemRequest
 */
export type ReadExpenditureLineItemRequest = Message<"domain.expenditure.v1.ReadExpenditureLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data?: ExpenditureLineItem;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenditureLineItemRequest.
 * Use `create(ReadExpenditureLineItemRequestSchema)` to create a new message.
 */
export declare const ReadExpenditureLineItemRequestSchema: GenMessage<ReadExpenditureLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureLineItemResponse
 */
export type ReadExpenditureLineItemResponse = Message<"domain.expenditure.v1.ReadExpenditureLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data: ExpenditureLineItem[];
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
 * Describes the message domain.expenditure.v1.ReadExpenditureLineItemResponse.
 * Use `create(ReadExpenditureLineItemResponseSchema)` to create a new message.
 */
export declare const ReadExpenditureLineItemResponseSchema: GenMessage<ReadExpenditureLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureLineItemRequest
 */
export type UpdateExpenditureLineItemRequest = Message<"domain.expenditure.v1.UpdateExpenditureLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data?: ExpenditureLineItem;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenditureLineItemRequest.
 * Use `create(UpdateExpenditureLineItemRequestSchema)` to create a new message.
 */
export declare const UpdateExpenditureLineItemRequestSchema: GenMessage<UpdateExpenditureLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureLineItemResponse
 */
export type UpdateExpenditureLineItemResponse = Message<"domain.expenditure.v1.UpdateExpenditureLineItemResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data: ExpenditureLineItem[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenditureLineItemResponse.
 * Use `create(UpdateExpenditureLineItemResponseSchema)` to create a new message.
 */
export declare const UpdateExpenditureLineItemResponseSchema: GenMessage<UpdateExpenditureLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureLineItemRequest
 */
export type DeleteExpenditureLineItemRequest = Message<"domain.expenditure.v1.DeleteExpenditureLineItemRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data?: ExpenditureLineItem;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenditureLineItemRequest.
 * Use `create(DeleteExpenditureLineItemRequestSchema)` to create a new message.
 */
export declare const DeleteExpenditureLineItemRequestSchema: GenMessage<DeleteExpenditureLineItemRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureLineItemResponse
 */
export type DeleteExpenditureLineItemResponse = Message<"domain.expenditure.v1.DeleteExpenditureLineItemResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenditureLineItemResponse.
 * Use `create(DeleteExpenditureLineItemResponseSchema)` to create a new message.
 */
export declare const DeleteExpenditureLineItemResponseSchema: GenMessage<DeleteExpenditureLineItemResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenditureLineItemsRequest
 */
export type ListExpenditureLineItemsRequest = Message<"domain.expenditure.v1.ListExpenditureLineItemsRequest"> & {
    /**
     * @generated from field: optional string expenditure_id = 1;
     */
    expenditureId?: string;
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
 * Describes the message domain.expenditure.v1.ListExpenditureLineItemsRequest.
 * Use `create(ListExpenditureLineItemsRequestSchema)` to create a new message.
 */
export declare const ListExpenditureLineItemsRequestSchema: GenMessage<ListExpenditureLineItemsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenditureLineItemsResponse
 */
export type ListExpenditureLineItemsResponse = Message<"domain.expenditure.v1.ListExpenditureLineItemsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureLineItem data = 1;
     */
    data: ExpenditureLineItem[];
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
 * Describes the message domain.expenditure.v1.ListExpenditureLineItemsResponse.
 * Use `create(ListExpenditureLineItemsResponseSchema)` to create a new message.
 */
export declare const ListExpenditureLineItemsResponseSchema: GenMessage<ListExpenditureLineItemsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureLineItemListPageDataRequest
 */
export type GetExpenditureLineItemListPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureLineItemListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetExpenditureLineItemListPageDataRequest.
 * Use `create(GetExpenditureLineItemListPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureLineItemListPageDataRequestSchema: GenMessage<GetExpenditureLineItemListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureLineItemListPageDataResponse
 */
export type GetExpenditureLineItemListPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureLineItemListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenditureLineItem expenditure_line_item_list = 1;
     */
    expenditureLineItemList: ExpenditureLineItem[];
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
 * Describes the message domain.expenditure.v1.GetExpenditureLineItemListPageDataResponse.
 * Use `create(GetExpenditureLineItemListPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureLineItemListPageDataResponseSchema: GenMessage<GetExpenditureLineItemListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureLineItemItemPageDataRequest
 */
export type GetExpenditureLineItemItemPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureLineItemItemPageDataRequest"> & {
    /**
     * @generated from field: string expenditure_line_item_id = 1;
     */
    expenditureLineItemId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureLineItemItemPageDataRequest.
 * Use `create(GetExpenditureLineItemItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureLineItemItemPageDataRequestSchema: GenMessage<GetExpenditureLineItemItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureLineItemItemPageDataResponse
 */
export type GetExpenditureLineItemItemPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureLineItemItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenditureLineItem expenditure_line_item = 1;
     */
    expenditureLineItem?: ExpenditureLineItem;
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
 * Describes the message domain.expenditure.v1.GetExpenditureLineItemItemPageDataResponse.
 * Use `create(GetExpenditureLineItemItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureLineItemItemPageDataResponseSchema: GenMessage<GetExpenditureLineItemItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.ExpenditureLineItemDomainService
 */
export declare const ExpenditureLineItemDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.CreateExpenditureLineItem
     */
    createExpenditureLineItem: {
        methodKind: "unary";
        input: typeof CreateExpenditureLineItemRequestSchema;
        output: typeof CreateExpenditureLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.ReadExpenditureLineItem
     */
    readExpenditureLineItem: {
        methodKind: "unary";
        input: typeof ReadExpenditureLineItemRequestSchema;
        output: typeof ReadExpenditureLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.UpdateExpenditureLineItem
     */
    updateExpenditureLineItem: {
        methodKind: "unary";
        input: typeof UpdateExpenditureLineItemRequestSchema;
        output: typeof UpdateExpenditureLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.DeleteExpenditureLineItem
     */
    deleteExpenditureLineItem: {
        methodKind: "unary";
        input: typeof DeleteExpenditureLineItemRequestSchema;
        output: typeof DeleteExpenditureLineItemResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.ListExpenditureLineItems
     */
    listExpenditureLineItems: {
        methodKind: "unary";
        input: typeof ListExpenditureLineItemsRequestSchema;
        output: typeof ListExpenditureLineItemsResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.GetExpenditureLineItemListPageData
     */
    getExpenditureLineItemListPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureLineItemListPageDataRequestSchema;
        output: typeof GetExpenditureLineItemListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureLineItemDomainService.GetExpenditureLineItemItemPageData
     */
    getExpenditureLineItemItemPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureLineItemItemPageDataRequestSchema;
        output: typeof GetExpenditureLineItemItemPageDataResponseSchema;
    };
}>;
