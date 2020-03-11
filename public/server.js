const path = require('path')
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

app.use(cors({
    origin: 'http://localhost:3000'
}))

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

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

createTablesIfTheyDontExist(knex)

module.exports = app