import { Response, Router } from 'express'
import {
  CitiesController,
  PeoplesController,
  UsersController,
} from '../controllers'
import { ensureAuthenticated } from '../shared/middlewares'

const router = Router()

router.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server!!')
})

router.post(
  '/city',
  ensureAuthenticated,
  CitiesController.createValidation,
  // CitiesController.createValidationFilter,
  CitiesController.create,
)
router.get(
  '/cities',
  ensureAuthenticated,
  CitiesController.getAllValidation,
  // CitiesController.createValidationFilter,
  CitiesController.getAll,
)

router.get(
  '/city/:id',
  ensureAuthenticated,
  CitiesController.getByIdValidation,
  CitiesController.getById,
)

router.put(
  '/city/:id',
  ensureAuthenticated,
  CitiesController.updateByIdValidationBody,
  CitiesController.updateByIdValidationParams,
  CitiesController.updateById,
)

router.delete(
  '/city/:id',
  ensureAuthenticated,
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById,
)

router.post(
  '/people',
  ensureAuthenticated,
  PeoplesController.createValidation,
  // PeoplesController.createValidationFilter,
  PeoplesController.create,
)
router.get(
  '/peoples',
  ensureAuthenticated,
  PeoplesController.getAllValidation,
  // PeoplesController.createValidationFilter,
  PeoplesController.getAll,
)

router.get(
  '/people/:id',
  ensureAuthenticated,
  PeoplesController.getByIdValidation,
  PeoplesController.getById,
)

router.put(
  '/people/:id',
  ensureAuthenticated,
  PeoplesController.updateByIdValidationBody,
  PeoplesController.updateByIdValidationParams,
  PeoplesController.updateById,
)

router.delete(
  '/people/:id',
  ensureAuthenticated,
  PeoplesController.deleteByIdValidation,
  PeoplesController.deleteById,
)

router.post('/signup', UsersController.createValidation, UsersController.create)
router.post('/signIn', UsersController.signInValidation, UsersController.signIn)

export { router }
