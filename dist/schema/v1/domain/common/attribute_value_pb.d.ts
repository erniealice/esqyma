import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "./error_pb";
import type { PaginationRequest, PaginationResponse } from "./pagination_pb";
import type { FilterRequest } from "./filter_pb";
import type { SortRequest } from "./sort_pb";
import type { SearchRequest, SearchResult } from "./search_pb";
import type { Attribute } from "./attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/attribute_value.proto.
 */
export declare const file_domain_common_attribute_value: GenFile;
/**
 * @generated from message domain.common.v1.AttributeValue
 */
export type AttributeValue = Message<"domain.common.v1.AttributeValue"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string attribute_id = 2;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 3;
     */
    value: string;
    /**
     * @generated from field: int32 sort_order = 4;
     */
    sortOrder: number;
    /**
     * @generated from field: bool active = 5;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 7;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 8;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 9;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 10;
     */
    attribute?: Attribute;
};
/**
 * Describes the message domain.common.v1.AttributeValue.
 * Use `create(AttributeValueSchema)` to create a new message.
 */
export declare const AttributeValueSchema: GenMessage<AttributeValue>;
/**
 * @generated from message domain.common.v1.CreateAttributeValueRequest
 */
export type CreateAttributeValueRequest = Message<"domain.common.v1.CreateAttributeValueRequest"> & {
    /**
     * @generated from field: domain.common.v1.AttributeValue data = 1;
     */
    data?: AttributeValue;
};
/**
 * Describes the message domain.common.v1.CreateAttributeValueRequest.
 * Use `create(CreateAttributeValueRequestSchema)` to create a new message.
 */
export declare const CreateAttributeValueRequestSchema: GenMessage<CreateAttributeValueRequest>;
/**
 * @generated from message domain.common.v1.CreateAttributeValueResponse
 */
export type CreateAttributeValueResponse = Message<"domain.common.v1.CreateAttributeValueResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue data = 1;
     */
    data: AttributeValue[];
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
 * Describes the message domain.common.v1.CreateAttributeValueResponse.
 * Use `create(CreateAttributeValueResponseSchema)` to create a new message.
 */
export declare const CreateAttributeValueResponseSchema: GenMessage<CreateAttributeValueResponse>;
/**
 * @generated from message domain.common.v1.CreateAttributeValueBatchRequest
 */
export type CreateAttributeValueBatchRequest = Message<"domain.common.v1.CreateAttributeValueBatchRequest"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue data = 1;
     */
    data: AttributeValue[];
};
/**
 * Describes the message domain.common.v1.CreateAttributeValueBatchRequest.
 * Use `create(CreateAttributeValueBatchRequestSchema)` to create a new message.
 */
export declare const CreateAttributeValueBatchRequestSchema: GenMessage<CreateAttributeValueBatchRequest>;
/**
 * @generated from message domain.common.v1.CreateAttributeValueBatchResponse
 */
export type CreateAttributeValueBatchResponse = Message<"domain.common.v1.CreateAttributeValueBatchResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue data = 1;
     */
    data: AttributeValue[];
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
 * Describes the message domain.common.v1.CreateAttributeValueBatchResponse.
 * Use `create(CreateAttributeValueBatchResponseSchema)` to create a new message.
 */
export declare const CreateAttributeValueBatchResponseSchema: GenMessage<CreateAttributeValueBatchResponse>;
/**
 * @generated from message domain.common.v1.ReadAttributeValueRequest
 */
export type ReadAttributeValueRequest = Message<"domain.common.v1.ReadAttributeValueRequest"> & {
    /**
     * @generated from field: domain.common.v1.AttributeValue data = 1;
     */
    data?: AttributeValue;
};
/**
 * Describes the message domain.common.v1.ReadAttributeValueRequest.
 * Use `create(ReadAttributeValueRequestSchema)` to create a new message.
 */
export declare const ReadAttributeValueRequestSchema: GenMessage<ReadAttributeValueRequest>;
/**
 * @generated from message domain.common.v1.ReadAttributeValueResponse
 */
export type ReadAttributeValueResponse = Message<"domain.common.v1.ReadAttributeValueResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue data = 1;
     */
    data: AttributeValue[];
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
 * Describes the message domain.common.v1.ReadAttributeValueResponse.
 * Use `create(ReadAttributeValueResponseSchema)` to create a new message.
 */
export declare const ReadAttributeValueResponseSchema: GenMessage<ReadAttributeValueResponse>;
/**
 * @generated from message domain.common.v1.UpdateAttributeValueRequest
 */
export type UpdateAttributeValueRequest = Message<"domain.common.v1.UpdateAttributeValueRequest"> & {
    /**
     * @generated from field: domain.common.v1.AttributeValue data = 1;
     */
    data?: AttributeValue;
};
/**
 * Describes the message domain.common.v1.UpdateAttributeValueRequest.
 * Use `create(UpdateAttributeValueRequestSchema)` to create a new message.
 */
export declare const UpdateAttributeValueRequestSchema: GenMessage<UpdateAttributeValueRequest>;
/**
 * @generated from message domain.common.v1.UpdateAttributeValueResponse
 */
export type UpdateAttributeValueResponse = Message<"domain.common.v1.UpdateAttributeValueResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue data = 1;
     */
    data: AttributeValue[];
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
 * Describes the message domain.common.v1.UpdateAttributeValueResponse.
 * Use `create(UpdateAttributeValueResponseSchema)` to create a new message.
 */
export declare const UpdateAttributeValueResponseSchema: GenMessage<UpdateAttributeValueResponse>;
/**
 * @generated from message domain.common.v1.DeleteAttributeValueRequest
 */
