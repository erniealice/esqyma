import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { PrincipalType } from "../../domain/entity/principal_type/principal_type_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/auth/session.proto.
 */
export declare const file_service_auth_session: GenFile;
/**
 * @generated from message service.auth.v1.AuthenticateSessionRequest
 */
export type AuthenticateSessionRequest = Message<"service.auth.v1.AuthenticateSessionRequest"> & {
    /**
     * @generated from field: string token = 1;
     */
    token: string;
};
/**
 * Describes the message service.auth.v1.AuthenticateSessionRequest.
 * Use `create(AuthenticateSessionRequestSchema)` to create a new message.
 */
export declare const AuthenticateSessionRequestSchema: GenMessage<AuthenticateSessionRequest>;
/**
 * @generated from message service.auth.v1.AuthIdentity
 */
export type AuthIdentity = Message<"service.auth.v1.AuthIdentity"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from field: string email = 2;
     */
    email: string;
    /**
     * @generated from field: string workspace_user_id = 3;
     */
    workspaceUserId: string;
    /**
     * @generated from field: string workspace_id = 4;
     */
    workspaceId: string;
    /**
     * @generated from field: string token = 5;
     */
    token: string;
    /**
     * @generated from field: int64 expires_at_unix_ms = 6;
     */
    expiresAtUnixMs: bigint;
};
/**
 * Describes the message service.auth.v1.AuthIdentity.
 * Use `create(AuthIdentitySchema)` to create a new message.
 */
export declare const AuthIdentitySchema: GenMessage<AuthIdentity>;
/**
 * @generated from message service.auth.v1.AuthenticateSessionResponse
 */
export type AuthenticateSessionResponse = Message<"service.auth.v1.AuthenticateSessionResponse"> & {
    /**
     * @generated from field: service.auth.v1.AuthIdentity identity = 1;
     */
    identity?: AuthIdentity;
};
/**
 * Describes the message service.auth.v1.AuthenticateSessionResponse.
 * Use `create(AuthenticateSessionResponseSchema)` to create a new message.
 */
export declare const AuthenticateSessionResponseSchema: GenMessage<AuthenticateSessionResponse>;
/**
 * @generated from message service.auth.v1.IssueSessionRequest
 */
export type IssueSessionRequest = Message<"service.auth.v1.IssueSessionRequest"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from field: string workspace_user_id = 2;
     */
    workspaceUserId: string;
    /**
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
};
/**
 * Describes the message service.auth.v1.IssueSessionRequest.
 * Use `create(IssueSessionRequestSchema)` to create a new message.
 */
export declare const IssueSessionRequestSchema: GenMessage<IssueSessionRequest>;
/**
 * @generated from message service.auth.v1.IssueSessionResponse
 */
export type IssueSessionResponse = Message<"service.auth.v1.IssueSessionResponse"> & {
    /**
     * @generated from field: string token = 1;
     */
    token: string;
    /**
     * @generated from field: string session_id = 2;
     */
    sessionId: string;
    /**
     * @generated from field: int64 expires_at_unix_ms = 3;
     */
    expiresAtUnixMs: bigint;
    /**
     * @generated from field: string workspace_user_id = 4;
     */
    workspaceUserId: string;
    /**
     * @generated from field: string workspace_id = 5;
     */
    workspaceId: string;
};
/**
 * Describes the message service.auth.v1.IssueSessionResponse.
 * Use `create(IssueSessionResponseSchema)` to create a new message.
 */
export declare const IssueSessionResponseSchema: GenMessage<IssueSessionResponse>;
/**
 * @generated from message service.auth.v1.InvalidateSessionRequest
 */
export type InvalidateSessionRequest = Message<"service.auth.v1.InvalidateSessionRequest"> & {
    /**
     * Exactly one of token or session_id must be populated.
     *
     * @generated from field: string token = 1;
     */
    token: string;
    /**
     * @generated from field: string session_id = 2;
     */
    sessionId: string;
};
/**
 * Describes the message service.auth.v1.InvalidateSessionRequest.
 * Use `create(InvalidateSessionRequestSchema)` to create a new message.
 */
export declare const InvalidateSessionRequestSchema: GenMessage<InvalidateSessionRequest>;
/**
 * @generated from message service.auth.v1.InvalidateSessionResponse
 */
export type InvalidateSessionResponse = Message<"service.auth.v1.InvalidateSessionResponse"> & {
    /**
     * @generated from field: bool invalidated = 1;
     */
    invalidated: boolean;
};
/**
 * Describes the message service.auth.v1.InvalidateSessionResponse.
 * Use `create(InvalidateSessionResponseSchema)` to create a new message.
 */
export declare const InvalidateSessionResponseSchema: GenMessage<InvalidateSessionResponse>;
/**
 * @generated from message service.auth.v1.ActingAsTarget
 */
