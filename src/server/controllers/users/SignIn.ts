import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { User } from '../../database/models'
import { UsersProvider } from '../../database/providers/users'
import { PasswordCrypto } from '../../shared/services/PasswordCrypto'
import { JWTService } from '../../shared/services'

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

  const user = await UsersProvider.getByEmail(email)

  if (user instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    })
    return
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    user.password,
  )
  if (!passwordMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      },
    })
    return
  }

  const accessToken = JWTService.sign({ uid: user.id })

  if (accessToken === 'JWT_SECRET_NOT_FOUND') {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro ao gerar token de acesso',
      },
    })
    return
  }
  res.status(StatusCodes.OK).json({ accessToken })
}
