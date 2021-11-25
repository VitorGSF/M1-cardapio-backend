const jwtToken = require('jsonwebtoken')
const cliente = require('../model/Cliente-Model.js')

module.exports = (req, res, next) => {
    const tokenCliente = req.headers['cliente-token']
    if (tokenCliente) {
        jwtToken.verify(tokenCliente, 'Salt&Pepper', (err, data) => {
            if (err) {
                res.status(401).end()
            } else {
                cliente.findById(data._id).then( (doc) => {
                    if (doc) {
                        
                    } else {
                        res.status(401).end()
                    }
                }).catch( () => {
                    res.status(401).end()
                })
            }
        })
    } else {
        next()
    }
}
