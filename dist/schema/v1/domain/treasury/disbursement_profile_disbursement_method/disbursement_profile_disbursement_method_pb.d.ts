import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { DisbursementProfile } from "../disbursement_profile/disbursement_profile_pb";
import type { DisbursementMethod } from "../disbursement_method/disbursement_method_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/treasury/disbursement_profile_disbursement_method/disbursement_profile_disbursement_method.proto.
 */
export declare const file_domain_payment_disbursement_profile_disbursement_method_disbursement_profile_disbursement_method: GenFile;
/**
 * @generated from message domain.payment.v1.DisbursementProfileDisbursementMethod
 */
export type DisbursementProfileDisbursementMethod = Message<"domain.payment.v1.DisbursementProfileDisbursementMethod"> & {
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
     * @generated from field: optional domain.payment.v1.DisbursementProfile disbursement_profile = 7;
     */
    disbursementProfile?: DisbursementProfile;
    /**
     * @generated from field: string disbursement_profile_id = 8;
     */
    disbursementProfileId: string;
    /**
     * @generated from field: optional domain.payment.v1.DisbursementMethod disbursement_method = 9;
     */
    disbursementMethod?: DisbursementMethod;
    /**
     * @generated from field: string disbursement_method_id = 10;
     */
    disbursementMethodId: string;
    /**
     * @generated from field: bool primary = 11;
     */
    primary: boolean;
    /**
     * @generated from field: optional string notes = 12;
     */
    notes?: string;
    /**
     * @generated from field: optional int32 display_order = 13;
     */
    displayOrder?: number;
    /**
     * @generated from field: string payment_identifier = 14;
     */
    paymentIdentifier: string;
    /**
     * @generated from field: string identifier_type = 15;
     */
    identifierType: string;
    /**
     * @generated from field: optional string display_name = 16;
     */
    displayName?: string;
    /**
     * @generated from field: bool masked = 17;
     */
    masked: boolean;
};
/**
 * Describes the message domain.payment.v1.DisbursementProfileDisbursementMethod.
 * Use `create(DisbursementProfileDisbursementMethodSchema)` to create a new message.
 */
export declare const DisbursementProfileDisbursementMethodSchema: GenMessage<DisbursementProfileDisbursementMethod>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementProfileDisbursementMethodRequest
 */
