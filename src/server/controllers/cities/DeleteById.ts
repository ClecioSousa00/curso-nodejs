import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

interface ParamProps {
  id?: number
}

const ParamsPropsSchema: yup.ObjectSchema<ParamProps> = yup.object({
  id: yup.number().integer().required().moreThan(0),
})

// export const deleteByIdValidation = validation(() => ({
//   params: ParamsPropsSchema,
// }))
export const deleteByIdValidation = validation('params', ParamsPropsSchema)
export const deleteById = async (req: Request<ParamProps>, res: Response) => {
  console.log(req.params)

  res.status(StatusCodes.NO_CONTENT).send()
}
