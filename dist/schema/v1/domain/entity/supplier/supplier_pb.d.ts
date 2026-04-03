import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { User } from "../user/user_pb";
import type { SupplierCategory } from "../supplier_category/supplier_category_pb";
import type { PaymentTerm } from "../payment_term/payment_term_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/entity/supplier/supplier.proto.
 */
export declare const file_domain_entity_supplier_supplier: GenFile;
/**
 * FK References: expenditure.supplier_id, asset.supplier_id,
 * asset_maintenance.supplier_id, supplier_category.supplier_id,
 * supplier_attribute.supplier_id
 *
 * @generated from message domain.entity.v1.Supplier
 */
export type Supplier = Message<"domain.entity.v1.Supplier"> & {
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
     * @generated from field: string internal_id = 9;
     */
    internalId: string;
    /**
     * @generated from field: optional string category_id = 10;
     */
    categoryId?: string;
    /**
     * @generated from field: optional domain.entity.v1.SupplierCategory category = 11;
     */
    category?: SupplierCategory;
    /**
     * "company" or "individual"
     *
     * @generated from field: string supplier_type = 12;
     */
    supplierType: string;
    /**
     * @generated from field: string company_name = 13;
     */
    companyName: string;
    /**
     * TIN/VAT/EIN
     *
     * @generated from field: optional string tax_id = 14;
     */
    taxId?: string;
    /**
     * Business registration number
     *
     * @generated from field: optional string registration_number = 15;
     */
    registrationNumber?: string;
    /**
     * @generated from field: optional string street_address = 16;
     */
    streetAddress?: string;
    /**
     * @generated from field: optional string city = 17;
     */
    city?: string;
    /**
     * @generated from field: optional string province = 18;
     */
    province?: string;
    /**
     * @generated from field: optional string postal_code = 19;
     */
    postalCode?: string;
    /**
     * ISO 3166 country code
     *
     * @generated from field: optional string country = 20;
     */
    country?: string;
    /**
     * ISO 4217 currency code
     *
     * @generated from field: optional string default_currency = 21;
     */
    defaultCurrency?: string;
    /**
     * "net_30", "net_60", "2_10_net_30", "immediate"
     *
     * @generated from field: optional string payment_terms = 22;
     */
    paymentTerms?: string;
    /**
     * Default delivery lead time
     *
     * @generated from field: optional int32 lead_time_days = 23;
     */
    leadTimeDays?: number;
    /**
     * Maximum outstanding payable
     *
     * @generated from field: optional double credit_limit = 24;
     */
    creditLimit?: number;
    /**
     * "active", "blocked", "on_hold"
     *
     * @generated from field: optional string status = 25;
     */
    status?: string;
    /**
     * @generated from field: optional string client_id = 26;
     */
    clientId?: string;
    /**
     * @generated from field: optional string website = 27;
     */
    website?: string;
    /**
     * @generated from field: optional string notes = 28;
     */
    notes?: string;
    /**
     * @generated from field: repeated domain.entity.v1.SupplierCategory categories = 29;
     */
    categories: SupplierCategory[];
    /**
     * @generated from field: optional string payment_term_id = 30;
     */
    paymentTermId?: string;
    /**
     * @generated from field: optional domain.entity.v1.PaymentTerm payment_term = 31;
     */
    paymentTerm?: PaymentTerm;
};
/**
 * Describes the message domain.entity.v1.Supplier.
 * Use `create(SupplierSchema)` to create a new message.
 */
export declare const SupplierSchema: GenMessage<Supplier>;
/**
 * @generated from message domain.entity.v1.CreateSupplierRequest
 */
export type CreateSupplierRequest = Message<"domain.entity.v1.CreateSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Supplier data = 1;
     */
    data?: Supplier;
};
/**
 * Describes the message domain.entity.v1.CreateSupplierRequest.
 * Use `create(CreateSupplierRequestSchema)` to create a new message.
 */
export declare const CreateSupplierRequestSchema: GenMessage<CreateSupplierRequest>;
/**
 * @generated from message domain.entity.v1.CreateSupplierResponse
 */
export type CreateSupplierResponse = Message<"domain.entity.v1.CreateSupplierResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Supplier data = 1;
     */
    data: Supplier[];
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
 * Describes the message domain.entity.v1.CreateSupplierResponse.
 * Use `create(CreateSupplierResponseSchema)` to create a new message.
 */
export declare const CreateSupplierResponseSchema: GenMessage<CreateSupplierResponse>;
/**
 * @generated from message domain.entity.v1.ReadSupplierRequest
 */
export type ReadSupplierRequest = Message<"domain.entity.v1.ReadSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Supplier data = 1;
     */
    data?: Supplier;
};
/**
 * Describes the message domain.entity.v1.ReadSupplierRequest.
 * Use `create(ReadSupplierRequestSchema)` to create a new message.
 */
export declare const ReadSupplierRequestSchema: GenMessage<ReadSupplierRequest>;
/**
 * @generated from message domain.entity.v1.ReadSupplierResponse
 */
export type ReadSupplierResponse = Message<"domain.entity.v1.ReadSupplierResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Supplier data = 1;
     */
    data: Supplier[];
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
 * Describes the message domain.entity.v1.ReadSupplierResponse.
 * Use `create(ReadSupplierResponseSchema)` to create a new message.
 */
export declare const ReadSupplierResponseSchema: GenMessage<ReadSupplierResponse>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierRequest
 */
