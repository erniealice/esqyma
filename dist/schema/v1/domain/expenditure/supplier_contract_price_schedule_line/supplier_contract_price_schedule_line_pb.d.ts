import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SupplierContractPriceSchedule } from "../supplier_contract_price_schedule/supplier_contract_price_schedule_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/supplier_contract_price_schedule_line/supplier_contract_price_schedule_line.proto.
 */
export declare const file_domain_expenditure_supplier_contract_price_schedule_line_supplier_contract_price_schedule_line: GenFile;
/**
 * SupplierContractPriceScheduleLine is the per-line, per-window pricing
 * override row. One row per (SupplierContractLine × SupplierContractPriceSchedule).
 *
 * Resolution rule (use-case layer): when ResolveActiveScheduleLine(
 * contract_line_id, asOf) is called, the use case picks the active
 * schedule whose half-open window contains asOf and joins on
 * (schedule_id, contract_line_id). If a row exists, its unit_price is
 * used; otherwise fall back to SupplierContractLine.unit_price. Mirrors
 * the sales-side rate-card precedence (Model D refactor).
 *
 * @generated from message domain.expenditure.v1.SupplierContractPriceScheduleLine
 */
export type SupplierContractPriceScheduleLine = Message<"domain.expenditure.v1.SupplierContractPriceScheduleLine"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * Audit
     *
     * @generated from field: optional int64 date_created = 3;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 4;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 5;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 6;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 7;
     */
    active: boolean;
    /**
     * Parent schedule (the date window)
     *
     * @generated from field: string supplier_contract_price_schedule_id = 10;
     */
    supplierContractPriceScheduleId: string;
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractPriceSchedule supplier_contract_price_schedule = 11;
     */
    supplierContractPriceSchedule?: SupplierContractPriceSchedule;
    /**
     * The contract line being priced for this window
     *
     * @generated from field: string supplier_contract_line_id = 12;
     */
    supplierContractLineId: string;
    /**
     * Money — overrides SupplierContractLine.unit_price for this window
     *
     * @generated from field: string currency = 20;
     */
    currency: string;
    /**
     * centavos
     *
     * @generated from field: int64 unit_price = 21;
     */
    unitPrice: bigint;
    /**
     * for MINIMUM_COMMITMENT treatment
     *
     * @generated from field: optional int64 minimum_amount = 22;
     */
    minimumAmount?: bigint;
    /**
     * optional committed quantity (BLANKET / MINIMUM_COMMITMENT)
     *
     * @generated from field: optional double quantity = 23;
     */
    quantity?: number;
    /**
     * Cycle override — most lines inherit cycle from the parent contract.
     * Some lines (utility tiers, indexed escalators) need cycle-specific overrides.
     *
     * @generated from field: optional int32 cycle_value_override = 30;
     */
    cycleValueOverride?: number;
    /**
     * @generated from field: optional string cycle_unit_override = 31;
     */
    cycleUnitOverride?: string;
    /**
     * Notes
     *
     * @generated from field: optional string notes = 50;
     */
    notes?: string;
    /**
     * @generated from field: map<string, string> metadata = 51;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message domain.expenditure.v1.SupplierContractPriceScheduleLine.
 * Use `create(SupplierContractPriceScheduleLineSchema)` to create a new message.
 */
export declare const SupplierContractPriceScheduleLineSchema: GenMessage<SupplierContractPriceScheduleLine>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractPriceScheduleLineRequest
 */
export type CreateSupplierContractPriceScheduleLineRequest = Message<"domain.expenditure.v1.CreateSupplierContractPriceScheduleLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data?: SupplierContractPriceScheduleLine;
};
/**
 * Describes the message domain.expenditure.v1.CreateSupplierContractPriceScheduleLineRequest.
 * Use `create(CreateSupplierContractPriceScheduleLineRequestSchema)` to create a new message.
 */
export declare const CreateSupplierContractPriceScheduleLineRequestSchema: GenMessage<CreateSupplierContractPriceScheduleLineRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateSupplierContractPriceScheduleLineResponse
 */
export type CreateSupplierContractPriceScheduleLineResponse = Message<"domain.expenditure.v1.CreateSupplierContractPriceScheduleLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data: SupplierContractPriceScheduleLine[];
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
 * Describes the message domain.expenditure.v1.CreateSupplierContractPriceScheduleLineResponse.
 * Use `create(CreateSupplierContractPriceScheduleLineResponseSchema)` to create a new message.
 */
export declare const CreateSupplierContractPriceScheduleLineResponseSchema: GenMessage<CreateSupplierContractPriceScheduleLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractPriceScheduleLineRequest
 */
