import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Identity, Provider } from "./identity_pb";
import type { GenerateJwtTokenRequestSchema, GenerateJwtTokenResponseSchema, JwtToken, ValidateJwtTokenRequestSchema, ValidateJwtTokenResponseSchema } from "./jwt_pb";
import type { CreateApiKeyRequestSchema, CreateApiKeyResponseSchema, ListApiKeysRequestSchema, ListApiKeysResponseSchema, RevokeApiKeyRequestSchema, RevokeApiKeyResponseSchema, ValidateApiKeyRequestSchema, ValidateApiKeyResponseSchema } from "./api_key_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file infrastructure/auth/authentication.proto.
 */
export declare const file_infrastructure_auth_authentication: GenFile;
/**
 * LoginRequest contains credentials for user login
 *
 * @generated from message infrastructure.auth.v1.LoginRequest
 */
export type LoginRequest = Message<"infrastructure.auth.v1.LoginRequest"> & {
    /**
     * Authentication provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 1;
     */
    provider: Provider;
    /**
     * Authentication method
     *
     * @generated from oneof infrastructure.auth.v1.LoginRequest.credentials
     */
    credentials: {
        /**
         * @generated from field: infrastructure.auth.v1.PasswordCredentials password = 100;
         */
        value: PasswordCredentials;
        case: "password";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.OAuthCredentials oauth = 101;
         */
        value: OAuthCredentials;
        case: "oauth";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.SamlCredentials saml = 102;
         */
        value: SamlCredentials;
        case: "saml";
    } | {
        /**
         * @generated from field: infrastructure.auth.v1.EmailLinkCredentials email_link = 103;
         */
        value: EmailLinkCredentials;
        case: "emailLink";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * Optional: Device information for security
     *
     * @generated from field: infrastructure.auth.v1.DeviceInfo device_info = 200;
     */
    deviceInfo?: DeviceInfo;
};
/**
 * Describes the message infrastructure.auth.v1.LoginRequest.
 * Use `create(LoginRequestSchema)` to create a new message.
 */
export declare const LoginRequestSchema: GenMessage<LoginRequest>;
/**
 * PasswordCredentials for username/password authentication
 *
 * @generated from message infrastructure.auth.v1.PasswordCredentials
 */
export type PasswordCredentials = Message<"infrastructure.auth.v1.PasswordCredentials"> & {
    /**
     * Username or email
     *
     * @generated from field: string username = 1;
     */
    username: string;
    /**
     * Password
     *
     * @generated from field: string password = 2;
     */
    password: string;
    /**
     * Optional: MFA code
     *
     * @generated from field: string mfa_code = 3;
     */
    mfaCode: string;
};
/**
 * Describes the message infrastructure.auth.v1.PasswordCredentials.
 * Use `create(PasswordCredentialsSchema)` to create a new message.
 */
export declare const PasswordCredentialsSchema: GenMessage<PasswordCredentials>;
/**
 * EmailLinkCredentials for passwordless email link authentication
 *
 * @generated from message infrastructure.auth.v1.EmailLinkCredentials
 */
export type EmailLinkCredentials = Message<"infrastructure.auth.v1.EmailLinkCredentials"> & {
    /**
     * Email address
     *
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * Email link/magic link received
     *
     * @generated from field: string email_link = 2;
     */
    emailLink: string;
};
/**
 * Describes the message infrastructure.auth.v1.EmailLinkCredentials.
 * Use `create(EmailLinkCredentialsSchema)` to create a new message.
 */
export declare const EmailLinkCredentialsSchema: GenMessage<EmailLinkCredentials>;
/**
 * OAuthCredentials for OAuth authentication
 *
 * @generated from message infrastructure.auth.v1.OAuthCredentials
 */
export type OAuthCredentials = Message<"infrastructure.auth.v1.OAuthCredentials"> & {
    /**
     * OAuth provider (google, facebook, github, etc.)
     *
     * @generated from field: string oauth_provider = 1;
     */
    oauthProvider: string;
    /**
     * Authorization code from OAuth flow
     *
     * @generated from field: string authorization_code = 2;
     */
    authorizationCode: string;
    /**
     * Redirect URI used in OAuth flow
     *
     * @generated from field: string redirect_uri = 3;
     */
    redirectUri: string;
};
/**
 * Describes the message infrastructure.auth.v1.OAuthCredentials.
 * Use `create(OAuthCredentialsSchema)` to create a new message.
 */
export declare const OAuthCredentialsSchema: GenMessage<OAuthCredentials>;
/**
 * SamlCredentials for SAML authentication
 *
 * @generated from message infrastructure.auth.v1.SamlCredentials
 */
export type SamlCredentials = Message<"infrastructure.auth.v1.SamlCredentials"> & {
    /**
     * SAML response
     *
     * @generated from field: string saml_response = 1;
     */
    samlResponse: string;
    /**
     * Relay state
     *
     * @generated from field: string relay_state = 2;
     */
    relayState: string;
};
/**
 * Describes the message infrastructure.auth.v1.SamlCredentials.
 * Use `create(SamlCredentialsSchema)` to create a new message.
 */
export declare const SamlCredentialsSchema: GenMessage<SamlCredentials>;
/**
 * DeviceInfo contains information about the device making the request
 *
 * @generated from message infrastructure.auth.v1.DeviceInfo
 */
export type DeviceInfo = Message<"infrastructure.auth.v1.DeviceInfo"> & {
    /**
     * Device identifier
     *
     * @generated from field: string device_id = 1;
     */
    deviceId: string;
    /**
     * Device type (web, mobile, desktop, etc.)
     *
     * @generated from field: string device_type = 2;
     */
    deviceType: string;
    /**
     * User agent string
     *
     * @generated from field: string user_agent = 3;
     */
    userAgent: string;
    /**
     * IP address
     *
     * @generated from field: string ip_address = 4;
     */
    ipAddress: string;
    /**
     * Location information (optional)
     *
     * @generated from field: string location = 5;
     */
    location: string;
};
/**
 * Describes the message infrastructure.auth.v1.DeviceInfo.
 * Use `create(DeviceInfoSchema)` to create a new message.
 */
export declare const DeviceInfoSchema: GenMessage<DeviceInfo>;
/**
 * LoginResponse contains the authentication result
 *
 * @generated from message infrastructure.auth.v1.LoginResponse
 */
export type LoginResponse = Message<"infrastructure.auth.v1.LoginResponse"> & {
    /**
     * Whether login was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * The authenticated identity
     *
     * @generated from field: infrastructure.auth.v1.Identity identity = 2;
     */
    identity?: Identity;
    /**
     * JWT access token
     *
     * @generated from field: infrastructure.auth.v1.JwtToken access_token = 3;
     */
    accessToken?: JwtToken;
    /**
     * Session identifier (if session management is enabled)
     *
     * @generated from field: string session_id = 4;
     */
    sessionId: string;
    /**
     * When the session expires
     *
     * @generated from field: google.protobuf.Timestamp expires_at = 5;
     */
    expiresAt?: Timestamp;
    /**
     * Error message if login failed
     *
     * @generated from field: string error_message = 6;
     */
    errorMessage: string;
    /**
     * Whether MFA is required
     *
     * @generated from field: bool requires_mfa = 7;
     */
    requiresMfa: boolean;
    /**
     * MFA challenge details (if required)
     *
     * @generated from field: infrastructure.auth.v1.MfaChallenge mfa_challenge = 8;
     */
    mfaChallenge?: MfaChallenge;
};
/**
 * Describes the message infrastructure.auth.v1.LoginResponse.
 * Use `create(LoginResponseSchema)` to create a new message.
 */
export declare const LoginResponseSchema: GenMessage<LoginResponse>;
/**
 * MfaChallenge represents a multi-factor authentication challenge
 * TODO: Expand MFA support in future phase
 *
 * @generated from message infrastructure.auth.v1.MfaChallenge
 */
export type MfaChallenge = Message<"infrastructure.auth.v1.MfaChallenge"> & {
    /**
     * Type of MFA challenge
     *
     * @generated from field: string challenge_type = 1;
     */
    challengeType: string;
    /**
     * Challenge identifier
     *
     * @generated from field: string challenge_id = 2;
     */
    challengeId: string;
    /**
     * Instructions for completing the challenge
     *
     * @generated from field: string instructions = 3;
     */
    instructions: string;
};
/**
 * Describes the message infrastructure.auth.v1.MfaChallenge.
 * Use `create(MfaChallengeSchema)` to create a new message.
 */
export declare const MfaChallengeSchema: GenMessage<MfaChallenge>;
/**
 * LogoutRequest contains information for logging out
 *
 * @generated from message infrastructure.auth.v1.LogoutRequest
 */
export type LogoutRequest = Message<"infrastructure.auth.v1.LogoutRequest"> & {
    /**
     * Identity to logout
     *
     * @generated from field: string identity_id = 1;
     */
    identityId: string;
    /**
     * Session identifier (if using session management)
     *
     * @generated from field: string session_id = 2;
     */
    sessionId: string;
    /**
     * JWT token to invalidate (if using token-based auth)
     *
     * @generated from field: string token = 3;
     */
    token: string;
    /**
     * Provider to logout from
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 4;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.LogoutRequest.
 * Use `create(LogoutRequestSchema)` to create a new message.
 */
export declare const LogoutRequestSchema: GenMessage<LogoutRequest>;
/**
 * LogoutResponse confirms the logout
 *
 * @generated from message infrastructure.auth.v1.LogoutResponse
 */
export type LogoutResponse = Message<"infrastructure.auth.v1.LogoutResponse"> & {
    /**
     * Whether logout was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the logout
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.LogoutResponse.
 * Use `create(LogoutResponseSchema)` to create a new message.
 */
export declare const LogoutResponseSchema: GenMessage<LogoutResponse>;
/**
 * RegisterRequest for user registration
 *
 * @generated from message infrastructure.auth.v1.RegisterRequest
 */
export type RegisterRequest = Message<"infrastructure.auth.v1.RegisterRequest"> & {
    /**
     * Email address
     *
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * Password
     *
     * @generated from field: string password = 2;
     */
    password: string;
    /**
     * Display name or username
     *
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    /**
     * Whether to send email verification
     *
     * @generated from field: bool send_verification_email = 4;
     */
    sendVerificationEmail: boolean;
    /**
     * Provider to use for registration
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 5;
     */
    provider: Provider;
    /**
     * Optional: Additional metadata
     *
     * @generated from field: map<string, string> metadata = 6;
     */
    metadata: {
        [key: string]: string;
    };
};
/**
 * Describes the message infrastructure.auth.v1.RegisterRequest.
 * Use `create(RegisterRequestSchema)` to create a new message.
 */
export declare const RegisterRequestSchema: GenMessage<RegisterRequest>;
/**
 * RegisterResponse contains registration result
 *
 * @generated from message infrastructure.auth.v1.RegisterResponse
 */
export type RegisterResponse = Message<"infrastructure.auth.v1.RegisterResponse"> & {
    /**
     * Whether registration was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * The created identity
     *
     * @generated from field: infrastructure.auth.v1.Identity identity = 2;
     */
    identity?: Identity;
    /**
     * JWT access token (if auto-login enabled)
     *
     * @generated from field: infrastructure.auth.v1.JwtToken access_token = 3;
     */
    accessToken?: JwtToken;
    /**
     * Error message if registration failed
     *
     * @generated from field: string error_message = 4;
     */
    errorMessage: string;
    /**
     * Whether verification email was sent
     *
     * @generated from field: bool verification_email_sent = 5;
     */
    verificationEmailSent: boolean;
};
/**
 * Describes the message infrastructure.auth.v1.RegisterResponse.
 * Use `create(RegisterResponseSchema)` to create a new message.
 */
export declare const RegisterResponseSchema: GenMessage<RegisterResponse>;
/**
 * SendPasswordResetEmailRequest for sending password reset email
 *
 * @generated from message infrastructure.auth.v1.SendPasswordResetEmailRequest
 */
export type SendPasswordResetEmailRequest = Message<"infrastructure.auth.v1.SendPasswordResetEmailRequest"> & {
    /**
     * Email address to send reset link to
     *
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * Optional: Redirect URL for password reset page
     *
     * @generated from field: string redirect_url = 2;
     */
    redirectUrl: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 3;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.SendPasswordResetEmailRequest.
 * Use `create(SendPasswordResetEmailRequestSchema)` to create a new message.
 */
export declare const SendPasswordResetEmailRequestSchema: GenMessage<SendPasswordResetEmailRequest>;
/**
 * SendPasswordResetEmailResponse confirms reset email was sent
 *
 * @generated from message infrastructure.auth.v1.SendPasswordResetEmailResponse
 */
export type SendPasswordResetEmailResponse = Message<"infrastructure.auth.v1.SendPasswordResetEmailResponse"> & {
    /**
     * Whether the request was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the request
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Error message if failed
     *
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message infrastructure.auth.v1.SendPasswordResetEmailResponse.
 * Use `create(SendPasswordResetEmailResponseSchema)` to create a new message.
 */
export declare const SendPasswordResetEmailResponseSchema: GenMessage<SendPasswordResetEmailResponse>;
/**
 * ConfirmPasswordResetRequest for confirming password reset with code
 *
 * @generated from message infrastructure.auth.v1.ConfirmPasswordResetRequest
 */
export type ConfirmPasswordResetRequest = Message<"infrastructure.auth.v1.ConfirmPasswordResetRequest"> & {
    /**
     * Reset code from email
     *
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     * New password
     *
     * @generated from field: string new_password = 2;
     */
    newPassword: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 3;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.ConfirmPasswordResetRequest.
 * Use `create(ConfirmPasswordResetRequestSchema)` to create a new message.
 */
export declare const ConfirmPasswordResetRequestSchema: GenMessage<ConfirmPasswordResetRequest>;
/**
 * ConfirmPasswordResetResponse confirms password was reset
 *
 * @generated from message infrastructure.auth.v1.ConfirmPasswordResetResponse
 */
export type ConfirmPasswordResetResponse = Message<"infrastructure.auth.v1.ConfirmPasswordResetResponse"> & {
    /**
     * Whether reset was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the reset
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Error message if failed
     *
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message infrastructure.auth.v1.ConfirmPasswordResetResponse.
 * Use `create(ConfirmPasswordResetResponseSchema)` to create a new message.
 */
export declare const ConfirmPasswordResetResponseSchema: GenMessage<ConfirmPasswordResetResponse>;
/**
 * SendVerificationEmailRequest for sending verification email
 *
 * @generated from message infrastructure.auth.v1.SendVerificationEmailRequest
 */
export type SendVerificationEmailRequest = Message<"infrastructure.auth.v1.SendVerificationEmailRequest"> & {
    /**
     * Email address to verify
     *
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * Optional: Redirect URL after verification
     *
     * @generated from field: string redirect_url = 2;
     */
    redirectUrl: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 3;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.SendVerificationEmailRequest.
 * Use `create(SendVerificationEmailRequestSchema)` to create a new message.
 */
export declare const SendVerificationEmailRequestSchema: GenMessage<SendVerificationEmailRequest>;
/**
 * SendVerificationEmailResponse confirms verification email was sent
 *
 * @generated from message infrastructure.auth.v1.SendVerificationEmailResponse
 */
export type SendVerificationEmailResponse = Message<"infrastructure.auth.v1.SendVerificationEmailResponse"> & {
    /**
     * Whether the request was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the request
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Error message if failed
     *
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message infrastructure.auth.v1.SendVerificationEmailResponse.
 * Use `create(SendVerificationEmailResponseSchema)` to create a new message.
 */
export declare const SendVerificationEmailResponseSchema: GenMessage<SendVerificationEmailResponse>;
/**
 * VerifyEmailRequest for verifying email with code
 *
 * @generated from message infrastructure.auth.v1.VerifyEmailRequest
 */
export type VerifyEmailRequest = Message<"infrastructure.auth.v1.VerifyEmailRequest"> & {
    /**
     * Verification code from email
     *
     * @generated from field: string code = 1;
     */
    code: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.VerifyEmailRequest.
 * Use `create(VerifyEmailRequestSchema)` to create a new message.
 */
export declare const VerifyEmailRequestSchema: GenMessage<VerifyEmailRequest>;
/**
 * VerifyEmailResponse confirms email was verified
 *
 * @generated from message infrastructure.auth.v1.VerifyEmailResponse
 */
export type VerifyEmailResponse = Message<"infrastructure.auth.v1.VerifyEmailResponse"> & {
    /**
     * Whether verification was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the verification
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Error message if failed
     *
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message infrastructure.auth.v1.VerifyEmailResponse.
 * Use `create(VerifyEmailResponseSchema)` to create a new message.
 */
export declare const VerifyEmailResponseSchema: GenMessage<VerifyEmailResponse>;
/**
 * SendMagicLinkRequest for sending passwordless login link
 *
 * @generated from message infrastructure.auth.v1.SendMagicLinkRequest
 */
export type SendMagicLinkRequest = Message<"infrastructure.auth.v1.SendMagicLinkRequest"> & {
    /**
     * Email address to send magic link to
     *
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * Optional: Redirect URL after login
     *
     * @generated from field: string redirect_url = 2;
     */
    redirectUrl: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 3;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.SendMagicLinkRequest.
 * Use `create(SendMagicLinkRequestSchema)` to create a new message.
 */
export declare const SendMagicLinkRequestSchema: GenMessage<SendMagicLinkRequest>;
/**
 * SendMagicLinkResponse confirms magic link was sent
 *
 * @generated from message infrastructure.auth.v1.SendMagicLinkResponse
 */
export type SendMagicLinkResponse = Message<"infrastructure.auth.v1.SendMagicLinkResponse"> & {
    /**
     * Whether the request was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the request
     *
     * @generated from field: string message = 2;
     */
    message: string;
    /**
     * Error message if failed
     *
     * @generated from field: string error_message = 3;
     */
    errorMessage: string;
};
/**
 * Describes the message infrastructure.auth.v1.SendMagicLinkResponse.
 * Use `create(SendMagicLinkResponseSchema)` to create a new message.
 */
export declare const SendMagicLinkResponseSchema: GenMessage<SendMagicLinkResponse>;
/**
 * CreateSessionRequest for creating a new session
 *
 * @generated from message infrastructure.auth.v1.CreateSessionRequest
 */
export type CreateSessionRequest = Message<"infrastructure.auth.v1.CreateSessionRequest"> & {
    /**
     * Identity to create session for
     *
     * @generated from field: string identity_id = 1;
     */
    identityId: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
    /**
     * How long the session should be valid (in seconds)
     *
     * @generated from field: int64 expires_in_seconds = 3;
     */
    expiresInSeconds: bigint;
    /**
     * Optional: Device information
     *
     * @generated from field: infrastructure.auth.v1.DeviceInfo device_info = 4;
     */
    deviceInfo?: DeviceInfo;
    /**
     * Access token for the session
     *
     * @generated from field: string access_token = 5;
     */
    accessToken: string;
    /**
     * Optional: Refresh token
     *
     * @generated from field: string refresh_token = 6;
     */
    refreshToken: string;
};
/**
 * Describes the message infrastructure.auth.v1.CreateSessionRequest.
 * Use `create(CreateSessionRequestSchema)` to create a new message.
 */
export declare const CreateSessionRequestSchema: GenMessage<CreateSessionRequest>;
/**
 * CreateSessionResponse contains the created session
 *
 * @generated from message infrastructure.auth.v1.CreateSessionResponse
 */
export type CreateSessionResponse = Message<"infrastructure.auth.v1.CreateSessionResponse"> & {
    /**
     * Session identifier
     *
     * @generated from field: string session_id = 1;
     */
    sessionId: string;
    /**
     * When the session expires
     *
     * @generated from field: google.protobuf.Timestamp expires_at = 2;
     */
    expiresAt?: Timestamp;
    /**
     * Session token (if different from access token)
     *
     * @generated from field: string session_token = 3;
     */
    sessionToken: string;
    /**
     * When the session was created
     *
     * @generated from field: google.protobuf.Timestamp created_at = 4;
     */
    createdAt?: Timestamp;
};
/**
 * Describes the message infrastructure.auth.v1.CreateSessionResponse.
 * Use `create(CreateSessionResponseSchema)` to create a new message.
 */
export declare const CreateSessionResponseSchema: GenMessage<CreateSessionResponse>;
/**
 * GetSessionRequest for retrieving session information
 *
 * @generated from message infrastructure.auth.v1.GetSessionRequest
 */
export type GetSessionRequest = Message<"infrastructure.auth.v1.GetSessionRequest"> & {
    /**
     * Session identifier
     *
     * @generated from field: string session_id = 1;
     */
    sessionId: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.GetSessionRequest.
 * Use `create(GetSessionRequestSchema)` to create a new message.
 */
export declare const GetSessionRequestSchema: GenMessage<GetSessionRequest>;
/**
 * GetSessionResponse contains session information
 *
 * @generated from message infrastructure.auth.v1.GetSessionResponse
 */
export type GetSessionResponse = Message<"infrastructure.auth.v1.GetSessionResponse"> & {
    /**
     * Session identifier
     *
     * @generated from field: string session_id = 1;
     */
    sessionId: string;
    /**
     * Identity associated with the session
     *
     * @generated from field: infrastructure.auth.v1.Identity identity = 2;
     */
    identity?: Identity;
    /**
     * When the session was created
     *
     * @generated from field: google.protobuf.Timestamp created_at = 3;
     */
    createdAt?: Timestamp;
    /**
     * When the session expires
     *
     * @generated from field: google.protobuf.Timestamp expires_at = 4;
     */
    expiresAt?: Timestamp;
    /**
     * Whether the session is active
     *
     * @generated from field: bool is_active = 5;
     */
    isActive: boolean;
    /**
     * Device information
     *
     * @generated from field: infrastructure.auth.v1.DeviceInfo device_info = 6;
     */
    deviceInfo?: DeviceInfo;
    /**
     * Access token
     *
     * @generated from field: string access_token = 7;
     */
    accessToken: string;
    /**
     * Refresh token
     *
     * @generated from field: string refresh_token = 8;
     */
    refreshToken: string;
};
/**
 * Describes the message infrastructure.auth.v1.GetSessionResponse.
 * Use `create(GetSessionResponseSchema)` to create a new message.
 */
export declare const GetSessionResponseSchema: GenMessage<GetSessionResponse>;
/**
 * InvalidateSessionRequest for invalidating a session
 *
 * @generated from message infrastructure.auth.v1.InvalidateSessionRequest
 */
export type InvalidateSessionRequest = Message<"infrastructure.auth.v1.InvalidateSessionRequest"> & {
    /**
     * Session identifier
     *
     * @generated from field: string session_id = 1;
     */
    sessionId: string;
    /**
     * Provider to use
     *
     * @generated from field: infrastructure.auth.v1.Provider provider = 2;
     */
    provider: Provider;
};
/**
 * Describes the message infrastructure.auth.v1.InvalidateSessionRequest.
 * Use `create(InvalidateSessionRequestSchema)` to create a new message.
 */
export declare const InvalidateSessionRequestSchema: GenMessage<InvalidateSessionRequest>;
/**
 * InvalidateSessionResponse confirms session invalidation
 *
 * @generated from message infrastructure.auth.v1.InvalidateSessionResponse
 */
export type InvalidateSessionResponse = Message<"infrastructure.auth.v1.InvalidateSessionResponse"> & {
    /**
     * Whether invalidation was successful
     *
     * @generated from field: bool success = 1;
     */
    success: boolean;
    /**
     * Message about the invalidation
     *
     * @generated from field: string message = 2;
     */
    message: string;
};
/**
 * Describes the message infrastructure.auth.v1.InvalidateSessionResponse.
 * Use `create(InvalidateSessionResponseSchema)` to create a new message.
 */
export declare const InvalidateSessionResponseSchema: GenMessage<InvalidateSessionResponse>;
/**
 * AuthenticationDomainService provides authentication operations
 *
 * @generated from service infrastructure.auth.v1.AuthenticationInfraService
 */
export declare const AuthenticationInfraService: GenService<{
    /**
     * User authentication operations
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.Login
     */
    login: {
        methodKind: "unary";
        input: typeof LoginRequestSchema;
        output: typeof LoginResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.Logout
     */
    logout: {
        methodKind: "unary";
        input: typeof LogoutRequestSchema;
        output: typeof LogoutResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.Register
     */
    register: {
        methodKind: "unary";
        input: typeof RegisterRequestSchema;
        output: typeof RegisterResponseSchema;
    };
    /**
     * Password management
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.SendPasswordResetEmail
     */
    sendPasswordResetEmail: {
        methodKind: "unary";
        input: typeof SendPasswordResetEmailRequestSchema;
        output: typeof SendPasswordResetEmailResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.ConfirmPasswordReset
     */
    confirmPasswordReset: {
        methodKind: "unary";
        input: typeof ConfirmPasswordResetRequestSchema;
        output: typeof ConfirmPasswordResetResponseSchema;
    };
    /**
     * Email verification
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.SendVerificationEmail
     */
    sendVerificationEmail: {
        methodKind: "unary";
        input: typeof SendVerificationEmailRequestSchema;
        output: typeof SendVerificationEmailResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.VerifyEmail
     */
    verifyEmail: {
        methodKind: "unary";
        input: typeof VerifyEmailRequestSchema;
        output: typeof VerifyEmailResponseSchema;
    };
    /**
     * Passwordless authentication
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.SendMagicLink
     */
    sendMagicLink: {
        methodKind: "unary";
        input: typeof SendMagicLinkRequestSchema;
        output: typeof SendMagicLinkResponseSchema;
    };
    /**
     * JWT token operations
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.GenerateJwtToken
     */
    generateJwtToken: {
        methodKind: "unary";
        input: typeof GenerateJwtTokenRequestSchema;
        output: typeof GenerateJwtTokenResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.ValidateJwtToken
     */
    validateJwtToken: {
        methodKind: "unary";
        input: typeof ValidateJwtTokenRequestSchema;
        output: typeof ValidateJwtTokenResponseSchema;
    };
    /**
     * API key operations
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.CreateApiKey
     */
    createApiKey: {
        methodKind: "unary";
        input: typeof CreateApiKeyRequestSchema;
        output: typeof CreateApiKeyResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.ValidateApiKey
     */
    validateApiKey: {
        methodKind: "unary";
        input: typeof ValidateApiKeyRequestSchema;
        output: typeof ValidateApiKeyResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.RevokeApiKey
     */
    revokeApiKey: {
        methodKind: "unary";
        input: typeof RevokeApiKeyRequestSchema;
        output: typeof RevokeApiKeyResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.ListApiKeys
     */
    listApiKeys: {
        methodKind: "unary";
        input: typeof ListApiKeysRequestSchema;
        output: typeof ListApiKeysResponseSchema;
    };
    /**
     * Session management
     *
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.CreateSession
     */
    createSession: {
        methodKind: "unary";
        input: typeof CreateSessionRequestSchema;
        output: typeof CreateSessionResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.GetSession
     */
    getSession: {
        methodKind: "unary";
        input: typeof GetSessionRequestSchema;
        output: typeof GetSessionResponseSchema;
    };
    /**
     * @generated from rpc infrastructure.auth.v1.AuthenticationInfraService.InvalidateSession
     */
    invalidateSession: {
        methodKind: "unary";
        input: typeof InvalidateSessionRequestSchema;
        output: typeof InvalidateSessionResponseSchema;
    };
}>;
