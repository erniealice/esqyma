import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { FieldSelection, FieldValue, FilterGroup, Record, Selection, SortSpec, Source, Table, TableSchema, TabularCapability, TabularProviderType } from "./tabular_pb";
import type { Error } from "../../domain/common/error_pb";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file integration/tabular/tabular_service.proto.
 */
export declare const file_integration_tabular_tabular_service: GenFile;
/**
 * ReadRecordsRequest is a request to read records from a tabular source
 *
 * @generated from message integration.tabular.v1.ReadRecordsRequest
 */
export type ReadRecordsRequest = Message<"integration.tabular.v1.ReadRecordsRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.ReadRecordsData data = 1;
     */
    data?: ReadRecordsData;
};
/**
 * Describes the message integration.tabular.v1.ReadRecordsRequest.
 * Use `create(ReadRecordsRequestSchema)` to create a new message.
 */
export declare const ReadRecordsRequestSchema: GenMessage<ReadRecordsRequest>;
/**
 * @generated from message integration.tabular.v1.ReadRecordsData
 */
export type ReadRecordsData = Message<"integration.tabular.v1.ReadRecordsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Selection criteria for which records to read
     *
     * @generated from field: integration.tabular.v1.Selection selection = 3;
     */
    selection?: Selection;
    /**
     * Sort specifications
     *
     * @generated from field: repeated integration.tabular.v1.SortSpec sort_by = 4;
     */
    sortBy: SortSpec[];
    /**
     * Whether to include schema information in the response
     *
     * @generated from field: bool include_schema = 5;
     */
    includeSchema: boolean;
};
/**
 * Describes the message integration.tabular.v1.ReadRecordsData.
 * Use `create(ReadRecordsDataSchema)` to create a new message.
 */
export declare const ReadRecordsDataSchema: GenMessage<ReadRecordsData>;
/**
 * ReadRecordsResponse contains the records from the source
 *
 * @generated from message integration.tabular.v1.ReadRecordsResponse
 */
export type ReadRecordsResponse = Message<"integration.tabular.v1.ReadRecordsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.ReadRecordsResult data = 2;
     */
    data: ReadRecordsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.ReadRecordsResponse.
 * Use `create(ReadRecordsResponseSchema)` to create a new message.
 */
export declare const ReadRecordsResponseSchema: GenMessage<ReadRecordsResponse>;
/**
 * @generated from message integration.tabular.v1.ReadRecordsResult
 */
export type ReadRecordsResult = Message<"integration.tabular.v1.ReadRecordsResult"> & {
    /**
     * Records retrieved
     *
     * @generated from field: repeated integration.tabular.v1.Record records = 1;
     */
    records: Record[];
    /**
     * Total count of matching records
     *
     * @generated from field: int64 total_count = 2;
     */
    totalCount: bigint;
    /**
     * Schema of the table (if include_schema was true)
     *
     * @generated from field: integration.tabular.v1.TableSchema schema = 3;
     */
    schema?: TableSchema;
    /**
     * Whether there are more records available
     *
     * @generated from field: bool has_more = 4;
     */
    hasMore: boolean;
    /**
     * Offset for the next page of results
     *
     * @generated from field: int32 next_offset = 5;
     */
    nextOffset: number;
};
/**
 * Describes the message integration.tabular.v1.ReadRecordsResult.
 * Use `create(ReadRecordsResultSchema)` to create a new message.
 */
export declare const ReadRecordsResultSchema: GenMessage<ReadRecordsResult>;
/**
 * @generated from message integration.tabular.v1.WriteRecordsRequest
 */
export type WriteRecordsRequest = Message<"integration.tabular.v1.WriteRecordsRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.WriteRecordsData data = 1;
     */
    data?: WriteRecordsData;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordsRequest.
 * Use `create(WriteRecordsRequestSchema)` to create a new message.
 */
export declare const WriteRecordsRequestSchema: GenMessage<WriteRecordsRequest>;
/**
 * @generated from message integration.tabular.v1.WriteRecordsData
 */
export type WriteRecordsData = Message<"integration.tabular.v1.WriteRecordsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Table name within the source
     *
     * @generated from field: string table = 3;
     */
    table: string;
    /**
     * Records to write
     *
     * @generated from field: repeated integration.tabular.v1.Record records = 4;
     */
    records: Record[];
    /**
     * Insert position (-1 = append to end)
     *
     * @generated from field: int64 insert_at = 5;
     */
    insertAt: bigint;
    /**
     * Write options
     *
     * @generated from field: integration.tabular.v1.WriteOptions options = 6;
     */
    options?: WriteOptions;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordsData.
 * Use `create(WriteRecordsDataSchema)` to create a new message.
 */
