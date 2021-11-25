
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProdutoSchema = new Schema({
    nome: String,
    marca: String,
    descricao: String,
    preco: Number
})

module.exports = mongoose.model('Produto', ProdutoSchema)