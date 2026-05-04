import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/accrued_expense/accrued_expense.proto.
 */
export declare const file_domain_expenditure_accrued_expense_accrued_expense: GenFile;
/**
 * AccruedExpense represents a recognized supplier obligation ahead of the
 * supplier invoice (Expenditure) actually arriving. There is no
 * AccruedRevenue analog on the sales side — this is an intentional
 * asymmetry: customers commit and we recognize on the actual transaction.
 *
 * Settlement is modeled as N:M via the AccruedExpenseSettlement join table
 * (round-6 amendment, HIGH-3) — replacing the original single
 * settling_expenditure_id FK which couldn't model partial bills, multi-
 * accrual settlement, or FX-adjusted settlement.
 *
 * Single-write boundary (plan §10 R2/R3): all updates to settled_amount
 * + remaining_amount flow through the AccruedExpenseSettlementService
 * (`SettleAccrual`, `ReverseAccrual`). Adapter-direct writes are forbidden.
 *
 * @generated from message domain.expenditure.v1.AccruedExpense
 */
export type AccruedExpense = Message<"domain.expenditure.v1.AccruedExpense"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Audit
     *
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
    /**
     * @generated from field: string internal_id = 8;
     */
    internalId: string;
    /**
     * Identity
     *
     * "Utilities — May 2026 (estimate)"
     *
     * @generated from field: string name = 10;
     */
    name: string;
    /**
     * @generated from field: optional string description = 11;
     */
    description?: string;
    /**
     * Source contract / supplier
     *
     * @generated from field: string supplier_contract_id = 20;
     */
    supplierContractId: string;
    /**
     * @generated from field: optional string supplier_id = 21;
     */
    supplierId?: string;
    /**
     * Period
     *
     * @generated from field: optional google.protobuf.Timestamp period_start = 30;
     */
    periodStart?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp period_end = 31;
     */
    periodEnd?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp recognition_date = 32;
     */
    recognitionDate?: Timestamp;
    /**
     * YYYY-MM-DD bucket; idempotency w/ supplier_contract_id
     *
     * @generated from field: optional string cycle_date = 33;
     */
    cycleDate?: string;
    /**
     * Money (centavos)
     *
     * @generated from field: string currency = 40;
     */
    currency: string;
    /**
     * estimated obligation
     *
     * @generated from field: int64 accrued_amount = 41;
     */
    accruedAmount: bigint;
    /**
     * sum of AccruedExpenseSettlement.amount entries
     *
     * @generated from field: int64 settled_amount = 42;
     */
    settledAmount: bigint;
    /**
     * accrued_amount - settled_amount (derived; stored)
     *
     * @generated from field: int64 remaining_amount = 43;
     */
    remainingAmount: bigint;
    /**
     * Lifecycle
     *
     * @generated from field: domain.expenditure.v1.AccruedExpenseStatus status = 50;
     */
    status: AccruedExpenseStatus;
    /**
     * GL
     *
     * @generated from field: optional string accrual_account_id = 60;
     */
    accrualAccountId?: string;
    /**
     * @generated from field: optional string expense_account_id = 61;
     */
    expenseAccountId?: string;
    /**
     * Notes
     *
     * @generated from field: optional string notes = 90;
     */
    notes?: string;
    /**
     * @generated from field: map<string, string> metadata = 91;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.expenditure.v1.AccruedExpense.
 * Use `create(AccruedExpenseSchema)` to create a new message.
 */
export declare const AccruedExpenseSchema: GenMessage<AccruedExpense>;
/**
 * AccruedExpenseSettlement (round-6 HIGH-3): join row capturing the amount
 * of a specific Expenditure that settles a specific AccruedExpense. Allows
 * N:M between AccruedExpense and Expenditure with per-settlement amount,
 * currency, FX revaluation, and reversal tracking.
 *
 * @generated from message domain.expenditure.v1.AccruedExpenseSettlement
 */
