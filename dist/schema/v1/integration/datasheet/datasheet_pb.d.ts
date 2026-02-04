import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Any, Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/datasheet/datasheet.proto.
 */
export declare const file_integration_datasheet_datasheet: GenFile;
/**
 * CellValue represents the value of a cell with type information
 *
 * @generated from message integration.datasheet.v1.CellValue
 */
export type CellValue = Message<"integration.datasheet.v1.CellValue"> & {
    /**
     * The type of the value
     *
     * @generated from field: integration.datasheet.v1.CellValueType value_type = 1;
     */
    valueType: CellValueType;
    /**
     * The actual value (one of the following)
     *
     * @generated from oneof integration.datasheet.v1.CellValue.value
     */
    value: {
        /**
         * String/text value
         *
         * @generated from field: string string_value = 2;
         */
        value: string;
        case: "stringValue";
    } | {
        /**
         * Numeric value
         *
         * @generated from field: double number_value = 3;
         */
        value: number;
        case: "numberValue";
    } | {
        /**
         * Boolean value
         *
         * @generated from field: bool bool_value = 4;
         */
        value: boolean;
        case: "boolValue";
    } | {
        /**
         * ISO 8601 date string (YYYY-MM-DD)
         *
         * @generated from field: string date_value = 5;
         */
        value: string;
        case: "dateValue";
    } | {
        /**
         * ISO 8601 datetime string
         *
         * @generated from field: string datetime_value = 6;
         */
        value: string;
        case: "datetimeValue";
    } | {
        /**
         * Formula expression (e.g., "=SUM(A1:A10)")
         *
         * @generated from field: string formula_value = 7;
         */
        value: string;
        case: "formulaValue";
    } | {
        /**
         * Error string (e.g., "#REF!", "#DIV/0!")
         *
         * @generated from field: string error_value = 8;
         */
        value: string;
        case: "errorValue";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * Original raw value as string (for display purposes)
     *
     * @generated from field: string raw_value = 9;
     */
    rawValue: string;
};
/**
 * Describes the message integration.datasheet.v1.CellValue.
 * Use `create(CellValueSchema)` to create a new message.
 */
export declare const CellValueSchema: GenMessage<CellValue>;
/**
 * Cell represents a single cell in a spreadsheet
 *
 * @generated from message integration.datasheet.v1.Cell
 */
export type Cell = Message<"integration.datasheet.v1.Cell"> & {
    /**
     * Row index (0-based)
     *
     * @generated from field: int32 row_index = 1;
     */
    rowIndex: number;
    /**
     * Column index (0-based)
     *
     * @generated from field: int32 column_index = 2;
     */
    columnIndex: number;
    /**
     * Cell value
     *
     * @generated from field: integration.datasheet.v1.CellValue value = 3;
     */
    value?: CellValue;
    /**
     * Formatted/displayed value (after formatting applied)
     *
     * @generated from field: string formatted_value = 4;
     */
    formattedValue: string;
    /**
     * Cell note/comment
     *
     * @generated from field: string note = 5;
     */
    note: string;
    /**
     * Hyperlink URL (if cell contains a link)
     *
     * @generated from field: string hyperlink = 6;
     */
    hyperlink: string;
    /**
     * Cell formatting information
     *
     * @generated from field: integration.datasheet.v1.CellFormat format = 7;
     */
    format?: CellFormat;
    /**
     * Cell address in A1 notation (e.g., "A1", "B2")
     *
     * @generated from field: string address = 8;
     */
    address: string;
    /**
     * Additional cell metadata
     *
     * @generated from field: map<string, string> metadata = 9;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.Cell.
 * Use `create(CellSchema)` to create a new message.
 */
export declare const CellSchema: GenMessage<Cell>;
/**
 * CellFormat represents formatting options for a cell
 *
 * @generated from message integration.datasheet.v1.CellFormat
 */
export type CellFormat = Message<"integration.datasheet.v1.CellFormat"> & {
    /**
     * Background color (hex format, e.g., "#FFFFFF")
     *
     * @generated from field: string background_color = 1;
     */
    backgroundColor: string;
    /**
     * Text color (hex format)
     *
     * @generated from field: string text_color = 2;
     */
    textColor: string;
    /**
     * Font family
     *
     * @generated from field: string font_family = 3;
     */
    fontFamily: string;
    /**
     * Font size in points
     *
     * @generated from field: int32 font_size = 4;
     */
    fontSize: number;
    /**
     * Bold text
     *
     * @generated from field: bool bold = 5;
     */
    bold: boolean;
    /**
     * Italic text
     *
     * @generated from field: bool italic = 6;
     */
    italic: boolean;
    /**
     * Strikethrough text
     *
     * @generated from field: bool strikethrough = 7;
     */
    strikethrough: boolean;
    /**
     * Underline text
     *
     * @generated from field: bool underline = 8;
     */
    underline: boolean;
    /**
     * Horizontal alignment
     *
     * @generated from field: integration.datasheet.v1.HorizontalAlignment horizontal_alignment = 9;
     */
    horizontalAlignment: HorizontalAlignment;
    /**
     * Vertical alignment
     *
     * @generated from field: integration.datasheet.v1.VerticalAlignment vertical_alignment = 10;
     */
    verticalAlignment: VerticalAlignment;
    /**
     * Text wrapping
     *
     * @generated from field: integration.datasheet.v1.WrapStrategy wrap_strategy = 11;
     */
    wrapStrategy: WrapStrategy;
    /**
     * Number format pattern (e.g., "#,##0.00", "0%")
     *
     * @generated from field: string number_format = 12;
     */
    numberFormat: string;
};
/**
 * Describes the message integration.datasheet.v1.CellFormat.
 * Use `create(CellFormatSchema)` to create a new message.
 */
export declare const CellFormatSchema: GenMessage<CellFormat>;
/**
 * Row represents a row of cells in a spreadsheet
 *
 * @generated from message integration.datasheet.v1.Row
 */
export type Row = Message<"integration.datasheet.v1.Row"> & {
    /**
     * Row index (0-based)
     *
     * @generated from field: int32 row_index = 1;
     */
    rowIndex: number;
    /**
     * Cells in this row
     *
     * @generated from field: repeated integration.datasheet.v1.Cell cells = 2;
     */
    cells: Cell[];
    /**
     * Row height in pixels (if customized)
     *
     * @generated from field: int32 height = 3;
     */
    height: number;
    /**
     * Whether the row is hidden
     *
     * @generated from field: bool hidden = 4;
     */
    hidden: boolean;
    /**
     * Row-level metadata
     *
     * @generated from field: map<string, string> metadata = 5;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.Row.
 * Use `create(RowSchema)` to create a new message.
 */
export declare const RowSchema: GenMessage<Row>;
/**
 * Column represents a column definition in a spreadsheet
 *
 * @generated from message integration.datasheet.v1.Column
 */
export type Column = Message<"integration.datasheet.v1.Column"> & {
    /**
     * Column index (0-based)
     *
     * @generated from field: int32 column_index = 1;
     */
    columnIndex: number;
    /**
     * Column header name/label
     *
     * @generated from field: string header_name = 2;
     */
    headerName: string;
    /**
     * Expected data type for this column
     *
     * @generated from field: integration.datasheet.v1.CellValueType data_type = 3;
     */
    dataType: CellValueType;
    /**
     * Column width in pixels
     *
     * @generated from field: int32 width = 4;
     */
    width: number;
    /**
     * Whether the column is hidden
     *
     * @generated from field: bool hidden = 5;
     */
    hidden: boolean;
    /**
     * Column letter (e.g., "A", "B", "AA")
     *
     * @generated from field: string column_letter = 6;
     */
    columnLetter: string;
    /**
     * Column-level metadata
     *
     * @generated from field: map<string, string> metadata = 7;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.Column.
 * Use `create(ColumnSchema)` to create a new message.
 */
export declare const ColumnSchema: GenMessage<Column>;
/**
 * Range represents a rectangular range of cells
 *
 * @generated from message integration.datasheet.v1.Range
 */
export type Range = Message<"integration.datasheet.v1.Range"> & {
    /**
     * Sheet name (required)
     *
     * @generated from field: string sheet_name = 1;
     */
    sheetName: string;
    /**
     * Start row index (0-based, inclusive)
     *
     * @generated from field: int32 start_row = 2;
     */
    startRow: number;
    /**
     * Start column index (0-based, inclusive)
     *
     * @generated from field: int32 start_column = 3;
     */
    startColumn: number;
    /**
     * End row index (0-based, inclusive)
     *
     * @generated from field: int32 end_row = 4;
     */
    endRow: number;
    /**
     * End column index (0-based, inclusive)
     *
     * @generated from field: int32 end_column = 5;
     */
    endColumn: number;
    /**
     * A1 notation representation (e.g., "Sheet1!A1:B10")
     *
     * @generated from field: string a1_notation = 6;
     */
    a1Notation: string;
};
/**
 * Describes the message integration.datasheet.v1.Range.
 * Use `create(RangeSchema)` to create a new message.
 */
export declare const RangeSchema: GenMessage<Range>;
/**
 * Sheet represents a single sheet/tab within a spreadsheet
 *
 * @generated from message integration.datasheet.v1.Sheet
 */
export type Sheet = Message<"integration.datasheet.v1.Sheet"> & {
    /**
     * Unique identifier for the sheet (provider-specific)
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Sheet name/title
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * Sheet index/position within the spreadsheet
     *
     * @generated from field: int32 index = 3;
     */
    index: number;
    /**
     * Column definitions (header row)
     *
     * @generated from field: repeated integration.datasheet.v1.Column columns = 4;
     */
    columns: Column[];
    /**
     * Total number of rows with data
     *
     * @generated from field: int32 row_count = 5;
     */
    rowCount: number;
    /**
     * Total number of columns with data
     *
     * @generated from field: int32 column_count = 6;
     */
    columnCount: number;
    /**
     * Number of frozen rows (header rows)
     *
     * @generated from field: int32 frozen_rows = 7;
     */
    frozenRows: number;
    /**
     * Number of frozen columns
     *
     * @generated from field: int32 frozen_columns = 8;
     */
    frozenColumns: number;
    /**
     * Whether the sheet is hidden
     *
     * @generated from field: bool hidden = 9;
     */
    hidden: boolean;
    /**
     * Sheet tab color (hex format)
     *
     * @generated from field: string tab_color = 10;
     */
    tabColor: string;
    /**
     * Sheet-level metadata
     *
     * @generated from field: map<string, string> metadata = 11;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific sheet data
     *
     * @generated from field: map<string, google.protobuf.Any> provider_data = 12;
     */
    providerData: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.datasheet.v1.Sheet.
 * Use `create(SheetSchema)` to create a new message.
 */
export declare const SheetSchema: GenMessage<Sheet>;
/**
 * Spreadsheet represents a complete spreadsheet document
 *
 * @generated from message integration.datasheet.v1.Spreadsheet
 */
export type Spreadsheet = Message<"integration.datasheet.v1.Spreadsheet"> & {
    /**
     * Unique identifier for the spreadsheet (provider-specific)
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Spreadsheet name/title
     *
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * URL to access the spreadsheet
     *
     * @generated from field: string url = 3;
     */
    url: string;
    /**
     * Sheets within this spreadsheet
     *
     * @generated from field: repeated integration.datasheet.v1.Sheet sheets = 4;
     */
    sheets: Sheet[];
    /**
     * Default locale (e.g., "en_US")
     *
     * @generated from field: string locale = 5;
     */
    locale: string;
    /**
     * Time zone (e.g., "America/New_York")
     *
     * @generated from field: string time_zone = 6;
     */
    timeZone: string;
    /**
     * Spreadsheet owner email
     *
     * @generated from field: string owner_email = 7;
     */
    ownerEmail: string;
    /**
     * Creation timestamp
     *
     * @generated from field: google.protobuf.Timestamp created_at = 8;
     */
    createdAt?: Timestamp;
    /**
     * Last modification timestamp
     *
     * @generated from field: google.protobuf.Timestamp updated_at = 9;
     */
    updatedAt?: Timestamp;
    /**
     * Spreadsheet-level metadata
     *
     * @generated from field: map<string, string> metadata = 10;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Provider-specific spreadsheet data
     *
     * @generated from field: map<string, google.protobuf.Any> provider_data = 11;
     */
    providerData: {
        [key: string]: Any;
    };
};
/**
 * Describes the message integration.datasheet.v1.Spreadsheet.
 * Use `create(SpreadsheetSchema)` to create a new message.
 */
export declare const SpreadsheetSchema: GenMessage<Spreadsheet>;
/**
 * Condition represents a filter/search condition
 *
 * @generated from message integration.datasheet.v1.Condition
 */
export type Condition = Message<"integration.datasheet.v1.Condition"> & {
    /**
     * Column index to apply condition (0-based)
     *
     * @generated from field: int32 column_index = 1;
     */
    columnIndex: number;
    /**
     * Column name (alternative to column_index)
     *
     * @generated from field: string column_name = 2;
     */
    columnName: string;
    /**
     * Comparison operator
     *
     * @generated from field: integration.datasheet.v1.ConditionOperator operator = 3;
     */
    operator: ConditionOperator;
    /**
     * Value to compare against
     *
     * @generated from field: integration.datasheet.v1.CellValue value = 4;
     */
    value?: CellValue;
    /**
     * Multiple values for IN/NOT_IN operators
     *
     * @generated from field: repeated integration.datasheet.v1.CellValue values = 5;
     */
    values: CellValue[];
    /**
     * Case-sensitive comparison (for string operations)
     *
     * @generated from field: bool case_sensitive = 6;
     */
    caseSensitive: boolean;
};
/**
 * Describes the message integration.datasheet.v1.Condition.
 * Use `create(ConditionSchema)` to create a new message.
 */
export declare const ConditionSchema: GenMessage<Condition>;
/**
 * ConditionGroup represents a group of conditions with logical operators
 *
 * @generated from message integration.datasheet.v1.ConditionGroup
 */
export type ConditionGroup = Message<"integration.datasheet.v1.ConditionGroup"> & {
    /**
     * Individual conditions
     *
     * @generated from field: repeated integration.datasheet.v1.Condition conditions = 1;
     */
    conditions: Condition[];
    /**
     * Logical operator to combine conditions
     *
     * @generated from field: integration.datasheet.v1.LogicalOperator logical_operator = 2;
     */
    logicalOperator: LogicalOperator;
    /**
     * Nested condition groups
     *
     * @generated from field: repeated integration.datasheet.v1.ConditionGroup nested_groups = 3;
     */
    nestedGroups: ConditionGroup[];
};
/**
 * Describes the message integration.datasheet.v1.ConditionGroup.
 * Use `create(ConditionGroupSchema)` to create a new message.
 */
export declare const ConditionGroupSchema: GenMessage<ConditionGroup>;
/**
 * SortSpec represents sorting specification
 *
 * @generated from message integration.datasheet.v1.SortSpec
 */
export type SortSpec = Message<"integration.datasheet.v1.SortSpec"> & {
    /**
     * Column index to sort by (0-based)
     *
     * @generated from field: int32 column_index = 1;
     */
    columnIndex: number;
    /**
     * Column name (alternative to column_index)
     *
     * @generated from field: string column_name = 2;
     */
    columnName: string;
    /**
     * Sort order
     *
     * @generated from field: integration.datasheet.v1.SortOrder sort_order = 3;
     */
    sortOrder: SortOrder;
};
/**
 * Describes the message integration.datasheet.v1.SortSpec.
 * Use `create(SortSpecSchema)` to create a new message.
 */
export declare const SortSpecSchema: GenMessage<SortSpec>;
/**
 * DatasheetProviderType represents the category of datasheet provider
 *
 * @generated from enum integration.datasheet.v1.DatasheetProviderType
 */
export declare enum DatasheetProviderType {
    /**
     * @generated from enum value: DATASHEET_PROVIDER_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Google Sheets API
     *
     * @generated from enum value: DATASHEET_PROVIDER_TYPE_GOOGLE_SHEETS = 1;
     */
    GOOGLE_SHEETS = 1,
    /**
     * Microsoft Excel Online / Graph API
     *
     * @generated from enum value: DATASHEET_PROVIDER_TYPE_EXCEL_ONLINE = 2;
     */
    EXCEL_ONLINE = 2,
    /**
     * Airtable API
     *
     * @generated from enum value: DATASHEET_PROVIDER_TYPE_AIRTABLE = 3;
     */
    AIRTABLE = 3,
    /**
     * Mock/test provider
     *
     * @generated from enum value: DATASHEET_PROVIDER_TYPE_MOCK = 4;
     */
    MOCK = 4
}
/**
 * Describes the enum integration.datasheet.v1.DatasheetProviderType.
 */
export declare const DatasheetProviderTypeSchema: GenEnum<DatasheetProviderType>;
/**
 * DatasheetCapability represents features supported by a provider
 *
 * @generated from enum integration.datasheet.v1.DatasheetCapability
 */
export declare enum DatasheetCapability {
    /**
     * @generated from enum value: DATASHEET_CAPABILITY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Read data from sheets
     *
     * @generated from enum value: DATASHEET_CAPABILITY_READ = 1;
     */
    READ = 1,
    /**
     * Write/append data to sheets
     *
     * @generated from enum value: DATASHEET_CAPABILITY_WRITE = 2;
     */
    WRITE = 2,
    /**
     * Batch update operations
     *
     * @generated from enum value: DATASHEET_CAPABILITY_BATCH_UPDATE = 3;
     */
    BATCH_UPDATE = 3,
    /**
     * Formula support
     *
     * @generated from enum value: DATASHEET_CAPABILITY_FORMULAS = 4;
     */
    FORMULAS = 4,
    /**
     * Cell/row/column formatting
     *
     * @generated from enum value: DATASHEET_CAPABILITY_FORMATTING = 5;
     */
    FORMATTING = 5,
    /**
     * Conditional formatting rules
     *
     * @generated from enum value: DATASHEET_CAPABILITY_CONDITIONAL_FORMATTING = 6;
     */
    CONDITIONAL_FORMATTING = 6,
    /**
     * Chart creation and management
     *
     * @generated from enum value: DATASHEET_CAPABILITY_CHARTS = 7;
     */
    CHARTS = 7,
    /**
     * Pivot table support
     *
     * @generated from enum value: DATASHEET_CAPABILITY_PIVOT_TABLES = 8;
     */
    PIVOT_TABLES = 8,
    /**
     * Data filtering
     *
     * @generated from enum value: DATASHEET_CAPABILITY_FILTERING = 9;
     */
    FILTERING = 9,
    /**
     * Data sorting
     *
     * @generated from enum value: DATASHEET_CAPABILITY_SORTING = 10;
     */
    SORTING = 10,
    /**
     * Data validation rules
     *
     * @generated from enum value: DATASHEET_CAPABILITY_VALIDATION = 11;
     */
    VALIDATION = 11,
    /**
     * Cell comments/notes
     *
     * @generated from enum value: DATASHEET_CAPABILITY_COMMENTS = 12;
     */
    COMMENTS = 12,
    /**
     * Sheet/range protection
     *
     * @generated from enum value: DATASHEET_CAPABILITY_PROTECTION = 13;
     */
    PROTECTION = 13,
    /**
     * Named range support
     *
     * @generated from enum value: DATASHEET_CAPABILITY_NAMED_RANGES = 14;
     */
    NAMED_RANGES = 14,
    /**
     * Multiple sheets in spreadsheet
     *
     * @generated from enum value: DATASHEET_CAPABILITY_MULTIPLE_SHEETS = 15;
     */
    MULTIPLE_SHEETS = 15
}
/**
 * Describes the enum integration.datasheet.v1.DatasheetCapability.
 */
export declare const DatasheetCapabilitySchema: GenEnum<DatasheetCapability>;
/**
 * CellValueType represents the data type of a cell value
 *
 * @generated from enum integration.datasheet.v1.CellValueType
 */
export declare enum CellValueType {
    /**
     * @generated from enum value: CELL_VALUE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Text/string value
     *
     * @generated from enum value: CELL_VALUE_TYPE_STRING = 1;
     */
    STRING = 1,
    /**
     * Numeric value (integer or float)
     *
     * @generated from enum value: CELL_VALUE_TYPE_NUMBER = 2;
     */
    NUMBER = 2,
    /**
     * Boolean true/false
     *
     * @generated from enum value: CELL_VALUE_TYPE_BOOLEAN = 3;
     */
    BOOLEAN = 3,
    /**
     * Date only (no time component)
     *
     * @generated from enum value: CELL_VALUE_TYPE_DATE = 4;
     */
    DATE = 4,
    /**
     * Date and time
     *
     * @generated from enum value: CELL_VALUE_TYPE_DATETIME = 5;
     */
    DATETIME = 5,
    /**
     * Formula expression
     *
     * @generated from enum value: CELL_VALUE_TYPE_FORMULA = 6;
     */
    FORMULA = 6,
    /**
     * Error value (e.g., #REF!, #DIV/0!)
     *
     * @generated from enum value: CELL_VALUE_TYPE_ERROR = 7;
     */
    ERROR = 7,
    /**
     * Empty/null cell
     *
     * @generated from enum value: CELL_VALUE_TYPE_EMPTY = 8;
     */
    EMPTY = 8,
    /**
     * Currency value
     *
     * @generated from enum value: CELL_VALUE_TYPE_CURRENCY = 9;
     */
    CURRENCY = 9,
    /**
     * Percentage value
     *
     * @generated from enum value: CELL_VALUE_TYPE_PERCENT = 10;
     */
    PERCENT = 10
}
/**
 * Describes the enum integration.datasheet.v1.CellValueType.
 */
export declare const CellValueTypeSchema: GenEnum<CellValueType>;
/**
 * ConditionOperator represents comparison operators for conditions
 *
 * @generated from enum integration.datasheet.v1.ConditionOperator
 */
export declare enum ConditionOperator {
    /**
     * @generated from enum value: CONDITION_OPERATOR_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Equal to
     *
     * @generated from enum value: CONDITION_OPERATOR_EQ = 1;
     */
    EQ = 1,
    /**
     * Not equal to
     *
     * @generated from enum value: CONDITION_OPERATOR_NEQ = 2;
     */
    NEQ = 2,
    /**
     * Greater than
     *
     * @generated from enum value: CONDITION_OPERATOR_GT = 3;
     */
    GT = 3,
    /**
     * Less than
     *
     * @generated from enum value: CONDITION_OPERATOR_LT = 4;
     */
    LT = 4,
    /**
     * Greater than or equal to
     *
     * @generated from enum value: CONDITION_OPERATOR_GTE = 5;
     */
    GTE = 5,
    /**
     * Less than or equal to
     *
     * @generated from enum value: CONDITION_OPERATOR_LTE = 6;
     */
    LTE = 6,
    /**
     * Contains substring
     *
     * @generated from enum value: CONDITION_OPERATOR_CONTAINS = 7;
     */
    CONTAINS = 7,
    /**
     * Starts with prefix
     *
     * @generated from enum value: CONDITION_OPERATOR_STARTS_WITH = 8;
     */
    STARTS_WITH = 8,
    /**
     * Ends with suffix
     *
     * @generated from enum value: CONDITION_OPERATOR_ENDS_WITH = 9;
     */
    ENDS_WITH = 9,
    /**
     * Regular expression match
     *
     * @generated from enum value: CONDITION_OPERATOR_REGEX = 10;
     */
    REGEX = 10,
    /**
     * Cell is empty
     *
     * @generated from enum value: CONDITION_OPERATOR_IS_EMPTY = 11;
     */
    IS_EMPTY = 11,
    /**
     * Cell is not empty
     *
     * @generated from enum value: CONDITION_OPERATOR_IS_NOT_EMPTY = 12;
     */
    IS_NOT_EMPTY = 12,
    /**
     * Value is in list
     *
     * @generated from enum value: CONDITION_OPERATOR_IN = 13;
     */
    IN = 13,
    /**
     * Value is not in list
     *
     * @generated from enum value: CONDITION_OPERATOR_NOT_IN = 14;
     */
    NOT_IN = 14
}
/**
 * Describes the enum integration.datasheet.v1.ConditionOperator.
 */
export declare const ConditionOperatorSchema: GenEnum<ConditionOperator>;
/**
 * HorizontalAlignment represents horizontal text alignment
 *
 * @generated from enum integration.datasheet.v1.HorizontalAlignment
 */
export declare enum HorizontalAlignment {
    /**
     * @generated from enum value: HORIZONTAL_ALIGNMENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: HORIZONTAL_ALIGNMENT_LEFT = 1;
     */
    LEFT = 1,
    /**
     * @generated from enum value: HORIZONTAL_ALIGNMENT_CENTER = 2;
     */
    CENTER = 2,
    /**
     * @generated from enum value: HORIZONTAL_ALIGNMENT_RIGHT = 3;
     */
    RIGHT = 3
}
/**
 * Describes the enum integration.datasheet.v1.HorizontalAlignment.
 */
export declare const HorizontalAlignmentSchema: GenEnum<HorizontalAlignment>;
/**
 * VerticalAlignment represents vertical text alignment
 *
 * @generated from enum integration.datasheet.v1.VerticalAlignment
 */
export declare enum VerticalAlignment {
    /**
     * @generated from enum value: VERTICAL_ALIGNMENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: VERTICAL_ALIGNMENT_TOP = 1;
     */
    TOP = 1,
    /**
     * @generated from enum value: VERTICAL_ALIGNMENT_MIDDLE = 2;
     */
    MIDDLE = 2,
    /**
     * @generated from enum value: VERTICAL_ALIGNMENT_BOTTOM = 3;
     */
    BOTTOM = 3
}
/**
 * Describes the enum integration.datasheet.v1.VerticalAlignment.
 */
export declare const VerticalAlignmentSchema: GenEnum<VerticalAlignment>;
/**
 * WrapStrategy represents text wrapping behavior
 *
 * @generated from enum integration.datasheet.v1.WrapStrategy
 */
export declare enum WrapStrategy {
    /**
     * @generated from enum value: WRAP_STRATEGY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Text overflows to adjacent cells
     *
     * @generated from enum value: WRAP_STRATEGY_OVERFLOW = 1;
     */
    OVERFLOW = 1,
    /**
     * Text wraps within the cell
     *
     * @generated from enum value: WRAP_STRATEGY_WRAP = 2;
     */
    WRAP = 2,
    /**
     * Text is clipped at cell boundary
     *
     * @generated from enum value: WRAP_STRATEGY_CLIP = 3;
     */
    CLIP = 3
}
/**
 * Describes the enum integration.datasheet.v1.WrapStrategy.
 */
export declare const WrapStrategySchema: GenEnum<WrapStrategy>;
/**
 * LogicalOperator represents logical operators for combining conditions
 *
 * @generated from enum integration.datasheet.v1.LogicalOperator
 */
export declare enum LogicalOperator {
    /**
     * @generated from enum value: LOGICAL_OPERATOR_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * All conditions must match
     *
     * @generated from enum value: LOGICAL_OPERATOR_AND = 1;
     */
    AND = 1,
    /**
     * Any condition must match
     *
     * @generated from enum value: LOGICAL_OPERATOR_OR = 2;
     */
    OR = 2
}
/**
 * Describes the enum integration.datasheet.v1.LogicalOperator.
 */
export declare const LogicalOperatorSchema: GenEnum<LogicalOperator>;
/**
 * SortOrder represents the sort direction
 *
 * @generated from enum integration.datasheet.v1.SortOrder
 */
export declare enum SortOrder {
    /**
     * @generated from enum value: SORT_ORDER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SORT_ORDER_ASCENDING = 1;
     */
    ASCENDING = 1,
    /**
     * @generated from enum value: SORT_ORDER_DESCENDING = 2;
     */
    DESCENDING = 2
}
/**
 * Describes the enum integration.datasheet.v1.SortOrder.
 */
export declare const SortOrderSchema: GenEnum<SortOrder>;
/**
 * UpdateMode represents how to handle existing data during updates
 *
 * @generated from enum integration.datasheet.v1.UpdateMode
 */
export declare enum UpdateMode {
    /**
     * @generated from enum value: UPDATE_MODE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Replace existing values
     *
     * @generated from enum value: UPDATE_MODE_OVERWRITE = 1;
     */
    OVERWRITE = 1,
    /**
     * Add after existing data
     *
     * @generated from enum value: UPDATE_MODE_APPEND = 2;
     */
    APPEND = 2,
    /**
     * Insert at specific position, shifting existing
     *
     * @generated from enum value: UPDATE_MODE_INSERT = 3;
     */
    INSERT = 3
}
/**
 * Describes the enum integration.datasheet.v1.UpdateMode.
 */
export declare const UpdateModeSchema: GenEnum<UpdateMode>;
/**
 * ValueInputOption represents how input values should be interpreted
 *
 * @generated from enum integration.datasheet.v1.ValueInputOption
 */
export declare enum ValueInputOption {
    /**
     * @generated from enum value: VALUE_INPUT_OPTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Values are stored as-is
     *
     * @generated from enum value: VALUE_INPUT_OPTION_RAW = 1;
     */
    RAW = 1,
    /**
     * Values are parsed as if user typed them
     *
     * @generated from enum value: VALUE_INPUT_OPTION_USER_ENTERED = 2;
     */
    USER_ENTERED = 2
}
/**
 * Describes the enum integration.datasheet.v1.ValueInputOption.
 */
export declare const ValueInputOptionSchema: GenEnum<ValueInputOption>;
/**
 * ValueRenderOption represents how values should be rendered in output
 *
 * @generated from enum integration.datasheet.v1.ValueRenderOption
 */
export declare enum ValueRenderOption {
    /**
     * @generated from enum value: VALUE_RENDER_OPTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Return formatted display values
     *
     * @generated from enum value: VALUE_RENDER_OPTION_FORMATTED = 1;
     */
    FORMATTED = 1,
    /**
     * Return raw values without formatting
     *
     * @generated from enum value: VALUE_RENDER_OPTION_UNFORMATTED = 2;
     */
    UNFORMATTED = 2,
    /**
     * Return formulas instead of calculated values
     *
     * @generated from enum value: VALUE_RENDER_OPTION_FORMULA = 3;
     */
    FORMULA = 3
}
/**
 * Describes the enum integration.datasheet.v1.ValueRenderOption.
 */
export declare const ValueRenderOptionSchema: GenEnum<ValueRenderOption>;
