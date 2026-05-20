import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
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
