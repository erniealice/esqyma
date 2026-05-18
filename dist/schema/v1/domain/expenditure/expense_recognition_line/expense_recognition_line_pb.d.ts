import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/expenditure/expense_recognition_line/expense_recognition_line.proto.
 */
export declare const file_domain_expenditure_expense_recognition_line_expense_recognition_line: GenFile;
/**
 * ExpenseRecognitionLine is a per-line breakdown of a parent ExpenseRecognition.
 * Mirrors RevenueLineItem on the sales side.
 *
 * @generated from message domain.expenditure.v1.ExpenseRecognitionLine
 */
export type ExpenseRecognitionLine = Message<"domain.expenditure.v1.ExpenseRecognitionLine"> & {
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
     * Parent
     *
     * @generated from field: string expense_recognition_id = 10;
     */
    expenseRecognitionId: string;
    /**
     * Source links
     *
     * @generated from field: optional string supplier_contract_line_id = 11;
     */
    supplierContractLineId?: string;
    /**
     * @generated from field: optional string expenditure_line_item_id = 12;
     */
    expenditureLineItemId?: string;
    /**
     * @generated from field: optional string product_id = 13;
     */
    productId?: string;
    /**
     * Pricing back-edges — mirrors revenue_line_item.proto:44 product_price_plan_id = 25
     * and revenue_line_item.proto subscription_id = 29.
     * supplier_product_cost_plan_id is the rate-card record (4-way join) for this line.
     * supplier_subscription_id propagates from the parent ExpenseRecognition for fast filtering.
     *
     * @generated from field: optional string supplier_product_cost_plan_id = 14;
     */
    supplierProductCostPlanId?: string;
    /**
     * @generated from field: optional string supplier_subscription_id = 15;
     */
    supplierSubscriptionId?: string;
    /**
     * Line details
     *
     * @generated from field: string description = 20;
     */
    description: string;
    /**
     * @generated from field: double quantity = 21;
     */
    quantity: number;
    /**
     * centavos
     *
     * @generated from field: int64 unit_amount = 22;
     */
    unitAmount: bigint;
    /**
     * centavos (line total)
     *
     * @generated from field: int64 amount = 23;
     */
    amount: bigint;
    /**
     * @generated from field: string currency = 24;
     */
    currency: string;
    /**
     * GL
     *
     * @generated from field: optional string expense_account_id = 30;
     */
    expenseAccountId?: string;
    /**
     * @generated from field: optional string job_activity_id = 31;
     */
    jobActivityId?: string;
};
/**
 * Describes the message domain.expenditure.v1.ExpenseRecognitionLine.
 * Use `create(ExpenseRecognitionLineSchema)` to create a new message.
 */
export declare const ExpenseRecognitionLineSchema: GenMessage<ExpenseRecognitionLine>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionLineRequest
 */
export type CreateExpenseRecognitionLineRequest = Message<"domain.expenditure.v1.CreateExpenseRecognitionLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data?: ExpenseRecognitionLine;
};
/**
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionLineRequest.
 * Use `create(CreateExpenseRecognitionLineRequestSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionLineRequestSchema: GenMessage<CreateExpenseRecognitionLineRequest>;
/**
 * @generated from message domain.expenditure.v1.CreateExpenseRecognitionLineResponse
 */
export type CreateExpenseRecognitionLineResponse = Message<"domain.expenditure.v1.CreateExpenseRecognitionLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data: ExpenseRecognitionLine[];
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
 * Describes the message domain.expenditure.v1.CreateExpenseRecognitionLineResponse.
 * Use `create(CreateExpenseRecognitionLineResponseSchema)` to create a new message.
 */
export declare const CreateExpenseRecognitionLineResponseSchema: GenMessage<CreateExpenseRecognitionLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenseRecognitionLineRequest
 */
export type ReadExpenseRecognitionLineRequest = Message<"domain.expenditure.v1.ReadExpenseRecognitionLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data?: ExpenseRecognitionLine;
};
/**
 * Describes the message domain.expenditure.v1.ReadExpenseRecognitionLineRequest.
 * Use `create(ReadExpenseRecognitionLineRequestSchema)` to create a new message.
 */
