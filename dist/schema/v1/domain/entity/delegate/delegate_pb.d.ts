import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { User } from "../user/user_pb";
import type { DelegateClient } from "../delegate_client/delegate_client_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/delegate/delegate.proto.
 */
export declare const file_domain_entity_delegate_delegate: GenFile;
/**
 * @generated from message domain.entity.v1.Delegate
 */
export type Delegate = Message<"domain.entity.v1.Delegate"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional domain.entity.v1.User user = 2;
     */
    user?: User;
    /**
     * @generated from field: string user_id = 3;
     */
    userId: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: repeated domain.entity.v1.DelegateClient delegate_clients = 9;
     */
    delegateClients: DelegateClient[];
};
/**
 * Describes the message domain.entity.v1.Delegate.
 * Use `create(DelegateSchema)` to create a new message.
 */
export declare const DelegateSchema: GenMessage<Delegate>;
/**
 * @generated from message domain.entity.v1.CreateDelegateRequest
 */
export type CreateDelegateRequest = Message<"domain.entity.v1.CreateDelegateRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Delegate data = 1;
     */
    data?: Delegate;
};
/**
 * Describes the message domain.entity.v1.CreateDelegateRequest.
 * Use `create(CreateDelegateRequestSchema)` to create a new message.
 */
export declare const CreateDelegateRequestSchema: GenMessage<CreateDelegateRequest>;
/**
 * @generated from message domain.entity.v1.CreateDelegateResponse
 */
export type CreateDelegateResponse = Message<"domain.entity.v1.CreateDelegateResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Delegate data = 1;
     */
    data: Delegate[];
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
 * Describes the message domain.entity.v1.CreateDelegateResponse.
 * Use `create(CreateDelegateResponseSchema)` to create a new message.
 */
export declare const CreateDelegateResponseSchema: GenMessage<CreateDelegateResponse>;
/**
 * @generated from message domain.entity.v1.ReadDelegateRequest
 */
export type ReadDelegateRequest = Message<"domain.entity.v1.ReadDelegateRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Delegate data = 1;
     */
    data?: Delegate;
};
/**
 * Describes the message domain.entity.v1.ReadDelegateRequest.
 * Use `create(ReadDelegateRequestSchema)` to create a new message.
 */
export declare const ReadDelegateRequestSchema: GenMessage<ReadDelegateRequest>;
/**
 * @generated from message domain.entity.v1.ReadDelegateResponse
 */
export type ReadDelegateResponse = Message<"domain.entity.v1.ReadDelegateResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Delegate data = 1;
     */
    data: Delegate[];
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
 * Describes the message domain.entity.v1.ReadDelegateResponse.
 * Use `create(ReadDelegateResponseSchema)` to create a new message.
 */
export declare const ReadDelegateResponseSchema: GenMessage<ReadDelegateResponse>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateRequest
 */
export type UpdateDelegateRequest = Message<"domain.entity.v1.UpdateDelegateRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Delegate data = 1;
     */
    data?: Delegate;
};
/**
 * Describes the message domain.entity.v1.UpdateDelegateRequest.
 * Use `create(UpdateDelegateRequestSchema)` to create a new message.
 */
export declare const UpdateDelegateRequestSchema: GenMessage<UpdateDelegateRequest>;
/**
 * @generated from message domain.entity.v1.UpdateDelegateResponse
 */
export type UpdateDelegateResponse = Message<"domain.entity.v1.UpdateDelegateResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Delegate data = 1;
     */
    data: Delegate[];
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
 * Describes the message domain.entity.v1.UpdateDelegateResponse.
 * Use `create(UpdateDelegateResponseSchema)` to create a new message.
 */
export declare const UpdateDelegateResponseSchema: GenMessage<UpdateDelegateResponse>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateRequest
 */
export type DeleteDelegateRequest = Message<"domain.entity.v1.DeleteDelegateRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Delegate data = 1;
     */
    data?: Delegate;
};
/**
 * Describes the message domain.entity.v1.DeleteDelegateRequest.
 * Use `create(DeleteDelegateRequestSchema)` to create a new message.
 */
export declare const DeleteDelegateRequestSchema: GenMessage<DeleteDelegateRequest>;
/**
 * @generated from message domain.entity.v1.DeleteDelegateResponse
 */
