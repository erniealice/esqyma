import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { DeliveryLocation, DeliveryOrder, DeliveryQuote, DeliveryStatus, DriverInfo, FulfillmentCapability, FulfillmentProviderType, VehicleType } from "./fulfillment_pb";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/fulfillment/fulfillment_service.proto.
 */
export declare const file_integration_fulfillment_fulfillment_service: GenFile;
/**
 * @generated from message integration.fulfillment.v1.GetQuoteRequest
 */
export type GetQuoteRequest = Message<"integration.fulfillment.v1.GetQuoteRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.QuoteRequestData data = 1;
     */
    data?: QuoteRequestData;
};
/**
 * Describes the message integration.fulfillment.v1.GetQuoteRequest.
 * Use `create(GetQuoteRequestSchema)` to create a new message.
 */
export declare const GetQuoteRequestSchema: GenMessage<GetQuoteRequest>;
/**
 * @generated from message integration.fulfillment.v1.QuoteRequestData
 */
export type QuoteRequestData = Message<"integration.fulfillment.v1.QuoteRequestData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: integration.fulfillment.v1.VehicleType vehicle_type = 2;
     */
    vehicleType: VehicleType;
    /**
     * @generated from field: integration.fulfillment.v1.DeliveryLocation pickup = 3;
     */
    pickup?: DeliveryLocation;
    /**
     * @generated from field: repeated integration.fulfillment.v1.DeliveryLocation dropoffs = 4;
     */
    dropoffs: DeliveryLocation[];
    /**
     * ISO 8601 (optional — omit for immediate)
     *
     * @generated from field: string scheduled_at = 5;
     */
    scheduledAt: string;
};
/**
 * Describes the message integration.fulfillment.v1.QuoteRequestData.
 * Use `create(QuoteRequestDataSchema)` to create a new message.
 */
export declare const QuoteRequestDataSchema: GenMessage<QuoteRequestData>;
/**
 * @generated from message integration.fulfillment.v1.GetQuoteResponse
 */
export type GetQuoteResponse = Message<"integration.fulfillment.v1.GetQuoteResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.DeliveryQuote data = 2;
     */
    data: DeliveryQuote[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.GetQuoteResponse.
 * Use `create(GetQuoteResponseSchema)` to create a new message.
 */
export declare const GetQuoteResponseSchema: GenMessage<GetQuoteResponse>;
/**
 * @generated from message integration.fulfillment.v1.PlaceOrderRequest
 */
export type PlaceOrderRequest = Message<"integration.fulfillment.v1.PlaceOrderRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.PlaceOrderData data = 1;
     */
    data?: PlaceOrderData;
};
/**
 * Describes the message integration.fulfillment.v1.PlaceOrderRequest.
 * Use `create(PlaceOrderRequestSchema)` to create a new message.
 */
export declare const PlaceOrderRequestSchema: GenMessage<PlaceOrderRequest>;
/**
 * @generated from message integration.fulfillment.v1.PlaceOrderData
 */
export type PlaceOrderData = Message<"integration.fulfillment.v1.PlaceOrderData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string quote_id = 2;
     */
    quoteId: string;
    /**
     * @generated from field: integration.fulfillment.v1.VehicleType vehicle_type = 3;
     */
    vehicleType: VehicleType;
    /**
     * @generated from field: integration.fulfillment.v1.DeliveryLocation pickup = 4;
     */
    pickup?: DeliveryLocation;
    /**
     * @generated from field: repeated integration.fulfillment.v1.DeliveryLocation dropoffs = 5;
     */
    dropoffs: DeliveryLocation[];
    /**
     * @generated from field: string remarks = 6;
     */
    remarks: string;
    /**
     * FK to our domain fulfillment
     *
     * @generated from field: string fulfillment_id = 7;
     */
    fulfillmentId: string;
    /**
     * @generated from field: string revenue_id = 8;
     */
    revenueId: string;
    /**
     * @generated from field: map<string, string> metadata = 9;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.fulfillment.v1.PlaceOrderData.
 * Use `create(PlaceOrderDataSchema)` to create a new message.
 */
export declare const PlaceOrderDataSchema: GenMessage<PlaceOrderData>;
/**
 * @generated from message integration.fulfillment.v1.PlaceOrderResponse
 */
