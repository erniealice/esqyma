import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Column, ConditionGroup, DatasheetCapability, DatasheetProviderType, Range, Row, Sheet, SortSpec, Spreadsheet, UpdateMode, ValueInputOption, ValueRenderOption } from "./datasheet_pb";
import type { ProviderHealthStatus } from "./provider_pb";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/datasheet/datasheet_service.proto.
 */
export declare const file_integration_datasheet_datasheet_service: GenFile;
/**
 * AddRowsRequest is a request to add new rows to a sheet
 *
 * @generated from message integration.datasheet.v1.AddRowsRequest
 */
export type AddRowsRequest = Message<"integration.datasheet.v1.AddRowsRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.AddRowsData data = 1;
     */
    data?: AddRowsData;
};
/**
 * Describes the message integration.datasheet.v1.AddRowsRequest.
 * Use `create(AddRowsRequestSchema)` to create a new message.
 */
export declare const AddRowsRequestSchema: GenMessage<AddRowsRequest>;
/**
 * @generated from message integration.datasheet.v1.AddRowsData
 */
export type AddRowsData = Message<"integration.datasheet.v1.AddRowsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Target sheet name
     *
     * @generated from field: string sheet_name = 3;
     */
    sheetName: string;
    /**
     * Rows to add
     *
     * @generated from field: repeated integration.datasheet.v1.Row rows = 4;
     */
    rows: Row[];
    /**
     * Insert position (0 = beginning, -1 or omit = end/append)
     *
     * @generated from field: int32 insert_at_index = 5;
     */
    insertAtIndex: number;
    /**
     * How input values should be interpreted
     *
     * @generated from field: integration.datasheet.v1.ValueInputOption value_input_option = 6;
     */
    valueInputOption: ValueInputOption;
    /**
     * Whether to insert empty rows before adding data
     *
     * @generated from field: bool insert_data_option = 7;
     */
    insertDataOption: boolean;
};
/**
 * Describes the message integration.datasheet.v1.AddRowsData.
 * Use `create(AddRowsDataSchema)` to create a new message.
 */
export declare const AddRowsDataSchema: GenMessage<AddRowsData>;
/**
 * AddRowsResponse contains the result of adding rows
 *
 * @generated from message integration.datasheet.v1.AddRowsResponse
 */
export type AddRowsResponse = Message<"integration.datasheet.v1.AddRowsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.AddRowsResult data = 2;
     */
    data: AddRowsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.AddRowsResponse.
 * Use `create(AddRowsResponseSchema)` to create a new message.
 */
export declare const AddRowsResponseSchema: GenMessage<AddRowsResponse>;
/**
 * @generated from message integration.datasheet.v1.AddRowsResult
 */
export type AddRowsResult = Message<"integration.datasheet.v1.AddRowsResult"> & {
    /**
     * Range where data was added (in A1 notation)
     *
     * @generated from field: string updated_range = 1;
     */
    updatedRange: string;
    /**
     * Number of rows added
     *
     * @generated from field: int32 rows_added = 2;
     */
    rowsAdded: number;
    /**
     * Number of cells updated
     *
     * @generated from field: int32 cells_updated = 3;
     */
    cellsUpdated: number;
    /**
     * The rows that were added (with any server-assigned values)
     *
     * @generated from field: repeated integration.datasheet.v1.Row added_rows = 4;
     */
    addedRows: Row[];
};
/**
 * Describes the message integration.datasheet.v1.AddRowsResult.
 * Use `create(AddRowsResultSchema)` to create a new message.
 */
export declare const AddRowsResultSchema: GenMessage<AddRowsResult>;
/**
 * UpdateRowsRequest is a request to update existing rows
 *
 * @generated from message integration.datasheet.v1.UpdateRowsRequest
 */
export type UpdateRowsRequest = Message<"integration.datasheet.v1.UpdateRowsRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.UpdateRowsData data = 1;
     */
    data?: UpdateRowsData;
};
/**
 * Describes the message integration.datasheet.v1.UpdateRowsRequest.
 * Use `create(UpdateRowsRequestSchema)` to create a new message.
 */
export declare const UpdateRowsRequestSchema: GenMessage<UpdateRowsRequest>;
/**
 * @generated from message integration.datasheet.v1.UpdateRowsData
 */
export type UpdateRowsData = Message<"integration.datasheet.v1.UpdateRowsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Target range to update
     *
     * @generated from field: integration.datasheet.v1.Range range = 3;
     */
    range?: Range;
    /**
     * Rows with updated values
     *
     * @generated from field: repeated integration.datasheet.v1.Row rows = 4;
     */
    rows: Row[];
    /**
     * Optional conditions to filter which rows to update (update where)
     *
     * @generated from field: integration.datasheet.v1.ConditionGroup conditions = 5;
     */
    conditions?: ConditionGroup;
    /**
     * How input values should be interpreted
     *
     * @generated from field: integration.datasheet.v1.ValueInputOption value_input_option = 6;
     */
    valueInputOption: ValueInputOption;
    /**
     * Update mode
     *
     * @generated from field: integration.datasheet.v1.UpdateMode update_mode = 7;
     */
    updateMode: UpdateMode;
};
/**
 * Describes the message integration.datasheet.v1.UpdateRowsData.
 * Use `create(UpdateRowsDataSchema)` to create a new message.
 */
export declare const UpdateRowsDataSchema: GenMessage<UpdateRowsData>;
/**
 * UpdateRowsResponse contains the result of updating rows
 *
 * @generated from message integration.datasheet.v1.UpdateRowsResponse
 */
export type UpdateRowsResponse = Message<"integration.datasheet.v1.UpdateRowsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.UpdateRowsResult data = 2;
     */
    data: UpdateRowsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.UpdateRowsResponse.
 * Use `create(UpdateRowsResponseSchema)` to create a new message.
 */
export declare const UpdateRowsResponseSchema: GenMessage<UpdateRowsResponse>;
/**
 * @generated from message integration.datasheet.v1.UpdateRowsResult
 */
export type UpdateRowsResult = Message<"integration.datasheet.v1.UpdateRowsResult"> & {
    /**
     * Range that was updated (in A1 notation)
     *
     * @generated from field: string updated_range = 1;
     */
    updatedRange: string;
    /**
     * Number of rows updated
     *
     * @generated from field: int32 rows_updated = 2;
     */
    rowsUpdated: number;
    /**
     * Number of cells updated
     *
     * @generated from field: int32 cells_updated = 3;
     */
    cellsUpdated: number;
    /**
     * Number of rows matched by conditions
     *
     * @generated from field: int32 rows_matched = 4;
     */
    rowsMatched: number;
};
/**
 * Describes the message integration.datasheet.v1.UpdateRowsResult.
 * Use `create(UpdateRowsResultSchema)` to create a new message.
 */
export declare const UpdateRowsResultSchema: GenMessage<UpdateRowsResult>;
/**
 * DeleteRowsRequest is a request to delete rows
 *
 * @generated from message integration.datasheet.v1.DeleteRowsRequest
 */
