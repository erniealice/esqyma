import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { DocumentTemplate } from "../../document/template/template_pb";
import type { VersionStatus } from "../enums/enums_pb";
import type { JobCategory } from "../job_category/job_category_pb";
import type { Plan } from "../../subscription/plan/plan_pb";
import type { PriceSchedule } from "../../subscription/price_schedule/price_schedule_pb";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/subscription_group_document_template/subscription_group_document_template.proto.
 */
export declare const file_domain_operation_subscription_group_document_template_subscription_group_document_template: GenFile;
/**
 * SubscriptionGroupDocumentTemplate binds a subscription-group outcome-summary
 * rendering profile to an immutable DocumentTemplate. Nullable applicability
 * axes are explicit fallback buckets; profile policy decides which buckets may
 * be published. The v1 eleven-column profile requires an exact job category.
 *
 * @generated from message domain.operation.v1.SubscriptionGroupDocumentTemplate
 */
export type SubscriptionGroupDocumentTemplate = Message<"domain.operation.v1.SubscriptionGroupDocumentTemplate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Tenant boundary. Resolver callers never supply this value; adapters source
     * it from trusted request context and repeat tenant equality on every join.
     *
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string document_template_id = 3;
     */
    documentTemplateId: string;
    /**
     * hydrate-only
     *
     * @generated from field: optional domain.document.v1.DocumentTemplate document_template = 4;
     */
    documentTemplate?: DocumentTemplate;
    /**
     * @generated from field: domain.operation.v1.RenderProfile render_profile = 5;
     */
    renderProfile: RenderProfile;
    /**
     * NULL means every price schedule within a profile-permitted scope.
     *
     * @generated from field: optional string price_schedule_id = 6;
     */
    priceScheduleId?: string;
    /**
     * hydrate-only
     *
     * @generated from field: optional domain.subscription.v1.PriceSchedule price_schedule = 7;
     */
    priceSchedule?: PriceSchedule;
    /**
     * NULL means every plan within a profile-permitted scope.
     *
     * @generated from field: optional string plan_id = 8;
     */
    planId?: string;
    /**
     * hydrate-only
     *
     * @generated from field: optional domain.subscription.v1.Plan plan = 9;
     */
    plan?: Plan;
    /**
     * NULL is schema capacity for a registered category-agnostic profile. The
     * currently registered v1 profile rejects it at create/publish time.
     *
     * @generated from field: optional string job_category_id = 10;
     */
    jobCategoryId?: string;
    /**
     * hydrate-only
     *
     * @generated from field: optional domain.operation.v1.JobCategory job_category = 11;
     */
    jobCategory?: JobCategory;
    /**
     * @generated from field: int32 version = 12;
     */
    version: number;
    /**
     * @generated from field: domain.operation.v1.VersionStatus version_status = 13;
     */
    versionStatus: VersionStatus;
    /**
     * Half-open [validity_start, validity_end), UTC.
     *
     * @generated from field: optional google.protobuf.Timestamp validity_start = 14;
     */
    validityStart?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp validity_end = 15;
     */
    validityEnd?: Timestamp;
    /**
     * @generated from field: optional string supersedes_binding_id = 16;
     */
    supersedesBindingId?: string;
    /**
     * @generated from field: bool active = 17;
     */
    active: boolean;
    /**
     * @generated from field: optional string created_by = 18;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 published_at = 19;
     */
    publishedAt?: bigint;
    /**
     * @generated from field: optional string published_at_string = 20;
     */
    publishedAtString?: string;
    /**
     * @generated from field: optional string published_by = 21;
     */
    publishedBy?: string;
    /**
     * @generated from field: optional int64 date_created = 22;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 23;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 24;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 25;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.SubscriptionGroupDocumentTemplate.
 * Use `create(SubscriptionGroupDocumentTemplateSchema)` to create a new message.
 */
export declare const SubscriptionGroupDocumentTemplateSchema: GenMessage<SubscriptionGroupDocumentTemplate>;
/**
 * @generated from message domain.operation.v1.CreateSubscriptionGroupDocumentTemplateRequest
 */
