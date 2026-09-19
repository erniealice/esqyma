//go:build darwin || linux

package main

import (
	"os"
	"syscall"
)

func profileOwnedByCurrentUser(info os.FileInfo) bool {
	stat, ok := info.Sys().(*syscall.Stat_t)
	return ok && stat.Uid == uint32(os.Getuid())
}
