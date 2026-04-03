import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/pagination.proto.
 */
export declare const file_domain_common_pagination: GenFile;
/**
 * Pagination request with support for both offset and cursor-based pagination
 *
 * @generated from message domain.common.v1.PaginationRequest
 */
export type PaginationRequest = Message<"domain.common.v1.PaginationRequest"> & {
    /**
     * Number of items per page (max 100)
     *
     * @generated from field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from oneof domain.common.v1.PaginationRequest.method
     */
    method: {
        /**
         * @generated from field: domain.common.v1.OffsetPagination offset = 2;
         */
        value: OffsetPagination;
        case: "offset";
    } | {
        /**
         * @generated from field: domain.common.v1.CursorPagination cursor = 3;
         */
        value: CursorPagination;
        case: "cursor";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message domain.common.v1.PaginationRequest.
 * Use `create(PaginationRequestSchema)` to create a new message.
 */
export declare const PaginationRequestSchema: GenMessage<PaginationRequest>;
/**
 * Offset-based pagination (page numbers)
 *
 * @generated from message domain.common.v1.OffsetPagination
 */
export type OffsetPagination = Message<"domain.common.v1.OffsetPagination"> & {
    /**
     * Page number (1-based)
     *
     * @generated from field: int32 page = 1;
     */
    page: number;
};
/**
 * Describes the message domain.common.v1.OffsetPagination.
 * Use `create(OffsetPaginationSchema)` to create a new message.
 */
export declare const OffsetPaginationSchema: GenMessage<OffsetPagination>;
/**
 * Cursor-based pagination (for performance)
 *
 * @generated from message domain.common.v1.CursorPagination
 */
export type CursorPagination = Message<"domain.common.v1.CursorPagination"> & {
    /**
     * Opaque cursor token
     *
     * @generated from field: string token = 1;
     */
    token: string;
};
/**
 * Describes the message domain.common.v1.CursorPagination.
 * Use `create(CursorPaginationSchema)` to create a new message.
 */
export declare const CursorPaginationSchema: GenMessage<CursorPagination>;
/**
 * Pagination response metadata
 *
 * @generated from message domain.common.v1.PaginationResponse
 */
export type PaginationResponse = Message<"domain.common.v1.PaginationResponse"> & {
    /**
     * @generated from field: int32 total_items = 1;
     */
    totalItems: number;
    /**
     * For offset pagination
     *
     * @generated from field: optional int32 current_page = 2;
     */
    currentPage?: number;
    /**
     * For offset pagination
     *
     * @generated from field: optional int32 total_pages = 3;
     */
    totalPages?: number;
    /**
     * For cursor pagination
     *
     * @generated from field: optional string next_cursor = 4;
     */
    nextCursor?: string;
    /**
     * For cursor pagination
     *
     * @generated from field: optional string prev_cursor = 5;
     */
    prevCursor?: string;
    /**
     * @generated from field: bool has_next = 6;
     */
    hasNext: boolean;
    /**
     * @generated from field: bool has_prev = 7;
     */
    hasPrev: boolean;
};
/**
 * Describes the message domain.common.v1.PaginationResponse.
 * Use `create(PaginationResponseSchema)` to create a new message.
 */
export declare const PaginationResponseSchema: GenMessage<PaginationResponse>;
