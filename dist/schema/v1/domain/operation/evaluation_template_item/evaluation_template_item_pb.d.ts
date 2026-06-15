import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/evaluation_template_item/evaluation_template_item.proto.
 */
export declare const file_domain_operation_evaluation_template_item_evaluation_template_item: GenFile;
/**
 * =============================================================================
 * Performance Evaluation §E3 — evaluation_template_item (child of
 * evaluation_template; CASCADE). One row per rubric dimension on a template.
 * =============================================================================
 *
 * @generated from message domain.operation.v1.EvaluationTemplateItem
 */
export type EvaluationTemplateItem = Message<"domain.operation.v1.EvaluationTemplateItem"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string evaluation_template_id = 2;
     */
    evaluationTemplateId: string;
    /**
     * COPIED from the parent template at create; adapter validates it equals the parent's.
     *
     * @generated from field: string workspace_id = 3;
     */
    workspaceId: string;
    /**
     * @generated from field: string outcome_criteria_id = 4;
     */
    outcomeCriteriaId: string;
    /**
     * @generated from field: int32 sequence_order = 5;
     */
    sequenceOrder: number;
    /**
     * @generated from field: optional string question_label = 6;
     */
    questionLabel?: string;
    /**
     * @generated from field: optional string question_prompt = 7;
     */
    questionPrompt?: string;
    /**
     * @generated from field: optional bool required_override = 8;
     */
    requiredOverride?: boolean;
    /**
     * @generated from field: optional double weight_override = 9;
     */
    weightOverride?: number;
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
};
/**
 * Describes the message domain.operation.v1.EvaluationTemplateItem.
 * Use `create(EvaluationTemplateItemSchema)` to create a new message.
 */
export declare const EvaluationTemplateItemSchema: GenMessage<EvaluationTemplateItem>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationTemplateItemRequest
 */
export type CreateEvaluationTemplateItemRequest = Message<"domain.operation.v1.CreateEvaluationTemplateItemRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data?: EvaluationTemplateItem;
};
/**
 * Describes the message domain.operation.v1.CreateEvaluationTemplateItemRequest.
 * Use `create(CreateEvaluationTemplateItemRequestSchema)` to create a new message.
 */
export declare const CreateEvaluationTemplateItemRequestSchema: GenMessage<CreateEvaluationTemplateItemRequest>;
/**
 * @generated from message domain.operation.v1.CreateEvaluationTemplateItemResponse
 */
export type CreateEvaluationTemplateItemResponse = Message<"domain.operation.v1.CreateEvaluationTemplateItemResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data: EvaluationTemplateItem[];
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
 * Describes the message domain.operation.v1.CreateEvaluationTemplateItemResponse.
 * Use `create(CreateEvaluationTemplateItemResponseSchema)` to create a new message.
 */
export declare const CreateEvaluationTemplateItemResponseSchema: GenMessage<CreateEvaluationTemplateItemResponse>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationTemplateItemRequest
 */
export type ReadEvaluationTemplateItemRequest = Message<"domain.operation.v1.ReadEvaluationTemplateItemRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data?: EvaluationTemplateItem;
};
/**
 * Describes the message domain.operation.v1.ReadEvaluationTemplateItemRequest.
 * Use `create(ReadEvaluationTemplateItemRequestSchema)` to create a new message.
 */
export declare const ReadEvaluationTemplateItemRequestSchema: GenMessage<ReadEvaluationTemplateItemRequest>;
/**
 * @generated from message domain.operation.v1.ReadEvaluationTemplateItemResponse
 */
export type ReadEvaluationTemplateItemResponse = Message<"domain.operation.v1.ReadEvaluationTemplateItemResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data: EvaluationTemplateItem[];
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
 * Describes the message domain.operation.v1.ReadEvaluationTemplateItemResponse.
 * Use `create(ReadEvaluationTemplateItemResponseSchema)` to create a new message.
 */
export declare const ReadEvaluationTemplateItemResponseSchema: GenMessage<ReadEvaluationTemplateItemResponse>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationTemplateItemRequest
 */
export type UpdateEvaluationTemplateItemRequest = Message<"domain.operation.v1.UpdateEvaluationTemplateItemRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data?: EvaluationTemplateItem;
};
/**
 * Describes the message domain.operation.v1.UpdateEvaluationTemplateItemRequest.
 * Use `create(UpdateEvaluationTemplateItemRequestSchema)` to create a new message.
 */
export declare const UpdateEvaluationTemplateItemRequestSchema: GenMessage<UpdateEvaluationTemplateItemRequest>;
/**
 * @generated from message domain.operation.v1.UpdateEvaluationTemplateItemResponse
 */
export type UpdateEvaluationTemplateItemResponse = Message<"domain.operation.v1.UpdateEvaluationTemplateItemResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data: EvaluationTemplateItem[];
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
 * Describes the message domain.operation.v1.UpdateEvaluationTemplateItemResponse.
 * Use `create(UpdateEvaluationTemplateItemResponseSchema)` to create a new message.
 */
export declare const UpdateEvaluationTemplateItemResponseSchema: GenMessage<UpdateEvaluationTemplateItemResponse>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationTemplateItemRequest
 */
export type DeleteEvaluationTemplateItemRequest = Message<"domain.operation.v1.DeleteEvaluationTemplateItemRequest"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data?: EvaluationTemplateItem;
};
/**
 * Describes the message domain.operation.v1.DeleteEvaluationTemplateItemRequest.
 * Use `create(DeleteEvaluationTemplateItemRequestSchema)` to create a new message.
 */
export declare const DeleteEvaluationTemplateItemRequestSchema: GenMessage<DeleteEvaluationTemplateItemRequest>;
/**
 * @generated from message domain.operation.v1.DeleteEvaluationTemplateItemResponse
 */
