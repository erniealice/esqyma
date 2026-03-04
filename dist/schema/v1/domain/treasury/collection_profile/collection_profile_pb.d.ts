import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Client } from "../../entity/client/client_pb";
import type { CollectionMethod } from "../collection_method/collection_method_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/collection_profile/collection_profile.proto.
 */
export declare const file_domain_payment_collection_profile_collection_profile: GenFile;
/**
 * @generated from message domain.payment.v1.CollectionProfile
 */
export type CollectionProfile = Message<"domain.payment.v1.CollectionProfile"> & {
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
     * @generated from field: optional domain.entity.v1.Client client = 7;
     */
    client?: Client;
    /**
     * @generated from field: string client_id = 8;
     */
    clientId: string;
    /**
     * @generated from field: optional domain.payment.v1.CollectionMethod collection_method = 9;
     */
    collectionMethod?: CollectionMethod;
    /**
     * @generated from field: string collection_method_id = 10;
     */
    collectionMethodId: string;
};
/**
 * Describes the message domain.payment.v1.CollectionProfile.
 * Use `create(CollectionProfileSchema)` to create a new message.
 */
export declare const CollectionProfileSchema: GenMessage<CollectionProfile>;
/**
 * @generated from message domain.payment.v1.CreateCollectionProfileRequest
 */
export type CreateCollectionProfileRequest = Message<"domain.payment.v1.CreateCollectionProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfile data = 1;
     */
    data?: CollectionProfile;
};
/**
 * Describes the message domain.payment.v1.CreateCollectionProfileRequest.
 * Use `create(CreateCollectionProfileRequestSchema)` to create a new message.
 */
export declare const CreateCollectionProfileRequestSchema: GenMessage<CreateCollectionProfileRequest>;
/**
 * @generated from message domain.payment.v1.CreateCollectionProfileResponse
 */
export type CreateCollectionProfileResponse = Message<"domain.payment.v1.CreateCollectionProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfile data = 1;
     */
    data: CollectionProfile[];
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
 * Describes the message domain.payment.v1.CreateCollectionProfileResponse.
 * Use `create(CreateCollectionProfileResponseSchema)` to create a new message.
 */
export declare const CreateCollectionProfileResponseSchema: GenMessage<CreateCollectionProfileResponse>;
/**
 * @generated from message domain.payment.v1.ReadCollectionProfileRequest
 */
export type ReadCollectionProfileRequest = Message<"domain.payment.v1.ReadCollectionProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfile data = 1;
     */
    data?: CollectionProfile;
};
/**
 * Describes the message domain.payment.v1.ReadCollectionProfileRequest.
 * Use `create(ReadCollectionProfileRequestSchema)` to create a new message.
 */
export declare const ReadCollectionProfileRequestSchema: GenMessage<ReadCollectionProfileRequest>;
/**
 * @generated from message domain.payment.v1.ReadCollectionProfileResponse
 */
export type ReadCollectionProfileResponse = Message<"domain.payment.v1.ReadCollectionProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfile data = 1;
     */
    data: CollectionProfile[];
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
 * Describes the message domain.payment.v1.ReadCollectionProfileResponse.
 * Use `create(ReadCollectionProfileResponseSchema)` to create a new message.
 */
export declare const ReadCollectionProfileResponseSchema: GenMessage<ReadCollectionProfileResponse>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionProfileRequest
 */
export type UpdateCollectionProfileRequest = Message<"domain.payment.v1.UpdateCollectionProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfile data = 1;
     */
    data?: CollectionProfile;
};
/**
 * Describes the message domain.payment.v1.UpdateCollectionProfileRequest.
 * Use `create(UpdateCollectionProfileRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionProfileRequestSchema: GenMessage<UpdateCollectionProfileRequest>;
/**
 * @generated from message domain.payment.v1.UpdateCollectionProfileResponse
 */
