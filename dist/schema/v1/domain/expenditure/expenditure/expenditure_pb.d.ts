import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Client } from "../../entity/client/client_pb";
import type { Location } from "../../entity/location/location_pb";
import type { PaymentTerm } from "../../entity/payment_term/payment_term_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expenditure/expenditure.proto.
 */
export declare const file_domain_expenditure_expenditure_expenditure: GenFile;
/**
 * @generated from message domain.expenditure.v1.Expenditure
 */
export type Expenditure = Message<"domain.expenditure.v1.Expenditure"> & {
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
     * expenditure_type — free-text discriminator (legacy entity, not promoted to enum
     * per [entity-status-conventions](docs/wiki/articles/entity-status-conventions.md)
     * "enum for new entities, free-text on legacy" rule).
     *
     * Allowed values:
     *   "purchase"  → bill received from a vendor against a PurchaseOrder
     *   "expense"   → general expense not tied to a PO
     *   "refund"    → supplier-issued refund/credit
     *   "payroll"   → payroll-driven expenditure (wages, statutory)
     *   "petty"     → sundry petty-cash expense; pair with petty_cash_fund_id (field 29)
     *
     * @generated from field: string expenditure_type = 8;
     */
    expenditureType: string;
    /**
     * counterparty (vendor/supplier)
     *
     * @generated from field: optional domain.entity.v1.Client vendor = 9;
     */
    vendor?: Client;
    /**
     * FK to entity/client (vendors are clients you buy from)
     *
     * @generated from field: string vendor_id = 10;
     */
    vendorId: string;
    /**
     * @generated from field: optional int64 expenditure_date = 11;
     */
    expenditureDate?: bigint;
    /**
     * @generated from field: optional string expenditure_date_string = 12;
     */
    expenditureDateString?: string;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 13;
     */
    totalAmount: bigint;
    /**
     * @generated from field: string currency = 14;
     */
    currency: string;
    /**
     * @generated from field: string status = 15;
     */
    status: string;
    /**
     * @generated from field: optional string reference_number = 16;
     */
    referenceNumber?: string;
    /**
     * @generated from field: optional string notes = 17;
     */
    notes?: string;
    /**
     * FK to expenditure_category
     *
     * @generated from field: optional string expenditure_category_id = 18;
     */
    expenditureCategoryId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location location = 19;
     */
    location?: Location;
    /**
     * FK to location
     *
     * @generated from field: string location_id = 20;
     */
    locationId: string;
    /**
     * "cash", "net_30", "net_60"
     *
     * @generated from field: optional string payment_terms = 21;
     */
    paymentTerms?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — for AP tracking
     *
     * @generated from field: optional string due_date = 22;
     */
    dueDate?: string;
    /**
     * who authorized
     *
     * @generated from field: optional string approved_by = 23;
     */
    approvedBy?: string;
    /**
     * FK to PurchaseOrder for 3-way match
     *
     * @generated from field: optional string purchase_order_id = 24;
     */
    purchaseOrderId?: string;
    /**
     * FK to supplier (new — migrate from vendor_id over time)
     *
     * @generated from field: optional string supplier_id = 25;
     */
    supplierId?: string;
    /**
     * @generated from field: optional string payment_term_id = 26;
     */
    paymentTermId?: string;
    /**
     * @generated from field: optional domain.entity.v1.PaymentTerm payment_term = 27;
     */
    paymentTerm?: PaymentTerm;
    /**
     * Supplier commitment back-edges
     *
     * FK to SupplierContract (roll-up spend)
     *
     * @generated from field: optional string supplier_contract_id = 28;
     */
    supplierContractId?: string;
    /**
     * FK to PettyCashFund (sundries flow)
     *
     * @generated from field: optional string petty_cash_fund_id = 29;
     */
    pettyCashFundId?: string;
    /**
     * Accrual-basis recognition back-edges (SPS plan §6.5).
     * expense_recognition_id: optional 1:1 link from a bill to its primary
     *   recognition row. Multi-period amortization uses 1:N via
     *   DeferredExpense (Prepayment), not via this FK.
     * accrued_expense_id: when an inbound bill settles a previously recognized
     *   accrual, the AccruedExpenseSettlement service writes both the
     *   join row and this back-edge for fast reverse lookup.
     *
     * @generated from field: optional string expense_recognition_id = 30;
     */
    expenseRecognitionId?: string;
    /**
     * @generated from field: optional string accrued_expense_id = 31;
     */
    accruedExpenseId?: string;
    /**
     * cycle_date: YYYY-MM-DD bucket the recurrence engine produced this draft
     *   against. Pairs with supplier_contract_id for idempotency when the
     *   recurrence engine produces draft Expenditures.
     *
     * @generated from field: optional string cycle_date = 32;
     */
    cycleDate?: string;
    /**
     * source: free-text discriminator for how this row entered the system
     *   ("manual" | "recurrence" | "po_match" | "import"). Useful for
     *   filtering operational queues.
     *
     * @generated from field: optional string source = 33;
     */
    source?: string;
    /**
     * Supplier subscription back-edges (supplier-subscriptions plan).
     * Fields 30/31 were taken (expense_recognition_id, accrued_expense_id); using 34/35.
     *
     * FK to SupplierSubscription (subscription-driven expenditure)
     *
     * @generated from field: optional string supplier_subscription_id = 34;
     */
    supplierSubscriptionId?: string;
    /**
     * FK to CostPlan (denormalized for join-free reporting)
     *
     * @generated from field: optional string cost_plan_id = 35;
     */
    costPlanId?: string;
    /**
     * FK back-edge — Wave 4 self-domain plan (2026-05-17).
     * Audit snapshot of the disbursement profile active at bill time.
     * Stored as string (no DB FK constraint) to survive profile edits — see architecture.md §3.5.
     *
     * @generated from field: optional string disbursement_profile_id_snapshot = 36;
     */
    disbursementProfileIdSnapshot?: string;
    /**
     * FK back-edge — FS-D shared-fund-sources plan (2026-05-17).
     * Links this expenditure to the FundTransaction (kind=DRAW) that was inserted
     * when this bill was charged to a shared fund source. NULL when the expenditure
     * is funded from a regular cash account (no shared-fund involvement).
     *
     * @generated from field: optional string fund_transaction_id = 37;
     */
    fundTransactionId?: string;
    /**
     * Run back-edge — Plan A (20260517-expense-run).
     * Set when this draft Expenditure was emitted by an ExpenseRecognitionRun
     * (subscription path). AP edits/cancels the draft when the real vendor bill arrives.
     *
     * @generated from field: optional string run_id = 38;
     */
    runId?: string;
    /**
     * Tenancy scope. Added by 20260530000000_add_workspace_id_to_ledger_financials.sql
     * to back the workspace_id filter the postgres adapter already issues
     * (expenditure.go:319). Documentation-only annotation today; keeps proto/DB
     * aligned. NULLABLE until the deferred NOT NULL migration tightens it.
     *
     * @generated from field: optional string workspace_id = 39;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.Expenditure.
 * Use `create(ExpenditureSchema)` to create a new message.
 */
export declare const ExpenditureSchema: GenMessage<Expenditure>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureRequest
 */
export type CreateExpenditureRequest = Message<"domain.expenditure.v1.CreateExpenditureRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Expenditure data = 1;
     */
    data?: Expenditure;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenditureRequest.
 * Use `create(CreateExpenditureRequestSchema)` to create a new message.
 */
export declare const CreateExpenditureRequestSchema: GenMessage<CreateExpenditureRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenditureResponse
 */
export type CreateExpenditureResponse = Message<"domain.expenditure.v1.CreateExpenditureResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Expenditure data = 1;
     */
    data: Expenditure[];
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
 * Describes the message domain.expenditure.v1.CreateExpenditureResponse.
 * Use `create(CreateExpenditureResponseSchema)` to create a new message.
 */
export declare const CreateExpenditureResponseSchema: GenMessage<CreateExpenditureResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureRequest
 */
export type ReadExpenditureRequest = Message<"domain.expenditure.v1.ReadExpenditureRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Expenditure data = 1;
     */
    data?: Expenditure;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenditureRequest.
 * Use `create(ReadExpenditureRequestSchema)` to create a new message.
 */
export declare const ReadExpenditureRequestSchema: GenMessage<ReadExpenditureRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenditureResponse
 */
export type ReadExpenditureResponse = Message<"domain.expenditure.v1.ReadExpenditureResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Expenditure data = 1;
     */
    data: Expenditure[];
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
 * Describes the message domain.expenditure.v1.ReadExpenditureResponse.
 * Use `create(ReadExpenditureResponseSchema)` to create a new message.
 */
export declare const ReadExpenditureResponseSchema: GenMessage<ReadExpenditureResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureRequest
 */
export type UpdateExpenditureRequest = Message<"domain.expenditure.v1.UpdateExpenditureRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Expenditure data = 1;
     */
    data?: Expenditure;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenditureRequest.
 * Use `create(UpdateExpenditureRequestSchema)` to create a new message.
 */
export declare const UpdateExpenditureRequestSchema: GenMessage<UpdateExpenditureRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenditureResponse
 */
export type UpdateExpenditureResponse = Message<"domain.expenditure.v1.UpdateExpenditureResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Expenditure data = 1;
     */
    data: Expenditure[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenditureResponse.
 * Use `create(UpdateExpenditureResponseSchema)` to create a new message.
 */
export declare const UpdateExpenditureResponseSchema: GenMessage<UpdateExpenditureResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureRequest
 */
export type DeleteExpenditureRequest = Message<"domain.expenditure.v1.DeleteExpenditureRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.Expenditure data = 1;
     */
    data?: Expenditure;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenditureRequest.
 * Use `create(DeleteExpenditureRequestSchema)` to create a new message.
 */
export declare const DeleteExpenditureRequestSchema: GenMessage<DeleteExpenditureRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenditureResponse
 */
export type DeleteExpenditureResponse = Message<"domain.expenditure.v1.DeleteExpenditureResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenditureResponse.
 * Use `create(DeleteExpenditureResponseSchema)` to create a new message.
 */
export declare const DeleteExpenditureResponseSchema: GenMessage<DeleteExpenditureResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpendituresRequest
 */
export type ListExpendituresRequest = Message<"domain.expenditure.v1.ListExpendituresRequest"> & {
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
 * Describes the message domain.expenditure.v1.ListExpendituresRequest.
 * Use `create(ListExpendituresRequestSchema)` to create a new message.
 */
export declare const ListExpendituresRequestSchema: GenMessage<ListExpendituresRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpendituresResponse
 */
export type ListExpendituresResponse = Message<"domain.expenditure.v1.ListExpendituresResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Expenditure data = 1;
     */
    data: Expenditure[];
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
 * Describes the message domain.expenditure.v1.ListExpendituresResponse.
 * Use `create(ListExpendituresResponseSchema)` to create a new message.
 */
export declare const ListExpendituresResponseSchema: GenMessage<ListExpendituresResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureListPageDataRequest
 */
export type GetExpenditureListPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetExpenditureListPageDataRequest.
 * Use `create(GetExpenditureListPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureListPageDataRequestSchema: GenMessage<GetExpenditureListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureListPageDataResponse
 */
export type GetExpenditureListPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.Expenditure expenditure_list = 1;
     */
    expenditureList: Expenditure[];
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
 * Describes the message domain.expenditure.v1.GetExpenditureListPageDataResponse.
 * Use `create(GetExpenditureListPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureListPageDataResponseSchema: GenMessage<GetExpenditureListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureItemPageDataRequest
 */
export type GetExpenditureItemPageDataRequest = Message<"domain.expenditure.v1.GetExpenditureItemPageDataRequest"> & {
    /**
     * @generated from field: string expenditure_id = 1;
     */
    expenditureId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenditureItemPageDataRequest.
 * Use `create(GetExpenditureItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenditureItemPageDataRequestSchema: GenMessage<GetExpenditureItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenditureItemPageDataResponse
 */
export type GetExpenditureItemPageDataResponse = Message<"domain.expenditure.v1.GetExpenditureItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.Expenditure expenditure = 1;
     */
    expenditure?: Expenditure;
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
 * Describes the message domain.expenditure.v1.GetExpenditureItemPageDataResponse.
 * Use `create(GetExpenditureItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenditureItemPageDataResponseSchema: GenMessage<GetExpenditureItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.ExpenditureDomainService
 */
export declare const ExpenditureDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.CreateExpenditure
     */
    createExpenditure: {
        methodKind: "unary";
        input: typeof CreateExpenditureRequestSchema;
        output: typeof CreateExpenditureResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.ReadExpenditure
     */
    readExpenditure: {
        methodKind: "unary";
        input: typeof ReadExpenditureRequestSchema;
        output: typeof ReadExpenditureResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.UpdateExpenditure
     */
    updateExpenditure: {
        methodKind: "unary";
        input: typeof UpdateExpenditureRequestSchema;
        output: typeof UpdateExpenditureResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.DeleteExpenditure
     */
    deleteExpenditure: {
        methodKind: "unary";
        input: typeof DeleteExpenditureRequestSchema;
        output: typeof DeleteExpenditureResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.ListExpenditures
     */
    listExpenditures: {
        methodKind: "unary";
        input: typeof ListExpendituresRequestSchema;
        output: typeof ListExpendituresResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.GetExpenditureListPageData
     */
    getExpenditureListPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureListPageDataRequestSchema;
        output: typeof GetExpenditureListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenditureDomainService.GetExpenditureItemPageData
     */
    getExpenditureItemPageData: {
        methodKind: "unary";
        input: typeof GetExpenditureItemPageDataRequestSchema;
        output: typeof GetExpenditureItemPageDataResponseSchema;
    };
}>;
