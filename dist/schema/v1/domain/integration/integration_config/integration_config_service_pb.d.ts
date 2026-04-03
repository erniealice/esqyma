import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { IntegrationConfig } from "./integration_config_pb";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/integration/integration_config/integration_config_service.proto.
 */
export declare const file_domain_integration_integration_config_integration_config_service: GenFile;
/**
 * Standard CRUD messages
 *
 * @generated from message domain.integration.v1.CreateIntegrationConfigRequest
 */
export type CreateIntegrationConfigRequest = Message<"domain.integration.v1.CreateIntegrationConfigRequest"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig data = 1;
     */
    data?: IntegrationConfig;
};
/**
 * Describes the message domain.integration.v1.CreateIntegrationConfigRequest.
 * Use `create(CreateIntegrationConfigRequestSchema)` to create a new message.
 */
export declare const CreateIntegrationConfigRequestSchema: GenMessage<CreateIntegrationConfigRequest>;
/**
 * @generated from message domain.integration.v1.CreateIntegrationConfigResponse
 */
export type CreateIntegrationConfigResponse = Message<"domain.integration.v1.CreateIntegrationConfigResponse"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig data = 1;
     */
    data?: IntegrationConfig;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.CreateIntegrationConfigResponse.
 * Use `create(CreateIntegrationConfigResponseSchema)` to create a new message.
 */
export declare const CreateIntegrationConfigResponseSchema: GenMessage<CreateIntegrationConfigResponse>;
/**
 * @generated from message domain.integration.v1.GetIntegrationConfigRequest
 */
export type GetIntegrationConfigRequest = Message<"domain.integration.v1.GetIntegrationConfigRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.integration.v1.GetIntegrationConfigRequest.
 * Use `create(GetIntegrationConfigRequestSchema)` to create a new message.
 */
export declare const GetIntegrationConfigRequestSchema: GenMessage<GetIntegrationConfigRequest>;
/**
 * @generated from message domain.integration.v1.GetIntegrationConfigResponse
 */
export type GetIntegrationConfigResponse = Message<"domain.integration.v1.GetIntegrationConfigResponse"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig data = 1;
     */
    data?: IntegrationConfig;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.GetIntegrationConfigResponse.
 * Use `create(GetIntegrationConfigResponseSchema)` to create a new message.
 */
export declare const GetIntegrationConfigResponseSchema: GenMessage<GetIntegrationConfigResponse>;
/**
 * @generated from message domain.integration.v1.UpdateIntegrationConfigRequest
 */
export type UpdateIntegrationConfigRequest = Message<"domain.integration.v1.UpdateIntegrationConfigRequest"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig data = 1;
     */
    data?: IntegrationConfig;
};
/**
 * Describes the message domain.integration.v1.UpdateIntegrationConfigRequest.
 * Use `create(UpdateIntegrationConfigRequestSchema)` to create a new message.
 */
export declare const UpdateIntegrationConfigRequestSchema: GenMessage<UpdateIntegrationConfigRequest>;
/**
 * @generated from message domain.integration.v1.UpdateIntegrationConfigResponse
 */
export type UpdateIntegrationConfigResponse = Message<"domain.integration.v1.UpdateIntegrationConfigResponse"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig data = 1;
     */
    data?: IntegrationConfig;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.UpdateIntegrationConfigResponse.
 * Use `create(UpdateIntegrationConfigResponseSchema)` to create a new message.
 */
export declare const UpdateIntegrationConfigResponseSchema: GenMessage<UpdateIntegrationConfigResponse>;
/**
 * @generated from message domain.integration.v1.DeleteIntegrationConfigRequest
 */
export type DeleteIntegrationConfigRequest = Message<"domain.integration.v1.DeleteIntegrationConfigRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.integration.v1.DeleteIntegrationConfigRequest.
 * Use `create(DeleteIntegrationConfigRequestSchema)` to create a new message.
 */
export declare const DeleteIntegrationConfigRequestSchema: GenMessage<DeleteIntegrationConfigRequest>;
/**
 * @generated from message domain.integration.v1.DeleteIntegrationConfigResponse
 */
export type DeleteIntegrationConfigResponse = Message<"domain.integration.v1.DeleteIntegrationConfigResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.DeleteIntegrationConfigResponse.
 * Use `create(DeleteIntegrationConfigResponseSchema)` to create a new message.
 */
export declare const DeleteIntegrationConfigResponseSchema: GenMessage<DeleteIntegrationConfigResponse>;
/**
 * List with filters
 *
 * @generated from message domain.integration.v1.ListIntegrationConfigsRequest
 */
export type ListIntegrationConfigsRequest = Message<"domain.integration.v1.ListIntegrationConfigsRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filter = 2;
     */
    filter?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.integration.v1.ListIntegrationConfigsRequest.
 * Use `create(ListIntegrationConfigsRequestSchema)` to create a new message.
 */
export declare const ListIntegrationConfigsRequestSchema: GenMessage<ListIntegrationConfigsRequest>;
/**
 * @generated from message domain.integration.v1.ListIntegrationConfigsResponse
 */
