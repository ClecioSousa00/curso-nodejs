import { PasswordCrypto } from '../../../shared/services/PasswordCrypto'
import { ETableName } from '../../ETableNames'
import { Knex } from '../../knex'
import { User } from '../../models'

export const create = async (
  user: Omit<User, 'id'>,
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.password)
    const [result] = await Knex(ETableName.user)
      .insert({ ...user, password: hashedPassword })
      .returning('id')

    if (typeof result === 'object') return result.id
    if (typeof result === 'number') return result

    return new Error('Erro ao cadastrar registro')
  } catch (error) {
    return new Error('Erro ao cadastrar registro')
  }
}
