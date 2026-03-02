import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Supplier } from "../supplier/supplier_pb";
import type { Attribute } from "../../common/attribute_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier_attribute/supplier_attribute.proto.
 */
export declare const file_domain_entity_supplier_attribute_supplier_attribute: GenFile;
/**
 * @generated from message domain.entity.v1.SupplierAttribute
 */
export type SupplierAttribute = Message<"domain.entity.v1.SupplierAttribute"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string supplier_id = 2;
     */
    supplierId: string;
    /**
     * @generated from field: string attribute_id = 3;
     */
    attributeId: string;
    /**
     * @generated from field: string value = 4;
     */
    value: string;
    /**
     * @generated from field: domain.entity.v1.Supplier supplier = 5;
     */
    supplier?: Supplier;
    /**
     * @generated from field: domain.common.v1.Attribute attribute = 6;
     */
    attribute?: Attribute;
    /**
     * @generated from field: optional int64 date_created = 7;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 8;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 9;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 10;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 11;
     */
    active: boolean;
};
/**
 * Describes the message domain.entity.v1.SupplierAttribute.
 * Use `create(SupplierAttributeSchema)` to create a new message.
 */
export declare const SupplierAttributeSchema: GenMessage<SupplierAttribute>;
/**
 * @generated from message domain.entity.v1.CreateSupplierAttributeRequest
 */
export type CreateSupplierAttributeRequest = Message<"domain.entity.v1.CreateSupplierAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierAttribute data = 1;
     */
    data?: SupplierAttribute;
};
/**
 * Describes the message domain.entity.v1.CreateSupplierAttributeRequest.
 * Use `create(CreateSupplierAttributeRequestSchema)` to create a new message.
 */
export declare const CreateSupplierAttributeRequestSchema: GenMessage<CreateSupplierAttributeRequest>;
/**
 * @generated from message domain.entity.v1.CreateSupplierAttributeResponse
 */
export type CreateSupplierAttributeResponse = Message<"domain.entity.v1.CreateSupplierAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierAttribute data = 1;
     */
    data: SupplierAttribute[];
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
 * Describes the message domain.entity.v1.CreateSupplierAttributeResponse.
 * Use `create(CreateSupplierAttributeResponseSchema)` to create a new message.
 */
export declare const CreateSupplierAttributeResponseSchema: GenMessage<CreateSupplierAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ReadSupplierAttributeRequest
 */
export type ReadSupplierAttributeRequest = Message<"domain.entity.v1.ReadSupplierAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierAttribute data = 1;
     */
    data?: SupplierAttribute;
};
/**
 * Describes the message domain.entity.v1.ReadSupplierAttributeRequest.
 * Use `create(ReadSupplierAttributeRequestSchema)` to create a new message.
 */
export declare const ReadSupplierAttributeRequestSchema: GenMessage<ReadSupplierAttributeRequest>;
/**
 * @generated from message domain.entity.v1.ReadSupplierAttributeResponse
 */
export type ReadSupplierAttributeResponse = Message<"domain.entity.v1.ReadSupplierAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierAttribute data = 1;
     */
    data: SupplierAttribute[];
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
 * Describes the message domain.entity.v1.ReadSupplierAttributeResponse.
 * Use `create(ReadSupplierAttributeResponseSchema)` to create a new message.
 */
export declare const ReadSupplierAttributeResponseSchema: GenMessage<ReadSupplierAttributeResponse>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierAttributeRequest
 */
export type UpdateSupplierAttributeRequest = Message<"domain.entity.v1.UpdateSupplierAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierAttribute data = 1;
     */
    data?: SupplierAttribute;
};
/**
 * Describes the message domain.entity.v1.UpdateSupplierAttributeRequest.
 * Use `create(UpdateSupplierAttributeRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierAttributeRequestSchema: GenMessage<UpdateSupplierAttributeRequest>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierAttributeResponse
 */
