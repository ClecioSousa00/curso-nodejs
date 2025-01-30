import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { People } from '../../models'

export const updateById = async (
  id: number,
  people: Omit<People, 'id'>,
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableName.cidade)
      .where('id', '=', people.cityId)
      .count<[{ count: number }]>('* as count')

    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada')
    }

    const result = await Knex(ETableName.pessoa)
      .update(people)
      .where('id', '=', id)

    if (result > 0) return

    return new Error('Erro ao atualizar registro')
  } catch (error) {
    return new Error('Erro ao atualizar registro')
  }
}
