import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { EmailAddress, EmailAttachment, EmailCapability, EmailMessage, EmailProviderType } from "./email_pb";
import type { ProviderHealthStatus } from "./provider_pb";
import type { CreateTemplateRequestSchema, CreateTemplateResponseSchema, DeleteTemplateRequestSchema, DeleteTemplateResponseSchema, GetTemplateRequestSchema, GetTemplateResponseSchema, ListTemplatesRequestSchema, ListTemplatesResponseSchema, SendOptions, SendTemplatedEmailRequestSchema, SendTemplatedEmailResponseSchema, SortOrder, UpdateTemplateRequestSchema, UpdateTemplateResponseSchema } from "./template_pb";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/email/email_service.proto.
 */
export declare const file_integration_email_email_service: GenFile;
/**
 * SendEmailRequest is a request to send a standard email
 *
 * @generated from message integration.email.v1.SendEmailRequest
 */
export type SendEmailRequest = Message<"integration.email.v1.SendEmailRequest"> & {
    /**
     * @generated from field: integration.email.v1.EmailData data = 1;
     */
    data?: EmailData;
};
/**
 * Describes the message integration.email.v1.SendEmailRequest.
 * Use `create(SendEmailRequestSchema)` to create a new message.
 */
export declare const SendEmailRequestSchema: GenMessage<SendEmailRequest>;
/**
 * @generated from message integration.email.v1.EmailData
 */
export type EmailData = Message<"integration.email.v1.EmailData"> & {
    /**
     * Email provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * From address
     *
     * @generated from field: integration.email.v1.EmailAddress from = 2;
     */
    from?: EmailAddress;
    /**
     * To recipients
     *
     * @generated from field: repeated integration.email.v1.EmailAddress to = 3;
     */
    to: EmailAddress[];
    /**
     * CC recipients
     *
     * @generated from field: repeated integration.email.v1.EmailAddress cc = 4;
     */
    cc: EmailAddress[];
    /**
     * BCC recipients
     *
     * @generated from field: repeated integration.email.v1.EmailAddress bcc = 5;
     */
    bcc: EmailAddress[];
    /**
     * Reply-to address
     *
     * @generated from field: integration.email.v1.EmailAddress reply_to = 6;
     */
    replyTo?: EmailAddress;
    /**
     * Subject line
     *
     * @generated from field: string subject = 7;
     */
    subject: string;
    /**
     * Plain text body
     *
     * @generated from field: string text_body = 8;
     */
    textBody: string;
    /**
     * HTML body
     *
     * @generated from field: string html_body = 9;
     */
    htmlBody: string;
    /**
     * Attachments
     *
     * @generated from field: repeated integration.email.v1.EmailAttachment attachments = 10;
     */
    attachments: EmailAttachment[];
    /**
     * Custom headers
     *
     * @generated from field: map<string, string> headers = 11;
     */
    headers: {
        [key: string]: string;
    };
    /**
     * Tags for tracking
     *
     * @generated from field: repeated string tags = 12;
     */
    tags: string[];
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 13;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Send options
     *
     * @generated from field: integration.email.v1.SendOptions options = 14;
     */
    options?: SendOptions;
    /**
     * Inline template HTML content (alternative to html_body)
     * When provided, template_values will be applied using {{key}} → value replacement
     * This takes precedence over html_body if both are provided
     *
     * @generated from field: string template_html = 15;
     */
    templateHtml: string;
    /**
     * Template variable values for replacement
     * Keys should match {{key}} placeholders in template_html, subject, or text_body
     * Example: {"client_name": "John Doe", "plan_name": "Premium Plan"}
     *
     * @generated from field: map<string, string> template_values = 16;
     */
    templateValues: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.email.v1.EmailData.
 * Use `create(EmailDataSchema)` to create a new message.
 */
export declare const EmailDataSchema: GenMessage<EmailData>;
/**
 * SendEmailResponse contains the result of sending an email
 *
 * @generated from message integration.email.v1.SendEmailResponse
 */
export type SendEmailResponse = Message<"integration.email.v1.SendEmailResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailResult data = 2;
     */
    data: EmailResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.SendEmailResponse.
 * Use `create(SendEmailResponseSchema)` to create a new message.
 */
export declare const SendEmailResponseSchema: GenMessage<SendEmailResponse>;
/**
 * @generated from message integration.email.v1.EmailResult
 */
export type EmailResult = Message<"integration.email.v1.EmailResult"> & {
    /**
     * Message ID from provider
     *
     * @generated from field: string message_id = 1;
     */
    messageId: string;
    /**
     * The complete email message that was sent
     *
     * @generated from field: integration.email.v1.EmailMessage message = 2;
     */
    message?: EmailMessage;
    /**
     * Provider-specific response data
     *
     * @generated from field: map<string, string> provider_response = 3;
     */
    providerResponse: {
        [key: string]: string;
    };
    /**
     * Timestamp when sent
     *
     * @generated from field: google.protobuf.Timestamp sent_at = 4;
     */
    sentAt?: Timestamp;
};
/**
 * Describes the message integration.email.v1.EmailResult.
 * Use `create(EmailResultSchema)` to create a new message.
 */
export declare const EmailResultSchema: GenMessage<EmailResult>;
/**
 * SendBatchEmailsRequest is a request to send multiple emails
 *
 * @generated from message integration.email.v1.SendBatchEmailsRequest
 */
export type SendBatchEmailsRequest = Message<"integration.email.v1.SendBatchEmailsRequest"> & {
    /**
     * @generated from field: integration.email.v1.BatchEmailData data = 1;
     */
    data?: BatchEmailData;
};
/**
 * Describes the message integration.email.v1.SendBatchEmailsRequest.
 * Use `create(SendBatchEmailsRequestSchema)` to create a new message.
 */
export declare const SendBatchEmailsRequestSchema: GenMessage<SendBatchEmailsRequest>;
/**
 * @generated from message integration.email.v1.BatchEmailData
 */
export type BatchEmailData = Message<"integration.email.v1.BatchEmailData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Emails to send
     *
     * @generated from field: repeated integration.email.v1.EmailData emails = 2;
     */
    emails: EmailData[];
    /**
     * Batch ID for tracking
     *
     * @generated from field: string batch_id = 3;
     */
    batchId: string;
    /**
     * Whether to fail entire batch on first error
     *
     * @generated from field: bool fail_fast = 4;
     */
    failFast: boolean;
    /**
     * Maximum concurrent sends
     *
     * @generated from field: int32 max_concurrent = 5;
     */
    maxConcurrent: number;
};
/**
 * Describes the message integration.email.v1.BatchEmailData.
 * Use `create(BatchEmailDataSchema)` to create a new message.
 */
