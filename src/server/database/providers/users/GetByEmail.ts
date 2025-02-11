import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { User } from '../../models'

export const getByEmail = async (email: string): Promise<User | Error> => {
  try {
    const result = await Knex(ETableName.user)
      .select('*')
      .where('email', '=', email)
      .first()

    console.log('result', result)

    if (result) return result

    return new Error('Registro não encontrado')
  } catch (error) {
    return new Error('Registro não encontrado')
  }
}