export declare const WriteRecordsDataSchema: GenMessage<WriteRecordsData>;
/**
 * WriteOptions represents options for write operations
 *
 * @generated from message integration.tabular.v1.WriteOptions
 */
export type WriteOptions = Message<"integration.tabular.v1.WriteOptions"> & {
    /**
     * Skip validation of the data
     *
     * @generated from field: bool skip_validation = 1;
     */
    skipValidation: boolean;
    /**
     * Return the written records in the response
     *
     * @generated from field: bool return_records = 2;
     */
    returnRecords: boolean;
    /**
     * How input values should be interpreted (RAW, USER_ENTERED)
     *
     * @generated from field: string value_input_option = 3;
     */
    valueInputOption: string;
};
/**
 * Describes the message integration.tabular.v1.WriteOptions.
 * Use `create(WriteOptionsSchema)` to create a new message.
 */
export declare const WriteOptionsSchema: GenMessage<WriteOptions>;
/**
 * WriteRecordsResponse contains the result of writing records
 *
 * @generated from message integration.tabular.v1.WriteRecordsResponse
 */
export type WriteRecordsResponse = Message<"integration.tabular.v1.WriteRecordsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.WriteRecordsResult data = 2;
     */
    data: WriteRecordsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordsResponse.
 * Use `create(WriteRecordsResponseSchema)` to create a new message.
 */
export declare const WriteRecordsResponseSchema: GenMessage<WriteRecordsResponse>;
/**
 * @generated from message integration.tabular.v1.WriteRecordsResult
 */
export type WriteRecordsResult = Message<"integration.tabular.v1.WriteRecordsResult"> & {
    /**
     * Number of records written
     *
     * @generated from field: int32 records_written = 1;
     */
    recordsWritten: number;
    /**
     * The written records (if return_records was true)
     *
     * @generated from field: repeated integration.tabular.v1.Record written_records = 2;
     */
    writtenRecords: Record[];
    /**
     * Location where records were written
     *
     * @generated from field: string location = 3;
     */
    location: string;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordsResult.
 * Use `create(WriteRecordsResultSchema)` to create a new message.
 */
export declare const WriteRecordsResultSchema: GenMessage<WriteRecordsResult>;
/**
 * @generated from message integration.tabular.v1.WriteRecordSimpleRequest
 */
export type WriteRecordSimpleRequest = Message<"integration.tabular.v1.WriteRecordSimpleRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.WriteRecordSimpleData data = 1;
     */
    data?: WriteRecordSimpleData;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordSimpleRequest.
 * Use `create(WriteRecordSimpleRequestSchema)` to create a new message.
 */
export declare const WriteRecordSimpleRequestSchema: GenMessage<WriteRecordSimpleRequest>;
/**
 * @generated from message integration.tabular.v1.WriteRecordSimpleData
 */
export type WriteRecordSimpleData = Message<"integration.tabular.v1.WriteRecordSimpleData"> & {
    /**
     * Source identifier (e.g., spreadsheet ID) - REQUIRED
     *
     * @generated from field: string source_id = 1;
     */
    sourceId: string;
    /**
     * Table/sheet name within the source (default: "Sheet1")
     *
     * @generated from field: string table = 2;
     */
    table: string;
    /**
     * Field values as a flexible struct (maps to map[string]interface{} in Go)
     * All keys become column names, values become cell values
     * Example: {"first_name": "John", "last_name": "Doe", "amount": 100}
     *
     * @generated from field: google.protobuf.Struct fields = 3;
     */
    fields?: JsonObject;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordSimpleData.
 * Use `create(WriteRecordSimpleDataSchema)` to create a new message.
 */
export declare const WriteRecordSimpleDataSchema: GenMessage<WriteRecordSimpleData>;
/**
 * WriteRecordSimpleResponse contains the result of writing a single record
 *
 * @generated from message integration.tabular.v1.WriteRecordSimpleResponse
 */
export type WriteRecordSimpleResponse = Message<"integration.tabular.v1.WriteRecordSimpleResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.WriteRecordSimpleResult data = 2;
     */
    data: WriteRecordSimpleResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordSimpleResponse.
 * Use `create(WriteRecordSimpleResponseSchema)` to create a new message.
 */
export declare const WriteRecordSimpleResponseSchema: GenMessage<WriteRecordSimpleResponse>;
/**
 * @generated from message integration.tabular.v1.WriteRecordSimpleResult
 */
export type WriteRecordSimpleResult = Message<"integration.tabular.v1.WriteRecordSimpleResult"> & {
    /**
     * Number of records written (typically 1)
     *
     * @generated from field: int32 records_written = 1;
     */
    recordsWritten: number;
    /**
     * Location where the record was written (e.g., "Sheet1!A10:D10")
     *
     * @generated from field: string location = 2;
     */
    location: string;
};
/**
 * Describes the message integration.tabular.v1.WriteRecordSimpleResult.
 * Use `create(WriteRecordSimpleResultSchema)` to create a new message.
 */
export declare const WriteRecordSimpleResultSchema: GenMessage<WriteRecordSimpleResult>;
/**
 * @generated from message integration.tabular.v1.UpdateRecordsRequest
 */
export type UpdateRecordsRequest = Message<"integration.tabular.v1.UpdateRecordsRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.UpdateRecordsData data = 1;
     */
    data?: UpdateRecordsData;
};
/**
 * Describes the message integration.tabular.v1.UpdateRecordsRequest.
 * Use `create(UpdateRecordsRequestSchema)` to create a new message.
 */
export declare const UpdateRecordsRequestSchema: GenMessage<UpdateRecordsRequest>;
/**
 * @generated from message integration.tabular.v1.UpdateRecordsData
 */
export type UpdateRecordsData = Message<"integration.tabular.v1.UpdateRecordsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Selection criteria for which records to update
     *
     * @generated from field: integration.tabular.v1.Selection selection = 3;
     */
    selection?: Selection;
    /**
     * Field-level updates to apply
     *
     * @generated from field: repeated integration.tabular.v1.FieldUpdate updates = 4;
     */
    updates: FieldUpdate[];
    /**
     * Complete replacement records (alternative to field updates)
     *
     * @generated from field: repeated integration.tabular.v1.Record replacement_records = 5;
     */
    replacementRecords: Record[];
};
/**
 * Describes the message integration.tabular.v1.UpdateRecordsData.
 * Use `create(UpdateRecordsDataSchema)` to create a new message.
 */