export declare const ReadExpenseRecognitionLineRequestSchema: GenMessage<ReadExpenseRecognitionLineRequest>;
/**
 * @generated from message domain.expenditure.v1.ReadExpenseRecognitionLineResponse
 */
export type ReadExpenseRecognitionLineResponse = Message<"domain.expenditure.v1.ReadExpenseRecognitionLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data: ExpenseRecognitionLine[];
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
 * Describes the message domain.expenditure.v1.ReadExpenseRecognitionLineResponse.
 * Use `create(ReadExpenseRecognitionLineResponseSchema)` to create a new message.
 */
export declare const ReadExpenseRecognitionLineResponseSchema: GenMessage<ReadExpenseRecognitionLineResponse>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenseRecognitionLineRequest
 */
export type UpdateExpenseRecognitionLineRequest = Message<"domain.expenditure.v1.UpdateExpenseRecognitionLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data?: ExpenseRecognitionLine;
};
/**
 * Describes the message domain.expenditure.v1.UpdateExpenseRecognitionLineRequest.
 * Use `create(UpdateExpenseRecognitionLineRequestSchema)` to create a new message.
 */
export declare const UpdateExpenseRecognitionLineRequestSchema: GenMessage<UpdateExpenseRecognitionLineRequest>;
/**
 * @generated from message domain.expenditure.v1.UpdateExpenseRecognitionLineResponse
 */
export type UpdateExpenseRecognitionLineResponse = Message<"domain.expenditure.v1.UpdateExpenseRecognitionLineResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data: ExpenseRecognitionLine[];
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
 * Describes the message domain.expenditure.v1.UpdateExpenseRecognitionLineResponse.
 * Use `create(UpdateExpenseRecognitionLineResponseSchema)` to create a new message.
 */
export declare const UpdateExpenseRecognitionLineResponseSchema: GenMessage<UpdateExpenseRecognitionLineResponse>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenseRecognitionLineRequest
 */
