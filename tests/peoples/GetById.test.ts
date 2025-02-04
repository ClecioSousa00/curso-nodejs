import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Peoples - GetById', () => {
  let cityId: number | undefined

  beforeAll(async () => {
    const createCity = await testServer.post('/city').send({ name: 'city1' })
    cityId = createCity.body
  })
  it('should be get by id city', async () => {
    const res = await testServer
      .post('/people')
      .send({ name: 'pessoa', email: 'pessoa2@gmail.com', cityId })
    expect(res.statusCode).toEqual(StatusCodes.CREATED)

    const getCityById = await testServer.get(`/people/${res.body}`).send()

    expect(getCityById.statusCode).toEqual(StatusCodes.OK)
    expect(getCityById.body).toHaveProperty('name')
  })
})
