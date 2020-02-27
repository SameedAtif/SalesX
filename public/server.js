const path = require('path')
const isDev = require('electron-is-dev')
const express = require('express')
const cors = require('cors')
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: isDev ? 'db.sqlite' : path.join(__dirname, '../../db.sqlite')
    },
    acquireConnectionTimeout: 10000
})

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

module.exports = app