import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'
describe('Cities - Create', () => {
  it('should created city', async () => {
    const res = await testServer.post('/city').send({ name: 'passs' })

    expect(res.statusCode).toEqual(StatusCodes.CREATED)
  })
})
