import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Peoples - GetAll', () => {
  let cityId: number | undefined

  beforeAll(async () => {
    const createCity = await testServer.post('/city').send({ name: 'city1' })
    cityId = createCity.body
  })
  it('should be get all cities', async () => {
    const createPeople = await testServer
      .post('/people')
      .send({ name: 'pessoa', email: 'pessoa@gmail.com', cityId })

    expect(createPeople.statusCode).toEqual(StatusCodes.CREATED)

    const getAllPeoples = await testServer.get(`/peoples`).send()

    expect(Number(getAllPeoples.header['x-total-count'])).toBeGreaterThan(0)
    expect(getAllPeoples.statusCode).toEqual(StatusCodes.OK)
    expect(getAllPeoples.body.length).toBeGreaterThan(0)
  })
})
