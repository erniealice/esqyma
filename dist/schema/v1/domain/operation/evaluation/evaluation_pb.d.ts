import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/evaluation/evaluation.proto.
 */
export declare const file_domain_operation_evaluation_evaluation: GenFile;
/**
 * Evaluation is the evaluation header aggregate (operation domain).
 *
 * @generated from message domain.operation.v1.Evaluation
 */
export type Evaluation = Message<"domain.operation.v1.Evaluation"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * DENORMALIZED IDOR anchor; stamped from session.acting_as_client_id at create; NEVER from form.
     *
     * @generated from field: string client_id = 3;
     */
    clientId: string;
    /**
     * Servicing-scope anchor (CR-5): NULL subscription_id resolves to ACCOUNT scope via client_id.
     *
     * @generated from field: optional string subscription_id = 4;
     */
    subscriptionId?: string;
    /**
     * Anti-phantom ENGAGEMENT anchor (the seat, NOT the subject) — REQUIRED for CLIENT_TO_ASSOCIATE.
     *
     * @generated from field: optional string subscription_seat_id = 5;
     */
    subscriptionSeatId?: string;
    /**
     * Template — REQUIRED for PERFORMANCE_REVIEW (CHECK).
     *
     * @generated from field: optional string evaluation_template_id = 6;
     */
    evaluationTemplateId?: string;
    /**
     * proto ENUM; DB CHECK-pinned
     *
     * @generated from field: domain.operation.v1.EvaluationType evaluation_type = 7;
     */
    evaluationType: EvaluationType;
    /**
     * proto ENUM; DB CHECK-pinned
     *
     * @generated from field: domain.operation.v1.RelationshipType relationship_type = 8;
     */
    relationshipType: RelationshipType;
    /**
     * proto ENUM; DB CHECK-pinned
     *
     * @generated from field: domain.operation.v1.EvaluatorType evaluator_type = 9;
     */
    evaluatorType: EvaluatorType;
    /**
     * Evaluator arc — exactly one (num_nonnulls=1). STAFF leg is the tenant-scoped workspace_user (CR-4).
     *
     * @generated from field: optional string evaluator_workspace_user_id = 10;
     */
    evaluatorWorkspaceUserId?: string;
    /**
     * @generated from field: optional string evaluator_client_portal_grant_id = 11;
     */
    evaluatorClientPortalGrantId?: string;
    /**
     * proto ENUM; DB CHECK-pinned
     *
     * @generated from field: domain.operation.v1.SubjectType subject_type = 12;
     */
    subjectType: SubjectType;
    /**
     * Subject arc — exactly one (num_nonnulls=1). The HUMAN Identity is the subject.
     *
     * @generated from field: optional string subject_staff_id = 13;
     */
    subjectStaffId?: string;
    /**
     * @generated from field: optional string subject_client_id = 14;
     */
    subjectClientId?: string;
    /**
     * ISO 8601
     *
     * @generated from field: string period_start = 15;
     */
    periodStart: string;
    /**
     * ISO 8601
     *
     * @generated from field: string period_end = 16;
     */
    periodEnd: string;
    /**
     * proto ENUM; single lifecycle source of truth
     *
     * @generated from field: domain.operation.v1.EvaluationStatus status = 17;
     */
    status: EvaluationStatus;
    /**
     * proto ENUM; INTERNAL_ONLY fail-closed in query predicate
     *
     * @generated from field: domain.operation.v1.VisibilityType visibility_type = 18;
     */
    visibilityType: VisibilityType;
    /**
     * computed from criteria_weight snapshots (NOT live rubric)
     *
     * @generated from field: optional double overall_score = 19;
     */
    overallScore?: number;
    /**
     * @generated from field: optional string narrative = 20;
     */
    narrative?: string;
    /**
     * set at DRAFT->SUBMITTED
     *
     * @generated from field: optional int64 submitted_at = 21;
     */
    submittedAt?: bigint;
    /**
     * @generated from field: bool active = 22;
     */
    active: boolean;
    /**
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
     * v1 cycle FK — nullable for on-demand evals; stamped when created inside an open cycle.
     *
     * @generated from field: optional string evaluation_cycle_id = 27;
     */
    evaluationCycleId?: string;
    /**
     * Sign-off arc (Q-SIGNOFF-1) — exactly one actor when SIGNED_OFF (status-coupling CHECKs).
     *
     * operator-side (CR-4)
     *
     * @generated from field: optional string signed_off_by_workspace_user_id = 28;
     */
    signedOffByWorkspaceUserId?: string;
    /**
     * @generated from field: optional string signed_off_by_client_portal_grant_id = 29;
     */
    signedOffByClientPortalGrantId?: string;
    /**
     * @generated from field: optional int64 signed_off_at = 30;
     */
    signedOffAt?: bigint;
};
/**
 * Describes the message domain.operation.v1.Evaluation.
 * Use `create(EvaluationSchema)` to create a new message.
 */
