import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/document/template/template.proto.
 */
export declare const file_domain_document_template_template: GenFile;
/**
 * @generated from message domain.document.v1.DocumentTemplate
 */
export type DocumentTemplate = Message<"domain.document.v1.DocumentTemplate"> & {
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
     * @generated from field: optional string workspace_id = 9;
     */
    workspaceId?: string;
    /**
     * @generated from field: string template_type = 10;
     */
    templateType: string;
    /**
     * @generated from field: string document_purpose = 11;
     */
    documentPurpose: string;
    /**
     * @generated from field: optional string storage_container = 12;
     */
    storageContainer?: string;
    /**
     * @generated from field: optional string storage_key = 13;
     */
    storageKey?: string;
    /**
     * @generated from field: optional string original_filename = 14;
     */
    originalFilename?: string;
    /**
     * @generated from field: optional int64 file_size_bytes = 15;
     */
    fileSizeBytes?: bigint;
    /**
     * @generated from field: optional bool is_default = 16;
     */
    isDefault?: boolean;
    /**
     * @generated from field: optional string created_by = 17;
     */
    createdBy?: string;
    /**
     * @generated from field: string status = 18;
     */
    status: string;
    /**
     * Domain module discriminator — scopes template to a business module
     * e.g. "revenue", "expenditure", "subscription"
     *
     * @generated from field: optional string module_key = 19;
     */
    moduleKey?: string;
};
/**
 * Describes the message domain.document.v1.DocumentTemplate.
 * Use `create(DocumentTemplateSchema)` to create a new message.
 */
export declare const DocumentTemplateSchema: GenMessage<DocumentTemplate>;
/**
 * @generated from message domain.document.v1.CreateDocumentTemplateRequest
 */
export type CreateDocumentTemplateRequest = Message<"domain.document.v1.CreateDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.document.v1.DocumentTemplate data = 1;
     */
    data?: DocumentTemplate;
};
/**
 * Describes the message domain.document.v1.CreateDocumentTemplateRequest.
 * Use `create(CreateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const CreateDocumentTemplateRequestSchema: GenMessage<CreateDocumentTemplateRequest>;
/**
 * @generated from message domain.document.v1.CreateDocumentTemplateResponse
 */
