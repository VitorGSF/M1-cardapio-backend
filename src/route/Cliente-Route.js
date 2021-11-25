const { response } = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/authentication-cliente.js')
const Cliente = require('../model/Cliente-Model.js')
const routerCliente = express.Router()

routerCliente.use(auth)

routerCliente.post('/cadastrar', (req, res) => {
    const cliente = new Cliente({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        complemento: req.body.complemento,
        telefone: req.body.telefone
    })

    cliente.save( (err) => {
        if (err) {
            res.status(422).send({
                error: 'Não foi possível salvar a empresa'
            })
        } else {
            const conversao = {
                _id: cliente._id
            }
            const resp = jwt.sign(conversao, 'Salt&Pepper', {
                expiresIn: '1h'
            })
            res.status(201).send({
                token: resp
            })
        }
    })
})

routerCliente.post('/logar', (req, res) => {
    const cliente = {
        email: req.body.email,
        senha: req.body.senha
    }

    Cliente.findOne({
        email: cliente.email
    }, (err, doc) => {
        if (doc) {
            const resp = jwt.verify(doc.senha, 'Salt&Pepper')
            if (resp.senha == cliente.senha) {
                const conversao = {
                    _id: doc._id
                }
                const response = jwt.sign(conversao, 'Salt&Pepper', {
                    expiresIn: '1h'
                })
                res.status(201).send({
                    token: response,
                    cliente: doc
                })
            } else {
                res.status(404).send({
                    auth: false
                })
            }
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Empresa não encontrada'
            })
        }
    })
})

routerCliente.get('/meu-perfil/:id', (req, res) => {
    Cliente.findById(req.params.id, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Empresa não encontrada'
            })
        }
    })
})

routerCliente.put('/alterar/:id', (req, res) => {
    const cliente = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.senha,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        complemento: req.body.complemento
    }

    Cliente.findByIdAndUpdate(req.params.id, cliente, (err, doc) => {
        if (err) {
            res.status(404).send({
                update: false,
                status: err
            })
        } else {
            if (doc) {
                res.status(201).send({
                    update: true,
                    modified: doc,
                    save: cliente
                })
            } else {
                res.status(401).send({
                    update: false
                })
            }
        }
        
    })
})

routerCliente.delete('/remover/:id', (req, res) => {
    Cliente.findByIdAndDelete(req.params.id, (err, doc) => {
        if (err) {
            res.status(422).send({
                deleted: false,
                error: err
            })
        } else {
            if (doc) {
                res.status(201).send({
                    deleted: true
                })
            } else {
                res.status(401).send({
                    deleted: false
                })
            }
        }
    })
})

module.exports = routerCliente