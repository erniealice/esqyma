import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/evaluation_cycle/evaluation_cycle.proto.
 */
export declare const file_domain_operation_evaluation_cycle_evaluation_cycle: GenFile;
/**
 * @generated from message domain.operation.v1.EvaluationCycle
 */
export type EvaluationCycle = Message<"domain.operation.v1.EvaluationCycle"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * DENOMINATOR SCOPE — one cycle per engagement (outsourcing v1).
     *
     * @generated from field: string subscription_id = 3;
     */
    subscriptionId: string;
    /**
     * "H1 2026 Performance Review"
     *
     * @generated from field: string name = 4;
     */
    name: string;
    /**
     * ISO 8601
     *
     * @generated from field: string period_start = 5;
     */
    periodStart: string;
    /**
     * ISO 8601
     *
     * @generated from field: string period_end = 6;
     */
    periodEnd: string;
    /**
     * ISO 8601 — client sign-off deadline (!= close_date)
     *
     * @generated from field: optional string sign_off_due_date = 7;
     */
    signOffDueDate?: string;
    /**
     * ISO 8601 — when the cycle closes
     *
     * @generated from field: optional string close_date = 8;
     */
    closeDate?: string;
    /**
     * proto ENUM; single lifecycle source of truth
     *
     * @generated from field: domain.operation.v1.EvaluationCycleStatus status = 9;
     */
    status: EvaluationCycleStatus;
    /**
     * @generated from field: bool active = 10;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 11;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 12;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 13;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 14;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.EvaluationCycle.
 * Use `create(EvaluationCycleSchema)` to create a new message.
 */
export declare const EvaluationCycleSchema: GenMessage<EvaluationCycle>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationCycleRequest
 */
export type CreateEvaluationCycleRequest = Message<"domain.operation.v1.CreateEvaluationCycleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycle data = 1;
     */
    data?: EvaluationCycle;
};
/**
 * Describes the message domain.operation.v1.CreateEvaluationCycleRequest.
 * Use `create(CreateEvaluationCycleRequestSchema)` to create a new message.
 */
export declare const CreateEvaluationCycleRequestSchema: GenMessage<CreateEvaluationCycleRequest>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationCycleResponse
 */
export type CreateEvaluationCycleResponse = Message<"domain.operation.v1.CreateEvaluationCycleResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycle data = 1;
     */
    data: EvaluationCycle[];
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
 * Describes the message domain.operation.v1.CreateEvaluationCycleResponse.
 * Use `create(CreateEvaluationCycleResponseSchema)` to create a new message.
 */
export declare const CreateEvaluationCycleResponseSchema: GenMessage<CreateEvaluationCycleResponse>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationCycleRequest
 */
export type ReadEvaluationCycleRequest = Message<"domain.operation.v1.ReadEvaluationCycleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycle data = 1;
     */
    data?: EvaluationCycle;
};
/**
 * Describes the message domain.operation.v1.ReadEvaluationCycleRequest.
 * Use `create(ReadEvaluationCycleRequestSchema)` to create a new message.
 */
export declare const ReadEvaluationCycleRequestSchema: GenMessage<ReadEvaluationCycleRequest>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationCycleResponse
 */
export type ReadEvaluationCycleResponse = Message<"domain.operation.v1.ReadEvaluationCycleResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycle data = 1;
     */
    data: EvaluationCycle[];
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
 * Describes the message domain.operation.v1.ReadEvaluationCycleResponse.
 * Use `create(ReadEvaluationCycleResponseSchema)` to create a new message.
 */
export declare const ReadEvaluationCycleResponseSchema: GenMessage<ReadEvaluationCycleResponse>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationCycleRequest
 */
export type UpdateEvaluationCycleRequest = Message<"domain.operation.v1.UpdateEvaluationCycleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycle data = 1;
     */
    data?: EvaluationCycle;
};
/**
 * Describes the message domain.operation.v1.UpdateEvaluationCycleRequest.
 * Use `create(UpdateEvaluationCycleRequestSchema)` to create a new message.
 */
export declare const UpdateEvaluationCycleRequestSchema: GenMessage<UpdateEvaluationCycleRequest>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationCycleResponse
 */
export type UpdateEvaluationCycleResponse = Message<"domain.operation.v1.UpdateEvaluationCycleResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycle data = 1;
     */
    data: EvaluationCycle[];
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
 * Describes the message domain.operation.v1.UpdateEvaluationCycleResponse.
 * Use `create(UpdateEvaluationCycleResponseSchema)` to create a new message.
 */
export declare const UpdateEvaluationCycleResponseSchema: GenMessage<UpdateEvaluationCycleResponse>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationCycleRequest
 */
export type DeleteEvaluationCycleRequest = Message<"domain.operation.v1.DeleteEvaluationCycleRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycle data = 1;
     */
    data?: EvaluationCycle;
};
/**
 * Describes the message domain.operation.v1.DeleteEvaluationCycleRequest.
 * Use `create(DeleteEvaluationCycleRequestSchema)` to create a new message.
 */
export declare const DeleteEvaluationCycleRequestSchema: GenMessage<DeleteEvaluationCycleRequest>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationCycleResponse
 */
export type DeleteEvaluationCycleResponse = Message<"domain.operation.v1.DeleteEvaluationCycleResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteEvaluationCycleResponse.
 * Use `create(DeleteEvaluationCycleResponseSchema)` to create a new message.
 */
