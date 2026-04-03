import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { StorageProvider } from "./object_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/storage/access_tier.proto.
 */
export declare const file_infrastructure_storage_access_tier: GenFile;
/**
 * ProviderStorageClass represents provider-specific storage class information
 *
 * @generated from message infrastructure.storage.v1.ProviderStorageClass
 */
export type ProviderStorageClass = Message<"infrastructure.storage.v1.ProviderStorageClass"> & {
    /**
     * The common access tier
     *
     * @generated from field: infrastructure.storage.v1.AccessTier access_tier = 1;
     */
    accessTier: AccessTier;
    /**
     * Provider-specific storage class name
     *
     * @generated from field: string provider_class_name = 2;
     */
    providerClassName: string;
    /**
     * Provider-specific minimum storage duration (in days)
     *
     * @generated from field: int32 minimum_storage_days = 3;
     */
    minimumStorageDays: number;
    /**
     * Estimated retrieval time description
     *
     * @generated from field: string retrieval_time = 4;
     */
    retrievalTime: string;
    /**
     * Whether retrieval incurs a cost
     *
     * @generated from field: bool has_retrieval_cost = 5;
     */
    hasRetrievalCost: boolean;
    /**
     * Additional notes about this storage class
     *
     * @generated from field: string notes = 6;
     */
    notes: string;
};
/**
 * Describes the message infrastructure.storage.v1.ProviderStorageClass.
 * Use `create(ProviderStorageClassSchema)` to create a new message.
 */
export declare const ProviderStorageClassSchema: GenMessage<ProviderStorageClass>;
/**
 * StorageClassMapping provides the mapping between common tiers and provider classes
 *
 * @generated from message infrastructure.storage.v1.StorageClassMapping
 */
export type StorageClassMapping = Message<"infrastructure.storage.v1.StorageClassMapping"> & {};
/**
 * Describes the message infrastructure.storage.v1.StorageClassMapping.
 * Use `create(StorageClassMappingSchema)` to create a new message.
 */
export declare const StorageClassMappingSchema: GenMessage<StorageClassMapping>;
/**
 * Azure Blob Storage classes
 *
 * @generated from message infrastructure.storage.v1.StorageClassMapping.AzureClasses
 */
export type StorageClassMapping_AzureClasses = Message<"infrastructure.storage.v1.StorageClassMapping.AzureClasses"> & {
    /**
     * HOT -> Hot tier
     *
     * "Hot"
     *
     * @generated from field: string hot = 1;
     */
    hot: string;
    /**
     * COOL -> Cool tier (30-day minimum)
     *
     * "Cool"
     *
     * @generated from field: string cool = 2;
     */
    cool: string;
    /**
     * COLD -> Cold tier (90-day minimum)
     *
     * "Cold"
     *
     * @generated from field: string cold = 3;
     */
    cold: string;
    /**
     * ARCHIVE -> Archive tier (180-day minimum, hours to rehydrate)
     *
     * "Archive"
     *
     * @generated from field: string archive = 4;
     */
    archive: string;
};
/**
 * Describes the message infrastructure.storage.v1.StorageClassMapping.AzureClasses.
 * Use `create(StorageClassMapping_AzureClassesSchema)` to create a new message.
 */
export declare const StorageClassMapping_AzureClassesSchema: GenMessage<StorageClassMapping_AzureClasses>;
/**
 * Google Cloud Storage classes
 *
 * @generated from message infrastructure.storage.v1.StorageClassMapping.GcsClasses
 */
export type StorageClassMapping_GcsClasses = Message<"infrastructure.storage.v1.StorageClassMapping.GcsClasses"> & {
    /**
     * HOT -> Standard storage
     *
     * "STANDARD"
     *
     * @generated from field: string standard = 1;
     */
    standard: string;
    /**
     * COOL -> Nearline storage (30-day minimum)
     *
     * "NEARLINE"
     *
     * @generated from field: string nearline = 2;
     */
    nearline: string;
    /**
     * COLD -> Coldline storage (90-day minimum)
     *
     * "COLDLINE"
     *
     * @generated from field: string coldline = 3;
     */
    coldline: string;
    /**
     * ARCHIVE -> Archive storage (365-day minimum)
     *
     * "ARCHIVE"
     *
     * @generated from field: string archive = 4;
     */
    archive: string;
};
/**
 * Describes the message infrastructure.storage.v1.StorageClassMapping.GcsClasses.
 * Use `create(StorageClassMapping_GcsClassesSchema)` to create a new message.
 */
export declare const StorageClassMapping_GcsClassesSchema: GenMessage<StorageClassMapping_GcsClasses>;
/**
 * Amazon S3 storage classes
 *
 * @generated from message infrastructure.storage.v1.StorageClassMapping.S3Classes
 */
