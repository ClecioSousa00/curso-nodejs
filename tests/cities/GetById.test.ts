import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Cities - GetById', () => {
  it('should be get by id city', async () => {
    const res = await testServer.post('/city').send({ name: 'passs' })

    expect(res.statusCode).toEqual(StatusCodes.CREATED)

    const getCityById = await testServer.get(`city/${res.body}`).send()

    expect(getCityById.statusCode).toEqual(StatusCodes.OK)
    expect(getCityById.body).toHaveProperty('name')
  })
})
