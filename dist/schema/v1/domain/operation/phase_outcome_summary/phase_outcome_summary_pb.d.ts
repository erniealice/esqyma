import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { OverallDetermination, ScoringMethod, SummaryType } from "../enums/enums_pb";
import type { JobPhase } from "../job_phase/job_phase_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/phase_outcome_summary/phase_outcome_summary.proto.
 */
export declare const file_domain_operation_phase_outcome_summary_phase_outcome_summary: GenFile;
/**
 * @generated from message domain.operation.v1.PhaseOutcomeSummary
 */
export type PhaseOutcomeSummary = Message<"domain.operation.v1.PhaseOutcomeSummary"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string job_phase_id = 2;
     */
    jobPhaseId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobPhase job_phase = 3;
     */
    jobPhase?: JobPhase;
    /**
     * @generated from field: string job_id = 4;
     */
    jobId: string;
    /**
     * @generated from field: domain.operation.v1.SummaryType summary_type = 5;
     */
    summaryType: SummaryType;
    /**
     * @generated from field: domain.operation.v1.OverallDetermination phase_determination = 6;
     */
    phaseDetermination: OverallDetermination;
    /**
     * @generated from field: domain.operation.v1.ScoringMethod scoring_method = 7;
     */
    scoringMethod: ScoringMethod;
    /**
     * @generated from field: optional double summary_score = 8;
     */
    summaryScore?: number;
    /**
     * @generated from field: int32 total_criteria_count = 9;
     */
    totalCriteriaCount: number;
    /**
     * @generated from field: int32 pass_count = 10;
     */
    passCount: number;
    /**
     * @generated from field: int32 fail_count = 11;
     */
    failCount: number;
    /**
     * @generated from field: int32 conditional_count = 12;
     */
    conditionalCount: number;
    /**
     * @generated from field: int32 deferred_count = 13;
     */
    deferredCount: number;
    /**
     * @generated from field: int32 na_count = 14;
     */
    naCount: number;
    /**
     * @generated from field: optional string narrative = 15;
     */
    narrative?: string;
    /**
     * @generated from field: string issued_by = 16;
     */
    issuedBy: string;
    /**
     * @generated from field: optional int64 issued_date = 17;
     */
    issuedDate?: bigint;
    /**
     * @generated from field: optional string supersedes_id = 18;
     */
    supersedesId?: string;
    /**
     * @generated from field: bool active = 19;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 20;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 21;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 22;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 23;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.PhaseOutcomeSummary.
 * Use `create(PhaseOutcomeSummarySchema)` to create a new message.
 */
export declare const PhaseOutcomeSummarySchema: GenMessage<PhaseOutcomeSummary>;
/**
 * @generated from message domain.operation.v1.CreatePhaseOutcomeSummaryRequest
 */
