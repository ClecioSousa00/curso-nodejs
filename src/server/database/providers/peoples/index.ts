import * as create from './Create'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as getByIdUpdate from './UpdateById'
import * as deleteById from './DeleteById'
import * as count from './Count'

export const PeoplesProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...getByIdUpdate,
  ...deleteById,
  ...count,
}