export type AccruedExpenseSettlement = Message<"domain.expenditure.v1.AccruedExpenseSettlement"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Audit
     *
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
    /**
     * Parents (parent accrual + the bill that settles it)
     *
     * @generated from field: string accrued_expense_id = 10;
     */
    accruedExpenseId: string;
    /**
     * @generated from field: string expenditure_id = 11;
     */
    expenditureId: string;
    /**
     * @generated from field: optional string expenditure_line_item_id = 12;
     */
    expenditureLineItemId?: string;
    /**
     * The portion of THIS expenditure that settles THIS accrual.
     * Independent of expenditure.total_amount — one Expenditure can split
     * across multiple accruals.
     *
     * centavos
     *
     * @generated from field: int64 amount_settled = 20;
     */
    amountSettled: bigint;
    /**
     * @generated from field: string currency = 21;
     */
    currency: string;
    /**
     * FX revaluation — if the accrual was estimated at a different rate epoch
     *
     * bill currency → accrual currency rate at settlement date
     *
     * @generated from field: optional double fx_rate = 30;
     */
    fxRate?: number;
    /**
     * accrual-currency-equivalent of the FX delta
     *
     * @generated from field: optional int64 fx_adjustment_amount = 31;
     */
    fxAdjustmentAmount?: bigint;
    /**
     * When the settlement was posted
     *
     * @generated from field: google.protobuf.Timestamp settled_at = 40;
     */
    settledAt?: Timestamp;
    /**
     * Reversal — settlement can be reversed (e.g., bill voided after settle posted).
     * A reversal IS-A settlement with a negative amount; this self-FK points
     * from the original to its reversing row (and vice-versa).
     *
     * @generated from field: optional string reversed_by_settlement_id = 50;
     */
    reversedBySettlementId?: string;
    /**
     * @generated from field: optional string reversal_reason = 51;
     */
    reversalReason?: string;
};
/**
 * Describes the message domain.expenditure.v1.AccruedExpenseSettlement.
 * Use `create(AccruedExpenseSettlementSchema)` to create a new message.
 */
export declare const AccruedExpenseSettlementSchema: GenMessage<AccruedExpenseSettlement>;
/**
 * @generated from message domain.expenditure.v1.CreateAccruedExpenseRequest
 */
export type CreateAccruedExpenseRequest = Message<"domain.expenditure.v1.CreateAccruedExpenseRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpense data = 1;
     */
    data?: AccruedExpense;
};
/**
 * Describes the message domain.expenditure.v1.CreateAccruedExpenseRequest.
 * Use `create(CreateAccruedExpenseRequestSchema)` to create a new message.
 */
export declare const CreateAccruedExpenseRequestSchema: GenMessage<CreateAccruedExpenseRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateAccruedExpenseResponse
 */
export type CreateAccruedExpenseResponse = Message<"domain.expenditure.v1.CreateAccruedExpenseResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpense data = 1;
     */
    data: AccruedExpense[];
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
 * Describes the message domain.expenditure.v1.CreateAccruedExpenseResponse.
 * Use `create(CreateAccruedExpenseResponseSchema)` to create a new message.
 */
export declare const CreateAccruedExpenseResponseSchema: GenMessage<CreateAccruedExpenseResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadAccruedExpenseRequest
 */
export type ReadAccruedExpenseRequest = Message<"domain.expenditure.v1.ReadAccruedExpenseRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpense data = 1;
     */
    data?: AccruedExpense;
};
/**
 * Describes the message domain.expenditure.v1.ReadAccruedExpenseRequest.
 * Use `create(ReadAccruedExpenseRequestSchema)` to create a new message.
 */
export declare const ReadAccruedExpenseRequestSchema: GenMessage<ReadAccruedExpenseRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadAccruedExpenseResponse
 */
export type ReadAccruedExpenseResponse = Message<"domain.expenditure.v1.ReadAccruedExpenseResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpense data = 1;
     */
    data: AccruedExpense[];
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
 * Describes the message domain.expenditure.v1.ReadAccruedExpenseResponse.
 * Use `create(ReadAccruedExpenseResponseSchema)` to create a new message.
 */
