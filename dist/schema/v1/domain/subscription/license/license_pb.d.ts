import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Subscription } from "../subscription/subscription_pb";
import type { Plan } from "../plan/plan_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/license/license.proto.
 */
export declare const file_domain_subscription_license_license: GenFile;
/**
 * LicenseEntitlement defines what access a license grants
 *
 * @generated from message domain.subscription.v1.LicenseEntitlement
 */
export type LicenseEntitlement = Message<"domain.subscription.v1.LicenseEntitlement"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string license_id = 2;
     */
    licenseId: string;
    /**
     * Entitlement type
     *
     * "location_access", "feature", "usage_quota", "content", "product"
     *
     * @generated from field: string entitlement_type = 3;
     */
    entitlementType: string;
    /**
     * Type-specific references
     *
     * For product/course/subject access
     *
     * @generated from field: optional string product_id = 4;
     */
    productId?: string;
    /**
     * For location access
     *
     * @generated from field: optional string location_id = 5;
     */
    locationId?: string;
    /**
     * For feature flags
     *
     * @generated from field: optional string feature_code = 6;
     */
    featureCode?: string;
    /**
     * For content access
     *
     * @generated from field: optional string content_id = 7;
     */
    contentId?: string;
    /**
     * Usage limits (for quota-based)
     *
     * Max uses (null = unlimited)
     *
     * @generated from field: optional int32 usage_limit = 8;
     */
    usageLimit?: number;
    /**
     * Current usage
     *
     * @generated from field: optional int32 usage_count = 9;
     */
    usageCount?: number;
    /**
     * "daily", "weekly", "monthly", "lifetime"
     *
     * @generated from field: optional string usage_period = 10;
     */
    usagePeriod?: string;
    /**
     * Status
     *
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.LicenseEntitlement.
 * Use `create(LicenseEntitlementSchema)` to create a new message.
 */
export declare const LicenseEntitlementSchema: GenMessage<LicenseEntitlement>;
/**
 * License represents a single assignable unit from subscription pool
 *
 * @generated from message domain.subscription.v1.License
 */
export type License = Message<"domain.subscription.v1.License"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent reference
     *
     * @generated from field: string subscription_id = 2;
     */
    subscriptionId: string;
    /**
     * @generated from field: optional domain.subscription.v1.Subscription subscription = 3;
     */
    subscription?: Subscription;
    /**
     * Product reference
     *
     * @generated from field: string plan_id = 4;
     */
    planId: string;
    /**
     * @generated from field: optional domain.subscription.v1.Plan plan = 5;
     */
    plan?: Plan;
    /**
     * License identification
     *
     * Human-readable (e.g., "GYM-2024-XXXX")
     *
     * @generated from field: string license_key = 6;
     */
    licenseKey: string;
    /**
     * External system reference
     *
     * @generated from field: optional string external_key = 7;
     */
    externalKey?: string;
    /**
     * Type and status
     *
     * @generated from field: domain.subscription.v1.LicenseType license_type = 8;
     */
    licenseType: LicenseType;
    /**
     * @generated from field: domain.subscription.v1.LicenseStatus status = 9;
     */
    status: LicenseStatus;
    /**
     * Validity period (can differ from subscription)
     *
     * @generated from field: optional int64 date_valid_from = 10;
     */
    dateValidFrom?: bigint;
    /**
     * @generated from field: optional string date_valid_from_string = 11;
     */
    dateValidFromString?: string;
    /**
     * @generated from field: optional int64 date_valid_until = 12;
     */
    dateValidUntil?: bigint;
    /**
     * @generated from field: optional string date_valid_until_string = 13;
     */
    dateValidUntilString?: string;
    /**
     * Assignment fields (flattened - license IS the assignment)
     *
     * Who holds this license
     *
     * @generated from field: optional string assignee_id = 14;
     */
    assigneeId?: string;
    /**
     * "client", "user", "device", "tenant"
     *
     * @generated from field: optional string assignee_type = 15;
     */
    assigneeType?: string;
    /**
     * Denormalized for display
     *
     * @generated from field: optional string assignee_name = 16;
     */
    assigneeName?: string;
    /**
     * Who made the assignment
     *
     * @generated from field: optional string assigned_by = 17;
     */
    assignedBy?: string;
    /**
     * When assigned
     *
     * @generated from field: optional int64 date_assigned = 18;
     */
    dateAssigned?: bigint;
    /**
     * @generated from field: optional string date_assigned_string = 19;
     */
    dateAssignedString?: string;
    /**
     * Sequence within subscription (seat 1 of 5)
     *
     * @generated from field: optional int32 sequence_number = 20;
     */
    sequenceNumber?: number;
    /**
     * Flexible metadata
     *
     * @generated from field: map<string, string> metadata = 21;
     */
    metadata: {
        [key: string]: string;
    };
    /**
     * Entitlements (what this license grants)
     *
     * @generated from field: repeated domain.subscription.v1.LicenseEntitlement entitlements = 22;
     */
    entitlements: LicenseEntitlement[];
    /**
     * Audit fields
     *
     * @generated from field: optional int64 date_created = 23;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 24;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 25;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 26;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 27;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.License.
 * Use `create(LicenseSchema)` to create a new message.
 */