export declare const DeleteEvaluationCycleResponseSchema: GenMessage<DeleteEvaluationCycleResponse>;
/**
 * @generated from message domain.operation.v1.ListEvaluationCyclesRequest
 */
export type ListEvaluationCyclesRequest = Message<"domain.operation.v1.ListEvaluationCyclesRequest"> & {
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
 * Describes the message domain.operation.v1.ListEvaluationCyclesRequest.
 * Use `create(ListEvaluationCyclesRequestSchema)` to create a new message.
 */
export declare const ListEvaluationCyclesRequestSchema: GenMessage<ListEvaluationCyclesRequest>;
/**
 * @generated from message domain.operation.v1.ListEvaluationCyclesResponse
 */
export type ListEvaluationCyclesResponse = Message<"domain.operation.v1.ListEvaluationCyclesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycle data = 1;
     */
    data: EvaluationCycle[];
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
 * Describes the message domain.operation.v1.ListEvaluationCyclesResponse.
 * Use `create(ListEvaluationCyclesResponseSchema)` to create a new message.
 */
export declare const ListEvaluationCyclesResponseSchema: GenMessage<ListEvaluationCyclesResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleListPageDataRequest
 */
export type GetEvaluationCycleListPageDataRequest = Message<"domain.operation.v1.GetEvaluationCycleListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetEvaluationCycleListPageDataRequest.
 * Use `create(GetEvaluationCycleListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationCycleListPageDataRequestSchema: GenMessage<GetEvaluationCycleListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleListPageDataResponse
 */
export type GetEvaluationCycleListPageDataResponse = Message<"domain.operation.v1.GetEvaluationCycleListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycle evaluation_cycle_list = 1;
     */
    evaluationCycleList: EvaluationCycle[];
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
 * Describes the message domain.operation.v1.GetEvaluationCycleListPageDataResponse.
 * Use `create(GetEvaluationCycleListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationCycleListPageDataResponseSchema: GenMessage<GetEvaluationCycleListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleItemPageDataRequest
 */
export type GetEvaluationCycleItemPageDataRequest = Message<"domain.operation.v1.GetEvaluationCycleItemPageDataRequest"> & {
    /**
     * @generated from field: string evaluation_cycle_id = 1;
     */
    evaluationCycleId: string;
};
/**
 * Describes the message domain.operation.v1.GetEvaluationCycleItemPageDataRequest.
 * Use `create(GetEvaluationCycleItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationCycleItemPageDataRequestSchema: GenMessage<GetEvaluationCycleItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleItemPageDataResponse
 */
export type GetEvaluationCycleItemPageDataResponse = Message<"domain.operation.v1.GetEvaluationCycleItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycle evaluation_cycle = 1;
     */
    evaluationCycle?: EvaluationCycle;
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
 * Describes the message domain.operation.v1.GetEvaluationCycleItemPageDataResponse.
 * Use `create(GetEvaluationCycleItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationCycleItemPageDataResponseSchema: GenMessage<GetEvaluationCycleItemPageDataResponse>;
/**
 * EvaluationCycleStatus — v1 enum. active = (status NOT IN {CLOSED}). DB CHECK-pinned.
 *
 * @generated from enum domain.operation.v1.EvaluationCycleStatus
 */
export declare enum EvaluationCycleStatus {
    /**
     * @generated from enum value: EVALUATION_CYCLE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * reviews being filled
     *
     * @generated from enum value: EVALUATION_CYCLE_STATUS_OPEN = 1;
     */
    OPEN = 1,
    /**
     * submitted; awaiting sign-offs
     *
     * @generated from enum value: EVALUATION_CYCLE_STATUS_SIGN_OFF = 2;
     */
    SIGN_OFF = 2,
    /**
     * @generated from enum value: EVALUATION_CYCLE_STATUS_CLOSED = 3;
     */
    CLOSED = 3
}
/**
 * Describes the enum domain.operation.v1.EvaluationCycleStatus.
 */
export declare const EvaluationCycleStatusSchema: GenEnum<EvaluationCycleStatus>;
/**
 * @generated from service domain.operation.v1.EvaluationCycleDomainService
 */
export declare const EvaluationCycleDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.CreateEvaluationCycle
     */
    createEvaluationCycle: {
        methodKind: "unary";
        input: typeof CreateEvaluationCycleRequestSchema;
        output: typeof CreateEvaluationCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.ReadEvaluationCycle
     */
    readEvaluationCycle: {
        methodKind: "unary";
        input: typeof ReadEvaluationCycleRequestSchema;
        output: typeof ReadEvaluationCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.UpdateEvaluationCycle
     */
    updateEvaluationCycle: {
        methodKind: "unary";
        input: typeof UpdateEvaluationCycleRequestSchema;
        output: typeof UpdateEvaluationCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.DeleteEvaluationCycle
     */
    deleteEvaluationCycle: {
        methodKind: "unary";
        input: typeof DeleteEvaluationCycleRequestSchema;
        output: typeof DeleteEvaluationCycleResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.ListEvaluationCycles
     */
    listEvaluationCycles: {
        methodKind: "unary";
        input: typeof ListEvaluationCyclesRequestSchema;
        output: typeof ListEvaluationCyclesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.GetEvaluationCycleListPageData
     */
    getEvaluationCycleListPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationCycleListPageDataRequestSchema;
        output: typeof GetEvaluationCycleListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleDomainService.GetEvaluationCycleItemPageData
     */
    getEvaluationCycleItemPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationCycleItemPageDataRequestSchema;
        output: typeof GetEvaluationCycleItemPageDataResponseSchema;
    };
}>;