export type PlaceOrderResponse = Message<"integration.fulfillment.v1.PlaceOrderResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.DeliveryOrder data = 2;
     */
    data: DeliveryOrder[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.PlaceOrderResponse.
 * Use `create(PlaceOrderResponseSchema)` to create a new message.
 */
export declare const PlaceOrderResponseSchema: GenMessage<PlaceOrderResponse>;
/**
 * @generated from message integration.fulfillment.v1.CancelOrderRequest
 */
export type CancelOrderRequest = Message<"integration.fulfillment.v1.CancelOrderRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.CancelOrderData data = 1;
     */
    data?: CancelOrderData;
};
/**
 * Describes the message integration.fulfillment.v1.CancelOrderRequest.
 * Use `create(CancelOrderRequestSchema)` to create a new message.
 */
export declare const CancelOrderRequestSchema: GenMessage<CancelOrderRequest>;
/**
 * @generated from message integration.fulfillment.v1.CancelOrderData
 */
export type CancelOrderData = Message<"integration.fulfillment.v1.CancelOrderData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string order_id = 2;
     */
    orderId: string;
    /**
     * @generated from field: string provider_order_id = 3;
     */
    providerOrderId: string;
    /**
     * @generated from field: string reason = 4;
     */
    reason: string;
};
/**
 * Describes the message integration.fulfillment.v1.CancelOrderData.
 * Use `create(CancelOrderDataSchema)` to create a new message.
 */
export declare const CancelOrderDataSchema: GenMessage<CancelOrderData>;
/**
 * @generated from message integration.fulfillment.v1.CancelOrderResponse
 */
export type CancelOrderResponse = Message<"integration.fulfillment.v1.CancelOrderResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.CancelOrderResponse.
 * Use `create(CancelOrderResponseSchema)` to create a new message.
 */
export declare const CancelOrderResponseSchema: GenMessage<CancelOrderResponse>;
/**
 * @generated from message integration.fulfillment.v1.GetOrderRequest
 */
export type GetOrderRequest = Message<"integration.fulfillment.v1.GetOrderRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.OrderLookup data = 1;
     */
    data?: OrderLookup;
};
/**
 * Describes the message integration.fulfillment.v1.GetOrderRequest.
 * Use `create(GetOrderRequestSchema)` to create a new message.
 */
export declare const GetOrderRequestSchema: GenMessage<GetOrderRequest>;
/**
 * @generated from message integration.fulfillment.v1.OrderLookup
 */
export type OrderLookup = Message<"integration.fulfillment.v1.OrderLookup"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string order_id = 2;
     */
    orderId: string;
    /**
     * @generated from field: string provider_order_id = 3;
     */
    providerOrderId: string;
};
/**
 * Describes the message integration.fulfillment.v1.OrderLookup.
 * Use `create(OrderLookupSchema)` to create a new message.
 */
export declare const OrderLookupSchema: GenMessage<OrderLookup>;
/**
 * @generated from message integration.fulfillment.v1.GetOrderResponse
 */
export type GetOrderResponse = Message<"integration.fulfillment.v1.GetOrderResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.DeliveryOrder data = 2;
     */
    data: DeliveryOrder[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.GetOrderResponse.
 * Use `create(GetOrderResponseSchema)` to create a new message.
 */
export declare const GetOrderResponseSchema: GenMessage<GetOrderResponse>;
/**
 * @generated from message integration.fulfillment.v1.TrackDeliveryRequest
 */
export type TrackDeliveryRequest = Message<"integration.fulfillment.v1.TrackDeliveryRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.TrackingLookup data = 1;
     */
    data?: TrackingLookup;
};
/**
 * Describes the message integration.fulfillment.v1.TrackDeliveryRequest.
 * Use `create(TrackDeliveryRequestSchema)` to create a new message.
 */
export declare const TrackDeliveryRequestSchema: GenMessage<TrackDeliveryRequest>;
/**
 * @generated from message integration.fulfillment.v1.TrackingLookup
 */
export type TrackingLookup = Message<"integration.fulfillment.v1.TrackingLookup"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string order_id = 2;
     */
    orderId: string;
    /**
     * @generated from field: string provider_order_id = 3;
     */
    providerOrderId: string;
};
/**
 * Describes the message integration.fulfillment.v1.TrackingLookup.
 * Use `create(TrackingLookupSchema)` to create a new message.
 */
