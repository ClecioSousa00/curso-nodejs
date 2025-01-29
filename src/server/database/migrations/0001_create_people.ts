import { Knex } from 'knex'
import { ETableName } from '../ETableNames'

const MAX_NAME_CITY = 150

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableName.pessoa, (table) => {
      table.bigIncrements('id').primary().index()
      table.string('name', MAX_NAME_CITY).index().notNullable()
      table.string('email').unique().notNullable()
      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableName.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      table.comment('Tabela para criar pessoa')
    })
    .then(() => {
      console.log(`# Created table ${ETableName.pessoa}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableName.pessoa).then(() => {
    console.log(`# Dropped table ${ETableName.pessoa}`)
  })
}
