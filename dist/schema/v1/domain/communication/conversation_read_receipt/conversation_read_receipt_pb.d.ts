import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/communication/conversation_read_receipt/conversation_read_receipt.proto.
 */
export declare const file_domain_communication_conversation_read_receipt_conversation_read_receipt: GenFile;
/**
 * ConversationReadReceipt is the per-reader-principal unread high-water mark.
 * One receipt per reader PRINCIPAL per conversation (Q-MSG-12).
 * UNIQUE(conversation_id, reader_principal_type, reader_principal_id) is enforced at the DB.
 *
 * @generated from message domain.communication.v1.ConversationReadReceipt
 */
export type ConversationReadReceipt = Message<"domain.communication.v1.ConversationReadReceipt"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: optional int64 date_created = 2;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional int64 date_modified = 4;
     */
    dateModified?: bigint;
    /**
     * @generated from field: bool active = 6;
     */
    active: boolean;
    /**
     * @generated from field: string conversation_id = 7;
     */
    conversationId: string;
    /**
     * principal-scoped reader (Q-MSG-12 / codex H1)
     *
     * @generated from field: string reader_principal_type = 8;
     */
    readerPrincipalType: string;
    /**
     * binding/grant id of the reader principal
     *
     * @generated from field: string reader_principal_id = 9;
     */
    readerPrincipalId: string;
    /**
     * @generated from field: string user_id = 10;
     */
    userId: string;
    /**
     * directive H — copied from parent
     *
     * @generated from field: string workspace_id = 11;
     */
    workspaceId: string;
    /**
     * THE single monotonic cursor (Q-MSG-12)
     *
     * @generated from field: optional string last_read_post_id = 12;
     */
    lastReadPostId?: string;
    /**
     * DISPLAY-ONLY denorm; NOT the unread comparison key
     *
     * @generated from field: optional int64 last_read_at = 13;
     */
    lastReadAt?: bigint;
};
/**
 * Describes the message domain.communication.v1.ConversationReadReceipt.
 * Use `create(ConversationReadReceiptSchema)` to create a new message.
 */
export declare const ConversationReadReceiptSchema: GenMessage<ConversationReadReceipt>;
/**
 * @generated from message domain.communication.v1.CreateConversationReadReceiptRequest
 */
export type CreateConversationReadReceiptRequest = Message<"domain.communication.v1.CreateConversationReadReceiptRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data?: ConversationReadReceipt;
};
/**
 * Describes the message domain.communication.v1.CreateConversationReadReceiptRequest.
 * Use `create(CreateConversationReadReceiptRequestSchema)` to create a new message.
 */
export declare const CreateConversationReadReceiptRequestSchema: GenMessage<CreateConversationReadReceiptRequest>;
/**
 * @generated from message domain.communication.v1.CreateConversationReadReceiptResponse
 */
export type CreateConversationReadReceiptResponse = Message<"domain.communication.v1.CreateConversationReadReceiptResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data: ConversationReadReceipt[];
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
 * Describes the message domain.communication.v1.CreateConversationReadReceiptResponse.
 * Use `create(CreateConversationReadReceiptResponseSchema)` to create a new message.
 */
export declare const CreateConversationReadReceiptResponseSchema: GenMessage<CreateConversationReadReceiptResponse>;
/**
 * @generated from message domain.communication.v1.ReadConversationReadReceiptRequest
 */
export type ReadConversationReadReceiptRequest = Message<"domain.communication.v1.ReadConversationReadReceiptRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data?: ConversationReadReceipt;
};
/**
 * Describes the message domain.communication.v1.ReadConversationReadReceiptRequest.
 * Use `create(ReadConversationReadReceiptRequestSchema)` to create a new message.
 */
export declare const ReadConversationReadReceiptRequestSchema: GenMessage<ReadConversationReadReceiptRequest>;
/**
 * @generated from message domain.communication.v1.ReadConversationReadReceiptResponse
 */
export type ReadConversationReadReceiptResponse = Message<"domain.communication.v1.ReadConversationReadReceiptResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data: ConversationReadReceipt[];
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
 * Describes the message domain.communication.v1.ReadConversationReadReceiptResponse.
 * Use `create(ReadConversationReadReceiptResponseSchema)` to create a new message.
 */
