/*
 * http://knexjs.org/#Schema
 */

const { knex } = require('./dbService')

const tables = {
    'Items': function (table) {
        table.increments()
        table.string('name').notNullable()
        table.float('price').notNullable()
        table.string('barcode')
    },
    'Inventory': function (table) {
        table.integer('item_id').unsigned()
        table.float('quantity').notNullable()

        table.foreign('item_id').references('Items.id')
    }
}

module.exports = tables