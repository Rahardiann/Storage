const express = require(`express`)
const app = express()
const masterController =
require(`../controller/master`)

app.get(`/kategori`,masterController.getKategoriMaster)
app.post(`/kategori`,masterController.kategoriMaster)
app.get(`/bjadi`,masterController.getBjadiMaster)
app.post(`/bjadi`,masterController.bjadiMaster)
app.get(`/bmentah`,masterController.getBmentahMaster)
app.post(`/bmentah`,masterController.bmentahMaster)

module.exports = app