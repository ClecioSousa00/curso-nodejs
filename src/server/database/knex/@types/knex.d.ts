import { User, City, People } from '../../models'

declare module 'knex/types/tables' {
  interface Tables {
    city: City
    people: People
    user: User
  }
}
