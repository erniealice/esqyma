import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../domain/common/error_pb";
import type { RevenueTaxLine } from "../../domain/revenue/revenue_tax_line/revenue_tax_line_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/tax/compute.proto.
 */
export declare const file_service_tax_compute: GenFile;
/**
 * @generated from message service.tax.v1.ComputeTaxesForRevenueRequest
 */
export type ComputeTaxesForRevenueRequest = Message<"service.tax.v1.ComputeTaxesForRevenueRequest"> & {
    /**
     * RevenueID is the revenue to compute taxes for. Required.
     *
     * @generated from field: string revenue_id = 1;
     */
    revenueId: string;
    /**
     * WorkspaceID is the owning workspace. Required — Revenue proto has no
     * workspace_id field, so the caller (who has the workspace context) must
     * supply it.
     *
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * AsOfDate is the effective date for reading registrations and rates,
     * formatted YYYY-MM-DD. Empty falls back to revenue.revenue_date.
     *
     * @generated from field: string as_of_date = 3;
     */
    asOfDate: string;
    /**
     * DryRun skips all writes and returns preview lines only.
     *
     * @generated from field: bool dry_run = 4;
     */
    dryRun: boolean;
    /**
     * IsRecompute applies the recompute blocking rules (settled / non-void
     * withholding certificate).
     *
     * @generated from field: bool is_recompute = 5;
     */
    isRecompute: boolean;
};
/**
 * Describes the message service.tax.v1.ComputeTaxesForRevenueRequest.
 * Use `create(ComputeTaxesForRevenueRequestSchema)` to create a new message.
 */
export declare const ComputeTaxesForRevenueRequestSchema: GenMessage<ComputeTaxesForRevenueRequest>;
/**
 * @generated from message service.tax.v1.ComputeTaxesForRevenueResponse
 */
export type ComputeTaxesForRevenueResponse = Message<"service.tax.v1.ComputeTaxesForRevenueResponse"> & {
    /**
     * @generated from field: repeated domain.revenue.v1.RevenueTaxLine lines = 1;
     */
    lines: RevenueTaxLine[];
    /**
     * @generated from field: optional domain.common.v1.Error error = 2;
     */
    error?: Error;
};
/**
 * Describes the message service.tax.v1.ComputeTaxesForRevenueResponse.
 * Use `create(ComputeTaxesForRevenueResponseSchema)` to create a new message.
 */
export declare const ComputeTaxesForRevenueResponseSchema: GenMessage<ComputeTaxesForRevenueResponse>;
