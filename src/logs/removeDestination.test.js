import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { removeLogDestination } from './'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: async () => ({})
    })
  )
)

afterAll(() => jest.restoreAllMocks())

describe('removeLogDestination', () => {
  test('it creates the log destination URL', async () => {
    const opts = {
      tenantName: 'tenant',
      appName: 'app',
      serviceName: 'serviceName',
      regionName: 'region',
      stageName: 'stage',
      accountId: 'ACCOUNT_ID'
    }

    await removeLogDestination(opts)
    expect(fetch).toBeCalledWith(`${platformConfig.logDestinationUrl}destinations/delete`, {
      method: 'POST',
      body: JSON.stringify({
        tenantName: 'tenant',
        appName: 'app',
        serviceName: 'serviceName',
        stageName: 'stage',
        regionName: 'region'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})