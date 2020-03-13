const path = require('path')
const fs = require('fs')
const isDev = require('electron-is-dev')
const express = require('express')
const cors = require('cors')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'salesx'
    },
    acquireConnectionTimeout: 10000
})

const { createTablesIfTheyDontExist } = require('./schema')

const app = express()
const PORT = 3005

/* Middlewares */
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())

/* Routes */
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
            const rawdata = fs.readFileSync(path.join(__dirname, './config.json'))
            const json = JSON.parse(rawdata)

            json.videoInputDevice = req.body.videoInputDevice

            fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(json, null, 4))

            res.send('saved')
        } else {
            res.send('malformed request')
        }
    })

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

createTablesIfTheyDontExist(knex)

module.exports = app