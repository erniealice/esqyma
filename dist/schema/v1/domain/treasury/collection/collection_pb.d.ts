import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../../subscription/subscription/subscription_pb";
import type { CollectionProfileCollectionMethod } from "../collection_profile_collection_method/collection_profile_collection_method_pb";
import type { AdvanceAmortizeOutcome, AdvanceKind, AdvanceProrationPolicy, AdvanceStatus } from "../../common/advance_kind/advance_kind_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/collection/collection.proto.
 */
export declare const file_domain_treasury_collection_collection: GenFile;
/**
 * @generated from message domain.treasury.v1.Collection
 */
export type Collection = Message<"domain.treasury.v1.Collection"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 3;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 5;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string name = 7;
     */
    name: string;
    /**
     * @generated from field: optional domain.subscription.v1.Subscription subscription = 8;
     */
    subscription?: Subscription;
    /**
     * @generated from field: string subscription_id = 9;
     */
    subscriptionId: string;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 10;
     */
    amount: bigint;
    /**
     * @generated from field: string status = 11;
     */
    status: string;
    /**
     * Revenue association (sales payments)
     *
     * FK to revenue table (for sales payments)
     *
     * @generated from field: string revenue_id = 20;
     */
    revenueId: string;
    /**
     * Payment method details
     *
     * Nested collection method object (for display)
     *
     * @generated from field: optional domain.treasury.v1.CollectionProfileCollectionMethod collection_method = 21;
     */
    collectionMethod?: CollectionProfileCollectionMethod;
    /**
     * FK to collection_method table
     *
     * @generated from field: string collection_method_id = 22;
     */
    collectionMethodId: string;
    /**
     * Payment metadata
     *
     * Payment currency (e.g., "PHP")
     *
     * @generated from field: string currency = 23;
     */
    currency: string;
    /**
     * Payment reference (e.g., OR number, transaction ID)
     *
     * @generated from field: string reference_number = 24;
     */
    referenceNumber: string;
    /**
     * Payment timing
     *
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string payment_date = 25;
     */
    paymentDate: string;
    /**
     * Audit fields
     *
     * User ID of person who received payment
     *
     * @generated from field: string received_by = 26;
     */
    receivedBy: string;
    /**
     * Role ID of person who received payment
     *
     * @generated from field: string received_role = 27;
     */
    receivedRole: string;
    /**
     * Collection categorization
     *
     * e.g., "subscription", "sale", "refund"
     *
     * @generated from field: string collection_type = 28;
     */
    collectionType: string;
    /**
     * GL traceability
     *
     * FK to journal_entry — set when collection is posted to ledger
     *
     * @generated from field: optional string journal_entry_id = 30;
     */
    journalEntryId?: string;
    /**
     * FK back-edge — FS-D shared-fund-sources plan (2026-05-17).
     * Links this collection to the FundTransaction (kind=CASH_IN) that was inserted
     * when this payment was deposited into a shared fund source. NULL when the collection
     * is deposited to a regular cash account (no shared-fund involvement).
     *
     * @generated from field: optional string fund_transaction_id = 31;
     */
    fundTransactionId?: string;
    /**
     * --- Advance Cash Events (Plan B, 20260517-advance-cash-events) ---
     * When advance_kind != NONE, this TreasuryCollection IS the advance receipt;
     * Revenue rows draining the advance back-ref this row via revenue.advance_collection_id.
     *
     * @generated from field: optional domain.common.v1.AdvanceKind advance_kind = 32;
     */
    advanceKind?: AdvanceKind;
    /**
     * @generated from field: optional domain.common.v1.AdvanceStatus advance_status = 33;
     */
    advanceStatus?: AdvanceStatus;
    /**
     * ISO 8601 YYYY-MM-DD
     *
     * @generated from field: optional string advance_start_date = 34;
     */
    advanceStartDate?: string;
    /**
     * @generated from field: optional string advance_end_date = 35;
     */
    advanceEndDate?: string;
    /**
     * @generated from field: optional int32 advance_period_count = 36;
     */
    advancePeriodCount?: number;
    /**
     * "day" | "week" | "month" | "year"
     *
     * @generated from field: optional string advance_period_unit = 37;
     */
    advancePeriodUnit?: string;
    /**
     * centavos; snapshot of original advance amount
     *
     * @generated from field: optional int64 advance_total_amount = 38;
     */
    advanceTotalAmount?: bigint;
    /**
     * centavos; decremented by AmortizeAdvanceCollection
     *
     * @generated from field: optional int64 advance_remaining_amount = 39;
     */
    advanceRemainingAmount?: bigint;
    /**
     * centavos; SUM(linked revenue.amount)
     *
     * @generated from field: optional int64 advance_recognized_amount = 40;
     */
    advanceRecognizedAmount?: bigint;
    /**
     * liability (deferred-revenue contra)
     *
     * @generated from field: optional string advance_balance_account_id = 41;
     */
    advanceBalanceAccountId?: string;
    /**
     * revenue account
     *
     * @generated from field: optional string advance_target_account_id = 42;
     */
    advanceTargetAccountId?: string;
    /**
     * optional, v2 — escheat / expiration
     *
     * @generated from field: optional string advance_expiry_date = 43;
     */
    advanceExpiryDate?: string;
    /**
     * TIME_BASED first-tranche; default FULL_TRANCHE
     *
     * @generated from field: optional domain.common.v1.AdvanceProrationPolicy advance_proration_policy = 44;
     */
    advanceProrationPolicy?: AdvanceProrationPolicy;
    /**
     * Plan B Decision B — counterparty FK. Plan-B label "customer_id"; references the
     * existing entydad `client` table since the codebase uses `client` everywhere
     * (revenue.client_id, etc.). NOT a rename — additive.
     *
     * @generated from field: optional string client_id = 45;
     */
    clientId?: string;
};
/**
 * Describes the message domain.treasury.v1.Collection.
 * Use `create(CollectionSchema)` to create a new message.
 */
