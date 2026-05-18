import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/tax/tax_registration/tax_registration.proto.
 */
export declare const file_domain_tax_tax_registration_tax_registration: GenFile;
/**
 * TaxRegistration — polymorphic, immutable-per-row table. Edits create new
 * rows via supersession; old rows are stamped SUPERSEDED with an effective_to.
 *
 * The partial unique index on (party_type, party_id, tax_authority_id,
 * compute_path_snapshot) WHERE status='ACTIVE' prevents two simultaneously
 * ACTIVE registrations of the same compute path per (party, authority).
 *
 * @generated from message domain.tax.v1.TaxRegistration
 */
export type TaxRegistration = Message<"domain.tax.v1.TaxRegistration"> & {
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
     * Which type of party holds this registration (CLIENT, WORKSPACE, SUPPLIER, EMPLOYEE)
     *
     * @generated from field: domain.tax.v1.TaxRegistrationPartyType party_type = 7;
     */
    partyType: TaxRegistrationPartyType;
    /**
     * UUID of the party (client.id, workspace.id, etc.) — polymorphic FK, no DB constraint
     *
     * @generated from field: string party_id = 8;
     */
    partyId: string;
    /**
     * FK to tax_authority
     *
     * @generated from field: string tax_authority_id = 9;
     */
    taxAuthorityId: string;
    /**
     * FK to tax_registration_kind
     *
     * @generated from field: string tax_registration_kind_id = 10;
     */
    taxRegistrationKindId: string;
    /**
     * Denormed from kind.compute_path — used by the partial unique index.
     * MUST be set equal to kind.compute_path at create/supersede time.
     *
     * @generated from field: domain.tax.v1.TaxRegistrationComputePathSnapshot compute_path_snapshot = 11;
     */
    computePathSnapshot: TaxRegistrationComputePathSnapshot;
    /**
     * Denormed from kind.party_role.
     *
     * @generated from field: domain.tax.v1.TaxRegistrationPartyRoleSnapshot party_role_snapshot = 12;
     */
    partyRoleSnapshot: TaxRegistrationPartyRoleSnapshot;
    /**
     * Official registration number (e.g. TIN, VAT number, BIR registration)
     *
     * @generated from field: string registration_number = 13;
     */
    registrationNumber: string;
    /**
     * Lifecycle status — see invariants in plan.md
     *
     * @generated from field: domain.tax.v1.TaxRegistrationStatus status = 14;
     */
    status: TaxRegistrationStatus;
    /**
     * asOf window — effective_from <= asOf AND (effective_to IS NULL OR effective_to > asOf)
     *
     * ISO 8601 date
     *
     * @generated from field: string effective_from = 15;
     */
    effectiveFrom: string;
    /**
     * ISO 8601 date — NULL for open-ended ACTIVE rows
     *
     * @generated from field: optional string effective_to = 16;
     */
    effectiveTo?: string;
    /**
     * Self-FK for supersession chain. NULL on the first version of a registration.
     *
     * @generated from field: optional string supersedes_id = 17;
     */
    supersedesId?: string;
    /**
     * Audit fields
     *
     * e.g. "COR / RDO 39"
     *
     * @generated from field: optional string source_citation = 18;
     */
    sourceCitation?: string;
    /**
     * FK to document/attachment
     *
     * @generated from field: optional string source_document_id = 19;
     */
    sourceDocumentId?: string;
    /**
     * Workspace scope — all registrations scoped to a workspace for multi-tenant isolation
     *
     * @generated from field: string workspace_id = 20;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.tax.v1.TaxRegistration.
 * Use `create(TaxRegistrationSchema)` to create a new message.
 */
export declare const TaxRegistrationSchema: GenMessage<TaxRegistration>;
/**
 * @generated from message domain.tax.v1.CreateTaxRegistrationRequest
 */
export type CreateTaxRegistrationRequest = Message<"domain.tax.v1.CreateTaxRegistrationRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxRegistration data = 1;
     */
    data?: TaxRegistration;
};
/**
 * Describes the message domain.tax.v1.CreateTaxRegistrationRequest.
 * Use `create(CreateTaxRegistrationRequestSchema)` to create a new message.
 */
