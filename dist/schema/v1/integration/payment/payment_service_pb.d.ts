import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { CheckoutSession, PaymentCapability, PaymentProviderType, PaymentStatus, PaymentTransaction, RefundResponse } from "./payment_pb";
import type { ProviderHealthStatus } from "./provider_pb";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/payment/payment_service.proto.
 */
export declare const file_integration_payment_payment_service: GenFile;
/**
 * @generated from message integration.payment.v1.CreateCheckoutSessionRequest
 */
export type CreateCheckoutSessionRequest = Message<"integration.payment.v1.CreateCheckoutSessionRequest"> & {
    /**
     * @generated from field: integration.payment.v1.CheckoutSessionData data = 1;
     */
    data?: CheckoutSessionData;
};
/**
 * Describes the message integration.payment.v1.CreateCheckoutSessionRequest.
 * Use `create(CreateCheckoutSessionRequestSchema)` to create a new message.
 */
export declare const CreateCheckoutSessionRequestSchema: GenMessage<CreateCheckoutSessionRequest>;
/**
 * @generated from message integration.payment.v1.CheckoutSessionData
 */
export type CheckoutSessionData = Message<"integration.payment.v1.CheckoutSessionData"> & {
    /**
     * Provider to use (optional, uses default if not specified)
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Amount in base currency units (e.g., dollars, not cents)
     * Payment providers typically convert to cents internally
     *
     * @generated from field: double amount = 2;
     */
    amount: number;
    /**
     * Currency code (ISO 4217)
     *
     * @generated from field: string currency = 3;
     */
    currency: string;
    /**
     * Payment description
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * Internal payment document ID
     *
     * @generated from field: string payment_id = 5;
     */
    paymentId: string;
    /**
     * Subscription ID (for recurring payments)
     *
     * @generated from field: string subscription_id = 6;
     */
    subscriptionId: string;
    /**
     * Client ID
     *
     * @generated from field: string client_id = 7;
     */
    clientId: string;
    /**
     * Order reference
     *
     * @generated from field: string order_ref = 8;
     */
    orderRef: string;
    /**
     * Custom success URL (overrides provider default)
     *
     * @generated from field: string success_url = 9;
     */
    successUrl: string;
    /**
     * Custom failure URL
     *
     * @generated from field: string failure_url = 10;
     */
    failureUrl: string;
    /**
     * Custom cancel URL
     *
     * @generated from field: string cancel_url = 11;
     */
    cancelUrl: string;
    /**
     * Session metadata
     *
     * @generated from field: map<string, string> metadata = 12;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Session expiry duration in minutes
     *
     * @generated from field: int32 expires_in_minutes = 13;
     */
    expiresInMinutes: number;
    /**
     * Customer information
     *
     * @generated from field: integration.payment.v1.CustomerInfo customer = 14;
     */
    customer?: CustomerInfo;
};
/**
 * Describes the message integration.payment.v1.CheckoutSessionData.
 * Use `create(CheckoutSessionDataSchema)` to create a new message.
 */
export declare const CheckoutSessionDataSchema: GenMessage<CheckoutSessionData>;
/**
 * @generated from message integration.payment.v1.CustomerInfo
 */
export type CustomerInfo = Message<"integration.payment.v1.CustomerInfo"> & {
    /**
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string phone = 3;
     */
    phone: string;
};
/**
 * Describes the message integration.payment.v1.CustomerInfo.
 * Use `create(CustomerInfoSchema)` to create a new message.
 */
export declare const CustomerInfoSchema: GenMessage<CustomerInfo>;
/**
 * @generated from message integration.payment.v1.CreateCheckoutSessionResponse
 */
