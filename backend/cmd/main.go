// Package main

package main

import (
	"allparts-ecommerce/backend/config"
	"allparts-ecommerce/backend/routes"
	"fmt"
	"log"
	"os"

	"allparts-ecommerce/backend/models"
  "github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

)

func main() {

  godotenv.Load("../../.env")
	fmt.Println("STRIPE_SECRET_KEY:", os.Getenv("STRIPE_SECRET_KEY"))
	config.ConnectDatabase()
	config.DB.AutoMigrate(&models.User{}, &models.Product{}, &models.Order{})

	app := fiber.New()
	app.Use(cors.New())
	routes.Setup(app)
	log.Fatal(app.Listen(":4000"))
	fmt.Println("Servidor rodando na porta 4000")

}
