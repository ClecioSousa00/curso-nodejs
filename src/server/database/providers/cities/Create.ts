import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { City } from '../../models'

export const create = async (
  city: Omit<City, 'id'>,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableName.cidade).insert(city).returning('id')

    if (typeof result === 'object') return result.id
    if (typeof result === 'number') return result

    return new Error('Erro ao cadastrar registro')
  } catch (error) {
    return new Error('Erro ao cadastrar registro')
  }
}
