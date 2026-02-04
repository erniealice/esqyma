import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { StorageObject, StorageProvider } from "./object_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/storage/download.proto.
 */
export declare const file_infrastructure_storage_download: GenFile;
/**
 * DownloadObjectRequest is a request to download an object from storage
 *
 * @generated from message infrastructure.storage.v1.DownloadObjectRequest
 */
export type DownloadObjectRequest = Message<"infrastructure.storage.v1.DownloadObjectRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Container/bucket name
     *
     * @generated from field: string container_name = 2;
     */
    containerName: string;
    /**
     * Object key/name
     *
     * @generated from field: string object_key = 3;
     */
    objectKey: string;
    /**
     * Version ID (if versioning is enabled)
     *
     * @generated from field: string version_id = 4;
     */
    versionId: string;
    /**
     * Range to download (optional, for partial downloads)
     * Format: "bytes=0-1023" for first 1024 bytes
     *
     * @generated from field: string range = 5;
     */
    range: string;
};
/**
 * Describes the message infrastructure.storage.v1.DownloadObjectRequest.
 * Use `create(DownloadObjectRequestSchema)` to create a new message.
 */
export declare const DownloadObjectRequestSchema: GenMessage<DownloadObjectRequest>;
/**
 * DownloadObjectResponse contains the downloaded object
 *
 * @generated from message infrastructure.storage.v1.DownloadObjectResponse
 */
export type DownloadObjectResponse = Message<"infrastructure.storage.v1.DownloadObjectResponse"> & {
    /**
     * Whether the download was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * The object metadata
     *
     * @generated from field: infrastructure.storage.v1.StorageObject object = 2;
     */
    object?: StorageObject;
    /**
     * File content (for small files)
     *
     * @generated from field: bytes content = 3;
     */
    content: Uint8Array;
    /**
     * Download duration in milliseconds
     *
     * @generated from field: int64 download_duration_ms = 4;
     */
    downloadDurationMs: bigint;
    /**
     * Message about the download
     *
     * @generated from field: string message = 5;
     */
    message: string;
};
/**
 * Describes the message infrastructure.storage.v1.DownloadObjectResponse.
 * Use `create(DownloadObjectResponseSchema)` to create a new message.
 */
export declare const DownloadObjectResponseSchema: GenMessage<DownloadObjectResponse>;
/**
 * GetPresignedUrlRequest is a request to generate a presigned/SAS URL
 *
 * @generated from message infrastructure.storage.v1.GetPresignedUrlRequest
 */
export type GetPresignedUrlRequest = Message<"infrastructure.storage.v1.GetPresignedUrlRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Container/bucket name
     *
     * @generated from field: string container_name = 2;
     */
    containerName: string;
    /**
     * Object key/name
     *
     * @generated from field: string object_key = 3;
     */
    objectKey: string;
    /**
     * URL operation (download, upload, delete)
     *
     * @generated from field: infrastructure.storage.v1.PresignedUrlOperation operation = 4;
     */
    operation: PresignedUrlOperation;
    /**
     * How long the URL should be valid (in seconds)
     *
     * @generated from field: int64 expires_in_seconds = 5;
     */
    expiresInSeconds: bigint;
    /**
     * Content type for upload operations (optional)
     *
     * @generated from field: string content_type = 6;
     */
    contentType: string;
    /**
     * Custom filename for Content-Disposition header (optional)
     *
     * @generated from field: string filename = 7;
     */
    filename: string;
};
/**
 * Describes the message infrastructure.storage.v1.GetPresignedUrlRequest.
 * Use `create(GetPresignedUrlRequestSchema)` to create a new message.
 */
export declare const GetPresignedUrlRequestSchema: GenMessage<GetPresignedUrlRequest>;
/**
 * GetPresignedUrlResponse contains the generated presigned URL
 *
 * @generated from message infrastructure.storage.v1.GetPresignedUrlResponse
 */
export type GetPresignedUrlResponse = Message<"infrastructure.storage.v1.GetPresignedUrlResponse"> & {
    /**
     * Whether generation was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * The presigned URL
     *
     * @generated from field: string url = 2;
     */
    url: string;
    /**
     * When the URL expires
     *
     * @generated from field: google.protobuf.Timestamp expires_at = 3;
     */
    expiresAt?: Timestamp;
    /**
     * HTTP method to use with the URL (GET, PUT, DELETE)
     *
     * @generated from field: string http_method = 4;
     */
    httpMethod: string;
    /**
     * Headers that must be included in the request (provider-specific)
     *
     * @generated from field: map<string, string> required_headers = 5;
     */
    requiredHeaders: {
        [key: string]: string;
    };
    /**
     * Message about the URL generation
     *
     * @generated from field: string message = 6;
     */
    message: string;
};
/**
 * Describes the message infrastructure.storage.v1.GetPresignedUrlResponse.
 * Use `create(GetPresignedUrlResponseSchema)` to create a new message.
 */
export declare const GetPresignedUrlResponseSchema: GenMessage<GetPresignedUrlResponse>;
/**
 * StreamDownloadRequest is a request to stream download a large file
 * TODO: Implement streaming downloads in future phase
 *
 * @generated from message infrastructure.storage.v1.StreamDownloadRequest
 */
