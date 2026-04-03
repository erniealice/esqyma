import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { JobActivity } from "../job_activity/job_activity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/activity_expense/activity_expense.proto.
 */
export declare const file_domain_operation_activity_expense_activity_expense: GenFile;
/**
 * @generated from message domain.operation.v1.ActivityExpense
 */
export type ActivityExpense = Message<"domain.operation.v1.ActivityExpense"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
    /**
     * @generated from field: optional domain.operation.v1.JobActivity job_activity = 2;
     */
    jobActivity?: JobActivity;
    /**
     * @generated from field: string expense_category = 3;
     */
    expenseCategory: string;
    /**
     * @generated from field: optional string vendor_ref = 4;
     */
    vendorRef?: string;
    /**
     * @generated from field: optional string receipt_url = 5;
     */
    receiptUrl?: string;
    /**
     * @generated from field: bool reimbursable = 6;
     */
    reimbursable: boolean;
};
/**
 * Describes the message domain.operation.v1.ActivityExpense.
 * Use `create(ActivityExpenseSchema)` to create a new message.
 */
export declare const ActivityExpenseSchema: GenMessage<ActivityExpense>;
/**
 * @generated from message domain.operation.v1.CreateActivityExpenseRequest
 */
export type CreateActivityExpenseRequest = Message<"domain.operation.v1.CreateActivityExpenseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityExpense data = 1;
     */
    data?: ActivityExpense;
};
/**
 * Describes the message domain.operation.v1.CreateActivityExpenseRequest.
 * Use `create(CreateActivityExpenseRequestSchema)` to create a new message.
 */
export declare const CreateActivityExpenseRequestSchema: GenMessage<CreateActivityExpenseRequest>;
/**
 * @generated from message domain.operation.v1.CreateActivityExpenseResponse
 */
export type CreateActivityExpenseResponse = Message<"domain.operation.v1.CreateActivityExpenseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityExpense data = 1;
     */
    data: ActivityExpense[];
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
 * Describes the message domain.operation.v1.CreateActivityExpenseResponse.
 * Use `create(CreateActivityExpenseResponseSchema)` to create a new message.
 */
export declare const CreateActivityExpenseResponseSchema: GenMessage<CreateActivityExpenseResponse>;
/**
 * @generated from message domain.operation.v1.ReadActivityExpenseRequest
 */
export type ReadActivityExpenseRequest = Message<"domain.operation.v1.ReadActivityExpenseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityExpense data = 1;
     */
    data?: ActivityExpense;
};
/**
 * Describes the message domain.operation.v1.ReadActivityExpenseRequest.
 * Use `create(ReadActivityExpenseRequestSchema)` to create a new message.
 */
export declare const ReadActivityExpenseRequestSchema: GenMessage<ReadActivityExpenseRequest>;
/**
 * @generated from message domain.operation.v1.ReadActivityExpenseResponse
 */
export type ReadActivityExpenseResponse = Message<"domain.operation.v1.ReadActivityExpenseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityExpense data = 1;
     */
    data: ActivityExpense[];
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
 * Describes the message domain.operation.v1.ReadActivityExpenseResponse.
 * Use `create(ReadActivityExpenseResponseSchema)` to create a new message.
 */
export declare const ReadActivityExpenseResponseSchema: GenMessage<ReadActivityExpenseResponse>;
/**
 * @generated from message domain.operation.v1.UpdateActivityExpenseRequest
 */
export type UpdateActivityExpenseRequest = Message<"domain.operation.v1.UpdateActivityExpenseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityExpense data = 1;
     */
    data?: ActivityExpense;
};
/**
 * Describes the message domain.operation.v1.UpdateActivityExpenseRequest.
 * Use `create(UpdateActivityExpenseRequestSchema)` to create a new message.
 */
export declare const UpdateActivityExpenseRequestSchema: GenMessage<UpdateActivityExpenseRequest>;
/**
 * @generated from message domain.operation.v1.UpdateActivityExpenseResponse
 */
export type UpdateActivityExpenseResponse = Message<"domain.operation.v1.UpdateActivityExpenseResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityExpense data = 1;
     */
    data: ActivityExpense[];
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
 * Describes the message domain.operation.v1.UpdateActivityExpenseResponse.
 * Use `create(UpdateActivityExpenseResponseSchema)` to create a new message.
 */
export declare const UpdateActivityExpenseResponseSchema: GenMessage<UpdateActivityExpenseResponse>;
/**
 * @generated from message domain.operation.v1.DeleteActivityExpenseRequest
 */
export type DeleteActivityExpenseRequest = Message<"domain.operation.v1.DeleteActivityExpenseRequest"> & {
    /**
     * @generated from field: domain.operation.v1.ActivityExpense data = 1;
     */
    data?: ActivityExpense;
};
/**
 * Describes the message domain.operation.v1.DeleteActivityExpenseRequest.
 * Use `create(DeleteActivityExpenseRequestSchema)` to create a new message.
 */
