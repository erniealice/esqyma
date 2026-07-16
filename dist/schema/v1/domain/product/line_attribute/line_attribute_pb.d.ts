import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Line } from "../line/line_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/line_attribute/line_attribute.proto.
 */
export declare const file_domain_product_line_attribute_line_attribute: GenFile;
/**
 * @generated from message domain.product.v1.LineAttribute
 */
export type LineAttribute = Message<"domain.product.v1.LineAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string line_id = 2;
     */
    lineId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.product.v1.Line line = 5;
     */
    line?: Line;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
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
    /**
     * @generated from field: string workspace_id = 12;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.product.v1.LineAttribute.
 * Use `create(LineAttributeSchema)` to create a new message.
 */
export declare const LineAttributeSchema: GenMessage<LineAttribute>;
/**
 * @generated from message domain.product.v1.CreateLineAttributeRequest
 */
export type CreateLineAttributeRequest = Message<"domain.product.v1.CreateLineAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineAttribute data = 1;
     */
    data?: LineAttribute;
};
/**
 * Describes the message domain.product.v1.CreateLineAttributeRequest.
 * Use `create(CreateLineAttributeRequestSchema)` to create a new message.
 */
export declare const CreateLineAttributeRequestSchema: GenMessage<CreateLineAttributeRequest>;
/**
 * @generated from message domain.product.v1.CreateLineAttributeResponse
 */
export type CreateLineAttributeResponse = Message<"domain.product.v1.CreateLineAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineAttribute data = 1;
     */
    data: LineAttribute[];
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
 * Describes the message domain.product.v1.CreateLineAttributeResponse.
 * Use `create(CreateLineAttributeResponseSchema)` to create a new message.
 */
export declare const CreateLineAttributeResponseSchema: GenMessage<CreateLineAttributeResponse>;
/**
 * @generated from message domain.product.v1.ReadLineAttributeRequest
 */
export type ReadLineAttributeRequest = Message<"domain.product.v1.ReadLineAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineAttribute data = 1;
     */
    data?: LineAttribute;
};
/**
 * Describes the message domain.product.v1.ReadLineAttributeRequest.
 * Use `create(ReadLineAttributeRequestSchema)` to create a new message.
 */
export declare const ReadLineAttributeRequestSchema: GenMessage<ReadLineAttributeRequest>;
/**
 * @generated from message domain.product.v1.ReadLineAttributeResponse
 */
export type ReadLineAttributeResponse = Message<"domain.product.v1.ReadLineAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineAttribute data = 1;
     */
    data: LineAttribute[];
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
 * Describes the message domain.product.v1.ReadLineAttributeResponse.
 * Use `create(ReadLineAttributeResponseSchema)` to create a new message.
 */
export declare const ReadLineAttributeResponseSchema: GenMessage<ReadLineAttributeResponse>;
/**
 * @generated from message domain.product.v1.UpdateLineAttributeRequest
 */
export type UpdateLineAttributeRequest = Message<"domain.product.v1.UpdateLineAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineAttribute data = 1;
     */
    data?: LineAttribute;
};
/**
 * Describes the message domain.product.v1.UpdateLineAttributeRequest.
 * Use `create(UpdateLineAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateLineAttributeRequestSchema: GenMessage<UpdateLineAttributeRequest>;
/**
 * @generated from message domain.product.v1.UpdateLineAttributeResponse
 */