export declare const TrackingLookupSchema: GenMessage<TrackingLookup>;
/**
 * @generated from message integration.fulfillment.v1.TrackDeliveryResponse
 */
export type TrackDeliveryResponse = Message<"integration.fulfillment.v1.TrackDeliveryResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.TrackingUpdate data = 2;
     */
    data: TrackingUpdate[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.TrackDeliveryResponse.
 * Use `create(TrackDeliveryResponseSchema)` to create a new message.
 */
export declare const TrackDeliveryResponseSchema: GenMessage<TrackDeliveryResponse>;
/**
 * @generated from message integration.fulfillment.v1.TrackingUpdate
 */
export type TrackingUpdate = Message<"integration.fulfillment.v1.TrackingUpdate"> & {
    /**
     * @generated from field: integration.fulfillment.v1.DeliveryStatus status = 1;
     */
    status: DeliveryStatus;
    /**
     * @generated from field: integration.fulfillment.v1.DriverInfo driver = 2;
     */
    driver?: DriverInfo;
    /**
     * @generated from field: string message = 3;
     */
    message: string;
    /**
     * @generated from field: string timestamp = 4;
     */
    timestamp: string;
};
/**
 * Describes the message integration.fulfillment.v1.TrackingUpdate.
 * Use `create(TrackingUpdateSchema)` to create a new message.
 */
export declare const TrackingUpdateSchema: GenMessage<TrackingUpdate>;
/**
 * @generated from message integration.fulfillment.v1.ProcessFulfillmentWebhookRequest
 */
export type ProcessFulfillmentWebhookRequest = Message<"integration.fulfillment.v1.ProcessFulfillmentWebhookRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.FulfillmentWebhookData data = 1;
     */
    data?: FulfillmentWebhookData;
};
/**
 * Describes the message integration.fulfillment.v1.ProcessFulfillmentWebhookRequest.
 * Use `create(ProcessFulfillmentWebhookRequestSchema)` to create a new message.
 */
export declare const ProcessFulfillmentWebhookRequestSchema: GenMessage<ProcessFulfillmentWebhookRequest>;
/**
 * @generated from message integration.fulfillment.v1.FulfillmentWebhookData
 */
export type FulfillmentWebhookData = Message<"integration.fulfillment.v1.FulfillmentWebhookData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: bytes payload = 2;
     */
    payload: Uint8Array;
    /**
     * @generated from field: map<string, string> headers = 3;
     */
    headers: {
        [key: string]: string;
    };
    /**
     * @generated from field: string content_type = 4;
     */
    contentType: string;
    /**
     * @generated from field: string signature = 5;
     */
    signature: string;
};
/**
 * Describes the message integration.fulfillment.v1.FulfillmentWebhookData.
 * Use `create(FulfillmentWebhookDataSchema)` to create a new message.
 */
export declare const FulfillmentWebhookDataSchema: GenMessage<FulfillmentWebhookData>;
/**
 * @generated from message integration.fulfillment.v1.ProcessFulfillmentWebhookResponse
 */
export type ProcessFulfillmentWebhookResponse = Message<"integration.fulfillment.v1.ProcessFulfillmentWebhookResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.FulfillmentWebhookResult data = 2;
     */
    data: FulfillmentWebhookResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.ProcessFulfillmentWebhookResponse.
 * Use `create(ProcessFulfillmentWebhookResponseSchema)` to create a new message.
 */
export declare const ProcessFulfillmentWebhookResponseSchema: GenMessage<ProcessFulfillmentWebhookResponse>;
/**
 * @generated from message integration.fulfillment.v1.FulfillmentWebhookResult
 */
