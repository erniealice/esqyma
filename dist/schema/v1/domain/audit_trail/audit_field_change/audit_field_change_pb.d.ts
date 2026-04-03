import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { FieldType } from "../enums/enums_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/audit_trail/audit_field_change/audit_field_change.proto.
 */
export declare const file_domain_audit_trail_audit_field_change_audit_field_change: GenFile;
/**
 * AuditFieldChange records the before/after state of a single field within an audit entry.
 * Note: ListFieldChangesByNameRequest is deferred to V2.
 *
 * @generated from message domain.audit_trail.v1.AuditFieldChange
 */
export type AuditFieldChange = Message<"domain.audit_trail.v1.AuditFieldChange"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string audit_entry_id = 2;
     */
    auditEntryId: string;
    /**
     * @generated from field: string field_name = 3;
     */
    fieldName: string;
    /**
     * @generated from field: domain.audit_trail.v1.FieldType field_type = 4;
     */
    fieldType: FieldType;
    /**
     * @generated from field: string old_value = 5;
     */
    oldValue: string;
    /**
     * @generated from field: string new_value = 6;
     */
    newValue: string;
};
/**
 * Describes the message domain.audit_trail.v1.AuditFieldChange.
 * Use `create(AuditFieldChangeSchema)` to create a new message.
 */
export declare const AuditFieldChangeSchema: GenMessage<AuditFieldChange>;
/**
 * @generated from message domain.audit_trail.v1.ListFieldChangesRequest
 */
export type ListFieldChangesRequest = Message<"domain.audit_trail.v1.ListFieldChangesRequest"> & {
    /**
     * @generated from field: string audit_entry_id = 1;
     */
    auditEntryId: string;
};
/**
 * Describes the message domain.audit_trail.v1.ListFieldChangesRequest.
 * Use `create(ListFieldChangesRequestSchema)` to create a new message.
 */
export declare const ListFieldChangesRequestSchema: GenMessage<ListFieldChangesRequest>;
/**
 * @generated from message domain.audit_trail.v1.ListFieldChangesResponse
 */
export type ListFieldChangesResponse = Message<"domain.audit_trail.v1.ListFieldChangesResponse"> & {
    /**
     * @generated from field: repeated domain.audit_trail.v1.AuditFieldChange changes = 1;
     */
    changes: AuditFieldChange[];
};
/**
 * Describes the message domain.audit_trail.v1.ListFieldChangesResponse.
 * Use `create(ListFieldChangesResponseSchema)` to create a new message.
 */
export declare const ListFieldChangesResponseSchema: GenMessage<ListFieldChangesResponse>;