export declare const EvaluationSchema: GenMessage<Evaluation>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationRequest
 */
export type CreateEvaluationRequest = Message<"domain.operation.v1.CreateEvaluationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Evaluation data = 1;
     */
    data?: Evaluation;
};
/**
 * Describes the message domain.operation.v1.CreateEvaluationRequest.
 * Use `create(CreateEvaluationRequestSchema)` to create a new message.
 */
export declare const CreateEvaluationRequestSchema: GenMessage<CreateEvaluationRequest>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationResponse
 */
export type CreateEvaluationResponse = Message<"domain.operation.v1.CreateEvaluationResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Evaluation data = 1;
     */
    data: Evaluation[];
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
 * Describes the message domain.operation.v1.CreateEvaluationResponse.
 * Use `create(CreateEvaluationResponseSchema)` to create a new message.
 */
export declare const CreateEvaluationResponseSchema: GenMessage<CreateEvaluationResponse>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationRequest
 */
export type ReadEvaluationRequest = Message<"domain.operation.v1.ReadEvaluationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Evaluation data = 1;
     */
    data?: Evaluation;
};
/**
 * Describes the message domain.operation.v1.ReadEvaluationRequest.
 * Use `create(ReadEvaluationRequestSchema)` to create a new message.
 */
export declare const ReadEvaluationRequestSchema: GenMessage<ReadEvaluationRequest>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationResponse
 */
export type ReadEvaluationResponse = Message<"domain.operation.v1.ReadEvaluationResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Evaluation data = 1;
     */
    data: Evaluation[];
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
 * Describes the message domain.operation.v1.ReadEvaluationResponse.
 * Use `create(ReadEvaluationResponseSchema)` to create a new message.
 */
export declare const ReadEvaluationResponseSchema: GenMessage<ReadEvaluationResponse>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationRequest
 */
export type UpdateEvaluationRequest = Message<"domain.operation.v1.UpdateEvaluationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Evaluation data = 1;
     */
    data?: Evaluation;
};
/**
 * Describes the message domain.operation.v1.UpdateEvaluationRequest.
 * Use `create(UpdateEvaluationRequestSchema)` to create a new message.
 */
export declare const UpdateEvaluationRequestSchema: GenMessage<UpdateEvaluationRequest>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationResponse
 */
export type UpdateEvaluationResponse = Message<"domain.operation.v1.UpdateEvaluationResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Evaluation data = 1;
     */
    data: Evaluation[];
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
 * Describes the message domain.operation.v1.UpdateEvaluationResponse.
 * Use `create(UpdateEvaluationResponseSchema)` to create a new message.
 */
export declare const UpdateEvaluationResponseSchema: GenMessage<UpdateEvaluationResponse>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationRequest
 */
export type DeleteEvaluationRequest = Message<"domain.operation.v1.DeleteEvaluationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.Evaluation data = 1;
     */
    data?: Evaluation;
};
/**
 * Describes the message domain.operation.v1.DeleteEvaluationRequest.
 * Use `create(DeleteEvaluationRequestSchema)` to create a new message.
 */
export declare const DeleteEvaluationRequestSchema: GenMessage<DeleteEvaluationRequest>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationResponse
 */
export type DeleteEvaluationResponse = Message<"domain.operation.v1.DeleteEvaluationResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteEvaluationResponse.
 * Use `create(DeleteEvaluationResponseSchema)` to create a new message.
 */
export declare const DeleteEvaluationResponseSchema: GenMessage<DeleteEvaluationResponse>;
/**
 * @generated from message domain.operation.v1.ListEvaluationsRequest
 */
