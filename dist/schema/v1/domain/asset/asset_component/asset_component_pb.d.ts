import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Asset, DepreciationMethod } from "../asset/asset_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_component/asset_component.proto.
 */
export declare const file_domain_asset_asset_component_asset_component: GenFile;
/**
 * AssetComponent implements IAS 16.43-47 component depreciation.
 * Each significant part of an asset with a different useful life is
 * depreciated separately.
 *
 * @generated from message domain.asset.v1.AssetComponent
 */
export type AssetComponent = Message<"domain.asset.v1.AssetComponent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: optional domain.asset.v1.Asset asset = 3;
     */
    asset?: Asset;
    /**
     * @generated from field: string name = 4;
     */
    name: string;
    /**
     * @generated from field: optional string description = 5;
     */
    description?: string;
    /**
     * @generated from field: double cost = 6;
     */
    cost: number;
    /**
     * @generated from field: double salvage_value = 7;
     */
    salvageValue: number;
    /**
     * @generated from field: int32 useful_life_months = 8;
     */
    usefulLifeMonths: number;
    /**
     * @generated from field: domain.asset.v1.DepreciationMethod depreciation_method = 9;
     */
    depreciationMethod: DepreciationMethod;
    /**
     * @generated from field: double accumulated_depreciation = 10;
     */
    accumulatedDepreciation: number;
    /**
     * @generated from field: double book_value = 11;
     */
    bookValue: number;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 16;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.AssetComponent.
 * Use `create(AssetComponentSchema)` to create a new message.
 */
export declare const AssetComponentSchema: GenMessage<AssetComponent>;
/**
 * @generated from message domain.asset.v1.CreateAssetComponentRequest
 */
export type CreateAssetComponentRequest = Message<"domain.asset.v1.CreateAssetComponentRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetComponent data = 1;
     */
    data?: AssetComponent;
};
/**
 * Describes the message domain.asset.v1.CreateAssetComponentRequest.
 * Use `create(CreateAssetComponentRequestSchema)` to create a new message.
 */
export declare const CreateAssetComponentRequestSchema: GenMessage<CreateAssetComponentRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetComponentResponse
 */
export type CreateAssetComponentResponse = Message<"domain.asset.v1.CreateAssetComponentResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetComponent data = 1;
     */
    data: AssetComponent[];
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
 * Describes the message domain.asset.v1.CreateAssetComponentResponse.
 * Use `create(CreateAssetComponentResponseSchema)` to create a new message.
 */
export declare const CreateAssetComponentResponseSchema: GenMessage<CreateAssetComponentResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetComponentRequest
 */
export type ReadAssetComponentRequest = Message<"domain.asset.v1.ReadAssetComponentRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetComponent data = 1;
     */
    data?: AssetComponent;
};
/**
 * Describes the message domain.asset.v1.ReadAssetComponentRequest.
 * Use `create(ReadAssetComponentRequestSchema)` to create a new message.
 */
export declare const ReadAssetComponentRequestSchema: GenMessage<ReadAssetComponentRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetComponentResponse
 */
export type ReadAssetComponentResponse = Message<"domain.asset.v1.ReadAssetComponentResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetComponent data = 1;
     */
    data: AssetComponent[];
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
 * Describes the message domain.asset.v1.ReadAssetComponentResponse.
 * Use `create(ReadAssetComponentResponseSchema)` to create a new message.
 */
export declare const ReadAssetComponentResponseSchema: GenMessage<ReadAssetComponentResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetComponentRequest
 */
export type UpdateAssetComponentRequest = Message<"domain.asset.v1.UpdateAssetComponentRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetComponent data = 1;
     */
    data?: AssetComponent;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetComponentRequest.
 * Use `create(UpdateAssetComponentRequestSchema)` to create a new message.
 */
export declare const UpdateAssetComponentRequestSchema: GenMessage<UpdateAssetComponentRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetComponentResponse
 */
export type UpdateAssetComponentResponse = Message<"domain.asset.v1.UpdateAssetComponentResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetComponent data = 1;
     */
    data: AssetComponent[];
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
 * Describes the message domain.asset.v1.UpdateAssetComponentResponse.
 * Use `create(UpdateAssetComponentResponseSchema)` to create a new message.
 */
export declare const UpdateAssetComponentResponseSchema: GenMessage<UpdateAssetComponentResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetComponentRequest
 */
export type DeleteAssetComponentRequest = Message<"domain.asset.v1.DeleteAssetComponentRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetComponent data = 1;
     */
    data?: AssetComponent;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetComponentRequest.
 * Use `create(DeleteAssetComponentRequestSchema)` to create a new message.
 */
