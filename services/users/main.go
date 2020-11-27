package main

import (
	"io/ioutil"
	"net/http"
	"github.com/gin-gonic/gin"
	"encoding/json"
	"github.com/gin-contrib/cors"
)

type User struct {
	Name  string `json:name`
    Role   string   `json:"role"`
	Course []string `json:"course"`
}

type UsersData struct {
	Users map[string]*User `json:users`
}

type RequestDetails struct {
    User   string   `json:"user"`
}


func get_names(c *gin.Context) {
    payload, loadErr :=  ioutil.ReadFile("../app/share/data.json")
    if loadErr != nil{
        c.JSON(http.StatusInternalServerError, gin.H{"info":"not load source file"})
    }

    var p UsersData
    err := json.Unmarshal([]byte(payload), &p);
    if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"info":"error encoding"})
	}

    user_data := make([]string,0,100)
    role_data := make([]string,0,100)
	for k := range p.Users {
		user_data = append(user_data, k)
	    role_data = append(role_data, p.Users[k].Role)
	}
	c.JSON(http.StatusOK, gin.H{
	                            "users": []string(user_data),
	                            "roles": []string(role_data),
	})
}

func detail_user(c *gin.Context) {
    payload, loadErr :=  ioutil.ReadFile("../app/share/data.json")
    if loadErr != nil{
        c.JSON(http.StatusInternalServerError, gin.H{"info":"not load source file"})
    }
    var p UsersData
    err := json.Unmarshal([]byte(payload), &p);
    if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"info":"error encoding"})
	}
	var x RequestDetails
    if c.BindJSON(&x) == nil {
        c.JSON(http.StatusOK,
        gin.H{"course": p.Users[x.User].Course, "name":p.Users[x.User].Name, "role": p.Users[x.User].Role})
	}
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

  	router.POST("/user_detail", detail_user)
  	router.GET("/all_users", get_names)

	router.Run(":10000")
}