export type DeleteRowsRequest = Message<"integration.datasheet.v1.DeleteRowsRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.DeleteRowsData data = 1;
     */
    data?: DeleteRowsData;
};
/**
 * Describes the message integration.datasheet.v1.DeleteRowsRequest.
 * Use `create(DeleteRowsRequestSchema)` to create a new message.
 */
export declare const DeleteRowsRequestSchema: GenMessage<DeleteRowsRequest>;
/**
 * @generated from message integration.datasheet.v1.DeleteRowsData
 */
export type DeleteRowsData = Message<"integration.datasheet.v1.DeleteRowsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Target sheet name
     *
     * @generated from field: string sheet_name = 3;
     */
    sheetName: string;
    /**
     * Specific row indices to delete (0-based)
     *
     * @generated from field: repeated int32 row_indices = 4;
     */
    rowIndices: number[];
    /**
     * Alternative: conditions to match rows for deletion (delete where)
     *
     * @generated from field: integration.datasheet.v1.ConditionGroup conditions = 5;
     */
    conditions?: ConditionGroup;
    /**
     * Whether to shift remaining rows up after deletion
     *
     * @generated from field: bool shift_rows = 6;
     */
    shiftRows: boolean;
};
/**
 * Describes the message integration.datasheet.v1.DeleteRowsData.
 * Use `create(DeleteRowsDataSchema)` to create a new message.
 */
export declare const DeleteRowsDataSchema: GenMessage<DeleteRowsData>;
/**
 * DeleteRowsResponse contains the result of deleting rows
 *
 * @generated from message integration.datasheet.v1.DeleteRowsResponse
 */
export type DeleteRowsResponse = Message<"integration.datasheet.v1.DeleteRowsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.DeleteRowsResult data = 2;
     */
    data: DeleteRowsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.DeleteRowsResponse.
 * Use `create(DeleteRowsResponseSchema)` to create a new message.
 */
export declare const DeleteRowsResponseSchema: GenMessage<DeleteRowsResponse>;
/**
 * @generated from message integration.datasheet.v1.DeleteRowsResult
 */
export type DeleteRowsResult = Message<"integration.datasheet.v1.DeleteRowsResult"> & {
    /**
     * Number of rows deleted
     *
     * @generated from field: int32 rows_deleted = 1;
     */
    rowsDeleted: number;
    /**
     * Indices of rows that were deleted
     *
     * @generated from field: repeated int32 deleted_indices = 2;
     */
    deletedIndices: number[];
};
/**
 * Describes the message integration.datasheet.v1.DeleteRowsResult.
 * Use `create(DeleteRowsResultSchema)` to create a new message.
 */
export declare const DeleteRowsResultSchema: GenMessage<DeleteRowsResult>;
/**
 * SearchRowsRequest is a request to search for rows matching conditions
 *
 * @generated from message integration.datasheet.v1.SearchRowsRequest
 */
export type SearchRowsRequest = Message<"integration.datasheet.v1.SearchRowsRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.SearchRowsData data = 1;
     */
    data?: SearchRowsData;
};
/**
 * Describes the message integration.datasheet.v1.SearchRowsRequest.
 * Use `create(SearchRowsRequestSchema)` to create a new message.
 */
export declare const SearchRowsRequestSchema: GenMessage<SearchRowsRequest>;
/**
 * @generated from message integration.datasheet.v1.SearchRowsData
 */
export type SearchRowsData = Message<"integration.datasheet.v1.SearchRowsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Target sheet name
     *
     * @generated from field: string sheet_name = 3;
     */
    sheetName: string;
    /**
     * Search conditions
     *
     * @generated from field: integration.datasheet.v1.ConditionGroup conditions = 4;
     */
    conditions?: ConditionGroup;
    /**
     * Maximum number of rows to return
     *
     * @generated from field: int32 limit = 5;
     */
    limit: number;
    /**
     * Number of rows to skip (for pagination)
     *
     * @generated from field: int32 offset = 6;
     */
    offset: number;
    /**
     * Sort specifications
     *
     * @generated from field: repeated integration.datasheet.v1.SortSpec sort_by = 7;
     */
    sortBy: SortSpec[];
    /**
     * Columns to return (empty = all columns)
     *
     * @generated from field: repeated int32 column_indices = 8;
     */
    columnIndices: number[];
    /**
     * Whether to include formatting information
     *
     * @generated from field: bool include_formatting = 9;
     */
    includeFormatting: boolean;
    /**
     * How values should be rendered
     *
     * @generated from field: integration.datasheet.v1.ValueRenderOption value_render_option = 10;
     */
    valueRenderOption: ValueRenderOption;
};
/**
 * Describes the message integration.datasheet.v1.SearchRowsData.
 * Use `create(SearchRowsDataSchema)` to create a new message.
 */
export declare const SearchRowsDataSchema: GenMessage<SearchRowsData>;
/**
 * SearchRowsResponse contains the search results
 *
 * @generated from message integration.datasheet.v1.SearchRowsResponse
 */
export type SearchRowsResponse = Message<"integration.datasheet.v1.SearchRowsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.SearchRowsResult data = 2;
     */
    data: SearchRowsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.SearchRowsResponse.
 * Use `create(SearchRowsResponseSchema)` to create a new message.
 */
export declare const SearchRowsResponseSchema: GenMessage<SearchRowsResponse>;
/**
 * @generated from message integration.datasheet.v1.SearchRowsResult
 */
export type SearchRowsResult = Message<"integration.datasheet.v1.SearchRowsResult"> & {
    /**
     * Matching rows
     *
     * @generated from field: repeated integration.datasheet.v1.Row rows = 1;
     */
    rows: Row[];
    /**
     * Total count of matching rows (before limit/offset)
     *
     * @generated from field: int32 total_count = 2;
     */
    totalCount: number;
    /**
     * Whether there are more results available
     *
     * @generated from field: bool has_more = 3;
     */
    hasMore: boolean;
};
/**
 * Describes the message integration.datasheet.v1.SearchRowsResult.
 * Use `create(SearchRowsResultSchema)` to create a new message.
 */
export declare const SearchRowsResultSchema: GenMessage<SearchRowsResult>;
/**
 * ReadRangeRequest is a request to read data from a range
 *
 * @generated from message integration.datasheet.v1.ReadRangeRequest
 */
export type ReadRangeRequest = Message<"integration.datasheet.v1.ReadRangeRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.ReadRangeData data = 1;
     */
    data?: ReadRangeData;
};
/**
 * Describes the message integration.datasheet.v1.ReadRangeRequest.
 * Use `create(ReadRangeRequestSchema)` to create a new message.
 */
export declare const ReadRangeRequestSchema: GenMessage<ReadRangeRequest>;
/**
 * @generated from message integration.datasheet.v1.ReadRangeData
 */