export declare const UpdateRecordsDataSchema: GenMessage<UpdateRecordsData>;
/**
 * FieldUpdate represents an update to a specific field
 *
 * @generated from message integration.tabular.v1.FieldUpdate
 */
export type FieldUpdate = Message<"integration.tabular.v1.FieldUpdate"> & {
    /**
     * Field identifier (one of the following)
     *
     * @generated from oneof integration.tabular.v1.FieldUpdate.field
     */
    field: {
        /**
         * Field by index
         *
         * @generated from field: int32 field_index = 1;
         */
        value: number;
        case: "fieldIndex";
    } | {
        /**
         * Field by name
         *
         * @generated from field: string field_name = 2;
         */
        value: string;
        case: "fieldName";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * New value for the field
     *
     * @generated from field: integration.tabular.v1.FieldValue value = 3;
     */
    value?: FieldValue;
};
/**
 * Describes the message integration.tabular.v1.FieldUpdate.
 * Use `create(FieldUpdateSchema)` to create a new message.
 */
export declare const FieldUpdateSchema: GenMessage<FieldUpdate>;
/**
 * UpdateRecordsResponse contains the result of updating records
 *
 * @generated from message integration.tabular.v1.UpdateRecordsResponse
 */
export type UpdateRecordsResponse = Message<"integration.tabular.v1.UpdateRecordsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.UpdateRecordsResult data = 2;
     */
    data: UpdateRecordsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.UpdateRecordsResponse.
 * Use `create(UpdateRecordsResponseSchema)` to create a new message.
 */
export declare const UpdateRecordsResponseSchema: GenMessage<UpdateRecordsResponse>;
/**
 * @generated from message integration.tabular.v1.UpdateRecordsResult
 */
export type UpdateRecordsResult = Message<"integration.tabular.v1.UpdateRecordsResult"> & {
    /**
     * Number of records updated
     *
     * @generated from field: int32 records_updated = 1;
     */
    recordsUpdated: number;
    /**
     * Number of records matched by the selection
     *
     * @generated from field: int32 records_matched = 2;
     */
    recordsMatched: number;
};
/**
 * Describes the message integration.tabular.v1.UpdateRecordsResult.
 * Use `create(UpdateRecordsResultSchema)` to create a new message.
 */
export declare const UpdateRecordsResultSchema: GenMessage<UpdateRecordsResult>;
/**
 * @generated from message integration.tabular.v1.DeleteRecordsRequest
 */
export type DeleteRecordsRequest = Message<"integration.tabular.v1.DeleteRecordsRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.DeleteRecordsData data = 1;
     */
    data?: DeleteRecordsData;
};
/**
 * Describes the message integration.tabular.v1.DeleteRecordsRequest.
 * Use `create(DeleteRecordsRequestSchema)` to create a new message.
 */
