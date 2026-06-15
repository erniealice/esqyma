import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/evaluation_cycle_member/evaluation_cycle_member.proto.
 */
export declare const file_domain_operation_evaluation_cycle_member_evaluation_cycle_member: GenFile;
/**
 * =============================================================================
 * Performance Evaluation §E4b — evaluation_cycle_member (v1; SR-1). The
 * lightweight membership snapshot that freezes the cycle's "X of Y" denominator.
 * Carries NO evaluator/template/visibility/score, so it cannot trip the
 * evaluation table's NOT NULL + CHECK invariants — which is why materializing
 * full DRAFT evaluations at cycle-open was unexecutable (SR-1).
 *   Y = COUNT(member WHERE evaluation_cycle_id = X)
 *   X = COUNT(member that joins a SUBMITTED/SIGNED_OFF evaluation for the same
 *       (subject_staff_id, client_id, period, type))
 * UNIQUE (evaluation_cycle_id, subject_staff_id, client_id) — per-STAFF (SR-9);
 * dedupes a dual-seat associate to one obligation.
 * =============================================================================
 *
 * @generated from message domain.operation.v1.EvaluationCycleMember
 */
export type EvaluationCycleMember = Message<"domain.operation.v1.EvaluationCycleMember"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string evaluation_cycle_id = 3;
     */
    evaluationCycleId: string;
    /**
     * DENORMALIZED RLS anchor (same fail-closed scoping as evaluation).
     *
     * @generated from field: string client_id = 4;
     */
    clientId: string;
    /**
     * The reviewed human (per-staff grain, SR-9).
     *
     * @generated from field: string subject_staff_id = 5;
     */
    subjectStaffId: string;
    /**
     * Fresh probation clock for a replacement seat in-cycle (SR-8). DB default false.
     *
     * @generated from field: bool is_probation = 6;
     */
    isProbation: boolean;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_added = 8;
     */
    dateAdded?: bigint;
};
/**
 * Describes the message domain.operation.v1.EvaluationCycleMember.
 * Use `create(EvaluationCycleMemberSchema)` to create a new message.
 */
export declare const EvaluationCycleMemberSchema: GenMessage<EvaluationCycleMember>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationCycleMemberRequest
 */
export type CreateEvaluationCycleMemberRequest = Message<"domain.operation.v1.CreateEvaluationCycleMemberRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data?: EvaluationCycleMember;
};
/**
 * Describes the message domain.operation.v1.CreateEvaluationCycleMemberRequest.
 * Use `create(CreateEvaluationCycleMemberRequestSchema)` to create a new message.
 */
export declare const CreateEvaluationCycleMemberRequestSchema: GenMessage<CreateEvaluationCycleMemberRequest>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationCycleMemberResponse
 */
export type CreateEvaluationCycleMemberResponse = Message<"domain.operation.v1.CreateEvaluationCycleMemberResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data: EvaluationCycleMember[];
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
 * Describes the message domain.operation.v1.CreateEvaluationCycleMemberResponse.
 * Use `create(CreateEvaluationCycleMemberResponseSchema)` to create a new message.
 */
export declare const CreateEvaluationCycleMemberResponseSchema: GenMessage<CreateEvaluationCycleMemberResponse>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationCycleMemberRequest
 */
export type ReadEvaluationCycleMemberRequest = Message<"domain.operation.v1.ReadEvaluationCycleMemberRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data?: EvaluationCycleMember;
};
/**
 * Describes the message domain.operation.v1.ReadEvaluationCycleMemberRequest.
 * Use `create(ReadEvaluationCycleMemberRequestSchema)` to create a new message.
 */
export declare const ReadEvaluationCycleMemberRequestSchema: GenMessage<ReadEvaluationCycleMemberRequest>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationCycleMemberResponse
 */
export type ReadEvaluationCycleMemberResponse = Message<"domain.operation.v1.ReadEvaluationCycleMemberResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data: EvaluationCycleMember[];
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
 * Describes the message domain.operation.v1.ReadEvaluationCycleMemberResponse.
 * Use `create(ReadEvaluationCycleMemberResponseSchema)` to create a new message.
 */
export declare const ReadEvaluationCycleMemberResponseSchema: GenMessage<ReadEvaluationCycleMemberResponse>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationCycleMemberRequest
 */
export type UpdateEvaluationCycleMemberRequest = Message<"domain.operation.v1.UpdateEvaluationCycleMemberRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data?: EvaluationCycleMember;
};
/**
 * Describes the message domain.operation.v1.UpdateEvaluationCycleMemberRequest.
 * Use `create(UpdateEvaluationCycleMemberRequestSchema)` to create a new message.
 */
export declare const UpdateEvaluationCycleMemberRequestSchema: GenMessage<UpdateEvaluationCycleMemberRequest>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationCycleMemberResponse
 */
export type UpdateEvaluationCycleMemberResponse = Message<"domain.operation.v1.UpdateEvaluationCycleMemberResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data: EvaluationCycleMember[];
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
 * Describes the message domain.operation.v1.UpdateEvaluationCycleMemberResponse.
 * Use `create(UpdateEvaluationCycleMemberResponseSchema)` to create a new message.
 */
export declare const UpdateEvaluationCycleMemberResponseSchema: GenMessage<UpdateEvaluationCycleMemberResponse>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationCycleMemberRequest
 */
export type DeleteEvaluationCycleMemberRequest = Message<"domain.operation.v1.DeleteEvaluationCycleMemberRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data?: EvaluationCycleMember;
};
/**
 * Describes the message domain.operation.v1.DeleteEvaluationCycleMemberRequest.
 * Use `create(DeleteEvaluationCycleMemberRequestSchema)` to create a new message.
 */
