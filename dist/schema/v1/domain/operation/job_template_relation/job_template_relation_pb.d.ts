import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobTemplate } from "../job_template/job_template_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/job_template_relation/job_template_relation.proto.
 */
export declare const file_domain_operation_job_template_relation_job_template_relation: GenFile;
/**
 * Join table linking JobTemplates in a parent-child relationship. Replaces
 * the rejected self-FK approach on JobTemplate (orphan detection requires
 * recursive CTEs; cycle prevention requires write-time check; sequencing
 * is ambiguous). The join table carries sequence_order explicitly and can
 * be extended without touching JobTemplate's own schema. See auto-spawn
 * plan §2.2 + §4.
 *
 * @generated from message domain.operation.v1.JobTemplateRelation
 */
export type JobTemplateRelation = Message<"domain.operation.v1.JobTemplateRelation"> & {
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
     * @generated from field: string parent_template_id = 7;
     */
    parentTemplateId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTemplate parent_template = 8;
     */
    parentTemplate?: JobTemplate;
    /**
     * @generated from field: string child_template_id = 9;
     */
    childTemplateId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobTemplate child_template = 10;
     */
    childTemplate?: JobTemplate;
    /**
     * Deterministic spawn order for child Jobs when a Plan declares multiple
     * sub-templates. Ascending integer; ties broken by id.
     *
     * @generated from field: int32 sequence_order = 11;
     */
    sequenceOrder: number;
    /**
     * @generated from field: domain.operation.v1.JobTemplateRelationType relation_type = 12;
     */
    relationType: JobTemplateRelationType;
};
/**
 * Describes the message domain.operation.v1.JobTemplateRelation.
 * Use `create(JobTemplateRelationSchema)` to create a new message.
 */
export declare const JobTemplateRelationSchema: GenMessage<JobTemplateRelation>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateRelationRequest
 */
export type CreateJobTemplateRelationRequest = Message<"domain.operation.v1.CreateJobTemplateRelationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateRelation data = 1;
     */
    data?: JobTemplateRelation;
};
/**
 * Describes the message domain.operation.v1.CreateJobTemplateRelationRequest.
 * Use `create(CreateJobTemplateRelationRequestSchema)` to create a new message.
 */
export declare const CreateJobTemplateRelationRequestSchema: GenMessage<CreateJobTemplateRelationRequest>;
/**
 * @generated from message domain.operation.v1.CreateJobTemplateRelationResponse
 */
export type CreateJobTemplateRelationResponse = Message<"domain.operation.v1.CreateJobTemplateRelationResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation data = 1;
     */
    data: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.CreateJobTemplateRelationResponse.
 * Use `create(CreateJobTemplateRelationResponseSchema)` to create a new message.
 */
export declare const CreateJobTemplateRelationResponseSchema: GenMessage<CreateJobTemplateRelationResponse>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateRelationRequest
 */
export type ReadJobTemplateRelationRequest = Message<"domain.operation.v1.ReadJobTemplateRelationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateRelation data = 1;
     */
    data?: JobTemplateRelation;
};
/**
 * Describes the message domain.operation.v1.ReadJobTemplateRelationRequest.
 * Use `create(ReadJobTemplateRelationRequestSchema)` to create a new message.
 */
export declare const ReadJobTemplateRelationRequestSchema: GenMessage<ReadJobTemplateRelationRequest>;
/**
 * @generated from message domain.operation.v1.ReadJobTemplateRelationResponse
 */
export type ReadJobTemplateRelationResponse = Message<"domain.operation.v1.ReadJobTemplateRelationResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation data = 1;
     */
    data: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.ReadJobTemplateRelationResponse.
 * Use `create(ReadJobTemplateRelationResponseSchema)` to create a new message.
 */
export declare const ReadJobTemplateRelationResponseSchema: GenMessage<ReadJobTemplateRelationResponse>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateRelationRequest
 */
export type UpdateJobTemplateRelationRequest = Message<"domain.operation.v1.UpdateJobTemplateRelationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateRelation data = 1;
     */
    data?: JobTemplateRelation;
};
/**
 * Describes the message domain.operation.v1.UpdateJobTemplateRelationRequest.
 * Use `create(UpdateJobTemplateRelationRequestSchema)` to create a new message.
 */
export declare const UpdateJobTemplateRelationRequestSchema: GenMessage<UpdateJobTemplateRelationRequest>;
/**
 * @generated from message domain.operation.v1.UpdateJobTemplateRelationResponse
 */
export type UpdateJobTemplateRelationResponse = Message<"domain.operation.v1.UpdateJobTemplateRelationResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation data = 1;
     */
    data: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.UpdateJobTemplateRelationResponse.
 * Use `create(UpdateJobTemplateRelationResponseSchema)` to create a new message.
 */
export declare const UpdateJobTemplateRelationResponseSchema: GenMessage<UpdateJobTemplateRelationResponse>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateRelationRequest
 */
