import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { AssetCategory } from "../asset_category/asset_category_pb";
import type { Location } from "../../entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/asset/asset/asset.proto.
 */
export declare const file_domain_asset_asset_asset: GenFile;
/**
 * @generated from message domain.asset.v1.Asset
 */
export type Asset = Message<"domain.asset.v1.Asset"> & {
    /**
     * Core identity
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string asset_number = 2;
     */
    assetNumber: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: optional string description = 4;
     */
    description?: string;
    /**
     * @generated from field: domain.asset.v1.AssetType asset_type = 5;
     */
    assetType: AssetType;
    /**
     * @generated from field: string asset_category_id = 6;
     */
    assetCategoryId: string;
    /**
     * @generated from field: optional domain.asset.v1.AssetCategory asset_category = 7;
     */
    assetCategory?: AssetCategory;
    /**
     * Physical identification
     *
     * @generated from field: optional string serial_number = 8;
     */
    serialNumber?: string;
    /**
     * @generated from field: optional string tag_number = 9;
     */
    tagNumber?: string;
    /**
     * @generated from field: optional string manufacturer = 10;
     */
    manufacturer?: string;
    /**
     * @generated from field: optional string model = 11;
     */
    model?: string;
    /**
     * Location and custody
     *
     * @generated from field: optional string location_id = 12;
     */
    locationId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 13;
     */
    location?: Location;
    /**
     * FK to entity.User
     *
     * @generated from field: optional string custodian_id = 14;
     */
    custodianId?: string;
    /**
     * FK to entity.Client
     *
     * @generated from field: optional string vendor_id = 15;
     */
    vendorId?: string;
    /**
     * FK to product.Product (optional)
     *
     * @generated from field: optional string product_id = 16;
     */
    productId?: string;
    /**
     * Acquisition
     *
     * @generated from field: optional string purchase_order_number = 17;
     */
    purchaseOrderNumber?: string;
    /**
     * @generated from field: optional string invoice_number = 18;
     */
    invoiceNumber?: string;
    /**
     * @generated from field: optional int64 acquisition_date = 19;
     */
    acquisitionDate?: bigint;
    /**
     * @generated from field: optional string acquisition_date_string = 20;
     */
    acquisitionDateString?: string;
    /**
     * @generated from field: optional int64 date_placed_in_service = 21;
     */
    datePlacedInService?: bigint;
    /**
     * @generated from field: optional string date_placed_in_service_string = 22;
     */
    datePlacedInServiceString?: string;
    /**
     * Cost and value
     *
     * @generated from field: double acquisition_cost = 23;
     */
    acquisitionCost: number;
    /**
     * @generated from field: string currency = 24;
     */
    currency: string;
    /**
     * @generated from field: double salvage_value = 25;
     */
    salvageValue: number;
    /**
     * @generated from field: double book_value = 26;
     */
    bookValue: number;
    /**
     * @generated from field: optional double fair_value = 27;
     */
    fairValue?: number;
    /**
     * Depreciation configuration
     *
     * @generated from field: int32 useful_life_months = 28;
     */
    usefulLifeMonths: number;
    /**
     * @generated from field: optional int64 useful_life_units = 29;
     */
    usefulLifeUnits?: bigint;
    /**
     * @generated from field: domain.asset.v1.DepreciationMethod depreciation_method = 30;
     */
    depreciationMethod: DepreciationMethod;
    /**
     * @generated from field: optional double depreciation_rate = 31;
     */
    depreciationRate?: number;
    /**
     * @generated from field: optional int64 depreciation_start_date = 32;
     */
    depreciationStartDate?: bigint;
    /**
     * @generated from field: optional string depreciation_start_date_string = 33;
     */
    depreciationStartDateString?: string;
    /**
     * @generated from field: double accumulated_depreciation = 34;
     */
    accumulatedDepreciation: number;
    /**
     * Measurement model
     *
     * @generated from field: domain.asset.v1.MeasurementModel measurement_model = 35;
     */
    measurementModel: MeasurementModel;
    /**
     * Status and lifecycle
     *
     * @generated from field: domain.asset.v1.AssetStatus status = 36;
     */
    status: AssetStatus;
    /**
     * @generated from field: optional int64 warranty_expiry_date = 37;
     */
    warrantyExpiryDate?: bigint;
    /**
     * @generated from field: optional string warranty_expiry_date_string = 38;
     */
    warrantyExpiryDateString?: string;
    /**
     * @generated from field: optional string notes = 39;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 40;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 41;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 42;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 43;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 44;
     */
    active: boolean;
};
/**
 * Describes the message domain.asset.v1.Asset.
 * Use `create(AssetSchema)` to create a new message.
 */
