import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/fulfillment/fulfillment.proto.
 */
export declare const file_domain_fulfillment_fulfillment: GenFile;
/**
 * @generated from message domain.fulfillment.v1.Fulfillment
 */
export type Fulfillment = Message<"domain.fulfillment.v1.Fulfillment"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string workspace_id = 2;
     */
    workspaceId: string;
    /**
     * @generated from field: string revenue_id = 3;
     */
    revenueId: string;
    /**
     * @generated from field: optional string supplier_id = 4;
     */
    supplierId?: string;
    /**
     * "physical", "service", "digital", "make_to_order"
     *
     * @generated from field: string fulfillment_method = 5;
     */
    fulfillmentMethod: string;
    /**
     * canonical: PENDING, READY, IN_TRANSIT, DELIVERED, PARTIALLY_DELIVERED, FAILED, CANCELLED
     *
     * @generated from field: string status = 6;
     */
    status: string;
    /**
     * free-text from fulfillment provider
     *
     * @generated from field: string provider_status = 7;
     */
    providerStatus: string;
    /**
     * tracking ID from provider
     *
     * @generated from field: string provider_reference = 8;
     */
    providerReference: string;
    /**
     * @generated from field: double delivery_cost = 9;
     */
    deliveryCost: number;
    /**
     * @generated from field: string currency = 10;
     */
    currency: string;
    /**
     * @generated from field: optional string expenditure_id = 11;
     */
    expenditureId?: string;
    /**
     * @generated from field: optional google.protobuf.Timestamp scheduled_at = 12;
     */
    scheduledAt?: Timestamp;
    /**
     * @generated from field: optional google.protobuf.Timestamp delivered_at = 13;
     */
    deliveredAt?: Timestamp;
    /**
     * @generated from field: string notes = 14;
     */
    notes: string;
    /**
     * @generated from field: google.protobuf.Struct metadata = 15;
     */
    metadata?: JsonObject;
    /**
     * @generated from field: optional int64 date_created = 16;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional int64 date_modified = 17;
     */
    dateModified?: bigint;
    /**
     * @generated from field: bool active = 18;
     */
    active: boolean;
    /**
     * @generated from field: string created_by = 19;
     */
    createdBy: string;
};
/**
 * Describes the message domain.fulfillment.v1.Fulfillment.
 * Use `create(FulfillmentSchema)` to create a new message.
 */
export declare const FulfillmentSchema: GenMessage<Fulfillment>;
