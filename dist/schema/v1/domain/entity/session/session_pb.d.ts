import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/session/session.proto.
 */
export declare const file_domain_entity_session_session: GenFile;
/**
 * Session represents an authenticated user's active session.
 * Issued by the password auth provider after a successful login; the opaque
 * token is stored in the cookie and presented on each request.
 *
 * The same row shape is used by Postgres (session table), Firestore
 * (session_v1 collection), and the mock in-memory store.
 *
 * @generated from message domain.entity.v1.Session
 */
export type Session = Message<"domain.entity.v1.Session"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string user_id = 2;
     */
    userId: string;
    /**
     * @generated from field: string token = 3;
     */
    token: string;
    /**
     * Workspace context resolved at login time — nullable for users who have
     * not yet joined a workspace.
     *
     * @generated from field: optional string workspace_user_id = 4;
     */
    workspaceUserId?: string;
    /**
     * @generated from field: optional string workspace_id = 5;
     */
    workspaceId?: string;
    /**
     * Session lifetime — unix milliseconds since epoch. The adapter layer is
     * responsible for any backend-specific type conversion.
     *
     * @generated from field: int64 expires_at = 6;
     */
    expiresAt: bigint;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * Standard timestamp metadata — matches the rest of the entity domain.
     *
     * @generated from field: optional int64 date_created = 8;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 9;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 10;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 11;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.entity.v1.Session.
 * Use `create(SessionSchema)` to create a new message.
 */
export declare const SessionSchema: GenMessage<Session>;
/**
 * @generated from message domain.entity.v1.CreateSessionRequest
 */
export type CreateSessionRequest = Message<"domain.entity.v1.CreateSessionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Session data = 1;
     */
    data?: Session;
};
/**
 * Describes the message domain.entity.v1.CreateSessionRequest.
 * Use `create(CreateSessionRequestSchema)` to create a new message.
 */
export declare const CreateSessionRequestSchema: GenMessage<CreateSessionRequest>;
/**
 * @generated from message domain.entity.v1.CreateSessionResponse
 */
export type CreateSessionResponse = Message<"domain.entity.v1.CreateSessionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Session data = 1;
     */
    data: Session[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.CreateSessionResponse.
 * Use `create(CreateSessionResponseSchema)` to create a new message.
 */
export declare const CreateSessionResponseSchema: GenMessage<CreateSessionResponse>;
/**
 * @generated from message domain.entity.v1.ReadSessionRequest
 */
export type ReadSessionRequest = Message<"domain.entity.v1.ReadSessionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Session data = 1;
     */
    data?: Session;
};
/**
 * Describes the message domain.entity.v1.ReadSessionRequest.
 * Use `create(ReadSessionRequestSchema)` to create a new message.
 */
export declare const ReadSessionRequestSchema: GenMessage<ReadSessionRequest>;
/**
 * @generated from message domain.entity.v1.ReadSessionResponse
 */
export type ReadSessionResponse = Message<"domain.entity.v1.ReadSessionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Session data = 1;
     */
    data: Session[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.ReadSessionResponse.
 * Use `create(ReadSessionResponseSchema)` to create a new message.
 */
export declare const ReadSessionResponseSchema: GenMessage<ReadSessionResponse>;
/**
 * @generated from message domain.entity.v1.UpdateSessionRequest
 */
export type UpdateSessionRequest = Message<"domain.entity.v1.UpdateSessionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Session data = 1;
     */
    data?: Session;
};
/**
 * Describes the message domain.entity.v1.UpdateSessionRequest.
 * Use `create(UpdateSessionRequestSchema)` to create a new message.
 */
export declare const UpdateSessionRequestSchema: GenMessage<UpdateSessionRequest>;
/**
 * @generated from message domain.entity.v1.UpdateSessionResponse
 */
export type UpdateSessionResponse = Message<"domain.entity.v1.UpdateSessionResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Session data = 1;
     */
    data: Session[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.UpdateSessionResponse.
 * Use `create(UpdateSessionResponseSchema)` to create a new message.
 */
export declare const UpdateSessionResponseSchema: GenMessage<UpdateSessionResponse>;
/**
 * @generated from message domain.entity.v1.DeleteSessionRequest
 */
export type DeleteSessionRequest = Message<"domain.entity.v1.DeleteSessionRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Session data = 1;
     */
    data?: Session;
};
/**
 * Describes the message domain.entity.v1.DeleteSessionRequest.
 * Use `create(DeleteSessionRequestSchema)` to create a new message.
 */
export declare const DeleteSessionRequestSchema: GenMessage<DeleteSessionRequest>;
/**
 * @generated from message domain.entity.v1.DeleteSessionResponse
 */
export type DeleteSessionResponse = Message<"domain.entity.v1.DeleteSessionResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.DeleteSessionResponse.
 * Use `create(DeleteSessionResponseSchema)` to create a new message.
 */
export declare const DeleteSessionResponseSchema: GenMessage<DeleteSessionResponse>;
/**
 * @generated from message domain.entity.v1.ListSessionsRequest
 */
export type ListSessionsRequest = Message<"domain.entity.v1.ListSessionsRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 1;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 4;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.entity.v1.ListSessionsRequest.
 * Use `create(ListSessionsRequestSchema)` to create a new message.
 */
export declare const ListSessionsRequestSchema: GenMessage<ListSessionsRequest>;
/**
 * @generated from message domain.entity.v1.ListSessionsResponse
 */
export type ListSessionsResponse = Message<"domain.entity.v1.ListSessionsResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Session data = 1;
     */
    data: Session[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.entity.v1.ListSessionsResponse.
 * Use `create(ListSessionsResponseSchema)` to create a new message.
 */
export declare const ListSessionsResponseSchema: GenMessage<ListSessionsResponse>;
/**
 * @generated from service domain.entity.v1.SessionDomainService
 */
export declare const SessionDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SessionDomainService.CreateSession
     */
    createSession: {
        methodKind: "unary";
        input: typeof CreateSessionRequestSchema;
        output: typeof CreateSessionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SessionDomainService.ReadSession
     */
    readSession: {
        methodKind: "unary";
        input: typeof ReadSessionRequestSchema;
        output: typeof ReadSessionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SessionDomainService.UpdateSession
     */
    updateSession: {
        methodKind: "unary";
        input: typeof UpdateSessionRequestSchema;
        output: typeof UpdateSessionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SessionDomainService.DeleteSession
     */
    deleteSession: {
        methodKind: "unary";
        input: typeof DeleteSessionRequestSchema;
        output: typeof DeleteSessionResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SessionDomainService.ListSessions
     */
    listSessions: {
        methodKind: "unary";
        input: typeof ListSessionsRequestSchema;
        output: typeof ListSessionsResponseSchema;
    };
}>;
