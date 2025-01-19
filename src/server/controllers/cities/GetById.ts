import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

interface ParamProps {
  id?: number
}

const ParamsPropsSchema: yup.ObjectSchema<ParamProps> = yup.object({
  id: yup.number().integer().required().moreThan(0),
})

export const getByIdValidation = validation(() => ({
  params: ParamsPropsSchema,
}))

export const getById = async (req: Request<ParamProps>, res: Response) => {
  console.log(req.params)

  res.send('Not Implements !')
}
