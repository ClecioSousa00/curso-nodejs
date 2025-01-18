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

export { router }
