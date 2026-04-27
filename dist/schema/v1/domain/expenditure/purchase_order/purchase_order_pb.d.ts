import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Supplier } from "../../entity/supplier/supplier_pb";
import type { Location } from "../../entity/location/location_pb";
import type { PaymentTerm } from "../../entity/payment_term/payment_term_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/purchase_order/purchase_order.proto.
 */
export declare const file_domain_expenditure_purchase_order_purchase_order: GenFile;
/**
 * @generated from message domain.expenditure.v1.PurchaseOrder
 */
export type PurchaseOrder = Message<"domain.expenditure.v1.PurchaseOrder"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Human-readable PO number
     *
     * @generated from field: string po_number = 2;
     */
    poNumber: string;
    /**
     * "standard", "blanket", "contract"
     *
     * @generated from field: string po_type = 3;
     */
    poType: string;
    /**
     * lifecycle state
     *
     * @generated from field: string status = 4;
     */
    status: string;
    /**
     * Vendor
     *
     * @generated from field: optional domain.entity.v1.Supplier supplier = 5;
     */
    supplier?: Supplier;
    /**
     * @generated from field: string supplier_id = 6;
     */
    supplierId: string;
    /**
     * Location (receiving warehouse)
     *
     * @generated from field: optional domain.entity.v1.Location location = 7;
     */
    location?: Location;
    /**
     * @generated from field: optional string location_id = 8;
     */
    locationId?: string;
    /**
     * Dates
     *
     * @generated from field: int64 order_date = 9;
     */
    orderDate: bigint;
    /**
     * @generated from field: optional string order_date_string = 10;
     */
    orderDateString?: string;
    /**
     * @generated from field: optional int64 expected_delivery_date = 11;
     */
    expectedDeliveryDate?: bigint;
    /**
     * @generated from field: optional string expected_delivery_date_string = 12;
     */
    expectedDeliveryDateString?: string;
    /**
     * Amounts
     *
     * @generated from field: string currency = 13;
     */
    currency: string;
    /**
     * centavos
     *
     * @generated from field: int64 subtotal = 14;
     */
    subtotal: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 tax_amount = 15;
     */
    taxAmount: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 16;
     */
    totalAmount: bigint;
    /**
     * Terms
     *
     * @generated from field: optional string payment_terms = 17;
     */
    paymentTerms?: string;
    /**
     * @generated from field: optional string shipping_terms = 18;
     */
    shippingTerms?: string;
    /**
     * Approval
     *
     * @generated from field: optional string approved_by = 19;
     */
    approvedBy?: string;
    /**
     * @generated from field: optional int64 approved_date = 20;
     */
    approvedDate?: bigint;
    /**
     * @generated from field: optional string approved_date_string = 21;
     */
    approvedDateString?: string;
    /**
     * Blanket order fields
     *
     * @generated from field: optional string parent_po_id = 22;
     */
    parentPoId?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string blanket_start_date = 23;
     */
    blanketStartDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string blanket_end_date = 25;
     */
    blanketEndDate?: string;
    /**
     * @generated from field: double blanket_total_quantity = 27;
     */
    blanketTotalQuantity: number;
    /**
     * @generated from field: double blanket_released_quantity = 28;
     */
    blanketReleasedQuantity: number;
    /**
     * Notes
     *
     * @generated from field: optional string notes = 29;
     */
    notes?: string;
    /**
     * @generated from field: optional string reference_number = 30;
     */
    referenceNumber?: string;
    /**
     * Audit
     *
     * @generated from field: bool active = 31;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 32;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 33;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 34;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 35;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: optional string payment_term_id = 36;
     */
    paymentTermId?: string;
    /**
     * @generated from field: optional domain.entity.v1.PaymentTerm payment_term = 37;
     */
    paymentTerm?: PaymentTerm;
    /**
     * Supplier commitment back-edges
     *
     * FK to SupplierContract (blanket/framework releases)
     *
     * @generated from field: optional string supplier_contract_id = 38;
     */
    supplierContractId?: string;
    /**
     * FK to ProcurementRequest (spawned PO)
     *
     * @generated from field: optional string procurement_request_id = 39;
     */
    procurementRequestId?: string;
};
/**
 * Describes the message domain.expenditure.v1.PurchaseOrder.
 * Use `create(PurchaseOrderSchema)` to create a new message.
 */
export declare const PurchaseOrderSchema: GenMessage<PurchaseOrder>;
/**
 * @generated from message domain.expenditure.v1.CreatePurchaseOrderRequest
 */