export type CreateDisbursementProfileDisbursementMethodRequest = Message<"domain.payment.v1.CreateDisbursementProfileDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data?: DisbursementProfileDisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.CreateDisbursementProfileDisbursementMethodRequest.
 * Use `create(CreateDisbursementProfileDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const CreateDisbursementProfileDisbursementMethodRequestSchema: GenMessage<CreateDisbursementProfileDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.CreateDisbursementProfileDisbursementMethodResponse
 */
export type CreateDisbursementProfileDisbursementMethodResponse = Message<"domain.payment.v1.CreateDisbursementProfileDisbursementMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data: DisbursementProfileDisbursementMethod[];
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
 * Describes the message domain.payment.v1.CreateDisbursementProfileDisbursementMethodResponse.
 * Use `create(CreateDisbursementProfileDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const CreateDisbursementProfileDisbursementMethodResponseSchema: GenMessage<CreateDisbursementProfileDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementProfileDisbursementMethodRequest
 */
export type ReadDisbursementProfileDisbursementMethodRequest = Message<"domain.payment.v1.ReadDisbursementProfileDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data?: DisbursementProfileDisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.ReadDisbursementProfileDisbursementMethodRequest.
 * Use `create(ReadDisbursementProfileDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const ReadDisbursementProfileDisbursementMethodRequestSchema: GenMessage<ReadDisbursementProfileDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.ReadDisbursementProfileDisbursementMethodResponse
 */
export type ReadDisbursementProfileDisbursementMethodResponse = Message<"domain.payment.v1.ReadDisbursementProfileDisbursementMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data: DisbursementProfileDisbursementMethod[];
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
 * Describes the message domain.payment.v1.ReadDisbursementProfileDisbursementMethodResponse.
 * Use `create(ReadDisbursementProfileDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const ReadDisbursementProfileDisbursementMethodResponseSchema: GenMessage<ReadDisbursementProfileDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementProfileDisbursementMethodRequest
 */
export type UpdateDisbursementProfileDisbursementMethodRequest = Message<"domain.payment.v1.UpdateDisbursementProfileDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data?: DisbursementProfileDisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.UpdateDisbursementProfileDisbursementMethodRequest.
 * Use `create(UpdateDisbursementProfileDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const UpdateDisbursementProfileDisbursementMethodRequestSchema: GenMessage<UpdateDisbursementProfileDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.UpdateDisbursementProfileDisbursementMethodResponse
 */
export type UpdateDisbursementProfileDisbursementMethodResponse = Message<"domain.payment.v1.UpdateDisbursementProfileDisbursementMethodResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data: DisbursementProfileDisbursementMethod[];
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
 * Describes the message domain.payment.v1.UpdateDisbursementProfileDisbursementMethodResponse.
 * Use `create(UpdateDisbursementProfileDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const UpdateDisbursementProfileDisbursementMethodResponseSchema: GenMessage<UpdateDisbursementProfileDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementProfileDisbursementMethodRequest
 */
export type DeleteDisbursementProfileDisbursementMethodRequest = Message<"domain.payment.v1.DeleteDisbursementProfileDisbursementMethodRequest"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data?: DisbursementProfileDisbursementMethod;
};
/**
 * Describes the message domain.payment.v1.DeleteDisbursementProfileDisbursementMethodRequest.
 * Use `create(DeleteDisbursementProfileDisbursementMethodRequestSchema)` to create a new message.
 */
export declare const DeleteDisbursementProfileDisbursementMethodRequestSchema: GenMessage<DeleteDisbursementProfileDisbursementMethodRequest>;
/**
 * @generated from message domain.payment.v1.DeleteDisbursementProfileDisbursementMethodResponse
 */
export type DeleteDisbursementProfileDisbursementMethodResponse = Message<"domain.payment.v1.DeleteDisbursementProfileDisbursementMethodResponse"> & {
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
 * Describes the message domain.payment.v1.DeleteDisbursementProfileDisbursementMethodResponse.
 * Use `create(DeleteDisbursementProfileDisbursementMethodResponseSchema)` to create a new message.
 */
export declare const DeleteDisbursementProfileDisbursementMethodResponseSchema: GenMessage<DeleteDisbursementProfileDisbursementMethodResponse>;
/**
 * @generated from message domain.payment.v1.ListDisbursementProfileDisbursementMethodsRequest
 */
export type ListDisbursementProfileDisbursementMethodsRequest = Message<"domain.payment.v1.ListDisbursementProfileDisbursementMethodsRequest"> & {
    /**
     * @generated from field: optional string disbursement_profile_id = 1;
     */
    disbursementProfileId?: string;
    /**
     * @generated from field: optional string disbursement_method_id = 2;
     */
    disbursementMethodId?: string;
    /**
     * @generated from field: optional bool primary_only = 3;
     */
    primaryOnly?: boolean;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 4;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 5;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 6;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 7;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.payment.v1.ListDisbursementProfileDisbursementMethodsRequest.
 * Use `create(ListDisbursementProfileDisbursementMethodsRequestSchema)` to create a new message.
 */
export declare const ListDisbursementProfileDisbursementMethodsRequestSchema: GenMessage<ListDisbursementProfileDisbursementMethodsRequest>;
/**
 * @generated from message domain.payment.v1.ListDisbursementProfileDisbursementMethodsResponse
 */
export type ListDisbursementProfileDisbursementMethodsResponse = Message<"domain.payment.v1.ListDisbursementProfileDisbursementMethodsResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfileDisbursementMethod data = 1;
     */
    data: DisbursementProfileDisbursementMethod[];
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
 * Describes the message domain.payment.v1.ListDisbursementProfileDisbursementMethodsResponse.
 * Use `create(ListDisbursementProfileDisbursementMethodsResponseSchema)` to create a new message.
 */
export declare const ListDisbursementProfileDisbursementMethodsResponseSchema: GenMessage<ListDisbursementProfileDisbursementMethodsResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileDisbursementMethodListPageDataRequest
 */
export type GetDisbursementProfileDisbursementMethodListPageDataRequest = Message<"domain.payment.v1.GetDisbursementProfileDisbursementMethodListPageDataRequest"> & {
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
 * Describes the message domain.payment.v1.GetDisbursementProfileDisbursementMethodListPageDataRequest.
 * Use `create(GetDisbursementProfileDisbursementMethodListPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementProfileDisbursementMethodListPageDataRequestSchema: GenMessage<GetDisbursementProfileDisbursementMethodListPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileDisbursementMethodListPageDataResponse
 */
export type GetDisbursementProfileDisbursementMethodListPageDataResponse = Message<"domain.payment.v1.GetDisbursementProfileDisbursementMethodListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payment.v1.DisbursementProfileDisbursementMethod disbursement_profile_disbursement_method_list = 1;
     */
    disbursementProfileDisbursementMethodList: DisbursementProfileDisbursementMethod[];
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
 * Describes the message domain.payment.v1.GetDisbursementProfileDisbursementMethodListPageDataResponse.
 * Use `create(GetDisbursementProfileDisbursementMethodListPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementProfileDisbursementMethodListPageDataResponseSchema: GenMessage<GetDisbursementProfileDisbursementMethodListPageDataResponse>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileDisbursementMethodItemPageDataRequest
 */
export type GetDisbursementProfileDisbursementMethodItemPageDataRequest = Message<"domain.payment.v1.GetDisbursementProfileDisbursementMethodItemPageDataRequest"> & {
    /**
     * @generated from field: string disbursement_profile_disbursement_method_id = 1;
     */
    disbursementProfileDisbursementMethodId: string;
};
/**
 * Describes the message domain.payment.v1.GetDisbursementProfileDisbursementMethodItemPageDataRequest.
 * Use `create(GetDisbursementProfileDisbursementMethodItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetDisbursementProfileDisbursementMethodItemPageDataRequestSchema: GenMessage<GetDisbursementProfileDisbursementMethodItemPageDataRequest>;
/**
 * @generated from message domain.payment.v1.GetDisbursementProfileDisbursementMethodItemPageDataResponse
 */
export type GetDisbursementProfileDisbursementMethodItemPageDataResponse = Message<"domain.payment.v1.GetDisbursementProfileDisbursementMethodItemPageDataResponse"> & {
    /**
     * @generated from field: domain.payment.v1.DisbursementProfileDisbursementMethod disbursement_profile_disbursement_method = 1;
     */
    disbursementProfileDisbursementMethod?: DisbursementProfileDisbursementMethod;
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
 * Describes the message domain.payment.v1.GetDisbursementProfileDisbursementMethodItemPageDataResponse.
 * Use `create(GetDisbursementProfileDisbursementMethodItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetDisbursementProfileDisbursementMethodItemPageDataResponseSchema: GenMessage<GetDisbursementProfileDisbursementMethodItemPageDataResponse>;
/**
 * @generated from service domain.payment.v1.DisbursementProfileDisbursementMethodDomainService
 */
export declare const DisbursementProfileDisbursementMethodDomainService: GenService<{
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.CreateDisbursementProfileDisbursementMethod
     */
    createDisbursementProfileDisbursementMethod: {
        methodKind: "unary";
        input: typeof CreateDisbursementProfileDisbursementMethodRequestSchema;
        output: typeof CreateDisbursementProfileDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.ReadDisbursementProfileDisbursementMethod
     */
    readDisbursementProfileDisbursementMethod: {
        methodKind: "unary";
        input: typeof ReadDisbursementProfileDisbursementMethodRequestSchema;
        output: typeof ReadDisbursementProfileDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.UpdateDisbursementProfileDisbursementMethod
     */
    updateDisbursementProfileDisbursementMethod: {
        methodKind: "unary";
        input: typeof UpdateDisbursementProfileDisbursementMethodRequestSchema;
        output: typeof UpdateDisbursementProfileDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.DeleteDisbursementProfileDisbursementMethod
     */
    deleteDisbursementProfileDisbursementMethod: {
        methodKind: "unary";
        input: typeof DeleteDisbursementProfileDisbursementMethodRequestSchema;
        output: typeof DeleteDisbursementProfileDisbursementMethodResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.ListDisbursementProfileDisbursementMethods
     */
    listDisbursementProfileDisbursementMethods: {
        methodKind: "unary";
        input: typeof ListDisbursementProfileDisbursementMethodsRequestSchema;
        output: typeof ListDisbursementProfileDisbursementMethodsResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.GetDisbursementProfileDisbursementMethodListPageData
     */
    getDisbursementProfileDisbursementMethodListPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementProfileDisbursementMethodListPageDataRequestSchema;
        output: typeof GetDisbursementProfileDisbursementMethodListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payment.v1.DisbursementProfileDisbursementMethodDomainService.GetDisbursementProfileDisbursementMethodItemPageData
     */
    getDisbursementProfileDisbursementMethodItemPageData: {
        methodKind: "unary";
        input: typeof GetDisbursementProfileDisbursementMethodItemPageDataRequestSchema;
        output: typeof GetDisbursementProfileDisbursementMethodItemPageDataResponseSchema;
    };
}>;
