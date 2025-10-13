// Package controllers
package controllers

import (
	"allparts-ecommerce/backend/utils"
	"errors"
	"log"

	"allparts-ecommerce/backend/config"
	"allparts-ecommerce/backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Register(c *fiber.Ctx) error {

	type Dados struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Role     string `json:"role"`
	}

	var body Dados

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "dados inválidos"})
	}

	if body.Name == "" || body.Email == "" || body.Password == "" {
		return c.Status(400).JSON(fiber.Map{"error": "E-mail e Senha Obrigatórios"})
	}

	var existingUser models.User
	if err := config.DB.Where("email = ?", body.Email).First(&existingUser).Error; err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			log.Println("Erro ao verificar usuário existente:", err)
			return c.Status(500).JSON(fiber.Map{"error": "Erro ao verificar email"})
		}
	} else {
		return c.Status(400).JSON(fiber.Map{"error": "E-mail já cadastrado"})
	}

	hash, err := utils.HashPassword(body.Password)
	if err != nil {
		log.Println("Erro gerar hash:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao registrar usuário"})
	}

	role := body.Role
	if role == "" {
		role = "user"
	}
	user := models.User{
		Name: body.Name,
		Email:    body.Email,
		Password: hash,
		Role:     role,
	}

	if err := config.DB.Create(&user).Error; err != nil {
		log.Println("Erro ao criar usuário:", err)
		return c.Status(500).JSON(fiber.Map{"error": "Erro ao registrar usuário"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "Usuário registrado com sucesso"})
}

func Login(c *fiber.Ctx) error {

	type Dados struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

var body Dados

 if err := c.BodyParser(&body); err != nil {
	return c.Status(400).JSON(fiber.Map{"error": "dados inválidos"})
 }
 if body.Email == "" || body.Password == "" {
	return c.Status(400).JSON(fiber.Map{"error": "E-mail e Senha Obrigatórios"})
 }

 var user models.User

 if err:= config.DB.Where("email = ?", body.Email).First(&user).Error; err != nil {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return c.Status(400).JSON(fiber.Map{"error": "E-mail ou Senha inválidos"})
	}
	log.Println("Erro ao buscar usuário:", err)
	return c.Status(500).JSON(fiber.Map{"error": "Erro ao buscar usuário"})
 }

 if  !utils.CheckarPasswordHash(body.Password, user.Password) {
	return c.Status(400).JSON(fiber.Map{"error": "Credenciais inválidas"})
 }

 token, err := utils.GeneratedJWT(user.ID, user.Role)
 if err != nil {
	return c.Status(500).JSON(fiber.Map{"error": "Erro ao gerar token"})
 }
 return c.JSON(fiber.Map{
	"message": "Login realizado com sucesso",
	"user": fiber.Map{
		"id":    user.ID,
		"name":  user.Name,
		"email":  user.Email,
		"role":   user.Role,
	},
	"token": token,
})

}