export type CreatePurchaseOrderRequest = Message<"domain.expenditure.v1.CreatePurchaseOrderRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data?: PurchaseOrder;
};
/**
 * Describes the message domain.expenditure.v1.CreatePurchaseOrderRequest.
 * Use `create(CreatePurchaseOrderRequestSchema)` to create a new message.
 */
export declare const CreatePurchaseOrderRequestSchema: GenMessage<CreatePurchaseOrderRequest>;
/**
 * @generated from message domain.expenditure.v1.CreatePurchaseOrderResponse
 */
export type CreatePurchaseOrderResponse = Message<"domain.expenditure.v1.CreatePurchaseOrderResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data: PurchaseOrder[];
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
 * Describes the message domain.expenditure.v1.CreatePurchaseOrderResponse.
 * Use `create(CreatePurchaseOrderResponseSchema)` to create a new message.
 */
export declare const CreatePurchaseOrderResponseSchema: GenMessage<CreatePurchaseOrderResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadPurchaseOrderRequest
 */
export type ReadPurchaseOrderRequest = Message<"domain.expenditure.v1.ReadPurchaseOrderRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data?: PurchaseOrder;
};
/**
 * Describes the message domain.expenditure.v1.ReadPurchaseOrderRequest.
 * Use `create(ReadPurchaseOrderRequestSchema)` to create a new message.
 */
export declare const ReadPurchaseOrderRequestSchema: GenMessage<ReadPurchaseOrderRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadPurchaseOrderResponse
 */
export type ReadPurchaseOrderResponse = Message<"domain.expenditure.v1.ReadPurchaseOrderResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data: PurchaseOrder[];
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
 * Describes the message domain.expenditure.v1.ReadPurchaseOrderResponse.
 * Use `create(ReadPurchaseOrderResponseSchema)` to create a new message.
 */
export declare const ReadPurchaseOrderResponseSchema: GenMessage<ReadPurchaseOrderResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdatePurchaseOrderRequest
 */
export type UpdatePurchaseOrderRequest = Message<"domain.expenditure.v1.UpdatePurchaseOrderRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data?: PurchaseOrder;
};
/**
 * Describes the message domain.expenditure.v1.UpdatePurchaseOrderRequest.
 * Use `create(UpdatePurchaseOrderRequestSchema)` to create a new message.
 */
export declare const UpdatePurchaseOrderRequestSchema: GenMessage<UpdatePurchaseOrderRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdatePurchaseOrderResponse
 */
export type UpdatePurchaseOrderResponse = Message<"domain.expenditure.v1.UpdatePurchaseOrderResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data: PurchaseOrder[];
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
 * Describes the message domain.expenditure.v1.UpdatePurchaseOrderResponse.
 * Use `create(UpdatePurchaseOrderResponseSchema)` to create a new message.
 */
export declare const UpdatePurchaseOrderResponseSchema: GenMessage<UpdatePurchaseOrderResponse>;
/**
 * @generated from message domain.expenditure.v1.DeletePurchaseOrderRequest
 */
export type DeletePurchaseOrderRequest = Message<"domain.expenditure.v1.DeletePurchaseOrderRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data?: PurchaseOrder;
};
/**
 * Describes the message domain.expenditure.v1.DeletePurchaseOrderRequest.
 * Use `create(DeletePurchaseOrderRequestSchema)` to create a new message.
 */
export declare const DeletePurchaseOrderRequestSchema: GenMessage<DeletePurchaseOrderRequest>;
/**
 * @generated from message domain.expenditure.v1.DeletePurchaseOrderResponse
 */
export type DeletePurchaseOrderResponse = Message<"domain.expenditure.v1.DeletePurchaseOrderResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeletePurchaseOrderResponse.
 * Use `create(DeletePurchaseOrderResponseSchema)` to create a new message.
 */
export declare const DeletePurchaseOrderResponseSchema: GenMessage<DeletePurchaseOrderResponse>;
/**
 * @generated from message domain.expenditure.v1.ListPurchaseOrdersRequest
 */
