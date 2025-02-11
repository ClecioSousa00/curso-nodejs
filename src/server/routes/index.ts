import { Response, Router } from 'express'
import {
  CitiesController,
  PeoplesController,
  UsersController,
} from '../controllers'

const router = Router()

router.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server!!')
})

router.post(
  '/city',
  CitiesController.createValidation,
  // CitiesController.createValidationFilter,
  CitiesController.create,
)
router.get(
  '/cities',
  CitiesController.getAllValidation,
  // CitiesController.createValidationFilter,
  CitiesController.getAll,
)

router.get(
  '/city/:id',
  CitiesController.getByIdValidation,
  CitiesController.getById,
)

router.put(
  '/city/:id',
  CitiesController.updateByIdValidationBody,
  CitiesController.updateByIdValidationParams,
  CitiesController.updateById,
)

router.delete(
  '/city/:id',
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById,
)

router.post(
  '/people',
  PeoplesController.createValidation,
  // PeoplesController.createValidationFilter,
  PeoplesController.create,
)
router.get(
  '/peoples',
  PeoplesController.getAllValidation,
  // PeoplesController.createValidationFilter,
  PeoplesController.getAll,
)

router.get(
  '/people/:id',
  PeoplesController.getByIdValidation,
  PeoplesController.getById,
)

router.put(
  '/people/:id',
  PeoplesController.updateByIdValidationBody,
  PeoplesController.updateByIdValidationParams,
  PeoplesController.updateById,
)

router.delete(
  '/people/:id',
  PeoplesController.deleteByIdValidation,
  PeoplesController.deleteById,
)

router.post('/signup', UsersController.createValidation, UsersController.create)

export { router }