export type ReadRangeData = Message<"integration.datasheet.v1.ReadRangeData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Range to read
     *
     * @generated from field: integration.datasheet.v1.Range range = 3;
     */
    range?: Range;
    /**
     * Whether to include formatting information
     *
     * @generated from field: bool include_formatting = 4;
     */
    includeFormatting: boolean;
    /**
     * Whether to include notes/comments
     *
     * @generated from field: bool include_notes = 5;
     */
    includeNotes: boolean;
    /**
     * How values should be rendered
     *
     * @generated from field: integration.datasheet.v1.ValueRenderOption value_render_option = 6;
     */
    valueRenderOption: ValueRenderOption;
    /**
     * Date/time render option
     *
     * @generated from field: string date_time_render_option = 7;
     */
    dateTimeRenderOption: string;
};
/**
 * Describes the message integration.datasheet.v1.ReadRangeData.
 * Use `create(ReadRangeDataSchema)` to create a new message.
 */
export declare const ReadRangeDataSchema: GenMessage<ReadRangeData>;
/**
 * ReadRangeResponse contains the data from the range
 *
 * @generated from message integration.datasheet.v1.ReadRangeResponse
 */
export type ReadRangeResponse = Message<"integration.datasheet.v1.ReadRangeResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.ReadRangeResult data = 2;
     */
    data: ReadRangeResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.ReadRangeResponse.
 * Use `create(ReadRangeResponseSchema)` to create a new message.
 */
export declare const ReadRangeResponseSchema: GenMessage<ReadRangeResponse>;
/**
 * @generated from message integration.datasheet.v1.ReadRangeResult
 */
export type ReadRangeResult = Message<"integration.datasheet.v1.ReadRangeResult"> & {
    /**
     * Range that was read (in A1 notation)
     *
     * @generated from field: string range = 1;
     */
    range: string;
    /**
     * Rows of data from the range
     *
     * @generated from field: repeated integration.datasheet.v1.Row rows = 2;
     */
    rows: Row[];
    /**
     * Major dimension of the data (ROWS or COLUMNS)
     *
     * @generated from field: string major_dimension = 3;
     */
    majorDimension: string;
};
/**
 * Describes the message integration.datasheet.v1.ReadRangeResult.
 * Use `create(ReadRangeResultSchema)` to create a new message.
 */
export declare const ReadRangeResultSchema: GenMessage<ReadRangeResult>;
/**
 * WriteRangeRequest is a request to write data to a range
 *
 * @generated from message integration.datasheet.v1.WriteRangeRequest
 */
export type WriteRangeRequest = Message<"integration.datasheet.v1.WriteRangeRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.WriteRangeData data = 1;
     */
    data?: WriteRangeData;
};
/**
 * Describes the message integration.datasheet.v1.WriteRangeRequest.
 * Use `create(WriteRangeRequestSchema)` to create a new message.
 */
export declare const WriteRangeRequestSchema: GenMessage<WriteRangeRequest>;
/**
 * @generated from message integration.datasheet.v1.WriteRangeData
 */
export type WriteRangeData = Message<"integration.datasheet.v1.WriteRangeData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Target range
     *
     * @generated from field: integration.datasheet.v1.Range range = 3;
     */
    range?: Range;
    /**
     * Rows to write
     *
     * @generated from field: repeated integration.datasheet.v1.Row rows = 4;
     */
    rows: Row[];
    /**
     * How input values should be interpreted
     *
     * @generated from field: integration.datasheet.v1.ValueInputOption value_input_option = 5;
     */
    valueInputOption: ValueInputOption;
};
/**
 * Describes the message integration.datasheet.v1.WriteRangeData.
 * Use `create(WriteRangeDataSchema)` to create a new message.
 */
export declare const WriteRangeDataSchema: GenMessage<WriteRangeData>;
/**
 * WriteRangeResponse contains the result of writing to a range
 *
 * @generated from message integration.datasheet.v1.WriteRangeResponse
 */
export type WriteRangeResponse = Message<"integration.datasheet.v1.WriteRangeResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.WriteRangeResult data = 2;
     */
    data: WriteRangeResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.WriteRangeResponse.
 * Use `create(WriteRangeResponseSchema)` to create a new message.
 */
export declare const WriteRangeResponseSchema: GenMessage<WriteRangeResponse>;
/**
 * @generated from message integration.datasheet.v1.WriteRangeResult
 */
export type WriteRangeResult = Message<"integration.datasheet.v1.WriteRangeResult"> & {
    /**
     * Range that was written (in A1 notation)
     *
     * @generated from field: string updated_range = 1;
     */
    updatedRange: string;
    /**
     * Number of rows written
     *
     * @generated from field: int32 rows_updated = 2;
     */
    rowsUpdated: number;
    /**
     * Number of columns written
     *
     * @generated from field: int32 columns_updated = 3;
     */
    columnsUpdated: number;
    /**
     * Number of cells written
     *
     * @generated from field: int32 cells_updated = 4;
     */
    cellsUpdated: number;
};
/**
 * Describes the message integration.datasheet.v1.WriteRangeResult.
 * Use `create(WriteRangeResultSchema)` to create a new message.
 */
export declare const WriteRangeResultSchema: GenMessage<WriteRangeResult>;
/**
 * ClearRangeRequest is a request to clear data from a range
 *
 * @generated from message integration.datasheet.v1.ClearRangeRequest
 */
export type ClearRangeRequest = Message<"integration.datasheet.v1.ClearRangeRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.ClearRangeData data = 1;
     */
    data?: ClearRangeData;
};
/**
 * Describes the message integration.datasheet.v1.ClearRangeRequest.
 * Use `create(ClearRangeRequestSchema)` to create a new message.
 */
export declare const ClearRangeRequestSchema: GenMessage<ClearRangeRequest>;
/**
 * @generated from message integration.datasheet.v1.ClearRangeData
 */
export type ClearRangeData = Message<"integration.datasheet.v1.ClearRangeData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Range to clear
     *
     * @generated from field: integration.datasheet.v1.Range range = 3;
     */
    range?: Range;
    /**
     * Clear values only (preserve formatting)
     *
     * @generated from field: bool values_only = 4;
     */
    valuesOnly: boolean;
    /**
     * Clear formatting only (preserve values)
     *
     * @generated from field: bool formatting_only = 5;
     */
    formattingOnly: boolean;
};
/**
 * Describes the message integration.datasheet.v1.ClearRangeData.
 * Use `create(ClearRangeDataSchema)` to create a new message.
 */
export declare const ClearRangeDataSchema: GenMessage<ClearRangeData>;
/**
 * ClearRangeResponse contains the result of clearing a range
 *
 * @generated from message integration.datasheet.v1.ClearRangeResponse
 */
export type ClearRangeResponse = Message<"integration.datasheet.v1.ClearRangeResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.ClearRangeResult data = 2;
     */
    data: ClearRangeResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.ClearRangeResponse.
 * Use `create(ClearRangeResponseSchema)` to create a new message.
 */
export declare const ClearRangeResponseSchema: GenMessage<ClearRangeResponse>;
/**
 * @generated from message integration.datasheet.v1.ClearRangeResult
 */