export type DeleteExpenseRecognitionLineRequest = Message<"domain.expenditure.v1.DeleteExpenseRecognitionLineRequest"> & {
    /**
     * @generated from field: domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data?: ExpenseRecognitionLine;
};
/**
 * Describes the message domain.expenditure.v1.DeleteExpenseRecognitionLineRequest.
 * Use `create(DeleteExpenseRecognitionLineRequestSchema)` to create a new message.
 */
export declare const DeleteExpenseRecognitionLineRequestSchema: GenMessage<DeleteExpenseRecognitionLineRequest>;
/**
 * @generated from message domain.expenditure.v1.DeleteExpenseRecognitionLineResponse
 */
export type DeleteExpenseRecognitionLineResponse = Message<"domain.expenditure.v1.DeleteExpenseRecognitionLineResponse"> & {
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
 * Describes the message domain.expenditure.v1.DeleteExpenseRecognitionLineResponse.
 * Use `create(DeleteExpenseRecognitionLineResponseSchema)` to create a new message.
 */
export declare const DeleteExpenseRecognitionLineResponseSchema: GenMessage<DeleteExpenseRecognitionLineResponse>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionLinesRequest
 */
export type ListExpenseRecognitionLinesRequest = Message<"domain.expenditure.v1.ListExpenseRecognitionLinesRequest"> & {
    /**
     * @generated from field: optional string expense_recognition_id = 1;
     */
    expenseRecognitionId?: string;
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
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionLinesRequest.
 * Use `create(ListExpenseRecognitionLinesRequestSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionLinesRequestSchema: GenMessage<ListExpenseRecognitionLinesRequest>;
/**
 * @generated from message domain.expenditure.v1.ListExpenseRecognitionLinesResponse
 */
export type ListExpenseRecognitionLinesResponse = Message<"domain.expenditure.v1.ListExpenseRecognitionLinesResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionLine data = 1;
     */
    data: ExpenseRecognitionLine[];
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
 * Describes the message domain.expenditure.v1.ListExpenseRecognitionLinesResponse.
 * Use `create(ListExpenseRecognitionLinesResponseSchema)` to create a new message.
 */
export declare const ListExpenseRecognitionLinesResponseSchema: GenMessage<ListExpenseRecognitionLinesResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionLineListPageDataRequest
 */
export type GetExpenseRecognitionLineListPageDataRequest = Message<"domain.expenditure.v1.GetExpenseRecognitionLineListPageDataRequest"> & {
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
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionLineListPageDataRequest.
 * Use `create(GetExpenseRecognitionLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionLineListPageDataRequestSchema: GenMessage<GetExpenseRecognitionLineListPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionLineListPageDataResponse
 */
export type GetExpenseRecognitionLineListPageDataResponse = Message<"domain.expenditure.v1.GetExpenseRecognitionLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.expenditure.v1.ExpenseRecognitionLine expense_recognition_line_list = 1;
     */
    expenseRecognitionLineList: ExpenseRecognitionLine[];
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
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionLineListPageDataResponse.
 * Use `create(GetExpenseRecognitionLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionLineListPageDataResponseSchema: GenMessage<GetExpenseRecognitionLineListPageDataResponse>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionLineItemPageDataRequest
 */
export type GetExpenseRecognitionLineItemPageDataRequest = Message<"domain.expenditure.v1.GetExpenseRecognitionLineItemPageDataRequest"> & {
    /**
     * @generated from field: string expense_recognition_line_id = 1;
     */
    expenseRecognitionLineId: string;
};
/**
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionLineItemPageDataRequest.
 * Use `create(GetExpenseRecognitionLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionLineItemPageDataRequestSchema: GenMessage<GetExpenseRecognitionLineItemPageDataRequest>;
/**
 * @generated from message domain.expenditure.v1.GetExpenseRecognitionLineItemPageDataResponse
 */
export type GetExpenseRecognitionLineItemPageDataResponse = Message<"domain.expenditure.v1.GetExpenseRecognitionLineItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.expenditure.v1.ExpenseRecognitionLine expense_recognition_line = 1;
     */
    expenseRecognitionLine?: ExpenseRecognitionLine;
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
 * Describes the message domain.expenditure.v1.GetExpenseRecognitionLineItemPageDataResponse.
 * Use `create(GetExpenseRecognitionLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetExpenseRecognitionLineItemPageDataResponseSchema: GenMessage<GetExpenseRecognitionLineItemPageDataResponse>;
/**
 * @generated from service domain.expenditure.v1.ExpenseRecognitionLineDomainService
 */
export declare const ExpenseRecognitionLineDomainService: GenService<{
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.CreateExpenseRecognitionLine
     */
    createExpenseRecognitionLine: {
        methodKind: "unary";
        input: typeof CreateExpenseRecognitionLineRequestSchema;
        output: typeof CreateExpenseRecognitionLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.ReadExpenseRecognitionLine
     */
    readExpenseRecognitionLine: {
        methodKind: "unary";
        input: typeof ReadExpenseRecognitionLineRequestSchema;
        output: typeof ReadExpenseRecognitionLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.UpdateExpenseRecognitionLine
     */
    updateExpenseRecognitionLine: {
        methodKind: "unary";
        input: typeof UpdateExpenseRecognitionLineRequestSchema;
        output: typeof UpdateExpenseRecognitionLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.DeleteExpenseRecognitionLine
     */
    deleteExpenseRecognitionLine: {
        methodKind: "unary";
        input: typeof DeleteExpenseRecognitionLineRequestSchema;
        output: typeof DeleteExpenseRecognitionLineResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.ListExpenseRecognitionLines
     */
    listExpenseRecognitionLines: {
        methodKind: "unary";
        input: typeof ListExpenseRecognitionLinesRequestSchema;
        output: typeof ListExpenseRecognitionLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.GetExpenseRecognitionLineListPageData
     */
    getExpenseRecognitionLineListPageData: {
        methodKind: "unary";
        input: typeof GetExpenseRecognitionLineListPageDataRequestSchema;
        output: typeof GetExpenseRecognitionLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.expenditure.v1.ExpenseRecognitionLineDomainService.GetExpenseRecognitionLineItemPageData
     */
    getExpenseRecognitionLineItemPageData: {
        methodKind: "unary";
        input: typeof GetExpenseRecognitionLineItemPageDataRequestSchema;
        output: typeof GetExpenseRecognitionLineItemPageDataResponseSchema;
    };
}>;
