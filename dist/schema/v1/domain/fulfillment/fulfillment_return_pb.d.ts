import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/fulfillment/fulfillment_return.proto.
 */
export declare const file_domain_fulfillment_fulfillment_return: GenFile;
/**
 * @generated from message domain.fulfillment.v1.FulfillmentReturn
 */
export type FulfillmentReturn = Message<"domain.fulfillment.v1.FulfillmentReturn"> & {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string fulfillment_id = 2;
     */
    fulfillmentId: string;
    /**
     * @generated from field: string reason = 3;
     */
    reason: string;
    /**
     * PENDING, APPROVED, REJECTED, COMPLETED
     *
     * @generated from field: string status = 4;
     */
    status: string;
    /**
     * centavos
     *
     * @generated from field: optional int64 refund_amount = 5;
     */
    refundAmount?: bigint;
    /**
     * @generated from field: string currency = 6;
     */
    currency: string;
    /**
     * @generated from field: optional string processed_by_id = 7;
     */
    processedById?: string;
    /**
     * @generated from field: string notes = 8;
     */
    notes: string;
    /**
     * @generated from field: google.protobuf.Struct metadata = 9;
     */
    metadata?: JsonObject;
    /**
     * @generated from field: optional int64 date_created = 10;
     */
    dateCreated?: bigint;
    /**
     * @generated from field: optional google.protobuf.Timestamp completed_at = 11;
     */
    completedAt?: Timestamp;
    /**
     * @generated from field: bool active = 12;
     */
    active: boolean;
};
/**
 * Describes the message domain.fulfillment.v1.FulfillmentReturn.
 * Use `create(FulfillmentReturnSchema)` to create a new message.
 */
export declare const FulfillmentReturnSchema: GenMessage<FulfillmentReturn>;