export type StorageClassMapping_S3Classes = Message<"infrastructure.storage.v1.StorageClassMapping.S3Classes"> & {
    /**
     * HOT -> S3 Standard
     *
     * "STANDARD"
     *
     * @generated from field: string standard = 1;
     */
    standard: string;
    /**
     * COOL -> S3 Standard-IA (30-day minimum)
     *
     * "STANDARD_IA"
     *
     * @generated from field: string standard_ia = 2;
     */
    standardIa: string;
    /**
     * COOL (single AZ) -> S3 One Zone-IA (30-day minimum, lower cost)
     *
     * "ONEZONE_IA"
     *
     * @generated from field: string one_zone_ia = 3;
     */
    oneZoneIa: string;
    /**
     * COLD -> S3 Glacier Instant Retrieval (90-day minimum)
     *
     * "GLACIER_IR"
     *
     * @generated from field: string glacier_instant = 4;
     */
    glacierInstant: string;
    /**
     * ARCHIVE (flexible) -> S3 Glacier Flexible Retrieval (90-day minimum)
     *
     * "GLACIER"
     *
     * @generated from field: string glacier_flexible = 5;
     */
    glacierFlexible: string;
    /**
     * ARCHIVE (deep) -> S3 Glacier Deep Archive (180-day minimum, 12-hour retrieval)
     *
     * "DEEP_ARCHIVE"
     *
     * @generated from field: string glacier_deep = 6;
     */
    glacierDeep: string;
    /**
     * INTELLIGENT -> S3 Intelligent-Tiering (automatic optimization)
     *
     * "INTELLIGENT_TIERING"
     *
     * @generated from field: string intelligent_tiering = 7;
     */
    intelligentTiering: string;
    /**
     * Express One Zone (low latency, single AZ)
     *
     * "EXPRESS_ONEZONE"
     *
     * @generated from field: string express_one_zone = 8;
     */
    expressOneZone: string;
};
/**
 * Describes the message infrastructure.storage.v1.StorageClassMapping.S3Classes.
 * Use `create(StorageClassMapping_S3ClassesSchema)` to create a new message.
 */
export declare const StorageClassMapping_S3ClassesSchema: GenMessage<StorageClassMapping_S3Classes>;
/**
 * SetAccessTierRequest is a request to change an object's access tier
 * TODO: Implement access tier changes in future phase
 *
 * @generated from message infrastructure.storage.v1.SetAccessTierRequest
 */
export type SetAccessTierRequest = Message<"infrastructure.storage.v1.SetAccessTierRequest"> & {
    /**
     * Container name
     *
     * @generated from field: string container_name = 1;
     */
    containerName: string;
    /**
     * Object key
     *
     * @generated from field: string object_key = 2;
     */
    objectKey: string;
    /**
     * New access tier
     *
     * @generated from field: infrastructure.storage.v1.AccessTier access_tier = 3;
     */
    accessTier: AccessTier;
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 4;
     */
    provider: StorageProvider;
};
/**
 * Describes the message infrastructure.storage.v1.SetAccessTierRequest.
 * Use `create(SetAccessTierRequestSchema)` to create a new message.
 */
export declare const SetAccessTierRequestSchema: GenMessage<SetAccessTierRequest>;
/**
 * SetAccessTierResponse confirms the tier change
 * TODO: Implement access tier changes in future phase
 *
 * @generated from message infrastructure.storage.v1.SetAccessTierResponse
 */
export type SetAccessTierResponse = Message<"infrastructure.storage.v1.SetAccessTierResponse"> & {
    /**
     * Whether the change was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * The new access tier
     *
     * @generated from field: infrastructure.storage.v1.AccessTier access_tier = 2;
     */
    accessTier: AccessTier;
    /**
     * Provider-specific storage class name
     *
     * @generated from field: string provider_class_name = 3;
     */
    providerClassName: string;
    /**
     * Message about the change
     *
     * @generated from field: string message = 4;
     */
    message: string;
};
/**
 * Describes the message infrastructure.storage.v1.SetAccessTierResponse.
 * Use `create(SetAccessTierResponseSchema)` to create a new message.
 */
export declare const SetAccessTierResponseSchema: GenMessage<SetAccessTierResponse>;
/**
 * AccessTier represents the storage class/access tier across providers
 * This enum provides a common abstraction that maps to provider-specific storage classes
 *
 * @generated from enum infrastructure.storage.v1.AccessTier
 */
export declare enum AccessTier {
    /**
     * @generated from enum value: ACCESS_TIER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * HOT tier - Frequently accessed data, optimized for access speed
     * Maps to:
     * - Azure: Hot tier
     * - GCP: Standard storage
     * - AWS: S3 Standard
     *
     * @generated from enum value: ACCESS_TIER_HOT = 1;
     */
    HOT = 1,
    /**
     * COOL tier - Infrequently accessed data (accessed ~once per month)
     * Lower storage cost than HOT, higher access cost
     * Maps to:
     * - Azure: Cool tier
     * - GCP: Nearline storage
     * - AWS: S3 Standard-IA (Infrequent Access)
     *
     * @generated from enum value: ACCESS_TIER_COOL = 2;
     */
    COOL = 2,
    /**
     * COLD tier - Rarely accessed data (accessed ~once per quarter)
     * Lower storage cost than COOL, higher access cost
     * Maps to:
     * - Azure: Cold tier
     * - GCP: Coldline storage
     * - AWS: S3 Glacier Instant Retrieval
     *
     * @generated from enum value: ACCESS_TIER_COLD = 3;
     */
    COLD = 3,
    /**
     * ARCHIVE tier - Long-term archival data (accessed ~once per year or less)
     * Lowest storage cost, highest access cost, retrieval may take hours
     * Maps to:
     * - Azure: Archive tier
     * - GCP: Archive storage
     * - AWS: S3 Glacier Deep Archive
     *
     * @generated from enum value: ACCESS_TIER_ARCHIVE = 4;
     */
    ARCHIVE = 4,
    /**
     * INTELLIGENT tier - Automatic tier optimization based on access patterns
     * Only available on some providers
     * Maps to:
     * - Azure: Not directly supported (use lifecycle policies)
     * - GCP: Not directly supported (use lifecycle policies)
     * - AWS: S3 Intelligent-Tiering
     *
     * @generated from enum value: ACCESS_TIER_INTELLIGENT = 5;
     */
    INTELLIGENT = 5
}
/**
 * Describes the enum infrastructure.storage.v1.AccessTier.
 */
export declare const AccessTierSchema: GenEnum<AccessTier>;
