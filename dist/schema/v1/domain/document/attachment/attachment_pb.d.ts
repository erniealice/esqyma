import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/document/attachment/attachment.proto.
 */
export declare const file_domain_document_attachment_attachment: GenFile;
/**
 * @generated from message domain.document.v1.Attachment
 */
export type Attachment = Message<"domain.document.v1.Attachment"> & {
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
     * Polymorphic reference — module_key identifies the source table
     * e.g. "product", "client", "subscription", "asset"
     *
     * @generated from field: string module_key = 7;
     */
    moduleKey: string;
    /**
     * Foreign key — the entity ID this attachment belongs to
     *
     * @generated from field: string foreign_key = 8;
     */
    foreignKey: string;
    /**
     * File metadata
     *
     * original filename
     *
     * @generated from field: string name = 9;
     */
    name: string;
    /**
     * user-provided description
     *
     * @generated from field: optional string description = 10;
     */
    description?: string;
    /**
     * @generated from field: optional string workspace_id = 11;
     */
    workspaceId?: string;
    /**
     * bucket/container name
     *
     * @generated from field: optional string storage_container = 12;
     */
    storageContainer?: string;
    /**
     * full object path in storage
     *
     * @generated from field: optional string storage_key = 13;
     */
    storageKey?: string;
    /**
     * MIME type (e.g. "application/pdf")
     *
     * @generated from field: optional string content_type = 14;
     */
    contentType?: string;
    /**
     * @generated from field: optional int64 file_size_bytes = 15;
     */
    fileSizeBytes?: bigint;
    /**
     * @generated from field: optional string created_by = 16;
     */
    createdBy?: string;
    /**
     * @generated from field: string status = 17;
     */
    status: string;
};
/**
 * Describes the message domain.document.v1.Attachment.
 * Use `create(AttachmentSchema)` to create a new message.
 */
export declare const AttachmentSchema: GenMessage<Attachment>;
/**
 * @generated from message domain.document.v1.CreateAttachmentRequest
 */
export type CreateAttachmentRequest = Message<"domain.document.v1.CreateAttachmentRequest"> & {
    /**
     * @generated from field: domain.document.v1.Attachment data = 1;
     */
    data?: Attachment;
};
/**
 * Describes the message domain.document.v1.CreateAttachmentRequest.
 * Use `create(CreateAttachmentRequestSchema)` to create a new message.
 */
export declare const CreateAttachmentRequestSchema: GenMessage<CreateAttachmentRequest>;
/**
 * @generated from message domain.document.v1.CreateAttachmentResponse
 */
export type CreateAttachmentResponse = Message<"domain.document.v1.CreateAttachmentResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.Attachment data = 1;
     */
    data: Attachment[];
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
 * Describes the message domain.document.v1.CreateAttachmentResponse.
 * Use `create(CreateAttachmentResponseSchema)` to create a new message.
 */
export declare const CreateAttachmentResponseSchema: GenMessage<CreateAttachmentResponse>;
/**
 * @generated from message domain.document.v1.ReadAttachmentRequest
 */
export type ReadAttachmentRequest = Message<"domain.document.v1.ReadAttachmentRequest"> & {
    /**
     * @generated from field: domain.document.v1.Attachment data = 1;
     */
    data?: Attachment;
};
/**
 * Describes the message domain.document.v1.ReadAttachmentRequest.
 * Use `create(ReadAttachmentRequestSchema)` to create a new message.
 */
export declare const ReadAttachmentRequestSchema: GenMessage<ReadAttachmentRequest>;
/**
 * @generated from message domain.document.v1.ReadAttachmentResponse
 */
export type ReadAttachmentResponse = Message<"domain.document.v1.ReadAttachmentResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.Attachment data = 1;
     */
    data: Attachment[];
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
 * Describes the message domain.document.v1.ReadAttachmentResponse.
 * Use `create(ReadAttachmentResponseSchema)` to create a new message.
 */
export declare const ReadAttachmentResponseSchema: GenMessage<ReadAttachmentResponse>;
/**
 * @generated from message domain.document.v1.UpdateAttachmentRequest
 */
