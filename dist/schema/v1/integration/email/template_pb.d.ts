import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Any, Timestamp } from "@bufbuild/protobuf/wkt";
import type { EmailAddress, EmailAttachment, EmailMessage, MessagePriority } from "./email_pb";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/email/template.proto.
 */
export declare const file_integration_email_template: GenFile;
/**
 * EmailTemplate represents a reusable email template
 * Templates can be stored locally or reference provider-hosted templates
 *
 * @generated from message integration.email.v1.EmailTemplate
 */
export type EmailTemplate = Message<"integration.email.v1.EmailTemplate"> & {
    /**
     * Unique identifier for the template (internal ID)
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Template name
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Template description
     *
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * Provider identifier this template is for
     *
     * @generated from field: string provider_id = 4;
     */
    providerId: string;
    /**
     * Provider-specific template ID (if template is hosted by the provider)
     *
     * @generated from field: string provider_template_id = 5;
     */
    providerTemplateId: string;
    /**
     * Template type
     *
     * @generated from field: integration.email.v1.TemplateType type = 6;
     */
    type: TemplateType;
    /**
     * Template subject line (with variable placeholders like {{user_name}})
     *
     * @generated from field: string subject = 7;
     */
    subject: string;
    /**
     * Plain text body (with variable placeholders)
     *
     * @generated from field: string text_body = 8;
     */
    textBody: string;
    /**
     * HTML body (with variable placeholders)
     *
     * @generated from field: string html_body = 9;
     */
    htmlBody: string;
    /**
     * From address override (if different from provider default)
     *
     * @generated from field: integration.email.v1.EmailAddress from = 10;
     */
    from?: EmailAddress;
    /**
     * Reply-to address override
     *
     * @generated from field: integration.email.v1.EmailAddress reply_to = 11;
     */
    replyTo?: EmailAddress;
    /**
     * Template variables/placeholders definitions
     *
     * @generated from field: repeated integration.email.v1.TemplateVariable variables = 12;
     */
    variables: TemplateVariable[];
    /**
     * Default values for variables
     *
     * @generated from field: map<string, string> default_values = 13;
     */
    defaultValues: {
        [key: string]: string;
    };
    /**
     * Template category/folder for organization
     *
     * @generated from field: string category = 14;
     */
    category: string;
    /**
     * Tags for organization and filtering
     *
     * @generated from field: repeated string tags = 15;
     */
    tags: string[];
    /**
     * Whether this template is active and can be used
     *
     * @generated from field: bool is_active = 16;
     */
    isActive: boolean;
    /**
     * Template version (for version control)
     *
     * @generated from field: string version = 17;
     */
    version: string;
    /**
     * When the template was created
     *
     * @generated from field: google.protobuf.Timestamp created_at = 18;
     */
    createdAt?: Timestamp;
    /**
     * When the template was last updated
     *
     * @generated from field: google.protobuf.Timestamp updated_at = 19;
     */
    updatedAt?: Timestamp;
    /**
     * Created by user ID
     *
     * @generated from field: string created_by = 20;
     */
    createdBy: string;
    /**
     * Last updated by user ID
     *
     * @generated from field: string updated_by = 21;
     */
    updatedBy: string;
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 22;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific template configuration
     *
     * @generated from field: map<string, string> provider_settings = 23;
     */
    providerSettings: {
        [key: string]: string;
    };
    /**
     * Complex provider-specific template data
     *
     * @generated from field: map<string, google.protobuf.Any> provider_data = 24;
     */
    providerData: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.email.v1.EmailTemplate.
 * Use `create(EmailTemplateSchema)` to create a new message.
 */
export declare const EmailTemplateSchema: GenMessage<EmailTemplate>;
/**
 * TemplateVariable represents a placeholder variable in a template
 *
 * @generated from message integration.email.v1.TemplateVariable
 */
export type TemplateVariable = Message<"integration.email.v1.TemplateVariable"> & {
    /**
     * Variable name (e.g., "user_name", "order_number", "verification_code")
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * Variable data type
     *
     * @generated from field: integration.email.v1.VariableType type = 2;
     */
    type: VariableType;
    /**
     * Human-readable description of this variable
     *
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * Whether this variable is required
     *
     * @generated from field: bool is_required = 4;
     */
    isRequired: boolean;
    /**
     * Default value if not provided
     *
     * @generated from field: string default_value = 5;
     */
    defaultValue: string;
    /**
     * Example value for documentation/testing
     *
     * @generated from field: string example_value = 6;
     */
    exampleValue: string;
    /**
     * Validation rules (e.g., regex pattern, min/max length)
     *
     * @generated from field: repeated integration.email.v1.ValidationRule validation_rules = 7;
     */
    validationRules: ValidationRule[];
    /**
     * Variable format hint (e.g., "email", "phone", "currency", "date")
     *
     * @generated from field: string format = 8;
     */
    format: string;
};
/**
 * Describes the message integration.email.v1.TemplateVariable.
 * Use `create(TemplateVariableSchema)` to create a new message.
 */
export declare const TemplateVariableSchema: GenMessage<TemplateVariable>;
/**
 * ValidationRule represents a validation rule for template variables
 *
 * @generated from message integration.email.v1.ValidationRule
 */
export type ValidationRule = Message<"integration.email.v1.ValidationRule"> & {
    /**
     * Rule type
     *
     * @generated from field: integration.email.v1.ValidationType type = 1;
     */
    type: ValidationType;
    /**
     * Rule parameter (e.g., regex pattern, min value, max value)
     *
     * @generated from field: string parameter = 2;
     */
    parameter: string;
    /**
     * Error message if validation fails
     *
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message integration.email.v1.ValidationRule.
 * Use `create(ValidationRuleSchema)` to create a new message.
 */
export declare const ValidationRuleSchema: GenMessage<ValidationRule>;
/**
 * SendTemplatedEmailRequest is a request to send an email using a template
 *
 * @generated from message integration.email.v1.SendTemplatedEmailRequest
 */
export type SendTemplatedEmailRequest = Message<"integration.email.v1.SendTemplatedEmailRequest"> & {
    /**
     * @generated from field: integration.email.v1.TemplatedEmailData data = 1;
     */
    data?: TemplatedEmailData;
};
/**
 * Describes the message integration.email.v1.SendTemplatedEmailRequest.
 * Use `create(SendTemplatedEmailRequestSchema)` to create a new message.
 */
export declare const SendTemplatedEmailRequestSchema: GenMessage<SendTemplatedEmailRequest>;
/**
 * @generated from message integration.email.v1.TemplatedEmailData
 */
export type TemplatedEmailData = Message<"integration.email.v1.TemplatedEmailData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Template ID (local template ID or provider template ID)
     *
     * @generated from field: string template_id = 2;
     */
    templateId: string;
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
     * Template variable values (keys must match template variable names)
     *
     * @generated from field: map<string, string> variables = 6;
     */
    variables: {
        [key: string]: string;
    };
    /**
     * Override from address
     *
     * @generated from field: integration.email.v1.EmailAddress from = 7;
     */
    from?: EmailAddress;
    /**
     * Override reply-to address
     *
     * @generated from field: integration.email.v1.EmailAddress reply_to = 8;
     */
    replyTo?: EmailAddress;
    /**
     * Override subject (if template allows)
     *
     * @generated from field: string subject_override = 9;
     */
    subjectOverride: string;
    /**
     * Attachments to include
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
     * Tags for tracking and categorization
     *
     * @generated from field: repeated string tags = 12;
     */
    tags: string[];
    /**
     * Schedule sending for later
     *
     * @generated from field: google.protobuf.Timestamp send_at = 13;
     */
    sendAt?: Timestamp;
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 14;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Send options
     *
     * @generated from field: integration.email.v1.SendOptions options = 15;
     */
    options?: SendOptions;
};
/**
 * Describes the message integration.email.v1.TemplatedEmailData.
 * Use `create(TemplatedEmailDataSchema)` to create a new message.
 */
export declare const TemplatedEmailDataSchema: GenMessage<TemplatedEmailData>;
/**
 * SendOptions represents generic send options applicable across providers
 *
 * @generated from message integration.email.v1.SendOptions
 */
export type SendOptions = Message<"integration.email.v1.SendOptions"> & {
    /**
     * Priority/importance level
     *
     * @generated from field: integration.email.v1.MessagePriority priority = 1;
     */
    priority: MessagePriority;
    /**
     * Enable/disable tracking
     *
     * @generated from field: bool enable_tracking = 2;
     */
    enableTracking: boolean;
    /**
     * Enable sandbox/test mode (don't actually send)
     *
     * @generated from field: bool sandbox_mode = 3;
     */
    sandboxMode: boolean;
    /**
     * Batch ID for grouping related emails
     *
     * @generated from field: string batch_id = 4;
     */
    batchId: string;
    /**
     * Request delivery receipt
     *
     * @generated from field: bool request_delivery_receipt = 5;
     */
    requestDeliveryReceipt: boolean;
    /**
     * Request read receipt
     *
     * @generated from field: bool request_read_receipt = 6;
     */
    requestReadReceipt: boolean;
    /**
     * Provider-specific send options as key-value pairs
     * Examples: "ip_pool": "marketing", "category": "transactional"
     *
     * @generated from field: map<string, string> provider_options = 10;
     */
    providerOptions: {
        [key: string]: string;
    };
    /**
     * Complex provider-specific send options
     *
     * @generated from field: map<string, google.protobuf.Any> extended_options = 11;
     */
    extendedOptions: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.email.v1.SendOptions.
 * Use `create(SendOptionsSchema)` to create a new message.
 */
export declare const SendOptionsSchema: GenMessage<SendOptions>;
/**
 * SendTemplatedEmailResponse contains the result of sending a templated email
 *
 * @generated from message integration.email.v1.SendTemplatedEmailResponse
 */
export type SendTemplatedEmailResponse = Message<"integration.email.v1.SendTemplatedEmailResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.TemplatedEmailResult data = 2;
     */
    data: TemplatedEmailResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.SendTemplatedEmailResponse.
 * Use `create(SendTemplatedEmailResponseSchema)` to create a new message.
 */
export declare const SendTemplatedEmailResponseSchema: GenMessage<SendTemplatedEmailResponse>;
/**
 * @generated from message integration.email.v1.TemplatedEmailResult
 */
export type TemplatedEmailResult = Message<"integration.email.v1.TemplatedEmailResult"> & {
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
 * Describes the message integration.email.v1.TemplatedEmailResult.
 * Use `create(TemplatedEmailResultSchema)` to create a new message.
 */
export declare const TemplatedEmailResultSchema: GenMessage<TemplatedEmailResult>;
/**
 * CreateTemplateRequest is a request to create a new email template
 *
 * @generated from message integration.email.v1.CreateTemplateRequest
 */
export type CreateTemplateRequest = Message<"integration.email.v1.CreateTemplateRequest"> & {
    /**
     * @generated from field: integration.email.v1.TemplateCreateData data = 1;
     */
    data?: TemplateCreateData;
};
/**
 * Describes the message integration.email.v1.CreateTemplateRequest.
 * Use `create(CreateTemplateRequestSchema)` to create a new message.
 */
export declare const CreateTemplateRequestSchema: GenMessage<CreateTemplateRequest>;
/**
 * @generated from message integration.email.v1.TemplateCreateData
 */
export type TemplateCreateData = Message<"integration.email.v1.TemplateCreateData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Template name
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Template description
     *
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * Template type
     *
     * @generated from field: integration.email.v1.TemplateType type = 4;
     */
    type: TemplateType;
    /**
     * Subject line template
     *
     * @generated from field: string subject = 5;
     */
    subject: string;
    /**
     * HTML body template
     *
     * @generated from field: string html_body = 6;
     */
    htmlBody: string;
    /**
     * Plain text body template
     *
     * @generated from field: string text_body = 7;
     */
    textBody: string;
    /**
     * Variable definitions
     *
     * @generated from field: repeated integration.email.v1.TemplateVariable variables = 8;
     */
    variables: TemplateVariable[];
    /**
     * Category for organization
     *
     * @generated from field: string category = 9;
     */
    category: string;
    /**
     * Tags
     *
     * @generated from field: repeated string tags = 10;
     */
    tags: string[];
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 11;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific settings
     *
     * @generated from field: map<string, string> provider_settings = 12;
     */
    providerSettings: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.email.v1.TemplateCreateData.
 * Use `create(TemplateCreateDataSchema)` to create a new message.
 */
export declare const TemplateCreateDataSchema: GenMessage<TemplateCreateData>;
/**
 * CreateTemplateResponse contains the created template
 *
 * @generated from message integration.email.v1.CreateTemplateResponse
 */
export type CreateTemplateResponse = Message<"integration.email.v1.CreateTemplateResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailTemplate data = 2;
     */
    data: EmailTemplate[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.CreateTemplateResponse.
 * Use `create(CreateTemplateResponseSchema)` to create a new message.
 */
export declare const CreateTemplateResponseSchema: GenMessage<CreateTemplateResponse>;
/**
 * UpdateTemplateRequest is a request to update an existing template
 *
 * @generated from message integration.email.v1.UpdateTemplateRequest
 */
export type UpdateTemplateRequest = Message<"integration.email.v1.UpdateTemplateRequest"> & {
    /**
     * @generated from field: integration.email.v1.TemplateUpdateData data = 1;
     */
    data?: TemplateUpdateData;
};
/**
 * Describes the message integration.email.v1.UpdateTemplateRequest.
 * Use `create(UpdateTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateTemplateRequestSchema: GenMessage<UpdateTemplateRequest>;
/**
 * @generated from message integration.email.v1.TemplateUpdateData
 */
export type TemplateUpdateData = Message<"integration.email.v1.TemplateUpdateData"> & {
    /**
     * Template ID to update
     *
     * @generated from field: string template_id = 1;
     */
    templateId: string;
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 2;
     */
    providerId: string;
    /**
     * Updated name (optional)
     *
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * Updated description (optional)
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * Updated subject (optional)
     *
     * @generated from field: string subject = 5;
     */
    subject: string;
    /**
     * Updated HTML body (optional)
     *
     * @generated from field: string html_body = 6;
     */
    htmlBody: string;
    /**
     * Updated text body (optional)
     *
     * @generated from field: string text_body = 7;
     */
    textBody: string;
    /**
     * Updated variables (optional)
     *
     * @generated from field: repeated integration.email.v1.TemplateVariable variables = 8;
     */
    variables: TemplateVariable[];
    /**
     * Updated metadata (optional)
     *
     * @generated from field: map<string, string> metadata = 9;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Whether to create a new version
     *
     * @generated from field: bool create_version = 10;
     */
    createVersion: boolean;
};
/**
 * Describes the message integration.email.v1.TemplateUpdateData.
 * Use `create(TemplateUpdateDataSchema)` to create a new message.
 */
export declare const TemplateUpdateDataSchema: GenMessage<TemplateUpdateData>;
/**
 * UpdateTemplateResponse contains the updated template
 *
 * @generated from message integration.email.v1.UpdateTemplateResponse
 */
export type UpdateTemplateResponse = Message<"integration.email.v1.UpdateTemplateResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailTemplate data = 2;
     */
    data: EmailTemplate[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.UpdateTemplateResponse.
 * Use `create(UpdateTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateTemplateResponseSchema: GenMessage<UpdateTemplateResponse>;
/**
 * GetTemplateRequest is a request to retrieve a template
 *
 * @generated from message integration.email.v1.GetTemplateRequest
 */
export type GetTemplateRequest = Message<"integration.email.v1.GetTemplateRequest"> & {
    /**
     * @generated from field: integration.email.v1.TemplateLookup data = 1;
     */
    data?: TemplateLookup;
};
/**
 * Describes the message integration.email.v1.GetTemplateRequest.
 * Use `create(GetTemplateRequestSchema)` to create a new message.
 */
export declare const GetTemplateRequestSchema: GenMessage<GetTemplateRequest>;
/**
 * @generated from message integration.email.v1.TemplateLookup
 */
export type TemplateLookup = Message<"integration.email.v1.TemplateLookup"> & {
    /**
     * Template ID
     *
     * @generated from field: string template_id = 1;
     */
    templateId: string;
    /**
     * Provider identifier (optional, for provider-hosted templates)
     *
     * @generated from field: string provider_id = 2;
     */
    providerId: string;
    /**
     * Include template history/versions
     *
     * @generated from field: bool include_versions = 3;
     */
    includeVersions: boolean;
};
/**
 * Describes the message integration.email.v1.TemplateLookup.
 * Use `create(TemplateLookupSchema)` to create a new message.
 */
export declare const TemplateLookupSchema: GenMessage<TemplateLookup>;
/**
 * GetTemplateResponse contains the requested template
 *
 * @generated from message integration.email.v1.GetTemplateResponse
 */
export type GetTemplateResponse = Message<"integration.email.v1.GetTemplateResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.TemplateWithVersions data = 2;
     */
    data: TemplateWithVersions[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.GetTemplateResponse.
 * Use `create(GetTemplateResponseSchema)` to create a new message.
 */
export declare const GetTemplateResponseSchema: GenMessage<GetTemplateResponse>;
/**
 * @generated from message integration.email.v1.TemplateWithVersions
 */
export type TemplateWithVersions = Message<"integration.email.v1.TemplateWithVersions"> & {
    /**
     * The requested template
     *
     * @generated from field: integration.email.v1.EmailTemplate template = 1;
     */
    template?: EmailTemplate;
    /**
     * Template versions (if requested)
     *
     * @generated from field: repeated integration.email.v1.EmailTemplate versions = 2;
     */
    versions: EmailTemplate[];
};
/**
 * Describes the message integration.email.v1.TemplateWithVersions.
 * Use `create(TemplateWithVersionsSchema)` to create a new message.
 */
export declare const TemplateWithVersionsSchema: GenMessage<TemplateWithVersions>;
/**
 * ListTemplatesRequest is a request to list email templates
 *
 * @generated from message integration.email.v1.ListTemplatesRequest
 */
export type ListTemplatesRequest = Message<"integration.email.v1.ListTemplatesRequest"> & {
    /**
     * @generated from field: integration.email.v1.TemplateListFilter data = 1;
     */
    data?: TemplateListFilter;
};
/**
 * Describes the message integration.email.v1.ListTemplatesRequest.
 * Use `create(ListTemplatesRequestSchema)` to create a new message.
 */
export declare const ListTemplatesRequestSchema: GenMessage<ListTemplatesRequest>;
/**
 * @generated from message integration.email.v1.TemplateListFilter
 */
export type TemplateListFilter = Message<"integration.email.v1.TemplateListFilter"> & {
    /**
     * Filter by provider ID
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Filter by category
     *
     * @generated from field: string category = 2;
     */
    category: string;
    /**
     * Filter by tags (templates must have all listed tags)
     *
     * @generated from field: repeated string tags = 3;
     */
    tags: string[];
    /**
     * Only return active templates
     *
     * @generated from field: bool active_only = 4;
     */
    activeOnly: boolean;
    /**
     * Template type filter
     *
     * @generated from field: integration.email.v1.TemplateType type = 5;
     */
    type: TemplateType;
    /**
     * Search query (searches name, description)
     *
     * @generated from field: string search_query = 6;
     */
    searchQuery: string;
    /**
     * Pagination offset
     *
     * @generated from field: int32 offset = 7;
     */
    offset: number;
    /**
     * Pagination limit
     *
     * @generated from field: int32 limit = 8;
     */
    limit: number;
    /**
     * Sort field
     *
     * @generated from field: string sort_by = 9;
     */
    sortBy: string;
    /**
     * Sort order
     *
     * @generated from field: integration.email.v1.SortOrder sort_order = 10;
     */
    sortOrder: SortOrder;
};
/**
 * Describes the message integration.email.v1.TemplateListFilter.
 * Use `create(TemplateListFilterSchema)` to create a new message.
 */
export declare const TemplateListFilterSchema: GenMessage<TemplateListFilter>;
/**
 * ListTemplatesResponse contains the list of templates
 *
 * @generated from message integration.email.v1.ListTemplatesResponse
 */
export type ListTemplatesResponse = Message<"integration.email.v1.ListTemplatesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.EmailTemplate data = 2;
     */
    data: EmailTemplate[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: int32 total_count = 4;
     */
    totalCount: number;
    /**
     * @generated from field: int32 offset = 5;
     */
    offset: number;
    /**
     * @generated from field: int32 limit = 6;
     */
    limit: number;
};
/**
 * Describes the message integration.email.v1.ListTemplatesResponse.
 * Use `create(ListTemplatesResponseSchema)` to create a new message.
 */
export declare const ListTemplatesResponseSchema: GenMessage<ListTemplatesResponse>;
/**
 * DeleteTemplateRequest is a request to delete a template
 *
 * @generated from message integration.email.v1.DeleteTemplateRequest
 */
export type DeleteTemplateRequest = Message<"integration.email.v1.DeleteTemplateRequest"> & {
    /**
     * @generated from field: integration.email.v1.TemplateDeleteData data = 1;
     */
    data?: TemplateDeleteData;
};
/**
 * Describes the message integration.email.v1.DeleteTemplateRequest.
 * Use `create(DeleteTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteTemplateRequestSchema: GenMessage<DeleteTemplateRequest>;
/**
 * @generated from message integration.email.v1.TemplateDeleteData
 */
export type TemplateDeleteData = Message<"integration.email.v1.TemplateDeleteData"> & {
    /**
     * Template ID to delete
     *
     * @generated from field: string template_id = 1;
     */
    templateId: string;
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 2;
     */
    providerId: string;
    /**
     * Whether to permanently delete (vs soft delete)
     *
     * @generated from field: bool permanent = 3;
     */
    permanent: boolean;
};
/**
 * Describes the message integration.email.v1.TemplateDeleteData.
 * Use `create(TemplateDeleteDataSchema)` to create a new message.
 */
export declare const TemplateDeleteDataSchema: GenMessage<TemplateDeleteData>;
/**
 * DeleteTemplateResponse confirms the deletion
 *
 * @generated from message integration.email.v1.DeleteTemplateResponse
 */
export type DeleteTemplateResponse = Message<"integration.email.v1.DeleteTemplateResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.email.v1.TemplateDeleteResult data = 2;
     */
    data: TemplateDeleteResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.email.v1.DeleteTemplateResponse.
 * Use `create(DeleteTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteTemplateResponseSchema: GenMessage<DeleteTemplateResponse>;
/**
 * @generated from message integration.email.v1.TemplateDeleteResult
 */
export type TemplateDeleteResult = Message<"integration.email.v1.TemplateDeleteResult"> & {
    /**
     * Confirmation message
     *
     * @generated from field: string message = 1;
     */
    message: string;
};
/**
 * Describes the message integration.email.v1.TemplateDeleteResult.
 * Use `create(TemplateDeleteResultSchema)` to create a new message.
 */
export declare const TemplateDeleteResultSchema: GenMessage<TemplateDeleteResult>;
/**
 * TemplateType represents the type of template
 *
 * @generated from enum integration.email.v1.TemplateType
 */
export declare enum TemplateType {
    /**
     * @generated from enum value: TEMPLATE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Template stored and rendered locally
     *
     * @generated from enum value: TEMPLATE_TYPE_LOCAL = 1;
     */
    LOCAL = 1,
    /**
     * Template hosted by email provider
     *
     * @generated from enum value: TEMPLATE_TYPE_PROVIDER = 2;
     */
    PROVIDER = 2,
    /**
     * Local template with provider-specific features
     *
     * @generated from enum value: TEMPLATE_TYPE_HYBRID = 3;
     */
    HYBRID = 3
}
/**
 * Describes the enum integration.email.v1.TemplateType.
 */
export declare const TemplateTypeSchema: GenEnum<TemplateType>;
/**
 * VariableType represents the data type of a template variable
 *
 * @generated from enum integration.email.v1.VariableType
 */
export declare enum VariableType {
    /**
     * @generated from enum value: VARIABLE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: VARIABLE_TYPE_STRING = 1;
     */
    STRING = 1,
    /**
     * @generated from enum value: VARIABLE_TYPE_NUMBER = 2;
     */
    NUMBER = 2,
    /**
     * @generated from enum value: VARIABLE_TYPE_BOOLEAN = 3;
     */
    BOOLEAN = 3,
    /**
     * @generated from enum value: VARIABLE_TYPE_DATE = 4;
     */
    DATE = 4,
    /**
     * @generated from enum value: VARIABLE_TYPE_DATETIME = 5;
     */
    DATETIME = 5,
    /**
     * @generated from enum value: VARIABLE_TYPE_URL = 6;
     */
    URL = 6,
    /**
     * @generated from enum value: VARIABLE_TYPE_EMAIL = 7;
     */
    EMAIL = 7,
    /**
     * Array of values
     *
     * @generated from enum value: VARIABLE_TYPE_ARRAY = 8;
     */
    ARRAY = 8,
    /**
     * Nested object
     *
     * @generated from enum value: VARIABLE_TYPE_OBJECT = 9;
     */
    OBJECT = 9
}
/**
 * Describes the enum integration.email.v1.VariableType.
 */
export declare const VariableTypeSchema: GenEnum<VariableType>;
/**
 * ValidationType represents types of variable validation
 *
 * @generated from enum integration.email.v1.ValidationType
 */
export declare enum ValidationType {
    /**
     * @generated from enum value: VALIDATION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Regular expression pattern
     *
     * @generated from enum value: VALIDATION_TYPE_REGEX = 1;
     */
    REGEX = 1,
    /**
     * Minimum string length
     *
     * @generated from enum value: VALIDATION_TYPE_MIN_LENGTH = 2;
     */
    MIN_LENGTH = 2,
    /**
     * Maximum string length
     *
     * @generated from enum value: VALIDATION_TYPE_MAX_LENGTH = 3;
     */
    MAX_LENGTH = 3,
    /**
     * Minimum numeric value
     *
     * @generated from enum value: VALIDATION_TYPE_MIN_VALUE = 4;
     */
    MIN_VALUE = 4,
    /**
     * Maximum numeric value
     *
     * @generated from enum value: VALIDATION_TYPE_MAX_VALUE = 5;
     */
    MAX_VALUE = 5,
    /**
     * Valid email format
     *
     * @generated from enum value: VALIDATION_TYPE_EMAIL = 6;
     */
    EMAIL = 6,
    /**
     * Valid URL format
     *
     * @generated from enum value: VALIDATION_TYPE_URL = 7;
     */
    URL = 7,
    /**
     * Value must be in allowed list
     *
     * @generated from enum value: VALIDATION_TYPE_ENUM = 8;
     */
    ENUM = 8
}
/**
 * Describes the enum integration.email.v1.ValidationType.
 */
export declare const ValidationTypeSchema: GenEnum<ValidationType>;
/**
 * SortOrder represents sort direction
 *
 * @generated from enum integration.email.v1.SortOrder
 */
export declare enum SortOrder {
    /**
     * @generated from enum value: SORT_ORDER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SORT_ORDER_ASC = 1;
     */
    ASC = 1,
    /**
     * @generated from enum value: SORT_ORDER_DESC = 2;
     */
    DESC = 2
}
/**
 * Describes the enum integration.email.v1.SortOrder.
 */
export declare const SortOrderSchema: GenEnum<SortOrder>;
