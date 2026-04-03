import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file domain/audit_trail/enums/enums.proto.
 */
export declare const file_domain_audit_trail_enums_enums: GenFile;
/**
 * AuditAction represents the type of change recorded in an audit entry.
 * Note: monetary values use INT64 (cent-level storage) — no DECIMAL type.
 *
 * @generated from enum domain.audit_trail.v1.AuditAction
 */
export declare enum AuditAction {
    /**
     * @generated from enum value: AUDIT_ACTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: AUDIT_ACTION_INSERT = 1;
     */
    INSERT = 1,
    /**
     * @generated from enum value: AUDIT_ACTION_UPDATE = 2;
     */
    UPDATE = 2,
    /**
     * @generated from enum value: AUDIT_ACTION_DELETE = 3;
     */
    DELETE = 3,
    /**
     * @generated from enum value: AUDIT_ACTION_RESTORE = 4;
     */
    RESTORE = 4,
    /**
     * @generated from enum value: AUDIT_ACTION_ARCHIVE = 5;
     */
    ARCHIVE = 5
}
/**
 * Describes the enum domain.audit_trail.v1.AuditAction.
 */
export declare const AuditActionSchema: GenEnum<AuditAction>;
/**
 * ActorType identifies what kind of actor performed the audited action.
 *
 * @generated from enum domain.audit_trail.v1.ActorType
 */
export declare enum ActorType {
    /**
     * @generated from enum value: ACTOR_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACTOR_TYPE_USER = 1;
     */
    USER = 1,
    /**
     * @generated from enum value: ACTOR_TYPE_SYSTEM = 2;
     */
    SYSTEM = 2,
    /**
     * @generated from enum value: ACTOR_TYPE_API_KEY = 3;
     */
    API_KEY = 3,
    /**
     * @generated from enum value: ACTOR_TYPE_SCHEDULER = 4;
     */
    SCHEDULER = 4,
    /**
     * @generated from enum value: ACTOR_TYPE_MIGRATION = 5;
     */
    MIGRATION = 5
}
/**
 * Describes the enum domain.audit_trail.v1.ActorType.
 */
export declare const ActorTypeSchema: GenEnum<ActorType>;
/**
 * FieldType describes the data type of a changed field.
 * Note: no DECIMAL type — monetary values use FIELD_TYPE_INT64 (cent-level storage).
 *
 * @generated from enum domain.audit_trail.v1.FieldType
 */
export declare enum FieldType {
    /**
     * @generated from enum value: FIELD_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FIELD_TYPE_STRING = 1;
     */
    STRING = 1,
    /**
     * @generated from enum value: FIELD_TYPE_INT64 = 2;
     */
    INT64 = 2,
    /**
     * @generated from enum value: FIELD_TYPE_BOOL = 3;
     */
    BOOL = 3,
    /**
     * @generated from enum value: FIELD_TYPE_TIMESTAMP = 4;
     */
    TIMESTAMP = 4,
    /**
     * @generated from enum value: FIELD_TYPE_UUID = 5;
     */
    UUID = 5,
    /**
     * @generated from enum value: FIELD_TYPE_ENUM = 6;
     */
    ENUM = 6,
    /**
     * @generated from enum value: FIELD_TYPE_TEXT = 7;
     */
    TEXT = 7
}
/**
 * Describes the enum domain.audit_trail.v1.FieldType.
 */
export declare const FieldTypeSchema: GenEnum<FieldType>;
