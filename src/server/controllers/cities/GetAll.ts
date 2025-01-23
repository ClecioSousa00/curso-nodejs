import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { StatusCodes } from 'http-status-codes'
import { CitiesProvider } from '../../database/providers/cities'

interface QueryProps {
  id?: number
  page?: number
  limit?: number
  filter?: string
}

const QueryPropsSchema: yup.ObjectSchema<QueryProps> = yup.object({
  page: yup.number().moreThan(0),
  limit: yup.number().moreThan(0),
  filter: yup.string().default(''),
  id: yup.number().integer().default(0),
})

// export const getAllValidation = validation(() => ({ query: QueryPropsSchema }))
export const getAllValidation = validation('query', QueryPropsSchema)
export const getAll = async (
  req: Request<{}, {}, {}, QueryProps>,
  res: Response,
) => {
  console.log(req.query)

  const result = await CitiesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || '',
    Number(req.query.id),
  )

  const count = await CitiesProvider.count(req.query.filter || '')

  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    })
    return
  }
  if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    })
    return
  }

  res.setHeader('access-control-expose-headers', 'x-total-count')
  res.setHeader('x-total-count', count)

  res.status(StatusCodes.OK).json(result)
}