export type UpdateSupplierRequest = Message<"domain.entity.v1.UpdateSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Supplier data = 1;
     */
    data?: Supplier;
};
/**
 * Describes the message domain.entity.v1.UpdateSupplierRequest.
 * Use `create(UpdateSupplierRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierRequestSchema: GenMessage<UpdateSupplierRequest>;
/**
 * @generated from message domain.entity.v1.UpdateSupplierResponse
 */
export type UpdateSupplierResponse = Message<"domain.entity.v1.UpdateSupplierResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Supplier data = 1;
     */
    data: Supplier[];
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
 * Describes the message domain.entity.v1.UpdateSupplierResponse.
 * Use `create(UpdateSupplierResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierResponseSchema: GenMessage<UpdateSupplierResponse>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierRequest
 */
export type DeleteSupplierRequest = Message<"domain.entity.v1.DeleteSupplierRequest"> & {
    /**
     * @generated from field: domain.entity.v1.Supplier data = 1;
     */
    data?: Supplier;
};
/**
 * Describes the message domain.entity.v1.DeleteSupplierRequest.
 * Use `create(DeleteSupplierRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierRequestSchema: GenMessage<DeleteSupplierRequest>;
/**
 * @generated from message domain.entity.v1.DeleteSupplierResponse
 */
export type DeleteSupplierResponse = Message<"domain.entity.v1.DeleteSupplierResponse"> & {
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
 * Describes the message domain.entity.v1.DeleteSupplierResponse.
 * Use `create(DeleteSupplierResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierResponseSchema: GenMessage<DeleteSupplierResponse>;
/**
 * @generated from message domain.entity.v1.ListSuppliersRequest
 */
export type ListSuppliersRequest = Message<"domain.entity.v1.ListSuppliersRequest"> & {
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
 * Describes the message domain.entity.v1.ListSuppliersRequest.
 * Use `create(ListSuppliersRequestSchema)` to create a new message.
 */
export declare const ListSuppliersRequestSchema: GenMessage<ListSuppliersRequest>;
/**
 * @generated from message domain.entity.v1.ListSuppliersResponse
 */
export type ListSuppliersResponse = Message<"domain.entity.v1.ListSuppliersResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Supplier data = 1;
     */
    data: Supplier[];
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
 * Describes the message domain.entity.v1.ListSuppliersResponse.
 * Use `create(ListSuppliersResponseSchema)` to create a new message.
 */
export declare const ListSuppliersResponseSchema: GenMessage<ListSuppliersResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierListPageDataRequest
 */
export type GetSupplierListPageDataRequest = Message<"domain.entity.v1.GetSupplierListPageDataRequest"> & {
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
 * Describes the message domain.entity.v1.GetSupplierListPageDataRequest.
 * Use `create(GetSupplierListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierListPageDataRequestSchema: GenMessage<GetSupplierListPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierListPageDataResponse
 */
export type GetSupplierListPageDataResponse = Message<"domain.entity.v1.GetSupplierListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.entity.v1.Supplier supplier_list = 1;
     */
    supplierList: Supplier[];
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
 * Describes the message domain.entity.v1.GetSupplierListPageDataResponse.
 * Use `create(GetSupplierListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierListPageDataResponseSchema: GenMessage<GetSupplierListPageDataResponse>;
/**
 * @generated from message domain.entity.v1.GetSupplierItemPageDataRequest
 */
export type GetSupplierItemPageDataRequest = Message<"domain.entity.v1.GetSupplierItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_id = 1;
     */
    supplierId: string;
};
/**
 * Describes the message domain.entity.v1.GetSupplierItemPageDataRequest.
 * Use `create(GetSupplierItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierItemPageDataRequestSchema: GenMessage<GetSupplierItemPageDataRequest>;
/**
 * @generated from message domain.entity.v1.GetSupplierItemPageDataResponse
 */
export type GetSupplierItemPageDataResponse = Message<"domain.entity.v1.GetSupplierItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.entity.v1.Supplier supplier = 1;
     */
    supplier?: Supplier;
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
 * Describes the message domain.entity.v1.GetSupplierItemPageDataResponse.
 * Use `create(GetSupplierItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierItemPageDataResponseSchema: GenMessage<GetSupplierItemPageDataResponse>;
/**
 * @generated from service domain.entity.v1.SupplierDomainService
 */
export declare const SupplierDomainService: GenService<{
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.CreateSupplier
     */
    createSupplier: {
        methodKind: "unary";
        input: typeof CreateSupplierRequestSchema;
        output: typeof CreateSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.ReadSupplier
     */
    readSupplier: {
        methodKind: "unary";
        input: typeof ReadSupplierRequestSchema;
        output: typeof ReadSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.UpdateSupplier
     */
    updateSupplier: {
        methodKind: "unary";
        input: typeof UpdateSupplierRequestSchema;
        output: typeof UpdateSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.DeleteSupplier
     */
    deleteSupplier: {
        methodKind: "unary";
        input: typeof DeleteSupplierRequestSchema;
        output: typeof DeleteSupplierResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.ListSuppliers
     */
    listSuppliers: {
        methodKind: "unary";
        input: typeof ListSuppliersRequestSchema;
        output: typeof ListSuppliersResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.GetSupplierListPageData
     */
    getSupplierListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierListPageDataRequestSchema;
        output: typeof GetSupplierListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.entity.v1.SupplierDomainService.GetSupplierItemPageData
     */
    getSupplierItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierItemPageDataRequestSchema;
        output: typeof GetSupplierItemPageDataResponseSchema;
    };
}>;
