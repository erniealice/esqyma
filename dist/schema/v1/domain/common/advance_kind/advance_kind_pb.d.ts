import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file domain/common/advance_kind/advance_kind.proto.
 */
export declare const file_domain_common_advance_kind_advance_kind: GenFile;
/**
 * AdvanceKind classifies a TreasuryCollection / TreasuryDisbursement as an advance
 * cash event and determines how it amortizes into Revenue / ExpenseRecognition.
 *
 * v1 enables NONE + TIME_BASED + MILESTONE + UNSCHEDULED.
 * BURN_DOWN is declared but DISABLED in v1 — Create/Update setters MUST reject
 * this value with a v2-roadmap error. See docs/plan/20260517-advance-cash-events/.
 *
 * @generated from enum domain.common.v1.AdvanceKind
 */
export declare enum AdvanceKind {
    /**
     * same semantics as NONE for backwards compat
     *
     * @generated from enum value: ADVANCE_KIND_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ADVANCE_KIND_NONE = 1;
     */
    NONE = 1,
    /**
     * @generated from enum value: ADVANCE_KIND_TIME_BASED = 2;
     */
    TIME_BASED = 2,
    /**
     * declared, DISABLED in v1
     *
     * @generated from enum value: ADVANCE_KIND_BURN_DOWN = 3;
     */
    BURN_DOWN = 3,
    /**
     * @generated from enum value: ADVANCE_KIND_MILESTONE = 4;
     */
    MILESTONE = 4,
    /**
     * @generated from enum value: ADVANCE_KIND_UNSCHEDULED = 5;
     */
    UNSCHEDULED = 5
}
/**
 * Describes the enum domain.common.v1.AdvanceKind.
 */
export declare const AdvanceKindSchema: GenEnum<AdvanceKind>;
/**
 * AdvanceStatus tracks the lifecycle of an advance cash event.
 *
 * @generated from enum domain.common.v1.AdvanceStatus
 */
export declare enum AdvanceStatus {
    /**
     * @generated from enum value: ADVANCE_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ADVANCE_STATUS_ACTIVE = 1;
     */
    ACTIVE = 1,
    /**
     * selling-side terminal
     *
     * @generated from enum value: ADVANCE_STATUS_FULLY_RECOGNIZED = 2;
     */
    FULLY_RECOGNIZED = 2,
    /**
     * buying-side terminal
     *
     * @generated from enum value: ADVANCE_STATUS_FULLY_AMORTIZED = 3;
     */
    FULLY_AMORTIZED = 3,
    /**
     * BURN_DOWN terminal (v2)
     *
     * @generated from enum value: ADVANCE_STATUS_FULLY_DRAWN = 4;
     */
    FULLY_DRAWN = 4,
    /**
     * @generated from enum value: ADVANCE_STATUS_SETTLED = 5;
     */
    SETTLED = 5,
    /**
     * @generated from enum value: ADVANCE_STATUS_PARTIALLY_SETTLED = 6;
     */
    PARTIALLY_SETTLED = 6,
    /**
     * @generated from enum value: ADVANCE_STATUS_REFUNDED = 7;
     */
    REFUNDED = 7,
    /**
     * @generated from enum value: ADVANCE_STATUS_CANCELLED = 8;
     */
    CANCELLED = 8,
    /**
     * escheat path (v2)
     *
     * @generated from enum value: ADVANCE_STATUS_EXPIRED = 9;
     */
    EXPIRED = 9
}
/**
 * Describes the enum domain.common.v1.AdvanceStatus.
 */
export declare const AdvanceStatusSchema: GenEnum<AdvanceStatus>;
/**
 * AdvanceProrationPolicy controls the first-tranche shape for TIME_BASED advances
 * whose start_date falls mid-period. Only meaningful when advance_kind = TIME_BASED;
 * server-side validation rejects non-UNSPECIFIED values on other kinds with a 400.
 *
 * @generated from enum domain.common.v1.AdvanceProrationPolicy
 */
export declare enum AdvanceProrationPolicy {
    /**
     * falls back to default (FULL_TRANCHE)
     *
     * @generated from enum value: ADVANCE_PRORATION_POLICY_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ADVANCE_PRORATION_POLICY_DAY_PRORATED = 1;
     */
    DAY_PRORATED = 1,
    /**
     * DEFAULT for new TIME_BASED advances
     *
     * @generated from enum value: ADVANCE_PRORATION_POLICY_FULL_TRANCHE = 2;
     */
    FULL_TRANCHE = 2,
    /**
     * @generated from enum value: ADVANCE_PRORATION_POLICY_NEXT_PERIOD_START = 3;
     */
    NEXT_PERIOD_START = 3
}
/**
 * Describes the enum domain.common.v1.AdvanceProrationPolicy.
 */
export declare const AdvanceProrationPolicySchema: GenEnum<AdvanceProrationPolicy>;
/**
 * AdvanceAmortizeOutcome enumerates the terminal states of one Amortize /
 * RecognizeMilestone use-case call. Mirrors RevenueRunAttemptOutcome in shape
 * so the upstream run engines can map outcomes 1:1 without translation tables.
 *
 * CREATED = a fresh Revenue / ExpenseRecognition row was inserted and the
 *           advance counters were decremented.
 * SKIPPED = the period was already recognized; no new row written.
 * ERRORED = validation / read / write failure; counters untouched.
 *
 * @generated from enum domain.common.v1.AdvanceAmortizeOutcome
 */
export declare enum AdvanceAmortizeOutcome {
    /**
     * @generated from enum value: ADVANCE_AMORTIZE_OUTCOME_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ADVANCE_AMORTIZE_OUTCOME_CREATED = 1;
     */
    CREATED = 1,
    /**
     * @generated from enum value: ADVANCE_AMORTIZE_OUTCOME_SKIPPED = 2;
     */
    SKIPPED = 2,
    /**
     * @generated from enum value: ADVANCE_AMORTIZE_OUTCOME_ERRORED = 3;
     */
    ERRORED = 3
}
/**
 * Describes the enum domain.common.v1.AdvanceAmortizeOutcome.
 */
export declare const AdvanceAmortizeOutcomeSchema: GenEnum<AdvanceAmortizeOutcome>;
