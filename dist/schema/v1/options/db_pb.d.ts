import type { GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { FieldOptions as FieldOptions$1, MessageOptions as MessageOptions$1 } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file options/db.proto.
 */
export declare const file_options_db: GenFile;
/**
 * Field-level database options
 *
 * @generated from message options.v1.FieldOptions
 */
export type FieldOptions = Message<"options.v1.FieldOptions"> & {
    /**
     * Foreign key reference: "table_name.column_name" or just "table_name" (assumes .id)
     *
     * @generated from field: string references = 1;
     */
    references: string;
    /**
     * Mark field as unique
     *
     * @generated from field: bool unique = 2;
     */
    unique: boolean;
    /**
     * Create an index on this field
     *
     * @generated from field: bool index = 3;
     */
    index: boolean;
    /**
     * Default value (as string, will be used as-is in SQL)
     *
     * @generated from field: string default = 4;
     */
    default: string;
    /**
     * Check constraint expression
     *
     * @generated from field: string check = 5;
     */
    check: string;
    /**
     * Override the SQL type (e.g., "VARCHAR(255)" instead of "TEXT")
     *
     * @generated from field: string sql_type = 6;
     */
    sqlType: string;
};
/**
 * Describes the message options.v1.FieldOptions.
 * Use `create(FieldOptionsSchema)` to create a new message.
 */
export declare const FieldOptionsSchema: GenMessage<FieldOptions>;
/**
 * Message-level database options
 *
 * @generated from message options.v1.MessageOptions
 */
export type MessageOptions = Message<"options.v1.MessageOptions"> & {
    /**
     * Mark this message as a database table
     *
     * @generated from field: bool table = 1;
     */
    table: boolean;
    /**
     * Override table name
     *
     * @generated from field: string table_name = 2;
     */
    tableName: string;
    /**
     * Composite unique constraints: ["field1,field2", "field3,field4"]
     *
     * @generated from field: repeated string unique_together = 3;
     */
    uniqueTogether: string[];
    /**
     * Composite indexes: ["field1,field2"]
     *
     * @generated from field: repeated string index_together = 4;
     */
    indexTogether: string[];
};
/**
 * Describes the message options.v1.MessageOptions.
 * Use `create(MessageOptionsSchema)` to create a new message.
 */
export declare const MessageOptionsSchema: GenMessage<MessageOptions>;
/**
 * @generated from extension: options.v1.FieldOptions db = 50000;
 */
export declare const db: GenExtension<FieldOptions$1, FieldOptions>;
/**
 * @generated from extension: options.v1.MessageOptions table = 50001;
 */
export declare const table: GenExtension<MessageOptions$1, MessageOptions>;
