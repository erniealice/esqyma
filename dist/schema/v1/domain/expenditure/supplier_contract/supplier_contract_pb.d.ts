import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Supplier } from "../../entity/supplier/supplier_pb";
import type { PaymentTerm } from "../../entity/payment_term/payment_term_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/supplier_contract/supplier_contract.proto.
 */
export declare const file_domain_expenditure_supplier_contract_supplier_contract: GenFile;
/**
 * SupplierContract is a standing commitment or agreement with a supplier.
 * It sits above PurchaseOrder and Expenditure in the expense hierarchy:
 *   SupplierContract → PurchaseOrder (releases) → Expenditure (bills)
 *
 * Balance fields follow the single-write-boundary rule (plan §11.7 risk #5):
 * only the SupplierContractDomainService use cases may update committed_amount,
 * released_amount, billed_amount, remaining_amount — never PO or Expenditure adapters.
 *
 * @generated from message domain.expenditure.v1.SupplierContract
 */
export type SupplierContract = Message<"domain.expenditure.v1.SupplierContract"> & {
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
     * "AWS Hosting MSA", "HQ Lease 2026"
     *
     * @generated from field: string name = 10;
     */
    name: string;
    /**
     * @generated from field: optional string description = 11;
     */
    description?: string;
    /**
     * supplier's contract/reference number
     *
     * @generated from field: optional string reference_number = 12;
     */
    referenceNumber?: string;
    /**
     * Counterparty
     *
     * @generated from field: string supplier_id = 20;
     */
    supplierId: string;
    /**
     * @generated from field: optional domain.entity.v1.Supplier supplier = 21;
     */
    supplier?: Supplier;
    /**
     * Discriminator
     *
     * @generated from field: domain.expenditure.v1.SupplierContractKind kind = 30;
     */
    kind: SupplierContractKind;
    /**
     * Lifecycle status
     *
     * @generated from field: domain.expenditure.v1.SupplierContractStatus status = 31;
     */
    status: SupplierContractStatus;
    /**
     * Recurrence (required when kind IN SUBSCRIPTION/LEASE/UTILITY, nil otherwise)
     *
     * "ONE_TIME" | "RECURRING" | "CONTRACT"
     *
     * @generated from field: optional string billing_kind = 40;
     */
    billingKind?: string;
    /**
     * e.g. 1
     *
     * @generated from field: optional int32 billing_cycle_value = 41;
     */
    billingCycleValue?: number;
    /**
     * "month" | "year" | "week" | "day"
     *
     * @generated from field: optional string billing_cycle_unit = 42;
     */
    billingCycleUnit?: string;
    /**
     * e.g. 12 (default contract length)
     *
     * @generated from field: optional int32 default_term_value = 43;
     */
    defaultTermValue?: number;
    /**
     * @generated from field: optional string default_term_unit = 44;
     */
    defaultTermUnit?: string;
    /**
     * Validity window
     *
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string date_time_start = 50;
     */
    dateTimeStart: string;
    /**
     * nil = open-ended
     *
     * @generated from field: optional string date_time_end = 51;
     */
    dateTimeEnd?: string;
    /**
     * @generated from field: bool auto_renew = 52;
     */
    autoRenew: boolean;
    /**
     * notify N days before expiry
     *
     * @generated from field: optional int32 renewal_notice_days = 53;
     */
    renewalNoticeDays?: number;
    /**
     * Money (centavos throughout — no exceptions)
     *
     * @generated from field: string currency = 60;
     */
    currency: string;
    /**
     * committed_amount: total committed value at signing (immutable after approval)
     *
     * @generated from field: optional int64 committed_amount = 61;
     */
    committedAmount?: bigint;
    /**
     * released_amount: sum of POs created against this contract (incremented by use case on PO create)
     *
     * @generated from field: optional int64 released_amount = 62;
     */
    releasedAmount?: bigint;
    /**
     * billed_amount: sum of Expenditure rows linked to this contract (incremented on Expenditure post)
     *
     * @generated from field: optional int64 billed_amount = 63;
     */
    billedAmount?: bigint;
    /**
     * remaining_amount: committed_amount - billed_amount (derived; stored for query efficiency)
     *
     * @generated from field: optional int64 remaining_amount = 64;
     */
    remainingAmount?: bigint;
    /**
     * cycle_amount: expected per-cycle charge for recurring types
     *
     * @generated from field: optional int64 cycle_amount = 65;
     */
    cycleAmount?: bigint;
    /**
     * @generated from field: optional string payment_term_id = 66;
     */
    paymentTermId?: string;
    /**
     * @generated from field: optional domain.entity.v1.PaymentTerm payment_term = 67;
     */
    paymentTerm?: PaymentTerm;
    /**
     * Quantity (for blanket kind)
     *
     * @generated from field: optional double commitment_quantity = 70;
     */
    commitmentQuantity?: number;
    /**
     * @generated from field: optional double released_quantity = 71;
     */
    releasedQuantity?: number;
    /**
     * Approval workflow
     *
     * user_id of requester
     *
     * @generated from field: optional string requested_by = 80;
     */
    requestedBy?: string;
    /**
     * @generated from field: optional int64 requested_date = 81;
     */
    requestedDate?: bigint;
    /**
     * @generated from field: optional string requested_date_string = 82;
     */
    requestedDateString?: string;
    /**
     * @generated from field: optional string approved_by = 83;
     */
    approvedBy?: string;
    /**
     * @generated from field: optional int64 approved_date = 84;
     */
    approvedDate?: bigint;
    /**
     * @generated from field: optional string approved_date_string = 85;
     */
    approvedDateString?: string;
    /**
     * @generated from field: optional string rejection_reason = 86;
     */
    rejectionReason?: string;
    /**
     * Location scoping
     *
     * @generated from field: optional string location_id = 90;
     */
    locationId?: string;
    /**
     * GL mapping
     *
     * @generated from field: optional string expense_account_id = 100;
     */
    expenseAccountId?: string;
    /**
     * @generated from field: optional string accrual_account_id = 101;
     */
    accrualAccountId?: string;
    /**
     * Categorization
     *
     * @generated from field: optional string expenditure_category_id = 110;
     */
    expenditureCategoryId?: string;
    /**
     * Notes & metadata
     *
     * @generated from field: optional string notes = 120;
     */
    notes?: string;
    /**
     * @generated from field: map<string, string> metadata = 121;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.expenditure.v1.SupplierContract.
 * Use `create(SupplierContractSchema)` to create a new message.
 */
export declare const SupplierContractSchema: GenMessage<SupplierContract>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractRequest
 */
export type CreateSupplierContractRequest = Message<"domain.expenditure.v1.CreateSupplierContractRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContract data = 1;
     */
    data?: SupplierContract;
};
/**
 * Describes the message domain.expenditure.v1.CreateSupplierContractRequest.
 * Use `create(CreateSupplierContractRequestSchema)` to create a new message.
 */
