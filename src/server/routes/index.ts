import { Response, Router } from 'express'
import { CitiesController } from '../controllers'

const router = Router()

router.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server!!')
})

router.post(
  '/cities',
  CitiesController.createBodyValidator,
  CitiesController.create,
)

export { router }
