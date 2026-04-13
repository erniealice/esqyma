import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/journal_entry/journal_entry.proto.
 */
export declare const file_domain_ledger_journal_entry_journal_entry: GenFile;
/**
 * JournalEntry is the double-entry bookkeeping record. Each entry must have
 * equal total debits and total credits across its journal lines.
 *
 * @generated from message domain.ledger.v1.JournalEntry
 */
export type JournalEntry = Message<"domain.ledger.v1.JournalEntry"> & {
    /**
     * Core identity
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string entry_number = 2;
     */
    entryNumber: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
    /**
     * Date — unix timestamp + display string
     *
     * @generated from field: int64 entry_date = 4;
     */
    entryDate: bigint;
    /**
     * @generated from field: optional string entry_date_string = 5;
     */
    entryDateString?: string;
    /**
     * Status and source traceability
     *
     * @generated from field: domain.ledger.v1.JournalEntryStatus status = 6;
     */
    status: JournalEntryStatus;
    /**
     * @generated from field: domain.ledger.v1.JournalSourceType source_type = 7;
     */
    sourceType: JournalSourceType;
    /**
     * FK to originating entity
     *
     * @generated from field: optional string source_id = 8;
     */
    sourceId?: string;
    /**
     * Fiscal period association
     *
     * @generated from field: optional string fiscal_period_id = 9;
     */
    fiscalPeriodId?: string;
    /**
     * Totals — must balance (total_debit == total_credit)
     *
     * centavos
     *
     * @generated from field: int64 total_debit = 10;
     */
    totalDebit: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_credit = 11;
     */
    totalCredit: bigint;
    /**
     * Posting audit
     *
     * FK to entity.User
     *
     * @generated from field: optional string posted_by = 12;
     */
    postedBy?: string;
    /**
     * @generated from field: optional int64 posted_at = 13;
     */
    postedAt?: bigint;
    /**
     * @generated from field: optional string posted_at_string = 14;
     */
    postedAtString?: string;
    /**
     * Reversal
     *
     * FK to entity.User
     *
     * @generated from field: optional string reversed_by = 15;
     */
    reversedBy?: string;
    /**
     * @generated from field: optional int64 reversed_at = 16;
     */
    reversedAt?: bigint;
    /**
     * @generated from field: optional string reversed_at_string = 17;
     */
    reversedAtString?: string;
    /**
     * @generated from field: optional string reversal_entry_id = 18;
     */
    reversalEntryId?: string;
    /**
     * @generated from field: optional string notes = 19;
     */
    notes?: string;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 20;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 21;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 22;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 23;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 24;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.ledger.v1.JournalEntry.
 * Use `create(JournalEntrySchema)` to create a new message.
 */
export declare const JournalEntrySchema: GenMessage<JournalEntry>;
/**
 * @generated from message domain.ledger.v1.CreateJournalEntryRequest
 */
export type CreateJournalEntryRequest = Message<"domain.ledger.v1.CreateJournalEntryRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalEntry data = 1;
     */
    data?: JournalEntry;
};
/**
 * Describes the message domain.ledger.v1.CreateJournalEntryRequest.
 * Use `create(CreateJournalEntryRequestSchema)` to create a new message.
 */
export declare const CreateJournalEntryRequestSchema: GenMessage<CreateJournalEntryRequest>;
/**
 * @generated from message domain.ledger.v1.CreateJournalEntryResponse
 */
export type CreateJournalEntryResponse = Message<"domain.ledger.v1.CreateJournalEntryResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry data = 1;
     */
    data: JournalEntry[];
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
 * Describes the message domain.ledger.v1.CreateJournalEntryResponse.
 * Use `create(CreateJournalEntryResponseSchema)` to create a new message.
 */
export declare const CreateJournalEntryResponseSchema: GenMessage<CreateJournalEntryResponse>;
/**
 * @generated from message domain.ledger.v1.ReadJournalEntryRequest
 */
export type ReadJournalEntryRequest = Message<"domain.ledger.v1.ReadJournalEntryRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalEntry data = 1;
     */
    data?: JournalEntry;
};
/**
 * Describes the message domain.ledger.v1.ReadJournalEntryRequest.
 * Use `create(ReadJournalEntryRequestSchema)` to create a new message.
 */
export declare const ReadJournalEntryRequestSchema: GenMessage<ReadJournalEntryRequest>;
/**
 * @generated from message domain.ledger.v1.ReadJournalEntryResponse
 */
