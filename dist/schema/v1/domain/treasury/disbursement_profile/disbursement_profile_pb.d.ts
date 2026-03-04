import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Client } from "../../entity/client/client_pb";
import type { DisbursementMethod } from "../disbursement_method/disbursement_method_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/disbursement_profile/disbursement_profile.proto.
 */
export declare const file_domain_payment_disbursement_profile_disbursement_profile: GenFile;
/**
 * @generated from message domain.payment.v1.DisbursementProfile
 */
export type DisbursementProfile = Message<"domain.payment.v1.DisbursementProfile"> & {
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
     * @generated from field: optional domain.payment.v1.DisbursementMethod disbursement_method = 9;
     */
    disbursementMethod?: DisbursementMethod;
    /**
     * @generated from field: string disbursement_method_id = 10;
     */
    disbursementMethodId: string;
};
/**
 * Describes the message domain.payment.v1.DisbursementProfile.
 * Use `create(DisbursementProfileSchema)` to create a new message.
 */
export declare const DisbursementProfileSchema: GenMessage<DisbursementProfile>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementProfileRequest
 */
export type CreateDisbursementProfileRequest = Message<"domain.payment.v1.CreateDisbursementProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfile data = 1;
     */
    data?: DisbursementProfile;
};
/**
 * Describes the message domain.payment.v1.CreateDisbursementProfileRequest.
 * Use `create(CreateDisbursementProfileRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementProfileRequestSchema: GenMessage<CreateDisbursementProfileRequest>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementProfileResponse
 */