export declare const DeleteRecordsRequestSchema: GenMessage<DeleteRecordsRequest>;
/**
 * @generated from message integration.tabular.v1.DeleteRecordsData
 */
export type DeleteRecordsData = Message<"integration.tabular.v1.DeleteRecordsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Selection criteria for which records to delete
     *
     * @generated from field: integration.tabular.v1.Selection selection = 3;
     */
    selection?: Selection;
    /**
     * Whether to shift remaining records up after deletion
     *
     * @generated from field: bool shift_remaining = 4;
     */
    shiftRemaining: boolean;
};
/**
 * Describes the message integration.tabular.v1.DeleteRecordsData.
 * Use `create(DeleteRecordsDataSchema)` to create a new message.
 */
export declare const DeleteRecordsDataSchema: GenMessage<DeleteRecordsData>;
/**
 * DeleteRecordsResponse contains the result of deleting records
 *
 * @generated from message integration.tabular.v1.DeleteRecordsResponse
 */
export type DeleteRecordsResponse = Message<"integration.tabular.v1.DeleteRecordsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.DeleteRecordsResult data = 2;
     */
    data: DeleteRecordsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.DeleteRecordsResponse.
 * Use `create(DeleteRecordsResponseSchema)` to create a new message.
 */
export declare const DeleteRecordsResponseSchema: GenMessage<DeleteRecordsResponse>;
/**
 * @generated from message integration.tabular.v1.DeleteRecordsResult
 */
export type DeleteRecordsResult = Message<"integration.tabular.v1.DeleteRecordsResult"> & {
    /**
     * Number of records deleted
     *
     * @generated from field: int32 records_deleted = 1;
     */
    recordsDeleted: number;
};
/**
 * Describes the message integration.tabular.v1.DeleteRecordsResult.
 * Use `create(DeleteRecordsResultSchema)` to create a new message.
 */
export declare const DeleteRecordsResultSchema: GenMessage<DeleteRecordsResult>;
/**
 * @generated from message integration.tabular.v1.SearchRecordsRequest
 */
export type SearchRecordsRequest = Message<"integration.tabular.v1.SearchRecordsRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.SearchRecordsData data = 1;
     */
    data?: SearchRecordsData;
};
/**
 * Describes the message integration.tabular.v1.SearchRecordsRequest.
 * Use `create(SearchRecordsRequestSchema)` to create a new message.
 */
export declare const SearchRecordsRequestSchema: GenMessage<SearchRecordsRequest>;
/**
 * @generated from message integration.tabular.v1.SearchRecordsData
 */
export type SearchRecordsData = Message<"integration.tabular.v1.SearchRecordsData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Table name within the source
     *
     * @generated from field: string table = 3;
     */
    table: string;
    /**
     * Filter conditions
     *
     * @generated from field: integration.tabular.v1.FilterGroup filter = 4;
     */
    filter?: FilterGroup;
    /**
     * Fields to return
     *
     * @generated from field: integration.tabular.v1.FieldSelection fields = 5;
     */
    fields?: FieldSelection;
    /**
     * Sort specifications
     *
     * @generated from field: repeated integration.tabular.v1.SortSpec sort_by = 6;
     */
    sortBy: SortSpec[];
    /**
     * Maximum number of records to return
     *
     * @generated from field: int32 limit = 7;
     */
    limit: number;
    /**
     * Number of records to skip (for pagination)
     *
     * @generated from field: int32 offset = 8;
     */
    offset: number;
};
/**
 * Describes the message integration.tabular.v1.SearchRecordsData.
 * Use `create(SearchRecordsDataSchema)` to create a new message.
 */
export declare const SearchRecordsDataSchema: GenMessage<SearchRecordsData>;
/**
 * SearchRecordsResponse contains the search results
 *
 * @generated from message integration.tabular.v1.SearchRecordsResponse
 */
export type SearchRecordsResponse = Message<"integration.tabular.v1.SearchRecordsResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.SearchRecordsResult data = 2;
     */
    data: SearchRecordsResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.SearchRecordsResponse.
 * Use `create(SearchRecordsResponseSchema)` to create a new message.
 */
export declare const SearchRecordsResponseSchema: GenMessage<SearchRecordsResponse>;
/**
 * @generated from message integration.tabular.v1.SearchRecordsResult
 */
