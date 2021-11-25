const express = require('express')
const routerPagamento = express.Router()

const mercadopago = require('mercadopago')

routerPagamento.post('/pagar', async (req, res) => {
    mercadopago.configurations.setAccessToken('TEST-2069736386372447-112418-9e0643448a23c729ce7d65d9002f9e76-436406584')

    
    const payment_data = {
        transaction_amount: req.body.transactionAmount,
        token: req.body.payload.token,
        description: req.body.payload.description,
        installments: Number(req.body.payload.installments),
        payment_method_id: 'visa',
        issuer_id: req.body.payload.issuer,
        payer: {
            email: req.body.payload.email,
            identification: {
                type: req.body.payload.docType,
                number: req.body.payload.docNumber
            }
        }
    }
    
    mercadopago.payment.save(payment_data).then( (response) => {
        res.status(201).json({
            status: response.body.status,
            status_detail: response.body.status_detail,
            id: response.body.id
        })
    }).catch((error) => {
        res.status(422).send(error);
    })
})

module.exports = routerPagamento