export type ListEvaluationsRequest = Message<"domain.operation.v1.ListEvaluationsRequest"> & {
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
 * Describes the message domain.operation.v1.ListEvaluationsRequest.
 * Use `create(ListEvaluationsRequestSchema)` to create a new message.
 */
export declare const ListEvaluationsRequestSchema: GenMessage<ListEvaluationsRequest>;
/**
 * @generated from message domain.operation.v1.ListEvaluationsResponse
 */
export type ListEvaluationsResponse = Message<"domain.operation.v1.ListEvaluationsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Evaluation data = 1;
     */
    data: Evaluation[];
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
 * Describes the message domain.operation.v1.ListEvaluationsResponse.
 * Use `create(ListEvaluationsResponseSchema)` to create a new message.
 */
export declare const ListEvaluationsResponseSchema: GenMessage<ListEvaluationsResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationListPageDataRequest
 */
export type GetEvaluationListPageDataRequest = Message<"domain.operation.v1.GetEvaluationListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetEvaluationListPageDataRequest.
 * Use `create(GetEvaluationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationListPageDataRequestSchema: GenMessage<GetEvaluationListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationListPageDataResponse
 */
export type GetEvaluationListPageDataResponse = Message<"domain.operation.v1.GetEvaluationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.Evaluation evaluation_list = 1;
     */
    evaluationList: Evaluation[];
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
 * Describes the message domain.operation.v1.GetEvaluationListPageDataResponse.
 * Use `create(GetEvaluationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationListPageDataResponseSchema: GenMessage<GetEvaluationListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationItemPageDataRequest
 */
export type GetEvaluationItemPageDataRequest = Message<"domain.operation.v1.GetEvaluationItemPageDataRequest"> & {
    /**
     * @generated from field: string evaluation_id = 1;
     */
    evaluationId: string;
};
/**
 * Describes the message domain.operation.v1.GetEvaluationItemPageDataRequest.
 * Use `create(GetEvaluationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationItemPageDataRequestSchema: GenMessage<GetEvaluationItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationItemPageDataResponse
 */
export type GetEvaluationItemPageDataResponse = Message<"domain.operation.v1.GetEvaluationItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.Evaluation evaluation = 1;
     */
    evaluation?: Evaluation;
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
 * Describes the message domain.operation.v1.GetEvaluationItemPageDataResponse.
 * Use `create(GetEvaluationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationItemPageDataResponseSchema: GenMessage<GetEvaluationItemPageDataResponse>;
/**
 * EvaluationType — the FORM/purpose of the evaluation. The DB pins this domain
 * via a CHECK constraint; UNSPECIFIED is excluded.
 *
 * @generated from enum domain.operation.v1.EvaluationType
 */
export declare enum EvaluationType {
    /**
     * @generated from enum value: EVALUATION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * outsourcing: client rates the associate
     *
     * @generated from enum value: EVALUATION_TYPE_PERFORMANCE_REVIEW = 1;
     */
    PERFORMANCE_REVIEW = 1,
    /**
     * @generated from enum value: EVALUATION_TYPE_CSAT = 2;
     */
    CSAT = 2,
    /**
     * education: student rates the instructor
     *
     * @generated from enum value: EVALUATION_TYPE_COURSE_EVAL = 3;
     */
    COURSE_EVAL = 3,
    /**
     * @generated from enum value: EVALUATION_TYPE_VENDOR_SCORECARD = 4;
     */
    VENDOR_SCORECARD = 4
}
/**
 * Describes the enum domain.operation.v1.EvaluationType.
 */
export declare const EvaluationTypeSchema: GenEnum<EvaluationType>;
/**
 * RelationshipType — the ARROW of the evaluation. Orthogonal to EvaluationType.
 *
 * @generated from enum domain.operation.v1.RelationshipType
 */
export declare enum RelationshipType {
    /**
     * @generated from enum value: RELATIONSHIP_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * outsourcing v1
     *
     * @generated from enum value: RELATIONSHIP_TYPE_CLIENT_TO_ASSOCIATE = 1;
     */
    CLIENT_TO_ASSOCIATE = 1,
    /**
     * @generated from enum value: RELATIONSHIP_TYPE_STAFF_TO_CLIENT = 2;
     */
    STAFF_TO_CLIENT = 2,
    /**
     * @generated from enum value: RELATIONSHIP_TYPE_SELF = 3;
     */
    SELF = 3,
    /**
     * @generated from enum value: RELATIONSHIP_TYPE_PEER = 4;
     */
    PEER = 4,
    /**
     * @generated from enum value: RELATIONSHIP_TYPE_MANAGER = 5;
     */
    MANAGER = 5
}
/**
 * Describes the enum domain.operation.v1.RelationshipType.
 */
export declare const RelationshipTypeSchema: GenEnum<RelationshipType>;
/**
 * EvaluatorType — which arc carries the evaluator actor.
 *
 * @generated from enum domain.operation.v1.EvaluatorType
 */
export declare enum EvaluatorType {
    /**
     * @generated from enum value: EVALUATOR_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * evaluator_client_portal_grant_id (CLIENT arc)
     *
     * @generated from enum value: EVALUATOR_TYPE_CLIENT = 1;
     */
    CLIENT = 1,
    /**
     * evaluator_workspace_user_id (operator-side; CR-4)
     *
     * @generated from enum value: EVALUATOR_TYPE_STAFF = 2;
     */
    STAFF = 2
}
/**
 * Describes the enum domain.operation.v1.EvaluatorType.
 */
export declare const EvaluatorTypeSchema: GenEnum<EvaluatorType>;
/**
 * SubjectType — which arc carries the reviewed subject.
 *
 * @generated from enum domain.operation.v1.SubjectType
 */
export declare enum SubjectType {
    /**
     * @generated from enum value: SUBJECT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * subject_staff_id (-> entity/staff) — the HUMAN Identity is the subject
     *
     * @generated from enum value: SUBJECT_TYPE_ASSOCIATE = 1;
     */
    ASSOCIATE = 1,
    /**
     * subject_client_id
     *
     * @generated from enum value: SUBJECT_TYPE_CLIENT = 2;
     */
    CLIENT = 2
}
/**
 * Describes the enum domain.operation.v1.SubjectType.
 */
export declare const SubjectTypeSchema: GenEnum<SubjectType>;
/**
 * VisibilityType — who may read the evaluation. INTERNAL_ONLY is fail-closed for
 * clients in the QUERY predicate (not just the view). Re-used by evaluation_template.
 *
 * @generated from enum domain.operation.v1.VisibilityType
 */
export declare enum VisibilityType {
    /**
     * @generated from enum value: VISIBILITY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * staff only
     *
     * @generated from enum value: VISIBILITY_TYPE_INTERNAL_ONLY = 1;
     */
    INTERNAL_ONLY = 1,
    /**
     * @generated from enum value: VISIBILITY_TYPE_VISIBLE_TO_SUBJECT = 2;
     */
    VISIBLE_TO_SUBJECT = 2,
    /**
     * v2 anonymity
     *
     * @generated from enum value: VISIBILITY_TYPE_VISIBLE_TO_SUBJECT_ANON = 3;
     */
    VISIBLE_TO_SUBJECT_ANON = 3
}
/**
 * Describes the enum domain.operation.v1.VisibilityType.
 */
export declare const VisibilityTypeSchema: GenEnum<VisibilityType>;
/**
 * EvaluationStatus — the single lifecycle source of truth. active = (status NOT IN
 * {ARCHIVED}). DRAFT is a partial save (NOT materialized at cycle-open — SR-1).
 *
 * @generated from enum domain.operation.v1.EvaluationStatus
 */
export declare enum EvaluationStatus {
    /**
     * @generated from enum value: EVALUATION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * partial save
     *
     * @generated from enum value: EVALUATION_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: EVALUATION_STATUS_SUBMITTED = 2;
     */
    SUBMITTED = 2,
    /**
     * active = status NOT IN {archived}
     *
     * @generated from enum value: EVALUATION_STATUS_ARCHIVED = 3;
     */
    ARCHIVED = 3,
    /**
     * distinct manager/client countersign (Q-SIGNOFF-1)
     *
     * @generated from enum value: EVALUATION_STATUS_SIGNED_OFF = 4;
     */
    SIGNED_OFF = 4
}
/**
 * Describes the enum domain.operation.v1.EvaluationStatus.
 */
export declare const EvaluationStatusSchema: GenEnum<EvaluationStatus>;
/**
 * @generated from service domain.operation.v1.EvaluationDomainService
 */
export declare const EvaluationDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.EvaluationDomainService.CreateEvaluation
     */
    createEvaluation: {
        methodKind: "unary";
        input: typeof CreateEvaluationRequestSchema;
        output: typeof CreateEvaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationDomainService.ReadEvaluation
     */
    readEvaluation: {
        methodKind: "unary";
        input: typeof ReadEvaluationRequestSchema;
        output: typeof ReadEvaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationDomainService.UpdateEvaluation
     */
    updateEvaluation: {
        methodKind: "unary";
        input: typeof UpdateEvaluationRequestSchema;
        output: typeof UpdateEvaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationDomainService.DeleteEvaluation
     */
    deleteEvaluation: {
        methodKind: "unary";
        input: typeof DeleteEvaluationRequestSchema;
        output: typeof DeleteEvaluationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationDomainService.ListEvaluations
     */
    listEvaluations: {
        methodKind: "unary";
        input: typeof ListEvaluationsRequestSchema;
        output: typeof ListEvaluationsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.operation.v1.EvaluationDomainService.GetEvaluationListPageData
     */
    getEvaluationListPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationListPageDataRequestSchema;
        output: typeof GetEvaluationListPageDataResponseSchema;
    };
    /**
     * Enhanced item view with related data
     *
     * @generated from rpc domain.operation.v1.EvaluationDomainService.GetEvaluationItemPageData
     */
    getEvaluationItemPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationItemPageDataRequestSchema;
        output: typeof GetEvaluationItemPageDataResponseSchema;
    };
}>;
