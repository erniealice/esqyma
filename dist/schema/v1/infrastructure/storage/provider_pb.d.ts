import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { StorageProvider } from "./object_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/storage/provider.proto.
 */
export declare const file_infrastructure_storage_provider: GenFile;
/**
 * StorageProviderConfig represents storage provider configuration
 *
 * @generated from message infrastructure.storage.v1.StorageProviderConfig
 */
export type StorageProviderConfig = Message<"infrastructure.storage.v1.StorageProviderConfig"> & {
    /**
     * The provider type
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Whether this provider is enabled
     *
     * @generated from field: bool enabled = 2;
     */
    enabled: boolean;
    /**
     * Display name for the provider
     *
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * Provider-specific configuration
     *
     * @generated from oneof infrastructure.storage.v1.StorageProviderConfig.config
     */
    config: {
        /**
         * @generated from field: infrastructure.storage.v1.AzureStorageConfig azure_config = 100;
         */
        value: AzureStorageConfig;
        case: "azureConfig";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.GcsStorageConfig gcs_config = 101;
         */
        value: GcsStorageConfig;
        case: "gcsConfig";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.S3StorageConfig s3_config = 102;
         */
        value: S3StorageConfig;
        case: "s3Config";
    } | {
        /**
         * @generated from field: infrastructure.storage.v1.LocalStorageConfig local_config = 103;
         */
        value: LocalStorageConfig;
        case: "localConfig";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message infrastructure.storage.v1.StorageProviderConfig.
 * Use `create(StorageProviderConfigSchema)` to create a new message.
 */
export declare const StorageProviderConfigSchema: GenMessage<StorageProviderConfig>;
/**
 * AzureStorageConfig contains Azure Blob Storage specific configuration
 *
 * @generated from message infrastructure.storage.v1.AzureStorageConfig
 */
export type AzureStorageConfig = Message<"infrastructure.storage.v1.AzureStorageConfig"> & {
    /**
     * Azure storage account name
     *
     * @generated from field: string storage_account = 1;
     */
    storageAccount: string;
    /**
     * Storage account key (for key-based auth)
     *
     * @generated from field: string account_key = 2;
     */
    accountKey: string;
    /**
     * Connection string (alternative to account key)
     *
     * @generated from field: string connection_string = 3;
     */
    connectionString: string;
    /**
     * Whether to use managed identity for authentication
     *
     * @generated from field: bool use_managed_identity = 4;
     */
    useManagedIdentity: boolean;
    /**
     * Managed identity client ID
     *
     * @generated from field: string managed_identity_client_id = 5;
     */
    managedIdentityClientId: string;
    /**
     * Azure AD tenant ID
     *
     * @generated from field: string tenant_id = 6;
     */
    tenantId: string;
    /**
     * Default container for operations
     *
     * @generated from field: string default_container = 7;
     */
    defaultContainer: string;
    /**
     * Blob service endpoint URL
     *
     * @generated from field: string endpoint_url = 8;
     */
    endpointUrl: string;
    /**
     * Default encryption scope
     *
     * @generated from field: string default_encryption_scope = 9;
     */
    defaultEncryptionScope: string;
};
/**
 * Describes the message infrastructure.storage.v1.AzureStorageConfig.
 * Use `create(AzureStorageConfigSchema)` to create a new message.
 */
export declare const AzureStorageConfigSchema: GenMessage<AzureStorageConfig>;
/**
 * GcsStorageConfig contains Google Cloud Storage specific configuration
 *
 * @generated from message infrastructure.storage.v1.GcsStorageConfig
 */
export type GcsStorageConfig = Message<"infrastructure.storage.v1.GcsStorageConfig"> & {
    /**
     * GCP project ID
     *
     * @generated from field: string project_id = 1;
     */
    projectId: string;
    /**
     * Service account JSON key (for key-based auth)
     *
     * @generated from field: string service_account_key = 2;
     */
    serviceAccountKey: string;
    /**
     * Service account email
     *
     * @generated from field: string service_account_email = 3;
     */
    serviceAccountEmail: string;
    /**
     * Whether to use Application Default Credentials
     *
     * @generated from field: bool use_adc = 4;
     */
    useAdc: boolean;
    /**
     * Workload identity configuration (for GKE)
     *
     * @generated from field: string workload_identity_provider = 5;
     */
    workloadIdentityProvider: string;
    /**
     * Default bucket for operations
     *
     * @generated from field: string default_bucket = 6;
     */
    defaultBucket: string;
    /**
     * Storage API endpoint URL (optional)
     *
     * @generated from field: string endpoint_url = 7;
     */
    endpointUrl: string;
    /**
     * Default KMS key name for encryption
     *
     * @generated from field: string default_kms_key_name = 8;
     */
    defaultKmsKeyName: string;
    /**
     * Whether to use uniform bucket-level access by default
     *
     * @generated from field: bool uniform_bucket_level_access = 9;
     */
    uniformBucketLevelAccess: boolean;
};
/**
 * Describes the message infrastructure.storage.v1.GcsStorageConfig.
 * Use `create(GcsStorageConfigSchema)` to create a new message.
 */
export declare const GcsStorageConfigSchema: GenMessage<GcsStorageConfig>;
/**
 * S3StorageConfig contains Amazon S3 specific configuration
 *
 * @generated from message infrastructure.storage.v1.S3StorageConfig
 */
export type S3StorageConfig = Message<"infrastructure.storage.v1.S3StorageConfig"> & {
    /**
     * AWS region
     *
     * @generated from field: string region = 1;
     */
    region: string;
    /**
     * AWS access key ID (for key-based auth)
     *
     * @generated from field: string access_key_id = 2;
     */
    accessKeyId: string;
    /**
     * AWS secret access key (for key-based auth)
     *
     * @generated from field: string secret_access_key = 3;
     */
    secretAccessKey: string;
    /**
     * Session token (for temporary credentials)
     *
     * @generated from field: string session_token = 4;
     */
    sessionToken: string;
    /**
     * Whether to use IAM role credentials
     *
     * @generated from field: bool use_iam_role = 5;
     */
    useIamRole: boolean;
    /**
     * IAM role ARN to assume
     *
     * @generated from field: string iam_role_arn = 6;
     */
    iamRoleArn: string;
    /**
     * Default bucket for operations
     *
     * @generated from field: string default_bucket = 7;
     */
    defaultBucket: string;
    /**
     * S3 endpoint URL (for S3-compatible services)
     *
     * @generated from field: string endpoint_url = 8;
     */
    endpointUrl: string;
    /**
     * Whether to use path-style addressing
     *
     * @generated from field: bool use_path_style = 9;
     */
    usePathStyle: boolean;
    /**
     * Default KMS key ID for encryption
     *
     * @generated from field: string default_kms_key_id = 10;
     */
    defaultKmsKeyId: string;
    /**
     * Default SSE algorithm
     *
     * @generated from field: string default_sse_algorithm = 11;
     */
    defaultSseAlgorithm: string;
    /**
     * Whether to enable transfer acceleration
     *
     * @generated from field: bool enable_transfer_acceleration = 12;
     */
    enableTransferAcceleration: boolean;
    /**
     * Whether to use dual-stack endpoints (IPv4 and IPv6)
     *
     * @generated from field: bool use_dual_stack = 13;
     */
    useDualStack: boolean;
};
/**
 * Describes the message infrastructure.storage.v1.S3StorageConfig.
 * Use `create(S3StorageConfigSchema)` to create a new message.
 */
export declare const S3StorageConfigSchema: GenMessage<S3StorageConfig>;
/**
 * LocalStorageConfig contains local filesystem storage configuration
 *
 * @generated from message infrastructure.storage.v1.LocalStorageConfig
 */
export type LocalStorageConfig = Message<"infrastructure.storage.v1.LocalStorageConfig"> & {
    /**
     * Base directory for local storage
     *
     * @generated from field: string base_directory = 1;
     */
    baseDirectory: string;
    /**
     * Whether to create directories automatically
     *
     * @generated from field: bool auto_create_directories = 2;
     */
    autoCreateDirectories: boolean;
    /**
     * File permissions (Unix-style, e.g., "0755")
     *
     * @generated from field: string file_permissions = 3;
     */
    filePermissions: string;
    /**
     * Directory permissions (Unix-style, e.g., "0755")
     *
     * @generated from field: string directory_permissions = 4;
     */
    directoryPermissions: string;
};
/**
 * Describes the message infrastructure.storage.v1.LocalStorageConfig.
 * Use `create(LocalStorageConfigSchema)` to create a new message.
 */
export declare const LocalStorageConfigSchema: GenMessage<LocalStorageConfig>;
