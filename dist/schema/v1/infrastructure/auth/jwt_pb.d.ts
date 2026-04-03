import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Identity, Provider } from "./identity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/auth/jwt.proto.
 */
export declare const file_infrastructure_auth_jwt: GenFile;
/**
 * JwtToken represents a JSON Web Token with its claims
 *
 * @generated from message infrastructure.auth.v1.JwtToken
 */
export type JwtToken = Message<"infrastructure.auth.v1.JwtToken"> & {
    /**
     * The encoded JWT token string
     *
     * @generated from field: string token = 1;
     */
    token: string;
    /**
     * Token type (typically "Bearer")
     *
     * @generated from field: string token_type = 2;
     */
    tokenType: string;
    /**
     * When the token expires
     *
     * @generated from field: google.protobuf.Timestamp expires_at = 3;
     */
    expiresAt?: Timestamp;
    /**
     * When the token was issued
     *
     * @generated from field: google.protobuf.Timestamp issued_at = 4;
     */
    issuedAt?: Timestamp;
    /**
     * Issuer of the token
     *
     * @generated from field: string issuer = 5;
     */
    issuer: string;
    /**
     * Audience for the token
     *
     * @generated from field: repeated string audience = 6;
     */
    audience: string[];
    /**
     * Subject (user/service identifier)
     *
     * @generated from field: string subject = 7;
     */
    subject: string;
    /**
     * Scopes/permissions granted by this token
     *
     * @generated from field: repeated string scopes = 8;
     */
    scopes: string[];
    /**
     * Custom claims in the JWT
     *
     * @generated from field: map<string, string> custom_claims = 9;
     */
    customClaims: {
        [key: string]: string;
    };
    /**
     * Provider that issued this token
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 10;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.JwtToken.
 * Use `create(JwtTokenSchema)` to create a new message.
 */
export declare const JwtTokenSchema: GenMessage<JwtToken>;
/**
 * GenerateJwtTokenRequest is a request to generate a new JWT token
 *
 * @generated from message infrastructure.auth.v1.GenerateJwtTokenRequest
 */
export type GenerateJwtTokenRequest = Message<"infrastructure.auth.v1.GenerateJwtTokenRequest"> & {
    /**
     * Identity to generate token for
     *
     * @generated from field: string identity_id = 1;
     */
    identityId: string;
    /**
     * Provider to use for token generation
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * How long the token should be valid (in seconds)
     *
     * @generated from field: int64 expires_in_seconds = 3;
     */
    expiresInSeconds: bigint;
    /**
     * Scopes/permissions to include in the token
     *
     * @generated from field: repeated string scopes = 4;
     */
    scopes: string[];
    /**
     * Custom claims to include in the token
     *
     * @generated from field: map<string, string> custom_claims = 5;
     */
    customClaims: {
        [key: string]: string;
    };
    /**
     * Audience for the token
     *
     * @generated from field: repeated string audience = 6;
     */
    audience: string[];
};
/**
 * Describes the message infrastructure.auth.v1.GenerateJwtTokenRequest.
 * Use `create(GenerateJwtTokenRequestSchema)` to create a new message.
 */
export declare const GenerateJwtTokenRequestSchema: GenMessage<GenerateJwtTokenRequest>;
/**
 * GenerateJwtTokenResponse contains the generated JWT token
 *
 * @generated from message infrastructure.auth.v1.GenerateJwtTokenResponse
 */
export type GenerateJwtTokenResponse = Message<"infrastructure.auth.v1.GenerateJwtTokenResponse"> & {
    /**
     * The generated JWT token
     *
     * @generated from field: infrastructure.auth.v1.JwtToken token = 1;
     */
    token?: JwtToken;
    /**
     * Any warnings or notes about token generation
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.GenerateJwtTokenResponse.
 * Use `create(GenerateJwtTokenResponseSchema)` to create a new message.
 */
export declare const GenerateJwtTokenResponseSchema: GenMessage<GenerateJwtTokenResponse>;
/**
 * ValidateJwtTokenRequest is a request to validate a JWT token
 *
 * @generated from message infrastructure.auth.v1.ValidateJwtTokenRequest
 */
export type ValidateJwtTokenRequest = Message<"infrastructure.auth.v1.ValidateJwtTokenRequest"> & {
    /**
     * The JWT token string to validate
     *
     * @generated from field: string token = 1;
     */
    token: string;
    /**
     * Provider to validate against
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * Expected audience (optional, for additional validation)
     *
     * @generated from field: repeated string expected_audience = 3;
     */
    expectedAudience: string[];
    /**
     * Required scopes (optional, for authorization check)
     *
     * @generated from field: repeated string required_scopes = 4;
     */
    requiredScopes: string[];
};
/**
 * Describes the message infrastructure.auth.v1.ValidateJwtTokenRequest.
 * Use `create(ValidateJwtTokenRequestSchema)` to create a new message.
 */
export declare const ValidateJwtTokenRequestSchema: GenMessage<ValidateJwtTokenRequest>;
/**
 * ValidateJwtTokenResponse contains the validation result
 *
 * @generated from message infrastructure.auth.v1.ValidateJwtTokenResponse
 */
export type ValidateJwtTokenResponse = Message<"infrastructure.auth.v1.ValidateJwtTokenResponse"> & {
    /**
     * Whether the token is valid
     *
     * @generated from field: bool is_valid = 1;
     */
    isValid: boolean;
    /**
     * The decoded token (if valid)
     *
     * @generated from field: infrastructure.auth.v1.JwtToken token = 2;
     */
    token?: JwtToken;
    /**
     * Identity associated with the token (if valid)
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
     * @generated from field: repeated infrastructure.auth.v1.ValidationError validation_errors = 5;
     */
    validationErrors: ValidationError[];
};
/**
 * Describes the message infrastructure.auth.v1.ValidateJwtTokenResponse.
 * Use `create(ValidateJwtTokenResponseSchema)` to create a new message.
 */
export declare const ValidateJwtTokenResponseSchema: GenMessage<ValidateJwtTokenResponse>;
/**
 * ValidationError represents a specific validation failure
 *
 * @generated from message infrastructure.auth.v1.ValidationError
 */
export type ValidationError = Message<"infrastructure.auth.v1.ValidationError"> & {
    /**
     * Type of validation error
     *
     * @generated from field: infrastructure.auth.v1.ValidationErrorType type = 1;
     */
    type: ValidationErrorType;
    /**
     * Human-readable error message
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.ValidationError.
 * Use `create(ValidationErrorSchema)` to create a new message.
 */
export declare const ValidationErrorSchema: GenMessage<ValidationError>;
/**
 * RefreshJwtRequest is a request to refresh an expired JWT token
 * TODO: Implement refresh token functionality in future phase
 *
 * @generated from message infrastructure.auth.v1.RefreshJwtRequest
 */
export type RefreshJwtRequest = Message<"infrastructure.auth.v1.RefreshJwtRequest"> & {
    /**
     * The refresh token (to be implemented)
     *
     * @generated from field: string refresh_token = 1;
     */
    refreshToken: string;
    /**
     * Provider to use for token refresh
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.RefreshJwtRequest.
 * Use `create(RefreshJwtRequestSchema)` to create a new message.
 */
export declare const RefreshJwtRequestSchema: GenMessage<RefreshJwtRequest>;
/**
 * RefreshJwtResponse contains the refreshed JWT token
 * TODO: Implement refresh token functionality in future phase
 *
 * @generated from message infrastructure.auth.v1.RefreshJwtResponse
 */
export type RefreshJwtResponse = Message<"infrastructure.auth.v1.RefreshJwtResponse"> & {
    /**
     * The new access token
     *
     * @generated from field: infrastructure.auth.v1.JwtToken access_token = 1;
     */
    accessToken?: JwtToken;
    /**
     * The new refresh token (optional, if rotation is enabled)
     *
     * @generated from field: string refresh_token = 2;
     */
    refreshToken: string;
};
/**
 * Describes the message infrastructure.auth.v1.RefreshJwtResponse.
 * Use `create(RefreshJwtResponseSchema)` to create a new message.
 */
export declare const RefreshJwtResponseSchema: GenMessage<RefreshJwtResponse>;
/**
 * ValidationErrorType enumerates possible validation errors
 *
 * @generated from enum infrastructure.auth.v1.ValidationErrorType
 */
export declare enum ValidationErrorType {
    /**
     * @generated from enum value: VALIDATION_ERROR_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Token has expired
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_EXPIRED = 1;
     */
    EXPIRED = 1,
    /**
     * Signature verification failed
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_INVALID_SIGNATURE = 2;
     */
    INVALID_SIGNATURE = 2,
    /**
     * Issuer doesn't match expected
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_INVALID_ISSUER = 3;
     */
    INVALID_ISSUER = 3,
    /**
     * Audience doesn't match expected
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_INVALID_AUDIENCE = 4;
     */
    INVALID_AUDIENCE = 4,
    /**
     * Required claims are missing
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_MISSING_CLAIMS = 5;
     */
    MISSING_CLAIMS = 5,
    /**
     * Required scopes not present
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_INSUFFICIENT_SCOPES = 6;
     */
    INSUFFICIENT_SCOPES = 6,
    /**
     * Token is malformed
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_MALFORMED = 7;
     */
    MALFORMED = 7,
    /**
     * Token not yet valid (nbf claim)
     *
     * @generated from enum value: VALIDATION_ERROR_TYPE_NOT_YET_VALID = 8;
     */
    NOT_YET_VALID = 8
}
/**
 * Describes the enum infrastructure.auth.v1.ValidationErrorType.
 */
export declare const ValidationErrorTypeSchema: GenEnum<ValidationErrorType>;
