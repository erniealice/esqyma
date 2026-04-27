import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file domain/operation/enums/enums.proto.
 */
export declare const file_domain_operation_enums_enums: GenFile;
/**
 * @generated from enum domain.operation.v1.OriginType
 */
export declare enum OriginType {
    /**
     * @generated from enum value: ORIGIN_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ORIGIN_TYPE_SUBSCRIPTION = 1;
     */
    SUBSCRIPTION = 1,
    /**
     * @generated from enum value: ORIGIN_TYPE_ORDER = 2;
     */
    ORDER = 2,
    /**
     * @generated from enum value: ORIGIN_TYPE_BOOKING = 3;
     */
    BOOKING = 3,
    /**
     * @generated from enum value: ORIGIN_TYPE_INTERNAL = 4;
     */
    INTERNAL = 4,
    /**
     * @generated from enum value: ORIGIN_TYPE_WARRANTY = 5;
     */
    WARRANTY = 5,
    /**
     * @generated from enum value: ORIGIN_TYPE_AD_HOC = 6;
     */
    AD_HOC = 6
}
/**
 * Describes the enum domain.operation.v1.OriginType.
 */
export declare const OriginTypeSchema: GenEnum<OriginType>;
/**
 * @generated from enum domain.operation.v1.DemandType
 */
export declare enum DemandType {
    /**
     * @generated from enum value: DEMAND_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DEMAND_TYPE_MTO = 1;
     */
    MTO = 1,
    /**
     * @generated from enum value: DEMAND_TYPE_MTS = 2;
     */
    MTS = 2,
    /**
     * @generated from enum value: DEMAND_TYPE_INTERNAL = 3;
     */
    INTERNAL = 3,
    /**
     * @generated from enum value: DEMAND_TYPE_WARRANTY = 4;
     */
    WARRANTY = 4,
    /**
     * @generated from enum value: DEMAND_TYPE_AD_HOC = 5;
     */
    AD_HOC = 5
}
/**
 * Describes the enum domain.operation.v1.DemandType.
 */
export declare const DemandTypeSchema: GenEnum<DemandType>;
/**
 * @generated from enum domain.operation.v1.FulfillmentType
 */
export declare enum FulfillmentType {
    /**
     * @generated from enum value: FULFILLMENT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: FULFILLMENT_TYPE_SERVICE = 1;
     */
    SERVICE = 1,
    /**
     * @generated from enum value: FULFILLMENT_TYPE_PRODUCTION = 2;
     */
    PRODUCTION = 2,
    /**
     * @generated from enum value: FULFILLMENT_TYPE_PROJECT = 3;
     */
    PROJECT = 3,
    /**
     * @generated from enum value: FULFILLMENT_TYPE_MAINTENANCE = 4;
     */
    MAINTENANCE = 4
}
/**
 * Describes the enum domain.operation.v1.FulfillmentType.
 */
export declare const FulfillmentTypeSchema: GenEnum<FulfillmentType>;
/**
 * @generated from enum domain.operation.v1.CostFlowType
 */
export declare enum CostFlowType {
    /**
     * @generated from enum value: COST_FLOW_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: COST_FLOW_TYPE_DIRECT_EXPENSE = 1;
     */
    DIRECT_EXPENSE = 1,
    /**
     * @generated from enum value: COST_FLOW_TYPE_WIP = 2;
     */
    WIP = 2,
    /**
     * @generated from enum value: COST_FLOW_TYPE_INVENTORY = 3;
     */
    INVENTORY = 3,
    /**
     * @generated from enum value: COST_FLOW_TYPE_OVERHEAD = 4;
     */
    OVERHEAD = 4,
    /**
     * @generated from enum value: COST_FLOW_TYPE_CONTRACT_ASSET = 5;
     */
    CONTRACT_ASSET = 5
}
/**
 * Describes the enum domain.operation.v1.CostFlowType.
 */