export type DeleteJobTemplateRelationRequest = Message<"domain.operation.v1.DeleteJobTemplateRelationRequest"> & {
    /**
     * @generated from field: domain.operation.v1.JobTemplateRelation data = 1;
     */
    data?: JobTemplateRelation;
};
/**
 * Describes the message domain.operation.v1.DeleteJobTemplateRelationRequest.
 * Use `create(DeleteJobTemplateRelationRequestSchema)` to create a new message.
 */
export declare const DeleteJobTemplateRelationRequestSchema: GenMessage<DeleteJobTemplateRelationRequest>;
/**
 * @generated from message domain.operation.v1.DeleteJobTemplateRelationResponse
 */
export type DeleteJobTemplateRelationResponse = Message<"domain.operation.v1.DeleteJobTemplateRelationResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteJobTemplateRelationResponse.
 * Use `create(DeleteJobTemplateRelationResponseSchema)` to create a new message.
 */
export declare const DeleteJobTemplateRelationResponseSchema: GenMessage<DeleteJobTemplateRelationResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateRelationsRequest
 */
export type ListJobTemplateRelationsRequest = Message<"domain.operation.v1.ListJobTemplateRelationsRequest"> & {
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
 * Describes the message domain.operation.v1.ListJobTemplateRelationsRequest.
 * Use `create(ListJobTemplateRelationsRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateRelationsRequestSchema: GenMessage<ListJobTemplateRelationsRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateRelationsResponse
 */
export type ListJobTemplateRelationsResponse = Message<"domain.operation.v1.ListJobTemplateRelationsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation data = 1;
     */
    data: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.ListJobTemplateRelationsResponse.
 * Use `create(ListJobTemplateRelationsResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateRelationsResponseSchema: GenMessage<ListJobTemplateRelationsResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateRelationListPageDataRequest
 */
export type GetJobTemplateRelationListPageDataRequest = Message<"domain.operation.v1.GetJobTemplateRelationListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetJobTemplateRelationListPageDataRequest.
 * Use `create(GetJobTemplateRelationListPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplateRelationListPageDataRequestSchema: GenMessage<GetJobTemplateRelationListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateRelationListPageDataResponse
 */
export type GetJobTemplateRelationListPageDataResponse = Message<"domain.operation.v1.GetJobTemplateRelationListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation job_template_relation_list = 1;
     */
    jobTemplateRelationList: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.GetJobTemplateRelationListPageDataResponse.
 * Use `create(GetJobTemplateRelationListPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplateRelationListPageDataResponseSchema: GenMessage<GetJobTemplateRelationListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateRelationItemPageDataRequest
 */
export type GetJobTemplateRelationItemPageDataRequest = Message<"domain.operation.v1.GetJobTemplateRelationItemPageDataRequest"> & {
    /**
     * @generated from field: string job_template_relation_id = 1;
     */
    jobTemplateRelationId: string;
};
/**
 * Describes the message domain.operation.v1.GetJobTemplateRelationItemPageDataRequest.
 * Use `create(GetJobTemplateRelationItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetJobTemplateRelationItemPageDataRequestSchema: GenMessage<GetJobTemplateRelationItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetJobTemplateRelationItemPageDataResponse
 */
export type GetJobTemplateRelationItemPageDataResponse = Message<"domain.operation.v1.GetJobTemplateRelationItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.JobTemplateRelation job_template_relation = 1;
     */
    jobTemplateRelation?: JobTemplateRelation;
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
 * Describes the message domain.operation.v1.GetJobTemplateRelationItemPageDataResponse.
 * Use `create(GetJobTemplateRelationItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetJobTemplateRelationItemPageDataResponseSchema: GenMessage<GetJobTemplateRelationItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateRelationsByParentRequest
 */
export type ListJobTemplateRelationsByParentRequest = Message<"domain.operation.v1.ListJobTemplateRelationsByParentRequest"> & {
    /**
     * @generated from field: string parent_template_id = 1;
     */
    parentTemplateId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobTemplateRelationsByParentRequest.
 * Use `create(ListJobTemplateRelationsByParentRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateRelationsByParentRequestSchema: GenMessage<ListJobTemplateRelationsByParentRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateRelationsByParentResponse
 */
export type ListJobTemplateRelationsByParentResponse = Message<"domain.operation.v1.ListJobTemplateRelationsByParentResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation job_template_relations = 1;
     */
    jobTemplateRelations: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.ListJobTemplateRelationsByParentResponse.
 * Use `create(ListJobTemplateRelationsByParentResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateRelationsByParentResponseSchema: GenMessage<ListJobTemplateRelationsByParentResponse>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateRelationsByChildRequest
 */
export type ListJobTemplateRelationsByChildRequest = Message<"domain.operation.v1.ListJobTemplateRelationsByChildRequest"> & {
    /**
     * @generated from field: string child_template_id = 1;
     */
    childTemplateId: string;
};
/**
 * Describes the message domain.operation.v1.ListJobTemplateRelationsByChildRequest.
 * Use `create(ListJobTemplateRelationsByChildRequestSchema)` to create a new message.
 */
export declare const ListJobTemplateRelationsByChildRequestSchema: GenMessage<ListJobTemplateRelationsByChildRequest>;
/**
 * @generated from message domain.operation.v1.ListJobTemplateRelationsByChildResponse
 */
export type ListJobTemplateRelationsByChildResponse = Message<"domain.operation.v1.ListJobTemplateRelationsByChildResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.JobTemplateRelation job_template_relations = 1;
     */
    jobTemplateRelations: JobTemplateRelation[];
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
 * Describes the message domain.operation.v1.ListJobTemplateRelationsByChildResponse.
 * Use `create(ListJobTemplateRelationsByChildResponseSchema)` to create a new message.
 */
export declare const ListJobTemplateRelationsByChildResponseSchema: GenMessage<ListJobTemplateRelationsByChildResponse>;
/**
 * What kind of relationship this row expresses between two JobTemplates.
 *   SUB_TEMPLATE — child template runs as a sub-engagement under the parent
 *                  (e.g., Permit Filing as a child of Tower Audit). Spawned
 *                  child Jobs carry parent_job_id of the root Job.
 *   ONCE_AT_ENGAGEMENT_START — child template fires ONCE at engagement spawn
 *                  (Subscription.Create), not per cycle. Use for
 *                  onboarding/setup templates that should run only when a
 *                  cyclic subscription is first created. Spawned as a child
 *                  of the engagement Job (parent_job_id=engagement.id), with
 *                  cycle_index=NULL. Rejected on non-cyclic Plans (validation
 *                  at Plan-edit time). See
 *                  docs/plan/20260430-cyclic-subscription-jobs/plan.md §2.3.
 *
 * @generated from enum domain.operation.v1.JobTemplateRelationType
 */
export declare enum JobTemplateRelationType {
    /**
     * @generated from enum value: JOB_TEMPLATE_RELATION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: JOB_TEMPLATE_RELATION_TYPE_SUB_TEMPLATE = 1;
     */
    SUB_TEMPLATE = 1,
    /**
     * @generated from enum value: JOB_TEMPLATE_RELATION_TYPE_ONCE_AT_ENGAGEMENT_START = 2;
     */
    ONCE_AT_ENGAGEMENT_START = 2
}
/**
 * Describes the enum domain.operation.v1.JobTemplateRelationType.
 */
export declare const JobTemplateRelationTypeSchema: GenEnum<JobTemplateRelationType>;
/**
 * @generated from service domain.operation.v1.JobTemplateRelationDomainService
 */
export declare const JobTemplateRelationDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.CreateJobTemplateRelation
     */
    createJobTemplateRelation: {
        methodKind: "unary";
        input: typeof CreateJobTemplateRelationRequestSchema;
        output: typeof CreateJobTemplateRelationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.ReadJobTemplateRelation
     */
    readJobTemplateRelation: {
        methodKind: "unary";
        input: typeof ReadJobTemplateRelationRequestSchema;
        output: typeof ReadJobTemplateRelationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.UpdateJobTemplateRelation
     */
    updateJobTemplateRelation: {
        methodKind: "unary";
        input: typeof UpdateJobTemplateRelationRequestSchema;
        output: typeof UpdateJobTemplateRelationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.DeleteJobTemplateRelation
     */
    deleteJobTemplateRelation: {
        methodKind: "unary";
        input: typeof DeleteJobTemplateRelationRequestSchema;
        output: typeof DeleteJobTemplateRelationResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.ListJobTemplateRelations
     */
    listJobTemplateRelations: {
        methodKind: "unary";
        input: typeof ListJobTemplateRelationsRequestSchema;
        output: typeof ListJobTemplateRelationsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.GetJobTemplateRelationListPageData
     */
    getJobTemplateRelationListPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplateRelationListPageDataRequestSchema;
        output: typeof GetJobTemplateRelationListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.GetJobTemplateRelationItemPageData
     */
    getJobTemplateRelationItemPageData: {
        methodKind: "unary";
        input: typeof GetJobTemplateRelationItemPageDataRequestSchema;
        output: typeof GetJobTemplateRelationItemPageDataResponseSchema;
    };
    /**
     * Extras: filter by either side of the relation.
     *
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.ListByParent
     */
    listByParent: {
        methodKind: "unary";
        input: typeof ListJobTemplateRelationsByParentRequestSchema;
        output: typeof ListJobTemplateRelationsByParentResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.JobTemplateRelationDomainService.ListByChild
     */
    listByChild: {
        methodKind: "unary";
        input: typeof ListJobTemplateRelationsByChildRequestSchema;
        output: typeof ListJobTemplateRelationsByChildResponseSchema;
    };
}>;
