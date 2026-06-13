import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/work_request_type/work_request_type.proto.
 */
export declare const file_domain_operation_work_request_type_work_request_type: GenFile;
/**
 * @generated from message domain.operation.v1.WorkRequestType
 */
export type WorkRequestType = Message<"domain.operation.v1.WorkRequestType"> & {
    /**
     * Identity
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Stable key (UNIQUE per workspace)
     *
     * @generated from field: string code = 3;
     */
    code: string;
    /**
     * Display (lyngua keys)
     *
     * @generated from field: string label_key = 4;
     */
    labelKey: string;
    /**
     * @generated from field: string description_key = 5;
     */
    descriptionKey: string;
    /**
     * Category (controls requires_resource)
     *
     * @generated from field: domain.operation.v1.WorkRequestTypeCategory category = 6;
     */
    category: WorkRequestTypeCategory;
    /**
     * type names a roster seat -> subscription_seat_id required
     *
     * @generated from field: bool requires_resource = 7;
     */
    requiresResource: boolean;
    /**
     * Routing template
     *
     * @generated from field: optional string default_workflow_template_id = 8;
     */
    defaultWorkflowTemplateId?: string;
    /**
     * SLA
     *
     * snapshotted onto each request at submit
     *
     * @generated from field: int64 default_sla_hours = 9;
     */
    defaultSlaHours: bigint;
    /**
     * Presentation
     *
     * @generated from field: int32 sort_order = 10;
     */
    sortOrder: number;
    /**
     * pyeza icon name for the picker card
     *
     * @generated from field: string icon_key = 11;
     */
    iconKey: string;
    /**
     * Lifecycle
     *
     * @generated from field: domain.operation.v1.WorkRequestTypeStatus status = 12;
     */
    status: WorkRequestTypeStatus;
    /**
     * DB-coupled: active = (status = ACTIVE)
     *
     * @generated from field: bool active = 13;
     */
    active: boolean;
    /**
     * Standard timestamps
     *
     * @generated from field: optional int64 date_created = 100;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 101;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 102;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 103;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.operation.v1.WorkRequestType.
 * Use `create(WorkRequestTypeSchema)` to create a new message.
 */
export declare const WorkRequestTypeSchema: GenMessage<WorkRequestType>;
/**
 * @generated from message domain.operation.v1.CreateWorkRequestTypeRequest
 */
export type CreateWorkRequestTypeRequest = Message<"domain.operation.v1.CreateWorkRequestTypeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequestType data = 1;
     */
    data?: WorkRequestType;
};
/**
 * Describes the message domain.operation.v1.CreateWorkRequestTypeRequest.
 * Use `create(CreateWorkRequestTypeRequestSchema)` to create a new message.
 */
export declare const CreateWorkRequestTypeRequestSchema: GenMessage<CreateWorkRequestTypeRequest>;
/**
 * @generated from message domain.operation.v1.CreateWorkRequestTypeResponse
 */
export type CreateWorkRequestTypeResponse = Message<"domain.operation.v1.CreateWorkRequestTypeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequestType data = 1;
     */
    data: WorkRequestType[];
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
 * Describes the message domain.operation.v1.CreateWorkRequestTypeResponse.
 * Use `create(CreateWorkRequestTypeResponseSchema)` to create a new message.
 */
export declare const CreateWorkRequestTypeResponseSchema: GenMessage<CreateWorkRequestTypeResponse>;
/**
 * @generated from message domain.operation.v1.ReadWorkRequestTypeRequest
 */
export type ReadWorkRequestTypeRequest = Message<"domain.operation.v1.ReadWorkRequestTypeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequestType data = 1;
     */
    data?: WorkRequestType;
};
/**
 * Describes the message domain.operation.v1.ReadWorkRequestTypeRequest.
 * Use `create(ReadWorkRequestTypeRequestSchema)` to create a new message.
 */
export declare const ReadWorkRequestTypeRequestSchema: GenMessage<ReadWorkRequestTypeRequest>;
/**
 * @generated from message domain.operation.v1.ReadWorkRequestTypeResponse
 */
export type ReadWorkRequestTypeResponse = Message<"domain.operation.v1.ReadWorkRequestTypeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequestType data = 1;
     */
    data: WorkRequestType[];
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
 * Describes the message domain.operation.v1.ReadWorkRequestTypeResponse.
 * Use `create(ReadWorkRequestTypeResponseSchema)` to create a new message.
 */