export declare const ReadAccruedExpenseResponseSchema: GenMessage<ReadAccruedExpenseResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateAccruedExpenseRequest
 */
export type UpdateAccruedExpenseRequest = Message<"domain.expenditure.v1.UpdateAccruedExpenseRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpense data = 1;
     */
    data?: AccruedExpense;
};
/**
 * Describes the message domain.expenditure.v1.UpdateAccruedExpenseRequest.
 * Use `create(UpdateAccruedExpenseRequestSchema)` to create a new message.
 */
export declare const UpdateAccruedExpenseRequestSchema: GenMessage<UpdateAccruedExpenseRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateAccruedExpenseResponse
 */
export type UpdateAccruedExpenseResponse = Message<"domain.expenditure.v1.UpdateAccruedExpenseResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpense data = 1;
     */
    data: AccruedExpense[];
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
 * Describes the message domain.expenditure.v1.UpdateAccruedExpenseResponse.
 * Use `create(UpdateAccruedExpenseResponseSchema)` to create a new message.
 */
export declare const UpdateAccruedExpenseResponseSchema: GenMessage<UpdateAccruedExpenseResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteAccruedExpenseRequest
 */
export type DeleteAccruedExpenseRequest = Message<"domain.expenditure.v1.DeleteAccruedExpenseRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpense data = 1;
     */
    data?: AccruedExpense;
};
/**
 * Describes the message domain.expenditure.v1.DeleteAccruedExpenseRequest.
 * Use `create(DeleteAccruedExpenseRequestSchema)` to create a new message.
 */
export declare const DeleteAccruedExpenseRequestSchema: GenMessage<DeleteAccruedExpenseRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteAccruedExpenseResponse
 */
export type DeleteAccruedExpenseResponse = Message<"domain.expenditure.v1.DeleteAccruedExpenseResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteAccruedExpenseResponse.
 * Use `create(DeleteAccruedExpenseResponseSchema)` to create a new message.
 */
export declare const DeleteAccruedExpenseResponseSchema: GenMessage<DeleteAccruedExpenseResponse>;
/**
 * @generated from message domain.expenditure.v1.ListAccruedExpensesRequest
 */
