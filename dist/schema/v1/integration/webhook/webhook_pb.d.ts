import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/webhook/webhook.proto.
 */
export declare const file_integration_webhook_webhook: GenFile;
/**
 * WebhookRequest represents a generic incoming webhook request
 * This can be used across different integrations (payment, email, etc.)
 *
 * @generated from message integration.webhook.v1.WebhookRequest
 */
export type WebhookRequest = Message<"integration.webhook.v1.WebhookRequest"> & {
    /**
     * Provider identifier (e.g., "asiapay", "paymaya", "stripe")
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Raw request body as bytes (for form-urlencoded, JSON, etc.)
     *
     * @generated from field: bytes payload = 2;
     */
    payload: Uint8Array;
    /**
     * HTTP headers from the request
     *
     * @generated from field: map<string, string> headers = 3;
     */
    headers: {
        [key: string]: string;
    };
    /**
     * URL query parameters
     *
     * @generated from field: map<string, string> query = 4;
     */
    query: {
        [key: string]: string;
    };
    /**
     * URL path parameters (e.g., from route like /webhooks/:provider/:action)
     *
     * @generated from field: map<string, string> params = 5;
     */
    params: {
        [key: string]: string;
    };
    /**
     * Content-Type header value
     *
     * @generated from field: string content_type = 6;
     */
    contentType: string;
    /**
     * Signature for webhook verification (provider-specific)
     *
     * @generated from field: string signature = 7;
     */
    signature: string;
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
    /**
     * Client IP address
     *
     * @generated from field: string client_ip = 10;
     */
    clientIp: string;
    /**
     * Timestamp when the webhook was received
     *
     * @generated from field: google.protobuf.Timestamp received_at = 11;
     */
    receivedAt?: Timestamp;
};
/**
 * Describes the message integration.webhook.v1.WebhookRequest.
 * Use `create(WebhookRequestSchema)` to create a new message.
 */
export declare const WebhookRequestSchema: GenMessage<WebhookRequest>;
/**
 * WebhookResponse represents a generic webhook processing response
 *
 * @generated from message integration.webhook.v1.WebhookResponse
 */
export type WebhookResponse = Message<"integration.webhook.v1.WebhookResponse"> & {
    /**
     * Whether processing was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Action taken (e.g., "payment_success", "payment_failed", "ignored")
     *
     * @generated from field: string action = 2;
     */
    action: string;
    /**
     * Human-readable message
     *
     * @generated from field: string message = 3;
     */
    message: string;
    /**
     * Error message if processing failed
     *
     * @generated from field: string error_message = 4;
     */
    errorMessage: string;
    /**
     * Error code for programmatic handling
     *
     * @generated from field: string error_code = 5;
     */
    errorCode: string;
    /**
     * Provider-specific response data
     *
     * @generated from field: google.protobuf.Struct data = 6;
     */
    data?: JsonObject;
    /**
     * Processing timestamp
     *
     * @generated from field: google.protobuf.Timestamp processed_at = 7;
     */
    processedAt?: Timestamp;
};
/**
 * Describes the message integration.webhook.v1.WebhookResponse.
 * Use `create(WebhookResponseSchema)` to create a new message.
 */
export declare const WebhookResponseSchema: GenMessage<WebhookResponse>;
/**
 * WebhookLog represents a stored webhook log entry
 * Can be stored in collections like integration_payment, integration_email, etc.
 *
 * @generated from message integration.webhook.v1.WebhookLog
 */
export type WebhookLog = Message<"integration.webhook.v1.WebhookLog"> & {
    /**
     * Unique log entry ID
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 2;
     */
    providerId: string;
    /**
     * Webhook type/event (e.g., "payment.success", "invitee.created")
     *
     * @generated from field: string event_type = 3;
     */
    eventType: string;
    /**
     * Original request (stored for audit/replay)
     *
     * @generated from field: integration.webhook.v1.WebhookRequest request = 4;
     */
    request?: WebhookRequest;
    /**
     * Processing response
     *
     * @generated from field: integration.webhook.v1.WebhookResponse response = 5;
     */
    response?: WebhookResponse;
    /**
     * Associated entity IDs for cross-referencing
     *
     * @generated from field: string payment_id = 6;
     */
    paymentId: string;
    /**
     * @generated from field: string subscription_id = 7;
     */
    subscriptionId: string;
    /**
     * @generated from field: string client_id = 8;
     */
    clientId: string;
    /**
     * @generated from field: string order_ref = 9;
     */
    orderRef: string;
    /**
     * Processing metadata
     *
     * @generated from field: string execution_id = 10;
     */
    executionId: string;
    /**
     * @generated from field: int32 retry_count = 11;
     */
    retryCount: number;
    /**
     * pending, processed, failed, retrying
     *
     * @generated from field: string status = 12;
     */
    status: string;
    /**
     * Timestamps
     *
     * @generated from field: google.protobuf.Timestamp created_at = 13;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp updated_at = 14;
     */
    updatedAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp processed_at = 15;
     */
    processedAt?: Timestamp;
    /**
     * Whether this log entry is active
     *
     * @generated from field: bool active = 16;
     */
    active: boolean;
};
/**
 * Describes the message integration.webhook.v1.WebhookLog.
 * Use `create(WebhookLogSchema)` to create a new message.
 */
