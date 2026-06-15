import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { EvaluationType, RelationshipType, VisibilityType } from "../evaluation/evaluation_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/evaluation_template/evaluation_template.proto.
 */
export declare const file_domain_operation_evaluation_template_evaluation_template: GenFile;
/**
 * @generated from message domain.operation.v1.EvaluationTemplate
 */
export type EvaluationTemplate = Message<"domain.operation.v1.EvaluationTemplate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: optional string description = 4;
     */
    description?: string;
    /**
     * proto ENUM (from evaluation.proto)
     *
     * @generated from field: domain.operation.v1.EvaluationType evaluation_type = 5;
     */
    evaluationType: EvaluationType;
    /**
     * proto ENUM (from evaluation.proto)
     *
     * @generated from field: domain.operation.v1.RelationshipType relationship_type = 6;
     */
    relationshipType: RelationshipType;
    /**
     * @generated from field: int32 version = 7;
     */
    version: number;
    /**
     * proto ENUM; single lifecycle source of truth
     *
     * @generated from field: domain.operation.v1.EvaluationTemplateStatus status = 8;
     */
    status: EvaluationTemplateStatus;
    /**
     * proto ENUM (from evaluation.proto)
     *
     * @generated from field: domain.operation.v1.VisibilityType visibility_type = 9;
     */
    visibilityType: VisibilityType;
    /**
     * self FK
     *
     * @generated from field: optional string copied_from_id = 10;
     */
    copiedFromId?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.EvaluationTemplate.
 * Use `create(EvaluationTemplateSchema)` to create a new message.
 */
export declare const EvaluationTemplateSchema: GenMessage<EvaluationTemplate>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationTemplateRequest
 */
export type CreateEvaluationTemplateRequest = Message<"domain.operation.v1.CreateEvaluationTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplate data = 1;
     */
    data?: EvaluationTemplate;
};
/**
 * Describes the message domain.operation.v1.CreateEvaluationTemplateRequest.
 * Use `create(CreateEvaluationTemplateRequestSchema)` to create a new message.
 */
export declare const CreateEvaluationTemplateRequestSchema: GenMessage<CreateEvaluationTemplateRequest>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationTemplateResponse
 */
export type CreateEvaluationTemplateResponse = Message<"domain.operation.v1.CreateEvaluationTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplate data = 1;
     */
    data: EvaluationTemplate[];
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
 * Describes the message domain.operation.v1.CreateEvaluationTemplateResponse.
 * Use `create(CreateEvaluationTemplateResponseSchema)` to create a new message.
 */
export declare const CreateEvaluationTemplateResponseSchema: GenMessage<CreateEvaluationTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationTemplateRequest
 */
export type ReadEvaluationTemplateRequest = Message<"domain.operation.v1.ReadEvaluationTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplate data = 1;
     */
    data?: EvaluationTemplate;
};
/**
 * Describes the message domain.operation.v1.ReadEvaluationTemplateRequest.
 * Use `create(ReadEvaluationTemplateRequestSchema)` to create a new message.
 */
export declare const ReadEvaluationTemplateRequestSchema: GenMessage<ReadEvaluationTemplateRequest>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationTemplateResponse
 */
export type ReadEvaluationTemplateResponse = Message<"domain.operation.v1.ReadEvaluationTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplate data = 1;
     */
    data: EvaluationTemplate[];
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
 * Describes the message domain.operation.v1.ReadEvaluationTemplateResponse.
 * Use `create(ReadEvaluationTemplateResponseSchema)` to create a new message.
 */
export declare const ReadEvaluationTemplateResponseSchema: GenMessage<ReadEvaluationTemplateResponse>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationTemplateRequest
 */
export type UpdateEvaluationTemplateRequest = Message<"domain.operation.v1.UpdateEvaluationTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplate data = 1;
     */
    data?: EvaluationTemplate;
};
/**
 * Describes the message domain.operation.v1.UpdateEvaluationTemplateRequest.
 * Use `create(UpdateEvaluationTemplateRequestSchema)` to create a new message.
 */
export declare const UpdateEvaluationTemplateRequestSchema: GenMessage<UpdateEvaluationTemplateRequest>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationTemplateResponse
 */
export type UpdateEvaluationTemplateResponse = Message<"domain.operation.v1.UpdateEvaluationTemplateResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplate data = 1;
     */
    data: EvaluationTemplate[];
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
 * Describes the message domain.operation.v1.UpdateEvaluationTemplateResponse.
 * Use `create(UpdateEvaluationTemplateResponseSchema)` to create a new message.
 */
export declare const UpdateEvaluationTemplateResponseSchema: GenMessage<UpdateEvaluationTemplateResponse>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationTemplateRequest
 */
export type DeleteEvaluationTemplateRequest = Message<"domain.operation.v1.DeleteEvaluationTemplateRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplate data = 1;
     */
    data?: EvaluationTemplate;
};
/**
 * Describes the message domain.operation.v1.DeleteEvaluationTemplateRequest.
 * Use `create(DeleteEvaluationTemplateRequestSchema)` to create a new message.
 */
export declare const DeleteEvaluationTemplateRequestSchema: GenMessage<DeleteEvaluationTemplateRequest>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationTemplateResponse
 */
export type DeleteEvaluationTemplateResponse = Message<"domain.operation.v1.DeleteEvaluationTemplateResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteEvaluationTemplateResponse.
 * Use `create(DeleteEvaluationTemplateResponseSchema)` to create a new message.
 */
export declare const DeleteEvaluationTemplateResponseSchema: GenMessage<DeleteEvaluationTemplateResponse>;
/**
 * @generated from message domain.operation.v1.ListEvaluationTemplatesRequest
 */