export type CreateDisbursementProfileResponse = Message<"domain.payment.v1.CreateDisbursementProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfile data = 1;
     */
    data: DisbursementProfile[];
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
 * Describes the message domain.payment.v1.CreateDisbursementProfileResponse.
 * Use `create(CreateDisbursementProfileResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementProfileResponseSchema: GenMessage<CreateDisbursementProfileResponse>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementProfileRequest
 */
export type ReadDisbursementProfileRequest = Message<"domain.payment.v1.ReadDisbursementProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfile data = 1;
     */
    data?: DisbursementProfile;
};
/**
 * Describes the message domain.payment.v1.ReadDisbursementProfileRequest.
 * Use `create(ReadDisbursementProfileRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementProfileRequestSchema: GenMessage<ReadDisbursementProfileRequest>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementProfileResponse
 */
export type ReadDisbursementProfileResponse = Message<"domain.payment.v1.ReadDisbursementProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfile data = 1;
     */
    data: DisbursementProfile[];
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
 * Describes the message domain.payment.v1.ReadDisbursementProfileResponse.
 * Use `create(ReadDisbursementProfileResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementProfileResponseSchema: GenMessage<ReadDisbursementProfileResponse>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementProfileRequest
 */
export type UpdateDisbursementProfileRequest = Message<"domain.payment.v1.UpdateDisbursementProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfile data = 1;
     */
    data?: DisbursementProfile;
};
/**
 * Describes the message domain.payment.v1.UpdateDisbursementProfileRequest.
 * Use `create(UpdateDisbursementProfileRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementProfileRequestSchema: GenMessage<UpdateDisbursementProfileRequest>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementProfileResponse
 */
export type UpdateDisbursementProfileResponse = Message<"domain.payment.v1.UpdateDisbursementProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfile data = 1;
     */
    data: DisbursementProfile[];
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
 * Describes the message domain.payment.v1.UpdateDisbursementProfileResponse.
 * Use `create(UpdateDisbursementProfileResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementProfileResponseSchema: GenMessage<UpdateDisbursementProfileResponse>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementProfileRequest
 */
export type DeleteDisbursementProfileRequest = Message<"domain.payment.v1.DeleteDisbursementProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfile data = 1;
     */
    data?: DisbursementProfile;
};
/**
 * Describes the message domain.payment.v1.DeleteDisbursementProfileRequest.
 * Use `create(DeleteDisbursementProfileRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementProfileRequestSchema: GenMessage<DeleteDisbursementProfileRequest>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementProfileResponse
 */
export type DeleteDisbursementProfileResponse = Message<"domain.payment.v1.DeleteDisbursementProfileResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteDisbursementProfileResponse.
 * Use `create(DeleteDisbursementProfileResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementProfileResponseSchema: GenMessage<DeleteDisbursementProfileResponse>;
/**
 * @generated from message domain.payment.v1.ListDisbursementProfilesRequest
 */
export type ListDisbursementProfilesRequest = Message<"domain.payment.v1.ListDisbursementProfilesRequest"> & {
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
 * Describes the message domain.payment.v1.ListDisbursementProfilesRequest.
 * Use `create(ListDisbursementProfilesRequestSchema)` to create a new message.
 */
export declare const ListDisbursementProfilesRequestSchema: GenMessage<ListDisbursementProfilesRequest>;
/**
 * @generated from message domain.payment.v1.ListDisbursementProfilesResponse
 */
export type ListDisbursementProfilesResponse = Message<"domain.payment.v1.ListDisbursementProfilesResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfile data = 1;
     */
    data: DisbursementProfile[];
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
 * Describes the message domain.payment.v1.ListDisbursementProfilesResponse.
 * Use `create(ListDisbursementProfilesResponseSchema)` to create a new message.
 */
export declare const ListDisbursementProfilesResponseSchema: GenMessage<ListDisbursementProfilesResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileListPageDataRequest
 */
export type GetDisbursementProfileListPageDataRequest = Message<"domain.payment.v1.GetDisbursementProfileListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetDisbursementProfileListPageDataRequest.
 * Use `create(GetDisbursementProfileListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementProfileListPageDataRequestSchema: GenMessage<GetDisbursementProfileListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileListPageDataResponse
 */
export type GetDisbursementProfileListPageDataResponse = Message<"domain.payment.v1.GetDisbursementProfileListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfile disbursement_profile_list = 1;
     */
    disbursementProfileList: DisbursementProfile[];
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
 * Describes the message domain.payment.v1.GetDisbursementProfileListPageDataResponse.
 * Use `create(GetDisbursementProfileListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementProfileListPageDataResponseSchema: GenMessage<GetDisbursementProfileListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileItemPageDataRequest
 */
export type GetDisbursementProfileItemPageDataRequest = Message<"domain.payment.v1.GetDisbursementProfileItemPageDataRequest"> & {
    /**
     * @generated from field: string disbursement_profile_id = 1;
     */
    disbursementProfileId: string;
};
/**
 * Describes the message domain.payment.v1.GetDisbursementProfileItemPageDataRequest.
 * Use `create(GetDisbursementProfileItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementProfileItemPageDataRequestSchema: GenMessage<GetDisbursementProfileItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileItemPageDataResponse
 */
export type GetDisbursementProfileItemPageDataResponse = Message<"domain.payment.v1.GetDisbursementProfileItemPageDataResponse"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfile disbursement_profile = 1;
     */
    disbursementProfile?: DisbursementProfile;
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
 * Describes the message domain.payment.v1.GetDisbursementProfileItemPageDataResponse.
 * Use `create(GetDisbursementProfileItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementProfileItemPageDataResponseSchema: GenMessage<GetDisbursementProfileItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.DisbursementProfileDomainService
 */
export declare const DisbursementProfileDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.CreateDisbursementProfile
     */
    createDisbursementProfile: {
        methodKind: "unary";
        input: typeof CreateDisbursementProfileRequestSchema;
        output: typeof CreateDisbursementProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.ReadDisbursementProfile
     */
    readDisbursementProfile: {
        methodKind: "unary";
        input: typeof ReadDisbursementProfileRequestSchema;
        output: typeof ReadDisbursementProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.UpdateDisbursementProfile
     */
    updateDisbursementProfile: {
        methodKind: "unary";
        input: typeof UpdateDisbursementProfileRequestSchema;
        output: typeof UpdateDisbursementProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.DeleteDisbursementProfile
     */
    deleteDisbursementProfile: {
        methodKind: "unary";
        input: typeof DeleteDisbursementProfileRequestSchema;
        output: typeof DeleteDisbursementProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.ListDisbursementProfiles
     */
    listDisbursementProfiles: {
        methodKind: "unary";
        input: typeof ListDisbursementProfilesRequestSchema;
        output: typeof ListDisbursementProfilesResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.GetDisbursementProfileListPageData
     */
    getDisbursementProfileListPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementProfileListPageDataRequestSchema;
        output: typeof GetDisbursementProfileListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDomainService.GetDisbursementProfileItemPageData
     */
    getDisbursementProfileItemPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementProfileItemPageDataRequestSchema;
        output: typeof GetDisbursementProfileItemPageDataResponseSchema;
    };
}>;
