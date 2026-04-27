import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SupplierContract } from "../supplier_contract/supplier_contract_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/supplier_contract_line/supplier_contract_line.proto.
 */
export declare const file_domain_expenditure_supplier_contract_line_supplier_contract_line: GenFile;
/**
 * SupplierContractLine is a line item within a SupplierContract.
 * Real contracts often have multiple lines: "50 seats @ $10/mo + 100GB storage @ $0.50/GB".
 * Each line may have its own treatment, account, and date window.
 *
 * @generated from message domain.expenditure.v1.SupplierContractLine
 */
export type SupplierContractLine = Message<"domain.expenditure.v1.SupplierContractLine"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent contract
     *
     * @generated from field: string supplier_contract_id = 2;
     */
    supplierContractId: string;
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContract supplier_contract = 3;
     */
    supplierContract?: SupplierContract;
    /**
     * Product (optional — may be a bespoke line with no catalog product)
     *
     * @generated from field: optional string product_id = 4;
     */
    productId?: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 5;
     */
    product?: Product;
    /**
     * Line details
     *
     * @generated from field: string description = 6;
     */
    description: string;
    /**
     * "goods" | "service" | "expense"
     *
     * @generated from field: string line_type = 7;
     */
    lineType: string;
    /**
     * @generated from field: double quantity = 8;
     */
    quantity: number;
    /**
     * centavos
     *
     * @generated from field: int64 unit_price = 9;
     */
    unitPrice: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_amount = 10;
     */
    totalAmount: bigint;
    /**
     * Treatment — drives how the line is accounted and billed
     *
     * @generated from field: domain.expenditure.v1.SupplierContractLineTreatment treatment = 11;
     */
    treatment: SupplierContractLineTreatment;
    /**
     * Date window (may differ from parent contract window for multi-phase contracts)
     *
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 12;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 13;
     */
    endDate?: string;
    /**
     * GL mapping (overrides header-level if set)
     *
     * @generated from field: optional string expenditure_category_id = 14;
     */
    expenditureCategoryId?: string;
    /**
     * @generated from field: optional string expense_account_id = 15;
     */
    expenseAccountId?: string;
    /**
     * Receiving location
     *
     * @generated from field: optional string location_id = 16;
     */
    locationId?: string;
    /**
     * Display ordering
     *
     * @generated from field: int32 line_number = 17;
     */
    lineNumber: number;
    /**
     * Audit
     *
     * @generated from field: bool active = 18;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 19;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 20;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 21;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 22;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.expenditure.v1.SupplierContractLine.
 * Use `create(SupplierContractLineSchema)` to create a new message.
 */
export declare const SupplierContractLineSchema: GenMessage<SupplierContractLine>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractLineRequest
 */
export type CreateSupplierContractLineRequest = Message<"domain.expenditure.v1.CreateSupplierContractLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data?: SupplierContractLine;
};
/**
 * Describes the message domain.expenditure.v1.CreateSupplierContractLineRequest.
 * Use `create(CreateSupplierContractLineRequestSchema)` to create a new message.
 */
export declare const CreateSupplierContractLineRequestSchema: GenMessage<CreateSupplierContractLineRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractLineResponse
 */
export type CreateSupplierContractLineResponse = Message<"domain.expenditure.v1.CreateSupplierContractLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data: SupplierContractLine[];
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
 * Describes the message domain.expenditure.v1.CreateSupplierContractLineResponse.
 * Use `create(CreateSupplierContractLineResponseSchema)` to create a new message.
 */
export declare const CreateSupplierContractLineResponseSchema: GenMessage<CreateSupplierContractLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractLineRequest
 */
export type ReadSupplierContractLineRequest = Message<"domain.expenditure.v1.ReadSupplierContractLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data?: SupplierContractLine;
};
/**
 * Describes the message domain.expenditure.v1.ReadSupplierContractLineRequest.
 * Use `create(ReadSupplierContractLineRequestSchema)` to create a new message.
 */
export declare const ReadSupplierContractLineRequestSchema: GenMessage<ReadSupplierContractLineRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractLineResponse
 */
export type ReadSupplierContractLineResponse = Message<"domain.expenditure.v1.ReadSupplierContractLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data: SupplierContractLine[];
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
 * Describes the message domain.expenditure.v1.ReadSupplierContractLineResponse.
 * Use `create(ReadSupplierContractLineResponseSchema)` to create a new message.
 */
export declare const ReadSupplierContractLineResponseSchema: GenMessage<ReadSupplierContractLineResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractLineRequest
 */
export type UpdateSupplierContractLineRequest = Message<"domain.expenditure.v1.UpdateSupplierContractLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data?: SupplierContractLine;
};
/**
 * Describes the message domain.expenditure.v1.UpdateSupplierContractLineRequest.
 * Use `create(UpdateSupplierContractLineRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierContractLineRequestSchema: GenMessage<UpdateSupplierContractLineRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractLineResponse
 */
