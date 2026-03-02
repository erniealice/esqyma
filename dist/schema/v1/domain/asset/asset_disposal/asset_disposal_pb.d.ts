import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset_disposal/asset_disposal.proto.
 */
export declare const file_domain_asset_asset_disposal_asset_disposal: GenFile;
/**
 * @generated from message domain.asset.v1.AssetDisposal
 */
export type AssetDisposal = Message<"domain.asset.v1.AssetDisposal"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_id = 2;
     */
    assetId: string;
    /**
     * @generated from field: int64 disposal_date = 3;
     */
    disposalDate: bigint;
    /**
     * @generated from field: string disposal_date_string = 4;
     */
    disposalDateString: string;
    /**
     * @generated from field: domain.asset.v1.DisposalType disposal_type = 5;
     */
    disposalType: DisposalType;
    /**
     * @generated from field: double proceeds = 6;
     */
    proceeds: number;
    /**
     * @generated from field: double cost_at_disposal = 7;
     */
    costAtDisposal: number;
    /**
     * @generated from field: double accumulated_depreciation_at_disposal = 8;
     */
    accumulatedDepreciationAtDisposal: number;
    /**
     * @generated from field: double book_value_at_disposal = 9;
     */
    bookValueAtDisposal: number;
    /**
     * @generated from field: double gain_or_loss = 10;
     */
    gainOrLoss: number;
    /**
     * @generated from field: optional string buyer_name = 11;
     */
    buyerName?: string;
    /**
     * @generated from field: optional string reason = 12;
     */
    reason?: string;
    /**
     * PENDING, APPROVED, REJECTED
     *
     * @generated from field: optional string approval_status = 13;
     */
    approvalStatus?: string;
    /**
     * FK to entity.User
     *
     * @generated from field: optional string approved_by = 14;
     */
    approvedBy?: string;
    /**
     * FK to ledger.Journal (future)
     *
     * @generated from field: optional string journal_entry_id = 15;
     */
    journalEntryId?: string;
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
 * Describes the message domain.asset.v1.AssetDisposal.
 * Use `create(AssetDisposalSchema)` to create a new message.
 */
export declare const AssetDisposalSchema: GenMessage<AssetDisposal>;
/**
 * @generated from message domain.asset.v1.CreateAssetDisposalRequest
 */
export type CreateAssetDisposalRequest = Message<"domain.asset.v1.CreateAssetDisposalRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetDisposal data = 1;
     */
    data?: AssetDisposal;
};
/**
 * Describes the message domain.asset.v1.CreateAssetDisposalRequest.
 * Use `create(CreateAssetDisposalRequestSchema)` to create a new message.
 */
export declare const CreateAssetDisposalRequestSchema: GenMessage<CreateAssetDisposalRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetDisposalResponse
 */
export type CreateAssetDisposalResponse = Message<"domain.asset.v1.CreateAssetDisposalResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetDisposal data = 1;
     */
    data: AssetDisposal[];
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
 * Describes the message domain.asset.v1.CreateAssetDisposalResponse.
 * Use `create(CreateAssetDisposalResponseSchema)` to create a new message.
 */
export declare const CreateAssetDisposalResponseSchema: GenMessage<CreateAssetDisposalResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetDisposalRequest
 */
export type ReadAssetDisposalRequest = Message<"domain.asset.v1.ReadAssetDisposalRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetDisposal data = 1;
     */
    data?: AssetDisposal;
};
/**
 * Describes the message domain.asset.v1.ReadAssetDisposalRequest.
 * Use `create(ReadAssetDisposalRequestSchema)` to create a new message.
 */
export declare const ReadAssetDisposalRequestSchema: GenMessage<ReadAssetDisposalRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetDisposalResponse
 */
export type ReadAssetDisposalResponse = Message<"domain.asset.v1.ReadAssetDisposalResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetDisposal data = 1;
     */
    data: AssetDisposal[];
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
 * Describes the message domain.asset.v1.ReadAssetDisposalResponse.
 * Use `create(ReadAssetDisposalResponseSchema)` to create a new message.
 */
export declare const ReadAssetDisposalResponseSchema: GenMessage<ReadAssetDisposalResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetDisposalRequest
 */
export type UpdateAssetDisposalRequest = Message<"domain.asset.v1.UpdateAssetDisposalRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetDisposal data = 1;
     */
    data?: AssetDisposal;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetDisposalRequest.
 * Use `create(UpdateAssetDisposalRequestSchema)` to create a new message.
 */
export declare const UpdateAssetDisposalRequestSchema: GenMessage<UpdateAssetDisposalRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetDisposalResponse
 */
export type UpdateAssetDisposalResponse = Message<"domain.asset.v1.UpdateAssetDisposalResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetDisposal data = 1;
     */
    data: AssetDisposal[];
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
 * Describes the message domain.asset.v1.UpdateAssetDisposalResponse.
 * Use `create(UpdateAssetDisposalResponseSchema)` to create a new message.
 */
export declare const UpdateAssetDisposalResponseSchema: GenMessage<UpdateAssetDisposalResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetDisposalRequest
 */