export declare const ReadWorkRequestTypeResponseSchema: GenMessage<ReadWorkRequestTypeResponse>;
/**
 * @generated from message domain.operation.v1.UpdateWorkRequestTypeRequest
 */
export type UpdateWorkRequestTypeRequest = Message<"domain.operation.v1.UpdateWorkRequestTypeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequestType data = 1;
     */
    data?: WorkRequestType;
};
/**
 * Describes the message domain.operation.v1.UpdateWorkRequestTypeRequest.
 * Use `create(UpdateWorkRequestTypeRequestSchema)` to create a new message.
 */
export declare const UpdateWorkRequestTypeRequestSchema: GenMessage<UpdateWorkRequestTypeRequest>;
/**
 * @generated from message domain.operation.v1.UpdateWorkRequestTypeResponse
 */
export type UpdateWorkRequestTypeResponse = Message<"domain.operation.v1.UpdateWorkRequestTypeResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequestType data = 1;
     */
    data: WorkRequestType[];
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
 * Describes the message domain.operation.v1.UpdateWorkRequestTypeResponse.
 * Use `create(UpdateWorkRequestTypeResponseSchema)` to create a new message.
 */
export declare const UpdateWorkRequestTypeResponseSchema: GenMessage<UpdateWorkRequestTypeResponse>;
/**
 * @generated from message domain.operation.v1.DeleteWorkRequestTypeRequest
 */
export type DeleteWorkRequestTypeRequest = Message<"domain.operation.v1.DeleteWorkRequestTypeRequest"> & {
    /**
     * @generated from field: domain.operation.v1.WorkRequestType data = 1;
     */
    data?: WorkRequestType;
};
/**
 * Describes the message domain.operation.v1.DeleteWorkRequestTypeRequest.
 * Use `create(DeleteWorkRequestTypeRequestSchema)` to create a new message.
 */
export declare const DeleteWorkRequestTypeRequestSchema: GenMessage<DeleteWorkRequestTypeRequest>;
/**
 * @generated from message domain.operation.v1.DeleteWorkRequestTypeResponse
 */
export type DeleteWorkRequestTypeResponse = Message<"domain.operation.v1.DeleteWorkRequestTypeResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteWorkRequestTypeResponse.
 * Use `create(DeleteWorkRequestTypeResponseSchema)` to create a new message.
 */
export declare const DeleteWorkRequestTypeResponseSchema: GenMessage<DeleteWorkRequestTypeResponse>;
/**
 * @generated from message domain.operation.v1.ListWorkRequestTypesRequest
 */
