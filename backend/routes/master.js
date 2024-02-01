const express = require(`express`)
const app = express()
const masterController =
require(`../controller/master`)

app.post(`/kategori`,masterController.kategoriMaster)
app.post(`/bjadi`,masterController.bjadiMaster)
app.post(`/bmentah`,masterController.bmentahMaster)

module.exports = app