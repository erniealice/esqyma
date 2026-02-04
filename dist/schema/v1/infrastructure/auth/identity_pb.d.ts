import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/auth/identity.proto.
 */
export declare const file_infrastructure_auth_identity: GenFile;
/**
 * Identity represents a user or service identity across providers
 *
 * @generated from message infrastructure.auth.v1.Identity
 */
export type Identity = Message<"infrastructure.auth.v1.Identity"> & {
    /**
     * Unique identifier for the identity
     *
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * Type of identity (user, service, anonymous)
     *
     * @generated from field: infrastructure.auth.v1.IdentityType type = 2;
     */
    type: IdentityType;
    /**
     * Authentication provider
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 3;
     */
    provider: Provider;
    /**
     * Email address (for user identities)
     *
     * @generated from field: string email = 4;
     */
    email: string;
    /**
     * Display name or username
     *
     * @generated from field: string display_name = 5;
     */
    displayName: string;
    /**
     * Whether the identity is active
     *
     * @generated from field: bool is_active = 6;
     */
    isActive: boolean;
    /**
     * When the identity was created
     *
     * @generated from field: google.protobuf.Timestamp created_at = 7;
     */
    createdAt?: Timestamp;
    /**
     * When the identity was last updated
     *
     * @generated from field: google.protobuf.Timestamp updated_at = 8;
     */
    updatedAt?: Timestamp;
    /**
     * Whether the email has been verified
     *
     * @generated from field: bool email_verified = 9;
     */
    emailVerified: boolean;
    /**
     * Profile photo URL
     *
     * @generated from field: string photo_url = 10;
     */
    photoUrl: string;
    /**
     * Phone number
     *
     * @generated from field: string phone_number = 11;
     */
    phoneNumber: string;
    /**
     * Whether this is an anonymous identity
     *
     * @generated from field: bool is_anonymous = 12;
     */
    isAnonymous: boolean;
    /**
     * When the identity last signed in
     *
     * @generated from field: google.protobuf.Timestamp last_sign_in_at = 13;
     */
    lastSignInAt?: Timestamp;
    /**
     * Provider-specific identity information
     *
     * @generated from oneof infrastructure.auth.v1.Identity.provider_identity
     */
    providerIdentity: {
        /**
         * @generated from field: infrastructure.auth.v1.AzureIdentity azure_identity = 100;
         */
        value: AzureIdentity;
        case: "azureIdentity";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.GcpIdentity gcp_identity = 101;
         */
        value: GcpIdentity;
        case: "gcpIdentity";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.AwsIdentity aws_identity = 102;
         */
        value: AwsIdentity;
        case: "awsIdentity";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * Custom metadata for the identity
     *
     * @generated from field: map<string, string> metadata = 200;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message infrastructure.auth.v1.Identity.
 * Use `create(IdentitySchema)` to create a new message.
 */
export declare const IdentitySchema: GenMessage<Identity>;
/**
 * AzureIdentity contains Azure/Entra ID specific fields
 *
 * @generated from message infrastructure.auth.v1.AzureIdentity
 */
export type AzureIdentity = Message<"infrastructure.auth.v1.AzureIdentity"> & {
    /**
     * Azure tenant ID
     *
     * @generated from field: string tenant_id = 1;
     */
    tenantId: string;
    /**
     * Object ID in Azure AD
     *
     * @generated from field: string object_id = 2;
     */
    objectId: string;
    /**
     * User principal name (UPN)
     *
     * @generated from field: string user_principal_name = 3;
     */
    userPrincipalName: string;
    /**
     * Managed identity client ID (for service identities)
     *
     * @generated from field: string managed_identity_id = 4;
     */
    managedIdentityId: string;
    /**
     * Service principal ID (for application identities)
     *
     * @generated from field: string service_principal_id = 5;
     */
    servicePrincipalId: string;
};
/**
 * Describes the message infrastructure.auth.v1.AzureIdentity.
 * Use `create(AzureIdentitySchema)` to create a new message.
 */
export declare const AzureIdentitySchema: GenMessage<AzureIdentity>;
/**
 * GcpIdentity contains Google Cloud Platform specific fields
 *
 * @generated from message infrastructure.auth.v1.GcpIdentity
 */
export type GcpIdentity = Message<"infrastructure.auth.v1.GcpIdentity"> & {
    /**
     * GCP project ID
     *
     * @generated from field: string project_id = 1;
     */
    projectId: string;
    /**
     * Service account email (for service identities)
     *
     * @generated from field: string service_account_email = 2;
     */
    serviceAccountEmail: string;
    /**
     * Unique ID from Google Identity
     *
     * @generated from field: string google_id = 3;
     */
    googleId: string;
    /**
     * Workload identity pool (for federated identities)
     *
     * @generated from field: string workload_identity_pool = 4;
     */
    workloadIdentityPool: string;
};
/**
 * Describes the message infrastructure.auth.v1.GcpIdentity.
 * Use `create(GcpIdentitySchema)` to create a new message.
 */
export declare const GcpIdentitySchema: GenMessage<GcpIdentity>;
/**
 * AwsIdentity contains AWS specific fields
 *
 * @generated from message infrastructure.auth.v1.AwsIdentity
 */
export type AwsIdentity = Message<"infrastructure.auth.v1.AwsIdentity"> & {
    /**
     * AWS account ID
     *
     * @generated from field: string account_id = 1;
     */
    accountId: string;
    /**
     * Cognito user pool ID (for user identities)
     *
     * @generated from field: string user_pool_id = 2;
     */
    userPoolId: string;
    /**
     * Cognito username
     *
     * @generated from field: string cognito_username = 3;
     */
    cognitoUsername: string;
    /**
     * IAM role ARN (for service identities)
     *
     * @generated from field: string iam_role_arn = 4;
     */
    iamRoleArn: string;
    /**
     * Identity pool ID (for federated identities)
     *
     * @generated from field: string identity_pool_id = 5;
     */
    identityPoolId: string;
};
/**
 * Describes the message infrastructure.auth.v1.AwsIdentity.
 * Use `create(AwsIdentitySchema)` to create a new message.
 */
export declare const AwsIdentitySchema: GenMessage<AwsIdentity>;
/**
 * Provider represents the authentication provider type
 *
 * @generated from enum infrastructure.auth.v1.Provider
 */
export declare enum Provider {
    /**
     * @generated from enum value: PROVIDER_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Microsoft Azure / Entra ID
     *
     * @generated from enum value: PROVIDER_AZURE = 1;
     */
    AZURE = 1,
    /**
     * Google Cloud Platform
     *
     * @generated from enum value: PROVIDER_GCP = 2;
     */
    GCP = 2,
    /**
     * Amazon Web Services
     *
     * @generated from enum value: PROVIDER_AWS = 3;
     */
    AWS = 3,
    /**
     * Custom authentication provider
     *
     * @generated from enum value: PROVIDER_CUSTOM = 4;
     */
    CUSTOM = 4
}
/**
 * Describes the enum infrastructure.auth.v1.Provider.
 */
export declare const ProviderSchema: GenEnum<Provider>;
/**
 * IdentityType represents the type of identity
 *
 * @generated from enum infrastructure.auth.v1.IdentityType
 */
export declare enum IdentityType {
    /**
     * @generated from enum value: IDENTITY_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Human user
     *
     * @generated from enum value: IDENTITY_TYPE_USER = 1;
     */
    USER = 1,
    /**
     * Service account / machine identity
     *
     * @generated from enum value: IDENTITY_TYPE_SERVICE = 2;
     */
    SERVICE = 2,
    /**
     * Anonymous / guest user
     *
     * @generated from enum value: IDENTITY_TYPE_ANONYMOUS = 3;
     */
    ANONYMOUS = 3
}
/**
 * Describes the enum infrastructure.auth.v1.IdentityType.
 */
export declare const IdentityTypeSchema: GenEnum<IdentityType>;
