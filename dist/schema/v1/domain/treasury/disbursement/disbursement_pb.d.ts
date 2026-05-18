import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../../subscription/subscription/subscription_pb";
import type { AdvanceAmortizeOutcome, AdvanceKind, AdvanceProrationPolicy, AdvanceStatus } from "../../common/advance_kind/advance_kind_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/disbursement/disbursement.proto.
 */
export declare const file_domain_treasury_disbursement_disbursement: GenFile;
/**
 * @generated from message domain.treasury.v1.Disbursement
 */
export type Disbursement = Message<"domain.treasury.v1.Disbursement"> & {
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
     * --- expenditure-related fields ---
     *
     * FK to expenditure table
     *
     * @generated from field: string expenditure_id = 20;
     */
    expenditureId: string;
    /**
     * "purchase", "expense", "subscription_refund"
     *
     * @generated from field: string disbursement_type = 21;
     */
    disbursementType: string;
    /**
     * FK to disbursement_method
     *
     * @generated from field: string disbursement_method_id = 22;
     */
    disbursementMethodId: string;
    /**
     * @generated from field: string currency = 23;
     */
    currency: string;
    /**
     * @generated from field: string reference_number = 24;
     */
    referenceNumber: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string payment_date = 25;
     */
    paymentDate: string;
    /**
     * who authorized the outflow
     *
     * @generated from field: string approved_by = 26;
     */
    approvedBy: string;
    /**
     * GL traceability
     *
     * FK to journal_entry — set when disbursement is posted to ledger
     *
     * @generated from field: optional string journal_entry_id = 28;
     */
    journalEntryId?: string;
    /**
     * FK back-edge — FS-D shared-fund-sources plan (2026-05-17).
     * Links this disbursement to the FundTransaction (kind=SETTLEMENT) that was inserted
     * when outstanding draws were settled from this workspace's cash. NULL when the disbursement
     * is a direct cash outflow with no shared-fund involvement.
     *
     * @generated from field: optional string fund_transaction_id = 29;
     */
    fundTransactionId?: string;
    /**
     * --- Advance Cash Events (Plan B, 20260517-advance-cash-events) ---
     * When advance_kind != NONE, this TreasuryDisbursement IS the advance payment;
     * ExpenseRecognition rows draining the advance back-ref via expense_recognition.advance_disbursement_id.
     *
     * @generated from field: optional domain.common.v1.AdvanceKind advance_kind = 30;
     */
    advanceKind?: AdvanceKind;
    /**
     * @generated from field: optional domain.common.v1.AdvanceStatus advance_status = 31;
     */
    advanceStatus?: AdvanceStatus;
    /**
     * ISO 8601 YYYY-MM-DD
     *
     * @generated from field: optional string advance_start_date = 32;
     */
    advanceStartDate?: string;
    /**
     * @generated from field: optional string advance_end_date = 33;
     */
    advanceEndDate?: string;
    /**
     * @generated from field: optional int32 advance_period_count = 34;
     */
    advancePeriodCount?: number;
    /**
     * "day" | "week" | "month" | "year"
     *
     * @generated from field: optional string advance_period_unit = 35;
     */
    advancePeriodUnit?: string;
    /**
     * centavos; snapshot of original advance amount
     *
     * @generated from field: optional int64 advance_total_amount = 36;
     */
    advanceTotalAmount?: bigint;
    /**
     * centavos; decremented by AmortizeAdvanceDisbursement
     *
     * @generated from field: optional int64 advance_remaining_amount = 37;
     */
    advanceRemainingAmount?: bigint;
    /**
     * centavos; SUM(linked expense_recognition.total_amount)
     *
     * @generated from field: optional int64 advance_recognized_amount = 38;
     */
    advanceRecognizedAmount?: bigint;
    /**
     * asset (prepaid)
     *
     * @generated from field: optional string advance_balance_account_id = 39;
     */
    advanceBalanceAccountId?: string;
    /**
     * expense account
     *
     * @generated from field: optional string advance_target_account_id = 40;
     */
    advanceTargetAccountId?: string;
    /**
     * optional, v2 — escheat / expiration
     *
     * @generated from field: optional string advance_expiry_date = 41;
     */
    advanceExpiryDate?: string;
    /**
     * TIME_BASED first-tranche; default FULL_TRANCHE
     *
     * @generated from field: optional domain.common.v1.AdvanceProrationPolicy advance_proration_policy = 42;
     */
    advanceProrationPolicy?: AdvanceProrationPolicy;
    /**
     * Plan B Decision B — counterparty FK; additive.
     *
     * @generated from field: optional string supplier_id = 43;
     */
    supplierId?: string;
};
/**
 * Describes the message domain.treasury.v1.Disbursement.
 * Use `create(DisbursementSchema)` to create a new message.
 */
