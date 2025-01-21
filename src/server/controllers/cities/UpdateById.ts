import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { City } from '../../database/models'

interface ParamProps {
  id?: number
}

interface BodyProps extends Omit<City, 'id'> {}

const ParamsPropsSchema: yup.ObjectSchema<ParamProps> = yup.object({
  id: yup.number().integer().required().moreThan(0),
})

const BodyPropsSchema: yup.ObjectSchema<BodyProps> = yup.object({
  name: yup.string().required().min(3),
})

// export const updateByIdValidation = validation(() => ({
//   body: BodyPropsSchema,
//   params: ParamsPropsSchema,
// }))
export const updateByIdValidationParams = validation(
  'params',
  ParamsPropsSchema,
)
export const updateByIdValidationBody = validation('body', BodyPropsSchema)

export const updateById = async (
  req: Request<ParamProps, {}, BodyProps>,
  res: Response,
) => {
  console.log(req.params)
  console.log(req.body)

  res.status(StatusCodes.NO_CONTENT).send()
}
