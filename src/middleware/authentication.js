const jwtToken = require('jsonwebtoken')
const empresa = require('../model/Empresa-Model.js')

module.exports = (req, res, next) => {
    const tokenEmpresa = req.headers['empresa-token']
    if (tokenEmpresa) {
        jwtToken.verify(tokenEmpresa, 'Salt&Pepper', (err, data) => {
            if (err) {
                res.status(401).end()
            } else {
                empresa.findById(data._id).then( (doc) => {
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
