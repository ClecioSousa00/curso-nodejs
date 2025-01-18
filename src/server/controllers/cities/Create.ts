import { Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

interface City {
  name: string
  estado: string
}

const bodyValidation: yup.ObjectSchema<City> = yup.object({
  name: yup.string().required().min(3),
  estado: yup.string().required().min(3),
})

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, {
      abortEarly: false,
    })
    next()
  } catch (err) {
    const yupError = err as yup.ValidationError
    const errors: Record<string, string> = {}

    yupError.inner.forEach((error) => {
      if (!error.path) return
      errors[error.path] = error.message
    })

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: errors,
      },
    })
  }
}

export const create = async (req: Request<{}, {}, City>, res: Response) => {
  console.log(req.body)

  res.send('Create!')
}