export type CreateCheckoutSessionResponse = Message<"integration.payment.v1.CreateCheckoutSessionResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.CheckoutSession data = 2;
     */
    data: CheckoutSession[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.CreateCheckoutSessionResponse.
 * Use `create(CreateCheckoutSessionResponseSchema)` to create a new message.
 */
export declare const CreateCheckoutSessionResponseSchema: GenMessage<CreateCheckoutSessionResponse>;
/**
 * @generated from message integration.payment.v1.ProcessWebhookRequest
 */
export type ProcessWebhookRequest = Message<"integration.payment.v1.ProcessWebhookRequest"> & {
    /**
     * @generated from field: integration.payment.v1.WebhookData data = 1;
     */
    data?: WebhookData;
};
/**
 * Describes the message integration.payment.v1.ProcessWebhookRequest.
 * Use `create(ProcessWebhookRequestSchema)` to create a new message.
 */
export declare const ProcessWebhookRequestSchema: GenMessage<ProcessWebhookRequest>;
/**
 * @generated from message integration.payment.v1.WebhookData
 */
export type WebhookData = Message<"integration.payment.v1.WebhookData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Raw webhook payload
     *
     * @generated from field: bytes payload = 2;
     */
    payload: Uint8Array;
    /**
     * Webhook headers
     *
     * @generated from field: map<string, string> headers = 3;
     */
    headers: {
        [key: string]: string;
    };
    /**
     * Content type
     *
     * @generated from field: string content_type = 4;
     */
    contentType: string;
    /**
     * Signature for verification
     *
     * @generated from field: string signature = 5;
     */
    signature: string;
    /**
     * URL query parameters (e.g., ?status=success&ref=123)
     *
     * @generated from field: map<string, string> query = 6;
     */
    query: {
        [key: string]: string;
    };
    /**
     * URL path parameters (e.g., from /webhooks/:provider/:action)
     *
     * @generated from field: map<string, string> params = 7;
     */
    params: {
        [key: string]: string;
    };
    /**
     * Request method (POST, GET, etc.)
     *
     * @generated from field: string method = 8;
     */
    method: string;
    /**
     * Full request URL
     *
     * @generated from field: string url = 9;
     */
    url: string;
};
/**
 * Describes the message integration.payment.v1.WebhookData.
 * Use `create(WebhookDataSchema)` to create a new message.
 */
export declare const WebhookDataSchema: GenMessage<WebhookData>;
/**
 * @generated from message integration.payment.v1.ProcessWebhookResponse
 */
export type ProcessWebhookResponse = Message<"integration.payment.v1.ProcessWebhookResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.WebhookResult data = 2;
     */
    data: WebhookResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.ProcessWebhookResponse.
 * Use `create(ProcessWebhookResponseSchema)` to create a new message.
 */
export declare const ProcessWebhookResponseSchema: GenMessage<ProcessWebhookResponse>;
/**
 * @generated from message integration.payment.v1.WebhookResult
 */
export type WebhookResult = Message<"integration.payment.v1.WebhookResult"> & {
    /**
     * Processed transaction
     *
     * @generated from field: integration.payment.v1.PaymentTransaction transaction = 1;
     */
    transaction?: PaymentTransaction;
    /**
     * Payment status after processing
     *
     * @generated from field: integration.payment.v1.PaymentStatus status = 2;
     */
    status: PaymentStatus;
    /**
     * Action taken (none, success, failure, etc.)
     *
     * @generated from field: string action = 3;
     */
    action: string;
    /**
     * Internal payment ID that was updated
     *
     * @generated from field: string payment_id = 4;
     */
    paymentId: string;
};
/**
 * Describes the message integration.payment.v1.WebhookResult.
 * Use `create(WebhookResultSchema)` to create a new message.
 */
export declare const WebhookResultSchema: GenMessage<WebhookResult>;
/**
 * @generated from message integration.payment.v1.LogWebhookRequest
 */
export type LogWebhookRequest = Message<"integration.payment.v1.LogWebhookRequest"> & {
    /**
     * @generated from field: integration.payment.v1.LogWebhookData data = 1;
     */
    data?: LogWebhookData;
};
/**
 * Describes the message integration.payment.v1.LogWebhookRequest.
 * Use `create(LogWebhookRequestSchema)` to create a new message.
 */
export declare const LogWebhookRequestSchema: GenMessage<LogWebhookRequest>;
/**
 * @generated from message integration.payment.v1.LogWebhookData
 */
