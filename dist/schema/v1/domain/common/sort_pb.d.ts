import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/sort.proto.
 */
export declare const file_domain_common_sort: GenFile;
/**
 * Sort request with multiple sort fields
 *
 * @generated from message domain.common.v1.SortRequest
 */
export type SortRequest = Message<"domain.common.v1.SortRequest"> & {
    /**
     * @generated from field: repeated domain.common.v1.SortField fields = 1;
     */
    fields: SortField[];
};
/**
 * Describes the message domain.common.v1.SortRequest.
 * Use `create(SortRequestSchema)` to create a new message.
 */
export declare const SortRequestSchema: GenMessage<SortRequest>;
/**
 * Individual sort field configuration
 *
 * @generated from message domain.common.v1.SortField
 */
export type SortField = Message<"domain.common.v1.SortField"> & {
    /**
     * Field to sort by (supports dot notation)
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     * @generated from field: domain.common.v1.SortDirection direction = 2;
     */
    direction: SortDirection;
    /**
     * @generated from field: domain.common.v1.NullOrder null_order = 3;
     */
    nullOrder: NullOrder;
    /**
     * Type-specific options
     *
     * @generated from field: optional domain.common.v1.StringSortOptions string_options = 4;
     */
    stringOptions?: StringSortOptions;
    /**
     * @generated from field: optional domain.common.v1.NumberSortOptions number_options = 5;
     */
    numberOptions?: NumberSortOptions;
};
/**
 * Describes the message domain.common.v1.SortField.
 * Use `create(SortFieldSchema)` to create a new message.
 */
export declare const SortFieldSchema: GenMessage<SortField>;
/**
 * String-specific sort options
 *
 * @generated from message domain.common.v1.StringSortOptions
 */
export type StringSortOptions = Message<"domain.common.v1.StringSortOptions"> & {
    /**
     * @generated from field: bool case_sensitive = 1;
     */
    caseSensitive: boolean;
    /**
     * Locale for string comparison
     *
     * @generated from field: string locale = 2;
     */
    locale: string;
};
/**
 * Describes the message domain.common.v1.StringSortOptions.
 * Use `create(StringSortOptionsSchema)` to create a new message.
 */
export declare const StringSortOptionsSchema: GenMessage<StringSortOptions>;
/**
 * Number-specific sort options
 *
 * @generated from message domain.common.v1.NumberSortOptions
 */
export type NumberSortOptions = Message<"domain.common.v1.NumberSortOptions"> & {
    /**
     * Sort by absolute value
     *
     * @generated from field: bool absolute_value = 1;
     */
    absoluteValue: boolean;
};
/**
 * Describes the message domain.common.v1.NumberSortOptions.
 * Use `create(NumberSortOptionsSchema)` to create a new message.
 */
export declare const NumberSortOptionsSchema: GenMessage<NumberSortOptions>;
/**
 * Sort direction
 *
 * @generated from enum domain.common.v1.SortDirection
 */
export declare enum SortDirection {
    /**
     * @generated from enum value: ASC = 0;
     */
    ASC = 0,
    /**
     * @generated from enum value: DESC = 1;
     */
    DESC = 1
}
/**
 * Describes the enum domain.common.v1.SortDirection.
 */
export declare const SortDirectionSchema: GenEnum<SortDirection>;
/**
 * Null value ordering
 *
 * @generated from enum domain.common.v1.NullOrder
 */
export declare enum NullOrder {
    /**
     * @generated from enum value: NULLS_FIRST = 0;
     */
    NULLS_FIRST = 0,
    /**
     * @generated from enum value: NULLS_LAST = 1;
     */
    NULLS_LAST = 1
}
/**
 * Describes the enum domain.common.v1.NullOrder.
 */
export declare const NullOrderSchema: GenEnum<NullOrder>;
