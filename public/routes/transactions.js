const express = require('express')

const http = require('../services/httpService')
const knex = require('../services/dbService')

const router = express.Router()

const apiEndpoint = '/transactions'

router.get('/', (req, res) => {
    res.status(501).send('Not Implemented')
})

router.post('/', async (req, res) => {
    const { items, discount, paymentMethod, amountPaid } = req.body

    try {
        await knex.transaction(async trx => {
            const invoice = await trx('Invoices').insert({
                discount,
                payment_method: paymentMethod,
                amount_paid: amountPaid
            })
            console.log(invoice)

            items.forEach(item => item.invoice_id = invoice[0])

            await trx('Invoice_Items').insert(items)
        })
        return res.send('OK')
    } catch (ex) {
        console.log(ex)
        return res.status(500).send('Transaction failed')
    }
})

module.exports = router