import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Cities - GetAll', () => {
  it('should be get all cities', async () => {
    const createCity = await testServer.post('/city').send({ name: 'passs' })

    expect(createCity.statusCode).toEqual(StatusCodes.CREATED)

    const getAllCities = await testServer.get(`cities`).send()

    expect(Number(getAllCities.header['x-total-count'])).toBeGreaterThan(0)
    expect(getAllCities.statusCode).toEqual(StatusCodes.OK)
    expect(getAllCities.body.length).toBeGreaterThan(0)
  })
})