export declare const DeleteActivityExpenseRequestSchema: GenMessage<DeleteActivityExpenseRequest>;
/**
 * @generated from message domain.operation.v1.DeleteActivityExpenseResponse
 */
export type DeleteActivityExpenseResponse = Message<"domain.operation.v1.DeleteActivityExpenseResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteActivityExpenseResponse.
 * Use `create(DeleteActivityExpenseResponseSchema)` to create a new message.
 */
export declare const DeleteActivityExpenseResponseSchema: GenMessage<DeleteActivityExpenseResponse>;
/**
 * @generated from message domain.operation.v1.ListActivityExpensesRequest
 */
export type ListActivityExpensesRequest = Message<"domain.operation.v1.ListActivityExpensesRequest"> & {
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
 * Describes the message domain.operation.v1.ListActivityExpensesRequest.
 * Use `create(ListActivityExpensesRequestSchema)` to create a new message.
 */
export declare const ListActivityExpensesRequestSchema: GenMessage<ListActivityExpensesRequest>;
/**
 * @generated from message domain.operation.v1.ListActivityExpensesResponse
 */
export type ListActivityExpensesResponse = Message<"domain.operation.v1.ListActivityExpensesResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityExpense data = 1;
     */
    data: ActivityExpense[];
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
 * Describes the message domain.operation.v1.ListActivityExpensesResponse.
 * Use `create(ListActivityExpensesResponseSchema)` to create a new message.
 */
export declare const ListActivityExpensesResponseSchema: GenMessage<ListActivityExpensesResponse>;
/**
 * @generated from message domain.operation.v1.GetActivityExpenseListPageDataRequest
 */
export type GetActivityExpenseListPageDataRequest = Message<"domain.operation.v1.GetActivityExpenseListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetActivityExpenseListPageDataRequest.
 * Use `create(GetActivityExpenseListPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityExpenseListPageDataRequestSchema: GenMessage<GetActivityExpenseListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetActivityExpenseListPageDataResponse
 */
export type GetActivityExpenseListPageDataResponse = Message<"domain.operation.v1.GetActivityExpenseListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.ActivityExpense activity_expense_list = 1;
     */
    activityExpenseList: ActivityExpense[];
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
 * Describes the message domain.operation.v1.GetActivityExpenseListPageDataResponse.
 * Use `create(GetActivityExpenseListPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityExpenseListPageDataResponseSchema: GenMessage<GetActivityExpenseListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetActivityExpenseItemPageDataRequest
 */
export type GetActivityExpenseItemPageDataRequest = Message<"domain.operation.v1.GetActivityExpenseItemPageDataRequest"> & {
    /**
     * @generated from field: string activity_id = 1;
     */
    activityId: string;
};
/**
 * Describes the message domain.operation.v1.GetActivityExpenseItemPageDataRequest.
 * Use `create(GetActivityExpenseItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetActivityExpenseItemPageDataRequestSchema: GenMessage<GetActivityExpenseItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetActivityExpenseItemPageDataResponse
 */
export type GetActivityExpenseItemPageDataResponse = Message<"domain.operation.v1.GetActivityExpenseItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.ActivityExpense activity_expense = 1;
     */
    activityExpense?: ActivityExpense;
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
 * Describes the message domain.operation.v1.GetActivityExpenseItemPageDataResponse.
 * Use `create(GetActivityExpenseItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetActivityExpenseItemPageDataResponseSchema: GenMessage<GetActivityExpenseItemPageDataResponse>;
/**
 * @generated from service domain.operation.v1.ActivityExpenseDomainService
 */
export declare const ActivityExpenseDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.CreateActivityExpense
     */
    createActivityExpense: {
        methodKind: "unary";
        input: typeof CreateActivityExpenseRequestSchema;
        output: typeof CreateActivityExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.ReadActivityExpense
     */
    readActivityExpense: {
        methodKind: "unary";
        input: typeof ReadActivityExpenseRequestSchema;
        output: typeof ReadActivityExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.UpdateActivityExpense
     */
    updateActivityExpense: {
        methodKind: "unary";
        input: typeof UpdateActivityExpenseRequestSchema;
        output: typeof UpdateActivityExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.DeleteActivityExpense
     */
    deleteActivityExpense: {
        methodKind: "unary";
        input: typeof DeleteActivityExpenseRequestSchema;
        output: typeof DeleteActivityExpenseResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.ListActivityExpenses
     */
    listActivityExpenses: {
        methodKind: "unary";
        input: typeof ListActivityExpensesRequestSchema;
        output: typeof ListActivityExpensesResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.GetActivityExpenseListPageData
     */
    getActivityExpenseListPageData: {
        methodKind: "unary";
        input: typeof GetActivityExpenseListPageDataRequestSchema;
        output: typeof GetActivityExpenseListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.ActivityExpenseDomainService.GetActivityExpenseItemPageData
     */
    getActivityExpenseItemPageData: {
        methodKind: "unary";
        input: typeof GetActivityExpenseItemPageDataRequestSchema;
        output: typeof GetActivityExpenseItemPageDataResponseSchema;
    };
}>;
