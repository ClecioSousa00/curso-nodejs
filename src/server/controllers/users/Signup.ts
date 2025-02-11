import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { User } from '../../database/models'
import { UsersProvider } from '../../database/providers/users'

interface BodyProps extends Omit<User, 'id'> {}

const UserSchema: yup.ObjectSchema<BodyProps> = yup.object({
  name: yup.string().required().min(3).max(150),
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
})

export const createValidation = validation('body', UserSchema)

export const create = async (req: Request<{}, {}, User>, res: Response) => {
  console.log(req.body)

  const result = await UsersProvider.create(req.body)

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    })
    return
  }

  res.status(StatusCodes.CREATED).json(result)
}