export type ClearRangeResult = Message<"integration.datasheet.v1.ClearRangeResult"> & {
    /**
     * Range that was cleared (in A1 notation)
     *
     * @generated from field: string cleared_range = 1;
     */
    clearedRange: string;
};
/**
 * Describes the message integration.datasheet.v1.ClearRangeResult.
 * Use `create(ClearRangeResultSchema)` to create a new message.
 */
export declare const ClearRangeResultSchema: GenMessage<ClearRangeResult>;
/**
 * GetSheetMetadataRequest is a request to get sheet metadata
 *
 * @generated from message integration.datasheet.v1.GetSheetMetadataRequest
 */
export type GetSheetMetadataRequest = Message<"integration.datasheet.v1.GetSheetMetadataRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.GetSheetMetadataData data = 1;
     */
    data?: GetSheetMetadataData;
};
/**
 * Describes the message integration.datasheet.v1.GetSheetMetadataRequest.
 * Use `create(GetSheetMetadataRequestSchema)` to create a new message.
 */
export declare const GetSheetMetadataRequestSchema: GenMessage<GetSheetMetadataRequest>;
/**
 * @generated from message integration.datasheet.v1.GetSheetMetadataData
 */
export type GetSheetMetadataData = Message<"integration.datasheet.v1.GetSheetMetadataData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Specific sheet name (optional - if omitted, returns all sheets)
     *
     * @generated from field: string sheet_name = 3;
     */
    sheetName: string;
    /**
     * Whether to include column headers
     *
     * @generated from field: bool include_columns = 4;
     */
    includeColumns: boolean;
};
/**
 * Describes the message integration.datasheet.v1.GetSheetMetadataData.
 * Use `create(GetSheetMetadataDataSchema)` to create a new message.
 */
export declare const GetSheetMetadataDataSchema: GenMessage<GetSheetMetadataData>;
/**
 * GetSheetMetadataResponse contains sheet metadata
 *
 * @generated from message integration.datasheet.v1.GetSheetMetadataResponse
 */
export type GetSheetMetadataResponse = Message<"integration.datasheet.v1.GetSheetMetadataResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.GetSheetMetadataResult data = 2;
     */
    data: GetSheetMetadataResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.GetSheetMetadataResponse.
 * Use `create(GetSheetMetadataResponseSchema)` to create a new message.
 */
export declare const GetSheetMetadataResponseSchema: GenMessage<GetSheetMetadataResponse>;
/**
 * @generated from message integration.datasheet.v1.GetSheetMetadataResult
 */
export type GetSheetMetadataResult = Message<"integration.datasheet.v1.GetSheetMetadataResult"> & {
    /**
     * Spreadsheet information
     *
     * @generated from field: integration.datasheet.v1.Spreadsheet spreadsheet = 1;
     */
    spreadsheet?: Spreadsheet;
    /**
     * Specific sheet (if sheet_name was provided)
     *
     * @generated from field: integration.datasheet.v1.Sheet sheet = 2;
     */
    sheet?: Sheet;
};
/**
 * Describes the message integration.datasheet.v1.GetSheetMetadataResult.
 * Use `create(GetSheetMetadataResultSchema)` to create a new message.
 */
export declare const GetSheetMetadataResultSchema: GenMessage<GetSheetMetadataResult>;
/**
 * CreateSheetRequest is a request to create a new sheet
 *
 * @generated from message integration.datasheet.v1.CreateSheetRequest
 */
export type CreateSheetRequest = Message<"integration.datasheet.v1.CreateSheetRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.CreateSheetData data = 1;
     */
    data?: CreateSheetData;
};
/**
 * Describes the message integration.datasheet.v1.CreateSheetRequest.
 * Use `create(CreateSheetRequestSchema)` to create a new message.
 */
export declare const CreateSheetRequestSchema: GenMessage<CreateSheetRequest>;
/**
 * @generated from message integration.datasheet.v1.CreateSheetData
 */
export type CreateSheetData = Message<"integration.datasheet.v1.CreateSheetData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Name for the new sheet
     *
     * @generated from field: string sheet_name = 3;
     */
    sheetName: string;
    /**
     * Column definitions (optional)
     *
     * @generated from field: repeated integration.datasheet.v1.Column columns = 4;
     */
    columns: Column[];
    /**
     * Initial number of rows
     *
     * @generated from field: int32 row_count = 5;
     */
    rowCount: number;
    /**
     * Initial number of columns
     *
     * @generated from field: int32 column_count = 6;
     */
    columnCount: number;
    /**
     * Position index for the new sheet
     *
     * @generated from field: int32 index = 7;
     */
    index: number;
    /**
     * Tab color (hex format)
     *
     * @generated from field: string tab_color = 8;
     */
    tabColor: string;
};
/**
 * Describes the message integration.datasheet.v1.CreateSheetData.
 * Use `create(CreateSheetDataSchema)` to create a new message.
 */
export declare const CreateSheetDataSchema: GenMessage<CreateSheetData>;
/**
 * CreateSheetResponse contains the result of creating a sheet
 *
 * @generated from message integration.datasheet.v1.CreateSheetResponse
 */
export type CreateSheetResponse = Message<"integration.datasheet.v1.CreateSheetResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.CreateSheetResult data = 2;
     */
    data: CreateSheetResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.CreateSheetResponse.
 * Use `create(CreateSheetResponseSchema)` to create a new message.
 */
export declare const CreateSheetResponseSchema: GenMessage<CreateSheetResponse>;
/**
 * @generated from message integration.datasheet.v1.CreateSheetResult
 */
export type CreateSheetResult = Message<"integration.datasheet.v1.CreateSheetResult"> & {
    /**
     * The created sheet
     *
     * @generated from field: integration.datasheet.v1.Sheet sheet = 1;
     */
    sheet?: Sheet;
};
/**
 * Describes the message integration.datasheet.v1.CreateSheetResult.
 * Use `create(CreateSheetResultSchema)` to create a new message.
 */
export declare const CreateSheetResultSchema: GenMessage<CreateSheetResult>;
/**
 * DeleteSheetRequest is a request to delete a sheet
 *
 * @generated from message integration.datasheet.v1.DeleteSheetRequest
 */
export type DeleteSheetRequest = Message<"integration.datasheet.v1.DeleteSheetRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.DeleteSheetData data = 1;
     */
    data?: DeleteSheetData;
};
/**
 * Describes the message integration.datasheet.v1.DeleteSheetRequest.
 * Use `create(DeleteSheetRequestSchema)` to create a new message.
 */
export declare const DeleteSheetRequestSchema: GenMessage<DeleteSheetRequest>;
/**
 * @generated from message integration.datasheet.v1.DeleteSheetData
 */
export type DeleteSheetData = Message<"integration.datasheet.v1.DeleteSheetData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Sheet name to delete
     *
     * @generated from field: string sheet_name = 3;
     */
    sheetName: string;
    /**
     * Sheet ID to delete (alternative to sheet_name)
     *
     * @generated from field: string sheet_id = 4;
     */
    sheetId: string;
};
/**
 * Describes the message integration.datasheet.v1.DeleteSheetData.
 * Use `create(DeleteSheetDataSchema)` to create a new message.
 */
