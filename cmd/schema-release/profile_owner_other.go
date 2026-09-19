//go:build !darwin && !linux

package main

import "os"

func profileOwnedByCurrentUser(info os.FileInfo) bool { return false }
