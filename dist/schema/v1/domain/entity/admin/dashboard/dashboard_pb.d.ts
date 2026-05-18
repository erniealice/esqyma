import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { WorkspaceUserRole } from "../../workspace_user_role/workspace_user_role_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/admin/dashboard/dashboard.proto.
 */
export declare const file_domain_entity_admin_dashboard_dashboard: GenFile;
/**
 * AdminStats are the four stat cards: Workspace Users / Roles / Permissions
 * / Recent Role Changes (7d).
 *
 * @generated from message domain.entity.admin.dashboard.v1.AdminStats
 */
export type AdminStats = Message<"domain.entity.admin.dashboard.v1.AdminStats"> & {
    /**
     * @generated from field: int64 workspace_users = 1;
     */
    workspaceUsers: bigint;
    /**
     * @generated from field: int64 roles = 2;
     */
    roles: bigint;
    /**
     * @generated from field: int64 permissions = 3;
     */
    permissions: bigint;
    /**
     * @generated from field: int64 recent_role_changes7d = 4;
     */
    recentRoleChanges7d: bigint;
};
/**
 * Describes the message domain.entity.admin.dashboard.v1.AdminStats.
 * Use `create(AdminStatsSchema)` to create a new message.
 */
export declare const AdminStatsSchema: GenMessage<AdminStats>;
/**
 * RolePermissionCount is one row of the "roles by permission count" table widget.
 *
 * @generated from message domain.entity.admin.dashboard.v1.RolePermissionCount
 */
export type RolePermissionCount = Message<"domain.entity.admin.dashboard.v1.RolePermissionCount"> & {
    /**
     * @generated from field: string role_id = 1;
     */
    roleId: string;
    /**
     * @generated from field: string role_name = 2;
     */
    roleName: string;
    /**
     * @generated from field: int64 permission_count = 3;
     */
    permissionCount: bigint;
};
/**
 * Describes the message domain.entity.admin.dashboard.v1.RolePermissionCount.
 * Use `create(RolePermissionCountSchema)` to create a new message.
 */
export declare const RolePermissionCountSchema: GenMessage<RolePermissionCount>;
/**
 * GetAdminDashboardRequest is the input for the admin dashboard use case.
 *
 * @generated from message domain.entity.admin.dashboard.v1.GetAdminDashboardRequest
 */
export type GetAdminDashboardRequest = Message<"domain.entity.admin.dashboard.v1.GetAdminDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis is used for time-relative stats (e.g. 7-day activity counts).
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message domain.entity.admin.dashboard.v1.GetAdminDashboardRequest.
 * Use `create(GetAdminDashboardRequestSchema)` to create a new message.
 */
export declare const GetAdminDashboardRequestSchema: GenMessage<GetAdminDashboardRequest>;
/**
 * GetAdminDashboardResponse is the projected aggregate set the view layer renders.
 *
 * @generated from message domain.entity.admin.dashboard.v1.GetAdminDashboardResponse
 */
export type GetAdminDashboardResponse = Message<"domain.entity.admin.dashboard.v1.GetAdminDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: domain.entity.admin.dashboard.v1.AdminStats stats = 3;
     */
    stats?: AdminStats;
    /**
     * @generated from field: map<string, int64> users_per_role = 4;
     */
    usersPerRole: {
        [key: string]: bigint;
    };
    /**
     * @generated from field: repeated domain.entity.admin.dashboard.v1.RolePermissionCount top_roles_by_perms = 5;
     */
    topRolesByPerms: RolePermissionCount[];
    /**
     * @generated from field: repeated domain.entity.v1.WorkspaceUserRole recent_assignments = 6;
     */
    recentAssignments: WorkspaceUserRole[];
};
/**
 * Describes the message domain.entity.admin.dashboard.v1.GetAdminDashboardResponse.
 * Use `create(GetAdminDashboardResponseSchema)` to create a new message.
 */
export declare const GetAdminDashboardResponseSchema: GenMessage<GetAdminDashboardResponse>;
