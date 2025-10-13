// Package controllers
package controllers

import (
	"allparts-ecommerce/backend/config"
	"allparts-ecommerce/backend/models"

	"github.com/gofiber/fiber/v2"
)

func GetProducts(c *fiber.Ctx) error {
	var products []models.Product
	if err := config.DB.Find(&products).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao buscar produtos"})
	}
	return c.JSON(products)
}

func GetProductByID(c *fiber.Ctx) error {
    id := c.Params("id")
    var product models.Product
    if err := config.DB.First(&product, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Produto não encontrado"})
    }
    return c.JSON(product)
}

func CreateProduct(c *fiber.Ctx) error {
	product := new(models.Product)
	if err := c.BodyParser(product); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Dados inválidos"})
	}
	if err := config.DB.Create(&product).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao criar produto"})
	}
	return c.Status(201).JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product
	if err := config.DB.First(&product, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Produto não encontrado"})
	}
	var data models.Product
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Dados inválidos"})
	}

	product.Title = data.Title
	product.Description = data.Description
	product.Price = data.Price
	product.Stock = data.Stock
	product.Category = data.Category
	product.ImageURL = data.ImageURL

	if err := config.DB.Save(&product).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao atualizar produto"})
	}
	return c.JSON(product)
}


func DeleteProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product
if err := config.DB.First(&product, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Produto não encontrado"})
	}
	if err := config.DB.Delete(&product).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao deletar produto"})
	}
	return c.JSON(fiber.Map{"message": "Produto deletado com sucesso"})
}
