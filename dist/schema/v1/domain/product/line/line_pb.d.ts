import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { ProductLine } from "../product_line/product_line_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/line/line.proto.
 */
export declare const file_domain_product_line_line: GenFile;
/**
 * Line represents a product taxonomy grouping used for product/service line organization.
 *
 * @generated from message domain.product.v1.Line
 */
export type Line = Message<"domain.product.v1.Line"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string description = 3;
     */
    description: string;
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
     * @generated from field: repeated domain.product.v1.ProductLine product_lines = 9;
     */
    productLines: ProductLine[];
};
/**
 * Describes the message domain.product.v1.Line.
 * Use `create(LineSchema)` to create a new message.
 */
export declare const LineSchema: GenMessage<Line>;
/**
 * @generated from message domain.product.v1.CreateLineRequest
 */
export type CreateLineRequest = Message<"domain.product.v1.CreateLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.Line data = 1;
     */
    data?: Line;
};
/**
 * Describes the message domain.product.v1.CreateLineRequest.
 * Use `create(CreateLineRequestSchema)` to create a new message.
 */
export declare const CreateLineRequestSchema: GenMessage<CreateLineRequest>;
/**
 * @generated from message domain.product.v1.CreateLineResponse
 */
export type CreateLineResponse = Message<"domain.product.v1.CreateLineResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Line data = 1;
     */
    data: Line[];
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
 * Describes the message domain.product.v1.CreateLineResponse.
 * Use `create(CreateLineResponseSchema)` to create a new message.
 */
export declare const CreateLineResponseSchema: GenMessage<CreateLineResponse>;
/**
 * @generated from message domain.product.v1.ReadLineRequest
 */
export type ReadLineRequest = Message<"domain.product.v1.ReadLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.Line data = 1;
     */
    data?: Line;
};
/**
 * Describes the message domain.product.v1.ReadLineRequest.
 * Use `create(ReadLineRequestSchema)` to create a new message.
 */
export declare const ReadLineRequestSchema: GenMessage<ReadLineRequest>;
/**
 * @generated from message domain.product.v1.ReadLineResponse
 */
export type ReadLineResponse = Message<"domain.product.v1.ReadLineResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Line data = 1;
     */
    data: Line[];
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
 * Describes the message domain.product.v1.ReadLineResponse.
 * Use `create(ReadLineResponseSchema)` to create a new message.
 */
export declare const ReadLineResponseSchema: GenMessage<ReadLineResponse>;
/**
 * @generated from message domain.product.v1.UpdateLineRequest
 */
export type UpdateLineRequest = Message<"domain.product.v1.UpdateLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.Line data = 1;
     */
    data?: Line;
};
/**
 * Describes the message domain.product.v1.UpdateLineRequest.
 * Use `create(UpdateLineRequestSchema)` to create a new message.
 */
export declare const UpdateLineRequestSchema: GenMessage<UpdateLineRequest>;
/**
 * @generated from message domain.product.v1.UpdateLineResponse
 */
export type UpdateLineResponse = Message<"domain.product.v1.UpdateLineResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Line data = 1;
     */
    data: Line[];
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
 * Describes the message domain.product.v1.UpdateLineResponse.
 * Use `create(UpdateLineResponseSchema)` to create a new message.
 */
export declare const UpdateLineResponseSchema: GenMessage<UpdateLineResponse>;
/**
 * @generated from message domain.product.v1.DeleteLineRequest
 */
export type DeleteLineRequest = Message<"domain.product.v1.DeleteLineRequest"> & {
    /**
     * @generated from field: domain.product.v1.Line data = 1;
     */
    data?: Line;
};
/**
 * Describes the message domain.product.v1.DeleteLineRequest.
 * Use `create(DeleteLineRequestSchema)` to create a new message.
 */
export declare const DeleteLineRequestSchema: GenMessage<DeleteLineRequest>;
/**
 * @generated from message domain.product.v1.DeleteLineResponse
 */
