import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/payroll/rate_band/rate_band.proto.
 */
export declare const file_domain_payroll_rate_band_rate_band: GenFile;
/**
 * RateBand is one bracket within a RateTable.
 *
 * Examples:
 *   SSS_EMPLOYEE_SHARE: {lower: 0, upper: 5249, rate_type: "fixed", fixed_amount: 25000}  (250 PHP in centavos)
 *   BIR_WITHHOLDING_SEMI_MONTHLY: {lower: 16667_00, upper: 33332_00, rate_type: "percentage_of_excess",
 *                                   fixed_amount: 93750, rate_basis_points: 2000}  (15% over 16,667 + 937.50)
 *
 * @generated from message domain.payroll.v1.RateBand
 */
export type RateBand = Message<"domain.payroll.v1.RateBand"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string rate_table_id = 2;
     */
    rateTableId: string;
    /**
     * Bracket window — both bounds in centavos.
     *
     * @generated from field: int64 lower_bound_centavos = 3;
     */
    lowerBoundCentavos: bigint;
    /**
     * null = uncapped
     *
     * @generated from field: optional int64 upper_bound_centavos = 4;
     */
    upperBoundCentavos?: bigint;
    /**
     * Rate calculation.
     * rate_type ∈ {"percentage", "fixed", "percentage_of_excess", "formula"}
     *
     * @generated from field: string rate_type = 5;
     */
    rateType: string;
    /**
     * for percentage / percentage_of_excess (10000 = 100%)
     *
     * @generated from field: int32 rate_basis_points = 6;
     */
    rateBasisPoints: number;
    /**
     * for fixed; also the additive constant for percentage_of_excess
     *
     * @generated from field: int64 fixed_amount_centavos = 7;
     */
    fixedAmountCentavos: bigint;
    /**
     * for "formula" rate_type
     *
     * @generated from field: optional string formula_expression = 8;
     */
    formulaExpression?: string;
    /**
     * Display ordering within the table
     *
     * @generated from field: int32 ordinal = 9;
     */
    ordinal: number;
    /**
     * Free-form metadata for jurisdictional quirks (e.g., MPF/WISP split, EC employer-only flag).
     *
     * JSON-encoded map
     *
     * @generated from field: optional string metadata = 10;
     */
    metadata?: string;
    /**
     * Audit
     *
     * @generated from field: bool active = 11;
     */
    active: boolean;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 13;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 14;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 15;
     */
    dateModifiedString?: string;
};
/**
 * Describes the message domain.payroll.v1.RateBand.
 * Use `create(RateBandSchema)` to create a new message.
 */
export declare const RateBandSchema: GenMessage<RateBand>;
/**
 * @generated from message domain.payroll.v1.CreateRateBandRequest
 */
export type CreateRateBandRequest = Message<"domain.payroll.v1.CreateRateBandRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateBand data = 1;
     */
    data?: RateBand;
};
/**
 * Describes the message domain.payroll.v1.CreateRateBandRequest.
 * Use `create(CreateRateBandRequestSchema)` to create a new message.
 */
export declare const CreateRateBandRequestSchema: GenMessage<CreateRateBandRequest>;
/**
 * @generated from message domain.payroll.v1.CreateRateBandResponse
 */
export type CreateRateBandResponse = Message<"domain.payroll.v1.CreateRateBandResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateBand data = 1;
     */
    data: RateBand[];
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
 * Describes the message domain.payroll.v1.CreateRateBandResponse.
 * Use `create(CreateRateBandResponseSchema)` to create a new message.
 */
export declare const CreateRateBandResponseSchema: GenMessage<CreateRateBandResponse>;
/**
 * @generated from message domain.payroll.v1.ReadRateBandRequest
 */
export type ReadRateBandRequest = Message<"domain.payroll.v1.ReadRateBandRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateBand data = 1;
     */
    data?: RateBand;
};
/**
 * Describes the message domain.payroll.v1.ReadRateBandRequest.
 * Use `create(ReadRateBandRequestSchema)` to create a new message.
 */
export declare const ReadRateBandRequestSchema: GenMessage<ReadRateBandRequest>;
/**
 * @generated from message domain.payroll.v1.ReadRateBandResponse
 */
export type ReadRateBandResponse = Message<"domain.payroll.v1.ReadRateBandResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateBand data = 1;
     */
    data: RateBand[];
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
 * Describes the message domain.payroll.v1.ReadRateBandResponse.
 * Use `create(ReadRateBandResponseSchema)` to create a new message.
 */
export declare const ReadRateBandResponseSchema: GenMessage<ReadRateBandResponse>;
/**
 * @generated from message domain.payroll.v1.UpdateRateBandRequest
 */
export type UpdateRateBandRequest = Message<"domain.payroll.v1.UpdateRateBandRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateBand data = 1;
     */
    data?: RateBand;
};
/**
 * Describes the message domain.payroll.v1.UpdateRateBandRequest.
 * Use `create(UpdateRateBandRequestSchema)` to create a new message.
 */
export declare const UpdateRateBandRequestSchema: GenMessage<UpdateRateBandRequest>;
/**
 * @generated from message domain.payroll.v1.UpdateRateBandResponse
 */
export type UpdateRateBandResponse = Message<"domain.payroll.v1.UpdateRateBandResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateBand data = 1;
     */
    data: RateBand[];
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
 * Describes the message domain.payroll.v1.UpdateRateBandResponse.
 * Use `create(UpdateRateBandResponseSchema)` to create a new message.
 */
export declare const UpdateRateBandResponseSchema: GenMessage<UpdateRateBandResponse>;
/**
 * @generated from message domain.payroll.v1.DeleteRateBandRequest
 */
