import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/scoring_component/scoring_component.proto.
 */
export declare const file_domain_operation_scoring_component_scoring_component: GenFile;
/**
 * @generated from message domain.operation.v1.ScoringComponent
 */
export type ScoringComponent = Message<"domain.operation.v1.ScoringComponent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string scoring_scheme_id = 2;
     */
    scoringSchemeId: string;
    /**
     * @generated from field: string code = 3;
     */
    code: string;
    /**
     * @generated from field: string label = 4;
     */
    label: string;
    /**
     * @generated from field: double weight = 5;
     */
    weight: number;
    /**
     * @generated from field: int32 sequence_order = 6;
     */
    sequenceOrder: number;
    /**
     * @generated from field: optional string parent_component_id = 7;
     */
    parentComponentId?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 9;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 10;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 11;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 12;
     */
    dateModifiedString?: string;
    /**
     * Immutable tenant anchor inherited from ScoringScheme.
     *
     * @generated from field: optional string workspace_id = 13;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.ScoringComponent.
 * Use `create(ScoringComponentSchema)` to create a new message.
 */
export declare const ScoringComponentSchema: GenMessage<ScoringComponent>;
/**
 * @generated from message domain.operation.v1.CreateScoringComponentRequest
 */
export type CreateScoringComponentRequest = Message<"domain.operation.v1.CreateScoringComponentRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponent data = 1;
     */
    data?: ScoringComponent;
};
/**
 * Describes the message domain.operation.v1.CreateScoringComponentRequest.
 * Use `create(CreateScoringComponentRequestSchema)` to create a new message.
 */
export declare const CreateScoringComponentRequestSchema: GenMessage<CreateScoringComponentRequest>;
/**
 * @generated from message domain.operation.v1.CreateScoringComponentResponse
 */
export type CreateScoringComponentResponse = Message<"domain.operation.v1.CreateScoringComponentResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponent data = 1;
     */
    data: ScoringComponent[];
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
 * Describes the message domain.operation.v1.CreateScoringComponentResponse.
 * Use `create(CreateScoringComponentResponseSchema)` to create a new message.
 */
export declare const CreateScoringComponentResponseSchema: GenMessage<CreateScoringComponentResponse>;
/**
 * @generated from message domain.operation.v1.ReadScoringComponentRequest
 */
export type ReadScoringComponentRequest = Message<"domain.operation.v1.ReadScoringComponentRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponent data = 1;
     */
    data?: ScoringComponent;
};
/**
 * Describes the message domain.operation.v1.ReadScoringComponentRequest.
 * Use `create(ReadScoringComponentRequestSchema)` to create a new message.
 */
export declare const ReadScoringComponentRequestSchema: GenMessage<ReadScoringComponentRequest>;
/**
 * @generated from message domain.operation.v1.ReadScoringComponentResponse
 */
export type ReadScoringComponentResponse = Message<"domain.operation.v1.ReadScoringComponentResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponent data = 1;
     */
    data: ScoringComponent[];
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
 * Describes the message domain.operation.v1.ReadScoringComponentResponse.
 * Use `create(ReadScoringComponentResponseSchema)` to create a new message.
 */
export declare const ReadScoringComponentResponseSchema: GenMessage<ReadScoringComponentResponse>;
/**
 * @generated from message domain.operation.v1.UpdateScoringComponentRequest
 */
export type UpdateScoringComponentRequest = Message<"domain.operation.v1.UpdateScoringComponentRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponent data = 1;
     */
    data?: ScoringComponent;
};
/**
 * Describes the message domain.operation.v1.UpdateScoringComponentRequest.
 * Use `create(UpdateScoringComponentRequestSchema)` to create a new message.
 */
export declare const UpdateScoringComponentRequestSchema: GenMessage<UpdateScoringComponentRequest>;
/**
 * @generated from message domain.operation.v1.UpdateScoringComponentResponse
 */
export type UpdateScoringComponentResponse = Message<"domain.operation.v1.UpdateScoringComponentResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponent data = 1;
     */
    data: ScoringComponent[];
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
 * Describes the message domain.operation.v1.UpdateScoringComponentResponse.
 * Use `create(UpdateScoringComponentResponseSchema)` to create a new message.
 */
export declare const UpdateScoringComponentResponseSchema: GenMessage<UpdateScoringComponentResponse>;
/**
 * @generated from message domain.operation.v1.DeleteScoringComponentRequest
 */
export type DeleteScoringComponentRequest = Message<"domain.operation.v1.DeleteScoringComponentRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ScoringComponent data = 1;
     */
    data?: ScoringComponent;
};
/**
 * Describes the message domain.operation.v1.DeleteScoringComponentRequest.
 * Use `create(DeleteScoringComponentRequestSchema)` to create a new message.
 */
