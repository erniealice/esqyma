-- Receipt-only ledger for target-selected Copya data bundles.
--
-- Canonical bundle history and selection remain in reviewed code/target manifests.
-- This table records only the immutable fact that one exact bundle digest was
-- applied to one target after schema-release verification.

CREATE SCHEMA IF NOT EXISTS ichizen_deploy;

CREATE TABLE ichizen_deploy.data_bundle_receipts (
    target_key TEXT NOT NULL,
    bundle_id TEXT NOT NULL,
    bundle_version TEXT NOT NULL,
    bundle_digest CHAR(64) NOT NULL,
    schema_release TEXT NOT NULL,
    business_type TEXT NOT NULL,
    workspace_id TEXT NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    applied_by TEXT NOT NULL DEFAULT current_user,
    CONSTRAINT data_bundle_receipts_pkey
        PRIMARY KEY (target_key, bundle_id, bundle_version),
    CONSTRAINT data_bundle_receipts_digest_format
        CHECK (bundle_digest ~ '^[0-9a-f]{64}$'),
    CONSTRAINT data_bundle_receipts_release_format
        CHECK (schema_release ~ '^postgres/[0-9]{4}\.[0-9]{2}\.[1-9][0-9]*$')
);

CREATE OR REPLACE FUNCTION ichizen_deploy.reject_bundle_receipt_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION 'data bundle receipts are append-only';
END;
$$;

CREATE TRIGGER data_bundle_receipts_append_only
BEFORE UPDATE OR DELETE OR TRUNCATE
ON ichizen_deploy.data_bundle_receipts
FOR EACH STATEMENT
EXECUTE FUNCTION ichizen_deploy.reject_bundle_receipt_mutation();

REVOKE ALL ON SCHEMA ichizen_deploy FROM PUBLIC;
GRANT USAGE ON SCHEMA ichizen_deploy TO PUBLIC;
REVOKE ALL ON TABLE ichizen_deploy.data_bundle_receipts FROM PUBLIC;
GRANT SELECT ON TABLE ichizen_deploy.data_bundle_receipts TO PUBLIC;
