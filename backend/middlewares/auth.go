// Package middlewares fornece autenticação JWT para proteger as rotas.
package middlewares

import (
	"allparts-ecommerce/backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)


func JWTProtected() fiber.Handler {
    return func(c *fiber.Ctx) error {
        tokenString := c.Get("Authorization")
        if tokenString == "" {
            return c.Status(401).JSON(fiber.Map{"error": "Token não fornecido"})
        }

        if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
            tokenString = tokenString[7:]
        }

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fiber.NewError(401, "Método de assinatura inesperado")
            }
            return []byte(utils.JwtSecret), nil
        })
        if err != nil || !token.Valid {
            return c.Status(401).JSON(fiber.Map{"error": "Token inválido"})
        }

        claims, ok := token.Claims.(jwt.MapClaims)
        if ok {
            c.Locals("user_id", claims["id"])
        }

        c.Locals("user", token)
        return c.Next()
    }
}

func AdminOnly() fiber.Handler {
    return func(c *fiber.Ctx) error {
        user, ok := c.Locals("user").(*jwt.Token)
        if !ok {
            return c.Status(401).JSON(fiber.Map{"error": "Usuário não autenticado"})
        }
        claims, ok := user.Claims.(jwt.MapClaims)
        if !ok {
            return c.Status(401).JSON(fiber.Map{"error": "Claims inválidos"})
        }
        role, ok := claims["role"].(string)
        if !ok || role != "admin" {
            return c.Status(403).JSON(fiber.Map{"error": "Acesso negado, apenas administradores"})
        }
        return c.Next()
    }
}
