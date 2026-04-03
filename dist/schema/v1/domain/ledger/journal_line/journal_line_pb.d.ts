import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/journal_line/journal_line.proto.
 */
export declare const file_domain_ledger_journal_line_journal_line: GenFile;
/**
 * JournalLine is an individual debit or credit line within a JournalEntry.
 * Exactly one of debit_amount or credit_amount is non-zero per line.
 * The sum of all debit_amount values must equal the sum of all credit_amount values
 * within the parent JournalEntry.
 *
 * @generated from message domain.ledger.v1.JournalLine
 */
export type JournalLine = Message<"domain.ledger.v1.JournalLine"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent journal entry
     *
     * @generated from field: string journal_entry_id = 2;
     */
    journalEntryId: string;
    /**
     * Account posted to
     *
     * @generated from field: string account_id = 3;
     */
    accountId: string;
    /**
     * @generated from field: optional string description = 4;
     */
    description?: string;
    /**
     * Debit/credit amounts — exactly one should be non-zero per line
     *
     * @generated from field: double debit_amount = 5;
     */
    debitAmount: number;
    /**
     * @generated from field: double credit_amount = 6;
     */
    creditAmount: number;
    /**
     * Presentation order within the journal entry
     *
     * @generated from field: int32 line_order = 7;
     */
    lineOrder: number;
    /**
     * Audit fields
     *
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 9;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 10;
     */
    dateCreatedString?: string;
};
/**
 * Describes the message domain.ledger.v1.JournalLine.
 * Use `create(JournalLineSchema)` to create a new message.
 */
export declare const JournalLineSchema: GenMessage<JournalLine>;
/**
 * @generated from message domain.ledger.v1.CreateJournalLineRequest
 */
export type CreateJournalLineRequest = Message<"domain.ledger.v1.CreateJournalLineRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalLine data = 1;
     */
    data?: JournalLine;
};
/**
 * Describes the message domain.ledger.v1.CreateJournalLineRequest.
 * Use `create(CreateJournalLineRequestSchema)` to create a new message.
 */
export declare const CreateJournalLineRequestSchema: GenMessage<CreateJournalLineRequest>;
/**
 * @generated from message domain.ledger.v1.CreateJournalLineResponse
 */
export type CreateJournalLineResponse = Message<"domain.ledger.v1.CreateJournalLineResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalLine data = 1;
     */
    data: JournalLine[];
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
 * Describes the message domain.ledger.v1.CreateJournalLineResponse.
 * Use `create(CreateJournalLineResponseSchema)` to create a new message.
 */
export declare const CreateJournalLineResponseSchema: GenMessage<CreateJournalLineResponse>;
/**
 * @generated from message domain.ledger.v1.ReadJournalLineRequest
 */
export type ReadJournalLineRequest = Message<"domain.ledger.v1.ReadJournalLineRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalLine data = 1;
     */
    data?: JournalLine;
};
/**
 * Describes the message domain.ledger.v1.ReadJournalLineRequest.
 * Use `create(ReadJournalLineRequestSchema)` to create a new message.
 */
export declare const ReadJournalLineRequestSchema: GenMessage<ReadJournalLineRequest>;
/**
 * @generated from message domain.ledger.v1.ReadJournalLineResponse
 */
export type ReadJournalLineResponse = Message<"domain.ledger.v1.ReadJournalLineResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalLine data = 1;
     */
    data: JournalLine[];
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
 * Describes the message domain.ledger.v1.ReadJournalLineResponse.
 * Use `create(ReadJournalLineResponseSchema)` to create a new message.
 */
export declare const ReadJournalLineResponseSchema: GenMessage<ReadJournalLineResponse>;
/**
 * @generated from message domain.ledger.v1.UpdateJournalLineRequest
 */
export type UpdateJournalLineRequest = Message<"domain.ledger.v1.UpdateJournalLineRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalLine data = 1;
     */
    data?: JournalLine;
};
/**
 * Describes the message domain.ledger.v1.UpdateJournalLineRequest.
 * Use `create(UpdateJournalLineRequestSchema)` to create a new message.
 */
export declare const UpdateJournalLineRequestSchema: GenMessage<UpdateJournalLineRequest>;
/**
 * @generated from message domain.ledger.v1.UpdateJournalLineResponse
 */
export type UpdateJournalLineResponse = Message<"domain.ledger.v1.UpdateJournalLineResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalLine data = 1;
     */
    data: JournalLine[];
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
 * Describes the message domain.ledger.v1.UpdateJournalLineResponse.
 * Use `create(UpdateJournalLineResponseSchema)` to create a new message.
 */
export declare const UpdateJournalLineResponseSchema: GenMessage<UpdateJournalLineResponse>;
/**
 * @generated from message domain.ledger.v1.DeleteJournalLineRequest
 */
export type DeleteJournalLineRequest = Message<"domain.ledger.v1.DeleteJournalLineRequest"> & {
    /**
     * @generated from field: domain.ledger.v1.JournalLine data = 1;
     */
    data?: JournalLine;
};
/**
 * Describes the message domain.ledger.v1.DeleteJournalLineRequest.
 * Use `create(DeleteJournalLineRequestSchema)` to create a new message.
 */