export declare const CreateSupplierContractRequestSchema: GenMessage<CreateSupplierContractRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractResponse
 */
export type CreateSupplierContractResponse = Message<"domain.expenditure.v1.CreateSupplierContractResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContract data = 1;
     */
    data: SupplierContract[];
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
 * Describes the message domain.expenditure.v1.CreateSupplierContractResponse.
 * Use `create(CreateSupplierContractResponseSchema)` to create a new message.
 */
export declare const CreateSupplierContractResponseSchema: GenMessage<CreateSupplierContractResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractRequest
 */
export type ReadSupplierContractRequest = Message<"domain.expenditure.v1.ReadSupplierContractRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContract data = 1;
     */
    data?: SupplierContract;
};
/**
 * Describes the message domain.expenditure.v1.ReadSupplierContractRequest.
 * Use `create(ReadSupplierContractRequestSchema)` to create a new message.
 */
export declare const ReadSupplierContractRequestSchema: GenMessage<ReadSupplierContractRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractResponse
 */
export type ReadSupplierContractResponse = Message<"domain.expenditure.v1.ReadSupplierContractResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContract data = 1;
     */
    data: SupplierContract[];
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
 * Describes the message domain.expenditure.v1.ReadSupplierContractResponse.
 * Use `create(ReadSupplierContractResponseSchema)` to create a new message.
 */
export declare const ReadSupplierContractResponseSchema: GenMessage<ReadSupplierContractResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractRequest
 */
export type UpdateSupplierContractRequest = Message<"domain.expenditure.v1.UpdateSupplierContractRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContract data = 1;
     */
    data?: SupplierContract;
};
/**
 * Describes the message domain.expenditure.v1.UpdateSupplierContractRequest.
 * Use `create(UpdateSupplierContractRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierContractRequestSchema: GenMessage<UpdateSupplierContractRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractResponse
 */
