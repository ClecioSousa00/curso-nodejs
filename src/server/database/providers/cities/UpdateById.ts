import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { City } from '../../models'

export const updateById = async (
  id: number,
  city: Omit<City, 'id'>,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableName.cidade)
      .update(city)
      .where('id', '=', id)

    if (result > 0) return

    return new Error('Erro ao atualizar registro')
  } catch (error) {
    return new Error('Erro ao atualizar registro')
  }
}
