import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../domain/common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/reporting/gross_cashflow/gross_cashflow.proto.
 */
export declare const file_service_reporting_gross_cashflow_gross_cashflow: GenFile;
/**
 * GetGrossProfitRequest defines parameters for generating a gross profit
 * report.
 *
 * @generated from message service.reporting.v1.GetGrossProfitRequest
 */
export type GetGrossProfitRequest = Message<"service.reporting.v1.GetGrossProfitRequest"> & {
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period start
     *
     * @generated from field: optional string start_date = 1;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD) — report period end
     *
     * @generated from field: optional string end_date = 2;
     */
    endDate?: string;
    /**
     * "product", "location", "category", "period"
     *
     * @generated from field: optional string group_by = 3;
     */
    groupBy?: string;
    /**
     * "daily", "weekly", "monthly", "yearly" (when group_by=period)
     *
     * @generated from field: optional string period_granularity = 4;
     */
    periodGranularity?: string;
    /**
     * Filter by specific product
     *
     * @generated from field: optional string product_id = 5;
     */
    productId?: string;
    /**
     * Filter by specific location
     *
     * @generated from field: optional string location_id = 6;
     */
    locationId?: string;
    /**
     * Filter by revenue category
     *
     * @generated from field: optional string revenue_category_id = 7;
     */
    revenueCategoryId?: string;
    /**
     * Filter by currency (default: all)
     *
     * @generated from field: optional string currency = 8;
     */
    currency?: string;
    /**
     * @generated from field: optional domain.common.v1.PaginationRequest pagination = 9;
     */
    pagination?: PaginationRequest;
};
/**
 * Describes the message service.reporting.v1.GetGrossProfitRequest.
 * Use `create(GetGrossProfitRequestSchema)` to create a new message.
 */
export declare const GetGrossProfitRequestSchema: GenMessage<GetGrossProfitRequest>;
/**
 * GrossProfitLineItem represents one row in the gross profit report.
 *
 * @generated from message service.reporting.v1.GrossProfitLineItem
 */
export type GrossProfitLineItem = Message<"service.reporting.v1.GrossProfitLineItem"> & {
    /**
     * The grouping key value
     *
     * @generated from field: string group_key = 1;
     */
    groupKey: string;
    /**
     * The grouping entity ID
     *
     * @generated from field: optional string group_id = 2;
     */
    groupId?: string;
    /**
     * centavos — Sum of revenue line item totals
     *
     * @generated from field: int64 total_revenue = 3;
     */
    totalRevenue: bigint;
    /**
     * centavos — Sum of discounts applied
     *
     * @generated from field: int64 total_discount = 4;
     */
    totalDiscount: bigint;
    /**
     * centavos — total_revenue - total_discount
     *
     * @generated from field: int64 net_revenue = 5;
     */
    netRevenue: bigint;
    /**
     * centavos — Sum of COGS from inventory transactions
     *
     * @generated from field: int64 cost_of_goods_sold = 6;
     */
    costOfGoodsSold: bigint;
    /**
     * centavos — net_revenue - cost_of_goods_sold
     *
     * @generated from field: int64 gross_profit = 7;
     */
    grossProfit: bigint;
    /**
     * (gross_profit / net_revenue) * 100
     *
     * @generated from field: double gross_profit_margin = 8;
     */
    grossProfitMargin: number;
    /**
     * Total units sold in this group
     *
     * @generated from field: int64 units_sold = 9;
     */
    unitsSold: bigint;
    /**
     * Number of revenue transactions
     *
     * @generated from field: int64 transaction_count = 10;
     */
    transactionCount: bigint;
};
/**
 * Describes the message service.reporting.v1.GrossProfitLineItem.
 * Use `create(GrossProfitLineItemSchema)` to create a new message.
 */
export declare const GrossProfitLineItemSchema: GenMessage<GrossProfitLineItem>;
/**
 * GrossProfitSummary provides report-level totals.
 *
 * @generated from message service.reporting.v1.GrossProfitSummary
 */
