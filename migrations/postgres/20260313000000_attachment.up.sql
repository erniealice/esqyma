-- Migration: attachment (up)
-- Dialect: postgres
-- Date: 2026-03-13
-- Description: Create attachment table for document/file attachment system
--   Polymorphic design: module_key + foreign_key link attachments to any entity

-- ============================================
-- Create attachment table
-- ============================================

CREATE TABLE IF NOT EXISTS "attachment" (
    "id" TEXT PRIMARY KEY,
    "date_created" BIGINT,
    "date_created_string" TEXT,
    "date_modified" BIGINT,
    "date_modified_string" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "module_key" TEXT NOT NULL,
    "foreign_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workspace_id" TEXT,
    "storage_container" TEXT,
    "storage_key" TEXT,
    "content_type" TEXT,
    "file_size_bytes" BIGINT,
    "created_by" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active'
);

CREATE INDEX IF NOT EXISTS "idx_attachment_module_foreign" ON "attachment" ("module_key", "foreign_key");
CREATE INDEX IF NOT EXISTS "idx_attachment_workspace" ON "attachment" ("workspace_id");
