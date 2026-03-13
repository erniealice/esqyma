-- Migration: attachment (down)
-- Dialect: postgres
-- Date: 2026-03-13
-- Reverses attachment table creation

DROP INDEX IF EXISTS "idx_attachment_workspace";
DROP INDEX IF EXISTS "idx_attachment_module_foreign";
DROP TABLE IF EXISTS "attachment";
