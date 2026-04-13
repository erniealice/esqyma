import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/recurring_journal_template/recurring_journal_template.proto.
 */
export declare const file_domain_ledger_recurring_journal_template_recurring_journal_template: GenFile;
/**
 * RecurringJournalTemplateLine defines one debit or credit line in the template.
 * Mirrors the structure of JournalLine but belongs to a template, not a live entry.
 *
 * @generated from message domain.ledger.v1.RecurringJournalTemplateLine
 */
export type RecurringJournalTemplateLine = Message<"domain.ledger.v1.RecurringJournalTemplateLine"> & {
    /**
     * FK to account
     *
     * @generated from field: string account_id = 1;
     */
    accountId: string;
    /**
     * @generated from field: optional string description = 2;
     */
    description?: string;
    /**
     * centavos
     *
     * @generated from field: int64 debit_amount = 3;
     */
    debitAmount: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 credit_amount = 4;
     */
    creditAmount: bigint;
    /**
     * @generated from field: int32 line_order = 5;
     */
    lineOrder: number;
};
/**
 * Describes the message domain.ledger.v1.RecurringJournalTemplateLine.
 * Use `create(RecurringJournalTemplateLineSchema)` to create a new message.
 */
export declare const RecurringJournalTemplateLineSchema: GenMessage<RecurringJournalTemplateLine>;
/**
 * RecurringJournalTemplate is a system-scheduled template that generates JournalEntry
 * records automatically on each recurrence date (e.g. monthly depreciation, rent).
 *
 * @generated from message domain.ledger.v1.RecurringJournalTemplate
 */
export type RecurringJournalTemplate = Message<"domain.ledger.v1.RecurringJournalTemplate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: optional string description = 3;
     */
    description?: string;
    /**
     * @generated from field: domain.ledger.v1.RecurrenceFrequency frequency = 4;
     */
    frequency: RecurrenceFrequency;
    /**
     * Schedule — next_run_date is updated after each successful generation
     *
     * @generated from field: int64 next_run_date = 5;
     */
    nextRunDate: bigint;
    /**
     * @generated from field: optional string next_run_date_string = 6;
     */
    nextRunDateString?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — Null = runs indefinitely
     *
     * @generated from field: optional string end_date = 7;
     */
    endDate?: string;
    /**
     * Template description copied to each generated JournalEntry
     *
     * @generated from field: string template_description = 9;
     */
    templateDescription: string;
    /**
     * Template lines — embedded for reads; stored separately in DB
     *
     * @generated from field: repeated domain.ledger.v1.RecurringJournalTemplateLine lines = 10;
     */
    lines: RecurringJournalTemplateLine[];
    /**
     * Audit fields
     *
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.ledger.v1.RecurringJournalTemplate.
 * Use `create(RecurringJournalTemplateSchema)` to create a new message.
 */
export declare const RecurringJournalTemplateSchema: GenMessage<RecurringJournalTemplate>;
/**
 * @generated from message domain.ledger.v1.CreateRecurringJournalTemplateRequest
 */
export type CreateRecurringJournalTemplateRequest = Message<"domain.ledger.v1.CreateRecurringJournalTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data?: RecurringJournalTemplate;
};
/**
 * Describes the message domain.ledger.v1.CreateRecurringJournalTemplateRequest.
 * Use `create(CreateRecurringJournalTemplateRequestSchema)` to create a new message.
 */
export declare const CreateRecurringJournalTemplateRequestSchema: GenMessage<CreateRecurringJournalTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.CreateRecurringJournalTemplateResponse
 */
export type CreateRecurringJournalTemplateResponse = Message<"domain.ledger.v1.CreateRecurringJournalTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data: RecurringJournalTemplate[];
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
 * Describes the message domain.ledger.v1.CreateRecurringJournalTemplateResponse.
 * Use `create(CreateRecurringJournalTemplateResponseSchema)` to create a new message.
 */
export declare const CreateRecurringJournalTemplateResponseSchema: GenMessage<CreateRecurringJournalTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.ReadRecurringJournalTemplateRequest
 */
export type ReadRecurringJournalTemplateRequest = Message<"domain.ledger.v1.ReadRecurringJournalTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data?: RecurringJournalTemplate;
};
/**
 * Describes the message domain.ledger.v1.ReadRecurringJournalTemplateRequest.
 * Use `create(ReadRecurringJournalTemplateRequestSchema)` to create a new message.
 */
export declare const ReadRecurringJournalTemplateRequestSchema: GenMessage<ReadRecurringJournalTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.ReadRecurringJournalTemplateResponse
 */
export type ReadRecurringJournalTemplateResponse = Message<"domain.ledger.v1.ReadRecurringJournalTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data: RecurringJournalTemplate[];
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
 * Describes the message domain.ledger.v1.ReadRecurringJournalTemplateResponse.
 * Use `create(ReadRecurringJournalTemplateResponseSchema)` to create a new message.
 */
