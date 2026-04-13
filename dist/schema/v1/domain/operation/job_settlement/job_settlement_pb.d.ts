import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobActivity } from "../job_activity/job_activity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_settlement/job_settlement.proto.
 */
export declare const file_domain_operation_job_settlement_job_settlement: GenFile;
/**
 * @generated from message domain.operation.v1.JobSettlement
 */
export type JobSettlement = Message<"domain.operation.v1.JobSettlement"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string job_activity_id = 2;
     */
    jobActivityId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 3;
     */
    jobActivity?: JobActivity;
    /**
     * @generated from field: domain.operation.v1.SettlementTargetType target_type = 4;
     */
    targetType: SettlementTargetType;
    /**
     * @generated from field: string target_id = 5;
     */
    targetId: string;
    /**
     * centavos
     *
     * @generated from field: int64 allocated_amount = 6;
     */
    allocatedAmount: bigint;
    /**
     * @generated from field: optional double allocation_pct = 7;
     */
    allocationPct?: number;
    /**
     * @generated from field: optional int64 settlement_date = 8;
     */
    settlementDate?: bigint;
    /**
     * @generated from field: optional string settlement_date_string = 9;
     */
    settlementDateString?: string;
    /**
     * @generated from field: domain.operation.v1.SettlementStatus status = 10;
     */
    status: SettlementStatus;
    /**
     * @generated from field: optional string reversal_of_id = 11;
     */
    reversalOfId?: string;
    /**
     * @generated from field: optional string created_by = 12;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 13;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 14;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: bool active = 15;
     */
    active: boolean;
    /**
     * @generated from field: optional string workspace_id = 16;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.JobSettlement.
 * Use `create(JobSettlementSchema)` to create a new message.
 */
export declare const JobSettlementSchema: GenMessage<JobSettlement>;
/**
 * @generated from message domain.operation.v1.CreateJobSettlementRequest
 */
export type CreateJobSettlementRequest = Message<"domain.operation.v1.CreateJobSettlementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobSettlement data = 1;
     */
    data?: JobSettlement;
};
/**
 * Describes the message domain.operation.v1.CreateJobSettlementRequest.
 * Use `create(CreateJobSettlementRequestSchema)` to create a new message.
 */
export declare const CreateJobSettlementRequestSchema: GenMessage<CreateJobSettlementRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobSettlementResponse
 */
export type CreateJobSettlementResponse = Message<"domain.operation.v1.CreateJobSettlementResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement data = 1;
     */
    data: JobSettlement[];
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
 * Describes the message domain.operation.v1.CreateJobSettlementResponse.
 * Use `create(CreateJobSettlementResponseSchema)` to create a new message.
 */
export declare const CreateJobSettlementResponseSchema: GenMessage<CreateJobSettlementResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobSettlementRequest
 */
export type ReadJobSettlementRequest = Message<"domain.operation.v1.ReadJobSettlementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobSettlement data = 1;
     */
    data?: JobSettlement;
};
/**
 * Describes the message domain.operation.v1.ReadJobSettlementRequest.
 * Use `create(ReadJobSettlementRequestSchema)` to create a new message.
 */
export declare const ReadJobSettlementRequestSchema: GenMessage<ReadJobSettlementRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobSettlementResponse
 */
export type ReadJobSettlementResponse = Message<"domain.operation.v1.ReadJobSettlementResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement data = 1;
     */
    data: JobSettlement[];
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
 * Describes the message domain.operation.v1.ReadJobSettlementResponse.
 * Use `create(ReadJobSettlementResponseSchema)` to create a new message.
 */
export declare const ReadJobSettlementResponseSchema: GenMessage<ReadJobSettlementResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobSettlementRequest
 */
export type UpdateJobSettlementRequest = Message<"domain.operation.v1.UpdateJobSettlementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobSettlement data = 1;
     */
    data?: JobSettlement;
};
/**
 * Describes the message domain.operation.v1.UpdateJobSettlementRequest.
 * Use `create(UpdateJobSettlementRequestSchema)` to create a new message.
 */
