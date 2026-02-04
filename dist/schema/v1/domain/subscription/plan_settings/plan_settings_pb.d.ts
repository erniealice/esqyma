import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/subscription/plan_settings/plan_settings.proto.
 */
export declare const file_domain_subscription_plan_settings_plan_settings: GenFile;
/**
 * @generated from message domain.subscription.v1.PlanSettings
 */
export type PlanSettings = Message<"domain.subscription.v1.PlanSettings"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string plan_id = 2;
     */
    planId: string;
    /**
     * @generated from field: string name = 3;
     */
    name: string;
    /**
     * @generated from field: string description = 4;
     */
    description: string;
    /**
     * @generated from field: optional int64 date_created = 5;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 6;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 7;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 8;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 9;
     */
    active: boolean;
};
/**
 * Describes the message domain.subscription.v1.PlanSettings.
 * Use `create(PlanSettingsSchema)` to create a new message.
 */
export declare const PlanSettingsSchema: GenMessage<PlanSettings>;
/**
 * @generated from message domain.subscription.v1.CreatePlanSettingsRequest
 */
export type CreatePlanSettingsRequest = Message<"domain.subscription.v1.CreatePlanSettingsRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanSettings data = 1;
     */
    data?: PlanSettings;
};
/**
 * Describes the message domain.subscription.v1.CreatePlanSettingsRequest.
 * Use `create(CreatePlanSettingsRequestSchema)` to create a new message.
 */
export declare const CreatePlanSettingsRequestSchema: GenMessage<CreatePlanSettingsRequest>;
/**
 * @generated from message domain.subscription.v1.CreatePlanSettingsResponse
 */
export type CreatePlanSettingsResponse = Message<"domain.subscription.v1.CreatePlanSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanSettings data = 1;
     */
    data: PlanSettings[];
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
 * Describes the message domain.subscription.v1.CreatePlanSettingsResponse.
 * Use `create(CreatePlanSettingsResponseSchema)` to create a new message.
 */
export declare const CreatePlanSettingsResponseSchema: GenMessage<CreatePlanSettingsResponse>;
/**
 * @generated from message domain.subscription.v1.ReadPlanSettingsRequest
 */
export type ReadPlanSettingsRequest = Message<"domain.subscription.v1.ReadPlanSettingsRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanSettings data = 1;
     */
    data?: PlanSettings;
};
/**
 * Describes the message domain.subscription.v1.ReadPlanSettingsRequest.
 * Use `create(ReadPlanSettingsRequestSchema)` to create a new message.
 */
export declare const ReadPlanSettingsRequestSchema: GenMessage<ReadPlanSettingsRequest>;
/**
 * @generated from message domain.subscription.v1.ReadPlanSettingsResponse
 */
export type ReadPlanSettingsResponse = Message<"domain.subscription.v1.ReadPlanSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanSettings data = 1;
     */
    data: PlanSettings[];
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
 * Describes the message domain.subscription.v1.ReadPlanSettingsResponse.
 * Use `create(ReadPlanSettingsResponseSchema)` to create a new message.
 */
export declare const ReadPlanSettingsResponseSchema: GenMessage<ReadPlanSettingsResponse>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanSettingsRequest
 */
export type UpdatePlanSettingsRequest = Message<"domain.subscription.v1.UpdatePlanSettingsRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanSettings data = 1;
     */
    data?: PlanSettings;
};
/**
 * Describes the message domain.subscription.v1.UpdatePlanSettingsRequest.
 * Use `create(UpdatePlanSettingsRequestSchema)` to create a new message.
 */
export declare const UpdatePlanSettingsRequestSchema: GenMessage<UpdatePlanSettingsRequest>;
/**
 * @generated from message domain.subscription.v1.UpdatePlanSettingsResponse
 */
export type UpdatePlanSettingsResponse = Message<"domain.subscription.v1.UpdatePlanSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanSettings data = 1;
     */
    data: PlanSettings[];
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
 * Describes the message domain.subscription.v1.UpdatePlanSettingsResponse.
 * Use `create(UpdatePlanSettingsResponseSchema)` to create a new message.
 */
export declare const UpdatePlanSettingsResponseSchema: GenMessage<UpdatePlanSettingsResponse>;
/**
 * @generated from message domain.subscription.v1.DeletePlanSettingsRequest
 */
export type DeletePlanSettingsRequest = Message<"domain.subscription.v1.DeletePlanSettingsRequest"> & {
    /**
     * @generated from field: domain.subscription.v1.PlanSettings data = 1;
     */
    data?: PlanSettings;
};
/**
 * Describes the message domain.subscription.v1.DeletePlanSettingsRequest.
 * Use `create(DeletePlanSettingsRequestSchema)` to create a new message.
 */
