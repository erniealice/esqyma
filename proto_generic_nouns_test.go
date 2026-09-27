package esqyma

import (
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"
)

var protoVerticalIdentifier = regexp.MustCompile(`(?i)\b[A-Za-z_][A-Za-z_0-9]*(report_?card|teacher|student|enrollment|homeroom|deportment)[A-Za-z_0-9]*\b|\b(report_?card|teacher|student|enrollment|homeroom|deportment)[A-Za-z_0-9]*\b`)
var protoCommentOrString = regexp.MustCompile(`(?s)/\*.*?\*/|//[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'`)

func TestNoVerticalNounsInProtoIdentifiers(t *testing.T) {
	var violations []string
	err := filepath.WalkDir("proto", func(path string, entry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if entry.IsDir() || !strings.HasSuffix(path, ".proto") {
			return nil
		}
		source, err := os.ReadFile(path)
		if err != nil {
			return err
		}
		code := protoCommentOrString.ReplaceAllStringFunc(string(source), func(s string) string { return strings.Repeat(" ", len(s)) })
		for _, hit := range protoVerticalIdentifier.FindAllString(code, -1) {
			violations = append(violations, fmt.Sprintf("%s: %s", path, hit))
		}
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	// Include root-level Go identifiers so a newly introduced helper cannot bypass this package guard.
	entries, err := os.ReadDir(".")
	if err != nil {
		t.Fatal(err)
	}
	fset := token.NewFileSet()
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".go") || strings.HasSuffix(entry.Name(), "_test.go") {
			continue
		}
		file, err := parser.ParseFile(fset, entry.Name(), nil, 0)
		if err != nil {
			t.Fatal(err)
		}
		ast.Inspect(file, func(node ast.Node) bool {
			if ident, ok := node.(*ast.Ident); ok && protoVerticalIdentifier.MatchString(ident.Name) {
				violations = append(violations, fmt.Sprintf("%s: %s", entry.Name(), ident.Name))
			}
			return true
		})
	}
	if len(violations) != 0 {
		t.Fatalf("vertical proto/Go identifiers:\n%s", strings.Join(violations, "\n"))
	}
}
