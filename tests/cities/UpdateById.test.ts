import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Cities - UpdateById', () => {
  it('should be update city by id', async () => {
    const res = await testServer.post('/city').send({ name: 'passs' })

    expect(res.statusCode).toEqual(StatusCodes.CREATED)

    const putCityById = await testServer
      .put(`/city/${res.body}`)
      .send({ name: 'patos' })

    expect(putCityById.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })
})