export declare const CostFlowTypeSchema: GenEnum<CostFlowType>;
/**
 * @generated from enum domain.operation.v1.BillingRuleType
 */
export declare enum BillingRuleType {
    /**
     * @generated from enum value: BILLING_RULE_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: BILLING_RULE_TYPE_FIXED_FEE = 1;
     */
    FIXED_FEE = 1,
    /**
     * @generated from enum value: BILLING_RULE_TYPE_T_AND_M = 2;
     */
    T_AND_M = 2,
    /**
     * @generated from enum value: BILLING_RULE_TYPE_MILESTONE = 3;
     */
    MILESTONE = 3,
    /**
     * @generated from enum value: BILLING_RULE_TYPE_INCLUDED = 4;
     */
    INCLUDED = 4,
    /**
     * @generated from enum value: BILLING_RULE_TYPE_NON_BILLABLE = 5;
     */
    NON_BILLABLE = 5
}
/**
 * Describes the enum domain.operation.v1.BillingRuleType.
 */
export declare const BillingRuleTypeSchema: GenEnum<BillingRuleType>;
/**
 * @generated from enum domain.operation.v1.JobStatus
 */
export declare enum JobStatus {
    /**
     * @generated from enum value: JOB_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: JOB_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: JOB_STATUS_PENDING = 2;
     */
    PENDING = 2,
    /**
     * @generated from enum value: JOB_STATUS_ACTIVE = 3;
     */
    ACTIVE = 3,
    /**
     * @generated from enum value: JOB_STATUS_PAUSED = 4;
     */
    PAUSED = 4,
    /**
     * @generated from enum value: JOB_STATUS_COMPLETED = 5;
     */
    COMPLETED = 5,
    /**
     * @generated from enum value: JOB_STATUS_CLOSED = 6;
     */
    CLOSED = 6,
    /**
     * NEW
     *
     * @generated from enum value: JOB_STATUS_PLANNED = 7;
     */
    PLANNED = 7,
    /**
     * NEW
     *
     * @generated from enum value: JOB_STATUS_RELEASED = 8;
     */
    RELEASED = 8
}
/**
 * Describes the enum domain.operation.v1.JobStatus.
 */
export declare const JobStatusSchema: GenEnum<JobStatus>;
/**
 * @generated from enum domain.operation.v1.ApprovalStatus
 */
export declare enum ApprovalStatus {
    /**
     * @generated from enum value: APPROVAL_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: APPROVAL_STATUS_NOT_REQUIRED = 1;
     */
    NOT_REQUIRED = 1,
    /**
     * @generated from enum value: APPROVAL_STATUS_PENDING_APPROVAL = 2;
     */
    PENDING_APPROVAL = 2,
    /**
     * @generated from enum value: APPROVAL_STATUS_APPROVED = 3;
     */
    APPROVED = 3,
    /**
     * @generated from enum value: APPROVAL_STATUS_REJECTED = 4;
     */
    REJECTED = 4
}
/**
 * Describes the enum domain.operation.v1.ApprovalStatus.
 */
export declare const ApprovalStatusSchema: GenEnum<ApprovalStatus>;
/**
 * @generated from enum domain.operation.v1.PostingStatus
 */
export declare enum PostingStatus {
    /**
     * @generated from enum value: POSTING_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: POSTING_STATUS_UNPOSTED = 1;
     */
    UNPOSTED = 1,
    /**
     * @generated from enum value: POSTING_STATUS_PARTIALLY_POSTED = 2;
     */
    PARTIALLY_POSTED = 2,
    /**
     * @generated from enum value: POSTING_STATUS_POSTED = 3;
     */
    POSTED = 3,
    /**
     * @generated from enum value: POSTING_STATUS_REVERSED = 4;
     */
    REVERSED = 4
}
/**
 * Describes the enum domain.operation.v1.PostingStatus.
 */
export declare const PostingStatusSchema: GenEnum<PostingStatus>;
/**
 * @generated from enum domain.operation.v1.BillingStatus
 */