export declare const ReadConversationReadReceiptResponseSchema: GenMessage<ReadConversationReadReceiptResponse>;
/**
 * @generated from message domain.communication.v1.UpdateConversationReadReceiptRequest
 */
export type UpdateConversationReadReceiptRequest = Message<"domain.communication.v1.UpdateConversationReadReceiptRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data?: ConversationReadReceipt;
};
/**
 * Describes the message domain.communication.v1.UpdateConversationReadReceiptRequest.
 * Use `create(UpdateConversationReadReceiptRequestSchema)` to create a new message.
 */
export declare const UpdateConversationReadReceiptRequestSchema: GenMessage<UpdateConversationReadReceiptRequest>;
/**
 * @generated from message domain.communication.v1.UpdateConversationReadReceiptResponse
 */
export type UpdateConversationReadReceiptResponse = Message<"domain.communication.v1.UpdateConversationReadReceiptResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data: ConversationReadReceipt[];
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
 * Describes the message domain.communication.v1.UpdateConversationReadReceiptResponse.
 * Use `create(UpdateConversationReadReceiptResponseSchema)` to create a new message.
 */
export declare const UpdateConversationReadReceiptResponseSchema: GenMessage<UpdateConversationReadReceiptResponse>;
/**
 * @generated from message domain.communication.v1.DeleteConversationReadReceiptRequest
 */
export type DeleteConversationReadReceiptRequest = Message<"domain.communication.v1.DeleteConversationReadReceiptRequest"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data?: ConversationReadReceipt;
};
/**
 * Describes the message domain.communication.v1.DeleteConversationReadReceiptRequest.
 * Use `create(DeleteConversationReadReceiptRequestSchema)` to create a new message.
 */
export declare const DeleteConversationReadReceiptRequestSchema: GenMessage<DeleteConversationReadReceiptRequest>;
/**
 * @generated from message domain.communication.v1.DeleteConversationReadReceiptResponse
 */
