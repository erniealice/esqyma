import type { GenEnum, GenExtension, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
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
    /**
     * Exclude from the persisted column set: computed/display-only mirror of another field.
     *
     * @generated from field: bool ignore = 7;
     */
    ignore: boolean;
    /**
     * Referential action for this foreign key. Only meaningful together with
     * `references`. Leave unset for the repository default (ON DELETE NO ACTION);
     * set a value only alongside a comment justifying the exception.
     *
     * @generated from field: options.v1.OnDeleteAction on_delete = 8;
     */
    onDelete: OnDeleteAction;
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
 * Referential action applied when a referenced (parent) row is deleted.
 *
 * REPOSITORY POLICY: every foreign key in this schema is ON DELETE NO ACTION.
 * Deletion order and dependent-row cleanup belong to the use-case layer, not to
 * the database, so an unannotated FK field is the desired steady state and
 * generators must still emit an explicit `ON DELETE NO ACTION` clause for it.
 *
 * Any value other than NO ACTION is an exception: it requires an explicit
 * on_delete annotation on the field AND a comment justifying why the database
 * must own the delete behaviour for that edge.
 *
 * @generated from enum options.v1.OnDeleteAction
 */
export declare enum OnDeleteAction {
    /**
     * Not annotated. Resolves to the repository default policy: NO ACTION.
     *
     * @generated from enum value: ON_DELETE_ACTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * NO ACTION — reject the parent delete while dependent rows exist, checked at
     * the end of the statement. The repository default.
     *
     * @generated from enum value: ON_DELETE_ACTION_NO_ACTION = 1;
     */
    NO_ACTION = 1,
    /**
     * RESTRICT — reject the parent delete immediately, non-deferrable.
     * Exception: requires a justification comment on the annotated field.
     *
     * @generated from enum value: ON_DELETE_ACTION_RESTRICT = 2;
     */
    RESTRICT = 2,
    /**
     * CASCADE — delete dependent rows with the parent.
     * Exception: requires a justification comment on the annotated field.
     *
     * @generated from enum value: ON_DELETE_ACTION_CASCADE = 3;
     */
    CASCADE = 3,
    /**
     * SET NULL — null the referencing column; the column must be nullable.
     * Exception: requires a justification comment on the annotated field.
     *
     * @generated from enum value: ON_DELETE_ACTION_SET_NULL = 4;
     */
    SET_NULL = 4
}
/**
 * Describes the enum options.v1.OnDeleteAction.
 */
export declare const OnDeleteActionSchema: GenEnum<OnDeleteAction>;
/**
 * @generated from extension: options.v1.FieldOptions db = 50000;
 */
export declare const db: GenExtension<FieldOptions$1, FieldOptions>;
/**
 * @generated from extension: options.v1.MessageOptions table = 50001;
 */
export declare const table: GenExtension<MessageOptions$1, MessageOptions>;