export type ReadJournalEntryResponse = Message<"domain.ledger.v1.ReadJournalEntryResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry data = 1;
     */
    data: JournalEntry[];
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
 * Describes the message domain.ledger.v1.ReadJournalEntryResponse.
 * Use `create(ReadJournalEntryResponseSchema)` to create a new message.
 */
export declare const ReadJournalEntryResponseSchema: GenMessage<ReadJournalEntryResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateJournalEntryRequest
 */
export type UpdateJournalEntryRequest = Message<"domain.ledger.v1.UpdateJournalEntryRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalEntry data = 1;
     */
    data?: JournalEntry;
};
/**
 * Describes the message domain.ledger.v1.UpdateJournalEntryRequest.
 * Use `create(UpdateJournalEntryRequestSchema)` to create a new message.
 */
export declare const UpdateJournalEntryRequestSchema: GenMessage<UpdateJournalEntryRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateJournalEntryResponse
 */
export type UpdateJournalEntryResponse = Message<"domain.ledger.v1.UpdateJournalEntryResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry data = 1;
     */
    data: JournalEntry[];
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
 * Describes the message domain.ledger.v1.UpdateJournalEntryResponse.
 * Use `create(UpdateJournalEntryResponseSchema)` to create a new message.
 */
export declare const UpdateJournalEntryResponseSchema: GenMessage<UpdateJournalEntryResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteJournalEntryRequest
 */
export type DeleteJournalEntryRequest = Message<"domain.ledger.v1.DeleteJournalEntryRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalEntry data = 1;
     */
    data?: JournalEntry;
};
/**
 * Describes the message domain.ledger.v1.DeleteJournalEntryRequest.
 * Use `create(DeleteJournalEntryRequestSchema)` to create a new message.
 */
export declare const DeleteJournalEntryRequestSchema: GenMessage<DeleteJournalEntryRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteJournalEntryResponse
 */
export type DeleteJournalEntryResponse = Message<"domain.ledger.v1.DeleteJournalEntryResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteJournalEntryResponse.
 * Use `create(DeleteJournalEntryResponseSchema)` to create a new message.
 */
export declare const DeleteJournalEntryResponseSchema: GenMessage<DeleteJournalEntryResponse>;
/**
 * @generated from message domain.ledger.v1.ListJournalEntriesRequest
 */
