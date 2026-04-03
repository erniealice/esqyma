import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { ObjectMetadata, StorageObject, StorageProvider } from "./object_pb";
import type { CreateContainerRequestSchema, CreateContainerResponseSchema, DeleteContainerRequestSchema, DeleteContainerResponseSchema, GetContainerRequestSchema, GetContainerResponseSchema } from "./container_pb";
import type { UploadObjectRequestSchema, UploadObjectResponseSchema } from "./upload_pb";
import type { DownloadObjectRequestSchema, DownloadObjectResponseSchema, GetPresignedUrlRequestSchema, GetPresignedUrlResponseSchema } from "./download_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/storage/storage.proto.
 */
export declare const file_infrastructure_storage_storage: GenFile;
/**
 * GetObjectMetadataRequest is a request to get object metadata without downloading
 * TODO: Implement in future phase
 *
 * @generated from message infrastructure.storage.v1.GetObjectMetadataRequest
 */
export type GetObjectMetadataRequest = Message<"infrastructure.storage.v1.GetObjectMetadataRequest"> & {
    /**
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * @generated from field: string container_name = 2;
     */
    containerName: string;
    /**
     * @generated from field: string object_key = 3;
     */
    objectKey: string;
    /**
     * @generated from field: string version_id = 4;
     */
    versionId: string;
};
/**
 * Describes the message infrastructure.storage.v1.GetObjectMetadataRequest.
 * Use `create(GetObjectMetadataRequestSchema)` to create a new message.
 */
export declare const GetObjectMetadataRequestSchema: GenMessage<GetObjectMetadataRequest>;
/**
 * GetObjectMetadataResponse contains the object metadata
 * TODO: Implement in future phase
 *
 * @generated from message infrastructure.storage.v1.GetObjectMetadataResponse
 */
export type GetObjectMetadataResponse = Message<"infrastructure.storage.v1.GetObjectMetadataResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: infrastructure.storage.v1.StorageObject object = 2;
     */
    object?: StorageObject;
};
/**
 * Describes the message infrastructure.storage.v1.GetObjectMetadataResponse.
 * Use `create(GetObjectMetadataResponseSchema)` to create a new message.
 */
export declare const GetObjectMetadataResponseSchema: GenMessage<GetObjectMetadataResponse>;
/**
 * DeleteObjectRequest is a request to delete an object
 * TODO: Implement in future phase
 *
 * @generated from message infrastructure.storage.v1.DeleteObjectRequest
 */
export type DeleteObjectRequest = Message<"infrastructure.storage.v1.DeleteObjectRequest"> & {
    /**
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * @generated from field: string container_name = 2;
     */
    containerName: string;
    /**
     * @generated from field: string object_key = 3;
     */
    objectKey: string;
    /**
     * @generated from field: string version_id = 4;
     */
    versionId: string;
    /**
     * Bypass soft delete if enabled
     *
     * @generated from field: bool permanent = 5;
     */
    permanent: boolean;
};
/**
 * Describes the message infrastructure.storage.v1.DeleteObjectRequest.
 * Use `create(DeleteObjectRequestSchema)` to create a new message.
 */
export declare const DeleteObjectRequestSchema: GenMessage<DeleteObjectRequest>;
/**
 * DeleteObjectResponse confirms the deletion
 * TODO: Implement in future phase
 *
 * @generated from message infrastructure.storage.v1.DeleteObjectResponse
 */
export type DeleteObjectResponse = Message<"infrastructure.storage.v1.DeleteObjectResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.storage.v1.DeleteObjectResponse.
 * Use `create(DeleteObjectResponseSchema)` to create a new message.
 */
export declare const DeleteObjectResponseSchema: GenMessage<DeleteObjectResponse>;
/**
 * ListObjectsRequest is a request to list objects in a container
 * TODO: Implement in future phase
 *
 * @generated from message infrastructure.storage.v1.ListObjectsRequest
 */
export type ListObjectsRequest = Message<"infrastructure.storage.v1.ListObjectsRequest"> & {
    /**
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * @generated from field: string container_name = 2;
     */
    containerName: string;
    /**
     * Filter by prefix
     *
     * @generated from field: string prefix = 3;
     */
    prefix: string;
    /**
     * Delimiter for hierarchy
     *
     * @generated from field: string delimiter = 4;
     */
    delimiter: string;
    /**
     * @generated from field: int32 max_results = 5;
     */
    maxResults: number;
    /**
     * @generated from field: string continuation_token = 6;
     */
    continuationToken: string;
};
/**
 * Describes the message infrastructure.storage.v1.ListObjectsRequest.
 * Use `create(ListObjectsRequestSchema)` to create a new message.
 */
export declare const ListObjectsRequestSchema: GenMessage<ListObjectsRequest>;
/**
 * ListObjectsResponse contains the list of objects
 * TODO: Implement in future phase
 *
 * @generated from message infrastructure.storage.v1.ListObjectsResponse
 */
export type ListObjectsResponse = Message<"infrastructure.storage.v1.ListObjectsResponse"> & {
    /**
     * @generated from field: repeated infrastructure.storage.v1.ObjectMetadata objects = 1;
     */
    objects: ObjectMetadata[];
    /**
     * @generated from field: string continuation_token = 2;
     */
    continuationToken: string;
    /**
     * @generated from field: bool is_truncated = 3;
     */
    isTruncated: boolean;
    /**
     * @generated from field: int32 total_count = 4;
     */
    totalCount: number;
};
/**
 * Describes the message infrastructure.storage.v1.ListObjectsResponse.
 * Use `create(ListObjectsResponseSchema)` to create a new message.
 */
export declare const ListObjectsResponseSchema: GenMessage<ListObjectsResponse>;
/**
 * StorageDomainService provides storage operations
 *
 * @generated from service infrastructure.storage.v1.StorageDomainService
 */
export declare const StorageDomainService: GenService<{
    /**
     * Container/bucket operations
     *
     * @generated from rpc infrastructure.storage.v1.StorageDomainService.CreateContainer
     */
    createContainer: {
        methodKind: "unary";
        input: typeof CreateContainerRequestSchema;
        output: typeof CreateContainerResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.storage.v1.StorageDomainService.GetContainer
     */
    getContainer: {
        methodKind: "unary";
        input: typeof GetContainerRequestSchema;
        output: typeof GetContainerResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.storage.v1.StorageDomainService.DeleteContainer
     */
    deleteContainer: {
        methodKind: "unary";
        input: typeof DeleteContainerRequestSchema;
        output: typeof DeleteContainerResponseSchema;
    };
    /**
     * Upload operations
     *
     * @generated from rpc infrastructure.storage.v1.StorageDomainService.UploadObject
     */
    uploadObject: {
        methodKind: "unary";
        input: typeof UploadObjectRequestSchema;
        output: typeof UploadObjectResponseSchema;
    };
    /**
     * Download operations
     *
     * @generated from rpc infrastructure.storage.v1.StorageDomainService.DownloadObject
     */
    downloadObject: {
        methodKind: "unary";
        input: typeof DownloadObjectRequestSchema;
        output: typeof DownloadObjectResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.storage.v1.StorageDomainService.GetPresignedUrl
     */
    getPresignedUrl: {
        methodKind: "unary";
        input: typeof GetPresignedUrlRequestSchema;
        output: typeof GetPresignedUrlResponseSchema;
    };
}>;