export type DeleteDelegateResponse = Message<"domain.entity.v1.DeleteDelegateResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteDelegateResponse.
 * Use `create(DeleteDelegateResponseSchema)` to create a new message.
 */
export declare const DeleteDelegateResponseSchema: GenMessage<DeleteDelegateResponse>;
/**
 * @generated from message domain.entity.v1.ListDelegatesRequest
 */
export type ListDelegatesRequest = Message<"domain.entity.v1.ListDelegatesRequest"> & {
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
 * Describes the message domain.entity.v1.ListDelegatesRequest.
 * Use `create(ListDelegatesRequestSchema)` to create a new message.
 */
export declare const ListDelegatesRequestSchema: GenMessage<ListDelegatesRequest>;
/**
 * @generated from message domain.entity.v1.ListDelegatesResponse
 */
export type ListDelegatesResponse = Message<"domain.entity.v1.ListDelegatesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Delegate data = 1;
     */
    data: Delegate[];
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
 * Describes the message domain.entity.v1.ListDelegatesResponse.
 * Use `create(ListDelegatesResponseSchema)` to create a new message.
 */
export declare const ListDelegatesResponseSchema: GenMessage<ListDelegatesResponse>;
/**
 * @generated from message domain.entity.v1.GetDelegateListPageDataRequest
 */
export type GetDelegateListPageDataRequest = Message<"domain.entity.v1.GetDelegateListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetDelegateListPageDataRequest.
 * Use `create(GetDelegateListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateListPageDataRequestSchema: GenMessage<GetDelegateListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetDelegateListPageDataResponse
 */
export type GetDelegateListPageDataResponse = Message<"domain.entity.v1.GetDelegateListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Delegate delegate_list = 1;
     */
    delegateList: Delegate[];
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
 * Describes the message domain.entity.v1.GetDelegateListPageDataResponse.
 * Use `create(GetDelegateListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateListPageDataResponseSchema: GenMessage<GetDelegateListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetDelegateItemPageDataRequest
 */
export type GetDelegateItemPageDataRequest = Message<"domain.entity.v1.GetDelegateItemPageDataRequest"> & {
    /**
     * @generated from field: string delegate_id = 1;
     */
    delegateId: string;
};
/**
 * Describes the message domain.entity.v1.GetDelegateItemPageDataRequest.
 * Use `create(GetDelegateItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDelegateItemPageDataRequestSchema: GenMessage<GetDelegateItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetDelegateItemPageDataResponse
 */
export type GetDelegateItemPageDataResponse = Message<"domain.entity.v1.GetDelegateItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Delegate delegate = 1;
     */
    delegate?: Delegate;
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
 * Describes the message domain.entity.v1.GetDelegateItemPageDataResponse.
 * Use `create(GetDelegateItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDelegateItemPageDataResponseSchema: GenMessage<GetDelegateItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.DelegateDomainService
 */
export declare const DelegateDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.CreateDelegate
     */
    createDelegate: {
        methodKind: "unary";
        input: typeof CreateDelegateRequestSchema;
        output: typeof CreateDelegateResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.ReadDelegate
     */
    readDelegate: {
        methodKind: "unary";
        input: typeof ReadDelegateRequestSchema;
        output: typeof ReadDelegateResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.UpdateDelegate
     */
    updateDelegate: {
        methodKind: "unary";
        input: typeof UpdateDelegateRequestSchema;
        output: typeof UpdateDelegateResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.DeleteDelegate
     */
    deleteDelegate: {
        methodKind: "unary";
        input: typeof DeleteDelegateRequestSchema;
        output: typeof DeleteDelegateResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.ListDelegates
     */
    listDelegates: {
        methodKind: "unary";
        input: typeof ListDelegatesRequestSchema;
        output: typeof ListDelegatesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.GetDelegateListPageData
     */
    getDelegateListPageData: {
        methodKind: "unary";
        input: typeof GetDelegateListPageDataRequestSchema;
        output: typeof GetDelegateListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.DelegateDomainService.GetDelegateItemPageData
     */
    getDelegateItemPageData: {
        methodKind: "unary";
        input: typeof GetDelegateItemPageDataRequestSchema;
        output: typeof GetDelegateItemPageDataResponseSchema;
    };
}>;