export type SearchRecordsResult = Message<"integration.tabular.v1.SearchRecordsResult"> & {
    /**
     * Matching records
     *
     * @generated from field: repeated integration.tabular.v1.Record records = 1;
     */
    records: Record[];
    /**
     * Total count of matching records
     *
     * @generated from field: int64 total_count = 2;
     */
    totalCount: bigint;
    /**
     * Whether there are more results available
     *
     * @generated from field: bool has_more = 3;
     */
    hasMore: boolean;
};
/**
 * Describes the message integration.tabular.v1.SearchRecordsResult.
 * Use `create(SearchRecordsResultSchema)` to create a new message.
 */
export declare const SearchRecordsResultSchema: GenMessage<SearchRecordsResult>;
/**
 * GetSchemaRequest is a request to get schema information
 *
 * @generated from message integration.tabular.v1.GetSchemaRequest
 */
export type GetSchemaRequest = Message<"integration.tabular.v1.GetSchemaRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.GetSchemaData data = 1;
     */
    data?: GetSchemaData;
};
/**
 * Describes the message integration.tabular.v1.GetSchemaRequest.
 * Use `create(GetSchemaRequestSchema)` to create a new message.
 */
export declare const GetSchemaRequestSchema: GenMessage<GetSchemaRequest>;
/**
 * @generated from message integration.tabular.v1.GetSchemaData
 */
export type GetSchemaData = Message<"integration.tabular.v1.GetSchemaData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Table name (optional - if omitted, returns source-level schema)
     *
     * @generated from field: string table = 3;
     */
    table: string;
};
/**
 * Describes the message integration.tabular.v1.GetSchemaData.
 * Use `create(GetSchemaDataSchema)` to create a new message.
 */
export declare const GetSchemaDataSchema: GenMessage<GetSchemaData>;
/**
 * GetSchemaResponse contains schema information
 *
 * @generated from message integration.tabular.v1.GetSchemaResponse
 */
export type GetSchemaResponse = Message<"integration.tabular.v1.GetSchemaResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.GetSchemaResult data = 2;
     */
    data: GetSchemaResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.GetSchemaResponse.
 * Use `create(GetSchemaResponseSchema)` to create a new message.
 */
export declare const GetSchemaResponseSchema: GenMessage<GetSchemaResponse>;
/**
 * @generated from message integration.tabular.v1.GetSchemaResult
 */
export type GetSchemaResult = Message<"integration.tabular.v1.GetSchemaResult"> & {
    /**
     * Source information
     *
     * @generated from field: integration.tabular.v1.Source source = 1;
     */
    source?: Source;
    /**
     * Table schema (if table was specified)
     *
     * @generated from field: integration.tabular.v1.TableSchema table_schema = 2;
     */
    tableSchema?: TableSchema;
};
/**
 * Describes the message integration.tabular.v1.GetSchemaResult.
 * Use `create(GetSchemaResultSchema)` to create a new message.
 */
export declare const GetSchemaResultSchema: GenMessage<GetSchemaResult>;
/**
 * GetSourceRequest is a request to get source information
 *
 * @generated from message integration.tabular.v1.GetSourceRequest
 */
export type GetSourceRequest = Message<"integration.tabular.v1.GetSourceRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.GetSourceData data = 1;
     */
    data?: GetSourceData;
};
/**
 * Describes the message integration.tabular.v1.GetSourceRequest.
 * Use `create(GetSourceRequestSchema)` to create a new message.
 */
export declare const GetSourceRequestSchema: GenMessage<GetSourceRequest>;
/**
 * @generated from message integration.tabular.v1.GetSourceData
 */
export type GetSourceData = Message<"integration.tabular.v1.GetSourceData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Whether to include table information
     *
     * @generated from field: bool include_tables = 3;
     */
    includeTables: boolean;
};
/**
 * Describes the message integration.tabular.v1.GetSourceData.
 * Use `create(GetSourceDataSchema)` to create a new message.
 */
export declare const GetSourceDataSchema: GenMessage<GetSourceData>;
/**
 * GetSourceResponse contains source information
 *
 * @generated from message integration.tabular.v1.GetSourceResponse
 */
export type GetSourceResponse = Message<"integration.tabular.v1.GetSourceResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.Source data = 2;
     */
    data: Source[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.GetSourceResponse.
 * Use `create(GetSourceResponseSchema)` to create a new message.
 */
export declare const GetSourceResponseSchema: GenMessage<GetSourceResponse>;
/**
 * ListTablesRequest is a request to list tables in a source
 *
 * @generated from message integration.tabular.v1.ListTablesRequest
 */
export type ListTablesRequest = Message<"integration.tabular.v1.ListTablesRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.ListTablesData data = 1;
     */
    data?: ListTablesData;
};
/**
 * Describes the message integration.tabular.v1.ListTablesRequest.
 * Use `create(ListTablesRequestSchema)` to create a new message.
 */