export declare const BatchEmailDataSchema: GenMessage<BatchEmailData>;
/**
 * SendBatchEmailsResponse contains results for batch sending
 *
 * @generated from message integration.email.v1.SendBatchEmailsResponse
 */
export type SendBatchEmailsResponse = Message<"integration.email.v1.SendBatchEmailsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.BatchEmailResult data = 2;
     */
    data: BatchEmailResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.SendBatchEmailsResponse.
 * Use `create(SendBatchEmailsResponseSchema)` to create a new message.
 */
export declare const SendBatchEmailsResponseSchema: GenMessage<SendBatchEmailsResponse>;
/**
 * @generated from message integration.email.v1.BatchEmailResult
 */
export type BatchEmailResult = Message<"integration.email.v1.BatchEmailResult"> & {
    /**
     * Results for each email
     *
     * @generated from field: repeated integration.email.v1.EmailResult results = 1;
     */
    results: EmailResult[];
    /**
     * Number of successful sends
     *
     * @generated from field: int32 success_count = 2;
     */
    successCount: number;
    /**
     * Number of failed sends
     *
     * @generated from field: int32 failure_count = 3;
     */
    failureCount: number;
    /**
     * Batch ID
     *
     * @generated from field: string batch_id = 4;
     */
    batchId: string;
};
/**
 * Describes the message integration.email.v1.BatchEmailResult.
 * Use `create(BatchEmailResultSchema)` to create a new message.
 */
export declare const BatchEmailResultSchema: GenMessage<BatchEmailResult>;
/**
 * GetInboxMessagesRequest is a request to retrieve inbox messages
 *
 * @generated from message integration.email.v1.GetInboxMessagesRequest
 */
export type GetInboxMessagesRequest = Message<"integration.email.v1.GetInboxMessagesRequest"> & {
    /**
     * @generated from field: integration.email.v1.InboxQueryData data = 1;
     */
    data?: InboxQueryData;
};
/**
 * Describes the message integration.email.v1.GetInboxMessagesRequest.
 * Use `create(GetInboxMessagesRequestSchema)` to create a new message.
 */
export declare const GetInboxMessagesRequestSchema: GenMessage<GetInboxMessagesRequest>;
/**
 * @generated from message integration.email.v1.InboxQueryData
 */
