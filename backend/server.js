const express = require(`express`)
const app = express()
var bodyParser = require(`body-parser`)
const cors = require(`cors`)
const port = 8000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const bjadiRoutes =
require(`./routes/barang_jadi`)
const bmentahRoutes =
require(`./routes/barang_mentah`)
const userRoutes = 
require(`./routes/auth`)

app.use(`/bjadi`, bjadiRoutes)
app.use(`/bmentah`, bmentahRoutes)
app.use(`/user`, userRoutes)

app.listen(port, () => {
    console.log(`Gass port ${port}`)
})