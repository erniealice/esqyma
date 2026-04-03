import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Asset } from "../asset/asset_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_attribute/asset_attribute.proto.
 */
export declare const file_domain_asset_asset_attribute_asset_attribute: GenFile;
/**
 * @generated from message domain.asset.v1.AssetAttribute
 */
export type AssetAttribute = Message<"domain.asset.v1.AssetAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.asset.v1.Asset asset = 5;
     */
    asset?: Asset;
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
};
/**
 * Describes the message domain.asset.v1.AssetAttribute.
 * Use `create(AssetAttributeSchema)` to create a new message.
 */
export declare const AssetAttributeSchema: GenMessage<AssetAttribute>;
/**
 * @generated from message domain.asset.v1.CreateAssetAttributeRequest
 */
export type CreateAssetAttributeRequest = Message<"domain.asset.v1.CreateAssetAttributeRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetAttribute data = 1;
     */
    data?: AssetAttribute;
};
/**
 * Describes the message domain.asset.v1.CreateAssetAttributeRequest.
 * Use `create(CreateAssetAttributeRequestSchema)` to create a new message.
 */
export declare const CreateAssetAttributeRequestSchema: GenMessage<CreateAssetAttributeRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetAttributeResponse
 */
export type CreateAssetAttributeResponse = Message<"domain.asset.v1.CreateAssetAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
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
 * Describes the message domain.asset.v1.CreateAssetAttributeResponse.
 * Use `create(CreateAssetAttributeResponseSchema)` to create a new message.
 */
export declare const CreateAssetAttributeResponseSchema: GenMessage<CreateAssetAttributeResponse>;
/**
 * @generated from message domain.asset.v1.CreateAssetAttributeBatchRequest
 */
export type CreateAssetAttributeBatchRequest = Message<"domain.asset.v1.CreateAssetAttributeBatchRequest"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
};
/**
 * Describes the message domain.asset.v1.CreateAssetAttributeBatchRequest.
 * Use `create(CreateAssetAttributeBatchRequestSchema)` to create a new message.
 */
export declare const CreateAssetAttributeBatchRequestSchema: GenMessage<CreateAssetAttributeBatchRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetAttributeBatchResponse
 */
export type CreateAssetAttributeBatchResponse = Message<"domain.asset.v1.CreateAssetAttributeBatchResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
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
 * Describes the message domain.asset.v1.CreateAssetAttributeBatchResponse.
 * Use `create(CreateAssetAttributeBatchResponseSchema)` to create a new message.
 */
export declare const CreateAssetAttributeBatchResponseSchema: GenMessage<CreateAssetAttributeBatchResponse>;
/**
 * CreateAssetAttributesByCode creates asset attributes using attribute codes.
 * Internally resolves each code to an attribute ID before creating.
 *
 * @generated from message domain.asset.v1.AssetAttributesByCodeData
 */
export type AssetAttributesByCodeData = Message<"domain.asset.v1.AssetAttributesByCodeData"> & {
    /**
     * @generated from field: string asset_id = 1;
     */
    assetId: string;
    /**
     * {"attribute_code": "value", ...}
     *
     * @generated from field: map<string, string> attributes_map = 2;
     */
    attributesMap: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.asset.v1.AssetAttributesByCodeData.
 * Use `create(AssetAttributesByCodeDataSchema)` to create a new message.
 */
export declare const AssetAttributesByCodeDataSchema: GenMessage<AssetAttributesByCodeData>;
/**
 * @generated from message domain.asset.v1.CreateAssetAttributesByCodeRequest
 */
export type CreateAssetAttributesByCodeRequest = Message<"domain.asset.v1.CreateAssetAttributesByCodeRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetAttributesByCodeData data = 1;
     */
    data?: AssetAttributesByCodeData;
};
/**
 * Describes the message domain.asset.v1.CreateAssetAttributesByCodeRequest.
 * Use `create(CreateAssetAttributesByCodeRequestSchema)` to create a new message.
 */
