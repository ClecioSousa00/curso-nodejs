import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { PeoplesProvider } from '../../database/providers/peoples'

interface ParamProps {
  id?: number
}

const ParamsPropsSchema: yup.ObjectSchema<ParamProps> = yup.object({
  id: yup.number().integer().required().moreThan(0),
})

export const deleteByIdValidation = validation('params', ParamsPropsSchema)

export const deleteById = async (req: Request<ParamProps>, res: Response) => {
  console.log(req.params)
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado',
      },
    })
    return
  }
  const result = await PeoplesProvider.deleteById(req.params.id)
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    })
    return
  }

  res.status(StatusCodes.NO_CONTENT).send()
}
