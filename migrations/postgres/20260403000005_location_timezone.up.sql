-- Migration: Add timezone field to location table
-- IANA timezone string e.g. "Asia/Manila", used for timezone-aware rate card validity evaluation

ALTER TABLE "location" ADD COLUMN IF NOT EXISTS "timezone" TEXT NOT NULL DEFAULT 'Asia/Manila';
