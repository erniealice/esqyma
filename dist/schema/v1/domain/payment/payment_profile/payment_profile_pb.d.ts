import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Client } from "../../entity/client/client_pb";
import type { PaymentMethod } from "../payment_method/payment_method_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payment/payment_profile/payment_profile.proto.
 */
export declare const file_domain_payment_payment_profile_payment_profile: GenFile;
/**
 * @generated from message domain.payment.v1.PaymentProfile
 */
export type PaymentProfile = Message<"domain.payment.v1.PaymentProfile"> & {
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
     * @generated from field: optional domain.payment.v1.PaymentMethod payment_method = 9;
     */
    paymentMethod?: PaymentMethod;
    /**
     * @generated from field: string payment_method_id = 10;
     */
    paymentMethodId: string;
};
/**
 * Describes the message domain.payment.v1.PaymentProfile.
 * Use `create(PaymentProfileSchema)` to create a new message.
 */
export declare const PaymentProfileSchema: GenMessage<PaymentProfile>;
/**
 * @generated from message domain.payment.v1.CreatePaymentProfileRequest
 */
export type CreatePaymentProfileRequest = Message<"domain.payment.v1.CreatePaymentProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfile data = 1;
     */
    data?: PaymentProfile;
};
/**
 * Describes the message domain.payment.v1.CreatePaymentProfileRequest.
 * Use `create(CreatePaymentProfileRequestSchema)` to create a new message.
 */
export declare const CreatePaymentProfileRequestSchema: GenMessage<CreatePaymentProfileRequest>;
/**
 * @generated from message domain.payment.v1.CreatePaymentProfileResponse
 */
export type CreatePaymentProfileResponse = Message<"domain.payment.v1.CreatePaymentProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfile data = 1;
     */
    data: PaymentProfile[];
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
 * Describes the message domain.payment.v1.CreatePaymentProfileResponse.
 * Use `create(CreatePaymentProfileResponseSchema)` to create a new message.
 */
export declare const CreatePaymentProfileResponseSchema: GenMessage<CreatePaymentProfileResponse>;
/**
 * @generated from message domain.payment.v1.ReadPaymentProfileRequest
 */
export type ReadPaymentProfileRequest = Message<"domain.payment.v1.ReadPaymentProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfile data = 1;
     */
    data?: PaymentProfile;
};
/**
 * Describes the message domain.payment.v1.ReadPaymentProfileRequest.
 * Use `create(ReadPaymentProfileRequestSchema)` to create a new message.
 */
export declare const ReadPaymentProfileRequestSchema: GenMessage<ReadPaymentProfileRequest>;
/**
 * @generated from message domain.payment.v1.ReadPaymentProfileResponse
 */
export type ReadPaymentProfileResponse = Message<"domain.payment.v1.ReadPaymentProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfile data = 1;
     */
    data: PaymentProfile[];
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
 * Describes the message domain.payment.v1.ReadPaymentProfileResponse.
 * Use `create(ReadPaymentProfileResponseSchema)` to create a new message.
 */
export declare const ReadPaymentProfileResponseSchema: GenMessage<ReadPaymentProfileResponse>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentProfileRequest
 */
export type UpdatePaymentProfileRequest = Message<"domain.payment.v1.UpdatePaymentProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfile data = 1;
     */
    data?: PaymentProfile;
};
/**
 * Describes the message domain.payment.v1.UpdatePaymentProfileRequest.
 * Use `create(UpdatePaymentProfileRequestSchema)` to create a new message.
 */
export declare const UpdatePaymentProfileRequestSchema: GenMessage<UpdatePaymentProfileRequest>;
/**
 * @generated from message domain.payment.v1.UpdatePaymentProfileResponse
 */
export type UpdatePaymentProfileResponse = Message<"domain.payment.v1.UpdatePaymentProfileResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfile data = 1;
     */
    data: PaymentProfile[];
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
 * Describes the message domain.payment.v1.UpdatePaymentProfileResponse.
 * Use `create(UpdatePaymentProfileResponseSchema)` to create a new message.
 */
export declare const UpdatePaymentProfileResponseSchema: GenMessage<UpdatePaymentProfileResponse>;
/**
 * @generated from message domain.payment.v1.DeletePaymentProfileRequest
 */
export type DeletePaymentProfileRequest = Message<"domain.payment.v1.DeletePaymentProfileRequest"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfile data = 1;
     */
    data?: PaymentProfile;
};
/**
 * Describes the message domain.payment.v1.DeletePaymentProfileRequest.
 * Use `create(DeletePaymentProfileRequestSchema)` to create a new message.
 */
export declare const DeletePaymentProfileRequestSchema: GenMessage<DeletePaymentProfileRequest>;
/**
 * @generated from message domain.payment.v1.DeletePaymentProfileResponse
 */
