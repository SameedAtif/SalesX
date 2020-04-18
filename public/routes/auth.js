const express = require('express')
const http = require('../services/httpService')

const router = express.Router()

const apiEndpoint = '/auth'

router.post('/employee', async (req, res) => {
    try {
        const { data } = await http.post(apiEndpoint + '/employee', req.body)

        res.send(data)
    } catch ({ response }) {
        res.status(response.status).send(response.data)
    }
})

module.exports = router