export type LogWebhookData = Message<"integration.payment.v1.LogWebhookData"> & {
    /**
     * Execution ID for tracing (optional, auto-generated if not provided)
     *
     * @generated from field: string execution_id = 1;
     */
    executionId: string;
    /**
     * Payment ID from the parsed webhook
     *
     * @generated from field: string payment_id = 2;
     */
    paymentId: string;
    /**
     * Provider ID (e.g., asiapay, maya, paypal)
     *
     * @generated from field: string provider_id = 3;
     */
    providerId: string;
    /**
     * Provider's reference ID
     *
     * @generated from field: string provider_ref = 4;
     */
    providerRef: string;
    /**
     * Provider's payment reference
     *
     * @generated from field: string provider_payment_ref = 5;
     */
    providerPaymentRef: string;
    /**
     * Payment status string (success, failed, cancelled, pending)
     *
     * @generated from field: string payment_status = 6;
     */
    paymentStatus: string;
    /**
     * Amount in cents
     *
     * @generated from field: int64 amount = 7;
     */
    amount: bigint;
    /**
     * Currency code (e.g., PHP, USD)
     *
     * @generated from field: string currency = 8;
     */
    currency: string;
    /**
     * Payment method used (e.g., VISA, MASTERCARD)
     *
     * @generated from field: string payment_method = 9;
     */
    paymentMethod: string;
    /**
     * Provider response code
     *
     * @generated from field: string response_code = 10;
     */
    responseCode: string;
    /**
     * Order reference
     *
     * @generated from field: string order_ref = 11;
     */
    orderRef: string;
    /**
     * Raw data from provider (for debugging/audit)
     *
     * @generated from field: map<string, string> raw_data = 12;
     */
    rawData: {
        [key: string]: string;
    };
    /**
     * Content type of original webhook request
     *
     * @generated from field: string content_type = 13;
     */
    contentType: string;
    /**
     * Action taken (success, failure, etc.)
     *
     * @generated from field: string action = 14;
     */
    action: string;
};
/**
 * Describes the message integration.payment.v1.LogWebhookData.
 * Use `create(LogWebhookDataSchema)` to create a new message.
 */
export declare const LogWebhookDataSchema: GenMessage<LogWebhookData>;
/**
 * @generated from message integration.payment.v1.LogWebhookResponse
 */
export type LogWebhookResponse = Message<"integration.payment.v1.LogWebhookResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: string id = 2;
     */
    id: string;
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.LogWebhookResponse.
 * Use `create(LogWebhookResponseSchema)` to create a new message.
 */
export declare const LogWebhookResponseSchema: GenMessage<LogWebhookResponse>;
/**
 * @generated from message integration.payment.v1.GetPaymentStatusRequest
 */
export type GetPaymentStatusRequest = Message<"integration.payment.v1.GetPaymentStatusRequest"> & {
    /**
     * @generated from field: integration.payment.v1.PaymentStatusLookup data = 1;
     */
    data?: PaymentStatusLookup;
};
/**
 * Describes the message integration.payment.v1.GetPaymentStatusRequest.
 * Use `create(GetPaymentStatusRequestSchema)` to create a new message.
 */
export declare const GetPaymentStatusRequestSchema: GenMessage<GetPaymentStatusRequest>;
/**
 * @generated from message integration.payment.v1.PaymentStatusLookup
 */
export type PaymentStatusLookup = Message<"integration.payment.v1.PaymentStatusLookup"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Either payment_id or provider_ref required
     *
     * @generated from field: string payment_id = 2;
     */
    paymentId: string;
    /**
     * @generated from field: string provider_ref = 3;
     */
    providerRef: string;
};
/**
 * Describes the message integration.payment.v1.PaymentStatusLookup.
 * Use `create(PaymentStatusLookupSchema)` to create a new message.
 */
export declare const PaymentStatusLookupSchema: GenMessage<PaymentStatusLookup>;
/**
 * @generated from message integration.payment.v1.GetPaymentStatusResponse
 */
export type GetPaymentStatusResponse = Message<"integration.payment.v1.GetPaymentStatusResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.PaymentStatusData data = 2;
     */
    data: PaymentStatusData[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.GetPaymentStatusResponse.
 * Use `create(GetPaymentStatusResponseSchema)` to create a new message.
 */
export declare const GetPaymentStatusResponseSchema: GenMessage<GetPaymentStatusResponse>;
/**
 * @generated from message integration.payment.v1.PaymentStatusData
 */
export type PaymentStatusData = Message<"integration.payment.v1.PaymentStatusData"> & {
    /**
     * @generated from field: integration.payment.v1.PaymentStatus status = 1;
     */
    status: PaymentStatus;
    /**
     * @generated from field: integration.payment.v1.PaymentTransaction transaction = 2;
     */
    transaction?: PaymentTransaction;
};
/**
 * Describes the message integration.payment.v1.PaymentStatusData.
 * Use `create(PaymentStatusDataSchema)` to create a new message.
 */
export declare const PaymentStatusDataSchema: GenMessage<PaymentStatusData>;
/**
 * @generated from message integration.payment.v1.GetTransactionRequest
 */
export type GetTransactionRequest = Message<"integration.payment.v1.GetTransactionRequest"> & {
    /**
     * @generated from field: integration.payment.v1.TransactionLookup data = 1;
     */
    data?: TransactionLookup;
};
/**
 * Describes the message integration.payment.v1.GetTransactionRequest.
 * Use `create(GetTransactionRequestSchema)` to create a new message.
 */
export declare const GetTransactionRequestSchema: GenMessage<GetTransactionRequest>;
/**
 * @generated from message integration.payment.v1.TransactionLookup
 */
export type TransactionLookup = Message<"integration.payment.v1.TransactionLookup"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string transaction_id = 2;
     */
    transactionId: string;
};
/**
 * Describes the message integration.payment.v1.TransactionLookup.
 * Use `create(TransactionLookupSchema)` to create a new message.
 */
