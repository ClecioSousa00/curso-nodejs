import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { City } from '../../models'

export const getById = async (id: number): Promise<City | Error> => {
  try {
    const result = await Knex(ETableName.cidade)
      .select('*')
      .where('id', '=', id)
      .first()

    console.log('result', result)

    if (result) return result

    return new Error('Registro não encontrado')
  } catch (error) {
    return new Error('Registro não encontrado')
  }
}
