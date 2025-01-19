import { Response, Router } from 'express'
import { CitiesController } from '../controllers'

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
  CitiesController.updateByIdValidation,
  CitiesController.updateById,
)

router.delete(
  '/city/:id',
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById,
)

export { router }
