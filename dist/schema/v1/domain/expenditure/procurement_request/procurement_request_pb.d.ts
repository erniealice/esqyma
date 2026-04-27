import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Supplier } from "../../entity/supplier/supplier_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/procurement_request/procurement_request.proto.
 */
export declare const file_domain_expenditure_procurement_request_procurement_request: GenFile;
/**
 * ProcurementRequest represents an internal purchase intent.
 * The supplier_id is optional: an RFQ-style request may not have a supplier yet.
 * On approval, a PurchaseOrder is spawned via SpawnPurchaseOrder (which sets
 * purchase_order.procurement_request_id back to this record).
 *
 * This is distinct from SupplierContract: a request is an internal intent;
 * a contract is a standing standing commitment with a supplier.
 *
 * @generated from message domain.expenditure.v1.ProcurementRequest
 */
export type ProcurementRequest = Message<"domain.expenditure.v1.ProcurementRequest"> & {
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
     * human-readable ID
     *
     * @generated from field: string request_number = 8;
     */
    requestNumber: string;
    /**
     * Status
     *
     * @generated from field: domain.expenditure.v1.ProcurementRequestStatus status = 10;
     */
    status: ProcurementRequestStatus;
    /**
     * Requester
     *
     * FK to user
     *
     * @generated from field: string requester_user_id = 11;
     */
    requesterUserId: string;
    /**
     * Counterparty (optional — may be null when RFQ pre-quote)
     *
     * @generated from field: optional string supplier_id = 12;
     */
    supplierId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Supplier supplier = 13;
     */
    supplier?: Supplier;
    /**
     * Scope
     *
     * @generated from field: optional string location_id = 14;
     */
    locationId?: string;
    /**
     * Money
     *
     * @generated from field: string currency = 20;
     */
    currency: string;
    /**
     * centavos
     *
     * @generated from field: int64 estimated_total_amount = 21;
     */
    estimatedTotalAmount: bigint;
    /**
     * Needed-by
     *
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string needed_by_date = 22;
     */
    neededByDate?: string;
    /**
     * Justification
     *
     * @generated from field: optional string justification = 23;
     */
    justification?: string;
    /**
     * @generated from field: optional string notes = 24;
     */
    notes?: string;
    /**
     * Approval
     *
     * @generated from field: optional string approved_by = 30;
     */
    approvedBy?: string;
    /**
     * @generated from field: optional int64 approved_at = 31;
     */
    approvedAt?: bigint;
    /**
     * @generated from field: optional string approved_at_string = 32;
     */
    approvedAtString?: string;
    /**
     * @generated from field: optional string rejection_reason = 33;
     */
    rejectionReason?: string;
    /**
     * Spawned artifacts (set after approval)
     *
     * @generated from field: optional string purchase_order_id = 40;
     */
    purchaseOrderId?: string;
    /**
     * GL / categorization
     *
     * @generated from field: optional string expenditure_category_id = 50;
     */
    expenditureCategoryId?: string;
    /**
     * @generated from field: optional string expense_account_id = 51;
     */
    expenseAccountId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ProcurementRequest.
 * Use `create(ProcurementRequestSchema)` to create a new message.
 */
export declare const ProcurementRequestSchema: GenMessage<ProcurementRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateProcurementRequestRequest
 */
export type CreateProcurementRequestRequest = Message<"domain.expenditure.v1.CreateProcurementRequestRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
};
/**
 * Describes the message domain.expenditure.v1.CreateProcurementRequestRequest.
 * Use `create(CreateProcurementRequestRequestSchema)` to create a new message.
 */
export declare const CreateProcurementRequestRequestSchema: GenMessage<CreateProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateProcurementRequestResponse
 */
export type CreateProcurementRequestResponse = Message<"domain.expenditure.v1.CreateProcurementRequestResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data: ProcurementRequest[];
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
 * Describes the message domain.expenditure.v1.CreateProcurementRequestResponse.
 * Use `create(CreateProcurementRequestResponseSchema)` to create a new message.
 */
export declare const CreateProcurementRequestResponseSchema: GenMessage<CreateProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadProcurementRequestRequest
 */
export type ReadProcurementRequestRequest = Message<"domain.expenditure.v1.ReadProcurementRequestRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
};
/**
 * Describes the message domain.expenditure.v1.ReadProcurementRequestRequest.
 * Use `create(ReadProcurementRequestRequestSchema)` to create a new message.
 */
export declare const ReadProcurementRequestRequestSchema: GenMessage<ReadProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadProcurementRequestResponse
 */