export declare const TransactionLookupSchema: GenMessage<TransactionLookup>;
/**
 * @generated from message integration.payment.v1.GetTransactionResponse
 */
export type GetTransactionResponse = Message<"integration.payment.v1.GetTransactionResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.PaymentTransaction data = 2;
     */
    data: PaymentTransaction[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.GetTransactionResponse.
 * Use `create(GetTransactionResponseSchema)` to create a new message.
 */
export declare const GetTransactionResponseSchema: GenMessage<GetTransactionResponse>;
/**
 * @generated from message integration.payment.v1.ListTransactionsRequest
 */
export type ListTransactionsRequest = Message<"integration.payment.v1.ListTransactionsRequest"> & {
    /**
     * @generated from field: integration.payment.v1.TransactionListFilter data = 1;
     */
    data?: TransactionListFilter;
};
/**
 * Describes the message integration.payment.v1.ListTransactionsRequest.
 * Use `create(ListTransactionsRequestSchema)` to create a new message.
 */
export declare const ListTransactionsRequestSchema: GenMessage<ListTransactionsRequest>;
/**
 * @generated from message integration.payment.v1.TransactionListFilter
 */
export type TransactionListFilter = Message<"integration.payment.v1.TransactionListFilter"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string payment_id = 2;
     */
    paymentId: string;
    /**
     * @generated from field: string order_ref = 3;
     */
    orderRef: string;
    /**
     * @generated from field: google.protobuf.Timestamp from_date = 4;
     */
    fromDate?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp to_date = 5;
     */
    toDate?: Timestamp;
    /**
     * @generated from field: int32 limit = 6;
     */
    limit: number;
    /**
     * @generated from field: string page_token = 7;
     */
    pageToken: string;
};
/**
 * Describes the message integration.payment.v1.TransactionListFilter.
 * Use `create(TransactionListFilterSchema)` to create a new message.
 */
export declare const TransactionListFilterSchema: GenMessage<TransactionListFilter>;
/**
 * @generated from message integration.payment.v1.ListTransactionsResponse
 */
export type ListTransactionsResponse = Message<"integration.payment.v1.ListTransactionsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.PaymentTransaction data = 2;
     */
    data: PaymentTransaction[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: string next_page_token = 4;
     */
    nextPageToken: string;
    /**
     * @generated from field: int32 total_count = 5;
     */
    totalCount: number;
};
/**
 * Describes the message integration.payment.v1.ListTransactionsResponse.
 * Use `create(ListTransactionsResponseSchema)` to create a new message.
 */
export declare const ListTransactionsResponseSchema: GenMessage<ListTransactionsResponse>;
/**
 * @generated from message integration.payment.v1.RefundPaymentRequest
 */
export type RefundPaymentRequest = Message<"integration.payment.v1.RefundPaymentRequest"> & {
    /**
     * @generated from field: integration.payment.v1.RefundData data = 1;
     */
    data?: RefundData;
};
/**
 * Describes the message integration.payment.v1.RefundPaymentRequest.
 * Use `create(RefundPaymentRequestSchema)` to create a new message.
 */
export declare const RefundPaymentRequestSchema: GenMessage<RefundPaymentRequest>;
/**
 * @generated from message integration.payment.v1.RefundData
 */
export type RefundData = Message<"integration.payment.v1.RefundData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string transaction_id = 2;
     */
    transactionId: string;
    /**
     * @generated from field: string provider_ref = 3;
     */
    providerRef: string;
    /**
     * 0 for full refund
     *
     * @generated from field: int64 amount = 4;
     */
    amount: bigint;
    /**
     * @generated from field: string reason = 5;
     */
    reason: string;
    /**
     * @generated from field: map<string, string> metadata = 6;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.payment.v1.RefundData.
 * Use `create(RefundDataSchema)` to create a new message.
 */
export declare const RefundDataSchema: GenMessage<RefundData>;
/**
 * @generated from message integration.payment.v1.RefundPaymentResponse
 */
