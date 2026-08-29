package main

import (
	"bufio"
	"fmt"
	"net"
	"net/url"
	"os"
	"strconv"
	"strings"
)

type databaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	SSLMode  string
	Name     string
}

func loadEnvironment(path string) (map[string]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	values := make(map[string]string)
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		line = strings.TrimPrefix(line, "export ")
		key, value, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		key = strings.TrimSpace(key)
		value = strings.TrimSpace(value)
		if len(value) >= 2 && ((value[0] == '\'' && value[len(value)-1] == '\'') || (value[0] == '"' && value[len(value)-1] == '"')) {
			value = value[1 : len(value)-1]
		}
		values[key] = value
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}
	return values, nil
}

func valueFor(values map[string]string, key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	if value := values[key]; value != "" {
		return value
	}
	return fallback
}

func configFromEnvironment(values map[string]string, databaseName string) (databaseConfig, error) {
	config := databaseConfig{
		Host:     valueFor(values, "DATABASE_POSTGRES_HOST", "127.0.0.1"),
		Port:     valueFor(values, "DATABASE_POSTGRES_PORT", "5432"),
		User:     valueFor(values, "DATABASE_POSTGRES_USER", ""),
		Password: valueFor(values, "DATABASE_POSTGRES_PASSWORD", ""),
		SSLMode:  valueFor(values, "DATABASE_POSTGRES_SSLMODE", "disable"),
		Name:     databaseName,
	}
	if config.User == "" || !databasePattern.MatchString(config.Name) {
		return databaseConfig{}, fmt.Errorf("database user and valid target database name are required")
	}
	port, err := strconv.Atoi(config.Port)
	if err != nil || port < 1 || port > 65535 {
		return databaseConfig{}, fmt.Errorf("invalid PostgreSQL port")
	}
	if config.SSLMode == "" {
		return databaseConfig{}, fmt.Errorf("PostgreSQL sslmode is required")
	}
	return config, nil
}

func (config databaseConfig) loopback() bool {
	host := strings.Trim(config.Host, "[]")
	if strings.EqualFold(host, "localhost") {
		return true
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}

func (config databaseConfig) databaseURL(name string) string {
	user := url.User(config.User)
	if config.Password != "" {
		user = url.UserPassword(config.User, config.Password)
	}
	u := url.URL{Scheme: "postgres", User: user, Host: net.JoinHostPort(strings.Trim(config.Host, "[]"), config.Port), Path: "/" + name}
	query := u.Query()
	query.Set("sslmode", config.SSLMode)
	u.RawQuery = query.Encode()
	return u.String()
}

func (config databaseConfig) postgresEnvironment(name string) []string {
	return append(os.Environ(),
		"PGHOST="+config.Host,
		"PGPORT="+config.Port,
		"PGUSER="+config.User,
		"PGPASSWORD="+config.Password,
		"PGSSLMODE="+config.SSLMode,
		"PGDATABASE="+name,
	)
}