export type CreateSubscriptionGroupDocumentTemplateRequest = Message<"domain.operation.v1.CreateSubscriptionGroupDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data?: SubscriptionGroupDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.CreateSubscriptionGroupDocumentTemplateRequest.
 * Use `create(CreateSubscriptionGroupDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupDocumentTemplateRequestSchema: GenMessage<CreateSubscriptionGroupDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.CreateSubscriptionGroupDocumentTemplateResponse
 */
export type CreateSubscriptionGroupDocumentTemplateResponse = Message<"domain.operation.v1.CreateSubscriptionGroupDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data: SubscriptionGroupDocumentTemplate[];
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
 * Describes the message domain.operation.v1.CreateSubscriptionGroupDocumentTemplateResponse.
 * Use `create(CreateSubscriptionGroupDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const CreateSubscriptionGroupDocumentTemplateResponseSchema: GenMessage<CreateSubscriptionGroupDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ReadSubscriptionGroupDocumentTemplateRequest
 */
export type ReadSubscriptionGroupDocumentTemplateRequest = Message<"domain.operation.v1.ReadSubscriptionGroupDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data?: SubscriptionGroupDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.ReadSubscriptionGroupDocumentTemplateRequest.
 * Use `create(ReadSubscriptionGroupDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupDocumentTemplateRequestSchema: GenMessage<ReadSubscriptionGroupDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ReadSubscriptionGroupDocumentTemplateResponse
 */
export type ReadSubscriptionGroupDocumentTemplateResponse = Message<"domain.operation.v1.ReadSubscriptionGroupDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data: SubscriptionGroupDocumentTemplate[];
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
 * Describes the message domain.operation.v1.ReadSubscriptionGroupDocumentTemplateResponse.
 * Use `create(ReadSubscriptionGroupDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const ReadSubscriptionGroupDocumentTemplateResponseSchema: GenMessage<ReadSubscriptionGroupDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.UpdateSubscriptionGroupDocumentTemplateRequest
 */
export type UpdateSubscriptionGroupDocumentTemplateRequest = Message<"domain.operation.v1.UpdateSubscriptionGroupDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data?: SubscriptionGroupDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.UpdateSubscriptionGroupDocumentTemplateRequest.
 * Use `create(UpdateSubscriptionGroupDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupDocumentTemplateRequestSchema: GenMessage<UpdateSubscriptionGroupDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.UpdateSubscriptionGroupDocumentTemplateResponse
 */
export type UpdateSubscriptionGroupDocumentTemplateResponse = Message<"domain.operation.v1.UpdateSubscriptionGroupDocumentTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data: SubscriptionGroupDocumentTemplate[];
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
 * Describes the message domain.operation.v1.UpdateSubscriptionGroupDocumentTemplateResponse.
 * Use `create(UpdateSubscriptionGroupDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateSubscriptionGroupDocumentTemplateResponseSchema: GenMessage<UpdateSubscriptionGroupDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.DeleteSubscriptionGroupDocumentTemplateRequest
 */
export type DeleteSubscriptionGroupDocumentTemplateRequest = Message<"domain.operation.v1.DeleteSubscriptionGroupDocumentTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data?: SubscriptionGroupDocumentTemplate;
};
/**
 * Describes the message domain.operation.v1.DeleteSubscriptionGroupDocumentTemplateRequest.
 * Use `create(DeleteSubscriptionGroupDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupDocumentTemplateRequestSchema: GenMessage<DeleteSubscriptionGroupDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.DeleteSubscriptionGroupDocumentTemplateResponse
 */
export type DeleteSubscriptionGroupDocumentTemplateResponse = Message<"domain.operation.v1.DeleteSubscriptionGroupDocumentTemplateResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteSubscriptionGroupDocumentTemplateResponse.
 * Use `create(DeleteSubscriptionGroupDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteSubscriptionGroupDocumentTemplateResponseSchema: GenMessage<DeleteSubscriptionGroupDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ListSubscriptionGroupDocumentTemplatesRequest
 */
export type ListSubscriptionGroupDocumentTemplatesRequest = Message<"domain.operation.v1.ListSubscriptionGroupDocumentTemplatesRequest"> & {
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
 * Describes the message domain.operation.v1.ListSubscriptionGroupDocumentTemplatesRequest.
 * Use `create(ListSubscriptionGroupDocumentTemplatesRequestSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupDocumentTemplatesRequestSchema: GenMessage<ListSubscriptionGroupDocumentTemplatesRequest>;
/**
 * @generated from message domain.operation.v1.ListSubscriptionGroupDocumentTemplatesResponse
 */
export type ListSubscriptionGroupDocumentTemplatesResponse = Message<"domain.operation.v1.ListSubscriptionGroupDocumentTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data: SubscriptionGroupDocumentTemplate[];
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
 * Describes the message domain.operation.v1.ListSubscriptionGroupDocumentTemplatesResponse.
 * Use `create(ListSubscriptionGroupDocumentTemplatesResponseSchema)` to create a new message.
 */
export declare const ListSubscriptionGroupDocumentTemplatesResponseSchema: GenMessage<ListSubscriptionGroupDocumentTemplatesResponse>;
/**
 * Management resolver request. Workspace is always trusted context. The
 * document purpose is a required, caller-pinned family discriminator; the
 * report-scoped resolver uses a separate in-process request and pins it itself.
 *
 * @generated from message domain.operation.v1.FindApplicableSubscriptionGroupDocumentTemplateRequest
 */
export type FindApplicableSubscriptionGroupDocumentTemplateRequest = Message<"domain.operation.v1.FindApplicableSubscriptionGroupDocumentTemplateRequest"> & {
    /**
     * @generated from field: optional string price_schedule_id = 1;
     */
    priceScheduleId?: string;
    /**
     * @generated from field: optional string plan_id = 2;
     */
    planId?: string;
    /**
     * @generated from field: optional string job_category_id = 3;
     */
    jobCategoryId?: string;
    /**
     * @generated from field: domain.operation.v1.RenderProfile render_profile = 4;
     */
    renderProfile: RenderProfile;
    /**
     * @generated from field: optional google.protobuf.Timestamp as_of = 5;
     */
    asOf?: Timestamp;
    /**
     * @generated from field: string document_purpose = 6;
     */
    documentPurpose: string;
};
/**
 * Describes the message domain.operation.v1.FindApplicableSubscriptionGroupDocumentTemplateRequest.
 * Use `create(FindApplicableSubscriptionGroupDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const FindApplicableSubscriptionGroupDocumentTemplateRequestSchema: GenMessage<FindApplicableSubscriptionGroupDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.FindApplicableSubscriptionGroupDocumentTemplateResponse
 */
export type FindApplicableSubscriptionGroupDocumentTemplateResponse = Message<"domain.operation.v1.FindApplicableSubscriptionGroupDocumentTemplateResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.SubscriptionGroupDocumentTemplate binding = 1;
     */
    binding?: SubscriptionGroupDocumentTemplate;
    /**
     * @generated from field: bool found = 2;
     */
    found: boolean;
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
 * Describes the message domain.operation.v1.FindApplicableSubscriptionGroupDocumentTemplateResponse.
 * Use `create(FindApplicableSubscriptionGroupDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const FindApplicableSubscriptionGroupDocumentTemplateResponseSchema: GenMessage<FindApplicableSubscriptionGroupDocumentTemplateResponse>;
/**
 * @generated from message domain.operation.v1.PublishSubscriptionGroupDocumentTemplateRequest
 */
export type PublishSubscriptionGroupDocumentTemplateRequest = Message<"domain.operation.v1.PublishSubscriptionGroupDocumentTemplateRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.operation.v1.PublishSubscriptionGroupDocumentTemplateRequest.
 * Use `create(PublishSubscriptionGroupDocumentTemplateRequestSchema)` to create a new message.
 */
export declare const PublishSubscriptionGroupDocumentTemplateRequestSchema: GenMessage<PublishSubscriptionGroupDocumentTemplateRequest>;
/**
 * @generated from message domain.operation.v1.PublishSubscriptionGroupDocumentTemplateResponse
 */
export type PublishSubscriptionGroupDocumentTemplateResponse = Message<"domain.operation.v1.PublishSubscriptionGroupDocumentTemplateResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.SubscriptionGroupDocumentTemplate data = 1;
     */
    data?: SubscriptionGroupDocumentTemplate;
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
 * Describes the message domain.operation.v1.PublishSubscriptionGroupDocumentTemplateResponse.
 * Use `create(PublishSubscriptionGroupDocumentTemplateResponseSchema)` to create a new message.
 */
export declare const PublishSubscriptionGroupDocumentTemplateResponseSchema: GenMessage<PublishSubscriptionGroupDocumentTemplateResponse>;
/**
 * RenderProfile identifies a durable, generic data-to-document contract. It is
 * selected by trusted application composition and is never an HTTP selector.
 *
 * @generated from enum domain.operation.v1.RenderProfile
 */
export declare enum RenderProfile {
    /**
     * @generated from enum value: RENDER_PROFILE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: RENDER_PROFILE_SUBSCRIPTION_GROUP_OUTCOME_MATRIX_SINGLE_PERIOD_11_V1 = 1;
     */
    SUBSCRIPTION_GROUP_OUTCOME_MATRIX_SINGLE_PERIOD_11_V1 = 1
}
/**
 * Describes the enum domain.operation.v1.RenderProfile.
 */
export declare const RenderProfileSchema: GenEnum<RenderProfile>;
/**
 * @generated from service domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService
 */
export declare const SubscriptionGroupDocumentTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.CreateSubscriptionGroupDocumentTemplate
     */
    createSubscriptionGroupDocumentTemplate: {
        methodKind: "unary";
        input: typeof CreateSubscriptionGroupDocumentTemplateRequestSchema;
        output: typeof CreateSubscriptionGroupDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.ReadSubscriptionGroupDocumentTemplate
     */
    readSubscriptionGroupDocumentTemplate: {
        methodKind: "unary";
        input: typeof ReadSubscriptionGroupDocumentTemplateRequestSchema;
        output: typeof ReadSubscriptionGroupDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.UpdateSubscriptionGroupDocumentTemplate
     */
    updateSubscriptionGroupDocumentTemplate: {
        methodKind: "unary";
        input: typeof UpdateSubscriptionGroupDocumentTemplateRequestSchema;
        output: typeof UpdateSubscriptionGroupDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.DeleteSubscriptionGroupDocumentTemplate
     */
    deleteSubscriptionGroupDocumentTemplate: {
        methodKind: "unary";
        input: typeof DeleteSubscriptionGroupDocumentTemplateRequestSchema;
        output: typeof DeleteSubscriptionGroupDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.ListSubscriptionGroupDocumentTemplates
     */
    listSubscriptionGroupDocumentTemplates: {
        methodKind: "unary";
        input: typeof ListSubscriptionGroupDocumentTemplatesRequestSchema;
        output: typeof ListSubscriptionGroupDocumentTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.PublishSubscriptionGroupDocumentTemplate
     */
    publishSubscriptionGroupDocumentTemplate: {
        methodKind: "unary";
        input: typeof PublishSubscriptionGroupDocumentTemplateRequestSchema;
        output: typeof PublishSubscriptionGroupDocumentTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.SubscriptionGroupDocumentTemplateDomainService.FindApplicableSubscriptionGroupDocumentTemplate
     */
    findApplicableSubscriptionGroupDocumentTemplate: {
        methodKind: "unary";
        input: typeof FindApplicableSubscriptionGroupDocumentTemplateRequestSchema;
        output: typeof FindApplicableSubscriptionGroupDocumentTemplateResponseSchema;
    };
}>;