export type RefundPaymentResponse = Message<"integration.payment.v1.RefundPaymentResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.RefundResponse data = 2;
     */
    data: RefundResponse[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.RefundPaymentResponse.
 * Use `create(RefundPaymentResponseSchema)` to create a new message.
 */
export declare const RefundPaymentResponseSchema: GenMessage<RefundPaymentResponse>;
/**
 * @generated from message integration.payment.v1.VoidPaymentRequest
 */
export type VoidPaymentRequest = Message<"integration.payment.v1.VoidPaymentRequest"> & {
    /**
     * @generated from field: integration.payment.v1.VoidData data = 1;
     */
    data?: VoidData;
};
/**
 * Describes the message integration.payment.v1.VoidPaymentRequest.
 * Use `create(VoidPaymentRequestSchema)` to create a new message.
 */
export declare const VoidPaymentRequestSchema: GenMessage<VoidPaymentRequest>;
/**
 * @generated from message integration.payment.v1.VoidData
 */
export type VoidData = Message<"integration.payment.v1.VoidData"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string transaction_id = 2;
     */
    transactionId: string;
    /**
     * @generated from field: string provider_ref = 3;
     */
    providerRef: string;
    /**
     * @generated from field: string reason = 4;
     */
    reason: string;
};
/**
 * Describes the message integration.payment.v1.VoidData.
 * Use `create(VoidDataSchema)` to create a new message.
 */
export declare const VoidDataSchema: GenMessage<VoidData>;
/**
 * @generated from message integration.payment.v1.VoidPaymentResponse
 */