export declare const WebhookLogSchema: GenMessage<WebhookLog>;
/**
 * @generated from message integration.webhook.v1.LogWebhookRequest
 */
export type LogWebhookRequest = Message<"integration.webhook.v1.LogWebhookRequest"> & {
    /**
     * @generated from field: integration.webhook.v1.WebhookLog log = 1;
     */
    log?: WebhookLog;
};
/**
 * Describes the message integration.webhook.v1.LogWebhookRequest.
 * Use `create(LogWebhookRequestSchema)` to create a new message.
 */
export declare const LogWebhookRequestSchema: GenMessage<LogWebhookRequest>;
/**
 * @generated from message integration.webhook.v1.LogWebhookResponse
 */
export type LogWebhookResponse = Message<"integration.webhook.v1.LogWebhookResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: string log_id = 2;
     */
    logId: string;
    /**
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message integration.webhook.v1.LogWebhookResponse.
 * Use `create(LogWebhookResponseSchema)` to create a new message.
 */
export declare const LogWebhookResponseSchema: GenMessage<LogWebhookResponse>;
/**
 * @generated from message integration.webhook.v1.GetWebhookLogRequest
 */
export type GetWebhookLogRequest = Message<"integration.webhook.v1.GetWebhookLogRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message integration.webhook.v1.GetWebhookLogRequest.
 * Use `create(GetWebhookLogRequestSchema)` to create a new message.
 */
export declare const GetWebhookLogRequestSchema: GenMessage<GetWebhookLogRequest>;
/**
 * @generated from message integration.webhook.v1.GetWebhookLogResponse
 */
export type GetWebhookLogResponse = Message<"integration.webhook.v1.GetWebhookLogResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: integration.webhook.v1.WebhookLog log = 2;
     */
    log?: WebhookLog;
    /**
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message integration.webhook.v1.GetWebhookLogResponse.
 * Use `create(GetWebhookLogResponseSchema)` to create a new message.
 */
export declare const GetWebhookLogResponseSchema: GenMessage<GetWebhookLogResponse>;
/**
 * @generated from message integration.webhook.v1.ListWebhookLogsRequest
 */
export type ListWebhookLogsRequest = Message<"integration.webhook.v1.ListWebhookLogsRequest"> & {
    /**
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * @generated from field: string event_type = 2;
     */
    eventType: string;
    /**
     * @generated from field: string status = 3;
     */
    status: string;
    /**
     * @generated from field: string payment_id = 4;
     */
    paymentId: string;
    /**
     * @generated from field: string subscription_id = 5;
     */
    subscriptionId: string;
    /**
     * @generated from field: google.protobuf.Timestamp from_date = 6;
     */
    fromDate?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp to_date = 7;
     */
    toDate?: Timestamp;
    /**
     * @generated from field: int32 limit = 8;
     */
    limit: number;
    /**
     * @generated from field: string page_token = 9;
     */
    pageToken: string;
};
/**
 * Describes the message integration.webhook.v1.ListWebhookLogsRequest.
 * Use `create(ListWebhookLogsRequestSchema)` to create a new message.
 */
export declare const ListWebhookLogsRequestSchema: GenMessage<ListWebhookLogsRequest>;
/**
 * @generated from message integration.webhook.v1.ListWebhookLogsResponse
 */
export type ListWebhookLogsResponse = Message<"integration.webhook.v1.ListWebhookLogsResponse"> & {
    /**
     * @generated from field: repeated integration.webhook.v1.WebhookLog logs = 1;
     */
    logs: WebhookLog[];
    /**
     * @generated from field: string next_page_token = 2;
     */
    nextPageToken: string;
    /**
     * @generated from field: int32 total_count = 3;
     */
    totalCount: number;
};
/**
 * Describes the message integration.webhook.v1.ListWebhookLogsResponse.
 * Use `create(ListWebhookLogsResponseSchema)` to create a new message.
 */
export declare const ListWebhookLogsResponseSchema: GenMessage<ListWebhookLogsResponse>;
/**
 * WebhookService provides generic webhook operations
 *
 * @generated from service integration.webhook.v1.WebhookService
 */
export declare const WebhookService: GenService<{
    /**
     * Log an incoming webhook (for audit purposes)
     *
     * @generated from rpc integration.webhook.v1.WebhookService.LogWebhook
     */
    logWebhook: {
        methodKind: "unary";
        input: typeof LogWebhookRequestSchema;
        output: typeof LogWebhookResponseSchema;
    };
    /**
     * Get a webhook log by ID
     *
     * @generated from rpc integration.webhook.v1.WebhookService.GetWebhookLog
     */
    getWebhookLog: {
        methodKind: "unary";
        input: typeof GetWebhookLogRequestSchema;
        output: typeof GetWebhookLogResponseSchema;
    };
    /**
     * List webhook logs with filtering
     *
     * @generated from rpc integration.webhook.v1.WebhookService.ListWebhookLogs
     */
    listWebhookLogs: {
        methodKind: "unary";
        input: typeof ListWebhookLogsRequestSchema;
        output: typeof ListWebhookLogsResponseSchema;
    };
}>;
