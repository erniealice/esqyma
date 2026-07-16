import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/line_parent/line_parent.proto.
 */
export declare const file_domain_product_line_parent_line_parent: GenFile;
/**
 * @generated from message domain.product.v1.LineParent
 */
export type LineParent = Message<"domain.product.v1.LineParent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string line_parent_id = 2;
     */
    lineParentId: string;
    /**
     * @generated from field: string line_id = 3;
     */
    lineId: string;
    /**
     * @generated from field: optional int64 date_created = 4;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 5;
     */
    dateCreatedString?: string;
    /**
     * @generated from field: optional int64 date_modified = 6;
     */
    dateModified?: bigint;
    /**
     * @generated from field: optional string date_modified_string = 7;
     */
    dateModifiedString?: string;
    /**
     * @generated from field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from field: string workspace_id = 9;
     */
    workspaceId: string;
};
/**
 * Describes the message domain.product.v1.LineParent.
 * Use `create(LineParentSchema)` to create a new message.
 */
export declare const LineParentSchema: GenMessage<LineParent>;
/**
 * @generated from message domain.product.v1.CreateLineParentRequest
 */
export type CreateLineParentRequest = Message<"domain.product.v1.CreateLineParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineParent data = 1;
     */
    data?: LineParent;
};
/**
 * Describes the message domain.product.v1.CreateLineParentRequest.
 * Use `create(CreateLineParentRequestSchema)` to create a new message.
 */
export declare const CreateLineParentRequestSchema: GenMessage<CreateLineParentRequest>;
/**
 * @generated from message domain.product.v1.CreateLineParentResponse
 */
export type CreateLineParentResponse = Message<"domain.product.v1.CreateLineParentResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineParent data = 1;
     */
    data: LineParent[];
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
 * Describes the message domain.product.v1.CreateLineParentResponse.
 * Use `create(CreateLineParentResponseSchema)` to create a new message.
 */
export declare const CreateLineParentResponseSchema: GenMessage<CreateLineParentResponse>;
/**
 * @generated from message domain.product.v1.ReadLineParentRequest
 */
export type ReadLineParentRequest = Message<"domain.product.v1.ReadLineParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineParent data = 1;
     */
    data?: LineParent;
};
/**
 * Describes the message domain.product.v1.ReadLineParentRequest.
 * Use `create(ReadLineParentRequestSchema)` to create a new message.
 */
export declare const ReadLineParentRequestSchema: GenMessage<ReadLineParentRequest>;
/**
 * @generated from message domain.product.v1.ReadLineParentResponse
 */
export type ReadLineParentResponse = Message<"domain.product.v1.ReadLineParentResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineParent data = 1;
     */
    data: LineParent[];
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
 * Describes the message domain.product.v1.ReadLineParentResponse.
 * Use `create(ReadLineParentResponseSchema)` to create a new message.
 */
export declare const ReadLineParentResponseSchema: GenMessage<ReadLineParentResponse>;
/**
 * @generated from message domain.product.v1.UpdateLineParentRequest
 */
export type UpdateLineParentRequest = Message<"domain.product.v1.UpdateLineParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineParent data = 1;
     */
    data?: LineParent;
};
/**
 * Describes the message domain.product.v1.UpdateLineParentRequest.
 * Use `create(UpdateLineParentRequestSchema)` to create a new message.
 */
export declare const UpdateLineParentRequestSchema: GenMessage<UpdateLineParentRequest>;
/**
 * @generated from message domain.product.v1.UpdateLineParentResponse
 */
export type UpdateLineParentResponse = Message<"domain.product.v1.UpdateLineParentResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineParent data = 1;
     */
    data: LineParent[];
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
 * Describes the message domain.product.v1.UpdateLineParentResponse.
 * Use `create(UpdateLineParentResponseSchema)` to create a new message.
 */
export declare const UpdateLineParentResponseSchema: GenMessage<UpdateLineParentResponse>;
/**
 * @generated from message domain.product.v1.DeleteLineParentRequest
 */
export type DeleteLineParentRequest = Message<"domain.product.v1.DeleteLineParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.LineParent data = 1;
     */
    data?: LineParent;
};
/**
 * Describes the message domain.product.v1.DeleteLineParentRequest.
 * Use `create(DeleteLineParentRequestSchema)` to create a new message.
 */
export declare const DeleteLineParentRequestSchema: GenMessage<DeleteLineParentRequest>;
/**
 * @generated from message domain.product.v1.DeleteLineParentResponse
 */
export type DeleteLineParentResponse = Message<"domain.product.v1.DeleteLineParentResponse"> & {
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
 * Describes the message domain.product.v1.DeleteLineParentResponse.
 * Use `create(DeleteLineParentResponseSchema)` to create a new message.
 */
export declare const DeleteLineParentResponseSchema: GenMessage<DeleteLineParentResponse>;
/**
 * @generated from message domain.product.v1.ListLineParentsRequest
 */
export type ListLineParentsRequest = Message<"domain.product.v1.ListLineParentsRequest"> & {
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
 * Describes the message domain.product.v1.ListLineParentsRequest.
 * Use `create(ListLineParentsRequestSchema)` to create a new message.
 */
export declare const ListLineParentsRequestSchema: GenMessage<ListLineParentsRequest>;
/**
 * @generated from message domain.product.v1.ListLineParentsResponse
 */
export type ListLineParentsResponse = Message<"domain.product.v1.ListLineParentsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.LineParent data = 1;
     */
    data: LineParent[];
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
 * Describes the message domain.product.v1.ListLineParentsResponse.
 * Use `create(ListLineParentsResponseSchema)` to create a new message.
 */
export declare const ListLineParentsResponseSchema: GenMessage<ListLineParentsResponse>;
/**
 * @generated from service domain.product.v1.LineParentDomainService
 */
export declare const LineParentDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.LineParentDomainService.CreateLineParent
     */
    createLineParent: {
        methodKind: "unary";
        input: typeof CreateLineParentRequestSchema;
        output: typeof CreateLineParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineParentDomainService.ReadLineParent
     */
    readLineParent: {
        methodKind: "unary";
        input: typeof ReadLineParentRequestSchema;
        output: typeof ReadLineParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineParentDomainService.UpdateLineParent
     */
    updateLineParent: {
        methodKind: "unary";
        input: typeof UpdateLineParentRequestSchema;
        output: typeof UpdateLineParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineParentDomainService.DeleteLineParent
     */
    deleteLineParent: {
        methodKind: "unary";
        input: typeof DeleteLineParentRequestSchema;
        output: typeof DeleteLineParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineParentDomainService.ListLineParents
     */
    listLineParents: {
        methodKind: "unary";
        input: typeof ListLineParentsRequestSchema;
        output: typeof ListLineParentsResponseSchema;
    };
}>;