export type UpdateSupplierAttributeResponse = Message<"domain.entity.v1.UpdateSupplierAttributeResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierAttribute data = 1;
     */
    data: SupplierAttribute[];
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
 * Describes the message domain.entity.v1.UpdateSupplierAttributeResponse.
 * Use `create(UpdateSupplierAttributeResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierAttributeResponseSchema: GenMessage<UpdateSupplierAttributeResponse>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierAttributeRequest
 */
export type DeleteSupplierAttributeRequest = Message<"domain.entity.v1.DeleteSupplierAttributeRequest"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierAttribute data = 1;
     */
    data?: SupplierAttribute;
};
/**
 * Describes the message domain.entity.v1.DeleteSupplierAttributeRequest.
 * Use `create(DeleteSupplierAttributeRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierAttributeRequestSchema: GenMessage<DeleteSupplierAttributeRequest>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierAttributeResponse
 */
export type DeleteSupplierAttributeResponse = Message<"domain.entity.v1.DeleteSupplierAttributeResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteSupplierAttributeResponse.
 * Use `create(DeleteSupplierAttributeResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierAttributeResponseSchema: GenMessage<DeleteSupplierAttributeResponse>;
/**
 * @generated from message domain.entity.v1.ListSupplierAttributesRequest
 */
export type ListSupplierAttributesRequest = Message<"domain.entity.v1.ListSupplierAttributesRequest"> & {
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
 * Describes the message domain.entity.v1.ListSupplierAttributesRequest.
 * Use `create(ListSupplierAttributesRequestSchema)` to create a new message.
 */
export declare const ListSupplierAttributesRequestSchema: GenMessage<ListSupplierAttributesRequest>;
/**
 * @generated from message domain.entity.v1.ListSupplierAttributesResponse
 */
export type ListSupplierAttributesResponse = Message<"domain.entity.v1.ListSupplierAttributesResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierAttribute data = 1;
     */
    data: SupplierAttribute[];
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
 * Describes the message domain.entity.v1.ListSupplierAttributesResponse.
 * Use `create(ListSupplierAttributesResponseSchema)` to create a new message.
 */
export declare const ListSupplierAttributesResponseSchema: GenMessage<ListSupplierAttributesResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierAttributeListPageDataRequest
 */
export type GetSupplierAttributeListPageDataRequest = Message<"domain.entity.v1.GetSupplierAttributeListPageDataRequest"> & {
    /**
     * @generated from field: domain.common.v1.PaginationRequest pagination = 1;
     */
    pagination?: PaginationRequest;
    /**
     * @generated from field: domain.common.v1.FilterRequest filters = 2;
     */
    filters?: FilterRequest;
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
 * Describes the message domain.entity.v1.GetSupplierAttributeListPageDataRequest.
 * Use `create(GetSupplierAttributeListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierAttributeListPageDataRequestSchema: GenMessage<GetSupplierAttributeListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierAttributeListPageDataResponse
 */
export type GetSupplierAttributeListPageDataResponse = Message<"domain.entity.v1.GetSupplierAttributeListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.SupplierAttribute supplier_attribute_list = 1;
     */
    supplierAttributeList: SupplierAttribute[];
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
 * Describes the message domain.entity.v1.GetSupplierAttributeListPageDataResponse.
 * Use `create(GetSupplierAttributeListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierAttributeListPageDataResponseSchema: GenMessage<GetSupplierAttributeListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierAttributeItemPageDataRequest
 */
export type GetSupplierAttributeItemPageDataRequest = Message<"domain.entity.v1.GetSupplierAttributeItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_attribute_id = 1;
     */
    supplierAttributeId: string;
};
/**
 * Describes the message domain.entity.v1.GetSupplierAttributeItemPageDataRequest.
 * Use `create(GetSupplierAttributeItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierAttributeItemPageDataRequestSchema: GenMessage<GetSupplierAttributeItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierAttributeItemPageDataResponse
 */
export type GetSupplierAttributeItemPageDataResponse = Message<"domain.entity.v1.GetSupplierAttributeItemPageDataResponse"> & {
    /**
     * @generated from field: domain.entity.v1.SupplierAttribute supplier_attribute = 1;
     */
    supplierAttribute?: SupplierAttribute;
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
 * Describes the message domain.entity.v1.GetSupplierAttributeItemPageDataResponse.
 * Use `create(GetSupplierAttributeItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierAttributeItemPageDataResponseSchema: GenMessage<GetSupplierAttributeItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.SupplierAttributeDomainService
 */
export declare const SupplierAttributeDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.CreateSupplierAttribute
     */
    createSupplierAttribute: {
        methodKind: "unary";
        input: typeof CreateSupplierAttributeRequestSchema;
        output: typeof CreateSupplierAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.ReadSupplierAttribute
     */
    readSupplierAttribute: {
        methodKind: "unary";
        input: typeof ReadSupplierAttributeRequestSchema;
        output: typeof ReadSupplierAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.UpdateSupplierAttribute
     */
    updateSupplierAttribute: {
        methodKind: "unary";
        input: typeof UpdateSupplierAttributeRequestSchema;
        output: typeof UpdateSupplierAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.DeleteSupplierAttribute
     */
    deleteSupplierAttribute: {
        methodKind: "unary";
        input: typeof DeleteSupplierAttributeRequestSchema;
        output: typeof DeleteSupplierAttributeResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.ListSupplierAttributes
     */
    listSupplierAttributes: {
        methodKind: "unary";
        input: typeof ListSupplierAttributesRequestSchema;
        output: typeof ListSupplierAttributesResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.GetSupplierAttributeListPageData
     */
    getSupplierAttributeListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierAttributeListPageDataRequestSchema;
        output: typeof GetSupplierAttributeListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierAttributeDomainService.GetSupplierAttributeItemPageData
     */
    getSupplierAttributeItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierAttributeItemPageDataRequestSchema;
        output: typeof GetSupplierAttributeItemPageDataResponseSchema;
    };
}>;
