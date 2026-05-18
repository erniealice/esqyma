import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/withholding_certificate/withholding_certificate.proto.
 */
export declare const file_domain_treasury_withholding_certificate_withholding_certificate: GenFile;
/**
 * WithholdingCertificate — a BIR Form 2307 or equivalent received from the
 * buyer after they remit withheld tax to the authority.
 * N rows per revenue allowed; UNIQUE on (revenue_id, certificate_number).
 * ON DELETE RESTRICT from revenue — must void certificates before deleting revenue.
 *
 * @generated from message domain.treasury.v1.WithholdingCertificate
 */
export type WithholdingCertificate = Message<"domain.treasury.v1.WithholdingCertificate"> & {
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
     * @generated from field: string workspace_id = 7;
     */
    workspaceId: string;
    /**
     * Parent revenue — indexed; ON DELETE RESTRICT
     *
     * @generated from field: string revenue_id = 8;
     */
    revenueId: string;
    /**
     * Authority that issued the withholding requirement
     *
     * @generated from field: optional string tax_authority_id = 9;
     */
    taxAuthorityId?: string;
    /**
     * Regulator code at time of issuance (e.g. BIR ATC "WC011") — snapshot
     *
     * @generated from field: optional string regulator_code_snapshot = 10;
     */
    regulatorCodeSnapshot?: string;
    /**
     * Certificate serial number from the physical document.
     * UNIQUE together with revenue_id (allows N certs per revenue with distinct numbers).
     *
     * @generated from field: string certificate_number = 11;
     */
    certificateNumber: string;
    /**
     * The tax period the certificate covers (e.g. "2026-04")
     *
     * @generated from field: optional string certificate_period = 12;
     */
    certificatePeriod?: string;
    /**
     * Date the buyer issued the certificate
     *
     * ISO 8601 date
     *
     * @generated from field: optional string issued_date = 13;
     */
    issuedDate?: string;
    /**
     * Date the workspace received the physical document
     *
     * ISO 8601 date
     *
     * @generated from field: optional string received_date = 14;
     */
    receivedDate?: string;
    /**
     * Expected amount from RevenueTaxLine(WITHHOLDING) — centavos
     *
     * @generated from field: int64 expected_amount = 15;
     */
    expectedAmount: bigint;
    /**
     * Actual amount stated on the physical certificate — centavos
     *
     * @generated from field: int64 actual_amount = 16;
     */
    actualAmount: bigint;
    /**
     * variance_amount = expected_amount - actual_amount (positive = under-withheld)
     *
     * @generated from field: int64 variance_amount = 17;
     */
    varianceAmount: bigint;
    /**
     * Buyer TIN snapshot (from client.tin at create time)
     *
     * @generated from field: optional string buyer_tin_snapshot = 18;
     */
    buyerTinSnapshot?: string;
    /**
     * Reference to uploaded certificate document
     *
     * @generated from field: optional string source_document_id = 19;
     */
    sourceDocumentId?: string;
    /**
     * Lifecycle status
     *
     * @generated from field: domain.treasury.v1.WithholdingCertificateStatus status = 20;
     */
    status: WithholdingCertificateStatus;
    /**
     * Optional notes / reason for variance or rejection
     *
     * @generated from field: optional string notes = 21;
     */
    notes?: string;
};
/**
 * Describes the message domain.treasury.v1.WithholdingCertificate.
 * Use `create(WithholdingCertificateSchema)` to create a new message.
 */
export declare const WithholdingCertificateSchema: GenMessage<WithholdingCertificate>;
/**
 * @generated from message domain.treasury.v1.CreateWithholdingCertificateRequest
 */
export type CreateWithholdingCertificateRequest = Message<"domain.treasury.v1.CreateWithholdingCertificateRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data?: WithholdingCertificate;
};
/**
 * Describes the message domain.treasury.v1.CreateWithholdingCertificateRequest.
 * Use `create(CreateWithholdingCertificateRequestSchema)` to create a new message.
 */
export declare const CreateWithholdingCertificateRequestSchema: GenMessage<CreateWithholdingCertificateRequest>;
/**
 * @generated from message domain.treasury.v1.CreateWithholdingCertificateResponse
 */
export type CreateWithholdingCertificateResponse = Message<"domain.treasury.v1.CreateWithholdingCertificateResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data: WithholdingCertificate[];
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
 * Describes the message domain.treasury.v1.CreateWithholdingCertificateResponse.
 * Use `create(CreateWithholdingCertificateResponseSchema)` to create a new message.
 */
export declare const CreateWithholdingCertificateResponseSchema: GenMessage<CreateWithholdingCertificateResponse>;
/**
 * @generated from message domain.treasury.v1.ReadWithholdingCertificateRequest
 */
export type ReadWithholdingCertificateRequest = Message<"domain.treasury.v1.ReadWithholdingCertificateRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data?: WithholdingCertificate;
};
/**
 * Describes the message domain.treasury.v1.ReadWithholdingCertificateRequest.
 * Use `create(ReadWithholdingCertificateRequestSchema)` to create a new message.
 */
