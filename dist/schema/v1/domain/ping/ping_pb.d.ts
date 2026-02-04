import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../common/error_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ping/ping.proto.
 */
export declare const file_domain_ping_ping: GenFile;
/**
 * @generated from message domain.ping.v1.Ping
 */
export type Ping = Message<"domain.ping.v1.Ping"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
};
/**
 * Describes the message domain.ping.v1.Ping.
 * Use `create(PingSchema)` to create a new message.
 */
export declare const PingSchema: GenMessage<Ping>;
/**
 * @generated from message domain.ping.v1.SayPingRequest
 */
export type SayPingRequest = Message<"domain.ping.v1.SayPingRequest"> & {
    /**
     * @generated from field: domain.ping.v1.Ping data = 1;
     */
    data?: Ping;
};
/**
 * Describes the message domain.ping.v1.SayPingRequest.
 * Use `create(SayPingRequestSchema)` to create a new message.
 */
export declare const SayPingRequestSchema: GenMessage<SayPingRequest>;
/**
 * @generated from message domain.ping.v1.SayPingResponse
 */
export type SayPingResponse = Message<"domain.ping.v1.SayPingResponse"> & {
    /**
     * @generated from field: repeated domain.ping.v1.Ping data = 1;
     */
    data: Ping[];
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
 * Describes the message domain.ping.v1.SayPingResponse.
 * Use `create(SayPingResponseSchema)` to create a new message.
 */
export declare const SayPingResponseSchema: GenMessage<SayPingResponse>;
/**
 * @generated from message domain.ping.v1.CreatePingRequest
 */
export type CreatePingRequest = Message<"domain.ping.v1.CreatePingRequest"> & {
    /**
     * @generated from field: domain.ping.v1.Ping data = 1;
     */
    data?: Ping;
};
/**
 * Describes the message domain.ping.v1.CreatePingRequest.
 * Use `create(CreatePingRequestSchema)` to create a new message.
 */
export declare const CreatePingRequestSchema: GenMessage<CreatePingRequest>;
/**
 * @generated from message domain.ping.v1.CreatePingResponse
 */
export type CreatePingResponse = Message<"domain.ping.v1.CreatePingResponse"> & {
    /**
     * @generated from field: repeated domain.ping.v1.Ping data = 1;
     */
    data: Ping[];
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
 * Describes the message domain.ping.v1.CreatePingResponse.
 * Use `create(CreatePingResponseSchema)` to create a new message.
 */
export declare const CreatePingResponseSchema: GenMessage<CreatePingResponse>;
/**
 * @generated from message domain.ping.v1.ReadPingRequest
 */
export type ReadPingRequest = Message<"domain.ping.v1.ReadPingRequest"> & {
    /**
     * @generated from field: domain.ping.v1.Ping data = 1;
     */
    data?: Ping;
};
/**
 * Describes the message domain.ping.v1.ReadPingRequest.
 * Use `create(ReadPingRequestSchema)` to create a new message.
 */
export declare const ReadPingRequestSchema: GenMessage<ReadPingRequest>;
/**
 * @generated from message domain.ping.v1.ReadPingResponse
 */
export type ReadPingResponse = Message<"domain.ping.v1.ReadPingResponse"> & {
    /**
     * @generated from field: repeated domain.ping.v1.Ping data = 1;
     */
    data: Ping[];
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
 * Describes the message domain.ping.v1.ReadPingResponse.
 * Use `create(ReadPingResponseSchema)` to create a new message.
 */
export declare const ReadPingResponseSchema: GenMessage<ReadPingResponse>;
/**
 * @generated from message domain.ping.v1.UpdatePingRequest
 */
export type UpdatePingRequest = Message<"domain.ping.v1.UpdatePingRequest"> & {
    /**
     * @generated from field: domain.ping.v1.Ping data = 1;
     */
    data?: Ping;
};
/**
 * Describes the message domain.ping.v1.UpdatePingRequest.
 * Use `create(UpdatePingRequestSchema)` to create a new message.
 */
export declare const UpdatePingRequestSchema: GenMessage<UpdatePingRequest>;
/**
 * @generated from message domain.ping.v1.UpdatePingResponse
 */
export type UpdatePingResponse = Message<"domain.ping.v1.UpdatePingResponse"> & {
    /**
     * @generated from field: repeated domain.ping.v1.Ping data = 1;
     */
    data: Ping[];
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
 * Describes the message domain.ping.v1.UpdatePingResponse.
 * Use `create(UpdatePingResponseSchema)` to create a new message.
 */
export declare const UpdatePingResponseSchema: GenMessage<UpdatePingResponse>;
/**
 * @generated from message domain.ping.v1.DeletePingRequest
 */
export type DeletePingRequest = Message<"domain.ping.v1.DeletePingRequest"> & {
    /**
     * @generated from field: domain.ping.v1.Ping data = 1;
     */
    data?: Ping;
};
/**
 * Describes the message domain.ping.v1.DeletePingRequest.
 * Use `create(DeletePingRequestSchema)` to create a new message.
 */
export declare const DeletePingRequestSchema: GenMessage<DeletePingRequest>;
/**
 * @generated from message domain.ping.v1.DeletePingResponse
 */
export type DeletePingResponse = Message<"domain.ping.v1.DeletePingResponse"> & {
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
 * Describes the message domain.ping.v1.DeletePingResponse.
 * Use `create(DeletePingResponseSchema)` to create a new message.
 */
export declare const DeletePingResponseSchema: GenMessage<DeletePingResponse>;
/**
 * @generated from message domain.ping.v1.ListPingsRequest
 */
export type ListPingsRequest = Message<"domain.ping.v1.ListPingsRequest"> & {};
/**
 * Describes the message domain.ping.v1.ListPingsRequest.
 * Use `create(ListPingsRequestSchema)` to create a new message.
 */
export declare const ListPingsRequestSchema: GenMessage<ListPingsRequest>;
/**
 * @generated from message domain.ping.v1.ListPingsResponse
 */
export type ListPingsResponse = Message<"domain.ping.v1.ListPingsResponse"> & {
    /**
     * @generated from field: repeated domain.ping.v1.Ping data = 1;
     */
    data: Ping[];
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
 * Describes the message domain.ping.v1.ListPingsResponse.
 * Use `create(ListPingsResponseSchema)` to create a new message.
 */
export declare const ListPingsResponseSchema: GenMessage<ListPingsResponse>;
/**
 * @generated from service domain.ping.v1.PingDomainService
 */
export declare const PingDomainService: GenService<{
    /**
     * @generated from rpc domain.ping.v1.PingDomainService.CreatePing
     */
    createPing: {
        methodKind: "unary";
        input: typeof CreatePingRequestSchema;
        output: typeof CreatePingResponseSchema;
    };
    /**
     * @generated from rpc domain.ping.v1.PingDomainService.ReadPing
     */
    readPing: {
        methodKind: "unary";
        input: typeof ReadPingRequestSchema;
        output: typeof ReadPingResponseSchema;
    };
    /**
     * @generated from rpc domain.ping.v1.PingDomainService.UpdatePing
     */
    updatePing: {
        methodKind: "unary";
        input: typeof UpdatePingRequestSchema;
        output: typeof UpdatePingResponseSchema;
    };
    /**
     * @generated from rpc domain.ping.v1.PingDomainService.DeletePing
     */
    deletePing: {
        methodKind: "unary";
        input: typeof DeletePingRequestSchema;
        output: typeof DeletePingResponseSchema;
    };
    /**
     * @generated from rpc domain.ping.v1.PingDomainService.ListPings
     */
    listPings: {
        methodKind: "unary";
        input: typeof ListPingsRequestSchema;
        output: typeof ListPingsResponseSchema;
    };
    /**
     * @generated from rpc domain.ping.v1.PingDomainService.SayPing
     */
    sayPing: {
        methodKind: "unary";
        input: typeof SayPingRequestSchema;
        output: typeof SayPingResponseSchema;
    };
}>;
