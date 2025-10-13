// Package models users
package models

type User struct {
	ID			 uint   `json:"id" gorm:"primaryKey"`
	Name		 string `json:"name"`
	Email		 string `json:"email" gorm:"unique"`
	Password	 string `json:"password"`
	Role		 string `json:"role"` // "admin" or "user"

	Orders []Order `json:"orders"`
}
