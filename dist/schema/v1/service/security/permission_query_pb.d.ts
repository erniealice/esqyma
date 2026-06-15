import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { PrincipalType } from "../../domain/entity/principal_type/principal_type_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/security/permission_query.proto.
 */
export declare const file_service_security_permission_query: GenFile;
/**
 * @generated from message service.security.v1.GetUserPermissionCodesRequest
 */
export type GetUserPermissionCodesRequest = Message<"service.security.v1.GetUserPermissionCodesRequest"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * BindingKind — which kind of binding the session is currently active as
     * (OPERATOR_OWNER / OPERATOR_STAFF / CLIENT / CLIENT_DELEGATE / SUPPLIER /
     * SUPPLIER_DELEGATE). Sourced from session.principal_type. When
     * UNSPECIFIED the adapter falls back to legacy union-across-all-bindings
     * behaviour for backwards compatibility.
     *
     * @generated from field: domain.entity.v1.PrincipalType binding_kind = 3;
     */
    bindingKind: PrincipalType;
    /**
     * BindingId — the row id of the underlying grant (workspace_user.id /
     * client_portal_grant.id / supplier_portal_grant.id / delegate.id).
     * Sourced from session.principal_id. When empty the adapter falls back
     * to legacy union behaviour.
     *
     * @generated from field: string binding_id = 4;
     */
    bindingId: string;
    /**
     * ActingAsClientId — for delegate principals only, the underlying
     * client_id the delegate is currently acting on behalf of (the
     * delegate_client.client_id row that owns the grant). Sourced from the
     * session row's acting_as_client_id column.
     *
     * REQUIRED when binding_kind == CLIENT_DELEGATE: the adapter scopes
     * grant resolution to the per-target delegate_client row identified by
     * (delegate_id = binding_id, client_id = acting_as_client_id). When
     * empty for a CLIENT_DELEGATE lookup the adapter FAILS CLOSED (returns
     * empty permission set) rather than unioning across all targets — this
     * closes the silent privilege-elevation hole where a delegate with
     * multiple clients in one workspace would receive the union of all
     * per-target grants.
     *
     * IGNORED for non-delegate binding kinds. The acting-as target boundary
     * is the same row that principal_switch.lockTargetBinding locks during
     * session rotation (see apps/service-admin/internal/composition/
     * principal_switch.go), making permission resolution consistent with
     * the existing lock semantics.
     *
     * Added 2026-05-24 per A2-followup (codex red-team A2-P0-1 fix).
     *
     * @generated from field: string acting_as_client_id = 5;
     */
    actingAsClientId: string;
    /**
     * ActingAsSupplierId — symmetric counterpart of acting_as_client_id for
     * SUPPLIER_DELEGATE principals. Sourced from the session row's
     * acting_as_supplier_id column.
     *
     * REQUIRED when binding_kind == SUPPLIER_DELEGATE; absent →
     * fail-closed empty permission set. IGNORED for non-delegate binding
     * kinds. The acting-as target boundary matches
     * principal_switch.lockTargetBinding for SUPPLIER_DELEGATE rotation
     * locking.
     *
     * Added 2026-05-24 per A2-followup (codex red-team A2-P0-1 fix).
     *
     * @generated from field: string acting_as_supplier_id = 6;
     */
    actingAsSupplierId: string;
};
/**
 * Describes the message service.security.v1.GetUserPermissionCodesRequest.
 * Use `create(GetUserPermissionCodesRequestSchema)` to create a new message.
 */
export declare const GetUserPermissionCodesRequestSchema: GenMessage<GetUserPermissionCodesRequest>;
/**
 * @generated from message service.security.v1.GetUserPermissionCodesResponse
 */
export type GetUserPermissionCodesResponse = Message<"service.security.v1.GetUserPermissionCodesResponse"> & {
    /**
     * @generated from field: repeated string permission_codes = 1;
     */
    permissionCodes: string[];
};
/**
 * Describes the message service.security.v1.GetUserPermissionCodesResponse.
 * Use `create(GetUserPermissionCodesResponseSchema)` to create a new message.
 */
export declare const GetUserPermissionCodesResponseSchema: GenMessage<GetUserPermissionCodesResponse>;