export declare const ReadWithholdingCertificateRequestSchema: GenMessage<ReadWithholdingCertificateRequest>;
/**
 * @generated from message domain.treasury.v1.ReadWithholdingCertificateResponse
 */
export type ReadWithholdingCertificateResponse = Message<"domain.treasury.v1.ReadWithholdingCertificateResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data: WithholdingCertificate[];
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
 * Describes the message domain.treasury.v1.ReadWithholdingCertificateResponse.
 * Use `create(ReadWithholdingCertificateResponseSchema)` to create a new message.
 */
export declare const ReadWithholdingCertificateResponseSchema: GenMessage<ReadWithholdingCertificateResponse>;
/**
 * @generated from message domain.treasury.v1.UpdateWithholdingCertificateRequest
 */
export type UpdateWithholdingCertificateRequest = Message<"domain.treasury.v1.UpdateWithholdingCertificateRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data?: WithholdingCertificate;
};
/**
 * Describes the message domain.treasury.v1.UpdateWithholdingCertificateRequest.
 * Use `create(UpdateWithholdingCertificateRequestSchema)` to create a new message.
 */
export declare const UpdateWithholdingCertificateRequestSchema: GenMessage<UpdateWithholdingCertificateRequest>;
/**
 * @generated from message domain.treasury.v1.UpdateWithholdingCertificateResponse
 */
export type UpdateWithholdingCertificateResponse = Message<"domain.treasury.v1.UpdateWithholdingCertificateResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data: WithholdingCertificate[];
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
 * Describes the message domain.treasury.v1.UpdateWithholdingCertificateResponse.
 * Use `create(UpdateWithholdingCertificateResponseSchema)` to create a new message.
 */
export declare const UpdateWithholdingCertificateResponseSchema: GenMessage<UpdateWithholdingCertificateResponse>;
/**
 * @generated from message domain.treasury.v1.DeleteWithholdingCertificateRequest
 */