export declare const CreateAssetAttributesByCodeRequestSchema: GenMessage<CreateAssetAttributesByCodeRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetAttributesByCodeResponse
 */
export type CreateAssetAttributesByCodeResponse = Message<"domain.asset.v1.CreateAssetAttributesByCodeResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
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
 * Describes the message domain.asset.v1.CreateAssetAttributesByCodeResponse.
 * Use `create(CreateAssetAttributesByCodeResponseSchema)` to create a new message.
 */
export declare const CreateAssetAttributesByCodeResponseSchema: GenMessage<CreateAssetAttributesByCodeResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetAttributeRequest
 */
export type ReadAssetAttributeRequest = Message<"domain.asset.v1.ReadAssetAttributeRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetAttribute data = 1;
     */
    data?: AssetAttribute;
};
/**
 * Describes the message domain.asset.v1.ReadAssetAttributeRequest.
 * Use `create(ReadAssetAttributeRequestSchema)` to create a new message.
 */
export declare const ReadAssetAttributeRequestSchema: GenMessage<ReadAssetAttributeRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetAttributeResponse
 */
export type ReadAssetAttributeResponse = Message<"domain.asset.v1.ReadAssetAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
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
 * Describes the message domain.asset.v1.ReadAssetAttributeResponse.
 * Use `create(ReadAssetAttributeResponseSchema)` to create a new message.
 */
export declare const ReadAssetAttributeResponseSchema: GenMessage<ReadAssetAttributeResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetAttributeRequest
 */
