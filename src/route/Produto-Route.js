const express = require('express')
const Produto = require('../model/Produto-Model.js')
const routerProduto = express.Router()

routerProduto.post('/cadastrar', (req, res) => {
    const produto = new Produto({
        nome: req.body.nome,
        marca: req.body.marca,
        descricao: req.body.descricao,
        preco: req.body.preco
    })

    produto.save( (err) => {
        if (err) {
            res.status(422).send({
                created: false,
                error: 'Não foi possível salvar o produto'
            })
        } else {
            res.status(201).send({
                created: true,
                data: produto
            })
        }
    })
})

routerProduto.get('/lista', (req, res) => {
    Produto.find({}, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Produto não encontrado'
            })
        }
    })
})

routerProduto.get('/produto/:id', (req, res) => {
    Produto.findById(req.params.id, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Produto não encontrado'
            })
        }
    })
})

routerProduto.put('/alterar/:id', (req, res) => {
    const produto = {
        nome: req.body.nome,
        marca: req.body.marca,
        descricao: req.body.descricao,
        preco: req.body.preco
    }

    Produto.findByIdAndUpdate(req.params.id, produto, (err, doc) => {
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
                    save: produto
                })
            } else {
                res.status(401).send({
                    update: false
                })
            }
        }
    })
})

routerProduto.delete('/remover/:id', (req, res) => {
    Produto.findByIdAndDelete(req.params.id, (err, doc) => {
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

module.exports = routerProduto