export type VoidPaymentResponse = Message<"integration.payment.v1.VoidPaymentResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.PaymentStatus data = 2;
     */
    data: PaymentStatus[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.VoidPaymentResponse.
 * Use `create(VoidPaymentResponseSchema)` to create a new message.
 */
export declare const VoidPaymentResponseSchema: GenMessage<VoidPaymentResponse>;
/**
 * @generated from message integration.payment.v1.CheckHealthRequest
 */
export type CheckHealthRequest = Message<"integration.payment.v1.CheckHealthRequest"> & {
    /**
     * @generated from field: integration.payment.v1.HealthCheckData data = 1;
     */
    data?: HealthCheckData;
};
/**
 * Describes the message integration.payment.v1.CheckHealthRequest.
 * Use `create(CheckHealthRequestSchema)` to create a new message.
 */
export declare const CheckHealthRequestSchema: GenMessage<CheckHealthRequest>;
/**
 * @generated from message integration.payment.v1.HealthCheckData
 */
export type HealthCheckData = Message<"integration.payment.v1.HealthCheckData"> & {
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
 * Describes the message integration.payment.v1.HealthCheckData.
 * Use `create(HealthCheckDataSchema)` to create a new message.
 */
export declare const HealthCheckDataSchema: GenMessage<HealthCheckData>;
/**
 * @generated from message integration.payment.v1.CheckHealthResponse
 */
export type CheckHealthResponse = Message<"integration.payment.v1.CheckHealthResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: integration.payment.v1.HealthStatus data = 2;
     */
    data?: HealthStatus;
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.CheckHealthResponse.
 * Use `create(CheckHealthResponseSchema)` to create a new message.
 */
export declare const CheckHealthResponseSchema: GenMessage<CheckHealthResponse>;
/**
 * @generated from message integration.payment.v1.HealthStatus
 */
export type HealthStatus = Message<"integration.payment.v1.HealthStatus"> & {
    /**
     * @generated from field: bool is_healthy = 1;
     */
    isHealthy: boolean;
    /**
     * @generated from field: integration.payment.v1.ProviderHealthStatus health_status = 2;
     */
    healthStatus?: ProviderHealthStatus;
};
/**
 * Describes the message integration.payment.v1.HealthStatus.
 * Use `create(HealthStatusSchema)` to create a new message.
 */
export declare const HealthStatusSchema: GenMessage<HealthStatus>;
/**
 * @generated from message integration.payment.v1.GetCapabilitiesRequest
 */
export type GetCapabilitiesRequest = Message<"integration.payment.v1.GetCapabilitiesRequest"> & {
    /**
     * @generated from field: integration.payment.v1.ProviderLookup data = 1;
     */
    data?: ProviderLookup;
};
/**
 * Describes the message integration.payment.v1.GetCapabilitiesRequest.
 * Use `create(GetCapabilitiesRequestSchema)` to create a new message.
 */
export declare const GetCapabilitiesRequestSchema: GenMessage<GetCapabilitiesRequest>;
/**
 * @generated from message integration.payment.v1.ProviderLookup
 */
export type ProviderLookup = Message<"integration.payment.v1.ProviderLookup"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
};
/**
 * Describes the message integration.payment.v1.ProviderLookup.
 * Use `create(ProviderLookupSchema)` to create a new message.
 */
export declare const ProviderLookupSchema: GenMessage<ProviderLookup>;
/**
 * @generated from message integration.payment.v1.GetCapabilitiesResponse
 */
export type GetCapabilitiesResponse = Message<"integration.payment.v1.GetCapabilitiesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.payment.v1.ProviderCapabilities data = 2;
     */
    data: ProviderCapabilities[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.payment.v1.GetCapabilitiesResponse.
 * Use `create(GetCapabilitiesResponseSchema)` to create a new message.
 */
export declare const GetCapabilitiesResponseSchema: GenMessage<GetCapabilitiesResponse>;
/**
 * @generated from message integration.payment.v1.ProviderCapabilities
 */
export type ProviderCapabilities = Message<"integration.payment.v1.ProviderCapabilities"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: integration.payment.v1.PaymentProviderType provider_type = 2;
     */
    providerType: PaymentProviderType;
    /**
     * @generated from field: repeated integration.payment.v1.PaymentCapability capabilities = 3;
     */
    capabilities: PaymentCapability[];
    /**
     * @generated from field: repeated string supported_currencies = 4;
     */
    supportedCurrencies: string[];
    /**
     * @generated from field: map<string, string> limits = 5;
     */
    limits: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.payment.v1.ProviderCapabilities.
 * Use `create(ProviderCapabilitiesSchema)` to create a new message.
 */
export declare const ProviderCapabilitiesSchema: GenMessage<ProviderCapabilities>;
/**
 * PaymentIntegrationService provides unified payment operations
 *
 * @generated from service integration.payment.v1.PaymentIntegrationService
 */
export declare const PaymentIntegrationService: GenService<{
    /**
     * Create a checkout session
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.CreateCheckoutSession
     */
    createCheckoutSession: {
        methodKind: "unary";
        input: typeof CreateCheckoutSessionRequestSchema;
        output: typeof CreateCheckoutSessionResponseSchema;
    };
    /**
     * Process incoming webhook (parse raw payload into structured data)
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.ProcessWebhook
     */
    processWebhook: {
        methodKind: "unary";
        input: typeof ProcessWebhookRequestSchema;
        output: typeof ProcessWebhookResponseSchema;
    };
    /**
     * Log webhook data to integration_payment collection
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.LogWebhook
     */
    logWebhook: {
        methodKind: "unary";
        input: typeof LogWebhookRequestSchema;
        output: typeof LogWebhookResponseSchema;
    };
    /**
     * Get payment status
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.GetPaymentStatus
     */
    getPaymentStatus: {
        methodKind: "unary";
        input: typeof GetPaymentStatusRequestSchema;
        output: typeof GetPaymentStatusResponseSchema;
    };
    /**
     * Get transaction details
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.GetTransaction
     */
    getTransaction: {
        methodKind: "unary";
        input: typeof GetTransactionRequestSchema;
        output: typeof GetTransactionResponseSchema;
    };
    /**
     * List transactions
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.ListTransactions
     */
    listTransactions: {
        methodKind: "unary";
        input: typeof ListTransactionsRequestSchema;
        output: typeof ListTransactionsResponseSchema;
    };
    /**
     * Refund a payment
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.RefundPayment
     */
    refundPayment: {
        methodKind: "unary";
        input: typeof RefundPaymentRequestSchema;
        output: typeof RefundPaymentResponseSchema;
    };
    /**
     * Void/Cancel a payment
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.VoidPayment
     */
    voidPayment: {
        methodKind: "unary";
        input: typeof VoidPaymentRequestSchema;
        output: typeof VoidPaymentResponseSchema;
    };
    /**
     * Check provider health
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.CheckHealth
     */
    checkHealth: {
        methodKind: "unary";
        input: typeof CheckHealthRequestSchema;
        output: typeof CheckHealthResponseSchema;
    };
    /**
     * Get provider capabilities
     *
     * @generated from rpc integration.payment.v1.PaymentIntegrationService.GetCapabilities
     */
    getCapabilities: {
        methodKind: "unary";
        input: typeof GetCapabilitiesRequestSchema;
        output: typeof GetCapabilitiesResponseSchema;
    };
}>;
