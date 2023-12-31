package controller

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/minhthao56/monorepo-taxi/libs/go/auth"
	"github.com/minhthao56/monorepo-taxi/libs/go/schema"
)

type UserController interface {
	CreateUser(c *gin.Context)
	// GetUser(c *gin.Context) (string, error)
	// UpdateUser(c *gin.Context) (string, error)
}

type UserControllerImpl struct {
	FirebaseManager auth.FirebaseManager
	db              *sql.DB
}

func NewUserController(client auth.FirebaseManager, db *sql.DB) UserController {
	return &UserControllerImpl{FirebaseManager: client, db: db}
}

func (u *UserControllerImpl) CreateUser(c *gin.Context) {
	payload, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "error reading request body",
		})
	}
	var userReq schema.CreateFirebaseUserRequest
	if err = json.Unmarshal(payload, &userReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "error parsing request body",
		})
	}
	r, err := u.FirebaseManager.CreateUser(c, userReq.Email, userReq.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error creating user",
			"error":   err.Error(),
		})
	}
	c.JSON(http.StatusOK, schema.CreateFirebaseUserResponse{
		UID:   r.UID,
		Email: r.Email,
	})
}

// func (u *UserControllerImpl) GetUser(c *gin.Context) (string, error) {
// 	return u.UserManager.GetUser("")
// }

// func (u *UserControllerImpl) UpdateUser(uid string, email string, password string) (string, error) {
// 	return u.UserManager.UpdateUser(uid, email, password)
// }
