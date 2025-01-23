import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableName.cidade).where('id', '=', id).del()

    if (result > 0) return

    return new Error('Erro ao apagar registro')
  } catch (error) {
    return new Error('Erro ao apagar registro')
  }
}
