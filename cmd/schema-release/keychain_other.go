//go:build !darwin

package main

import "errors"

func readPlatformKeychain(service, account string) ([]byte, error) {
	return nil, errors.New("macOS Keychain credentials are unavailable on this platform; select explicit CI environment references")
}