export type UpdateLineAttributeResponse = Message<"domain.product.v1.UpdateLineAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineAttribute data = 1;
     */
    data: LineAttribute[];
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
 * Describes the message domain.product.v1.UpdateLineAttributeResponse.
 * Use `create(UpdateLineAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateLineAttributeResponseSchema: GenMessage<UpdateLineAttributeResponse>;
/**
 * @generated from message domain.product.v1.DeleteLineAttributeRequest
 */
export type DeleteLineAttributeRequest = Message<"domain.product.v1.DeleteLineAttributeRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineAttribute data = 1;
     */
    data?: LineAttribute;
};
/**
 * Describes the message domain.product.v1.DeleteLineAttributeRequest.
 * Use `create(DeleteLineAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteLineAttributeRequestSchema: GenMessage<DeleteLineAttributeRequest>;
/**
 * @generated from message domain.product.v1.DeleteLineAttributeResponse
 */
export type DeleteLineAttributeResponse = Message<"domain.product.v1.DeleteLineAttributeResponse"> & {
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
 * Describes the message domain.product.v1.DeleteLineAttributeResponse.
 * Use `create(DeleteLineAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteLineAttributeResponseSchema: GenMessage<DeleteLineAttributeResponse>;
/**
 * @generated from message domain.product.v1.ListLineAttributesRequest
 */
export type ListLineAttributesRequest = Message<"domain.product.v1.ListLineAttributesRequest"> & {
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
 * Describes the message domain.product.v1.ListLineAttributesRequest.
 * Use `create(ListLineAttributesRequestSchema)` to create a new message.
 */
export declare const ListLineAttributesRequestSchema: GenMessage<ListLineAttributesRequest>;
/**
 * @generated from message domain.product.v1.ListLineAttributesResponse
 */
export type ListLineAttributesResponse = Message<"domain.product.v1.ListLineAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineAttribute data = 1;
     */
    data: LineAttribute[];
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
 * Describes the message domain.product.v1.ListLineAttributesResponse.
 * Use `create(ListLineAttributesResponseSchema)` to create a new message.
 */
export declare const ListLineAttributesResponseSchema: GenMessage<ListLineAttributesResponse>;
/**
 * NEW: Enhanced list request with core features
 *
 * @generated from message domain.product.v1.GetLineAttributeListPageDataRequest
 */
export type GetLineAttributeListPageDataRequest = Message<"domain.product.v1.GetLineAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.product.v1.GetLineAttributeListPageDataRequest.
 * Use `create(GetLineAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLineAttributeListPageDataRequestSchema: GenMessage<GetLineAttributeListPageDataRequest>;
/**
 * NEW: Enhanced list response with metadata
 *
 * @generated from message domain.product.v1.GetLineAttributeListPageDataResponse
 */
export type GetLineAttributeListPageDataResponse = Message<"domain.product.v1.GetLineAttributeListPageDataResponse"> & {
    /**
     * The line attribute data
     *
     * @generated from field: repeated domain.product.v1.LineAttribute line_attribute_list = 1;
     */
    lineAttributeList: LineAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * Search results metadata (when search is used)
     *
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * Response status
     *
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.product.v1.GetLineAttributeListPageDataResponse.
 * Use `create(GetLineAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLineAttributeListPageDataResponseSchema: GenMessage<GetLineAttributeListPageDataResponse>;
/**
 * NEW: Simple item request
 *
 * @generated from message domain.product.v1.GetLineAttributeItemPageDataRequest
 */
export type GetLineAttributeItemPageDataRequest = Message<"domain.product.v1.GetLineAttributeItemPageDataRequest"> & {
    /**
     * The line attribute ID to retrieve
     *
     * @generated from field: string line_attribute_id = 1;
     */
    lineAttributeId: string;
};
/**
 * Describes the message domain.product.v1.GetLineAttributeItemPageDataRequest.
 * Use `create(GetLineAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLineAttributeItemPageDataRequestSchema: GenMessage<GetLineAttributeItemPageDataRequest>;
/**
 * NEW: Simple item response
 *
 * @generated from message domain.product.v1.GetLineAttributeItemPageDataResponse
 */
export type GetLineAttributeItemPageDataResponse = Message<"domain.product.v1.GetLineAttributeItemPageDataResponse"> & {
    /**
     * The line attribute data
     *
     * @generated from field: domain.product.v1.LineAttribute line_attribute = 1;
     */
    lineAttribute?: LineAttribute;
    /**
     * Response status
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.product.v1.GetLineAttributeItemPageDataResponse.
 * Use `create(GetLineAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLineAttributeItemPageDataResponseSchema: GenMessage<GetLineAttributeItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.LineAttributeDomainService
 */
export declare const LineAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.LineAttributeDomainService.CreateLineAttribute
     */
    createLineAttribute: {
        methodKind: "unary";
        input: typeof CreateLineAttributeRequestSchema;
        output: typeof CreateLineAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineAttributeDomainService.ReadLineAttribute
     */
    readLineAttribute: {
        methodKind: "unary";
        input: typeof ReadLineAttributeRequestSchema;
        output: typeof ReadLineAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineAttributeDomainService.UpdateLineAttribute
     */
    updateLineAttribute: {
        methodKind: "unary";
        input: typeof UpdateLineAttributeRequestSchema;
        output: typeof UpdateLineAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineAttributeDomainService.DeleteLineAttribute
     */
    deleteLineAttribute: {
        methodKind: "unary";
        input: typeof DeleteLineAttributeRequestSchema;
        output: typeof DeleteLineAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineAttributeDomainService.ListLineAttributes
     */
    listLineAttributes: {
        methodKind: "unary";
        input: typeof ListLineAttributesRequestSchema;
        output: typeof ListLineAttributesResponseSchema;
    };
    /**
     * NEW: Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.product.v1.LineAttributeDomainService.GetLineAttributeListPageData
     */
    getLineAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetLineAttributeListPageDataRequestSchema;
        output: typeof GetLineAttributeListPageDataResponseSchema;
    };
    /**
     * NEW: Enhanced item view with related data
     *
     * @generated from rpc domain.product.v1.LineAttributeDomainService.GetLineAttributeItemPageData
     */
    getLineAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetLineAttributeItemPageDataRequestSchema;
        output: typeof GetLineAttributeItemPageDataResponseSchema;
    };
}>;
