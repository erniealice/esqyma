package main

import (
	"context"
	"errors"
	"fmt"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// Planning a future initialization is not evidence that an application can boot.
// Keep the deploy gate distinct: only an existing managed database whose full
// release and required bundles verify may pass. No initialization is attempted.
func verifyManagedState(state string, observe func() (schemareleases.Verification, error)) (schemareleases.Verification, error) {
	if state != "managed" {
		return schemareleases.Verification{}, fmt.Errorf("verify requires an existing managed database; observed %s", state)
	}
	return observe()
}

func runVerify(ctx context.Context, target targetManifest, config databaseConfig, manifest schemareleases.Manifest, required []schemareleases.RequiredBundle) error {
	if target.Scope == "remote" || target.Access != nil {
		if err := validateAccessConnection(target, config); err != nil {
			return err
		}
	}
	config.ReadOnly = true
	db, err := openDatabase(config, config.Name)
	if err != nil {
		return errors.New("connect target for read-only verification failed")
	}
	defer db.Close()
	if err := verifyRuntimeIdentity(ctx, db, target, config); err != nil {
		return err
	}
	state, err := databaseState(ctx, db)
	if err != nil {
		return err
	}
	result, err := verifyManagedState(state, func() (schemareleases.Verification, error) {
		return schemareleases.VerifyDatabase(ctx, db, manifest, required)
	})
	if err != nil {
		return err
	}
	return writeOutput(commandOutput{Mode: "verify", TargetKey: target.TargetKey, Database: config.Name, Scope: target.Scope, ObservedState: state, SchemaRelease: manifest.Release, AtlasHead: result.AtlasHead, CatalogFingerprint: result.CatalogFingerprint, Actions: []string{"verified exact release and required bundles (server-enforced read-only)"}})
}
