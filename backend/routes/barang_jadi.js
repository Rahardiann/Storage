const express = require(`express`)
const app = express()
const bjadiController = 
require(`../controller/barang_jadi`)

app.get(`/`, bjadiController.getAllBmentah)
app.post(`/add`, bjadiController.createBmentah)

module.exports= app;