export type DeleteConversationReadReceiptResponse = Message<"domain.communication.v1.DeleteConversationReadReceiptResponse"> & {
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
 * Describes the message domain.communication.v1.DeleteConversationReadReceiptResponse.
 * Use `create(DeleteConversationReadReceiptResponseSchema)` to create a new message.
 */
export declare const DeleteConversationReadReceiptResponseSchema: GenMessage<DeleteConversationReadReceiptResponse>;
/**
 * @generated from message domain.communication.v1.ListConversationReadReceiptsRequest
 */
export type ListConversationReadReceiptsRequest = Message<"domain.communication.v1.ListConversationReadReceiptsRequest"> & {
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
 * Describes the message domain.communication.v1.ListConversationReadReceiptsRequest.
 * Use `create(ListConversationReadReceiptsRequestSchema)` to create a new message.
 */
export declare const ListConversationReadReceiptsRequestSchema: GenMessage<ListConversationReadReceiptsRequest>;
/**
 * @generated from message domain.communication.v1.ListConversationReadReceiptsResponse
 */
export type ListConversationReadReceiptsResponse = Message<"domain.communication.v1.ListConversationReadReceiptsResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationReadReceipt data = 1;
     */
    data: ConversationReadReceipt[];
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
 * Describes the message domain.communication.v1.ListConversationReadReceiptsResponse.
 * Use `create(ListConversationReadReceiptsResponseSchema)` to create a new message.
 */
export declare const ListConversationReadReceiptsResponseSchema: GenMessage<ListConversationReadReceiptsResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationReadReceiptListPageDataRequest
 */
export type GetConversationReadReceiptListPageDataRequest = Message<"domain.communication.v1.GetConversationReadReceiptListPageDataRequest"> & {
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
 * Describes the message domain.communication.v1.GetConversationReadReceiptListPageDataRequest.
 * Use `create(GetConversationReadReceiptListPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationReadReceiptListPageDataRequestSchema: GenMessage<GetConversationReadReceiptListPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationReadReceiptListPageDataResponse
 */
export type GetConversationReadReceiptListPageDataResponse = Message<"domain.communication.v1.GetConversationReadReceiptListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.communication.v1.ConversationReadReceipt conversation_read_receipt_list = 1;
     */
    conversationReadReceiptList: ConversationReadReceipt[];
    /**
     * @generated from field: domain.common.v1.PaginationResponse pagination = 2;
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
 * Describes the message domain.communication.v1.GetConversationReadReceiptListPageDataResponse.
 * Use `create(GetConversationReadReceiptListPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationReadReceiptListPageDataResponseSchema: GenMessage<GetConversationReadReceiptListPageDataResponse>;
/**
 * @generated from message domain.communication.v1.GetConversationReadReceiptItemPageDataRequest
 */
export type GetConversationReadReceiptItemPageDataRequest = Message<"domain.communication.v1.GetConversationReadReceiptItemPageDataRequest"> & {
    /**
     * @generated from field: string conversation_read_receipt_id = 1;
     */
    conversationReadReceiptId: string;
};
/**
 * Describes the message domain.communication.v1.GetConversationReadReceiptItemPageDataRequest.
 * Use `create(GetConversationReadReceiptItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetConversationReadReceiptItemPageDataRequestSchema: GenMessage<GetConversationReadReceiptItemPageDataRequest>;
/**
 * @generated from message domain.communication.v1.GetConversationReadReceiptItemPageDataResponse
 */
export type GetConversationReadReceiptItemPageDataResponse = Message<"domain.communication.v1.GetConversationReadReceiptItemPageDataResponse"> & {
    /**
     * @generated from field: domain.communication.v1.ConversationReadReceipt conversation_read_receipt = 1;
     */
    conversationReadReceipt?: ConversationReadReceipt;
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
 * Describes the message domain.communication.v1.GetConversationReadReceiptItemPageDataResponse.
 * Use `create(GetConversationReadReceiptItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetConversationReadReceiptItemPageDataResponseSchema: GenMessage<GetConversationReadReceiptItemPageDataResponse>;
/**
 * @generated from service domain.communication.v1.ConversationReadReceiptDomainService
 */
export declare const ConversationReadReceiptDomainService: GenService<{
    /**
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.CreateConversationReadReceipt
     */
    createConversationReadReceipt: {
        methodKind: "unary";
        input: typeof CreateConversationReadReceiptRequestSchema;
        output: typeof CreateConversationReadReceiptResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.ReadConversationReadReceipt
     */
    readConversationReadReceipt: {
        methodKind: "unary";
        input: typeof ReadConversationReadReceiptRequestSchema;
        output: typeof ReadConversationReadReceiptResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.UpdateConversationReadReceipt
     */
    updateConversationReadReceipt: {
        methodKind: "unary";
        input: typeof UpdateConversationReadReceiptRequestSchema;
        output: typeof UpdateConversationReadReceiptResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.DeleteConversationReadReceipt
     */
    deleteConversationReadReceipt: {
        methodKind: "unary";
        input: typeof DeleteConversationReadReceiptRequestSchema;
        output: typeof DeleteConversationReadReceiptResponseSchema;
    };
    /**
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.ListConversationReadReceipts
     */
    listConversationReadReceipts: {
        methodKind: "unary";
        input: typeof ListConversationReadReceiptsRequestSchema;
        output: typeof ListConversationReadReceiptsResponseSchema;
    };
    /**
     * Enhanced list with pagination, filtering, sorting, search
     *
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.GetConversationReadReceiptListPageData
     */
    getConversationReadReceiptListPageData: {
        methodKind: "unary";
        input: typeof GetConversationReadReceiptListPageDataRequestSchema;
        output: typeof GetConversationReadReceiptListPageDataResponseSchema;
    };
    /**
     * Enhanced item view
     *
     * @generated from rpc domain.communication.v1.ConversationReadReceiptDomainService.GetConversationReadReceiptItemPageData
     */
    getConversationReadReceiptItemPageData: {
        methodKind: "unary";
        input: typeof GetConversationReadReceiptItemPageDataRequestSchema;
        output: typeof GetConversationReadReceiptItemPageDataResponseSchema;
    };
}>;
