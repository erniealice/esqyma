import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
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
