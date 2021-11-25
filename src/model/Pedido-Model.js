
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpresaPedidoSchema = new Schema({
    nome: String
})

const ClientePedidoSchema = new Schema({
    nome: String,
    cep: Number,
    logradouro: String,
    numero: Number,
    bairro: String,
    complemento: String,
    telefone: String
})

const ProdutoPedidoSchema = new Schema({
    nome: String,
    preco: Number
})

const PedidoSchema = new Schema({
    empresa: EmpresaPedidoSchema,
    cliente: ClientePedidoSchema,
    produto: ProdutoPedidoSchema,
    quantidade: Number,
    status: String
})

module.exports = mongoose.model('Pedido', PedidoSchema)