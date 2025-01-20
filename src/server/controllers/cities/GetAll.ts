import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'

interface QueryProps {
  page?: number
  limit?: number
  filter?: string
}

const QueryPropsSchema: yup.ObjectSchema<QueryProps> = yup.object({
  page: yup.number().moreThan(0),
  limit: yup.number().moreThan(0),
  filter: yup.string(),
})

// export const getAllValidation = validation(() => ({ query: QueryPropsSchema }))
export const getAllValidation = validation('query', QueryPropsSchema)
export const getAll = async (
  req: Request<{}, {}, {}, QueryProps>,
  res: Response,
) => {
  console.log(req.query)
  res.setHeader('access-control-expose-headers', 'x-total-count')
  res.setHeader('x-total-count', 1)

  res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: 'patos',
    },
  ])
}
