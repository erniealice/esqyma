import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/fulfillment/fulfillment_return_item.proto.
 */
export declare const file_domain_fulfillment_fulfillment_return_item: GenFile;
/**
 * @generated from message domain.fulfillment.v1.FulfillmentReturnItem
 */
export type FulfillmentReturnItem = Message<"domain.fulfillment.v1.FulfillmentReturnItem"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string fulfillment_return_id = 2;
     */
    fulfillmentReturnId: string;
    /**
     * @generated from field: string fulfillment_item_id = 3;
     */
    fulfillmentItemId: string;
    /**
     * @generated from field: double quantity_returned = 4;
     */
    quantityReturned: number;
    /**
     * per-item reason: "damaged", "wrong_item", etc.
     *
     * @generated from field: string reason = 5;
     */
    reason: string;
    /**
     * @generated from field: optional int64 date_created = 6;
     */
    dateCreated?: bigint;
};
/**
 * Describes the message domain.fulfillment.v1.FulfillmentReturnItem.
 * Use `create(FulfillmentReturnItemSchema)` to create a new message.
 */
export declare const FulfillmentReturnItemSchema: GenMessage<FulfillmentReturnItem>;
