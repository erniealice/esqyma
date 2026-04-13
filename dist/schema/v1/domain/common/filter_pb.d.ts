import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/common/filter.proto.
 */
export declare const file_domain_common_filter: GenFile;
/**
 * Filter request with multiple typed filters
 *
 * @generated from message domain.common.v1.FilterRequest
 */
export type FilterRequest = Message<"domain.common.v1.FilterRequest"> & {
    /**
     * @generated from field: repeated domain.common.v1.TypedFilter filters = 1;
     */
    filters: TypedFilter[];
    /**
     * AND/OR logic for combining filters
     *
     * @generated from field: domain.common.v1.FilterLogic logic = 2;
     */
    logic: FilterLogic;
};
/**
 * Describes the message domain.common.v1.FilterRequest.
 * Use `create(FilterRequestSchema)` to create a new message.
 */
export declare const FilterRequestSchema: GenMessage<FilterRequest>;
/**
 * Typed filter that can be one of several filter types
 *
 * @generated from message domain.common.v1.TypedFilter
 */
export type TypedFilter = Message<"domain.common.v1.TypedFilter"> & {
    /**
     * Field to filter on (supports dot notation)
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     * @generated from oneof domain.common.v1.TypedFilter.filter_type
     */
    filterType: {
        /**
         * @generated from field: domain.common.v1.StringFilter string_filter = 2;
         */
        value: StringFilter;
        case: "stringFilter";
    } | {
        /**
         * @generated from field: domain.common.v1.NumberFilter number_filter = 3;
         */
        value: NumberFilter;
        case: "numberFilter";
    } | {
        /**
         * @generated from field: domain.common.v1.DateFilter date_filter = 4;
         */
        value: DateFilter;
        case: "dateFilter";
    } | {
        /**
         * @generated from field: domain.common.v1.ListFilter list_filter = 5;
         */
        value: ListFilter;
        case: "listFilter";
    } | {
        /**
         * @generated from field: domain.common.v1.RangeFilter range_filter = 6;
         */
        value: RangeFilter;
        case: "rangeFilter";
    } | {
        /**
         * @generated from field: domain.common.v1.BooleanFilter boolean_filter = 7;
         */
        value: BooleanFilter;
        case: "booleanFilter";
    } | {
        /**
         * NEW
         *
         * @generated from field: domain.common.v1.MoneyFilter money_filter = 8;
         */
        value: MoneyFilter;
        case: "moneyFilter";
    } | {
        /**
         * NEW
         *
         * @generated from field: domain.common.v1.StatusFilter status_filter = 9;
         */
        value: StatusFilter;
        case: "statusFilter";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message domain.common.v1.TypedFilter.
 * Use `create(TypedFilterSchema)` to create a new message.
 */
export declare const TypedFilterSchema: GenMessage<TypedFilter>;
/**
 * String filter operations
 *
 * @generated from message domain.common.v1.StringFilter
 */
export type StringFilter = Message<"domain.common.v1.StringFilter"> & {
    /**
     * @generated from field: string value = 1;
     */
    value: string;
    /**
     * @generated from field: domain.common.v1.StringOperator operator = 2;
     */
    operator: StringOperator;
    /**
     * @generated from field: bool case_sensitive = 3;
     */
    caseSensitive: boolean;
};
/**
 * Describes the message domain.common.v1.StringFilter.
 * Use `create(StringFilterSchema)` to create a new message.
 */
export declare const StringFilterSchema: GenMessage<StringFilter>;
/**
 * Number filter operations
 *
 * @generated from message domain.common.v1.NumberFilter
 */
export type NumberFilter = Message<"domain.common.v1.NumberFilter"> & {
    /**
     * @generated from field: double value = 1;
     */
    value: number;
    /**
     * @generated from field: domain.common.v1.NumberOperator operator = 2;
     */
    operator: NumberOperator;
};
/**
 * Describes the message domain.common.v1.NumberFilter.
 * Use `create(NumberFilterSchema)` to create a new message.
 */
export declare const NumberFilterSchema: GenMessage<NumberFilter>;
/**
 * Date filter operations
 *
 * @generated from message domain.common.v1.DateFilter
 */
export type DateFilter = Message<"domain.common.v1.DateFilter"> & {
    /**
     * ISO 8601 date string
     *
     * @generated from field: string value = 1;
     */
    value: string;
    /**
     * @generated from field: domain.common.v1.DateOperator operator = 2;
     */
    operator: DateOperator;
    /**
     * For BETWEEN operator
     *
     * @generated from field: optional string range_end = 3;
     */
    rangeEnd?: string;
};
/**
 * Describes the message domain.common.v1.DateFilter.
 * Use `create(DateFilterSchema)` to create a new message.
 */
export declare const DateFilterSchema: GenMessage<DateFilter>;
/**
 * List filter operations (IN/NOT_IN)
 *
 * @generated from message domain.common.v1.ListFilter
 */
export type ListFilter = Message<"domain.common.v1.ListFilter"> & {
    /**
     * @generated from field: repeated string values = 1;
     */
    values: string[];
    /**
     * @generated from field: domain.common.v1.ListOperator operator = 2;
     */
    operator: ListOperator;
};
/**
 * Describes the message domain.common.v1.ListFilter.
 * Use `create(ListFilterSchema)` to create a new message.
 */
export declare const ListFilterSchema: GenMessage<ListFilter>;
/**
 * Range filter for numeric values
 *
 * @generated from message domain.common.v1.RangeFilter
 */
export type RangeFilter = Message<"domain.common.v1.RangeFilter"> & {
    /**
     * @generated from field: double min = 1;
     */
    min: number;
    /**
     * @generated from field: double max = 2;
     */
    max: number;
    /**
     * @generated from field: bool include_min = 3;
     */
    includeMin: boolean;
    /**
     * @generated from field: bool include_max = 4;
     */
    includeMax: boolean;
};
/**
 * Describes the message domain.common.v1.RangeFilter.
 * Use `create(RangeFilterSchema)` to create a new message.
 */
export declare const RangeFilterSchema: GenMessage<RangeFilter>;
/**
 * Boolean filter
 *
 * @generated from message domain.common.v1.BooleanFilter
 */
export type BooleanFilter = Message<"domain.common.v1.BooleanFilter"> & {
    /**
     * @generated from field: bool value = 1;
     */
    value: boolean;
};
/**
 * Describes the message domain.common.v1.BooleanFilter.
 * Use `create(BooleanFilterSchema)` to create a new message.
 */
export declare const BooleanFilterSchema: GenMessage<BooleanFilter>;
/**
 * Money filter for monetary amounts
 *
 * @generated from message domain.common.v1.MoneyFilter
 */
export type MoneyFilter = Message<"domain.common.v1.MoneyFilter"> & {
    /**
     * centavos
     *
     * @generated from field: int64 amount = 1;
     */
    amount: bigint;
    /**
     * @generated from field: domain.common.v1.MoneyOperator operator = 2;
     */
    operator: MoneyOperator;
    /**
     * centavos // used when operator = MONEY_BETWEEN
     *
     * @generated from field: int64 amount_to = 3;
     */
    amountTo: bigint;
};
/**
 * Describes the message domain.common.v1.MoneyFilter.
 * Use `create(MoneyFilterSchema)` to create a new message.
 */
export declare const MoneyFilterSchema: GenMessage<MoneyFilter>;
/**
 * Status filter — IN check against selected values
 *
 * @generated from message domain.common.v1.StatusFilter
 */
export type StatusFilter = Message<"domain.common.v1.StatusFilter"> & {
    /**
     * @generated from field: repeated string values = 1;
     */
    values: string[];
};
/**
 * Describes the message domain.common.v1.StatusFilter.
 * Use `create(StatusFilterSchema)` to create a new message.
 */
export declare const StatusFilterSchema: GenMessage<StatusFilter>;
/**
 * Logic for combining multiple filters
 *
 * @generated from enum domain.common.v1.FilterLogic
 */
export declare enum FilterLogic {
    /**
     * @generated from enum value: AND = 0;
     */
    AND = 0,
    /**
     * @generated from enum value: OR = 1;
     */
    OR = 1
}
/**
 * Describes the enum domain.common.v1.FilterLogic.
 */
export declare const FilterLogicSchema: GenEnum<FilterLogic>;
/**
 * @generated from enum domain.common.v1.StringOperator
 */
export declare enum StringOperator {
    /**
     * @generated from enum value: STRING_EQUALS = 0;
     */
    STRING_EQUALS = 0,
    /**
     * @generated from enum value: STRING_NOT_EQUALS = 1;
     */
    STRING_NOT_EQUALS = 1,
    /**
     * @generated from enum value: STRING_CONTAINS = 2;
     */
    STRING_CONTAINS = 2,
    /**
     * @generated from enum value: STRING_STARTS_WITH = 3;
     */
    STRING_STARTS_WITH = 3,
    /**
     * @generated from enum value: STRING_ENDS_WITH = 4;
     */
    STRING_ENDS_WITH = 4,
    /**
     * @generated from enum value: STRING_REGEX = 5;
     */
    STRING_REGEX = 5
}
/**
 * Describes the enum domain.common.v1.StringOperator.
 */
export declare const StringOperatorSchema: GenEnum<StringOperator>;
/**
 * @generated from enum domain.common.v1.NumberOperator
 */
export declare enum NumberOperator {
    /**
     * @generated from enum value: NUMBER_EQUALS = 0;
     */
    NUMBER_EQUALS = 0,
    /**
     * @generated from enum value: NUMBER_NOT_EQUALS = 1;
     */
    NUMBER_NOT_EQUALS = 1,
    /**
     * @generated from enum value: NUMBER_GREATER_THAN = 2;
     */
    NUMBER_GREATER_THAN = 2,
    /**
     * @generated from enum value: NUMBER_GREATER_THAN_OR_EQUAL = 3;
     */
    NUMBER_GREATER_THAN_OR_EQUAL = 3,
    /**
     * @generated from enum value: NUMBER_LESS_THAN = 4;
     */
    NUMBER_LESS_THAN = 4,
    /**
     * @generated from enum value: NUMBER_LESS_THAN_OR_EQUAL = 5;
     */
    NUMBER_LESS_THAN_OR_EQUAL = 5
}
/**
 * Describes the enum domain.common.v1.NumberOperator.
 */
export declare const NumberOperatorSchema: GenEnum<NumberOperator>;
/**
 * @generated from enum domain.common.v1.DateOperator
 */
export declare enum DateOperator {
    /**
     * @generated from enum value: DATE_EQUALS = 0;
     */
    DATE_EQUALS = 0,
    /**
     * @generated from enum value: DATE_BEFORE = 1;
     */
    DATE_BEFORE = 1,
    /**
     * @generated from enum value: DATE_AFTER = 2;
     */
    DATE_AFTER = 2,
    /**
     * @generated from enum value: DATE_BETWEEN = 3;
     */
    DATE_BETWEEN = 3
}
/**
 * Describes the enum domain.common.v1.DateOperator.
 */
export declare const DateOperatorSchema: GenEnum<DateOperator>;
/**
 * @generated from enum domain.common.v1.ListOperator
 */
export declare enum ListOperator {
    /**
     * @generated from enum value: LIST_IN = 0;
     */
    LIST_IN = 0,
    /**
     * @generated from enum value: LIST_NOT_IN = 1;
     */
    LIST_NOT_IN = 1
}
/**
 * Describes the enum domain.common.v1.ListOperator.
 */
export declare const ListOperatorSchema: GenEnum<ListOperator>;
/**
 * Money filter operators
 *
 * @generated from enum domain.common.v1.MoneyOperator
 */
export declare enum MoneyOperator {
    /**
     * @generated from enum value: MONEY_EQUALS = 0;
     */
    MONEY_EQUALS = 0,
    /**
     * @generated from enum value: MONEY_LESS_THAN = 1;
     */
    MONEY_LESS_THAN = 1,
    /**
     * @generated from enum value: MONEY_GREATER_THAN = 2;
     */
    MONEY_GREATER_THAN = 2,
    /**
     * @generated from enum value: MONEY_LESS_THAN_OR_EQUAL = 3;
     */
    MONEY_LESS_THAN_OR_EQUAL = 3,
    /**
     * @generated from enum value: MONEY_GREATER_THAN_OR_EQUAL = 4;
     */
    MONEY_GREATER_THAN_OR_EQUAL = 4,
    /**
     * @generated from enum value: MONEY_BETWEEN = 5;
     */
    MONEY_BETWEEN = 5
}
/**
 * Describes the enum domain.common.v1.MoneyOperator.
 */
export declare const MoneyOperatorSchema: GenEnum<MoneyOperator>;
