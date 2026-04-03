import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file domain/common/action.proto.
 */
export declare const file_domain_common_action: GenFile;
/**
 * Action defines the standard CRUD and list operations.
 *
 * @generated from enum domain.common.v1.Action
 */
export declare enum Action {
    /**
     * @generated from enum value: ACTION_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * @generated from enum value: ACTION_CREATE = 1;
     */
    CREATE = 1,
    /**
     * @generated from enum value: ACTION_READ = 2;
     */
    READ = 2,
    /**
     * @generated from enum value: ACTION_UPDATE = 3;
     */
    UPDATE = 3,
    /**
     * @generated from enum value: ACTION_DELETE = 4;
     */
    DELETE = 4,
    /**
     * @generated from enum value: ACTION_LIST = 5;
     */
    LIST = 5
}
/**
 * Describes the enum domain.common.v1.Action.
 */
export declare const ActionSchema: GenEnum<Action>;