export type FulfillmentWebhookResult = Message<"integration.fulfillment.v1.FulfillmentWebhookResult"> & {
    /**
     * @generated from field: string event_type = 1;
     */
    eventType: string;
    /**
     * @generated from field: integration.fulfillment.v1.DeliveryOrder order = 2;
     */
    order?: DeliveryOrder;
    /**
     * @generated from field: string action = 3;
     */
    action: string;
    /**
     * @generated from field: integration.fulfillment.v1.DeliveryStatus previous_status = 4;
     */
    previousStatus: DeliveryStatus;
    /**
     * @generated from field: integration.fulfillment.v1.DeliveryStatus new_status = 5;
     */
    newStatus: DeliveryStatus;
};
/**
 * Describes the message integration.fulfillment.v1.FulfillmentWebhookResult.
 * Use `create(FulfillmentWebhookResultSchema)` to create a new message.
 */
export declare const FulfillmentWebhookResultSchema: GenMessage<FulfillmentWebhookResult>;
/**
 * @generated from message integration.fulfillment.v1.CheckFulfillmentHealthRequest
 */
export type CheckFulfillmentHealthRequest = Message<"integration.fulfillment.v1.CheckFulfillmentHealthRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.FulfillmentHealthCheckData data = 1;
     */
    data?: FulfillmentHealthCheckData;
};
/**
 * Describes the message integration.fulfillment.v1.CheckFulfillmentHealthRequest.
 * Use `create(CheckFulfillmentHealthRequestSchema)` to create a new message.
 */
export declare const CheckFulfillmentHealthRequestSchema: GenMessage<CheckFulfillmentHealthRequest>;
/**
 * @generated from message integration.fulfillment.v1.FulfillmentHealthCheckData
 */
export type FulfillmentHealthCheckData = Message<"integration.fulfillment.v1.FulfillmentHealthCheckData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: bool deep_check = 2;
     */
    deepCheck: boolean;
};
/**
 * Describes the message integration.fulfillment.v1.FulfillmentHealthCheckData.
 * Use `create(FulfillmentHealthCheckDataSchema)` to create a new message.
 */
export declare const FulfillmentHealthCheckDataSchema: GenMessage<FulfillmentHealthCheckData>;
/**
 * @generated from message integration.fulfillment.v1.CheckFulfillmentHealthResponse
 */
export type CheckFulfillmentHealthResponse = Message<"integration.fulfillment.v1.CheckFulfillmentHealthResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.FulfillmentHealthStatus data = 2;
     */
    data: FulfillmentHealthStatus[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.CheckFulfillmentHealthResponse.
 * Use `create(CheckFulfillmentHealthResponseSchema)` to create a new message.
 */
export declare const CheckFulfillmentHealthResponseSchema: GenMessage<CheckFulfillmentHealthResponse>;
/**
 * @generated from message integration.fulfillment.v1.FulfillmentHealthStatus
 */
export type FulfillmentHealthStatus = Message<"integration.fulfillment.v1.FulfillmentHealthStatus"> & {
    /**
     * @generated from field: bool is_healthy = 1;
     */
    isHealthy: boolean;
    /**
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * @generated from field: int64 latency_ms = 3;
     */
    latencyMs: bigint;
};
/**
 * Describes the message integration.fulfillment.v1.FulfillmentHealthStatus.
 * Use `create(FulfillmentHealthStatusSchema)` to create a new message.
 */
export declare const FulfillmentHealthStatusSchema: GenMessage<FulfillmentHealthStatus>;
/**
 * @generated from message integration.fulfillment.v1.GetFulfillmentCapabilitiesRequest
 */
export type GetFulfillmentCapabilitiesRequest = Message<"integration.fulfillment.v1.GetFulfillmentCapabilitiesRequest"> & {
    /**
     * @generated from field: integration.fulfillment.v1.FulfillmentProviderLookup data = 1;
     */
    data?: FulfillmentProviderLookup;
};
/**
 * Describes the message integration.fulfillment.v1.GetFulfillmentCapabilitiesRequest.
 * Use `create(GetFulfillmentCapabilitiesRequestSchema)` to create a new message.
 */
export declare const GetFulfillmentCapabilitiesRequestSchema: GenMessage<GetFulfillmentCapabilitiesRequest>;
/**
 * @generated from message integration.fulfillment.v1.FulfillmentProviderLookup
 */
export type FulfillmentProviderLookup = Message<"integration.fulfillment.v1.FulfillmentProviderLookup"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
};
/**
 * Describes the message integration.fulfillment.v1.FulfillmentProviderLookup.
 * Use `create(FulfillmentProviderLookupSchema)` to create a new message.
 */
