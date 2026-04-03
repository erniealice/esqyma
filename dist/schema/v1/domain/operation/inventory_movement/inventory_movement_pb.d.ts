import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Error } from "../../common/error_pb";
import type { PaginationRequest, PaginationResponse } from "../../common/pagination_pb";
import type { FilterRequest } from "../../common/filter_pb";
import type { SortRequest } from "../../common/sort_pb";
import type { SearchRequest, SearchResult } from "../../common/search_pb";
import type { MovementType } from "../enums/enums_pb";
import type { Product } from "../../product/product/product_pb";
import type { Location } from "../../entity/location/location_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/operation/inventory_movement/inventory_movement.proto.
 */
export declare const file_domain_operation_inventory_movement_inventory_movement: GenFile;
/**
 * @generated from message domain.operation.v1.InventoryMovement
 */
export type InventoryMovement = Message<"domain.operation.v1.InventoryMovement"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: domain.operation.v1.MovementType movement_type = 4;
     */
    movementType: MovementType;
    /**
     * @generated from field: string product_id = 5;
     */
    productId: string;
    /**
     * @generated from field: optional domain.product.v1.Product product = 6;
     */
    product?: Product;
    /**
     * @generated from field: double quantity = 7;
     */
    quantity: number;
    /**
     * @generated from field: double unit_cost = 8;
     */
    unitCost: number;
    /**
     * @generated from field: optional string from_location_id = 9;
     */
    fromLocationId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location from_location = 10;
     */
    fromLocation?: Location;
    /**
     * @generated from field: optional string to_location_id = 11;
     */
    toLocationId?: string;
    /**
     * @generated from field: optional domain.entity.v1.Location to_location = 12;
     */
    toLocation?: Location;
    /**
     * @generated from field: optional int64 movement_date = 13;
     */
    movementDate?: bigint;
    /**
     * @generated from field: optional string movement_date_string = 14;
     */
    movementDateString?: string;
    /**
     * @generated from field: optional string created_by = 15;
     */
    createdBy?: string;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional string date_created_string = 17;
     */
    dateCreatedString?: string;
    /**
     * New fields: job linkage
     *
     * @generated from field: optional string job_id = 18;
     */
    jobId?: string;
    /**
     * @generated from field: optional string job_activity_id = 19;
     */
    jobActivityId?: string;
    /**
     * Inventory linkage
     *
     * @generated from field: optional string inventory_item_id = 20;
     */
    inventoryItemId?: string;
    /**
     * @generated from field: optional string inventory_serial_id = 21;
     */
    inventorySerialId?: string;
    /**
     * Generic reference
     *
     * @generated from field: optional string reference_type = 22;
     */
    referenceType?: string;
    /**
     * @generated from field: optional string reference_id = 23;
     */
    referenceId?: string;
    /**
     * Metadata
     *
     * @generated from field: optional string status = 24;
     */
    status?: string;
    /**
     * @generated from field: optional string notes = 25;
     */
    notes?: string;
    /**
     * @generated from field: optional string performed_by = 26;
     */
    performedBy?: string;
    /**
     * @generated from field: bool active = 27;
     */
    active: boolean;
    /**
     * Tenant isolation
     *
     * @generated from field: optional string workspace_id = 28;
     */
    workspaceId?: string;
};
/**
 * Describes the message domain.operation.v1.InventoryMovement.
 * Use `create(InventoryMovementSchema)` to create a new message.
 */
export declare const InventoryMovementSchema: GenMessage<InventoryMovement>;
/**
 * @generated from message domain.operation.v1.CreateInventoryMovementRequest
 */
export type CreateInventoryMovementRequest = Message<"domain.operation.v1.CreateInventoryMovementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.InventoryMovement data = 1;
     */
    data?: InventoryMovement;
};
/**
 * Describes the message domain.operation.v1.CreateInventoryMovementRequest.
 * Use `create(CreateInventoryMovementRequestSchema)` to create a new message.
 */
export declare const CreateInventoryMovementRequestSchema: GenMessage<CreateInventoryMovementRequest>;
/**
 * @generated from message domain.operation.v1.CreateInventoryMovementResponse
 */