export declare const AssetSchema: GenMessage<Asset>;
/**
 * @generated from message domain.asset.v1.CreateAssetRequest
 */
export type CreateAssetRequest = Message<"domain.asset.v1.CreateAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
};
/**
 * Describes the message domain.asset.v1.CreateAssetRequest.
 * Use `create(CreateAssetRequestSchema)` to create a new message.
 */
export declare const CreateAssetRequestSchema: GenMessage<CreateAssetRequest>;
/**
 * @generated from message domain.asset.v1.CreateAssetResponse
 */
export type CreateAssetResponse = Message<"domain.asset.v1.CreateAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.CreateAssetResponse.
 * Use `create(CreateAssetResponseSchema)` to create a new message.
 */
export declare const CreateAssetResponseSchema: GenMessage<CreateAssetResponse>;
/**
 * @generated from message domain.asset.v1.ReadAssetRequest
 */
export type ReadAssetRequest = Message<"domain.asset.v1.ReadAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
};
/**
 * Describes the message domain.asset.v1.ReadAssetRequest.
 * Use `create(ReadAssetRequestSchema)` to create a new message.
 */
export declare const ReadAssetRequestSchema: GenMessage<ReadAssetRequest>;
/**
 * @generated from message domain.asset.v1.ReadAssetResponse
 */
export type ReadAssetResponse = Message<"domain.asset.v1.ReadAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.ReadAssetResponse.
 * Use `create(ReadAssetResponseSchema)` to create a new message.
 */
export declare const ReadAssetResponseSchema: GenMessage<ReadAssetResponse>;
/**
 * @generated from message domain.asset.v1.UpdateAssetRequest
 */
export type UpdateAssetRequest = Message<"domain.asset.v1.UpdateAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
};
/**
 * Describes the message domain.asset.v1.UpdateAssetRequest.
 * Use `create(UpdateAssetRequestSchema)` to create a new message.
 */
export declare const UpdateAssetRequestSchema: GenMessage<UpdateAssetRequest>;
/**
 * @generated from message domain.asset.v1.UpdateAssetResponse
 */
export type UpdateAssetResponse = Message<"domain.asset.v1.UpdateAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.UpdateAssetResponse.
 * Use `create(UpdateAssetResponseSchema)` to create a new message.
 */
export declare const UpdateAssetResponseSchema: GenMessage<UpdateAssetResponse>;
/**
 * @generated from message domain.asset.v1.DeleteAssetRequest
 */
export type DeleteAssetRequest = Message<"domain.asset.v1.DeleteAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
};
/**
 * Describes the message domain.asset.v1.DeleteAssetRequest.
 * Use `create(DeleteAssetRequestSchema)` to create a new message.
 */
export declare const DeleteAssetRequestSchema: GenMessage<DeleteAssetRequest>;
/**
 * @generated from message domain.asset.v1.DeleteAssetResponse
 */
