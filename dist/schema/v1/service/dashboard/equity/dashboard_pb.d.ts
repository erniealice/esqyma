import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { EquityTransaction } from "../../../domain/ledger/equity_transaction/equity_transaction_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/equity/dashboard.proto.
 */
export declare const file_service_dashboard_equity_dashboard: GenFile;
/**
 * EquityStats are the four stat values for the dashboard. Centavos.
 *
 * @generated from message service.dashboard.equity.v1.EquityStats
 */
export type EquityStats = Message<"service.dashboard.equity.v1.EquityStats"> & {
    /**
     * @generated from field: int64 total_contributed = 1;
     */
    totalContributed: bigint;
    /**
     * @generated from field: int64 active_owners = 2;
     */
    activeOwners: bigint;
    /**
     * @generated from field: int64 distributions_ytd = 3;
     */
    distributionsYtd: bigint;
    /**
     * @generated from field: int64 net_movement_ytd = 4;
     */
    netMovementYtd: bigint;
};
/**
 * Describes the message service.dashboard.equity.v1.EquityStats.
 * Use `create(EquityStatsSchema)` to create a new message.
 */
export declare const EquityStatsSchema: GenMessage<EquityStats>;
/**
 * EquityAccountSlice mirrors the equity_account row shape for dashboard widgets.
 *
 * @generated from message service.dashboard.equity.v1.EquityAccountSlice
 */
export type EquityAccountSlice = Message<"service.dashboard.equity.v1.EquityAccountSlice"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string owner_name = 3;
     */
    ownerName: string;
    /**
     * @generated from field: string account_type = 4;
     */
    accountType: string;
    /**
     * centavos
     *
     * @generated from field: int64 balance = 5;
     */
    balance: bigint;
};
/**
 * Describes the message service.dashboard.equity.v1.EquityAccountSlice.
 * Use `create(EquityAccountSliceSchema)` to create a new message.
 */
export declare const EquityAccountSliceSchema: GenMessage<EquityAccountSlice>;
/**
 * GetEquityDashboardRequest is the request shape.
 *
 * @generated from message service.dashboard.equity.v1.GetEquityDashboardRequest
 */
export type GetEquityDashboardRequest = Message<"service.dashboard.equity.v1.GetEquityDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for YTD calculations.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.equity.v1.GetEquityDashboardRequest.
 * Use `create(GetEquityDashboardRequestSchema)` to create a new message.
 */
export declare const GetEquityDashboardRequestSchema: GenMessage<GetEquityDashboardRequest>;
/**
 * GetEquityDashboardResponse is the view-layer projection.
 *
 * @generated from message service.dashboard.equity.v1.GetEquityDashboardResponse
 */
export type GetEquityDashboardResponse = Message<"service.dashboard.equity.v1.GetEquityDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.equity.v1.EquityStats stats = 3;
     */
    stats?: EquityStats;
    /**
     * by_type_ytd keys: contribution / withdrawal / distribution / transfer
     *
     * @generated from field: map<string, int64> by_type_ytd = 4;
     */
    byTypeYtd: {
        [key: string]: bigint;
    };
    /**
     * @generated from field: repeated service.dashboard.equity.v1.EquityAccountSlice top_contributors = 5;
     */
    topContributors: EquityAccountSlice[];
    /**
     * @generated from field: repeated domain.ledger.v1.EquityTransaction recent = 6;
     */
    recent: EquityTransaction[];
};
/**
 * Describes the message service.dashboard.equity.v1.GetEquityDashboardResponse.
 * Use `create(GetEquityDashboardResponseSchema)` to create a new message.
 */
export declare const GetEquityDashboardResponseSchema: GenMessage<GetEquityDashboardResponse>;
