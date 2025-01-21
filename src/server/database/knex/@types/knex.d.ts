import { City } from '../../models'

declare module 'knex/types/tables' {
  interface Tables {
    city: City
  }
}
