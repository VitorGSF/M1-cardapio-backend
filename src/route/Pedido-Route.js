const { response } = require('express')
const express = require('express')
const Pedido = require('../model/Pedido-Model.js')
const routerPedido = express.Router()

routerPedido.post('/cadastrar', (req, res) => {
    const pedido = new Pedido({
        empresa: {
            _id: req.body.empresa._id,
            nome: req.body.empresa.nome
        },
        cliente: {
            _id: req.body.cliente._id,
            nome: req.body.cliente.nome,
            cep: req.body.cliente.cep,
            logradouro: req.body.cliente.logradouro,
            numero: req.body.cliente.numero,
            bairro: req.body.cliente.bairro,
            complemento: req.body.cliente.complemento,
            telefone: req.body.cliente.telefone
        },
        produto: {
            _id: req.body.produto._id,
            nome: req.body.produto.nome,
            preco: req.body.produto.preco
        },
        quantidade: req.body.quantidade,
        status: req.body.status
    })

    pedido.save( (err) => {
        if (err) {
            res.status(422).send({
                created: false,
                error: 'Não foi possível salvar o pedido'
            })
        } else {
            res.status(201).send({
                created: true
            })
        }
    })
})

routerPedido.get('/:id', (req, res) => {
    Pedido.findById(req.params.id, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Pedido não encontrado'
            })
        }
    })
})

routerPedido.get('/lista/empresa/:id', (req, res) => {
    Pedido.find({'empresa._id': req.params.id}, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Pedido não encontrado'
            })
        }
    })
})

routerPedido.get('/lista/cliente/:id', (req, res) => {
    Pedido.find({'cliente._id': req.params.id}, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Pedido não encontrado'
            })
        }
    })
})

routerPedido.patch('/alterar/:id', (req, res) => {
    Pedido.findById(req.params.id, (err, doc) => {
        doc.status = req.body.status

        doc.save( (err) => {
            if (err) {
                res.status(422).send({
                    created: false,
                    error: 'Não foi possível salvar o pedido'
                })
            } else {
                res.status(201).send({
                    created: true
                })
            }
        })
    })
})

routerPedido.delete('/remover/:id', (req, res) => {
    Pedido.findByIdAndDelete(req.params.id, (err, doc) => {
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

module.exports = routerPedido