// Package controllers
package controllers

import (
	"allparts-ecommerce/backend/config"
	"allparts-ecommerce/backend/models"
	"github.com/gofiber/fiber/v2"
)

func CreateOrder(c *fiber.Ctx) error {
 order := new(models.Order)
 if err := c.BodyParser(order); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Dados inválidos"})
	}
     userID, ok := c.Locals("user_id").(float64)
    if !ok {
        return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
    }
    order.UserID = uint(userID)

	// Busca o produto pelo ID e calcula o total
	var product models.Product
	if err := config.DB.First(&product, order.ProductID).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Produto não encontrado"})
	}
	order.Total = product.Price * float64(order.Quantity)

	if err := config.DB.Create(order).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao criar pedido"})
	}
	return c.Status(201).JSON(order)
}


func GetUserOrders(c *fiber.Ctx) error {
	userID := c.Params("userId")
	var orders []models.Order
	if err := config.DB.Where("user_id = ?", userID).Find(&orders).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao buscar pedidos"})
	}
	return c.JSON(orders)
}

func GetAllOrders(c *fiber.Ctx) error {
	var orders []models.Order
	if err := config.DB.Find(&orders).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao buscar pedidos"})
	}
	return c.JSON(orders)
}
