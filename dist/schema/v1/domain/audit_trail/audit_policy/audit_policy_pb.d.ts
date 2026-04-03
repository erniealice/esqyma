import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/audit_trail/audit_policy/audit_policy.proto.
 */
export declare const file_domain_audit_trail_audit_policy_audit_policy: GenFile;
/**
 * AuditPolicy configures audit behaviour per entity type within a workspace.
 * Implementation is deferred — schema only.
 *
 * @generated from message domain.audit_trail.v1.AuditPolicy
 */
export type AuditPolicy = Message<"domain.audit_trail.v1.AuditPolicy"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string entity_type = 3;
     */
    entityType: string;
    /**
     * @generated from field: bool enabled = 4;
     */
    enabled: boolean;
    /**
     * @generated from field: bool capture_snapshots = 5;
     */
    captureSnapshots: boolean;
    /**
     * @generated from field: int32 retention_days = 6;
     */
    retentionDays: number;
    /**
     * @generated from field: repeated string excluded_fields = 7;
     */
    excludedFields: string[];
};
/**
 * Describes the message domain.audit_trail.v1.AuditPolicy.
 * Use `create(AuditPolicySchema)` to create a new message.
 */
export declare const AuditPolicySchema: GenMessage<AuditPolicy>;
