import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Provider } from "./identity_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/auth/provider.proto.
 */
export declare const file_infrastructure_auth_provider: GenFile;
/**
 * ProviderConfig represents authentication provider configuration
 *
 * @generated from message infrastructure.auth.v1.ProviderConfig
 */
export type ProviderConfig = Message<"infrastructure.auth.v1.ProviderConfig"> & {
    /**
     * The provider type
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 1;
     */
    provider: Provider;
    /**
     * Whether this provider is enabled
     *
     * @generated from field: bool enabled = 2;
     */
    enabled: boolean;
    /**
     * Display name for the provider
     *
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * Provider-specific configuration
     *
     * @generated from oneof infrastructure.auth.v1.ProviderConfig.config
     */
    config: {
        /**
         * @generated from field: infrastructure.auth.v1.AzureProviderConfig azure_config = 100;
         */
        value: AzureProviderConfig;
        case: "azureConfig";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.GcpProviderConfig gcp_config = 101;
         */
        value: GcpProviderConfig;
        case: "gcpConfig";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.AwsProviderConfig aws_config = 102;
         */
        value: AwsProviderConfig;
        case: "awsConfig";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.CustomProviderConfig custom_config = 103;
         */
        value: CustomProviderConfig;
        case: "customConfig";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message infrastructure.auth.v1.ProviderConfig.
 * Use `create(ProviderConfigSchema)` to create a new message.
 */
export declare const ProviderConfigSchema: GenMessage<ProviderConfig>;
/**
 * AzureProviderConfig contains Azure/Entra ID specific configuration
 *
 * @generated from message infrastructure.auth.v1.AzureProviderConfig
 */
export type AzureProviderConfig = Message<"infrastructure.auth.v1.AzureProviderConfig"> & {
    /**
     * Azure tenant ID
     *
     * @generated from field: string tenant_id = 1;
     */
    tenantId: string;
    /**
     * Azure client ID (application ID)
     *
     * @generated from field: string client_id = 2;
     */
    clientId: string;
    /**
     * Azure AD authority URL
     *
     * @generated from field: string authority = 3;
     */
    authority: string;
    /**
     * Whether to use managed identity
     *
     * @generated from field: bool use_managed_identity = 4;
     */
    useManagedIdentity: boolean;
    /**
     * Managed identity client ID (if using managed identity)
     *
     * @generated from field: string managed_identity_client_id = 5;
     */
    managedIdentityClientId: string;
    /**
     * Token endpoint URL
     *
     * @generated from field: string token_endpoint = 6;
     */
    tokenEndpoint: string;
    /**
     * Authorization endpoint URL
     *
     * @generated from field: string authorization_endpoint = 7;
     */
    authorizationEndpoint: string;
    /**
     * Allowed redirect URIs for OAuth flows
     *
     * @generated from field: repeated string redirect_uris = 8;
     */
    redirectUris: string[];
    /**
     * Scopes to request by default
     *
     * @generated from field: repeated string default_scopes = 9;
     */
    defaultScopes: string[];
};
/**
 * Describes the message infrastructure.auth.v1.AzureProviderConfig.
 * Use `create(AzureProviderConfigSchema)` to create a new message.
 */
export declare const AzureProviderConfigSchema: GenMessage<AzureProviderConfig>;
/**
 * GcpProviderConfig contains Google Cloud Platform specific configuration
 *
 * @generated from message infrastructure.auth.v1.GcpProviderConfig
 */
export type GcpProviderConfig = Message<"infrastructure.auth.v1.GcpProviderConfig"> & {
    /**
     * GCP project ID
     *
     * @generated from field: string project_id = 1;
     */
    projectId: string;
    /**
     * OAuth 2.0 client ID
     *
     * @generated from field: string client_id = 2;
     */
    clientId: string;
    /**
     * Service account email (for service authentication)
     *
     * @generated from field: string service_account_email = 3;
     */
    serviceAccountEmail: string;
    /**
     * Workload identity pool (for federated authentication)
     *
     * @generated from field: string workload_identity_pool = 4;
     */
    workloadIdentityPool: string;
    /**
     * Workload identity provider
     *
     * @generated from field: string workload_identity_provider = 5;
     */
    workloadIdentityProvider: string;
    /**
     * Token endpoint URL
     *
     * @generated from field: string token_endpoint = 6;
     */
    tokenEndpoint: string;
    /**
     * Authorization endpoint URL
     *
     * @generated from field: string authorization_endpoint = 7;
     */
    authorizationEndpoint: string;
    /**
     * Allowed redirect URIs for OAuth flows
     *
     * @generated from field: repeated string redirect_uris = 8;
     */
    redirectUris: string[];
    /**
     * Scopes to request by default
     *
     * @generated from field: repeated string default_scopes = 9;
     */
    defaultScopes: string[];
    /**
     * Whether to use Application Default Credentials
     *
     * @generated from field: bool use_adc = 10;
     */
    useAdc: boolean;
};
/**
 * Describes the message infrastructure.auth.v1.GcpProviderConfig.
 * Use `create(GcpProviderConfigSchema)` to create a new message.
 */
export declare const GcpProviderConfigSchema: GenMessage<GcpProviderConfig>;
/**
 * AwsProviderConfig contains AWS specific configuration
 *
 * @generated from message infrastructure.auth.v1.AwsProviderConfig
 */
export type AwsProviderConfig = Message<"infrastructure.auth.v1.AwsProviderConfig"> & {
    /**
     * AWS region
     *
     * @generated from field: string region = 1;
     */
    region: string;
    /**
     * Cognito user pool ID (for user authentication)
     *
     * @generated from field: string user_pool_id = 2;
     */
    userPoolId: string;
    /**
     * Cognito app client ID
     *
     * @generated from field: string app_client_id = 3;
     */
    appClientId: string;
    /**
     * Cognito identity pool ID (for federated authentication)
     *
     * @generated from field: string identity_pool_id = 4;
     */
    identityPoolId: string;
    /**
     * IAM role ARN (for service authentication)
     *
     * @generated from field: string iam_role_arn = 5;
     */
    iamRoleArn: string;
    /**
     * Cognito domain for hosted UI
     *
     * @generated from field: string cognito_domain = 6;
     */
    cognitoDomain: string;
    /**
     * Allowed redirect URIs for OAuth flows
     *
     * @generated from field: repeated string redirect_uris = 7;
     */
    redirectUris: string[];
    /**
     * OAuth scopes to request by default
     *
     * @generated from field: repeated string default_scopes = 8;
     */
    defaultScopes: string[];
    /**
     * Whether to use IAM credentials
     *
     * @generated from field: bool use_iam_credentials = 9;
     */
    useIamCredentials: boolean;
};
/**
 * Describes the message infrastructure.auth.v1.AwsProviderConfig.
 * Use `create(AwsProviderConfigSchema)` to create a new message.
 */
export declare const AwsProviderConfigSchema: GenMessage<AwsProviderConfig>;
/**
 * CustomProviderConfig contains custom provider configuration
 *
 * @generated from message infrastructure.auth.v1.CustomProviderConfig
 */
export type CustomProviderConfig = Message<"infrastructure.auth.v1.CustomProviderConfig"> & {
    /**
     * Provider name/identifier
     *
     * @generated from field: string provider_name = 1;
     */
    providerName: string;
    /**
     * Provider base URL
     *
     * @generated from field: string base_url = 2;
     */
    baseUrl: string;
    /**
     * Token endpoint URL
     *
     * @generated from field: string token_endpoint = 3;
     */
    tokenEndpoint: string;
    /**
     * Authorization endpoint URL
     *
     * @generated from field: string authorization_endpoint = 4;
     */
    authorizationEndpoint: string;
    /**
     * User info endpoint URL
     *
     * @generated from field: string user_info_endpoint = 5;
     */
    userInfoEndpoint: string;
    /**
     * JWKS (JSON Web Key Set) endpoint URL
     *
     * @generated from field: string jwks_endpoint = 6;
     */
    jwksEndpoint: string;
    /**
     * Issuer identifier
     *
     * @generated from field: string issuer = 7;
     */
    issuer: string;
    /**
     * Client ID
     *
     * @generated from field: string client_id = 8;
     */
    clientId: string;
    /**
     * Allowed redirect URIs
     *
     * @generated from field: repeated string redirect_uris = 9;
     */
    redirectUris: string[];
    /**
     * Scopes to request by default
     *
     * @generated from field: repeated string default_scopes = 10;
     */
    defaultScopes: string[];
    /**
     * Custom configuration parameters
     *
     * @generated from field: map<string, string> custom_params = 11;
     */
    customParams: {
        [key: string]: string;
    };
};
/**
 * Describes the message infrastructure.auth.v1.CustomProviderConfig.
 * Use `create(CustomProviderConfigSchema)` to create a new message.
 */
export declare const CustomProviderConfigSchema: GenMessage<CustomProviderConfig>;
