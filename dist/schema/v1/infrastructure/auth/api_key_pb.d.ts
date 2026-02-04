import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Identity, Provider } from "./identity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/auth/api_key.proto.
 */
export declare const file_infrastructure_auth_api_key: GenFile;
/**
 * ApiKey represents an API key for service authentication
 *
 * @generated from message infrastructure.auth.v1.ApiKey
 */
export type ApiKey = Message<"infrastructure.auth.v1.ApiKey"> & {
    /**
     * Unique identifier for the API key
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * The actual API key value (only returned on creation)
     *
     * @generated from field: string key = 2;
     */
    key: string;
    /**
     * A prefix or hint of the key (for display purposes)
     *
     * @generated from field: string key_prefix = 3;
     */
    keyPrefix: string;
    /**
     * Human-readable name for the API key
     *
     * @generated from field: string name = 4;
     */
    name: string;
    /**
     * Description of the API key's purpose
     *
     * @generated from field: string description = 5;
     */
    description: string;
    /**
     * Identity that owns this API key
     *
     * @generated from field: string identity_id = 6;
     */
    identityId: string;
    /**
     * Provider where this key is used
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 7;
     */
    provider: Provider;
    /**
     * Scopes/permissions granted by this API key
     *
     * @generated from field: repeated string scopes = 8;
     */
    scopes: string[];
    /**
     * Whether the API key is currently active
     *
     * @generated from field: bool is_active = 9;
     */
    isActive: boolean;
    /**
     * When the API key was created
     *
     * @generated from field: google.protobuf.Timestamp created_at = 10;
     */
    createdAt?: Timestamp;
    /**
     * When the API key was last used
     *
     * @generated from field: google.protobuf.Timestamp last_used_at = 11;
     */
    lastUsedAt?: Timestamp;
    /**
     * When the API key expires (optional)
     *
     * @generated from field: google.protobuf.Timestamp expires_at = 12;
     */
    expiresAt?: Timestamp;
    /**
     * IP addresses allowed to use this key (optional)
     *
     * @generated from field: repeated string allowed_ips = 13;
     */
    allowedIps: string[];
    /**
     * Custom metadata for the API key
     *
     * @generated from field: map<string, string> metadata = 14;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message infrastructure.auth.v1.ApiKey.
 * Use `create(ApiKeySchema)` to create a new message.
 */
export declare const ApiKeySchema: GenMessage<ApiKey>;
/**
 * CreateApiKeyRequest is a request to create a new API key
 *
 * @generated from message infrastructure.auth.v1.CreateApiKeyRequest
 */
export type CreateApiKeyRequest = Message<"infrastructure.auth.v1.CreateApiKeyRequest"> & {
    /**
     * Identity to create the API key for
     *
     * @generated from field: string identity_id = 1;
     */
    identityId: string;
    /**
     * Provider to use for the API key
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * Name for the API key
     *
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * Description of the API key's purpose
     *
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * Scopes/permissions for the API key
     *
     * @generated from field: repeated string scopes = 5;
     */
    scopes: string[];
    /**
     * How long the key should be valid (in seconds, 0 = no expiration)
     *
     * @generated from field: int64 expires_in_seconds = 6;
     */
    expiresInSeconds: bigint;
    /**
     * IP addresses allowed to use this key (optional)
     *
     * @generated from field: repeated string allowed_ips = 7;
     */
    allowedIps: string[];
    /**
     * Custom metadata
     *
     * @generated from field: map<string, string> metadata = 8;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message infrastructure.auth.v1.CreateApiKeyRequest.
 * Use `create(CreateApiKeyRequestSchema)` to create a new message.
 */
export declare const CreateApiKeyRequestSchema: GenMessage<CreateApiKeyRequest>;
/**
 * CreateApiKeyResponse contains the newly created API key
 *
 * @generated from message infrastructure.auth.v1.CreateApiKeyResponse
 */
export type CreateApiKeyResponse = Message<"infrastructure.auth.v1.CreateApiKeyResponse"> & {
    /**
     * The created API key (includes the actual key value)
     *
     * @generated from field: infrastructure.auth.v1.ApiKey api_key = 1;
     */
    apiKey?: ApiKey;
    /**
     * Important warning about storing the key
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.CreateApiKeyResponse.
 * Use `create(CreateApiKeyResponseSchema)` to create a new message.
 */
export declare const CreateApiKeyResponseSchema: GenMessage<CreateApiKeyResponse>;
/**
 * ValidateApiKeyRequest is a request to validate an API key
 *
 * @generated from message infrastructure.auth.v1.ValidateApiKeyRequest
 */
export type ValidateApiKeyRequest = Message<"infrastructure.auth.v1.ValidateApiKeyRequest"> & {
    /**
     * The API key to validate
     *
     * @generated from field: string key = 1;
     */
    key: string;
    /**
     * Provider to validate against
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * Required scopes (optional, for authorization check)
     *
     * @generated from field: repeated string required_scopes = 3;
     */
    requiredScopes: string[];
    /**
     * IP address of the request (optional, for IP allowlist check)
     *
     * @generated from field: string request_ip = 4;
     */
    requestIp: string;
};
/**
 * Describes the message infrastructure.auth.v1.ValidateApiKeyRequest.
 * Use `create(ValidateApiKeyRequestSchema)` to create a new message.
 */
export declare const ValidateApiKeyRequestSchema: GenMessage<ValidateApiKeyRequest>;
/**
 * ValidateApiKeyResponse contains the validation result
 *
 * @generated from message infrastructure.auth.v1.ValidateApiKeyResponse
 */
export type ValidateApiKeyResponse = Message<"infrastructure.auth.v1.ValidateApiKeyResponse"> & {
    /**
     * Whether the API key is valid
     *
     * @generated from field: bool is_valid = 1;
     */
    isValid: boolean;
    /**
     * The API key details (if valid, without the actual key value)
     *
     * @generated from field: infrastructure.auth.v1.ApiKey api_key = 2;
     */
    apiKey?: ApiKey;
    /**
     * Identity associated with the API key (if valid)
     *
     * @generated from field: infrastructure.auth.v1.Identity identity = 3;
     */
    identity?: Identity;
    /**
     * Validation error message (if invalid)
     *
     * @generated from field: string error_message = 4;
     */
    errorMessage: string;
    /**
     * Specific validation failures
     *
     * @generated from field: repeated infrastructure.auth.v1.ApiKeyValidationError validation_errors = 5;
     */
    validationErrors: ApiKeyValidationError[];
};
/**
 * Describes the message infrastructure.auth.v1.ValidateApiKeyResponse.
 * Use `create(ValidateApiKeyResponseSchema)` to create a new message.
 */
export declare const ValidateApiKeyResponseSchema: GenMessage<ValidateApiKeyResponse>;
/**
 * ApiKeyValidationError represents a specific API key validation failure
 *
 * @generated from message infrastructure.auth.v1.ApiKeyValidationError
 */
export type ApiKeyValidationError = Message<"infrastructure.auth.v1.ApiKeyValidationError"> & {
    /**
     * Type of validation error
     *
     * @generated from field: infrastructure.auth.v1.ApiKeyValidationErrorType type = 1;
     */
    type: ApiKeyValidationErrorType;
    /**
     * Human-readable error message
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.ApiKeyValidationError.
 * Use `create(ApiKeyValidationErrorSchema)` to create a new message.
 */
export declare const ApiKeyValidationErrorSchema: GenMessage<ApiKeyValidationError>;
/**
 * RevokeApiKeyRequest is a request to revoke an API key
 *
 * @generated from message infrastructure.auth.v1.RevokeApiKeyRequest
 */
export type RevokeApiKeyRequest = Message<"infrastructure.auth.v1.RevokeApiKeyRequest"> & {
    /**
     * The ID of the API key to revoke
     *
     * @generated from field: string api_key_id = 1;
     */
    apiKeyId: string;
    /**
     * Provider where the key is used
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * Reason for revocation (optional, for audit trail)
     *
     * @generated from field: string reason = 3;
     */
    reason: string;
};
/**
 * Describes the message infrastructure.auth.v1.RevokeApiKeyRequest.
 * Use `create(RevokeApiKeyRequestSchema)` to create a new message.
 */
export declare const RevokeApiKeyRequestSchema: GenMessage<RevokeApiKeyRequest>;
/**
 * RevokeApiKeyResponse confirms the API key was revoked
 *
 * @generated from message infrastructure.auth.v1.RevokeApiKeyResponse
 */
export type RevokeApiKeyResponse = Message<"infrastructure.auth.v1.RevokeApiKeyResponse"> & {
    /**
     * Whether the revocation was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the revocation
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.RevokeApiKeyResponse.
 * Use `create(RevokeApiKeyResponseSchema)` to create a new message.
 */
export declare const RevokeApiKeyResponseSchema: GenMessage<RevokeApiKeyResponse>;
/**
 * ListApiKeysRequest is a request to list API keys for an identity
 *
 * @generated from message infrastructure.auth.v1.ListApiKeysRequest
 */
export type ListApiKeysRequest = Message<"infrastructure.auth.v1.ListApiKeysRequest"> & {
    /**
     * Identity to list API keys for
     *
     * @generated from field: string identity_id = 1;
     */
    identityId: string;
    /**
     * Provider to filter by (optional)
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * Whether to include inactive keys
     *
     * @generated from field: bool include_inactive = 3;
     */
    includeInactive: boolean;
    /**
     * Pagination offset
     *
     * @generated from field: int32 offset = 4;
     */
    offset: number;
    /**
     * Pagination limit
     *
     * @generated from field: int32 limit = 5;
     */
    limit: number;
};
/**
 * Describes the message infrastructure.auth.v1.ListApiKeysRequest.
 * Use `create(ListApiKeysRequestSchema)` to create a new message.
 */
export declare const ListApiKeysRequestSchema: GenMessage<ListApiKeysRequest>;
/**
 * ListApiKeysResponse contains the list of API keys
 *
 * @generated from message infrastructure.auth.v1.ListApiKeysResponse
 */
export type ListApiKeysResponse = Message<"infrastructure.auth.v1.ListApiKeysResponse"> & {
    /**
     * List of API keys (without actual key values)
     *
     * @generated from field: repeated infrastructure.auth.v1.ApiKey api_keys = 1;
     */
    apiKeys: ApiKey[];
    /**
     * Total count of API keys
     *
     * @generated from field: int32 total_count = 2;
     */
    totalCount: number;
};
/**
 * Describes the message infrastructure.auth.v1.ListApiKeysResponse.
 * Use `create(ListApiKeysResponseSchema)` to create a new message.
 */
export declare const ListApiKeysResponseSchema: GenMessage<ListApiKeysResponse>;
/**
 * RotateApiKeyRequest is a request to rotate an API key
 * TODO: Implement API key rotation in future phase
 *
 * @generated from message infrastructure.auth.v1.RotateApiKeyRequest
 */
export type RotateApiKeyRequest = Message<"infrastructure.auth.v1.RotateApiKeyRequest"> & {
    /**
     * The ID of the API key to rotate
     *
     * @generated from field: string api_key_id = 1;
     */
    apiKeyId: string;
    /**
     * Provider where the key is used
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * Grace period for old key (in seconds)
     *
     * @generated from field: int64 grace_period_seconds = 3;
     */
    gracePeriodSeconds: bigint;
};
/**
 * Describes the message infrastructure.auth.v1.RotateApiKeyRequest.
 * Use `create(RotateApiKeyRequestSchema)` to create a new message.
 */
export declare const RotateApiKeyRequestSchema: GenMessage<RotateApiKeyRequest>;
/**
 * RotateApiKeyResponse contains the new API key
 * TODO: Implement API key rotation in future phase
 *
 * @generated from message infrastructure.auth.v1.RotateApiKeyResponse
 */
export type RotateApiKeyResponse = Message<"infrastructure.auth.v1.RotateApiKeyResponse"> & {
    /**
     * The new API key (includes the actual key value)
     *
     * @generated from field: infrastructure.auth.v1.ApiKey new_api_key = 1;
     */
    newApiKey?: ApiKey;
    /**
     * The old API key will be valid until this time
     *
     * @generated from field: google.protobuf.Timestamp old_key_expires_at = 2;
     */
    oldKeyExpiresAt?: Timestamp;
    /**
     * Message about the rotation
     *
     * @generated from field: string message = 3;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.RotateApiKeyResponse.
 * Use `create(RotateApiKeyResponseSchema)` to create a new message.
 */
export declare const RotateApiKeyResponseSchema: GenMessage<RotateApiKeyResponse>;
/**
 * ApiKeyValidationErrorType enumerates possible API key validation errors
 *
 * @generated from enum infrastructure.auth.v1.ApiKeyValidationErrorType
 */
export declare enum ApiKeyValidationErrorType {
    /**
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * API key doesn't exist
     *
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_NOT_FOUND = 1;
     */
    NOT_FOUND = 1,
    /**
     * API key has expired
     *
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_EXPIRED = 2;
     */
    EXPIRED = 2,
    /**
     * API key is not active
     *
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_INACTIVE = 3;
     */
    INACTIVE = 3,
    /**
     * Required scopes not present
     *
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_INSUFFICIENT_SCOPES = 4;
     */
    INSUFFICIENT_SCOPES = 4,
    /**
     * Request IP not in allowlist
     *
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_IP_NOT_ALLOWED = 5;
     */
    IP_NOT_ALLOWED = 5,
    /**
     * API key is malformed
     *
     * @generated from enum value: API_KEY_VALIDATION_ERROR_TYPE_MALFORMED = 6;
     */
    MALFORMED = 6
}
/**
 * Describes the enum infrastructure.auth.v1.ApiKeyValidationErrorType.
 */
export declare const ApiKeyValidationErrorTypeSchema: GenEnum<ApiKeyValidationErrorType>;