export declare const ListTablesRequestSchema: GenMessage<ListTablesRequest>;
/**
 * @generated from message integration.tabular.v1.ListTablesData
 */
export type ListTablesData = Message<"integration.tabular.v1.ListTablesData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
};
/**
 * Describes the message integration.tabular.v1.ListTablesData.
 * Use `create(ListTablesDataSchema)` to create a new message.
 */
export declare const ListTablesDataSchema: GenMessage<ListTablesData>;
/**
 * ListTablesResponse contains the list of tables
 *
 * @generated from message integration.tabular.v1.ListTablesResponse
 */
export type ListTablesResponse = Message<"integration.tabular.v1.ListTablesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.Table data = 2;
     */
    data: Table[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.ListTablesResponse.
 * Use `create(ListTablesResponseSchema)` to create a new message.
 */
export declare const ListTablesResponseSchema: GenMessage<ListTablesResponse>;
/**
 * BatchExecuteRequest is a request to execute multiple operations
 *
 * @generated from message integration.tabular.v1.BatchExecuteRequest
 */
export type BatchExecuteRequest = Message<"integration.tabular.v1.BatchExecuteRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.BatchExecuteData data = 1;
     */
    data?: BatchExecuteData;
};
/**
 * Describes the message integration.tabular.v1.BatchExecuteRequest.
 * Use `create(BatchExecuteRequestSchema)` to create a new message.
 */
export declare const BatchExecuteRequestSchema: GenMessage<BatchExecuteRequest>;
/**
 * @generated from message integration.tabular.v1.BatchExecuteData
 */
export type BatchExecuteData = Message<"integration.tabular.v1.BatchExecuteData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Source identifier (e.g., spreadsheet ID, database name)
     *
     * @generated from field: string source_id = 2;
     */
    sourceId: string;
    /**
     * Operations to perform
     *
     * @generated from field: repeated integration.tabular.v1.BatchOperation operations = 3;
     */
    operations: BatchOperation[];
    /**
     * Whether to stop on first error
     *
     * @generated from field: bool fail_fast = 4;
     */
    failFast: boolean;
    /**
     * Whether to execute as a single transaction
     *
     * @generated from field: bool transactional = 5;
     */
    transactional: boolean;
};
/**
 * Describes the message integration.tabular.v1.BatchExecuteData.
 * Use `create(BatchExecuteDataSchema)` to create a new message.
 */
export declare const BatchExecuteDataSchema: GenMessage<BatchExecuteData>;
/**
 * BatchOperation represents a single operation in a batch
 *
 * @generated from message integration.tabular.v1.BatchOperation
 */
