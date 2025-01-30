import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { People } from '../../models'

export const create = async (
  people: Omit<People, 'id'>,
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableName.cidade)
      .where('id', '=', people.cityId)
      .count<[{ count: number }]>('* as count')

    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada')
    }

    const [result] = await Knex(ETableName.pessoa)
      .insert(people)
      .returning('id')
    if (typeof result === 'object') {
      return result.id
    }
    if (typeof result === 'number') {
      return result
    }

    return new Error('Erro ao cadastrar registro')
  } catch (error) {
    return new Error('Erro ao cadastrar registro')
  }
}