export type UpdateAttachmentRequest = Message<"domain.document.v1.UpdateAttachmentRequest"> & {
    /**
     * @generated from field: domain.document.v1.Attachment data = 1;
     */
    data?: Attachment;
};
/**
 * Describes the message domain.document.v1.UpdateAttachmentRequest.
 * Use `create(UpdateAttachmentRequestSchema)` to create a new message.
 */
export declare const UpdateAttachmentRequestSchema: GenMessage<UpdateAttachmentRequest>;
/**
 * @generated from message domain.document.v1.UpdateAttachmentResponse
 */
export type UpdateAttachmentResponse = Message<"domain.document.v1.UpdateAttachmentResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.Attachment data = 1;
     */
    data: Attachment[];
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
 * Describes the message domain.document.v1.UpdateAttachmentResponse.
 * Use `create(UpdateAttachmentResponseSchema)` to create a new message.
 */
export declare const UpdateAttachmentResponseSchema: GenMessage<UpdateAttachmentResponse>;
/**
 * @generated from message domain.document.v1.DeleteAttachmentRequest
 */
export type DeleteAttachmentRequest = Message<"domain.document.v1.DeleteAttachmentRequest"> & {
    /**
     * @generated from field: domain.document.v1.Attachment data = 1;
     */
    data?: Attachment;
};
/**
 * Describes the message domain.document.v1.DeleteAttachmentRequest.
 * Use `create(DeleteAttachmentRequestSchema)` to create a new message.
 */
export declare const DeleteAttachmentRequestSchema: GenMessage<DeleteAttachmentRequest>;
/**
 * @generated from message domain.document.v1.DeleteAttachmentResponse
 */
export type DeleteAttachmentResponse = Message<"domain.document.v1.DeleteAttachmentResponse"> & {
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
 * Describes the message domain.document.v1.DeleteAttachmentResponse.
 * Use `create(DeleteAttachmentResponseSchema)` to create a new message.
 */
export declare const DeleteAttachmentResponseSchema: GenMessage<DeleteAttachmentResponse>;
/**
 * @generated from message domain.document.v1.ListAttachmentsRequest
 */
export type ListAttachmentsRequest = Message<"domain.document.v1.ListAttachmentsRequest"> & {
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
 * Describes the message domain.document.v1.ListAttachmentsRequest.
 * Use `create(ListAttachmentsRequestSchema)` to create a new message.
 */
export declare const ListAttachmentsRequestSchema: GenMessage<ListAttachmentsRequest>;
/**
 * @generated from message domain.document.v1.ListAttachmentsResponse
 */
export type ListAttachmentsResponse = Message<"domain.document.v1.ListAttachmentsResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.Attachment data = 1;
     */
    data: Attachment[];
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
 * Describes the message domain.document.v1.ListAttachmentsResponse.
 * Use `create(ListAttachmentsResponseSchema)` to create a new message.
 */
export declare const ListAttachmentsResponseSchema: GenMessage<ListAttachmentsResponse>;
/**
 * @generated from service domain.document.v1.AttachmentDomainService
 */
export declare const AttachmentDomainService: GenService<{
    /**
     * @generated from rpc domain.document.v1.AttachmentDomainService.CreateAttachment
     */
    createAttachment: {
        methodKind: "unary";
        input: typeof CreateAttachmentRequestSchema;
        output: typeof CreateAttachmentResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.AttachmentDomainService.ReadAttachment
     */
    readAttachment: {
        methodKind: "unary";
        input: typeof ReadAttachmentRequestSchema;
        output: typeof ReadAttachmentResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.AttachmentDomainService.UpdateAttachment
     */
    updateAttachment: {
        methodKind: "unary";
        input: typeof UpdateAttachmentRequestSchema;
        output: typeof UpdateAttachmentResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.AttachmentDomainService.DeleteAttachment
     */
    deleteAttachment: {
        methodKind: "unary";
        input: typeof DeleteAttachmentRequestSchema;
        output: typeof DeleteAttachmentResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.AttachmentDomainService.ListAttachments
     */
    listAttachments: {
        methodKind: "unary";
        input: typeof ListAttachmentsRequestSchema;
        output: typeof ListAttachmentsResponseSchema;
    };
}>;
