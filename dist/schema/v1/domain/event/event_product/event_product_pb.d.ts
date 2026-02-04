import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { Event } from "../event/event_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/event/event_product/event_product.proto.
 */
export declare const file_domain_event_event_product_event_product: GenFile;
/**
 * @generated from message domain.event.v1.EventProduct
 */
export type EventProduct = Message<"domain.event.v1.EventProduct"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.event.v1.Event event = 2;
     */
    event?: Event;
    /**
     * @generated from field: string event_id = 3;
     */
    eventId: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 4;
     */
    product?: Product;
    /**
     * @generated from field: string product_id = 5;
     */
    productId: string;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 7;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 8;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 9;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int32 quantity = 11;
     */
    quantity?: number;
    /**
     * @generated from field: optional double unit_price = 12;
     */
    unitPrice?: number;
    /**
     * @generated from field: optional string currency = 13;
     */
    currency?: string;
    /**
     * @generated from field: optional double total_price = 14;
     */
    totalPrice?: number;
    /**
     * @generated from field: optional string notes = 15;
     */
    notes?: string;
};
/**
 * Describes the message domain.event.v1.EventProduct.
 * Use `create(EventProductSchema)` to create a new message.
 */
export declare const EventProductSchema: GenMessage<EventProduct>;
/**
 * @generated from message domain.event.v1.CreateEventProductRequest
 */
export type CreateEventProductRequest = Message<"domain.event.v1.CreateEventProductRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventProduct data = 1;
     */
    data?: EventProduct;
};
/**
 * Describes the message domain.event.v1.CreateEventProductRequest.
 * Use `create(CreateEventProductRequestSchema)` to create a new message.
 */
export declare const CreateEventProductRequestSchema: GenMessage<CreateEventProductRequest>;
/**
 * @generated from message domain.event.v1.CreateEventProductResponse
 */
export type CreateEventProductResponse = Message<"domain.event.v1.CreateEventProductResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventProduct data = 1;
     */
    data: EventProduct[];
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
 * Describes the message domain.event.v1.CreateEventProductResponse.
 * Use `create(CreateEventProductResponseSchema)` to create a new message.
 */
export declare const CreateEventProductResponseSchema: GenMessage<CreateEventProductResponse>;
/**
 * @generated from message domain.event.v1.ReadEventProductRequest
 */
export type ReadEventProductRequest = Message<"domain.event.v1.ReadEventProductRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventProduct data = 1;
     */
    data?: EventProduct;
};
/**
 * Describes the message domain.event.v1.ReadEventProductRequest.
 * Use `create(ReadEventProductRequestSchema)` to create a new message.
 */
export declare const ReadEventProductRequestSchema: GenMessage<ReadEventProductRequest>;
/**
 * @generated from message domain.event.v1.ReadEventProductResponse
 */
export type ReadEventProductResponse = Message<"domain.event.v1.ReadEventProductResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventProduct data = 1;
     */
    data: EventProduct[];
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
 * Describes the message domain.event.v1.ReadEventProductResponse.
 * Use `create(ReadEventProductResponseSchema)` to create a new message.
 */
export declare const ReadEventProductResponseSchema: GenMessage<ReadEventProductResponse>;
/**
 * @generated from message domain.event.v1.UpdateEventProductRequest
 */
export type UpdateEventProductRequest = Message<"domain.event.v1.UpdateEventProductRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventProduct data = 1;
     */
    data?: EventProduct;
};
/**
 * Describes the message domain.event.v1.UpdateEventProductRequest.
 * Use `create(UpdateEventProductRequestSchema)` to create a new message.
 */
export declare const UpdateEventProductRequestSchema: GenMessage<UpdateEventProductRequest>;
/**
 * @generated from message domain.event.v1.UpdateEventProductResponse
 */
export type UpdateEventProductResponse = Message<"domain.event.v1.UpdateEventProductResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventProduct data = 1;
     */
    data: EventProduct[];
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
 * Describes the message domain.event.v1.UpdateEventProductResponse.
 * Use `create(UpdateEventProductResponseSchema)` to create a new message.
 */
export declare const UpdateEventProductResponseSchema: GenMessage<UpdateEventProductResponse>;
/**
 * @generated from message domain.event.v1.DeleteEventProductRequest
 */
export type DeleteEventProductRequest = Message<"domain.event.v1.DeleteEventProductRequest"> & {
    /**
     * @generated from field: domain.event.v1.EventProduct data = 1;
     */
    data?: EventProduct;
};
/**
 * Describes the message domain.event.v1.DeleteEventProductRequest.
 * Use `create(DeleteEventProductRequestSchema)` to create a new message.
 */
export declare const DeleteEventProductRequestSchema: GenMessage<DeleteEventProductRequest>;
/**
 * @generated from message domain.event.v1.DeleteEventProductResponse
 */
export type DeleteEventProductResponse = Message<"domain.event.v1.DeleteEventProductResponse"> & {
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
 * Describes the message domain.event.v1.DeleteEventProductResponse.
 * Use `create(DeleteEventProductResponseSchema)` to create a new message.
 */
export declare const DeleteEventProductResponseSchema: GenMessage<DeleteEventProductResponse>;
/**
 * @generated from message domain.event.v1.ListEventProductsRequest
 */
export type ListEventProductsRequest = Message<"domain.event.v1.ListEventProductsRequest"> & {
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
 * Describes the message domain.event.v1.ListEventProductsRequest.
 * Use `create(ListEventProductsRequestSchema)` to create a new message.
 */
export declare const ListEventProductsRequestSchema: GenMessage<ListEventProductsRequest>;
/**
 * @generated from message domain.event.v1.ListEventProductsResponse
 */
export type ListEventProductsResponse = Message<"domain.event.v1.ListEventProductsResponse"> & {
    /**
     * @generated from field: repeated domain.event.v1.EventProduct data = 1;
     */
    data: EventProduct[];
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
 * Describes the message domain.event.v1.ListEventProductsResponse.
 * Use `create(ListEventProductsResponseSchema)` to create a new message.
 */
export declare const ListEventProductsResponseSchema: GenMessage<ListEventProductsResponse>;
/**
 * @generated from service domain.event.v1.EventProductDomainService
 */
export declare const EventProductDomainService: GenService<{
    /**
     * @generated from rpc domain.event.v1.EventProductDomainService.CreateEventProduct
     */
    createEventProduct: {
        methodKind: "unary";
        input: typeof CreateEventProductRequestSchema;
        output: typeof CreateEventProductResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventProductDomainService.ReadEventProduct
     */
    readEventProduct: {
        methodKind: "unary";
        input: typeof ReadEventProductRequestSchema;
        output: typeof ReadEventProductResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventProductDomainService.UpdateEventProduct
     */
    updateEventProduct: {
        methodKind: "unary";
        input: typeof UpdateEventProductRequestSchema;
        output: typeof UpdateEventProductResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventProductDomainService.DeleteEventProduct
     */
    deleteEventProduct: {
        methodKind: "unary";
        input: typeof DeleteEventProductRequestSchema;
        output: typeof DeleteEventProductResponseSchema;
    };
    /**
     * @generated from rpc domain.event.v1.EventProductDomainService.ListEventProducts
     */
    listEventProducts: {
        methodKind: "unary";
        input: typeof ListEventProductsRequestSchema;
        output: typeof ListEventProductsResponseSchema;
    };
}>;