export declare const DeleteSheetDataSchema: GenMessage<DeleteSheetData>;
/**
 * DeleteSheetResponse contains the result of deleting a sheet
 *
 * @generated from message integration.datasheet.v1.DeleteSheetResponse
 */
export type DeleteSheetResponse = Message<"integration.datasheet.v1.DeleteSheetResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.DeleteSheetResult data = 2;
     */
    data: DeleteSheetResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.DeleteSheetResponse.
 * Use `create(DeleteSheetResponseSchema)` to create a new message.
 */
export declare const DeleteSheetResponseSchema: GenMessage<DeleteSheetResponse>;
/**
 * @generated from message integration.datasheet.v1.DeleteSheetResult
 */
export type DeleteSheetResult = Message<"integration.datasheet.v1.DeleteSheetResult"> & {
    /**
     * Confirmation message
     *
     * @generated from field: string message = 1;
     */
    message: string;
};
/**
 * Describes the message integration.datasheet.v1.DeleteSheetResult.
 * Use `create(DeleteSheetResultSchema)` to create a new message.
 */
export declare const DeleteSheetResultSchema: GenMessage<DeleteSheetResult>;
/**
 * RenameSheetRequest is a request to rename a sheet
 *
 * @generated from message integration.datasheet.v1.RenameSheetRequest
 */
export type RenameSheetRequest = Message<"integration.datasheet.v1.RenameSheetRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.RenameSheetData data = 1;
     */
    data?: RenameSheetData;
};
/**
 * Describes the message integration.datasheet.v1.RenameSheetRequest.
 * Use `create(RenameSheetRequestSchema)` to create a new message.
 */
export declare const RenameSheetRequestSchema: GenMessage<RenameSheetRequest>;
/**
 * @generated from message integration.datasheet.v1.RenameSheetData
 */
export type RenameSheetData = Message<"integration.datasheet.v1.RenameSheetData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Current sheet name
     *
     * @generated from field: string current_name = 3;
     */
    currentName: string;
    /**
     * New sheet name
     *
     * @generated from field: string new_name = 4;
     */
    newName: string;
};
/**
 * Describes the message integration.datasheet.v1.RenameSheetData.
 * Use `create(RenameSheetDataSchema)` to create a new message.
 */
export declare const RenameSheetDataSchema: GenMessage<RenameSheetData>;
/**
 * RenameSheetResponse contains the result of renaming a sheet
 *
 * @generated from message integration.datasheet.v1.RenameSheetResponse
 */
export type RenameSheetResponse = Message<"integration.datasheet.v1.RenameSheetResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.RenameSheetResult data = 2;
     */
    data: RenameSheetResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.RenameSheetResponse.
 * Use `create(RenameSheetResponseSchema)` to create a new message.
 */
export declare const RenameSheetResponseSchema: GenMessage<RenameSheetResponse>;
/**
 * @generated from message integration.datasheet.v1.RenameSheetResult
 */
export type RenameSheetResult = Message<"integration.datasheet.v1.RenameSheetResult"> & {
    /**
     * The updated sheet
     *
     * @generated from field: integration.datasheet.v1.Sheet sheet = 1;
     */
    sheet?: Sheet;
};
/**
 * Describes the message integration.datasheet.v1.RenameSheetResult.
 * Use `create(RenameSheetResultSchema)` to create a new message.
 */
export declare const RenameSheetResultSchema: GenMessage<RenameSheetResult>;
/**
 * CopySheetRequest is a request to copy a sheet
 *
 * @generated from message integration.datasheet.v1.CopySheetRequest
 */
export type CopySheetRequest = Message<"integration.datasheet.v1.CopySheetRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.CopySheetData data = 1;
     */
    data?: CopySheetData;
};
/**
 * Describes the message integration.datasheet.v1.CopySheetRequest.
 * Use `create(CopySheetRequestSchema)` to create a new message.
 */
export declare const CopySheetRequestSchema: GenMessage<CopySheetRequest>;
/**
 * @generated from message integration.datasheet.v1.CopySheetData
 */
export type CopySheetData = Message<"integration.datasheet.v1.CopySheetData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source spreadsheet identifier
     *
     * @generated from field: string source_spreadsheet_id = 2;
     */
    sourceSpreadsheetId: string;
    /**
     * Source sheet name
     *
     * @generated from field: string source_sheet_name = 3;
     */
    sourceSheetName: string;
    /**
     * Destination spreadsheet identifier (optional - same spreadsheet if omitted)
     *
     * @generated from field: string destination_spreadsheet_id = 4;
     */
    destinationSpreadsheetId: string;
    /**
     * Name for the copied sheet (optional - auto-generated if omitted)
     *
     * @generated from field: string new_sheet_name = 5;
     */
    newSheetName: string;
};
/**
 * Describes the message integration.datasheet.v1.CopySheetData.
 * Use `create(CopySheetDataSchema)` to create a new message.
 */
export declare const CopySheetDataSchema: GenMessage<CopySheetData>;
/**
 * CopySheetResponse contains the result of copying a sheet
 *
 * @generated from message integration.datasheet.v1.CopySheetResponse
 */
export type CopySheetResponse = Message<"integration.datasheet.v1.CopySheetResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.CopySheetResult data = 2;
     */
    data: CopySheetResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.CopySheetResponse.
 * Use `create(CopySheetResponseSchema)` to create a new message.
 */
export declare const CopySheetResponseSchema: GenMessage<CopySheetResponse>;
/**
 * @generated from message integration.datasheet.v1.CopySheetResult
 */
export type CopySheetResult = Message<"integration.datasheet.v1.CopySheetResult"> & {
    /**
     * The copied sheet
     *
     * @generated from field: integration.datasheet.v1.Sheet sheet = 1;
     */
    sheet?: Sheet;
};
/**
 * Describes the message integration.datasheet.v1.CopySheetResult.
 * Use `create(CopySheetResultSchema)` to create a new message.
 */
export declare const CopySheetResultSchema: GenMessage<CopySheetResult>;
/**
 * GetSpreadsheetRequest is a request to get spreadsheet information
 *
 * @generated from message integration.datasheet.v1.GetSpreadsheetRequest
 */
export type GetSpreadsheetRequest = Message<"integration.datasheet.v1.GetSpreadsheetRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.GetSpreadsheetData data = 1;
     */
    data?: GetSpreadsheetData;
};
/**
 * Describes the message integration.datasheet.v1.GetSpreadsheetRequest.
 * Use `create(GetSpreadsheetRequestSchema)` to create a new message.
 */
export declare const GetSpreadsheetRequestSchema: GenMessage<GetSpreadsheetRequest>;
/**
 * @generated from message integration.datasheet.v1.GetSpreadsheetData
 */
export type GetSpreadsheetData = Message<"integration.datasheet.v1.GetSpreadsheetData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Whether to include sheet details
     *
     * @generated from field: bool include_sheets = 3;
     */
    includeSheets: boolean;
    /**
     * Whether to include sheet data
     *
     * @generated from field: bool include_data = 4;
     */
    includeData: boolean;
};
/**
 * Describes the message integration.datasheet.v1.GetSpreadsheetData.
 * Use `create(GetSpreadsheetDataSchema)` to create a new message.
 */
