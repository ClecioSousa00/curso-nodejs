import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { People } from '../../database/models'
import { PeoplesProvider } from '../../database/providers/peoples'

interface BodyProps extends Omit<People, 'id'> {}

const bodySchema: yup.ObjectSchema<BodyProps> = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityId: yup.number().integer().required(),
})

export const createValidation = validation('body', bodySchema)

export const create = async (
  req: Request<{}, {}, BodyProps>,
  res: Response,
) => {
  console.log(req.body)

  const result = await PeoplesProvider.create(req.body)

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