export type ActingAsTarget = Message<"service.auth.v1.ActingAsTarget"> & {
    /**
     * underlying party id (client_id or supplier_id)
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * workspace the party lives in
     *
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string display_name = 3;
     */
    displayName: string;
};
/**
 * Describes the message service.auth.v1.ActingAsTarget.
 * Use `create(ActingAsTargetSchema)` to create a new message.
 */
export declare const ActingAsTargetSchema: GenMessage<ActingAsTarget>;
/**
 * @generated from message service.auth.v1.Principal
 */
export type Principal = Message<"service.auth.v1.Principal"> & {
    /**
     * @generated from field: domain.entity.v1.PrincipalType type = 1;
     */
    type: PrincipalType;
    /**
     * @generated from field: string principal_id = 2;
     */
    principalId: string;
    /**
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
    /**
     * @generated from field: string display_name = 4;
     */
    displayName: string;
    /**
     * @generated from field: repeated service.auth.v1.ActingAsTarget acting_as_targets = 5;
     */
    actingAsTargets: ActingAsTarget[];
};
/**
 * Describes the message service.auth.v1.Principal.
 * Use `create(PrincipalSchema)` to create a new message.
 */
export declare const PrincipalSchema: GenMessage<Principal>;
/**
 * @generated from message service.auth.v1.SwitchPrincipalRequest
 */
export type SwitchPrincipalRequest = Message<"service.auth.v1.SwitchPrincipalRequest"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
    /**
     * current cookie token; empty at first-login
     *
     * @generated from field: string token = 2;
     */
    token: string;
    /**
     * @generated from field: service.auth.v1.Principal target_principal = 3;
     */
    targetPrincipal?: Principal;
    /**
     * optional override for delegate-of-N>1
     *
     * @generated from field: string acting_as_client_id = 4;
     */
    actingAsClientId: string;
    /**
     * optional override
     *
     * @generated from field: string acting_as_supplier_id = 5;
     */
    actingAsSupplierId: string;
    /**
     * audit row use_case tag
     *
     * @generated from field: service.auth.v1.SwitchUseCase use_case = 6;
     */
    useCase: SwitchUseCase;
    /**
     * Forensic metadata (folded into audit reason text — A5 red-team finding X-2)
     *
     * @generated from field: string request_url = 7;
     */
    requestUrl: string;
    /**
     * @generated from field: string referer = 8;
     */
    referer: string;
    /**
     * @generated from field: string sec_fetch_site = 9;
     */
    secFetchSite: string;
    /**
     * @generated from field: string user_agent = 10;
     */
    userAgent: string;
    /**
     * URL-driven vs explicit-form. Used by deriveSwitchUseCase when use_case is UNSPECIFIED.
     *
     * @generated from field: bool url_driven = 11;
     */
    urlDriven: boolean;
    /**
     * RequireAudit: rolls back the rotation if audit insert fails (red-team A-4).
     *
     * @generated from field: bool require_audit = 12;
     */
    requireAudit: boolean;
};
/**
 * Describes the message service.auth.v1.SwitchPrincipalRequest.
 * Use `create(SwitchPrincipalRequestSchema)` to create a new message.
 */
export declare const SwitchPrincipalRequestSchema: GenMessage<SwitchPrincipalRequest>;
/**
 * @generated from message service.auth.v1.SwitchPrincipalResponse
 */
export type SwitchPrincipalResponse = Message<"service.auth.v1.SwitchPrincipalResponse"> & {
    /**
     * NewToken is non-empty when rotation occurred and the handler must
     * SetSessionCookie. Empty means in-place mutation (cookie unchanged).
     *
     * @generated from field: string new_token = 1;
     */
    newToken: string;
    /**
     * RedirectURL the handler should redirect to.
     *
     * @generated from field: string redirect_url = 2;
     */
    redirectUrl: string;
};
/**
 * Describes the message service.auth.v1.SwitchPrincipalResponse.
 * Use `create(SwitchPrincipalResponseSchema)` to create a new message.
 */
export declare const SwitchPrincipalResponseSchema: GenMessage<SwitchPrincipalResponse>;
/**
 * @generated from message service.auth.v1.ResolvePrincipalsRequest
 */
export type ResolvePrincipalsRequest = Message<"service.auth.v1.ResolvePrincipalsRequest"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
};
/**
 * Describes the message service.auth.v1.ResolvePrincipalsRequest.
 * Use `create(ResolvePrincipalsRequestSchema)` to create a new message.
 */
export declare const ResolvePrincipalsRequestSchema: GenMessage<ResolvePrincipalsRequest>;
/**
 * @generated from message service.auth.v1.ResolvePrincipalsResponse
 */
export type ResolvePrincipalsResponse = Message<"service.auth.v1.ResolvePrincipalsResponse"> & {
    /**
     * @generated from field: repeated service.auth.v1.Principal principals = 1;
     */
    principals: Principal[];
};
/**
 * Describes the message service.auth.v1.ResolvePrincipalsResponse.
 * Use `create(ResolvePrincipalsResponseSchema)` to create a new message.
 */
