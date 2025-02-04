import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Peoples - DeleteById', () => {
  let cityId: number | undefined

  beforeAll(async () => {
    const createCity = await testServer.post('/city').send({ name: 'city1' })
    cityId = createCity.body
  })
  it('should be delete people', async () => {
    const createPeople = await testServer
      .post('/people')
      .send({ name: 'pessoa', email: 'pessoa1@gmail.com', cityId })

    expect(createPeople.statusCode).toEqual(StatusCodes.CREATED)

    const deletePeople = await testServer
      .delete(`/people/${createPeople.body}`)
      .send()

    expect(deletePeople.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })
  it('should be delete people not exists', async () => {
    const res = await testServer.delete('/people/99999').send()

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.body).toHaveProperty('errors.default')
  })
})