export type UpdateSupplierContractResponse = Message<"domain.expenditure.v1.UpdateSupplierContractResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContract data = 1;
     */
    data: SupplierContract[];
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
 * Describes the message domain.expenditure.v1.UpdateSupplierContractResponse.
 * Use `create(UpdateSupplierContractResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierContractResponseSchema: GenMessage<UpdateSupplierContractResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractRequest
 */
export type DeleteSupplierContractRequest = Message<"domain.expenditure.v1.DeleteSupplierContractRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContract data = 1;
     */
    data?: SupplierContract;
};
/**
 * Describes the message domain.expenditure.v1.DeleteSupplierContractRequest.
 * Use `create(DeleteSupplierContractRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierContractRequestSchema: GenMessage<DeleteSupplierContractRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractResponse
 */
export type DeleteSupplierContractResponse = Message<"domain.expenditure.v1.DeleteSupplierContractResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteSupplierContractResponse.
 * Use `create(DeleteSupplierContractResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierContractResponseSchema: GenMessage<DeleteSupplierContractResponse>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractsRequest
 */
export type ListSupplierContractsRequest = Message<"domain.expenditure.v1.ListSupplierContractsRequest"> & {
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
     * @generated from field: optional string supplier_id = 5;
     */
    supplierId?: string;
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractStatus status = 6;
     */
    status?: SupplierContractStatus;
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractKind kind = 7;
     */
    kind?: SupplierContractKind;
    /**
     * @generated from field: optional string workspace_id = 8;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListSupplierContractsRequest.
 * Use `create(ListSupplierContractsRequestSchema)` to create a new message.
 */
export declare const ListSupplierContractsRequestSchema: GenMessage<ListSupplierContractsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractsResponse
 */
export type ListSupplierContractsResponse = Message<"domain.expenditure.v1.ListSupplierContractsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContract data = 1;
     */
    data: SupplierContract[];
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
 * Describes the message domain.expenditure.v1.ListSupplierContractsResponse.
 * Use `create(ListSupplierContractsResponseSchema)` to create a new message.
 */
export declare const ListSupplierContractsResponseSchema: GenMessage<ListSupplierContractsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractListPageDataRequest
 */
export type GetSupplierContractListPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetSupplierContractListPageDataRequest.
 * Use `create(GetSupplierContractListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractListPageDataRequestSchema: GenMessage<GetSupplierContractListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractListPageDataResponse
 */
export type GetSupplierContractListPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContract supplier_contract_list = 1;
     */
    supplierContractList: SupplierContract[];
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
 * Describes the message domain.expenditure.v1.GetSupplierContractListPageDataResponse.
 * Use `create(GetSupplierContractListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractListPageDataResponseSchema: GenMessage<GetSupplierContractListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractItemPageDataRequest
 */
export type GetSupplierContractItemPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_contract_id = 1;
     */
    supplierContractId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetSupplierContractItemPageDataRequest.
 * Use `create(GetSupplierContractItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractItemPageDataRequestSchema: GenMessage<GetSupplierContractItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractItemPageDataResponse
 */
export type GetSupplierContractItemPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContract supplier_contract = 1;
     */
    supplierContract?: SupplierContract;
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
 * Describes the message domain.expenditure.v1.GetSupplierContractItemPageDataResponse.
 * Use `create(GetSupplierContractItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractItemPageDataResponseSchema: GenMessage<GetSupplierContractItemPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.ApproveSupplierContractRequest
 */
export type ApproveSupplierContractRequest = Message<"domain.expenditure.v1.ApproveSupplierContractRequest"> & {
    /**
     * @generated from field: string supplier_contract_id = 1;
     */
    supplierContractId: string;
    /**
     * @generated from field: string approved_by = 2;
     */
    approvedBy: string;
};
/**
 * Describes the message domain.expenditure.v1.ApproveSupplierContractRequest.
 * Use `create(ApproveSupplierContractRequestSchema)` to create a new message.
 */
export declare const ApproveSupplierContractRequestSchema: GenMessage<ApproveSupplierContractRequest>;
/**
 * @generated from message domain.expenditure.v1.ApproveSupplierContractResponse
 */
export type ApproveSupplierContractResponse = Message<"domain.expenditure.v1.ApproveSupplierContractResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContract data = 1;
     */
    data?: SupplierContract;
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
 * Describes the message domain.expenditure.v1.ApproveSupplierContractResponse.
 * Use `create(ApproveSupplierContractResponseSchema)` to create a new message.
 */
export declare const ApproveSupplierContractResponseSchema: GenMessage<ApproveSupplierContractResponse>;
/**
 * @generated from message domain.expenditure.v1.TerminateSupplierContractRequest
 */
export type TerminateSupplierContractRequest = Message<"domain.expenditure.v1.TerminateSupplierContractRequest"> & {
    /**
     * @generated from field: string supplier_contract_id = 1;
     */
    supplierContractId: string;
    /**
     * @generated from field: optional string reason = 2;
     */
    reason?: string;
};
/**
 * Describes the message domain.expenditure.v1.TerminateSupplierContractRequest.
 * Use `create(TerminateSupplierContractRequestSchema)` to create a new message.
 */
export declare const TerminateSupplierContractRequestSchema: GenMessage<TerminateSupplierContractRequest>;
/**
 * @generated from message domain.expenditure.v1.TerminateSupplierContractResponse
 */
export type TerminateSupplierContractResponse = Message<"domain.expenditure.v1.TerminateSupplierContractResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContract data = 1;
     */
    data?: SupplierContract;
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
 * Describes the message domain.expenditure.v1.TerminateSupplierContractResponse.
 * Use `create(TerminateSupplierContractResponseSchema)` to create a new message.
 */
export declare const TerminateSupplierContractResponseSchema: GenMessage<TerminateSupplierContractResponse>;
/**
 * GenerateUpcomingExpendituresRequest — P5 stub.
 * Walks contract cycles from today up to until_date and emits draft Expenditure rows.
 * Implementation deferred to P5 (recurrence engine plan).
 *
 * @generated from message domain.expenditure.v1.GenerateUpcomingExpendituresRequest
 */
export type GenerateUpcomingExpendituresRequest = Message<"domain.expenditure.v1.GenerateUpcomingExpendituresRequest"> & {
    /**
     * @generated from field: string contract_id = 1;
     */
    contractId: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: string until_date = 2;
     */
    untilDate: string;
};
/**
 * Describes the message domain.expenditure.v1.GenerateUpcomingExpendituresRequest.
 * Use `create(GenerateUpcomingExpendituresRequestSchema)` to create a new message.
 */
export declare const GenerateUpcomingExpendituresRequestSchema: GenMessage<GenerateUpcomingExpendituresRequest>;
/**
 * @generated from message domain.expenditure.v1.GenerateUpcomingExpendituresResponse
 */
export type GenerateUpcomingExpendituresResponse = Message<"domain.expenditure.v1.GenerateUpcomingExpendituresResponse"> & {
    /**
     * @generated from field: int32 generated_count = 1;
     */
    generatedCount: number;
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
 * Describes the message domain.expenditure.v1.GenerateUpcomingExpendituresResponse.
 * Use `create(GenerateUpcomingExpendituresResponseSchema)` to create a new message.
 */
export declare const GenerateUpcomingExpendituresResponseSchema: GenMessage<GenerateUpcomingExpendituresResponse>;
/**
 * SupplierContractKind discriminates the type of commitment.
 * Use SUBSCRIPTION for any recurring time-based obligation (SaaS, retainer, hosting,
 * snack boxes, magazine subscriptions, etc.) — not just software.
 *
 * @generated from enum domain.expenditure.v1.SupplierContractKind
 */
export declare enum SupplierContractKind {
    /**
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * recurring time-based (renamed from SAAS)
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_SUBSCRIPTION = 1;
     */
    SUBSCRIPTION = 1,
    /**
     * professional services retainer
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_RETAINER = 2;
     */
    RETAINER = 2,
    /**
     * asset-backed recurring (rent, equipment)
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_LEASE = 3;
     */
    LEASE = 3,
    /**
     * utility/variable-consumption contract
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_UTILITY = 4;
     */
    UTILITY = 4,
    /**
     * pricing agreement only, no commitment value
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_FRAMEWORK = 5;
     */
    FRAMEWORK = 5,
    /**
     * quantity-based committed PO over a window
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_BLANKET = 6;
     */
    BLANKET = 6,
    /**
     * single-shot agreement worth tracking
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_ONE_TIME = 7;
     */
    ONE_TIME = 7,
    /**
     * catch-all
     *
     * @generated from enum value: SUPPLIER_CONTRACT_KIND_OTHER = 8;
     */
    OTHER = 8
}
/**
 * Describes the enum domain.expenditure.v1.SupplierContractKind.
 */
export declare const SupplierContractKindSchema: GenEnum<SupplierContractKind>;
/**
 * SupplierContractStatus drives the lifecycle state machine.
 * See plan §3.3 for transition rules.
 *
 * @generated from enum domain.expenditure.v1.SupplierContractStatus
 */
export declare enum SupplierContractStatus {
    /**
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * editing, not yet submitted
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * submitted by requester, awaiting approval
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_REQUESTED = 2;
     */
    REQUESTED = 2,
    /**
     * in approver queue
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_PENDING_APPROVAL = 3;
     */
    PENDING_APPROVAL = 3,
    /**
     * approved, not yet active
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_APPROVED = 4;
     */
    APPROVED = 4,
    /**
     * in-force, generating expenditures on cycle
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_ACTIVE = 5;
     */
    ACTIVE = 5,
    /**
     * within renewal_notice_days of date_time_end
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_EXPIRING = 6;
     */
    EXPIRING = 6,
    /**
     * transient pause from active
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_SUSPENDED = 7;
     */
    SUSPENDED = 7,
    /**
     * past date_time_end, no auto-renew (terminal)
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_EXPIRED = 8;
     */
    EXPIRED = 8,
    /**
     * manually cancelled or breached (terminal)
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_TERMINATED = 9;
     */
    TERMINATED = 9,
    /**
     * request denied (terminal)
     *
     * @generated from enum value: SUPPLIER_CONTRACT_STATUS_REJECTED = 10;
     */
    REJECTED = 10
}
/**
 * Describes the enum domain.expenditure.v1.SupplierContractStatus.
 */
export declare const SupplierContractStatusSchema: GenEnum<SupplierContractStatus>;
/**
 * @generated from service domain.expenditure.v1.SupplierContractDomainService
 */
export declare const SupplierContractDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.CreateSupplierContract
     */
    createSupplierContract: {
        methodKind: "unary";
        input: typeof CreateSupplierContractRequestSchema;
        output: typeof CreateSupplierContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.ReadSupplierContract
     */
    readSupplierContract: {
        methodKind: "unary";
        input: typeof ReadSupplierContractRequestSchema;
        output: typeof ReadSupplierContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.UpdateSupplierContract
     */
    updateSupplierContract: {
        methodKind: "unary";
        input: typeof UpdateSupplierContractRequestSchema;
        output: typeof UpdateSupplierContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.DeleteSupplierContract
     */
    deleteSupplierContract: {
        methodKind: "unary";
        input: typeof DeleteSupplierContractRequestSchema;
        output: typeof DeleteSupplierContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.ListSupplierContracts
     */
    listSupplierContracts: {
        methodKind: "unary";
        input: typeof ListSupplierContractsRequestSchema;
        output: typeof ListSupplierContractsResponseSchema;
    };
    /**
     * Page data for UI views
     *
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.GetSupplierContractListPageData
     */
    getSupplierContractListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractListPageDataRequestSchema;
        output: typeof GetSupplierContractListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.GetSupplierContractItemPageData
     */
    getSupplierContractItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractItemPageDataRequestSchema;
        output: typeof GetSupplierContractItemPageDataResponseSchema;
    };
    /**
     * Workflow actions
     *
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.ApproveSupplierContract
     */
    approveSupplierContract: {
        methodKind: "unary";
        input: typeof ApproveSupplierContractRequestSchema;
        output: typeof ApproveSupplierContractResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.TerminateSupplierContract
     */
    terminateSupplierContract: {
        methodKind: "unary";
        input: typeof TerminateSupplierContractRequestSchema;
        output: typeof TerminateSupplierContractResponseSchema;
    };
    /**
     * P5 stub — recurrence engine; implementation deferred
     *
     * @generated from rpc domain.expenditure.v1.SupplierContractDomainService.GenerateUpcomingExpenditures
     */
    generateUpcomingExpenditures: {
        methodKind: "unary";
        input: typeof GenerateUpcomingExpendituresRequestSchema;
        output: typeof GenerateUpcomingExpendituresResponseSchema;
    };
}>;