export type CreateInventoryMovementResponse = Message<"domain.operation.v1.CreateInventoryMovementResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement data = 1;
     */
    data: InventoryMovement[];
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
 * Describes the message domain.operation.v1.CreateInventoryMovementResponse.
 * Use `create(CreateInventoryMovementResponseSchema)` to create a new message.
 */
export declare const CreateInventoryMovementResponseSchema: GenMessage<CreateInventoryMovementResponse>;
/**
 * @generated from message domain.operation.v1.ReadInventoryMovementRequest
 */
export type ReadInventoryMovementRequest = Message<"domain.operation.v1.ReadInventoryMovementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.InventoryMovement data = 1;
     */
    data?: InventoryMovement;
};
/**
 * Describes the message domain.operation.v1.ReadInventoryMovementRequest.
 * Use `create(ReadInventoryMovementRequestSchema)` to create a new message.
 */
export declare const ReadInventoryMovementRequestSchema: GenMessage<ReadInventoryMovementRequest>;
/**
 * @generated from message domain.operation.v1.ReadInventoryMovementResponse
 */
export type ReadInventoryMovementResponse = Message<"domain.operation.v1.ReadInventoryMovementResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement data = 1;
     */
    data: InventoryMovement[];
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
 * Describes the message domain.operation.v1.ReadInventoryMovementResponse.
 * Use `create(ReadInventoryMovementResponseSchema)` to create a new message.
 */
export declare const ReadInventoryMovementResponseSchema: GenMessage<ReadInventoryMovementResponse>;
/**
 * @generated from message domain.operation.v1.UpdateInventoryMovementRequest
 */
export type UpdateInventoryMovementRequest = Message<"domain.operation.v1.UpdateInventoryMovementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.InventoryMovement data = 1;
     */
    data?: InventoryMovement;
};
/**
 * Describes the message domain.operation.v1.UpdateInventoryMovementRequest.
 * Use `create(UpdateInventoryMovementRequestSchema)` to create a new message.
 */
export declare const UpdateInventoryMovementRequestSchema: GenMessage<UpdateInventoryMovementRequest>;
/**
 * @generated from message domain.operation.v1.UpdateInventoryMovementResponse
 */
export type UpdateInventoryMovementResponse = Message<"domain.operation.v1.UpdateInventoryMovementResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement data = 1;
     */
    data: InventoryMovement[];
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
 * Describes the message domain.operation.v1.UpdateInventoryMovementResponse.
 * Use `create(UpdateInventoryMovementResponseSchema)` to create a new message.
 */
export declare const UpdateInventoryMovementResponseSchema: GenMessage<UpdateInventoryMovementResponse>;
/**
 * @generated from message domain.operation.v1.DeleteInventoryMovementRequest
 */
export type DeleteInventoryMovementRequest = Message<"domain.operation.v1.DeleteInventoryMovementRequest"> & {
    /**
     * @generated from field: domain.operation.v1.InventoryMovement data = 1;
     */
    data?: InventoryMovement;
};
/**
 * Describes the message domain.operation.v1.DeleteInventoryMovementRequest.
 * Use `create(DeleteInventoryMovementRequestSchema)` to create a new message.
 */
export declare const DeleteInventoryMovementRequestSchema: GenMessage<DeleteInventoryMovementRequest>;
/**
 * @generated from message domain.operation.v1.DeleteInventoryMovementResponse
 */
