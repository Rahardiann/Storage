const express = require(`express`)
const app = express()
const statistikController =
require(`../controller/statistik`)

app.get(`/`,statistikController.statistik)

module.exports = app