export declare const CollectionSchema: GenMessage<Collection>;
/**
 * AmortizeAdvanceCollectionRequest — selling-side Plan B Phase 2 amortize.
 *
 * @generated from message domain.treasury.v1.AmortizeAdvanceCollectionRequest
 */
export type AmortizeAdvanceCollectionRequest = Message<"domain.treasury.v1.AmortizeAdvanceCollectionRequest"> & {
    /**
     * @generated from field: string treasury_collection_id = 1;
     */
    treasuryCollectionId: string;
    /**
     * YYYY-MM-DD; defaults to today (UTC) when empty
     *
     * @generated from field: string as_of_date = 2;
     */
    asOfDate: string;
    /**
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
    /**
     * @generated from field: string actor_id = 4;
     */
    actorId: string;
    /**
     * @generated from field: optional string idempotency_key = 5;
     */
    idempotencyKey?: string;
    /**
     * set when invoked from a RevenueRun batch
     *
     * @generated from field: optional string run_id = 6;
     */
    runId?: string;
};
/**
 * Describes the message domain.treasury.v1.AmortizeAdvanceCollectionRequest.
 * Use `create(AmortizeAdvanceCollectionRequestSchema)` to create a new message.
 */
export declare const AmortizeAdvanceCollectionRequestSchema: GenMessage<AmortizeAdvanceCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.AmortizeAdvanceCollectionResponse
 */