export type ReadSupplierContractPriceScheduleLineRequest = Message<"domain.expenditure.v1.ReadSupplierContractPriceScheduleLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data?: SupplierContractPriceScheduleLine;
};
/**
 * Describes the message domain.expenditure.v1.ReadSupplierContractPriceScheduleLineRequest.
 * Use `create(ReadSupplierContractPriceScheduleLineRequestSchema)` to create a new message.
 */
export declare const ReadSupplierContractPriceScheduleLineRequestSchema: GenMessage<ReadSupplierContractPriceScheduleLineRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadSupplierContractPriceScheduleLineResponse
 */
export type ReadSupplierContractPriceScheduleLineResponse = Message<"domain.expenditure.v1.ReadSupplierContractPriceScheduleLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data: SupplierContractPriceScheduleLine[];
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
 * Describes the message domain.expenditure.v1.ReadSupplierContractPriceScheduleLineResponse.
 * Use `create(ReadSupplierContractPriceScheduleLineResponseSchema)` to create a new message.
 */
export declare const ReadSupplierContractPriceScheduleLineResponseSchema: GenMessage<ReadSupplierContractPriceScheduleLineResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractPriceScheduleLineRequest
 */
export type UpdateSupplierContractPriceScheduleLineRequest = Message<"domain.expenditure.v1.UpdateSupplierContractPriceScheduleLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data?: SupplierContractPriceScheduleLine;
};
/**
 * Describes the message domain.expenditure.v1.UpdateSupplierContractPriceScheduleLineRequest.
 * Use `create(UpdateSupplierContractPriceScheduleLineRequestSchema)` to create a new message.
 */
export declare const UpdateSupplierContractPriceScheduleLineRequestSchema: GenMessage<UpdateSupplierContractPriceScheduleLineRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateSupplierContractPriceScheduleLineResponse
 */
export type UpdateSupplierContractPriceScheduleLineResponse = Message<"domain.expenditure.v1.UpdateSupplierContractPriceScheduleLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data: SupplierContractPriceScheduleLine[];
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
 * Describes the message domain.expenditure.v1.UpdateSupplierContractPriceScheduleLineResponse.
 * Use `create(UpdateSupplierContractPriceScheduleLineResponseSchema)` to create a new message.
 */
export declare const UpdateSupplierContractPriceScheduleLineResponseSchema: GenMessage<UpdateSupplierContractPriceScheduleLineResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractPriceScheduleLineRequest
 */
export type DeleteSupplierContractPriceScheduleLineRequest = Message<"domain.expenditure.v1.DeleteSupplierContractPriceScheduleLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data?: SupplierContractPriceScheduleLine;
};
/**
 * Describes the message domain.expenditure.v1.DeleteSupplierContractPriceScheduleLineRequest.
 * Use `create(DeleteSupplierContractPriceScheduleLineRequestSchema)` to create a new message.
 */
export declare const DeleteSupplierContractPriceScheduleLineRequestSchema: GenMessage<DeleteSupplierContractPriceScheduleLineRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteSupplierContractPriceScheduleLineResponse
 */
export type DeleteSupplierContractPriceScheduleLineResponse = Message<"domain.expenditure.v1.DeleteSupplierContractPriceScheduleLineResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteSupplierContractPriceScheduleLineResponse.
 * Use `create(DeleteSupplierContractPriceScheduleLineResponseSchema)` to create a new message.
 */
export declare const DeleteSupplierContractPriceScheduleLineResponseSchema: GenMessage<DeleteSupplierContractPriceScheduleLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractPriceScheduleLinesRequest
 */