export type ListAccruedExpensesRequest = Message<"domain.expenditure.v1.ListAccruedExpensesRequest"> & {
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
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpenseStatus status = 5;
     */
    status?: AccruedExpenseStatus;
    /**
     * @generated from field: optional string supplier_contract_id = 6;
     */
    supplierContractId?: string;
    /**
     * @generated from field: optional string workspace_id = 7;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListAccruedExpensesRequest.
 * Use `create(ListAccruedExpensesRequestSchema)` to create a new message.
 */
export declare const ListAccruedExpensesRequestSchema: GenMessage<ListAccruedExpensesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListAccruedExpensesResponse
 */
export type ListAccruedExpensesResponse = Message<"domain.expenditure.v1.ListAccruedExpensesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpense data = 1;
     */
    data: AccruedExpense[];
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
 * Describes the message domain.expenditure.v1.ListAccruedExpensesResponse.
 * Use `create(ListAccruedExpensesResponseSchema)` to create a new message.
 */
export declare const ListAccruedExpensesResponseSchema: GenMessage<ListAccruedExpensesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseListPageDataRequest
 */
export type GetAccruedExpenseListPageDataRequest = Message<"domain.expenditure.v1.GetAccruedExpenseListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetAccruedExpenseListPageDataRequest.
 * Use `create(GetAccruedExpenseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccruedExpenseListPageDataRequestSchema: GenMessage<GetAccruedExpenseListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseListPageDataResponse
 */
export type GetAccruedExpenseListPageDataResponse = Message<"domain.expenditure.v1.GetAccruedExpenseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpense accrued_expense_list = 1;
     */
    accruedExpenseList: AccruedExpense[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.expenditure.v1.GetAccruedExpenseListPageDataResponse.
 * Use `create(GetAccruedExpenseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccruedExpenseListPageDataResponseSchema: GenMessage<GetAccruedExpenseListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseItemPageDataRequest
 */
export type GetAccruedExpenseItemPageDataRequest = Message<"domain.expenditure.v1.GetAccruedExpenseItemPageDataRequest"> & {
    /**
     * @generated from field: string accrued_expense_id = 1;
     */
    accruedExpenseId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetAccruedExpenseItemPageDataRequest.
 * Use `create(GetAccruedExpenseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccruedExpenseItemPageDataRequestSchema: GenMessage<GetAccruedExpenseItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseItemPageDataResponse
 */
export type GetAccruedExpenseItemPageDataResponse = Message<"domain.expenditure.v1.GetAccruedExpenseItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpense accrued_expense = 1;
     */
    accruedExpense?: AccruedExpense;
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
 * Describes the message domain.expenditure.v1.GetAccruedExpenseItemPageDataResponse.
 * Use `create(GetAccruedExpenseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccruedExpenseItemPageDataResponseSchema: GenMessage<GetAccruedExpenseItemPageDataResponse>;
/**
 * AccrueFromContract — recurrence-engine companion. Idempotent on
 * (supplier_contract_id, cycle_date).
 *
 * @generated from message domain.expenditure.v1.AccrueFromContractRequest
 */
export type AccrueFromContractRequest = Message<"domain.expenditure.v1.AccrueFromContractRequest"> & {
    /**
     * @generated from field: string supplier_contract_id = 1;
     */
    supplierContractId: string;
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string cycle_date = 2;
     */
    cycleDate: string;
    /**
     * resolved from schedule if omitted
     *
     * @generated from field: optional int64 accrued_amount = 3;
     */
    accruedAmount?: bigint;
};
/**
 * Describes the message domain.expenditure.v1.AccrueFromContractRequest.
 * Use `create(AccrueFromContractRequestSchema)` to create a new message.
 */
export declare const AccrueFromContractRequestSchema: GenMessage<AccrueFromContractRequest>;
/**
 * @generated from message domain.expenditure.v1.AccrueFromContractResponse
 */
export type AccrueFromContractResponse = Message<"domain.expenditure.v1.AccrueFromContractResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpense data = 1;
     */
    data?: AccruedExpense;
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
 * Describes the message domain.expenditure.v1.AccrueFromContractResponse.
 * Use `create(AccrueFromContractResponseSchema)` to create a new message.
 */
export declare const AccrueFromContractResponseSchema: GenMessage<AccrueFromContractResponse>;
/**
 * SettleAccrual — single-write entry point for parent settled_amount /
 * remaining_amount. Creates an AccruedExpenseSettlement row, recomputes
 * parent rollups, transitions parent status (OUTSTANDING → PARTIAL → SETTLED).
 *
 * @generated from message domain.expenditure.v1.SettleAccrualRequest
 */
export type SettleAccrualRequest = Message<"domain.expenditure.v1.SettleAccrualRequest"> & {
    /**
     * @generated from field: string accrued_expense_id = 1;
     */
    accruedExpenseId: string;
    /**
     * @generated from field: string expenditure_id = 2;
     */
    expenditureId: string;
    /**
     * @generated from field: optional string expenditure_line_item_id = 3;
     */
    expenditureLineItemId?: string;
    /**
     * centavos
     *
     * @generated from field: int64 amount_settled = 4;
     */
    amountSettled: bigint;
    /**
     * @generated from field: string currency = 5;
     */
    currency: string;
    /**
     * @generated from field: optional double fx_rate = 6;
     */
    fxRate?: number;
    /**
     * @generated from field: optional int64 fx_adjustment_amount = 7;
     */
    fxAdjustmentAmount?: bigint;
};
/**
 * Describes the message domain.expenditure.v1.SettleAccrualRequest.
 * Use `create(SettleAccrualRequestSchema)` to create a new message.
 */
export declare const SettleAccrualRequestSchema: GenMessage<SettleAccrualRequest>;
/**
 * @generated from message domain.expenditure.v1.SettleAccrualResponse
 */
export type SettleAccrualResponse = Message<"domain.expenditure.v1.SettleAccrualResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpense accrued_expense = 1;
     */
    accruedExpense?: AccruedExpense;
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpenseSettlement settlement = 2;
     */
    settlement?: AccruedExpenseSettlement;
    /**
     * @generated from field: bool success = 3;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 4;
     */
    error?: Error;
};
/**
 * Describes the message domain.expenditure.v1.SettleAccrualResponse.
 * Use `create(SettleAccrualResponseSchema)` to create a new message.
 */
export declare const SettleAccrualResponseSchema: GenMessage<SettleAccrualResponse>;
/**
 * ReverseAccrual — guards against settled-but-not-yet-fully-reversed cases.
 * If parent status=SETTLED with linked Expenditure already disbursed, emits
 * a warning that a Disbursement reversal or supplier-refund event is also
 * required to reconcile cash (see plan §6.4a HIGH-4 note).
 *
 * @generated from message domain.expenditure.v1.ReverseAccrualRequest
 */
export type ReverseAccrualRequest = Message<"domain.expenditure.v1.ReverseAccrualRequest"> & {
    /**
     * @generated from field: string accrued_expense_id = 1;
     */
    accruedExpenseId: string;
    /**
     * @generated from field: optional string reason = 2;
     */
    reason?: string;
};
/**
 * Describes the message domain.expenditure.v1.ReverseAccrualRequest.
 * Use `create(ReverseAccrualRequestSchema)` to create a new message.
 */
export declare const ReverseAccrualRequestSchema: GenMessage<ReverseAccrualRequest>;
/**
 * @generated from message domain.expenditure.v1.ReverseAccrualResponse
 */
export type ReverseAccrualResponse = Message<"domain.expenditure.v1.ReverseAccrualResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpense data = 1;
     */
    data?: AccruedExpense;
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
 * Describes the message domain.expenditure.v1.ReverseAccrualResponse.
 * Use `create(ReverseAccrualResponseSchema)` to create a new message.
 */
export declare const ReverseAccrualResponseSchema: GenMessage<ReverseAccrualResponse>;
/**
 * @generated from message domain.expenditure.v1.CreateAccruedExpenseSettlementRequest
 */
export type CreateAccruedExpenseSettlementRequest = Message<"domain.expenditure.v1.CreateAccruedExpenseSettlementRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data?: AccruedExpenseSettlement;
};
/**
 * Describes the message domain.expenditure.v1.CreateAccruedExpenseSettlementRequest.
 * Use `create(CreateAccruedExpenseSettlementRequestSchema)` to create a new message.
 */
export declare const CreateAccruedExpenseSettlementRequestSchema: GenMessage<CreateAccruedExpenseSettlementRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateAccruedExpenseSettlementResponse
 */
export type CreateAccruedExpenseSettlementResponse = Message<"domain.expenditure.v1.CreateAccruedExpenseSettlementResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data: AccruedExpenseSettlement[];
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
 * Describes the message domain.expenditure.v1.CreateAccruedExpenseSettlementResponse.
 * Use `create(CreateAccruedExpenseSettlementResponseSchema)` to create a new message.
 */
export declare const CreateAccruedExpenseSettlementResponseSchema: GenMessage<CreateAccruedExpenseSettlementResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadAccruedExpenseSettlementRequest
 */
export type ReadAccruedExpenseSettlementRequest = Message<"domain.expenditure.v1.ReadAccruedExpenseSettlementRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data?: AccruedExpenseSettlement;
};
/**
 * Describes the message domain.expenditure.v1.ReadAccruedExpenseSettlementRequest.
 * Use `create(ReadAccruedExpenseSettlementRequestSchema)` to create a new message.
 */
export declare const ReadAccruedExpenseSettlementRequestSchema: GenMessage<ReadAccruedExpenseSettlementRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadAccruedExpenseSettlementResponse
 */
export type ReadAccruedExpenseSettlementResponse = Message<"domain.expenditure.v1.ReadAccruedExpenseSettlementResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data: AccruedExpenseSettlement[];
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
 * Describes the message domain.expenditure.v1.ReadAccruedExpenseSettlementResponse.
 * Use `create(ReadAccruedExpenseSettlementResponseSchema)` to create a new message.
 */
export declare const ReadAccruedExpenseSettlementResponseSchema: GenMessage<ReadAccruedExpenseSettlementResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateAccruedExpenseSettlementRequest
 */
export type UpdateAccruedExpenseSettlementRequest = Message<"domain.expenditure.v1.UpdateAccruedExpenseSettlementRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data?: AccruedExpenseSettlement;
};
/**
 * Describes the message domain.expenditure.v1.UpdateAccruedExpenseSettlementRequest.
 * Use `create(UpdateAccruedExpenseSettlementRequestSchema)` to create a new message.
 */
