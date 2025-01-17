import { Request, Response } from 'express'

interface City {
  name: string
}

export const create = (req: Request<{}, {}, City>, res: Response) => {
  const data = req.body

  console.log(data)

  res.send('Create!')
}