export declare const DeletePlanSettingsRequestSchema: GenMessage<DeletePlanSettingsRequest>;
/**
 * @generated from message domain.subscription.v1.DeletePlanSettingsResponse
 */
export type DeletePlanSettingsResponse = Message<"domain.subscription.v1.DeletePlanSettingsResponse"> & {
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
 * Describes the message domain.subscription.v1.DeletePlanSettingsResponse.
 * Use `create(DeletePlanSettingsResponseSchema)` to create a new message.
 */
export declare const DeletePlanSettingsResponseSchema: GenMessage<DeletePlanSettingsResponse>;
/**
 * @generated from message domain.subscription.v1.ListPlanSettingsRequest
 */
export type ListPlanSettingsRequest = Message<"domain.subscription.v1.ListPlanSettingsRequest"> & {
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
 * Describes the message domain.subscription.v1.ListPlanSettingsRequest.
 * Use `create(ListPlanSettingsRequestSchema)` to create a new message.
 */
export declare const ListPlanSettingsRequestSchema: GenMessage<ListPlanSettingsRequest>;
/**
 * @generated from message domain.subscription.v1.ListPlanSettingsResponse
 */
export type ListPlanSettingsResponse = Message<"domain.subscription.v1.ListPlanSettingsResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanSettings data = 1;
     */
    data: PlanSettings[];
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
 * Describes the message domain.subscription.v1.ListPlanSettingsResponse.
 * Use `create(ListPlanSettingsResponseSchema)` to create a new message.
 */
export declare const ListPlanSettingsResponseSchema: GenMessage<ListPlanSettingsResponse>;
/**
 * @generated from message domain.subscription.v1.ListPlanSettingsByPlanRequest
 */
export type ListPlanSettingsByPlanRequest = Message<"domain.subscription.v1.ListPlanSettingsByPlanRequest"> & {
    /**
     * @generated from field: string plan_id = 1;
     */
    planId: string;
};
/**
 * Describes the message domain.subscription.v1.ListPlanSettingsByPlanRequest.
 * Use `create(ListPlanSettingsByPlanRequestSchema)` to create a new message.
 */
export declare const ListPlanSettingsByPlanRequestSchema: GenMessage<ListPlanSettingsByPlanRequest>;
/**
 * @generated from message domain.subscription.v1.ListPlanSettingsByPlanResponse
 */
export type ListPlanSettingsByPlanResponse = Message<"domain.subscription.v1.ListPlanSettingsByPlanResponse"> & {
    /**
     * @generated from field: repeated domain.subscription.v1.PlanSettings data = 1;
     */
    data: PlanSettings[];
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
 * Describes the message domain.subscription.v1.ListPlanSettingsByPlanResponse.
 * Use `create(ListPlanSettingsByPlanResponseSchema)` to create a new message.
 */
export declare const ListPlanSettingsByPlanResponseSchema: GenMessage<ListPlanSettingsByPlanResponse>;
/**
 * @generated from service domain.subscription.v1.PlanSettingsDomainService
 */
export declare const PlanSettingsDomainService: GenService<{
    /**
     * @generated from rpc domain.subscription.v1.PlanSettingsDomainService.CreatePlanSettings
     */
    createPlanSettings: {
        methodKind: "unary";
        input: typeof CreatePlanSettingsRequestSchema;
        output: typeof CreatePlanSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanSettingsDomainService.ReadPlanSettings
     */
    readPlanSettings: {
        methodKind: "unary";
        input: typeof ReadPlanSettingsRequestSchema;
        output: typeof ReadPlanSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanSettingsDomainService.UpdatePlanSettings
     */
    updatePlanSettings: {
        methodKind: "unary";
        input: typeof UpdatePlanSettingsRequestSchema;
        output: typeof UpdatePlanSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanSettingsDomainService.DeletePlanSettings
     */
    deletePlanSettings: {
        methodKind: "unary";
        input: typeof DeletePlanSettingsRequestSchema;
        output: typeof DeletePlanSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanSettingsDomainService.ListPlanSettings
     */
    listPlanSettings: {
        methodKind: "unary";
        input: typeof ListPlanSettingsRequestSchema;
        output: typeof ListPlanSettingsResponseSchema;
    };
    /**
     * @generated from rpc domain.subscription.v1.PlanSettingsDomainService.ListPlanSettingsByPlan
     */
    listPlanSettingsByPlan: {
        methodKind: "unary";
        input: typeof ListPlanSettingsByPlanRequestSchema;
        output: typeof ListPlanSettingsByPlanResponseSchema;
    };
}>;