export declare const LicenseSchema: GenMessage<License>;
/**
 * @generated from message domain.subscription.v1.CreateLicenseRequest
 */
export type CreateLicenseRequest = Message<"domain.subscription.v1.CreateLicenseRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.License data = 1;
     */
    data?: License;
};
/**
 * Describes the message domain.subscription.v1.CreateLicenseRequest.
 * Use `create(CreateLicenseRequestSchema)` to create a new message.
 */
export declare const CreateLicenseRequestSchema: GenMessage<CreateLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.CreateLicenseResponse
 */
export type CreateLicenseResponse = Message<"domain.subscription.v1.CreateLicenseResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.License data = 1;
     */
    data: License[];
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
 * Describes the message domain.subscription.v1.CreateLicenseResponse.
 * Use `create(CreateLicenseResponseSchema)` to create a new message.
 */
export declare const CreateLicenseResponseSchema: GenMessage<CreateLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.ReadLicenseRequest
 */
export type ReadLicenseRequest = Message<"domain.subscription.v1.ReadLicenseRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.License data = 1;
     */
    data?: License;
};
/**
 * Describes the message domain.subscription.v1.ReadLicenseRequest.
 * Use `create(ReadLicenseRequestSchema)` to create a new message.
 */
export declare const ReadLicenseRequestSchema: GenMessage<ReadLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.ReadLicenseResponse
 */
export type ReadLicenseResponse = Message<"domain.subscription.v1.ReadLicenseResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.License data = 1;
     */
    data: License[];
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
 * Describes the message domain.subscription.v1.ReadLicenseResponse.
 * Use `create(ReadLicenseResponseSchema)` to create a new message.
 */
export declare const ReadLicenseResponseSchema: GenMessage<ReadLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.UpdateLicenseRequest
 */
export type UpdateLicenseRequest = Message<"domain.subscription.v1.UpdateLicenseRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.License data = 1;
     */
    data?: License;
};
/**
 * Describes the message domain.subscription.v1.UpdateLicenseRequest.
 * Use `create(UpdateLicenseRequestSchema)` to create a new message.
 */
export declare const UpdateLicenseRequestSchema: GenMessage<UpdateLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.UpdateLicenseResponse
 */
export type UpdateLicenseResponse = Message<"domain.subscription.v1.UpdateLicenseResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.License data = 1;
     */
    data: License[];
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
 * Describes the message domain.subscription.v1.UpdateLicenseResponse.
 * Use `create(UpdateLicenseResponseSchema)` to create a new message.
 */
export declare const UpdateLicenseResponseSchema: GenMessage<UpdateLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.DeleteLicenseRequest
 */
export type DeleteLicenseRequest = Message<"domain.subscription.v1.DeleteLicenseRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.License data = 1;
     */
    data?: License;
};
/**
 * Describes the message domain.subscription.v1.DeleteLicenseRequest.
 * Use `create(DeleteLicenseRequestSchema)` to create a new message.
 */
export declare const DeleteLicenseRequestSchema: GenMessage<DeleteLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.DeleteLicenseResponse
 */