export type DeleteEvaluationTemplateItemResponse = Message<"domain.operation.v1.DeleteEvaluationTemplateItemResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteEvaluationTemplateItemResponse.
 * Use `create(DeleteEvaluationTemplateItemResponseSchema)` to create a new message.
 */
export declare const DeleteEvaluationTemplateItemResponseSchema: GenMessage<DeleteEvaluationTemplateItemResponse>;
/**
 * @generated from message domain.operation.v1.ListEvaluationTemplateItemsRequest
 */
export type ListEvaluationTemplateItemsRequest = Message<"domain.operation.v1.ListEvaluationTemplateItemsRequest"> & {
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
 * Describes the message domain.operation.v1.ListEvaluationTemplateItemsRequest.
 * Use `create(ListEvaluationTemplateItemsRequestSchema)` to create a new message.
 */
export declare const ListEvaluationTemplateItemsRequestSchema: GenMessage<ListEvaluationTemplateItemsRequest>;
/**
 * @generated from message domain.operation.v1.ListEvaluationTemplateItemsResponse
 */
export type ListEvaluationTemplateItemsResponse = Message<"domain.operation.v1.ListEvaluationTemplateItemsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplateItem data = 1;
     */
    data: EvaluationTemplateItem[];
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
 * Describes the message domain.operation.v1.ListEvaluationTemplateItemsResponse.
 * Use `create(ListEvaluationTemplateItemsResponseSchema)` to create a new message.
 */
export declare const ListEvaluationTemplateItemsResponseSchema: GenMessage<ListEvaluationTemplateItemsResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateItemListPageDataRequest
 */
export type GetEvaluationTemplateItemListPageDataRequest = Message<"domain.operation.v1.GetEvaluationTemplateItemListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetEvaluationTemplateItemListPageDataRequest.
 * Use `create(GetEvaluationTemplateItemListPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateItemListPageDataRequestSchema: GenMessage<GetEvaluationTemplateItemListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateItemListPageDataResponse
 */
export type GetEvaluationTemplateItemListPageDataResponse = Message<"domain.operation.v1.GetEvaluationTemplateItemListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.EvaluationTemplateItem evaluation_template_item_list = 1;
     */
    evaluationTemplateItemList: EvaluationTemplateItem[];
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
 * Describes the message domain.operation.v1.GetEvaluationTemplateItemListPageDataResponse.
 * Use `create(GetEvaluationTemplateItemListPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateItemListPageDataResponseSchema: GenMessage<GetEvaluationTemplateItemListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateItemItemPageDataRequest
 */
export type GetEvaluationTemplateItemItemPageDataRequest = Message<"domain.operation.v1.GetEvaluationTemplateItemItemPageDataRequest"> & {
    /**
     * @generated from field: string evaluation_template_item_id = 1;
     */
    evaluationTemplateItemId: string;
};
/**
 * Describes the message domain.operation.v1.GetEvaluationTemplateItemItemPageDataRequest.
 * Use `create(GetEvaluationTemplateItemItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateItemItemPageDataRequestSchema: GenMessage<GetEvaluationTemplateItemItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetEvaluationTemplateItemItemPageDataResponse
 */
export type GetEvaluationTemplateItemItemPageDataResponse = Message<"domain.operation.v1.GetEvaluationTemplateItemItemPageDataResponse"> & {
    /**
     * @generated from field: domain.operation.v1.EvaluationTemplateItem evaluation_template_item = 1;
     */
    evaluationTemplateItem?: EvaluationTemplateItem;
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
 * Describes the message domain.operation.v1.GetEvaluationTemplateItemItemPageDataResponse.
 * Use `create(GetEvaluationTemplateItemItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetEvaluationTemplateItemItemPageDataResponseSchema: GenMessage<GetEvaluationTemplateItemItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.EvaluationTemplateItemDomainService
 */
export declare const EvaluationTemplateItemDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.CreateEvaluationTemplateItem
     */
    createEvaluationTemplateItem: {
        methodKind: "unary";
        input: typeof CreateEvaluationTemplateItemRequestSchema;
        output: typeof CreateEvaluationTemplateItemResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.ReadEvaluationTemplateItem
     */
    readEvaluationTemplateItem: {
        methodKind: "unary";
        input: typeof ReadEvaluationTemplateItemRequestSchema;
        output: typeof ReadEvaluationTemplateItemResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.UpdateEvaluationTemplateItem
     */
    updateEvaluationTemplateItem: {
        methodKind: "unary";
        input: typeof UpdateEvaluationTemplateItemRequestSchema;
        output: typeof UpdateEvaluationTemplateItemResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.DeleteEvaluationTemplateItem
     */
    deleteEvaluationTemplateItem: {
        methodKind: "unary";
        input: typeof DeleteEvaluationTemplateItemRequestSchema;
        output: typeof DeleteEvaluationTemplateItemResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.ListEvaluationTemplateItems
     */
    listEvaluationTemplateItems: {
        methodKind: "unary";
        input: typeof ListEvaluationTemplateItemsRequestSchema;
        output: typeof ListEvaluationTemplateItemsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.GetEvaluationTemplateItemListPageData
     */
    getEvaluationTemplateItemListPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationTemplateItemListPageDataRequestSchema;
        output: typeof GetEvaluationTemplateItemListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.EvaluationTemplateItemDomainService.GetEvaluationTemplateItemItemPageData
     */
    getEvaluationTemplateItemItemPageData: {
        methodKind: "unary";
        input: typeof GetEvaluationTemplateItemItemPageDataRequestSchema;
        output: typeof GetEvaluationTemplateItemItemPageDataResponseSchema;
    };
}>;