export type DeleteAssetResponse = Message<"domain.asset.v1.DeleteAssetResponse"> & {
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
 * Describes the message domain.asset.v1.DeleteAssetResponse.
 * Use `create(DeleteAssetResponseSchema)` to create a new message.
 */
export declare const DeleteAssetResponseSchema: GenMessage<DeleteAssetResponse>;
/**
 * @generated from message domain.asset.v1.ListAssetsRequest
 */
export type ListAssetsRequest = Message<"domain.asset.v1.ListAssetsRequest"> & {
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
 * Describes the message domain.asset.v1.ListAssetsRequest.
 * Use `create(ListAssetsRequestSchema)` to create a new message.
 */
export declare const ListAssetsRequestSchema: GenMessage<ListAssetsRequest>;
/**
 * @generated from message domain.asset.v1.ListAssetsResponse
 */
export type ListAssetsResponse = Message<"domain.asset.v1.ListAssetsResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.ListAssetsResponse.
 * Use `create(ListAssetsResponseSchema)` to create a new message.
 */
export declare const ListAssetsResponseSchema: GenMessage<ListAssetsResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetListPageDataRequest
 */
export type GetAssetListPageDataRequest = Message<"domain.asset.v1.GetAssetListPageDataRequest"> & {
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
 * Describes the message domain.asset.v1.GetAssetListPageDataRequest.
 * Use `create(GetAssetListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetListPageDataRequestSchema: GenMessage<GetAssetListPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetListPageDataResponse
 */
export type GetAssetListPageDataResponse = Message<"domain.asset.v1.GetAssetListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset asset_list = 1;
     */
    assetList: Asset[];
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
 * Describes the message domain.asset.v1.GetAssetListPageDataResponse.
 * Use `create(GetAssetListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetListPageDataResponseSchema: GenMessage<GetAssetListPageDataResponse>;
/**
 * @generated from message domain.asset.v1.GetAssetItemPageDataRequest
 */
export type GetAssetItemPageDataRequest = Message<"domain.asset.v1.GetAssetItemPageDataRequest"> & {
    /**
     * @generated from field: string asset_id = 1;
     */
    assetId: string;
};
/**
 * Describes the message domain.asset.v1.GetAssetItemPageDataRequest.
 * Use `create(GetAssetItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAssetItemPageDataRequestSchema: GenMessage<GetAssetItemPageDataRequest>;
/**
 * @generated from message domain.asset.v1.GetAssetItemPageDataResponse
 */
export type GetAssetItemPageDataResponse = Message<"domain.asset.v1.GetAssetItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.asset.v1.Asset asset = 1;
     */
    asset?: Asset;
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
 * Describes the message domain.asset.v1.GetAssetItemPageDataResponse.
 * Use `create(GetAssetItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAssetItemPageDataResponseSchema: GenMessage<GetAssetItemPageDataResponse>;
/**
 * Lifecycle: Acquire an asset (transition to IN_SERVICE)
 *
 * @generated from message domain.asset.v1.AcquireAssetRequest
 */
export type AcquireAssetRequest = Message<"domain.asset.v1.AcquireAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
};
/**
 * Describes the message domain.asset.v1.AcquireAssetRequest.
 * Use `create(AcquireAssetRequestSchema)` to create a new message.
 */
export declare const AcquireAssetRequestSchema: GenMessage<AcquireAssetRequest>;
/**
 * @generated from message domain.asset.v1.AcquireAssetResponse
 */
export type AcquireAssetResponse = Message<"domain.asset.v1.AcquireAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.AcquireAssetResponse.
 * Use `create(AcquireAssetResponseSchema)` to create a new message.
 */
export declare const AcquireAssetResponseSchema: GenMessage<AcquireAssetResponse>;
/**
 * Lifecycle: Dispose of an asset
 *
 * @generated from message domain.asset.v1.DisposeAssetRequest
 */
export type DisposeAssetRequest = Message<"domain.asset.v1.DisposeAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
    /**
     * @generated from field: optional string disposal_type = 2;
     */
    disposalType?: string;
    /**
     * @generated from field: optional double proceeds = 3;
     */
    proceeds?: number;
    /**
     * @generated from field: optional string reason = 4;
     */
    reason?: string;
};
/**
 * Describes the message domain.asset.v1.DisposeAssetRequest.
 * Use `create(DisposeAssetRequestSchema)` to create a new message.
 */
export declare const DisposeAssetRequestSchema: GenMessage<DisposeAssetRequest>;
/**
 * @generated from message domain.asset.v1.DisposeAssetResponse
 */
export type DisposeAssetResponse = Message<"domain.asset.v1.DisposeAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.DisposeAssetResponse.
 * Use `create(DisposeAssetResponseSchema)` to create a new message.
 */
export declare const DisposeAssetResponseSchema: GenMessage<DisposeAssetResponse>;
/**
 * Lifecycle: Transfer an asset between locations
 *
 * @generated from message domain.asset.v1.TransferAssetRequest
 */
export type TransferAssetRequest = Message<"domain.asset.v1.TransferAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
    /**
     * @generated from field: string from_location_id = 2;
     */
    fromLocationId: string;
    /**
     * @generated from field: string to_location_id = 3;
     */
    toLocationId: string;
    /**
     * @generated from field: optional string notes = 4;
     */
    notes?: string;
};
/**
 * Describes the message domain.asset.v1.TransferAssetRequest.
 * Use `create(TransferAssetRequestSchema)` to create a new message.
 */
export declare const TransferAssetRequestSchema: GenMessage<TransferAssetRequest>;
/**
 * @generated from message domain.asset.v1.TransferAssetResponse
 */
export type TransferAssetResponse = Message<"domain.asset.v1.TransferAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.TransferAssetResponse.
 * Use `create(TransferAssetResponseSchema)` to create a new message.
 */
export declare const TransferAssetResponseSchema: GenMessage<TransferAssetResponse>;
/**
 * Depreciation: Run depreciation calculation for a period
 *
 * @generated from message domain.asset.v1.RunDepreciationRequest
 */
export type RunDepreciationRequest = Message<"domain.asset.v1.RunDepreciationRequest"> & {
    /**
     * Specific asset, or all if empty
     *
     * @generated from field: optional string asset_id = 1;
     */
    assetId?: string;
    /**
     * Run for a category
     *
     * @generated from field: optional string asset_category_id = 2;
     */
    assetCategoryId?: string;
    /**
     * @generated from field: int32 fiscal_year = 3;
     */
    fiscalYear: number;
    /**
     * @generated from field: int32 fiscal_period = 4;
     */
    fiscalPeriod: number;
    /**
     * @generated from field: int64 period_start_date = 5;
     */
    periodStartDate: bigint;
    /**
     * @generated from field: int64 period_end_date = 6;
     */
    periodEndDate: bigint;
};
/**
 * Describes the message domain.asset.v1.RunDepreciationRequest.
 * Use `create(RunDepreciationRequestSchema)` to create a new message.
 */
export declare const RunDepreciationRequestSchema: GenMessage<RunDepreciationRequest>;
/**
 * @generated from message domain.asset.v1.RunDepreciationResponse
 */
export type RunDepreciationResponse = Message<"domain.asset.v1.RunDepreciationResponse"> & {
    /**
     * @generated from field: int32 assets_processed = 1;
     */
    assetsProcessed: number;
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
 * Describes the message domain.asset.v1.RunDepreciationResponse.
 * Use `create(RunDepreciationResponseSchema)` to create a new message.
 */
export declare const RunDepreciationResponseSchema: GenMessage<RunDepreciationResponse>;
/**
 * Depreciation: Get the full depreciation schedule for an asset
 *
 * @generated from message domain.asset.v1.GetDepreciationScheduleRequest
 */
export type GetDepreciationScheduleRequest = Message<"domain.asset.v1.GetDepreciationScheduleRequest"> & {
    /**
     * @generated from field: string asset_id = 1;
     */
    assetId: string;
};
/**
 * Describes the message domain.asset.v1.GetDepreciationScheduleRequest.
 * Use `create(GetDepreciationScheduleRequestSchema)` to create a new message.
 */
export declare const GetDepreciationScheduleRequestSchema: GenMessage<GetDepreciationScheduleRequest>;
/**
 * @generated from message domain.asset.v1.GetDepreciationScheduleResponse
 */
export type GetDepreciationScheduleResponse = Message<"domain.asset.v1.GetDepreciationScheduleResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.GetDepreciationScheduleResponse.
 * Use `create(GetDepreciationScheduleResponseSchema)` to create a new message.
 */
export declare const GetDepreciationScheduleResponseSchema: GenMessage<GetDepreciationScheduleResponse>;
/**
 * Revaluation: Revalue an asset to fair value (IAS 16.31-42)
 *
 * @generated from message domain.asset.v1.RevalueAssetRequest
 */
export type RevalueAssetRequest = Message<"domain.asset.v1.RevalueAssetRequest"> & {
    /**
     * @generated from field: domain.asset.v1.Asset data = 1;
     */
    data?: Asset;
    /**
     * @generated from field: double new_fair_value = 2;
     */
    newFairValue: number;
    /**
     * @generated from field: optional string appraiser_name = 3;
     */
    appraiserName?: string;
    /**
     * @generated from field: optional string valuation_method = 4;
     */
    valuationMethod?: string;
    /**
     * @generated from field: optional string notes = 5;
     */
    notes?: string;
};
/**
 * Describes the message domain.asset.v1.RevalueAssetRequest.
 * Use `create(RevalueAssetRequestSchema)` to create a new message.
 */
export declare const RevalueAssetRequestSchema: GenMessage<RevalueAssetRequest>;
/**
 * @generated from message domain.asset.v1.RevalueAssetResponse
 */
export type RevalueAssetResponse = Message<"domain.asset.v1.RevalueAssetResponse"> & {
    /**
     * @generated from field: repeated domain.asset.v1.Asset data = 1;
     */
    data: Asset[];
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
 * Describes the message domain.asset.v1.RevalueAssetResponse.
 * Use `create(RevalueAssetResponseSchema)` to create a new message.
 */
export declare const RevalueAssetResponseSchema: GenMessage<RevalueAssetResponse>;
/**
 * AssetType distinguishes the accounting standard governing the asset.
 *
 * @generated from enum domain.asset.v1.AssetType
 */
export declare enum AssetType {
    /**
     * @generated from enum value: ASSET_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * IAS 16 — tangible fixed assets
     *
     * @generated from enum value: ASSET_TYPE_PROPERTY_PLANT_EQUIPMENT = 1;
     */
    PROPERTY_PLANT_EQUIPMENT = 1,
    /**
     * IAS 38 — software, patents, trademarks
     *
     * @generated from enum value: ASSET_TYPE_INTANGIBLE = 2;
     */
    INTANGIBLE = 2,
    /**
     * IFRS 16 — leased assets
     *
     * @generated from enum value: ASSET_TYPE_RIGHT_OF_USE = 3;
     */
    RIGHT_OF_USE = 3,
    /**
     * IAS 40 — land/buildings held for rental
     *
     * @generated from enum value: ASSET_TYPE_INVESTMENT_PROPERTY = 4;
     */
    INVESTMENT_PROPERTY = 4
}
/**
 * Describes the enum domain.asset.v1.AssetType.
 */
export declare const AssetTypeSchema: GenEnum<AssetType>;
/**
 * AssetStatus represents the current lifecycle state of an asset.
 *
 * @generated from enum domain.asset.v1.AssetStatus
 */
export declare enum AssetStatus {
    /**
     * @generated from enum value: ASSET_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ASSET_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: ASSET_STATUS_NOT_YET_ACQUIRED = 2;
     */
    NOT_YET_ACQUIRED = 2,
    /**
     * @generated from enum value: ASSET_STATUS_IN_SERVICE = 3;
     */
    IN_SERVICE = 3,
    /**
     * @generated from enum value: ASSET_STATUS_SUSPENDED = 4;
     */
    SUSPENDED = 4,
    /**
     * @generated from enum value: ASSET_STATUS_IMPAIRED = 5;
     */
    IMPAIRED = 5,
    /**
     * @generated from enum value: ASSET_STATUS_FULLY_DEPRECIATED = 6;
     */
    FULLY_DEPRECIATED = 6,
    /**
     * @generated from enum value: ASSET_STATUS_RETIRED = 7;
     */
    RETIRED = 7,
    /**
     * @generated from enum value: ASSET_STATUS_DISPOSED_SOLD = 8;
     */
    DISPOSED_SOLD = 8,
    /**
     * @generated from enum value: ASSET_STATUS_DISPOSED_SCRAPPED = 9;
     */
    DISPOSED_SCRAPPED = 9,
    /**
     * @generated from enum value: ASSET_STATUS_HELD_FOR_SALE = 10;
     */
    HELD_FOR_SALE = 10,
    /**
     * @generated from enum value: ASSET_STATUS_WRITTEN_OFF = 11;
     */
    WRITTEN_OFF = 11
}
/**
 * Describes the enum domain.asset.v1.AssetStatus.
 */
export declare const AssetStatusSchema: GenEnum<AssetStatus>;
/**
 * DepreciationMethod determines how periodic depreciation is calculated.
 *
 * @generated from enum domain.asset.v1.DepreciationMethod
 */
export declare enum DepreciationMethod {
    /**
     * @generated from enum value: DEPRECIATION_METHOD_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * IAS 16.62a — even distribution
     *
     * @generated from enum value: DEPRECIATION_METHOD_STRAIGHT_LINE = 1;
     */
    STRAIGHT_LINE = 1,
    /**
     * IAS 16.62b — accelerated
     *
     * @generated from enum value: DEPRECIATION_METHOD_DECLINING_BALANCE = 2;
     */
    DECLINING_BALANCE = 2,
    /**
     * 2x straight-line rate
     *
     * @generated from enum value: DEPRECIATION_METHOD_DOUBLE_DECLINING_BALANCE = 3;
     */
    DOUBLE_DECLINING_BALANCE = 3,
    /**
     * Declining fraction method
     *
     * @generated from enum value: DEPRECIATION_METHOD_SUM_OF_YEARS_DIGITS = 4;
     */
    SUM_OF_YEARS_DIGITS = 4,
    /**
     * IAS 16.62c — activity-based
     *
     * @generated from enum value: DEPRECIATION_METHOD_UNITS_OF_PRODUCTION = 5;
     */
    UNITS_OF_PRODUCTION = 5
}
/**
 * Describes the enum domain.asset.v1.DepreciationMethod.
 */
export declare const DepreciationMethodSchema: GenEnum<DepreciationMethod>;
/**
 * MeasurementModel determines how the asset is measured after initial recognition.
 *
 * @generated from enum domain.asset.v1.MeasurementModel
 */
export declare enum MeasurementModel {
    /**
     * @generated from enum value: MEASUREMENT_MODEL_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * IAS 16.30 — cost minus depreciation minus impairment
     *
     * @generated from enum value: MEASUREMENT_MODEL_COST = 1;
     */
    COST = 1,
    /**
     * IAS 16.31 — fair value minus subsequent depreciation
     *
     * @generated from enum value: MEASUREMENT_MODEL_REVALUATION = 2;
     */
    REVALUATION = 2
}
/**
 * Describes the enum domain.asset.v1.MeasurementModel.
 */
export declare const MeasurementModelSchema: GenEnum<MeasurementModel>;
/**
 * @generated from service domain.asset.v1.AssetDomainService
 */
export declare const AssetDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.asset.v1.AssetDomainService.CreateAsset
     */
    createAsset: {
        methodKind: "unary";
        input: typeof CreateAssetRequestSchema;
        output: typeof CreateAssetResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.ReadAsset
     */
    readAsset: {
        methodKind: "unary";
        input: typeof ReadAssetRequestSchema;
        output: typeof ReadAssetResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.UpdateAsset
     */
    updateAsset: {
        methodKind: "unary";
        input: typeof UpdateAssetRequestSchema;
        output: typeof UpdateAssetResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.DeleteAsset
     */
    deleteAsset: {
        methodKind: "unary";
        input: typeof DeleteAssetRequestSchema;
        output: typeof DeleteAssetResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.ListAssets
     */
    listAssets: {
        methodKind: "unary";
        input: typeof ListAssetsRequestSchema;
        output: typeof ListAssetsResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.asset.v1.AssetDomainService.GetAssetListPageData
     */
    getAssetListPageData: {
        methodKind: "unary";
        input: typeof GetAssetListPageDataRequestSchema;
        output: typeof GetAssetListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.GetAssetItemPageData
     */
    getAssetItemPageData: {
        methodKind: "unary";
        input: typeof GetAssetItemPageDataRequestSchema;
        output: typeof GetAssetItemPageDataResponseSchema;
    };
    /**
     * Lifecycle operations
     *
     * @generated from rpc domain.asset.v1.AssetDomainService.AcquireAsset
     */
    acquireAsset: {
        methodKind: "unary";
        input: typeof AcquireAssetRequestSchema;
        output: typeof AcquireAssetResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.DisposeAsset
     */
    disposeAsset: {
        methodKind: "unary";
        input: typeof DisposeAssetRequestSchema;
        output: typeof DisposeAssetResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.TransferAsset
     */
    transferAsset: {
        methodKind: "unary";
        input: typeof TransferAssetRequestSchema;
        output: typeof TransferAssetResponseSchema;
    };
    /**
     * Depreciation engine
     *
     * @generated from rpc domain.asset.v1.AssetDomainService.RunDepreciation
     */
    runDepreciation: {
        methodKind: "unary";
        input: typeof RunDepreciationRequestSchema;
        output: typeof RunDepreciationResponseSchema;
    };
    /**
     * @generated from rpc domain.asset.v1.AssetDomainService.GetDepreciationSchedule
     */
    getDepreciationSchedule: {
        methodKind: "unary";
        input: typeof GetDepreciationScheduleRequestSchema;
        output: typeof GetDepreciationScheduleResponseSchema;
    };
    /**
     * Revaluation (IFRS only)
     *
     * @generated from rpc domain.asset.v1.AssetDomainService.RevalueAsset
     */
    revalueAsset: {
        methodKind: "unary";
        input: typeof RevalueAssetRequestSchema;
        output: typeof RevalueAssetResponseSchema;
    };
}>;
