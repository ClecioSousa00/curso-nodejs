import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { User } from '../../database/models'
import { UsersProvider } from '../../database/providers/users'
import { PasswordCrypto } from '../../shared/services/PasswordCrypto'

interface BodyProps extends Omit<User, 'id' | 'name'> {}

const UserSchema: yup.ObjectSchema<BodyProps> = yup.object({
  email: yup.string().email().required().min(5),
  password: yup.string().required().min(6),
})

export const signInValidation = validation('body', UserSchema)

export const signIn = async (
  req: Request<{}, {}, BodyProps>,
  res: Response,
) => {
  console.log(req.body)

  const { email, password } = req.body

  const result = await UsersProvider.getByEmail(email)

  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    })
    return
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    result.password,
  )
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    })
    return
  }

  res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste' })
}
