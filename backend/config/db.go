// Package config configurando o banco de dados
package config

import (
	"fmt"
	"log"
	"os"

	"allparts-ecommerce/backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


var DB * gorm.DB

func ConnectDatabase() {
	host := getEnv("DB_HOST", "localhost")
	user := getEnv("DB_USER", "admin")
	password := getEnv("DB_PASSWORD", "admin")
	dbname := getEnv("DB_NAME", "allparts-ecommerce")
	port := getEnv("DB_PORT", "5532")
	sslmode := getEnv("DB_SSLMODE", "disable")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s", host, user, password, dbname, port, sslmode)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("falha ao conectar com banco de dados")
	}
	fmt.Println("conectado com sucesso ao banco de dados")

	err = DB.AutoMigrate(&models.User{}, &models.Product{}, &models.Order{})
	if err != nil {
		log.Fatal("falha ao migrar o banco de dados", err)
	}
	fmt.Println("banco de dados migrado com sucesso")
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
