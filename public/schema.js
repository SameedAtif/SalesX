/*
 * http://knexjs.org/#Schema
 */

const knex = require('./services/dbService')

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
    },
    'Invoices': function (table) {
        table.increments()
        table.float('discount')
        table.integer('payment_method').unsigned()
        table.integer('amount_paid').unsigned()
        table.datetime('created_at').defaultTo(knex.fn.now())
    },
    'Invoice_Items': function (table) {
        table.integer('invoice_id').unsigned()
        table.integer('id').notNullable()
        table.string('name').notNullable()
        table.float('price').notNullable()
        table.float('quantity').notNullable()
        table.float('discount').defaultTo(0)

        table.foreign('invoice_id').references('Invoices.id')
    }
}

module.exports = tables