export type AmortizeAdvanceCollectionResponse = Message<"domain.treasury.v1.AmortizeAdvanceCollectionResponse"> & {
    /**
     * @generated from field: domain.common.v1.AdvanceAmortizeOutcome outcome = 1;
     */
    outcome: AdvanceAmortizeOutcome;
    /**
     * populated when outcome == CREATED
     *
     * @generated from field: optional string revenue_id = 2;
     */
    revenueId?: string;
    /**
     * populated when outcome == SKIPPED
     *
     * @generated from field: optional string conflicting_revenue_id = 3;
     */
    conflictingRevenueId?: string;
    /**
     * @generated from field: int64 new_remaining_amount = 4;
     */
    newRemainingAmount: bigint;
    /**
     * @generated from field: int64 new_recognized_amount = 5;
     */
    newRecognizedAmount: bigint;
    /**
     * @generated from field: domain.common.v1.AdvanceStatus new_status = 6;
     */
    newStatus: AdvanceStatus;
    /**
     * @generated from field: string tranche_start = 7;
     */
    trancheStart: string;
    /**
     * @generated from field: string tranche_end = 8;
     */
    trancheEnd: string;
    /**
     * @generated from field: int64 tranche_amount = 9;
     */
    trancheAmount: bigint;
    /**
     * @generated from field: optional domain.common.v1.Error error = 10;
     */
    error?: Error;
};
/**
 * Describes the message domain.treasury.v1.AmortizeAdvanceCollectionResponse.
 * Use `create(AmortizeAdvanceCollectionResponseSchema)` to create a new message.
 */
export declare const AmortizeAdvanceCollectionResponseSchema: GenMessage<AmortizeAdvanceCollectionResponse>;
/**
 * SettleUnscheduledAdvanceCollectionRequest — UNSCHEDULED settle (selling side).
 *
 * @generated from message domain.treasury.v1.SettleUnscheduledAdvanceCollectionRequest
 */
export type SettleUnscheduledAdvanceCollectionRequest = Message<"domain.treasury.v1.SettleUnscheduledAdvanceCollectionRequest"> & {
    /**
     * @generated from field: string treasury_collection_id = 1;
     */
    treasuryCollectionId: string;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 2;
     */
    amount: bigint;
    /**
     * @generated from field: string target_account_id = 3;
     */
    targetAccountId: string;
    /**
     * @generated from field: string reason = 4;
     */
    reason: string;
    /**
     * @generated from field: string workspace_id = 5;
     */
    workspaceId: string;
    /**
     * @generated from field: string actor_id = 6;
     */
    actorId: string;
};
/**
 * Describes the message domain.treasury.v1.SettleUnscheduledAdvanceCollectionRequest.
 * Use `create(SettleUnscheduledAdvanceCollectionRequestSchema)` to create a new message.
 */
export declare const SettleUnscheduledAdvanceCollectionRequestSchema: GenMessage<SettleUnscheduledAdvanceCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.SettleUnscheduledAdvanceCollectionResponse
 */
