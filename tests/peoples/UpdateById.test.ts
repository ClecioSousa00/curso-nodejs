import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('People - UpdateById', () => {
  let cityId: number | undefined

  beforeAll(async () => {
    const createCity = await testServer.post('/city').send({ name: 'city1' })
    cityId = createCity.body
  })
  it('should be update People by id', async () => {
    const res = await testServer
      .post('/people')
      .send({ name: 'pessoa', email: 'pessoa@gmail.com', cityId })

    expect(res.statusCode).toEqual(StatusCodes.CREATED)

    const putPeopleById = await testServer
      .put(`/people/${res.body}`)
      .send({ name: 'pessoa', email: 'pessoaupdate@gmail.com', cityId })
    expect(putPeopleById.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })
})
