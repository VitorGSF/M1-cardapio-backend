
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const ClienteSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
    cep: Number,
    logradouro: String,
    numero: Number,
    bairro: String,
    cidade: String,
    estado: String,
    complemento: String,
    telefone: String
})

ClienteSchema.post('validate', (doc) => {
    doc.senha = jwt.sign({
        senha: doc.senha
    }, 'Salt&Pepper')
})

module.exports = mongoose.model('Cliente', ClienteSchema)