export declare enum BillingStatus {
    /**
     * @generated from enum value: BILLING_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: BILLING_STATUS_UNBILLED = 1;
     */
    UNBILLED = 1,
    /**
     * @generated from enum value: BILLING_STATUS_PARTIALLY_BILLED = 2;
     */
    PARTIALLY_BILLED = 2,
    /**
     * @generated from enum value: BILLING_STATUS_FULLY_BILLED = 3;
     */
    FULLY_BILLED = 3,
    /**
     * @generated from enum value: BILLING_STATUS_WRITTEN_OFF = 4;
     */
    WRITTEN_OFF = 4
}
/**
 * Describes the enum domain.operation.v1.BillingStatus.
 */
export declare const BillingStatusSchema: GenEnum<BillingStatus>;
/**
 * @generated from enum domain.operation.v1.MovementType
 */
export declare enum MovementType {
    /**
     * @generated from enum value: MOVEMENT_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: MOVEMENT_TYPE_ISSUE = 1;
     */
    ISSUE = 1,
    /**
     * @generated from enum value: MOVEMENT_TYPE_COMPLETION = 2;
     */
    COMPLETION = 2,
    /**
     * @generated from enum value: MOVEMENT_TYPE_SCRAP = 3;
     */
    SCRAP = 3,
    /**
     * @generated from enum value: MOVEMENT_TYPE_TRANSFER = 4;
     */
    TRANSFER = 4,
    /**
     * @generated from enum value: MOVEMENT_TYPE_ADJUSTMENT = 5;
     */
    ADJUSTMENT = 5,
    /**
     * @generated from enum value: MOVEMENT_TYPE_RECEIPT = 6;
     */
    RECEIPT = 6,
    /**
     * @generated from enum value: MOVEMENT_TYPE_RETURN = 7;
     */
    RETURN = 7,
    /**
     * @generated from enum value: MOVEMENT_TYPE_SELL = 8;
     */
    SELL = 8,
    /**
     * @generated from enum value: MOVEMENT_TYPE_EXPIRE = 9;
     */
    EXPIRE = 9
}
/**
 * Describes the enum domain.operation.v1.MovementType.
 */
export declare const MovementTypeSchema: GenEnum<MovementType>;
/**
 * @generated from enum domain.operation.v1.CriteriaType
 */
export declare enum CriteriaType {
    /**
     * @generated from enum value: CRITERIA_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CRITERIA_TYPE_NUMERIC_RANGE = 1;
     */
    NUMERIC_RANGE = 1,
    /**
     * @generated from enum value: CRITERIA_TYPE_NUMERIC_SCORE = 2;
     */
    NUMERIC_SCORE = 2,
    /**
     * @generated from enum value: CRITERIA_TYPE_PASS_FAIL = 3;
     */
    PASS_FAIL = 3,
    /**
     * @generated from enum value: CRITERIA_TYPE_CATEGORICAL = 4;
     */
    CATEGORICAL = 4,
    /**
     * @generated from enum value: CRITERIA_TYPE_TEXT = 5;
     */
    TEXT = 5,
    /**
     * @generated from enum value: CRITERIA_TYPE_MULTI_CHECK = 6;
     */
    MULTI_CHECK = 6
}
/**
 * Describes the enum domain.operation.v1.CriteriaType.
 */
export declare const CriteriaTypeSchema: GenEnum<CriteriaType>;
/**
 * @generated from enum domain.operation.v1.DeterminationMode
 */
export declare enum DeterminationMode {
    /**
     * @generated from enum value: DETERMINATION_MODE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DETERMINATION_MODE_AUTO = 1;
     */
    AUTO = 1,
    /**
     * @generated from enum value: DETERMINATION_MODE_MANUAL = 2;
     */
    MANUAL = 2,
    /**
     * @generated from enum value: DETERMINATION_MODE_AUTO_WITH_REVIEW = 3;
     */
    AUTO_WITH_REVIEW = 3
}
/**
 * Describes the enum domain.operation.v1.DeterminationMode.
 */
