import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { FieldValue, Record, Selection } from "../tabular_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/tabular/extensions/spreadsheet.proto.
 */
export declare const file_integration_tabular_extensions_spreadsheet: GenFile;
/**
 * SpreadsheetSelection extends Selection with A1 notation support
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.SpreadsheetSelection
 */
export type SpreadsheetSelection = Message<"integration.tabular.extensions.spreadsheet.v1.SpreadsheetSelection"> & {
    /**
     * Base selection from tabular
     *
     * @generated from field: integration.tabular.v1.Selection base = 1;
     */
    base?: Selection;
    /**
     * A1 notation for the selection (e.g., "Sheet1!A1:D10")
     *
     * @generated from field: string a1_notation = 2;
     */
    a1Notation: string;
    /**
     * Named range reference
     *
     * @generated from field: string named_range = 3;
     */
    namedRange: string;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.SpreadsheetSelection.
 * Use `create(SpreadsheetSelectionSchema)` to create a new message.
 */
export declare const SpreadsheetSelectionSchema: GenMessage<SpreadsheetSelection>;
/**
 * CellReference represents a reference to a specific cell
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.CellReference
 */
export type CellReference = Message<"integration.tabular.extensions.spreadsheet.v1.CellReference"> & {
    /**
     * Sheet name
     *
     * @generated from field: string sheet = 1;
     */
    sheet: string;
    /**
     * Row number (1-based for spreadsheet compatibility)
     *
     * @generated from field: int32 row = 2;
     */
    row: number;
    /**
     * Column number (1-based for spreadsheet compatibility)
     *
     * @generated from field: int32 column = 3;
     */
    column: number;
    /**
     * Alternative A1 notation (e.g., "A1", "B2")
     *
     * @generated from field: string a1 = 4;
     */
    a1: string;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.CellReference.
 * Use `create(CellReferenceSchema)` to create a new message.
 */
export declare const CellReferenceSchema: GenMessage<CellReference>;
/**
 * Border represents a single border configuration
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.Border
 */
export type Border = Message<"integration.tabular.extensions.spreadsheet.v1.Border"> & {
    /**
     * Border color in hex format (e.g., "#000000")
     *
     * @generated from field: string color = 1;
     */
    color: string;
    /**
     * Border style
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.BorderStyle style = 2;
     */
    style: BorderStyle;
    /**
     * Border width in pixels
     *
     * @generated from field: int32 width = 3;
     */
    width: number;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.Border.
 * Use `create(BorderSchema)` to create a new message.
 */
export declare const BorderSchema: GenMessage<Border>;
/**
 * Borders represents all four borders of a cell
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.Borders
 */
export type Borders = Message<"integration.tabular.extensions.spreadsheet.v1.Borders"> & {
    /**
     * Top border
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.Border top = 1;
     */
    top?: Border;
    /**
     * Bottom border
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.Border bottom = 2;
     */
    bottom?: Border;
    /**
     * Left border
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.Border left = 3;
     */
    left?: Border;
    /**
     * Right border
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.Border right = 4;
     */
    right?: Border;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.Borders.
 * Use `create(BordersSchema)` to create a new message.
 */
export declare const BordersSchema: GenMessage<Borders>;
/**
 * CellFormat represents the formatting of a cell
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.CellFormat
 */
export type CellFormat = Message<"integration.tabular.extensions.spreadsheet.v1.CellFormat"> & {
    /**
     * Background color in hex format (e.g., "#FFFFFF")
     *
     * @generated from field: string background_color = 1;
     */
    backgroundColor: string;
    /**
     * Text color in hex format (e.g., "#000000")
     *
     * @generated from field: string text_color = 2;
     */
    textColor: string;
    /**
     * Font family (e.g., "Arial", "Times New Roman")
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
     * Whether text is bold
     *
     * @generated from field: bool bold = 5;
     */
    bold: boolean;
    /**
     * Whether text is italic
     *
     * @generated from field: bool italic = 6;
     */
    italic: boolean;
    /**
     * Whether text is underlined
     *
     * @generated from field: bool underline = 7;
     */
    underline: boolean;
    /**
     * Whether text has strikethrough
     *
     * @generated from field: bool strikethrough = 8;
     */
    strikethrough: boolean;
    /**
     * Horizontal text alignment
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.HorizontalAlignment horizontal_alignment = 9;
     */
    horizontalAlignment: HorizontalAlignment;
    /**
     * Vertical text alignment
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.VerticalAlignment vertical_alignment = 10;
     */
    verticalAlignment: VerticalAlignment;
    /**
     * Number format pattern (e.g., "#,##0.00", "yyyy-mm-dd")
     *
     * @generated from field: string number_format = 11;
     */
    numberFormat: string;
    /**
     * Cell borders
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.Borders borders = 12;
     */
    borders?: Borders;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.CellFormat.
 * Use `create(CellFormatSchema)` to create a new message.
 */
export declare const CellFormatSchema: GenMessage<CellFormat>;
/**
 * DataValidation represents validation rules for a cell
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.DataValidation
 */
export type DataValidation = Message<"integration.tabular.extensions.spreadsheet.v1.DataValidation"> & {
    /**
     * Type of validation
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.ValidationType type = 1;
     */
    type: ValidationType;
    /**
     * Allowed values for dropdown validation
     *
     * @generated from field: repeated string values = 2;
     */
    values: string[];
    /**
     * Custom formula for validation
     *
     * @generated from field: string custom_formula = 3;
     */
    customFormula: string;
    /**
     * Input message shown when cell is selected
     *
     * @generated from field: string input_message = 4;
     */
    inputMessage: string;
    /**
     * Error message shown when validation fails
     *
     * @generated from field: string error_message = 5;
     */
    errorMessage: string;
    /**
     * Whether validation is strict (reject invalid input)
     *
     * @generated from field: bool strict = 6;
     */
    strict: boolean;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.DataValidation.
 * Use `create(DataValidationSchema)` to create a new message.
 */
export declare const DataValidationSchema: GenMessage<DataValidation>;
/**
 * SpreadsheetCell represents a cell with spreadsheet-specific features
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.SpreadsheetCell
 */
export type SpreadsheetCell = Message<"integration.tabular.extensions.spreadsheet.v1.SpreadsheetCell"> & {
    /**
     * Cell value from tabular
     *
     * @generated from field: integration.tabular.v1.FieldValue value = 1;
     */
    value?: FieldValue;
    /**
     * Cell reference
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.CellReference reference = 2;
     */
    reference?: CellReference;
    /**
     * Cell formatting
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.CellFormat format = 3;
     */
    format?: CellFormat;
    /**
     * Cell note/comment
     *
     * @generated from field: string note = 4;
     */
    note: string;
    /**
     * Hyperlink URL
     *
     * @generated from field: string hyperlink = 5;
     */
    hyperlink: string;
    /**
     * Data validation rules
     *
     * @generated from field: integration.tabular.extensions.spreadsheet.v1.DataValidation validation = 6;
     */
    validation?: DataValidation;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.SpreadsheetCell.
 * Use `create(SpreadsheetCellSchema)` to create a new message.
 */
export declare const SpreadsheetCellSchema: GenMessage<SpreadsheetCell>;
/**
 * SpreadsheetRecord represents a row with spreadsheet-specific features
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.SpreadsheetRecord
 */
export type SpreadsheetRecord = Message<"integration.tabular.extensions.spreadsheet.v1.SpreadsheetRecord"> & {
    /**
     * Base record from tabular
     *
     * @generated from field: integration.tabular.v1.Record base = 1;
     */
    base?: Record;
    /**
     * Cells with formatting and validation
     *
     * @generated from field: repeated integration.tabular.extensions.spreadsheet.v1.SpreadsheetCell cells = 2;
     */
    cells: SpreadsheetCell[];
    /**
     * Row height in pixels
     *
     * @generated from field: int32 row_height = 3;
     */
    rowHeight: number;
    /**
     * Whether the row is hidden
     *
     * @generated from field: bool hidden = 4;
     */
    hidden: boolean;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.SpreadsheetRecord.
 * Use `create(SpreadsheetRecordSchema)` to create a new message.
 */
export declare const SpreadsheetRecordSchema: GenMessage<SpreadsheetRecord>;
/**
 * SheetMetadata represents spreadsheet-specific sheet properties
 *
 * @generated from message integration.tabular.extensions.spreadsheet.v1.SheetMetadata
 */
export type SheetMetadata = Message<"integration.tabular.extensions.spreadsheet.v1.SheetMetadata"> & {
    /**
     * Number of frozen rows at the top
     *
     * @generated from field: int32 frozen_rows = 1;
     */
    frozenRows: number;
    /**
     * Number of frozen columns on the left
     *
     * @generated from field: int32 frozen_columns = 2;
     */
    frozenColumns: number;
    /**
     * Tab color in hex format (e.g., "#FF0000")
     *
     * @generated from field: string tab_color = 3;
     */
    tabColor: string;
    /**
     * Whether the sheet is right-to-left
     *
     * @generated from field: bool right_to_left = 4;
     */
    rightToLeft: boolean;
    /**
     * Default column width in pixels
     *
     * @generated from field: int32 default_column_width = 5;
     */
    defaultColumnWidth: number;
    /**
     * Default row height in pixels
     *
     * @generated from field: int32 default_row_height = 6;
     */
    defaultRowHeight: number;
};
/**
 * Describes the message integration.tabular.extensions.spreadsheet.v1.SheetMetadata.
 * Use `create(SheetMetadataSchema)` to create a new message.
 */
export declare const SheetMetadataSchema: GenMessage<SheetMetadata>;
/**
 * HorizontalAlignment represents horizontal text alignment in a cell
 *
 * @generated from enum integration.tabular.extensions.spreadsheet.v1.HorizontalAlignment
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
 * Describes the enum integration.tabular.extensions.spreadsheet.v1.HorizontalAlignment.
 */
export declare const HorizontalAlignmentSchema: GenEnum<HorizontalAlignment>;
/**
 * VerticalAlignment represents vertical text alignment in a cell
 *
 * @generated from enum integration.tabular.extensions.spreadsheet.v1.VerticalAlignment
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
 * Describes the enum integration.tabular.extensions.spreadsheet.v1.VerticalAlignment.
 */
export declare const VerticalAlignmentSchema: GenEnum<VerticalAlignment>;
/**
 * BorderStyle represents the style of a cell border
 *
 * @generated from enum integration.tabular.extensions.spreadsheet.v1.BorderStyle
 */
export declare enum BorderStyle {
    /**
     * @generated from enum value: BORDER_STYLE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: BORDER_STYLE_SOLID = 1;
     */
    SOLID = 1,
    /**
     * @generated from enum value: BORDER_STYLE_DASHED = 2;
     */
    DASHED = 2,
    /**
     * @generated from enum value: BORDER_STYLE_DOTTED = 3;
     */
    DOTTED = 3,
    /**
     * @generated from enum value: BORDER_STYLE_DOUBLE = 4;
     */
    DOUBLE = 4
}
/**
 * Describes the enum integration.tabular.extensions.spreadsheet.v1.BorderStyle.
 */
export declare const BorderStyleSchema: GenEnum<BorderStyle>;
/**
 * ValidationType represents the type of data validation
 *
 * @generated from enum integration.tabular.extensions.spreadsheet.v1.ValidationType
 */
export declare enum ValidationType {
    /**
     * @generated from enum value: VALIDATION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: VALIDATION_TYPE_DROPDOWN = 1;
     */
    DROPDOWN = 1,
    /**
     * @generated from enum value: VALIDATION_TYPE_CHECKBOX = 2;
     */
    CHECKBOX = 2,
    /**
     * @generated from enum value: VALIDATION_TYPE_DATE = 3;
     */
    DATE = 3,
    /**
     * @generated from enum value: VALIDATION_TYPE_NUMBER = 4;
     */
    NUMBER = 4,
    /**
     * @generated from enum value: VALIDATION_TYPE_TEXT_LENGTH = 5;
     */
    TEXT_LENGTH = 5,
    /**
     * @generated from enum value: VALIDATION_TYPE_CUSTOM_FORMULA = 6;
     */
    CUSTOM_FORMULA = 6
}
/**
 * Describes the enum integration.tabular.extensions.spreadsheet.v1.ValidationType.
 */
export declare const ValidationTypeSchema: GenEnum<ValidationType>;
