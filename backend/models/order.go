// Package models orders
package models

type Order struct {
	ID        uint    `json:"id" gorm:"primaryKey"`
	UserID    uint    `json:"user_id"`
	User			User    `json:"user"`

	ProductID uint    `json:"product_id"`
	Product  Product `json:"product"`
	
	Quantity  int     `json:"quantity"`
	Total     float64 `json:"total"`
	Status    string  `json:"status"` // "pending", "shipped", "delivered"
}
