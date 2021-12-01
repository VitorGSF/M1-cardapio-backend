const { response } = require('express')
const express = require('express')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/authentication.js')
const Empresa = require('../model/Empresa-Model.js')
const routerEmpresa = express.Router()

routerEmpresa.use(auth)

routerEmpresa.post('/cadastrar', (req, res) => {
    const empresa = new Empresa({
        razaoSocial: req.body.razaoSocial,
        cnpj: req.body.cnpj,
        nomeFantasia: req.body.nomeFantasia,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.senha
    })

    empresa.save( (err) => {
        if (err) {
            res.status(422).send({
                error: 'Não foi possível salvar a empresa'
            })
        } else {
            const conversao = {
                _id: empresa._id
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

routerEmpresa.post('/logar', (req, res) => {
    const empresa = {
        email: req.body.email,
        senha: req.body.senha
    }

    Empresa.findOne({
        email: empresa.email
    }, (err, doc) => {
        if (doc) {
            const resp = jwt.verify(doc.senha, 'Salt&Pepper')
            if (resp.senha == empresa.senha) {
                const conversao = {
                    _id: doc._id
                }
                const response = jwt.sign(conversao, 'Salt&Pepper', {
                    expiresIn: '1h'
                })
                res.status(201).send({
                    token: response,
                    empresa: doc
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

routerEmpresa.get('/minha-empresa/:id', (req, res) => {
    if (auth) {
        Empresa.findById(req.params.id, (err, doc) => {
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
    }
})

routerEmpresa.get('/empresas', (req, res) => {
    Empresa.find({}, (err, doc) => {
        if (doc) {
            res.status(200).send(doc)
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Nenhuma empresa encontrada'
            })
        }
    })
})

routerEmpresa.get('/:id/produtos', (req, res) => {
    Empresa.findById(req.params.id, (err, doc) => {
        if (doc) {
            res.status(200).send({
                produtos: doc.produtos,
                qtdProdutos: doc.produtos.length
            });
        } else if (err) {
            res.status(422).send({
                error: 'Não foi possível retornar sua requisição'
            })
        } else {
            res.status(404).send({
                error: 'Nenhuma empresa encontrada'
            })
        }
    })
})

routerEmpresa.patch('/adicionar-produto/:id', (req, res) => {
    Empresa.findById(req.params.id, (err, doc) => {
        const produto = {
            _id: req.body._id,
            nome: req.body.nome,
            marca: req.body.marca,
            descricao: req.body.descricao,
            preco: req.body.preco
        }

        const resp = jwt.verify(doc.senha, 'Salt&Pepper')
        doc.senha = resp.senha

        doc.produtos.push(produto)

        doc.save( (errSave) => {
            if (errSave) {
                response.status(422).send({
                    add: false,
                    error: 'Não foi possível completar a sua requisição'
                })
            } else {
                res.status(201).send(doc)
            }
        })
    })
})

routerEmpresa.delete('/remover-produto/:id/:idProduto', (req, res) => {
    Empresa.findById(req.params.id, (err, doc) => {
        doc.produtos.forEach( (elemento, indice) => {
            if(elemento._id.toString() == req.params.idProduto.toString()) {
                doc.produtos.splice(indice, 1)
            }
        })

        const resp = jwt.verify(doc.senha, 'Salt&Pepper')
        doc.senha = resp.senha

        doc.save( (errSave) => {
            if (errSave) {
                response.status(422).send({
                    add: false,
                    error: 'Não foi possível completar a sua requisição'
                })
            } else {
                res.status(201).send(doc)
            }
        })
    })
})

routerEmpresa.put('/alterar/:id', (req, res) => {
    const empresa = {
        razaoSocial: req.body.razaoSocial,
        cnpj: req.body.cnpj,
        nomeFantasia: req.body.nomeFantasia,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.senha
    }

    Empresa.findByIdAndUpdate(req.params.id, empresa, (err, doc) => {
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
                    save: empresa
                })
            } else {
                res.status(401).send({
                    update: false
                })
            }
        }
        
    })
})

routerEmpresa.delete('/remover/:id', (req, res) => {
    Empresa.findByIdAndDelete(req.params.id, (err, doc) => {
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

module.exports = routerEmpresa