export declare const DeleteEvaluationCycleMemberRequestSchema: GenMessage<DeleteEvaluationCycleMemberRequest>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationCycleMemberResponse
 */
export type DeleteEvaluationCycleMemberResponse = Message<"domain.operation.v1.DeleteEvaluationCycleMemberResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteEvaluationCycleMemberResponse.
 * Use `create(DeleteEvaluationCycleMemberResponseSchema)` to create a new message.
 */
export declare const DeleteEvaluationCycleMemberResponseSchema: GenMessage<DeleteEvaluationCycleMemberResponse>;
/**
 * @generated from message domain.operation.v1.ListEvaluationCycleMembersRequest
 */
export type ListEvaluationCycleMembersRequest = Message<"domain.operation.v1.ListEvaluationCycleMembersRequest"> & {
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
 * Describes the message domain.operation.v1.ListEvaluationCycleMembersRequest.
 * Use `create(ListEvaluationCycleMembersRequestSchema)` to create a new message.
 */
export declare const ListEvaluationCycleMembersRequestSchema: GenMessage<ListEvaluationCycleMembersRequest>;
/**
 * @generated from message domain.operation.v1.ListEvaluationCycleMembersResponse
 */
export type ListEvaluationCycleMembersResponse = Message<"domain.operation.v1.ListEvaluationCycleMembersResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycleMember data = 1;
     */
    data: EvaluationCycleMember[];
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
 * Describes the message domain.operation.v1.ListEvaluationCycleMembersResponse.
 * Use `create(ListEvaluationCycleMembersResponseSchema)` to create a new message.
 */
export declare const ListEvaluationCycleMembersResponseSchema: GenMessage<ListEvaluationCycleMembersResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleMemberListPageDataRequest
 */
export type GetEvaluationCycleMemberListPageDataRequest = Message<"domain.operation.v1.GetEvaluationCycleMemberListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetEvaluationCycleMemberListPageDataRequest.
 * Use `create(GetEvaluationCycleMemberListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationCycleMemberListPageDataRequestSchema: GenMessage<GetEvaluationCycleMemberListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleMemberListPageDataResponse
 */
export type GetEvaluationCycleMemberListPageDataResponse = Message<"domain.operation.v1.GetEvaluationCycleMemberListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationCycleMember evaluation_cycle_member_list = 1;
     */
    evaluationCycleMemberList: EvaluationCycleMember[];
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
 * Describes the message domain.operation.v1.GetEvaluationCycleMemberListPageDataResponse.
 * Use `create(GetEvaluationCycleMemberListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationCycleMemberListPageDataResponseSchema: GenMessage<GetEvaluationCycleMemberListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleMemberItemPageDataRequest
 */
export type GetEvaluationCycleMemberItemPageDataRequest = Message<"domain.operation.v1.GetEvaluationCycleMemberItemPageDataRequest"> & {
    /**
     * @generated from field: string evaluation_cycle_member_id = 1;
     */
    evaluationCycleMemberId: string;
};
/**
 * Describes the message domain.operation.v1.GetEvaluationCycleMemberItemPageDataRequest.
 * Use `create(GetEvaluationCycleMemberItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationCycleMemberItemPageDataRequestSchema: GenMessage<GetEvaluationCycleMemberItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationCycleMemberItemPageDataResponse
 */
export type GetEvaluationCycleMemberItemPageDataResponse = Message<"domain.operation.v1.GetEvaluationCycleMemberItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationCycleMember evaluation_cycle_member = 1;
     */
    evaluationCycleMember?: EvaluationCycleMember;
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
 * Describes the message domain.operation.v1.GetEvaluationCycleMemberItemPageDataResponse.
 * Use `create(GetEvaluationCycleMemberItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationCycleMemberItemPageDataResponseSchema: GenMessage<GetEvaluationCycleMemberItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.EvaluationCycleMemberDomainService
 */
export declare const EvaluationCycleMemberDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.CreateEvaluationCycleMember
     */
    createEvaluationCycleMember: {
        methodKind: "unary";
        input: typeof CreateEvaluationCycleMemberRequestSchema;
        output: typeof CreateEvaluationCycleMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.ReadEvaluationCycleMember
     */
    readEvaluationCycleMember: {
        methodKind: "unary";
        input: typeof ReadEvaluationCycleMemberRequestSchema;
        output: typeof ReadEvaluationCycleMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.UpdateEvaluationCycleMember
     */
    updateEvaluationCycleMember: {
        methodKind: "unary";
        input: typeof UpdateEvaluationCycleMemberRequestSchema;
        output: typeof UpdateEvaluationCycleMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.DeleteEvaluationCycleMember
     */
    deleteEvaluationCycleMember: {
        methodKind: "unary";
        input: typeof DeleteEvaluationCycleMemberRequestSchema;
        output: typeof DeleteEvaluationCycleMemberResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.ListEvaluationCycleMembers
     */
    listEvaluationCycleMembers: {
        methodKind: "unary";
        input: typeof ListEvaluationCycleMembersRequestSchema;
        output: typeof ListEvaluationCycleMembersResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.GetEvaluationCycleMemberListPageData
     */
    getEvaluationCycleMemberListPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationCycleMemberListPageDataRequestSchema;
        output: typeof GetEvaluationCycleMemberListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationCycleMemberDomainService.GetEvaluationCycleMemberItemPageData
     */
    getEvaluationCycleMemberItemPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationCycleMemberItemPageDataRequestSchema;
        output: typeof GetEvaluationCycleMemberItemPageDataResponseSchema;
    };
}>;
