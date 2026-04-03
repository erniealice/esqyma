import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/fulfillment/fulfillment_item.proto.
 */
export declare const file_domain_fulfillment_fulfillment_item: GenFile;
/**
 * @generated from message domain.fulfillment.v1.FulfillmentItem
 */
export type FulfillmentItem = Message<"domain.fulfillment.v1.FulfillmentItem"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string fulfillment_id = 2;
     */
    fulfillmentId: string;
    /**
     * @generated from field: string revenue_line_item_id = 3;
     */
    revenueLineItemId: string;
    /**
     * @generated from field: string product_id = 4;
     */
    productId: string;
    /**
     * snapshot from product at creation time — immutable
     *
     * @generated from field: string fulfillment_method = 5;
     */
    fulfillmentMethod: string;
    /**
     * "job", "subscription", etc.
     *
     * @generated from field: optional string source_type = 6;
     */
    sourceType?: string;
    /**
     * FK to originating record
     *
     * @generated from field: optional string source_id = 7;
     */
    sourceId?: string;
    /**
     * @generated from field: double quantity_ordered = 8;
     */
    quantityOrdered: number;
    /**
     * @generated from field: double quantity_delivered = 9;
     */
    quantityDelivered: number;
    /**
     * quantity_remaining is DB GENERATED ALWAYS AS (quantity_ordered - quantity_delivered) STORED — not in proto
     *
     * per-item canonical status
     *
     * @generated from field: string status = 10;
     */
    status: string;
    /**
     * @generated from field: string notes = 11;
     */
    notes: string;
    /**
     * @generated from field: optional int64 date_created = 12;
     */
    dateCreated?: bigint;
};
/**
 * Describes the message domain.fulfillment.v1.FulfillmentItem.
 * Use `create(FulfillmentItemSchema)` to create a new message.
 */
export declare const FulfillmentItemSchema: GenMessage<FulfillmentItem>;