export type InboxQueryData = Message<"integration.email.v1.InboxQueryData"> & {
    /**
     * Email provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Maximum number of messages to return
     *
     * @generated from field: int32 max_results = 2;
     */
    maxResults: number;
    /**
     * Page token for pagination
     *
     * @generated from field: string page_token = 3;
     */
    pageToken: string;
    /**
     * Search query (provider-specific syntax)
     *
     * @generated from field: string query = 4;
     */
    query: string;
    /**
     * Filter by labels/folders (provider-specific)
     *
     * @generated from field: repeated string label_ids = 5;
     */
    labelIds: string[];
    /**
     * Only return unread messages
     *
     * @generated from field: bool unread_only = 6;
     */
    unreadOnly: boolean;
    /**
     * Only return messages after this timestamp
     *
     * @generated from field: google.protobuf.Timestamp after = 7;
     */
    after?: Timestamp;
    /**
     * Only return messages before this timestamp
     *
     * @generated from field: google.protobuf.Timestamp before = 8;
     */
    before?: Timestamp;
    /**
     * Filter by sender email
     *
     * @generated from field: string from_email = 9;
     */
    fromEmail: string;
    /**
     * Include message bodies (can be expensive)
     *
     * @generated from field: bool include_body = 10;
     */
    includeBody: boolean;
    /**
     * Include attachments (can be expensive)
     *
     * @generated from field: bool include_attachments = 11;
     */
    includeAttachments: boolean;
};
/**
 * Describes the message integration.email.v1.InboxQueryData.
 * Use `create(InboxQueryDataSchema)` to create a new message.
 */
export declare const InboxQueryDataSchema: GenMessage<InboxQueryData>;
/**
 * GetInboxMessagesResponse contains the retrieved messages
 *
 * @generated from message integration.email.v1.GetInboxMessagesResponse
 */
export type GetInboxMessagesResponse = Message<"integration.email.v1.GetInboxMessagesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailMessage data = 2;
     */
    data: EmailMessage[];
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
 * Describes the message integration.email.v1.GetInboxMessagesResponse.
 * Use `create(GetInboxMessagesResponseSchema)` to create a new message.
 */
export declare const GetInboxMessagesResponseSchema: GenMessage<GetInboxMessagesResponse>;
/**
 * GetMessageRequest is a request to retrieve a specific message
 *
 * @generated from message integration.email.v1.GetMessageRequest
 */
export type GetMessageRequest = Message<"integration.email.v1.GetMessageRequest"> & {
    /**
     * @generated from field: integration.email.v1.MessageLookupData data = 1;
     */
    data?: MessageLookupData;
};
/**
 * Describes the message integration.email.v1.GetMessageRequest.
 * Use `create(GetMessageRequestSchema)` to create a new message.
 */
export declare const GetMessageRequestSchema: GenMessage<GetMessageRequest>;
/**
 * @generated from message integration.email.v1.MessageLookupData
 */
export type MessageLookupData = Message<"integration.email.v1.MessageLookupData"> & {
    /**
     * Email provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Message ID
     *
     * @generated from field: string message_id = 2;
     */
    messageId: string;
    /**
     * Whether to include full message body
     *
     * @generated from field: bool include_body = 3;
     */
    includeBody: boolean;
    /**
     * Whether to include attachments
     *
     * @generated from field: bool include_attachments = 4;
     */
    includeAttachments: boolean;
    /**
     * Format for message retrieval
     *
     * @generated from field: integration.email.v1.MessageFormat format = 5;
     */
    format: MessageFormat;
};
/**
 * Describes the message integration.email.v1.MessageLookupData.
 * Use `create(MessageLookupDataSchema)` to create a new message.
 */
export declare const MessageLookupDataSchema: GenMessage<MessageLookupData>;
/**
 * GetMessageResponse contains the retrieved message
 *
 * @generated from message integration.email.v1.GetMessageResponse
 */
export type GetMessageResponse = Message<"integration.email.v1.GetMessageResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailMessage data = 2;
     */
    data: EmailMessage[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.GetMessageResponse.
 * Use `create(GetMessageResponseSchema)` to create a new message.
 */
export declare const GetMessageResponseSchema: GenMessage<GetMessageResponse>;
/**
 * SearchMessagesRequest is a request for advanced message search
 *
 * @generated from message integration.email.v1.SearchMessagesRequest
 */
export type SearchMessagesRequest = Message<"integration.email.v1.SearchMessagesRequest"> & {
    /**
     * @generated from field: integration.email.v1.SearchQueryData data = 1;
     */
    data?: SearchQueryData;
};
/**
 * Describes the message integration.email.v1.SearchMessagesRequest.
 * Use `create(SearchMessagesRequestSchema)` to create a new message.
 */
export declare const SearchMessagesRequestSchema: GenMessage<SearchMessagesRequest>;
/**
 * @generated from message integration.email.v1.SearchQueryData
 */
export type SearchQueryData = Message<"integration.email.v1.SearchQueryData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Search query
     *
     * @generated from field: string query = 2;
     */
    query: string;
    /**
     * Search filters
     *
     * @generated from field: integration.email.v1.SearchFilters filters = 3;
     */
    filters?: SearchFilters;
    /**
     * Maximum results
     *
     * @generated from field: int32 max_results = 4;
     */
    maxResults: number;
    /**
     * Page token for pagination
     *
     * @generated from field: string page_token = 5;
     */
    pageToken: string;
    /**
     * Sort options
     *
     * @generated from field: integration.email.v1.SortOptions sort_options = 6;
     */
    sortOptions?: SortOptions;
};
/**
 * Describes the message integration.email.v1.SearchQueryData.
 * Use `create(SearchQueryDataSchema)` to create a new message.
 */