export type DeleteLineResponse = Message<"domain.product.v1.DeleteLineResponse"> & {
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
 * Describes the message domain.product.v1.DeleteLineResponse.
 * Use `create(DeleteLineResponseSchema)` to create a new message.
 */
export declare const DeleteLineResponseSchema: GenMessage<DeleteLineResponse>;
/**
 * @generated from message domain.product.v1.ListLinesRequest
 */
export type ListLinesRequest = Message<"domain.product.v1.ListLinesRequest"> & {
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
 * Describes the message domain.product.v1.ListLinesRequest.
 * Use `create(ListLinesRequestSchema)` to create a new message.
 */
export declare const ListLinesRequestSchema: GenMessage<ListLinesRequest>;
/**
 * @generated from message domain.product.v1.ListLinesResponse
 */
export type ListLinesResponse = Message<"domain.product.v1.ListLinesResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Line data = 1;
     */
    data: Line[];
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
 * Describes the message domain.product.v1.ListLinesResponse.
 * Use `create(ListLinesResponseSchema)` to create a new message.
 */
export declare const ListLinesResponseSchema: GenMessage<ListLinesResponse>;
/**
 * @generated from message domain.product.v1.GetLineListPageDataRequest
 */
export type GetLineListPageDataRequest = Message<"domain.product.v1.GetLineListPageDataRequest"> & {
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
 * Describes the message domain.product.v1.GetLineListPageDataRequest.
 * Use `create(GetLineListPageDataRequestSchema)` to create a new message.
 */
export declare const GetLineListPageDataRequestSchema: GenMessage<GetLineListPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetLineListPageDataResponse
 */
export type GetLineListPageDataResponse = Message<"domain.product.v1.GetLineListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.Line line_list = 1;
     */
    lineList: Line[];
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
    /**
     * @generated from field: optional domain.common.v1.Error error = 3;
     */
    error?: Error;
    /**
     * @generated from field: optional domain.common.v1.PaginationResponse pagination = 4;
     */
    pagination?: PaginationResponse;
    /**
     * @generated from field: repeated domain.common.v1.SearchResult search_results = 5;
     */
    searchResults: SearchResult[];
};
/**
 * Describes the message domain.product.v1.GetLineListPageDataResponse.
 * Use `create(GetLineListPageDataResponseSchema)` to create a new message.
 */
export declare const GetLineListPageDataResponseSchema: GenMessage<GetLineListPageDataResponse>;
/**
 * @generated from message domain.product.v1.GetLineItemPageDataRequest
 */
export type GetLineItemPageDataRequest = Message<"domain.product.v1.GetLineItemPageDataRequest"> & {
    /**
     * @generated from field: string line_id = 1;
     */
    lineId: string;
};
/**
 * Describes the message domain.product.v1.GetLineItemPageDataRequest.
 * Use `create(GetLineItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetLineItemPageDataRequestSchema: GenMessage<GetLineItemPageDataRequest>;
/**
 * @generated from message domain.product.v1.GetLineItemPageDataResponse
 */
export type GetLineItemPageDataResponse = Message<"domain.product.v1.GetLineItemPageDataResponse"> & {
    /**
     * @generated from field: domain.product.v1.Line line = 1;
     */
    line?: Line;
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
 * Describes the message domain.product.v1.GetLineItemPageDataResponse.
 * Use `create(GetLineItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetLineItemPageDataResponseSchema: GenMessage<GetLineItemPageDataResponse>;
/**
 * @generated from service domain.product.v1.LineDomainService
 */
export declare const LineDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.LineDomainService.CreateLine
     */
    createLine: {
        methodKind: "unary";
        input: typeof CreateLineRequestSchema;
        output: typeof CreateLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineDomainService.ReadLine
     */
    readLine: {
        methodKind: "unary";
        input: typeof ReadLineRequestSchema;
        output: typeof ReadLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineDomainService.UpdateLine
     */
    updateLine: {
        methodKind: "unary";
        input: typeof UpdateLineRequestSchema;
        output: typeof UpdateLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineDomainService.DeleteLine
     */
    deleteLine: {
        methodKind: "unary";
        input: typeof DeleteLineRequestSchema;
        output: typeof DeleteLineResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineDomainService.ListLines
     */
    listLines: {
        methodKind: "unary";
        input: typeof ListLinesRequestSchema;
        output: typeof ListLinesResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineDomainService.GetLineListPageData
     */
    getLineListPageData: {
        methodKind: "unary";
        input: typeof GetLineListPageDataRequestSchema;
        output: typeof GetLineListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.LineDomainService.GetLineItemPageData
     */
    getLineItemPageData: {
        methodKind: "unary";
        input: typeof GetLineItemPageDataRequestSchema;
        output: typeof GetLineItemPageDataResponseSchema;
    };
}>;