export type UpdateAssetAttributeRequest = Message<"domain.asset.v1.UpdateAssetAttributeRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetAttribute data = 1;
     */
    data?: AssetAttribute;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetAttributeRequest.
 * Use `create(UpdateAssetAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateAssetAttributeRequestSchema: GenMessage<UpdateAssetAttributeRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetAttributeResponse
 */
export type UpdateAssetAttributeResponse = Message<"domain.asset.v1.UpdateAssetAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
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
 * Describes the message domain.asset.v1.UpdateAssetAttributeResponse.
 * Use `create(UpdateAssetAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateAssetAttributeResponseSchema: GenMessage<UpdateAssetAttributeResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetAttributeRequest
 */
export type DeleteAssetAttributeRequest = Message<"domain.asset.v1.DeleteAssetAttributeRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetAttribute data = 1;
     */
    data?: AssetAttribute;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetAttributeRequest.
 * Use `create(DeleteAssetAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteAssetAttributeRequestSchema: GenMessage<DeleteAssetAttributeRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetAttributeResponse
 */
export type DeleteAssetAttributeResponse = Message<"domain.asset.v1.DeleteAssetAttributeResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetAttributeResponse.
 * Use `create(DeleteAssetAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteAssetAttributeResponseSchema: GenMessage<DeleteAssetAttributeResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetAttributesRequest
 */
export type ListAssetAttributesRequest = Message<"domain.asset.v1.ListAssetAttributesRequest"> & {
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
 * Describes the message domain.asset.v1.ListAssetAttributesRequest.
 * Use `create(ListAssetAttributesRequestSchema)` to create a new message.
 */
export declare const ListAssetAttributesRequestSchema: GenMessage<ListAssetAttributesRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetAttributesResponse
 */
export type ListAssetAttributesResponse = Message<"domain.asset.v1.ListAssetAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetAttribute data = 1;
     */
    data: AssetAttribute[];
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
 * Describes the message domain.asset.v1.ListAssetAttributesResponse.
 * Use `create(ListAssetAttributesResponseSchema)` to create a new message.
 */
export declare const ListAssetAttributesResponseSchema: GenMessage<ListAssetAttributesResponse>;
/**
 * Enhanced list request with core features
 *
 * @generated from message domain.asset.v1.GetAssetAttributeListPageDataRequest
 */
export type GetAssetAttributeListPageDataRequest = Message<"domain.asset.v1.GetAssetAttributeListPageDataRequest"> & {
    /**
     * Pagination settings
     *
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * Filter conditions
     *
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * Sort settings
     *
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * Search settings
     *
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.asset.v1.GetAssetAttributeListPageDataRequest.
 * Use `create(GetAssetAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetAttributeListPageDataRequestSchema: GenMessage<GetAssetAttributeListPageDataRequest>;
/**
 * Enhanced list response with metadata
 *
 * @generated from message domain.asset.v1.GetAssetAttributeListPageDataResponse
 */
export type GetAssetAttributeListPageDataResponse = Message<"domain.asset.v1.GetAssetAttributeListPageDataResponse"> & {
    /**
     * The asset attribute data
     *
     * @generated from field: repeated domain.asset.v1.AssetAttribute asset_attribute_list = 1;
     */
    assetAttributeList: AssetAttribute[];
    /**
     * Pagination metadata
     *
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.asset.v1.GetAssetAttributeListPageDataResponse.
 * Use `create(GetAssetAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetAttributeListPageDataResponseSchema: GenMessage<GetAssetAttributeListPageDataResponse>;
/**
 * Simple item request
 *
 * @generated from message domain.asset.v1.GetAssetAttributeItemPageDataRequest
 */
export type GetAssetAttributeItemPageDataRequest = Message<"domain.asset.v1.GetAssetAttributeItemPageDataRequest"> & {
    /**
     * The asset attribute ID to retrieve
     *
     * @generated from field: string asset_attribute_id = 1;
     */
    assetAttributeId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetAttributeItemPageDataRequest.
 * Use `create(GetAssetAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetAttributeItemPageDataRequestSchema: GenMessage<GetAssetAttributeItemPageDataRequest>;
/**
 * Simple item response
 *
 * @generated from message domain.asset.v1.GetAssetAttributeItemPageDataResponse
 */
export type GetAssetAttributeItemPageDataResponse = Message<"domain.asset.v1.GetAssetAttributeItemPageDataResponse"> & {
    /**
     * The asset attribute data
     *
     * @generated from field: optional domain.asset.v1.AssetAttribute asset_attribute = 1;
     */
    assetAttribute?: AssetAttribute;
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
 * Describes the message domain.asset.v1.GetAssetAttributeItemPageDataResponse.
 * Use `create(GetAssetAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetAttributeItemPageDataResponseSchema: GenMessage<GetAssetAttributeItemPageDataResponse>;
/**
 * @generated from service domain.asset.v1.AssetAttributeDomainService
 */
export declare const AssetAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.CreateAssetAttribute
     */
    createAssetAttribute: {
        methodKind: "unary";
        input: typeof CreateAssetAttributeRequestSchema;
        output: typeof CreateAssetAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.ReadAssetAttribute
     */
    readAssetAttribute: {
        methodKind: "unary";
        input: typeof ReadAssetAttributeRequestSchema;
        output: typeof ReadAssetAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.UpdateAssetAttribute
     */
    updateAssetAttribute: {
        methodKind: "unary";
        input: typeof UpdateAssetAttributeRequestSchema;
        output: typeof UpdateAssetAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.DeleteAssetAttribute
     */
    deleteAssetAttribute: {
        methodKind: "unary";
        input: typeof DeleteAssetAttributeRequestSchema;
        output: typeof DeleteAssetAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.ListAssetAttributes
     */
    listAssetAttributes: {
        methodKind: "unary";
        input: typeof ListAssetAttributesRequestSchema;
        output: typeof ListAssetAttributesResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.GetAssetAttributeListPageData
     */
    getAssetAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetAssetAttributeListPageDataRequestSchema;
        output: typeof GetAssetAttributeListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.asset.v1.AssetAttributeDomainService.GetAssetAttributeItemPageData
     */
    getAssetAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetAttributeItemPageDataRequestSchema;
        output: typeof GetAssetAttributeItemPageDataResponseSchema;
    };
}>;
