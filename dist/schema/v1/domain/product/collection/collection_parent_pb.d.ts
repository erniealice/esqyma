import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { SearchRequest } from "../../common/search_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { PaginationRequest } from "../../common/pagination_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/product/collection/collection_parent.proto.
 */
export declare const file_domain_product_collection_collection_parent: GenFile;
/**
 * @generated from message domain.product.v1.CollectionParent
 */
export type CollectionParent = Message<"domain.product.v1.CollectionParent"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string collection_parent_id = 2;
     */
    collectionParentId: string;
    /**
     * @generated from field: string collection_id = 3;
     */
    collectionId: string;
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
};
/**
 * Describes the message domain.product.v1.CollectionParent.
 * Use `create(CollectionParentSchema)` to create a new message.
 */
export declare const CollectionParentSchema: GenMessage<CollectionParent>;
/**
 * @generated from message domain.product.v1.CreateCollectionParentRequest
 */
export type CreateCollectionParentRequest = Message<"domain.product.v1.CreateCollectionParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionParent data = 1;
     */
    data?: CollectionParent;
};
/**
 * Describes the message domain.product.v1.CreateCollectionParentRequest.
 * Use `create(CreateCollectionParentRequestSchema)` to create a new message.
 */
export declare const CreateCollectionParentRequestSchema: GenMessage<CreateCollectionParentRequest>;
/**
 * @generated from message domain.product.v1.CreateCollectionParentResponse
 */
export type CreateCollectionParentResponse = Message<"domain.product.v1.CreateCollectionParentResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionParent data = 1;
     */
    data: CollectionParent[];
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
 * Describes the message domain.product.v1.CreateCollectionParentResponse.
 * Use `create(CreateCollectionParentResponseSchema)` to create a new message.
 */
export declare const CreateCollectionParentResponseSchema: GenMessage<CreateCollectionParentResponse>;
/**
 * @generated from message domain.product.v1.ReadCollectionParentRequest
 */
export type ReadCollectionParentRequest = Message<"domain.product.v1.ReadCollectionParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionParent data = 1;
     */
    data?: CollectionParent;
};
/**
 * Describes the message domain.product.v1.ReadCollectionParentRequest.
 * Use `create(ReadCollectionParentRequestSchema)` to create a new message.
 */
export declare const ReadCollectionParentRequestSchema: GenMessage<ReadCollectionParentRequest>;
/**
 * @generated from message domain.product.v1.ReadCollectionParentResponse
 */
export type ReadCollectionParentResponse = Message<"domain.product.v1.ReadCollectionParentResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionParent data = 1;
     */
    data: CollectionParent[];
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
 * Describes the message domain.product.v1.ReadCollectionParentResponse.
 * Use `create(ReadCollectionParentResponseSchema)` to create a new message.
 */
export declare const ReadCollectionParentResponseSchema: GenMessage<ReadCollectionParentResponse>;
/**
 * @generated from message domain.product.v1.UpdateCollectionParentRequest
 */
export type UpdateCollectionParentRequest = Message<"domain.product.v1.UpdateCollectionParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionParent data = 1;
     */
    data?: CollectionParent;
};
/**
 * Describes the message domain.product.v1.UpdateCollectionParentRequest.
 * Use `create(UpdateCollectionParentRequestSchema)` to create a new message.
 */
export declare const UpdateCollectionParentRequestSchema: GenMessage<UpdateCollectionParentRequest>;
/**
 * @generated from message domain.product.v1.UpdateCollectionParentResponse
 */
export type UpdateCollectionParentResponse = Message<"domain.product.v1.UpdateCollectionParentResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionParent data = 1;
     */
    data: CollectionParent[];
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
 * Describes the message domain.product.v1.UpdateCollectionParentResponse.
 * Use `create(UpdateCollectionParentResponseSchema)` to create a new message.
 */
export declare const UpdateCollectionParentResponseSchema: GenMessage<UpdateCollectionParentResponse>;
/**
 * @generated from message domain.product.v1.DeleteCollectionParentRequest
 */
export type DeleteCollectionParentRequest = Message<"domain.product.v1.DeleteCollectionParentRequest"> & {
    /**
     * @generated from field: domain.product.v1.CollectionParent data = 1;
     */
    data?: CollectionParent;
};
/**
 * Describes the message domain.product.v1.DeleteCollectionParentRequest.
 * Use `create(DeleteCollectionParentRequestSchema)` to create a new message.
 */
export declare const DeleteCollectionParentRequestSchema: GenMessage<DeleteCollectionParentRequest>;
/**
 * @generated from message domain.product.v1.DeleteCollectionParentResponse
 */
export type DeleteCollectionParentResponse = Message<"domain.product.v1.DeleteCollectionParentResponse"> & {
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
 * Describes the message domain.product.v1.DeleteCollectionParentResponse.
 * Use `create(DeleteCollectionParentResponseSchema)` to create a new message.
 */
export declare const DeleteCollectionParentResponseSchema: GenMessage<DeleteCollectionParentResponse>;
/**
 * @generated from message domain.product.v1.ListCollectionParentsRequest
 */
export type ListCollectionParentsRequest = Message<"domain.product.v1.ListCollectionParentsRequest"> & {
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
 * Describes the message domain.product.v1.ListCollectionParentsRequest.
 * Use `create(ListCollectionParentsRequestSchema)` to create a new message.
 */
export declare const ListCollectionParentsRequestSchema: GenMessage<ListCollectionParentsRequest>;
/**
 * @generated from message domain.product.v1.ListCollectionParentsResponse
 */
export type ListCollectionParentsResponse = Message<"domain.product.v1.ListCollectionParentsResponse"> & {
    /**
     * @generated from field: repeated domain.product.v1.CollectionParent data = 1;
     */
    data: CollectionParent[];
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
 * Describes the message domain.product.v1.ListCollectionParentsResponse.
 * Use `create(ListCollectionParentsResponseSchema)` to create a new message.
 */
export declare const ListCollectionParentsResponseSchema: GenMessage<ListCollectionParentsResponse>;
/**
 * @generated from service domain.product.v1.CollectionParentDomainService
 */
export declare const CollectionParentDomainService: GenService<{
    /**
     * @generated from rpc domain.product.v1.CollectionParentDomainService.CreateCollectionParent
     */
    createCollectionParent: {
        methodKind: "unary";
        input: typeof CreateCollectionParentRequestSchema;
        output: typeof CreateCollectionParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionParentDomainService.ReadCollectionParent
     */
    readCollectionParent: {
        methodKind: "unary";
        input: typeof ReadCollectionParentRequestSchema;
        output: typeof ReadCollectionParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionParentDomainService.UpdateCollectionParent
     */
    updateCollectionParent: {
        methodKind: "unary";
        input: typeof UpdateCollectionParentRequestSchema;
        output: typeof UpdateCollectionParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionParentDomainService.DeleteCollectionParent
     */
    deleteCollectionParent: {
        methodKind: "unary";
        input: typeof DeleteCollectionParentRequestSchema;
        output: typeof DeleteCollectionParentResponseSchema;
    };
    /**
     * @generated from rpc domain.product.v1.CollectionParentDomainService.ListCollectionParents
     */
    listCollectionParents: {
        methodKind: "unary";
        input: typeof ListCollectionParentsRequestSchema;
        output: typeof ListCollectionParentsResponseSchema;
    };
}>;
