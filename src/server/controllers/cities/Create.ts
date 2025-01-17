import { Request, Response } from 'express'
import * as yup from 'yup'

interface City {
  name: string
}

const bodyValidation: yup.ObjectSchema<City> = yup.object({
  name: yup.string().required().min(3),
})

export const create = async (req: Request<{}, {}, City>, res: Response) => {
  let validateData: City | undefined
  try {
    validateData = await bodyValidation.validate(req.body)
    console.log(validateData)

    res.send('Create!')
  } catch (error) {
    const yupError = error as yup.ValidationError
    res.json({
      errors: {
        default: yupError.message,
      },
    })
  }
}
