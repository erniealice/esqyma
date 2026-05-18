import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { JournalEntry } from "../journal_entry/journal_entry_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/dashboard/dashboard.proto.
 */
export declare const file_domain_ledger_dashboard_dashboard: GenFile;
/**
 * LedgerStats is the typed stat-card payload. Centavos for monetary values.
 *
 * @generated from message domain.ledger.dashboard.v1.LedgerStats
 */
export type LedgerStats = Message<"domain.ledger.dashboard.v1.LedgerStats"> & {
    /**
     * @generated from field: int64 total_assets = 1;
     */
    totalAssets: bigint;
    /**
     * @generated from field: int64 total_liabilities = 2;
     */
    totalLiabilities: bigint;
    /**
     * @generated from field: int64 total_equity = 3;
     */
    totalEquity: bigint;
    /**
     * @generated from field: int64 net_income_mtd = 4;
     */
    netIncomeMtd: bigint;
    /**
     * @generated from field: int64 unposted_journals = 5;
     */
    unpostedJournals: bigint;
    /**
     * @generated from field: int64 posted_recent_count = 6;
     */
    postedRecentCount: bigint;
};
/**
 * Describes the message domain.ledger.dashboard.v1.LedgerStats.
 * Use `create(LedgerStatsSchema)` to create a new message.
 */
export declare const LedgerStatsSchema: GenMessage<LedgerStats>;
/**
 * GetLedgerDashboardRequest is the request shape.
 *
 * @generated from message domain.ledger.dashboard.v1.GetLedgerDashboardRequest
 */
export type GetLedgerDashboardRequest = Message<"domain.ledger.dashboard.v1.GetLedgerDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * now_millis — unix milliseconds used for time-range stats (e.g. last 30 days).
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 2;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message domain.ledger.dashboard.v1.GetLedgerDashboardRequest.
 * Use `create(GetLedgerDashboardRequestSchema)` to create a new message.
 */
export declare const GetLedgerDashboardRequestSchema: GenMessage<GetLedgerDashboardRequest>;
/**
 * GetLedgerDashboardResponse is the projection the view layer reads.
 *
 * @generated from message domain.ledger.dashboard.v1.GetLedgerDashboardResponse
 */
export type GetLedgerDashboardResponse = Message<"domain.ledger.dashboard.v1.GetLedgerDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: domain.ledger.dashboard.v1.LedgerStats stats = 3;
     */
    stats?: LedgerStats;
    /**
     * balance_by_type keys: asset / liability / equity / revenue / expense
     *
     * @generated from field: map<string, int64> balance_by_type = 4;
     */
    balanceByType: {
        [key: string]: bigint;
    };
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry unposted_top = 5;
     */
    unpostedTop: JournalEntry[];
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry recent_entries = 6;
     */
    recentEntries: JournalEntry[];
};
/**
 * Describes the message domain.ledger.dashboard.v1.GetLedgerDashboardResponse.
 * Use `create(GetLedgerDashboardResponseSchema)` to create a new message.
 */
export declare const GetLedgerDashboardResponseSchema: GenMessage<GetLedgerDashboardResponse>;
