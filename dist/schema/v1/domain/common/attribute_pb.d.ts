import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "./error_pb";
import type { FilterRequest } from "./filter_pb";
import type { PaginationRequest } from "./pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/attribute.proto.
 */
export declare const file_domain_common_attribute: GenFile;
/**
 * @generated from message domain.common.v1.Attribute
 */
export type Attribute = Message<"domain.common.v1.Attribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * @generated from field: string code = 4;
     */
    code: string;
    /**
     * @generated from field: string data_type = 5;
     */
    dataType: string;
    /**
     * @generated from field: string module = 6;
     */
    module: string;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.common.v1.Attribute.
 * Use `create(AttributeSchema)` to create a new message.
 */
export declare const AttributeSchema: GenMessage<Attribute>;
/**
 * AttributeCodeValue represents an attribute by its code and value.
 * Used for code-based attribute creation where the code is resolved to an ID internally.
 *
 * @generated from message domain.common.v1.AttributeCodeValue
 */
export type AttributeCodeValue = Message<"domain.common.v1.AttributeCodeValue"> & {
    /**
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     * @generated from field: string value = 2;
     */
    value: string;
};
/**
 * Describes the message domain.common.v1.AttributeCodeValue.
 * Use `create(AttributeCodeValueSchema)` to create a new message.
 */
export declare const AttributeCodeValueSchema: GenMessage<AttributeCodeValue>;
/**
 * @generated from message domain.common.v1.CreateAttributeRequest
 */
export type CreateAttributeRequest = Message<"domain.common.v1.CreateAttributeRequest"> & {
    /**
     * @generated from field: domain.common.v1.Attribute data = 1;
     */
    data?: Attribute;
};
/**
 * Describes the message domain.common.v1.CreateAttributeRequest.
 * Use `create(CreateAttributeRequestSchema)` to create a new message.
 */
export declare const CreateAttributeRequestSchema: GenMessage<CreateAttributeRequest>;
/**
 * @generated from message domain.common.v1.CreateAttributeResponse
 */
export type CreateAttributeResponse = Message<"domain.common.v1.CreateAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Attribute data = 1;
     */
    data: Attribute[];
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
 * Describes the message domain.common.v1.CreateAttributeResponse.
 * Use `create(CreateAttributeResponseSchema)` to create a new message.
 */
export declare const CreateAttributeResponseSchema: GenMessage<CreateAttributeResponse>;
/**
 * @generated from message domain.common.v1.ReadAttributeRequest
 */
export type ReadAttributeRequest = Message<"domain.common.v1.ReadAttributeRequest"> & {
    /**
     * @generated from field: domain.common.v1.Attribute data = 1;
     */
    data?: Attribute;
};
/**
 * Describes the message domain.common.v1.ReadAttributeRequest.
 * Use `create(ReadAttributeRequestSchema)` to create a new message.
 */
export declare const ReadAttributeRequestSchema: GenMessage<ReadAttributeRequest>;
/**
 * @generated from message domain.common.v1.ReadAttributeResponse
 */
export type ReadAttributeResponse = Message<"domain.common.v1.ReadAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Attribute data = 1;
     */
    data: Attribute[];
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
 * Describes the message domain.common.v1.ReadAttributeResponse.
 * Use `create(ReadAttributeResponseSchema)` to create a new message.
 */
export declare const ReadAttributeResponseSchema: GenMessage<ReadAttributeResponse>;
/**
 * @generated from message domain.common.v1.UpdateAttributeRequest
 */
export type UpdateAttributeRequest = Message<"domain.common.v1.UpdateAttributeRequest"> & {
    /**
     * @generated from field: domain.common.v1.Attribute data = 1;
     */
    data?: Attribute;
};
/**
 * Describes the message domain.common.v1.UpdateAttributeRequest.
 * Use `create(UpdateAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateAttributeRequestSchema: GenMessage<UpdateAttributeRequest>;
/**
 * @generated from message domain.common.v1.UpdateAttributeResponse
 */
export type UpdateAttributeResponse = Message<"domain.common.v1.UpdateAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Attribute data = 1;
     */
    data: Attribute[];
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
 * Describes the message domain.common.v1.UpdateAttributeResponse.
 * Use `create(UpdateAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateAttributeResponseSchema: GenMessage<UpdateAttributeResponse>;
/**
 * @generated from message domain.common.v1.DeleteAttributeRequest
 */
export type DeleteAttributeRequest = Message<"domain.common.v1.DeleteAttributeRequest"> & {
    /**
     * @generated from field: domain.common.v1.Attribute data = 1;
     */
    data?: Attribute;
};
/**
 * Describes the message domain.common.v1.DeleteAttributeRequest.
 * Use `create(DeleteAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteAttributeRequestSchema: GenMessage<DeleteAttributeRequest>;
/**
 * @generated from message domain.common.v1.DeleteAttributeResponse
 */
export type DeleteAttributeResponse = Message<"domain.common.v1.DeleteAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Attribute data = 1;
     */
    data: Attribute[];
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
 * Describes the message domain.common.v1.DeleteAttributeResponse.
 * Use `create(DeleteAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteAttributeResponseSchema: GenMessage<DeleteAttributeResponse>;
/**
 * @generated from message domain.common.v1.ListAttributesRequest
 */
export type ListAttributesRequest = Message<"domain.common.v1.ListAttributesRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 1;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 2;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.common.v1.ListAttributesRequest.
 * Use `create(ListAttributesRequestSchema)` to create a new message.
 */
export declare const ListAttributesRequestSchema: GenMessage<ListAttributesRequest>;
/**
 * @generated from message domain.common.v1.ListAttributesResponse
 */
export type ListAttributesResponse = Message<"domain.common.v1.ListAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.Attribute data = 1;
     */
    data: Attribute[];
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
 * Describes the message domain.common.v1.ListAttributesResponse.
 * Use `create(ListAttributesResponseSchema)` to create a new message.
 */
export declare const ListAttributesResponseSchema: GenMessage<ListAttributesResponse>;
/**
 * @generated from service domain.common.v1.AttributeDomainService
 */
export declare const AttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.common.v1.AttributeDomainService.CreateAttribute
     */
    createAttribute: {
        methodKind: "unary";
        input: typeof CreateAttributeRequestSchema;
        output: typeof CreateAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeDomainService.ReadAttribute
     */
    readAttribute: {
        methodKind: "unary";
        input: typeof ReadAttributeRequestSchema;
        output: typeof ReadAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeDomainService.UpdateAttribute
     */
    updateAttribute: {
        methodKind: "unary";
        input: typeof UpdateAttributeRequestSchema;
        output: typeof UpdateAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeDomainService.DeleteAttribute
     */
    deleteAttribute: {
        methodKind: "unary";
        input: typeof DeleteAttributeRequestSchema;
        output: typeof DeleteAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeDomainService.ListAttributes
     */
    listAttributes: {
        methodKind: "unary";
        input: typeof ListAttributesRequestSchema;
        output: typeof ListAttributesResponseSchema;
    };
}>;