export declare const ResolvePrincipalsResponseSchema: GenMessage<ResolvePrincipalsResponse>;
/**
 * EnumerateBindingsInWorkspace — enumerate every active binding a user holds
 * in a specific workspace. Used by ResolveBindingInWorkspace to build the
 * candidate list before pickBindingForSession applies the A3 resolution policy.
 *
 * @generated from message service.auth.v1.EnumerateBindingsRequest
 */
export type EnumerateBindingsRequest = Message<"service.auth.v1.EnumerateBindingsRequest"> & {
    /**
     * @generated from field: string user_id = 1;
     */
    userId: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
};
/**
 * Describes the message service.auth.v1.EnumerateBindingsRequest.
 * Use `create(EnumerateBindingsRequestSchema)` to create a new message.
 */
export declare const EnumerateBindingsRequestSchema: GenMessage<EnumerateBindingsRequest>;
/**
 * @generated from message service.auth.v1.EnumerateBindingsResponse
 */
export type EnumerateBindingsResponse = Message<"service.auth.v1.EnumerateBindingsResponse"> & {
    /**
     * @generated from field: repeated service.auth.v1.Principal bindings = 1;
     */
    bindings: Principal[];
};
/**
 * Describes the message service.auth.v1.EnumerateBindingsResponse.
 * Use `create(EnumerateBindingsResponseSchema)` to create a new message.
 */
export declare const EnumerateBindingsResponseSchema: GenMessage<EnumerateBindingsResponse>;
/**
 * LookupSessionPrincipal — read (principal_type, principal_id, acting_as_*)
 * from the session row by token. Replaces composition/session_principal.go's
 * raw-SQL lookupSessionPrincipalFull.
 *
 * @generated from message service.auth.v1.LookupSessionPrincipalRequest
 */
export type LookupSessionPrincipalRequest = Message<"service.auth.v1.LookupSessionPrincipalRequest"> & {
    /**
     * @generated from field: string token = 1;
     */
    token: string;
};
/**
 * Describes the message service.auth.v1.LookupSessionPrincipalRequest.
 * Use `create(LookupSessionPrincipalRequestSchema)` to create a new message.
 */
export declare const LookupSessionPrincipalRequestSchema: GenMessage<LookupSessionPrincipalRequest>;
/**
 * @generated from message service.auth.v1.LookupSessionPrincipalResponse
 */
export type LookupSessionPrincipalResponse = Message<"service.auth.v1.LookupSessionPrincipalResponse"> & {
    /**
     * @generated from field: domain.entity.v1.PrincipalType kind = 1;
     */
    kind: PrincipalType;
    /**
     * @generated from field: string principal_id = 2;
     */
    principalId: string;
    /**
     * @generated from field: string acting_as_client_id = 3;
     */
    actingAsClientId: string;
    /**
     * @generated from field: string acting_as_supplier_id = 4;
     */
    actingAsSupplierId: string;
};
/**
 * Describes the message service.auth.v1.LookupSessionPrincipalResponse.
 * Use `create(LookupSessionPrincipalResponseSchema)` to create a new message.
 */
export declare const LookupSessionPrincipalResponseSchema: GenMessage<LookupSessionPrincipalResponse>;
/**
 * @generated from enum service.auth.v1.SwitchUseCase
 */
export declare enum SwitchUseCase {
    /**
     * @generated from enum value: SWITCH_USE_CASE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * URL-driven cross-workspace rotation (Q-WS-13)
     *
     * @generated from enum value: SWITCH_USE_CASE_URL_ROTATE = 1;
     */
    URL_ROTATE = 1,
    /**
     * URL-driven same-workspace acting-as change
     *
     * @generated from enum value: SWITCH_USE_CASE_URL_ACTING_AS_INPLACE = 2;
     */
    URL_ACTING_AS_INPLACE = 2,
    /**
     * URL-driven same-workspace principal_type change (rare)
     *
     * @generated from enum value: SWITCH_USE_CASE_URL_PRINCIPAL_INPLACE = 3;
     */
    URL_PRINCIPAL_INPLACE = 3,
    /**
     * Form-driven cross-workspace via /action/auth/switch-principal
     *
     * @generated from enum value: SWITCH_USE_CASE_EXPLICIT_ROTATE = 4;
     */
    EXPLICIT_ROTATE = 4,
    /**
     * Form-driven same-workspace principal_type change (Mutual co-op)
     *
     * @generated from enum value: SWITCH_USE_CASE_EXPLICIT_INPLACE = 5;
     */
    EXPLICIT_INPLACE = 5,
    /**
     * Form-driven same-workspace acting-as change
     *
     * @generated from enum value: SWITCH_USE_CASE_EXPLICIT_ACTING_AS = 6;
     */
    EXPLICIT_ACTING_AS = 6
}
/**
 * Describes the enum service.auth.v1.SwitchUseCase.
 */
export declare const SwitchUseCaseSchema: GenEnum<SwitchUseCase>;