export declare const SearchQueryDataSchema: GenMessage<SearchQueryData>;
/**
 * SearchFilters represents search filter criteria
 *
 * @generated from message integration.email.v1.SearchFilters
 */
export type SearchFilters = Message<"integration.email.v1.SearchFilters"> & {
    /**
     * Filter by sender email
     *
     * @generated from field: string from = 1;
     */
    from: string;
    /**
     * Filter by recipient email
     *
     * @generated from field: string to = 2;
     */
    to: string;
    /**
     * Filter by subject (contains)
     *
     * @generated from field: string subject = 3;
     */
    subject: string;
    /**
     * Filter by date range
     *
     * @generated from field: google.protobuf.Timestamp after = 4;
     */
    after?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp before = 5;
     */
    before?: Timestamp;
    /**
     * Filter by labels/folders
     *
     * @generated from field: repeated string labels = 6;
     */
    labels: string[];
    /**
     * Filter by read status
     *
     * @generated from field: optional bool is_read = 7;
     */
    isRead?: boolean;
    /**
     * Filter by has attachments
     *
     * @generated from field: optional bool has_attachments = 8;
     */
    hasAttachments?: boolean;
    /**
     * Filter by tags
     *
     * @generated from field: repeated string tags = 9;
     */
    tags: string[];
};
/**
 * Describes the message integration.email.v1.SearchFilters.
 * Use `create(SearchFiltersSchema)` to create a new message.
 */
export declare const SearchFiltersSchema: GenMessage<SearchFilters>;
/**
 * SortOptions represents sorting configuration
 *
 * @generated from message integration.email.v1.SortOptions
 */
export type SortOptions = Message<"integration.email.v1.SortOptions"> & {
    /**
     * Field to sort by
     *
     * @generated from field: integration.email.v1.SortField field = 1;
     */
    field: SortField;
    /**
     * Sort order
     *
     * @generated from field: integration.email.v1.SortOrder order = 2;
     */
    order: SortOrder;
};
/**
 * Describes the message integration.email.v1.SortOptions.
 * Use `create(SortOptionsSchema)` to create a new message.
 */
export declare const SortOptionsSchema: GenMessage<SortOptions>;
/**
 * SearchMessagesResponse contains search results
 *
 * @generated from message integration.email.v1.SearchMessagesResponse
 */
export type SearchMessagesResponse = Message<"integration.email.v1.SearchMessagesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailMessage data = 2;
     */
    data: EmailMessage[];
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
 * Describes the message integration.email.v1.SearchMessagesResponse.
 * Use `create(SearchMessagesResponseSchema)` to create a new message.
 */
export declare const SearchMessagesResponseSchema: GenMessage<SearchMessagesResponse>;
/**
 * DeleteMessageRequest is a request to delete a message
 *
 * @generated from message integration.email.v1.DeleteMessageRequest
 */
export type DeleteMessageRequest = Message<"integration.email.v1.DeleteMessageRequest"> & {
    /**
     * @generated from field: integration.email.v1.MessageDeleteData data = 1;
     */
    data?: MessageDeleteData;
};
/**
 * Describes the message integration.email.v1.DeleteMessageRequest.
 * Use `create(DeleteMessageRequestSchema)` to create a new message.
 */
export declare const DeleteMessageRequestSchema: GenMessage<DeleteMessageRequest>;
/**
 * @generated from message integration.email.v1.MessageDeleteData
 */
export type MessageDeleteData = Message<"integration.email.v1.MessageDeleteData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Message ID
     *
     * @generated from field: string message_id = 2;
     */
    messageId: string;
    /**
     * Whether to permanently delete (vs move to trash)
     *
     * @generated from field: bool permanent = 3;
     */
    permanent: boolean;
};
/**
 * Describes the message integration.email.v1.MessageDeleteData.
 * Use `create(MessageDeleteDataSchema)` to create a new message.
 */
export declare const MessageDeleteDataSchema: GenMessage<MessageDeleteData>;
/**
 * DeleteMessageResponse confirms the deletion
 *
 * @generated from message integration.email.v1.DeleteMessageResponse
 */
export type DeleteMessageResponse = Message<"integration.email.v1.DeleteMessageResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.MessageDeleteResult data = 2;
     */
    data: MessageDeleteResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.DeleteMessageResponse.
 * Use `create(DeleteMessageResponseSchema)` to create a new message.
 */
export declare const DeleteMessageResponseSchema: GenMessage<DeleteMessageResponse>;
/**
 * @generated from message integration.email.v1.MessageDeleteResult
 */
