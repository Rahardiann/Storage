const express = require(`express`)
const app = express()
const userController =
require(`../controller/auth`)

app.get(`/login`, userController.login)
app.post(`/add`, userController.createUser)

module.exports = app