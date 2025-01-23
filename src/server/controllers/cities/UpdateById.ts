import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { City } from '../../database/models'
import { CitiesProvider } from '../../database/providers/cities'

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
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado',
      },
    })
    return
  }

  const result = await CitiesProvider.updateById(req.params.id, req.body)
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    })
    return
  }

  res.status(StatusCodes.NO_CONTENT).json(result)
}
