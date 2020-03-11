/*
 * http://knexjs.org/#Schema
 */

const knex = require('knex')

const tables = {
    'Items': function (table) {
        table.increments()
        table.string('name')
        table.float('price')
    },
    'Inventory': function (table) {
        table.integer('item_id').unsigned()
        table.float('quantity')

        table.foreign('item_id').references('Items.id')
    }
}

module.exports = {
    createTablesIfTheyDontExist: function (knexInstance) {
        for (const table in tables) {
            knexInstance.schema.withSchema('salesx').hasTable(table).then(function (exists) {
                if (!exists) {
                    console.log(`Creating table ${table}...`)
                    return knexInstance.schema.withSchema('salesx')
                        .createTable(table, tables[table])
                } else {
                    console.log(`${table} table already exists!`)
                }
            })
        }
    }
}