export type DeleteRateBandRequest = Message<"domain.payroll.v1.DeleteRateBandRequest"> & {
    /**
     * @generated from field: domain.payroll.v1.RateBand data = 1;
     */
    data?: RateBand;
};
/**
 * Describes the message domain.payroll.v1.DeleteRateBandRequest.
 * Use `create(DeleteRateBandRequestSchema)` to create a new message.
 */
export declare const DeleteRateBandRequestSchema: GenMessage<DeleteRateBandRequest>;
/**
 * @generated from message domain.payroll.v1.DeleteRateBandResponse
 */
export type DeleteRateBandResponse = Message<"domain.payroll.v1.DeleteRateBandResponse"> & {
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
 * Describes the message domain.payroll.v1.DeleteRateBandResponse.
 * Use `create(DeleteRateBandResponseSchema)` to create a new message.
 */
export declare const DeleteRateBandResponseSchema: GenMessage<DeleteRateBandResponse>;
/**
 * @generated from message domain.payroll.v1.ListRateBandsRequest
 */
export type ListRateBandsRequest = Message<"domain.payroll.v1.ListRateBandsRequest"> & {
    /**
     * @generated from field: optional string rate_table_id = 1;
     */
    rateTableId?: string;
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
 * Describes the message domain.payroll.v1.ListRateBandsRequest.
 * Use `create(ListRateBandsRequestSchema)` to create a new message.
 */
export declare const ListRateBandsRequestSchema: GenMessage<ListRateBandsRequest>;
/**
 * @generated from message domain.payroll.v1.ListRateBandsResponse
 */
export type ListRateBandsResponse = Message<"domain.payroll.v1.ListRateBandsResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateBand data = 1;
     */
    data: RateBand[];
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
 * Describes the message domain.payroll.v1.ListRateBandsResponse.
 * Use `create(ListRateBandsResponseSchema)` to create a new message.
 */
export declare const ListRateBandsResponseSchema: GenMessage<ListRateBandsResponse>;
/**
 * @generated from message domain.payroll.v1.GetRateBandListPageDataRequest
 */
export type GetRateBandListPageDataRequest = Message<"domain.payroll.v1.GetRateBandListPageDataRequest"> & {
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
 * Describes the message domain.payroll.v1.GetRateBandListPageDataRequest.
 * Use `create(GetRateBandListPageDataRequestSchema)` to create a new message.
 */
export declare const GetRateBandListPageDataRequestSchema: GenMessage<GetRateBandListPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetRateBandListPageDataResponse
 */
export type GetRateBandListPageDataResponse = Message<"domain.payroll.v1.GetRateBandListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.payroll.v1.RateBand rate_band_list = 1;
     */
    rateBandList: RateBand[];
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
 * Describes the message domain.payroll.v1.GetRateBandListPageDataResponse.
 * Use `create(GetRateBandListPageDataResponseSchema)` to create a new message.
 */
export declare const GetRateBandListPageDataResponseSchema: GenMessage<GetRateBandListPageDataResponse>;
/**
 * @generated from message domain.payroll.v1.GetRateBandItemPageDataRequest
 */
export type GetRateBandItemPageDataRequest = Message<"domain.payroll.v1.GetRateBandItemPageDataRequest"> & {
    /**
     * @generated from field: string rate_band_id = 1;
     */
    rateBandId: string;
};
/**
 * Describes the message domain.payroll.v1.GetRateBandItemPageDataRequest.
 * Use `create(GetRateBandItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetRateBandItemPageDataRequestSchema: GenMessage<GetRateBandItemPageDataRequest>;
/**
 * @generated from message domain.payroll.v1.GetRateBandItemPageDataResponse
 */
export type GetRateBandItemPageDataResponse = Message<"domain.payroll.v1.GetRateBandItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.payroll.v1.RateBand rate_band = 1;
     */
    rateBand?: RateBand;
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
 * Describes the message domain.payroll.v1.GetRateBandItemPageDataResponse.
 * Use `create(GetRateBandItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetRateBandItemPageDataResponseSchema: GenMessage<GetRateBandItemPageDataResponse>;
/**
 * @generated from service domain.payroll.v1.RateBandDomainService
 */
export declare const RateBandDomainService: GenService<{
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.CreateRateBand
     */
    createRateBand: {
        methodKind: "unary";
        input: typeof CreateRateBandRequestSchema;
        output: typeof CreateRateBandResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.ReadRateBand
     */
    readRateBand: {
        methodKind: "unary";
        input: typeof ReadRateBandRequestSchema;
        output: typeof ReadRateBandResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.UpdateRateBand
     */
    updateRateBand: {
        methodKind: "unary";
        input: typeof UpdateRateBandRequestSchema;
        output: typeof UpdateRateBandResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.DeleteRateBand
     */
    deleteRateBand: {
        methodKind: "unary";
        input: typeof DeleteRateBandRequestSchema;
        output: typeof DeleteRateBandResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.ListRateBands
     */
    listRateBands: {
        methodKind: "unary";
        input: typeof ListRateBandsRequestSchema;
        output: typeof ListRateBandsResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.GetRateBandListPageData
     */
    getRateBandListPageData: {
        methodKind: "unary";
        input: typeof GetRateBandListPageDataRequestSchema;
        output: typeof GetRateBandListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.payroll.v1.RateBandDomainService.GetRateBandItemPageData
     */
    getRateBandItemPageData: {
        methodKind: "unary";
        input: typeof GetRateBandItemPageDataRequestSchema;
        output: typeof GetRateBandItemPageDataResponseSchema;
    };
}>;