export type DeleteAssetDisposalRequest = Message<"domain.asset.v1.DeleteAssetDisposalRequest"> & {
    /**
     * @generated from field: domain.asset.v1.AssetDisposal data = 1;
     */
    data?: AssetDisposal;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetDisposalRequest.
 * Use `create(DeleteAssetDisposalRequestSchema)` to create a new message.
 */
export declare const DeleteAssetDisposalRequestSchema: GenMessage<DeleteAssetDisposalRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetDisposalResponse
 */
export type DeleteAssetDisposalResponse = Message<"domain.asset.v1.DeleteAssetDisposalResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetDisposalResponse.
 * Use `create(DeleteAssetDisposalResponseSchema)` to create a new message.
 */
export declare const DeleteAssetDisposalResponseSchema: GenMessage<DeleteAssetDisposalResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetDisposalsRequest
 */
export type ListAssetDisposalsRequest = Message<"domain.asset.v1.ListAssetDisposalsRequest"> & {
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
 * Describes the message domain.asset.v1.ListAssetDisposalsRequest.
 * Use `create(ListAssetDisposalsRequestSchema)` to create a new message.
 */
export declare const ListAssetDisposalsRequestSchema: GenMessage<ListAssetDisposalsRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetDisposalsResponse
 */
export type ListAssetDisposalsResponse = Message<"domain.asset.v1.ListAssetDisposalsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetDisposal data = 1;
     */
    data: AssetDisposal[];
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
 * Describes the message domain.asset.v1.ListAssetDisposalsResponse.
 * Use `create(ListAssetDisposalsResponseSchema)` to create a new message.
 */
export declare const ListAssetDisposalsResponseSchema: GenMessage<ListAssetDisposalsResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetDisposalListPageDataRequest
 */
export type GetAssetDisposalListPageDataRequest = Message<"domain.asset.v1.GetAssetDisposalListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetDisposalListPageDataRequest.
 * Use `create(GetAssetDisposalListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetDisposalListPageDataRequestSchema: GenMessage<GetAssetDisposalListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetDisposalListPageDataResponse
 */
export type GetAssetDisposalListPageDataResponse = Message<"domain.asset.v1.GetAssetDisposalListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.AssetDisposal asset_disposal_list = 1;
     */
    assetDisposalList: AssetDisposal[];
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
 * Describes the message domain.asset.v1.GetAssetDisposalListPageDataResponse.
 * Use `create(GetAssetDisposalListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetDisposalListPageDataResponseSchema: GenMessage<GetAssetDisposalListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetDisposalItemPageDataRequest
 */
export type GetAssetDisposalItemPageDataRequest = Message<"domain.asset.v1.GetAssetDisposalItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_disposal_id = 1;
     */
    assetDisposalId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetDisposalItemPageDataRequest.
 * Use `create(GetAssetDisposalItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetDisposalItemPageDataRequestSchema: GenMessage<GetAssetDisposalItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetDisposalItemPageDataResponse
 */
export type GetAssetDisposalItemPageDataResponse = Message<"domain.asset.v1.GetAssetDisposalItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.AssetDisposal asset_disposal = 1;
     */
    assetDisposal?: AssetDisposal;
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
 * Describes the message domain.asset.v1.GetAssetDisposalItemPageDataResponse.
 * Use `create(GetAssetDisposalItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetDisposalItemPageDataResponseSchema: GenMessage<GetAssetDisposalItemPageDataResponse>;
/**
 * DisposalType describes how the asset was removed from the books.
 *
 * @generated from enum domain.asset.v1.DisposalType
 */
export declare enum DisposalType {
    /**
     * @generated from enum value: DISPOSAL_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DISPOSAL_TYPE_SALE = 1;
     */
    SALE = 1,
    /**
     * @generated from enum value: DISPOSAL_TYPE_SCRAP = 2;
     */
    SCRAP = 2,
    /**
     * @generated from enum value: DISPOSAL_TYPE_DONATION = 3;
     */
    DONATION = 3,
    /**
     * @generated from enum value: DISPOSAL_TYPE_TRADE_IN = 4;
     */
    TRADE_IN = 4,
    /**
     * @generated from enum value: DISPOSAL_TYPE_ABANDONMENT = 5;
     */
    ABANDONMENT = 5,
    /**
     * @generated from enum value: DISPOSAL_TYPE_WRITE_OFF = 6;
     */
    WRITE_OFF = 6
}
/**
 * Describes the enum domain.asset.v1.DisposalType.
 */
export declare const DisposalTypeSchema: GenEnum<DisposalType>;
/**
 * @generated from service domain.asset.v1.AssetDisposalDomainService
 */
export declare const AssetDisposalDomainService: GenService<{
    /**
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.CreateAssetDisposal
     */
    createAssetDisposal: {
        methodKind: "unary";
        input: typeof CreateAssetDisposalRequestSchema;
        output: typeof CreateAssetDisposalResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.ReadAssetDisposal
     */
    readAssetDisposal: {
        methodKind: "unary";
        input: typeof ReadAssetDisposalRequestSchema;
        output: typeof ReadAssetDisposalResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.UpdateAssetDisposal
     */
    updateAssetDisposal: {
        methodKind: "unary";
        input: typeof UpdateAssetDisposalRequestSchema;
        output: typeof UpdateAssetDisposalResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.DeleteAssetDisposal
     */
    deleteAssetDisposal: {
        methodKind: "unary";
        input: typeof DeleteAssetDisposalRequestSchema;
        output: typeof DeleteAssetDisposalResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.ListAssetDisposals
     */
    listAssetDisposals: {
        methodKind: "unary";
        input: typeof ListAssetDisposalsRequestSchema;
        output: typeof ListAssetDisposalsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.GetAssetDisposalListPageData
     */
    getAssetDisposalListPageData: {
        methodKind: "unary";
        input: typeof GetAssetDisposalListPageDataRequestSchema;
        output: typeof GetAssetDisposalListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDisposalDomainService.GetAssetDisposalItemPageData
     */
    getAssetDisposalItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetDisposalItemPageDataRequestSchema;
        output: typeof GetAssetDisposalItemPageDataResponseSchema;
    };
}>;
