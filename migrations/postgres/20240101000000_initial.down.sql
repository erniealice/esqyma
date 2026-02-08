-- Migration: initial (down)
-- Dialect: postgres
-- Drop tables in reverse dependency order

-- Drop invoice tables
DROP TABLE IF EXISTS "invoice_attribute";
DROP TABLE IF EXISTS "invoice";

-- Drop payment tables
DROP TABLE IF EXISTS "payment_attribute";
DROP TABLE IF EXISTS "payment";

-- Drop balance tables
DROP TABLE IF EXISTS "balance_attribute";
DROP TABLE IF EXISTS "balance";

-- Drop license tables
DROP TABLE IF EXISTS "license_history";
DROP TABLE IF EXISTS "license";

-- Drop subscription tables
DROP TABLE IF EXISTS "subscription_attribute";
DROP TABLE IF EXISTS "subscription";

-- Drop payment profile tables
DROP TABLE IF EXISTS "payment_profile_payment_method";
DROP TABLE IF EXISTS "payment_profile";

-- Drop event junction tables
DROP TABLE IF EXISTS "event_product";
DROP TABLE IF EXISTS "event_client";

-- Drop delegate/client junction
DROP TABLE IF EXISTS "delegate_client";

-- Drop client tables (remove FK first to break circular dep)
ALTER TABLE IF EXISTS "client" DROP CONSTRAINT IF EXISTS "fk_client_category_id";
DROP TABLE IF EXISTS "client_attribute";
DROP TABLE IF EXISTS "client_category";
DROP TABLE IF EXISTS "client";

-- Drop activity tables (Level 5)
DROP TABLE IF EXISTS "activity_execution_log";
DROP TABLE IF EXISTS "activity";

-- Drop stage/activity template tables (Level 4)
DROP TABLE IF EXISTS "activity_template";
DROP TABLE IF EXISTS "stage";

-- Drop stage template (Level 3)
DROP TABLE IF EXISTS "stage_template";
DROP TABLE IF EXISTS "workspace_user_role";
DROP TABLE IF EXISTS "role_permission";

-- Drop workspace tables (Level 2) - remove circular FK first
ALTER TABLE IF EXISTS "workspace" DROP CONSTRAINT IF EXISTS "fk_workspace_workflow_template_id";
DROP TABLE IF EXISTS "workspace_user";
DROP TABLE IF EXISTS "permission";
DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS "workflow";
DROP TABLE IF EXISTS "workflow_template";
DROP TABLE IF EXISTS "workspace";

-- Drop session table
DROP TABLE IF EXISTS "session";

-- Drop Level 1 attribute tables
DROP TABLE IF EXISTS "staff_attribute";
DROP TABLE IF EXISTS "delegate_attribute";
DROP TABLE IF EXISTS "group_attribute";
DROP TABLE IF EXISTS "location_attribute";
DROP TABLE IF EXISTS "collection_plan";
DROP TABLE IF EXISTS "collection_parent";
DROP TABLE IF EXISTS "collection_attribute";
DROP TABLE IF EXISTS "price_plan";
DROP TABLE IF EXISTS "plan_location";
DROP TABLE IF EXISTS "plan_settings";
DROP TABLE IF EXISTS "plan_attribute";
DROP TABLE IF EXISTS "product_collection";
DROP TABLE IF EXISTS "resource";
DROP TABLE IF EXISTS "product_plan";
DROP TABLE IF EXISTS "price_product";
DROP TABLE IF EXISTS "product_attribute";
DROP TABLE IF EXISTS "event_settings";
DROP TABLE IF EXISTS "event_attribute";
DROP TABLE IF EXISTS "staff";
DROP TABLE IF EXISTS "delegate";
DROP TABLE IF EXISTS "admin";

-- Drop base tables (Level 0)
DROP TABLE IF EXISTS "event_recurrence";
DROP TABLE IF EXISTS "category";
DROP TABLE IF EXISTS "payment_method";
DROP TABLE IF EXISTS "location";
DROP TABLE IF EXISTS "collection";
DROP TABLE IF EXISTS "event";
DROP TABLE IF EXISTS "product";
DROP TABLE IF EXISTS "plan";
DROP TABLE IF EXISTS "group";
DROP TABLE IF EXISTS "attribute";
DROP TABLE IF EXISTS "user";