export type MessageDeleteResult = Message<"integration.email.v1.MessageDeleteResult"> & {
    /**
     * Confirmation message
     *
     * @generated from field: string message = 1;
     */
    message: string;
};
/**
 * Describes the message integration.email.v1.MessageDeleteResult.
 * Use `create(MessageDeleteResultSchema)` to create a new message.
 */
export declare const MessageDeleteResultSchema: GenMessage<MessageDeleteResult>;
/**
 * MarkAsReadRequest is a request to mark a message as read/unread
 *
 * @generated from message integration.email.v1.MarkAsReadRequest
 */
export type MarkAsReadRequest = Message<"integration.email.v1.MarkAsReadRequest"> & {
    /**
     * @generated from field: integration.email.v1.MarkReadData data = 1;
     */
    data?: MarkReadData;
};
/**
 * Describes the message integration.email.v1.MarkAsReadRequest.
 * Use `create(MarkAsReadRequestSchema)` to create a new message.
 */
export declare const MarkAsReadRequestSchema: GenMessage<MarkAsReadRequest>;
/**
 * @generated from message integration.email.v1.MarkReadData
 */
export type MarkReadData = Message<"integration.email.v1.MarkReadData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Message IDs to mark
     *
     * @generated from field: repeated string message_ids = 2;
     */
    messageIds: string[];
    /**
     * Whether to mark as read (true) or unread (false)
     *
     * @generated from field: bool is_read = 3;
     */
    isRead: boolean;
};
/**
 * Describes the message integration.email.v1.MarkReadData.
 * Use `create(MarkReadDataSchema)` to create a new message.
 */
export declare const MarkReadDataSchema: GenMessage<MarkReadData>;
/**
 * MarkAsReadResponse confirms the operation
 *
 * @generated from message integration.email.v1.MarkAsReadResponse
 */
export type MarkAsReadResponse = Message<"integration.email.v1.MarkAsReadResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.MarkReadResult data = 2;
     */
    data: MarkReadResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.MarkAsReadResponse.
 * Use `create(MarkAsReadResponseSchema)` to create a new message.
 */
export declare const MarkAsReadResponseSchema: GenMessage<MarkAsReadResponse>;
/**
 * @generated from message integration.email.v1.MarkReadResult
 */
export type MarkReadResult = Message<"integration.email.v1.MarkReadResult"> & {
    /**
     * Number of messages updated
     *
     * @generated from field: int32 updated_count = 1;
     */
    updatedCount: number;
};
/**
 * Describes the message integration.email.v1.MarkReadResult.
 * Use `create(MarkReadResultSchema)` to create a new message.
 */
export declare const MarkReadResultSchema: GenMessage<MarkReadResult>;
/**
 * MoveMessageRequest is a request to move a message to a folder/label
 *
 * @generated from message integration.email.v1.MoveMessageRequest
 */
export type MoveMessageRequest = Message<"integration.email.v1.MoveMessageRequest"> & {
    /**
     * @generated from field: integration.email.v1.MoveMessageData data = 1;
     */
    data?: MoveMessageData;
};
/**
 * Describes the message integration.email.v1.MoveMessageRequest.
 * Use `create(MoveMessageRequestSchema)` to create a new message.
 */
export declare const MoveMessageRequestSchema: GenMessage<MoveMessageRequest>;
/**
 * @generated from message integration.email.v1.MoveMessageData
 */
export type MoveMessageData = Message<"integration.email.v1.MoveMessageData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Message ID to move
     *
     * @generated from field: string message_id = 2;
     */
    messageId: string;
    /**
     * Target folder/label ID
     *
     * @generated from field: string target_folder = 3;
     */
    targetFolder: string;
    /**
     * Source folder/label ID (optional, for providers that need it)
     *
     * @generated from field: string source_folder = 4;
     */
    sourceFolder: string;
};
/**
 * Describes the message integration.email.v1.MoveMessageData.
 * Use `create(MoveMessageDataSchema)` to create a new message.
 */
export declare const MoveMessageDataSchema: GenMessage<MoveMessageData>;
/**
 * MoveMessageResponse confirms the move
 *
 * @generated from message integration.email.v1.MoveMessageResponse
 */
export type MoveMessageResponse = Message<"integration.email.v1.MoveMessageResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.MoveMessageResult data = 2;
     */
    data: MoveMessageResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.MoveMessageResponse.
 * Use `create(MoveMessageResponseSchema)` to create a new message.
 */
export declare const MoveMessageResponseSchema: GenMessage<MoveMessageResponse>;
/**
 * @generated from message integration.email.v1.MoveMessageResult
 */
export type MoveMessageResult = Message<"integration.email.v1.MoveMessageResult"> & {
    /**
     * Confirmation message
     *
     * @generated from field: string message = 1;
     */
    message: string;
};
/**
 * Describes the message integration.email.v1.MoveMessageResult.
 * Use `create(MoveMessageResultSchema)` to create a new message.
 */
