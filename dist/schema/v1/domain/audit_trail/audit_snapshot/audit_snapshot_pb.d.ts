import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/audit_trail/audit_snapshot/audit_snapshot.proto.
 */
export declare const file_domain_audit_trail_audit_snapshot_audit_snapshot: GenFile;
/**
 * AuditSnapshot captures a full entity state at the time of an audit event.
 * Implementation is deferred — schema only.
 *
 * @generated from message domain.audit_trail.v1.AuditSnapshot
 */
export type AuditSnapshot = Message<"domain.audit_trail.v1.AuditSnapshot"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string audit_entry_id = 2;
     */
    auditEntryId: string;
    /**
     * @generated from field: string entity_type = 3;
     */
    entityType: string;
    /**
     * @generated from field: string entity_id = 4;
     */
    entityId: string;
    /**
     * @generated from field: bytes entity_data = 5;
     */
    entityData: Uint8Array;
    /**
     * @generated from field: string schema_version = 6;
     */
    schemaVersion: string;
    /**
     * @generated from field: google.protobuf.Timestamp captured_at = 7;
     */
    capturedAt?: Timestamp;
};
/**
 * Describes the message domain.audit_trail.v1.AuditSnapshot.
 * Use `create(AuditSnapshotSchema)` to create a new message.
 */
export declare const AuditSnapshotSchema: GenMessage<AuditSnapshot>;