export type ReadProcurementRequestResponse = Message<"domain.expenditure.v1.ReadProcurementRequestResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data: ProcurementRequest[];
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
 * Describes the message domain.expenditure.v1.ReadProcurementRequestResponse.
 * Use `create(ReadProcurementRequestResponseSchema)` to create a new message.
 */
export declare const ReadProcurementRequestResponseSchema: GenMessage<ReadProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateProcurementRequestRequest
 */
export type UpdateProcurementRequestRequest = Message<"domain.expenditure.v1.UpdateProcurementRequestRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
};
/**
 * Describes the message domain.expenditure.v1.UpdateProcurementRequestRequest.
 * Use `create(UpdateProcurementRequestRequestSchema)` to create a new message.
 */
export declare const UpdateProcurementRequestRequestSchema: GenMessage<UpdateProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateProcurementRequestResponse
 */
export type UpdateProcurementRequestResponse = Message<"domain.expenditure.v1.UpdateProcurementRequestResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data: ProcurementRequest[];
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
 * Describes the message domain.expenditure.v1.UpdateProcurementRequestResponse.
 * Use `create(UpdateProcurementRequestResponseSchema)` to create a new message.
 */
export declare const UpdateProcurementRequestResponseSchema: GenMessage<UpdateProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteProcurementRequestRequest
 */
export type DeleteProcurementRequestRequest = Message<"domain.expenditure.v1.DeleteProcurementRequestRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
};
/**
 * Describes the message domain.expenditure.v1.DeleteProcurementRequestRequest.
 * Use `create(DeleteProcurementRequestRequestSchema)` to create a new message.
 */
export declare const DeleteProcurementRequestRequestSchema: GenMessage<DeleteProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteProcurementRequestResponse
 */
export type DeleteProcurementRequestResponse = Message<"domain.expenditure.v1.DeleteProcurementRequestResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteProcurementRequestResponse.
 * Use `create(DeleteProcurementRequestResponseSchema)` to create a new message.
 */
export declare const DeleteProcurementRequestResponseSchema: GenMessage<DeleteProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.ListProcurementRequestsRequest
 */