export declare const MoveMessageResultSchema: GenMessage<MoveMessageResult>;
/**
 * CheckHealthRequest is a request to check provider health
 *
 * @generated from message integration.email.v1.CheckHealthRequest
 */
export type CheckHealthRequest = Message<"integration.email.v1.CheckHealthRequest"> & {
    /**
     * @generated from field: integration.email.v1.HealthCheckData data = 1;
     */
    data?: HealthCheckData;
};
/**
 * Describes the message integration.email.v1.CheckHealthRequest.
 * Use `create(CheckHealthRequestSchema)` to create a new message.
 */
export declare const CheckHealthRequestSchema: GenMessage<CheckHealthRequest>;
/**
 * @generated from message integration.email.v1.HealthCheckData
 */
export type HealthCheckData = Message<"integration.email.v1.HealthCheckData"> & {
    /**
     * Email provider identifier to check
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Whether to perform deep health check
     *
     * @generated from field: bool deep_check = 2;
     */
    deepCheck: boolean;
};
/**
 * Describes the message integration.email.v1.HealthCheckData.
 * Use `create(HealthCheckDataSchema)` to create a new message.
 */
export declare const HealthCheckDataSchema: GenMessage<HealthCheckData>;
/**
 * CheckHealthResponse contains the health check result
 *
 * @generated from message integration.email.v1.CheckHealthResponse
 */