export type UpdateSupplierContractLineResponse = Message<"domain.expenditure.v1.UpdateSupplierContractLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data: SupplierContractLine[];
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
 * Describes the message domain.expenditure.v1.UpdateSupplierContractLineResponse.
 * Use `create(UpdateSupplierContractLineResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierContractLineResponseSchema: GenMessage<UpdateSupplierContractLineResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractLineRequest
 */
export type DeleteSupplierContractLineRequest = Message<"domain.expenditure.v1.DeleteSupplierContractLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data?: SupplierContractLine;
};
/**
 * Describes the message domain.expenditure.v1.DeleteSupplierContractLineRequest.
 * Use `create(DeleteSupplierContractLineRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierContractLineRequestSchema: GenMessage<DeleteSupplierContractLineRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractLineResponse
 */
export type DeleteSupplierContractLineResponse = Message<"domain.expenditure.v1.DeleteSupplierContractLineResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteSupplierContractLineResponse.
 * Use `create(DeleteSupplierContractLineResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierContractLineResponseSchema: GenMessage<DeleteSupplierContractLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractLinesRequest
 */
export type ListSupplierContractLinesRequest = Message<"domain.expenditure.v1.ListSupplierContractLinesRequest"> & {
    /**
     * @generated from field: optional string supplier_contract_id = 1;
     */
    supplierContractId?: string;
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
 * Describes the message domain.expenditure.v1.ListSupplierContractLinesRequest.
 * Use `create(ListSupplierContractLinesRequestSchema)` to create a new message.
 */
export declare const ListSupplierContractLinesRequestSchema: GenMessage<ListSupplierContractLinesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractLinesResponse
 */
export type ListSupplierContractLinesResponse = Message<"domain.expenditure.v1.ListSupplierContractLinesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractLine data = 1;
     */
    data: SupplierContractLine[];
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
 * Describes the message domain.expenditure.v1.ListSupplierContractLinesResponse.
 * Use `create(ListSupplierContractLinesResponseSchema)` to create a new message.
 */
export declare const ListSupplierContractLinesResponseSchema: GenMessage<ListSupplierContractLinesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractLineListPageDataRequest
 */
export type GetSupplierContractLineListPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractLineListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetSupplierContractLineListPageDataRequest.
 * Use `create(GetSupplierContractLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractLineListPageDataRequestSchema: GenMessage<GetSupplierContractLineListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractLineListPageDataResponse
 */
export type GetSupplierContractLineListPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractLine supplier_contract_line_list = 1;
     */
    supplierContractLineList: SupplierContractLine[];
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
 * Describes the message domain.expenditure.v1.GetSupplierContractLineListPageDataResponse.
 * Use `create(GetSupplierContractLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractLineListPageDataResponseSchema: GenMessage<GetSupplierContractLineListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractLineItemPageDataRequest
 */
export type GetSupplierContractLineItemPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractLineItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_contract_line_id = 1;
     */
    supplierContractLineId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetSupplierContractLineItemPageDataRequest.
 * Use `create(GetSupplierContractLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractLineItemPageDataRequestSchema: GenMessage<GetSupplierContractLineItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractLineItemPageDataResponse
 */
export type GetSupplierContractLineItemPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractLine supplier_contract_line = 1;
     */
    supplierContractLine?: SupplierContractLine;
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
 * Describes the message domain.expenditure.v1.GetSupplierContractLineItemPageDataResponse.
 * Use `create(GetSupplierContractLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractLineItemPageDataResponseSchema: GenMessage<GetSupplierContractLineItemPageDataResponse>;
/**
 * SupplierContractLineTreatment mirrors ProductPricePlan.BillingTreatment on the
 * revenue side. MINIMUM_COMMITMENT is the supplier-side addition.
 *
 * @generated from enum domain.expenditure.v1.SupplierContractLineTreatment
 */
export declare enum SupplierContractLineTreatment {
    /**
     * @generated from enum value: SUPPLIER_CONTRACT_LINE_TREATMENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * fixed recurring charge per cycle
     *
     * @generated from enum value: SUPPLIER_CONTRACT_LINE_TREATMENT_RECURRING = 1;
     */
    RECURRING = 1,
    /**
     * single non-recurring charge
     *
     * @generated from enum value: SUPPLIER_CONTRACT_LINE_TREATMENT_ONE_TIME = 2;
     */
    ONE_TIME = 2,
    /**
     * variable, metered consumption
     *
     * @generated from enum value: SUPPLIER_CONTRACT_LINE_TREATMENT_USAGE_BASED = 3;
     */
    USAGE_BASED = 3,
    /**
     * floor commitment (pay-at-least-X)
     *
     * @generated from enum value: SUPPLIER_CONTRACT_LINE_TREATMENT_MINIMUM_COMMITMENT = 4;
     */
    MINIMUM_COMMITMENT = 4
}
/**
 * Describes the enum domain.expenditure.v1.SupplierContractLineTreatment.
 */
export declare const SupplierContractLineTreatmentSchema: GenEnum<SupplierContractLineTreatment>;
/**
 * @generated from service domain.expenditure.v1.SupplierContractLineDomainService
 */
export declare const SupplierContractLineDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.CreateSupplierContractLine
     */
    createSupplierContractLine: {
        methodKind: "unary";
        input: typeof CreateSupplierContractLineRequestSchema;
        output: typeof CreateSupplierContractLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.ReadSupplierContractLine
     */
    readSupplierContractLine: {
        methodKind: "unary";
        input: typeof ReadSupplierContractLineRequestSchema;
        output: typeof ReadSupplierContractLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.UpdateSupplierContractLine
     */
    updateSupplierContractLine: {
        methodKind: "unary";
        input: typeof UpdateSupplierContractLineRequestSchema;
        output: typeof UpdateSupplierContractLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.DeleteSupplierContractLine
     */
    deleteSupplierContractLine: {
        methodKind: "unary";
        input: typeof DeleteSupplierContractLineRequestSchema;
        output: typeof DeleteSupplierContractLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.ListSupplierContractLines
     */
    listSupplierContractLines: {
        methodKind: "unary";
        input: typeof ListSupplierContractLinesRequestSchema;
        output: typeof ListSupplierContractLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.GetSupplierContractLineListPageData
     */
    getSupplierContractLineListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractLineListPageDataRequestSchema;
        output: typeof GetSupplierContractLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractLineDomainService.GetSupplierContractLineItemPageData
     */
    getSupplierContractLineItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractLineItemPageDataRequestSchema;
        output: typeof GetSupplierContractLineItemPageDataResponseSchema;
    };
}>;