export declare const DeterminationModeSchema: GenEnum<DeterminationMode>;
/**
 * @generated from enum domain.operation.v1.Determination
 */
export declare enum Determination {
    /**
     * @generated from enum value: DETERMINATION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DETERMINATION_PASS = 1;
     */
    PASS = 1,
    /**
     * @generated from enum value: DETERMINATION_FAIL = 2;
     */
    FAIL = 2,
    /**
     * @generated from enum value: DETERMINATION_PASS_WITH_CONDITION = 3;
     */
    PASS_WITH_CONDITION = 3,
    /**
     * @generated from enum value: DETERMINATION_NOT_EVALUATED = 4;
     */
    NOT_EVALUATED = 4,
    /**
     * @generated from enum value: DETERMINATION_NOT_APPLICABLE = 5;
     */
    NOT_APPLICABLE = 5,
    /**
     * @generated from enum value: DETERMINATION_DEFERRED = 6;
     */
    DEFERRED = 6
}
/**
 * Describes the enum domain.operation.v1.Determination.
 */
export declare const DeterminationSchema: GenEnum<Determination>;
/**
 * @generated from enum domain.operation.v1.DeterminationSource
 */
export declare enum DeterminationSource {
    /**
     * @generated from enum value: DETERMINATION_SOURCE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: DETERMINATION_SOURCE_AUTO_COMPUTED = 1;
     */
    AUTO_COMPUTED = 1,
    /**
     * @generated from enum value: DETERMINATION_SOURCE_HUMAN_ASSIGNED = 2;
     */
    HUMAN_ASSIGNED = 2,
    /**
     * @generated from enum value: DETERMINATION_SOURCE_AUTO_PROPOSED = 3;
     */
    AUTO_PROPOSED = 3,
    /**
     * @generated from enum value: DETERMINATION_SOURCE_HUMAN_CONFIRMED = 4;
     */
    HUMAN_CONFIRMED = 4,
    /**
     * @generated from enum value: DETERMINATION_SOURCE_HUMAN_OVERRIDE = 5;
     */
    HUMAN_OVERRIDE = 5
}
/**
 * Describes the enum domain.operation.v1.DeterminationSource.
 */
export declare const DeterminationSourceSchema: GenEnum<DeterminationSource>;
/**
 * @generated from enum domain.operation.v1.AggregationMethod
 */
export declare enum AggregationMethod {
    /**
     * @generated from enum value: AGGREGATION_METHOD_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: AGGREGATION_METHOD_INDIVIDUAL = 1;
     */
    INDIVIDUAL = 1,
    /**
     * @generated from enum value: AGGREGATION_METHOD_AVERAGE = 2;
     */
    AVERAGE = 2,
    /**
     * @generated from enum value: AGGREGATION_METHOD_WORST = 3;
     */
    WORST = 3,
    /**
     * @generated from enum value: AGGREGATION_METHOD_LATEST = 4;
     */
    LATEST = 4,
    /**
     * @generated from enum value: AGGREGATION_METHOD_ALL_MUST_PASS = 5;
     */
    ALL_MUST_PASS = 5,
    /**
     * @generated from enum value: AGGREGATION_METHOD_PERCENTAGE = 6;
     */
    PERCENTAGE = 6
}
/**
 * Describes the enum domain.operation.v1.AggregationMethod.
 */
export declare const AggregationMethodSchema: GenEnum<AggregationMethod>;
/**
 * @generated from enum domain.operation.v1.ScoringMethod
 */
