// Database annotation options for esqyma protos.
//
// These annotations are the schema contract. Table/column shape, foreign keys,
// indexes, uniqueness, defaults, checks, and referential actions are declared
// here and consumed by cmd/generate-ddl (full DDL) and cmd/protocheck (the
// drift draft behind `pnpm db:drift-draft`).
//
// Entity id convention
//   Every entity's primary key is `string id = 1` and materialises as a
//   postgres TEXT column holding a uuid string. The uuid VERSION is
//   deliberately NOT a schema or proto concern: ids are minted by the
//   application's configured id provider (CONFIG_ID_PROVIDER=uuidv7
//   today) and entity tables carry no uuid DEFAULT. Do not introduce a uuid
//   column type, a DB-side uuid default, or a version-specific annotation for
//   entity ids — swapping the generator must stay a runtime decision that
//   requires no migration.
//
// Foreign key convention
//   All foreign keys are ON DELETE NO ACTION. See OnDeleteAction below; any
//   other referential action is an annotated, justified exception.
import { enumDesc, extDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv2";
import { file_google_protobuf_descriptor } from "@bufbuild/protobuf/wkt";
/**
 * Describes the file options/db.proto.
 */
export const file_options_db = /*@__PURE__*/ fileDesc("ChBvcHRpb25zL2RiLnByb3RvEgpvcHRpb25zLnYxIrIBCgxGaWVsZE9wdGlvbnMSEgoKcmVmZXJlbmNlcxgBIAEoCRIOCgZ1bmlxdWUYAiABKAgSDQoFaW5kZXgYAyABKAgSDwoHZGVmYXVsdBgEIAEoCRINCgVjaGVjaxgFIAEoCRIQCghzcWxfdHlwZRgGIAEoCRIOCgZpZ25vcmUYByABKAgSLQoJb25fZGVsZXRlGAggASgOMhoub3B0aW9ucy52MS5PbkRlbGV0ZUFjdGlvbiJkCg5NZXNzYWdlT3B0aW9ucxINCgV0YWJsZRgBIAEoCBISCgp0YWJsZV9uYW1lGAIgASgJEhcKD3VuaXF1ZV90b2dldGhlchgDIAMoCRIWCg5pbmRleF90b2dldGhlchgEIAMoCSquAQoOT25EZWxldGVBY3Rpb24SIAocT05fREVMRVRFX0FDVElPTl9VTlNQRUNJRklFRBAAEh4KGk9OX0RFTEVURV9BQ1RJT05fTk9fQUNUSU9OEAESHQoZT05fREVMRVRFX0FDVElPTl9SRVNUUklDVBACEhwKGE9OX0RFTEVURV9BQ1RJT05fQ0FTQ0FERRADEh0KGU9OX0RFTEVURV9BQ1RJT05fU0VUX05VTEwQBDpJCgJkYhIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMY0IYDIAEoCzIYLm9wdGlvbnMudjEuRmllbGRPcHRpb25zUgJkYjpTCgV0YWJsZRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxjRhgMgASgLMhoub3B0aW9ucy52MS5NZXNzYWdlT3B0aW9uc1IFdGFibGVCoAEKDmNvbS5vcHRpb25zLnYxQgdEYlByb3RvUAFaPGdpdGh1Yi5jb20vZXJuaWVhbGljZS9lc3F5bWEvcGtnL3NjaGVtYS92MS9vcHRpb25zO29wdGlvbnN2MaICA09YWKoCCk9wdGlvbnMuVjHKAgpPcHRpb25zXFYx4gIWT3B0aW9uc1xWMVxHUEJNZXRhZGF0YeoCC09wdGlvbnM6OlYxYgZwcm90bzM", [file_google_protobuf_descriptor]);
/**
 * Describes the message options.v1.FieldOptions.
 * Use `create(FieldOptionsSchema)` to create a new message.
 */
export const FieldOptionsSchema = /*@__PURE__*/ messageDesc(file_options_db, 0);
/**
 * Describes the message options.v1.MessageOptions.
 * Use `create(MessageOptionsSchema)` to create a new message.
 */
export const MessageOptionsSchema = /*@__PURE__*/ messageDesc(file_options_db, 1);
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
export var OnDeleteAction;
(function (OnDeleteAction) {
    /**
     * Not annotated. Resolves to the repository default policy: NO ACTION.
     *
     * @generated from enum value: ON_DELETE_ACTION_UNSPECIFIED = 0;
     */
    OnDeleteAction[OnDeleteAction["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * NO ACTION — reject the parent delete while dependent rows exist, checked at
     * the end of the statement. The repository default.
     *
     * @generated from enum value: ON_DELETE_ACTION_NO_ACTION = 1;
     */
    OnDeleteAction[OnDeleteAction["NO_ACTION"] = 1] = "NO_ACTION";
    /**
     * RESTRICT — reject the parent delete immediately, non-deferrable.
     * Exception: requires a justification comment on the annotated field.
     *
     * @generated from enum value: ON_DELETE_ACTION_RESTRICT = 2;
     */
    OnDeleteAction[OnDeleteAction["RESTRICT"] = 2] = "RESTRICT";
    /**
     * CASCADE — delete dependent rows with the parent.
     * Exception: requires a justification comment on the annotated field.
     *
     * @generated from enum value: ON_DELETE_ACTION_CASCADE = 3;
     */
    OnDeleteAction[OnDeleteAction["CASCADE"] = 3] = "CASCADE";
    /**
     * SET NULL — null the referencing column; the column must be nullable.
     * Exception: requires a justification comment on the annotated field.
     *
     * @generated from enum value: ON_DELETE_ACTION_SET_NULL = 4;
     */
    OnDeleteAction[OnDeleteAction["SET_NULL"] = 4] = "SET_NULL";
})(OnDeleteAction || (OnDeleteAction = {}));
/**
 * Describes the enum options.v1.OnDeleteAction.
 */
export const OnDeleteActionSchema = /*@__PURE__*/ enumDesc(file_options_db, 0);
/**
 * @generated from extension: options.v1.FieldOptions db = 50000;
 */
export const db = /*@__PURE__*/ extDesc(file_options_db, 0);
/**
 * @generated from extension: options.v1.MessageOptions table = 50001;
 */
export const table = /*@__PURE__*/ extDesc(file_options_db, 1);
