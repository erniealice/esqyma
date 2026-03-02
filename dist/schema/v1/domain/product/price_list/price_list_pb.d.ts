import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { PriceProduct } from "../price_product/price_product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/price_list/price_list.proto.
 */
export declare const file_domain_product_price_list_price_list: GenFile;
/**
 * FK References: price_product.price_list_id, revenue_line_item.price_list_id
 *
 * @generated from message domain.product.v1.PriceList
 */
export type PriceList = Message<"domain.product.v1.PriceList"> & {
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
     * @generated from field: optional string description = 8;
     */
    description?: string;
    /**
     * @generated from field: int64 date_start = 9;
     */
    dateStart: bigint;
    /**
     * @generated from field: string date_start_string = 10;
     */
    dateStartString: string;
    /**
     * @generated from field: optional int64 date_end = 11;
     */
    dateEnd?: bigint;
    /**
     * @generated from field: optional string date_end_string = 12;
     */
    dateEndString?: string;
    /**
     * @generated from field: optional string location_id = 13;
     */
    locationId?: string;
};
/**
 * Describes the message domain.product.v1.PriceList.
 * Use `create(PriceListSchema)` to create a new message.
 */
export declare const PriceListSchema: GenMessage<PriceList>;
/**
 * @generated from message domain.product.v1.CreatePriceListRequest
 */
export type CreatePriceListRequest = Message<"domain.product.v1.CreatePriceListRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceList data = 1;
     */
    data?: PriceList;
};
/**
 * Describes the message domain.product.v1.CreatePriceListRequest.
 * Use `create(CreatePriceListRequestSchema)` to create a new message.
 */
export declare const CreatePriceListRequestSchema: GenMessage<CreatePriceListRequest>;
/**
 * @generated from message domain.product.v1.CreatePriceListResponse
 */
export type CreatePriceListResponse = Message<"domain.product.v1.CreatePriceListResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceList data = 1;
     */
    data: PriceList[];
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
 * Describes the message domain.product.v1.CreatePriceListResponse.
 * Use `create(CreatePriceListResponseSchema)` to create a new message.
 */
export declare const CreatePriceListResponseSchema: GenMessage<CreatePriceListResponse>;
/**
 * @generated from message domain.product.v1.ReadPriceListRequest
 */
export type ReadPriceListRequest = Message<"domain.product.v1.ReadPriceListRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceList data = 1;
     */
    data?: PriceList;
};
/**
 * Describes the message domain.product.v1.ReadPriceListRequest.
 * Use `create(ReadPriceListRequestSchema)` to create a new message.
 */
export declare const ReadPriceListRequestSchema: GenMessage<ReadPriceListRequest>;
/**
 * @generated from message domain.product.v1.ReadPriceListResponse
 */
export type ReadPriceListResponse = Message<"domain.product.v1.ReadPriceListResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceList data = 1;
     */
    data: PriceList[];
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
 * Describes the message domain.product.v1.ReadPriceListResponse.
 * Use `create(ReadPriceListResponseSchema)` to create a new message.
 */
export declare const ReadPriceListResponseSchema: GenMessage<ReadPriceListResponse>;
/**
 * @generated from message domain.product.v1.UpdatePriceListRequest
 */
export type UpdatePriceListRequest = Message<"domain.product.v1.UpdatePriceListRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceList data = 1;
     */
    data?: PriceList;
};
/**
 * Describes the message domain.product.v1.UpdatePriceListRequest.
 * Use `create(UpdatePriceListRequestSchema)` to create a new message.
 */
export declare const UpdatePriceListRequestSchema: GenMessage<UpdatePriceListRequest>;
/**
 * @generated from message domain.product.v1.UpdatePriceListResponse
 */
export type UpdatePriceListResponse = Message<"domain.product.v1.UpdatePriceListResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceList data = 1;
     */
    data: PriceList[];
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
 * Describes the message domain.product.v1.UpdatePriceListResponse.
 * Use `create(UpdatePriceListResponseSchema)` to create a new message.
 */
export declare const UpdatePriceListResponseSchema: GenMessage<UpdatePriceListResponse>;
/**
 * @generated from message domain.product.v1.DeletePriceListRequest
 */
export type DeletePriceListRequest = Message<"domain.product.v1.DeletePriceListRequest"> & {
    /**
     * @generated from field: domain.product.v1.PriceList data = 1;
     */
    data?: PriceList;
};
/**
 * Describes the message domain.product.v1.DeletePriceListRequest.
 * Use `create(DeletePriceListRequestSchema)` to create a new message.
 */
