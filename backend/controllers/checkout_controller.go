package controllers

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/checkout/session"
	"math"
)

type CheckoutRequest struct {
	Endereco map[string]string `json:"endereco"`
	Cart     []struct {
		ID       interface{} `json:"id"`
		Title    string      `json:"title"`
		Price    float64     `json:"price"`
		Quantity int         `json:"quantity"`
	} `json:"cart"`
}

type CheckoutResponse struct {
	URL string `json:"url"`
}

func CreateCheckoutSession(c *fiber.Ctx) error {
	var req CheckoutRequest
	rawBody := c.Body()
	fmt.Println("Raw request body:", string(rawBody))
	if err := c.BodyParser(&req); err != nil {
		fmt.Println("BodyParser error:", err)
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request")
	}

	// Log dados recebidos
	reqJSON, _ := json.MarshalIndent(req, "", "  ")
	fmt.Println("Parsed request:", string(reqJSON))

	stripeKey := os.Getenv("STRIPE_SECRET_KEY")
	fmt.Println("Stripe Key:", stripeKey)
	stripe.Key = stripeKey

	if len(req.Cart) == 0 {
		fmt.Println("Carrinho vazio!")
		return c.Status(fiber.StatusBadRequest).SendString("Carrinho vazio")
	}

	lineItems := []*stripe.CheckoutSessionLineItemParams{}
	for i, item := range req.Cart {
		fmt.Printf("Item %d: %+v\n", i, item)
		if item.Title == "" || item.Price <= 0 || item.Quantity <= 0 {
			fmt.Printf("Item inválido: %+v\n", item)
			return c.Status(fiber.StatusBadRequest).SendString("Item do carrinho inválido")
		}
		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("brl"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name: stripe.String(item.Title),
				},
				UnitAmount: stripe.Int64(int64(math.Round(item.Price * 100))),
			},
			Quantity: stripe.Int64(int64(item.Quantity)),
		})
	}

	params := &stripe.CheckoutSessionParams{
		LineItems: lineItems,
		Mode:      stripe.String("payment"),
		SuccessURL: stripe.String("http://localhost:3000"),
		CancelURL:  stripe.String("http://localhost:3000"),
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
	}

	fmt.Println("Stripe params:", params)
	s, err := session.New(params)
	if err != nil {
		fmt.Println("Stripe error:", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Stripe error: " + err.Error())
	}

	fmt.Println("Stripe session URL:", s.URL)
	resp := CheckoutResponse{URL: s.URL}
	return c.JSON(resp)
}