export type ListEvaluationTemplatesRequest = Message<"domain.operation.v1.ListEvaluationTemplatesRequest"> & {
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
 * Describes the message domain.operation.v1.ListEvaluationTemplatesRequest.
 * Use `create(ListEvaluationTemplatesRequestSchema)` to create a new message.
 */
export declare const ListEvaluationTemplatesRequestSchema: GenMessage<ListEvaluationTemplatesRequest>;
/**
 * @generated from message domain.operation.v1.ListEvaluationTemplatesResponse
 */
export type ListEvaluationTemplatesResponse = Message<"domain.operation.v1.ListEvaluationTemplatesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplate data = 1;
     */
    data: EvaluationTemplate[];
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
 * Describes the message domain.operation.v1.ListEvaluationTemplatesResponse.
 * Use `create(ListEvaluationTemplatesResponseSchema)` to create a new message.
 */
export declare const ListEvaluationTemplatesResponseSchema: GenMessage<ListEvaluationTemplatesResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateListPageDataRequest
 */
export type GetEvaluationTemplateListPageDataRequest = Message<"domain.operation.v1.GetEvaluationTemplateListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetEvaluationTemplateListPageDataRequest.
 * Use `create(GetEvaluationTemplateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateListPageDataRequestSchema: GenMessage<GetEvaluationTemplateListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateListPageDataResponse
 */
export type GetEvaluationTemplateListPageDataResponse = Message<"domain.operation.v1.GetEvaluationTemplateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplate evaluation_template_list = 1;
     */
    evaluationTemplateList: EvaluationTemplate[];
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
 * Describes the message domain.operation.v1.GetEvaluationTemplateListPageDataResponse.
 * Use `create(GetEvaluationTemplateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateListPageDataResponseSchema: GenMessage<GetEvaluationTemplateListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateItemPageDataRequest
 */
export type GetEvaluationTemplateItemPageDataRequest = Message<"domain.operation.v1.GetEvaluationTemplateItemPageDataRequest"> & {
    /**
     * @generated from field: string evaluation_template_id = 1;
     */
    evaluationTemplateId: string;
};
/**
 * Describes the message domain.operation.v1.GetEvaluationTemplateItemPageDataRequest.
 * Use `create(GetEvaluationTemplateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateItemPageDataRequestSchema: GenMessage<GetEvaluationTemplateItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateItemPageDataResponse
 */
export type GetEvaluationTemplateItemPageDataResponse = Message<"domain.operation.v1.GetEvaluationTemplateItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplate evaluation_template = 1;
     */
    evaluationTemplate?: EvaluationTemplate;
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
 * Describes the message domain.operation.v1.GetEvaluationTemplateItemPageDataResponse.
 * Use `create(GetEvaluationTemplateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateItemPageDataResponseSchema: GenMessage<GetEvaluationTemplateItemPageDataResponse>;
/**
 * EvaluationTemplateStatus — new-entity enum convention (matches the job_template
 * VersionStatus precedent). active = (status NOT IN {DEPRECATED}); the picker
 * filters status = ACTIVE. DB CHECK-pinned.
 *
 * @generated from enum domain.operation.v1.EvaluationTemplateStatus
 */
export declare enum EvaluationTemplateStatus {
    /**
     * @generated from enum value: EVALUATION_TEMPLATE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * authoring, not yet pickable
     *
     * @generated from enum value: EVALUATION_TEMPLATE_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * pickable
     *
     * @generated from enum value: EVALUATION_TEMPLATE_STATUS_ACTIVE = 2;
     */
    ACTIVE = 2,
    /**
     * no longer pickable; existing DRAFTs still submittable
     *
     * @generated from enum value: EVALUATION_TEMPLATE_STATUS_DEPRECATED = 3;
     */
    DEPRECATED = 3
}
/**
 * Describes the enum domain.operation.v1.EvaluationTemplateStatus.
 */
export declare const EvaluationTemplateStatusSchema: GenEnum<EvaluationTemplateStatus>;
/**
 * @generated from service domain.operation.v1.EvaluationTemplateDomainService
 */
export declare const EvaluationTemplateDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.CreateEvaluationTemplate
     */
    createEvaluationTemplate: {
        methodKind: "unary";
        input: typeof CreateEvaluationTemplateRequestSchema;
        output: typeof CreateEvaluationTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.ReadEvaluationTemplate
     */
    readEvaluationTemplate: {
        methodKind: "unary";
        input: typeof ReadEvaluationTemplateRequestSchema;
        output: typeof ReadEvaluationTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.UpdateEvaluationTemplate
     */
    updateEvaluationTemplate: {
        methodKind: "unary";
        input: typeof UpdateEvaluationTemplateRequestSchema;
        output: typeof UpdateEvaluationTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.DeleteEvaluationTemplate
     */
    deleteEvaluationTemplate: {
        methodKind: "unary";
        input: typeof DeleteEvaluationTemplateRequestSchema;
        output: typeof DeleteEvaluationTemplateResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.ListEvaluationTemplates
     */
    listEvaluationTemplates: {
        methodKind: "unary";
        input: typeof ListEvaluationTemplatesRequestSchema;
        output: typeof ListEvaluationTemplatesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.GetEvaluationTemplateListPageData
     */
    getEvaluationTemplateListPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationTemplateListPageDataRequestSchema;
        output: typeof GetEvaluationTemplateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateDomainService.GetEvaluationTemplateItemPageData
     */
    getEvaluationTemplateItemPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationTemplateItemPageDataRequestSchema;
        output: typeof GetEvaluationTemplateItemPageDataResponseSchema;
    };
}>;