export declare enum ScoringMethod {
    /**
     * @generated from enum value: SCORING_METHOD_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SCORING_METHOD_EQUAL_WEIGHT = 1;
     */
    EQUAL_WEIGHT = 1,
    /**
     * @generated from enum value: SCORING_METHOD_WEIGHTED_AVERAGE = 2;
     */
    WEIGHTED_AVERAGE = 2,
    /**
     * @generated from enum value: SCORING_METHOD_MINIMUM_DETERMINATION = 3;
     */
    MINIMUM_DETERMINATION = 3,
    /**
     * @generated from enum value: SCORING_METHOD_PERCENTAGE_PASS = 4;
     */
    PERCENTAGE_PASS = 4
}
/**
 * Describes the enum domain.operation.v1.ScoringMethod.
 */
export declare const ScoringMethodSchema: GenEnum<ScoringMethod>;
/**
 * @generated from enum domain.operation.v1.SummaryType
 */
export declare enum SummaryType {
    /**
     * @generated from enum value: SUMMARY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: SUMMARY_TYPE_DIAGNOSTIC_REPORT = 1;
     */
    DIAGNOSTIC_REPORT = 1,
    /**
     * @generated from enum value: SUMMARY_TYPE_ACADEMIC_RECORD = 2;
     */
    ACADEMIC_RECORD = 2,
    /**
     * @generated from enum value: SUMMARY_TYPE_QC_CERTIFICATE = 3;
     */
    QC_CERTIFICATE = 3,
    /**
     * @generated from enum value: SUMMARY_TYPE_DELIVERY_ACCEPTANCE = 4;
     */
    DELIVERY_ACCEPTANCE = 4,
    /**
     * @generated from enum value: SUMMARY_TYPE_INSPECTION_REPORT = 5;
     */
    INSPECTION_REPORT = 5,
    /**
     * @generated from enum value: SUMMARY_TYPE_COMPLIANCE_REPORT = 6;
     */
    COMPLIANCE_REPORT = 6,
    /**
     * @generated from enum value: SUMMARY_TYPE_GENERAL = 7;
     */
    GENERAL = 7
}
/**
 * Describes the enum domain.operation.v1.SummaryType.
 */
export declare const SummaryTypeSchema: GenEnum<SummaryType>;
/**
 * @generated from enum domain.operation.v1.OverallDetermination
 */
export declare enum OverallDetermination {
    /**
     * @generated from enum value: OVERALL_DETERMINATION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: OVERALL_DETERMINATION_ACCEPTED = 1;
     */
    ACCEPTED = 1,
    /**
     * @generated from enum value: OVERALL_DETERMINATION_CONDITIONALLY_ACCEPTED = 2;
     */
    CONDITIONALLY_ACCEPTED = 2,
    /**
     * @generated from enum value: OVERALL_DETERMINATION_REJECTED = 3;
     */
    REJECTED = 3,
    /**
     * @generated from enum value: OVERALL_DETERMINATION_IN_PROGRESS = 4;
     */
    IN_PROGRESS = 4,
    /**
     * @generated from enum value: OVERALL_DETERMINATION_DEFERRED = 5;
     */
    DEFERRED = 5
}
/**
 * Describes the enum domain.operation.v1.OverallDetermination.
 */
export declare const OverallDeterminationSchema: GenEnum<OverallDetermination>;
/**
 * @generated from enum domain.operation.v1.VersionStatus
 */
export declare enum VersionStatus {
    /**
     * @generated from enum value: VERSION_STATUS_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: VERSION_STATUS_DRAFT = 1;
     */
    DRAFT = 1,
    /**
     * @generated from enum value: VERSION_STATUS_PUBLISHED = 2;
     */
    PUBLISHED = 2,
    /**
     * @generated from enum value: VERSION_STATUS_DEPRECATED = 3;
     */
    DEPRECATED = 3
}
/**
 * Describes the enum domain.operation.v1.VersionStatus.
 */
export declare const VersionStatusSchema: GenEnum<VersionStatus>;
/**
 * @generated from enum domain.operation.v1.CriteriaScope
 */