export type SettleUnscheduledAdvanceCollectionResponse = Message<"domain.treasury.v1.SettleUnscheduledAdvanceCollectionResponse"> & {
    /**
     * @generated from field: int64 new_remaining_amount = 1;
     */
    newRemainingAmount: bigint;
    /**
     * @generated from field: int64 new_recognized_amount = 2;
     */
    newRecognizedAmount: bigint;
    /**
     * @generated from field: domain.common.v1.AdvanceStatus new_status = 3;
     */
    newStatus: AdvanceStatus;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.treasury.v1.SettleUnscheduledAdvanceCollectionResponse.
 * Use `create(SettleUnscheduledAdvanceCollectionResponseSchema)` to create a new message.
 */
export declare const SettleUnscheduledAdvanceCollectionResponseSchema: GenMessage<SettleUnscheduledAdvanceCollectionResponse>;
/**
 * RefundUnscheduledAdvanceCollectionRequest — UNSCHEDULED refund (selling side).
 *
 * @generated from message domain.treasury.v1.RefundUnscheduledAdvanceCollectionRequest
 */
export type RefundUnscheduledAdvanceCollectionRequest = Message<"domain.treasury.v1.RefundUnscheduledAdvanceCollectionRequest"> & {
    /**
     * @generated from field: string treasury_collection_id = 1;
     */
    treasuryCollectionId: string;
    /**
     * @generated from field: int64 amount = 2;
     */
    amount: bigint;
    /**
     * @generated from field: string refund_method = 3;
     */
    refundMethod: string;
    /**
     * @generated from field: string destination = 4;
     */
    destination: string;
    /**
     * @generated from field: string reason = 5;
     */
    reason: string;
    /**
     * @generated from field: string workspace_id = 6;
     */
    workspaceId: string;
    /**
     * @generated from field: string actor_id = 7;
     */
    actorId: string;
};
/**
 * Describes the message domain.treasury.v1.RefundUnscheduledAdvanceCollectionRequest.
 * Use `create(RefundUnscheduledAdvanceCollectionRequestSchema)` to create a new message.
 */
export declare const RefundUnscheduledAdvanceCollectionRequestSchema: GenMessage<RefundUnscheduledAdvanceCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.RefundUnscheduledAdvanceCollectionResponse
 */
export type RefundUnscheduledAdvanceCollectionResponse = Message<"domain.treasury.v1.RefundUnscheduledAdvanceCollectionResponse"> & {
    /**
     * @generated from field: int64 new_remaining_amount = 1;
     */
    newRemainingAmount: bigint;
    /**
     * @generated from field: domain.common.v1.AdvanceStatus new_status = 2;
     */
    newStatus: AdvanceStatus;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.treasury.v1.RefundUnscheduledAdvanceCollectionResponse.
 * Use `create(RefundUnscheduledAdvanceCollectionResponseSchema)` to create a new message.
 */
export declare const RefundUnscheduledAdvanceCollectionResponseSchema: GenMessage<RefundUnscheduledAdvanceCollectionResponse>;
/**
 * CancelAdvanceCollectionRequest — flip advance_status to CANCELLED (selling side).
 *
 * @generated from message domain.treasury.v1.CancelAdvanceCollectionRequest
 */
export type CancelAdvanceCollectionRequest = Message<"domain.treasury.v1.CancelAdvanceCollectionRequest"> & {
    /**
     * @generated from field: string treasury_collection_id = 1;
     */
    treasuryCollectionId: string;
    /**
     * @generated from field: string reason = 2;
     */
    reason: string;
    /**
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
    /**
     * @generated from field: string actor_id = 4;
     */
    actorId: string;
};
/**
 * Describes the message domain.treasury.v1.CancelAdvanceCollectionRequest.
 * Use `create(CancelAdvanceCollectionRequestSchema)` to create a new message.
 */
export declare const CancelAdvanceCollectionRequestSchema: GenMessage<CancelAdvanceCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.CancelAdvanceCollectionResponse
 */
export type CancelAdvanceCollectionResponse = Message<"domain.treasury.v1.CancelAdvanceCollectionResponse"> & {
    /**
     * @generated from field: domain.common.v1.AdvanceStatus new_status = 1;
     */
    newStatus: AdvanceStatus;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.treasury.v1.CancelAdvanceCollectionResponse.
 * Use `create(CancelAdvanceCollectionResponseSchema)` to create a new message.
 */
export declare const CancelAdvanceCollectionResponseSchema: GenMessage<CancelAdvanceCollectionResponse>;
/**
 * RecognizeMilestoneAdvanceCollectionRequest — Plan B Phase 7 milestone
 * recognition (selling side). Anchors on a (collection_id, billing_event_id)
 * junction row.
 *
 * @generated from message domain.treasury.v1.RecognizeMilestoneAdvanceCollectionRequest
 */
export type RecognizeMilestoneAdvanceCollectionRequest = Message<"domain.treasury.v1.RecognizeMilestoneAdvanceCollectionRequest"> & {
    /**
     * @generated from field: string treasury_collection_id = 1;
     */
    treasuryCollectionId: string;
    /**
     * @generated from field: string billing_event_id = 2;
     */
    billingEventId: string;
    /**
     * @generated from field: string actor_id = 3;
     */
    actorId: string;
    /**
     * @generated from field: string workspace_id = 4;
     */
    workspaceId: string;
    /**
     * @generated from field: optional string run_id = 5;
     */
    runId?: string;
};
/**
 * Describes the message domain.treasury.v1.RecognizeMilestoneAdvanceCollectionRequest.
 * Use `create(RecognizeMilestoneAdvanceCollectionRequestSchema)` to create a new message.
 */
export declare const RecognizeMilestoneAdvanceCollectionRequestSchema: GenMessage<RecognizeMilestoneAdvanceCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.RecognizeMilestoneAdvanceCollectionResponse
 */
export type RecognizeMilestoneAdvanceCollectionResponse = Message<"domain.treasury.v1.RecognizeMilestoneAdvanceCollectionResponse"> & {
    /**
     * @generated from field: domain.common.v1.AdvanceAmortizeOutcome outcome = 1;
     */
    outcome: AdvanceAmortizeOutcome;
    /**
     * @generated from field: optional string revenue_id = 2;
     */
    revenueId?: string;
    /**
     * @generated from field: optional string conflicting_revenue_id = 3;
     */
    conflictingRevenueId?: string;
    /**
     * @generated from field: int64 new_remaining_amount = 4;
     */
    newRemainingAmount: bigint;
    /**
     * @generated from field: int64 new_recognized_amount = 5;
     */
    newRecognizedAmount: bigint;
    /**
     * @generated from field: domain.common.v1.AdvanceStatus new_status = 6;
     */
    newStatus: AdvanceStatus;
    /**
     * @generated from field: int64 tranche_amount = 7;
     */
    trancheAmount: bigint;
    /**
     * @generated from field: optional domain.common.v1.Error error = 8;
     */
    error?: Error;
};
/**
 * Describes the message domain.treasury.v1.RecognizeMilestoneAdvanceCollectionResponse.
 * Use `create(RecognizeMilestoneAdvanceCollectionResponseSchema)` to create a new message.
 */
export declare const RecognizeMilestoneAdvanceCollectionResponseSchema: GenMessage<RecognizeMilestoneAdvanceCollectionResponse>;
/**
 * @generated from message domain.treasury.v1.ListAdvanceCollectionsForDashboardRequest
 */
export type ListAdvanceCollectionsForDashboardRequest = Message<"domain.treasury.v1.ListAdvanceCollectionsForDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * YYYY-MM-DD; reserved for future filtering
     *
     * @generated from field: string as_of_date = 2;
     */
    asOfDate: string;
};
/**
 * Describes the message domain.treasury.v1.ListAdvanceCollectionsForDashboardRequest.
 * Use `create(ListAdvanceCollectionsForDashboardRequestSchema)` to create a new message.
 */
export declare const ListAdvanceCollectionsForDashboardRequestSchema: GenMessage<ListAdvanceCollectionsForDashboardRequest>;
/**
 * @generated from message domain.treasury.v1.AdvanceCollectionDashboardRow
 */
export type AdvanceCollectionDashboardRow = Message<"domain.treasury.v1.AdvanceCollectionDashboardRow"> & {
    /**
     * @generated from field: string advance_id = 1;
     */
    advanceId: string;
    /**
     * @generated from field: string reference_number = 2;
     */
    referenceNumber: string;
    /**
     * @generated from field: string counterparty_name = 3;
     */
    counterpartyName: string;
    /**
     * @generated from field: domain.common.v1.AdvanceKind kind = 4;
     */
    kind: AdvanceKind;
    /**
     * @generated from field: domain.common.v1.AdvanceStatus status = 5;
     */
    status: AdvanceStatus;
    /**
     * @generated from field: string currency = 6;
     */
    currency: string;
    /**
     * @generated from field: int64 total_amount = 7;
     */
    totalAmount: bigint;
    /**
     * @generated from field: int64 remaining_amount = 8;
     */
    remainingAmount: bigint;
    /**
     * @generated from field: int64 recognized_amount = 9;
     */
    recognizedAmount: bigint;
    /**
     * @generated from field: float utilization_pct = 10;
     */
    utilizationPct: number;
    /**
     * @generated from field: string start_date = 11;
     */
    startDate: string;
    /**
     * @generated from field: string end_date = 12;
     */
    endDate: string;
};
/**
 * Describes the message domain.treasury.v1.AdvanceCollectionDashboardRow.
 * Use `create(AdvanceCollectionDashboardRowSchema)` to create a new message.
 */
export declare const AdvanceCollectionDashboardRowSchema: GenMessage<AdvanceCollectionDashboardRow>;
/**
 * @generated from message domain.treasury.v1.ListAdvanceCollectionsForDashboardResponse
 */
export type ListAdvanceCollectionsForDashboardResponse = Message<"domain.treasury.v1.ListAdvanceCollectionsForDashboardResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.AdvanceCollectionDashboardRow rows = 1;
     */
    rows: AdvanceCollectionDashboardRow[];
    /**
     * @generated from field: int64 total_remaining = 2;
     */
    totalRemaining: bigint;
    /**
     * @generated from field: int32 active_count = 3;
     */
    activeCount: number;
    /**
     * @generated from field: int32 fully_recognized_count = 4;
     */
    fullyRecognizedCount: number;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.treasury.v1.ListAdvanceCollectionsForDashboardResponse.
 * Use `create(ListAdvanceCollectionsForDashboardResponseSchema)` to create a new message.
 */
export declare const ListAdvanceCollectionsForDashboardResponseSchema: GenMessage<ListAdvanceCollectionsForDashboardResponse>;
/**
 * @generated from message domain.treasury.v1.CreateCollectionRequest
 */
export type CreateCollectionRequest = Message<"domain.treasury.v1.CreateCollectionRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.treasury.v1.CreateCollectionRequest.
 * Use `create(CreateCollectionRequestSchema)` to create a new message.
 */
export declare const CreateCollectionRequestSchema: GenMessage<CreateCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.CreateCollectionResponse
 */
export type CreateCollectionResponse = Message<"domain.treasury.v1.CreateCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.treasury.v1.CreateCollectionResponse.
 * Use `create(CreateCollectionResponseSchema)` to create a new message.
 */
export declare const CreateCollectionResponseSchema: GenMessage<CreateCollectionResponse>;
/**
 * @generated from message domain.treasury.v1.ReadCollectionRequest
 */
export type ReadCollectionRequest = Message<"domain.treasury.v1.ReadCollectionRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.treasury.v1.ReadCollectionRequest.
 * Use `create(ReadCollectionRequestSchema)` to create a new message.
 */
export declare const ReadCollectionRequestSchema: GenMessage<ReadCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.ReadCollectionResponse
 */
export type ReadCollectionResponse = Message<"domain.treasury.v1.ReadCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.treasury.v1.ReadCollectionResponse.
 * Use `create(ReadCollectionResponseSchema)` to create a new message.
 */
export declare const ReadCollectionResponseSchema: GenMessage<ReadCollectionResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateCollectionRequest
 */
export type UpdateCollectionRequest = Message<"domain.treasury.v1.UpdateCollectionRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.treasury.v1.UpdateCollectionRequest.
 * Use `create(UpdateCollectionRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionRequestSchema: GenMessage<UpdateCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateCollectionResponse
 */
export type UpdateCollectionResponse = Message<"domain.treasury.v1.UpdateCollectionResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.treasury.v1.UpdateCollectionResponse.
 * Use `create(UpdateCollectionResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionResponseSchema: GenMessage<UpdateCollectionResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteCollectionRequest
 */
export type DeleteCollectionRequest = Message<"domain.treasury.v1.DeleteCollectionRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Collection data = 1;
     */
    data?: Collection;
};
/**
 * Describes the message domain.treasury.v1.DeleteCollectionRequest.
 * Use `create(DeleteCollectionRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionRequestSchema: GenMessage<DeleteCollectionRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteCollectionResponse
 */
export type DeleteCollectionResponse = Message<"domain.treasury.v1.DeleteCollectionResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteCollectionResponse.
 * Use `create(DeleteCollectionResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionResponseSchema: GenMessage<DeleteCollectionResponse>;
/**
 * @generated from message domain.treasury.v1.ListCollectionsRequest
 */
export type ListCollectionsRequest = Message<"domain.treasury.v1.ListCollectionsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListCollectionsRequest.
 * Use `create(ListCollectionsRequestSchema)` to create a new message.
 */
export declare const ListCollectionsRequestSchema: GenMessage<ListCollectionsRequest>;
/**
 * @generated from message domain.treasury.v1.ListCollectionsResponse
 */
export type ListCollectionsResponse = Message<"domain.treasury.v1.ListCollectionsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.treasury.v1.ListCollectionsResponse.
 * Use `create(ListCollectionsResponseSchema)` to create a new message.
 */
export declare const ListCollectionsResponseSchema: GenMessage<ListCollectionsResponse>;
/**
 * @generated from message domain.treasury.v1.GetCollectionListPageDataRequest
 */
export type GetCollectionListPageDataRequest = Message<"domain.treasury.v1.GetCollectionListPageDataRequest"> & {
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.treasury.v1.GetCollectionListPageDataRequest.
 * Use `create(GetCollectionListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionListPageDataRequestSchema: GenMessage<GetCollectionListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetCollectionListPageDataResponse
 */
export type GetCollectionListPageDataResponse = Message<"domain.treasury.v1.GetCollectionListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Collection collection_list = 1;
     */
    collectionList: Collection[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.treasury.v1.GetCollectionListPageDataResponse.
 * Use `create(GetCollectionListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionListPageDataResponseSchema: GenMessage<GetCollectionListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetCollectionItemPageDataRequest
 */
export type GetCollectionItemPageDataRequest = Message<"domain.treasury.v1.GetCollectionItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_id = 1;
     */
    collectionId: string;
};
/**
 * Describes the message domain.treasury.v1.GetCollectionItemPageDataRequest.
 * Use `create(GetCollectionItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionItemPageDataRequestSchema: GenMessage<GetCollectionItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetCollectionItemPageDataResponse
 */
export type GetCollectionItemPageDataResponse = Message<"domain.treasury.v1.GetCollectionItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.Collection collection = 1;
     */
    collection?: Collection;
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
 * Describes the message domain.treasury.v1.GetCollectionItemPageDataResponse.
 * Use `create(GetCollectionItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionItemPageDataResponseSchema: GenMessage<GetCollectionItemPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.ListByClientRequest
 */
export type ListByClientRequest = Message<"domain.treasury.v1.ListByClientRequest"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
};
/**
 * Describes the message domain.treasury.v1.ListByClientRequest.
 * Use `create(ListByClientRequestSchema)` to create a new message.
 */
export declare const ListByClientRequestSchema: GenMessage<ListByClientRequest>;
/**
 * @generated from message domain.treasury.v1.ListByClientResponse
 */
export type ListByClientResponse = Message<"domain.treasury.v1.ListByClientResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Collection data = 1;
     */
    data: Collection[];
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
 * Describes the message domain.treasury.v1.ListByClientResponse.
 * Use `create(ListByClientResponseSchema)` to create a new message.
 */
export declare const ListByClientResponseSchema: GenMessage<ListByClientResponse>;
/**
 * @generated from service domain.treasury.v1.CollectionDomainService
 */
export declare const CollectionDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.CreateCollection
     */
    createCollection: {
        methodKind: "unary";
        input: typeof CreateCollectionRequestSchema;
        output: typeof CreateCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.ReadCollection
     */
    readCollection: {
        methodKind: "unary";
        input: typeof ReadCollectionRequestSchema;
        output: typeof ReadCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.UpdateCollection
     */
    updateCollection: {
        methodKind: "unary";
        input: typeof UpdateCollectionRequestSchema;
        output: typeof UpdateCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.DeleteCollection
     */
    deleteCollection: {
        methodKind: "unary";
        input: typeof DeleteCollectionRequestSchema;
        output: typeof DeleteCollectionResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.ListCollections
     */
    listCollections: {
        methodKind: "unary";
        input: typeof ListCollectionsRequestSchema;
        output: typeof ListCollectionsResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.GetCollectionListPageData
     */
    getCollectionListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionListPageDataRequestSchema;
        output: typeof GetCollectionListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.GetCollectionItemPageData
     */
    getCollectionItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionItemPageDataRequestSchema;
        output: typeof GetCollectionItemPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.CollectionDomainService.ListByClient
     */
    listByClient: {
        methodKind: "unary";
        input: typeof ListByClientRequestSchema;
        output: typeof ListByClientResponseSchema;
    };
}>;