export type DeleteLicenseResponse = Message<"domain.subscription.v1.DeleteLicenseResponse"> & {
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
 * Describes the message domain.subscription.v1.DeleteLicenseResponse.
 * Use `create(DeleteLicenseResponseSchema)` to create a new message.
 */
export declare const DeleteLicenseResponseSchema: GenMessage<DeleteLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.ListLicensesRequest
 */
export type ListLicensesRequest = Message<"domain.subscription.v1.ListLicensesRequest"> & {
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
 * Describes the message domain.subscription.v1.ListLicensesRequest.
 * Use `create(ListLicensesRequestSchema)` to create a new message.
 */
export declare const ListLicensesRequestSchema: GenMessage<ListLicensesRequest>;
/**
 * @generated from message domain.subscription.v1.ListLicensesResponse
 */
export type ListLicensesResponse = Message<"domain.subscription.v1.ListLicensesResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.License data = 1;
     */
    data: License[];
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
 * Describes the message domain.subscription.v1.ListLicensesResponse.
 * Use `create(ListLicensesResponseSchema)` to create a new message.
 */
export declare const ListLicensesResponseSchema: GenMessage<ListLicensesResponse>;
/**
 * @generated from message domain.subscription.v1.GetLicenseListPageDataRequest
 */
export type GetLicenseListPageDataRequest = Message<"domain.subscription.v1.GetLicenseListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.subscription.v1.GetLicenseListPageDataRequest.
 * Use `create(GetLicenseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLicenseListPageDataRequestSchema: GenMessage<GetLicenseListPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetLicenseListPageDataResponse
 */
export type GetLicenseListPageDataResponse = Message<"domain.subscription.v1.GetLicenseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.License license_list = 1;
     */
    licenseList: License[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.subscription.v1.GetLicenseListPageDataResponse.
 * Use `create(GetLicenseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLicenseListPageDataResponseSchema: GenMessage<GetLicenseListPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.GetLicenseItemPageDataRequest
 */
export type GetLicenseItemPageDataRequest = Message<"domain.subscription.v1.GetLicenseItemPageDataRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
};
/**
 * Describes the message domain.subscription.v1.GetLicenseItemPageDataRequest.
 * Use `create(GetLicenseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLicenseItemPageDataRequestSchema: GenMessage<GetLicenseItemPageDataRequest>;
/**
 * @generated from message domain.subscription.v1.GetLicenseItemPageDataResponse
 */
export type GetLicenseItemPageDataResponse = Message<"domain.subscription.v1.GetLicenseItemPageDataResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.License license = 1;
     */
    license?: License;
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
 * Describes the message domain.subscription.v1.GetLicenseItemPageDataResponse.
 * Use `create(GetLicenseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLicenseItemPageDataResponseSchema: GenMessage<GetLicenseItemPageDataResponse>;
/**
 * @generated from message domain.subscription.v1.AssignLicenseRequest
 */
export type AssignLicenseRequest = Message<"domain.subscription.v1.AssignLicenseRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
    /**
     * @generated from field: string assignee_id = 2;
     */
    assigneeId: string;
    /**
     * "client", "user", "device", "tenant"
     *
     * @generated from field: string assignee_type = 3;
     */
    assigneeType: string;
    /**
     * @generated from field: optional string assignee_name = 4;
     */
    assigneeName?: string;
    /**
     * Who is performing the assignment
     *
     * @generated from field: string assigned_by = 5;
     */
    assignedBy: string;
    /**
     * Optional reason for assignment
     *
     * @generated from field: optional string reason = 6;
     */
    reason?: string;
};
/**
 * Describes the message domain.subscription.v1.AssignLicenseRequest.
 * Use `create(AssignLicenseRequestSchema)` to create a new message.
 */
export declare const AssignLicenseRequestSchema: GenMessage<AssignLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.AssignLicenseResponse
 */
export type AssignLicenseResponse = Message<"domain.subscription.v1.AssignLicenseResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.License license = 1;
     */
    license?: License;
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
 * Describes the message domain.subscription.v1.AssignLicenseResponse.
 * Use `create(AssignLicenseResponseSchema)` to create a new message.
 */
export declare const AssignLicenseResponseSchema: GenMessage<AssignLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.RevokeLicenseAssignmentRequest
 */
export type RevokeLicenseAssignmentRequest = Message<"domain.subscription.v1.RevokeLicenseAssignmentRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
    /**
     * Who is performing the revocation
     *
     * @generated from field: string performed_by = 2;
     */
    performedBy: string;
    /**
     * Optional reason for revocation
     *
     * @generated from field: optional string reason = 3;
     */
    reason?: string;
};
/**
 * Describes the message domain.subscription.v1.RevokeLicenseAssignmentRequest.
 * Use `create(RevokeLicenseAssignmentRequestSchema)` to create a new message.
 */
export declare const RevokeLicenseAssignmentRequestSchema: GenMessage<RevokeLicenseAssignmentRequest>;
/**
 * @generated from message domain.subscription.v1.RevokeLicenseAssignmentResponse
 */
export type RevokeLicenseAssignmentResponse = Message<"domain.subscription.v1.RevokeLicenseAssignmentResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.License license = 1;
     */
    license?: License;
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
 * Describes the message domain.subscription.v1.RevokeLicenseAssignmentResponse.
 * Use `create(RevokeLicenseAssignmentResponseSchema)` to create a new message.
 */
export declare const RevokeLicenseAssignmentResponseSchema: GenMessage<RevokeLicenseAssignmentResponse>;
/**
 * @generated from message domain.subscription.v1.ReassignLicenseRequest
 */
export type ReassignLicenseRequest = Message<"domain.subscription.v1.ReassignLicenseRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
    /**
     * @generated from field: string new_assignee_id = 2;
     */
    newAssigneeId: string;
    /**
     * "client", "user", "device", "tenant"
     *
     * @generated from field: string new_assignee_type = 3;
     */
    newAssigneeType: string;
    /**
     * @generated from field: optional string new_assignee_name = 4;
     */
    newAssigneeName?: string;
    /**
     * Who is performing the reassignment
     *
     * @generated from field: string performed_by = 5;
     */
    performedBy: string;
    /**
     * Optional reason for reassignment
     *
     * @generated from field: optional string reason = 6;
     */
    reason?: string;
};
/**
 * Describes the message domain.subscription.v1.ReassignLicenseRequest.
 * Use `create(ReassignLicenseRequestSchema)` to create a new message.
 */
export declare const ReassignLicenseRequestSchema: GenMessage<ReassignLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.ReassignLicenseResponse
 */
export type ReassignLicenseResponse = Message<"domain.subscription.v1.ReassignLicenseResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.License license = 1;
     */
    license?: License;
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
 * Describes the message domain.subscription.v1.ReassignLicenseResponse.
 * Use `create(ReassignLicenseResponseSchema)` to create a new message.
 */
export declare const ReassignLicenseResponseSchema: GenMessage<ReassignLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.SuspendLicenseRequest
 */
export type SuspendLicenseRequest = Message<"domain.subscription.v1.SuspendLicenseRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
    /**
     * Who is performing the suspension
     *
     * @generated from field: string performed_by = 2;
     */
    performedBy: string;
    /**
     * Optional reason for suspension
     *
     * @generated from field: optional string reason = 3;
     */
    reason?: string;
};
/**
 * Describes the message domain.subscription.v1.SuspendLicenseRequest.
 * Use `create(SuspendLicenseRequestSchema)` to create a new message.
 */
export declare const SuspendLicenseRequestSchema: GenMessage<SuspendLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.SuspendLicenseResponse
 */
export type SuspendLicenseResponse = Message<"domain.subscription.v1.SuspendLicenseResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.License license = 1;
     */
    license?: License;
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
 * Describes the message domain.subscription.v1.SuspendLicenseResponse.
 * Use `create(SuspendLicenseResponseSchema)` to create a new message.
 */
export declare const SuspendLicenseResponseSchema: GenMessage<SuspendLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.ReactivateLicenseRequest
 */
export type ReactivateLicenseRequest = Message<"domain.subscription.v1.ReactivateLicenseRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
    /**
     * Who is performing the reactivation
     *
     * @generated from field: string performed_by = 2;
     */
    performedBy: string;
    /**
     * Optional reason for reactivation
     *
     * @generated from field: optional string reason = 3;
     */
    reason?: string;
};
/**
 * Describes the message domain.subscription.v1.ReactivateLicenseRequest.
 * Use `create(ReactivateLicenseRequestSchema)` to create a new message.
 */
export declare const ReactivateLicenseRequestSchema: GenMessage<ReactivateLicenseRequest>;
/**
 * @generated from message domain.subscription.v1.ReactivateLicenseResponse
 */
export type ReactivateLicenseResponse = Message<"domain.subscription.v1.ReactivateLicenseResponse"> & {
    /**
     * @generated from field: domain.subscription.v1.License license = 1;
     */
    license?: License;
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
 * Describes the message domain.subscription.v1.ReactivateLicenseResponse.
 * Use `create(ReactivateLicenseResponseSchema)` to create a new message.
 */
export declare const ReactivateLicenseResponseSchema: GenMessage<ReactivateLicenseResponse>;
/**
 * @generated from message domain.subscription.v1.ValidateLicenseAccessRequest
 */
export type ValidateLicenseAccessRequest = Message<"domain.subscription.v1.ValidateLicenseAccessRequest"> & {
    /**
     * @generated from field: string license_id = 1;
     */
    licenseId: string;
    /**
     * Alternative to license_id
     *
     * @generated from field: optional string license_key = 2;
     */
    licenseKey?: string;
    /**
     * Validate for specific assignee
     *
     * @generated from field: optional string assignee_id = 3;
     */
    assigneeId?: string;
    /**
     * Validate assignee type matches
     *
     * @generated from field: optional string assignee_type = 4;
     */
    assigneeType?: string;
    /**
     * Check specific entitlement type
     *
     * @generated from field: optional string entitlement_type = 5;
     */
    entitlementType?: string;
    /**
     * Check access to specific resource
     *
     * @generated from field: optional string resource_id = 6;
     */
    resourceId?: string;
};
/**
 * Describes the message domain.subscription.v1.ValidateLicenseAccessRequest.
 * Use `create(ValidateLicenseAccessRequestSchema)` to create a new message.
 */
export declare const ValidateLicenseAccessRequestSchema: GenMessage<ValidateLicenseAccessRequest>;
/**
 * @generated from message domain.subscription.v1.ValidateLicenseAccessResponse
 */
export type ValidateLicenseAccessResponse = Message<"domain.subscription.v1.ValidateLicenseAccessResponse"> & {
    /**
     * @generated from field: bool is_valid = 1;
     */
    isValid: boolean;
    /**
     * @generated from field: domain.subscription.v1.License license = 2;
     */
    license?: License;
    /**
     * @generated from field: optional string validation_message = 3;
     */
    validationMessage?: string;
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
 * Describes the message domain.subscription.v1.ValidateLicenseAccessResponse.
 * Use `create(ValidateLicenseAccessResponseSchema)` to create a new message.
 */
export declare const ValidateLicenseAccessResponseSchema: GenMessage<ValidateLicenseAccessResponse>;
/**
 * @generated from message domain.subscription.v1.CreateLicensesFromPlanRequest
 */
export type CreateLicensesFromPlanRequest = Message<"domain.subscription.v1.CreateLicensesFromPlanRequest"> & {
    /**
     * @generated from field: string subscription_id = 1;
     */
    subscriptionId: string;
    /**
     * @generated from field: string plan_id = 2;
     */
    planId: string;
    /**
     * Number of licenses to create
     *
     * @generated from field: int32 quantity = 3;
     */
    quantity: number;
    /**
     * Default license type for created licenses
     *
     * @generated from field: optional string default_license_type = 4;
     */
    defaultLicenseType?: string;
    /**
     * Auto-assign first license to subscription client
     *
     * @generated from field: optional bool auto_assign_to_purchaser = 5;
     */
    autoAssignToPurchaser?: boolean;
};
/**
 * Describes the message domain.subscription.v1.CreateLicensesFromPlanRequest.
 * Use `create(CreateLicensesFromPlanRequestSchema)` to create a new message.
 */
export declare const CreateLicensesFromPlanRequestSchema: GenMessage<CreateLicensesFromPlanRequest>;
/**
 * @generated from message domain.subscription.v1.CreateLicensesFromPlanResponse
 */
export type CreateLicensesFromPlanResponse = Message<"domain.subscription.v1.CreateLicensesFromPlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.License licenses = 1;
     */
    licenses: License[];
    /**
     * @generated from field: int32 created_count = 2;
     */
    createdCount: number;
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
 * Describes the message domain.subscription.v1.CreateLicensesFromPlanResponse.
 * Use `create(CreateLicensesFromPlanResponseSchema)` to create a new message.
 */
export declare const CreateLicensesFromPlanResponseSchema: GenMessage<CreateLicensesFromPlanResponse>;
/**
 * LicenseType defines the assignment model
 *
 * @generated from enum domain.subscription.v1.LicenseType
 */
export declare enum LicenseType {
    /**
     * @generated from enum value: LICENSE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Assigned to specific user/client
     *
     * @generated from enum value: LICENSE_TYPE_USER = 1;
     */
    USER = 1,
    /**
     * Assigned to device
     *
     * @generated from enum value: LICENSE_TYPE_DEVICE = 2;
     */
    DEVICE = 2,
    /**
     * Org-wide, not individually assigned
     *
     * @generated from enum value: LICENSE_TYPE_TENANT = 3;
     */
    TENANT = 3,
    /**
     * Pool-based, checked out on use
     *
     * @generated from enum value: LICENSE_TYPE_FLOATING = 4;
     */
    FLOATING = 4
}
/**
 * Describes the enum domain.subscription.v1.LicenseType.
 */
export declare const LicenseTypeSchema: GenEnum<LicenseType>;
/**
 * LicenseStatus tracks lifecycle state
 *
 * @generated from enum domain.subscription.v1.LicenseStatus
 */
export declare enum LicenseStatus {
    /**
     * @generated from enum value: LICENSE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Created but not active
     *
     * @generated from enum value: LICENSE_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * Active and usable
     *
     * @generated from enum value: LICENSE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * Temporarily disabled
     *
     * @generated from enum value: LICENSE_STATUS_SUSPENDED = 3;
     */
    SUSPENDED = 3,
    /**
     * Permanently disabled
     *
     * @generated from enum value: LICENSE_STATUS_REVOKED = 4;
     */
    REVOKED = 4,
    /**
     * Past validity date
     *
     * @generated from enum value: LICENSE_STATUS_EXPIRED = 5;
     */
    EXPIRED = 5
}
/**
 * Describes the enum domain.subscription.v1.LicenseStatus.
 */
export declare const LicenseStatusSchema: GenEnum<LicenseStatus>;
/**
 * @generated from service domain.subscription.v1.LicenseDomainService
 */
export declare const LicenseDomainService: GenService<{
    /**
     * Standard CRUD
     *
     * @generated from rpc domain.subscription.v1.LicenseDomainService.CreateLicense
     */
    createLicense: {
        methodKind: "unary";
        input: typeof CreateLicenseRequestSchema;
        output: typeof CreateLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.ReadLicense
     */
    readLicense: {
        methodKind: "unary";
        input: typeof ReadLicenseRequestSchema;
        output: typeof ReadLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.UpdateLicense
     */
    updateLicense: {
        methodKind: "unary";
        input: typeof UpdateLicenseRequestSchema;
        output: typeof UpdateLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.DeleteLicense
     */
    deleteLicense: {
        methodKind: "unary";
        input: typeof DeleteLicenseRequestSchema;
        output: typeof DeleteLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.ListLicenses
     */
    listLicenses: {
        methodKind: "unary";
        input: typeof ListLicensesRequestSchema;
        output: typeof ListLicensesResponseSchema;
    };
    /**
     * Page data
     *
     * @generated from rpc domain.subscription.v1.LicenseDomainService.GetLicenseListPageData
     */
    getLicenseListPageData: {
        methodKind: "unary";
        input: typeof GetLicenseListPageDataRequestSchema;
        output: typeof GetLicenseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.GetLicenseItemPageData
     */
    getLicenseItemPageData: {
        methodKind: "unary";
        input: typeof GetLicenseItemPageDataRequestSchema;
        output: typeof GetLicenseItemPageDataResponseSchema;
    };
    /**
     * Assignment operations
     *
     * @generated from rpc domain.subscription.v1.LicenseDomainService.AssignLicense
     */
    assignLicense: {
        methodKind: "unary";
        input: typeof AssignLicenseRequestSchema;
        output: typeof AssignLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.RevokeLicenseAssignment
     */
    revokeLicenseAssignment: {
        methodKind: "unary";
        input: typeof RevokeLicenseAssignmentRequestSchema;
        output: typeof RevokeLicenseAssignmentResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.ReassignLicense
     */
    reassignLicense: {
        methodKind: "unary";
        input: typeof ReassignLicenseRequestSchema;
        output: typeof ReassignLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.SuspendLicense
     */
    suspendLicense: {
        methodKind: "unary";
        input: typeof SuspendLicenseRequestSchema;
        output: typeof SuspendLicenseResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.LicenseDomainService.ReactivateLicense
     */
    reactivateLicense: {
        methodKind: "unary";
        input: typeof ReactivateLicenseRequestSchema;
        output: typeof ReactivateLicenseResponseSchema;
    };
    /**
     * Validation
     *
     * @generated from rpc domain.subscription.v1.LicenseDomainService.ValidateLicenseAccess
     */
    validateLicenseAccess: {
        methodKind: "unary";
        input: typeof ValidateLicenseAccessRequestSchema;
        output: typeof ValidateLicenseAccessResponseSchema;
    };
    /**
     * Bulk operations
     *
     * @generated from rpc domain.subscription.v1.LicenseDomainService.CreateLicensesFromPlan
     */
    createLicensesFromPlan: {
        methodKind: "unary";
        input: typeof CreateLicensesFromPlanRequestSchema;
        output: typeof CreateLicensesFromPlanResponseSchema;
    };
}>;
