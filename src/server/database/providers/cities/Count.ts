import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'

export const count = async (filter: string): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableName.cidade)
      .where('name', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count')

    if (Number.isInteger(Number(count))) return Number(count)
    return new Error('Erro ao consultar a quantidade total de registros')
  } catch (error) {
    return new Error('Erro ao consultar a quantidade total de registros')
  }
}
