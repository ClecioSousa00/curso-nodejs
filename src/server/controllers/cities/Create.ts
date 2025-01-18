import { Request, Response } from 'express'
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

export const create = async (req: Request<{}, {}, City>, res: Response) => {
  let validateData: City | undefined
  try {
    validateData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    })
    console.log(validateData)

    res.send('Create!')
  } catch (error) {
    const yupError = error as yup.ValidationError
    const validationErrors: Record<string, string> = {}

    yupError.inner.forEach((error) => {
      if (!error.path) return
      validationErrors[error.path] = error.message
    })

    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: validationErrors,
      },
    })
  }
}