export type DeleteAttributeValueRequest = Message<"domain.common.v1.DeleteAttributeValueRequest"> & {
    /**
     * @generated from field: domain.common.v1.AttributeValue data = 1;
     */
    data?: AttributeValue;
};
/**
 * Describes the message domain.common.v1.DeleteAttributeValueRequest.
 * Use `create(DeleteAttributeValueRequestSchema)` to create a new message.
 */
export declare const DeleteAttributeValueRequestSchema: GenMessage<DeleteAttributeValueRequest>;
/**
 * @generated from message domain.common.v1.DeleteAttributeValueResponse
 */
export type DeleteAttributeValueResponse = Message<"domain.common.v1.DeleteAttributeValueResponse"> & {
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
 * Describes the message domain.common.v1.DeleteAttributeValueResponse.
 * Use `create(DeleteAttributeValueResponseSchema)` to create a new message.
 */
export declare const DeleteAttributeValueResponseSchema: GenMessage<DeleteAttributeValueResponse>;
/**
 * @generated from message domain.common.v1.ListAttributeValuesRequest
 */
export type ListAttributeValuesRequest = Message<"domain.common.v1.ListAttributeValuesRequest"> & {
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
 * Describes the message domain.common.v1.ListAttributeValuesRequest.
 * Use `create(ListAttributeValuesRequestSchema)` to create a new message.
 */
export declare const ListAttributeValuesRequestSchema: GenMessage<ListAttributeValuesRequest>;
/**
 * @generated from message domain.common.v1.ListAttributeValuesResponse
 */
export type ListAttributeValuesResponse = Message<"domain.common.v1.ListAttributeValuesResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue data = 1;
     */
    data: AttributeValue[];
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
 * Describes the message domain.common.v1.ListAttributeValuesResponse.
 * Use `create(ListAttributeValuesResponseSchema)` to create a new message.
 */
export declare const ListAttributeValuesResponseSchema: GenMessage<ListAttributeValuesResponse>;
/**
 * @generated from message domain.common.v1.GetAttributeValueListPageDataRequest
 */
export type GetAttributeValueListPageDataRequest = Message<"domain.common.v1.GetAttributeValueListPageDataRequest"> & {
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
 * Describes the message domain.common.v1.GetAttributeValueListPageDataRequest.
 * Use `create(GetAttributeValueListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAttributeValueListPageDataRequestSchema: GenMessage<GetAttributeValueListPageDataRequest>;
/**
 * @generated from message domain.common.v1.GetAttributeValueListPageDataResponse
 */
export type GetAttributeValueListPageDataResponse = Message<"domain.common.v1.GetAttributeValueListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.common.v1.AttributeValue attribute_value_list = 1;
     */
    attributeValueList: AttributeValue[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.common.v1.GetAttributeValueListPageDataResponse.
 * Use `create(GetAttributeValueListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAttributeValueListPageDataResponseSchema: GenMessage<GetAttributeValueListPageDataResponse>;
/**
 * @generated from message domain.common.v1.GetAttributeValueItemPageDataRequest
 */
export type GetAttributeValueItemPageDataRequest = Message<"domain.common.v1.GetAttributeValueItemPageDataRequest"> & {
    /**
     * @generated from field: string attribute_value_id = 1;
     */
    attributeValueId: string;
};
/**
 * Describes the message domain.common.v1.GetAttributeValueItemPageDataRequest.
 * Use `create(GetAttributeValueItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAttributeValueItemPageDataRequestSchema: GenMessage<GetAttributeValueItemPageDataRequest>;
/**
 * @generated from message domain.common.v1.GetAttributeValueItemPageDataResponse
 */
export type GetAttributeValueItemPageDataResponse = Message<"domain.common.v1.GetAttributeValueItemPageDataResponse"> & {
    /**
     * @generated from field: domain.common.v1.AttributeValue attribute_value = 1;
     */
    attributeValue?: AttributeValue;
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
 * Describes the message domain.common.v1.GetAttributeValueItemPageDataResponse.
 * Use `create(GetAttributeValueItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAttributeValueItemPageDataResponseSchema: GenMessage<GetAttributeValueItemPageDataResponse>;
/**
 * @generated from service domain.common.v1.AttributeValueDomainService
 */
export declare const AttributeValueDomainService: GenService<{
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.CreateAttributeValue
     */
    createAttributeValue: {
        methodKind: "unary";
        input: typeof CreateAttributeValueRequestSchema;
        output: typeof CreateAttributeValueResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.ReadAttributeValue
     */
    readAttributeValue: {
        methodKind: "unary";
        input: typeof ReadAttributeValueRequestSchema;
        output: typeof ReadAttributeValueResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.UpdateAttributeValue
     */
    updateAttributeValue: {
        methodKind: "unary";
        input: typeof UpdateAttributeValueRequestSchema;
        output: typeof UpdateAttributeValueResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.DeleteAttributeValue
     */
    deleteAttributeValue: {
        methodKind: "unary";
        input: typeof DeleteAttributeValueRequestSchema;
        output: typeof DeleteAttributeValueResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.ListAttributeValues
     */
    listAttributeValues: {
        methodKind: "unary";
        input: typeof ListAttributeValuesRequestSchema;
        output: typeof ListAttributeValuesResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.GetAttributeValueListPageData
     */
    getAttributeValueListPageData: {
        methodKind: "unary";
        input: typeof GetAttributeValueListPageDataRequestSchema;
        output: typeof GetAttributeValueListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.common.v1.AttributeValueDomainService.GetAttributeValueItemPageData
     */
    getAttributeValueItemPageData: {
        methodKind: "unary";
        input: typeof GetAttributeValueItemPageDataRequestSchema;
        output: typeof GetAttributeValueItemPageDataResponseSchema;
    };
}>;
