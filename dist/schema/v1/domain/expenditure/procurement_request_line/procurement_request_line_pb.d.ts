import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { ProcurementRequest } from "../procurement_request/procurement_request_pb";
import type { Product } from "../../product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/procurement_request_line/procurement_request_line.proto.
 */
export declare const file_domain_expenditure_procurement_request_line_procurement_request_line: GenFile;
/**
 * ProcurementRequestLine is a line item on a ProcurementRequest.
 * It may optionally pre-link to a SupplierContractLine if the item is
 * already covered by a standing contract.
 *
 * @generated from message domain.expenditure.v1.ProcurementRequestLine
 */
export type ProcurementRequestLine = Message<"domain.expenditure.v1.ProcurementRequestLine"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Parent request
     *
     * @generated from field: string procurement_request_id = 2;
     */
    procurementRequestId: string;
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequest procurement_request = 3;
     */
    procurementRequest?: ProcurementRequest;
    /**
     * Product (optional)
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
     * @generated from field: int64 estimated_unit_price = 9;
     */
    estimatedUnitPrice: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 estimated_total_price = 10;
     */
    estimatedTotalPrice: bigint;
    /**
     * Pre-link to a contract line if the item is covered by a standing contract
     *
     * FK to supplier_contract_line (no DB constraint)
     *
     * @generated from field: optional string supplier_contract_line_id = 11;
     */
    supplierContractLineId?: string;
    /**
     * GL / categorization
     *
     * @generated from field: optional string expenditure_category_id = 12;
     */
    expenditureCategoryId?: string;
    /**
     * @generated from field: optional string expense_account_id = 13;
     */
    expenseAccountId?: string;
    /**
     * Receiving location
     *
     * @generated from field: optional string location_id = 14;
     */
    locationId?: string;
    /**
     * Display ordering
     *
     * @generated from field: int32 line_number = 15;
     */
    lineNumber: number;
    /**
     * Audit
     *
     * @generated from field: bool active = 16;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 17;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 18;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 19;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 20;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.expenditure.v1.ProcurementRequestLine.
 * Use `create(ProcurementRequestLineSchema)` to create a new message.
 */
export declare const ProcurementRequestLineSchema: GenMessage<ProcurementRequestLine>;
/**
 * @generated from message domain.expenditure.v1.CreateProcurementRequestLineRequest
 */
export type CreateProcurementRequestLineRequest = Message<"domain.expenditure.v1.CreateProcurementRequestLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data?: ProcurementRequestLine;
};
/**
 * Describes the message domain.expenditure.v1.CreateProcurementRequestLineRequest.
 * Use `create(CreateProcurementRequestLineRequestSchema)` to create a new message.
 */
export declare const CreateProcurementRequestLineRequestSchema: GenMessage<CreateProcurementRequestLineRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateProcurementRequestLineResponse
 */
export type CreateProcurementRequestLineResponse = Message<"domain.expenditure.v1.CreateProcurementRequestLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data: ProcurementRequestLine[];
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
 * Describes the message domain.expenditure.v1.CreateProcurementRequestLineResponse.
 * Use `create(CreateProcurementRequestLineResponseSchema)` to create a new message.
 */
export declare const CreateProcurementRequestLineResponseSchema: GenMessage<CreateProcurementRequestLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadProcurementRequestLineRequest
 */
export type ReadProcurementRequestLineRequest = Message<"domain.expenditure.v1.ReadProcurementRequestLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data?: ProcurementRequestLine;
};
/**
 * Describes the message domain.expenditure.v1.ReadProcurementRequestLineRequest.
 * Use `create(ReadProcurementRequestLineRequestSchema)` to create a new message.
 */
export declare const ReadProcurementRequestLineRequestSchema: GenMessage<ReadProcurementRequestLineRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadProcurementRequestLineResponse
 */
export type ReadProcurementRequestLineResponse = Message<"domain.expenditure.v1.ReadProcurementRequestLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data: ProcurementRequestLine[];
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
 * Describes the message domain.expenditure.v1.ReadProcurementRequestLineResponse.
 * Use `create(ReadProcurementRequestLineResponseSchema)` to create a new message.
 */
export declare const ReadProcurementRequestLineResponseSchema: GenMessage<ReadProcurementRequestLineResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateProcurementRequestLineRequest
 */
export type UpdateProcurementRequestLineRequest = Message<"domain.expenditure.v1.UpdateProcurementRequestLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data?: ProcurementRequestLine;
};
/**
 * Describes the message domain.expenditure.v1.UpdateProcurementRequestLineRequest.
 * Use `create(UpdateProcurementRequestLineRequestSchema)` to create a new message.
 */
export declare const UpdateProcurementRequestLineRequestSchema: GenMessage<UpdateProcurementRequestLineRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateProcurementRequestLineResponse
 */
export type UpdateProcurementRequestLineResponse = Message<"domain.expenditure.v1.UpdateProcurementRequestLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data: ProcurementRequestLine[];
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
 * Describes the message domain.expenditure.v1.UpdateProcurementRequestLineResponse.
 * Use `create(UpdateProcurementRequestLineResponseSchema)` to create a new message.
 */
export declare const UpdateProcurementRequestLineResponseSchema: GenMessage<UpdateProcurementRequestLineResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteProcurementRequestLineRequest
 */
export type DeleteProcurementRequestLineRequest = Message<"domain.expenditure.v1.DeleteProcurementRequestLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data?: ProcurementRequestLine;
};
/**
 * Describes the message domain.expenditure.v1.DeleteProcurementRequestLineRequest.
 * Use `create(DeleteProcurementRequestLineRequestSchema)` to create a new message.
 */
