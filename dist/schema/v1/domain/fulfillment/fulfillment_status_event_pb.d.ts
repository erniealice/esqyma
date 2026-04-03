import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file domain/fulfillment/fulfillment_status_event.proto.
 */
export declare const file_domain_fulfillment_fulfillment_status_event: GenFile;
/**
 * Append-only event log — no UPDATE, no DELETE
 *
 * @generated from message domain.fulfillment.v1.FulfillmentStatusEvent
 */
export type FulfillmentStatusEvent = Message<"domain.fulfillment.v1.FulfillmentStatusEvent"> & {
    /**
     * BIGSERIAL — append-only, integer sequence
     *
     * @generated from field: int64 id = 1;
     */
    id: bigint;
    /**
     * @generated from field: string fulfillment_id = 2;
     */
    fulfillmentId: string;
    /**
     * nullable for initial nil→PENDING
     *
     * @generated from field: optional string from_status = 3;
     */
    fromStatus?: string;
    /**
     * @generated from field: string to_status = 4;
     */
    toStatus: string;
    /**
     * @generated from field: string provider_status = 5;
     */
    providerStatus: string;
    /**
     * @generated from field: string provider_reference = 6;
     */
    providerReference: string;
    /**
     * @generated from field: optional string triggered_by_id = 7;
     */
    triggeredById?: string;
    /**
     * @generated from field: string reason = 8;
     */
    reason: string;
    /**
     * @generated from field: google.protobuf.Timestamp occurred_at = 9;
     */
    occurredAt?: Timestamp;
};
/**
 * Describes the message domain.fulfillment.v1.FulfillmentStatusEvent.
 * Use `create(FulfillmentStatusEventSchema)` to create a new message.
 */
export declare const FulfillmentStatusEventSchema: GenMessage<FulfillmentStatusEvent>;