export type StreamDownloadRequest = Message<"infrastructure.storage.v1.StreamDownloadRequest"> & {
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 1;
     */
    provider: StorageProvider;
    /**
     * Container/bucket name
     *
     * @generated from field: string container_name = 2;
     */
    containerName: string;
    /**
     * Object key/name
     *
     * @generated from field: string object_key = 3;
     */
    objectKey: string;
    /**
     * Chunk size in bytes (for streaming)
     *
     * @generated from field: int64 chunk_size = 4;
     */
    chunkSize: bigint;
    /**
     * Offset to start from (for resuming downloads)
     *
     * @generated from field: int64 offset = 5;
     */
    offset: bigint;
};
/**
 * Describes the message infrastructure.storage.v1.StreamDownloadRequest.
 * Use `create(StreamDownloadRequestSchema)` to create a new message.
 */
export declare const StreamDownloadRequestSchema: GenMessage<StreamDownloadRequest>;
/**
 * StreamDownloadResponse contains a chunk of the downloaded file
 * TODO: Implement streaming downloads in future phase
 *
 * @generated from message infrastructure.storage.v1.StreamDownloadResponse
 */
export type StreamDownloadResponse = Message<"infrastructure.storage.v1.StreamDownloadResponse"> & {
    /**
     * Whether this chunk was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * The chunk content
     *
     * @generated from field: bytes chunk = 2;
     */
    chunk: Uint8Array;
    /**
     * Chunk number (0-indexed)
     *
     * @generated from field: int32 chunk_number = 3;
     */
    chunkNumber: number;
    /**
     * Offset of this chunk in the file
     *
     * @generated from field: int64 offset = 4;
     */
    offset: bigint;
    /**
     * Size of this chunk
     *
     * @generated from field: int64 chunk_size = 5;
     */
    chunkSize: bigint;
    /**
     * Whether this is the last chunk
     *
     * @generated from field: bool is_last_chunk = 6;
     */
    isLastChunk: boolean;
    /**
     * Total file size
     *
     * @generated from field: int64 total_size = 7;
     */
    totalSize: bigint;
};
/**
 * Describes the message infrastructure.storage.v1.StreamDownloadResponse.
 * Use `create(StreamDownloadResponseSchema)` to create a new message.
 */
export declare const StreamDownloadResponseSchema: GenMessage<StreamDownloadResponse>;
/**
 * GetDownloadProgressRequest gets the progress of an ongoing download
 * TODO: Implement download progress tracking in future phase
 *
 * @generated from message infrastructure.storage.v1.GetDownloadProgressRequest
 */
export type GetDownloadProgressRequest = Message<"infrastructure.storage.v1.GetDownloadProgressRequest"> & {
    /**
     * Download ID
     *
     * @generated from field: string download_id = 1;
     */
    downloadId: string;
    /**
     * Storage provider
     *
     * @generated from field: infrastructure.storage.v1.StorageProvider provider = 2;
     */
    provider: StorageProvider;
};
/**
 * Describes the message infrastructure.storage.v1.GetDownloadProgressRequest.
 * Use `create(GetDownloadProgressRequestSchema)` to create a new message.
 */
export declare const GetDownloadProgressRequestSchema: GenMessage<GetDownloadProgressRequest>;
/**
 * GetDownloadProgressResponse contains the download progress
 * TODO: Implement download progress tracking in future phase
 *
 * @generated from message infrastructure.storage.v1.GetDownloadProgressResponse
 */
export type GetDownloadProgressResponse = Message<"infrastructure.storage.v1.GetDownloadProgressResponse"> & {
    /**
     * Download ID
     *
     * @generated from field: string download_id = 1;
     */
    downloadId: string;
    /**
     * Bytes downloaded so far
     *
     * @generated from field: int64 bytes_downloaded = 2;
     */
    bytesDownloaded: bigint;
    /**
     * Total bytes to download
     *
     * @generated from field: int64 total_bytes = 3;
     */
    totalBytes: bigint;
    /**
     * Download progress percentage (0-100)
     *
     * @generated from field: float progress_percentage = 4;
     */
    progressPercentage: number;
    /**
     * Current download speed in bytes per second
     *
     * @generated from field: int64 speed_bps = 5;
     */
    speedBps: bigint;
    /**
     * Estimated time remaining in seconds
     *
     * @generated from field: int64 estimated_seconds_remaining = 6;
     */
    estimatedSecondsRemaining: bigint;
};
/**
 * Describes the message infrastructure.storage.v1.GetDownloadProgressResponse.
 * Use `create(GetDownloadProgressResponseSchema)` to create a new message.
 */
export declare const GetDownloadProgressResponseSchema: GenMessage<GetDownloadProgressResponse>;
/**
 * PresignedUrlOperation represents the operation the presigned URL will allow
 *
 * @generated from enum infrastructure.storage.v1.PresignedUrlOperation
 */
export declare enum PresignedUrlOperation {
    /**
     * @generated from enum value: PRESIGNED_URL_OPERATION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * GET operation
     *
     * @generated from enum value: PRESIGNED_URL_OPERATION_DOWNLOAD = 1;
     */
    DOWNLOAD = 1,
    /**
     * PUT operation
     *
     * @generated from enum value: PRESIGNED_URL_OPERATION_UPLOAD = 2;
     */
    UPLOAD = 2,
    /**
     * DELETE operation
     *
     * @generated from enum value: PRESIGNED_URL_OPERATION_DELETE = 3;
     */
    DELETE = 3
}
/**
 * Describes the enum infrastructure.storage.v1.PresignedUrlOperation.
 */
export declare const PresignedUrlOperationSchema: GenEnum<PresignedUrlOperation>;
