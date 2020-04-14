const path = require('path')
const fs = require('fs')
const isDev = require('electron-is-dev')
const express = require('express')
const cors = require('cors')
const knex = require('./services/dbService')

const prelude = require('./routes/prelude')
const auth = require('./routes/auth')
const transactions = require('./routes/transactions')

const app = express()
const PORT = 3005

/* Middlewares */
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())

/* Routes */
app.use('/prelude', prelude)
app.use('/auth', auth)
app.use('/transactions', transactions)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/items', (req, res) => {
    let result = knex.select('*').from('Items')
    result.then((rows) => {
        res.send(rows)
    }, function (err) {
        res.send(err)
    })
})

app.get('/inventory', (req, res) => {
    let result = knex.select('*').from('Inventory')
    result.then((rows) => {
        res.send(rows)
    }, function (err) {
        res.send(err)
    })
})

/* Configuration API */
app.route('/input-video-device')
    .get((req, res) => {
        const rawdata = fs.readFileSync(path.join(__dirname, 'config.json'))
        const json = JSON.parse(rawdata)

        res.send(json)
    })
    .post((req, res) => {
        if (req.body.videoInputDevice) {
            const rawdata = fs.readFileSync(path.join(__dirname, 'config.json'))
            const json = JSON.parse(rawdata)

            json.videoInputDevice = req.body.videoInputDevice

            fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(json, null, 4))

            res.send('saved')
        } else {
            res.status(400).send('malformed request')
        }
    })

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

module.exports = app