export type ListProcurementRequestsRequest = Message<"domain.expenditure.v1.ListProcurementRequestsRequest"> & {
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
     * @generated from field: optional domain.expenditure.v1.ProcurementRequestStatus status = 6;
     */
    status?: ProcurementRequestStatus;
    /**
     * @generated from field: optional string workspace_id = 7;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ListProcurementRequestsRequest.
 * Use `create(ListProcurementRequestsRequestSchema)` to create a new message.
 */
export declare const ListProcurementRequestsRequestSchema: GenMessage<ListProcurementRequestsRequest>;
/**
 * @generated from message domain.expenditure.v1.ListProcurementRequestsResponse
 */
export type ListProcurementRequestsResponse = Message<"domain.expenditure.v1.ListProcurementRequestsResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data: ProcurementRequest[];
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
 * Describes the message domain.expenditure.v1.ListProcurementRequestsResponse.
 * Use `create(ListProcurementRequestsResponseSchema)` to create a new message.
 */
export declare const ListProcurementRequestsResponseSchema: GenMessage<ListProcurementRequestsResponse>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestListPageDataRequest
 */
export type GetProcurementRequestListPageDataRequest = Message<"domain.expenditure.v1.GetProcurementRequestListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetProcurementRequestListPageDataRequest.
 * Use `create(GetProcurementRequestListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProcurementRequestListPageDataRequestSchema: GenMessage<GetProcurementRequestListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestListPageDataResponse
 */
export type GetProcurementRequestListPageDataResponse = Message<"domain.expenditure.v1.GetProcurementRequestListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequest procurement_request_list = 1;
     */
    procurementRequestList: ProcurementRequest[];
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
 * Describes the message domain.expenditure.v1.GetProcurementRequestListPageDataResponse.
 * Use `create(GetProcurementRequestListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProcurementRequestListPageDataResponseSchema: GenMessage<GetProcurementRequestListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestItemPageDataRequest
 */
export type GetProcurementRequestItemPageDataRequest = Message<"domain.expenditure.v1.GetProcurementRequestItemPageDataRequest"> & {
    /**
     * @generated from field: string procurement_request_id = 1;
     */
    procurementRequestId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetProcurementRequestItemPageDataRequest.
 * Use `create(GetProcurementRequestItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProcurementRequestItemPageDataRequestSchema: GenMessage<GetProcurementRequestItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestItemPageDataResponse
 */
export type GetProcurementRequestItemPageDataResponse = Message<"domain.expenditure.v1.GetProcurementRequestItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequest procurement_request = 1;
     */
    procurementRequest?: ProcurementRequest;
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
 * Describes the message domain.expenditure.v1.GetProcurementRequestItemPageDataResponse.
 * Use `create(GetProcurementRequestItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProcurementRequestItemPageDataResponseSchema: GenMessage<GetProcurementRequestItemPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.SubmitProcurementRequestRequest
 */
export type SubmitProcurementRequestRequest = Message<"domain.expenditure.v1.SubmitProcurementRequestRequest"> & {
    /**
     * @generated from field: string procurement_request_id = 1;
     */
    procurementRequestId: string;
};
/**
 * Describes the message domain.expenditure.v1.SubmitProcurementRequestRequest.
 * Use `create(SubmitProcurementRequestRequestSchema)` to create a new message.
 */
export declare const SubmitProcurementRequestRequestSchema: GenMessage<SubmitProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.SubmitProcurementRequestResponse
 */
export type SubmitProcurementRequestResponse = Message<"domain.expenditure.v1.SubmitProcurementRequestResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
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
 * Describes the message domain.expenditure.v1.SubmitProcurementRequestResponse.
 * Use `create(SubmitProcurementRequestResponseSchema)` to create a new message.
 */
export declare const SubmitProcurementRequestResponseSchema: GenMessage<SubmitProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.ApproveProcurementRequestRequest
 */
export type ApproveProcurementRequestRequest = Message<"domain.expenditure.v1.ApproveProcurementRequestRequest"> & {
    /**
     * @generated from field: string procurement_request_id = 1;
     */
    procurementRequestId: string;
    /**
     * @generated from field: string approved_by = 2;
     */
    approvedBy: string;
};
/**
 * Describes the message domain.expenditure.v1.ApproveProcurementRequestRequest.
 * Use `create(ApproveProcurementRequestRequestSchema)` to create a new message.
 */
export declare const ApproveProcurementRequestRequestSchema: GenMessage<ApproveProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.ApproveProcurementRequestResponse
 */
export type ApproveProcurementRequestResponse = Message<"domain.expenditure.v1.ApproveProcurementRequestResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
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
 * Describes the message domain.expenditure.v1.ApproveProcurementRequestResponse.
 * Use `create(ApproveProcurementRequestResponseSchema)` to create a new message.
 */
export declare const ApproveProcurementRequestResponseSchema: GenMessage<ApproveProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.RejectProcurementRequestRequest
 */
export type RejectProcurementRequestRequest = Message<"domain.expenditure.v1.RejectProcurementRequestRequest"> & {
    /**
     * @generated from field: string procurement_request_id = 1;
     */
    procurementRequestId: string;
    /**
     * @generated from field: optional string rejection_reason = 2;
     */
    rejectionReason?: string;
};
/**
 * Describes the message domain.expenditure.v1.RejectProcurementRequestRequest.
 * Use `create(RejectProcurementRequestRequestSchema)` to create a new message.
 */
export declare const RejectProcurementRequestRequestSchema: GenMessage<RejectProcurementRequestRequest>;
/**
 * @generated from message domain.expenditure.v1.RejectProcurementRequestResponse
 */
export type RejectProcurementRequestResponse = Message<"domain.expenditure.v1.RejectProcurementRequestResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequest data = 1;
     */
    data?: ProcurementRequest;
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
 * Describes the message domain.expenditure.v1.RejectProcurementRequestResponse.
 * Use `create(RejectProcurementRequestResponseSchema)` to create a new message.
 */
export declare const RejectProcurementRequestResponseSchema: GenMessage<RejectProcurementRequestResponse>;
/**
 * @generated from message domain.expenditure.v1.SpawnPurchaseOrderRequest
 */
export type SpawnPurchaseOrderRequest = Message<"domain.expenditure.v1.SpawnPurchaseOrderRequest"> & {
    /**
     * @generated from field: string procurement_request_id = 1;
     */
    procurementRequestId: string;
};
/**
 * Describes the message domain.expenditure.v1.SpawnPurchaseOrderRequest.
 * Use `create(SpawnPurchaseOrderRequestSchema)` to create a new message.
 */
export declare const SpawnPurchaseOrderRequestSchema: GenMessage<SpawnPurchaseOrderRequest>;
/**
 * @generated from message domain.expenditure.v1.SpawnPurchaseOrderResponse
 */
export type SpawnPurchaseOrderResponse = Message<"domain.expenditure.v1.SpawnPurchaseOrderResponse"> & {
    /**
     * ID of the newly created PurchaseOrder
     *
     * @generated from field: string purchase_order_id = 1;
     */
    purchaseOrderId: string;
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
 * Describes the message domain.expenditure.v1.SpawnPurchaseOrderResponse.
 * Use `create(SpawnPurchaseOrderResponseSchema)` to create a new message.
 */
export declare const SpawnPurchaseOrderResponseSchema: GenMessage<SpawnPurchaseOrderResponse>;
/**
 * ProcurementRequestStatus drives the internal request workflow.
 *
 * @generated from enum domain.expenditure.v1.ProcurementRequestStatus
 */
export declare enum ProcurementRequestStatus {
    /**
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * editing, not yet submitted
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * submitted by requester
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_SUBMITTED = 2;
     */
    SUBMITTED = 2,
    /**
     * in approver queue
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_PENDING_APPROVAL = 3;
     */
    PENDING_APPROVAL = 3,
    /**
     * approved; ready to spawn PO
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_APPROVED = 4;
     */
    APPROVED = 4,
    /**
     * denied (terminal)
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_REJECTED = 5;
     */
    REJECTED = 5,
    /**
     * PO created and received (terminal)
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_FULFILLED = 6;
     */
    FULFILLED = 6,
    /**
     * withdrawn (terminal)
     *
     * @generated from enum value: PROCUREMENT_REQUEST_STATUS_CANCELLED = 7;
     */
    CANCELLED = 7
}
/**
 * Describes the enum domain.expenditure.v1.ProcurementRequestStatus.
 */
export declare const ProcurementRequestStatusSchema: GenEnum<ProcurementRequestStatus>;
/**
 * @generated from service domain.expenditure.v1.ProcurementRequestDomainService
 */
export declare const ProcurementRequestDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.CreateProcurementRequest
     */
    createProcurementRequest: {
        methodKind: "unary";
        input: typeof CreateProcurementRequestRequestSchema;
        output: typeof CreateProcurementRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.ReadProcurementRequest
     */
    readProcurementRequest: {
        methodKind: "unary";
        input: typeof ReadProcurementRequestRequestSchema;
        output: typeof ReadProcurementRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.UpdateProcurementRequest
     */
    updateProcurementRequest: {
        methodKind: "unary";
        input: typeof UpdateProcurementRequestRequestSchema;
        output: typeof UpdateProcurementRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.DeleteProcurementRequest
     */
    deleteProcurementRequest: {
        methodKind: "unary";
        input: typeof DeleteProcurementRequestRequestSchema;
        output: typeof DeleteProcurementRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.ListProcurementRequests
     */
    listProcurementRequests: {
        methodKind: "unary";
        input: typeof ListProcurementRequestsRequestSchema;
        output: typeof ListProcurementRequestsResponseSchema;
    };
    /**
     * Page data for UI views
     *
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.GetProcurementRequestListPageData
     */
    getProcurementRequestListPageData: {
        methodKind: "unary";
        input: typeof GetProcurementRequestListPageDataRequestSchema;
        output: typeof GetProcurementRequestListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.GetProcurementRequestItemPageData
     */
    getProcurementRequestItemPageData: {
        methodKind: "unary";
        input: typeof GetProcurementRequestItemPageDataRequestSchema;
        output: typeof GetProcurementRequestItemPageDataResponseSchema;
    };
    /**
     * Workflow actions
     *
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.SubmitProcurementRequest
     */
    submitProcurementRequest: {
        methodKind: "unary";
        input: typeof SubmitProcurementRequestRequestSchema;
        output: typeof SubmitProcurementRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.ApproveProcurementRequest
     */
    approveProcurementRequest: {
        methodKind: "unary";
        input: typeof ApproveProcurementRequestRequestSchema;
        output: typeof ApproveProcurementRequestResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.RejectProcurementRequest
     */
    rejectProcurementRequest: {
        methodKind: "unary";
        input: typeof RejectProcurementRequestRequestSchema;
        output: typeof RejectProcurementRequestResponseSchema;
    };
    /**
     * Creates a PurchaseOrder from an approved request, returns the new PO id.
     *
     * @generated from rpc domain.expenditure.v1.ProcurementRequestDomainService.SpawnPurchaseOrder
     */
    spawnPurchaseOrder: {
        methodKind: "unary";
        input: typeof SpawnPurchaseOrderRequestSchema;
        output: typeof SpawnPurchaseOrderResponseSchema;
    };
}>;
