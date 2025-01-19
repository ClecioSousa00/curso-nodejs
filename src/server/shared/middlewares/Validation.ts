// import { RequestHandler } from 'express'
// import { StatusCodes } from 'http-status-codes'
// import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup'

// type Field = 'body' | 'header' | 'params' | 'query'

// type GetSchema = <T extends Maybe<AnyObject>>(
//   schema: ObjectSchema<T>,
// ) => ObjectSchema<T>

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type AllSchemas = Record<Field, ObjectSchema<any>>

// type GetAllSchemas = (getSchema: GetSchema) => Partial<AllSchemas>

// type Validation = (getAllSchemas: GetAllSchemas) => RequestHandler

// export const validation: Validation =
//   (getAllSchemas) => async (req, res, next) => {
//     const schemas = getAllSchemas((schema) => schema)
//     const errorsResult: Record<string, Record<string, string>> = {}

//     Object.entries(schemas).forEach(([key, schema]) => {
//       try {
//         schema.validateSync(req[key as Field], {
//           abortEarly: false,
//         })
//         // next()
//       } catch (err) {
//         const yupError = err as ValidationError
//         const errors: Record<string, string> = {}
//         yupError.inner.forEach((error) => {
//           if (error.path === undefined) return
//           errors[error.path] = error.message
//         })
//         errorsResult[key] = errors
//         // res.status(StatusCodes.BAD_REQUEST).json({ errors })
//       }
//     })
//     if (!Object.entries(errorsResult).length) {
//       return next()
//     }

//     return res.status(StatusCodes.BAD_REQUEST).json({ errorsResult })
//   }

import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ObjectSchema, ValidationError } from 'yup'

type Fields = 'body' | 'header' | 'params' | 'query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Validation = (field: Fields, schema: ObjectSchema<any>) => RequestHandler

export const validation: Validation =
  (field, schema) => async (req, res, next) => {
    try {
      await schema.validate(req[field], { abortEarly: false })
      next()
    } catch (err) {
      const yupError = err as ValidationError
      const errors: Record<string, string> = {}

      yupError.inner.forEach((error) => {
        if (!error.path) return
        errors[error.path] = error.message
      })
      res.status(StatusCodes.BAD_REQUEST).json({ errors })
    }
  }
