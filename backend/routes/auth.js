const express = require(`express`)
const app = express()
const userController =
require(`../controller/auth`)

app.post(`/login`, userController.login)
app.post(`/add`, userController.createUser)
app.put(`/update/:id`, userController.updateUser)
app.delete(`/delete/:id`, userController.deleteUser)

module.exports = app