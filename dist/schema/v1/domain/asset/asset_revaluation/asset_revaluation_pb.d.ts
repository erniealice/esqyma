import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_revaluation/asset_revaluation.proto.
 */
export declare const file_domain_asset_asset_revaluation_asset_revaluation: GenFile;
/**
 * @generated from message domain.asset.v1.AssetRevaluation
 */
export type AssetRevaluation = Message<"domain.asset.v1.AssetRevaluation"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: int64 revaluation_date = 3;
     */
    revaluationDate: bigint;
    /**
     * @generated from field: string revaluation_date_string = 4;
     */
    revaluationDateString: string;
    /**
     * @generated from field: double previous_carrying_amount = 5;
     */
    previousCarryingAmount: number;
    /**
     * @generated from field: double new_fair_value = 6;
     */
    newFairValue: number;
    /**
     * @generated from field: double revaluation_amount = 7;
     */
    revaluationAmount: number;
    /**
     * @generated from field: bool is_increase = 8;
     */
    isIncrease: boolean;
    /**
     * @generated from field: double recognized_in_pnl = 9;
     */
    recognizedInPnl: number;
    /**
     * @generated from field: double recognized_in_oci = 10;
     */
    recognizedInOci: number;
    /**
     * @generated from field: double revaluation_surplus_balance = 11;
     */
    revaluationSurplusBalance: number;
    /**
     * @generated from field: optional string appraiser_name = 12;
     */
    appraiserName?: string;
    /**
     * Market comparison, income approach, replacement cost
     *
     * @generated from field: optional string valuation_method = 13;
     */
    valuationMethod?: string;
    /**
     * FK to ledger.Journal (future)
     *
     * @generated from field: optional string journal_entry_id = 14;
     */
    journalEntryId?: string;
    /**
     * @generated from field: optional string notes = 15;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 18;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 19;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 20;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.AssetRevaluation.
 * Use `create(AssetRevaluationSchema)` to create a new message.
 */
export declare const AssetRevaluationSchema: GenMessage<AssetRevaluation>;
/**
 * @generated from message domain.asset.v1.CreateAssetRevaluationRequest
 */
export type CreateAssetRevaluationRequest = Message<"domain.asset.v1.CreateAssetRevaluationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetRevaluation data = 1;
     */
    data?: AssetRevaluation;
};
/**
 * Describes the message domain.asset.v1.CreateAssetRevaluationRequest.
 * Use `create(CreateAssetRevaluationRequestSchema)` to create a new message.
 */
export declare const CreateAssetRevaluationRequestSchema: GenMessage<CreateAssetRevaluationRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetRevaluationResponse
 */
export type CreateAssetRevaluationResponse = Message<"domain.asset.v1.CreateAssetRevaluationResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetRevaluation data = 1;
     */
    data: AssetRevaluation[];
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
 * Describes the message domain.asset.v1.CreateAssetRevaluationResponse.
 * Use `create(CreateAssetRevaluationResponseSchema)` to create a new message.
 */
export declare const CreateAssetRevaluationResponseSchema: GenMessage<CreateAssetRevaluationResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetRevaluationRequest
 */
export type ReadAssetRevaluationRequest = Message<"domain.asset.v1.ReadAssetRevaluationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetRevaluation data = 1;
     */
    data?: AssetRevaluation;
};
/**
 * Describes the message domain.asset.v1.ReadAssetRevaluationRequest.
 * Use `create(ReadAssetRevaluationRequestSchema)` to create a new message.
 */
export declare const ReadAssetRevaluationRequestSchema: GenMessage<ReadAssetRevaluationRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetRevaluationResponse
 */
export type ReadAssetRevaluationResponse = Message<"domain.asset.v1.ReadAssetRevaluationResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetRevaluation data = 1;
     */
    data: AssetRevaluation[];
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
 * Describes the message domain.asset.v1.ReadAssetRevaluationResponse.
 * Use `create(ReadAssetRevaluationResponseSchema)` to create a new message.
 */
export declare const ReadAssetRevaluationResponseSchema: GenMessage<ReadAssetRevaluationResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetRevaluationRequest
 */
export type UpdateAssetRevaluationRequest = Message<"domain.asset.v1.UpdateAssetRevaluationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetRevaluation data = 1;
     */
    data?: AssetRevaluation;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetRevaluationRequest.
 * Use `create(UpdateAssetRevaluationRequestSchema)` to create a new message.
 */
export declare const UpdateAssetRevaluationRequestSchema: GenMessage<UpdateAssetRevaluationRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetRevaluationResponse
 */
export type UpdateAssetRevaluationResponse = Message<"domain.asset.v1.UpdateAssetRevaluationResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetRevaluation data = 1;
     */
    data: AssetRevaluation[];
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
 * Describes the message domain.asset.v1.UpdateAssetRevaluationResponse.
 * Use `create(UpdateAssetRevaluationResponseSchema)` to create a new message.
 */
export declare const UpdateAssetRevaluationResponseSchema: GenMessage<UpdateAssetRevaluationResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetRevaluationRequest
 */