export type DeleteInventoryMovementResponse = Message<"domain.operation.v1.DeleteInventoryMovementResponse"> & {
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
 * Describes the message domain.operation.v1.DeleteInventoryMovementResponse.
 * Use `create(DeleteInventoryMovementResponseSchema)` to create a new message.
 */
export declare const DeleteInventoryMovementResponseSchema: GenMessage<DeleteInventoryMovementResponse>;
/**
 * @generated from message domain.operation.v1.ListInventoryMovementsRequest
 */
export type ListInventoryMovementsRequest = Message<"domain.operation.v1.ListInventoryMovementsRequest"> & {
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
 * Describes the message domain.operation.v1.ListInventoryMovementsRequest.
 * Use `create(ListInventoryMovementsRequestSchema)` to create a new message.
 */
export declare const ListInventoryMovementsRequestSchema: GenMessage<ListInventoryMovementsRequest>;
/**
 * @generated from message domain.operation.v1.ListInventoryMovementsResponse
 */
export type ListInventoryMovementsResponse = Message<"domain.operation.v1.ListInventoryMovementsResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement data = 1;
     */
    data: InventoryMovement[];
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
 * Describes the message domain.operation.v1.ListInventoryMovementsResponse.
 * Use `create(ListInventoryMovementsResponseSchema)` to create a new message.
 */
export declare const ListInventoryMovementsResponseSchema: GenMessage<ListInventoryMovementsResponse>;
/**
 * @generated from message domain.operation.v1.GetInventoryMovementListPageDataRequest
 */
export type GetInventoryMovementListPageDataRequest = Message<"domain.operation.v1.GetInventoryMovementListPageDataRequest"> & {
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
 * Describes the message domain.operation.v1.GetInventoryMovementListPageDataRequest.
 * Use `create(GetInventoryMovementListPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryMovementListPageDataRequestSchema: GenMessage<GetInventoryMovementListPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetInventoryMovementListPageDataResponse
 */
export type GetInventoryMovementListPageDataResponse = Message<"domain.operation.v1.GetInventoryMovementListPageDataResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement inventory_movement_list = 1;
     */
    inventoryMovementList: InventoryMovement[];
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
 * Describes the message domain.operation.v1.GetInventoryMovementListPageDataResponse.
 * Use `create(GetInventoryMovementListPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryMovementListPageDataResponseSchema: GenMessage<GetInventoryMovementListPageDataResponse>;
/**
 * @generated from message domain.operation.v1.GetInventoryMovementItemPageDataRequest
 */
export type GetInventoryMovementItemPageDataRequest = Message<"domain.operation.v1.GetInventoryMovementItemPageDataRequest"> & {
    /**
     * @generated from field: string inventory_movement_id = 1;
     */
    inventoryMovementId: string;
};
/**
 * Describes the message domain.operation.v1.GetInventoryMovementItemPageDataRequest.
 * Use `create(GetInventoryMovementItemPageDataRequestSchema)` to create a new message.
 */
export declare const GetInventoryMovementItemPageDataRequestSchema: GenMessage<GetInventoryMovementItemPageDataRequest>;
/**
 * @generated from message domain.operation.v1.GetInventoryMovementItemPageDataResponse
 */
export type GetInventoryMovementItemPageDataResponse = Message<"domain.operation.v1.GetInventoryMovementItemPageDataResponse"> & {
    /**
     * @generated from field: optional domain.operation.v1.InventoryMovement inventory_movement = 1;
     */
    inventoryMovement?: InventoryMovement;
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
 * Describes the message domain.operation.v1.GetInventoryMovementItemPageDataResponse.
 * Use `create(GetInventoryMovementItemPageDataResponseSchema)` to create a new message.
 */
export declare const GetInventoryMovementItemPageDataResponseSchema: GenMessage<GetInventoryMovementItemPageDataResponse>;
/**
 * @generated from message domain.operation.v1.ListInventoryMovementsByJobRequest
 */
export type ListInventoryMovementsByJobRequest = Message<"domain.operation.v1.ListInventoryMovementsByJobRequest"> & {
    /**
     * @generated from field: string job_id = 1;
     */
    jobId: string;
};
/**
 * Describes the message domain.operation.v1.ListInventoryMovementsByJobRequest.
 * Use `create(ListInventoryMovementsByJobRequestSchema)` to create a new message.
 */
export declare const ListInventoryMovementsByJobRequestSchema: GenMessage<ListInventoryMovementsByJobRequest>;
/**
 * @generated from message domain.operation.v1.ListInventoryMovementsByJobResponse
 */
export type ListInventoryMovementsByJobResponse = Message<"domain.operation.v1.ListInventoryMovementsByJobResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement inventory_movements = 1;
     */
    inventoryMovements: InventoryMovement[];
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
 * Describes the message domain.operation.v1.ListInventoryMovementsByJobResponse.
 * Use `create(ListInventoryMovementsByJobResponseSchema)` to create a new message.
 */
export declare const ListInventoryMovementsByJobResponseSchema: GenMessage<ListInventoryMovementsByJobResponse>;
/**
 * @generated from message domain.operation.v1.ListInventoryMovementsByProductRequest
 */
export type ListInventoryMovementsByProductRequest = Message<"domain.operation.v1.ListInventoryMovementsByProductRequest"> & {
    /**
     * @generated from field: string product_id = 1;
     */
    productId: string;
};
/**
 * Describes the message domain.operation.v1.ListInventoryMovementsByProductRequest.
 * Use `create(ListInventoryMovementsByProductRequestSchema)` to create a new message.
 */
export declare const ListInventoryMovementsByProductRequestSchema: GenMessage<ListInventoryMovementsByProductRequest>;
/**
 * @generated from message domain.operation.v1.ListInventoryMovementsByProductResponse
 */
export type ListInventoryMovementsByProductResponse = Message<"domain.operation.v1.ListInventoryMovementsByProductResponse"> & {
    /**
     * @generated from field: repeated domain.operation.v1.InventoryMovement inventory_movements = 1;
     */
    inventoryMovements: InventoryMovement[];
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
 * Describes the message domain.operation.v1.ListInventoryMovementsByProductResponse.
 * Use `create(ListInventoryMovementsByProductResponseSchema)` to create a new message.
 */
export declare const ListInventoryMovementsByProductResponseSchema: GenMessage<ListInventoryMovementsByProductResponse>;
/**
 * @generated from service domain.operation.v1.InventoryMovementDomainService
 */
export declare const InventoryMovementDomainService: GenService<{
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.CreateInventoryMovement
     */
    createInventoryMovement: {
        methodKind: "unary";
        input: typeof CreateInventoryMovementRequestSchema;
        output: typeof CreateInventoryMovementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.ReadInventoryMovement
     */
    readInventoryMovement: {
        methodKind: "unary";
        input: typeof ReadInventoryMovementRequestSchema;
        output: typeof ReadInventoryMovementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.UpdateInventoryMovement
     */
    updateInventoryMovement: {
        methodKind: "unary";
        input: typeof UpdateInventoryMovementRequestSchema;
        output: typeof UpdateInventoryMovementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.DeleteInventoryMovement
     */
    deleteInventoryMovement: {
        methodKind: "unary";
        input: typeof DeleteInventoryMovementRequestSchema;
        output: typeof DeleteInventoryMovementResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.ListInventoryMovements
     */
    listInventoryMovements: {
        methodKind: "unary";
        input: typeof ListInventoryMovementsRequestSchema;
        output: typeof ListInventoryMovementsResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.GetInventoryMovementListPageData
     */
    getInventoryMovementListPageData: {
        methodKind: "unary";
        input: typeof GetInventoryMovementListPageDataRequestSchema;
        output: typeof GetInventoryMovementListPageDataResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.GetInventoryMovementItemPageData
     */
    getInventoryMovementItemPageData: {
        methodKind: "unary";
        input: typeof GetInventoryMovementItemPageDataRequestSchema;
        output: typeof GetInventoryMovementItemPageDataResponseSchema;
    };
    /**
     * Extra: filter by job and by product
     *
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.ListByJob
     */
    listByJob: {
        methodKind: "unary";
        input: typeof ListInventoryMovementsByJobRequestSchema;
        output: typeof ListInventoryMovementsByJobResponseSchema;
    };
    /**
     * @generated from rpc domain.operation.v1.InventoryMovementDomainService.ListByProduct
     */
    listByProduct: {
        methodKind: "unary";
        input: typeof ListInventoryMovementsByProductRequestSchema;
        output: typeof ListInventoryMovementsByProductResponseSchema;
    };
}>;