export declare const DisbursementSchema: GenMessage<Disbursement>;
/**
 * AmortizeAdvanceDisbursementRequest — buying-side Plan B Phase 2 amortize.
 *
 * @generated from message domain.treasury.v1.AmortizeAdvanceDisbursementRequest
 */
export type AmortizeAdvanceDisbursementRequest = Message<"domain.treasury.v1.AmortizeAdvanceDisbursementRequest"> & {
    /**
     * @generated from field: string treasury_disbursement_id = 1;
     */
    treasuryDisbursementId: string;
    /**
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
     * set when invoked from an ExpenseRecognitionRun batch
     *
     * @generated from field: optional string run_id = 6;
     */
    runId?: string;
};
/**
 * Describes the message domain.treasury.v1.AmortizeAdvanceDisbursementRequest.
 * Use `create(AmortizeAdvanceDisbursementRequestSchema)` to create a new message.
 */
export declare const AmortizeAdvanceDisbursementRequestSchema: GenMessage<AmortizeAdvanceDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.AmortizeAdvanceDisbursementResponse
 */
export type AmortizeAdvanceDisbursementResponse = Message<"domain.treasury.v1.AmortizeAdvanceDisbursementResponse"> & {
    /**
     * @generated from field: domain.common.v1.AdvanceAmortizeOutcome outcome = 1;
     */
    outcome: AdvanceAmortizeOutcome;
    /**
     * populated when outcome == CREATED
     *
     * @generated from field: optional string expense_recognition_id = 2;
     */
    expenseRecognitionId?: string;
    /**
     * populated when outcome == SKIPPED
     *
     * @generated from field: optional string conflicting_expense_recognition_id = 3;
     */
    conflictingExpenseRecognitionId?: string;
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
 * Describes the message domain.treasury.v1.AmortizeAdvanceDisbursementResponse.
 * Use `create(AmortizeAdvanceDisbursementResponseSchema)` to create a new message.
 */
export declare const AmortizeAdvanceDisbursementResponseSchema: GenMessage<AmortizeAdvanceDisbursementResponse>;
/**
 * SettleUnscheduledAdvanceDisbursementRequest — UNSCHEDULED settle (buying side).
 *
 * @generated from message domain.treasury.v1.SettleUnscheduledAdvanceDisbursementRequest
 */
export type SettleUnscheduledAdvanceDisbursementRequest = Message<"domain.treasury.v1.SettleUnscheduledAdvanceDisbursementRequest"> & {
    /**
     * @generated from field: string treasury_disbursement_id = 1;
     */
    treasuryDisbursementId: string;
    /**
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
 * Describes the message domain.treasury.v1.SettleUnscheduledAdvanceDisbursementRequest.
 * Use `create(SettleUnscheduledAdvanceDisbursementRequestSchema)` to create a new message.
 */
export declare const SettleUnscheduledAdvanceDisbursementRequestSchema: GenMessage<SettleUnscheduledAdvanceDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.SettleUnscheduledAdvanceDisbursementResponse
 */
export type SettleUnscheduledAdvanceDisbursementResponse = Message<"domain.treasury.v1.SettleUnscheduledAdvanceDisbursementResponse"> & {
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
 * Describes the message domain.treasury.v1.SettleUnscheduledAdvanceDisbursementResponse.
 * Use `create(SettleUnscheduledAdvanceDisbursementResponseSchema)` to create a new message.
 */
export declare const SettleUnscheduledAdvanceDisbursementResponseSchema: GenMessage<SettleUnscheduledAdvanceDisbursementResponse>;
/**
 * RefundUnscheduledAdvanceDisbursementRequest — UNSCHEDULED refund (buying side).
 *
 * @generated from message domain.treasury.v1.RefundUnscheduledAdvanceDisbursementRequest
 */
export type RefundUnscheduledAdvanceDisbursementRequest = Message<"domain.treasury.v1.RefundUnscheduledAdvanceDisbursementRequest"> & {
    /**
     * @generated from field: string treasury_disbursement_id = 1;
     */
    treasuryDisbursementId: string;
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
 * Describes the message domain.treasury.v1.RefundUnscheduledAdvanceDisbursementRequest.
 * Use `create(RefundUnscheduledAdvanceDisbursementRequestSchema)` to create a new message.
 */
export declare const RefundUnscheduledAdvanceDisbursementRequestSchema: GenMessage<RefundUnscheduledAdvanceDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.RefundUnscheduledAdvanceDisbursementResponse
 */
export type RefundUnscheduledAdvanceDisbursementResponse = Message<"domain.treasury.v1.RefundUnscheduledAdvanceDisbursementResponse"> & {
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
 * Describes the message domain.treasury.v1.RefundUnscheduledAdvanceDisbursementResponse.
 * Use `create(RefundUnscheduledAdvanceDisbursementResponseSchema)` to create a new message.
 */
export declare const RefundUnscheduledAdvanceDisbursementResponseSchema: GenMessage<RefundUnscheduledAdvanceDisbursementResponse>;
/**
 * CancelAdvanceDisbursementRequest — flip advance_status to CANCELLED (buying side).
 *
 * @generated from message domain.treasury.v1.CancelAdvanceDisbursementRequest
 */
export type CancelAdvanceDisbursementRequest = Message<"domain.treasury.v1.CancelAdvanceDisbursementRequest"> & {
    /**
     * @generated from field: string treasury_disbursement_id = 1;
     */
    treasuryDisbursementId: string;
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
 * Describes the message domain.treasury.v1.CancelAdvanceDisbursementRequest.
 * Use `create(CancelAdvanceDisbursementRequestSchema)` to create a new message.
 */
export declare const CancelAdvanceDisbursementRequestSchema: GenMessage<CancelAdvanceDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.CancelAdvanceDisbursementResponse
 */
export type CancelAdvanceDisbursementResponse = Message<"domain.treasury.v1.CancelAdvanceDisbursementResponse"> & {
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
 * Describes the message domain.treasury.v1.CancelAdvanceDisbursementResponse.
 * Use `create(CancelAdvanceDisbursementResponseSchema)` to create a new message.
 */
export declare const CancelAdvanceDisbursementResponseSchema: GenMessage<CancelAdvanceDisbursementResponse>;
/**
 * RecognizeMilestoneAdvanceDisbursementRequest — Plan B Phase 7 milestone
 * recognition (buying side). Anchors on a
 * (disbursement_id, supplier_billing_event_id) junction row.
 *
 * @generated from message domain.treasury.v1.RecognizeMilestoneAdvanceDisbursementRequest
 */
export type RecognizeMilestoneAdvanceDisbursementRequest = Message<"domain.treasury.v1.RecognizeMilestoneAdvanceDisbursementRequest"> & {
    /**
     * @generated from field: string treasury_disbursement_id = 1;
     */
    treasuryDisbursementId: string;
    /**
     * @generated from field: string supplier_billing_event_id = 2;
     */
    supplierBillingEventId: string;
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
 * Describes the message domain.treasury.v1.RecognizeMilestoneAdvanceDisbursementRequest.
 * Use `create(RecognizeMilestoneAdvanceDisbursementRequestSchema)` to create a new message.
 */
export declare const RecognizeMilestoneAdvanceDisbursementRequestSchema: GenMessage<RecognizeMilestoneAdvanceDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.RecognizeMilestoneAdvanceDisbursementResponse
 */
export type RecognizeMilestoneAdvanceDisbursementResponse = Message<"domain.treasury.v1.RecognizeMilestoneAdvanceDisbursementResponse"> & {
    /**
     * @generated from field: domain.common.v1.AdvanceAmortizeOutcome outcome = 1;
     */
    outcome: AdvanceAmortizeOutcome;
    /**
     * @generated from field: optional string expense_recognition_id = 2;
     */
    expenseRecognitionId?: string;
    /**
     * @generated from field: optional string conflicting_expense_recognition_id = 3;
     */
    conflictingExpenseRecognitionId?: string;
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
 * Describes the message domain.treasury.v1.RecognizeMilestoneAdvanceDisbursementResponse.
 * Use `create(RecognizeMilestoneAdvanceDisbursementResponseSchema)` to create a new message.
 */
export declare const RecognizeMilestoneAdvanceDisbursementResponseSchema: GenMessage<RecognizeMilestoneAdvanceDisbursementResponse>;
/**
 * @generated from message domain.treasury.v1.ListAdvanceDisbursementsForDashboardRequest
 */
export type ListAdvanceDisbursementsForDashboardRequest = Message<"domain.treasury.v1.ListAdvanceDisbursementsForDashboardRequest"> & {
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
 * Describes the message domain.treasury.v1.ListAdvanceDisbursementsForDashboardRequest.
 * Use `create(ListAdvanceDisbursementsForDashboardRequestSchema)` to create a new message.
 */
export declare const ListAdvanceDisbursementsForDashboardRequestSchema: GenMessage<ListAdvanceDisbursementsForDashboardRequest>;
/**
 * @generated from message domain.treasury.v1.AdvanceDisbursementDashboardRow
 */
export type AdvanceDisbursementDashboardRow = Message<"domain.treasury.v1.AdvanceDisbursementDashboardRow"> & {
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
 * Describes the message domain.treasury.v1.AdvanceDisbursementDashboardRow.
 * Use `create(AdvanceDisbursementDashboardRowSchema)` to create a new message.
 */
export declare const AdvanceDisbursementDashboardRowSchema: GenMessage<AdvanceDisbursementDashboardRow>;
/**
 * @generated from message domain.treasury.v1.ListAdvanceDisbursementsForDashboardResponse
 */
export type ListAdvanceDisbursementsForDashboardResponse = Message<"domain.treasury.v1.ListAdvanceDisbursementsForDashboardResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.AdvanceDisbursementDashboardRow rows = 1;
     */
    rows: AdvanceDisbursementDashboardRow[];
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
 * Describes the message domain.treasury.v1.ListAdvanceDisbursementsForDashboardResponse.
 * Use `create(ListAdvanceDisbursementsForDashboardResponseSchema)` to create a new message.
 */
export declare const ListAdvanceDisbursementsForDashboardResponseSchema: GenMessage<ListAdvanceDisbursementsForDashboardResponse>;
/**
 * @generated from message domain.treasury.v1.CreateDisbursementRequest
 */
export type CreateDisbursementRequest = Message<"domain.treasury.v1.CreateDisbursementRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Disbursement data = 1;
     */
    data?: Disbursement;
};
/**
 * Describes the message domain.treasury.v1.CreateDisbursementRequest.
 * Use `create(CreateDisbursementRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementRequestSchema: GenMessage<CreateDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.CreateDisbursementResponse
 */
export type CreateDisbursementResponse = Message<"domain.treasury.v1.CreateDisbursementResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Disbursement data = 1;
     */
    data: Disbursement[];
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
 * Describes the message domain.treasury.v1.CreateDisbursementResponse.
 * Use `create(CreateDisbursementResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementResponseSchema: GenMessage<CreateDisbursementResponse>;
/**
 * @generated from message domain.treasury.v1.ReadDisbursementRequest
 */
export type ReadDisbursementRequest = Message<"domain.treasury.v1.ReadDisbursementRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Disbursement data = 1;
     */
    data?: Disbursement;
};
/**
 * Describes the message domain.treasury.v1.ReadDisbursementRequest.
 * Use `create(ReadDisbursementRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementRequestSchema: GenMessage<ReadDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.ReadDisbursementResponse
 */
export type ReadDisbursementResponse = Message<"domain.treasury.v1.ReadDisbursementResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Disbursement data = 1;
     */
    data: Disbursement[];
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
 * Describes the message domain.treasury.v1.ReadDisbursementResponse.
 * Use `create(ReadDisbursementResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementResponseSchema: GenMessage<ReadDisbursementResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateDisbursementRequest
 */
export type UpdateDisbursementRequest = Message<"domain.treasury.v1.UpdateDisbursementRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Disbursement data = 1;
     */
    data?: Disbursement;
};
/**
 * Describes the message domain.treasury.v1.UpdateDisbursementRequest.
 * Use `create(UpdateDisbursementRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementRequestSchema: GenMessage<UpdateDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateDisbursementResponse
 */
export type UpdateDisbursementResponse = Message<"domain.treasury.v1.UpdateDisbursementResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Disbursement data = 1;
     */
    data: Disbursement[];
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
 * Describes the message domain.treasury.v1.UpdateDisbursementResponse.
 * Use `create(UpdateDisbursementResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementResponseSchema: GenMessage<UpdateDisbursementResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteDisbursementRequest
 */
export type DeleteDisbursementRequest = Message<"domain.treasury.v1.DeleteDisbursementRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.Disbursement data = 1;
     */
    data?: Disbursement;
};
/**
 * Describes the message domain.treasury.v1.DeleteDisbursementRequest.
 * Use `create(DeleteDisbursementRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementRequestSchema: GenMessage<DeleteDisbursementRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteDisbursementResponse
 */
export type DeleteDisbursementResponse = Message<"domain.treasury.v1.DeleteDisbursementResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteDisbursementResponse.
 * Use `create(DeleteDisbursementResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementResponseSchema: GenMessage<DeleteDisbursementResponse>;
/**
 * @generated from message domain.treasury.v1.ListDisbursementsRequest
 */
export type ListDisbursementsRequest = Message<"domain.treasury.v1.ListDisbursementsRequest"> & {
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
 * Describes the message domain.treasury.v1.ListDisbursementsRequest.
 * Use `create(ListDisbursementsRequestSchema)` to create a new message.
 */
export declare const ListDisbursementsRequestSchema: GenMessage<ListDisbursementsRequest>;
/**
 * @generated from message domain.treasury.v1.ListDisbursementsResponse
 */
export type ListDisbursementsResponse = Message<"domain.treasury.v1.ListDisbursementsResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Disbursement data = 1;
     */
    data: Disbursement[];
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
 * Describes the message domain.treasury.v1.ListDisbursementsResponse.
 * Use `create(ListDisbursementsResponseSchema)` to create a new message.
 */
export declare const ListDisbursementsResponseSchema: GenMessage<ListDisbursementsResponse>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementListPageDataRequest
 */
export type GetDisbursementListPageDataRequest = Message<"domain.treasury.v1.GetDisbursementListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetDisbursementListPageDataRequest.
 * Use `create(GetDisbursementListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementListPageDataRequestSchema: GenMessage<GetDisbursementListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementListPageDataResponse
 */
export type GetDisbursementListPageDataResponse = Message<"domain.treasury.v1.GetDisbursementListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.Disbursement disbursement_list = 1;
     */
    disbursementList: Disbursement[];
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
 * Describes the message domain.treasury.v1.GetDisbursementListPageDataResponse.
 * Use `create(GetDisbursementListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementListPageDataResponseSchema: GenMessage<GetDisbursementListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementItemPageDataRequest
 */
export type GetDisbursementItemPageDataRequest = Message<"domain.treasury.v1.GetDisbursementItemPageDataRequest"> & {
    /**
     * @generated from field: string disbursement_id = 1;
     */
    disbursementId: string;
};
/**
 * Describes the message domain.treasury.v1.GetDisbursementItemPageDataRequest.
 * Use `create(GetDisbursementItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementItemPageDataRequestSchema: GenMessage<GetDisbursementItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetDisbursementItemPageDataResponse
 */
export type GetDisbursementItemPageDataResponse = Message<"domain.treasury.v1.GetDisbursementItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.Disbursement disbursement = 1;
     */
    disbursement?: Disbursement;
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
 * Describes the message domain.treasury.v1.GetDisbursementItemPageDataResponse.
 * Use `create(GetDisbursementItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementItemPageDataResponseSchema: GenMessage<GetDisbursementItemPageDataResponse>;
/**
 * @generated from service domain.treasury.v1.DisbursementDomainService
 */
export declare const DisbursementDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.CreateDisbursement
     */
    createDisbursement: {
        methodKind: "unary";
        input: typeof CreateDisbursementRequestSchema;
        output: typeof CreateDisbursementResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.ReadDisbursement
     */
    readDisbursement: {
        methodKind: "unary";
        input: typeof ReadDisbursementRequestSchema;
        output: typeof ReadDisbursementResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.UpdateDisbursement
     */
    updateDisbursement: {
        methodKind: "unary";
        input: typeof UpdateDisbursementRequestSchema;
        output: typeof UpdateDisbursementResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.DeleteDisbursement
     */
    deleteDisbursement: {
        methodKind: "unary";
        input: typeof DeleteDisbursementRequestSchema;
        output: typeof DeleteDisbursementResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.ListDisbursements
     */
    listDisbursements: {
        methodKind: "unary";
        input: typeof ListDisbursementsRequestSchema;
        output: typeof ListDisbursementsResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.GetDisbursementListPageData
     */
    getDisbursementListPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementListPageDataRequestSchema;
        output: typeof GetDisbursementListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.DisbursementDomainService.GetDisbursementItemPageData
     */
    getDisbursementItemPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementItemPageDataRequestSchema;
        output: typeof GetDisbursementItemPageDataResponseSchema;
    };
}>;
