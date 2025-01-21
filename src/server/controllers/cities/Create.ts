import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { City } from '../../database/models'

interface BodyProps extends Omit<City, 'id'> {}
// interface Filter {
//   filter?: string
// }

const CitySchema: yup.ObjectSchema<BodyProps> = yup.object({
  name: yup.string().required().min(3),
})
// const FilterSchema: yup.ObjectSchema<Filter> = yup.object({
//   filter: yup.string().min(3),
// })

// export const createValidation = validation(() => ({ body: CitySchema }))
export const createValidation = validation('body', CitySchema)
// export const createValidationFilter = validation('query', FilterSchema)

export const create = async (req: Request<{}, {}, City>, res: Response) => {
  console.log(req.body)

  res.status(StatusCodes.CREATED).send('Not Implements !')
}