export type DeletePaymentProfileResponse = Message<"domain.payment.v1.DeletePaymentProfileResponse"> & {
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
 * Describes the message domain.payment.v1.DeletePaymentProfileResponse.
 * Use `create(DeletePaymentProfileResponseSchema)` to create a new message.
 */
export declare const DeletePaymentProfileResponseSchema: GenMessage<DeletePaymentProfileResponse>;
/**
 * @generated from message domain.payment.v1.ListPaymentProfilesRequest
 */
export type ListPaymentProfilesRequest = Message<"domain.payment.v1.ListPaymentProfilesRequest"> & {
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
 * Describes the message domain.payment.v1.ListPaymentProfilesRequest.
 * Use `create(ListPaymentProfilesRequestSchema)` to create a new message.
 */
export declare const ListPaymentProfilesRequestSchema: GenMessage<ListPaymentProfilesRequest>;
/**
 * @generated from message domain.payment.v1.ListPaymentProfilesResponse
 */
export type ListPaymentProfilesResponse = Message<"domain.payment.v1.ListPaymentProfilesResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfile data = 1;
     */
    data: PaymentProfile[];
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
 * Describes the message domain.payment.v1.ListPaymentProfilesResponse.
 * Use `create(ListPaymentProfilesResponseSchema)` to create a new message.
 */
export declare const ListPaymentProfilesResponseSchema: GenMessage<ListPaymentProfilesResponse>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfileListPageDataRequest
 */
export type GetPaymentProfileListPageDataRequest = Message<"domain.payment.v1.GetPaymentProfileListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetPaymentProfileListPageDataRequest.
 * Use `create(GetPaymentProfileListPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentProfileListPageDataRequestSchema: GenMessage<GetPaymentProfileListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfileListPageDataResponse
 */
export type GetPaymentProfileListPageDataResponse = Message<"domain.payment.v1.GetPaymentProfileListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.PaymentProfile payment_profile_list = 1;
     */
    paymentProfileList: PaymentProfile[];
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
 * Describes the message domain.payment.v1.GetPaymentProfileListPageDataResponse.
 * Use `create(GetPaymentProfileListPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentProfileListPageDataResponseSchema: GenMessage<GetPaymentProfileListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfileItemPageDataRequest
 */
export type GetPaymentProfileItemPageDataRequest = Message<"domain.payment.v1.GetPaymentProfileItemPageDataRequest"> & {
    /**
     * @generated from field: string payment_profile_id = 1;
     */
    paymentProfileId: string;
};
/**
 * Describes the message domain.payment.v1.GetPaymentProfileItemPageDataRequest.
 * Use `create(GetPaymentProfileItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetPaymentProfileItemPageDataRequestSchema: GenMessage<GetPaymentProfileItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetPaymentProfileItemPageDataResponse
 */
export type GetPaymentProfileItemPageDataResponse = Message<"domain.payment.v1.GetPaymentProfileItemPageDataResponse"> & {
    /**
     * @generated from field: domain.payment.v1.PaymentProfile payment_profile = 1;
     */
    paymentProfile?: PaymentProfile;
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
 * Describes the message domain.payment.v1.GetPaymentProfileItemPageDataResponse.
 * Use `create(GetPaymentProfileItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetPaymentProfileItemPageDataResponseSchema: GenMessage<GetPaymentProfileItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.PaymentProfileDomainService
 */
export declare const PaymentProfileDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.CreatePaymentProfile
     */
    createPaymentProfile: {
        methodKind: "unary";
        input: typeof CreatePaymentProfileRequestSchema;
        output: typeof CreatePaymentProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.ReadPaymentProfile
     */
    readPaymentProfile: {
        methodKind: "unary";
        input: typeof ReadPaymentProfileRequestSchema;
        output: typeof ReadPaymentProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.UpdatePaymentProfile
     */
    updatePaymentProfile: {
        methodKind: "unary";
        input: typeof UpdatePaymentProfileRequestSchema;
        output: typeof UpdatePaymentProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.DeletePaymentProfile
     */
    deletePaymentProfile: {
        methodKind: "unary";
        input: typeof DeletePaymentProfileRequestSchema;
        output: typeof DeletePaymentProfileResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.ListPaymentProfiles
     */
    listPaymentProfiles: {
        methodKind: "unary";
        input: typeof ListPaymentProfilesRequestSchema;
        output: typeof ListPaymentProfilesResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.GetPaymentProfileListPageData
     */
    getPaymentProfileListPageData: {
        methodKind: "unary";
        input: typeof GetPaymentProfileListPageDataRequestSchema;
        output: typeof GetPaymentProfileListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.PaymentProfileDomainService.GetPaymentProfileItemPageData
     */
    getPaymentProfileItemPageData: {
        methodKind: "unary";
        input: typeof GetPaymentProfileItemPageDataRequestSchema;
        output: typeof GetPaymentProfileItemPageDataResponseSchema;
    };
}>;
