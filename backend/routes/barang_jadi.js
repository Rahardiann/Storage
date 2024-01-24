const express = require(`express`)
const app = express()
const bjadiController = 
require(`../controller/barang_jadi`)

app.get(`/`, bjadiController.getAllBjadi)
app.post(`/add`, bjadiController.createBjadi)

module.exports= app;