export declare const DeleteProcurementRequestLineRequestSchema: GenMessage<DeleteProcurementRequestLineRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteProcurementRequestLineResponse
 */
export type DeleteProcurementRequestLineResponse = Message<"domain.expenditure.v1.DeleteProcurementRequestLineResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteProcurementRequestLineResponse.
 * Use `create(DeleteProcurementRequestLineResponseSchema)` to create a new message.
 */
export declare const DeleteProcurementRequestLineResponseSchema: GenMessage<DeleteProcurementRequestLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ListProcurementRequestLinesRequest
 */
export type ListProcurementRequestLinesRequest = Message<"domain.expenditure.v1.ListProcurementRequestLinesRequest"> & {
    /**
     * @generated from field: optional string procurement_request_id = 1;
     */
    procurementRequestId?: string;
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
 * Describes the message domain.expenditure.v1.ListProcurementRequestLinesRequest.
 * Use `create(ListProcurementRequestLinesRequestSchema)` to create a new message.
 */
export declare const ListProcurementRequestLinesRequestSchema: GenMessage<ListProcurementRequestLinesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListProcurementRequestLinesResponse
 */
export type ListProcurementRequestLinesResponse = Message<"domain.expenditure.v1.ListProcurementRequestLinesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequestLine data = 1;
     */
    data: ProcurementRequestLine[];
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
 * Describes the message domain.expenditure.v1.ListProcurementRequestLinesResponse.
 * Use `create(ListProcurementRequestLinesResponseSchema)` to create a new message.
 */
export declare const ListProcurementRequestLinesResponseSchema: GenMessage<ListProcurementRequestLinesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestLineListPageDataRequest
 */
export type GetProcurementRequestLineListPageDataRequest = Message<"domain.expenditure.v1.GetProcurementRequestLineListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetProcurementRequestLineListPageDataRequest.
 * Use `create(GetProcurementRequestLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetProcurementRequestLineListPageDataRequestSchema: GenMessage<GetProcurementRequestLineListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestLineListPageDataResponse
 */
export type GetProcurementRequestLineListPageDataResponse = Message<"domain.expenditure.v1.GetProcurementRequestLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ProcurementRequestLine procurement_request_line_list = 1;
     */
    procurementRequestLineList: ProcurementRequestLine[];
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
 * Describes the message domain.expenditure.v1.GetProcurementRequestLineListPageDataResponse.
 * Use `create(GetProcurementRequestLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetProcurementRequestLineListPageDataResponseSchema: GenMessage<GetProcurementRequestLineListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestLineItemPageDataRequest
 */
export type GetProcurementRequestLineItemPageDataRequest = Message<"domain.expenditure.v1.GetProcurementRequestLineItemPageDataRequest"> & {
    /**
     * @generated from field: string procurement_request_line_id = 1;
     */
    procurementRequestLineId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetProcurementRequestLineItemPageDataRequest.
 * Use `create(GetProcurementRequestLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetProcurementRequestLineItemPageDataRequestSchema: GenMessage<GetProcurementRequestLineItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetProcurementRequestLineItemPageDataResponse
 */
export type GetProcurementRequestLineItemPageDataResponse = Message<"domain.expenditure.v1.GetProcurementRequestLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ProcurementRequestLine procurement_request_line = 1;
     */
    procurementRequestLine?: ProcurementRequestLine;
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
 * Describes the message domain.expenditure.v1.GetProcurementRequestLineItemPageDataResponse.
 * Use `create(GetProcurementRequestLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetProcurementRequestLineItemPageDataResponseSchema: GenMessage<GetProcurementRequestLineItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.ProcurementRequestLineDomainService
 */
export declare const ProcurementRequestLineDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.CreateProcurementRequestLine
     */
    createProcurementRequestLine: {
        methodKind: "unary";
        input: typeof CreateProcurementRequestLineRequestSchema;
        output: typeof CreateProcurementRequestLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.ReadProcurementRequestLine
     */
    readProcurementRequestLine: {
        methodKind: "unary";
        input: typeof ReadProcurementRequestLineRequestSchema;
        output: typeof ReadProcurementRequestLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.UpdateProcurementRequestLine
     */
    updateProcurementRequestLine: {
        methodKind: "unary";
        input: typeof UpdateProcurementRequestLineRequestSchema;
        output: typeof UpdateProcurementRequestLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.DeleteProcurementRequestLine
     */
    deleteProcurementRequestLine: {
        methodKind: "unary";
        input: typeof DeleteProcurementRequestLineRequestSchema;
        output: typeof DeleteProcurementRequestLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.ListProcurementRequestLines
     */
    listProcurementRequestLines: {
        methodKind: "unary";
        input: typeof ListProcurementRequestLinesRequestSchema;
        output: typeof ListProcurementRequestLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.GetProcurementRequestLineListPageData
     */
    getProcurementRequestLineListPageData: {
        methodKind: "unary";
        input: typeof GetProcurementRequestLineListPageDataRequestSchema;
        output: typeof GetProcurementRequestLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ProcurementRequestLineDomainService.GetProcurementRequestLineItemPageData
     */
    getProcurementRequestLineItemPageData: {
        methodKind: "unary";
        input: typeof GetProcurementRequestLineItemPageDataRequestSchema;
        output: typeof GetProcurementRequestLineItemPageDataResponseSchema;
    };
}>;