export declare enum CriteriaScope {
    /**
     * @generated from enum value: CRITERIA_SCOPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: CRITERIA_SCOPE_SYSTEM = 1;
     */
    SYSTEM = 1,
    /**
     * @generated from enum value: CRITERIA_SCOPE_INDUSTRY = 2;
     */
    INDUSTRY = 2,
    /**
     * @generated from enum value: CRITERIA_SCOPE_WORKSPACE = 3;
     */
    WORKSPACE = 3
}
/**
 * Describes the enum domain.operation.v1.CriteriaScope.
 */
export declare const CriteriaScopeSchema: GenEnum<CriteriaScope>;
/**
 * @generated from enum domain.operation.v1.PassRule
 */
export declare enum PassRule {
    /**
     * @generated from enum value: PASS_RULE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: PASS_RULE_ALL_REQUIRED = 1;
     */
    ALL_REQUIRED = 1,
    /**
     * @generated from enum value: PASS_RULE_ALL_ITEMS = 2;
     */
    ALL_ITEMS = 2,
    /**
     * @generated from enum value: PASS_RULE_MIN_COUNT = 3;
     */
    MIN_COUNT = 3
}
/**
 * Describes the enum domain.operation.v1.PassRule.
 */
export declare const PassRuleSchema: GenEnum<PassRule>;
/**
 * @generated from enum domain.operation.v1.ThresholdRole
 */
export declare enum ThresholdRole {
    /**
     * @generated from enum value: THRESHOLD_ROLE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: THRESHOLD_ROLE_RECORDABLE_MIN = 1;
     */
    RECORDABLE_MIN = 1,
    /**
     * @generated from enum value: THRESHOLD_ROLE_RECORDABLE_MAX = 2;
     */
    RECORDABLE_MAX = 2,
    /**
     * @generated from enum value: THRESHOLD_ROLE_PASS_MIN = 3;
     */
    PASS_MIN = 3,
    /**
     * @generated from enum value: THRESHOLD_ROLE_PASS_MAX = 4;
     */
    PASS_MAX = 4,
    /**
     * @generated from enum value: THRESHOLD_ROLE_WARN_MIN = 5;
     */
    WARN_MIN = 5,
    /**
     * @generated from enum value: THRESHOLD_ROLE_WARN_MAX = 6;
     */
    WARN_MAX = 6,
    /**
     * @generated from enum value: THRESHOLD_ROLE_CRITICAL_MIN = 7;
     */
    CRITICAL_MIN = 7,
    /**
     * @generated from enum value: THRESHOLD_ROLE_CRITICAL_MAX = 8;
     */
    CRITICAL_MAX = 8,
    /**
     * @generated from enum value: THRESHOLD_ROLE_NOMINAL = 9;
     */
    NOMINAL = 9,
    /**
     * @generated from enum value: THRESHOLD_ROLE_TOLERANCE_PLUS = 10;
     */
    TOLERANCE_PLUS = 10,
    /**
     * @generated from enum value: THRESHOLD_ROLE_TOLERANCE_MINUS = 11;
     */
    TOLERANCE_MINUS = 11,
    /**
     * @generated from enum value: THRESHOLD_ROLE_WARN_TOLERANCE_PLUS = 12;
     */
    WARN_TOLERANCE_PLUS = 12,
    /**
     * @generated from enum value: THRESHOLD_ROLE_WARN_TOLERANCE_MINUS = 13;
     */
    WARN_TOLERANCE_MINUS = 13,
    /**
     * @generated from enum value: THRESHOLD_ROLE_PASS_THRESHOLD = 14;
     */
    PASS_THRESHOLD = 14,
    /**
     * @generated from enum value: THRESHOLD_ROLE_DISTINCTION_THRESHOLD = 15;
     */
    DISTINCTION_THRESHOLD = 15
}
/**
 * Describes the enum domain.operation.v1.ThresholdRole.
 */
export declare const ThresholdRoleSchema: GenEnum<ThresholdRole>;