export type CreatePhaseOutcomeSummaryRequest = Message<"domain.operation.v1.CreatePhaseOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data?: PhaseOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.CreatePhaseOutcomeSummaryRequest.
 * Use `create(CreatePhaseOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const CreatePhaseOutcomeSummaryRequestSchema: GenMessage<CreatePhaseOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.CreatePhaseOutcomeSummaryResponse
 */
export type CreatePhaseOutcomeSummaryResponse = Message<"domain.operation.v1.CreatePhaseOutcomeSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data: PhaseOutcomeSummary[];
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
 * Describes the message domain.operation.v1.CreatePhaseOutcomeSummaryResponse.
 * Use `create(CreatePhaseOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const CreatePhaseOutcomeSummaryResponseSchema: GenMessage<CreatePhaseOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.ReadPhaseOutcomeSummaryRequest
 */
export type ReadPhaseOutcomeSummaryRequest = Message<"domain.operation.v1.ReadPhaseOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data?: PhaseOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.ReadPhaseOutcomeSummaryRequest.
 * Use `create(ReadPhaseOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const ReadPhaseOutcomeSummaryRequestSchema: GenMessage<ReadPhaseOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.ReadPhaseOutcomeSummaryResponse
 */
export type ReadPhaseOutcomeSummaryResponse = Message<"domain.operation.v1.ReadPhaseOutcomeSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data: PhaseOutcomeSummary[];
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
 * Describes the message domain.operation.v1.ReadPhaseOutcomeSummaryResponse.
 * Use `create(ReadPhaseOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const ReadPhaseOutcomeSummaryResponseSchema: GenMessage<ReadPhaseOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.UpdatePhaseOutcomeSummaryRequest
 */
export type UpdatePhaseOutcomeSummaryRequest = Message<"domain.operation.v1.UpdatePhaseOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data?: PhaseOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.UpdatePhaseOutcomeSummaryRequest.
 * Use `create(UpdatePhaseOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const UpdatePhaseOutcomeSummaryRequestSchema: GenMessage<UpdatePhaseOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.UpdatePhaseOutcomeSummaryResponse
 */
export type UpdatePhaseOutcomeSummaryResponse = Message<"domain.operation.v1.UpdatePhaseOutcomeSummaryResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data: PhaseOutcomeSummary[];
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
 * Describes the message domain.operation.v1.UpdatePhaseOutcomeSummaryResponse.
 * Use `create(UpdatePhaseOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const UpdatePhaseOutcomeSummaryResponseSchema: GenMessage<UpdatePhaseOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.DeletePhaseOutcomeSummaryRequest
 */
export type DeletePhaseOutcomeSummaryRequest = Message<"domain.operation.v1.DeletePhaseOutcomeSummaryRequest"> & {
    /**
     * @generated from field: domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data?: PhaseOutcomeSummary;
};
/**
 * Describes the message domain.operation.v1.DeletePhaseOutcomeSummaryRequest.
 * Use `create(DeletePhaseOutcomeSummaryRequestSchema)` to create a new message.
 */
export declare const DeletePhaseOutcomeSummaryRequestSchema: GenMessage<DeletePhaseOutcomeSummaryRequest>;
/**
 * @generated from message domain.operation.v1.DeletePhaseOutcomeSummaryResponse
 */
export type DeletePhaseOutcomeSummaryResponse = Message<"domain.operation.v1.DeletePhaseOutcomeSummaryResponse"> & {
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
 * Describes the message domain.operation.v1.DeletePhaseOutcomeSummaryResponse.
 * Use `create(DeletePhaseOutcomeSummaryResponseSchema)` to create a new message.
 */
export declare const DeletePhaseOutcomeSummaryResponseSchema: GenMessage<DeletePhaseOutcomeSummaryResponse>;
/**
 * @generated from message domain.operation.v1.ListPhaseOutcomeSummarysRequest
 */
export type ListPhaseOutcomeSummarysRequest = Message<"domain.operation.v1.ListPhaseOutcomeSummarysRequest"> & {
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
 * Describes the message domain.operation.v1.ListPhaseOutcomeSummarysRequest.
 * Use `create(ListPhaseOutcomeSummarysRequestSchema)` to create a new message.
 */
export declare const ListPhaseOutcomeSummarysRequestSchema: GenMessage<ListPhaseOutcomeSummarysRequest>;
/**
 * @generated from message domain.operation.v1.ListPhaseOutcomeSummarysResponse
 */
export type ListPhaseOutcomeSummarysResponse = Message<"domain.operation.v1.ListPhaseOutcomeSummarysResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PhaseOutcomeSummary data = 1;
     */
    data: PhaseOutcomeSummary[];
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
 * Describes the message domain.operation.v1.ListPhaseOutcomeSummarysResponse.
 * Use `create(ListPhaseOutcomeSummarysResponseSchema)` to create a new message.
 */
export declare const ListPhaseOutcomeSummarysResponseSchema: GenMessage<ListPhaseOutcomeSummarysResponse>;
/**
 * @generated from message domain.operation.v1.GetPhaseOutcomeSummaryListPageDataRequest
 */
export type GetPhaseOutcomeSummaryListPageDataRequest = Message<"domain.operation.v1.GetPhaseOutcomeSummaryListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetPhaseOutcomeSummaryListPageDataRequest.
 * Use `create(GetPhaseOutcomeSummaryListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPhaseOutcomeSummaryListPageDataRequestSchema: GenMessage<GetPhaseOutcomeSummaryListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetPhaseOutcomeSummaryListPageDataResponse
 */
export type GetPhaseOutcomeSummaryListPageDataResponse = Message<"domain.operation.v1.GetPhaseOutcomeSummaryListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PhaseOutcomeSummary phase_outcome_summary_list = 1;
     */
    phaseOutcomeSummaryList: PhaseOutcomeSummary[];
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
 * Describes the message domain.operation.v1.GetPhaseOutcomeSummaryListPageDataResponse.
 * Use `create(GetPhaseOutcomeSummaryListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPhaseOutcomeSummaryListPageDataResponseSchema: GenMessage<GetPhaseOutcomeSummaryListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetPhaseOutcomeSummaryItemPageDataRequest
 */
export type GetPhaseOutcomeSummaryItemPageDataRequest = Message<"domain.operation.v1.GetPhaseOutcomeSummaryItemPageDataRequest"> & {
    /**
     * @generated from field: string phase_outcome_summary_id = 1;
     */
    phaseOutcomeSummaryId: string;
};
/**
 * Describes the message domain.operation.v1.GetPhaseOutcomeSummaryItemPageDataRequest.
 * Use `create(GetPhaseOutcomeSummaryItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPhaseOutcomeSummaryItemPageDataRequestSchema: GenMessage<GetPhaseOutcomeSummaryItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetPhaseOutcomeSummaryItemPageDataResponse
 */
export type GetPhaseOutcomeSummaryItemPageDataResponse = Message<"domain.operation.v1.GetPhaseOutcomeSummaryItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.PhaseOutcomeSummary phase_outcome_summary = 1;
     */
    phaseOutcomeSummary?: PhaseOutcomeSummary;
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
 * Describes the message domain.operation.v1.GetPhaseOutcomeSummaryItemPageDataResponse.
 * Use `create(GetPhaseOutcomeSummaryItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPhaseOutcomeSummaryItemPageDataResponseSchema: GenMessage<GetPhaseOutcomeSummaryItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetPhaseOutcomeSummaryByJobPhaseRequest
 */
export type GetPhaseOutcomeSummaryByJobPhaseRequest = Message<"domain.operation.v1.GetPhaseOutcomeSummaryByJobPhaseRequest"> & {
    /**
     * @generated from field: string job_phase_id = 1;
     */
    jobPhaseId: string;
};
/**
 * Describes the message domain.operation.v1.GetPhaseOutcomeSummaryByJobPhaseRequest.
 * Use `create(GetPhaseOutcomeSummaryByJobPhaseRequestSchema)` to create a new message.
 */
export declare const GetPhaseOutcomeSummaryByJobPhaseRequestSchema: GenMessage<GetPhaseOutcomeSummaryByJobPhaseRequest>;
/**
 * @generated from message domain.operation.v1.GetPhaseOutcomeSummaryByJobPhaseResponse
 */
export type GetPhaseOutcomeSummaryByJobPhaseResponse = Message<"domain.operation.v1.GetPhaseOutcomeSummaryByJobPhaseResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.PhaseOutcomeSummary phase_outcome_summary = 1;
     */
    phaseOutcomeSummary?: PhaseOutcomeSummary;
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
 * Describes the message domain.operation.v1.GetPhaseOutcomeSummaryByJobPhaseResponse.
 * Use `create(GetPhaseOutcomeSummaryByJobPhaseResponseSchema)` to create a new message.
 */
export declare const GetPhaseOutcomeSummaryByJobPhaseResponseSchema: GenMessage<GetPhaseOutcomeSummaryByJobPhaseResponse>;
/**
 * @generated from message domain.operation.v1.ListPhaseOutcomeSummarysByJobRequest
 */
export type ListPhaseOutcomeSummarysByJobRequest = Message<"domain.operation.v1.ListPhaseOutcomeSummarysByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListPhaseOutcomeSummarysByJobRequest.
 * Use `create(ListPhaseOutcomeSummarysByJobRequestSchema)` to create a new message.
 */
export declare const ListPhaseOutcomeSummarysByJobRequestSchema: GenMessage<ListPhaseOutcomeSummarysByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListPhaseOutcomeSummarysByJobResponse
 */
export type ListPhaseOutcomeSummarysByJobResponse = Message<"domain.operation.v1.ListPhaseOutcomeSummarysByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.PhaseOutcomeSummary phase_outcome_summarys = 1;
     */
    phaseOutcomeSummarys: PhaseOutcomeSummary[];
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
 * Describes the message domain.operation.v1.ListPhaseOutcomeSummarysByJobResponse.
 * Use `create(ListPhaseOutcomeSummarysByJobResponseSchema)` to create a new message.
 */
export declare const ListPhaseOutcomeSummarysByJobResponseSchema: GenMessage<ListPhaseOutcomeSummarysByJobResponse>;
/**
 * @generated from service domain.operation.v1.PhaseOutcomeSummaryDomainService
 */
export declare const PhaseOutcomeSummaryDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.CreatePhaseOutcomeSummary
     */
    createPhaseOutcomeSummary: {
        methodKind: "unary";
        input: typeof CreatePhaseOutcomeSummaryRequestSchema;
        output: typeof CreatePhaseOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.ReadPhaseOutcomeSummary
     */
    readPhaseOutcomeSummary: {
        methodKind: "unary";
        input: typeof ReadPhaseOutcomeSummaryRequestSchema;
        output: typeof ReadPhaseOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.UpdatePhaseOutcomeSummary
     */
    updatePhaseOutcomeSummary: {
        methodKind: "unary";
        input: typeof UpdatePhaseOutcomeSummaryRequestSchema;
        output: typeof UpdatePhaseOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.DeletePhaseOutcomeSummary
     */
    deletePhaseOutcomeSummary: {
        methodKind: "unary";
        input: typeof DeletePhaseOutcomeSummaryRequestSchema;
        output: typeof DeletePhaseOutcomeSummaryResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.ListPhaseOutcomeSummarys
     */
    listPhaseOutcomeSummarys: {
        methodKind: "unary";
        input: typeof ListPhaseOutcomeSummarysRequestSchema;
        output: typeof ListPhaseOutcomeSummarysResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.GetPhaseOutcomeSummaryListPageData
     */
    getPhaseOutcomeSummaryListPageData: {
        methodKind: "unary";
        input: typeof GetPhaseOutcomeSummaryListPageDataRequestSchema;
        output: typeof GetPhaseOutcomeSummaryListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.GetPhaseOutcomeSummaryItemPageData
     */
    getPhaseOutcomeSummaryItemPageData: {
        methodKind: "unary";
        input: typeof GetPhaseOutcomeSummaryItemPageDataRequestSchema;
        output: typeof GetPhaseOutcomeSummaryItemPageDataResponseSchema;
    };
    /**
     * Extra: get latest summary for a phase
     *
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.GetByJobPhase
     */
    getByJobPhase: {
        methodKind: "unary";
        input: typeof GetPhaseOutcomeSummaryByJobPhaseRequestSchema;
        output: typeof GetPhaseOutcomeSummaryByJobPhaseResponseSchema;
    };
    /**
     * Extra: list all phase summaries for a job
     *
     * @generated from rpc domain.operation.v1.PhaseOutcomeSummaryDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListPhaseOutcomeSummarysByJobRequestSchema;
        output: typeof ListPhaseOutcomeSummarysByJobResponseSchema;
    };
}>;