export declare const ReadRecurringJournalTemplateResponseSchema: GenMessage<ReadRecurringJournalTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateRecurringJournalTemplateRequest
 */
export type UpdateRecurringJournalTemplateRequest = Message<"domain.ledger.v1.UpdateRecurringJournalTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data?: RecurringJournalTemplate;
};
/**
 * Describes the message domain.ledger.v1.UpdateRecurringJournalTemplateRequest.
 * Use `create(UpdateRecurringJournalTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateRecurringJournalTemplateRequestSchema: GenMessage<UpdateRecurringJournalTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateRecurringJournalTemplateResponse
 */
export type UpdateRecurringJournalTemplateResponse = Message<"domain.ledger.v1.UpdateRecurringJournalTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data: RecurringJournalTemplate[];
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
 * Describes the message domain.ledger.v1.UpdateRecurringJournalTemplateResponse.
 * Use `create(UpdateRecurringJournalTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateRecurringJournalTemplateResponseSchema: GenMessage<UpdateRecurringJournalTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteRecurringJournalTemplateRequest
 */
export type DeleteRecurringJournalTemplateRequest = Message<"domain.ledger.v1.DeleteRecurringJournalTemplateRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data?: RecurringJournalTemplate;
};
/**
 * Describes the message domain.ledger.v1.DeleteRecurringJournalTemplateRequest.
 * Use `create(DeleteRecurringJournalTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteRecurringJournalTemplateRequestSchema: GenMessage<DeleteRecurringJournalTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteRecurringJournalTemplateResponse
 */
export type DeleteRecurringJournalTemplateResponse = Message<"domain.ledger.v1.DeleteRecurringJournalTemplateResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteRecurringJournalTemplateResponse.
 * Use `create(DeleteRecurringJournalTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteRecurringJournalTemplateResponseSchema: GenMessage<DeleteRecurringJournalTemplateResponse>;
/**
 * @generated from message domain.ledger.v1.ListRecurringJournalTemplatesRequest
 */
export type ListRecurringJournalTemplatesRequest = Message<"domain.ledger.v1.ListRecurringJournalTemplatesRequest"> & {
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
 * Describes the message domain.ledger.v1.ListRecurringJournalTemplatesRequest.
 * Use `create(ListRecurringJournalTemplatesRequestSchema)` to create a new message.
 */
export declare const ListRecurringJournalTemplatesRequestSchema: GenMessage<ListRecurringJournalTemplatesRequest>;
/**
 * @generated from message domain.ledger.v1.ListRecurringJournalTemplatesResponse
 */
export type ListRecurringJournalTemplatesResponse = Message<"domain.ledger.v1.ListRecurringJournalTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.RecurringJournalTemplate data = 1;
     */
    data: RecurringJournalTemplate[];
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
 * Describes the message domain.ledger.v1.ListRecurringJournalTemplatesResponse.
 * Use `create(ListRecurringJournalTemplatesResponseSchema)` to create a new message.
 */
export declare const ListRecurringJournalTemplatesResponseSchema: GenMessage<ListRecurringJournalTemplatesResponse>;
/**
 * @generated from message domain.ledger.v1.GetRecurringJournalTemplateListPageDataRequest
 */
export type GetRecurringJournalTemplateListPageDataRequest = Message<"domain.ledger.v1.GetRecurringJournalTemplateListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetRecurringJournalTemplateListPageDataRequest.
 * Use `create(GetRecurringJournalTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRecurringJournalTemplateListPageDataRequestSchema: GenMessage<GetRecurringJournalTemplateListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetRecurringJournalTemplateListPageDataResponse
 */
export type GetRecurringJournalTemplateListPageDataResponse = Message<"domain.ledger.v1.GetRecurringJournalTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.RecurringJournalTemplate recurring_journal_template_list = 1;
     */
    recurringJournalTemplateList: RecurringJournalTemplate[];
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
 * Describes the message domain.ledger.v1.GetRecurringJournalTemplateListPageDataResponse.
 * Use `create(GetRecurringJournalTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRecurringJournalTemplateListPageDataResponseSchema: GenMessage<GetRecurringJournalTemplateListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetRecurringJournalTemplateItemPageDataRequest
 */
export type GetRecurringJournalTemplateItemPageDataRequest = Message<"domain.ledger.v1.GetRecurringJournalTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string recurring_journal_template_id = 1;
     */
    recurringJournalTemplateId: string;
};
/**
 * Describes the message domain.ledger.v1.GetRecurringJournalTemplateItemPageDataRequest.
 * Use `create(GetRecurringJournalTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRecurringJournalTemplateItemPageDataRequestSchema: GenMessage<GetRecurringJournalTemplateItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetRecurringJournalTemplateItemPageDataResponse
 */
export type GetRecurringJournalTemplateItemPageDataResponse = Message<"domain.ledger.v1.GetRecurringJournalTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.RecurringJournalTemplate recurring_journal_template = 1;
     */
    recurringJournalTemplate?: RecurringJournalTemplate;
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
 * Describes the message domain.ledger.v1.GetRecurringJournalTemplateItemPageDataResponse.
 * Use `create(GetRecurringJournalTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRecurringJournalTemplateItemPageDataResponseSchema: GenMessage<GetRecurringJournalTemplateItemPageDataResponse>;
/**
 * Generate a JournalEntry from this template and advance next_run_date
 *
 * @generated from message domain.ledger.v1.GenerateFromTemplateRequest
 */
export type GenerateFromTemplateRequest = Message<"domain.ledger.v1.GenerateFromTemplateRequest"> & {
    /**
     * @generated from field: string recurring_journal_template_id = 1;
     */
    recurringJournalTemplateId: string;
    /**
     * Effective date for the generated entry
     *
     * @generated from field: int64 entry_date = 2;
     */
    entryDate: bigint;
    /**
     * @generated from field: optional string fiscal_period_id = 3;
     */
    fiscalPeriodId?: string;
};
/**
 * Describes the message domain.ledger.v1.GenerateFromTemplateRequest.
 * Use `create(GenerateFromTemplateRequestSchema)` to create a new message.
 */
export declare const GenerateFromTemplateRequestSchema: GenMessage<GenerateFromTemplateRequest>;
/**
 * @generated from message domain.ledger.v1.GenerateFromTemplateResponse
 */
export type GenerateFromTemplateResponse = Message<"domain.ledger.v1.GenerateFromTemplateResponse"> & {
    /**
     * ID of the created JournalEntry
     *
     * @generated from field: string journal_entry_id = 1;
     */
    journalEntryId: string;
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
 * Describes the message domain.ledger.v1.GenerateFromTemplateResponse.
 * Use `create(GenerateFromTemplateResponseSchema)` to create a new message.
 */
export declare const GenerateFromTemplateResponseSchema: GenMessage<GenerateFromTemplateResponse>;
/**
 * RecurrenceFrequency defines how often a recurring journal entry is generated.
 *
 * @generated from enum domain.ledger.v1.RecurrenceFrequency
 */
export declare enum RecurrenceFrequency {
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_DAILY = 1;
     */
    DAILY = 1,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_WEEKLY = 2;
     */
    WEEKLY = 2,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_MONTHLY = 3;
     */
    MONTHLY = 3,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_QUARTERLY = 4;
     */
    QUARTERLY = 4,
    /**
     * @generated from enum value: RECURRENCE_FREQUENCY_YEARLY = 5;
     */
    YEARLY = 5
}
/**
 * Describes the enum domain.ledger.v1.RecurrenceFrequency.
 */
export declare const RecurrenceFrequencySchema: GenEnum<RecurrenceFrequency>;
/**
 * @generated from service domain.ledger.v1.RecurringJournalTemplateDomainService
 */
export declare const RecurringJournalTemplateDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.CreateRecurringJournalTemplate
     */
    createRecurringJournalTemplate: {
        methodKind: "unary";
        input: typeof CreateRecurringJournalTemplateRequestSchema;
        output: typeof CreateRecurringJournalTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.ReadRecurringJournalTemplate
     */
    readRecurringJournalTemplate: {
        methodKind: "unary";
        input: typeof ReadRecurringJournalTemplateRequestSchema;
        output: typeof ReadRecurringJournalTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.UpdateRecurringJournalTemplate
     */
    updateRecurringJournalTemplate: {
        methodKind: "unary";
        input: typeof UpdateRecurringJournalTemplateRequestSchema;
        output: typeof UpdateRecurringJournalTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.DeleteRecurringJournalTemplate
     */
    deleteRecurringJournalTemplate: {
        methodKind: "unary";
        input: typeof DeleteRecurringJournalTemplateRequestSchema;
        output: typeof DeleteRecurringJournalTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.ListRecurringJournalTemplates
     */
    listRecurringJournalTemplates: {
        methodKind: "unary";
        input: typeof ListRecurringJournalTemplatesRequestSchema;
        output: typeof ListRecurringJournalTemplatesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.GetRecurringJournalTemplateListPageData
     */
    getRecurringJournalTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetRecurringJournalTemplateListPageDataRequestSchema;
        output: typeof GetRecurringJournalTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.GetRecurringJournalTemplateItemPageData
     */
    getRecurringJournalTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetRecurringJournalTemplateItemPageDataRequestSchema;
        output: typeof GetRecurringJournalTemplateItemPageDataResponseSchema;
    };
    /**
     * Generate a JournalEntry from this template (called by scheduler or manually)
     *
     * @generated from rpc domain.ledger.v1.RecurringJournalTemplateDomainService.GenerateFromTemplate
     */
    generateFromTemplate: {
        methodKind: "unary";
        input: typeof GenerateFromTemplateRequestSchema;
        output: typeof GenerateFromTemplateResponseSchema;
    };
}>;