export declare const FulfillmentProviderLookupSchema: GenMessage<FulfillmentProviderLookup>;
/**
 * @generated from message integration.fulfillment.v1.GetFulfillmentCapabilitiesResponse
 */
export type GetFulfillmentCapabilitiesResponse = Message<"integration.fulfillment.v1.GetFulfillmentCapabilitiesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.fulfillment.v1.FulfillmentProviderCapabilities data = 2;
     */
    data: FulfillmentProviderCapabilities[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.fulfillment.v1.GetFulfillmentCapabilitiesResponse.
 * Use `create(GetFulfillmentCapabilitiesResponseSchema)` to create a new message.
 */
export declare const GetFulfillmentCapabilitiesResponseSchema: GenMessage<GetFulfillmentCapabilitiesResponse>;
/**
 * @generated from message integration.fulfillment.v1.FulfillmentProviderCapabilities
 */
export type FulfillmentProviderCapabilities = Message<"integration.fulfillment.v1.FulfillmentProviderCapabilities"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: integration.fulfillment.v1.FulfillmentProviderType provider_type = 2;
     */
    providerType: FulfillmentProviderType;
    /**
     * @generated from field: repeated integration.fulfillment.v1.FulfillmentCapability capabilities = 3;
     */
    capabilities: FulfillmentCapability[];
    /**
     * @generated from field: repeated integration.fulfillment.v1.VehicleType supported_vehicles = 4;
     */
    supportedVehicles: VehicleType[];
    /**
     * @generated from field: map<string, string> limits = 5;
     */
    limits: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.fulfillment.v1.FulfillmentProviderCapabilities.
 * Use `create(FulfillmentProviderCapabilitiesSchema)` to create a new message.
 */
export declare const FulfillmentProviderCapabilitiesSchema: GenMessage<FulfillmentProviderCapabilities>;
/**
 * FulfillmentIntegrationService provides unified fulfillment provider operations.
 * This service abstracts delivery providers like Lalamove, GrabExpress, etc.
 *
 * @generated from service integration.fulfillment.v1.FulfillmentIntegrationService
 */
export declare const FulfillmentIntegrationService: GenService<{
    /**
     * Get a delivery price quote
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.GetQuote
     */
    getQuote: {
        methodKind: "unary";
        input: typeof GetQuoteRequestSchema;
        output: typeof GetQuoteResponseSchema;
    };
    /**
     * Place a delivery order (from an accepted quote)
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.PlaceOrder
     */
    placeOrder: {
        methodKind: "unary";
        input: typeof PlaceOrderRequestSchema;
        output: typeof PlaceOrderResponseSchema;
    };
    /**
     * Cancel a delivery order
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.CancelOrder
     */
    cancelOrder: {
        methodKind: "unary";
        input: typeof CancelOrderRequestSchema;
        output: typeof CancelOrderResponseSchema;
    };
    /**
     * Get delivery order details and status
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.GetOrder
     */
    getOrder: {
        methodKind: "unary";
        input: typeof GetOrderRequestSchema;
        output: typeof GetOrderResponseSchema;
    };
    /**
     * Track a delivery in real-time
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.TrackDelivery
     */
    trackDelivery: {
        methodKind: "unary";
        input: typeof TrackDeliveryRequestSchema;
        output: typeof TrackDeliveryResponseSchema;
    };
    /**
     * Process incoming webhook from fulfillment provider
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.ProcessWebhook
     */
    processWebhook: {
        methodKind: "unary";
        input: typeof ProcessFulfillmentWebhookRequestSchema;
        output: typeof ProcessFulfillmentWebhookResponseSchema;
    };
    /**
     * Check provider health
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.CheckHealth
     */
    checkHealth: {
        methodKind: "unary";
        input: typeof CheckFulfillmentHealthRequestSchema;
        output: typeof CheckFulfillmentHealthResponseSchema;
    };
    /**
     * Get provider capabilities
     *
     * @generated from rpc integration.fulfillment.v1.FulfillmentIntegrationService.GetCapabilities
     */
    getCapabilities: {
        methodKind: "unary";
        input: typeof GetFulfillmentCapabilitiesRequestSchema;
        output: typeof GetFulfillmentCapabilitiesResponseSchema;
    };
}>;
