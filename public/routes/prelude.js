const express = require('express')

const router = express.Router()

const { knex } = require('../dbService')

const tables = require('../schema')

router.get('/', (req, res) => {

})

router.get('/environment', (req, res) => {
    wait(2000)
    res.send('OK')
})

router.get('/database', async (req, res) => {
    try {
        const result = await knex.raw('SELECT 1 + 1 as result')
        res.send('OK')
    } catch (ex) {
        res.status(400).send('FAIL')
    }
})

router.get('/setup-tables', async (req, res) => {
    try {
        for (const table in tables) {
            const exists = await knex.schema.withSchema('salesx').hasTable(table)
                
            if (!exists) {
                console.log(`Creating table ${table}...`)
                return knex.schema.withSchema('salesx')
                    .createTable(table, tables[table])
            } else {
                console.log(`${table} table already exists!`)
            }
        }

        res.send('OK')
    } catch (ex) {
        res.status(400).send('FAIL')
    }
})

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

module.exports = router