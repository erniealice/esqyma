import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { ActorType, AuditAction } from "../enums/enums_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/audit_trail/audit_entry/audit_entry.proto.
 */
export declare const file_domain_audit_trail_audit_entry_audit_entry: GenFile;
/**
 * AuditEntry records a single audited operation against an entity.
 *
 * @generated from message domain.audit_trail.v1.AuditEntry
 */
export type AuditEntry = Message<"domain.audit_trail.v1.AuditEntry"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Actor information
     *
     * @generated from field: string actor_id = 3;
     */
    actorId: string;
    /**
     * @generated from field: domain.audit_trail.v1.ActorType actor_type = 4;
     */
    actorType: ActorType;
    /**
     * @generated from field: string actor_ip = 5;
     */
    actorIp: string;
    /**
     * @generated from field: string actor_user_agent = 6;
     */
    actorUserAgent: string;
    /**
     * Target entity
     *
     * @generated from field: string entity_type = 7;
     */
    entityType: string;
    /**
     * @generated from field: string entity_id = 8;
     */
    entityId: string;
    /**
     * @generated from field: string domain = 9;
     */
    domain: string;
    /**
     * @generated from field: domain.audit_trail.v1.AuditAction action = 10;
     */
    action: AuditAction;
    /**
     * Operation context
     *
     * @generated from field: string permission_code = 11;
     */
    permissionCode: string;
    /**
     * @generated from field: string use_case = 12;
     */
    useCase: string;
    /**
     * @generated from field: string reason = 13;
     */
    reason: string;
    /**
     * @generated from field: string method_name = 14;
     */
    methodName: string;
    /**
     * Request tracing
     *
     * @generated from field: string request_id = 15;
     */
    requestId: string;
    /**
     * @generated from field: int64 transaction_id = 16;
     */
    transactionId: bigint;
    /**
     * @generated from field: int32 field_count = 17;
     */
    fieldCount: number;
    /**
     * @generated from field: google.protobuf.Timestamp occurred_at = 18;
     */
    occurredAt?: Timestamp;
};
/**
 * Describes the message domain.audit_trail.v1.AuditEntry.
 * Use `create(AuditEntrySchema)` to create a new message.
 */
export declare const AuditEntrySchema: GenMessage<AuditEntry>;
/**
 * @generated from message domain.audit_trail.v1.ListAuditEntriesRequest
 */
export type ListAuditEntriesRequest = Message<"domain.audit_trail.v1.ListAuditEntriesRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * @generated from field: string entity_type = 2;
     */
    entityType: string;
    /**
     * @generated from field: string entity_id = 3;
     */
    entityId: string;
    /**
     * Filters
     *
     * @generated from field: string actor_id = 4;
     */
    actorId: string;
    /**
     * @generated from field: string domain_filter = 5;
     */
    domainFilter: string;
    /**
     * @generated from field: domain.audit_trail.v1.AuditAction action = 6;
     */
    action: AuditAction;
    /**
     * @generated from field: string permission_code = 7;
     */
    permissionCode: string;
    /**
     * @generated from field: string use_case = 8;
     */
    useCase: string;
    /**
     * @generated from field: string field_name = 9;
     */
    fieldName: string;
    /**
     * Date range
     *
     * @generated from field: google.protobuf.Timestamp from = 10;
     */
    from?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp to = 11;
     */
    to?: Timestamp;
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 12;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.audit_trail.v1.ListAuditEntriesRequest.
 * Use `create(ListAuditEntriesRequestSchema)` to create a new message.
 */
export declare const ListAuditEntriesRequestSchema: GenMessage<ListAuditEntriesRequest>;
/**
 * @generated from message domain.audit_trail.v1.ListAuditEntriesResponse
 */
export type ListAuditEntriesResponse = Message<"domain.audit_trail.v1.ListAuditEntriesResponse"> & {
    /**
     * @generated from field: repeated domain.audit_trail.v1.AuditEntry entries = 1;
     */
    entries: AuditEntry[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
};
/**
 * Describes the message domain.audit_trail.v1.ListAuditEntriesResponse.
 * Use `create(ListAuditEntriesResponseSchema)` to create a new message.
 */
export declare const ListAuditEntriesResponseSchema: GenMessage<ListAuditEntriesResponse>;