export type ListJournalEntriesRequest = Message<"domain.ledger.v1.ListJournalEntriesRequest"> & {
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
 * Describes the message domain.ledger.v1.ListJournalEntriesRequest.
 * Use `create(ListJournalEntriesRequestSchema)` to create a new message.
 */
export declare const ListJournalEntriesRequestSchema: GenMessage<ListJournalEntriesRequest>;
/**
 * @generated from message domain.ledger.v1.ListJournalEntriesResponse
 */
export type ListJournalEntriesResponse = Message<"domain.ledger.v1.ListJournalEntriesResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry data = 1;
     */
    data: JournalEntry[];
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
 * Describes the message domain.ledger.v1.ListJournalEntriesResponse.
 * Use `create(ListJournalEntriesResponseSchema)` to create a new message.
 */
export declare const ListJournalEntriesResponseSchema: GenMessage<ListJournalEntriesResponse>;
/**
 * @generated from message domain.ledger.v1.GetJournalEntryListPageDataRequest
 */
export type GetJournalEntryListPageDataRequest = Message<"domain.ledger.v1.GetJournalEntryListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetJournalEntryListPageDataRequest.
 * Use `create(GetJournalEntryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJournalEntryListPageDataRequestSchema: GenMessage<GetJournalEntryListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetJournalEntryListPageDataResponse
 */
export type GetJournalEntryListPageDataResponse = Message<"domain.ledger.v1.GetJournalEntryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry journal_entry_list = 1;
     */
    journalEntryList: JournalEntry[];
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
 * Describes the message domain.ledger.v1.GetJournalEntryListPageDataResponse.
 * Use `create(GetJournalEntryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJournalEntryListPageDataResponseSchema: GenMessage<GetJournalEntryListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetJournalEntryItemPageDataRequest
 */
export type GetJournalEntryItemPageDataRequest = Message<"domain.ledger.v1.GetJournalEntryItemPageDataRequest"> & {
    /**
     * @generated from field: string journal_entry_id = 1;
     */
    journalEntryId: string;
};
/**
 * Describes the message domain.ledger.v1.GetJournalEntryItemPageDataRequest.
 * Use `create(GetJournalEntryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJournalEntryItemPageDataRequestSchema: GenMessage<GetJournalEntryItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetJournalEntryItemPageDataResponse
 */
export type GetJournalEntryItemPageDataResponse = Message<"domain.ledger.v1.GetJournalEntryItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.JournalEntry journal_entry = 1;
     */
    journalEntry?: JournalEntry;
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
 * Describes the message domain.ledger.v1.GetJournalEntryItemPageDataResponse.
 * Use `create(GetJournalEntryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJournalEntryItemPageDataResponseSchema: GenMessage<GetJournalEntryItemPageDataResponse>;
/**
 * Lifecycle: Post a draft journal entry (validates debit == credit, transitions to POSTED)
 *
 * @generated from message domain.ledger.v1.PostJournalEntryRequest
 */
export type PostJournalEntryRequest = Message<"domain.ledger.v1.PostJournalEntryRequest"> & {
    /**
     * @generated from field: string journal_entry_id = 1;
     */
    journalEntryId: string;
    /**
     * FK to entity.User (maker-checker: second authorizer for manual JEs)
     *
     * @generated from field: string posted_by = 2;
     */
    postedBy: string;
};
/**
 * Describes the message domain.ledger.v1.PostJournalEntryRequest.
 * Use `create(PostJournalEntryRequestSchema)` to create a new message.
 */
export declare const PostJournalEntryRequestSchema: GenMessage<PostJournalEntryRequest>;
/**
 * @generated from message domain.ledger.v1.PostJournalEntryResponse
 */
export type PostJournalEntryResponse = Message<"domain.ledger.v1.PostJournalEntryResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalEntry data = 1;
     */
    data: JournalEntry[];
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
 * Describes the message domain.ledger.v1.PostJournalEntryResponse.
 * Use `create(PostJournalEntryResponseSchema)` to create a new message.
 */
export declare const PostJournalEntryResponseSchema: GenMessage<PostJournalEntryResponse>;
/**
 * Lifecycle: Reverse a posted journal entry (creates mirror entry with opposite debits/credits)
 *
 * @generated from message domain.ledger.v1.ReverseJournalEntryRequest
 */
export type ReverseJournalEntryRequest = Message<"domain.ledger.v1.ReverseJournalEntryRequest"> & {
    /**
     * @generated from field: string journal_entry_id = 1;
     */
    journalEntryId: string;
    /**
     * FK to entity.User
     *
     * @generated from field: string reversed_by = 2;
     */
    reversedBy: string;
    /**
     * Effective date for the reversal entry
     *
     * @generated from field: int64 reversal_date = 3;
     */
    reversalDate: bigint;
    /**
     * @generated from field: optional string reason = 4;
     */
    reason?: string;
};
/**
 * Describes the message domain.ledger.v1.ReverseJournalEntryRequest.
 * Use `create(ReverseJournalEntryRequestSchema)` to create a new message.
 */
export declare const ReverseJournalEntryRequestSchema: GenMessage<ReverseJournalEntryRequest>;
/**
 * @generated from message domain.ledger.v1.ReverseJournalEntryResponse
 */
export type ReverseJournalEntryResponse = Message<"domain.ledger.v1.ReverseJournalEntryResponse"> & {
    /**
     * Includes the new reversal entry
     *
     * @generated from field: repeated domain.ledger.v1.JournalEntry data = 1;
     */
    data: JournalEntry[];
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
 * Describes the message domain.ledger.v1.ReverseJournalEntryResponse.
 * Use `create(ReverseJournalEntryResponseSchema)` to create a new message.
 */
export declare const ReverseJournalEntryResponseSchema: GenMessage<ReverseJournalEntryResponse>;
/**
 * JournalEntryStatus represents the lifecycle state of a journal entry.
 *
 * @generated from enum domain.ledger.v1.JournalEntryStatus
 */
export declare enum JournalEntryStatus {
    /**
     * @generated from enum value: JOURNAL_ENTRY_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: JOURNAL_ENTRY_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: JOURNAL_ENTRY_STATUS_POSTED = 2;
     */
    POSTED = 2,
    /**
     * @generated from enum value: JOURNAL_ENTRY_STATUS_REVERSED = 3;
     */
    REVERSED = 3
}
/**
 * Describes the enum domain.ledger.v1.JournalEntryStatus.
 */
export declare const JournalEntryStatusSchema: GenEnum<JournalEntryStatus>;
/**
 * JournalSourceType identifies the business event that originated this journal entry.
 * Used for bidirectional traceability between operational transactions and the ledger.
 *
 * @generated from enum domain.ledger.v1.JournalSourceType
 */
export declare enum JournalSourceType {
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_MANUAL = 1;
     */
    MANUAL = 1,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_REVENUE = 2;
     */
    REVENUE = 2,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_EXPENDITURE = 3;
     */
    EXPENDITURE = 3,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_COLLECTION = 4;
     */
    COLLECTION = 4,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_DISBURSEMENT = 5;
     */
    DISBURSEMENT = 5,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_DEPRECIATION = 6;
     */
    DEPRECIATION = 6,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_ASSET_ACQUISITION = 7;
     */
    ASSET_ACQUISITION = 7,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_ASSET_DISPOSAL = 8;
     */
    ASSET_DISPOSAL = 8,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_PREPAYMENT = 9;
     */
    PREPAYMENT = 9,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_PREPAYMENT_AMORTIZATION = 10;
     */
    PREPAYMENT_AMORTIZATION = 10,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_LOAN_RECEIPT = 11;
     */
    LOAN_RECEIPT = 11,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_LOAN_PAYMENT = 12;
     */
    LOAN_PAYMENT = 12,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_LOAN_FEE_AMORTIZATION = 13;
     */
    LOAN_FEE_AMORTIZATION = 13,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_PETTY_CASH_REPLENISHMENT = 14;
     */
    PETTY_CASH_REPLENISHMENT = 14,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_BAD_DEBT_PROVISION = 15;
     */
    BAD_DEBT_PROVISION = 15,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_DEFERRED_REVENUE = 16;
     */
    DEFERRED_REVENUE = 16,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_DEFERRED_REVENUE_RECOGNITION = 17;
     */
    DEFERRED_REVENUE_RECOGNITION = 17,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_COLLECTION_APPLICATION = 18;
     */
    COLLECTION_APPLICATION = 18,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_DEBT_RECLASSIFICATION = 19;
     */
    DEBT_RECLASSIFICATION = 19,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_EQUITY_CONTRIBUTION = 20;
     */
    EQUITY_CONTRIBUTION = 20,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_EQUITY_WITHDRAWAL = 21;
     */
    EQUITY_WITHDRAWAL = 21,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_EQUITY_DISTRIBUTION = 22;
     */
    EQUITY_DISTRIBUTION = 22,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_YEAR_END_CLOSE = 23;
     */
    YEAR_END_CLOSE = 23,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_RECURRING = 24;
     */
    RECURRING = 24,
    /**
     * @generated from enum value: JOURNAL_SOURCE_TYPE_PAYROLL = 25;
     */
    PAYROLL = 25
}
/**
 * Describes the enum domain.ledger.v1.JournalSourceType.
 */
export declare const JournalSourceTypeSchema: GenEnum<JournalSourceType>;
/**
 * @generated from service domain.ledger.v1.JournalEntryDomainService
 */
export declare const JournalEntryDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.CreateJournalEntry
     */
    createJournalEntry: {
        methodKind: "unary";
        input: typeof CreateJournalEntryRequestSchema;
        output: typeof CreateJournalEntryResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.ReadJournalEntry
     */
    readJournalEntry: {
        methodKind: "unary";
        input: typeof ReadJournalEntryRequestSchema;
        output: typeof ReadJournalEntryResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.UpdateJournalEntry
     */
    updateJournalEntry: {
        methodKind: "unary";
        input: typeof UpdateJournalEntryRequestSchema;
        output: typeof UpdateJournalEntryResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.DeleteJournalEntry
     */
    deleteJournalEntry: {
        methodKind: "unary";
        input: typeof DeleteJournalEntryRequestSchema;
        output: typeof DeleteJournalEntryResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.ListJournalEntries
     */
    listJournalEntries: {
        methodKind: "unary";
        input: typeof ListJournalEntriesRequestSchema;
        output: typeof ListJournalEntriesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.GetJournalEntryListPageData
     */
    getJournalEntryListPageData: {
        methodKind: "unary";
        input: typeof GetJournalEntryListPageDataRequestSchema;
        output: typeof GetJournalEntryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.GetJournalEntryItemPageData
     */
    getJournalEntryItemPageData: {
        methodKind: "unary";
        input: typeof GetJournalEntryItemPageDataRequestSchema;
        output: typeof GetJournalEntryItemPageDataResponseSchema;
    };
    /**
     * Lifecycle operations
     *
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.PostJournalEntry
     */
    postJournalEntry: {
        methodKind: "unary";
        input: typeof PostJournalEntryRequestSchema;
        output: typeof PostJournalEntryResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalEntryDomainService.ReverseJournalEntry
     */
    reverseJournalEntry: {
        methodKind: "unary";
        input: typeof ReverseJournalEntryRequestSchema;
        output: typeof ReverseJournalEntryResponseSchema;
    };
}>;