export declare const DeleteScoringComponentRequestSchema: GenMessage<DeleteScoringComponentRequest>;
/**
 * @generated from message domain.operation.v1.DeleteScoringComponentResponse
 */
export type DeleteScoringComponentResponse = Message<"domain.operation.v1.DeleteScoringComponentResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteScoringComponentResponse.
 * Use `create(DeleteScoringComponentResponseSchema)` to create a new message.
 */
export declare const DeleteScoringComponentResponseSchema: GenMessage<DeleteScoringComponentResponse>;
/**
 * @generated from message domain.operation.v1.ListScoringComponentsRequest
 */
export type ListScoringComponentsRequest = Message<"domain.operation.v1.ListScoringComponentsRequest"> & {
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
 * Describes the message domain.operation.v1.ListScoringComponentsRequest.
 * Use `create(ListScoringComponentsRequestSchema)` to create a new message.
 */
export declare const ListScoringComponentsRequestSchema: GenMessage<ListScoringComponentsRequest>;
/**
 * @generated from message domain.operation.v1.ListScoringComponentsResponse
 */
export type ListScoringComponentsResponse = Message<"domain.operation.v1.ListScoringComponentsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponent data = 1;
     */
    data: ScoringComponent[];
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
 * Describes the message domain.operation.v1.ListScoringComponentsResponse.
 * Use `create(ListScoringComponentsResponseSchema)` to create a new message.
 */
export declare const ListScoringComponentsResponseSchema: GenMessage<ListScoringComponentsResponse>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentListPageDataRequest
 */
export type GetScoringComponentListPageDataRequest = Message<"domain.operation.v1.GetScoringComponentListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetScoringComponentListPageDataRequest.
 * Use `create(GetScoringComponentListPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoringComponentListPageDataRequestSchema: GenMessage<GetScoringComponentListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentListPageDataResponse
 */
export type GetScoringComponentListPageDataResponse = Message<"domain.operation.v1.GetScoringComponentListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ScoringComponent scoring_component_list = 1;
     */
    scoringComponentList: ScoringComponent[];
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
 * Describes the message domain.operation.v1.GetScoringComponentListPageDataResponse.
 * Use `create(GetScoringComponentListPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoringComponentListPageDataResponseSchema: GenMessage<GetScoringComponentListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentItemPageDataRequest
 */
export type GetScoringComponentItemPageDataRequest = Message<"domain.operation.v1.GetScoringComponentItemPageDataRequest"> & {
    /**
     * @generated from field: string scoring_component_id = 1;
     */
    scoringComponentId: string;
};
/**
 * Describes the message domain.operation.v1.GetScoringComponentItemPageDataRequest.
 * Use `create(GetScoringComponentItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetScoringComponentItemPageDataRequestSchema: GenMessage<GetScoringComponentItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetScoringComponentItemPageDataResponse
 */
export type GetScoringComponentItemPageDataResponse = Message<"domain.operation.v1.GetScoringComponentItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ScoringComponent scoring_component = 1;
     */
    scoringComponent?: ScoringComponent;
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
 * Describes the message domain.operation.v1.GetScoringComponentItemPageDataResponse.
 * Use `create(GetScoringComponentItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetScoringComponentItemPageDataResponseSchema: GenMessage<GetScoringComponentItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ScoringComponentDomainService
 */
export declare const ScoringComponentDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.CreateScoringComponent
     */
    createScoringComponent: {
        methodKind: "unary";
        input: typeof CreateScoringComponentRequestSchema;
        output: typeof CreateScoringComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.ReadScoringComponent
     */
    readScoringComponent: {
        methodKind: "unary";
        input: typeof ReadScoringComponentRequestSchema;
        output: typeof ReadScoringComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.UpdateScoringComponent
     */
    updateScoringComponent: {
        methodKind: "unary";
        input: typeof UpdateScoringComponentRequestSchema;
        output: typeof UpdateScoringComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.DeleteScoringComponent
     */
    deleteScoringComponent: {
        methodKind: "unary";
        input: typeof DeleteScoringComponentRequestSchema;
        output: typeof DeleteScoringComponentResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.ListScoringComponents
     */
    listScoringComponents: {
        methodKind: "unary";
        input: typeof ListScoringComponentsRequestSchema;
        output: typeof ListScoringComponentsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.GetScoringComponentListPageData
     */
    getScoringComponentListPageData: {
        methodKind: "unary";
        input: typeof GetScoringComponentListPageDataRequestSchema;
        output: typeof GetScoringComponentListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ScoringComponentDomainService.GetScoringComponentItemPageData
     */
    getScoringComponentItemPageData: {
        methodKind: "unary";
        input: typeof GetScoringComponentItemPageDataRequestSchema;
        output: typeof GetScoringComponentItemPageDataResponseSchema;
    };
}>;
