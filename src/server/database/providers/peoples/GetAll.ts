import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { People } from '../../models'

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<People[] | Error> => {
  try {
    const result = await Knex(ETableName.pessoa)
      .select('*')
      .where('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit)

    return result
  } catch (error) {
    return new Error('Erro ao consultar registros')
  }
}
