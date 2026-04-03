-- Migration: Add proximate_day to payment_term for proximate due-date type
-- proximate_day is only meaningful when type = 'proximate' (1-28)

ALTER TABLE "payment_term" ADD COLUMN IF NOT EXISTS "proximate_day" INTEGER NULL;