export declare const GetSpreadsheetDataSchema: GenMessage<GetSpreadsheetData>;
/**
 * GetSpreadsheetResponse contains spreadsheet information
 *
 * @generated from message integration.datasheet.v1.GetSpreadsheetResponse
 */
export type GetSpreadsheetResponse = Message<"integration.datasheet.v1.GetSpreadsheetResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.Spreadsheet data = 2;
     */
    data: Spreadsheet[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.GetSpreadsheetResponse.
 * Use `create(GetSpreadsheetResponseSchema)` to create a new message.
 */
export declare const GetSpreadsheetResponseSchema: GenMessage<GetSpreadsheetResponse>;
/**
 * CreateSpreadsheetRequest is a request to create a new spreadsheet
 *
 * @generated from message integration.datasheet.v1.CreateSpreadsheetRequest
 */
export type CreateSpreadsheetRequest = Message<"integration.datasheet.v1.CreateSpreadsheetRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.CreateSpreadsheetData data = 1;
     */
    data?: CreateSpreadsheetData;
};
/**
 * Describes the message integration.datasheet.v1.CreateSpreadsheetRequest.
 * Use `create(CreateSpreadsheetRequestSchema)` to create a new message.
 */
export declare const CreateSpreadsheetRequestSchema: GenMessage<CreateSpreadsheetRequest>;
/**
 * @generated from message integration.datasheet.v1.CreateSpreadsheetData
 */
export type CreateSpreadsheetData = Message<"integration.datasheet.v1.CreateSpreadsheetData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Title for the new spreadsheet
     *
     * @generated from field: string title = 2;
     */
    title: string;
    /**
     * Initial sheets to create
     *
     * @generated from field: repeated integration.datasheet.v1.CreateSheetData sheets = 3;
     */
    sheets: CreateSheetData[];
    /**
     * Locale (e.g., "en_US")
     *
     * @generated from field: string locale = 4;
     */
    locale: string;
    /**
     * Time zone (e.g., "America/New_York")
     *
     * @generated from field: string time_zone = 5;
     */
    timeZone: string;
    /**
     * Folder ID to create spreadsheet in (provider-specific)
     *
     * @generated from field: string folder_id = 6;
     */
    folderId: string;
};
/**
 * Describes the message integration.datasheet.v1.CreateSpreadsheetData.
 * Use `create(CreateSpreadsheetDataSchema)` to create a new message.
 */
export declare const CreateSpreadsheetDataSchema: GenMessage<CreateSpreadsheetData>;
/**
 * CreateSpreadsheetResponse contains the result of creating a spreadsheet
 *
 * @generated from message integration.datasheet.v1.CreateSpreadsheetResponse
 */
export type CreateSpreadsheetResponse = Message<"integration.datasheet.v1.CreateSpreadsheetResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.Spreadsheet data = 2;
     */
    data: Spreadsheet[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.CreateSpreadsheetResponse.
 * Use `create(CreateSpreadsheetResponseSchema)` to create a new message.
 */
export declare const CreateSpreadsheetResponseSchema: GenMessage<CreateSpreadsheetResponse>;
/**
 * BatchUpdateRequest is a request to perform multiple operations atomically
 *
 * @generated from message integration.datasheet.v1.BatchUpdateRequest
 */
export type BatchUpdateRequest = Message<"integration.datasheet.v1.BatchUpdateRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.BatchUpdateData data = 1;
     */
    data?: BatchUpdateData;
};
/**
 * Describes the message integration.datasheet.v1.BatchUpdateRequest.
 * Use `create(BatchUpdateRequestSchema)` to create a new message.
 */
export declare const BatchUpdateRequestSchema: GenMessage<BatchUpdateRequest>;
/**
 * @generated from message integration.datasheet.v1.BatchUpdateData
 */
export type BatchUpdateData = Message<"integration.datasheet.v1.BatchUpdateData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Spreadsheet identifier
     *
     * @generated from field: string spreadsheet_id = 2;
     */
    spreadsheetId: string;
    /**
     * Operations to perform
     *
     * @generated from field: repeated integration.datasheet.v1.BatchOperation operations = 3;
     */
    operations: BatchOperation[];
    /**
     * Whether to stop on first error
     *
     * @generated from field: bool fail_fast = 4;
     */
    failFast: boolean;
    /**
     * Batch ID for tracking
     *
     * @generated from field: string batch_id = 5;
     */
    batchId: string;
};
/**
 * Describes the message integration.datasheet.v1.BatchUpdateData.
 * Use `create(BatchUpdateDataSchema)` to create a new message.
 */
export declare const BatchUpdateDataSchema: GenMessage<BatchUpdateData>;
/**
 * BatchOperation represents a single operation in a batch
 *
 * @generated from message integration.datasheet.v1.BatchOperation
 */