export type ListIntegrationConfigsResponse = Message<"domain.integration.v1.ListIntegrationConfigsResponse"> & {
    /**
     * @generated from field: repeated domain.integration.v1.IntegrationConfig data = 1;
     */
    data: IntegrationConfig[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.ListIntegrationConfigsResponse.
 * Use `create(ListIntegrationConfigsResponseSchema)` to create a new message.
 */
export declare const ListIntegrationConfigsResponseSchema: GenMessage<ListIntegrationConfigsResponse>;
/**
 * Page data (enriched for views)
 *
 * @generated from message domain.integration.v1.GetIntegrationConfigListPageDataRequest
 */
export type GetIntegrationConfigListPageDataRequest = Message<"domain.integration.v1.GetIntegrationConfigListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filter = 2;
     */
    filter?: FilterRequest;
    /**
     * @generated from field: domain.common.v1.SortRequest sort = 3;
     */
    sort?: SortRequest;
    /**
     * @generated from field: domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
};
/**
 * Describes the message domain.integration.v1.GetIntegrationConfigListPageDataRequest.
 * Use `create(GetIntegrationConfigListPageDataRequestSchema)` to create a new message.
 */
export declare const GetIntegrationConfigListPageDataRequestSchema: GenMessage<GetIntegrationConfigListPageDataRequest>;
/**
 * @generated from message domain.integration.v1.GetIntegrationConfigListPageDataResponse
 */
export type GetIntegrationConfigListPageDataResponse = Message<"domain.integration.v1.GetIntegrationConfigListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.integration.v1.IntegrationConfigListRow rows = 1;
     */
    rows: IntegrationConfigListRow[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: domain.common.v1.Error error = 3;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.GetIntegrationConfigListPageDataResponse.
 * Use `create(GetIntegrationConfigListPageDataResponseSchema)` to create a new message.
 */
export declare const GetIntegrationConfigListPageDataResponseSchema: GenMessage<GetIntegrationConfigListPageDataResponse>;
/**
 * @generated from message domain.integration.v1.IntegrationConfigListRow
 */
export type IntegrationConfigListRow = Message<"domain.integration.v1.IntegrationConfigListRow"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig integration_config = 1;
     */
    integrationConfig?: IntegrationConfig;
};
/**
 * Describes the message domain.integration.v1.IntegrationConfigListRow.
 * Use `create(IntegrationConfigListRowSchema)` to create a new message.
 */
export declare const IntegrationConfigListRowSchema: GenMessage<IntegrationConfigListRow>;
/**
 * Item page data
 *
 * @generated from message domain.integration.v1.GetIntegrationConfigItemPageDataRequest
 */
export type GetIntegrationConfigItemPageDataRequest = Message<"domain.integration.v1.GetIntegrationConfigItemPageDataRequest"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
};
/**
 * Describes the message domain.integration.v1.GetIntegrationConfigItemPageDataRequest.
 * Use `create(GetIntegrationConfigItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetIntegrationConfigItemPageDataRequestSchema: GenMessage<GetIntegrationConfigItemPageDataRequest>;
/**
 * @generated from message domain.integration.v1.GetIntegrationConfigItemPageDataResponse
 */
export type GetIntegrationConfigItemPageDataResponse = Message<"domain.integration.v1.GetIntegrationConfigItemPageDataResponse"> & {
    /**
     * @generated from field: domain.integration.v1.IntegrationConfig integration_config = 1;
     */
    integrationConfig?: IntegrationConfig;
    /**
     * @generated from field: domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message domain.integration.v1.GetIntegrationConfigItemPageDataResponse.
 * Use `create(GetIntegrationConfigItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetIntegrationConfigItemPageDataResponseSchema: GenMessage<GetIntegrationConfigItemPageDataResponse>;
/**
 * @generated from service domain.integration.v1.IntegrationConfigDomainService
 */
export declare const IntegrationConfigDomainService: GenService<{
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.CreateIntegrationConfig
     */
    createIntegrationConfig: {
        methodKind: "unary";
        input: typeof CreateIntegrationConfigRequestSchema;
        output: typeof CreateIntegrationConfigResponseSchema;
    };
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.GetIntegrationConfig
     */
    getIntegrationConfig: {
        methodKind: "unary";
        input: typeof GetIntegrationConfigRequestSchema;
        output: typeof GetIntegrationConfigResponseSchema;
    };
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.UpdateIntegrationConfig
     */
    updateIntegrationConfig: {
        methodKind: "unary";
        input: typeof UpdateIntegrationConfigRequestSchema;
        output: typeof UpdateIntegrationConfigResponseSchema;
    };
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.DeleteIntegrationConfig
     */
    deleteIntegrationConfig: {
        methodKind: "unary";
        input: typeof DeleteIntegrationConfigRequestSchema;
        output: typeof DeleteIntegrationConfigResponseSchema;
    };
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.ListIntegrationConfigs
     */
    listIntegrationConfigs: {
        methodKind: "unary";
        input: typeof ListIntegrationConfigsRequestSchema;
        output: typeof ListIntegrationConfigsResponseSchema;
    };
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.GetIntegrationConfigListPageData
     */
    getIntegrationConfigListPageData: {
        methodKind: "unary";
        input: typeof GetIntegrationConfigListPageDataRequestSchema;
        output: typeof GetIntegrationConfigListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.integration.v1.IntegrationConfigDomainService.GetIntegrationConfigItemPageData
     */
    getIntegrationConfigItemPageData: {
        methodKind: "unary";
        input: typeof GetIntegrationConfigItemPageDataRequestSchema;
        output: typeof GetIntegrationConfigItemPageDataResponseSchema;
    };
}>;