export declare const DeletePriceListRequestSchema: GenMessage<DeletePriceListRequest>;
/**
 * @generated from message domain.product.v1.DeletePriceListResponse
 */
export type DeletePriceListResponse = Message<"domain.product.v1.DeletePriceListResponse"> & {
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
 * Describes the message domain.product.v1.DeletePriceListResponse.
 * Use `create(DeletePriceListResponseSchema)` to create a new message.
 */
export declare const DeletePriceListResponseSchema: GenMessage<DeletePriceListResponse>;
/**
 * @generated from message domain.product.v1.ListPriceListsRequest
 */
export type ListPriceListsRequest = Message<"domain.product.v1.ListPriceListsRequest"> & {
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
 * Describes the message domain.product.v1.ListPriceListsRequest.
 * Use `create(ListPriceListsRequestSchema)` to create a new message.
 */
export declare const ListPriceListsRequestSchema: GenMessage<ListPriceListsRequest>;
/**
 * @generated from message domain.product.v1.ListPriceListsResponse
 */
export type ListPriceListsResponse = Message<"domain.product.v1.ListPriceListsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceList data = 1;
     */
    data: PriceList[];
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
 * Describes the message domain.product.v1.ListPriceListsResponse.
 * Use `create(ListPriceListsResponseSchema)` to create a new message.
 */
export declare const ListPriceListsResponseSchema: GenMessage<ListPriceListsResponse>;
/**
 * @generated from message domain.product.v1.GetPriceListListPageDataRequest
 */
export type GetPriceListListPageDataRequest = Message<"domain.product.v1.GetPriceListListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetPriceListListPageDataRequest.
 * Use `create(GetPriceListListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceListListPageDataRequestSchema: GenMessage<GetPriceListListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPriceListListPageDataResponse
 */
export type GetPriceListListPageDataResponse = Message<"domain.product.v1.GetPriceListListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.PriceList price_list_list = 1;
     */
    priceListList: PriceList[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.product.v1.GetPriceListListPageDataResponse.
 * Use `create(GetPriceListListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceListListPageDataResponseSchema: GenMessage<GetPriceListListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetPriceListItemPageDataRequest
 */
export type GetPriceListItemPageDataRequest = Message<"domain.product.v1.GetPriceListItemPageDataRequest"> & {
    /**
     * @generated from field: string price_list_id = 1;
     */
    priceListId: string;
};
/**
 * Describes the message domain.product.v1.GetPriceListItemPageDataRequest.
 * Use `create(GetPriceListItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPriceListItemPageDataRequestSchema: GenMessage<GetPriceListItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetPriceListItemPageDataResponse
 */
export type GetPriceListItemPageDataResponse = Message<"domain.product.v1.GetPriceListItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.PriceList price_list = 1;
     */
    priceList?: PriceList;
    /**
     * @generated from field: repeated domain.product.v1.PriceProduct price_products = 2;
     */
    priceProducts: PriceProduct[];
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.product.v1.GetPriceListItemPageDataResponse.
 * Use `create(GetPriceListItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPriceListItemPageDataResponseSchema: GenMessage<GetPriceListItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.PriceListDomainService
 */
export declare const PriceListDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.CreatePriceList
     */
    createPriceList: {
        methodKind: "unary";
        input: typeof CreatePriceListRequestSchema;
        output: typeof CreatePriceListResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.ReadPriceList
     */
    readPriceList: {
        methodKind: "unary";
        input: typeof ReadPriceListRequestSchema;
        output: typeof ReadPriceListResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.UpdatePriceList
     */
    updatePriceList: {
        methodKind: "unary";
        input: typeof UpdatePriceListRequestSchema;
        output: typeof UpdatePriceListResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.DeletePriceList
     */
    deletePriceList: {
        methodKind: "unary";
        input: typeof DeletePriceListRequestSchema;
        output: typeof DeletePriceListResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.ListPriceLists
     */
    listPriceLists: {
        methodKind: "unary";
        input: typeof ListPriceListsRequestSchema;
        output: typeof ListPriceListsResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.GetPriceListListPageData
     */
    getPriceListListPageData: {
        methodKind: "unary";
        input: typeof GetPriceListListPageDataRequestSchema;
        output: typeof GetPriceListListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.PriceListDomainService.GetPriceListItemPageData
     */
    getPriceListItemPageData: {
        methodKind: "unary";
        input: typeof GetPriceListItemPageDataRequestSchema;
        output: typeof GetPriceListItemPageDataResponseSchema;
    };
}>;