export type CreateDocumentTemplateResponse = Message<"domain.document.v1.CreateDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.DocumentTemplate data = 1;
     */
    data: DocumentTemplate[];
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
 * Describes the message domain.document.v1.CreateDocumentTemplateResponse.
 * Use `create(CreateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const CreateDocumentTemplateResponseSchema: GenMessage<CreateDocumentTemplateResponse>;
/**
 * @generated from message domain.document.v1.ReadDocumentTemplateRequest
 */
export type ReadDocumentTemplateRequest = Message<"domain.document.v1.ReadDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.document.v1.DocumentTemplate data = 1;
     */
    data?: DocumentTemplate;
};
/**
 * Describes the message domain.document.v1.ReadDocumentTemplateRequest.
 * Use `create(ReadDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const ReadDocumentTemplateRequestSchema: GenMessage<ReadDocumentTemplateRequest>;
/**
 * @generated from message domain.document.v1.ReadDocumentTemplateResponse
 */
export type ReadDocumentTemplateResponse = Message<"domain.document.v1.ReadDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.DocumentTemplate data = 1;
     */
    data: DocumentTemplate[];
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
 * Describes the message domain.document.v1.ReadDocumentTemplateResponse.
 * Use `create(ReadDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const ReadDocumentTemplateResponseSchema: GenMessage<ReadDocumentTemplateResponse>;
/**
 * @generated from message domain.document.v1.UpdateDocumentTemplateRequest
 */
export type UpdateDocumentTemplateRequest = Message<"domain.document.v1.UpdateDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.document.v1.DocumentTemplate data = 1;
     */
    data?: DocumentTemplate;
};
/**
 * Describes the message domain.document.v1.UpdateDocumentTemplateRequest.
 * Use `create(UpdateDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateDocumentTemplateRequestSchema: GenMessage<UpdateDocumentTemplateRequest>;
/**
 * @generated from message domain.document.v1.UpdateDocumentTemplateResponse
 */
export type UpdateDocumentTemplateResponse = Message<"domain.document.v1.UpdateDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.DocumentTemplate data = 1;
     */
    data: DocumentTemplate[];
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
 * Describes the message domain.document.v1.UpdateDocumentTemplateResponse.
 * Use `create(UpdateDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateDocumentTemplateResponseSchema: GenMessage<UpdateDocumentTemplateResponse>;
/**
 * @generated from message domain.document.v1.DeleteDocumentTemplateRequest
 */
export type DeleteDocumentTemplateRequest = Message<"domain.document.v1.DeleteDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.document.v1.DocumentTemplate data = 1;
     */
    data?: DocumentTemplate;
};
/**
 * Describes the message domain.document.v1.DeleteDocumentTemplateRequest.
 * Use `create(DeleteDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteDocumentTemplateRequestSchema: GenMessage<DeleteDocumentTemplateRequest>;
/**
 * @generated from message domain.document.v1.DeleteDocumentTemplateResponse
 */
export type DeleteDocumentTemplateResponse = Message<"domain.document.v1.DeleteDocumentTemplateResponse"> & {
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
 * Describes the message domain.document.v1.DeleteDocumentTemplateResponse.
 * Use `create(DeleteDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteDocumentTemplateResponseSchema: GenMessage<DeleteDocumentTemplateResponse>;
/**
 * @generated from message domain.document.v1.ListDocumentTemplatesRequest
 */
export type ListDocumentTemplatesRequest = Message<"domain.document.v1.ListDocumentTemplatesRequest"> & {
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
 * Describes the message domain.document.v1.ListDocumentTemplatesRequest.
 * Use `create(ListDocumentTemplatesRequestSchema)` to create a new message.
 */
export declare const ListDocumentTemplatesRequestSchema: GenMessage<ListDocumentTemplatesRequest>;
/**
 * @generated from message domain.document.v1.ListDocumentTemplatesResponse
 */
export type ListDocumentTemplatesResponse = Message<"domain.document.v1.ListDocumentTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.document.v1.DocumentTemplate data = 1;
     */
    data: DocumentTemplate[];
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
 * Describes the message domain.document.v1.ListDocumentTemplatesResponse.
 * Use `create(ListDocumentTemplatesResponseSchema)` to create a new message.
 */
export declare const ListDocumentTemplatesResponseSchema: GenMessage<ListDocumentTemplatesResponse>;
/**
 * @generated from service domain.document.v1.DocumentTemplateDomainService
 */
export declare const DocumentTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.document.v1.DocumentTemplateDomainService.CreateDocumentTemplate
     */
    createDocumentTemplate: {
        methodKind: "unary";
        input: typeof CreateDocumentTemplateRequestSchema;
        output: typeof CreateDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.DocumentTemplateDomainService.ReadDocumentTemplate
     */
    readDocumentTemplate: {
        methodKind: "unary";
        input: typeof ReadDocumentTemplateRequestSchema;
        output: typeof ReadDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.DocumentTemplateDomainService.UpdateDocumentTemplate
     */
    updateDocumentTemplate: {
        methodKind: "unary";
        input: typeof UpdateDocumentTemplateRequestSchema;
        output: typeof UpdateDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.DocumentTemplateDomainService.DeleteDocumentTemplate
     */
    deleteDocumentTemplate: {
        methodKind: "unary";
        input: typeof DeleteDocumentTemplateRequestSchema;
        output: typeof DeleteDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.document.v1.DocumentTemplateDomainService.ListDocumentTemplates
     */
    listDocumentTemplates: {
        methodKind: "unary";
        input: typeof ListDocumentTemplatesRequestSchema;
        output: typeof ListDocumentTemplatesResponseSchema;
    };
}>;
