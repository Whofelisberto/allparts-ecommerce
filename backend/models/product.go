// Package models products
package models

type Product struct {
	ID     uint    `json:"id" gorm:"primaryKey"`
	Title    string  `json:"title"`
	Description string  `json:"description"`
	Price  float64 `json:"price"`
	Stock   int   `json:"stock"`
	Category    string  `json:"category"`
	ImageURL    string  `json:"image_url"`

	Orders []Order `json:"orders"`
}
