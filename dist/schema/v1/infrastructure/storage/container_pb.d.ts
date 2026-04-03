import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { StorageProvider } from "./object_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/storage/container.proto.
 */
export declare const file_infrastructure_storage_container: GenFile;
/**
 * StorageContainer represents a bucket/container in cloud storage
 *
 * @generated from message infrastructure.storage.v1.StorageContainer
 */
export type StorageContainer = Message<"infrastructure.storage.v1.StorageContainer"> & {
    /**
     * Unique identifier for the container
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 2;
     */
    provider: StorageProvider;
    /**
     * Container/bucket name (must be globally unique for some providers)
     *
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * Display name or description
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * Region/location where the container is stored
     *
     * @generated from field: string location = 5;
     */
    location: string;
    /**
     * When the container was created
     *
     * @generated from field: google.protobuf.Timestamp created_at = 6;
     */
    createdAt?: Timestamp;
    /**
     * Whether the container is public or private
     *
     * @generated from field: bool is_public = 7;
     */
    isPublic: boolean;
    /**
     * Whether versioning is enabled
     *
     * @generated from field: bool versioning_enabled = 8;
     */
    versioningEnabled: boolean;
    /**
     * Default storage class for objects in this container
     *
     * @generated from field: string default_storage_class = 9;
     */
    defaultStorageClass: string;
    /**
     * Whether encryption is enabled
     *
     * @generated from field: bool encryption_enabled = 10;
     */
    encryptionEnabled: boolean;
    /**
     * Custom metadata for the container
     *
     * @generated from field: map<string, string> metadata = 11;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific container information
     *
     * @generated from oneof infrastructure.storage.v1.StorageContainer.provider_container
     */
    providerContainer: {
        /**
         * @generated from field: infrastructure.storage.v1.AzureContainer azure_container = 100;
         */
        value: AzureContainer;
        case: "azureContainer";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.GcsContainer gcs_container = 101;
         */
        value: GcsContainer;
        case: "gcsContainer";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.S3Container s3_container = 102;
         */
        value: S3Container;
        case: "s3Container";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message infrastructure.storage.v1.StorageContainer.
 * Use `create(StorageContainerSchema)` to create a new message.
 */
export declare const StorageContainerSchema: GenMessage<StorageContainer>;
/**
 * AzureContainer contains Azure Blob Storage specific fields
 *
 * @generated from message infrastructure.storage.v1.AzureContainer
 */
export type AzureContainer = Message<"infrastructure.storage.v1.AzureContainer"> & {
    /**
     * Storage account name
     *
     * @generated from field: string storage_account = 1;
     */
    storageAccount: string;
    /**
     * Public access level (None, Blob, Container)
     *
     * @generated from field: string public_access = 2;
     */
    publicAccess: string;
    /**
     * Lease status
     *
     * @generated from field: string lease_status = 3;
     */
    leaseStatus: string;
    /**
     * Whether the container has an immutability policy
     *
     * @generated from field: bool has_immutability_policy = 4;
     */
    hasImmutabilityPolicy: boolean;
    /**
     * Whether legal hold is enabled
     *
     * @generated from field: bool has_legal_hold = 5;
     */
    hasLegalHold: boolean;
    /**
     * Default encryption scope
     *
     * @generated from field: string default_encryption_scope = 6;
     */
    defaultEncryptionScope: string;
};
/**
 * Describes the message infrastructure.storage.v1.AzureContainer.
 * Use `create(AzureContainerSchema)` to create a new message.
 */
export declare const AzureContainerSchema: GenMessage<AzureContainer>;
/**
 * GcsContainer contains Google Cloud Storage specific fields
 *
 * @generated from message infrastructure.storage.v1.GcsContainer
 */
export type GcsContainer = Message<"infrastructure.storage.v1.GcsContainer"> & {
    /**
     * GCP project ID
     *
     * @generated from field: string project_id = 1;
     */
    projectId: string;
    /**
     * Bucket location type (Region, Dual-region, Multi-region)
     *
     * @generated from field: string location_type = 2;
     */
    locationType: string;
    /**
     * Storage class (Standard, Nearline, Coldline, Archive)
     *
     * @generated from field: string storage_class = 3;
     */
    storageClass: string;
    /**
     * Whether hierarchical namespace is enabled
     *
     * @generated from field: bool hierarchical_namespace_enabled = 4;
     */
    hierarchicalNamespaceEnabled: boolean;
    /**
     * Whether uniform bucket-level access is enabled
     *
     * @generated from field: bool uniform_bucket_level_access = 5;
     */
    uniformBucketLevelAccess: boolean;
    /**
     * Retention policy duration (in seconds)
     *
     * @generated from field: int64 retention_period_seconds = 6;
     */
    retentionPeriodSeconds: bigint;
    /**
     * Whether the retention policy is locked
     *
     * @generated from field: bool retention_policy_locked = 7;
     */
    retentionPolicyLocked: boolean;
    /**
     * Customer-managed encryption key
     *
     * @generated from field: string kms_key_name = 8;
     */
    kmsKeyName: string;
};
/**
 * Describes the message infrastructure.storage.v1.GcsContainer.
 * Use `create(GcsContainerSchema)` to create a new message.
 */
export declare const GcsContainerSchema: GenMessage<GcsContainer>;
/**
 * S3Container contains Amazon S3 specific fields
 *
 * @generated from message infrastructure.storage.v1.S3Container
 */
export type S3Container = Message<"infrastructure.storage.v1.S3Container"> & {
    /**
     * AWS region
     *
     * @generated from field: string region = 1;
     */
    region: string;
    /**
     * Bucket type (general purpose or directory)
     *
     * @generated from field: string bucket_type = 2;
     */
    bucketType: string;
    /**
     * Whether bucket is configured for static website hosting
     *
     * @generated from field: bool website_enabled = 3;
     */
    websiteEnabled: boolean;
    /**
     * Whether transfer acceleration is enabled
     *
     * @generated from field: bool transfer_acceleration_enabled = 4;
     */
    transferAccelerationEnabled: boolean;
    /**
     * Whether object lock is enabled
     *
     * @generated from field: bool object_lock_enabled = 5;
     */
    objectLockEnabled: boolean;
    /**
     * Object lock configuration mode
     *
     * @generated from field: string object_lock_mode = 6;
     */
    objectLockMode: string;
    /**
     * Replication configuration status
     *
     * @generated from field: string replication_status = 7;
     */
    replicationStatus: string;
    /**
     * Server-side encryption configuration
     *
     * @generated from field: string sse_algorithm = 8;
     */
    sseAlgorithm: string;
    /**
     * KMS key ID for encryption
     *
     * @generated from field: string kms_key_id = 9;
     */
    kmsKeyId: string;
    /**
     * Whether requester pays is enabled
     *
     * @generated from field: bool requester_pays_enabled = 10;
     */
    requesterPaysEnabled: boolean;
};
/**
 * Describes the message infrastructure.storage.v1.S3Container.
 * Use `create(S3ContainerSchema)` to create a new message.
 */
export declare const S3ContainerSchema: GenMessage<S3Container>;
/**
 * CreateContainerRequest is a request to create a new storage container
 *
 * @generated from message infrastructure.storage.v1.CreateContainerRequest
 */
export type CreateContainerRequest = Message<"infrastructure.storage.v1.CreateContainerRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Container name
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Description
     *
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * Region/location
     *
     * @generated from field: string location = 4;
     */
    location: string;
    /**
     * Whether the container should be public
     *
     * @generated from field: bool is_public = 5;
     */
    isPublic: boolean;
    /**
     * Whether to enable versioning
     *
     * @generated from field: bool versioning_enabled = 6;
     */
    versioningEnabled: boolean;
    /**
     * Default storage class
     *
     * @generated from field: string default_storage_class = 7;
     */
    defaultStorageClass: string;
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 8;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific configuration
     *
     * @generated from oneof infrastructure.storage.v1.CreateContainerRequest.provider_config
     */
    providerConfig: {
        /**
         * @generated from field: infrastructure.storage.v1.AzureContainerConfig azure_config = 100;
         */
        value: AzureContainerConfig;
        case: "azureConfig";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.GcsContainerConfig gcs_config = 101;
         */
        value: GcsContainerConfig;
        case: "gcsConfig";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.S3ContainerConfig s3_config = 102;
         */
        value: S3ContainerConfig;
        case: "s3Config";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message infrastructure.storage.v1.CreateContainerRequest.
 * Use `create(CreateContainerRequestSchema)` to create a new message.
 */
export declare const CreateContainerRequestSchema: GenMessage<CreateContainerRequest>;
/**
 * Azure-specific container creation config
 *
 * @generated from message infrastructure.storage.v1.AzureContainerConfig
 */
export type AzureContainerConfig = Message<"infrastructure.storage.v1.AzureContainerConfig"> & {
    /**
     * @generated from field: string storage_account = 1;
     */
    storageAccount: string;
    /**
     * @generated from field: string public_access = 2;
     */
    publicAccess: string;
    /**
     * @generated from field: string default_encryption_scope = 3;
     */
    defaultEncryptionScope: string;
};
/**
 * Describes the message infrastructure.storage.v1.AzureContainerConfig.
 * Use `create(AzureContainerConfigSchema)` to create a new message.
 */
export declare const AzureContainerConfigSchema: GenMessage<AzureContainerConfig>;
/**
 * GCS-specific container creation config
 *
 * @generated from message infrastructure.storage.v1.GcsContainerConfig
 */
export type GcsContainerConfig = Message<"infrastructure.storage.v1.GcsContainerConfig"> & {
    /**
     * @generated from field: string project_id = 1;
     */
    projectId: string;
    /**
     * @generated from field: string location_type = 2;
     */
    locationType: string;
    /**
     * @generated from field: string storage_class = 3;
     */
    storageClass: string;
    /**
     * @generated from field: bool hierarchical_namespace_enabled = 4;
     */
    hierarchicalNamespaceEnabled: boolean;
    /**
     * @generated from field: bool uniform_bucket_level_access = 5;
     */
    uniformBucketLevelAccess: boolean;
    /**
     * @generated from field: string kms_key_name = 6;
     */
    kmsKeyName: string;
};
/**
 * Describes the message infrastructure.storage.v1.GcsContainerConfig.
 * Use `create(GcsContainerConfigSchema)` to create a new message.
 */
export declare const GcsContainerConfigSchema: GenMessage<GcsContainerConfig>;
/**
 * S3-specific container creation config
 *
 * @generated from message infrastructure.storage.v1.S3ContainerConfig
 */
export type S3ContainerConfig = Message<"infrastructure.storage.v1.S3ContainerConfig"> & {
    /**
     * @generated from field: string region = 1;
     */
    region: string;
    /**
     * @generated from field: string bucket_type = 2;
     */
    bucketType: string;
    /**
     * @generated from field: bool object_lock_enabled = 3;
     */
    objectLockEnabled: boolean;
    /**
     * @generated from field: string sse_algorithm = 4;
     */
    sseAlgorithm: string;
    /**
     * @generated from field: string kms_key_id = 5;
     */
    kmsKeyId: string;
};
/**
 * Describes the message infrastructure.storage.v1.S3ContainerConfig.
 * Use `create(S3ContainerConfigSchema)` to create a new message.
 */
export declare const S3ContainerConfigSchema: GenMessage<S3ContainerConfig>;
/**
 * CreateContainerResponse contains the created container
 *
 * @generated from message infrastructure.storage.v1.CreateContainerResponse
 */
export type CreateContainerResponse = Message<"infrastructure.storage.v1.CreateContainerResponse"> & {
    /**
     * The created container
     *
     * @generated from field: infrastructure.storage.v1.StorageContainer container = 1;
     */
    container?: StorageContainer;
    /**
     * Message about the creation
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.storage.v1.CreateContainerResponse.
 * Use `create(CreateContainerResponseSchema)` to create a new message.
 */
export declare const CreateContainerResponseSchema: GenMessage<CreateContainerResponse>;
/**
 * GetContainerRequest is a request to get container details
 *
 * @generated from message infrastructure.storage.v1.GetContainerRequest
 */
export type GetContainerRequest = Message<"infrastructure.storage.v1.GetContainerRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Container name
     *
     * @generated from field: string name = 2;
     */
    name: string;
};
/**
 * Describes the message infrastructure.storage.v1.GetContainerRequest.
 * Use `create(GetContainerRequestSchema)` to create a new message.
 */
export declare const GetContainerRequestSchema: GenMessage<GetContainerRequest>;
/**
 * GetContainerResponse contains the container details
 *
 * @generated from message infrastructure.storage.v1.GetContainerResponse
 */
export type GetContainerResponse = Message<"infrastructure.storage.v1.GetContainerResponse"> & {
    /**
     * The container
     *
     * @generated from field: infrastructure.storage.v1.StorageContainer container = 1;
     */
    container?: StorageContainer;
};
/**
 * Describes the message infrastructure.storage.v1.GetContainerResponse.
 * Use `create(GetContainerResponseSchema)` to create a new message.
 */
export declare const GetContainerResponseSchema: GenMessage<GetContainerResponse>;
/**
 * DeleteContainerRequest is a request to delete a container
 *
 * @generated from message infrastructure.storage.v1.DeleteContainerRequest
 */
export type DeleteContainerRequest = Message<"infrastructure.storage.v1.DeleteContainerRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Container name
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Whether to force delete (delete even if not empty)
     *
     * @generated from field: bool force = 3;
     */
    force: boolean;
};
/**
 * Describes the message infrastructure.storage.v1.DeleteContainerRequest.
 * Use `create(DeleteContainerRequestSchema)` to create a new message.
 */
export declare const DeleteContainerRequestSchema: GenMessage<DeleteContainerRequest>;
/**
 * DeleteContainerResponse confirms the deletion
 *
 * @generated from message infrastructure.storage.v1.DeleteContainerResponse
 */
export type DeleteContainerResponse = Message<"infrastructure.storage.v1.DeleteContainerResponse"> & {
    /**
     * Whether deletion was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the deletion
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.storage.v1.DeleteContainerResponse.
 * Use `create(DeleteContainerResponseSchema)` to create a new message.
 */
export declare const DeleteContainerResponseSchema: GenMessage<DeleteContainerResponse>;
/**
 * ListContainersRequest is a request to list containers
 * TODO: Implement container listing in future phase
 *
 * @generated from message infrastructure.storage.v1.ListContainersRequest
 */
export type ListContainersRequest = Message<"infrastructure.storage.v1.ListContainersRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Pagination offset
     *
     * @generated from field: int32 offset = 2;
     */
    offset: number;
    /**
     * Pagination limit
     *
     * @generated from field: int32 limit = 3;
     */
    limit: number;
    /**
     * Filter by location
     *
     * @generated from field: string location = 4;
     */
    location: string;
};
/**
 * Describes the message infrastructure.storage.v1.ListContainersRequest.
 * Use `create(ListContainersRequestSchema)` to create a new message.
 */
export declare const ListContainersRequestSchema: GenMessage<ListContainersRequest>;
/**
 * ListContainersResponse contains the list of containers
 * TODO: Implement container listing in future phase
 *
 * @generated from message infrastructure.storage.v1.ListContainersResponse
 */
export type ListContainersResponse = Message<"infrastructure.storage.v1.ListContainersResponse"> & {
    /**
     * List of containers
     *
     * @generated from field: repeated infrastructure.storage.v1.StorageContainer containers = 1;
     */
    containers: StorageContainer[];
    /**
     * Total count
     *
     * @generated from field: int32 total_count = 2;
     */
    totalCount: number;
};
/**
 * Describes the message infrastructure.storage.v1.ListContainersResponse.
 * Use `create(ListContainersResponseSchema)` to create a new message.
 */
export declare const ListContainersResponseSchema: GenMessage<ListContainersResponse>;