export declare const UpdateAccruedExpenseSettlementRequestSchema: GenMessage<UpdateAccruedExpenseSettlementRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateAccruedExpenseSettlementResponse
 */
export type UpdateAccruedExpenseSettlementResponse = Message<"domain.expenditure.v1.UpdateAccruedExpenseSettlementResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data: AccruedExpenseSettlement[];
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
 * Describes the message domain.expenditure.v1.UpdateAccruedExpenseSettlementResponse.
 * Use `create(UpdateAccruedExpenseSettlementResponseSchema)` to create a new message.
 */
export declare const UpdateAccruedExpenseSettlementResponseSchema: GenMessage<UpdateAccruedExpenseSettlementResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteAccruedExpenseSettlementRequest
 */
export type DeleteAccruedExpenseSettlementRequest = Message<"domain.expenditure.v1.DeleteAccruedExpenseSettlementRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data?: AccruedExpenseSettlement;
};
/**
 * Describes the message domain.expenditure.v1.DeleteAccruedExpenseSettlementRequest.
 * Use `create(DeleteAccruedExpenseSettlementRequestSchema)` to create a new message.
 */
export declare const DeleteAccruedExpenseSettlementRequestSchema: GenMessage<DeleteAccruedExpenseSettlementRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteAccruedExpenseSettlementResponse
 */
