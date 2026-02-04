# Esqyma Package Expansion Plan: Comprehensive DTO Models

**Date**: 2025-09-28
**Purpose**: Expand the esqyma package from database-focused models to a comprehensive application DTO library covering all layers of the application architecture.

## Current State Analysis

The esqyma package currently contains well-structured database entity models organized by business domain:
- Entity models (users, workspaces, clients, roles, permissions)
- Business models (subscriptions, payments, products, collections)
- Support models (events, records, frameworks, tasks)
- Common utilities (pagination, filtering, sorting, search, errors)

## Proposed New Structure

Based on research of proven patterns from large-scale protobuf projects (SpiceDB, gRPC Gateway, etc.), we propose a layer-based organization that separates concerns by architectural responsibility rather than persistence method.

### **schema/v1/domain/** - Core Business Entities
*New models will be created here with improved go_package declarations*

**Purpose**: Contains pure business domain models that represent core entities and business rules. These are the "single source of truth" for business concepts.

#### Subdirectories:
- **entity/**: User management, workspace hierarchy, permissions (User, Client, Workspace, Role, Permission, etc.)
- **product/**: Product catalog, collections, resources, attributes
- **subscription/**: Subscription lifecycle, plans, billing cycles, balances
- **payment/**: Payment processing, methods, profiles, transactions
- **framework/**: Business frameworks, objectives, tasks, workflows
- **record/**: Record management, audit trails, document handling

**Explanation**: These models represent the core business domain and should be stable, well-defined contracts. They focus on business rules and relationships rather than technical implementation details.

---

### **schema/v1/api/** - Transport Layer DTOs
*New directory for API communication models*

**Purpose**: Contains Data Transfer Objects specifically designed for API communication. These models handle serialization/deserialization and provide stable contracts between services.

#### Subdirectories:
- **request/**: Generic API request wrappers, headers, metadata, correlation IDs
- **response/**: Standardized API response formats, status codes, error handling
- **webhook/**: Webhook payloads, event notifications, callback structures
- **rpc/**: gRPC service definitions, method signatures, streaming configurations

**Explanation**: API models act as an abstraction layer between external interfaces and internal domain models. They handle versioning, backward compatibility, and transport-specific concerns without affecting business logic.

---

### **schema/v1/infrastructure/** - System-Level Concerns
*New directory for technical infrastructure models*

**Purpose**: Models that represent technical infrastructure components and system-level services. These handle non-business technical concerns.

#### Subdirectories:
- **auth/**: Authentication tokens (JWT, OAuth), session management, refresh tokens, identity providers
- **cache/**: Cache entries, TTL configurations, invalidation strategies, Redis models
- **storage/**: File metadata, blob references, cloud storage objects, upload progress
- **queue/**: Background job definitions, task queues, message broker payloads
- **monitoring/**: System metrics, health checks, performance indicators, logging structures

**Explanation**: Infrastructure models abstract technical implementation details and provide contracts for system services. They enable loose coupling between business logic and technical infrastructure.

---

### **schema/v1/integration/** - External System Models
*New directory for third-party service integration*

**Purpose**: Models that represent data structures from external systems and third-party services. These provide stable interfaces for external dependencies.

#### Subdirectories:
- **oauth/**: OAuth provider models (Google, GitHub, Microsoft), authorization flows
- **payment_gateway/**: Payment processor models (Stripe, PayPal, Square), transaction responses
- **email/**: Email service providers (SendGrid, Mailgun), template management, delivery status
- **analytics/**: Analytics platform models (Google Analytics, Mixpanel), event tracking

**Explanation**: Integration models isolate external system dependencies and provide consistent internal representations of third-party data. They handle external API changes without affecting internal business logic.

---

### **schema/v1/ui/** - Frontend-Specific Models
*New directory for user interface and client-side models*

**Purpose**: Models that represent frontend-specific concerns, user interface state, and client-side application behavior.

#### Subdirectories:
- **viewport/**: Screen sizes, device capabilities, responsive breakpoints
- **preferences/**: User interface settings, theme preferences, language selection
- **navigation/**: Menu states, breadcrumbs, routing information, page metadata
- **forms/**: Form validation rules, input states, wizard flows, field configurations

**Explanation**: UI models separate presentation concerns from business logic and provide contracts for frontend-backend communication. They enable frontend flexibility while maintaining data consistency.

---

### **schema/v1/common/** - Shared Utilities
*Existing directory, kept unchanged*

**Purpose**: Contains reusable utility models that are used across multiple layers and domains.

#### Current Contents:
- **pagination.proto**: Pagination requests/responses, cursor management
- **filter.proto**: Dynamic filtering capabilities, query builders
- **sort.proto**: Sorting configurations, multi-field ordering
- **search.proto**: Search functionality, result metadata
- **error.proto**: Standardized error formats, error codes
- **attribute.proto**: Generic attribute system, key-value pairs
- **action.proto**: Action definitions, operation metadata

**Explanation**: Common models provide consistent patterns across the entire application and prevent duplication of frequently used structures.

## Implementation Strategy

### Phase 1: Infrastructure Setup (Backward Compatible)
1. Create new directory structure under `schema/v1/`
2. **KEEP existing models in their current locations unchanged** (maintaining backward compatibility)
3. Create new models in the expanded structure with improved go_package declarations:
   - Update go_package option from `"github.com/erniealice/esqyma/golang/v1/[module]"` to `"github.com/erniealice/esqyma/golang/v1/domain/[module]"`
4. Modify `buf.gen.yaml` to handle new directory structure while preserving existing generation

### Phase 2: API Layer Implementation
1. Create basic request/response wrappers in `schema/v1/api/`
2. Implement webhook payload structures
3. Define gRPC service contracts for new models

### Phase 3: Infrastructure Models
1. Implement authentication and session models
2. Create cache and storage abstractions
3. Define monitoring and queue structures

### Phase 4: Integration Models
1. Add OAuth provider models
2. Implement payment gateway abstractions
3. Create email and analytics models

### Phase 5: UI Models
1. Define viewport and device models
2. Implement preference and navigation models
3. Create form validation structures

### Phase 6: Package Updates
1. Update `package.json` exports for all new models
2. Regenerate TypeScript definitions
3. Update documentation and usage examples

## Benefits of This Structure

1. **Clear Separation of Concerns**: Each layer has a specific responsibility and can evolve independently
2. **Maintainability**: Models are organized by their role in the architecture, making them easier to find and modify
3. **Reusability**: Common patterns are shared while domain-specific models remain isolated
4. **Flexibility**: New models can be added to appropriate layers without affecting other parts of the system
5. **Testing**: Each layer can be tested independently with appropriate mocking strategies

## Migration Considerations

- **Backward Compatibility**: Existing schema/v1/[module] files remain untouched and functional
- New models in schema/v1/[category] structure use improved go_package declarations
- Build scripts will be extended to generate code for new directories alongside existing ones
- Documentation will be updated to explain both existing and new organization patterns
- Zero disruption approach - existing services continue to work while new services can use expanded models

## Expected Outcome

The expanded esqyma package will serve as a comprehensive DTO library that supports the entire application stack, from database entities to UI components, while maintaining clear architectural boundaries and enabling independent evolution of each layer.