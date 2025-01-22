import { Knex } from 'knex'
import { ETableName } from '../ETableNames'

const MAX_NAME_CITY = 150

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableName.cidade, (table) => {
      table.bigIncrements('id').primary().index()
      table
        .string('name', MAX_NAME_CITY)
        .checkLength('<=', MAX_NAME_CITY)
        .index()
        .notNullable()
      table.comment('Tabela para criar cidade')
    })
    .then(() => {
      console.log(`# Created table ${ETableName.cidade}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableName.cidade).then(() => {
    console.log(`# Dropped table ${ETableName.cidade}`)
  })
}