export declare const DeleteJournalLineRequestSchema: GenMessage<DeleteJournalLineRequest>;
/**
 * @generated from message domain.ledger.v1.DeleteJournalLineResponse
 */
export type DeleteJournalLineResponse = Message<"domain.ledger.v1.DeleteJournalLineResponse"> & {
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
 * Describes the message domain.ledger.v1.DeleteJournalLineResponse.
 * Use `create(DeleteJournalLineResponseSchema)` to create a new message.
 */
export declare const DeleteJournalLineResponseSchema: GenMessage<DeleteJournalLineResponse>;
/**
 * @generated from message domain.ledger.v1.ListJournalLinesRequest
 */
export type ListJournalLinesRequest = Message<"domain.ledger.v1.ListJournalLinesRequest"> & {
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
 * Describes the message domain.ledger.v1.ListJournalLinesRequest.
 * Use `create(ListJournalLinesRequestSchema)` to create a new message.
 */
export declare const ListJournalLinesRequestSchema: GenMessage<ListJournalLinesRequest>;
/**
 * @generated from message domain.ledger.v1.ListJournalLinesResponse
 */
export type ListJournalLinesResponse = Message<"domain.ledger.v1.ListJournalLinesResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalLine data = 1;
     */
    data: JournalLine[];
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
 * Describes the message domain.ledger.v1.ListJournalLinesResponse.
 * Use `create(ListJournalLinesResponseSchema)` to create a new message.
 */
export declare const ListJournalLinesResponseSchema: GenMessage<ListJournalLinesResponse>;
/**
 * @generated from message domain.ledger.v1.GetJournalLineListPageDataRequest
 */
export type GetJournalLineListPageDataRequest = Message<"domain.ledger.v1.GetJournalLineListPageDataRequest"> & {
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
 * Describes the message domain.ledger.v1.GetJournalLineListPageDataRequest.
 * Use `create(GetJournalLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJournalLineListPageDataRequestSchema: GenMessage<GetJournalLineListPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetJournalLineListPageDataResponse
 */
export type GetJournalLineListPageDataResponse = Message<"domain.ledger.v1.GetJournalLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.JournalLine journal_line_list = 1;
     */
    journalLineList: JournalLine[];
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
 * Describes the message domain.ledger.v1.GetJournalLineListPageDataResponse.
 * Use `create(GetJournalLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJournalLineListPageDataResponseSchema: GenMessage<GetJournalLineListPageDataResponse>;
/**
 * @generated from message domain.ledger.v1.GetJournalLineItemPageDataRequest
 */
export type GetJournalLineItemPageDataRequest = Message<"domain.ledger.v1.GetJournalLineItemPageDataRequest"> & {
    /**
     * @generated from field: string journal_line_id = 1;
     */
    journalLineId: string;
};
/**
 * Describes the message domain.ledger.v1.GetJournalLineItemPageDataRequest.
 * Use `create(GetJournalLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJournalLineItemPageDataRequestSchema: GenMessage<GetJournalLineItemPageDataRequest>;
/**
 * @generated from message domain.ledger.v1.GetJournalLineItemPageDataResponse
 */
export type GetJournalLineItemPageDataResponse = Message<"domain.ledger.v1.GetJournalLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.ledger.v1.JournalLine journal_line = 1;
     */
    journalLine?: JournalLine;
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
 * Describes the message domain.ledger.v1.GetJournalLineItemPageDataResponse.
 * Use `create(GetJournalLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJournalLineItemPageDataResponseSchema: GenMessage<GetJournalLineItemPageDataResponse>;
/**
 * @generated from service domain.ledger.v1.JournalLineDomainService
 */
export declare const JournalLineDomainService: GenService<{
    /**
     * Standard CRUD — primarily used as child of JournalEntry
     *
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.CreateJournalLine
     */
    createJournalLine: {
        methodKind: "unary";
        input: typeof CreateJournalLineRequestSchema;
        output: typeof CreateJournalLineResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.ReadJournalLine
     */
    readJournalLine: {
        methodKind: "unary";
        input: typeof ReadJournalLineRequestSchema;
        output: typeof ReadJournalLineResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.UpdateJournalLine
     */
    updateJournalLine: {
        methodKind: "unary";
        input: typeof UpdateJournalLineRequestSchema;
        output: typeof UpdateJournalLineResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.DeleteJournalLine
     */
    deleteJournalLine: {
        methodKind: "unary";
        input: typeof DeleteJournalLineRequestSchema;
        output: typeof DeleteJournalLineResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.ListJournalLines
     */
    listJournalLines: {
        methodKind: "unary";
        input: typeof ListJournalLinesRequestSchema;
        output: typeof ListJournalLinesResponseSchema;
    };
    /**
     * Enhanced page data (for UI views)
     *
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.GetJournalLineListPageData
     */
    getJournalLineListPageData: {
        methodKind: "unary";
        input: typeof GetJournalLineListPageDataRequestSchema;
        output: typeof GetJournalLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.ledger.v1.JournalLineDomainService.GetJournalLineItemPageData
     */
    getJournalLineItemPageData: {
        methodKind: "unary";
        input: typeof GetJournalLineItemPageDataRequestSchema;
        output: typeof GetJournalLineItemPageDataResponseSchema;
    };
}>;
