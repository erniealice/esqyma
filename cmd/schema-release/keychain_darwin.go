//go:build darwin

package main

import (
	"context"
	"os/exec"
	"time"
)

func readPlatformKeychain(service, account string) ([]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	return exec.CommandContext(ctx, "/usr/bin/security", "find-generic-password", "-a", account, "-s", service, "-w").Output()
}
