// Package routes definindo as rotas da API
package routes

import (
	"allparts-ecommerce/backend/controllers"
	"allparts-ecommerce/backend/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	api := app.Group("/api")

	// Rotas públicas
	api.Post("/registrar", controllers.Register)
	api.Post("/login", controllers.Login)

	// Rota para checkout Stripe
	api.Post("/checkout", controllers.CreateCheckoutSession)

	// Rota para listar produtos
	api.Get("/products", controllers.GetProducts)
	api.Get("/products/:id", controllers.GetProductByID)


	// Rotas para usuários autenticados (logados)
	api.Post("/orders",middlewares.JWTProtected(), controllers.CreateOrder)
	api.Get("/orders", controllers.GetUserOrders)

// Apenas administradores
	api.Post("/products",middlewares.JWTProtected(),middlewares.AdminOnly(), controllers.CreateProduct)
	api.Get("admin/orders/",middlewares.JWTProtected(),middlewares.AdminOnly(), controllers.GetAllOrders)

	// Atualizar e deletar produtos
	api.Put("/products/:id",middlewares.JWTProtected(),middlewares.AdminOnly(), controllers.UpdateProduct)
	api.Delete("/products/:id",middlewares.JWTProtected(),middlewares.AdminOnly(), controllers.DeleteProduct)

}
