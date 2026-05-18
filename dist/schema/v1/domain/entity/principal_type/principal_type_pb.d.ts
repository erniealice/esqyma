import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file domain/entity/principal_type/principal_type.proto.
 */
export declare const file_domain_entity_principal_type_principal_type: GenFile;
/**
 * PrincipalType identifies the kind of actor whose session is being authorized.
 * Values 1-2 are operator principals (WorkspaceUser-backed).
 * Values 3-6 are portal principals (party-grant-backed).
 * Reserved 7-15 for future platform-level principals (PLATFORM_ADMIN, INTEGRATION_AGENT, …).
 *
 * @generated from enum domain.entity.v1.PrincipalType
 */
export declare enum PrincipalType {
    /**
     * @generated from enum value: PRINCIPAL_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * workspace owner / top-level admin
     *
     * @generated from enum value: PRINCIPAL_TYPE_OPERATOR_OWNER = 1;
     */
    OPERATOR_OWNER = 1,
    /**
     * workspace employee with narrower roles
     *
     * @generated from enum value: PRINCIPAL_TYPE_OPERATOR_STAFF = 2;
     */
    OPERATOR_STAFF = 2,
    /**
     * external customer (patient, student, lessee…)
     *
     * @generated from enum value: PRINCIPAL_TYPE_CLIENT = 3;
     */
    CLIENT = 3,
    /**
     * acts ON BEHALF OF a specific Client
     *
     * @generated from enum value: PRINCIPAL_TYPE_CLIENT_DELEGATE = 4;
     */
    CLIENT_DELEGATE = 4,
    /**
     * external vendor / contractor
     *
     * @generated from enum value: PRINCIPAL_TYPE_SUPPLIER = 5;
     */
    SUPPLIER = 5,
    /**
     * acts ON BEHALF OF a specific Supplier
     *
     * @generated from enum value: PRINCIPAL_TYPE_SUPPLIER_DELEGATE = 6;
     */
    SUPPLIER_DELEGATE = 6
}
/**
 * Describes the enum domain.entity.v1.PrincipalType.
 */
export declare const PrincipalTypeSchema: GenEnum<PrincipalType>;
