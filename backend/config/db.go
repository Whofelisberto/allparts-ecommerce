// Package config configurando o banco de dados
package config

import (
	"fmt"
	"log"

	"allparts-ecommerce/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


var DB * gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=admin password=admin dbname=allparts-ecommerce port=5532 sslmode=disable"

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
