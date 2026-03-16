-- Migration: operation_domain (down)
-- Dialect: postgres
-- Drops Layers 2-6 operation domain tables in reverse dependency order.

DROP TABLE IF EXISTS "inventory_movement";
DROP TABLE IF EXISTS "job_settlement";
DROP TABLE IF EXISTS "activity_expense";
DROP TABLE IF EXISTS "activity_material";
DROP TABLE IF EXISTS "activity_labor";
DROP TABLE IF EXISTS "job_activity";
DROP TABLE IF EXISTS "job_task";
DROP TABLE IF EXISTS "job_phase";
DROP TABLE IF EXISTS "job";
DROP TABLE IF EXISTS "job_template_task";
DROP TABLE IF EXISTS "job_template_phase";
DROP TABLE IF EXISTS "job_template";