export type BatchOperation = Message<"integration.tabular.v1.BatchOperation"> & {
    /**
     * Operation identifier for tracking
     *
     * @generated from field: string operation_id = 1;
     */
    operationId: string;
    /**
     * The operation to perform
     *
     * @generated from oneof integration.tabular.v1.BatchOperation.operation
     */
    operation: {
        /**
         * @generated from field: integration.tabular.v1.WriteRecordsData write = 2;
         */
        value: WriteRecordsData;
        case: "write";
    } | {
        /**
         * @generated from field: integration.tabular.v1.UpdateRecordsData update = 3;
         */
        value: UpdateRecordsData;
        case: "update";
    } | {
        /**
         * @generated from field: integration.tabular.v1.DeleteRecordsData delete = 4;
         */
        value: DeleteRecordsData;
        case: "delete";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message integration.tabular.v1.BatchOperation.
 * Use `create(BatchOperationSchema)` to create a new message.
 */
export declare const BatchOperationSchema: GenMessage<BatchOperation>;
/**
 * BatchExecuteResponse contains the results of batch operations
 *
 * @generated from message integration.tabular.v1.BatchExecuteResponse
 */
export type BatchExecuteResponse = Message<"integration.tabular.v1.BatchExecuteResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.BatchExecuteResult data = 2;
     */
    data: BatchExecuteResult[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.BatchExecuteResponse.
 * Use `create(BatchExecuteResponseSchema)` to create a new message.
 */
export declare const BatchExecuteResponseSchema: GenMessage<BatchExecuteResponse>;
/**
 * @generated from message integration.tabular.v1.BatchExecuteResult
 */
export type BatchExecuteResult = Message<"integration.tabular.v1.BatchExecuteResult"> & {
    /**
     * Number of successful operations
     *
     * @generated from field: int32 success_count = 1;
     */
    successCount: number;
    /**
     * Number of failed operations
     *
     * @generated from field: int32 failure_count = 2;
     */
    failureCount: number;
    /**
     * Results for each operation
     *
     * @generated from field: repeated integration.tabular.v1.BatchOperationResult results = 3;
     */
    results: BatchOperationResult[];
};
/**
 * Describes the message integration.tabular.v1.BatchExecuteResult.
 * Use `create(BatchExecuteResultSchema)` to create a new message.
 */
export declare const BatchExecuteResultSchema: GenMessage<BatchExecuteResult>;
/**
 * BatchOperationResult represents the result of a single batch operation
 *
 * @generated from message integration.tabular.v1.BatchOperationResult
 */
export type BatchOperationResult = Message<"integration.tabular.v1.BatchOperationResult"> & {
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
};
/**
 * Describes the message integration.tabular.v1.BatchOperationResult.
 * Use `create(BatchOperationResultSchema)` to create a new message.
 */
export declare const BatchOperationResultSchema: GenMessage<BatchOperationResult>;
/**
 * CheckHealthRequest is a request to check provider health
 *
 * @generated from message integration.tabular.v1.CheckHealthRequest
 */
export type CheckHealthRequest = Message<"integration.tabular.v1.CheckHealthRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.CheckHealthData data = 1;
     */
    data?: CheckHealthData;
};
/**
 * Describes the message integration.tabular.v1.CheckHealthRequest.
 * Use `create(CheckHealthRequestSchema)` to create a new message.
 */
export declare const CheckHealthRequestSchema: GenMessage<CheckHealthRequest>;
/**
 * @generated from message integration.tabular.v1.CheckHealthData
 */
export type CheckHealthData = Message<"integration.tabular.v1.CheckHealthData"> & {
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
};
/**
 * Describes the message integration.tabular.v1.CheckHealthData.
 * Use `create(CheckHealthDataSchema)` to create a new message.
 */
export declare const CheckHealthDataSchema: GenMessage<CheckHealthData>;
/**
 * CheckHealthResponse contains the health check result
 *
 * @generated from message integration.tabular.v1.CheckHealthResponse
 */
export type CheckHealthResponse = Message<"integration.tabular.v1.CheckHealthResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.HealthStatus data = 2;
     */
    data: HealthStatus[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.CheckHealthResponse.
 * Use `create(CheckHealthResponseSchema)` to create a new message.
 */
export declare const CheckHealthResponseSchema: GenMessage<CheckHealthResponse>;
/**
 * HealthStatus represents the health status of a provider
 *
 * @generated from message integration.tabular.v1.HealthStatus
 */
export type HealthStatus = Message<"integration.tabular.v1.HealthStatus"> & {
    /**
     * Whether the provider is healthy
     *
     * @generated from field: bool is_healthy = 1;
     */
    isHealthy: boolean;
    /**
     * Health status message
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Additional health details
     *
     * @generated from field: map<string, string> details = 3;
     */
    details: {
        [key: string]: string;
    };
};
/**
 * Describes the message integration.tabular.v1.HealthStatus.
 * Use `create(HealthStatusSchema)` to create a new message.
 */
export declare const HealthStatusSchema: GenMessage<HealthStatus>;
/**
 * GetCapabilitiesRequest is a request to get provider capabilities
 *
 * @generated from message integration.tabular.v1.GetCapabilitiesRequest
 */
export type GetCapabilitiesRequest = Message<"integration.tabular.v1.GetCapabilitiesRequest"> & {
    /**
     * @generated from field: integration.tabular.v1.GetCapabilitiesData data = 1;
     */
    data?: GetCapabilitiesData;
};
/**
 * Describes the message integration.tabular.v1.GetCapabilitiesRequest.
 * Use `create(GetCapabilitiesRequestSchema)` to create a new message.
 */
export declare const GetCapabilitiesRequestSchema: GenMessage<GetCapabilitiesRequest>;
/**
 * @generated from message integration.tabular.v1.GetCapabilitiesData
 */
export type GetCapabilitiesData = Message<"integration.tabular.v1.GetCapabilitiesData"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
};
/**
 * Describes the message integration.tabular.v1.GetCapabilitiesData.
 * Use `create(GetCapabilitiesDataSchema)` to create a new message.
 */
export declare const GetCapabilitiesDataSchema: GenMessage<GetCapabilitiesData>;
/**
 * GetCapabilitiesResponse contains the provider's capabilities
 *
 * @generated from message integration.tabular.v1.GetCapabilitiesResponse
 */
export type GetCapabilitiesResponse = Message<"integration.tabular.v1.GetCapabilitiesResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: repeated integration.tabular.v1.ProviderCapabilities data = 2;
     */
    data: ProviderCapabilities[];
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message integration.tabular.v1.GetCapabilitiesResponse.
 * Use `create(GetCapabilitiesResponseSchema)` to create a new message.
 */
export declare const GetCapabilitiesResponseSchema: GenMessage<GetCapabilitiesResponse>;
/**
 * ProviderCapabilities represents the capabilities of a provider
 *
 * @generated from message integration.tabular.v1.ProviderCapabilities
 */
export type ProviderCapabilities = Message<"integration.tabular.v1.ProviderCapabilities"> & {
    /**
     * Provider identifier
     *
     * @generated from field: string provider_id = 1;
     */
    providerId: string;
    /**
     * Provider type
     *
     * @generated from field: integration.tabular.v1.TabularProviderType provider_type = 2;
     */
    providerType: TabularProviderType;
    /**
     * Supported capabilities
     *
     * @generated from field: repeated integration.tabular.v1.TabularCapability capabilities = 3;
     */
    capabilities: TabularCapability[];
    /**
     * Maximum records per request
     *
     * @generated from field: int32 max_records_per_request = 4;
     */
    maxRecordsPerRequest: number;
    /**
     * Maximum fields per record
     *
     * @generated from field: int32 max_fields_per_record = 5;
     */
    maxFieldsPerRecord: number;
    /**
     * Maximum source size in bytes
     *
     * @generated from field: int64 max_source_size_bytes = 6;
     */
    maxSourceSizeBytes: bigint;
};
/**
 * Describes the message integration.tabular.v1.ProviderCapabilities.
 * Use `create(ProviderCapabilitiesSchema)` to create a new message.
 */
export declare const ProviderCapabilitiesSchema: GenMessage<ProviderCapabilities>;
/**
 * TabularDataService provides generic tabular data operations across multiple providers
 * This service defines the contract; the hexagonal architecture adapters
 * implement provider-specific behavior
 *
 * @generated from service integration.tabular.v1.TabularDataService
 */
export declare const TabularDataService: GenService<{
    /**
     * Record Operations
     *
     * @generated from rpc integration.tabular.v1.TabularDataService.ReadRecords
     */
    readRecords: {
        methodKind: "unary";
        input: typeof ReadRecordsRequestSchema;
        output: typeof ReadRecordsResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.WriteRecords
     */
    writeRecords: {
        methodKind: "unary";
        input: typeof WriteRecordsRequestSchema;
        output: typeof WriteRecordsResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.WriteRecordSimple
     */
    writeRecordSimple: {
        methodKind: "unary";
        input: typeof WriteRecordSimpleRequestSchema;
        output: typeof WriteRecordSimpleResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.UpdateRecords
     */
    updateRecords: {
        methodKind: "unary";
        input: typeof UpdateRecordsRequestSchema;
        output: typeof UpdateRecordsResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.DeleteRecords
     */
    deleteRecords: {
        methodKind: "unary";
        input: typeof DeleteRecordsRequestSchema;
        output: typeof DeleteRecordsResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.SearchRecords
     */
    searchRecords: {
        methodKind: "unary";
        input: typeof SearchRecordsRequestSchema;
        output: typeof SearchRecordsResponseSchema;
    };
    /**
     * Schema Operations
     *
     * @generated from rpc integration.tabular.v1.TabularDataService.GetSchema
     */
    getSchema: {
        methodKind: "unary";
        input: typeof GetSchemaRequestSchema;
        output: typeof GetSchemaResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.GetSource
     */
    getSource: {
        methodKind: "unary";
        input: typeof GetSourceRequestSchema;
        output: typeof GetSourceResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.ListTables
     */
    listTables: {
        methodKind: "unary";
        input: typeof ListTablesRequestSchema;
        output: typeof ListTablesResponseSchema;
    };
    /**
     * Batch Operations
     *
     * @generated from rpc integration.tabular.v1.TabularDataService.BatchExecute
     */
    batchExecute: {
        methodKind: "unary";
        input: typeof BatchExecuteRequestSchema;
        output: typeof BatchExecuteResponseSchema;
    };
    /**
     * Health
     *
     * @generated from rpc integration.tabular.v1.TabularDataService.CheckHealth
     */
    checkHealth: {
        methodKind: "unary";
        input: typeof CheckHealthRequestSchema;
        output: typeof CheckHealthResponseSchema;
    };
    /**
     * @generated from rpc integration.tabular.v1.TabularDataService.GetCapabilities
     */
    getCapabilities: {
        methodKind: "unary";
        input: typeof GetCapabilitiesRequestSchema;
        output: typeof GetCapabilitiesResponseSchema;
    };
}>;
