import { Knex } from 'knex'
import { ETableName } from '../ETableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableName.user, (table) => {
      table.bigIncrements('id').primary().index()
      table.string('name').notNullable().checkLength('>', 3)
      table.string('email').index().unique().notNullable().checkLength('>', 5)
      table.string('password').unique().notNullable().checkLength('>', 6)

      table.comment('Tabela para criar usuários')
    })
    .then(() => {
      console.log(`# Created table ${ETableName.user}`)
    })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableName.user).then(() => {
    console.log(`# Dropped table ${ETableName.user}`)
  })
}
