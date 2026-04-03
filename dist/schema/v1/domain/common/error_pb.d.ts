import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Any } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/error.proto.
 */
export declare const file_domain_common_error: GenFile;
/**
 * *
 * Individual error detail for field-specific errors
 *
 * @generated from message domain.common.v1.ErrorDetail
 */
export type ErrorDetail = Message<"domain.common.v1.ErrorDetail"> & {
    /**
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * @generated from field: string code = 3;
     */
    code: string;
    /**
     * @generated from field: map<string, string> metadata = 4;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.common.v1.ErrorDetail.
 * Use `create(ErrorDetailSchema)` to create a new message.
 */
export declare const ErrorDetailSchema: GenMessage<ErrorDetail>;
/**
 * *
 * Main error message structure
 *
 * @generated from message domain.common.v1.Error
 */
export type Error = Message<"domain.common.v1.Error"> & {
    /**
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     * @generated from field: int32 status_code = 2;
     */
    statusCode: number;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * @generated from field: string message = 4;
     */
    message: string;
    /**
     * @generated from field: domain.common.v1.ErrorSeverity severity = 5;
     */
    severity: ErrorSeverity;
    /**
     * @generated from field: domain.common.v1.ErrorCategory category = 6;
     */
    category: ErrorCategory;
    /**
     * @generated from field: repeated domain.common.v1.ErrorDetail details = 7;
     */
    details: ErrorDetail[];
    /**
     * @generated from field: string trace_id = 8;
     */
    traceId: string;
    /**
     * @generated from field: string timestamp = 9;
     */
    timestamp: string;
    /**
     * @generated from field: string service = 10;
     */
    service: string;
    /**
     * @generated from field: string operation = 11;
     */
    operation: string;
    /**
     * @generated from field: map<string, string> metadata = 12;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.common.v1.Error.
 * Use `create(ErrorSchema)` to create a new message.
 */
export declare const ErrorSchema: GenMessage<Error>;
/**
 * *
 * Result wrapper for service responses
 *
 * @generated from message domain.common.v1.ServiceResult
 */
export type ServiceResult = Message<"domain.common.v1.ServiceResult"> & {
    /**
     * @generated from oneof domain.common.v1.ServiceResult.result
     */
    result: {
        /**
         * @generated from field: google.protobuf.Any data = 1;
         */
        value: Any;
        case: "data";
    } | {
        /**
         * @generated from field: domain.common.v1.Error error = 2;
         */
        value: Error;
        case: "error";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: string request_id = 4;
     */
    requestId: string;
    /**
     * @generated from field: string timestamp = 5;
     */
    timestamp: string;
};
/**
 * Describes the message domain.common.v1.ServiceResult.
 * Use `create(ServiceResultSchema)` to create a new message.
 */
export declare const ServiceResultSchema: GenMessage<ServiceResult>;
/**
 * *
 * Generic success response
 *
 * @generated from message domain.common.v1.SuccessResponse
 */
export type SuccessResponse = Message<"domain.common.v1.SuccessResponse"> & {
    /**
     * @generated from field: string message = 1;
     */
    message: string;
    /**
     * @generated from field: string request_id = 2;
     */
    requestId: string;
    /**
     * @generated from field: string timestamp = 3;
     */
    timestamp: string;
    /**
     * @generated from field: map<string, string> metadata = 4;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.common.v1.SuccessResponse.
 * Use `create(SuccessResponseSchema)` to create a new message.
 */
export declare const SuccessResponseSchema: GenMessage<SuccessResponse>;
/**
 * *
 * Generic error response
 *
 * @generated from message domain.common.v1.ErrorResponse
 */
export type ErrorResponse = Message<"domain.common.v1.ErrorResponse"> & {
    /**
     * @generated from field: domain.common.v1.Error error = 1;
     */
    error?: Error;
    /**
     * @generated from field: string request_id = 2;
     */
    requestId: string;
    /**
     * @generated from field: string timestamp = 3;
     */
    timestamp: string;
};
/**
 * Describes the message domain.common.v1.ErrorResponse.
 * Use `create(ErrorResponseSchema)` to create a new message.
 */
export declare const ErrorResponseSchema: GenMessage<ErrorResponse>;
/**
 * *
 * Error severity levels
 *
 * @generated from enum domain.common.v1.ErrorSeverity
 */
export declare enum ErrorSeverity {
    /**
     * @generated from enum value: ERROR_SEVERITY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ERROR_SEVERITY_INFO = 1;
     */
    INFO = 1,
    /**
     * @generated from enum value: ERROR_SEVERITY_WARNING = 2;
     */
    WARNING = 2,
    /**
     * @generated from enum value: ERROR_SEVERITY_ERROR = 3;
     */
    ERROR = 3,
    /**
     * @generated from enum value: ERROR_SEVERITY_CRITICAL = 4;
     */
    CRITICAL = 4
}
/**
 * Describes the enum domain.common.v1.ErrorSeverity.
 */
export declare const ErrorSeveritySchema: GenEnum<ErrorSeverity>;
/**
 * *
 * Error categories for better classification
 *
 * @generated from enum domain.common.v1.ErrorCategory
 */
export declare enum ErrorCategory {
    /**
     * @generated from enum value: ERROR_CATEGORY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ERROR_CATEGORY_VALIDATION = 1;
     */
    VALIDATION = 1,
    /**
     * @generated from enum value: ERROR_CATEGORY_AUTHENTICATION = 2;
     */
    AUTHENTICATION = 2,
    /**
     * @generated from enum value: ERROR_CATEGORY_AUTHORIZATION = 3;
     */
    AUTHORIZATION = 3,
    /**
     * @generated from enum value: ERROR_CATEGORY_NOT_FOUND = 4;
     */
    NOT_FOUND = 4,
    /**
     * @generated from enum value: ERROR_CATEGORY_CONFLICT = 5;
     */
    CONFLICT = 5,
    /**
     * @generated from enum value: ERROR_CATEGORY_RATE_LIMIT = 6;
     */
    RATE_LIMIT = 6,
    /**
     * @generated from enum value: ERROR_CATEGORY_INTERNAL_SERVER = 7;
     */
    INTERNAL_SERVER = 7,
    /**
     * @generated from enum value: ERROR_CATEGORY_EXTERNAL_SERVICE = 8;
     */
    EXTERNAL_SERVICE = 8,
    /**
     * @generated from enum value: ERROR_CATEGORY_NETWORK = 9;
     */
    NETWORK = 9,
    /**
     * @generated from enum value: ERROR_CATEGORY_TIMEOUT = 10;
     */
    TIMEOUT = 10
}
/**
 * Describes the enum domain.common.v1.ErrorCategory.
 */
export declare const ErrorCategorySchema: GenEnum<ErrorCategory>;
