import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../domain/common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/audit/audit_query.proto.
 */
export declare const file_service_audit_audit_query: GenFile;
/**
 * @generated from message service.audit.v1.ListAuditEntriesRequest
 */
export type ListAuditEntriesRequest = Message<"service.audit.v1.ListAuditEntriesRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * e.g. "client", "treasury_collection"
     *
     * @generated from field: string entity_type = 2;
     */
    entityType: string;
    /**
     * @generated from field: string entity_id = 3;
     */
    entityId: string;
    /**
     * @generated from field: int32 limit = 4;
     */
    limit: number;
    /**
     * @generated from field: string cursor_token = 5;
     */
    cursorToken: string;
};
/**
 * Describes the message service.audit.v1.ListAuditEntriesRequest.
 * Use `create(ListAuditEntriesRequestSchema)` to create a new message.
 */
export declare const ListAuditEntriesRequestSchema: GenMessage<ListAuditEntriesRequest>;
/**
 * @generated from message service.audit.v1.AuditFieldChange
 */
export type AuditFieldChange = Message<"service.audit.v1.AuditFieldChange"> & {
    /**
     * @generated from field: string field_name = 1;
     */
    fieldName: string;
    /**
     * @generated from field: int32 field_type = 2;
     */
    fieldType: number;
    /**
     * @generated from field: string old_value = 3;
     */
    oldValue: string;
    /**
     * @generated from field: string new_value = 4;
     */
    newValue: string;
};
/**
 * Describes the message service.audit.v1.AuditFieldChange.
 * Use `create(AuditFieldChangeSchema)` to create a new message.
 */
export declare const AuditFieldChangeSchema: GenMessage<AuditFieldChange>;
/**
 * @generated from message service.audit.v1.AuditEntry
 */
export type AuditEntry = Message<"service.audit.v1.AuditEntry"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string actor_id = 2;
     */
    actorId: string;
    /**
     * @generated from field: int32 actor_type = 3;
     */
    actorType: number;
    /**
     * @generated from field: int32 action = 4;
     */
    action: number;
    /**
     * @generated from field: string permission_code = 5;
     */
    permissionCode: string;
    /**
     * @generated from field: string use_case = 6;
     */
    useCase: string;
    /**
     * @generated from field: int32 field_count = 7;
     */
    fieldCount: number;
    /**
     * @generated from field: string occurred_at = 8;
     */
    occurredAt: string;
    /**
     * @generated from field: repeated service.audit.v1.AuditFieldChange field_changes = 9;
     */
    fieldChanges: AuditFieldChange[];
};
/**
 * Describes the message service.audit.v1.AuditEntry.
 * Use `create(AuditEntrySchema)` to create a new message.
 */
export declare const AuditEntrySchema: GenMessage<AuditEntry>;
/**
 * @generated from message service.audit.v1.ListAuditEntriesResponse
 */
export type ListAuditEntriesResponse = Message<"service.audit.v1.ListAuditEntriesResponse"> & {
    /**
     * @generated from field: repeated service.audit.v1.AuditEntry entries = 1;
     */
    entries: AuditEntry[];
    /**
     * @generated from field: bool has_next = 2;
     */
    hasNext: boolean;
    /**
     * @generated from field: string next_cursor = 3;
     */
    nextCursor: string;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message service.audit.v1.ListAuditEntriesResponse.
 * Use `create(ListAuditEntriesResponseSchema)` to create a new message.
 */
export declare const ListAuditEntriesResponseSchema: GenMessage<ListAuditEntriesResponse>;