export type ListSupplierContractPriceScheduleLinesRequest = Message<"domain.expenditure.v1.ListSupplierContractPriceScheduleLinesRequest"> & {
    /**
     * @generated from field: optional string supplier_contract_price_schedule_id = 1;
     */
    supplierContractPriceScheduleId?: string;
    /**
     * @generated from field: optional string supplier_contract_line_id = 2;
     */
    supplierContractLineId?: string;
    /**
     * @generated from field: optional domain.common.v1.SearchRequest search = 3;
     */
    search?: SearchRequest;
    /**
     * @generated from field: optional domain.common.v1.FilterRequest filters = 4;
     */
    filters?: FilterRequest;
    /**
     * @generated from field: optional domain.common.v1.SortRequest sort = 5;
     */
    sort?: SortRequest;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 6;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message domain.expenditure.v1.ListSupplierContractPriceScheduleLinesRequest.
 * Use `create(ListSupplierContractPriceScheduleLinesRequestSchema)` to create a new message.
 */
export declare const ListSupplierContractPriceScheduleLinesRequestSchema: GenMessage<ListSupplierContractPriceScheduleLinesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListSupplierContractPriceScheduleLinesResponse
 */
export type ListSupplierContractPriceScheduleLinesResponse = Message<"domain.expenditure.v1.ListSupplierContractPriceScheduleLinesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceScheduleLine data = 1;
     */
    data: SupplierContractPriceScheduleLine[];
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
 * Describes the message domain.expenditure.v1.ListSupplierContractPriceScheduleLinesResponse.
 * Use `create(ListSupplierContractPriceScheduleLinesResponseSchema)` to create a new message.
 */
export declare const ListSupplierContractPriceScheduleLinesResponseSchema: GenMessage<ListSupplierContractPriceScheduleLinesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleLineListPageDataRequest
 */
export type GetSupplierContractPriceScheduleLineListPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleLineListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleLineListPageDataRequest.
 * Use `create(GetSupplierContractPriceScheduleLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleLineListPageDataRequestSchema: GenMessage<GetSupplierContractPriceScheduleLineListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleLineListPageDataResponse
 */
export type GetSupplierContractPriceScheduleLineListPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.SupplierContractPriceScheduleLine supplier_contract_price_schedule_line_list = 1;
     */
    supplierContractPriceScheduleLineList: SupplierContractPriceScheduleLine[];
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
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleLineListPageDataResponse.
 * Use `create(GetSupplierContractPriceScheduleLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleLineListPageDataResponseSchema: GenMessage<GetSupplierContractPriceScheduleLineListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleLineItemPageDataRequest
 */
export type GetSupplierContractPriceScheduleLineItemPageDataRequest = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleLineItemPageDataRequest"> & {
    /**
     * @generated from field: string supplier_contract_price_schedule_line_id = 1;
     */
    supplierContractPriceScheduleLineId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleLineItemPageDataRequest.
 * Use `create(GetSupplierContractPriceScheduleLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleLineItemPageDataRequestSchema: GenMessage<GetSupplierContractPriceScheduleLineItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetSupplierContractPriceScheduleLineItemPageDataResponse
 */
export type GetSupplierContractPriceScheduleLineItemPageDataResponse = Message<"domain.expenditure.v1.GetSupplierContractPriceScheduleLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.SupplierContractPriceScheduleLine supplier_contract_price_schedule_line = 1;
     */
    supplierContractPriceScheduleLine?: SupplierContractPriceScheduleLine;
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
 * Describes the message domain.expenditure.v1.GetSupplierContractPriceScheduleLineItemPageDataResponse.
 * Use `create(GetSupplierContractPriceScheduleLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetSupplierContractPriceScheduleLineItemPageDataResponseSchema: GenMessage<GetSupplierContractPriceScheduleLineItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService
 */
export declare const SupplierContractPriceScheduleLineDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.CreateSupplierContractPriceScheduleLine
     */
    createSupplierContractPriceScheduleLine: {
        methodKind: "unary";
        input: typeof CreateSupplierContractPriceScheduleLineRequestSchema;
        output: typeof CreateSupplierContractPriceScheduleLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.ReadSupplierContractPriceScheduleLine
     */
    readSupplierContractPriceScheduleLine: {
        methodKind: "unary";
        input: typeof ReadSupplierContractPriceScheduleLineRequestSchema;
        output: typeof ReadSupplierContractPriceScheduleLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.UpdateSupplierContractPriceScheduleLine
     */
    updateSupplierContractPriceScheduleLine: {
        methodKind: "unary";
        input: typeof UpdateSupplierContractPriceScheduleLineRequestSchema;
        output: typeof UpdateSupplierContractPriceScheduleLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.DeleteSupplierContractPriceScheduleLine
     */
    deleteSupplierContractPriceScheduleLine: {
        methodKind: "unary";
        input: typeof DeleteSupplierContractPriceScheduleLineRequestSchema;
        output: typeof DeleteSupplierContractPriceScheduleLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.ListSupplierContractPriceScheduleLines
     */
    listSupplierContractPriceScheduleLines: {
        methodKind: "unary";
        input: typeof ListSupplierContractPriceScheduleLinesRequestSchema;
        output: typeof ListSupplierContractPriceScheduleLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.GetSupplierContractPriceScheduleLineListPageData
     */
    getSupplierContractPriceScheduleLineListPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractPriceScheduleLineListPageDataRequestSchema;
        output: typeof GetSupplierContractPriceScheduleLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.SupplierContractPriceScheduleLineDomainService.GetSupplierContractPriceScheduleLineItemPageData
     */
    getSupplierContractPriceScheduleLineItemPageData: {
        methodKind: "unary";
        input: typeof GetSupplierContractPriceScheduleLineItemPageDataRequestSchema;
        output: typeof GetSupplierContractPriceScheduleLineItemPageDataResponseSchema;
    };
}>;
