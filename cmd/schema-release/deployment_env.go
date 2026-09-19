package main

import (
	"encoding/json"
	"errors"
	"io"
	"os"
	"path/filepath"
	"strings"

	schemareleases "github.com/erniealice/esqyma/schema-releases"
)

// Bind the target verifier to the file Cloud Run will consume. Read raw values,
// without ambient environment overrides or shell evaluation, to catch a verifier
// checking a different endpoint from the deployment. Never include values in errors.
func validateDeploymentEnvironment(root, path string, target targetManifest, config databaseConfig, required []schemareleases.RequiredBundle) error {
	expected := filepath.Join(root, filepath.FromSlash(target.Database.EnvFile))
	if !filepath.IsAbs(path) || filepath.Clean(path) != expected {
		return errors.New("deployment environment differs from registered target environment")
	}
	actual, err := filepath.EvalSymlinks(path)
	if err != nil || actual != expected {
		return errors.New("deployment environment must be a regular non-symlink target file")
	}
	info, err := os.Stat(path)
	if err != nil || !info.Mode().IsRegular() {
		return errors.New("deployment environment is not a regular file")
	}
	values, err := deploymentEnvironmentValues(path)
	if err != nil {
		return err
	}
	if values["DATABASE_POSTGRES_SSLROOTCERT"] != "" || config.SSLRootCert != "" {
		if _, err := deploymentTrustPathFromValues(values, config.SSLRootCert); err != nil {
			return err
		}
	}
	for key, expected := range map[string]string{
		"CONFIG_DATABASE_PROVIDER":  "postgresql",
		"ESQYMA_SCHEMA_RELEASE":     target.SchemaRelease,
		"COPYA_TARGET_KEY":          target.TargetKey,
		"DATABASE_POSTGRES_HOST":    config.Host,
		"DATABASE_POSTGRES_PORT":    config.Port,
		"DATABASE_POSTGRES_DBNAME":  config.Name,
		"DATABASE_POSTGRES_USER":    config.User,
		"DATABASE_POSTGRES_SSLMODE": config.SSLMode,
	} {
		if expected == "" || values[key] != expected {
			return errors.New("deployment runtime identity differs from verified target: " + key)
		}
	}
	decoder := json.NewDecoder(strings.NewReader(values["COPYA_REQUIRED_BUNDLES_JSON"]))
	decoder.DisallowUnknownFields()
	var bundles []schemareleases.RequiredBundle
	if err := decoder.Decode(&bundles); err != nil || bundles == nil {
		return errors.New("invalid deployment bundle requirements")
	}
	var extra any
	if decoder.Decode(&extra) != io.EOF {
		return errors.New("deployment bundle requirements contain trailing data")
	}
	if len(bundles) != len(required) {
		return errors.New("deployment bundle requirements differ from target")
	}
	remaining := make(map[schemareleases.RequiredBundle]bool, len(required))
	for _, bundle := range required {
		remaining[bundle] = true
	}
	for _, bundle := range bundles {
		if bundle.SchemaRelease == "" {
			bundle.SchemaRelease = target.SchemaRelease
		}
		if !remaining[bundle] {
			return errors.New("deployment bundle requirements differ from target or contain duplicates")
		}
		delete(remaining, bundle)
	}
	if len(remaining) != 0 {
		return errors.New("deployment bundle requirements are incomplete")
	}
	return nil
}

func deploymentEnvironmentValues(path string) (map[string]string, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, errors.New("cannot read deployment environment")
	}
	values := map[string]string{}
	for _, line := range strings.Split(string(raw), "\n") {
		line = strings.TrimSuffix(line, "\r")
		if strings.TrimSpace(line) == "" || strings.HasPrefix(strings.TrimSpace(line), "#") {
			continue
		}
		key, value, ok := strings.Cut(line, "=")
		if !ok || !credentialKeyPattern.MatchString(key) || strings.TrimSpace(value) != value || strings.HasPrefix(value, "\"") || strings.HasPrefix(value, "'") {
			return nil, errors.New("deployment environment requires unquoted plain unique KEY=value entries")
		}
		if _, exists := values[key]; exists {
			return nil, errors.New("deployment environment has duplicate keys")
		}
		values[key] = value
	}
	return values, nil
}

func deploymentTrustPath(path, localCA string) (string, error) {
	values, err := deploymentEnvironmentValues(path)
	if err != nil {
		return "", err
	}
	return deploymentTrustPathFromValues(values, localCA)
}

func deploymentTrustPathFromValues(values map[string]string, localCA string) (string, error) {
	if !filepath.IsAbs(localCA) || filepath.Clean(localCA) != localCA {
		return "", errors.New("deployment CA must be an absolute clean path")
	}
	actual, err := filepath.EvalSymlinks(localCA)
	if err != nil || actual != localCA {
		return "", errors.New("deployment CA must be a regular non-symlink file")
	}
	info, err := os.Stat(localCA)
	if err != nil || !info.Mode().IsRegular() {
		return "", errors.New("deployment CA is not a regular file")
	}
	basename := filepath.Base(localCA)
	if basename == "." || basename == string(filepath.Separator) || basename == "" {
		return "", errors.New("deployment CA has invalid basename")
	}
	if values["DATABASE_POSTGRES_SSLROOTCERT"] != "/app/certs/"+basename {
		return "", errors.New("deployment CA does not map the runtime /app/certs path")
	}
	return localCA, nil
}
