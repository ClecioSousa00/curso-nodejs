import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { People } from '../../models'

export const getById = async (id: number): Promise<People | Error> => {
  try {
    const result = await Knex(ETableName.pessoa)
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