export type DeleteWithholdingCertificateRequest = Message<"domain.treasury.v1.DeleteWithholdingCertificateRequest"> & {
    /**
     * @generated from field: domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data?: WithholdingCertificate;
};
/**
 * Describes the message domain.treasury.v1.DeleteWithholdingCertificateRequest.
 * Use `create(DeleteWithholdingCertificateRequestSchema)` to create a new message.
 */
export declare const DeleteWithholdingCertificateRequestSchema: GenMessage<DeleteWithholdingCertificateRequest>;
/**
 * @generated from message domain.treasury.v1.DeleteWithholdingCertificateResponse
 */
export type DeleteWithholdingCertificateResponse = Message<"domain.treasury.v1.DeleteWithholdingCertificateResponse"> & {
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
 * Describes the message domain.treasury.v1.DeleteWithholdingCertificateResponse.
 * Use `create(DeleteWithholdingCertificateResponseSchema)` to create a new message.
 */
export declare const DeleteWithholdingCertificateResponseSchema: GenMessage<DeleteWithholdingCertificateResponse>;
/**
 * @generated from message domain.treasury.v1.ListWithholdingCertificatesRequest
 */
export type ListWithholdingCertificatesRequest = Message<"domain.treasury.v1.ListWithholdingCertificatesRequest"> & {
    /**
     * @generated from field: optional string revenue_id = 1;
     */
    revenueId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 2;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.treasury.v1.ListWithholdingCertificatesRequest.
 * Use `create(ListWithholdingCertificatesRequestSchema)` to create a new message.
 */
export declare const ListWithholdingCertificatesRequestSchema: GenMessage<ListWithholdingCertificatesRequest>;
/**
 * @generated from message domain.treasury.v1.ListWithholdingCertificatesResponse
 */
export type ListWithholdingCertificatesResponse = Message<"domain.treasury.v1.ListWithholdingCertificatesResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.WithholdingCertificate data = 1;
     */
    data: WithholdingCertificate[];
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
 * Describes the message domain.treasury.v1.ListWithholdingCertificatesResponse.
 * Use `create(ListWithholdingCertificatesResponseSchema)` to create a new message.
 */
export declare const ListWithholdingCertificatesResponseSchema: GenMessage<ListWithholdingCertificatesResponse>;
/**
 * @generated from message domain.treasury.v1.GetWithholdingCertificateListPageDataRequest
 */
export type GetWithholdingCertificateListPageDataRequest = Message<"domain.treasury.v1.GetWithholdingCertificateListPageDataRequest"> & {
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
 * Describes the message domain.treasury.v1.GetWithholdingCertificateListPageDataRequest.
 * Use `create(GetWithholdingCertificateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWithholdingCertificateListPageDataRequestSchema: GenMessage<GetWithholdingCertificateListPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetWithholdingCertificateListPageDataResponse
 */
export type GetWithholdingCertificateListPageDataResponse = Message<"domain.treasury.v1.GetWithholdingCertificateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.treasury.v1.WithholdingCertificate withholding_certificate_list = 1;
     */
    withholdingCertificateList: WithholdingCertificate[];
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
 * Describes the message domain.treasury.v1.GetWithholdingCertificateListPageDataResponse.
 * Use `create(GetWithholdingCertificateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWithholdingCertificateListPageDataResponseSchema: GenMessage<GetWithholdingCertificateListPageDataResponse>;
/**
 * @generated from message domain.treasury.v1.GetWithholdingCertificateItemPageDataRequest
 */
export type GetWithholdingCertificateItemPageDataRequest = Message<"domain.treasury.v1.GetWithholdingCertificateItemPageDataRequest"> & {
    /**
     * @generated from field: string withholding_certificate_id = 1;
     */
    withholdingCertificateId: string;
};
/**
 * Describes the message domain.treasury.v1.GetWithholdingCertificateItemPageDataRequest.
 * Use `create(GetWithholdingCertificateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWithholdingCertificateItemPageDataRequestSchema: GenMessage<GetWithholdingCertificateItemPageDataRequest>;
/**
 * @generated from message domain.treasury.v1.GetWithholdingCertificateItemPageDataResponse
 */
export type GetWithholdingCertificateItemPageDataResponse = Message<"domain.treasury.v1.GetWithholdingCertificateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.treasury.v1.WithholdingCertificate withholding_certificate = 1;
     */
    withholdingCertificate?: WithholdingCertificate;
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
 * Describes the message domain.treasury.v1.GetWithholdingCertificateItemPageDataResponse.
 * Use `create(GetWithholdingCertificateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWithholdingCertificateItemPageDataResponseSchema: GenMessage<GetWithholdingCertificateItemPageDataResponse>;
/**
 * WithholdingCertificateStatus — lifecycle of a BIR Form 2307 (or equivalent).
 *
 * @generated from enum domain.treasury.v1.WithholdingCertificateStatus
 */
export declare enum WithholdingCertificateStatus {
    /**
     * @generated from enum value: WITHHOLDING_CERTIFICATE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Expected but not yet received
     *
     * @generated from enum value: WITHHOLDING_CERTIFICATE_STATUS_PENDING_RECEIPT = 1;
     */
    PENDING_RECEIPT = 1,
    /**
     * Received in full
     *
     * @generated from enum value: WITHHOLDING_CERTIFICATE_STATUS_RECEIVED = 2;
     */
    RECEIVED = 2,
    /**
     * Received with amount discrepancy
     *
     * @generated from enum value: WITHHOLDING_CERTIFICATE_STATUS_RECEIVED_WITH_VARIANCE = 3;
     */
    RECEIVED_WITH_VARIANCE = 3,
    /**
     * Cancelled; does not count toward settlement
     *
     * @generated from enum value: WITHHOLDING_CERTIFICATE_STATUS_VOIDED = 4;
     */
    VOIDED = 4,
    /**
     * Formally rejected
     *
     * @generated from enum value: WITHHOLDING_CERTIFICATE_STATUS_REJECTED = 5;
     */
    REJECTED = 5
}
/**
 * Describes the enum domain.treasury.v1.WithholdingCertificateStatus.
 */
export declare const WithholdingCertificateStatusSchema: GenEnum<WithholdingCertificateStatus>;
/**
 * @generated from service domain.treasury.v1.WithholdingCertificateDomainService
 */
export declare const WithholdingCertificateDomainService: GenService<{
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.CreateWithholdingCertificate
     */
    createWithholdingCertificate: {
        methodKind: "unary";
        input: typeof CreateWithholdingCertificateRequestSchema;
        output: typeof CreateWithholdingCertificateResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.ReadWithholdingCertificate
     */
    readWithholdingCertificate: {
        methodKind: "unary";
        input: typeof ReadWithholdingCertificateRequestSchema;
        output: typeof ReadWithholdingCertificateResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.UpdateWithholdingCertificate
     */
    updateWithholdingCertificate: {
        methodKind: "unary";
        input: typeof UpdateWithholdingCertificateRequestSchema;
        output: typeof UpdateWithholdingCertificateResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.DeleteWithholdingCertificate
     */
    deleteWithholdingCertificate: {
        methodKind: "unary";
        input: typeof DeleteWithholdingCertificateRequestSchema;
        output: typeof DeleteWithholdingCertificateResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.ListWithholdingCertificates
     */
    listWithholdingCertificates: {
        methodKind: "unary";
        input: typeof ListWithholdingCertificatesRequestSchema;
        output: typeof ListWithholdingCertificatesResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.GetWithholdingCertificateListPageData
     */
    getWithholdingCertificateListPageData: {
        methodKind: "unary";
        input: typeof GetWithholdingCertificateListPageDataRequestSchema;
        output: typeof GetWithholdingCertificateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.treasury.v1.WithholdingCertificateDomainService.GetWithholdingCertificateItemPageData
     */
    getWithholdingCertificateItemPageData: {
        methodKind: "unary";
        input: typeof GetWithholdingCertificateItemPageDataRequestSchema;
        output: typeof GetWithholdingCertificateItemPageDataResponseSchema;
    };
}>;