export type BatchOperation = Message<"integration.datasheet.v1.BatchOperation"> & {
    /**
     * Operation identifier
     *
     * @generated from field: string operation_id = 1;
     */
    operationId: string;
    /**
     * The operation to perform
     *
     * @generated from oneof integration.datasheet.v1.BatchOperation.operation
     */
    operation: {
        /**
         * @generated from field: integration.datasheet.v1.AddRowsData add_rows = 2;
         */
        value: AddRowsData;
        case: "addRows";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.UpdateRowsData update_rows = 3;
         */
        value: UpdateRowsData;
        case: "updateRows";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.DeleteRowsData delete_rows = 4;
         */
        value: DeleteRowsData;
        case: "deleteRows";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.WriteRangeData write_range = 5;
         */
        value: WriteRangeData;
        case: "writeRange";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.ClearRangeData clear_range = 6;
         */
        value: ClearRangeData;
        case: "clearRange";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.CreateSheetData create_sheet = 7;
         */
        value: CreateSheetData;
        case: "createSheet";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.DeleteSheetData delete_sheet = 8;
         */
        value: DeleteSheetData;
        case: "deleteSheet";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message integration.datasheet.v1.BatchOperation.
 * Use `create(BatchOperationSchema)` to create a new message.
 */
export declare const BatchOperationSchema: GenMessage<BatchOperation>;
/**
 * BatchUpdateResponse contains the results of batch operations
 *
 * @generated from message integration.datasheet.v1.BatchUpdateResponse
 */
export type BatchUpdateResponse = Message<"integration.datasheet.v1.BatchUpdateResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.BatchUpdateResult data = 2;
     */
    data: BatchUpdateResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.BatchUpdateResponse.
 * Use `create(BatchUpdateResponseSchema)` to create a new message.
 */
export declare const BatchUpdateResponseSchema: GenMessage<BatchUpdateResponse>;
/**
 * @generated from message integration.datasheet.v1.BatchUpdateResult
 */
export type BatchUpdateResult = Message<"integration.datasheet.v1.BatchUpdateResult"> & {
    /**
     * Batch ID
     *
     * @generated from field: string batch_id = 1;
     */
    batchId: string;
    /**
     * Results for each operation
     *
     * @generated from field: repeated integration.datasheet.v1.BatchOperationResult operation_results = 2;
     */
    operationResults: BatchOperationResult[];
    /**
     * Number of successful operations
     *
     * @generated from field: int32 success_count = 3;
     */
    successCount: number;
    /**
     * Number of failed operations
     *
     * @generated from field: int32 failure_count = 4;
     */
    failureCount: number;
};
/**
 * Describes the message integration.datasheet.v1.BatchUpdateResult.
 * Use `create(BatchUpdateResultSchema)` to create a new message.
 */
export declare const BatchUpdateResultSchema: GenMessage<BatchUpdateResult>;
/**
 * @generated from message integration.datasheet.v1.BatchOperationResult
 */
export type BatchOperationResult = Message<"integration.datasheet.v1.BatchOperationResult"> & {
    /**
     * Operation identifier
     *
     * @generated from field: string operation_id = 1;
     */
    operationId: string;
    /**
     * Whether this operation succeeded
     *
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * Error if operation failed
     *
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * Result data (type depends on operation)
     *
     * @generated from oneof integration.datasheet.v1.BatchOperationResult.result
     */
    result: {
        /**
         * @generated from field: integration.datasheet.v1.AddRowsResult add_rows_result = 4;
         */
        value: AddRowsResult;
        case: "addRowsResult";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.UpdateRowsResult update_rows_result = 5;
         */
        value: UpdateRowsResult;
        case: "updateRowsResult";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.DeleteRowsResult delete_rows_result = 6;
         */
        value: DeleteRowsResult;
        case: "deleteRowsResult";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.WriteRangeResult write_range_result = 7;
         */
        value: WriteRangeResult;
        case: "writeRangeResult";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.ClearRangeResult clear_range_result = 8;
         */
        value: ClearRangeResult;
        case: "clearRangeResult";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.CreateSheetResult create_sheet_result = 9;
         */
        value: CreateSheetResult;
        case: "createSheetResult";
    } | {
        /**
         * @generated from field: integration.datasheet.v1.DeleteSheetResult delete_sheet_result = 10;
         */
        value: DeleteSheetResult;
        case: "deleteSheetResult";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message integration.datasheet.v1.BatchOperationResult.
 * Use `create(BatchOperationResultSchema)` to create a new message.
 */
export declare const BatchOperationResultSchema: GenMessage<BatchOperationResult>;
/**
 * CheckDatasheetHealthRequest is a request to check provider health
 *
 * @generated from message integration.datasheet.v1.CheckDatasheetHealthRequest
 */
export type CheckDatasheetHealthRequest = Message<"integration.datasheet.v1.CheckDatasheetHealthRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.DatasheetHealthCheckData data = 1;
     */
    data?: DatasheetHealthCheckData;
};
/**
 * Describes the message integration.datasheet.v1.CheckDatasheetHealthRequest.
 * Use `create(CheckDatasheetHealthRequestSchema)` to create a new message.
 */
export declare const CheckDatasheetHealthRequestSchema: GenMessage<CheckDatasheetHealthRequest>;
/**
 * @generated from message integration.datasheet.v1.DatasheetHealthCheckData
 */
export type DatasheetHealthCheckData = Message<"integration.datasheet.v1.DatasheetHealthCheckData"> & {
    /**
     * Provider identifier to check
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Whether to perform deep health check
     *
     * @generated from field: bool deep_check = 2;
     */
    deepCheck: boolean;
    /**
     * Test spreadsheet ID for deep check (optional)
     *
     * @generated from field: string test_spreadsheet_id = 3;
     */
    testSpreadsheetId: string;
};
/**
 * Describes the message integration.datasheet.v1.DatasheetHealthCheckData.
 * Use `create(DatasheetHealthCheckDataSchema)` to create a new message.
 */
export declare const DatasheetHealthCheckDataSchema: GenMessage<DatasheetHealthCheckData>;
/**
 * CheckDatasheetHealthResponse contains the health check result
 *
 * @generated from message integration.datasheet.v1.CheckDatasheetHealthResponse
 */
export type CheckDatasheetHealthResponse = Message<"integration.datasheet.v1.CheckDatasheetHealthResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.DatasheetHealthStatus data = 2;
     */
    data: DatasheetHealthStatus[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.CheckDatasheetHealthResponse.
 * Use `create(CheckDatasheetHealthResponseSchema)` to create a new message.
 */
export declare const CheckDatasheetHealthResponseSchema: GenMessage<CheckDatasheetHealthResponse>;
/**
 * @generated from message integration.datasheet.v1.DatasheetHealthStatus
 */
export type DatasheetHealthStatus = Message<"integration.datasheet.v1.DatasheetHealthStatus"> & {
    /**
     * Whether the provider is healthy
     *
     * @generated from field: bool is_healthy = 1;
     */
    isHealthy: boolean;
    /**
     * Health status message
     *
     * @generated from field: string status_message = 2;
     */
    statusMessage: string;
    /**
     * Provider health status details
     *
     * @generated from field: integration.datasheet.v1.ProviderHealthStatus health_status = 3;
     */
    healthStatus?: ProviderHealthStatus;
    /**
     * Additional health details
     *
     * @generated from field: map<string, string> details = 4;
     */
    details: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.DatasheetHealthStatus.
 * Use `create(DatasheetHealthStatusSchema)` to create a new message.
 */
export declare const DatasheetHealthStatusSchema: GenMessage<DatasheetHealthStatus>;
/**
 * GetDatasheetCapabilitiesRequest is a request to get provider capabilities
 *
 * @generated from message integration.datasheet.v1.GetDatasheetCapabilitiesRequest
 */
export type GetDatasheetCapabilitiesRequest = Message<"integration.datasheet.v1.GetDatasheetCapabilitiesRequest"> & {
    /**
     * @generated from field: integration.datasheet.v1.DatasheetProviderLookup data = 1;
     */
    data?: DatasheetProviderLookup;
};
/**
 * Describes the message integration.datasheet.v1.GetDatasheetCapabilitiesRequest.
 * Use `create(GetDatasheetCapabilitiesRequestSchema)` to create a new message.
 */
export declare const GetDatasheetCapabilitiesRequestSchema: GenMessage<GetDatasheetCapabilitiesRequest>;
/**
 * @generated from message integration.datasheet.v1.DatasheetProviderLookup
 */
export type DatasheetProviderLookup = Message<"integration.datasheet.v1.DatasheetProviderLookup"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
};
/**
 * Describes the message integration.datasheet.v1.DatasheetProviderLookup.
 * Use `create(DatasheetProviderLookupSchema)` to create a new message.
 */
export declare const DatasheetProviderLookupSchema: GenMessage<DatasheetProviderLookup>;
/**
 * GetDatasheetCapabilitiesResponse contains the provider's capabilities
 *
 * @generated from message integration.datasheet.v1.GetDatasheetCapabilitiesResponse
 */
export type GetDatasheetCapabilitiesResponse = Message<"integration.datasheet.v1.GetDatasheetCapabilitiesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.datasheet.v1.DatasheetProviderCapabilities data = 2;
     */
    data: DatasheetProviderCapabilities[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.datasheet.v1.GetDatasheetCapabilitiesResponse.
 * Use `create(GetDatasheetCapabilitiesResponseSchema)` to create a new message.
 */
export declare const GetDatasheetCapabilitiesResponseSchema: GenMessage<GetDatasheetCapabilitiesResponse>;
/**
 * @generated from message integration.datasheet.v1.DatasheetProviderCapabilities
 */
export type DatasheetProviderCapabilities = Message<"integration.datasheet.v1.DatasheetProviderCapabilities"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.datasheet.v1.DatasheetProviderType provider_type = 2;
     */
    providerType: DatasheetProviderType;
    /**
     * Supported capabilities
     *
     * @generated from field: repeated integration.datasheet.v1.DatasheetCapability capabilities = 3;
     */
    capabilities: DatasheetCapability[];
    /**
     * Maximum cells per request
     *
     * @generated from field: int32 max_cells_per_request = 4;
     */
    maxCellsPerRequest: number;
    /**
     * Maximum rows per request
     *
     * @generated from field: int32 max_rows_per_request = 5;
     */
    maxRowsPerRequest: number;
    /**
     * Maximum concurrent requests
     *
     * @generated from field: int32 max_concurrent_requests = 6;
     */
    maxConcurrentRequests: number;
    /**
     * Rate limits
     *
     * @generated from field: integration.datasheet.v1.DatasheetRateLimits rate_limits = 7;
     */
    rateLimits?: DatasheetRateLimits;
    /**
     * Capability-specific details
     *
     * @generated from field: map<string, string> capability_details = 8;
     */
    capabilityDetails: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.datasheet.v1.DatasheetProviderCapabilities.
 * Use `create(DatasheetProviderCapabilitiesSchema)` to create a new message.
 */
export declare const DatasheetProviderCapabilitiesSchema: GenMessage<DatasheetProviderCapabilities>;
/**
 * DatasheetRateLimits represents API rate limiting information
 *
 * @generated from message integration.datasheet.v1.DatasheetRateLimits
 */
export type DatasheetRateLimits = Message<"integration.datasheet.v1.DatasheetRateLimits"> & {
    /**
     * Requests per minute (read)
     *
     * @generated from field: int32 read_requests_per_minute = 1;
     */
    readRequestsPerMinute: number;
    /**
     * Requests per minute (write)
     *
     * @generated from field: int32 write_requests_per_minute = 2;
     */
    writeRequestsPerMinute: number;
    /**
     * Requests per day
     *
     * @generated from field: int32 requests_per_day = 3;
     */
    requestsPerDay: number;
    /**
     * Cells per read request
     *
     * @generated from field: int32 cells_per_read = 4;
     */
    cellsPerRead: number;
    /**
     * Cells per write request
     *
     * @generated from field: int32 cells_per_write = 5;
     */
    cellsPerWrite: number;
};
/**
 * Describes the message integration.datasheet.v1.DatasheetRateLimits.
 * Use `create(DatasheetRateLimitsSchema)` to create a new message.
 */
export declare const DatasheetRateLimitsSchema: GenMessage<DatasheetRateLimits>;
/**
 * DatasheetDomainService provides datasheet operations across multiple providers
 * This service defines the contract; the hexagonal architecture adapters
 * implement provider-specific behavior
 *
 * @generated from service integration.datasheet.v1.DatasheetDomainService
 */
export declare const DatasheetDomainService: GenService<{
    /**
     * Row Operations
     *
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.AddRows
     */
    addRows: {
        methodKind: "unary";
        input: typeof AddRowsRequestSchema;
        output: typeof AddRowsResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.UpdateRows
     */
    updateRows: {
        methodKind: "unary";
        input: typeof UpdateRowsRequestSchema;
        output: typeof UpdateRowsResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.DeleteRows
     */
    deleteRows: {
        methodKind: "unary";
        input: typeof DeleteRowsRequestSchema;
        output: typeof DeleteRowsResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.SearchRows
     */
    searchRows: {
        methodKind: "unary";
        input: typeof SearchRowsRequestSchema;
        output: typeof SearchRowsResponseSchema;
    };
    /**
     * Range Operations
     *
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.ReadRange
     */
    readRange: {
        methodKind: "unary";
        input: typeof ReadRangeRequestSchema;
        output: typeof ReadRangeResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.WriteRange
     */
    writeRange: {
        methodKind: "unary";
        input: typeof WriteRangeRequestSchema;
        output: typeof WriteRangeResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.ClearRange
     */
    clearRange: {
        methodKind: "unary";
        input: typeof ClearRangeRequestSchema;
        output: typeof ClearRangeResponseSchema;
    };
    /**
     * Sheet Operations
     *
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.GetSheetMetadata
     */
    getSheetMetadata: {
        methodKind: "unary";
        input: typeof GetSheetMetadataRequestSchema;
        output: typeof GetSheetMetadataResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.CreateSheet
     */
    createSheet: {
        methodKind: "unary";
        input: typeof CreateSheetRequestSchema;
        output: typeof CreateSheetResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.DeleteSheet
     */
    deleteSheet: {
        methodKind: "unary";
        input: typeof DeleteSheetRequestSchema;
        output: typeof DeleteSheetResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.RenameSheet
     */
    renameSheet: {
        methodKind: "unary";
        input: typeof RenameSheetRequestSchema;
        output: typeof RenameSheetResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.CopySheet
     */
    copySheet: {
        methodKind: "unary";
        input: typeof CopySheetRequestSchema;
        output: typeof CopySheetResponseSchema;
    };
    /**
     * Spreadsheet Operations
     *
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.GetSpreadsheet
     */
    getSpreadsheet: {
        methodKind: "unary";
        input: typeof GetSpreadsheetRequestSchema;
        output: typeof GetSpreadsheetResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.CreateSpreadsheet
     */
    createSpreadsheet: {
        methodKind: "unary";
        input: typeof CreateSpreadsheetRequestSchema;
        output: typeof CreateSpreadsheetResponseSchema;
    };
    /**
     * Batch Operations
     *
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.BatchUpdate
     */
    batchUpdate: {
        methodKind: "unary";
        input: typeof BatchUpdateRequestSchema;
        output: typeof BatchUpdateResponseSchema;
    };
    /**
     * Provider Health
     *
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.CheckHealth
     */
    checkHealth: {
        methodKind: "unary";
        input: typeof CheckDatasheetHealthRequestSchema;
        output: typeof CheckDatasheetHealthResponseSchema;
    };
    /**
     * @generated from rpc integration.datasheet.v1.DatasheetDomainService.GetCapabilities
     */
    getCapabilities: {
        methodKind: "unary";
        input: typeof GetDatasheetCapabilitiesRequestSchema;
        output: typeof GetDatasheetCapabilitiesResponseSchema;
    };
}>;