export type GrossProfitSummary = Message<"service.reporting.v1.GrossProfitSummary"> & {
    /**
     * centavos
     *
     * @generated from field: int64 total_revenue = 1;
     */
    totalRevenue: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_discount = 2;
     */
    totalDiscount: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 net_revenue = 3;
     */
    netRevenue: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_cogs = 4;
     */
    totalCogs: bigint;
    /**
     * centavos
     *
     * @generated from field: int64 total_gross_profit = 5;
     */
    totalGrossProfit: bigint;
    /**
     * (total_gross_profit / net_revenue) * 100
     *
     * @generated from field: double overall_margin = 6;
     */
    overallMargin: number;
    /**
     * @generated from field: int64 total_units_sold = 7;
     */
    totalUnitsSold: bigint;
    /**
     * @generated from field: int64 total_transactions = 8;
     */
    totalTransactions: bigint;
    /**
     * @generated from field: string currency = 9;
     */
    currency: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string start_date = 10;
     */
    startDate?: string;
    /**
     * ISO 8601 date (YYYY-MM-DD)
     *
     * @generated from field: optional string end_date = 11;
     */
    endDate?: string;
};
/**
 * Describes the message service.reporting.v1.GrossProfitSummary.
 * Use `create(GrossProfitSummarySchema)` to create a new message.
 */
export declare const GrossProfitSummarySchema: GenMessage<GrossProfitSummary>;
/**
 * GetGrossProfitResponse returns the generated gross profit report.
 *
 * @generated from message service.reporting.v1.GetGrossProfitResponse
 */
export type GetGrossProfitResponse = Message<"service.reporting.v1.GetGrossProfitResponse"> & {
    /**
     * @generated from field: repeated service.reporting.v1.GrossProfitLineItem line_items = 1;
     */
    lineItems: GrossProfitLineItem[];
    /**
     * @generated from field: optional service.reporting.v1.GrossProfitSummary summary = 2;
     */
    summary?: GrossProfitSummary;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 3;
     */
    pagination?: PaginationResponse;
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
 * Describes the message service.reporting.v1.GetGrossProfitResponse.
 * Use `create(GetGrossProfitResponseSchema)` to create a new message.
 */
export declare const GetGrossProfitResponseSchema: GenMessage<GetGrossProfitResponse>;
/**
 * GetCashBookRequest defines parameters for generating a cash book report.
 *
 * @generated from message service.reporting.v1.GetCashBookRequest
 */
export type GetCashBookRequest = Message<"service.reporting.v1.GetCashBookRequest"> & {
    /**
     * default 200
     *
     * @generated from field: optional int32 limit = 1;
     */
    limit?: number;
};
/**
 * Describes the message service.reporting.v1.GetCashBookRequest.
 * Use `create(GetCashBookRequestSchema)` to create a new message.
 */
export declare const GetCashBookRequestSchema: GenMessage<GetCashBookRequest>;
/**
 * CashBookRow represents one chronological cash movement row.
 *
 * @generated from message service.reporting.v1.CashBookRow
 */
export type CashBookRow = Message<"service.reporting.v1.CashBookRow"> & {
    /**
     * YYYY-MM-DD
     *
     * @generated from field: string tx_date = 1;
     */
    txDate: string;
    /**
     * @generated from field: string description = 2;
     */
    description: string;
    /**
     * @generated from field: string reference = 3;
     */
    reference: string;
    /**
     * "Receipt" | "Expense" | "Purchase"
     *
     * @generated from field: string tx_type = 4;
     */
    txType: string;
    /**
     * centavos
     *
     * @generated from field: int64 amount = 5;
     */
    amount: bigint;
};
/**
 * Describes the message service.reporting.v1.CashBookRow.
 * Use `create(CashBookRowSchema)` to create a new message.
 */
export declare const CashBookRowSchema: GenMessage<CashBookRow>;
/**
 * GetCashBookResponse returns the generated cash book report.
 *
 * @generated from message service.reporting.v1.GetCashBookResponse
 */
export type GetCashBookResponse = Message<"service.reporting.v1.GetCashBookResponse"> & {
    /**
     * @generated from field: repeated service.reporting.v1.CashBookRow data = 1;
     */
    data: CashBookRow[];
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
 * Describes the message service.reporting.v1.GetCashBookResponse.
 * Use `create(GetCashBookResponseSchema)` to create a new message.
 */
export declare const GetCashBookResponseSchema: GenMessage<GetCashBookResponse>;
/**
 * GrossCashFlowService defines gross-margin + cash-flow ledger reporting reads.
 *
 * @generated from service service.reporting.v1.GrossCashFlowService
 */
export declare const GrossCashFlowService: GenService<{
    /**
     * @generated from rpc service.reporting.v1.GrossCashFlowService.GetGrossProfitReport
     */
    getGrossProfitReport: {
        methodKind: "unary";
        input: typeof GetGrossProfitRequestSchema;
        output: typeof GetGrossProfitResponseSchema;
    };
    /**
     * @generated from rpc service.reporting.v1.GrossCashFlowService.GetCashBookReport
     */
    getCashBookReport: {
        methodKind: "unary";
        input: typeof GetCashBookRequestSchema;
        output: typeof GetCashBookResponseSchema;
    };
}>;