export declare const CreateTaxRegistrationRequestSchema: GenMessage<CreateTaxRegistrationRequest>;
/**
 * @generated from message domain.tax.v1.CreateTaxRegistrationResponse
 */
export type CreateTaxRegistrationResponse = Message<"domain.tax.v1.CreateTaxRegistrationResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistration data = 1;
     */
    data: TaxRegistration[];
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
 * Describes the message domain.tax.v1.CreateTaxRegistrationResponse.
 * Use `create(CreateTaxRegistrationResponseSchema)` to create a new message.
 */
export declare const CreateTaxRegistrationResponseSchema: GenMessage<CreateTaxRegistrationResponse>;
/**
 * @generated from message domain.tax.v1.ReadTaxRegistrationRequest
 */
export type ReadTaxRegistrationRequest = Message<"domain.tax.v1.ReadTaxRegistrationRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxRegistration data = 1;
     */
    data?: TaxRegistration;
};
/**
 * Describes the message domain.tax.v1.ReadTaxRegistrationRequest.
 * Use `create(ReadTaxRegistrationRequestSchema)` to create a new message.
 */
export declare const ReadTaxRegistrationRequestSchema: GenMessage<ReadTaxRegistrationRequest>;
/**
 * @generated from message domain.tax.v1.ReadTaxRegistrationResponse
 */
export type ReadTaxRegistrationResponse = Message<"domain.tax.v1.ReadTaxRegistrationResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistration data = 1;
     */
    data: TaxRegistration[];
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
 * Describes the message domain.tax.v1.ReadTaxRegistrationResponse.
 * Use `create(ReadTaxRegistrationResponseSchema)` to create a new message.
 */
export declare const ReadTaxRegistrationResponseSchema: GenMessage<ReadTaxRegistrationResponse>;
/**
 * @generated from message domain.tax.v1.UpdateTaxRegistrationRequest
 */
export type UpdateTaxRegistrationRequest = Message<"domain.tax.v1.UpdateTaxRegistrationRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxRegistration data = 1;
     */
    data?: TaxRegistration;
};
/**
 * Describes the message domain.tax.v1.UpdateTaxRegistrationRequest.
 * Use `create(UpdateTaxRegistrationRequestSchema)` to create a new message.
 */
export declare const UpdateTaxRegistrationRequestSchema: GenMessage<UpdateTaxRegistrationRequest>;
/**
 * @generated from message domain.tax.v1.UpdateTaxRegistrationResponse
 */
export type UpdateTaxRegistrationResponse = Message<"domain.tax.v1.UpdateTaxRegistrationResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistration data = 1;
     */
    data: TaxRegistration[];
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
 * Describes the message domain.tax.v1.UpdateTaxRegistrationResponse.
 * Use `create(UpdateTaxRegistrationResponseSchema)` to create a new message.
 */
export declare const UpdateTaxRegistrationResponseSchema: GenMessage<UpdateTaxRegistrationResponse>;
/**
 * @generated from message domain.tax.v1.DeleteTaxRegistrationRequest
 */
export type DeleteTaxRegistrationRequest = Message<"domain.tax.v1.DeleteTaxRegistrationRequest"> & {
    /**
     * @generated from field: domain.tax.v1.TaxRegistration data = 1;
     */
    data?: TaxRegistration;
};
/**
 * Describes the message domain.tax.v1.DeleteTaxRegistrationRequest.
 * Use `create(DeleteTaxRegistrationRequestSchema)` to create a new message.
 */
export declare const DeleteTaxRegistrationRequestSchema: GenMessage<DeleteTaxRegistrationRequest>;
/**
 * @generated from message domain.tax.v1.DeleteTaxRegistrationResponse
 */
