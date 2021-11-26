require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const EmpresaRoute = require('./route/Empresa-Route.js')
const ProdutoRoute = require('./route/Produto-Route.js')
const PedidoRoute = require('./route/Pedido-Route.js')
const ClienteRoute = require('./route/Cliente-Route.js')
const Pagamento = require('./controller/mercadoPago.js')

mongoose.connect('mongodb+srv://userAuth:8paHwKRP5Wyjg4Kw@cluster0.nby4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false)
app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    app.use(cors());
    next();
});

app.use(bodyParser.json());

app.use('/empresa', EmpresaRoute)
app.use('/produto', ProdutoRoute)
app.use('/pedido', PedidoRoute)
app.use('/cliente', ClienteRoute)
app.use('/pagamento', Pagamento)

app.listen(process.env.PORT, () => {
    console.log(`APP listening at http://localhost:${process.env.PORT}`)
})