export declare const DeleteAssetComponentRequestSchema: GenMessage<DeleteAssetComponentRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetComponentResponse
 */
export type DeleteAssetComponentResponse = Message<"domain.asset.v1.DeleteAssetComponentResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetComponentResponse.
 * Use `create(DeleteAssetComponentResponseSchema)` to create a new message.
 */
export declare const DeleteAssetComponentResponseSchema: GenMessage<DeleteAssetComponentResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetComponentsRequest
 */
export type ListAssetComponentsRequest = Message<"domain.asset.v1.ListAssetComponentsRequest"> & {
    /**
     * @generated from field: optional string asset_id = 1;
     */
    assetId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 2;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.asset.v1.ListAssetComponentsRequest.
 * Use `create(ListAssetComponentsRequestSchema)` to create a new message.
 */
export declare const ListAssetComponentsRequestSchema: GenMessage<ListAssetComponentsRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetComponentsResponse
 */
export type ListAssetComponentsResponse = Message<"domain.asset.v1.ListAssetComponentsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetComponent data = 1;
     */
    data: AssetComponent[];
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
 * Describes the message domain.asset.v1.ListAssetComponentsResponse.
 * Use `create(ListAssetComponentsResponseSchema)` to create a new message.
 */
export declare const ListAssetComponentsResponseSchema: GenMessage<ListAssetComponentsResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetComponentListPageDataRequest
 */
export type GetAssetComponentListPageDataRequest = Message<"domain.asset.v1.GetAssetComponentListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.asset.v1.GetAssetComponentListPageDataRequest.
 * Use `create(GetAssetComponentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetComponentListPageDataRequestSchema: GenMessage<GetAssetComponentListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetComponentListPageDataResponse
 */
export type GetAssetComponentListPageDataResponse = Message<"domain.asset.v1.GetAssetComponentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetComponent asset_component_list = 1;
     */
    assetComponentList: AssetComponent[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.asset.v1.GetAssetComponentListPageDataResponse.
 * Use `create(GetAssetComponentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetComponentListPageDataResponseSchema: GenMessage<GetAssetComponentListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetComponentItemPageDataRequest
 */
export type GetAssetComponentItemPageDataRequest = Message<"domain.asset.v1.GetAssetComponentItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_component_id = 1;
     */
    assetComponentId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetComponentItemPageDataRequest.
 * Use `create(GetAssetComponentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetComponentItemPageDataRequestSchema: GenMessage<GetAssetComponentItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetComponentItemPageDataResponse
 */
export type GetAssetComponentItemPageDataResponse = Message<"domain.asset.v1.GetAssetComponentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetComponent asset_component = 1;
     */
    assetComponent?: AssetComponent;
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
 * Describes the message domain.asset.v1.GetAssetComponentItemPageDataResponse.
 * Use `create(GetAssetComponentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetComponentItemPageDataResponseSchema: GenMessage<GetAssetComponentItemPageDataResponse>;
/**
 * @generated from service domain.asset.v1.AssetComponentDomainService
 */
export declare const AssetComponentDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.CreateAssetComponent
     */
    createAssetComponent: {
        methodKind: "unary";
        input: typeof CreateAssetComponentRequestSchema;
        output: typeof CreateAssetComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.ReadAssetComponent
     */
    readAssetComponent: {
        methodKind: "unary";
        input: typeof ReadAssetComponentRequestSchema;
        output: typeof ReadAssetComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.UpdateAssetComponent
     */
    updateAssetComponent: {
        methodKind: "unary";
        input: typeof UpdateAssetComponentRequestSchema;
        output: typeof UpdateAssetComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.DeleteAssetComponent
     */
    deleteAssetComponent: {
        methodKind: "unary";
        input: typeof DeleteAssetComponentRequestSchema;
        output: typeof DeleteAssetComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.ListAssetComponents
     */
    listAssetComponents: {
        methodKind: "unary";
        input: typeof ListAssetComponentsRequestSchema;
        output: typeof ListAssetComponentsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.GetAssetComponentListPageData
     */
    getAssetComponentListPageData: {
        methodKind: "unary";
        input: typeof GetAssetComponentListPageDataRequestSchema;
        output: typeof GetAssetComponentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetComponentDomainService.GetAssetComponentItemPageData
     */
    getAssetComponentItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetComponentItemPageDataRequestSchema;
        output: typeof GetAssetComponentItemPageDataResponseSchema;
    };
}>;