export type DeleteTaxRegistrationResponse = Message<"domain.tax.v1.DeleteTaxRegistrationResponse"> & {
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
 * Describes the message domain.tax.v1.DeleteTaxRegistrationResponse.
 * Use `create(DeleteTaxRegistrationResponseSchema)` to create a new message.
 */
export declare const DeleteTaxRegistrationResponseSchema: GenMessage<DeleteTaxRegistrationResponse>;
/**
 * @generated from message domain.tax.v1.ListTaxRegistrationsRequest
 */
export type ListTaxRegistrationsRequest = Message<"domain.tax.v1.ListTaxRegistrationsRequest"> & {
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
 * Describes the message domain.tax.v1.ListTaxRegistrationsRequest.
 * Use `create(ListTaxRegistrationsRequestSchema)` to create a new message.
 */
export declare const ListTaxRegistrationsRequestSchema: GenMessage<ListTaxRegistrationsRequest>;
/**
 * @generated from message domain.tax.v1.ListTaxRegistrationsResponse
 */
export type ListTaxRegistrationsResponse = Message<"domain.tax.v1.ListTaxRegistrationsResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistration data = 1;
     */
    data: TaxRegistration[];
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
 * Describes the message domain.tax.v1.ListTaxRegistrationsResponse.
 * Use `create(ListTaxRegistrationsResponseSchema)` to create a new message.
 */
export declare const ListTaxRegistrationsResponseSchema: GenMessage<ListTaxRegistrationsResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationListPageDataRequest
 */
export type GetTaxRegistrationListPageDataRequest = Message<"domain.tax.v1.GetTaxRegistrationListPageDataRequest"> & {
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
 * Describes the message domain.tax.v1.GetTaxRegistrationListPageDataRequest.
 * Use `create(GetTaxRegistrationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxRegistrationListPageDataRequestSchema: GenMessage<GetTaxRegistrationListPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationListPageDataResponse
 */
export type GetTaxRegistrationListPageDataResponse = Message<"domain.tax.v1.GetTaxRegistrationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.tax.v1.TaxRegistration tax_registration_list = 1;
     */
    taxRegistrationList: TaxRegistration[];
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
 * Describes the message domain.tax.v1.GetTaxRegistrationListPageDataResponse.
 * Use `create(GetTaxRegistrationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxRegistrationListPageDataResponseSchema: GenMessage<GetTaxRegistrationListPageDataResponse>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationItemPageDataRequest
 */
export type GetTaxRegistrationItemPageDataRequest = Message<"domain.tax.v1.GetTaxRegistrationItemPageDataRequest"> & {
    /**
     * @generated from field: string tax_registration_id = 1;
     */
    taxRegistrationId: string;
};
/**
 * Describes the message domain.tax.v1.GetTaxRegistrationItemPageDataRequest.
 * Use `create(GetTaxRegistrationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetTaxRegistrationItemPageDataRequestSchema: GenMessage<GetTaxRegistrationItemPageDataRequest>;
/**
 * @generated from message domain.tax.v1.GetTaxRegistrationItemPageDataResponse
 */
export type GetTaxRegistrationItemPageDataResponse = Message<"domain.tax.v1.GetTaxRegistrationItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.tax.v1.TaxRegistration tax_registration = 1;
     */
    taxRegistration?: TaxRegistration;
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
 * Describes the message domain.tax.v1.GetTaxRegistrationItemPageDataResponse.
 * Use `create(GetTaxRegistrationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetTaxRegistrationItemPageDataResponseSchema: GenMessage<GetTaxRegistrationItemPageDataResponse>;
/**
 * TaxRegistrationStatus — lifecycle of a single immutable registration row.
 * New versions SUPERSEDE old via self-FK (supersedes_id + effective_to).
 *
 * @generated from enum domain.tax.v1.TaxRegistrationStatus
 */
export declare enum TaxRegistrationStatus {
    /**
     * @generated from enum value: TAX_REGISTRATION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * @generated from enum value: TAX_REGISTRATION_STATUS_SUPERSEDED = 3;
     */
    SUPERSEDED = 3,
    /**
     * @generated from enum value: TAX_REGISTRATION_STATUS_CANCELLED = 4;
     */
    CANCELLED = 4,
    /**
     * @generated from enum value: TAX_REGISTRATION_STATUS_VOIDED = 5;
     */
    VOIDED = 5
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationStatus.
 */
export declare const TaxRegistrationStatusSchema: GenEnum<TaxRegistrationStatus>;
/**
 * PartyType — the kind of party that holds this registration.
 * Polymorphic: one table covers clients, workspaces, suppliers, employees.
 *
 * @generated from enum domain.tax.v1.TaxRegistrationPartyType
 */
export declare enum TaxRegistrationPartyType {
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_TYPE_CLIENT = 1;
     */
    CLIENT = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_TYPE_WORKSPACE = 2;
     */
    WORKSPACE = 2,
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_TYPE_SUPPLIER = 3;
     */
    SUPPLIER = 3,
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_TYPE_EMPLOYEE = 4;
     */
    EMPLOYEE = 4
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationPartyType.
 */
export declare const TaxRegistrationPartyTypeSchema: GenEnum<TaxRegistrationPartyType>;
/**
 * ComputePathSnapshot — denormed from TaxRegistrationKind.compute_path for
 * the partial unique index on (party_type, party_id, tax_authority_id,
 * compute_path_snapshot) WHERE status='ACTIVE'.
 *
 * @generated from enum domain.tax.v1.TaxRegistrationComputePathSnapshot
 */
export declare enum TaxRegistrationComputePathSnapshot {
    /**
     * @generated from enum value: TAX_REGISTRATION_COMPUTE_PATH_SNAPSHOT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_COMPUTE_PATH_SNAPSHOT_SURCHARGE = 1;
     */
    SURCHARGE = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_COMPUTE_PATH_SNAPSHOT_WITHHOLDING = 2;
     */
    WITHHOLDING = 2,
    /**
     * @generated from enum value: TAX_REGISTRATION_COMPUTE_PATH_SNAPSHOT_PERIODIC_ONLY = 3;
     */
    PERIODIC_ONLY = 3,
    /**
     * @generated from enum value: TAX_REGISTRATION_COMPUTE_PATH_SNAPSHOT_NONE = 4;
     */
    NONE = 4
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationComputePathSnapshot.
 */
export declare const TaxRegistrationComputePathSnapshotSchema: GenEnum<TaxRegistrationComputePathSnapshot>;
/**
 * PartyRoleSnapshot — denormed from TaxRegistrationKind.party_role.
 *
 * @generated from enum domain.tax.v1.TaxRegistrationPartyRoleSnapshot
 */
export declare enum TaxRegistrationPartyRoleSnapshot {
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_ROLE_SNAPSHOT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_ROLE_SNAPSHOT_SELLER = 1;
     */
    SELLER = 1,
    /**
     * @generated from enum value: TAX_REGISTRATION_PARTY_ROLE_SNAPSHOT_BUYER = 2;
     */
    BUYER = 2
}
/**
 * Describes the enum domain.tax.v1.TaxRegistrationPartyRoleSnapshot.
 */
export declare const TaxRegistrationPartyRoleSnapshotSchema: GenEnum<TaxRegistrationPartyRoleSnapshot>;
/**
 * @generated from service domain.tax.v1.TaxRegistrationDomainService
 */
export declare const TaxRegistrationDomainService: GenService<{
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.CreateTaxRegistration
     */
    createTaxRegistration: {
        methodKind: "unary";
        input: typeof CreateTaxRegistrationRequestSchema;
        output: typeof CreateTaxRegistrationResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.ReadTaxRegistration
     */
    readTaxRegistration: {
        methodKind: "unary";
        input: typeof ReadTaxRegistrationRequestSchema;
        output: typeof ReadTaxRegistrationResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.UpdateTaxRegistration
     */
    updateTaxRegistration: {
        methodKind: "unary";
        input: typeof UpdateTaxRegistrationRequestSchema;
        output: typeof UpdateTaxRegistrationResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.DeleteTaxRegistration
     */
    deleteTaxRegistration: {
        methodKind: "unary";
        input: typeof DeleteTaxRegistrationRequestSchema;
        output: typeof DeleteTaxRegistrationResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.ListTaxRegistrations
     */
    listTaxRegistrations: {
        methodKind: "unary";
        input: typeof ListTaxRegistrationsRequestSchema;
        output: typeof ListTaxRegistrationsResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.GetTaxRegistrationListPageData
     */
    getTaxRegistrationListPageData: {
        methodKind: "unary";
        input: typeof GetTaxRegistrationListPageDataRequestSchema;
        output: typeof GetTaxRegistrationListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.tax.v1.TaxRegistrationDomainService.GetTaxRegistrationItemPageData
     */
    getTaxRegistrationItemPageData: {
        methodKind: "unary";
        input: typeof GetTaxRegistrationItemPageDataRequestSchema;
        output: typeof GetTaxRegistrationItemPageDataResponseSchema;
    };
}>;
