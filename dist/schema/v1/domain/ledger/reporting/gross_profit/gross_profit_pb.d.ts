import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/ledger/reporting/gross_profit/gross_profit.proto.
 */
export declare const file_domain_ledger_reporting_gross_profit_gross_profit: GenFile;
/**
 * GrossProfitReportRequest defines parameters for generating a gross profit report.
 *
 * @generated from message domain.ledger.v1.GrossProfitReportRequest
 */
export type GrossProfitReportRequest = Message<"domain.ledger.v1.GrossProfitReportRequest"> & {
    /**
     * Unix timestamp — report period start
     *
     * @generated from field: optional int64 start_date = 1;
     */
    startDate?: bigint;
    /**
     * Unix timestamp — report period end
     *
     * @generated from field: optional int64 end_date = 2;
     */
    endDate?: bigint;
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
 * Describes the message domain.ledger.v1.GrossProfitReportRequest.
 * Use `create(GrossProfitReportRequestSchema)` to create a new message.
 */
export declare const GrossProfitReportRequestSchema: GenMessage<GrossProfitReportRequest>;
/**
 * GrossProfitLineItem represents one row in the gross profit report.
 *
 * @generated from message domain.ledger.v1.GrossProfitLineItem
 */
export type GrossProfitLineItem = Message<"domain.ledger.v1.GrossProfitLineItem"> & {
    /**
     * The grouping key value (product name, location, date, etc.)
     *
     * @generated from field: string group_key = 1;
     */
    groupKey: string;
    /**
     * The grouping entity ID (product_id, location_id, etc.)
     *
     * @generated from field: optional string group_id = 2;
     */
    groupId?: string;
    /**
     * Sum of revenue line item totals
     *
     * @generated from field: double total_revenue = 3;
     */
    totalRevenue: number;
    /**
     * Sum of discounts applied
     *
     * @generated from field: double total_discount = 4;
     */
    totalDiscount: number;
    /**
     * total_revenue - total_discount
     *
     * @generated from field: double net_revenue = 5;
     */
    netRevenue: number;
    /**
     * Sum of COGS from inventory transactions
     *
     * @generated from field: double cost_of_goods_sold = 6;
     */
    costOfGoodsSold: number;
    /**
     * net_revenue - cost_of_goods_sold
     *
     * @generated from field: double gross_profit = 7;
     */
    grossProfit: number;
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
 * Describes the message domain.ledger.v1.GrossProfitLineItem.
 * Use `create(GrossProfitLineItemSchema)` to create a new message.
 */
export declare const GrossProfitLineItemSchema: GenMessage<GrossProfitLineItem>;
/**
 * GrossProfitSummary provides report-level totals.
 *
 * @generated from message domain.ledger.v1.GrossProfitSummary
 */
export type GrossProfitSummary = Message<"domain.ledger.v1.GrossProfitSummary"> & {
    /**
     * @generated from field: double total_revenue = 1;
     */
    totalRevenue: number;
    /**
     * @generated from field: double total_discount = 2;
     */
    totalDiscount: number;
    /**
     * @generated from field: double net_revenue = 3;
     */
    netRevenue: number;
    /**
     * @generated from field: double total_cogs = 4;
     */
    totalCogs: number;
    /**
     * @generated from field: double total_gross_profit = 5;
     */
    totalGrossProfit: number;
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
     * @generated from field: optional int64 start_date = 10;
     */
    startDate?: bigint;
    /**
     * @generated from field: optional int64 end_date = 11;
     */
    endDate?: bigint;
};
/**
 * Describes the message domain.ledger.v1.GrossProfitSummary.
 * Use `create(GrossProfitSummarySchema)` to create a new message.
 */
export declare const GrossProfitSummarySchema: GenMessage<GrossProfitSummary>;
/**
 * GrossProfitReportResponse returns the generated report.
 *
 * @generated from message domain.ledger.v1.GrossProfitReportResponse
 */
export type GrossProfitReportResponse = Message<"domain.ledger.v1.GrossProfitReportResponse"> & {
    /**
     * @generated from field: repeated domain.ledger.v1.GrossProfitLineItem line_items = 1;
     */
    lineItems: GrossProfitLineItem[];
    /**
     * @generated from field: optional domain.ledger.v1.GrossProfitSummary summary = 2;
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
 * Describes the message domain.ledger.v1.GrossProfitReportResponse.
 * Use `create(GrossProfitReportResponseSchema)` to create a new message.
 */
export declare const GrossProfitReportResponseSchema: GenMessage<GrossProfitReportResponse>;
/**
 * LedgerReportingDomainService defines ledger reporting operations.
 *
 * @generated from service domain.ledger.v1.LedgerReportingDomainService
 */
export declare const LedgerReportingDomainService: GenService<{
    /**
     * @generated from rpc domain.ledger.v1.LedgerReportingDomainService.GetGrossProfitReport
     */
    getGrossProfitReport: {
        methodKind: "unary";
        input: typeof GrossProfitReportRequestSchema;
        output: typeof GrossProfitReportResponseSchema;
    };
}>;
