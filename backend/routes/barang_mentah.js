const express = require(`express`)
const app = express()
const bmentahController = 
require(`../controller/barang_mentah`)

app.get(`/`, bmentahController.getAllBmentah)
app.post(`/add`, bmentahController.createBmentah)

module.exports= app;