export type DeleteAccruedExpenseSettlementResponse = Message<"domain.expenditure.v1.DeleteAccruedExpenseSettlementResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteAccruedExpenseSettlementResponse.
 * Use `create(DeleteAccruedExpenseSettlementResponseSchema)` to create a new message.
 */
export declare const DeleteAccruedExpenseSettlementResponseSchema: GenMessage<DeleteAccruedExpenseSettlementResponse>;
/**
 * @generated from message domain.expenditure.v1.ListAccruedExpenseSettlementsRequest
 */
export type ListAccruedExpenseSettlementsRequest = Message<"domain.expenditure.v1.ListAccruedExpenseSettlementsRequest"> & {
    /**
     * @generated from field: optional string accrued_expense_id = 1;
     */
    accruedExpenseId?: string;
    /**
     * @generated from field: optional string expenditure_id = 2;
     */
    expenditureId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 3;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 4;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 5;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 6;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.expenditure.v1.ListAccruedExpenseSettlementsRequest.
 * Use `create(ListAccruedExpenseSettlementsRequestSchema)` to create a new message.
 */
export declare const ListAccruedExpenseSettlementsRequestSchema: GenMessage<ListAccruedExpenseSettlementsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListAccruedExpenseSettlementsResponse
 */
export type ListAccruedExpenseSettlementsResponse = Message<"domain.expenditure.v1.ListAccruedExpenseSettlementsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpenseSettlement data = 1;
     */
    data: AccruedExpenseSettlement[];
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
 * Describes the message domain.expenditure.v1.ListAccruedExpenseSettlementsResponse.
 * Use `create(ListAccruedExpenseSettlementsResponseSchema)` to create a new message.
 */
export declare const ListAccruedExpenseSettlementsResponseSchema: GenMessage<ListAccruedExpenseSettlementsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseSettlementListPageDataRequest
 */
export type GetAccruedExpenseSettlementListPageDataRequest = Message<"domain.expenditure.v1.GetAccruedExpenseSettlementListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetAccruedExpenseSettlementListPageDataRequest.
 * Use `create(GetAccruedExpenseSettlementListPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccruedExpenseSettlementListPageDataRequestSchema: GenMessage<GetAccruedExpenseSettlementListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseSettlementListPageDataResponse
 */
export type GetAccruedExpenseSettlementListPageDataResponse = Message<"domain.expenditure.v1.GetAccruedExpenseSettlementListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.AccruedExpenseSettlement accrued_expense_settlement_list = 1;
     */
    accruedExpenseSettlementList: AccruedExpenseSettlement[];
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 3;
     */
    searchResults: SearchResult[];
    /**
     * @generated from field: bool success = 4;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 5;
     */
    error?: Error;
};
/**
 * Describes the message domain.expenditure.v1.GetAccruedExpenseSettlementListPageDataResponse.
 * Use `create(GetAccruedExpenseSettlementListPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccruedExpenseSettlementListPageDataResponseSchema: GenMessage<GetAccruedExpenseSettlementListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseSettlementItemPageDataRequest
 */
export type GetAccruedExpenseSettlementItemPageDataRequest = Message<"domain.expenditure.v1.GetAccruedExpenseSettlementItemPageDataRequest"> & {
    /**
     * @generated from field: string accrued_expense_settlement_id = 1;
     */
    accruedExpenseSettlementId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetAccruedExpenseSettlementItemPageDataRequest.
 * Use `create(GetAccruedExpenseSettlementItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetAccruedExpenseSettlementItemPageDataRequestSchema: GenMessage<GetAccruedExpenseSettlementItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetAccruedExpenseSettlementItemPageDataResponse
 */
export type GetAccruedExpenseSettlementItemPageDataResponse = Message<"domain.expenditure.v1.GetAccruedExpenseSettlementItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.AccruedExpenseSettlement accrued_expense_settlement = 1;
     */
    accruedExpenseSettlement?: AccruedExpenseSettlement;
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
 * Describes the message domain.expenditure.v1.GetAccruedExpenseSettlementItemPageDataResponse.
 * Use `create(GetAccruedExpenseSettlementItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetAccruedExpenseSettlementItemPageDataResponseSchema: GenMessage<GetAccruedExpenseSettlementItemPageDataResponse>;
/**
 * AccruedExpenseStatus tracks the lifecycle of a recognized-ahead-of-bill
 * supplier obligation.
 *
 * @generated from enum domain.expenditure.v1.AccruedExpenseStatus
 */
export declare enum AccruedExpenseStatus {
    /**
     * @generated from enum value: ACCRUED_EXPENSE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * recognized, no bill yet
     *
     * @generated from enum value: ACCRUED_EXPENSE_STATUS_OUTSTANDING = 1;
     */
    OUTSTANDING = 1,
    /**
     * 1+ settlement rows; sum < accrued_amount
     *
     * @generated from enum value: ACCRUED_EXPENSE_STATUS_PARTIAL = 2;
     */
    PARTIAL = 2,
    /**
     * sum of settlements = accrued_amount
     *
     * @generated from enum value: ACCRUED_EXPENSE_STATUS_SETTLED = 3;
     */
    SETTLED = 3,
    /**
     * accrual estimate proved wrong; journal reversed
     *
     * @generated from enum value: ACCRUED_EXPENSE_STATUS_REVERSED = 4;
     */
    REVERSED = 4
}
/**
 * Describes the enum domain.expenditure.v1.AccruedExpenseStatus.
 */
export declare const AccruedExpenseStatusSchema: GenEnum<AccruedExpenseStatus>;
/**
 * @generated from service domain.expenditure.v1.AccruedExpenseDomainService
 */
export declare const AccruedExpenseDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.CreateAccruedExpense
     */
    createAccruedExpense: {
        methodKind: "unary";
        input: typeof CreateAccruedExpenseRequestSchema;
        output: typeof CreateAccruedExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.ReadAccruedExpense
     */
    readAccruedExpense: {
        methodKind: "unary";
        input: typeof ReadAccruedExpenseRequestSchema;
        output: typeof ReadAccruedExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.UpdateAccruedExpense
     */
    updateAccruedExpense: {
        methodKind: "unary";
        input: typeof UpdateAccruedExpenseRequestSchema;
        output: typeof UpdateAccruedExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.DeleteAccruedExpense
     */
    deleteAccruedExpense: {
        methodKind: "unary";
        input: typeof DeleteAccruedExpenseRequestSchema;
        output: typeof DeleteAccruedExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.ListAccruedExpenses
     */
    listAccruedExpenses: {
        methodKind: "unary";
        input: typeof ListAccruedExpensesRequestSchema;
        output: typeof ListAccruedExpensesResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.GetAccruedExpenseListPageData
     */
    getAccruedExpenseListPageData: {
        methodKind: "unary";
        input: typeof GetAccruedExpenseListPageDataRequestSchema;
        output: typeof GetAccruedExpenseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.GetAccruedExpenseItemPageData
     */
    getAccruedExpenseItemPageData: {
        methodKind: "unary";
        input: typeof GetAccruedExpenseItemPageDataRequestSchema;
        output: typeof GetAccruedExpenseItemPageDataResponseSchema;
    };
    /**
     * Workflow actions
     *
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.AccrueFromContract
     */
    accrueFromContract: {
        methodKind: "unary";
        input: typeof AccrueFromContractRequestSchema;
        output: typeof AccrueFromContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.SettleAccrual
     */
    settleAccrual: {
        methodKind: "unary";
        input: typeof SettleAccrualRequestSchema;
        output: typeof SettleAccrualResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseDomainService.ReverseAccrual
     */
    reverseAccrual: {
        methodKind: "unary";
        input: typeof ReverseAccrualRequestSchema;
        output: typeof ReverseAccrualResponseSchema;
    };
}>;
/**
 * @generated from service domain.expenditure.v1.AccruedExpenseSettlementDomainService
 */
export declare const AccruedExpenseSettlementDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.CreateAccruedExpenseSettlement
     */
    createAccruedExpenseSettlement: {
        methodKind: "unary";
        input: typeof CreateAccruedExpenseSettlementRequestSchema;
        output: typeof CreateAccruedExpenseSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.ReadAccruedExpenseSettlement
     */
    readAccruedExpenseSettlement: {
        methodKind: "unary";
        input: typeof ReadAccruedExpenseSettlementRequestSchema;
        output: typeof ReadAccruedExpenseSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.UpdateAccruedExpenseSettlement
     */
    updateAccruedExpenseSettlement: {
        methodKind: "unary";
        input: typeof UpdateAccruedExpenseSettlementRequestSchema;
        output: typeof UpdateAccruedExpenseSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.DeleteAccruedExpenseSettlement
     */
    deleteAccruedExpenseSettlement: {
        methodKind: "unary";
        input: typeof DeleteAccruedExpenseSettlementRequestSchema;
        output: typeof DeleteAccruedExpenseSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.ListAccruedExpenseSettlements
     */
    listAccruedExpenseSettlements: {
        methodKind: "unary";
        input: typeof ListAccruedExpenseSettlementsRequestSchema;
        output: typeof ListAccruedExpenseSettlementsResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.GetAccruedExpenseSettlementListPageData
     */
    getAccruedExpenseSettlementListPageData: {
        methodKind: "unary";
        input: typeof GetAccruedExpenseSettlementListPageDataRequestSchema;
        output: typeof GetAccruedExpenseSettlementListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.AccruedExpenseSettlementDomainService.GetAccruedExpenseSettlementItemPageData
     */
    getAccruedExpenseSettlementItemPageData: {
        methodKind: "unary";
        input: typeof GetAccruedExpenseSettlementItemPageDataRequestSchema;
        output: typeof GetAccruedExpenseSettlementItemPageDataResponseSchema;
    };
}>;