export declare const UpdateJobSettlementRequestSchema: GenMessage<UpdateJobSettlementRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobSettlementResponse
 */
export type UpdateJobSettlementResponse = Message<"domain.operation.v1.UpdateJobSettlementResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement data = 1;
     */
    data: JobSettlement[];
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
 * Describes the message domain.operation.v1.UpdateJobSettlementResponse.
 * Use `create(UpdateJobSettlementResponseSchema)` to create a new message.
 */
export declare const UpdateJobSettlementResponseSchema: GenMessage<UpdateJobSettlementResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobSettlementRequest
 */
export type DeleteJobSettlementRequest = Message<"domain.operation.v1.DeleteJobSettlementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobSettlement data = 1;
     */
    data?: JobSettlement;
};
/**
 * Describes the message domain.operation.v1.DeleteJobSettlementRequest.
 * Use `create(DeleteJobSettlementRequestSchema)` to create a new message.
 */
export declare const DeleteJobSettlementRequestSchema: GenMessage<DeleteJobSettlementRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobSettlementResponse
 */
export type DeleteJobSettlementResponse = Message<"domain.operation.v1.DeleteJobSettlementResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobSettlementResponse.
 * Use `create(DeleteJobSettlementResponseSchema)` to create a new message.
 */
export declare const DeleteJobSettlementResponseSchema: GenMessage<DeleteJobSettlementResponse>;
/**
 * @generated from message domain.operation.v1.ListJobSettlementsRequest
 */
export type ListJobSettlementsRequest = Message<"domain.operation.v1.ListJobSettlementsRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobSettlementsRequest.
 * Use `create(ListJobSettlementsRequestSchema)` to create a new message.
 */
export declare const ListJobSettlementsRequestSchema: GenMessage<ListJobSettlementsRequest>;
/**
 * @generated from message domain.operation.v1.ListJobSettlementsResponse
 */
export type ListJobSettlementsResponse = Message<"domain.operation.v1.ListJobSettlementsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement data = 1;
     */
    data: JobSettlement[];
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
 * Describes the message domain.operation.v1.ListJobSettlementsResponse.
 * Use `create(ListJobSettlementsResponseSchema)` to create a new message.
 */
export declare const ListJobSettlementsResponseSchema: GenMessage<ListJobSettlementsResponse>;
/**
 * @generated from message domain.operation.v1.GetJobSettlementListPageDataRequest
 */
