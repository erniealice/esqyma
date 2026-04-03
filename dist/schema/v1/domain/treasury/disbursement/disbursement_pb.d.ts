import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../../subscription/subscription/subscription_pb";
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
     * @generated from field: double amount = 10;
     */
    amount: number;
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
     * Unix timestamp
     *
     * @generated from field: int64 payment_date = 25;
     */
    paymentDate: bigint;
    /**
     * who authorized the outflow
     *
     * @generated from field: string approved_by = 26;
     */
    approvedBy: string;
    /**
     * Date display companion
     *
     * Display string for payment_date
     *
     * @generated from field: optional string payment_date_string = 27;
     */
    paymentDateString?: string;
    /**
     * GL traceability
     *
     * FK to journal_entry — set when disbursement is posted to ledger
     *
     * @generated from field: optional string journal_entry_id = 28;
     */
    journalEntryId?: string;
};
/**
 * Describes the message domain.treasury.v1.Disbursement.
 * Use `create(DisbursementSchema)` to create a new message.
 */
export declare const DisbursementSchema: GenMessage<Disbursement>;
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