export type ListPurchaseOrdersRequest = Message<"domain.expenditure.v1.ListPurchaseOrdersRequest"> & {
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
    /**
     * @generated from field: optional string supplier_id = 5;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string status = 6;
     */
    status?: string;
    /**
     * @generated from field: optional string po_type = 7;
     */
    poType?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListPurchaseOrdersRequest.
 * Use `create(ListPurchaseOrdersRequestSchema)` to create a new message.
 */
export declare const ListPurchaseOrdersRequestSchema: GenMessage<ListPurchaseOrdersRequest>;
/**
 * @generated from message domain.expenditure.v1.ListPurchaseOrdersResponse
 */
export type ListPurchaseOrdersResponse = Message<"domain.expenditure.v1.ListPurchaseOrdersResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrder data = 1;
     */
    data: PurchaseOrder[];
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
 * Describes the message domain.expenditure.v1.ListPurchaseOrdersResponse.
 * Use `create(ListPurchaseOrdersResponseSchema)` to create a new message.
 */
export declare const ListPurchaseOrdersResponseSchema: GenMessage<ListPurchaseOrdersResponse>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderListPageDataRequest
 */
export type GetPurchaseOrderListPageDataRequest = Message<"domain.expenditure.v1.GetPurchaseOrderListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetPurchaseOrderListPageDataRequest.
 * Use `create(GetPurchaseOrderListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPurchaseOrderListPageDataRequestSchema: GenMessage<GetPurchaseOrderListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderListPageDataResponse
 */
export type GetPurchaseOrderListPageDataResponse = Message<"domain.expenditure.v1.GetPurchaseOrderListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.PurchaseOrder purchase_order_list = 1;
     */
    purchaseOrderList: PurchaseOrder[];
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
 * Describes the message domain.expenditure.v1.GetPurchaseOrderListPageDataResponse.
 * Use `create(GetPurchaseOrderListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPurchaseOrderListPageDataResponseSchema: GenMessage<GetPurchaseOrderListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderItemPageDataRequest
 */
export type GetPurchaseOrderItemPageDataRequest = Message<"domain.expenditure.v1.GetPurchaseOrderItemPageDataRequest"> & {
    /**
     * @generated from field: string purchase_order_id = 1;
     */
    purchaseOrderId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetPurchaseOrderItemPageDataRequest.
 * Use `create(GetPurchaseOrderItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPurchaseOrderItemPageDataRequestSchema: GenMessage<GetPurchaseOrderItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetPurchaseOrderItemPageDataResponse
 */
export type GetPurchaseOrderItemPageDataResponse = Message<"domain.expenditure.v1.GetPurchaseOrderItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.PurchaseOrder purchase_order = 1;
     */
    purchaseOrder?: PurchaseOrder;
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
 * Describes the message domain.expenditure.v1.GetPurchaseOrderItemPageDataResponse.
 * Use `create(GetPurchaseOrderItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPurchaseOrderItemPageDataResponseSchema: GenMessage<GetPurchaseOrderItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.PurchaseOrderDomainService
 */
export declare const PurchaseOrderDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.CreatePurchaseOrder
     */
    createPurchaseOrder: {
        methodKind: "unary";
        input: typeof CreatePurchaseOrderRequestSchema;
        output: typeof CreatePurchaseOrderResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.ReadPurchaseOrder
     */
    readPurchaseOrder: {
        methodKind: "unary";
        input: typeof ReadPurchaseOrderRequestSchema;
        output: typeof ReadPurchaseOrderResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.UpdatePurchaseOrder
     */
    updatePurchaseOrder: {
        methodKind: "unary";
        input: typeof UpdatePurchaseOrderRequestSchema;
        output: typeof UpdatePurchaseOrderResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.DeletePurchaseOrder
     */
    deletePurchaseOrder: {
        methodKind: "unary";
        input: typeof DeletePurchaseOrderRequestSchema;
        output: typeof DeletePurchaseOrderResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.ListPurchaseOrders
     */
    listPurchaseOrders: {
        methodKind: "unary";
        input: typeof ListPurchaseOrdersRequestSchema;
        output: typeof ListPurchaseOrdersResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.GetPurchaseOrderListPageData
     */
    getPurchaseOrderListPageData: {
        methodKind: "unary";
        input: typeof GetPurchaseOrderListPageDataRequestSchema;
        output: typeof GetPurchaseOrderListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.PurchaseOrderDomainService.GetPurchaseOrderItemPageData
     */
    getPurchaseOrderItemPageData: {
        methodKind: "unary";
        input: typeof GetPurchaseOrderItemPageDataRequestSchema;
        output: typeof GetPurchaseOrderItemPageDataResponseSchema;
    };
}>;
