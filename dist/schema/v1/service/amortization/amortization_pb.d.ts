import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file service/amortization/amortization.proto.
 */
export declare const file_service_amortization_amortization: GenFile;
/**
 * TrancheSpec is a single computed period in the amortization schedule.
 *
 * @generated from message service.amortization.v1.TrancheSpec
 */
export type TrancheSpec = Message<"service.amortization.v1.TrancheSpec"> & {
    /**
     * Index is the 0-based position of this tranche in the schedule.
     *
     * @generated from field: int32 index = 1;
     */
    index: number;
    /**
     * PeriodStart is YYYY-MM-DD inclusive.
     *
     * @generated from field: string period_start = 2;
     */
    periodStart: string;
    /**
     * PeriodEnd is YYYY-MM-DD inclusive.
     *
     * @generated from field: string period_end = 3;
     */
    periodEnd: string;
    /**
     * Amount is centavos for this tranche. First tranche may be smaller
     * (DAY_PRORATED) or skipped (NEXT_PERIOD_START); last tranche absorbs
     * the centavo remainder so SUM(Amount) == total_amount.
     *
     * @generated from field: int64 amount = 4;
     */
    amount: bigint;
};
/**
 * Describes the message service.amortization.v1.TrancheSpec.
 * Use `create(TrancheSpecSchema)` to create a new message.
 */
export declare const TrancheSpecSchema: GenMessage<TrancheSpec>;
/**
 * @generated from message service.amortization.v1.EnumerateTranchesRequest
 */
export type EnumerateTranchesRequest = Message<"service.amortization.v1.EnumerateTranchesRequest"> & {
    /**
     * StartDate is the advance/schedule start date (YYYY-MM-DD).
     *
     * @generated from field: string start_date = 1;
     */
    startDate: string;
    /**
     * EndDate is the advance/schedule end date (YYYY-MM-DD). Optional; empty
     * means open-ended; the last tranche absorbs any partial if end_date
     * falls mid-period.
     *
     * @generated from field: string end_date = 2;
     */
    endDate: string;
    /**
     * PeriodCount is the total number of tranches. Must be > 0.
     *
     * @generated from field: int32 period_count = 3;
     */
    periodCount: number;
    /**
     * PeriodUnit is "day" | "week" | "month" | "year".
     *
     * @generated from field: string period_unit = 4;
     */
    periodUnit: string;
    /**
     * TotalAmount is the original amount in centavos (integer). Tranche
     * values are derived from this so floating-precision rounding is stable.
     *
     * @generated from field: int64 total_amount = 5;
     */
    totalAmount: bigint;
    /**
     * ProrationPolicy controls the first-tranche behavior.
     *
     * @generated from field: service.amortization.v1.ProrationPolicy proration_policy = 6;
     */
    prorationPolicy: ProrationPolicy;
};
/**
 * Describes the message service.amortization.v1.EnumerateTranchesRequest.
 * Use `create(EnumerateTranchesRequestSchema)` to create a new message.
 */
export declare const EnumerateTranchesRequestSchema: GenMessage<EnumerateTranchesRequest>;
/**
 * @generated from message service.amortization.v1.EnumerateTranchesResponse
 */
export type EnumerateTranchesResponse = Message<"service.amortization.v1.EnumerateTranchesResponse"> & {
    /**
     * @generated from field: repeated service.amortization.v1.TrancheSpec tranches = 1;
     */
    tranches: TrancheSpec[];
};
/**
 * Describes the message service.amortization.v1.EnumerateTranchesResponse.
 * Use `create(EnumerateTranchesResponseSchema)` to create a new message.
 */
export declare const EnumerateTranchesResponseSchema: GenMessage<EnumerateTranchesResponse>;
/**
 * @generated from message service.amortization.v1.ComputeNextDueTrancheRequest
 */
export type ComputeNextDueTrancheRequest = Message<"service.amortization.v1.ComputeNextDueTrancheRequest"> & {
    /**
     * @generated from field: string start_date = 1;
     */
    startDate: string;
    /**
     * @generated from field: string end_date = 2;
     */
    endDate: string;
    /**
     * @generated from field: int32 period_count = 3;
     */
    periodCount: number;
    /**
     * @generated from field: string period_unit = 4;
     */
    periodUnit: string;
    /**
     * @generated from field: int64 total_amount = 5;
     */
    totalAmount: bigint;
    /**
     * @generated from field: service.amortization.v1.ProrationPolicy proration_policy = 6;
     */
    prorationPolicy: ProrationPolicy;
    /**
     * AsOfDate is the operator's "as of" cursor (YYYY-MM-DD). Used to pick
     * the next un-recognized tranche.
     *
     * @generated from field: string as_of_date = 7;
     */
    asOfDate: string;
};
/**
 * Describes the message service.amortization.v1.ComputeNextDueTrancheRequest.
 * Use `create(ComputeNextDueTrancheRequestSchema)` to create a new message.
 */
export declare const ComputeNextDueTrancheRequestSchema: GenMessage<ComputeNextDueTrancheRequest>;
/**
 * @generated from message service.amortization.v1.ComputeNextDueTrancheResponse
 */
export type ComputeNextDueTrancheResponse = Message<"service.amortization.v1.ComputeNextDueTrancheResponse"> & {
    /**
     * Tranche is populated when found=true.
     *
     * @generated from field: optional service.amortization.v1.TrancheSpec tranche = 1;
     */
    tranche?: TrancheSpec;
    /**
     * Found is true when there is an un-recognized tranche whose start
     * is <= as_of_date.
     *
     * @generated from field: bool found = 2;
     */
    found: boolean;
};
/**
 * Describes the message service.amortization.v1.ComputeNextDueTrancheResponse.
 * Use `create(ComputeNextDueTrancheResponseSchema)` to create a new message.
 */
export declare const ComputeNextDueTrancheResponseSchema: GenMessage<ComputeNextDueTrancheResponse>;
/**
 * ProrationPolicy controls the first-tranche behavior when the start date
 * falls mid-period.
 *
 * @generated from enum service.amortization.v1.ProrationPolicy
 */
export declare enum ProrationPolicy {
    /**
     * UNSPECIFIED normalizes to FULL_TRANCHE per Decision 13.
     *
     * @generated from enum value: PRORATION_POLICY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * DAY_PRORATED splits the first tranche by elapsed days over period days.
     *
     * @generated from enum value: PRORATION_POLICY_DAY_PRORATED = 1;
     */
    DAY_PRORATED = 1,
    /**
     * FULL_TRANCHE makes the first tranche a full period even if start falls
     * mid-period. This is the default.
     *
     * @generated from enum value: PRORATION_POLICY_FULL_TRANCHE = 2;
     */
    FULL_TRANCHE = 2,
    /**
     * NEXT_PERIOD_START skips the partial current period and anchors the first
     * tranche to the next period boundary.
     *
     * @generated from enum value: PRORATION_POLICY_NEXT_PERIOD_START = 3;
     */
    NEXT_PERIOD_START = 3
}
/**
 * Describes the enum service.amortization.v1.ProrationPolicy.
 */
export declare const ProrationPolicySchema: GenEnum<ProrationPolicy>;