export type CheckHealthResponse = Message<"integration.email.v1.CheckHealthResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailHealthStatus data = 2;
     */
    data: EmailHealthStatus[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.CheckHealthResponse.
 * Use `create(CheckHealthResponseSchema)` to create a new message.
 */
export declare const CheckHealthResponseSchema: GenMessage<CheckHealthResponse>;
/**
 * @generated from message integration.email.v1.EmailHealthStatus
 */
export type EmailHealthStatus = Message<"integration.email.v1.EmailHealthStatus"> & {
    /**
     * Whether the provider is healthy
     *
     * @generated from field: bool is_healthy = 1;
     */
    isHealthy: boolean;
    /**
     * Health status message
     *
     * @generated from field: string status_message = 2;
     */
    statusMessage: string;
    /**
     * Provider health status
     *
     * @generated from field: integration.email.v1.ProviderHealthStatus health_status = 3;
     */
    healthStatus?: ProviderHealthStatus;
    /**
     * Additional health details
     *
     * @generated from field: map<string, string> details = 4;
     */
    details: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.email.v1.EmailHealthStatus.
 * Use `create(EmailHealthStatusSchema)` to create a new message.
 */
export declare const EmailHealthStatusSchema: GenMessage<EmailHealthStatus>;
/**
 * GetCapabilitiesRequest is a request to get provider capabilities
 *
 * @generated from message integration.email.v1.GetCapabilitiesRequest
 */
export type GetCapabilitiesRequest = Message<"integration.email.v1.GetCapabilitiesRequest"> & {
    /**
     * @generated from field: integration.email.v1.ProviderLookup data = 1;
     */
    data?: ProviderLookup;
};
/**
 * Describes the message integration.email.v1.GetCapabilitiesRequest.
 * Use `create(GetCapabilitiesRequestSchema)` to create a new message.
 */
export declare const GetCapabilitiesRequestSchema: GenMessage<GetCapabilitiesRequest>;
/**
 * @generated from message integration.email.v1.ProviderLookup
 */
export type ProviderLookup = Message<"integration.email.v1.ProviderLookup"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
};
/**
 * Describes the message integration.email.v1.ProviderLookup.
 * Use `create(ProviderLookupSchema)` to create a new message.
 */
export declare const ProviderLookupSchema: GenMessage<ProviderLookup>;
/**
 * GetCapabilitiesResponse contains the provider's capabilities
 *
 * @generated from message integration.email.v1.GetCapabilitiesResponse
 */
export type GetCapabilitiesResponse = Message<"integration.email.v1.GetCapabilitiesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailProviderCapabilities data = 2;
     */
    data: EmailProviderCapabilities[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.GetCapabilitiesResponse.
 * Use `create(GetCapabilitiesResponseSchema)` to create a new message.
 */
export declare const GetCapabilitiesResponseSchema: GenMessage<GetCapabilitiesResponse>;
/**
 * @generated from message integration.email.v1.EmailProviderCapabilities
 */
export type EmailProviderCapabilities = Message<"integration.email.v1.EmailProviderCapabilities"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.email.v1.EmailProviderType provider_type = 2;
     */
    providerType: EmailProviderType;
    /**
     * Supported capabilities
     *
     * @generated from field: repeated integration.email.v1.EmailCapability capabilities = 3;
     */
    capabilities: EmailCapability[];
    /**
     * Capability-specific limits and features
     *
     * @generated from field: map<string, integration.email.v1.CapabilityDetails> capability_details = 4;
     */
    capabilityDetails: {
        [key: string]: CapabilityDetails;
    };
    /**
     * Rate limits
     *
     * @generated from field: integration.email.v1.RateLimits rate_limits = 5;
     */
    rateLimits?: RateLimits;
    /**
     * Maximum attachment size in bytes
     *
     * @generated from field: int64 max_attachment_size = 6;
     */
    maxAttachmentSize: bigint;
    /**
     * Maximum total message size in bytes
     *
     * @generated from field: int64 max_message_size = 7;
     */
    maxMessageSize: bigint;
    /**
     * Maximum recipients per message
     *
     * @generated from field: int32 max_recipients = 8;
     */
    maxRecipients: number;
};
/**
 * Describes the message integration.email.v1.EmailProviderCapabilities.
 * Use `create(EmailProviderCapabilitiesSchema)` to create a new message.
 */
export declare const EmailProviderCapabilitiesSchema: GenMessage<EmailProviderCapabilities>;
/**
 * CapabilityDetails provides details about a specific capability
 *
 * @generated from message integration.email.v1.CapabilityDetails
 */
export type CapabilityDetails = Message<"integration.email.v1.CapabilityDetails"> & {
    /**
     * Whether this capability is enabled
     *
     * @generated from field: bool enabled = 1;
     */
    enabled: boolean;
    /**
     * Capability-specific configuration
     *
     * @generated from field: map<string, string> config = 2;
     */
    config: {
        [key: string]: string;
    };
    /**
     * Usage limits for this capability
     *
     * @generated from field: map<string, int32> limits = 3;
     */
    limits: {
        [key: string]: number;
    };
};
/**
 * Describes the message integration.email.v1.CapabilityDetails.
 * Use `create(CapabilityDetailsSchema)` to create a new message.
 */
export declare const CapabilityDetailsSchema: GenMessage<CapabilityDetails>;
/**
 * RateLimits represents API rate limiting information
 *
 * @generated from message integration.email.v1.RateLimits
 */
export type RateLimits = Message<"integration.email.v1.RateLimits"> & {
    /**
     * Requests per second
     *
     * @generated from field: int32 requests_per_second = 1;
     */
    requestsPerSecond: number;
    /**
     * Requests per minute
     *
     * @generated from field: int32 requests_per_minute = 2;
     */
    requestsPerMinute: number;
    /**
     * Requests per hour
     *
     * @generated from field: int32 requests_per_hour = 3;
     */
    requestsPerHour: number;
    /**
     * Requests per day
     *
     * @generated from field: int32 requests_per_day = 4;
     */
    requestsPerDay: number;
    /**
     * Emails per second
     *
     * @generated from field: int32 emails_per_second = 5;
     */
    emailsPerSecond: number;
    /**
     * Emails per day
     *
     * @generated from field: int32 emails_per_day = 6;
     */
    emailsPerDay: number;
};
/**
 * Describes the message integration.email.v1.RateLimits.
 * Use `create(RateLimitsSchema)` to create a new message.
 */
export declare const RateLimitsSchema: GenMessage<RateLimits>;
/**
 * MessageFormat represents the format for retrieving messages
 *
 * @generated from enum integration.email.v1.MessageFormat
 */
export declare enum MessageFormat {
    /**
     * @generated from enum value: MESSAGE_FORMAT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Full message with all fields
     *
     * @generated from enum value: MESSAGE_FORMAT_FULL = 1;
     */
    FULL = 1,
    /**
     * Metadata only (no body)
     *
     * @generated from enum value: MESSAGE_FORMAT_METADATA = 2;
     */
    METADATA = 2,
    /**
     * Minimal fields (id, from, subject)
     *
     * @generated from enum value: MESSAGE_FORMAT_MINIMAL = 3;
     */
    MINIMAL = 3,
    /**
     * Raw MIME message
     *
     * @generated from enum value: MESSAGE_FORMAT_RAW = 4;
     */
    RAW = 4
}
/**
 * Describes the enum integration.email.v1.MessageFormat.
 */
export declare const MessageFormatSchema: GenEnum<MessageFormat>;
/**
 * SortField represents fields that can be sorted
 *
 * @generated from enum integration.email.v1.SortField
 */
export declare enum SortField {
    /**
     * @generated from enum value: SORT_FIELD_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SORT_FIELD_DATE = 1;
     */
    DATE = 1,
    /**
     * @generated from enum value: SORT_FIELD_FROM = 2;
     */
    FROM = 2,
    /**
     * @generated from enum value: SORT_FIELD_SUBJECT = 3;
     */
    SUBJECT = 3,
    /**
     * @generated from enum value: SORT_FIELD_SIZE = 4;
     */
    SIZE = 4
}
/**
 * Describes the enum integration.email.v1.SortField.
 */
export declare const SortFieldSchema: GenEnum<SortField>;
/**
 * EmailDomainService provides email operations across multiple providers
 * This service defines the contract; the hexagonal architecture adapters
 * implement provider-specific behavior
 *
 * @generated from service integration.email.v1.EmailDomainService
 */
export declare const EmailDomainService: GenService<{
    /**
     * Send a standard email
     *
     * @generated from rpc integration.email.v1.EmailDomainService.SendEmail
     */
    sendEmail: {
        methodKind: "unary";
        input: typeof SendEmailRequestSchema;
        output: typeof SendEmailResponseSchema;
    };
    /**
     * Send an email using a template
     *
     * @generated from rpc integration.email.v1.EmailDomainService.SendTemplatedEmail
     */
    sendTemplatedEmail: {
        methodKind: "unary";
        input: typeof SendTemplatedEmailRequestSchema;
        output: typeof SendTemplatedEmailResponseSchema;
    };
    /**
     * Send batch emails (multiple recipients/messages)
     *
     * @generated from rpc integration.email.v1.EmailDomainService.SendBatchEmails
     */
    sendBatchEmails: {
        methodKind: "unary";
        input: typeof SendBatchEmailsRequestSchema;
        output: typeof SendBatchEmailsResponseSchema;
    };
    /**
     * Get inbox messages
     *
     * @generated from rpc integration.email.v1.EmailDomainService.GetInboxMessages
     */
    getInboxMessages: {
        methodKind: "unary";
        input: typeof GetInboxMessagesRequestSchema;
        output: typeof GetInboxMessagesResponseSchema;
    };
    /**
     * Get a specific email message
     *
     * @generated from rpc integration.email.v1.EmailDomainService.GetMessage
     */
    getMessage: {
        methodKind: "unary";
        input: typeof GetMessageRequestSchema;
        output: typeof GetMessageResponseSchema;
    };
    /**
     * Search messages
     *
     * @generated from rpc integration.email.v1.EmailDomainService.SearchMessages
     */
    searchMessages: {
        methodKind: "unary";
        input: typeof SearchMessagesRequestSchema;
        output: typeof SearchMessagesResponseSchema;
    };
    /**
     * Delete a message
     *
     * @generated from rpc integration.email.v1.EmailDomainService.DeleteMessage
     */
    deleteMessage: {
        methodKind: "unary";
        input: typeof DeleteMessageRequestSchema;
        output: typeof DeleteMessageResponseSchema;
    };
    /**
     * Mark message as read/unread
     *
     * @generated from rpc integration.email.v1.EmailDomainService.MarkAsRead
     */
    markAsRead: {
        methodKind: "unary";
        input: typeof MarkAsReadRequestSchema;
        output: typeof MarkAsReadResponseSchema;
    };
    /**
     * Move message to folder/label
     *
     * @generated from rpc integration.email.v1.EmailDomainService.MoveMessage
     */
    moveMessage: {
        methodKind: "unary";
        input: typeof MoveMessageRequestSchema;
        output: typeof MoveMessageResponseSchema;
    };
    /**
     * Check provider health
     *
     * @generated from rpc integration.email.v1.EmailDomainService.CheckHealth
     */
    checkHealth: {
        methodKind: "unary";
        input: typeof CheckHealthRequestSchema;
        output: typeof CheckHealthResponseSchema;
    };
    /**
     * Get provider capabilities
     *
     * @generated from rpc integration.email.v1.EmailDomainService.GetCapabilities
     */
    getCapabilities: {
        methodKind: "unary";
        input: typeof GetCapabilitiesRequestSchema;
        output: typeof GetCapabilitiesResponseSchema;
    };
    /**
     * Template management operations
     *
     * @generated from rpc integration.email.v1.EmailDomainService.CreateTemplate
     */
    createTemplate: {
        methodKind: "unary";
        input: typeof CreateTemplateRequestSchema;
        output: typeof CreateTemplateResponseSchema;
    };
    /**
     * @generated from rpc integration.email.v1.EmailDomainService.UpdateTemplate
     */
    updateTemplate: {
        methodKind: "unary";
        input: typeof UpdateTemplateRequestSchema;
        output: typeof UpdateTemplateResponseSchema;
    };
    /**
     * @generated from rpc integration.email.v1.EmailDomainService.GetTemplate
     */
    getTemplate: {
        methodKind: "unary";
        input: typeof GetTemplateRequestSchema;
        output: typeof GetTemplateResponseSchema;
    };
    /**
     * @generated from rpc integration.email.v1.EmailDomainService.ListTemplates
     */
    listTemplates: {
        methodKind: "unary";
        input: typeof ListTemplatesRequestSchema;
        output: typeof ListTemplatesResponseSchema;
    };
    /**
     * @generated from rpc integration.email.v1.EmailDomainService.DeleteTemplate
     */
    deleteTemplate: {
        methodKind: "unary";
        input: typeof DeleteTemplateRequestSchema;
        output: typeof DeleteTemplateResponseSchema;
    };
}>;
