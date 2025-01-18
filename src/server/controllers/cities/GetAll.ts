import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'

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

export const getAllValidation = validation(() => ({ query: QueryPropsSchema }))

export const getAll = async (
  req: Request<{}, {}, {}, QueryProps>,
  res: Response,
) => {
  console.log(req.query)

  res.send('Not Implements !')
}
