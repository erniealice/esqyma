import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Any, Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/email/email.proto.
 */
export declare const file_integration_email_email: GenFile;
/**
 * EmailMessage represents a unified email message across all providers
 *
 * @generated from message integration.email.v1.EmailMessage
 */
export type EmailMessage = Message<"integration.email.v1.EmailMessage"> & {
    /**
     * Unique identifier for the message
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Provider identifier (e.g., "sendgrid", "gmail", "custom-smtp")
     *
     * @generated from field: string provider_id = 2;
     */
    providerId: string;
    /**
     * Provider type category
     *
     * @generated from field: integration.email.v1.EmailProviderType provider_type = 3;
     */
    providerType: EmailProviderType;
    /**
     * From address
     *
     * @generated from field: integration.email.v1.EmailAddress from = 4;
     */
    from?: EmailAddress;
    /**
     * To recipients
     *
     * @generated from field: repeated integration.email.v1.EmailAddress to = 5;
     */
    to: EmailAddress[];
    /**
     * CC recipients
     *
     * @generated from field: repeated integration.email.v1.EmailAddress cc = 6;
     */
    cc: EmailAddress[];
    /**
     * BCC recipients
     *
     * @generated from field: repeated integration.email.v1.EmailAddress bcc = 7;
     */
    bcc: EmailAddress[];
    /**
     * Reply-to address
     *
     * @generated from field: integration.email.v1.EmailAddress reply_to = 8;
     */
    replyTo?: EmailAddress;
    /**
     * Subject line
     *
     * @generated from field: string subject = 9;
     */
    subject: string;
    /**
     * Plain text body
     *
     * @generated from field: string text_body = 10;
     */
    textBody: string;
    /**
     * HTML body
     *
     * @generated from field: string html_body = 11;
     */
    htmlBody: string;
    /**
     * Email attachments
     *
     * @generated from field: repeated integration.email.v1.EmailAttachment attachments = 12;
     */
    attachments: EmailAttachment[];
    /**
     * Custom headers
     *
     * @generated from field: map<string, string> headers = 13;
     */
    headers: {
        [key: string]: string;
    };
    /**
     * When the email was sent/received
     *
     * @generated from field: google.protobuf.Timestamp timestamp = 14;
     */
    timestamp?: Timestamp;
    /**
     * Thread/conversation ID (for threading support)
     *
     * @generated from field: string thread_id = 15;
     */
    threadId: string;
    /**
     * Tags for categorization and tracking
     *
     * @generated from field: repeated string tags = 16;
     */
    tags: string[];
    /**
     * Custom metadata (key-value pairs)
     *
     * @generated from field: map<string, string> metadata = 17;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Whether this is a draft
     *
     * @generated from field: bool is_draft = 18;
     */
    isDraft: boolean;
    /**
     * Read/unread status
     *
     * @generated from field: bool is_read = 19;
     */
    isRead: boolean;
    /**
     * Provider-specific string metadata
     * Use this for simple provider-specific fields (IDs, labels, etc.)
     *
     * @generated from field: map<string, string> provider_metadata = 20;
     */
    providerMetadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific complex data
     * Use this for complex provider-specific structures
     *
     * @generated from field: map<string, google.protobuf.Any> provider_data = 21;
     */
    providerData: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.email.v1.EmailMessage.
 * Use `create(EmailMessageSchema)` to create a new message.
 */
export declare const EmailMessageSchema: GenMessage<EmailMessage>;
/**
 * EmailAddress represents an email address with optional display name
 *
 * @generated from message integration.email.v1.EmailAddress
 */
export type EmailAddress = Message<"integration.email.v1.EmailAddress"> & {
    /**
     * Email address (e.g., "user@example.com")
     *
     * @generated from field: string address = 1;
     */
    address: string;
    /**
     * Display name (e.g., "John Doe")
     *
     * @generated from field: string name = 2;
     */
    name: string;
};
/**
 * Describes the message integration.email.v1.EmailAddress.
 * Use `create(EmailAddressSchema)` to create a new message.
 */
export declare const EmailAddressSchema: GenMessage<EmailAddress>;
/**
 * EmailAttachment represents an email attachment
 *
 * @generated from message integration.email.v1.EmailAttachment
 */
export type EmailAttachment = Message<"integration.email.v1.EmailAttachment"> & {
    /**
     * Attachment ID (provider-specific or generated)
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Filename
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * MIME content type
     *
     * @generated from field: string content_type = 3;
     */
    contentType: string;
    /**
     * File size in bytes
     *
     * @generated from field: int64 size = 4;
     */
    size: bigint;
    /**
     * Base64-encoded file content
     *
     * @generated from field: bytes data = 5;
     */
    data: Uint8Array;
    /**
     * Inline content ID (for embedded images in HTML)
     *
     * @generated from field: string content_id = 6;
     */
    contentId: string;
    /**
     * Whether this is an inline attachment
     *
     * @generated from field: bool is_inline = 7;
     */
    isInline: boolean;
    /**
     * Additional attachment metadata
     *
     * @generated from field: map<string, string> metadata = 8;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.email.v1.EmailAttachment.
 * Use `create(EmailAttachmentSchema)` to create a new message.
 */
export declare const EmailAttachmentSchema: GenMessage<EmailAttachment>;
/**
 * EmailProviderType represents the category of email provider
 *
 * @generated from enum integration.email.v1.EmailProviderType
 */
export declare enum EmailProviderType {
    /**
     * @generated from enum value: EMAIL_PROVIDER_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * REST API based providers
     *
     * @generated from enum value: EMAIL_PROVIDER_TYPE_API = 1;
     */
    API = 1,
    /**
     * OAuth-based providers (requires user delegation)
     *
     * @generated from enum value: EMAIL_PROVIDER_TYPE_OAUTH = 2;
     */
    OAUTH = 2,
    /**
     * Standard SMTP protocol
     *
     * @generated from enum value: EMAIL_PROVIDER_TYPE_SMTP = 3;
     */
    SMTP = 3,
    /**
     * Mock/test provider
     *
     * @generated from enum value: EMAIL_PROVIDER_TYPE_MOCK = 4;
     */
    MOCK = 4
}
/**
 * Describes the enum integration.email.v1.EmailProviderType.
 */
export declare const EmailProviderTypeSchema: GenEnum<EmailProviderType>;
/**
 * EmailCapability represents features supported by a provider
 *
 * @generated from enum integration.email.v1.EmailCapability
 */
export declare enum EmailCapability {
    /**
     * @generated from enum value: EMAIL_CAPABILITY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Basic email sending
     *
     * @generated from enum value: EMAIL_CAPABILITY_SEND = 1;
     */
    SEND = 1,
    /**
     * Template-based emails
     *
     * @generated from enum value: EMAIL_CAPABILITY_TEMPLATING = 2;
     */
    TEMPLATING = 2,
    /**
     * Schedule emails for later
     *
     * @generated from enum value: EMAIL_CAPABILITY_SCHEDULING = 3;
     */
    SCHEDULING = 3,
    /**
     * Open/click tracking
     *
     * @generated from enum value: EMAIL_CAPABILITY_TRACKING = 4;
     */
    TRACKING = 4,
    /**
     * File attachments
     *
     * @generated from enum value: EMAIL_CAPABILITY_ATTACHMENTS = 5;
     */
    ATTACHMENTS = 5,
    /**
     * Inline embedded images
     *
     * @generated from enum value: EMAIL_CAPABILITY_INLINE_IMAGES = 6;
     */
    INLINE_IMAGES = 6,
    /**
     * Batch/bulk sending
     *
     * @generated from enum value: EMAIL_CAPABILITY_BATCH_SEND = 7;
     */
    BATCH_SEND = 7,
    /**
     * Read incoming emails
     *
     * @generated from enum value: EMAIL_CAPABILITY_READ_INBOX = 8;
     */
    READ_INBOX = 8,
    /**
     * Email threading/conversations
     *
     * @generated from enum value: EMAIL_CAPABILITY_THREADING = 9;
     */
    THREADING = 9,
    /**
     * Label/folder management
     *
     * @generated from enum value: EMAIL_CAPABILITY_LABELS = 10;
     */
    LABELS = 10,
    /**
     * Advanced search
     *
     * @generated from enum value: EMAIL_CAPABILITY_SEARCH = 11;
     */
    SEARCH = 11,
    /**
     * Event webhooks/callbacks
     *
     * @generated from enum value: EMAIL_CAPABILITY_WEBHOOKS = 12;
     */
    WEBHOOKS = 12
}
/**
 * Describes the enum integration.email.v1.EmailCapability.
 */
export declare const EmailCapabilitySchema: GenEnum<EmailCapability>;
/**
 * MessagePriority represents the importance/priority level of an email
 *
 * @generated from enum integration.email.v1.MessagePriority
 */
export declare enum MessagePriority {
    /**
     * @generated from enum value: MESSAGE_PRIORITY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: MESSAGE_PRIORITY_LOW = 1;
     */
    LOW = 1,
    /**
     * @generated from enum value: MESSAGE_PRIORITY_NORMAL = 2;
     */
    NORMAL = 2,
    /**
     * @generated from enum value: MESSAGE_PRIORITY_HIGH = 3;
     */
    HIGH = 3,
    /**
     * @generated from enum value: MESSAGE_PRIORITY_URGENT = 4;
     */
    URGENT = 4
}
/**
 * Describes the enum integration.email.v1.MessagePriority.
 */
export declare const MessagePrioritySchema: GenEnum<MessagePriority>;
