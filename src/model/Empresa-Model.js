
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const ProdutoSchema = new Schema({
    nome: String,
    marca: String,
    descricao: String,
    preco: Number
})

const EmpresaSchema = new Schema({
    razaoSocial: String,
    cnpj: Number,
    nomeFantasia: String,
    telefone: String,
    email: String,
    senha: String,
    produtos: [ ProdutoSchema ]
})

EmpresaSchema.post('validate', (doc) => {
    doc.senha = jwt.sign({
        senha: doc.senha
    }, 'Salt&Pepper')
})

module.exports = mongoose.model('Empresa', EmpresaSchema)