export type GetJobSettlementListPageDataRequest = Message<"domain.operation.v1.GetJobSettlementListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobSettlementListPageDataRequest.
 * Use `create(GetJobSettlementListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobSettlementListPageDataRequestSchema: GenMessage<GetJobSettlementListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobSettlementListPageDataResponse
 */
export type GetJobSettlementListPageDataResponse = Message<"domain.operation.v1.GetJobSettlementListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement job_settlement_list = 1;
     */
    jobSettlementList: JobSettlement[];
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
 * Describes the message domain.operation.v1.GetJobSettlementListPageDataResponse.
 * Use `create(GetJobSettlementListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobSettlementListPageDataResponseSchema: GenMessage<GetJobSettlementListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobSettlementItemPageDataRequest
 */
export type GetJobSettlementItemPageDataRequest = Message<"domain.operation.v1.GetJobSettlementItemPageDataRequest"> & {
    /**
     * @generated from field: string job_settlement_id = 1;
     */
    jobSettlementId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobSettlementItemPageDataRequest.
 * Use `create(GetJobSettlementItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobSettlementItemPageDataRequestSchema: GenMessage<GetJobSettlementItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobSettlementItemPageDataResponse
 */
export type GetJobSettlementItemPageDataResponse = Message<"domain.operation.v1.GetJobSettlementItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobSettlement job_settlement = 1;
     */
    jobSettlement?: JobSettlement;
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
 * Describes the message domain.operation.v1.GetJobSettlementItemPageDataResponse.
 * Use `create(GetJobSettlementItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobSettlementItemPageDataResponseSchema: GenMessage<GetJobSettlementItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListJobSettlementsByActivityRequest
 */
export type ListJobSettlementsByActivityRequest = Message<"domain.operation.v1.ListJobSettlementsByActivityRequest"> & {
    /**
     * @generated from field: string job_activity_id = 1;
     */
    jobActivityId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobSettlementsByActivityRequest.
 * Use `create(ListJobSettlementsByActivityRequestSchema)` to create a new message.
 */
export declare const ListJobSettlementsByActivityRequestSchema: GenMessage<ListJobSettlementsByActivityRequest>;
/**
 * @generated from message domain.operation.v1.ListJobSettlementsByActivityResponse
 */
export type ListJobSettlementsByActivityResponse = Message<"domain.operation.v1.ListJobSettlementsByActivityResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement job_settlements = 1;
     */
    jobSettlements: JobSettlement[];
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
 * Describes the message domain.operation.v1.ListJobSettlementsByActivityResponse.
 * Use `create(ListJobSettlementsByActivityResponseSchema)` to create a new message.
 */
export declare const ListJobSettlementsByActivityResponseSchema: GenMessage<ListJobSettlementsByActivityResponse>;
/**
 * @generated from message domain.operation.v1.ListJobSettlementsByTargetRequest
 */
export type ListJobSettlementsByTargetRequest = Message<"domain.operation.v1.ListJobSettlementsByTargetRequest"> & {
    /**
     * @generated from field: domain.operation.v1.SettlementTargetType target_type = 1;
     */
    targetType: SettlementTargetType;
    /**
     * @generated from field: string target_id = 2;
     */
    targetId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobSettlementsByTargetRequest.
 * Use `create(ListJobSettlementsByTargetRequestSchema)` to create a new message.
 */
export declare const ListJobSettlementsByTargetRequestSchema: GenMessage<ListJobSettlementsByTargetRequest>;
/**
 * @generated from message domain.operation.v1.ListJobSettlementsByTargetResponse
 */
export type ListJobSettlementsByTargetResponse = Message<"domain.operation.v1.ListJobSettlementsByTargetResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobSettlement job_settlements = 1;
     */
    jobSettlements: JobSettlement[];
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
 * Describes the message domain.operation.v1.ListJobSettlementsByTargetResponse.
 * Use `create(ListJobSettlementsByTargetResponseSchema)` to create a new message.
 */
export declare const ListJobSettlementsByTargetResponseSchema: GenMessage<ListJobSettlementsByTargetResponse>;
/**
 * @generated from message domain.operation.v1.GetSettlementSummaryRequest
 */
export type GetSettlementSummaryRequest = Message<"domain.operation.v1.GetSettlementSummaryRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.GetSettlementSummaryRequest.
 * Use `create(GetSettlementSummaryRequestSchema)` to create a new message.
 */
export declare const GetSettlementSummaryRequestSchema: GenMessage<GetSettlementSummaryRequest>;
/**
 * @generated from message domain.operation.v1.SettlementByTargetType
 */
export type SettlementByTargetType = Message<"domain.operation.v1.SettlementByTargetType"> & {
    /**
     * @generated from field: domain.operation.v1.SettlementTargetType target_type = 1;
     */
    targetType: SettlementTargetType;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 2;
     */
    totalAmount: bigint;
    /**
     * @generated from field: int32 count = 3;
     */
    count: number;
};
/**
 * Describes the message domain.operation.v1.SettlementByTargetType.
 * Use `create(SettlementByTargetTypeSchema)` to create a new message.
 */
export declare const SettlementByTargetTypeSchema: GenMessage<SettlementByTargetType>;
/**
 * @generated from message domain.operation.v1.GetSettlementSummaryResponse
 */
export type GetSettlementSummaryResponse = Message<"domain.operation.v1.GetSettlementSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.SettlementByTargetType summary = 1;
     */
    summary: SettlementByTargetType[];
    /**
     * centavos
     *
     * @generated from field: int64 grand_total = 2;
     */
    grandTotal: bigint;
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
 * Describes the message domain.operation.v1.GetSettlementSummaryResponse.
 * Use `create(GetSettlementSummaryResponseSchema)` to create a new message.
 */
export declare const GetSettlementSummaryResponseSchema: GenMessage<GetSettlementSummaryResponse>;
/**
 * @generated from enum domain.operation.v1.SettlementTargetType
 */
export declare enum SettlementTargetType {
    /**
     * @generated from enum value: SETTLEMENT_TARGET_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SETTLEMENT_TARGET_TYPE_INVOICE_LINE = 1;
     */
    INVOICE_LINE = 1,
    /**
     * @generated from enum value: SETTLEMENT_TARGET_TYPE_INVENTORY_ASSET = 2;
     */
    INVENTORY_ASSET = 2,
    /**
     * @generated from enum value: SETTLEMENT_TARGET_TYPE_WIP_ACCOUNT = 3;
     */
    WIP_ACCOUNT = 3,
    /**
     * @generated from enum value: SETTLEMENT_TARGET_TYPE_OVERHEAD_POOL = 4;
     */
    OVERHEAD_POOL = 4,
    /**
     * @generated from enum value: SETTLEMENT_TARGET_TYPE_WRITE_OFF = 5;
     */
    WRITE_OFF = 5
}
/**
 * Describes the enum domain.operation.v1.SettlementTargetType.
 */
export declare const SettlementTargetTypeSchema: GenEnum<SettlementTargetType>;
/**
 * @generated from enum domain.operation.v1.SettlementStatus
 */
export declare enum SettlementStatus {
    /**
     * @generated from enum value: SETTLEMENT_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SETTLEMENT_STATUS_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: SETTLEMENT_STATUS_SETTLED = 2;
     */
    SETTLED = 2,
    /**
     * @generated from enum value: SETTLEMENT_STATUS_REVERSED = 3;
     */
    REVERSED = 3
}
/**
 * Describes the enum domain.operation.v1.SettlementStatus.
 */
export declare const SettlementStatusSchema: GenEnum<SettlementStatus>;
/**
 * @generated from service domain.operation.v1.JobSettlementDomainService
 */
export declare const JobSettlementDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.CreateJobSettlement
     */
    createJobSettlement: {
        methodKind: "unary";
        input: typeof CreateJobSettlementRequestSchema;
        output: typeof CreateJobSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.ReadJobSettlement
     */
    readJobSettlement: {
        methodKind: "unary";
        input: typeof ReadJobSettlementRequestSchema;
        output: typeof ReadJobSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.UpdateJobSettlement
     */
    updateJobSettlement: {
        methodKind: "unary";
        input: typeof UpdateJobSettlementRequestSchema;
        output: typeof UpdateJobSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.DeleteJobSettlement
     */
    deleteJobSettlement: {
        methodKind: "unary";
        input: typeof DeleteJobSettlementRequestSchema;
        output: typeof DeleteJobSettlementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.ListJobSettlements
     */
    listJobSettlements: {
        methodKind: "unary";
        input: typeof ListJobSettlementsRequestSchema;
        output: typeof ListJobSettlementsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.GetJobSettlementListPageData
     */
    getJobSettlementListPageData: {
        methodKind: "unary";
        input: typeof GetJobSettlementListPageDataRequestSchema;
        output: typeof GetJobSettlementListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.GetJobSettlementItemPageData
     */
    getJobSettlementItemPageData: {
        methodKind: "unary";
        input: typeof GetJobSettlementItemPageDataRequestSchema;
        output: typeof GetJobSettlementItemPageDataResponseSchema;
    };
    /**
     * Extra RPCs
     *
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.ListByActivity
     */
    listByActivity: {
        methodKind: "unary";
        input: typeof ListJobSettlementsByActivityRequestSchema;
        output: typeof ListJobSettlementsByActivityResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.ListByTarget
     */
    listByTarget: {
        methodKind: "unary";
        input: typeof ListJobSettlementsByTargetRequestSchema;
        output: typeof ListJobSettlementsByTargetResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobSettlementDomainService.GetSettlementSummary
     */
    getSettlementSummary: {
        methodKind: "unary";
        input: typeof GetSettlementSummaryRequestSchema;
        output: typeof GetSettlementSummaryResponseSchema;
    };
}>;