export type ListWorkRequestTypesRequest = Message<"domain.operation.v1.ListWorkRequestTypesRequest"> & {
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
 * Describes the message domain.operation.v1.ListWorkRequestTypesRequest.
 * Use `create(ListWorkRequestTypesRequestSchema)` to create a new message.
 */
export declare const ListWorkRequestTypesRequestSchema: GenMessage<ListWorkRequestTypesRequest>;
/**
 * @generated from message domain.operation.v1.ListWorkRequestTypesResponse
 */
export type ListWorkRequestTypesResponse = Message<"domain.operation.v1.ListWorkRequestTypesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequestType data = 1;
     */
    data: WorkRequestType[];
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
 * Describes the message domain.operation.v1.ListWorkRequestTypesResponse.
 * Use `create(ListWorkRequestTypesResponseSchema)` to create a new message.
 */
export declare const ListWorkRequestTypesResponseSchema: GenMessage<ListWorkRequestTypesResponse>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestTypeListPageDataRequest
 */
export type GetWorkRequestTypeListPageDataRequest = Message<"domain.operation.v1.GetWorkRequestTypeListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetWorkRequestTypeListPageDataRequest.
 * Use `create(GetWorkRequestTypeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkRequestTypeListPageDataRequestSchema: GenMessage<GetWorkRequestTypeListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestTypeListPageDataResponse
 */
export type GetWorkRequestTypeListPageDataResponse = Message<"domain.operation.v1.GetWorkRequestTypeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.WorkRequestType work_request_type_list = 1;
     */
    workRequestTypeList: WorkRequestType[];
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
 * Describes the message domain.operation.v1.GetWorkRequestTypeListPageDataResponse.
 * Use `create(GetWorkRequestTypeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkRequestTypeListPageDataResponseSchema: GenMessage<GetWorkRequestTypeListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestTypeItemPageDataRequest
 */
export type GetWorkRequestTypeItemPageDataRequest = Message<"domain.operation.v1.GetWorkRequestTypeItemPageDataRequest"> & {
    /**
     * @generated from field: string work_request_type_id = 1;
     */
    workRequestTypeId: string;
};
/**
 * Describes the message domain.operation.v1.GetWorkRequestTypeItemPageDataRequest.
 * Use `create(GetWorkRequestTypeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetWorkRequestTypeItemPageDataRequestSchema: GenMessage<GetWorkRequestTypeItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetWorkRequestTypeItemPageDataResponse
 */
export type GetWorkRequestTypeItemPageDataResponse = Message<"domain.operation.v1.GetWorkRequestTypeItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.WorkRequestType work_request_type = 1;
     */
    workRequestType?: WorkRequestType;
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
 * Describes the message domain.operation.v1.GetWorkRequestTypeItemPageDataResponse.
 * Use `create(GetWorkRequestTypeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetWorkRequestTypeItemPageDataResponseSchema: GenMessage<GetWorkRequestTypeItemPageDataResponse>;
/**
 * WorkRequestTypeCategory -- category (PERSON vs ACCOUNT scoped).
 * This is a category, NOT a _type-suffixed discriminator (RT-6 / codex-MED-1).
 *
 * @generated from enum domain.operation.v1.WorkRequestTypeCategory
 */
export declare enum WorkRequestTypeCategory {
    /**
     * @generated from enum value: WORK_REQUEST_TYPE_CATEGORY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * salary/bonus/hours/offboarding -> requires subscription_seat_id
     *
     * @generated from enum value: WORK_REQUEST_TYPE_CATEGORY_PERSON_SCOPED = 1;
     */
    PERSON_SCOPED = 1,
    /**
     * new headcount / new project / internal policy -> no resource
     *
     * @generated from enum value: WORK_REQUEST_TYPE_CATEGORY_ACCOUNT_SCOPED = 2;
     */
    ACCOUNT_SCOPED = 2
}
/**
 * Describes the enum domain.operation.v1.WorkRequestTypeCategory.
 */
export declare const WorkRequestTypeCategorySchema: GenEnum<WorkRequestTypeCategory>;
/**
 * WorkRequestTypeStatus -- lifecycle for the catalog entity.
 *
 * @generated from enum domain.operation.v1.WorkRequestTypeStatus
 */
export declare enum WorkRequestTypeStatus {
    /**
     * @generated from enum value: WORK_REQUEST_TYPE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: WORK_REQUEST_TYPE_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * @generated from enum value: WORK_REQUEST_TYPE_STATUS_ARCHIVED = 2;
     */
    ARCHIVED = 2
}
/**
 * Describes the enum domain.operation.v1.WorkRequestTypeStatus.
 */
export declare const WorkRequestTypeStatusSchema: GenEnum<WorkRequestTypeStatus>;
/**
 * @generated from service domain.operation.v1.WorkRequestTypeDomainService
 */
export declare const WorkRequestTypeDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.CreateWorkRequestType
     */
    createWorkRequestType: {
        methodKind: "unary";
        input: typeof CreateWorkRequestTypeRequestSchema;
        output: typeof CreateWorkRequestTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.ReadWorkRequestType
     */
    readWorkRequestType: {
        methodKind: "unary";
        input: typeof ReadWorkRequestTypeRequestSchema;
        output: typeof ReadWorkRequestTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.UpdateWorkRequestType
     */
    updateWorkRequestType: {
        methodKind: "unary";
        input: typeof UpdateWorkRequestTypeRequestSchema;
        output: typeof UpdateWorkRequestTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.DeleteWorkRequestType
     */
    deleteWorkRequestType: {
        methodKind: "unary";
        input: typeof DeleteWorkRequestTypeRequestSchema;
        output: typeof DeleteWorkRequestTypeResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.ListWorkRequestTypes
     */
    listWorkRequestTypes: {
        methodKind: "unary";
        input: typeof ListWorkRequestTypesRequestSchema;
        output: typeof ListWorkRequestTypesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.GetWorkRequestTypeListPageData
     */
    getWorkRequestTypeListPageData: {
        methodKind: "unary";
        input: typeof GetWorkRequestTypeListPageDataRequestSchema;
        output: typeof GetWorkRequestTypeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.WorkRequestTypeDomainService.GetWorkRequestTypeItemPageData
     */
    getWorkRequestTypeItemPageData: {
        methodKind: "unary";
        input: typeof GetWorkRequestTypeItemPageDataRequestSchema;
        output: typeof GetWorkRequestTypeItemPageDataResponseSchema;
    };
}>;