export type DeleteAssetRevaluationRequest = Message<"domain.asset.v1.DeleteAssetRevaluationRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetRevaluation data = 1;
     */
    data?: AssetRevaluation;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetRevaluationRequest.
 * Use `create(DeleteAssetRevaluationRequestSchema)` to create a new message.
 */
export declare const DeleteAssetRevaluationRequestSchema: GenMessage<DeleteAssetRevaluationRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetRevaluationResponse
 */
export type DeleteAssetRevaluationResponse = Message<"domain.asset.v1.DeleteAssetRevaluationResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetRevaluationResponse.
 * Use `create(DeleteAssetRevaluationResponseSchema)` to create a new message.
 */
export declare const DeleteAssetRevaluationResponseSchema: GenMessage<DeleteAssetRevaluationResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetRevaluationsRequest
 */
export type ListAssetRevaluationsRequest = Message<"domain.asset.v1.ListAssetRevaluationsRequest"> & {
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
 * Describes the message domain.asset.v1.ListAssetRevaluationsRequest.
 * Use `create(ListAssetRevaluationsRequestSchema)` to create a new message.
 */
export declare const ListAssetRevaluationsRequestSchema: GenMessage<ListAssetRevaluationsRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetRevaluationsResponse
 */
export type ListAssetRevaluationsResponse = Message<"domain.asset.v1.ListAssetRevaluationsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetRevaluation data = 1;
     */
    data: AssetRevaluation[];
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
 * Describes the message domain.asset.v1.ListAssetRevaluationsResponse.
 * Use `create(ListAssetRevaluationsResponseSchema)` to create a new message.
 */
export declare const ListAssetRevaluationsResponseSchema: GenMessage<ListAssetRevaluationsResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetRevaluationListPageDataRequest
 */
export type GetAssetRevaluationListPageDataRequest = Message<"domain.asset.v1.GetAssetRevaluationListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetRevaluationListPageDataRequest.
 * Use `create(GetAssetRevaluationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetRevaluationListPageDataRequestSchema: GenMessage<GetAssetRevaluationListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetRevaluationListPageDataResponse
 */
export type GetAssetRevaluationListPageDataResponse = Message<"domain.asset.v1.GetAssetRevaluationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetRevaluation asset_revaluation_list = 1;
     */
    assetRevaluationList: AssetRevaluation[];
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
 * Describes the message domain.asset.v1.GetAssetRevaluationListPageDataResponse.
 * Use `create(GetAssetRevaluationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetRevaluationListPageDataResponseSchema: GenMessage<GetAssetRevaluationListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetRevaluationItemPageDataRequest
 */
export type GetAssetRevaluationItemPageDataRequest = Message<"domain.asset.v1.GetAssetRevaluationItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_revaluation_id = 1;
     */
    assetRevaluationId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetRevaluationItemPageDataRequest.
 * Use `create(GetAssetRevaluationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetRevaluationItemPageDataRequestSchema: GenMessage<GetAssetRevaluationItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetRevaluationItemPageDataResponse
 */
export type GetAssetRevaluationItemPageDataResponse = Message<"domain.asset.v1.GetAssetRevaluationItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetRevaluation asset_revaluation = 1;
     */
    assetRevaluation?: AssetRevaluation;
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
 * Describes the message domain.asset.v1.GetAssetRevaluationItemPageDataResponse.
 * Use `create(GetAssetRevaluationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetRevaluationItemPageDataResponseSchema: GenMessage<GetAssetRevaluationItemPageDataResponse>;
/**
 * @generated from service domain.asset.v1.AssetRevaluationDomainService
 */
export declare const AssetRevaluationDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.CreateAssetRevaluation
     */
    createAssetRevaluation: {
        methodKind: "unary";
        input: typeof CreateAssetRevaluationRequestSchema;
        output: typeof CreateAssetRevaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.ReadAssetRevaluation
     */
    readAssetRevaluation: {
        methodKind: "unary";
        input: typeof ReadAssetRevaluationRequestSchema;
        output: typeof ReadAssetRevaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.UpdateAssetRevaluation
     */
    updateAssetRevaluation: {
        methodKind: "unary";
        input: typeof UpdateAssetRevaluationRequestSchema;
        output: typeof UpdateAssetRevaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.DeleteAssetRevaluation
     */
    deleteAssetRevaluation: {
        methodKind: "unary";
        input: typeof DeleteAssetRevaluationRequestSchema;
        output: typeof DeleteAssetRevaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.ListAssetRevaluations
     */
    listAssetRevaluations: {
        methodKind: "unary";
        input: typeof ListAssetRevaluationsRequestSchema;
        output: typeof ListAssetRevaluationsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.GetAssetRevaluationListPageData
     */
    getAssetRevaluationListPageData: {
        methodKind: "unary";
        input: typeof GetAssetRevaluationListPageDataRequestSchema;
        output: typeof GetAssetRevaluationListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetRevaluationDomainService.GetAssetRevaluationItemPageData
     */
    getAssetRevaluationItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetRevaluationItemPageDataRequestSchema;
        output: typeof GetAssetRevaluationItemPageDataResponseSchema;
    };
}>;