export type UpdateCollectionProfileResponse = Message<"domain.payment.v1.UpdateCollectionProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfile data = 1;
     */
    data: CollectionProfile[];
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
 * Describes the message domain.payment.v1.UpdateCollectionProfileResponse.
 * Use `create(UpdateCollectionProfileResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionProfileResponseSchema: GenMessage<UpdateCollectionProfileResponse>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionProfileRequest
 */
export type DeleteCollectionProfileRequest = Message<"domain.payment.v1.DeleteCollectionProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.CollectionProfile data = 1;
     */
    data?: CollectionProfile;
};
/**
 * Describes the message domain.payment.v1.DeleteCollectionProfileRequest.
 * Use `create(DeleteCollectionProfileRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionProfileRequestSchema: GenMessage<DeleteCollectionProfileRequest>;
/**
 * @generated from message domain.payment.v1.DeleteCollectionProfileResponse
 */
export type DeleteCollectionProfileResponse = Message<"domain.payment.v1.DeleteCollectionProfileResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteCollectionProfileResponse.
 * Use `create(DeleteCollectionProfileResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionProfileResponseSchema: GenMessage<DeleteCollectionProfileResponse>;
/**
 * @generated from message domain.payment.v1.ListCollectionProfilesRequest
 */
export type ListCollectionProfilesRequest = Message<"domain.payment.v1.ListCollectionProfilesRequest"> & {
    /**
     * @generated from field: string client_id = 1;
     */
    clientId: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 2;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 3;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 4;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 5;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.payment.v1.ListCollectionProfilesRequest.
 * Use `create(ListCollectionProfilesRequestSchema)` to create a new message.
 */
export declare const ListCollectionProfilesRequestSchema: GenMessage<ListCollectionProfilesRequest>;
/**
 * @generated from message domain.payment.v1.ListCollectionProfilesResponse
 */
export type ListCollectionProfilesResponse = Message<"domain.payment.v1.ListCollectionProfilesResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfile data = 1;
     */
    data: CollectionProfile[];
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
 * Describes the message domain.payment.v1.ListCollectionProfilesResponse.
 * Use `create(ListCollectionProfilesResponseSchema)` to create a new message.
 */
export declare const ListCollectionProfilesResponseSchema: GenMessage<ListCollectionProfilesResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileListPageDataRequest
 */
export type GetCollectionProfileListPageDataRequest = Message<"domain.payment.v1.GetCollectionProfileListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetCollectionProfileListPageDataRequest.
 * Use `create(GetCollectionProfileListPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionProfileListPageDataRequestSchema: GenMessage<GetCollectionProfileListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileListPageDataResponse
 */
export type GetCollectionProfileListPageDataResponse = Message<"domain.payment.v1.GetCollectionProfileListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.CollectionProfile collection_profile_list = 1;
     */
    collectionProfileList: CollectionProfile[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.payment.v1.GetCollectionProfileListPageDataResponse.
 * Use `create(GetCollectionProfileListPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionProfileListPageDataResponseSchema: GenMessage<GetCollectionProfileListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileItemPageDataRequest
 */
export type GetCollectionProfileItemPageDataRequest = Message<"domain.payment.v1.GetCollectionProfileItemPageDataRequest"> & {
    /**
     * @generated from field: string collection_profile_id = 1;
     */
    collectionProfileId: string;
};
/**
 * Describes the message domain.payment.v1.GetCollectionProfileItemPageDataRequest.
 * Use `create(GetCollectionProfileItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetCollectionProfileItemPageDataRequestSchema: GenMessage<GetCollectionProfileItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetCollectionProfileItemPageDataResponse
 */
export type GetCollectionProfileItemPageDataResponse = Message<"domain.payment.v1.GetCollectionProfileItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payment.v1.CollectionProfile collection_profile = 1;
     */
    collectionProfile?: CollectionProfile;
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
 * Describes the message domain.payment.v1.GetCollectionProfileItemPageDataResponse.
 * Use `create(GetCollectionProfileItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetCollectionProfileItemPageDataResponseSchema: GenMessage<GetCollectionProfileItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.CollectionProfileDomainService
 */
export declare const CollectionProfileDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.CreateCollectionProfile
     */
    createCollectionProfile: {
        methodKind: "unary";
        input: typeof CreateCollectionProfileRequestSchema;
        output: typeof CreateCollectionProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.ReadCollectionProfile
     */
    readCollectionProfile: {
        methodKind: "unary";
        input: typeof ReadCollectionProfileRequestSchema;
        output: typeof ReadCollectionProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.UpdateCollectionProfile
     */
    updateCollectionProfile: {
        methodKind: "unary";
        input: typeof UpdateCollectionProfileRequestSchema;
        output: typeof UpdateCollectionProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.DeleteCollectionProfile
     */
    deleteCollectionProfile: {
        methodKind: "unary";
        input: typeof DeleteCollectionProfileRequestSchema;
        output: typeof DeleteCollectionProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.ListCollectionProfiles
     */
    listCollectionProfiles: {
        methodKind: "unary";
        input: typeof ListCollectionProfilesRequestSchema;
        output: typeof ListCollectionProfilesResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.GetCollectionProfileListPageData
     */
    getCollectionProfileListPageData: {
        methodKind: "unary";
        input: typeof GetCollectionProfileListPageDataRequestSchema;
        output: typeof GetCollectionProfileListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.CollectionProfileDomainService.GetCollectionProfileItemPageData
     */
    getCollectionProfileItemPageData: {
        methodKind: "unary";
        input: typeof GetCollectionProfileItemPageDataRequestSchema;
        output: typeof GetCollectionProfileItemPageDataResponseSchema;
    };
}>;
