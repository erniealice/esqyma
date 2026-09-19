package main

import (
	"errors"
	"testing"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

func TestVerifyRequiresExistingManagedRelease(t *testing.T) {
	for _, state := range []string{"absent", "empty", "untracked-nonempty", "unknown"} {
		t.Run(state, func(t *testing.T) {
			_, err := verifyManagedState(state, func() (schemareleases.Verification, error) {
				t.Fatal("verification must not initialize or inspect a nonexistent managed target")
				return schemareleases.Verification{}, nil
			})
			if err == nil {
				t.Fatal("deployment accepted an unready database")
			}
		})
	}
	for _, failure := range []error{nil, errors.New("missing required bundle"), errors.New("catalog drift"), errors.New("dirty tracker")} {
		calls := 0
		_, err := verifyManagedState("managed", func() (schemareleases.Verification, error) {
			calls++
			return schemareleases.Verification{Release: "postgres/2026.08.1"}, failure
		})
		if calls != 1 || !errors.Is(err, failure) {
			t.Fatalf("verification failure suppressed: calls=%d err=%v", calls, err)
		}
	}
}
