import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Cities - DeleteById', () => {
  it('should be delete city', async () => {
    const res = await testServer.post('/city').send({ name: 'passs' })

    expect(res.statusCode).toEqual(StatusCodes.CREATED)

    const deleteCity = await testServer.delete(`/city/${res.body}`).send()

    expect(deleteCity.statusCode).toEqual(StatusCodes.NO_CONTENT)
  })
})
