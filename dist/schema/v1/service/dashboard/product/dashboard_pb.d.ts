import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../../domain/common/error_pb";
import type { Product } from "../../../domain/product/product/product_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/dashboard/product/dashboard.proto.
 */
export declare const file_service_dashboard_product_dashboard: GenFile;
/**
 * ProductStats are the five stat-card values shown at the top of the
 * dashboard. top_revenue_value is centavos.
 *
 * @generated from message service.dashboard.product.v1.ProductStats
 */
export type ProductStats = Message<"service.dashboard.product.v1.ProductStats"> & {
    /**
     * @generated from field: int64 total_active = 1;
     */
    totalActive: bigint;
    /**
     * @generated from field: string top_revenue_name = 2;
     */
    topRevenueName: string;
    /**
     * centavos
     *
     * @generated from field: int64 top_revenue_value = 3;
     */
    topRevenueValue: bigint;
    /**
     * @generated from field: int64 line_count = 4;
     */
    lineCount: bigint;
    /**
     * @generated from field: int64 recently_added_cnt = 5;
     */
    recentlyAddedCnt: bigint;
};
/**
 * Describes the message service.dashboard.product.v1.ProductStats.
 * Use `create(ProductStatsSchema)` to create a new message.
 */
export declare const ProductStatsSchema: GenMessage<ProductStats>;
/**
 * TopRevenueRow is one row of the "top revenue products" widget. Total is
 * centavos; the current implementation populates total=0 as a placeholder
 * until a line-item revenue join is implemented.
 *
 * @generated from message service.dashboard.product.v1.TopRevenueRow
 */
export type TopRevenueRow = Message<"service.dashboard.product.v1.TopRevenueRow"> & {
    /**
     * @generated from field: string product_id = 1;
     */
    productId: string;
    /**
     * @generated from field: string product_name = 2;
     */
    productName: string;
    /**
     * centavos
     *
     * @generated from field: int64 total = 3;
     */
    total: bigint;
};
/**
 * Describes the message service.dashboard.product.v1.TopRevenueRow.
 * Use `create(TopRevenueRowSchema)` to create a new message.
 */
export declare const TopRevenueRowSchema: GenMessage<TopRevenueRow>;
/**
 * GetProductDashboardRequest is the request shape. Carries the Kind
 * discriminator so the use case scopes to product_kind="service" by default
 * but can be retargeted (e.g. "good") without a new method.
 *
 * @generated from message service.dashboard.product.v1.GetProductDashboardRequest
 */
export type GetProductDashboardRequest = Message<"service.dashboard.product.v1.GetProductDashboardRequest"> & {
    /**
     * @generated from field: string workspace_id = 1;
     */
    workspaceId: string;
    /**
     * kind — defaults to "service" when empty.
     *
     * @generated from field: string kind = 2;
     */
    kind: string;
    /**
     * now_millis — unix milliseconds reserved for future time-range filtering.
     * Zero means "use server time".
     *
     * @generated from field: optional int64 now_millis = 3;
     */
    nowMillis?: bigint;
};
/**
 * Describes the message service.dashboard.product.v1.GetProductDashboardRequest.
 * Use `create(GetProductDashboardRequestSchema)` to create a new message.
 */
export declare const GetProductDashboardRequestSchema: GenMessage<GetProductDashboardRequest>;
/**
 * GetProductDashboardResponse is the projection the view layer reads.
 *
 * Parallel label/value series for the by-line chart keep the proto shape
 * stable across language clients without committing to an ordered map
 * (Q-SDM-DASHBOARD-SHARED-TYPES — proto3 maps are unordered).
 *
 * @generated from message service.dashboard.product.v1.GetProductDashboardResponse
 */
export type GetProductDashboardResponse = Message<"service.dashboard.product.v1.GetProductDashboardResponse"> & {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
    /**
     * @generated from field: service.dashboard.product.v1.ProductStats stats = 3;
     */
    stats?: ProductStats;
    /**
     * Products-by-line for chart-bar (parallel slices, sorted by count desc).
     *
     * @generated from field: repeated string line_labels = 4;
     */
    lineLabels: string[];
    /**
     * @generated from field: repeated double line_values = 5;
     */
    lineValues: number[];
    /**
     * Top revenue (placeholder — top-by-recency until revenue join lands).
     *
     * @generated from field: repeated service.dashboard.product.v1.TopRevenueRow top_revenue = 6;
     */
    topRevenue: TopRevenueRow[];
    /**
     * Recent additions (newest-first).
     *
     * @generated from field: repeated domain.product.v1.Product recent = 7;
     */
    recent: Product[];
};
/**
 * Describes the message service.dashboard.product.v1.GetProductDashboardResponse.
 * Use `create(GetProductDashboardResponseSchema)` to create a new message.
 */
export declare const GetProductDashboardResponseSchema: GenMessage<GetProductDashboardResponse>;
